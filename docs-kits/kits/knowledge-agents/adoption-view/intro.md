---
sidebar_position: 1
title: Adoption View
---
## Agents KIT

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

![Agents Kit Banner](/img/knowledge-agents/AgentsKit-icon.png)

This document describes the foundations of the (Knowledge) Agents KIT (=Keep It Together).

For more information see

* Our [Use Case](usecase) description
* A [Business Value](value) list
* The [CX-0084 Federated Queries in Data Spaces](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [CX-00XX Ontology Models in Catena-X](https://github.com/catenax-ng/product-knowledge/blob/feature/ART3-382-documentation/docs/adoption-view/CX-00XX-Ontology%20Models%20in%20Catena-X_v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment & Conformity](../operation-view/deployment) guide

## Basic Technology

### Dataspace

[Data Spaces](https://en.wikipedia.org/wiki/Dataspaces) (short: dataspaces) can be seen as one of the most promising technologies for sovereign data exchange between companies or company divisions.
They foster new use cases and collaboration scenarios which were not possible before.
Furthermore, they can be used to streamline and digitize existing processes for more efficient data handling.

### GAIA-X

[Gaia-X](https://gaia-x.eu/what-is-gaia-x/deliverables/data-spaces/) defines a reference architecture for dataspaces, with focus on (1) interoperability and (2) portability of data and service, (3) sovereignty over data, and (4) security and trust to achieve a decentralized, federated and open ecosystem.

### Eclipse Tractus-X

[![Basic Dataspace Technology](/img/knowledge-agents/dataspace_small.png)](/img/knowledge-agents/dataspace.png)

[Eclipse Tractus-X](https://eclipse-tractusx.github.io/) is the reference implementation of that concept that is brought forward by the [Catena-X](http://catena-x.net) association.
It relies on a Peer-to-Peer networking approach where each Business Partner (Consumer or Provider) has a [Connector](https://github.com/eclipse-edc/Connector) which can securely transfer data in the form of files and service calls (payloads) according to mutual contracts. File meta-data, their intrinsic format and the download protocol are standardized using a [Digital Twin Standard](https://industrialdigitaltwin.org/).

For more information, see the [Connector Kit](https://eclipse-tractusx.github.io/docs/category/connector-kit)

## Federated Operations through Agents

In many cases, the standardized transfer of data may already be enough to create value (e.g. exchange precomputed product carbon footprints across a supply chain).

However, other use cases such as the joint prediction of the behaviour of a complex machine that does not even exists but is developed by a team of collaborating companies, require more advanced solutions.

These are solutions in which data and information is federated into a multi-directional semantic context.

### Agent

Simply put, an [Agent](https://en.wikipedia.org/wiki/Software_agent) is an extension/companion to the Connector that allows to transfer Business Logic instead of raw data payloads.

[![Agent-Oriented Dataspace](/img/knowledge-agents/dataspace_agent_small.png)](/img/knowledge-agents/dataspace_agent.png)

### Skill

Using her/his agent, a Consumer can invoke a [Skill](https://en.wikipedia.org/wiki/Amazon_Alexa) (a kind of Stored Procedure in a standardized Scripting/Query Language) which is then executed
distributedly in the Dataspace.

### Binding and Delegation

At the Provider side, the Agent [binds](https://en.wikipedia.org/wiki/Data_binding) to data lakehouses and other backend systems by translating the Skill into native SQL queries or REST API calls.
Agents may [delegate](https://en.wikipedia.org/wiki/Delegation_(computing)) a part of their work (sub-skills) to other Agents/Business Partners based on data ownership and using recursive dataspace contracts/policies.

### Batch Extraction of Knowledge

A Skill typically simultaneously computes over large [batches](https://en.wikipedia.org/wiki/Batch_processing) of entities (here: digital twins) and extracts high-quality but low-bandwidth result payloads (reports, lists, aggregations; in general: [Knowledge](https://en.wikipedia.org/wiki/Knowledge_extraction)).

### Federated Graph

We expect that the raw data for extracting the knowledge from using Skills is organized in a high-degree normal form called a [graph](https://en.wikipedia.org/wiki/Knowledge_graph).

Knowledge Graphs can be regarded as sets of (Subject-Node, Predicate-Edge, Object-Node) triples.

Since the raw data is never copied but rather traversed by the Skill Bindings, the Dataspace hence becomes a [federated](https://en.wikipedia.org/wiki/Federated_database_system) or virtual knowledge graph.

## Catena-X Standard and KITs

The concrete choices for how the data graphs are to be constructed (using the [Resource Description Framework](https://www.w3.org/RDF/)), how Skills are to be interpreted (using the [SPARQL](https://www.w3.org/TR/sparql11-query/) language) and which vocabulary should be applied by both approaches (using the [Web Ontology Language](https://www.w3.org/OWL/) (OWL)) is subject of the following two [Catena-X e.V. Standards](https://catena-x.net/de/standard-library):

- [CX-0067 Ontology Models in Catena-X](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September_2023/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.pdf)
- CX-0084 Federated Queries in Dataspaces (Upcoming)

This Agents KIT bundles a set of FOSS (Free and Open-Source Software) reference implementations of this standard following the Eclipse Tractus-X guidelines.

If you employ any of our artifacts and/or follow our blueprints, you will be eligible for compliance to a respective Catena-X release. Appropriate assessment criteria and methods have been established as a part of the Agent standard.

The Agents KIT is depending on the [Connector Kit](https://eclipse-tractusx.github.io/docs/category/connector-kit)

The Agents KIT is the basis for other, use-case specific Agent-enabled KITs, services and applications, such as the [Behaviour Twin Remaining Useful Life (RUL Kit](/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Adoption%20View%20Remaining%20Useful%20Life%20Kit)

## Abstract Use Case

We distinguish between Dataspace Participants and other parties (who support the Dataspace Participants).

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

### Dataspace Participants

The following stakeholders should [deploy](../operation-view/deployment) modules/artifacts of the Agents Kit.
In particular, each Dataspace Participant needs an [Agent-Enabled Connector](../operation-view/agent_edc).

#### Consumer

Any party who wants to use data and logic using Agent Technology (for example by employing Agent-Enabled Applications or Services), such as a Recycling Company or a Fleet Manager

#### Provider

We distinguish Providers whether they want to publish data or logic using Agent Technology

##### Data Provider

Any party who provides data (for example by a backend database or other Agent-enabled Applications or Services), for example an Automotive OEM (original equipment manufacturer)

##### Function Provider

Any party who provides proprietary functions (for example by a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint or other Agent-enabled Applications or Services), for example a Tier1 Sensor Device Supplier

##### Skill (=Compute) Provider

Any party who provides compute resources and/or procedural logic (for example by a server or other Agent-enabled Applications or Services), for example a Recycling Software Specialist

##### Core Service Provider

Any party offering ontology models (semantic/ontology hub) or federated catalogues, for example an Operating Company

### Additional Stakeholders

The following stakeholders should [interface or implement](../development-view/architecture) modules of the Agents Kit.

#### Business Developer

Any party who publishes an Application, Standard or KIT based on Agent Technology on behalf of a Dataspace Participant (e.g. a Fleet Monitor, an Incident Reporting Solution, a Telematics KIT)

#### Enablement Service Developer

Any party who offers ready-made artifacts, packages and managed services assisting Dataspace Participants/Applications to process data using Agent technology (e.g. a Graph Database, a Virtual Graph Binding Engine, an EDC Package)

## Why should I Adopt Agent Technology?

### Widespread Standard

#### Isn't this a proprietary approach?

The underlying [API](https://en.wikipedia.org/wiki/API), protocols, standards and technologies are first-class citizens of the official [Gaia-X](https://gaia-x.eu/what-is-gaia-x/deliverables/data-spaces/) & [W3C Semantic Web](https://www.w3.org/standards/semanticweb/) portfolio.
These techs have been already adopted globally for a plethora of domains, use cases and derived (Open Source & commercial) projects.
Using these approaches will give you a competitive advantage which is even independent of the concrete dataspace instance/application that you are targeting at.

### No Redundancy

#### Is this a replacement to the existing Aspect Meta Model (BAMM/SAMM) & Asset Administration Shell (AAS) approach?

Agent technology is a complement that means that both approaches can be deployed in co-existance. 

There will be some use cases (large interconnected datasets, ad-hoc querying, inference of derived knowledge) which enfavour the knowledge agents approach, others (simple access to already identified remote twins) will more adequately stay with the BAMM/SAMM & AAS approach.

For the data providers, it will be easy to mount their artifacts (files, data source partitions, backend interfaces) under both types of assets (submodels, graphs). We provide [bridging technology](../development-view/aas/bridge) for that purpose.

For the app developers it will be easy to use both [SDK](https://en.wikipedia.org/wiki/Software_development_kit)s over a single consumer connector and even interchange the identifiers/[IRI](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)s.

For the modellers, there is only a loose coupling between a protocol-independent, inference-agnostic data format description, such as BAMM/SAMM, and a protocol-binding, but data-format independent inference/semantic model, such as OWL-R. We expect tools to generate at least the latter from ubiquitous Excel/Tabular specifications. We could also imagine a kind of OWL-R to BAMM/SAMM embedding (but not vice versa) once this is needed by a use case.

### Enhanced Security

#### Isn't it inherently insecure to let arbitrary Dataspace tenants invoke ad-hoc computations in my backend?

First, these are not arbitrary tenants, but access is only given to business partners with whom you have signed contracts (and who appear in certain roles there).
A Skill request from a non-authorized chain of computation would not be able to enter your backend at all.

Furthermore, you would not expose your backend directly, but rather introduce a [virtualization layer](../development-view/architecture) between the Agent and your data source. This introduces another (role-based) security domain by appropriate sub-schemas and filters. So different contracts can be mapped to different security principals/data views in the backend.

We do not introduce arbitrary (turing-equivalent, hence undecidable) ad-hoc computations, but the [SPARQL](../development-view/sparql) standard introduces a well-defined set of operations whose effects and consequences can be checked and validated in advance (hypervision).

Finally, we are investigating a form of differential privacy which introduces noise between your data source and its graph representation such that original values can be effectively hidden from the reporting output.

### Easy Deployment

#### Doesn't this impose additional burdens to the dataspace participants?

For data consumers, there is virtually nothing to do. All they have to care for is to add an Agent-Enabled data plane to their connector (or even use our Agent Plane as a fully-blown replacement for the Http/AmazonS3 standard of Tractus-X).

For smaller data and skill providers, there will be the possibility to host non-critical data directly through the storage facilities of the Agent Plane.

For all others, they will employ techniques for data virtualization anyway to scale and shield their critical data. That is where the binding agents as one additional container/layer that is declaratively described (not: programmatically) come into play.

### Great Scalability

#### How could such a scheme be efficient at all

Our technology has been thoroughly developed, tested and piloted over the years 2022 and 2023. One key component is the ability of any Agent to delegate
a part of its work to other Business Partners/Agents and hence to bring the computations close to the actual data. This delegation pattern has several very nice properties:

* Delegation is dynamic based on the supply chain(s) that are described in the actual data. So the actual computation chain optimizes with the data.
* Delegation is parallelized in the sense that several suppliers are requested simultaneously. Latency is hence minimized.
* Delegation may be opaque from the consumer view if contracts require so.

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
