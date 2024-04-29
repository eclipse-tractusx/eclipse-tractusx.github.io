---
slug: community-office-hour-2024-03-22
title: Community Office Hour 2024-03-22
authors:
    - sebastian_bezold
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### System team

- Investigating slow [website](https://eclipse-tractusx.github.io/) build times
  - Local builds (and CI) take increasingly more time (~13 min for static build with empty caches)
  - Heap size has to be increased on some machines
  - Potential source: Versioning of the KITS and keeping all the versions

### Security team

- Some teams are already migrating from Veracode to CodeQL. Great! Remember to also remove Veracode workflows in this case.
- PR to publish the Security TRG section will be raised
- Snyk will not be part of the Security TRGs and therefore not mandatory. Best practices and how-tos will still be provided in [sig-security](https://github.com/eclipse-tractusx/sig-security)

### FOSS

- [Getting started](https://eclipse-tractusx.github.io/docs/oss/getting-started) guide improved
  - Does make it easier for new-joiners
  - Please link to this guide instead of duplicating information
  - If anything is missing, feel free to raise a PR or open an issue

### Open planning / community

- Tractus-X "Stammtisch Munich". [See Matrix post](https://matrix.to/#/!oXNwXGsvkbDUMiQhms:matrix.eclipse.org/$HQJu6RdRdobY62XxARHy7kRe0hIqX2fLw4A4l6x2exk?via=matrix.eclipse.org&via=matrix.org&via=dev-null.rocks)
- Old consortia office hour meeting will be cancelled. Open meeting link is now well known.

### Discussions

- People have been receiving on- and offboarding emails for the Tractus-X contributor team in GitHub
  - Unclear what triggered it
  - If you are committer, you don't need to also be part of the contributor group
  - In case you lost a necessary group assignment, please reach out

