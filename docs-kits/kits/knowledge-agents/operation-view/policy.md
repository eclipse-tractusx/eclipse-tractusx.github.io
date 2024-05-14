---
sidebar_position: 3
title: Data Sovereignity & Policies
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

This document describes how Data Sovereignity can be reached in publishing Graphs and Skills while employing appropriate Policies.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed

The core ingredient to the KA Semantic Dataspace Architecture is that business partners (the Providers) offer RDF-based query endpoints ([Graph Assets](provider)) over their [Agent-Enabled Connector](agent_edc). The RDF endpoints (=binding agents, as they are active components that do not contain data, but simply transform queries into the backend protocols) themselves stay in an "internal" network (as the backends they interface) while the EDC's (through asset descriptors, contract definitions and access/contract policies) operate as bridges to the "public" network. Although the EDC network is technically based on public interfaces,
it is by the builtin Self-Sovereign Identity (SSI) architecture that any network call will be validated wrt to the calling tenant's identity and contractual situation (use case participations and proven certificates).

On the other hand, being free to define policies at will gives partipants a tremendous burden not to (unintendedly) breaking the deep data chains (in the knowledge agent case: deep nested executions) for the most valuable use cases. Therefore, Catena-X introduces so-called policy profiles which ensure that no constraints are used which cannot be foreseen or implemented by the
participants at runtime.

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

For the purpose of this investigation, we now assume that we have to publish a single backend (=database, datalake schema or API endpoint) into multiple use cases.
And we discuss in the following the different levels of tailoring access (by authentication, by configuration, by publishing/policying) that we can use to govern this scenario.

![Data Sovereignity Through Offering and Policy Validation](/img/knowledge-agents/graph_asset.png)

## Data Sovereignity Through Backend Authentication

On this level, we can introduce technical roles in the backend systems (technical users) for the different use cases. Each technical user would only be allowed to
manipulate (read, update, delete) the relevant part of the API or data schema.

We would then introduce different RDF endpoints which may share the same binding but use a different technical user to access the single backend. Each RDF endpoint would then be mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies.

## Data Sovereignity Through Bindings

On this level, we introduce different RDF endpoints which use the same technical user to access the single backend, but we use different bindings to map only a part of the SPARQL protocol to a part of the backend protocols. Each RDF endpoint would then be mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies.

## Data Sovereignity Through Asset Descriptions

On this level, we use a single RDF endpoint which is mapped into a different asset (with a similar self-description, but a slightly different shape). The assets would be offerred via different contracts and different policies. For this purpose, a "shape-filter" (not yet implemented) could become active in the Agent Plane/Matchmaking Agent which rewrites or checks the
incoming SPARQL context before delegating it to the binding agent.

## Data Sovereignity Through Contracts

On this level, we use a single asset description which is embedded into different contracts with different policies.

## Data Sovereignity Through Combined Policies

On this level, we use a single contract with a combined policy

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

<sub><sup>(C) 2021,2024 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
