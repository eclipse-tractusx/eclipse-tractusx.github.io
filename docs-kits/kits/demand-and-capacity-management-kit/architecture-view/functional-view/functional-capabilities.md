---
id: functional-capabilities
title: Functional Capabilities
description: What capabilities a DCM-App should offer.
---

## Overview

![functional-view](./resources/functional-view.svg)

## Role Customer

The customer
Automating the data entry and data sharing aspects of this role is achievable.

| #  | Capability                                | GUI Interactions                                                                                                                         | Aspect Model Interactions                                   | Base Data Interactions                                       | Automation Potential                                                                                                                                                                                                                                                                                     |
| -- | --                                        | --                                                                                                                                       | --                                                          | --                                                           | --                                                                                                                                                                                                                                                                                                       |
| 1  | Define Demands                            | Editing demand values using the `List Part` of the `View single Material Demand` view.                                                   | Write `WeekBasedMaterialDemand`                             | Read `Material Base Data`, Read `Business Partner Base Data` | Demands could be calculated from `planned production` data in combination with `bill of material` data.                                                                                                                                                                                                  |
| 2  | Share Demands                             | Single click from `List Part`                                                                                                            | Share `WeekBasedMaterialDemand`                             | N/A                                                          | Aspect models could be shared automatically, as soon as they are fully qualified.                                                                                                                                                                                                                        |
| 3  | Compare Demands and Capacities            | View `Graph` `List` and `Timeline` of `View single Material Demand`. Inspect weeks that are marked as `bottleneck`                       | Read `WeekBasedMaterialDemand` and `WeekBasedCapacityGroup` | N/A                                                          | Aside from color coding weeks, as defined by [CX-0128](https://catenax-ev.github.io/docs/standards/CX-0128-DemandandCapacityManagementDataExchange#571-matching-results-and-resolution), company specific business logic could be applied to aid in bottleneck detection, prevention and categorization. |
| 4  | Use comments                              | Aside from an inbox approach one could also mark all objects and weeks that have comments attached to them.                              | Write, Read and Share `IdBasedComments`                     | Read `Business Partner Base Data`                            | Because comments can related to specific capacity groups, demand, weeks or even other comments. Creating comments in a sensible way could aid the users greatly.                                                                                                                                         |
| 5  | Use supply chain disruption notifications |                                                                                                                                          | Write, Read and Share `DemandAndCapacityNotification`       | Read `Business Partner Base Data`                            | Because reacting to a Disruption Notification properly requires knowledge about Bill of Materials, Storage Levels, Logistic Chains etc. there potential for speeding up the process by providing these information to the user in a unified interface and then later on in automating the whole process  |
| 6  | Collaborate                               | Having contact information not only within the `Business Partner Base Data` but directly shown within the capacity group can be helpful. | N/A                                                         | Read `Business Partner Base Data`                            | Low                                                                                                                                                                                                                                                                                                      |

## Role Supplier

Automating the data entry and data sharing aspects of this role is partially achievable and much harder, compared to the customer.
In order to automate linking material demands to capacity group fully knowledge about ones own bill of material as well as partial knowledge of the bill of material of ones business partner is required.
Automating define capacities, Define Load Factors, Define Delta Production and Define Volatility Metrics requires an already well automated production planning.

| #  | Capability                                | GUI Interactions | Aspect Model Interactions                                   | Base Data Interactions                     | Automation Potential |
| -- | --                                        | --               | --                                                          | --                                         | --                   |
| 1  | Link Material Demands to Capacity Group   |                  | Write `WeekBasedCapacityGroup`                              | Read `Material Base Data`                  | If I knew my partners BOM and Material Base Data as well as my own, I could automate this.                     |
| 2  | Define Capacities                         |                  | Write `WeekBasedCapacityGroup`                              | Read `Material Base Data` and `Capacities` |                      |
| 3  | Define Load Factors                       |                  | Write `WeekBasedCapacityGroup`                              | Read `Material Base Data` and `Capacities` |                      |
| 4  | Define Delta Production                   |                  | Write `WeekBasedCapacityGroup`                              | Read `Material Base Data` and `Capacities` |                      |
| 5  | Define Volatility Metrics                 |                  | Write `WeekBasedCapacityGroup`                              | Read `Material Base Data`                  |                      |
| 6  | Share Capacity Groups                     |                  | Share `WeekBasedCapacityGroup`                              | N/A                                        |                      |
| 7  | Compare Demands and Capacities            |                  | Read `WeekBasedMaterialDemand` and `WeekBasedCapacityGroup` | N/A                                        |                      |
| 8  | Use comments                              |                  |                                                             |                                            |                      |
| 9  | Use supply chain disruption notifications |                  |                                                             |                                            |                      |
| 10 | Collaborate                               |                  |                                                             |                                            |                      |

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
