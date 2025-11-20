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
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';

export default function KitArchitectureDiagram() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.architectureDiagram}>
      <div className={styles.layer}>
        <div className={styles.useCasesContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={styles.useCasesTitle}>USE CASES</div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div 
                className={styles.crossDataspace}
                onClick={() => scrollToSection('cross-industry-use-cases')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && scrollToSection('cross-industry-use-cases')}
              >
                <span>CROSS-INDUSTRY USE CASES</span>
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
            <div className={styles.industrySpecificContainer}>
              <div className={styles.sectionTitle}>INDUSTRY-SPECIFIC USE CASES</div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    CONSTRUCTION
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    CHEMISTRY
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    SEMICONDUCTOR
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    SHOP FLOOR
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    AUTOMOTIVE
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div 
                    className={styles.industryBox}
                    onClick={() => scrollToSection('industry-specific-use-cases')}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-specific-use-cases')}
                  >
                    ...
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          </Grid>
        </div>
        <div className={styles.arrow}>
          <span>USE</span>
          <div className={styles.arrowLine}></div>
        </div>
      </div>

      <div className={styles.foundationLayer}>
        <div 
          className={styles.foundationBox}
          onClick={() => scrollToSection('industry-core-foundation')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && scrollToSection('industry-core-foundation')}
        >
          <span>INDUSTRY CORE FOUNDATION</span>
        </div>
        <div className={styles.arrow}>
          <span>USE</span>
          <div className={styles.arrowLine}></div>
        </div>
      </div>

      <div className={styles.foundationLayer}>
        <div 
          className={styles.foundationBox}
          onClick={() => scrollToSection('dataspace-foundation')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && scrollToSection('dataspace-foundation')}
        >
          <span>DATASPACE FOUNDATION</span>
        </div>
      </div>
    </div>
  );
}
