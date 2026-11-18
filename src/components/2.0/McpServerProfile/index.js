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

// Detail page of one MCP server (/ai/mcp-servers/<id>): what it is, its tools, how it
// behaves and how to connect it. The route is added per available server with `details`
// by the ai-agent-profiles plugin in docusaurus.config.js.

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getMcpServerById, hasMcpServerDetails, mcpServerDetailsUrl, mcpServers, repositoryUrl } from '@site/data/aiAgents';
import profileStyles from '../AgentProfile/styles.module.scss';
import styles from './styles.module.scss';

const ORIGIN_LABELS = {
  'tractus-x': 'Eclipse Tractus-X',
  external: 'Third party',
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'read', label: 'Read-only' },
  { id: 'write', label: 'Write' },
];

function Section({ icon, title, lead, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={profileStyles.sectionIcon}>{icon}</span>
        {title}
      </h2>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
      {children}
    </section>
  );
}

function ToolCard({ tool }) {
  return (
    <li className={clsx(styles.tool, tool.write && styles.toolWrite)}>
      <div className={styles.toolHead}>
        <code className={styles.toolName}>{tool.name}</code>
        <span className={clsx(styles.toolKind, tool.write ? styles.kindWrite : styles.kindRead)}>
          {tool.write ? <EditOutlinedIcon /> : <VisibilityOutlinedIcon />}
          {tool.write ? 'Write' : 'Read'}
        </span>
      </div>
      <p className={styles.toolText}>{tool.text}</p>
      {tool.usedBy && <span className={styles.toolUsedBy}>Used by {tool.usedBy}</span>}
    </li>
  );
}

