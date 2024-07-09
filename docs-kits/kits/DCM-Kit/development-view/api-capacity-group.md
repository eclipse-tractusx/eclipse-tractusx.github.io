---
id: api-WeekBasedCapacityGroup
title: API - WeekBasedCapacityGroup
description: API - WeekBasedCapacityGroup
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## WeekBasedCapacityGroup API

The WeekBasedCapacityGroup API is owned and registered as an EDC asset by the supplier. The customer provides capacity group data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer||X|
|Supplier|X||

### Data Exchange

```mermaid
sequenceDiagram
    actor c as Customer 
    participant ce as Customer EDC
    participant se as Supplier EDC
    participant a as WeekBasedCapacityGroup API
    actor s as Supplier
    
    rect rgb(217,24,24)
    s->>+se: Register API as Asset
    se->>-s: API registered
    end
    rect rgb(128,149,00)
    c->>+ce: Provide WeekBasedCapacityGroup
    rect rgb(179,203,45)
    ce->>+se: Initiate Handshake
    se->>ce: Complete Handshake
    end
    ce->>se: Provide WeekBasedCapacityGroup
    se->>+a: Provide WeekBasedCapacityGroup
    a->>-se: WeekBasedCapacityGroup consumed
    se->>-ce: WeekBasedCapacityGroup consumed
    ce->>-c: WeekBasedCapacityGroup consumed
    
    end
  
```

### Open API documentation

|API|Link|
|-|-|
|WeekBasedCapacityGroup|[Find here](./plugin-generated-capacity-group-api/post-week-based-capacity-group.api.mdx)|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange

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
