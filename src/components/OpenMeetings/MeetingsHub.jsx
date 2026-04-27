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

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { meetings, MEETING_CATEGORIES, MEETING_PRIORITIES } from '@site/data/meetings';
import {
  generateCalendarEvents,
  getScheduleDescription,
  getCategoryColor,
  formatTimeRange,
  getTimezoneAbbreviation,
} from '@site/src/utils/meetingUtils';
import { addDays, format, startOfDay, endOfDay, addMonths, startOfMonth, endOfMonth, isSameDay, differenceInDays, differenceInHours, differenceInMinutes, isAfter, isBefore, startOfWeek, getDay } from 'date-fns';
import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';
import styles from './MeetingsHub.module.css';

// ──────────────────────────── Constants ────────────────────────────

const TIMEZONES = [
  { value: 'Europe/Berlin', label: 'Berlin / Paris (CET/CEST)' },
  { value: 'Europe/Bucharest', label: 'Eastern Europe (EET/EEST)' },
  { value: 'Africa/Johannesburg', label: 'South Africa (SAST)' },
  { value: 'UTC', label: 'UTC / GMT' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
];

const CATEGORY_LABELS = {
  general: 'General',
  product: 'Product',
  'one-time': 'Event',
};

const VIEWS = ['featured', 'products', 'events', 'others', 'agenda', 'calendar'];
const VIEW_LABELS = {
  featured: 'Featured',
  products: 'Products',
  events: 'Events',
  others: 'Others',
  agenda: 'Agenda',
  calendar: 'Calendar',
};
const VIEW_ICONS = {
  featured: 'star',
  products: 'inventory_2',
  events: 'event',
  others: 'groups',
  agenda: 'view_agenda',
  calendar: 'calendar_month',
};

// ──────────────────────────── Helpers ────────────────────────────

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin';
  } catch {
    return 'Europe/Berlin';
  }
}

/** Start of day in the given timezone, returned as a UTC Date */
function zonedStartOfDay(date, tz) {
  const zoned = toZonedTime(date, tz);
  return fromZonedTime(startOfDay(zoned), tz);
}

/** End of day in the given timezone, returned as a UTC Date */
function zonedEndOfDay(date, tz) {
  const zoned = toZonedTime(date, tz);
  return fromZonedTime(endOfDay(zoned), tz);
}

/** "Now" as perceived in the given timezone (zoned representation) */
function zonedNow(tz) {
  return toZonedTime(new Date(), tz);
}

function isDST(timezone) {
  const jan = new Date(new Date().getFullYear(), 0, 1);
  const jul = new Date(new Date().getFullYear(), 6, 1);
  const janOff = formatInTimeZone(jan, timezone, 'xxx');
  const julOff = formatInTimeZone(jul, timezone, 'xxx');
  return janOff !== julOff;
}

function getUTCOffset(timezone) {
  return formatInTimeZone(new Date(), timezone, 'xxx');
}

// Normalize contact field: always returns an array of contact objects
function getContacts(contact) {
  if (!contact) return [];
  if (Array.isArray(contact)) return contact;
  return [contact];
}

// Returns first contact (for ICS, mailto, single-display contexts)
function getPrimaryContact(contact) {
  return getContacts(contact)[0] || null;
}

function getContactInitials(contact) {
  const c = Array.isArray(contact) ? contact[0] : contact;
  if (!c) return '?';
  const email = typeof c === 'string' ? c : c.email;
  const name = typeof c === 'object' && c.name ? c.name : email.split('@')[0];
  return name.split(/[.\-_]/).map(w => w[0]?.toUpperCase()).filter(Boolean).slice(0, 2).join('');
}

