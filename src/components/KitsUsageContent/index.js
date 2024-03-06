/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
* Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import Link from "@docusaurus/Link";
import NetworkCoreServicesLogo from "@site/static/img/domain_logo-network-core-services.png";
import PLMQualitySolutionsLogo from "@site/static/img/domain_logo-PLM-quality-solutions.png";
import ResiliencyLogo from "@site/static/img/domain_logo-resiliency.png";
import SustainabilityLogo from "@site/static/img/domain_logo-sustainability.png";


import styles from "./styles.module.css";

export default function KitsUsageContent() {
  return (
    <section className={styles.usage_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className="title-h2">Bring your use cases to life</h2>

          <p className="description-p">
            Each domain within the Catena-X ecosystem supports various use cases. To bring these use cases to life, Catena-X requires apps and services. For each use case, Catena-X has released a KIT that empowers you to offer solutions. <b>Let's introduce the Catena-X domains:</b>
          </p>

          <div className={styles.domains_container}>
            <div className={styles.domain_item}>
              <div className={styles.domain_logo_box}>
                <img className={styles.logo} src={NetworkCoreServicesLogo} />
              </div>
              <div className={styles.domain_description}>
                <h3>Core Service Domain</h3>
                <p>
                  This domain offers foundational services that form the basis of the ecosystem, facilitating technical advancements in data sovereignty.
                </p>
              </div>
            </div>

            <div className={styles.domain_item}>
              <div className={styles.domain_logo_box}>
                <img className={styles.logo} src={PLMQualitySolutionsLogo} />
              </div>
              <div className={styles.domain_description}>
                <h3>PLM & Quality Domain</h3>
                <p>
                  Trace parts, build data chains, solve quality issues and optimize your products based on data across the entire value chain without compromising data sovereignty.
                </p>
              </div>
            </div>

            <div className={styles.domain_item}>
              <div className={styles.domain_logo_box}>
                <img className={styles.logo} src={ResiliencyLogo} />
              </div>
              <div className={styles.domain_description}>
                <h3>Resiliency Domain</h3>
                <p>
                  The strengthen of resiliency of the supply chain and related shopfloor processes is a main focus in our business domain.
                </p>
              </div>
            </div>

            <div className={styles.domain_item}>
              <div className={styles.domain_logo_box}>
                <img className={styles.logo} src={SustainabilityLogo} />
              </div>
              <div className={styles.domain_description}>
                <h3>Sustainability Domain</h3>
                <p>

                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            Get ready with KITS
          </h2>

          <p className="description-p">
            Catena-X KITs offer open-source tools and documentation to promote collaboration and trust under the governance of the Eclipse Tractus-X Project. These KITs consistently follow a clustering pattern and encompass all essential elements for developers at various stages of their work.
          </p>

          <p className="description-p">
            Utilize the filter to pinpoint KITs within your specific domains of interest.
          </p>
        </div>

      </div>
    </section>
  );
}
