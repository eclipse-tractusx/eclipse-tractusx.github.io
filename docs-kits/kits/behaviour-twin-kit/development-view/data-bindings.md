---
id: data-bindings
title: Data Bindings
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

## Data bindings for relational data

Applies to: *RuL data provider* and *delegator*

### Overview

In this context, data are usage data as well as delegation data (where the sill/data have to go next).  

In most cases, data are provided in relational form (relational databases, data lakes, ...).
To provide such data as part of the knowledge graph, you have to bind/map them to the underlying ontologies.

### Data mapping tool

To bind the relational data to the knowledge graph, you can use a **provisioning agent**, also called the **data binding agent**. The software **Ontop** (see the Ontop webpage [https://ontop-vkg.org/](https://ontop-vkg.org/)), which is under the Apache 2.0 license, is our tool of choice in this case.  
  
### Data mapping configuration

To configure the bindings, a config file for the Ontop software has to be created. The file is written in the Ontop mapping language and has the extension **.obda**. For more information, see the Knowledge [Agents KIT](../../knowledge-agents/adoption-view/intro).

### Construction of a single data binding

Each data binding consists of 3 lines in the config file.  
The first line defines a unique mapping id (arbitrarily selectable).  
The second line lists one or more RDF triplets (target).  
The third line is a SQL statement on the relational data source.  

A simple example from:

``` obda
  mappingId   partsvehicle
  target      <{gearbox_id}> cx-vehicle:isPartOf <{vehicle_id}> .
  source      SELECT vehicle_id, gearbox_id FROM vehicles
```

The target is described as a triple with two variables: gearbox_id and vehicle_id. The exact same variables must occur in the result of the source SQL statement. The SQL result is then mapped to the variables in the target triplets.  
For each row in the SQL result, a triplet instance is created. If the SQL result is empty, no triplet instances are created.  
The result of this example is a triplet that represents the relation between a specific vehicle its gearbox.

A little more complex example:

``` obda
  mappingId   vehicles
  target      <{vehicle_id}> rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {van}^^xsd:string; cx-vehicle:worldManufaturerId bpnl:{oem_bpnl}; cx-vehicle:productionDate {production_date}^^xsd:date.
  source      SELECT vehicle_id, van, oem_bpnl, production_date FROM vehicles
```

The target now consists of 4 triplets, all with the same subject (<{vehicle_id}>) and separated by a semicolon. The semicolon means, the following triplet only defines the predicate and the object while the subject from the previous triplet is reused.  
In the example above, there are the following triplets:

- *<{vehicle_id}> rdf:type cx-vehicle:Vehicle*: All objects in the database table/view "vehicles" are mapped to the type cx-vehicle:Vehicle.
- *<{vehicle_id}> cx-vehicle:vehicleIdentificationNumber {van}^^xsd:string*: Relation between a vehicle and the related VAN. The type of VAN must be string.
- *<{vehicle_id}> cx-vehicle:worldManufaturerId bpnl:{oem_bpnl}*: Relation between a vehicle and its manufacturer's BPN.
- *<{vehicle_id}> cx-vehicle:productionDate {production_date}^^xsd:date*: Relation between a vehicle and it's date of production. The type of production_date must be date.

Complex types like the load spectra are composed of many triplets. If you have stored those load spectra as SAMM specified JSON strings, you may decompose them with specific JSON functions of your database system.

#### Full example

The following example shows mappings at an OEM that can be used to determine the vehicle object by a given VIN, find the related gearbox and the associated gearbox load spectra:

```obda
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
````

```obda
  [PrefixDeclaration]
  cx-common:          https://w3id.org/catenax/ontology/common#
  cx-core:            https://w3id.org/catenax/ontology/core#
  cx-vehicle:         https://w3id.org/catenax/ontology/vehicle#
  cx-reliability:     https://w3id.org/catenax/ontology/reliability#
  uuid:               urn:uuid:
  bpnl:               bpn:legal:
  owl:                http://www.w3.org/2002/07/owl#
  rdf:                http://www.w3.org/1999/02/22-rdf-syntax-ns#
  xml:                http://www.w3.org/XML/1998/namespace
  xsd:                http://www.w3.org/2001/XMLSchema#
  json:               https://json-schema.org/draft/2020-12/schema#
  obda:               https://w3id.org/obda/vocabulary#
  rdfs:               http://www.w3.org/2000/01/rdf-schema#
  oem:                urn:oem:

  [MappingDeclaration] @collection [[
  mappingId   vehicles
  target      <{vehicle_id}> rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {van}^^xsd:string; cx-vehicle:worldManufaturerId bpnl:{oem_bpnl}; cx-vehicle:productionDate {production_date}^^xsd:date.
  source      SELECT vehicle_id, van, oem_bpnl, production_date FROM vehicles

  mappingId   partsvehicle
  target      <{gearbox_id}> cx-vehicle:isPartOf <{vehicle_id}> .
  source      SELECT vehicle_id, gearbox_id FROM vehicles

  mappingId   vehicleparts
  target      <{vehicle_id}> cx-vehicle:hasPart <{gearbox_id}> .
  source      SELECT vehicle_id, gearbox_id FROM vehicles

  mappingId   parts
  target      <{gearbox_id}> rdf:type cx-vehicle:Part ; cx-vehicle:id {gearbox_id}^^xsd:string; cx-vehicle:name {partTypeInformation_nameAtManufacturer}^^xsd:string; cx-vehicle:number {partTypeInformation_manufacturerPartId}^^xsd:string; cx-vehicle:supplier bpnl:{gearbox_manufacturer_bpnl}; cx-vehicle:productionDate {production_date}^^xsd:date .
  source      SELECT gearbox_id, production_date, 'Differential Gear' as partTypeInformation_nameAtManufacturer, gearbox_manufacturer_bpnl, 'Dummy Gearbox' as partTypeInformation_manufacturerPartId FROM vehicles

  mappingId   partAnalysis
  target      oem:{newest_telematics_id} cx-reliability:analysedObject <{gearbox_id}>.
  source      SELECT gearbox_id, newest_telematics_id FROM vehicles

  mappingId   analysisInformation
  target      oem:{id} rdf:type cx-reliability:Analysis; cx-reliability:operatingHoursOfVehicle {metadata_status_operatingHours}^^xsd:float; cx-core:startDateTime {metadata_status_date}^^xsd:dateTime; cx-core:endDateTime {metadata_status_date}^^xsd:dateTime; cx-reliability:mileageOfVehicle {metadata_status_mileage}^^xsd:int.
  source      SELECT id, metadata_status_operatingHours, metadata_status_date, metadata_status_mileage FROM reading

  mappingId   analysisResult
  target      oem:{id} cx-reliability:result oem:{id}/{index}.
  source      SELECT id, index FROM loadspectra

  mappingId   loadspectrum
  target      oem:{id}/{index} rdf:type cx-reliability:LoadSpectrum; cx-core:id {metadata_componentDescription}^^xsd:string; cx-core:name {metadata_projectDescription}^^xsd:string; cx-reliability:description {metadata_routeDescription}^^xsd:string; cx-reliability:countingValue {body_counts_countsName}^^xsd:string; cx-reliability:countingUnit {header_countingUnit}^^xsd:string; cx-reliability:countingMethod {header_countingMethod}^^xsd:string; cx-reliability:channels {header_channels}^^json:Object; cx-reliability:classes {body_classes}^^json:Object; cx-reliability:values {body_counts_countsList}^^json:Object .
  source      SELECT id, index, metadata_componentDescription, metadata_projectDescription, metadata_routeDescription, header_countingUnit, header_countingMethod, header_channels, body_classes, body_counts_countsName, body_counts_countsList FROM loadspectra

  ]]  
```

### Graph asset for the data binding

To enable the knowledge agent's matchmaking agent to find the data bindings, a graph asset has to be registered at the EDC. This asset must have a property "rdfs:isDefinedBy" that defines the shape of the provided graph.

```shacl
"<https://w3id.org/catenax/usecase/behaviourtwin>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/vehicle>,<https://w3id.org/catenax/ontology/reliability>",
            "cx-common:implementsProtocol": "cx-common:Protocol?w3c:http:SPARQL",
            "sh:shapesGraph": "@prefix cx-common: <https://w3id.org/catenax/ontology/common#>. \n@prefix : <GraphAsset?oem=BehaviourTwinReliability#> .\n@prefix cx-tele: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .@prefix : <urn:cx:Graph:oem:BehaviourTwin> .\n\n:OemLoadSpectrum rdf:type sh:NodeShape ;\n  sh:targetClass cx-tele:LoadSpectrum ;\n  sh:property [\n        sh:path cx-tele:provisionedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL000000000OEM> \n    ] ;\n  sh:property [\n        sh:path cx-tele:Version ;\n        sh:hasValue \"0\"^^xsd:long \n    ] ;\n  sh:property [\n        sh:path cx-tele:component ;\n        sh:class :SupplierParts \n    ] .\n\n:SupplierParts rdf:type sh:NodeShape ;\n  sh:targetClass cx-tele:VehicleComponent ;\n  sh:property [\n        sh:path cx-tele:isProducedBy ;\n        sh:hasValue <urn:bpn:legal:BPNL0000SUPPLIER> \n    ] .\n"
```

For more information see the Knowledge [Agents KIT](../../knowledge-agents/adoption-view/intro).
