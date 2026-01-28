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
import DateRangeIcon from '@mui/icons-material/DateRange';

export const UpdateActivityChart = ({ styles }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
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

  // Determine category based on KIT source and create proper mapping
  const getCategoryFromKit = (kit) => {
    // Check if kit is in Dataspace Foundation
    if (kitsData.dataspaceFoundation && kitsData.dataspaceFoundation.includes(kit)) {
      return 'Dataspace Foundation';
    }
    // Check if kit is in industry core foundation
    if (kitsData.industryCoreFoundation && kitsData.industryCoreFoundation.includes(kit)) {
      return 'Industry Core Foundation';
    }
    // Check if kit is in use cases
    if (kitsData.useCases && kitsData.useCases.includes(kit)) {
      return 'Use Cases';
    }
    // Check if kit is in industry specific kits
    if (kitsData.industryKits) {
      for (const [industryKey, kitsArray] of Object.entries(kitsData.industryKits)) {
        if (Array.isArray(kitsArray) && kitsArray.includes(kit)) {
          return 'Industry Specific';
        }
      }
    }
    return 'Unknown';
  };

  const kitsWithUpdateDates = allKits.filter(kit => kit.metadata?.lastUpdated && !kit.deprecated);
  
  // Group by quarters (based on last updated date)
  const quarterGroups = {};
  const yearGroups = {};
  
  kitsWithUpdateDates.forEach(kit => {
    const date = new Date(kit.metadata.lastUpdated);
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const quarterKey = `${year}-Q${quarter}`;
    
    const kitCategory = getCategoryFromKit(kit);
    
    // Quarter groups
    if (!quarterGroups[quarterKey]) {
      quarterGroups[quarterKey] = [];
    }
    quarterGroups[quarterKey].push({
      name: kit.name,
      title: kit.title,
      lastUpdated: kit.metadata.lastUpdated,
      category: kitCategory
    });
    
    // Year groups
    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }
    yearGroups[year].push({
      name: kit.name,
      title: kit.title,
      lastUpdated: kit.metadata.lastUpdated,
      category: kitCategory
    });
  });

  const quarters = Object.keys(quarterGroups).sort((a, b) => b.localeCompare(a)).slice(0, 8); // Show last 8 quarters
  const years = Object.keys(yearGroups).sort((a, b) => b - a).slice(0, 5); // Show last 5 years
  
  // Colors for different categories
  const categoryColors = {
    'Dataspace Foundation': '#64748b',
    'Industry Core Foundation': '#3b82f6', 
    'Use Cases': '#059669',
    'Industry Specific': '#7c2d92',
    'Unknown': '#d97706'
  };

  return (
    <div style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px',
      padding: '24px'
    }}>
      <h3 style={{ marginBottom: '24px', textAlign: 'center', fontSize: '20px' }}>
        KIT Update Activity Timeline
      </h3>
      <div style={{ 
        fontSize: '14px', 
        color: 'var(--ifm-color-content-secondary)', 
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        Interactive timeline showing which KITs were updated by quarter and year
      </div>

      {/* Quarterly Updates Section */}
      <div style={{ marginBottom: '48px' }}>
        <h4 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: 'var(--ifm-color-primary)',
          borderBottom: '2px solid var(--ifm-color-primary)',
          paddingBottom: '8px'
        }}>
          <DateRangeIcon sx={{ fontSize: 18, marginRight: '8px', verticalAlign: 'middle' }} />
          Quarterly Update Activity
        </h4>
        
        {quarters.map(quarter => {
          const kitsInQuarter = quarterGroups[quarter];
          const totalKits = kitsInQuarter.length;
          
          // Calculate if this quarter is 6 or more quarters old
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
          const currentQuarterKey = `${currentYear}-Q${currentQuarter}`;
          
          const [yearStr, quarterStr] = quarter.split('-Q');
          const year = parseInt(yearStr);
          const quarterNum = parseInt(quarterStr);
          
          // Calculate difference in quarters
          const quarterDiff = (currentYear - year) * 4 + (currentQuarter - quarterNum);
          const isOldQuarter = quarterDiff >= 6;
          
          return (
            <div key={quarter} style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: isOldQuarter ? 'rgba(239, 68, 68, 0.1)' : 'var(--ifm-color-emphasis-50)',
              borderRadius: '8px',
              border: `1px solid ${isOldQuarter ? 'rgba(239, 68, 68, 0.3)' : 'var(--ifm-color-emphasis-200)'}`,
              borderLeft: isOldQuarter ? '4px solid var(--ifm-color-danger)' : '1px solid var(--ifm-color-emphasis-200)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <h5 style={{ 
                    margin: 0, 
                    fontSize: '16px',
                    color: isOldQuarter ? 'var(--ifm-color-danger)' : 'var(--ifm-color-primary)'
                  }}>
                    {quarter}
                  </h5>
                  {isOldQuarter && (
                    <div style={{
                      fontSize: '10px',
                      color: 'var(--ifm-color-danger)',
                      fontWeight: 'bold',
                      backgroundColor: 'var(--ifm-color-danger)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      Stale Quarter
                    </div>
                  )}
                </div>
                <div style={{
                  backgroundColor: isOldQuarter ? 'var(--ifm-color-danger)' : 'var(--ifm-color-success)',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  boxShadow: isOldQuarter ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                }}>
                  {totalKits} Update{totalKits !== 1 ? 's' : ''}
                </div>
              </div>
              
              {/* Compact KIT list for quarters */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {kitsInQuarter.map((kit, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 8px',
                      backgroundColor: 'var(--ifm-color-emphasis-100)',
                      borderRadius: '12px',
                      border: '1px solid var(--ifm-color-emphasis-300)',
                      fontSize: '11px',
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
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: categoryColors[kit.category] || categoryColors['Unknown']
                      }}
                    />
                    <span style={{ fontWeight: '500', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {kit.title || kit.name}
                    </span>
                    <span style={{ 
                      color: 'var(--ifm-color-content-secondary)',
                      fontSize: '9px'
                    }}>
                      {formatDate(kit.lastUpdated)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Yearly Updates Section */}
      <div>
        <h4 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: 'var(--ifm-color-primary)',
          borderBottom: '2px solid var(--ifm-color-primary)',
          paddingBottom: '8px'
        }}>
          Annual Update Summary
        </h4>
      
      {years.map(year => {
        const kitsInYear = yearGroups[year];
        const totalKits = kitsInYear.length;
        
        return (
          <div key={year} style={{
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: 'var(--ifm-color-emphasis-50)',
            borderRadius: '8px',
            border: '1px solid var(--ifm-color-emphasis-200)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h4 style={{ 
                margin: 0, 
                fontSize: '18px',
                color: 'var(--ifm-color-primary)'
              }}>
                {year}
              </h4>
              <div style={{
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {totalKits} KIT{totalKits !== 1 ? 's' : ''} Last Updated Here
              </div>
            </div>
            
            {/* Plot dots for each KIT */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {kitsInYear.map((kit, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--ifm-color-emphasis-100)',
                    borderRadius: '20px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    fontSize: '12px',
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
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: categoryColors[kit.category] || categoryColors['Unknown']
                    }}
                  />
                  <span style={{ fontWeight: '500' }}>{kit.title || kit.name}</span>
                  <span style={{ 
                    color: 'var(--ifm-color-content-secondary)',
                    fontSize: '10px'
                  }}>
                    {formatDate(kit.lastUpdated)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Timeline bar */}
            <div style={{
              height: '4px',
              backgroundColor: 'var(--ifm-color-emphasis-300)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (totalKits / Math.max(...years.map(y => yearGroups[y].length))) * 100)}%`,
                backgroundColor: 'var(--ifm-color-primary)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        );
      })}
      </div>
      
      {/* Legend */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--ifm-color-emphasis-50)',
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-200)'
      }}>
        <h5 style={{ marginBottom: '12px', fontSize: '14px' }}>Category Legend:</h5>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {(() => {
            // Get unique categories from all KITs with update dates
            const usedCategories = [...new Set(kitsWithUpdateDates.map(kit => getCategoryFromKit(kit)))];
            
            return usedCategories.map(category => (
              <div key={category} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: categoryColors[category] || categoryColors['Unknown']
                }} />
                <span>{category}</span>
              </div>
            ));
          })()}
        </div>
      </div>
      
      {/* Deprecated Risk Alert Section */}
      <div style={{ marginTop: '32px' }}>
        <h4 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: 'var(--ifm-color-danger)',
          borderBottom: '2px solid var(--ifm-color-danger)',
          paddingBottom: '8px'
        }}>
          Candidate KITs for Deprecation in Next Release
        </h4>
        {(() => {
            const eighteenMonthsAgo = new Date();
            eighteenMonthsAgo.setMonth(eighteenMonthsAgo.getMonth() - 18);
            
            const staleKits = kitsWithUpdateDates.filter(kit => {
              const lastUpdated = new Date(kit.metadata.lastUpdated);
              return lastUpdated < eighteenMonthsAgo && !kit.deprecated;
            });
            
            if (staleKits.length === 0) {
              return (
                <div style={{
                  backgroundColor: 'var(--ifm-color-success-contrast-background)',
                  border: '2px solid var(--ifm-color-success)',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px'
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
                      Everything is fine! All KITs are up to date.
                    </div>
                  </div>
                  <div style={{
                    color: 'var(--ifm-color-success-contrast-foreground)',
                    fontSize: '12px'
                  }}>
                    All KITs have been updated within the last 18 months. No deprecation risk detected.
                  </div>
                </div>
              );
            }
            
            return (
              <div>
                <div style={{
                  backgroundColor: 'var(--ifm-color-danger-contrast-background)',
                  border: '1px solid var(--ifm-color-danger)',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    color: 'var(--ifm-color-danger-contrast-foreground)',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    ALERT: {staleKits.length} KIT{staleKits.length !== 1 ? 's' : ''} require{staleKits.length === 1 ? 's' : ''} immediate attention
                  </div>
                  <div style={{
                    color: 'var(--ifm-color-danger-contrast-foreground)',
                    fontSize: '12px'
                  }}>
                    These KITs have not been updated for over 18 months and should be reviewed for continued relevance.
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {staleKits.map((kit, index) => {
                    const daysSinceUpdate = Math.floor((new Date() - new Date(kit.metadata.lastUpdated)) / (1000 * 60 * 60 * 24));
                    const monthsSinceUpdate = Math.floor(daysSinceUpdate / 30);
                    
                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: 'var(--ifm-color-danger-contrast-background)',
                          border: '2px solid var(--ifm-color-danger)',
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
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
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
                            backgroundColor: 'var(--ifm-color-danger)',
                            borderRadius: '50%'
                          }} />
                          <span style={{
                            fontWeight: '600',
                            fontSize: '13px',
                            color: 'var(--ifm-color-danger-contrast-foreground)'
                          }}>
                            {kit.title || kit.name}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: 'var(--ifm-color-danger-contrast-foreground)',
                          opacity: 0.8
                        }}>
                          Last updated: {formatDate(kit.metadata.lastUpdated)}
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: 'var(--ifm-color-danger)',
                          fontWeight: 'bold',
                          backgroundColor: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          alignSelf: 'flex-start'
                        }}>
                          {monthsSinceUpdate} months ago
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
      </div>
    </div>
  );
};

export default UpdateActivityChart;