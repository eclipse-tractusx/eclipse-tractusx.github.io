/*
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
 */

import React from 'react';
import { kitsData } from '../../../../data/kitsData.js';

export const IncubatingKitsReview = ({ styles }) => {
  const allKits = [
    ...(kitsData.dataspaceFoundation || []),
    ...(kitsData.industryCoreFoundation || []),
    ...(kitsData.useCases || [])
  ];

  // Add dataspace-specific KITs
  if (kitsData.dataspaceKits) {
    Object.values(kitsData.dataspaceKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        allKits.push(...kitsArray);
      }
    });
  }

  // Filter KITs that are incubating and need review
  const incubatingReviewKits = allKits.filter(kit => 
    kit.maturity?.currentLevel === 'Incubating' && 
    kit.maturity?.graduationStatus?.toLowerCase() === 'in review'
  );

  const pendingReviewKits = allKits.filter(kit => 
    kit.maturity?.currentLevel === 'Incubating' && 
    (kit.maturity?.graduationStatus?.toLowerCase() === 'in progress' || 
     kit.maturity?.graduationStatus?.toLowerCase() === 'inprogress')
  );

  return (
    <div style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <h4 style={{ 
        marginBottom: '20px', 
        fontSize: '18px',
        color: 'var(--ifm-color-warning)',
        borderBottom: '2px solid var(--ifm-color-warning)',
        paddingBottom: '8px'
      }}>
        Incubating KITs Status Review
      </h4>

      {/* KITs In Review */}
      {incubatingReviewKits.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            backgroundColor: 'var(--ifm-color-info-contrast-background)',
            border: '2px solid var(--ifm-color-info)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                color: 'var(--ifm-color-info-contrast-foreground)',
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                IN REVIEW: {incubatingReviewKits.length} KIT{incubatingReviewKits.length !== 1 ? 's' : ''} under review for graduation
              </div>
            </div>
            <div style={{
              color: 'var(--ifm-color-info-contrast-foreground)',
              fontSize: '12px'
            }}>
              These KITs are under review for graduation to the next maturity level.
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {incubatingReviewKits.map((kit, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--ifm-color-info-contrast-background)',
                  border: '2px solid var(--ifm-color-info)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '200px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const kitSlug = kit.name ? kit.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : 'unknown-kit';
                  const baseUrl = kit.path || `/docs-kits/kits/${kitSlug}`;
                  const url = `${baseUrl}/adoption-view`;
                  window.open(url, '_blank');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--ifm-color-info)',
                    borderRadius: '50%'
                  }} />
                  <span style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    color: 'var(--ifm-color-info-contrast-foreground)'
                  }}>
                    {kit.title || kit.name}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--ifm-color-info-contrast-foreground)',
                  opacity: 0.8
                }}>
                  Last updated: {kit.metadata?.lastUpdated ? new Date(kit.metadata.lastUpdated).toLocaleDateString() : 'Unknown'}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'var(--ifm-color-info)',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  alignSelf: 'flex-start'
                }}>
                  In Review
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KITs In Progress */}
      {pendingReviewKits.length > 0 && (
        <div>
          <div style={{
            backgroundColor: 'var(--ifm-color-warning-contrast-background)',
            border: '2px solid var(--ifm-color-warning)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                color: 'var(--ifm-color-warning-contrast-foreground)',
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                IN PROGRESS: {pendingReviewKits.length} KIT{pendingReviewKits.length !== 1 ? 's' : ''} working towards review
              </div>
            </div>
            <div style={{
              color: 'var(--ifm-color-warning-contrast-foreground)',
              fontSize: '12px'
            }}>
              These KITs are actively being prepared for graduation review.
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {pendingReviewKits.map((kit, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--ifm-color-warning-contrast-background)',
                  border: '2px solid var(--ifm-color-warning)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '200px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const kitSlug = kit.name ? kit.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : 'unknown-kit';
                  const baseUrl = kit.path || `/docs-kits/kits/${kitSlug}`;
                  const url = `${baseUrl}/adoption-view`;
                  window.open(url, '_blank');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--ifm-color-warning)',
                    borderRadius: '50%'
                  }} />
                  <span style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    color: 'var(--ifm-color-warning-contrast-foreground)'
                  }}>
                    {kit.title || kit.name}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--ifm-color-warning-contrast-foreground)',
                  opacity: 0.8
                }}>
                  Last updated: {kit.metadata?.lastUpdated ? new Date(kit.metadata.lastUpdated).toLocaleDateString() : 'Unknown'}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'var(--ifm-color-warning)',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  alignSelf: 'flex-start'
                }}>
                  In Progress
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No KITs need review */}
      {incubatingReviewKits.length === 0 && pendingReviewKits.length === 0 && (
        <div style={{
          backgroundColor: 'var(--ifm-color-success-contrast-background)',
          border: '2px solid var(--ifm-color-success)',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--ifm-color-success)',
              borderRadius: '50%'
            }} />
            <div style={{
              color: 'var(--ifm-color-success-contrast-foreground)',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>
              ALL CLEAR: No incubating KITs require immediate review
            </div>
          </div>
          <div style={{
            color: 'var(--ifm-color-success-contrast-foreground)',
            fontSize: '12px'
          }}>
            All incubating KITs are either completed or not yet ready for graduation review.
          </div>
        </div>
      )}
    </div>
  );
};

export default IncubatingKitsReview;