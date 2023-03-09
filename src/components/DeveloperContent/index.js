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
import EcosystemImg from "@site/static/img/ecosystem-minified.png";
import ThreeViewsImg from "@site/static/img/three_views-minified.png";

import styles from "./styles.module.css";

export default function DeveloperContent() {
  return (
    <section className={styles.developer_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Ecosystem</h2>
          <p className={styles.description}>A Kit deliverable are one or more outcomes within a business domain. A KIT can be used across the borders of a business domain and may refer to a business domain (e.g., PCF rulebook) or network services (e.g., EDC) that are required by more than one solution space / use case.</p>
        </div>

        <div className={styles.img_container}>
          <img className={styles.img} src={EcosystemImg} /> 
        </div>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Three different views</h2>
          <p className={styles.description}>KITs provide a set of standards, documentation, reference implementations, quick setup guides, etc., that enable participants to build and operate interoperable and certified applications / services easier and faster. Mandatory and optional deliverables depend on the type of KIT. Developers (e.g., application and service provider) can use and integrate KITs into their products to create a multi-vendor, interoperable, innovative, and scalable ecosystem. Furthermore, data provider and consumer can use KITs to connect to the Catena-X data space.</p>
        </div>

        <div className={styles.img_container}>
          <img className={styles.img} src={ThreeViewsImg} /> 
        </div> 
      </div>
    </section>
  );
}
