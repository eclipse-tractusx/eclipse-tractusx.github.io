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
import KitsCoreSvg from '@site/static/img/kits-2.0/tx-assembly-kit.svg'
import ThemedImage from '@theme/ThemedImage';
import { Chat as ChatIcon, Groups as GroupsIcon, Add as AddIcon, RocketLaunch as RocketIcon } from '@mui/icons-material';
import styles from "./styles.module.scss";

export default function KitsFooter({ disclaimer }) {
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
              Want to join?
            </h2>
            <p className={styles.description}>
              Join the Eclipse Tractus-X community and help shape the next generation of global dataspace technology. 
              Our KITs and Reference Implementations (FOSS) provide the foundation you need to create decentralized, interoperable, sovereign and secure dataspace solutions.
            </p>
            
            <div className={styles.links}>
              <a href="/community/open-meetings#general-office-hours" className={styles.link}>
                <GroupsIcon className={styles.linkIcon} />
                Join our Community Office Hours
              </a>
              <a href="https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org" className={styles.link}>
                <ChatIcon className={styles.linkIcon} />
                KIT Matrix Chat
              </a>
              <a href="https://eclipse-tractusx.github.io/docs/getting-started/" className={styles.link}>
                <RocketIcon className={styles.linkIcon} />
                Get Started
              </a>
              <a href="/documentation/kit-getting-started" className={styles.link}>
                <AddIcon className={styles.linkIcon} />
                Contribute your KIT
              </a>
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
          <p className={styles.copyright}>
            Our KITs are licensed under the non-code <a href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/LICENSE_non-code">CC-BY-4.0</a> License.
          </p>
        </div>
      </div>
    </footer>
  );
}