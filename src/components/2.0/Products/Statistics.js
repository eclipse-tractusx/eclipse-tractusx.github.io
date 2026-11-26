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

import React, { useState } from 'react';
import clsx from 'clsx';
import TimelineIcon from '@mui/icons-material/TimelineRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import BedtimeIcon from '@mui/icons-material/BedtimeOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import { useRepoStats } from './liveData';
import styles from './detail.module.scss';

const DAY_MS = 24 * 60 * 60 * 1000;
const TOP = 10;

const daysSince = (iso) => Math.floor((Date.now() - new Date(iso).getTime()) / DAY_MS);
const ago = (iso) => {
  const days = daysSince(iso);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 45) return `${days} days ago`;
  if (days < 548) return `${Math.round(days / 30.4)} months ago`;
  return `${(days / 365).toFixed(1)} years ago`;
};
const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const number = (value) => new Intl.NumberFormat('en-GB').format(value);

/** Adds up the weekly commits of all repositories (GitHub gives the last 52 weeks). */
function weeklyCommits(stats) {
  const byWeek = new Map();
  stats.forEach((repo) =>
    (repo.activity || []).forEach(({ week, total }) => byWeek.set(week, (byWeek.get(week) || 0) + total)),
  );
  return [...byWeek.entries()].sort((a, b) => a[0] - b[0]).map(([week, total]) => ({ week, total }));
}

function maintenance(stats, weeks) {
  if (stats.every((repo) => repo.archived)) {
    return { tone: 'archived', icon: ArchiveIcon, label: 'Archived', text: 'All repositories are archived.' };
  }
  const lastPush = Math.min(...stats.map((repo) => daysSince(repo.pushedAt)));
  const recent = weeks.slice(-4).reduce((sum, week) => sum + week.total, 0);
  if (recent > 0 || lastPush <= 30) {
    return {
      tone: 'active',
      icon: CheckCircleIcon,
      label: 'Actively maintained',
      text: recent > 0 ? `${recent} commits in the last four weeks.` : 'Changes in the last 30 days.',
    };
  }
  if (lastPush <= 180) {
    return { tone: 'quiet', icon: ScheduleIcon, label: 'Quiet', text: 'No commits in the last month.' };
  }
  return { tone: 'dormant', icon: BedtimeIcon, label: 'Dormant', text: 'No commits in the last six months.' };
}

function releaseFacts(releases) {
  if (!releases || releases.length === 0) return null;
  const dates = releases.map((release) => new Date(release.date).getTime()).sort((a, b) => b - a);
  const recent = dates.filter((date) => Date.now() - date < 365 * DAY_MS);
  const lastYear = recent.length;
  // The rhythm of the last 12 months, or of all releases when there were fewer than two.
  const basis = recent.length >= 2 ? recent : dates;
  // Average time between releases: the span from the first to the last, shared out.
  const rhythm =
    basis.length >= 2 ? (basis[0] - basis[basis.length - 1]) / DAY_MS / (basis.length - 1) : null;
  return {
    last: releases.find((release) => new Date(release.date).getTime() === dates[0]),
    lastYear,
    rhythm,
  };
}

function Tile({ label, value, note }) {
  return (
    <div className={styles.statTile}>
      <dt>{label}</dt>
      <dd>
        <span className={styles.statTileValue}>{value}</span>
        {note && <span className={styles.statTileNote}>{note}</span>}
      </dd>
    </div>
  );
}

/* Commits per week ------------------------------------------------------------ */

const W = 720;
const H = 190;
const M = { top: 12, right: 8, bottom: 24, left: 34 };

const niceMax = (value) => {
  if (value <= 4) return 4;
  const power = 10 ** Math.floor(Math.log10(value));
  return [1, 2, 2.5, 5, 10].map((step) => step * power).find((candidate) => candidate >= value);
};

