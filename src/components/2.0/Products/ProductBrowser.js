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

import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';
import NewIcon from '@mui/icons-material/AutoAwesomeRounded';
import { productCategories, productKinds, maturityLevels, DEPRECATION_NOTICE } from '@site/data/productsData';
import ProductCard, {
  ACTIVITY_ICONS,
  ActivityBadge,
  MaturityBadge,
  MaturityMeter,
  fallbackActivity,
} from './ProductCard';
import {
  ACTIVITY_LEVELS,
  CATEGORY_ICONS,
  KIND_ICONS,
  STALE_AFTER_DAYS,
  getKinds,
  groupByKind,
  matchesSearch,
} from './productMeta';
import { useProductActivity } from './liveData';
import styles from './styles.module.scss';

const ALL = 'all';

/** A row of filter buttons with counts. Options without products are left out. */
function FilterRow({ label, options, value, onChange, children }) {
  return (
    <div className={styles.filterRow} role="group" aria-label={label}>
      <span className={styles.filterLabel}>{label}</span>
      {options
        .filter((option) => option.id === ALL || option.count > 0)
        .map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              className={clsx(
                styles.filterChip,
                value === option.id && styles.filterChipOn,
                option.tone && styles[`filterChip_${option.tone}`],
              )}
              aria-pressed={value === option.id}
              onClick={() => onChange(option.id)}
              title={option.description}
            >
              {Icon && <Icon className={clsx(styles.filterChipIcon, option.iconClass)} />}
              {option.label}
              <span className={styles.filterCount}>{option.count}</span>
            </button>
          );
        })}
      {children}
    </div>
  );
}

/** The products of one category (or of the whole list), in kind sub-groups. */
function KindGroups({ items, activity }) {
  return (
    <div className={styles.kindGroups}>
      {groupByKind(items).map((kind) => (
        <KindGroup key={kind.id} kind={kind} activity={activity} />
      ))}
    </div>
  );
}

