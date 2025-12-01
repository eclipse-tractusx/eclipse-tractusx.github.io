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
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SavingsIcon from '@mui/icons-material/Savings';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ExtensionIcon from '@mui/icons-material/Extension';
import styles from './styles.module.scss';

export default function KitBenefits() {
  const benefits = [
    {
      icon: GroupsIcon,
      title: 'Collaboration',
      description: 'Fostering partnerships across different industries & stakeholders for building dataspaces!',
      color: '#00B8D9'
    },
    {
      icon: LightbulbIcon,
      title: 'Innovation',
      description: 'Enables pioneering and testing new concepts without breaking something.',
      color: '#FFA726'
    },
    {
      icon: VisibilityIcon,
      title: 'Transparency',
      description: 'Open Source Licensed documentation and governance under the Eclipse Foundation.',
      color: '#66BB6A'
    },
    {
      icon: SavingsIcon,
      title: 'Cost Reduction',
      description: 'Accelerating developments, research and enabeling use case scaling through a shared services architecture.',
      color: '#AB47BC'
    },
    {
      icon: IntegrationInstructionsIcon,
      title: 'Seamless Integration',
      description: 'Enabling smooth interoperability within different solutions.',
      color: '#42A5F5'
    },
    {
      icon: ExtensionIcon,
      title: 'Modularity',
      description: 'Supporting flexible and extensible solutions across industries and dataspaces.',
      color: '#EF5350'
    }
  ];

  return (
    <div className={styles.benefitsContainer}>
      <Grid container spacing={3}>
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div className={styles.benefitCard}>
                <div 
                  className={styles.iconWrapper}
                  style={{ '--benefit-color': benefit.color }}
                >
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.title}>{benefit.title}</h3>
                <p className={styles.description}>{benefit.description}</p>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
