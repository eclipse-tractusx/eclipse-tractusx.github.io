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
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" />
                <circle cx="7" cy="4.5" r="0.5" fill="currentColor" />
                <path
                  d="M7 6.5V10.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipArrow}></div>
                <p className={styles.tooltipText}>{kit.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <h3 className={styles.kitCard__title}>{kit.name}</h3>
    </div>
  );
};

export default KitCard;