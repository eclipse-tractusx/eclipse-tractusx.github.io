---
title: Specifications
sidebar_position: 1
---
<!--
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
-->

# Specifications

The following describes the standards for implementation of the Connector Kit.
They detail the necessary functionality of as well as the expected communication with a Connector.

## Dataspace Protocol

The core specification for the Connector Kit is the Dataspace Protocol (DSP), which can be found [here](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/overview/readme).
This specification is supplied by the International Data Spaces Association (IDSA).

The DSP provides the core specifications for exchanges between connectors, including a split between a layer managing contracts and policies and a layer managing the actual data.
In the reference implementation, these are the management plane and the data plane.

![IMG: DSP Diagram](https://1597595229-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FlnGZQUB3A7aTQkUjaEA4%2Fuploads%2Fgit-blob-fb75be575f63a8e65f3e14563607363f52daf352%2FProtocolOverview.png?alt=media)

## Catena X Standard Library

The other guiding documentation is the [Catena X Standard Library](https://catena-x.net/en/standard-library).
In particular, Framework Agreement CX-0018 describes the Eclipse Dataspace Connector, the reference implementation of the Connector Kit.
