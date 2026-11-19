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

// Dedicated page of the Tractus-X Accelerator.
//
// Section order: hero, purpose, what we offer, who it is for, how to join, events,
// partners and funding, brand assets, stay in touch. Program facts come from
// data/tractusxAccelerator.js; please keep new copy to facts the Accelerator owners
// have confirmed.

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PolicyIcon from '@mui/icons-material/Policy';
import ForumIcon from '@mui/icons-material/Forum';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import { tractusxOrganizations } from '@site/data/tractusxOrganizations';
import { upcomingEvents, getUpcomingEvents } from '@site/data/upcomingEvents';
import {
  acceleratorEvents,
  acceleratorFocusAreas,
  acceleratorLogos,
  acceleratorPartnerIds,
  acceleratorPeriod,
  splitAcceleratorEvents,
} from '@site/data/tractusxAccelerator';
import FundingBadge from '@site/src/components/FundingBadge';
import styles from './styles.module.scss';

// Icons for the `icon` keys of acceleratorFocusAreas.
const focusIcons = {
  school: SchoolIcon,
  science: ScienceIcon,
  mentoring: Diversity3Icon,
  policy: PolicyIcon,
  forum: ForumIcon,
};

// The Community Office Hour is featured on the open meetings page.
const OFFICE_HOUR = '/community/open-meetings';
const MAILING_LIST = 'https://accounts.eclipse.org/mailing-list/tractusx-dev';
const MATRIX = 'https://matrix.to/#/#tractusx-dev:matrix.eclipse.org';

const sections = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'offer', label: 'What we offer' },
  { id: 'audience', label: 'Who it is for' },
  { id: 'join', label: 'How to join' },
  { id: 'events', label: 'Events' },
  { id: 'partners', label: 'Partners' },
  { id: 'brand', label: 'Brand assets' },
];

const audiences = [
  {
    icon: CodeIcon,
    title: 'Projects',
    description:
      'Open-source projects that want to join Eclipse Tractus-X or grow inside it, with guidance on qualification, releases and quality.',
    cta: { label: 'Read the release process', to: '/docs/oss/release-process' },
  },
  {
    icon: GroupsIcon,
    title: 'Developers',
    description:
      'Developers who want to make their first contribution or take on more responsibility, with mentoring from experienced community members.',
    cta: { label: 'How to contribute', to: '/docs/oss/how-to-contribute' },
  },
  {
    icon: BusinessIcon,
    title: 'Organizations',
    description:
      'Companies and institutions that want to adopt the dataspace technology and actively participate in the open-source community.',
    cta: { label: 'Ways to contribute', to: '/Contribute' },
  },
];

// TODO(accelerator owners): replace or extend with the confirmed cohort steps
// (application, selection, duration) once they are published.
const joinSteps = [
  {
    title: 'Meet the community',
    text: 'Join the Community Office Hour, every Friday from 10:05 to 11:00 (Europe/Berlin). It is open to everyone, and the right place to ask about the Accelerator.',
    link: { label: 'Open meetings', to: OFFICE_HOUR },
  },
  {
    title: 'Get set up',
    text: 'Follow the getting started guide to find your way around the repositories, the tooling and the way the community works.',
    link: { label: 'Getting started', to: '/docs/getting-started' },
  },
  {
    title: 'Make your first contribution',
    text: 'Pick an issue, open a pull request and get feedback from committers. The contribution guide explains each step.',
    link: { label: 'How to contribute', to: '/docs/oss/how-to-contribute' },
  },
  {
    title: 'Build with us at an event',
    text: 'Accelerator events such as hackathons bring newcomers and experienced members into one room to work on real challenges.',
    link: { label: 'See the events', to: '#events' },
  },
];

const channels = [
  {
    icon: MailOutlineIcon,
    title: 'Mailing list',
    text: 'Announcements and discussions of the developer community.',
    href: MAILING_LIST,
  },
  {
    icon: ChatIcon,
    title: 'Matrix',
    text: 'Chat with the community in the Tractus-X developer channel.',
    href: MATRIX,
  },
  {
    icon: ArticleIcon,
    title: 'TX News blog',
    text: 'Event invitations, recaps and project news.',
    to: '/blog',
  },
];

