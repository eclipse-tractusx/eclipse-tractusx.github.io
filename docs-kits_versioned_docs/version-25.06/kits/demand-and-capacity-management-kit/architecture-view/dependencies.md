---
id: dependencies
title: Dependencies
description: Dependencies
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## Standard Dependencies

Designing an implementing an application that conforms to CX-0128 - DEMAND AND CAPACITY MANAGEMENT DATA EXCHANGE V.2.1.0, means not only conforming to CX-0128 but also to all standards that CX-0128 depends upon.

### Dependency Graph

In order to keep things orderly some restrictions to this graph apply:

- The first first mention of a standard is marked by using the standards name in addition to its ID (e.g. CX-0011 ISSUING AGENCY).
- Further mentions are denoted by using only the standards ID (e.g. CX-0011).
- To avoid visual loops, only the first mention of a standard is resolved further for standard dependencies.
- Catena-X standards can be identified by their ID (e.g. CX-0011).
- Non Catena-X standards are never resolved further.

```mermaid
mindmap
root((CX-0128 - DEMAND AND CAPACITY MANAGEMENT DATA EXCHANGE V.2.1.0))
    CX-0001 `v1.0.2` EDC Discovery API
        CX-0006 Registration and initial onboarding
            CX-0009 CATENA-X REGISTRATION API
            CX-0010
            CX-0011 ISSUING AGENCY
                CX-0010
                ISO/IEC 15459
            CX-0013 IDENTITY OF MEMBER COMPANIES
            CX-0049 DID Document Schema
            CX-0149    
        CX-0010
    CX-0002 `v2.2.0` Digital Twins in Catena-X
        CX-0003
        CX-0018
        CX-0001
        CX-0053 BPN Discovery Service APIs
            CX-0010
        CX-0044 ECLASS
            ECLASS Homepage
    CX-0003 `v1.1.0` SAMM Aspect Meta Model
        SAMM Semantic Aspect Meta Model
        CX-0002
        Catena-X Operating Model Whitepaper
    CX-0010 `v2.0.0` Business Partner Number
    CX-0018 `v3.0.0` Dataspace Connectivity
        IDSA Dataspace Protocol
        Identity And Trust Protocol
        CX-0050 Framework Agreement Credential
        CX-0149 Verfied Company Identity
            CX-0010
            CX-0011
            CX-0015 IAM & Access Control Paradigm
                INCITS 565-2020
            CX-0050
            Identity Trust
            Credential Presentation Protocol
        Tractus-X Profiles
    CX-0126 `v2.0.0` Industry Core: Part Type
        CX-0001 
        CX-0002 
        CX-0003 
        CX-0018
    CX-0146 `v1.0.0` Supply Chain Disruption Notifications
```

Figure: *Dependencies*

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
