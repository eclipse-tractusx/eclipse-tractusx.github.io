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

import React, { useEffect, useMemo, useState, useRef } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeIcon from '@mui/icons-material/CodeRounded';
import GavelIcon from '@mui/icons-material/GavelOutlined';
import VerifiedIcon from '@mui/icons-material/VerifiedOutlined';
import HubIcon from '@mui/icons-material/HubOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardRounded';
import { products } from '@site/data/productsData';
import { JoinCta } from './PageHero';
import ArchitectureView from './ArchitectureView';
import ProductBrowser from './ProductBrowser';
import useParallax from './useParallax';
import ProfilePicker, { getProfile } from './ProfilePicker';
import { HERO_BACKGROUNDS, getStatistics } from './productMeta';
import styles from './styles.module.scss';

const PILLARS = [
  {
    icon: GavelIcon,
    title: 'Open source',
    text: 'Developed in the open as an Eclipse Foundation project, under the Apache License 2.0.',
  },
  {
    icon: VerifiedIcon,
    title: 'Release-ready',
    text: 'Every release follows the Eclipse Tractus-X Release Guidelines for quality, security and documentation.',
    link: { label: 'TRGs', to: '/docs/release' },
  },
  {
    icon: HubIcon,
    title: 'Interoperable',
    text: 'Built on open standards and the KITs, so components from different vendors work together.',
    link: { label: 'KITs', to: '/Kits' },
  },
  {
    icon: RocketLaunchIcon,
    title: 'Ready to use',
    text: 'Deploy with Helm, start a full dataspace locally with the Umbrella chart, or extend the code.',
    link: { label: 'Umbrella', to: '/Products/detail?id=umbrella' },
  },
];

/** /Products: introduction, the architecture of all products, and the product list. */
export default function ProductsOverview() {
  const heroBackground = useBaseUrl(HERO_BACKGROUNDS.overview);
  const backgroundRef = useRef(null);
  useParallax(backgroundRef);
  const statistics = getStatistics();
  const [profileId, setProfileId] = useState(null);
  const profile = getProfile(profileId);
  const highlight = useMemo(() => (profile ? new Set(profile.products) : null), [profile]);
  const listed = profile ? products.filter((product) => highlight.has(product.id)) : products;

  // The selected profile is kept in the URL (?for=<profile>) so it can be shared.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('for');
    if (getProfile(fromUrl)) setProfileId(fromUrl);
  }, []);

  const selectProfile = (id) => {
    setProfileId(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('for', id);
    else url.searchParams.delete('for');
    window.history.replaceState(null, '', url);
  };

  return (
    <main className={styles.page}>
      <section className={styles.introHero}>
        {/* Background from the Eclipse Tractus-X set; it drifts slower than the page. */}
        <div
          ref={backgroundRef}
          className={styles.introBackground}
          style={{ backgroundImage: `url(${heroBackground})` }}
          aria-hidden="true"
        />
        <div className={styles.introShade} aria-hidden="true" />
        <div className={styles.container}>
          <span className={styles.eyebrow}>
            <CodeIcon className={styles.eyebrowIcon} />
            Open Source Software
          </span>
          <h1 className={styles.introTitle}>
            Eclipse Tractus-X is the <span className={styles.accent}>open industrial data space stack</span>
          </h1>
          <p className={styles.introLead}>
            Open source software to build and operate cross-domain, international and productive data
            ecosystems, supported by a community of experts in dataspace technology.
          </p>
          <div className={styles.introActions}>
            <a className={styles.buttonPrimary} href="#architecture">
              Explore the architecture
              <ArrowDownwardIcon className={styles.buttonIcon} />
            </a>
            <a className={styles.buttonGhostDark} href="#products">
              Browse all products
            </a>
          </div>
          <dl className={styles.introStats}>
            {[
              { label: 'Products', value: statistics.products },
              { label: 'Repositories', value: statistics.repositories },
              { label: 'Committers', value: statistics.committers },
              { label: 'AI agents', value: statistics.agents },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.introBlock}>
            <div className={styles.introText}>
              <h2 className={styles.sectionTitle}>What is Eclipse Tractus-X open source software?</h2>
              <p>
                A data space lets companies share data while each keeps control over its own. Eclipse
                Tractus-X provides the software stack for it: the foundation every participant needs, shared
                industry building blocks, applications for concrete use cases, and the tools to build and test
                all of it.
              </p>
              <p>
                <strong>Business value is the core.</strong> Every product we keep must help an adopter reach
                a working use case.
              </p>
            </div>
            <ul className={`${styles.pillars} ${styles.pillarsRow}`}>
              {PILLARS.map(({ icon: Icon, title, text, link }) => (
                <li key={title} className={styles.pillar}>
                  <Icon className={styles.pillarIcon} />
                  <h3 className={styles.offerTitle}>{title}</h3>
                  <p className={styles.offerText}>
                    {text}{' '}
                    {link && (
                      <Link className={styles.pillarLink} to={link.to}>
                        {link.label} →
                      </Link>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div id="architecture" className={styles.anchor}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>How it all comes together</h2>
              <p className={styles.sectionLead}>
                The core of Eclipse Tractus-X is a cycle around the community: the KITs create the value, use
                case apps put it to work, the core technology carries it, and the tools keep it tested. Pick
                your profile to see what is in it for you.
              </p>
            </div>
            <ProfilePicker value={profileId} onChange={selectProfile} />
            <ArchitectureView highlight={highlight} />
          </div>

          <div id="products" className={`${styles.anchor} ${styles.productsBlock}`}>
            <ProductBrowser
              items={listed}
              title={profile ? `Products for ${profile.name.toLowerCase()}` : 'All products'}
              grouped
              onReset={profile ? () => selectProfile(null) : undefined}
            />
          </div>
        </div>
      </section>

      <JoinCta />
    </main>
  );
}
