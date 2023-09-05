# CX - 00XX Ontology Models in Catena-X v.1.0.0

## Table of Contents

- [CX - 0000 Ontology Models in Catena-X v.1.0.0](#cx---0000-ontology-models-in-catena-x-v100)
  - [Table of Contents](#table-of-contents)
  - [ABOUT THIS DOCUMENT \& MOTIVATION](#about-this-document--motivation)
  - [DISCLAIMER \& LIABILITY](#disclaimer--liability)
  - [REVISIONS \& UPDATE](#revisions--update)
  - [COPYRIGHT \& TRADEMARKS](#copyright--trademarks)
  - [ABSTRACT](#abstract)
  - [1. INTRODUCTION](#1-introduction)
    - [1.1 AUDIENCE \& SCOPE](#11-audience--scope)
    - [1.2 CONTEXT](#12-context)
    - [1.4 CONFORMANCE](#14-conformance)
    - [1.5 PROOF OF CONFORMITY](#15-proof-of-conformity)
    - [1.7 TERMINOLOGY](#17-terminology)
  - [2 MAIN CONTENT  // HAUPTTEIL](#2-main-content---hauptteil)
  - [3 REFERENCES](#3-references)
    - [3.1 NORMATIVE REFERENCES](#31-normative-references)
    - [3.2 NON-NORMATIVE REFERENCES](#32-non-normative-references)
  - [ANNEXES](#annexes)
    - [FIGURES](#figures)
    - [TABLES](#tables)

## ABOUT THIS DOCUMENT & MOTIVATION

## DISCLAIMER & LIABILITY

## REVISIONS & UPDATE

## COPYRIGHT & TRADEMARKS

## ABSTRACT

This standard gives fundamental guidelines to create ontology models for being used in Catena-X. It provides the semantic basis for the so called Knowledge Agent Approach that utilizes semantic web technologies for federated queries in data spaces (see Catena-X standard CX0084).

## 1. INTRODUCTION

Semantics is the art and science of understanding what data means. In the context of Catena-X this topic has a significant importance in the sense that data provider and consumer need to have the same understanding what data needs to be shared (see also [FAIR data](https://en.wikipedia.org/wiki/FAIR_data)).

Semantic Data Models are an established appeoach to achieve this target by offering a high degree of semantic expressivity to describe data and information. This approach drives collaboration between data space participants, allows interoperability between data space applications and fosters design of data-centric software architectures. These capabilities are crucial enablers for data ecosystems like Catena-X to create new applications without adding too much effort for data providers in terms of data preparation and processing.

Thus, the following fundamental principles should be considered for creating data models for applications in Catena-X:

- Maximise Semantics
- Reduce Complexity
- Minimise Redundancy

Ontology models can be seen as a sophisticated way of implementing these targets. The term [ontology](https://de.wikipedia.org/wiki/Ontologie) itself is rather fuzzy and addresses a whole branch of philosophy caring about the order of things and theoretical concepts. In computer science the definition of ontology is much more narrow and relates to the structure of classes, attributes and relations (see Figure 1).

[![Ontology_Classification](/img/knowledge-agents/ontology_classification.png)](/img/knowledge-agents/ontology_classification.png)

Figure 1: classification of terminology utilized in semantic context.

As there are still different ways how ontologies can be formally described in the sense of data format, this standard takes on well established web W3C Semantic Web standards centering around RDF/RDFS:

- OWL for modelling ontologies itself,
- SKOS for vocabularies,
- RML for mapping,
- SHACL for constraints,
- Turtle for persisting,
- SPARQL for querying.

### 1.1 AUDIENCE & SCOPE

> _This section is non-normative_

This standard aims at everyone who creates or processes ontology models in Catena-X. In particular:

- **Business Application Providers** that create/request specific models/ model extensions to make their application work (relevant for certification if solutions are based on knowledge agent approach for data processing).

- **Data Providers** that need to supply data based on given specification of an ontology model (not relevant for certification).

- **Enablement Service Providers** that offer data integration solutions, e.g. for mapping of ontology models to corporate-internal data models (relevant for certification if solutions for knowledge agent approach are provided).

- **Catena-X e.V.** will have a significant role of supervising ontology development (governance process for model development and respective quality criteria, not relevant for certification).

Created ontology models can be utilized as semantic basis for the so called "knowledge agent" approach to exchange data across Catena-X participants. This standard will reference required external standards. Furthermore, it will provide modelling guidelines that extend/restrict given W3C standards to decrease complexity and to make sure that the models are designed in a unified way compatible with CX0084 (knowledge agent standard).

### 1.2 CONTEXT

#### Modelling Approach (to be completed)

- Utilized standards
- what do we model and how is this structured
- How is the model used

#### Modelling Process

Ontology modelling is an iterative, continuous development process that consists of three steps (see example in Figure 2):

- create classes,
- create relations,
- create attributes.

[![Ontology_Process](/img/knowledge-agents/ontology_process.png)](/img/knowledge-agents/ontology_process.png)

Figure 2: Modelling Process

To facilitate the modelling process a common workshop for knowledge acquisition with the stakeholders (data producers, consumers, domain experts) is helpful. This workshop should address the following aims:

- to specify the ontology domain and scope
- to collect the requirements, data sources
- to prevent misunderstanding and moderate the expectations
- to collect relevant classes, relations, attributes

The following questions/guidelines help to structure an ontology modelling workshop and ontology modelling in general:

#### Understand business need

- What is the business problem we want solve?
- Why do we need to answer this question?  (purpose)
- Who knows, produces, consumes the data? (name the stakeholders)
- Where are the data sources?
- When will the data be consumed? (real-time, daily)

#### Model plan

- What are we building?
- Why are we building it?
- How are we building it
- Who is building it?

#### Model Scope

- state the business questions
- specify the domain of the ontology
- identify necessary data sources
- specify the semantic data model requirements

#### Model Dependency

- to avoid ontology redundancy modularity and reuse are important design principles
- check if parts of the needs are covered in existing ontologies
- consider also extending different ontologies in a new one (modularity)
- define import dependency in ontology metadata

#### Create Ontology

- copy ontology template and specify ontology metadata
- define domain, i.e. the ontology domain, e.g. 'Vehicle'
  - use a short, unambiguous domain name so that everyone can easily understand the meaning
  - use a specific domain name if helps to understand the context better
- define turtle file name followed by 'ontology' in snake_case
  - (domain) + '_ontology.ttl', e.g. 'vehicle_ontology.ttl'
- specify title of ontology followed by 'Ontology' in title case with whitespaces
  - (domain) + ' Ontology', e.g. 'Vehicle Ontology'
- specify version, use three integers separated with two dots
- specify author, full name(s) of main responsible(s) comma separated
- specify contributor, full name(s) domain expert(s) comma separated
- specify description, i.e. state business problem and business questions
- specify import dependency, i.e. which other ontologies are necessary for this ontology
  - note: a proxy can hinder protege to access the import ontology on github

<table>
<thead>
 <tr>
  <th>type</th>
  <th>identifier</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>prefix</td>
  <td>cx</td>
 </tr>
 <tr>
  <td>namespace</td>
  <td></td>
 </tr>
 <tr>
  <td>title</td>
  <td>Vehicle Ontology</td>
 </tr>
 <tr>
  <td>version</td>
  <td>0.0.1</td>
 </tr>
 <tr>
  <td>author</td>
  <td></td>
 </tr>
 <tr>
  <td>contributor</td>
  <td></td>
 </tr>
 <tr>
  <td>description</td>
  <td></td>
 </tr>
 <tr>
  <td>import</td>
  <td></td>
 </tr>
</tbody>
</table>

#### Create Classes

- check & reuse if class already exists in cx ontology, check also for the synonyms
- specify the (machine-readable) identifier in English
  - use only noun or a phrase of nouns in lower case with whitespaces
  - use generic terms here, so that everyone can easily understand the meaning
  - note: the identifier will be converted to UpperCamelCase
  - do not use acronyms and abbreviations here
- specify the (human-readable) name in English and German
  - use only noun or a phrase of nouns in title case with whitespaces
  - use business terms here, so that the business department can easily understand the meaning
  - use acronyms and abbreviations here
- specify the definition in English, only short sentence
- specify a few examples in English
- specify the synonyms in English and German
  - add acronym definitions here with parenthesis, e.g. 'Bill of Material (BOM)'
  - add British English synonyms here
- specify the parent class(es)

<table>
<thead>
 <tr>
  <th>type</th>
  <th>identifier</th>
  <th>name_en</th>
  <th>name_de</th>
  <th>definition_en</th>
  <th>definition_de</th>
  <th>example_en</th>
  <th>note_en</th>
  <th>synonyms_en</th>
  <th>synonyms_de</th>
  <th>parents</th>
  <th>is_part_of</th>
  <th>relation_from</th>
  <th>relation_to</th>
  <th>links</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>class</td>
  <td>vehicle</td>
  <td>Vehicle</td>
  <td>Fahrzeug</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
 </tr>
</tbody>
</table>

#### Create Relations

- specify the (machine-readable) identifier in English
  - use a complete verb phrase in lower case with whitespaces, e.g. 'is part of'
  - note: the identifier will be converted to lowerCamelCase
  - do not invent new relations, instead reuse existing relations
- specify the synonyms in English and German
- specify the domain
- specify the range
- specify the inverse relation

<table>
<thead>
 <tr>
  <th>type</th>
  <th>identifier</th>
  <th>name_en</th>
  <th>name_de</th>
  <th>definition_en</th>
  <th>definition_de</th>
  <th>example_en</th>
  <th>note_en</th>
  <th>synonyms_en</th>
  <th>synonyms_de</th>
  <th>parents</th>
  <th>is_part_of</th>
  <th>relation_from</th>
  <th>relation_to</th>
  <th>links</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>relation</td>
  <td>is_part_of</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>part of</td>
  <td></td>
  <td></td>
  <td></td>
  <td>part</td>
  <td>vehicle</td>
  <td></td>
 </tr>
</tbody>
</table>

#### Create Attributes

- check & reuse if attribute already exists in cx ontology, check also for the synonyms
- specify the (machine-readable) identifier in English
  - use a noun or a phrase of nouns in lower case with whitespaces (similar to column names)
  - use generic terms here, so that everyone can easily understand the meaning
  - use class name as specifier, if the attribute is specific to the class
  - note: the identifier will be converted to lowerCamelCase
  - do not use acronyms and abbreviations here
  - do not use verbs in attribute identifiers
  - note: identifier (class_id), name (class_name), code, date, type
- specify the (human-readable) name in English and German
  - use a noun or a phrase of nouns in title case with whitespaces (similar to column names)
  - use business terms here, so that the business department can easily understand the meaning
  - use acronyms and abbreviations here
  - do not use verbs in attribute names
- specify the definition in English
  - use only one or two short sentences
  - write full sentences that are closed
  - do not write a long text, more than XY characters
- specify a few examples in English
- specify the synonyms in English and German
  - add acronym definitions here with parenthesis, e.g. 'Bill of Material (BOM)'
  - add British English synonyms here
- specify the domain, i.e. the class the attribute is related from
- specify the range
  - use only string, integer, date, timestamp, double

<table>
<thead>
 <tr>
  <th>type</th>
  <th>identifier</th>
  <th>name_en</th>
  <th>name_de</th>
  <th>definition_en</th>
  <th>definition_de</th>
  <th>example_en</th>
  <th>note_en</th>
  <th>synonyms_en</th>
  <th>synonyms_de</th>
  <th>parents</th>
  <th>is_part_of</th>
  <th>relation_from</th>
  <th>relation_to</th>
  <th>links</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>attribute</td>
  <td>vehicle id</td>
  <td>VIN</td>
  <td>FIN</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>vehicle</td>
  <td>xsd:string</td>
  <td></td>
 </tr>
</tbody>
</table>

#### Merging the CX ontology

- check for conflicts
- clean redundant definitions of classes, relations, attributes

It is always subject to potential changes in the future. Therefore, start with a MVP ontology and extend it later on, i.e. an agile working model fits here well. A semantic model is only useful, when it is used by someone (application integration).

### 1.4 CONFORMANCE

As well as sections marked as non-normative, all authoring guidelines, diagrams,
examples, and notes in this specification are non-normative. Everything else in
this specification is normative.

The key words **MAY**, **MUST**, **MUST NOT**, **OPTIONAL**, **RECOMMENDED**,
**REQUIRED**, **SHOULD** and **SHOULD NOT** in this document document are to be
interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they
appear in all capitals, as shown here.

### 1.5 PROOF OF CONFORMITY

(to be completed)

> _This section is non-normative_

#### Proof of technical model specification

Options:

- KA test bench?
- Model can be opened in standard OWL editor such as Protegee?

#### Proof of model content specification

Model content should adhere to given guidelines in context section of this standard. Nevertheless, model content needs to be reviewed by Catena-X e.V and their given governance process. Thus, CAB will not review model content.

#### Proof of Syntactical model specification

Model content should adhere to given guidelines in context section of this standard. Nevertheless, model syntax needs to be reviewed by Catena-X e.V and their given governance process. Thus, CAB will not review model content.

### 1.7 TERMINOLOGY

> _This section is non-normative_

#### Attribute

- an attribute represents a characteristic of an entity/class/individual, e.g. foaf:Person foaf:name "Max"
- an attribute has always data type as range, it matches from an entity to a literal (string, integer)
- an attribute is called 'owl:DatatypeProperty' in OWL
- an attribute correspond to an attribute/field/variable in OOP/UML
- an attribute correspond to a column in a RDB
- an attribute is a.k.a. property, characteristic, feature, value

#### Class

- a class is a set of individuals with shared structure/properties, i.e. kinds of things
- a class correspond to a class in OOP/UML
- a class correspond to a table in a RDB
- a sub-class specialises the superclass, has inheritance, similar to OOP/UML, constructs a class hierarchy (taxonomy)

#### Data Mapping (RML)

- a data mapping connects the logical data model (ontology) with the underlying external physical data model (RDB schema)
- a data mapping is based on RML for documents (csv, json, xml) and R2RML for RDBs

#### Individual

- an individual represents an actual/concrete object/entity from the ontology domain, i.e. things (something, someone, ...)
- an individual is also known as instance/object of a class in OOP
- an individual correspond to a row of a table in a RDB
- in OWL there is no unique name assumption, i.e. different names can refer to the same individual

#### Knowledge Graph

- a knowledge graph is a graph-structured database where knowledge is represented in the ontology and individuals
- there are two types of KGs: RDF (Neptune, RDFox, AnzoGraph) and LPG (neo4j, tinkerpop)
- here we use RDF

#### Literal

- a literal represents a data value, i.e. an element with a data type (string or integer), e.g. foaf:Person foaf:name "Max"
- string literals have language tags, e.g. "this is in english"@en
- the data types are defined in XSD, e.g. xsd:string, xsd:integer

#### Ontology (OWL)

- an ontology is a semantic data model that consists of classes, relations, attributes for a specific domain of interest/discourse
- an ontology corresponds to a logical data model or entity-relationship model of a RDB
- an ontology follows the open-world assumption, i.e. the ontology changes over time, i.e. the schema will change

#### Relation

- a relation represents how two individuals are connected/related, e.g. cx:Bob cx:knows cx:Tom
- a relation is directed in form of binary relation pointing from the domain (source) to the range (target) (note: not the ontology domain meant here!)
- a relation can be inverse, transitive, symmetric, which are important for reasoning
- a relation is called 'owl:ObjectProperty' in OWL
- a relation correspond to an association in OOP/UML
- a relation correspond to a foreign key in a RDB

#### Triple

- a triple is statement consisting of subject-predicate-object that is defined by RDF
- a triple is the basic unit for triplestores

#### Uniform Resource Identifier (URI)

- an URI is an unique identifier for a (web) resource
- an URI is also known as a web address or internet link, e.g. <http://xmlns.com/foaf/0.1/Person>
- an URI is shortened with a prefix (alias), e.g. foaf:Person
- all resources (classes, relations, attributes, ...) are represented by URIs in RDF/OWL
- a namespace is the base URL and we use <https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/> with the prefix cx
- ontology files can be directly accessed from the internet, e.g. cx:vehicle_ontology.ttl

## 2 MAIN CONTENT  // HAUPTTEIL

> _This section is normative_

### Technical model specification (to be completed)

- Supported standards:....
- All classes, relations, attributes MUST be uniquely defined in an ontology (or sub-ontology)
- Redundant definitions MUST be resolved
- New ontologies or adaptation of existing ontologies are created upon request of Catena-X use cases

### Model content specification (to be completed)

...

### Syntactical model specification

All ontology models in Catena-X MUST adhere to the following criteria:

#### General

- avoid bad naming, consider interpretation and context
- make names more specific if it has more than one interpretation
- avoid omitting definitions or bad definitions
- try to name examples, since it supports in the semantics

#### Identifiers/URIs

- use only alphanumeric characters [A-z0-9] (IRI/URI standard)
- do not use acronyms or abbreviations allowed in URIs
- use PascalCase/UpperCamelCase for classes (RDF/OWL standard)
- use camelCase/lowerCamelCase for relations and attributes (RDF/OWL standard)

#### Naming Conventions

- use only alphanumeric characters with whitespaces [A-z0-9 ] + Umlaute (ÄäÖöÜüß)
- use acronyms or abbreviations if it helps the understanding of the data for the consumers
- use title case with whitespaces for classes and attributes for better human-readability
- use lower case with whitespaces for relations

<table>
<thead>
 <tr>
  <th>convention</th>
  <th>identifier</th>
  <th>name_en</th>
  <th>name_de</th>
 </tr>
</thead>
<tbody>
 <tr>
  <td>language</td>
  <td>English</td>
  <td>English</td>
  <td>German</td>
 </tr>
 <tr>
  <td>readability</td>
  <td>machine-readable</td>
  <td>human-readable</td>
  <td>human-readable</td>
 </tr>
 <tr>
  <td>terms</td>
  <td>generic terms</td>
  <td>business terms</td>
  <td>business terms</td>
 </tr>
 <tr>
  <td>character range</td>
  <td>[A-z0-9]</td>
  <td>[A-z0-9 -]</td>
  <td>[A-z0-9 -ÄäÖöÜüß]</td>
 </tr>
 <tr>
  <td>separator</td>
  <td>none</td>
  <td>whitespace</td>
  <td>whitespace</td>
 </tr>
 <tr>
  <td>class case</td>
  <td>PascalCase</td>
  <td>Title Case</td>
  <td>Title Case</td>
 </tr>
 <tr>
  <td>relation case</td>
  <td>camelCase</td>
  <td>lower case</td>
  <td>lower case</td>
 </tr>
 <tr>
  <td>attribute case</td>
  <td>camelCase</td>
  <td>Title Case</td>
  <td>Title Case</td>
 </tr>
 <tr>
  <td>acronyms</td>
  <td>no</td>
  <td>yes</td>
  <td>yes</td>
 </tr>
</tbody>
</table>

#### Language

- use short, meaningful, unambiguous names
- note: natural language exhibits ambiguity, inaccuracy, uncertainty, vagueness
- use both English and German names, since it improves the semantics
- do not use vague terms, e.g. model, data, ...
- use only US English terms and name British terms as synonyms, e.g. meter/metre

## 3 REFERENCES

(to be completed)

### 3.1 NORMATIVE REFERENCES

```text
    [Optional] - Links to related Catena-X or external standards that need to be
    meet in order to fulfil this standard. If no external standards need to be
    met, leave empty.
```

### 3.2 NON-NORMATIVE REFERENCES

> _This section is non-normative_

```text
    [Optional] – Links to further documentation that may help to understand the 
    standard but isn’t relevant for conformity assessment
```

## ANNEXES

(to be completed)

### FIGURES

> _This section is non-normative_

```text
    [OPTIONAL] Add figures here if necessary
```

### TABLES

> _This section is non-normative_

```text
    [OPTIONAL] Add Tables here here if necessary
```
