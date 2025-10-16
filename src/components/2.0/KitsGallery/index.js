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

import React, { useState, useEffect } from 'react';
import Link from "@docusaurus/Link";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles.module.scss';

// Import the raw logos we just moved
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

// Kit data with their respective logos and routes
const kitsData = {
  dataspaceFoundation: [
    {
      id: 'connector',
      name: 'CONNECTOR KIT',
      logo: ConnectorKitLogo,
      route: '/docs-kits/kits/connector-kit/adoption-view/intro',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'data-governance',
      name: 'DATA GOVERNANCE KIT',
      logo: DataGovernanceLogo,
      route: '/docs-kits/kits/data-governance/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'data-trust-security',
      name: 'DATA TRUST & SECURITY KIT',
      logo: DataTrustSecurityLogo,
      route: '/docs-kits/kits/data-trust-and-security/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'business-partner',
      name: 'BUSINESS PARTNER KIT',
      logo: BusinessPartnerLogo,
      route: '/docs-kits/kits/business-partner/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X']
    }
  ],
  industryCoreFoundation: [
    {
      id: 'industry-core',
      name: 'INDUSTRY CORE KIT',
      logo: IndustryCoreKitLogo,
      route: '/docs-kits/kits/industry-core/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X']
    },
    {
      id: 'digital-twin',
      name: 'DIGITAL TWIN KIT',
      logo: DigitalTwinKitLogo,
      route: '/docs-kits/kits/digital-twin/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X']
    },
    {
      id: 'data-driven-quality',
      name: 'DATA DRIVEN QUALITY KIT',
      logo: DataDrivenQualityLogo,
      route: '/docs-kits/kits/data-driven-quality/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X']
    },
    {
      id: 'traceability',
      name: 'TRACEABILITY KIT',
      logo: TraceabilityKitLogo,
      route: '/docs-kits/kits/traceability/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X']
    },
    {
      id: 'pcf',
      name: 'PRODUCT CARBON FOOTPRINT KIT',
      logo: PCFKitLogo,
      route: '/docs-kits/kits/pcf/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'data-chain',
      name: 'DATA CHAIN KIT',
      logo: DataChainKitLogo,
      route: '/docs-kits/kits/data-chain/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X', 'Semiconductor-X']
    }
  ],
  useCases: [
    {
      id: 'ess',
      name: 'ESS KIT',
      logo: ESSKitLogo,
      route: '/docs-kits/kits/ess/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'eco-pass',
      name: 'ECO PASS KIT',
      logo: EcoPassKitLogo,
      route: '/docs-kits/kits/eco-pass/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X']
    },
    {
      id: 'puris',
      name: 'PURIS KIT',
      logo: PurisKitLogo,
      route: '/docs-kits/kits/puris/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X']
    },
    {
      id: 'dcm',
      name: 'DEMAND & CAPACITY MANAGEMENT KIT',
      logo: DCMKitLogo,
      route: '/docs-kits/kits/dcm/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X']
    },
    {
      id: 'logistics',
      name: 'LOGISTICS KIT',
      logo: LogisticsKitLogo,
      route: '/docs-kits/kits/logistics/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X', 'Construct-X']
    },
    {
      id: 'maas',
      name: 'MANUFACTURING AS A SERVICE KIT',
      logo: MaaSKitLogo,
      route: '/docs-kits/kits/maas/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X']
    },
    {
      id: 'model-based-production',
      name: 'MODEL BASED PRODUCTION KIT',
      logo: ModelBasedProductionLogo,
      route: '/docs-kits/kits/model-based-production/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X']
    },
    {
      id: 'modular-production',
      name: 'MODULAR PRODUCTION KIT',
      logo: ModularProductionLogo,
      route: '/docs-kits/kits/modular-production/adoption-view',
      dataspaces: ['Catena-X', 'Factory-X']
    },
    {
      id: 'osim',
      name: 'ONLINE SIMULATION KIT',
      logo: OSIMKitLogo,
      route: '/docs-kits/kits/osim/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X']
    },
    {
      id: 'requirements',
      name: 'REQUIREMENTS KIT',
      logo: RequirementsKitLogo,
      route: '/docs-kits/kits/requirements/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Semiconductor-X', 'Factory-X', 'Construct-X', 'Chem-X']
    },
    {
      id: 'supply-chain-disruption',
      name: 'SUPPLY CHAIN DISRUPTION NOTIFICATION KIT',
      logo: SupplyChainDisruptionLogo,
      route: '/docs-kits/kits/supply-chain-disruption/adoption-view',
      dataspaces: ['Catena-X', 'Aerospace-X', 'Factory-X']
    }
  ]
};

