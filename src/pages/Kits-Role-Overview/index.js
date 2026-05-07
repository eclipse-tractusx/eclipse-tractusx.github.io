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

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { kitRoles, getKitsByRole } from '@site/data/kitsData';
import ExpandedKitsGrid from '@site/src/components/2.0/ExpandedKitsGrid';
import styles from './styles.module.scss';

export default function KitsRoleOverviewPage() {
  const { siteConfig } = useDocusaurusContext();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId === selectedRole ? null : roleId);
  };

  const activeRole = kitRoles.find(r => r.id === selectedRole);
  const filteredKits = selectedRole ? getKitsByRole(selectedRole) : [];

  return (
    <Layout
      title={`KITs by Role | ${siteConfig.title}`}
      description="Find the Eclipse Tractus-X KITs that are relevant for your role — SME, Service Provider, App Provider, Developer, Researcher, or Operator."
    >
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <Link to="/Kits" className={styles.backLink}>
            ← Back to All KITs
          </Link>
          <h1 className={styles.pageTitle}>KITs by Role</h1>
          <p className={styles.pageSubtitle}>
            Find the KITs that matter to you. Select your role to see a curated view of the
            Eclipse Tractus-X KITs relevant to your work in the data space.
          </p>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Role Selection */}
        <section className={styles.rolesSection}>
          <h2 className={styles.sectionTitle}>Select Your Role</h2>
          <p className={styles.sectionDescription}>
            Who are you in the Catena-X / Tractus-X ecosystem? Choose your role below to discover
            the KITs that are most relevant for you.
          </p>
          <div className={styles.rolesGrid}>
            {kitRoles.map((role) => {
              const RoleIcon = role.icon;
              const isActive = selectedRole === role.id;
              const kitCount = getKitsByRole(role.id).length;
              return (
                <button
                  key={role.id}
                  className={`${styles.roleCard} ${isActive ? styles.roleCardActive : ''}`}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{ '--role-gradient': role.gradient, '--role-color': role.color }}
                >
                  <div className={styles.roleIconWrapper}>
                    <RoleIcon className={styles.roleIcon} />
                  </div>
                  <div className={styles.roleInfo}>
                    <h3 className={styles.roleName}>{role.name}</h3>
                    <p className={styles.roleLabel}>{role.label}</p>
                    <p className={styles.roleDescription}>{role.description}</p>
                    <span className={styles.kitCount}>{kitCount} KIT{kitCount !== 1 ? 's' : ''}</span>
                  </div>
                  {isActive && <div className={styles.activeIndicator} />}
                </button>
              );
            })}
          </div>
        </section>

        {/* KITs for Selected Role */}
        {selectedRole && activeRole && (
          <section className={styles.kitsSection}>
            <div
              className={styles.kitsSectionHeader}
              style={{ '--role-gradient': activeRole.gradient }}
            >
              <div className={styles.kitsSectionHeaderInner}>
                <div className={styles.roleHeaderIcon}>
                  {React.createElement(activeRole.icon, { className: styles.roleHeaderIconSvg })}
                </div>
                <div>
                  <h2 className={styles.kitsSectionTitle}>
                    KITs for {activeRole.name}
                    <span className={styles.kitsSectionBadge}>{filteredKits.length}</span>
                  </h2>
                  <p className={styles.kitsSectionSubtitle}>{activeRole.label}</p>
                </div>
              </div>
            </div>
            <div className={styles.kitsGrid}>
              <ExpandedKitsGrid
                kits={filteredKits}
                noResultsMessage={`No KITs found for the ${activeRole.name} role yet.`}
              />
            </div>
          </section>
        )}

        {/* Prompt when no role selected */}
        {!selectedRole && (
          <section className={styles.promptSection}>
            <div className={styles.promptCard}>
              <span className={styles.promptEmoji}>👆</span>
              <h3 className={styles.promptTitle}>Select a role above</h3>
              <p className={styles.promptText}>
                Pick your role to see the KITs tailored for you. Each KIT comes with adoption guidance,
                technical specifications, and reference implementations to help you get started quickly.
              </p>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
