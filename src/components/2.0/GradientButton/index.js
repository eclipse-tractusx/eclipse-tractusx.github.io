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

import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

/**
 * GradientButton component - A reusable button with gradient background and hover effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - URL to navigate to
 * @param {string} props.text - Button text
 * @param {React.Component} props.icon - Material-UI icon component
 * @param {string} [props.gradient='linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'] - CSS gradient
 * @param {string} [props.shadowColor='rgba(76, 175, 80, 0.3)'] - Box shadow color
 * @param {string} [props.shadowColorHover='rgba(76, 175, 80, 0.4)'] - Box shadow color on hover
 * @param {boolean} [props.external=true] - Whether link opens in new tab
 * @param {string} [props.minWidth='250px'] - Minimum button width
 */
export const GradientButton = ({ 
  href, 
  text, 
  icon: Icon, 
  gradient = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  shadowColor = 'rgba(76, 175, 80, 0.3)',
  shadowColorHover = 'rgba(76, 175, 80, 0.4)',
  external = true,
  minWidth = '250px'
}) => {
  return (
    <a 
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px',
        background: gradient,
        color: 'white',
        textDecoration: 'none',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
        boxSizing: 'border-box',
        boxShadow: `0 4px 14px 0 ${shadowColor}`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minWidth: minWidth,
        gap: '12px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 8px 25px 0 ${shadowColorHover}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 4px 14px 0 ${shadowColor}`;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {Icon && <Icon sx={{ fontSize: 20 }} />}
        <span>{text}</span>
      </div>
      <OpenInNewIcon sx={{ fontSize: 18, opacity: 0.8 }} />
    </a>
  );
};

export default GradientButton;
