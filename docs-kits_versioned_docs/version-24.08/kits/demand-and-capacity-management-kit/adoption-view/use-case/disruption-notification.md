---
id: disruption-notification
title: Supply Chain Disruption Notification
description: Inform the supply chain about urgent issues, that connect be quantified yet.
sidebar_position: 7
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Business Roles and Functions

Supply chain disruption notifications  use their own aspect model and API. Supply chain disruption notifications are provided and consumed by both customer and supplier.

|Function / Role|Customer|Supplier|
|-|-|-|
|Inform business partner about disruption|X|X|
|Detail pre-existing disruption notification|X|X|
|Resolve disruption|X|X|

## Sequence Diagram

```mermaid
sequenceDiagram
Participant c as Customer / Supplier
Participant s as Supplier / Customer
rect rgb(4,107,153) 
c->>s: One of my production plants is negatively impacted by a strike
c-->>s: This affects the demand of the following materials: {Toy 1, Toy2, Toy3}
end
rect rgb(4,107,153) 
c->>s: The disruption (strike) has ended
end
```

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 Volkswagen AG
- SPDX-FileCopyrightText: 2023,2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023,2024 BASF SE
- SPDX-FileCopyrightText: 2023,2024 SupplyOn AG
- SPDX-FileCopyrightText: 2023,2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2023,2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V (Fraunhofer)
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange
