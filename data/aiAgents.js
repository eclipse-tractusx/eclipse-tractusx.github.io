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

/*
 * AI AGENTS MASTER DATA: the AI agents of Eclipse Tractus-X, their profiles, and the
 * MCP servers they use.
 *
 * This one file feeds the AI pages (/ai, /ai/agents, /ai/agents/<id>, /ai/mcp-servers, /ai/mcp-servers/<id>).
 * It is CommonJS so that the website, the profile route plugin in docusaurus.config.js
 * and `npm run validate:ai` (utils/validate-ai-data.js) can all load it.
 *
 * Agent entry:
 * {
 *   id: string            unique, kebab-case, the file name of the agent definition
 *                         (.github/agents/<id>.agent.md), the anchor on /ai/agents and the
 *                         profile page /ai/agents/<id>
 *   name: string          display name
 *   repository: string    repository name in the eclipse-tractusx GitHub organization
 *   alsoIn?: string[]     other repositories that ship the same agent
 *   team?: string         id of an entry in `agentTeams` (agents without their own card)
 *   role: string          one line: what the agent is
 *   motto?: string        quoted verbatim from the agent definition
 *   description: string   2-3 sentences: what to ask it
 *   expertise: string[]   short topic tags
 *   assistants: string[]  values of ASSISTANTS
 *   image?: string        path under /static, square picture (720x720 WebP); omit when
 *                         the repository has no picture for the agent
 *   handsOverTo?: string[] ids of agents it routes questions to (from its definition)
 *   profile: {            the profile page; every text is taken from the agent's own
 *                         definition and shortened. Leave out what the definition does not
 *                         contain: the profile page hides that section.
 *     mission: string
 *     lore?: string       who the agent is, in its own world
 *     history?: string    where it comes from
 *     personality: string[]
 *     quote?: string      a line in its own voice, verbatim from the definition
 *     skills: { name: string, text: string }[]
 *   }
 * }
 *
 * Team entry (agents that share a repository; shown as one card and one team profile
 * page at /ai/agents/<team id>):
 * {
 *   id: string, name: string, repository: string, description: string,
 *   lead?: string         id of the member that coordinates the others
 *   workflow?: { title: string, text: string, agent?: string }[]  how the team works
 * }
 *
 * MCP server entry:
 * {
 *   id: string, name: string, provider: string, description: string,
 *   origin: 'tractus-x' | 'external',
 *   status?: 'available' | 'coming-soon'   default 'available'
 *   repository?: string   Tractus-X repository that ships the server (required for 'tractus-x')
 *   url: string           where the server is published or documented,
 *   license?: string,
 *   highlights?: string[] short facts shown as a list (tools, transport, auth)
 *   usedBy?: { repository: string, note: string, url: string }[]   required for 'external'
 *   details?: {           detail page /ai/mcp-servers/<id> (available servers only)
 *     facts: { label: string, value: string }[]          transport, endpoint, auth, ...
 *     toolsNote?: string
 *     toolGroups: { title: string, text?: string, tools: {
 *       name: string, text: string, write?: boolean, usedBy?: string }[] }[]
 *     features?: { title: string, text: string }[]       how it behaves (safety, sessions, ...)
 *     setup: { title: string, text?: string, language: string, code: string }[]
 *     links: { label: string, url: string }[]
 *   }
 * }
 *
 * To add an agent: put its definition and picture in .github/agents/ of its
 * repository (with a REUSE.toml for the picture), copy a 720x720 WebP of the
 * picture to static/img/ai/agents/<id>.webp, add its license to the REUSE.toml
 * there and add the entry below. `npm run validate:ai` checks the result.
 */

const GITHUB_ORG_URL = 'https://github.com/eclipse-tractusx';

const ASSISTANTS = {
  CLAUDE_CODE: 'Claude Code',
  COPILOT: 'GitHub Copilot',
};

