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

// Design preview of the agent cards (/AI/agents-preview). Not linked anywhere and not
// indexed: it shows the real agents in different layouts so the team can pick one with
// the configurator. The choice is kept in the URL, e.g.
// /AI/agents-preview?layout=spotlight&picture=poster&details=standard&actions=hover&accent=glow
// Remove this page once a design is chosen and built into src/components/2.0/AgentCard.

import React, { useCallback, useMemo, useState } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory, useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import {
  agentChatHint,
  agentChatUrl,
  agentProfileUrl,
  agentTeams,
  getFeaturedAgents,
  getTeamMembers,
} from '@site/data/aiData';
import styles from './styles.module.scss';

/** Every dimension of the card design, with its options. The first option is today's design. */
const DIMENSIONS = [
  {
    id: 'layout',
    label: 'Layout',
    options: [
      { id: 'grid', label: 'Grid of 3', hint: 'Today: three large cards per row.' },
      { id: 'grid4', label: 'Grid of 4', hint: 'Smaller cards, more agents above the fold.' },
      { id: 'list', label: 'List', hint: 'Picture left, text right; one agent per row.' },
      { id: 'spotlight', label: 'Spotlight', hint: 'The first agent large, the others in a grid.' },
      { id: 'strip', label: 'Strip', hint: 'One row that scrolls sideways.' },
    ],
  },
  {
    id: 'picture',
    label: 'Picture',
    options: [
      { id: 'square', label: 'Square', hint: 'Today: square picture on top.' },
      { id: 'portrait', label: 'Portrait', hint: 'Taller 3:4 crop, more of the character.' },
      { id: 'avatar', label: 'Avatar', hint: 'Round avatar, centered card.' },
      { id: 'poster', label: 'Poster', hint: 'Picture fills the card, text on top of it.' },
    ],
  },
  {
    id: 'details',
    label: 'Details',
    options: [
      { id: 'standard', label: 'Standard', hint: 'Today: role, motto, 3 topics and tools.' },
      { id: 'minimal', label: 'Minimal', hint: 'Name and repository only.' },
      { id: 'rich', label: 'Rich', hint: 'Adds the description of what to ask it.' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    options: [
      { id: 'buttons', label: 'Buttons', hint: 'Today: Chat and Profile buttons at the bottom.' },
      { id: 'hover', label: 'On hover', hint: 'Buttons appear over the picture on hover.' },
      { id: 'card', label: 'Whole card', hint: 'The card opens the profile; a small Chat icon.' },
    ],
  },
  {
    id: 'accent',
    label: 'Accent',
    options: [
      { id: 'neutral', label: 'Neutral', hint: 'Today: grey border, orange on hover.' },
      { id: 'glow', label: 'Glow', hint: 'Soft orange glow around every card.' },
      { id: 'gradient', label: 'Gradient edge', hint: 'Orange-to-green line on top of each card.' },
    ],
  },
];

/** CSS-module class of an option, e.g. variantClass('layout', 'grid4') -> styles.layoutGrid4. */
const variantClass = (dimension, value) => styles[`${dimension}${value.charAt(0).toUpperCase()}${value.slice(1)}`];

const DEFAULTS = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension.id, dimension.options[0].id]));

/** Reads the configuration from the URL, falling back to today's design for unknown values. */
function readConfig(search) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(
    DIMENSIONS.map((dimension) => {
      const value = params.get(dimension.id);
      const known = dimension.options.some((option) => option.id === value);
      return [dimension.id, known ? value : DEFAULTS[dimension.id]];
    }),
  );
}

function Picture({ agent }) {
  const image = useBaseUrl(agent.image || '/');
  if (!agent.image) {
    return (
      <span className={clsx(styles.image, styles.imageEmpty)} aria-hidden="true">
        <SmartToyOutlinedIcon />
      </span>
    );
  }
  return <img className={styles.image} src={image} alt="" width={720} height={720} loading="lazy" />;
}

function Actions({ agent, mode }) {
  const chat = (
    <a
      className={styles.chat}
      href={agentChatUrl(agent)}
      target="_blank"
      rel="noopener noreferrer"
      title={agentChatHint(agent)}
    >
      <ChatBubbleOutlineIcon className={styles.icon} />
      {mode !== 'card' && 'Chat'}
    </a>
  );
  if (mode === 'card') return <div className={styles.actionsCard}>{chat}</div>;
  return (
    <div className={clsx(styles.actions, mode === 'hover' && styles.actionsHover)}>
      {chat}
      {agent.profile !== false && (
        <Link className={styles.profile} to={agentProfileUrl(agent)}>
          <PersonOutlineIcon className={styles.icon} />
          Profile
        </Link>
      )}
    </div>
  );
}

