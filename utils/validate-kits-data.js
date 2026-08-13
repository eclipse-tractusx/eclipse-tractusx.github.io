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

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Initialize AJV with strict mode
const ajv = new Ajv({ 
  allErrors: true, 
  strict: true,
  validateFormats: true 
});
addFormats(ajv);

// Load schemas from external JSON file
const schemaPath = path.join(__dirname, 'schemas', 'kitsData.schema.json');
const fullSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Add the full schema to AJV so it can resolve $ref references
ajv.addSchema(fullSchema);

// Extract individual schemas from definitions for reference
const kitSchema = fullSchema.definitions.kit;
const dataspaceSchema = fullSchema.definitions.dataspace;
const industrySchema = fullSchema.definitions.industry;

// Compile schemas from the definitions
const validateKit = ajv.compile({ 
  $schema: fullSchema.$schema,
  ...kitSchema 
});
const validateIndustry = ajv.compile({ 
  $schema: fullSchema.$schema,
  definitions: fullSchema.definitions,
  ...industrySchema 
});

// Check for silent mode
const silentMode = process.argv.includes('--silent') || process.argv.includes('-s');

// Validation functions
function validateKits(kits, category) {
  const errors = [];
  const ids = new Set();
  
  kits.forEach((kit, index) => {
    // Check for duplicate IDs
    if (ids.has(kit.id)) {
      errors.push({
        category,
        index,
        id: kit.id,
        error: `Duplicate KIT ID: ${kit.id}`
      });
    }
    ids.add(kit.id);
    
    // Validate against schema
    const valid = validateKit(kit);
    if (!valid) {
      errors.push({
        category,
        index,
        id: kit.id,
        error: 'Schema validation failed',
        details: validateKit.errors
      });
    }
    
    // Additional business logic validations
    if (kit.deprecated && !kit.maturity.deprecatedAt) {
      errors.push({
        category,
        index,
        id: kit.id,
        error: 'Deprecated KIT must have deprecatedAt date'
      });
    }
    
    if (kit.maturity.currentLevel === 'Graduated' && !kit.maturity.graduatedAt) {
      errors.push({
        category,
        index,
        id: kit.id,
        error: 'Graduated KIT must have graduatedAt date'
      });
    }
    
    // Validate metadata dates
    if (kit.metadata.created && kit.metadata.lastUpdated) {
      const created = new Date(kit.metadata.created);
      const updated = new Date(kit.metadata.lastUpdated);
      if (updated < created) {
        errors.push({
          category,
          index,
          id: kit.id,
          error: 'lastUpdated date cannot be before created date'
        });
      }
    }
  });
  
  return errors;
}

function validateIndustries(industries) {
  const errors = [];
  const ids = new Set();
  const dataspaceNames = new Set();
  
  industries.forEach((industry, index) => {
    // Check for duplicate IDs
    if (ids.has(industry.id)) {
      errors.push({
        type: 'industry',
        index,
        id: industry.id,
        error: `Duplicate Industry ID: ${industry.id}`
      });
    }
    ids.add(industry.id);
    
    // Validate against schema
    const valid = validateIndustry(industry);
    if (!valid) {
      errors.push({
        type: 'industry',
        index,
        id: industry.id,
        error: 'Schema validation failed',
        details: validateIndustry.errors
      });
    }
    
    // Validate dataspaces
    if (industry.dataspaces) {
      industry.dataspaces.forEach((dataspace, dsIndex) => {
        // Check for duplicate dataspace names
        if (dataspaceNames.has(dataspace.name)) {
          errors.push({
            type: 'dataspace',
            industry: industry.id,
            index: dsIndex,
            name: dataspace.name,
            error: `Duplicate Dataspace name: ${dataspace.name}`
          });
        }
        dataspaceNames.add(dataspace.name);
      });
    }
  });
  
  return errors;
}

function validateDataspaceKitReferences(industries, allKitIds) {
  const errors = [];
  
  industries.forEach(industry => {
    if (industry.dataspaces) {
      industry.dataspaces.forEach(dataspace => {
        if (dataspace.kits) {
          dataspace.kits.forEach(kitId => {
            if (!allKitIds.has(kitId)) {
              errors.push({
                type: 'reference',
                industry: industry.id,
                dataspace: dataspace.name,
                kitId,
                error: `Invalid KIT reference: ${kitId} does not exist`
              });
            }
          });
        }
      });
    }
  });
  
  return errors;
}

function validateKitIndustryReferences(kits, validIndustries) {
  const errors = [];
  const industryIds = new Set(validIndustries.map(i => i.id));
  
  kits.forEach(kit => {
    // Only validate industries if the kit has them (foundation kits may not)
    if (kit.industries && Array.isArray(kit.industries)) {
      kit.industries.forEach(industry => {
        if (!industryIds.has(industry)) {
          errors.push({
            type: 'reference',
            kitId: kit.id,
            industry,
            error: `Invalid industry reference: ${industry} does not exist (must be an industry ID, not name)`
          });
        }
      });
    }
  });
  
  return errors;
}

