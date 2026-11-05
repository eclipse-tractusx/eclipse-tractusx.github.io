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

import Holidays from 'date-holidays';
import { COUNTRY_LABELS, CONTACTS } from '../../data/meetings';

// Cache holiday instances by country code
const holidayInstances = new Map();

/**
 * Get or create a Holidays instance for a country.
 * @param {string} countryCode - ISO 3166-1 alpha-2 code
 * @returns {Holidays}
 */
function getHolidayInstance(countryCode) {
  if (!holidayInstances.has(countryCode)) {
    const hd = new Holidays();
    hd.init(countryCode);
    holidayInstances.set(countryCode, hd);
  }
  return holidayInstances.get(countryCode);
}

/**
 * Extract unique country codes from a meeting's contacts.
 * @param {object|Array} contact - single contact or array of contacts
 * @returns {Array<{ country: string, label: string }>}
 */
function getContactCountries(contact) {
  const contacts = Array.isArray(contact) ? contact : contact ? [contact] : [];
  const seen = new Set();
  const result = [];
  for (const c of contacts) {
    const code = c.country;
    if (code && !seen.has(code)) {
      seen.add(code);
      result.push({ country: code, label: COUNTRY_LABELS[code] || code });
    }
  }
  return result;
}

/**
 * Get all unique countries across every contact in CONTACTS.
 * Used for calendar-wide holiday highlighting.
 * @returns {Array<{ country: string, label: string }>}
 */
function getAllContactCountries() {
  const seen = new Set();
  const result = [];
  for (const c of Object.values(CONTACTS)) {
    const code = c.country;
    if (code && !seen.has(code)) {
      seen.add(code);
      result.push({ country: code, label: COUNTRY_LABELS[code] || code });
    }
  }
  return result;
}

/**
 * Check a date against the countries of a meeting's contacts.
 *
 * @param {Date} date
 * @param {object|Array} contact - meeting's contact(s)
 * @returns {Array<{ name: string, country: string, label: string }>}
 */
export function getPublicHolidays(date, contact) {
  const countries = contact ? getContactCountries(contact) : getAllContactCountries();
  const matches = [];
  for (const { country, label } of countries) {
    const hd = getHolidayInstance(country);
    const result = hd.isHoliday(date);
    if (!result) continue;
    const pub = result.find(h => h.type === 'public');
    if (pub) {
      matches.push({ name: pub.name, country, label });
    }
  }
  return matches;
}

/**
 * Check if a date string (YYYY-MM-DD) is in the meeting's skipDates list.
 */
export function isSkippedDate(dateStr, meeting) {
  return meeting.skipDates?.includes(dateStr) || false;
}

/**
 * Check if a date string (YYYY-MM-DD) is in the meeting's forceIncludeDates list.
 */
export function isForcedDate(dateStr, meeting) {
  return meeting.forceIncludeDates?.includes(dateStr) || false;
}

/**
 * Determine the holiday status of a meeting occurrence.
 *
 * Priority:
 * 1. forceIncludeDates → meeting happens, no warning
 * 2. skipDates → meeting is skipped entirely
 * 3. Public holiday in any active country → soft warning listing affected countries
 *
 * @param {Date} date - The occurrence date
 * @param {string} dateStr - YYYY-MM-DD format of the date
 * @param {object} meeting - The meeting object
 * @returns {{ status: 'normal' | 'skipped' | 'holiday', holidays?: Array<{ name: string, country: string, label: string }> }}
 */
export function getOccurrenceHolidayStatus(date, dateStr, meeting) {
  // 1. Force-included dates always happen
  if (isForcedDate(dateStr, meeting)) {
    return { status: 'normal' };
  }

  // 2. Explicitly skipped dates
  if (isSkippedDate(dateStr, meeting)) {
    return { status: 'skipped' };
  }

  // 3. Auto-detected public holidays in contact persons' countries
  const holidays = getPublicHolidays(date, meeting.contact);
  if (holidays.length > 0) {
    return { status: 'holiday', holidays };
  }

  return { status: 'normal' };
}

/**
 * Get all public holidays for a given year across all active countries.
 * Returns deduplicated by date string, grouped with country info.
 *
 * @param {number} year
 * @returns {Array<{ date: Date, dateStr: string, holidays: Array<{ name: string, country: string, label: string }> }>}
 */
export function getHolidaysForYear(year) {
  const byDate = new Map();
  const countries = getAllContactCountries();

  for (const { country, label } of countries) {
    const hd = getHolidayInstance(country);
    for (const h of hd.getHolidays(year)) {
      if (h.type !== 'public') continue;
      const dateStr = h.date?.split(' ')[0] || '';
      if (!dateStr) continue;
      if (!byDate.has(dateStr)) {
        byDate.set(dateStr, { date: h.start, dateStr, holidays: [] });
      }
      byDate.get(dateStr).holidays.push({ name: h.name, country, label });
    }
  }

  return Array.from(byDate.values());
}
