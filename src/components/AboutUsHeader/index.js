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
import ThemedImage from '@theme/ThemedImage';
import TractusXSvg from '../../../static/img/logo_tractus-x.svg'

import styles from "./styles.module.css";

export default function AboutUsHeader() {
  return (
      <header className={styles.about_header}>
      {/* ThemedImage Docusaurus component that handles the BG depending on the theme displayed */}
        <ThemedImage
          // alt="Docusaurus themed image hero background"
          sources={{
            // light: ('/img/main-bg-new.png'),
            dark: ('/img/main_bg-min.png'),
          }}
          className={styles.hero_bg}
        />

      {/* Content of the component */}
        <div className={styles.container}>
          <div className={styles.svg_container}>
            <TractusXSvg className={styles.svg}/>
          </div>
          <div className={styles.information_container}>
            <h1 className="headers-title-h1">About Tractus X</h1>
            <p className="headers-subtitle-p">
              Eclipse Tractus-X™  is the official open-source project in the Catena-X ecosystem under the umbrella of the Eclipse Foundation.
            </p>
          </div>
        </div>
    </header>
  );
}
