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

import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { productCategories, relevanceTypes } from '@site/data/productsData';
import RelevanceDots from './RelevanceDots';
import styles from './landscape.module.css';

const STATUS = { 'phase-out': 'Phase-out', tbd: 'To be decided' };

// Where each category sits in the stack: use cases build on the two foundations,
// and the QA / testing tools run alongside all of them.
const AREA = {
  'use-cases': 'uc',
  'dataspace-foundation': 'ds',
  'industry-core-foundation': 'ic',
  'qa-testing-tools': 'qa',
};

function Tile({ p }) {
  return (
    <Link
      to={`/Products/detail?id=${p.id}`}
      className={`${styles.tile} ${p.status !== 'active' ? styles.tileMuted : ''}`}
      title={p.description}
    >
      <span className={styles.tileName}>{p.name}</span>
      <span className={styles.tileMeta}>
        <RelevanceDots relevance={p.relevance} />
        {STATUS[p.status] && <span className={styles.tileStatus}>{STATUS[p.status]}</span>}
      </span>
    </Link>
  );
}

function StackView({ products, onSelectCategory }) {
  return (
    <div className={styles.stack}>
      {productCategories.map((cat, i) => {
        const items = products.filter(p => p.category === cat.id);
        return (
          <section key={cat.id} className={`${styles.cluster} ${cat.id === 'qa-testing-tools' ? styles.rail : ''}`} style={{ gridArea: AREA[cat.id] }} aria-labelledby={`cl-${cat.id}`}>
            <header className={styles.clusterHead}>
              <span className={styles.clusterIndex}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <a id={`cl-${cat.id}`} href={`#${cat.id}`} className={styles.clusterName} onClick={() => onSelectCategory(cat.id)}>
                  {cat.name}
                </a>
                <p className={styles.clusterText}>{cat.description}</p>
              </div>
              <span className={styles.clusterCount}>{items.length}</span>
            </header>
            <div className={styles.tiles}>
              {items.map(p => <Tile key={p.id} p={p} />)}
            </div>
          </section>
        );
      })}
      <div className={styles.buildsOn} aria-hidden="true"><span>builds on</span></div>
    </div>
  );
}

function RelevanceView({ products }) {
  return (
    <div className={styles.matrix}>
      {relevanceTypes.map(r => {
        const items = products.filter(p => p.relevance.includes(r.id));
        return (
          <section key={r.id} className={styles.column}>
            <header className={styles.columnHead}>
              <span className={styles.swatch} style={{ background: r.color }} />
              <span className={styles.columnName}>{r.label.replace('Relevant for ', '')}</span>
              <span className={styles.clusterCount}>{items.length}</span>
            </header>
            <div className={styles.columnBody}>
              {items.map(p => <Tile key={p.id} p={p} />)}
              {!items.length && <span className={styles.none}>None yet</span>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const VIEWS = [
  { id: 'stack', label: 'Stack' },
  { id: 'relevance', label: 'By relevance' },
];

/** The landscape: a stack of the four categories, or the projects grouped by relevance. */
export default function ProductArchitecture({ products, onSelectCategory }) {
  const [view, setView] = useState('stack');
  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.segmented} role="tablist" aria-label="Group the projects">
          {VIEWS.map(v => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              className={`${styles.segment} ${view === v.id ? styles.segmentActive : ''}`}
              onClick={() => setView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className={styles.legend}>
          {relevanceTypes.map(r => (
            <span key={r.id} className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: r.color }} />
              {r.label.replace('Relevant for ', '')}
            </span>
          ))}
        </div>
      </div>
      {view === 'stack'
        ? <StackView products={products} onSelectCategory={onSelectCategory} />
        : <RelevanceView products={products} />}
    </div>
  );
}
