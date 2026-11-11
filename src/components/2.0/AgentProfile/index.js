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

// Profile page of one AI agent (/AI/agents/<id>). The route is added per agent by the
// ai-agent-profiles plugin in docusaurus.config.js, which passes the agent id.

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import {
  agents,
  agentTeams,
  ASSISTANTS,
  agentChatHint,
  agentChatUrl,
  agentDefinitionUrl,
  agentProfileUrl,
  getAgentById,
  getAgentProfile,
  repositoryUrl,
} from '@site/data/aiData';
import styles from './styles.module.scss';

function Portrait({ agent, className }) {
  const image = useBaseUrl(agent.image || '/');
  if (!agent.image) {
    return (
      <span className={clsx(styles.portrait, styles.portraitEmpty, className)} aria-hidden="true">
        <SmartToyOutlinedIcon />
      </span>
    );
  }
  return (
    <img
      className={clsx(styles.portrait, className)}
      src={image}
      alt={`Picture of the ${agent.name} agent`}
      width={720}
      height={720}
    />
  );
}

function Section({ icon, title, children, className }) {
  return (
    <section className={clsx(styles.section, className)}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function AgentChip({ agent }) {
  return (
    <Link to={agentProfileUrl(agent)} className={styles.agentChip}>
      <Portrait agent={agent} className={styles.agentChipImage} />
      <span className={styles.agentChipText}>
        <span className={styles.agentChipName}>{agent.name}</span>
        <span className={styles.agentChipRole}>{agent.repository}</span>
      </span>
      <ArrowForwardIcon className={styles.agentChipArrow} fontSize="small" />
    </Link>
  );
}

function AgentList({ title, list }) {
  if (list.length === 0) return null;
  return (
    <div className={styles.sideBlock}>
      <h3 className={styles.sideTitle}>{title}</h3>
      <div className={styles.agentChips}>
        {list.map((agent) => (
          <AgentChip key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

function StartIt({ agent }) {
  return (
    <div className={styles.sideBlock}>
      <h3 className={styles.sideTitle}>Run it locally</h3>
      {agent.assistants.includes(ASSISTANTS.CLAUDE_CODE) && (
        <>
          <p className={styles.sideText}>Claude Code, from a clone of the repository:</p>
          <CodeBlock language="bash">
            {`git clone ${repositoryUrl(agent.repository)}.git
cd ${agent.repository}
claude --agent ${agent.id}`}
          </CodeBlock>
        </>
      )}
      {agent.assistants.includes(ASSISTANTS.COPILOT) && (
        <p className={styles.sideText}>
          GitHub Copilot in VS Code: open the repository, open Copilot Chat in agent mode and pick{' '}
          <strong>{agent.name}</strong> in the agent picker.
        </p>
      )}
    </div>
  );
}

export default function AgentProfile({ agentId }) {
  const agent = getAgentById(agentId);
  const profile = getAgentProfile(agentId);
  const team = agent.team ? agentTeams.find((entry) => entry.id === agent.team) : null;

  const handsOverTo = (agent.handsOverTo || []).map(getAgentById).filter(Boolean);
  const calledBy = agents.filter((other) => (other.handsOverTo || []).includes(agent.id));
  const teammates = team ? agents.filter((other) => other.team === team.id && other.id !== agent.id) : [];

  const index = agents.findIndex((entry) => entry.id === agent.id);
  const previous = agents[(index - 1 + agents.length) % agents.length];
  const next = agents[(index + 1) % agents.length];

  return (
    <Layout title={`${agent.name} | AI Agents`} description={`${agent.name}: ${agent.role}. ${profile.mission}`}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/AI">AI</Link>
              <span aria-hidden="true">/</span>
              <Link to="/AI/agents">Agents</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{agent.name}</span>
            </nav>

            <div className={styles.heroGrid}>
              <Portrait agent={agent} className={styles.heroPortrait} />

              <div className={styles.heroText}>
                <span className={styles.repoChip}>
                  <GitHubIcon className={styles.repoChipIcon} />
                  eclipse-tractusx/{agent.repository}
                  {team && <span className={styles.teamTag}>{team.name}</span>}
                </span>
                <h1 className={styles.name}>{agent.name}</h1>
                <p className={styles.role}>{agent.role}</p>
                {agent.motto && <p className={styles.motto}>“{agent.motto}”</p>}

                <div className={styles.actions}>
                  <a
                    className={styles.chatButton}
                    href={agentChatUrl(agent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={agentChatHint(agent)}
                  >
                    <ChatBubbleOutlineIcon className={styles.buttonIcon} />
                    Chat on GitHub
                  </a>
                  <a className={styles.ghostButton} href={agentDefinitionUrl(agent)} target="_blank" rel="noopener noreferrer">
                    <DescriptionOutlinedIcon className={styles.buttonIcon} />
                    Agent definition
                  </a>
                  <a className={styles.ghostButton} href={repositoryUrl(agent.repository)} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className={styles.buttonIcon} />
                    Repository
                  </a>
                </div>
                <p className={styles.chatHint}>{agentChatHint(agent)}</p>

                <p className={styles.assistants}>
                  <span className={styles.metaLabel}>Works in</span>
                  {agent.assistants.map((assistant) => (
                    <span key={assistant} className={styles.assistant}>
                      {assistant}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Not a direct child of <main>: custom.css sets `main > * { max-width: 100% }`. */}
        <section className={styles.content}>
        <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.main}>
            <Section icon={<FlagOutlinedIcon />} title="Mission" className={styles.mission}>
              <p className={styles.missionText}>{profile.mission}</p>
            </Section>

            {profile.lore && (
              <Section icon={<AutoStoriesOutlinedIcon />} title="Lore">
                <p className={styles.text}>{profile.lore}</p>
              </Section>
            )}

            {profile.history && (
              <Section icon={<HistoryEduOutlinedIcon />} title="History">
                <p className={styles.text}>{profile.history}</p>
              </Section>
            )}

            <Section icon={<PsychologyOutlinedIcon />} title="Personality">
              {profile.quote && <blockquote className={styles.quote}>“{profile.quote}”</blockquote>}
              <ul className={styles.traits}>
                {profile.personality.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
            </Section>

            <Section icon={<BuildCircleOutlinedIcon />} title="Skills">
              <ul className={styles.skills}>
                {profile.skills.map((skill) => (
                  <li key={skill.name} className={styles.skill}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillText}>{skill.text}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <p className={styles.source}>
              From the agent&apos;s own definition,{' '}
              <a href={agentDefinitionUrl(agent)} target="_blank" rel="noopener noreferrer">
                <code>.github/agents/{agent.id}.agent.md</code>
              </a>
              .
            </p>
          </div>

          <aside className={styles.side}>
            <div className={styles.sideBlock}>
              <h3 className={styles.sideTitle}>Expertise</h3>
              <ul className={styles.tags}>
                {agent.expertise.map((topic) => (
                  <li key={topic} className={styles.tag}>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <AgentList title="Hands questions over to" list={handsOverTo} />
            <AgentList title="Gets questions from" list={calledBy} />
            <AgentList title={team ? `Also in the ${team.name}` : ''} list={teammates} />
            <StartIt agent={agent} />
          </aside>
        </div>

        <nav className={styles.pager} aria-label="Other agents">
          <Link to={agentProfileUrl(previous)} className={styles.pagerLink}>
            <ArrowBackIcon fontSize="small" />
            <span>
              <span className={styles.pagerLabel}>Previous agent</span>
              <span className={styles.pagerName}>{previous.name}</span>
            </span>
          </Link>
          <Link to="/AI/agents" className={styles.pagerAll}>
            All agents
          </Link>
          <Link to={agentProfileUrl(next)} className={clsx(styles.pagerLink, styles.pagerNext)}>
            <span>
              <span className={styles.pagerLabel}>Next agent</span>
              <span className={styles.pagerName}>{next.name}</span>
            </span>
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </nav>
        </div>
        </section>
      </main>
    </Layout>
  );
}
