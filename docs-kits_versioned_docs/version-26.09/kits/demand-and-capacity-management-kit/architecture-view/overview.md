---
id: overview
title: Architecture View
description: The view from above
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## Why​

This page is relevant for you, if one of the following cases applies:

1. You want to participate in the demand and capacity usecase as either a customer or a supplier and intend to adapt your existing custom application landscape to Catena-X DCM.
2. You want to offer business solutions to the aforementioned customers and suppliers by adapting your commercial software product for Catena-X DCM.

If none of this applies to you or you are unsure, please refer to [Operation View](../operation-view.md) first.

> Note: If you purchase commercial software from a software vendor, the vendor needs to adopt their software for you. Please refer your vendor to this page.

## Prerequisites

In order to participate in the Catena-X network an Eclipse Dataspace Connector (EDC), or a similar connector fulfilling the Dataspace Protocol, is required, as the endpoints must not be called directly but only through a Data Asset/Contract Offer.

In addition use case participants need to be boarded onto the Catena-X network.

Participants intending to act as a customer require at least one BPNL for their company as well as one BPNS for every site they intend to integrate into the Catena-X network.

Participants intending to act as a supplier require at least one BPNL for their company.

## How

If you want to adapt your custom or commercial applications to work with the Catena-X DCM usecase you will have to

1. Modify the source code of your application
2. Enable your software to offer multiple REST API endpoints in order to receive data
3. Enable your software to call multiple REST API endpoints in order to send data
4. Enable your software to communicate through an Eclipse Dataspace Connector (EDC), or a similar solution, which is to be setup separately

For details, please refer to the Catena-X DCM standard [CX-0128][StandardLibrary]. This page provides a non-normative overview only.

## Solution Overview

For the exchange of the demand and capacity information required by the process, five REST APIs are used:

- WeekBasedMaterialDemand API - used for the exchange of demand information
- WeekBasedCapacityGroup API - used for the exchange of capacity information
- RequestForUpdate API - used for requesting an update of WeekBasedMaterialDemand or WeekBasedCapacityGroup
- IdBasedComment API - used for the exchange of additional comments regarding WeekBasedMaterialDemand or WeekBasedCapacityGroup
- Asset Administration Shell (AAS) API - used when using DCM in combination with a Digital Twin Registry

All those APIs are REST-based APIs.

Implementing all endpoints is mandatory, except the AAS API endpoint, which is optional.

Note that the software solutions used as well as the business process should be enabled in order to receive WeekBasedMaterialDemand information from customers and send WeekBasedCapacityGroup information back to those customers. Also, it needs to be possible to send the own WeekBasedMaterialDemand information to the suppliers and receive their WeekBasedCapacityGroup information in return. Therefore, the software tools used need to be able to send/receive these information and the users need to be able to work with the information in the planning processes.

When implementing the API endpoints, it is important to follow the DCM standard closely in order to ensure compatibility with other solutions. This is not limited to technical aspects, but also extends to the business definition of demand and capacity.

### Architecture Constraints

