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

// Dedicated page of the Tractus-X Accelerator, in the look of the About Us page.
//
// Section order: hero, sticky in-page navigation, purpose, what we offer, who it is for, how to join, events,
// partners and funding, stay in touch. Program facts come from
// data/tractusxAccelerator.js; please keep new copy to facts the Accelerator owners
// have confirmed.

import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import ThemedImage from '@theme/ThemedImage';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { tractusxOrganizations } from '@site/data/tractusxOrganizations';
import { upcomingEvents, getUpcomingEvents } from '@site/data/upcomingEvents';
import {
  acceleratorEventFormats,
  acceleratorEvents,
  acceleratorFocusAreas,
  acceleratorLogos,
  acceleratorPartnerIds,
  acceleratorPeriod,
  splitAcceleratorEvents,
} from '@site/data/tractusxAccelerator';
import FundingBadge from '@site/src/components/FundingBadge';
import heroStyles from '@site/src/components/AboutUsHeader/styles.module.css';
import styles from './styles.module.scss';

// Icons for the `icon` keys of acceleratorFocusAreas.
const focusIcons = {
  financing: PaymentsOutlinedIcon,
  docs: MenuBookOutlinedIcon,
  community: PublicOutlinedIcon,
  dataspaces: HubOutlinedIcon,
  strategy: ExploreOutlinedIcon,
  events: EventOutlinedIcon,
};

// The Community Office Hour is featured on the open meetings page.
const OFFICE_HOUR = '/community/open-meetings';
const MAILING_LIST = 'https://accounts.eclipse.org/mailing-list/tractusx-dev';
const MATRIX = 'https://matrix.to/#/#tractusx-dev:matrix.eclipse.org';

const audiences = [
  {
    icon: CodeOutlinedIcon,
    title: 'Projects',
    description:
      'Open-source projects that want to join Eclipse Tractus-X or grow inside it, with clearer documentation, release and quality processes.',
    cta: { label: 'Read the release process', to: '/docs/oss/release-process' },
  },
  {
    icon: GroupsOutlinedIcon,
    title: 'Developers',
    description:
      'Developers who want to make their first contribution or take on more responsibility, and meet the community at hackathons and Community Days.',
    cta: { label: 'How to contribute', to: '/docs/oss/how-to-contribute' },
  },
  {
    icon: BusinessOutlinedIcon,
    title: 'Organizations',
    description:
      'Companies, institutions and dataspace initiatives, including those beyond Catena-X, that want to use Tractus-X and shape it with the community.',
    cta: { label: 'Ways to contribute', to: '/Contribute' },
  },
];

// TODO(accelerator owners): confirm or extend these steps.
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
    text: 'Hackathons, thinkathons and the Community Days bring newcomers and experienced members together to work on real challenges.',
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
    icon: ChatOutlinedIcon,
    title: 'Matrix',
    text: 'Chat with the community in the Tractus-X developer channel.',
    href: MATRIX,
  },
  {
    icon: ArticleOutlinedIcon,
    title: 'TX News blog',
    text: 'Event invitations, recaps and project news.',
    to: '/blog',
  },
];

