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

import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import MeetingInfo from './MeetingInfo';
import { meetings, MEETING_CATEGORIES } from '@site/data/meetings';

export default function MeetingsList({ category }) {
  const [selectedTimezone, setSelectedTimezone] = useState('Europe/Berlin');

  // Listen for timezone changes from the calendar
  useEffect(() => {
    const handleTimezoneChange = (event) => {
      setSelectedTimezone(event.detail.timezone);
    };

    window.addEventListener('timezoneChange', handleTimezoneChange);
    return () => {
      window.removeEventListener('timezoneChange', handleTimezoneChange);
    };
  }, []);

  // Filter meetings by category
  const filteredMeetings = meetings.filter(m => m.category === MEETING_CATEGORIES[category.toUpperCase().replace('-', '_')]);

  return (
    <BrowserOnly fallback={<div>Loading meetings...</div>}>
      {() => (
        <>
          {filteredMeetings.map(meeting => (
            <MeetingInfo
              key={meeting.id}
              title={meeting.title}
              schedule={meeting.recurrence ? 'Loading...' : 'No dedicated schedule - session needs to be requested'}
              description={meeting.description}
              contact={meeting.contact}
              sessionLink={meeting.sessionLink}
              additionalLinks={meeting.additionalLinks || []}
              meetingData={meeting}
              timezone={selectedTimezone}
            />
          ))}
        </>
      )}
    </BrowserOnly>
  );
}
