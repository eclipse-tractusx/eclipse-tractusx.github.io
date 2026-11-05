---
title: Deploying the components
sidebar_position: 1
---

## Preconditions

:::info

Make sure that you have understood and carried out all the steps in the `Prerequisites chapter` before you start deploying the components.

:::

### Mandatory

- Local Kubernetes runtime ready
- `Kubectl`, `helm` and `minikube` installed
- A POSIX-compliant shell, e.g. `bash` or `zsh` unless stated otherwise. The tutorial conatins examples for `bash`.

### Optional

- CLI tool to easily print logs of a K8S deployment, such as [`stern`](https://github.com/stern/stern)
- Graphical tool to inspect your Kubernetes environment, such as [Lens](https://k8slens.dev/).
- Graphical tool to inspect Postgres databases, such as [PgAdmin](https://www.pgadmin.org/). Screenshots in
  this guide are created off of PgAdmin.
- Graphical tool to send REST requests, such as [insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

## The Deployment

### Using Umbrella Helm Charts

The components (listed in the table in the `Connect chapter`) are deployed using an umbrella chart. It consists of Tractus-X OSS components and provides a
basis for running end-to-end tests or creating a sandbox environment of the Catena-X automotive dataspace network. The Chart aims for a completely automated setup of a fully functional network that requires no manual setup steps, as long as only one instance (minikube cluster) is running (see warning above). If several clusters are running, you will need to adjust so configuration files.

:::note

This chapter is described within the README for the Tractus-X umbrella charts following the [link](https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/docs/README.md)

Important chapters are:

- [Cluster Setup](https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/docs/user/setup)
- [Network Setup](https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/docs/user/network)
- [Installation](https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/docs/user/installation/README.md)

:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 ARENA2036 e.V.
- SPDX-FileCopyrightText: 2024 sovity GmbH
- SPDX-FileCopyrightText: 2024 SAP SE
- SPDX-FileCopyrightText: 2024 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
