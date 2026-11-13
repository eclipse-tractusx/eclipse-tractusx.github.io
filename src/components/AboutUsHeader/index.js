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
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import TractusXSvg from '../../../static/img/logo_tractus-x.svg'

import styles from "./styles.module.css";

const defaultSubtitle =
  "Many organizations. One open-source community. We bring together " +
  "industry initiatives, technology projects, and companies to build " +
  "dataspaces that work across industries.";

/**
 * Hero of the About Us section. The About Us page uses the defaults; its
 * subpages (e.g. the FAQ) pass their own title, subtitle and a breadcrumb.
 */
export default function AboutUsHeader({
  title = "About Eclipse Tractus-X",
  subtitle = defaultSubtitle,
  breadcrumb = null,
}) {
  return (
      <header className={styles.about_header}>
      {/* ThemedImage Docusaurus component that handles the BG depending on the theme displayed */}
        <ThemedImage
          alt=""
          sources={{
            light: useBaseUrl('/img/main-bg-light.png'),
            dark: useBaseUrl('/img/main_bg-min.png'),
          }}
          className={styles.hero_bg}
        />

      {/* Content of the component */}
        <div className={styles.container}>
          <div className={styles.svg_container}>
            <TractusXSvg className={styles.svg} aria-hidden="true"/>
          </div>
          <div className={styles.information_container}>
            {breadcrumb}
            <h1 className="headers-title-h1">{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>
    </header>
  );
}
