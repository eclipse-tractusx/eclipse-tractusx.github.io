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
import Circularity_Kit from "@site/static/img/kits/circularity/circularity-kit-gallery.drawio.svg";
import Connector_Kit from "@site/static/img/kits/connector/connector-kit-gallery.drawio.svg";
import DataChain_Kit from "@site/static/img/kits/data-chain/data-chain-kit-gallery.drawio.svg";
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


// import MoreToCome from "@site/static/img/gallery-more_coming-minified.png";

//************************** IMPORTANT **************************** */

// WHEN DEFINING A "DOMAIN" IN THE kitsGallery ARRAY, MAKE SURE TO SELECT/TYPE EXACTLY AS BELOW:
// * Industry Core
// * Network Services
// * PLM / Quality
// * Resiliency
// * Sustainability
// * Engineering

//**************************************************************** */

export const kitsGallery = [
  {
    id: 1,
    name: 'Business Partner Kit',
    domain: 'Network Services',
    img: Business_Kit,
    pageRoute: "/docs-kits/kits/Business Partner Kit/Adoption View"
  },
  {
    id: 2,
    name: 'Data Chain Kit',
    domain: 'Industry Core',
    img: DataChain_Kit,
    pageRoute: "/docs-kits/kits/Data%20Chain%20Kit/Adoption%20View%20Data%20Chain%20Kit"
  },
  {
    id: 3,
    name: 'Connector Kit',
    domain: 'Network Services',
    img: Connector_Kit,
    pageRoute: "/docs-kits/kits/Connector%20Kit/Adoption%20View/connector_kit_adoption_view"
  },
  {
    id: 4,
    name: 'Traceability Kit',
    domain: 'PLM / Quality',
    img: Traceability_Kit,
    pageRoute: "/docs-kits/kits/Traceability Kit/Business View Traceability Kit"
  },
  {
    id: 5,
    name: 'Behaviour Twin Kit',
    domain: 'Engineering',
    img: BehaviourTwin_Kit,
    pageRoute: "/docs-kits/kits/behaviour-twin-kit/overview"
  },
  {
    id: 6,
    name: 'Digital Twin Kit',
    domain: 'Industry Core',
    img: DigitalTwin,
    pageRoute: "/docs-kits/kits/Digital%20Twin%20Kit/Adoption%20View%20Digital%20Twin%20Kit"
  },
  {
    id: 7,
    name: 'Eco Pass Kit',
    domain: 'Sustainability',
    img: EcoPass,
    pageRoute: "/docs-kits/kits/Eco_Pass_KIT/page-adoption-view"
  },
  {
    id: 8,
    name: 'Online Simulation Kit',
    domain: 'Resiliency',
    img: OnlineSimulation,
    pageRoute: "/docs-kits/kits/OSim%20Kit/Adoption%20View%20OSim%20Kit"
  },
  {
    id: 9,
    name: 'Data Driven Quality Management Kit',
    domain: 'PLM / Quality',
    img: DDQM,
    pageRoute: "/docs-kits/kits/Quality-Kit/Adoption%20View%20Quality%20Kit"
  },
  {
    id: 10,
    name: 'Agents Kit',
    domain: 'Network Services',
    img: Agents_Kit,
    pageRoute: "/docs-kits/kits/knowledge-agents/adoption-view/intro"
  },
  {
    id: 11,
    name: 'Circularity Kit',
    domain: 'Sustainability',
    img: Circularity_Kit,
    pageRoute: "/docs-kits/kits/Circularity_KIT/page-adoption-view"
  },
  {
    id: 12,
    name: 'DCM Kit',
    domain: 'Resiliency',
    img: DemandandCapacityManagement_Kit,
    pageRoute: "/docs-kits/kits/Demand%20and%20Capacity%20Management%20Kit/adoption-view/overview"
  },
  {
    id: 13,
    name: 'Modular Production Kit',
    domain: 'Resiliency',
    img: ModularProduction_Kit,
    pageRoute: "/docs-kits/kits/Modular%20Production%20Kit/Adoption%20View%20Modular%20Production%20Kit"
  },
  {
    id: 14,
    name: 'PCF Kit',
    domain: 'Sustainability',
    img: PCF_Kit,
    pageRoute: "/docs-kits/kits/PCF%20Exchange%20Kit/Adoption%20View"
  },
  {
    id: 15,
    name: 'Manufacturing as a Service Kit',
    domain: 'Resiliency',
    img: Maas_Kit,
    pageRoute: "/docs-kits/kits/Manufacturing%20as%20a%20Service%20Kit/Adoption%20View%20MaaS%20Kit"
  },
  {
    id: 16,
    name: 'ESS Kit',
    domain: 'Sustainability',
    img: ESS_Kit,
    pageRoute: "/docs-kits/kits/ESS-Kit/ESS%20Kit%20Adoption%20View"
  },
  {
    id: 17,
    name: "Industry Core Kit",
    domain: 'Industry Core',
    img: Industry_Kit,
    pageRoute: "/docs-kits/kits/Industry%20Core%20Kit/Business%20View%20Industry%20Core%20Kit"
  },
  {
    id: 18,
    name: 'PURIS Kit',
    domain: 'Resiliency',
    pageRoute: '/docs-kits/kits/PURIS%20Kit/Adoption%20View%20PURIS%20Kit',
    img: PURIS_Kit,
  },
  {
    id: 19,
    name: 'Supply Chain Disruption Notifications KIT',
    domain: 'Resiliency',
    pageRoute: '/docs-kits/next/kits/Supply%20Chain%20Disruption%20Notifications%20KIT/Adoption%20View%20PURIS-DCM%20Supply%20Chain%20Disruption%20Notifications',
    img: SupplyChainsDisruptionNotifications_Kit,
  },
  {
    id: 20,
    name: 'Model Based Production KIT',
    domain: 'Engineering',
    pageRoute: '/docs-kits/kits/Behaviour%20Twin%20MDP%20Kit/page_adoption-view',
    img: MBP_Kit,
  },
  {
    id: 21,
    name: 'Logistics KIT',
    domain: 'PLM / Quality',
    pageRoute: 'docs-kits/kits/Logistics%20Kit/page_adoption-view.md',
    img: Logistics_Kit,
  },
]
