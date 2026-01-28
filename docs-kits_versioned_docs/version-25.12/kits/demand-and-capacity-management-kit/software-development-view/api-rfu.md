---
id: api-IdBasedRequestForUpdate
title: API - IdBasedRequestForUpdate
description: API - IdBasedRequestForUpdate
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## IdBasedRequestForUpdate API

The RequestForUpdate API is owned and registered as an EDC asset by both customer and supplier. The corresponding business partner (supplier and customer) provides request for update data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer|X|X|
|Supplier|X|X|

### Data Exchange

```mermaid
sequenceDiagram
    actor c as Customer 
    participant ca as Request for Update API
    participant ce as Customer EDC
    participant se as Supplier EDC
    participant sa as Request for Update API
    actor s as Supplier
     rect rgb(217,24,24)
        autonumber 1
        c->>+ce: Register API as Asset
        ce->>-c: API registered
    end  
    rect rgb(217,24,24)
        autonumber 1
        s->>+se: Register API as Asset
        se->>-s: API registered
    end
     rect rgb(04,107,153)
        autonumber 1
        c->>+ce: Provide IdBasedRequestForUpdate
        rect rgb(33,157,212)
            ce->>+se: Initiate Handshake
            se->>ce: Complete Handshake
        end
        ce->>se: Provide IdBasedRequestForUpdate
        se->>+sa: Provide IdBasedRequestForUpdate
        sa->>-se: IdBasedRequestForUpdate consumed
        se->>-ce: IdBasedRequestForUpdate consumed
        ce->>-c: IdBasedRequestForUpdate consumed
    end
    rect rgb(04,107,153)
        s->>+se: Provide IdBasedRequestForUpdate
        rect rgb(33,157,212)
        se->>+ce: Initiate Handshake
        ce->>se: Complete Handshake
        end
    se->>ce: Provide IdBasedRequestForUpdate
    ce->>+ca: Provide IdBasedRequestForUpdate
    ca->>-ce: IdBasedRequestForUpdate consumed
    ce->>-se: IdBasedRequestForUpdate consumed
    se->>-s: IdBasedRequestForUpdate consumed
    end
  
```

Figure: *Exchanging IdBasedRequestForUpdate via API*

### Open API documentation

|API|Link|
|-|-|
|IdBasedRequestForUpdate|[Find here](https://eclipse-tractusx.github.io/api-hub/eclipse-tractusx.github.io/kit-dcm-IdBasedRequestForUpdate-openAPI-3.0.0/swagger-ui/)|

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
