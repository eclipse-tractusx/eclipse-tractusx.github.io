---
sidebar_position: 2
title: Target Audience
---

This document describes the target audience of this Kit.

For more information see

* Our [Introduction](intro) manifest
* Our [Frequently Asked Question](faq) list
* The [CX-0084](https://github.com/catenax-ng/product-catena-x-standardization/blob/CX-0084-FederatedQueriesInDataSpaces/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

We distinguish between Dataspace Participants and other parties (who support the Dataspace Participants).

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

## Dataspace Participants

The following stakeholders should [deploy](../operation-view/deployment) modules/artifacts of the Agent KIT.
In particular, each Dataspace Participant needs an [Agent-Enabled Connector](../operation-view/agent_edc).

### Consumer

Any party who wants to use data and logic using Agent Technology (for example by employing Agent-Enabled Applications or Services), such as a Recycling Company or a Fleet Manager

### Provider

We distinguish Providers whether they want to publish data or logic using Agent Technology

#### Data Provider

Any party who provides data (for example by a backend database or other Agent-enabled Applications or Services), for example an Automotive OEM (original equipment manufacturer)

#### Function Provider

Any party who provides proprietary functions (for example by a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint or other Agent-enabled Applications or Services), for example a Tier1 Sensor Device Supplier

#### Skill (=Compute) Provider

Any party who provides compute resources and/or procedural logic (for example by a server or other Agent-enabled Applications or Services), for example a Recycling Software Specialist

#### Core Service Provider

Any party offering ontology models (semantic/ontology hub) or federated catalogues, for example an Operating Company

## Additional Stakeholders

The following stakeholders should [interface](../development-view/architecture) modules of the Agent KIT.

### Business Developer

Any party who publishes an Application, Standard or KIT based on Agent Technology on behalf of a Dataspace Participant (e.g. a Fleet Monitor, an Incident Reporting Solution, a Telematics KIT)

### Enablement Service Developer

Any party who offers ready-made artifacts, packages and managed services assisting Dataspace Participants/Applications to process data using Agent technology (e.g. a Graph Database, a Virtual Graph Binding Engine, an EDC Package)
