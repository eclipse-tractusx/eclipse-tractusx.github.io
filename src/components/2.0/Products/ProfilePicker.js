/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
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
import clsx from 'clsx';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import BiotechIcon from '@mui/icons-material/BiotechOutlined';
import LaptopIcon from '@mui/icons-material/LaptopMacOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenterOutlined';
import FactoryIcon from '@mui/icons-material/FactoryOutlined';
import AppsIcon from '@mui/icons-material/AppsRounded';
import { adopterProfiles } from '@site/data/productsData';
import styles from './styles.module.scss';

const PROFILE_ICONS = {
  students: SchoolIcon,
  research: BiotechIcon,
  users: LaptopIcon,
  providers: BusinessCenterIcon,
  initiatives: FactoryIcon,
};

export function getProfile(id) {
  return adopterProfiles.find((profile) => profile.id === id) || null;
}

/** "I am …" selector plus the need / what we give / proof of the selected profile. */
export default function ProfilePicker({ value, onChange }) {
  const profile = getProfile(value);

  return (
    <div className={styles.profiles}>
      <div className={styles.profileBar} role="tablist" aria-label="Show the products for">
        <span className={styles.profileLabel}>I am</span>
        <button
          type="button"
          role="tab"
          aria-selected={!profile}
          className={clsx(styles.profileOption, !profile && styles.profileActive)}
          onClick={() => onChange(null)}
        >
          <AppsIcon className={styles.profileIcon} />
          Show everything
        </button>
        {adopterProfiles.map((entry) => {
          const Icon = PROFILE_ICONS[entry.id] || AppsIcon;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={value === entry.id}
              className={clsx(styles.profileOption, value === entry.id && styles.profileActive)}
              onClick={() => onChange(entry.id)}
            >
              <Icon className={styles.profileIcon} />
              {entry.name}
            </button>
          );
        })}
      </div>

      {profile && (
        <dl className={styles.profileCard} aria-live="polite">
          <div>
            <dt>Need</dt>
            <dd>{profile.need}</dd>
          </div>
          <div>
            <dt>What we give</dt>
            <dd className={styles.profileGive}>{profile.give}</dd>
          </div>
          {profile.proof && (
            <div>
              <dt>Proof today</dt>
              <dd>{profile.proof}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
