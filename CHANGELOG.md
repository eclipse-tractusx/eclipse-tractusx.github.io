# Changelog

All notable changes to the Eclipse Tractus-X KIT Documentation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
    - `./trg-9-02-kit-maturity-levels` → `./kit-maturity-levels`
    - `./trg-9-03-kit-framework` → `./kit-framework`
    - `./documentation-guidelines` → `/docs/website-guidelines/kit-structure`
  - Fixed `/documentation/kit-master-data-overview`:
    - `./trg-9-02-kit-maturity-levels` → `./kit-maturity-levels`
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