function PreviewCard({ agent, config, featured }) {
  const { picture, details, actions } = config;
  const body = (
    <>
      <div className={styles.media}>
        <Picture agent={agent} />
        <span className={styles.repo}>
          <GitHubIcon className={styles.icon} />
          {agent.repository}
        </span>
        {actions === 'hover' && <Actions agent={agent} mode="hover" />}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          {actions === 'card' && agent.profile !== false ? (
            // Stretched link: its ::after covers the whole card, so the card opens the profile
            // without wrapping the Chat link in another link.
            <Link to={agentProfileUrl(agent)} className={styles.stretched}>
              {agent.name}
            </Link>
          ) : (
            agent.name
          )}
        </h3>
        {details !== 'minimal' && <p className={styles.role}>{agent.role}</p>}
        {details !== 'minimal' && agent.motto && <p className={styles.motto}>“{agent.motto}”</p>}
        {details === 'rich' && agent.description && <p className={styles.description}>{agent.description}</p>}
        {details !== 'minimal' && agent.expertise && (
          <ul className={styles.tags}>
            {agent.expertise.slice(0, details === 'rich' ? 6 : 3).map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        {details !== 'minimal' && agent.assistants && (
          <p className={styles.assistants}>
            {agent.assistants.map((assistant) => (
              <span key={assistant} className={styles.assistant}>
                {assistant}
              </span>
            ))}
          </p>
        )}
        {actions === 'buttons' && <Actions agent={agent} mode="buttons" />}
        {actions === 'card' && <Actions agent={agent} mode="card" />}
      </div>
    </>
  );

  const className = clsx(
    styles.card,
    variantClass('picture', picture),
    variantClass('accent', config.accent),
    actions === 'card' && styles.cardClickable,
    featured && styles.featured,
  );

  return <article className={className}>{body}</article>;
}

function Configurator({ config, onChange, onReset }) {
  const [copied, setCopied] = useState(false);
  const combination = DIMENSIONS.map((dimension) => `${dimension.id}=${config[dimension.id]}`).join(' · ');

  const copy = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <aside className={styles.panel} aria-label="Card design configurator">
      <h2 className={styles.panelTitle}>
        <TuneIcon className={styles.icon} />
        Configurator
      </h2>
      {DIMENSIONS.map((dimension) => {
        const selected = dimension.options.find((option) => option.id === config[dimension.id]);
        return (
          <fieldset key={dimension.id} className={styles.dimension}>
            <legend className={styles.dimensionLabel}>{dimension.label}</legend>
            <div className={styles.options} role="radiogroup" aria-label={dimension.label}>
              {dimension.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={config[dimension.id] === option.id}
                  className={clsx(styles.option, config[dimension.id] === option.id && styles.optionActive)}
                  onClick={() => onChange(dimension.id, option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>{selected.hint}</p>
          </fieldset>
        );
      })}
      <div className={styles.combination}>
        <span className={styles.dimensionLabel}>Combination</span>
        <code className={styles.combinationCode}>{combination}</code>
        <div className={styles.panelActions}>
          <button type="button" className={styles.copy} onClick={copy}>
            <ContentCopyIcon className={styles.icon} />
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          <button type="button" className={styles.reset} onClick={onReset}>
            Today’s design
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function AgentsPreviewPage() {
  const location = useLocation();
  const history = useHistory();
  const config = useMemo(() => readConfig(location.search), [location.search]);

  const setConfig = useCallback(
    (next) => {
      const params = new URLSearchParams(next);
      history.replace({ pathname: location.pathname, search: `?${params.toString()}` });
    },
    [history, location.pathname],
  );

  const featured = getFeaturedAgents();
  const teamCards = agentTeams.map((team) => ({
    id: team.id,
    name: team.name,
    repository: team.repository,
    role: `${getTeamMembers(team.id).length} GitHub Copilot agents`,
    description: team.description,
    expertise: getTeamMembers(team.id).map((member) => member.name.replace(/^Testlab /, '')),
    assistants: [...new Set(getTeamMembers(team.id).flatMap((member) => member.assistants))],
    profile: false,
  }));
  const cards = [...featured, ...teamCards];

  return (
    <Layout title="Agent cards: design preview" description="Design preview of the AI agent cards.">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="Design preview"
          title={
            <>
              Agent cards, <span className={styles.accent}>your way</span>
            </>
          }
          subtitle="Pick a layout, picture, level of detail, actions and accent in the configurator. The cards show the real agents. Copy the link to share the combination you like."
        />

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.workbench}>
              <div
                className={clsx(styles.cards, variantClass('layout', config.layout))}
                data-variant={DIMENSIONS.map((dimension) => `${dimension.id}:${config[dimension.id]}`).join(' ')}
              >
                {cards.map((agent, index) => (
                  <PreviewCard
                    key={agent.id}
                    agent={agent}
                    config={config}
                    featured={config.layout === 'spotlight' && index === 0}
                  />
                ))}
              </div>
              <Configurator
                config={config}
                onChange={(dimension, value) => setConfig({ ...config, [dimension]: value })}
                onReset={() => setConfig(DEFAULTS)}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
