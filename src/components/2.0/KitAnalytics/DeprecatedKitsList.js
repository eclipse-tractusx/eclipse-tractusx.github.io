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
import WarningIcon from '@mui/icons-material/Warning';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpdateIcon from '@mui/icons-material/Update';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DeprecatedKitsList = ({ styles }) => {
  // Collect all KITs
  const foundationKits = [...(kitsData.dataspaceFoundation || [])];
  const industryCoreKits = [...(kitsData.industryCoreFoundation || [])];
  const useCaseKits = [...(kitsData.useCases || [])];
  
  const dataspaceSpecificKits = [];
  if (kitsData.dataspaceKits) {
    Object.values(kitsData.dataspaceKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        dataspaceSpecificKits.push(...kitsArray);
      }
    });
  }

  const allKits = [...foundationKits, ...industryCoreKits, ...useCaseKits, ...dataspaceSpecificKits];

  // Filter deprecated KITs and sort by deprecation date (most recent first)
  const deprecatedKits = allKits
    .filter(kit => kit.deprecated)
    .sort((a, b) => {
      const dateA = a.maturity?.deprecatedAt ? new Date(a.maturity.deprecatedAt) : new Date(0);
      const dateB = b.maturity?.deprecatedAt ? new Date(b.maturity.deprecatedAt) : new Date(0);
      return dateB - dateA;
    });

  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateLifespan = (createdDate, deprecatedDate) => {
    if (!createdDate || !deprecatedDate) return null;
    const created = new Date(createdDate);
    const deprecated = new Date(deprecatedDate);
    const diffTime = Math.abs(deprecated - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    
    if (diffMonths === 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}${remainingDays > 0 ? `, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}` : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : ''}`;
    }
  };

  if (deprecatedKits.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'var(--ifm-background-color)',
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '40px'
    }}>
      <h4 style={{ 
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--ifm-color-danger)'
      }}>
        Deprecated KITs ({deprecatedKits.length})
      </h4>
      <p style={{ 
        fontSize: '14px', 
        color: 'var(--ifm-color-content-secondary)',
        marginBottom: '20px'
      }}>
        These KITs are no longer maintained and should not be used for new implementations.
      </p>

      <div style={{
        display: 'grid',
        gap: '12px',
        maxHeight: '400px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {deprecatedKits.map((kit, index) => (
          <div key={kit.id || index} style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '16px',
            padding: '16px',
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            opacity: 0.8
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-danger)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-200)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onClick={() => {
            if (kit.route) {
              window.location.href = kit.route;
            }
          }}
          >
            {/* Left: KIT Name */}
            <div style={{ 
              flex: '0 0 200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--ifm-color-content)',
                opacity: 0.7
              }}>
                {kit.name}
              </div>
            </div>

            {/* Middle: Dates Information */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '12px',
              color: 'var(--ifm-color-content-secondary)',
              justifyContent: 'center',
              borderLeft: '1px solid var(--ifm-color-emphasis-200)',
              borderRight: '1px solid var(--ifm-color-emphasis-200)',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}>
              {kit.metadata?.created && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AddCircleOutlineIcon style={{ fontSize: '14px', color: 'var(--ifm-color-success)' }} />
                  <span style={{ fontWeight: '500' }}>Created:</span> {formatDate(kit.metadata.created)}
                </div>
              )}
              {kit.metadata?.lastUpdated && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UpdateIcon style={{ fontSize: '14px', color: 'var(--ifm-color-info)' }} />
                  <span style={{ fontWeight: '500' }}>Last Updated:</span> {formatDate(kit.metadata.lastUpdated)}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <WarningIcon style={{ fontSize: '14px', color: 'var(--ifm-color-danger)' }} />
                <span style={{ fontWeight: '500' }}>Deprecated:</span> {kit.maturity?.deprecatedAt ? formatDate(kit.maturity.deprecatedAt) : 'Date unknown'}
              </div>
              {kit.metadata?.created && kit.maturity?.deprecatedAt && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '2px',
                  color: 'var(--ifm-color-primary)',
                  fontWeight: '500'
                }}>
                  <AccessTimeIcon style={{ fontSize: '14px', color: 'var(--ifm-color-primary)' }} />
                  <span style={{ fontWeight: '600' }}>Lifespan:</span> {calculateLifespan(kit.metadata.created, kit.maturity.deprecatedAt)}
                </div>
              )}
              {kit.maturity?.deprecationReason && (
                <div style={{
                  fontSize: '11px',
                  marginTop: '4px',
                  fontStyle: 'italic',
                  paddingTop: '4px',
                  borderTop: '1px solid var(--ifm-color-emphasis-200)'
                }}>
                  {kit.maturity.deprecationReason}
                </div>
              )}
            </div>
            
            {/* Right: Deprecated badge */}
            <div style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                backgroundColor: 'var(--ifm-color-danger)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
                whiteSpace: 'nowrap'
              }}>
                Deprecated
              </div>
            </div>
          </div>
        ))}
      </div>

      {deprecatedKits.length > 8 && (
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--ifm-color-content-secondary)',
          fontStyle: 'italic'
        }}>
          Scroll to see all deprecated KITs
        </div>
      )}
    </div>
  );
};

export default DeprecatedKitsList;
