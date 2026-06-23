# AAS Documentation – Use Case without MES

## Overview

This document describes the two AAS submodels **CommonParameter** and **Bill_of_Process (ManufacturingProcess)**, which are used in the Factory-X use case "without MES". The submodels form the basis for creating Asset Administration Shell (AAS) files via the AAS Creator REST Service.

| Submodel | idShort | Description |
|-----------|---------|-------------|
| CommonParameter | `CommonParameter` | General production parameters such as work order, location, scheduling, and CO₂ footprint |
| Bill of Process | `Bill_of_Process` | Manufacturing process data including machine assignment, order details, energy and material consumption |

---

## 1. Submodel: CommonParameter

### 1.1 General Description

The **CommonParameter** submodel contains the general production data required for each work order. It describes the planned and actual production times as well as high-level order information such as location, product assignment, and the CO₂ footprint at the order level.

- **idShort:** `CommonParameter`
- **modelType:** `Submodel`
- **kind:** `Template`
- **ID generation:** UUID-based (e.g. `urn:submodel:ca7ee2a9-c739-4300-a7cf-0c216310f988`)

### 1.2 Structure

```
CommonParameter (Submodel)
├── ScheduledProduction (SubmodelElementCollection)
│   ├── PlannedProductionStart (Property, xs:string)
│   └── PlannedProductionEnd (Property, xs:string)
├── TakenPlaceProduction (SubmodelElementCollection)
│   ├── ProductionStart (Property, xs:string)
│   └── ProductionEnd (Property, xs:string)
└── Details (SubmodelElementCollection)
    ├── WorkOrder (Property, xs:string)
    ├── LocationName (Property, xs:string)
    ├── FactoryId (Property, xs:string)
    ├── OperationStatus (Property, xs:string)
    ├── ProductID (Property, xs:string)
    ├── ProductFamily (Property, xs:string)
    ├── PCFComponentName (Property, xs:string)
    ├── PCFComponentID (Property, xs:string)
    └── WorkOrderCarbonFootprint (Property, xs:float)
```

### 1.3 Attribute Description

#### 1.3.1 ScheduledProduction

The **ScheduledProduction** collection contains the production time planned by the ERP system for the entire work order. These time windows represent the intended planning period during which manufacturing is to take place.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **PlannedProductionStart** | Property | `xs:string` (ISO 8601) | Yes | Planned production start of the work order. The timestamp is specified in ISO 8601 format, e.g. `2026-01-22T23:00:00+00:00`. This date represents the earliest possible start time for manufacturing as stored in the ERP system. |
| **PlannedProductionEnd** | Property | `xs:string` (ISO 8601) | Yes | Planned production end of the work order. The timestamp is specified in ISO 8601 format, e.g. `2026-01-25T23:00:00+00:00`. This date marks the latest point by which manufacturing should be completed. |

> **Note:** ScheduledProduction is defined as an array, allowing multiple planned time periods to be mapped (e.g. for interruptions or shift planning). At least one entry is required.

#### 1.3.2 TakenPlaceProduction

The **TakenPlaceProduction** collection contains the actual production periods. This data is recorded after completion or during manufacturing and reflects the real operating times.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **ProductionStart** | Property | `xs:string` (ISO 8601) | No | Actual production start. The timestamp is specified in ISO 8601 format, e.g. `2026-01-22T08:00:00.000Z`. This field is populated as soon as production has actually started. For planned but not yet started orders, this field remains empty. |
| **ProductionEnd** | Property | `xs:string` (ISO 8601) | No | Actual production end. The timestamp is specified in ISO 8601 format, e.g. `2026-01-22T16:00:00.000Z`. This field is populated as soon as production has been completed. For ongoing or planned orders, this field remains empty. |

> **Note:** The entire TakenPlaceProduction collection is optional. It is typically only populated after production has started. Multiple time periods can also be specified here (e.g. for multi-day manufacturing or shift operations).

#### 1.3.3 Details

