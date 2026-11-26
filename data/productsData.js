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
 *   kind: 'operating-service' | 'participant-component' | 'application' | 'library' | 'tooling' | 'demonstrator' | 'documentation'
 *         or a list of them, the first one first (what the product is; see productKinds),
 *   maturity: 'mature' | 'growing' | 'incubating' | 'phase-out' | 'deprecated' (see maturityLevels),
 *   repositories: { name: string, url: string }[],
 *   contacts: { name: string, role: string, github: string }[],
 *   committers: { github: string, name?: string }[] (Eclipse Tractus-X committers behind the repositories;
 *           only people on https://projects.eclipse.org/projects/automotive.tractusx/who, with the name written there),
 *   agents: { id: string, name: string, description: string, repository: string, url: string, avatar?: string }[]
 *           (AI agents defined in the repositories under .github/agents),
 *   details: string (longer description / overview),
 *
 *   Optional, shown only when present:
 *   logo: string (path under /static or URL; square works best, shown on the card and the detail page),
 *   deprecation: { ticket: string, reason: string, alternative?: string } (when maturity is 'deprecated'),
 *   documentation: string (URL of the product documentation),
 *   screenshots: { src: string, alt: string, caption?: string }[],
 *   videos: { title: string, youtube?: string (video id), src?: string (mp4 URL) }[],
 *   downloads: { type: 'helm' | 'container' | 'package' | 'binary', label: string, url: string, command?: string }[],
 *   security: { notes: string[] } (known limitations and hardening advice; the policy,
 *           advisories and reporting links are always shown),
 * }
 *
 * Single repositories that are deprecated while the product lives on are listed in
 * deprecatedRepositories; the repository tree on the detail page flags them.
 *
 * Releases are read live from GitHub on the detail page. The repository tree comes from
 * data/tractusxRepoTree.json (npm run generate:repo-tree).
 */

