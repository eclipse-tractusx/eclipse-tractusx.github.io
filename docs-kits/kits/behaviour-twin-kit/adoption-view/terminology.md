---
id: terminology
title: Terminology
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

## DEDICATED BEHAVIOUR TWIN USE CASES

For specific terminology in dedicated Behaviour Twin use cases, see the terminology sections within the [use case section](../use-cases/overview).

## GENERAL

|Term|Description|Comment|
|---|---|---|
|Catena-X|Association, dataspace, automotive network|Open and interoperable data ecosystem of the automotive sector, see [https://catena-x.net/ ![(external link)](../assets/external-link.svg)](https://catena-x.net/)|
|Tractus-X|Official open-source project in the Catena-X data space|see [https://eclipse-tractusx.github.io/ ![(external link)](../assets/external-link.svg)](https://eclipse-tractusx.github.io/)|
|EDC|Eclipse Dataspace Components|Set of components like the Eclipse Dataspace Connector and it's extensions|
|Tractus-X EDC|Tractus-X Eclipse Dataspace Components|EDC, adapted and released for the Tractus-X project|
|Connector|Dataspace Connector|Tractus-X Eclipse Dataspace Connector or compatible connector implementation|
|Connector Address|Public API https-address|Address of the connectors control plane for communication with other connectors|
|Data Space|All connected services and data||
|Operating Company|A company that provides central services for the dataspace||
|BPN|Business Partner Number|Identifies a legal entity (participant in the data space)|
|Use Case|Delimited business logic and associated framework||
|Usage Data|Collected data while a vehicle/component is used|Describes, for example, how a component was used until now|
|Data Owner|The actual owner of personal data|E.g. the driver of a vehicle, but usually not the data provider|
|Framework Agreement|Common contract of use case participants||
|Policy|Usage policy for data or services|Refers to a Framework Agreement|
|Contract|Automatically negotiated contract for accessing data or services||
|Consumer|Queries a result from a data source or a service|The one who initiates the query. May process data further in his realm.|
|Provider|Provides data or a service||
|Data Provider|Provides own data from own data sources|likely an OEM|
|Service|Service to process data|E.g. calculation or simulation based on internal models|
|Service Provider|Provides a calculation service to process result data from input data|Likely a supplier of a part or component|
|Delegator|Delegates data or service requests|Likely a supplier of a component that is assembled of subcomponents which are providing calculation services|
|Semantic Versioning|Versioning scheme for software|Using meaningful version numbers in the format `[0-9]+.[0-9]+.[0-9]+(-SNAPSHOT)?` (e.g. `1.3.12`, )|
|Component Provider|Manufacturer of a component|Provides services or delegates data|
|VIN|Vehicle Identification Number|A standardized number to identify a vehicle|

## KNOWLEDGE AGENT

|Term|Description|Comment|
|---|---|---|
|Knowledge Graph|A semantic graph, representing real data|Describes relation between subjects and objects|
|Knowledge Agent|Components to operate on knowledge graphs across the dataspace|see [Agents KIT](../../knowledge-agents/adoption-view/intro)|
|Matchmaking Agent|Resolves federated sub-graphs for the Knowledge Agent|Fits requested sub-graphs with existing graph assets|
|Binding Agent|A component that binds instances to the knowledge graph|Binds instances of data or services to the knowledge graph|
|Provisioning Agent|Binding agent for data bindings|Binds instances of data to the knowledge graph|
|Remoting Agent|Binding agent for service bindings|Binds instances of services to the knowledge graph|
|Semantic Web|Concept of a machine-readable world wide web|(Web 3.0)|
|Asset|A requestable data set|A formal described data set, that can be requested via EDC|
|Graph Asset|A special type of asset that describes a graph|The graph description is written in SHACL|
|Shapes Graph|A separate graph that defines the rules and constraints for the data. It acts like a template describing the expected structure and properties.||
|Ontology|Semantic model for concepts and in a specific domain|Defines classes, properties and their relations|
|Skill|The overarching logic behind a use case|E.g. how to find and link data or calculation services to produce the desired result|
|Skill Provider|Provider of the use case logic (skill)|Hosts a skill that can be executed|

## TECHNOLOGIES

|Term|Description|Comment|
|---|---|---|
|Catena-X Dataspace Architecture|Architecture defined by Catena-X|see [Tractus-X KITs](https://eclipse-tractusx.github.io/Kits)|
|SPARQL|SPARQL 1.1 Query Language|see [SPARQL on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/sparql11-query/)|
|RDF|Resource Description Framework|see [RDF on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/RDF/)|
|ttl (Turtle)|RDF 1.1 Turtle|see [Turtle on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/turtle/)|
|OWL|Web Ontology Language|see [OWL on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/OWL/)|
|SHACL|Shapes Constraint Language|see [SHACL on w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/TR/shacl/)|
|W3C|World Wide Web Consortium|see [w3.org ![(external link)](../assets/external-link.svg)](https://www.w3.org/)|
