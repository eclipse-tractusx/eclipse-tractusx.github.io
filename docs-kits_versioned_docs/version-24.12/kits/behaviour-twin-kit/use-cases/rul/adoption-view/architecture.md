---
id: architecture
title: Architecture
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT -- Remaining useful Life banner](@site/static/img/kit-icons/behaviour-twin-rul-kit-icon-mini.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT -- Remaining useful Life
  </div>
</div>

## BASIC ARCHITECTURE

### OVERVIEW

An external consumer wants to know the remaining useful life of its component (e.g. a vehicle). It uses a RuL Consuming App (e.g. with a web interface) for this. At the data provider (likely an OEM), usage data is collected continuously with the consent and on behalf of the consumer. The usage history and all dependent components that can provide RuL values are known on the data provider's side. The data provider itself doesn't even have to know which components can provide RuL services/values. Its registed suppliers provide that information in their catalogs which are synchronized periodically. The data provider only must bind the usage data to the knowledge graph.

This approach is not limited only to OEMs and vehicles. Any system that provides usage data can utilize this approach, like tools/machines, production lines, building facilities, vending machines, computers, roads and so on.

### ROLES

Each participant in the Remaining useful Life (RuL) Behaviour Twin use case applies to one or more of the following roles:

- **RuL consumer** (result requester)
- **skill provider** (which is also the RuL consumer, provider of the use case logic)
- **data provider** (OEM, provider of usage data)
- **RuL service provider** (a component supplier, e.g. for gearboxes)

One of the special cases would be that the data provider is also the RuL consumer and/or RuL service provider and/or skill provider.

## DETAILED ARCHITECTURE

### BUSINESS PROCESS

*For better readability, it is assumed on this page that the **data provider** is always an **OEM**/vehicle manufacturer.*

The first addressee of a RuL skill must be the OEM since it has access to its suppliers who can provide RuL values.

![business-process](assets/business-process.drawio.svg)

0. **sync federated catalog:** <br/> The federated catalogs are synchronized periodically. As a result, the OEM can resolve RuL prognosis function assets that are located at the supplier.

1. **Invoke RuL skill:** <br/> The consumer invokes the skill by calling the agents API at its own EDC connector (ad hoc or as predefined asset). The OEM's EDC connector address must be known. Resolving this address is up to the consumer. The vehicle ID (VIN) is set as parameter for the skill.

2. **Delegate sub-skill:** <br/> The skill is delegated to the OEM via EDC connectors.

3. **Resolve vehicle part of interest:** <br/> The Knowledge Agent resolves the vehicle part for which the RuL value should be calculated.

4. **Resolve load data assets:** <br/> The Knowledge Agent resolves the usage data asset for the vehicle part of interest.

5. **Resolve RuL prognosis function assets:** <br/> The Knowledge Agent resolves all prognosis function assets from the federated catalog with type `RemainingUsefulLife` and the correct input type of load spectra. This type is infered by the usage data asset.

6. **Fetch load data:** <br/> The data (parameters for the RuL prognosis functions) are fetched from the data provider's bound data source. They are translated into graph representation by a provisioning agent (data binding agent).

7. **Transfer load data and deploy sub-skill:** <br/> The fetched data and a sub-skill (logic for calling the RuL calculation service) are transferred to the RuL calculation service provider's Knowledge Agent via EDC connectors.

8. **Call service and fetch RuL result:** <br/> The RuL calculation service (prognosis function) is called. The data (parameters) are translated into the format the service requires. This is automatically done by an remoting agent (service binding agent), which is statically configured by service bindings. The result of the service then is translated back into graph representation by the remoting agent.

9. **Return RuL result:** <br/> The result is transferred to the OEM via EDC connectors.

10. **Delegate RuL result:** <br/> The result is delegated to the consumer via EDC connectors.

To have a common understanding of how to interpret and translate elements in the graph, common ontologies and taxonomies must be used. These are also needed for the interpretation of skills and sub-skills as there is e.g. inheritance in ontologies which must be known by the Knowledge Agent to resolve relations.

### BUILDING BLOCK COMPONENTS

#### USE-CASE-SPECIFIC COMPONENTS

|Subsystem|Description|
|---------|-----------|
|RuL Consuming App|This component is the app that is hosted at the *consumer* and provides the end user interface.|
|Usage Data|A data source at the *data provider* that provides usage data that are required for RuL prognosis services. <BR/> It can be accessed by the Knowledge Agent via data bindings.|
|RuL Service|A calculation service at the *Supplier*. It accepts load spectra as parameters, and calculates the Remaining useful Life result values and returns them.|

#### KNOWLEDGE AGENT COMPONENTS AND CATENA-X CORE SERVICES

For non-use-case-specific components, refer to the [general Architecture section](../../../adoption-view/architecture#building-block-components) in the general adoption view.
