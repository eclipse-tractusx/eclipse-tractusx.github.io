---
sidebar_position: 1
title: Testbed
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

This document describes a testbed for checking conformance of the (Knowledge) Agents KIT (=Keep It Together).

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [(Data/Function) Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed
* A [Data Sovereignity & Graph Policy](policy) discussion

## Test Scripts

The CAB (Conformity Assessment Body) may use a set of predefined API interactions to run against its own dataspace tenant or let the assessed party run these scripts depending on the assessment method. The scripts are hierarchically organized and can be found under this [Postman Collection](ka_conformity_scripts.postman_collection.json) or online under <https://elements.getpostman.com/redirect?entityId=2757771-0ad1b7a6-734c-4289-9221-667fc56a21da&entityType=collection>. For the URLs and identities of the CAB or the CAP (Conformity Assessment Party), the appropriate environment variables have to be set.

![KA Confirmity Assessment Scrtips](@site/static/img/knowledge-agents/ka_conformity_scripts.png)

The scripts are organised as follows:

* 01_TESTASSETS - asset descriptions, policies and contract definitions to be deployed both at the CAB as well as the CAP EDC (Control Plane), see below
* 02_ALL - scripts which need to be run at all CAPs
  * 0201_EDC_CONTROL_PLANE - scripts to be run against control plane (transfer check)
  * 0202_EDC_DATA_PLANE - scripts to be run against the data plane (callback and proxying)
  * 0203_MATCHMAKING_AGENT - scripts to be run against the matchmaking agent
  * 0204_FEDERATED_DATA_CATALOGUE - scripts checking the state of the federated data catalogue
* 03_PROVIDER - scripts which need to run at Provider CAPs
  * 0301_PROVIDER_DATA - scripts to be run at Data Provider CAPs
    * 030101_PROVIDER_DATA_SPARQL - scripts to be run against Data Provider Agents
  * 0302_PROVIDER_FUNCTION - scripts to be run at Function Provider CAPs
    * 030201_PROVIDER_FUNCTION_SPARQL - scripts to be run against Function Provider Agents
  * 0303_PROVIDER_AAS - scripts to be run at AAS Provider CAPs
    * 030301_PROVIDER_AAS_API - scripts to be run against AAS Provider Bridge
* 04_CONSUMER - scripts to be run against Consumer CAPs
  * 0401_CONSUMER_APPLICATION - scripts to be run against a KA-enabled Application
    * 040101_CONSUMER_APPLICATION_SPARQL  - scripts to be run against a SPARQL-speaking Application
* 05_CORE - scripts to be run against a Core Service CAP
  * 0501_CORE_ONTOLOGY  - scripts to be run against the Ontology Hosting Capability of the Core Service CAP
    * 050101_CORE_ONTOLOGY_MANAGEMENT - scripts to be run against the Ontology Hosting Capability for management
    * 050102_CORE_ONTOLOGY_EDITOR - scripts to be run against the Ontology Hosting Capability for editing

## Test Policies and Contract Definitions

The CAB may use the following Policy Definitions and Contract Definitions in its assessment method. The CAB may deploy these objects in its own dataspace tenant or let the assessed party deploy these objects depending on the assessment method.

### Open Policy

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Policy?cab=Asset&mode=open",
    "policy": {
        "@context": "http://www.w3.org/ns/odrl.jsonld",
        "@type": "Set",
        "uid": "https://w3id.org/catenax/ontology/common#Policy?oem=Graph",
        "permission": [
            {
                "target": "https://w3id.org/catenax/ontology/common#GraphAsset?oem=",
                "action": "USE",
                "constraint": []
            }
        ]
    }
}
```

### Closed Policy

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Policy?cab=Asset&mode=closed",
    "policy": {
        "@context": "http://www.w3.org/ns/odrl.jsonld",
        "@type": "Set",
        "uid": "https://w3id.org/catenax/ontology/common#Policy?oem=Graph",
        "permission": [
            {
                "target": "https://w3id.org/catenax/ontology/common#GraphAsset?oem=",
                "action": "USE",
                "constraint": {
                    "@type": "Constraint",
                    "leftOperand": "BusinessPartnerNumber",
                    "operator": "eq",
                    "rightOperand": "{{cabBPNL}}"
                }
            }
        ]
    }
}
```

