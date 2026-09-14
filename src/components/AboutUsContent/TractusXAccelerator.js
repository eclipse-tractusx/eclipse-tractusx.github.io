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
import { tractusxOrganizations } from "@site/data/tractusxOrganizations";
import FundingBadge from "@site/src/components/FundingBadge";
import styles from "./History.module.css";

// Accelerator partners, referenced by their id in tractusxOrganizations.
const partnerIds = ["idsa", "catena-x", "fraunhofer-isst", "arena2036"];

const partners = partnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

// What the accelerator program offers.
const focusAreas = [
  "Structured onboarding and qualification of new projects and developers",
  "Test and development infrastructure",
  "Targeted mentoring by experienced community members",
  "Further development of governance, release and quality processes",
  "Sustainable community and exchange formats",
];

export default function TractusXAccelerator() {
  return (
    <div className={styles.accelerator}>
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
        {focusAreas.map((area) => (
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
      <span className={styles.partnersLabel}>Funding</span>
      <FundingBadge className={styles.funding} />
    </div>
  );
}
