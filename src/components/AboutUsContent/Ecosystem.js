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
import TractusXLogo from "@site/static/img/logo_tractus-x.svg";
import styles from "./styles.module.css";

const initiatives = [
  "Semiconductor-X", "Factory-X", "Chem-X", "Wind-X",
  "Construct-X", "Railway-X", "Catena-X Next",
];

// Public bodies and programs that fund work around Eclipse Tractus-X.
const funders = ["BMWE", "VDI/VDE-IT"];

export default function Ecosystem() {
  return (
    <figure className={styles.ecosystem} aria-labelledby="ecosystem-title" aria-describedby="ecosystem-caption">
      <div className={styles.ecosystemContext}>
        <span className={styles.nodeType}>Open source governance</span>
        <span className={styles.contextText}>
          <strong>Eclipse Foundation</strong> · The motherboard of open-source collaboration
        </span>
      </div>
      <div className={styles.ecosystemMap}>
        <div className={`${styles.node} ${styles.projects}`}>
          <span className={styles.nodeType}>Eclipse projects</span>
          <h3>Eclipse Dataspace Components</h3>
          <h3>Eclipse BaSyx</h3>
          <p>Reusable dataspace and digital twin technology</p>
          <span className={`${styles.trace} ${styles.traceDown}`} aria-hidden="true" />
        </div>

        <div className={styles.associations}>
          <div className={`${styles.node} ${styles.association}`}>
            <span className={styles.nodeType}>Industry association</span>
            <h3>Catena-X e.V.</h3>
            <p>Industry requirements, standards alignment, and the Catena-X use-case ecosystem</p>
            <span className={`${styles.trace} ${styles.traceRight}`} aria-hidden="true" />
          </div>

          <div className={`${styles.node} ${styles.idsa}`}>
            <span className={styles.nodeType}>Standards association</span>
            <h3>International Data Spaces Association</h3>
            <p>Data space reference architecture, certification, and the Dataspace Protocol</p>
            <span className={`${styles.trace} ${styles.traceRight}`} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.hub}>
          <div className={styles.hubDie}>
            <TractusXLogo className={styles.hubLogo} aria-hidden="true" />
            <span className={styles.nodeType}>Our shared open-source project</span>
            <h3>Eclipse Tractus-X</h3>
            <p>Where we build dataspaces!<br />Community Built. Open to everyone.</p>
            <ul className={styles.hubTags} aria-label="Shared outputs">
              <li>Software</li><li>KITs</li><li>Reference implementations</li>
            </ul>
          </div>
        </div>

        <div className={styles.supporters}>
          <div className={`${styles.node} ${styles.industries}`}>
            <span className={styles.nodeType}>Industry initiatives</span>
            <h3>Cross-industry collaboration</h3>
            <ul className={styles.initiativeList}>
              {initiatives.map((name) => <li key={name}>{name}</li>)}
            </ul>
            <p>Use cases, integration, feedback, and reuse</p>
            <span className={`${styles.trace} ${styles.traceLeft}`} aria-hidden="true" />
          </div>

          <div className={`${styles.node} ${styles.funding}`}>
            <span className={styles.nodeType}>Innovation funding organizations</span>
            <h3>Public funding &amp; research programs</h3>
            <ul className={styles.initiativeList}>
              {funders.map((name) => <li key={name}>{name}</li>)}
            </ul>
            <p>Funding for accelerator programs, research, and ecosystem growth</p>
            <span className={`${styles.trace} ${styles.traceLeft}`} aria-hidden="true" />
          </div>
        </div>

        <div className={`${styles.node} ${styles.companies}`}>
          <span className={styles.nodeType}>Companies &amp; individual contributors</span>
          <h3>Service providers &amp; independent companies</h3>
          <p>Code, features, testing, documentation, and operational experience</p>
          <span className={`${styles.trace} ${styles.traceUp}`} aria-hidden="true" />
        </div>
      </div>
      <figcaption id="ecosystem-caption">
        Connections represent collaboration, contribution, and reuse around
        Eclipse Tractus-X. Examples shown are an ecosystem overview; the scope of each
        initiative’s involvement varies.
      </figcaption>
    </figure>
  );
}
