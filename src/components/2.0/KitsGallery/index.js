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

import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles.module.scss';
import KitsGrid from '../KitsGrid';
import { industries, kitsData } from '@site/data/kitsData';

export default function KitsGalleryWithCategories({ 
  title, 
  description, 
  dataspaceFoundation = [], 
  industryCoreFoundation = [], 
  useCases = [] 
}) {
  const [selectedDataspace, setSelectedDataspace] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

  // Get all dataspaces from industries
  const allDataspaces = [];
  industries.forEach(industry => {
    if (industry.dataspaces) {
      industry.dataspaces.forEach(ds => {
        if (!allDataspaces.find(d => d.name === ds.name)) {
          allDataspaces.push({
            name: ds.name,
            kits: ds.kits || []
          });
        }
      });
    }
  });
  allDataspaces.sort((a, b) => a.name.localeCompare(b.name));

  // Collect all industry-specific kits
  const industrySpecificKits = useMemo(() => {
    const allIndustryKits = [];
    if (kitsData.industryKits) {
      Object.entries(kitsData.industryKits).forEach(([industryId, kitsArray]) => {
        if (Array.isArray(kitsArray) && kitsArray.length > 0) {
          const industry = industries.find(ind => ind.id === industryId);
          const industryName = industry ? industry.name : industryId;
          // Add categoryType to each kit
          kitsArray.forEach(kit => {
            allIndustryKits.push({
              ...kit,
              categoryType: `${industryName} Specific`,
              categoryId: industryId
            });
          });
        }
      });
    }
    return allIndustryKits;
  }, []);

  // Get all unique domains from ALL kits including industry-specific ones
  const allDomains = useMemo(() => {
    return Array.from(new Set(
      [...dataspaceFoundation, ...industryCoreFoundation, ...useCases, ...industrySpecificKits]
        .map(kit => kit.domain)
        .filter(Boolean)
    )).sort();
  }, [dataspaceFoundation, industryCoreFoundation, useCases, industrySpecificKits]);

  // Filter kits based on selected dataspace and domain
  const filterKits = (kits, includeDomainFilter = true) => {
    let filtered = kits;
    
    // Filter by dataspace
    if (selectedDataspace !== 'all') {
      const dataspace = allDataspaces.find(ds => ds.name === selectedDataspace);
      if (dataspace && dataspace.kits) {
        filtered = filtered.filter(kit => dataspace.kits.includes(kit.id));
      }
    }
    
    // Filter by domain
    if (includeDomainFilter && selectedDomain !== 'All Domains') {
      filtered = filtered.filter(kit => kit.domain === selectedDomain);
    }
    
    return filtered;
  };

  // Sort kits based on sort order
  const sortKits = (kits) => {
    if (sortOrder === 'default') {
      return kits;
    }
    const sorted = [...kits].sort((a, b) => a.name.localeCompare(b.name));
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  };

  // Apply both filter and sort
  const processKits = (kits, includeDomainFilter = false) => {
    return sortKits(filterKits(kits, includeDomainFilter));
  };

  const handleDataspaceChange = (event) => {
    setSelectedDataspace(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleSort = () => {
    if (sortOrder === 'default') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('default');
    }
  };

  const filtereddataspaceFoundation = processKits(dataspaceFoundation, true);
  const filteredIndustryCoreFoundation = processKits(industryCoreFoundation, true);
  const filteredUseCases = processKits(useCases, true);

  // Group industry-specific kits by category and filter them
  const filteredIndustryKitsByCategory = useMemo(() => {
    const grouped = {};
    industrySpecificKits.forEach(kit => {
      const category = kit.categoryType;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(kit);
    });
    
    // Filter each group
    const filtered = {};
    Object.entries(grouped).forEach(([category, kits]) => {
      const filteredKits = processKits(kits, true);
      if (filteredKits.length > 0) {
        filtered[category] = filteredKits;
      }
    });
    
    return filtered;
  }, [industrySpecificKits, selectedDataspace, selectedDomain, sortOrder]);

  return (
    <section className={styles.kitsGallery}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Gallery of KITs"}</h2>
          <p className={styles.description}>
            {description || "Unlock the full power of kits. Browse all the available specifications, blueprints and reference implementations."}
          </p>
        </div>
{/* Filters */}
          <div className={styles.filtersContainer}>
            <Box>
              <FormControl size="small">
                <Select
                  labelId="dataspace-label"
                  id="dataspace-options"
                  value={selectedDataspace}
                  onChange={handleDataspaceChange}
                  className={styles.selectInput}
                  sx={{
                    padding: '0 0.5rem',
                    color: 'var(--ifm-font-color-base)',
                    '& .MuiSvgIcon-root': {
                      color: 'var(--ifm-color-primary)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary-dark)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary-darker)',
                    }
                  }}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: 'var(--ifm-background-color)',
                          color: 'var(--ifm-font-color-base)',
                        }
                      },
                    }
                  }}
                >
                  <MenuItem 
                    value={'all'}
                    sx={{
                      color: 'var(--ifm-font-color-base)',
                      '&:hover': {
                        backgroundColor: 'var(--ifm-hover-overlay)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#faa023 !important',
                        color: '#000000 !important',
                        opacity: '1 !important',
                        '&:hover': {
                          backgroundColor: '#ed8c05 !important',
                          color: '#000000 !important',
                          opacity: '1 !important',
                        }
                      }
                    }}
                  >
                    All Dataspaces
                  </MenuItem>
                  {allDataspaces.map(dataspace => (
                    <MenuItem 
                      key={dataspace.name} 
                      value={dataspace.name}
                      sx={{
                        color: 'var(--ifm-font-color-base)',
                        '&:hover': {
                          backgroundColor: 'var(--ifm-hover-overlay)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#faa023',
                          color: '#000000',
                          '&:hover': {
                            backgroundColor: '#ed8c05',
                            color: '#000000',
                          }
                        }
                      }}
                    >
                      {dataspace.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl size="small">
                <Select
                  labelId="domain-label"
                  id="domain-options"
                  value={selectedDomain}
                  onChange={handleDomainChange}
                  className={styles.selectInput}
                  sx={{
                    padding: '0 0.5rem',
                    color: 'var(--ifm-font-color-base)',
                    '& .MuiSvgIcon-root': {
                      color: 'var(--ifm-color-primary)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary-dark)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--ifm-color-primary-darker)',
                    }
                  }}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: 'var(--ifm-background-color)',
                          color: 'var(--ifm-font-color-base)',
                        }
                      },
                    }
                  }}
                >
                  <MenuItem 
                    value={'All Domains'}
                    sx={{
                      color: 'var(--ifm-font-color-base)',
                      '&:hover': {
                        backgroundColor: 'var(--ifm-hover-overlay)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#faa023 !important',
                        color: '#000000 !important',
                        opacity: '1 !important',
                        '&:hover': {
                          backgroundColor: '#ed8c05 !important',
                          color: '#000000 !important',
                          opacity: '1 !important',
                        }
                      }
                    }}
                  >
                    All Domains
                  </MenuItem>
                  {allDomains.map(domain => (
                    <MenuItem 
                      key={domain} 
                      value={domain}
                      sx={{
                        color: 'var(--ifm-font-color-base)',
                        '&:hover': {
                          backgroundColor: 'var(--ifm-hover-overlay)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#faa023',
                          color: '#000000',
                          '&:hover': {
                            backgroundColor: '#ed8c05',
                            color: '#000000',
                          }
                        }
                      }}
                    >
                      {domain}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <div className={styles.buttonContainer}>
              {sortOrder === 'asc' ? (
                <button className={styles.sortButton} onClick={handleSort}>A-Z &darr;</button>
              ) : sortOrder === 'desc' ? (
                <button className={styles.sortButton} onClick={handleSort}>Z-A &uarr;</button>
              ) : (
                <button className={styles.sortButton} onClick={handleSort}>A-Z</button>
              )}
            </div>
          </div>
        {/* Dataspace Foundation Section */}
        {filtereddataspaceFoundation.length > 0 && (
          <KitsGrid 
            title="Dataspace Foundation"
            kits={filtereddataspaceFoundation}
          />
        )}

        {/* Industry Core Foundation Section */}
        {filteredIndustryCoreFoundation.length > 0 && (
          <KitsGrid 
            title="INDUSTRY CORE FOUNDATION"
            kits={filteredIndustryCoreFoundation}
          />
        )}

        {/* Use Cases Section */}
        {filteredUseCases.length > 0 && (
          <KitsGrid 
            title="CROSS-INDUSTRY USE CASES"
            kits={filteredUseCases}
          />
        )}

        {/* Industry-Specific Sections - Dynamically rendered */}
        {Object.entries(filteredIndustryKitsByCategory)
          .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
          .map(([category, kits]) => (
            <KitsGrid 
              key={category}
              title={category.toUpperCase()}
              kits={kits}
            />
          ))}

      </div>
    </section>
  );
}