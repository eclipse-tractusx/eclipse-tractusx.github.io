---
title: Understand the overarching architecture
sidebar_position: 2
---

If you are interested more in buying services, please get in contact with a operating company.

:::info

One of the first operating companies is [Cofinity-X](https://cofinity-x.com/).

:::

This section contains more information than is currently implemented in the MXD. However, it is intended to provide a general overview of the Catena-X architecture. However, not all components are listed here.

## The journey starts

The first thing you need is a BPN (Business Partner Number) because this is used within the network to identify yourself against other participants. This tells the network in a trusted manner who you are.

:::info

Even if the BPN is already configured and used in the MXD setup, its just a dummy. In the real world you will receive your BPN via the self description phase within your account in the portal. // ToDo Link to the onboarding guide

:::

The BPN is also used to restrict the access and usage of your provided assets. This is done via policies. Some example policies are also part of this tutorial

One of the key components of the Catena-X architecture is the [Eclipse Data Space Connector](https://github.com/eclipse-tractusx/tractusx-edc) (EDC). This component is used to exchange data between participants. The EDC is also used to register data offers and to discover data offers from other participants. With the EDC you are always in control of your data.

:::note

Control of your data means, that you can decide who can access your data and who can not. This is done via policies. And is called **data sovereignty**.

:::

In our setup we already configured two EDCs. **Alice** and **Bob** and also the related databases (to persist the assets, policies aso.) are ready to use.

:::info

Registering an EDC is part of the onboarding process and is done in the portal. In our setup the EDCs are already registered and technical users are already created in the KeyCloak instance.

:::

Now the minimal Setup for data exchange is in place. Now you are able to provide and exchange data.

## What language does Catena-X speak? / Asset Administration Shell with Aspect Models define the language in Catena-X

:::danger

no idea what to write here. I think the goal for this page is to describe the different components and which one are already used in the MXD and which once are planned to be used in the future.

:::

Since Catena-X is more than just a data exchange the next level of ... is to exchange data in a structured and defined way. This helps to speak the same language, same syntax to enhance business value ... .
(Same language == greater value)
This is realized with [Asset Administration Shell](https://eclipse-tractusx.github.io) (Digital Twins) and Aspect models. The AAS is the vehicle to transport the semantic, which is modeled in Aspect Models.

With that you are able to speak Catena-X.

comments Felix: Ist das nicht eher BAMM? AAS beschäftigt sich ja mit dem strukturierten Auffinden und Zugreifen von Daten. Die "Sprache" von Catena-X wären dann die semantischen Modelle?

## What else is needed

:::danger

I think we want to describe the architecture a little bit more. Isn't there a predefined description?

:::

## The different components

![cx_architecture](@site/static/img/architecture.drawio.svg)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
