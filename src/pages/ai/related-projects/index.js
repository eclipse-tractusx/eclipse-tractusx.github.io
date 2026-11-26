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
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeveloperModeOutlinedIcon from '@mui/icons-material/DeveloperModeOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import styles from '../styles.module.scss';
import projectStyles from './styles.module.scss';

// Topics an AI project can pick up and work on together with the community.
const TOPICS = [
  {
    icon: <ForumOutlinedIcon />,
    title: 'A2A trusted communication',
    size: 'feature',
    text: 'Let agents from different companies talk to each other (agent-to-agent) with verified identities, signed messages and usage policies, over the dataspace.',
  },
  {
    icon: <LayersOutlinedIcon />,
    title: 'Semantics and data layers',
    size: 'wide',
    text: 'Use shared semantic models and the digital twin layer so AI understands what the data means, not only what it looks like.',
  },
  {
    icon: <BuildOutlinedIcon />,
    title: 'Skills and tools',
    text: 'Build reusable agent skills and MCP tools that work on Tractus-X components and can be shared across repositories.',
  },
  {
    icon: <CodeOutlinedIcon />,
    title: 'SDKs',
    text: 'Make it easy to connect AI applications to the dataspace with libraries for discovery, contract negotiation and data transfer.',
  },
  {
    icon: <FactCheckOutlinedIcon />,
    title: 'TCKs',
    text: 'Write Technology Compatibility Kits that test whether AI services and agents follow the shared standards, so partners can trust them.',
  },
  {
    icon: <LightbulbOutlinedIcon />,
    title: 'AI best practices',
    text: 'Collect and share what works: prompt and agent design, evaluation, security reviews and how to document AI in a KIT.',
  },
  {
    icon: <DeveloperModeOutlinedIcon />,
    title: 'AI development',
    text: 'Use AI to build Tractus-X itself: coding agents that know the repositories, review changes and follow the release guidelines.',
  },
  {
    icon: <ScienceOutlinedIcon />,
    title: 'Federated learning and compute-to-data',
    text: 'Train and run models where the data lives, so partners can join forces on AI without handing over their raw data.',
  },
  {
    icon: <BalanceOutlinedIcon />,
    title: 'Responsible and compliant AI',
    size: 'banner',
    text: 'Explore traceability, transparency and audit trails that help AI services meet regulation such as the EU AI Act.',
  },
];

// What a project gains when it joins Eclipse Tractus-X.
const MOTIVES = [
  {
    icon: <HubOutlinedIcon />,
    title: 'Start from a running dataspace',
    text: 'Build on open, ready-to-use components for sovereign data exchange, such as the connector and identity services, instead of building the base yourself.',
  },
  {
    icon: <ShieldOutlinedIcon />,
    title: 'Data sovereignty built in',
    text: 'Usage policies and verifiable identities let partners share data for AI training and inference while keeping control over how it is used.',
  },
  {
    icon: <GavelOutlinedIcon />,
    title: 'Vendor-neutral governance',
    text: 'Development happens in the open under the Eclipse Foundation, so no single company owns the roadmap and every contributor plays by the same rules.',
  },
  {
    icon: <VerifiedOutlinedIcon />,
    title: 'Quality you can rely on',
    text: 'The Tractus-X Release Guidelines (TRGs) set shared standards for code, documentation, security and licensing across every repository.',
  },
  {
    icon: <MenuBookOutlinedIcon />,
    title: 'KITs that speed up adoption',
    text: 'Document your AI solution as a KIT, the format the community uses to explain use cases to developers, operators and business users.',
  },
  {
    icon: <Diversity3OutlinedIcon />,
    title: 'A community that works together',
    text: 'Meet companies, research partners and developers in open meetings and office hours, and find partners for your next step.',
  },
  {
    icon: <PublicOutlinedIcon />,
    title: 'Results that reach further',
    text: 'Open-source results under Apache-2.0 (code) and CC-BY-4.0 (documentation) can be reused across companies, sectors and countries, well beyond one consortium.',
  },
  {
    icon: <RocketLaunchOutlinedIcon />,
    title: 'Visibility for your work',
    text: 'Get your project listed here, next to the Tractus-X AI agents and MCP servers, in front of the people building the ecosystem.',
  },
];

