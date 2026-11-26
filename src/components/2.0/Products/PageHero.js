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

import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import styles from './styles.module.scss';

/**
 * Split page header: copy, stats and actions on the left, a visual on the right.
 * Shared by the overview and the category pages so they read as one section.
 */
export default function PageHero({
  breadcrumb,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  lead,
  children,
  stats,
  visual,
  background,
}) {
  const backgroundUrl = useBaseUrl(background || '');
  return (
    <section
      className={clsx(styles.hero, background && styles.heroImage)}
      style={background ? { '--hero-image': `url(${backgroundUrl})` } : undefined}
    >
      {!background && <div className={styles.heroGrid} aria-hidden="true" />}
      <div className={styles.container}>
        {breadcrumb && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <ChevronRightIcon className={styles.breadcrumbSep} />}
                {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              {EyebrowIcon && <EyebrowIcon className={styles.eyebrowIcon} />}
              {eyebrow}
            </span>
            <h1 className={styles.heroTitle}>{title}</h1>
            {lead && <p className={styles.heroLead}>{lead}</p>}
            {children}
            {stats && (
              <dl className={styles.stats}>
                {stats.map((stat) => (
                  <div key={stat.label} className={styles.stat}>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                    <dd className={styles.statValue}>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {visual && <div className={styles.heroVisual}>{visual}</div>}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action shared by the overview and category pages. */
export function JoinCta() {
  return (
    <section className={styles.joinSection}>
      <div className={styles.container}>
        <div className={styles.joinCard}>
          <div>
            <h2 className={styles.joinTitle}>Build with us</h2>
            <p className={styles.joinText}>
              Every product is developed in the open. Report an issue, propose a feature or become a
              contributor in the repository of the product you use.
            </p>
          </div>
          <div className={styles.joinActions}>
            <Link className={styles.buttonPrimary} to="/Contribute">
              Start contributing
            </Link>
            <a
              className={styles.buttonSecondary}
              href="https://github.com/eclipse-tractusx"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub organization
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
