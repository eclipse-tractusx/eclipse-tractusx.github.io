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
import styles from './styles.module.scss';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ProductsHeader({ productCount }) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          Explore the Eclipse Tractus-X product ecosystem — open-source reference implementations
          powering the Catena-X dataspace.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <InventoryIcon className={styles.statIcon} />
            <span className={styles.statNumber}>{productCount}</span>
            <span className={styles.statLabel}>Products</span>
          </div>
          <div className={styles.stat}>
            <CategoryIcon className={styles.statIcon} />
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.stat}>
            <OpenInNewIcon className={styles.statIcon} />
            <span className={styles.statNumber}>Open Source</span>
            <span className={styles.statLabel}>Apache-2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
