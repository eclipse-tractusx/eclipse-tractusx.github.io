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
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatIcon from '@mui/icons-material/Chat';

/**
 * TractusXBusinessCard component - A reusable business card with Tractus-X branding
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Person's full name
 * @param {string} props.title - Job title or role
 * @param {string} props.subtitle - Additional subtitle (e.g., organization)
 * @param {string} props.avatarUrl - URL to person's avatar image
 * @param {string} props.email - Email address
 * @param {string} props.github - GitHub username or profile URL
 * @param {string} props.matrix - Matrix chat handle or profile URL
 * @param {string} [props.backgroundImage='/img/tx-logos/221103_TractusX_Gradient_slim.png'] - Background image URL
 * @param {string} [props.maxWidth='500px'] - Maximum card width
 */
export const TractusXBusinessCard = ({ 
  name,
  title,
  subtitle,
  avatarUrl,
  email,
  github,
  matrix,
  backgroundImage = '/img/tx-logos/221103_TractusX_Gradient_slim.png',
  maxWidth = '500px'
}) => {
  return (
    <div 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '120% 120%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '20px',
        padding: '48px 40px',
        margin: '30px 0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        maxWidth: maxWidth,
        minHeight: '250px',
        color: 'white',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        fontFamily: 'Manrope, sans-serif'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <img 
          src={avatarUrl} 
          alt={name}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '16px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            objectFit: 'cover',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: '24px',
            fontWeight: '700',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {name}
          </h3>
          <div style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            {title}
          </div>
          {subtitle && (
            <div style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '2',
              fontStyle: 'italic'
            }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '10px'
      }}>
        {email && (
          <a 
            href={email.startsWith('mailto:') ? email : `mailto:${email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <EmailIcon sx={{ fontSize: 16 }} />
            <span>Email</span>
          </a>
        )}
        
        {github && (
          <a 
            href={github.startsWith('http') ? github : `https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <GitHubIcon sx={{ fontSize: 16 }} />
            <span>GitHub</span>
          </a>
        )}
        
        {matrix && (
          <a 
            href={matrix.startsWith('http') ? matrix : `https://chat.eclipse.org/#/user/${matrix}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <ChatIcon sx={{ fontSize: 16 }} />
            <span>Matrix</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default TractusXBusinessCard;
