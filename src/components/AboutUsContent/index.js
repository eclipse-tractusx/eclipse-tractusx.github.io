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
import TractusXBG from "@site/static/img/tractus-x_bg.svg";
import LicensesImg from "@site/static/img/licenses-minified.png";

import styles from "./styles.module.css";

export default function AboutUsContent() {
  return (
    <section className={styles.about_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Background</h2>
        </div>

        <div className={styles.information_container}>
          <p className={styles.description}>
           The Eclipse Tractus-X™ project is the official open-source project in the Catena-X ecosystem under the umbrella of the Eclipse Foundation. The Eclipse Foundation is not-for-profit corporation that it supported by over 320 members, and represents the worlds largest sponsored collection of Open Source projects and developers.
          </p>
        </div>

        <div className={styles.img_container}>
          <TractusXBG className={styles.img}/>
        </div>

        <div className={styles.information_container}>

          <p className={styles.description}>
          The Catena-X ecosystem consists of the following three areas, which are connected by the Tractus-X project:
          </p>

          <p className={styles.description}>
          (1) The <strong>Catena-X Automotive Network e.V.</strong> (in the following called ‘association’) is responsible for standardization, certifications, and governance of the Catena-X ecosystem and is managing the Eclipse Tractus-X project. Association members can participate in working groups to actively shape the Catena-X ecosystem.
          </p>

          <p className={styles.description}>
          (2) The <strong>development environment</strong> is responsible for the development of the initial reference implementations of the core and enabling services. The reference implementations are managed in the Tractus-X repositories, that contain, among other things, source code, technical documentation, and deployment instructions.
          </p>

          <p className={styles.description}>
          (3) In the <strong>operating environment</strong>, the open-source reference implementations can be freely used, modified, and operated by providers - including core service provider (e.g., marketplace), enablement service provider (e.g., Eclipse Dataspace Connector), and business application provider (e.g., traceability applications). 
          </p>

        </div>

        <div className={styles.information_container}>
          
           <p className={styles.description}>
          Tractus-X supports developers to accelerate the development and operation of services / applications and to contribute significantly to the rapid scaling of the ecosystem. Therefore Tractus-X provides reference implementations of core and enabling services as well as KITs to accelerate the development of interoperable and innovative applications and the on-boarding to the Catena-X ecosystem. 
          </p>
          
          <p className={styles.description}>
          Reference implementations are free and open-source software (FOSS) components, which are managed in the associated Eclipse Tractus-X project. Other reference implementations (e.g., DAPS) used by the Catena-X ecosystem but developed by other projects such as Gaia-X or IDSA can also be found in the Eclipse Tractus-X project.
          </p>

          <p className={styles.description}>
          Reference implementations are released under the Apache 2.0 license. According to the Apache 2.0 license, anyone can freely use, modify, and distribute the reference implementations in any environment. Reference implementations are usually not market-ready solutions and require a certain industrialization effort, which can vary depending on the software component. As part of the development environment, the Catena-X consortium provides the first open-source Catena-X reference implementations for core and enabling services.
          </p>
        </div>

        <div className={styles.img_container}>
          <img className={styles.licenses} src={LicensesImg} /> 
        </div>
        
      </div>
    </section>
  );
}