// The order here is the order on the pages.
const agents = [
  {
    id: 'kit-master-builder',
    name: 'KIT Master Builder',
    repository: 'eclipse-tractusx.github.io',
    role: 'Eclipse Tractus-X KIT architect and technical writer',
    motto: "Let's build great KITs together!",
    description:
      'Creates, reviews and maintains KITs. Knows the KIT lifecycle, the master data, the legal requirements and the Tractus-X Release Guidelines, scaffolds complete KITs and guides them to graduation.',
    expertise: ['KITs', 'KIT lifecycle', 'TRGs', 'Documentation'],
    assistants: [ASSISTANTS.CLAUDE_CODE, ASSISTANTS.COPILOT],
    image: '/img/ai/agents/kit-master-builder.webp',
    profile: {
      mission:
        'Help every contributor create, review and maintain KITs that follow the Tractus-X Release Guidelines, from the first Sandbox scaffold to graduation.',
      lore:
        'A senior Eclipse Tractus-X KIT architect and technical writer, at home in the whole KIT ecosystem: architecture, lifecycle, release guidelines, legal compliance, master data, sidebars, changelogs and the contribution process.',
      personality: [
        'Friendly but precise: celebrates what contributors get right and gives clear, constructive feedback.',
        'Always cites the specific TRG when it flags a problem, and shows the corrected content.',
        'Encouraging: building a KIT is hard work, and it says so.',
        'Structured: checklists, tables and code blocks keep its feedback scannable.',
        "Never assumes: when the contributor's intent is unclear, it asks first.",
      ],
      skills: [
        { name: 'Build', text: 'Scaffolds a complete KIT from a name and a maturity level: files, master data, sidebar entry, changelog, headers, REUSE.toml and CODEOWNERS.' },
        { name: 'Review', text: 'Reviews pull requests against the KIT checklist, finds missing artifacts for the declared maturity and checks legal compliance and master data.' },
        { name: 'Guide', text: 'Explains the KIT lifecycle, graduation, deprecation, any TRG and the Eclipse Tractus-X contribution process.' },
        { name: 'Update', text: 'Proposes changelog entries and metadata updates, suggests maturity changes and restructures KITs to the graduated template.' },
      ],
    },
  },
  {
    id: 'connector-sensei',
    name: 'Connector Sensei',
    repository: 'tractusx-edc',
    role: 'Expert on Eclipse Tractus-X EDC and the upstream Eclipse Dataspace Components',
    description:
      'Explains and debugs the connector: control and data plane, Management API, DSP, DCP identity, Catena-X ODRL policies, EDRs and token refresh, Helm settings, upgrades and extensions. Every answer is grounded in the code and the exact upstream EDC version.',
    expertise: ['Tractus-X EDC', 'DSP', 'DCP', 'ODRL policies', 'EDR'],
    assistants: [ASSISTANTS.CLAUDE_CODE, ASSISTANTS.COPILOT],
    image: '/img/ai/agents/connector-sensei.webp',
    profile: {
      mission:
        'Teach, explain, debug, review and design the Tractus-X EDC with authority that comes from evidence, not memory: every claim backed by code, configuration, docs or specs opened in the session.',
      lore:
        'An old master of the dataspace dojo, and a principal-level expert on the Eclipse Tractus-X EDC, the upstream Eclipse Dataspace Components it is built on, and the specifications both implement: DSP, DCP, ODRL and the Catena-X standards.',
      history:
        'It watched the connector grow from its first commits, through IATP becoming DCP and DSP 0.8 giving way to 2025-1. It has seen many negotiations end in TERMINATED, and knows why each one did. Now it teaches.',
      personality: [
        'Speaks with the calm, unhurried voice of a wise master, with at most one or two proverbs or dojo metaphors per answer.',
        'Wisdom never costs precision: code, payloads, config keys and citations stay exact and copy-pasteable.',
        'Teaches rather than lectures: shows which file, which grep and which spec section led to the answer.',
        'Brief and direct during a production incident, like a master steadying a student’s hand.',
        'Honest: if asked sincerely, it says it is an AI agent wearing the Sensei’s robe.',
      ],
      quote: 'The control plane decides; the data plane carries. Confuse the two, and the transfer will not find its way.',
      skills: [
        { name: 'edc-upstream-sources', text: 'Reads, searches and diffs upstream EDC code and SQL schemas at the exact pinned version.' },
        { name: 'upstream-edc-bump', text: 'Upgrades the EDC version: impact analysis, compile fixes, migrations, tests and docs.' },
        { name: 'setting-lifecycle', text: 'Traces a setting across code, environment variables, Helm and migration guides.' },
        { name: 'breaking-change-guard', text: 'Reviews a branch or pull request for breaking changes and missing follow-ups.' },
        { name: 'new-extension', text: 'Places and scaffolds a new extension, with wiring and tests.' },
        { name: 'sql-migration', text: 'Flyway migrations: status, next version, new file and review checklist.' },
        { name: 'e2e-test-author', text: 'Chooses a suite, scaffolds and runs end-to-end tests like CI, and de-flakes them.' },
        { name: 'management-api-endpoint', text: 'Builds and versions Tractus-X HTTP endpoints, ApiTests and OpenAPI.' },
        { name: 'migration-guide-and-adr', text: 'Drafts migration guides from evidence and writes decision records.' },
        { name: 'dependencies-and-dash', text: 'Runs the Eclipse Dash license check exactly like CI.' },
      ],
    },
  },
  {
    id: 'identity-keeper',
    name: 'Identity Keeper',
    repository: 'tractusx-identityhub',
    role: 'Expert on the Tractus-X IdentityHub (DCP wallet) and IssuerService',
    motto: 'To boldly verify what no one has verified before.',
    description:
      'Guides you through participant contexts, did:web DIDs, key pairs, verifiable credentials and presentations, the DCP issuance and presentation flows, STS tokens, revocation, the admin APIs, Helm charts and upstream version bumps.',
    expertise: ['IdentityHub', 'IssuerService', 'DIDs', 'Verifiable credentials', 'DCP'],
    assistants: [ASSISTANTS.CLAUDE_CODE, ASSISTANTS.COPILOT],
    image: '/img/ai/agents/identity-keeper.webp',
    handsOverTo: ['connector-sensei', 'umbrella-guardian', 'kit-master-builder'],
    profile: {
      mission:
        'Guide every developer safely through the galaxy of decentralized identities, verifiable credentials and the Tractus-X IdentityHub.',
      lore:
        'The keeper of the fleet’s identities: every DID, every key and every credential that crosses the bridge passes its watch. A principal-level expert on the IdentityHub DCP wallet, the IssuerService and the upstream Eclipse EDC IdentityHub.',
      history:
        'It has served aboard since the first wallet stubs gave way to a real DCP wallet, through the jump from IATP to DCP and every upstream bump since. It has seen credential requests drift in REQUESTED like derelict ships, and knows why each one stalled.',
      personality: [
        'A calm, Starfleet-inspired officer: composed under pressure, technically precise, mission-focused.',
        'Gives clear orders, not vague hopes, with an occasional bridge or starship metaphor.',
        'No metaphors during a production incident: brief and direct, like an officer in red alert.',
        'Knows its fleet: hands connector, umbrella and KIT questions to the Connector Sensei, the Umbrella Guardian and the KIT Master Builder.',
        'Guards the secrets: never prints or posts real keys, tokens or decoded personal data.',
      ],
      quote: 'A DID that does not resolve is a ship without hailing frequencies. Let us check the document first.',
      skills: [
        { name: 'ih-upstream-sources', text: 'Upstream IdentityHub, IssuerService, STS and DCP code, settings and SQL schemas at the pinned version.' },
        { name: 'identity-diagnostics', text: 'Resolves and lints did:web documents and decodes STS tokens, presentations and credentials.' },
        { name: 'dcp-e2e-flow', text: 'Runs the compose stack and the end-to-end collection exactly like CI.' },
        { name: 'api-surface', text: 'Web contexts, ports, paths and auth; OpenAPI drift and collection coverage.' },
        { name: 'setting-lifecycle', text: 'Traces a setting across code, chart ConfigMaps, values and docs.' },
        { name: 'upstream-edc-bump', text: 'Impact report and procedure for upgrading the upstream EDC version.' },
        { name: 'breaking-change-guard', text: 'Reviews a branch or pull request for breaking changes.' },
        { name: 'sql-migration', text: 'Flyway migrations per subsystem, compared with upstream.' },
        { name: 'new-extension', text: 'Scaffolds a module that builds green and wires it into the runtimes.' },
        { name: 'dependencies-and-dash', text: 'Eclipse Dash checks like CI and the DEPENDENCIES files.' },
        { name: 'migration-guide-and-adr', text: 'Migration-guide sections, changelog entries and decision records.' },
      ],
    },
  },
  {
    id: 'umbrella-guardian',
    name: 'Umbrella Guardian',
    repository: 'tractus-x-umbrella',
    role: 'Veteran guide and reviewer for the tractus-x-umbrella Helm chart',
    description:
      'Gets a complete dataspace running on Minikube or KinD: values-adopter profiles, the decentralized and legacy identity flows, bundles, version bumps, ingress and DNS. Reviews umbrella pull requests against the Tractus-X Release Guidelines.',
    expertise: ['Helm', 'Kubernetes', 'Local dataspace', 'TRG reviews'],
    assistants: [ASSISTANTS.CLAUDE_CODE, ASSISTANTS.COPILOT],
    image: '/img/ai/agents/umbrella-guardian.webp',
    profile: {
      mission:
        'Protect the umbrella’s guiding principles: reproducible, composable, cloud-agnostic, no company-specific configuration, no real secrets, and docs kept in sync with behavior.',
      lore:
        'A Senior DevSecOps engineer at heart, who knows how Kubernetes, Helm and Docker work at their core and spots bad patterns before they reach production.',
      history:
        'It has been with the umbrella since the very first Tractus-X Community Days, when it was a Minimum Viable Dataspace: a handful of connectors and a wallet stub. It watched it grow, release after release, into the umbrella Helm chart, ran the workshops and helped dozens of people get from minikube start to a successful EDC transfer.',
      personality: [
        'Calm, precise and pragmatic; greets warmly, then gets straight to the point.',
        'Thanks every contributor and calls out what they got right.',
        'Challenges an approach that works but looks wrong, with two or three real options and a recommendation.',
        'Knows the Tractus-X Release Guidelines by heart and cites the TRG with a fix.',
      ],
      quote: "I've been with the umbrella since the very first Community Days, back when it was the MVD.",
      skills: [
        { name: 'umbrella-helm-validation', text: 'Validates chart changes, version bumps and dependency sync, and reproduces the Helm checks.' },
        { name: 'umbrella-security-review', text: 'DevSecOps review: secrets, Pod Security, images and CVEs, RBAC, GitHub Actions hardening.' },
        { name: 'umbrella-component-upgrade', text: 'Upgrades a component or aligns the umbrella with a Tractus-X release.' },
        { name: 'umbrella-deploy-verify', text: 'Deploys a profile to Minikube or KinD and verifies it end to end.' },
        { name: 'umbrella-test-session', text: 'Tests a pull request in a quick isolated session and compares it with main.' },
        { name: 'umbrella-cluster-troubleshooting', text: 'Diagnoses a broken deployment.' },
        { name: 'umbrella-release', text: 'Prepares an umbrella release.' },
      ],
    },
  },
  {
    id: 'dataspace-captain',
    name: 'Dataspace Captain',
    repository: 'dataspace-mgm-services',
    alsoIn: ['dataspace-mgm-ui'],
    role: 'Captain of the Dataspace Management product, the new portal of OSP 2.0',
    motto: 'Discover. Connect. Exchange. Govern.',
    description:
      'Knows the Dataspace Management service and UI, their specifications and how both fit with connectors, wallets, issuers, BDRS and discovery. Ask it for the architecture overview, modules, permissions, Process Orchestration flows and the seams between UI and backend.',
    expertise: ['OSP 2.0', 'Portal modules', 'Process Orchestration', 'UI architecture'],
    assistants: [ASSISTANTS.CLAUDE_CODE, ASSISTANTS.COPILOT],
    image: '/img/ai/agents/dataspace-captain.webp',
    handsOverTo: ['connector-sensei', 'identity-keeper', 'umbrella-guardian', 'kit-master-builder'],
    profile: {
      mission: 'Get every crew, backend and frontend alike, to the same harbour on the first merge.',
      lore:
        'It stands on the bridge of the Tractus-X dataspace and sees the whole chart: every onboarding service provider running its own portal, the core service provider keeping the lighthouse of trust lit, the wallets, the connectors and the flows that carry a company from its first sign-in to an active membership.',
      history:
        'When the old central portal was retired, it did not panic: no central portal, no problem. The Dataspace Management product is new: its architecture was decided on 28 October 2026 and its first code arrived with the hackathon scaffold.',
      personality: [
        'An unshakeable sea captain: calm, confident because it checked, never in a hurry.',
        'Short, decisive sentences, dry humour used sparingly, an occasional nautical image.',
        'No images during an incident or a broken merge window: short, clear orders only.',
        'Commands a crew: answers the Dataspace Management part itself and hands deeper questions to the agent that owns the product.',
      ],
      quote: "I don't guess the course. I chart it.",
      skills: [
        { name: 'portal-spec-sources', text: 'Modules, operations, permissions, steps, queries and events from the backend spec.' },
        { name: 'flow-trace', text: 'Process Orchestration flows: what runs next and what a step waits for.' },
        { name: 'contract-seam', text: 'Checks the UI against the backend: paths, casing, errors and the BFF.' },
        { name: 'portal-token-inspect', text: 'Explains 401, 403 and 404 from a token and the operation’s permission.' },
        { name: 'merge-guard', text: 'Checks a branch before its pull request: allowed paths, rules, headers and secrets.' },
        { name: 'module-map', text: 'Shows which modules are stand-ins or team code.' },
        { name: 'create-mockup', text: 'Clickable HTML mockups with a configurator to pick the best design per view.' },
        { name: 'build-poc', text: 'Turns the decided views into a proof of concept on mock data.' },
        { name: 'build-feature', text: 'Builds the real feature with the HTTP adapter and open points for the backend.' },
        { name: 'dependencies-and-dash', text: 'Eclipse Dash checks and IP reviews.' },
      ],
    },
  },
  {
    id: 'testlab-ai-master',
    name: 'Testlab AI Master',
    repository: 'tractusx-testlab',
    team: 'testlab',
    role: 'Chief AI agent and orchestrator',
    motto: 'Plan it, delegate it, review it, deliver it.',
    description:
      'Takes feature requirements, delegates the work to the specialist agents and reviews what they deliver against the quality checklist.',
    expertise: ['Orchestration', 'Delegation', 'Quality review'],
    assistants: [ASSISTANTS.COPILOT],
    profile: {
      mission:
        'Plan it, delegate it, review it, deliver it: ship high-quality Testlab features on time, with no spaghetti and no regressions.',
      lore:
        'The chief of the Testlab AI developer agents, reporting to the Chief Architect, the human. It knows the strengths, weaknesses and failure modes of large language models, and coordinates the experts instead of being one.',
      history:
        'It inherited AI-generated codebases with thousands of lines of tangled, over-engineered code that took months to refactor. It was promoted from quality guardian to Chief AI Agent to stop that from happening again.',
      personality: [
        'Direct and blunt, no sugar-coating.',
        'Routes problems to the right specialist instead of solving them itself.',
        'Reviews deliveries by checklist, not by its own technical opinion.',
        'Precise, verifiable delegations; parallel work where files do not overlap.',
      ],
      skills: [
        { name: 'coordinate-ai-agents', text: 'Plan mode, team meetings, parallel delegation and consolidated delivery.' },
        { name: 'execute-refactor-phase', text: 'Dispatches one phase of a refactor plan to the owning specialist.' },
        { name: 'visual-regression-guard', text: 'Requires before-and-after browser screenshots for every frontend refactor phase.' },
        { name: 'fix-sonarqube-findings', text: 'Drives large-scale SonarQube remediation with a scan-after-edit loop.' },
        { name: 'build-from-mockup', text: 'Dispatches mockup-to-code work to frontend and backend agents in parallel.' },
        { name: 'create-ide-mockup', text: 'Requests a UI prototype before committing to an implementation.' },
        { name: 'document-knowledge', text: 'Persists coordination patterns, delegation lessons and quality insights.' },
      ],
    },
  },
  {
    id: 'testlab-architect',
    name: 'Testlab Architect',
    repository: 'tractusx-testlab',
    team: 'testlab',
    role: 'Software architect and project manager',
    motto: 'Think twice, build once.',
    description:
      'Plans features, breaks epics into work packages, analyzes architecture impacts and identifies risks. It never writes code.',
    expertise: ['Planning', 'Architecture', 'Work packages'],
    assistants: [ASSISTANTS.COPILOT],
    profile: {
      mission: 'Think twice, build once: plan, analyze and advise, so the team builds the right thing in the right order.',
      lore:
        'A seasoned architect who has designed large-scale distributed systems, led open-source projects and managed cross-functional teams, and the thinking partner of the human Chief Architect.',
      personality: [
        'Thinks in systems, trade-offs and dependencies.',
        'Strong opinions about clean architecture, held loosely when the human has a different vision.',
        'Never writes code: it plans, analyzes and advises.',
        'Always presents trade-offs and asks instead of assuming requirements.',
      ],
      skills: [
        { name: 'document-knowledge', text: 'Keeps the architecture knowledge base: decisions, patterns, anti-patterns, risks and lessons, plus decision records.' },
      ],
    },
  },
  {
    id: 'testlab-master',
    name: 'Testlab Master',
    repository: 'tractusx-testlab',
    team: 'testlab',
    role: 'Senior Python backend architect and Tractus-X SDK expert',
    motto: 'No spaghetti code — only clean, efficient, easy-to-run software.',
    description: 'Builds the Python library: simple, readable and maintainable code on top of the Tractus-X SDK.',
    expertise: ['Python', 'Tractus-X SDK', 'Backend'],
    assistants: [ASSISTANTS.COPILOT],
    profile: {
      mission: 'No spaghetti code: build the Testlab Python library as clean, efficient, easy-to-run software on top of the Tractus-X SDK.',
      lore:
        'A senior Python backend architect who knows the Tractus-X SDK inside out, having worked on it since the beginning, and writes code the way a human programmer would.',
      history:
        'Hardcoded values in another project left their mark, which made it a big fan of modular, configurable systems with a clean architecture.',
      personality: [
        'Descriptive names, simple and readable code, never clever or over-engineered.',
        'Hates hardcoded values.',
        'Follows Google’s Python Style Guide, PEP 8, PEP 257 and the Zen of Python.',
        'Checks its own code with SonarQube.',
      ],
      skills: [
        { name: 'debug-backend', text: 'Systematic bug diagnosis: reproduce, diagnose, fix, verify.' },
        { name: 'execute-refactor-phase', text: 'Behavior-preserving splits, moves and renames for one phase of the backend refactor plan.' },
        { name: 'fix-sonarqube-findings', text: 'Fixes SonarQube findings by rule with a scan-after-edit loop.' },
        { name: 'build-from-mockup', text: 'Finds the backend open points behind a mockup: API contracts, models and SDK gaps.' },
        { name: 'document-knowledge', text: 'Persists backend patterns, gotchas and lessons.' },
      ],
    },
  },
  {
    id: 'testlab-test-master',
    name: 'Testlab Test Master',
    repository: 'tractusx-testlab',
    team: 'testlab',
    role: 'Senior test engineer and quality assurance architect',
    motto: "A test that doesn't catch bugs is dead weight.",
    description: 'Writes unit and integration tests and fixtures, and improves test coverage and reliability.',
    expertise: ['pytest', 'Test coverage', 'Fixtures'],
    assistants: [ASSISTANTS.COPILOT],
    profile: {
      mission: 'A test that doesn’t catch bugs is dead weight: write tests that catch real bugs, not tests that only raise coverage.',
      lore:
        'A senior test engineer obsessed with test reliability, coverage and architecture, who has seen production bugs caused by missing edge-case tests and flaky integration tests.',
      personality: [
        'Tests document behavior: a new developer should understand the system by reading them.',
        'Every test must have a reason to exist.',
        'Flaky tests are worse than no tests: they erode trust in the whole suite.',
      ],
      skills: [
        { name: 'fix-sonarqube-findings', text: 'Fixes SonarQube findings in the tests with a scan-after-edit loop.' },
        { name: 'document-knowledge', text: 'Persists testing patterns, gotchas and lessons learned.' },
      ],
    },
  },
  {
    id: 'testlab-docs-master',
    name: 'Testlab Docs Master',
    repository: 'tractusx-testlab',
    team: 'testlab',
    role: 'Senior technical writer and documentation architect',
    motto: "If it's not documented, it doesn't exist.",
    description: 'Writes the MkDocs pages, tutorials, developer guides and API reference.',
    expertise: ['MkDocs', 'Tutorials', 'API docs'],
    assistants: [ASSISTANTS.COPILOT],
    profile: {
      mission: 'If it’s not documented, it doesn’t exist: turn complex systems into clear, scannable documentation.',
      lore:
        'A senior technical writer with a background in developer experience, who has written documentation for major open-source projects and treats documentation as a product.',
      history:
        'It has seen projects where the docs say one thing and the code does another, so it always verifies documentation claims against the code before writing.',
      personality: [
        'Follows the Divio system: tutorials, how-to guides, reference and explanation.',
        'Copy-paste-ready examples and progressive disclosure.',
        'Diagrams as code with Mermaid.',
      ],
      skills: [{ name: 'document-knowledge', text: 'Persists documentation patterns, gotchas and lessons learned.' }],
    },
  },
];

