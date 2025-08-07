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
import KitsGalleryWithFilters from "../../components/KitsGalleryWithFilters"
import { kitsGallery } from "@site/utils/kitsGallery";

export default function User() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={'App Provider page'}
      description="Description will go into a meta tag in <head />"
    >
      <UsageHeader description={'Provide and process data to interoperate with other ecosystem participants using core & data services and business applications.'} title={'User'} icon={<UsageSvg />} />
      <main>
        <section className={styles.content}>
          <div className={styles.container}>

            <div>
              <p className="description-p">
                A data provider / consumer (DPC) provides, consumes, and processes data to collaborate with other data  space participants to solve a specific industry problem and create business value.  This includes both standardized use cases and direct collaboration.
              </p>
              <p className="description-p">
                First, a data provider needs to decide  which use case(s)they want to participate in: You want to exchange CO2 values? Use the PCF KIT. You want to exchange part data? Use the Traceability KIT. For each Catena-X use case there is a KIT available to ensure that the integration is described.
              </p>
              <p className="description-p">
                Next, a data provider needs the general technical requirements for data exchange, to be able to share data in the ecosystem. There is an  end-to-end journey documentation available.
              </p>
            </div>

            <div>
              <h2 className="title-h2">
                Relevant KITs
              </h2>

              <p className="description-p">
                The Tractus-X project is structured along the 4 domains that represent use cases in Catena-X:<br/>
                First, there is the Network & Core Services domain, which forms  the basis for the functionality of the business domains. It's the foundation to build on and is mainly provided by the operator.
              </p>
              <p className="description-p">
                Then we have the business domains:<br/>
                PLM & Quality, Resiliency and Sustainability, each addressing a specific set of industry challenges that Catena-X solves with the help of KITs.
              </p>
              <p className="description-p">
                Each of the domains provide at least one KIT with a well-defined toolbox of business and development artifacts that support data providers to join a use case. They can use the KITs to connect their existing in-house infrastructure to the Catena-X data space by mapping to the semantic data models and interfaces.
              </p>
            </div>

            <KitsGalleryWithFilters
              itemsArray={kitsGallery}
              title={"Our KITs"}
              description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
            />

          </div>
        </section>
      </main>
    </Layout>
  );
}
