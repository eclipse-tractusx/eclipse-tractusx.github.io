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
import kitStyles from './KitAnalytics.module.css';

export const MaturityTimeline = ({ styles }) => {
  const allKits = [
    ...(kitsData.dataspaceFoundation || []),
    ...(kitsData.industryCoreFoundation || []),
    ...(kitsData.useCases || [])
  ];

  if (kitsData.industryKits) {
    Object.values(kitsData.industryKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        allKits.push(...kitsArray);
      }
    });
  }

  const yearStats = {};
  allKits.forEach(kit => {
    if (kit.metadata?.created) {
      const year = kit.metadata.created.substring(0, 4);
      if (!yearStats[year]) {
        yearStats[year] = { total: 0, graduated: 0, incubating: 0, sandbox: 0 };
      }
      yearStats[year].total++;
      
      const level = kit.maturity?.currentLevel;
      if (level === 'Graduated') yearStats[year].graduated++;
      else if (level === 'Incubating') yearStats[year].incubating++;
      else if (level === 'Sandbox') yearStats[year].sandbox++;
    }
  });

  const years = Object.keys(yearStats).sort();
  const maxKits = Math.max(...Object.values(yearStats).map(stat => stat.total));

  return (
    <div className={kitStyles.chartContainer} style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px'
    }}>
      <h4 style={{ 
        marginBottom: '20px', 
        textAlign: 'center',
        fontSize: 'clamp(14px, 2.5vw, 18px)'
      }}>KIT Creation Timeline</h4>
      <div className={kitStyles.timelineContainer} style={{ 
        display: 'flex', 
        alignItems: 'end', 
        gap: 'clamp(8px, 2vw, 16px)', 
        minHeight: 'clamp(180px, 28vw, 230px)', 
        marginBottom: '16px',
        paddingBottom: '10px',
        paddingTop: '30px',
        overflow: 'visible'
      }}>
        {years.map(year => {
          const stats = yearStats[year];
          const height = (stats.total / maxKits) * 140;
          
          return (
            <div key={year} style={{ 
              display: 'flex', 
              alignItems: 'end',
              gap: 'clamp(6px, 1.5vw, 12px)',
              flex: '1 1 auto',
              justifyContent: 'center',
              minWidth: '60px'
            }}>
              {/* Bar with total count above */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 'clamp(24px, 4vw, 32px)'
              }}>
                {/* Total count above the bar */}
                <div style={{
                  fontSize: 'clamp(10px, 1.5vw, 12px)',
                  fontWeight: 'bold',
                  color: 'var(--ifm-color-primary)',
                  marginBottom: '4px',
                  textAlign: 'center'
                }}>
                  {stats.total}
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  height: `${height}px`,
                  width: 'clamp(24px, 4vw, 32px)',
                  borderRadius: '4px 4px 0 0',
                  overflow: 'hidden',
                  marginBottom: '8px',
                  border: '1px solid var(--ifm-color-emphasis-300)'
                }}>
                  <div 
                    style={{ 
                      height: `${(stats.graduated / stats.total) * 100}%`, 
                      backgroundColor: '#10b981',
                      position: 'relative'
                    }}
                    title={`Graduated: ${stats.graduated}`}
                  />
                  <div 
                    style={{ 
                      height: `${(stats.incubating / stats.total) * 100}%`, 
                      backgroundColor: '#f59e0b',
                      position: 'relative'
                    }}
                    title={`Incubating: ${stats.incubating}`}
                  />
                  <div 
                    style={{ 
                      height: `${(stats.sandbox / stats.total) * 100}%`, 
                      backgroundColor: '#6b7280',
                      position: 'relative'
                    }}
                    title={`Sandbox: ${stats.sandbox}`}
                  />
                </div>
                
                <div style={{ 
                  fontSize: 'clamp(10px, 1.5vw, 12px)', 
                  fontWeight: '500' 
                }}>{year}</div>
              </div>
              
              {/* Breakdown numbers next to the bar - Hide on very small screens */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                fontSize: 'clamp(9px, 1.3vw, 11px)',
                color: 'var(--ifm-color-content)',
                alignSelf: 'center',
                '@media (max-width: 480px)': {
                  display: 'none'
                }
              }}>
                {stats.graduated > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <div style={{
                      width: 'clamp(6px, 1vw, 8px)',
                      height: 'clamp(6px, 1vw, 8px)',
                      backgroundColor: '#10b981',
                      borderRadius: '1px',
                      flexShrink: 0
                    }} />
                    <span style={{ fontWeight: '500' }}>{stats.graduated}</span>
                  </div>
                )}
                {stats.incubating > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <div style={{
                      width: 'clamp(6px, 1vw, 8px)',
                      height: 'clamp(6px, 1vw, 8px)',
                      backgroundColor: '#f59e0b',
                      borderRadius: '1px',
                      flexShrink: 0
                    }} />
                    <span style={{ fontWeight: '500' }}>{stats.incubating}</span>
                  </div>
                )}
                {stats.sandbox > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <div style={{
                      width: 'clamp(6px, 1vw, 8px)',
                      height: 'clamp(6px, 1vw, 8px)',
                      backgroundColor: '#6b7280',
                      borderRadius: '1px',
                      flexShrink: 0
                    }} />
                    <span style={{ fontWeight: '500' }}>{stats.sandbox}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--ifm-color-content-secondary)', textAlign: 'center', marginBottom: '16px' }}>
        Total KITs created by year
      </div>
      
      {/* Color Legend */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        backgroundColor: 'var(--ifm-color-emphasis-50)',
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#10b981',
              borderRadius: '2px'
            }} />
            <span style={{ fontWeight: '500' }}>Graduated</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#f59e0b',
              borderRadius: '2px'
            }} />
            <span style={{ fontWeight: '500' }}>Incubating</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#6b7280',
              borderRadius: '2px'
            }} />
            <span style={{ fontWeight: '500' }}>Sandbox</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MaturityTimeline;