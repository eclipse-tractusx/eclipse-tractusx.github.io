---
id: Knowledge Agent Changelog
title: Changelog
description: 'Knowledge Agent'
sidebar_position: 1
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

All notable changes to the (Knowledge) Agents KIT (=Keep It Together) will be documented in this file.

## [23.12] - 

### Added

- AAS Bridge References
- Deployment Examples
- References to the RUL Kit

### Changed

- Pointers moved from Catena-X to Tractus-X 

### Removed

- Sample Dataspace
- Build & Compile
- Standard Drafts

## [23.09-PREVIEW] - 2023-09-04

### Added

- Conformity Assessment Testbed
- Matchmaking Agent: Possibility to invoke Skills as Services according to KA-MATCH
- Matchmaking Agent: Possibility to steer Delegation through Asset Properties
- Matchmaking Agent: Possibility to allow/deny service requests based on URL pattern
- Transfer: Possibility to annotate assets with service request allow/deny patterns
- Transfer: Implement Skill Protocol of KA-TRANSFER
- Federated Data Catalogue: Embedding Shapes Properties as Named Graphs
- Skill Store: Implementation using EDC Control Plane/Asset Catalogue

### Changed

- Adapted all Catena-X namespaces to https://w3id.org/catenax
- Adapted to Tractus-X EDC 0.5 and the changed EDR callback
- Adapted to Tractus-X EDC 0.4 and the v2 Management and Catalogue APIs
- Upgraded to the latest possible version of dependent libraries
- Eclipse Tractus-X standards and migration

### Removed

- Previous EDC Control Plane Extensions regarding SPARQL/HTTP transfer

## [0.7.4-SNAPSHOT] - 2023-02-20

### Added

- Support for SPARQL KA-transfer profile including the cx_warnings header
- Necessary documentation markdown for Eclipse Standard
- Helm Sub-Charts for Umbrella Embedding
- Postman Collection with Integration Tests
- SparQL Anything, PostgreSQL support
- Eclipse Dataspace Connector Extensions (Control Plane & Data Plane)

### Changed

- Registration of Additional Callback Handlers
- Move patched code into extensions
- Based on EDC 0.2.0

### Removed

- Based on Tractus-X EDC 0.3.3

## [0.6.4-SNAPSHOT] - 2022-12-15

### Added

- Ontology Python Tools
- UX Skill Framework
- UX Skill Modules for Custom Search
- Added Backend Virtualization & Mock
- Postman Collection with RUL & HI Logic

### Changed

- Include depending artifacts via Maven/Docker
- Remoting Agent Batch Mode
- Based on a patched EDC 0.1.0

### Removed

- Hardcoded UX pages

## [0.5.5-SNAPSHOT] - 2022-08-10

### Added

- Ontology Submodule including Diagnosis Domain
- Splitted Tractus-X Branch into Dataspace and UX submodules
- Moved Deployments to Infrastructure Submodule
- Added 2 Agent Implementations (Ontop, RDF4J)
- Postman Collection with RUL Logic
- Software BOM

### Changed

- Include depending artifacts via Maven/Docker
- Based on a patched EDC 0.0.1-SNAPSHOT

### Removed

- Tractus-X and Jena Links
- Spike Data

## [0.4.6-SNAPSHOT] - 2022-05-13

### Added

- Submodules to Apache Jena and Tractus-X
- Source Code and Data Samples for Three tenants
- Based on EDC 0.0.1-SNAPSHOT
- Postman Collection with Spike Logic
- Helm Chart and Docker Compose Deployment

### Changed

### Removed

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
