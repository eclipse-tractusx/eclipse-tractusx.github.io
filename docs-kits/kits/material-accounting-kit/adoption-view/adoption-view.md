---
id: adoption-view
title: Adoption View
description: 'Material Accounting KIT'
sidebar_position: 2
---

<!--
Copyright(c) 2026 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
information regarding copyright ownership.

This work is made available under the terms of the
Creative Commons Attribution 4.0 International (CC-BY-4.0) license,
which is available at
https://creativecommons.org/licenses/by/4.0/legalcode.

SPDX-License-Identifier: CC-BY-4.0
-->

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';
<Kit3DLogo kitId='material-accounting' />

<!--
KIT LOGO END
-->

## Introduction

The transition toward a circular economy in the automotive industry requires not
only efficient recycling processes, but also transparent and trustworthy data
exchange across the entire reverse value chain. As vehicles reach end-of-life,
valuable information about materials, components, and recycling processes is
often lost between dismantlers, recyclers, logistics providers, and
manufacturers. This lack of transparency limits the efficient reuse of secondary
materials and creates challenges for regulatory compliance, reporting, and
circular business models.

Material Accounting addresses this challenge by enabling the standardized
tracking, exchange, and verification of material-related data within the
Catena-X ecosystem. By combining digital twins, semantic standards, and
interoperable data exchange, Material Accounting creates a shared understanding
of how materials move through dismantling, recycling, and manufacturing
processes.

The KIT provides guidance on the business context, semantic models,
architecture, and implementation principles required to build Catena-X compliant
Material Accounting solutions. It supports companies in establishing transparent
and traceable material flows, enabling better circularity decisions, regulatory
compliance, and the scalable integration of secondary materials into future
production processes.

## Vision and Mission

### Vision

The   vision of Material Accounting is to enable a transparent and circular
automotive value chain, where materials from end-of-life vehicles  are
seamlessly reintegrated into new vehicle production. As illustrated in the
figure, this vision connects all stages—from dismantling and recycling to
material, component, and vehicle manufacturing—through a continuous digital flow
of information. Material Accounting acts as the backbone across this lifecycle,
ensuring that every material is traceable, verifiable, and linked to its origin
and processing history. By bridging the data gap between end-of-life and
production, and by enabling integration with use cases such as the Digital
Product Passport and Secondary Material Content, the KIT establishes the
foundation for circularity, regulatory compliance, and sustainable resource
utilization. 

### Mission

The mission of the Material Accounting KIT is to provide a practical and standardized framework that enables all participants in the use
case to capture, exchange, and utilize data on secondary materials in
a consistent and interoperable way. It guides all actors, such as
dismantlers, recyclers, logistics providers, and manufacturers, in
implementing standardized data models, and secure data
exchange processes to ensure end-to-end traceability of material
flows. By doing so, the Use Case supports the verification of
secondary material content, reduces manual effort, and empowers
organizations to optimize material usage while meeting regulatory and
sustainability requirements.


## Business Value

Material Accounting creates measurable business value by improving transparency, compliance, efficiency, and circular performance across the reverse value chain.

**Traceability of Secondary Materials**

Material Accounting enables transparent tracking of material quantities,
origins, and flows across dismantling, recycling, and manufacturing stages. This
improves visibility into secondary material streams and builds trust across
company boundaries.

**Business Value from Closed Loops**

By identifying and capturing value in circular material flows, companies can
move from linear waste handling toward closed-loop material strategies. Material
Accounting makes it possible to quantify and optimize the reuse of materials at
the vehicle´s end of life  within the automotive ecosystem.

**Regulatory Compliance**

Standardized and verifiable data supports compliance with legal and regulatory
requirements and can serve as the basis for calculating and validating recycled
content quotas and meeting reporting obligations. Auditable data reduces risk
and increases confidence in sustainability claims.

**Higher Availability and Quality of Recyclates**

Improved data transparency enhances supply security for secondary materials.
Better insight into material sources and processing steps supports higher
recyclate quality and more reliable integration into manufacturing processes. In
addition, Material Accounting enables the creation of liquid and fungible
secondary material markets by increasing comparability, trust and tradability.

