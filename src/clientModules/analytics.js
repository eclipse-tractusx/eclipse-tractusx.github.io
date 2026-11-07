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

// Consent-gated usage analytics with Umami. See ANALYTICS.md for the concept.
//
// The Eclipse Foundation Hosted Services Privacy and Acceptable Usage Policy requires
// that analytics only run after the visitor allowed cookies in the Eclipse Foundation
// cookie consent banner (loaded in docusaurus.config.js), and that no personal
// information is transmitted to the analytics platform.
//
// - The banner stores the decision in the cookie "eclipse_cookieconsent_status"
//   ("allow" or "deny"). Umami is only loaded once that cookie says "allow".
// - Every payload passes beforeSend() before it is sent: it is dropped if consent was
//   withdrawn through "Cookie settings", query strings and fragments are removed from
//   the page URL, paths that are not a page of this site are replaced by "/404", and
//   only the origin of the referrer is kept.
// - Umami does not set cookies and does not store IP addresses.
// - Page views (including every KIT page) are tracked by Umami itself, also for
//   client-side navigation. This module adds the search outcome, see
//   startSearchRequest(). Search terms are never sent.

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { matchPath } from '@docusaurus/router';
import siteConfig from '@generated/docusaurus.config';
import routes from '@generated/routes';

const CONSENT_COOKIE = 'eclipse_cookieconsent_status';
const BEFORE_SEND_HANDLER = 'tractusxAnalyticsBeforeSend';
const NOT_FOUND_PATH = '/404';
// Wait until the visitor stopped typing before a search is recorded.
const SEARCH_DEBOUNCE_MS = 1500;
const MIN_SEARCH_LENGTH = 2;

const analytics = siteConfig.customFields?.analytics ?? {};
const isActive = ExecutionEnvironment.canUseDOM && Boolean(analytics.enabled);

function hasConsent() {
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim() === `${CONSENT_COOKIE}=allow`);
}

// ---------------------------------------------------------------------------
// Payload sanitizing
// ---------------------------------------------------------------------------

