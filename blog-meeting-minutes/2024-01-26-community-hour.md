---
slug: community-office-hour-2024-01-26
title: Community Office hour 2024-01-26
authors: 
    - almadi_gabor
tags: [community, meeting-minutes]
---

## office hour meeting minutes

### System team

- Whenever a new room is created in the Eclipse Matrix chat, please announce it in the main [Tractux-X](https://matrix.to/#/#tractusx:matrix.eclipse.org) room,
  office hour and mailing list so everybody can learn about it and join.

### Security team

- New issue templates are available for the following topics:
  - [OSS Tool membership request](https://github.com/eclipse-tractusx/sig-security/issues/new?assignees=SSIRKC&labels=security%2C+tool&projects=&template=tractus-x-oss-tool-membership-request.md&title=Requesting+access+to+%22%5BTOOL+NAME%5D+YOUR_REPOSITORY%22)
  - [Ask the community](https://github.com/eclipse-tractusx/sig-security/discussions/categories/q-a) for security help via Discussions
  - Keep an eye out on the [Security Announcements](https://github.com/eclipse-tractusx/sig-security/discussions/categories/announcements) where news 
    about security topics are announces regularly
- Get in touch with the Security Team for testing with [Snyk](https://snyk.io/)

### FOSS

- There was a new election for a project lead role for [Stephan Bauer](https://github.com/stephanbcbauer)
- The Eclipse Project Handbook changed the section about handling copyright headers. A year range is not longer necessary, only the year when
  the file was created so there is no need to keep an eye on updating the headers. It is still allowed to put year range (creation date and
  last modification year) in the header but they have to be separated with comma character.
- Please sign the Eclipse Contributor Agreement when trying to contribute to the webpage. Without that it is not possible to merge commits
  to the main branch.
- ❗ Please don't put any Catena-X content or resource on the website without permission.

### Open planning / community

- New [Open Meetings Links](https://eclipse-tractusx.github.io/community/open-meetings) are listed directly on our webpage to participate and separate calendar files can be downloaded from there.
- Office hours will probably start a few minutes later so the people don't have to wait until everyone gets there.
- Commiters and Contributors Meeting could be a new form of communication where the committers are more involved getting some pressure off the System Team.
- Newjoiner rounds for basic introductions would be held every 2 weeks in a separate session.

### Open discussion

- [Umbrella chart](https://github.com/eclipse-tractusx/e2e-testing):
  - Currently there is a temporary solution for the Managed Identity Wallet by SAP until the [open source version](https://github.com/eclipse-tractusx/managed-identity-wallet) is fixed. This is a COTS
    application and it raises questions like how it can be integrated into an open source software stack like the umbrella chart. It is not confirmed yet
    whether the version from SAP can be used without a license. Currently all components can run without MIW but data exchange functionality won't work.
- Public API versioning is still an open topic where no decision has been made to create a TRG or guide the Tractus-X community to follow
  one versioning strategy.
- An alternative for MS Teams should be found as it is hard to manage for an open community (e.g. Discord).