| Constraint ID | Constraint |
| ------------- | ------------- |
| C-1 | Software and third party software must be compliant to the Catena-X and Eclipse Foundation Guidelines/Policies [eclipse_foundation](https://www.eclipse.org/projects/dev_process/) |
| C-2 | [Eclipse Dataspace Connector](https://github.com/eclipse-tractusx/tractusx-edc/tree/main) (EDC), or a similar solution, must be used for data transfer between different legal entities; e.g. the API endpoints listed above may only be called through a Data Asset/Contract Offer |

## Sequence Diagram

The overall interaction between partners is illustrated by the following sequence diagram:

```mermaid
sequenceDiagram
    box rgb(97,97,97) Customer
    actor Customer
    participant CustomerApp as Customer App
    participant CustomerConnector as Customer connector
    end
    box rgb(97,97,97) Core Services
    participant CoreBpnlDiscovery as Core BPNL Discovery
    participant CoreEdcDiscovery as Core EDC discovery
    end
    box rgb(97,97,97) Supplier
    participant SupplierConnector as Supplier connector
    participant SupplierApp as Supplier App
    actor Supplier
    end
    rect rgb(221,130,0)
        note right of Customer: Customer creates MaterialDemand locally
        Customer ->> CustomerApp: Create MaterialDemand
        activate CustomerApp
        CustomerApp -->> Customer: MaterialDemand created
        deactivate CustomerApp
        Customer ->> CustomerApp: Finalize MaterialDemand
    end
    rect rgb(4,107,153)
        note right of CustomerApp: Customer App finds endpoint of Supplier
        activate CustomerApp
        CustomerApp ->> CoreBpnlDiscovery: Resolve Supplier Base Data into BPNL
        activate CoreBpnlDiscovery
        CoreBpnlDiscovery -->> CustomerApp: Supplier BPNL
        deactivate CoreBpnlDiscovery
        CustomerApp ->> CoreEdcDiscovery: Resolve Supplier BPNL into connector URL catalogue
        activate CoreEdcDiscovery
        CoreEdcDiscovery -->> CustomerApp: Connector URL catalogue
        deactivate CoreEdcDiscovery
        CustomerApp ->> CustomerApp: Find correct connector via URL catalogue inspection
    activate CustomerConnector
        CustomerConnector ->> SupplierConnector: Resolve connector Endpoint and connector service catalogue into MaterialDemand API URL
        activate SupplierConnector
        SupplierConnector ->> CustomerConnector: Framework and Contract Negotiation
        CustomerConnector -->> SupplierConnector: Framework and Contract Negotiation
        SupplierConnector -->> CustomerConnector: MaterialDemand API URL
    end
    rect rgb(221,130,0)
        note right of Customer: Exchange Material Demand
        CustomerApp ->> CustomerConnector: Transfer MaterialDemand
        CustomerConnector ->> SupplierConnector: Transfer MaterialDemand
        SupplierConnector ->> SupplierApp: Transfer MaterialDemand
        activate SupplierApp
        SupplierApp ->> Supplier: Transfer MaterialDemand
        Supplier -->> SupplierApp: MaterialDemand received
        SupplierApp -->> SupplierConnector: MaterialDemand received
        deactivate SupplierApp
        SupplierConnector -->> CustomerConnector: MaterialDemand received
        deactivate SupplierConnector
        CustomerConnector -->> CustomerApp: MaterialDemand received
        deactivate CustomerConnector
        CustomerApp -->> Customer: MaterialDemand finalized and synchronized
        deactivate CustomerApp
    end
    rect rgb(128,149,0)
    note left of Supplier: Supplier creates CapacityGroup locally
        Supplier ->> SupplierApp: Create CapacityGroup
        activate SupplierApp
        SupplierApp -->> Supplier: CapacityGroup created
        deactivate SupplierApp
        Supplier ->> SupplierApp: Link Demands to CapacityGroup
        activate SupplierApp
        SupplierApp -->> Supplier: Demands Linked
        deactivate SupplierApp
        Supplier ->> SupplierApp: Finalize CapacityGroup
    end
    rect rgb(4,107,153)
        note left of SupplierApp: Supplier App finds endpoint of Customer
        activate SupplierApp
        SupplierApp ->> CoreBpnlDiscovery: Resolve Customer Base Data into BPNL
        activate CoreBpnlDiscovery
        CoreBpnlDiscovery -->> SupplierApp: Customer BPNL
        deactivate CoreBpnlDiscovery
        SupplierApp ->> CoreEdcDiscovery: Resolve Customer BPNL into connector URL catalogue
        activate CoreEdcDiscovery
        CoreEdcDiscovery -->> SupplierApp: connector URL catalogue
        deactivate CoreEdcDiscovery
        SupplierApp ->> SupplierApp: Find correct connector via URL catalogue inspection
        SupplierApp ->> SupplierConnector: Transfer CapacityGroup
        activate SupplierConnector
        SupplierConnector ->> CustomerConnector: Resolve connector Endpoint and connector service catalogue into CapacityGroup API URL
        activate CustomerConnector
        CustomerConnector ->> SupplierConnector: Framework and Contract Negotiation
        SupplierConnector -->> CustomerConnector: Framework and Contract Negotiation
        CustomerConnector -->> SupplierConnector: CapacityGroup API Endpoint
    end 
    rect rgb(128,149,0)
        note left of Supplier: Exchange Capacity Group
        SupplierConnector ->> CustomerConnector: Transfer CapacityGroup
        CustomerConnector ->> CustomerApp: Transfer CapacityGroup
        activate CustomerApp
        CustomerApp ->> Customer: Transfer CapacityGroup
        Customer -->> CustomerApp: CapacityGroup received
        CustomerApp -->> CustomerConnector: CapacityGroup received
        deactivate CustomerApp
        CustomerConnector -->> SupplierConnector: CapacityGroup received
        deactivate CustomerConnector
        SupplierConnector -->> SupplierApp: CapacityGroup received
        deactivate SupplierConnector
        SupplierApp -->> Supplier: CapacityGroup finalized and synchronized
        deactivate SupplierApp
    end
```

Figure: *Core business process*

Note that the supplier does not need to immediately reply with capacity group after receiving demand information, although a timely reply is appreciated, there can be a considerable time in between instead.

Digital Twins can also be used to reference parts, but are not shown in the sequence diagram for simplicity.

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
