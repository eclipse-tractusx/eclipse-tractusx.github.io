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

import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import ProductCard from '@site/src/components/2.0/ProductCard';
import { relevanceTypes } from '@site/data/productsData';
import styles from './styles.module.scss';

export default function FilteredProductsGallery({
  categoryData,
  products = [],
}) {
  const [selectedRelevance, setSelectedRelevance] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedRelevance !== 'all') {
      result = result.filter(p => p.relevance?.includes(selectedRelevance));
    }

    if (selectedStatus !== 'all') {
      result = result.filter(p => p.status === selectedStatus);
    }

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, selectedRelevance, selectedStatus, sortOrder]);

  const availableRelevances = useMemo(() => {
    const ids = new Set(products.flatMap(p => p.relevance || []));
    return relevanceTypes.filter(r => ids.has(r.id));
  }, [products]);

  const statuses = useMemo(() => {
    const s = new Set(products.map(p => p.status));
    return [...s].sort();
  }, [products]);

  return (
    <div className={styles.gallery}>
      {/* Header */}
      <div className={styles.header} style={{ background: categoryData.gradient }}>
        <nav className={styles.breadcrumb}>
          <Link to="/Products">← Products</Link>
        </nav>
        <h1 className={styles.title}>{categoryData.name}</h1>
        <p className={styles.description}>{categoryData.description}</p>
        <div className={styles.count}>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          {availableRelevances.length > 1 && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Relevance</label>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.filterButton} ${selectedRelevance === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedRelevance('all')}
                >
                  All
                </button>
                {availableRelevances.map(r => (
                  <button
                    key={r.id}
                    className={`${styles.filterButton} ${selectedRelevance === r.id ? styles.active : ''}`}
                    onClick={() => setSelectedRelevance(r.id)}
                  >
                    <span className={styles.colorDot} style={{ backgroundColor: r.color }} />
                    {r.label.replace('Relevant for ', '')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {statuses.length > 1 && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.filterButton} ${selectedStatus === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedStatus('all')}
                >
                  All
                </button>
                {statuses.map(s => (
                  <button
                    key={s}
                    className={`${styles.filterButton} ${selectedStatus === s ? styles.active : ''}`}
                    onClick={() => setSelectedStatus(s)}
                  >
                    {s === 'active' ? '✅ Active' : s === 'phase-out' ? '⚠️ Phase Out' : 'ℹ️ TBD'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort</label>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.filterButton} ${sortOrder === 'default' ? styles.active : ''}`}
                onClick={() => setSortOrder('default')}
              >
                Default
              </button>
              <button
                className={`${styles.filterButton} ${sortOrder === 'asc' ? styles.active : ''}`}
                onClick={() => setSortOrder('asc')}
              >
                A-Z
              </button>
              <button
                className={`${styles.filterButton} ${sortOrder === 'desc' ? styles.active : ''}`}
                onClick={() => setSortOrder('desc')}
              >
                Z-A
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No products match the selected filters.</p>
            <button className={styles.resetButton} onClick={() => { setSelectedRelevance('all'); setSelectedStatus('all'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
