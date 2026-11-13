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

// Answers are plain strings with Markdown-style links: "Read the [guide](/docs)".
// These helpers split them into text and link segments, and strip the links for
// places that need plain text (search and structured data).

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Only site paths and http(s)/mailto URLs become links; anything else stays text. */
export function isAllowedHref(href) {
  return /^(\/(?!\/)|#|https?:\/\/|mailto:)/.test(href);
}

/**
 * Splits a string into segments: `{ text }` or `{ text, href }`.
 * @param {string} value
 * @returns {{text: string, href?: string}[]}
 */
export function parseLinks(value) {
  const segments = [];
  let lastIndex = 0;
  for (const match of value.matchAll(LINK_PATTERN)) {
    const [whole, text, href] = match;
    if (match.index > lastIndex) {
      segments.push({ text: value.slice(lastIndex, match.index) });
    }
    segments.push(isAllowedHref(href) ? { text, href } : { text: whole });
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < value.length) {
    segments.push({ text: value.slice(lastIndex) });
  }
  return segments;
}

/** The text of a string without its link syntax: "Read the guide". */
export function toPlainText(value) {
  return parseLinks(value).map((segment) => segment.text).join('');
}
