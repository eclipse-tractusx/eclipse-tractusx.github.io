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

import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import ExpandedKitCard from '@site/src/components/2.0/ExpandedKitCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ExpandedKitsGrid = ({ title, kits, noResultsMessage = "No kits found for this scope" }) => {
  return (
    <div className={styles.section}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      <div className={styles.expandedGrid}>
        {kits.length === 0 ? (
          <div className={styles.noMatch}>
            <div className={styles.noMatchIcon}>
              <RocketLaunchIcon sx={{ fontSize: 48 }} />
            </div>
            <p className={styles.noMatchMessage}>{noResultsMessage}</p>
            <p className={styles.noMatchSubtext}>
              Want to contribute? Start building KITs and join the Eclipse Tractus-X community!
            </p>
            <Link to="/documentation/kit-getting-started" className={styles.ctaButton}>
              <RocketLaunchIcon sx={{ fontSize: 20, marginRight: '0.5rem' }} />
              Get Started with KIT Development
            </Link>
          </div>
        ) : (
          kits.map((kit) => (
            <ExpandedKitCard key={kit.id} kit={kit} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpandedKitsGrid;
