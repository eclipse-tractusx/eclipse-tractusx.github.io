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

This helps people who are using the product, to understand which version to choose or when to upgrade.

## Description

All notable changes in the product repositories **have to** be added to a `CHANGELOG.md` file.
Also, a link to the [Eclipse Tractus-X Changelog](https://github.com/eclipse-tractusx/tractus-x-release/blob/main/CHANGELOG.md) **has to** be added there.

The versioning of the product releases **has to** follow [semantic versioning](https://semver.org/).

The product `CHANGELOG.md` file **should** follow the format as described in [Keep A Changelog](https://keepachangelog.com/en/1.1.0/).

## Best Practices and Example

- latest released version should be on top
- each released version should have a separate block entry and each version should be linked to the corresponding tag
- use the "unreleased section" to track updates to features or functions of upcoming releases
- same kinds of changes should be grouped (e.g. changed, fixed, removed, etc.) and each change should be linked to the corresponding issue or pull request

### Example `CHANGELOG.md`

```markdown

All notable changes to this project will be documented in this file see also the overarching [`CHANGELOG.md`](https://eclipse-tractusx.github.io/changelog) for Tractus-X releases.

## [Unreleased]

- add API reference documentation (#issue, #pull-request)

## [v2.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v2.0.1)  (your currently released semantic version) 

### Added

- support for SSI (#issue, #pull-request)

### Changed

- bump Java version (#issue, #pull-request)

... 

### Security

- fix security CVE <number> (#issue, #pull-request)
```

A full example can be found on [Keep A Changelog](https://keepachangelog.com/en/1.1.0/).
