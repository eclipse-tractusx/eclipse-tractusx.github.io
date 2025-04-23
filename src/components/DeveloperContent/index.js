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

import ThreeViewsSVG from "@site/static/img/three_views.svg";
import Ecosystem1 from "@site/static/img/cj.png";

import styles from "./styles.module.css";

export default function DeveloperContent() {
  return (
    <section className={styles.developer_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className="title-h2">Ecosystem</h2>
          
          <p className="description-p">
            <b>The Catena-X vision is to connect the automotive industry via one global data space to solve industry problems, together.</b>
          </p>

          <p className="description-p">
            To establish this one global data space and enable collaboration and interoperability, Catena-X releases and updates standards and developer resources as one of its key offerings. Standards including whitepapers are published on the Catena-X Association website (Standard Library) and developer resources including KITs, compatible implementations, and release guidelines are published on the Tractus-X Website. 
          </p>

          <p className="description-p">
            With KITs, the Catena-X customer journey comes to life - consisting of the following 5 steps to participate in Catena-X data space: (1) Inform, (2) Connect, (3) Boost, (4) Adopt, and (5) Utilize. KITs offer a dedicated set of tools to empower and stimulate solution providers to create interoperable solutions for each step of the customer journey. These solutions can be offered on different marketplaces in the Catena-X data space. Adopters such as OEMs, suppliers, or recyclers can either use KITs or solutions from the marketplaces to support their customer journey.  
          </p>

          <div className={styles.img_container}>
            <img className={styles.img} src={Ecosystem1} /> 
          </div>

          <p className="description-p">
            The first Kit that follows this journey is the <Link to="/docs-kits/kits/traceability-kit/Adoption%20View%20Traceability%20Kit">Traceability Kit.</Link><br/><br/>
            Catena-X KITs provide open-source resources and documentation to foster the collaboration and trust governed by the Eclipse Tractus-X Project. The initial offering of the Catena-X ecosystem is structured along the following four domains - one network domain and three business domains:
          </p>

          <ul className="description-p">
            <li>Network Domain for Shared Services</li>
            <li>Business Domain PLM and Quality</li>  
            <li><Link to="docs-kits/Resiliency">Business Domain Resiliency</Link></li>
            <li>Business Domain Sustainability Domain</li> 
          </ul>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">Three different views</h2>
          <p className="description-p">KITs provide a set of standards, documentation, reference implementations, quick setup guides, etc., that enable participants to build and operate interoperable and certified applications / services easier and faster. Mandatory and optional deliverables depend on the type of KIT. Developers (e.g., application and service provider) can use and integrate KITs into their products to create a multi-vendor, interoperable, innovative, and scalable ecosystem. Furthermore, data provider and consumer can use KITs to connect to the Catena-X data space.</p>
          <a className="description-p" href="docs/kit-process/artefacts">Read more about the deliverables.</a>
        </div>

        <div className={styles.img_container}>
          <ThreeViewsSVG className={styles.img} />
        </div> 
      </div>
    </section>
  );
}
