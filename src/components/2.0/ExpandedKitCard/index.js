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

import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import { getKitGradient } from '@site/data/kitsData';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/HistoryRounded';

const ExpandedKitCard = ({ kit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Get the gradient for this specific kit
  const kitGradient = getKitGradient(kit);

  return (
    <div className={styles.expandedKitCardWrapper}>
      <div 
        className={styles.expandedKitCard__stackContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          '--kit-gradient': kitGradient
        }}
        data-hovered={isHovered}
      >
        {/* Gradient border layer - visible when not hovering */}
        <div className={styles.expandedKitCard__gradientBorder}></div>
        <div className={styles.expandedKitCard__layer3}></div>
        <div className={styles.expandedKitCard__layer2}></div>
        
        {/* Version badge - top left */}
        {kit.metadata?.latestVersion && (
          <div className={styles.expandedKitCard__versionBadge}>
            v{kit.metadata.latestVersion}
          </div>
        )}

        {/* Info Button */}
        {kit.metadata && (
          <div className={styles.expandedKitCard__infoButton}>
            <button
              className={styles.infoButton}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => {
                e.preventDefault();
                setShowTooltip(!showTooltip);
              }}
              aria-label="Kit metadata information"
            >
              <InfoIcon />
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipArrow}></div>
                <div className={styles.tooltipMetadata}>
                  <div className={styles.metadataGrid}>
                    {kit.metadata.created && (
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Created:</span>
                        <span className={styles.metadataValue}>
                          {new Date(kit.metadata.created).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                    {kit.metadata.lastUpdated && (
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Updated:</span>
                        <span className={styles.metadataValue}>
                          {new Date(kit.metadata.lastUpdated).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                    {kit.metadata.latestVersion && (
                      <div className={styles.metadataItem}>
                        <span className={styles.metadataLabel}>Version:</span>
                        <span className={styles.metadataValue}>{kit.metadata.latestVersion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <Link to={kit.route} className={`${styles.expandedKitCard} ${kit.deprecated ? styles['expandedKitCard--deprecated'] : ''}`}>
          {/* Deprecated badge */}


          {/* Fixed top section with icon only */}
          <div className={styles.expandedKitCard__iconSection}>
            <kit.logo 
              className={styles.expandedKitCard__icon}
              style={{
                '--logo-width': `${Math.round((kit.logoWidth || 80) * 1.25)}px`, // 25% bigger
                '--logo-height': `${Math.round((kit.logoHeight || 80) * 1.25)}px` // 25% bigger
              }}
            />
          </div>

          {/* Content area - title and description at bottom */}
          <div className={styles.expandedKitCard__content}>
            {/* Title */}
            <h3 className={styles.expandedKitCard__title}>{kit.name}</h3>
            
            {/* Description */}
            {kit.description && (
              <p className={styles.expandedKitCard__description}>
                {kit.description}
              </p>
            )}

            {/* Maturity Information or Deprecated Warning */}
            <div className={styles.expandedKitCard__maturity}>
              {kit.deprecated ? (
                /* Deprecated Warning Chip */
                <span className={`${styles.chip} ${styles['chip--deprecated']}`}>
                  <WarningIcon className={styles.chipIcon} />
                  DEPRECATED
                </span>
              ) : (
                /* Regular Maturity Chips */
                kit.maturity && (
                  <>
                    {/* Current Level Chip */}
                    {kit.maturity.currentLevel && (
                      <span className={`${styles.chip} ${styles[`chip--${kit.maturity.currentLevel.toLowerCase()}`]}`}>
                        {kit.maturity.currentLevel}
                      </span>
                    )}
                    
                    {/* Graduation Status Chip */}
                    {kit.maturity.graduationStatus && (
                      <span className={`${styles.chip} ${styles[`chip--${kit.maturity.graduationStatus.replace(/\s+/g, '')}`]}`}>
                        {kit.maturity.graduationStatus}
                      </span>
                    )}
                  </>
                )
              )}
              
              {/* New Kit Chip - always shown if applicable */}
              {kit.metadata?.new && !kit.deprecated && (
                <span className={`${styles.chip} ${styles['chip--new']}`}>
                  NEW!
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExpandedKitCard;
