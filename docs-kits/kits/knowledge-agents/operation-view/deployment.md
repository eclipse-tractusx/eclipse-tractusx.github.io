---
sidebar_position: 1
title: Deployment
---

This document describes the various deployment options for modules of the Agents Kit depending on the role that the respective tenant/business partner has.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [(Data/Function) Provider Deployment](provider) description
* A [Data Sovereignity & Graph Policy](policy) discussion

## Motivation & Deployment Roles

Knowledge Agents is a federated technology, so there is no central component setup to take into account.
Instead, the Semantic Dataspace is formed by the individual business partners extending/configuring their
connectors and enabling their backend systems and/or datalakes. The deployment depends hereby on the
role that the business partner takes. The roles are described in more detail in our [Adoption](../adoption-view/intro) guideline.

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

## Role: As A Consumer

As a consumer, you just need to:

* enable your [dataspace connector](agent_edc) to initiate/delegate the required Agent protocols (here: SparQL-over-Http).
* (optionally) mount your connector as a remote repository into your enterprise graph infrastructure.

## Role: As A Skill Provider

As a skill provider, you need to

* enable your [dataspace connector](agent_edc)  to transfer/delegate the required Agent protocols.
* (optionally) employ multiple data planes in case you want to expose hosted skills (skill assets that operate as stored procedures
and which require computational resources at the provider side) instead of distributed skills (skill assets that are offered as query texts/files and which are executed at the consumer side).

## Role: As A (Data/Function) Provider

As a provider, you need to

* enable your [dataspace connector](agent_edc) to receive/internalize the required Agent protocols.

Depending on the kind of provisioning, you will setup additional internal "agents" (endpoints).

### Sub-Role: As A Data Provider

As a data provider, you want to

* [bind](provider) your data sources to knowledge graphs following the Catena-X ontology. Therefore, a provisioning agent
should be setup on top of a data virtualization/database layer.

### Sub-Role: As A Function Provider

As a function provider, you want to

* [bind](provider) your API to a special knowledge graph structure. Therefore, a remoting agent should be setup.