// Main validation function
function validateKitsData() {
  if (!silentMode) {
    console.log('🔍 Starting KITs Data Validation...\n');
  }
  
  let hasErrors = false;
  const allErrors = [];
  
  try {
    // Read and parse the kitsData.js file
    const dataPath = path.join(__dirname, '..', 'data', 'kitsData.js');
    
    if (!silentMode) {
      console.log('📖 Reading kitsData.js...\n');
    }
    
    // Read the file content
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Extract kitsData object using regex
    const kitsDataMatch = fileContent.match(/export const kitsData = ({[\s\S]*?^});/m);
    const industriesMatch = fileContent.match(/export const industries = (\[[\s\S]*?^\]);/m);
    
    if (!kitsDataMatch || !industriesMatch) {
      throw new Error('Could not parse kitsData or industries from kitsData.js');
    }
    
    // Use eval to parse the objects (remove React imports and icon references first)
    const cleanedKitsData = kitsDataMatch[1]
      .replace(/logo:\s*\w+Logo,/g, 'logo: null,')
      .replace(/icon:\s*\w+,/g, 'icon: null,');
    
    const cleanedIndustries = industriesMatch[1]
      .replace(/icon:\s*\w+,/g, 'icon: null,');
    
    const kitsData = eval('(' + cleanedKitsData + ')');
    const industries = eval('(' + cleanedIndustries + ')');
    
    if (!silentMode) {
      console.log(`✓ Loaded ${Object.keys(kitsData).length} KIT categories and ${industries.length} industries\n`);
    }
    
    // Collect all KITs
    const allKits = [
      ...kitsData.dataspaceFoundation,
      ...kitsData.industryCoreFoundation,
      ...kitsData.useCases
    ];
    
    // Add industry-specific kits
    if (kitsData.industryKits) {
      Object.values(kitsData.industryKits).forEach(kits => {
        if (Array.isArray(kits) && kits.length > 0) {
          allKits.push(...kits);
        }
      });
    }
    
    // Collect all KIT IDs
    const allKitIds = new Set(allKits.map(kit => kit.id));
    
    // Validate KITs by category
    if (!silentMode) console.log('📋 Validating Dataspace Foundation KITs...');
    const dfErrors = validateKits(kitsData.dataspaceFoundation, 'Dataspace Foundation');
    allErrors.push(...dfErrors);
    if (!silentMode) console.log(`   ${dfErrors.length === 0 ? '✅' : '❌'} ${dfErrors.length} errors found\n`);
    
    if (!silentMode) console.log('📋 Validating Industry Core Foundation KITs...');
    const icfErrors = validateKits(kitsData.industryCoreFoundation, 'Industry Core Foundation');
    allErrors.push(...icfErrors);
    if (!silentMode) console.log(`   ${icfErrors.length === 0 ? '✅' : '❌'} ${icfErrors.length} errors found\n`);
    
    if (!silentMode) console.log('📋 Validating Use Case KITs...');
    const ucErrors = validateKits(kitsData.useCases, 'Use Cases');
    allErrors.push(...ucErrors);
    if (!silentMode) console.log(`   ${ucErrors.length === 0 ? '✅' : '❌'} ${ucErrors.length} errors found\n`);
    
    if (!silentMode) console.log('🏭 Validating Industries...');
    const indErrors = validateIndustries(industries);
    allErrors.push(...indErrors);
    if (!silentMode) console.log(`   ${indErrors.length === 0 ? '✅' : '❌'} ${indErrors.length} errors found\n`);
    
    if (!silentMode) console.log('🔗 Validating Dataspace KIT References...');
    const refErrors = validateDataspaceKitReferences(industries, allKitIds);
    allErrors.push(...refErrors);
    if (!silentMode) console.log(`   ${refErrors.length === 0 ? '✅' : '❌'} ${refErrors.length} errors found\n`);
    
    if (!silentMode) console.log('🔗 Validating KIT Industry References...');
    const kitRefErrors = validateKitIndustryReferences(allKits, industries);
    allErrors.push(...kitRefErrors);
    if (!silentMode) console.log(`   ${kitRefErrors.length === 0 ? '✅' : '❌'} ${kitRefErrors.length} errors found\n`);
    
    // Print summary
    if (silentMode) {
      // Simple output in silent mode
      if (allErrors.length === 0) {
        console.log('═'.repeat(60));
        console.log('KIT Master Data Validated!');
        console.log('✅ All validations passed! Data structure is valid.');
        console.log('═'.repeat(60));
      } else {
        console.log('═'.repeat(60));
        console.log('KIT Master Data Validation Failed!');
        console.log(`❌ Validation failed with ${allErrors.length} error(s):\n`);
        allErrors.forEach((error, index) => {
          console.log(`${index + 1}. [${error.type || error.category}] ${error.error}`);
          if (error.id || error.kitId) {
            console.log(`   ID: ${error.id || error.kitId}`);
          }
          if (error.details) {
            console.log(`   Details: ${JSON.stringify(error.details, null, 2)}`);
          }
          console.log();
        });
        console.log('═'.repeat(60));
        hasErrors = true;
      }
    } else {
      // Detailed output in normal mode
      console.log('═'.repeat(60));
      if (allErrors.length === 0) {
        console.log('✅ All validations passed! Data structure is valid.');
      } else {
        console.log(`❌ Validation failed with ${allErrors.length} error(s):\n`);
        allErrors.forEach((error, index) => {
          console.log(`${index + 1}. [${error.type || error.category}] ${error.error}`);
          if (error.id || error.kitId) {
            console.log(`   ID: ${error.id || error.kitId}`);
          }
          if (error.details) {
            console.log(`   Details: ${JSON.stringify(error.details, null, 2)}`);
          }
          console.log();
        });
        hasErrors = true;
      }
      console.log('═'.repeat(60));
    }
    
  } catch (error) {
    console.error('❌ Fatal error during validation:', error.message);
    hasErrors = true;
  }
  
  process.exit(hasErrors ? 1 : 0);
}

// Run validation if called directly
if (require.main === module) {
  validateKitsData();
}

module.exports = {
  validateKits,
  validateIndustries,
  validateDataspaceKitReferences,
  validateKitIndustryReferences,
  kitSchema,
  industrySchema,
  dataspaceSchema
};
