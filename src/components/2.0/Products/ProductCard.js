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
import { productCategories } from '@site/data/productsData';
import RelevanceDots from './RelevanceDots';
import styles from './styles.module.css';

const STATUS = { 'phase-out': 'Phase-out', tbd: 'To be decided' };

export default function ProductCard({ product }) {
  const category = productCategories.find(c => c.id === product.category);
  const repos = product.repositories.length;
  return (
    <Link
      to={`/Products/detail?id=${product.id}`}
      className={`${styles.card}`}
      style={category ? { '--cat-grad': category.gradient, '--cat-accent': category.accent } : undefined}
    >
      <div className={styles.cardTop}>
        <span className={styles.category}><span className={styles.catDot} aria-hidden="true" />{category?.name}</span>
        {STATUS[product.status] && (
          <span className={`${styles.badge} ${product.status === 'phase-out' ? styles.badgePhase : ''}`}>
            {STATUS[product.status]}
          </span>
        )}
      </div>
      <h3 className={styles.cardName}>{product.name}</h3>
      <p className={styles.cardText}>{product.description}</p>
      <div className={styles.cardFoot}>
        <RelevanceDots relevance={product.relevance} />
        <span>{repos} {repos === 1 ? 'repository' : 'repositories'}</span>
      </div>
    </Link>
  );
}
