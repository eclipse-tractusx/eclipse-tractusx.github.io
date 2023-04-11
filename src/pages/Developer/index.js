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
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import DeveloperHeader from "../../components/DeveloperHeader";
import DeveloperContent from "../../components/DeveloperContent";
import KitsGallery from "../../components/KitsGallery";
import KitsCard from "../../components/KitsCard";
import { galleryKits } from "@site/utils/galleryKits";
import {previewKits} from '@site/utils/previewKits.js'

import IconsCard from "@site/static/img/icons-card.png"

export default function DeveloperPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Developer'}
      description="Description will go into a meta tag in <head />"
    >
      <DeveloperHeader />
      <main>
        <DeveloperContent />
        <KitsGallery 
          itemsArray={galleryKits}
          title={"Our Kits"}
          description={"Unlock the power of kits. Browse the latest kits, their documentation, including tutorials,sample code, articles, and API reference."}
        />
        <KitsGallery 
          itemsArray={previewKits} 
          title={"Preview of our Kits"} 
          description={"Unlock the power of Kits. Browse the latest preview on the Kits from the Resiliency Domain."}
        />
        <KitsCard 
          title={"Design Resources"} 
          subtitle={"These open source compliant design assets should help when you build and release a KIT in Tractus-X."}
          cardTitle={"KIT Design"}
          cardSubtitle={"ICONS"}
          img={IconsCard}
        />
      </main>
    </Layout>
  );
}
