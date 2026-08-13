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
import UsageSvg from '@site/static/icons/Icon_Operators_Grey.svg';
import styles from "./styles.module.css";
import ProductOverview from '../../components/ProductOverview'
import { coreOnboardingServices } from "../../../utils/coreOnboardingServices"

export default function Operator() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Operator page'}
      description="Description will go into a meta tag in <head />"
    >
      <UsageHeader description={'You want to operate core services?'} title={'Operator'} icon={<UsageSvg />} />
      <main>
        <section className={styles.content}>
          <div className={styles.container}>
            <div>
              <p className="description-p">
                Core Service Providers operate core services that enable the basic functionality of the Catena-X data space (e.g. Identity Provider, Marketplace). This Core Service Provider is responsible for providing the services commercially, operating and maintaining them, and supporting the release of the core services in the data space. It actively markets the core services and is the contractual partner for partners such as application providers and data providers/consumers.            </p>
              <p className="description-p">
                The following KITs and services enable companies to become an operator for the Catena-X data space.
              </p>
            </div>
            <div>
              <h2 className="title-h2">
                Core & Onboarding Services
              </h2>
              <p className="description-p">
                In contrast to the Enablement Services, the Core & Onboarding Services offer  common accessibility and discoverability functionalities for data space participants. Examples include BPN issuers for maintaining business partner numbers, and participant information, IAM solutions for identity and access management, and discovery services  for locating  the address of assets in decentralized organized registers, throughout the data space.
              </p>
            </div>
            <ProductOverview inputData={coreOnboardingServices} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
