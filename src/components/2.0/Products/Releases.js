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
import clsx from 'clsx';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import SailingIcon from '@mui/icons-material/SailingOutlined';
import ViewInArIcon from '@mui/icons-material/ViewInArOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import styles from './detail.module.scss';

const ORG = 'eclipse-tractusx';
const SHOWN = 5;

const DOWNLOAD_TYPES = {
  helm: { icon: SailingIcon, label: 'Helm chart' },
  container: { icon: ViewInArIcon, label: 'Container image' },
  package: { icon: Inventory2Icon, label: 'Package' },
  binary: { icon: DownloadIcon, label: 'Download' },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Latest releases of a repository, read live from the GitHub API (no token, so the
 * public rate limit applies). Results are cached for the browser session.
 */
function useReleases(repo) {
  const [state, setState] = useState({ status: 'loading', releases: [] });

  useEffect(() => {
    let cancelled = false;
    const key = `tx-releases:${repo}`;
    const cached = window.sessionStorage.getItem(key);
    if (cached) {
      setState({ status: 'ready', releases: JSON.parse(cached) });
      return undefined;
    }
    setState({ status: 'loading', releases: [] });
    fetch(`https://api.github.com/repos/${ORG}/${repo}/releases?per_page=${SHOWN + 1}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data) => {
        const releases = data
          .filter((release) => !release.draft)
          .slice(0, SHOWN)
          .map((release) => ({
            tag: release.tag_name,
            name: release.name,
            date: release.published_at,
            prerelease: release.prerelease,
            url: release.html_url,
          }));
        window.sessionStorage.setItem(key, JSON.stringify(releases));
        if (!cancelled) setState({ status: 'ready', releases });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', releases: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return state;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={styles.copy}
      aria-label="Copy command"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      {copied ? <CheckIcon /> : <ContentCopyIcon />}
    </button>
  );
}

export function Downloads({ downloads = [], repositories }) {
  return (
    <ul className={styles.downloads}>
      {downloads.map((download) => {
        const type = DOWNLOAD_TYPES[download.type] || DOWNLOAD_TYPES.binary;
        const Icon = type.icon;
        return (
          <li key={`${download.type}-${download.label}`} className={styles.download}>
            <div className={styles.downloadHead}>
              <Icon className={styles.downloadIcon} />
              <span className={styles.downloadType}>{type.label}</span>
              <a
                className={styles.downloadLabel}
                href={download.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {download.label}
                <OpenInNewIcon className={styles.inlineOpen} />
              </a>
            </div>
            {download.command && (
              <div className={styles.command}>
                <pre>{download.command}</pre>
                <CopyButton text={download.command} />
              </div>
            )}
          </li>
        );
      })}
      {repositories.map((repository) => (
        <li key={repository.url} className={styles.download}>
          <div className={styles.downloadHead}>
            <Inventory2Icon className={styles.downloadIcon} />
            <span className={styles.downloadType}>Source and release assets</span>
            <a
              className={styles.downloadLabel}
              href={`${repository.url}/releases`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repository.name}
              <OpenInNewIcon className={styles.inlineOpen} />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Releases({ repositories }) {
  const [repo, setRepo] = useState(repositories[0]);
  const { status, releases } = useReleases(repo);
  const repoUrl = `https://github.com/${ORG}/${repo}`;

  return (
    <div>
      {repositories.length > 1 && (
        <div className={styles.segmented} role="tablist" aria-label="Repository">
          {repositories.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={repo === name}
              className={clsx(styles.segment, repo === name && styles.segmentActive)}
              onClick={() => setRepo(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {status === 'loading' && (
        <ul className={styles.releases} aria-busy="true">
          {[0, 1, 2].map((index) => (
            <li key={index} className={clsx(styles.release, styles.releaseSkeleton)} />
          ))}
        </ul>
      )}

      {status === 'error' && (
        <p className={styles.muted}>
          The releases could not be loaded from GitHub right now.{' '}
          <a href={`${repoUrl}/releases`} target="_blank" rel="noopener noreferrer">
            Open them on GitHub
          </a>
          .
        </p>
      )}

      {status === 'ready' && releases.length === 0 && (
        <p className={styles.muted}>
          No releases published in <code>{repo}</code> yet.
        </p>
      )}

      {status === 'ready' && releases.length > 0 && (
        <ul className={styles.releases}>
          {releases.map((release, index) => (
            <li key={release.tag}>
              <a className={styles.release} href={release.url} target="_blank" rel="noopener noreferrer">
                <LocalOfferIcon className={styles.releaseIcon} />
                <span className={styles.releaseTag}>{release.tag}</span>
                {index === 0 && !release.prerelease && <span className={styles.latest}>Latest</span>}
                {release.prerelease && <span className={styles.pre}>Pre-release</span>}
                <span className={styles.releaseName}>
                  {release.name && release.name !== release.tag ? release.name : ''}
                </span>
                <span className={styles.releaseDate}>{formatDate(release.date)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <a className={styles.moreLink} href={`${repoUrl}/releases`} target="_blank" rel="noopener noreferrer">
        All releases of {repo}
        <OpenInNewIcon className={styles.inlineOpen} />
      </a>
    </div>
  );
}