function getContactDisplay(contact) {
  const c = Array.isArray(contact) ? contact[0] : contact;
  if (!c) return 'Unknown';
  const raw = typeof c === 'string' ? c.split('@')[0].replace(/\./g, ' ') : c.name;
  return raw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getContactEmail(contact) {
  const c = Array.isArray(contact) ? contact[0] : contact;
  return typeof c === 'string' ? c : c?.email || '';
}

function getFrequencyLabel(meeting) {
  if (!meeting.recurrence) return null;
  const freq = meeting.recurrence.frequency;
  const interval = meeting.recurrence.interval || 1;
  if (freq === 'weekly' && interval === 1) return 'Weekly';
  if (freq === 'weekly' && interval === 2) return 'Bi-weekly';
  if (freq === 'monthly') return 'Monthly';
  return freq.charAt(0).toUpperCase() + freq.slice(1);
}

function getShortCountdown(targetDate) {
  const now = new Date();
  const totalMins = differenceInMinutes(targetDate, now);
  if (totalMins <= 0) return null;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function Icon({ name, size, className = '' }) {
  return (
    <span
      className={`material-icons-outlined ${className}`}
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

function getCategoryBadgeClass(category) {
  if (category === 'general') return styles.badgeGeneral;
  if (category === 'product') return styles.badgeProduct;
  return styles.badgeOnetime;
}

function getNextOccurrence(meeting, timezone) {
  const now = new Date();
  const events = generateCalendarEvents([meeting], zonedStartOfDay(now, timezone), zonedEndOfDay(addDays(now, 90), timezone), timezone);
  return events.filter(e => isAfter(e.utcStart, now)).sort((a, b) => a.utcStart - b.utcStart)[0] || null;
}

function getCountdown(targetDate) {
  const now = new Date();
  const days = differenceInDays(targetDate, now);
  if (days > 1) return { value: days, label: 'days to go' };
  const hours = differenceInHours(targetDate, now);
  if (hours > 1) return { value: hours, label: 'hours to go' };
  const mins = differenceInMinutes(targetDate, now);
  return { value: Math.max(0, mins), label: 'minutes to go' };
}

function detectPlatform(link) {
  if (!link) return null;
  if (link.includes('teams.microsoft.com')) return 'teams';
  if (link.includes('zoom.us')) return 'zoom';
  return 'external';
}

function getPlatformLabel(platform) {
  if (platform === 'teams') return 'Microsoft Teams';
  if (platform === 'zoom') return 'Zoom Meeting';
  return 'External Link';
}

function getPlatformShort(platform) {
  if (platform === 'teams') return 'Teams';
  if (platform === 'zoom') return 'Zoom';
  return null;
}

function PlatformBadge({ link }) {
  const platform = detectPlatform(link);
  if (!platform || platform === 'external') return null;
  const cls = platform === 'zoom' ? styles.platformZoom : styles.platformTeams;
  return (
    <span className={`${styles.platformBadge} ${cls}`}>
      <Icon name={platform === 'zoom' ? 'videocam' : 'groups'} size={13} />
      {getPlatformShort(platform)}
    </span>
  );
}

function HolidayBadge({ event }) {
  if (!event?.holidayInfo || event.holidayInfo.status === 'normal') return null;
  if (event.holidayInfo.status === 'skipped') {
    return (
      <span className={`${styles.badge} ${styles.badgeHolidaySkipped}`} title="This meeting has been cancelled">
        <Icon name="event_busy" size={12} /> Cancelled
      </span>
    );
  }
  const holidays = event.holidayInfo.holidays || [];
  const names = [...new Set(holidays.map(h => h.name))];
  const countries = holidays.map(h => h.label);
  const tooltip = holidays.map(h => `${h.name} (${h.label})`).join(', ');
  return (
    <span className={`${styles.badge} ${styles.badgeHoliday}`} title={`${tooltip} — meeting may not take place`}>
      <Icon name="celebration" size={12} /> {names.length === 1 ? names[0] : `Holiday in ${countries.length} countries`}
    </span>
  );
}

function HolidayAlertText({ holidays }) {
  if (!holidays?.length) return null;
  // Group by unique holiday name, listing countries
  const grouped = {};
  for (const h of holidays) {
    if (!grouped[h.name]) grouped[h.name] = [];
    grouped[h.name].push(h.label);
  }
  const parts = Object.entries(grouped).map(([name, countries]) =>
    `${name} (${countries.join(', ')})`
  );
  return (
    <span>
      <strong>{parts.join(' · ')}</strong> — meeting may not take place
    </span>
  );
}

function isOnDemand(meeting) {
  return !meeting.recurrence;
}

function getRequestMailto(meeting) {
  const email = getContactEmail(meeting.contact);
  const subject = encodeURIComponent(`Meeting Request: ${meeting.title}`);
  const body = encodeURIComponent(
    `Hi ${getContactDisplay(meeting.contact)},\n\nI would like to request a session for "${meeting.title}".\n\nPlease let me know the available times.\n\nThank you!`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function getMatrixChatUrl(meeting) {
  return meeting.matrixChatUrl || null;
}

const DAY_MAP_RRULE = {
  monday: 'MO', tuesday: 'TU', wednesday: 'WE',
  thursday: 'TH', friday: 'FR', saturday: 'SA', sunday: 'SU',
};

function foldICSLine(line) {
  const parts = [];
  while (line.length > 75) {
    parts.push(line.substring(0, 75));
    line = ' ' + line.substring(75);
  }
  parts.push(line);
  return parts.join('\r\n');
}

function generateICSBlob(meeting, timezone, recurring) {
  const SOURCE_TZ = 'Europe/Berlin';
  const rec = meeting.recurrence;
  if (!rec) return null;

  // Build event times in the SOURCE timezone (Europe/Berlin) — TZID-aware
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eclipse Tractus-X//Open Meetings//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  // Add VTIMEZONE for source timezone (Europe/Berlin covers CET/CEST)
  lines.push(
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
  );

  lines.push('BEGIN:VEVENT');
  lines.push(`UID:${meeting.id}@eclipse-tractusx.github.io`);
  lines.push(`DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`);

  if (rec.frequency === 'once') {
    const startDate = rec.startDate.replace(/-/g, '');
    const endDateStr = rec.endDate || rec.startDate;
    const endDate = endDateStr.replace(/-/g, '');
    const startTime = rec.startTime.replace(':', '') + '00';
    const endTime = rec.endTime.replace(':', '') + '00';
    lines.push(`DTSTART;TZID=${SOURCE_TZ}:${startDate}T${startTime}`);
    lines.push(`DTEND;TZID=${SOURCE_TZ}:${endDate}T${endTime}`);
  } else {
    // Recurring: use validFrom or today as first occurrence
    const validFrom = rec.validFrom || format(new Date(), 'yyyy-MM-dd');
    const startDate = validFrom.replace(/-/g, '');
    const startTime = rec.startTime.replace(':', '') + '00';
    const endTime = rec.endTime.replace(':', '') + '00';
    lines.push(`DTSTART;TZID=${SOURCE_TZ}:${startDate}T${startTime}`);
    lines.push(`DTEND;TZID=${SOURCE_TZ}:${startDate}T${endTime}`);

    if (recurring) {
      // Build RRULE
      let rrule = '';
      if (rec.frequency === 'daily') {
        const byDay = (rec.daysOfWeek || []).map(d => DAY_MAP_RRULE[d]).filter(Boolean).join(',');
        rrule = `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`;
        if (rec.interval && rec.interval > 1) rrule += `;INTERVAL=${rec.interval}`;
      } else if (rec.frequency === 'weekly') {
        const byDay = (rec.daysOfWeek || []).map(d => DAY_MAP_RRULE[d]).filter(Boolean).join(',');
        rrule = `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`;
        if (rec.interval && rec.interval > 1) rrule += `;INTERVAL=${rec.interval}`;
      }
      if (rec.validUntil) {
        const until = rec.validUntil.replace(/-/g, '') + 'T235959Z';
        rrule += `;UNTIL=${until}`;
      }
      if (rrule) lines.push(rrule);
    }
  }

  lines.push(foldICSLine(`SUMMARY:${meeting.title}`));

  // Detect meeting platform
  const platform = detectPlatform(meeting.sessionLink);
  const isTeams = platform === 'teams';
  const platformLabel = isTeams ? 'Microsoft Teams' : platform === 'zoom' ? 'Zoom' : 'Online';

  // Description with meeting link
  const descParts = [];
  if (meeting.description) descParts.push(meeting.description);
  if (meeting.sessionLink) {
    if (isTeams) {
      descParts.push('\\n\\n________________________________________________________________________________');
      descParts.push('\\nMicrosoft Teams Meeting');
      descParts.push(`\\nJoin on your computer or mobile app`);
      descParts.push(`\\nClick here to join the meeting: ${meeting.sessionLink}`);
      descParts.push('\\n________________________________________________________________________________');
    } else {
      descParts.push(`\\n\\nJoin: ${meeting.sessionLink}`);
    }
  }
  if (meeting.contact) {
    descParts.push(`\\nContact: ${getContactEmail(meeting.contact)}`);
  }
  lines.push(foldICSLine(`DESCRIPTION:${descParts.join('')}`));

  // X-ALT-DESC with HTML body for rich rendering in Outlook
  if (meeting.sessionLink) {
    const escapedLink = meeting.sessionLink.replace(/&/g, '&amp;');
    const escapedDesc = meeting.description ? meeting.description.replace(/&/g, '&amp;').replace(/</g, '&lt;') : '';

    let htmlDesc;
    if (isTeams) {
      // Use the Teams meeting HTML pattern that Outlook recognizes
      htmlDesc = [
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">',
        '<HTML><BODY>',
        escapedDesc ? `<p>${escapedDesc}</p>` : '',
        '<div style="margin-top:16px;margin-bottom:4px;border-top:1px solid #ccc;padding-top:12px">',
        '<div style="margin-bottom:4px"><b>Microsoft Teams Meeting</b></div>',
        `<div style="margin-bottom:8px"><a href="${escapedLink}" style="font-size:14px;color:#6264A7;text-decoration:underline">Join the meeting</a></div>`,
        '</div>',
        meeting.contact ? `<p>Contact: ${getContactEmail(meeting.contact)}</p>` : '',
        '</BODY></HTML>',
      ].filter(Boolean).join('');
    } else {
      htmlDesc = [
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">',
        '<HTML><BODY>',
        escapedDesc ? `<p>${escapedDesc}</p>` : '',
        `<p><b>${platformLabel} Meeting</b></p>`,
        `<p><a href="${escapedLink}">Join ${platformLabel} Meeting</a></p>`,
        meeting.contact ? `<p>Contact: ${getContactEmail(meeting.contact)}</p>` : '',
        '</BODY></HTML>',
      ].filter(Boolean).join('');
    }
    lines.push(foldICSLine(`X-ALT-DESC;FMTTYPE=text/html:${htmlDesc}`));
  }

  // Teams-specific properties that help Outlook detect it as a Teams meeting
  if (isTeams && meeting.sessionLink) {
    lines.push(foldICSLine(`X-MICROSOFT-SKYPETEAMSMEETINGURL:${meeting.sessionLink}`));
    lines.push(`LOCATION:Microsoft Teams Meeting`);
  } else if (meeting.sessionLink) {
    lines.push(foldICSLine(`LOCATION:${meeting.sessionLink}`));
  }

  // CONFERENCE property (RFC 7986) — supported by modern calendar clients
  if (meeting.sessionLink) {
    const features = isTeams ? 'AUDIO,VIDEO' : platform === 'zoom' ? 'AUDIO,VIDEO' : 'AUDIO';
    lines.push(foldICSLine(`CONFERENCE;VALUE=URI;FEATURE=${features};LABEL=Join ${platformLabel} Meeting:${meeting.sessionLink}`));
  }

  // Add organizer info
  if (meeting.contact) {
    lines.push(foldICSLine(`ORGANIZER;CN=${getContactDisplay(meeting.contact)}:mailto:${getContactEmail(meeting.contact)}`));
  }

  lines.push('STATUS:CONFIRMED');
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
}

function downloadICS(meeting, timezone, recurring) {
  const blob = generateICSBlob(meeting, timezone, recurring);
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${meeting.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyShareLink(meetingId) {
  const url = `${window.location.origin}${window.location.pathname}#${meetingId}`;
  navigator.clipboard.writeText(url);
}

function ShareButton({ meetingId, label, style, onClick, floating }) {
  const [copied, setCopied] = useState(false);
  const handleClick = (e) => {
    if (onClick) onClick(e);
    e.stopPropagation();
    copyShareLink(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  if (floating) {
    return (
      <button
        className={copied ? styles.shareFloatingCopied : styles.shareFloating}
        style={style}
        onClick={handleClick}
        title={copied ? 'Link copied!' : 'Share meeting'}
      >
        <Icon name={copied ? 'check' : 'ios_share'} size={16} />
      </button>
    );
  }
  return (
    <button
      className={`${styles.btn} ${copied ? styles.btnCopied : styles.btnSecondary}`}
      style={style}
      onClick={handleClick}
    >
      <Icon name={copied ? 'check_circle' : 'share'} size={16} />
      {label && (copied ? ' Copied!' : ` ${label}`)}
    </button>
  );
}



// ──────────────────────────── Sub-components ────────────────────────────

function TimezoneBar({ timezone, onTimezoneChange }) {
  const hasDST = isDST(timezone);
  const offset = getUTCOffset(timezone);
  const now = new Date();
  const isSummer = (() => {
    if (!hasDST) return false;
    const jan = formatInTimeZone(new Date(now.getFullYear(), 0, 1), timezone, 'xxx');
    const current = formatInTimeZone(now, timezone, 'xxx');
    return jan !== current;
  })();

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
      <Icon name="language" />
      <Typography variant="body2" sx={{ color: 'var(--om-dimmed)', fontSize: 13, whiteSpace: 'nowrap' }}>Your timezone:</Typography>
      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 220 } }}>
        <Select
          value={timezone}
          onChange={e => onTimezoneChange(e.target.value)}
          aria-label="Select timezone"
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--om-fg)',
            bgcolor: 'var(--om-surface-hover)',
            borderRadius: 'var(--om-radius-sm)',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--om-border)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--om-border-hover)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--om-orange)' },
            '& .MuiSelect-select': { py: '6px', px: '12px' },
          }}
        >
          {TIMEZONES.map(tz => (
            <MenuItem key={tz.value} value={tz.value} sx={{ fontSize: 13 }}>{tz.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="caption" sx={{ fontFamily: 'var(--om-mono)', color: 'var(--om-muted)', fontSize: 12 }}>{offset}</Typography>
      {hasDST && (
        <Chip
          icon={<Icon name="wb_sunny" size={14} />}
          label={isSummer ? 'Summer time' : 'Winter time'}
          size="small"
          sx={{
            bgcolor: 'var(--om-orange-dim)',
            color: 'var(--om-orange)',
            fontSize: 11,
            fontWeight: 600,
            '& .MuiChip-icon': { color: 'var(--om-orange)' },
          }}
        />
      )}
    </Stack>
  );
}

function HighlightHero({ meeting, timezone, onSelect, onDownload }) {
  const next = getNextOccurrence(meeting, timezone);
  const countdown = next ? getCountdown(next.utcStart) : null;

  return (
    <div className={styles.highlightCard} onClick={() => onSelect(meeting)} role="button" tabIndex={0}>
      <div>
        <div className={styles.hlPriority}><Icon name="diamond" /> Highlight</div>
        <div className={styles.hlTitle}>{meeting.icon && <Icon name={meeting.icon} size={24} />} {meeting.title}</div>
        <div className={styles.hlDesc}>{meeting.description}</div>
        <div className={styles.hlMeta}>
          {next && (
            <span className={styles.hlMetaItem}>
              <Icon name="event" size={15} />
              <span className={styles.hlMetaDate}>
                {formatInTimeZone(next.utcStart, timezone, 'EEE, d MMM yyyy')}
              </span>
            </span>
          )}
          <span className={styles.hlMetaItem}>
            <Icon name="schedule" size={15} />
            {getScheduleDescription(meeting, timezone)}
          </span>
          {meeting.location && (
            <span className={styles.hlMetaItem}>
              <Icon name="location_on" size={15} />
              {meeting.location}
            </span>
          )}
          <span className={styles.hlMetaItem}>
            <Icon name="person" size={15} />
            {getContacts(meeting.contact).length === 1
              ? getContactDisplay(meeting.contact)
              : getContacts(meeting.contact).map(c => c.name?.split(' ')[0]).join(', ')}
          </span>
          {meeting.sessionLink && <PlatformBadge link={meeting.sessionLink} />}
        </div>
        {meeting.additionalLinks?.length > 0 && (
          <div className={styles.hlLinks}>
            {meeting.additionalLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.linkChip}
                 onClick={e => e.stopPropagation()}>
                <Icon name="article" size={14} /> {link.title}
              </a>
            ))}
          </div>
        )}
        <div className={styles.hlActions}>
          {meeting.sessionLink && (
            <a href={meeting.sessionLink} target="_blank" rel="noopener noreferrer"
               className={`${styles.btn} ${styles.btnHighlight}`} onClick={e => e.stopPropagation()}>
              <Icon name="how_to_reg" size={16} /> Register Now
            </a>
          )}
          {next && (
            <button
               className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => { e.stopPropagation(); onDownload(meeting); }}>
              <Icon name="download" size={16} /> Add to Calendar (.ics)
            </button>
          )}
          {getMatrixChatUrl(meeting) && (
            <a href={getMatrixChatUrl(meeting)} target="_blank" rel="noopener noreferrer"
               className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => e.stopPropagation()}>
              <Icon name="chat" size={16} /> Chat
            </a>
          )}
        </div>
      </div>
      {countdown && (
        <div className={styles.hlCountdown}>
          <div className={styles.countdownValue}>{countdown.value}</div>
          <div className={styles.countdownLabel}>{countdown.label}</div>
          {next && (
            <div className={styles.countdownDate}>
              {formatInTimeZone(next.utcStart, timezone, 'MMM d, yyyy')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ meeting, timezone, onSelect, onDownload }) {
  const next = getNextOccurrence(meeting, timezone);

  return (
    <div className={styles.featuredCard} onClick={() => onSelect(meeting)} role="button" tabIndex={0}>
      <div className={styles.fcTop}>
        <span className={`${styles.badge} ${getCategoryBadgeClass(meeting.category)}`}>
          {CATEGORY_LABELS[meeting.category] || meeting.category}
        </span>
        <span className={styles.fcPriority}><Icon name="star" size={14} /> Featured</span>
      </div>
      <div className={styles.fcTitle}>{meeting.icon && <Icon name={meeting.icon} size={20} />} {meeting.title}</div>
      <div className={styles.fcSchedule}>
        <Icon name="repeat" size={15} /> {getScheduleDescription(meeting, timezone)}
        {meeting.sessionLink && <PlatformBadge link={meeting.sessionLink} />}
      </div>
      {next && (
        <div className={styles.fcNext}>
          <Icon name="event_upcoming" size={15} /> Next: {formatInTimeZone(next.utcStart, timezone, 'EEE, d MMM · HH:mm')} {getTimezoneAbbreviation(next.utcStart, timezone)}
        </div>
      )}
      {next?.holidayInfo?.status === 'holiday' && (
        <div className={styles.holidayAlert}>
          <Icon name="celebration" size={14} />
          <span><HolidayAlertText holidays={next.holidayInfo.holidays} /></span>
        </div>
      )}
      {next?.holidayInfo?.status === 'skipped' && (
        <div className={styles.holidayAlertSkipped}>
          <Icon name="event_busy" size={14} />
          <span>Next occurrence has been <strong>cancelled</strong></span>
        </div>
      )}
      <div className={styles.fcDesc}>{meeting.description}</div>
      <div className={styles.fcContact}>
        {getContacts(meeting.contact).map((c, ci) => (
          c.github ? (
            <img key={ci} src={`https://github.com/${c.github}.png`} alt={c.name} className={styles.miniAvatar} title={c.name}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = ''); }}
            />
          ) : null
        ))}
        {getContacts(meeting.contact).map((c, ci) => (
          !c.github ? (
            <span key={`i${ci}`} className={styles.miniAvatarText} title={c.name}>{getContactInitials(c)}</span>
          ) : (
            <span key={`i${ci}`} className={styles.miniAvatarText} title={c.name} style={{ display: 'none' }}>{getContactInitials(c)}</span>
          )
        ))}
        <strong>{getContacts(meeting.contact).length === 1
          ? getContactDisplay(meeting.contact)
          : getContacts(meeting.contact).map(c => c.name?.split(' ')[0]).join(', ')}</strong>
      </div>
      <div className={styles.fcActions}>
        {isOnDemand(meeting) ? (
          <a href={getRequestMailto(meeting)}
             className={`${styles.btn} ${styles.btnPrimary}`} onClick={e => e.stopPropagation()}>
            <Icon name="mail" size={16} /> Request Meeting
          </a>
        ) : meeting.sessionLink && (
          <a href={meeting.sessionLink} target="_blank" rel="noopener noreferrer"
             className={`${styles.btn} ${styles.btnPrimary}`} onClick={e => e.stopPropagation()}>
            <Icon name="videocam" size={16} /> {getPlatformShort(detectPlatform(meeting.sessionLink)) ? `Join ${getPlatformShort(detectPlatform(meeting.sessionLink))}` : 'Join Meeting'}
          </a>
        )}
        {next && (
          <button
             className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => { e.stopPropagation(); onDownload(meeting); }}>
            <Icon name="download" size={16} /> .ics
          </button>
        )}
        {getMatrixChatUrl(meeting) && (
          <a href={getMatrixChatUrl(meeting)} target="_blank" rel="noopener noreferrer"
             className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => e.stopPropagation()}>
            <Icon name="chat" size={16} /> Chat
          </a>
        )}
        <ShareButton meetingId={meeting.id} label="Share" />
      </div>
    </div>
  );
}

