---
slug: community-office-hour-2025-07-04
title: Community Office Hour 2025-07-04
authors:
    - stephan_bauer
    - tom-rm-meyer-ISST
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Infrastructure & Test Management
 
#### Release Roadmap
 
- 25.09 release is in testing; 25.12 is upcoming.
- Teams must create and fill out release check issues, including responsible contacts, app versions, and feature lists. This must be done for both, KITs and FOSS Products.
- Quality gate checks should be created and linked early.
- Products not part of the release should be communicated.
 
#### ubernetes Update
 
- Core cluster update started; end environment update scheduled (1–5 PM).
- Upgrading to version 1.33.0 (from 1.28/1.29).
- Teams should consider the new version in their release checks.
 
### Release Management
 
#### Timeline Review
 
- R25.09: Currently in development and test case creation phase. Deadline for KIT readiness: August 18.
- R25.12: Briefing meeting for testing in July; each team should send at least one representative.
- Open source community encouraged to contribute to "KITs" (documentation/tooling packages).
- Discussion on deadlines for KIT PRs—suggestion to focus on merge deadlines rather than initial PRs.
 
### KIT Management
 
#### Versioning & Changelog
 
- Maintain changelogs in every request.
- Avoid last-minute KIT changes; contribute early to prevent release delays.
- Release check issues for KITs are still required and tracked on the release management board.
 
#### Refinement Phase for 25.12
 
- Teams can already create features for the next release.
- Upcoming "Alignment Day" for cross-team coordination.
 
### Security & Governance
 
#### Security

- Reminder to use the security tab and available tools (e.g., Snyk) to address critical/high findings.
- Contributors should consult committers for access.
 
#### FOSS Governance
 
- TRGs (Technical Reference Guidelines) 7.XX, 7.XX, 7.XX updated; 7.XX to be deprecated. Improved handling of license/copyright information, especially for images and non-code artifacts. Find details in the PR.
- Reminders
  - Markdown files must include a notice section; code files require license headers.
  - Reviewers should enforce these requirements.
  - Discussion on imported notice sections and license mismatches. Not recommended
 
## Community & Events
 
#### Tractus-X Promotion at Catena-X Tech Days (France)
 
- Event on July 9; open invitation to join and help build the French community.
- Announcement posted to the mailing list. [Link to event](https://lnk.pmlta-etaa-0.ovh/vfSCGvsjapuJ7rWB6s3PiRjUA/108111105114101064103097108105097046099111109/m72j31200547/versionWeb.html).
 
#### Mailing List Etiquette
 
- Replies and reactions to mailing list messages notify all members; use with consideration.
 
## Open Discussion & Q&A
 
- Issuer service deprecated; functionality moved to Identity Hub.
- Call for developers with Identity Hub experience.
