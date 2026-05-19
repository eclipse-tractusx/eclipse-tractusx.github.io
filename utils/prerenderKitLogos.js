#!/usr/bin/env node

/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
 * Pre-renders all Kit 3D logos as SVG files at build time.
 *
 * This replicates the CSS 3D isometric effect (rotateX(55deg) rotateZ(45deg))
 * using pure SVG with computed 2D projection math.
 *
 * Output: static/generated/kit-logos/{kitId}.svg (git-ignored, generated per build)
 *
 * Usage: node utils/prerenderKitLogos.js
 */

const fs = require('node:fs');
const path = require('node:path');

// ──────────────────────────────────────────────────────────────────────────────
// Constants matching the CSS (Kit3DLogo.module.scss)
// ──────────────────────────────────────────────────────────────────────────────
const CONTAINER_W = 300;
const CONTAINER_H = 280;
const INNER_SIZE = 180;
const BORDER_RADIUS = 24;
const INNER_OFFSET_Y = 30; // translateY(30px) on .logo3dInner

// 3D rotation angles (degrees → radians)
const RX_DEG = 55;
const RZ_DEG = 45;
const RX = (RX_DEG * Math.PI) / 180;
const RZ = (RZ_DEG * Math.PI) / 180;
const cosRX = Math.cos(RX);
const sinRX = Math.sin(RX);
const cosRZ = Math.cos(RZ);
const sinRZ = Math.sin(RZ);

// Layer definitions: { zOffset, opacity, type }
// type: 'fill' = gradient-filled, 'border' = stroke only
const LAYERS = [
  { zOffset: -14.5, opacity: 0.4, type: 'border' },  // layer5
  { zOffset: 0,     opacity: 0.4, type: 'fill' },     // layer4
  { zOffset: 14.5,  opacity: 0.4, type: 'border' },   // layer4b
  { zOffset: 29,    opacity: 0.6, type: 'fill' },     // layer3
  { zOffset: 43.5,  opacity: 0.6, type: 'border' },   // layer3b
  { zOffset: 58,    opacity: 0.8, type: 'fill' },     // layer2
  { zOffset: 72.5,  opacity: 0.8, type: 'border' },   // layer2b
  { zOffset: 87,    opacity: 1,   type: 'fill' },     // layer1 (top)
];

const BORDER_WIDTH = 2;

// ──────────────────────────────────────────────────────────────────────────────
// 3D → 2D projection (orthographic with CSS transform order)
//
// CSS: transform: rotateX(55deg) rotateZ(45deg) translateZ(offset)
// Applied right-to-left: first rotateZ, then rotateX.
//
// For a point (px, py) on a flat layer at translateZ = offset:
//   After rotateZ(45°):  x1 = px·cosRZ − py·sinRZ,  y1 = px·sinRZ + py·cosRZ,  z1 = offset
//   After rotateX(55°):  x2 = x1,  y2 = y1·cosRX − z1·sinRX
//
// Screen coords: (x2, y2)
// ──────────────────────────────────────────────────────────────────────────────

function project(px, py, zOffset) {
  const x1 = px * cosRZ - py * sinRZ;
  const y1 = px * sinRZ + py * cosRZ;
  const x2 = x1;
  const y2 = y1 * cosRX - zOffset * sinRX;
  return { x: x2, y: y2 };
}

/**
 * Generate points along a rounded rectangle (in local coords centered at origin).
 * Returns array of {x, y} points that approximate the rounded rect including arcs.
 */
