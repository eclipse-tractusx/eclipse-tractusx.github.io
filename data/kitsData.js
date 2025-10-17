/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

// Import the raw logos
import ConnectorKitLogo from "@site/static/img/kits/connector/connector-kit-raw-logo.svg";
import DataGovernanceLogo from "@site/static/img/kits/data-governance/data-governance-kit-raw-logo.svg";
import DataTrustSecurityLogo from "@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-raw-logo.svg";
import BusinessPartnerLogo from "@site/static/img/kits/business-partner/business-partner-raw-logo.svg";
import IndustryCoreKitLogo from "@site/static/img/kits/industry-core/industry-core-kit-raw-logo.svg";
import DigitalTwinKitLogo from "@site/static/img/kits/digital-twin/digital-twin-kit-raw-logo.svg";
import DataDrivenQualityLogo from "@site/static/img/kits/data-driven-quality-management/data-driven-quality-management-kit-raw-logo.svg";
import TraceabilityKitLogo from "@site/static/img/kits/traceability/traceability-kit-raw-logo.svg";
import DataChainKitLogo from "@site/static/img/kits/data-chain/data-chain-kit-raw-logo.svg";
import EcoPassKitLogo from "@site/static/img/kits/eco-pass/eco-pass-kit-raw-logo.svg";
import PCFKitLogo from "@site/static/img/kits/pcf/pcf-kit-raw-logo.svg";
import PurisKitLogo from "@site/static/img/kits/puris/puris-kit-raw-logo.svg";
import DCMKitLogo from "@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-raw-logo.svg";
import ESSKitLogo from "@site/static/img/kits/ess/ess-kit-raw-logo.svg";
import LogisticsKitLogo from "@site/static/img/kits/logistics/logistics-kit-raw-logo.svg";
import MaaSKitLogo from "@site/static/img/kits/manufacturing-as-a-service/manufacturing-as-a-service-kit-raw-logo.svg";
import ModelBasedProductionLogo from "@site/static/img/kits/model-based-production/model-based-production-kit-raw-logo.svg";
import ModularProductionLogo from "@site/static/img/kits/modular-production/modular-production-kit-raw-logo.svg";
import OSIMKitLogo from "@site/static/img/kits/osim/osim-kit-raw-logo.svg";
import RequirementsKitLogo from "@site/static/img/kits/requirements/requirements-kit-raw-logo.svg";
import SupplyChainDisruptionLogo from "@site/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-raw-logo.svg";

