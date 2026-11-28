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

import React, { useCallback, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTreeOutlined';
import NewReleasesIcon from '@mui/icons-material/NewReleasesOutlined';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryOutlined';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import GroupsIcon from '@mui/icons-material/GroupsOutlined';
import DiversityIcon from '@mui/icons-material/Diversity3Outlined';
import ZoomInIcon from '@mui/icons-material/ZoomInRounded';
import InsightsIcon from '@mui/icons-material/InsightsOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToyOutlined';
import PolicyIcon from '@mui/icons-material/PolicyOutlined';
import ReportIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';
import { getProductById, getProductsByCategory, relevanceTypes } from '@site/data/productsData';
import {
  ActivityBadge,
  KindLabel,
  MaturityBadge,
  NewBadge,
  ProductMark,
  fallbackActivity,
} from './ProductCard';
import RepoTree, { buildRepoGroups } from './RepoTree';
import Releases, { Downloads } from './Releases';
import MediaGallery, { Lightbox } from './MediaGallery';
import Contributors from './Contributors';
import OfficeHours from './OfficeHours';
import Statistics from './Statistics';
import { resetTime, useProductActivity, useProductPeople } from './liveData';
import BackButton from './BackButton';
import {
  HERO_BACKGROUNDS,
  getCategory,
  getDetailUrl,
  getKinds,
  getActivity,
  getMaturity,
  routeExists,
  timeAgo,
} from './productMeta';
import styles from './detail.module.scss';

const REPORT_VULNERABILITY_URL = 'https://github.com/eclipse-tractusx/sig-security/issues/new/choose';

function relevanceLabel(id) {
  const type = relevanceTypes.find((entry) => entry.id === id);
  return type ? type.label.replace(/^Relevant for /, '') : id;
}

function Section({ icon: Icon, title, count, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Icon className={styles.sectionIcon} />
        {title}
        {count !== undefined && <span className={styles.sectionCount}>{count}</span>}
      </h2>
      {children}
    </section>
  );
}

/** Shown on deprecated products: why, the ticket, and the alternative when there is one. */
function DeprecationNotice({ product }) {
  const { deprecation } = product;
  const alternative = deprecation.alternative && getProductById(deprecation.alternative);
  return (
    <div className={styles.deprecation} role="note">
      <WarningIcon className={styles.deprecationIcon} />
      <div>
        <strong>Deprecated: proposed for archiving under TRG 7.09</strong>
        <p>
          {deprecation.reason} Archived repositories stay readable, and existing Helm charts and container
          images stay available, but there are no more security fixes. If you run it, plan to replace it.
        </p>
        <p className={styles.deprecationLinks}>
          <a href={deprecation.ticket} target="_blank" rel="noopener noreferrer">
            Discuss it on the ticket
          </a>
          <Link to="/docs/release/trg-7/trg-7-09">TRG 7.09</Link>
          {alternative && <Link to={getDetailUrl(alternative)}>Alternative: {alternative.name}</Link>}
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <main className={styles.notFound}>
      <h1>Product not found</h1>
      <p>The product you are looking for does not exist or has moved.</p>
      <Link className={styles.buttonPrimary} to="/Products">
        <ArrowBackIcon className={styles.buttonIcon} />
        All products
      </Link>
    </main>
  );
}

/** The product's AI agent: portrait, role, its definition and (once published) its profile page. */
function AgentCard({ agent }) {
  const image = useBaseUrl(agent.image || '');
  const hasProfile = routeExists(agent.profile);
  return (
    <div className={styles.agentCard}>
      <div className={styles.agentHead}>
        {agent.image ? (
          <img className={styles.agentImage} src={image} alt="" loading="lazy" />
        ) : (
          <span className={styles.agentImage}>
            <SmartToyIcon />
          </span>
        )}
        <div>
          <p className={styles.agentKicker}>
            <SmartToyIcon className={styles.agentKickerIcon} />
            AI agent
          </p>
          <h3 className={styles.agentName}>{agent.name}</h3>
        </div>
      </div>
      <p className={styles.agentRole}>{agent.role}</p>
      <div className={styles.agentActions}>
        {hasProfile && (
          <Link className={styles.agentPrimary} to={agent.profile}>
            Meet the agent
          </Link>
        )}
        <a className={styles.agentSecondary} href={agent.url} target="_blank" rel="noopener noreferrer">
          Definition
          <OpenInNewIcon className={styles.inlineOpen} />
        </a>
      </div>
    </div>
  );
}

function SecurityTab({ product, repo }) {
  const notes = product.security?.notes || [];
  const links = [
    {
      icon: PolicyIcon,
      title: 'Security policy',
      text: 'Supported versions and how the project handles vulnerabilities.',
      url: `${repo}/security/policy`,
    },
    {
      icon: ShieldIcon,
      title: 'Security advisories',
      text: 'Published advisories for this repository.',
      url: `${repo}/security/advisories`,
    },
    {
      icon: ReportIcon,
      title: 'Report a vulnerability',
      text: 'Report privately to the Eclipse Tractus-X security team, never in a public issue.',
      url: REPORT_VULNERABILITY_URL,
    },
  ];
  return (
    <>
      {notes.length > 0 && (
        <Section icon={WarningIcon} title="Security notes">
          <ul className={styles.notes}>
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Section>
      )}
      <Section icon={ShieldIcon} title="Security">
        <ul className={styles.linkCards}>
          {links.map(({ icon: Icon, title, text, url }) => (
            <li key={title}>
              <a className={styles.linkCard} href={url} target="_blank" rel="noopener noreferrer">
                <Icon className={styles.linkCardIcon} />
                <span>
                  <span className={styles.linkCardTitle}>
                    {title}
                    <OpenInNewIcon className={styles.inlineOpen} />
                  </span>
                  <span className={styles.linkCardText}>{text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function PeopleTab({ product, people }) {
  const graphUrl =
    product.repositories[0] && `${product.repositories[0].url.replace(/\/+$/, '')}/graphs/contributors`;
  if (people.status === 'loading') {
    return <p className={styles.muted}>Loading the people behind {product.name} from GitHub and Eclipse…</p>;
  }
  return (
    <>
      <Section icon={GroupsIcon} title="Committers" count={people.committers.length}>
        <p className={styles.sourceNote}>
          {people.live
            ? 'Eclipse Tractus-X committers who committed to the repositories of this product, read live from Eclipse and GitHub.'
            : 'Eclipse or GitHub did not answer, so this is the list kept in the product data.'}
        </p>
        {people.committers.length === 0 ? (
          <p className={styles.muted}>No committer has committed to these repositories yet.</p>
        ) : (
          <ul className={styles.people}>
            {people.committers.map((committer) => (
              <li key={committer.login}>
                <a
                  className={styles.person}
                  href={`https://github.com/${committer.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.personAvatar}
                    src={`https://github.com/${committer.login}.png?size=80`}
                    alt=""
                    loading="lazy"
                    width="36"
                    height="36"
                  />
                  <span className={styles.personText}>
                    <span className={styles.personName}>
                      {committer.name || committer.login}
                      {committer.lead && <span className={styles.leadTag}>Project lead</span>}
                    </span>
                    <span className={styles.personHandle}>
                      @{committer.login}
                      {committer.contributions !== null &&
                        ` · ${committer.contributions} ${committer.contributions === 1 ? 'commit' : 'commits'}`}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section
        icon={DiversityIcon}
        title="Contributors"
        count={people.status === 'ready' ? people.contributors.length : undefined}
      >
        {people.status === 'error' || people.status === 'limited' ? (
          <p className={styles.muted}>
            {people.status === 'limited'
              ? `GitHub's limit for visitors without sign-in is used up until ${resetTime(
                  people.resetAt,
                )}; the contributors load by themselves then.`
              : 'GitHub did not answer.'}{' '}
            {graphUrl && (
              <a href={graphUrl} target="_blank" rel="noopener noreferrer">
                See the contributors on GitHub
              </a>
            )}
          </p>
        ) : (
          <>
            <p className={styles.sourceNote}>Everyone else who committed, by number of commits.</p>
            <Contributors people={people.contributors} graphUrl={graphUrl} />
          </>
        )}
      </Section>
    </>
  );
}

const noop = () => {};

export default function ProductDetail({ product, loading = false }) {
  const [tab, setTab] = useState('overview');
  const [logoOpen, setLogoOpen] = useState(false);
  const closeLogo = useCallback(() => setLogoOpen(false), []);
  const heroBackground = useBaseUrl(HERO_BACKGROUNDS.detail);
  const people = useProductPeople(product?.repositories, product?.committers);
  const activityMap = useProductActivity(product ? [product] : []);
  const activity = product ? activityMap.get(product.id) || fallbackActivity(product) : null;

  const hasMedia = Boolean(product?.screenshots?.length || product?.videos?.length);
  const tabs = product
    ? [
        { id: 'overview', label: 'Overview', icon: InfoIcon },
        {
          id: 'people',
          label: 'People',
          icon: GroupsIcon,
          count:
            people.status === 'ready' ? people.committers.length + people.contributors.length : undefined,
        },
        { id: 'statistics', label: 'Statistics', icon: InsightsIcon },
        {
          id: 'releases',
          label: 'Releases & downloads',
          icon: NewReleasesIcon,
        },
        hasMedia && {
          id: 'media',
          label: 'Screenshots & videos',
          icon: PhotoLibraryIcon,
        },
        { id: 'security', label: 'Security', icon: ShieldIcon },
      ].filter(Boolean)
    : [];

  // Tabs can be deep linked: /Products/detail?id=<id>#releases
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '');
    setTab(tabs.some((entry) => entry.id === fromHash) ? fromHash : 'overview');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) return loading ? <main className={styles.page} aria-busy="true" /> : <NotFound />;

  const selectTab = (id) => {
    setTab(id);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`);
  };

  const category = getCategory(product.category);
  const primaryRepo = product.repositories[0];
  const related = getProductsByCategory(product.category).filter((item) => item.id !== product.id);
  const { groups } = buildRepoGroups(product.repositories);
  const releaseRepos = [
    ...new Set([
      ...groups.map((group) => group.name),
      ...product.repositories.map((repository) => repository.name),
    ]),
  ];

  return (
    <main className={styles.page}>
      {logoOpen && (
        <Lightbox
          shots={[{ src: product.logo, alt: `${product.name} logo` }]}
          index={0}
          onClose={closeLogo}
          onMove={noop}
          className={styles.lightboxLogo}
        />
      )}
      <header className={styles.hero} style={{ '--hero-image': `url(${heroBackground})` }}>
        <div className={styles.container}>
          <div className={styles.heroNav}>
            <BackButton fallback={category ? category.route : '/Products'} />
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/Products">Open Source Software</Link>
              <ChevronRightIcon className={styles.breadcrumbSep} />
              {category && <Link to={category.route}>{category.name}</Link>}
              <ChevronRightIcon className={styles.breadcrumbSep} />
              <span>{product.name}</span>
            </nav>
          </div>

          <div className={styles.heroMain}>
            {product.logo ? (
              <button
                type="button"
                className={styles.heroMarkButton}
                onClick={() => setLogoOpen(true)}
                aria-label={`Show the ${product.name} logo larger`}
                title="Show larger"
              >
                <ProductMark product={product} className={styles.heroMark} />
                <ZoomInIcon className={styles.heroMarkZoom} aria-hidden="true" />
              </button>
            ) : (
              <ProductMark product={product} className={styles.heroMark} />
            )}
            <div className={styles.heroText}>
              <div className={styles.heroTitleRow}>
                <h1 className={styles.heroTitle}>{product.name}</h1>
                {product.isNew && <NewBadge />}
                <MaturityBadge maturity={product.maturity} onDark />
                <ActivityBadge activity={activity} onDark withAge />
              </div>
              {product.subtitle && <p className={styles.heroSubtitle}>{product.subtitle}</p>}
              <div className={styles.heroKinds}>
                {getKinds(product).map((kindId) => (
                  <KindLabel key={kindId} kind={kindId} className={styles.heroKind} />
                ))}
              </div>
              <p className={styles.heroDescription}>{product.description}</p>
              <div className={styles.heroActions}>
                {primaryRepo && (
                  <a
                    className={styles.buttonPrimary}
                    href={primaryRepo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className={styles.buttonIcon} />
                    View on GitHub
                  </a>
                )}
                {product.documentation && (
                  <a
                    className={styles.buttonGhost}
                    href={product.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MenuBookIcon className={styles.buttonIcon} />
                    Documentation
                  </a>
                )}
                <button type="button" className={styles.buttonGhost} onClick={() => selectTab('releases')}>
                  <DownloadIcon className={styles.buttonIcon} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.tabBar}>
        <div className={styles.container}>
          <div className={styles.tabs} role="tablist" aria-label="Product sections">
            {tabs.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                className={clsx(styles.tab, tab === id && styles.tabActive)}
                onClick={() => selectTab(id)}
              >
                <Icon className={styles.tabIcon} />
                {label}
                {count > 0 && <span className={styles.tabCount}>{count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wrapped in a section: the site CSS resets the width of direct children of <main>. */}
      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.main} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {product.deprecation && <DeprecationNotice product={product} />}

              {tab === 'overview' && (
                <>
                  <Section icon={InfoIcon} title="Overview">
                    <p className={styles.text}>{product.details || product.description}</p>
                  </Section>
                  <Section icon={AccountTreeIcon} title="Repositories" count={product.repositories.length}>
                    <RepoTree repositories={product.repositories} />
                  </Section>
                </>
              )}

              {tab === 'releases' && (
                <>
                  <Section icon={NewReleasesIcon} title="Latest releases">
                    <Releases repositories={releaseRepos} />
                  </Section>
                  <Section icon={DownloadIcon} title="Download">
                    <Downloads downloads={product.downloads} repositories={product.repositories} />
                  </Section>
                </>
              )}

              {tab === 'media' && (
                <Section icon={PhotoLibraryIcon} title="Screenshots & videos">
                  <MediaGallery screenshots={product.screenshots} videos={product.videos} />
                </Section>
              )}

              {tab === 'security' && primaryRepo && <SecurityTab product={product} repo={primaryRepo.url} />}

              {tab === 'people' && <PeopleTab product={product} people={people} />}
              {tab === 'statistics' && <Statistics product={product} people={people} activity={activity} />}
            </div>

            <aside className={styles.aside}>
              <OfficeHours product={product} />
              {product.agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}

              <div className={styles.facts}>
                <h2 className={styles.factsTitle}>At a glance</h2>
                <dl className={styles.factList}>
                  <div className={styles.fact}>
                    <dt>Category</dt>
                    <dd>{category && <Link to={category.route}>{category.name}</Link>}</dd>
                  </div>
                  <div className={styles.factBlock}>
                    <dt>Type</dt>
                    <dd className={styles.factKinds}>
                      {getKinds(product).map((kindId) => (
                        <KindLabel key={kindId} kind={kindId} />
                      ))}
                    </dd>
                  </div>
                  {product.maturity && (
                    <div className={styles.factBlock}>
                      <dt>Maturity</dt>
                      <dd>
                        <MaturityBadge maturity={product.maturity} />
                        <span className={styles.factNote}>{getMaturity(product.maturity)?.description}</span>
                      </dd>
                    </div>
                  )}
                  <div className={styles.factBlock}>
                    <dt>Activity</dt>
                    <dd>
                      {activity ? (
                        <>
                          <ActivityBadge activity={activity} />
                          <span className={styles.factNote}>
                            {activity.lastCommit?.date
                              ? `Last commit by a person ${timeAgo(activity.lastCommit.date)}${
                                  activity.lastCommit.login ? ` (${activity.lastCommit.login})` : ''
                                }. `
                              : ''}
                            {getActivity(activity.id)?.description}
                          </span>
                        </>
                      ) : (
                        <span className={styles.factNote}>
                          {activityMap.retryAt
                            ? `GitHub's limit for visitors is used up until ${resetTime(activityMap.retryAt)}; filled in then.`
                            : 'Asking GitHub…'}
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Repositories</dt>
                    <dd>{product.repositories.length}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Committers</dt>
                    <dd>{people.status === 'loading' ? '…' : people.committers.length}</dd>
                  </div>
                  {product.relevance.length > 0 && (
                    <div className={styles.factBlock}>
                      <dt>Relevant for</dt>
                      <dd>
                        <ul className={styles.tags}>
                          {product.relevance.map((id) => (
                            <li key={id} className={styles.tag}>
                              {relevanceLabel(id)}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {related.length > 0 && (
                <div className={styles.related}>
                  <h2 className={styles.factsTitle}>More in {category?.name}</h2>
                  <ul className={styles.relatedList}>
                    {related.map((item) => (
                      <li key={item.id}>
                        <Link className={styles.relatedLink} to={getDetailUrl(item)}>
                          {item.name}
                          <ChevronRightIcon className={styles.relatedArrow} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
