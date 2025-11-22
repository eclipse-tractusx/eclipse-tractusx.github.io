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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublicIcon from '@mui/icons-material/Public';
import DataspaceCard from '@site/src/components/2.0/DataspaceCard';
import styles from './styles.module.scss';

export default function KitGalleryHeader({ 
  categoryData,
  title,
  description,
  subtitle,
  logo,
  url,
  gradient,
  statistics,
  dataspaces,
  backButtonLink = "/Kits",
  backButtonText = "Back to All KITs"
}) {
  return (
    <div className={styles.header}>
      <div 
        className={styles.header_background}
        style={{ '--category-gradient': gradient || categoryData?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      ></div>
      
      <Link to={backButtonLink} className={styles.back_button}>
        <ArrowBackIcon className={styles.back_icon} />
        <span>{backButtonText}</span>
      </Link>
      
      <div className={styles.header_content}>
        <div className={styles.category_hero}>
          {/* Icon or Logo Section */}
          {categoryData?.icon && (
            <div 
              className={styles.category_icon_container}
              style={{ '--category-gradient': categoryData.gradient }}
            >
              {React.createElement(categoryData.icon, { className: styles.category_icon })}
            </div>
          )}
          
          {/* Debug: Show if categoryData exists */}
          {!categoryData?.icon && categoryData && (
            <div style={{ color: 'red', fontSize: '12px' }}>
              Debug: categoryData exists but no icon found
            </div>
          )}
          
          {logo && (
            <div className={styles.logo_container}>
              <img 
                src={logo.src}
                alt={logo.alt}
                className={styles.dataspace_logo}
                style={{
                  width: logo.width ? `${logo.width * 2}px` : '105px',
                  height: logo.height === 'auto' ? 'auto' : (logo.height ? `${logo.height * 2}px` : '105px'),
                  objectFit: 'contain'
                }}
              />
            </div>
          )}
          
          <div className={styles.category_content}>
            <h1 className={styles.category_title}>
              {title || categoryData?.title}
            </h1>
            
            {subtitle && (
              <p className={styles.category_subtitle}>
                {subtitle}
              </p>
            )}
            
            <p className={styles.category_description}>
              {description || categoryData?.description}
            </p>
            
            {url && (
              <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.external_link}
              >
                Visit Website →
              </a>
            )}
            
          </div>

          {/* Statistics Section on the Right */}
          {statistics && (
            <div className={styles.statistics_container}>
              <div className={styles.statistics_grid}>
                {/* Total KITs Card */}
                <div className={styles.stat_card} style={{ '--stat-gradient': gradient }}>
                  <div className={styles.stat_border}></div>
                  <div className={styles.stat_number} style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {statistics.total}
                  </div>
                  <h3 className={styles.stat_label}>Total KITs</h3>
                </div>

                {/* Graduated KITs Card */}
                {statistics.graduated > 0 && (
                  <div className={styles.stat_card}>
                    <div className={styles.stat_border}></div>
                    <div className={styles.stat_number}>
                      {statistics.graduated}
                    </div>
                    <h3 className={styles.stat_label}>Graduated</h3>
                  </div>
                )}

                {/* Incubating KITs Card */}
                {statistics.incubating > 0 && (
                  <div className={styles.stat_card}>
                    <div className={styles.stat_border}></div>
                    <div className={styles.stat_number}>
                      {statistics.incubating}
                    </div>
                    <h3 className={styles.stat_label}>Incubating</h3>
                  </div>
                )}

                {/* Sandbox KITs Card */}
                {statistics.sandbox > 0 && (
                  <div className={styles.stat_card}>
                    <div className={styles.stat_border}></div>
                    <div className={styles.stat_number}>
                      {statistics.sandbox}
                    </div>
                    <h3 className={styles.stat_label}>Sandbox</h3>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dataspace Section */}
        {dataspaces && dataspaces.length > 0 && (
          <div className={styles.dataspace_section}>
            <div className={styles.section_header}>
              <PublicIcon className={styles.section_icon} />
              <h2 className={styles.section_title}>
                Associated {dataspaces.length === 1 ? 'Dataspace' : 'Dataspaces'}
              </h2>
            </div>

            <div className={styles.dataspace_grid} data-count={dataspaces.length}>
              {dataspaces.map((dataspace, index) => (
                <DataspaceCard 
                  key={index}
                  dataspace={dataspace}
                  gradient={gradient}
                />
              ))}
            </div>
          </div>
        )}
        
        {dataspaces && dataspaces.length === 0 && (
          <div className={styles.no_dataspace_section}>
            <div className={styles.no_dataspace_container}>
              <p className={styles.no_dataspace_message}>
                No associated dataspaces published to Eclipse Tractus-X and assigned to this industry category yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}