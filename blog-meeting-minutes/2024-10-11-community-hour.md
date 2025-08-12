---
slug: community-office-hour-2024-10-11
title: Community Office Hour 2024-10-11
authors:
    - theresa_hilger
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Infrastructure

- [eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io) requires just One Committer Review now
  - Committers that approve: Please double-check the content, remember you have also responsibility when approving non TRG compliant content
  - Expectation for KITs: It should be less stressful to find a committer
- Setup Catena-X STABLE Environment
  - Organizational issue that’s why the stable is not there right now but they are working on it
  - Questions: Will the STABLE environment stick to the released version or will it evolve with the development of the components?
- Planned general infrastructure maintenance INT environment 2024-09-29
  - 24.12 e2e test phase on INT environment still planned to start 25.10. as communicated in adapted timeline

### Release Management

- EDC 0.8.0 to be used during e2e testing.
  - The upcoming Eclipse Tractus-X 24.12 release will include EDC version 0.8.0.
  - If your component relies on the Eclipse DataspaceConnector (EDC), we highly encourage you to align your development and testing efforts with this version to ensure compatibility.
- Reminder for Refinement Day 1: 16.10
  - Each group will focus on the first steps of skeleton-building for their features, based on the feature template, mapping them to the related roadmap items
    - For more information please read the [news blog](https://eclipse-tractusx.github.io/blog/refinement-day-1-R25.03)
- Reminder for Refinement Day 2: 06.11
  - Build on the work from Refinement Day 1 and focus primarily on the identified dependencies
    - For more information, please read the [news blog](https://eclipse-tractusx.github.io/blog/refinement-day-2-R25.03)

### Security

- [Trufflehog Update] Deprecation of GitGuardian and mandatory update to Trufflehog
  - Please update your repositories
  - There are still many issues opened and waiting to be resolved by their responsible committer
    - [Parent Issue](https://github.com/eclipse-tractusx/sig-security/issues/86)
  - The Trufflehog Workflow is a active [TRG](/docs/release/trg-8/trg-8-03) since March 26,2024

### FOSS

- TRG proposal for product deprecation including a process and criteria to close [Issue #1037](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues/1037)
- Please review and  provide some input

### Feedback / Question / Request

- Add Testmanagement timeline into timeline of the overall release
