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

import DeepdiveHeader from "../../components/DeepdiveHeader";
import KitHeader from "../../components/2.0/KitsHeader";
import KitsTitle from "../../components/2.0/KitsTitle";
import AboutUsCard from "../../components/AboutUsCard";
import KitsGalleryWithFilters from "../../components/KitsGalleryWithFilters";
import { kitsGallery } from "@site/utils/kitsGallery";
import CarouselSuccessStories from "../../components/CarouselSuccessStories";
import RoleBasedEnrtyComponent from "../../components/RoleBasedEnrtyComponent";
import {carouselKitdeepdive} from "../../../utils/carouselKitdeepdive"

export default function KitsPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <KitHeader />
      <KitsTitle />
      <main>
      </main>
    </Layout>
  );
}
