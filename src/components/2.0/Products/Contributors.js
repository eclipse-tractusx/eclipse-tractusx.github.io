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

import React, { useEffect, useState } from 'react';
import styles from './detail.module.scss';

const ORG = 'eclipse-tractusx';
const SHOWN = 24;

const repoName = (url) => url.replace(/\/+$/, '').split('/').pop();
const isBot = (user) => user.type === 'Bot' || /\[bot\]$|-bot$/i.test(user.login);

/**
 * Contributors of all repositories of a product, read live from the GitHub API (no
 * token, so the public rate limit applies) and cached for the browser session. People
 * who contributed to several repositories are counted once, with their commits added up.
 */
function useContributors(repositories) {
  const repos = repositories.map((repository) => repoName(repository.url));
  const key = `tx-contributors:${repos.join(',')}`;
  const [state, setState] = useState({ status: 'loading', people: [] });

  useEffect(() => {
    let cancelled = false;
    const cached = window.sessionStorage.getItem(key);
    if (cached) {
      setState({ status: 'ready', people: JSON.parse(cached) });
      return undefined;
    }
    setState({ status: 'loading', people: [] });
    Promise.all(
      repos.map((repo) =>
        fetch(`https://api.github.com/repos/${ORG}/${repo}/contributors?per_page=100`, {
          headers: { Accept: 'application/vnd.github+json' },
        }).then((response) => {
          if (response.status === 204) return [];
          if (!response.ok) throw new Error(String(response.status));
          return response.json();
        }),
      ),
    )
      .then((lists) => {
        const byLogin = new Map();
        lists.flat().forEach((user) => {
          if (!user.login || isBot(user)) return;
          const entry = byLogin.get(user.login) || { login: user.login, contributions: 0 };
          entry.contributions += user.contributions;
          byLogin.set(user.login, entry);
        });
        const people = [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
        window.sessionStorage.setItem(key, JSON.stringify(people));
        if (!cancelled) setState({ status: 'ready', people });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', people: [] });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

/** Everyone who contributed to the product's repositories, apart from its committers. */
export default function Contributors({ repositories, committers }) {
  const { status, people } = useContributors(repositories);
  const [expanded, setExpanded] = useState(false);
  const committerLogins = new Set(committers.map((committer) => committer.github.toLowerCase()));
  const others = people.filter((person) => !committerLogins.has(person.login.toLowerCase()));
  const shown = expanded ? others : others.slice(0, SHOWN);
  const graphUrl = repositories[0] && `${repositories[0].url.replace(/\/+$/, '')}/graphs/contributors`;

  if (status === 'loading') return <p className={styles.muted}>Loading contributors from GitHub…</p>;
  if (status === 'error') {
    return (
      <p className={styles.muted}>
        GitHub did not answer (the public API allows a limited number of requests per hour).{' '}
        {graphUrl && (
          <a href={graphUrl} target="_blank" rel="noopener noreferrer">
            See the contributors on GitHub
          </a>
        )}
      </p>
    );
  }
  if (others.length === 0) return <p className={styles.muted}>No other contributors yet.</p>;

  return (
    <>
      <p className={styles.contributorsNote}>
        {others.length} {others.length === 1 ? 'person' : 'people'} besides the committers, by number of
        commits. Read live from GitHub.
      </p>
      <ul className={styles.contributors}>
        {shown.map((person) => (
          <li key={person.login}>
            <a
              className={styles.contributor}
              href={`https://github.com/${person.login}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`${person.login}: ${person.contributions} ${person.contributions === 1 ? 'commit' : 'commits'}`}
            >
              <img
                className={styles.contributorAvatar}
                src={`https://github.com/${person.login}.png?size=64`}
                alt=""
                loading="lazy"
                width="28"
                height="28"
              />
              <span className={styles.contributorName}>{person.login}</span>
              <span className={styles.contributorCount}>{person.contributions}</span>
            </a>
          </li>
        ))}
      </ul>
      {others.length > SHOWN && (
        <button type="button" className={styles.showMore} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show fewer' : `Show all ${others.length}`}
        </button>
      )}
    </>
  );
}