// Kit data with their respective logos, routes, dataspaces, and descriptions
export const kitsData = {
  dataspaceFoundation: [
    {
      id: 'connector',
      name: 'CONNECTOR KIT',
      logo: ConnectorKitLogo,
      route: '/docs-kits/kits/connector-kit/adoption-view/intro',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Eclipse Dataspace Connector for secure and sovereign data exchange in dataspaces'
    },
    {
      id: 'data-governance',
      name: 'DATA GOVERNANCE KIT',
      logo: DataGovernanceLogo,
      route: '/docs-kits/kits/data-governance/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Framework for managing data policies, access control, and compliance across the dataspace'
    },
    {
      id: 'data-trust-security',
      name: 'DATA TRUST & SECURITY KIT',
      logo: DataTrustSecurityLogo,
      route: '/docs-kits/kits/data-trust-and-security/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Security mechanisms, identity management, and trust frameworks for secure data exchange'
    },
    {
      id: 'business-partner',
      name: 'BUSINESS PARTNER KIT',
      logo: BusinessPartnerLogo,
      route: '/docs-kits/kits/business-partner/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Manage and share business partner master data with standardized formats and validation'
    }
  ],
  industryCoreFoundation: [
    {
      id: 'industry-core',
      name: 'INDUSTRY CORE KIT',
      logo: IndustryCoreKitLogo,
      route: '/docs-kits/kits/industry-core/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Core data models, semantic standards, and APIs for industry-specific data exchange'
    },
    {
      id: 'digital-twin',
      name: 'DIGITAL TWIN KIT',
      logo: DigitalTwinKitLogo,
      route: '/docs-kits/kits/digital-twin/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Create and manage digital representations of physical assets across the supply chain'
    },
    {
      id: 'data-driven-quality',
      name: 'DATA DRIVEN QUALITY KIT',
      logo: DataDrivenQualityLogo,
      route: '/docs-kits/kits/data-driven-quality/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Data-driven quality management and analytics for proactive issue detection and resolution'
    },
    {
      id: 'traceability',
      name: 'TRACEABILITY KIT',
      logo: TraceabilityKitLogo,
      route: '/docs-kits/kits/traceability/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'End-to-end traceability of parts and materials across the entire supply chain'
    },
    {
      id: 'pcf',
      name: 'PRODUCT CARBON FOOTPRINT KIT',
      logo: PCFKitLogo,
      route: '/docs-kits/kits/pcf/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Calculate, exchange, and track product carbon footprints throughout the value chain'
    },
    {
      id: 'data-chain',
      name: 'DATA CHAIN KIT',
      logo: DataChainKitLogo,
      route: '/docs-kits/kits/data-chain/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X', 'Semiconductor-X'],
      description: 'Chain data efficiently across partners with standardized protocols and workflows'
    }
  ],
  useCases: [
    {
      id: 'ess',
      name: 'ESS KIT',
      logo: ESSKitLogo,
      route: '/docs-kits/kits/ess/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Environmental and Social Standards compliance monitoring and reporting across supply chains'
    },
    {
      id: 'eco-pass',
      name: 'ECO PASS KIT',
      logo: EcoPassKitLogo,
      route: '/docs-kits/kits/eco-pass/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'Digital product passports with environmental data and sustainability metrics'
    },
    {
      id: 'puris',
      name: 'PURIS KIT',
      logo: PurisKitLogo,
      route: '/docs-kits/kits/puris/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Predictive Unit Real-time Information Service for supply chain visibility and optimization'
    },
    {
      id: 'dcm',
      name: 'DEMAND & CAPACITY MANAGEMENT KIT',
      logo: DCMKitLogo,
      route: '/docs-kits/kits/dcm/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Balance supply and demand across networks with real-time capacity monitoring'
    },
    {
      id: 'logistics',
      name: 'LOGISTICS KIT',
      logo: LogisticsKitLogo,
      route: '/docs-kits/kits/logistics/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X'],
      description: 'Logistics and transportation management for efficient supply chain operations'
    },
    {
      id: 'maas',
      name: 'MANUFACTURING AS A SERVICE KIT',
      logo: MaaSKitLogo,
      route: '/docs-kits/kits/maas/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Manufacturing services marketplace for on-demand production capabilities'
    },
    {
      id: 'model-based-production',
      name: 'MODEL BASED PRODUCTION KIT',
      logo: ModelBasedProductionLogo,
      route: '/docs-kits/kits/model-based-production/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Model-based development and data processing for advanced manufacturing'
    },
    {
      id: 'modular-production',
      name: 'MODULAR PRODUCTION KIT',
      logo: ModularProductionLogo,
      route: '/docs-kits/kits/modular-production/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Flexible and modular production systems for adaptive manufacturing'
    },
    {
      id: 'osim',
      name: 'ONLINE SIMULATION KIT',
      logo: OSIMKitLogo,
      route: '/docs-kits/kits/osim/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Real-time simulation and modeling capabilities for production optimization'
    },
    {
      id: 'requirements',
      name: 'REQUIREMENTS KIT',
      logo: RequirementsKitLogo,
      route: '/docs-kits/kits/requirements/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Requirements management and tracking across dataspaces and organizations'
    },
    {
      id: 'supply-chain-disruption',
      name: 'SUPPLY CHAIN DISRUPTION NOTIFICATION KIT',
      logo: SupplyChainDisruptionLogo,
      route: '/docs-kits/kits/supply-chain-disruption/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Monitor and manage supply chain disruptions with real-time notifications and alerts'
    }
  ]
};
