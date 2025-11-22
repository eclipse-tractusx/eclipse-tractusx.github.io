/*
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
 */

import React from 'react';
import { kitsData, industries } from '../../../../data/kitsData.js';
import InventoryIcon from '@mui/icons-material/Inventory';
import SchoolIcon from '@mui/icons-material/School';
import CachedIcon from '@mui/icons-material/Cached';
import ScienceIcon from '@mui/icons-material/Science';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import SpeedIcon from '@mui/icons-material/Speed';
import EventIcon from '@mui/icons-material/Event';

import StatCard from './StatCard.js';
import ProgressBar from './ProgressBar.js';
import IndustryDistribution from './IndustryDistribution.js';
import MaturityTimeline from './MaturityTimeline.js';
import QuarterlyTrends from './QuarterlyTrends.js';
import IncubatingKitsReview from './IncubatingKitsReview.js';
import UpdateActivityChart from './UpdateActivityChart.js';
import GraduatedKitsList from './GraduatedKitsList.js';
import DeprecatedKitsList from './DeprecatedKitsList.js';
import styles from './KitAnalytics.module.css';

export const KitStatistics = () => {
  // Collect all KITs
  const foundationKits = [...(kitsData.dataspaceFoundation || [])];
  const industryCoreKits = [...(kitsData.industryCoreFoundation || [])];
  const useCaseKits = [...(kitsData.useCases || [])];
  
  const industrySpecificKits = [];
  if (kitsData.industryKits) {
    Object.values(kitsData.industryKits).forEach(kitsArray => {
      if (Array.isArray(kitsArray)) {
        industrySpecificKits.push(...kitsArray);
      }
    });
  }

  const allKits = [...foundationKits, ...industryCoreKits, ...useCaseKits, ...industrySpecificKits];

  // Calculate statistics
  const totalKits = allKits.length;
  const graduatedKits = allKits.filter(kit => kit.maturity?.currentLevel === 'Graduated').length;
  const incubatingKits = allKits.filter(kit => kit.maturity?.currentLevel === 'Incubating').length;
  const sandboxKits = allKits.filter(kit => kit.maturity?.currentLevel === 'Sandbox').length;
  const deprecatedKits = allKits.filter(kit => kit.deprecated).length;
  const newKits = allKits.filter(kit => kit.metadata?.new).length;
  const totalIndustries = industries.length;

  // Review and Progress Statistics
  const kitsInReview = allKits.filter(kit => 
    kit.maturity?.currentLevel === 'Incubating' && 
    kit.maturity?.graduationStatus?.toLowerCase() === 'in review'
  ).length;
  
  const kitsInProgress = allKits.filter(kit => 
    kit.maturity?.currentLevel === 'Incubating' && 
    (kit.maturity?.graduationStatus?.toLowerCase() === 'in progress' || 
     kit.maturity?.graduationStatus?.toLowerCase() === 'inprogress')
  ).length;

  // Recent activity (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentlyUpdated = allKits.filter(kit => 
    kit.metadata?.lastUpdated && new Date(kit.metadata.lastUpdated) >= sixMonthsAgo
  ).length;

  // Average version
  const versionsWithNumbers = allKits
    .filter(kit => kit.metadata?.latestVersion)
    .map(kit => kit.metadata.latestVersion)
    .filter(version => /^\d+\.\d+/.test(version))
    .map(version => parseFloat(version));
  
  const avgVersion = versionsWithNumbers.length > 0 
    ? (versionsWithNumbers.reduce((sum, v) => sum + v, 0) / versionsWithNumbers.length).toFixed(1)
    : 'N/A';

  // Date-based statistics
  const kitsWithDates = allKits.filter(kit => kit.metadata?.created);
  
  // Oldest and newest KITs
  const creationDates = kitsWithDates.map(kit => new Date(kit.metadata.created)).sort((a, b) => a - b);
  const oldestDate = creationDates.length > 0 ? creationDates[0] : null;
  const newestDate = creationDates.length > 0 ? creationDates[creationDates.length - 1] : null;
  
  // Ecosystem age in days
  const ecosystemAge = oldestDate && newestDate 
    ? Math.ceil((newestDate - oldestDate) / (1000 * 60 * 60 * 24)) 
    : 0;
  
  // KITs created in current year
  const currentYear = new Date().getFullYear();
  const kitsThisYear = kitsWithDates.filter(kit => 
    new Date(kit.metadata.created).getFullYear() === currentYear
  ).length;
  
  // Most productive year
  const yearCounts = {};
  kitsWithDates.forEach(kit => {
    const year = new Date(kit.metadata.created).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });
  const mostProductiveYear = Object.entries(yearCounts)
    .sort(([,a], [,b]) => b - a)[0];
  
  // Development velocity (KITs per month average)
  const monthsActive = ecosystemAge > 0 ? Math.ceil(ecosystemAge / 30) : 1;
  const kitsPerMonth = (totalKits / monthsActive).toFixed(1);
  
  return (
    <div>
      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <StatCard 
          title="Total KITs" 
          value={totalKits} 
          subtitle="Across all categories"
          IconComponent={InventoryIcon} 
          color="#3b82f6"
          trend={3}
        />
        <StatCard 
          title="Graduated" 
          value={graduatedKits} 
          subtitle={`${Math.round((graduatedKits/totalKits)*100)}% of total`}
          IconComponent={SchoolIcon} 
          color="#10b981"
          trend={2}
        />
        <StatCard 
          title="In Development" 
          value={incubatingKits + sandboxKits} 
          subtitle="Incubating + Sandbox"
          IconComponent={CachedIcon} 
          color="#f59e0b"
          trend={1}
        />
        <StatCard 
          title="In Review" 
          value={kitsInReview} 
          subtitle="Awaiting graduation review"
          IconComponent={ScienceIcon} 
          color="#3b82f6"
          trend={null}
        />
        <StatCard 
          title="In Progress" 
          value={kitsInProgress} 
          subtitle="Preparing for review"
          IconComponent={AutoAwesomeIcon} 
          color="#f59e0b"
          trend={null}
        />
        <StatCard 
          title="Industries" 
          value={totalIndustries} 
          subtitle="Active ecosystems"
          IconComponent={PublicIcon} 
          color="#ec4899"
          trend={0}
        />
        <StatCard 
          title="Recently Updated" 
          value={recentlyUpdated} 
          subtitle="Last 6 months"
          IconComponent={UpdateIcon} 
          color="#8b5cf6"
          trend={5}
        />
        <StatCard 
          title="Average Version" 
          value={avgVersion} 
          subtitle="Major.Minor releases"
          IconComponent={TrendingUpIcon} 
          color="#06b6d4"
          trend={null}
        />
      </div>

      {/* Date-based Analytics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <StatCard 
          title="Ecosystem Age" 
          value={`${Math.round(ecosystemAge / 365)}+ years`} 
          subtitle={`${ecosystemAge} total days`}
          IconComponent={CalendarTodayIcon} 
          color="#f97316"
        />
        <StatCard 
          title="KITs This Year" 
          value={kitsThisYear} 
          subtitle={`Created in ${currentYear}`}
          IconComponent={EventIcon} 
          color="#06b6d4"
        />
        <StatCard 
          title="Development Velocity" 
          value={kitsPerMonth} 
          subtitle="KITs per month"
          IconComponent={SpeedIcon} 
          color="#8b5cf6"
        />
        <StatCard 
          title="Most Productive Year" 
          value={mostProductiveYear ? mostProductiveYear[0] : 'N/A'} 
          subtitle={mostProductiveYear ? `${mostProductiveYear[1]} KITs created` : ''}
          IconComponent={TrendingUpIcon} 
          color="var(--ifm-color-danger)"
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        marginBottom: '40px' 
      }}>
        <div className={styles.chartsGrid}>
          <IndustryDistribution />
          <MaturityTimeline styles={styles} />
        </div>
        
        {/* Full-width Historical Trends Chart */}
        <div style={{ marginBottom: '24px' }}>
          <QuarterlyTrends styles={styles} />
        </div>
        
        <IncubatingKitsReview styles={styles} />
        
        {/* Graduated KITs with Graduation Dates */}
        <div style={{ marginBottom: '24px' }}>
          <GraduatedKitsList styles={styles} />
        </div>
      </div>
      
      {/* Progress Bars */}
      <div style={{
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '40px'
      }}>
        <h4 style={{ marginBottom: '20px' }}>Maturity Distribution</h4>
        <ProgressBar 
          label="Graduated KITs" 
          value={graduatedKits} 
          total={totalKits} 
          color="#10b981" 
        />
        <ProgressBar 
          label="Incubating KITs" 
          value={incubatingKits} 
          total={totalKits} 
          color="#f59e0b" 
        />
        <ProgressBar 
          label="Sandbox KITs" 
          value={sandboxKits} 
          total={totalKits} 
          color="#6b7280" 
        />
        {deprecatedKits > 0 && (
          <ProgressBar 
            label="Deprecated KITs" 
            value={deprecatedKits} 
            total={totalKits} 
            color="var(--ifm-color-danger)" 
          />
        )}
      </div>

      {/* Category Breakdown */}
      <div style={{
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h4 style={{ marginBottom: '20px' }}>KITs by Category</h4>
        <ProgressBar 
          label="Industry Foundation" 
          value={foundationKits.length} 
          total={totalKits} 
          color="#64748b" 
        />
        <ProgressBar 
          label="Industry Core Foundation" 
          value={industryCoreKits.length} 
          total={totalKits} 
          color="#3b82f6" 
        />
        <ProgressBar 
          label="Cross-Industry Use Cases" 
          value={useCaseKits.length} 
          total={totalKits} 
          color="#059669" 
        />
        <ProgressBar 
          label="Industry Specific" 
          value={industrySpecificKits.length} 
          total={totalKits} 
          color="#7c2d92" 
        />
      </div>
      
      {/* KIT Update Activity Plot */}
      <div style={{ marginTop: '40px' }}>
        <UpdateActivityChart styles={styles} />
      </div>

      {/* Deprecated KITs List */}
      <DeprecatedKitsList styles={styles} />
    </div>
  );
};

export default KitStatistics;