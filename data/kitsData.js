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

import React from 'react';


/*

KIT MASTER DATA

In this file you will find all the master data for the KITs presented in the Kits Gallery and other places.
For each KIT the information model is the following:

    {
      id: '<unique-kit-id>',
      name: '<KIT NAME IN UPPERCASE>',
      logo: <kit logo class>,
      logoLicencse: {
        type: '<license-type>',  // e.g., 'CC-BY-4.0', 'Apache-2.0', 'CC0 1.0 Universal', 'MIT'
        authors: '<semicolon-separated-list-of-authors>',  // e.g., '2026 Eclipse Tractus-X Contributors; 2024,2025 Company Name'
        licenseUrl: '<url-to-license-file>',  // GitHub URL to .license file
        sourceUrl: '<url-to-source-file>',  // GitHub URL to logo source file
        originalSourceUrl: '<url-to-original-source>'  // Optional: URL to original source if logo is derived
      },
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
        graduatedAt: '<YYYY-MM-DD>'  // only if currentLevel is 'Graduated'
        deprecatedAt: '<YYYY-MM-DD>'  // only if the kit is deprecated
      },
      deprecated: <status boolean  true|false >
      domain: '<domain category>' // Only for use case KITs (e.g., 'Sustainability', 'Engineering', 'Supply Chain', 'Quality', 'Production')
      industries: [<list of industries where the kit is used>], // Optional for foundation KITs, available for use case KITs
      description: '<kit description>',
      metadata: {
        created: '<YYYY-MM-DD>',
        lastUpdated: '<YYYY-MM-DD>',
        latestVersion: '<version>',
        new: <boolean>
      }
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
import GeometryKitLogo from "@site/static/img/kits/geometry/geometry-kit-logo.svg"; 
import AiServiceKitLogo from "@site/static/img/kits/ai-service/ai-service-kit-raw-logo.svg";

// Import Material-UI icons for industries
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import PrecisionManufacturing from '@mui/icons-material/PrecisionManufacturing';
import Memory from '@mui/icons-material/Memory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Science from '@mui/icons-material/Science';

// Categories with their corresponding CSS class names and colors

export const licenses = {
  'CC-BY-4.0': "https://creativecommons.org/licenses/by/4.0/",
  "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
  "CC0 1.0 Universal": "https://creativecommons.org/publicdomain/zero/1.0/",
  "MIT": "https://opensource.org/licenses/MIT"
}

// Kit data with their respective logos, routes, industries, and descriptions
export const kitsData = {
  dataspaceFoundation: [
    {
      id: 'connector',
      name: 'CONNECTOR KIT',
      logo: ConnectorKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors', // Komma separated list of authors
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/connector/connector-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/connector/connector-kit-raw-logo.svg'
      },
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/connector-kit/adoption-view',
      colors: {
        primary: '#2316E3',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #2316E3 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2024-06-07'
      },
      deprecated: false,
      domain: "Enablement Service",
      description: 'The EDC as a connector implements a framework agreement for sovereign, cross-organizational data exchange.',
      metadata: {
        created: '2022-08-01',
        lastUpdated: '2024-06-07',
        latestVersion: '3.0.0',
        new: false
      }
    },
    {
      id: 'data-governance',
      name: 'DATA GOVERNANCE KIT',
      logo: DataGovernanceLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-governance/data-governance-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-governance/data-governance-kit-raw-logo.svg'
      },
      logoHeight: 90,
      logoWidth: 90,
      route: '/docs-kits/kits/data-governance-kit/adoption-view',
      colors: {
        primary: '#1E13C2',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #1E13C2 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft',
        deprecatedAt: '2025-11-13'
      },
      deprecated: true,
      domain: "Governance",
      description: 'Enable and simplify data governance.',
      metadata: {
        created: '2024-03-08',
        lastUpdated: '2024-03-08',
        latestVersion: '0.1.0',
        new: false
      }
    },
    {
      id: 'data-trust-security',
      name: 'DATA TRUST & SECURITY KIT',
      logo: DataTrustSecurityLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-trust-and-security/data-trust-and-security-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-trust-and-security/data-trust-and-security-kit-raw-logo.svg'
      },
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
      domain: "Security",
      description: 'Enable content validation, certification and verification for any use case semantic data.',
      metadata: {
        created: '2025-09-30',
        lastUpdated: '2025-09-30',
        latestVersion: '0.0.1',
        new: true
      }
    },
    {
      id: 'business-partner',
      name: 'BUSINESS PARTNER KIT',
      logo: BusinessPartnerLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/business-partner/business-partner-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/business-partner/business-partner-raw-logo.svg'
      },
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/business-partner-kit/adoption-view',
      colors: {
        primary: '#1E13C2',
        gradient: 'linear-gradient(135deg, #3372CC 0%, #1E13C2 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2025-09-08'
      },
      deprecated: false,
      domain: "Participant Management",
      description: 'Get high-quality data business partner data records including the unique identifier.',
      metadata: {
        created: '2023-03-01',
        lastUpdated: '2025-09-08',
        latestVersion: '10.0.0',
        new: false
      }
    }
  ],
  industryCoreFoundation: [
    {
      id: 'digital-twin',
      name: 'DIGITAL TWIN KIT',
      logo: DigitalTwinKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/digital-twin/digital-twin-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/digital-twin/digital-twin-kit-raw-logo.svg'
      },
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/digital-twin-kit/adoption-view',
      colors: {
        primary: '#EA3650',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EA3650 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2024-08-01'
      },
      deprecated: false,
      domain: "Enablement Service",
      description: 'Digital Twins enable data-level interoperability - even between parties previously unknown to each other.',
      metadata: {
        created: '2023-07-12',
        lastUpdated: '2024-08-01',
        latestVersion: '2.0.1',
        new: false
      }
    },
    {
      id: 'industry-core',
      name: 'INDUSTRY CORE KIT',
      logo: IndustryCoreKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/industry-core/industry-core-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/industry-core/industry-core-kit-raw-logo.svg'
      },
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/industry-core-kit/adoption-view',
      colors: {
        primary: '#EC4A61',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EC4A61 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2025-03-17'
      },
      deprecated: false,
      domain: "Use Case Platform",
      description: 'Connceting Use-Cases with Core Services',
      metadata: {
        created: '2024-02-28',
        lastUpdated: '2025-03-17',
        latestVersion: '1.4.0',
        new: false
      }
    },
    {
      id: 'data-chain',
      name: 'DATA CHAIN KIT',
      logo: DataChainKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-chain/data-chain-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-chain/data-chain-kit-raw-logo.svg',
      },
      logoHeight: 90,
      logoWidth: 90,
      route: '/docs-kits/kits/data-chain-kit/adoption-view',
      colors: {
        primary: '#EB4877',
        gradient: 'linear-gradient(135deg, #F08B9B 0%, #EB4877 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2024-03-07'
      },
      deprecated: false,
      domain: "Traceability",
      description: 'Data Chain KIT is made for apps and services to access connected data distributed between organizations.',
      metadata: {
        created: '2023-03-01',
        lastUpdated: '2024-05-28',
        latestVersion: '3.0.1',
        new: false
      }
    },
    {
      id: 'traceability',
      name: 'TRACEABILITY KIT',
      logo: TraceabilityKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/traceability/traceability-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/traceability/traceability-kit-raw-logo.svg'
      },
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/traceability-kit/adoption-view',
      colors: {
        primary: '#F45D3C',
        gradient: 'linear-gradient(135deg, #FFBD59 0%, #F45D3C 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2024-12-01'
      },
      deprecated: false,
      domain: "Traceability",
      description: 'Trace parts and materials across the entire value chain to enable data driven use cases over all n-tier levels.',
      metadata: {
        created: '2023-04-12',
        lastUpdated: '2025-08-07',
        latestVersion: '7.0.0',
        new: false
      }
    },
    {
      id: 'supply-chain-disruption',
      name: 'SUPPLY CHAIN DISRUPTION NOTIFICATION KIT',
      logo: SupplyChainDisruptionLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-raw-logo.svg'
      },
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view',
      colors: {
        primary: '#9653ED',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #9653ED 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2025-08-22'
      },
      deprecated: false,
      domain: 'Supply Chain',
      description: 'Inform partners about disruptions in the supply chain.',
      metadata: {
        created: '2024-08-01',
        lastUpdated: '2025-08-22',
        latestVersion: '2.0.0',
        new: false
      }
    },
    {
      id: 'agents',
      name: 'KNOWLEDGE AGENTS KIT',
      logo: AgentsKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/agents/agents-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/agents/agents-kit-raw-logo.svg'
      },
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
      domain: "Enablement Service",
      description: 'Generate Knowledge from Data. Scalable & Efficient Semantic Dataspace Federation.',
      metadata: {
        created: '2023-09-04',
        lastUpdated: '2024-12-09',
        latestVersion: '1.3.0',
        new: false
      }
    },
    {
      id: 'ai-service',
      name: 'AI SERVICE KIT',
      logo: AiServiceKitLogo,
      logoHeight: 80,
      logoWidth: 80,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/ai-service/ai-service-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/ai-service/ai-service-kit-raw-logo.svg',
        originalSourceUrl: 'https://www.svgrepo.com/svg/235253/chip-ai',
      },
      route: '/docs-kits/next/kits/ai-service-kit/adoption-view',
      colors: {
        primary: '#071de2',
        gradient: 'linear-gradient(135deg, #6170f5 0%, #071de2 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      domain: 'Artificial Intelligence (AI)',
      description: 'Defines standard ways to expose and use AI Services.',
      metadata: {
        created: '2025-12-19',
        lastUpdated: '2025-12-19',
        latestVersion: '0.0.1',
        new: true
      }
    },
  ],
  useCases: [
    {
      id: 'ess',
      name: 'ESS KIT',
      logo: ESSKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/ess/ess-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/ess/ess-kit-raw-logo.svg'
      },
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
      domain: 'Sustainability',
      industries: ['automotive', 'construction'],
      description: 'Environmental and Social Standards Incident Management in supply chains.',
      metadata: {
        created: '2024-03-06',
        lastUpdated: '2024-07-11',
        latestVersion: '0.3.0',
        new: false
      }
    },
    {
      id: 'pcf',
      name: 'PRODUCT CARBON FOOTPRINT KIT',
      logo: PCFKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/pcf/pcf-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/pcf/pcf-kit-raw-logo.svg'
      },
      logoHeight: 120,
      logoWidth: 120,
      route: '/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view',
      colors: {
        primary: '#368C7D',
        gradient: 'linear-gradient(135deg, #66C791 0%, #368C7D 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2024-08-05'
      },
      deprecated: false,
      domain: 'Sustainability',
      industries: ['automotive', 'manufacturing', 'construction', 'semiconductor'],
      description: 'Product-specific CO2 footprint.',
      metadata: {
        created: '2023-08-23',
        lastUpdated: '2025-12-19',
        latestVersion: '1.4.0',
        new: false
      }
    },
    {
      id: 'eco-pass',
      name: 'ECO PASS KIT',
      logo: EcoPassKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/eco-pass/eco-pass-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/eco-pass/eco-pass-kit-raw-logo.svg'
      },
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
      domain: 'Sustainability',
      industries: ['automotive', 'manufacturing', 'construction'],
      description: 'Leverage the transparency of digital product passports to strengthen sustainability & compliance.',
      metadata: {
        created: '2023-08-11',
        lastUpdated: '2024-07-25',
        latestVersion: '1.5.0',
        new: false
      }
    },
    {
      id: 'circularity',
      name: 'CIRCULARITY KIT',
      logo: CircularityKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/circularity/circularity-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/circularity/circularity-kit-raw-logo.svg'
      },
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
      domain: 'Sustainability',
      industries: ['automotive', 'manufacturing'],
      description: 'Enable circular economy business models with data exchange across company boundaries.',
      metadata: {
        created: '2023-12-08',
        lastUpdated: '2024-09-17',
        latestVersion: '1.3.0',
        new: false
      }
    },
    {
      id: 'dcm',
      name: 'DEMAND & CAPACITY MANAGEMENT KIT',
      logo: DCMKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-raw-logo.svg'
      },
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview',
      colors: {
        primary: '#B95EFF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #B95EFF 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2025-09-29'
      },
      deprecated: false,
      domain: 'Supply Chain',
      industries: ['automotive', 'semiconductor'],
      description: 'Quick build of solutions for companies of any size to engage a collaborative capacity management.',
      metadata: {
        created: '2023-03-01',
        lastUpdated: '2025-09-29',
        latestVersion: '1.4.0',
        new: false
      }
    },
    {
      id: 'logistics',
      name: 'LOGISTICS KIT',
      logo: LogisticsKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/logistics/logistics-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/logistics/logistics-kit-raw-logo.svg'
      },
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
      domain: 'Supply Chain',
      industries: ['automotive', 'construction'],
      description: 'Provide packing information, transport data and customs topics.',
      metadata: {
        created: '2025-02-12',
        lastUpdated: '2025-02-12',
        latestVersion: '1.0.0',
        new: false
      }
    },
    {
      id: 'customs',
      name: 'CUSTOMS KIT',
      logo: CustomsKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/customs/customs-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/customs/customs-kit-raw-logo.svg'
      },
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
      domain: 'Supply Chain',
      industries: ['automotive'],
      description: 'Basis for a more efficient customs process and ensure a robust preference calculation result.',
      metadata: {
        created: '2025-02-25',
        lastUpdated: '2025-05-16',
        latestVersion: '0.0.0',
        new: false
      }
    },
      {
      id: 'osim',
      name: 'ONLINE SIMULATION KIT',
      logo: OSIMKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/osim/osim-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/osim/osim-kit-raw-logo.svg'
      },
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
      domain: 'Supply Chain',
      industries: ['automotive'],
      description: 'Gain increased supply chain transparency through collaborative simulation across all stakeholders.',
      metadata: {
        created: '2023-08-18',
        lastUpdated: '2025-03-06',
        latestVersion: '3.1.0',
        new: false
      }
    },
    {
      id: 'puris',
      name: 'PURIS KIT',
      logo: PurisKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/puris/puris-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/puris/puris-kit-raw-logo.svg'
      },
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/puris-kit/adoption-view',
      colors: {
        primary: '#A159FF',
        gradient: 'linear-gradient(135deg, #E5CCFF 0%, #A159FF 100%)'
      },
      maturity: {
        currentLevel: 'Graduated',
        graduatedAt: '2025-08-16'
      },
      deprecated: false,
      domain: 'Supply Chain',
      industries: ['automotive'],
      description: 'Predictive Unit Realtime Information Service',
      metadata: {
        created: '2023-11-29',
        lastUpdated: '2025-08-16',
        latestVersion: '0.4.0',
        new: false
      }
    },
    {
      id: 'model-based-production',
      name: 'MODEL BASED PRODUCTION KIT',
      logo: ModelBasedProductionLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/model-based-production/model-based-production-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/model-based-production/model-based-production-kit-raw-logo.svg'
      },
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
      domain: 'Engineering',
      industries: ['automotive'],
      description: 'Federated simulation and data processing.',
      metadata: {
        created: '2023-12-08',
        lastUpdated: '2024-05-27',
        latestVersion: '1.0.0',
        new: false
      }
    },
    {
      id: 'behavior-twin',
      name: 'BEHAVIOUR TWIN KIT',
      logo: BehaviorTwinKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/behavior-twin/behavior-twin-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/behavior-twin/behavior-twin-kit-raw-logo.svg'
      },
      logoHeight: 80,
      logoWidth: 80,
      route: '/docs-kits/kits/behaviour-twin-kit/overview',
      colors: {
        primary: '#FFA601',
        gradient: 'linear-gradient(135deg, #FFC357 0%, #FFA601 100%)'
      },
      maturity: {
        currentLevel: 'Incubating',
        graduationStatus: 'draft'
      },
      deprecated: false,
      domain: "Simulations",
      industries: ['automotive'],
      description: 'Maximize the potential of usage data through calculation services and simulations.',
      metadata: {
        created: '2024-05-16',
        lastUpdated: '2024-05-21',
        latestVersion: '1.0.0',
        new: false
      }
    },
    {
      id: 'data-driven-quality',
      name: 'DATA DRIVEN QUALITY KIT',
      logo: DataDrivenQualityLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-driven-quality-management/data-driven-quality-management-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/data-driven-quality-management/data-driven-quality-management-kit-raw-logo.svg'
      },
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
      domain: 'Quality',
      industries: ['automotive'],
      description: 'Data driven quality management enables data provider and consumer to exchange and analyse existing data across company boundaries.',
      metadata: {
        created: '2023-08-18',
        lastUpdated: '2025-12-01',
        latestVersion: '2.1.0',
        new: false
      }
    },
    {
      id: 'requirements',
      name: 'REQUIREMENTS KIT',
      logo: RequirementsKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/requirements/requirements-kit-raw-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/requirements/requirements-kit-raw-logo.svg'
      },
      logoHeight: 100,
      logoWidth: 100,
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
      domain: 'Engineering',
      industries: ['automotive'],
      description: 'Cross company requirements management to enable quick information access and multiple company collaboration.',
      metadata: {
        created: '2025-09-29',
        lastUpdated: '2025-09-29',
        latestVersion: '0.1.0',
        new: true
      }
    },
    {
      id: 'geometry',
      name: 'GEOMETRY KIT',
      logo: GeometryKitLogo,
      logoLicencse: {
        type: 'CC-BY-4.0',
        authors: '2026 Eclipse Tractus-X Contributors',
        licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/geometry/geometry-kit-logo.svg.license',
        sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/geometry/geometry-kit-logo.svg'
      },
      logoHeight: 100,
      logoWidth: 100,
      route: '/docs-kits/kits/geometry-kit/adoption-view',
      colors: {
        primary: '#8c9ea3',
        gradient: 'linear-gradient(135deg, #aebfc4 0%, #8c9ea3 100%)'
      },
      maturity: {
        currentLevel: 'Sandbox',
        graduationStatus: 'draft'
      },
      deprecated: false,
      domain: 'Engineering',
      industries: ['automotive'],
      description: 'Enable secure and sovereign exchange of engineering geometry information across the entire value chain.',
      metadata: {
        created: '2025-11-28',
        lastUpdated: '2025-11-28',
        latestVersion: '1.0.0',
        new: true
      }
    }
  ],
  // List here the industry-specific KITs (will not be shown in the cross-industry use cases gallery)
  industryKits: {
    "manufacturing": [
      {
        id: 'maas',
        name: 'MANUFACTURING AS A SERVICE KIT',
        logo: MaaSKitLogo,
        logoLicencse: {
          type: 'CC-BY-4.0',
          authors: '2026 Eclipse Tractus-X Contributors',
          licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/manufacturing-as-a-service/manufacturing-as-a-service-kit-raw-logo.svg.license',
          sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/manufacturing-as-a-service/manufacturing-as-a-service-kit-raw-logo.svg'
        },
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
        domain: 'Production',
        industries: ['automotive', 'manufacturing'],
        description: 'Create a federated network of networks to connect manufacturing supply and demand.',
        metadata: {
          created: '2024-03-29',
          lastUpdated: '2024-05-27',
          latestVersion: '1.0.0',
          new: false
        }
      },
      {
        id: 'modular-production',
        name: 'MODULAR PRODUCTION KIT',
        logo: ModularProductionLogo,
        logoLicencse: {
          type: 'CC-BY-4.0',
          authors: '2026 Eclipse Tractus-X Contributors',
          licenseUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/modular-production/modular-production-kit-raw-logo.svg.license',
          sourceUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/static/img/kits/modular-production/modular-production-kit-raw-logo.svg'
        },
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
        domain: 'Production',
        industries: ['manufacturing'],
        description: 'Enable customized production (batch size 1) without significant increase of costs.',
        metadata: {
          created: '2023-11-20',
          lastUpdated: '2024-05-10',
          latestVersion: '1.0.0',
          new: false
        }
      }
    ],
    "semiconductor": [],
    "construction": [],
    "automotive": [],
    "chemical": []
  }
};

// Information about the different industries which use Eclipse Tractus-X.
export const industries = [
  {
    id: 'automotive',
    name: 'Automotive',
    subtitle: 'Automotive Industry',
    description: 'Industry Specific KITs for the automotive industry, covering the entire value chain from suppliers to OEMs to aftermarket. Enable digital collaboration, supply chain transparency, quality management, and sustainable practices across automotive manufacturing and distribution.',
    icon: DirectionsCar,
    gradient: 'linear-gradient(135deg, #ffa600, #b3cb2d)',
    dataspaces: [
      {
        name: "Catena-X",
        url: "https://catena-x.net/",
        gradient: 'linear-gradient(135deg, #ffa600, #b3cb2d)',
        logo: {
          src: 'https://catena-x.net/wp-content/uploads/2025/10/CX_Figurative_mark_RGB_pos.png',
          alt: 'Catena-X Logo',
          width: 70,
          height: 70
        },
        colors: {
          layer1: 'rgb(110, 200, 105)',
          layer2: 'rgb(179, 203, 45)',
          layer3: 'rgb(230, 163, 38)',
          layer4: 'rgb(250, 160, 35)'
        },
        subtitle: 'Your Automotive Network',
        description: 'The first open and collaborative data ecosystem for the automotive industry. Catena-X enables secure and standardized data exchange across the entire automotive value chain to drive innovation, sustainability, and transparency.',
        kits: ['connector', 'data-governance', 'data-trust-security', 'business-partner', 'agents', 'digital-twin', 'industry-core', 'data-chain', 'data-driven-quality', 'traceability', 'behavior-twin', 'ess', 'pcf', 'eco-pass', 'circularity', 'puris', 'dcm', 'logistics', 'supply-chain-disruption', 'customs', 'osim', 'model-based-production', 'requirements', 'maas', 'modular-production', 'geometry' ]
      }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    subtitle: 'Manufacturing Industry Use Cases',
    description: 'Industry Specific KITs for manufacturing and production environments, focusing on shop floor operations, industrial equipment integration, and production optimization. Enable smart manufacturing, flexible production networks, and real-time operational data exchange.',
    icon: PrecisionManufacturing,
    gradient: 'linear-gradient(135deg, #1D71B8, #5ba9de, #c1d100)',
    dataspaces: []
    //    colors: {
    //  layer1: '#81d100',
    //  layer2: '#c1d100',
    //  layer3: '#5ba9de',
    //  layer4: '#1D71B8'
    //},
  },
  {
    id: 'semiconductor',
    name: 'Semiconductor',
    subtitle: 'Semiconductor Industry Use Cases',
    description: 'Industry Specific KITs for the semiconductor industry, addressing complex supply chains, manufacturing processes, and quality requirements. Enable traceability, capacity management, and digital collaboration across the global semiconductor value network.',
    icon: Memory,
    gradient: 'linear-gradient(135deg, #c1cb01, #e67900)',
    dataspaces: [
      {
        name: "Semiconductor-X",
        url: "https://semiconductor-x.com/",
        gradient: 'linear-gradient(135deg, #c1cb01, #e67900)',
        logo: {
          src: 'https://www.semiconductor-x.com/wp-content/uploads/semicon-x_bildmarke.svg',
          alt: 'Semiconductor-X Logo',
          width: 100,
          height: 80
        },
        colors: {
          layer1: '#c1cb01',
          layer2: '#d4b501',
          layer3: '#e69f00',
          layer4: '#e67900'
        },
        subtitle: 'Semiconductor Network',
        description: 'Contributing to a cross-sector international dataspace and digital twin standards for resilient semiconductor supply chains.',
        kits: ['connector', 'digital-twin', 'industry-core', 'traceability', 'pcf', 'dcm']
      }
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    subtitle: 'Construction Industry Use Cases',
    description: 'Industry Specific KITs in the construction and building industry, supporting project lifecycle management, material traceability, and sustainable building practices. Enable digital collaboration between architects, contractors, suppliers, and facility managers.',
    icon: ApartmentIcon,
    gradient: 'linear-gradient(135deg,#002865, #FF6B35, #FFB74D )',
    dataspaces: [
      {
        name: "Construct-X",
        url: "https://construct-x.org",
        gradient: 'linear-gradient(135deg, #002865, #FF6B35, #FFB74D)',
        logo: {
          src: 'https://construct-x.org/wp-content/uploads/2025/11/CX-BM-RGB.png',
          alt: 'Construct-X Logo',
          width: 70,
          height: 70
        },
        colors: {
          layer1: '#FF6B35',
          layer2: '#FF8C42',
          layer3: '#FFA726',
          layer4: '#FFB74D'
        },
        subtitle: 'Construction Network',
        description: 'An innovative dataspace revolutionizing the construction industry through digital collaboration and sustainable building practices. Construct-X connects architects, builders, and suppliers in a unified digital ecosystem.',
        kits: ['connector', 'business-partner', 'digital-twin', 'industry-core', 'traceability', 'ess', 'pcf', 'eco-pass', 'logistics']
      }
    ]
  },
  {
    id: 'chemical',
    name: 'Chemical',
    subtitle: 'Chemical Industry Use Cases',
    description: 'Industry Specific KITs for the chemical industry, addressing product safety, regulatory compliance, and supply chain complexity. Enable secure data exchange, material traceability, sustainability reporting, and cross-industry standardization for chemical manufacturing and distribution.',
    icon: Science,
    gradient: 'linear-gradient(135deg, #00BCD4, #00838F)',
    dataspaces: [],
    //colors: {
    //  layer1: '#00BCD4',
    //  layer2: '#00ACC1',
    //  layer3: '#0097A7',
    //  layer4: '#00838F'
    //}
  }
];





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
  const industrySpecificKits = [];

  // Collect all industry-specific KITs
  if (kitsData.industryKits) {
    Object.values(kitsData.industryKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        industrySpecificKits.push(...kitsArray);
      }
    });
  }

  return [
    ...kitsData.dataspaceFoundation,
    ...kitsData.industryCoreFoundation,
    ...kitsData.useCases,
    ...industrySpecificKits
  ];
};

// Find a kit by its ID
export const getKitById = (kitId) => {
  const allKits = getAllKits();
  return allKits.find(kit => kit.id === kitId) || null;
};

// Metadata utility functions
export const getNewKits = () => {
  const allKits = getAllKits();
  return allKits.filter(kit => kit.metadata?.new === true);
};

export const getKitsByDateRange = (startDate, endDate) => {
  const allKits = getAllKits();
  return allKits.filter(kit => {
    if (!kit.metadata?.created) return false;
    const kitDate = new Date(kit.metadata.created);
    return kitDate >= new Date(startDate) && kitDate <= new Date(endDate);
  });
};

export const getRecentlyUpdatedKits = (daysBack = 30) => {
  const allKits = getAllKits();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  return allKits.filter(kit => {
    if (!kit.metadata?.lastUpdated) return false;
    return new Date(kit.metadata.lastUpdated) >= cutoffDate;
  });
};

export const getKitMetadata = (kitId) => {
  const kit = getKitById(kitId);
  return kit?.metadata || null;
};

// Get KITs associated with a specific dataspace
export const getKitsByDataspace = (dataspaceName) => {
  const allKits = getAllKits();

  // Find the dataspace across all industries
  let dataspaceKitIds = [];
  industries.forEach(industry => {
    if (industry.dataspaces) {
      const dataspace = industry.dataspaces.find(ds => ds.name === dataspaceName);
      if (dataspace && dataspace.kits) {
        dataspaceKitIds = dataspace.kits;
      }
    }
  });

  // Return full kit objects for the IDs in the dataspace
  if (dataspaceKitIds.length === 0) return [];
  return allKits.filter(kit => dataspaceKitIds.includes(kit.id));
};

// Get all dataspaces with their associated KIT counts
export const getDataspaceStats = () => {
  const stats = [];

  industries.forEach(industry => {
    if (industry.dataspaces) {
      industry.dataspaces.forEach(dataspace => {
        stats.push({
          name: dataspace.name,
          industry: industry.name,
          kitCount: dataspace.kits ? dataspace.kits.length : 0,
          kits: dataspace.kits || []
        });
      });
    }
  });

  return stats;
};