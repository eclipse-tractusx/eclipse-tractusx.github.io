---
sidebar_position: 1
title: Provisioning
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

For Providing Data and/or Functions in Semantic-Web Driven Dataspace Applications following the Catena-X Knowledge Agents Standard, we recommend deploying a [Tractus-X Binding Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/README.md)

More specifically, we recommend to deploy

* the [Tractus-X Provisioning Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/provisioning/README.md) for relational or virtualized data sources.
* the [Tractus-X Remoting Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/remoting/README.md) for REST-based API functions.


For more information see

* Our [Adoption](../adoption-view/intro) guidelines
* The [Implementation](../development-view/architecture) documentation
* The [Deployment](deployment) overview
* The [Conformity](testbed) testbed
* A [Data Sovereignity & Graph Policy](policy) discussion

### Quick Setup Guide for Data Provisioning

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses a postgresql telematics sample, see [here](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/provisioning/README.md) for more options and full details).

```yaml
    - name: provisioning-agent
      repository: https://eclipse-tractusx.github.io/charts/dev
      version: 1.10.15
      alias: my-provider-agent
```

Then configure the agent in the values.yaml

```yaml
my-provider-agent: 
  nameOverride: my-provider-agent
  fullnameOverride: my-provider-agent
  bindings: 
    # mutes the default example endpoint
    dtc: null
    # adds a telematics graph based on the default (builtin) ontology 
    telematics: 
      port: 8080
      path: /telematics/(.*)
      settings: 
        jdbc.url: 'jdbc:postgresql://{{mydatabasehost}}:5432/{{mydatabase}}'
        jdbc.user: <path:{{vaultpath}}#username>
        jdbc.password: <path:{{vaultpath}}#password>
        jdbc.driver: 'org.postgresql.Driver'
      ontology: cx-ontology.xml
      mapping: |-
        [PrefixDeclaration]
        cx-common:          https://w3id.org/catenax/ontology/common#
        cx-core:            https://w3id.org/catenax/ontology/core#
        cx-vehicle:         https://w3id.org/catenax/ontology/vehicle#
        cx-reliability:     https://w3id.org/catenax/ontology/reliability#
        uuid:		        urn:uuid:
        bpnl:		        bpn:legal:
        owl:		        http://www.w3.org/2002/07/owl#
        rdf:		        http://www.w3.org/1999/02/22-rdf-syntax-ns#
        xml:		        http://www.w3.org/XML/1998/namespace
        xsd:		        http://www.w3.org/2001/XMLSchema#
        json:               https://json-schema.org/draft/2020-12/schema#
        obda:		        https://w3id.org/obda/vocabulary#
        rdfs:		        http://www.w3.org/2000/01/rdf-schema#
        oem:                urn:oem:

        [MappingDeclaration] @collection [[
        mappingId	vehicles
        target		<{vehicle_id}> rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {van}^^xsd:string; cx-vehicle:worldManufaturerId bpnl:{localIdentifiers_manufacturerId}; cx-vehicle:productionDate {production_date}^^xsd:date.
        source		SELECT vehicle_id, van, '{{MYBPNL}}' as localIdentifiers_manufacturerId, production_date FROM vehicles

        mappingId	partsvehicle
        target		<{gearbox_id}> cx-vehicle:isPartOf <{vehicle_id}> .
        source		SELECT vehicle_id, gearbox_id FROM vehicles

        mappingId	vehicleparts
        target		<{vehicle_id}> cx-vehicle:hasPart <{gearbox_id}> .
        source		SELECT vehicle_id, gearbox_id FROM vehicles

        mappingId	parts
        target		<{gearbox_id}> rdf:type cx-vehicle:Part ; cx-vehicle:id {gearbox_id}^^xsd:string; cx-vehicle:name {partTypeInformation_nameAtManufacturer}^^xsd:string; cx-vehicle:number {partTypeInformation_manufacturerPartId}^^xsd:string; cx-vehicle:supplier bpnl:{localIdentifiers_manufacturerId}; cx-vehicle:productionDate {production_date}^^xsd:date .
        source		SELECT gearbox_id, production_date, 'Differential Gear' as partTypeInformation_nameAtManufacturer, '{{PARTNERTBPNL}}' as localIdentifiers_manufacturerId, 'Dummy Gearbox' as partTypeInformation_manufacturerPartId FROM vehicles

        mappingId   partAnalysis
        target		oem:{newest_telematics_id} cx-reliability:analysedObject <{gearbox_id}>.
        source		SELECT gearbox_id, newest_telematics_id FROM vehicles

        mappingId   analysisInformation
        target      oem:{id} rdf:type cx-reliability:Analysis; cx-reliability:operatingHoursOfVehicle {metadata_status_operatingHours}^^xsd:float; cx-core:startDateTime {metadata_status_date}^^xsd:dateTime; cx-core:endDateTime {metadata_status_date}^^xsd:dateTime; cx-reliability:mileageOfVehicle {metadata_status_mileage}^^xsd:int.
        source		SELECT id, floor((load_spectra::jsonb->0->'metadata'->'status'->>'operatingHours')::numeric)::integer as metadata_status_operatingHours, replace(load_spectra::jsonb->0->'metadata'->'status'->>'date','Z','.000Z') as metadata_status_date,load_spectra::jsonb->0->'metadata'->'status'->>'mileage' as metadata_status_mileage FROM telematics_data

        mappingId   analysisResult
        target		oem:{newest_telematics_id} cx-reliability:result oem:{newest_telematics_id}/{name}.
        source		SELECT gearbox_id, newest_telematics_id, name FROM vehicles, (VALUES ('GearSet'), ('GearOil'), ('Clutch')) AS spectrum(name)

        mappingId   loadspectrum
        target      oem:{id}/{name} rdf:type cx-reliability:LoadSpectrum; cx-core:id {name}^^xsd:string; cx-core:name {metadata_projectDescription}^^xsd:string; cx-reliability:description {metadata_routeDescription}^^xsd:string; cx-reliability:countingValue {body_counts_countsName}^^xsd:string; cx-reliability:countingUnit {header_countingUnit}^^xsd:string; cx-reliability:countingMethod {header_countingMethod}^^xsd:string; cx-reliability:channels {header_channels}^^json:Object; cx-reliability:classes {body_classes}^^json:Object; cx-reliability:values {body_counts_countsList}^^json:Object .
        source		SELECT id, index, name, load_spectra::jsonb->index->'metadata'->>'projectDescription' as metadata_projectDescription, load_spectra::jsonb->index->'metadata'->>'routeDescription' as metadata_routeDescription, load_spectra::jsonb->index->'header'->>'countingUnit' as header_countingUnit, load_spectra::jsonb->index->'header'->>'countingMethod' as header_countingMethod, load_spectra::jsonb->index->'header'->'channels' as header_channels, load_spectra::jsonb->index->'body'->'classes' as body_classes, load_spectra::jsonb->index->'body'->'counts'->'countsName' as body_counts_countsName, load_spectra::jsonb->index->'body'->'counts'->'countsList' as body_counts_countsList FROM telematics_data, (VALUES (0,'GearSet'), (1,'GearOil'), (2,'Clutch')) AS spectrum(index,name)
        ]]  
  ingresses:
    - enabled: true
      # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
      hostname: "my-provider-agent.internal"
      annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /$1
        nginx.ingress.kubernetes.io/use-regex: "true"
      # -- Agent endpoints exposed by this ingress resource
      endpoints:
        - telematics
      tls:
        enabled: true
        secretName: my-provider-tls
```

