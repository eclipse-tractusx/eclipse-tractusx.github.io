---
id: load-factors
title: Load Factors
description: Communicate deviating capacity utilizations
sidebar_position: 4
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Business Roles and Functions

Load factor data is embedded into the WeekBasedCapacityGroup aspect model. This means that only suppliers provide load factor related data and customers consume it.

|Function / Role|Customer|Supplier|
|-|-|-|
|Define load factors for materials||X|
|Define conversion factor for unit of measure||X|
|Inform business partners about factors||X|
|Acknowledge factors|X||
|Recalculate demands in user interface, based on factors |X||

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

[StandardLibrary]: https://catena-x.net/de/standard-library
