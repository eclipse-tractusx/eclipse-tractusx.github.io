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

/**
 * Eclipse Tractus-X community bases around the world.
 *
 * Tractus-X is a global, decentralised community: no single country sits at the
 * centre of the map. Each entry marks a country where the community is present,
 * and its `size` tells how big that local community is today, which is what the
 * map visualises through the size of the Tractus-X claim.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD A BASE
 * ---------------------------------------------------------------------------
 * Append an entry to `communityBases` below. Only `latitude`/`longitude` drive
 * the position on the map, so nothing else needs to be touched to place a new
 * marker. Pick a `size` from COMMUNITY_SIZES and a `status` from
 * COMMUNITY_STATUS that reflect the local community.
 *
 * If the new base is in a country that should also be highlighted on the map,
 * add it to `HIGHLIGHTED_COUNTRIES` in `utils/generateWorldMap.js` and re-run
 * `node utils/generateWorldMap.js`. A base without a highlighted country still
 * renders its marker correctly - it just gets no country fill.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD PARTNERS
 * ---------------------------------------------------------------------------
 * Fill the `partners` array of a base. Every partner takes the shape:
 *
 *   {
 *     name: 'Organization name',           // required
 *     url: 'https://example.org',          // optional, makes the card a link
 *     role: PARTNER_ROLES.CONTRIBUTOR,     // optional, see PARTNER_ROLES
 *     description: 'What they do here.',   // optional, one short line
 *   }
 *
 * Locations with an empty `partners` array render an invitation card instead,
 * so the page stays complete while the list is being collected.
 */

/** Regions used to group and filter the bases. */
export const REGIONS = {
  EUROPE: 'Europe',
  ASIA: 'Asia',
  AMERICAS: 'Americas',
  AFRICA: 'Africa',
  OCEANIA: 'Oceania',
};

/** How big the local community is; drives the size of the marker on the map. */
export const COMMUNITY_SIZES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  EXTRA_SMALL: 'xsmall',
};

/** Human readable names for COMMUNITY_SIZES. */
export const COMMUNITY_SIZE_LABELS = {
  [COMMUNITY_SIZES.LARGE]: 'Large community',
  [COMMUNITY_SIZES.MEDIUM]: 'Medium community',
  [COMMUNITY_SIZES.SMALL]: 'Small community',
  [COMMUNITY_SIZES.EXTRA_SMALL]: 'Extra small community',
};

/** Where the local community stands on its way to becoming an established base. */
export const COMMUNITY_STATUS = {
  ESTABLISHED: 'Established base',
  IN_PROGRESS: 'Base in progress',
  PARTNERS: 'Partner base',
  CONTRIBUTORS: 'Contributors',
  EMERGING: 'Emerging community',
  GROWTH_PENDING: 'Looking to grow',
};

/** How a partner organization engages with the project at a given location. */
export const PARTNER_ROLES = {
  CONTRIBUTOR: 'Contributor',
  COMMITTER: 'Committer',
  ADOPTER: 'Adopter',
  OPERATOR: 'Operator',
  ACADEMIC: 'Academic',
  SUPPORTER: 'Supporter',
};

/**
 * @typedef {Object} CommunityBase
 * @property {string} id - Stable slug, also used as the URL hash on the detail page.
 * @property {string} country - Display name of the country.
 * @property {string} countryCode - ISO 3166-1 alpha-2 code, matches COUNTRY_PATHS.
 * @property {string} [city] - Optional city or hub name.
 * @property {string} region - One of REGIONS.
 * @property {number} latitude - Marker latitude in degrees.
 * @property {number} longitude - Marker longitude in degrees.
 * @property {string} size - One of COMMUNITY_SIZES.
 * @property {string} status - One of COMMUNITY_STATUS.
 * @property {'bottom'|'top'|'left'|'right'} [labelPlacement] - Where the map label sits
 * relative to the marker; use it to keep crowded regions readable. Defaults to 'bottom'.
 * @property {Array<{name: string, url?: string, role?: string, description?: string}>} partners
 */