// Removes the query string and fragment, which may contain personal information
// or tokens, and keeps the format of the value (absolute URL or path).
function stripQueryAndFragment(value) {
  const end = value.search(/[?#]/);
  return end === -1 ? value : value.slice(0, end);
}

// True if the path is a page of this site. Docusaurus renders every other path with
// its catch-all "*" route (the "Page Not Found" page). Such paths are typed or linked
// by someone else and may contain anything, so they are never sent.
function isKnownPage(pathname, routeList = routes) {
  return routeList.some((route) => {
    if (!route.path || route.path === '*') {
      return false;
    }
    if (!matchPath(pathname, { path: route.path, exact: Boolean(route.exact) })) {
      return false;
    }
    return route.routes ? isKnownPage(pathname, route.routes) : Boolean(route.exact);
  });
}

// Strips query and fragment and replaces unknown paths with "/404". Keeps the format
// of the value (absolute URL or path).
function sanitizeUrl(value) {
  if (typeof value !== 'string' || value === '') {
    return value;
  }
  const withoutQuery = stripQueryAndFragment(value);
  let url;
  try {
    url = new URL(withoutQuery, window.location.origin);
  } catch {
    return NOT_FOUND_PATH;
  }
  if (isKnownPage(url.pathname)) {
    return withoutQuery;
  }
  return withoutQuery.startsWith('/') ? NOT_FOUND_PATH : `${url.origin}${NOT_FOUND_PATH}`;
}

// Keeps only the origin of a referrer, for example "https://www.google.com".
function originOnly(value) {
  if (typeof value !== 'string' || value === '') {
    return '';
  }
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

function beforeSend(type, payload) {
  if (!hasConsent()) {
    return false;
  }
  return {
    ...payload,
    url: sanitizeUrl(payload.url),
    referrer: originOnly(payload.referrer),
  };
}

// ---------------------------------------------------------------------------
// Loading Umami
// ---------------------------------------------------------------------------

let umamiRequested = false;

function loadUmami() {
  if (umamiRequested) {
    return;
  }
  umamiRequested = true;

  window[BEFORE_SEND_HANDLER] = beforeSend;

  const script = document.createElement('script');
  script.defer = true;
  script.src = analytics.umamiScriptUrl;
  script.dataset.websiteId = analytics.umamiWebsiteId;
  script.dataset.domains = analytics.domains;
  script.dataset.doNotTrack = 'true';
  // Also stripped in beforeSend(), set here as well so Umami never reads them.
  script.dataset.excludeSearch = 'true';
  script.dataset.excludeHash = 'true';
  script.dataset.beforeSend = BEFORE_SEND_HANDLER;
  document.head.appendChild(script);
}

function track(eventName) {
  if (hasConsent() && typeof window.umami?.track === 'function') {
    window.umami.track(eventName);
  }
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
//
// Only whether a search found something ("search") or nothing ("search-no-results")
// is recorded, never the search term.
//
// Every search request is tracked individually (see src/theme/SearchBar):
// - startSearchRequest() numbers each request and records whether consent was given
//   when it started, and in which consent period ("epoch", increased with every click
//   on "Allow" or "Deny").
// - finishSearchRequest() only keeps the response if consent was given at the start,
//   is still given, and did not change in between. Responses of requests started
//   before consent, or before a withdrawal and a new consent, are ignored.
// - When the visitor stopped typing, the outcome of the newest request is recorded,
//   once, if it has completed and matches the text in the search field. The outcome
//   is therefore taken from the response of that very request, not from what the
//   dialog shows (DocSearch keeps showing older results while newer requests run and
//   responses can arrive out of order) and not from an earlier search with the same
//   text. A new search with the same text is a new request and counted on its own.

let consentEpoch = 0;
let lastStartedRequest = 0;
let latestResult = null; // { id, epoch, query, nbHits } of the newest completed request
let lastTrackedRequest = 0;
let searchTimer;

function normalizeQuery(query) {
  return typeof query === 'string' ? query.trim() : '';
}

function resetSearchTracking() {
  clearTimeout(searchTimer);
  latestResult = null;
}

function currentSearchQuery() {
  const input = document.querySelector('.DocSearch-Input');
  return input ? normalizeQuery(input.value) : null;
}

// Records the outcome of the newest request, at most once. Called when the visitor
// stopped typing, and right away when a result is opened (see onSearchSelect()). If
// the dialog was closed meanwhile (for example because a result was opened), its last
// completed request is the final search and is recorded as well; otherwise opening a
// result quickly would drop successful searches and skew the share of searches
// without results.
function recordFinalSearch() {
  clearTimeout(searchTimer);
  const result = latestResult;
  const fieldQuery = currentSearchQuery(); // null when the dialog is closed
  if (
    !hasConsent() ||
    !result ||
    result.epoch !== consentEpoch ||
    // The newest request has not completed yet; it schedules this again when it does.
    result.id !== lastStartedRequest ||
    result.id === lastTrackedRequest ||
    result.query.length < MIN_SEARCH_LENGTH ||
    (fieldQuery !== null && result.query !== fieldQuery)
  ) {
    return;
  }
  lastTrackedRequest = result.id;
  track(result.nbHits > 0 ? 'search' : 'search-no-results');
}

function scheduleSearchRecord() {
  clearTimeout(searchTimer);
  if (hasConsent()) {
    searchTimer = setTimeout(recordFinalSearch, SEARCH_DEBOUNCE_MS);
  }
}

// Called by src/theme/SearchBar when the search client starts a request. Returns a
// token that is passed to finishSearchRequest() with the response.
export function startSearchRequest() {
  lastStartedRequest += 1;
  return {
    id: lastStartedRequest,
    epoch: consentEpoch,
    consented: isActive && hasConsent(),
  };
}

// Called by src/theme/SearchBar with the response of a request.
export function finishSearchRequest(request, response) {
  if (
    !isActive ||
    !request?.consented ||
    request.epoch !== consentEpoch ||
    !hasConsent()
  ) {
    return;
  }
  const result = response?.results?.[0];
  if (!result || typeof result.nbHits !== 'number') {
    return;
  }
  // Responses of older requests are ignored once a newer one has completed.
  if (latestResult && latestResult.id > request.id) {
    return;
  }
  latestResult = {
    id: request.id,
    epoch: request.epoch,
    query: normalizeQuery(result.query),
    nbHits: result.nbHits,
  };
  scheduleSearchRecord();
}

function onInput(event) {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.classList.contains('DocSearch-Input')) {
    scheduleSearchRecord();
  }
}

// Opening a result (click, or Enter in the search field) or "See all results" ends the
// search: record it right away, while the dialog and the search field still exist.
// Runs in the capture phase, before DocSearch handles the event and closes the dialog.
function onSearchSelect(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const isResultClick =
    event.type === 'click' && target.closest('.DocSearch-Hit, .DocSearch-HitsFooter');
  const isEnter =
    event.type === 'keydown' && event.key === 'Enter' && target.classList.contains('DocSearch-Input');
  if (isResultClick || isEnter) {
    recordFinalSearch();
  }
}

// ---------------------------------------------------------------------------
// Consent changes
// ---------------------------------------------------------------------------

// The banner has no event for a changed decision, it only updates the cookie when
// "Allow" or "Deny" is clicked. Check the cookie right after such a click.
function onConsentChanged() {
  resetSearchTracking();
  if (hasConsent()) {
    loadUmami();
  }
}

function onClick(event) {
  if (event.target instanceof Element && event.target.closest('.cc-allow, .cc-deny')) {
    // A new consent period starts right away, so no running request counts for it.
    consentEpoch += 1;
    resetSearchTracking();
    setTimeout(onConsentChanged, 0);
  }
}

if (isActive) {
  if (hasConsent()) {
    loadUmami();
  }
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  document.addEventListener('click', onSearchSelect, true);
  document.addEventListener('keydown', onSearchSelect, true);
}
