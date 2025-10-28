/********************************************************************************* 
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 * 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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


/*

KIT MASTER DATA

In this file you will find all the master data for the KITs presented in the Kits Gallery and other places.
For each KIT the information model is the following:

    {
      id: '<unique-kit-id>',
      name: '<KIT NAME IN UPPERCASE>',
      logo: <kit logo class>,
      logoHeight: <logo_height>,
      logoWidth: <logo_width>,
      route: '<route-to-the-kit-adoption-view>',
      colors: {
        primary: <primary color in hex>,
        gradient: 'linear-gradient(135deg, <lighter primary color in hex> 0%, <primary color in hex> 100%)'
      },
      maturity: {
        currentLevel: '<graduation-level> (Sandbox, Incubation, Graduated)',
        graduationStatus: '<graduation_status>' ('Draft' | 'In Progress' | 'In Review' | 'No Further Development' )
      },
      deprecated: <status boolean  true|false >
      dataspaces: [<list of dataspaces where the kit is used>],
      description: '<kit description>'
    }

Depending on the logic category from the KIT feel free to place it under one of the following sections
*/

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
import AgentsKitLogo from "@site/static/img/kits/agents/agents-kit-raw-logo.svg";
import BehaviorTwinKitLogo from "@site/static/img/kits/behavior-twin/behavior-twin-kit-raw-logo.svg";
import CircularityKitLogo from "@site/static/img/kits/circularity/circularity-kit-raw-logo.svg";
import CustomsKitLogo from "@site/static/img/kits/customs/customs-kit-raw-logo.svg";

// Categories with their corresponding CSS class names and colors

