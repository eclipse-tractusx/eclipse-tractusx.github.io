---
id: glossary
title: Glossary
description: Glossary
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## DCM Glossary

|Term|Description|
|----|-----------|
|Actual Capacity|This is the capacity a supplier realistically plans to have available to produce a certain amount of material per week for a customer. It takes into account the supplier's own assessment of their capabilities, inventory and existing commitments.|
|Agreed Capacity|May be coordinated between customer and supplier. Can be used to document a capacity agreed in a contract. The agreed capacity must not constitute a legal obligation to deliver (as this would need to be done e.g. in a contract outside Catena-X DCM). Using the agreed capacity is optional and has purely informative character. The agreed capacity may be greater than, less than or equal to the actual or maximum capacity of the supplier. It may be used for a time frame shorter than the whole time series.|
|API|Application Programming Interface is a set of rules, protocols, and tools for building software and applications. Examples for DCM can be found here: [Development View - APIs utilized by a DCM application](../software-development-view/overview.md#apis-utilized-by-a-dcm-application)|
|Aspect Model|An Aspect model is a structured, machine-readable description of data. It utilizes the Turtle file format to serialize a Resource Description Framework (RDF) graph, that relates to a specific aspect. It must follow the Semantic Aspect Meta Model (SAMM) guidelines, meaning it uses defined elements and rules from SAMM. Aspect models help to clarify the meaning of data at runtime and should link to standardized business glossary terms, if available. See: [CX-0002 Digital Twins in Catena-X][StandardLibrary]|
|Bottleneck|A facility, function, department, or resource whose capacity is less than the demand placed upon it. For example, a bottleneck machine or work center exists where jobs are processed at a slower rate than they are demanded (Source: ASCM Supply Chain Dictionary, 17th edition).|
|Business Application Provider|Typically, it is a third party that offers tools to data consumers and data providers for demand and capacity management purposes that conform to the core business logic, data models and APIs described in the Catena-X DCM standard.|
|Business Partner Number Legal Entity (BPNL)|A BPNL is an unique identifier for a company or partner within the Catena-X network. See: [CX-0010 Business Partner Number][StandardLibrary]|
|Business Partner Number Site (BPNS)|A BPNS is an unique identifier for a specific location, such as a factory, within the Catena-X network. See: [CX-0010 Business Partner Number][StandardLibrary]|
|Calendar Week|A week consisting of seven days, typically numbered according to the week containing the year’s first Thursday. For example, if the first Thursday of the year is on January 1st, that week is considered Week 1.|
|Capacity|1. The capability of a system to perform its expected function. 2. The capability of a worker, machine, work center, plant, or organization to produce output per time period. (Source: ASCM Supply Chain Dictionary, 17th edition).|
|Capacity Group|A capacity group is a virtual entity that contains capacity information, which depend on production capabilities (based e.g. on grouping of one or more machines, plants, production lines or similar), as well as the material demands linked to it. The capacity group is the place where demand and capacity information come together and are compared, in order to recognize production bottlenecks and/or surplus. When written as WeekBasedCapacityGroup, it refers to a specific data model within this standard.|
|Comment|A feature that allows two business partners to exchange messages about material demand and capacity, facilitating direct collaboration and quick issue resolution.|
|Comments|These are purely text-based exchanges without the transfer of documents or attachments.|
|Customer|A role within the DCM use case, which represents a company that receives goods from its suppliers. Participating companies can have multiple roles at the same time: in this context, a customer provides consistent and up-to-date demand forecast to and receives capacity data from suppliers. Synonym: one-up.|
|Data Consumer|A data consumer refers to any entity that retrieves and uses data from a source. This can be an individual, application, or system that accesses and processes data for various purposes or simply in context of Catena-X receiving data from a business partner.|
|Data Provider|A data provider is an entity that supplies or makes data available to others. In case of Catena-X, this can be a business partner supplying information. In the context of information technology and data management, a data provider can be a database, a web service, an API, a file system, or any other system that allows data to be accessed by data consumers.|
|Delta-Production|This is an optional feature that allows suppliers to manage capacity bottlenecks by shifting demand from one week to another in production without altering actual capacity, maximum capacity or the material demand. See also pre-/post-production.|
|Demand Deviation|This is an optional metric that allows suppliers to monitor changes in customer demands and to identify significant changes that can collaboratively be addressed by suppliers and customers.|
|Demand Volatility|Demand Volatility help suppliers to identify and measure volatility in demands. It allows them to address demand volatility directly to their customers, increasing transparency for a more effective collaborative capacity planning. Demand deviation is the first metric for measuring demand volatility.|
|Digital Twin|Based on [[CX-0002](#71-normative-references)] Standard a digital twin (DT) describes a digital representation of an asset sufficient to meet the requirements of a set of use cases. For detailed information please refer to [[CX-0002](#71-normative-references)] Digital Twins in Catena-X.|
|Flexible Capacity|The difference between maximum and actual capacity, representing the potential to increase capacity without further agreements, such as extending the use of production resources within a week. In particular, it refers to measures to extend the weekly utilization of the available production resources.|
|JSON|The JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transferring data in web applications (e.g. sending some data from the server to the client, so it can be displayed on a web page, or vice versa).|
|Linking Material Demand|Material demands can be linked directly to a capacity group or indirectly through another capacity group, which is known as “Nesting.”|
|Load Factor|An optional feature of a capacity group that adds individual numerical material load factors to WeekBasedMaterialDemand linked by the WeekBasedCapacityGroup. It adds flexibility to the unit of measure of the capacity group.|
|Material|The elements, constituents, or substances of which something is composed or can be made of. Usually referred to by a material number.|
|(Material) Demand|A need for a particular product or component. The demand could come from any number of sources (e.g. a customer order or forecast, an interplant requirement, a branch warehouse request for a service part, or the manufacturing of another product). At the finished goods level, demand data is usually different from sales data, because demand does not necessarily result in sales (e.g. if there is no stock, there will be no sale (Source: ASCM Supply Chain Dictionary, 17th edition)). Material demand may comprise multiple demand series by location and demand categories. When the term is written as one word (WeekBasedMaterialDemand), the term refers specifically to the respective aspect model.|
|Maximum Capacity|Is the maximum releasable capacity of a supplier which should be possible to achieve a material output per calendar week with a certain unit of measure for one customer. The maximum capacity is based on capacity-increasing measures, agreed by the parties involved. Capacity-increasing measures can be, for example, a longer utilization of the available production resources, a shift extension or additional shifts. Secondarily, additional resources can also be activated.|
|Nesting|A method by which a capacity group links to another capacity group (instead to material demand series), allowing for dynamic changes and centralized data management. See also: linking material demand. Synonym: indirect linking|
|One-down|Synonym: “supplier”|
|One-up|Synonym: “customer”|
|Planning Horizon|The planning horizon is the amount of time a plan extends into the future (definition: ASCM Dictionary, 17th edition).|
|Post-production|Post-production means goods are produced LATER than the requested calendar week. This feature may be optionally applied by a supplier in the WeekBasedCapacityGroup. See also (Simulated) Delta-Production.|
|Pre-production|Pre-production means goods are produced BEFORE the requested calendar week. This feature may be optionally applied by a supplier in the WeekBasedCapacityGroup. See also (Simulated) Delta-Production.|
|Semantic Model|The semantic model is a conceptual model that represents the meaning of information within a specific context. It goes beyond the structure and syntax of data to define the relationships and rules that govern the properties of entities and the interactions between them. The goal of a semantic model is to capture the intended meaning of data so that it can be unambiguously understood, processed, and shared.|
|Supplier|A role within the DCM use case, which represents a company that supplies goods to its customers. Participating companies can have multiple roles at the same time. Suppliers provide consistent and up-to-date capacity data and receive demands from customers. Synonym: one-down.|
|Surplus|A surplus is a situation in which an oversupply exists. In the DCM context, it is often used to indicate a situation in which unutilized capacity exists. It is the contrary of a bottleneck. Synonym: idle capacity, excess capacity.|
|UUID|A UUID, which stands for Universally Unique Identifier, is a 128-bit number used to uniquely identify information in computer systems. The primary purpose of a UUID is to enable distributed systems to uniquely identify information without significant central coordination. In this way, anyone can create a UUID and use it to identify something with reasonable confidence that the identifier does not duplicate one that has already been, or will be, created to identify something else.|
|WeekBasedCapacityGroup|This term refers to the specific WeekBasedCapacityGroup object defined in the DCM standard.|
|WeekBasedMaterialDemand|This term refers to the specific WeekBasedMaterialDemand object defined in the DCM standard.|

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 BASF SE
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2024 SAP SE
- SPDX-FileCopyrightText: 2024 SupplyOn AG
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/overview
