---
sidebar_position: 1
title: Deployment
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

![Agents Kit Banner](@site/static/img/knowledge-agents/AgentsKit-icon.png)

This document describes the deployment of the (Knowledge) Agents KIT (=Keep It Together) depending on the role that the respective tenant/business partner has.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [(Data/Function) Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed
* A [Data Sovereignity & Graph Policy](policy) discussion


## Motivation & Deployment Roles

Knowledge Agents is a federated technology, so there is no central component setup to take into account.
Instead, the Semantic Dataspace is formed by the individual business partners extending/configuring their
connectors and enabling their backend systems and/or datalakes. The deployment depends hereby on the
role that the business partner takes. The roles are described in more detail in our [Adoption](../adoption-view/intro) guideline.

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

## Role: As A Consumer

As a consumer, you just need to:

* enable your [dataspace connector](agent_edc) to initiate/delegate the required Agent protocols (here: SparQL-over-Http).
* (optionally) mount your connector/matchmaking agent as a remote repository into your enterprise graph infrastructure.

## Role: As A Skill Provider

As a skill provider, you need to

* enable your [dataspace connector](agent_edc)  to transfer/delegate the required Agent protocols.
* (optionally) employ multiple data planes in case you want to expose hosted skills (skill assets that operate as stored procedures
and which require computational resources at the provider side) instead of distributed skills (skill assets that are offered as query texts/files and which are executed at the consumer side).

## Role: As A (Data/Function) Provider

As a provider, you need to

* enable your [dataspace connector](agent_edc) to receive/internalize the required Agent protocols.

Depending on the kind of provisioning, you will setup additional internal "agents" (endpoints).

### Sub-Role: As A Data Provider

As a data provider, you want to

* [bind](provider) your data sources to knowledge graphs following the Catena-X ontology. Therefore, a provisioning agent
should be setup on top of a data virtualization/database layer.

### Sub-Role: As A Function Provider

As a function provider, you want to

* [bind](provider) your API to a special knowledge graph structure. Therefore, a remoting agent should be setup.

### Sub-Role: As A Twin Provider

As a function provider, you want to

* [bridge](bridge) between the Knowledge Agent and Asset Administration Shell APIs.

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
