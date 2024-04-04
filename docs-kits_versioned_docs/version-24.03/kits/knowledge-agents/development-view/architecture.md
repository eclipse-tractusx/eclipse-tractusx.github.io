---
sidebar_position: 1
title: High-Level Architecture
---
<!--
 * Copyright (c) 2021,2023 T-Systems International GmbH
 * Copyright (c) 2021,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021,2023 Mercedes-Benz AG
 * Copyright (c) 2021,2023 ZF Friedrichshafen AG
 * Copyright (c) 2021,2023 SAP SE
 * Copyright (c) 2021,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This documentation and the accompanying materials are made available under the
 * terms of the Creative Commons Attribution 4.0 International License,  which is available at
 * https://creativecommons.org/licenses/by/4.0/legalcode.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: CC-BY-4.0
-->

### Agents KIT

![Agents Kit Banner](/img/knowledge-agents/AgentsKit-Icon.png)

This document describes the High-Level Architecture of the (Knowledge) Agents KIT (=Keep It Together).

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [ARC42](Arc42) documentation
* An [API](api) specification
* The [Layers & Modules](modules) Architecture
* Our [Reference Implementation](reference)
* The [Deployment](../operation-view/deployment) guide

## Compute-To-Data

The main objective concerning the approach described in this section is to create a state-of-the-art compute-to-data architecture for automotive use cases (and beyond) based on standards and best practices around [GAIA-X](https://gaia-x.eu), [W3C](https://www.w3.org/) and [Big Data](https://en.wikipedia.org/wiki/Big_data). To reach this aim, full semantic integration, search and query with focus on relations between entities and data sovereignty is focused. In contrast to a simple file-based data transfer, this shifts the responsibility for the (I) access, (II) authorization to the data and (III) processing of the data from the application development to the provider and hence ultimately, the actual owner of the data. Figure 2 shows the high-level approach, introducing the most important concepts needed for the realization.

[![Architecture Interaction](/img/knowledge-agents/architecture_small.png)](/img/knowledge-agents/architecture.png)

### App

The App in the figure serves the Consumer by gathering, analyzing, and presenting the knowledge about business questions such as: How much of a certain material can be found in a different vehicle series? It is assumed that the data which is needed to answer such questions is distributed over the network and cannot be found at one central place.

### Skill

To help collecting the data over the network, Skills are introduced. A Skill is a pre-formulated query (or: procedure) with limited scope such as: List all vehicle series that contain ?material produced in ?location. The Skill is used to access all federated data instances via the tenant (=authentication and authorization scope) of the caller. A skill receives input in the form of a data set [{?material:“Rubber”,?location:“Phuket”}] which drives the control flow, the filtering and aggregating  of the information, and finally producing an output data set [{?series:<4711>,?oem:&lt;OEM&gt;,?weightKg:”3.2”},{?series:&lt;0815&gt;,?oem:&lt;EMO&gt;, ?weightKg:”1.4”}]}.

### Semantic Model

In order to obtain the correct results in a federated system, all the participants of the skill execution need to have common understanding (Semantic Model, in KA this is mechanized by a Federated Catalogue based on the Web Ontology Language  OWL) over the vocabulary (Data Model, in KA this is represented generically by sets, i.e., graphs of Resource Description Framework RDF triples). Relying on these conventions, a Skill executor can calculate which Providers are able to contribute or yield the necessary information in which sequence such that the resulting distributed operation will be performant.

### Matchmaking Agent

