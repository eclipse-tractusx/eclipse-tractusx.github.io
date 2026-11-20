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
import RelevanceDots from './RelevanceDots';
import styles from './styles.module.css';

/** Layered view of the product classification: one row per category, one tile per product. */
export default function ProductArchitecture({ products, onSelectCategory }) {
  return (
    <div>
      <div className={styles.arch}>
        {productCategories.map(cat => {
          const items = products.filter(p => p.category === cat.id);
          return (
            <div key={cat.id} className={styles.layer} style={{ '--cat-grad': cat.gradient, '--cat-accent': cat.accent }}>
              <div className={styles.layerHead}>
                <span className={styles.layerIndex} aria-hidden="true">{String(productCategories.indexOf(cat) + 1).padStart(2, '0')}</span>
                <a
                  href={`#${cat.id}`}
                  className={styles.layerName}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  {cat.name}
                </a>
                <div className={styles.layerCount}>{items.length} products</div>
                <p className={styles.layerText}>{cat.description}</p>
              </div>
              <div className={styles.layerBody}>
                {items.map(p => (
                  <Link
                    key={p.id}
                    to={`/Products/detail?id=${p.id}`}
                    className={`${styles.tile} ${p.status === 'phase-out' ? styles.tilePhase : ''}`}
                  >
                    <RelevanceDots relevance={p.relevance} />
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        {relevanceTypes.map(r => (
          <span key={r.id} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: r.color }} />
            {r.label.replace('Relevant for ', '')}
          </span>
        ))}
        <span className={styles.legendItem}>
          <span className={styles.legendDashed} /> Phase-out
        </span>
      </div>
    </div>
  );
}
