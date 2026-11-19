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

// What the accelerator program offers. `title` is the focus area as published on
// the About Us page; `icon` is a key of the icon map in src/pages/accelerator.
export const acceleratorFocusAreas = [
  {
    id: "onboarding",
    icon: "school",
    title: "Structured onboarding and qualification of new projects and developers",
    description:
      "A guided path into Eclipse Tractus-X: from the first contact to a project or contributor that meets the community's processes.",
  },
  {
    id: "infrastructure",
    icon: "science",
    title: "Test and development infrastructure",
    description:
      "Environments to build, run and test Tractus-X components end to end, so contributions can be checked before they reach a release.",
  },
  {
    id: "mentoring",
    icon: "mentoring",
    title: "Targeted mentoring by experienced community members",
    description:
      "Committers and project leads who know the code and the processes help newcomers take their next step.",
  },
  {
    id: "governance",
    icon: "policy",
    title: "Further development of governance, release and quality processes",
    description:
      "Clearer, lighter processes for releases and quality, so that joining and staying in the community takes less effort.",
  },
  {
    id: "community",
    icon: "forum",
    title: "Sustainable community and exchange formats",
    description:
      "Hackathons, community days and open meetings where people meet, exchange and build together.",
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

// Accelerator logo variants in static/img/accelerator. `light` and `dark` name the
// site theme each variant is made for; `mono` variants are single-color.
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
  {
    id: "black",
    label: "Black, for light backgrounds",
    src: "/img/accelerator/tractus-x-accelerator-logo-black.svg",
    theme: "light",
    mono: true,
  },
  {
    id: "white",
    label: "White, for dark backgrounds",
    src: "/img/accelerator/tractus-x-accelerator-logo-white.svg",
    theme: "dark",
    mono: true,
  },
];
