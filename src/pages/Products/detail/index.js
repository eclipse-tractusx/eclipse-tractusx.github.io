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
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ProductDetailView from '@site/src/components/2.0/ProductDetailView';
import { getProductById } from '@site/data/productsData';

export default function ProductDetailPage() {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('id');
  const product = productId ? getProductById(productId) : null;

  return (
    <Layout
      title={`${product?.name || 'Product'} | ${siteConfig.title}`}
      description={product?.description || 'Eclipse Tractus-X Product'}
    >
      <ProductDetailView product={product} />
    </Layout>
  );
}
