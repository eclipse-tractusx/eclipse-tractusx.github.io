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

import React, { useState, useEffect } from 'react';
import { kitsData } from '../../../../data/kitsData.js';

export const QuarterlyTrends = ({ styles }) => {
  const allKits = [
    ...(kitsData.dataspaceFoundation || []),
    ...(kitsData.industryCoreFoundation || []),
    ...(kitsData.useCases || [])
  ];

  if (kitsData.dataspaceKits) {
    Object.values(kitsData.dataspaceKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        allKits.push(...kitsArray);
      }
    });
  }

  const kitsWithDates = allKits.filter(kit => kit.metadata?.created);
  
  // Group by quarters
  const quarterStats = {};
  kitsWithDates.forEach(kit => {
    const date = new Date(kit.metadata.created);
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const quarterKey = `${year}-Q${quarter}`;
    
    quarterStats[quarterKey] = (quarterStats[quarterKey] || 0) + 1;
  });

  const quarters = Object.keys(quarterStats).sort();
  const displayQuarters = quarters.slice(-16); // Show last 16 quarters for more data
  const maxKits = Math.max(...displayQuarters.map(q => quarterStats[q] || 0));
  
  // Responsive chart dimensions
  const getChartDimensions = () => {
    if (typeof window !== 'undefined') {
      // More modest desktop size, responsive for smaller screens
      if (window.innerWidth > 1200) {
        const width = Math.min(700, window.innerWidth * 0.6);
        const height = Math.min(380, width * 0.54);
        return { width, height };
      } else if (window.innerWidth > 768) {
        const width = Math.min(650, window.innerWidth * 0.75);
        const height = Math.min(350, width * 0.54);
        return { width, height };
      } else {
        const width = Math.min(600, window.innerWidth * 0.9);
        const height = Math.min(320, width * 0.53);
        return { width, height };
      }
    }
    return { width: 650, height: 350 }; // Default desktop size
  };

  const [dimensions, setDimensions] = useState(() => getChartDimensions());
  
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getChartDimensions());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width: chartWidth, height: chartHeight } = dimensions;
  const padding = Math.min(60, chartWidth * 0.1);
  const plotWidth = chartWidth - (padding * 2);
  const plotHeight = chartHeight - (padding * 2);

  // Calculate points for the line
  const points = displayQuarters.map((quarter, index) => {
    const count = quarterStats[quarter] || 0;
    const x = padding + (index * (plotWidth / (displayQuarters.length - 1)));
    const y = padding + plotHeight - ((count / maxKits) * plotHeight);
    return { x, y, count, quarter, index };
  });

  // Create path string for the line
  const pathD = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px',
      padding: 'clamp(16px, 3vw, 24px)',
      width: '100%',
      overflow: 'hidden'
    }}>
      <h4 style={{ 
        marginBottom: 'clamp(18px, 3vw, 24px)', 
        textAlign: 'center', 
        fontSize: 'clamp(16px, 2.5vw, 18px)',
        fontWeight: '600'
      }}>Historical KIT Creation Trends</h4>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        width: '100%',
        overflowX: 'auto',
        minHeight: chartHeight + 40
      }}>
        <svg 
          width={chartWidth} 
          height={chartHeight} 
          style={{ 
            overflow: 'visible',
            maxWidth: '100%',
            minWidth: '320px'
          }}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map(i => {
            const y = padding + (i * (plotHeight / 5));
            const gridValue = Math.round((maxKits * (5 - i)) / 5);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={padding + plotWidth}
                  y2={y}
                  stroke="var(--ifm-color-emphasis-300)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill="var(--ifm-color-content-secondary)"
                  fontSize={Math.max(10, Math.min(12, chartWidth * 0.017))}
                  textAnchor="end"
                >
                  {gridValue}
                </text>
              </g>
            );
          })}
          
          {/* X-axis */}
          <line
            x1={padding}
            y1={padding + plotHeight}
            x2={padding + plotWidth}
            y2={padding + plotHeight}
            stroke="var(--ifm-color-emphasis-400)"
            strokeWidth="2"
          />
          
          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + plotHeight}
            stroke="var(--ifm-color-emphasis-400)"
            strokeWidth="2"
          />
          
          {/* Line chart */}
          <path
            d={pathD}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${padding + plotHeight} L ${points[0].x} ${padding + plotHeight} Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={Math.max(4, Math.min(6, chartWidth * 0.008))}
                fill="#f59e0b"
                stroke="white"
                strokeWidth="2"
              />
              {/* Value labels */}
              <text
                x={point.x}
                y={point.y - 12}
                fill="var(--ifm-color-content)"
                fontSize={Math.max(9, Math.min(12, chartWidth * 0.018))}
                fontWeight="bold"
                textAnchor="middle"
              >
                {point.count}
              </text>
            </g>
          ))}
          
          {/* Quarter labels - Show fewer on smaller screens */}
          {points.filter((_, index) => {
            if (chartWidth < 400) return index % 4 === 0 || index === points.length - 1;
            return index % 2 === 0 || index === points.length - 1;
          }).map((point) => (
            <text
              key={point.index}
              x={point.x}
              y={padding + plotHeight + 18}
              fill="var(--ifm-color-content-secondary)"
              fontSize={Math.max(9, Math.min(12, chartWidth * 0.016))}
              textAnchor="middle"
            >
              {point.quarter}
            </text>
          ))}
        </svg>
      </div>
      <div style={{ 
        fontSize: 'clamp(12px, 2vw, 14px)', 
        color: 'var(--ifm-color-content-secondary)', 
        textAlign: 'center',
        marginTop: '16px',
        padding: '0 8px'
      }}>
        KITs created per quarter (last {displayQuarters.length} quarters)
      </div>
    </div>
  );
};

export default QuarterlyTrends;