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
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import IFrameComponent from "../IFrameComponent";
import Ecosystem from "./Ecosystem";
import History from "./History";
import DataspaceComponent from "../2.0/DataspaceComponent";
import OrganizationCarousel from "../OrganizationCarousel";
import ContributionSection from "../2.0/ContributionSection";
import GetStartedSection from "../2.0/GetStartedSection";
import styles from "./styles.module.css";

const contributions = [
  {
    title: "Bring real-world needs",
    Icon: GroupsOutlinedIcon,
    description: "Industry initiatives and associations bring use cases, requirements, and domain knowledge. Companies and users contribute feedback from putting dataspaces into practice.",
  },
  {
    title: "Build shared technology",
    Icon: CodeOutlinedIcon,
    description: "Developers across organizations contribute code, documentation, tests, and features. Collaboration with other Eclipse projects connects reusable components with industry needs.",
  },
  {
    title: "Reuse across industries",
    Icon: AccountTreeOutlinedIcon,
    description: "Shared software and KITs help teams build solutions for different dataspaces. Improvements can flow back into the project and benefit the wider community.",
  },
];

export default function AboutUsContent() {
  return (
    <div className={styles.about_content}>
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="community-title">
          <p className={styles.eyebrow}>Where we build dataspaces</p>
          <h2 id="community-title">Built by many. Open to everyone.</h2>
          <p className={styles.lead}>
            Eclipse Tractus-X™ brings together contributors from different
            organizations, open-source projects, industry initiatives, and
            independent companies. Together, we develop the software and knowledge
            needed for secure, sovereign, and interoperable data exchange.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="ecosystem-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Our ecosystem</p>
            <h2 id="ecosystem-title">Different contributors. Shared building blocks.</h2>
            <p>
              The community connects industry knowledge, open-source technology,
              and practical experience. This is how the different groups come together.
            </p>
          </div>
          <Ecosystem />
        </section>

        <section className={styles.section} aria-labelledby="organizations-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Our contributing community</p>
            <h2 id="organizations-title">Organizations engaged in Eclipse Tractus-X</h2>
            <p>
              Meet organizations whose teams help build and support the project.
              Their contributions bring different perspectives, expertise, and
              experience into our shared open-source community.
            </p>
          </div>
          <OrganizationCarousel />
          <p className={styles.organizationSource}>
            Organization names and logos are the property of their respective owners.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="history-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Our history</p>
            <h2 id="history-title">From automotive roots to cross-industry dataspaces</h2>
            <p>
              Eclipse Tractus-X started with the automotive industry and has grown
              into an open-source home for dataspace initiatives across industries.
            </p>
          </div>
          <History />
        </section>

        <div id="dataspaces" className={styles.dataspaceNetwork} role="region" aria-label="Our dataspace network">
          <DataspaceComponent />
        </div>

        <section className={styles.section} aria-labelledby="contribution-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>How we work together</p>
            <h2 id="contribution-title">From shared needs to shared solutions</h2>
          </div>
          <ol className={styles.contributions}>
            {contributions.map(({ title, Icon, description }, index) => (
              <li key={title} className={styles.contribution}>
                <div className={styles.stepHeader}>
                  <Icon aria-hidden="true" />
                  <span className={styles.stepNumber}>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="technology-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>What we create</p>
            <h2 id="technology-title">Open technology for connected industries</h2>
          </div>
          <div className={styles.twoColumns}>
            <article className={styles.infoCard}>
              <h3>Open-source software</h3>
              <p>
                We build reference implementations, libraries, demonstrators, and
                services for dataspaces. These include connectors, identity
                components, the Digital Twin Registry, Portal, Industry Core Hub,
                and the Tractus-X SDK, alongside solutions for traceability,
                sustainability, and supply chains.
              </p>
              <Link to="/community/products">Explore our software →</Link>
            </article>
            <article className={styles.infoCard}>
              <h3>KITs — Keep It Together</h3>
              <p>
                KITs combine architecture blueprints, documentation, and guidance
                co-created by multiple stakeholders. They help business teams,
                developers, and service providers understand use cases and adopt
                interoperable dataspace technologies across industries.
              </p>
              <Link to="/Kits">Explore the KITs →</Link>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="governance-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Our open-source home</p>
            <h2 id="governance-title">Collaboration under the Eclipse Foundation</h2>
          </div>
          <div className={styles.twoColumns}>
            <article className={styles.infoCard}>
              <h3>Eclipse Foundation</h3>
              <p>
                Eclipse Tractus-X operates under the Eclipse Foundation’s
                development process and intellectual property policies. This
                provides a common framework for people from different
                organizations to develop and maintain the project together.
              </p>
              <a href="https://projects.eclipse.org/projects/automotive.tractusx">
                Eclipse Tractus-X project profile →
              </a>
            </article>
            <article className={`${styles.infoCard} ${styles.workingGroup}`}>
              <h3>Eclipse Dataspace Working Group</h3>
              <p>
                The EDWG brings organizations and projects together to promote
                open-source dataspace technology, support standards alignment,
                and encourage adoption. Tractus-X participates in this wider
                Eclipse dataspace ecosystem.
              </p>
              <a href="https://dataspace.eclipse.org/about/">About the EDWG →</a>
            </article>
          </div>
          <p className={styles.licenses}>
            <strong>Open to use and build upon.</strong> Our project uses
            Apache-2.0 for code and CC-BY-4.0 for non-code content.
          </p>
        </section>

        <IFrameComponent
          link="https://www.youtube.com/embed/pXpXXMuLmJ8"
          title="Get to know Eclipse Tractus-X"
        />
      </div>
      <ContributionSection title="Ways to Contribute, Start Your Journey" />
      <GetStartedSection />
    </div>
  );
}
