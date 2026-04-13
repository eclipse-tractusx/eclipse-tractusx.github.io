/*********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import React, { useState, useRef, useEffect } from 'react';
import { getScheduleDescription, getCategoryColor } from '@site/src/utils/meetingUtils';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './MeetingInfo.css';

const CATEGORY_LABELS = {
  general: 'General',
  product: 'Product',
  'one-time': 'Event',
};

export default function MeetingInfo({title, schedule, description, contact, sessionLink = undefined, meetingLink = undefined, additionalLinks = [], meetingData = null, timezone = 'Europe/Berlin'}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const detailsRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    const category = meetingData?.category;
    const categoryColor = category ? getCategoryColor(category) : '#999';
    const categoryLabel = category ? (CATEGORY_LABELS[category] || category) : '';
    const image = meetingData?.image;

    useEffect(() => {
        if (detailsRef.current) {
            setContentHeight(detailsRef.current.scrollHeight);
        }
    }, [isExpanded, description, contact, sessionLink, meetingLink, additionalLinks]);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <section className={`meeting-card ${isExpanded ? 'meeting-card--expanded' : ''}`} id={title}>
            {image && (
                <div className="meeting-card__image">
                    <img src={image} alt={title} loading="lazy" />
                </div>
            )}

            <div className="meeting-card__body">
                {categoryLabel && (
                    <span className="meeting-card__badge" style={{ backgroundColor: categoryColor }}>
                        {categoryLabel}
                    </span>
                )}

                <h3 className="meeting-card__title">
                    {title}
                    <a className="hash-link" href={`#${title}`} title="Direct link to open meeting" onClick={(e) => e.stopPropagation()}>{' '}</a>
                </h3>

                <BrowserOnly fallback={<div className="meeting-card__schedule">{schedule}</div>}>
                  {() => {
                    const displaySchedule = meetingData
                      ? getScheduleDescription(meetingData, timezone)
                      : schedule;
                    return <div className="meeting-card__schedule">{displaySchedule}</div>;
                  }}
                </BrowserOnly>

                <p className={`meeting-card__desc ${isExpanded ? '' : 'meeting-card__desc--clamped'}`}>
                    {description}
                </p>

                {sessionLink && (
                    <a
                        href={sessionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meeting-card__join-btn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Join Meeting
                    </a>
                )}

                <button
                    className="meeting-card__toggle"
                    onClick={handleToggle}
                    aria-expanded={isExpanded}
                    aria-controls={`meeting-details-${title}`}
                >
                    {isExpanded ? 'Hide details ▲' : 'Show details ▼'}
                </button>

                <div
                    id={`meeting-details-${title}`}
                    className="meeting-card__details-wrapper"
                    style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0' }}
                >
                    <div className="meeting-card__details" ref={detailsRef}>
                        <div className="meeting-card__detail-group">
                            <span className="meeting-card__detail-label">Contact</span>
                            <a href={`mailto:${contact}`} className="meeting-card__detail-link">{contact}</a>
                        </div>

                        {meetingLink && (
                            <div className="meeting-card__detail-group">
                                <span className="meeting-card__detail-label">Calendar</span>
                                <a href={meetingLink} className="meeting-card__detail-link">Download calendar file</a>
                            </div>
                        )}

                        {additionalLinks.length > 0 && (
                            <div className="meeting-card__detail-group">
                                <span className="meeting-card__detail-label">Links</span>
                                <ul className="meeting-card__link-list">
                                    {additionalLinks.map((link, index) => (
                                        <li key={`${index}${link.url}`}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
