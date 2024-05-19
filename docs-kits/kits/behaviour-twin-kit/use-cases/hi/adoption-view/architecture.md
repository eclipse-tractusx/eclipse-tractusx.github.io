---
id: architecture
title: Architecture
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

## BASIC ARCHITECTURE

### OVERVIEW

A data provider (likely an OEM; can, but does not have to, share the data) wants to calculate health indicators of its component (e.g. a vehicle). It may use a Dashboard or some other App to consume the results. Usage data is collected continuously with the consent of the data owners. The usage history and all dependent components that can provide health values are known on the data provider's side. The data provider itself doesn't even have to know which components can provide health services/values. Its registered suppliers provide that information in their catalogs which are synchronized periodically. The data provider only must bind the usage data to the knowledge graph.

This approach is not limited only to OEMs and vehicles. Every system that provides usage data can utilize this approach, like tools/machines, production lines, building facilities, vending machines, computers, roads and so on.

It is also possible that a third party is consuming the HI values. In this case, it must have access to the data provider's and the calculation provider's graph assets. The skill itself would be the same.

### ROLES

Each participant in the Health Indicator (HI) Behaviour Twin use case applies to one or more of the following roles:

- **HI consumer** (result requester)
- **skill provider** (OEM, provider of the use case logic)
- **data provider** (OEM, provider of usage data)
- **HI service provider** (a component supplier, e.g. a gearbox supplier)

One common case is that the data provider is also the HI consumer and skill provider. Calculation services may also be located at the data provider.

## DETAILED ARCHITECTURE

### BUSINESS PROCESS

*For better readability will be on this page from now on assuming that the **HI consumer** which is also the **data provider** is an **OEM**.*

The skill is initially executed at the OEM. There it may be registered as an asset or used ad hoc. If the consumer is also the skill provider, it is his free choice which way to go. In the following description, the skill is registered.

![business-process](assets/business-process.drawio.svg)

0. **Register skill asset: (0.1)** <br/> The skill is registered as an asset at the OEM's EDC connector. <br />
   **sync federated catalog: (0.2)** <br/> The federated catalogs are synchronized periodically. As a result, the OEM can resolve HI calculation function assets that are located at the supplier.

1. **Invoke HI skill:** <br/> The consumer invokes the skill by calling the agents API at its own EDC connector (ad hoc or as predefined asset). There are three parameters that must be set:
   - **vehicle ID** (VIN)
   - **component type** (type of component for which the HI values should be calculated)
   - **result type** (For HI, the result type may always be `HealthIndicationResult`. Note: The exact same skill could be used to calculate Remaining useful Life values by using result type `RemainingUsefulLifeResult`.)

2. **Resolve HI calculation function assets by result type HealthIndicatorResut:** <br/> The Knowledge Agent resolves all calculation functions by the given result type `HealthIndicationResult`. These can be located at different suppliers and is independent of the vehicle ID and the component of interest.

3. **Resolve load data assets of required type for arguments of resolved HI calculation functions:** <br/> The Knowledge Agent resolves all usage data assets (for load data), that are required as arguments by the resolved calculation functions, by load data type.

4. **Resolve vehicle part of interest, supplier and actual HI calculation function for this part:** <br/> At the data provider, the Knowledge Agent resolves the vehicle, its component of interest, the related supplier and the actual usage data.

5. **Fetch load data:** <br/> The actual usage data (parameter for the HI calculation functions) are fetched from the data provider's bound data source. They are translated into graph representation by a provisioning agent (data binding agent).

6. **Transfer load data and deploy sub-skill:** <br/> The fetched data and a sub-skill (logic for calling the HI calculation service) are transferred to the HI calculation service provider's Knowledge Agent via EDC connectors.

7. **Call service and fetch HI result:** <br/> The HI calculation service (calculation function) is called. The data (parameters) are translated into the format the service requires. This is automatically done by an remoting agent (service binding agent), which is statically configured by service bindings. The result of the service then is translated back into graph representation by the remoting agent.

8. **Return HI result:** <br/> The result is transferred to the OEM via EDC connectors.

To have a common understanding of how to interpret and translate elements in the graph, common ontologies and taxonomies must be used. These are also needed for the interpretation of skills and sub-skills as there is e.g. inheritance in ontologies which must be known by the Knowledge Agent to resolve relations.

### BUILDING BLOCK COMPONENTS

#### USE-CASE-SPECIFIC COMPONENTS

|Subsystem|Description|
|---------|-----------|
|HI Dashboard|This component is the app that is hosted at the *consumer* and provides the end user interface.|
|Usage Data|A data source at the *data provider* that provides usage data that are required for HI calculation services. <BR/> It can be accessed by the Knowledge Agent via data bindings.|
|HI Service|A calculation service at the *Supplier*. It accepts a load spectrum as parameter, and calculates the health indicator result values and returns them.|

#### KNOWLEDGE AGENT COMPONENTS AND CATENA-X CORE SERVICES

For non-use-case-specific components, refer to the [general Architecture section](../../../adoption-view/architecture#building-block-components) in the general adoption view.
