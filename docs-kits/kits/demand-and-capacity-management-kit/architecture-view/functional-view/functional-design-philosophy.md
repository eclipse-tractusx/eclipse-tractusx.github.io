---
id: functional-design-philosophy
title: Functional Design Philosophy
description: What the design philosophy of a DCM-App should be.
---

## Overview

![functional-view](./resources/functional-view.svg)

## Paradigms

### Tailor the DCM application to the end-users

- OEMs are most likely only going act as the business role Customer
- Suppliers are most likely not going to look at demands that have already been linked to capacity groups
- After a capacity group has been fully linked to demands, only the total demand in a specific week is of interest at first
  - If a bottleneck has been detected in a week, only then the individual demands making up the total demand for that week will be of interest
- Try to show the users only the absolutely necessary data at first
  - but allow them to browse as deep into the data as they desire
- Make sure that the transition from overview to deep-dive is smooth and easily reversible

### Consider the current as well as the desired future grade of automation

- If you are already automatically ordering parts you should be capable of generating demand data automatically
  - Combined with BPDM and EDC discovery service you will be able to automatically provide your suppliers with `WeekBasedMaterialDemand`
- Linking `WeekBasedCapacityGroup` to `Demand Series` can be automated using `Traceability` and BOMs
- `RequestForUpdate` can be used to verify that the data your business partner provided you is recent

### Consider that we have a distributed data storage and also distributed responsibilities

- The customer requires capacity data from the supplier
- The supplier requires demand data from the customer
- The data the user is currently viewing might be already out of date
  - Because their business partner has already updated it
  - But the EDCs have not successfully transmitted it yet
  - Or you have not yet successfully ingested it yet
  - Or you might have ingested it, but the user session has not been refreshed yet
- Customer are not allowed to edit and share capacity data
  - But they could edit a copy locally for simulation purposes
- Supplier are not allowed to edit and share demand data
  - But they could edit a copy locally for simulation purposes
- Consider that there will be delay between the customer editing material demands and the supplier receiving them
- `RequestForUpdate` can help you to alleviate these issues

### Balance simplicity and data completeness

- Most of the time only an eagle-eye view of the data is required
  - But if a bottleneck gets detected, the users do want to deep dive
- Comments can be attached to capacity groups, material demands, comments and also specific weeks
  - A thread model where all comments appear, based on the capacity group that is currently viewed should be favorable
    - Even if the comment is only indirectly linked the the capacity group, i am currently viewing, via 3 layers of nesting I should still be able to see it
- Instead of showing the raw values for load factors etc. in an overview it might make sense to label weeks, where such features have been applied and than only show the raw values upon inspection of that week

### Consider that the standards you build the software upon might change

- Adhering to and even extending the `Single Responsibility Principle` might be a sensible thing to do
  - A responsibility is a **reason to change** and adhering to the principle means that a module or class should only have one reason to be changed (or rewritten)
  - Extending in this case refers to the fact that a single module or class should not cover requirements that stem from multiple standards.
  - If the change of a standard results in multiple classes or modules changing, that is OK
  - If multiple standards changing results in multiple changes within the same class or module, that is not OK.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
