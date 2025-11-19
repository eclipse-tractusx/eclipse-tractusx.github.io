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

import DeepdiveHeader from "../../components/DeepdiveHeader";
import AboutUsCard from "../../components/AboutUsCard";
import KitsGalleryWithFilters from "../../components/KitsGalleryWithFilters";
import { kitsGallery } from "@site/utils/kitsGallery";
import CarouselSuccessStories from "../../components/CarouselSuccessStories";
import RoleBasedEnrtyComponent from "../../components/RoleBasedEnrtyComponent";
import {carouselKitdeepdive} from "../../../utils/carouselKitdeepdive"

export default function KitsPage() {
  const { siteConfig } = useDocusaurusContext();
  const aboutInput = {
    highlightText: "Tractus-X KITS",
    title: "KIT stands for Keep It Together",
    descriptionHighlight: "KITs aim to accelerate",
    description: " the adoption, development, and operations of the next generation Business Applications and Services. Tractus-X wants to support developers in order to accelerate the development of services and applications to contribute significantly to the rapid scaling of the Catena-X ecosystem.",
    buttonText: "KIT Deepdive",
    link: "/Kit-Deepdive"
  }
  const headerInput = {
    title: "KIT",
    description: "Introduction to the Tractus-X KITS.",
    showImage: true
  }
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <DeepdiveHeader {...headerInput} />
      <main>
        <RoleBasedEnrtyComponent data={carouselKitdeepdive} />
        <AboutUsCard {...aboutInput} />
        <KitsGalleryWithFilters
          itemsArray={kitsGallery}
          title={"Our KITs"}
          description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
        />
        <CarouselSuccessStories />
      </main>
    </Layout>
  );
}
