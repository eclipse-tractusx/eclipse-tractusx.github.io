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
import { productCategories, relevanceTypes } from '@site/data/productsData';
import styles from './styles.module.css';

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Open Source Software not found</h1>
        <p className={styles.lead}><Link to="/Products">Back to all Open Source Software</Link></p>
      </div>
    );
  }
  const category = productCategories.find(c => c.id === product.category);
  const rel = relevanceTypes.filter(r => product.relevance.includes(r.id));
  return (
    <div className={styles.page} style={category ? { '--cat-grad': category.gradient, '--cat-accent': category.accent } : undefined}>
      <header className={`${styles.hero} ${styles.heroDetail}`}>
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link to="/Products">Open Source Software</Link> / <Link to={`/Products#${product.category}`}>{category?.name}</Link>
          </nav>
          <p className={styles.overline}>{category?.name}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.lead}>{product.description}</p>
        </div>
      </header>

      <div className={styles.detail}>
        <div>
          <h2 className={styles.h2}>Overview</h2>
          <p>{product.details}</p>
          {product.agents?.length > 0 && (
            <>
              <h2 className={styles.h2} style={{ marginTop: 40 }}>AI agents</h2>
              <p className={styles.sectionLead}>Agents defined in the repositories of this project.</p>
              <div className={styles.agents}>
                {product.agents.map(a => (
                  <a key={a.id} className={`${styles.card}`} href={a.url} target="_blank" rel="noopener noreferrer">
                    <h3 className={styles.cardName}>{a.name}</h3>
                    <p className={styles.cardText}>{a.description}</p>
                    <span className={styles.cardFoot}>{a.repository}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <aside>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Relevance</h2>
            <ul className={styles.list}>
              {rel.map(r => (
                <li key={r.id} className={styles.relRow}>
                  <span className={styles.dot} style={{ background: r.color }} />
                  {r.label.replace('Relevant for ', '')}
                </li>
              ))}
              {product.status !== 'active' && (
                <li><span className={`${styles.badge} ${styles.badgePhase}`}>{product.status === 'phase-out' ? 'Phase-out' : 'To be decided'}</span></li>
              )}
            </ul>
          </div>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Repositories</h2>
            {product.repositories.length ? (
              <ul className={styles.list}>
                {product.repositories.map(r => (
                  <li key={r.url}><a className={styles.link} href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a></li>
                ))}
              </ul>
            ) : <span className={styles.personHandle}>No repository listed.</span>}
          </div>
          {product.committers?.length > 0 && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Committers</h2>
              <ul className={styles.list}>
                {product.committers.map(c => (
                  <li key={c.github} className={styles.person}>
                    <img className={styles.avatar} src={`https://github.com/${c.github}.png?size=72`} alt="" width="36" height="36" loading="lazy" />
                    <a className={styles.link} href={`https://github.com/${c.github}`} target="_blank" rel="noopener noreferrer">
                      <span className={styles.personName}>{c.name || c.github}</span>
                      <span className={styles.personHandle}>@{c.github}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
