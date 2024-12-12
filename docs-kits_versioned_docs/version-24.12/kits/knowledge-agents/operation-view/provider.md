---
sidebar_position: 1
title: Provisioning
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

For Providing Data and/or Functions in Semantic-Web Driven Dataspace Applications following the Catena-X Knowledge Agents Standard, this KIT recommends deploying a [Tractus-X Binding Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/README.md)

More specifically, this KIT recommends to deploy

* the [Tractus-X Provisioning Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/provisioning/README.md) for relational or virtualized data sources.
* the [Tractus-X Remoting Agent](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/remoting/README.md) for REST-based API functions.

For more information see

* Our [Adoption](../adoption-view/intro) guidelines
* The [Implementation](../development-view/architecture) documentation
* The [Deployment](deployment) overview
* The [Conformity](testbed) testbed
* A [Data Sovereignity & Graph Policy](policy) discussion

## Quick Setup Guide for Data Provisioning

### 1. Add Helm Dependency to the Binding (Provisioning) Agent

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses a Dremio datalake with a telematics schema, see [here](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/provisioning/README.md) for more options and full details).

```yaml
    - name: provisioning-agent
      repository: https://eclipse-tractusx.github.io/charts/dev
      version: 1.14.24
      alias: my-provider-agent
```

### 2. Configure the Provisioning Agent with Mappings

Then configure the provisioning agent in the values.yaml - especially you introduce so-called mappings which are correspondences between identifiable and descriptive 'entities' or 'rows' in the database and
subgraphs (or 'node surroundings') in the graph. Using these mappings, the provisioning agent will be able to translate any SPARQL query (or more specific: a SPARQL profile called KA-BIND) into an efficient SQL query.

