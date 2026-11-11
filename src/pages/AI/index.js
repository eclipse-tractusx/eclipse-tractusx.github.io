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
import useBaseUrl from '@docusaurus/useBaseUrl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import {
  agentTeams,
  agentProfileUrl,
  getAgentById,
  getAiStatistics,
  getFeaturedAgents,
  getTeamMembers,
} from '@site/data/aiData';
import styles from './styles.module.scss';

// The agent that routes questions to the others, see its definition in dataspace-mgm-services.
const CREW_LEAD_ID = 'dataspace-captain';

const PRINCIPLES = [
  {
    icon: <FactCheckOutlinedIcon />,
    title: 'Grounded in the code',
    text: 'The agents answer from the code, configuration and specifications they open in the session, not from memory, and they cite the files they used.',
  },
  {
    icon: <GavelOutlinedIcon />,
    title: 'Release Guidelines built in',
    text: 'The KIT Master Builder and the Umbrella Guardian review changes against the Tractus-X Release Guidelines and cite the TRG with a fix.',
  },
  {
    icon: <RecordVoiceOverOutlinedIcon />,
    title: 'Open about being AI',
    text: 'When the agents with a picture write on GitHub, they post under their own avatar with an AI disclosure and name the person on whose behalf they act.',
  },
  {
    icon: <HubOutlinedIcon />,
    title: 'One crew',
    text: 'Each agent owns its product. The Dataspace Captain and the Identity Keeper hand questions about other products to the agent that owns them.',
  },
];

function AgentPortrait({ agent }) {
  const image = useBaseUrl(agent.image);
  return (
    <Link to={agentProfileUrl(agent)} className={styles.portrait}>
      <img className={styles.portraitImage} src={image} alt="" width={720} height={720} loading="lazy" />
      <span className={styles.portraitName}>{agent.name}</span>
      <span className={styles.portraitRepo}>{agent.repository}</span>
    </Link>
  );
}

function TeamPortrait({ team }) {
  const members = getTeamMembers(team.id);
  return (
    <Link to={`/AI/agents#${team.id}`} className={styles.portrait}>
      <span className={`${styles.portraitImage} ${styles.portraitTeam}`} aria-hidden="true">
        <SmartToyOutlinedIcon />
        {members.length}
      </span>
      <span className={styles.portraitName}>{team.name}</span>
      <span className={styles.portraitRepo}>{team.repository}</span>
    </Link>
  );
}

function CrewMember({ agent }) {
  const image = useBaseUrl(agent.image);
  return (
    <li>
      <Link to={agentProfileUrl(agent)} className={styles.crewMember}>
        <img className={styles.crewMemberImage} src={image} alt="" width={64} height={64} loading="lazy" />
        <span>
          <span className={styles.crewMemberName}>{agent.name}</span>
          <span className={styles.crewMemberTopics}>{agent.expertise.slice(0, 3).join(' · ')}</span>
        </span>
        <ArrowForwardIcon className={styles.crewArrow} fontSize="small" />
      </Link>
    </li>
  );
}

function Crew() {
  const lead = getAgentById(CREW_LEAD_ID);
  const leadImage = useBaseUrl(lead.image);
  const members = lead.handsOverTo.map(getAgentById).filter((agent) => agent && agent.image);

  return (
    <div className={`${styles.panel} ${styles.crew}`}>
      <div className={styles.crewLead}>
        <img
          className={styles.crewLeadImage}
          src={leadImage}
          alt={`Picture of the ${lead.name} agent`}
          width={300}
          height={300}
          loading="lazy"
        />
        <h3 className={styles.crewLeadName}>{lead.name}</h3>
        <p className={styles.crewLeadText}>
          Sees the whole chart: it answers the Dataspace Management part itself and calls the specialist that owns
          the product for everything deeper.
        </p>
      </div>
      <ul className={styles.crewMembers}>
        {members.map((agent) => (
          <CrewMember key={agent.id} agent={agent} />
        ))}
      </ul>
    </div>
  );
}

