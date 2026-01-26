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
import IndustryCoreIcon from '@mui/icons-material/Engineering';
import KitsFooter from '@site/src/components/2.0/KitsFooter';
import FilteredKitsGallery from "@site/src/components/2.0/FilteredKitsGallery";
import { kitsData } from "@site/data/kitsData";
import FoundationIcon from '@mui/icons-material/Foundation';
export default function IndustryCoreKitsPage() {
  const { siteConfig } = useDocusaurusContext();
  
  const categoryData = {
    title: 'Industry Core Foundation',
    description: 'Explore the Industry Core Foundation KITs, where you can build the foundation for the use cases of tomorrow.',
    icon: FoundationIcon,
    gradient: 'linear-gradient(135deg, #0070C0, #002060)'
  };
  
  return (
    <Layout
      title={`Industry Core Foundation | Eclipse Tractus-X KITs | ${siteConfig.title}`}
      description="Explore the Industry Core Foundation KITs, where you can build the foundation for the use cases of tomorrow."
    >
      <FilteredKitsGallery
        categoryData={categoryData}
        kits={kitsData.industryCoreFoundation}
        backRef="architecture"
        showIndustryFilter={false}
        showDomainFilter={true}
      />
      <KitsFooter />
    </Layout>
  );
}