function roundedRectPoints(w, h, r, segments = 16) {
  const hw = w / 2;
  const hh = h / 2;
  const points = [];

  // Clamp radius
  const cr = Math.min(r, hw, hh);

  // Go clockwise from top-left corner
  // Top-left arc: center at (-hw+cr, -hh+cr), from 180° to 270°
  for (let i = 0; i <= segments; i++) {
    const angle = Math.PI + (i / segments) * (Math.PI / 2);
    points.push({
      x: -hw + cr + cr * Math.cos(angle),
      y: -hh + cr + cr * Math.sin(angle),
    });
  }
  // Top-right arc: center at (hw-cr, -hh+cr), from 270° to 360°
  for (let i = 0; i <= segments; i++) {
    const angle = (3 * Math.PI) / 2 + (i / segments) * (Math.PI / 2);
    points.push({
      x: hw - cr + cr * Math.cos(angle),
      y: -hh + cr + cr * Math.sin(angle),
    });
  }
  // Bottom-right arc: center at (hw-cr, hh-cr), from 0° to 90°
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * (Math.PI / 2);
    points.push({
      x: hw - cr + cr * Math.cos(angle),
      y: hh - cr + cr * Math.sin(angle),
    });
  }
  // Bottom-left arc: center at (-hw+cr, hh-cr), from 90° to 180°
  for (let i = 0; i <= segments; i++) {
    const angle = Math.PI / 2 + (i / segments) * (Math.PI / 2);
    points.push({
      x: -hw + cr + cr * Math.cos(angle),
      y: hh - cr + cr * Math.sin(angle),
    });
  }

  return points;
}

/**
 * Project a set of 2D points through the 3D transform and return
 * an SVG polygon/path points string.
 */
function projectPolygon(localPoints, zOffset, cx, cy) {
  return localPoints
    .map((pt) => {
      const p = project(pt.x, pt.y, zOffset);
      return `${(p.x + cx).toFixed(2)},${(p.y + cy).toFixed(2)}`;
    })
    .join(' ');
}

// ──────────────────────────────────────────────────────────────────────────────
// Parse kitsData.js
// ──────────────────────────────────────────────────────────────────────────────

function parseKitsData() {
  const kitsDataPath = path.join(__dirname, '../data/kitsData.js');
  const content = fs.readFileSync(kitsDataPath, 'utf8');

  const kits = [];

  // Map import variable names to SVG file paths
  const importMap = {};
  const importRegex = /import\s+(\w+)\s+from\s+["']@site\/([^"']+)["']/g;
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    importMap[m[1]] = m[2];
  }

  // Split into individual kit blocks by finding each { id: '...' } object.
  // We locate each "id:" and extract the surrounding block.
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  const idPositions = [];
  while ((m = idRegex.exec(content)) !== null) {
    idPositions.push({ id: m[1], pos: m.index });
  }

  for (let i = 0; i < idPositions.length; i++) {
    const start = idPositions[i].pos;
    const end = i + 1 < idPositions.length ? idPositions[i + 1].pos : content.length;
    const block = content.substring(start, end);
    const kitId = idPositions[i].id;

    // Skip template/placeholder entries
    if (kitId.includes('<') || kitId.includes('>')) continue;

    // Extract fields from this block
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    const logoMatch = block.match(/logo:\s*(\w+)\s*,/);
    const heightMatch = block.match(/logoHeight:\s*(\d+)/);
    const widthMatch = block.match(/logoWidth:\s*(\d+)/);
    const gradientMatch = block.match(/gradient:\s*['"]([^'"]+)['"]/);
    const primaryMatch = block.match(/primary:\s*['"]([^'"]+)['"]/);

    if (!nameMatch || !logoMatch || !heightMatch || !widthMatch || !gradientMatch || !primaryMatch) {
      continue; // Incomplete entry (e.g. template placeholder or industry category)
    }

    const logoVar = logoMatch[1];
    const svgRelPath = importMap[logoVar];
    if (!svgRelPath) {
      console.warn(`  ⚠  No SVG import found for "${logoVar}" (kit: ${kitId}), skipping`);
      continue;
    }

    kits.push({
      id: kitId,
      name: nameMatch[1],
      logoSvgPath: path.join(__dirname, '..', svgRelPath),
      logoHeight: Number.parseInt(heightMatch[1], 10),
      logoWidth: Number.parseInt(widthMatch[1], 10),
      gradient: gradientMatch[1],
      primaryColor: primaryMatch[1],
    });
  }

  return kits;
}

/**
 * Extract two hex colours from a CSS gradient string.
 * Supports both hex (#RRGGBB) and rgba() formats.
 */