The **Details** collection contains the core attributes of the work order. It identifies the order, assigns it to a location and product, and includes CO₂ footprint metrics.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **WorkOrder** | Property | `xs:string` | Yes | Unique identifier of the work order. The format follows the schema `WO-YYYY-MM-DD-HH-MM-SS`, e.g. `WO-2026-02-27-15-46-51`. The WorkOrder serves as the overarching reference between CommonParameter and the individual ManufacturingProcess entries. It is also used for generating the AAS ID and AAS idShort. |
| **LocationName** | Property | `xs:string` | No | Name of the production location, e.g. `Germany`, `China`, or a specific plant name. Used for geographic assignment of the manufacturing order and can be used for reporting and supply chain transparency. |
| **FactoryId** | Property | `xs:string` (UUID) | Yes | Unique identifier of the factory in UUID format, e.g. `0195f153-7b83-75d5-9d54-888c4567866d`. This value identifies the specific manufacturing location within a company and enables assignment of the order to a particular plant. |
| **OperationStatus** | Property | `xs:string` | Yes | Current status of the work order. Possible values include `planned`, `in_progress`, and `completed`. This status describes the overall status at the order level, not the status of individual processes. |
| **ProductID** | Property | `xs:string` | No | Product identifier, e.g. `PID_001`. Assigns the work order to a specific end product. This field enables traceability from the manufacturing order to the produced product. |
| **ProductFamily** | Property | `xs:string` | No | Product family, e.g. `API Test Products`. Enables grouping of related products and serves for categorization in reporting and production planning. |
| **PCFComponentName** | Property | `xs:string` | No | Name of the PCF component (Product Carbon Footprint Component), e.g. `Component A`. Identifies the component for which the CO₂ footprint is calculated. This is relevant for sustainability reporting and the calculation of the product carbon footprint. |
| **PCFComponentID** | Property | `xs:string` (UUID) | Yes | Unique identifier of the PCF component in UUID format, e.g. `0195f153-7b83-75d5-9d54-888c4567866d`. Serves as a machine-readable reference to the component for which the carbon footprint is determined. |
| **WorkOrderCarbonFootprint** | Property | `xs:float` | No | Total CO₂ footprint of the work order as a floating-point number, e.g. `3.086`. This value represents the sum of all CO₂ emissions caused by the manufacturing of this work order (in kg CO₂e). It aggregates the individual ProcessCarbonFootprint values of all associated manufacturing processes. |

---

## 2. Submodel: Bill_of_Process (ManufacturingProcess)

### 2.1 General Description

The **Bill_of_Process** submodel contains the detailed manufacturing process data. Each work order can comprise one or more manufacturing processes, each executed on a specific machine with a specific program. The submodel maps the complete process chain, including machine assignment, order quantities, scheduling, energy and material consumption.

- **idShort:** `Bill_of_Process`
- **modelType:** `Submodel`
- **kind:** `Template`
- **ID generation:** UUID-based (e.g. `urn:submodel:bc115d38-5edf-4a91-8582-e1a2b8784716`)

### 2.2 Structure

```
Bill_of_Process (Submodel)
├── {ProcessName} (SubmodelElementCollection)       ← per manufacturing process
│   ├── MachineDetails (SubmodelElementCollection)
│   │   ├── ProcessUUID (Property, xs:string)
│   │   ├── WorkOrder (Property, xs:string)
│   │   ├── ProcessOperationStatus (Property, xs:string)
│   │   ├── MachineName (Property, xs:string)
│   │   ├── MachineProgram (Property, xs:string)
│   │   ├── OperationStatusDataPointId (Property, xs:string)
│   │   └── ProgramDataPointId (Property, xs:string)
│   ├── OrderDetails (SubmodelElementCollection)
│   │   ├── UnitOfMeasurement (Property, xs:string)
│   │   ├── TotalAmount (Property, xs:string)
│   │   ├── ScrappedQuantity (Property, xs:string)
│   │   ├── ProducedQuantity (Property, xs:string)
│   │   └── ProcessCarbonFootprint (Property, xs:float)
│   ├── ScheduledProduction (SubmodelElementCollection)
│   │   ├── PlannedProductionStart (Property, xs:string)
│   │   └── PlannedProductionEnd (Property, xs:string)
│   ├── TakenPlaceProduction (SubmodelElementCollection)
│   │   ├── ProductionStart (Property, xs:string)
│   │   └── ProductionEnd (Property, xs:string)
│   ├── EnergyConsumption (SubmodelElementList)
│   │   └── {Name} (SubmodelElementCollection)      ← per energy type
│   │       ├── Name (Property, xs:string)
│   │       ├── TotalConsumption (Property, xs:float)
│   │       ├── TimeSeriesConsumption (Property, xs:string)
│   │       ├── Unit (Property, xs:string)
│   │       ├── TotalConsumptionIdle (Property, xs:float)
│   │       ├── TimeSeriesConsumptionIdle (Property, xs:string)
│   │       ├── EnergyConsumptionDataPointId (Property, xs:string)
│   │       ├── AvgEmissionFactor (Property, xs:float)
│   │       └── EnergyConsumptionCarbonFootprint (Property, xs:float)
│   └── MaterialConsumption (SubmodelElementList)
│       └── {Name} (SubmodelElementCollection)      ← per material type
│           ├── Name (Property, xs:string)
│           ├── TotalConsumption (Property, xs:float)
│           ├── TimeSeriesConsumption (Property, xs:string)
│           ├── Unit (Property, xs:string)
│           ├── MaterialConsumptionDataPointId (Property, xs:string)
│           ├── AvgEmissionFactor (Property, xs:float)
│           └── MaterialConsumptionCarbonFootprint (Property, xs:float)
```

