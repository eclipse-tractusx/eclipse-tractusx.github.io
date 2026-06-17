---
id: api-WeekBasedCapacityGroup
title: API - WeekBasedCapacityGroup
description: API - WeekBasedCapacityGroup
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## WeekBasedCapacityGroup API

The WeekBasedCapacityGroup API is owned and registered as an EDC asset by the customer. The supplier provides capacity group data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer|X||
|Supplier||X|

### Data Exchange

```mermaid
sequenceDiagram
autonumber
    actor c as Customer 
    participant a as WeekBasedCapacityGroup API
    participant ce as Customer EDC
    participant se as Supplier EDC    
    actor s as Supplier
    
    rect rgb(217,24,24)
      c->>+ce: Register API as Asset
      ce->>-c: API registered
    end
autonumber 1
    rect rgb(128,149,00)
      s->>+se: Provide WeekBasedCapacityGroup
      rect rgb(179,203,45)
        se->>+ce: Initiate Handshake
        ce->>se: Complete Handshake
      end
      se->>ce: Provide WeekBasedCapacityGroup
      ce->>+a: Provide WeekBasedCapacityGroup
      a->>-ce: WeekBasedCapacityGroup consumed
      ce->>-se: WeekBasedCapacityGroup consumed
      se->>-s: WeekBasedCapacityGroup consumed
    
    end
```

Figure: *Exchanging WeekBasedCapacityGroup via API*

### Open API documentation

|API|Link|
|-|-|
|WeekBasedCapacityGroup|[Find here](https://eclipse-tractusx.github.io/api-hub/eclipse-tractusx.github.io/kit-dcm-WeekBasedCapacityGroup-openAPI-3.0.0/swagger-ui/)|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange

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
