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

// Profile page of a team of agents (/AI/agents/<team id>), e.g. the Testlab AI team:
// the team, how it works together, and every member with its mission, personality and
// skills. The route is added per team by the ai-agent-profiles plugin in docusaurus.config.js.

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import {
  agentChatHint,
  agentChatUrl,
  agentDefinitionUrl,
  agentProfileUrl,
  agentTeams,
  getTeamMembers,
  repositoryUrl,
  teamAgentsFolderUrl,
} from '@site/data/aiAgents';
import profileStyles from '../AgentProfile/styles.module.scss';
import styles from './styles.module.scss';

function MemberCard({ member }) {
  // Registers the member id so the workflow's #<id> links pass the broken-anchor check.
  useBrokenLinks().collectAnchor(member.id);
  const { profile } = member;
  return (
    <article id={member.id} className={styles.member}>
      <header className={styles.memberHead}>
        <span className={styles.memberAvatar} aria-hidden="true">
          <SmartToyOutlinedIcon />
        </span>
        <div className={styles.memberHeading}>
          <h3 className={styles.memberName}>
            <Link to={agentProfileUrl(member)}>{member.name}</Link>
          </h3>
          <p className={styles.memberRole}>{member.role}</p>
        </div>
      </header>

      {member.motto && <p className={styles.motto}>“{member.motto}”</p>}

      <div className={styles.memberGrid}>
        <div>
          <h4 className={styles.label}>Mission</h4>
          <p className={styles.text}>{profile.mission}</p>
          {profile.lore && (
            <>
              <h4 className={styles.label}>Lore</h4>
              <p className={styles.text}>{profile.lore}</p>
            </>
          )}
        </div>
        <div>
          <h4 className={styles.label}>Personality</h4>
          <ul className={styles.traits}>
            {profile.personality.map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
        </div>
      </div>

      <h4 className={styles.label}>Skills</h4>
      <ul className={styles.skills}>
        {profile.skills.map((skill) => (
          <li key={skill.name} className={styles.skill} title={skill.text}>
            {skill.name}
          </li>
        ))}
      </ul>

      <div className={styles.memberActions}>
        <Link className={styles.action} to={agentProfileUrl(member)}>
          <PersonOutlineIcon className={styles.actionIcon} />
          Full profile
        </Link>
        <a
          className={styles.action}
          href={agentDefinitionUrl(member)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Opens ${member.id}.agent.md on GitHub`}
        >
          <OpenInNewIcon className={styles.actionIcon} />
          Open agent
        </a>
      </div>
    </article>
  );
}

export default function AgentTeamProfile({ teamId }) {
  const team = agentTeams.find((entry) => entry.id === teamId);
  const members = getTeamMembers(team.id);
  const lead = members.find((member) => member.id === team.lead);
  const chatTarget = { repository: team.repository, name: 'one of its agents' };

  return (
    <Layout title={`${team.name} | AI Agents`} description={team.description}>
      <main className={profileStyles.page}>
        <section className={profileStyles.hero}>
          <div className={profileStyles.container}>
            <nav className={profileStyles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/AI">AI</Link>
              <span aria-hidden="true">/</span>
              <Link to="/AI/agents">Agents</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{team.name}</span>
            </nav>

            <div className={profileStyles.heroGrid}>
              <div className={clsx(profileStyles.portrait, profileStyles.heroPortrait, styles.teamPortrait)} aria-hidden="true">
                {members.map((member) => (
                  <span key={member.id} className={styles.teamBadge}>
                    <SmartToyOutlinedIcon />
                  </span>
                ))}
              </div>

              <div className={profileStyles.heroText}>
                <span className={profileStyles.repoChip}>
                  <GitHubIcon className={profileStyles.repoChipIcon} />
                  eclipse-tractusx/{team.repository}
                  <span className={profileStyles.teamTag}>{members.length} agents</span>
                </span>
                <h1 className={profileStyles.name}>{team.name}</h1>
                <p className={profileStyles.role}>{team.description}</p>

                <div className={profileStyles.actions}>
                  <a
                    className={profileStyles.chatButton}
                    href={agentChatUrl(chatTarget)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={agentChatHint(chatTarget)}
                  >
                    <ChatBubbleOutlineIcon className={profileStyles.buttonIcon} />
                    Chat on GitHub
                  </a>
                  <a
                    className={profileStyles.ghostButton}
                    href={teamAgentsFolderUrl(team)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Opens the .github/agents folder of ${team.repository} on GitHub`}
                  >
                    <OpenInNewIcon className={profileStyles.buttonIcon} />
                    Open agents
                  </a>
                  <a className={profileStyles.ghostButton} href={repositoryUrl(team.repository)} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className={profileStyles.buttonIcon} />
                    Repository
                  </a>
                </div>
                <p className={profileStyles.chatHint}>{agentChatHint(chatTarget)}</p>

                <p className={profileStyles.assistants}>
                  <span className={profileStyles.metaLabel}>Works in</span>
                  {[...new Set(members.flatMap((member) => member.assistants))].map((assistant) => (
                    <span key={assistant} className={profileStyles.assistant}>
                      {assistant}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Not a direct child of <main>: custom.css sets `main > * { max-width: 100% }`. */}
        <section className={profileStyles.content}>
          <div className={profileStyles.container}>
            {team.workflow && (
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>
                  <GroupsOutlinedIcon className={styles.blockIcon} />
                  How the team works
                </h2>
                <ol className={styles.flow}>
                  {team.workflow.map((step) => {
                    const agent = members.find((member) => member.id === step.agent);
                    return (
                      <li key={step.title} className={styles.flowStep}>
                        <span className={styles.flowTitle}>{step.title}</span>
                        <span className={styles.flowText}>{step.text}</span>
                        {agent && (
                          <a href={`#${agent.id}`} className={styles.flowAgent}>
                            {agent.name}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ol>
                {lead && (
                  <p className={styles.note}>
                    The {lead.name} is the default agent for complex tasks: it plans with the Architect, delegates to the
                    specialists and reviews what they deliver.
                  </p>
                )}
              </section>
            )}

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>
                <PersonOutlineIcon className={styles.blockIcon} />
                Meet the team
              </h2>
              <div className={styles.members}>
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>

            <nav className={styles.back} aria-label="Other agents">
              <Link to="/AI/agents" className={profileStyles.pagerAll}>
                All agents
                <ArrowForwardIcon fontSize="small" />
              </Link>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}
