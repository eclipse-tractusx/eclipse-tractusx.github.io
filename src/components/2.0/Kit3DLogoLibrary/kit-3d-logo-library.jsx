/********************************************************************************
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

import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Grid from '@mui/material/Unstable_Grid2';
import { kitsData, licenses } from '@site/data/kitsData';
import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';
import KitLogoLicense from '@site/src/components/2.0/KitLogoLicense';
import CodeBlock from '@theme/CodeBlock';
import styles from './kit-3d-logo-library.module.scss';

export default function Kit3DLogoLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedColor, setCopiedColor] = useState(null);

  // Copy color to clipboard
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(label);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Collect all kits from different categories
  const allKits = [
    ...kitsData.dataspaceFoundation.map(kit => ({ ...kit, category: 'Dataspace Foundation' })),
    ...kitsData.industryCoreFoundation.map(kit => ({ ...kit, category: 'Industry Core Foundation' })),
    ...kitsData.useCases.map(kit => ({ ...kit, category: 'Use Cases' })),
    ...(Object.entries(kitsData.industryKits || {}).flatMap(([industry, kits]) => 
      kits.map(kit => ({ ...kit, category: `Industry: ${industry}` }))
    ))
  ];

  // Filter kits based on selected category
  const filteredKits = selectedCategory === 'all' 
    ? allKits 
    : allKits.filter(kit => {
        if (selectedCategory === 'dataspace') return kit.category === 'Dataspace Foundation';
        if (selectedCategory === 'core') return kit.category === 'Industry Core Foundation';
        if (selectedCategory === 'usecases') return kit.category === 'Use Cases';
        if (selectedCategory === 'industry') return kit.category.startsWith('Industry:');
        return true;
      });

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Kit 3D Logo Gallery</h1>
          <p className={styles.subtitle}>
            Interactive 3D isometric logos for all Eclipse Tractus-X kits
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filters}>
          <button 
            className={selectedCategory === 'all' ? styles.active : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All Kits ({allKits.length})
          </button>
          <button 
            className={selectedCategory === 'dataspace' ? styles.active : ''}
            onClick={() => setSelectedCategory('dataspace')}
          >
            Dataspace Foundation ({kitsData.dataspaceFoundation.length})
          </button>
          <button 
            className={selectedCategory === 'core' ? styles.active : ''}
            onClick={() => setSelectedCategory('core')}
          >
            Industry Core ({kitsData.industryCoreFoundation.length})
          </button>
          <button 
            className={selectedCategory === 'usecases' ? styles.active : ''}
            onClick={() => setSelectedCategory('usecases')}
          >
            Use Cases ({kitsData.useCases.length})
          </button>
          <button 
            className={selectedCategory === 'industry' ? styles.active : ''}
            onClick={() => setSelectedCategory('industry')}
          >
            Industry-Specific ({Object.values(kitsData.industryKits || {}).flat().length})
          </button>
        </div>

        {/* Gallery Grid */}
        <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} sx={{ mb: 10 }}>
          {filteredKits.map((kit) => (
            <Grid key={kit.id} xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.kitCard}>
                <Kit3DLogo kitId={kit.id} showDownload={true} />
                <div className={styles.kitInfo}>
                <h3 className={styles.kitName}>{kit.name}</h3>
                <p className={styles.kitCategory}>{kit.category}</p>
                <div className={styles.kitMeta}>
                  <span className={styles.kitDomain}>{kit.domain}</span>
                  {kit.maturity && (
                    <span className={`${styles.kitMaturity} ${styles[kit.maturity.currentLevel?.toLowerCase()]}`}>
                      {kit.maturity.currentLevel}
                    </span>
                  )}
                </div>
                {kit.colors && (
                  <>
                    <div className={styles.colorInfo}>
                      <span className={styles.colorLabel}>Primary:</span>
                      <span 
                        className={styles.colorSwatch}
                        style={{ backgroundColor: kit.colors.primary }}
                      />
                      <span className={styles.colorValue}>{kit.colors.primary}</span>
                      <button
                        className={styles.copyButton}
                        onClick={() => copyToClipboard(kit.colors.primary, `${kit.id}-primary`)}
                        title="Copy primary color"
                      >
                        {copiedColor === `${kit.id}-primary` ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className={styles.gradientInfo}>
                      <span className={styles.colorLabel}>Gradient:</span>
                      <div className={styles.gradientDisplay}>
                        {(() => {
                          // Extract angle from gradient
                          const angleMatch = kit.colors.gradient.match(/(\d+)deg/);
                          const angle = angleMatch ? angleMatch[1] + '°' : '';
                          
                          // Extract hex colors from gradient
                          let color1, color2;
                          const hexMatch = kit.colors.gradient.match(/#[0-9A-Fa-f]{6}/g);
                          if (hexMatch && hexMatch.length >= 2) {
                            [color1, color2] = hexMatch;
                          } else {
                            // Try rgba format
                            const rgbaMatch = kit.colors.gradient.match(/rgba?\([^)]+\)/g);
                            if (rgbaMatch && rgbaMatch.length >= 2) {
                              const rgbaToHex = (rgba) => {
                                const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                                if (match) {
                                  const r = parseInt(match[1]);
                                  const g = parseInt(match[2]);
                                  const b = parseInt(match[3]);
                                  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                                }
                                return null;
                              };
                              color1 = rgbaToHex(rgbaMatch[0]);
                              color2 = rgbaToHex(rgbaMatch[1]);
                            }
                          }
                          
                          if (color1 && color2) {
                            return (
                              <>
                                <div className={styles.gradientColorItem}>
                                  <span className={styles.gradientColorValue}>{color1}</span>
                                  <button
                                    className={styles.copyButton}
                                    onClick={() => copyToClipboard(color1, `${kit.id}-gradient1`)}
                                    title="Copy gradient color 1"
                                  >
                                    {copiedColor === `${kit.id}-gradient1` ? (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    ) : (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                                <div className={styles.gradientBar} style={{ background: kit.colors.gradient }}>
                                  {angle && <span className={styles.gradientAngle}>{angle}</span>}
                                </div>
                                <div className={styles.gradientColorItem}>
                                  <span className={styles.gradientColorValue}>{color2}</span>
                                  <button
                                    className={styles.copyButton}
                                    onClick={() => copyToClipboard(color2, `${kit.id}-gradient2`)}
                                    title="Copy gradient color 2"
                                  >
                                    {copiedColor === `${kit.id}-gradient2` ? (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    ) : (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </>
                )}
                <KitLogoLicense logoLicencse={kit.logoLicencse} licenses={licenses} />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {/* Info Section */}
        <div className={styles.info}>
          <h2>About the 3D Logo Component</h2>
          <p>
            The Kit3DLogo component creates an isometric 3D stack effect with 8 layers:
          </p>
          <ul>
            <li>4 content layers with dynamic gradient backgrounds</li>
            <li>4 border-only layers for depth enhancement</li>
            <li>Progressive opacity: 40% → 60% → 80% → 100%</li>
            <li>Colors extracted dynamically from kit metadata</li>
            <li>Logo size automatically calculated based on kit dimensions</li>
          </ul>
          
          <h3>Technical Specifications</h3>
          <div className={styles.specs}>
            <div className={styles.specItem}>
              <strong>Rotation X:</strong> 55 degrees
            </div>
            <div className={styles.specItem}>
              <strong>Rotation Z:</strong> 45 degrees
            </div>
            <div className={styles.specItem}>
              <strong>Layer Spacing:</strong> 14.5px increments
            </div>
            <div className={styles.specItem}>
              <strong>Gradient Direction:</strong> 45deg (bottom-left to top-right)
            </div>
          </div>

          <h3>Usage Example</h3>
          <CodeBlock language="jsx" title="JavaScript/JSX">
{`import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="requirements" />`}
          </CodeBlock>
          <p>It can be used in <code>.mdx</code> and <code>.md</code> files. The <code>kitId</code> represents the unique identifier indicated in the <a href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/data/kitsData.js" target="_blank" rel="noopener noreferrer">KIT Master Data File</a>.</p>
        </div>
      </div>
  );
}
