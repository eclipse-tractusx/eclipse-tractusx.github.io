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
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToyOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import NewIcon from '@mui/icons-material/AutoAwesomeRounded';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import { CATEGORY_ICONS, KIND_ICONS, getDetailUrl, getKind, getKinds, getMaturity } from './productMeta';
import styles from './styles.module.scss';

const MAX_AVATARS = 3;

/** Maturity label. Cards show it only when a product is not "mature". */
export function MaturityBadge({ maturity, onDark = false, className }) {
  const level = getMaturity(maturity);
  return (
    <span
      className={clsx(styles.status, styles[`status_${maturity}`], onDark && styles.statusOnDark, className)}
      title={level?.description}
    >
      <span className={styles.statusDot} aria-hidden="true" />
      {level?.label || maturity}
    </span>
  );
}

/** Marks a product that was added to the portfolio recently (`isNew` in the product data). */
export function NewBadge({ className }) {
  return (
    <span
      className={clsx(styles.newBadge, className)}
      title="Recently added to the Eclipse Tractus-X portfolio"
    >
      <NewIcon className={styles.newBadgeIcon} aria-hidden="true" />
      New
    </span>
  );
}

/** What the product is (operating service, library, ...), with its icon. */
export function KindLabel({ kind, className }) {
  const info = getKind(kind);
  const Icon = KIND_ICONS[kind];
  if (!info) return null;
  return (
    <span className={clsx(styles.kind, className)} title={info.description}>
      {Icon && <Icon className={styles.kindIcon} />}
      {info.label}
    </span>
  );
}

/** The product logo when there is one, otherwise the icon of its kind (or category). */
export function ProductMark({ product, className }) {
  const logo = useBaseUrl(product.logo || '');
  const Icon = KIND_ICONS[getKinds(product)[0]] || CATEGORY_ICONS[product.category];
  return (
    <span className={clsx(styles.mark, product.logo && styles.markLogo, className)}>
      {product.logo ? <img src={logo} alt="" loading="lazy" /> : Icon && <Icon />}
    </span>
  );
}

/** Overlapping GitHub avatars of the first committers. */
export function AvatarStack({ committers }) {
  if (!committers.length) return null;
  const shown = committers.slice(0, MAX_AVATARS);
  const rest = committers.length - shown.length;
  return (
    <span
      className={styles.avatars}
      title={committers.map((committer) => committer.name || committer.github).join(', ')}
    >
      {shown.map((committer) => (
        <img
          key={committer.github}
          className={styles.avatar}
          src={`https://github.com/${committer.github}.png?size=56`}
          alt=""
          loading="lazy"
          width="24"
          height="24"
        />
      ))}
      {rest > 0 && <span className={styles.avatarMore}>+{rest}</span>}
    </span>
  );
}

export default function ProductCard({ product, showKind = true }) {
  const repoCount = product.repositories.length;
  const agentNames = product.agents.map((agent) => agent.name).join(', ');
  const detailUrl = getDetailUrl(product);

  return (
    <article
      className={clsx(
        styles.card,
        product.isNew && styles.cardNew,
        product.maturity === 'deprecated' && styles.cardDeprecated,
      )}
    >
      {product.isNew && <NewBadge className={styles.cardNewBadge} />}
      {/* The releases tab is rendered on the client, so the anchor is not in the static HTML. */}
      <Link
        className={styles.cardDownload}
        to={`${detailUrl}#releases`}
        data-noBrokenLinkCheck
        aria-label={`Download ${product.name}`}
        title="Download"
      >
        <DownloadIcon />
      </Link>
      <div className={styles.cardBody}>
        <ProductMark product={product} className={styles.cardMedia} />
        <div className={styles.cardContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>
              <Link to={detailUrl} className={styles.cardLink}>
                {product.name}
              </Link>
            </h3>
            {product.agents.length > 0 && (
              <span className={styles.agentChip} title={`AI agent: ${agentNames}`}>
                <SmartToyIcon className={styles.agentChipIcon} />
                AI
              </span>
            )}
          </div>
          <div className={styles.cardTags}>
            {getKinds(product)
              .filter((kindId, index) => showKind || index > 0)
              .map((kindId) => (
                <KindLabel key={kindId} kind={kindId} />
              ))}
            {product.maturity !== 'mature' && <MaturityBadge maturity={product.maturity} />}
          </div>
          <p className={styles.cardDescription}>{product.description}</p>
          <div className={styles.cardMetaRow}>
            <span
              className={styles.cardMeta}
              title={`${repoCount} ${repoCount === 1 ? 'repository' : 'repositories'}`}
            >
              <FolderIcon className={styles.cardMetaIcon} />
              {repoCount} {repoCount === 1 ? 'repo' : 'repos'}
            </span>
            <AvatarStack committers={product.committers} />
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        {product.repositories[0] && (
          <a
            className={styles.cardAction}
            href={product.repositories[0].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${product.name} on GitHub`}
          >
            <GitHubIcon />
            GitHub
          </a>
        )}
        <Link className={clsx(styles.cardAction, styles.cardActionPrimary)} to={detailUrl} tabIndex={-1}>
          Open
          <ArrowForwardIcon />
        </Link>
      </div>
    </article>
  );
}
