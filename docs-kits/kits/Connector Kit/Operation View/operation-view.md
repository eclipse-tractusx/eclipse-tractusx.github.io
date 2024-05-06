---
sidebar_position: 1
title: Operation View
description: Operation View
id: connector_kit_operation_view
---

![Connector kit banner](/img/kit-icons/connector-kit-icon.svg)

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

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 Contributors of the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc)
