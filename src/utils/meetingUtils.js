/*********************************************************************************
 * Copyright (c) 2023,2024 Contributors to the Eclipse Foundation
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

import {addDays, format, isAfter, isBefore, isWithinInterval, parse} from 'date-fns';
import {formatInTimeZone, fromZonedTime, toZonedTime} from 'date-fns-tz';
import {getOccurrenceHolidayStatus} from './holidayUtils';

// Source timezone for all meeting data
const SOURCE_TIMEZONE = 'Europe/Berlin';

// Day mapping for recurrence rules
const DAY_MAP = {
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6,
  'sunday': 0,
};

/**
 * Convert a time string (HH:mm) and date to a Date object in the source timezone
 */
function parseTimeInTimezone(dateStr, timeStr, timezone = SOURCE_TIMEZONE) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const baseDate = parse(dateStr, 'yyyy-MM-dd', new Date());
  baseDate.setHours(hours, minutes, 0, 0);

  // Convert from the source timezone to UTC
  return fromZonedTime(baseDate, timezone);
}

/**
 * Convert a UTC date to a local Date object that displays correctly for the target timezone
 * This is needed because react-big-calendar always displays dates in the browser's local timezone
 */
function convertToDisplayDate(utcDate, targetTimezone) {
  // Convert the UTC date to the target timezone
  const zonedDate = toZonedTime(utcDate, targetTimezone);

  // Extract the date/time components from the zoned time
  const year = zonedDate.getFullYear();
  const month = zonedDate.getMonth();
  const day = zonedDate.getDate();
  const hours = zonedDate.getHours();
  const minutes = zonedDate.getMinutes();
  const seconds = zonedDate.getSeconds();

  // Create a new Date object with these components in the local timezone
  // This will display as the correct time when the calendar renders it
  return new Date(year, month, day, hours, minutes, seconds);
}

/**
 * Format a date in a specific timezone
 */
export function formatDateInTimezone(date, timezone, formatStr = 'PPpp') {
  return formatInTimeZone(date, timezone, formatStr);
}

/**
 * Format time range in a specific timezone
 */
export function formatTimeRange(startDate, endDate, timezone) {
  const startTime = formatInTimeZone(startDate, timezone, 'HH:mm');
  const endTime = formatInTimeZone(endDate, timezone, 'HH:mm');
  return `${startTime} - ${endTime}`;
}

/**
 * Get timezone abbreviation (CET/CEST for Europe/Berlin)
 */
export function getTimezoneAbbreviation(date, timezone) {
  const formatted = formatInTimeZone(date, timezone, 'zzz');
  return formatted;
}

/**
 * Generate calendar events from meeting data
 */
export function generateCalendarEvents(meetings, startDate, endDate, timezone = SOURCE_TIMEZONE) {
  const events = [];

  meetings.forEach((meeting) => {
    if (!meeting.recurrence) {
      // On-demand meetings are not shown in calendar
      return;
    }

    const {recurrence} = meeting;

    if (recurrence.frequency === 'once') {
      // Single event — endDate may differ from startDate for multi-day events
      const endDateStr = recurrence.endDate || recurrence.startDate;
      const eventStart = parseTimeInTimezone(recurrence.startDate, recurrence.startTime, SOURCE_TIMEZONE);
      const eventEnd = parseTimeInTimezone(endDateStr, recurrence.endTime, SOURCE_TIMEZONE);

      if (isWithinInterval(eventStart, {start: startDate, end: endDate})) {
        const holidayStatus = getOccurrenceHolidayStatus(eventStart, recurrence.startDate, meeting);
        // One-time events are never skipped — they were explicitly scheduled
        events.push({
          ...meeting,
          start: convertToDisplayDate(eventStart, timezone),
          end: convertToDisplayDate(eventEnd, timezone),
          utcStart: eventStart,
          utcEnd: eventEnd,
          allDay: false,
          holidayInfo: holidayStatus.status !== 'normal' ? holidayStatus : undefined,
        });
      }
    } else {
      // Recurring events
      const validFrom = recurrence.validFrom ? parse(recurrence.validFrom, 'yyyy-MM-dd', new Date()) : startDate;
      const validUntil = recurrence.validUntil ? parse(recurrence.validUntil, 'yyyy-MM-dd', new Date()) : endDate;

      // Expand iteration range by ±1 day to handle timezone boundary crossings
      // between source timezone (Europe/Berlin) and the requested range timezone
      let currentDate = addDays(new Date(Math.max(startDate.getTime(), validFrom.getTime())), -1);
      const finalDate = addDays(new Date(Math.min(endDate.getTime(), validUntil.getTime())), 1);

      const seenDates = new Set();

      while (isBefore(currentDate, finalDate) || currentDate.getTime() === finalDate.getTime()) {
        // Use source timezone (Europe/Berlin) for calendar date and day-of-week,
        // since meeting schedules (daysOfWeek, startTime, endTime) are defined there
        const sourceDateStr = formatInTimeZone(currentDate, SOURCE_TIMEZONE, 'yyyy-MM-dd');

        // Skip duplicate source dates (can occur at ±1 day expansion boundaries)
        if (!seenDates.has(sourceDateStr)) {
          seenDates.add(sourceDateStr);

          const sourceZoned = toZonedTime(currentDate, SOURCE_TIMEZONE);
          const dayOfWeek = sourceZoned.getDay();
          const dayName = Object.keys(DAY_MAP).find(key => DAY_MAP[key] === dayOfWeek);

          if (recurrence.daysOfWeek && recurrence.daysOfWeek.includes(dayName)) {
            const eventStart = parseTimeInTimezone(sourceDateStr, recurrence.startTime, SOURCE_TIMEZONE);
            const eventEnd = parseTimeInTimezone(sourceDateStr, recurrence.endTime, SOURCE_TIMEZONE);

            // Only include events whose actual UTC time falls within the requested range
            if (isBefore(eventStart, endDate) && isAfter(eventEnd, startDate)) {
              // Check interval for weekly/bi-weekly meetings
              let includeEvent = true;
              if (recurrence.frequency === 'weekly' && recurrence.interval > 1) {
                const validFromDate = parse(recurrence.validFrom || sourceDateStr, 'yyyy-MM-dd', new Date());
                const currentSourceDate = parse(sourceDateStr, 'yyyy-MM-dd', new Date());
                const daysDiff = Math.round((currentSourceDate.getTime() - validFromDate.getTime()) / (24 * 60 * 60 * 1000));
                const weeksDiff = Math.floor(daysDiff / 7);
                if (weeksDiff % recurrence.interval !== 0) {
                  includeEvent = false;
                }
              }

              if (includeEvent) {
                const holidayStatus = getOccurrenceHolidayStatus(eventStart, sourceDateStr, meeting);

                // Skip dates that are explicitly marked to be skipped
                if (holidayStatus.status === 'skipped') {
                  // Don't add this event — it's been cancelled
                } else {
                  events.push({
                    ...meeting,
                    start: convertToDisplayDate(eventStart, timezone),
                    end: convertToDisplayDate(eventEnd, timezone),
                    utcStart: eventStart,
                    utcEnd: eventEnd,
                    allDay: false,
                    holidayInfo: holidayStatus.status !== 'normal' ? holidayStatus : undefined,
                  });
                }
              }
            }
          }
        }

        currentDate = addDays(currentDate, 1);
      }
    }
  });

  return events;
}

