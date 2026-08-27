/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import FilteredKitsGallery from "@site/src/components/2.0/FilteredKitsGallery";
import { kitsData } from "@site/data/kitsData";

export default function EngineeringDomainPage() {
  const { siteConfig } = useDocusaurusContext();

  const categoryData = {
    title: 'Engineering',
    description: 'Explore Engineering Use Cases KITs that provide solutions and patterns for engineering-related dataspaces across the value chain.',
    gradient: 'linear-gradient(135deg, #afc72d, #8ba61f)',
    // TODO: Replace this placeholder text with the final explanatory copy.
  };

  return (
    <Layout
      title={`Engineering Domain | Eclipse Tractus-X KITs | ${siteConfig.title}`}
      description="Explore Engineering Use Cases KITs that provide solutions and patterns for engineering-related dataspaces across the value chain."
    >
      <FilteredKitsGallery
        categoryData={categoryData}
        kits={kitsData.useCases}
        backButtonLink="/Kits/cross-industry"
        backButtonText="Back to Cross-Industry Use Cases"
        initialDomain="Engineering"
        lockDomain
        titleClassName="kit-domain-page-title"
      />
    </Layout>
  );
}
