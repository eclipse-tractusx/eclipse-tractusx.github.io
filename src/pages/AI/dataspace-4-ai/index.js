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

// "Dataspace 4 AI": why dataspaces are the enabler for the next wave of AI.
// Every number on this page has a numbered source in SOURCES at the bottom.

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import styles from './styles.module.scss';

const SOURCES = [
  {
    id: 1,
    title: 'Will we run out of data? Limits of LLM scaling based on human-generated data',
    publisher: 'Epoch AI, 2024',
    url: 'https://epoch.ai/blog/will-we-run-out-of-data',
  },
  {
    id: 2,
    title: 'Data Age 2025: the digitization of the world (IDC, sponsored by Seagate), summary',
    publisher: 'i-SCOOP',
    url: 'https://www.i-scoop.eu/big-data-action-value-context/data-age-2025-datasphere/',
  },
  {
    id: 3,
    title: 'Seagate’s “Rethink Data” report reveals that 68% of data available to businesses goes unleveraged (survey by IDC)',
    publisher: 'Seagate via Business Wire, July 2020',
    url: 'https://www.businesswire.com/news/home/20200715005130/en/',
  },
  {
    id: 4,
    title: 'Manufacturing data sharing as driver for sustainability in Europe (quoting the European Commission)',
    publisher: 'DIGITALEUROPE, October 2021',
    url: 'https://www.digitaleurope.org/resources/manufacturing-data-sharing-as-driver-for-sustainability-in-europe',
  },
  {
    id: 5,
    title: 'Will the real data sovereign please stand up? An EU policy response to sovereignty in data spaces',
    publisher: 'International Journal of Law and Information Technology, 2024',
    url: 'https://academic.oup.com/ijlit/article/doi/10.1093/ijlit/eaae006/7708555',
  },
  {
    id: 6,
    title: 'Sharing data better makes AI work better and vice versa',
    publisher: 'International Data Spaces Association, July 2026',
    url: 'https://internationaldataspaces.org/sharing-data-better-makes-ai-work-better-and-vice-versa/',
  },
];

/** Superscript link to a numbered source at the bottom of the page. */
function Cite({ id }) {
  return (
    <sup className={styles.cite}>
      <a href={`#source-${id}`} aria-label={`Source ${id}`}>
        [{id}]
      </a>
    </sup>
  );
}

const PROBLEMS = [
  {
    step: '01',
    icon: <TrendingDownIcon />,
    title: 'AI is running out of public data',
    text: (
      <>
        Today’s models learned from the open web. Epoch AI estimates the stock of public, human-written text at around
        300 trillion tokens and expects it to be fully used somewhere between 2026 and 2032.
        <Cite id={1} />
      </>
    ),
  },
  {
    step: '02',
    icon: <BusinessOutlinedIcon />,
    title: 'The data that is left sits inside companies',
    text: (
      <>
        IDC projected that by 2025 enterprises would hold more than 80% of the world’s stored data.
        <Cite id={2} /> Most of it is never put to work: an IDC survey for Seagate found that 68% of the data available
        to businesses goes unused,
        <Cite id={3} /> and the European Commission says 80% of industrial data is never used.
        <Cite id={4} />
      </>
    ),
  },
  {
    step: '03',
    icon: <LockOutlinedIcon />,
    title: 'Companies will not hand it over blindly',
    text: (
      <>
        Production, quality and supply-chain data is a competitive asset. The European Commission names the lack of
        trust between companies, together with missing economic incentives, as a key obstacle to business data sharing.
        <Cite id={5} /> Without control over who uses the data and for what, it stays behind the company walls.
      </>
    ),
  },
];

const PILLARS = [
  {
    icon: <BadgeOutlinedIcon />,
    title: 'Trusted identity',
    text: 'Every participant, and every AI agent acting for one, proves who it is with decentralized identifiers and verifiable credentials.',
    product: 'Tractus-X IdentityHub',
    link: { label: 'Data Trust & Security KIT', to: '/docs-kits/kits/data-trust-and-security-kit/adoption-view' },
  },
  {
    icon: <PolicyOutlinedIcon />,
    title: 'Usage policies that travel with the data',
    text: 'Before any byte moves, provider and consumer negotiate a contract: who may use the data, for which purpose and for how long, for example whether it may train a model.',
    product: 'Tractus-X EDC',
    link: { label: 'Connector KIT', to: '/docs-kits/kits/connector-kit/adoption-view' },
  },
  {
    icon: <SchemaOutlinedIcon />,
    title: 'Shared meaning',
    text: 'Semantic models and digital twins describe data the same way across companies, so an AI system understands what it receives without custom mapping.',
    product: 'Digital Twin Registry and semantic models',
    link: { label: 'Digital Twin KIT', to: '/docs-kits/kits/digital-twin-kit/adoption-view' },
  },
  {
    icon: <StorageOutlinedIcon />,
    title: 'Data stays at the source',
    text: 'There is no central data lake. Each company keeps its data and shares it point to point through its own connector, under its own rules.',
    product: 'Dataspace Protocol',
    link: { label: 'Connector KIT', to: '/docs-kits/kits/connector-kit/adoption-view' },
  },
];

