---
id: model-IdBasedComment
title: Aspect Model - IdBasedComment
description: Aspect Model - IdBasedComment
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## Aspect Model "IdBasedComment"

Customer and suppliers provide each other `IdBasedComment` aspect models in order to exchange additional information on `WeekBasedCapacityGroup` and `WeekBasedMaterialDemand`.

### Roles and Rights

|Role / Right|Create|Change|Read|
|-|-|-|-|
|Customer|X|X|X|
|Supplier|X|X|X|

### Structure of a IdBasedComment

```mermaid
block-beta
columns 6
A("IdBasedComment"):6
B1("listOfReferenceDates"):1
B2("commentType"):1
B3("commentText"):1
B4("requestDelete"):1
B5("objectId"):1
B6("objectType"):1

classDef Comment_must fill:#219dd4,stroke:#FFFFFF,color:#000000
classDef Comment_optional fill:#046b99,stroke:#FFFFFF,color:#F4F2F3
class A,B5,B6 Comment_must
class B1,B2,B3,B4 Comment_optional
```

```mermaid
block-beta
A["Comment data (mandatory)"] style A fill:#219dd4,color:#000000
B["Comment data (optional)"] style B fill:#046b99,color:#F4F2F3
```

Figure: *IdBasedComment structure*

### Example data

```json
{
  "postedAt" : "2023-03-10T12:27:11.320Z",
  "listOfReferenceDates" : [ "2023-11-05" ],
  "author" : "someone@company.com",
  "supplier" : "{{CATENAX-SUPPLIER-BPNL}}",
  "commentType" : "information",
  "commentId" : "f5c151e4-30b5-4456-94fd-2a7b559b6121",
  "changedAt" : "2023-03-10T12:27:11.320Z",
  "commentText" : "Hello, this is a comment!",
  "requestDelete" : true,
  "objectId" : "dfeb1334-497e-4dab-97c1-4e6f4e1c0320",
  "objectType" : "urn:samm:io.catenax.week_based_capacity_group",
  "customer" : "{{CATENAX-CUSTOMER-BPNL}}"
}
```

All formats and serializations are derived from a RDF turtle file. It is the source for the Semantic Aspect Meta Model. You can access the RDF turtle file at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.id_based_comment/1.0.0/IdBasedComment.ttl
```

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
