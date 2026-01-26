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

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { meetings } from '@site/data/meetings';
import { generateCalendarEvents, getCategoryStyle, formatDateInTimezone, formatTimeRange } from '@site/src/utils/meetingUtils';
import './MeetingCalendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Common timezones
const TIMEZONES = [
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
];

export default function MeetingCalendar({ onTimezoneChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedTimezone, setSelectedTimezone] = useState('Europe/Berlin');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarContainerRef = useRef(null);
  const [fixedWidth, setFixedWidth] = useState(null);

  // Capture initial width and lock it
  useEffect(() => {
    if (calendarContainerRef.current && !fixedWidth) {
      const width = calendarContainerRef.current.offsetWidth;
      setFixedWidth(width);
    }
  }, [fixedWidth]);

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
    
    // Dispatch custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timezoneChange', { detail: { timezone } }));
    }
    
    if (onTimezoneChange) {
      onTimezoneChange(timezone);
    }
  };

  // Generate events for the current view
  const events = useMemo(() => {
    const start = startOfMonth(subMonths(currentDate, 1));
    const end = endOfMonth(addMonths(currentDate, 2));
    return generateCalendarEvents(meetings, start, end, selectedTimezone);
  }, [currentDate, selectedTimezone]);

  const eventStyleGetter = (event) => {
    return {
      style: getCategoryStyle(event.category),
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="meeting-calendar-container" ref={calendarContainerRef}>
      <div className="calendar-controls">
        <div className="timezone-selector">
          <label htmlFor="timezone-select">Timezone: </label>
          <select
            id="timezone-select"
            value={selectedTimezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="timezone-select"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#4a90e2' }}></span>
            <span>General Office Hours</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#50c878' }}></span>
            <span>Product Meetings</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#f5a623' }}></span>
            <span>One-time Meetings</span>
          </div>
        </div>
      </div>

      <div style={{ width: fixedWidth ? `${fixedWidth}px` : '100%', maxWidth: '100%', overflow: 'hidden', margin: '0 auto' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: '100%' }}
          view={view}
          onView={setView}
          date={currentDate}
          onNavigate={setCurrentDate}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          popup
          views={['month', 'week', 'day']}
        />
      </div>

      {selectedEvent && (
        <div className="event-modal-overlay" onClick={handleCloseModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <h3>{selectedEvent.title}</h3>
            <div className="modal-content">
              <p className="modal-time">
                <strong>Time:</strong> {formatTimeRange(selectedEvent.utcStart || selectedEvent.start, selectedEvent.utcEnd || selectedEvent.end, selectedTimezone)}
              </p>
              <p className="modal-date">
                <strong>Date:</strong> {formatDateInTimezone(selectedEvent.utcStart || selectedEvent.start, selectedTimezone, 'EEEE, MMMM d, yyyy')}
              </p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Contact:</strong> <a href={`mailto:${selectedEvent.contact}`}>{selectedEvent.contact}</a></p>
              {selectedEvent.sessionLink && (
                <p><a href={selectedEvent.sessionLink} target="_blank" rel="noopener noreferrer" className="join-link">Join Meeting</a></p>
              )}
              {selectedEvent.additionalLinks && selectedEvent.additionalLinks.length > 0 && (
                <div className="additional-links">
                  <strong>Additional Links:</strong>
                  <ul>
                    {selectedEvent.additionalLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