> **Note:** Each manufacturing process is created as its own `SubmodelElementCollection` within the submodel. The `idShort` of the collection corresponds to the `ProcessName` field from the input data (e.g. `Process_PR_456_on_DMG`). Any number of processes can be contained in a single submodel.

### 2.3 Attribute Description

#### 2.3.1 Process Identification (ProcessName)

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **ProcessName** | SubmodelElementCollection (idShort) | `xs:string` | Yes | Unique name of the manufacturing process. Used as the `idShort` of the parent SubmodelElementCollection. The recommended naming scheme is `Process_{Program}_on_{Machine}`, e.g. `Process_PR_456_on_DMG` or `Process_PR_123_on_Trumpf`. The ProcessName must be unique within a Bill_of_Process submodel. |

#### 2.3.2 MachineDetails

The **MachineDetails** collection identifies the machine, its associated program, and the current operational status of the manufacturing process. It also contains optional references to data points for integration with IoT systems.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **ProcessUUID** | Property | `xs:string` (UUID) | Yes | Unique, system-wide identifier of the manufacturing process in UUID format, e.g. `0198553f-4d4b-72ba-a821-0044cee405ca`. This UUID is generated externally and serves as an immutable reference to the process, independent of the ProcessName. It enables unambiguous assignment even in case of name changes or in distributed systems. |
| **WorkOrder** | Property | `xs:string` | Yes | Identifier of the parent work order to which this process is assigned, e.g. `WO-2026-02-27-15-46-51`. This value must match the WorkOrder value in the CommonParameter submodel to ensure consistency between submodels. |
| **ProcessOperationStatus** | Property | `xs:string` | Yes | Current operational status of the manufacturing process. Possible values: `planned` (not yet started), `in_progress` (manufacturing running), `Ended` (manufacturing completed), `paused` (manufacturing interrupted). This status refers to the individual process step, not the overall order. |
| **MachineName** | Property | `xs:string` | Yes | Name of the machine on which the process is executed, e.g. `DMG`, `Trumpf`, `Haas`. This value identifies the physical manufacturing equipment and is also used as part of the ProcessName. |
| **MachineProgram** | Property | `xs:string` | Yes | Identifier of the machine program (NC program or control program) executed on the machine, e.g. `PR-456`, `PR-123`. The program defines the specific machining steps and parameters for manufacturing. |
| **OperationStatusDataPointId** | Property | `xs:string` (UUID) | No | Data point ID for integration with IoT/SCADA systems. References the data point that provides the machine's operational status in real time, e.g. `f39d4f61-2898-4e19-9ed1-eacdbfd54904`. Used for automatic status updates from machine data. Can be empty if no IoT integration is present. |
| **ProgramDataPointId** | Property | `xs:string` (UUID) | No | Data point ID of the currently running machine program in the IoT system, e.g. `f39d4f61-2898-4e19-9ed1-eacdbfd54904`. Enables automatic detection of which program is currently active on the machine. Can be empty if no IoT integration is present. |

#### 2.3.3 OrderDetails

