/********************************************************************************
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

// Keeps the visitor's decision in the Eclipse Foundation cookie consent banner for 90
// days. See "Known limitations" in ANALYTICS.md.
//
// The banner (loaded in docusaurus.config.js) stores the decision twice:
// - for 90 days, with the domain "." + the last two labels of the host name. On
//   eclipse-tractusx.github.io that is ".github.io", a public suffix, so browsers
//   reject this cookie;
// - as a session cookie ("expires=0"), which is the only one that remains.
// Without this module the banner is therefore shown again in every browser session.
//
// After a click on "Allow" or "Deny", this module writes the same cookie (same name
// and value) again for 90 days, as a host-only cookie, which browsers accept. The
// Eclipse Foundation agreed to this workaround in eclipsefdn/helpdesk#7844. Remove it
// once the shared banner library sets a host-only cookie for public suffixes.

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const CONSENT_COOKIE = 'eclipse_cookieconsent_status';
const CONSENT_VALUES = ['allow', 'deny'];
// Same lifetime as the banner's own cookie.
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

function readConsent() {
  const prefix = `${CONSENT_COOKIE}=`;
  const cookie = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return cookie ? cookie.slice(prefix.length) : null;
}

function persistConsent() {
  const value = readConsent();
  if (!CONSENT_VALUES.includes(value)) {
    return;
  }
  const attributes = [`max-age=${MAX_AGE_SECONDS}`, 'path=/', 'SameSite=Lax'];
  if (window.location.protocol === 'https:') {
    attributes.push('Secure');
  }
  document.cookie = [`${CONSENT_COOKIE}=${value}`, ...attributes].join('; ');
}

function onClick(event) {
  if (event.target instanceof Element && event.target.closest('.cc-allow, .cc-deny')) {
    // The banner updates its cookie while it handles the click, so read it afterwards.
    setTimeout(persistConsent, 0);
  }
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', onClick);
}
