#!/usr/bin/env node

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
 * This script generates generateKitNavItems.js from the master kitsData.js
 * Run this script whenever kitsData.js is updated to keep the navbar in sync.
 * 
 * Usage: node utils/generateKitNavItemsFromMasterData.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the kitsData.js file
const kitsDataPath = path.join(__dirname, '../data/kitsData.js');
const kitsDataContent = fs.readFileSync(kitsDataPath, 'utf8');

// Find where the actual data starts (after the export const kitsData line)
const dataStartIndex = kitsDataContent.indexOf('export const kitsData = {');
const relevantContent = kitsDataContent.substring(dataStartIndex);

// Extract kit objects using regex with their section context
// This looks for objects with id, name, and route properties
const kitMatches = relevantContent.matchAll(/{\s*id:\s*['"]([^'"<]+)['"]\s*,\s*name:\s*['"]([^'"<]+)['"]\s*,[\s\S]*?route:\s*['"]([^'"<]+)['"]\s*,[\s\S]*?deprecated:\s*(true|false)/g);

// Organize KITs by category
const kitsByCategory = {
  dataspaceFoundation: [],
  industryCoreFoundation: [],
  useCases: [],
  industryKits: {}
};

// First, collect all kits with their positions in the file
const allKitsWithPosition = [];
for (const match of kitMatches) {
  // Skip template placeholders
  if (match[1].includes('<') || match[2].includes('<') || match[3].includes('<')) {
    continue;
  }
  allKitsWithPosition.push({
    id: match[1],
    name: match[2],
    route: match[3],
    deprecated: match[4] === 'true',
    position: match.index
  });
}

// Determine which category each kit belongs to based on its position
const dataspaceFoundationStart = relevantContent.indexOf('dataspaceFoundation: [');
const industryCoreFoundationStart = relevantContent.indexOf('industryCoreFoundation: [');
const useCasesStart = relevantContent.indexOf('useCases: [');
const industryKitsStart = relevantContent.indexOf('industryKits: {');

for (const kit of allKitsWithPosition) {
  // Remove position field before adding to category
  const { position, ...kitWithoutPosition } = kit;
  
  if (kit.position > dataspaceFoundationStart && kit.position < industryCoreFoundationStart) {
    kitsByCategory.dataspaceFoundation.push(kitWithoutPosition);
  } else if (kit.position > industryCoreFoundationStart && kit.position < useCasesStart) {
    kitsByCategory.industryCoreFoundation.push(kitWithoutPosition);
  } else if (kit.position > useCasesStart && (industryKitsStart === -1 || kit.position < industryKitsStart)) {
    kitsByCategory.useCases.push(kitWithoutPosition);
  } else if (industryKitsStart !== -1 && kit.position > industryKitsStart) {
    // This kit is in the industryKits section - need to determine which dataspace
    const kitContext = relevantContent.substring(industryKitsStart, kit.position);
    
    // Find the last industry name before this kit
    const industryMatches = [...kitContext.matchAll(/"([^"]+)":\s*\[/g)];
    if (industryMatches.length > 0) {
      const industryName = industryMatches[industryMatches.length - 1][1];
      if (!kitsByCategory.industryKits[industryName]) {
        kitsByCategory.industryKits[industryName] = [];
      }
      kitsByCategory.industryKits[industryName].push(kitWithoutPosition);
    }
  }
}

const totalKits = allKitsWithPosition.length;
console.log('═'.repeat(60));
console.log('Starting KIT navbar generation from master data...');
console.log(`Found ${totalKits} KITs in master data`);

// Generate a hash of the kit data for change detection
const dataHash = crypto
  .createHash('sha256')
  .update(JSON.stringify(kitsByCategory))
  .digest('hex');

// Generate the output file content
const outputContent = `/********************************************************************************* 
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
 * Generated from data/kitsData.js
 * Content hash: ${dataHash}
 * 
 * To regenerate: npm run generate:nav-items
 * 
 * This file provides navbar dropdown items for KITs organized by category
 * in CommonJS format for use in docusaurus.config.js.
 */

/**
 * KIT navigation data extracted from master data, organized by category
 */
const kitsByCategory = ${JSON.stringify(kitsByCategory, null, 2)};

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
  
  // Industry-specific KITs (if any)
  for (const [industry, kits] of Object.entries(kitsByCategory.industryKits)) {
    if (kits && kits.length > 0) {
      items.push({
        type: 'html',
        value: '<hr style="margin: 8px 0; border-color: var(--ifm-color-emphasis-300);">'
      });
      // industry is already the correct ID (e.g., "shop-floor"), use it directly
      const encodedIndustryId = encodeURIComponent(industry);
      items.push({
        to: \`/Kits/industry?id=\${encodedIndustryId}\`,
        label: industry.toUpperCase(),
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
`;

// Write the output file to the generated folder
const outputPath = path.join(__dirname, 'generated', 'kitNavItems.js');
fs.writeFileSync(outputPath, outputContent);

const kitCountByCategory = {
  dataspaceFoundation: kitsByCategory.dataspaceFoundation.length,
  industryCoreFoundation: kitsByCategory.industryCoreFoundation.length,
  useCases: kitsByCategory.useCases.length
};

// Count dataspace-specific KITs
let industryKitsCount = 0;
for (const [dataspace, kits] of Object.entries(kitsByCategory.industryKits)) {
  industryKitsCount += kits.length;
  if (kits.length > 0) {
    kitCountByCategory[dataspace] = kits.length;
  }
}

const totalKitsInNavbar = Object.values(kitCountByCategory).reduce((a, b) => a + b, 0);

console.log(`✓ Generated ${outputPath}`);
console.log('✓ Content hash: ' + dataHash);
console.log(`✓ Extracted ${totalKitsInNavbar} KITs and added to the navbar`);
console.log('═'.repeat(60));