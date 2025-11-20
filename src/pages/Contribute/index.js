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

import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ThemedImage from '@theme/ThemedImage';
import ContributionSection from '@site/src/components/ContributionSection';
import GetStartedSection from '@site/src/components/GetStartedSection';
import styles from './styles.module.scss';

export default function ContributePage() {
  const { siteConfig } = useDocusaurusContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout
      title={`How to Contribute | ${siteConfig.title}`}
      description="Learn how to contribute to Eclipse Tractus-X KITs and help shape the future of dataspace technology."
    >
      <main className={styles.contributePage}>
        <div className={styles.hero}>
          <img
            src={require('@site/static/img/tx-logos/221103_TractusX_Gradient_slim.png').default}
            className={styles.hero_bg}
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(1.3)`
            }}
            alt="Tractus-X Gradient Background"
          />
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.logoSection}>
                <ThemedImage
                  alt="Tractus-X Logo"
                  sources={{
                    light: require('@site/static/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Dark.png').default,
                    dark: require('@site/static/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Light.png').default,
                  }}
                  className={styles.logo}
                />
              </div>
              
              <div className={styles.textSection}>
                <h1 className={styles.title}>
                  Want to contribute?
                </h1>
                <p className={styles.description}>
                  Join the Eclipse Tractus-X community and help shape the next generation of global dataspace technology. 
                  Our KITs and Reference Implementations (FOSS) provide the foundation you need to create decentralized, 
                  interoperable, sovereign and secure dataspace solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContributionSection />
        <GetStartedSection />
      </main>
    </Layout>
  );
}