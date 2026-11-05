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
 * @param {boolean} [props.showConnections] - Draw arcs from the home base outwards.
 * @param {boolean} [props.showLabels] - Print the country name next to each marker.
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
    if (!showConnections) return [];
    const origin = points.find(({ base }) => base.homeBase) || points[0];
    if (!origin) return [];
    return points
      .filter((point) => point !== origin)
      .map((point) => ({
        id: point.base.id,
        d: connectorPath(origin.position, point.position),
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
                  activeId === connection.id && styles.connectionActive,
                )}
                d={connection.d}
              />
            ))}
          </svg>

          <div className={styles.markerLayer}>
            {points.map(({ base, position }) => {
              const isActive = activeId === base.id;
              const Marker = interactive ? 'button' : 'div';
              return (
                <Marker
                  key={base.id}
                  type={interactive ? 'button' : undefined}
                  className={clsx(
                    styles.marker,
                    base.homeBase && styles.markerHome,
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
                  <ClaimSymbol brand={base.homeBase} className={styles.markerSymbol} />
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
                      {base.homeBase
                        ? 'Home base'
                        : base.partners.length > 0
                          ? `${base.partners.length} partner${base.partners.length === 1 ? '' : 's'}`
                          : base.region}
                    </span>
                  </span>
                </Marker>
              );
            })}
          </div>
        </div>
      </div>
      <p className={styles.scrollHint} aria-hidden="true">
        Swipe the map to explore
      </p>
    </div>
  );
}
