#!/usr/bin/env node
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

// Checks data/aiData.js before the build: required fields, unique ids, known
// teams and hand-over targets, and that every agent picture exists in /static
// and has a license entry in its folder's REUSE.toml.
// Usage: node utils/validate-ai-data.js [--silent]

const fs = require('fs');
const path = require('path');

const { agents, agentTeams, mcpServers, ASSISTANTS } = require('../data/aiData');

const ROOT = path.join(__dirname, '..');
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const REPOSITORY_NAME = /^[A-Za-z0-9._-]+$/;
const silent = process.argv.includes('--silent') || process.argv.includes('-s');

function requireFields(entry, fields, label, errors) {
  fields.forEach((field) => {
    const value = entry[field];
    const empty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
    if (empty) errors.push(`${label}: missing "${field}"`);
  });
}

function checkUniqueIds(entries, label, errors) {
  const seen = new Set();
  entries.forEach((entry) => {
    if (seen.has(entry.id)) errors.push(`${label} "${entry.id}": duplicate id`);
    seen.add(entry.id);
  });
}

function reuseTomlCovers(imagePath) {
  const reusePath = path.join(path.dirname(imagePath), 'REUSE.toml');
  if (!fs.existsSync(reusePath)) return false;
  return fs.readFileSync(reusePath, 'utf8').includes(`"${path.basename(imagePath)}"`);
}

function validateAgent(agent, context, errors) {
  const label = `Agent "${agent.id || '?'}"`;
  requireFields(agent, ['id', 'name', 'repository', 'role', 'description', 'expertise', 'assistants'], label, errors);

  if (agent.id && !KEBAB_CASE.test(agent.id)) errors.push(`${label}: id must be kebab-case`);
  [agent.repository, ...(agent.alsoIn || [])].forEach((repository) => {
    if (repository && !REPOSITORY_NAME.test(repository)) errors.push(`${label}: invalid repository "${repository}"`);
  });
  (agent.assistants || []).forEach((assistant) => {
    if (!context.assistants.has(assistant)) errors.push(`${label}: unknown assistant "${assistant}"`);
  });
  (agent.handsOverTo || []).forEach((id) => {
    if (!context.agentIds.has(id)) errors.push(`${label}: hands over to unknown agent "${id}"`);
    if (id === agent.id) errors.push(`${label}: hands over to itself`);
  });

  if (agent.team && !context.teamIds.has(agent.team)) errors.push(`${label}: unknown team "${agent.team}"`);
  if (!agent.team && !agent.image) errors.push(`${label}: an agent without a team needs an "image" for its card`);

  if (agent.image) {
    const imagePath = path.join(ROOT, 'static', agent.image);
    if (!agent.image.startsWith('/img/')) errors.push(`${label}: image must be a path under /static/img`);
    else if (!fs.existsSync(imagePath)) errors.push(`${label}: image not found at static${agent.image}`);
    else if (!reuseTomlCovers(imagePath)) errors.push(`${label}: no REUSE.toml entry for static${agent.image}`);
  }
}

function validateMcpServer(server, errors) {
  const label = `MCP server "${server.id || '?'}"`;
  requireFields(server, ['id', 'name', 'provider', 'origin', 'description', 'url', 'usedBy'], label, errors);
  if (server.id && !KEBAB_CASE.test(server.id)) errors.push(`${label}: id must be kebab-case`);
  if (server.origin && !['tractus-x', 'external'].includes(server.origin)) {
    errors.push(`${label}: origin must be "tractus-x" or "external"`);
  }
  if (server.url && !server.url.startsWith('https://')) errors.push(`${label}: url must use https`);
  (server.usedBy || []).forEach((usage, index) => {
    requireFields(usage, ['repository', 'note', 'url'], `${label} usedBy[${index}]`, errors);
  });
}

function validateAiData() {
  const errors = [];
  const context = {
    agentIds: new Set(agents.map((agent) => agent.id)),
    teamIds: new Set(agentTeams.map((team) => team.id)),
    assistants: new Set(Object.values(ASSISTANTS)),
  };

  checkUniqueIds(agents, 'Agent', errors);
  checkUniqueIds(agentTeams, 'Team', errors);
  checkUniqueIds(mcpServers, 'MCP server', errors);

  agents.forEach((agent) => validateAgent(agent, context, errors));
  agentTeams.forEach((team) => {
    requireFields(team, ['id', 'name', 'repository', 'description'], `Team "${team.id || '?'}"`, errors);
    if (!agents.some((agent) => agent.team === team.id)) errors.push(`Team "${team.id}": has no agents`);
  });
  mcpServers.forEach((server) => validateMcpServer(server, errors));

  return errors;
}

if (require.main === module) {
  const errors = validateAiData();
  if (errors.length > 0) {
    console.error(`❌ data/aiData.js has ${errors.length} problem(s):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }
  if (!silent) {
    console.log(`✅ data/aiData.js is valid: ${agents.length} agents, ${agentTeams.length} team(s), ${mcpServers.length} MCP server(s).`);
  }
}

module.exports = { validateAiData };
