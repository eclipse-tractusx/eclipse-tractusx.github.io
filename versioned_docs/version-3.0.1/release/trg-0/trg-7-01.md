---
title: TRG 7.01 - Legal Documentation
---

| Status | Created     | Post-History  |
|--------|-------------|---------------|
| Draft  | 13-Apr-2023 | Moved from OSS Development           |

## Why

Eclipse Tractus-X is an open source project hosted by the Eclipse Foundation licensed under the [Apache License 2.0](https://spdx.org/licenses/Apache-2.0). The legal obligations of the content must be observed in all forms of which the content is available.

This page contains information about legal documentation requirements in your repositories. The source of truth is always the [Eclipse Foundation Project Handbook](https://www.eclipse.org/projects/handbook/#legaldoc).

:::info

The requirements described here **must** be met for each contribution.

:::

## Description

The following files must be part of your repository root folder:

- LICENSE
- NOTICE.md
- DEPENDENCIES
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md

For examples look to the [Eclipse Tractus-X GitHub Organisation](https://github.com/eclipse-tractusx), e.g. the [APP Dashboard](https://github.com/eclipse-tractusx/app-dashboard).

### LICENSE FILE

In Eclipse Tractus-X the outbound license is Apache-2.0.

- SPDX-License-Identifier: Apache-2.0
- [License Text](https://www.apache.org/licenses/LICENSE-2.0.txt)

See the [Handbook#legaldoc-license](https://www.eclipse.org/projects/handbook/#legaldoc-license).

<!--- TODO AWI CC BY as license for documentation
For documentation the Creative Commons Attribution 4.0 International (CC BY 4.0) is recommended:
- SPDX-License-Identifier: CC-BY-4.0
- Link: https://creativecommons.org/licenses/by/4.0/legalcode
--->

### NOTICE FILE

- Add the link to your repository
- Add the link(s) to your SBOM, e.g. the DEPENDENCY file (one or more)
- Add information for third party content checks, if not covered by the Dash Tool (e.g. IP checks for icons, fonts, ...)

See the [Handbook#legaldoc-notice](https://www.eclipse.org/projects/handbook/#legaldoc-notice).
(TODO AWI: Add link to TRG 7.04)

### DEPENDENCY FILE

:::info

Third-party dependencies need to be checked regularly to reflect your code changes. The DEPENDENCY file must be updated accordingly. This is recommended for every contribution (e.g. PR) whenever possible.

:::

- Create it with the [Eclipse Dash License Tool](https://www.eclipse.org/projects/handbook/#ip-license-tool)

If different technologies / package managers (e.g. npm and maven) are used you are free to have several dependency files. Use the naming convention DEPENDENCY_XYZ, e.g. DEPENDENCY_FRONTEND and DEPENDENCY_BACKEND.

Further information: (TODO AWI: add link to TRG 7.04)

### SECURITY FILE

- The security file should at least contain information, where/how to report a vulneriability issue
- Add this [link](https://www.eclipse.org/security/)
- [Example](https://github.com/eclipse-tractusx/app-dashboard/blob/main/SECURITY.md)

See the [Handbook#vulnerability](https://www.eclipse.org/projects/handbook/#vulnerability).

### CONTRIBUTOR GUIDE

See the [Handbook#legaldoc-contributor](https://www.eclipse.org/projects/handbook/#legaldoc-contributor)

### CODE OF CONDUCT

:::info

The Version 2.0  of the Eclipse Foundation Community Code of Conduct was released on Jan 01, 2023.
Update the file in your repositories.

:::

See the [CODE OF CONDUCT](https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php)
and here in [md format](https://raw.githubusercontent.com/eclipse/.github/master/CODE_OF_CONDUCT.md).

### AUTHORS FILE (optional)

- Add the authors and further contact information
- [Example](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/AUTHORS.md)

## Existing checks for the legal documentation

- [EF - Legal Documentation Generator](https://www.eclipse.org/projects/tools/documentation.php?id=automotive.tractusx)
- [TractusX - Central Github Checks](https://eclipse-tractusx.github.io/docs/github-checks)

## TODOs when moved to TRG section

| page | what     | why  |
|--------|-------------|---------------|
| TRG 2.03  | remove / change links to legal doc files | duplicate description           |
| static files  | delete example files (e.g. notice.md, ...) | use links to EF instead           |
| this  | add / change links to other TRG 7.x pages | page location will change          |