// A bar with rounded top corners, anchored to the baseline.
const barPath = (x, y, width, height) => {
  const r = Math.min(3, width / 2, height);
  return `M${x},${y + height}V${y + r}Q${x},${y} ${x + r},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${y + height}Z`;
};

function CommitChart({ weeks }) {
  const [active, setActive] = useState(null);
  const max = niceMax(Math.max(...weeks.map((week) => week.total), 1));
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const band = plotW / weeks.length;
  const y = (value) => M.top + plotH - (value / max) * plotH;
  const ticks = [0, max / 2, max];
  const months = weeks
    .map((week, index) => ({ index, date: new Date(week.week * 1000) }))
    .filter(({ index, date }) => {
      const previous = index > 0 && new Date(weeks[index - 1].week * 1000);
      return previous && previous.getMonth() !== date.getMonth() && date.getMonth() % 3 === 0;
    });
  const current = active !== null ? weeks[active] : null;

  return (
    <div className={styles.chart} onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Commits per week over the last year">
        {ticks.map((tick) => (
          <g key={tick}>
            <line className={styles.chartGrid} x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} />
            <text className={styles.chartAxis} x={M.left - 6} y={y(tick) + 4} textAnchor="end">
              {tick}
            </text>
          </g>
        ))}
        {months.map(({ index, date }) => (
          <text key={index} className={styles.chartAxis} x={M.left + index * band} y={H - 6}>
            {date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })}
          </text>
        ))}
        {weeks.map((week, index) => {
          const height = (week.total / max) * plotH;
          const x = M.left + index * band + 1;
          return (
            <g key={week.week}>
              {week.total > 0 && (
                <path
                  className={clsx(styles.chartBar, active !== null && active !== index && styles.chartBarDim)}
                  d={barPath(x, y(week.total), Math.max(band - 2, 1), height)}
                />
              )}
              <rect
                className={styles.chartHit}
                x={M.left + index * band}
                y={M.top}
                width={band}
                height={plotH}
                onMouseEnter={() => setActive(index)}
              />
            </g>
          );
        })}
      </svg>
      {current && (
        <div
          className={styles.chartTip}
          style={{ left: `${((M.left + (active + 0.5) * band) / W) * 100}%` }}
          role="status"
        >
          <strong>
            {current.total} {current.total === 1 ? 'commit' : 'commits'}
          </strong>
          <span>week of {shortDate(current.week * 1000)}</span>
        </div>
      )}
    </div>
  );
}

/* Top contributors ------------------------------------------------------------ */

