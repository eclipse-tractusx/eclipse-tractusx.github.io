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
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import Chat from '@mui/icons-material/Chat';
import Groups from '@mui/icons-material/Groups';
import Add from '@mui/icons-material/Add';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import Code from '@mui/icons-material/Code';
import Description from '@mui/icons-material/Description';
import BugReport from '@mui/icons-material/BugReport';
import Lightbulb from '@mui/icons-material/Lightbulb';
import QuestionIcon from '@mui/icons-material/QuestionMark';
import EventIcon from '@mui/icons-material/Event';
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

  const contributionOptions = [
    {
      title: "Create a KIT",
      description: "Build and contribute your own KIT to help the community with comprehensive documentation and reference implementations.",
      icon: Add,
      link: "/documentation/kit-getting-started",
      primary: true
    },
    {
      title: "Ask questions about KITs",
      description: "Get help and support from the community by asking questions about KITs on our Matrix channel.",
      icon: QuestionIcon,
      link: "https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org",
      primary: false
    },
    {
      title: "Join Community Discussions",
      description: "Participate in our community office hours and help shape the future of dataspace technology.",
      icon: Groups,
      link: "/community/open-meetings#general-office-hours",
      primary: false
    },
    {
      title: "Chat with Developers",
      description: "Chat with us at our main Eclipse Tractus-X Matrix channel (a open source chat service), and become one of us!",
      icon: Chat,
      link: "https://chat.eclipse.org/#/room/#tractusx:matrix.eclipse.org",
      primary: false
    },
    {
      title: "Get Started",
      description: "New to Eclipse Tractus-X? Follow our getting started guide to learn how to contribute.",
      icon: RocketLaunch,
      link: "https://eclipse-tractusx.github.io/docs/getting-started/",
      primary: false
    },
    {
      title: "Contribute Code",
      description: "Help improve existing free and open source software (FOSS) by contributing code, fixes, and enhancements to our repositories.",
      icon: Code,
      link: "https://github.com/eclipse-tractusx",
      primary: false
    },
    {
      title: "Learn and Improve Documentation",
      description: "Help make the content of the KITs better by fixing errors, adding examples and diagrams, or improving clarity.",
      icon: Description,
      link: "/documentation/kit-framework",
      primary: false
    },
    {
      title: "Report Issues",
      description: "Found a bug or issue? Report it to help us improve the quality of our KITs.",
      icon: BugReport,
      link: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues",
      primary: false
    },
    {
      title: "Share Ideas",
      description: "Have an idea for a new KIT or improvement? Share it with the community and start a discussion.",
      icon: Lightbulb,
      link: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/discussions/categories/kits",
      primary: false
    },
    {
      title: "Join our Community Days",
      description: "Participate in our community days to learn, collaborate and share ideas with others.",
      icon: EventIcon,
      link: "/blog/community-days-12-2025",
      primary: false
    }
  ];

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

        <div className={styles.contributionSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Ways to Contribute</h2>
              <p className={styles.sectionDescription}>
                There are many ways to get involved and make a difference in the Eclipse Tractus-X ecosystem.
              </p>
            </div>

            <div className={styles.contributionGrid}>
              {contributionOptions.map((option, index) => {
                const IconComponent = option.icon;
                const isExternal = option.link.startsWith('http');
                const CardComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal 
                  ? { href: option.link, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: option.link };
                const isLastItem = index === contributionOptions.length - 1;
                
                return (
                  <CardComponent
                    key={index}
                    {...linkProps}
                    className={`${styles.contributionCard} ${option.primary ? styles.primary : ''}`}
                    style={isLastItem ? { gridColumn: '1 / -1' } : {}}
                  >
                    <div className={styles.cardIcon}>
                      <IconComponent />
                    </div>
                    <h3 className={styles.cardTitle}>
                      {option.title}
                    </h3>
                    <p className={styles.cardDescription}>
                      {option.description}
                    </p>
                  </CardComponent>
                );
              })}
            </div>
          </div>
        </div>

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
                  to="/documentation/kit-getting-started" 
                  className={styles.secondaryButton}
                >
                  <RocketLaunch className={styles.buttonIcon} />
                  Start Creating a KIT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}