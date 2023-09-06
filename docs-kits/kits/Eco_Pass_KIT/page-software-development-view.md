---
title: Development View
---

## Introduction

### General Development Information

The developer view provides developers with resources to utilize the EcoPass KIT effectively. On the one side developers can learn how to integrate the EcoPass KIT into their applications and to make use of the product passport exchanging feature via the Catena-X network. On the other side, IT-Administrators will learn how to provide the needed passport data and which components are required.
Thereby, this KIT covers various aspects, starting from how the available API Endpoints can be utilized for data models and how to make them available in the Catena-x Data Space.

### Architecture Overview

The following Figure 7 shows how the EcoPass KIT (represented by Product Passport Frontend and Backend) is embedded in the overall architecture.

![EcoPassKIT IT Arch Picture](/docs/resources/development-view/adoption-view-EcoPassKIT_IT_Arch.png)

After authorization, the sequence diagram below (Figure 8) illustrates the identification process of the decentral Digital Twin Registry. The process is divided into 25 steps, starting within the Data Consumer Environment, which is providing the digital product passport consumer application/service. In summary, the sequence details the interaction of EDC(s), corresponding BPN(s), and the decentral Digital Twin Registry (dDTR). It also illustrates how the consumer not only requests data via the EDC(s), but also how the data is exchanged via the provider, thereby leveraging the EDC component at all stages. The sequence is concluded by data requests for digital twins and corresponding sub models.

The Figure below describes the process of searching for a DPP based on a part identification. The process shown in the figure assumes that the following conditions are met. The consumer has a part identifier and wants to obtain the corresponding digital twin. It also assumes that the consumer knows the BPN of the data room participant that is the owner of the digital twin.  
This process can be roughly divided into three steps. In the first step, [001] to [006], the EDCs of the data provider are identified. Then, the consumer has received a list of EDC endpoints, all belonging to the data space participant that can provide the requested digital twin. In the second step, calls [007] to [014], the consumer determines which specific DTR asset to query to obtain the correct DPP. This is accomplished by traversing the received list of EDC endpoints until the DTR asset that can provide the DPP being sought is found. Once the DTR facility is located, the contract negotiation workflow is initiated by the consumer. During this workflow, it is determined if the consumer has the necessary rights to access and receive the DPP they are looking for. The rights are dependend on the frame contracts the consumer aggreed to. On top the provider can white or blacklist ceratain BPNs which ensures that the provider has full controll of their data. At this point, the consumer knows where to find the DPP, and a usage and access policy is negotiated. In the last step, calls [015] to [026], the actual retrieval of the DPP is performed. In order to retrieve the DPP, its unique identifier (UUID) is required. This UUID is determined by retrieving the DPP that is associated with the part ID. After retrieving the UUID, the consumer requests the asset.

![Sequence Diagramm](/docs/resources/development-view/developmentview-sequence-diagramm.svg)

#### API calls

| Call   | Method | Path                                               | Params                                     |
| ------ | ------ | -------------------------------------------------- | ------------------------------------------ |
| [001]  | POST   | /api/administration/connectors/discovery/search    | key:ManufactureID                          |
| [003]  | POST   | /api/administration/connectors/bpnDiscovery/search | key:ManufactureID                          |
| [005]  | POST   | /api/administration/connectors/discovery/search    | `{[<Company's BPNL>]}`                     |
| [0015] | GET    | /lookup/shells                                     | key:partInstanceID, value: batteryDMC-Code |

## API Specification

| Service Name          | Description                                                                            | Reference Implementation                                                                            | Standardization Number                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portal/IAM            | Portal                                                                                 | [Portal](https://github.com/eclipse-tractusx/portal-backend)                                        | [CX - 0015](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/4_IAM/CX_-_0015_IAM___Access_Control_Paradigm_PlatformCapabilityIAM_v_1.0.1.pdf)             |
| Discovery Finder      | A microservice resolving a type of identifiers against a set of BPN-Discovery Servers. | [Tractus-X Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)             | [CX - 0053](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0053-BPNDiscoveryServiceAPIs.pdf)                                              |
| BPN Discovery Service | A microservice resolving a particular assetId against the registered BPN of its owner. | [Tractus-X BPN Discovery](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                   | [CX - 0053](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0053-BPNDiscoveryServiceAPIs.pdf)                                              |
| EDC Discovery Service | A microservice that resolves a BPN against an EDC endpoint.                            | [Tractus-X Portal including EDC Discovoery API](https://github.com/eclipse-tractusx/portal-backend) | [CX - 0001](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/9_Data-Discovery-Services/CX_-_0001_EDC_DISCOVERY_API_PlatformCapabilityDS_v_1.0.1-1.pdf)    |
| EDC                   | Eeclipse Dataspace Connector                                                           | [Tractus-X EDC](https://github.com/eclipse-tractusx/tractusx-edc)                                   | [CX - 0018](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/3_Sovereign_Data_Exchange/CX_-_0018_EDC_PlatformCapabilitySovereignDataExchange_v_1.0.1.pdf) |

Please note: In order to provide a passport asset for consumption a corresponding offer must exist. Please refer to “[Setup Data Offer](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/samples/Transfer%20Data.md#2-setup-data-offer)” in the EDC documentation.

## Reference Implementationfernce

A reference implementation and a corresponding documentation can be found [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main).

This reference includes a frontend and a backend allowing users to look up and display Battery Passport assets.
The Helm charts of this reference implementation are located [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/charts/digital-product-pass).

### Documentation in the context development

The following represents a collection of relevant documentation regarding the presented adaptation and all related services:

**[EDC Domain Model](https://github.com/eclipse-edc/Connector/blob/main/docs/developer/architecture/domain-model.md)**

**[Reference Implementation (+Arch42)](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/docs)**

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2023 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2023 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2023 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023,2023 SAP SE
- SPDX-FileCopyrightText: 2023,2023 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. für ihre Institute IPK und IPK
- SPDX-FileCopyrightText: 2023,2023 BASF SE
- SPDX-FileCopyrightText: 2023,2023 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023,2023 Contributors to the Eclipse Foundation
- Source URL: <https://github.com/eclipse-tractusx/eco-pass-kit>
