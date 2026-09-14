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

import React, { useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { tractusxOrganizations } from "@site/data/tractusxOrganizations";
import styles from "./styles.module.css";

function OrganizationCard({ organization, duplicate = false }) {
  const logo = useBaseUrl(organization.logo);
  return (
    <li className={styles.card} aria-hidden={duplicate ? true : undefined}>
      <a href={organization.url} className={styles.cardLink} tabIndex={duplicate ? -1 : undefined}>
        <div className={styles.logoPanel}>
          <img src={logo} alt={duplicate ? "" : `${organization.name} logo`} width="200" height="100" />
        </div>
        <span className={styles.name}>{organization.name}</span>
      </a>
    </li>
  );
}

export default function OrganizationCarousel({ title, subtitle }) {
  const track = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hovered || focused || reducedMotion) return undefined;
    const element = track.current;
    const firstDuplicate = element.children[tractusxOrganizations.length];
    if (!firstDuplicate) return undefined;
    let frame;
    let previousTime;
    let offset = element.scrollLeft;
    const animate = (time) => {
      const loopWidth = firstDuplicate.offsetLeft - element.children[0].offsetLeft;
      if (loopWidth > element.clientWidth) {
        // Move at 60 pixels per second, independent of the screen refresh rate.
        // The repeated logos make the wrap from the end to the start seamless.
        const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 50);
        offset = (offset + elapsed * 0.06) % loopWidth;
        element.scrollLeft = offset;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [hovered, focused, reducedMotion]);

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Organization logos">
      {title ? (
        <>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={`${styles.toolbar} ${styles.subtitle}`}>{subtitle}</p>}
        </>
      ) : (
        <div className={styles.toolbar}>
          <span>{tractusxOrganizations.length} organizations. A shared commitment to open source.</span>
        </div>
      )}
      <ul ref={track} className={styles.track} aria-label="Engaged organizations"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {tractusxOrganizations.map((organization) => (
          <OrganizationCard key={organization.id} organization={organization} />
        ))}
        {tractusxOrganizations.map((organization) => (
          <OrganizationCard key={`${organization.id}-repeat`} organization={organization} duplicate />
        ))}
      </ul>
    </div>
  );
}
