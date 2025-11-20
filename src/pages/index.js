/********************************************************************************
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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
import Link from '@docusaurus/Link';

import HomePageHeader from "@site/src/components/HomePageHeader/index";
import AboutUsCard from "@site/src/components/AboutUsCard";
import RoleBasedEnrtyComponent from "@site/src/components/RoleBasedEnrtyComponent";
import { carouselRoleBased } from "@site/utils/carouselRoleBased";
import KitsTitle from "@site/src/components/2.0/KitsTitle";
import KitStatistics from "@site/src/components/2.0/KitStatistics";
import KitsArchitecture from "@site/src/components/2.0/KitsArchitecture";
import KitsGallery from "@site/src/components/2.0/KitsGallery";
import DataspaceComponent from "@site/src/components/DataspaceComponent";
import KitsFooter from "@site/src/components/2.0/KitsFooter";
import { kitsData, getAllKits, industries } from "@site/data/kitsData";
import ContributionSection from "@site/src/components/ContributionSection";
import GetStartedSection from "@site/src/components/GetStartedSection";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const aboutInput = {
    highlightText: "Welcome to the community",
    title: "The magic behind Eclipse Tractus-X",
    descriptionHighlight: "The Eclipse Tractus-X™ project",
    description: " is the official open-source project in the Catena-X ecosystem and several other Manufacturing-X ecosystems under the umbrella of the Eclipse Foundation. The Eclipse Foundation is a not-for-profit corporation that is supported by over 320 members, and represents the worlds largest sponsored collection of Open Source projects and developers.",
    buttonText: "About Us",
    link: "/AboutUs"
  }
  const allKits = getAllKits();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>
        <RoleBasedEnrtyComponent data={carouselRoleBased} />
        <AboutUsCard {...aboutInput} />
        <KitsTitle />
        <KitsArchitecture industries={industries}/>
        <KitStatistics kitsData={allKits} />
        <KitsGallery
          title={"Our Gallery"}
          description={"Unlock the full power of the KITs. Browse all the available specifications, blueprints, and reference implementations."}
          dataspaceFoundation={kitsData.dataspaceFoundation}
          industryCoreFoundation={kitsData.industryCoreFoundation}
          useCases={kitsData.useCases}
        />
        <section id="dataspaces">
          <DataspaceComponent />
        </section>
        <KitsFooter title={`Want to join our KIT Community?`} simple={true} disclaimer={`* All dataspace logos and trademarks are property of their affiliated companies and organizations.`} />
        <ContributionSection title={`More Ways to Contribute`} />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
