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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import PublicIcon from '@mui/icons-material/Public';
import PlaceIcon from '@mui/icons-material/Place';
import GroupsIcon from '@mui/icons-material/Groups';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HandshakeIcon from '@mui/icons-material/Handshake';
import StarIcon from '@mui/icons-material/Star';
import WorldMap from '@site/src/components/CommunityMap/WorldMap';
import ClaimSymbol from '@site/src/components/CommunityMap/ClaimSymbol';
import {
  communityBases,
  getBasesByRegion,
  getBaseStatistics,
  REGION_ORDER,
} from '@site/data/communityBases';
import styles from './styles.module.scss';

const ALL_REGIONS = 'All';

/** Card listing every partner organization of a base, or inviting new ones. */
function PartnerList({ base }) {
  if (base.partners.length === 0) {
    return (
      <div className={styles.partnersEmpty}>
        <HandshakeIcon className={styles.partnersEmptyIcon} />
        <div>
          <p className={styles.partnersEmptyTitle}>No partners listed yet</p>
          <p className={styles.partnersEmptyText}>
            Building with Tractus-X in {base.country}?{' '}
            <Link className={styles.partnersEmptyLink} to="/community/open-meetings">
              Get your organization listed
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.partners}>
      {base.partners.map((partner) => {
        const content = (
          <>
            <span className={styles.partnerName}>
              {partner.name}
              {partner.url && <OpenInNewIcon className={styles.partnerLinkIcon} />}
            </span>
            {partner.role && <span className={styles.partnerRole}>{partner.role}</span>}
            {partner.description && (
              <span className={styles.partnerDescription}>{partner.description}</span>
            )}
          </>
        );

        return (
          <li key={partner.name} className={styles.partner}>
            {partner.url ? (
              <a
                className={styles.partnerLink}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** One community base, rendered as an anchorable card. */
function BaseCard({ base, isActive, onHover, cardRef }) {
  // Registers the card id so Docusaurus accepts /CommunityBases#<id> deep links.
  useBrokenLinks().collectAnchor(base.id);

  return (
    <article
      id={base.id}
      ref={cardRef}
      className={clsx(styles.card, base.homeBase && styles.cardHome, isActive && styles.cardActive)}
      onMouseEnter={() => onHover(base.id)}
      onMouseLeave={() => onHover(null)}
    >
      <header className={styles.cardHeader}>
        <span className={styles.cardSymbol}>
          <ClaimSymbol brand={base.homeBase} />
        </span>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>{base.country}</h3>
          <p className={styles.cardLocation}>
            <PlaceIcon className={styles.cardLocationIcon} />
            {base.city ? `${base.city} - ${base.region}` : base.region}
          </p>
        </div>
        {base.homeBase && (
          <span className={styles.homeBadge}>
            <StarIcon className={styles.homeBadgeIcon} />
            Home base
          </span>
        )}
      </header>

      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>{base.description}</p>

        {base.focus && base.focus.length > 0 && (
          <ul className={styles.focusTags}>
            {base.focus.map((topic) => (
              <li key={topic} className={styles.focusTag}>
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.cardPartners}>
        <h4 className={styles.cardPartnersTitle}>
          <GroupsIcon className={styles.cardPartnersIcon} />
          Partners
          {base.partners.length > 0 && (
            <span className={styles.cardPartnersCount}>{base.partners.length}</span>
          )}
        </h4>
        <PartnerList base={base} />
      </div>
    </article>
  );
}

export default function CommunityBasesPage() {
  const [activeId, setActiveId] = useState(null);
  const [region, setRegion] = useState(ALL_REGIONS);
  const cardRefs = useRef({});
  const location = useLocation();
  const statistics = getBaseStatistics();

  const regionFilters = useMemo(
    () => [
      ALL_REGIONS,
      ...REGION_ORDER.filter((name) => communityBases.some((base) => base.region === name)),
    ],
    [],
  );

  const visibleBases = useMemo(
    () =>
      region === ALL_REGIONS
        ? communityBases
        : communityBases.filter((base) => base.region === region),
    [region],
  );

  const groupedBases = useMemo(
    () => getBasesByRegion().filter((group) => region === ALL_REGIONS || group.region === region),
    [region],
  );

  const revealBase = useCallback((id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  // Deep links such as /CommunityBases#india select and scroll to that base,
  // both on a fresh load and when arriving from the home page teaser.
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id || !communityBases.some((base) => base.id === id)) return;
    setRegion(ALL_REGIONS);
    setActiveId(id);
    const timeout = setTimeout(() => revealBase(id), 120);
    return () => clearTimeout(timeout);
  }, [location.hash, revealBase]);

  const handleSelect = (base) => {
    setRegion(ALL_REGIONS);
    setActiveId(base.id);
    setTimeout(() => revealBase(base.id), 60);
  };

  return (
    <Layout
      title="Community Bases"
      description="Explore the Eclipse Tractus-X community bases around the world and the partner organizations building the dataspace in each location."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>
              <PublicIcon className={styles.eyebrowIcon} />
              We are global
            </span>
            <h1 className={styles.heroTitle}>
              Eclipse Tractus-X <span className={styles.accent}>bases</span> around the world
            </h1>
            <p className={styles.heroSubtitle}>
              Our mission is to build solid Eclipse Tractus-X bases wherever the community grows. A
              base is more than a pin on a map: it is a local group of contributors, committers,
              adopters and partner organizations that build, run and promote the dataspace together.
              Pick a claim on the map to see who is behind it.
            </p>

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
              {statistics.partners > 0 && (
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Partners</dt>
                  <dd className={styles.statValue}>{statistics.partners}</dd>
                </div>
              )}
            </dl>
          </div>

          <WorldMap
            bases={communityBases}
            activeId={activeId}
            onHover={setActiveId}
            onSelect={handleSelect}
            showLabels
            fullBleed
            className={styles.heroMap}
          />
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.filters} role="tablist" aria-label="Filter bases by region">
              {regionFilters.map((name) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={region === name}
                  className={clsx(styles.filter, region === name && styles.filterActive)}
                  onClick={() => setRegion(name)}
                >
                  {name}
                  <span className={styles.filterCount}>
                    {name === ALL_REGIONS
                      ? communityBases.length
                      : communityBases.filter((base) => base.region === name).length}
                  </span>
                </button>
              ))}
            </div>

            {groupedBases.map((group) => (
              <div key={group.region} className={styles.regionGroup}>
                <h2 className={styles.regionTitle}>
                  {group.region}
                  <span className={styles.regionCount}>
                    {group.bases.length} {group.bases.length === 1 ? 'base' : 'bases'}
                  </span>
                </h2>
                <div className={styles.cards}>
                  {group.bases.map((base) => (
                    <BaseCard
                      key={base.id}
                      base={base}
                      isActive={activeId === base.id}
                      onHover={setActiveId}
                      cardRef={(node) => {
                        cardRefs.current[base.id] = node;
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {visibleBases.length === 0 && (
              <p className={styles.emptyState}>No bases in this region yet - want to start one?</p>
            )}
          </div>
        </section>

        <section className={styles.joinSection}>
          <div className={styles.container}>
            <div className={styles.joinCard}>
              <ClaimSymbol brand className={styles.joinSymbol} />
              <div>
                <h2 className={styles.joinTitle}>Put your country on the map</h2>
                <p className={styles.joinText}>
                  Eclipse Tractus-X is open to everyone, everywhere. If you are building with the
                  dataspace from a country that is not on the map yet, come to an open meeting and
                  tell us about it - we will happily add a new base.
                </p>
                <div className={styles.joinActions}>
                  <Link className={styles.joinPrimary} to="/community/open-meetings">
                    Join an open meeting
                  </Link>
                  <Link className={styles.joinSecondary} to="/Contribute">
                    Start contributing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
