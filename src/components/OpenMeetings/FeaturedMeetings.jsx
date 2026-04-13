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
import BrowserOnly from '@docusaurus/BrowserOnly';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { meetings, MEETING_CATEGORIES } from '@site/data/meetings';
import { getScheduleDescription, getCategoryColor } from '@site/src/utils/meetingUtils';
import './FeaturedMeetings.css';

const CATEGORY_LABELS = {
  [MEETING_CATEGORIES.GENERAL]: 'General',
  [MEETING_CATEGORIES.PRODUCT]: 'Product',
  [MEETING_CATEGORIES.ONE_TIME]: 'Event',
};

function FeaturedCard({ meeting, timezone, isHero }) {
  const categoryColor = getCategoryColor(meeting.category);
  const categoryLabel = CATEGORY_LABELS[meeting.category] || meeting.category;

  return (
    <div className={`featured-card ${isHero ? 'featured-card--hero' : ''}`} id={meeting.title}>
      {meeting.image && (
        <div className="featured-card__image">
          <img src={meeting.image} alt={meeting.title} loading="lazy" />
          <span className="featured-card__badge" style={{ backgroundColor: categoryColor }}>
            {categoryLabel}
          </span>
        </div>
      )}
      <div className="featured-card__body">
        {!meeting.image && (
          <span className="featured-card__badge featured-card__badge--inline" style={{ backgroundColor: categoryColor }}>
            {categoryLabel}
          </span>
        )}
        <h3 className="featured-card__title">
          {meeting.title}
          <a className="hash-link" href={`#${meeting.title}`} title="Direct link to meeting">{' '}</a>
        </h3>
        <BrowserOnly fallback={<p className="featured-card__schedule">Loading schedule...</p>}>
          {() => (
            <p className="featured-card__schedule">
              {meeting.recurrence
                ? getScheduleDescription(meeting, timezone)
                : 'No dedicated schedule — session needs to be requested'}
            </p>
          )}
        </BrowserOnly>
        <p className="featured-card__desc">{meeting.description}</p>

        <div className="featured-card__actions">
          {meeting.sessionLink && (
            <a
              href={meeting.sessionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-card__btn featured-card__btn--primary"
            >
              Join Meeting
            </a>
          )}
          <a href={`#${meeting.title}`} className="featured-card__btn featured-card__btn--secondary">
            Details <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedMeetings({ timezone = 'Europe/Berlin' }) {
  const featured = meetings.filter(m => m.featured);

  if (featured.length === 0) return null;

  const hero = featured[0];
  const rest = featured.slice(1);

  return (
    <section className="featured-meetings">
      <div className="featured-meetings__label">
        <StarIcon sx={{ fontSize: 20 }} />
        Featured Meetings
      </div>
      <div className="featured-meetings__grid">
        <FeaturedCard meeting={hero} timezone={timezone} isHero={true} />
        {rest.map(m => (
          <FeaturedCard key={m.id} meeting={m} timezone={timezone} isHero={false} />
        ))}
      </div>
    </section>
  );
}
