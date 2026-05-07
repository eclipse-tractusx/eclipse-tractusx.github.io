---
sidebar_position: 1
title: Operation View
description: Connector KIT operations
id: operation-view
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="connector" />

## General operation aspects

As already mentioned in the [adoption view][adoption-view-url], the connector divides into a control plane, which is
typically an own service implementation and data planes, which could come in various forms. As mentioned, there is a
*Dataplane Signalling API* which standardizes interactions between control and data plane. It is recommended to
follow these instructions in order to provide a pluggable combination of control and data plane.

> **Catena-X:** For Catena-X, the operation of a BPN-DID resolution service is required to provide the necessary
  mapping information between BPNLs and DIDs of participants.

## Reference Implementation

As all Eclipse Tractus-X products, the connector implementation comes with a helm chart that allows to easily deploy
a setup in a kubernetes cluster. In fact, there are two different helm chart flavors, one supporting the deployment
of a full-fledged setup with a control plane, a data plane and the required Postgres database, resp. Hashicorp vault.
A second helm chart flavor allows to deploy the in-memory solution for testing purposes. The charts are published
according to Eclipse Tractus-X rules defined in the [TRGs][trg-url].

The BPN-DID resolution service is packaged in the same manner and also is provided in an in-memory and a database
flavor.

### Configuration Parameters

The connector requires a set of configuration parameters which are basically configured using the charts values
file. Details are found in the [Readme files][helm-chart-readme-url] of the helm charts.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Cofinity-X GmbH
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/operation-view/operation-view.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/operation-view/operation-view.md)

[adoption-view-url]: ../adoption-view/adoption-view.md

[helm-chart-readme-url]: https://github.com/eclipse-tractusx/tractusx-edc/blob/main/charts/tractusx-connector/README.md

[trg-url]: https://eclipse-tractusx.github.io/docs/release
