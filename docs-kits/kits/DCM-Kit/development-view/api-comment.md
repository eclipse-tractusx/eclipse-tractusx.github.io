---
id: api-IdBasedComment
title: API - IdBasedComment
description: API - IdBasedComment
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

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
    c->>+ce: Register API as Asset
    ce->>-c: API registered
    end  
    rect rgb(217,24,24)
    s->>+se: Register API as Asset
    se->>-s: API registered
    end
 


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

### Open API documentation

|API|Link|
|-|-|
|IdBasedComment|<https://fill.me>|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library