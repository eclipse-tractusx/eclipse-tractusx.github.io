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

import React, { useState } from 'react';
import styles from './detail.module.scss';

const SHOWN = 24;

/** Contributors as compact avatar chips with their number of commits, most first. */
export default function Contributors({ people, graphUrl }) {
  const [expanded, setExpanded] = useState(false);
  if (people.length === 0) {
    return <p className={styles.muted}>No other contributors yet.</p>;
  }
  const shown = expanded ? people : people.slice(0, SHOWN);
  return (
    <>
      <ul className={styles.contributors}>
        {shown.map((person) => (
          <li key={person.login}>
            <a
              className={styles.contributor}
              href={`https://github.com/${person.login}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`${person.login}: ${person.contributions} ${person.contributions === 1 ? 'commit' : 'commits'}`}
            >
              <img
                className={styles.contributorAvatar}
                src={`https://github.com/${person.login}.png?size=64`}
                alt=""
                loading="lazy"
                width="28"
                height="28"
              />
              <span className={styles.contributorName}>{person.login}</span>
              <span className={styles.contributorCount}>{person.contributions}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.contributorsFoot}>
        {people.length > SHOWN && (
          <button type="button" className={styles.showMore} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show fewer' : `Show all ${people.length}`}
          </button>
        )}
        {graphUrl && (
          <a className={styles.contributorsGraph} href={graphUrl} target="_blank" rel="noopener noreferrer">
            Contributor graph on GitHub
          </a>
        )}
      </div>
    </>
  );
}