// Category pages (/Products/<route>): `tagline`, `intro`, `offers` and `audiences`
// fill the header and the "What we offer" / "Who it is for" sections.
const productCategories = [
  {
    id: 'use-cases',
    route: '/Products/use-cases',
    name: 'Use Cases',
    description: 'End-user applications and frontends that implement specific business use cases across the Eclipse Tractus-X ecosystem.',
    tagline: 'Applications that put the dataspace to work.',
    intro: 'Use case applications run a concrete business process across company borders: traceability, demand and capacity management, digital product passports and federated queries. They build on the Dataspace and Industry Core foundations and show the whole flow end to end.',
    offers: [
      { title: 'Reference applications', text: 'Working applications for traceability, supply chain visibility and product passports.' },
      { title: 'Business user interfaces', text: 'Frontends that keep the dataspace plumbing out of the way of business users.' },
      { title: 'A starting point', text: 'Open code to adopt, extend or use as a blueprint for your own application.' },
      { title: 'Aligned with the KITs', text: 'Each application implements the matching KIT and Catena-X standards.' },
    ],
    audiences: [
      { id: 'business', title: 'Business and process owners', text: 'See a use case running with real data flows before you buy or build.' },
      { id: 'providers', title: 'Solution providers', text: 'Start from a working reference instead of from scratch.' },
      { id: 'developers', title: 'Developers', text: 'Learn how the foundation components fit together in a real application.' },
    ],
  },
  {
    id: 'dataspace-foundation',
    route: '/Products/dataspace-foundation',
    name: 'Dataspace Foundation',
    description: 'Core infrastructure components that enable the creation and operation of secure, interoperable dataspaces.',
    tagline: 'The core services every participant relies on.',
    intro: 'The Dataspace Foundation makes sovereign data exchange possible: the connector, decentralized identities and credentials, discovery, registries and onboarding. Every other product builds on these components.',
    offers: [
      { title: 'Sovereign data exchange', text: 'The Eclipse Tractus-X EDC connector exchanges data under the policies you define.' },
      { title: 'Decentralized identity', text: 'Wallets, credential issuance and DID resolution for trusted participants.' },
      { title: 'Discovery and registries', text: 'Find partners, endpoints and digital twins across the dataspace.' },
      { title: 'Onboarding and partner data', text: 'Portal and business partner data management for participants.' },
    ],
    audiences: [
      { id: 'operators', title: 'Dataspace operators', text: 'Run the core and shared services of a dataspace.' },
      { id: 'participants', title: 'Participants', text: 'Connect your company and exchange data under your own policies.' },
      { id: 'developers', title: 'Developers', text: 'Build on and extend the connector and identity components.' },
    ],
  },
  {
    id: 'industry-core-foundation',
    route: '/Products/industry-core',
    name: 'Industry Core Foundation',
    description: 'Components that provide industry-specific data exchange, semantic modeling, and relationship tracking capabilities.',
    tagline: 'Shared building blocks for industrial data chains.',
    intro: 'The Industry Core gives the dataspace a common language for parts, products and their relationships: digital twins, semantic models and data chains across supplier tiers. Use cases reuse these blocks instead of reinventing them.',
    offers: [
      { title: 'Digital twins made simple', text: 'The Industry Core Hub provides and consumes twins of parts and products.' },
      { title: 'Semantic models', text: 'The Semantic Hub publishes and looks up the aspect models in use.' },
      { title: 'Data chains across tiers', text: 'The Item Relationship Service follows part relationships through the supply chain.' },
      { title: 'Low-effort data provision', text: 'The Simple Data Exchanger uploads data without your own integration.' },
    ],
    audiences: [
      { id: 'providers', title: 'Data providers', text: 'Publish twins and submodels in the standard format.' },
      { id: 'builders', title: 'Use case builders', text: 'Reuse the industry core instead of building your own data chain.' },
      { id: 'suppliers', title: 'Suppliers of any size', text: 'Join with simple tools that need little IT effort.' },
    ],
  },
  {
    id: 'qa-testing-tools',
    route: '/Products/qa-testing',
    name: 'QA / Testing & Tools',
    description: 'Development, testing, and quality assurance tools that support the Eclipse Tractus-X development lifecycle.',
    tagline: 'Everything you need to build, test and run Eclipse Tractus-X.',
    intro: 'Tools for the whole lifecycle: a complete local dataspace in one Helm chart, SDKs, a test lab and stubs, infrastructure as code, and this website with the KITs and release guidelines.',
    offers: [
      { title: 'A dataspace on your laptop', text: 'The Umbrella Helm chart deploys all components for development and tests.' },
      { title: 'SDKs', text: 'Libraries and services that cut the effort of building dataspace applications.' },
      { title: 'Test lab and stubs', text: 'Test integrations without production systems.' },
      { title: 'Infrastructure and docs', text: 'Infrastructure as code, and the website with the KITs and TRGs.' },
    ],
    audiences: [
      { id: 'developers', title: 'Developers', text: 'Get a working environment in minutes and build faster with the SDKs.' },
      { id: 'testers', title: 'Testers and QA', text: 'Validate components and integrations before they go live.' },
      { id: 'devops', title: 'DevOps teams', text: 'Deploy and operate environments as code.' },
    ],
  },
];

// Colours come from the Eclipse Tractus-X palette (orange, green, tints); the label always names the type.
const relevanceTypes = [
  { id: 'catena-x-operative', label: 'Relevant for Catena-X Operative', color: '#FAA023' },
  { id: 'development-testing', label: 'Relevant for Catena-X Development / Testing', color: '#AFC72D' },
  { id: 'catena-x-demo', label: 'Relevant for Catena-X Demo', color: '#FCC477' },
  { id: 'dataspace-participants', label: 'Relevant for Catena-X Dataspace Participants', color: '#626262' },
  { id: 'manufacturing-x', label: 'Relevant for Manufacturing-X', color: '#C37304' },
];

// What a product is. Inside each category the products are grouped by kind, so it is clear
// who runs it, where it belongs and what quality to expect.
const productKinds = [
  {
    id: 'operating-service',
    label: 'Operating service',
    plural: 'Operating services',
    description: 'Core and enablement services that an operator runs once for the whole dataspace.',
  },
  {
    id: 'participant-component',
    label: 'Participant component',
    plural: 'Participant components',
    description: 'Software that every company runs itself to take part in the dataspace.',
  },
  {
    id: 'application',
    label: 'Application',
    plural: 'Applications',
    description: 'Ready business applications with a user interface for a use case.',
  },
  {
    id: 'library',
    label: 'Library / framework',
    plural: 'Libraries and frameworks',
    description: 'Code to build your own applications and services with.',
  },
  {
    id: 'tooling',
    label: 'Deployment & test tool',
    plural: 'Deployment and test tools',
    description: 'Tools to deploy, run and test an Eclipse Tractus-X environment.',
  },
  {
    id: 'demonstrator',
    label: 'Demonstrator / stub',
    plural: 'Demonstrators and stubs',
    description: 'Shows or simulates a function for development and tests. Not for production.',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    plural: 'Documentation',
    description: 'Guides, KITs and release guidelines.',
  },
];

