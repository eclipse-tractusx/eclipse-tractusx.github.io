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

import React, { useMemo } from 'react';
import CountUpNumber from '../CountUpNumber';
import { getAllKits } from '@site/data/kitsData';
import styles from './styles.module.scss';
import {
  Build as BuildIcon,
  Language as LanguageIcon,
  School as SchoolIcon,
  Rocket as RocketIcon,
  Add as ContributeIcon,
  Analytics as StatisticsIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';

const KitStatistics = () => {
  const statistics = useMemo(() => {
    const allKits = getAllKits();
    
    // Count total KITs (excluding deprecated ones)
    const totalKits = allKits.filter(kit => !kit.deprecated).length;
    
    // Count unique dataspaces
    const allDataspaces = new Set();
    allKits.forEach(kit => {
      if (!kit.deprecated && kit.dataspaces) {
        kit.dataspaces.forEach(dataspace => allDataspaces.add(dataspace));
      }
    });
    const totalDataspaces = allDataspaces.size;
    
    // Count KITs by maturity level
    const maturityCounts = allKits
      .filter(kit => !kit.deprecated)
      .reduce((counts, kit) => {
        const level = kit.maturity?.currentLevel?.toLowerCase() || 'unknown';
        counts[level] = (counts[level] || 0) + 1;
        return counts;
      }, {});
    
    const graduatedKits = maturityCounts.graduated || 0;
    const incubatingKits = maturityCounts.incubating || 0;
    const sandboxKits = maturityCounts.sandbox || 0;
    
    return {
      totalKits,
      totalDataspaces,
      graduatedKits,
      incubatingKits,
      sandboxKits
    };
  }, []);

  const statisticsItems = [
    {
      id: 'total-kits',
      value: statistics.totalKits,
      label: 'KITs in Total',
      description: 'Active KITs available across all categories',
      icon: BuildIcon,
      duration: 800
    },
    {
      id: 'dataspaces',
      value: statistics.totalDataspaces,
      label: 'Dataspaces',
      description: 'Dataspaces contributing to our KITs',
      icon: LanguageIcon,
      duration: 800
    },
    {
      id: 'graduated',
      value: statistics.graduatedKits,
      label: 'Graduated KITs',
      description: 'Adoption-ready and verified KITs',
      icon: SchoolIcon,
      duration: 800
    },
    {
      id: 'incubating',
      value: statistics.incubatingKits,
      label: 'Incubating KITs',
      description: 'KITs in development and testing phase',
      icon: RocketIcon,
      duration: 800
    }
  ];

  return (
    <section className={styles.statisticsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>KIT Ecosystem at a Glance</h2>
          <p className={styles.subtitle}>
            Discover the scale and diversity of our growing KIT ecosystem
          </p>
        </div>
        
        <div className={styles.statisticsGrid}>
          {statisticsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className={styles.statisticCard}>
                <div className={styles.statisticIcon}>
                  <IconComponent />
                </div>
                <div className={styles.statisticContent}>
                  <div className={styles.statisticValue}>
                    <CountUpNumber 
                      endValue={item.value} 
                      duration={item.duration}
                    />
                  </div>
                  <h3 className={styles.statisticLabel}>
                    {item.label}
                  </h3>
                  <p className={styles.statisticDescription}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={styles.additionalInfo}>
          <p className={styles.infoText}>
            Our Eclipse Tractus-X KITs are continuously evolving, with new additions and updates 
            happening regularly to support the growing dataspace ecosystem.
          </p>
        </div>
        
        <div className={styles.buttonsContainer}>
          <Button
            variant="contained"
            startIcon={<ContributeIcon />}
            className={styles.primaryButton}
            href="/documentation/kit-getting-started"
            size="large"
          >
            Contribute
          </Button>
          <Button
            variant="outlined"
            startIcon={<StatisticsIcon />}
            className={styles.secondaryButton}
            href="#" // TODO: Add link to detailed statistics page
            size="large"
          >
            View More Statistics
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KitStatistics;