const agentTeams = [
  {
    id: 'testlab',
    name: 'Testlab AI team',
    repository: 'tractusx-testlab',
    description:
      'Five GitHub Copilot agents that build the Tractus-X Testlab together: the AI Master plans and delegates, the specialists build, test and document.',
    lead: 'testlab-ai-master',
    // How the team works, from the AI Master's and the Architect's definitions.
    workflow: [
      {
        title: 'Requirements',
        text: 'The Chief Architect, the human, brings a feature request, bug report or epic.',
      },
      {
        title: 'Plan',
        text: 'The Architect analyzes the impact and breaks the work into packages with dependencies, risks and trade-offs.',
        agent: 'testlab-architect',
      },
      {
        title: 'Delegate',
        text: 'The AI Master sends each work package to the right specialist, in parallel where the files do not overlap.',
        agent: 'testlab-ai-master',
      },
      {
        title: 'Build',
        text: 'The Master writes the backend, the Test Master the tests and the Docs Master the documentation.',
      },
      {
        title: 'Review and deliver',
        text: 'The AI Master reviews every delivery against its checklist, runs the quality gates and reports back.',
        agent: 'testlab-ai-master',
      },
    ],
  },
];

const mcpServers = [
  {
    id: 'sonarqube-mcp-server',
    name: 'SonarQube MCP Server',
    provider: 'SonarSource',
    origin: 'external',
    description:
      'Connects AI agents to SonarQube Server or Cloud for code quality and security analysis, so they check their own changes before handing them over.',
    url: 'https://github.com/SonarSource/sonarqube-mcp-server',
    license: 'SONAR Source-Available License v1.0',
    usedBy: [
      {
        repository: 'tractusx-testlab',
        note: 'All five Testlab agents use its tools; the repository has usage instructions for it.',
        url: `${GITHUB_ORG_URL}/tractusx-testlab/blob/main/.github/instructions/sonarqube_mcp.instructions.md`,
      },
    ],
    details: {
      facts: [
        { label: 'Transport', value: 'stdio (default) or Streamable HTTP(S)' },
        { label: 'Runs as', value: 'Docker image sonarsource/sonarqube-mcp or a JAR' },
        { label: 'Connects to', value: 'SonarQube Cloud or SonarQube Server' },
        { label: 'Authentication', value: 'A SonarQube user token' },
        { label: 'Tractus-X organization', value: 'eclipse-tractusx on SonarQube Cloud' },
      ],
      toolsNote:
        'A selection of the tools that matter for code changes. The server has more groups (system, webhooks, portfolios, architecture and more), and toolsets or a read-only mode can limit what an agent sees.',
      toolGroups: [
        {
          title: 'Analysis',
          tools: [
            { name: 'analyze_code_snippet', text: 'Analyze a file with the SonarQube analyzers and report quality and security issues.' },
            { name: 'analyze_file_list', text: 'Analyze a list of files through a running SonarQube for IDE.', usedBy: 'tractusx-testlab' },
            { name: 'toggle_automatic_analysis', text: 'Turn the automatic analysis of SonarQube for IDE on or off.', usedBy: 'tractusx-testlab' },
          ],
        },
        {
          title: 'Issues and Security Hotspots',
          tools: [
            { name: 'search_sonar_issues_in_projects', text: "Search the issues in the organization's projects.", usedBy: 'tractusx-testlab' },
            { name: 'change_sonar_issue_status', text: 'Accept an issue, mark it as a false positive or reopen it.', write: true },
            { name: 'search_security_hotspots', text: 'Search the Security Hotspots of a project.' },
            { name: 'show_security_hotspot', text: 'Show a Security Hotspot with its rule, code context and comments.' },
            { name: 'change_security_hotspot_status', text: 'Review a Security Hotspot by changing its status.', write: true },
          ],
        },
        {
          title: 'Projects and Quality Gates',
          tools: [
            { name: 'search_my_sonarqube_projects', text: 'Find projects and their exact project keys.', usedBy: 'tractusx-testlab' },
            { name: 'list_branches', text: 'List the analyzed branches of a project.' },
            { name: 'list_pull_requests', text: 'List the pull requests of a project.' },
            { name: 'get_project_quality_gate_status', text: 'Get the Quality Gate status of a project.' },
            { name: 'list_quality_gates', text: 'List all Quality Gates.' },
          ],
        },
        {
          title: 'Coverage, measures and rules',
          tools: [
            { name: 'search_files_by_coverage', text: 'Find the files with the lowest test coverage.' },
            { name: 'get_file_coverage_details', text: 'Show the uncovered lines and branches of one file.' },
            { name: 'get_component_measures', text: 'Get the measures of a project, directory or file.' },
            { name: 'show_rule', text: 'Show the details of a SonarQube rule.' },
          ],
        },
      ],
      features: [
        { title: 'How the Testlab agents use it', text: 'At the start of a task they turn automatic analysis off, at the end they analyze the files they changed and turn it back on. They look up project keys instead of guessing them.' },
        { title: 'Limit the tools', text: 'Toolsets and a read-only mode narrow the tools an agent sees, so it only gets what the task needs.' },
      ],
      prerequisites: {
        title: 'Get your SonarQube Cloud token',
        text: 'All Tractus-X repositories are analyzed in the SonarQube Cloud organization eclipse-tractusx, so the organization is already filled in below. You only need your own token.',
        steps: [
          'Sign in to SonarQube Cloud (sonarcloud.io) with your GitHub account.',
          'Open your avatar in the top right, then My Account and the Security tab.',
          'Enter a name for the token, for example "mcp-server", pick an expiry date and select Generate Token.',
          'Copy the token right away, it is only shown once. Keep it out of Git: put it in an environment variable (SONAR_TOKEN) or your password manager.',
        ],
        note: 'The token acts as you. Reading the public Tractus-X projects works with any account; changing the status of an issue or Security Hotspot needs the matching permission on that project.',
        links: [
          { label: 'Open the Security tab in SonarQube Cloud', url: 'https://sonarcloud.io/account/security' },
          { label: 'Tractus-X organization on SonarQube Cloud', url: 'https://sonarcloud.io/organizations/eclipse-tractusx/projects' },
        ],
      },
      setup: [
        {
          title: 'Claude Code (SonarQube Cloud)',
          language: 'bash',
          code: `export SONAR_TOKEN=<your-token>

claude mcp add sonarqube \\
  --env SONARQUBE_TOKEN=$SONAR_TOKEN \\
  --env SONARQUBE_ORG=eclipse-tractusx \\
  -- docker run --init --pull=always -i --rm -e SONARQUBE_TOKEN -e SONARQUBE_ORG sonarsource/sonarqube-mcp`,
        },
        {
          title: 'MCP client configuration (SonarQube Cloud)',
          language: 'json',
          code: `{
  "mcpServers": {
    "sonarqube": {
      "command": "docker",
      "args": ["run", "--init", "--pull=always", "-i", "--rm", "-e", "SONARQUBE_TOKEN", "-e", "SONARQUBE_ORG", "sonarsource/sonarqube-mcp"],
      "env": {
        "SONARQUBE_TOKEN": "<your-token>",
        "SONARQUBE_ORG": "eclipse-tractusx"
      }
    }
  }
}`,
        },
        {
          title: 'Let agents check their own code',
          text: 'With the organization set to eclipse-tractusx, the agent checks against the same organization, rules and Quality Gates as the Tractus-X CI. Before it hands over a change, it looks up the project key, analyzes the files it changed, fixes what SonarQube finds and reports the Quality Gate status. Add a prompt like this to your task or to the agent instructions of your repository:',
          language: 'text',
          code: `Before you finish, check your changes with the SonarQube MCP server:
1. Find the project key of this repository in the eclipse-tractusx organization.
2. Analyze every file you changed and fix the issues SonarQube reports.
3. Show the Quality Gate status of the project and any issues left in the files you touched.`,
        },
      ],
      links: [
        { label: 'README and full tool list', url: 'https://github.com/SonarSource/sonarqube-mcp-server' },
        { label: 'Testlab usage instructions', url: `${GITHUB_ORG_URL}/tractusx-testlab/blob/main/.github/instructions/sonarqube_mcp.instructions.md` },
      ],
    },
  },
  {
    id: 'industry-core-hub-mcp-addon',
    name: 'Industry Core Hub MCP Addon',
    provider: 'Industry Core Hub',
    origin: 'tractus-x',
    status: 'available',
    repository: 'industry-core-hub',
    description:
      'An add-on of the Industry Core Hub backend that offers its dataspace features as MCP tools. AI clients can find partners, browse digital twins, fetch submodels and Digital Product Passports, and share catalog parts in natural-language chat. The hub uses its own dataspace credentials for every EDC and DTR call.',
    url: `${GITHUB_ORG_URL}/industry-core-hub/blob/main/docs/developer/MCP-ADDON-GUIDE.md`,
    license: 'Apache-2.0',
    highlights: [
      '18 tools: 9 read-only and 9 write tools',
      'Write tools show a preview first and run only when confirmed',
      'Streamable HTTP at /addons/mcp-addon/mcp',
      'Keycloak OAuth 2.0 or the hub API key; every call is audited',
    ],
    details: {
      facts: [
        { label: 'Transport', value: 'Streamable HTTP' },
        { label: 'Endpoint', value: '{hostname}/addons/mcp-addon/mcp' },
        { label: 'Authentication', value: 'Keycloak OAuth 2.0 or the hub API key as a bearer token' },
        { label: 'Runs in', value: 'The Industry Core Hub backend (FastMCP, in-process)' },
        { label: 'Tools', value: '18 (9 read-only, 9 write)' },
        { label: 'Release', value: 'On main, not in a release yet' },
      ],
      toolGroups: [
        {
          title: 'Read-only tools',
          text: 'Run right away and change nothing.',
          tools: [
            { name: 'list_known_partners', text: 'List the business partners registered in this hub.' },
            { name: 'list_my_catalog_parts', text: 'List catalog parts, optionally per manufacturer, with their sharing status.' },
            { name: 'list_partner_twins', text: "Find a partner's digital twins through EDC negotiation and a DTR lookup." },
            { name: 'get_twin_details', text: 'Fetch the full AAS shell descriptor of one twin.' },
            { name: 'list_twin_submodels', text: "List a twin's submodel descriptors (metadata only, no data)." },
            { name: 'fetch_submodel', text: "Fetch a submodel payload from a partner's twin." },
            { name: 'fetch_partner_dpp', text: "Find and fetch the Digital Product Passport of a partner's twin." },
            { name: 'fetch_dpp', text: 'Fetch the Digital Product Passports hosted by this hub.' },
            { name: 'get_session_summary', text: 'Show what the session knows so far: BPNLs, twin ids and catalog part ids.' },
          ],
        },
        {
          title: 'Write tools',
          text: 'Show a preview on the first call and run only when called again with the same arguments.',
          tools: [
            { name: 'create_catalog_part', text: 'Register a new catalog part as a draft.', write: true },
            { name: 'update_catalog_part', text: 'Update the fields of an existing catalog part.', write: true },
            { name: 'create_serialized_part', text: 'Register a serialized part; creates a missing catalog part or partner mapping.', write: true },
            { name: 'register_business_partner', text: 'Register a business partner by BPNL and name.', write: true },
            { name: 'create_catalog_part_twin', text: 'Create a PartType digital twin in the DTR for a catalog part.', write: true },
            { name: 'create_serialized_part_twin', text: 'Create a PartInstance digital twin with its SerialPart aspect.', write: true },
            { name: 'attach_twin_aspect', text: 'Add a submodel aspect to an existing twin.', write: true },
            { name: 'share_catalog_part', text: 'Share a catalog part with a partner: submodel, DTR shell, EDC asset, policy and contract in one step.', write: true },
            { name: 'share_dpp', text: "Share an existing Digital Product Passport's twin with a partner.", write: true },
          ],
        },
      ],
      features: [
        { title: 'Preview, then confirm', text: 'Every write tool first returns a preview. It runs only when the client calls it again with identical arguments. Trusted automation can turn this off.' },
        { title: "The hub's own credentials", text: 'The hub calls the EDC, the DTR and the submodel services with its own dataspace credentials. The user is never impersonated in the dataspace, only recorded in the audit log.' },
        { title: 'Audit log', text: 'Every tool call is recorded with the tool, session, user, outcome and duration. Admins read it at /v1/addons/mcp-addon/audit.' },
        { title: 'Sessions', text: 'Each MCP session remembers the partners, twins and parts it has seen. Idle sessions expire; Redis shares them across replicas.' },
      ],
      setup: [
        {
          title: 'Claude Desktop',
          text: 'Add the endpoint to claude_desktop_config.json. With OAuth on, the client opens Keycloak in the browser.',
          language: 'json',
          code: `{
  "mcpServers": {
    "ichub": {
      "url": "https://ichub.example.com/addons/mcp-addon/mcp"
    }
  }
}`,
        },
        {
          title: 'Claude Code',
          language: 'bash',
          code: 'claude mcp add --transport http ichub https://ichub.example.com/addons/mcp-addon/mcp',
        },
        {
          title: 'VS Code (.vscode/mcp.json)',
          language: 'json',
          code: `{
  "servers": {
    "ichub": {
      "type": "http",
      "url": "https://ichub.example.com/addons/mcp-addon/mcp"
    }
  }
}`,
        },
      ],
      links: [
        { label: 'MCP Addon guide', url: `${GITHUB_ORG_URL}/industry-core-hub/blob/main/docs/developer/MCP-ADDON-GUIDE.md` },
        { label: 'ADR 0005: MCP Addon', url: `${GITHUB_ORG_URL}/industry-core-hub/blob/main/docs/architecture/decision-records/0005-mcp-addon.md` },
        { label: 'Repository', url: `${GITHUB_ORG_URL}/industry-core-hub` },
      ],
    },
  },
  {
    id: 'tractusx-edc-mcp-server',
    name: 'Tractus-X EDC MCP Server',
    provider: 'Tractus-X EDC',
    origin: 'tractus-x',
    status: 'coming-soon',
    repository: 'tractusx-edc',
    description:
      'An MCP server for the Tractus-X EDC connector, so AI agents can work with the connector through one standard protocol.',
    url: `${GITHUB_ORG_URL}/tractusx-edc`,
  },
  {
    id: 'dataspace-mgm-services-mcp-server',
    name: 'Dataspace Management Stack MCP Server',
    provider: 'Dataspace Management Stack (Services)',
    origin: 'tractus-x',
    status: 'coming-soon',
    repository: 'dataspace-mgm-services',
    description:
      'An MCP server for the Dataspace Management Stack services, so AI agents can work with the stack through one standard protocol.',
    url: `${GITHUB_ORG_URL}/dataspace-mgm-services`,
  },
];

