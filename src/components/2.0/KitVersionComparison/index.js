/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './styles.module.scss';

export default function KitVersionComparison() {
  return (
    <div className={styles.comparisonContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <div className={styles.versionCard}>
            <div className={styles.versionHeader}>
              <h3 className={styles.versionTitle}>KIT 1.0</h3>
              <span className={styles.versionBadge}>Legacy</span>
            </div>
            
            <p className={styles.versionDescription}>
              Single-industry focused approach designed specifically for the Catena-X automotive dataspace.
            </p>
            
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <CheckCircleIcon className={styles.featureIcon} />
                <span>Catena-X automotive only</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={styles.featureIcon} />
                <span>Single dataspace support</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={styles.featureIcon} />
                <span>Restricted structure</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={styles.featureIcon} />
                <span>No clear maturity levels</span>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={2} className={styles.arrowColumn}>
          <div className={styles.evolutionArrow}>
            <ArrowForwardIcon className={styles.arrowIcon} />
            <span className={styles.arrowText}>Evolution</span>
          </div>
        </Grid>

        <Grid item xs={12} md={5}>
          <div className={`${styles.versionCard} ${styles.current}`}>
            <div className={styles.versionHeader}>
              <h3 className={styles.versionTitle}>KIT 2.0</h3>
              <span className={`${styles.versionBadge} ${styles.currentBadge}`}>Current</span>
            </div>
            
            <p className={styles.versionDescription}>
              Multi-dataspace, multi-industry approach supporting diverse ecosystems including Manufacturing-X and beyond.
            </p>
            
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <CheckCircleIcon className={`${styles.featureIcon} ${styles.currentIcon}`} />
                <span>Multi-industry support</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={`${styles.featureIcon} ${styles.currentIcon}`} />
                <span>Cross-dataspace compatible</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={`${styles.featureIcon} ${styles.currentIcon}`} />
                <span>Modular architecture</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={`${styles.featureIcon} ${styles.currentIcon}`} />
                <span>Industry-specific extensions</span>
              </div>
              <div className={styles.feature}>
                <CheckCircleIcon className={`${styles.featureIcon} ${styles.currentIcon}`} />
                <span>Harmonized Documentation</span>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
