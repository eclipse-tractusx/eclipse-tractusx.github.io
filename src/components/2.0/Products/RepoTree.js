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

import React from 'react';
import Link from '@docusaurus/Link';
import repoTree from '@site/data/tractusxRepoTree.json';
import styles from './detail.module.css';

const nameOf = url => url.replace(/\/+$/, '').replace(/\.git$/, '').split('/').pop();

/**
 * Groups a product's repositories as their `.tractusx` files describe them (TRG 2.05):
 * each leading repository with the repositories that belong to it. Repositories of the
 * product without a `.tractusx` entry are listed apart.
 */
export function buildRepoGroups(repositories) {
  const trees = repoTree.trees;
  const names = repositories.map(r => nameOf(r.url));
  const leadingOf = n => (trees[n] ? n : Object.keys(trees).find(k => trees[k].repositories.some(c => c.name === n)));
  const groups = [];
  const seen = new Set();
  const untracked = [];
  for (const n of names) {
    const lead = leadingOf(n);
    if (!lead) { untracked.push(n); continue; }
    if (seen.has(lead)) continue;
    seen.add(lead);
    groups.push({ name: lead, ...trees[lead] });
  }
  return { groups, untracked };
}

function RepoNode({ name, url, children, lead }) {
  return (
    <a className={`${styles.node} ${lead ? styles.nodeLead : ''}`} href={url} target="_blank" rel="noopener noreferrer">
      <svg className={styles.repoIcon} viewBox="0 0 16 16" aria-hidden="true">
        <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
      </svg>
      <span className={styles.nodeText}>
        <span className={styles.nodeName}>{name}</span>
        {children}
      </span>
    </a>
  );
}

export default function RepoTree({ repositories }) {
  const { groups, untracked } = buildRepoGroups(repositories);
  const productRepos = new Set(repositories.map(r => nameOf(r.url)));
  return (
    <div className={styles.treeWrap}>
      {groups.map(g => (
        <div key={g.name} className={styles.tree}>
          <RepoNode name={g.name} url={g.url} lead>
            <span className={styles.nodeSub}>
              <span className={styles.tag}>Leading repository</span>
              {g.product && g.product !== g.name && <span className={styles.nodeUsage}>{g.product}</span>}
              {g.repoCategory && <span className={styles.tagMuted}>{g.repoCategory}</span>}
            </span>
          </RepoNode>
          {g.repositories.length > 0 && (
            <ul className={styles.branches}>
              {g.repositories.map(c => (
                <li key={c.name} className={styles.branch}>
                  <RepoNode name={c.name} url={c.url}>
                    <span className={styles.nodeSub}>
                      {c.usage && <span className={styles.nodeUsage}>{c.usage}</span>}
                      {!c.declared && <span className={styles.tagMuted} title="This repository's .tractusx names the leading repository, which doesn't list it">links back only</span>}
                      {!productRepos.has(c.name) && <span className={styles.tagMuted} title="Found in .tractusx, not in this page's product list">from .tractusx</span>}
                    </span>
                  </RepoNode>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {untracked.length > 0 && (
        <div className={styles.tree}>
          <p className={styles.untrackedTitle}>No <code>.tractusx</code> entry found</p>
          <ul className={styles.plainList}>
            {untracked.map(n => (
              <li key={n}><RepoNode name={n} url={`https://github.com/eclipse-tractusx/${n}`} /></li>
            ))}
          </ul>
        </div>
      )}
      <p className={styles.source}>
        From the <code>.tractusx</code> metadata files (<Link to="/docs/release/trg-2/trg-2-05">TRG 2.05</Link>), read on {new Date(repoTree.generatedAt).toISOString().slice(0, 10)}.
      </p>
    </div>
  );
}
