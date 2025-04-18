---
id: demand-volatility
title: Demand Volatility Metrics
description: Create transparency regarding data volatility and strife for a solution
sidebar_position: 2
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Business Roles and Functions

Demand volatility data is embedded into the WeekBasedCapacityGroup aspect model. This means that only suppliers provide demand volatility related data and customers consume it.

|Function / Role|Customer|Supplier|
|-|-|-|
|Define parameters for calculating volatility||X|
|Calculate volatility||X|
|Inform business partner about parameters for calculating volatility||X|
|Inform business partner about calculated volatility||X|
|Acknowledge volatility calculation|X||
|Reproduce demand volatility calculation|X||

## Sequence Diagram

```mermaid
sequenceDiagram
Participant c as Customer
Participant s as Supplier
rect rgb(157,93,00) 
c->>s: I need 100 red toys in week 44
end
c->>c: Wait 1 week
rect rgb(157,93,00) 
c->>s: I need 1000 red toys in week 44
end
c->>c: Wait 1 week
rect rgb(157,93,00) 
c->>s: I need 10 red toys in week 44
end
s->>s: I should really start measuring the volatility of my customers demands
rect rgb(64,74,00)
s->>c: I will begin measuring demand volatility, using the following parameters:
s-->>c: Increase limited to 5%
s-->>c: Decrease limited to 100 units
s-->>c: Measurement starts in week 5, using subhorizons of length (4,8,16,32) 
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
