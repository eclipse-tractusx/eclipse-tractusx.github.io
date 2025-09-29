/*********************************************************************************
 * Copyright (c) 2023, 2024 Contributors to the Eclipse Foundation
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

import Agents_Kit from "@site/static/img/kits/agents/agents-kit-gallery.drawio.svg";
import BehaviourTwin_Kit from "@site/static/img/kits/behavior-twin/behavior-twin-kit-gallery.drawio.svg";
import Business_Kit from "@site/static/img/kits/business-partner/business-partner-gallery.drawio.svg";
import Customs_Kit from "@site/static/img/kits/customs/customs-gallery.drawio.svg";
import Circularity_Kit from "@site/static/img/kits/circularity/circularity-kit-gallery.drawio.svg";
import Connector_Kit from "@site/static/img/kits/connector/connector-kit-gallery.drawio.svg";
import DataChain_Kit from "@site/static/img/kits/data-chain/data-chain-kit-gallery.drawio.svg";
import DataGovernance_Kit from "@site/static/img/kits/data-governance/data-governance-kit-gallery.drawio.svg";
import DDQM from "@site/static/img/kits/data-driven-quality-management/data-driven-quality-management-kit-gallery.drawio.svg";
import DemandandCapacityManagement_Kit from "@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-gallery.drawio.svg";
import DigitalTwin from "@site/static/img/kits/digital-twin/digital-twin-kit-gallery.drawio.svg";
import EcoPass from "@site/static/img/kits/eco-pass/eco-pass-kit-gallery.drawio.svg";
import ESS_Kit from "@site/static/img/kits/ess/ess-kit-gallery.drawio.svg";
import Industry_Kit from "@site/static/img/kits/industry-core/industry-core-kit-gallery.drawio.svg";
import Logistics_Kit from "@site/static/img/kits/logistics/logistics-gallery.drawio.svg";
import Maas_Kit from "@site/static/img/kits/manufacturing-as-a-service/maas-kit-gallery.drawio.svg";
import MBP_Kit from "@site/static/img/kits/model-based-production/model-based-production-kit-gallery.drawio.svg";
import ModularProduction_Kit from "@site/static/img/kits/modular-production/modular-production-kit-gallery.drawio.svg";
import OnlineSimulation from "@site/static/img/kits/osim/osim-kit-gallery.drawio.svg";
import PCF_Kit from "@site/static/img/kits/pcf/pcf-kit-gallery.drawio.svg";
import PURIS_Kit from '@site/static/img/kits/puris/puris-kit-gallery.drawio.svg';
import SupplyChainsDisruptionNotifications_Kit from "@site/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-gallery.drawio.svg";
import Traceability_Kit from "@site/static/img/kits/traceability/traceability-kit-gallery.drawio.svg";
import DataTrustAndSecurity from "@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-gallery.svg";
import Requirement_Kit from "@site/static/img/kits/requirements/requirements/requirements-kit-gallery.svg";

// import MoreToCome from "@site/static/img/gallery-more_coming-minified.png";

//************************** IMPORTANT **************************** */

// WHEN DEFINING A "DOMAIN" IN THE kitsGallery ARRAY, MAKE SURE TO SELECT/TYPE EXACTLY AS BELOW:
// * Engineering
// * Industry Core
// * Manufacturing
// * Network Services
// * Quality
// * Supply Chain
// * Sustainability
// * Engineering

//**************************************************************** */

