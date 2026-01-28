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

import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { getAllKits, industries, kitsData } from '@site/data/kitsData';
import FilteredKitsGallery from '@site/src/components/2.0/FilteredKitsGallery';
import KitGalleryHeader from '@site/src/components/2.0/KitGalleryHeader';
import KitsFooter from '@site/src/components/2.0/KitsFooter';
import WarningIcon from '@mui/icons-material/Warning';

export default function GenericIndustryPage() {
  const location = useLocation();
  const [industry, setIndustry] = useState(null);
  const [filteredKits, setFilteredKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Extract ref from URL query parameters
  const urlParams = new URLSearchParams(location.search);
  const ref = urlParams.get('ref');

  useEffect(() => {
    // Extract industry ID and ref from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const industryId = urlParams.get('id');
    if (!industryId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Find the matching industry by ID
    const matchingIndustry = industries.find(ds => ds.id === industryId);

    if (matchingIndustry) {
      setIndustry(matchingIndustry);
      
      // Get all kits and filter for this industry (include deprecated)
      const allKits = getAllKits();
      let kitsForIndustry = allKits.filter(kit => 
        kit.industries && kit.industries.includes(matchingIndustry.id)
      );
      
      // Also include industry-specific KITs if they exist
      // Use the industry ID (lowercase) to match the keys in industryKits
      if (kitsData.industryKits && kitsData.industryKits[matchingIndustry.id]) {
        const industrySpecificKits = kitsData.industryKits[matchingIndustry.id];
        kitsForIndustry = [...kitsForIndustry, ...industrySpecificKits];
      }
      
      // Deduplicate kits by ID (in case a kit appears in both filtered results and industry-specific)
      const uniqueKitIds = new Set();
      kitsForIndustry = kitsForIndustry.filter(kit => {
        if (uniqueKitIds.has(kit.id)) {
          return false;
        }
        uniqueKitIds.add(kit.id);
        return true;
      });
      
      // Add category information to each kit based on its position in kitsData
      kitsForIndustry = kitsForIndustry.map(kit => {
        let categoryType = 'Unknown';
        
        // Check which category the kit belongs to
        if (kitsData.dataspaceFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Dataspace Foundation';
        } else if (kitsData.industryCoreFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Industry Core Foundation';
        } else if (kitsData.useCases?.some(k => k.id === kit.id)) {
          categoryType = 'Cross-Industry Use Cases';
        } else if (kitsData.industryKits && kitsData.industryKits[matchingIndustry.id]?.some(k => k.id === kit.id)) {
          categoryType = `${matchingIndustry.name} Specific`;
        }
        
        return { ...kit, categoryType };
      });
      
      setFilteredKits(kitsForIndustry);
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [location.search]);

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          background: 'var(--ifm-background-color)'
        }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-600)' }}>
            Loading industry information...
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !industry) {
    return (
      <Layout>
        <Head>
          <title>Industry Not Found | Eclipse Tractus-X</title>
        </Head>
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          background: 'var(--ifm-background-color)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Industry Not Found</h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--ifm-color-emphasis-700)',
            marginBottom: '2rem'
          }}>
            The requested industry could not be found.
          </p>
          <a 
            href="/kits" 
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: 'var(--ifm-color-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '600'
            }}
          >
            ← Back to KITs Overview
          </a>
        </div>
      </Layout>
    );
  }

  // Calculate statistics - ensure total matches sum of industrySpecific + crossIndustry
  const industrySpecificKits = filteredKits.filter(kit => kit.categoryType && kit.categoryType.endsWith(' Specific'));
  const crossIndustryKits = filteredKits.filter(kit => 
    kit.categoryType && ['Dataspace Foundation', 'Industry Core Foundation', 'Cross-Industry Use Cases'].includes(kit.categoryType)
  );
  
  const kitStats = {
    industrySpecific: industrySpecificKits.length,
    crossIndustry: crossIndustryKits.length,
    total: industrySpecificKits.length + crossIndustryKits.length, // Sum of both categories
    sandbox: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Sandbox').length,
    incubating: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Incubating').length,
    graduated: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Graduated').length,
  };

  return (
    <Layout>
      <Head>
        <title>{industry.name} KITs | Eclipse Tractus-X</title>
        <meta 
          name="description" 
          content={`Explore ${industry.name} KITs - comprehensive documentation and resources for building interoperable solutions in the ${industry.name} industry ecosystem.`}
        />
        <meta property="og:title" content={`${industry.name} KITs | Eclipse Tractus-X`} />
        <meta 
          property="og:description" 
          content={`Explore ${industry.name} KITs - comprehensive documentation and resources for building interoperable solutions in the ${industry.name} industry ecosystem.`}
        />
        <link rel="canonical" href={`https://eclipse-tractusx.github.io/Kits/industry?id=${industry.id}`} />
      </Head>
      
      <KitGalleryHeader
        categoryData={{
          icon: industry.icon,
          gradient: industry.gradient
        }}
        title={`${industry.name} KITs`}
        subtitle={industry.subtitle}
        description={industry.description}
        url={industry.url}
        gradient={industry.gradient}
        statistics={kitStats}
        dataspaces={industry.dataspaces}
        backButtonLink={ref ? `/Kits?scrollTo=${ref}` : `/Kits`}
        industryLayout={true}
      />


      {/* KITs Gallery */}
      <FilteredKitsGallery 
        kits={filteredKits}
        showIndustryFilter={false}
        showCategoryFilter={false}
        showDomainFilter={true}
        showScopeFilter={true}
        showHeader={false}
        title={`${industry.name} KITs Collection`}
        description={`All KITs available for the ${industry.name} industry ecosystem`}
        backRef={ref}
        noResultsMessage={`There are no specific KITs limited only for the ${industry.name} industry at this time.`}
      />
      <KitsFooter 
        disclaimer={`* The dataspace logos are a trademark property of their affiliated companies and organizations.`}
      />
    </Layout>
  );
}