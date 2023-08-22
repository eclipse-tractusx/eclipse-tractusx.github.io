---
id: Adoption View Data Chain Kit
title: Adoption View
description: 'Data Chain Kit'
sidebar_position: 1
---

![Datachain kit banner](@site/static/img/DataChainKitIcon.png)

### Data Chain Kit

## Vision & Mission

### Vision

DataChainKit brings valuable data chain information to your use-cases and services through connected data that can help Business Owner and Catena-X participants to be up to date and prepared. It's easy to use the DataChainKit with an Open Source Software package, which can easily deployed via HELM or docker-compose. The DataChainKit enables to apply business logic along a distributed data chains, for example aggregation of certificates along the value chain. Also ad-hoc provisioning of continuous data chains across company boundaries for empowerment of use cases Circular Economy, Traceability, Quality and the European supply chain act.

(#GreenIT#DataSovereignty#Interoperability#ConnectedData)

### Mission

The Data Chain KIT provides reference implementation as functional federated component to handle ad-hoc data chains across n-tiers within the Catena-X network. To realize these data chains, the Data Chain Kit relies on data models of the Traceability use case and provides the federated data chains to customers or applications. Furthermore, the target picture of the IRS includes the enablement of new business areas by means of data chains along the value chain in the automotive industry.

All described specifications in the KIT are based on Catena-X standards and refer to other Catena-X KITs like the Connector KIT (EDC) and Digital Twin Registry to ensure interoperability and data sovereignty according to IDSA and Gaia-X principles.

### Customer Journey

With the Data Chain KIT, we support the Catena-X customer journey for our adopters and solutions providers.

There are few steps for your Customer Journey:
* Step 1: Inform yourself & take the decision to become part
* Step 2: Connect your company & teams to Catena-X. 
* Step 3: Boost data readiness and governance
* Step 4: Adopt a data driven business process and create instant value
* Step 5: Utilize the full power of collaboration in your business team

## Business Value

### IRS Iterative

* Application and Service provider can reduce integrate or migrate due to one API specification
* The IRS Iterative API enables an easy interface for complex network tasks
* Potential to scale and optimize network traffic
* The IRS Iterative API is providing one Endpoint to access and collect widely distributed data
* The Data Chain Kit enables interoperability for Data Chains along the value chain to extend

### IRS Recursive
* Application and Service provider can reduce integrate or migrate due to one API specification
* The IRS Recursive API enables an easy interface for complex network tasks
* The IRS Recursive API enables different use cases which collects insights over distributed data by not disclose the supply chain
* The solution enables interoperability with other solution along the value chain to extend 


## Use Case

## Tutorials

## Logic & Schema

### Building Block Architecture Overview

#### IRS Components

| Components                        | Description                                                                                                                                                                                                                                                                          |
|:----------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IRS                               | The IRS builds a digital representation of a product (digital twin) and the relationships of items the product consists of in a hierarchical structure. The result is an item graph in which each node represents a digital item of the product - this graph is called "Item Graph". |
| IRS API                           | The IRS API is the Interface over which the Data Consumer is communicating.                                                                                                                                                                                                          |
| IrsController                     | The IrsController provides a REST Interface for retrieving IRS processed data and job details of the current item graph retrieval process.                                                                                                                                           |
| IrsItemGraphQueryService          | The IrsItemGraphQueryService implements the REST Interface of the IrsController.                                                                                                                                                                                                     |
| JobOrchestrator                   | The JobOrchestrator is a component which manages (start, end, cancel, resume) the jobs which execute the item graph retrieval process.                                                                                                                                               |
| RecursiveJobHandler               | The RecursiveJobHandler handles the job execution recursively until a given abort criteria is reached or the complete item graph is build.                                                                                                                                           |
| TransferProcessManager            | The TransferProcessManager handles the outgoing requests to the various data services.                                                                                                                                                                                               |
| Policy Store                      | The Policy Store provides an Interface for getting, adding and deleting accepted IRS EDC policies. These policies will be used to validate EDC contract offers.                                                                                                                      |
| BlobStore                         | The BlobStore is the database where the relationships and tombstones are stored for a requested item.                                                                                                                                                                                |
| JobStore                          | The JobStore is the database where the jobs with the information about the requested item are stored.                                                                                                                                                                                |
| Digital Twin Client               | The Digital Twin Client is the interface to the Digital Twin Registry. It provides an interface for the Asset Administration Shells.                                                                                                                                                 |
| Decentralized Digital Twin Client | In a decentralized network, the Digital Twin Client connects to the EDC which then proxies the requests to the digital twin registry on provider side.                                                                                                                               |
| EDC Client                        | The EDC Client is used to communicate with the EDC network, negotiate contracts and retrieve submodel data.                                                                                                                                                                          |

#### Catena-X Core Services

| Subsystem                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|:-----------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Digital Twin Registry              | The Digital Twin Registry acts as an address book for Digital Twins. Data Providers register their Digital Twins in the Digital Twin Registry. Data consumers query the Digital Twin Registry to find Digital Twins and interact with them further. A Digital Twin contains endpoint references to submodel endpoints. Calling a submodel endpoint returns data compliant to a semantic model. A semantic model describes the data that a Submodel endpoint returns. [Repository of the Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry). |
| Eclipse Dataspace Components (EDC) | The Connector of the Eclipse Dataspace Components provides a framework for sovereign, inter-organizational data exchange. It will implement the International Data Spaces standard (IDS) as well as relevant protocols associated with GAIA-X. The connector is designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. [Repository of the Catena-X specific EDC](https://github.com/eclipse-tractusx/tractusx-edc).                                                                                                       |
| Discovery Service                  | The EDC / dataspace discovery interface is a CX network public available endpoint which can get used to retrieve EDC endpoints and the related BPNs, as well as search for endpoints via the BPN.                                                                                                                                                                                                                                                                                                                                                                               |
| Portal                             | The Catena-X Portal and Marketplace is the heart of Catena-X and the entry point for all activities in the automotive network/value chain. Every user of the automotive value chain, no matter if it is a consumer, app provider, IT administrator or IT support will connect via the portal to the value bringing services. The whole eco-system on the automotive value chain is connected at one place.                                                                                                                                                                      |                                                                                                                                                                                                        |
| EDC Discovery Finder               | The EDC / dataspace discovery interface is a CX network public available endpoint which can get used to retrieve edc endpoints and the related BPNs, as well as search for endpoints via the BPN                                                                                                                                                                                                                                                                                                                                                                                |                                         

## Business Process

The DataChainKit acts as a middleware between consumers and manufacturers. This section describes the Business Process of DataChainKit. Who are its users, and with which other systems does it interact with.

### Consumer

The DataChainKit by IRS API is the essential component of the business app Trace-X FOSS to be able to build data chains in upwards and downwards direction for BOM lifecycles asBuilt and asPlanned. 
The DataChainKit by IRS API is being consumed by the dismantler dashboard and other parties which are part of the Catena-X network. They need to provide valid credentials issued by the Catena-X Portal/IdP. Additionally, they must provide a base global asset identifier to retrieve information for as well as configuration details for the view on that information.

### Catena-X network

The IRS retrieves data from the Catena-X network (using the necessary infrastructure, see Technical Context), aggregates it and provides it back to the consumers. This connection is mandatory. If the Catena-X services are unavailable, the IRS cannot perform any work.

As of now, the IRS uses it technical user credentials provided by the portal to gather the required data. This might be changed to use the consumer credentials in the future.

## Standards

Our relevant standards can be downloaded from the official [Catena-X Standard Library](https://catena-x.net/de/standard-library)

- [CX - 0005 Item Relationship Service API](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0005-ItemRelationshipServiceApi-v1.1.1.pdf)
- [CX - 0045 Aspect Model Template Data Chain](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0045-AspectModelDataChainTemplate-v1.1.1.pdf)


## Why Data Chain Kit

What is in for you to use the Data Chain Kit. On what is it built on.

![Why use Datachain Kit](@site/static/img/why_data_chain-minified.png)

## IRS Iterative

The IRS iterative iterates through the different digital twin aspects, which are representing a relationship. For Release 3.2 this is the SingleLevelBOMasBuilt aspect, which connects serialized parts. This service can access the digital twins for which an EDC policy and a data contract exists. In this case the consumer needs a contract which each participant of the data chain.

![IRS iterative diagram](@site/static/img/irs-minified.svg)

The following general conditions apply:
-access control through policies and contracts is done by the EDC
-direct data exchange between supply-chain partners
-Catena-X partners of the accessible value chain are known to the data-consumer

## IRS Recursive

The IRS recursive works different as the IRS iterative. It does not consume  the digital twins of the partners in the supply chain in a direct way, it triggers the IRS of a partner to start a IRS job to retrieve data of the sub-partners. This is done to keep the structure below  intransparent to the value chain above, even though it is still possible to aggregate results; pass information along the value chain.![img.png](img.png)

The following general conditions apply:

- The IRS recursive is for use-cases, which want to apply business logic with data along the value chain. For example, to summarize, or check for existence of values or certificates.
- Each participant has the possibility to check their values, before passing them to next in line 
- access control through policies and contracts is done by the EDC 
- direct data exchange between supply-chain partners 
- business logic is being applied with an extension concept