export const kitsGallery = [
  {
    id: 1,
    name: 'Business Partner KIT',
    domain: 'Network Services',
    img: Business_Kit,
    pageRoute: "/docs-kits/kits/business-partner-kit/adoption-view",
  },
  {
    id: 2,
    name: 'Data Chain KIT',
    domain: 'Industry Core',
    img: DataChain_Kit,
    pageRoute: "/docs-kits/kits/data-chain-kit/adoption-view",
  },
  {
    id: 3,
    name: 'Connector KIT',
    domain: 'Network Services',
    img: Connector_Kit,
    pageRoute: "/docs-kits/kits/connector-kit/adoption-view",
  },
  {
    id: 4,
    name: 'Traceability KIT',
    domain: 'Quality',
    img: Traceability_Kit,
    pageRoute: "/docs-kits/kits/traceability-kit/adoption-view",
  },
  {
    id: 5,
    name: 'Behaviour Twin KIT',
    domain: 'Engineering',
    img: BehaviourTwin_Kit,
    pageRoute: "/docs-kits/kits/behaviour-twin-kit/overview",
  },
  {
    id: 6,
    name: 'Digital Twin KIT',
    domain: 'Industry Core',
    img: DigitalTwin,
    pageRoute: "/docs-kits/kits/digital-twin-kit/adoption-view",
  },
  {
    id: 7,
    name: 'Eco Pass KIT',
    domain: 'Sustainability',
    img: EcoPass,
    pageRoute: "/docs-kits/kits/eco-pass-kit/adoption-view",
  },
  {
    id: 8,
    name: 'Online Simulation KIT',
    domain: 'Supply Chain',
    img: OnlineSimulation,
    pageRoute: "/docs-kits/kits/online-simulation-kit/adoption-view",
  },
  {
    id: 9,
    name: 'Data Driven Quality Management KIT',
    domain: 'Quality',
    img: DDQM,
    pageRoute: "/docs-kits/kits/data-driven-quality-management-kit/adoption-view",
  },
  {
    id: 10,
    name: 'Knowledge Agents KIT',
    domain: 'Network Services',
    img: Agents_Kit,
    pageRoute: "/docs-kits/kits/knowledge-agents-kit/adoption-view/intro",
  },
  {
    id: 11,
    name: 'Circularity KIT',
    domain: 'Sustainability',
    img: Circularity_Kit,
    pageRoute: "/docs-kits/kits/circularity-kit/adoption-view",
  },
  {
    id: 12,
    name: 'Demand and Capacity Management KIT',
    domain: 'Supply Chain',
    img: DemandandCapacityManagement_Kit,
    pageRoute: "/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview",
  },
  {
    id: 13,
    name: 'Modular Production KIT',
    domain: 'Manufacturing',
    img: ModularProduction_Kit,
    pageRoute: "/docs-kits/kits/modular-production-kit/adoption-view",
  },
  {
    id: 14,
    name: 'Product Carbon Footprint Exchange KIT',
    domain: 'Sustainability',
    img: PCF_Kit,
    pageRoute: "/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view",
  },
  {
    id: 15,
    name: 'Manufacturing as a Service KIT',
    domain: 'Manufacturing',
    img: Maas_Kit,
    pageRoute: "/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view",
  },
  {
    id: 16,
    name: 'Environmental and Social Standards KIT',
    domain: 'Sustainability',
    img: ESS_Kit,
    pageRoute: "/docs-kits/kits/environmental-and-social-standards-kit/adoption-view",
  },
  {
    id: 17,
    name: "Industry Core KIT",
    domain: 'Industry Core',
    img: Industry_Kit,
    pageRoute: "/docs-kits/kits/industry-core-kit/adoption-view",
  },
  {
    id: 18,
    name: 'Predictive Unit Real-Time Information Service KIT',
    domain: 'Supply Chain',
    pageRoute: "/docs-kits/kits/puris-kit/adoption-view",
    img: PURIS_Kit,
  },
  {
    id: 19,
    name: 'Supply Chain Disruption Notifications KIT',
    domain: 'Supply Chain',
    pageRoute: "/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view",
    img: SupplyChainsDisruptionNotifications_Kit,
  },
  {
    id: 20,
    name: 'Model Based Development KIT',
    domain: 'Engineering',
    pageRoute: "/docs-kits/kits/model-based-development-and-data-processing-kit/adoption-view",
    img: MBP_Kit,
  },
  {
    id: 21,
    name: 'Logistics KIT',
    domain: 'Supply Chain',
    pageRoute: "/docs-kits/kits/logistics-kit/adoption-view",
    img: Logistics_Kit,
  },
  {
    id: 22,
    name: 'Data Governance KIT',
    domain: 'Network Services',
    pageRoute: "/docs-kits/kits/data-governance-kit/adoption-view",
    img: DataGovernance_Kit,
  },
  {
    id: 23,
    name: 'Customs KIT',
    domain: 'Supply Chain',
    pageRoute: "/docs-kits/kits/customs-kit/adoption-view",
    img: Customs_Kit,
  },
  {
    id: 24,
    name: 'Data Trust and Security KIT',
    domain: 'Network Services',
    pageRoute: "/docs-kits/next/kits/data-trust-and-security-kit/adoption-view",
    img: DataTrustAndSecurity,
  },
    {
    id: 25,
    name: 'Requirement KIT',
    domain: 'Engineering',
    img: Requirement_Kit,
    pageRoute: "/docs-kits/kits/requirement-kit/adoption-view",
  }
]
