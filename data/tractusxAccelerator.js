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

// What the accelerator program offers.
export const acceleratorFocusAreas = [
  "Structured onboarding and qualification of new projects and developers",
  "Test and development infrastructure",
  "Targeted mentoring by experienced community members",
  "Further development of governance, release and quality processes",
  "Sustainable community and exchange formats",
];

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
