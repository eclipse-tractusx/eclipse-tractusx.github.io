---
id: development-view
title: Development View
description: Overview on the eSDScom KIT
sidebar_position: 3
---

## Development View
Content of this chapter to be filled unitl 06.04.2026 regarding technical documentation for developers, architects, and implementers.
eSDScom is a data model, not a software. No API.
This document provides a developer-focused overview of the eSDScom KIT, including a technical breakdown of the architecture, and data exchange protocols and semantic models.

### Target Audience: 
Software Developers, Solution Architects, Technical Leads, API Developers, Integration Engineers.

### Focus
Technical implementation, APIs, and development resources

Required contents in the following sub-chapters:

### Architecture Overview

This section is non-normative
To be filled until 06.04.2026

The eSDScom standard defines a structured data model that enables the exchange of SDS between suppliers and OEMs in the automotive industry. It is designed to reduce the current manual effort involved in gathering and processing data needed for occupational workplace and environmental safety, which today is commonly exchanged via e-Mail and PDF files. 
This standard is not embedded in a broader Catena-X use case or initiative but operates as a standalone specification that supports the bilateral exchange of information. It is applicable whenever a company needs to obtain SDS data. 
To participate in the eSDScom use case, the following single standards MUST be fulfilled by all participants for which the standard is relevant: 
* CX-0002 Digital Twins in Catena-X
* CX–0018 Sovereign Data Exchange
To participate in the eSDScom use case, the following single standard MUST be fulfilled only by data providers:
* CX-XXXX eSDScom In the Catena-X technical landscape, the standard assumes the use of CX-0126-IndustryCorePartType.
The architecture follows a pull-based pattern: data is pushed from supplier to consumer (or other way around) but made accessible by the data provider. This standard applies equally to Data Providers and Consumers. All parties involved in the exchange must implement the agreed data structure and access patterns to ensure interoperability within the Catena-X network.

System Architecture [High-level architecture diagram and explanation] Architecture Principles

Modularity: Loosely coupled components
Scalability: Horizontal scaling support
Security: End-to-end encryption
Interoperability: Standards-based APIs
Observability: Built-in monitoring and logging
The architecture of this KIT is based on Catena-X standards. First of all Identification and Access Management (IAM) follows the CX-0015 IAM & Access Control Paradigm for users and Clients standard [https://catenax-ev.github.io/docs/standards/CX-0015-IAMandAccessControlParadigmForUsersAndClients] which lays out the principles for both, data providers and data consumers.

Second, both, the data providers and consumers shall be identified in the Catena-X dataspace following the CX-0010 Business Partner Number Standard [https://catenax-ev.github.io/docs/standards/CX-0010-BusinessPartnerNumber] so that a clear identification of both parties enables automatic data exchange. 
The Onboarding of the parties on the Catena-X Dataspace shall be effectuated following the CX-0006 Registration and initial Onboarding standard [https://catenax-ev.github.io/docs/standards/CX-0006-RegistrationAndInitialOnboarding].

Figure 1 shows the high-level architecture of the notification exchange in the Catena-X dataspace and the services that are involved. Both the notification sender and the notification recipient must be members of the Catena-X network in order to communicate with each other. With the help of the Identity Access Management (IAM) each participant can authenticate itself, verify the identity of the requesting party and decide whether to authorize the request.

Figure 1 must be created and implemented here until 06.04.2026 (similar to Supply-Chain Use case)

image
From conceptual point of view the system consists of different building blocks. These building blocks in the following diagram show which participant deploys which components. Identification and Access Management is omitted for simplicity reasons.

Note: We need an own overview of esdscom in CX: Figure 2: Whitebox view on a PURIS system

image

### Component/Sequence Diagrams
Visual representations of system interactions

### API Specifications
Of any describe here: OpenAPI/Swagger files with endpoint documentation
eSDScom is a data model, not a software. No API.

### Standards
Technical standards and protocol compliance

### Logic/Schema
Business logic definitions and data flow diagrams

### Semantic Models
Detailed data structures and relationships

### Test Cases
Unit tests, integration tests, and validation scenarios

### Sample Data
Example datasets and payloads

### Tutorials
Developer quick-start guides and code examples

## Best Practices

### working code examples

### API endpoint examples with request/response samples
eSDScom is a data model, not a software. No API.

### Document error handling and edge cases

### Architecture diagrams (C4, UML, etc.)

### Link to live API documentation

### Sample data in multiple formats (JSON, XML, CSV)
eSDScom is not bound to the JSON format provided in Catena-X's eSDScom KIT. 
- An implementation of the eSDScom data model as an XML Schema Definition (XSD) can be found at [eSDScom's Github pages](https://github.com/esdscom/sdscom-xml)
- Besides the data model, eSDScom delivers a curated library of Standard Phrases, i.e. expert approved wordings for all supported regulatory purposes. See the [eSDScom Phrase Browser and Proposal Tool](https://phrases.esdscom.eu/) to read and contribute.
- For general information on this project, got to the [eSDScom Web Pages](https://www.esdscom.eu/)

## More guides
https://github.com/esdscom/eclipse-tractusx.github.io/blob/main/docs-kits/kits/esdscom-kit/architecture.md

## Notice
This work is licensed under the [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode).
- SPDX-License-Identifier: CC BY-ND 4.0
- SPDX-FileCopyrightText: 2025 [eSDScom Workgroup](https://esdscom.eu) and contributors
- SPDX-FileCopyrightText: 2025 [Qualisys GmbH](https://qualisys.eu)
- SPDX-FileCopyrightText: 2025 [Volkswagen AG](https://www.volkswagen.de)
- SPDX-FileCopyrightText: 2025 Contributors to the [Eclipse Foundation](https://eclipse.org)
