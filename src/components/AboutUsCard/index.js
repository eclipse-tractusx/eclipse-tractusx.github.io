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
import AboutUsTeaser from "@site/static/img/about-us-card-minified.png";

import styles from "./styles.module.css";

export default function AboutUsCard() {
  return (
    <section className={styles.about_us}>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img className={styles.img} src={AboutUsTeaser} />
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>About Eclipse Tractus-X</h2>
          <p className={styles.subtitle}>
            Background about Eclipse Tractus-X, license and legal information.
          </p>
          <div>
            <Link className={styles.button} to="/aboutus">
              About Tractus-X
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
