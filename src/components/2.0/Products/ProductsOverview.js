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

import React, { useMemo, useState, useEffect } from 'react';
import { products, productCategories } from '@site/data/productsData';
import ProductArchitecture from './ProductArchitecture';
import ProductCard from './ProductCard';
import styles from './styles.module.css';

export default function ProductsOverview() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  // Navbar links use /Products#<category-id>.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (productCategories.some(c => c.id === id)) setCategory(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      p =>
        (category === 'all' || p.category === category) &&
        (!q || `${p.name} ${p.description}`.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const active = products.filter(p => p.status === 'active').length;
  const repos = new Set(products.flatMap(p => p.repositories.map(r => r.url))).size;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.overline}>Eclipse Tractus-X</p>
          <h1 className={styles.title}>
            <em>Open Source Software</em> of the dataspace
          </h1>
          <p className={styles.lead}>
            Open-source reference implementations that power Catena-X and Manufacturing-X, grouped as in the
            Tractus-X classification.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statValue}>{products.length}</span><span className={styles.statLabel}>Projects</span></div>
            <div className={styles.stat}><span className={styles.statValue}>{active}</span><span className={styles.statLabel}>Active</span></div>
            <div className={styles.stat}><span className={styles.statValue}>{repos}</span><span className={styles.statLabel}>Repositories</span></div>
            <div className={styles.stat}><span className={styles.statValue}>{productCategories.length}</span><span className={styles.statLabel}>Categories</span></div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>Architecture</h2>
        <p className={styles.sectionLead}>
          Each row is a category. Open a project, or pick a category to filter the list below.
        </p>
        <ProductArchitecture products={products} onSelectCategory={setCategory} />
      </section>

      <section className={styles.section} id="all">
        <h2 className={styles.h2}>All Open Source Software</h2>
        <div className={styles.filters} role="group" aria-label="Filter by category">
          {[{ id: 'all', name: 'All' }, ...productCategories].map(c => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              className={`${styles.chip} ${category === c.id ? styles.chipActive : ''}`}
              style={c.gradient ? { '--cat-grad': c.gradient, '--cat-accent': c.accent } : undefined}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
          <input
            className={styles.search}
            type="search"
            placeholder="Search Open Source Software"
            aria-label="Search Open Source Software"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {shown.length ? (
          <div className={styles.grid}>
            {shown.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p className={styles.empty}>No Open Source Software matches.</p>
        )}
      </section>
    </div>
  );
}
