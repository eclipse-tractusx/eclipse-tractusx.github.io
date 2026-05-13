/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
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
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FilteredProductsGallery from '@site/src/components/2.0/FilteredProductsGallery';
import { getProductsByCategory, productCategories } from '@site/data/productsData';

export default function QaTestingProductsPage() {
  const { siteConfig } = useDocusaurusContext();
  const category = productCategories.find(c => c.id === 'qa-testing-tools');
  const products = getProductsByCategory('qa-testing-tools');

  return (
    <Layout
      title={`QA / Testing & Tools Products | ${siteConfig.title}`}
      description={category.description}
    >
      <FilteredProductsGallery categoryData={category} products={products} />
    </Layout>
  );
}
