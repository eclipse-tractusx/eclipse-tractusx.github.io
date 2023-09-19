---
sidebar_position: 1
title: AAS Bridge
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
This section describes modules and components which are able to bridge
the [Semantic Web](https://www.w3.org/standards/semanticweb/) technology of
Knowledge Agents with the [Industrial Digital Twin Association's](https://industrialdigitaltwin.org/)
[Asset Administration Shell (AAS)](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf)
standard.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Layers & Modules Architecture](../modules)
* Our [Reference Implementation](reference)
* The [Deployment](../operation-view/deployment) guide

Actually, we are talking about two bridges, one which bridges AAS information that is described in Catena-X aspect schemas
into the Catena-X domain ontologies (the AAS-KA Bridge). And one bridge which is able to emulate
shells and submodels out of a given (federated) virtual graph.

[![AAS Bridge(s)](/img/knowledge-agents/aas_bridge_small.png)](/img/knowledge-agents/aas_bridge.png)

As the result, we are able to provide both SPARQL-based Graph Assets as well as AAS-based Submodel Assets based on the same
data sources.

This integration does not aim to solve the fundamental challenge of conflicting data formats on the meta-model level but
maps only a subset of the domain-models between the Knowledge-Graph- and AAS-world. This is true for either direction: The
native submodel template/aspect model must be mapped to a subset of the Catena-X-Ontology manually. Likewise, only that part
of the graph can be exposed via the AAS-APIs that has mapper implementing the transformation.

## AAS-KA Bridge

There are two main components whose interplay implements the AAS-KA bridge:

* A flexible SQL/JSON engine, such as Dremio or in parts also Postgresql which is able to mount raw data in various
formats from remote filesystems and APIs. This engine is used to build flat relational views onto a hierarchical
json structure that may originate in the value-only-serialization of the AAS. Typically there will be one table/view
per json-schema/submodel template. As an example, see these [scripts](https://github.com/catenax-ng/product-knowledge/tree/main/infrastructure/resources/dremio)
* A graph engine (such as [ontop](https://ontop-vkg.org/guide/) ) that is able to bind/translate SPARQL queries into SQL. As an example, see these [bindings](https://github.com/catenax-ng/product-knowledge/tree/main/infrastructure/oem/resources/trace.obda)

Of course, if the data is available in a native SQL-schema, the SQL/JSON-engine can be omitted. Likewise, even the graph engine
can be left out if a sparql-capable database holds its data in conformance to the CX-ontologies.

## KA-AAS Bridge

Exposing substructures of the distributed knowledge graph via the AAS APIs is possible by implementing [a mapper](https://github.com/catenax-ng/product-knowledge/tree/main/dataspace/aas-bridge/src/main/java/io/catenax/knowledge/dataspace/aasbridge/aspects)
and registering it in the KA-AAS Bridge. For each submodel template, there will be a combination of

* a SPARQL query extracting "flat" information out of the virtual graph
* a shell/submodel template providing the basic structure of the target AAS
* a mapper class which populates the query results into the AAS representation

To reduce the complexity of implementing new mappings, a mechanism that works on configuration only will be integrated into
the KA-AAS Bridge in the future.

[FAAAST framework](https://github.com/FraunhoferIOSB/FAAAST-Service/) is used as SDK providing the AAS tooling required for the implementation
of all relevant AAS-APIs.

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