// Sections listed in the sticky in-page navigation, in page order.
const pageSections = [
  { id: 'about', label: 'About' },
  { id: 'offer', label: 'Goals' },
  { id: 'audience', label: 'Who it is for' },
  { id: 'join', label: 'How to join' },
  { id: 'events', label: 'Events' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact', label: 'Contact' },
];

const pageSectionIds = pageSections.map(({ id }) => id);

/** Id of the section currently in view, for the in-page navigation. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      // A section counts as current while it crosses the upper part of the viewport.
      { rootMargin: '-20% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Sticky navigation to the sections of the page. */
function SectionNav() {
  const active = useActiveSection(pageSectionIds);
  const listRef = useRef(null);
  // On narrow screens the list scrolls sideways: keep the current section's link in view
  // without moving the page itself.
  useEffect(() => {
    const list = listRef.current;
    const link = list && list.querySelector('[aria-current]');
    if (!link) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);
  return (
    <nav className={styles.sectionNav} aria-label="On this page">
      <ul ref={listRef}>
        {pageSections.map(({ id, label }) => (
          <li key={id}>
            <Link to={`#${id}`} aria-current={active === id ? 'location' : undefined}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const partners = acceleratorPartnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

const logoSrc = (id) => acceleratorLogos.find((logo) => logo.id === id).src;

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** Section with an eyebrow, a heading and an optional intro, as on the About Us page. */
function Section({ id, eyebrow, title, intro, children }) {
  // Register the anchor so in-page links pass Docusaurus' broken anchor check.
  useBrokenLinks().collectAnchor(id);
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/** The opening "What the Accelerator is" section, with its anchor registered. */
function AboutSection({ children }) {
  useBrokenLinks().collectAnchor('about');
  return (
    <section id="about" className={styles.intro} aria-labelledby="purpose-title">
      {children}
    </section>
  );
}

/** One event card; `past` events link to their blog post as a recap. */
function EventCard({ event, label }) {
  return (
    <article className={styles.infoCard}>
      <span className={styles.badge}>{label}</span>
      <h3>{event.title}</h3>
      <p className={styles.eventMeta}>
        <span>
          <CalendarTodayOutlinedIcon aria-hidden="true" />
          {event.endDate ? `${formatDate(event.date)} – ${formatDate(event.endDate)}` : formatDate(event.date)}
        </span>
        <span>
          <LocationOnOutlinedIcon aria-hidden="true" />
          {event.location}
        </span>
      </p>
      {event.summary && <p>{event.summary}</p>}
      {event.blogSlug && <Link to={`/blog/${event.blogSlug}`}>Read more →</Link>}
    </article>
  );
}

export default function AcceleratorPage() {
  const lightLogo = useBaseUrl(logoSrc('color-dark-text'));
  const darkLogo = useBaseUrl(logoSrc('color-light-text'));
  const { upcoming, past } = splitAcceleratorEvents(acceleratorEvents);
  const acceleratorEventIds = new Set(acceleratorEvents.map((event) => event.id));
  // The next community event outside the Accelerator, from the site-wide calendar.
  const nextCommunityEvent = getUpcomingEvents(upcomingEvents).find(
    (event) => !acceleratorEventIds.has(event.id)
  );
  const period = acceleratorPeriod.replace(' - ', ' – ');

  return (
    <Layout
      title="Tractus-X Accelerator"
      description="The Tractus-X Accelerator strengthens the Eclipse Tractus-X community: financing models, better documentation and processes, a worldwide community, new dataspace initiatives, strategy and events. It is not a software development project."
    >
      <header className={heroStyles.about_header}>
        <ThemedImage
          alt=""
          sources={{
            light: useBaseUrl('/img/main-bg-light.png'),
            dark: useBaseUrl('/img/main_bg-min.png'),
          }}
          className={heroStyles.hero_bg}
        />
        <div className={`${heroStyles.container} ${styles.heroContainer}`}>
          <div className={styles.heroLogo}>
            <ThemedImage alt="" aria-hidden="true" sources={{ light: lightLogo, dark: darkLogo }} />
          </div>
          <div className={heroStyles.information_container}>
            <p className={styles.heroEyebrow}>
              <RocketLaunchOutlinedIcon aria-hidden="true" /> {period}
            </p>
            <h1 className="headers-title-h1">Tractus-X Accelerator</h1>
            <p className={heroStyles.subtitle}>
              Strengthening the Eclipse Tractus-X community: financing models, better documentation and
              processes, a worldwide community of contributors and new dataspace initiatives beyond
              Catena-X.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.outlinedbutton} to="#join">
                How to join
              </Link>
              <Link className={styles.textButton} to={OFFICE_HOUR}>
                Join an open meeting →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <SectionNav />
        <div className={styles.container}>
          <AboutSection>
            <p className={styles.eyebrow}>What the Accelerator is</p>
            <h2 id="purpose-title">Strengthening the community around Eclipse Tractus-X</h2>
            <p className={styles.lead}>
              Eclipse Tractus-X builds open-source dataspace technology together with an
              international community. The Tractus-X Accelerator supports that community: it works
              on financing models, better documentation and processes, and a stronger worldwide
              community, and it opens Eclipse Tractus-X to dataspace initiatives beyond Catena-X.
            </p>
            <p>
              It defines the strategy, organizes events that bring people together more often and
              coordinates improvements to the software across projects. It runs {period} and is
              supported by the German Federal Ministry for Economic Affairs and Energy (BMWE).
            </p>
            <aside className={styles.notice}>
              <strong>Not a software development project.</strong> The Accelerator does not build
              Tractus-X itself. The software stays in the hands of the open-source projects,
              contributors and committers; the Accelerator coordinates, connects and enables them.
            </aside>
          </AboutSection>

          <Section
            id="offer"
            eyebrow="What we work on"
            title="Six goals for the community"
            intro="Together, they make Eclipse Tractus-X easier to fund, to join and to build on."
          >
            <ol className={styles.cards}>
              {acceleratorFocusAreas.map(({ id, icon, title, description }, index) => {
                const Icon = focusIcons[icon] || RocketLaunchOutlinedIcon;
                return (
                  <li key={id} className={styles.card}>
                    <div className={styles.stepHeader}>
                      <Icon aria-hidden="true" />
                      <span className={styles.stepNumber}>0{index + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section id="audience" eyebrow="Who it is for" title="Projects, developers, organizations and initiatives">
            <ul className={styles.cards}>
              {audiences.map(({ icon: Icon, title, description, cta }) => (
                <li key={title} className={styles.infoCard}>
                  <Icon className={styles.cardIcon} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link to={cta.to}>{cta.label} →</Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="join"
            eyebrow="How to join"
            title="Your way into the community"
            intro="You don't need an invitation to start. These steps use the community's open channels."
          >
            <ol className={`${styles.cards} ${styles.cardsFour}`}>
              {joinSteps.map(({ title, text, link }, index) => (
                <li key={title} className={styles.card}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to={link.to}>{link.label} →</Link>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            id="events"
            eyebrow="Events"
            title="Meet, think and build together"
            intro="Intentional events bring the community together more often, in three formats."
          >
            <ul className={`${styles.cards} ${styles.formats}`}>
              {acceleratorEventFormats.map(({ id, title, description }) => (
                <li key={id} className={styles.infoCard}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <div className={styles.twoColumns}>
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} label="Upcoming Accelerator event" />
              ))}
              {upcoming.length === 0 && (
                <article className={styles.infoCard}>
                  <span className={styles.badge}>Upcoming Accelerator events</span>
                  <h3>Stay tuned</h3>
                  <p>
                    The next Accelerator event will be announced on the TX News blog, the mailing
                    list and in the Community Office Hour.
                  </p>
                  <Link to="/blog">Go to the blog →</Link>
                </article>
              )}
              {nextCommunityEvent && (
                <EventCard event={{ ...nextCommunityEvent, summary: null }} label="Next community event" />
              )}
              {past.map((event) => (
                <EventCard key={event.id} event={event} label="Past Accelerator event" />
              ))}
            </div>
          </Section>

          <Section
            id="partners"
            eyebrow="Partners and funding"
            title="Who makes it happen"
            intro="The partners of the Tractus-X Accelerator and its public funding."
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
            <FundingBadge />
          </Section>

          <Section
            id="contact"
            eyebrow="Stay in touch"
            title="Questions about the Accelerator?"
            intro="Bring them to the Community Office Hour or reach the community on these channels."
          >
            <ul className={styles.cards}>
              {channels.map(({ icon: Icon, title, text, href, to }) => (
                <li key={title} className={styles.infoCard}>
                  <Icon className={styles.cardIcon} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      Open {title} →
                    </a>
                  ) : (
                    <Link to={to}>Read the blog →</Link>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
    </Layout>
  );
}
