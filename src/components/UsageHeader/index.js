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

import styles from "./styles.module.css";

export default function UsageHeader(props) {
  console.log(props)
  return (
      <header className={styles.usage_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          {props.icon}
        </div>
        <div className={styles.information_container}>
          <h1 className="headers-title-h1">{props.title}</h1>
          <p className="headers-subtitle-p">
            {props.description}
          </p>
        </div>
      </div>
    </header>
  );
}
