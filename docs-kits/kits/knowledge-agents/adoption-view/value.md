---
sidebar_position: 3
title: Business Value
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
This document describes the business value of the (Knowledge) Agents KIT (=Keep It Together) by means of frequently asked questions.

For more information see

* Our [Introduction](intro) manifest
* Our [Use Case](usecase) description
* The [CX-0084 Federated Queries in Data Spaces](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [CX-00XX Ontology Models in Catena-X](https://github.com/catenax-ng/product-knowledge/blob/feature/ART3-382-documentation/docs/adoption-view/CX-00XX-Ontology%20Models%20in%20Catena-X_v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

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
