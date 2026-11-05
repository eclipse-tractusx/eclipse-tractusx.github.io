/********************************************************************************* 
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
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

const KitDualViewCard = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '20px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '12px',
        padding: '24px',
        position: 'relative',
        flex: '1 1 300px',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: 'var(--ifm-color-emphasis-700)',
          backgroundColor: 'var(--ifm-background-color)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid var(--ifm-color-emphasis-300)'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span style={{ fontWeight: '500' }}>Business Stakeholders</span>
        </div>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: 'var(--ifm-color-primary)',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Adoption View
        </h4>
        <p style={{
          margin: '0 0 16px 0',
          fontSize: '13px',
          color: 'var(--ifm-color-emphasis-700)',
          fontStyle: 'italic'
        }}>
          Why do we do this use case? / What is the scope? / What is the business context? / Which data I need?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Vision and mission statement</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Business Values proposition</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Semantic / Data Models <em style={{ color: 'var(--ifm-color-emphasis-600)' }}>(If applicable)</em></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Logic/Schema from scenario</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="6" y1="3" x2="6" y2="15"/>
              <circle cx="18" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/>
              <path d="M18 9a9 9 0 0 1-9 9"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-emphasis-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      <div style={{
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        padding: '24px',
        position: 'relative',
        flex: '1 1 300px',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: 'var(--ifm-color-emphasis-700)',
          backgroundColor: 'var(--ifm-background-color)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid var(--ifm-color-emphasis-300)'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
          <span style={{ fontWeight: '500' }}>Architects / Developers</span>
        </div>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: '#3b82f6',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Development View
        </h4>
        <p style={{
          margin: '0 0 16px 0',
          fontSize: '13px',
          color: 'var(--ifm-color-emphasis-700)',
          fontStyle: 'italic'
        }}>
          How to implement it? / How does it work? / Which systems are involved, and how they are integrated?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Basic architecture overview</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Protocols Used <em style={{ color: 'var(--ifm-color-emphasis-600)' }}>(if applicable)</em></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              minWidth: '20px',
              height: '20px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>✓</span>
            <span style={{ lineHeight: '1.6', flex: 1 }}>Initial API definitions <em style={{ color: 'var(--ifm-color-emphasis-600)' }}>(if applicable)</em></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitDualViewCard;