The **OrderDetails** collection contains the order-related quantity and emission data for the manufacturing process. It describes how much is to be produced, how much has already been manufactured, and the CO₂ footprint of the process.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **UnitOfMeasurement** | Property | `xs:string` | Yes | Unit of measurement for production quantities, e.g. `Piece`, `kg` (kilogram), `m` (meter), `liter`. Defines the reference unit for TotalAmount, ProducedQuantity, and ScrappedQuantity. |
| **TotalAmount** | Property | `xs:string` | Yes | Total quantity to be manufactured in this process step, e.g. `100`. Although this is a numeric quantity, the value is stored as a string in the AAS. This is the target quantity according to the work order. |
| **ScrappedQuantity** | Property | `xs:string` | No | Number of scrap parts produced during the manufacturing process, e.g. `0`, `5`. Updated during or after manufacturing and used for quality control. Default value is `0`. |
| **ProducedQuantity** | Property | `xs:string` | No | Number of actually manufactured good parts, e.g. `0`, `95`. Updated during or after manufacturing. Together with ScrappedQuantity, this gives the total output. Default value is `0`. |
| **ProcessCarbonFootprint** | Property | `xs:float` | No | CO₂ footprint of this individual manufacturing process in kg CO₂e, e.g. `0.01713`. Calculated as the sum of EnergyConsumptionCarbonFootprint and MaterialConsumptionCarbonFootprint values of all energy and material consumption entries for this process. |

#### 2.3.4 ScheduledProduction (Process Level)

The **ScheduledProduction** collection at process level contains the planned manufacturing period for this specific process step. Unlike the ScheduledProduction in CommonParameter, it does not describe the overall order but rather the individual machining step on a specific machine.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **PlannedProductionStart** | Property | `xs:string` (ISO 8601) | Yes | Planned start of this manufacturing process in ISO 8601 format, e.g. `2026-01-22T23:00:00+00:00`. Can differ from the planned overall order start, especially for sequential processes executed one after another on different machines. |
| **PlannedProductionEnd** | Property | `xs:string` (ISO 8601) | Yes | Planned end of this manufacturing process in ISO 8601 format, e.g. `2026-01-23T23:00:00+00:00`. The planned end of this process may be earlier than the overall order end when subsequent processes follow. |

#### 2.3.5 TakenPlaceProduction (Process Level)

The **TakenPlaceProduction** collection at process level contains the actual manufacturing periods for this specific process step.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **ProductionStart** | Property | `xs:string` (ISO 8601) | No | Actual start of this manufacturing process in ISO 8601 format, e.g. `2026-03-02T22:48:42Z`. Captured by the manufacturing system as soon as the machine starts the process. Remains empty as long as the process has not yet started. |
| **ProductionEnd** | Property | `xs:string` (ISO 8601) | No | Actual end of this manufacturing process in ISO 8601 format, e.g. `2026-03-02T22:48:57Z`. Captured as soon as the process on the machine is completed. Remains empty for running or planned processes. |

#### 2.3.6 EnergyConsumption

**EnergyConsumption** is implemented as a `SubmodelElementList` and contains an ordered list of energy consumption entries. Each entry represents an energy type (e.g. electricity, compressed air, gas) and is mapped as its own `SubmodelElementCollection`.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **Name** | Property | `xs:string` | Yes | Name of the energy type, e.g. `electricity`, `CompressedAir`, `NaturalGas`. This value is simultaneously used as the `idShort` of the associated SubmodelElementCollection and must be unique within the EnergyConsumption list. |
| **TotalConsumption** | Property | `xs:float` | No | Total consumption of this energy type during the manufacturing process, e.g. `0.02284`. The unit is specified in the `Unit` field. For ongoing processes, this value is continuously updated. |
| **TimeSeriesConsumption** | Property | `xs:string` | No | Time series data of energy consumption as a JSON array string, e.g. `"[0.00571,0.00571,0.00571,0.00571]"`. Each value in the array represents the consumption in one time interval. Enables detailed analysis of the consumption profile over the manufacturing duration. Can be an empty array `"[]"` if no time series data is available. |
| **Unit** | Property | `xs:string` | Yes | Unit of measurement for energy consumption, e.g. `kWh` (kilowatt-hours), `M3` (cubic meters), `MJ` (megajoules). Refers to TotalConsumption and the values in TimeSeriesConsumption. |
| **TotalConsumptionIdle** | Property | `xs:float` | No | Energy consumption during the machine's idle time, e.g. `0.001`. Differentiates productive consumption from standby/idle consumption. Relevant for optimizing energy efficiency and accurate CO₂ attribution. |
| **TimeSeriesConsumptionIdle** | Property | `xs:string` | No | Time series data of idle energy consumption as a JSON array string, e.g. `"[0.00571,0.00571,0.00571,0.00571]"`. Analogous to TimeSeriesConsumption, but for idle times only. |
| **EnergyConsumptionDataPointId** | Property | `xs:string` (UUID) | No | Data point ID for integration with the energy monitoring system, e.g. `f39d4f61-2898-4e19-9ed1-eacdbfd54904`. References the sensor or meter that provides the consumption data. Can be empty if no automatic data collection is present. |
| **AvgEmissionFactor** | Property | `xs:float` | No | Average emission factor for this energy type in kg CO₂e per unit of consumption, e.g. `0.350` (350 g CO₂e/kWh for electricity) or `0.400` (400 g CO₂e/m³ for compressed air). Used to calculate the EnergyConsumptionCarbonFootprint. |
| **EnergyConsumptionCarbonFootprint** | Property | `xs:float` | No | CO₂ footprint of this energy consumption in kg CO₂e, e.g. `0.007994`. Calculation: `TotalConsumption × AvgEmissionFactor`. Summed across all energy types, this gives the energy-related portion of the ProcessCarbonFootprint. |

