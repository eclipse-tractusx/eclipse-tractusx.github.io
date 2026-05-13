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

export default function ProductArchitectureDiagram({ products }) {
  const byCategory = (catId) => products.filter(p => p.category === catId);

  const relevanceColorMap = {
    'catena-x-operative': '#f8a4a4',
    'development-testing': '#a4c8f8',
    'catena-x-demo': '#d4a4f8',
    'dataspace-participants': '#a4f8c8',
    'manufacturing-x': '#f8f0a4',
  };

  const getProductStyle = (product) => {
    const color = product.relevance?.[0]
      ? relevanceColorMap[product.relevance[0]] || '#e0e0e0'
      : '#e0e0e0';
    const isPhaseOut = product.status === 'phase-out';
    const isTbd = product.status === 'tbd';
    return {
      backgroundColor: color,
      borderStyle: isPhaseOut ? 'dashed' : 'solid',
      opacity: isTbd ? 0.85 : 1,
    };
  };

  const renderProductBlock = (product) => (
    <Link
      key={product.id}
      to={`/Products/detail?id=${product.id}`}
      className={styles.productBlock}
      style={getProductStyle(product)}
    >
      <span className={styles.productIcon}>{product.icon}</span>
      <span className={styles.productName}>{product.name.toUpperCase()}</span>
      {product.status === 'tbd' && <span className={styles.tbd}>*</span>}
    </Link>
  );

  const useCases = byCategory('use-cases');
  const dataspaceFoundation = byCategory('dataspace-foundation');
  const industryCoreFoundation = byCategory('industry-core-foundation');
  const qaTestingTools = byCategory('qa-testing-tools');

  return (
    <div className={styles.architectureWrapper}>
      <div className={styles.architectureDiagram}>
        {/* KITs reference on the side */}
        <div className={styles.kitsReference}>
          <Link to="/Kits" className={styles.kitsLink}>
            <span>KITs</span>
            <span className={styles.kitsSubtext}>Documentation</span>
          </Link>
        </div>

        <div className={styles.diagramContent}>
          {/* USE CASES layer */}
          <div className={styles.layer}>
            <Link to="/Products/use-cases" className={styles.layerTitleLink}>
              <h3 className={styles.layerTitle}>USE CASES</h3>
            </Link>
            <div className={styles.layerContent}>
              {useCases.map(renderProductBlock)}
            </div>
          </div>

          {/* Foundation layers */}
          <div className={styles.foundationsRow}>
            {/* Dataspace Foundation */}
            <div className={styles.foundationSection}>
              <Link to="/Products/dataspace-foundation" className={styles.layerTitleLink}>
                <h3 className={styles.layerTitle}>DATASPACE FOUNDATION</h3>
              </Link>
              <div className={styles.layerContent}>
                {dataspaceFoundation.map(renderProductBlock)}
              </div>
            </div>

            {/* Industry Core Foundation */}
            <div className={styles.foundationSection}>
              <Link to="/Products/industry-core" className={styles.layerTitleLink}>
                <h3 className={styles.layerTitle}>INDUSTRY CORE FOUNDATION</h3>
              </Link>
              <div className={styles.layerContent}>
                {industryCoreFoundation.map(renderProductBlock)}
              </div>
            </div>

            {/* QA / Testing & Tools */}
            <div className={styles.foundationSection}>
              <Link to="/Products/qa-testing" className={styles.layerTitleLink}>
                <h3 className={styles.layerTitle}>QA / TESTING & TOOLS</h3>
              </Link>
              <div className={styles.layerContent}>
                {qaTestingTools.map(renderProductBlock)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ borderStyle: 'dashed', backgroundColor: 'transparent', border: '2px dashed #666' }} />
          <span>Phase out / Refactoring</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#f8a4a4' }} />
          <span>Relevant for Catena-X Operative</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#a4c8f8' }} />
          <span>Relevant for Catena-X Development / Testing</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#d4a4f8' }} />
          <span>Relevant for Catena-X Demo</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#a4f8c8' }} />
          <span>Relevant for Catena-X Dataspace Participants</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#f8f0a4' }} />
          <span>Relevant for Manufacturing-X</span>
        </div>
      </div>

      <p className={styles.tdbNote}>* TBD</p>
    </div>
  );
}
