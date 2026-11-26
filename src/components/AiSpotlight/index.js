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
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {
  agentTeams,
  agentProfileUrl,
  teamProfileUrl,
  getAiStatistics,
  getFeaturedAgents,
  getTeamMembers,
} from '@site/data/aiAgents';
import styles from './styles.module.scss';

function AgentTile({ to, name, repository, image }) {
  const src = useBaseUrl(image || '');
  return (
    <Link to={to} className={styles.tile}>
      {image ? (
        <img className={styles.avatar} src={src} alt="" loading="lazy" width="56" height="56" />
      ) : (
        <span className={`${styles.avatar} ${styles.avatarIcon}`} aria-hidden="true">
          <GroupsOutlinedIcon />
        </span>
      )}
      <span className={styles.tileText}>
        <span className={styles.tileName}>{name}</span>
        <code className={styles.tileRepo}>{repository}</code>
      </span>
    </Link>
  );
}

/**
 * Home page teaser for the AI section (/ai): what the agents are, live counts
 * from data/aiAgents.js and one tile per agent or agent team.
 */
export default function AiSpotlight() {
  const statistics = getAiStatistics();
  const stats = [
    { label: 'Agents', value: statistics.agents },
    { label: 'Repositories', value: statistics.repositories },
    { label: 'MCP servers', value: statistics.mcpServers },
  ];

  return (
    <section className={styles.spotlight} aria-labelledby="ai-spotlight-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <AutoAwesomeIcon className={styles.eyebrowIcon} />
            AI at Eclipse Tractus-X
          </span>
          <h2 id="ai-spotlight-title" className={styles.title}>
            Ask the agent that <span className={styles.accent}>knows the code</span>
          </h2>
          <p className={styles.lead}>
            Our repositories come with open-source AI agents for the connector, identity, the umbrella chart,
            Dataspace Management, the KITs and the Testlab. Open a repository in Claude Code or GitHub Copilot and
            ask them anything about the product.
          </p>
          <ul className={styles.stats}>
            {stats.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Link to="/ai/agents" className={`${styles.button} ${styles.buttonPrimary}`}>
              Meet the agents
              <ArrowForwardIcon className={styles.buttonIcon} />
            </Link>
            <Link to="/ai" className={`${styles.button} ${styles.buttonSecondary}`}>
              Explore AI
            </Link>
          </div>
        </div>

        <div className={styles.tiles}>
          {getFeaturedAgents().map((agent) => (
            <AgentTile
              key={agent.id}
              to={agentProfileUrl(agent)}
              name={agent.name}
              repository={agent.repository}
              image={agent.image}
            />
          ))}
          {agentTeams.map((team) => (
            <AgentTile
              key={team.id}
              to={teamProfileUrl(team)}
              name={`${team.name} (${getTeamMembers(team.id).length})`}
              repository={team.repository}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
