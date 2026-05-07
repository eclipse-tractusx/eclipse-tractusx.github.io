---
sidebar_position: 2
title: Reference Implementation
description: A reference page to reflect the reference implementation
id: sdv-reference-implementation
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="connector" />

## Reference Implementation Details

The reference implementation of a connector is provided by Eclipse Tractus-X from the repository
[tractusx-edc][tractusx-edc-url].

The connector is a derived product from the [Eclipse Dataspace Components Connector][edc-connector-url] implementation.
In Eclipse Tractus-X the base connector is used and extended for use in a dataspace as defined in this KIT. In
addition the repository defines runtimes that provide a ready-to-deploy product provided as docker images on
docker hub. This includes a full-fledged control and data plane setup using a database and a vault for storage
of relevant data as well as a test setup with in-memory storage facilities.

All components from upstream and Tractus-X are available in maven central as packages to be used in own runtimes,
if needed.

### Resources

- [Eclipse Dataspace Components][edc-url] Website
  - The website hosts relevant documentation on the project.
- Tractus-X Connector [Releases][release-url] showing all available releases with release notes and links to test reports
- Tractus-X Connector [Readme][readme-url]
- Tractus-X Connector [Management API Walkthrough][mgmt-api-url], which describes how to interact with a connector from
  an app perspective controlling the interactions with the connector on provider and consumer side.
- Tractus-X Connector [Migration Guides][migration-guide-url] which describes for each version update what to adapt
  to meet the requirements of the new version.
- Tractus-X Connector [OpenApi-Hub][tx-connector-openapi-url]
- Tractus-X Connector [Developer Documentation][dev-docu-url] containing some concept documentation and decision records
- Tractus-X BPN-DID resolution service [main repository][bdrs-repo-url]
- Tractus-X BDRS [OpenApi-Hub][tx-bdrs-openapi-url]

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Cofinity-X GmbH
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/software-development-view/reference-impl.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/software-development-view/reference-impl.md)

[bdrs-repo-url]: https://github.com/eclipse-tractusx/bpn-did-resolution-service

[dev-docu-url]: https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/development

[edc-connector-url]: https://github.com/eclipse-edc/Connector

[edc-url]: https://eclipse-edc.github.io

[mgmt-api-url]: https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/usage/management-api-walkthrough

[migration-guide-url]: https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/migration

[readme-url]: https://github.com/eclipse-tractusx/tractusx-edc/blob/main/README.md

[release-url]: https://github.com/eclipse-tractusx/tractusx-edc/releases

[tx-bdrs-openapi-url]: https://eclipse-tractusx.github.io/api-hub/bpn-did-resolution-service/

[tx-connector-openapi-url]: https://eclipse-tractusx.github.io/api-hub/tractusx-edc

[tractusx-edc-url]: https://github.com/eclipse-tractusx/tractusx-edc
