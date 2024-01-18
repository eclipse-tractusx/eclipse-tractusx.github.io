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

import styles from "./styles.module.css";

export default function MeetingInfo({title, schedule, description, contact, sessionLink = undefined, meetingLink = undefined}) {
    return (
        <section style={meetingInfo}>
            <div style={meetingOverview}>
                <h2 style={meetingTitle}>{title}</h2>
                <div style={meetingSchedule}>{schedule}</div>
            </div>
            <div style={meetingDetails}>
                <p>{description}</p>
                
                <ul className={styles.meeting_contact_item}>
                    <li className={styles.item_title}>Contact:</li>
                    <li className={styles.item_link}>
                        <a href={"mailto:" + contact}>{contact}</a>
                    </li>
                </ul>

                <ul className={styles.meeting_participation_item}>
                    <li className={styles.item_title}>Participation opportunities:</li>
                    { 
                        sessionLink && 
                            <li className={styles.item_link}>
                                <a href={sessionLink}>Join Meeting</a>
                            </li> 
                    }
                    { 
                        meetingLink &&
                            <li className={styles.item_link}>
                                <a href={meetingLink}>Download calendar file</a>
                            </li>
                    }
                </ul>
            </div>
        </section>
    );
}

const meetingInfo = {
    display: 'flex',
    width: '100%',
    padding: '1rem 0 0.5rem'
}

const meetingOverview = {
    width: '33%',
    margin: 'auto 0',
    padding: '2rem 0 0.5rem',
    borderRight: '2px solid #faa023'
}

const meetingTitle = {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '25px'
}

const meetingSchedule = {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#a5a5a5'
}

const meetingDetails = {
    width: '67%',
    margin: 'auto 0',
    padding: '0.5rem 1.5rem'
}
