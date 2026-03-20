---
id: architecture-view
title: Architecture View
description: Architecture of the eSDScom KIT
sidebar_position: 2
---

## Architecture View

### Context and architecture fit
*This section is non-normative*

The eSDScom standard defines a structured data model that enables the exchange of SDS between suppliers and OEMs in the automotive industry. It is designed to reduce the current manual effort involved in gathering and processing data needed for occupational workplace and environmental safety, which today is commonly exchanged via e-Mail and PDF files.
This standard is not embedded in a broader Catena-X use case or initiative but operates as a standalone specification that supports the bilateral exchange of information. 
It is applicable whenever a company needs to obtain SDS data.
To participate in the eSDScom use case, the following single standards MUST be fulfilled by all participants for which the standard is relevant:
    * CX-0002 Digital Twins in Catena-X
    * CX–0018 Sovereign Data Exchange
To participate in the eSDScom use case, the following single standard MUST be fulfilled only by data providers:
    * CX-XXXX eSDScom
In the Catena-X technical landscape, the standard assumes the use of CX-0126-IndustryCorePartType. The architecture follows a pull-based pattern: data is pushed from supplier to consumer (or other way around) but made accessible by the data provider. 
This standard applies equally to Data Providers and Consumers. All parties involved in the exchange must implement the agreed data structure and access patterns to ensure interoperability within the Catena-X network.

### Architecture Overview
*This section is non-normative*

To be filled until 06.04.2026

System Architecture
[High-level architecture diagram and explanation]
Architecture Principles
1.	Modularity: Loosely coupled components
2.	Scalability: Horizontal scaling support
3.	Security: End-to-end encryption
4.	Interoperability: Standards-based APIs
5.	Observability: Built-in monitoring and logging

The architecture of this KIT is based on Catena-X standards. 
First of all Identification and Access Management (IAM) follows the CX-0015 IAM & Access Control Paradigm for users and Clients standard [https://catenax-ev.github.io/docs/standards/CX-0015-IAMandAccessControlParadigmForUsersAndClients] which lays out the principles for both, data providers and data consumers. 

Second, both, the data providers and consumers shall be identified in the Catena-X dataspace following the CX-0010 Business Partner Number Standard [https://catenax-ev.github.io/docs/standards/CX-0010-BusinessPartnerNumber] so that a clear identification of both parties enables automatic data exchange.
The Onboarding of the parties on the Catena-X Dataspace shall be effectuated following the CX-0006 Registration and initial Onboarding standard.  [https://catenax-ev.github.io/docs/standards/CX-0006-RegistrationAndInitialOnboarding].

Figure 1 shows the high-level architecture of the notification exchange in the Catena-X dataspace and the services that are involved. Both the notification sender and the notification recipient must be members of the Catena-X network in order to communicate with each other. With the help of the Identity Access Management (IAM) each participant can authenticate itself, verify the identity of the requesting party and decide whether to authorize the request.

Figure 1 must be created and implemented here until 06.04.2026 (similar to Supply-Chain Use case)

<img width="878" height="518" alt="image" src="https://github.com/user-attachments/assets/f3a6bc1f-6f36-47c4-9be5-e5c2d5faac1d" />

From conceptual point of view the system consists of different building blocks. These building blocks in the following diagram show which participant deploys which components. Identification and Access Management is omitted for simplicity reasons.

Note: Here we need an own overview of esdscom in CX: Figure 2: Whitebox view on a PURIS system

<img width="900" height="1047" alt="image" src="https://github.com/user-attachments/assets/4e8d66fc-4fab-4e41-a397-c3e7c4a1cff2" />

### NOTICE
This work is licensed under the CC BY-ND 4.0.
•	SPDX-License-Identifier: CC BY-ND 4.0
•	SPDX-FileCopyrightText: 2025 eSDScom Workgroup and contributors
•	SPDX-FileCopyrightText: 2025 Qualisys GmbH
•	SPDX-FileCopyrightText: 2025 Volkswagen AG
•	SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
