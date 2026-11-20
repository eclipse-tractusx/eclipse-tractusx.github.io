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
import RepoTree, { buildRepoGroups } from './RepoTree';
import styles from './detail.module.css';

const STATUS = { active: 'Active', 'phase-out': 'Phase-out', tbd: 'To be decided' };

function Person({ github, name, role }) {
  return (
    <a className={styles.person} href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
      <img className={styles.avatar} src={`https://github.com/${github}.png?size=96`} alt="" width="44" height="44" loading="lazy" />
      <span className={styles.personText}>
        <span className={styles.personName}>{name || github}</span>
        <span className={styles.personHandle}>@{github} · {role}</span>
      </span>
    </a>
  );
}

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <h1 className={styles.title}>Open Source Software not found</h1>
          <Link className={styles.btnPrimary} to="/Products">Back to all Open Source Software</Link>
        </div>
      </div>
    );
  }
  const category = productCategories.find(c => c.id === product.category);
  const rel = relevanceTypes.filter(r => product.relevance.includes(r.id));
  const { groups } = buildRepoGroups(product.repositories);
  const leading = groups[0]?.url || product.repositories[0]?.url;
  const repoCount = new Set([
    ...product.repositories.map(r => r.url),
    ...groups.flatMap(g => [g.url, ...g.repositories.map(c => c.url)]),
  ]).size;
  const committers = product.committers || [];
  const contacts = product.contacts || [];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link to="/Products">Open Source Software</Link>
            <span aria-hidden="true">/</span>
            <Link to={category?.route || '/Products'}>{category?.name}</Link>
          </nav>
          <div className={styles.chips}>
            <span className={styles.chip}>{category?.name}</span>
            <span className={`${styles.chip} ${product.status === 'active' ? styles.chipOk : styles.chipWarn}`}>{STATUS[product.status]}</span>
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.lead}>{product.description}</p>
          <div className={styles.actions}>
            {leading && (
              <a className={styles.btnPrimary} href={leading} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            )}
            <a className={styles.btnGhost} href="#repositories">Repositories</a>
            {committers.length > 0 && <a className={styles.btnGhost} href="#people">People</a>}
          </div>
          <dl className={styles.facts}>
            <div><dt>Repositories</dt><dd>{repoCount}</dd></div>
            <div><dt>Committers</dt><dd>{committers.length}</dd></div>
          </dl>
        </div>
      </header>

      <div className={styles.body}>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.h2}>Overview</h2>
            <p className={styles.text}>{product.details}</p>
          </section>

          <section className={styles.section} id="repositories">
            <h2 className={styles.h2}>Repositories</h2>
            <p className={styles.sectionLead}>How the repositories belong together, read from their <code>.tractusx</code> files.</p>
            <RepoTree repositories={product.repositories} />
          </section>

          {(committers.length > 0 || contacts.length > 0) && (
            <section className={styles.section} id="people">
              <h2 className={styles.h2}>People</h2>
              <p className={styles.sectionLead}>Eclipse Tractus-X committers on these repositories.</p>
              <div className={styles.people}>
                {contacts.map(c => <Person key={`c-${c.github}`} github={c.github} name={c.name} role={c.role || 'Contact'} />)}
                {committers.map(c => <Person key={c.github} github={c.github} name={c.name} role="Committer" />)}
              </div>
            </section>
          )}

          {product.agents?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.h2}>AI agents</h2>
              <p className={styles.sectionLead}>Agents defined in the repositories of this project.</p>
              <div className={styles.agents}>
                {product.agents.map(a => (
                  <a key={a.id} className={styles.agent} href={a.url} target="_blank" rel="noopener noreferrer">
                    <span className={styles.agentName}>{a.name}</span>
                    <span className={styles.agentText}>{a.description}</span>
                    <span className={styles.agentRepo}>{a.repository}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className={styles.aside}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>At a glance</h2>
            <dl className={styles.glance}>
              <dt>Category</dt>
              <dd><Link to={category?.route || '/Products'}>{category?.name}</Link></dd>
              <dt>Status</dt>
              <dd>{STATUS[product.status]}</dd>
              <dt>Relevant for</dt>
              <dd>
                <ul className={styles.relList}>
                  {rel.map(r => (
                    <li key={r.id}><span className={styles.swatch} style={{ background: r.color }} />{r.label.replace('Relevant for ', '')}</li>
                  ))}
                </ul>
              </dd>
              {groups[0] && (
                <>
                  <dt>Leading repository</dt>
                  <dd><a href={groups[0].url} target="_blank" rel="noopener noreferrer">{groups[0].name}</a></dd>
                </>
              )}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
