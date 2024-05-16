---
id: service-bindings
title: Service Bindings
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT banner](@site/static/img/kit-icons/behaviour-twin-kit-icon-mini.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT
  </div>
</div>

Applies to: *RuL calculation service provider*

### Overview

In most cases, services are provided via REST APIs and are using JSON as input and output format. For the RuL use case, the output format is specified by a SAMM model.  
To include those services into the knowledge graph, you have to bind/map them to the underlying ontologies.

### Service mapping tool

To bind a service to the knowledge graph, you must use a **remoting agent**, also called the **service binding agent**. The software **RDF4J** (see the RDF4J webpage [https://rdf4j.org/](https://rdf4j.org/)), which is under the Eclipse Distribution License (EDL), v1.0, is our tool of choice in this case.  
  
### Service mapping configuration

For RDF4J, a configuration must be provided that formally describes the service binding.  
The configuration is written in Turtle (Terse RDF Triple Language) and has the extension **.ttl**. For more information, see the [Agents KIT](../../knowledge-agents/adoption-view/intro).  

#### RDF4J repository

The RDF4J repository is the basic configuration that refers to the service object and defines the callback endpoint for an asynchronous response of this service.

```ttl
################################################################
# Copyright (c) 2022,2023 T-Systems International GmbH
# Copyright (c) 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022,2023 ZF Friedrichshafen AG
# Copyright (c) 2023 Allgemeine Deutsche Automobil-Club (ADAC) e.V
# Copyright (c) 2022,2023 Mercedes-Benz AG
# Copyright (c) 2022,2023 Contributors to the Catena-X Association
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

[] rdf:type rep:Repository ;
  rep:repositoryID "rul" ;
  rdfs:label "Remainig Useful Life Functions Repository" ;
  rep:repositoryImpl [
      rep:repositoryType "openrdf:SailRepository" ;
      sr:sailImpl [
        sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
        cx-fx:supportsInvocation cx-behaviour:RemainingUsefulLife;
        cx-fx:callbackAddress <https://remoting-agent.supplier.com/rdf4j-server/callback>;
      ]
  ].
```

The callback address in this example is the callback address of the own RDF4J server.

#### Types to be bound

##### cx-fx:Function

Definition of the function. It defines the endpoint and describes the input and output elements (analogous to the ontology).

```ttl
################################################################
# Copyright (c) 2022,2023 T-Systems International GmbH
# Copyright (c) 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022,2023 ZF Friedrichshafen AG
# Copyright (c) 2023 Allgemeine Deutsche Automobil-Club (ADAC) e.V
# Copyright (c) 2022,2023 Mercedes-Benz AG
# Copyright (c) 2022,2023 Contributors to the Catena-X Association
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

cx-behaviour:RemainingUsefulLife rdf:type cx-fx:Function;
    dcterms:description "Remaining Useful Life is an asynchronous batch invocation."@en ;
    dcterms:title "Remaining Useful Life" ;
    cx-fx:targetUri "https://rul.supplier.com/api/v1/routine/notification";
    cx-fx:invocationMethod "POST-JSON";
  # cx-common:authenticationKey "Authorization";
  # cx-common:authenticationCode "Basic Zdm7vsdgasfghcg==";
    cx-fx:invocationMethod "POST-JSON";
    cx-fx:invocationIdProperty "header.notificationID,content.requestRefId";
    cx-fx:callbackProperty "header.respondAssetId";
    cx-fx:input cx-behaviour:notification;
    cx-fx:input cx-behaviour:sender;
    cx-fx:input cx-behaviour:senderConnector;
    cx-fx:input cx-behaviour:recipient;
    cx-fx:input cx-behaviour:recipientConnector;
    cx-fx:input cx-behaviour:recipient;
    cx-fx:input cx-behaviour:recipientConnector;
    cx-fx:input cx-behaviour:severity;
    cx-fx:input cx-behaviour:status;
    cx-fx:input cx-behaviour:targetDate;
    cx-fx:input cx-behaviour:timeStamp;
    cx-fx:input cx-behaviour:classification;
    cx-fx:input cx-behaviour:component;
    cx-fx:input cx-behaviour:observationType;
    cx-fx:input cx-behaviour:statusDate;
    cx-fx:input cx-behaviour:statusOperatingHours;
    cx-fx:input cx-behaviour:statusMileage;
    cx-fx:input cx-behaviour:observationType;
    cx-fx:input cx-behaviour:metadata;
    cx-fx:input cx-behaviour:countingMethod;
    cx-fx:input cx-behaviour:countingValue;
    cx-fx:input cx-behaviour:countingUnit;
    cx-fx:input cx-behaviour:headerChannels;
    cx-fx:input cx-behaviour:bodyClasses;
    cx-fx:input cx-behaviour:bodyCountsList;
    cx-fx:result cx-behaviour:response.
```

##### cx-fx:Argument

The input data that are received from the knowledge graph are converted to the desired JSON format that is requested by the service. Therefore, each value (input parameter) that is represented in the ontology as a separate object must be described as an argument which is related to the corresponding JSON path. The argument name represents the JSON path. Default values can be specified in case some values are not present in the knowledge graph.

```ttl
cx-behaviour:recipient rdf:type cx-fx:Argument;
  dcterms:description "Recipient of the notification as a BPN."@en ;
  dcterms:title "Notification Recipient";
  cx-fx:argumentName "header.recipientBPN";
  cx-fx:default "anonymous".
```

##### cx-fx:Result

The result of the service is also a JSON string. It consists of properties and output values.  
The mapping must provide all data that are defined in the ontology.  
The properties are of predefined types and are mapped directly (without further descriptions and attributes).  
The output values are specified each separate.

```ttl
################################################################
# Copyright (c) 2022,2023 T-Systems International GmbH
# Copyright (c) 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022,2023 ZF Friedrichshafen AG
# Copyright (c) 2023 Allgemeine Deutsche Automobil-Club (ADAC) e.V
# Copyright (c) 2022,2023 Mercedes-Benz AG
# Copyright (c) 2022,2023 Contributors to the Catena-X Association
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

cx-behaviour:response rdf:type cx-fx:Result;
  dcterms:description "The asynchronous notification response."@en ;
  dcterms:title "Asynchronous notification response." ;
  cx-fx:callbackProperty "header.referencedNotificationID";
  cx-fx:outputProperty "content.endurancePredictorOutputs";
  cx-fx:output cx-behaviour:remainingOperatingHours;
  cx-fx:output cx-behaviour:remainingRunningDistance.
```

##### cx-fx:ReturnValue

The output values (return values) are specified with their path in the output JSON structure and their data type.

```ttl
################################################################
# Copyright (c) 2022,2023 T-Systems International GmbH
# Copyright (c) 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022,2023 ZF Friedrichshafen AG
# Copyright (c) 2023 Allgemeine Deutsche Automobil-Club (ADAC) e.V
# Copyright (c) 2022,2023 Mercedes-Benz AG
# Copyright (c) 2022,2023 Contributors to the Catena-X Association
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

cx-behaviour:remainingOperatingHours rdf:type cx-fx:ReturnValue;
  dcterms:description "Predicted Operating Hours of Remaining Useful Life Response"@en ;
  dcterms:title "Remaining Useful Life Operating Hours" ;
  cx-fx:valuePath "0.remainingUsefulLife.remainingOperatingHours";
  cx-fx:dataType xsd:float.
```

#### Full Example

In this example, an asynchronous calculation service for gearbox RuL values is bound. It uses the Catena-X notification format as a container for the input data. The content of the notification is a JSON structure with a list of load spectra in it. The input format provides more than one Element (batch processing), but the RuL logic always requires exact one input per calculation. Therefore, always the first (and only the first) item of the input list is bound.

```ttl
################################################################
# Copyright (c) 2022,2023 T-Systems International GmbH
# Copyright (c) 2022,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
# Copyright (c) 2022,2023 ZF Friedrichshafen AG
# Copyright (c) 2023 Allgemeine Deutsche Automobil-Club (ADAC) e.V
# Copyright (c) 2022,2023 Mercedes-Benz AG
# Copyright (c) 2022,2023 Contributors to the Catena-X Association
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
# Rdf4j configuration for a rul-specific remoting
#
@prefix rdf:            <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs:           <http://www.w3.org/2000/01/rdf-schema#>.
@prefix rep:            <http://www.openrdf.org/config/repository#>.
@prefix sr:             <http://www.openrdf.org/config/repository/sail#>.
@prefix sail:           <http://www.openrdf.org/config/sail#>.
@prefix sp:             <http://spinrdf.org/sp#>.
@prefix xsd:            <http://www.w3.org/2001/XMLSchema#> .
@prefix json:           <https://json-schema.org/draft/2020-12/schema#> .
@prefix dcterms:        <http://purl.org/dc/terms/> .
@prefix cx-fx:          <https://w3id.org/catenax/ontology/function#>.
@prefix cx-common:      <https://w3id.org/catenax/ontology/common#>.
@prefix cx-core:        <https://w3id.org/catenax/ontology/core#>.
@prefix cx-vehicle:     <https://w3id.org/catenax/ontology/vehicle#>.
@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#>.
@prefix cx-behaviour:   <https://w3id.org/catenax/ontology/behaviour#>.

[] rdf:type rep:Repository ;
  rep:repositoryID "rul" ;
  rdfs:label "Remainig Useful Life Functions Repository" ;
  rep:repositoryImpl [
      rep:repositoryType "openrdf:SailRepository" ;
      sr:sailImpl [
        sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
        cx-fx:supportsInvocation cx-behaviour:RemainingUsefulLife;
        cx-fx:callbackAddress <https://remoting-agent.supplier.com/rdf4j-server/callback>;
      ]
  ].

cx-behaviour:RemainingUsefulLife rdf:type cx-fx:Function;
  dcterms:description "Remaining Useful Life is an asynchronous batch invocation."@en ;
  dcterms:title "Remaining Useful Life" ;
  cx-fx:targetUri "https://rul.supplier.com/api/v1/routine/notification";
  cx-fx:invocationMethod "POST-JSON";
# cx-common:authenticationKey "Authorization";
# cx-common:authenticationCode "Basic AAAAAAAAAAAAA==";
  cx-fx:invocationMethod "POST-JSON";
  cx-fx:invocationIdProperty "header.notificationID,content.requestRefId";
  cx-fx:callbackProperty "header.respondAssetId";
  cx-fx:input cx-behaviour:notification;
  cx-fx:input cx-behaviour:sender;
  cx-fx:input cx-behaviour:senderConnector;
  cx-fx:input cx-behaviour:recipient;
  cx-fx:input cx-behaviour:recipientConnector;
  cx-fx:input cx-behaviour:recipient;
  cx-fx:input cx-behaviour:recipientConnector;
  cx-fx:input cx-behaviour:severity;
  cx-fx:input cx-behaviour:status;
  cx-fx:input cx-behaviour:targetDate;
  cx-fx:input cx-behaviour:timeStamp;
  cx-fx:input cx-behaviour:classification;
  cx-fx:input cx-behaviour:component;
  cx-fx:input cx-behaviour:observationType;
  cx-fx:input cx-behaviour:statusDate;
  cx-fx:input cx-behaviour:statusOperatingHours;
  cx-fx:input cx-behaviour:statusMileage;
  cx-fx:input cx-behaviour:observationType;
  cx-fx:input cx-behaviour:metadata;
  cx-fx:input cx-behaviour:countingMethod;
  cx-fx:input cx-behaviour:countingValue;
  cx-fx:input cx-behaviour:countingUnit;
  cx-fx:input cx-behaviour:headerChannels;
  cx-fx:input cx-behaviour:bodyClasses;
  cx-fx:input cx-behaviour:bodyCountsList;
  cx-fx:result cx-behaviour:response.

cx-behaviour:notification rdf:type cx-fx:Argument;
  dcterms:description "A default notification output template."@en ;
  dcterms:title "Notification Template";
  cx-fx:argumentName ".";
  cx-fx:dataType json:Object;
  cx-fx:priority "-1"^^xsd:integer;
  #cx-fx:default "{ \"content\": { \"endurancePredictorInputs\": [ { } ]}}"^^json:Object.
  cx-fx:default "{ \"content\": { \"endurancePredictorInputs\": [ ]}}"^^json:Object.

cx-behaviour:sender rdf:type cx-fx:Argument;
  dcterms:description "Sender of the notification as a BPN."@en ;
  dcterms:title "Notification Sender";
  cx-fx:argumentName "header.senderBPN";
  cx-fx:default "anonymous".

cx-behaviour:senderConnector rdf:type cx-fx:Argument;
  dcterms:description "Sender Address of the notification as a URL."@en ;
  dcterms:title "Notification Sender Address";
  cx-fx:argumentName "header.senderAddress";
  cx-fx:default "unknown".

cx-behaviour:recipient rdf:type cx-fx:Argument;
  dcterms:description "Recipient of the notification as a BPN."@en ;
  dcterms:title "Notification Recipient";
  cx-fx:argumentName "header.recipientBPN";
  cx-fx:default "anonymous".

cx-behaviour:recipientConnector rdf:type cx-fx:Argument;
  dcterms:description "Recipient Address of the notification as a URL."@en ;
  dcterms:title "Notification Recipient Address";
  cx-fx:argumentName "header.recipientAddress";
  cx-fx:default "unknown".

cx-behaviour:severity rdf:type cx-fx:Argument;
  dcterms:description "Severity of the notification."@en ;
  dcterms:title "Notification Severity";
  cx-fx:argumentName "header.severity";
  cx-fx:dataType xsd:string;
  cx-fx:default "MINOR".

cx-behaviour:status rdf:type cx-fx:Argument;
  dcterms:description "Status of the notification."@en ;
  dcterms:title "Notification Status";
  cx-fx:argumentName "header.status";
  cx-fx:dataType xsd:string;
  cx-fx:default "SENT".

cx-behaviour:targetDate rdf:type cx-fx:Argument;
  dcterms:description "Target Date of the notification."@en ;
  dcterms:title "Notification Target Date";
  cx-fx:dataType xsd:dateTime;
  cx-fx:argumentName "header.targetDate".

cx-behaviour:timeStamp rdf:type cx-fx:Argument;
  dcterms:description "Timestamp of the notification."@en ;
  dcterms:title "Notification Timestamp";
  cx-fx:dataType xsd:dateTime;
  cx-fx:argumentName "header.timeStamp".

cx-behaviour:classification rdf:type cx-fx:Argument;
  dcterms:description "Classification of the notification."@en ;
  dcterms:title "Notification Classification";
  cx-fx:argumentName "header.classification";
  cx-fx:dataType xsd:string;
  cx-fx:default "RemainingUsefulLifePredictor".

cx-behaviour:component rdf:type cx-fx:Argument;
  dcterms:description "Component of the Predicition."@en ;
  dcterms:title "Predicted Component";
  cx-fx:formsBatchGroup "true"^^xsd:boolean;
  cx-fx:argumentName "content.endurancePredictorInputs.0.componentId,content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.targetComponentId".

cx-behaviour:observationType rdf:type cx-fx:Argument;
  dcterms:description "The type of observation made."@en ;
  dcterms:title "Observation Type";
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.componentDescription";
  cx-fx:dataType xsd:string.

cx-behaviour:metadata rdf:type cx-fx:Argument;
  dcterms:description "Metadata of the Loadspectrum."@en ;
  dcterms:title "Loadspectrum Metadata";
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}";
  cx-fx:dataType json:Object;
  cx-fx:priority "0"^^xsd:integer;
  cx-fx:default "{ \"metadata\":{ \"projectDescription\": \"pnr_76543\", \"routeDescription\": \"logged\" }, \"bammId\": \"urn:bamm:io.openmanufacturing.digitaltwin:1.0.0#ClassifiedLoadSpectrum\" }"^^json:Object.

cx-behaviour:statusDate rdf:type cx-fx:Argument;
  dcterms:description "Time of Recording."@en ;
  dcterms:title "Loadspectrum Recording Time";
  cx-fx:dataType xsd:dateTime;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.date".

cx-behaviour:statusOperatingHours rdf:type cx-fx:Argument;
  dcterms:description "Operating Hours of Target Component at Time of Recording."@en ;
  dcterms:title "Loadspectrum Operating Hours";
  cx-fx:dataType xsd:float;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.operatingHours".

cx-behaviour:statusMileage rdf:type cx-fx:Argument;
  dcterms:description "Mileage of Component at Time of Recording."@en ;
  dcterms:title "Loadspectrum Mileage";
  cx-fx:dataType xsd:int;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.metadata.status.mileage".

cx-behaviour:countingUnit rdf:type cx-fx:Argument;
  dcterms:description "Counting Unit of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Unit";
  cx-fx:dataType xsd:string;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingUnit".

cx-behaviour:countingValue rdf:type cx-fx:Argument;
  dcterms:description "Counting Value Name of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Value";
  cx-fx:dataType xsd:string;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingValue,content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.counts.countsName".

cx-behaviour:countingMethod rdf:type cx-fx:Argument;
  dcterms:description "Counting Method of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counting Method";
  cx-fx:dataType xsd:string;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.countingMethod".

cx-behaviour:headerChannels rdf:type cx-fx:Argument;
  dcterms:description "Channels of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Channels";
  cx-fx:dataType json:Object;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.header.channels".

cx-behaviour:bodyClasses rdf:type cx-fx:Argument;
  dcterms:description "Classes of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Classes";
  cx-fx:dataType json:Object;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.classes".

cx-behaviour:bodyCountsList rdf:type cx-fx:Argument;
  dcterms:description "Counts List of Load Spectrum."@en ;
  dcterms:title "Loadspectrum Counts List";
  cx-fx:dataType json:Object;
  cx-fx:argumentName "content.endurancePredictorInputs.0.classifiedLoadSpectrum{https://w3id.org/catenax/ontology/behaviour#observationType}.body.counts.countsList".

cx-behaviour:response rdf:type cx-fx:Result;
  dcterms:description "The asynchronous notification response."@en ;
  dcterms:title "Asynchronous notification response." ;
  cx-fx:callbackProperty "header.referencedNotificationID";
  cx-fx:outputProperty "content.endurancePredictorOutputs";
  cx-fx:output cx-behaviour:remainingOperatingHours;
  cx-fx:output cx-behaviour:remainingRunningDistance.

cx-behaviour:remainingOperatingHours rdf:type cx-fx:ReturnValue;
  dcterms:description "Predicted Operating Hours of Remaining Useful Life Response"@en ;
  dcterms:title "Remaining Useful Life Operating Hours" ;
  cx-fx:valuePath "0.remainingUsefulLife.remainingOperatingHours";
  cx-fx:dataType xsd:float.

cx-behaviour:remainingRunningDistance rdf:type cx-fx:ReturnValue;
  dcterms:description "Predicted Distance of Remaining Useful Life Response"@en ;
  dcterms:title "Remaining Useful Life Distance" ;
  cx-fx:valuePath "0.remainingUsefulLife.remainingRunningDistance";
  cx-fx:dataType xsd:int.
```

### Graph asset for the service binding

To enable the knowledge agent's matchmaking agent to find the service binding, a graph asset has to be registered at the EDC. This asset must have a property "rdfs:isDefinedBy" that defines the shape of the provided graph.

```shacl
"<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>",
            "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
            "sh:shapesGraph": "@prefix cx-common: <https://w3id.org/catenax/ontology/common#>. \n@prefix : <GraphAsset?supplier=BehaviourTwinRUL#> .\n@prefix cx-prognosis: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n\n:Tier1LifetimePrognosis rdf:type sh:NodeShape ;\n  sh:targetClass cx-prognosis:Function ;\n  sh:property [\n        sh:path cx-prognosis:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL000000000000> ]."
```

For more information see the [Agents KIT](../../knowledge-agents/adoption-view/intro).
