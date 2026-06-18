---
id: development-view
title: Development View
description: Overview on the eSDScom KIT
sidebar_position: 3
---

## Development View

eSDScom is a data model, not a software. No API other than the digital twin registry APIs.
This document provides a developer-focused overview of the eSDScom KIT, including a technical breakdown of the architecture, and data exchange protocols and semantic models.

### Target Audience

Software Developers, Solution Architects, Technical Leads, API Developers, Integration Engineers.

### Focus

Technical implementation, APIs, and development resources

Required contents in the following sub-chapters:

### Architecture Overview

This section is non-normative.

The architecture of this KIT is based on Catena-X standards. 

To participate in the eSDScom use case, the following single standards MUST be fulfilled by all participants for which the standard is relevant: 

* CX-0002 Digital Twins in Catena-X
* CX–0018 Sovereign Data Exchange

To participate in the eSDScom use case, the following single standard MUST be fulfilled only by data providers:

* CX-XXXX eSDScom In the Catena-X technical landscape, the standard assumes the use of CX-0126-IndustryCorePartType.
The architecture follows a pull-based pattern: data is pushed from supplier to consumer (or other way around) but made accessible by the data provider. This standard applies equally to Data Providers and Consumers. All parties involved in the exchange must implement the agreed data structure and access patterns to ensure interoperability within the Catena-X network.

