---
title: Prepare the infrastructure
sidebar_position: 1
---

## Prerequisites

In order to run the MXD on your local machine, please make sure the following
preconditions are met.

- Have a local Kubernetes runtime ready. We've tested this setup with [KinD](https://kind.sigs.k8s.io/), but other
  runtimes such as [Minikube](https://minikube.sigs.k8s.io/docs/start/) may work as well, we just haven't tested them. All following instructions will assume KinD.
- Install [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
- a POSIX-compliant shell, e.g. `bash` or `zsh` unless stated otherwise
- basic knowledge about Helm and Kubernetes
- [Optional] a cli tool to easily print logs of a K8S deployment, such as [`stern`](https://github.com/stern/stern)
- [Optional] a graphical tool to inspect your Kubernetes environment, such as [Lens](https://k8slens.dev/).
  Not mandatory of course, but all screenshots in this doc are created off of Lens.
- [Optional] a graphical tool to inspect Postgres databases, such as [PgAdmin](https://www.pgadmin.org/). Screenshots in
  this guide are created off of PgAdmin.
- [Optional] a graphical tool to send REST requests, such as [Postman](https://www.postman.com/). This sample will
  include Postman collections that can be imported.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