This coordinating job is taken over by the Matchmaking Agent, an endpoint that is mandatory for any KA-enabled Dataspace Participant. For that purpose, the Matchmaking Agent supports the [SPARQL](https://en.wikipedia.org/wiki/SPARQL) specification with the effect that the dataspace can be traversed as one large data structure. Hereby, the Consumer-Side Matchmaking Agent will – as driven by the builtin federation features of SPARQL - interact with the KA-enabled EDC in order to negotiate and perform the transfer of Sub-Skills (=SPARQL Contexts) to other Dataspace Participants. See the [Knowledge Agents SPARQL API](api) for detailed information.

### Binding Agent

In turn, upon successful transfer of the Sub-Skill, the Provider-Side Matchmaking Agent(s) will be activated by their respective EDC. Prior to such a success, the Provider EDC of course first needs to offer a so-called Graph Asset: Graph Assets are a variant of ordinary Data Assets in the Catena-X EDC Standard; while Data Asset typically refer to an actual backend system (e.g., an Blob in an ObjectStorey, an AAS server, a REST endpoint), Graph Assets introduce another intermediary instance, the so-called Binding Agent.

Simply put, the Binding Agent is a restricted version of the Matchmaking Agent (subset of OWL/SPARQL, e.g., without federation) which is just focused on translating Sub-Skils of a particular business domain (Bill-Of-Material, Chemical Materials, Production Sites, etc.)  into proper SQL- or REST based backend system calls. This scheme has several advantages:

* For different types of backend systems, business domains and usage scenarios, different Binding Agent implementations (Caching Graph Store, SQL Binding Engine, REST Binding Engine) can be switched-in without affecting both the shared dataspace/semantic model and the mostly immutable backend systems/data models as well.
* Access to the backend systems can be optimized by JIT compilation technology.
* The same backend system/data model can be used in various Graph Assets/Use Cases und different roles and policies.
* Access to the backend system is decoupled by another layer of security, such that additional types of policies (role-based row-level and attribute-level access) can be implemented in the interplay of Matchmaking and Binding Agents.
* There is a clear distinction between advanced graph operations (including type inference and transitive/recursive traversal also via EDC) on the Matchmaking Level and efficient, but more restricted and secure graph operations on the Binding/Data Level.

### Federated Catalogue

As mentioned earlier, essential for the realization of the idea is the creation, governance and discoverability of a well-defined semantic catalogue, which forms together with the data a Federated Knowledge Graph. In this context, the definition of a Knowledge Graph (KG) as "a multi relational graph composed of entities and relations which are regarded as nodes and different types of edges, respectively" is extended with aspect of federation. We see a Federated KG as a KG where entities and relations reside physically distributed over multiple systems connected through a network and a common query language. We see semantic metadata as structural information to scope the entities and relations of the KG based on ontological principles. This is the agreement, necessary for the successful interplay of the distributed parties within the data space.

## Abilities

To summarize, the Knowledge Agent standard shall achieve the following abilities:

* the ability to define well-formed and composable computations/scripts (skills) which operate over various assets of various business partners.
* the ability to invoke and dynamically distribute these (sub-)skills over the relevant partners/connectors using an extensible agent interface.
* the ability to safely provide data and service assets via appropriate agent implementations which "bind" the skill to the backend execution engines (rather than mapping data).
* the ability for an agent/connector/business partner to decide
  * whether to hide particular data and computations inside a sub-skill
  * whether to delegate/federate particular computations/sub-skills to other agents
  * whether to migrate or clone an agent/asset from a partner
* the ability to describe data and service assets as well as appropriate federation policies in the IDS vocabulary in order to allow for a dynamic matchmaking of skills and agents.
* the ability to define domain/use case-based ontologies which form the vocabulary used in the skill definitions.
* the ability to visualize and develop the ontologies and skills in appropriate SDKs and User Experience components.

With these abilities, the Knowledge Agent standard provides the following value propositions:

## Democratization of added value service design for data spaces

Currently, the development of full-scale Apps to address use cases for cross-company exchange requires a lot of development effort. By proceeding this way, addressing new business problems or fast prototyping of solution ideas are not straightforward to achieve. Thus, the idea of a fast-growing ecosystems based on data exchange between companies is at risk. KA introduces Skills as a new concept to support query of data spaces with small effort. A new Skill can be developed in few days in comparison to weeks or months for app development. In this context it is aimed that data consumers are able to create skills by themselves based on their very specific business demand.

[![Architecture Modules and Parties](/img/knowledge-agents/modules_roles_small.png)](/img/knowledge-agents/modules_roles.png)

In addition, a third party in addition to Consumer and (Data, Function) Provider can be imagined: The Skill provider (see Figure 3). Similar to an App Provider, the Skill Provider develops queries to address various business problems. Developed Skills can be offered as Skill Assets over the dataspace and in the Marketplace, quite similar to the existing Services and Apps.

It is also possible to combine Skill and App development (by using Skills as stored procedures in the App framework). By following this approach App developers can concentrate on frontend optimization and usability of the app while the skills deliver the business relevant information.

## Custom Search

Based on the skill concept, mighty search functionalities can be realized by utilizing the KA approach. SPARQL is already a common standard to browse large data catalogues (e.g. Wikidata). By utilizing this principle, it becomes possible to search for objects which are unknown at the beginning of the search (similar to Google). This advantage is important since comparable twin-based approaches for the semantic layer require a specific ID to find an object.

## Scalability for data consumers

Utilization of dataspaces for exchanging complex product- or production data usually involves transfer of large datasets. If for example an automotive OEM wants to access information of their car fleets ranging from hundreds to millions of cars, the dataspace still needs to provide required data in short time without risking too much load on the network. Thus, the outlined approach is based on efficient federated SPARQL queries which only transport computation results across the network in contrast to full datasets (compute to data). Further potentials for streamlining performance are for example parallelized EDC contract negotiations and efficient delegations between suppliers.

## Data Sovereignty

One of the key requirements for dataspaces is to guarantee that data is only shared willingly and subject to specific terms and conditions of respective data providers. One core component to support definition and negotiation of contracts and policies is the Eclipse Dataspace Connector (EDC). Nevertheless, the way how data is processed via a semantic layer also contributes to data sovereignty. KA follows a strict compute to data approach. Thus, by design only computation results are shared instead of copying all data relevant for this computation (e.g. submit only weight information instead of geometry and material information). Furthermore, by utilizing data models based on ontologies definition of access rights can be made up to a high level of granularity (attribute level).

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
