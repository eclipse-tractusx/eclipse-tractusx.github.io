/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
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

/*
 * PRODUCT MASTER DATA
 *
 * Each product entry follows this schema:
 * {
 *   id: string (unique, kebab-case),
 *   name: string (display name),
 *   description: string (short description),
 *   category: 'use-cases' | 'dataspace-foundation' | 'industry-core-foundation' | 'qa-testing-tools',
 *   relevance: string[] (tags for color coding),
 *   status: 'active' | 'phase-out' | 'tbd',
 *   repositories: { name: string, url: string }[],
 *   contacts: { name: string, role: string, github: string }[],
 *   committers: { github: string, name?: string }[] (Eclipse Tractus-X committers behind the repositories),
 *   agents: { id: string, name: string, description: string, repository: string, url: string, avatar?: string }[]
 *           (AI agents defined in the repositories under .github/agents),
 *   details: string (longer description / overview),
 *   icon: string (MUI icon name from @mui/icons-material),
 * }
 */

const productCategories = [
  {
    id: 'use-cases',
    name: 'Use Cases',
    description: 'End-user applications and frontends that implement specific business use cases across the Tractus-X ecosystem.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'dataspace-foundation',
    name: 'Dataspace Foundation',
    description: 'Core infrastructure components that enable the creation and operation of secure, interoperable dataspaces.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'industry-core-foundation',
    name: 'Industry Core Foundation',
    description: 'Components that provide industry-specific data exchange, semantic modeling, and relationship tracking capabilities.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'qa-testing-tools',
    name: 'QA / Testing & Tools',
    description: 'Development, testing, and quality assurance tools that support the Tractus-X development lifecycle.',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

const relevanceTypes = [
  { id: 'catena-x-operative', label: 'Relevant for Catena-X Operative', color: '#f8a4a4' },
  { id: 'development-testing', label: 'Relevant for Catena-X Development / Testing', color: '#a4c8f8' },
  { id: 'catena-x-demo', label: 'Relevant for Catena-X Demo', color: '#d4a4f8' },
  { id: 'dataspace-participants', label: 'Relevant for Catena-X Dataspace Participants', color: '#a4f8c8' },
  { id: 'manufacturing-x', label: 'Relevant for Manufacturing-X', color: '#f8f0a4' },
];

const products = [
  // ─── USE CASES ────────────────────────────────────────────────
  {
    id: 'industry-core-hub-frontend',
    name: 'Industry Core Hub Frontend',
    subtitle: 'DPP, CCM, etc.',
    description: 'Frontend application for industry core hub functionalities including Digital Product Passport, Company Certificate Management, and more.',
    category: 'use-cases',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'DesktopWindows',
    repositories: [
      { name: 'industry-core-hub', url: 'https://github.com/eclipse-tractusx/industry-core-hub' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The Industry Core Hub Frontend provides a unified user interface for accessing various industry core functionalities, including Digital Product Passports (DPP) and Company Certificate Management (CCM).',
  },
  {
    id: 'puris',
    name: 'PURIS',
    description: 'Predictive Unit Real-Time Information System for supply chain visibility and short-term demand/capacity management.',
    category: 'use-cases',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'BarChart',
    repositories: [
      { name: 'puris', url: 'https://github.com/eclipse-tractusx/puris' },
    ],
    contacts: [],
    committers: [
      { github: 'tom-rm-meyer-ISST', name: 'Tom Meyer' },
      { github: 'ReneSchroederLJ', name: 'René Schröder' },
      { github: 'mhellmeier', name: 'Malte Hellmeier' },
    ],
    agents: [],
    details: 'PURIS enables real-time supply chain visibility by providing predictive information about demand, capacity, and delivery status across the automotive supply chain.',
  },
  {
    id: 'trace-x',
    name: 'Trace-X',
    description: 'Traceability application for tracking and tracing parts and materials across the supply chain.',
    category: 'use-cases',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'ManageSearch',
    repositories: [
      { name: 'traceability-foss', url: 'https://github.com/eclipse-tractusx/traceability-foss' },
    ],
    contacts: [],
    committers: [
      { github: 'ds-jhartmann', name: 'Jaro Hartmann' },
    ],
    agents: [],
    details: 'Trace-X is a FOSS traceability application that enables companies to track and trace parts and materials across the automotive supply chain, supporting quality investigations and recall management.',
  },
  {
    id: 'knowledge-agents',
    name: 'Knowledge Agents',
    description: 'Federated query and reasoning capabilities across distributed data sources in the dataspace.',
    category: 'use-cases',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'Psychology',
    repositories: [
      { name: 'knowledge-agents', url: 'https://github.com/eclipse-tractusx/knowledge-agents' },
      { name: 'knowledge-agents-edc', url: 'https://github.com/eclipse-tractusx/knowledge-agents-edc' },
      { name: 'knowledge-agents-aas-bridge', url: 'https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge' },
    ],
    contacts: [],
    committers: [],
    agents: [],
    details: 'Knowledge Agents enable federated queries and reasoning across distributed data sources within the Catena-X dataspace, supporting complex analytics and decision-making scenarios.',
  },

  // ─── DATASPACE FOUNDATION ────────────────────────────────────
  {
    id: 'tractus-x-edc',
    name: 'Tractus-X EDC',
    description: 'Eclipse Dataspace Connector — the core component for secure and sovereign data exchange in the dataspace.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Cable',
    repositories: [
      { name: 'tractusx-edc', url: 'https://github.com/eclipse-tractusx/tractusx-edc' },
      { name: 'tractusx-edc-dashboard', url: 'https://github.com/eclipse-tractusx/tractusx-edc-dashboard' },
      { name: 'tractusx-edc-kafka-extension', url: 'https://github.com/eclipse-tractusx/tractusx-edc-kafka-extension' },
      { name: 'tractusx-virtual-connector', url: 'https://github.com/eclipse-tractusx/tractusx-virtual-connector' },
    ],
    contacts: [],
    committers: [
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
      { github: 'AndrYurk', name: 'Andrii Yurkevych' },
      { github: 'bmg13' },
      { github: 'ndr-brt', name: 'Andrea Bertagnolli' },
      { github: 'rafaelmag110', name: 'Rafael Magalhães' },
      { github: 'Phil91', name: 'Phil Schneider' },
    ],
    agents: [],
    details: 'The Tractus-X EDC is the Eclipse Dataspace Connector adapted for Catena-X. It provides secure, sovereign data exchange capabilities following IDS and Gaia-X principles.',
  },
  {
    id: 'identity-hub-issuer-service',
    name: 'Identity Hub Issuer Service',
    description: 'Service for issuing verifiable credentials within the decentralized identity framework.',
    category: 'dataspace-foundation',
    relevance: ['development-testing'],
    status: 'active',
    icon: 'VerifiedUser',
    repositories: [
      { name: 'tractusx-identityhub', url: 'https://github.com/eclipse-tractusx/tractusx-identityhub' },
    ],
    contacts: [],
    committers: [
      { github: 'AYaoZhan' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
    ],
    agents: [],
    details: 'The Identity Hub Issuer Service handles the issuance of verifiable credentials, enabling decentralized identity management across the dataspace.',
  },
  {
    id: 'identity-hub-holder-wallet',
    name: 'Identity Hub Holder Wallet',
    description: 'Wallet component for holding and presenting verifiable credentials in the identity framework.',
    category: 'dataspace-foundation',
    relevance: ['development-testing'],
    status: 'tbd',
    icon: 'AccountBalanceWallet',
    repositories: [
      { name: 'tractusx-identityhub', url: 'https://github.com/eclipse-tractusx/tractusx-identityhub' },
    ],
    contacts: [],
    committers: [
      { github: 'AYaoZhan' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
    ],
    agents: [],
    details: 'The Identity Hub Holder Wallet enables participants to securely store and present their verifiable credentials when interacting within the dataspace.',
  },
  {
    id: 'sd-factory',
    name: 'SD-Factory',
    description: 'Self-Description Factory for creating and managing Gaia-X compliant self-descriptions.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Factory',
    repositories: [
      { name: 'sd-factory', url: 'https://github.com/eclipse-tractusx/sd-factory' },
    ],
    contacts: [],
    committers: [
      { github: 'typecastcloud', name: 'Karsten Thiems' },
    ],
    agents: [],
    details: 'The SD-Factory creates and manages Gaia-X compliant self-descriptions for dataspace participants, enabling trust and transparency.',
  },
  {
    id: 'dtr',
    name: 'DTR',
    description: 'Digital Twin Registry — central registry for managing and discovering digital twins.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Assignment',
    repositories: [
      { name: 'sldt-digital-twin-registry', url: 'https://github.com/eclipse-tractusx/sldt-digital-twin-registry' },
    ],
    contacts: [],
    committers: [
      { github: 'agg3fe', name: 'Sahil Aggarwal' },
      { github: 'tom-rm-meyer-ISST', name: 'Tom Meyer' },
      { github: 'AndrYurk', name: 'Andrii Yurkevych' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
    ],
    agents: [],
    details: 'The Digital Twin Registry (DTR) provides a central registry for managing and discovering digital twins within the dataspace ecosystem.',
  },
  {
    id: 'portal',
    name: 'Portal',
    description: 'Central portal for onboarding and managing dataspace participants.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'phase-out',
    icon: 'Language',
    repositories: [
      { name: 'portal', url: 'https://github.com/eclipse-tractusx/portal' },
      { name: 'portal-frontend', url: 'https://github.com/eclipse-tractusx/portal-frontend' },
      { name: 'portal-frontend-registration', url: 'https://github.com/eclipse-tractusx/portal-frontend-registration' },
      { name: 'portal-backend', url: 'https://github.com/eclipse-tractusx/portal-backend' },
      { name: 'portal-iam', url: 'https://github.com/eclipse-tractusx/portal-iam' },
      { name: 'portal-shared-components', url: 'https://github.com/eclipse-tractusx/portal-shared-components' },
      { name: 'portal-assets', url: 'https://github.com/eclipse-tractusx/portal-assets' },
    ],
    contacts: [],
    committers: [
      { github: 'Phil91', name: 'Phil Schneider' },
      { github: 'manojava-gk', name: 'Manojava Koushik' },
      { github: 'ntruchsess', name: 'Norbert Truchsess' },
      { github: 'typecastcloud', name: 'Karsten Thiems' },
      { github: 'dhiren-singh-007', name: 'Dhiren Singh' },
      { github: 'saadanzari', name: 'Saad Bin Rafiq' },
    ],
    agents: [],
    details: 'The Portal provides onboarding, registration, and management capabilities for Catena-X dataspace participants.',
  },
  {
    id: 'bpdm',
    name: 'BPDM',
    description: 'Business Partner Data Management — golden record process for business partner data.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Business',
    repositories: [
      { name: 'bpdm', url: 'https://github.com/eclipse-tractusx/bpdm' },
    ],
    contacts: [],
    committers: [
      { github: 'nicoprow', name: 'Nico Koprowski' },
      { github: 'SujitMBRDI', name: 'Karne Sujit' },
    ],
    agents: [],
    details: 'BPDM provides the golden record process for cleansing, deduplicating, and enriching business partner data across the Catena-X ecosystem.',
  },
  {
    id: 'bdrs',
    name: 'BDRS',
    description: 'BPN Discovery Resolution Service for resolving business partner numbers to EDC endpoints.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'TravelExplore',
    repositories: [
      { name: 'bpn-did-resolution-service', url: 'https://github.com/eclipse-tractusx/bpn-did-resolution-service' },
    ],
    contacts: [],
    committers: [
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
      { github: 'AndrYurk', name: 'Andrii Yurkevych' },
      { github: 'bmg13' },
      { github: 'nitin-vavdiya', name: 'Nitin Vavdiya' },
      { github: 'ndr-brt', name: 'Andrea Bertagnolli' },
      { github: 'rafaelmag110', name: 'Rafael Magalhães' },
    ],
    agents: [],
    details: 'The BPN Discovery Resolution Service resolves Business Partner Numbers (BPN) to their corresponding EDC endpoints in the dataspace.',
  },
  {
    id: 'bpn-discovery',
    name: 'BPN Discovery',
    description: 'Service for discovering business partner numbers associated with specific identifiers.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'tbd',
    icon: 'Explore',
    repositories: [
      { name: 'sldt-bpn-discovery', url: 'https://github.com/eclipse-tractusx/sldt-bpn-discovery' },
    ],
    contacts: [],
    committers: [
      { github: 'agg3fe', name: 'Sahil Aggarwal' },
    ],
    agents: [],
    details: 'BPN Discovery allows discovering Business Partner Numbers associated with specific identifiers like serial numbers or batch IDs.',
  },
  {
    id: 'discovery-finder',
    name: 'Discovery Finder',
    description: 'Meta-discovery service for locating the appropriate discovery service endpoints.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    status: 'tbd',
    icon: 'Map',
    repositories: [
      { name: 'sldt-discovery-finder', url: 'https://github.com/eclipse-tractusx/sldt-discovery-finder' },
    ],
    contacts: [],
    committers: [
      { github: 'agg3fe', name: 'Sahil Aggarwal' },
    ],
    agents: [],
    details: 'The Discovery Finder is a meta-discovery service that helps locate the correct discovery service endpoint for a given type of identifier.',
  },
  {
    id: 'aas-suite',
    name: 'AAS Suite',
    description: 'Asset Administration Shell suite providing standardized digital representation of assets.',
    category: 'dataspace-foundation',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'ViewInAr',
    repositories: [
      { name: 'aas-suite', url: 'https://github.com/eclipse-tractusx/aas-suite' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
    ],
    agents: [],
    details: 'The AAS Suite provides a standardized digital representation of assets following the Asset Administration Shell specification from the Industrial Digital Twin Association (IDTA).',
  },

  // ─── INDUSTRY CORE FOUNDATION ────────────────────────────────
  {
    id: 'industry-core-hub-backend',
    name: 'Industry Core Hub Backend',
    description: 'Backend service for industry core hub functionalities and data processing.',
    category: 'industry-core-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Settings',
    repositories: [
      { name: 'industry-core-hub', url: 'https://github.com/eclipse-tractusx/industry-core-hub' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The Industry Core Hub Backend provides the server-side logic and data processing for the Industry Core Hub, supporting Digital Product Passports and other industry core use cases.',
  },
  {
    id: 'simple-data-exchanger',
    name: 'Simple Data Exchanger',
    description: 'Simplified data exchange component for easy onboarding to the dataspace.',
    category: 'industry-core-foundation',
    relevance: ['catena-x-demo'],
    status: 'active',
    icon: 'SyncAlt',
    repositories: [
      { name: 'managed-simple-data-exchanger-backend', url: 'https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend' },
      { name: 'managed-simple-data-exchanger-frontend', url: 'https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend' },
    ],
    contacts: [],
    committers: [
      { github: 'saudkhan116', name: 'Saud Khan' },
    ],
    agents: [],
    details: 'The Simple Data Exchanger provides a simplified way for companies to participate in data exchange within the Catena-X ecosystem, lowering the barrier to entry.',
  },
  {
    id: 'item-relationship-service',
    name: 'Item Relationship Service',
    description: 'Service for managing and traversing item relationships and bill-of-material structures.',
    category: 'industry-core-foundation',
    relevance: ['dataspace-participants'],
    status: 'active',
    icon: 'AccountTree',
    repositories: [
      { name: 'item-relationship-service', url: 'https://github.com/eclipse-tractusx/item-relationship-service' },
    ],
    contacts: [],
    committers: [
      { github: 'ds-jhartmann', name: 'Jaro Hartmann' },
      { github: 'tom-rm-meyer-ISST', name: 'Tom Meyer' },
    ],
    agents: [],
    details: 'The Item Relationship Service (IRS) manages and traverses item relationships across the supply chain, enabling bill-of-material (BoM) traversal and data chain capabilities.',
  },
  {
    id: 'semantic-hub',
    name: 'Semantic Hub',
    description: 'Central repository for semantic models and aspect model definitions.',
    category: 'industry-core-foundation',
    relevance: ['catena-x-operative'],
    status: 'active',
    icon: 'Schema',
    repositories: [
      { name: 'sldt-semantic-hub', url: 'https://github.com/eclipse-tractusx/sldt-semantic-hub' },
    ],
    contacts: [],
    committers: [
      { github: 'agg3fe', name: 'Sahil Aggarwal' },
    ],
    agents: [],
    details: 'The Semantic Hub provides a central repository for semantic models and SAMM aspect model definitions used across the Catena-X dataspace.',
  },

  // ─── QA / TESTING & TOOLS ────────────────────────────────────
  {
    id: 'umbrella',
    name: 'Umbrella',
    description: 'Umbrella Helm chart for deploying a complete Catena-X environment for development and testing.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    status: 'active',
    icon: 'CloudQueue',
    repositories: [
      { name: 'tractus-x-umbrella', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella' },
    ],
    contacts: [],
    committers: [
      { github: 'ds-jhartmann', name: 'Jaro Hartmann' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
      { github: 'saudkhan116', name: 'Saud Khan' },
    ],
    agents: [
      {
        id: 'umbrella-guardian',
        name: 'Umbrella Guardian',
        description: 'Veteran guide and reviewer for the tractus-x-umbrella Helm chart. Helps installing and debugging the umbrella on Minikube/KinD, choosing values-adopter profiles and changing charts and bundles.',
        repository: 'tractus-x-umbrella',
        url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/.github/agents/umbrella-guardian.agent.md',
      },
    ],
    details: 'The Umbrella chart provides a one-click deployment of a complete Catena-X environment, enabling developers and testers to run end-to-end scenarios locally or in CI/CD pipelines.',
  },
  {
    id: 'dim-wallet-stub',
    name: 'DIM Wallet Stub',
    description: 'Stub implementation of the DIM wallet for testing and development purposes.',
    category: 'qa-testing-tools',
    relevance: ['catena-x-demo'],
    status: 'active',
    icon: 'Science',
    repositories: [
      { name: 'ssi-dim-wallet-stub', url: 'https://github.com/eclipse-tractusx/ssi-dim-wallet-stub' },
    ],
    contacts: [],
    committers: [
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'nitin-vavdiya', name: 'Nitin Vavdiya' },
      { github: 'AYaoZhan' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The DIM Wallet Stub provides a mock implementation of the Decentralized Identity Management wallet, enabling testing without requiring the full wallet infrastructure.',
  },
  {
    id: 'tractusx-sdk',
    name: 'Tractus-X SDK',
    description: 'Software development kit for building Tractus-X compatible applications and services.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    status: 'active',
    icon: 'Construction',
    repositories: [
      { name: 'tractusx-sdk', url: 'https://github.com/eclipse-tractusx/tractusx-sdk' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The Tractus-X SDK provides libraries, utilities, and tools for developers building applications and services compatible with the Tractus-X ecosystem.',
  },
  {
    id: 'tractusx-testlab',
    name: 'Tractus-X Testlab',
    description: 'Testing laboratory and infrastructure for validating Tractus-X components and integrations.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    status: 'active',
    icon: 'Biotech',
    repositories: [
      { name: 'tractusx-testlab', url: 'https://github.com/eclipse-tractusx/tractusx-testlab' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'AYaoZhan' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
    ],
    agents: [
      {
        id: 'testlab-ai-master',
        name: 'Testlab AI Master',
        description: 'Chief AI agent and orchestrator of tractusx-testlab. Receives feature requirements and delegates the work to the domain specialist agents.',
        repository: 'tractusx-testlab',
        url: 'https://github.com/eclipse-tractusx/tractusx-testlab/blob/main/.github/agents/testlab-ai-master.agent.md',
      },
      {
        id: 'testlab-architect',
        name: 'Testlab Architect',
        description: 'Software architect and project manager. Plans features, breaks down epics into work packages, analyzes architecture impacts and identifies risks.',
        repository: 'tractusx-testlab',
        url: 'https://github.com/eclipse-tractusx/tractusx-testlab/blob/main/.github/agents/testlab-architect.agent.md',
      },
      {
        id: 'testlab-master',
        name: 'Testlab Master',
        description: 'Senior Python backend architect for tractusx-testlab and tractusx-sdk expert, writing simple, readable and maintainable code.',
        repository: 'tractusx-testlab',
        url: 'https://github.com/eclipse-tractusx/tractusx-testlab/blob/main/.github/agents/testlab-master.agent.md',
      },
      {
        id: 'testlab-test-master',
        name: 'Testlab Test Master',
        description: 'Senior test engineer and quality assurance architect. Writes unit and integration tests, fixtures and improves test coverage.',
        repository: 'tractusx-testlab',
        url: 'https://github.com/eclipse-tractusx/tractusx-testlab/blob/main/.github/agents/testlab-test-master.agent.md',
      },
      {
        id: 'testlab-docs-master',
        name: 'Testlab Docs Master',
        description: 'Senior technical writer and documentation architect. Writes mkdocs pages, tutorials, developer guides and API reference documentation.',
        repository: 'tractusx-testlab',
        url: 'https://github.com/eclipse-tractusx/tractusx-testlab/blob/main/.github/agents/testlab-docs-master.agent.md',
      },
    ],
    details: 'The Tractus-X Testlab provides a controlled environment for validating component integrations, running conformance tests, and ensuring interoperability.',
  },
  {
    id: 'umbrella-iac',
    name: 'Umbrella Infrastructure as Code',
    description: 'Infrastructure as Code definitions for deploying and managing Umbrella environments.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    status: 'active',
    icon: 'Engineering',
    repositories: [
      { name: 'tractus-x-umbrella-iac', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella-iac' },
    ],
    contacts: [],
    committers: [],
    agents: [],
    details: 'Umbrella Infrastructure as Code provides Terraform/Pulumi definitions for provisioning cloud infrastructure needed for Tractus-X Umbrella deployments.',
  },
  {
    id: 'tractusx-sdk-services',
    name: 'Tractus-X SDK Services',
    description: 'Shared services and middleware components for the Tractus-X SDK ecosystem.',
    category: 'qa-testing-tools',
    relevance: ['catena-x-demo'],
    status: 'phase-out',
    icon: 'Build',
    repositories: [
      { name: 'tractusx-sdk-services', url: 'https://github.com/eclipse-tractusx/tractusx-sdk-services' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
    ],
    agents: [],
    details: 'Tractus-X SDK Services provides shared middleware and service components that support the Tractus-X SDK development framework.',
  },
  {
    id: 'tractusx-website',
    name: 'Eclipse Tractus-X Website',
    description: 'Official Eclipse Tractus-X website hosting the KITs, the Tractus-X Release Guidelines (TRGs) and the community documentation.',
    category: 'qa-testing-tools',
    relevance: ['development-testing', 'dataspace-participants'],
    status: 'active',
    icon: 'Language',
    repositories: [
      { name: 'eclipse-tractusx.github.io', url: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Moser' },
      { github: 'sb3nz' },
      { github: 'seb-l0' },
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
    ],
    agents: [
      {
        id: 'kit-master-builder',
        name: 'KIT Master Builder',
        description: 'Expert Eclipse Tractus-X KIT architect that helps you create, review, and maintain KITs following the Tractus-X Release Guidelines (TRGs).',
        repository: 'eclipse-tractusx.github.io',
        url: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/.github/agents/kit-master-builder.agent.md',
      },
    ],
    details: 'The Eclipse Tractus-X website is the central entry point to the project. It publishes the KITs, the Tractus-X Release Guidelines (TRGs), tutorials and community information.',
  },
];

/**
 * Get all products
 */
function getAllProducts() {
  return products;
}

/**
 * Get products by category
 */
function getProductsByCategory(categoryId) {
  return products.filter(p => p.category === categoryId);
}

/**
 * Get a single product by ID
 */
function getProductById(productId) {
  return products.find(p => p.id === productId);
}

/**
 * Get product categories
 */
function getProductCategories() {
  return productCategories;
}

/**
 * Get relevance types
 */
function getRelevanceTypes() {
  return relevanceTypes;
}

module.exports = {
  products,
  productCategories,
  relevanceTypes,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getProductCategories,
  getRelevanceTypes,
};
