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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useColorMode } from '@docusaurus/theme-common';

/**
 * ArtifactRequirementsTable Component
 * 
 * Displays a table of artifact requirements across different KIT maturity levels.
 * Supports grouping artifacts by "view" categories with full-width section headers.
 * Automatically adapts to light/dark mode.
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of artifact objects with the following structure:
 *   {
 *     artifact: string,           // Name of the artifact
 *     view: string,              // Category/view name (e.g., "Adoption View", "Development View")
 *     sandbox: number,           // Status for Sandbox stage (0=empty, 1=mandatory, 2=optional, 3=in-development, 4=expert-review)
 *     incubatingDraft: number,   // Status for Incubating Draft stage
 *     incubatingInProgress: number, // Status for Incubating In Progress stage
 *     incubatingInReview: number,   // Status for Incubating In Review stage
 *     graduated: number,         // Status for Graduated stage
 *     additionalInfo: string     // Additional information/description
 *   }
 * 
 * Status codes:
 * - 0: Empty (no requirement)
 * - 1: Mandatory (green check)
 * - 2: Optional/Recommended (gray check with *)
 * - 3: In Development (orange edit icon)
 * - 4: Expert Review Needed (purple review icon)
 * 
 * @example
 * <ArtifactRequirementsTable data={[
 *   {
 *     artifact: "Vision / Mission",
 *     view: "Adoption View",
 *     sandbox: 1,
 *     incubatingDraft: 1,
 *     incubatingInProgress: 1,
 *     incubatingInReview: 1,
 *     graduated: 1,
 *     additionalInfo: "Core foundation document"
 *   }
 * ]} />
 */
const ArtifactRequirementsTable = ({ data }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Theme-aware colors
  const colors = {
    border: isDark ? '#374151' : '#e5e7eb',
    headerBg: isDark ? '#1f2937' : '#f9fafb',
    sectionBg: isDark ? '#374151' : '#f3f4f6',
    rowEven: isDark ? '#1f2937' : '#ffffff',
    rowOdd: isDark ? '#111827' : '#f9fafb',
    sectionText: isDark ? '#f9fafb' : '#374151',
    infoText: isDark ? '#9ca3af' : '#6b7280'
  };

  // Get icon component based on status code
  const getStatusIcon = (status) => {
    switch (status) {
      case 1: // Mandatory
        return <CheckCircleIcon sx={{ fontSize: 14, color: '#10b981' }} />;
      case 2: // Optional
        return (
          <>
            <CheckCircleIcon sx={{ fontSize: 14, color: '#6b7280' }} />
            <span style={{ fontSize: '11px', verticalAlign: 'super' }}>*</span>
          </>
        );
      case 3: // In Development
        return <EditIcon sx={{ fontSize: 14, color: '#f59e0b' }} />;
      case 4: // Expert Review
        return <RateReviewIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />;
      default:
        return null;
    }
  };

  // Group artifacts by view
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.view]) {
      acc[item.view] = [];
    }
    acc[item.view].push(item);
    return acc;
  }, {});

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      {/* Legend */}
      <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <strong>Legend:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>
            <CheckCircleIcon sx={{ fontSize: 14, color: '#10b981', verticalAlign: 'middle' }} /> Mandatory
          </li>
          <li>
            <CheckCircleIcon sx={{ fontSize: 14, color: '#6b7280', verticalAlign: 'middle' }} />* Initial Draft Version (If Applicable)
          </li>
          <li>
            <EditIcon sx={{ fontSize: 14, color: '#f59e0b', verticalAlign: 'middle' }} /> In Development / Extension of Specification
          </li>
          <li>
            <RateReviewIcon sx={{ fontSize: 14, color: '#8b5cf6', verticalAlign: 'middle' }} /> Expert Review Needed
          </li>
        </ul>
      </div>

      {/* Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem',
        border: `1px solid ${colors.border}`
      }}>
        <thead>
          <tr style={{ backgroundColor: colors.headerBg }}>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Artifact / Stage
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Sandbox
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Incubating Draft
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Incubating In Progress
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Incubating In Review
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`
            }}>
              Graduated
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.border}`
            }}>
              Additional Info
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedData).map(([view, artifacts], viewIndex) => (
            <React.Fragment key={viewIndex}>
              {/* View Section Header */}
              <tr style={{ backgroundColor: colors.sectionBg }}>
                <td
                  colSpan="7"
                  style={{
                    padding: '0.75rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    borderBottom: `1px solid ${colors.border}`,
                    color: colors.sectionText
                  }}
                >
                  {view}
                </td>
              </tr>
              {/* Artifacts in this view */}
              {artifacts.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.rowEven : colors.rowOdd
                  }}
                >
                  <td style={{
                    padding: '0.75rem',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {item.artifact}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {getStatusIcon(item.sandbox)}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {getStatusIcon(item.incubatingDraft)}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {getStatusIcon(item.incubatingInProgress)}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {getStatusIcon(item.incubatingInReview)}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                    borderRight: `1px solid ${colors.border}`
                  }}>
                    {getStatusIcon(item.graduated)}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    borderBottom: `1px solid ${colors.border}`,
                    fontSize: '0.8125rem',
                    color: colors.infoText
                  }}>
                    {item.additionalInfo}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtifactRequirementsTable;
