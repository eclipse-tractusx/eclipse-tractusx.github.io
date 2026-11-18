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
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AiPageHeader from '@site/src/components/2.0/AiPageHeader';
import styles from '../styles.module.scss';
import projectStyles from './styles.module.scss';

export default function RelatedProjects() {
  useBrokenLinks().collectAnchor('add-your-project');

  return (
    <Layout
      title="Related Projects | AI"
      description="Discover AI initiatives in Eclipse Tractus-X and contribute your project to the community showcase."
    >
      <main className={styles.page}>
        <AiPageHeader
          backToOverview
          eyebrow="AI · Related Projects"
          title={<>Building AI, <span className={styles.accent}>together.</span></>}
          subtitle="A home for projects exploring AI in Eclipse Tractus-X. Connect with the community and help shape what comes next."
          action={{ to: '#add-your-project', label: 'Add your project' }}
        />

        <section className={styles.section} aria-labelledby="projects-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Community showcase</span>
              <h2 id="projects-heading" className={styles.sectionTitle}>Space for what&apos;s next</h2>
              <p className={styles.sectionLead}>
                Project details are not published yet. These three placeholders reserve space for future
                community contributions, not announced projects or release commitments.
              </p>
            </div>
            <div className={projectStyles.grid}>
              {[1, 2, 3].map((slot) => (
                <article key={slot} className={clsx(styles.panel, projectStyles.placeholder)}>
                  <div className={projectStyles.cardHeader}>
                    <span className={styles.iconTile} aria-hidden="true"><LockOutlinedIcon /></span>
                    <span className={projectStyles.badge}>Not yet revealed</span>
                  </div>
                  <div className={projectStyles.redacted} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3 className={styles.principleTitle}>Project to be revealed · 0{slot}</h3>
                  <p className={styles.principleText}>
                    A place for an Eclipse Tractus-X AI initiative. Details will appear here when contributed.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="add-your-project" className={styles.section} aria-labelledby="contribute-heading">
          <div className={styles.container}>
            <div className={styles.cta}>
              <span className={styles.iconTile} aria-hidden="true"><GroupsOutlinedIcon /></span>
              <div>
                <h2 id="contribute-heading" className={styles.ctaTitle}>Want to add your project here?</h2>
                <p className={styles.ctaText}>
                  Working on AI in Eclipse Tractus-X? Get in touch through our mailing list or join an
                  office hour, then open a pull request to this website. Include your project&apos;s name,
                  a short description of its AI work, its repository and how the community can get involved.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.buttonSecondary} to="https://accounts.eclipse.org/mailing-list/tractusx-dev">
                    Contact the mailing list
                  </Link>
                  <Link className={styles.buttonSecondary} to="/community/open-meetings">
                    Join an office hour
                  </Link>
                  <Link
                    className={styles.buttonPrimary}
                    to="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/compare"
                  >
                    Create a pull request
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
