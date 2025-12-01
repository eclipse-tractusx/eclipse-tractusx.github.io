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
import UsageHeader from "../../components/UsageHeader";
import UsageSvg from '@site/static/icons/Icon_App_Service_Grey.svg';
import styles from "./styles.module.css";
import ProductOverview from '../../components/ProductOverview'
import { enablementServices } from "../../../utils/enablementServices"

export default function ServiceProvider() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Service Provider Page'}
      description="Description will go into a meta tag in <head />"
    >
      <UsageHeader description={'You want to enable companies to participate in the data space?'} title={'Service provider'} icon={<UsageSvg />} />
      <main>
        <section className={styles.content}>
          <div className={styles.container}>
            <div>
              <p className="description-p">
                An Enablement Service Provider (ESP) can operate various bundles of decentralized services that enable sovereign participation and data exchange for data providers / consumers in the Catena-X data space. An enablement service provider can decide on the scope of its enablement service and whether to offer them on one or more of the marketplaces.
              </p>
              <p className="description-p">
                The following KITs and services enable companies to become a service providers for the Catena-X data space.              </p>
            </div>
            <div>
              <h2 className="title-h2">
                Enablement Services
              </h2>
              <p className="description-p">
                Every data provider / consumer must use enablement services to establish a basic connection to the data space, regardless of the business use case. The connector based on the data space protocol (e.g., Tractus-X EDC) and the identity wallet form the mandatory basis of the enablement services. In addition, there are context-specific enablement services. Examples include the Asset Administration Shell (AAS) as harmonized access layer for digital twins, the Decentral Digital Twin Registry (DDTR) for the local discoverability of digital twins in decentrally organized data spaces or the Item Relationship Service (IRS) for the creation of data chains and iteration through a tree structure of digital twins.               </p>
            </div>
            <ProductOverview inputData={enablementServices} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
