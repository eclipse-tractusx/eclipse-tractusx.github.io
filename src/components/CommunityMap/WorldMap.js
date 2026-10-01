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

import React, { useEffect, useId, useMemo, useRef } from 'react';
import clsx from 'clsx';
import {
  LAND_PATH,
  COUNTRY_PATHS,
  MAP_WIDTH,
  MAP_HEIGHT,
  projectCoordinates,
} from '@site/data/worldMapGeometry';
import {
  COMMUNITY_SIZES,
  COMMUNITY_SIZE_LABELS,
  COMMUNITY_STATUS,
  isEstablishedBase,
  isPendingBase,
} from '@site/data/communityBases';
import ClaimSymbol from './ClaimSymbol';
import styles from './styles.module.scss';

/**
 * Builds a gently curved connector between two projected points. The control
 * point is pushed perpendicular to the chord so every arc bows towards the top
 * of the map, the way flight-route maps do.
 */
function connectorPath(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;
  const bend = Math.min(distance * 0.22, 70);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  // Perpendicular of the chord, flipped so the curve always bows upwards.
  const direction = dx >= 0 ? 1 : -1;
  const controlX = midX + (dy / distance) * bend * direction;
  const controlY = midY - (dx / distance) * bend * direction;
  return `M${from.x} ${from.y}Q${controlX} ${controlY} ${to.x} ${to.y}`;
}

/** Marker class per community size, so bigger communities get a bigger claim. */
const SIZE_CLASSES = {
  [COMMUNITY_SIZES.LARGE]: styles.markerLarge,
  [COMMUNITY_SIZES.MEDIUM]: styles.markerMedium,
  [COMMUNITY_SIZES.SMALL]: styles.markerSmall,
};

/** How many nearest neighbours each base links to, on top of the spanning tree. */
const NEIGHBOUR_LINKS = 2;

/**
 * Links the bases into a decentralised network instead of a hub-and-spoke
 * layout: a minimum spanning tree keeps every base connected, and each base is
 * additionally tied to its nearest neighbours so the mesh has no single centre.
 */
function buildNetwork(points) {
  const distance = (a, b) =>
    Math.hypot(a.position.x - b.position.x, a.position.y - b.position.y);
  const links = new Map();
  const addLink = (a, b) => {
    const [first, second] = [a, b].sort((x, y) => x.base.id.localeCompare(y.base.id));
    const id = `${first.base.id}--${second.base.id}`;
    if (!links.has(id)) links.set(id, { id, from: first, to: second });
  };

  // Prim's algorithm for the minimum spanning tree.
  const connected = new Set(points.slice(0, 1));
  while (connected.size < points.length) {
    let best = null;
    connected.forEach((inside) => {
      points.forEach((outside) => {
        if (connected.has(outside)) return;
        const length = distance(inside, outside);
        if (!best || length < best.length) best = { inside, outside, length };
      });
    });
    addLink(best.inside, best.outside);
    connected.add(best.outside);
  }

  points.forEach((point) => {
    points
      .filter((other) => other !== point)
      .sort((a, b) => distance(point, a) - distance(point, b))
      .slice(0, NEIGHBOUR_LINKS)
      .forEach((other) => addLink(point, other));
  });

  return Array.from(links.values());
}

/**
 * Interactive world map showing the Eclipse Tractus-X community bases.
 *
 * The country outlines live in an inline SVG; the markers are HTML elements
 * layered on top and positioned in percentages, so they keep a constant pixel
 * size no matter how wide the map is rendered.
 *
 * On narrow screens the map keeps a minimum width and scrolls sideways instead
 * of shrinking, because otherwise the markers in Europe and South Asia would
 * pile on top of each other.
 *
 * @param {Object} props
 * @param {import('@site/data/communityBases').CommunityBase[]} props.bases
 * @param {string} [props.activeId] - Id of the base currently highlighted.
 * @param {(id: string|null) => void} [props.onHover]
 * @param {(base: object) => void} [props.onSelect]
 * @param {boolean} [props.showConnections] - Draw the network of arcs linking the bases.
 * @param {boolean} [props.showLabels] - Print the country name next to each marker.
 * @param {boolean} [props.showLegend] - Explain the marker sizes below the map.
 * @param {boolean} [props.compact] - Smaller markers, for the home page teaser.
 * @param {boolean} [props.fullBleed] - Edge-to-edge rendering, without the framing border.
 * @param {string} [props.className]
 */
