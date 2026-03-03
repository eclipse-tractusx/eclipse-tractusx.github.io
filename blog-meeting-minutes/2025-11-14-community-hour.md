---
slug: community-office-hour-2025-11-14
title: Community Office Hour 2025-11-14
authors:
    - ds-hzimmer
tags: [community, meeting-minutes]
---

## Community Office Hour Meeting Minutes

Status updates discussed in meeting:

### Infrastructure and Test Management

- Test phase for Release 25.12 is ongoing. Currently blocking issue with Portal onboarding of new test companies.
  - Workaround using existing ones is also limited due to issues with email notifications for new user accounts and presumed issue for creation of new technical users.

### Release Management

- [Release Planning Timeline](https://github.com/orgs/eclipse-tractusx/projects/26/views/35):
  - 26.03 Eclipse Tractus-X Open Planning was conducted on November 13th.

- Policy Hub recommendation to be archived: Decision of Data Sovereignty Expert Group that the Policy Hub is not needed anymore, as it adds no value to the ecosystem.
  - See for details this issue on the [Office Hour Board](https://github.com/orgs/eclipse-tractusx/projects/61/views/1?pane=issue&itemId=139296712).
    It will remain in progress to track further information.
  - Input from [Mathias Moser](https://github.com/matbmoser) to follow the official process as outlined in [TRG 7.09](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-09/)

### Security

- Please check regularly if there are findings for vulnerabilities or dependency updates in the security tab of your project repository.

### Community/Open Planning

- Everyone is invited to join the Fifth Eclipse Tractus-X Community Days on December 4th and 5th in Stuttgart. See this [link for registration](https://arena2036.de/de/reader/fifth-eclipse-tractus-x-community-days)
- New Calendar View for open meetings, see for details the [open meetings page](https://eclipse-tractusx.github.io/community/open-meetings)
  - Potentially type color for time and date could be set in white for better legibility.

### Feedback / Questions / Requests

- Discussion of planned [PostgreSQL updates and image provider change](https://github.com/orgs/eclipse-tractusx/projects/61/views/1?pane=issue&itemId=133107482)
  - [Mikel Garcia](https://github.com/mgarciaLKS) has updated the applicable TRGs, including the change from Bitnami to Cloud Pirates images
  - He also created a [migration guide](https://github.com/eclipse-tractusx/ssi-dim-wallet-stub/blob/b544ee4f4e7559ac16763a8457933c23eeeb089b/docs/admin/migration-guides/BITNAMI_TO_CLOUDPIRATES_MIGRATION_GUIDE.md) using the SSI DIM Wallet Stub as an example.
  - However there were issues encountered by [Lars Geyer-Blaumeiser](https://github.com/lgblaumeiser) for the BDRS service with the automated Helm Upgrade failing, thus requiring a manual deletion and redeployment. See [this link](https://github.com/eclipse-tractusx/bpn-did-resolution-service/issues/284) for further details.

- Question from [René Schröder](https://github.com/ReneSchroederLJ) regarding maintenance of IRS -> Will contact [Robin Gottschalk](https://github.com/rogocof) to follow up.

- Suggestion from [Mathias Moser](https://github.com/matbmoser): TRG for quality of new or existing repositories in GitHub, e.g. with the 3 phases sandbox, incubating, graduated. He will elaborate this further. The plan would be in a later step to display this automatically as a "maturity level" for each repository in the Eclipse Tractus-X product list overview.

- Discussion regarding a legal need to remove/replace references to EPL licenses from files in Eclipse Tractus-X. Finding a solution is ongoing.
