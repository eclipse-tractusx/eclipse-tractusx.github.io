/********************************************************************************* 
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

// Categories with their corresponding CSS class names and colors
export const kitCategories = {
  'networks-services': {
    name: 'Networks & Services',
    cssClass: 'networks-services',
    colors: {
      primary: '#326FCA',
      gradient: 'linear-gradient(135deg, rgba(50, 111, 202, 1) 0%, rgba(21, 13, 136, 1) 100%)'
    }
  },
  'simulations': {
    name: 'Simulations',
    cssClass: 'simulations',
    colors: {
      primary: '#FFC254',
      gradient: 'linear-gradient(135deg, rgba(255, 194, 84, 1) 0%, rgba(255, 166, 1, 1) 100%)'
    }
  },
  'plm': {
    name: 'Product Lifecycle Management',
    cssClass: 'plm',
    colors: {
      primary: '#FFBA58',
      gradient: 'linear-gradient(135deg, rgba(255, 186, 88, 1) 0%, rgba(244, 93, 60, 1) 100%)'
    }
  },
  'circularity': {
    name: 'Circularity',
    cssClass: 'circularity',
    colors: {
      primary: '#65C58E',
      gradient: 'linear-gradient(135deg, rgba(101, 197, 142, 1) 0%, rgba(43, 153, 67, 1) 100%)'
    }
  },
  'sustainability': {
    name: 'Sustainability',
    cssClass: 'sustainability',
    colors: {
      primary: '#64C48F',
      gradient: 'linear-gradient(135deg, rgba(100, 196, 143, 1) 0%, rgba(38, 112, 99, 1) 100%)'
    }
  },
  'supply-chain': {
    name: 'Supply Chain',
    cssClass: 'supply-chain',
    colors: {
      primary: '#E3C8FF',
      gradient: 'linear-gradient(135deg, rgba(227, 200, 255, 1) 0%, rgba(161, 89, 255, 1) 100%)'
    }
  },
  'logistics': {
    name: 'Logistics',
    cssClass: 'logistics',
    colors: {
      primary: '#E4C9FF',
      gradient: 'linear-gradient(135deg, rgba(228, 201, 255, 1) 0%, rgba(185, 94, 255, 1) 100%)'
    }
  },
  'factory': {
    name: 'Factory & Manufacturing',
    cssClass: 'factory',
    colors: {
      primary: '#A098A4',
      gradient: 'linear-gradient(135deg, rgba(160, 152, 164, 1) 0%, rgba(64, 64, 64, 1) 100%)'
    }
  },
  'engineering': {
    name: 'Engineering',
    cssClass: 'engineering',
    colors: {
      primary: '#AB22A8',
      gradient: 'linear-gradient(135deg, rgba(228, 161, 220, 1) 0%, rgba(171, 34, 168, 1) 100%)'
    }
  },
  'industry-core': {
    name: 'Industry Core',
    cssClass: 'industry_core',
    colors: {
      primary: '#EB1B1B',
      gradient: 'linear-gradient(135deg, rgba(239, 136, 153, 1) 0%, rgba(235, 27, 27, 1) 100%)'
    }
  }
};

// Kit data with their respective logos, routes, dataspaces, and descriptions
export const kitsData = {
  dataspaceFoundation: [
    {
      id: 'connector',
      name: 'CONNECTOR KIT',
      logo: ConnectorKitLogo,
      route: '/docs-kits/kits/connector-kit/adoption-view',
      category: "networks-services",
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Eclipse Dataspace Connector for secure and sovereign data exchange in dataspaces'
    },
    {
      id: 'data-governance',
      name: 'DATA GOVERNANCE KIT',
      logo: DataGovernanceLogo,
      category: "networks-services",
      route: '/docs-kits/kits/data-governance-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Framework for managing data policies, access control, and compliance across the dataspace'
    },
    {
      id: 'data-trust-security',
      name: 'DATA TRUST & SECURITY KIT',
      logo: DataTrustSecurityLogo,
      category: "networks-services",
      route: '/docs-kits/kits/data-trust-and-security-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Security mechanisms, identity management, and trust frameworks for secure data exchange'
    },
    {
      id: 'business-partner',
      name: 'BUSINESS PARTNER KIT',
      logo: BusinessPartnerLogo,
      category: "networks-services",
      route: '/docs-kits/kits/business-partner-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Manage and share business partner master data with standardized formats and validation'
    }
  ],
  industryCoreFoundation: [
    {
      id: 'industry-core',
      name: 'INDUSTRY CORE KIT',
      logo: IndustryCoreKitLogo,
      category: "industry-core",
      route: '/docs-kits/kits/industry-core-kit/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Core data models, semantic standards, and APIs for industry-specific data exchange'
    },
    {
      id: 'digital-twin',
      name: 'DIGITAL TWIN KIT',
      logo: DigitalTwinKitLogo,
      category: "engineering",
      route: '/docs-kits/kits/digital-twin-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Create and manage digital representations of physical assets across the supply chain'
    },
    {
      id: 'data-driven-quality',
      name: 'DATA DRIVEN QUALITY KIT',
      logo: DataDrivenQualityLogo,
      category: "factory",
      route: '/docs-kits/kits/data-driven-quality-management-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Data-driven quality management and analytics for proactive issue detection and resolution'
    },
    {
      id: 'traceability',
      name: 'TRACEABILITY KIT',
      logo: TraceabilityKitLogo,
      category: "supply-chain",
      route: '/docs-kits/kits/traceability-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'End-to-end traceability of parts and materials across the entire supply chain'
    },
    {
      id: 'pcf',
      name: 'PRODUCT CARBON FOOTPRINT KIT',
      logo: PCFKitLogo,
      category: "sustainability",
      route: '/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Calculate, exchange, and track product carbon footprints throughout the value chain'
    },
    {
      id: 'data-chain',
      name: 'DATA CHAIN KIT',
      logo: DataChainKitLogo,
      category: "networks-services",
      route: '/docs-kits/kits/data-chain-kit/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X', 'Semiconductor-X'],
      description: 'Chain data efficiently across partners with standardized protocols and workflows'
    }
  ],
  useCases: [
    {
      id: 'ess',
      name: 'ESS KIT',
      logo: ESSKitLogo,
      category: "sustainability",
      route: '/docs-kits/kits/environmental-and-social-standards-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Environmental and Social Standards compliance monitoring and reporting across supply chains'
    },
    {
      id: 'eco-pass',
      name: 'ECO PASS KIT',
      logo: EcoPassKitLogo,
      category: "circularity",
      route: '/docs-kits/kits/eco-pass-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'Digital product passports with environmental data and sustainability metrics'
    },
    {
      id: 'puris',
      name: 'PURIS KIT',
      logo: PurisKitLogo,
      category: "supply-chain",
      route: '/docs-kits/kits/puris-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Predictive Unit Real-time Information Service for supply chain visibility and optimization'
    },
    {
      id: 'dcm',
      name: 'DEMAND & CAPACITY MANAGEMENT KIT',
      logo: DCMKitLogo,
      category: "supply-chain",
      route: '/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Balance supply and demand across networks with real-time capacity monitoring'
    },
    {
      id: 'logistics',
      name: 'LOGISTICS KIT',
      logo: LogisticsKitLogo,
      category: "logistics",
      route: '/docs-kits/kits/logistics-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X'],
      description: 'Logistics and transportation management for efficient supply chain operations'
    },
    {
      id: 'maas',
      name: 'MANUFACTURING AS A SERVICE KIT',
      logo: MaaSKitLogo,
      category: "factory",
      route: '/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Manufacturing services marketplace for on-demand production capabilities'
    },
    {
      id: 'model-based-production',
      name: 'MODEL BASED PRODUCTION KIT',
      logo: ModelBasedProductionLogo,
      category: "factory",
      route: '/docs-kits/kits/model-based-development-and-data-processing-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Model-based development and data processing for advanced manufacturing'
    },
    {
      id: 'modular-production',
      name: 'MODULAR PRODUCTION KIT',
      logo: ModularProductionLogo,
      category: "factory",
      route: '/docs-kits/kits/modular-production-kit/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Flexible and modular production systems for adaptive manufacturing'
    },
    {
      id: 'osim',
      name: 'ONLINE SIMULATION KIT',
      logo: OSIMKitLogo,
      category: "simulations",
      route: '/docs-kits/kits/online-simulation-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X'],
      description: 'Real-time simulation and modeling capabilities for production optimization'
    },
    {
      id: 'requirements',
      name: 'REQUIREMENTS KIT',
      logo: RequirementsKitLogo,
      category: "plm",
      route: '/docs-kits/kits/requirements-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X'],
      description: 'Requirements management and tracking across dataspaces and organizations'
    },
    {
      id: 'supply-chain-disruption',
      name: 'SUPPLY CHAIN DISRUPTION NOTIFICATION KIT',
      logo: SupplyChainDisruptionLogo,
      category: "supply-chain",
      route: '/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X'],
      description: 'Monitor and manage supply chain disruptions with real-time notifications and alerts'
    }
  ]
};

// Utility functions for working with kit categories and colors
export const getKitCategoryInfo = (categoryKey) => {
  return kitCategories[categoryKey] || null;
};

export const getKitColors = (kit) => {
  const categoryInfo = kitCategories[kit.category];
  return categoryInfo ? categoryInfo.colors : null;
};

export const getCategoryGradient = (categoryKey) => {
  const categoryInfo = kitCategories[categoryKey];
  return categoryInfo ? categoryInfo.colors.gradient : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
};

export const getCategoryPrimaryColor = (categoryKey) => {
  const categoryInfo = kitCategories[categoryKey];
  return categoryInfo ? categoryInfo.colors.primary : '#2a2a2a';
};

// Get all unique categories used in kits data
export const getUsedCategories = () => {
  const allKits = [
    ...kitsData.dataspaceFoundation,
    ...kitsData.industryCoreFoundation,
    ...kitsData.useCases
  ];
  
  const uniqueCategories = [...new Set(allKits.map(kit => kit.category))];
  return uniqueCategories.map(categoryKey => ({
    key: categoryKey,
    ...kitCategories[categoryKey]
  }));
};
