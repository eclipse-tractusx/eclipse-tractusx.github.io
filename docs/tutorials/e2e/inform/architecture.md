---
title: Understand the overarching architecture
sidebar_position: 2
---

This section provides a general overview of the Catena-X architecture. However, not all Catena-X components are used in the Tractus-X Data Space (TXD). Only the components of the TXD are listed and explained here.

## The journey starts

The first thing you need is a BPN (Business Partner Number) because this is used within the network to identify yourself against other participants. This tells the network in a trusted manner who you are.

:::info

In this tutorial the BPNs are preconfigured in the TXD setup. In the real world you will receive your BPN via the onboarding / registration process [onboarding process](https://catena-x.net/en/catena-x-introduce-implement/onboarding).

:::

The BPN is also used in access and usage policies to restrict the access and usage of your provided data assets. Some example policies are also part of this tutorial.

A data asset contains the data address and metadata for the data that is intended to be provided or consumed. This data asset is the element in the ecosystem for which policies are defined to build a contract definition which can be agreed and consumed by a consumer.

One of the key components of the Catena-X architecture is the [Eclipse Data Space Connector](https://github.com/eclipse-tractusx/tractusx-edc) (EDC) as one implementation of the [Dataspace Protocol](https://docs.internationaldataspaces.org/dataspace-protocol/). This component is used to exchange data between participants. This includes:

- Provide data to other participants in the data space.
- Discover data offerings from other participants.
- Negotiate contract definitions and transfer data according to the definied policies.

With the EDC you are always in control of your data.

Control of your data means on the one hand, that you can decide who can access your data and who can not. On the other hand you can decide under which constraints the data may be used by the data consumer after providing access. This is achieved via policies and sovereign data provisioning (in Catena-X you have the opportunity to freely decide where and by whom the data is stored and offered). This is called **data sovereignty**.

Registering an EDC is part of the onboarding process of Catena-X and is done in the portal.

:::info

In the tutorial setup, two EDCS are already configured. **Alice** and **Bob** as well as the associated databases (to persist the assets, policies, etc.) are ready to use. The EDCs are already registered in the TXD setup and the technical users are created in the Keycloak instance.

This represents the minimal Setup for data exchange in a data space.

:::

## What language does Catena-X speak? / Asset Administration Shell with Aspect Models define the language in Catena-X

Since Catena-X is more than just a data exchange the next level of key to success is to exchange data in a structured and defined way. This helps to speak the same language to leverage business value of data.

This is realized with the [Asset Administration Shell](https://eclipse-tractusx.github.io) (AAS). The AAS represents a vehicle to transport data of an real asset in a standardized and interoperable manner. This digital representation of the asset is called digital twin and is implemented in an AAS. To describe the different aspects of the asset  with the AAS in a common language, so called aspect models are defined in the data space. These aspect models define the semantics for the respective aspect of the digital twin. A submodel is then an implementation of an aspect of the digital twin. For a more detailled explaination see [Digital Twin KIT](https://tractus-x-community-days.github.io/eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit).

By utilizing the right aspect models, you are able to "speak Catena-X".

:::info

The tutorial setup provides dummy submodels for the data exchange in the tutorial steps explained in Chapter boost. These dummy submodels do not apply Catena-X aspect models but work just fine for the demonstration and learing purpose of the tutorial.

:::

When it comes to exchanging data in a data space, finding the data you want and understanding the structure and meaning of the data are of paramount importance.
Finding and understanding data is a typical challenge when you want to provide or consume data to or from an audience with whom you have no prior direct contact.

To tackle these concerns the Industry-Standard for Digital Twins, the [Asset Administration Shell](https://industrialdigitaltwin.org) is referenced.

**Discovery finder** is used to identify which services are available to search for dedicated characteristics of a digital twin (e.g. Serialnumber discovery, Product type discovery,...)

**Discovery service** maintains a catalog of all entries that can be looked up and may be operated by any operating company. All twins that want to be able to be found within that search have to register/be registered in the corresponding service with its logical ID (and a reference to the Digital Twin registry).

**Digital Twin registry** is used to lookup the logical ID of the desired Twin and stores the endpoint address to access the Server that stores the Digital Twin Data - the AAS-Server.

**AAS-Server** is used to provide the API for the desired data - which are implemented as `Submodels` or also called "Digital twin aspects", that can either implement a dedicated persistence and gather copies of information in the desired quality or by access the corresponding business systems directly. These Submodels are semantically described (structure and meaning) by semantic models which are centrally managed in the

**Semantic Hub** which stores all semantic models that may be described in a Semantic Aspect Meta Model (SAMM) compliant format to be able to inform about requirements for an API providing that kind of data or validate information that is transferred via AAS-API.

## What else is needed

The **Managed Identity Wallet (MIW)** provides a service where you can store your Verifiable Credentials (VC) for any Catena-X services in a safe place. This is only an intermediate step before self hosted wallets are supported and organizations have the choice to either use a managed service or store their VCs in their own wallets.

**Keycloak** is used to manage access to central components, e.g. the MIW and some of the discovery services with typical OAuth Client Credentials flow.

## The different components

![cx_architecture](@site/static/img/architecture.drawio.svg)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
