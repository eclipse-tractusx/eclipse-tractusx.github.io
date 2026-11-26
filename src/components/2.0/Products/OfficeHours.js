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

import React from 'react';
import Link from '@docusaurus/Link';
import EventIcon from '@mui/icons-material/EventOutlined';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { meetings } from '@site/data/meetings';
import styles from './detail.module.scss';

const FALLBACK = 'community-office-hour';
const DAY = (day) => day.charAt(0).toUpperCase() + day.slice(1);

/** "Every other Tuesday, 09:00–09:30" from a meeting recurrence; times are Europe/Berlin. */
export function describeSchedule(recurrence) {
  if (!recurrence) return 'On request';
  const days = recurrence.daysOfWeek.map(DAY).join(' and ');
  const every =
    recurrence.interval === 2
      ? 'Every other'
      : recurrence.interval > 2
        ? `Every ${recurrence.interval} weeks,`
        : 'Every';
  return `${every} ${days}, ${recurrence.startTime}–${recurrence.endTime}`;
}

const contactNames = (contact) =>
  []
    .concat(contact || [])
    .map((person) => person.name)
    .join(', ');

function MeetingCard({ meeting, general }) {
  return (
    <div className={styles.meetingCard}>
      <p className={styles.agentKicker}>
        <EventIcon className={styles.agentKickerIcon} />
        {general ? 'Questions? Join the community' : 'Office hour'}
      </p>
      <h3 className={styles.meetingTitle}>{meeting.title}</h3>
      <p className={styles.meetingWhen}>
        <ScheduleIcon className={styles.meetingWhenIcon} />
        <span>
          {describeSchedule(meeting.recurrence)}
          {meeting.recurrence && <span className={styles.meetingZone}> (Berlin time)</span>}
        </span>
      </p>
      {meeting.contact && <p className={styles.meetingHost}>Host: {contactNames(meeting.contact)}</p>}
      <div className={styles.agentActions}>
        {meeting.sessionLink && (
          <a
            className={styles.agentPrimary}
            href={meeting.sessionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VideocamIcon className={styles.inlineIcon} />
            Join
          </a>
        )}
        {meeting.matrixChatUrl && (
          <a
            className={styles.agentSecondary}
            href={meeting.matrixChatUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChatIcon className={styles.inlineIcon} />
            Chat
          </a>
        )}
        <Link className={styles.agentSecondary} to="/community/open-meetings">
          All meetings
        </Link>
      </div>
    </div>
  );
}

/**
 * The open meetings where a product is discussed (`meetings` in the product data, ids from
 * data/meetings.js). Products without one point to the Community Office Hour.
 */
export default function OfficeHours({ product }) {
  const own = (product.meetings || [])
    .map((id) => meetings.find((meeting) => meeting.id === id))
    .filter(Boolean);
  if (own.length > 0) return own.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />);
  const fallback = meetings.find((meeting) => meeting.id === FALLBACK);
  return fallback ? <MeetingCard meeting={fallback} general /> : null;
}