// Maturity of a product. One level per product, shown on the cards (when not mature), the
// filter of the product list and the detail page.
const maturityLevels = [
  {
    id: 'mature',
    label: 'Mature',
    description: 'Part of the Eclipse Tractus-X release, runs in productive dataspaces and has an active team of maintainers.',
  },
  {
    id: 'growing',
    label: 'Growing',
    description: 'Released and maintained. Features and adoption are still growing, so expect changes between releases.',
  },
  {
    id: 'incubating',
    label: 'Incubating',
    description: 'Early stage. Try it and give feedback; interfaces can change and it is not meant for production yet.',
  },
  {
    id: 'phase-out',
    label: 'Phase-out',
    description: 'Still available, but being replaced or reduced. Plan the move to its successor.',
  },
  {
    id: 'deprecated',
    label: 'Deprecated',
    description: 'Not maintained and proposed for archiving under TRG 7.09. No more security fixes; existing Helm charts and container images stay available.',
  },
];

// The 18 repositories proposed for deprecation under TRG 7.09 (announced on tractusx-dev on
// 25 November 2026, overview in sig-infra#611). Archived repositories stay readable and can be
// reactivated when a team commits to maintain them.
const DEPRECATION_NOTICE = {
  title: '18 repositories proposed for deprecation',
  text: 'They are not maintained and have open critical or high security alerts. Archived repositories stay readable, and existing Helm charts and container images stay available, but they get no more security fixes. If you depend on one and can maintain it, comment on its ticket.',
  trg: '/docs/release/trg-7/trg-7-09',
  url: 'https://github.com/eclipse-tractusx/sig-infra/issues/611',
};
const ticket = (number) => `https://github.com/eclipse-tractusx/sig-infra/issues/${number}`;
const deprecatedRepositories = {
  'sldt-semantic-hub': { ticket: ticket(584), reason: 'Not maintained since February 2025, last in release 25.03; open critical and high security alerts.' },
  'sldt-discovery-finder': { ticket: ticket(606), reason: 'Not part of release 26.09, last GitHub release February 2025; open critical and high security alerts.' },
  'portal-frontend-registration': { ticket: ticket(604), reason: 'Not part of release 26.09, last code change August 2025; open critical and high security alerts.' },
  'portal-assets': { ticket: ticket(603), reason: 'Not part of release 26.09, last code change September 2025; open critical and high security alerts.' },
  'knowledge-agents': { ticket: ticket(589), reason: 'Not maintained since December 2024, last in release 25.03; open critical and high security alerts.' },
  'knowledge-agents-edc': { ticket: ticket(590), reason: 'Not maintained since December 2024, last in release 24.08; open high security alerts.' },
  'knowledge-agents-aas-bridge': { ticket: ticket(591), reason: 'Not maintained since December 2024, last in release 24.08; open high security alerts.' },
  'sd-factory': { ticket: ticket(605), reason: 'Not part of release 26.09, last code change November 2025; open critical and high security alerts.' },
  'ssi-credential-issuer': { ticket: ticket(607), reason: 'Not part of release 26.09; open critical and high security alerts.', alternative: 'identity-hub-issuer-service' },
  'traceability-foss': { ticket: ticket(609), reason: 'Not part of release 26.09, last code change June 2025; open critical and high security alerts.' },
  'managed-simple-data-exchanger-backend': { ticket: ticket(587), reason: 'Not in any Eclipse Tractus-X release since 24.12, no activity since its v3.0.0 contribution release; open critical and high security alerts.' },
  'managed-simple-data-exchanger-frontend': { ticket: ticket(588), reason: 'Not in any Eclipse Tractus-X release since 24.12, no activity since its v3.0.0 contribution release; open critical and high security alerts.' },
  'managed-service-orchestrator': { ticket: ticket(586), reason: 'Not maintained since v1.5.7 (July 2024), last in release 24.08; open critical and high security alerts.' },
  'testdata-provider': { ticket: ticket(592), reason: 'Never released, no changes since September 2024 apart from CI; open critical and high security alerts.' },
  'data-exchange-test-service': { ticket: ticket(602), reason: 'Not part of release 26.09, last release July 2024; open critical and high security alerts.', alternative: 'tractusx-testlab' },
  'tractusx-sdk-services': { ticket: ticket(608), reason: 'Not part of release 26.09, last release v0.2.0 (February 2026); open critical and high security alerts.' },
  'tractusx-virtual-connector': { ticket: ticket(610), reason: 'Not part of release 26.09; the repository holds no code yet.' },
  'aas-suite': { ticket: ticket(593), reason: 'Never released and not implemented, no changes since August 2025 apart from CI; open critical and high security alerts.' },
};
const deprecation = (repository) => deprecatedRepositories[repository];

