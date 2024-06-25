---
id: api-WeekBasedMaterialDemand
title: API - WeekBasedMaterialDemand
description: API - WeekBasedMaterialDemand
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## WeekBasedMaterialDemand API

The WeekBasedMaterialDemand API is owned and registered as an EDC asset by the customer. The supplier provides material demand data to the API via POST request.

### Roles and Functions

|Role / Function|API Owner|POST to API|
|-|-|-|
|Customer|X||
|Supplier||X|

### Data Exchange

```mermaid
sequenceDiagram
    actor c as Customer 
    participant a as WeekBasedMaterialDemand API
    participant ce as Customer EDC
    participant se as Supplier EDC
    actor s as Supplier
    
    rect rgb(217,24,24)
    c->>+ce: Register API as Asset
    ce->>-c: API registered
    end
    rect rgb(221,130,0)
    s->>+se: Provide WeekBasedMaterialDemand
    rect rgb(255,166,0)
    se->>+ce: Initiate Handshake
    ce->>se: Complete Handshake
    end
    se->>ce: Provide WeekBasedMaterialDemand
    ce->>+a: Provide WeekBasedMaterialDemand
    a->>-ce: WeekbasedMaterialDemand consumed
    ce->>-se: WeekbasedMaterialDemand consumed
    se->>-s: WeekbasedMaterialDemand consumed
    
    end
```

### Open API documentation

|API|Link|
|-|-|
|WeekBasedMaterialDemand|<https://fill.me>|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library