### Open Contract Definition

```json
{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?cab=Asset&mode=open",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?cab=Asset&mode=open",
    "contractPolicyId": "Policy?cab=Asset&mode=open",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?cab=Asset&mode=open"
    }
}
```

### Closed Contract Definition

```json
{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?cab=Asset&mode=closed",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?cab=Asset&mode=closed",
    "contractPolicyId": "Policy?cab=Asset&mode=closed",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?cab=Asset&mode=closed"
    }
}
```

## Test Graph Assets

The CAB may use the following Graph Asset Descriptions (referring to the contract definitions in the last section) in its assessment method. The CAB may deploy these objects in its own dataspace tenant or let the assessed party deploy these objects depending on the assessment method.

### Open Graph Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "GraphAsset?cab=Conforming&mode=open",
    "properties": {
        "cx-common:name": "Open Conforming Asset.",
        "cx-common:description": "A graph asset/offering hosting a conforming agent for testing and conformity checking.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=open",
        "dct:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix : <GraphAsset?cab=Conforming&mode=open#> .\n",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {},
    "dataAddress": {
        "id": "GraphAsset?cab=Conforming&mode=open",
        "@type": "DataAddress",
        "baseUrl": "{{cabConformingAgent}}/bind",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Closed Graph Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "GraphAsset?cab=Conforming&mode=closed",
    "properties": {
        "cx-common:name": "Closed Conforming Asset.",
        "cx-common:description": "A graph asset/offering hosting a conforming agent for testing and conformity checking.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=closed",
        "dct:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix : <GraphAsset?cab=Conforming&mode=closed#> .\n",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {},
    "dataAddress": {
        "id": "GraphAsset?cab=Conforming&mode=closed",
        "@type": "DataAddress",
        "baseUrl": "{{cabConformingAgent}}/bind",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Unfederated Graph Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "GraphAsset?cab=Conforming&mode=unfederated",
    "properties": {
        "cx-common:name": "Unfederated Conforming Asset.",
        "cx-common:description": "A graph asset/offering hosting a conforming agent for testing and conformity checking.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Graph&mode=open",
        "dct:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix : <GraphAsset?cab=Conforming&mode=unfederated#> .\n",
        "cx-common:isFederated": "false^^xsd:boolean"
    },
    "privateProperties": {},
    "dataAddress": {
        "id": "GraphAsset?cab=Conforming&mode=unfederated",
        "@type": "DataAddress",
        "baseUrl": "{{cabConformingAgent}}/bind",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

## Test Skill Assets

The CAB may use the following Skill Asset Descriptions (referring to the contract definitions in the last section) in its assessment method. The CAB may deploy these objects in its own dataspace tenant or let the assessed party deploy these objects depending on the assessment method.

### Open Skill Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "SkillAsset?cab=Conforming&mode=open",
    "properties": {
        "cx-common:name": "Open Skill",
        "cx-common:description": "A conformity assessment skill.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=open",
        "dct:type": "cx-taxo:SkillAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/core>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SKILL",
        "cx-common:distributionMode": "cx-common:SkillDistribution?run=all",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {
        "cx-common:query": "# Sample Skill accessing a graph\n\nSELECT ?subject ?predicate ?object WHERE { \n    SERVICE <edcs://knowledge.dev.demo.catena-x.net/oem-edc-control/BPNL00000003COJN> {\n        GRAPH <GraphAsset?cab=Conforming&mode=open> { \n            ?subject ?predicate ?object. \n        }\n    } \n}"
    },
    "dataAddress": {
        "id": "SkillAsset?cab=Conforming&mode=open",
        "@type": "DataAddress",
        "type": "cx-common:Protocol?w3c:http:SKILL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Closed Skill Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "SkillAsset?cab=Conforming&mode=closed",
    "properties": {
        "cx-common:name": "Closed Skill",
        "cx-common:description": "A conformity assessment skill.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=closed",
        "dct:type": "cx-taxo:SkillAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/core>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SKILL",
        "cx-common:distributionMode": "cx-common:SkillDistribution?run=all",
        "cx-common:isFederated": "false^^xsd:boolean"
    },
    "privateProperties": {
        "cx-common:query": "# Sample Skill accessing a graph\n\nSELECT ?subject ?predicate ?object WHERE { \n    SERVICE <edcs://knowledge.dev.demo.catena-x.net/oem-edc-control/BPNL00000003COJN> {\n        GRAPH <GraphAsset?cab=Conforming&mode=closed> { \n            ?subject ?predicate ?object. \n        }\n    } \n}"
    },
    "dataAddress": {
        "id": "SkillAsset?cab=Conforming&mode=closed",
        "@type": "DataAddress",
        "type": "cx-common:Protocol?w3c:http:SKILL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Provider Skill Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "SkillAsset?cab=Conforming&mode=provider",
    "properties": {
        "cx-common:name": "Provider-Forced Skill",
        "cx-common:description": "A conformity assessment skill.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=open",
        "dct:type": "cx-taxo:SkillAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/core>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SKILL",
        "cx-common:distributionMode": "cx-common:SkillDistribution?run=provider",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {
        "cx-common:query": "# Sample Skill accessing a graph\n\nSELECT ?subject ?predicate ?object WHERE { \n    SERVICE <edcs://knowledge.dev.demo.catena-x.net/oem-edc-control/BPNL00000003COJN> {\n        GRAPH <GraphAsset?cab=Conforming&mode=open> { \n            ?subject ?predicate ?object. \n        }\n    } \n}"
    },
    "dataAddress": {
        "id": "SkillAsset?cab=Conforming&mode=provider",
        "@type": "DataAddress",
        "type": "cx-common:Protocol?w3c:http:SKILL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Consumer Skill Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "SkillAsset?cab=Conforming&mode=consumer",
    "properties": {
        "cx-common:name": "Consumer-Forced Skill",
        "cx-common:description": "A conformity assessment skill.",
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=open",
        "dct:type": "cx-taxo:SkillAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/core>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SKILL",
        "cx-common:distributionMode": "cx-common:SkillDistribution?run=consumer",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {
        "cx-common:query": "# Sample Skill accessing a graph\n\nSELECT ?subject ?predicate ?object WHERE { \n    SERVICE <edcs://knowledge.dev.demo.catena-x.net/oem-edc-control/BPNL00000003COJN> {\n        GRAPH <GraphAsset?cab=Conforming&mode=open> { \n            ?subject ?predicate ?object. \n        }\n    } \n}"
    },
    "dataAddress": {
        "id": "SkillAsset?cab=Conforming&mode=consumer",
        "@type": "DataAddress",
        "type": "cx-common:Protocol?w3c:http:SKILL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

### Unfederated Skill Asset

```json
{
    "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#",
        "cs-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "SkillAsset?cab=Conforming&mode=unfederated",
    "properties": {
        "cx-common:name": "Unfederated Skill",
        "cx-common:description": "A conformity assessment skill.",
        "cx-common:version": "1.9.4-SNAPSHOT",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?cab=Asset&mode=open",
        "dct:type": "cx-taxo:SkillAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/core>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SKILL",
        "cx-common:distributionMode": "cx-common:SkillDistribution?run=all",
        "cx-common:isFederated": "false^^xsd:boolean"
    },
    "privateProperties": {
        "cx-common:query": "# Sample Skill accessing a graph\n\nSELECT ?subject ?predicate ?object WHERE { \n    SERVICE <edcs://knowledge.dev.demo.catena-x.net/oem-edc-control/BPNL00000003COJN> {\n        GRAPH <GraphAsset?cab=Conforming&mode=open> { \n            ?subject ?predicate ?object. \n        }\n    } \n}"
    },
    "dataAddress": {
        "id": "SkillAsset?cab=Conforming&mode=unfederated",
        "@type": "DataAddress",
        "type": "cx-common:Protocol?w3c:http:SKILL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true"
    }
}
```

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
