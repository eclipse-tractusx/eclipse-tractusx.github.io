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

import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import clsx from 'clsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PublicIcon from '@mui/icons-material/Public';
import { communityBases, getBaseStatistics } from '@site/data/communityBases';
import WorldMap from './WorldMap';
import ClaimSymbol from './ClaimSymbol';
import styles from './section.module.scss';

export const COMMUNITY_BASES_ROUTE = '/CommunityBases';

/**
 * Home page teaser for the global community bases.
 *
 * Shows the world map with a marker per base; hovering a marker or a country
 * chip highlights the other, and any click leads to the dedicated page.
 */
export default function CommunityMap() {
  const [activeId, setActiveId] = useState(null);
  const history = useHistory();
  const statistics = getBaseStatistics();

  const goToBase = (base) => history.push(`${COMMUNITY_BASES_ROUTE}#${base.id}`);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <PublicIcon className={styles.eyebrowIcon} />
            We are global
          </span>
          <h2 className={styles.title}>
            Our community <span className={styles.titleAccent}>bases</span> around the world
          </h2>
          <p className={styles.subtitle}>
            Eclipse Tractus-X is built by people on every continent we reach. Each claim on the map
            marks a base - a place where contributors, committers and partner organizations build,
            run and grow the dataspace together.
          </p>
        </header>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Bases</dt>
            <dd className={styles.statValue}>{statistics.locations}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Countries</dt>
            <dd className={styles.statValue}>{statistics.countries}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Regions</dt>
            <dd className={styles.statValue}>{statistics.regions}</dd>
          </div>
        </dl>
      </div>

      <WorldMap
        bases={communityBases}
        activeId={activeId}
        onHover={setActiveId}
        onSelect={goToBase}
        compact
        fullBleed
        className={styles.map}
      />

      <div className={styles.container}>
        <div className={styles.chips}>
          {communityBases.map((base) => (
            <Link
              key={base.id}
              to={`${COMMUNITY_BASES_ROUTE}#${base.id}`}
              className={clsx(
                styles.chip,
                base.homeBase && styles.chipHome,
                activeId === base.id && styles.chipActive,
              )}
              onMouseEnter={() => setActiveId(base.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(base.id)}
              onBlur={() => setActiveId(null)}
            >
              <ClaimSymbol brand={base.homeBase} className={styles.chipSymbol} />
              {base.country}
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link className={styles.cta} to={COMMUNITY_BASES_ROUTE}>
            Explore our bases
            <ArrowForwardIcon className={styles.ctaIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
}
