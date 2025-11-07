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
import DeepdiveContent from "../../components/DeepdiveContent";

export default function KitDeepdivePage() {
  const { siteConfig } = useDocusaurusContext();
  const headerInput = {
    title: "KIT Deepdive",
    description: "KIT, short for Keep It Together, offers open-source resources and comprehensive documentation designed for the use cases of Catena-X ecosystem and in several Manufacturing-X dataspaces.",
    showImage: false
  }
  return (
    <Layout
      title={'Developer KITs DeepDive page'}
      description="Description will go into a meta tag in <head />"
    >
      <DeepdiveHeader {...headerInput} />
      <main>
        <DeepdiveContent />
      </main>
    </Layout>
  );
}
