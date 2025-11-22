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
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './styles.module.scss';

export default function KitCategoryCard({ icon: Icon, title, description, highlight, examples, color = 'primary' }) {
  return (
    <div className={`${styles.categoryCard} ${styles[color]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>
        <h4 className={styles.title}>{title}</h4>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.highlight}>
        <BoltIcon className={styles.highlightIcon} />
        <span>{highlight}</span>
      </div>
      
      <div className={styles.examples}>
        <div className={styles.examplesTitle}>Examples:</div>
        <ul className={styles.examplesList}>
          {examples.map((example, idx) => (
            <li key={idx}>
              <CheckCircleIcon className={styles.checkIcon} />
              {example}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