/**
 * Get a human-readable schedule description in the specified timezone
 */
export function getScheduleDescription(meeting, timezone = SOURCE_TIMEZONE) {
  if (!meeting.recurrence) {
    return 'No dedicated schedule - session needs to be requested';
  }

  const {recurrence} = meeting;

  if (recurrence.frequency === 'once') {
    const startTime = parseTimeInTimezone(recurrence.startDate, recurrence.startTime, SOURCE_TIMEZONE);
    const endTime = parseTimeInTimezone(recurrence.startDate, recurrence.endTime, SOURCE_TIMEZONE);
    
    // Use the UTC-correct startTime (not a local-midnight parse) so the date
    // displays consistently regardless of the visitor's browser timezone.
    const dateStr = formatInTimeZone(startTime, timezone, 'EEEE, d. MMMM yyyy');
    const timeRange = formatTimeRange(startTime, endTime, timezone);
    const tzAbbr = getTimezoneAbbreviation(startTime, timezone);

    if (recurrence.endDate && recurrence.endDate !== recurrence.startDate) {
      const endEventDate = parse(recurrence.endDate, 'yyyy-MM-dd', new Date());
      const endDateFormatted = formatInTimeZone(endEventDate, timezone, 'EEEE, d. MMMM yyyy');
      return `${dateStr} – ${endDateFormatted} from ${timeRange} ${tzAbbr}`;
    }

    return `${dateStr} from ${timeRange} ${tzAbbr}`;
  }

  // Recurring events
  const sampleDate = format(new Date(), 'yyyy-MM-dd');
  const startTime = parseTimeInTimezone(sampleDate, recurrence.startTime, SOURCE_TIMEZONE);
  const endTime = parseTimeInTimezone(sampleDate, recurrence.endTime, SOURCE_TIMEZONE);
  const timeRange = formatTimeRange(startTime, endTime, timezone);
  const tzAbbr = getTimezoneAbbreviation(startTime, timezone);

  let scheduleText = '';

  if (recurrence.frequency === 'daily') {
    const daysText = recurrence.daysOfWeek ? recurrence.daysOfWeek.join(', ') : 'every day';
    scheduleText = `Occurs ${daysText}`;
  } else if (recurrence.frequency === 'weekly') {
    const interval = recurrence.interval || 1;
    const intervalText = interval === 1 ? 'Every' : `Every ${interval} weeks on`;
    const days = recurrence.daysOfWeek.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
    scheduleText = `${intervalText} ${days}`;
  }

  if (recurrence.validFrom && recurrence.validUntil) {
    const fromDate = parse(recurrence.validFrom, 'yyyy-MM-dd', new Date());
    const untilDate = parse(recurrence.validUntil, 'yyyy-MM-dd', new Date());
    scheduleText += ` effective ${format(fromDate, 'd. MMM yyyy')} until ${format(untilDate, 'd. MMM yyyy')}`;
  } else if (recurrence.validFrom) {
    const fromDate = parse(recurrence.validFrom, 'yyyy-MM-dd', new Date());
    scheduleText += ` effective ${format(fromDate, 'd. MMM yyyy')}`;
  }

  scheduleText += ` from ${timeRange} ${tzAbbr}`;

  return scheduleText;
}

/**
 * Get category color for calendar events
 */
export function getCategoryColor(category) {
  const colors = {
    'general': '#4a90e2',      // Blue
    'product': '#50c878',       // Green
    'one-time': '#f5a623',      // Orange
  };

  return colors[category] || '#999999';
}

/**
 * Get category style for calendar events
 */
export function getCategoryStyle(category) {
  return {
    backgroundColor: getCategoryColor(category),
    borderColor: getCategoryColor(category),
    color: '#ffffff',
  };
}
