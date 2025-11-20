# Changelog

All notable changes to the Eclipse Tractus-X Webpage will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-11-20

### Added

#### New Components

- **DataspaceComponent** (`/src/components/DataspaceComponent/`)
  - Created new dataspace showcase carousel component
  - Displays all dataspaces from industries with kit counts
  - Features sophisticated 4-layer hover effect with color cascade animation
  - Dual routing: card click navigates to dataspace KITs page, button opens external website
  - Responsive design with carousel on desktop and stacked cards on mobile/tablet
  - Grid-based layout using MUI Grid for better responsiveness
  - Custom navigation arrows with glow effects
  - Integrated into Kits page as new section

#### Component Features

- **DataspaceComponent Styling** (`styles.module.scss`)
  - Square cards (250x250px) with dark background (#1e1e1e)
  - 4-layer color system using dataspace-specific colors from kitsData
  - Cascade animation on hover (layers translate top-right with staggered delays)
  - Fast open (0.25s) and slow close (0.5s) animation timing
  - Responsive breakpoints at 1200px, 900px, 768px, and 600px
  - Centered text and cards on screens below 1200px
  - Mobile-optimized with proper margins and padding

## [Unreleased] - 2025-11-11

### Added

#### Documentation Enhancements

- **KIT Lifecycle Documentation** (`documentation/kit-lifecycle.mdx`)
  - Added `DeprecatedKitsList` component to display deprecated KITs
  - Simplified deprecation process section with clearer 3-step workflow
  - Added Mermaid diagram visualizing deprecation lifecycle flow
  - Enhanced deprecation notice template with cleaner format
  - Streamlined appeal process documentation

- **KIT Framework Documentation** (`documentation/kit-framework.mdx`)
  - Added comprehensive Documentation section explaining extra resources and links
  - Defined documentation purpose for all stakeholders
  - Listed deliverables including external links, community resources, and training materials

- **Navbar Improvements** (`docusaurus.config.js`)
  - Added sub-navigation under "KITs General" dropdown with all documentation pages:
    - Getting Started
    - KIT Lifecycle
    - KIT Framework
    - KIT Statistics
    - Master Data Overview
  - Added visual separators between documentation and KIT list sections
  - Improved navigation hierarchy with arrow indicators (→) for sub-items

#### Component Improvements

- **DeprecatedKitsList Component** (`/src/components/2.0/KitAnalytics/DeprecatedKitsList.js`)
  - Displays all deprecated KITs with warning indicators
  - Shows deprecation dates from maturity metadata
  - Includes deprecation reasons when available
  - Strikethrough styling on KIT names for visual indication
  - Hover effects with proper event handling using `currentTarget`
  - Scrollable list for multiple deprecated KITs
  - Red danger color theme consistent with deprecation status

- **GraduatedKitsList Component**
  - Fixed hover effect persistence bug by changing from `e.target` to `e.currentTarget`
  - Ensures hover styles apply to correct parent element

- **KIT Statistics Component** (`/src/components/2.0/KitAnalytics/KitStatistics.js`)
  - Integrated DeprecatedKitsList at the end of statistics page
  - Provides complete overview of KIT ecosystem including deprecated items

### Fixed

- Hover effects no longer persist after mouse leave in GraduatedKitsList and DeprecatedKitsList components

## [Unreleased] - 2025-11-07

### Added

#### KIT Analytics & Statistics System
- **Complete KIT Analytics Dashboard** (`/src/components/2.0/KitAnalytics/`)
  - Modular analytics component library with 11+ specialized components
  - `StatCard`: Animated statistics cards with count-up animations
  - `PieChart`: Interactive pie charts for maturity level distribution
  - `DataspaceDistribution`: Horizontal bar chart for dataspace analysis
  - `MaturityTimeline`: Timeline visualization with color legend for KIT progression
  - `QuarterlyTrends`: Quarterly statistics showing year-by-year KIT growth
  - `IncubatingKitsReview`: Review and progress statistics for in-development KITs
  - `UpdateActivityChart`: Activity tracking for KIT updates
  - `GraduatedKitsList`: Comprehensive list of graduated KITs with graduation dates
  - `KitStatistics`: Main statistics overview component with navigation buttons
  - Full responsive design with mobile optimization
  - Dark mode compatibility across all components

#### Navigation Enhancements
- **Documentation Sidebar**
  - Added "← Back to KIT Overview" link at the top of documentation section
  - Improved navigation between KIT overview and documentation pages

- **KIT Getting Started Guide** (`documentation/kit-getting-started.mdx`)
  - Professional business card contact section with glass-morphism effects
  - Three contact buttons: Email, GitHub, and Matrix chat
  - Navigation buttons for KIT artifacts and master data
  - Interactive process reference components
  - Tractus-X gradient background styling

- **KIT Footer Component** (`/src/components/2.0/KitsFooter/`)
  - Six distinct navigation links with semantic Material-UI icons:
    - Community Office Hours (Groups icon)
    - KIT Matrix Chat (Chat icon)
    - Learn KIT Artifacts (School icon)
    - KIT Maturity Levels (TrendingUp icon)
    - Create a KIT (Add icon)
    - Contribute (Handshake icon)
  - Attribution note linking to master data documentation

- **KIT Architecture Component** (`/src/components/2.0/KitsArchitecture/`)
  - Added functional "Explore the Architecture" button
  - Proper centering with flex container solution
  - Link to KIT artifacts documentation

- **KIT Statistics Component** (`/src/components/2.0/KitStatistics/`)
  - Added "KIT Maturity Levels" navigation button
  - Three action buttons: Contribute, View More Statistics, KIT Maturity Levels

#### Master Data & Graduation Tracking
- **Graduation Date Integration**
  - Added graduation date metadata to KIT cards
  - Display graduation dates in `GraduatedKitsList` component
  - Enhanced `KitCard` and `ExpandedKitCard` with graduation date display
  - Graduation date shown on kit-master-data-overview page

#### Component Architecture
- **Modular Component System**
  - Exported all analytics components to `/src/components/2.0/KitAnalytics/`
  - Shared component architecture for reusability
  - Individual component styling with CSS modules
  - Proper Material-UI icon imports (individual imports vs. destructured)

#### Documentation Improvements
- **KIT Statistics Page** (`documentation/kit-statistics.mdx`)
  - Converted to MDX format with interactive components
  - Single-import simplified structure
  - Apache License 2.0 compliance
  - Data source attribution notes

### Changed

#### UI/UX Improvements
- **Responsive Design**
  - Mobile-first responsive patterns across all components
  - Flexible grid layouts adapting to screen sizes
  - Optimized touch targets for mobile devices
  - Responsive typography and spacing

- **Visual Styling**
  - Dark mode compatibility for all new components
  - Gradient backgrounds with Tractus-X branding
  - Glass-morphism effects for modern UI appeal
  - Button styling with hover effects and transitions
  - Professional business card design with squared profile images
  - Modern border styling for profile images

- **Icon System**
  - Migrated to individual Material-UI icon imports
  - Semantic icon selection for better user experience
  - Consistent icon sizing and styling
  - Z-index optimization for proper layering

#### Component Refactoring
- **KitsFooter Component**
  - Individual icon imports: `ChatIcon`, `GroupsIcon`, `AddIcon`, `RocketLaunchIcon`, `SchoolIcon`, `HandshakeIcon`, `TrendingUpIcon`
  - Replaced duplicate icons with unique semantic alternatives
  - Enhanced link organization and grouping

- **KitStatistics Component**
  - Individual icon imports: `BuildIcon`, `LanguageIcon`, `SchoolIcon`, `RocketIcon`, `AddIcon`, `AnalyticsIcon`, `TrendingUpIcon`
  - Updated icon references for consistency

- **Button Components**
  - Full-width to content-based width transitions
  - External link symbols for external navigation
  - Gradient backgrounds with visual appeal
  - Hover effect refinements (background visibility adjustments)

### Fixed

#### Build & Deployment
- **Rspack Build Issues**
  - Resolved module graph panic error
  - Cleaned build cache (`.docusaurus`, `build`, `node_modules/.cache`)
  - Successful compilation with Rspack 1.5.8

- **Broken Links**
  - Fixed `/documentation/kit-getting-started`:
    - `docs/getting-started` → `/docs/getting-started`
    - `./trg-9-02-kit-lifecycle` → `./kit-lifecycle`
    - `./trg-9-03-kit-framework` → `./kit-framework`
    - `./documentation-guidelines` → `/docs/website-guidelines/kit-structure`
  - Fixed `/documentation/kit-master-data-overview`:
    - `./trg-9-02-kit-lifecycle` → `./kit-lifecycle`
    - `./trg-9-03-kit-framework` → `./kit-framework`

#### Layout & Styling
- **Centering & Alignment**
  - Fixed button centering issues with flex container solutions
  - Resolved width constraints vs. centering conflicts
  - Proper inline-flex implementation for content-based widths

- **Z-Index Management**
  - Optimized icon z-index values for proper layering
  - Fixed overlapping issues in component hierarchy

- **Background & Visibility**
  - Removed transparent overlays obscuring backgrounds
  - Enhanced padding for better content visibility
  - Background visibility improvements for business cards

### Technical Debt
- **Code Quality**
  - Consistent import patterns across components
  - Proper CSS module organization
  - Component documentation and comments
  - Apache License 2.0 headers on all new files

### Documentation
- **File Conversions**
  - `kit-getting-started.md` → `kit-getting-started.mdx`
  - Enhanced with React components and interactive elements

- **Master Data Documentation**
  - Comprehensive data source attribution
  - Links to master data overview from footer and statistics