---
id: Operation View Remaining Useful Life Kit
title: Operation View
description: 'Remaining Useful Life Kit'
sidebar_position: 3
---

![Remaining Useful Life kit banner](/img/kit-icons/behaviour-rul-kit-icon.svg)

### Remaining Useful Life Kit

<!--
Documentation of the Kit.
-->

Based on the information provided in this KIT, it is possible to provide and/or consume services defined as Agent Skills based on the Behaviour Twin standards (ontology, SAMM models).

Depending on the role within the RuL Use Case, different Knowledge Agent components are needed.
The needed information regarding Agent Kit components, their deployment and configuration, refer to the *Agent Kit Operation View Section*.

## Deployment of Graph Assets

### Data Provider Graph Asset

If you are engaged as a data provider within the RuL KIT, you can mount your data source to the federated knowledge graph as Graph Asset.
Beside the policy and contract definition, a Graph Asset registration is needed. It can like following example with a baseUrl set to the sparql endpoint of your provision agent:

```json
{
  "@context": {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "sh": "http://www.w3.org/ns/shacl#",
    "edc": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "asset": {
    "@type": "Asset",
    "@id": "GraphAsset?oem=BehaviourTwinReliability",
    "properties": {
      "name": "OEM portion of the Behaviour Twin Reliablity Testdataset.",
      "name@de": "OEM Anteil an den Verhaltenszwilling ReliabilityTestdaten.",
      "description": "A graph asset/offering mounting Carena-X Testdata for Behaviour Twin.",
      "description@de": "Ein Graph Angebot welches Catena-X Testdaten beinhaltet.",
      "version": "CX_RuL_Testdata_v1.0.0",
      "contenttype": "application/json, application/xml",
      "cx-common:publishedUnderContract": "Contract?oem=Graph",
      "rdf:type": "cx-common:GraphAsset",
      "rdfs:isDefinedBy": "<https://w3id.org/catenax/usecase/behaviourtwin>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/vehicle>,<https://w3id.org/catenax/ontology/reliability>",
      "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
      "sh:shapesGraph": "@prefix cx-common: <https://w3id.org/catenax/ontology/common#>. \n@prefix : <GraphAsset?oem=BehaviourTwinReliability#> .\n@prefix cx-tele: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .@prefix : <urn:cx:Graph:oem:BehaviourTwin> .\n\n:OemLoadSpectrum rdf:type sh:NodeShape ;\n  sh:targetClass cx-tele:LoadSpectrum ;\n  sh:property [\n        sh:path cx-tele:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL000000000OEM> \n    ] ;\n  sh:property [\n        sh:path cx-tele:Version ;\n        sh:hasValue \"0\"^^xsd:long \n    ] ;\n  sh:property [\n        sh:path cx-tele:component ;\n        sh:class :SupplierParts \n    ] .\n\n:SupplierParts rdf:type sh:NodeShape ;\n  sh:targetClass cx-tele:VehicleComponent ;\n  sh:property [\n        sh:path cx-tele:isProducedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL0000SUPPLIER> \n    ] .\n",
      "cx-common:isFederated": "true^^xsd:boolean"
    }
  },
  "dataAddress": {
    "id": "GraphAsset?oem=BehaviourTwinReliability",
    "@type": "DataAddress",
    "baseUrl": "{{provisioningAgent}}/{{reliabilityPath}}/sparql",
    "type": "cx-common:Protocol?w3c:http:SPARQL",
    "proxyPath": "false",
    "proxyMethod": "true",
    "proxyQueryParams": "true",
    "proxyBody": "true",
    "authKey": "{{oemBackendAuthKey}}",
    "authCode": "{{oemBackendAuthCode}}"
  }
}
```

It also provides some META-Information's, which are for example, to find a specific based on isDefinedBy property.

### Service Provider Graph Asset

The same applies for the service/function supplier. To make the service available as part of the federated knowledge graph, a Grapth Asset pointing to your Remoting Agent endpoint is needed.

Such a Graph Asset for a service provider can look like following example:

```json
{
    "@context": {
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "sh": "http://www.w3.org/ns/shacl#"
    },
    "asset": {
        "@type": "Asset",
        "@id": "GraphAsset?supplier=BehaviourTwinRUL", 
        "properties": {
            "name": "Lifetime Prognosis Service for Gearboxes",
            "description": "A sample graph asset/offering referring to a specific prognosis resource.",
            "version": "1.9.4-SNAPSHOT",
            "contenttype": "application/json, application/xml",
            "cx-common:publishedUnderContract": "Contract?supplier=Graph",
            "rdf:type": "cx-common:GraphAsset",
            "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>",
            "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
            "sh:shapesGraph": "@prefix cx-common: <https://w3id.org/catenax/ontology/common#>. \n@prefix : <GraphAsset?supplier=BehaviourTwinRUL#> .\n@prefix cx-prognosis: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n\n:Tier1LifetimePrognosis rdf:type sh:NodeShape ;\n  sh:targetClass cx-prognosis:Function ;\n  sh:property [\n        sh:path cx-prognosis:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL0000SUPPLIER> ].",
            "cx-common:isFederated": "true^^xsd:boolean"
        }
    },
    "dataAddress": {
        "id": "GraphAsset?supplier=BehaviourTwinRUL", 
        "@type": "DataAddress",
        "baseUrl": "{{remotingAgent}}/repositories/rul",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true",
        "authKey": "{{supplierBackendAuthKey}}",
        "authCode": "{{supplierBackendAuthCode}}"
    }
  }
```

## Deployment of RuL Skill

After the skill is defined, it has to be registered.
As described in th "KA-KIT", one have to define the Asset, Policy and Contractdefiniton as for other EDC assets.

To bo able to invoke the sample Agent-Skill defined above, we have to deploy, or better said, to register it in our agent enabled EDC. For the registration we need, as for other EDC assets, the asset, a policy and a contract definition registration.

### Policy Registration

```json
{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/",
        "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@type": "PolicyDefinitionRequestDto",
    "@id": "Policy?consumer=Asset&mode=open",
    "policy": {
        "@type": "Policy",
        "odrl:permission" : [{
            "odrl:action" : "USE",
            "odrl:constraint" : []
        }]
    }
} 
```

### Contractdefiniton Registration

```json
{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?consumer=Asset&mode=open",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?consumer=Asset&mode=open",
    "contractPolicyId": "Policy?consumer=Asset&mode=open",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?consumer=Asset&mode=open"
    }
}
```

### Skill Registration

A Skill can be registered over the AgentPlane API:

```curl
curl --location 'agentPlaneEdcUrl/api/agent/skill?asset=SkillAsset%3Fconsumer%3DRemainingUsefulLife&distributionMode=PROVIDER%26contract%3DContract%3Fconsumer%3DAsset%26mode%3Dopen' \
--header 'Content-Type: application/sparql-query' \
--data-raw '
   <RuL skill from above>
'
```