Each mapping will then be presented by its own endpoint (= graph). Each graph usually corresponds to a use case role, such as the OEM providing telematics data for vehicle components in a Behaviour Twin Prognosis. The use case role will determine the ontology concepts which the use case participant may need to provide/map or consume in its skills. In the following example, we map an existing datalake schema with telematics data to the [Reliablity Ontology](https://w3id.org/catenax/ontology/reliability), the [Vehicle Ontology](https://w3id.org/catenax/ontology/vehicle), the [Common (Dataspace) Ontology](https://w3id.org/catenax/ontology/common) and the [Core (Meta) Ontology](https://w3id.org/catenax/ontology/core) - all being part of the [Complete (Merged) Ontology](https://w3id.org/catenax/ontology).

The below mapping resource is written in the [OBDA Mapping Definition Language](https://ontop-vkg.org/tutorial/mapping/). Note that the network interface is not supposed to be public (hence authentication is not used there), but should only be visible to the [Agent Plane](agent_edc).

```yaml
my-provider-agent: 
  nameOverride: my-provider-agent
  fullnameOverride: my-provider-agent
  bindings: 
    # mutes the default example endpoint
    dtc: null
    # adds a telematics graph based on the standard ontology 
    telematics: 
      port: 8080
      path: /telematics/(.*)
      settings: 
        jdbc.url='jdbc:dremio:direct=data-backend:31010
        jdbc.driver=com.dremio.jdbc.Driver
        jdbc.user=<path:{{vaultpath}}#username>
        jdbc.password=<path:{{vaultpath}}#password>
        ontop.cardinalityMode=LOOSE
      ontology: cx-ontology.xml
      mapping: |-
        [PrefixDeclaration]
        cx-common:          https://w3id.org/catenax/ontology/common#
        cx-core:            https://w3id.org/catenax/ontology/core#
        cx-vehicle:         https://w3id.org/catenax/ontology/vehicle#
        cx-reliability:     https://w3id.org/catenax/ontology/reliability#
        cx-taxo:            https://w3id.org/catenax/taxonomy#
        uuid:               urn:uuid:
        bpnl:               bpn:legal:
        owl:                http://www.w3.org/2002/07/owl#
        rdf:                http://www.w3.org/1999/02/22-rdf-syntax-ns#
        xml:                http://www.w3.org/XML/1998/namespace
        xsd:                http://www.w3.org/2001/XMLSchema#
        json:               https://json-schema.org/draft/2020-12/schema#
        obda:               https://w3id.org/obda/vocabulary#
        rdfs:               http://www.w3.org/2000/01/rdf-schema#

        [MappingDeclaration] @collection [[
        mappingId vehicles
        target    uuid:{catenaXId} rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {localIdentifiers_van}^^xsd:string; cx-vehicle:manufacturer bpnl:{localIdentifiers_manufacturerId}; cx-vehicle:productionDate {manufacturingInformation_date}^^xsd:date.
        source    SELECT "catenaXId", "localIdentifiers_van", "localIdentifiers_manufacturerId", "manufacturingInformation_date" FROM "HI_TEST_OEM"."CX_RUL_SerialPartTypization_Vehicle" vehicles

        mappingId partsvehicle
        target    uuid:{childCatenaXId} cx-vehicle:isPartOf uuid:{catenaXId} .
        source    SELECT "catenaXId", "childCatenaXId" FROM  "HI_TEST_OEM"."CX_RUL_AssemblyPartRelationship" vehicleparts

        mappingId vehicleparts
        target    uuid:{catenaXId} cx-vehicle:hasPart uuid:{childCatenaXId}.
        source    SELECT "catenaXId", "childCatenaXId" FROM  "HI_TEST_OEM"."CX_RUL_AssemblyPartRelationship" vehicleparts

        mappingId parts
        target    uuid:{catenaXId} rdf:type cx-vehicle:Part ; cx-vehicle:id {localIdentifiers_partInstanceId}^^xsd:string; cx-vehicle:name {partTypeInformation_nameAtManufacturer}^^xsd:string; cx-vehicle:number {partTypeInformation_manufacturerPartId}^^xsd:string; cx-vehicle:supplier bpnl:{localIdentifiers_manufacturerId}; cx-vehicle:productionDate {manufacturingInformation_date}^^xsd:date .
        source    SELECT "catenaXId", "localIdentifiers_partInstanceId", "partTypeInformation_nameAtManufacturer", "partTypeInformation_manufacturerPartId", "localIdentifiers_manufacturerId", "manufacturingInformation_date" FROM "HI_TEST_OEM"."CX_RUL_SerialPartTypization_Component" parts 

        mappingId partAnalysis
        target    uuid:{catenaXId}/{targetComponentId} cx-reliability:analysedObject uuid:{targetComponentId}.
        source    SELECT "catenaXId", "targetComponentId" FROM "HI_TEST_OEM"."CX_RUL_Analysis" analysis

        mappingId analysisInformation
        target    uuid:{catenaXId}/{targetComponentId} rdf:type cx-reliability:Analysis; cx-reliability:operatingHoursOfVehicle {metadata_status_operatingHours_avg}^^xsd:float; cx-core:startDateTime {metadata_status_date_min}^^xsd:dateTime; cx-core:endDateTime {metadata_status_date_max}^^xsd:dateTime; cx-reliability:mileageOfVehicle {metadata_status_mileage_avg}^^xsd:int.
        source    SELECT "catenaXId", "targetComponentId", "metadata_status_operatingHours_avg", "metadata_status_date_min", "metadata_status_date_max", "metadata_status_mileage_avg" FROM "HI_TEST_OEM"."CX_RUL_Analysis" loadspectrum

        mappingId analysisResult
        target    uuid:{catenaXId}/{targetComponentId} cx-reliability:result uuid:{catenaXId}/{targetComponentId}/{metadata_componentDescription} .
        source    SELECT "catenaXId", "targetComponentId", "metadata_componentDescription" FROM "HI_TEST_OEM"."CX_RUL_LoadCollective" loadspectrum

        mappingId loadspectrum
        target    uuid:{catenaXId}/{targetComponentId}/{metadata_componentDescription} rdf:type cx-reliability:LoadSpectrum; cx-core:id cx-taxo:{metadata_componentDescription}; cx-core:name {metadata_projectDescription}^^xsd:string; cx-reliability:description {metadata_routeDescription}^^xsd:string; cx-reliability:countingValue {header_countingValue}^^xsd:string; cx-reliability:countingUnit {header_countingUnit}^^xsd:string; cx-reliability:countingMethod {header_countingMethod}^^xsd:string; cx-reliability:channels {header_channels}^^json:Object; cx-reliability:classes {body_classes}^^json:Object; cx-reliability:values {body_counts_countsList}^^json:Object .
        source    SELECT "catenaXId", "targetComponentId", "metadata_projectDescription", "metadata_componentDescription", "metadata_routeDescription", "metadata_status_date", "header_countingValue", "header_countingUnit", "header_countingMethod", "header_channels", "body_counts_countsList", "body_classes" FROM "HI_TEST_OEM"."CX_RUL_LoadCollective" loadspectrum
        ]]
  ingresses:
    - enabled: true
      # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
      hostname: "my-provider-agent.domain"
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

### 3. Testdrive the Provisioning Agent

After the provisioning agent has been setup, you may already invoke SPARQL queries against it in the KA-BIND profile:

```console
curl --location 'https://my-provider-agent.domain/telematics/sparql' \
--header 'Content-Type: application/sparql-query' \
--header 'Accept: application/json' \
--data 'PREFIX cx-common:       <https://w3id.org/catenax/ontology/common#>
PREFIX cx-core:         <https://w3id.org/catenax/ontology/core#>
PREFIX cx-vehicle:      <https://w3id.org/catenax/ontology/vehicle#>
PREFIX cx-reliability:  <https://w3id.org/catenax/ontology/reliability#>
PREFIX rdf:             <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:            <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd:             <http://www.w3.org/2001/XMLSchema#>
PREFIX json:            <https://json-schema.org/draft/2020-12/schema#> 

SELECT ?vehicle ?van ?aggregate ?assembly ?supplier ?teleAnalysis ?operatingTime ?mileage ?recordDate ?ls_type ?ls_name ?ls_value ?ls_unit ?ls_method ?ls_channels ?ls_classes ?ls_values WHERE {

    VALUES (?van ?aggregate) { 
        ("FNLQNRVCOFLHAQ"^^xsd:string "Differential Gear"^^xsd:string) 
    }

    VALUES (?ls_type) { 
        (<https://w3id.org/catenax/taxonomy#GearSet>)
    }

    ?vehicle rdf:type cx-vehicle:Vehicle;
        cx-vehicle:vehicleIdentificationNumber ?van.

    ?assembly rdf:type cx-vehicle:Part;
        cx-vehicle:name ?aggregate;
        cx-vehicle:isPartOf ?vehicle;
        cx-vehicle:supplier ?supplier.
        
    ?teleAnalysis rdf:type cx-reliability:Analysis;
        cx-reliability:analysedObject ?assembly;
        cx-reliability:operatingHoursOfVehicle ?operatingTime;
        cx-reliability:mileageOfVehicle ?mileage;
        cx-core:startDateTime ?recordDate;
        cx-reliability:result [
            cx-core:id ?ls_type;
            cx-core:name ?ls_name;
            cx-reliability:countingValue ?ls_value;
            cx-reliability:countingUnit ?ls_unit;
            cx-reliability:countingMethod ?ls_method;
            cx-reliability:channels ?ls_channels;
            cx-reliability:classes ?ls_classes;
            cx-reliability:values ?ls_values
        ].
} 
'
```

and you should receive an answer, such as

```json
{
    "head": {
        "vars": [
            "vehicle",
            "van",
            "aggregate",
            "assembly",
            "supplier",
            "teleAnalysis",
            "operatingTime",
            "mileage",
            "recordDate",
            "ls_type",
            "ls_name",
            "ls_value",
            "ls_unit",
            "ls_method",
            "ls_channels",
            "ls_classes",
            "ls_values"
        ]
    },
    "results": {
        "bindings": [
            {
                "vehicle": {
                    "type": "uri",
                    "value": "urn:uuid:79d19614-b699-4716-b232-ef250e1c1772"
                },
                "van": {
                    "type": "literal",
                    "value": "FNLQNRVCOFLHAQ"
                },
                "aggregate": {
                    "type": "literal",
                    "value": "Differential Gear"
                },
                "assembly": {
                    "type": "uri",
                    "value": "urn:uuid:4773625a-5e56-4879-abed-475be29bd664"
                },
                "supplier": {
                    "type": "uri",
                    "value": "bpn:legal:BPNL00000003B2OM"
                },
                "teleAnalysis": {
                    "type": "uri",
                    "value": "urn:uuid:79d19614-b699-4716-b232-ef250e1c1772/4773625a-5e56-4879-abed-475be29bd664"
                },
                "operatingTime": {
                    "datatype": "http://www.w3.org/2001/XMLSchema#float",
                    "type": "literal",
                    "value": "2230.1333333333337"
                },
                "mileage": {
                    "datatype": "http://www.w3.org/2001/XMLSchema#int",
                    "type": "literal",
                    "value": "51440"
                },
                "recordDate": {
                    "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
                    "type": "literal",
                    "value": "2022-03-15T12:00:00.000Z"
                },
                "ls_type": {
                    "type": "uri",
                    "value": "https://w3id.org/catenax/taxonomy#GearSet"
                },
                "ls_name": {
                    "type": "literal",
                    "value": "projectnumber Stadt"
                },
                "ls_value": {
                    "type": "literal",
                    "value": "Counts"
                },
                "ls_unit": {
                    "type": "literal",
                    "value": "unit:ONE"
                },
                "ls_method": {
                    "type": "literal",
                    "value": "LRD"
                },
                "ls_channels": {
                    "datatype": "https://json-schema.org/draft/2020-12/schema#Object",
                    "type": "literal",
                    "value": "[ {\\x0A  \"unit\" : \"unit:rpm\",\\x0A  \"numberOfBins\" : 128,\\x0A  \"channelName\" : \"N_TU\",\\x0A  \"upperLimit\" : 12700.0,\\x0A  \"lowerLimit\" : -100.0\\x0A}, {\\x0A  \"unit\" : \"unit:Nm\",\\x0A  \"numberOfBins\" : 128,\\x0A  \"channelName\" : \"T_TU\",\\x0A  \"upperLimit\" : 1290.0,\\x0A  \"lowerLimit\" : -1270.0\\x0A}, {\\x0A  \"unit\" : \"unit:ONE\",\\x0A  \"numberOfBins\" : 10,\\x0A  \"channelName\" : \"Z_GANG\",\\x0A  \"upperLimit\" : 9.5,\\x0A  \"lowerLimit\" : -0.5\\x0A} ]"
                },
                "ls_classes": {
                    "datatype": "https://json-schema.org/draft/2020-12/schema#Object",
                    "type": "literal",
                    "value": "[ {\\x0A  \"className\" : \"N_TU-class\",\\x0A  \"classList\" : [ 1, 1, 1, 2, 3 ]\\x0A}, {\\x0A  \"className\" : \"Z_GANG-class\",\\x0A  \"classList\" : [ 1, 3, 2, 3, 3 ]\\x0A} ]"
                },
                "ls_values": {
                    "datatype": "https://json-schema.org/draft/2020-12/schema#Object",
                    "type": "literal",
                    "value": "[ 0.6996546387672424, 2.277406692504883, 3.5231547355651855, 13.261415481567383, 28.902271270751953 ]"
                }
            }
        ]
    }
}
```

## Quick Setup Guide for Function Provisioning (Remoting)

### 1. Add a Helm Dependency to the Binding (Remoting) Agent

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses a [Behaviour Twin KIT](../../behaviour-twin-kit/overview) Remaining Useful Life RUL and Health Indicator HIbackends, see [here](https://github.com/eclipse-tractusx/knowledge-agents/blob/main/remoting/README.md) for more options and full details).

```yaml
    - name: remoting-agent
      repository: https://eclipse-tractusx.github.io/charts/dev
      version: 1.14.24
      alias: my-remoting-agent
```

### 2. Configure the Remoting Agent with a Function Binding

Then configure the remoting agent in the values.yaml - especially you introduce so-called bindings which are correspondences between REST-based API calls (carrying either JSON or XML schemas) and dedciated invocation nodes that are related with input and output predicates in a graph. Using these bindings, the remoting agent will be able to translate any SPARQL query (or more specific: a SPARQL profile called KA-BIND-FUNC) into batches of API calls.

Each binding will then be presented by its own repository (= graph). Each graph usually corresponds to a use case role, such as the SUPPLIER providing either RUL or HI prognosis function in a Behaviour Twin Prognosis. The use case role will determine the ontology concepts which the use case participant may need to provide/map or consume in its skills. In the following example, we map existing API backends to the [Behaviour Ontology](https://w3id.org/catenax/ontology/behaviour), the [Reliability Ontology](https://w3id.org/catenax/ontology/reliability), the [Vehicle Ontology](https://w3id.org/catenax/ontology/vehicle), the [Function Ontology](https://w3id.org/catenax/ontology/function), the [Common (Dataspace) Ontology](https://w3id.org/catenax/ontology/common) and the [Core (Meta) Ontology](https://w3id.org/catenax/ontology/core) - all being part of the [Complete (Merged) Ontology](https://w3id.org/catenax/ontology).

The below binding resources are written in a [Terse Triple Language - TTL](https://www.w3.org/TR/turtle/) syntax suitable for [RDF4J](https://rdf4j.org/documentation/tools/repository-configuration/) repositories. Note that the network interface is not supposed to be public (hence authentication is not used there), but should only be visible to the [Agent Plane](agent_edc).

```yaml
my-remoting-agent: 
  nameOverride: my-remoting-agent
  fullnameOverride: my-remoting-agent
  ingresses:
    - enabled: true
      # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
      hostname: "my-remoting-agent.domain"
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
              cx-fx:callbackAddress <https://my-remoting-agent.domain/rdf4j-server/callback>;
            ]
        ].

      cx-behaviour:RemainingUsefulLife rdf:type cx-fx:Function;
        dcterms:description "Remaining Useful Life is an asynchronous batch invocation."@en ;
        dcterms:title "Remaining Useful Life" ;
        cx-fx:targetUri "http://service-backend:5005/api/rul2";
        cx-fx:invocationMethod "POST-JSON";
      #  cx-common:authenticationKey "Authorization";
      #  cx-common:authenticationCode "Basic TOKEN";
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
        cx-fx:input cx-behaviour:metadata;
        cx-fx:input cx-behaviour:statusDate;
        cx-fx:input cx-behaviour:statusOperatingHours;
        cx-fx:input cx-behaviour:statusMileage;
        cx-fx:input cx-behaviour:countingMethod;
        cx-fx:input cx-behaviour:countingValue;
        cx-fx:input cx-behaviour:countingUnit;
        cx-fx:input cx-behaviour:headerChannels;
        cx-fx:input cx-behaviour:bodyClasses;
        cx-fx:input cx-behaviour:bodyCountsList;
        cx-fx:result cx-behaviour:RemainingUsefulLifeResult.

      cx-behaviour:notification rdf:type cx-fx:Argument;
        dcterms:description "A default notification output template."@en ;
        dcterms:title "Notification Template";
        cx-fx:argumentName ".";
        cx-fx:dataType json:Object;
        cx-fx:priority "-1"^^xsd:integer;
        cx-fx:default "{ \"content\": { \"endurancePredictorInputs\": []}}"^^json:Object.

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
        cx-fx:strip <https://w3id.org/catenax/taxonomy#>;
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

      cx-behaviour:RemainingUsefulLifeResult rdf:type cx-fx:Result;
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
    health: |-
      #
      # Rdf4j configuration for a hi-specific remoting
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
        rep:repositoryID "health" ;
        rdfs:label "Health Indicator Functions Repository" ;
        rep:repositoryImpl [
            rep:repositoryType "openrdf:SailRepository" ;
            sr:sailImpl [
              sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
              cx-fx:supportsInvocation cx-behaviour:HealthIndication;
              cx-fx:callbackAddress <https://my-remoting-agent.domain/rdf4j-server/callback>;
            ]
        ].

      cx-behaviour:HealthIndication rdf:type cx-fx:Function;
        dcterms:description "Health Indicator is an asynchronous batch invocation."@en ;
        dcterms:title "Health Indicator" ;
        cx-fx:targetUri "http://service-backend:5005/api/hi2";
        cx-fx:invocationMethod "POST-JSON";
      #  cx-common:authenticationKey "Authorization";
      #  cx-common:authenticationCode "Basic TOKEN";
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
        cx-fx:input cx-behaviour:metadata;
        cx-fx:input cx-behaviour:statusDate;
        cx-fx:input cx-behaviour:statusOperatingHours;
        cx-fx:input cx-behaviour:statusMileage;
        cx-fx:input cx-behaviour:countingMethod;
        cx-fx:input cx-behaviour:countingValue;
        cx-fx:input cx-behaviour:countingUnit;
        cx-fx:input cx-behaviour:headerChannels;
        cx-fx:input cx-behaviour:bodyClasses;
        cx-fx:input cx-behaviour:bodyCountsList;
        cx-fx:result cx-behaviour:HealthIndicationResult.

      cx-behaviour:notification rdf:type cx-fx:Argument;
        dcterms:description "A default notification output template."@en ;
        dcterms:title "Notification Template";
        cx-fx:argumentName ".";
        cx-fx:dataType json:Object;
        cx-fx:priority "-1"^^xsd:integer;
        cx-fx:default "{ \"content\": { \"endurancePredictorInputs\": []}}"^^json:Object.

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
        cx-fx:strip <https://w3id.org/catenax/taxonomy#>;
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

      cx-behaviour:HealthIndicationResult rdf:type cx-fx:Result;
        dcterms:description "The asynchronous notification response."@en ;
        dcterms:title "Asynchronous notification response." ;
        cx-fx:callbackProperty "header.referencedNotificationID";
        cx-fx:outputProperty "content.endurancePredictorOutputs";
        cx-fx:output cx-behaviour:healthIndicatorValues.

      cx-behaviour:healthIndicatorValues rdf:type cx-fx:ReturnValue;
        dcterms:description "Predicted Health Indicator Response"@en ;
        dcterms:title "Health Indicator Values" ;
        cx-fx:valuePath "0.healthIndicator.healthIndicatorValues";
        cx-fx:dataType json:Object.
```

### 3. Test Drive the Remoting Agent

After the remoting agent has been setup, you may already invoke SPARQL queries against the RUL repository in the KA-BIND-FUNC profile:

```console
curl --location 'https://my-remoting-agent.domain/rdf4j-server/repositories/rul' \
--header 'Content-Type: application/sparql-query' \
--header 'Accept: application/json' \
--data 'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
PREFIX json: <https://json-schema.org/draft/2020-12/schema#> 
PREFIX cx-life: <https://w3id.org/catenax/ontology/behaviour#>
PREFIX uuid: <urn:uuid:>

SELECT ?invocation ?component ?timeHours ?distanceKm
WHERE { 
      VALUES (?component ?ls_type) { ( uuid:1 "GearOil"^^xsd:string) ( uuid:1 "GearSet"^^xsd:string)}

  ?invocation a cx-life:RemainingUsefulLife;
              cx-life:sender <bpn:legal:BPNLOEM>;
              cx-life:senderConnector <edc://sender>;
              cx-life:recipient <bpn:legal:BPNLSUPPLIER>;
              cx-life:recipientConnector <edc://recipient>;
              cx-life:targetDate "2022-11-24T22:07:02.611048800Z"^^xsd:dateTime;
              cx-life:timeStamp "2022-11-24T11:24:36.744320Z"^^xsd:dateTime;
              cx-life:component ?component;
              cx-life:observationType ?ls_type;
              cx-life:statusDate "2023-02-19T10:42:36.744320Z"^^xsd:dateTime;
              cx-life:statusOperatingHours "32137.9"^^xsd:float;
              cx-life:statusMileage "865432"^^xsd:int;
              cx-life:countingValue "Time"^^xsd:string;
              cx-life:countingUnit <unit:secondUnitOfTime>;
              cx-life:countingMethod "TimeAtLevel"^^xsd:string;
              cx-life:headerChannels "[ { \"channelName\": \"TC_SU\", \"unit\": \"unit:degreeCelsius\", \"lowerLimit\": 0, \"upperLimit\": 640, \"numberOfBins\": 128 }  ]"^^json:Object;
              cx-life:bodyClasses "[ { \"className\": \"TC_SU-class\", \"classList\": [ 14, 15, 16, 17, 18, 19, 20, 21, 22 ] }]"^^json:Object;
              cx-life:bodyCountsList "[34968.93,739782.51,4013185.15,46755055.56,25268958.35,8649735.95,9383635.35,19189260.77,1353867.54]"^^json:Object;
              cx-life:remainingOperatingHours ?timeHours;
              cx-life:remainingRunningDistance ?distanceKm
              . 
}'
```

and you should receive a prognosis answer, such as

```json
{
    "head": {
        "vars": [
            "invocation",
            "component",
            "timeHours",
            "distanceKm"
        ]
    },
    "results": {
        "bindings": [
            {
                "invocation": {
                    "type": "uri",
                    "value": "https://w3id.org/catenax/ontology/behaviour#?invocation=0"
                },
                "component": {
                    "type": "uri",
                    "value": "urn:uuid:1"
                },
                "distanceKm": {
                    "datatype": "http://www.w3.org/2001/XMLSchema#int",
                    "type": "literal",
                    "value": "252291"
                },
                "timeHours": {
                    "datatype": "http://www.w3.org/2001/XMLSchema#float",
                    "type": "literal",
                    "value": "4516.4"
                }
            }
        ]
    }
}
```

Invocation against the HEALTH repository works like this:

```console
curl --location 'https://my-remoting-agent.domain/rdf4j-server/repositories/health' \
--header 'Content-Type: application/sparql-query' \
--header 'Accept: application/json' \
--data 'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
PREFIX json: <https://json-schema.org/draft/2020-12/schema#> 
PREFIX cx-life: <https://w3id.org/catenax/ontology/behaviour#>
PREFIX uuid: <urn:uuid:>

SELECT ?invocation ?component ?result
WHERE { 
      VALUES (?component ?ls_type) { ( uuid:1 "Clutch"^^xsd:string) }

  ?invocation a cx-life:HealthIndication;
              cx-life:sender <bpn:legal:BPNLOEM>;
              cx-life:senderConnector <edc://sender>;
              cx-life:recipient <bpn:legal:BPNLSUPPLIER>;
              cx-life:recipientConnector <edc://recipient>;
              cx-life:targetDate "2022-11-24T22:07:02.611048800Z"^^xsd:dateTime;
              cx-life:timeStamp "2022-11-24T11:24:36.744320Z"^^xsd:dateTime;
              cx-life:component ?component;
              cx-life:observationType ?ls_type;
              cx-life:statusDate "2023-02-19T10:42:36.744320Z"^^xsd:dateTime;
              cx-life:statusOperatingHours "32137.9"^^xsd:float;
              cx-life:statusMileage "865432"^^xsd:int;
              cx-life:countingValue "Time"^^xsd:string;
              cx-life:countingUnit <unit:secondUnitOfTime>;
              cx-life:countingMethod "TimeAtLevel"^^xsd:string;
              cx-life:headerChannels "[ { \"channelName\": \"TC_SU\", \"unit\": \"unit:degreeCelsius\", \"lowerLimit\": 0, \"upperLimit\": 640, \"numberOfBins\": 128 }  ]"^^json:Object;
              cx-life:bodyClasses "[ { \"className\": \"TC_SU-class\", \"classList\": [ 14, 15, 16, 17, 18, 19, 20, 21, 22 ] }]"^^json:Object;
              cx-life:bodyCountsList "[34968.93,739782.51,4013185.15,46755055.56,25268958.35,8649735.95,9383635.35,19189260.77,1353867.54]"^^json:Object;
              cx-life:healthIndicatorValues ?result. 
}'
```

and you should receive a different prognosis answer, such as

```json
{
    "head": {
        "vars": [
            "invocation",
            "component",
            "result"
        ]
    },
    "results": {
        "bindings": [
            {
                "result": {
                    "datatype": "https://json-schema.org/draft/2020-12/schema#Object",
                    "type": "literal",
                    "value": "[0.878515804632653,0.29795938515521947]"
                },
                "invocation": {
                    "type": "uri",
                    "value": "https://w3id.org/catenax/ontology/behaviour#?invocation=2"
                },
                "component": {
                    "type": "uri",
                    "value": "urn:uuid:1"
                }
            }
        ]
    }
}
```

## Quick Setup Guide for Registering A Graph in the EDC

The next steps require that you have already deployed the [Agent-Enabled EDC](agent_edc).
We demonstrate the steps by interacting with the EDC Control Plane Management API

### 1. Register A Graph Policy

The following example installs a policy which is just checking the business partner numbers and dataspace memberships
of the participants. For more realistic policies aligned with the data sovereignity rules/profiles, see [this discussion](policy).

```console
curl --location --globoff 'https://my-connector-control.domain/management/v2/policydefinitions' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Policy?me=Graph",
  "policy": {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Set",
    "uid": "https://w3id.org/catenax/ontology/common#Policy?me=Graph",
    "permission": [
      {
        "target": "https://w3id.org/catenax/ontology/common#GraphAsset?me=",
        "action": "USE",
        "constraint": {
           "@type": "LogicalConstraint",
           "or" : [
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "BPNL00000PARTNER"
              },
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "BPNL000000001234"
              }
            ]
        }
     }]
    }
}
'
```

### 2. Register A Graph Contract

The following contract definition exposes upcoming (skill) assets under the previously installed (skill) policy.
It does that for both catalogue/offer requests (access policy) and actual agent-based transfers (contract policy). Usually,
this makes sense as the party being able to receive and offer should also be able to negotiate a transfer to (here: execute) it.
Note that the definition foresees a "custom" asset property "cx-common:publishedUnderContract" with which all agent assets can be explictely "assigned"
to a contract.

```console
curl --location --globoff 'https://my-connector-control.domain/management/v2/contractdefinitions' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?me=Graph",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?me=Graph",
    "contractPolicyId": "Policy?me=Graph",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?me=Graph"
    }
}
'
```

### 3. Register Graph Assets including Shape Descriptions

#### Federated (Data) Graph Asset

In the next step, we install a graph asset in the EDC which maybe invoked from any business partner that is eligid in the presented contract.

The asset can also be "federated". That means that its meta-data can be regularly synchronized by the business partner and used in [Skills and Skill Assets](agent_edc) which search for corresponding assets
(see the "cx-common:isFederated" public property). That also means that a skill can traverse the asset to move on its computation further to a set of other allowed connectors/assets (see the "cx-common:allowServicePattern" dataaddress property).

```console
curl --location --globoff 'https://my-connector-control.domain/management/v3/assets' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
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
    "@id": "GraphAsset?me=BehaviourTwinReliability",
    "properties": {
        "cx-common:name": "Reliability Data Service",
        "cx-common:description": "Test Telematics Data as provided by an OEM.",
        "cx-common:description@de": "Test Telematik Daten eines OEM.",
        "cx-common:version": "CX_RuL_Testdata_v1.0.0",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?me=Graph",
        "dct:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/taxonomy>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?me=BehaviourTwinReliability&shapeObject=> .\n\n:LoadSpectrumShape a sh:NodeShape ;\n    sh:targetClass  cx-reliability:LoadSpectrum;\n    sh:property :observationOfShape, \n                :countingValueShape, \n                :countingUnitShape, \n                :countingMethodShape, \n                :channelsShape, \n                :classesShape, \n                :valuesShape.\n\n:observationOfShape a sh:PropertyShape;\n    sh:path cx-reliability:observationOf;\n    sh:in (cx-taxo:GearOil cx-taxo:GearSet cx-taxo:Clutch).\n\n:countingValueShape a sh:PropertyShape;\n    sh:path cx-reliability:countingValue.\n\n:countingUnitShape a sh:PropertyShape;\n    sh:path cx-reliability:countingUnit.\n\n:countingMethodShape a sh:PropertyShape;\n    sh:path cx-reliability:countingMethod.\n\n:countingMethodShape a sh:PropertyShape;\n    sh:path cx-reliability:countingMethod.\n\n:channelsShape a sh:PropertyShape;\n    sh:path cx-reliability:channels.\n\n:classesShape a sh:PropertyShape;\n    sh:path cx-reliability:classes.\n\n:valuesShape a sh:PropertyShape;\n    sh:path cx-reliability:values.",
        "cx-common:isFederated": "true^^xsd:boolean"
    },
    "privateProperties": {
    },
    "dataAddress": {
        "id": "GraphAsset?me=BehaviourTwinReliability",
        "@type": "DataAddress",
        "baseUrl": "https://my-provider.agent.domain/telematics/sparql",
        "type": "cx-common:Protocol?w3c:http:SPARQL",
        "proxyPath": "false",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "proxyBody": "true",
        "authKey": "Authorization",
        "authCode": "••••••",
        "cx-common:allowServicePattern": "edcs?://.*"
    }
}'
```

Note that there are two mechanisms inside the Graph Asset Description with which a skill (which basically is a graph matching language) can "search" for the right asset without using hardcoded asset ids (see also [our modelling guide](../development-view/modelling)).

The "rdfs:isDefinedBy" property resolves into a full-fledged predicate inside the federated catalogue. By constraining the ontologies that an asset should implement, we can ensure that definitions (classes, properties, relations) that the skill requires are all available and the skill will run in principle.

The "sh:shapesGraph" property resolves into a full-fledged sub-graph under the asset node in the federated catalogue. By constraining the domains of classes, properties and relations that the asset should provide, the skill can even find out whether the provided data is complete (maybe it just represents a single partition) or whether it fits with the types of other assets that the skill must combine.

To demonstrate this alignment, we have already listed the shapes of three interacting assets, a data graph and two function graphsin the [our modelling guide](../development-view/modelling). We have also sketched the SPARQL by which a skill can do such an asset alignment.

For completeness purposes, we give the two (function) graph registrations in the following

#### Federated (Function) Graph Assets

```console
curl --location --globoff 'https://my-connector-control.domain/management/v3/assets' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
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
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?supplier=Graph",
        "dc:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinRUL&shapeObject=> .\n\n# Prognosis Function\n:PrognosisFunctionShape rdf:type sh:NodeShape ;\n    sh:targetClass cx-behaviour:PrognosisFunction;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingMethod;\n        sh:path cx-behaviour:countingMethod;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingValue;\n        sh:path cx-behaviour:countingValue;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingUnit;\n        sh:path cx-behaviour:countingUnit;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:channels;\n        sh:path cx-behaviour:headerChannels;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:classes;\n        sh:path cx-behaviour:bodyClasses;\n    ].\n\n:RemainingUsefulLifeShape rdf:type sh:NodeShape ;\n    cx-sh:extensionOf :PrognosisFunctionShape;\n    sh:targetClass cx-behaviour:RemainingUsefulLife ;\n      sh:property[\n        cx-sh:hasAsArgument cx-reliability:observationOf;\n        sh:path cx-behaviour:observationType;\n        sh:in ( cx-taxo:GearSet cx-taxo:GearOil );\n    ];\n    sh:property :RemainingUsefulLifeResultShape.\n\n:RemainingUsefulLifeResult rdf:type sh:PropertyShape;\n    cx-sh:outputOf :RemainingUsefulLifeShape;\n    sh:path cx-behaviour:RemainingUsefulLifeResult .\n",
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
  }
