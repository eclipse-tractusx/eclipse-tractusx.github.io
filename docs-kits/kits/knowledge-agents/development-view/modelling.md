---
sidebar_position: 1
title: Ontology Modelling
---
<!--
 * Copyright (c) 2021,2024 T-Systems International GmbH
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

![Agents Kit Banner](/img/knowledge-agents/AgentsKit-Icon.png)

## Agents KIT

**Ontology models for federated queries over the whole data space.**

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [High-Level Architecture](architecture)
* The [ARC42](Arc42) documentation
* An [API](api) specification
* The [Layers & Modules](modules) Architecture
* Our [Reference Implementation](reference)
* The [Deployment](../operation-view/deployment) guide

## Introduction & Standards

This document gives fundamental guidelines to create ontology models for being used in Catena-X (see Catena-X standard CX-0067). It provides the semantic basis for the so called Knowledge Agent Approach that utilizes semantic web technologies for federated queries in data spaces (see Catena-X standard CX-0084).

* [CX-0084 Federated Queries in Dataspaces (V1.2.0 Upcoming)](https://catena-x.net/de/standard-library)
* [CX-0084 Federated Queries in Dataspaces (V1.1.0 Superseded)](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_Januar_2024/CX-0084-FederatedQueriesInDataSpaces-v1.1.0.pdf)
* [CX-0084 Federated Queries in Dataspaces (V1.0.0 Superseded)](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September_2023/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.pdf)
* [CX-0067 Ontology Models to Realize Federated Queries in Catena-X  (V1.1.0 Upcoming)](https://catena-x.net/de/standard-library)
* [CX-0067 Ontology Models to Realize Federated Queries in Catena-X  (V1.0.0 Superseded)](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_Januar_2024/CX-0067-OntologyModelsinCatenaX-v1.0.0.pdf)

## Semantics & Ontology

Semantics is the art and science of understanding what data means. In the context of Catena-X this topic has a significant importance in the sense that data provider and consumer need to have the same understanding what data needs to be shared (see also [FAIR data](https://en.wikipedia.org/wiki/FAIR_data)).

In the knowledge agent approach, ontologies are used to describe the semantics of data. Ontologies are similar to data models or data schemas in which the semantics and structure of data are described. In addition, ontologies provide a high degree of semantic expressiveness, e.g. by supporting inference on data like "p-123" is_a part & part is_a physical object => "p-123" is_a physical object. Such inference enables strong typing of data. This way a machine, an hence the dataspace participants, can understand the meaning of the vocabulary 'part', that it is a physical object and not a document part or a design model part.

It could be that similar vocabularies are used for different things in the business partners sovereign data models. Hence the formal semantics of ontologies prevents such misunderstandings in data caused by synonymity or homonymity, etc. and lead to better collaboration and interoperability among data space participants.

On the other hand, the ontology-based approach represents the underlying data in assets as a generlized graph structure. This allows flexible querying of typed and linked data - no matter of its physical storage and retrieval. In applying the ontology-based data modelling in Catena-X, the following fundamentals should be achieved:

* Maximise Semantics
* Reduce Complexity
* Minimise Redundancy

### Accessing Catena-X Ontology and Taxonomy

* All ontology and taxonomy descriptions are licensed under the Apache License.
* They can be browsed under their common namespace [https://w3id.org/catenax](https://w3id.org/catenax)
* The current Catena-X Ontology can be found under the namespace [https://w3id.org/catenax/ontology](https://w3id.org/catenax/ontology)
* The current Catena-X Taxonomy can be found under the namespace [https://w3id.org/catenax/taxonomy](https://w3id.org/catenax/taxonomy)
* Older versions of ontologies and taxonomies can also be referenced:
  * [https://w3id.org/catenax/v24.03/ontology](https://w3id.org/catenax/v24.03/ontology)
  * [https://w3id.org/catenax/v24.03/taxonomy](https://w3id.org/catenax/v24.03/taxonomy)
  * [https://w3id.org/catenax/v23.09/ontology](https://w3id.org/catenax/v23.09/ontology)
  * [https://w3id.org/catenax/v23.09/taxonomy](https://w3id.org/catenax/v23.09/taxonomy)
* Upcoming versions of ontologies and taxonomies can also be referenced:
  * [https://w3id.org/catenax/next/ontology](https://w3id.org/catenax/next/ontology)
  * [https://w3id.org/catenax/next/taxonomy](https://w3id.org/catenax/next/taxonomy)

## Concept

The concept of ontology-based data modelling of the knowledge agent approach is based on the following building blocks:

* [OWL 2 QL Profile](https://www.w3.org/TR/owl2-profiles/#OWL_2_QL) for modelling ontologies,
* [OWL 2 RL Profile](https://www.w3.org/TR/owl2-profiles/#OWL_2_QL) for modelling common dataspace assets,
* [SKOS](https://www.w3.org/2004/02/skos/) for vocabularies,
* [RML](https://rml.io/specs/rml/) & [R2RML](https://www.w3.org/TR/2012/REC-r2rml-20120927/) for mapping data source model to asset model to provide data in an asset,
* [SHACL](https://www.w3.org/TR/shacl/) for data quality check and for describing which data is available in the asset and in which form,
* [RDF](https://www.w3.org/TR/rdf12-concepts/) for description and exchange of graph data,
* [Turtle](https://www.w3.org/TR/turtle/) for persisting,
* [SPARQL](https://www.w3.org/TR/sparql11-query/) profiles for transferring logic and querying catalogues, data and functions.

In the Knowledge Agent approach, the data is modelled with the Semantic Web Ontology language [OWL](https://www.w3.org/TR/2012/REC-owl2-primer-20121211/). This enables object-oriented modelling of domains with classes, attributes and relationships. Object-oriented modelling allows the modelling of a domain from general to specific by creating subclasses. The first step is to define the main classes that describe the domain. In the case of Catena-X, five main classes were defined.

* Activity: This class comprises actions that are intentionally performed by instances of the actor over the course of the product life cycle and result in state changes in physical and conceptual objects.
* Actor: This class comprises organization, device or people, either individually or in groups, who have the potential to perform intentional actions of kinds for which someone may be held responsible.
* Physical object: This class includes objects of a material nature, which are documentation units and have physical boundaries.
* Conceptual object: This class includes non-material products, human-produced data related to physical objects. The production of such information may have been supported by the use of technical tools.
* Place: The class Place is determined by reference to the position of objects such as buildings, cities, or special geographic markers.

[![Modelling Concept](/img/knowledge-agents/modelling_concept.jpg)](/img/knowledge-agents/modelling_concept.jpg)

## Activity-centred Modelling

A well-known approach is the activity-centered or event-based modelling. The [CIDOC CRM](https://www.cidoc-crm.org/) ontology provides this idea and the main classes based on this concept. In this approach the classes actor, place, physical object and conceptual object are connected through activities. Instead of assigning all information to the physical object. This distributed representation has several advantages:

* The life cycles of products and documents are represented separately and clearly.
* The activities have a start and end date so that the data can be queried chronologically.
* The data can be viewed and queried from different perspectives.
  * Identifies all actors (e.g. companies) involved in an activity (e.g. manufacturing).
  * Identifies all activities performed on a physical object (vehicle).
  * Finds all activities that have been performed at a place.
  * Searches for all physical objects (e.g. material) used in an activity (e.g. manufacturing).
  * Search for conceptual objects related to a physical object in an activity.

[![Activity-Centered Model](/img/knowledge-agents/modelling_activity.jpg)](/img/knowledge-agents/modelling_activity.jpg)

## Core and Domain Ontologies

The concept described above is the basic modelling pattern in Knowledge Agent. We call it the [core ontology](https://w3id.org/catenax/ontology/core). Based on this ontology, specific domain ontologies can be modelled. A domain ontology can be created based on subclasses (e.g. Manufacturing is SubClassOf Activity), subrelations (e.g. has Manufacturer is SubPropertyOf has Participant) and subattributes. The domain ontology has the same structure as the core ontology, but can be extended to include additional classes. The Knowledge Agent approach uses OWL 2 QL for modelling. This is a subset of OWL 2 Full. The reason for this is that it includes most of the main features of conceptual models such as UML class diagrams and ER diagrams. It also provides polynomial time inference for large data sets.

Benefits of the basic modelling pattern:

* Easy for domain experts to understand and create new domain ontologies.
* Data is represented in datasets using the same pattern.
* Data can be queried with general queries such as 'Get All Actors' or specific queries such as 'Get Manufacturer'.

[![Modelling Domains](/img/knowledge-agents/modelling_domain.jpg)](/img/knowledge-agents/modelling_domain.jpg)

* The current (merged) Catena-X Ontology can be found under the namespace [https://w3id.org/catenax/ontology](https://w3id.org/catenax/ontology)
* The current Catena-X Core Ontology can be found under the namespace [https://w3id.org/catenax/ontology/core](https://w3id.org/catenax/ontology/core)
* The current Catena-X Common Ontology (caring about dataspace entities and catalogues) can be found under the namespace [https://w3id.org/catenax/ontology/common](https://w3id.org/catenax/ontology/common)
* For more domain ontologies, see the complete namespace [https://w3id.org/catenax](https://w3id.org/catenax)

## Data Serialization as a Graph

In the ontology-based approach, the data is serialised in graph structure using the Resource Description Framework (see [RDF](https://www.w3.org/TR/rdf12-concepts/)). Each node, also called a resource, is uniquely identified by a [URI](https://www.w3.org/wiki/URI). The edges are called property in RDF Graph because each relation forms a [subject-predicate-object triple](https://www.w3.org/wiki/SubjectPredicateObject). The nodes can be linked to other nodes (so-called object property). The relations used are from the Domain Ontology. At the same time, nodes can be linked to literals (so-called datatype property). With the property rdf:type, the nodes can be instantiated with domain classes.

[![Data as a Graph](/img/knowledge-agents/modelling_data.jpg)](/img/knowledge-agents/modelling_data.jpg)

The RDF graphs are stored in [RDF databases](https://www.w3.org/wiki/LargeTripleStores) (so-called triple store) and can be serialised in various formats such as xml, json, ttl, etc. Different data sources such as relational databases, XML, JSON and CSV files can be mapped to RDF graphs using standardised languages such as RML and R2RML. Based on the mapping, the data can be transformed or virtualised. Virtualisation allows the data to be processed as RDF graphs without transforming it and storing it in a different location.

Serialization of data based on Turtle syntax:

```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .
@prefix exp: <https://www.example.com#> .

# Vehicle Ontology
cx-vehicle:Vehicle rdf:type owl:Class ;
  rdfs:subClassOf cx-core:PhysicalObject.

cx-vehicle:vehicleIdentificationNumber rdf:type owl:DatatypeProperty ;
  rdfs:subPropertyOf cx-core:id ;
  rdfs:domain cx-vehicle:Vehicle ;
  rdfs:range xsd:string .  

# Sample instance             
exp:vehicle_1 rdf:type cx-vehicle:Vehicle, cx-core:PhysicalObject;
  cx-core:name "Goggomobile" 
  cx-core:id "ABCDEFG1HI2J34567".
  cx-vehicle:vehicleIdentificationNumber "ABCDEFG1HI2J34567".

```

## Digital Twin and Ontologies

A digital twin is a digital object in a defined digital platform, such as the Web, data spaces, etc., that represents a real-world object and is identifiable and discoverable based on a defined unique identification. In the knowledge agent approach, a digital twin is an existing instance of a class of a domain ontology. The domain ontologies describe what kind of real-world objects it represents. With the cx-core:id all instances are identifiable in the Catena-X data space. A shape graph for the data provider's asset describes which digital twins are published in its asset. This makes the digital twins discoverable.

Although using a different representation and API, this concept is similar to the one of an "Asset" in the "Asset Administration Shell" approach. Therefore, it is possible to  [bridge](../development-view/modules#aas-bridges) these technolgies in both ways.

## Taxonomy

A taxonomy is a collection of terms and their meaning. The terms are structured in a hierarchical form, whereby the relationships become broader and narrower. Taxonomies can be seen as a dictionary that ensures the correct use of terms. Ontologies use the terms to describe a domain. Domain ontologies can grow very quickly and become confusing. Therefore, it is not recommended to define classes for all types of a domain in an ontology. Instead of defining new subclasses, the instances can be typed using terms from the taxonomy. For this purpose, a Catena-X taxonomy is created with SKOS, which can be extended based on the classes of the core ontology. For example, the class Vehicle in the Vehicle Ontology describes vehicles. A small car is a special type of vehicle for which there it is not necessary to create a separate class. Instead, the term can be included in the taxonomy and the instances can be specified from there.

```ttl

@prefix dct: <https://purl.org/dc/terms/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .
@prefix cx-taxo: <https://w3id.org/catenax/ontology/taxonomy#> .

# Catena-X Taxonomy
cx-taxo:Thing a skos:Concept;
    skos:prefLabel "Thing"@en .

  cx-taxo:PhysicalObject a skos:Concept ;
    skos:broader cx-taxo:Thing ;
    skos:narrower cx-taxo:PhysicalObject ;
    skos:prefLabel "Physical Object"@en .

    cx-taxo:Vehicle a skos:Concept ;
      skos:broader cx-taxo:PhysicalObject ;
      skos:narrower cx-taxo:SmallCar ;
      skos:prefLabel "Vehicle"@en .

      cx-taxo:SmallCar a skos:Concept ;
        skos:broader cx-taxo:Vehicle ;
        skos:prefLabel "Small Car"@en .
  
# Instance Vehicle
exp:vehicle_1 rdf:type cx-vehicle:Vehicle;
  dct:type cx-taxo:SmallCar.

```

The current (merged) Catena-X Taxonomy can be found under the namespace [https://w3id.org/catenax/taxonomy](https://w3id.org/catenax/taxonomy)

The current Catena-X Core Taxonomy can be found under the namespace [https://w3id.org/catenax/taxonomy/core](https://w3id.org/catenax/taxonomy/core)

The current Catena-X Asset Ontology (caring about dataspace terms) can be found under the namespace [https://w3id.org/catenax/taxonomy/asset](https://w3id.org/catenax/taxonomy/asset)

For more taxonomies, see the complete namespace [https://w3id.org/catenax](https://w3id.org/catenax)

## Asset Content Description

The Common Ontology contains classes and properties to describe assets on a meta-level. The asset class describes the URL from which the SPRAQL endpoint can be reached, which ontology was used to describe the data, what form the data has based on SHACL, which business partner provides the asset, and so on. The descriptions are helpful for ordinary users and necessary for application configuration.

```ttl

@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .

# Asset description
exp:asset_1 rdf:type cx-common:Asset;
  cx-core:id "asset_1";
  dct:type cx-taxo:GraphAsset;
  cx-common:name "Vehicle dataset";
  rdfs:isDefinedBy <https://w3id.org/catenax/ontology/vehicle>;
  cx-common:shapeGraph exp:vehicleShapeGraph;
  cx-common:dataAddress exp:dataAddress_1

exp:dataAddress_1 rdf:type cx-common:DataAddress;
  cx-common:baseUrl "http://provisioning-agent:8080/sparql";


# Asset content description (exp:vehicleShapeGraph)
exp:VehicleShape a sh:NodeShape ;
  sh:targetClass cx-vehicle:Vehicle ;
  sh:property [
    sh:path cx-vehicle:vehicleIdentificationNumber ;
    sh:pattern "[A-Z0-9]{17}";
    sh:minCount 1 ;
  ] ;
  sh:property [
    sh:path cx-core:name ;
    sh:datatype xsd:string ;
    sh:minCount 1 ;
  ] .

```

## Modelling of Functions

In the Knowledge Agent approach, in addition to publishing static data, it is also possible to offer services that perform calculations. These services can be called as functions with parameters. The functions can be modelled using the ontology function. The function parameters are defined by the cx-fx:argument. The ontology also contains function configuration properties that are required to configure the service.

```ttl

@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
@prefix cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#> .
@prefix exp: <https://www.example.com#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .


# Sample Function

exp:GetModelYear rdf:type cx-fx:Function;
  rdfs:comment "Returns the model year for a given vehicle identification number.".

exp:vin rdf:type cx-fx:argument ;
  rdfs:domain cx-fx:Function ;
  rdfs:range xsd:string.

exp:ModelYear rdf:type cx-fx:Result;

```

Functions are defined in a similar way to data in SHACL. In addition, the **cx-sh:hasAsArgument** property can be used to define which data property is required for a function argument to execute the function.

```ttl

# Function Ontology 

exp:GetModelYearShape a sh:NodeShape ;
  sh:targetClass exp:GetModelYear ;
  sh:property [
    cx-sh:hasAsArgument cx-vehicle:vehicleIdentificationNumber;
    sh:path exp:vin ;
    sh:pattern "[A-Z0-9]{17}";
    sh:minCount 1 ;
  ] .

```

* The current Catena-X Function Ontology can be found under the namespace [https://w3id.org/catenax/ontology/function](https://w3id.org/catenax/ontology/function)

## Data Query

The RDF graphs can be accessed using the SPARQL query language via a SPARQL HTTP protocol. SPARQL allows the definition of complex instance relationships and the search for the defined patterns in the RDF graphs.

General query example: Returns all physical objects and their name and activities.

```sparql
PREFIX cx: <https://w3id.org/catenax/ontology/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX exp: <http://www.example.com#>

select ?activity ?physicalObject ?name
where {
  ?activity rdf:type cx:Activity.
  ?physicalObject rdf:type cx:PhysicalObject.
  ?physicalObject cx:name ?name.
  ?activity cx:refersToPhysicalObject ?physicalObject.
}

```

Query result (for mime-type "text/csv"):

| ?activity   | ?physicalObject |?name|
| ----------- | ----------- | ----------- |
|exp:manufacturing_1|exp:vehicle_1|"Goggomobil"|

The same result (for mime-type "application/sparql-results+json"):

```json
{
    "head": {
        "vars": [
            "activity",
            "physicalObject",
            "name"
        ]
    },
    "results": {
        "bindings": [
            {
                "activity": {
                    "type": "uri",
                    "value": "http://www.example.com#manufacturing_1"
                },
                "physicalObject": {
                    "type": "uri",
                    "value": "http://www.example.com#vehicle_1"
                },
                "name": {
                    "type": "literal",
                    "value": "Goggomobil"
                }
            }
        ]
    }
}

```

<br/>

Specific query example: Returns all vehicles and their name and manufacturing activities.

```sparql

PREFIX cx: <https://w3id.org/catenax/ontology/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX exp: <http://www.example.com#>

select ?activity ?physicalObject ?name
where {
  ?activity rdf:type cx:Manufacturing.
  ?physicalObject rdf:type cx:Vehicle.
  ?physicalObject cx:name ?name.
  ?activity cx:refersToPhysicalObject ?physicalObject.
}

```

<br/>

Query result is the same as the first one:

| ?activity   | ?physicalObject |?name|
| ----------- | ----------- | ----------- |
|exp:manufacturing_1|exp:vehicle_1|"Goggomobil"|

<br/>

## Federated Query

An important advantage of SPARQL is that multiple repositories can be accessed from a single query. This feature gives Catena-X the great advantage of being able to query distributed data in different assets at the same time.

[![Federated Query Example](/img/knowledge-agents/modelling_federated.jpg)](/img/knowledge-agents/modelling_federated.jpg)

Federated query example: Returns all vehicle names from OEM Asset and for the same vehicles the names of the diagnosis results from Service Asset.

```sparql

PREFIX cx: <https://w3id.org/catenax/ontology/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?vehicleName ?vehicleVin ?diagnosisResultName
where {
  
  # OEM Asset
  SERVICE <https://catena-x.net/asset/oem/asset_1> {
    ?physicalObjectOEM rdf:type cx:Vehicle.
    ?physicalObjectOEM cx:vin ?vehicleVin.
    
    #Service Asset
    SERVICE <https://catena-x.net/asset/service/asset_2> {
      ?physicalObjectService rdf:type cx:Vehicle.
      ?physicalObjectService cx:vin ?vehicleVin.
      ?physicalObjectService cx:name ?vehicleName.
      ?activity rdf:type cx:Diagnosis.      
      ?activity cx:refersToPhysicalObject ?physicalObjectService.
      ?activity cx:refersToConceptualObject ?conceptualObject.
      ?conceptualObject cx:name ?diagnosisResultName.
    }
  }
}

```

Federated Query result (for mime-type "text/csv"):

| ?vehicleName   | ?vehicleVin | ?diagnosisResultName |
| ----------- | ----------- | ----------- |
|"Goggomobil"| "ABCDEFG1HI2J34567" |"Cylinder misfire"|
|"Fliewatüüt"| "0815" |"Rotor breakdown"|
|"Herbie"| "4711" |"Low Oil Pressure"|

<br/>

## Skill

A Skill in the Knowledge Agent approach is any Data/Federated Query which

* is parameterizable by a set of input variables
* is published in the dataspace as a contractible asset with a unique id
* maybe invoked either on consumer-side (by downloading the query test) or provider-side (by execution of the query)

For example, above federated query could be invoked under the assetname `SkillAsset?supplier=ListDiagnosis` and the following input parameter set (using contenttype "application/sparql-results+json")

```json

{
    "head": {
        "vars": [
            "vehicleVin"
        ]
    },
    "results": {
        "bindings": [
            {
                "vin": {
                    "type": "literal",
                    "value": "ABCDEFG1HI2J34567"
                }
            },
            {
                "vin": {
                    "type": "literal",
                    "value": "4711"
                }
            }   
        ]
    }
}

```

Skill invocation result (for mime-type "text/csv"):

| ?vehicleName   | ?vehicleVin | ?diagnosisResultName |
| ----------- | ----------- | ----------- |
|"Goggomobil"| "ABCDEFG1HI2J34567" |"Cylinder misfire"|
|"Herbie"| "4711" |"Low Oil Pressure"|

<br/>

<sub><sup>(C) 2023,2024 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