export default function WorldMap({
  bases,
  activeId = null,
  onHover,
  onSelect,
  showConnections = true,
  showLabels = false,
  showLegend = false,
  compact = false,
  fullBleed = false,
  className,
}) {
  const gradientId = useId();

  const points = useMemo(
    () =>
      bases.map((base) => ({
        base,
        position: projectCoordinates(base.latitude, base.longitude),
      })),
    [bases],
  );

  const highlightedCountries = useMemo(
    () =>
      Array.from(new Set(bases.map((base) => base.countryCode))).filter(
        (code) => COUNTRY_PATHS[code],
      ),
    [bases],
  );

  const connections = useMemo(() => {
    if (!showConnections || points.length < 2) return [];
    return buildNetwork(points).map(({ id, from, to }) => ({
      id,
      ends: [from.base.id, to.base.id],
      d: connectorPath(from.position, to.position),
    }));
  }, [points, showConnections]);

  const interactive = Boolean(onSelect);

  // When the map overflows its viewport, start off centred on Europe and Asia,
  // where most of the bases are, rather than on the empty Pacific.
  const viewportRef = useRef(null);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const overflow = viewport.scrollWidth - viewport.clientWidth;
    if (overflow > 0) {
      viewport.scrollLeft = overflow * 0.62;
    }
  }, []);

  return (
    <div className={clsx(styles.mapWrapper, className)}>
      <div className={styles.mapViewport} ref={viewportRef}>
        <div
          className={clsx(styles.map, compact && styles.mapCompact, fullBleed && styles.mapFull)}
        >
          <svg
            className={styles.mapCanvas}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-label={`World map showing Eclipse Tractus-X community bases in ${bases
              .map((base) => base.country)
              .join(', ')}`}
          >
            <defs>
              <radialGradient id={`${gradientId}-glow`} cx="50%" cy="45%" r="70%">
                <stop offset="0%" stopColor="#faa023" stopOpacity="0.12" />
                <stop offset="55%" stopColor="#faa023" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#faa023" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill={`url(#${gradientId}-glow)`} />

            <path className={styles.land} d={LAND_PATH} />

            {highlightedCountries.map((code) => (
              <path
                key={code}
                className={clsx(
                  styles.countryHighlight,
                  activeId &&
                    bases.some((base) => base.id === activeId && base.countryCode === code) &&
                    styles.countryHighlightActive,
                )}
                d={COUNTRY_PATHS[code]}
              />
            ))}

            {connections.map((connection) => (
              <path
                key={connection.id}
                className={clsx(
                  styles.connection,
                  connection.ends.includes(activeId) && styles.connectionActive,
                )}
                d={connection.d}
              />
            ))}
          </svg>

          <div className={styles.markerLayer}>
            {points.map(({ base, position }) => {
              const isActive = activeId === base.id;
              const established = isEstablishedBase(base);
              const Marker = interactive ? 'button' : 'div';
              return (
                <Marker
                  key={base.id}
                  type={interactive ? 'button' : undefined}
                  className={clsx(
                    styles.marker,
                    SIZE_CLASSES[base.size] || styles.markerSmall,
                    established && styles.markerEstablished,
                    isPendingBase(base) && styles.markerPending,
                    isActive && styles.markerActive,
                  )}
                  style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  aria-label={
                    interactive
                      ? `${base.country}${base.city ? `, ${base.city}` : ''} - view community base details`
                      : undefined
                  }
                  onClick={interactive ? () => onSelect(base) : undefined}
                  onMouseEnter={onHover ? () => onHover(base.id) : undefined}
                  onMouseLeave={onHover ? () => onHover(null) : undefined}
                  onFocus={onHover ? () => onHover(base.id) : undefined}
                  onBlur={onHover ? () => onHover(null) : undefined}
                >
                  <span className={styles.markerPulse} aria-hidden="true" />
                  <ClaimSymbol brand={established} className={styles.markerSymbol} />
                  {showLabels && (
                    <span
                      className={clsx(
                        styles.markerLabel,
                        styles[`markerLabel${base.labelPlacement || 'bottom'}`],
                      )}
                    >
                      {base.country}
                    </span>
                  )}
                  <span className={styles.tooltip} role="tooltip">
                    <span className={styles.tooltipCountry}>{base.country}</span>
                    {base.city && <span className={styles.tooltipCity}>{base.city}</span>}
                    <span className={styles.tooltipMeta}>
                      {base.status}
                    </span>
                  </span>
                </Marker>
              );
            })}
          </div>
        </div>
      </div>
      {showLegend && (
        <ul className={styles.legend} aria-label="Map legend">
          {Object.values(COMMUNITY_SIZES).map((size) => (
            <li key={size} className={styles.legendItem}>
              <span className={clsx(styles.legendSymbol, styles[`legendSymbol${size}`])}>
                <ClaimSymbol brand={size === COMMUNITY_SIZES.LARGE} />
              </span>
              {COMMUNITY_SIZE_LABELS[size]}
            </li>
          ))}
          <li className={styles.legendItem}>
            <span
              className={clsx(styles.legendSymbol, styles.legendSymbolsmall, styles.legendPending)}
            >
              <ClaimSymbol />
            </span>
            {COMMUNITY_STATUS.GROWTH_PENDING}
          </li>
        </ul>
      )}
      <p className={styles.scrollHint} aria-hidden="true">
        Swipe the map to explore
      </p>
    </div>
  );
}
