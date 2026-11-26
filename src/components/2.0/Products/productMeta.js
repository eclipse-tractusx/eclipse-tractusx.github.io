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

// Shared presentation metadata (icons, labels, helpers) for the Open Source Software pages.

import routes from '@generated/routes';
import AppsIcon from '@mui/icons-material/AppsRounded';
import HubIcon from '@mui/icons-material/HubRounded';
import FactoryIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import ScienceIcon from '@mui/icons-material/ScienceRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenterOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import CodeIcon from '@mui/icons-material/CodeRounded';
import DnsIcon from '@mui/icons-material/DnsOutlined';
import ApartmentIcon from '@mui/icons-material/ApartmentOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined';
import ExtensionIcon from '@mui/icons-material/ExtensionOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheckOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LanIcon from '@mui/icons-material/LanOutlined';
import WebIcon from '@mui/icons-material/WebOutlined';
import DataObjectIcon from '@mui/icons-material/DataObjectOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';
import SlideshowIcon from '@mui/icons-material/SlideshowOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import { products, productCategories, productKinds, maturityLevels } from '@site/data/productsData';

export const CATEGORY_ICONS = {
  'use-cases': AppsIcon,
  'dataspace-foundation': HubIcon,
  'industry-core-foundation': FactoryIcon,
  'qa-testing-tools': ScienceIcon,
};

// Header backgrounds from the Eclipse Tractus-X background set (static/img/backgrounds).
export const HERO_BACKGROUNDS = {
  overview: '/img/backgrounds/tx-bg-horizon.jpg',
  detail: '/img/backgrounds/tx-bg-subtle-ember.jpg',
  'use-cases': '/img/backgrounds/tx-bg-dual-glow.jpg',
  'dataspace-foundation': '/img/backgrounds/tx-bg-fold.jpg',
  'industry-core-foundation': '/img/backgrounds/tx-bg-fold-green.jpg',
  'qa-testing-tools': '/img/backgrounds/tx-bg-fold-ember.jpg',
};

export const AUDIENCE_ICONS = {
  business: BusinessCenterIcon,
  providers: StorefrontIcon,
  developers: CodeIcon,
  operators: DnsIcon,
  participants: ApartmentIcon,
  builders: ExtensionIcon,
  suppliers: LocalShippingIcon,
  testers: FactCheckIcon,
  devops: SettingsSuggestIcon,
  dataProviders: UploadFileIcon,
};

export const KIND_ICONS = {
  'operating-service': DnsIcon,
  'participant-component': LanIcon,
  application: WebIcon,
  library: DataObjectIcon,
  tooling: BuildIcon,
  demonstrator: SlideshowIcon,
  documentation: MenuBookIcon,
};

export function getKind(kindId) {
  return productKinds.find((kind) => kind.id === kindId);
}

/** The kinds of a product, its main kind first (`kind` is one id or a list of ids). */
export function getKinds(product) {
  return [].concat(product.kind || []);
}

export function getMaturity(levelId) {
  return maturityLevels.find((level) => level.id === levelId);
}

const MATURITY_ORDER = maturityLevels.map((level) => level.id);

/** Products in kind order, and inside a kind by maturity (deprecated last), then by name. */
export function sortProducts(list) {
  const kindOrder = productKinds.map((kind) => kind.id);
  return [...list].sort(
    (a, b) =>
      kindOrder.indexOf(getKinds(a)[0]) - kindOrder.indexOf(getKinds(b)[0]) ||
      MATURITY_ORDER.indexOf(a.maturity) - MATURITY_ORDER.indexOf(b.maturity) ||
      a.name.localeCompare(b.name),
  );
}

/** The products of a list grouped by kind, in kind order; kinds without products are left out. */
export function groupByKind(list) {
  return productKinds
    .map((kind) => ({
      ...kind,
      items: sortProducts(list.filter((product) => getKinds(product)[0] === kind.id)),
    }))
    .filter((group) => group.items.length > 0);
}

export function getCategory(categoryId) {
  return productCategories.find((category) => category.id === categoryId);
}

export function getDetailUrl(product) {
  return `/Products/detail?id=${product.id}`;
}

export function getStatistics(list = products) {
  const repositories = new Set();
  const committers = new Set();
  list.forEach((product) => {
    product.repositories.forEach((repository) => repositories.add(repository.name));
    product.committers.forEach((committer) => committers.add(committer.github));
  });
  return {
    products: list.length,
    repositories: repositories.size,
    committers: committers.size,
    agents: new Set(list.flatMap((product) => product.agents.map((agent) => agent.id))).size,
  };
}

function hasRoute(list, path) {
  return list.some((route) => route.path === path || (route.routes && hasRoute(route.routes, path)));
}

/**
 * True when this build has a page at `path`. Used for links into pages that come with
 * other pull requests (the AI agent profiles), so the link appears once that page exists.
 */
export function routeExists(path) {
  return hasRoute(routes, path);
}

export function matchesSearch(product, query) {
  if (!query) return true;
  return [
    product.name,
    product.subtitle,
    product.description,
    ...getKinds(product).map((kindId) => getKind(kindId)?.label),
    getMaturity(product.maturity)?.label,
    ...product.repositories.map((repository) => repository.name),
    ...product.committers.map((committer) => `${committer.name || ''} ${committer.github}`),
    ...product.agents.map((agent) => agent.name),
  ]
    .join(' ')
    .toLowerCase()
    .includes(query);
}
