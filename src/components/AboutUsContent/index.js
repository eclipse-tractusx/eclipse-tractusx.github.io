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
import LicensesImg from "@site/static/img/licenses-minified.png";
import IFrameComponent from "../../components/IFrameComponent";
import styles from "./styles.module.css";
import ThemedImage from '@theme/ThemedImage';

export default function AboutUsContent() {
  return (
    <section className={styles.about_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className="title-h2">Our Mission</h2>

          <p className="description-p">
            Eclipse Tractus-X™ — Where we build dataspaces! Is a collaborative, open-source project aimed at driving the digital transformation of various industries, including automotive, manufacturing, chemical, semiconductor and construction. Our mission is to enable secure, self-sovereign and efficient data exchange, powered by seamless collaboration across the supply chain and built on trusted open standards.
          </p>

          <div className={styles.img_container}>
            <ThemedImage
              // alt="About image"
              sources={{
                light: ('/img/tractus-x_bg-updated_light.png'),
                dark: ('/img/tractus-x_bg-updated.svg'),
              }}
              className={styles.img}
            />
          </div>

          <h2 className="title-h2">What We Do</h2>

          <p className="description-p">
            Eclipse Tractus-X™ is the home of the reference implementations used in Catena-X and several Manufacturing-X initiatives. We develop open, interoperable solutions that foster collaboration between diverse stakeholders, providing a foundation for scalable, data-driven applications. This includes reference implementations and domain models for supply chain, compliance, sustainability, and more.
          </p>

          <h2 className="title-h2">KITs — Keep It Together</h2>

          <p className="description-p">
            We are also the home of the Eclipse Tractus-X™ KITs (Keep It Together) — modular architecture blueprints co-created by multiple stakeholders. The KITs accelerate the adoption of dataspace technologies and use cases across complex data ecosystems.
          </p>

          <h2 className="title-h2">Open-Source Software</h2>

          <p className="description-p">
            Our open-source software includes demonstrators, libraries, reference implementations, and incubating components, empowering service providers to build their own solutions based on the Eclipse Tractus-X KITs blueprints.
          </p>

          <p className="description-p">
            Reference implementations are released under the Apache 2.0 license. According to the Apache 2.0 license, anyone can freely use, modify, and distribute the reference implementations in any environment.
          </p>

          <h2 className="title-h2">Who Participates</h2>

          <p className="description-p">
            Participants in Eclipse Tractus-X™ include both users and providers from across the automotive value chain and beyond — from large enterprises to small and medium-sized companies. We place a particular focus on supporting the integration and participation of SMEs in the data economy.
          </p>

          <h2 className="title-h2">Governance</h2>

          <p className="description-p">
            Eclipse Tractus-X™ is a project under the purview of the <strong>Eclipse Dataspace Working Group (EDWG)</strong>, operating under the umbrella of the Eclipse Foundation. The Eclipse Foundation is a not-for-profit corporation that is supported by over 320 members, and represents the world’s largest sponsored collection of Open Source projects and developers.
          </p>
        </div>

        <div className={styles.box_container}>
          <div>
            <ThemedImage
              // alt="About image"
              sources={{
                light: ('/img/Bild.png'),
                dark: ('/img/Bild.png'),
              }}
              className={styles.logo}
            />
            <div className={styles.text}>
              <p className="description-p">Licenses</p>
              <p className="subtitle-h3">Apache License Version 2.0 (Code)</p>
              <p className="subtitle-h3">CC BY 4.0 (Non-Code)</p>
            </div>
          </div>
          <div>
            <ThemedImage
              // alt="About image"
              sources={{
                light: ('/img/logo_tractus-x.svg'),
                dark: ('/img/logo_tractus-x.svg'),
              }}
              className={styles.logo}
            />
            <div className={styles.text}>
              <p className="description-p">Legal</p>
              <p className="subtitle-h3">For this Eclipse Project we use Tractus-X instead of Catena-X as a name because the Catena-X Association wants to
                keep it’s name as a trademark
              </p>
            </div>
          </div>
        </div>

        <IFrameComponent
          link={'https://www.youtube.com/embed/iIaH71z7ENg'}
          description={''}
          title={''}
          headerDescription={''}
        />

      </div>
    </section>
  );
}
