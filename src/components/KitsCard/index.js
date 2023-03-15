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
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function KitsCard({title, subtitle, cardTitle, cardSubtitle, img}) {
  return (
    <section className={styles.kits_card}>
      <Link className={styles.link} to="/icons">
        <div className={styles.container}>
          <div className={styles.information_container}>
            <h2 className={styles.title}>
              {title}
            </h2>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          </div>

          <div className={styles.card_container}>
            <div className={styles.description_container}>
              <h3>{cardTitle}</h3>
              <h3>{cardSubtitle}</h3>
            </div>
            <div className={styles.img_container}>
              <img className={styles.img} src={img}/>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
