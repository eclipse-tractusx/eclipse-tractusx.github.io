---
id: api-IdBasedRequestForUpdate
title: API - IdBasedRequestForUpdate
description: API - IdBasedRequestForUpdate
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## RequestForUpdate API

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
    c->>+ce: Register API as Asset
    ce->>-c: API registered
    end  
    rect rgb(217,24,24)
    s->>+se: Register API as Asset
    se->>-s: API registered
    end
 


    rect rgb(04,107,153)
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

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library