const partners = acceleratorPartnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** Section wrapper with an anchor and a heading. */
function Section({ id, eyebrow, title, intro, children, muted = false }) {
  // Register the anchor so in-page links pass Docusaurus' broken anchor check.
  useBrokenLinks().collectAnchor(id);
  return (
    <section id={id} className={`${styles.section} ${muted ? styles.sectionMuted : ''}`} aria-labelledby={`${id}-title`}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          {eyebrow && <span className={styles.sectionEyebrow}>{eyebrow}</span>}
          <h2 id={`${id}-title`} className={styles.sectionTitle}>
            {title}
          </h2>
          {intro && <p className={styles.sectionIntro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

/** One event card; `past` events link to their blog post as a recap. */
function EventCard({ event, past = false }) {
  return (
    <article className={`${styles.eventCard} ${past ? styles.eventPast : ''}`}>
      <span className={styles.eventBadge}>{past ? 'Past event' : 'Upcoming'}</span>
      <h3 className={styles.eventTitle}>{event.title}</h3>
      <p className={styles.eventMeta}>
        <span>
          <CalendarTodayIcon aria-hidden="true" />
          {event.endDate ? `${formatDate(event.date)} - ${formatDate(event.endDate)}` : formatDate(event.date)}
        </span>
        <span>
          <LocationOnIcon aria-hidden="true" />
          {event.location}
        </span>
      </p>
      {event.summary && <p className={styles.cardText}>{event.summary}</p>}
      {event.blogSlug && (
        <Link className={styles.textLink} to={`/blog/${event.blogSlug}`}>
          {past ? 'Read about the event' : 'Event details'}
          <ArrowForwardIcon aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

/** Preview and download link of one logo variant, on a matching background. */
function LogoDownload({ logo }) {
  const src = useBaseUrl(logo.src);
  return (
    <li className={styles.logoTile}>
      <span className={logo.theme === 'dark' ? styles.logoPreviewDark : styles.logoPreviewLight}>
        <img src={src} alt={`Tractus-X Accelerator logo, ${logo.label.toLowerCase()}`} loading="lazy" />
      </span>
      <a className={styles.logoDownload} href={src} download>
        <DownloadIcon className={styles.logoDownloadIcon} aria-hidden="true" />
        {logo.label}
      </a>
    </li>
  );
}

export default function AcceleratorPage() {
  const heroLogo = useBaseUrl(acceleratorLogos.find((logo) => logo.id === 'color-light-text').src);
  const { upcoming, past } = splitAcceleratorEvents(acceleratorEvents);
  const acceleratorEventIds = new Set(acceleratorEvents.map((event) => event.id));
  // The next community event outside the Accelerator, from the site-wide calendar.
  const nextCommunityEvent = getUpcomingEvents(upcomingEvents).find(
    (event) => !acceleratorEventIds.has(event.id)
  );

  const facts = [
    { value: acceleratorPeriod.replace(' - ', ' – '), label: 'Program period' },
    { value: String(acceleratorFocusAreas.length), label: 'Focus areas' },
    { value: String(partners.length), label: 'Partners' },
    { value: 'BMWE', label: 'Public funding' },
  ];

  return (
    <Layout
      title="Tractus-X Accelerator"
      description="The Tractus-X Accelerator is a cohort-based support program that lowers the barriers to joining and actively contributing to the Eclipse Tractus-X open-source community."
    >
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.eyebrow}>
              <RocketLaunchIcon aria-hidden="true" />
              {acceleratorPeriod}
            </span>
            <h1 className={styles.heroTitle}>
              <span className={styles.visuallyHidden}>Tractus-X Accelerator</span>
              <img className={styles.heroLogo} src={heroLogo} alt="" aria-hidden="true" />
            </h1>
            <p className={styles.heroSubtitle}>
              A cohort-based support program for projects, developers and organizations. It lowers
              the technical and organizational barriers to entry and helps more people take an
              active part in the Eclipse Tractus-X open-source community.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="#join">
                How to join
                <ArrowForwardIcon aria-hidden="true" />
              </Link>
              <Link className={styles.secondaryButton} to={OFFICE_HOUR}>
                Join an open meeting
              </Link>
            </div>
            <dl className={styles.facts}>
              {facts.map(({ value, label }) => (
                <div key={label} className={styles.fact}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* In-page navigation */}
        <nav className={styles.subnav} aria-label="On this page">
          <div className={styles.container}>
            <ul>
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Section id="purpose" eyebrow="Why the Accelerator" title="Making it easier to take part">
          <div className={styles.purpose}>
            <div className={styles.purposeText}>
              <p>
                Eclipse Tractus-X builds open-source dataspace technology together with a growing,
                international community. Joining that work, as a new project, a developer or an
                organization, means learning the technology, the repositories and the community's
                governance, release and quality processes.
              </p>
              <p>
                The Tractus-X Accelerator lowers these technical and organizational barriers to
                entry. It combines proven approaches from startup acceleration with the
                requirements of industrial open-source ecosystems, so that more people move from
                interest to active, lasting participation.
              </p>
            </div>
            <aside className={styles.purposeAside} aria-label="At a glance">
              <span className={styles.purposeAsideLabel}>At a glance</span>
              <ul className={styles.glance}>
                <li>Cohort-based support program</li>
                <li>For projects, developers and organizations</li>
                <li>Runs {acceleratorPeriod.replace(' - ', ' – ')}</li>
                <li>Supported by the German Federal Ministry for Economic Affairs and Energy (BMWE)</li>
              </ul>
            </aside>
          </div>
        </Section>

        <Section
          id="offer"
          eyebrow="What we offer"
          title="Five focus areas"
          intro="The Accelerator works on five areas that, together, shorten the way from a first contact to an active contribution."
          muted
        >
          <ul className={`${styles.cards} ${styles.cardsThree}`}>
            {acceleratorFocusAreas.map(({ id, icon, title, description }) => {
              const Icon = focusIcons[icon] || RocketLaunchIcon;
              return (
                <li key={id} className={styles.card}>
                  <span className={styles.cardIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardText}>{description}</p>
                </li>
              );
            })}
            <li className={`${styles.card} ${styles.cardCta}`}>
              <h3 className={styles.cardTitle}>Ready to take part?</h3>
              <p className={styles.cardText}>
                Start with the community's open channels and find your way in.
              </p>
              <Link className={styles.textLink} to="#join">
                How to join
                <ArrowForwardIcon aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </Section>

        <Section id="audience" eyebrow="Who it is for" title="Projects, developers and organizations">
          <ul className={`${styles.cards} ${styles.cardsThree} ${styles.cardsAudience}`}>
            {audiences.map(({ icon: Icon, title, description, cta }) => (
              <li key={title} className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{description}</p>
                <Link className={styles.textLink} to={cta.to}>
                  {cta.label}
                  <ArrowForwardIcon aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="join"
          eyebrow="How to join"
          title="Your way into the community"
          intro="You don't need an invitation to start. These steps use the community's open channels; more details on the Accelerator cohorts will follow on this page."
          muted
        >
          <ol className={styles.steps}>
            {joinSteps.map(({ title, text, link }, index) => (
              <li key={title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
                <Link className={styles.textLink} to={link.to}>
                  {link.label}
                  <ArrowForwardIcon aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="events" eyebrow="Events" title="Build together">
          <h3 className={styles.subheading}>Upcoming Accelerator events</h3>
          {upcoming.length > 0 ? (
            <div className={styles.events}>
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>
                The next Accelerator event will be announced on the TX News blog, the mailing list
                and in the Community Office Hour.
              </p>
              <Link className={styles.textLink} to="/blog">
                Go to the blog
                <ArrowForwardIcon aria-hidden="true" />
              </Link>
            </div>
          )}

          {nextCommunityEvent && (
            <>
              <h3 className={styles.subheading}>Next community event</h3>
              <div className={styles.events}>
                <EventCard event={{ ...nextCommunityEvent, summary: null }} />
              </div>
            </>
          )}

          {past.length > 0 && (
            <>
              <h3 className={styles.subheading}>Past Accelerator events</h3>
              <div className={styles.events}>
                {past.map((event) => (
                  <EventCard key={event.id} event={event} past />
                ))}
              </div>
            </>
          )}
        </Section>

        <Section
          id="partners"
          eyebrow="Partners and funding"
          title="Who makes it happen"
          intro="The partners of the Tractus-X Accelerator and its public funding."
          muted
        >
          <ul className={styles.partners}>
            {partners.map(({ id, name, logo, url, acceleratorLogoScale }) => (
              <li key={id}>
                <a href={url} title={name} target="_blank" rel="noopener noreferrer">
                  <img
                    src={logo}
                    alt={`${name} logo`}
                    loading="lazy"
                    style={
                      acceleratorLogoScale
                        ? { transform: `scale(${acceleratorLogoScale})` }
                        : undefined
                    }
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.funding}>
            <FundingBadge />
          </div>
        </Section>

        <Section
          id="brand"
          eyebrow="Brand assets"
          title="Accelerator logo"
          intro="Use the variant that matches your background. Each file is an SVG."
        >
          <ul className={styles.logos}>
            {acceleratorLogos.map((logo) => (
              <LogoDownload key={logo.id} logo={logo} />
            ))}
          </ul>
        </Section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <div className={styles.container}>
            <div className={styles.contactPanel}>
              <div>
                <h2 id="contact-title" className={styles.contactTitle}>
                  Stay in touch
                </h2>
                <p className={styles.contactText}>
                  Questions about the Accelerator? Bring them to the Community Office Hour or reach
                  the community on these channels.
                </p>
              </div>
              <ul className={styles.channels}>
                {channels.map(({ icon: Icon, title, text, href, to }) => {
                  const content = (
                    <>
                      <Icon className={styles.channelIcon} aria-hidden="true" />
                      <span>
                        <span className={styles.channelTitle}>{title}</span>
                        <span className={styles.channelText}>{text}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={title}>
                      {href ? (
                        <a className={styles.channel} href={href} target="_blank" rel="noopener noreferrer">
                          {content}
                        </a>
                      ) : (
                        <Link className={styles.channel} to={to}>
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
