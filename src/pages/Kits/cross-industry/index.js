/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

import FilteredKitsGallery from "@site/src/components/2.0/FilteredKitsGallery";
import { kitsData } from "@site/data/kitsData";

export default function CrossIndustryKitsPage() {
  const { siteConfig } = useDocusaurusContext();
  
  const categoryData = {
    title: 'Cross-Industry Use Cases',
    description: 'Explore Cross-Industry Use Cases KITs that provide solutions and patterns applicable across multiple dataspaces and sectors.',
    icon: AllInclusiveIcon,
    gradient: 'linear-gradient(135deg, #10b981, #047857)'
  };
  
  return (
    <Layout
      title={`Cross-Industry Use Cases | Eclipse Tractus-X KITs | ${siteConfig.title}`}
      description="Explore Cross-Industry Use Cases KITs that provide solutions and patterns applicable across multiple dataspaces and sectors."
    >
      <FilteredKitsGallery
        categoryData={categoryData}
        kits={kitsData.useCases}
        backRef="architecture"
        showDomainFilter={true}
      />
    </Layout>
  );
}