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

import KitToolbox from "@site/static/img/kit-toolbox-min.png";
import Thumbnail from "@site/static/img/main_bg-min.png"

import styles from "./styles.module.css";
import IFrameComponent from "../IFrameComponent";

export default function DeepdiveContent() {
  return (
    <section className={styles.deepdive_content}>
      <div className={styles.container}>

        <IFrameComponent
          link={'https://www.youtube.com/embed/k4z_fLdr1SQ'}
          description={'This video provides an explanation of how Catena-X defines a KIT and showcases a real-world use case where Kits are implemented in the Catena-X ecosystem.'}
          title={'Get inspired by using a KIT'}
          headerDescription={'Business applications enable data providers and consumers  to leverage different use cases and data-driven processes to solve a specific industry problem (e.g., PCF) and create business value, by using KITs and Standards for interoperable and trusted data exchange. A business application provider (BAP) can decide on the scope of its business applications and whether to offer them on one or more of the marketplaces.'}
        />
        <div className={styles.title_container}>
          <h2 className="title-h2">
            General
          </h2>

          <p className="description-p">
            To establish a global data space, Catena-X offers a range of standards and developer resources. Standards are published on the Catena-X Association website (Standard Library), while the developer resources, including KITs,  are open for use and collaboration within the Tractus-X community, promoting trust. The development and maintenance of KITs forms the basis for further use cases, interoperable business applications, and services.
          </p>

          <p className="description-p">
            There are two main customer groups for KITs:
          </p>

          <div className={styles.siblings_paragraph_container}>
            <div className={styles.siblings_paragraph}>
              <h2 className="title-h2">
                User(Data Provider<br></br> / Consumer)
              </h2>
              <p className="description-p">
                Companies that are part of the automotive value chain and participate in a Catena-X use case. These companies require technical support, specifications, and guidance. For example, a production company needs to exchange data on  carbon footprint with its partners. KITs keep together the necessary software components, standards, policies, and deployment scripts, ensuring these companies have everything required to successfully participate in a Catena-X use case. In Catena-X they are called adopters.
              </p>
            </div>
            <div className={styles.siblings_paragraph}>
              <h2 className="title-h2">
                App- /Service <br></br> Provider
              </h2>
              <p className="description-p">
                Companies interested in offering an application or service for a specific use case on one of the Catena-X marketplaces must align their existing solutions with Catena-X requirements. Within a KIT, these companies receive guidelines and technical support necessary for adapting their solutions to meet Catena-X conformity. These companies are referred to as solution providers.
              </p>
            </div>
          </div>

          <p className="description-p">
            Achieving network effects in the Catena-X data space is critical to success and depends on the active participation of adopters and the creation of appealing solution offerings, especially for SMEs, by solution providers. It is therefore important to make it as easy as possible to get started. KITs facilitate this process by supporting both customer groups and simplifying the technical integration with the Catena-X data space.
          </p>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            Key objectives & <br></br> Benefits
          </h2>

          <p className="description-p">
            KITs are available to everyone as part of the Eclipse Tractus-X open-source project, which facilitates participation in the design and development of KIT. KITs have a broad applicability and are not limited to the automotive value chain. There is at least  one KIT  to support companies  for every use case.
          </p>

          <p className="description-p">
            1. Transparency is a key feature of KITs as it enables automotive companies, suppliers, and other stakeholders to comprehend the source code. This transparency enables the  identification of bugs and encourages contributions for improvement, fostering trust and collaboration.
          </p>

          <p className="description-p">
            2. KITs contribute to cost reduction by facilitating the reuse of existing software components. This eliminates the need for companies to start from scratch, resulting in significant cost and time savings.
          </p>

          <p className="description-p">
            3. Innovation thrives within KITs because of the diverse group of contributors. Regardless of the size of a company, small, medium, or large, contributors share ideas, expertise, and resources, promoting a culture of innovation.
          </p>

          <p className="description-p">
            4. KITs in line with Catena-X principles of interoperability and standardization. They embrace the semantics of use cases, to establish a common "language" within the ecosystem, enabling seamless integration of diverse technologies from different providers while adhering to relevant standards.
          </p>

          <p className="description-p">
            5. KITs promote the development of an ecosystem. Different stakeholders are collaborating and tailor solutions to specific needs. This expands the range of solutions and creates opportunities for partnerships.
          </p>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            The KIT Toolbox
          </h2>

          <p className="description-p">
            A KIT is always structured in the same way and supports the journey of a company joining the data space of Catena-X. In order to ensure interoperability and data sovereignty in Catena-X use cases, compliance with a minimum set of elements is required. These  include semantic models for data integration and understanding, logic and schema for value calculation, API implementation for intercommunication, and access and usage policies to maintain data sovereignty.
          </p>

          <div className={styles.img_container}>
            <img className={styles.img} src={KitToolbox} />
          </div>

          <p className="description-p">
            In addition to the minimum set , a KIT consists of various other artifacts  The vision formulates the strategic goals of a KIT, which motivate users  and solution providers to engage. The mission defines the purpose and addresses industry-specific problems. The business value emphasizes value by enabling the connection to the Catena-X data space and facilitating commercial or non-profit solutions for Catena-X marketplaces. Tutorials provide educational resources, including how-to guides and videos for specific use cases. Whitepapers outline KIT's goals, provide background information, highlight challenges, propose solutions, evaluate alternatives and offer actionable recommendations.
          </p>

          <p className="description-p">
            Standardized semantic models give fundamental meaning to the data and the relationships to enable interoperability. Standardized logic and schemas provide a definition of the minimum viable business logic that must be implemented to enable interoperability. Business processes describe interrelated (and cross-company) activities that enable specific objectives within a Catena-X use case. Access and usage guidelines regulate the rights and terms of data access and usage to enable data sovereignty.
          </p>

          <p className="description-p">
            API specifications describe the functional and expected behavior of an API, endpoints, data formats, and rules for interface interaction, and promote interoperability. Protocols define rules for data transmission and communication between components. Reference implementations implement all requirements from our corresponding standards in the Catena-X Association and beyond and are available for use or further development. The architecture describes the basic components and their interaction within the operating system. Quick Setup Guides for installing and configuring reference implementation provide step-by-step instructions for developers. Deployment scripts, such as HELM diagrams, simplify the installation of the components in the desired target environment.          </p>
        </div>

      </div>
    </section>
  );
}
