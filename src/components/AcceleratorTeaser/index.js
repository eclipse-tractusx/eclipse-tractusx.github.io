/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
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
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { acceleratorFocusAreas, acceleratorLogos, acceleratorPeriod } from "@site/data/tractusxAccelerator";
import FundingBadge from "@site/src/components/FundingBadge";
import styles from "./styles.module.css";

const logoSrc = (id) => acceleratorLogos.find((logo) => logo.id === id).src;

/** Homepage teaser of the Tractus-X Accelerator, linking to /accelerator. */
export default function AcceleratorTeaser() {
  const lightLogo = useBaseUrl(logoSrc("color-dark-text"));
  const darkLogo = useBaseUrl(logoSrc("color-light-text"));

  return (
    <section className={styles.teaser} aria-labelledby="accelerator-teaser-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Tractus-X Accelerator · {acceleratorPeriod.replace(" - ", " – ")}</p>
          <h2 id="accelerator-teaser-title" className={styles.title}>
            Your way into the community
          </h2>
        </header>
        <div className={styles.card}>
          <div className={styles.brand}>
            <Link to="/accelerator" className={styles.logo}>
              <ThemedImage alt="Tractus-X Accelerator" sources={{ light: lightLogo, dark: darkLogo }} />
            </Link>
            <FundingBadge compact showAmount={false} />
          </div>
          <div className={styles.body}>
            <p className={styles.description}>
              The Tractus-X Accelerator strengthens the Eclipse Tractus-X community: financing models,
              better documentation and processes, a worldwide community, new dataspace initiatives,
              strategy and events. It is not a software development project.
            </p>
            <ul className={styles.focusAreas}>
              {acceleratorFocusAreas.map(({ id, title }) => (
                <li key={id}>
                  <CheckCircleOutlineIcon aria-hidden="true" />
                  {title}
                </li>
              ))}
            </ul>
            <Link className={styles.outlinedbutton} to="/accelerator">
              Discover the Accelerator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
