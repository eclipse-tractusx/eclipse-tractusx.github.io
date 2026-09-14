---
id: disruption-notification
title: Supply Chain Disruption Notification
description: Inform the supply chain about urgent issues, that connect be quantified yet.
sidebar_position: 7
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## Business Roles and Functions

Supply chain disruption notifications use their own aspect model and API. Supply chain disruption notifications are provided and consumed by both customer and supplier.

|Function / Role|Customer|Supplier|
|-|-|-|
|Inform business partner about disruption|X|X|
|Detail pre-existing disruption notification|X|X|
|Resolve disruption|X|X|

## Sequence Diagram

```mermaid
sequenceDiagram
autonumber
Participant c as Customer / Supplier
Participant s as Supplier / Customer
rect rgb(4,107,153) 
    c->>s: One of my production plants is negatively impacted by a strike
    autonumber off
    c-->>s: This affects the demand of the following materials: {Toy 1, Toy2, Toy3}
end
rect rgb(4,107,153) 
    autonumber 2
    c->>s: The disruption (strike) has ended
end
```

Figure: *Utilizing supply chain disruption notification*

For further details, please refer to [CX-0146 Supply Chain Disruption Notifications][StandardLibrary].

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 BASF SE
- SPDX-FileCopyrightText: 2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V (Fraunhofer)
- SPDX-FileCopyrightText: 2023 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2023 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 SupplyOn AG
- SPDX-FileCopyrightText: 2023 Volkswagen AG
- SPDX-FileCopyrightText: 2023 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0146-SupplyChainDisruptionNotifications