**Lower Recyclate Costs through Standardization**

Standardized data models and interoperable exchange reduce inefficiencies,
manual coordination, and data inconsistencies. This contributes to cost
reductions across recycling, material sourcing, and compliance activities.

**Lifecycle Responsibility**

Material Accounting supports a holistic lifecycle perspective by linking
end-of-life processes with new production. This enables companies to take
responsibility for products across their full lifecycle including ecomodulation
approaches, which strengthens circular economy implementation.

| Current Challenges | Solutions |
|---|---|
| **Limited Transparency after End-of-Life**: Material information is lost or fragmented during dismantling and recycling. | **Digital Tracking of Secondary Material Flows**: End-of-life vehicles → dismantling → recycling → new production |
| **Complex & Distributed Value Chains**: Multiple actors generate disconnected and non-standardized data. | **Standardized & Verifiable Data Models**: Harmonized semantics ensure consistent and machine-readable material data. |
| **Regulatory & Reporting Pressure**: Recycled content and recovery rates must be proven with auditable data. | **Cross-Company Transparency with Data Sovereignty**: Trusted data exchange across actors while maintaining control. |
| **High Manual Effort**: Material verification relies on documentation, estimates, and manual processes. | **Reduced Compliance Effort**: Reusable, auditable data instead of repetitive manual reporting. |
| **Integration Barriers**: Existing IT systems are not designed for scalable, cross-company material data exchange. | **Better Circular Decision-Making**: Material flows become visible, comparable, and optimizable. |

<!-- Describe why this KIT is attractive for service providers to be implemented -->

## Use Case Overview

The following diagram illustrates the Material Accounting use case across the automotive circular economy lifecycle. It shows how materials and related information move through the different stages of the reverse and forward value chain, from dismantling and recycling to material, component, and vehicle manufacturing.

Material Accounting acts as a cross-functional data layer that accompanies these physical processes by enabling the standardized exchange of material-related information between actors. Each process step generates input and output data that can be linked through digital twins and semantic models, ensuring traceability, transparency, and interoperability across company boundaries.

![Use Case Overview](../resources/use-case-overview-tight.svg)

*Figure 1: Material Accounting across the automotive end-of-life.*

## User Journey
insert video here!!


## Semantic Models / Data Model

Material Accounting is based on a set of standardized semantic aspect
models that define how vehicles, components, materials and recycling
processes are described and exchanged within the Catena-X ecosystem.
These models establish a common business semantics across all
participants in the reverse value chain. By structuring data in a
consistent and machine-readable way, they enable traceability of
material flows, verification of recycled content, and interoperability
across companies. Each aspect model represents a specific perspective
on the asset and is implemented as a digital twin submodel. The models
are exchanged and updated along transaction events triggered by
physical processes such as dismantling, transport, recycling, and
manufacturing.

The following figure provides an overview of the six semantic aspect
models defined for Material Accounting and their integration into the
existing Catena-X data model landscape. At the center of the
architecture, the **PartInstance (SerialPart)** and **SingleLevelBomAsBuilt**
models from the Industry Core establish the structural foundation by
linking vehicles, components, and parts. Building on this, the six
Material Accounting aspect models extend the digital twin with
circularity-relevant information: **VehicleInformation** describes the
vehicle at end-of-life, **Composition** links assets to their material
breakdown, **Material** defines the characteristics of materials,
**RecyclingInformation** captures recycled content shares, **WasteCode**
ensures regulatory classification, and **RecyclingBatch** represents
process and batch-level transformations. Together, these models form a
coherent semantic structure that enables the traceability of materials
across the reverse value chain and ensures that all participants
operate on a consistent interoperable data basis.

![samm image](../resources/SAMM.drawio.svg) 

*Figure 2: Six New Aspect Models (SAMM)*

Material Accounting builds on existing Catena-X standards, as seen above, particularly:

- PartInstance (SerialPart) for identifying physical assets
- SingleLevelBomAsBuilt for linking vehicles, components, and materials

The Material Accounting aspect models extend this foundation by adding
circularity-relevant data such as material composition, recycling processes, waste classification, and material origin.

