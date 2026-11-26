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

import { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { activityOf, isDeprecated } from './productMeta';

/*
 * Live data for the product pages:
 * - the Eclipse projects API for the Eclipse Tractus-X committers and project leads,
 * - the GitHub API for contributors, repository numbers and commit activity.
 *
 * The deploy workflow collects all of it once per build and once a day into
 * /generated/product-stats.json (utils/generateProductStats.js), so a visitor reads one
 * file. When the file is missing (local development, pull request previews) or does not
 * know a repository, the browser asks the APIs itself; those answers are cached in
 * localStorage because GitHub allows 60 requests per hour without a token.
 */

const ORG = 'eclipse-tractusx';
const ECLIPSE_PROJECT = 'automotive.tractusx';
const HOUR = 60 * 60 * 1000;
const PREFIX = 'tx-live:';

export const repoName = (url) => url.replace(/\/+$/, '').split('/').pop();
// web-flow is the account GitHub uses for commits made in its web interface.
const isBot = (user) =>
  user.type === 'Bot' || user.login === 'web-flow' || /\[bot\]$|-bot$/i.test(user.login);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readCache(key, maxAge) {
  try {
    const entry = JSON.parse(window.localStorage.getItem(PREFIX + key));
    if (entry && Date.now() - entry.at < maxAge) return entry.value;
  } catch (error) {
    // Ignore broken or blocked storage.
  }
  return undefined;
}

function writeCache(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify({ at: Date.now(), value }));
  } catch (error) {
    // Storage full or blocked: the data is still used for this page.
  }
}

/**
 * The value under `key` when it is younger than `maxAge`, otherwise `load()`. When loading
 * fails (GitHub's limit, no network), an older value is better than none, so it is used.
 */
async function cached(key, maxAge, load, keep = () => true) {
  const hit = readCache(key, maxAge);
  if (hit !== undefined) return hit;
  let value;
  try {
    value = await load();
  } catch (error) {
    const old = readCache(key, Infinity);
    if (old !== undefined) return old;
    throw error;
  }
  if (keep(value)) writeCache(key, value);
  return value;
}

/* GitHub's limit for visitors ---------------------------------------------------- */

/** Thrown while GitHub's hourly limit for visitors without sign-in is used up. */
export class RateLimited extends Error {
  constructor(resetAt) {
    super('GitHub rate limit');
    this.resetAt = resetAt;
  }
}

const LIMIT_KEY = `${PREFIX}limited-until`;

// Remembered across pages, so that no page asks again before the limit resets.
function limitedUntil() {
  try {
    const until = Number(window.localStorage.getItem(LIMIT_KEY));
    return until > Date.now() ? until : 0;
  } catch (error) {
    return 0;
  }
}

function rememberLimit(response) {
  const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000;
  const until = reset > Date.now() ? reset : Date.now() + 10 * 60 * 1000;
  try {
    window.localStorage.setItem(LIMIT_KEY, String(until));
  } catch (error) {
    // Storage blocked: this page still waits.
  }
  return until;
}

