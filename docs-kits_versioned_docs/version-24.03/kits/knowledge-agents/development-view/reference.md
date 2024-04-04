---
sidebar_position: 1
title: Reference Implementation
---
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
This document describes the Reference Implementation of Agents Standard and Kit.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Layers & Modules](modules) Architecture
* Our [Build](build) instructions
* The [Deployment](../operation-view/deployment) guide

## High Level Architecture

[![Architecture High-Level](/img/knowledge-agents/knowledge_agent_architecture_small.png)](/img/knowledge-agents/knowledge_agent_architecture.png)

## Technology Stack

* Provider-Side Programming Language: Java > 12
  * Eclipse Dataspace Connector
  * Provider Agent: OnTop
  * Inference Agent: Fuseki
  * Function Agent: RDF4J
  * SPARQL-AAS Bridge: FAAAST
* Consumer-Side Programming Language: Typescript
  * Skill Framework: React/Redux
  * Knowledge Explorer: React/Redux & Catena-X Portal
  * Skill Development Environment: React/Redux & Catena-X Portal

## Sources And Artifacts

### Tractus-X Knowledge Agents EDC Extensions (KA-EDC)

see the [Tractus-X Repository](https://github.com/eclipse-tractusx/knowledge-agents-edc) and its [KA-EDC Deployment](../operation-view/agent_edc)

### Tractus-X Knowledge Agents Reference Implementations (KA-RI)

see the [Tractus-X Repository](https://github.com/eclipse-tractusx/knowledge-agents) and its [KA-RI Deployment](../operation-view/provider)

### Tractus-X Knowledge Agents AAS Bridge (KA-AAS)

see the [Tractus-X Repository](https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge) and its [KA-AAS Deployment](../operation-view/bridge)

## Contact & Further Reading

  For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Layers & Modules](modules) Architecture
* Our [Build](build) instructions
* The [Deployment](../operation-view/deployment) guide

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
