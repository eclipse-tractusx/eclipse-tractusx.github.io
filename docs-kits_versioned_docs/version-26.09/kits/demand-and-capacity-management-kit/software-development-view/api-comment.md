---
id: api-IdBasedComment
title: API - IdBasedComment
description: API - IdBasedComment
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## IdBasedComment API

The IdBasedComment API is owned and registered as an EDC asset by both customer and supplier. The corresponding business partner (supplier and customer) provides comment data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer|X|X|
|Supplier|X|X|

### Data Exchanges

```mermaid
sequenceDiagram
    actor c as Customer 
    participant ca as Comment API
    participant ce as Customer EDC
    participant se as Supplier EDC
    participant sa as Comment API
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
autonumber 1
    rect rgb(04,107,153)
    c->>+ce: Provide IdBasedComment
    rect rgb(33,157,212)
    ce->>+se: Initiate Handshake
    se->>ce: Complete Handshake
    end
    ce->>se: Provide IdBasedComment
    se->>+sa: Provide IdBasedComment
    sa->>-se: IdBasedComment consumed
    se->>-ce: IdBasedComment consumed
    ce->>-c: IdBasedComment consumed
    
    end

    rect rgb(04,107,153)
    s->>+se: Provide IdBasedComment
    rect rgb(33,157,212)
    se->>+ce: Initiate Handshake
    ce->>se: Complete Handshake
    end
    se->>ce: Provide IdBasedComment
    ce->>+ca: Provide IdBasedComment
    ca->>-ce: IdBasedComment consumed
    ce->>-se: IdBasedComment consumed
    se->>-s: IdBasedComment consumed
    
    end
  
```

Figure: *Exchanging IdBasedComment via API*

### Open API documentation

|API|Link|
|-|-|
|IdBasedComment|[Find here](https://eclipse-tractusx.github.io/api-hub/eclipse-tractusx.github.io/kit-dcm-IdBasedComment-openAPI-1.0.0/swagger-ui/)|

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
