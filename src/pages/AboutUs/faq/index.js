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

// FAQ page of the About Us section (/AboutUs/faq). The questions live in
// data/tractusxFaq.js; this page adds search, category navigation, deep links
// (/AboutUs/faq#<question-id> opens that question) and FAQPage structured data.

import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { faqCategories, faqQuestions } from '@site/data/tractusxFaq';
import AboutUsHeader from '@site/src/components/AboutUsHeader';
import FaqAccordion from '@site/src/components/FaqAccordion';
import { toPlainText } from '@site/src/components/FaqAccordion/richText';
import styles from './styles.module.css';

const categoryIcons = {
  'about-the-project': InfoOutlinedIcon,
  'technology-and-kits': HubOutlinedIcon,
  'community-and-contributing': GroupsOutlinedIcon,
};

const contactChannels = [
  {
    Icon: ForumOutlinedIcon,
    title: 'Chat with us on Matrix',
    description: 'Quick questions and informal syncs with the community.',
    href: 'https://chat.eclipse.org/#/room/#automotive.tractusx:matrix.eclipse.org',
  },
  {
    Icon: MailOutlineIcon,
    title: 'Write to the mailing list',
    description: 'tractusx-dev@eclipse.org, for a first contact with the community or a product team.',
    href: 'https://accounts.eclipse.org/mailing-list/tractusx-dev',
  },
  {
    Icon: EventOutlinedIcon,
    title: 'Join an open meeting',
    description: 'Meet the community, for example in the weekly Community Office Hour.',
    to: '/community/open-meetings',
  },
];

// Plain text of each question and answer, used by the search.
const searchIndex = new Map(
  faqQuestions.map(({ id, question, answer }) => [
    id,
    [question, ...answer.map(toPlainText)].join(' ').toLowerCase(),
  ]),
);

// FAQPage structured data, so search engines can show the answers directly.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqQuestions.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer.map(toPlainText).join(' ') },
  })),
};

/** Questions of every category that match the search, without empty categories. */
function filterCategories(query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return faqCategories;
  return faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(({ id }) =>
        terms.every((term) => searchIndex.get(id).includes(term)),
      ),
    }))
    .filter((category) => category.questions.length > 0);
}

export default function AboutUsFaqPage() {
  const brokenLinks = useBrokenLinks();
  faqCategories.forEach(({ id }) => brokenLinks.collectAnchor(id));
  faqQuestions.forEach(({ id }) => brokenLinks.collectAnchor(id));

  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set());

  const categories = useMemo(() => filterCategories(query), [query]);
  const visibleIds = categories.flatMap((category) => category.questions.map(({ id }) => id));
  const allOpen = visibleIds.length > 0 && visibleIds.every((id) => openIds.has(id));
  const searching = query.trim() !== '';

  // A search can be shared as /AboutUs/faq?q=<words>.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) setQuery(initial);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }, [query]);

  // Open the question named in the URL hash, on load and when the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!searchIndex.has(id)) return;
      setOpenIds((current) => new Set(current).add(id));
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const toggle = (id, open) => {
    setOpenIds((current) => {
      if (current.has(id) === open) return current;
      const next = new Set(current);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleAll = () => {
    setOpenIds((current) => {
      const next = new Set(current);
      visibleIds.forEach((id) => (allOpen ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  return (
    <Layout
      title="FAQ"
      description="Frequently asked questions about Eclipse Tractus-X: the project, its technology and KITs, and how to join the community and contribute."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <AboutUsHeader
        title="Frequently asked questions"
        subtitle="Quick answers about Eclipse Tractus-X: what the project is, what we build and how you can join the community."
        breadcrumb={
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li><Link to="/AboutUs">About Us</Link></li>
              <li aria-current="page">FAQ</li>
            </ol>
          </nav>
        }
      />
      <main className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <SearchIcon className={styles.searchIcon} aria-hidden="true" />
              <label htmlFor="faq-search" className={styles.visuallyHidden}>
                Search the questions
              </label>
              <input
                id="faq-search"
                type="search"
                placeholder="Search questions, e.g. KIT or license"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              {searching && (
                <button
                  type="button"
                  className={styles.clearSearch}
                  onClick={() => setQuery('')}
                  aria-label="Clear the search"
                >
                  <CloseIcon aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="button"
              className={styles.toggleAll}
              onClick={toggleAll}
              disabled={visibleIds.length === 0}
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <p className={styles.resultCount} role="status">
            {searching
              ? `${visibleIds.length} of ${faqQuestions.length} questions match “${query.trim()}”`
              : `${faqQuestions.length} questions in ${faqCategories.length} topics`}
          </p>

          <div className={styles.layout}>
            <nav className={styles.topics} aria-label="FAQ topics">
              <p className={styles.topicsTitle}>Topics</p>
              <ul>
                {faqCategories.map(({ id, title, questions }) => {
                  const Icon = categoryIcons[id] || InfoOutlinedIcon;
                  const shown = categories.find((category) => category.id === id);
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={shown ? styles.topic : `${styles.topic} ${styles.topicEmpty}`}
                      >
                        <Icon aria-hidden="true" />
                        <span>{title}</span>
                        <span className={styles.topicCount}>
                          {shown ? shown.questions.length : 0}
                          <span className={styles.visuallyHidden}>
                            {' '}of {questions.length} questions
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={styles.categories}>
              {categories.map(({ id, title, description, questions }) => {
                const Icon = categoryIcons[id] || InfoOutlinedIcon;
                return (
                  <section key={id} id={id} className={styles.category} aria-labelledby={`${id}-title`}>
                    <div className={styles.categoryHeading}>
                      <span className={styles.categoryIcon}><Icon aria-hidden="true" /></span>
                      <div>
                        <h2 id={`${id}-title`}>{title}</h2>
                        <p>{description}</p>
                      </div>
                    </div>
                    <FaqAccordion items={questions} openIds={openIds} onToggle={toggle} />
                  </section>
                );
              })}

              {categories.length === 0 && (
                <div className={styles.empty}>
                  <h2>No question matches your search</h2>
                  <p>
                    Try other words, or ask the community directly: we are happy to help.
                  </p>
                  <button type="button" className={styles.toggleAll} onClick={() => setQuery('')}>
                    Show all questions
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className={styles.contact} aria-labelledby="faq-contact-title">
            <div className={styles.contactHeading}>
              <p className={styles.eyebrow}>Still have a question?</p>
              <h2 id="faq-contact-title">Ask the community</h2>
              <p>
                Eclipse Tractus-X is developed in the open. Questions are welcome on our public channels.
                Technical questions about the Eclipse tooling are answered in the{' '}
                <Link to="/docs/dev_faq">developer FAQ</Link>.
              </p>
            </div>
            <ul className={styles.channels}>
              {contactChannels.map(({ Icon, title, description, href, to }) => {
                const content = (
                  <>
                    <span className={styles.channelIcon}><Icon aria-hidden="true" /></span>
                    <span className={styles.channelText}>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </span>
                    <ChevronRightIcon className={styles.channelArrow} aria-hidden="true" />
                  </>
                );
                return (
                  <li key={title}>
                    {to ? (
                      <Link className={styles.channel} to={to}>{content}</Link>
                    ) : (
                      <a className={styles.channel} href={href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}
