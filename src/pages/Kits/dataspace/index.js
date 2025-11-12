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
import { getAllKits, dataspaces, kitsData } from '@site/data/kitsData';
import FilteredKitsGallery from '@site/src/components/2.0/FilteredKitsGallery';
import KitGalleryHeader from '@site/src/components/2.0/KitGalleryHeader';
import KitsFooter from '@site/src/components/2.0/KitsFooter';

export default function GenericDataspacePage() {
  const location = useLocation();
  const [dataspace, setDataspace] = useState(null);
  const [filteredKits, setFilteredKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Extract ref from URL query parameters
  const urlParams = new URLSearchParams(location.search);
  const ref = urlParams.get('ref');

  useEffect(() => {
    // Extract dataspace ID and ref from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const dataspaceId = urlParams.get('id');
    if (!dataspaceId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Find the matching dataspace by ID
    const matchingDataspace = dataspaces.find(ds => ds.id === dataspaceId);

    if (matchingDataspace) {
      setDataspace(matchingDataspace);
      
      // Get all kits and filter for this dataspace (include deprecated)
      const allKits = getAllKits();
      let kitsForDataspace = allKits.filter(kit => 
        kit.dataspaces && kit.dataspaces.includes(matchingDataspace.name)
      );
      
      // Also include dataspace-specific KITs if they exist
      // Use the dataspace ID (lowercase) to match the keys in dataspaceKits
      if (kitsData.dataspaceKits && kitsData.dataspaceKits[matchingDataspace.id]) {
        const dataspaceSpecificKits = kitsData.dataspaceKits[matchingDataspace.id];
        kitsForDataspace = [...kitsForDataspace, ...dataspaceSpecificKits];
      }
      
      // Add category information to each kit based on its position in kitsData
      kitsForDataspace = kitsForDataspace.map(kit => {
        let categoryType = 'Unknown';
        
        // Check which category the kit belongs to
        if (kitsData.dataspaceFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Dataspace Foundation';
        } else if (kitsData.industryCoreFoundation?.some(k => k.id === kit.id)) {
          categoryType = 'Industry Core Foundation';
        } else if (kitsData.useCases?.some(k => k.id === kit.id)) {
          categoryType = 'Cross-Industry Use Cases';
        } else if (kitsData.dataspaceKits && kitsData.dataspaceKits[matchingDataspace.id]?.some(k => k.id === kit.id)) {
          categoryType = `${matchingDataspace.name} Specific`;
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
        <link rel="canonical" href={`https://eclipse-tractusx.github.io/Kits/dataspace?id=${dataspace.id}`} />
      </Head>
      
      <KitGalleryHeader
        title={`${dataspace.name} KITs`}
        subtitle={dataspace.subtitle}
        description={dataspace.description}
        logo={dataspace.logo}
        url={dataspace.url}
        gradient={dataspace.gradient}
        statistics={kitStats}
        backButtonLink={ref ? `/Kits?scrollTo=${ref}` : `/Kits`}
      />

      {/* KITs Gallery */}
      <FilteredKitsGallery 
        kits={filteredKits}
        showDataspaceFilter={false}
        showCategoryFilter={true}
        showHeader={false}
        title={`${dataspace.name} KITs Collection`}
        description={`All KITs available for the ${dataspace.name} dataspace ecosystem`}
        backRef={ref}
      />
      
      <KitsFooter 
        disclaimer={`* The ${dataspace?.name} logo is a trademark property of its affiliated companies and organizations.`}
      />
    </Layout>
  );
}