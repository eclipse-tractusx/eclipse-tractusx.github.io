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

export const StakeholderChip = ({children, color}) => (
  <span style={{
    backgroundColor: color,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    marginRight: '4px',
    display: 'inline-block',
    marginBottom: '4px'
  }}>
    {children}
  </span>
);

export const KitStructureTable = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const kitViews = [
    {
      view: "Adoption View",
      sectionId: "adoption-view",
      stakeholders: [{name: "Business", color: "#3b82f6"}],
      content: "Business Value, Motivation, Vision, Mission, Whitepapers, Semantic Models, Standards, Tutorials, Explanations why this use case is important, Context"
    },
    {
      view: "Development View", 
      sectionId: "development-view",
      stakeholders: [
        {name: "Developers", color: "#10b981"},
        {name: "Architects", color: "#10b981"}
      ],
      content: "Overall Architecture, Reference Implementations, API specifications, Policies, Algorithms, Functional Requirements, Sequence Diagrams, Process, Architecture Guidelines"
    },
    {
      view: "Operator View",
      sectionId: "operations-view",
      stakeholders: [
        {name: "Operators", color: "#f59e0b"},
        {name: "Service Providers", color: "#f59e0b"}
      ],
      content: "Non-Functional Requirements, Security Requirements, Recommendations, Restrictions"
    },
    {
      view: "Documentation",
      sectionId: "documentation",
      stakeholders: [{name: "Any Stakeholder", color: "#8b5cf6"}],
      content: "Extra Documentation and Links"
    },
    {
      view: "Success Stories",
      sectionId: "success-stories",
      stakeholders: [
        {name: "Operators", color: "#ef4444"},
        {name: "Service Providers", color: "#ef4444"},
        {name: "Business", color: "#ef4444"}
      ],
      content: "Success Stories from Reference Implementations that used this KIT. Open Source and COTS."
    },
    {
      view: "Industry Extensions",
      sectionId: "industry-extensions",
      stakeholders: [{name: "Dataspace Adopters", color: "#6366f1"}],
      content: "One Folder per Industry. Extends the contents from the other views with regards to a specific industry and affiliated dataspace standards/requirements"
    }
  ];

  return (
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        <tr style={{backgroundColor: '#faa023', borderBottom: '2px solid #e5e7eb'}}>
          <th style={{padding: '12px', textAlign: 'left', fontWeight: 'bold', color: 'black'}}>Views</th>
          <th style={{padding: '12px', textAlign: 'left', fontWeight: 'bold', color: 'black'}}>Stakeholders</th>
          <th style={{padding: '12px', textAlign: 'left', fontWeight: 'bold', color: 'black'}}>Content</th>
        </tr>
      </thead>
      <tbody>
        {kitViews.map((row, index) => (
          <tr 
            key={index} 
            style={{
              borderBottom: '1px solid #f3f4f6',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => scrollToSection(row.sectionId)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(250, 160, 35, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollToSection(row.sectionId);
              }
            }}
          >
            <td style={{padding: '12px', fontWeight: 'bold', verticalAlign: 'top'}}>
              {row.view}
            </td>
            <td style={{padding: '12px', verticalAlign: 'top'}}>
              {row.stakeholders.map((stakeholder, i) => (
                <StakeholderChip key={i} color={stakeholder.color}>
                  {stakeholder.name}
                </StakeholderChip>
              ))}
            </td>
            <td style={{padding: '12px', verticalAlign: 'top', lineHeight: '1.5'}}>
              {row.content}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KitStructureTable;