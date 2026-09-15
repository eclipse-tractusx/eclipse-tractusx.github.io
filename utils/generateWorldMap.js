/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/**
 * Generates `data/worldMapGeometry.js` — the SVG path data behind the community
 * bases world map (`src/components/CommunityMap`).
 *
 * The geometry is derived from Natural Earth 1:110m Admin-0 countries (public
 * domain) as packaged by the `world-atlas` project. It is generated ONCE and
 * checked in, so neither the dev server nor the CI build needs network access.
 *
 * Re-run manually only when the country outlines need refreshing:
 *
 *     node utils/generateWorldMap.js
 *
 * Everything below is dependency-free on purpose (plain TopoJSON decoding +
 * an equirectangular projection), so the script keeps working regardless of
 * which transitive packages happen to be installed.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SOURCE_URL = 'https://unpkg.com/world-atlas@2/countries-110m.json';
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'worldMapGeometry.js');

// ---------------------------------------------------------------------------
// Projection
// ---------------------------------------------------------------------------
// Plain equirectangular (plate carrée) so that placing a marker only ever needs
// its latitude/longitude — see `projectCoordinates()` in the generated module.
// Antarctica and the far north are cropped, which yields the wide cinematic
// framing used on the slide the design is based on.
const WIDTH = 1000;
const LAT_TOP = 84;
const LAT_BOTTOM = -58;
const SCALE = WIDTH / 360;
const HEIGHT = +((LAT_TOP - LAT_BOTTOM) * SCALE).toFixed(2);

// Douglas–Peucker tolerance and minimum ring area, both in viewBox units.
// 0.5 units ~= 0.18 degrees; plenty of fidelity for a map rendered at ~1200px.
const SIMPLIFY_TOLERANCE = 0.5;
const MIN_RING_AREA = 0.5;

// Countries that get a highlight fill because a community base sits there.
// Keys are the Natural Earth country names, values the ISO 3166-1 alpha-2 code
// used by `data/communityBases.js`.
const HIGHLIGHTED_COUNTRIES = {
  Germany: 'DE',
  Spain: 'ES',
  'United Kingdom': 'GB',
  'United States of America': 'US',
  China: 'CN',
  India: 'IN',
  Bangladesh: 'BD',
  Japan: 'JP',
};

const EXCLUDED_COUNTRIES = new Set(['Antarctica']);

// ---------------------------------------------------------------------------
// TopoJSON decoding
// ---------------------------------------------------------------------------

function decodeArcs(topology) {
  const { scale, translate } = topology.transform;
  return topology.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function ringCoordinates(arcs, ringArcIndexes) {
  const points = [];
  ringArcIndexes.forEach((index, position) => {
    const arc = index >= 0 ? arcs[index] : arcs[~index].slice().reverse();
    points.push(...(position === 0 ? arc : arc.slice(1)));
  });
  return points;
}

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/**
 * Cuts a ring wherever it jumps across the antimeridian. Without this, polygons
 * such as the Russian Chukotka peninsula are drawn straight back across the
 * whole map and leave horizontal streaks.
 */
function splitAtAntimeridian(ring) {
  const segments = [];
  let current = [ring[0]];

  for (let i = 1; i < ring.length; i++) {
    const [lonPrev, latPrev] = ring[i - 1];
    const [lon, lat] = ring[i];

    if (Math.abs(lon - lonPrev) > 180) {
      const gapBefore = Math.abs(lonPrev > 0 ? 180 - lonPrev : -180 - lonPrev);
      const gapAfter = Math.abs(lon > 0 ? lon - 180 : lon + 180);
      const ratio = gapBefore + gapAfter === 0 ? 0 : gapBefore / (gapBefore + gapAfter);
      const crossingLat = latPrev + (lat - latPrev) * ratio;
      const edge = lonPrev > 0 ? 180 : -180;

      current.push([edge, crossingLat]);
      segments.push(current);
      current = [[-edge, crossingLat], [lon, lat]];
    } else {
      current.push(ring[i]);
    }
  }
  segments.push(current);

  // The ring is closed, so the tail belongs to the same piece as the head.
  if (segments.length > 1) {
    const head = segments.shift();
    segments[segments.length - 1] = segments[segments.length - 1].concat(head);
  }
  return segments;
}

function project([lon, lat]) {
  return [(lon + 180) * SCALE, (LAT_TOP - lat) * SCALE];
}

function simplify(points, tolerance) {
  if (points.length < 4) return points;

  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;

  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    const [x1, y1] = points[start];
    const [x2, y2] = points[end];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSquared = dx * dx + dy * dy;

    let farthestDistance = -1;
    let farthestIndex = -1;

    for (let i = start + 1; i < end; i++) {
      const [px, py] = points[i];
      let distance;
      if (lengthSquared === 0) {
        distance = Math.hypot(px - x1, py - y1);
      } else {
        let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));
        distance = Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
      }
      if (distance > farthestDistance) {
        farthestDistance = distance;
        farthestIndex = i;
      }
    }

    if (farthestDistance > tolerance && farthestIndex > 0) {
      keep[farthestIndex] = 1;
      stack.push([start, farthestIndex], [farthestIndex, end]);
    }
  }

  return points.filter((_, i) => keep[i]);
}

