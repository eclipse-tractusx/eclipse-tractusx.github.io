---
title: Understand the overarching architecture
sidebar_position: 2
---

This section provides an overview of the Tractus-X Data Space (TXD) architecture. In short, the TXD is a simplified version of the Catena-X data space for local deployment. Not all components of Catena-X are currently used in the TXD.

The tutorial is under continuous development. The [TXD architecture](#the-tractus-x-data-space-architecture) shows all current and planned components of the TDX.

## Components of the Tractus-X Data Space

### EDC

A key component of the Catena-X architecture is the [Eclipse Data Space Connector](https://github.com/eclipse-tractusx/tractusx-edc) (EDC). **This component is used to exchange data between participants**. This includes:

- Provide data to other participants in the data space.
  - connect data sources to the EDC
  - define policies for the data consumption
  - create contract definitions for souvereign data exchange

- Consume data offerings from other participants.
  - Request data catalogs
  - negotiate contract offers
  - transfer the data

:::info

The tutorial setup includes two EDCs: **Alice** and **Bob**. The EDCs are already registered in the TXD setup and the technical users are created in the keycloak instance.

This represents the minimal Setup for data exchange in a data space.

:::

### Managed Identity Wallet (MIW)

The Managed Identity Wallet (MIW) provides a service where you can **store your Verifiable Credentials (VC) for any Catena-X services** in a safe place. This is only an intermediate step before self hosted wallets are supported and organizations have the choice to either use a managed service or store their VCs in their own wallets.

### Identity Access Management (IAM) - keycloak

keycloak is used to **manage access to central components**, e.g. the MIW and some of the discovery services with typical OAuth Client Credentials flow.

### Portal

The Portal as an overall product is a complex composition of several interacting solution building blocks. It is generally designed to work with the IAM. For the tutorial relevant parts of the Portal are:

- BPDM-Pool
- Semantic Hub

### BPDM

BPDM is an acronym for **business partner data management**. It serves two main purposes:

- Provide services for querying and sharing business partner information
- Establish an infrastructure for realizing the Golden Record process which turns business partner information from sharing members to Golden Records, that is cleaned and enriched business partner data uniquely identified by a business partner number (BPN).

The BPNs are also used in access and usage policies.

:::info

In the current TXD setup the two participants (Alice and Bob) have pre configured BPNs. Therefore the initial registration process is not part of the tutorial. In the real world you will receive your BPN via the onboarding / registration process [onboarding process](https://catena-x.net/en/catena-x-introduce-implement/onboarding).

:::

### Semantic Hub

The Semantic Hub **manages and stores all semantic model definitions** within the data space. It is a key component for achieving a common understanding of data within the ecosystem.

### Discovery Services

In a fundamentally decentralized system, it is important to find other participants and their "address" for data exchange. This can be achieved with the Discovery Services.

- The Discovery Finder is responsible for finding a matching BPN Discovery for a given type -  e.g., "bpid", "oen".
- The BPN Discovery is responsible for finding the corresponding BPNs for a given type.
- The EDC Discovery is responsible for finding the corresponding EDC endpoint against a given BPN.

## Digital Twins in Catena-X

In Catena-X digital twins are realized with the [Asset Administration Shell](https://industrialdigitaltwin.org/) (AAS). The AAS represents a vehicle to transport data of a real asset in a standardized and interoperable manner. This digital representation of the asset is called digital twin and is implemented in an AAS. To describe the different aspects of the asset  with the AAS in a common language, so called aspect models are defined in the data space. These aspect models define the semantics for the respective aspect of the digital twin. A submodel is then an implementation of an aspect of the digital twin. For a more detailed explanation see [Digital Twin KIT](https://tractus-x-community-days.github.io/eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit).

### Digital Twin Registry

The Digital Twin Registry (DTR) is a decentralized component that can be registered as a contract definition in an EDC. It serves a function similar to the index in a book. With the DTR, a data consumer can get an overview of WHAT to find, HOW and WHERE to access it. The registry contains submodel descriptors that point to the endpoint of submodels of a digital twin.

### AAS-Server

The AAS-Server or Submodel Server is used to store submodels.

:::info

The tutorial setup provides dummy submodels for the data exchange in the tutorial steps explained in Chapter boost. These dummy submodels do not apply Catena-X aspect models but work just fine for the demonstration and learning purpose of the tutorial.

:::

## The Tractus-X Data Space Architecture

![cx_architecture](@site/static/img/architecture.drawio.svg)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
