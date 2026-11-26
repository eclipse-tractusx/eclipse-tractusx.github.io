/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
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

/**
 * Collects the live numbers shown on the product pages (People and Statistics tabs) into
 * static/generated/product-stats.json, so that visitors read one file instead of calling
 * the GitHub API themselves (60 requests per hour without a token).
 *
 *   { generatedAt,
 *     committers: [{ github, name, lead }],          Eclipse Tractus-X committers and leads
 *     repos: { "<repo>": { stats: {..., lastCommit: { date, login } }, contributors: [{ login, contributions }] } } }
 *
 * The repositories are those listed under `repositories` in data/productsData.js. The
 * deploy workflow runs it with GITHUB_TOKEN before every build and once a day. Without a
 * token it does nothing, and the pages read the APIs in the browser instead.
 *
 * Usage: GITHUB_TOKEN=... node utils/generateProductStats.js [--max-age-hours=<n>]
 *
 * `npm start` runs it with --max-age-hours=12: with a token set (GITHUB_TOKEN=$(gh auth token)
 * npm start), the local preview gets all numbers from the file too, collected again when the
 * file is older than 12 hours.
 */

const fs = require('fs');
const path = require('path');

const ORG = 'eclipse-tractusx';
const ECLIPSE_PROJECT = 'automotive.tractusx';
const DATA = path.join(__dirname, '..', 'data', 'productsData.js');
const OUT = path.join(__dirname, '..', 'static', 'generated', 'product-stats.json');
const TIMEOUT_MS = 20000;

const token = process.env.GITHUB_TOKEN;
const headers = {
  'User-Agent': 'eclipse-tractusx.github.io-product-stats',
  Accept: 'application/vnd.github+json',
};
if (token) headers.Authorization = `Bearer ${token}`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// web-flow is the account GitHub uses for commits made in its web interface.
const isBot = (user) =>
  user.type === 'Bot' || user.login === 'web-flow' || /\[bot\]$|-bot$/i.test(user.login);

async function request(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { ...headers, ...extraHeaders },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (res.status === 404) return { status: 404, data: null, res };
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return { status: res.status, data: res.status === 204 ? null : await res.json(), res };
}

const github = (repoPath) => request(`https://api.github.com/repos/${ORG}/${repoPath}`);

/** All pages of a list endpoint. */
async function githubAll(repoPath) {
  const items = [];
  for (let page = 1; page <= 10; page += 1) {
    const separator = repoPath.includes('?') ? '&' : '?';
    const { data } = await github(`${repoPath}${separator}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    items.push(...data);
    if (data.length < 100) break;
  }
  return items;
}

function productRepositories() {
  const source = fs.readFileSync(DATA, 'utf8');
  // Entries of the `repositories` lists: { name: '...', url: 'https://github.com/eclipse-tractusx/<repo>' }
  const names = [
    ...source.matchAll(
      /name:\s*'[^']+',\s*url:\s*'https:\/\/github\.com\/eclipse-tractusx\/([A-Za-z0-9._-]+)\/?'/g,
    ),
  ].map((match) => match[1]);
  return [...new Set(names)].sort();
}

async function committers() {
  const { data } = await request(`https://projects.eclipse.org/api/projects/${ECLIPSE_PROJECT}`);
  const project = data[0];
  const leads = new Set(project.project_leads.map((person) => person.username));
  const people = [...project.committers, ...project.project_leads].filter(
    (person, index, all) => all.findIndex((other) => other.username === person.username) === index,
  );
  const profiles = [];
  for (const person of people) {
    try {
      const { data: profile } = await request(
        `https://api.eclipse.org/account/profile/${encodeURIComponent(person.username)}`,
      );
      if (profile?.github_handle) {
        profiles.push({
          github: profile.github_handle,
          name: profile.full_name || person.full_name,
          lead: leads.has(person.username),
        });
      }
    } catch (error) {
      console.warn(`  could not read the Eclipse profile of ${person.username}: ${error.message}`);
    }
  }
  return profiles;
}

// GitHub computes commit statistics on request and answers 202 until they are ready.
async function commitActivity(repo) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const { status, data } = await github(`${repo}/stats/commit_activity`);
    if (status === 200 && Array.isArray(data))
      return data.map((week) => ({ week: week.week, total: week.total }));
    await wait(3000);
  }
  return null;
}

