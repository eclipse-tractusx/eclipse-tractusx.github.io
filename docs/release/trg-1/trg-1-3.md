---
title: TRG 1.03 - CHANGELOG.md
---

| Status | Created      | Post-History                             |
|--------|--------------|------------------------------------------|
| Update | 11-Jan-2024  | add best practices and example changelog |
| Active | 20-Feb-2023  | reference keep a changelog as format     |
| Draft  | 14-Sept-2022 | n/a                                      |

## Why

Tracking changes in Open Source is critical to have a way of knowing which new features have been introduced, which bugs have been fixed, which security CVEs have been mitigated.

This helps people who are using your product, to understand which version to choose or when to upgrade.

## Description

All notable changes in your product repositories **have to** be added to a `CHANGELOG.md` file.
Also, a link to our general [Eclipse Tractus-X Changelog](https://github.com/eclipse-tractusx/tractus-x-release/blob/main/CHANGELOG.md) **have to** be added there.

The versioning of your releases **have to** follow [semantic versioning](https://semver.org/).

Your product `CHANGELOG.md` file **should** follow the format as described in [Keep A Changelog](https://keepachangelog.com/en/1.1.0/).
For easy `CHANGELOG.md` creation [conventional committing](https://www.conventionalcommits.org/en/v1.0.0/#summary) **should** be followed.

## Best Practices and Example

- latest released version should be on top
- same kinds of changes should be grouped
- versions and sections (e.g. changed, fixed, removed, etc.) should be linked
- add an entry for each released version
- use the "unreleased section" to track updates to features or functions of upcoming releases
- cases where a `CHANGELOG.md` update is not necessary:
  - minor or internal changes that don't affect the functions or user experience to avoid unnecessary clutter
  - builds or test updates that are not intended for users
  - automation changes for processes, workflows and scripts
  - minor documentation changes
- use automation to generate `CHANGELOG.md` based on commit messages as much as possible
- checkout our [Release Automation Playground](https://github.com/catenax-ng/release-automation-playground) that releases a simple `CHANGELOG.md` file based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) and [semantic versioning](https://semver.org/)

### Example `CHANGELOG.md`

```markdown
## [Unreleased]

- feature, fixes, additions (link to feature issue)

## General Tractus-X Release Changelog

The overarching [`CHANGELOG.md`](https://eclipse-tractusx.github.io/changelog) and including compatibility matrices for Tractus-X releases.

## [Version] - your currently released version

### Added

- new feature, function or enhancement (add link to feature issue)

### Changed

- updates to existing features or functions (add link to issue)

... 

### Security

- security-related changes (link to issue)
```

A full example can be found on [Keep A Changelog](https://keepachangelog.com/en/1.1.0/).
