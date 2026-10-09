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

/**
 * Calendar helpers shared by the event and meeting components.
 *
 * All event times in our data are written in Europe/Berlin. The .ics files
 * generated here carry a TZID plus a VTIMEZONE block rather than a fixed UTC
 * offset, so the entry lands at the correct local time in every calendar app —
 * and stays correct across daylight saving changes.
 */

import { addDays, format, parseISO } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

/** Timezone all event times in our data files are expressed in */
export const SOURCE_TIMEZONE = 'Europe/Berlin';

/**
 * The viewer's own IANA timezone (e.g. 'America/New_York').
 * Browser only — falls back to the source timezone during SSR.
 * @returns {string} IANA timezone name
 */
export function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || SOURCE_TIMEZONE;
  } catch {
    return SOURCE_TIMEZONE;
  }
}

/**
 * Fold a content line at 75 octets, as required by RFC 5545.
 * @param {string} line
 * @returns {string}
 */
export function foldICSLine(line) {
  const parts = [];
  while (line.length > 75) {
    parts.push(line.substring(0, 75));
    line = ' ' + line.substring(75);
  }
  parts.push(line);
  return parts.join('\r\n');
}

/** VTIMEZONE definition for Europe/Berlin (CET/CEST) */
export const VTIMEZONE_EUROPE_BERLIN = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/Berlin',
  'BEGIN:STANDARD',
  'DTSTART:19701025T030000',
  'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'END:STANDARD',
  'BEGIN:DAYLIGHT',
  'DTSTART:19700329T020000',
  'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'END:DAYLIGHT',
  'END:VTIMEZONE',
];

/** Escape the characters RFC 5545 reserves inside text values */
function escapeICSText(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** 'YYYY-MM-DD' -> 'YYYYMMDD' */
const toICSDate = (dateStr) => dateStr.replace(/-/g, '');

/** 'HH:mm' -> 'HHmmss' */
const toICSTime = (timeStr) => `${timeStr.replace(':', '')}00`;

/** Current instant as a UTC timestamp, e.g. '20261203T090000Z' */
const utcStamp = (date) => `${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

/**
 * Resolve an event's start and end to absolute instants (UTC Dates).
 * Returns null for all-day events, which have no wall-clock time to convert.
 *
 * @param {Object} event
 * @param {string} event.date - Start date, YYYY-MM-DD
 * @param {string} [event.endDate] - End date, YYYY-MM-DD (defaults to date)
 * @param {string} [event.startTime] - Start time, HH:mm
 * @param {string} [event.endTime] - End time, HH:mm
 * @param {string} [event.timezone] - IANA timezone the times are given in
 * @returns {{start: Date, end: Date}|null}
 */
export function getEventInstants({ date, endDate, startTime, endTime, timezone = SOURCE_TIMEZONE }) {
  if (!startTime || !endTime) return null;
  return {
    start: fromZonedTime(`${date}T${startTime}:00`, timezone),
    end: fromZonedTime(`${endDate || date}T${endTime}:00`, timezone),
  };
}

/**
 * Build an .ics file for a single, optionally multi-day event.
 *
 * With startTime/endTime the event is written as a timed entry carrying its
 * timezone. Without them it becomes an all-day blocker, which lands on the
 * right days no matter where the viewer is.
 *
 * @param {Object} event
 * @param {string} event.uid - Stable identifier for the event
 * @param {string} event.title
 * @param {string} event.date - Start date, YYYY-MM-DD
 * @param {string} [event.endDate] - End date, YYYY-MM-DD (inclusive)
 * @param {string} [event.startTime] - Start time, HH:mm
 * @param {string} [event.endTime] - End time, HH:mm
 * @param {string} [event.timezone] - IANA timezone the times are given in
 * @param {string} [event.description]
 * @param {string} [event.location]
 * @param {string} [event.url] - Page with more details about the event
 * @returns {string} .ics file content
 */
export function buildEventICS({
  uid,
  title,
  date,
  endDate,
  startTime,
  endTime,
  timezone = SOURCE_TIMEZONE,
  description,
  location,
  url,
}) {
  const isTimed = Boolean(startTime && endTime);
  // A VTIMEZONE is only shipped for the timezone we have a definition for;
  // anything else is written as absolute UTC instants, which is always correct.
  const useTZID = isTimed && timezone === SOURCE_TIMEZONE;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eclipse Tractus-X//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  if (useTZID) lines.push(...VTIMEZONE_EUROPE_BERLIN);

  lines.push('BEGIN:VEVENT');
  lines.push(`UID:${uid}@eclipse-tractusx.github.io`);
  lines.push(`DTSTAMP:${utcStamp(new Date())}`);

  if (useTZID) {
    lines.push(`DTSTART;TZID=${timezone}:${toICSDate(date)}T${toICSTime(startTime)}`);
    lines.push(`DTEND;TZID=${timezone}:${toICSDate(endDate || date)}T${toICSTime(endTime)}`);
  } else if (isTimed) {
    const instants = getEventInstants({ date, endDate, startTime, endTime, timezone });
    lines.push(`DTSTART:${utcStamp(instants.start)}`);
    lines.push(`DTEND:${utcStamp(instants.end)}`);
  } else {
    // All-day event — DTEND is exclusive, so the last day still needs +1.
    // Formatted locally on purpose: converting to UTC here would shift the date.
    const dayAfter = format(addDays(parseISO(endDate || date), 1), 'yyyyMMdd');
    lines.push(`DTSTART;VALUE=DATE:${toICSDate(date)}`);
    lines.push(`DTEND;VALUE=DATE:${dayAfter}`);
    lines.push('X-MICROSOFT-CDO-ALLDAYEVENT:TRUE');
  }

  lines.push(foldICSLine(`SUMMARY:${escapeICSText(title)}`));

  const descParts = [];
  if (description) descParts.push(escapeICSText(description));
  if (url) descParts.push(`\\n\\n${escapeICSText(url)}`);
  if (descParts.length) lines.push(foldICSLine(`DESCRIPTION:${descParts.join('')}`));

  if (location) lines.push(foldICSLine(`LOCATION:${escapeICSText(location)}`));
  if (url) lines.push(foldICSLine(`URL:${url}`));

  lines.push('STATUS:CONFIRMED');
  lines.push('TRANSP:OPAQUE');
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Hand the generated .ics to the browser as a download.
 * @param {string} filename - File name without extension
 * @param {string} ics - .ics file content
 */
export function downloadICS(filename, ics) {
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = `${filename}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}
