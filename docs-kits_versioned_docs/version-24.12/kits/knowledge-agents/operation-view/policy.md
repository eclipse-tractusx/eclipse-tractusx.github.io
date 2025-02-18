---
sidebar_position: 3
title: Data Sovereignity, Policies and Upgradability
---
<!--
 * Copyright (c) 2021 T-Systems International GmbH
 * Copyright (c) 2021 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021 Mercedes-Benz AG
 * Copyright (c) 2021 ZF Friedrichshafen AG
 * Copyright (c) 2021 SAP SE
 * Copyright (c) 2021 Contributors to the Eclipse Foundation
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

This document describes how Data Sovereignity and Upgradability can be reached in publishing Graphs and Skills by employing appropriate Policies and Versioning strategies.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed

The core ingredient to the KA Semantic Dataspace Architecture is that business partners (the Providers) offer RDF-based query endpoints ([Graph Assets](provider)) over their [Agent-Enabled Connector](agent_edc). The RDF endpoints (called binding *agents*, because they are active components that do not contain data, but simply transform queries into the backend protocols) stay in an "internal" network (as the data- and logic-carrying backends that they interface/transform into) while the EDC's (through asset descriptors, contract definitions and access/contract policies) operate as bridges to the "public" network.

Although the EDC network is technically based on public interfaces, it is by the builtin Self-Sovereign Identity (SSI) architecture that any network call will be validated wrt to the calling tenant's identity and contractual situation (use case participations and proven certificates).

Although the EDC transfer protocols are used to "tunnel" more specific application protocols and endpoints, it is by the flexible description and filtering of those endpoints as data catalogue offers with extensible properties that any application can infer the correct target asset to interact with.  

On the other hand, being free/sovereign to define these policies and properties at will gives the partipants a tremendous burden not to (unintendedly) breaking the deep data chains (in the knowledge agent case: deep nested executions) for the most valuable use cases. That is because these "hickups" will only occur data-driven at runtime by empty catalogue offers or failed transfers in unforeseeable places.

## Catena-X Asset Property Standards

To mitigate this problem, Catena-X requires two specific mandatory asset/offer properties:

* "cx-common:protocol" should refer to a known transfer protocol ("cx-common:" is an abbreviation for <https://w3id.org/catenax/ontology/common#>)
* "dct:type" should refer to a concept from the Catena-X Asset Taxonomy ("dct:" is an abbreviation for <https://purl.org/dc/terms/>; "cx-taxo:" is an abbreviation for <https://w3id.org/catenax/taxonomy#>).
* "cx-common:version" should carry a version string

For our purpose, the Agents KIT distinguishes two protocols:

* "cx-common:Protocol?w3c:http:SPARQL" which describes querying with SPARQL over HTTP (POST or GET)
* "cx-common:Protocol?w3c:http:SKILL" which describes invoking and binding SKILLs over HTTP (POST or GET)

The Agents KIT introduces two asset concepts accordingly:

* "cx-taxo:GraphAsset" for Graph-based Assets (pointing to binding agents)
* "cx-taxo:SkillAsset" for Skill Assets (containing parameterizable SPARQL queries)

Finally, we suggest to use semantic versioning in the version property where the versions should be aligned with the use case KIT versions.

* "[0-9]+.[0-9]+.[0-9]+(-SNAPSHOT)?"

A Skill which is depending on a particular (minimal, maximal, exact) version of the Catena-X ontology (and its use-case relevant domain ontologies) to be realised could use the builtin SPARQL functions to filter the appropriate assets from the federated data catalogue. In the following example, we list all the found assets (together with their connectors) ordered by the highest version.

```sparql
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX cx-common: <https://w3id.org/catenax/ontology/common#> 
PREFIX cx-taxo: <https://w3id.org/catenax/taxonomy#>
PREFIX dct: <https://purl.org/dc/terms/>

# This query filters the federated data catalogue for 'production' behavioural graphs 
# in versions between 1.11 (inclusive) and 2 (exclusive)

select ?connector ?asset ?version where {      
    ?connector cx-common:offers ?asset.
    ?asset dct:type cx-taxo:GraphAsset;
           rdfs:isDefinedBy <https://w3id.org/catenax/ontology/behaviour>;
               cx-common:version ?version.

        FILTER (!strends(?version, 'SNAPSHOT')).
        FILTER (?version >= '1.11').
        FILTER (?version < '2.').
} ORDER BY DESC(?version)
```

A result from would look like this

```json
{
    "head": {
        "vars": [
            "connector",
            "asset",
            "version"
        ]
    },
    "results": {
        "bindings": [
            {
                "connector": {
                    "type": "uri",
                    "value": "edcs://knowledge.dev.demo.catena-x.net/tiera-edc-control/BPNL00000003CPIY"
                },
                "asset": {
                    "type": "uri",
                    "value": "cx-taxo:GraphAsset?supplier=BehaviourTwinRUL"
                },
                "version": {
                    "type": "literal",
                    "value": "1.14.24"
                }
            },
            {
                "connector": {
                    "type": "uri",
                    "value": "edcs://knowledge.dev.demo.catena-x.net/tiera-edc-control/BPNL00000003CPIY"
                },
                "asset": {
                    "type": "uri",
                    "value": "cx-taxo:GraphAsset?supplier=HealthIndicatorGearbox"
                },
                "version": {
                    "type": "literal",
                    "value": "1.11.16"
                }
            }
        ]
    }
}
```

## Catena-X Policy Profiles

Furthermore, Catena-X introduces so-called policy profiles which ensure that only pre-negotiatable and predictable constraints are used in the permissions, duties and obligations.

Two examples for such use-case specific policies following the Catena-X profile and being based on separated signed (and technicall attested) framework agreements are the
Behaviour Twin Framework Agreement (in verson 1) and the Traceability Agreement (in version 3).

```json
{
    "@context": [
        "http://www.w3.org/ns/odrl.jsonld", 
        {
            "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        {
            "cx-policy": "https://w3id.org/catenax/policy/"
        }
    ],
    "@type": "PolicyDefinitionRequestDto",
    "@id": "GraphAsset?me=Policy&useCase=BehaviourTwin",
    "edc:policy": {
        "@type": "Set",
        "profile": "cx-policy:profile2405",
        "permission": [
            {
                "action": "use",
                "constraint": {
                    "leftOperand": "cx-policy:FrameworkAgreement",
                    "operator": "eq",
                    "rightOperand": "behaviourtwin:1.0"
                }
            }
        ]
    }
}
```

```json
{
    "@context": [
        "http://www.w3.org/ns/odrl.jsonld", 
        {
            "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        {
            "cx-policy": "https://w3id.org/catenax/policy/"
        }
    ],
    "@type": "PolicyDefinitionRequestDto",
    "@id": "GraphAsset?me=Policy&useCase=Trace",
    "edc:policy": {
        "@type": "Set",
        "profile": "cx-policy:profile2405",
        "permission": [
            {
                "action": "use",
                "constraint": {
                    "leftOperand": "cx-policy:FrameworkAgreement",
                    "operator": "eq",
                    "rightOperand": "traceability:3.0"
                }
            }
        ]
    }
}
```

For the purpose of this investigation, let us now assume that we have to publish a single backend (=database, datalake schema or API endpoint) into multiple use cases.
In the following the different levels of tailoring access (by authentication, by configuration, by publishing/policying) are discussed that can be used to govern this scenario.

![Data Sovereignity Through Offering and Policy Validation](/img/knowledge-agents/graph_asset.png)

## Data Sovereignity Through Backend Authentication

On this level, technical roles can be introduced in the backend systems (technical users) for the different use cases. Each technical user would only be allowed to
manipulate (read, update, delete) the relevant part of the API or data schema.

Then different RDF endpoints are created which may share the same binding but use a different technical user to access the single backend. Each RDF endpoint would then be mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies.

## Data Sovereignity Through Bindings

On this level, different RDF endpoints are introduced which use the same technical user to access the single backend, but they make use of different bindings to map only a part of the SPARQL protocol to a part of the backend protocols. Each RDF endpoint would then be mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies.

## Data Sovereignity Through Asset Descriptions

On this level, a single RDF endpoint is introduced which is mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies. For this purpose, a "shape-filter" (not yet implemented) could become active in the Agent Plane/Matchmaking Agent which rewrites or checks the
incoming SPARQL context before delegating it to the binding agent.

## Data Sovereignity Through Contracts

On this level, a single asset description is used which is embedded into different contracts with different policies.

## Data Sovereignity Through Combined Policies

On this level,a single contract is used with a combined policy

```json
{
    "@context": [
        "http://www.w3.org/ns/odrl.jsonld", 
        {
            "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        {
            "cx-policy": "https://w3id.org/catenax/policy/"
        }
    ],
    "@type": "PolicyDefinitionRequestDto",
    "@id": "GraphAsset?me=Policy&useCase=Trace&useCase=BehaviourTwin",
    "edc:policy": {
        "@type": "Set",
        "profile": "cx-policy:profile2405",
        "permission": [
            {
                "action": "use",
                "constraint": {
                  "@type": "LogicalConstraint",
                  "or" : [{
                      "leftOperand": "cx-policy:FrameworkAgreement",
                      "operator": "eq",
                      "rightOperand": "behaviourtwin:1.0"
                      },
                      {
                      "leftOperand": "cx-policy:FrameworkAgreement",
                      "operator": "eq",
                      "rightOperand": "traceability:3.0"
                      }]
                }
            }
        ]
    }
}
```

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
