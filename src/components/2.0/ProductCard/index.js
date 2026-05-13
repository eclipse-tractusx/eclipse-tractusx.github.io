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
  'catena-x-operative': 'Operative',
  'development-testing': 'Dev / Testing',
  'catena-x-demo': 'Demo',
  'dataspace-participants': 'Dataspace',
  'manufacturing-x': 'Manufacturing-X',
};

const relevanceColors = {
  'catena-x-operative': '#f8a4a4',
  'development-testing': '#a4c8f8',
  'catena-x-demo': '#d4a4f8',
  'dataspace-participants': '#a4f8c8',
  'manufacturing-x': '#f8f0a4',
};

export default function ProductCard({ product }) {
  return (
    <Link to={`/Products/detail?id=${product.id}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{product.icon}</span>
        <div className={styles.titleArea}>
          <h3 className={styles.name}>{product.name}</h3>
          {product.subtitle && <span className={styles.subtitle}>{product.subtitle}</span>}
        </div>
        {product.status === 'phase-out' && (
          <span className={styles.statusBadge} data-status="phase-out">Phase Out</span>
        )}
        {product.status === 'tbd' && (
          <span className={styles.statusBadge} data-status="tbd">TBD</span>
        )}
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.tags}>
        {product.relevance?.map(r => (
          <span
            key={r}
            className={styles.tag}
            style={{ backgroundColor: relevanceColors[r] || '#e0e0e0' }}
          >
            {relevanceLabels[r] || r}
          </span>
        ))}
      </div>
      <div className={styles.meta}>
        {product.repositories?.length > 0 && (
          <span className={styles.repoCount}>
            📁 {product.repositories.length} repo{product.repositories.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Link>
  );
}
