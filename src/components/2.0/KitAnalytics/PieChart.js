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

export const PieChart = ({ data, title, size = 200 }) => {
  let cumulativePercentage = 0;
  const [chartSize, setChartSize] = React.useState(size);
  
  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const containerWidth = Math.min(400, window.innerWidth - 40);
        // More aggressive scaling for very small screens
        if (window.innerWidth <= 360) {
          setChartSize(Math.max(140, containerWidth * 0.5));
        } else if (window.innerWidth <= 480) {
          setChartSize(Math.max(160, containerWidth * 0.55));
        } else {
          setChartSize(Math.max(160, Math.min(200, containerWidth * 0.6)));
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div style={{ 
      textAlign: 'center', 
      marginBottom: '24px',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <h4 style={{ 
        marginBottom: '16px',
        fontSize: 'clamp(12px, 2.5vw, 18px)',
        wordWrap: 'break-word'
      }}>{title}</h4>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '16px',
        width: '100%',
        maxWidth: '100%'
      }}>
        <svg 
          width={chartSize} 
          height={chartSize} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto' 
          }}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
        >
          {data.map((item, index) => {
            const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100;
            const startAngle = (cumulativePercentage / 100) * 360 - 90;
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360 - 90;
            
            const startAngleRad = (Math.PI / 180) * startAngle;
            const endAngleRad = (Math.PI / 180) * endAngle;
            
            const radius = chartSize / 2 - 10;
            const centerX = chartSize / 2;
            const centerY = chartSize / 2;
            
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            cumulativePercentage += percentage;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="var(--ifm-color-emphasis-100)"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '8px',
        justifyItems: 'center'
      }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            fontSize: 'clamp(10px, 1.5vw, 12px)',
            padding: '4px 8px',
            backgroundColor: 'var(--ifm-color-emphasis-50)',
            borderRadius: '4px',
            border: '1px solid var(--ifm-color-emphasis-200)'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '2px',
              backgroundColor: item.color,
              flexShrink: 0
            }} />
            <span style={{ 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;