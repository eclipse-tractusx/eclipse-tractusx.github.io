/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import UsageHeader from "../../components/UsageHeader";
import UsageSvg from '@site/static/icons/Icon_App_Service_Grey.svg';
import styles from "./styles.module.css";
import IFrameComponent from "../../components/IFrameComponent"
import KitsGalleryWithFilters from "../../components/KitsGalleryWithFilters"
import { kitsData, getAllKits, dataspaces } from "@site/data/kitsData";
import KitsGallery from "@site/src/components/2.0/KitsGallery";
export default function AppProvider() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={'App Provider page'}
      description="Description will go into a meta tag in <head />"
    >
      <UsageHeader description={'Responsible for deploying, operating, and maintaining business applications  in accordance  with the Catena-X standards.'} title={'App Provider'} icon={<UsageSvg />} />
      <main>
        <section className={styles.content}>
          <div className={styles.container}>

            <IFrameComponent
              link={'https://www.youtube.com/embed/3XgsNPGQGIY'}
              description={'This video provides an explanation of how Catena-X defines a KIT and showcases a real-world use case where KITs are implemented in the Catena-X ecosystem.'}
              title={'Get inspired by using a KIT'}
              headerDescription={'Business applications enable data providers and consumers  to leverage different use cases and data-driven processes to solve a specific industry problem (e.g., PCF) and create business value, by using KITs and Standards for interoperable and trusted data exchange. A business application provider (BAP) can decide on the scope of its business applications and whether to offer them on one or more of the marketplaces.'}
            />
            <div>
              <h2 className="title-h2">
                Relevant KITs
              </h2>

              <p className="description-p">
                The Tractus-X project is structured along the 4 domains that represent use cases in Catena-X:<br/>
                First, there is the Network & Core Services domain, which forms the basis for the  functionality of the  business domains. It is the foundation to build on and is mainly provided by the operator.
              </p>
              <p className="description-p">
                Then we have the business domains:<br/>
                PLM & Quality, Resiliency and Sustainability, each dealing with  specific industry challenges, that Catena-X solves with the help of KITs. Each of the domains provide at least one specific KIT with a clearly defined toolbox of development artifacts that support data providers to join a use case.
              </p>
              <p className="description-p">
                Application providers can combine multiple KITs and use API specifications, as well as semantic models, to develop new interoperable applications.
              </p>

              <p className="description-p">
                There are two main customer groups for KITs:
              </p>
            </div>
          </div>
        </section>
        <KitsGallery
          title={"Our Gallery"}
          description={"Unlock the full power of the KITs. Browse all the available specifications, blueprints, and reference implementations."}
          dataspaceFoundation={kitsData.dataspaceFoundation}
          industryCoreFoundation={kitsData.industryCoreFoundation}
          useCases={kitsData.useCases}
        />
      </main>
    </Layout>
  );
}
