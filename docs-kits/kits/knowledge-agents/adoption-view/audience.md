---
sidebar_position: 2
title: Target Audience
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
This document describes the audience of the (Knowledge) Agents KIT (=Keep It Together).

For more information see

* Our [Introduction](intro) manifest
* Our [Frequently Asked Question](faq) list
* The [CX-0084 Federated Queries in Data Spaces](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [CX-00XX Ontology Models in Catena-X](https://github.com/catenax-ng/product-knowledge/blob/feature/ART3-382-documentation/docs/adoption-view/CX-00XX-Ontology%20Models%20in%20Catena-X_v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

We distinguish between Dataspace Participants and other parties (who support the Dataspace Participants).

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

## Dataspace Participants

The following stakeholders should [deploy](../operation-view/deployment) modules/artifacts of the Agents Kit.
In particular, each Dataspace Participant needs an [Agent-Enabled Connector](../operation-view/agent_edc).

### Consumer

Any party who wants to use data and logic using Agent Technology (for example by employing Agent-Enabled Applications or Services), such as a Recycling Company or a Fleet Manager

### Provider

We distinguish Providers whether they want to publish data or logic using Agent Technology

#### Data Provider

Any party who provides data (for example by a backend database or other Agent-enabled Applications or Services), for example an Automotive OEM (original equipment manufacturer)

#### Function Provider

Any party who provides proprietary functions (for example by a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint or other Agent-enabled Applications or Services), for example a Tier1 Sensor Device Supplier

#### Skill (=Compute) Provider

Any party who provides compute resources and/or procedural logic (for example by a server or other Agent-enabled Applications or Services), for example a Recycling Software Specialist

#### Core Service Provider

Any party offering ontology models (semantic/ontology hub) or federated catalogues, for example an Operating Company

## Additional Stakeholders

The following stakeholders should [interface or implement](../development-view/architecture) modules of the Agents Kit.

### Business Developer

Any party who publishes an Application, Standard or KIT based on Agent Technology on behalf of a Dataspace Participant (e.g. a Fleet Monitor, an Incident Reporting Solution, a Telematics KIT)

### Enablement Service Developer

Any party who offers ready-made artifacts, packages and managed services assisting Dataspace Participants/Applications to process data using Agent technology (e.g. a Graph Database, a Virtual Graph Binding Engine, an EDC Package)

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
