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
import { getScheduleDescription } from '@site/src/utils/meetingUtils';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './MeetingInfo.css';

export default function MeetingInfo({title, schedule, description, contact, sessionLink = undefined, meetingLink = undefined, additionalLinks = [], meetingData = null, timezone = 'Europe/Berlin'}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const detailsRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (detailsRef.current) {
            setContentHeight(detailsRef.current.scrollHeight);
        }
    }, [isExpanded, description, contact, sessionLink, meetingLink, additionalLinks]);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <section className={`meeting-info-card ${isExpanded ? 'meeting-info-card--expanded' : ''}`} id={title}>
            <div
                className="meeting-info-header"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-controls={`meeting-details-${title}`}
            >
                <div className="meeting-info-summary">
                    <h3 className="meeting-info-title">
                        {title}
                        <a className="hash-link" href={`#${title}`} title="Direct link to open meeting" onClick={(e) => e.stopPropagation()}></a>
                    </h3>
                    <BrowserOnly fallback={<div className="meeting-info-schedule">{schedule}</div>}>
                      {() => {
                        const displaySchedule = meetingData
                          ? getScheduleDescription(meetingData, timezone)
                          : schedule;
                        return <div className="meeting-info-schedule">{displaySchedule}</div>;
                      }}
                    </BrowserOnly>
                </div>
                <span className={`meeting-info-chevron ${isExpanded ? 'meeting-info-chevron--open' : ''}`} aria-hidden="true">
                    &#9662;
                </span>
            </div>
            <div
                id={`meeting-details-${title}`}
                className="meeting-info-details-wrapper"
                style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0' }}
            >
                <div className="meeting-info-details" ref={detailsRef}>
                    <p>{description}</p>

                    <ul>
                        <li className="meeting-info-item-title">Contact:</li>
                        <li className="meeting-info-item-link">
                            <a href={"mailto:" + contact}>{contact}</a>
                        </li>
                    </ul>

                    <ul>
                        <li className="meeting-info-item-title">Participation opportunities:</li>
                            {sessionLink && (
                                <li className="meeting-info-item-link">
                                    <a href={sessionLink}>Join Meeting</a>
                                </li>
                            )}
                            {meetingLink && (
                                <li className="meeting-info-item-link">
                                    <a href={meetingLink}>Download calendar file</a>
                                </li>
                            )}
                    </ul>
                    {additionalLinks.length > 0 && (
                    <ul>
                        <li className="meeting-info-item-title">Additional links:</li>
                        {additionalLinks.map((link, index) => {
                            const { url, title: linkTitle } = link;
                            return (
                                <li key={`${index}${url}`} className="meeting-info-item-link">
                                    <a href={url}>{linkTitle}</a>
                                </li>
                            );
                        })}
                    </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
