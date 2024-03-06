---
sidebar_position: 1
title: Adoption View
---
## Agents KIT

<!--
 * Copyright (c) 2021,2024 T-Systems International GmbH
 * Copyright (c) 2021,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021,2023 Mercedes-Benz AG
 * Copyright (c) 2021,2023 ZF Friedrichshafen AG
 * Copyright (c) 2021,2023 SAP SE
 * Copyright (c) 2021,2024 Contributors to the Eclipse Foundation
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

![Agents Kit Banner](/img/knowledge-agents/AgentsKit-Icon.png)

This document describes the foundations of the (Knowledge) Agents KIT (=Keep It Together).

For more information see

* [Architecture](../development-view/architecture)
* [Deployment & Conformity](../operation-view/deployment)

### Vision & Mission

#### Vision

We want to specify a semantically-driven and state-of-the-art compute-to-data architecture for (not only) automotive use cases based on the best [GAIA-X](https://gaia-x.eu/), [W3C](https://www.w3.org/2001/sw/wiki/Main_Page) and [Big Data](https://en.wikipedia.org/wiki/Big_data) practices.

[![Agent-Oriented Dataspace](/img/knowledge-agents/dataspace_agent_small.png)](/img/knowledge-agents/dataspace_agent.png)

#### Mission

##### Specifications

We compose specifications for invoking and performing semantic computations (inferences or `skills`) based on normalized and linked data representations (`knowledge graph` described as RDF triples) over the `dataspace`.

Leveraging existing standards such as [IDS](https://internationaldataspaces.org/), [RDF](https://www.w3.org/2001/sw/wiki/RDF), [SparQL](https://www.w3.org/2001/sw/wiki/SPARQL), [OWL](https://www.w3.org/2001/sw/wiki/OWL), [SHACL](https://www.w3.org/2001/sw/wiki/SHACL) & [EClass](https://eclass.eu/), linked data and corresponding skills may be provisioned, consumed, federated and visualised across the complete dataspace (technically) and hence the complete supply chain (business-wise).

Skills can be described in tractable sub-languages of well-known declarative syntaxes, such as [SparQL](https://www.w3.org/2001/sw/wiki/SPARQL) (in the future maybe also: [GraphQL](https://en.wikipedia.org/wiki/GraphQL) and [SQL](https://en.wikipedia.org/wiki/SQL)).

##### Implementations

We provide open-source reference implementations of these standards to Tractus-X in particular extending the [Connector KIT](../../tractusx-edc/docs/kit/adoption-view/Adoption%20View)

These components are called [`agents`](https://en.wikipedia.org/wiki/Software_agent)) because they (semi-)actively negotiate and collaborate with each other (via so-called graph and skill assets) over the dataspace in order to derive higher-level semantic knowledge from the plain, isolated data.

Knowledge agents introduce an ecosystem of efficient services (for data handling, compute, skill orchestration and frontend components) where an optimal matchmaking between those services needs to be reached.

##### Support

We support use case consumers, app developers, data providers, service providers and IT/domain consultants in order to operate as economically and well-informed as possible by giving them first-class tools, documentation and feedback.

##### Technology Bridges

We define bridges to other digital twin approaches, such as AAS (Asset Administration Shell), such that data and service provisioning into multiple use cases will be as effortless as possible.

### Business Value

The Agents KIT is the best fit for use case and applications which

* do not focus on exchanging/analyzing static assets between two peers in the supply chain, but instead require crawling over a whole dynamic branch of the supply tree.
* do not focus on gaining predefined schemas of digital twins, but need to perform complex search and aggregations over both catalog and assets.
* require rapidly changing and extensible logic that should reuse existing assets which have already been built for other use cases.
* need to securely extract & aggregate knowledge from large amounts of assets and/or large assets.

As a dataspace participant, adopting the Agents KIT will

* allow you to easily bind your own data and services into the relevant use cases and applications
* give you the means to integrate your company-internal data sources with the dataspace as one big knowledge graph

The following advantages play an important role.

#### Widespread Standard

##### Isn't this a proprietary approach?

The underlying [API](https://en.wikipedia.org/wiki/API), protocols, standards and technologies are first-class citizens of the official [Gaia-X](https://gaia-x.eu/what-is-gaia-x/deliverables/data-spaces/) & [W3C Semantic Web](https://www.w3.org/standards/semanticweb/) portfolio.
These techs have been already adopted globally for a plethora of domains, use cases and derived (Open Source & commercial) projects.
Using these approaches will give you a competitive advantage which is even independent of the concrete dataspace instance/application that you are targeting at.

#### No Redundancy

##### Is this a replacement to the existing Aspect Meta Model (BAMM/SAMM) & Asset Administration Shell (AAS) approach?

Agent technology is a complement that means that both approaches can be deployed in co-existance.

There will be some use cases (large interconnected datasets, ad-hoc querying, inference of derived knowledge) which enfavour the knowledge agents approach, others (simple access to already identified remote twins) will more adequately stay with the BAMM/SAMM & AAS approach.

For the data providers, it will be easy to mount their artifacts (files, data source partitions, backend interfaces) under both types of assets (submodels, graphs). We provide [bridging technology](../development-view/aas/bridge) for that purpose.

For the app developers it will be easy to use both [SDK](https://en.wikipedia.org/wiki/Software_development_kit)s over a single consumer connector and even interchange the identifiers/[IRI](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)s.

For the modellers, there is only a loose coupling between a protocol-independent, inference-agnostic data format description, such as BAMM/SAMM, and a protocol-binding, but data-format independent inference/semantic model, such as OWL-R. We expect tools to generate at least the latter from ubiquitous Excel/Tabular specifications. We could also imagine a kind of OWL-R to BAMM/SAMM embedding (but not vice versa) once this is needed by a use case.

#### Enhanced Security

##### Isn't it inherently insecure to let arbitrary Dataspace tenants invoke ad-hoc computations in my backend?

First, these are not arbitrary tenants, but access is only given to business partners with whom you have signed contracts (and who appear in certain roles there).
A Skill request from a non-authorized chain of computation would not be able to enter your backend at all.

Furthermore, you would not expose your backend directly, but rather introduce a [virtualization layer](../development-view/architecture) between the Agent and your data source. This introduces another (role-based) security domain by appropriate sub-schemas and filters. So different contracts can be mapped to different security principals/data views in the backend.

We do not introduce arbitrary (turing-equivalent, hence undecidable) ad-hoc computations, but the [SPARQL](../development-view/sparql) standard introduces a well-defined set of operations whose effects and consequences can be checked and validated in advance (hypervision).

Finally, we are investigating a form of differential privacy which introduces noise between your data source and its graph representation such that original values can be effectively hidden from the reporting output.

#### Easy Deployment

##### Doesn't this impose additional burdens to the dataspace participants?

For data consumers, there is virtually nothing to do. All they have to care for is to add an Agent-Enabled data plane to their connector (or even use our Agent Plane as a fully-blown replacement for the Http/AmazonS3 standard of Tractus-X).

For smaller data and skill providers, there will be the possibility to host non-critical data directly through the storage facilities of the Agent Plane.

For all others, they will employ techniques for data virtualization anyway to scale and shield their critical data. That is where the binding agents as one additional container/layer that is declaratively described (not: programmatically) come into play.

#### Great Scalability

##### How could such a scheme be efficient at all

Our technology has been thoroughly developed, tested and piloted over the years 2022 and 2023. One key component is the ability of any Agent to delegate
a part of its work to other Business Partners/Agents and hence to bring the computations close to the actual data. This delegation pattern has several very nice properties:

* Delegation is dynamic based on the supply chain(s) that are described in the actual data. So the actual computation chain optimizes with the data.
* Delegation is parallelized in the sense that several suppliers are requested simultaneously. Latency is hence minimized.
* Delegation may be opaque from the consumer view if contracts require so.

### Use Cases

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

The Agents KIT is the basis for other, use-case specific Agent-enabled KITs, services and applications, such as the [Behaviour Twin Remaining Useful Life (RUL Kit](/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Adoption%20View%20Remaining%20Useful%20Life%20Kit)

We distinguish between Dataspace Participants and other parties (who support the Dataspace Participants).

#### Dataspace Participants

The following stakeholders should [deploy](../operation-view/deployment) modules/artifacts of the Agents Kit.
In particular, each Dataspace Participant needs an [Agent-Enabled Connector](../operation-view/agent_edc).

##### Consumer

Any party who wants to use data and logic using Agent Technology (for example by employing Agent-Enabled Applications or Services), such as a Recycling Company or a Fleet Manager

##### Provider

We distinguish Providers whether they want to publish data or logic using Agent Technology

###### Data Provider

Any party who provides data (for example by a backend database or other Agent-enabled Applications or Services), for example an Automotive OEM (original equipment manufacturer)

###### Function Provider

Any party who provides proprietary functions (for example by a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint or other Agent-enabled Applications or Services), for example a Tier1 Sensor Device Supplier

###### Skill (=Compute) Provider

Any party who provides compute resources and/or procedural logic (for example by a server or other Agent-enabled Applications or Services), for example a Recycling Software Specialist

###### Core Service Provider

Any party offering ontology models (semantic/ontology hub) or federated catalogues, for example an Operating Company

#### Additional Stakeholders

The following stakeholders should [interface or implement](../development-view/architecture) modules of the Agents Kit.

##### Business Developer

Any party who publishes an Application, Standard or KIT based on Agent Technology on behalf of a Dataspace Participant (e.g. a Fleet Monitor, an Incident Reporting Solution, a Telematics KIT)

##### Enablement Service Developer

Any party who offers ready-made artifacts, packages and managed services assisting Dataspace Participants/Applications to process data using Agent technology (e.g. a Graph Database, a Virtual Graph Binding Engine, an EDC Package)

### Catena-X Standards

The concrete choices for how the data graphs are to be constructed (using the [Resource Description Framework](https://www.w3.org/RDF/)), how Skills are to be interpreted (using the [SPARQL](https://www.w3.org/TR/sparql11-query/) language) and which vocabulary should be applied by both approaches (using the [Web Ontology Language](https://www.w3.org/OWL/) (OWL)) is subject of the following two [Catena-X e.V. Standards](https://catena-x.net/de/standard-library):

* [CX-0084 Federated Queries in Dataspaces (V1.1.0 Upcoming)](https://catena-x.net/de/standard-library)
* [CX-0084 Federated Queries in Dataspaces (V1.0.0 Superseded)](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September_2023/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.pdf)
* [CX-0067 Ontology Models to Realize Federated Queries in Catena-X  (V1.0.0 Upcoming)](https://catena-x.net/de/standard-library)

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

* SPDX-License-Identifier: CC-BY-4.0
* SPDX-FileCopyrightText: 2021,2023 T-Systems International GmbH
* SPDX-FileCopyrightText: 2021,2023 Mercedes-Benz AG
* SPDX-FileCopyrightText: 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
* SPDX-FileCopyrightText: 2021,2023 ZF Friedrichshafen AG
* SPDX-FileCopyrightText: 2021,2023 SAP SE
* SPDX-FileCopyrightText: 2022,2023 Contributors to the Eclipse Foundation