/** The time the limit resets, such as "14:32". */
export const resetTime = (resetAt) =>
  new Date(resetAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

async function getJson(url) {
  const fromGitHub = url.startsWith('https://api.github.com/');
  if (fromGitHub && limitedUntil()) throw new RateLimited(limitedUntil());
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (
    fromGitHub &&
    (response.status === 403 || response.status === 429) &&
    response.headers.get('x-ratelimit-remaining') === '0'
  ) {
    throw new RateLimited(rememberLimit(response));
  }
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return {
    status: response.status,
    headers: response.headers,
    data: response.status === 204 ? null : await response.json(),
  };
}

const github = (path) => getJson(`https://api.github.com/repos/${ORG}/${path}`);

/**
 * Runs `load` once per `deps` change and reports { status, data }. While GitHub's limit is
 * used up, status is 'limited' with `resetAt`, and `load` runs again once it resets. `load`
 * can also return data with a `retryAt` (some answers missing because of the limit) to be
 * run again then.
 */
function useLive(load, deps) {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let timer;
    const retryAt = (at) => {
      timer = window.setTimeout(() => setAttempt((count) => count + 1), Math.max(at - Date.now(), 0) + 3000);
    };
    if (attempt === 0) setState({ status: 'loading', data: null });
    load()
      .then((data) => {
        if (cancelled) return;
        setState({ status: 'ready', data });
        if (data?.retryAt) retryAt(data.retryAt);
      })
      .catch((error) => {
        if (cancelled) return;
        if (error instanceof RateLimited) {
          setState({ status: 'limited', data: null, resetAt: error.resetAt });
          retryAt(error.resetAt);
        } else {
          setState({ status: 'error', data: null });
        }
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);
  return state;
}

/* Snapshot from the build ------------------------------------------------------ */

const SNAPSHOT_PATH = '/generated/product-stats.json';
let snapshotPromise = null;

/** The numbers collected at build time, or null when the site was built without them. */
function loadSnapshot(url) {
  if (!snapshotPromise) {
    snapshotPromise = fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);
  }
  return snapshotPromise;
}

const inSnapshot = (snapshot, repos) => Boolean(snapshot && repos.every((repo) => snapshot.repos?.[repo]));

/* Eclipse Tractus-X committers ------------------------------------------------ */

/** Committers and project leads of Eclipse Tractus-X, keyed by lower-case GitHub handle. */
async function loadCommitters(snapshot) {
  if (snapshot?.committers?.length) {
    return new Map(snapshot.committers.map((person) => [person.github.toLowerCase(), person]));
  }
  const list = await cached('eclipse-committers', 24 * HOUR, async () => {
    const { data } = await getJson(`https://projects.eclipse.org/api/projects/${ECLIPSE_PROJECT}`);
    const project = data[0];
    const leads = new Set(project.project_leads.map((person) => person.username));
    const people = [...project.committers, ...project.project_leads].filter(
      (person, index, all) => all.findIndex((other) => other.username === person.username) === index,
    );
    const profiles = await Promise.all(
      people.map((person) =>
        getJson(`https://api.eclipse.org/account/profile/${encodeURIComponent(person.username)}`)
          .then(({ data: profile }) => ({
            github: profile.github_handle,
            name: profile.full_name || person.full_name,
            lead: leads.has(person.username),
          }))
          .catch(() => null),
      ),
    );
    return profiles.filter((profile) => profile && profile.github);
  });
  return new Map(list.map((person) => [person.github.toLowerCase(), person]));
}

/* Contributors ---------------------------------------------------------------- */

/** Everyone who committed to the repositories, merged by login, most commits first. */
function mergeContributors(lists) {
  const byLogin = new Map();
  lists.flat().forEach((user) => {
    if (!user.login || isBot(user)) return;
    const entry = byLogin.get(user.login) || { login: user.login, contributions: 0 };
    entry.contributions += user.contributions;
    byLogin.set(user.login, entry);
  });
  return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
}

async function loadContributors(repos, snapshot) {
  if (inSnapshot(snapshot, repos))
    return mergeContributors(repos.map((repo) => snapshot.repos[repo].contributors));
  return cached(`contributors:${repos.join(',')}`, HOUR, async () => {
    const lists = await Promise.all(
      repos.map((repo) => github(`${repo}/contributors?per_page=100`).then(({ data }) => data || [])),
    );
    return mergeContributors(lists);
  });
}

/**
 * The people behind a product, all live: committers are the Eclipse Tractus-X
 * committers who committed to the product's repositories; contributors are everyone else.
 * When a source does not answer, `fallback` (the committers in the product data) is used.
 */
export function useProductPeople(repositories = [], fallback = []) {
  const repos = repositories.map((repository) => repoName(repository.url));
  const snapshotUrl = useBaseUrl(SNAPSHOT_PATH);
  const state = useLive(async () => {
    const snapshot = await loadSnapshot(snapshotUrl);
    const [contributors, committerMap] = await Promise.all([
      loadContributors(repos, snapshot),
      loadCommitters(snapshot).catch(() => null),
    ]);
    if (!committerMap) {
      const known = new Set(fallback.map((person) => person.github.toLowerCase()));
      return {
        live: false,
        committers: fallback.map((person) => ({
          login: person.github,
          name: person.name,
          contributions: null,
        })),
        contributors: contributors.filter((person) => !known.has(person.login.toLowerCase())),
        all: contributors,
      };
    }
    const committers = [];
    const others = [];
    contributors.forEach((person) => {
      const committer = committerMap.get(person.login.toLowerCase());
      if (committer) committers.push({ ...person, name: committer.name, lead: committer.lead });
      else others.push(person);
    });
    return { live: true, committers, contributors: others, all: contributors };
  }, [repos.join(',')]);

  if (state.status === 'error' || state.status === 'limited') {
    return {
      status: state.status,
      resetAt: state.resetAt,
      live: false,
      committers: fallback.map((person) => ({
        login: person.github,
        name: person.name,
        contributions: null,
      })),
      contributors: [],
      all: [],
    };
  }
  return {
    status: state.status,
    ...(state.data || { live: false, committers: [], contributors: [], all: [] }),
  };
}

/* Repository statistics ------------------------------------------------------- */

const lastPage = (headers) => {
  const match = /[?&]page=(\d+)>;\s*rel="last"/.exec(headers.get('Link') || '');
  return match ? Number(match[1]) : null;
};

// GitHub computes commit statistics on request and answers 202 until they are ready.
async function commitActivity(repo) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { status, data } = await github(`${repo}/stats/commit_activity`);
    if (status === 200 && Array.isArray(data))
      return data.map((week) => ({ week: week.week, total: week.total }));
    await wait(2500);
  }
  return null;
}