1. All Identification and Access Management (IAM) follows the CX-0015 IAM & Access Control Paradigm for users and Clients standard [https://catenax-ev.github.io/docs/standards/CX-0015-IAMandAccessControlParadigmForUsersAndClients] which lays out the principles for both, data providers and data consumers.
2. Both, the data providers and consumers shall be identified in the Catena-X dataspace following the CX-0010 Business Partner Number Standard [https://catenax-ev.github.io/docs/standards/CX-0010-BusinessPartnerNumber] so that a clear identification of both parties enables automatic data exchange.
The Onboarding of the parties on the Catena-X Dataspace shall be effectuated following the CX-0006 Registration and initial Onboarding standard [https://catenax-ev.github.io/docs/standards/CX-0006-RegistrationAndInitialOnboarding].

The eSDScom standard defines a structured data model that enables the exchange of SDS between suppliers and OEMs in the automotive industry. It is designed to reduce the current manual effort involved in gathering and processing data needed for occupational workplace and environmental safety, which today is commonly exchanged via e-Mail and PDF files.
This standard is not embedded in a broader Catena-X use case or initiative but operates as a standalone specification that supports the bilateral exchange of information. It is applicable whenever a company needs to obtain SDS data.

System Architecture [High-level architecture diagram and explanation] Architecture Principles:

- Modularity: Loosely coupled components
- Scalability: Horizontal scaling support
- Security: End-to-end encryption
- Interoperability: Standards-based APIs
- Observability: Built-in monitoring and logging

The architecture of this KIT is based on Catena-X standards. First of all Identification and Access Management (IAM) follows the CX-0015 IAM & Access Control Paradigm for users and Clients standard [https://catenax-ev.github.io/docs/standards/CX-0015-IAMandAccessControlParadigmForUsersAndClients] which lays out the principles for both, data providers and data consumers.

Second, both, the data providers and consumers shall be identified in the Catena-X dataspace following the CX-0010 Business Partner Number Standard [https://catenax-ev.github.io/docs/standards/CX-0010-BusinessPartnerNumber] so that a clear identification of both parties enables automatic data exchange.
The Onboarding of the parties on the Catena-X Dataspace shall be effectuated following the CX-0006 Registration and initial Onboarding standard [https://catenax-ev.github.io/docs/standards/CX-0006-RegistrationAndInitialOnboarding].

Figure 1 shows the high-level architecture of the notification exchange in the Catena-X dataspace and the services that are involved. Both the notification sender and the notification recipient must be members of the Catena-X network in order to communicate with each other. With the help of the Identity Access Management (IAM) each participant can authenticate itself, verify the identity of the requesting party and decide whether to authorize the request.

<img width="878" height="518" alt="image" src="https://github.com/esdscom/eclipse-tractusx.github.io/blob/main/docs-kits/kits/esdscom-kit/Resources/Architecture%20-%20eSDScom%20Use%20Case.drawio.svg" />

The architecture is designed for a decentralized data exchange within the Catena-X network, leveraging core services and standardized components.
Figure 1 shows how two companies, a Data Consumer (the importer requesting eSDScom data) and a Data Provider (the supplier providing it), exchange eSDScom data securely over the Catena-X network without connecting to each other's internal systems directly.
Each company operates the same two-component setup. The first is a eSDScom App, the business application where the importer composes requests and where the supplier prepares and calculates the eSDScom response data. The eSDScom app is a third-party business application required to manage and exchange eSDScom-relevant data that is compatible with Catena-X. The second is an EDC (Eclipse Dataspace Connector), a standardized secure gateway which manages who is allowed to connect and under what agreed conditions, and which is the actual channel through which the notification data travels.

There a two use cases for eSDScom data exchange:

Use case 1: The provider (supplier) is sending a SDS
Use case 2: The consumer (customer, cleint or recipient) is requesting a SDS 

Before any data moves, both connectors perform an authorization handshake to confirm the identities of both parties and verify that the data sharing conditions are met. Once authorized, the notification is sent to the provider or consumer (depending on the above use cases) eSDScom App. It prepares the response, and sends it back in the opposite direction.
The connectors act as trusted, policy-enforced gateways on both sides, ensuring that data is only shared with verified partners and under agreed terms.
Each notification consists of a header and a body.

The header contains the routing and identification information:
- the BPNL (Business Partner Number Legal) of both the sending and receiving company
- a unique message ID assigned to each individual message, and a related message ID that references the original request. The related message ID is particularly important when a supplier sends multiple separate responses to a single request, for example when emission data for different operators or goods is compiled and returned in stages. Each response can be matched back to the originating request via this identifier.
- 
The following data fields in the eSDScom data model allow an unique assignment of the documents:
-	Supplier DUNS number
-	Formulation (specification) number
-	Version number of the SDS (current and previous)
-	Date of compilation
-	Supplier product name
-	Country (legal area)
-	Language

### Data Schema

#### Semantic Models

Model: eSDScom
Version: 1.0.0
Namespace: urn:samm:io.catenax.eSDScom:1.0.0

##### Description

Purpose: The SAMM defines the eSDScom data model used to exchange eSDScom-relevant SDS information between an OEM (customer) and a supplier.
Request vs Response separation: The SAMM cleanly separates request and response concerns: the request model specifies what the OEM may ask for (scope, requested elements, identifiers), while the response model specifies what the supplier must provide the requested SDS data, enabling clear responsibilities and automated schema generation.

#### Standards

Technical standards and protocol compliance are not applicable.

#### Tutorials

Developer quick-start guides and code examples are not yet available.

### Sample data in multiple formats (JSON, XML, CSV)

eSDScom is not bound to the JSON format provided in Catena-X's eSDScom KIT. 
- An implementation of the eSDScom data model as an XML Schema Definition (XSD) can be found at [eSDScom's Github pages](https://github.com/esdscom/sdscom-xml)
- Besides the data model, eSDScom delivers a curated library of Standard Phrases, i.e. expert approved wordings for all supported regulatory purposes. See the [eSDScom Phrase Browser and Proposal Tool](https://phrases.esdscom.eu/) to read and contribute.
- For general information on this project, got to the [eSDScom Web Pages](https://www.esdscom.eu/)

### History

eSDScom traces back to the 1990s and is the industry standard for sending safety data sheets, exposure scenarios and relevant compliance information in the global chemical supply chain. It is a comprehensive and efficient solution saving money and time. It’s a package, covering the following developments and regulations for chemicals:

- Safety Data Sheets to assist with occupational safety and health
- Notification data to help customers with their legal obligations
- for Europe: Exposure Scenarios and ENES achievements for downstream users

The eSDScom project acts as a think tank for software companies, content and service providers and chemical companies in the field of hazardous chemicals / dangerous goods management and maintains contacts to other associations and authorities.
eSDScom is established also within companies for systems integration. Many associations, i.a. the European Automotive industry (ACEA) as well as the European chemical industry (CEFIC) supports the digital data exchange via eSDScom. For more information:

- https://cefic.org/guidance-and-management-frameworks/reach-clp/escom-package-guidance/
- https://www.acea.auto/publication/position-paper-the-role-of-esdscom-in-the-electronic-exchange-of-safety-data-sheets-within-the-auto-industry/
For general project information, please go to https://esdscom.eu.

It integrates two types of deliverables:

#### Standard phrases

With roots in a single company phrase cataloge, The Federation of German Industries (BDI) formed the BDI Standard Phrae Catalogue which later becaume EuPhraC (European Phrases Catalogue).

#### Data Model and Exchange Format

With roots in EDAS and its XML flavour EDASx, the project decided to redefine the exchange format when the European chemicals law was redefining the requirements in today's form (REACH and CLP). When Cefic started the ESCom project (Exposure Scenario Communication), the new format SDScomXML was defined. Its version 5 allowed to cover information on all relevant legislative regions in one XML document (instead of focusing of one SDS document per XML document) to facilitate systems integration. Later, ESCom and SDScom were joined to eSDScom.

## Notice

This work is licensed under the [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode).
- SPDX-License-Identifier: CC BY-ND 4.0
- SPDX-FileCopyrightText: 2025 [eSDScom Workgroup](https://esdscom.eu) and contributors
- SPDX-FileCopyrightText: 2025 [Qualisys GmbH](https://qualisys.eu)
- SPDX-FileCopyrightText: 2025 [Volkswagen AG](https://www.volkswagen.de)
- SPDX-FileCopyrightText: 2025 Contributors to the [Eclipse Foundation](https://eclipse.org)
