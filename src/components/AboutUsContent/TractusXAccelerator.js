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
import { tractusxOrganizations } from "@site/data/tractusxOrganizations";
import { acceleratorFocusAreas, acceleratorLogos, acceleratorPartnerIds } from "@site/data/tractusxAccelerator";
import FundingBadge from "@site/src/components/FundingBadge";
import styles from "./History.module.css";

const partners = acceleratorPartnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

// Full color logos, one per site theme.
const [lightLogo, darkLogo] = ["color-dark-text", "color-light-text"].map(
  (id) => acceleratorLogos.find((logo) => logo.id === id).src
);

export default function TractusXAccelerator() {
  return (
    <div className={styles.accelerator}>
      <Link to="/accelerator" className={styles.acceleratorLogo}>
        <ThemedImage
          alt="Tractus-X Accelerator"
          sources={{ light: useBaseUrl(lightLogo), dark: useBaseUrl(darkLogo) }}
        />
      </Link>
      <p className={styles.acceleratorIntro}>
        The Tractus-X Accelerator is a cohort-based support program for projects, developers and
        organizations. It systematically lowers the technical and organizational barriers to entry
        and sustainably increases active participation in the open-source community.
      </p>
      <p className={styles.acceleratorIntro}>
        It combines proven approaches from startup acceleration with the requirements of industrial
        open-source ecosystems, and focuses on:
      </p>
      <ul className={styles.focusAreas}>
        {acceleratorFocusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
      <span className={styles.partnersLabel}>Partners</span>
      <ul className={styles.partners}>
        {partners.map(({ id, name, logo, url, acceleratorLogoScale }) => (
          <li key={id}>
            <a href={url} title={name}>
              <img src={logo} alt={`${name} logo`} loading="lazy"
                style={acceleratorLogoScale ? { transform: `scale(${acceleratorLogoScale})` } : undefined} />
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.acceleratorIntro}>
        Learn more on the <Link to="/accelerator">Tractus-X Accelerator page</Link>.
      </p>
      <span className={styles.partnersLabel}>Funding</span>
      <FundingBadge className={styles.funding} />
    </div>
  );
}
