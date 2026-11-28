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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import PersonIcon from '@mui/icons-material/PersonOutline';
import { getProductsByCategory } from '@site/data/productsData';
import PageHero, { JoinCta } from './PageHero';
import LandscapeStack from './LandscapeStack';
import ProductBrowser from './ProductBrowser';
import { AUDIENCE_ICONS, CATEGORY_ICONS, HERO_BACKGROUNDS, getCategory, getStatistics } from './productMeta';
import styles from './styles.module.scss';

/** /Products/<category>: what the category is, what it offers, who it is for, its products. */
export default function CategoryPage({ categoryId }) {
  const category = getCategory(categoryId);
  const items = getProductsByCategory(categoryId);
  const statistics = getStatistics(items);
  const Icon = CATEGORY_ICONS[categoryId];

  return (
    <main className={styles.page}>
      <PageHero
        breadcrumb={[{ label: 'Open Source Software', to: '/Products' }, { label: category.name }]}
        eyebrow={category.name}
        eyebrowIcon={Icon}
        title={category.tagline}
        lead={category.intro}
        stats={[
          { label: 'Products', value: statistics.products },
          { label: 'Repositories', value: statistics.repositories },
          { label: 'Committers', value: statistics.committers },
        ]}
        visual={<LandscapeStack active={categoryId} />}
        background={HERO_BACKGROUNDS[categoryId]}
      >
        <div className={styles.heroActions}>
          <a className={styles.buttonPrimary} href="#products">
            Browse {statistics.products} products
            <ArrowDownwardIcon className={styles.buttonIcon} />
          </a>
        </div>
      </PageHero>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.sectionTitle}>What we offer</h2>
              <ul className={styles.offers}>
                {category.offers.map((offer) => (
                  <li key={offer.title} className={styles.offer}>
                    <CheckIcon className={styles.offerIcon} />
                    <div>
                      <h3 className={styles.offerTitle}>{offer.title}</h3>
                      <p className={styles.offerText}>{offer.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Who it is for</h2>
              <ul className={styles.audiences}>
                {category.audiences.map((audience) => {
                  const AudienceIcon = AUDIENCE_ICONS[audience.id] || PersonIcon;
                  return (
                    <li key={audience.title} className={styles.audience}>
                      <span className={styles.audienceIcon}>
                        <AudienceIcon />
                      </span>
                      <div>
                        <h3 className={styles.offerTitle}>{audience.title}</h3>
                        <p className={styles.offerText}>{audience.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div id="products" className={styles.anchor}>
            <ProductBrowser items={items} title={`${category.name} products`} />
          </div>

          <p className={styles.backLink}>
            <Link to="/Products">See all Open Source Software</Link>
          </p>
        </div>
      </section>

      <JoinCta />
    </main>
  );
}
