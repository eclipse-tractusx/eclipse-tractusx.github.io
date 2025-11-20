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
import Groups from '@mui/icons-material/Groups';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import styles from './styles.module.scss';

export default function GetStartedSection() {
  return (
    <div className={styles.getStartedSection}>
      <div className={styles.container}>
        <div className={styles.getStartedContent}>
          <h2 className={styles.getStartedTitle}>Ready to Get Started?</h2>
          <p className={styles.getStartedDescription}>
            The best way to get started is to join our community and introduce yourself. 
            We're here to help you find the right way to contribute.
          </p>
          <div className={styles.getStartedButtons}>
            <Link 
              to="/community/open-meetings#general-office-hours" 
              className={styles.primaryButton}
            >
              <Groups className={styles.buttonIcon} />
              Join Community Office Hours
            </Link>
            <Link 
              to="/docs/getting-started" 
              className={styles.secondaryButton}
            >
              <RocketLaunch className={styles.buttonIcon} />
              Become a contributor!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
