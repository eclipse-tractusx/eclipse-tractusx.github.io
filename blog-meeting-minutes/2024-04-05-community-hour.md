---
slug: community-office-hour-2024-04-05
title: Community Office Hour 2024-04-05
authors:
  - sebastian_bezold
tags: [community, meeting-minutes]

---

## Office Hour meeting minutes

### System team

- Several TRGs in Draft
  - See [TRG 0](https://eclipse-tractusx.github.io/docs/release/trg-0/)
  - Dedicated PRs will be raised to gather feedback before publishing

### Security team

- Veracode license finally expired
  - Dashboards still accessible
  - No new scans can be run
  - CodeQL is the replacement
- Security TRGs live. See the "TRG 8 - Security" section
  in [Release Guidelines](https://eclipse-tractusx.github.io/docs/release)

### FOSS

- n/a

### Open planning / community

- n/a

### Discussions

- Dependabot PRs
  - In general: keep your dependencies up to date. Keep the `DEPENDENCIES` file in mind. Ask committers for help, if you
    don't have one in your team.
  - Specifically Docker base images: If dependabot suggests to upgrade the base image to a new major library version,
    that you do not support. Ask a committer to tell dependabot to ignore the dependency
  - Specifically Chart Releaser Action: Should not be an issue, but we can investigate if the upgrade would raise
    issues (`1.4.1` to `1.6.0` in this case)
- Are there updates to API versioning
  - No one in the call had an update
  - The [Discussion](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/discussions/580) is untouched for a
    while
  - If this is an issue for anyone, please push that topic again