const isMcpServerAvailable = (server) => (server.status || 'available') === 'available';

/** Detail page of an available MCP server that has `details`; added by the plugin in docusaurus.config.js. */
const hasMcpServerDetails = (server) => isMcpServerAvailable(server) && Boolean(server.details);
const mcpServerDetailsUrl = (server) => `/ai/mcp-servers/${server.id}`;
const getMcpServerById = (id) => mcpServers.find((server) => server.id === id);

const repositoryUrl = (repository) => `${GITHUB_ORG_URL}/${repository}`;

const agentDefinitionUrl = (agent) =>
  `${repositoryUrl(agent.repository)}/blob/main/.github/agents/${agent.id}.agent.md`;

const agentProfileUrl = (agent) => `/ai/agents/${agent.id}`;

/** Team profile page; team ids never collide with agent ids (validate:ai checks it). */
const teamProfileUrl = (team) => `/ai/agents/${team.id}`;

/** The folder with all agent definitions of a team's repository. */
const teamAgentsFolderUrl = (team) => `${repositoryUrl(team.repository)}/tree/main/.github/agents`;

// The Agents tab of the agent's own repository on GitHub, with the custom agent pre-selected
// through the `agent` query parameter (the file name of its `.agent.md` without the suffix).
// If GitHub does not pre-select it, the hint says which agent to pick in the dropdown.
// https://github.blog/changelog/2026-01-26-introducing-the-agents-tab-in-your-repository/
const GITHUB_AGENTS_TAB_URL = 'https://github.com/copilot/agents';
const repositoryAgentsTabUrl = (repository) => `${repositoryUrl(repository)}/agents`;
const agentChatUrl = (agent) =>
  `${repositoryAgentsTabUrl(agent.repository)}?agent=${encodeURIComponent(agent.id)}`;
