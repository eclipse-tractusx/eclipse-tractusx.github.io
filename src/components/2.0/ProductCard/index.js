/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
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
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CableIcon from '@mui/icons-material/Cable';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FactoryIcon from '@mui/icons-material/Factory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchemaIcon from '@mui/icons-material/Schema';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ScienceIcon from '@mui/icons-material/Science';
import ConstructionIcon from '@mui/icons-material/Construction';
import BiotechIcon from '@mui/icons-material/Biotech';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from '@mui/icons-material/Build';
import WidgetsIcon from '@mui/icons-material/Widgets';
import FolderIcon from '@mui/icons-material/Folder';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const iconMap = {
  DesktopWindows: DesktopWindowsIcon,
  BarChart: BarChartIcon,
  ManageSearch: ManageSearchIcon,
  Psychology: PsychologyIcon,
  Cable: CableIcon,
  VerifiedUser: VerifiedUserIcon,
  AccountBalanceWallet: AccountBalanceWalletIcon,
  Factory: FactoryIcon,
  Assignment: AssignmentIcon,
  Language: LanguageIcon,
  Business: BusinessIcon,
  TravelExplore: TravelExploreIcon,
  Explore: ExploreIcon,
  Map: MapIcon,
  ViewInAr: ViewInArIcon,
  Settings: SettingsIcon,
  SyncAlt: SyncAltIcon,
  AccountTree: AccountTreeIcon,
  Schema: SchemaIcon,
  CloudQueue: CloudQueueIcon,
  Science: ScienceIcon,
  Construction: ConstructionIcon,
  Biotech: BiotechIcon,
  Engineering: EngineeringIcon,
  Build: BuildIcon,
};

const relevanceLabels = {
  'catena-x-operative': 'Operative',
  'development-testing': 'Dev / Testing',
  'catena-x-demo': 'Demo',
  'dataspace-participants': 'Dataspace',
  'manufacturing-x': 'Manufacturing-X',
};

const relevanceColors = {
  'catena-x-operative': '#f8a4a4',
  'development-testing': '#a4c8f8',
  'catena-x-demo': '#d4a4f8',
  'dataspace-participants': '#a4f8c8',
  'manufacturing-x': '#f8f0a4',
};

export function getProductIcon(iconName, props = {}) {
  const IconComponent = iconMap[iconName] || WidgetsIcon;
  return <IconComponent {...props} />;
}

export default function ProductCard({ product }) {
  const IconComponent = iconMap[product.icon] || WidgetsIcon;

  return (
    <Link to={`/Products/detail?id=${product.id}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <IconComponent className={styles.icon} />
        </div>
        <div className={styles.titleArea}>
          <h3 className={styles.name}>{product.name}</h3>
          {product.subtitle && <span className={styles.subtitle}>{product.subtitle}</span>}
        </div>
        {product.status === 'phase-out' && (
          <span className={styles.statusBadge} data-status="phase-out">
            <WarningAmberIcon className={styles.statusIcon} />
            Phase Out
          </span>
        )}
        {product.status === 'tbd' && (
          <span className={styles.statusBadge} data-status="tbd">
            <HelpOutlineIcon className={styles.statusIcon} />
            TBD
          </span>
        )}
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.cardFooter}>
        <div className={styles.tags}>
          {product.relevance?.map(r => (
            <span
              key={r}
              className={styles.tag}
              style={{ backgroundColor: relevanceColors[r] || '#e0e0e0' }}
            >
              {relevanceLabels[r] || r}
            </span>
          ))}
        </div>
        <div className={styles.meta}>
          {product.repositories?.length > 0 && (
            <span className={styles.repoCount}>
              <FolderIcon className={styles.metaIcon} />
              {product.repositories.length}
            </span>
          )}
          <ArrowForwardIcon className={styles.arrowIcon} />
        </div>
      </div>
    </Link>
  );
}
