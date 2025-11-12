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
        graduatedAt: '<YYYY-MM-DD>'  // only if currentLevel is 'Graduated'
        deprecatedAt: '<YYYY-MM-DD>'  // only if the kit is deprecated
      },
      deprecated: <status boolean  true|false >
      dataspaces: [<list of dataspaces where the kit is used>],
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
        currentLevel: 'Graduated',
        graduatedAt: '2024-06-07'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
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
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'Enable and simplify data governance within Catena-X.',
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
      dataspaces: ['Catena-X','Construct-X'],
      description: 'Get high-quality data business partner data records including the unique identifier.',
      metadata: {
        created: '2023-03-01',
        lastUpdated: '2025-09-08',
        latestVersion: '10.0.0',
        new: false
      }
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
      description: 'Generate Knowledge from Data. Scalable & Efficient Semantic Dataspace Federation.',
      metadata: {
        created: '2023-05-15',
        lastUpdated: '2024-12-09',
        latestVersion: '1.3.0',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2024-08-01'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'Digital Twins enable data-level interoperability - even between parties previously unknown to each other.',
      metadata: {
        created: '2022-09-01',
        lastUpdated: '2024-08-01',
        latestVersion: '2.0.1',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2025-03-17'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Construct-X'],
      description: 'Connceting Use-Cases with Core Services',
      metadata: {
        created: '2024-03-08',
        lastUpdated: '2025-03-17',
        latestVersion: '1.4.0',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2024-03-07'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Data Chain KIT is made for apps and services to access connected data distributed between organizations.',
      metadata: {
        created: '2023-03-01',
        lastUpdated: '2024-03-07',
        latestVersion: '2.1.0',
        new: false
      }
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
      description: 'Data driven quality management enables data provider and consumer to exchange and analyse existing data across company boundaries.',
      metadata: {
        created: '2023-01-15',
        lastUpdated: '2024-03-08',
        latestVersion: '1.2.0',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2024-06-07'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Semiconductor-X', 'Factory-X', 'Construct-X'],
      description: 'Trace parts and materials across the entire value chain to enable data driven use cases over all n-tier levels.',
      metadata: {
        created: '2022-11-01',
        lastUpdated: '2025-08-07',
        latestVersion: '7.0.0',
        new: false
      }
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
      description: 'Maximize the potential of usage data through calculation services and simulations.',
      metadata: {
        created: '2024-05-16',
        lastUpdated: '2024-05-23',
        latestVersion: '0.4.1',
        new: false
      }
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
      description: 'Environmental and Social Standards Incident Management KIT',
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
      dataspaces: ['Catena-X', 'Factory-X', 'Construct-X', 'Semiconductor-X'],
      description: 'Product-specific CO2 footprint.',
      metadata: {
        created: '2023-03-08',
        lastUpdated: '2024-08-05',
        latestVersion: '1.2.0',
        new: false
      }
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
      dataspaces: ['Catena-X', 'Factory-X', 'Construct-X'],
      description: 'Leverage the transparency of digital product passports to strengthen sustainability & compliance.',
      metadata: {
        created: '2023-03-08',
        lastUpdated: '2024-07-25',
        latestVersion: '1.5.0',
        new: false
      }
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
      description: 'There will be more Kits coming in the next months. Stay tuned.',
      metadata: {
        created: '2023-12-08',
        lastUpdated: '2024-09-17',
        latestVersion: '1.3.0',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2025-08-16'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Predictive Unit Realtime Information Service',
      metadata: {
        created: '2024-03-08',
        lastUpdated: '2025-08-16',
        latestVersion: '0.4.0',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2025-09-29'
      },
      deprecated: false,
      dataspaces: ['Catena-X'],
      description: 'Quick build of solutions for companies of any size to engage a collaborative capacity management.',
      metadata: {
        created: '2023-06-01',
        lastUpdated: '2025-09-29',
        latestVersion: '1.4.0',
        new: false
      }
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
      description: 'Provide packing information, transport data and customs topics.',
      metadata: {
        created: '2025-02-03',
        lastUpdated: '2025-03-11',
        latestVersion: '0.2.1',
        new: false
      }
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
        currentLevel: 'Graduated',
        graduatedAt: '2025-08-22'
      },
      deprecated: false,
      dataspaces: ['Catena-X', 'Factory-X'],
      description: 'Inform partners about disruptions in the supply chain.',
      metadata: {
        created: '2024-08-01',
        lastUpdated: '2025-08-22',
        latestVersion: '2.0.0',
        new: false
      }
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
      description: 'Basis for a more efficient customs process and ensure a robust preference calculation result.',
      metadata: {
        created: '2024-05-20',
        lastUpdated: '2024-09-10',
        latestVersion: '0.1.5',
        new: false
      }
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
        graduationStatus: 'draft',
        deprecatedAt: '2025-10-06'
      },
      deprecated: true,
      dataspaces: ['Catena-X'],
      description: 'Gain increased supply chain transparency through collaborative simulation across all stakeholders.',
      metadata: {
        created: '2023-03-08',
        lastUpdated: '2024-08-05',
        latestVersion: '3.0.0',
        new: false
      }
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
      description: 'Federated simulation and data processing.',
      metadata: {
        created: '2024-01-30',
        lastUpdated: '2024-08-12',
        latestVersion: '0.3.2',
        new: false
      }
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
      description: 'Cross company requirements management to enable quick information access and multiple company collaboration.',
      metadata: {
        created: '2025-10-05',
        lastUpdated: '2025-10-05',
        latestVersion: '0.2.3',
        new: true
      }
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
      description: 'Create a federated network of networks to connect manufacturing supply and demand.',
      metadata: {
        created: '2024-03-08',
        lastUpdated: '2024-09-20',
        latestVersion: '0.1.0',
        new: false
      }
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
      description: 'Enable customized production (batch size 1) without significant increase of costs.',
      metadata: {
        created: '2023-11-15',
        lastUpdated: '2024-05-10',
        latestVersion: '0.2.1',
        new: false
      }
    }
  ],
  // List here the industry/dataspace specific KITs (will not be shown in the cross dataspace use cases gallery)
  dataspaceKits: {
      "factory-x": [
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
          description: 'Enable customized production (batch size 1) without significant increase of costs.',
          metadata: {
            created: '2023-11-15',
            lastUpdated: '2024-05-10',
            latestVersion: '0.2.1',
            new: false
          }
        }
      ],
      "semiconductor-x": [],
      "construct-x": [],
      "catena-x": []
    }
};

