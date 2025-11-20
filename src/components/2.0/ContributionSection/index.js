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
import Link from '@docusaurus/Link';
import { contributionOptions } from '@site/data/contributionData';
import styles from './styles.module.scss';

export default function ContributionSection({ title = 'Ways to Contribute' }) {
  return (
    <div className={styles.contributionSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDescription}>
            There are many ways to get involved and make a difference in the Eclipse Tractus-X ecosystem.
          </p>
        </div>

        <div className={styles.contributionGrid}>
          {contributionOptions.map((option, index) => {
            const IconComponent = option.icon;
            const isExternal = option.link.startsWith('http');
            const CardComponent = isExternal ? 'a' : Link;
            const linkProps = isExternal 
              ? { href: option.link, target: '_blank', rel: 'noopener noreferrer' }
              : { to: option.link };
            const isLastItem = index === contributionOptions.length - 1;
            
            return (
              <CardComponent
                key={index}
                {...linkProps}
                className={`${styles.contributionCard} ${option.primary ? styles.primary : ''}`}
                style={isLastItem ? { gridColumn: '1 / -1' } : {}}
              >
                <div className={styles.cardIcon}>
                  <IconComponent />
                </div>
                <h3 className={styles.cardTitle}>
                  {option.title}
                </h3>
                <p className={styles.cardDescription}>
                  {option.description}
                </p>
              </CardComponent>
            );
          })}
        </div>
      </div>
    </div>
  );
}
