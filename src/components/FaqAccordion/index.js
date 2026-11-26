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

// Accordion of questions and answers, built on native <details>/<summary>:
// keyboard and screen-reader support come from the browser, and the answers
// are in the HTML even before JavaScript loads.

import React from 'react';
import Link from '@docusaurus/Link';
import LinkIcon from '@mui/icons-material/Link';
import { parseLinks } from './richText';
import styles from './styles.module.css';

/** One paragraph of an answer, with its `[text](url)` links rendered. */
export function RichText({ value }) {
  return parseLinks(value).map(({ text, href }, index) => {
    if (!href) return <React.Fragment key={index}>{text}</React.Fragment>;
    if (href.startsWith('/') || href.startsWith('#')) {
      return <Link key={index} to={href}>{text}</Link>;
    }
    return <a key={index} href={href} target="_blank" rel="noopener noreferrer">{text}</a>;
  });
}

/**
 * @param {{
 *   items: {id: string, question: string, answer: string[]}[],
 *   openIds: Set<string>,
 *   onToggle: (id: string, open: boolean) => void,
 * }} props
 */
export default function FaqAccordion({ items, openIds, onToggle }) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, question, answer }) => (
        <li key={id}>
          <details
            id={id}
            className={styles.item}
            open={openIds.has(id)}
            onToggle={(event) => onToggle(id, event.currentTarget.open)}
          >
            {/* A summary may hold one heading and nothing else; the chevron is drawn in CSS. */}
            <summary className={styles.summary}>
              <h3 className={styles.question}>{question}</h3>
            </summary>
            <div className={styles.answer}>
              {answer.map((paragraph, index) => (
                <p key={index}><RichText value={paragraph} /></p>
              ))}
              <a className={styles.permalink} href={`#${id}`}>
                <LinkIcon aria-hidden="true" />
                Link to this question
              </a>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