function Tools({ details }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const needle = query.trim().toLowerCase();
  const matches = (tool) =>
    (filter === 'all' || (filter === 'write') === Boolean(tool.write)) &&
    (!needle || tool.name.toLowerCase().includes(needle) || tool.text.toLowerCase().includes(needle));
  const groups = details.toolGroups
    .map((group) => ({ ...group, tools: group.tools.filter(matches) }))
    .filter((group) => group.tools.length > 0);

  return (
    <>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools"
            aria-label="Search tools"
          />
        </label>
        <div className={styles.filters} role="group" aria-label="Filter tools">
          {FILTERS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={clsx(styles.filter, filter === entry.id && styles.filterActive)}
              aria-pressed={filter === entry.id}
              onClick={() => setFilter(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 && <p className={styles.noTools}>No tool matches your search.</p>}
      {groups.map((group) => (
        <div key={group.title} className={styles.toolGroup}>
          <h3 className={styles.toolGroupTitle}>
            {group.title}
            <span className={styles.toolCount}>{group.tools.length}</span>
          </h3>
          {group.text && <p className={styles.toolGroupText}>{group.text}</p>}
          <ul className={styles.toolGrid}>
            {group.tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </ul>
        </div>
      ))}
      {details.toolsNote && <p className={styles.toolsNote}>{details.toolsNote}</p>}
    </>
  );
}

export default function McpServerProfile({ serverId }) {
  const server = getMcpServerById(serverId);
  const { details } = server;
  const tools = details.toolGroups.flatMap((group) => group.tools);
  const writeTools = tools.filter((tool) => tool.write).length;
  const others = mcpServers.filter((entry) => hasMcpServerDetails(entry) && entry.id !== server.id);

  return (
    <Layout title={`${server.name} | MCP Servers`} description={`${server.name} by ${server.provider}. ${server.description}`}>
      <main className={profileStyles.page}>
        <section className={profileStyles.hero}>
          <div className={profileStyles.container}>
            <nav className={profileStyles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/ai">AI</Link>
              <span aria-hidden="true">/</span>
              <Link to="/ai/mcp-servers">MCP Servers</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{server.name}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={profileStyles.heroText}>
                <span className={profileStyles.repoChip}>
                  <HubOutlinedIcon className={profileStyles.repoChipIcon} />
                  MCP server · {ORIGIN_LABELS[server.origin]}
                </span>
                <h1 className={profileStyles.name}>{server.name}</h1>
                <p className={profileStyles.role}>by {server.provider}</p>
                <p className={styles.heroText}>{server.description}</p>

                <ul className={styles.stats}>
                  <li>
                    <span className={styles.statValue}>{tools.length}</span>
                    <span className={styles.statLabel}>tools listed</span>
                  </li>
                  <li>
                    <span className={styles.statValue}>{tools.length - writeTools}</span>
                    <span className={styles.statLabel}>read-only</span>
                  </li>
                  <li>
                    <span className={styles.statValue}>{writeTools}</span>
                    <span className={styles.statLabel}>write</span>
                  </li>
                </ul>

                <div className={profileStyles.actions}>
                  <a className={profileStyles.chatButton} href={server.url} target="_blank" rel="noopener noreferrer">
                    <OpenInNewIcon className={profileStyles.buttonIcon} />
                    {server.origin === 'tractus-x' ? 'Read the guide' : 'Open the server'}
                  </a>
                  {server.repository && (
                    <a
                      className={profileStyles.ghostButton}
                      href={repositoryUrl(server.repository)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon className={profileStyles.buttonIcon} />
                      Repository
                    </a>
                  )}
                </div>
              </div>

              <dl className={styles.facts}>
                {details.facts.map((fact) => (
                  <div key={fact.label} className={styles.fact}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
                {server.license && (
                  <div className={styles.fact}>
                    <dt>License</dt>
                    <dd>{server.license}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </section>

        {/* Not a direct child of <main>: custom.css sets `main > * { max-width: 100% }`. */}
        <section className={profileStyles.content}>
          <div className={profileStyles.container}>
            <div className={profileStyles.body}>
              <div className={profileStyles.main}>
                <Section icon={<HubOutlinedIcon />} title="Tools" lead="The tools an AI agent can call through this server.">
                  <Tools details={details} />
                </Section>

                {details.features && details.features.length > 0 && (
                  <Section icon={<ShieldOutlinedIcon />} title="How it works">
                    <div className={styles.features}>
                      {details.features.map((feature) => (
                        <div key={feature.title} className={styles.feature}>
                          <h3 className={styles.featureTitle}>{feature.title}</h3>
                          <p className={styles.featureText}>{feature.text}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                <Section icon={<CableOutlinedIcon />} title="Connect it">
                  {details.setup.map((step) => (
                    <div key={step.title} className={styles.setup}>
                      <h3 className={styles.setupTitle}>{step.title}</h3>
                      {step.text && <p className={styles.setupText}>{step.text}</p>}
                      <CodeBlock language={step.language}>{step.code}</CodeBlock>
                    </div>
                  ))}
                </Section>
              </div>

              <aside className={profileStyles.side}>
                <div className={profileStyles.sideBlock}>
                  <h3 className={profileStyles.sideTitle}>Links</h3>
                  <ul className={styles.links}>
                    {details.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                          <OpenInNewIcon fontSize="inherit" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {server.usedBy && server.usedBy.length > 0 && (
                  <div className={profileStyles.sideBlock}>
                    <h3 className={profileStyles.sideTitle}>Used in Tractus-X</h3>
                    {server.usedBy.map((usage) => (
                      <p key={usage.repository} className={profileStyles.sideText}>
                        <strong>{usage.repository}</strong>: {usage.note}{' '}
                        <a href={usage.url} target="_blank" rel="noopener noreferrer">
                          See how
                        </a>
                      </p>
                    ))}
                  </div>
                )}
                {others.length > 0 && (
                  <div className={profileStyles.sideBlock}>
                    <h3 className={profileStyles.sideTitle}>Other MCP servers</h3>
                    <div className={profileStyles.agentChips}>
                      {others.map((other) => (
                        <Link key={other.id} to={mcpServerDetailsUrl(other)} className={profileStyles.agentChip}>
                          <span className={styles.chipIcon} aria-hidden="true">
                            <HubOutlinedIcon />
                          </span>
                          <span className={profileStyles.agentChipText}>
                            <span className={profileStyles.agentChipName}>{other.name}</span>
                            <span className={profileStyles.agentChipRole}>{other.provider}</span>
                          </span>
                          <ArrowForwardIcon className={profileStyles.agentChipArrow} fontSize="small" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            <nav className={styles.back} aria-label="MCP servers">
              <Link to="/ai/mcp-servers" className={profileStyles.pagerAll}>
                <ArrowBackIcon fontSize="inherit" /> All MCP servers
              </Link>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}