function TopContributors({ people, committerLogins }) {
  const top = people.slice(0, TOP);
  const max = Math.max(...top.map((person) => person.contributions), 1);
  return (
    <ol className={styles.topList}>
      {top.map((person, index) => (
        <li key={person.login} className={styles.topRow}>
          <span className={styles.topRank}>{index + 1}</span>
          <a
            className={styles.topWho}
            href={`https://github.com/${person.login}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`https://github.com/${person.login}.png?size=48`}
              alt=""
              loading="lazy"
              width="24"
              height="24"
            />
            <span>{person.login}</span>
            {committerLogins.has(person.login.toLowerCase()) && (
              <span className={styles.leadTag}>Committer</span>
            )}
          </a>
          <span className={styles.topBarTrack} aria-hidden="true">
            <span className={styles.topBar} style={{ width: `${(person.contributions / max) * 100}%` }} />
          </span>
          <span className={styles.topValue}>{number(person.contributions)}</span>
        </li>
      ))}
    </ol>
  );
}

/* Tab ------------------------------------------------------------------------- */

function Block({ icon: Icon, title, note, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Icon className={styles.sectionIcon} />
        {title}
      </h2>
      {note && <p className={styles.sourceNote}>{note}</p>}
      {children}
    </section>
  );
}

export default function Statistics({ product, people }) {
  const { status, data } = useRepoStats(product.repositories);

  if (status === 'loading') return <p className={styles.muted}>Loading live numbers from GitHub…</p>;
  if (status === 'error') {
    return (
      <p className={styles.muted}>
        GitHub did not answer (it allows a limited number of requests per hour without sign-in). Try again
        later.
      </p>
    );
  }

  const { stats, missing } = data;
  const weeks = weeklyCommits(stats);
  const commitsYear = weeks.reduce((sum, week) => sum + week.total, 0);
  const health = maintenance(stats, weeks);
  const releases = releaseFacts(stats[0].releases);
  const lastPush = stats.reduce((latest, repo) => (repo.pushedAt > latest ? repo.pushedAt : latest), '');
  const sum = (key) => stats.reduce((total, repo) => total + repo[key], 0);
  const committerLogins = new Set(people.committers.map((person) => person.login.toLowerCase()));
  const HealthIcon = health.icon;

  return (
    <>
      <Block
        icon={BuildIcon}
        title="Maintenance"
        note={`${
          data.collectedAt
            ? `From GitHub, collected ${shortDate(data.collectedAt)}`
            : 'Live from GitHub, refreshed every hour'
        }, for ${stats.length} ${stats.length === 1 ? 'repository' : 'repositories'}.${
          missing ? ` ${missing} did not answer.` : ''
        }`}
      >
        <div className={clsx(styles.health, styles[`health_${health.tone}`])}>
          <HealthIcon className={styles.healthIcon} />
          <div>
            <strong>{health.label}</strong>
            <span>{health.text}</span>
          </div>
        </div>
        <dl className={styles.statTiles}>
          <Tile label="Last change" value={ago(lastPush)} note={shortDate(lastPush)} />
          <Tile
            label="Last release"
            value={releases ? ago(releases.last.date) : 'none'}
            note={releases ? releases.last.tag : 'in the leading repository'}
          />
          <Tile
            label="Release rhythm"
            value={releases?.rhythm ? `every ${Math.round(releases.rhythm)} days` : '–'}
            note={releases ? `${releases.lastYear} releases in the last 12 months` : null}
          />
          <Tile label="Open issues" value={number(sum('openIssues'))} />
          <Tile label="Open pull requests" value={number(sum('openPulls'))} />
        </dl>
      </Block>

      <Block
        icon={TimelineIcon}
        title="Activity"
        note="Commits per week over the last 12 months, all repositories together."
      >
        <dl className={styles.statTiles}>
          <Tile label="Commits, 12 months" value={weeks.length ? number(commitsYear) : '…'} />
          <Tile label="Contributors" value={number(people.all.length)} note="since the start" />
          <Tile label="Committers" value={number(people.committers.length)} />
          <Tile label="Stars" value={number(sum('stars'))} />
          <Tile label="Forks" value={number(sum('forks'))} />
        </dl>
        {weeks.length > 0 ? (
          <CommitChart weeks={weeks} />
        ) : (
          <p className={styles.muted}>
            GitHub is still preparing the commit statistics. Reload the page in a minute.
          </p>
        )}
      </Block>

      {people.all.length > 0 && (
        <Block
          icon={EmojiEventsIcon}
          title="Top contributors"
          note="By number of commits to the repositories of this product."
        >
          <TopContributors people={people.all} committerLogins={committerLogins} />
        </Block>
      )}

      <Block icon={FolderIcon} title="Repositories">
        <div className={styles.tableWrap}>
          <table className={styles.repoTable}>
            <thead>
              <tr>
                <th>Repository</th>
                <th>Last change</th>
                <th>Open issues</th>
                <th>Open PRs</th>
                <th>Stars</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((repo) => (
                <tr key={repo.repo}>
                  <td>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      {repo.repo}
                    </a>
                    {repo.archived && <span className={styles.deprecatedTag}>Archived</span>}
                  </td>
                  <td>{ago(repo.pushedAt)}</td>
                  <td>{number(repo.openIssues)}</td>
                  <td>{number(repo.openPulls)}</td>
                  <td>{number(repo.stars)}</td>
                  <td>{repo.language || '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
    </>
  );
}