// Kit data with their respective logos, routes, dataspaces, and descriptions
export const kitsData = {
  dataspaceFoundation: [
    {
      id: 'connector',
      name: 'CONNECTOR KIT',
      logo: ConnectorKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/connector-kit/adoption-view',
      colors: {
        primary: '#2316E3',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #2316E3 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Eclipse Dataspace Connector for secure and sovereign data exchange in dataspaces'
    },
    {
      id: 'data-governance',
      name: 'DATA GOVERNANCE KIT',
      logo: DataGovernanceLogo,
      logoHeight: 90,
      logoWidth: 90,
      route: '/docs-kits/kits/data-governance-kit/adoption-view',
      colors: {
        primary: '#1E13C2',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #1E13C2 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Framework for managing data policies, access control, and compliance across the dataspace'
    },
    {
      id: 'data-trust-security',
      name: 'DATA TRUST & SECURITY KIT',
      logo: DataTrustSecurityLogo,
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/data-trust-and-security-kit/adoption-view',
      colors: {
        primary: '#2A1FB3',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #2A1FB3 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in progress'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Security mechanisms, identity management, and trust frameworks for secure data exchange'
    },
    {
      id: 'business-partner',
      name: 'BUSINESS PARTNER KIT',
      logo: BusinessPartnerLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/business-partner-kit/adoption-view',
      colors: {
        primary: '#1E13C2',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #1E13C2 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X','Construct-X', 'Chem-X'],
      description: 'Manage and share business partner master data with standardized formats and validation'
    },
    {
      id: 'agents',
      name: 'KNOWLEDGE AGENTS KIT',
      logo: AgentsKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/knowledge-agents-kit/adoption-view/intro',
      colors: {
        primary: '#2718FA',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #2718FA 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Federated queries and knowledge graphs for intelligent data discovery and reasoning'
    }
  ],
  industryCoreFoundation: [
    {
      id: 'digital-twin',
      name: 'DIGITAL TWIN KIT',
      logo: DigitalTwinKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/digital-twin-kit/adoption-view',
      colors: {
        primary: '#EA3650',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EA3650 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Create and manage digital representations of physical assets across the supply chain'
    },
    {
      id: 'industry-core',
      name: 'INDUSTRY CORE KIT',
      logo: IndustryCoreKitLogo,
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/industry-core-kit/adoption-view',
      colors: {
        primary: '#EC4A61',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EC4A61 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Construct-X', 'Chem-X'],
      description: 'Core data models, semantic standards, and APIs for industry-specific data exchange'
    },
    {
      id: 'data-chain',
      name: 'DATA CHAIN KIT',
      logo: DataChainKitLogo,
      logoHeight: 90,
      logoWidth: 90,
      route: '/docs-kits/kits/data-chain-kit/adoption-view',
      colors: {
        primary: '#EB4877',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EB4877 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Chain data efficiently across partners with standardized protocols and workflows'
    },
    {
      id: 'data-driven-quality',
      name: 'DATA DRIVEN QUALITY KIT',
      logo: DataDrivenQualityLogo,
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/data-driven-quality-management-kit/adoption-view',
      colors: {
        primary: '#EE6A28',
        gradient: 'linear-gradient(135deg, #FFBD59 0%, #EE6A28 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in review'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Data-driven quality management and analytics for proactive issue detection and resolution'
    },
    {
      id: 'traceability',
      name: 'TRACEABILITY KIT',
      logo: TraceabilityKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/traceability-kit/adoption-view',
      colors: {
        primary: '#F45D3C',
        gradient: 'linear-gradient(135deg, #FFBD59 0%, #F45D3C 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'End-to-end traceability of parts and materials across the entire supply chain'
    },
    {
      id: 'behavior-twin',
      name: 'BEHAVIOUR TWIN KIT',
      logo: BehaviorTwinKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/behaviour-twin-kit/overview',
      colors: {
        primary: '#FFA601',
        gradient: 'linear-gradient(135deg, #FFC357 0%, #FFA601 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in progress'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Behavioral models and simulation capabilities for predictive analysis and optimization'
    }
  ],
  useCases: [
    {
      id: 'ess',
      name: 'ESS KIT',
      logo: ESSKitLogo,
      logoHeight: 90,
      logoWidth: 90,
      route: '/docs-kits/kits/environmental-and-social-standards-kit/adoption-view',
      colors: {
        primary: '#2B9943',
        gradient: 'linear-gradient(135deg, #66C791 0%, #2B9943 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Environmental and Social Standards compliance monitoring and reporting across supply chains'
    },
    {
      id: 'pcf',
      name: 'PRODUCT CARBON FOOTPRINT KIT',
      logo: PCFKitLogo,
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view',
      colors: {
        primary: '#368C7D',
        gradient: 'linear-gradient(135deg, #66C791 0%, #368C7D 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Calculate, exchange, and track product carbon footprints throughout the value chain'
    },
    {
      id: 'eco-pass',
      name: 'ECO PASS KIT',
      logo: EcoPassKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/eco-pass-kit/adoption-view',
      colors: {
        primary: '#267063',
        gradient: 'linear-gradient(135deg, #66C791 0%, #267063 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in review'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Digital product passports with environmental data and sustainability metrics'
    },
    {
      id: 'circularity',
      name: 'CIRCULARITY KIT',
      logo: CircularityKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/circularity-kit/adoption-view',
      colors: {
        primary: '#41891F',
        gradient: 'linear-gradient(135deg, #66C791 0%, #41891F 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in review'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Circular economy principles and material flow tracking for sustainable manufacturing'
    },
    {
      id: 'puris',
      name: 'PURIS KIT',
      logo: PurisKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/puris-kit/adoption-view',
      colors: {
        primary: '#A159FF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #A159FF 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Predictive Unit Real-time Information Service for supply chain visibility and optimization'
    },
    {
      id: 'dcm',
      name: 'DEMAND & CAPACITY MANAGEMENT KIT',
      logo: DCMKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview',
      colors: {
        primary: '#B95EFF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #B95EFF 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Balance supply and demand across networks with real-time capacity monitoring'
    },
    {
      id: 'logistics',
      name: 'LOGISTICS KIT',
      logo: LogisticsKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/logistics-kit/adoption-view',
      colors: {
        primary: '#B95EFF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #B95EFF 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Logistics and transportation management for efficient supply chain operations'
    },
    {
      id: 'supply-chain-disruption',
      name: 'SUPPLY CHAIN DISRUPTION NOTIFICATION KIT',
      logo: SupplyChainDisruptionLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view',
      colors: {
        primary: '#9653ED',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #9653ED 100%)'
      },
      maturity: {
        currentLevel: 'Graduated'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Monitor and manage supply chain disruptions with real-time notifications and alerts'
    },
    {
      id: 'customs',
      name: 'CUSTOMS KIT',
      logo: CustomsKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/customs-kit/adoption-view',
      colors: {
        primary: '#B95EFF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #B95EFF 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Customs and trade compliance management with automated documentation and reporting'
    },
      {
      id: 'osim',
      name: 'ONLINE SIMULATION KIT',
      logo: OSIMKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/online-simulation-kit/adoption-view',
      colors: {
        primary: '#AB6BFF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #AB6BFF 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Real-time simulation and modeling capabilities for production optimization'
    },
    {
      id: 'model-based-production',
      name: 'MODEL BASED PRODUCTION KIT',
      logo: ModelBasedProductionLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/model-based-development-and-data-processing-kit/adoption-view',
      colors: {
        primary: '#FEBC02',
        gradient: 'linear-gradient(135deg, #FFC357 0%, #FEBC02 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Model-based development and data processing for advanced manufacturing'
    },
    {
      id: 'requirements',
      name: 'REQUIREMENTS KIT',
      logo: RequirementsKitLogo,
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/requirements-kit/adoption-view',
      colors: {
        primary: '#e4a4de',
        gradient: 'linear-gradient(135deg, #e4a4de 0%, #ac23a7 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Requirements management and tracking across dataspaces and organizations'
    },
    {
      id: 'maas',
      name: 'MANUFACTURING AS A SERVICE KIT',
      logo: MaaSKitLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view',
      colors: {
        primary: '#A098A4',
        gradient: 'linear-gradient(135deg, rgba(160, 152, 164, 1) 0%, rgba(64, 64, 64, 1) 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Manufacturing services marketplace for on-demand production capabilities'
    },
    {
      id: 'modular-production',
      name: 'MODULAR PRODUCTION KIT',
      logo: ModularProductionLogo,
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/modular-production-kit/adoption-view',
      colors: {
        primary: '#A098A4',
        gradient: 'linear-gradient(135deg, rgba(160, 152, 164, 1) 0%, rgba(64, 64, 64, 1) 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'in progress'
      },
      deprecated: false,
      dataspaces: ['Factory-X'],
      description: 'Flexible and modular production systems for adaptive manufacturing'
    }
  ],
  // List here the industry/dataspace specific KITs (will not be shown in the cross dataspace use cases gallery)
  dataspaceKits: {
      "Factory-X": [],
      "Semiconductor-X": [],
      "Construct-X": [],
      "Chem-X": [],
      "Catena-X": []
    }
};





// Utility functions for working with individual kit colors
export const getKitColors = (kit) => {
  return kit.colors || null;
};

export const getKitGradient = (kit) => {
  return kit.colors ? kit.colors.gradient : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
};

export const getKitPrimaryColor = (kit) => {
  return kit.colors ? kit.colors.primary : '#2a2a2a';
};

// Backward compatibility functions for category-based access
export const getCategoryGradient = (categoryKey) => {
  // For backward compatibility, return a default gradient
  return 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
};

export const getCategoryPrimaryColor = (categoryKey) => {
  // For backward compatibility, return a default color
  return '#2a2a2a';
};

export const getKitCategoryInfo = (categoryKey) => {
  // For backward compatibility, return null
  return null;
};

export const getUsedCategories = () => {
  // For backward compatibility, return empty array
  return [];
};

// Get all kits from all sections
export const getAllKits = () => {
  return [
    ...kitsData.dataspaceFoundation,
    ...kitsData.industryCoreFoundation,
    ...kitsData.useCases
  ];
};

// Find a kit by its ID
export const getKitById = (kitId) => {
  const allKits = getAllKits();
  return allKits.find(kit => kit.id === kitId) || null;
};
