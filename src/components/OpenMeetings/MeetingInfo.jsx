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
import React from 'react';
import { getScheduleDescription } from '@site/src/utils/meetingUtils';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function MeetingInfo({title, schedule, description, contact, sessionLink = undefined, meetingLink = undefined, additionalLinks = [], meetingData = null, timezone = 'Europe/Berlin'}) {
    return (
        <section style={meetingInfo} id={title}>
            <div style={meetingOverview}>
                <h2 className="anchor" style={meetingTitle}>
                    {title}
                    <a className="hash-link" href={`#${title}`} title="Direct link to open meeting"></a>
                </h2>
                <BrowserOnly fallback={<div style={meetingSchedule}>{schedule}</div>}>
                  {() => {
                    const displaySchedule = meetingData 
                      ? getScheduleDescription(meetingData, timezone)
                      : schedule;
                    return <div style={meetingSchedule}>{displaySchedule}</div>;
                  }}
                </BrowserOnly>
            </div>
            <div style={meetingDetails}>
                <p>{description}</p>

                <ul>
                    <li style={itemTitle}>Contact:</li>
                    <li style={itemLink}>
                        <a href={"mailto:" + contact}>{contact}</a>
                    </li>
                </ul>

                <ul>
                    <li style={itemTitle}>Participation opportunities:</li>
                        {sessionLink && (
                            <li style={itemLink}>
                                <a href={sessionLink}>Join Meeting</a>
                            </li>
                        )}
                        {meetingLink && (
                            <li style={itemLink}>
                                <a href={meetingLink}>Download calendar file</a>
                            </li>
                        )}
                </ul>
                {additionalLinks.length > 0 && (
                <ul>
                    <li style={itemTitle}>Additional links:</li>
                    {additionalLinks.map((link, index) => {
                        const { url, title } = link;
                        return (
                            <li key={`${index}${url}`} style={itemLink}>
                                <a href={url}>{title}</a>
                            </li>
                        );
                    })}
                </ul>
                )}
      </div>
    </section>
  );
}

const itemLink = {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#faa023',
    listStyleImage: 'url("/img/product_link_bullet.png")',
}

const itemTitle = {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '18px',
    listStyle: 'none',
}

const meetingInfo = {
    display: 'flex',
    width: '100%',
    padding: '1rem 0 0.5rem',
}

const meetingOverview = {
    width: '33%',
    margin: 'auto 0',
    padding: '2rem 0 0.5rem',
    borderRight: '2px solid #faa023',
}

const meetingTitle = {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '25px',
}

const meetingSchedule = {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#a5a5a5',
}

const meetingDetails = {
    width: '67%',
    margin: 'auto 0',
    padding: '0.5rem 1.5rem',
}
