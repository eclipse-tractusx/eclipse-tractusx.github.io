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

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles.module.scss';
import KitsGrid from '../KitsGrid';

export default function KitsGalleryWithCategories({ 
  title, 
  description, 
  dataspaceFoundation = [], 
  industryCoreFoundation = [], 
  useCases = [] 
}) {
  const [selectedDataspace, setSelectedDataspace] = useState('All Dataspaces');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

  // Get all unique dataspaces from all kits
  const allDataspaces = Array.from(new Set(
    [...dataspaceFoundation, ...industryCoreFoundation, ...useCases]
      .flatMap(kit => kit.dataspaces)
  )).sort();

  // Filter kits based on selected dataspace
  const filterKits = (kits) => {
    if (selectedDataspace === 'All Dataspaces') {
      return kits;
    }
    return kits.filter(kit => kit.dataspaces.includes(selectedDataspace));
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
  const processKits = (kits) => {
    return sortKits(filterKits(kits));
  };

  const handleDataspaceChange = (event) => {
    setSelectedDataspace(event.target.value);
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

  const filteredDataspaceFoundation = processKits(dataspaceFoundation);
  const filteredIndustryCoreFoundation = processKits(industryCoreFoundation);
  const filteredUseCases = processKits(useCases);

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
                    value={'All Dataspaces'}
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
                      key={dataspace} 
                      value={dataspace}
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
                      {dataspace}
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
        <KitsGrid 
          title="DATASPACE FOUNDATION"
          kits={filteredDataspaceFoundation}
        />

        {/* Industry Core Foundation Section */}
        <KitsGrid 
          title="INDUSTRY CORE FOUNDATION"
          kits={filteredIndustryCoreFoundation}
        />

        {/* Use Cases Section */}
        <KitsGrid 
          title="CROSS-INDUSTRY USE CASES"
          kits={filteredUseCases}
        />

      </div>
    </section>
  );
}