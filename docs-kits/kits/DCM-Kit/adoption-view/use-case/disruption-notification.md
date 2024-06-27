---
id: disruption-notification
title: Supply Chain Disruption Notification
description: Inform the supply chain about urgent issues, that connect be quantified yet.
sidebar_position: 7
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Business Roles and Functions

Supply chain disruption notifications  use their own aspect model and API. Supply chain disruption notifications are provided and consumed by both customer and supplier.

|Function / Role|Customer|Supplier|
|-|-|-|
|Inform business partner about disruption|X|X|
|Detail pre-existing disruption notification|X|X|
|Resolve disruption|X|X|

## Sequence Diagram

```mermaid
sequenceDiagram
Participant c as Customer / Supplier
Participant s as Supplier / Customer
rect rgb(4,107,153) 
c->>s: One of my production plants is negatively impacted by a strike
c-->>s: This affects the demand of the following materials: {Toy 1, Toy2, Toy3}
end
rect rgb(4,107,153) 
c->>s: The disruption (strike) has ended
end
```

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library