'
```

```console
curl --location --globoff 'https://my-connector-control.domain/management/v3/assets' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
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
        "cx-common:version": "1.14.24",
        "cx-common:contenttype": "application/json, application/xml",
        "cx-common:publishedUnderContract": "Contract?supplier=Graph",
        "dc:type": "cx-taxo:GraphAsset",
        "rdfs:isDefinedBy": "<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/function>,<https://w3id.org/catenax/ontology/behaviour>,<https://w3id.org/catenax/ontology/behaviour>",
        "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
        "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?supplier=BehaviourTwinHI&shapeObject=> .\n\n# Prognosis Function\n:PrognosisFunctionShape rdf:type sh:NodeShape ;\n    sh:targetClass cx-behaviour:PrognosisFunction;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingMethod;\n        sh:path cx-behaviour:countingMethod;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingValue;\n        sh:path cx-behaviour:countingValue;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:countingUnit;\n        sh:path cx-behaviour:countingUnit;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:channels;\n        sh:path cx-behaviour:headerChannels;\n    ];\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:classes;\n        sh:path cx-behaviour:bodyClasses;\n    ].\n    \n:HealthIndicationShape a sh:NodeShape ;\n    cx-sh:extensionOf :PrognosisFunctionShape;\n    sh:targetClass cx-behaviour:HealthIndication;\n    sh:property [\n        cx-sh:hasAsArgument cx-reliability:observationOf;\n        sh:path cx-behaviour:observationType;\n        sh:in ( cx-taxo:Clutch );\n    ];\n    sh:property :HealthIndicationResultShape.\n    \n:HealthIndicationResultShape a sh:PropertyShape;\n    cx-sh:outputOf :HealthIndicationShape;\n    sh:path cx-behaviour:HealthIndicationResult .",
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
}'
```

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
