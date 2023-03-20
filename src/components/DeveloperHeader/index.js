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
import KitsCoreSvg from '@site/static/img/kits&core.svg'

import styles from "./styles.module.css";

export default function DeveloperHeader() {
  return (
      <header className={styles.developer_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          <KitsCoreSvg className={styles.svg}/>
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>Kits & Core Services</h2>
          <p className={styles.subtitle}>
          Kits aim to accelerate the adoption, development, and operations of the next generation Business Applications and Services. Catena-X wants to support developers in order to accelerate the development of services and applications to contribute significantly to the rapid scaling of the Catena-X ecosystem.
          </p>
        </div>
      </div>
    </header>
  );
}
