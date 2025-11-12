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

/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from data/kitsData.js on 2025-11-12T13:18:14.942Z
 * 
 * To regenerate: npm run generate:nav-items
 * 
 * This file provides navbar dropdown items for KITs organized by category
 * in CommonJS format for use in docusaurus.config.js.
 */

/**
 * KIT navigation data extracted from master data, organized by category
 */
const kitsByCategory = {
  "dataspaceFoundation": [
    {
      "id": "connector",
      "name": "CONNECTOR KIT",
      "route": "/docs-kits/kits/connector-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "data-governance",
      "name": "DATA GOVERNANCE KIT",
      "route": "/docs-kits/kits/data-governance-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "data-trust-security",
      "name": "DATA TRUST & SECURITY KIT",
      "route": "/docs-kits/kits/data-trust-and-security-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "business-partner",
      "name": "BUSINESS PARTNER KIT",
      "route": "/docs-kits/kits/business-partner-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "agents",
      "name": "KNOWLEDGE AGENTS KIT",
      "route": "/docs-kits/kits/knowledge-agents-kit/adoption-view/intro",
      "deprecated": false
    }
  ],
  "industryCoreFoundation": [
    {
      "id": "digital-twin",
      "name": "DIGITAL TWIN KIT",
      "route": "/docs-kits/kits/digital-twin-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "industry-core",
      "name": "INDUSTRY CORE KIT",
      "route": "/docs-kits/kits/industry-core-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "data-chain",
      "name": "DATA CHAIN KIT",
      "route": "/docs-kits/kits/data-chain-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "data-driven-quality",
      "name": "DATA DRIVEN QUALITY KIT",
      "route": "/docs-kits/kits/data-driven-quality-management-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "traceability",
      "name": "TRACEABILITY KIT",
      "route": "/docs-kits/kits/traceability-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "behavior-twin",
      "name": "BEHAVIOUR TWIN KIT",
      "route": "/docs-kits/kits/behaviour-twin-kit/overview",
      "deprecated": false
    }
  ],
  "useCases": [
    {
      "id": "ess",
      "name": "ESS KIT",
      "route": "/docs-kits/kits/environmental-and-social-standards-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "pcf",
      "name": "PRODUCT CARBON FOOTPRINT KIT",
      "route": "/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "eco-pass",
      "name": "ECO PASS KIT",
      "route": "/docs-kits/kits/eco-pass-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "circularity",
      "name": "CIRCULARITY KIT",
      "route": "/docs-kits/kits/circularity-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "puris",
      "name": "PURIS KIT",
      "route": "/docs-kits/kits/puris-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "dcm",
      "name": "DEMAND & CAPACITY MANAGEMENT KIT",
      "route": "/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview",
      "deprecated": false
    },
    {
      "id": "logistics",
      "name": "LOGISTICS KIT",
      "route": "/docs-kits/kits/logistics-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "supply-chain-disruption",
      "name": "SUPPLY CHAIN DISRUPTION NOTIFICATION KIT",
      "route": "/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "customs",
      "name": "CUSTOMS KIT",
      "route": "/docs-kits/kits/customs-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "osim",
      "name": "ONLINE SIMULATION KIT",
      "route": "/docs-kits/kits/online-simulation-kit/adoption-view",
      "deprecated": true
    },
    {
      "id": "model-based-production",
      "name": "MODEL BASED PRODUCTION KIT",
      "route": "/docs-kits/kits/model-based-development-and-data-processing-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "requirements",
      "name": "REQUIREMENTS KIT",
      "route": "/docs-kits/kits/requirements-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "maas",
      "name": "MANUFACTURING AS A SERVICE KIT",
      "route": "/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view",
      "deprecated": false
    },
    {
      "id": "modular-production",
      "name": "MODULAR PRODUCTION KIT",
      "route": "/docs-kits/kits/modular-production-kit/adoption-view",
      "deprecated": false
    }
  ],
  "dataspaceKits": {}
};

/**
 * Format a kit name for display in the navbar
 */
function formatKitLabel(name) {
  return name
    .replace(' KIT', '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate navbar items for the KITs dropdown, organized by category
 */
function generateKitNavItems() {
  const items = [];
  
  // Dataspace Foundation KITs
  if (kitsByCategory.dataspaceFoundation.length > 0) {
    items.push({
      type: 'html',
      value: '<hr style="margin: 8px 0; border-color: var(--ifm-color-emphasis-300);">'
    });
    items.push({
      to: '/Kits/dataspace-foundation',
      label: 'DATASPACE FOUNDATION',
      className: 'kit-category-header'
    });
    
    const sortedKits = kitsByCategory.dataspaceFoundation
      .sort((a, b) => a.name.localeCompare(b.name));
    
    sortedKits.forEach(kit => {
      items.push({
        to: kit.route,
        label: '  ' + formatKitLabel(kit.name),
        className: 'kit-nav-item'
      });
    });
  }
  
  // Industry Core Foundation KITs
  if (kitsByCategory.industryCoreFoundation.length > 0) {
    items.push({
      type: 'html',
      value: '<hr style="margin: 8px 0; border-color: var(--ifm-color-emphasis-300);">'
    });
    items.push({
      to: '/Kits/industry-core',
      label: 'INDUSTRY CORE FOUNDATION',
      className: 'kit-category-header'
    });
    
    const sortedKits = kitsByCategory.industryCoreFoundation
      .sort((a, b) => a.name.localeCompare(b.name));
    
    sortedKits.forEach(kit => {
      items.push({
        to: kit.route,
        label: '  ' + formatKitLabel(kit.name),
        className: 'kit-nav-item'
      });
    });
  }
  
  // Use Cases KITs
  if (kitsByCategory.useCases.length > 0) {
    items.push({
      type: 'html',
      value: '<hr style="margin: 8px 0; border-color: var(--ifm-color-emphasis-300);">'
    });
    items.push({
      to: '/Kits/cross-industry',
      label: 'USE CASES',
      className: 'kit-category-header'
    });
    
    const sortedKits = kitsByCategory.useCases
      .sort((a, b) => a.name.localeCompare(b.name));
    
    sortedKits.forEach(kit => {
      items.push({
        to: kit.route,
        label: '  ' + formatKitLabel(kit.name),
        className: 'kit-nav-item'
      });
    });
  }
  
  // Dataspace-specific KITs (if any)
  for (const [dataspace, kits] of Object.entries(kitsByCategory.dataspaceKits)) {
    if (kits && kits.length > 0) {
      items.push({
        type: 'html',
        value: '<hr style="margin: 8px 0; border-color: var(--ifm-color-emphasis-300);">'
      });
      const dataspaceId = dataspace.toLowerCase().replace(/s+/g, '-');
      const encodedDataspaceId = encodeURIComponent(dataspaceId);
      items.push({
        to: `/Kits/dataspace?id=${encodedDataspaceId}`,
        label: dataspace.toUpperCase(),
        className: 'kit-category-header'
      });
      
      const sortedKits = kits
        .sort((a, b) => a.name.localeCompare(b.name));
      
      sortedKits.forEach(kit => {
        items.push({
          to: kit.route,
          label: '  ' + formatKitLabel(kit.name),
          className: 'kit-nav-item'
        });
      });
    }
  }
  
  return items;
}

module.exports = { generateKitNavItems };
