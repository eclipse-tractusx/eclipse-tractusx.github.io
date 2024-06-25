---
id: business-process
title: Core Business Process
description: Exchange demand and capacity information to solve bottlenecks.
sidebar_position: 1
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)


## Business Roles and Functions

The core DCM business process uses two APIs and two aspect models.The customer is responsible for `WeekBasedMaterialDemand`, the supplier for `WeekBasedCapacityGroup`. Within `WeekBasedCapacityGroup` the supplier has to link material demands.

|Function / Role|Customer|Supplier|
|-|-|-|
|Manage demand data|X||
|Inform supplier about demand|X||
|Manage capacity data||X|
|Link demand and capacity||X|
|Inform customer about capacity||X|
|Compare demand to capacity|X|X|
|Resolve bottlenecks|X|X|

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library