// Why AI projects should build on one shared core instead of separate stacks.
const CORE_REASONS = [
  {
    icon: <SyncAltOutlinedIcon />,
    title: 'Interoperable from day one',
    text: 'Projects on the same connector, identity and policy model can exchange data and AI services with each other without custom bridges.',
  },
  {
    icon: <HandshakeOutlinedIcon />,
    title: 'Maintained together',
    text: 'Fixes, security updates and new features land once in the core and benefit every project, so nobody carries the load alone.',
  },
  {
    icon: <VisibilityOutlinedIcon />,
    title: 'Trust through openness',
    text: 'Open code and open discussions let partners, auditors and users see how data and AI services are handled.',
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Focus on what makes you unique',
    text: 'With the base shared, your team can spend its time on models, agents and use cases instead of plumbing.',
  },
];

export default function RelatedProjects() {
  useBrokenLinks().collectAnchor('add-your-project');

  return (
    <Layout
      title="Related Projects | AI"
      description="Add your IPCEI AI project to Eclipse Tractus-X, join the community and build on the same open core."
    >
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="AI · Related Projects"
          title={<>Building AI, <span className={styles.accent}>together.</span></>}
          subtitle="A home for IPCEI AI projects and other AI initiatives in Eclipse Tractus-X. Join the community, share the same core and help shape what comes next."
          action={{ to: '#add-your-project', label: 'Add your IPCEI AI project', primary: true }}
        />

        <section className={styles.section} aria-labelledby="projects-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Community showcase</span>
              <h2 id="projects-heading" className={styles.sectionTitle}>Space for what&apos;s next</h2>
              <p className={styles.sectionLead}>
                Room for AI projects that build on Eclipse Tractus-X. These cards mark possible projects open
                for collaboration, not announced projects or release commitments.
              </p>
            </div>
            <div className={projectStyles.grid}>
              {[1, 2, 3, 4, 5].map((slot) => (
                <article key={slot} className={clsx(styles.panel, projectStyles.placeholder)}>
                  <div className={projectStyles.cardHeader}>
                    <span className={styles.iconTile} aria-hidden="true"><HandshakeOutlinedIcon /></span>
                    <span className={projectStyles.badge}>Open for collaboration</span>
                  </div>
                  <div className={projectStyles.redacted} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 className={styles.principleTitle}>Possible project · 0{slot}</h3>
                  <p className={styles.principleText}>
                    A slot for an IPCEI AI project or another Eclipse Tractus-X AI initiative. Details will
                    appear here once a project joins.
                  </p>
                </article>
              ))}
              <Link
                to="#add-your-project"
                className={clsx(styles.panel, projectStyles.placeholder, projectStyles.addCard)}
              >
                <span className={projectStyles.addIcon} aria-hidden="true"><AddRoundedIcon /></span>
                <h3 className={styles.principleTitle}>Add your project here</h3>
                <p className={styles.principleText}>
                  Working on AI in Eclipse Tractus-X? This space is open for your project.
                </p>
                <span className={projectStyles.addCta}>
                  Get involved <ArrowForwardRoundedIcon aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section id="shared-core" className={clsx(styles.section, projectStyles.coreSection)} aria-labelledby="shared-core-heading">
          <div className={styles.container}>
            <div className={clsx(styles.sectionHeader, projectStyles.centeredHeader)}>
              <span className={styles.sectionEyebrow}>One shared core</span>
              <h2 id="shared-core-heading" className={styles.sectionTitle}>Why we should build on the same core</h2>
              <p className={styles.sectionLead}>
                When every AI project builds its own data-exchange stack, the result is islands that cannot talk to
                each other. A shared core turns separate projects into one ecosystem.
              </p>
            </div>
            <div className={projectStyles.hub}>
              <ul className={clsx(projectStyles.hubSide, projectStyles.hubLeft)}>
                {CORE_REASONS.slice(0, 2).map((item) => (
                  <li key={item.title} className={projectStyles.hubReason}>
                    <span className={projectStyles.gainIcon} aria-hidden="true">{item.icon}</span>
                    <h3 className={projectStyles.gainTitle}>{item.title}</h3>
                    <p className={projectStyles.gainText}>{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className={projectStyles.hubCore}>
                <div className={projectStyles.hubRing} aria-hidden="true" />
                <div className={projectStyles.hubCenter}>
                  <span className={projectStyles.hubLabel}>Tractus-X</span>
                  <span className={projectStyles.hubName}>shared core</span>
                  <ul className={projectStyles.hubParts}>
                    <li>Connector</li>
                    <li>Identity</li>
                    <li>Usage policies</li>
                    <li>Semantic models</li>
                    <li>KITs (use cases)</li>
                  </ul>
                </div>
              </div>
              <ul className={clsx(projectStyles.hubSide, projectStyles.hubRight)}>
                {CORE_REASONS.slice(2).map((item) => (
                  <li key={item.title} className={projectStyles.hubReason}>
                    <span className={projectStyles.gainIcon} aria-hidden="true">{item.icon}</span>
                    <h3 className={projectStyles.gainTitle}>{item.title}</h3>
                    <p className={projectStyles.gainText}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx(styles.actions, projectStyles.centeredActions)}>
              <Link className={styles.buttonSecondary} to="/ai/dataspace-4-ai">
                Learn about Dataspace 4 AI
              </Link>
            </div>
          </div>
        </section>

        <section id="explore" className={styles.section} aria-labelledby="explore-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Things to explore</span>
              <h2 id="explore-heading" className={styles.sectionTitle}>Where AI and the dataspace meet</h2>
              <p className={styles.sectionLead}>
                Topics your project can pick up and shape together with the community. Pick one, start a
                discussion and build it in the open.
              </p>
            </div>
            <div className={projectStyles.bento}>
              {TOPICS.map((topic, index) => (
                <div
                  key={topic.title}
                  className={clsx(projectStyles.topic, topic.size && projectStyles[`topic_${topic.size}`])}
                >
                  <span className={projectStyles.topicNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={projectStyles.topicIcon} aria-hidden="true">{topic.icon}</span>
                  <div>
                    <h3 className={projectStyles.topicTitle}>{topic.title}</h3>
                    <p className={projectStyles.topicText}>{topic.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-join" className={styles.section} aria-labelledby="why-join-heading">
          <div className={styles.container}>
            <div className={projectStyles.split}>
              <div className={projectStyles.splitIntro}>
                <span className={styles.sectionEyebrow}>Why join Eclipse Tractus-X</span>
                <h2 id="why-join-heading" className={projectStyles.splitTitle}>
                  What your project <span className={styles.accent}>gains</span>
                </h2>
                <p className={styles.sectionLead}>
                  Joining Eclipse Tractus-X gives your AI project an open foundation, shared quality rules and a
                  community that is already building the same kind of solutions.
                </p>
              </div>
              <ul className={projectStyles.gains}>
                {MOTIVES.map((item) => (
                  <li key={item.title} className={projectStyles.gain}>
                    <span className={projectStyles.gainIcon} aria-hidden="true">{item.icon}</span>
                    <h3 className={projectStyles.gainTitle}>{item.title}</h3>
                    <p className={projectStyles.gainText}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="add-your-project" className={projectStyles.join} aria-labelledby="contribute-heading">
          <div className={styles.container}>
            <div className={projectStyles.joinHeader}>
              <span className={styles.sectionEyebrow}>Get listed</span>
              <h2 id="contribute-heading" className={projectStyles.joinTitle}>
                Add your <span className={styles.accent}>IPCEI AI project</span>
              </h2>
              <p className={styles.sectionLead}>
                Is your IPCEI AI project, or any other AI initiative, working with Eclipse Tractus-X? Join the
                community and build on the same core in three steps.
              </p>
            </div>
            <ol className={projectStyles.timeline}>
              <li className={projectStyles.step}>
                <span className={projectStyles.stepNumber} aria-hidden="true">1</span>
                <h3 className={projectStyles.stepTitle}>Say hello</h3>
                <p className={projectStyles.stepText}>Introduce your project on the mailing list or in an office hour.</p>
                <div className={projectStyles.stepLinks}>
                  <Link to="https://accounts.eclipse.org/mailing-list/tractusx-dev">Mailing list</Link>
                  <Link to="/community/open-meetings">Office hours</Link>
                </div>
              </li>
              <li className={projectStyles.step}>
                <span className={projectStyles.stepNumber} aria-hidden="true">2</span>
                <h3 className={projectStyles.stepTitle}>Open a pull request</h3>
                <p className={projectStyles.stepText}>
                  Add your project&apos;s name, a short description of its AI work, its repository and how the
                  community can get involved.
                </p>
              </li>
              <li className={projectStyles.step}>
                <span className={projectStyles.stepNumber} aria-hidden="true">3</span>
                <h3 className={projectStyles.stepTitle}>Get listed</h3>
                <p className={projectStyles.stepText}>We review it together and add your project to this page.</p>
              </li>
            </ol>
            <div className={clsx(styles.actions, projectStyles.centeredActions)}>
              <Link
                className={styles.buttonPrimary}
                to="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/compare"
              >
                Create a pull request
              </Link>
              <Link className={styles.buttonSecondary} to="https://accounts.eclipse.org/mailing-list/tractusx-dev">
                Contact the mailing list
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
