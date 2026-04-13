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

import React, { useState, useMemo } from 'react';
import { meetings } from '@site/data/meetings';
import { generateCalendarEvents } from '@site/src/utils/meetingUtils';
import { startOfDay, endOfDay } from 'date-fns';
import './TodaysMeetings.css';

export default function TodaysMeetings({ timezone = 'Europe/Berlin' }) {
  const todayEvents = useMemo(() => {
    const now = new Date();
    const start = startOfDay(now);
    const end = endOfDay(now);
    const events = generateCalendarEvents(meetings, start, end, timezone);
    return events.sort((a, b) => a.start - b.start);
  }, [timezone]);

  if (todayEvents.length === 0) {
    return null;
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const now = new Date();

  return (
    <section className="todays-meetings">
      <div className="todays-meetings__header">
        <div className="todays-meetings__icon">📅</div>
        <div>
          <h2 className="todays-meetings__title">Today&apos;s Meetings</h2>
          <p className="todays-meetings__subtitle">
            {todayEvents.length} meeting{todayEvents.length !== 1 ? 's' : ''} scheduled for today
          </p>
        </div>
      </div>
      <div className="todays-meetings__list">
        {todayEvents.map((event, index) => {
          const isLive = now >= event.start && now <= event.end;
          const isPast = now > event.end;
          return (
            <div
              key={`${event.id}-${index}`}
              className={`todays-meetings__item ${isLive ? 'todays-meetings__item--live' : ''} ${isPast ? 'todays-meetings__item--past' : ''}`}
            >
              <div className="todays-meetings__time">
                <span className="todays-meetings__time-start">{formatTime(event.start)}</span>
                <span className="todays-meetings__time-separator">–</span>
                <span className="todays-meetings__time-end">{formatTime(event.end)}</span>
              </div>
              <div className="todays-meetings__info">
                <span className="todays-meetings__name">{event.title}</span>
                {isLive && <span className="todays-meetings__live-badge">● LIVE</span>}
              </div>
              {event.sessionLink && (
                <a
                  href={event.sessionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="todays-meetings__join-btn"
                >
                  Join Meeting
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
