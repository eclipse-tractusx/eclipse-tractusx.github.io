---
title: "Chapter 2: Connect"
sidebar_position: 4
---

The `Connect Chapter` describes step by step how you have to setup your (cloud) infrastructure including servers, a kubernetes cluster, networking and security. On this stack you will deploy the components that you need for data provisioning and data consumption. Along with that you will deploy all the components that simulate the core service provider in our data space.

This tutorial is designed for developers who want to get their hands dirty, for companies that want to perform data exchange in actual Catena-X data space infrastructure and generally for curious minds who want to explore dataspaces.

Required knowledge and skills:

- Beginner level docker and kubernetes
- Beginner level terraform
- Basic linux system commands

## Components & Architecture

By performing this tutorial a data space will be set up including the following components:

- 2 Tractus-X EDC Connectors (Called Bob and Alice). The EDC is the key component to exchanging data within data spaces.
- 1 Managed Identity Wallet. The Managed Identity Wallet (MIW) service is a central component storing technical identities. Connectors can request the identity, including properties, in order to take decisions if a contract-offer will be made, a contract agreement will be negotiated, or a data-exchange will be processed.
- 1 Keycloak instance. Keycloak is used for Identiy and Access Management of technical users.
- 1 Postgres data base. A data base building the foundation for the MXD setup.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