function TodaySection({ timezone, onSelect, onDownload }) {
  const now = new Date();
  const nowInTz = zonedNow(timezone);
  const [dayOffset, setDayOffset] = useState(0); // -1 = yesterday, 0 = today, 1 = tomorrow
  const [showEnded, setShowEnded] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const makeEvents = (offset) => {
    const target = offset === 0 ? now : fromZonedTime(addDays(nowInTz, offset), timezone);
    return generateCalendarEvents(meetings, zonedStartOfDay(target, timezone), zonedEndOfDay(target, timezone), timezone)
      .sort((a, b) => a.utcStart - b.utcStart);
  };

  const yesterdayEvents = useMemo(() => makeEvents(-1), [timezone]);
  const todayEvents = useMemo(() => makeEvents(0), [timezone]);
  const tomorrowEvents = useMemo(() => makeEvents(1), [timezone]);

  const eventsByOffset = { '-1': yesterdayEvents, '0': todayEvents, '1': tomorrowEvents };
  const activeEvents = eventsByOffset[dayOffset] || todayEvents;
  const activeZonedDate = addDays(nowInTz, dayOffset);
  const isToday = dayOffset === 0;
  const isPast = dayOffset < 0;

  const DAY_CONFIG = [
    { offset: -1, label: 'Yesterday', icon: 'history', events: yesterdayEvents },
    { offset: 0, label: 'Today', icon: 'today', events: todayEvents },
    { offset: 1, label: 'Tomorrow', icon: 'event', events: tomorrowEvents },
  ];

  // Update scroll arrow visibility
  const updateScrollArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollArrows, { passive: true });
    const ro = new ResizeObserver(updateScrollArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollArrows);
      ro.disconnect();
    };
  }, [updateScrollArrows, dayOffset]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[class*="todayCard"]')?.offsetWidth || 300;
    el.scrollBy({ left: dir * (cardWidth + 14), behavior: 'smooth' });
  };

  if (yesterdayEvents.length === 0 && todayEvents.length === 0 && tomorrowEvents.length === 0) return null;

  const sectionDesc = dayOffset === -1
    ? "Yesterday\u2019s meetings \u2014 review what you may have missed."
    : dayOffset === 1
      ? "What\u2019s coming up tomorrow \u2014 plan ahead and don\u2019t miss anything."
      : "What\u2019s happening today \u2014 join live or catch the next session.";

  return (
    <>
      <div className={styles.sectionLabel}>
        <div className={styles.sectionTitle}>
          <Icon name={DAY_CONFIG.find(d => d.offset === dayOffset)?.icon || 'today'} size={14} />
          {DAY_CONFIG.find(d => d.offset === dayOffset)?.label || 'Today'} &mdash; {formatInTimeZone(activeZonedDate, timezone, 'EEEE, MMMM d')}
        </div>
        <div className={styles.sectionDesc}>{sectionDesc}</div>
      </div>

      {/* Day toggle + scroll arrows */}
      <div className={styles.todayToolbar}>
        <div className={styles.todayDayToggle}>
          {DAY_CONFIG.map(({ offset, label, icon, events: evts }) => (
            <button
              key={offset}
              className={`${styles.todayDayBtn} ${dayOffset === offset ? styles.todayDayBtnActive : ''}`}
              onClick={() => { setDayOffset(offset); setShowEnded(false); }}
            >
              <Icon name={icon} size={15} /> {label}
              {evts.length > 0 && <span className={styles.todayDayCount}>{evts.length}</span>}
            </button>
          ))}
        </div>
        {activeEvents.length > 2 && (
          <div className={styles.todayScrollNav}>
            <button
              className={`${styles.btn} ${styles.btnGhost} ${styles.todayScrollBtn}`}
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <Icon name="chevron_left" size={20} />
            </button>
            <button
              className={`${styles.btn} ${styles.btnGhost} ${styles.todayScrollBtn}`}
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <Icon name="chevron_right" size={20} />
            </button>
          </div>
        )}
      </div>

      {activeEvents.length === 0 ? (
        <div className={styles.todayEmpty}>
          <Icon name="event_busy" size={24} />
          <span>No meetings {DAY_CONFIG.find(d => d.offset === dayOffset)?.label.toLowerCase() || 'today'}</span>
        </div>
      ) : (() => {
        let endedCount = 0;
        const cards = activeEvents.map((ev, i) => {
          const isLive = isToday && isBefore(ev.utcStart, now) && isAfter(ev.utcEnd, now);
          const isEnded = isPast || (isToday && isBefore(ev.utcEnd, now));
          if (isEnded && !isLive) endedCount++;
          const countdown = !isPast && !isLive && !isEnded ? getShortCountdown(ev.utcStart) : null;
          const freq = getFrequencyLabel(ev);
          let cardClass = styles.todayCard;
          if (isLive) cardClass += ` ${styles.todayCardLive}`;
          if (isEnded) cardClass += ` ${styles.todayCardEnded}`;

          return (
            <div key={`${ev.id}-${i}`} className={cardClass} onClick={() => !isEnded && onSelect(ev)} role="button" tabIndex={0}>
              <ShareButton meetingId={ev.id} floating />
              {ev.icon && (
                <div className={styles.cardIconHero}>
                  <Icon name={ev.icon} size={36} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span className={`${styles.badge} ${getCategoryBadgeClass(ev.category)}`}>
                  {CATEGORY_LABELS[ev.category]}
                </span>
                {isLive && <span className={`${styles.badge} ${styles.badgeLive}`}><span className={styles.dot} /> Live Now</span>}
                {isEnded && <span className={`${styles.badge} ${styles.badgeEnded}`}><Icon name="check_circle" size={12} /> Ended</span>}
                {countdown && <span className={`${styles.badge} ${styles.badgeCountdown}`}><Icon name="hourglass_top" size={12} /> In {countdown}</span>}
                <HolidayBadge event={ev} />
              </div>
              <div className={styles.todayCardTitle}>{ev.title}</div>
              <div className={styles.cardTime}>
                <Icon name="schedule" size={15} />
                {formatInTimeZone(ev.utcStart, timezone, 'HH:mm')} – {formatInTimeZone(ev.utcEnd, timezone, 'HH:mm')} {getTimezoneAbbreviation(ev.utcStart, timezone)}
              </div>
              <div className={styles.cardFreq}>
                {freq && <span className={styles.cardFreqItem}><Icon name="repeat" size={14} /> {freq}</span>}
                {freq && ev.contact && <span className={styles.cardFreqDot}>&middot;</span>}
                {ev.contact && (
                  <span className={styles.cardFreqContact}><Icon name="person" size={14} /> {getContactDisplay(ev.contact)}</span>
                )}
                {ev.sessionLink && <><span className={styles.cardFreqDot}>&middot;</span><PlatformBadge link={ev.sessionLink} /></>}
              </div>
              {!isEnded && (
                <div className={styles.cardActions}>
                  {ev.sessionLink && (
                    <a href={ev.sessionLink} target="_blank" rel="noopener noreferrer"
                       className={`${styles.btn} ${isLive ? styles.btnPrimary : styles.btnSecondary}`} onClick={e => e.stopPropagation()}>
                      <Icon name="videocam" size={16} /> {isLive ? 'Join Now' : (getPlatformShort(detectPlatform(ev.sessionLink)) || 'Join')}
                    </a>
                  )}
                  <button
                     className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => { e.stopPropagation(); onDownload(ev); }}>
                    <Icon name="download" size={16} /> .ics
                  </button>
                </div>
              )}
            </div>
          );
        });

        const allEnded = endedCount === activeEvents.length;
        const dayLabel = DAY_CONFIG.find(d => d.offset === dayOffset)?.label.toLowerCase() || 'today';

        return (
          <>
            {/* Past days (yesterday): show all cards directly — no toggle needed */}
            {isPast && (
              <div className={styles.todayCarouselWrapper}>
                <div className={styles.todayCarousel} ref={scrollRef}>
                  {cards}
                </div>
              </div>
            )}

            {/* Today/Tomorrow: toggle logic for ended meetings */}
            {!isPast && (
              <>
                {/* When all meetings have ended and not yet showing them */}
                {allEnded && !showEnded && (
                  <div className={styles.todayCarouselWrapper}>
                    <button
                      className={styles.endedToggleBtn}
                      onClick={() => setShowEnded(true)}
                      title={`Show ${endedCount} ended meeting${endedCount > 1 ? 's' : ''}`}
                    >
                      <Icon name="history" size={16} />
                      <span className={styles.endedToggleLabel}>
                        Show {endedCount} ended
                      </span>
                      <span className={styles.endedArrowDesktop}><Icon name="chevron_right" size={18} /></span>
                      <span className={styles.endedArrowMobile}><Icon name="expand_more" size={18} /></span>
                    </button>
                    <div className={styles.todayAllEnded}>
                      <Icon name="event_available" size={24} />
                      <div className={styles.todayAllEndedText}>
                        <strong>No more meetings {dayLabel}</strong>
                        <span>All {endedCount} meeting{endedCount > 1 ? 's have' : ' has'} ended</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Carousel — shown when there are upcoming meetings OR ended meetings toggled visible */}
                {(!allEnded || showEnded) && (
                  <div className={styles.todayCarouselWrapper}>
                    {/* Toggle button for ended meetings — only when there are also upcoming ones */}
                    {endedCount > 0 && !allEnded && (
                      <button
                        className={styles.endedToggleBtn}
                        onClick={() => setShowEnded(prev => !prev)}
                        title={`${showEnded ? 'Hide' : 'Show'} ${endedCount} ended meeting${endedCount > 1 ? 's' : ''}`}
                      >
                        <Icon name={showEnded ? 'visibility_off' : 'history'} size={16} />
                        <span className={styles.endedToggleLabel}>
                          {showEnded ? 'Hide' : 'Show'} {endedCount} ended meeting{endedCount > 1 ? 's' : ''}
                        </span>
                        <span className={styles.endedArrowDesktop}><Icon name={showEnded ? 'chevron_left' : 'chevron_right'} size={18} /></span>
                        <span className={styles.endedArrowMobile}><Icon name={showEnded ? 'expand_less' : 'expand_more'} size={18} /></span>
                      </button>
                    )}
                    {/* Hide button when showing all ended */}
                    {allEnded && showEnded && (
                      <button
                        className={styles.endedToggleBtn}
                        onClick={() => setShowEnded(false)}
                        title="Hide ended meetings"
                      >
                        <Icon name="visibility_off" size={16} />
                        <span className={styles.endedArrowDesktop}><Icon name="chevron_left" size={18} /></span>
                        <span className={styles.endedArrowMobile}><Icon name="expand_less" size={18} /></span>
                      </button>
                    )}

                    <div
                      className={`${styles.todayCarousel} ${!showEnded ? styles.todayCarouselHideEnded : ''}`}
                      ref={scrollRef}
                    >
                      {cards}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        );
      })()}
    </>
  );
}

function AgendaView({ timezone, meetingsList, onSelect, onDownload }) {
  const now = new Date();
  const [showAll, setShowAll] = useState(false);
  const events = useMemo(
    () => generateCalendarEvents(meetingsList, zonedStartOfDay(now, timezone), zonedEndOfDay(addDays(now, 60), timezone), timezone)
      .filter(e => isAfter(e.utcStart, now))
      .sort((a, b) => a.utcStart - b.utcStart),
    [timezone, meetingsList],
  );

  // Group by day in selected timezone
  const grouped = useMemo(() => {
    const map = new Map();
    events.forEach(ev => {
      const key = formatInTimeZone(ev.utcStart, timezone, 'yyyy-MM-dd');
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(ev);
    });
    return map;
  }, [events, timezone]);

  const allEntries = Array.from(grouped.entries());
  const visibleEntries = showAll ? allEntries : allEntries.slice(0, 14);
  const hasMore = allEntries.length > 14;

  if (events.length === 0) {
    return <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--om-dimmed)' }}>No upcoming meetings match this filter.</div>;
  }

  return (
    <div>
      {visibleEntries.map(([dateKey, dayEvents]) => {
        const todayKey = formatInTimeZone(now, timezone, 'yyyy-MM-dd');
        const isDayToday = dateKey === todayKey;
        return (
          <div key={dateKey}>
            <div className={`${styles.dayHeader} ${isDayToday ? styles.dayHeaderToday : ''}`}>
              <Icon name={isDayToday ? 'today' : 'event'} size={16} />
              {isDayToday && 'Today \u2014 '}
              {formatInTimeZone(dayEvents[0].utcStart, timezone, 'EEEE, d MMMM yyyy')}
              <span style={{ fontSize: 11, color: 'var(--om-dimmed)' }}>({dayEvents.length})</span>
            </div>
            {dayEvents.map((ev, i) => {
              const isLive = isBefore(ev.utcStart, now) && isAfter(ev.utcEnd, now);
              const isEnded = isBefore(ev.utcEnd, now);
              const countdown = !isLive && !isEnded ? getShortCountdown(ev.utcStart) : null;
              const freq = getFrequencyLabel(ev);

              return (
                <div key={`${ev.id}-${i}`} className={styles.meetingRow} onClick={() => onSelect(ev)} role="button" tabIndex={0}>
                  <div className={styles.rowTime}>
                    {formatInTimeZone(ev.utcStart, timezone, 'HH:mm')}
                  </div>
                  <div>
                    <div className={styles.rowTitle}>
                      {ev.icon && <Icon name={ev.icon} size={16} />}
                      {ev.priority === 'highlight' && <Icon name="diamond" size={15} className={styles.priorityDiamond} />}
                      {ev.priority === 'featured' && <Icon name="star" size={15} className={styles.priorityStar} />}
                      {ev.title}
                    </div>
                    <div className={styles.rowMeta}>
                      {freq && <><Icon name="repeat" size={13} /> {freq}</>}
                      {freq && <span>&middot;</span>}
                      <span className={styles.contactAvatars}>
                        {getContacts(ev.contact).map((c, ci) => (
                          c.github ? (
                            <img key={ci} src={`https://github.com/${c.github}.png`} alt={c.name} className={styles.miniAvatar} title={c.name}
                              onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = ''; }}
                            />
                          ) : null
                        ))}
                        {getContacts(ev.contact).map((c, ci) => (
                          <span key={`i${ci}`} className={styles.miniAvatarText} title={c.name} style={c.github ? { display: 'none' } : undefined}>{getContactInitials(c)}</span>
                        ))}
                      </span>
                      {ev.sessionLink && <><span>&middot;</span><PlatformBadge link={ev.sessionLink} /></>}
                    </div>
                  </div>
                  <span className={`${styles.badge} ${getCategoryBadgeClass(ev.category)}`}>
                    {CATEGORY_LABELS[ev.category]}
                  </span>
                  <span>
                    {isLive && <span className={`${styles.badge} ${styles.badgeLive}`}><span className={styles.dot} /> Live</span>}
                    {isEnded && <span className={`${styles.badge} ${styles.badgeEnded}`}><Icon name="check_circle" size={12} /></span>}
                    {countdown && <span className={`${styles.badge} ${styles.badgeCountdown}`}><Icon name="hourglass_top" size={12} /> {countdown}</span>}
                    <HolidayBadge event={ev} />
                  </span>
                  <div className={styles.rowActions}>
                    {ev.sessionLink && !isEnded && (
                      <a href={ev.sessionLink} target="_blank" rel="noopener noreferrer"
                         className={`${styles.btn} ${isLive ? styles.btnPrimary : styles.btnSecondary}`}
                         style={{ fontSize: 12, padding: '5px 14px' }}
                         onClick={e => e.stopPropagation()}>
                        <Icon name="videocam" size={16} /> {getPlatformShort(detectPlatform(ev.sessionLink)) || 'Join'}
                      </a>
                    )}
                    <button
                       className={`${styles.btn} ${styles.btnSecondary}`}
                       style={{ fontSize: 12, padding: '5px 10px' }}
                       onClick={e => { e.stopPropagation(); onDownload(ev); }}>
                      <Icon name="download" size={16} />
                    </button>
                    <button className={`${styles.btn} ${styles.btnGhost}`}
                            onClick={e => { e.stopPropagation(); onSelect(ev); }}>
                      <Icon name="more_horiz" size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {hasMore && !showAll && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowAll(true)}>
            <Icon name="expand_more" size={18} /> Show more meetings ({allEntries.length - 14} more days)
          </button>
        </div>
      )}
      {showAll && hasMore && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowAll(false)}>
            <Icon name="expand_less" size={18} /> Show less
          </button>
        </div>
      )}
    </div>
  );
}

function AllMeetingsView({ timezone, meetingsList, onSelect, onDownload }) {
  const sorted = useMemo(
    () => [...meetingsList].sort((a, b) => {
        const pa = a.priority === 'highlight' ? 0 : a.priority === 'featured' ? 1 : 2;
        const pb = b.priority === 'highlight' ? 0 : b.priority === 'featured' ? 1 : 2;
        return pa - pb;
      }),
    [meetingsList],
  );

  if (sorted.length === 0) {
    return <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--om-dimmed)' }}>No meetings match your search.</div>;
  }

  return (
    <div className={styles.cardGrid}>
      {sorted.map(meeting => {
        const next = getNextOccurrence(meeting, timezone);
        let cardClass = styles.meetingCard;
        if (meeting.priority === 'highlight') cardClass += ` ${styles.cardHighlight}`;
        else if (meeting.priority === 'featured') cardClass += ` ${styles.cardFeatured}`;

        return (
          <div key={meeting.id} className={cardClass} onClick={() => onSelect(meeting)} role="button" tabIndex={0}>
            <ShareButton meetingId={meeting.id} floating />
            {meeting.icon && (
              <div className={styles.cardIconHero}>
                <Icon name={meeting.icon} size={36} />
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span className={`${styles.badge} ${getCategoryBadgeClass(meeting.category)}`}>
                {CATEGORY_LABELS[meeting.category]}
              </span>
              {meeting.priority === 'highlight' && <span className={`${styles.badge} ${styles.badgeHighlight}`}><Icon name="diamond" size={13} /> Highlight</span>}
              {meeting.priority === 'featured' && <span className={`${styles.badge} ${styles.badgeFeatured}`}><Icon name="star" size={13} /> Featured</span>}
            </div>
            <div className={styles.meetingCardTitle}>
              {meeting.title}
            </div>
            <div className={styles.meetingCardBody}>
            <div className={styles.cardSchedule}>
              <Icon name="repeat" size={14} /> {getScheduleDescription(meeting, timezone)}
              {meeting.sessionLink && <PlatformBadge link={meeting.sessionLink} />}
            </div>
            {next && (
              <div className={styles.cardNext}>
                <Icon name="event_upcoming" size={14} /> Next: {formatInTimeZone(next.utcStart, timezone, 'EEE, d MMM · HH:mm')} {getTimezoneAbbreviation(next.utcStart, timezone)}
              </div>
            )}
            {next?.holidayInfo?.status === 'holiday' && (
              <div className={styles.holidayAlert}>
                <Icon name="celebration" size={14} />
                <HolidayAlertText holidays={next.holidayInfo.holidays} />
              </div>
            )}
            {next?.holidayInfo?.status === 'skipped' && (
              <div className={styles.holidayAlertSkipped}>
                <Icon name="event_busy" size={14} />
                <span>Next occurrence has been <strong>cancelled</strong></span>
              </div>
            )}
            <div className={styles.cardDesc}>{meeting.description}</div>
            {meeting.additionalLinks?.length > 0 && (
              <div className={styles.cardLinks}>
                {meeting.additionalLinks.slice(0, 3).map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                     className={styles.linkChip} onClick={e => e.stopPropagation()}>
                    <Icon name="open_in_new" size={14} /> {link.title}
                  </a>
                ))}
                {meeting.additionalLinks.length > 3 && (
                  <span className={styles.linkChip}>+{meeting.additionalLinks.length - 3} more</span>
                )}
              </div>
            )}
            </div>
            <div className={styles.cardContact}>
              {getContacts(meeting.contact).map((c, ci) => (
                c.github ? (
                  <img key={ci} src={`https://github.com/${c.github}.png`} alt={c.name} className={styles.miniAvatar} title={c.name}
                    onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = ''; }}
                  />
                ) : null
              ))}
              {getContacts(meeting.contact).map((c, ci) => (
                <span key={`i${ci}`} className={styles.miniAvatarText} title={c.name} style={c.github ? { display: 'none' } : undefined}>{getContactInitials(c)}</span>
              ))}
              <strong>{getContacts(meeting.contact).length === 1
                ? getContactDisplay(meeting.contact)
                : getContacts(meeting.contact).map(c => c.name?.split(' ')[0]).join(', ')}</strong>
            </div>
            <div className={styles.cardActions}>
              {isOnDemand(meeting) ? (
                <a href={getRequestMailto(meeting)}
                   className={`${styles.btn} ${styles.btnPrimary}`} onClick={e => e.stopPropagation()}>
                  <Icon name="mail" size={16} /> Request Meeting
                </a>
              ) : meeting.sessionLink && (
                <a href={meeting.sessionLink} target="_blank" rel="noopener noreferrer"
                   className={`${styles.btn} ${styles.btnPrimary}`} onClick={e => e.stopPropagation()}>
                  <Icon name="videocam" size={16} /> {getPlatformShort(detectPlatform(meeting.sessionLink)) ? `Join ${getPlatformShort(detectPlatform(meeting.sessionLink))}` : 'Join Meeting'}
                </a>
              )}
              {!isOnDemand(meeting) && next && (
                <button
                   className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => { e.stopPropagation(); onDownload(meeting); }}>
                  <Icon name="download" size={16} /> .ics
                </button>
              )}
              {getMatrixChatUrl(meeting) && (
                <a href={getMatrixChatUrl(meeting)} target="_blank" rel="noopener noreferrer"
                   className={`${styles.btn} ${styles.btnSecondary}`} onClick={e => e.stopPropagation()}>
                  <Icon name="chat" size={16} /> Chat
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({ timezone, meetingsList, onSelect }) {
  const [month, setMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const monthStart = startOfMonth(month);
  const events = useMemo(
    () => generateCalendarEvents(meetingsList, startOfMonth(addMonths(month, -1)), endOfMonth(addMonths(month, 1)), timezone),
    [month, timezone, meetingsList],
  );

  // Build 6-week grid
  const weeks = useMemo(() => {
    const result = [];
    let weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const day = addDays(weekStart, w * 7 + d);
        const dayEvents = events.filter(e => isSameDay(e.start, day));
        week.push({ date: day, events: dayEvents, isCurrentMonth: day.getMonth() === month.getMonth() });
      }
      result.push(week);
    }
    return result;
  }, [monthStart, events, month]);

  // Events for the selected day
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return events.filter(e => isSameDay(e.start, selectedDay)).sort((a, b) => a.utcStart - b.utcStart);
  }, [selectedDay, events]);

  const handleCellClick = (date, dayEvents) => {
    if (selectedDay && isSameDay(selectedDay, date)) {
      setSelectedDay(null);
    } else if (dayEvents.length > 0) {
      setSelectedDay(date);
    }
  };

  const getCategoryDotClass = (ev) => {
    if (ev.priority === 'highlight') return styles.dotHighlight;
    if (ev.category === 'general') return styles.dotGeneral;
    if (ev.category === 'product') return styles.dotProduct;
    return styles.dotOnetime;
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div>
      <div className={styles.calNav}>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => { setMonth(m => addMonths(m, -1)); setSelectedDay(null); }}><Icon name="chevron_left" /></button>
        <span className={styles.calNavLabel}>{format(month, 'MMMM yyyy')}</span>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => { setMonth(m => addMonths(m, 1)); setSelectedDay(null); }}><Icon name="chevron_right" /></button>
      </div>
      <div className={styles.calGrid}>
        {dayNames.map(d => <div key={d} className={styles.calDayName}>{d}</div>)}
        {weeks.flat().map(({ date, events: dayEvents, isCurrentMonth }, i) => {
          const isToday = isSameDay(date, new Date());
          const isSelected = selectedDay && isSameDay(selectedDay, date);
          let cellClass = styles.calCell;
          if (isToday) cellClass += ` ${styles.calCellToday}`;
          if (!isCurrentMonth) cellClass += ` ${styles.calCellOther}`;
          if (isSelected) cellClass += ` ${styles.calCellSelected}`;

          return (
            <div key={i} className={cellClass} onClick={() => handleCellClick(date, dayEvents)}>
              <div className={styles.cellDate}>{format(date, 'd')}</div>
              {/* Full event titles — visible on desktop */}
              {dayEvents.slice(0, 3).map((ev, j) => {
                let evClass = styles.calEvent;
                if (ev.holidayInfo) evClass += ` ${styles.calEventHoliday}`;
                else if (ev.priority === 'highlight') evClass += ` ${styles.calEventHighlight}`;
                else if (ev.category === 'general') evClass += ` ${styles.calEventGeneral}`;
                else if (ev.category === 'product') evClass += ` ${styles.calEventProduct}`;
                else evClass += ` ${styles.calEventOnetime}`;
                return (
                  <div key={j} className={evClass} onClick={(e) => { e.stopPropagation(); onSelect(ev); }} title={ev.holidayInfo ? `⚠️ ${(ev.holidayInfo.holidays || []).map(h => h.name).join(', ')} — ${ev.title}` : ev.title}>
                    {ev.holidayInfo && '⚠️ '}{ev.title}
                  </div>
                );
              })}
              {dayEvents.length > 3 && (
                <div className={styles.calEventMore}>+{dayEvents.length - 3}</div>
              )}
              {/* Dots — visible on mobile only */}
              {dayEvents.length > 0 && (
                <div className={styles.calDots}>
                  {dayEvents.slice(0, 4).map((ev, j) => (
                    <span key={j} className={`${styles.calDot} ${getCategoryDotClass(ev)}`} />
                  ))}
                  {dayEvents.length > 4 && <span className={styles.calDotMore}>+{dayEvents.length - 4}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day panel — meetings list below calendar */}
      {selectedDay && selectedDayEvents.length > 0 && (
        <div className={styles.calDayPanel}>
          <div className={styles.calDayPanelHeader}>
            <Icon name="event" size={16} />
            <span>{format(selectedDay, 'EEEE, d MMMM yyyy')}</span>
            <span className={styles.calDayPanelCount}>{selectedDayEvents.length}</span>
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setSelectedDay(null)} style={{ marginLeft: 'auto' }}>
              <Icon name="close" size={16} />
            </button>
          </div>
          {selectedDayEvents.map((ev, i) => {
            let evDotClass = getCategoryDotClass(ev);
            return (
              <div key={`${ev.id}-${i}`} className={styles.calDayPanelItem} onClick={() => onSelect(ev)} role="button" tabIndex={0}>
                <span className={`${styles.calDot} ${evDotClass}`} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={styles.calDayPanelTitle}>{ev.title}</div>
                  <div className={styles.calDayPanelMeta}>
                    <Icon name="schedule" size={13} />
                    {formatInTimeZone(ev.utcStart, timezone, 'HH:mm')} – {formatInTimeZone(ev.utcEnd, timezone, 'HH:mm')}
                    {ev.sessionLink && <PlatformBadge link={ev.sessionLink} />}
                    <HolidayBadge event={ev} />
                  </div>
                </div>
                <Icon name="chevron_right" size={18} className={styles.calDayPanelArrow} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CalendarConfigurator({ meeting, timezone: hubTimezone, allMeetings, onClose }) {
  const [selectedId, setSelectedId] = useState(meeting?.id || allMeetings[0]?.id);
  const [localTz, setLocalTz] = useState(hubTimezone);
  const [recurring, setRecurring] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const selected = allMeetings.find(m => m.id === selectedId) || allMeetings[0];
  const isRecurringMeeting = selected?.recurrence && selected.recurrence.frequency !== 'once';
  const platform = detectPlatform(selected?.sessionLink);
  const hasDST_tz = isDST(localTz);

  // Sync when meeting prop changes
  useEffect(() => {
    if (meeting?.id) setSelectedId(meeting.id);
  }, [meeting?.id]);

  // Reset recurring when switching meetings
  useEffect(() => {
    setRecurring(isRecurringMeeting);
  }, [selectedId, isRecurringMeeting]);

  // Close on Escape
  useEffect(() => {
    if (!meeting) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [meeting, onClose]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  // Lock body scroll
  useEffect(() => {
    if (meeting) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [meeting]);

  if (!meeting) return null;

  const handleDownload = () => {
    downloadICS(selected, localTz, recurring && isRecurringMeeting);
  };



  const getSchedulePreview = () => {
    if (!selected?.recurrence) return 'On-demand';
    return getScheduleDescription(selected, localTz);
  };

  const getCategoryIconName = (category) => {
    if (category === 'general') return 'groups';
    if (category === 'product') return 'inventory_2';
    return 'event';
  };

  const getFreqDesc = () => {
    if (!isRecurringMeeting) return '';
    const rec = selected.recurrence;
    const days = (rec.daysOfWeek || []).map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
    const interval = rec.interval || 1;
    if (interval === 1) return `Repeats every week on ${days}`;
    return `Repeats every ${interval} weeks on ${days}`;
  };

  return (
    <>
      <div
        className={`${styles.ccOverlay} ${styles.ccOverlayOpen}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={styles.ccWrap}>
        <div
          className={styles.ccModal}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Calendar Configurator"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.ccHeader}>
            <h2 className={styles.ccHeaderTitle}>
              <Icon name="event_note" size={22} className={styles.ccAccentIcon} />
              Calendar Configurator
            </h2>
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
          <p className={styles.ccSubtitle}>
            Configure your calendar event and download an .ics file for your calendar.
          </p>

          <div className={styles.ccBody}>
            {/* 1. Meeting selector */}
            <div className={styles.ccField}>
              <div className={styles.ccFieldLabel}>
                <Icon name="groups" size={15} /> Meeting
              </div>
              <div className={styles.ccMeetingSelector} ref={dropdownRef}>
                <div
                  className={`${styles.ccMeetingSelected} ${dropdownOpen ? styles.ccMeetingSelectedActive : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={`${styles.ccMeetingIconBox} ${styles['ccCat_' + (selected?.category || 'general')]}`}>
                    <Icon name={getCategoryIconName(selected?.category)} size={20} />
                  </div>
                  <div className={styles.ccMeetingInfo}>
                    <div className={styles.ccMeetingName}>{selected?.title}</div>
                    <div className={styles.ccMeetingMeta}>
                      <span>{CATEGORY_LABELS[selected?.category] || 'General'}</span>
                      <span className={styles.ccMetaDot} />
                      <span>{getFrequencyLabel(selected) || 'One-time'}</span>
                    </div>
                  </div>
                  <Icon name="expand_more" className={`${styles.ccChevron} ${dropdownOpen ? styles.ccChevronOpen : ''}`} />
                </div>

                {dropdownOpen && (
                  <div className={styles.ccDropdown}>
                    {allMeetings.filter(m => m.recurrence).map(m => (
                      <div
                        key={m.id}
                        className={`${styles.ccDropdownItem} ${m.id === selectedId ? styles.ccDropdownItemSelected : ''}`}
                        onClick={() => { setSelectedId(m.id); setDropdownOpen(false); }}
                      >
                        <div className={`${styles.ccMeetingIconBox} ${styles.ccMeetingIconBoxSm} ${styles['ccCat_' + m.category]}`}>
                          <Icon name={getCategoryIconName(m.category)} size={16} />
                        </div>
                        <div className={styles.ccMeetingInfo}>
                          <div className={styles.ccMeetingNameSm}>{m.title}</div>
                          <div className={styles.ccMeetingMetaSm}>
                            <span>{CATEGORY_LABELS[m.category]}</span>
                            <span className={styles.ccMetaDot} />
                            <span>{getFrequencyLabel(m) || 'One-time'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Timezone selector */}
            <div className={styles.ccField}>
              <div className={styles.ccFieldLabel}>
                <Icon name="language" size={15} /> Timezone
              </div>
              <div className={styles.tzSelectWrap}>
                <select
                  className={styles.ccTzSelect}
                  value={localTz}
                  onChange={e => setLocalTz(e.target.value)}
                  aria-label="Select timezone"
                >
                  {TIMEZONES.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Time preview */}
            <div className={styles.ccTimePreview}>
              <div className={styles.ccTimePreviewIcon}>
                <Icon name="schedule" size={22} />
              </div>
              <div className={styles.ccTimePreviewText}>
                <div className={styles.ccTimePreviewLabel}>Meeting time in your timezone</div>
                <div className={styles.ccTimePreviewValue}>{getSchedulePreview()}</div>
                {hasDST_tz && (
                  <div className={styles.ccDstBadge}>
                    <Icon name="wb_sunny" size={13} /> Auto-adjusts for DST
                  </div>
                )}
              </div>
            </div>

            {/* 4. Recurring toggle (only for recurring meetings) */}
            {isRecurringMeeting && (
              <div className={styles.ccField}>
                <div className={styles.ccFieldLabel}>
                  <Icon name="repeat" size={15} /> Recurrence
                </div>
                <div className={styles.ccToggleRow}>
                  <div className={styles.ccToggleRowLeft}>
                    <Icon name="event_repeat" size={18} className={styles.ccAccentIcon} />
                    <div>
                      <div className={styles.ccToggleLabel}>Make it recurring</div>
                      <div className={styles.ccToggleDesc}>{getFreqDesc()}</div>
                    </div>
                  </div>
                  <div
                    className={`${styles.ccToggleSwitch} ${recurring ? styles.ccToggleSwitchActive : ''}`}
                    onClick={() => setRecurring(!recurring)}
                    role="switch"
                    aria-checked={recurring}
                    tabIndex={0}
                  >
                    <div className={styles.ccToggleKnob} />
                  </div>
                </div>
                <div className={`${styles.ccRecurringDetail} ${recurring ? styles.ccRecurringDetailShow : ''}`}>
                  <Icon name="info" size={16} />
                  <span>Calendar will include an <strong>RRULE</strong> so your calendar app keeps the meeting going indefinitely with automatic DST adjustment.</span>
                </div>
              </div>
            )}

            {/* 5. Meeting link preview */}
            {selected?.sessionLink && (
              <div className={styles.ccField}>
                <div className={styles.ccFieldLabel}>
                  <Icon name="videocam" size={15} /> Meeting link (embedded in .ics)
                </div>
                <div className={styles.ccLinkPreview}>
                  <div className={`${styles.ccLinkIconBox} ${platform === 'zoom' ? styles.ccLinkZoom : styles.ccLinkTeams}`}>
                    <Icon name="videocam" size={18} />
                  </div>
                  <div className={styles.ccLinkInfo}>
                    <div className={styles.ccLinkPlatform}>{getPlatformLabel(platform)}</div>
                    <div className={styles.ccLinkUrl}>{selected.sessionLink}</div>
                  </div>
                  <span className={styles.ccLinkCheck}>
                    <Icon name="check_circle" size={18} />
                  </span>
                </div>
              </div>
            )}

            <div className={styles.ccDivider} />

            {/* 6. Add to calendar */}
            <div className={styles.ccField}>
              <div className={styles.ccFieldLabel}>
                <Icon name="calendar_month" size={15} /> Add to your calendar
              </div>
              <div className={styles.ccCalendarOptions}>
                <button className={styles.ccCalendarBtn} onClick={handleDownload}>
                  <span className={styles.ccCalendarBtnIcon} style={{ background: 'var(--om-orange-dim)' }}>
                    <Icon name="download" size={18} style={{ color: 'var(--om-orange)' }} />
                  </span>
                  <span className={styles.ccCalendarBtnText}>
                    <strong>Download .ics</strong>
                    <span>Outlook, Apple Calendar, Google Calendar, etc.</span>
                  </span>
                  <Icon name="chevron_right" size={14} className={styles.ccCalendarBtnArrow} />
                </button>
              </div>
            </div>

            {/* Footer hint */}
            <div className={styles.ccFooter}>
              <div className={styles.ccFooterHint}>
                <Icon name="info" size={14} /> The .ics file includes the meeting link, timezone, and recurrence settings.
              </div>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MeetingDrawer({ meeting, timezone, onClose, onDownload }) {
  const drawerRef = useRef(null);
  const next = meeting ? getNextOccurrence(meeting, timezone) : null;

  // Close on Escape
  useEffect(() => {
    if (!meeting) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [meeting, onClose]);

  // Trap scroll
  useEffect(() => {
    if (meeting) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [meeting]);

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${meeting ? styles.drawerOverlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.drawer} ${meeting ? styles.drawerOpen : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={meeting?.title || 'Meeting details'}
      >
        {meeting && (
          <>
            <div className={styles.drawerContent}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className={`${styles.badge} ${getCategoryBadgeClass(meeting.category)}`}>
                    {CATEGORY_LABELS[meeting.category]}
                  </span>
                  {meeting.priority && (
                    <span className={`${styles.drawerPriority} ${meeting.priority === 'highlight' ? styles.drawerPriorityHighlight : styles.drawerPriorityFeatured}`}
                          style={{ marginLeft: 6 }}>
                      {meeting.priority === 'highlight' ? <><Icon name="diamond" size={13} /> Highlight</> : <><Icon name="star" size={13} /> Featured</>}
                    </span>
                  )}
                </div>
                <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose} aria-label="Close"><Icon name="close" /></button>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--om-fg)', marginTop: 16, marginBottom: 4 }}>{meeting.icon && <Icon name={meeting.icon} size={22} />} {meeting.title}</h2>
              <p style={{ fontSize: 14, color: 'var(--om-muted)', lineHeight: 1.65, marginBottom: 0 }}>{meeting.description}</p>

              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionTitle}><Icon name="event" size={15} /> Schedule</div>
                <div className={styles.scheduleInfo}>
                  <div className={styles.scheduleRow}>
                    <Icon name="repeat" size={16} />
                    <span>{getScheduleDescription(meeting, timezone)}</span>
                    {meeting.sessionLink && <PlatformBadge link={meeting.sessionLink} />}
                  </div>
                  {next && (
                    <div className={`${styles.scheduleRow} ${styles.scheduleRowNext}`}>
                      <Icon name="event_upcoming" size={16} />
                      <span>Next: {formatInTimeZone(next.utcStart, timezone, 'EEE, d MMM yyyy · HH:mm')} {getTimezoneAbbreviation(next.utcStart, timezone)}</span>
                    </div>
                  )}
                  {next?.holidayInfo?.status === 'holiday' && (
                    <div className={styles.holidayAlert}>
                      <Icon name="celebration" size={14} />
                      <HolidayAlertText holidays={next.holidayInfo.holidays} />
                    </div>
                  )}
                  {next?.holidayInfo?.status === 'skipped' && (
                    <div className={styles.holidayAlertSkipped}>
                      <Icon name="event_busy" size={14} />
                      <span>Next occurrence has been <strong>cancelled</strong></span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionTitle}><Icon name="person" size={15} /> {getContacts(meeting.contact).length > 1 ? 'Contacts' : 'Contact'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {getContacts(meeting.contact).map((c, ci) => (
                    <div key={ci} className={styles.drawerContactCard}>
                      {c.github ? (
                        <img src={`https://github.com/${c.github}.png`} alt="" className={styles.avatarImg}
                          onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = ''; }}
                        />
                      ) : null}
                      <span className={styles.avatar} style={c.github ? { display: 'none' } : undefined}>{getContactInitials(c)}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--om-fg)' }}>{c.name || getContactDisplay(c)}</div>
                        {c.title && <div style={{ fontSize: 12, color: 'var(--om-dimmed)', marginBottom: 2 }}>{c.title}</div>}
                        <a href={`mailto:${c.email}`} style={{ fontSize: 12, color: 'var(--om-muted)' }}>
                          {c.email}
                        </a>
                        <div className={styles.contactSocials}>
                          {c.github && (
                            <a href={`https://github.com/${c.github}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">
                              <img src="https://cdn.simpleicons.org/github/888" alt="GitHub" width="14" height="14" />
                              <span>{c.github}</span>
                            </a>
                          )}
                          {c.linkedin && (
                            <a href={`https://www.linkedin.com/in/${c.linkedin}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">
                              <img src="https://cdn.simpleicons.org/linkedin/0A66C2" alt="LinkedIn" width="14" height="14" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {meeting.additionalLinks?.length > 0 && (
                <div className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}><Icon name="link" size={15} /> Links</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {meeting.additionalLinks.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.drawerLink}>
                        <Icon name="open_in_new" size={18} />
                        <span>{link.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.drawerActions}>
              {isOnDemand(meeting) ? (
                <a href={getRequestMailto(meeting)}
                   className={`${styles.btn} ${styles.btnPrimary}`} style={{ justifyContent: 'center' }}>
                  <Icon name="mail" size={16} /> Request Meeting
                </a>
              ) : meeting.sessionLink && (
                <a href={meeting.sessionLink} target="_blank" rel="noopener noreferrer"
                   className={`${styles.btn} ${styles.btnPrimary}`} style={{ justifyContent: 'center' }}>
                  <Icon name="videocam" size={16} /> {getPlatformShort(detectPlatform(meeting.sessionLink)) ? `Join ${getPlatformShort(detectPlatform(meeting.sessionLink))}` : 'Join Meeting'}
                </a>
              )}
              {!isOnDemand(meeting) && next && (
                <button
                   className={`${styles.btn} ${styles.btnSecondary}`} style={{ justifyContent: 'center' }}
                   onClick={() => onDownload(meeting)}>
                  <Icon name="download" size={16} /> Add to Calendar (.ics)
                </button>
              )}
              {getMatrixChatUrl(meeting) && (
                <a href={getMatrixChatUrl(meeting)} target="_blank" rel="noopener noreferrer"
                   className={`${styles.btn} ${styles.btnSecondary}`} style={{ justifyContent: 'center' }}>
                  <Icon name="chat" size={16} /> Matrix Chat
                </a>
              )}
              <ShareButton meetingId={meeting.id} label="Copy Share Link" style={{ justifyContent: 'center' }} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ──────────────────────────── Main Hub ────────────────────────────

function MeetingsHubInner() {
  const [timezone, setTimezone] = useState(detectTimezone);
  const [view, setView] = useState('featured');
  const [drawerMeeting, setDrawerMeeting] = useState(null);
  const [configuratorMeeting, setConfiguratorMeeting] = useState(null);

  // Sync timezone with old components via custom event
  const handleTimezoneChange = useCallback((tz) => {
    setTimezone(tz);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timezoneChange', { detail: { timezone: tz } }));
    }
  }, []);

  const openDrawer = useCallback((meetingOrEvent) => {
    // If it's a calendar event, find the original meeting
    const meeting = meetingOrEvent.recurrence
      ? meetingOrEvent
      : meetings.find(m => m.id === meetingOrEvent.id) || meetingOrEvent;
    setDrawerMeeting(meeting);
    if (meeting?.id && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${meeting.id}`);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerMeeting(null);
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const openConfigurator = useCallback((meetingOrEvent) => {
    const meeting = meetingOrEvent.recurrence
      ? meetingOrEvent
      : meetings.find(m => m.id === meetingOrEvent.id) || meetingOrEvent;
    setConfiguratorMeeting(meeting);
  }, []);

  const closeConfigurator = useCallback(() => {
    setConfiguratorMeeting(null);
  }, []);

  // Open meeting from URL hash on mount and on hash change
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      const meeting = meetings.find(m => m.id === hash);
      if (meeting) {
        setDrawerMeeting(meeting);
      }
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  // Separate meetings by priority
  const highlightMeetings = useMemo(() => meetings.filter(m => m.priority === MEETING_PRIORITIES.HIGHLIGHT), []);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Helper: match meeting against search
  const matchesSearch = useCallback((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      (m.description && m.description.toLowerCase().includes(q)) ||
      (m.category && m.category.toLowerCase().includes(q)) ||
      (typeof m.contact === 'string' && m.contact.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Featured: only meetings with 'featured' priority (highlights are in the hero, not here)
  const featuredMeetings = useMemo(() =>
    meetings.filter(m => m.priority === MEETING_PRIORITIES.FEATURED)
      .filter(matchesSearch),
    [matchesSearch],
  );

  // Non-featured meetings filtered by category + search (highlights fall into their category)
  const productMeetings = useMemo(() =>
    meetings.filter(m => m.category === MEETING_CATEGORIES.PRODUCT && m.priority !== MEETING_PRIORITIES.FEATURED)
      .filter(matchesSearch),
    [matchesSearch],
  );
  const eventMeetings = useMemo(() =>
    meetings.filter(m => m.category === MEETING_CATEGORIES.ONE_TIME && m.priority !== MEETING_PRIORITIES.FEATURED)
      .filter(matchesSearch),
    [matchesSearch],
  );
  const otherMeetings = useMemo(() =>
    meetings.filter(m => m.category === MEETING_CATEGORIES.GENERAL && m.priority !== MEETING_PRIORITIES.FEATURED)
      .filter(matchesSearch),
    [matchesSearch],
  );

  // All meetings for agenda/calendar (filtered by search only)
  const allFilteredMeetings = useMemo(() =>
    meetings.filter(matchesSearch),
    [matchesSearch],
  );

  // Counts for tab badges
  const tabCounts = useMemo(() => ({
    featured: featuredMeetings.length,
    products: productMeetings.length,
    events: eventMeetings.length,
    others: otherMeetings.length,
  }), [featuredMeetings, productMeetings, eventMeetings, otherMeetings]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
      </Head>

      {/* Page header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        justifyContent="space-between"
        spacing={{ xs: 2, md: 4 }}
        sx={{ py: { xs: '20px', md: '32px' }, pb: { xs: '16px', md: '24px' }, borderBottom: '1px solid var(--om-border)' }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <Icon name="groups" size={32} className={styles.pageTitleIcon} />
            <Typography variant="h1" sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800, color: 'var(--om-fg)', m: 0, letterSpacing: '-0.3px' }}>
              Open Meetings
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontSize: { xs: 13, md: 14 }, color: 'var(--om-muted)', lineHeight: 1.55, maxWidth: 640, mb: 1.5 }}>
            Dedicated sync meetings for specific products, community office hours, and open planning sessions.
            Everyone is welcome to join.
          </Typography>
          <a href="/community/intro#how-to-create-open-meetings" className={styles.pageHeaderLink}>
            <Icon name="add_circle_outline" size={16} /> How to add a meeting
          </a>
        </Box>
        <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 'auto' } }}>
          <TimezoneBar timezone={timezone} onTimezoneChange={handleTimezoneChange} />
        </Box>
      </Stack>

      {/* Highlight hero(es) — always visible */}
      {highlightMeetings.length > 0 && (
        <>
          <div className={styles.sectionLabel}>
            <div className={styles.sectionTitle}><Icon name="auto_awesome" size={14} /> Don&apos;t miss</div>
            <div className={styles.sectionDesc}>Don&apos;t miss out on these key opportunities to connect, learn, and contribute.</div>
          </div>
          {highlightMeetings.map(m => (
            <HighlightHero key={m.id} meeting={m} timezone={timezone} onSelect={openDrawer} onDownload={openConfigurator} />
          ))}
        </>
      )}

      {/* Today — always visible */}
      <TodaySection timezone={timezone} onSelect={openDrawer} onDownload={openConfigurator} />

      {/* Search bar */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search meetings by name, description, or contact..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        sx={{
          mt: '20px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            bgcolor: 'var(--om-surface)',
            fontSize: 14,
            fontFamily: 'inherit',
            color: 'var(--om-fg)',
            '& fieldset': { borderColor: 'var(--om-border)' },
            '&:hover fieldset': { borderColor: 'var(--om-border-hover)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--om-orange)', boxShadow: '0 0 0 3px var(--om-orange-dim)' },
          },
          '& .MuiInputBase-input::placeholder': { color: 'var(--om-muted)', opacity: 1 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon name="search" size={18} className={styles.searchIcon} />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchQuery('')} aria-label="Clear search"
                sx={{ color: 'var(--om-muted)', '&:hover': { color: 'var(--om-fg)' } }}>
                <Icon name="close" size={16} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Unified tab bar — hidden during search */}
      {!searchQuery && (
        <Box sx={{ borderBottom: 1, borderColor: 'var(--om-border)', pt: '20px' }}>
          <Tabs
            value={VIEWS.indexOf(view)}
            onChange={(_, newVal) => setView(VIEWS[newVal])}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Meeting views"
            sx={{
              minHeight: 40,
              '& .MuiTabs-indicator': { bgcolor: 'var(--om-orange)', height: 2 },
              '& .MuiTabs-scrollButtons': { color: 'var(--om-muted)' },
              '& .MuiTab-root': {
                minHeight: 40,
                textTransform: 'none',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--om-muted)',
                px: { xs: 1.5, sm: 2.5 },
                minWidth: 'auto',
                gap: '6px',
                '&.Mui-selected': { color: 'var(--om-fg)', fontWeight: 600 },
              },
            }}
          >
            {VIEWS.map(v => (
              <Tab
                key={v}
                icon={<Icon name={VIEW_ICONS[v]} size={16} />}
                iconPosition="start"
                label={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <span>{VIEW_LABELS[v]}</span>
                    {tabCounts[v] != null && (
                      <Chip
                        label={tabCounts[v]}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          fontWeight: 700,
                          bgcolor: view === v ? 'var(--om-orange-dim)' : 'var(--om-surface-hover)',
                          color: view === v ? 'var(--om-orange)' : 'var(--om-muted)',
                          '& .MuiChip-label': { px: '6px' },
                        }}
                      />
                    )}
                  </Stack>
                }
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Search results — shown when searching */}
      {searchQuery && (
        <>
          <div className={styles.sectionLabel}>
            <div className={styles.sectionTitle}><Icon name="search" size={14} /> Search results</div>
            <div className={styles.sectionDesc}>{allFilteredMeetings.length} meeting{allFilteredMeetings.length !== 1 ? 's' : ''} matching &ldquo;{searchQuery}&rdquo;</div>
          </div>
          <AllMeetingsView timezone={timezone} meetingsList={allFilteredMeetings} onSelect={openDrawer} onDownload={openConfigurator} />
        </>
      )}

      {/* Tab content — hidden during search */}
      {!searchQuery && view === 'featured' && (
        <>
          <div className={styles.sectionLabel}>
            <div className={styles.sectionTitle}><Icon name="star" size={14} /> Important Community Meetings</div>
            <div className={styles.sectionDesc}>Where we all come together regularly to check development progress, align on releases, and discuss important cross-cutting topics. Make sure to join these recurring meetings and stay connected with the community.</div>
          </div>
          {featuredMeetings.length > 0 ? (
            <div className={styles.featuredGrid}>
              {featuredMeetings.map(m => (
                <FeaturedCard key={m.id} meeting={m} timezone={timezone} onSelect={openDrawer} onDownload={openConfigurator} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--om-dimmed)' }}>No featured meetings match your search.</div>
          )}
          <div className={styles.priorityLegend}>
            <span className={styles.priorityLegendItem}><Icon name="diamond" size={14} className={styles.priorityDiamond} /> Highlight &mdash; Major events, prepare ahead</span>
            <span className={styles.priorityLegendItem}><Icon name="star" size={14} className={styles.priorityStar} /> Featured &mdash; Key recurring, don&apos;t miss</span>
          </div>
        </>
      )}
      {!searchQuery && view === 'products' && <AllMeetingsView timezone={timezone} meetingsList={productMeetings} onSelect={openDrawer} onDownload={openConfigurator} />}
      {!searchQuery && view === 'events' && <AllMeetingsView timezone={timezone} meetingsList={eventMeetings} onSelect={openDrawer} onDownload={openConfigurator} />}
      {!searchQuery && view === 'others' && <AllMeetingsView timezone={timezone} meetingsList={otherMeetings} onSelect={openDrawer} onDownload={openConfigurator} />}
      {!searchQuery && view === 'agenda' && <AgendaView timezone={timezone} meetingsList={allFilteredMeetings} onSelect={openDrawer} onDownload={openConfigurator} />}
      {!searchQuery && view === 'calendar' && <CalendarView timezone={timezone} meetingsList={allFilteredMeetings} onSelect={openDrawer} />}

      {/* Contact section */}
      <div className={styles.contactSection}>
        <div className={styles.contactTitle}><Icon name="forum" size={20} /> Get in Touch</div>
        <div className={styles.contactLinks}>
          <a href="https://accounts.eclipse.org/mailing-list/tractusx-dev" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <Icon name="mail" size={24} />
            <div>
              <div className={styles.contactCardLabel}>Mailing List</div>
              <div className={styles.contactCardDesc}>tractusx-dev@eclipse.org</div>
            </div>
            <Icon name="open_in_new" size={16} className={styles.contactCardArrow} />
          </a>
          <a href="https://chat.eclipse.org/#/room/#tractusx:matrix.eclipse.org" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <Icon name="chat" size={24} />
            <div>
              <div className={styles.contactCardLabel}>Matrix Chat</div>
              <div className={styles.contactCardDesc}>#tractusx:matrix.eclipse.org</div>
            </div>
            <Icon name="open_in_new" size={16} className={styles.contactCardArrow} />
          </a>
        </div>
      </div>

      {/* Drawer */}
      <MeetingDrawer meeting={drawerMeeting} timezone={timezone} onClose={closeDrawer} onDownload={openConfigurator} />

      {/* Calendar Configurator Modal */}
      <CalendarConfigurator
        meeting={configuratorMeeting}
        timezone={timezone}
        allMeetings={meetings}
        onClose={closeConfigurator}
      />
    </div>
  );
}

export default function MeetingsHub() {
  return (
    <BrowserOnly fallback={<div style={{ padding: 40, textAlign: 'center', color: '#888' }}>Loading meetings...</div>}>
      {() => <MeetingsHubInner />}
    </BrowserOnly>
  );
}
