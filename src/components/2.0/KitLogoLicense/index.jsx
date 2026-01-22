/********************************************************************************
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
import styles from './kit-logo-license.module.scss';

/**
 * KitLogoLicense Component
 * 
 * Displays SPDX-compliant license information for KIT logos
 * 
 * @param {Object} props
 * @param {Object} props.logoLicencse - License information object
 * @param {string} props.logoLicencse.type - License type (e.g., 'CC-BY-4.0')
 * @param {string} props.logoLicencse.authors - Semicolon-separated list of copyright holders
 * @param {string} props.logoLicencse.licenseUrl - URL to license file
 * @param {string} props.logoLicencse.sourceUrl - URL to source file
 * @param {string} [props.logoLicencse.originalSourceUrl] - Optional URL to original source
 * @param {Object} props.licenses - License type to URL mapping
 */
export default function KitLogoLicense({ logoLicencse, licenses }) {
  if (!logoLicencse) return null;

  return (
    <div className={styles.licenseInfo}>
      <div className={styles.licenseHeader}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span>KIT 3D Logo Licence Notice</span>
      </div>
      
      <div className={styles.licenseText}>
        <span className={styles.licenseLabel}>SPDX-License-Identifier:</span>
        {logoLicencse.type && licenses[logoLicencse.type] ? (
          <a 
            href={licenses[logoLicencse.type]}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseType}
            title="View License Text"
          >
            {logoLicencse.type}
          </a>
        ) : (
          <span className={styles.licenseType}>{logoLicencse.type}</span>
        )}
      </div>
      
      {logoLicencse.authors && (
        <div className={styles.licenseAuthors}>
          {logoLicencse.authors.split(';').map((author, index) => (
            <div key={index} className={styles.authorLine}>
              <span className={styles.licenseLabel}>SPDX-FileCopyrightText:</span>
              <textarea 
                value={author.trim()} 
                readOnly 
                className={styles.authorInput}
                ref={(textarea) => {
                  if (textarea) {
                    textarea.style.height = '0px';
                    textarea.style.height = textarea.scrollHeight + 'px';
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.logoLicenseHeader}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span>Infografic Logo License Notice</span>
      </div>
      
      <div className={styles.licenseButtons}>
        {logoLicencse.licenseUrl && (
          <a 
            href={logoLicencse.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseButton}
            title="View License File"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Infografic Logo Copyright Declaration
          </a>
        )}
        {logoLicencse.sourceUrl && (
          <a 
            href={logoLicencse.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseButton}
            title="View Source File"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Infografic Logo Source
          </a>
        )}
        {logoLicencse.originalSourceUrl && (
          <a 
            href={logoLicencse.originalSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseButton}
            title="View Original Source"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Infografic Logo Original Source
          </a>
        )}
      </div>
    </div>
  );
}
