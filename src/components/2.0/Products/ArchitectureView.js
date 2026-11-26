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
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import SmartToyIcon from '@mui/icons-material/SmartToyOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import { getProductsByCategory } from '@site/data/productsData';
import { CATEGORY_ICONS, getCategory, getDetailUrl } from './productMeta';
import styles from './architecture.module.scss';

const STANDARDS = ['Catena-X and other -X initiatives', 'Eclipse Dataspace Working Group', 'IDSA', 'IDTA'];
const UPSTREAM = ['Eclipse Dataspace Components', 'Eclipse BaSyx', 'Eclipse Dataspace Protocol'];

function Chips({ items, highlight }) {
  return (
    <ul className={styles.chips}>
      {items.map((product) => (
        <li key={product.id}>
          <Link
            className={clsx(
              styles.chip,
              (product.maturity === 'phase-out' || product.maturity === 'incubating') && styles.chipMuted,
              product.maturity === 'deprecated' && styles.chipDeprecated,
              highlight && (highlight.has(product.id) ? styles.chipOn : styles.chipOff),
            )}
            to={getDetailUrl(product)}
            title={product.description}
          >
            {product.name}
            {product.agents.length > 0 && (
              <SmartToyIcon className={styles.chipAgent} aria-label="has an AI agent" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function BlockHead({ id, title, tagline }) {
  const category = getCategory(id);
  const Icon = CATEGORY_ICONS[id];
  return (
    <div className={styles.blockHead}>
      <Icon className={styles.blockIcon} />
      <div className={styles.blockText}>
        <h3 className={styles.blockName}>{title || category.name}</h3>
        <p className={styles.blockTagline}>{tagline || category.tagline}</p>
      </div>
      <Link className={styles.blockLink} to={category.route} aria-label={`About ${category.name}`}>
        <ArrowForwardIcon />
      </Link>
    </div>
  );
}

/**
 * The Eclipse Tractus-X adoption cycle around the community. Chips open a product, the
 * arrows on the blocks open the category page. `highlight` (a Set of product ids)
 * marks the products of the selected adopter profile.
 */
export default function ArchitectureView({ highlight = null }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.ecosystem}>
        <span className={styles.ecosystemLabel}>Aligned with</span>
        {STANDARDS.map((name) => (
          <span key={name} className={styles.ecosystemTag}>
            {name}
          </span>
        ))}
      </div>

      <div className={styles.cycle}>
        {/* Connectors of the cycle, drawn in the empty corner cells of the grid. */}
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <span key={corner} className={clsx(styles.corner, styles[`corner_${corner}`])} aria-hidden="true">
            <span className={styles.arc} />
          </span>
        ))}

        <Link to="/Kits" className={clsx(styles.block, styles.kits)}>
          <MenuBookIcon className={styles.kitsIcon} />
          <span className={styles.kitsText}>
            <span className={styles.blockName}>KITs: value creation</span>
            <span className={styles.blockTagline}>
              Standards, semantic models and guides for each use case.
            </span>
          </span>
          <ArrowForwardIcon className={styles.kitsArrow} />
        </Link>

        <div className={clsx(styles.block, styles.useCases)}>
          <BlockHead id="use-cases" title="Use case apps" />
          <Chips items={getProductsByCategory('use-cases')} highlight={highlight} />
        </div>

        <Link to="/community/intro" className={styles.community}>
          <FavoriteIcon className={styles.communityIcon} />
          <span className={styles.communityName}>Community</span>
          <span className={styles.communityText}>
            Experts from independent companies, research institutes and the Catena-X and other -X initiatives
            build it together.
          </span>
        </Link>

        <div className={clsx(styles.block, styles.tools)}>
          <BlockHead id="qa-testing-tools" title="Tools, testing & AI" />
          <Chips items={getProductsByCategory('qa-testing-tools')} highlight={highlight} />
        </div>

        <div className={clsx(styles.block, styles.core)}>
          <div className={styles.coreTitle}>Core technology</div>
          <div className={styles.coreParts}>
            <div className={styles.corePart}>
              <BlockHead id="industry-core-foundation" />
              <Chips items={getProductsByCategory('industry-core-foundation')} highlight={highlight} />
            </div>
            <div className={styles.corePart}>
              <BlockHead id="dataspace-foundation" />
              <Chips items={getProductsByCategory('dataspace-foundation')} highlight={highlight} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ecosystem}>
        <span className={styles.ecosystemLabel}>Built on</span>
        {UPSTREAM.map((name) => (
          <span key={name} className={styles.ecosystemTag}>
            {name}
          </span>
        ))}
      </div>

      <p className={styles.legend}>
        <span className={styles.legendCycle}>
          Cycle: KITs → use case apps → core technology → tools → KITs
        </span>
        <SmartToyIcon className={styles.legendIcon} /> has an AI agent
        <span className={styles.legendMuted}>dashed</span> incubating or phase-out
        <span className={clsx(styles.legendMuted, styles.legendDeprecated)}>struck</span> deprecated
      </p>
    </div>
  );
}
