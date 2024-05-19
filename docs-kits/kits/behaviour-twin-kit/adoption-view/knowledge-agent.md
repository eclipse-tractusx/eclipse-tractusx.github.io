---
id: knowledge-agent
title: Knowledge Agent
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

## KNOWLEDGE GRAPH BASICS

The Knowledge Agent is a set of federated components that are used to reason over knowledge graphs. For detailed information, see the [Agents KIT](../../knowledge-agents/adoption-view/intro).

Semantic models (ontologies, enriched by taxonomies) are describing the data model. They describe all possible classes, their properties and relationships within a specific domain. They may be represented as a graph, but they are not the knowledge graph itself.

Semantic models are instantiated by semantic triplets. Those triplets are consisting of a subject, a predicate and an object. Subject and object are nodes, the predicate is a unidirectional edge (a relation) between them:

![triplet](assets/triplet.drawio.svg)

Classes, properties and relations may be can be instantiated zero, once or multiple times. All instances of triplets together form the **knowledge graph**.

The shape of the knowledge graph depends on its triplet instances. Shapes can also be described formally and can be enriched with constraints. This can be used to find matching instances of the described shape (sub-graphs). In federated graphs, this can also be used to describe the shape of queryable sub-graphs outside the current scope (graph assets that are hosted at other EDC connectors than the current one).

## ONTOLOGIES AND TAXONOMIES

### ONTOLOGIES BASICS

The description of ontologies is done also by triplets (subject --predicate-> object), where subject and object are nodes and the predicate represents a unidirectional edge between them.

For a specification of the preferred modelling language, see [RDF 1.1 Turtle on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/turtle/).

Object types and relations are formally defined within ontologies, e.g.:

![triplet-example-partof](assets/triplet-example-partof.drawio.svg)

Subjects and objects may not be real objects but conceptual ones:

![triplet-example-hasargument](assets/triplet-example-hasargument.drawio.svg)

### CATENA-X ONTOLOGIES AND TAXONOMIES

There is already a set of ontologies and a taxonomy defined for the [Catena-X namespace on w3.org ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/):

- [core ontology ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/next/ontology/core)
- [common core ontology ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/next/ontology/common)
- [reliability ontology ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/next/ontology/reliability)
- [vehicle ontology ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/next/ontology/vehicle)

For the Behaviour Twin use case, the following ontology is defined:

- [behaviour ontology ![(external link)](../assets/external-link.svg)](https://w3id.org/catenax/next/ontology/behaviour)

### OWN ONTOLOGIES FOR TEST OF NEW OR EXTENSION OF EXISTING USE CASES

Private or extended ontologies (e.g. for only two partners) can be added to the Knowledge Agent configuration. There are two options:

- Defining a public accessible storage location where all participating partners can refer to.
- Mounting the ontology file into the Knowledge Agent container.

In each case, the configuration is static and must be done within the deployment scripts of the Knowledge Agent. For the changes to take effect, the Knowledge Agent must be restarted.

## DATA SOVEREIGNTY THROUGH BINDINGS

Data and service bindings bring an extra layer of security. Only mapped data and services can be accessed. They are offered through graph assets. These assets are bound to policies which on the other hand are bound to a framework agreement. Using graph assets, all communication is handled by EDC connectors and this ensures data sovereignty.

Bindings are configured statically. For the changes of the binding configurations to take effect, the related Binding Agent must be restarted. New graph assets can be added dynamically.

## TEST

Currently, there is no ready-to-use test environment. If you want to test your use case,
you still have options:

- Have a look at the [Agents KIT](../../knowledge-agents/adoption-view/intro), maybe there is already something regarding testing.
- Search at your operating company's website or contact them.
- Build up your own test environment. As a basis, you could use the official Tractus-X [MXD test environment on GitHub ![(external link)](../assets/external-link.svg)](https://github.com/eclipse-tractusx/tutorial-resources). Unfortunately, the Knowledge Agent components are not included into the MXD deployment scripts until release of the current KIT version.
