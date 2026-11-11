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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import {
  agentChatHint,
  agentChatUrl,
  agentDefinitionUrl,
  agentProfileUrl,
  teamAgentsFolderUrl,
  teamProfileUrl,
} from '@site/data/aiAgents';
import styles from './styles.module.scss';

// At most this many expertise tags on a card; the profile page shows all of them.
const CARD_TAGS = 3;

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

/** "Open agent": the agent definition (.agent.md) on GitHub, in a new tab. */
function OpenAgentLink({ href, label = 'Open agent', title }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <OpenInNewIcon className={styles.linkIcon} />
      {label}
    </a>
  );
}

/** Chat (GitHub agents tab) and the other actions, side by side at the bottom of a card. */
function CardActions({ agent, children }) {
  return (
    <div className={styles.links}>
      <a
        className={styles.chatLink}
        href={agentChatUrl(agent)}
        target="_blank"
        rel="noopener noreferrer"
        title={agentChatHint(agent)}
      >
        <ChatBubbleOutlineIcon className={styles.linkIcon} />
        Chat
      </a>
      {children}
    </div>
  );
}

/** Large card with the agent's picture on top; the details are on its profile page. */
export default function AgentCard({ agent }) {
  // Registers the card id so Docusaurus accepts /AI/agents#<id> links.
  useBrokenLinks().collectAnchor(agent.id);
  const image = useBaseUrl(agent.image);
  const profileUrl = agentProfileUrl(agent);

  return (
    <article id={agent.id} className={styles.card}>
      <Link to={profileUrl} className={styles.media} tabIndex={-1} aria-hidden="true">
        <img
          className={styles.image}
          src={image}
          alt=""
          width={720}
          height={720}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.repoBadge}>
          <GitHubIcon className={styles.repoBadgeIcon} />
          {agent.repository}
        </span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={profileUrl} className={styles.nameLink}>
            {agent.name}
          </Link>
        </h3>
        <p className={styles.role}>{agent.role}</p>
        {agent.motto && <p className={styles.motto}>“{agent.motto}”</p>}
        <Tags items={agent.expertise.slice(0, CARD_TAGS)} />

        <div className={styles.meta}>
          <Assistants assistants={agent.assistants} />
        </div>

        <CardActions agent={agent}>
          <Link className={styles.link} to={profileUrl}>
            <PersonOutlineIcon className={styles.linkIcon} />
            Profile
          </Link>
          <OpenAgentLink href={agentDefinitionUrl(agent)} title={`Opens ${agent.id}.agent.md on GitHub`} />
        </CardActions>
      </div>
    </article>
  );
}

/** Card for a team of agents that share a repository and have no pictures. */
export function AgentTeamCard({ team, members }) {
  useBrokenLinks().collectAnchor(team.id);
  const profileUrl = teamProfileUrl(team);

  return (
    <article id={team.id} className={styles.card}>
      <Link to={profileUrl} className={`${styles.media} ${styles.teamMedia}`} tabIndex={-1} aria-hidden="true">
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
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={profileUrl} className={styles.nameLink}>
            {team.name}
          </Link>
        </h3>
        <p className={styles.description}>{team.description}</p>

        <ul className={styles.members}>
          {members.map((member) => (
            <li key={member.id}>
              <Link className={styles.member} to={agentProfileUrl(member)} title={member.role}>
                <PersonOutlineIcon className={styles.memberIcon} />
                {member.name.replace(/^Testlab /, '')}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.meta}>
          <Assistants assistants={[...new Set(members.flatMap((member) => member.assistants))]} />
        </div>

        <CardActions agent={{ repository: team.repository, name: 'one of its agents' }}>
          <Link className={styles.link} to={profileUrl}>
            <GroupsOutlinedIcon className={styles.linkIcon} />
            Team profile
          </Link>
          <OpenAgentLink
            href={teamAgentsFolderUrl(team)}
            label="Open agents"
            title={`Opens the .github/agents folder of ${team.repository} on GitHub`}
          />
        </CardActions>
      </div>
    </article>
  );
}
