---
id: api-WeekBasedMaterialDemand
title: API - WeekBasedMaterialDemand
description: API - WeekBasedMaterialDemand
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## WeekBasedMaterialDemand API

The WeekBasedMaterialDemand API is owned and registered as an EDC asset by the supplier. The customer provides material demand data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer||X|
|Supplier|X||

### Data Exchange

```mermaid
sequenceDiagram
autonumber
    actor c as Customer 
    participant ce as Customer EDC
    participant se as Supplier EDC
    participant a as WeekBasedMaterialDemand API
    actor s as Supplier
    
    rect rgb(217,24,24)
        s->>+se: Register API as Asset
        se->>-s: API registered
    end
autonumber 1
    rect rgb(221,130,00)
        c->>+ce: Provide WeekBasedMaterialDemand
        rect rgb(255,166,0)
        ce->>+se: Initiate Handshake
        se->>ce: Complete Handshake
        end
    ce->>se: Provide WeekBasedMaterialDemand
    se->>+a: Provide WeekBasedMaterialDemand
    a->>-se: WeekBasedMaterialDemand consumed
    se->>-ce: WeekBasedMaterialDemand consumed
    ce->>-c: WeekBasedMaterialDemand consumed
    
    end
```

Figure: *Exchanging WeekBasedMaterialDemand via API*

### Open API documentation

|API|Link|
|-|-|
|WeekBasedMaterialDemand|[Find here](https://eclipse-tractusx.github.io/api-hub/eclipse-tractusx.github.io/kit-dcm-WeekBasedMaterialDemand-openAPI-3.0.0/swagger-ui/)|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

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

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange
