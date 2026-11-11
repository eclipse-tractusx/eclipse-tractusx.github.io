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
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import AgentCard, { AgentTeamCard } from '@site/src/components/2.0/AgentCard';
import {
  agents,
  agentTeams,
  agentProfileUrl,
  getAiStatistics,
  getFeaturedAgents,
  getTeamMembers,
  repositoryUrl,
} from '@site/data/aiAgents';
import styles from '../styles.module.scss';

export default function AiAgentsPage() {
  const statistics = getAiStatistics();
  const featuredAgents = getFeaturedAgents();

  return (
    <Layout
      title="AI Agents"
      description="Meet the AI agents of Eclipse Tractus-X: open-source experts for the connector, the IdentityHub, the umbrella chart, Dataspace Management, the KITs and the Testlab."
    >
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="AI agents"
          title={
            <>
              Meet the <span className={styles.accent}>agents</span> of Eclipse Tractus-X
            </>
          }
          subtitle="Each agent lives in the repository it knows best, next to the code. Open the repository in Claude Code or GitHub Copilot and ask it anything about the product."
          stats={[
            { label: 'Agents', value: statistics.agents },
            { label: 'Repositories', value: statistics.repositories },
          ]}
        />

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.agentGrid}>
              {featuredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
              {agentTeams.map((team) => (
                <AgentTeamCard key={team.id} team={team} members={getTeamMembers(team.id)} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>At a glance</span>
              <h2 className={styles.sectionTitle}>All agents</h2>
              <p className={styles.sectionLead}>
                Every agent is defined in <code>.github/agents/&lt;id&gt;.agent.md</code> of its repository.
              </p>
            </header>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Agent</th>
                    <th scope="col">What it is</th>
                    <th scope="col">Repository</th>
                    <th scope="col">Works in</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td>
                        <Link to={agentProfileUrl(agent)}>{agent.name}</Link>
                      </td>
                      <td>{agent.role}</td>
                      <td>
                        {[agent.repository, ...(agent.alsoIn || [])].map((repository, index) => (
                          <React.Fragment key={repository}>
                            {index > 0 && ', '}
                            <a href={repositoryUrl(repository)} target="_blank" rel="noopener noreferrer">
                              <code>{repository}</code>
                            </a>
                          </React.Fragment>
                        ))}
                      </td>
                      <td>{agent.assistants.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
