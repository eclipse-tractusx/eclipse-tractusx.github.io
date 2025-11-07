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
import PieChart from './PieChart.js';
import styles from './KitAnalytics.module.css';

export const DataspaceDistribution = () => {
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

  const dataspaceStats = {};
  allKits.forEach(kit => {
    if (kit.dataspaces) {
      kit.dataspaces.forEach(dataspace => {
        dataspaceStats[dataspace] = (dataspaceStats[dataspace] || 0) + 1;
      });
    }
  });

  // Extended color palette to support many dataspaces
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
    '#06b6d4', '#84cc16', '#f97316', '#e11d48', '#6366f1', '#d946ef',
    '#0891b2', '#65a30d', '#ea580c', '#be123c', '#4f46e5', '#c026d3',
    '#0e7490', '#4d7c0f', '#c2410c', '#9f1239', '#3730a3', '#a21caf',
    '#164e63', '#365314', '#9a3412', '#7f1d1d', '#312e81', '#86198f',
    '#155e75', '#1a2e05', '#7c2d12', '#991b1b', '#1e1b4b', '#701a75',
    '#0c4a6e', '#14532d', '#431407', '#7f1d1d', '#020617', '#581c87',
    '#075985', '#166534', '#292524', '#450a0a', '#020617', '#4c1d95'
  ];
  
  // Generate colors dynamically if we exceed the predefined palette
  const generateColor = (index) => {
    if (index < colors.length) {
      return colors[index];
    }
    
    // Generate HSL colors with good contrast and saturation
    const hue = (index * 137.508) % 360; // Golden angle for good distribution
    const saturation = 65 + (index % 3) * 10; // Vary saturation 65-85%
    const lightness = 45 + (index % 4) * 5; // Vary lightness 45-65%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  const chartData = Object.entries(dataspaceStats).map(([name, count], index) => ({
    label: name,
    value: count,
    color: generateColor(index)
  }));

  return (
    <div className={styles.pieChartContainer} style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px'
    }}>
      <PieChart data={chartData} title="KITs by Dataspace Distribution" />
    </div>
  );
};

export default DataspaceDistribution;