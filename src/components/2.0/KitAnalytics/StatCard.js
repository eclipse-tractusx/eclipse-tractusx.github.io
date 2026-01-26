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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const StatCard = ({ title, value, subtitle, IconComponent, color, trend }) => (
  <div style={{
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    minWidth: '200px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: color
    }} />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
      <IconComponent sx={{ fontSize: 32, color: color }} />
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: color }}>
        {value}
      </div>
    </div>
    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: 'var(--ifm-color-content)' }}>
      {title}
    </div>
    {subtitle && (
      <div style={{ fontSize: '12px', color: 'var(--ifm-color-content-secondary)' }}>
        {subtitle}
      </div>
    )}
    {trend && (
      <div style={{ 
        marginTop: '8px', 
        fontSize: '11px', 
        color: trend > 0 ? 'var(--ifm-color-success)' : 'var(--ifm-color-danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }}>
        <TrendingUpIcon sx={{ fontSize: 12 }} />
        {trend > 0 ? '+' : ''}{trend} this quarter
      </div>
    )}
  </div>
);

export default StatCard;