/** @type {CommunityBase[]} */
export const communityBases = [
  {
    id: 'germany',
    country: 'Germany',
    countryCode: 'DE',
    region: REGIONS.EUROPE,
    latitude: 51.0,
    longitude: 10.4,
    size: COMMUNITY_SIZES.LARGE,
    status: COMMUNITY_STATUS.ESTABLISHED,
    labelPlacement: 'top',
    partners: [
      { name: 'Catena-X', url: 'https://catena-x.net' },
      { name: 'ARENA2036', url: 'https://arena2036.de' },
      { name: 'Fraunhofer ISST', url: 'https://www.isst.fraunhofer.de' },
    ],
  },
  {
    id: 'spain',
    country: 'Spain',
    countryCode: 'ES',
    region: REGIONS.EUROPE,
    latitude: 40.3,
    longitude: -2.0,
    size: COMMUNITY_SIZES.LARGE,
    status: COMMUNITY_STATUS.ESTABLISHED,
    labelPlacement: 'bottom',
    partners: [
      { name: 'LKS Next', url: 'https://www.lksnext.com' },
      { name: 'Catena-X Competence Center' },
    ],
  },
  {
    id: 'portugal',
    country: 'Portugal',
    countryCode: 'PT',
    region: REGIONS.EUROPE,
    // Nudged towards the Atlantic so the claim does not cover Spain's.
    latitude: 39.6,
    longitude: -11.5,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.CONTRIBUTORS,
    labelPlacement: 'left',
    partners: [],
  },
  {
    id: 'italy',
    country: 'Italy',
    countryCode: 'IT',
    region: REGIONS.EUROPE,
    // Placed in southern Italy so the claim stays clear of Germany's.
    latitude: 41.2,
    longitude: 15.0,
    size: COMMUNITY_SIZES.EXTRA_SMALL,
    status: COMMUNITY_STATUS.CONTRIBUTORS,
    labelPlacement: 'bottom',
    partners: [],
  },
  {
    id: 'romania',
    country: 'Romania',
    countryCode: 'RO',
    region: REGIONS.EUROPE,
    latitude: 45.9,
    longitude: 24.9,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.CONTRIBUTORS,
    labelPlacement: 'right',
    partners: [],
  },
  {
    id: 'united-kingdom',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: REGIONS.EUROPE,
    latitude: 54.0,
    longitude: -2.5,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.EMERGING,
    labelPlacement: 'left',
    partners: [],
  },
  {
    id: 'united-states',
    country: 'United States',
    countryCode: 'US',
    region: REGIONS.AMERICAS,
    latitude: 39.5,
    longitude: -98.4,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.GROWTH_PENDING,
    partners: [],
  },
  {
    id: 'india',
    country: 'India',
    countryCode: 'IN',
    region: REGIONS.ASIA,
    latitude: 21.0,
    longitude: 78.0,
    size: COMMUNITY_SIZES.MEDIUM,
    status: COMMUNITY_STATUS.PARTNERS,
    labelPlacement: 'left',
    partners: [],
  },
  {
    id: 'bangladesh',
    country: 'Bangladesh',
    countryCode: 'BD',
    region: REGIONS.ASIA,
    latitude: 24.0,
    longitude: 90.5,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.CONTRIBUTORS,
    labelPlacement: 'right',
    partners: [],
  },
  {
    id: 'japan',
    country: 'Japan',
    countryCode: 'JP',
    region: REGIONS.ASIA,
    latitude: 36.5,
    longitude: 138.5,
    size: COMMUNITY_SIZES.SMALL,
    status: COMMUNITY_STATUS.CONTRIBUTORS,
    labelPlacement: 'right',
    partners: [],
  },
  {
    id: 'china',
    country: 'China',
    countryCode: 'CN',
    region: REGIONS.ASIA,
    latitude: 35.0,
    longitude: 104.0,
    size: COMMUNITY_SIZES.MEDIUM,
    status: COMMUNITY_STATUS.IN_PROGRESS,
    labelPlacement: 'top',
    partners: [{ name: 'VDBP', role: PARTNER_ROLES.CONTRIBUTOR }],
  },
];

/** Whether a base is an officially established Tractus-X base. */
export const isEstablishedBase = (base) => base.status === COMMUNITY_STATUS.ESTABLISHED;

/** Whether the community at a base is still pending and hoped to grow. */
export const isPendingBase = (base) => base.status === COMMUNITY_STATUS.GROWTH_PENDING;

/** Order in which regions are listed on the detail page. */
export const REGION_ORDER = [REGIONS.EUROPE, REGIONS.ASIA, REGIONS.AMERICAS, REGIONS.AFRICA, REGIONS.OCEANIA];

/** Country codes of every base, used to draw the highlighted country fills. */
export const getHighlightedCountryCodes = () =>
  Array.from(new Set(communityBases.map((base) => base.countryCode)));

/** Bases grouped by region, in REGION_ORDER, skipping regions without bases. */
export const getBasesByRegion = () =>
  REGION_ORDER.map((region) => ({
    region,
    bases: communityBases.filter((base) => base.region === region),
  })).filter((group) => group.bases.length > 0);

/** Headline numbers shown next to the map. */
export const getBaseStatistics = () => ({
  locations: communityBases.length,
  countries: new Set(communityBases.map((base) => base.countryCode)).size,
  regions: new Set(communityBases.map((base) => base.region)).size,
  partners: communityBases.reduce((total, base) => total + base.partners.length, 0),
});

export default communityBases;