function ringArea(points) {
  let area = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    area += (points[j][0] + points[i][0]) * (points[j][1] - points[i][1]);
  }
  return Math.abs(area / 2);
}

const round = (value) => {
  const rounded = Math.round(value * 10) / 10;
  return Object.is(rounded, -0) ? 0 : rounded;
};

function ringToPath(coordinates) {
  let path = '';

  for (const segment of splitAtAntimeridian(coordinates)) {
    const points = simplify(segment.map(project), SIMPLIFY_TOLERANCE);
    if (points.length < 4) continue;
    if (ringArea(points) < MIN_RING_AREA) continue;

    let subPath = '';
    let lastX = null;
    let lastY = null;

    points.forEach((point, i) => {
      const x = round(point[0]);
      const y = round(point[1]);
      if (i === 0) {
        subPath += `M${x} ${y}`;
        lastX = x;
        lastY = y;
      } else if (x !== lastX || y !== lastY) {
        subPath += `L${x} ${y}`;
        lastX = x;
        lastY = y;
      }
    });

    if (subPath) path += `${subPath}Z`;
  }

  return path;
}

function geometryToPath(geometry, arcs) {
  if (geometry.type === 'Polygon') {
    return geometry.arcs.map((ring) => ringToPath(ringCoordinates(arcs, ring))).join('');
  }
  if (geometry.type === 'MultiPolygon') {
    return geometry.arcs
      .map((polygon) => polygon.map((ring) => ringToPath(ringCoordinates(arcs, ring))).join(''))
      .join('');
  }
  return '';
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          response.resume();
          resolve(download(new URL(response.headers.location, url).toString()));
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Unexpected status ${response.statusCode} for ${url}`));
          return;
        }
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => (body += chunk));
        response.on('end', () => resolve(body));
      })
      .on('error', reject);
  });
}

async function main() {
  console.log(`Downloading ${SOURCE_URL} ...`);
  const topology = JSON.parse(await download(SOURCE_URL));
  const arcs = decodeArcs(topology);

  let landPath = '';
  const countryPaths = {};
  const missing = new Set(Object.keys(HIGHLIGHTED_COUNTRIES));

  for (const geometry of topology.objects.countries.geometries) {
    const name = geometry.properties && geometry.properties.name;
    if (!name || EXCLUDED_COUNTRIES.has(name)) continue;

    const path = geometryToPath(geometry, arcs);
    landPath += path;

    if (HIGHLIGHTED_COUNTRIES[name]) {
      countryPaths[HIGHLIGHTED_COUNTRIES[name]] = path;
      missing.delete(name);
    }
  }

  if (missing.size) {
    throw new Error(`Highlighted countries not found in source data: ${[...missing].join(', ')}`);
  }

  const highlightEntries = Object.keys(countryPaths)
    .sort()
    .map((code) => `  ${code}: '${countryPaths[code]}',`)
    .join('\n');

  const module = `/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/**
 * GENERATED FILE - DO NOT EDIT BY HAND.
 * Regenerate with: node utils/generateWorldMap.js
 *
 * Country outlines derived from Natural Earth 1:110m Admin-0 (public domain),
 * projected equirectangularly and simplified for web rendering.
 */

/** Width of the map viewBox, in SVG user units. */
export const MAP_WIDTH = ${WIDTH};

/** Height of the map viewBox, in SVG user units. */
export const MAP_HEIGHT = ${HEIGHT};

/** Northern edge of the projection, in degrees. */
export const MAP_LAT_TOP = ${LAT_TOP};

/** Southern edge of the projection, in degrees. */
export const MAP_LAT_BOTTOM = ${LAT_BOTTOM};

/** All country outlines merged into a single path. */
export const LAND_PATH = '${landPath}';

/** Individual outlines for the countries hosting a community base. */
export const COUNTRY_PATHS = {
${highlightEntries}
};

/**
 * Projects a coordinate onto the map.
 *
 * @param {number} latitude - Latitude in degrees.
 * @param {number} longitude - Longitude in degrees.
 * @returns {{x: number, y: number, left: number, top: number}} Position in SVG
 * user units (\`x\`/\`y\`) and as percentages of the map box (\`left\`/\`top\`),
 * the latter being what the HTML marker overlay uses.
 */
export function projectCoordinates(latitude, longitude) {
  const x = ((longitude + 180) * MAP_WIDTH) / 360;
  const y = ((MAP_LAT_TOP - latitude) * MAP_WIDTH) / 360;
  return {
    x,
    y,
    left: (x / MAP_WIDTH) * 100,
    top: (y / MAP_HEIGHT) * 100,
  };
}
`;

  fs.writeFileSync(OUTPUT_FILE, module);
  console.log(`Wrote ${OUTPUT_FILE}`);
  console.log(`  viewBox: 0 0 ${WIDTH} ${HEIGHT}`);
  console.log(`  land path: ${landPath.length} chars`);
  console.log(`  highlighted countries: ${Object.keys(countryPaths).sort().join(', ')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
