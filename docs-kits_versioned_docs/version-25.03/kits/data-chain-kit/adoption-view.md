---
id: adoption-view
title: Adoption View
description: 'Data Chain Kit'
sidebar_position: 1
---

![Datachain kit banner](@site/static/img/kits/data-chain/data-chain-kit-logo.svg)

### Data Chain Kit

## Vision & Mission

### Vision

DataChainKit brings valuable data chain information to your use-cases and services through connected data that can help
Business Owner and Catena-X participants to be up-to-date and prepared. It's easy to use the DataChainKit with an Open
Source Software package, which can easily deployed via HELM or docker-compose. The DataChainKit enables to apply
business logic along a distributed data chains, for example aggregation of certificates along the value chain. Also,
ad-hoc provisioning of continuous data chains across company boundaries for empowerment of use cases Circular Economy,
Traceability, Quality and the European supply chain act.

(#GreenIT#DataSovereignty#Interoperability#ConnectedData)

### Mission

The Data Chain KIT provides a reference implementation as functional federated component to handle ad-hoc data chains
across n-tiers within the Catena-X network. To realize these data chains, the Data Chain Kit relies on data models of
the Traceability use case and provides the federated data chains to customers or applications. Furthermore, the target
picture of the IRS includes the enablement of new business areas by means of data chains along the value chain in the
automotive industry.

All described specifications in the KIT are based on Catena-X standards and refer to other Catena-X KITs like the
Connector KIT (EDC) and Digital Twin Registry to ensure interoperability and data sovereignty according to IDSA and
Gaia-X principles.

### Customer Journey

With the Data Chain KIT, we support the Catena-X customer journey for our adopters and solutions providers.

There are few steps for your Customer Journey:

* Step 1: Inform yourself & take the decision to become part
* Step 2: Connect your company & teams to Catena-X.
* Step 3: Boost data readiness and governance
* Step 4: Adopt a data driven business process and create instant value
* Step 5: Utilize the full power of collaboration in your business team

<!-- !Mandatory! -->

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
* The IRS Recursive API enables different use cases which collect insights over distributed data by not disclosing the
  supply chain
* The solution enables interoperability with other solutions along the value chain to extend

<!-- !Mandatory! -->

## Use Case

### Environmental Social Responsibility (ESR)

#### Use Case for achieving compliance for Environmental Social Responsibility (ESR) for a component in the supply chain (multi-tier)

In the use case, it was assumed that a company in the supply chain is considered "compliant" if that company can show
the ISO 14001 certificate. Presenting means that either the company itself provides it as a data provider or deposits it
in a certificate repository with a service provider.

The benefit of the solution is to obtain an automated overview of the supply chain's compliance and to be able to check
it again and again on a cyclical basis. The companies in the supply chain are not disclosed, which follows the Catena-X
specifications.

The decentralized implementation at Catena-X "traverses" from the OEM to the direct supplier and from the direct
supplier to its next supplier and thus through the supply chain for a specific component. Each partner determines its
direct supplier automatically via the parts list stored by it in Catena-X's Item Relationship Service (IRS).

Aggregated information on the compliance of the upstream suppliers is returned to the OEM via each stage of the supply
chain. From this, the OEM can finally read how many companies are compliant and how many are non-compliant in its supply
chain for the component.

The names of the suppliers further down the supply chain are not disclosed to follow the Catena-X data sovereignty
principle one-up-one-down, but each intermediate level sees which of the direct suppliers are non-compliant and can act,
so that perspectively the whole supply chain is assessed as compliant.

### Environmental and Social Standards (ESS) Top-Down

With the entry into force of the German Supply Chain Due Diligence Act as from January 1st, 2023, German companies are
obliged to implement the corresponding requirements of this law. In addition, the following European directives on this
subject have also been adopted: EU regulation 2018/858. This regulation is legally binding to all EU member states.

This use-case facilitates the [IRS Recursive](#irs-recursive-1) approach and enables data providers to provide the BoM
as planned aspect models via the Catena-X defined solution
stack (i.e. EDC). The BoM as planned aspect models consists of three aspect models:

* SingleLevelBomAsPlanned - The single-level bill of material (BoM) represents one sub-level of an assembly and does not
  include any lower-level subassemblies. In the As-Planned lifecycle state all variants are covered ("120% BoM"). If
  multiple versions of child parts exist that can be assembled into the same parent part, all versions of the child part
  are included in the BoM. If there are multiple suppliers for the same child part, each supplier has an entry for their
  child part in the BoM.
* PartAsPlanned - representation of an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status in a
  specific version. This also includes information about the validityPeriod - the period of time during which the Part
  is offered by the manufacturer and can be purchased by customers.
* PartSiteInformationAsPlanned - Site related information for a given as planned item. A site is a delimited
  geographical area where a legal entity does business. In the "as planned" lifecycle context all potentially related
  sites are listed including all sites where e.g. production of this part (type) is planned.

#### Step 0: Process initiation

The process is initiated by an ESS incident, that is received by (or created within) the inquiring company. This ESS
incident acts as the root incident for the overall process. The incident contains a company name (incl. address) and a
valid BPN exists for that company. The BPN (a BPNL or BPNS) can be looked up in BPDM.

#### Step 1: Check direct suppliers

The inquiring company checks, if the company of the incident is a direct supplier of them. In order to perform this
check, the following data must be available in the inquiring company:

* Full list of direct suppliers
* Full list of parts supplied by those direct suppliers

In case the company of the incident is a direct supplier of the inquiring company, the process ends. In case the company
of the incident is not a direct supplier of the inquiring company, Step 2 is executed.

#### Step 2: Forward Incident

The incident is forwarded to all direct suppliers. Each direct supplier is sent a "personalized" request to evaluate, if
the inquiring company is impacted by the incident. The incident is enhanced with additional data by the inquiring
company:

* List of parts, that are supplied to the inquiring company by their direct supplier.

Each direct supplier executes Step 1.

#### Step 3: Gather Responses

The inquiring company collects the (asynchronous) responses. The response of each direct supplier may contain the
following results:

* YES → The company of the incident was found in the supply chain of the given list of parts. In this case, the result
  also contains the BPN of the direct supplier where the incident occurred alongside the number of hops (i.e. how many
  levels down the chain) to where the incident occurred
* NO → The company of the incident was not found in the supply chain of the given list of parts
* UNKNOWN → The query timed out or some other error occurred

In case at least one "YES" is received, the process step 3 ends

### Environmental and Social Standards (ESS) Bottom-Up

The occasion related traceability helps stakeholders to identify if a company that is detected for social or
environmental misbehavior is part of its own supply chain. In case of a hit, the inquiring company and the originator
company will be informed by the response, and therefore if the specific company has to start investigations.

Similar to the ESS use-case Top-Down, ESS Bottom-Up focuses on notifying customers about incidents in the supply chain.
The difference to Top-Down is that the Bottom-Up approach only investigates on one level and does not send any
notifications. To achieve this goal, IRS uses these aspect models:

* SingleLevelUsageAsPlanned - The aspect provides the information in which parent part(s)/product(s) the given item is
  assembled in. This could be a 1:1 relationship in terms of e.g. a brake component or 1:n for e.g. coatings. The given
  item as well as the parent item must refer to an object from as-planned lifecycle phase. If multiple versions of
  parent parts exist that the child part can be assembled into, all versions of the parent part are included in the
  usage list.
* PartAsPlanned - representation of an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status in a
  specific version. This also includes information about the validityPeriod - the period of time during which the Part
  is offered by the manufacturer and can be purchased by customers.
* PartSiteInformationAsPlanned - Site related information for a given "as planned" item. A site is a delimited
  geographical area where a legal entity does business. In the "as planned" lifecycle context all potentially related
  sites are listed including all sites where e.g. production of this part (type) is planned.

For the originator company, IRS validates whether the requested BPNS is part of their PartSiteInformationAsPlanned and
whether the provided validityTimestamp is within the validityPeriod of PartAsPlanned. If this is the case, IRS will then
collect all the BPNLs of the direct customer and return the affected parts in the following structure for an incident
company to handle further incident management:

```json
{
  "customers": [
    {
      "businessPartnerNumberLegalEntity": "<bpnl>",
      "customerParts": [
        {
          "globalAssetId": "<globalAssetId>",
          "sites": [
            {
              <BPNS>
            }
          ]
        },
        ...
      ]
    }
  ]
}
```

### Data Integrity Layer (DIL) - Spike

The use-case Data Integrity Layer is an additional Layer in IRS processing. It aims to verify integrity along the data
chain by introducing a new aspect model: DataIntegrity. This model contains hashes and signatures of semantic models in
a parent - child structure, similar to SingleLevelBomAsBuilt:

```json
{
  "catenaXId": "urn:uuid:123",
  "childParts": [
    {
      "catenaXId": "urn:uuid:456",
      "references": [
        {
          "semanticModelUrn": "urn:bamm:io.catenax.data_integrity:1.0.0#DataIntegrity",
          "hash": "5a4cc1c6817b0045b26d3e842482753b5ad1cf20fbedebed2ee3c09936800821",
          "signature": "e71196ddd321cc0f87cca372c304d74b9e741d8a5a3ddd5b953877b1f65a5206815d20f53bb51cf3d7725ed14fb5e18bd7b65e0ba9ef0e2f0cb44b5d5fc42e4197ce004ce4d0369e15c0429c7097099d46ce8640ff7197ac57f8045d3db996df1deaf8e7f01b447118d62876d2cd44484d2e2c49fac4a47c8a6ea9177142d8efdc032fd5638968dcd8982349b65cc6f75409dccc2386aa5e76c397d77e54e0fe4add1c870af5eab754c911595e8dc4b6e33643d15b95c2f8b62524702e30bf49736063e71761f6382aca8b46fffbd529495bba075e29fc540cd0a9b11c349512ddd97c371b9eb7e56196b5236f31290912f2f282786042a6a81017030a6d82eb"
        },
        {
          "semanticModelUrn": "urn:bamm:io.catenax.serial_part:1.0.1#SerialPart",
          "hash": "823dd4d758f2aafd5cf63de1144b178118cfe97388678d9b42eabe65a7e66e55",
          "signature": "4ac7a5feb1724bbf5e6f9ba8ed55f09133185b9f9c49b627f6bc7f36b49e42f4dcfecd19bb64ad0bdc93742bab5add7a45f67ff7a2603f93e62f2b2bd4ed606b0d637f075df73b5aef91e8f20128dd55e62cce2f059beb59723927835e6e108c84170d7ca03a11fc65a9d57d618156c69fde6112955e53dca04bd0f860b75477eb7b58ee10ab8e5d3bcaacdfa1b6ba0f86e6d2518154642c1da8a42397221a556cfc536614298afeeaf5098c18f5aaf260bf78bfea30e066316819d0f442491fdf4cdc10929605ebefef05c5a503b62b8788d6bb9c76b8a9108987beca19cb5eae50bd83a5f29e241689f1450d4c06a7524955f4fbf6c4d773ef3a94e4a3a1a8"
        },
        {
          "semanticModelUrn": "urn:bamm:io.catenax.single_level_bom_as_built:1.0.0#SingleLevelBomAsBuilt",
          "hash": "e2efea25b47bec2b5ce2a65b4785172240d97acfbd7f223ae009f9686a155e16",
          "signature": "a0b344cd9fc3c5d51738a5f1b76ba079319ea9d270f181b0e691ff7a6bbc6eaab3955c324d9b7b8db679473408961cb06826532bb4bd54321d9e04539f6bd520def9b648e3a06a4ee035f4d961212a46404ac512ea64d72224af474ebe004ae87ec121078db994e7750324e7a2de66667512b3b2c0e60ba8c1391dcfcfe57f21b51256fc1a794cdace47a70561136328a7b8fce8539533c971d6ef29ea57c04fb6f87e873c0b66ca21c70f8689696b42bec47c718d9145f2de8bea38d9dc1718322ddc6014b6d781db846446c0dcb4ce3c6dda8e018be2732b32f414fd074dfadf87fa605ca57598095df7d139432015a0ba6a125089f835ee0af4db8a733074"
        }
      ]
    },
    ...
  ]
}
```

Based on the DataIntegrity aspect IRS can compare the data received by a data provider with the given hash and verify
that the data was not altered or manipulated after initial provision.

## Success Stories

### Circularity Dashboard Success Story

Due to the large number of producers and consumers, however, the implementation of the circular economy is challenging:
Information on the individual lifecycles is mostly only available locally and therefore does not provide any meaningful
assessment of reuse, recycling or remanufacturing.

![success](@site/static/img/irs-circularity-dashboard-successstory.png)

Therefore, the circularity dashboard, gives the user information about materials of the product and of all their
composites. This is only possible, if participants of the supply chain, the direct manufactures of the composites of a
vehicle are sharing information about the materials used.
The ability to access provided data in the Catena-X network could be done in two different ways. Way one is to handle
each request separately, or use the IRS, which manages the retrieval of digital twins, checks and validates the results
against the semantics and provides an easy-to-use API to interact with the decentral stored data.
In the SAP Industry Network for Automotive, circularity cockpit API specification and IRS implementation are serving as
a reference. Thus, we were able to develop IRS functionality to best fit the SAP tech stack, which we decided to use for
the circularity cockpit.
This enables us, to have a controlled access to distributed data in an interoperable setup to access data chains. To
abstract the data consumption layer brings benefits in stability and resiliency to our application, because we could
easily change to different providers or services of a IRS implementation.

### Trace-X Success Story

![Trace-X-Screenshot](@site/static/img/Trace-X/Trace-X_App-mypartsview.png)

The Open-Source Traceability application is developed within the Catena-X project and enables all companies to
participate in Parts Traceability.
Trace-X offers capabilities to ingest data for serialized parts and batches as well as their child components. Within
CX, we strive to establish a standardized, data-sovereign and interoperable exchange of traceability data along the
value creation chain.

The application gives an overview of the supplier network and the supply chain. A high level of transparency across the
supplier network enables faster intervention based on recorded events in the supply chain. Additionally, automated
massages regarding Quality related incidents.
All this saves' costs by seamlessly tracking parts as well as creates trust through clearly defined and secure data
access by the companies and persons involved in the process.

![success2](@site/static/img/IRS2.png)

Applying and using the Item Relationship Service had the following benefits:

* With the decision using the IRS we could speed our development of Trace-X throughout the scope of their helm charts
  including a running service with test data. That alone was very beneficial to have a stable environment with data
* The IRS fulfills a high level of quality in code which provides a reliable service
* The deployment via helm charts has been built so that it can fit in existing architecture components throughout
  configuration like the Digital Twin Registry, the EDC, Semantic Hub, Keycloak and others. This enabled Trace-X to
  configure the Service smoothly into the architecture of the application
* The IRS abstracts the communication with partners along the supply chain, that makes it easy to build business
  processes on that. It abstracts a technical level to a logical level to enhance the speed of implementation of a
  Software Provider
* The IRS with the standardized API provides a data interoperability level on data chains
* The Team behind the IRS is fast in implementing and adapting new features

![Trace-XScreenshot1](@site/static/img/Trace-X/01.png)

![Trace-XScreenshot2](@site/static/img/Trace-X/02.png)

![Trace-XScreenshot3](@site/static/img/Trace-X/03.png)

![Trace-XScreenshot4](@site/static/img/Trace-X/04.png)

## Logic & Schema

### Building Block Architecture Overview

![Building Block View](@site/static/img/irs_buidling_block_decentral.svg)

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
| Digital Twin Registry Client      | The Digital Twin Registry Client is the interface to the Digital Twin Registry. It provides an interface for the Asset Administration Shells.                                                                                                                                        |
| Decentralized Digital Twin Client | In a decentralized network, the Digital Twin Client connects to the EDC which then proxies the requests to the digital twin registry on provider side.                                                                                                                               |
| EDC Client                        | The EDC Client is used to communicate with the EDC network, negotiate contracts and retrieve submodel data.                                                                                                                                                                          |

#### Catena-X Core Services

| Subsystem                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|:----------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Digital Twin Registry             | The Digital Twin Registry acts as an address book for Digital Twins. Data Providers register their Digital Twins in the Digital Twin Registry. Data consumers query the Digital Twin Registry to find Digital Twins and interact with them further. A Digital Twin contains endpoint references to submodel endpoints. Calling a submodel endpoint returns data compliant to a semantic model. A semantic model describes the data that a Submodel endpoint returns. [Repository of the Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry). |
| Eclipse Dataspace Connector (EDC) | The Eclipse Dataspace Connector provides a framework for sovereign, inter-organizational data exchange. It will implement the International Data Spaces standard (IDS) as well as relevant protocols associated with GAIA-X. The connector is designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. [Repository of the Catena-X specific EDC](https://github.com/eclipse-tractusx/tractusx-edc).                                                                                                                         |
| Discovery Service                 | The Discovery Service interface is a CX network public available endpoint which can get used to retrieve EDC Discovery Service or BPN Discovery Services via a given type.                                                                                                                                                                                                                                                                                                                                                                                                      |
| Portal                            | The Catena-X Portal and Marketplace is the heart of Catena-X and the entry point for all activities in the automotive network/value chain. Every user of the automotive value chain, no matter if it is a consumer, app provider, IT administrator or IT support will connect via the portal to the value bringing services. The whole eco-system on the automotive value chain is connected at one place.                                                                                                                                                                                                                                                                                                                                                                      |
| EDC Discovery Finder              | The EDC dataspace discovery interface is a CX network public available endpoint which can get used to retrieve edc endpoints and the related BPNs, as well as search for endpoints via the BPN                                                                                                                                                                                                                                                                                                                                                                                  |

## Business Process

The DataChainKit acts as a middleware between consumers and manufacturers. This section describes the Business Process
of DataChainKit. Who are its users, and with which other systems does it interact with.

### Consumer

The DataChainKit by IRS API is the essential component of the business app Trace-X FOSS to be able to build data chains
in upwards and downwards direction for BOM lifecycles asBuilt and asPlanned.
The DataChainKit by IRS API is being consumed by the dismantler dashboard and other parties which are part of the
Catena-X network. They need to provide valid credentials issued by the Catena-X Portal/IdP. Additionally, they must
provide a base global asset identifier to retrieve information for as well as configuration details for the view on that
information.
The DataChainKit by IRS API is the essential component of the business app Trace-X FOSS to be able to build data chains
in upwards and downwards direction for BOM lifecycles asBuilt and asPlanned.
The DataChainKit by IRS API is being consumed by the dismantler dashboard and other parties which are part of the
Catena-X network. They need to provide valid credentials issued by the Catena-X Portal/IdP. Additionally, they must
provide a base global asset identifier to retrieve information for as well as configuration details for the view on that
information.

### Catena-X network

The IRS retrieves data from the Catena-X network (using the necessary infrastructure, see Technical Context), aggregates
it and provides it back to the consumers. This connection is mandatory. If the Catena-X services are unavailable, the
IRS cannot perform any work.

As of now, the IRS uses technical user credentials provided by the portal to gather the required data. This might be
changed to use the consumer credentials in the future.

## Standards

Our relevant standards can be downloaded from the
official [Catena-X Standard Library](https://catena-x.net/de/standard-library)

* [CX - 0005 Item Relationship Service API](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0005-ItemRelationshipServiceApi-v1.1.1.pdf)
* [CX - 0045 Aspect Model Template Data Chain](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0045-AspectModelDataChainTemplate-v1.1.1.pdf)

## Why Data Chain Kit

What is in for you to use the Data Chain Kit. On what is it built on.

![Why use Datachain Kit](@site/static/img/why_data_chain-minified.png)

## IRS Iterative

The IRS iterative iterates through the different digital twin aspects, which are representing a relationship. For
Release 3.2 this is the SingleLevelBOMasBuilt aspect, which connects serialized parts. This service can access the
digital twins for which an EDC policy and a data contract exists. In this case the consumer needs a contract which each
participant of the data chain.

![IRS iterative diagram](@site/static/img/irs-minified.svg)

The following general conditions apply:

* Access control through policies and contracts is done by the EDC
* Direct data exchange between supply-chain partners
* Catena-X partners of the accessible value chain are known to the data-consumer

## IRS Recursive

The IRS recursive works different as the IRS iterative. It does not consume the digital twins of the partners in the
supply chain in a direct way, it triggers the IRS of a partner to start an IRS job to retrieve data of the sub-partners.
This is done to keep the structure below intransparent to the value chain above, even though it is still possible to
aggregate results; pass information along the value chain.

![IRS recursive diagram](@site/static/img/irs-recursive-minified.svg)

The following general conditions apply:

* The IRS recursive is for use-cases, which want to apply business logic with data along the value chain. For example,
  to summarize, or check for existence of values or certificates.
* Each participant has the possibility to check their values, before passing them to next in line
* Access control through policies and contracts is done by the EDC
* Direct data exchange between supply-chain partners
* Business logic is being applied with an extension concept

The recursive approach is based on a decentralized network in which only the next level of a relationship between two
companies (one level down approach) is known. (Relationship: Customer - Supplier)

1. Company OEM initiate request using a consumer application.
2. Company (supplier) is identified on the next lower level - then a message is sent to the IRS instance of this
   supplier.
3. After receiving the message on supplier level, the IRS determines the suppliers on the next lower level and also
   sends a message to the IRS instances of the suppliers.
4. This is repeated until a leaf node (a company has no more suppliers or the company is not part of the C-X network) is
   reached.
5. In this case the leaf node is responding with a message to the customer company.
6. The IRS on customer company level receives and aggregates the messages from all requested suppliers and responds
   again to the customer until OEM level is reached.
7. OEM shows result of recursive investigation according to the given use case in consumer application.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

* SPDX-License-Identifier: CC-BY-4.0
* SPDX-FileCopyrightText: 2021, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
* SPDX-FileCopyrightText: 2022, 2023 BOSCH AG
* SPDX-FileCopyrightText: 2021, 2022 ZF Friedrichshafen AG
* SPDX-FileCopyrightText: 2022 ISTOS GmbH
* SPDX-FileCopyrightText: 2021, 2024 Contributors to the Eclipse Foundation
* Source URL: [https://github.com/eclipse-tractusx/item-relationship-service](https://github.com/eclipse-tractusx/item-relationship-service)
