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

// Meeting categories for color coding
export const MEETING_CATEGORIES = {
  GENERAL: 'general',
  PRODUCT: 'product',
  ONE_TIME: 'one-time',
};

// Meeting data with recurrence rules
// All times are in Europe/Berlin timezone
export const meetings = [
  // General Office Hours
  {
    id: 'community-office-hour',
    title: 'Community Office Hour',
    category: MEETING_CATEGORIES.GENERAL,
    description: 'Open hour meeting for all interests. The goal of the meeting is to inform and share information about different topics.',
    contact: 'stephan.bauer@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MDFiNDJjMmQtNjFkYi00ODdjLTk2NDgtZGMwNTRmYzg3NzM0%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    additionalLinks: [
      { title: 'Taskboard', url: 'https://github.com/orgs/eclipse-tractusx/projects/61/views/1' },
      { title: 'Meeting minutes', url: '/community/meeting-minutes/tags/community' },
      { title: 'Timelines', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['friday'],
      startTime: '10:05',
      endTime: '11:00',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
    },
  },
  {
    id: 'newjoiner-office-hour',
    title: 'NewJoiner - Office Hour',
    category: MEETING_CATEGORIES.GENERAL,
    description: 'Are you new to Eclipse Tractus-X and looking for your first insights? Join our New Joiner Session to learn the essentials about the project, how to get started, and how you can contribute. This session is designed to help new members understand the key aspects of Eclipse Tractus-X. If you\'re interested in joining, please contact Stephan Bauer.',
    contact: 'stephan.bauer@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjAzYzVjZGEtZjEwNC00NDI5LWEwODEtN2RhNmI0NDEzNTI2%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    recurrence: null, // On-demand, no fixed schedule
  },
  {
    id: 'committer-meeting',
    title: 'Committer Meeting',
    category: MEETING_CATEGORIES.GENERAL,
    description: 'Open hour meeting for Eclipse Tractus-X committers. The goal of the meeting is to discuss and share specific committer tasks/responsibilities.',
    contact: 'stephan.bauer@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjlmNTc5MjMtN2Y2YS00YjliLTg3NTItNWE1MmMzMWUzNmYw%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    additionalLinks: [
      { title: 'Taskboard', url: 'https://github.com/orgs/eclipse-tractusx/projects/61/views/6' },
      { title: 'Timelines', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 2,
      daysOfWeek: ['friday'],
      startTime: '14:05',
      endTime: '15:00',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
    },
  },
  {
    id: 'kits-office-hour',
    title: 'Eclipse Tractus-X KITs Community Office Hour',
    category: MEETING_CATEGORIES.GENERAL,
    description: 'Are you interested on developing or contributing KITs (Keep it Together) for Eclipse Tractus-X? Join our KITs Office Hour to learn more about KITs, their development process, and how you can get involved. This session is designed to provide insights into the KIT framework and answer any questions you may have.',
    contact: 'mathias.moser@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjI2YjA0MmItNWNiNS00OGQ0LWJjNGMtOTFmMjg0YzNlZjlh%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['thursday'],
      startTime: '09:30',
      endTime: '10:00',
    },
  },
  // Product Regular Meetings
  {
    id: 'industry-core-hub-weekly',
    title: 'Industry Core Hub & Tractus-X SDK Weekly',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open Meeting to align the development status of the Industry Core Hub [IC-Hub], the data provision & consumption orchestrator & the Tractus-X SDK (a generic dataspace tool box with libraries). Additional Topic Groups (Backend, Frontend & Architecture) Weekly meetings are available in the additional links.',
    contact: 'mathias.moser@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MGJlYzgzMjktNWE4OS00NjcwLWIyOGYtZDgzYmMzODRiMTgy%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    additionalLinks: [
      { title: 'Industry Core Hub Matrix Chat', url: 'https://matrix.to/#/#tractusx-industry-core-hub:matrix.eclipse.org' },
      { title: 'industry-core-hub Repository', url: 'https://github.com/eclipse-tractusx/industry-core-hub' },
      { title: 'tractusx-sdk Repository', url: 'https://github.com/eclipse-tractusx/tractusx-sdk' },
      { title: 'Planning Board Project', url: 'https://github.com/orgs/eclipse-tractusx/projects/83' },
      { title: 'Backend & TX-SDK Weekly - Monday 10:00 am to 10:30 am', url: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODU0ZDk3MjUtNjkzMS00MzQzLWFmZGYtY2Q3YWEzZmVjNmMx%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d' },
      { title: 'Frontend Weekly - Tuesday 02:00 pm to 02:30 pm', url: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODUyNWQxMzAtMWE0ZC00Mjc2LTgzYzAtNTc0ZGFiZDllNmQy%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d' },
      { title: 'Architecture Weekly - Thursday 01:00 pm to 02:00 pm', url: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzYyMDUyZjMtMmFlMy00ODMyLWFlZDQtNjMwYWZhOTc3YTVh%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['tuesday'],
      startTime: '09:00',
      endTime: '09:30',
    },
  },
  {
    id: 'edc-weekly',
    title: 'EDC Weekly | Extended',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open house meeting to support with anything EDC related. You have questions about EDC, problems running/ configuring EDC in your environment or want to know what´s next in EDC and when to expect? This is the place to ask all these questions.',
    contact: 'lars.blaumeiser@cofinity-x.com',
    sessionLink: 'https://eclipse.zoom.us/j/85945828202?pwd=YODkCen20BOQV9WNJEeNFM8zaOlxo9.1',
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['tuesday'],
      startTime: '10:30',
      endTime: '11:00',
    },
  },
  {
    id: 'identity-hub-weekly',
    title: 'Identity Hub Weekly',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open Meeting to align the development of the TX Identity Hub',
    contact: 'mathias.moser@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NTIxMmIyMmItYTk0NC00YjMxLWFiNDAtOTRlOWM1ZDUxYWRm%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    additionalLinks: [
      { title: 'Identity Hub Matrix Chat', url: 'https://matrix.eecc.de/#/room/#tractusx-identity-hub:matrix.eclipse.org' },
      { title: 'tractusx-identityhub Repository', url: 'https://github.com/eclipse-tractusx/tractusx-identityhub' },
      { title: 'Planning Board', url: 'https://github.com/orgs/eclipse-tractusx/projects/87/views/1' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['wednesday'],
      startTime: '15:00',
      endTime: '16:00',
    },
  },
  {
    id: 'portal-open-meeting',
    title: 'Portal - Open Meeting',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open meeting for Portal product. Agenda is divided in alignment on development - features, bugs, maintenance - and Q&A.',
    contact: 'saad.rafiq@cofinity-x.com',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmIyYjgwOTQtZjI1Ny00YmM0LTlmOWQtODRjZWFmZWM1Y2E3%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    additionalLinks: [
      { title: 'Portal Matrix Chat', url: 'https://chat.eclipse.org/#/room/#tractusx-portal:matrix.eclipse.org' },
      { title: 'Feature Board', url: 'https://github.com/orgs/eclipse-tractusx/projects/50/views/25' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['tuesday'],
      startTime: '10:30',
      endTime: '11:00',
    },
  },
  {
    id: 'umbrella-helm-chart-sync',
    title: 'Umbrella Helm Chart Sync',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open meeting to discuss the integration work around the umbrella helm chart with the purpose to enable a sandbox environment to support end-to-end (e2e) testing and to provide an easy entry point to Tractus-X for developers and adopters.',
    contact: 'mgarcia@lksnext.com',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19:meeting_ODMzMzMxY2MtMGI4ZC00MjJkLThjZjYtMzk3ZjBjMmEzYjZj@thread.v2/0?context=%7B%22Tid%22:%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22,%22Oid%22:%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7D',
    additionalLinks: [
      { title: 'Umbrella Repository', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella' },
      { title: 'Umbrella Matrix Chat', url: 'https://chat.eclipse.org/#/room/#tractusx-umbrella-chart:matrix.eclipse.org' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['monday'],
      startTime: '11:00',
      endTime: '11:30',
    },
  },
  {
    id: 'bpdm-open-meeting',
    title: 'BPDM - Open Meeting',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Coordination of feature refinement and development for bpdm product.',
    contact: 'sujit.karne@mercedes-benz.com',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_OGYxZjQ4NzItNjc1OC00YjEyLWI2NjYtNThjNDBmMGI0MTk4%40thread.v2/0?context=%7b%22Tid%22%3a%229652d7c2-1ccf-4940-8151-4a92bd474ed0%22%2c%22Oid%22%3a%221cad1acb-7d7b-4e88-bc6b-875078a66bdf%22%7d',
    additionalLinks: [
      { title: 'BPDM Matrix Chat', url: 'https://chat.eclipse.org/#/room/#tractusx-bpdm:matrix.eclipse.org' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['wednesday'],
      startTime: '10:00',
      endTime: '10:30',
    },
  },
  {
    id: 'semantic-model-modelling',
    title: 'Semantic Model Modelling - Open Meeting',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Coordination of the development and alignment of aspect models (sldt-semantic-models) as well as ontologies (sldt-ontology-model).',
    contact: 'johann.schuetz@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_N2I5MjM1NzUtZmFmZS00MTI2LTgyMmEtOGZiMDMxNmRlYTA4%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22bf6c04e8-bde4-4ca1-ac15-0f85f440ab48%22%7d',
    additionalLinks: [
      { title: 'SLDT Semantic Models Repository', url: 'https://github.com/eclipse-tractusx/sldt-semantic-models' },
      { title: 'SLDT Ontology Models Repository', url: 'https://github.com/eclipse-tractusx/sldt-ontology-model' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['monday'],
      startTime: '15:30',
      endTime: '16:30',
      validFrom: '2025-01-20',
    },
  },

  // One-time meetings
  {
    id: 'e2e-test-phase-daily',
    title: 'Eclipse Tractus-X E2E Test Phase Daily for R25.12',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'Onboarding and deployment status for 25.12 on INT environment, Defect/Blocker updates, Test status of all participating products',
    contact: 'monika.jacobsen@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjQ1ZjI5NDctMmQ2OC00OWRhLTg5NzUtOWJjNzQ1M2MxZDNj%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22e461a1fa-5342-44e3-b2e8-32b399a9e867%22%7d',
    additionalLinks: [
      { title: 'Test Management Matrix Chat', url: 'https://matrix.to/#/#tractusx-test-management:matrix.eclipse.org' },
      { title: 'News Blog', url: '/blog/testphase-R25.12' },
    ],
    recurrence: {
      frequency: 'daily',
      interval: 1,
      daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '08:30',
      endTime: '09:00',
      validFrom: '2025-11-04',
      validUntil: '2025-11-21',
    },
  },
  {
    id: 'briefing-testing-phase',
    title: 'Briefing Testing Phase for 25.12',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'The goal of the meeting is to prepare for the test phase and clarify the process of the release test phase. We also want to review the Release Check Issues and discuss the deployment process.',
    contact: 'monika.jacobsen@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_Mjc1ODFlY2MtNWYyYy00ZGIyLTliM2YtYmM3OGIwNTk0ZGYw%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%225365a192-079b-4140-947d-d47db343e981%22%7d',
    additionalLinks: [
      { title: 'Test Management Matrix Chat', url: 'https://matrix.to/#/#tractusx-test-management:matrix.eclipse.org' },
      { title: 'News Blog', url: '/blog/testphase-R25.12' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2025-10-20',
      startTime: '08:30',
      endTime: '09:30',
    },
  },
  {
    id: 'kickoff-testing-phase',
    title: 'Kick-Off Testing Phase for 25.12',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'The purpose of this session is to provide you with the latest updates on the test phase and the deployment status. Additionally, this will be an opportunity for you to ask any questions regarding the upcoming test phase.',
    contact: 'monika.jacobsen@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTlhNWQ2NmItODFhMi00YWNmLWJmNGEtNDQ5NzVlZTIwNDkx%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%225365a192-079b-4140-947d-d47db343e981%22%7d',
    additionalLinks: [
      { title: 'Test Management Matrix Chat', url: 'https://matrix.to/#/#tractusx-test-management:matrix.eclipse.org' },
      { title: 'News Blog', url: '/blog/testphase-R25.12' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2025-11-03',
      startTime: '08:30',
      endTime: '09:00',
    },
  },
  {
    id: 'alignment-day-r26-03',
    title: 'Alignment Day for R26.03',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'Based on a predefined agenda (depending on the features on the board with label Open Question), individual dependencies are discussed and also documented directly on the feature.',
    contact: 'stephan.bauer@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZWUzMmU2ODktMTU0OS00MjM5LTk0MDYtM2UxYmI5OTE1ZDE5%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22c4f4cd17-5452-4057-9b00-42444990d814%22%7d',
    additionalLinks: [
      { title: 'Release Planning Board - Open Question', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/43?filterQuery=-label%3Ametadata+label%3APrep-R26.03+label%3A%22open+question%22' },
      { title: 'Timeline', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35?filterQuery=label%3Ametadata+milestone%3A26.03' },
      { title: 'News Blog', url: '/blog/release-planning-R26.03' },
      { title: 'Release Planning Matrix Chat', url: 'https://matrix.to/#/#tractusx-release-planning:matrix.eclipse.org' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2025-10-30',
      startTime: '09:05',
      endTime: '10:45',
    },
  },
  {
    id: 'open-planning-r26-03',
    title: 'Open Planning for R26.03',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'The goal for this meeting is planning of the intended work content for the next release - which contains also preparation of future release content, refactoring, general architectural work, tool & process improvements, and feature planning for the next Tractus-X release.',
    contact: 'stephan.bauer@catena-x.net',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjM4YTAwYWItMWU0Ny00NzU5LWFlZmYtYWRkZGQyMWRlMTM2%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22c4f4cd17-5452-4057-9b00-42444990d814%22%7d',
    additionalLinks: [
      { title: 'Release Planning Board - Topic/Product', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/28?filterQuery=-status%3ADone+has%3Atopic%2Fproduct+label%3A%22Prep-R26.03%22+status%3ABacklog' },
      { title: 'Timeline', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35?filterQuery=label%3Ametadata+milestone%3A26.03' },
      { title: 'News Blog', url: '/blog/release-planning-R26.03' },
      { title: 'Detailed Agenda', url: '/blog/release-planning-R26.03#agenda-1' },
      { title: 'Release Planning Matrix Chat', url: 'https://matrix.to/#/#tractusx-release-planning:matrix.eclipse.org' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2025-11-13',
      startTime: '09:05',
      endTime: '12:15',
    },
  },
];
