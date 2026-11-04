/*********************************************************************************
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
import CodeIcon from '@mui/icons-material/Code';
import ExtensionIcon from '@mui/icons-material/Extension';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './styles.module.scss';

/**
 * Product Selection Component
 * Displays two prominent option cards for users to explore
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of option objects with title, description, icon, link
 */
const ProductSelection = ({ options }) => {
  const defaultOptions = [
    {
      id: 'kits',
      title: 'Documentation',
      subtitle: 'Keep It Together (KITs)',
      description: 'Discover our collection of comprehensive documentation with specifications & blueprints which will enable you to build your own dataspace native applications.',
      icon: ExtensionIcon,
      link: 'https://eclipse-tractusx.github.io/Kits',
      external: false,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f5576c'
    },
    {
      id: 'open-source',
      title: 'Software',
      subtitle: 'Free and Open Source Software',
      description: 'Explore our Free and Open Source (FOSS) repositories, contribute to the community, and build with Eclipse Tractus-X components your dataspace solutions.',
      icon: CodeIcon,
      link: 'https://github.com/eclipse-tractusx',
      external: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    }
  ];

  const displayOptions = options || defaultOptions;

  return (
    <section className={styles.productSelection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {displayOptions.map((option) => {
            const IconComponent = option.icon;
            const CardContent = (
              <>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: option.gradient }}
                >
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.title}>{option.title}</h3>
                {option.subtitle && <p className={styles.subtitle}>{option.subtitle}</p>}
                <p className={styles.description}>{option.description}</p>
                <div className={styles.cta}>
                  <span>Explore</span>
                </div>
              </>
            );

            if (option.external) {
              return (
                <a
                  key={option.id}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  style={{ '--hover-color': option.color }}
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <Link
                key={option.id}
                to={option.link}
                className={styles.card}
                style={{ '--hover-color': option.color }}
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSelection;
