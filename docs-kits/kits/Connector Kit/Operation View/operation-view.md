---
title: Operation View
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

# Operation View

## Reference Implementation

The reference implementation for the Connector kit is the  [Eclipse Dataspace Connector](https://github.com/eclipse-edc/Connector).
Furthermore, it assumes the usage of a deployable EDC as provided by [Tractus-X EDC](https://github.com/eclipse-tractusx/tractusx-edc).

## Configuration Parameters

The EDC requires a few parameters for configuration.
They are detailed [here](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/charts/tractusx-connector#configure-the-chart).

## Architecture

For a summary of the architecture surrounding a Controller, take a look at the Development View's [architecture page](../Development%20View/architecture.md).

## Deployment Resources

### TractusX Helm Charts

The [Helm charts](https://helm.sh/docs/) provided by TractusX form the basis for a deployable EDC.
The default configuration can be found [here](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/charts/README.md).
This configuration assumes a database for persistence and Hashicorp Vault for secret storage.
Other configurations are available in the same repository.

### Minimum Viable Dataspace

A minimal setup using [Terraform](https://developer.hashicorp.com/terraform) is available in the form of the 
[Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace).

Documentation on it can be found [here](https://eclipse-edc.github.io/docs/#/submodule/MinimumViableDataspace/).

### Deployment Guide

Specific configuration details are described more closely in the 
[Deployment Guide](https://eclipse-tractusx.github.io/docs/tutorials/e2e/connect/deployComponents/).
