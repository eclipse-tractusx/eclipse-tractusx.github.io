/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
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
import styles from './styles.module.scss';

const relevanceLabels = {
  'catena-x-operative': 'Relevant for Catena-X Operative',
  'development-testing': 'Relevant for Catena-X Development / Testing',
  'catena-x-demo': 'Relevant for Catena-X Demo',
  'dataspace-participants': 'Relevant for Catena-X Dataspace Participants',
  'manufacturing-x': 'Relevant for Manufacturing-X',
};

const relevanceColors = {
  'catena-x-operative': '#f8a4a4',
  'development-testing': '#a4c8f8',
  'catena-x-demo': '#d4a4f8',
  'dataspace-participants': '#a4f8c8',
  'manufacturing-x': '#f8f0a4',
};

const categoryLabels = {
  'use-cases': 'Use Cases',
  'dataspace-foundation': 'Dataspace Foundation',
  'industry-core-foundation': 'Industry Core Foundation',
  'qa-testing-tools': 'QA / Testing & Tools',
};

const categoryRoutes = {
  'use-cases': '/Products/use-cases',
  'dataspace-foundation': '/Products/dataspace-foundation',
  'industry-core-foundation': '/Products/industry-core',
  'qa-testing-tools': '/Products/qa-testing',
};

export default function ProductDetailView({ product }) {
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
        <Link to="/Products" className={styles.backLink}>← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.detailView}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/Products">Products</Link>
        <span className={styles.separator}>/</span>
        <Link to={categoryRoutes[product.category] || '/Products'}>
          {categoryLabels[product.category] || product.category}
        </Link>
        <span className={styles.separator}>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <span className={styles.heroIcon}>{product.icon}</span>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{product.name}</h1>
          {product.subtitle && <p className={styles.heroSubtitle}>{product.subtitle}</p>}
          <div className={styles.badges}>
            {product.status === 'phase-out' && (
              <span className={styles.badge} data-type="warning">⚠️ Phase Out / Refactoring</span>
            )}
            {product.status === 'tbd' && (
              <span className={styles.badge} data-type="info">ℹ️ TBD</span>
            )}
            {product.status === 'active' && (
              <span className={styles.badge} data-type="success">✅ Active</span>
            )}
            <Link
              to={categoryRoutes[product.category] || '/Products'}
              className={styles.categoryBadge}
            >
              {categoryLabels[product.category]}
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2>Overview</h2>
            <p>{product.details || product.description}</p>
          </section>

          {/* Relevance */}
          {product.relevance?.length > 0 && (
            <section className={styles.section}>
              <h2>Relevance</h2>
              <div className={styles.relevanceTags}>
                {product.relevance.map(r => (
                  <span
                    key={r}
                    className={styles.relevanceTag}
                    style={{ backgroundColor: relevanceColors[r] || '#e0e0e0' }}
                  >
                    {relevanceLabels[r] || r}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Repositories */}
          {product.repositories?.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3>📁 Repositories</h3>
              <ul className={styles.repoList}>
                {product.repositories.map(repo => (
                  <li key={repo.name}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                      <svg viewBox="0 0 16 16" width="16" height="16" className={styles.githubIcon}>
                        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contacts */}
          {product.contacts?.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3>👥 Contacts</h3>
              <ul className={styles.contactList}>
                {product.contacts.map(contact => (
                  <li key={contact.github || contact.name}>
                    <strong>{contact.name}</strong>
                    {contact.role && <span className={styles.role}>{contact.role}</span>}
                    {contact.github && (
                      <a
                        href={`https://github.com/${contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubHandle}
                      >
                        @{contact.github}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          <div className={styles.sidebarSection}>
            <h3>🔗 Quick Links</h3>
            <div className={styles.quickLinks}>
              <Link to="/Products" className={styles.quickLink}>
                ← All Products
              </Link>
              <Link to="/Kits" className={styles.quickLink}>
                📦 KITs
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
