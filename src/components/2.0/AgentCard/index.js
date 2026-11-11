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
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { agentDefinitionUrl, getAgentById, repositoryUrl } from '@site/data/aiData';
import styles from './styles.module.scss';

function Tags({ items }) {
  return (
    <ul className={styles.tags} aria-label="Expertise">
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Assistants({ assistants }) {
  return (
    <p className={styles.assistants}>
      <span className={styles.metaLabel}>Works in</span>
      {assistants.map((assistant) => (
        <span key={assistant} className={styles.assistant}>
          {assistant}
        </span>
      ))}
    </p>
  );
}

function HandsOverTo({ ids }) {
  const crew = ids.map(getAgentById).filter(Boolean);
  if (crew.length === 0) return null;

  return (
    <p className={styles.handsOver}>
      <span className={styles.metaLabel}>Hands over to</span>
      {crew.map((member) => (
        <Link key={member.id} to={`/AI/agents#${member.id}`} className={styles.handsOverLink}>
          {member.name}
        </Link>
      ))}
    </p>
  );
}

function ExternalLink({ href, icon, children }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
      {icon}
      {children}
    </a>
  );
}

/** Large card with the agent's picture on top. */
export default function AgentCard({ agent }) {
  // Registers the card id so Docusaurus accepts /AI/agents#<id> links.
  useBrokenLinks().collectAnchor(agent.id);
  const image = useBaseUrl(agent.image);

  return (
    <article id={agent.id} className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={image}
          alt={`Picture of the ${agent.name} agent`}
          width={720}
          height={720}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.repoBadge}>
          <GitHubIcon className={styles.repoBadgeIcon} />
          {agent.repository}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{agent.name}</h3>
        <p className={styles.role}>{agent.role}</p>
        {agent.motto && <p className={styles.motto}>“{agent.motto}”</p>}
        <p className={styles.description}>{agent.description}</p>
        <Tags items={agent.expertise} />

        <div className={styles.meta}>
          <Assistants assistants={agent.assistants} />
          {agent.handsOverTo && <HandsOverTo ids={agent.handsOverTo} />}
        </div>

        <div className={styles.links}>
          <ExternalLink href={agentDefinitionUrl(agent)} icon={<DescriptionOutlinedIcon className={styles.linkIcon} />}>
            Agent definition
          </ExternalLink>
          <ExternalLink href={repositoryUrl(agent.repository)} icon={<GitHubIcon className={styles.linkIcon} />}>
            Repository
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}

/** Card for a team of agents that share a repository and have no pictures. */
export function AgentTeamCard({ team, members }) {
  useBrokenLinks().collectAnchor(team.id);

  return (
    <article id={team.id} className={styles.card}>
      <div className={`${styles.media} ${styles.teamMedia}`}>
        <div className={styles.teamGrid} aria-hidden="true">
          {members.map((member) => (
            <span key={member.id} className={styles.teamBadge}>
              <SmartToyOutlinedIcon className={styles.teamBadgeIcon} />
            </span>
          ))}
        </div>
        <span className={styles.teamCount}>{members.length} agents</span>
        <span className={styles.repoBadge}>
          <GitHubIcon className={styles.repoBadgeIcon} />
          {team.repository}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{team.name}</h3>
        <p className={styles.description}>{team.description}</p>

        <ul className={styles.members}>
          {members.map((member) => (
            <li key={member.id} id={member.id} className={styles.member}>
              <a
                className={styles.memberName}
                href={agentDefinitionUrl(member)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {member.name}
              </a>
              <span className={styles.memberRole}>{member.role}</span>
            </li>
          ))}
        </ul>

        <div className={styles.meta}>
          <Assistants assistants={[...new Set(members.flatMap((member) => member.assistants))]} />
        </div>

        <div className={styles.links}>
          <ExternalLink
            href={`${repositoryUrl(team.repository)}/tree/main/.github/agents`}
            icon={<DescriptionOutlinedIcon className={styles.linkIcon} />}
          >
            Agent definitions
          </ExternalLink>
          <ExternalLink href={repositoryUrl(team.repository)} icon={<GitHubIcon className={styles.linkIcon} />}>
            Repository
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}