// Only commits by people count as activity: bots keep sending dependency updates to
// unmaintained repositories, and GitHub's "pushed at" moves with every branch they push.
const isBotCommit = (commit) =>
  (commit.author && isBot(commit.author)) || /\[bot\]|dependabot|renovate/i.test(commit.commit.author.name);

/** The newest commit by a person on the main branch: { date, login }, or null. */
async function lastCommit(repo) {
  const { data } = await github(`${repo}/commits?per_page=100`);
  const commit = (data || []).find((entry) => !isBotCommit(entry));
  return commit ? { date: commit.commit.committer.date, login: commit.author?.login || null } : null;
}

async function repository(repo) {
  const { data: info } = await github(repo);
  if (!info) return null;
  const [pulls, activity, releases, contributors, last] = await Promise.all([
    githubAll(`${repo}/pulls?state=open`).then((list) => list.length),
    commitActivity(repo),
    githubAll(`${repo}/releases`).then((list) =>
      list
        .filter((release) => !release.draft)
        .map((release) => ({ tag: release.tag_name, date: release.published_at })),
    ),
    githubAll(`${repo}/contributors`).then((list) =>
      list
        .filter((user) => user.login && !isBot(user))
        .map((user) => ({ login: user.login, contributions: user.contributions })),
    ),
    lastCommit(repo),
  ]);
  return {
    stats: {
      repo,
      url: info.html_url,
      stars: info.stargazers_count,
      forks: info.forks_count,
      openIssues: Math.max(0, info.open_issues_count - pulls),
      openPulls: pulls,
      pushedAt: info.pushed_at,
      lastCommit: last,
      createdAt: info.created_at,
      language: info.language,
      license: info.license?.spdx_id || null,
      archived: info.archived,
      activity,
      releases,
    },
    contributors,
  };
}

async function main() {
  if (!token) {
    console.log(
      'generateProductStats: no GITHUB_TOKEN, skipped (the product pages read the APIs in the browser; with GITHUB_TOKEN=$(gh auth token) they read one file).',
    );
    return;
  }
  const maxAge = Number((process.argv.find((arg) => arg.startsWith('--max-age-hours=')) || '').split('=')[1]);
  if (maxAge && fs.existsSync(OUT)) {
    const hours = (Date.now() - fs.statSync(OUT).mtimeMs) / 3600000;
    if (hours < maxAge) {
      console.log(
        `generateProductStats: ${path.relative(process.cwd(), OUT)} is ${hours.toFixed(1)} hours old, kept.`,
      );
      return;
    }
  }
  const repos = productRepositories();
  console.log(`generateProductStats: ${repos.length} repositories`);

  const result = { generatedAt: new Date().toISOString(), committers: [], repos: {} };
  try {
    result.committers = await committers();
    console.log(`  ${result.committers.length} committers with a GitHub handle`);
  } catch (error) {
    console.warn(`  could not read the Eclipse committers: ${error.message}`);
  }

  // A few repositories at a time keeps well below GitHub's secondary rate limits.
  for (let index = 0; index < repos.length; index += 4) {
    const batch = repos.slice(index, index + 4);
    const answers = await Promise.allSettled(batch.map((repo) => repository(repo)));
    answers.forEach((answer, offset) => {
      const repo = batch[offset];
      if (answer.status === 'fulfilled' && answer.value) result.repos[repo] = answer.value;
      else console.warn(`  skipped ${repo}: ${answer.reason?.message || 'not found'}`);
    });
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(result));
  console.log(
    `  wrote ${path.relative(process.cwd(), OUT)} (${Object.keys(result.repos).length} repositories)`,
  );
}

main().catch((error) => {
  // Never fail the build: the pages fall back to the live APIs.
  console.warn(`generateProductStats: ${error.message}`);
});
