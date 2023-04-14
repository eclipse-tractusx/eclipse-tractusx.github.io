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

import HomePageHeader from "../components/HomePageHeader/index";
import CarouselComponent from "../components/CarouselComponent";
import AboutUsCard from "../components/AboutUsCard";
import FAQsComponent from "../components/FAQsComponent";
import KitsGallery from "../components/KitsGallery";
import { galleryKits } from "@site/utils/galleryKits";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>
        <AboutUsCard />
        <br></br>
        <KitsGallery 
          itemsArray={galleryKits}
          title={"Our Kits"}
          description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
        />
        <FAQsComponent />
      </main>
    </Layout>
  );
}
