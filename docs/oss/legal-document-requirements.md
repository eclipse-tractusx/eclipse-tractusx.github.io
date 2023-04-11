---
title: Legal documentation requirements
sidebar_position: 35
---

This page contains information about legal documentation requirements. The reference is always the [Eclipse Foundation Project Handbook](https://www.eclipse.org/projects/handbook/#legaldoc).

## Source Code Repositories

The following files have to be added to the root level of your Eclipse repository:

- LICENSE
- NOTICE.md
- DEPENDENCIES
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md

For examples look to the [Eclipse Tractus-X GitHub Organisation](https://github.com/eclipse-tractusx).

### LICENSE FILE

In Eclipse Tractus-X the outbound license is Apache-2.0 for all code.

- SPDX-License-Identifier: Apache-2.0
- [License Text](https://www.apache.org/licenses/LICENSE-2.0.txt)

See the [Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-license).

### NOTICE FILE

- Add the link o your repositories
- Add the link to your DEPENDENCY file (one or more)
- Add information for third party content checks, if not covered by the Dash Tool (e.g. IP checks for icons, fonts, ...)

**Example for third party icons:**

```shell
feather (4.29)
    * License: MIT License
    * Licence Path: https://github.com/feathericons/feather/blob/master/LICENSE
    * Project URL: https://feathericons.com/
    * Source URL: https://github.com/feathericons/feather
```

**Example for a third party library:**

```shell
jcl-over-slf4j-1.7.25.jar (1.7.25)
    * License: MIT License
    * Licence Path: https://www.slf4j.org/license.html
    * Project URL:  https://www.slf4j.org
    * Source URL:   https://github.com/qos-ch/slf4j
```

See the [Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-notice).

### DEPENDENCY FILE

- Created via the [Dash Tool](https://www.eclipse.org/projects/handbook/#ip-license-tool)

If different technologies / package managers (e.g. npm and maven) are used you are free to have several dependeny files. Use the naming convention DEPENDENCY_XYZ, e.g. DEPENDENCY_FRONTEND and DEPENDENCY_BACKEND.

### SECURITY FILE

- The security file should at least contain information, where/how to report a vulneriability issue.
- Add this [link](https://www.eclipse.org/security/)

See the [Handbook](https://www.eclipse.org/projects/handbook/#vulnerability)

### CONTRIBUTOR GUIDE

See the [Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-contributor)

### CODE OF CONDUCT

:::info

The Version 2.0  of the Eclipse Foundation Community Code of Conduct was released on Jan 01, 2023.
Update the file in your repositories.

:::

See the [CODE OF CONDUCT](https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php),
and here in [md format](https://raw.githubusercontent.com/eclipse/.github/master/CODE_OF_CONDUCT.md).

### AUTHORS FILE (optional)

- Add the authors and further contact information

[Example](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/AUTHORS.md)

## Copyright and License Header

From the Handbook

*Where possible, all source code, property files, and metadata files (including application, test, and generated source code as well as other types of files such as XML, HTML, etc.) should contain appropriate copyright and license notices as well as information on each contribution.*

see [more](https://www.eclipse.org/projects/handbook/#ip-copyright-headers)

## Distribution

See the [Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-contributor)

## End User Content

See the [Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-end-user)