const KitCard = ({ kit }) => {
  return (
    <div className={styles.kitCardWrapper}>
      <div className={styles.kitCard__stackContainer}>
        <div className={styles.kitCard__layer3}></div>
        <div className={styles.kitCard__layer2}></div>
        <Link to={kit.route} className={styles.kitCard}>
          <div className={styles.kitCard__iconContainer}>
            <kit.logo className={styles.kitCard__icon} />
          </div>
        </Link>
      </div>
      <h3 className={styles.kitCard__title}>{kit.name}</h3>
    </div>
  );
};

export default function KitsGalleryWithCategories({ title, description }) {
  const [selectedDataspace, setSelectedDataspace] = useState('All Dataspaces');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

  // Get all unique dataspaces from all kits
  const allDataspaces = Array.from(new Set(
    [...kitsData.dataspaceFoundation, ...kitsData.industryCoreFoundation, ...kitsData.useCases]
      .flatMap(kit => kit.dataspaces)
  )).sort();

  // Filter kits based on selected dataspace
  const filterKits = (kits) => {
    if (selectedDataspace === 'All Dataspaces') {
      return kits;
    }
    return kits.filter(kit => kit.dataspaces.includes(selectedDataspace));
  };

  // Sort kits based on sort order
  const sortKits = (kits) => {
    if (sortOrder === 'default') {
      return kits;
    }
    const sorted = [...kits].sort((a, b) => a.name.localeCompare(b.name));
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  };

  // Apply both filter and sort
  const processKits = (kits) => {
    return sortKits(filterKits(kits));
  };

  const handleDataspaceChange = (event) => {
    setSelectedDataspace(event.target.value);
  };

  const handleSort = () => {
    if (sortOrder === 'default' || sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };

  const filteredDataspaceFoundation = processKits(kitsData.dataspaceFoundation);
  const filteredIndustryCoreFoundation = processKits(kitsData.industryCoreFoundation);
  const filteredUseCases = processKits(kitsData.useCases);

  return (
    <section className={styles.kitsGallery}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Gallery of KITs"}</h2>
          <p className={styles.description}>
            {description || "Unlock the full power of kits. Browse all the available specifications, blueprints and reference implementations."}
          </p>
        </div>
{/* Filters */}
          <div className={styles.filtersContainer}>
            <Box>
              <FormControl size="small">
                <Select
                  labelId="dataspace-label"
                  id="dataspace-options"
                  value={selectedDataspace}
                  onChange={handleDataspaceChange}
                  className={styles.selectInput}
                  sx={{
                    padding: '0 0.5rem',
                    color: '#fff',
                    '& .MuiSvgIcon-root': {
                      color: '#faa023',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#faa023'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c37304',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ed8c05',
                    }
                  }}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: '#1f1f1f',
                          color: '#fff',
                        }
                      },
                    }
                  }}
                >
                  <MenuItem value={'All Dataspaces'}>All Dataspaces</MenuItem>
                  {allDataspaces.map(dataspace => (
                    <MenuItem key={dataspace} value={dataspace}>{dataspace}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <div className={styles.buttonContainer}>
              {sortOrder === 'asc' ? (
                <button className={styles.sortButton} onClick={handleSort}>A-Z &darr;</button>
              ) : sortOrder === 'desc' ? (
                <button className={styles.sortButton} onClick={handleSort}>Z-A &uarr;</button>
              ) : (
                <button className={styles.sortButton} onClick={handleSort}>A-Z</button>
              )}
            </div>
          </div>
        {/* Dataspace Foundation Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>DATASPACE FOUNDATION</h3>

          <div className={styles.grid}>
            {filteredDataspaceFoundation.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredDataspaceFoundation.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

        {/* Industry Core Foundation Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>INDUSTRY CORE FOUNDATION</h3>
          <div className={styles.grid}>
            {filteredIndustryCoreFoundation.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredIndustryCoreFoundation.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>CROSS DATASPACE USE CASES</h3>
          <div className={styles.grid}>
            {filteredUseCases.length === 0 ? (
              <p className={styles.noMatch}>No kits found for this dataspace</p>
            ) : (
              filteredUseCases.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}