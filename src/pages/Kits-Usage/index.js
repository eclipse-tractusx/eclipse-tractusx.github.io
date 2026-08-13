/********************************************************************************
* Copyright (c) 2025 BMW Group AG
* Copyright (c) 2025 Mercedes Benz AG  
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
import UsageHeader from "../../components/UsageHeader"
import KitsUsageContent from "../../components/KitsUsageContent";
import KitsGalleryWithFilters from "../../components/KitsGalleryWithFilters"
import { kitsGallery } from "@site/utils/kitsGallery";
import KitsUsageSvg from '@site/static/img/kits_usage_logo.svg';

import styles from "./styles.module.css";

export default function KitsUsagePage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Developer KITs Usage page'}
      description="Description will go into a meta tag in <head />"
    >
      <UsageHeader description={'Utilize the KITS to develop applications for the Catena-X ecosystem or gain insights on how to integrate with your current infrastructure.'} title={'KITS Usage'} icon={<KitsUsageSvg className={styles.svg} />} />
      <main>
        <KitsUsageContent />
        <KitsGalleryWithFilters
          itemsArray={kitsGallery}
          title={"Our KITs"}
          description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
        />
      </main>
    </Layout>
  );
}
