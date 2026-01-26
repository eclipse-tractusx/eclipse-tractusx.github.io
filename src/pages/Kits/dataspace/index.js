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
import { getKitsByDataspace, industries } from '@site/data/kitsData';
import FilteredKitsGallery from '@site/src/components/2.0/FilteredKitsGallery';
import KitGalleryHeader from '@site/src/components/2.0/KitGalleryHeader';
import KitsFooter from '@site/src/components/2.0/KitsFooter';
import WarningIcon from '@mui/icons-material/Warning';

export default function DataspacePage() {
  const location = useLocation();
  const [dataspace, setDataspace] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [filteredKits, setFilteredKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Extract ref from URL query parameters
  const urlParams = new URLSearchParams(location.search);
  const ref = urlParams.get('ref');
  const dataspaceName = urlParams.get('name');

  useEffect(() => {
    // Extract dataspace name from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const dataspaceName = urlParams.get('name');
    
    if (!dataspaceName) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Find the dataspace across all industries
    let foundDataspace = null;
    let foundIndustry = null;
    
    for (const ind of industries) {
      if (ind.dataspaces) {
        const ds = ind.dataspaces.find(d => d.name === dataspaceName);
        if (ds) {
          foundDataspace = ds;
          foundIndustry = ind;
          break;
        }
      }
    }

    if (foundDataspace && foundIndustry) {
      setDataspace(foundDataspace);
      setIndustry(foundIndustry);
      
      // Get KITs associated with this dataspace
      let kitsForDataspace = getKitsByDataspace(dataspaceName);
      
      // Add category information to each kit based on its position in kitsData
      kitsForDataspace = kitsForDataspace.map(kit => {
        let categoryType = 'Unknown';
        
        // Check which category the kit belongs to
        const { kitsData } = require('@site/data/kitsData');
        if (kitsData.dataspaceFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Dataspace Foundation';
        } else if (kitsData.industryCoreFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Industry Core Foundation';
        } else if (kitsData.useCases?.some(k => k.id === kit.id)) {
          categoryType = 'Cross-Industry Use Cases';
        } else if (kitsData.industryKits) {
          // Check if it's an industry-specific kit
          for (const [industryId, kits] of Object.entries(kitsData.industryKits)) {
            if (Array.isArray(kits) && kits.some(k => k.id === kit.id)) {
              const ind = industries.find(i => i.id === industryId);
              categoryType = ind ? `${ind.name} Specific` : 'Industry Specific';
              break;
            }
          }
        }
        
        return { ...kit, categoryType };
      });
      
      setFilteredKits(kitsForDataspace);
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
            Loading dataspace information...
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !dataspace) {
    return (
      <Layout>
        <Head>
          <title>Dataspace Not Found | Eclipse Tractus-X</title>
        </Head>
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          background: 'var(--ifm-background-color)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Dataspace Not Found</h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--ifm-color-emphasis-700)',
            marginBottom: '2rem'
          }}>
            The requested dataspace could not be found.
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

  const kitStats = {
    total: filteredKits.length,
    sandbox: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Sandbox').length,
    incubating: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Incubating').length,
    graduated: filteredKits.filter(kit => kit.maturity?.currentLevel === 'Graduated').length,
  };

  return (
    <Layout>
      <Head>
        <title>{dataspace.name} KITs | Eclipse Tractus-X</title>
        <meta 
          name="description" 
          content={`Explore ${dataspace.name} KITs - comprehensive documentation and resources for building interoperable solutions in the ${dataspace.name} dataspace ecosystem.`}
        />
        <meta property="og:title" content={`${dataspace.name} KITs | Eclipse Tractus-X`} />
        <meta 
          property="og:description" 
          content={`Explore ${dataspace.name} KITs - comprehensive documentation and resources for building interoperable solutions in the ${dataspace.name} dataspace ecosystem.`}
        />
        <link rel="canonical" href={`https://eclipse-tractusx.github.io/Kits/dataspace?name=${encodeURIComponent(dataspace.name)}`} />
      </Head>
      
      <KitGalleryHeader
        title={`${dataspace.name} KITs`}
        subtitle={dataspace.subtitle}
        description={dataspace.description}
        logo={dataspace.logo}
        url={dataspace.url}
        gradient={dataspace.gradient}
        statistics={kitStats}
        backButtonLink={ref ? `/Kits?scrollTo=${ref}` : `/Kits/industry?id=${industry.id}`}
        backButtonText={ref ? `Back to ${ref.charAt(0).toUpperCase() + ref.slice(1)}` : `Back to ${industry.name}`}
      />

      {/* KITs Gallery */}
      <FilteredKitsGallery 
        kits={filteredKits}
        showIndustryFilter={false}
        showCategoryFilter={true}
        showDomainFilter={true}
        showHeader={false}
        title={`${dataspace.name} KITs Collection`}
        description={`All KITs available in the ${dataspace.name} dataspace ecosystem`}
        backRef={ref}
      />

      <div style={{
          backgroundColor: 'var(--ifm-color-warning-contrast-background)',
          border: '1px solid var(--ifm-color-warning-dark)',
          borderRadius: '8px',
          padding: '16px 24px',
          margin: '24px auto',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2px',
          flexShrink: 0,
          color: 'var(--ifm-color-warning-darkest)'
        }}>
          <WarningIcon sx={{ fontSize: 28 }} />
        </div>
        <div>
          <strong style={{ display: 'block', marginBottom: '8px', fontSize: '16px' }}>
            Multi-Dataspace/Industry KIT 2.0 Content Refactor in Progress
          </strong>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
            The Multi-Dataspace/Industry KIT 2.0 structure may not yet be fully implemented in every KIT. 
            The KITs assigned to {dataspace.name} may change, may not be fully correct or may be incomplete as we continue to evolve.
            The current assigned KITs may still contain content referring to Catena-X or other dataspaces/industries.
            <br />
            The ticket to refactor the KITs content is planned here (to be published in R26.03):{' '}
            <a 
              href="https://github.com/eclipse-tractusx/sig-release/issues/1567" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--ifm-color-primary)', textDecoration: 'underline' }}
            >
              eclipse-tractusx/sig-release#1567
            </a>. <br /><br />
            To collaborate, add your dataspace to this industry or support the content refactor, please join our{' '}
            <a 
              href="https://eclipse-tractusx.github.io/community/open-meetings#Eclipse%20Tractus-X%20KITs%20Community%20Office%20Hour"
              style={{ color: 'var(--ifm-color-primary)', textDecoration: 'underline' }}
            >
              KIT office hours
            </a>.
          </p>
        </div>
      </div>

      <KitsFooter 
        disclaimer={`* The ${dataspace?.name} logo and branding are trademark properties of ${dataspace?.name} and its affiliated organizations.`}
      />
    </Layout>
  );
}
