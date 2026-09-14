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
import TractusXAccelerator from "./TractusXAccelerator";
import styles from "./History.module.css";

// Project milestones in chronological order. To add a milestone, append an
// entry; the timeline renders newest first. Use `content` to render a component
// inside the card, `highlight` to emphasize it, and `future` for what is ahead.
const milestones = [
  {
    date: "2023",
    title: "An open-source project is born",
    description: "The Catena-X consortia with 32 partners from the automotive industry make their initial contribution to Eclipse Tractus-X, placing the foundations of the automotive dataspace in open source.",
    tags: ["Catena-X"],
  },
  {
    date: "2024",
    title: "A growing community",
    description: "Members of the Catena-X Association and independent open-source contributors continue to evolve the software, documentation, and releases together.",
    tags: ["Catena-X Association", "Open-source contributors"],
  },
  {
    date: "End of 2025",
    title: "Beyond automotive",
    description: "The project scope officially extends beyond the automotive industry and Catena-X, welcoming new active players. Announced at the fifth Eclipse Tractus-X Community Days.",
    tags: ["Semiconductor-X", "Construct-X"],
  },
  {
    date: "Feb 2026",
    title: "Cross-industry collaboration",
    description: "Factory-X contributes its open-source code and use-case deliverables, so Manufacturing-X working groups and other -X initiatives can build on them. Tractus-X also partners with the Eclipse Dataspace Working Group as a neutral home.",
    tags: ["Factory-X", "Manufacturing-X", "Eclipse Dataspace WG"],
  },
  {
    date: "Sep 2026 - 2029",
    title: "Tractus-X Accelerator",
    content: <TractusXAccelerator />,
    highlight: true,
  },
  {
    date: "2029 & beyond",
    title: "Dataspaces for every industry",
    description: "More industries and initiatives join to build and reuse shared, interoperable dataspace technology in the open.",
    future: true,
  },
];

export default function History() {
  return (
    <ol className={styles.timeline}>
      {[...milestones].reverse().map(({ date, title, description, tags, content, highlight, future }) => (
        <li
          key={`${date}-${title}`}
          className={[
            styles.milestone,
            highlight && styles.highlight,
            future && styles.future,
          ].filter(Boolean).join(" ")}
        >
          <span className={styles.dot} aria-hidden="true" />
          <time className={styles.date}>{date}</time>
          <article className={styles.card}>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {content}
            {tags && (
              <ul className={styles.tags} aria-label="Involved">
                {tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
