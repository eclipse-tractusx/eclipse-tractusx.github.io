/********************************************************************************* 
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 * 
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

/**
 * Artifact Requirements Data Configuration
 * 
 * This file contains the configuration for KIT artifact requirements across different maturity levels.
 * Each artifact has a status for each stage of the KIT lifecycle.
 * 
 * Status codes:
 * - 0: Empty (no requirement)
 * - 1: Mandatory (green check)
 * - 2: Optional/Recommended (gray check with *)
 * - 3: In Development (orange edit icon)
 * - 4: Expert Review Needed (purple review icon)
 * 
 * View categories group related artifacts together with section headers in the table.
 */

export const artifactRequirementsData = [
  // ==================== ADOPTION VIEW ====================
  {
    artifact: "Vision / Mission",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Core foundation document, which describe why it makes sense and what is the goal of the KIT"
  },
  {
    artifact: "Business Value(s)",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "This is necessary to show if there is a clear business value for the KIT"
  },
  {
    artifact: "Use Case / Domain explanation",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Explains the Use Case (What is its context) and how it works"
  },
  {
    artifact: "Adoption View",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Overview of KIT adoption and implementation guidance"
  },
  {
    artifact: "Notice",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Legal and compliance notice in every file as described in TRG 07.07 and TRG 07.06"
  },
  {
    artifact: "Changelog",
    view: "Adoption View",
    sandbox: 1,
    incubatingDraft: 1,
    incubatingInProgress: 1,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Version history and updates, is mandatory for all lifecycles"
  },
  {
    artifact: "Code Owner",
    view: "Adoption View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 2,
    incubatingInReview: 1,
    graduated: 1,
    additionalInfo: "Required for graduation - how to configure see TRG 10.02 - KIT Content Structure and see also TRG 10.05 - KIT Graduation Process"
  },
  {
    artifact: "Industry Extension",
    view: "Adoption View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 2,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Required for graduation - at least one industry extension with industrial standards compliance - see TRG 10.02 - Industry Extensions"
  },
  {
    artifact: "Tutorials / Videos",
    view: "Adoption View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 2,
    incubatingInReview: 4,
    graduated: 2,
    additionalInfo: "Educational content"
  },
  {
    artifact: "Whitepaper",
    view: "Adoption View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 2,
    incubatingInReview: 4,
    graduated: 2,
    additionalInfo: "Research and analysis document"
  },

  // ==================== DEVELOPMENT VIEW ====================
  {
    artifact: "Standards",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Industry standards compliance, if industry specific like (Catena-X e.V. standards) shall be referenced in the Industry Extension under the industry branch"
  },
  {
    artifact: "API-Specification / Protocols",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Technical interface definitions, required for developing microservices"
  },
  {
    artifact: "Logic / Schema",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Required for documenting the context, diagrams which specify the system that can be built with the KIT"
  },
  {
    artifact: "Architecture",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "System design and architecture"
  },
  {
    artifact: "Documentation",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 2,
    incubatingInProgress: 2,
    incubatingInReview: 2,
    graduated: 2,
    additionalInfo: "Optional/Recommended at all phases"
  },
  {
    artifact: "Sample Data",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 2,
    incubatingInReview: 4,
    graduated: 2,
    additionalInfo: "Example datasets"
  },
  {
    artifact: "Quick Setup Guide",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 3,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Exception: not needed without reference implementation"
  },
  {
    artifact: "Semantic Models",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "May not be relevant for Network Services"
  },
  {
    artifact: "Business Processes",
    view: "Development View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 1,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "May not be relevant for Network Services"
  },

  // ==================== OPERATION VIEW ====================
  {
    artifact: "Operation Guidelines",
    view: "Operation View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 3,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Guidelines for operating and maintaining the KIT in production environments"
  },
  {
    artifact: "Security Guidelines",
    view: "Operation View",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 3,
    incubatingInReview: 4,
    graduated: 1,
    additionalInfo: "Security best practices, threat models, and security configurations"
  },

  // ==================== SUCCESS STORIES ====================
  {
    artifact: "Reference Implementation",
    view: "Success Stories",
    sandbox: 0,
    incubatingDraft: 0,
    incubatingInProgress: 2,
    incubatingInReview: 4,
    graduated: 2,
    additionalInfo: "Working code examples"
  }
];
