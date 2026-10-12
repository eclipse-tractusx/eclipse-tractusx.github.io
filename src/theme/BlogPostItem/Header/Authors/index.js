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
import Authors from '@theme-original/BlogPostItem/Header/Authors';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import FundingBadge from '@site/src/components/FundingBadge';
import styles from './styles.module.css';

/**
 * Authors row with an optional funding badge on the right, enabled per post
 * through the `funding` front matter key (e.g. `funding: bmwe`).
 */
export default function AuthorsWrapper(props) {
  const { metadata } = useBlogPost();
  const funder = metadata.frontMatter.funding;

  if (!funder) return <Authors {...props} />;

  return (
    <div className={styles.row}>
      <Authors {...props} className={styles.authors} />
      <FundingBadge funder={funder} compact showAmount={false} className={styles.badge} />
    </div>
  );
}
