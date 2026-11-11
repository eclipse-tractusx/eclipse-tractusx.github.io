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
 * AI MASTER DATA: the AI agents and MCP servers of Eclipse Tractus-X.
 *
 * This file feeds the AI pages (/AI, /AI/agents, /AI/mcp-servers). It is
 * CommonJS so that both the website and `npm run validate:ai`
 * (utils/validate-ai-data.js) can load it.
 *
 * Agent entry:
 * {
 *   id: string            unique, kebab-case, the file name of the agent definition
 *                         (.github/agents/<id>.agent.md) and the anchor on /AI/agents
 *   name: string          display name
 *   repository: string    repository name in the eclipse-tractusx GitHub organization
 *   alsoIn?: string[]     other repositories that ship the same agent
 *   team?: string        id of an entry in `agentTeams` (agents without their own card)
 *   role: string          one line: what the agent is
 *   motto?: string        quoted verbatim from the agent definition
 *   description: string   2-3 sentences: what to ask it
 *   expertise: string[]   short topic tags
 *   assistants: string[]  values of ASSISTANTS
 *   image?: string        path under /static, square picture (720x720 WebP); omit when
 *                         the repository has no picture for the agent
 *   handsOverTo?: string[] ids of agents it routes questions to (from its definition)
 * }
 *
 * MCP server entry:
 * {
 *   id: string, name: string, provider: string, description: string,
 *   origin: 'tractus-x' | 'external',
 *   url: string           where the server is published,
 *   license?: string,
 *   usedBy: { repository: string, note: string, url: string }[]
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

const agents = [
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
  },
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
  },
];

const agentTeams = [
  {
    id: 'testlab',
    name: 'Testlab AI team',
    repository: 'tractusx-testlab',
    description:
      'Five GitHub Copilot agents that build the Tractus-X Testlab together: the AI Master plans and delegates, the specialists build, test and document.',
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
  },
];

const repositoryUrl = (repository) => `${GITHUB_ORG_URL}/${repository}`;

const agentDefinitionUrl = (agent) =>
  `${repositoryUrl(agent.repository)}/blob/main/.github/agents/${agent.id}.agent.md`;

const getAgentById = (id) => agents.find((agent) => agent.id === id);

/** Agents that have their own card (a picture and no team). */
const getFeaturedAgents = () => agents.filter((agent) => !agent.team);

const getTeamMembers = (teamId) => agents.filter((agent) => agent.team === teamId);

const getAgentRepositories = () => [...new Set(agents.map((agent) => agent.repository))];

const getAiStatistics = () => ({
  agents: agents.length,
  repositories: new Set(agents.flatMap((agent) => [agent.repository, ...(agent.alsoIn || [])])).size,
  assistants: new Set(agents.flatMap((agent) => agent.assistants)).size,
  mcpServers: mcpServers.length,
});

module.exports = {
  GITHUB_ORG_URL,
  ASSISTANTS,
  agents,
  agentTeams,
  mcpServers,
  repositoryUrl,
  agentDefinitionUrl,
  getAgentById,
  getFeaturedAgents,
  getTeamMembers,
  getAgentRepositories,
  getAiStatistics,
};
