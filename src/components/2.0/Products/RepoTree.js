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

import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded';
import repoTree from '@site/data/tractusxRepoTree.json';
import { deprecatedRepositories } from '@site/data/productsData';
import styles from './detail.module.scss';

const ORG_URL = 'https://github.com/eclipse-tractusx';
const nameOf = (url) =>
  url
    .replace(/\/+$/, '')
    .replace(/\.git$/, '')
    .split('/')
    .pop();

/**
 * Groups a product's repositories the way their `.tractusx` files describe them
 * (TRG 2.05): every leading repository with the repositories that belong to it.
 * Repositories without a `.tractusx` entry are returned apart.
 */
export function buildRepoGroups(repositories) {
  const { trees } = repoTree;
  const leadingOf = (name) =>
    trees[name]
      ? name
      : Object.keys(trees).find((key) => trees[key].repositories.some((child) => child.name === name));

  const groups = [];
  const untracked = [];
  repositories.forEach((repository) => {
    const name = nameOf(repository.url);
    const lead = leadingOf(name);
    if (!lead) {
      untracked.push(name);
    } else if (!groups.some((group) => group.name === lead)) {
      groups.push({ name: lead, ...trees[lead] });
    }
  });
  return { groups, untracked };
}

function Node({ name, url, lead, meta }) {
  const deprecated = deprecatedRepositories[name];
  return (
    <a
      className={clsx(styles.node, lead && styles.nodeLead, deprecated && styles.nodeDeprecated)}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={deprecated ? `Deprecated: ${deprecated.reason}` : undefined}
    >
      <GitHubIcon className={styles.nodeIcon} />
      <span className={styles.nodeText}>
        <span className={styles.nodeName}>{name}</span>
        {meta && <span className={styles.nodeMeta}>{meta}</span>}
      </span>
      {deprecated && <span className={styles.deprecatedTag}>Deprecated</span>}
      {lead && <span className={styles.leadTag}>Leading</span>}
      <OpenInNewIcon className={styles.nodeOpen} />
    </a>
  );
}

export default function RepoTree({ repositories }) {
  const { groups, untracked } = buildRepoGroups(repositories);

  return (
    <div className={styles.tree}>
      {groups.map((group) => (
        <div key={group.name} className={styles.treeGroup}>
          <Node
            lead
            name={group.name}
            url={group.url}
            meta={[group.product !== group.name && group.product, group.repoCategory]
              .filter(Boolean)
              .join(' · ')}
          />
          {group.repositories.length > 0 && (
            <ul className={styles.branches}>
              {group.repositories.map((child) => (
                <li key={child.name} className={styles.branch}>
                  <Node name={child.name} url={child.url} meta={child.usage} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {untracked.length > 0 && (
        <div className={styles.treeGroup}>
          <p className={styles.treeLabel}>
            Not described in a <code>.tractusx</code> file yet
          </p>
          <ul className={styles.flatList}>
            {untracked.map((name) => (
              <li key={name}>
                <Node name={name} url={`${ORG_URL}/${name}`} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={styles.treeSource}>
        Structure from the repositories&apos; <code>.tractusx</code> files (
        <Link to="/docs/release/trg-2/trg-2-05">TRG 2.05</Link>), read on {repoTree.generatedAt.slice(0, 10)}.
      </p>
    </div>
  );
}
