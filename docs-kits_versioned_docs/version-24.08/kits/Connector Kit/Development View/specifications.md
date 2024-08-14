---
sidebar_position: 1
title: Specifications
description: Specifications
id: connector_kit_development_view_specifications
---

The following describes the standards for implementation of the Connector Kit.
They detail the necessary functionality of as well as the expected communication with a Connector.

## Dataspace Protocol (DSP)

The core specification for the Connector Kit is the Dataspace Protocol (DSP), which can be found [here](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/overview/readme).
This specification is supplied by the International Data Spaces Association (IDSA).

The DSP provides the core specifications for exchanges between connectors, including a split between a layer managing contracts and policies and a layer managing the actual data.
In the reference implementation, these are the management plane and the data plane.

![IMG: DSP Diagram](https://1597595229-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FlnGZQUB3A7aTQkUjaEA4%2Fuploads%2Fgit-blob-fb75be575f63a8e65f3e14563607363f52daf352%2FProtocolOverview.png?alt=media)

## Identity and Trust Protocol (IATP)

In Catena-X, the interaction between the wallets holding a participant's identity credentials and the connector is
specified by the [IATP](https://github.com/eclipse-tractusx/identity-trust). This protocol is currently under development with the Eclipse-Tractusx community and will find
its way into the IDSA and international standardization bodies.

## Catena X Standard Library

The other guiding documentation is the [Catena X Standard Library](https://catena-x.net/en/standard-library).
In particular, Dataspace Connectivity CX-0018 describes a Dataspace Connector.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
