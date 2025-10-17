/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import Link from "@docusaurus/Link";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles.module.scss';
import { kitsData } from '@site/data/kitsData';


const KitCard = ({ kit }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className={styles.kitCardWrapper}>
      <div className={styles.kitCard__stackContainer}>
        <div className={styles.kitCard__layer3}></div>
        <div className={styles.kitCard__layer2}></div>
        <Link to={kit.route} className={styles.kitCard}>
          <div className={styles.kitCard__iconContainer}>
            <kit.logo className={styles.kitCard__icon} />
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

export default function KitsGalleryWithCategories({ title, description }) {
  const [selectedDataspace, setSelectedDataspace] = useState('All Dataspaces');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

  // Get all unique dataspaces from all kits
  const allDataspaces = Array.from(new Set(
    [...kitsData.dataspaceFoundation, ...kitsData.industryCoreFoundation, ...kitsData.useCases]
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
    if (sortOrder === 'default' || sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };

  const filteredDataspaceFoundation = processKits(kitsData.dataspaceFoundation);
  const filteredIndustryCoreFoundation = processKits(kitsData.industryCoreFoundation);
  const filteredUseCases = processKits(kitsData.useCases);

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
                    color: '#fff',
                    '& .MuiSvgIcon-root': {
                      color: '#faa023',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#faa023'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c37304',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ed8c05',
                    }
                  }}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: '#1f1f1f',
                          color: '#fff',
                        }
                      },
                    }
                  }}
                >
                  <MenuItem value={'All Dataspaces'}>All Dataspaces</MenuItem>
                  {allDataspaces.map(dataspace => (
                    <MenuItem key={dataspace} value={dataspace}>{dataspace}</MenuItem>
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
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>DATASPACE FOUNDATION</h3>

          <div className={styles.grid}>
            {filteredDataspaceFoundation.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredDataspaceFoundation.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

        {/* Industry Core Foundation Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>INDUSTRY CORE FOUNDATION</h3>
          <div className={styles.grid}>
            {filteredIndustryCoreFoundation.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredIndustryCoreFoundation.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>CROSS DATASPACE USE CASES</h3>
          <div className={styles.grid}>
            {filteredUseCases.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredUseCases.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}