/* Last commit by a person ---------------------------------------------------- */

// Bots keep sending dependency updates to unmaintained repositories, so only commits by
// people count. GitHub's "pushed at" date is no help either: it moves with every branch
// a bot pushes.
const isBotCommit = (commit) =>
  (commit.author && isBot(commit.author)) || /\[bot\]|dependabot|renovate/i.test(commit.commit.author.name);

/** The newest commit by a person on the main branch: { date, login }, or null. */
function loadLastCommit(repo) {
  return cached(`last-commit:${repo}`, 6 * HOUR, async () => {
    const { data } = await github(`${repo}/commits?per_page=50`);
    const commit = (data || []).find((entry) => !isBotCommit(entry));
    return commit ? { date: commit.commit.committer.date, login: commit.author?.login || null } : null;
  });
}

const newest = (commits) =>
  commits
    .filter(Boolean)
    .reduce((latest, commit) => (!latest || commit.date > latest.date ? commit : latest), null);

/**
 * Active, stale or deprecated for each product of `list`, as a Map from product id to
 * { id, lastCommit, archived }. From the build snapshot (all repositories of a product)
 * when there is one. Otherwise live from GitHub, cached for six hours: all repositories for
 * a single product, the leading repository of each product for a list (one request per
 * product). Products not known yet are missing from the Map.
 */
