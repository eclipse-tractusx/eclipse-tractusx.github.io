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
 * Builds data/tractusxRepoTree.json from the `.tractusx` metadata file (TRG 2.05) of every
 * non-archived repository in the eclipse-tractusx GitHub organization.
 *
 * Each `.tractusx` names the product's leading repository; the leading repository can also
 * list the product's other repositories with their usage. The script joins both directions
 * into one tree per leading repository:
 *
 *   { generatedAt, trees: { "<leading repo name>": { product, url, repoCategory,
 *       repositories: [{ name, url, usage, declared, linked }] } } }
 *
 *   declared: listed in the leading repository's `repositories` section
 *   linked:   the repository's own `.tractusx` points to this leading repository
 *
 * The script never fails the build: without network access it keeps the committed file.
 * Set GITHUB_TOKEN to raise the GitHub API rate limit.
 *
 * Usage: node utils/generateTractusxRepoTree.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ORG = 'eclipse-tractusx';
const OUT = path.join(__dirname, '..', 'data', 'tractusxRepoTree.json');
const TIMEOUT_MS = 15000;

const headers = { 'User-Agent': 'eclipse-tractusx.github.io-repo-tree' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

async function listRepos() {
  const repos = [];
  for (let page = 1; page < 10; page++) {
    const res = await get(`https://api.github.com/orgs/${ORG}/repos?per_page=100&page=${page}`);
    const batch = await res.json();
    // Public repositories only: with a token the API also returns private ones, such as
    // the temporary forks of GitHub security advisories (<repo>-ghsa-...), which must
    // never be published.
    repos.push(
      ...batch
        .filter(r => !r.archived && !r.private && r.visibility !== 'private' && !/-ghsa-/i.test(r.name))
        .map(r => ({ name: r.name, branch: r.default_branch })),
    );
    if (batch.length < 100) break;
  }
  return repos;
}

async function readMetadata({ name, branch }) {
  const res = await get(`https://raw.githubusercontent.com/${ORG}/${name}/${branch}/.tractusx`);
  if (!res) return null;
  try {
    return yaml.load(await res.text()) || null;
  } catch (e) {
    console.warn(`[repo-tree] ${name}: .tractusx is not valid YAML, skipped`);
    return null;
  }
}

const repoName = url => (url || '').replace(/\/+$/, '').replace(/\.git$/, '').split('/').pop();

function buildTrees(metadata, publicNames) {
  const trees = {};
  const tree = leading => {
    trees[leading] = trees[leading] || {
      product: null,
      url: `https://github.com/${ORG}/${leading}`,
      repoCategory: null,
      repositories: [],
    };
    return trees[leading];
  };
  const child = (t, name) => {
    let c = t.repositories.find(r => r.name === name);
    if (!c) {
      c = { name, url: `https://github.com/${ORG}/${name}`, usage: null, declared: false, linked: false };
      t.repositories.push(c);
    }
    return c;
  };

  for (const [name, meta] of Object.entries(metadata)) {
    const leading = repoName(meta.leadingRepository);
    if (!leading) continue;
    const t = tree(leading);
    if (leading === name) {
      t.product = meta.product || t.product;
      t.repoCategory = meta.repoCategory || null;
      for (const r of meta.repositories || []) {
        const n = repoName(r.url) || r.name;
        if (!n || n === leading || !publicNames.has(n)) continue;
        const c = child(t, n);
        c.declared = true;
        c.usage = r.usage || c.usage;
      }
    } else if (publicNames.has(leading)) {
      child(t, name).linked = true;
    }
  }
  for (const t of Object.values(trees)) t.repositories.sort((a, b) => a.name.localeCompare(b.name));
  return Object.fromEntries(Object.entries(trees).sort(([a], [b]) => a.localeCompare(b)));
}

async function main() {
  const repos = await listRepos();
  const metadata = {};
  const results = await Promise.all(repos.map(async r => [r.name, await readMetadata(r)]));
  for (const [name, meta] of results) if (meta) metadata[name] = meta;
  const data = { generatedAt: new Date().toISOString(), source: `.tractusx files of github.com/${ORG}`, trees: buildTrees(metadata, new Set(repos.map(r => r.name))) };
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`[repo-tree] ${Object.keys(metadata).length} of ${repos.length} repositories have a .tractusx; ${Object.keys(data.trees).length} products written to data/tractusxRepoTree.json`);
}

main().catch(err => {
  console.warn(`[repo-tree] kept the committed data/tractusxRepoTree.json: ${err.message}`);
});
