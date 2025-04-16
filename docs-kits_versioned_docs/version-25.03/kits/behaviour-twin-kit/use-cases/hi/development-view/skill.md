---
id: skill
title: Skill
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

Applies to role: *HI skill provider* and *HI consumer*

## SKILL DEFINITION

The example skill below is inteded to calculate HI values of a vehicle part. It is an advanced skill which resolves the funtion arguments by itself using graph shape descriptions.

The *consumer* is also the *skill proivder* and, in the special HI case, the *data provider* (the OEM). It requests the calculation by providing the vehicle identification numbers (VINs) of the vehicles. The usage data are representated as load data in form of load spectra at the OEM. The supplier of the part (component of interest) provides the related HI calculation service, which accepts load spectra as input arguments.

The *skill provider* (in this example also the OEM), has to implement the skill and register it over the *Agent Plane API* or call it ad hoc.

In the current example, a HI skill for a gearbox is implemented with the [SPARQL 1.1 Query Language ![(external link)](../../../assets/external-link.svg)](https://www.w3.org/TR/sparql11-query/) as a query. The query is a federated query, which means that the query is split into three parts: One general part, one for the *data provider*/OEM and one for the *calculation service provider*/supplier. In the first part, function assets (in the supplier's catalog/OEM's federated catalog) are resolved by the desired result type. Then, OEM-owned reliability assets are resolved by the required function arguments of resolved function assets. In the second part (at the OEM), the vehicle, subsequent the part of interest, the related load data asset and the supplier of the part are resolved. In the third part (at the supplier), the gathered data is fed back into the respective supplier EDC connector/agent to perform a HI calculation.

For more information regarding skill development, registration and invocation options, see [Agents KIT's Operation View](../../../../knowledge-agents/operation-view/agent_edc).

### FULL EXAMPLE

```sparql
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX json: <https://json-schema.org/draft/2020-12/schema#> 
PREFIX cx-sh: <https://w3id.org/catenax/ontology/schema#>
PREFIX cx-common: <https://w3id.org/catenax/ontology/common#> 
PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
PREFIX cx-reliability: <https://w3id.org/catenax/ontology/reliability#> 
PREFIX cx-schema: <https://w3id.org/catenax/ontology/schema#>
PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
PREFIX cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#>
PREFIX cx-taxo: <https://w3id.org/catenax/taxonomy#>

################################################################
# Sample for a Provider-Deployed Goal-Oriented SPARQL Skill which
#  - Depending on the targeted result
#  - Finds the right supplier prognosis asset and its preconditions
#  - jumps into the OEM-owned reliability asset to obtain the required data
#  - feeds the gathered data back into the respective supplier connector/agent 
#    to perform a behavioral prognosis
# Author: cgjung
# (c) 2023-2024 Catena-X association
################################################################

SELECT DISTINCT ?vin ?supplier ?vehicle ?assembly ?operatingTime ?mileage ?prognosis WHERE {

  VALUES (?vin ?aggregate ?result_type) { 
      ("@vin"^^xsd:string "Differential Gear"^^xsd:string <@resultType>) 
  }

  # Determine the prognosis assets
  ?output sh:path ?result_type .
  ?output cx-sh:outputOf ?functionShape .
  ?assetFunction cx-sh:shapeObject ?functionShape .
  ?functionConnector cx-common:offers ?assetFunction .
  ?functionShape cx-sh:extensionOf* ?parentFunctionShape .
  ?functionShape sh:targetClass ?function .
  ?parentFunctionShape sh:property ?functionProperty .
  ?functionProperty cx-sh:hasAsArgument ?argument .
  ?functionProperty sh:in ?parameters .
  ?parameters rdf:rest*/rdf:first ?ls_type .

  # Determine the target
  ?assetData cx-sh:shapeObject ?nodeShape .
  ?dataConnector cx-common:offers ?assetData .
  ?nodeShape sh:property ?propertyShape .
  ?propertyShape sh:path ?argument .
  ?propertyShape sh:in ?parameters_target .
  ?parameters_target rdf:rest*/rdf:first ?ls_type .

  SERVICE ?dataConnector { 
    GRAPH ?assetData { 
        ?vehicle rdf:type cx-vehicle:Vehicle ;
            cx-vehicle:vehicleIdentificationNumber ?vin .

        ?assembly rdf:type cx-vehicle:Part ;
            cx-vehicle:name ?aggregate ;
            cx-vehicle:isPartOf ?vehicle ;
            cx-vehicle:supplier ?supplier .
            
        ?teleAnalysis rdf:type cx-reliability:Analysis ;
             cx-reliability:analysedObject ?assembly ;
             cx-reliability:operatingHoursOfVehicle ?operatingTime ;
             cx-reliability:mileageOfVehicle ?mileage ;
             cx-core:startDateTime ?recordDate ;
             cx-reliability:result [
                 cx-core:id ?ls_type ;
                 cx-core:name ?ls_name ;
                 cx-reliability:countingValue ?ls_value ;
                 cx-reliability:countingUnit ?ls_unit ;
                 cx-reliability:countingMethod ?ls_method ;
                 cx-reliability:channels ?ls_channels ;
                 cx-reliability:classes ?ls_classes ;
                 cx-reliability:values ?ls_values
             ] .
    }
  }

  SERVICE ?functionConnector {
    GRAPH ?assetFunction { 
      SELECT ?prognosis WHERE {
        ?invocation a ?function ;
              cx-behaviour:sender <bpn:legal:BPNLOEM> ;
              cx-behaviour:senderConnector <edc://sender> ;
              cx-behaviour:recipient <bpn:legal:BPNLSUPPLIER> ;
              cx-behaviour:recipientConnector <edc://recipient> ;
              cx-behaviour:targetDate ?recordDate ;
              cx-behaviour:timeStamp ?recordDate ;
              cx-behaviour:component ?assembly ;
              cx-behaviour:observationType ?ls_type ;
              cx-behaviour:statusDate ?recordDate ;
              cx-behaviour:statusOperatingHours ?operatingTime ;
              cx-behaviour:statusMileage ?mileage ;
              cx-behaviour:countingValue ?ls_value ;
              cx-behaviour:countingUnit ?ls_unit ;
              cx-behaviour:countingMethod ?ls_method ;
              cx-behaviour:headerChannels ?ls_channels ;
              cx-behaviour:bodyClasses ?ls_classes ;
              cx-behaviour:bodyCountsList ?ls_values ;
              ?result_type ?prognosis .
        }
    }
  } # SUPPLIER#CATALOG

} # SELECT
```

### DETAILED INFORMATION

#### SELECT STATEMENT

The select statement defines, which data should be returned.

```sparql
SELECT DISTINCT ?vin ?supplier ?vehicle ?assembly ?operatingTime ?mileage ?prognosis WHERE {
```

#### PARAMETERS

The parameter `vin` (list of VINs for vehicles of interest) is the central external parameter that is provided by the caller of this skill. `aggregate` is set to `Differential Gear` to identify the component of interest (gearbox). `result_type` is also an external parameter that can be set to either `https://w3id.org/catenax/ontology/behaviour#HealthIndicatorResult` or to `https://w3id.org/catenax/ontology/behaviour#RemainingUsefulLifeResult`. The result types are extensible. With this generalized skill, different calculation types can be executed. In the HI use case, it must be set to `https://w3id.org/catenax/ontology/behaviour#HealthIndicatorResult`.

```sparql
  VALUES (?vin ?aggregate ?result_type) { 
      ("@vin"^^xsd:string "Differential Gear"^^xsd:string <@resultType>) 
  }
```

#### FUNCTION ASSET RESOLUTION

All funciton assets with the desired output type within the consumer's federated catalog are resolved. With these assets, the providing connectors are also resolved. In addition, for these assets, the arguments and their load spectrum types are resolved.

```sparql
  # Determine the prognosis assets
  ?output sh:path ?result_type .
  ?output cx-sh:outputOf ?functionShape .
  ?assetFunction cx-sh:shapeObject ?functionShape .
  ?functionConnector cx-common:offers ?assetFunction .
  ?functionShape cx-sh:extensionOf* ?parentFunctionShape .
  ?functionShape sh:targetClass ?function .
  ?parentFunctionShape sh:property ?functionProperty .
  ?functionProperty cx-sh:hasAsArgument ?argument .
  ?functionProperty sh:in ?parameters .
  ?parameters rdf:rest*/rdf:first ?ls_type .
```

#### DATA ASSET RESOLUTION

All data assets that are related to the function assets (same shape and load spectrum types) within the consumer's federated catalog are resolved. With the assets, the providing connectors are also resolved.

```sparql
  # Determine the target
  ?assetData cx-sh:shapeObject ?nodeShape .
  ?dataConnector cx-common:offers ?assetData .
  ?nodeShape sh:property ?propertyShape .
  ?propertyShape sh:path ?argument .
  ?propertyShape sh:in ?parameters_target .
  ?parameters_target rdf:rest*/rdf:first ?ls_type .
```

#### RESOLVING VEHICLE, PART OF INTEREST, ITS SUPPLIER AND THE RELATED LOAD DATA

The resolved connector must be the OEM's connector. There, the graph asset for the usage data is requested. Doing so, a sub-skill is transferred to the OEM's Knowledge Agent (if the consumer is not the OEM). At the OEM, the vehicle is resolved by its VIN. Then, the part of interrest (assembly) and its supplier are resolved by the part's name. At the end, the load for that part can be resolved by the component of interest (assembly) and the load spectrum types that are required by the function arguments.

```sparql
  SERVICE ?dataConnector {
    GRAPH ?assetData {
        ?vehicle rdf:type cx-vehicle:Vehicle ;
            cx-vehicle:vehicleIdentificationNumber ?vin .

        ?assembly rdf:type cx-vehicle:Part ;
            cx-vehicle:name ?aggregate ;
            cx-vehicle:isPartOf ?vehicle ;
            cx-vehicle:supplier ?supplier .

        ?teleAnalysis rdf:type cx-reliability:Analysis ;
             cx-reliability:analysedObject ?assembly ;
             cx-reliability:operatingHoursOfVehicle ?operatingTime ;
             cx-reliability:mileageOfVehicle ?mileage ;
             cx-core:startDateTime ?recordDate ;
             cx-reliability:result [
                 cx-core:id ?ls_type ;
                 cx-core:name ?ls_name ;
                 cx-reliability:countingValue ?ls_value ;
                 cx-reliability:countingUnit ?ls_unit ;
                 cx-reliability:countingMethod ?ls_method ;
                 cx-reliability:channels ?ls_channels ;
                 cx-reliability:classes ?ls_classes ;
                 cx-reliability:values ?ls_values
             ] .
    }
  }
```

#### INVOKE CALCULATION SERVICE AT SUPPLIER

At the supplier's EDC connector, the graph asset of the HI calculation service is requested. Doing so, a sub-skill is transferred to the supplier's Knowledge Agent. At the supplier, the HI calculation service is called implicit due to its service binding to the knowledge graph. The result then is bound to the knowledge graph.

```sparql
  SERVICE ?functionConnector {
    GRAPH ?assetFunction { 
      SELECT ?prognosis WHERE {
        ?invocation a ?function ;
              cx-behaviour:sender <bpn:legal:BPNLOEM> ;
              cx-behaviour:senderConnector <edc://sender> ;
              cx-behaviour:recipient <bpn:legal:BPNLSUPPLIER> ;
              cx-behaviour:recipientConnector <edc://recipient> ;
              cx-behaviour:targetDate ?recordDate ;
              cx-behaviour:timeStamp ?recordDate ;
              cx-behaviour:component ?assembly ;
              cx-behaviour:observationType ?ls_type ;
              cx-behaviour:statusDate ?recordDate ;
              cx-behaviour:statusOperatingHours ?operatingTime ;
              cx-behaviour:statusMileage ?mileage ;
              cx-behaviour:countingValue ?ls_value ;
              cx-behaviour:countingUnit ?ls_unit ;
              cx-behaviour:countingMethod ?ls_method ;
              cx-behaviour:headerChannels ?ls_channels ;
              cx-behaviour:bodyClasses ?ls_classes ;
              cx-behaviour:bodyCountsList ?ls_values ;
              ?result_type ?prognosis .
        }
    }
  } # SUPPLIER#CATALOG

} # SELECT
```

## SKILL REGISTRATION AND INVOCATION

For skill registration and invocation, have a look at the [general Development View](../../../development-view/skill#skill-registration).