const FLOW = [
  {
    icon: <BusinessOutlinedIcon />,
    title: 'Data provider',
    text: 'Keeps its data and offers it with a usage policy.',
  },
  {
    icon: <GavelOutlinedIcon />,
    title: 'Contract',
    text: 'The connectors negotiate access, purpose and duration.',
    highlight: true,
  },
  {
    icon: <SmartToyOutlinedIcon />,
    title: 'AI consumer',
    text: 'Trains, fine-tunes, retrieves or acts on data it is allowed to use, and can prove where it came from.',
  },
];

const NEXT_STEPS = [
  {
    title: 'AI Service KIT',
    text: 'Standard ways to expose and use AI services in the dataspace.',
    to: '/docs-kits/kits/ai-service-kit/adoption-view',
  },
  {
    title: 'Knowledge Agents KIT',
    text: 'Generate knowledge from data with semantic dataspace federation.',
    to: '/docs-kits/kits/knowledge-agents-kit/adoption-view/intro',
  },
  {
    title: 'Connector KIT',
    text: 'Sovereign, cross-company data exchange with the Tractus-X EDC.',
    to: '/docs-kits/kits/connector-kit/adoption-view',
  },
  {
    title: 'Our AI agents',
    text: 'The open-source agents that know the Tractus-X products.',
    to: '/AI/agents',
  },
];

export default function Dataspace4AiPage() {
  // Registers the #source-<n> anchors that the citation links point to.
  const brokenLinks = useBrokenLinks();
  SOURCES.forEach((source) => brokenLinks.collectAnchor(`source-${source.id}`));

  return (
    <Layout
      title="Dataspace 4 AI"
      description="Why dataspaces are the enabler for the next wave of AI: public data is running out, most data sits inside companies, and they will only share it with trust."
    >
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="Dataspace 4 AI"
          title={
            <>
              AI is running out of data. <span className={styles.accent}>Dataspaces</span> unlock the rest.
            </>
          }
          subtitle="The next leap in AI needs the data that companies keep to themselves. They will share it only if they keep control. That is exactly what a dataspace is built for."
          stats={[
            { label: 'Public text used up by', value: '2026–32' },
            { label: 'Of stored data held by enterprises', value: '>80%' },
            { label: 'Of business data unused', value: '68%' },
          ]}
        />

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>The problem</span>
              <h2 className={styles.sectionTitle}>The data AI needs is locked away</h2>
            </header>
            <ol className={styles.problems}>
              {PROBLEMS.map((problem) => (
                <li key={problem.step} className={styles.problem}>
                  <div className={styles.problemTop}>
                    <span className={styles.step}>{problem.step}</span>
                    <span className={styles.iconTile}>{problem.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{problem.title}</h3>
                  <p className={styles.cardText}>{problem.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.turn}>
              <p className={styles.turnLead}>So the question is not whether companies have the data.</p>
              <p className={styles.turnLine}>
                It is whether they can <span className={styles.accent}>share it with trust</span>.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>The answer</span>
              <h2 className={styles.sectionTitle}>What a dataspace adds</h2>
              <p className={styles.sectionLead}>
                A dataspace lets companies share data without giving up control over it. Eclipse Tractus-X builds the
                open-source components for it.
              </p>
            </header>
            <div className={styles.pillars}>
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className={styles.pillar}>
                  <span className={styles.iconTile}>{pillar.icon}</span>
                  <h3 className={styles.cardTitle}>{pillar.title}</h3>
                  <p className={styles.cardText}>{pillar.text}</p>
                  <p className={styles.product}>{pillar.product}</p>
                  <Link className={styles.pillarLink} to={pillar.link.to}>
                    {pillar.link.label}
                    <ArrowForwardIcon className={styles.linkIcon} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>How it works</span>
              <h2 className={styles.sectionTitle}>From locked data to trusted AI</h2>
            </header>
            <div className={styles.flow}>
              {FLOW.map((node, index) => (
                <React.Fragment key={node.title}>
                  {index > 0 && (
                    <span className={styles.flowArrow} aria-hidden="true">
                      <ArrowForwardIcon />
                    </span>
                  )}
                  <div className={clsx(styles.flowNode, node.highlight && styles.flowNodeHighlight)}>
                    <span className={styles.iconTile}>{node.icon}</span>
                    <span className={styles.flowTitle}>{node.title}</span>
                    <span className={styles.flowText}>{node.text}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className={styles.both}>
              <span className={styles.iconTile}>
                <HubOutlinedIcon />
              </span>
              <div>
                <h3 className={styles.cardTitle}>And it works both ways</h3>
                <p className={styles.cardText}>
                  The International Data Spaces Association argues that data spaces give AI governed, legally clear
                  access to high-quality data, while AI makes data spaces cheaper to build, for example by generating
                  metadata and turning legal terms into machine-readable policies. As AI agents become dataspace
                  participants themselves, they need the same explicit identity, scope and audit controls.
                  <Cite id={6} />
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Start building</span>
              <h2 className={styles.sectionTitle}>Dataspace 4 AI in Eclipse Tractus-X</h2>
            </header>
            <div className={styles.next}>
              {NEXT_STEPS.map((step) => (
                <Link key={step.title} to={step.to} className={styles.nextCard}>
                  <span>
                    <span className={styles.nextTitle}>{step.title}</span>
                    <span className={styles.nextText}>{step.text}</span>
                  </span>
                  <ArrowForwardIcon className={styles.nextArrow} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sourcesTitle}>Sources</h2>
            <ol className={styles.sources}>
              {SOURCES.map((source) => (
                <li key={source.id} id={`source-${source.id}`} className={styles.source}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                  <span className={styles.sourcePublisher}> — {source.publisher}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}
