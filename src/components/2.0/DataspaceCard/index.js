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
import LaunchIcon from '@mui/icons-material/Launch';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import styles from './styles.module.scss';

export default function DataspaceCard({ dataspace, gradient }) {
  return (
    <div 
      className={styles.dataspace_card}
      style={{ '--dataspace-gradient': dataspace.gradient || gradient }}
    >
      <div className={styles.dataspace_border}></div>
      <div className={styles.card_background}></div>
      
      <div className={styles.card_content}>
        {/* Logo Section */}
        {dataspace.logo && (
          <div className={styles.logo_section}>
            <img 
              src={dataspace.logo.src}
              alt={dataspace.logo.alt}
              className={styles.dataspace_logo_img}
              style={{
                width: dataspace.logo.width ? `${dataspace.logo.width}px` : 'auto',
                height: dataspace.logo.height ? `${dataspace.logo.height}px` : 'auto',
                maxWidth: '100%',
                maxHeight: '80px'
              }}
            />
          </div>
        )}

        {/* Content Section */}
        <div className={styles.text_section}>
          <h3 className={styles.dataspace_name}>
            {dataspace.name}
          </h3>
          
          {dataspace.subtitle && (
            <p className={styles.dataspace_subtitle}>
              {dataspace.subtitle}
            </p>
          )}
          
          {dataspace.description && (
            <p className={styles.dataspace_description}>
              {dataspace.description}
            </p>
          )}
          
          <div className={styles.button_group}>
            <Link 
              to={`/Kits/dataspace?name=${encodeURIComponent(dataspace.name)}`}
              className={styles.dataspace_link}
              style={{ 
                '--link-gradient': dataspace.gradient || gradient,
                '--border-gradient': dataspace.gradient || gradient
              }}
            >
              <span>View KITs</span>
              <LibraryBooksIcon className={styles.link_icon} />
            </Link>
            {dataspace.url && (
              <a 
                href={dataspace.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.dataspace_link_outline}
                style={{ '--link-gradient': dataspace.gradient || gradient }}
              >
                <span>Visit Dataspace</span>
                <LaunchIcon className={styles.link_icon} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
