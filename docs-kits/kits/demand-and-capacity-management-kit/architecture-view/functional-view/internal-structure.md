---
id: internal-structure
title: Internal Structure
description: What the internal structure of a DCM-App should be.
---

Depending on the exact business requirements, market approach etc. there are a lot of different ways to structure a DCM application.

The following lists of questions should help you to make an informed decision:

- Am I implementing the both business roles?
- Am I implementing only the business role customer?
- Am I implementing only the business role supplier?
- Do I have natural users that require both business roles?
- Do I want my users to explicitly switch between business roles?

- Do I have a common business partner data management?
- Or is it split between customer and supplier base data?

Assuming a standard three tier application:

### Presentation tier or user interface

| #  | GUI Module/Component                    | Sub-Component     | Function                                                                                                                                                                                               | Remark                                                                                                                                                                                           |
| -- | --                                      | --                | --                                                                                                                                                                                                     | --                                                                                                                                                                                               |
| 1  | Material Demand View                    | Overview / Search | Allows users to find, access, edit and create material demands they are responsible for. Show users which material demands are linked and which are not linked yet.                                    | Creating and editing material demands might not be necessary, depending on the depth of integration.                                                                                             |
| 2  | Material Demand View                    | Single item View  | View table, graph and timeline of and interact with a single material demand.                                                                                                                          |                                                                                                                                                                                                  |
| 3  | Material Demand View - Single item View | Table             | Access and edit demand values for an individual time series.                                                                                                                                           | Demands do not need to match `WeekBasedMaterialDemand` and the demand series one to one. Instead they could be grouped as such: `MaterialNumberCustomer` - `CustomerLocation` - `DemandCategory` |
| 4  | Material Demand View - Single item View | Graph             | Visualize demand values.                                                                                                                                                                               | Since demands are always added together to present a total demand per week, it is recommended to visualize them as bars and capacities as lines.                                                 |
| 5  | Material Demand View - Single item View | Timeline          | Interactive object, that shows weeks with their relative demand values and allows users to easily set the start-week and end-week of the data they wish to see in the graph and table.                 |                                                                                                                                                                                                  |
|    |                                         |                   |                                                                                                                                                                                                        |                                                                                                                                                                                                  |
| 6  | Capacity Group View                     | Overview / Search | Allows users to find and access capacity groups. Allow suppliers to create and edit capacity groups. Allows suppliers to link capacity groups to material demands.                                     | Creating and editing material demands might not be necessary, depending on the depth of integration.                                                                                             |
| 7  | Capacity Group View                     | Single item View  | View table, graph and timeline of and interact with a single capacity group.                                                                                                                           |                                                                                                                                                                                                  |
| 8  | Capacity Group View - Single item View  | Table             | Show data for a capacity group, as well as all linked capacity groups and material demands. Also show data calculated from `WeekBasedCapacityGroup` and `WeekBasedMaterialDemand` data.                | Hierarchical grouping highly recommended.                                                                                                                                                        |
| 9  | Capacity Group View - Single item View  | Graph             | Visualize demand and capacity values as well as calculated data.                                                                                                                                       | Since there are multiple relevant capacities per week, it is recommended to visualize them as lines and demands as bars.                                                                         |
| 10 | Capacity Group View - Single item View  | Timeline          | Interactive object, that shows weeks with their relative demand and/or capacity values and allows users to easily set the start-week and end-week of the data they wish to see in the graph and table. |                                                                                                                                                                                                  |
|    |                                         |                   |                                                                                                                                                                                                        |                                                                                                                                                                                                  |
| 3  | Inbox                                   | | | |
| 4  | Business Partner Base Data              |
| 5  | Admin Interface                         |

### Application tier or business logic

The business logic implements the functional capabilities of the application. In our case this mainly means three things:

- Consume data from and provide data to interfacing systems.
- Execute orders issued by the users via the user interface.
- Calculate results from data and provide those results to the user interface.

It would be sensible to split the business logic into the following components:

- One orchestrator per technical interface type
- One component per interface
- One component for every aspect model to handle
- One component to combine aspect models into capacity groups


### Data tier or data storage

Since all business relevant data within DCM is exchanges as serialized JSONs one of the main concerns should be  how to store and process JSON data efficiently and audit proof.
Storing the actually exchanged JSONs and only reading them session-based on the fly makes audit proof storage easier.

As a rule of thumb:

- Data exchanged between companies through the EDC should be stored as ready-only.
  - Applying load factors, delta-production etc. to a demand series must not change the corresponding `WeekBasedMaterialDemand`
- Other data can be stored in order to provide functionality to the user, manage roles and rights, etc.

| #  | Data to store                              | Storage requirement | Remark                                                                                                                                                                                           |
| -- | --                                         | --                  | --                                                                                                                                                                                               |
| 1  | Serialized `WeekBasedMaterialDemand`       | Mandatory           | Both provided and consumed data must be stored, in the most recent version                                                                                                                       |
| 2  | Serialized `WeekBasedCapacityGroup`        | Mandatory           | Both provided and consumed data must be stored , in the most recent version                                                                                                                      |
| 3  | Serialized `IdBasedComment`                | Mandatory           | Please note that a `RequestDeletion` functionality exists and must be adhered to, superseding the storage requirement.                                                                           |
| 4  | Serialized `IdBasedRequestForUpdate`       | Optional            | It can make sense to store RfU for debugging or even auditing purposes. But since it does not contain any data with business relevance there is no hard storage requirement.                     |
| 6  | Serialized `DemandAndCapacityNotification` | Mandatory           | After a disruption has been resolved, the deleted notifications can be safely deleted, superseding the storage requirement.                                                                      |
|    |                                            |                     |                                                                                                                                                                                                  |
| 7  | Non shared MaterialDemand                  | Optional            | If you want to give users the option to manually make changes to certain data it is good practice to let them save their `work in progress` without having to share the serialized aspect model. |
| 8  | Non shared CapacityGroup                   | Optional            | If you want to give users the option to manually make changes to certain data it is good practice to let them save their `work in progress` without having to share the serialized aspect model. |
| 9  | Non shared Comment                         | Optional            | If you want to give users the option to manually make changes to certain data it is good practice to let them save their `work in progress` without having to share the serialized aspect model. |
|    |                                            |                     |                                                                                                                                                                                                  |
| 9  | User settings                              | Recommended         | Customizable UI settings, Favorites, User Roles, Company the User belongs to, ...                                                                                                                |
| 10 | Company settings                           | Recommended         | Connector-Address, BPNL, Assets, Policies, Contract Definitions ...                                                                                                                              |
| 11 | Application settings                       | Recommended         |                                                                                                                                                                                                  |

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange