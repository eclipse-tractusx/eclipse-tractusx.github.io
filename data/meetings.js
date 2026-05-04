/*********************************************************************************
 * Copyright (c) 2023, 2025 Contributors to the Eclipse Foundation
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

// Meeting priority levels for visual importance hierarchy
// highlight: Full-width hero banner — major events, prepare ahead
// featured:  Double-width card — key recurring meetings, don't miss
// (omit for standard meetings)
export const MEETING_PRIORITIES = {
  HIGHLIGHT: 'highlight',
  FEATURED: 'featured',
};

// Contact persons — centralized to avoid duplication
// country: ISO 3166-1 alpha-2 code — used for public holiday detection per meeting
export const CONTACTS = {
  STEPHAN_BAUER: { name: 'Stephan Bauer', title: 'Eclipse Tractus-X Project Lead', email: 'stephan.bauer@catena-x.net', github: 'stephanbcbauer', linkedin: 'stephan-bauer-7a3a22117', country: 'DE' },
  MATHIAS_MOSER: { name: 'Mathias Moser', title: 'Eclipse Tractus-X Project Lead', email: 'mathias.moser@catena-x.net', github: 'matbmoser', linkedin: 'mathias-brunkow-moser', country: 'DE' },
  LARS_BLAUMEISER: { name: 'Lars Geyer-Blaumeiser', title: 'EDC Responsible', email: 'lars.blaumeiser@cofinity-x.com', github: 'lgblaumeiser', country: 'DE' },
  SAAD_RAFIQ: { name: 'Saad Rafiq', title: 'Portal Product Owner', email: 'saad.rafiq@cofinity-x.com', github: 'saadrafiq12', country: 'DE' },
  MIKEL_GARCIA: { name: 'Mikel Garcia', title: 'Eclipse Tractus-X Project Lead', email: 'mgarcia@lksnext.com', github: 'mgarciaLKS', linkedin: 'mikel-garcia-bartolome-a3891b308', country: 'ES' },
  JULIAN_STOLL: { name: 'Julian Stoll', title: 'BPDM Product Owner', email: 'julian.stoll@mercedes-benz.com', github: 'jstollmb', country: 'DE' },
  JOHANN_SCHUETZ: { name: 'Johann Schütz', title: 'Semantic Modelling Lead', email: 'johann.schuetz@catena-x.net', country: 'DE' },
  MONIKA_JACOBSEN: { name: 'Monika Jacobsen', title: 'Test Management', email: 'monika.jacobsen@catena-x.net', country: 'DE' },
  CARLOS_RODRIGUEZ: { name: 'Carlos D. Rodriguez', title: 'Eclipse Tractus-X Committer', email: 'cdiez@lksnext.com', github: 'CDiezRodriguez', country: 'ES' },
  ANGEL_YAO: { name: 'Angel Y. Zhan', title: 'Eclipse Tractus-X Contributor', email: 'ayao@lksnext.com', github: 'AYaoZhan', country: 'ES' },
};

// Country labels for display — maps ISO code to readable name
export const COUNTRY_LABELS = {
  DE: 'Germany',
  ES: 'Spain',
  US: 'United States',
  GB: 'United Kingdom',
  FR: 'France',
  IN: 'India',
  JP: 'Japan',
};

// Meeting data with recurrence rules
// All times are in Europe/Berlin timezone
export const meetings = [
  // General Office Hours
  {
    id: 'community-office-hour',
    title: 'Community Office Hour',
    icon: 'forum',
    category: MEETING_CATEGORIES.GENERAL,
    priority: MEETING_PRIORITIES.FEATURED,
    description: 'Open hour meeting for all interests. The goal of the meeting is to inform and share information about different topics.',
    contact: [CONTACTS.STEPHAN_BAUER, CONTACTS.MATHIAS_MOSER, CONTACTS.MIKEL_GARCIA],
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MDFiNDJjMmQtNjFkYi00ODdjLTk2NDgtZGMwNTRmYzg3NzM0%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx:matrix.eclipse.org',
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
    },
  },
  {
    id: 'newjoiner-office-hour',
    title: 'NewJoiner - Office Hour',
    icon: 'waving_hand',
    category: MEETING_CATEGORIES.GENERAL,
    description: 'Are you new to Eclipse Tractus-X and looking for your first insights? Join our New Joiner Session to learn the essentials about the project, how to get started, and how you can contribute. This session is designed to help new members understand the key aspects of Eclipse Tractus-X. If you\'re interested in joining, please contact Stephan Bauer.',
    contact: CONTACTS.STEPHAN_BAUER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjAzYzVjZGEtZjEwNC00NDI5LWEwODEtN2RhNmI0NDEzNTI2%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    recurrence: null, // On-demand, no fixed schedule
  },
  {
    id: 'committer-meeting',
    title: 'Committer Meeting',
    icon: 'engineering',
    category: MEETING_CATEGORIES.GENERAL,
    priority: MEETING_PRIORITIES.FEATURED,
    description: 'Open hour meeting for Eclipse Tractus-X committers. The goal of the meeting is to discuss and share specific committer tasks/responsibilities.',
    contact: CONTACTS.STEPHAN_BAUER,
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-committers:matrix.eclipse.org',
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjlmNTc5MjMtN2Y2YS00YjliLTg3NTItNWE1MmMzMWUzNmYw%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    additionalLinks: [
      { title: 'Taskboard', url: 'https://github.com/orgs/eclipse-tractusx/projects/61/views/6' },
      { title: 'Timelines', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 4,
      daysOfWeek: ['friday'],
      startTime: '14:05',
      endTime: '15:00',
      validFrom: '2026-04-24',
    },
  },
  {
    id: 'kits-office-hour',
    title: 'Eclipse Tractus-X KITs Community Office Hour',
    icon: 'inventory_2',
    category: MEETING_CATEGORIES.GENERAL,
    priority: MEETING_PRIORITIES.FEATURED,
    description: 'Are you interested on developing or contributing KITs (Keep it Together) for Eclipse Tractus-X? Join our KITs Office Hour to learn more about KITs, their development process, and how you can get involved. This session is designed to provide insights into the KIT framework and answer any questions you may have.',
    contact: CONTACTS.MATHIAS_MOSER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjI2YjA0MmItNWNiNS00OGQ0LWJjNGMtOTFmMjg0YzNlZjlh%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org',
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['thursday'],
      startTime: '09:30',
      endTime: '10:30',
    },
    additionalLinks: [
      { title: "Kanban Board KIT Office Hour", url: "https://github.com/orgs/eclipse-tractusx/projects/92" },
      { title: "KIT Getting Started", url: "https://eclipse-tractusx.github.io/documentation/kit-getting-started"}
    ]
  },
  // Product Regular Meetings
  {
    id: 'industry-core-hub-weekly',
    title: 'Industry Core Hub Weekly',
    icon: 'hub',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open Meeting to align the development status of the Industry Core Hub [IC-Hub], the data provision & consumption orchestrator. Additional Topic Groups (Backend, Frontend & Architecture) Weekly meetings are available in the additional links.',
    contact: CONTACTS.MATHIAS_MOSER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MGJlYzgzMjktNWE4OS00NjcwLWIyOGYtZDgzYmMzODRiMTgy%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    matrixChatUrl: 'https://matrix.to/#/#tractusx-industry-core-hub:matrix.eclipse.org',
    additionalLinks: [
      { title: 'industry-core-hub Repository', url: 'https://github.com/eclipse-tractusx/industry-core-hub' },
      { title: 'tractusx-sdk Repository', url: 'https://github.com/eclipse-tractusx/tractusx-sdk' },
      { title: 'Planning Board Project', url: 'https://github.com/orgs/eclipse-tractusx/projects/83' },
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
    id: 'tractus-x-sdk-weekly',
    title: 'Tractus-X SDK & TX-SDK Services (TX Test Bed) Weekly',
    icon: 'developer_board',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open Meeting to align the development status of Tractus-X SDK, a library which allows you to create dataspace ready solutions. Also in this meeting the developments at the Tractus-X SDK Services (Tractus-X Test Bed) repository will be aligned',
    contact: CONTACTS.MATHIAS_MOSER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODU0ZDk3MjUtNjkzMS00MzQzLWFmZGYtY2Q3YWEzZmVjNmMx%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    matrixChatUrl: 'https://matrix.to/#/#tractusx-industry-core-hub:matrix.eclipse.org',
    additionalLinks: [
      { title: 'tractusx-sdk Repository', url: 'https://github.com/eclipse-tractusx/tractusx-sdk' },
      { title: 'tractusx-sdk-services (Test Bed) Repository', url: 'https://github.com/eclipse-tractusx/tractusx-sdk-services' },
      { title: 'Planning Board Project (shared with IC-Hub', url: 'https://github.com/orgs/eclipse-tractusx/projects/83' }
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['monday'],
      startTime: '10:00',
      endTime: '10:30',
    },
  },
  {
    id: 'edc-weekly',
    title: 'Connector - Open Meeting',
    icon: 'cable',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open house meeting to support with anything connector related. You have questions about the connector, problems running/configuring connector in your environment or want to know what´s next in connector and when to expect? This is the place to ask all these questions.',
    contact: CONTACTS.LARS_BLAUMEISER,
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-edc:matrix.eclipse.org',
    sessionLink: 'https://eclipse.zoom.us/j/87463482673?pwd=XwLhl6yazHg2Llaos4ojcCs2OPRaip.1',
    recurrence: {
      frequency: 'weekly',
      interval: 2,
      daysOfWeek: ['tuesday'],
      startTime: '16:00',
      endTime: '16:30',
      validFrom: '2026-01-06',
    },
  },
  {
    id: 'identity-hub-weekly',
    title: 'Identity Hub Weekly',
    icon: 'fingerprint',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open Meeting to align the development of the TX Identity Hub',
    contact: CONTACTS.MATHIAS_MOSER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NTIxMmIyMmItYTk0NC00YjMxLWFiNDAtOTRlOWM1ZDUxYWRm%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%2279a55f91-092d-4603-8fa9-c88b54ff2fe9%22%7d',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-identity-hub:matrix.eclipse.org',
    additionalLinks: [
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
    icon: 'dashboard',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open meeting for Portal product. Agenda is divided in alignment on development - features, bugs, maintenance - and Q&A.',
    contact: CONTACTS.SAAD_RAFIQ,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmIyYjgwOTQtZjI1Ny00YmM0LTlmOWQtODRjZWFmZWM1Y2E3%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-portal:matrix.eclipse.org',
    additionalLinks: [
      { title: 'Feature Board', url: 'https://github.com/orgs/eclipse-tractusx/projects/50/views/25' },
    ],
    recurrence: {
      frequency: 'weekly',
      interval: 4,
      daysOfWeek: ['tuesday'],
      startTime: '10:30',
      endTime: '11:00',
    },
  },
  {
    id: 'umbrella-helm-chart-sync',
    title: 'Umbrella Helm Chart Sync',
    icon: 'cloud_sync',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Open meeting to discuss the integration work around the umbrella helm chart with the purpose to enable a sandbox environment to support end-to-end (e2e) testing and to provide an easy entry point to Tractus-X for developers and adopters.',
    contact: CONTACTS.MIKEL_GARCIA,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19:meeting_ODMzMzMxY2MtMGI4ZC00MjJkLThjZjYtMzk3ZjBjMmEzYjZj@thread.v2/0?context=%7B%22Tid%22:%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22,%22Oid%22:%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7D',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-umbrella-chart:matrix.eclipse.org',
    additionalLinks: [
      { title: 'Umbrella Repository', url: 'https://github.com/eclipse-tractusx/tractus-x-umbrella' },
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
    icon: 'contact_page',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Coordination of feature refinement and development for bpdm product.',
    contact: CONTACTS.JULIAN_STOLL,
    sessionLink: 'https://teams.microsoft.com/meet/39668829824816?p=V98MwqIBHMrXfu6GSd',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-bpdm:matrix.eclipse.org',
    additionalLinks: [],
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['wednesday'],
      startTime: '09:00',
      endTime: '09:30',
    },
  },
  {
    id: 'semantic-model-modelling',
    title: 'Semantic Model Modelling - Open Meeting',
    icon: 'schema',
    category: MEETING_CATEGORIES.PRODUCT,
    description: 'Coordination of the development and alignment of aspect models (sldt-semantic-models) as well as ontologies (sldt-ontology-model).',
    contact: CONTACTS.JOHANN_SCHUETZ,
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
    title: 'Eclipse Tractus-X E2E Test Phase Daily for R26.06',
    icon: 'bug_report',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'Onboarding and deployment status for 26.06 on INT environment, Defect/Blocker updates, Test status of all participating products',
    contact: CONTACTS.MONIKA_JACOBSEN,
    sessionLink: 'https://teams.microsoft.com/meet/343522134230388?p=tDiHDy4NYj9wUY908t',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-test-management:matrix.eclipse.org',
    additionalLinks: [],
    recurrence: {
      frequency: 'daily',
      interval: 1,
      daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '08:30',
      endTime: '09:00',
      validFrom: '2026-05-19',
      validUntil: '2026-06-05',
    },
  },
  {
    id: 'briefing-testing-phase',
    title: 'Briefing Testing Phase for 26.06',
    icon: 'assignment',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'The goal of the meeting is to prepare for the test phase and clarify the process of the release test phase. We also want to review the Release Check Issues and discuss the deployment process.',
    contact: CONTACTS.MONIKA_JACOBSEN,
    contact: CONTACTS.MONIKA_JACOBSEN,
    sessionLink: 'https://teams.microsoft.com/meet/341698125994736?p=qJo0E8nAZq6BdyTo7N',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-test-management:matrix.eclipse.org',
    additionalLinks: [],
    recurrence: {
      frequency: 'once',
      startDate: '2026-05-04',
      startTime: '08:30',
      endTime: '09:30',
    },
  },
  {
    id: 'kickoff-testing-phase',
    title: 'Kick-Off Testing Phase for 26.06',
    icon: 'rocket_launch',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'The purpose of this session is to provide you with the latest updates on the test phase and the deployment status. Additionally, this will be an opportunity for you to ask any questions regarding the upcoming test phase.',
    contact: CONTACTS.MONIKA_JACOBSEN,
    contact: CONTACTS.MONIKA_JACOBSEN,
    sessionLink: 'https://teams.microsoft.com/meet/363850435614611?p=DsSrIvonUzetTYn4yc',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-test-management:matrix.eclipse.org',
    additionalLinks: [],
    recurrence: {
      frequency: 'once',
      startDate: '2026-05-18',
      startTime: '08:30',
      endTime: '09:00',
    },
  },
  // New entries for R26.06 - Alignment Day and Open Planning
  {
    id: 'alignment-day-r26-09',
    title: 'Alignment Day for R26.09',
    icon: 'handshake',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'Address open questions and unresolved dependencies for features planned for Release 26.09. This session focuses on alignment and clarifying blockers before open planning.',
    contact: CONTACTS.STEPHAN_BAUER,
    sessionLink: 'https://teams.microsoft.com/meet/32237268178214?p=89tbu5bGzNdCVPpfhn',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-release-planning:matrix.eclipse.org',
    additionalLinks: [
      { title: 'Release Planning Board - Open Question', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/43?filterQuery=-label%3Ametadata+label%3APrep-R26.09+label%3A%22open+question%22' },
      { title: 'Timeline', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35?filterQuery=label%3Ametadata+milestone%3A26.09' },
      { title: 'News Blog', url: '/blog/release-planning-R26.09' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2026-05-13', 
      startTime: '09:05',
      endTime: '10:00',
    },
  },
  {
    id: 'open-planning-r26-09',
    title: 'Open Planning for R26.09',
    icon: 'event_note',
    category: MEETING_CATEGORIES.ONE_TIME,
    description: 'Finalize roadmap, prioritize features and align participants on deliverables for Release 26.09.',
    contact: CONTACTS.STEPHAN_BAUER,
    sessionLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NTliYzcyM2YtODMwNC00NzdiLThlNTEtNGI2MzNhYzAyMDRi%40thread.v2/0?context=%7b%22Tid%22%3a%221ad22c6d-2f08-4f05-a0ba-e17f6ce88380%22%2c%22Oid%22%3a%22a8b7a5ee-66ff-4695-afa2-08f893d8aaf6%22%7d',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-release-planning:matrix.eclipse.org',
    additionalLinks: [
      { title: 'Release Planning Board - Topic/Product', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/28?filterQuery=-status%3ADone+has%3Atopic%2Fproduct+label%3A%22Prep-R26.09%22+status%3ABacklog' },
      { title: 'Timeline', url: 'https://github.com/orgs/eclipse-tractusx/projects/26/views/35?filterQuery=label%3Ametadata+milestone%3A26.09' },
      { title: 'News Blog', url: '/blog/release-planning-R26.09' },
      { title: 'Detailed Agenda', url: '/blog/release-planning-R26.09#agenda-1' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2026-05-28', 
      startTime: '09:05',
      endTime: '10:15',
    },
  },
  {
    id: 'sixth-community-days-2026',
    title: 'Sixth Eclipse Tractus-X Community Days',
    category: MEETING_CATEGORIES.ONE_TIME,
    priority: MEETING_PRIORITIES.HIGHLIGHT,
    onsite: true,
    location: 'ARENA2036 e.V., Stuttgart, Germany',
    description: 'Join us for the Sixth Eclipse Tractus-X Community Days at ARENA2036 e.V. (Pfaffenwaldring 19, 70569 Stuttgart, Germany)! Two full days of keynotes, workshops, hands-on challenges, and networking with the global Tractus-X open-source community. Connect with contributors from Manufacturing-X initiatives (Factory-X, Chem-X, Aerospace-X and more), participate in technical coding challenges, and help shape the future of open-source data spaces.',
    contact: [CONTACTS.STEPHAN_BAUER, CONTACTS.MATHIAS_MOSER, CONTACTS.MIKEL_GARCIA],
    registrationLink: 'https://eveeno.com/159341884',
    matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-community-events:matrix.eclipse.org',
    additionalLinks: [
      { title: 'News Blog & Registration', url: '/blog/community-days-07-2026' },
      { title: 'ARENA2036 Event Page', url: 'https://arena2036.de/reader/sixth-eclipse-tractus-x-community-days/' },
      { title: 'Tractus-X Mailing List', url: 'https://accounts.eclipse.org/mailing-list/tractusx-dev' },
    ],
    recurrence: {
      frequency: 'once',
      startDate: '2026-07-02',
      endDate: '2026-07-03',
      startTime: '09:00',
      endTime: '17:00',
    },
  },
];
