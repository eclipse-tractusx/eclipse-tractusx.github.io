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
import Layout from '@theme/Layout';
import CategoryPage from '@site/src/components/2.0/Products/CategoryPage';
import { getCategory } from '@site/src/components/2.0/Products/productMeta';

const CATEGORY_ID = 'industry-core-foundation';

export default function IndustryCoreProductsPage() {
  const category = getCategory(CATEGORY_ID);
  return (
    <Layout title={`${category.name} | Open Source Software`} description={category.description}>
      <CategoryPage categoryId={CATEGORY_ID} />
    </Layout>
  );
}