// Small groups sit side by side: each group asks for room for its own number of cards.
function KindGroup({ kind, activity }) {
  const Icon = KIND_ICONS[kind.id];
  return (
    <div className={styles.kindGroup} style={{ '--cards': kind.items.length }}>
      <div className={styles.kindHeader}>
        {Icon && <Icon className={styles.kindHeaderIcon} />}
        <h4 className={styles.kindTitle}>{kind.plural}</h4>
        <span className={styles.kindDescription}>{kind.description}</span>
      </div>
      <div className={styles.cards}>
        {kind.items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            activity={activity.get(product.id)}
            showKind={false}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Search, type, maturity and activity filters, and the product cards in kind sub-groups.
 * With `grouped`, the cards are first grouped by category and each group links to its page.
 */
export default function ProductBrowser({ items, title, grouped = false, onReset }) {
  const [search, setSearch] = useState('');
  const [kind, setKind] = useState(ALL);
  const [maturity, setMaturity] = useState(ALL);
  const [onlyNew, setOnlyNew] = useState(false);
  const [activityFilter, setActivityFilter] = useState(ALL);
  const activity = useProductActivity(items);
  const query = search.trim().toLowerCase();

  const activityOf = (product) => (activity.get(product.id) || fallbackActivity(product))?.id;
  const searched = useMemo(() => items.filter((product) => matchesSearch(product, query)), [items, query]);
  // Each filter row counts what the other rows let through.
  const tests = {
    kind: (product) => kind === ALL || getKinds(product).includes(kind),
    maturity: (product) => maturity === ALL || product.maturity === maturity,
    isNew: (product) => !onlyNew || product.isNew,
    activity: (product) => activityFilter === ALL || activityOf(product) === activityFilter,
  };
  const passes = (product, skip) =>
    Object.entries(tests).every(([name, test]) => name === skip || test(product));
  const count = (skip, extra) => searched.filter((product) => passes(product, skip) && extra(product)).length;

  const visible = searched.filter((product) => passes(product));
  const filtered = query || kind !== ALL || maturity !== ALL || onlyNew || activityFilter !== ALL;
  const newCount = count('isNew', (product) => product.isNew);

  const kindOptions = [
    { id: ALL, label: 'All', count: count('kind', () => true) },
    ...productKinds.map((option) => ({
      id: option.id,
      label: option.label,
      description: option.description,
      icon: KIND_ICONS[option.id],
      count: count('kind', (product) => getKinds(product).includes(option.id)),
    })),
  ];
  const maturityOptions = [
    { id: ALL, label: 'All', count: count('maturity', () => true) },
    ...maturityLevels.map((level) => ({
      id: level.id,
      label: level.label,
      description: level.description,
      icon: (props) => <MaturityMeter maturity={level.id} {...props} />,
      iconClass: styles.filterChipIcon_maturity,
      count: count('maturity', (product) => product.maturity === level.id),
    })),
  ];
  const activityOptions = [
    { id: ALL, label: 'All', count: count('activity', () => true) },
    ...ACTIVITY_LEVELS.map((level) => ({
      id: level.id,
      label: level.label,
      description: level.description,
      icon: ACTIVITY_ICONS[level.id],
      iconClass: styles[`filterChipIcon_${level.id}`],
      tone: level.id === 'deprecated' ? 'deprecated' : null,
      count: count('activity', (product) => activityOf(product) === level.id),
    })),
  ];

  const clearAll = () => {
    setSearch('');
    setKind(ALL);
    setMaturity(ALL);
    setOnlyNew(false);
    setActivityFilter(ALL);
  };

  const categories = grouped
    ? productCategories
        .map((category) => ({
          ...category,
          items: visible.filter((product) => product.category === category.id),
        }))
        .filter((group) => group.items.length > 0)
    : [];

  return (
    <>
      <div className={styles.browserHead}>
        <h2 className={styles.sectionTitle}>
          {title}
          <span className={styles.sectionCount}>
            {filtered ? `${visible.length} of ${items.length}` : items.length}
          </span>
          {onReset && (
            <button type="button" className={styles.resetLink} onClick={onReset}>
              Show all products
            </button>
          )}
        </h2>
        <label className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search products, repositories, people"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
          {search && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </label>
      </div>

      <div className={styles.filters}>
        <FilterRow label="Type" options={kindOptions} value={kind} onChange={setKind} />
        <FilterRow label="Maturity" options={maturityOptions} value={maturity} onChange={setMaturity}>
          {(newCount > 0 || onlyNew) && (
            <>
              <span className={styles.filterDivider} aria-hidden="true" />
              <button
                type="button"
                className={clsx(styles.filterChip, styles.filterChip_new, onlyNew && styles.filterChipOn)}
                aria-pressed={onlyNew}
                onClick={() => setOnlyNew(!onlyNew)}
                title="Only products added to the portfolio recently"
              >
                <NewIcon className={styles.filterChipIcon} />
                New
                <span className={styles.filterCount}>{newCount}</span>
              </button>
            </>
          )}
        </FilterRow>
        <FilterRow
          label="Activity"
          options={activityOptions}
          value={activityFilter}
          onChange={setActivityFilter}
        />
        <details className={styles.maturityHelp}>
          <summary>
            <InfoIcon className={styles.maturityHelpIcon} />
            What maturity and activity mean
          </summary>
          <p className={styles.maturityIntro}>
            <strong>Maturity</strong> says how far a product has come; the teams set it.{' '}
            <strong>Activity</strong> is worked out from GitHub every day: a product is active when a person
            committed to the main branch of one of its repositories in the last{' '}
            {Math.round(STALE_AFTER_DAYS / 30)} months. Dependency updates by bots do not count.
          </p>
          <dl className={styles.maturityList}>
            {maturityLevels.map((level) => (
              <div key={level.id}>
                <dt>
                  <MaturityBadge maturity={level.id} />
                </dt>
                <dd>{level.description}</dd>
              </div>
            ))}
            {ACTIVITY_LEVELS.map((level) => (
              <div key={level.id}>
                <dt>
                  <ActivityBadge activity={{ id: level.id }} />
                </dt>
                <dd>{level.description}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>

      {activityFilter === 'deprecated' && (
        <div className={styles.notice} role="note">
          <WarningIcon className={styles.noticeIcon} />
          <div>
            <strong>{DEPRECATION_NOTICE.title}</strong>
            <p>
              {DEPRECATION_NOTICE.text} See <Link to={DEPRECATION_NOTICE.trg}>TRG 7.09</Link> and the{' '}
              <a href={DEPRECATION_NOTICE.url} target="_blank" rel="noopener noreferrer">
                overview issue
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {grouped
        ? categories.map((group) => {
            const Icon = CATEGORY_ICONS[group.id];
            return (
              <div key={group.id} className={styles.group}>
                <div className={styles.groupHeader}>
                  <h3 className={styles.groupTitle}>
                    {Icon && <Icon className={styles.groupIcon} />}
                    {group.name}
                    <span className={styles.groupCount}>{group.items.length}</span>
                  </h3>
                  <Link className={styles.groupLink} to={group.route}>
                    About this category
                    <ArrowForwardIcon className={styles.groupLinkIcon} />
                  </Link>
                </div>
                <KindGroups items={group.items} activity={activity} />
              </div>
            );
          })
        : visible.length > 0 && (
            <div className={styles.group}>
              <KindGroups items={visible} activity={activity} />
            </div>
          )}

      {visible.length === 0 && (
        <div className={styles.emptyState}>
          <p>No product matches these filters.</p>
          <button type="button" className={styles.emptyReset} onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