function parseGradientColors(gradient) {
  // Try hex format
  const hexMatches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  if (hexMatches && hexMatches.length >= 2) {
    return [hexMatches[0], hexMatches[1]];
  }
  // Try rgba
  const rgbaMatches = gradient.match(/rgba?\(([^)]+)\)/g);
  if (rgbaMatches && rgbaMatches.length >= 2) {
    return rgbaMatches.map((rgba) => {
      const parts = rgba.match(/(\d+)/g);
      if (!parts || parts.length < 3) return '#888888';
      const [r, g, b] = parts.map(Number);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    });
  }
  return ['#888888', '#444444'];
}

// ──────────────────────────────────────────────────────────────────────────────
// SVG construction
// ──────────────────────────────────────────────────────────────────────────────

function buildLogoSvg(kit) {
  const [color1, color2] = parseGradientColors(kit.gradient);
  const primary = kit.primaryColor;

  // Centre of the inner container in the output viewport
  const cx = CONTAINER_W / 2;
  const cy = CONTAINER_H / 2 + INNER_OFFSET_Y;

  // Rounded rect points for a 180×180 layer (centred at origin)
  const rectPts = roundedRectPoints(INNER_SIZE, INNER_SIZE, BORDER_RADIUS, 16);

  let defs = '';
  let layers = '';

  LAYERS.forEach((layer, idx) => {
    const points = projectPolygon(rectPts, layer.zOffset, cx, cy);
    const gradId = `grad_${idx}`;

    if (layer.type === 'fill') {
      // Gradient definition (each layer gets its own because the y-shift differs)
      const gs = project(-INNER_SIZE / 2, INNER_SIZE / 2, layer.zOffset);
      const ge = project(INNER_SIZE / 2, -INNER_SIZE / 2, layer.zOffset);
      defs += `<linearGradient id="${gradId}" gradientUnits="userSpaceOnUse"
        x1="${(gs.x + cx).toFixed(2)}" y1="${(gs.y + cy).toFixed(2)}"
        x2="${(ge.x + cx).toFixed(2)}" y2="${(ge.y + cy).toFixed(2)}">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>\n`;

      layers += `<polygon points="${points}"
        fill="url(#${gradId})" opacity="${layer.opacity}"/>\n`;
    } else {
      // Border-only layer
      layers += `<polygon points="${points}"
        fill="none" stroke="${primary}" stroke-width="${BORDER_WIDTH}"
        opacity="${layer.opacity}"/>\n`;
    }
  });

  // ── Logo on top layer ──────────────────────────────────────────────────
  // Read the raw SVG and embed it, transformed to sit on the top layer.
  let logoContent = '';
  try {
    const svgRaw = fs.readFileSync(kit.logoSvgPath, 'utf8');
    // Extract viewBox or width/height from the raw SVG
    const vbMatch = svgRaw.match(/viewBox=["']([^"']+)["']/);
    const wMatch = svgRaw.match(/width=["'](\d+(?:\.\d+)?)/);
    const hMatch = svgRaw.match(/height=["'](\d+(?:\.\d+)?)/);

    let svgW, svgH;
    if (vbMatch) {
      const parts = vbMatch[1].split(/[\s,]+/).map(Number);
      svgW = parts[2] || 100;
      svgH = parts[3] || 100;
    } else {
      svgW = wMatch ? Number.parseFloat(wMatch[1]) : 100;
      svgH = hMatch ? Number.parseFloat(hMatch[1]) : 100;
    }

    // Logo size: same logic as the React component
    const avgSize = (kit.logoWidth + kit.logoHeight) / 2;
    const logoSizePercent = (avgSize / 80) * 45;
    const logoW = (INNER_SIZE * logoSizePercent) / 100;
    const logoH = (INNER_SIZE * logoSizePercent) / 100;

    // Position the logo centred on the top layer.
    // In layer-local coords (centred at origin): the logo occupies
    // [-logoW/2, -logoH/2] to [logoW/2, logoH/2]
    //
    // We need to project the four corners of the logo bounding box through
    // the 3D transform, then use an SVG affine transform to map the logo SVG
    // into that projected quadrilateral.
    //
    // For an orthographic projection the affine transform is the same for all
    // points at the same z. We compute the affine matrix directly:
    //
    //   | cosRZ   -sinRZ |   then   | 1       0      |
    //   | sinRZ    cosRZ |          | 0     cosRX     |
    //
    // Combined: a = cosRZ, b = sinRZ*cosRX, c = -sinRZ, d = cosRZ*cosRX
    const a = cosRZ;
    const b = sinRZ * cosRX;
    const c = -sinRZ;
    const d = cosRZ * cosRX;

    const topZ = 87; // top layer zOffset
    const yShift = -topZ * sinRX;

    // We want to map the SVG viewbox [0, 0, svgW, svgH] onto the projected
    // rectangle centred at (cx, cy + yShift).
    //
    // Scale from SVG coords to layer-local coords:
    const sx = logoW / svgW;
    const sy = logoH / svgH;

    // The full transform: translate to centre, apply projection matrix, scale from SVG coords
    // SVG point (u, v) → layer local (u*sx - logoW/2, v*sy - logoH/2) → projected
    //
    // In SVG matrix(a, b, c, d, e, f) format:
    //   x' = a*u + c*v + e
    //   y' = b*u + d*v + f
    //
    // Combined steps:
    //   local_x = u * sx - logoW/2
    //   local_y = v * sy - logoH/2
    //   proj_x = a * local_x + c * local_y + cx
    //   proj_y = b * local_x + d * local_y + cy + yShift
    //
    //   proj_x = (a*sx)*u + (c*sy)*v + (-a*logoW/2 - c*logoH/2 + cx)
    //   proj_y = (b*sx)*u + (d*sy)*v + (-b*logoW/2 - d*logoH/2 + cy + yShift)

    const ma = a * sx;
    const mb = b * sx;
    const mc = c * sy;
    const md = d * sy;
    const me = -a * (logoW / 2) - c * (logoH / 2) + cx;
    const mf = -b * (logoW / 2) - d * (logoH / 2) + cy + yShift;

    // Extract inner SVG content (everything inside the <svg ...>...</svg> tag)
    const innerMatch = svgRaw.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    const innerSvg = innerMatch ? innerMatch[1] : '';

    const cleanInner = innerSvg;

    logoContent = `<g transform="matrix(${ma.toFixed(6)}, ${mb.toFixed(6)}, ${mc.toFixed(6)}, ${md.toFixed(6)}, ${me.toFixed(2)}, ${mf.toFixed(2)})"
      opacity="1">
      ${cleanInner}
    </g>`;
  } catch (err) {
    console.warn(`  ⚠  Could not read logo SVG for ${kit.id}: ${err.message}`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${CONTAINER_W}" height="${CONTAINER_H}"
    viewBox="0 0 ${CONTAINER_W} ${CONTAINER_H}">
  <defs>${defs}</defs>
  ${layers}
  ${logoContent}
</svg>`;
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

function renderKit(kit, outDir) {
  const outPath = path.join(outDir, `${kit.id}.svg`);
  try {
    const svg = buildLogoSvg(kit);
    fs.writeFileSync(outPath, svg, 'utf8');
    const sizeKB = (Buffer.byteLength(svg, 'utf8') / 1024).toFixed(1);
    console.log(`  ✅ ${kit.id.padEnd(30)} ${sizeKB} KB`);
    return true;
  } catch (err) {
    console.error(`  ❌ ${kit.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('═'.repeat(60));
  console.log('Pre-rendering Kit 3D logos as SVG...\n');

  const kits = parseKitsData();
  if (kits.length === 0) {
    console.error('❌ No kits found in kitsData.js');
    process.exit(1);
  }

  console.log(`Found ${kits.length} kits.\n`);

  const outDir = path.join(__dirname, '../static/generated/kit-logos');
  fs.mkdirSync(outDir, { recursive: true });

  let rendered = 0;
  let failed = 0;

  for (const kit of kits) {
    if (renderKit(kit, outDir)) rendered++;
    else failed++;
  }

  const totalSizeMB = fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith('.svg'))
    .reduce((sum, f) => sum + fs.statSync(path.join(outDir, f)).size, 0) / (1024 * 1024);

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`Pre-render complete: ${rendered} rendered, ${failed} failed`);
  console.log(`Total size: ${totalSizeMB.toFixed(2)} MB in ${outDir}`);
  console.log('═'.repeat(60));

  if (failed > 0) process.exit(1);
}

main();
