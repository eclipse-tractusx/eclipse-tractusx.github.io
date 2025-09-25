---
slug: community-office-hour-2025-08-08
title: Community Office Hour 2025-08-08
authors:
    - matbmoser
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Update Infrastructure/Test Management

- **Bitnami Image Dependency**  
  - Bitnami container images (e.g., Keycloak, Postgres) are moving behind a paywall; legacy images will be deprecated and not maintained.  
  - Security risks for future releases if legacy images are used.  
  - Eclipse Foundation and other users are also affected; no immediate action required, but migration planning is needed.  

- **Repository Naming & Creation Guidelines**  
  - No strict naming convention; guidelines to be documented on the website.  
  - Requirement: At least one ticket in SIG release, compliance with TRGs, and proper documentation (README, license).  
  - **Action:** Present new repository requests in office hour; contributors to be added and approved.

### Update Release Management

- **Release & Test Phase Updates**  
  - EDC 0.11 release candidate delayed by one week due to upstream issues.  
  - Products using EDC will start testing one week later; other products should stick to the initial plan.  
  - Tight timeline for release; last week reserved for bug fixes.  

- **Feature Planning for Release 25.12**  
  - Open planning session scheduled for August 14th.  
  - Teams must refine features and inform needed teams/contributors before the session.  

### Update Security

- **Security Responsibilities**  
  - Teams are responsible for addressing security vulnerabilities in their releases.  
  - Eclipse Foundation will support major issues but responsibility remains with the product teams (related committer).  

### Update FOSS Governance

- **API Versioning Discussion**  
  - Debate on enforcing API versioning (e.g., v2, v3 in URLs).  
  - Previous decision: Recommend but not mandate versioning; no TRG (Technical Release Guideline) enforced.  
  - Open for further discussion in the committer round.  

- **Project Description & Initiative Listing**  
  - Updated project descriptions to include Manufacturing-X and clarify scope.  
  - Initiatives must contribute back to Tractus-X to be listed.  

### Update Community/Open Planning

- **Community Day Announcement**  
  - Community Day planned for December; registration opens in September.  
  - Manufacturing-X initiatives invited to host workshops and demos.  

- **Tutorials & Identity Hub**  
  - New tutorial released for Identity Hub deployment and development.  
  - Intended for demonstration and proof-of-concept, not production use.  

### Feedback / Question / Request

- **New Initiatives & Collaboration**  
  - Wind-X collaboration: Plan to create a Python SDK for asset administration shell, combining existing SDKs for broader API support.  
  - Open invitation for contributors from other initiatives (e.g., FactoryX, Semi, Energy Data X).  
