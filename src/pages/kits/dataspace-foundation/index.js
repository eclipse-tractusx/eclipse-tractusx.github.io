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
import VpnLockIcon from '@mui/icons-material/VpnLock';

import FilteredKitsGallery from "@site/src/components/2.0/FilteredKitsGallery";
import { kitsData } from "@site/data/kitsData";
import KitsFooter from '@site/src/components/2.0/KitsFooter';
export default function DataspaceFoundationKitsPage() {
  const { siteConfig } = useDocusaurusContext();
  
  const categoryData = {
    title: 'Dataspace Foundation',
    description: 'Explore Dataspace Foundation KITs that enable the creation and operation of secure, interoperable dataspaces.',
    icon: VpnLockIcon,
    gradient: 'linear-gradient(135deg, #595959, #404040)'
  };
  
  return (
    <Layout
      title={`Dataspace Foundation | Eclipse Tractus-X KITs | ${siteConfig.title}`}
      description="Explore Dataspace Foundation KITs that enable the creation and operation of secure, interoperable dataspaces."
    >
      <FilteredKitsGallery
        categoryData={categoryData}
        kits={kitsData.dataspaceFoundation}
        showDomainFilter={true}
        backRef="architecture"
      />
      <KitsFooter />
    </Layout>
  );
}