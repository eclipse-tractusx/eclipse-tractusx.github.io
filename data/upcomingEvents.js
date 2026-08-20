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
 * Upcoming Events Data
 *
 * This file contains the data for upcoming community events displayed on the homepage.
 * Events are automatically filtered to show only upcoming dates.
 *
 * @typedef {Object} Event
 * @property {string} id - Unique identifier for the event
 * @property {string} title - Event title
 * @property {string} date - Event start date in YYYY-MM-DD format
 * @property {string} [endDate] - Optional event end date in YYYY-MM-DD format
 * @property {string} location - Event location (city, country, or "Virtual")
 * @property {string} description - Brief description of the event
 * @property {string} registrationUrl - URL to the event registration page
 * @property {string} [blogSlug] - Optional blog post slug (e.g., 'community-days-05-2026')
 * @property {string} eventType - Type of event ('community-days', 'hackathon', 'open-planning')
 * @property {boolean} featured - Whether this event should be featured prominently
 * @property {string} image - Path to event image (relative to /static/, e.g., '/img/events/your-image.png')
 */

/**
 * Array of upcoming events
 * @type {Event[]}
 */
export const upcomingEvents = [
  {
    id: 'community-days-07-2026',
    title: 'Sixth Eclipse Tractus-X Community Days',
    date: '2026-07-02',
    endDate: '2026-07-03',
    location: 'ARENA2036 e.V., Stuttgart, Germany',
    description: 'Join us for the Sixth Eclipse Tractus-X Community Days (Special Edition) at ARENA2036 e.V. (Pfaffenwaldring 19, 70569 Stuttgart)! Two days of collaboration, workshops, keynotes, and networking with the global Tractus-X community. Connect with contributors from Manufacturing-X initiatives, participate in hands-on challenges, and help shape the future of open-source data spaces.',
    registrationUrl: 'https://eveeno.com/159341884',
    blogSlug: 'community-days-07-2026',
    eventType: 'community-days',
    featured: true,
    image: '/img/events/VI-tractus-x-community-days-banner.png'
  },
];

/**
 * Event type definitions for filtering and styling
 */
export const EVENT_TYPES = {
  COMMUNITY_DAYS: 'community-days',
  HACKATHON: 'hackathon',
  OPEN_PLANNING: 'open-planning'
};

/**
 * Filter events to show only upcoming ones
 * @param {Event[]} events - Array of events
 * @returns {Event[]} Filtered array of upcoming events
 */
export const getUpcomingEvents = (events) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events
    .filter(event => {
      const eventDate = new Date(event.endDate || event.date);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
