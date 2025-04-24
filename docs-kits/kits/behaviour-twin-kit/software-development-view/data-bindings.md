---
id: data-bindings
title: Data Bindings
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

Applies to roles: *data provider* and *delegator*

## DATA BINDING FOR RELATIONAL DATA

The usage data for different use cases like [*Health Indicator*](../use-cases/hi/overview), [*Remaining useful Life*](../use-cases/rul/overview) and others utlilize the same data sources and data types (load spectra). The load spectrum types may vary, but all the different types consists of the same structure and data types. Because of that, they all can be provided by the same data (graph) asset.

### OVERVIEW

In most cases, data are provided in (semi-)structured form (relational databases, data lakes, ...). To provide such data as part of the knowledge graph, you have to bind/map them.

### DATA MAPPING TOOL

To bind the relational data to the knowledge graph, you can use a **provisioning agent**, also called the **data binding agent**. The [Agents KIT's Operation View](../../knowledge-agents/operation-view/provider) therefore provides a software based on [OnTop ![(external link)](../assets/external-link.svg)](https://ontop-vkg.org/).

### DATA MAPPING CONFIGURATION

To configure the bindings, a config file for the provisioning agent software has to be created. The file is written in the [OBDA Mapping Language ![(external link)](../assets/external-link.svg)](https://ontop-vkg.org/tutorial/mapping/). For some detailed information, have a look at the Knowledge [Agents KIT's Operation View](../../knowledge-agents/operation-view/provider).

#### CONSTRUCTION OF A SINGLE DATA BINDING

Each data binding consists of 3 lines in the config file. The first line defines a unique mapping ID (arbitrarily selectable). The second line lists one or more RDF triplets (target). The third line is, for example, a SQL statement on the relational data source.

A simple example:

```obda
  mappingId   partsvehicle
  target      <{gearbox_id}> cx-vehicle:isPartOf <{vehicle_id}> .
  source      SELECT vehicle_id, gearbox_id FROM vehicles
```

The target is described as a triple with two variables: `gearbox_id` and `vehicle_id`. The exact same variables must occur in the result of the source SQL statement. The SQL result is then mapped to the variables in the target triplets.
For each row in the SQL result, a triplet instance is created. If the SQL result is empty, no triplet instances are created.
The result of this example is a triplet that represents the relation between a specific vehicle its gearbox.

A little more complex example:

```obda
  mappingId   vehicles
  target      <{vehicle_id}> rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {vin}^^xsd:string ; cx-vehicle:worldManufaturerId bpnl:{oem_bpnl} ; cx-vehicle:productionDate {production_date}^^xsd:date.
  source      SELECT vehicle_id, vin, oem_bpnl, production_date FROM vehicles
```

The target now consists of 4 triplets, all with the same subject (`<{vehicle_id}>`) and are separated by a semicolon. The semicolon means, the following triplet only defines the predicate and the object while the subject from the previous triplet is reused.
In the example above, there are the following triplets:

- *`<{vehicle_id}> rdf:type cx-vehicle:Vehicle`*: All objects in the database table/view "vehicles" are mapped to the type `cx-vehicle:Vehicle`.
- *`<{vehicle_id}> cx-vehicle:vehicleIdentificationNumber {vin}^^xsd:string`*: Relation between a vehicle and the related VIN. The type of VIN must be string.
- *`<{vehicle_id}> cx-vehicle:worldManufaturerId bpnl:{oem_bpnl}`*: Relation between a vehicle and its manufacturer's BPN.
- *`<{vehicle_id}> cx-vehicle:productionDate {production_date}^^xsd:date`*: Relation between a vehicle and it's date of production. The type of production_date must be date.

Complex types like the load spectra are composed of many triplets. If you have stored those load spectra as complex JSON strings, you may decompose them with specific (built-in) JSON functions of your database system.

#### FULL EXAMPLE

The following (full) example shows mappings at an OEM that can be used to determine the vehicle object by a given VIN, find the related gearbox and the associated gearbox load spectra. The example applies for the use cases [Remaining useful Life](../use-cases/rul/overview) and [Health Indicator](../use-cases/hi/overview). This perfectly demonstrates, that the data only have to be bound once and can be re-used for many use cases.

```obda
[PrefixDeclaration]
cx-common:       https://w3id.org/catenax/ontology/common#
cx-core:         https://w3id.org/catenax/ontology/core#
cx-vehicle:      https://w3id.org/catenax/ontology/vehicle#
cx-reliability:  https://w3id.org/catenax/ontology/reliability#
cx-taxo:         https://w3id.org/catenax/taxonomy#
uuid:            urn:uuid:
bpnl:            bpn:legal:
owl:             http://www.w3.org/2002/07/owl#
rdf:             http://www.w3.org/1999/02/22-rdf-syntax-ns#
xml:             http://www.w3.org/XML/1998/namespace
xsd:             http://www.w3.org/2001/XMLSchema#
json:            https://json-schema.org/draft/2020-12/schema#
obda:            https://w3id.org/obda/vocabulary#
rdfs:            http://www.w3.org/2000/01/rdf-schema#

[MappingDeclaration] @collection [[
mappingId vehicles
target    uuid:{catenaXId} rdf:type cx-vehicle:Vehicle ; cx-vehicle:vehicleIdentificationNumber {localIdentifiers_van}^^xsd:string ; cx-vehicle:manufacturer bpnl:{localIdentifiers_manufacturerId} ; cx-vehicle:productionDate {manufacturingInformation_date}^^xsd:date.
source    SELECT "catenaXId", "localIdentifiers_van", "localIdentifiers_manufacturerId", "manufacturingInformation_date" FROM "HI_TEST_OEM"."CX_RUL_SerialPartTypization_Vehicle" vehicles

mappingId partsvehicle
target    uuid:{childCatenaXId} cx-vehicle:isPartOf uuid:{catenaXId} .
source    SELECT "catenaXId", "childCatenaXId" FROM  "HI_TEST_OEM"."CX_RUL_AssemblyPartRelationship" vehicleparts

mappingId vehicleparts
target    uuid:{catenaXId} cx-vehicle:hasPart uuid:{childCatenaXId}.
source    SELECT "catenaXId", "childCatenaXId" FROM  "HI_TEST_OEM"."CX_RUL_AssemblyPartRelationship" vehicleparts

mappingId parts
target    uuid:{catenaXId} rdf:type cx-vehicle:Part ; cx-vehicle:id {localIdentifiers_partInstanceId}^^xsd:string ; cx-vehicle:name {partTypeInformation_nameAtManufacturer}^^xsd:string ; cx-vehicle:number {partTypeInformation_manufacturerPartId}^^xsd:string ; cx-vehicle:supplier bpnl:{localIdentifiers_manufacturerId} ; cx-vehicle:productionDate {manufacturingInformation_date}^^xsd:date .
source    SELECT "catenaXId", "localIdentifiers_partInstanceId", "partTypeInformation_nameAtManufacturer", "partTypeInformation_manufacturerPartId", "localIdentifiers_manufacturerId", "manufacturingInformation_date" FROM "HI_TEST_OEM"."CX_RUL_SerialPartTypization_Component" parts

mappingId partAnalysis
target    uuid:{catenaXId}/{targetComponentId} cx-reliability:analysedObject uuid:{targetComponentId}.
source    SELECT "catenaXId", "targetComponentId" FROM "HI_TEST_OEM"."CX_RUL_Analysis" analysis

mappingId analysisInformation
target    uuid:{catenaXId}/{targetComponentId} rdf:type cx-reliability:Analysis ; cx-reliability:operatingHoursOfVehicle {metadata_status_operatingHours_avg}^^xsd:float ; cx-core:startDateTime {metadata_status_date_min}^^xsd:dateTime ; cx-core:endDateTime {metadata_status_date_max}^^xsd:dateTime ; cx-reliability:mileageOfVehicle {metadata_status_mileage_avg}^^xsd:int.
source    SELECT "catenaXId", "targetComponentId", "metadata_status_operatingHours_avg", "metadata_status_date_min", "metadata_status_date_max", "metadata_status_mileage_avg" FROM "HI_TEST_OEM"."CX_RUL_Analysis" loadspectrum

mappingId analysisResult
target    uuid:{catenaXId}/{targetComponentId} cx-reliability:result uuid:{catenaXId}/{targetComponentId}/{metadata_componentDescription} .
source    SELECT "catenaXId", "targetComponentId", "metadata_componentDescription" FROM "HI_TEST_OEM"."CX_RUL_LoadCollective" loadspectrum

mappingId loadspectrum
target    uuid:{catenaXId}/{targetComponentId}/{metadata_componentDescription} rdf:type cx-reliability:LoadSpectrum ; cx-core:id cx-taxo:{metadata_componentDescription} ; cx-core:name {metadata_projectDescription}^^xsd:string ; cx-reliability:description {metadata_routeDescription}^^xsd:string ; cx-reliability:countingValue {header_countingValue}^^xsd:string ; cx-reliability:countingUnit {header_countingUnit}^^xsd:string ; cx-reliability:countingMethod {header_countingMethod}^^xsd:string ; cx-reliability:channels {header_channels}^^json:Object ; cx-reliability:classes {body_classes}^^json:Object ; cx-reliability:values {body_counts_countsList}^^json:Object .
source    SELECT "catenaXId", "targetComponentId", "metadata_projectDescription", "metadata_componentDescription", "metadata_routeDescription", "metadata_status_date", "header_countingValue", "header_countingUnit", "header_countingMethod", "header_channels", "body_counts_countsList", "body_classes" FROM "HI_TEST_OEM"."CX_RUL_LoadCollective" loadspectrum
]]
```

### GRAPH ASSET FOR THE DATA BINDINGS

To enable the knowledge agent's matchmaking agent to utilize the data bindings, a graph asset has to be registered at the data provider's EDC connector. This asset must have a property `rdfs:isDefinedBy` for ontology references and a property `sh:shapesGraph` that defines the shape of the provided graph (data).

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
    "sh:shapesGraph": "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix schema: <http://schema.org/> .\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n@prefix edc: <https://w3id.org/edc/v0.0.1/ns/> .\n@prefix cx-common: <https://w3id.org/catenax/ontology/common#> .\n@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .\n@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .\n@prefix cx-fx: <https://w3id.org/catenax/ontology/function#> .\n@prefix cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#> .\n@prefix cx-reliability: <https://w3id.org/catenax/ontology/reliability#> .\n@prefix cx-sh: <https://w3id.org/catenax/ontology/schema#> .\n@prefix cx-taxo: <https://w3id.org/catenax/taxonomy#> .\n@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?me=BehaviourTwinReliability&shapeObject=> .\n\n:LoadSpectrumShape a sh:NodeShape ;\n    sh:targetClass  cx-reliability:LoadSpectrum ;\n    sh:property :observationOfShape, \n                :countingValueShape, \n                :countingUnitShape, \n                :countingMethodShape, \n                :channelsShape, \n                :classesShape, \n                :valuesShape .\n\n:observationOfShape a sh:PropertyShape ;\n    sh:path cx-reliability:observationOf ;\n    sh:in (cx-taxo:GearOil cx-taxo:GearSet cx-taxo:Clutch) .\n\n:countingValueShape a sh:PropertyShape ;\n    sh:path cx-reliability:countingValue .\n\n:countingUnitShape a sh:PropertyShape ;\n    sh:path cx-reliability:countingUnit .\n\n:countingMethodShape a sh:PropertyShape ;\n    sh:path cx-reliability:countingMethod .\n\n:countingMethodShape a sh:PropertyShape ;\n    sh:path cx-reliability:countingMethod .\n\n:channelsShape a sh:PropertyShape ;\n    sh:path cx-reliability:channels .\n\n:classesShape a sh:PropertyShape ;\n    sh:path cx-reliability:classes .\n\n:valuesShape a sh:PropertyShape ;\n    sh:path cx-reliability:values .",
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
}
```

The property `sh:shapesGraph` contains the graph shape of the offered data, written in [Shapes Constraint Language (SHACL) ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/shacl/). It describes the shape of a load spectrum:

```shacl
<https://w3id.org/catenax/ontology/common>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/taxonomy>,<https://w3id.org/catenax/ontology/core>,<https://w3id.org/catenax/ontology/behaviour>",
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
@prefix : <https://w3id.org/catenax/taxonomy#GraphAsset?me=BehaviourTwinReliability&shapeObject=> .

:LoadSpectrumShape a sh:NodeShape ;
    sh:targetClass  cx-reliability:LoadSpectrum ;
    sh:property :observationOfShape,
                :countingValueShape,
                :countingUnitShape,
                :countingMethodShape,
                :channelsShape,
                :classesShape,
                :valuesShape .

:observationOfShape a sh:PropertyShape ;
    sh:path cx-reliability:observationOf ;
    sh:in (cx-taxo:GearOil cx-taxo:GearSet cx-taxo:Clutch) .

:countingValueShape a sh:PropertyShape ;
    sh:path cx-reliability:countingValue .

:countingUnitShape a sh:PropertyShape ;
    sh:path cx-reliability:countingUnit .

:countingMethodShape a sh:PropertyShape ;
    sh:path cx-reliability:countingMethod .

:countingMethodShape a sh:PropertyShape ;
    sh:path cx-reliability:countingMethod .

:channelsShape a sh:PropertyShape ;
    sh:path cx-reliability:channels .

:classesShape a sh:PropertyShape ;
    sh:path cx-reliability:classes .

:valuesShape a sh:PropertyShape ;
    sh:path cx-reliability:values .
```

In this description, the load spectrum type can be either `cx-taxo:GearOil`, `cx-taxo:GearSet` or `cx-taxo:Clutch`. All types are provided through this asset in one step.

#### POLICY AND CONTRACT FOR THE GRAPH ASSET

All assets, including graph assets, must have a related policy and contract definition. These are described in the section [Contracts And Policies](./contracts-and-policies).
