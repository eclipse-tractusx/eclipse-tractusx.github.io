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

export const ProgressBar = ({ label, value, total, color, showPercentage = true }) => {
  const percentage = Math.round((value / total) * 100);
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '6px' 
      }}>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
        <span style={{ fontSize: '12px', color: 'var(--ifm-color-content-secondary)' }}>
          {value} {showPercentage && `(${percentage}%)`}
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--ifm-color-emphasis-200)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '4px',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;