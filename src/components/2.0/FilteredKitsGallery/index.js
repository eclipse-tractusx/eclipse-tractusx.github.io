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

import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import styles from './styles.module.scss';
import KitsGrid from '../KitsGrid';

export default function FilteredKitsGallery({ 
  categoryData,
  kits = []
}) {
  const [selectedDataspace, setSelectedDataspace] = useState('All Dataspaces');
  const [sortOrder, setSortOrder] = useState('default');

    // Get unique dataspace names
  const uniqueDataspaces = useMemo(() => {
    const dataspaces = [...new Set(kits.flatMap(kit => kit.dataspaces))].sort();
    return ['All Dataspaces', ...dataspaces];
  }, [kits]);

  // Filter kits based on selected dataspace
  const filterKits = (kits) => {
    if (selectedDataspace === 'All Dataspaces') {
      return kits;
    }
    return kits.filter(kit => kit.dataspaces.includes(selectedDataspace));
  };

  // Sort kits based on sort order
  const sortKits = (kits) => {
    if (sortOrder === 'asc') {
      return [...kits].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      return [...kits].sort((a, b) => b.name.localeCompare(a.name));
    }
    return kits; // default order
  };

  const filteredKits = sortKits(filterKits(kits));

  // Handlers are now inline with onClick events

  return (
    <div className={styles.filtered_gallery}>
      {/* Header with breadcrumb */}
      <div className={styles.header}>
        <div 
          className={styles.header_background}
          style={{ '--category-gradient': categoryData.gradient }}
        ></div>
        
        <Link to="/kits" className={styles.back_button}>
          <ArrowBackIcon className={styles.back_icon} />
          <span>Back to All KITs</span>
        </Link>
        
        <div className={styles.header_content}>
          <div className={styles.category_hero}>
            <div 
              className={styles.category_icon_container}
              style={{ '--category-gradient': categoryData.gradient }}
            >
              <categoryData.icon className={styles.category_icon} />
            </div>
            
            <div className={styles.category_content}>
              <h1 className={styles.category_title}>{categoryData.title}</h1>
              <p className={styles.category_description}>{categoryData.description}</p>
              
              <div className={styles.category_metrics}>
                <div className={styles.metric_card}>
                  <span className={styles.metric_number}>{filteredKits.length}</span>
                  <span className={styles.metric_label}>
                    KIT{filteredKits.length !== 1 ? 's' : ''} Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters_container}>
        <div className={styles.filters}>
          {uniqueDataspaces.length > 1 && (
            <div className={styles.filter_group}>
              <label className={styles.filter_label}>Filter by Dataspace</label>
              <div className={styles.button_group}>
                <button
                  className={`${styles.filter_button} ${selectedDataspace === 'All Dataspaces' ? styles.active : ''}`}
                  onClick={() => setSelectedDataspace('All Dataspaces')}
                >
                  All Dataspaces
                </button>
                {uniqueDataspaces.slice(1).map((dataspace) => (
                  <button
                    key={dataspace}
                    className={`${styles.filter_button} ${selectedDataspace === dataspace ? styles.active : ''}`}
                    onClick={() => setSelectedDataspace(dataspace)}
                  >
                    {dataspace}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.filter_group}>
            <label className={styles.filter_label}>Sort Order</label>
            <div className={styles.button_group}>
              <button
                className={`${styles.filter_button} ${sortOrder === 'default' ? styles.active : ''}`}
                onClick={() => setSortOrder('default')}
              >
                Default Order
              </button>
              <button
                className={`${styles.filter_button} ${sortOrder === 'asc' ? styles.active : ''}`}
                onClick={() => setSortOrder('asc')}
              >
                A-Z
              </button>
              <button
                className={`${styles.filter_button} ${sortOrder === 'desc' ? styles.active : ''}`}
                onClick={() => setSortOrder('desc')}
              >
                Z-A
              </button>
            </div>
          </div>
        </div>

        <div className={styles.results_info}>
          {selectedDataspace === 'All Dataspaces' ? (
            <span>Showing all {filteredKits.length} KIT{filteredKits.length !== 1 ? 's' : ''}</span>
          ) : (
            <span>Showing {filteredKits.length} KIT{filteredKits.length !== 1 ? 's' : ''} for {selectedDataspace}</span>
          )}
        </div>
      </div>

      {/* KITs Grid */}
      <div className={styles.grid_container}>
        {filteredKits.length > 0 ? (
          <KitsGrid kits={filteredKits} />
        ) : (
          <div className={styles.no_kits}>
            <div className={styles.no_kits_icon}>📦</div>
            <h3>No KITs found</h3>
            <p>
              {selectedDataspace === 'All Dataspaces' 
                ? `No KITs are currently available in the ${categoryData.title.toLowerCase()} category.`
                : `No KITs are available for ${selectedDataspace} in the ${categoryData.title.toLowerCase()} category.`
              }
            </p>
            {selectedDataspace !== 'All Dataspaces' && (
              <button 
                className={styles.clear_filter}
                onClick={() => setSelectedDataspace('All Dataspaces')}
              >
                Clear Filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}