// Adopter profiles: the overview page lets visitors pick one to see what Eclipse Tractus-X gives
// them. `products` are product ids from the list below; `proof` is optional.
const adopterProfiles = [
  {
    id: 'students',
    name: 'Students & enthusiasts',
    need: 'Understand dataspaces before building one.',
    give: 'The KITs, an Umbrella sandbox and the Testlab.',
    proof: 'KITs reused by four other initiatives.',
    products: ['umbrella', 'tractusx-testlab', 'tractusx-website'],
  },
  {
    id: 'research',
    name: 'Research institutes',
    need: 'Experiment with and validate new dataspace concepts.',
    give: 'Open reference implementations, a local dataspace and the SDK to prototype on.',
    products: ['umbrella', 'tractus-x-edc', 'identity-hub-holder-wallet', 'tractusx-sdk', 'knowledge-agents', 'tractusx-testlab'],
  },
  {
    id: 'users',
    name: 'Dataspace users',
    need: 'Business results from shared data.',
    give: 'Ready use case applications: PURIS, the Industry Core Hub and IRS.',
    proof: 'Mature applications in productive use.',
    products: ['puris', 'industry-core-hub', 'item-relationship-service'],
  },
  {
    id: 'providers',
    name: 'Service providers',
    need: 'Build products without rebuilding the base.',
    give: 'The open reference core: Eclipse Tractus-X EDC, IdentityHub, DTR, Industry Core Hub and the SDK.',
    proof: 'Individual features already used by companies.',
    products: ['tractus-x-edc', 'identity-hub-holder-wallet', 'identity-hub-issuer-service', 'dtr', 'industry-core-hub', 'tractusx-sdk'],
  },
  {
    id: 'initiatives',
    name: 'Dataspace initiatives',
    need: 'Launch a new dataspace quickly.',
    give: 'A domain-neutral core plus a blueprint for the operating services.',
    proof: 'Seven initiatives reuse Eclipse Tractus-X components.',
    products: ['tractus-x-edc', 'identity-hub-issuer-service', 'identity-hub-holder-wallet', 'bdrs', 'portal', 'umbrella', 'umbrella-iac'],
  },
];

// Download helpers. Chart names are the ones published in the Eclipse Tractus-X Helm repository
// (https://eclipse-tractusx.github.io/charts/dev), images the ones on Docker Hub (tractusx/...).
const HELM_REPO = 'https://eclipse-tractusx.github.io/charts/dev';
const helm = (chart) => ({
  type: 'helm',
  label: chart,
  url: 'https://github.com/eclipse-tractusx/charts',
  command: `helm repo add tractusx-dev ${HELM_REPO}\nhelm install ${chart} tractusx-dev/${chart}`,
});
const image = (name) => ({
  type: 'container',
  label: `tractusx/${name}`,
  url: `https://hub.docker.com/r/tractusx/${name}`,
  command: `docker pull tractusx/${name}`,
});

// AI agents defined in .github/agents/ of the product repositories. `profile` is the
// agent's page on the AI pages of this website (/ai/agents/<id>).
const agent = (id, name, role, repository, image = null) => ({
  id,
  name,
  role,
  repository,
  url: `https://github.com/eclipse-tractusx/${repository}/blob/main/.github/agents/${id}.agent.md`,
  image,
  profile: `/ai/agents/${id}`,
});
const AGENTS = {
  connectorSensei: agent('connector-sensei', 'Connector Sensei', 'Expert on the Eclipse Tractus-X EDC and the upstream Eclipse Dataspace Components', 'tractusx-edc', '/img/ai/agents/connector-sensei.webp'),
  identityKeeper: agent('identity-keeper', 'Identity Keeper', 'Expert on the Eclipse Tractus-X IdentityHub (DCP wallet) and IssuerService', 'tractusx-identityhub', '/img/ai/agents/identity-keeper.webp'),
  umbrellaGuardian: agent('umbrella-guardian', 'Umbrella Guardian', 'Guide and reviewer for the tractus-x-umbrella Helm chart', 'tractus-x-umbrella', '/img/ai/agents/umbrella-guardian.webp'),
  kitMasterBuilder: agent('kit-master-builder', 'KIT Master Builder', 'KIT architect and technical writer', 'eclipse-tractusx.github.io', '/img/ai/agents/kit-master-builder.webp'),
  testlabTeam: {
    ...agent('testlab', 'Testlab AI team', 'Five agents led by the Testlab AI Master: architect, backend, test and docs specialists', 'tractusx-testlab'),
    url: 'https://github.com/eclipse-tractusx/tractusx-testlab/tree/main/.github/agents',
  },
};

