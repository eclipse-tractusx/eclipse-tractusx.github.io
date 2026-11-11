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

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import { mcpServers } from '@site/data/aiData';
import styles from '../styles.module.scss';

const MCP_URL = 'https://modelcontextprotocol.io/';
const MCP_BUILD_SERVER_URL = 'https://modelcontextprotocol.io/docs/develop/build-server';
const VSCODE_MCP_DOCS_URL = 'https://code.visualstudio.com/docs/copilot/customization/mcp-servers';
const CLAUDE_CODE_MCP_DOCS_URL = 'https://code.claude.com/docs/en/mcp';

const ORIGIN_LABELS = {
  'tractus-x': 'Eclipse Tractus-X',
  external: 'Third party',
};

function McpFlow() {
  return (
    <div className={styles.flow}>
      <div className={styles.flowNode}>
        <span className={styles.iconTile}>
          <SmartToyOutlinedIcon />
        </span>
        <span className={styles.flowTitle}>AI agent</span>
        <span className={styles.flowText}>in Claude Code, GitHub Copilot or another MCP client</span>
      </div>
      <span className={styles.flowArrow} aria-hidden="true">
        <ArrowForwardIcon />
      </span>
      <div className={clsx(styles.flowNode, styles.flowNodeHighlight)}>
        <span className={styles.iconTile}>
          <HubOutlinedIcon />
        </span>
        <span className={styles.flowTitle}>MCP server</span>
        <span className={styles.flowText}>offers tools, data and prompts through one standard protocol</span>
      </div>
      <span className={styles.flowArrow} aria-hidden="true">
        <ArrowForwardIcon />
      </span>
      <div className={styles.flowNode}>
        <span className={styles.iconTile}>
          <StorageOutlinedIcon />
        </span>
        <span className={styles.flowTitle}>Systems</span>
        <span className={styles.flowText}>code analysis, APIs, databases, a running dataspace</span>
      </div>
    </div>
  );
}

function McpServerCard({ server }) {
  return (
    <article className={clsx(styles.panel, styles.serverCard)}>
      <header className={styles.serverHeader}>
        <span className={styles.iconTile}>
          <HubOutlinedIcon />
        </span>
        <div>
          <h3 className={styles.serverName}>{server.name}</h3>
          <p className={styles.serverProvider}>by {server.provider}</p>
        </div>
        <span className={styles.originBadge}>{ORIGIN_LABELS[server.origin]}</span>
      </header>

      <p className={styles.serverText}>{server.description}</p>
      {server.license && <p className={styles.serverMeta}>License: {server.license}</p>}

      {server.usedBy.map((usage) => (
        <p key={usage.repository} className={styles.usedBy}>
          <span className={styles.usedByLabel}>Used in {usage.repository}</span>
          {usage.note}{' '}
          <a href={usage.url} target="_blank" rel="noopener noreferrer">
            See how
          </a>
        </p>
      ))}

      <div className={styles.actions}>
        <a className={styles.buttonSecondary} href={server.url} target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon className={styles.buttonIcon} />
          Open the server
        </a>
      </div>
    </article>
  );
}

function TractusXServers({ servers }) {
  if (servers.length > 0) {
    return (
      <div className={styles.serverGrid}>
        {servers.map((server) => (
          <McpServerCard key={server.id} server={server} />
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(styles.panel, styles.empty)}>
      <span className={styles.iconTile}>
        <ConstructionOutlinedIcon />
      </span>
      <h3 className={styles.ctaTitle}>
        No Tractus-X MCP server yet
      </h3>
      <p className={styles.ctaText}>
        No Eclipse Tractus-X repository publishes its own MCP server today. An MCP server could give any AI assistant
        direct, standard access to a Tractus-X product. If you are building one, tell the community and list it here.
      </p>
      <div className={styles.actions}>
        <a className={styles.buttonPrimary} href={MCP_BUILD_SERVER_URL} target="_blank" rel="noopener noreferrer">
          Build an MCP server
        </a>
        <Link className={styles.buttonSecondary} to="/community/open-meetings">
          Join an open meeting
        </Link>
      </div>
    </div>
  );
}

export default function AiMcpServersPage() {
  const tractusXServers = mcpServers.filter((server) => server.origin === 'tractus-x');
  const externalServers = mcpServers.filter((server) => server.origin === 'external');

  return (
    <Layout
      title="MCP Servers"
      description="The Model Context Protocol (MCP) servers used by the Eclipse Tractus-X AI agents, and how to connect one in Claude Code or GitHub Copilot."
    >
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="MCP servers"
          title={
            <>
              Connect our agents to <span className={styles.accent}>your tools</span>
            </>
          }
          subtitle="MCP servers give AI agents standard access to tools and data. Here are the servers our agents use today and how to connect one yourself."
        />

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>The basics</span>
              <h2 className={styles.sectionTitle}>What is MCP?</h2>
              <p className={styles.sectionLead}>
                The{' '}
                <a href={MCP_URL} target="_blank" rel="noopener noreferrer">
                  Model Context Protocol
                </a>{' '}
                is an open-source standard for connecting AI applications to external systems. An MCP server offers
                tools and data once, and every MCP client (Claude Code, GitHub Copilot and many more) can use them.
              </p>
            </header>
            <McpFlow />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>In use</span>
              <h2 className={styles.sectionTitle}>MCP servers our agents use</h2>
              <p className={styles.sectionLead}>Servers that agents in Tractus-X repositories are configured to call.</p>
            </header>
            <div className={styles.serverGrid}>
              {externalServers.map((server) => (
                <McpServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>From the community</span>
              <h2 className={styles.sectionTitle}>Eclipse Tractus-X MCP servers</h2>
            </header>
            <TractusXServers servers={tractusXServers} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>How to</span>
              <h2 className={styles.sectionTitle}>Connect an MCP server</h2>
              <p className={styles.sectionLead}>
                Add a server once per repository, so everyone who opens it gets the same tools.
              </p>
            </header>
            <div className={styles.twoColumns}>
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>GitHub Copilot in VS Code</h3>
                <p className={styles.note}>
                  Add the server to <code>.vscode/mcp.json</code> in the workspace.{' '}
                  <a href={VSCODE_MCP_DOCS_URL} target="_blank" rel="noopener noreferrer">
                    VS Code documentation
                  </a>
                </p>
                <p className={styles.codeLabel}>
                  .vscode/mcp.json
                </p>
                <CodeBlock language="json">
                  {`{
  "servers": {
    "<server-name>": {
      "type": "stdio",
      "command": "<command>",
      "args": ["<argument>"]
    }
  }
}`}
                </CodeBlock>
              </div>
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Claude Code</h3>
                <p className={styles.note}>
                  Add the server with the CLI. With <code>--scope project</code> it is saved in <code>.mcp.json</code>{' '}
                  at the repository root, under <code>mcpServers</code>.{' '}
                  <a href={CLAUDE_CODE_MCP_DOCS_URL} target="_blank" rel="noopener noreferrer">
                    Claude Code documentation
                  </a>
                </p>
                <p className={styles.codeLabel}>
                  Terminal
                </p>
                <CodeBlock language="bash">
                  {`claude mcp add --transport http \\
  <server-name> <url> \\
  --scope project`}
                </CodeBlock>
              </div>
            </div>
            <p className={styles.note}>
              Never commit tokens or other secrets in these files. Pass them in from your environment, as the
              documentation of each client describes.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