// Information about the different dataspaces which use Eclipse Tractus-X.
export const dataspaces = [
  {
    id: 'catena-x',
    name: 'Catena-X',
    subtitle: 'Your Automotive Network',
    description: 'The first open and collaborative data ecosystem for the automotive industry. Catena-X enables secure and standardized data exchange across the entire automotive value chain to drive innovation, sustainability, and transparency.',
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
    gradient: 'linear-gradient(135deg, #ffa600, #b3cb2d)',
    url: 'https://catena-x.net'
  },
  {
    id: 'factory-x',
    name: 'Factory-X',
    subtitle: 'Shop Floor Industry KITs',
    description: 'A manufacturing-focused dataspace that connects shop floors, production systems, and industrial equipment. Factory-X democratizes access to manufacturing capabilities and enables smart, flexible production networks.',
    logo: {
      src: 'https://factory-x.org/wp-content/uploads/factory-x-logo.svg',
      alt: 'Factory-X Logo',
      width: 80,
      height: 'auto'
    },
    colors: {
      layer1: '#81d100',
      layer2: '#c1d100',
      layer3: '#5ba9de',
      layer4: '#1D71B8'
    },
    gradient: 'linear-gradient(135deg, #1D71B8, #5ba9de, #c1d100)',
    url: 'https://factory-x.org'
  },
  {
    id: 'semiconductor-x',
    name: 'Semiconductor-X',
    subtitle: 'Semiconductor Industry KITs',
    description: 'Contributing to a cross-sector international dataspace and digital twin standards for resilient semiconductor supply chains.',
    logo: {
      src: 'https://www.semiconductor-x.com/wp-content/uploads/semicon-x_bildmarke.svg',
      alt: 'Semiconductor-X Logo',
      width: 70,
      height: 50
    },
    colors: {
      layer1: '#c1cb01',
      layer2: '#d4b501',
      layer3: '#e69f00',
      layer4: '#e67900'
    },
    gradient: 'linear-gradient(135deg, #c1cb01, #e67900)',
    url: 'https://semiconductor-x.com'
  },
  {
    id: 'construct-x',
    name: 'Construct-X',
    subtitle: 'Construction Industry KITs',
    description: 'An innovative dataspace revolutionizing the construction industry through digital collaboration and sustainable building practices. Construct-X connects architects, builders, and suppliers in a unified digital ecosystem.',
    logo: {
      src: 'https://construct-x.org/wp-content/uploads/2025/05/Construct-X-Logo-pos-scaled.webp',
      alt: 'Construct-X Logo',
      width: 80,
      height: 'auto'
    },
    colors: {
      layer1: '#FF6B35',
      layer2: '#FF8C42',
      layer3: '#FFA726',
      layer4: '#FFB74D'
    },
    gradient: 'linear-gradient(135deg,#002865, #FF6B35, #FFB74D )',
    url: 'https://construct-x.org'
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
