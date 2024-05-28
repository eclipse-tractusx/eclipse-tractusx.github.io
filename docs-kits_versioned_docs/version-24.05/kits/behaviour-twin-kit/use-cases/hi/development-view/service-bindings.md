---
id: service-bindings
title: Service Bindings
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT -- Health Indicator banner](@site/static/img/kit-icons/behaviour-twin-hi-kit-icon-mini.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT -- Health Indicator
  </div>
</div>

Applies to role: *HI calculation service provider*

### OVERVIEW

For general information about service bindings, have a look at the [generalized Service Bindings section](../../../development-view/service-bindings) and the [Agents KIT's Operation View](../../../../knowledge-agents/operation-view/provider). In the current section, only a dedicated example is shown.

### SERVICE MAPPING CONFIGURATION (FULL EXAMPLE)

The following configuration for the mapping of a Health Indicator (HI) calculation service is written in the [Terse RDF Triple Language ![(external link)](../../../assets/external-link.svg)](https://www.w3.org/TR/turtle/), also known as *Turtle*.

In this example, an asynchronous calculation service for gearbox HI values is bound. It uses the Catena-X notification format as a container for the input data. The content of the notification is a JSON structure with a list of load spectra in it. The input format provides more than one Element (batch processing), but the HI logic always requires exact one input per calculation. Therefore, always the first (and only the first) item of the input list is bound.

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
#
# Rdf4j configuration for a HI-specific remoting
#
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

[] rdf:type rep:Repository ;
  rep:repositoryID "hi" ;
  rdfs:label "Health Indicator Functions Repository" ;
  rep:repositoryImpl [
      rep:repositoryType "openrdf:SailRepository" ;
      sr:sailImpl [
        sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
        cx-fx:supportsInvocation cx-behaviour:HealthIndicator ;
        cx-fx:callbackAddress <https://my-remoting-agent.domain/rdf4j-server/callback> ;
      ]
  ] .

cx-behaviour:HealthIndicator rdf:type cx-fx:Function ;
  dcterms:description "Health Indicator is an asynchronous batch invocation."@en ;
  dcterms:title "Health Indicator" ;
  cx-fx:targetUri "http://service-backend:5005/api/hi" ;
  cx-fx:invocationMethod "POST-JSON" ;
#  cx-common:authenticationKey "Authorization" ;
#  cx-common:authenticationCode "Basic TOKEN" ;
  cx-fx:invocationMethod "POST-JSON" ;
  cx-fx:invocationIdProperty "header.notificationID,content.requestRefId" ;
  cx-fx:callbackProperty "header.respondAssetId" ;
  cx-fx:input cx-behaviour:notification ;
  cx-fx:input cx-behaviour:sender ;
  cx-fx:input cx-behaviour:senderConnector ;
  cx-fx:input cx-behaviour:recipient ;
  cx-fx:input cx-behaviour:recipientConnector ;
  cx-fx:input cx-behaviour:recipient ;
  cx-fx:input cx-behaviour:recipientConnector ;
  cx-fx:input cx-behaviour:severity ;
  cx-fx:input cx-behaviour:status ;
  cx-fx:input cx-behaviour:targetDate ;
  cx-fx:input cx-behaviour:timeStamp ;
  cx-fx:input cx-behaviour:classification ;
  cx-fx:input cx-behaviour:component ;
  cx-fx:input cx-behaviour:observationType ;
  cx-fx:input cx-behaviour:metadata ;
  cx-fx:input cx-behaviour:statusDate ;
  cx-fx:input cx-behaviour:statusOperatingHours ;
  cx-fx:input cx-behaviour:statusMileage ;
  cx-fx:input cx-behaviour:countingMethod ;
  cx-fx:input cx-behaviour:countingValue ;
  cx-fx:input cx-behaviour:countingUnit ;
  cx-fx:input cx-behaviour:headerChannels ;
  cx-fx:input cx-behaviour:bodyClasses ;
  cx-fx:input cx-behaviour:bodyCountsList ;
  cx-fx:result cx-behaviour:HealthIndicatorResult .

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

cx-behaviour:senderConnector rdf:type cx-fx:Argument ;
  dcterms:description "Sender Address of the notification as a URL."@en ;
  dcterms:title "Notification Sender Address" ;
  cx-fx:argumentName "header.senderAddress" ;
  cx-fx:default "unknown" .

cx-behaviour:recipient rdf:type cx-fx:Argument ;
  dcterms:description "Recipient of the notification as a BPN."@en ;
  dcterms:title "Notification Recipient" ;
  cx-fx:argumentName "header.recipientBPN" ;
  cx-fx:default "anonymous" .

cx-behaviour:recipientConnector rdf:type cx-fx:Argument ;
  dcterms:description "Recipient Address of the notification as a URL."@en ;
  dcterms:title "Notification Recipient Address" ;
  cx-fx:argumentName "header.recipientAddress" ;
  cx-fx:default "unknown" .

cx-behaviour:severity rdf:type cx-fx:Argument ;
  dcterms:description "Severity of the notification."@en ;
  dcterms:title "Notification Severity" ;
  cx-fx:argumentName "header.severity" ;
  cx-fx:dataType xsd:string ;
  cx-fx:default "MINOR" .

cx-behaviour:status rdf:type cx-fx:Argument ;
  dcterms:description "Status of the notification."@en ;
  dcterms:title "Notification Status" ;
  cx-fx:argumentName "header.status" ;
  cx-fx:dataType xsd:string ;
  cx-fx:default "SENT" .

cx-behaviour:targetDate rdf:type cx-fx:Argument ;
  dcterms:description "Target Date of the notification."@en ;
  dcterms:title "Notification Target Date" ;
  cx-fx:dataType xsd:dateTime ;
  cx-fx:argumentName "header.targetDate" .

cx-behaviour:timeStamp rdf:type cx-fx:Argument ;
  dcterms:description "Timestamp of the notification."@en ;
  dcterms:title "Notification Timestamp" ;
  cx-fx:dataType xsd:dateTime ;
  cx-fx:argumentName "header.timeStamp" .

cx-behaviour:classification rdf:type cx-fx:Argument ;
  dcterms:description "Classification of the notification."@en ;
  dcterms:title "Notification Classification" ;
  cx-fx:argumentName "header.classification" ;
  cx-fx:dataType xsd:string ;
  cx-fx:default "HealthIndicatorService" .

cx-behaviour:component rdf:type cx-fx:Argument ;
  dcterms:description "Component of the Predicition."@en ;
  dcterms:title "Predicted Component" ;
  cx-fx:formsBatchGroup "true"^^xsd:boolean ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.componentId,content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.targetComponentId" .

cx-behaviour:observationType rdf:type cx-fx:Argument ;
  dcterms:description "The type of observation made."@en ;
  dcterms:title "Observation Type" ;
  cx-fx:strip <https://w3id.org/catenax/taxonomy#> ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.componentDescription" ;
  cx-fx:dataType xsd:string .

cx-behaviour:metadata rdf:type cx-fx:Argument ;
  dcterms:description "Metadata of the Loadspectrum."@en ;
  dcterms:title "Loadspectrum Metadata" ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}" ;
  cx-fx:dataType json:Object ;
  cx-fx:priority "0"^^xsd:integer ;
  cx-fx:default "{ \"metadata\":{ \"projectDescription\": \"pnr_76543\", \"routeDescription\": \"logged\" }, \"bammId\": \"urn:bamm:io.openmanufacturing.digitaltwin:1.0.0#ClassifiedLoadSpectrum\" }"^^json:Object .

cx-behaviour:statusDate rdf:type cx-fx:Argument ;
  dcterms:description "Time of Recording."@en ;
  dcterms:title "Loadspectrum Recording Time" ;
  cx-fx:dataType xsd:dateTime ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.date" .

cx-behaviour:statusOperatingHours rdf:type cx-fx:Argument ;
  dcterms:description "Operating Hours of Target Component at Time of Recording."@en ;
  dcterms:title "Loadspectrum Operating Hours" ;
  cx-fx:dataType xsd:float ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.operatingHours" .

cx-behaviour:statusMileage rdf:type cx-fx:Argument ;
  dcterms:description "Mileage of Component at Time of Recording."@en ;
  dcterms:title "Loadspectrum Mileage" ;
  cx-fx:dataType xsd:int ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.mileage" .

cx-behaviour:countingUnit rdf:type cx-fx:Argument ;
  dcterms:description "Counting Unit of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Unit" ;
  cx-fx:dataType xsd:string ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingUnit" .

cx-behaviour:countingValue rdf:type cx-fx:Argument ;
  dcterms:description "Counting Value Name of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Value" ;
  cx-fx:dataType xsd:string ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingValue,content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.counts.countsName" .

cx-behaviour:countingMethod rdf:type cx-fx:Argument ;
  dcterms:description "Counting Method of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Method" ;
  cx-fx:dataType xsd:string ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingMethod" .

cx-behaviour:headerChannels rdf:type cx-fx:Argument ;
  dcterms:description "Channels of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Channels" ;
  cx-fx:dataType json:Object ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.channels" .

cx-behaviour:bodyClasses rdf:type cx-fx:Argument ;
  dcterms:description "Classes of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Classes" ;
  cx-fx:dataType json:Object ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.classes" .

cx-behaviour:bodyCountsList rdf:type cx-fx:Argument ;
  dcterms:description "Counts List of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counts List" ;
  cx-fx:dataType json:Object ;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.counts.countsList" .

cx-behaviour:HealthIndicatorResult rdf:type owl:DatatypeProperty ;
                                   rdfs:subPropertyOf cx-fx:returnValue ;
                                   rdfs:comment "Health Indicator Values are percentages."@en ;
                                   rdfs:label "Health Indicator Values"@en ;
                                   cx-fx:dataType json:Object ;
                                   cx-fx:valuePath "HealthIndicatorResult" ;
                                   rdfs:domain cx-behaviour:HealthIndicatorResult ;
                                   rdfs:range json:Object .

cx-behaviour:indicatorVersion rdf:type owl:DatatypeProperty ;
                              rdfs:subPropertyOf cx-fx:returnValue ;
                              rdfs:comment "Version of the health indicator calculation."@en ;
                              rdfs:label "Health Indicator Calculation Version" ;
                              cx-fx:dataType xsd:string ;
                              cx-fx:valuePath "version" ;
                              rdfs:domain cx-behaviour:HealthIndicatorResult ;
                              rdfs:range xsd:string .

cx-behaviour:responseComponentId rdf:type owl:DatatypeProperty ;
                                 rdfs:subPropertyOf cx-fx:returnValue ;
                                 rdfs:comment "Component Id of the health indicator calculation."@en ;
                                 rdfs:label "Health Indicator Calculation Component Id"@en ;
                                 cx-fx:dataType xsd:string ;
                                 cx-fx:valuePath "componentId" ;
                                 rdfs:domain cx-behaviour:HealthIndicatorResult ;
                                 rdfs:range xsd:string .
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
    "@id": "cx-taxo:GraphAsset?supplier=HealthIndicatorGearbox",
    "properties": {
        "cx-common:name": "Health Prognosis Service for Gearboxes",
        "cx-common:description": "A second sample graph asset/offering referring to a specific prognosis resource.",
        "cx-common:description@de": "Ein weiteres Beispielasset für eine Prognosefunktion.",
        "cx-common:version": "1.12.19",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?supplier=Graph",
        "dc:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinHI&shapeObject=> .\n\n# Prognosis Function\n:PrognosisFunctionShape rdf:type sh:NodeShape ;\n    sh:targetClass cx-behaviour:PrognosisFunction ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingMethod ;\n        sh:path cx-behaviour:countingMethod ;\n    ] ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingValue ;\n        sh:path cx-behaviour:countingValue ;\n    ] ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingUnit ;\n        sh:path cx-behaviour:countingUnit ;\n    ] ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:channels ;\n        sh:path cx-behaviour:headerChannels ;\n    ] ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:classes ;\n        sh:path cx-behaviour:bodyClasses ;\n    ] .\n    \n:HealthIndicationShape a sh:NodeShape ;\n    cx-sh:extensionOf :PrognosisFunctionShape ;\n    sh:targetClass cx-behaviour:HealthIndication ;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:observationOf ;\n        sh:path cx-behaviour:observationType ;\n        sh:in ( cx-taxo:Clutch ) ;\n    ] ;\n    sh:property :HealthIndicationResultShape .\n    \n:HealthIndicationResultShape a sh:PropertyShape ;\n    cx-sh:outputOf :HealthIndicationShape ;\n    sh:path cx-behaviour:HealthIndicationResult .",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "dataAddress": {
        "id": "cx-taxo:GraphAsset?supplier=HealthIndicatorGearbox",
        "@type": "DataAddress",
        "baseUrl": "https://my-remoting-agent.domain/rdf4j-server/repositories/health",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true",
        "authKey": "Authorization",
        "authCode": "••••••",
        "cx-common:allowServicePattern": "https://my-remoting-agent.domain/rdf4j-server/repositories/health"
    }
}
```

The property `sh:shapesGraph` contains the graph shape of the offered data, written in [Shapes Constraint Language (SHACL) ![(external link)](../../../assets/external-link.svg)](https://www.w3.org/TR/shacl/). It describes the shape of a Health Indicator function and its output:

```shacl
<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
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
@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinHI&shapeObject=> .

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
    
:HealthIndicationShape a sh:NodeShape ;
    cx-sh:extensionOf :PrognosisFunctionShape ;
    sh:targetClass cx-behaviour:HealthIndication ;
    sh:property [
        cx-sh:hasAsArgument cx-reliability:observationOf ;
        sh:path cx-behaviour:observationType ;
        sh:in ( cx-taxo:Clutch ) ;
    ] ;
    sh:property :HealthIndicationResultShape .
    
:HealthIndicationResultShape a sh:PropertyShape ;
    cx-sh:outputOf :HealthIndicationShape ;
    sh:path cx-behaviour:HealthIndicationResult .
```

#### POLICY AND CONTRACT FOR THE GRAPH ASSET

All assets, including graph assets, must have a related policy and contract definition. These are described in the use-case-independent [general Contracts And Policies section](../../../development-view/contracts-and-policies).
