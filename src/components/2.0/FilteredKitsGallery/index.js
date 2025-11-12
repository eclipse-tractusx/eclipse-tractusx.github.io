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
import KitGalleryHeader from '@site/src/components/2.0/KitGalleryHeader';
import styles from './styles.module.scss';
import ExpandedKitsGrid from '@site/src/components/2.0/ExpandedKitsGrid';

export default function FilteredKitsGallery({ 
  categoryData,
  kits = [],
  showDataspaceFilter = true,
  showCategoryFilter = false,
  showHeader = true,
  title,
  description,
  backRef
}) {
  const [selectedDataspace, setSelectedDataspace] = useState('All Dataspaces');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('default');

  // Helper function to get kit category from the kit's categoryType property
  const getKitCategory = (kit) => {
    // If kit has categoryType, use it, otherwise derive from common patterns
    if (kit.categoryType) return kit.categoryType;
    
    // Fallback: try to derive from kit properties or return 'Unknown'
    return 'Unknown';
  };

  // Get unique dataspace names
  const uniqueDataspaces = useMemo(() => {
    const dataspaces = [...new Set(kits.flatMap(kit => kit.dataspaces))].sort();
    return ['All Dataspaces', ...dataspaces];
  }, [kits]);

  // Get unique categories from kits in specific order
  const uniqueCategories = useMemo(() => {
    if (!showCategoryFilter) return [];
    
    const foundCategories = [...new Set(kits.map(kit => getKitCategory(kit)).filter(cat => cat !== 'Unknown'))];
    
    // Define the desired order for standard categories
    const categoryOrder = ['Dataspace Foundation', 'Industry Core Foundation', 'Cross-Industry Use Cases'];
    
    // Sort standard categories according to the defined order
    const orderedCategories = categoryOrder.filter(cat => foundCategories.includes(cat));
    
    // Add dataspace-specific categories (those ending with "Specific") at the end
    const dataspaceSpecificCategories = foundCategories
      .filter(cat => cat.endsWith(' Specific') && !categoryOrder.includes(cat))
      .sort();
    
    return ['All Categories', ...orderedCategories, ...dataspaceSpecificCategories];
  }, [showCategoryFilter, kits]);

  // Filter kits based on selected dataspace and category
  const filterKits = (kits) => {
    let filtered = kits;
    
    // Filter by dataspace
    if (selectedDataspace !== 'All Dataspaces') {
      filtered = filtered.filter(kit => kit.dataspaces.includes(selectedDataspace));
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories' && showCategoryFilter) {
      filtered = filtered.filter(kit => getKitCategory(kit) === selectedCategory);
    }
    
    return filtered;
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

  // Calculate statistics for the header
  const statistics = {
    total: filteredKits.length,
    graduated: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Graduated').length,
    incubating: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Incubating').length,
    sandbox: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Sandbox').length
  };

  return (
    <div className={styles.filtered_gallery}>
      {/* Header with breadcrumb */}
      {showHeader && (categoryData || title) && (
        <KitGalleryHeader
          categoryData={categoryData}
          title={title}
          description={description}
          kitCount={filteredKits.length}
          statistics={statistics}
          gradient={categoryData?.gradient}
          backButtonLink={backRef ? `/Kits?scrollTo=${backRef}` : `/Kits`}
        />
      )}

      {/* Filters */}
      <div className={styles.filters_container}>
        <div className={styles.filters}>
          {showDataspaceFilter && uniqueDataspaces.length > 1 && (
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

          {showCategoryFilter && uniqueCategories.length > 1 && (
            <div className={styles.filter_group}>
              <label className={styles.filter_label}>Filter by Category</label>
              <div className={styles.button_group}>
                <button
                  className={`${styles.filter_button} ${selectedCategory === 'All Categories' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('All Categories')}
                >
                  All Categories
                </button>
                {uniqueCategories.slice(1).map((category) => (
                  <button
                    key={category}
                    className={`${styles.filter_button} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
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
      <div className={styles.kits_grid}>
        <ExpandedKitsGrid kits={filteredKits} />
      </div>
    </div>
  );
}