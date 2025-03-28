---
id: api-WeekBasedMaterialDemand
title: API - WeekBasedMaterialDemand
description: API - WeekBasedMaterialDemand
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.drawio.svg)

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
    rect rgb(128,149,00)
        c->>+ce: Provide WeekBasedMaterialDemand
        rect rgb(179,203,45)
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
|WeekBasedMaterialDemand|N/A|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 BASF SE
