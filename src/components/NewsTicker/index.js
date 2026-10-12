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

import React, { useCallback, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { newsTitles } from "../../../utils/newsTitles";

import styles from "./styles.module.css";

// Time each news item stays visible before the ticker advances.
const ROTATION_MS = 6000;

/**
 * Rotating "latest news" bar shown at the bottom of the home page hero.
 * Shows one entry of `newsTitles` at a time, advances automatically, and
 * pauses while hovered, focused, or while the tab is in the background.
 */
export default function NewsTicker() {
  const items = newsTitles;
  const count = items.length;
  const hasMultiple = count > 1;

  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [hidden, setHidden] = useState(false);

  const goTo = useCallback(
    (next) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (!hasMultiple || engaged || hidden) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ROTATION_MS);
    return () => window.clearInterval(id);
  }, [hasMultiple, engaged, hidden, count]);

  // Pause while the tab is in the background so nothing jumps on return.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (count === 0) return null;

  const { date, title, blogLink } = items[index];

  return (
    <section
      className={styles.news_ticker}
      aria-label="Latest news"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
    >
      <div className={styles.bar}>
        <Link className={styles.button} to="/blog">
          News
        </Link>

        <span className={styles.date}>{date}</span>

        <div className={styles.viewport} aria-live="polite" aria-atomic="true">
          {/* Keyed by index so each entry re-mounts and replays the enter animation. */}
          <Link key={index} className={styles.item} to={blogLink}>
            <span className={styles.title}>{title}</span>
          </Link>
        </div>

        {hasMultiple && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => goTo(index - 1)}
              aria-label="Previous news"
            >
              <ChevronLeftIcon fontSize="inherit" aria-hidden="true" />
            </button>
            <div className={styles.dots}>
              {items.map((item, i) => (
                <button
                  key={`${item.blogLink}-${i}`}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show news ${i + 1} of ${count}: ${item.title}`}
                  aria-current={i === index ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => goTo(index + 1)}
              aria-label="Next news"
            >
              <ChevronRightIcon fontSize="inherit" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
