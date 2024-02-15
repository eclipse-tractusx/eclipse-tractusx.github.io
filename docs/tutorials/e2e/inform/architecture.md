---
title: Understand the overarching architecture
sidebar_position: 2
---

This section contains more information than is currently implemented in the MXD. However, it is intended to provide a general overview of the Catena-X architecture. However, not all components are listed here.

## The journey starts

The first thing you need is a BPN (Business Partner Number) because this is used within the network to identify yourself against other participants. This tells the network in a trusted manner who you are.

:::info

Even if the BPN is already configured and used in the MXD setup, its just a dummy. In the real world you will receive your BPN via the onboarding / regirstraion process [onboarding process](https://catena-x.net/en/catena-x-introduce-implement/onboarding).

:::

The BPN is also used to restrict the access and usage of your provided data assets. This is done via policies. Some example policies are also part of this tutorial.

A data asset is the metadata for the data that is intended to be provided or consumed. This data asset is the element in the ecosystem for which policies are defined to build a contract offer which can be agreed and consumed by a consumer.

One of the key components of the Catena-X architecture is the [Eclipse Data Space Connector](https://github.com/eclipse-tractusx/tractusx-edc) (EDC) as one implementation of the [Dataspace Protocol](https://docs.internationaldataspaces.org/dataspace-protocol/). This component is used to exchange data between participants. This includes:

- Publish data offers and to discover data offers from other participants.
- Negotiate data offers and come to an agreement on how to data is allowed to be used (Usage Policies)
- Transfer data based on a previously negotiated agreement.

With the EDC you are always in control of your data.

:::note

Control of your data means on the one hand, that you can decide who can access your data and who can not. On the other hand you can decide under which constraints the data may be used by the data consumer after providing access. This is achieved via policies and sovereign deployment of data provisioning (in Catena-X you have the opportunity to freely decide where and by whom the data is stored and offered). This is called **data sovereignty**.

:::

In our setup we already configured two EDCs. **Alice** and **Bob** and also the related databases (to persist the assets, policies aso.) are ready to use.

:::info

Registering an EDC is part of the onboarding process and is done in the portal. In our setup the EDCs are already registered and technical users are already created in the Keycloak instance.

:::

The minimal Setup for data exchange is in place. Now you are able to provide and exchange data.

## What language does Catena-X speak? / Asset Administration Shell with Aspect Models define the language in Catena-X

Since Catena-X is more than just a data exchange the next level of key to success is to exchange data in a structured and defined way. This helps to speak the same language to leverage business value of data.

This is realized with [Asset Administration Shell](https://eclipse-tractusx.github.io) (Digital Twins) and Aspect models. The AAS is the vehicle to transport the semantic, which is modeled in Aspect Models.

With that you are able to speak Catena-X.

When it comes to data exchange, it as an utmost concern to be able to find the desired data on the one hand and to understand the structure and meaning of the data on the other hand.
Finding and understanding data is a typical challenge, if you want to provide or consume data to or from an audience you are not in direct contact in advance.

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
