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
import InfoOutlinedIcon from '@mui/icons-material/AutoAwesome';

const KitCard = ({ kit }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Get the gradient for this specific kit
  const kitGradient = getKitGradient(kit);

  return (
    <div className={styles.kitCardWrapper}>
      <div 
        className={styles.kitCard__stackContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          '--kit-gradient': kitGradient
        }}
        data-hovered={isHovered}
      >
        {/* Gradient border layer - visible when not hovering */}
        <div 
          className={styles.kitCard__gradientBorder}
        ></div>
        <div 
          className={styles.kitCard__layer3}
        ></div>
        <div 
          className={styles.kitCard__layer2}
        ></div>
        <Link 
          to={kit.route} 
          className={styles.kitCard}
        >
          <div className={styles.kitCard__iconContainer}>
            <kit.logo 
              className={styles.kitCard__icon} 
              style={{
                width: kit.logoWidth ? `${kit.logoWidth}px` : undefined,
                height: kit.logoHeight ? `${kit.logoHeight}px` : undefined,
                maxWidth: kit.logoWidth ? `${kit.logoWidth}px` : '85%',
                maxHeight: kit.logoHeight ? `${kit.logoHeight}px` : '85%'
              }}
            />
          </div>
        </Link>
        
        {/* Info Button */}
        {kit.description && (
          <div className={styles.kitCard__infoButton}>
            <button
              className={styles.infoButton}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => {
                e.preventDefault();
                setShowTooltip(!showTooltip);
              }}
              aria-label="Kit information"
              style={{
                color: isHovered ? 'white' : '',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <InfoOutlinedIcon 
                sx={{ 
                  fontSize: 14,
                  color: 'inherit'
                }} 
              />
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipArrow}></div>
                <p className={styles.tooltipText}>{kit.description}</p>
                
                {/* Metadata Information */}
                {kit.metadata && (
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
                      {kit.maturity?.currentLevel === 'Graduated' && kit.maturity?.graduatedAt && (
                        <div className={styles.metadataItem}>
                          <span className={styles.metadataLabel}>Graduated:</span>
                          <span className={`${styles.metadataValue} ${styles.graduatedDate}`}>
                            {new Date(kit.maturity.graduatedAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      )}
                      {kit.deprecated && kit.maturity?.deprecatedAt && (
                        <div className={styles.metadataItem}>
                          <span className={styles.metadataLabel}>Deprecated:</span>
                          <span className={`${styles.metadataValue} ${styles.deprecatedDate}`}>
                            {new Date(kit.maturity.deprecatedAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      )}
                      {kit.metadata.new && (
                        <div className={styles.metadataItem}>
                          <span className={`${styles.metadataLabel} ${styles.newBadge}`}>New KIT!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Chips Container */}
                <div className={styles.tooltipChips}>
                  {/* Deprecated Warning Chip */}
                  {kit.deprecated && (
                    <span className={`${styles.chip} ${styles['chip--deprecated']}`}>
                      <WarningIcon className={styles.chipIcon} />
                      DEPRECATED
                    </span>
                  )}
                  
                  {/* Maturity Chips */}
                  {kit.maturity && (
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
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <h3 className={styles.kitCard__title}>{kit.name}</h3>
      {kit.metadata?.new && (
        <div className={styles.newBadge}>
          <span className={styles.newBadgeText}>NEW!</span>
        </div>
      )}
    </div>
  );
};

export default KitCard;