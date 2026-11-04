/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import React from 'react';
import { kitsData } from '@site/data/kitsData.js';

const KitMetadataBadges = ({ kitId }) => {
  // Find the kit in the data - search all categories
  const kit = [
    ...(kitsData.dataspaceFoundation || []), 
    ...(kitsData.businessDomain || []), 
    ...(kitsData.enablementServices || [])
  ].find(k => k.id === kitId);

  if (!kit) {
    return null;
  }

  const badgeContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
    marginBottom: '24px',
    alignItems: 'center'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid'
  };

  const getMaturityLevelColor = (level) => {
    switch (level) {
      case 'Sandbox':
        return { bg: '#fff3cd', text: '#856404', border: '#ffc107' };
      case 'Lab':
        return { bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8' };
      case 'Stable':
        return { bg: '#d4edda', text: '#155724', border: '#28a745' };
      case 'Deprecated':
        return { bg: '#f8d7da', text: '#721c24', border: '#dc3545' };
      default:
        return { bg: '#e2e3e5', text: '#383d41', border: '#6c757d' };
    }
  };

  const getGraduationColor = (status) => {
    if (status === 'draft') {
      return { bg: '#fff3cd', text: '#856404', border: '#ffc107' };
    }
    return { bg: '#d4edda', text: '#155724', border: '#28a745' };
  };

  const maturityColors = kit.maturity?.currentLevel ? getMaturityLevelColor(kit.maturity.currentLevel) : null;
  const graduationColors = kit.maturity?.graduationStatus ? getGraduationColor(kit.maturity.graduationStatus) : null;

  return (
    <div style={badgeContainerStyle}>
      {kit.maturity?.currentLevel && (
        <span style={{
          ...badgeStyle,
          backgroundColor: maturityColors.bg,
          color: maturityColors.text,
          borderColor: maturityColors.border
        }}>
          <strong>Maturity Level:</strong>&nbsp;{kit.maturity.currentLevel}
        </span>
      )}
      
      {kit.maturity?.graduationStatus && (
        <span style={{
          ...badgeStyle,
          backgroundColor: graduationColors.bg,
          color: graduationColors.text,
          borderColor: graduationColors.border
        }}>
          <strong>Graduation Status:</strong>&nbsp;{kit.maturity.graduationStatus}
        </span>
      )}
      
      {kit.metadata?.latestVersion && (
        <span style={{
          ...badgeStyle,
          backgroundColor: '#e7f3ff',
          color: '#004085',
          borderColor: '#007bff'
        }}>
          <strong>Version:</strong>&nbsp;v{kit.metadata.latestVersion}
        </span>
      )}
      
      {kit.metadata?.new && (
        <span style={{
          ...badgeStyle,
          backgroundColor: '#d4edda',
          color: '#155724',
          borderColor: '#28a745'
        }}>
          <strong>🎉 New</strong>
        </span>
      )}
      
      {kit.domain && (
        <span style={{
          ...badgeStyle,
          backgroundColor: '#f8f9fa',
          color: '#495057',
          borderColor: '#6c757d'
        }}>
          <strong>Domain:</strong>&nbsp;{kit.domain}
        </span>
      )}
    </div>
  );
};

export default KitMetadataBadges;