export function useProductActivity(list = []) {
  const snapshotUrl = useBaseUrl(SNAPSHOT_PATH);
  const state = useLive(async () => {
    const snapshot = await loadSnapshot(snapshotUrl);
    let retryAt = null;
    const entries = await Promise.all(
      list.map(async (product) => {
        const repos = product.repositories.map((repository) => repoName(repository.url));
        let facts;
        if (
          inSnapshot(snapshot, repos) &&
          repos.every((repo) => 'lastCommit' in snapshot.repos[repo].stats)
        ) {
          const stats = repos.map((repo) => snapshot.repos[repo].stats);
          facts = {
            lastCommit: newest(stats.map((repo) => repo.lastCommit)),
            archived: stats.every((repo) => repo.archived),
          };
        } else if (!isDeprecated(product) && repos.length) {
          // One product (its own page): all its repositories. A list: the leading one each.
          const asked = list.length === 1 ? repos : repos.slice(0, 1);
          const answers = await Promise.allSettled(asked.map((repo) => loadLastCommit(repo)));
          const known = answers.filter((answer) => answer.status === 'fulfilled');
          if (known.length)
            facts = { lastCommit: newest(known.map((answer) => answer.value)), archived: false };
          answers.forEach((answer) => {
            if (answer.reason instanceof RateLimited) retryAt = answer.reason.resetAt;
          });
        }
        return [product.id, activityOf(product, facts)];
      }),
    );
    return { map: new Map(entries.filter(([, activity]) => activity)), retryAt };
  }, [list.map((product) => product.id).join(',')]);
  const map = state.data?.map || EMPTY;
  // When GitHub's limit stopped some answers: when they come (the hook asks again then).
  return state.data?.retryAt ? Object.assign(new Map(map), { retryAt: state.data.retryAt }) : map;
}
const EMPTY = new Map();

async function loadRepoStats(repo, withReleases) {
  return cached(
    `repo:${repo}:${withReleases ? 'r' : ''}`,
    HOUR,
    async () => {
      const [info, pulls, activity, releases, lastCommit] = await Promise.all([
        github(repo).then(({ data }) => data),
        github(`${repo}/pulls?state=open&per_page=1`).then(
          ({ headers, data }) => lastPage(headers) ?? data.length,
        ),
        commitActivity(repo).catch(() => null),
        withReleases
          ? github(`${repo}/releases?per_page=100`).then(({ data }) =>
              data
                .filter((release) => !release.draft)
                .map((release) => ({ tag: release.tag_name, date: release.published_at })),
            )
          : Promise.resolve(null),
        loadLastCommit(repo).catch(() => null),
      ]);
      return {
        repo,
        url: info.html_url,
        stars: info.stargazers_count,
        forks: info.forks_count,
        openIssues: Math.max(0, info.open_issues_count - pulls),
        openPulls: pulls,
        pushedAt: info.pushed_at,
        lastCommit,
        createdAt: info.created_at,
        language: info.language,
        license: info.license?.spdx_id,
        archived: info.archived,
        activity,
        releases,
      };
      // Commit statistics that were still being computed are fetched again next time.
    },
    (value) => value.activity !== null,
  );
}

/** Live numbers for every repository of a product; releases come from the leading repository. */
export function useRepoStats(repositories = []) {
  const repos = repositories.map((repository) => repoName(repository.url));
  const snapshotUrl = useBaseUrl(SNAPSHOT_PATH);
  return useLive(async () => {
    const snapshot = await loadSnapshot(snapshotUrl);
    if (inSnapshot(snapshot, repos)) {
      return {
        stats: repos.map((repo) => snapshot.repos[repo].stats),
        missing: 0,
        collectedAt: snapshot.generatedAt,
      };
    }
    const results = await Promise.allSettled(repos.map((repo, index) => loadRepoStats(repo, index === 0)));
    const stats = results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
    const limit = results.find((result) => result.reason instanceof RateLimited);
    if (stats.length === 0) throw limit ? limit.reason : new Error('no repository answered');
    return {
      stats,
      missing: repos.length - stats.length,
      collectedAt: null,
      retryAt: limit ? limit.reason.resetAt : null,
    };
  }, [repos.join(',')]);
}

/* Releases -------------------------------------------------------------------- */

/** The latest `count` releases of a repository, newest first, cached for an hour. */
export function useReleases(repo, count) {
  return useLive(
    () =>
      cached(`releases:${repo}:${count}`, HOUR, async () => {
        const { data } = await github(`${repo}/releases?per_page=${count + 1}`);
        return data
          .filter((release) => !release.draft)
          .slice(0, count)
          .map((release) => ({
            tag: release.tag_name,
            name: release.name,
            date: release.published_at,
            prerelease: release.prerelease,
            url: release.html_url,
          }));
      }),
    [repo, count],
  );
}
