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
import { School as GraduationIcon } from '@mui/icons-material';
import kitStyles from './KitAnalytics.module.css';

export const GraduatedKitsList = ({ styles }) => {
  const allKits = [
    ...(kitsData.dataspaceFoundation || []),
    ...(kitsData.industryCoreFoundation || []),
    ...(kitsData.useCases || [])
  ];

  // Add industry-specific KITs
  if (kitsData.industryKits) {
    Object.values(kitsData.industryKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        allKits.push(...kitsArray);
      }
    });
  }

  // Filter graduated KITs and sort by graduation date (newest first)
  const graduatedKits = allKits
    .filter(kit => kit.maturity?.currentLevel === 'Graduated' && kit.maturity?.graduatedAt)
    .sort((a, b) => new Date(b.maturity.graduatedAt) - new Date(a.maturity.graduatedAt));

  // Format date function
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  if (graduatedKits.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px',
      padding: 'clamp(16px, 3vw, 24px)',
      width: '100%'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '20px' 
      }}>
        <GraduationIcon style={{ 
          color: '#10b981', 
          fontSize: 'clamp(18px, 3vw, 24px)' 
        }} />
        <h4 style={{ 
          margin: 0, 
          fontSize: 'clamp(16px, 2.5vw, 18px)',
          fontWeight: '600',
          color: 'var(--ifm-color-content)'
        }}>
          Graduated KITs ({graduatedKits.length})
        </h4>
      </div>

      <div className={kitStyles.graduatedKitsList || ''} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
        maxHeight: '400px',
        overflowY: 'auto',
        paddingRight: '8px'
      }}>
        {graduatedKits.map((kit, index) => (
          <div key={kit.id || index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-200)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={() => {
            if (kit.route) {
              window.location.href = kit.route;
            }
          }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 'clamp(12px, 2vw, 14px)',
                fontWeight: '600',
                color: 'var(--ifm-color-content)',
                marginBottom: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {kit.name}
              </div>
              <div style={{
                fontSize: 'clamp(10px, 1.8vw, 12px)',
                color: 'var(--ifm-color-content-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <GraduationIcon style={{ fontSize: '12px', color: '#10b981' }} />
                {formatDate(kit.maturity.graduatedAt)}
              </div>
            </div>
            
            {/* Graduation badge */}
            <div style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.025em'
            }}>
              Graduated
            </div>
          </div>
        ))}
      </div>

      {graduatedKits.length > 8 && (
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--ifm-color-content-secondary)',
          fontStyle: 'italic'
        }}>
          Scroll to see all graduated KITs
        </div>
      )}
    </div>
  );
};

export default GraduatedKitsList;