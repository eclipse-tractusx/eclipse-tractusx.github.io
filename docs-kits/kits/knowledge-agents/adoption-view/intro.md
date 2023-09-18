---
sidebar_position: 1
title: Introduction
---

This document describes the foundations of this KIT (=Keep It Together).

For inquiries please contact [Tom Buchert](mailto:tom.buchert@t-systems.com)

For more information see

* Our [Target Audience](audience) description
* A [Frequently Asked Question](faq) list
* The [CX-0084](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

## Basic Technology

### Dataspace

[Data Spaces](https://en.wikipedia.org/wiki/Dataspaces) (short: dataspaces) can be seen as one of the most promising technologies for sovereign data exchange between companies or company divisions.
They foster new use cases and collaboration scenarios which were not possible before.
Furthermore, they can be used to streamline and digitize existing processes for more efficient data handling.

### GAIA-X

[Gaia-X](https://gaia-x.eu/what-is-gaia-x/deliverables/data-spaces/) defines a reference architecture for dataspaces, with focus on (1) interoperability and (2) portability of data and service, (3) sovereignty over data, and (4) security and trust to achieve a decentralized, federated and open ecosystem.

### Eclipse Tractus-X

[![Basic Dataspace Technology](/img/knowledge-agents/dataspace_small.png)](/img/knowledge-agents/dataspace.png)

[Eclipse Tractus-X](https://eclipse-tractusx.github.io/) is the reference implementation of that concept that is brought forward by the [Catena-X](http://catena-x.net) association.
It relies on a Peer-to-Peer networking approach where each Business Partner (Consumer or Provider) has a [Connector](https://github.com/eclipse-edc/Connector) which can securely transfer data in the form of files and service calls (payloads) according to mutual contracts. File meta-data, their intrinsic format and the download protocol are standardized using a [Digital Twin Standard](https://industrialdigitaltwin.org/).

For more information, see the [Connector Kit](https://eclipse-tractusx.github.io/docs/category/connector-kit)

## Federated Operations through Agents

### Agent

In some cases the standardized transfer of data may already be enough to create value (e.g. exchange precomputed product carbon footprints across a supply chain).

However, other use cases such as the joint behavioural prediction of complex machines which are yet to be developed by a team of collaborating companies, require more advanced solutions.
These are solutions in which data and information is federated into a multi-directional semantic context.

Simply put, an [Agent](https://en.wikipedia.org/wiki/Software_agent) is an extension/companion to the Connector that allows to transfer Business Logic instead of raw data payloads.

[![Agent-Oriented Dataspace](/img/knowledge-agents/dataspace_agent_small.png)](/img/knowledge-agents/dataspace_agent.png)

### Skill

Using the agent, a Consumer can invoke a [Skill](https://en.wikipedia.org/wiki/Amazon_Alexa) (a kind of Stored Procedure in a standardized Scripting/Query Language) which is then executed
distributedly in the Dataspace.

### Binding and Delegation

At the Provider side, the Agent [binds](https://en.wikipedia.org/wiki/Data_binding) to data lakehouses and other backend systems by translating the Skill into native SQL queries or REST API calls.
Agents may [delegate](https://en.wikipedia.org/wiki/Delegation_(computing)) a part of their work (sub-skills) to other Agents/Business Partners based on data ownership and using recursive dataspace contracts/policies.

### Batch Extraction of Knowledge

A Skill typically simultaneously computes over large [batches](https://en.wikipedia.org/wiki/Batch_processing) of entities (here: digital twins) and extracts high-quality but low-bandwidth result payloads (reports, lists, aggregations; in general: [Knowledge](https://en.wikipedia.org/wiki/Knowledge_extraction)).

### Federated Graph

We expect that the raw data for extracting the knowledge from using Skills is organized in a high-degree normal form called a [graph](https://en.wikipedia.org/wiki/Knowledge_graph).

Knowledge Graphs can be regarded as sets of (Subject-Node, Predicate-Edge, Object-Node) triples.

Since the raw data is never copied but rather traversed by the Skill Bindings, the Dataspace hence becomes a [federated](https://en.wikipedia.org/wiki/Federated_database_system) or virtual knowledge graph.

## Catena-X Standard and KITs

The concrete choices for how the data graphs are to be constructed (using the [Resource Description Framework](https://www.w3.org/RDF/)), how Skills are to be interpreted (using the [SPARQL](https://www.w3.org/TR/sparql11-query/) language) and which vocabulary should be applied by both approaches (using the [Web Ontology Language](https://www.w3.org/OWL/) (OWL)) is subject of an upcoming [Catena-X standard](CX-0084-Federated_Queries_in_Data_Spaces_v1.0.0).

This Agent KIT is a FOSS (Free and Open-Source Software) reference implementation of that standard following Eclipse guidelines.

If you employ any of our artifacts and/or follow our blueprints, you will be eligible for compliance to a respective Catena-X release. Appropriate assessment criteria and methods have been established as a part of the Agent standard.

The Agents KIT is depending on the [Connector Kit](https://eclipse-tractusx.github.io/docs/category/connector-kit)
This Agents KIT is the basis for other, use-case specific Agent-enabled KITs, services and applications.
