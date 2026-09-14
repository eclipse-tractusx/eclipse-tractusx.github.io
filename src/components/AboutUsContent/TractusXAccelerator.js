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
import styles from "./History.module.css";

// Accelerator partners, referenced by their id in tractusxOrganizations.
const partnerIds = ["idsa", "catena-x", "fraunhofer-isst", "arena2036"];

const partners = partnerIds
  .map((id) => tractusxOrganizations.find((organization) => organization.id === id))
  .filter(Boolean);

export default function TractusXAccelerator() {
  return (
    <div className={styles.accelerator}>
      <p>
        The Tractus-X Accelerator organizes the processes of the project and
        helps scale the community globally, so more industries, regions, and
        contributors can build dataspaces together.
      </p>
      <span className={styles.partnersLabel}>Partners</span>
      <ul className={styles.partners}>
        {partners.map(({ id, name, logo, url }) => (
          <li key={id}>
            <a href={url} title={name}>
              <img src={logo} alt={`${name} logo`} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