### 1.	VehicleInformation

The VehicleInformation model describes the vehicle at the end-of-life point, when it enters the
reverse value chain. It provides the contextual data required to identify,
classify, and assess the vehicle before dismantling and recycling processes.

| Attribute | Definition |
|---|---|
| `anonymizedVin` | OEM-specific hashed VIN |
| `vehicleType` | A vehicle type is a classification of a vehicle based on its design, construction, and purpose |
| `productionDate` | Production date of the vehicle |
| `emptyWeight` | The empty weight of the vehicle in kg as specified |
| `oem` | Original equipment manufacturer |
| `vehicleSeries` | Series information of the vehicle model that needs to be processed |
| `modelIdentifier` | OEM-specific model identifier or OEM-specific project name |
| `driveType` | Drive type of a vehicle according enumeration |
| `vehicleCondition` | Condition of the actual vehicle |

### 2. WasteCode

The WasteCode model standardizes the classification of vehicles, component set`s,
components, and materials according to waste categories. It ensures regulatory
alignment and consistent classification across actors. This model is based on the European Waste Code at 

| Attribute | Definition |
|---|---|
| `wasteCode` | The waste code is used to identify the type of waste on part or material level|


### 3.	RecyclingBatch

The RecyclingBatch model captures process-related and transactional data
describing how materials, components, and compositions are handled, transferred,
and processed across the reverse value chain. It reflects real-world operations
such as transport, weighing, and treatment steps.

| Attribute | Definition |
|---|---|
| `sender` | Sender of the RecyclingBatch |
| `receiver` | Receiver of the RecyclingBatch |
| `actorNumber` | Operating number of the actor |
| `bpnsProperty` | The Catena-X Business Partner Number of the actor |
| `actorRole` | Type of the actor in the recycling process |
| `treatmentProcedure` | Process that is used to handle waste according to the chosen strategy |
| `mechanicalRecycling` | Materials that have undergone mechanical recycling (true or false) |
| `chemicalRecycling` | Materials that have undergone chemical recycling (true or false) |
| `processType` | The process reflects the current processing phase in the reverse chain |
| `childProcessType` | The child process steps detail further capabilities required for recycling |
| `startTimestamp` | Start of the specific process step |
| `endTimestamp` | End of the specific process step |
| `inputNetMass` | Incoming net weight in the specific process step |
| `outputNetMass` | Outgoing net weight in the specific process step |
| `measurementType` | Measuring instrument for material share or weight determination |
| `measurementTimestamp` | Timestamp of the specific time of measurement |
| `processLoss` | Weight of loss within the specific process step |
| `lossType` | Specification of loss within the specific process step |
| `weighingSlip` | Official document that records the result of weighing (of component set / components / materials) on a scale |
| `transferId` | Identifier for the transport between two actors |
| `operator` | Operator of the transport process |
| `containerTypeId` | Standardized number for the container type which contains component set´s / components / materials according to AVAL |
| `containerDescription` | Standardized description of the container type according to AVAL |
| `containerVolume` | Volume of the container type according to AVAL |
| `containerWeight` | Empty weight of the container based on the scale display |
| `recyclingBatchId` | Identifier of the recycling batch |


### 4.  Material

The Material model provides a standardized description of materials, including their classification, physical and chemical characteristics, and processing status.  
It enables consistent identification and comparison of materials across actors and processes.

| Attribute | Definition |
|---|---|
| `materialCategory*` | Highest-level classification that groups materials into broad, fundamental classes |
| `materialGroup*` | A more specific subdivision within a Material Category |
| `materialSubgroup*` | A refined subset of a material Group that classifies materials |
| `classificationStandard*` | Standard according to which the material is classified |
| `materialStatus` | Status of the material in the process step |
| `materialFormat` | Format of the material in the process step |
| `physicalState` | The physical state of the material |
| `chemicalCharacterization` | Description of the chemical composition and properties |
| `thermalCharacterization` | Information about thermal behaviour |
| `rangeOfUncertainty` | Tolerance specification in material composition |

\* from shared model `MaterialClassification`

### 5. RecyclingInformation

The RecyclingInformation model captures the origin and quantitative distribution of material shares. It enables the calculation and verification of recycled content across the reverse value chain.

| Attribute | Definition |
|---|---|
| `materialSourceShare` | Shares of primary and secondary materials |
| `preConsumerShares` | Set of pre consumer material shares |
| `postConsumerShares` | Set of post consumer material shares |
| `reutilizationMaterialShare` | Material share from reutilization of materials |
| `origin` | Information on material origin |
| `otherInformation` | Document verifying origin, quality, or compliance |

---

## 6. Composition

The Composition model describes how components and materials are grouped and structured within vehicles or batches. It enables the creation of material balances and the traceability of material allocations.

| Attribute | Definition |
|---|---|
| `materialWeight` | Weight of a material in a part |

 `To better understand mandatory and optional attributes, please refer to the respective Material Acccounting Data Model.`

## Standards

| Name | Description | Link to standard |
|---|---|---|
| CX-0159 | Material Accounting standard defining harmonized technical specifications and semantic models for digital material accounting within Catena-X. | [CX-0159 Material Accounting v.1.0.0](https://catenax-ev.github.io/docs/next/standards/CX-0159-Material-Accounting) |
| CX-0001 | Defines the EDC Discovery API used to discover connectors and enable data exchange setup within Catena-X. | [CX-0001 Participant Agent Registration](https://catenax-ev.github.io/docs/next/standards/CX-0001-ParticipantAgentRegistration) |
| CX-0002 | Defines Digital Twins in Catena-X, including principles for representing assets through Asset Administration Shells. | [CX-0002 Digital Twins in Catena-X](https://catenax-ev.github.io/docs/next/standards/CX-0002-DigitalTwinsInCatenaX) |
| CX-0003 | Defines the SAMM Aspect Meta Model used for standardized semantic aspect modeling in Catena-X. | [CX-0003 SAMM Aspect Meta Model](https://catenax-ev.github.io/docs/next/standards/CX-0003-SAMMSemanticAspectMetaModel) |
| CX-0018 | Defines Dataspace Connectivity and DSP/DCP-compliant data exchange mechanisms. | [CX-0018 Dataspace Connectivity](https://catenax-ev.github.io/docs/next/standards/CX-0018-DataspaceConnectivity) |
| CX-0127 | Defines the Industry Core Part Instance model used for linking physical assets and digital twins. | [CX-0127 Industry Core: Part Instance](https://catenax-ev.github.io/docs/next/standards/CX-0127-IndustryCore-PartInstance) |
| CX-0152 | Defines policy constraints and conventions for sovereign data exchange within Catena-X. | [CX-0152 Policy Constraints for Data Exchange](https://catenax-ev.github.io/docs/next/standards/CX-0152-Policy-Constraints-For-Data-Exchange) |
| CX-0125 | Traceability Use Case standard providing complementary guidance for traceability-related data structures and use cases. | [CX-0125 Traceability Use Case](https://catenax-ev.github.io/docs/next/standards/CX-0125-TraceabilityUseCase) |
| CX-0131 | Circularity Core standard providing complementary concepts and guidance for circular economy use cases. | [CX-0131 Circularity Core](https://catenax-ev.github.io/docs/next/standards/CX-0131-CircularityCore) |
| CX-0117 | Secondary Marketplace standard providing complementary guidance for circular economy marketplace use cases. | [CX-0117 Secondary Marketplace](https://catenax-ev.github.io/docs/next/standards/CX-0117-UseCaseCircularEconomy-SecondaryMarketplace) |

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 BASF SE
- SPDX-FileCopyrightText: 2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2026 Brain of Materials AG
- SPDX-FileCopyrightText: 2026 Gestamp
- SPDX-FileCopyrightText: 2026 Technovative Solutions Limited
- SPDX-FileCopyrightText: 2026 LRP-Autorecycling Leipzig GmbH
- SPDX-FileCopyrightText: 2026 Asahi Kasei
- SPDX-FileCopyrightText: 2026 Interzero
- SPDX-FileCopyrightText: 2026 Circularise
- SPDX-FileCopyrightText: 2026 Containergrid GmbH
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
