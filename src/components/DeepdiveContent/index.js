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

import styles from "./styles.module.css";

export default function DeepdiveContent() {
  return (
    <section className={styles.deepdive_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <p className="description-p">
            Kits aim to accelerate the adoption, development, and operations of the next generation Business Applications and Services. Catena-X wants to support developers in order to accelerate the development of services and applications to contribute significantly to the rapid scaling of the Catena-X ecosystem.
          </p>

          <p className="description-p">
            KITs are an important part of the Eclipse Tractus-X™ project here.
          </p>
          
          <h2 className="title-h2">Get inspired by using a KIT</h2>

          <p className="description-p">
            This video provides an explanation of how Catena-X defines a KIT and showcases a real-world use case where Kits are implemented in the Catena-X ecosystem.
          </p>

          <iframe 
            width="100%" 
            height="450" 
            src="https://www.youtube.com/embed/e5Qv6jGPYRw?si=40_WaRhPVhXX_KML" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
          ></iframe>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            KIT Deepdive
          </h2>

          <p className="description-p">
            To establish a global data space for collaboration and interoperability, Catena-X offers a range of standards and developer resources. Standards, such as whitepapers, are published on the Catena-X Association website (Standard Library), while developer resources, including KITs, compatible implementations, and release guidelines, can be found on the Tractus-X Website.
          </p>

          <p className="description-p">
            KITs are an essential part of the Catena-X customer journey, which consists of five steps: Inform, Connect, Boost, Adopt, and Utilize. These KITs provide a dedicated set of tools that empower solution providers to develop interoperable solutions for each stage of the customer journey. These solutions can be offered on various marketplaces within the Catena-X data space. Adopters, such as OEMs, suppliers, or recyclers, can choose to use KITs or solutions from the marketplaces to support their own customer journey.
          </p>

          <p className="description-p">
            There are two main customer groups for KITs:
          </p>

          <div className={styles.siblings_paragraph_container}>
            <div className={styles.siblings_paragraph}>
              <h2 className="title-h2">
                Data <br></br> Prosumer
              </h2>
              <p className="description-p">
                Companies that are part of the automotive value chain and participate in a Catena-X use case. These companies require technical support, specifications, and guidance. For instance, a production company may need to exchange product carbon footprint data with its partners. KITs keep together the necessary software components, standards, policies, and deployment scripts, ensuring these companies have everything required to successfully participate in a Catena-X use case. In Catena-X they are called adopters.
              </p>
            </div>
            <div className={styles.siblings_paragraph}>
              <h2 className="title-h2">
                App- /Service <br></br> Provider
              </h2>
              <p className="description-p">
                Companies interested in offering an application or service for a specific use case on one of the Catena-X marketplaces need to align their existing solutions with Catena-X requirements. Within a KIT, these companies receive guidelines and technical support necessary for adapting their solutions to meet Catena-X conformity. These companies are called solution providers.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            Key objectives & <br></br> Benefits
          </h2>

          <p className="description-p">
            KITs are open to everyone as part of the Eclipse Tractus-X open-source project, which facilitates participation in the design and development of KIT. KITs have a wide applicability and are not limited to the automotive value chain. Each use case offers at least one kit to support the companies.
          </p>
          
          <p className="description-p">
            1. Transparency is a key feature of Kits as it allows car companies, suppliers, and other stakeholders to comprehend the source code. This transparency enables bug identification and encourages contributions for improvement, fostering trust and collaboration.
          </p>

          <p className="description-p">
            2. KITs contribute to cost reduction by facilitating the reuse of existing software components. This eliminates the need for companies to start from scratch, resulting in significant cost and time savings.
          </p>

          <p className="description-p">
            3. Innovation thrives within KITs due to the diverse group of contributors. Regardless of a company's size, small, medium, or large, contributors share ideas, expertise, and resources, promoting a culture of innovation.
          </p>

          <p className="description-p">
            4. KITs align with Catena-X principles of interoperability and standardization. They encompass use case semantics to establish a common "language" within the ecosystem, enabling seamless integration of diverse technologies from different providers while adhering to relevant standards.
          </p>

          <p className="description-p">
            5. KITs promotes the building of an ecosystem. Different stakeholders are collaborating and tailor solutions on specific needs. This expands the range of solutions and creates opportunities for partnerships.
          </p>
        </div>

        <div className={styles.title_container}>
          <h2 className="title-h2">
            The KIT Toolbox
          </h2>

          <p className="description-p">
            A Kit is always structured in the same way and supports the journey of a company joining the data space of Catena-X. In order to ensure interoperability and data sovereignty in Catena-X use cases, adherence to a minimum set of elements is required, including semantic models for data integration and understanding, logic and schema for value calculation, API implementation for intercommunication, and access and usage policies to maintain data sovereignty.
          </p>

          <div className={styles.img_container}>
            <img className={styles.img} src={KitToolbox} /> 
          </div>

          <p className="description-p">
            A KIT consists of various other artefacts in addition to the minimum set: The vision formulates strategic objectives of a KIT that inspire adopters and solution providers to engage. The mission defines the purpose and addresses industry-specific problems. The business value highlights the benefits by enabling the connection to the Catena-X data space and facilitating commercial or non-profit solutions for Catena-X marketplaces. Tutorials provide educational resources, including how-to guides and videos for specific use cases. Whitepapers outline KIT's goals, provide background information, highlight challenges, propose solutions, evaluate alternatives and offer actionable recommendations.
          </p>

          <p className="description-p">
            Standardized semantic models add basic meaning to the data and the relationships to enable interoperability. Standardized logic and schemas provide a definition of the minimum viable business logic that must be implemented to enable interoperability. Business processes describe interrelated (and cross-company) activities that enable specific objectives within a Catena-X use case. Access and usage guidelines regulate the rights and terms of data access and usage to enable data sovereignty.
          </p>

          <p className="description-p">
            API specifications details the functional and expected behavior of an API, endpoints, data formats, and rules for interface interaction, promoting interoperability. Protocols define rules for data transmission and communication between components. Reference implementations implement all requirements from our corresponding standards in the Catena-X Association and beyond and are available for use or further development. The architecture describes the basic components and their interaction within the operating system. Quick setup guides for installing and configuring reference implementation provide step-by-step instructions for developers. Deployment scripts, such as HELM diagrams, simplify the installation of components in the desired target environment.
          </p>
        </div>

      </div>
    </section>
  );
}
