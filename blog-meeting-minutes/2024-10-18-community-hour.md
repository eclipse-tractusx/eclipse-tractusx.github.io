---
slug: community-office-hour-2024-10-18
title: Community Office Hour 2024-10-18
authors:
    - lgblaumeiser
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Infrastructure

- Test Environments:
  - Currently a blocking issue is with SAP. They want to do a change in the DIF deployment and we are blocked by that. Target for the change is early next week. This involves both STABLE and INT environment.
  - It is important that we can start with the deployment for the e2e test of 24/12 on INT, there are school holidays in southern Germany between Oct., 28th and Nov., 1st, so deployment is constrained in time.
  - The INT environment has to be wiped to start from scratch with the deployment for 24/12.
  - Doubleslash will provide information on how to proceed next week.

### Release Management

- EDC 0.8.0 to be used during e2e testing. There will be a RC5 early next week, that should be used as a start for e2e testing
- Release check issues are due on Oct. 18th for release 24/12

### FOSS

- Sources of pictures: Do we need to regulate the availability of sources for binary pictures, as there are pictures in the website repo without editable sources.
  - There is already a TRG that specifies the handling of pictures. It should be controlled better by committers.
- Concerning intermediate releases, especially bugfix releases that need to be done in Tractus-X during a operating cycle. There is a task to make a proposal on how to handle the situation from Eclipse Tractus-X perspective.
- Deprecation of Repos. The regulation in TRG 7.09 is currently reworked to be more precise.
- Discussion on a TRG about testing.
  - Doubleslash prepares a TRG concerning automated testing
  - Some repositories use SonarCloud and code coverage measurements there
  - General openness towards a new trial on some specs concering testing

### Community/Open Planning

- Files like presentations done during Open Planning are currently not provided in Open Source. The proposal is to store such files in the already existing large files repository attached to the webpage repo.
- Open Meetings page has been enhanced, there are now relevant links like to the board that is relevant, ...
