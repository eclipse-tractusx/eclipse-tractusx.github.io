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
import { upcomingEvents, getUpcomingEvents, EVENT_TYPES } from '../../../data/upcomingEvents';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import styles from './styles.module.scss';

/**
 * Get event type configuration
 */
const getEventTypeConfig = (eventType) => {
  const configs = {
    [EVENT_TYPES.COMMUNITY_DAYS]: {
      label: 'Community Days',
      icon: GroupsIcon,
      color: '#faa023'
    },
    [EVENT_TYPES.HACKATHON]: {
      label: 'Hackathon',
      icon: CodeIcon,
      color: '#0ea5e9'
    },
    [EVENT_TYPES.OPEN_PLANNING]: {
      label: 'Open Planning',
      icon: EventNoteIcon,
      color: '#8b5cf6'
    }
  };
  
  return configs[eventType] || configs[EVENT_TYPES.COMMUNITY_DAYS];
};

/**
 * Format date for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format date range for display
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {string} Formatted date range
 */
const formatDateRange = (startDate, endDate) => {
  if (!endDate) return formatDate(startDate);
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startOptions = { month: 'long', day: 'numeric' };
  const endOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
  }
  
  return `${start.toLocaleDateString('en-US', startOptions)} - ${end.toLocaleDateString('en-US', endOptions)}`;
};

/**
 * Event Card Component
 */
const EventCard = ({ event, isFeatured = false }) => {
  const dateDisplay = formatDateRange(event.date, event.endDate);
  const eventTypeConfig = getEventTypeConfig(event.eventType);
  const EventTypeIcon = eventTypeConfig.icon;
  const showImage = event.eventType !== EVENT_TYPES.OPEN_PLANNING && event.image;
  
  return (
    <div className={`${styles.eventCard} ${isFeatured ? styles.featuredCard : ''} ${!showImage ? styles.noImageCard : ''}`}>
      {showImage && (
        <div className={styles.eventImage}>
          <img src={event.image} alt={event.title} />
          <div 
            className={styles.eventTypeBadge}
            style={{ backgroundColor: eventTypeConfig.color }}
          >
            <EventTypeIcon /> {eventTypeConfig.label}
          </div>
        </div>
      )}
      
      <div className={styles.eventContent}>
        {!showImage && (
          <div className={styles.eventIconHeader}>
            <div 
              className={styles.eventIcon}
              style={{ backgroundColor: eventTypeConfig.color }}
            >
              <EventTypeIcon />
            </div>
            <div 
              className={styles.eventTypeTag}
              style={{ backgroundColor: eventTypeConfig.color }}
            >
              <EventTypeIcon /> {eventTypeConfig.label}
            </div>
          </div>
        )}
        
        <div className={styles.eventMeta}>
          <span className={styles.eventDate}>
            <CalendarTodayIcon /> {dateDisplay}
          </span>
          <span className={styles.eventLocation}>
            <LocationOnIcon /> {event.location}
          </span>
        </div>
        
        <h3 className={styles.eventTitle}>{event.title}</h3>
        
        <p className={styles.eventDescription}>{event.description}</p>
        
        <div className={styles.eventActions}>
          {event.eventType === EVENT_TYPES.OPEN_PLANNING ? (
            // Open Planning events only show Learn More
            <a 
              href={event.registrationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.eventButton} ${styles.primaryButton}`}
            >
              Learn More <ArrowForwardIcon />
            </a>
          ) : (
            // Other events show Register Now
            <>
              <a 
                href={event.registrationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.eventButton} ${styles.primaryButton}`}
              >
                Register Now <OpenInNewIcon />
              </a>
              
              {event.blogSlug && (
                <Link 
                  to={`/blog/${event.blogSlug}`}
                  className={`${styles.eventButton} ${styles.secondaryButton}`}
                >
                  Learn More
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Upcoming Events Section Component
 */
const UpcomingEvents = ({ showPastEvents = false }) => {
  const events = showPastEvents ? upcomingEvents : getUpcomingEvents(upcomingEvents);
  
  if (events.length === 0) {
    return (
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <EventIcon className={styles.headerIcon} />
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <p className={styles.sectionSubtitle}>
              Stay tuned for upcoming community events
            </p>
          </div>
          
          <div className={styles.emptyState}>
            <p>No upcoming events at the moment. Check back soon!</p>
            <Link to="/community/open-meetings" className={styles.eventButton}>
              View Community Calendar
            </Link>
          </div>
        </div>
      </section>
    );
  }
  
  const featuredEvent = events.find(event => event.featured);
  const otherEvents = events.filter(event => !event.featured);
  
  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <EventIcon className={styles.headerIcon} />
          <h2 className={styles.sectionTitle}>Join Our Upcoming Events</h2>
          <p className={styles.sectionSubtitle}>
            Connect with the Eclipse Tractus-X community at our events worldwide
          </p>
        </div>
        
        {featuredEvent && (
          <div className={styles.featuredSection}>
            <div className={styles.sectionDivider}>
              <EventIcon /> Featured Events
            </div>
            <EventCard event={featuredEvent} isFeatured={true} />
          </div>
        )}
        
        {otherEvents.length > 0 && (
          <>
            {featuredEvent && (
              <div className={styles.sectionDivider}>
                <CalendarTodayIcon /> Upcoming Events
              </div>
            )}
            <div className={styles.eventsGrid}>
              {otherEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
        
        <div className={styles.seeMoreSection}>
          <Link to="/community/open-meetings" className={styles.seeMoreButton}>
            See More Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
