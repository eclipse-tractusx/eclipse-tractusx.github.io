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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import styles from './styles.module.scss';

/**
 * Dark hero shared by the AI pages. The pages are reached from the AI dropdown in the
 * navbar; sub-pages pass `backToOverview` to show a link back to /AI.
 */
export default function AiPageHeader({ backToOverview = false, eyebrow, title, subtitle, stats = [], action }) {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        {backToOverview && (
          <Link to="/AI" className={styles.back}>
            <ArrowBackIcon className={styles.backIcon} />
            Back to AI overview
          </Link>
        )}
        <span className={styles.eyebrow}>
          <AutoAwesomeIcon className={styles.eyebrowIcon} />
          {eyebrow}
        </span>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {stats.length > 0 && (
          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {action && (
          <Link to={action.to} className={styles.action}>
            {action.label}
            <ArrowForwardIcon className={styles.actionIcon} />
          </Link>
        )}
      </div>
    </section>
  );
}
