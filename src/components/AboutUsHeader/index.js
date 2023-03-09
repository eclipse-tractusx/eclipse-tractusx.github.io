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
import TractusXSvg from '../../../static/img/logo_tractus-x.svg'

import styles from "./styles.module.css";

export default function AboutUsHeader() {
  return (
      <header className={styles.about_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          <TractusXSvg className={styles.svg}/>
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>About Tractus X</h2>
          <p className={styles.subtitle}>
            Eclipse Tractus-X™  is the official open-source project in the Catena-X ecosystem under the umbrella of the Eclipse Foundation.
          </p>
        </div>
      </div>
    </header>
  );
}
