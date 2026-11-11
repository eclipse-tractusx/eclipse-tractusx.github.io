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
import clsx from 'clsx';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import styles from './styles.module.scss';

export const AI_PAGES = [
  { id: 'overview', label: 'Overview', to: '/AI' },
  { id: 'agents', label: 'Agents', to: '/AI/agents' },
  { id: 'mcp-servers', label: 'MCP Servers', to: '/AI/mcp-servers' },
];

/**
 * Dark hero shared by the AI pages, with the section navigation
 * (Overview, Agents, MCP Servers) below the intro.
 */
export default function AiPageHeader({ active, eyebrow, title, subtitle, stats = [] }) {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
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

        <nav className={styles.tabs} aria-label="AI pages">
          {AI_PAGES.map((page) => (
            <Link
              key={page.id}
              to={page.to}
              className={clsx(styles.tab, active === page.id && styles.tabActive)}
              aria-current={active === page.id ? 'page' : undefined}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
