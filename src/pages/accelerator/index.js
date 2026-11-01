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

// Dedicated page of the Tractus-X Accelerator, served at accelerator.tractus-x.com.

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PolicyIcon from '@mui/icons-material/Policy';
import ForumIcon from '@mui/icons-material/Forum';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import DownloadIcon from '@mui/icons-material/Download';
import { tractusxOrganizations } from '@site/data/tractusxOrganizations';
import {
  acceleratorFocusAreas,
  acceleratorLogos,
  acceleratorPartnerIds,
} from '@site/data/tractusxAccelerator';
import FundingBadge from '@site/src/components/FundingBadge';
import styles from './styles.module.scss';

// One icon per entry of acceleratorFocusAreas, in the same order.
const focusIcons = [SchoolIcon, ScienceIcon, Diversity3Icon, PolicyIcon, ForumIcon];

const audiences = [
  {
    icon: CodeIcon,
    title: 'Projects',
    description:
      'Open-source projects that want to join Eclipse Tractus-X or grow inside it, with guidance on qualification, releases and quality.',
  },
  {
    icon: GroupsIcon,
    title: 'Developers',
    description:
      'Developers who want to make their first contribution or take on more responsibility, with mentoring from experienced community members.',
  },
  {
    icon: BusinessIcon,
    title: 'Organizations',
    description:
      'Companies and institutions that want to adopt the dataspace technology and actively participate in the open-source community.',
  },
];

const partners = acceleratorPartnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

/** Preview and download link of one logo variant, on a matching background. */
function LogoDownload({ logo }) {
  const src = useBaseUrl(logo.src);
  return (
    <li className={styles.logoTile}>
      <span className={logo.theme === 'dark' ? styles.logoPreviewDark : styles.logoPreviewLight}>
        <img src={src} alt={`Tractus-X Accelerator logo, ${logo.label.toLowerCase()}`} loading="lazy" />
      </span>
      <a className={styles.logoDownload} href={src} download>
        <DownloadIcon className={styles.logoDownloadIcon} />
        {logo.label}
      </a>
    </li>
  );
}

export default function AcceleratorPage() {
  const heroLogo = useBaseUrl(acceleratorLogos.find((logo) => logo.id === 'color-light-text').src);

  return (
    <Layout
      title="Tractus-X Accelerator"
      description="The Tractus-X Accelerator is a cohort-based support program that lowers the barriers to joining and actively contributing to the Eclipse Tractus-X open-source community."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>
              <RocketLaunchIcon className={styles.eyebrowIcon} />
              2026 - 2029
            </span>
            <h1 className={styles.heroTitle}>
              <img className={styles.heroLogo} src={heroLogo} alt="Tractus-X Accelerator" />
            </h1>
            <p className={styles.heroSubtitle}>
              A cohort-based support program for projects, developers and organizations. It
              systematically lowers the technical and organizational barriers to entry and
              sustainably increases active participation in the open-source community.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/community/open-meetings">
                Join an open meeting
              </Link>
              <Link className={styles.secondaryButton} to="/Contribute">
                Start contributing
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What the Accelerator offers</h2>
            <p className={styles.sectionIntro}>
              The Accelerator combines proven approaches from startup acceleration with the
              requirements of industrial open-source ecosystems.
            </p>
            <ul className={styles.cards}>
              {acceleratorFocusAreas.map((area, index) => {
                const Icon = focusIcons[index] || RocketLaunchIcon;
                return (
                  <li key={area} className={styles.card}>
                    <span className={styles.cardIcon}>
                      <Icon />
                    </span>
                    <p className={styles.cardText}>{area}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Who it is for</h2>
            <ul className={styles.cards}>
              {audiences.map(({ icon: Icon, title, description }) => (
                <li key={title} className={styles.card}>
                  <span className={styles.cardIcon}>
                    <Icon />
                  </span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardText}>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Upcoming</h2>
            <Link className={styles.event} to="/blog/hackathon-ii-11-2026">
              <span className={styles.cardIcon}>
                <EventIcon />
              </span>
              <span>
                <span className={styles.eventDate}>November 6, 2026 - ARENA2036, Stuttgart</span>
                <span className={styles.eventTitle}>
                  Second International Eclipse Tractus-X Hackathon
                </span>
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Partners</h2>
            <ul className={styles.partners}>
              {partners.map(({ id, name, logo, url, acceleratorLogoScale }) => (
                <li key={id}>
                  <a href={url} title={name} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo}
                      alt={`${name} logo`}
                      loading="lazy"
                      style={
                        acceleratorLogoScale
                          ? { transform: `scale(${acceleratorLogoScale})` }
                          : undefined
                      }
                    />
                  </a>
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Funding</h2>
            <FundingBadge />

            <h2 className={styles.sectionTitle}>Logo</h2>
            <ul className={styles.logos}>
              {acceleratorLogos.map((logo) => (
                <LogoDownload key={logo.id} logo={logo} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
