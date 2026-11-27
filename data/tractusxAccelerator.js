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

// Shared content of the Tractus-X Accelerator, used by the About Us timeline card
// and the dedicated /accelerator page.

// Accelerator partners, referenced by their id in tractusxOrganizations.
export const acceleratorPartnerIds = ["idsa", "catena-x", "fraunhofer-isst", "arena2036"];

// Program period, as shown on the About Us timeline.
export const acceleratorPeriod = "2026 - 2029";

// What the Accelerator works on. `title` is the short name of the goal; `icon` is a key of
// the icon map in src/pages/accelerator. The Accelerator supports the community; it is
// not a software development project.
export const acceleratorFocusAreas = [
  {
    id: "financing",
    icon: "financing",
    title: "Financing models",
    description:
      "Work with partners and the community on ways to fund the open-source work around Eclipse Tractus-X in the long term.",
  },
  {
    id: "documentation",
    icon: "docs",
    title: "Better documentation and processes",
    description:
      "Improve the quality of documentation, governance, release and quality processes, so that joining and contributing takes less effort.",
  },
  {
    id: "community",
    icon: "community",
    title: "A stronger worldwide community",
    description:
      "Grow and connect contributors, projects and organizations across countries and industries.",
  },
  {
    id: "dataspaces",
    icon: "dataspaces",
    title: "Welcoming more dataspace initiatives",
    description:
      "Open Eclipse Tractus-X to dataspace initiatives beyond Catena-X and help them onboard and reuse what the community has built.",
  },
  {
    id: "strategy",
    icon: "strategy",
    title: "Strategy and coordinated improvements",
    description:
      "Define where the community goes next and coordinate improvements to the software across projects. The Accelerator coordinates; the community and its committers build.",
  },
  {
    id: "events",
    icon: "events",
    title: "Events that bring people together",
    description:
      "Hackathons, thinkathons and the flagship Community Days, organized with intent so the community meets more often.",
  },
];

// Formats of the Accelerator's events, shown in the events section.
export const acceleratorEventFormats = [
  {
    id: "hackathons",
    title: "Hackathons",
    description: "Hands-on working days on real challenges of the Tractus-X software.",
  },
  {
    id: "thinkathons",
    title: "Thinkathons",
    description: "Focused sessions to think through strategy, architecture and open questions together.",
  },
  {
    id: "community-days",
    title: "Community Days",
    description: "The flagship event of the community: talks, workshops and exchange over two days.",
  },
];

// Events organized as part of the Accelerator. The page shows the events that have
// not ended yet as "Upcoming" and the others as "Past events", newest first, so an
// event never stays "upcoming" after its date. Dates are YYYY-MM-DD.
export const acceleratorEvents = [
  {
    id: "hackathon-ii-11-2026",
    title: "Second International Eclipse Tractus-X Hackathon",
    date: "2026-11-06",
    location: "ARENA2036 e.V., Stuttgart, Germany",
    summary:
      "A free, full-day design thinking and programming hackathon on re-architecting the Eclipse Tractus-X Portal: simpler, easier to maintain, more performant and easier to use for data space onboardings.",
    blogSlug: "hackathon-ii-11-2026",
  },
];

/**
 * Splits events into the ones that have not ended yet (soonest first) and past
 * ones (newest first), relative to `now`.
 */
export function splitAcceleratorEvents(events = acceleratorEvents, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const ends = (event) => new Date(`${event.endDate || event.date}T23:59:59`);
  const byDate = (a, b) => new Date(a.date) - new Date(b.date);
  return {
    upcoming: events.filter((event) => ends(event) >= today).sort(byDate),
    past: events.filter((event) => ends(event) < today).sort((a, b) => byDate(b, a)),
  };
}

// Accelerator logos in static/img/accelerator, one per site theme.
export const acceleratorLogos = [
  {
    id: "color-dark-text",
    label: "Full color, for light backgrounds",
    src: "/img/accelerator/tractus-x-accelerator-logo-color-dark-text.svg",
    theme: "light",
  },
  {
    id: "color-light-text",
    label: "Full color, for dark backgrounds",
    src: "/img/accelerator/tractus-x-accelerator-logo-color-light-text.svg",
    theme: "dark",
  },
];
