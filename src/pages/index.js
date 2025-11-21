/********************************************************************************
* Copyright (c) 2025 BMW Group AG
* Copyright (c) 2025 Mercedes Benz AG  
* Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import HomePageHeader from "../components/HomePageHeader/index";
import AboutUsCard from "../components/AboutUsCard";
import FAQsComponent from "../components/FAQsComponent";
import KitsGalleryWithFilters from "../components/KitsGalleryWithFilters";
import { kitsGallery } from "@site/utils/kitsGallery";
import RoleBasedEnrtyComponent from "../components/RoleBasedEnrtyComponent";
import CommunityComponent from "../components/CommunityComponent";
import { carouselRoleBased } from "../../utils/carouselRoleBased";


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const aboutInput = {
    highlightText: "Welcome to the community",
    title: "The magic behind Eclipse Tractus-X",
    descriptionHighlight: "The Eclipse Tractus-X™ project",
    description: " is the official open-source project in the Catena-X ecosystem under the umbrella of the Eclipse Foundation. The Eclipse Foundation is a not-for-profit corporation that is supported by over 320 members, and represents the worlds largest sponsored collection of Open Source projects and developers.",
    buttonText: "About Us",
    link: "/AboutUs"
  }
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>
        <RoleBasedEnrtyComponent data={carouselRoleBased} />
        <AboutUsCard {...aboutInput} />
        <CommunityComponent />
        <KitsGalleryWithFilters
          itemsArray={kitsGallery}
          title={"Our KITs"}
          description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
        />
        {/* Enable when it is required */}
        {/* <FAQsComponent /> */}
      </main>
    </Layout>
  );
}