> **Note:** The entire EnergyConsumption list is optional. If provided, each entry must contain at least `Name` and `Unit`.

#### 2.3.7 MaterialConsumption

**MaterialConsumption** is implemented analogously to EnergyConsumption as a `SubmodelElementList` and contains material consumption entries. Each entry describes the consumption of a specific material type in the manufacturing process.

| Attribute | AAS Type | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| **Name** | Property | `xs:string` | Yes | Name of the material, e.g. `Resin`, `Polyethylene`, `Steel`, `Aluminum`. This value is simultaneously used as the `idShort` of the associated SubmodelElementCollection and must be unique within the MaterialConsumption list. |
| **TotalConsumption** | Property | `xs:float` | No | Total consumption of this material during the manufacturing process, e.g. `25.0`. The unit is specified in the `Unit` field. |
| **TimeSeriesConsumption** | Property | `xs:string` | No | Time series data of material consumption as a JSON array string, e.g. `"[5.0,5.0,5.0,5.0,5.0]"`. Enables tracking of when and how much material was consumed. Can be an empty array `"[]"`. |
| **Unit** | Property | `xs:string` | No | Unit of measurement for material consumption, e.g. `kg` (kilogram), `liter`, `m` (meter). Refers to TotalConsumption and the values in TimeSeriesConsumption. |
| **MaterialConsumptionDataPointId** | Property | `xs:string` (UUID) | No | Data point ID for integration with the material tracking system. References the sensor or source that provides the material consumption data. Can be empty if no automatic collection is present. |
| **AvgEmissionFactor** | Property | `xs:float` | No | Average emission factor for this material in kg CO₂e per unit of consumption, e.g. `0.0` (if unknown or not relevant). Used to calculate the MaterialConsumptionCarbonFootprint. |
| **MaterialConsumptionCarbonFootprint** | Property | `xs:float` | No | CO₂ footprint of this material consumption in kg CO₂e, e.g. `0.0`. Calculation: `TotalConsumption × AvgEmissionFactor`. Summed across all material types, this gives the material-related portion of the ProcessCarbonFootprint. |

> **Note:** The entire MaterialConsumption list is optional. If provided, each entry must contain at least `Name`.

---

## 3. Relationship Between Submodels

The two submodels **CommonParameter** and **Bill_of_Process** are linked via the work order (**WorkOrder**):

