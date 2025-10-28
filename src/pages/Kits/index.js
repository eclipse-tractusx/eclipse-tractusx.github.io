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

import KitHeader from "../../components/2.0/KitsHeader";
import KitsTitle from "../../components/2.0/KitsTitle";
import KitStatistics from "../../components/2.0/KitStatistics";
import KitsArchitecture from "../../components/2.0/KitsArchitecture";
import KitsGallery from "../../components/2.0/KitsGallery";
import KitsExtensions from "../../components/2.0/KitsExtensions";
import KitsFooter from "../../components/2.0/KitsFooter";
import { kitsData, getAllKits } from "@site/data/kitsData";

export default function KitsPage() {
  const { siteConfig } = useDocusaurusContext();
  
  const allKits = getAllKits();
  
  return (
    <Layout
      title={`Eclipse Tractus-X KITs | ${siteConfig.title}`}
      description="This is the home of the Eclipse Tractus-X KITs (Keep It Together) - your comprehensive documentation, for boosting adoption and building interoperable dataspaces across industries."
    >
      <KitHeader />
      <KitsTitle />
      <KitsArchitecture />
      <KitStatistics kitsData={allKits} />
      <KitsGallery
        title={"Our Gallery"}
        description={"Unlock the full power of the KITs. Browse all the available specifications, blueprints, and reference implementations."}
        dataspaceFoundation={kitsData.dataspaceFoundation}
        industryCoreFoundation={kitsData.industryCoreFoundation}
        useCases={kitsData.useCases}
      />
      <KitsExtensions />
      <KitsFooter />
    </Layout>
  );
}