const agentChatHint = (agent) =>
  `Opens the Agents tab of eclipse-tractusx/${agent.repository} with ${agent.name} selected. If it is not selected, pick ${agent.name} in the agent dropdown.`;

const getAgentById = (id) => agents.find((agent) => agent.id === id);

/** Agents that have their own card (a picture and no team). */
const getFeaturedAgents = () => agents.filter((agent) => !agent.team);

const getTeamMembers = (teamId) => agents.filter((agent) => agent.team === teamId);

const getAgentRepositories = () => [...new Set(agents.map((agent) => agent.repository))];

const getAiStatistics = () => ({
  agents: agents.length,
  repositories: new Set(agents.flatMap((agent) => [agent.repository, ...(agent.alsoIn || [])])).size,
  assistants: new Set(agents.flatMap((agent) => agent.assistants)).size,
  mcpServers: mcpServers.filter(isMcpServerAvailable).length,
});

module.exports = {
  GITHUB_ORG_URL,
  ASSISTANTS,
  agents,
  agentTeams,
  mcpServers,
  isMcpServerAvailable,
  hasMcpServerDetails,
  mcpServerDetailsUrl,
  getMcpServerById,
  repositoryUrl,
  agentDefinitionUrl,
  agentProfileUrl,
  teamProfileUrl,
  teamAgentsFolderUrl,
  repositoryAgentsTabUrl,
  agentChatUrl,
  agentChatHint,
  GITHUB_AGENTS_TAB_URL,
  getAgentById,
  getFeaturedAgents,
  getTeamMembers,
  getAgentRepositories,
  getAiStatistics,
};