```
┌─────────────────────────────────────────────┐
│           Asset Administration Shell        │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │     CommonParameter (Submodel)        │  │
│  │  WorkOrder: WO-2026-02-27-15-46-51    │  │
│  │  FactoryId, Status, PCF, ...          │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │     Bill_of_Process (Submodel)        │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │ Process_PR_456_on_DMG           │  │  │
│  │  │   WorkOrder: WO-2026-02-27...   │  │  │
│  │  │   MachineName: DMG              │  │  │
│  │  │   EnergyConsumption: [...]      │  │  │
│  │  │   MaterialConsumption: [...]    │  │  │
│  │  └─────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │ Process_PR_123_on_Trumpf        │  │  │
│  │  │   WorkOrder: WO-2026-02-27...   │  │  │
│  │  │   MachineName: Trumpf           │  │  │
│  │  │   EnergyConsumption: [...]      │  │  │
│  │  │   MaterialConsumption: [...]    │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

- The **WorkOrder** in CommonParameter defines the parent order.
- Each process in Bill_of_Process references the same WorkOrder.
- The **WorkOrderCarbonFootprint** in CommonParameter is the sum of all **ProcessCarbonFootprint** values of the individual processes.
- The **ScheduledProduction** in CommonParameter specifies the overall time period; the ScheduledProduction in the individual processes specifies the respective sub-periods.

---

## 4. Complete Example

### 4.1 API Request (Input Data)

The following JSON shows a complete API request to the endpoint `POST /v1/aas/create` with two manufacturing processes:

```json
{
    "CommonParameter": {
        "ScheduledProduction": [
            {
                "PlannedProductionStart": "2026-01-22T23:00:00+00:00",
                "PlannedProductionEnd": "2026-01-25T23:00:00+00:00"
            }
        ],
        "TakenPlaceProduction": [
            {
                "ProductionStart": "2026-01-22T08:00:00.000Z",
                "ProductionEnd": "2026-01-22T16:00:00.000Z"
            }
        ],
        "Details": {
            "WorkOrder": "WO-2026-02-27-15-46-51",
            "LocationName": "Germany",
            "FactoryId": "0195f153-7b83-75d5-9d54-888c4567866d",
            "OperationStatus": "planned",
            "ProductID": "PID_001",
            "ProductFamily": "API Test Products",
            "PCFComponentName": "Component A",
            "PCFComponentID": "0195f153-7b83-75d5-9d54-888c4567866d",
            "WorkOrderCarbonFootprint": 3.086
        }
    },
    "ManufacturingProcess": [
        {
            "ProcessName": "Process_PR_456_on_DMG",
            "MachineName": "DMG",
            "MachineProgram": "PR-456",
            "WorkOrder": "WO-2026-02-27-15-46-51",
            "ProcessOperationStatus": "Ended",
            "OperationStatusDataPointId": "f39d4f61-2898-4e19-9ed1-eacdbfd54904",
            "ProgramDataPointId": "f39d4f61-2898-4e19-9ed1-eacdbfd54904",
            "ProcessUUID": "0198553f-4d4b-72ba-a821-0044cee405ca",
            "OrderDetails": {
                "UnitOfMeasurement": "Piece",
                "TotalAmount": 100,
                "ScrappedQuantity": 0,
                "ProducedQuantity": 0,
                "ProcessCarbonFootprint": 0.01713
            },
            "ScheduledProduction": [
                {
                    "PlannedProductionStart": "2026-01-22T23:00:00+00:00",
                    "PlannedProductionEnd": "2026-01-23T23:00:00+00:00"
                }
            ],
            "TakenPlaceProduction": [
                {
                    "ProductionStart": "2026-03-02T22:48:42Z",
                    "ProductionEnd": "2026-03-02T22:48:57Z"
                }
            ],
            "EnergyConsumption": [
                {
                    "Name": "electricity",
                    "TotalConsumption": 0.02284,
                    "TimeSeriesConsumption": "[0.00571,0.00571,0.00571,0.00571]",
                    "Unit": "kWh",
                    "TotalConsumptionIdle": 0.001,
                    "TimeSeriesConsumptionIdle": "[0.00571,0.00571,0.00571,0.00571]",
                    "EnergyConsumptionDataPointId": "",
                    "AvgEmissionFactor": 0.350,
                    "EnergyConsumptionCarbonFootprint": 0.007994
                },
                {
                    "Name": "CompressedAir",
                    "TotalConsumption": 0.02284,
                    "TimeSeriesConsumption": "[0.00571,0.00571,0.00571,0.00571]",
                    "Unit": "M3",
                    "EnergyConsumptionDataPointId": "f39d4f61-2898-4e19-9ed1-eacdbfd54904",
                    "AvgEmissionFactor": 0.400,
                    "EnergyConsumptionCarbonFootprint": 0.009136
                }
            ],
            "MaterialConsumption": [
                {
                    "Name": "Resin",
                    "TotalConsumption": 25.0,
                    "TimeSeriesConsumption": "[]",
                    "Unit": "kg",
                    "MaterialConsumptionDataPointId": "",
                    "AvgEmissionFactor": 0.0,
                    "MaterialConsumptionCarbonFootprint": 0.0
                }
            ]
        },
        {
            "ProcessName": "Process_PR_123_on_Trumpf",
            "MachineName": "Trumpf",
            "MachineProgram": "PR-123",
            "WorkOrder": "WO-2026-02-27-15-46-51",
            "ProcessOperationStatus": "planned",
            "ProcessUUID": "0198553f-4d4b-72ba-a821-0044cee406bc",
            "OrderDetails": {
                "UnitOfMeasurement": "Piece",
                "TotalAmount": 90,
                "ScrappedQuantity": 0,
                "ProducedQuantity": 0,
                "ProcessCarbonFootprint": 0.01200
            },
            "ScheduledProduction": [
                {
                    "PlannedProductionStart": "2026-01-24T23:00:00+00:00",
                    "PlannedProductionEnd": "2026-01-25T23:00:00+00:00"
                }
            ],
            "EnergyConsumption": [
                {
                    "Name": "electricity",
                    "TotalConsumption": 0.01500,
                    "TimeSeriesConsumption": "[0.00375,0.00375,0.00375,0.00375]",
                    "Unit": "kWh",
                    "AvgEmissionFactor": 0.350,
                    "EnergyConsumptionCarbonFootprint": 0.00525
                }
            ]
        }
    ]
}
```

### 4.2 API Response (Output Data)

Upon successful processing, the service returns the following response:

```json
{
    "filename": "AAS-WO-2026-02-27-15-46-51.aasx",
    "aas_id": "https://i.siemens.com/WO20260227154651",
    "aas_id_short": "AAS_WO_2026_02_27_15_46_51",
    "file_content": "<Base64 encoded AASX file>"
}
```

### 4.3 Explanation of the Example

The example above models a work order `WO-2026-02-27-15-46-51` comprising two sequential manufacturing processes:

1. **Process_PR_456_on_DMG** – Machining on a DMG machine with program PR-456:
   - Status: `Ended` (already completed)
   - 100 pieces planned, manufacturing took place on 02.03.2026
   - Energy consumption: electricity (0.02284 kWh) and compressed air (0.02284 m³)
   - Material consumption: 25 kg resin
   - CO₂ footprint: 0.01713 kg CO₂e

2. **Process_PR_123_on_Trumpf** – Machining on a Trumpf machine with program PR-123:
   - Status: `planned` (not yet started)
   - 90 pieces planned, manufacturing scheduled from 24.01.2026
   - Energy consumption: electricity only (0.01500 kWh)
   - No material consumption specified
   - CO₂ footprint: 0.01200 kg CO₂e

The **WorkOrderCarbonFootprint** of `3.086 kg CO₂e` in CommonParameter aggregates the total emissions of the order including all processes and upstream contributions.

---

## 5. ID Generation

| Element | Method | Example |
|---------|--------|---------|
| **AAS ID** | WorkOrder-based (URL, hyphens removed) | `https://i.siemens.com/WO20260227154651` |
| **AAS idShort** | Prefix `AAS_` + WorkOrder (hyphens → underscores) | `AAS_WO_2026_02_27_15_46_51` |
| **Submodel ID** | UUID-based | `urn:submodel:ca7ee2a9-c739-4300-a7cf-0c216310f988` |
| **Process idShort** | Derived from ProcessName | `Process_PR_456_on_DMG` |

---

## 6. Data Type Reference

| AAS Data Type | Description | Example |
|---------------|-------------|---------|
| `xs:string` | Character string (general text, date, UUID) | `"WO-2026-02-27-15-46-51"` |
| `xs:float` | Floating-point number (consumption values, CO₂ values) | `0.02284`, `3.086` |
| `xs:string` (ISO 8601) | Timestamp in ISO 8601 format | `"2026-01-22T23:00:00+00:00"` |
| `xs:string` (UUID) | UUID string | `"0195f153-7b83-75d5-9d54-888c4567866d"` |
| `xs:string` (JSON Array) | JSON array as string | `"[0.00571,0.00571]"` |
