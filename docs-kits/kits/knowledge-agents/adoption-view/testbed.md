---
sidebar_position: 1
title: Testbed
---

This document describes a testbed for checking the conformance of this Kit (=Keep it together) and other
standard-related artifacts.

For more information see

* The [CX-0084](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* Our [Introduction](intro) manifest
* A [Frequently Asked Question](faq) list
* Our [Target Audience](audience) description
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

#### Test Scripts

The CAB MAY use a set of predefined API interactions to run against its own dataspace tenant or let the assessed party run these scripts depending on the assessment method. The scripts  are hierarchically organized in a POSTMAN Collection and can be found under <https://elements.getpostman.com/redirect?entityId=2757771-0ad1b7a6-734c-4289-9221-667fc56a21da&entityType=collection>

#### Test Graph Assets

The CAB MAY use the following Asset Description, Policy Definition and Contract Definition in its assessment method. The CAB MAY deploy these objects in its own dataspace tenant or let the assessed party deploy these objects depending on the assessment method.

```csharp
{    “asset": {
        "properties": {
            "asset:prop:id": "urn:cx:Graph:oem:Diagnosis2022",
            "asset:prop:contract": "<urn:cx:Graph:oem>",
            "asset:prop:name": "Diagnostic Trouble Code Catalogue Version 2022",
            "asset:prop:description": "A sample graph asset/offering referring to a specific diagnosis resource.",
            "asset:prop:version": "0.7.4-SNAPSHOT",
            "asset:prop:contenttype": "application/json, application/xml",
            "rdf:type": "<{{cxOntologyRoot}}/cx_ontology.ttl#GraphAsset>",
            "rdfs:isDefinedBy": "<{{cxOntologyRoot}}/diagnosis_ontology.ttl>",
            "cx:protocol": "<urn:cx:Protocol:w3c:Http#SPARQL>",
            "cx:shape": “[ rdf:type sh:NodeShape ;\n  sh:targetClass cx:DTC ;\n  sh:property [\n        sh:path cx:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL00000003COJN> ;\n    ] ;\n  sh:property [\n        sh:path cx:Version ;\n        sh:hasValue 0^^xsd:long ;\n    ] ;\n  sh:property [\n        sh:path cx:affects ;\n        sh:class [ rdf:type sh:NodeShape ;\n  sh:targetClass cx:DiagnosedPart ;\n  sh:property [\n        sh:path cx:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL00000003COJN> ;\n    ]]] ;\n",
            "cx:isFederated": true
        }},
    "dataAddress": {
        "properties": {
            "asset:prop:id": "urn:cx:Graph:oem:Diagnosis2022",
            "baseUrl": "{{oemProviderAgent}}/sparql",
            "type": "urn:cx:Protocol:w3c:Http#SPARQL",
            "proxyPath": "false",
            "proxyMethod": "true",
            "proxyQueryParams": "true",
            "proxyBody": "true",
            "authKey": "{{oemBackendAuthKey}}",
            "authCode": "{{oemBackendAuthCode}}"
        }
    }
}

{
  "id": "urn:cx:Policy:oem",
  "policy": {
    "permissions": [
        {
            "action": {
                "type": "USE"
            },
            "edctype": "dataspaceconnector:permission"
        }
    ],
    "@type": {
        "@policytype": "set"
    }
  }
}


{
  "id":"urn_cx_Graph_oem",
  "accessPolicyId": "urn:cx:Policy:oem",
  "contractPolicyId": "urn:cx:Policy:oem",
  "criteria": [ {
      "operandLeft": "asset:prop:contract",
      "operator":"=",
      "operandRight":"<urn:cx:Graph:oem>"
  }]
}
```

#### Test Skill Asset

The CAB MAY use the following Asset Description and Contract Definition in combination with the Policy Definition of 2.2 in its assessment method. The CAB MAY deploy these objects in its own dataspace tenant or let the assessed party deploy these objects depending on the assessment method.

```csharp
{
  "asset": {
    "properties": {
      "asset:prop:id": "urn:cx:Skill:oem:HealthIndication",
      "asset:prop:contract": "<urn:cx:Skill:oem>",
      "asset:prop:name": "Health Indication Skill",
      "asset:prop:description": "Obtains Health-Indication Score for Particular Vehicles Based on Telematics Data",
      "asset:prop:version": "0.7.4-SNAPSHOT",
      "asset:prop:contenttype": "application/json, application/xml",
      "cx:protocol": "<urn:cx:Protocol:w3c:Http#SPARQL>",
      "rdf:type":"<{{cxOntologyRoot}}/cx_ontology.ttl#SkillAsset>",
      "rdfs:isDefinedBy": "<{{cxOntologyRoot}}/common_ontology.ttl>,<{{cxOntologyRoot}}/diagnosis_ontology.ttl>,<{{cxOntologyRoot}}/part_ontology.ttl>",
      "cx:isFederated": true
    }
  },
  "dataAddress": {
    "properties": {
      "asset:prop:id": "urn:cx:Skill:oem:HealthIndication",
      "type": "urn:cx:Protocol:w3c:Http#SKILL#SPARQL",
      "query": “SELECT ?subject ?predicate ?object WHERE [ ?subject ?predicate ?object }",
      "proxyPath": "false",
      "proxyMethod": "false",
      "proxyQueryParams": "true",
      "proxyBody": "false"
    }
  }
}


{
  "id":"urn_cx_Skill_oem",
  "accessPolicyId": "urn:cx:Policy:oem",
  "contractPolicyId": "urn:cx:Policy:oem",
  "criteria": [ {
      "operandLeft": "asset:prop:contract",
      "operator":"=",
      "operandRight":"<urn:cx:Skill:oem>"
  }]
}
```