const products = [
  // ─── USE CASES ────────────────────────────────────────────────
  {
    id: 'puris',
    name: 'PURIS',
    description: 'Predictive Unit Real-Time Information System for supply chain visibility and short-term demand/capacity management.',
    category: 'use-cases',
    relevance: ['dataspace-participants'],
    kind: 'application',
    maturity: 'mature',
    logo: '/img/products/puris-mark.svg',
    repositories: [
      { name: 'puris', url: 'https://github.com/eclipse-tractusx/puris' },
    ],
    downloads: [helm('puris')],
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
    kind: 'application',
    maturity: 'deprecated',
    deprecation: deprecation('traceability-foss'),
    logo: '/img/products/trace-x-mark.svg',
    repositories: [
      { name: 'traceability-foss', url: 'https://github.com/eclipse-tractusx/traceability-foss' },
    ],
    downloads: [helm('traceability-foss')],
    screenshots: [
      { src: '/img/Trace-X/01.png', alt: 'Trace-X: the parts list of a manufacturer' },
      { src: '/img/Trace-X/02.png', alt: 'Trace-X application, screen 2' },
      { src: '/img/Trace-X/03.png', alt: 'Trace-X application, screen 3' },
      { src: '/img/Trace-X/04.png', alt: 'Trace-X application, screen 4' },
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
    kind: 'participant-component',
    maturity: 'deprecated',
    deprecation: deprecation('knowledge-agents'),
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
    name: 'Eclipse Tractus-X EDC',
    description: 'Eclipse Dataspace Connector — the core component for secure and sovereign data exchange in the dataspace.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    kind: 'participant-component',
    maturity: 'mature',
    repositories: [
      { name: 'tractusx-edc', url: 'https://github.com/eclipse-tractusx/tractusx-edc' },
      { name: 'tractusx-edc-dashboard', url: 'https://github.com/eclipse-tractusx/tractusx-edc-dashboard' },
      { name: 'tractusx-edc-kafka-extension', url: 'https://github.com/eclipse-tractusx/tractusx-edc-kafka-extension' },
      { name: 'tractusx-virtual-connector', url: 'https://github.com/eclipse-tractusx/tractusx-virtual-connector' },
    ],
    downloads: [helm('tractusx-connector'), image('edc-controlplane-postgresql-hashicorp-vault'), image('edc-dataplane-hashicorp-vault')],
    contacts: [],
    committers: [
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
      { github: 'AndrYurk', name: 'Andrii Yurkevych' },
      { github: 'bmg13', name: 'Gonçalo Monteiro' },
      { github: 'ndr-brt', name: 'Andrea Bertagnolli' },
      { github: 'rafaelmag110', name: 'Rafael Magalhães' },
      { github: 'Phil91', name: 'Phil Schneider' },
    ],
    agents: [AGENTS.connectorSensei],
    details: 'The Eclipse Tractus-X EDC is the Eclipse Dataspace Connector adapted for Catena-X. It provides secure, sovereign data exchange capabilities following IDS and Gaia-X principles.',
  },
  {
    id: 'identity-hub-issuer-service',
    name: 'Identity Hub Issuer Service',
    description: 'Service for issuing verifiable credentials within the decentralized identity framework.',
    category: 'dataspace-foundation',
    relevance: ['development-testing'],
    kind: 'operating-service',
    maturity: 'growing',
    repositories: [
      { name: 'tractusx-identityhub', url: 'https://github.com/eclipse-tractusx/tractusx-identityhub' },
    ],
    downloads: [helm('tractusx-issuerservice'), image('issuerservice')],
    contacts: [],
    committers: [
      { github: 'AYaoZhan', name: 'Angel Yao' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
    ],
    agents: [AGENTS.identityKeeper],
    details: 'The Identity Hub Issuer Service handles the issuance of verifiable credentials, enabling decentralized identity management across the dataspace.',
  },
  {
    id: 'identity-hub-holder-wallet',
    name: 'Identity Hub Holder Wallet',
    description: 'Wallet component for holding and presenting verifiable credentials in the identity framework.',
    category: 'dataspace-foundation',
    relevance: ['development-testing'],
    kind: 'participant-component',
    maturity: 'growing',
    repositories: [
      { name: 'tractusx-identityhub', url: 'https://github.com/eclipse-tractusx/tractusx-identityhub' },
    ],
    downloads: [helm('tractusx-identityhub'), image('identityhub')],
    contacts: [],
    committers: [
      { github: 'AYaoZhan', name: 'Angel Yao' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
    ],
    agents: [AGENTS.identityKeeper],
    details: 'The Identity Hub Holder Wallet enables participants to securely store and present their verifiable credentials when interacting within the dataspace.',
  },
  {
    id: 'sd-factory',
    name: 'SD-Factory',
    description: 'Self-Description Factory for creating and managing Gaia-X compliant self-descriptions.',
    category: 'dataspace-foundation',
    relevance: ['catena-x-operative'],
    kind: 'operating-service',
    maturity: 'deprecated',
    deprecation: deprecation('sd-factory'),
    repositories: [
      { name: 'sd-factory', url: 'https://github.com/eclipse-tractusx/sd-factory' },
    ],
    downloads: [helm('sdfactory')],
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
    kind: 'participant-component',
    maturity: 'mature',
    repositories: [
      { name: 'sldt-digital-twin-registry', url: 'https://github.com/eclipse-tractusx/sldt-digital-twin-registry' },
    ],
    downloads: [helm('digital-twin-registry')],
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
    kind: 'operating-service',
    maturity: 'phase-out',
    repositories: [
      { name: 'portal', url: 'https://github.com/eclipse-tractusx/portal' },
      { name: 'portal-frontend', url: 'https://github.com/eclipse-tractusx/portal-frontend' },
      { name: 'portal-frontend-registration', url: 'https://github.com/eclipse-tractusx/portal-frontend-registration' },
      { name: 'portal-backend', url: 'https://github.com/eclipse-tractusx/portal-backend' },
      { name: 'portal-iam', url: 'https://github.com/eclipse-tractusx/portal-iam' },
      { name: 'portal-shared-components', url: 'https://github.com/eclipse-tractusx/portal-shared-components' },
      { name: 'portal-assets', url: 'https://github.com/eclipse-tractusx/portal-assets' },
    ],
    downloads: [helm('portal')],
    contacts: [],
    committers: [
      { github: 'Phil91', name: 'Phil Schneider' },
      { github: 'manojava-gk', name: 'Manojava Koushik' },
      { github: 'ntruchsess', name: 'Norbert Truchsess' },
      { github: 'typecastcloud', name: 'Karsten Thiems' },
      { github: 'dhiren-singh-007', name: 'Dhirender Singh' },
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
    kind: 'operating-service',
    maturity: 'mature',
    repositories: [
      { name: 'bpdm', url: 'https://github.com/eclipse-tractusx/bpdm' },
    ],
    downloads: [helm('bpdm')],
    contacts: [],
    committers: [
      { github: 'nicoprow', name: 'Nico Koprowski' },
      { github: 'SujitMBRDI', name: 'Sujit Karne' },
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
    kind: 'operating-service',
    maturity: 'mature',
    repositories: [
      { name: 'bpn-did-resolution-service', url: 'https://github.com/eclipse-tractusx/bpn-did-resolution-service' },
    ],
    downloads: [helm('bdrs-server')],
    contacts: [],
    committers: [
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
      { github: 'AndrYurk', name: 'Andrii Yurkevych' },
      { github: 'bmg13', name: 'Gonçalo Monteiro' },
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
    kind: 'operating-service',
    maturity: 'mature',
    repositories: [
      { name: 'sldt-bpn-discovery', url: 'https://github.com/eclipse-tractusx/sldt-bpn-discovery' },
    ],
    downloads: [helm('bpndiscovery')],
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
    kind: 'operating-service',
    maturity: 'deprecated',
    deprecation: deprecation('sldt-discovery-finder'),
    repositories: [
      { name: 'sldt-discovery-finder', url: 'https://github.com/eclipse-tractusx/sldt-discovery-finder' },
    ],
    downloads: [helm('discoveryfinder')],
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
    kind: 'participant-component',
    maturity: 'deprecated',
    deprecation: deprecation('aas-suite'),
    repositories: [
      { name: 'aas-suite', url: 'https://github.com/eclipse-tractusx/aas-suite' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
    ],
    agents: [],
    details: 'The AAS Suite provides a standardized digital representation of assets following the Asset Administration Shell specification from the Industrial Digital Twin Association (IDTA).',
  },

  // ─── INDUSTRY CORE FOUNDATION ────────────────────────────────
  {
    id: 'industry-core-hub',
    name: 'Industry Core Hub',
    subtitle: 'Frontend and backend: DPP, CCM and more',
    description: 'Provide and consume digital twins of parts and products, with ready use cases such as the Digital Product Passport and Company Certificate Management.',
    category: 'industry-core-foundation',
    relevance: ['catena-x-operative', 'dataspace-participants'],
    kind: 'application',
    maturity: 'growing',
    logo: '/img/products/industry-core-hub.png',
    repositories: [
      { name: 'industry-core-hub', url: 'https://github.com/eclipse-tractusx/industry-core-hub' },
    ],
    downloads: [helm('industry-core-hub')],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The Industry Core Hub is one application with a frontend and a backend. The backend registers digital twins in the Digital Twin Registry, publishes their submodels through the Eclipse Tractus-X EDC and consumes the twins of partners. The frontend gives business users one place for the Industry Core use cases, including the Digital Product Passport (DPP) and Company Certificate Management (CCM).',
  },
  {
    id: 'simple-data-exchanger',
    name: 'Simple Data Exchanger',
    description: 'Simplified data exchange component for easy onboarding to the dataspace.',
    category: 'industry-core-foundation',
    relevance: ['catena-x-demo'],
    kind: 'application',
    maturity: 'deprecated',
    deprecation: deprecation('managed-simple-data-exchanger-backend'),
    repositories: [
      { name: 'managed-simple-data-exchanger-backend', url: 'https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend' },
      { name: 'managed-simple-data-exchanger-frontend', url: 'https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend' },
    ],
    downloads: [helm('sde')],
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
    kind: 'participant-component',
    maturity: 'mature',
    logo: '/img/products/irs.png',
    repositories: [
      { name: 'item-relationship-service', url: 'https://github.com/eclipse-tractusx/item-relationship-service' },
    ],
    downloads: [helm('item-relationship-service')],
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
    kind: 'operating-service',
    maturity: 'deprecated',
    deprecation: deprecation('sldt-semantic-hub'),
    repositories: [
      { name: 'sldt-semantic-hub', url: 'https://github.com/eclipse-tractusx/sldt-semantic-hub' },
    ],
    downloads: [helm('semantic-hub')],
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
    kind: 'tooling',
    maturity: 'mature',
    repositories: [
      { name: 'tractus-x-umbrella', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella' },
    ],
    downloads: [helm('umbrella')],
    contacts: [],
    committers: [
      { github: 'ds-jhartmann', name: 'Jaro Hartmann' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'stephanbcbauer', name: 'Stephan Bauer' },
      { github: 'saudkhan116', name: 'Saud Khan' },
    ],
    agents: [AGENTS.umbrellaGuardian],
    details: 'The Umbrella chart provides a one-click deployment of a complete Catena-X environment, enabling developers and testers to run end-to-end scenarios locally or in CI/CD pipelines.',
  },
  {
    id: 'dim-wallet-stub',
    name: 'DIM Wallet Stub',
    description: 'Stub implementation of the DIM wallet for testing and development purposes.',
    category: 'qa-testing-tools',
    relevance: ['catena-x-demo'],
    kind: 'demonstrator',
    maturity: 'mature',
    repositories: [
      { name: 'ssi-dim-wallet-stub', url: 'https://github.com/eclipse-tractusx/ssi-dim-wallet-stub' },
    ],
    downloads: [helm('ssi-dim-wallet-stub')],
    contacts: [],
    committers: [
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'nitin-vavdiya', name: 'Nitin Vavdiya' },
      { github: 'AYaoZhan', name: 'Angel Yao' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The DIM Wallet Stub provides a mock implementation of the Decentralized Identity Management wallet, enabling testing without requiring the full wallet infrastructure.',
  },
  {
    id: 'tractusx-sdk',
    name: 'Eclipse Tractus-X SDK',
    description: 'Software development kit for building Eclipse Tractus-X compatible applications and services.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    kind: 'library',
    maturity: 'growing',
    repositories: [
      { name: 'tractusx-sdk', url: 'https://github.com/eclipse-tractusx/tractusx-sdk' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
      { github: 'mgarciaLKS', name: 'Mikel Garcia' },
    ],
    agents: [],
    details: 'The Eclipse Tractus-X SDK provides libraries, utilities, and tools for developers building applications and services compatible with the Eclipse Tractus-X ecosystem.',
  },
  {
    id: 'tractusx-testlab',
    name: 'Eclipse Tractus-X Testlab',
    description: 'Testing laboratory and infrastructure for validating Eclipse Tractus-X components and integrations.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    kind: ['library', 'tooling'],
    maturity: 'incubating',
    logo: '/img/products/testlab.png',
    repositories: [
      { name: 'tractusx-testlab', url: 'https://github.com/eclipse-tractusx/tractusx-testlab' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'AYaoZhan', name: 'Angel Yao' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
    ],
    agents: [AGENTS.testlabTeam],
    details: 'The Eclipse Tractus-X Testlab provides a controlled environment for validating component integrations, running conformance tests, and ensuring interoperability.',
  },
  {
    id: 'umbrella-iac',
    name: 'Umbrella Infrastructure as Code',
    description: 'Infrastructure as Code definitions for deploying and managing Umbrella environments.',
    category: 'qa-testing-tools',
    relevance: ['development-testing'],
    kind: 'tooling',
    maturity: 'incubating',
    repositories: [
      { name: 'tractus-x-umbrella-iac', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella-iac' },
    ],
    contacts: [],
    committers: [],
    agents: [],
    details: 'Umbrella Infrastructure as Code provides Terraform/Pulumi definitions for provisioning cloud infrastructure needed for Eclipse Tractus-X Umbrella deployments.',
  },
  {
    id: 'tractusx-sdk-services',
    name: 'Eclipse Tractus-X SDK Services',
    description: 'Sample services built with the Eclipse Tractus-X SDK, such as the industry flag service.',
    category: 'qa-testing-tools',
    relevance: ['catena-x-demo'],
    kind: 'demonstrator',
    maturity: 'deprecated',
    deprecation: deprecation('tractusx-sdk-services'),
    repositories: [
      { name: 'tractusx-sdk-services', url: 'https://github.com/eclipse-tractusx/tractusx-sdk-services' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'saudkhan116', name: 'Saud Khan' },
      { github: 'CDiezRodriguez', name: 'Carlos Diez Rodriguez' },
    ],
    agents: [],
    details: 'Eclipse Tractus-X SDK Services provides shared middleware and service components that support the Eclipse Tractus-X SDK development framework.',
  },
  {
    id: 'tractusx-website',
    name: 'Eclipse Tractus-X Website',
    description: 'Official Eclipse Tractus-X website hosting the KITs, the Eclipse Tractus-X Release Guidelines (TRGs) and the community documentation.',
    category: 'qa-testing-tools',
    relevance: ['development-testing', 'dataspace-participants'],
    kind: 'documentation',
    maturity: 'mature',
    repositories: [
      { name: 'eclipse-tractusx.github.io', url: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io' },
    ],
    contacts: [],
    committers: [
      { github: 'matbmoser', name: 'Mathias Brunkow Moser' },
      { github: 'lgblaumeiser', name: 'Lars Geyer-Blaumeiser' },
    ],
    agents: [AGENTS.kitMasterBuilder],
    details: 'The Eclipse Tractus-X website is the central entry point to the project. It publishes the KITs, the Eclipse Tractus-X Release Guidelines (TRGs), tutorials and community information.',
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

/**
 * Get a product kind by ID
 */
function getProductKind(kindId) {
  return productKinds.find(kind => kind.id === kindId);
}

/**
 * Get a maturity level by ID
 */
function getMaturityLevel(levelId) {
  return maturityLevels.find(level => level.id === levelId);
}

module.exports = {
  products,
  adopterProfiles,
  productKinds,
  maturityLevels,
  deprecatedRepositories,
  DEPRECATION_NOTICE,
  productCategories,
  relevanceTypes,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getProductCategories,
  getRelevanceTypes,
  getProductKind,
  getMaturityLevel,
};
