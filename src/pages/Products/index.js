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
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ProductsHeader from '@site/src/components/2.0/ProductsHeader';
import ProductArchitectureDiagram from '@site/src/components/2.0/ProductArchitectureDiagram';
import ProductCard from '@site/src/components/2.0/ProductCard';
import { products, productCategories } from '@site/data/productsData';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function ProductsPage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Products | ${siteConfig.title}`}
      description="Explore the Eclipse Tractus-X product ecosystem — open-source reference implementations powering the Catena-X dataspace."
    >
      <ProductsHeader productCount={products.length} />

      {/* Architecture Diagram */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Product Architecture</h2>
          <p className={styles.sectionSubtitle}>
            Click on any product block to learn more, or click a category title to see all products in that category.
          </p>
        </div>
        <ProductArchitectureDiagram products={products} />
      </section>

      {/* Category Cards */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
        </div>
        <div className={styles.categoryGrid}>
          {productCategories.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            const categoryRoutes = {
              'use-cases': '/Products/use-cases',
              'dataspace-foundation': '/Products/dataspace-foundation',
              'industry-core-foundation': '/Products/industry-core',
              'qa-testing-tools': '/Products/qa-testing',
            };
            return (
              <Link
                key={cat.id}
                to={categoryRoutes[cat.id]}
                className={styles.categoryCard}
              >
                <div className={styles.categoryGradient} style={{ background: cat.gradient }} />
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryName}>{cat.name}</h3>
                  <p className={styles.categoryDescription}>{cat.description}</p>
                  <span className={styles.categoryCount}>{count} product{count !== 1 ? 's' : ''} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All Products Grid */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Products</h2>
          <p className={styles.sectionSubtitle}>
            Showing all {products.length} products in the Eclipse Tractus-X ecosystem.
          </p>
        </div>
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
