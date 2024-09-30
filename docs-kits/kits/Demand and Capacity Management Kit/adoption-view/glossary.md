---
id: glossary
title: Glossary
description: Glossary
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## DCM Glossary

|Term|Description|
|----|-----------|
|Actual Capacity|This is the capacity a supplier realistically plans to have available to satisfy the demand of a certain material per week for a specific customer. It considers the supplier’s own assessment of their capabilities, inventory and existing commitments.|
|Agreed Capacity|This is a capacity value coordinated between customer and supplier and it may refer e.g. to capacity values defined in mutually agreed contracts. Using the agreed capacity is optional, it has purely informative character and therefore does not constitute a legal obligation to deliver. The agreed capacity may be greater than, less than or equal to the actual or maximum capacity. It may be used for a time frame different than the whole time series.|
|API|Application Programming Interface is a set of rules, protocols, and tools for building software and applications. Examples for DCM can be found here: [LinkText](https://eclipse-tractusx.github.io/docs-kits/next/kits/DCM-Kit/development-view/overview#apis-utilized-by-a-dcm-application)|
|Aspect Model|see: [LinkText](https://catenax-ev.github.io/docs/next/standards/CX-0002-DigitalTwinsInCatenaX#aspect-model)|
|Bottleneck|A facility, function, department, or resource whose capacity is less than the demand placed upon it. For example, a bottleneck machine or work center exists where jobs are processed at a slower rate than they are demanded (Source: ASCM Supply Chain Dictionary, 17th edition).|
|Business application provider|Typically, it is a third party that offers tools to data consumers and data providers for demand and capacity management purposes that conform to the core business logic, data models and APIs described in the Catena-X DCM  standard.|
|Business Partner Number Legal Entity (BPNL)|See: [LinkText](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber#153-legal-entity)|
|Business Partner Number Site (BPNSL)|See: [LinkText](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber#154-site)|
|Calendar Week|A week consisting of seven days, typically numbered according to the week containing the year’s first Thursday. For example, if the first Thursday of the year is on January 1st, that week is considered Week 1.|
|Capacity|1. The capability of a system to perform its expected function. 2. The capability of a worker, machine, work center, plant, or organization to produce output per time period. (Source: ASCM Supply Chain Dictionary, 17th edition).|
|Capacity Group|A Capacity Group is a virtual entity that contains capacity information, which depend on production capabilities (based e.g. on grouping of one or more machines, plants, production lines or similar), as well as the material demands linked to it. The Capacity Group is the place where demand and capacity informations come together and are compared, in order to recongize production bottlenecks and/or surplus. When written as WeekBasedCapacityGroup, it refers to a specific data model within this standard.|
|Comments|A feature that allows two business partners to exchange messages about material demand and capacity, facilitating direct collaboration and quick issue resolution.|...|
|Customer|A role within the DCM use case, which represents a company that receives goods from its suppliers. Participating companies can have multiple roles at the same time: in this context, A customers provides consistent and up-to-date demand forecast to and receives capacity data from suppliers. Synonym: one-up.|
|Data Consumer|A data consumer refers to any entity that retrieves and uses data from a source. This can be an individual, application, or system that accesses and processes data for various purposes or simply in context of Catena-X receiving data from a business partner.|
|Data Provider|A data provider is an entity that supplies or makes data available to others. In case of Catena-X this can be a business partner supplying information. In the context of information technology and data management, a data provider can be a database, a web service, an API, a file system, or any other system that allows data to be accessed by data consumers.|
|(Simulated) Delta-Production|This is an optional feature that allows suppliers to manage capacity bottlenecks by simulating changes in production without altering actual or maximum capacity values published to customers. See also pre-/post-production.|
|Demand Deviation|This is an optional metric that allows suppliers to monitor changes in customer demands and to identify significant changes that can collaboratively be addressed by suppliers and customers.|
|Demand fluctuation|A systematical measure to track fluctuation in demand in a given period and it intends to point out be stability or even the best forecast available. One of the metrics used to measure it may be e.g. Demand Deviation.|
|Digital Twin|See: [LinkText](https://catenax-ev.github.io/docs/next/standards/CX-0002-DigitalTwinsInCatenaX#digital-twin)|
|Flexible Capacity|The difference between maximum and actual capacity, which represents the measures to potentially increase capacity without further agreements between partners, such as extending the utilization of production resources within a week.|
|JSON|The JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).|
|Linking material demand|Material demands can be linked directly to a capacity group or indirectly through another capacity group, which is known as “Nesting.”|
|Load Factor|An optional feature of a capacity group that adds individual numerical material load factors to WeekBasedMaterialDemand linked by the WeekBasedCapacityGroup. It  adds flexibility to the unit of measure of the capacity group.|
|Material|The elements, constituents, or substances of which something is composed or can be made of. Usually referred to by a material number.|
|(Material) demand|A need for a particular product or component. The demand could come from any number of sources (e.g., a customer order or forecast, an interplant requirement, a branch warehouse request for a service part, or the manufacturing of another product). At the finished goods level, demand data is usually different from sales data because demand does not necessarily result in sales (i.e., If there is no stock, there will be no sale (Source: ASCM Supply Chain Dictionary, 17th edition)). Material demand may comprise multiple demand series by location and demand categories. When the term is written as one word (WeekBasedMaterialDemand), the term refers specifically to the respective aspect model.|
|Maximum Capacity|This is the highest achievable production capacity of a supplier within a given Calendar Week, in a certain unit of measure, for a specific customer. The maximum capacity is equal or higher than the actual capacity. It considers further capacity-increasing measures that have been planned upfront between the parties involved and can be activated whenever needed. Capacity-increasing measures can be, for example, a longer utilization of the available production resources, a shift extension or additional shifts. Secondarily, additional resources can also be activated.|
|Nesting|A method by which a capacity group links to another capacity group (instead to material demand series), allowing for dynamic changes and centralized data management. See also: linking material demand. Synonym: indirect linking|
|One-down|Synonym: “supplier”|
|One-up|Synonym: “customer”|
|Planning Horizon|The planning horizon is the amount of time a plan extends into the future (definition: ASCM Dictionary, 17th edition).|
|Post-production|Post-production means goods are produced LATER than the requested Calendar Week. This feature may be optionally applied by a supplier in the WeekBasedCapacityGroup. See also (Simulated) Delta-production.|
|Pre-production|Pre-production means goods are produced BEFORE the requested Calendar Week. This feature may be optionally applied by a supplier in the WeekBasedCapacityGroup. See also (Simulated) Delta-production.|
|Semantic Model|The semantic model is a conceptual model that represents the meaning of information within a specific context. It goes beyond the structure and syntax of data to define the relationships and rules that govern the properties of entities and the interactions between them. The goal of a semantic model is to capture the intended meaning of data so that it can be unambiguously understood, processed, and shared.|
|Supplier|A role within the DCM use case, which represents a company that supplies goods to its customers. Participating companies can have multiple roles at the same time. Suppliers provide consistent and up-to-date capacity data and receive demands from customers. Synonym: one-down.|
|Surplus|A surplus is a situation in which an oversupply exists. In the DCM context, it is often used to indicate a situation in which unutilized capacity exists. It is the contrary of a bottleneck. Synonym: idle capacity, excess capacity.|
|UUID|A UUID, which stands for Universally Unique Identifier, is a 128-bit number used to uniquely identify information in computer systems. The primary purpose of a UUID is to enable distributed systems to uniquely identify information without significant central coordination. In this way, anyone can create a UUID and use it to identify something with reasonable confidence that the identifier does not duplicate one that has already been, or will be, created to identify something else.|
|WeekBasedCapacityGroup|This term refers to the specific WeekBasedCapacityGroup object defined in this standard.|

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
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation
