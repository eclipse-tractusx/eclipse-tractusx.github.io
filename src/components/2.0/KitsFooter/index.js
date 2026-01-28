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

import React from "react";
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import KitsCoreSvg from '@site/static/img/kits-2.0/tx-assembly-kit.svg'
import ThemedImage from '@theme/ThemedImage';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Code from '@mui/icons-material/Code';
import styles from "./styles.module.scss";

export default function KitsFooter({ disclaimer, simple = false, title = 'Want to join?' }) {
  const { colorMode } = useColorMode();

  return (
    <footer className={styles.kitsFooter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <div className={styles.mainLogo}>
              <ThemedImage
                alt="Tractus-X Logo"
                sources={{
                  light: require('@site/static/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Dark.png').default,
                  dark: require('@site/static/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Light.png').default,
                }}
                className={styles.tractusLogo}
              />
            </div>
          </div>
          
          <div className={styles.textSection}>
            <h2 className={styles.title}>
              {title}
            </h2>
            <p className={styles.description}>
              Join the Eclipse Tractus-X community and help shape the next generation of global dataspace technology. 
              Our KITs and Reference Implementations (FOSS) provide the foundation you need to create decentralized, interoperable, sovereign and secure dataspace solutions.
            </p>
            
            <div className={styles.links}>
              <a href="https://eclipse-tractusx.github.io/community/open-meetings#Eclipse%20Tractus-X%20KITs%20Community%20Office%20Hour" className={styles.link}>
                <EventIcon className={styles.linkIcon} />
                Join our KIT Office Hours
              </a>
              <a href="https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org" className={styles.link} target="_blank" rel="noopener noreferrer">
                <ChatIcon className={styles.linkIcon} />
                KIT Matrix Chat
              </a>
              {!simple && (
                <>
                  <Link to="/documentation/kit-framework" className={styles.link}>
                    <SchoolIcon className={styles.linkIcon} />
                    Learn the KIT Framework
                  </Link>
                  <Link to="/community/open-meetings" className={styles.link}>
                    <GroupsIcon className={styles.linkIcon} />
                    Join Community Office Hours
                  </Link>
                  <a href="https://github.com/eclipse-tractusx" className={styles.link} target="_blank" rel="noopener noreferrer">
                    <Code className={styles.linkIcon} />
                    Our Code 
                  </a>
                  <Link to="/documentation/kit-getting-started" className={styles.link}>
                    <AddIcon className={styles.linkIcon} />
                    Create a KIT
                  </Link>
                  <Link to="/Contribute" className={styles.link}>
                    <RocketLaunchIcon className={styles.linkIcon} />
                    Contribute
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          {disclaimer && (
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--ifm-color-emphasis-600)',
              fontStyle: 'italic',
              textAlign: 'center',
              margin: '0 0 0.5rem 0',
              opacity: 0.8
            }}>
              {disclaimer}
            </p>
          )}
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--ifm-color-emphasis-700)',
            textAlign: 'center',
            margin: '0 0 0.5rem 0',
            opacity: 0.9
          }}>
            All data shown is available at the <Link to="/documentation/kit-master-data-overview">master data documentation</Link>. All the KIT logos and logo licenses can be found to download at our <Link to="/documentation/kit-3d-logo-library">KIT Logo Gallery</Link>.
          </p>
          <p className={styles.copyright}>
            Our KITs are licensed under the non-code <a href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/LICENSE_non-code" target="_blank" rel="noopener noreferrer">CC-BY-4.0</a> License.
          </p>
        </div>
      </div>
    </footer>
  );
}