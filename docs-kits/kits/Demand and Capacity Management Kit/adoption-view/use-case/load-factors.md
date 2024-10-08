---
id: load-factors
title: Load Factors
description: Detail capacities by defining how much of a strain a material is on your capacities, compared to other materials. 
sidebar_position: 4
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Business Roles and Functions

Load factors are advanced properties of a Capacity Group structure and therefore used optionally by suppliers. The application of Load factors is embedded into the WeekBasedCapacityGroup aspect model. This means that only suppliers may apply load factors and customers consume it.

|Function / Role|Customer|Supplier|
|-|-|-|
|Define load factors for materials||X|
|Define conversion factor for unit of measure||X|
|Inform business partners about factors||X|
|Acknowledge factors|X||
|Recalculate demands in user interface, based on factors |X|X|

## Business value
The feature “load factors” allows suppliers to model and represent otherwise impossible capacity occurrences, by introducing a numerical multiplication factor, that changes the demand volume interpretation of a capacity group.

Load factors should be used to solve the following two problems:  

- Processing of non-homogeneous material variants within a capacity group, resulting in diverging capacity utilization.  

- Requirement for having a different unit of measure within a WeekBasedCapacityGroup, in relation to its linked WeekBasedMaterialDemand.  

Load factors solve these problems by:  

- Scaling the weekly demand linearly if a material variant causes higher or lower than normal load within the capacity group. Load factors can, for example, express a reduction to 90% or an increase to 150%.  

- Acting as conversion factors, converting the unit of measure of a WeekBasedMaterialDemand into the unit of measure of the WeekBasedCapacityGroup. This leads to a conversion into either “time” (unit:secondUnitOfTime) or “cycle” (unit:cycle), expressing that, for example, a piece of material takes 12 seconds, or a set of material takes half a cycle to manufacture.  

**Advantages**

- Possible differentiation of capacity utilization for product variants within a capacity group
- Possible conversion of different units of measure
- Better reflection of actual production environment

## Functional description
![Loadfactor](/resources/business-process_LoadFactor_functional.svg)
![Loadfactor_img01](https://github.com/user-attachments/assets/4719dbd3-95ba-49a7-9131-9d1fa6d0a339)

Figure: *Capacity group structure with linked material demand incl. load factors*

Suppliers may apply load factors within WeekBasedCapacityGroup aspect model via the parameter
```json
 "loadFactor"
```
| Main Parameters | Required? | Description | Example |
|-|-|-|-|
| Load Factor | no | If existent, the load factor indicates that this material of the material demand collection takes a factor more or less intensity to produce.| Decimal value (e.g. "3.5"). |

Suppliers can apply load factors within the WeekBasedCapacityGroup model via a parameter. If they choose to do so, a load factor must be assigned to every WeekBasedMaterialDemand linked to the WeekBasedCapacityGroup.

A load factor of 1 is neutral and does not change the linked WeekBasedMaterialDemand. Since load factors are applied via the WeekBasedCapacityGroup, a WeekBasedMaterialDemand can have multiple, differing load factors.

Without load factors, the units of measure of a WeekBasedCapacityGroup and its linked WeekBasedMaterialDemand should be identical. With load factors, they may differ.

**Considerations**

- The standard does not specify individual calculation logic for applying a load factor (e.g., converting capacity in pieces to production cycles). This logic depends on the suppliers’ individual planning requirements and tools. Indicating a load factor informs the customer that a conversion has taken place but does not affect the transferred demand or capacity values.
- Lot size restrictions, especially lot size = 1, are not considered when using load factors.
- To maintain consistency in demand-capacity comparison, rounding of fractional conversion results should be avoided.
- If a WeekBasedCapacityGroup links several WeekBasedMaterialDemand containing the same material, the load factors applied to these WeekBasedMaterialDemand should be identical.

Suppliers can use comments to provide customers with additional information about the applied load factors. For more details on this communication feature, see Chapter 5.9 of the CX-0128 DCM Standard document.


## Sequence Diagram
![LoadFactor_swimlane](https://github.com/user-attachments/assets/eacbd366-1fe0-40c1-85f8-a421b140d13c)
Figure: *Sequence diagram example for application of load factor*

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Example
The supplier produces two toys coloured red and chrome on its line for the customer. 
Both materials pass through the same station within the colouring process.

Red toy needs 1 cycle at this station. Chrome toy needs 2 cycles because it needs to be painted twice. The supplier can effectively produce 250 cycles per week at this station.  

The supplier has created a capacity group "Red and Chrome Toys" with the unit “cycle” (unit:cycle). A processing time per piece of 1 cycle is set for red toys and 2 cycles for chrome toys. The maximum available process time is set to 250 cycles. 

The customer requires 100 pieces of red toys and 100 pieces of chrome toys in the respective week. The supplier calculates the required process time to be 300 cycles, i.e. 100(red)*1 + 100(chrome)*2 = 100 + 200 = 300 cycles.

Without the load factor applied, it would not have been transparent for the customer, that the required amount of red and chrome toys is not possible to be fulfilled and it is necessary to decrease the volume in the respective week. 

One possible solution would be to reduce the chrome toys by 25 pieces to 75 pieces. New required process time would add up to 100(red)*1 + 75(chrome)*2 = 100 + 150 = 250 cycles. 

![Loadfactor_example](https://github.com/user-attachments/assets/579c1f3f-c218-4d63-9a13-53968bd26769)
Figure: *Example for application of load factor within WeekBasedCapacityGroup*

#### Sample Data

```json
{
  "unitOfMeasureIsOmitted" : false,
  "unitOfMeasure" : "unit:piece",
  "linkedDemandSeries" : [ {

    "loadFactor" : 3.5,

    "materialNumberCustomer" : "MNR-7307-AU340474.002",
    "materialNumberSupplier" : "MNR-8101-ID146955.001",
    "customerLocation" : "BPNS8888888888XX",
    "demandCategory" : {
      "demandCategoryCode" : "0001"
    }
  } ],
  "supplier" : "BPNL6666666666YY",
  "linkedCapacityGroups" : [ "be4d8470-2de6-43d2-b5f8-2e5d3eebf3fd" ],
  "name" : "Spark Plugs on drilling machine for car model XYZ",
  "supplierLocations" : [ "BPNS8888888888XX" ],
  "capacities" : [ {
    "pointInTime" : "2022-08-01",
    "actualCapacity" : 1000,
    "maximumCapacity" : 2000,
    "deltaProductionResult" : 400
  } ],
  "changedAt" : "2023-03-10T12:27:11.320Z",
  "capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "customer" : "BPNL8888888888XX"
}
```

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 Volkswagen AG
- SPDX-FileCopyrightText: 2023,2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023,2024 BASF SE
- SPDX-FileCopyrightText: 2023,2024 SupplyOn AG
- SPDX-FileCopyrightText: 2023,2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2023,2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V (Fraunhofer)
- SPDX-FileCopyrightText: 2023,2024 Capgemini Deutschland GmbH
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange
