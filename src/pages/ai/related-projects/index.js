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
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
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
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import styles from '../styles.module.scss';
import projectStyles from './styles.module.scss';

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

function ReasonGrid({ items }) {
  return (
    <div className={styles.principles}>
      {items.map((item) => (
        <div key={item.title} className={styles.panel}>
          <span className={styles.iconTile} aria-hidden="true">{item.icon}</span>
          <h3 className={styles.principleTitle}>{item.title}</h3>
          <p className={styles.principleText}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

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
          action={{ to: '#add-your-project', label: 'Add your IPCEI AI project' }}
        />

        <section className={styles.section} aria-labelledby="projects-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Community showcase</span>
              <h2 id="projects-heading" className={styles.sectionTitle}>Space for what&apos;s next</h2>
              <p className={styles.sectionLead}>
                These projects are in preparation and open for collaboration. Details will be published as
                they mature; these cards are not announced projects or release commitments.
              </p>
            </div>
            <div className={projectStyles.grid}>
              {[1, 2, 3].map((slot) => (
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
                  <h3 className={styles.principleTitle}>Project in preparation · 0{slot}</h3>
                  <p className={styles.principleText}>
                    An IPCEI AI project or another Eclipse Tractus-X AI initiative in preparation. Details
                    will appear here as it takes shape.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-join" className={styles.section} aria-labelledby="why-join-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Why join Eclipse Tractus-X</span>
              <h2 id="why-join-heading" className={styles.sectionTitle}>What your project gains</h2>
              <p className={styles.sectionLead}>
                Joining Eclipse Tractus-X gives your AI project an open foundation, shared quality rules and a
                community that is already building the same kind of solutions.
              </p>
            </div>
            <ReasonGrid items={MOTIVES} />
          </div>
        </section>

        <section id="shared-core" className={styles.section} aria-labelledby="shared-core-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>One shared core</span>
              <h2 id="shared-core-heading" className={styles.sectionTitle}>Why we should build on the same core</h2>
              <p className={styles.sectionLead}>
                When every AI project builds its own data-exchange stack, the result is islands that cannot talk to
                each other. A shared core turns separate projects into one ecosystem.
              </p>
            </div>
            <ReasonGrid items={CORE_REASONS} />
            <div className={styles.actions}>
              <Link className={styles.buttonSecondary} to="/ai/dataspace-4-ai">
                Learn about Dataspace 4 AI
              </Link>
            </div>
          </div>
        </section>

        <section id="add-your-project" className={styles.section} aria-labelledby="contribute-heading">
          <div className={styles.container}>
            <div className={styles.cta}>
              <span className={styles.iconTile} aria-hidden="true"><GroupsOutlinedIcon /></span>
              <div>
                <h2 id="contribute-heading" className={styles.ctaTitle}>Add your IPCEI AI project</h2>
                <p className={styles.ctaText}>
                  Is your IPCEI AI project, or any other AI initiative, working with Eclipse Tractus-X? Join the
                  community and build on the same core. Here is how:
                </p>
                <ol className={styles.steps}>
                  <li>Introduce your project on the mailing list or in an office hour.</li>
                  <li>
                    Open a pull request to this website with your project&apos;s name, a short description of its AI
                    work, its repository and how the community can get involved.
                  </li>
                  <li>We review it together and add your project to this page.</li>
                </ol>
                <div className={styles.actions}>
                  <Link className={styles.buttonSecondary} to="https://accounts.eclipse.org/mailing-list/tractusx-dev">
                    Contact the mailing list
                  </Link>
                  <Link className={styles.buttonSecondary} to="/community/open-meetings">
                    Join an office hour
                  </Link>
                  <Link
                    className={styles.buttonPrimary}
                    to="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/compare"
                  >
                    Create a pull request
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
