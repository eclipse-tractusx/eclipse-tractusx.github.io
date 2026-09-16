---
id: external-interfaces
title: External Interfaces
description: What systems a DCM-App should interface with.
---

## Overview

![functional-view](./resources/functional-view.svg)

## List of Potential External Interfaces

The main business function of a DCM application is to facilitate the exchange of demand and capacity information. In order to do this this a DCM must directly or indirectly interface with an EDC, systems holding base data relating to materials and companies as well as systems holding data relating to production planning.

| #  | Interface                      | Data                                                                                                     | Function                                                                                                 | Comment                                                                                      |
| -- | --                             | --                                                                                                       | --                                                                                                       | --                                                                                           |
| 1  | Business Partner Database      | Name, Address, City, Postal Code, BPNL, BPNS, BPNA, ...                                                  | Provide a connect between the technical BPN* and human readable data.                                    | Combines supplier and customer database                                                      |
| 2  | Supplier Database              | Name, Address, City, Postal Code, BPNL, BPNS, BPNA, ...                                                  | Provide a connect between the technical BPN* and human readable data.                                    | Overlaps with business partner database                                                      |
| 3  | Customer Database              | Name, Address, City, Postal Code, BPNL, BPNS, BPNA, ...                                                  | Provide a connect between the technical BPN* and human readable data.                                    | Overlaps with business partner database                                                      |
| 4  | EDC data plane                 | Payloads (WeekBasedMaterialDemand, WeekBasedCapacityGroup, IdBasedREquestForUpdate, IdBasedComment, ...) | Gateway for exchanging data with the dataspace                                                           | Needs to be connected the API endpoints in order to receive payloads                         |
| 5  | EDC control plane              | Assets, Policies, Contract Definitions                                                                   | Offer API endpoints as Assets, Negotiate data exchange contracts,                                        | Required for data exchange within the Catena-X dataspace                                     |
| 6  | EDC Discovery Service          | Connector Endpoint                                                                                       | Resolves BPNL into connector endpoints                                                                   | Interface could be integrated into the supplier, customer or business partner database       |
| 7  | Product Data Management System | Material Number, Material Description, Bill of Material,                                                 | Provides the DCM with data relating to materials, their structure and their demands / capacities         | Overlaps with production planning system                                                     |
| 8  | Production Planning  System    | Unit of Measure, Material Number, Material Description, Capacity, Demand, ...                            | Provides the DCM with data relating to materials, their structure and their demands / capacities         | Overlaps with product data management system                                                 |
| 9  | Wallet                         | Membership-Credential, Data Exchange Governance Credential, BPNL Credential, ...                         | Identify available credentials                                                                           | EDC should interface with the wallet. For the DCM-App itself it is more or less just a bonus |
| 10 | Golden Record Service          | BPNL, BPNS, BPNA and other Business Partner Base Data                                                    | Resolve your own Business Partner Base Data into BPNL, BPNS and BPNA used within the Catena-X Dataspace. | Interface could be integrated into the supplier, customer or business partner database       |
| 11 | IAM Service              | User-ID, Roles, Name, ...                                                                                | Authenticate Users                                                                                       |                                                                                              |

### EDC

[Connector KIT](../../../connector-kit/adoption-view)

### Wallet

[Managed Identity Wallet](https://github.com/eclipse-tractusx/managed-identity-wallet)

### Golden Record Service

[Business Partner KIT](../../../business-partner-kit/adoption-view)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
