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
 * A "base" is a country where the project has an established community
 * presence: contributors, committers, adopters and partner organizations that
 * build, run and promote Tractus-X locally.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD A BASE
 * ---------------------------------------------------------------------------
 * Append an entry to `communityBases` below. Only `latitude`/`longitude` drive
 * the position on the map, so nothing else needs to be touched to place a new
 * marker.
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
 * @property {boolean} [homeBase] - Marks the project's home base (rendered in brand colours).
 * @property {'bottom'|'top'|'left'|'right'} [labelPlacement] - Where the map label sits
 * relative to the marker; use it to keep crowded regions readable. Defaults to 'bottom'.
 * @property {string} description - One or two sentences about the local community.
 * @property {string[]} [focus] - Short topic tags describing the local focus.
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
    homeBase: true,
    labelPlacement: 'right',
    description:
      'The home base of Eclipse Tractus-X. Most of the project committers, the release train and the Community Days are anchored here, together with the automotive and manufacturing organizations that started the dataspace.',
    focus: ['Release train', 'Community Days', 'KIT maintenance'],
    partners: [],
  },
  {
    id: 'spain',
    country: 'Spain',
    countryCode: 'ES',
    region: REGIONS.EUROPE,
    latitude: 40.3,
    longitude: -3.7,
    description:
      'A growing base of contributors and adopters bringing Tractus-X into the Spanish manufacturing and mobility ecosystem.',
    focus: ['Adoption', 'Contributions'],
    partners: [],
  },
  {
    id: 'united-kingdom',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: REGIONS.EUROPE,
    latitude: 54.0,
    longitude: -2.5,
    labelPlacement: 'left',
    description:
      'Community members driving dataspace adoption and standards alignment across the UK industry landscape.',
    focus: ['Adoption', 'Standards'],
    partners: [],
  },
  {
    id: 'united-states',
    country: 'United States',
    countryCode: 'US',
    region: REGIONS.AMERICAS,
    latitude: 39.5,
    longitude: -98.4,
    description:
      'Our bridgehead in North America, connecting Tractus-X with the North American automotive and supply chain ecosystem.',
    focus: ['Adoption', 'Ecosystem outreach'],
    partners: [],
  },
  {
    id: 'india',
    country: 'India',
    countryCode: 'IN',
    region: REGIONS.ASIA,
    latitude: 21.0,
    longitude: 78.0,
    labelPlacement: 'left',
    description:
      'One of our largest contributor communities, with engineering teams working across KITs, reference implementations and the release train.',
    focus: ['Engineering', 'Reference implementations'],
    partners: [],
  },
  {
    id: 'bangladesh',
    country: 'Bangladesh',
    countryCode: 'BD',
    region: REGIONS.ASIA,
    latitude: 24.0,
    longitude: 90.5,
    labelPlacement: 'right',
    description:
      'A young and fast-growing base of developers contributing to Tractus-X components and tooling.',
    focus: ['Engineering', 'Tooling'],
    partners: [],
  },
  {
    id: 'japan',
    country: 'Japan',
    countryCode: 'JP',
    region: REGIONS.ASIA,
    latitude: 36.5,
    longitude: 138.5,
    labelPlacement: 'right',
    description:
      'Community members bringing Tractus-X into the Japanese automotive and manufacturing ecosystem, and connecting it with the local dataspace initiatives.',
    focus: ['Adoption', 'Ecosystem outreach'],
    partners: [],
  },
  {
    id: 'china',
    country: 'China',
    countryCode: 'CN',
    region: REGIONS.ASIA,
    latitude: 35.0,
    longitude: 104.0,
    labelPlacement: 'top',
    description:
      'Community members connecting Tractus-X with the Chinese automotive and manufacturing ecosystem.',
    focus: ['Adoption', 'Ecosystem outreach'],
    partners: [],
  },
];

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
