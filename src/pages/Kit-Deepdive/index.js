/********************************************************************************* 
 * Copyright (c) 2024 BMW Group AG
 * Copyright (c) 2024 Mercedes Benz AG 
* Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import DeepdiveContent from "../../components/DeepdiveContent";

export default function KitDeepdivePage() {
  const { siteConfig } = useDocusaurusContext();
  const headerInput = {
    title: "KIT Deepdive",
    description: "KIT, short for Keep It Together, offers open-source resources and comprehensive documentation designed for the use cases of Catena-X ecosystem.",
    showImage: false
  }
  return (
    <Layout
      title={'Developer Kits DeepDive page'}
      description="Description will go into a meta tag in <head />"
    >
      <DeepdiveHeader {...headerInput} />
      <main>
        <DeepdiveContent />
      </main>
    </Layout>
  );
}