The above mapping resource is written in a [OBDA Mapping Definition Language](https://ontop-vkg.org/tutorial/mapping/).

### Quick Setup Guide for Function Provisioning (Remoting)

Add a helm dependency to your umbrella/infrastructure Chart.yaml(this example uses a [Behaviour Twin RUL](/docs-kits/kits/Behaviour Twin RuL Kit/page_adoption_view) sample backend, see [here](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/remoting/README.md) for more options and full details).

```yaml
    - name: remoting-agent
      repository: https://eclipse-tractusx.github.io/charts/dev
      version: 1.10.15
      alias: my-remoting-agent
```

Then configure the agent in the values.yaml

```yaml
my-remoting-agent: 
  nameOverride: my-remoting-agent
  fullnameOverride: my-remoting-agent
  ingresses:
    - enabled: true
      # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
      hostname: "my-remoting-agent.internal"
      # -- Agent endpoints exposed by this ingress resource
      endpoints:
        - default
      tls:
        enabled: true
        secretName: my-remoting-tls
  repositories:
    rul: |-
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
              cx-fx:callbackAddress <https://my-remoting-agent.internal/rdf4j-server/callback>;
            ]
        ].

      cx-behaviour:RemainingUsefulLife rdf:type cx-fx:Function;
        dcterms:description "Remaining Useful Life is an asynchronous batch invocation."@en ;
        dcterms:title "Remaining Useful Life" ;
        cx-fx:targetUri "https://{{RULAPI}}";
        cx-fx:invocationMethod "POST-JSON";
      # cx-common:authenticationKey "Authorization";
      # cx-common:authenticationCode "Basic Zm9vOmJhcg==";
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

### Quick Setup Guide for Registering A Graph in the EDC

The next steps require that you have already deployed the [Agent-Enabled EDC](agent_edc).

We demonstrate the steps by interacting with the EDC Control Plane Management API

#### Register A Graph Policy

```console
curl --location --globoff '{{controlPlaneName}}/management/v2/policydefinitions' \
--header 'X-Api-Key: {{EDC_API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/",
        "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@type": "PolicyDefinitionRequestDto",
    "@id": "Policy?me=GraphPolicy",
    "policy": {
		"@type": "Policy",
		"odrl:permission" : [{
			"odrl:action" : "USE",
			"odrl:constraint" : {
				"@type": "LogicalConstraint",
				"odrl:or" : [{
					"@type" : "Constraint",
					"odrl:leftOperand" : "BusinessPartnerNumber",
					"odrl:operator" : {
                        "@id": "odrl:eq"
                    },
					"odrl:rightOperand" : "{{PARTNERBPNL}}"
				},
                {
					"@type" : "Constraint",
					"odrl:leftOperand" : "BusinessPartnerNumber",
					"odrl:operator" : {
                        "@id": "odrl:eq"
                    },
					"odrl:rightOperand" : "{{MYBPNL}}"
				}]
			}
		}]
    }
}
'
```

#### Register A Graph Contract

```console
curl --location --globoff '{{controlPlaneName}}/management/v2/policydefinitions' \
--header 'X-Api-Key: {{EDC_API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?me=GraphContract",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?me=GraphPolicy",
    "contractPolicyId": "Policy?me=GraphPolicy",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?me=Graph"
    }
}
'
```

#### Register a Graph Asset

```console
curl --location --globoff '{{controlPlaneName}}/management/v2/policydefinitions' \
--header 'X-Api-Key: {{EDC_API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "sh": "http://www.w3.org/ns/shacl#"
    },
    "asset": {
        "@type": "Asset",
        "@id": "GraphAsset?me=Sample", 
        "properties": {
            "name": "Sample Asset.",
            "description": "A sample graph asset/offering over a binding agent.",
            "version": "23.12",
            "contenttype": "application/json, application/xml",
            "cx-common:publishedUnderContract": "Contract?me=Graph",
            "rdf:type": "cx-common:GraphAsset",
            "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>",
            "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
            "sh:shapesGraph": "@prefix : <GraphAsset?me=Sample#> .\n",
            "cx-common:isFederated": "true^^xsd:boolean"
        }
    },
    "dataAddress": {
        "id": "GraphAsset?me=Sample", 
        "@type": "DataAddress",
        "baseUrl": "http://{{binding-agent-internal}}",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true",
        "authKey": "{{binding-agent-key}}",
        "authCode": "{{binding-agent-token}}",
        "cx-common:allowServicePattern": "((https)|(edcs?))://.*",
        "cx-common:denyServicePattern": "https://ifconfig\\.me.*"        
    }
}
'
```

For more information see

* Our [Adoption](../adoption-view/intro) guidelines
* The [Implementation](../development-view/architecture) documentation
* The [Deployment](deployment) overview
* A [Data Sovereignity & Graph Policy](policy) discussion

## 

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
