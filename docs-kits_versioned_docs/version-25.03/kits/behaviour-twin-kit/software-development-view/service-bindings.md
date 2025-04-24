---
id: service-bindings
title: Service Bindings
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT banner](@site/static/img/kits/behavior-twin/behavior-twin-kit-logo.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT
  </div>
</div>

Applies to role: *calculation service provider*

### OVERVIEW

In many cases, services are provided via REST APIs and are using JSON as input and output format (like in this example for the RuL use case). To include those services into the knowledge graph, you have to bind/map them.

### SERVICE MAPPING TOOL

To bind a service to the knowledge graph, you must use a **remoting agent**, also called the **service binding agent**. The [Agents KIT](../../knowledge-agents/operation-view/provider) therefore provides a software based on [RDF4J ![(external link)](../assets/external-link.svg)](https://rdf4j.org/).

### SERVICE MAPPING CONFIGURATION

To configure the service mapping, a configuration must be provided that formally describes the mapping. The configuration is written in the [Terse RDF Triple Language ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/turtle/), also known as *Turtle*. For some detailed information, have a look at the [Agents KIT's Operation View](../../knowledge-agents/operation-view/provider).

In this example, an asynchronous calculation service for gearbox RuL values is bound. It uses the Catena-X notification format as a container for the input data. The content of the notification is a JSON structure with a list of load spectra in it. The input format provides more than one Element (batch processing), but the RuL logic always requires exact one input set per calculation. Therefore, always the first (and only the first) item of the input list is bound. The service binding is defined as follows.

#### THE OBLIGATORY LICENSE HEADER

```ttl
################################################################
# Copyright (c) 2022-2024 T-Systems International GmbH
# Copyright (c) 2022-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022-2024 ZF Friedrichshafen AG
# Copyright (c) 2023-2024 Allgemeiner Deutscher Automobil-Club e.V. (ADAC)
# Copyright (c) 2022-2024 Mercedes-Benz AG
# Copyright (c) 2022-2024 Contributors to the Catena-X Association
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
################################################################
```

#### PREFIXES THAT ARE USED IN THIS EXAMPLE

```ttl
@prefix rdf:            <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:           <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rep:            <http://www.openrdf.org/config/repository#> .
@prefix sr:             <http://www.openrdf.org/config/repository/sail#> .
@prefix sail:           <http://www.openrdf.org/config/sail#> .
@prefix sp:             <http://spinrdf.org/sp#> .
@prefix xsd:            <http://www.w3.org/2001/XMLSchema#> .
@prefix json:           <https://json-schema.org/draft/2020-12/schema#> .
@prefix dcterms:        <http://purl.org/dc/terms/> .
@prefix cx-fx:          <https://w3id.org/catenax/ontology/function#> .
@prefix cx-common:      <https://w3id.org/catenax/ontology/common#> .
@prefix cx-core:        <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle:     <https://w3id.org/catenax/ontology/vehicle#> .
@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .
@prefix cx-behaviour:   <https://w3id.org/catenax/ontology/behaviour#> .
```

#### RDF4J REPOSITORY

The RDF4J repository is the basic configuration that refers to the service object and defines the callback endpoint for an asynchronous response of this service.

```ttl
[] rdf:type rep:Repository ;
  rep:repositoryID "rul" ;
  rdfs:label "Remainig Useful Life Functions Repository" ;
  rep:repositoryImpl [
      rep:repositoryType "openrdf:SailRepository" ;
      sr:sailImpl [
        sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
        cx-fx:supportsInvocation cx-behaviour:RemainingUsefulLife ;
        cx-fx:callbackAddress <https://my-remoting-agent.domain/rdf4j-server/callback> ;
      ]
  ] .
```

The function type that will be invoked by this binding is defined by the property `cx-fx:supportsInvocation`. In this example, the bound function is of type `cx-behaviour:RemainingUsefulLife`.

#### FUNCTION DECLARATION

Definition of the function type `cx-behaviour:RemainingUsefulLife` of type `cx-fx:Function`. It defines the endpoint and describes the input and output elements.

```ttl
cx-behaviour:RemainingUsefulLife rdf:type cx-fx:Function ;
  dcterms:description "Remaining useful Life is an asynchronous batch invocation."@en ;
  dcterms:title "Remaining useful Life" ;
  cx-fx:targetUri "http://service-backend:5005/api/rul2" ;
  cx-fx:invocationMethod "POST-JSON" ;
#  cx-common:authenticationKey "Authorization" ;
#  cx-common:authenticationCode "Basic TOKEN" ;
  cx-fx:invocationMethod "POST-JSON" ;
  cx-fx:invocationIdProperty "header.notificationID,content.requestRefId" ;
  cx-fx:callbackProperty "header.respondAssetId" ;
  cx-fx:input cx-behaviour:notification ;
  cx-fx:input cx-behaviour:sender ;
  cx-fx:input cx-behaviour:senderConnector ;

  ...

  cx-fx:input cx-behaviour:headerChannels ;
  cx-fx:input cx-behaviour:bodyClasses ;
  cx-fx:input cx-behaviour:bodyCountsList ;
  cx-fx:result cx-behaviour:RemainingUsefulLifeResult .
```

#### FUNCTION ARGUMENTS

The input data that are received from the knowledge graph are converted to the desired JSON format that is requested by the service. Therefore, each value (input parameter) that is represented in the knowledge graph as a separate object must be described with its corresponding JSON path. The argument name represents this JSON path. Default values can be specified in case some values are not present in the knowledge graph.

```ttl
cx-behaviour:notification rdf:type cx-fx:Argument ;
  dcterms:description "A default notification output template."@en ;
  dcterms:title "Notification Template" ;
  cx-fx:argumentName "." ;
  cx-fx:dataType json:Object ;
  cx-fx:priority "-1"^^xsd:integer ;
  cx-fx:default "{ \"content\": { \"endurancePredictorInputs\": []}}"^^json:Object .

cx-behaviour:sender rdf:type cx-fx:Argument ;
  dcterms:description "Sender of the notification as a BPN."@en ;
  dcterms:title "Notification Sender" ;
  cx-fx:argumentName "header.senderBPN" ;
  cx-fx:default "anonymous" .

...

```

#### FUNCTION RESULT

The result of the service is also a JSON string. It consists of output values, which are specified each separate.

```ttl
cx-behaviour:RemainingUsefulLifeResult rdf:type cx-fx:Result ;
  dcterms:description "The asynchronous notification response."@en ;
  dcterms:title "Asynchronous notification response." ;
  cx-fx:callbackProperty "header.referencedNotificationID" ;
  cx-fx:outputProperty "content.endurancePredictorOutputs" ;
  cx-fx:output cx-behaviour:remainingOperatingHours ;
  cx-fx:output cx-behaviour:remainingRunningDistance .

cx-behaviour:remainingOperatingHours rdf:type cx-fx:ReturnValue ;
  dcterms:description "Predicted Operating Hours of Remaining useful Life Response"@en ;
  dcterms:title "Remaining useful Life Operating Hours" ;
  cx-fx:valuePath "0.remainingUsefulLife.remainingOperatingHours" ;
  cx-fx:dataType xsd:float.

cx-behaviour:remainingRunningDistance rdf:type cx-fx:ReturnValue ;
  dcterms:description "Predicted Distance of Remaining useful Life Response"@en ;
  dcterms:title "Remaining useful Life Distance" ;
  cx-fx:valuePath "0.remainingUsefulLife.remainingRunningDistance" ;
  cx-fx:dataType xsd:int .
```

### GRAPH ASSET FOR THE SERVICE BINDINGS

To enable the knowledge agent's matchmaking agent to utilize the service binding, a graph asset has to be registered at the calculation service provider's EDC connector. This asset must have a property `rdfs:isDefinedBy` for ontology references and a property `sh:shapesGraph` that defines the shape of the provided graph.

#### GRAPH ASSET DEFINITION

The following example is a full asset description, that can be registered at the EDC connector.

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
        "dc": "https://purl.org/dc/terms/"
    },
    "@id": "cx-taxo:GraphAsset?supplier=BehaviourTwinRUL", 
    "properties": {
        "cx-common:name": "Lifetime Prognosis Service for Gearboxes",
        "cx-common:description": "A sample graph asset/offering referring to a specific prognosis resource.",
        "cx-common:description@de": "Ein Beispielasset für eine Prognosefunktion.",
        "cx-common:version": "1.12.19",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?supplier=Graph",
        "dc:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinRUL&shapeObject=> .\n\n# Prognosis Function\n:PrognosisFunctionShape rdf:type sh:NodeShape ;\n    sh:targetClass cx-behaviour:PrognosisFunction ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingMethod ;\n        sh:path cx-behaviour:countingMethod ;\n    ] ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingValu ;\n        sh:path cx-behaviour:countingValue ;\n     ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingUnit ;\n        sh:path cx-behaviour:countingUni ;\n     ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:channels ;\n        sh:path cx-behaviour:headerChannel ;\n     ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:classes ;\n        sh:path cx-behaviour:bodyClasse ;\n    ] .\n\n:RemainingUsefulLifeShape rdf:type sh:NodeShape ;\n    cx-sh:extensionOf :PrognosisFunctionShape ;\n    sh:targetClass cx-behaviour:RemainingUsefulLife ;\n      sh:property[\n        cx-sh:hasAsArgument cx-reliability:observationO ;\n        sh:path cx-behaviour:observationType ;\n        sh:in ( cx-taxo:GearSet cx-taxo:GearOil  ;\n     ;\n    sh:property :RemainingUsefulLifeResultShape .\n\n:RemainingUsefulLifeResult rdf:type sh:PropertyShape ;\n    cx-sh:outputOf :RemainingUsefulLifeShape ;\n    sh:path cx-behaviour:RemainingUsefulLifeResult .\n",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "dataAddress": {
        "id": "cx-taxo:GraphAsset?supplier=BehaviourTwinRUL", 
        "@type": "DataAddress",
        "baseUrl": "https://my-remoting-agent.domain/rdf4j-server/repositories/rul",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true",
        "authKey": "Authorization",
        "authCode": "••••••",
        "cx-common:allowServicePattern": "https://my-remoting-agent.domain/rdf4j-server/repositories/rul"
    }
```

The property `sh:shapesGraph` contains the graph shape of the offered data, written in [Shapes Constraint Language (SHACL) ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/shacl/). It describes the shape of a Remaining useful Life function and its output:

```shacl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .
@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .
@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .
@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .
@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .
@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .
@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .
@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinRUL&shapeObject=> .

# Prognosis Function
:PrognosisFunctionShape rdf:type sh:NodeShape ;
    sh:targetClass cx-behaviour:PrognosisFunction ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:countingMethod ;
        sh:path cx-behaviour:countingMethod ;
    ] ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:countingValue ;
        sh:path cx-behaviour:countingValue ;
    ] ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:countingUnit ;
        sh:path cx-behaviour:countingUnit ;
    ] ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:channels ;
        sh:path cx-behaviour:headerChannels ;
    ] ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:classes ;
        sh:path cx-behaviour:bodyClasses ;
    ] .

:RemainingUsefulLifeShape rdf:type sh:NodeShape ;
    cx-sh:extensionOf :PrognosisFunctionShape ;
    sh:targetClass cx-behaviour:RemainingUsefulLife ;
      sh:property[
        cx-sh:hasAsArgument cx-reliability:observationOf ;
        sh:path cx-behaviour:observationType ;
        sh:in ( cx-taxo:GearSet cx-taxo:GearOil ) ;
    ] ;
    sh:property :RemainingUsefulLifeResultShape .

:RemainingUsefulLifeResult rdf:type sh:PropertyShape ;
    cx-sh:outputOf :RemainingUsefulLifeShape ;
    sh:path cx-behaviour:RemainingUsefulLifeResult .
```

This shape describes, what arguments must be provided to the calculation service and which output data are generated by the calculation service.

#### POLICY AND CONTRACT FOR THE GRAPH ASSET

All assets, including graph assets, must have a related policy and contract definition. These are described in the section [Contracts And Policies](./contracts-and-policies).
