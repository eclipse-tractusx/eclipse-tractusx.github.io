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
import { products } from '@site/data/productsData';
import { CATEGORY_ICONS, getCategory } from './productMeta';
import styles from './landscape.module.scss';

// Use cases sit on the Industry Core, which sits on the Dataspace Foundation;
// the tools support every layer, so they stand beside the stack.
const STACK = ['use-cases', 'industry-core-foundation', 'dataspace-foundation'];
const SIDE = 'qa-testing-tools';

function Layer({ id, active, side }) {
  const category = getCategory(id);
  const Icon = CATEGORY_ICONS[id];
  const count = products.filter((product) => product.category === id).length;
  return (
    <Link
      to={category.route}
      className={clsx(styles.layer, side && styles.side, active === id && styles.active)}
      aria-current={active === id ? 'page' : undefined}
    >
      <Icon className={styles.icon} />
      <span className={styles.text}>
        <span className={styles.name}>{category.name}</span>
        <span className={styles.tagline}>{category.tagline}</span>
      </span>
      <span className={styles.count}>{count}</span>
      <ArrowForwardIcon className={styles.arrow} />
    </Link>
  );
}

/** The four categories as one landscape; every layer links to its category page. */
export default function LandscapeStack({ active = null, className }) {
  return (
    <nav className={clsx(styles.stack, className)} aria-label="Open Source Software categories">
      <div className={styles.layers}>
        {STACK.map((id) => (
          <Layer key={id} id={id} active={active} />
        ))}
      </div>
      <Layer id={SIDE} active={active} side />
    </nav>
  );
}