export default function AiOverviewPage() {
  const statistics = getAiStatistics();

  return (
    <Layout
      title="AI"
      description="AI at Eclipse Tractus-X: open-source AI agents that know the Tractus-X products, and the MCP servers they use."
    >
      <main className={styles.page}>
        <AiPageHeader
          eyebrow="AI at Eclipse Tractus-X"
          title={
            <>
              Open-source AI agents that know the <span className={styles.accent}>dataspace</span>
            </>
          }
          subtitle="Our repositories come with their own AI agents: experts on the connector, identity, the umbrella chart, Dataspace Management, the KITs and the Testlab. They live next to the code, are open source like it and work in Claude Code or GitHub Copilot."
          stats={[
            { label: 'Agents', value: statistics.agents },
            { label: 'Repositories', value: statistics.repositories },
            { label: 'AI assistants', value: statistics.assistants },
          ]}
          action={{ label: 'Why AI needs dataspaces', to: '/AI/dataspace-4-ai' }}
        />

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Meet the agents</span>
              <h2 className={styles.sectionTitle}>An expert for every product</h2>
              <p className={styles.sectionLead}>
                Each agent knows one repository inside out: its code, its specifications and its release history.
              </p>
            </header>
            <div className={styles.portraits}>
              {getFeaturedAgents().map((agent) => (
                <AgentPortrait key={agent.id} agent={agent} />
              ))}
              {agentTeams.map((team) => (
                <TeamPortrait key={team.id} team={team} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>How they work</span>
              <h2 className={styles.sectionTitle}>Built for open-source collaboration</h2>
            </header>
            <div className={styles.principles}>
              {PRINCIPLES.map((principle) => (
                <div key={principle.title} className={styles.panel}>
                  <span className={styles.iconTile}>{principle.icon}</span>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleText}>{principle.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>One crew</span>
              <h2 className={styles.sectionTitle}>Agents that call each other</h2>
              <p className={styles.sectionLead}>
                Ask the Dataspace Captain a question that belongs to another product, and it names the agent to ask and
                the exact question to ask it.
              </p>
            </header>
            <Crew />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Get started</span>
              <h2 className={styles.sectionTitle}>Talk to an agent in two minutes</h2>
              <p className={styles.sectionLead}>
                Clone the repository of the product you work on. The agent comes with it.
              </p>
            </header>
            <div className={styles.twoColumns}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.iconTile}>
                    <TerminalIcon />
                  </span>
                  <h3 className={styles.panelTitle}>Claude Code</h3>
                </div>
                <p className={styles.panelText}>
                  Start Claude Code with the agent from the repository root. The agent id is the file name of its
                  definition, for example <code>connector-sensei</code> or <code>umbrella-guardian</code>.
                </p>
                <CodeBlock language="bash">
                  {`git clone https://github.com/eclipse-tractusx/tractusx-edc.git
cd tractusx-edc
claude --agent connector-sensei`}
                </CodeBlock>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.iconTile}>
                    <ExtensionOutlinedIcon />
                  </span>
                  <h3 className={styles.panelTitle}>GitHub Copilot</h3>
                </div>
                <p className={styles.panelText}>
                  Open the repository in VS Code, open Copilot Chat in agent mode and select the agent in the agent
                  picker. Reload the window if it does not appear yet.
                </p>
                <ol className={styles.steps}>
                  <li>Open the repository in VS Code.</li>
                  <li>Open Copilot Chat and switch to agent mode.</li>
                  <li>Pick the agent, for example Connector Sensei, and ask your question.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.explore}>
              <Link to="/AI/agents" className={styles.exploreCard}>
                <span className={styles.iconTile}>
                  <SmartToyOutlinedIcon />
                </span>
                <span>
                  <span className={styles.exploreTitle}>All agents</span>
                  <span className={styles.exploreText}>What each agent knows and where to find it</span>
                </span>
                <ArrowForwardIcon className={styles.crewArrow} />
              </Link>
              <Link to="/AI/mcp-servers" className={styles.exploreCard}>
                <span className={styles.iconTile}>
                  <HubOutlinedIcon />
                </span>
                <span>
                  <span className={styles.exploreTitle}>MCP servers</span>
                  <span className={styles.exploreText}>The tools our agents connect to</span>
                </span>
                <ArrowForwardIcon className={styles.crewArrow} />
              </Link>
              <Link to="/AI/dataspace-4-ai" className={styles.exploreCard}>
                <span className={styles.iconTile}>
                  <ShareOutlinedIcon />
                </span>
                <span>
                  <span className={styles.exploreTitle}>Dataspace 4 AI</span>
                  <span className={styles.exploreText}>Why AI needs data shared with trust</span>
                </span>
                <ArrowForwardIcon className={styles.crewArrow} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.cta}>
              <span className={styles.iconTile}>
                <GroupsOutlinedIcon />
              </span>
              <div>
                <h2 className={styles.ctaTitle}>Bring your repository&apos;s agent</h2>
                <p className={styles.ctaText}>
                  Does your Tractus-X repository have an agent? Show it here, so the community can find it.
                </p>
                <ol className={styles.steps}>
                  <li>
                    Put the agent definition and its picture in <code>.github/agents/</code> of your repository, with a{' '}
                    <code>REUSE.toml</code> for the picture.
                  </li>
                  <li>
                    Add the agent to <code>data/aiData.js</code> of this website and a 720×720 WebP of its picture to{' '}
                    <code>static/img/ai/agents/</code>.
                  </li>
                  <li>
                    Run <code>npm run validate:ai</code> and open a pull request.
                  </li>
                </ol>
                <div className={styles.actions}>
                  <a
                    className={styles.buttonPrimary}
                    href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/data/aiData.js"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open data/aiData.js
                  </a>
                  <Link className={styles.buttonSecondary} to="/community/open-meetings">
                    Join an open meeting
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
