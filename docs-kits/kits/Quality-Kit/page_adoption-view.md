---
id: Adoption View Quality Kit
title: Adoption View
description: 'Quality Kit'
sidebar_position: 2
---

![Quality kit banner](@site/static/img/kits\data-driven-quality-management\data-driven-quality-management-kit-logo.drawio.svg)

### Quality KIT

## Vision & Mission

### Vision

Our vision is to transition from parts-based quality management on a bilateral level between suppliers and customers, to a data-based approach across the OEM-n-Tier value creation chains. This transition aims to enable a network approach for producing and ensuring product quality in a **Live Quality Loop**.

![quality kit vision diagram](@site/Quality-Kit/assets/vision-live-quality-loop.png)

The Quality KIT enables OEM and supplier as **data provider** and **consumer** to exchange and analyze existing data across company boundaries on a e.g. weekly basis, securely and easily. By merging the OEM's field quality data with the supplier's product information, a new level of transparency is achieved, leading to earlier failure detection, faster cooperation between partners, and accelerated root cause analysis. The goal is to minimize the number of parts and vehicles that require corrective actions.

Additionally, this KIT enables the **quality app provider** to deliver solutions for quality data analysis, including traceability and notification functionalities.

### Mission

![quality kit mission diagram](@site/Quality-Kit/assets/mission.png)
The mission of the Quality KIT is to provide the necessary standards, aspect models, technical data pipeline specifications, and business logics to establish a sovereign exchange of quality-related data along the OEM-Tier n chain. This is based on the following principles:

-   We bring together data from suppliers and manufacturers (OEM).
-   Data exchange between data provider and consumer complies with the Catena-X network's data sovereignty.
-   Data exchange following a standardized pipeline and data models within a data eco system enables each partner to use the applications of their choice for data analysis features, like Early Warning and Root Cause Analysis.
-   Early Warning Notification enables the partners to exchange information about potential anomalies they detected and to trigger their subsequent joint evaluation.
-   Failure Pattern exchange enables the partners to have a common understanding of a specific anomaly. As part of the lessons learned, these patterns help to identify known anomalies more quickly in the field.
-   Analysis methods and algorithms that are realized in the quality applications are not part of any standardization. It is desirable that different tools deliver different view angles, to support Root Cause hypothesis creation Therefore, specialization of analysis tools is valuable.

In sum, this KIT enables quality management to substantially **increase speed** in detecting and resolving quality problems and reach a **new level on transparency** and traceability.

### Customer Journey

With the Quality KIT, we support the Catena-X customer journey for our adopters and solution providers. The data driven quality work described in the Quality KIT is not based on the data sharing mechanism of **Digital Twins**. (despite all standardized semantic data models are ready to be used with Digital Twins). The reasons behind are:

-   Quality features like Early Warning Field require a data exchange from a big population of vehicles or part instances. For such big files the data transfer performance by Digital Twins are currently not proven.,
-   The number of vehicles and products in field covered by existing Digital Twins is too low to realize quality work today.

![quality kit customer journey diagram](@site/Quality-Kit/assets/user-journey.png)

## Business Value

The "Quality-KIT" provides guidelines and standard, such as semantic models and data exchange processes, which help companies create a reliable and sovereign data exchange system with their partners. This reduces cost and effort needed to integrate data-driven quality processes into their operations and IT systems. In addition, every partner company can use only one preferred solution for data-based quality analyses instead of data provider specific platforms.

Additionally, providers of quality applications can also lower their setup costs and explore new markets by offering specialized analytical tools.

## Use Case

### Status Quo / Today's challenge

In today’s global and complex collaboration models, quality does not emerge as the sum of the quality contributions of the individual partners in the value chain of OEM and suppliers, but through the networking of the partners involved.

The existing conventional bilateral working models do not account for this. There is no operative network in the industry, with a substantial coverage of elements of the value chains, that provides the necessary means for collaborative quality management with all involved partners.

From Quality Management perspective, the main challenge within the automotive industry is to define and implement inter-organizational end-to-end data chains across the whole automotive partner chain, to empower data driven quality use cases.

Main challenges to ensure a trustful and scalable cooperation are:

-   Trustful and sovereign data exchange mechanism including:
    -   legal contracts and access/usage policy framework along the complete data chain.
    -   Standardized data pipeline.
    -   Aligned standard data exchange, e.g. file format and transfer.
-   Standardized data models.

### Benefits

| Advantages                                                                                        | For OEM | For n-Tier |
|---------------------------------------------------------------------------------------------------|---------|------------|
| Availability of daily updated field data for monitoring the own component in real operation       |         |     X      |
| Linking OEM and supplier data for cross-supplychanin quality analysis                             |    X    |     X      |
| Reduction of analysis capacities along the automotive value chain by preventive field observation |    X    |     X      |
| Reduction of the NTF (no trouble found) at the customer and supplier                              |    X    |     X      |
| Significant reduction in time to detect an abnormality                                            |    X    |     X      |
| Fulfillment of required response times from authorities                                           |    X    |            |
| Creation of transparency and options for new warranty models                                      |    X    |     X      |

#### OEM and large automotive suppliers

The Quality KIT from Catena-X enables companies to realize trustful and sovereign data exchange with their partners and utilize the data in a cooperative way for an Early Warning of unknown/new issues and monitoring the effectiveness of counter measures for known quality issues.. Root causes can be analyzed und understood much faster, due to the exact problem scope can be defined more accurately by checking the connected data sets. This leads to an earlier and focused counter measure. In sum, companies can realize economic benefit by reduction of warranty costs, while at the same time increasing end customer satisfaction due to a reduction of products & vehicles involved in quality issues.

#### Small and Medium-sized Enterprises (SME)

The defined standards, like data models and data exchange pipelines, enforce a flexible and low-barrier approach, to integrate quality use cases and features according to SME need. An easy access to analytic capabilities or transparent analytic results from partner companies, will lead to an economic benefit from warranty costs reduction, via faster and more focused activities related to problem solving.

#### Solution Provider

Solution providers have the potential to scale customer groups via platform effects and the standardization of data models and their exchange. This additional market potential can be accessed via the marketplace and the shared service network.

##### Example: Benefits of using early warning and root cause analyses in active field monitoring of a vehicle component

OEM A and supplier B agree to carry out quality analyses with field data from the OEM and production data from the supplier, based on Catena-X Use Case Quality Methodology (ref. Live Quality Loop) and with Catena-X-certified tools. For this purpose, a quality case incl. a component and the related data is agreed between both partner companies. After technical and organizational onboarding and agreed data exchange, the collaborative analyses setup is available and data-driven quality work can start.

In general, both partners carry out continuous monitoring of the vehicle as system (OEM focus) and its components (supplier focus) using the common database. This allows, for example, error messages in the vehicle, repairs and claims to be monitored and anomalies are immediately visible.

In our example, an engine component flags various error codes (DTCs = Diagnosis Trouble Codes) to the vehicle via the Engine Control Unit. In case of connected vehicle data transfer , after a view days a steadily upward DTC trend is visible in the Catena-X certified data analysis tool. With Catena-X Tooling, this is immediately recognized, although no increasing workshop visits and repairs are yet visible in the warranty data. An employee of a partner immediately notices this and shares this observation with the joint team. At the same time, the employee begins to clarify through initial analyses whether the DTC trend is a real issue or a data artefact. With this confirmation the issue got the risk of increasing repair cases and that a recall may be necessary,

The joint team decides to carry out a root cause analysis together. Various hypotheses about the cause of the fault are examined: running times are compared, software levels, environmental conditions at the time when the fault occurred, etc. The cause of the fault is a diagnostic algorithm modified in a software update, which results in the abnormal DTC appearing more often in the field at hot temperatures. It appears that vehicles are involved, that were built or reflashed at dealers with a newer software version.

As a jointly defined corrective measure between OEM and supplier, a modified algorithm will be integrated into the next regular software update. This starts as soon as possible in vehicle production and vehicles with the faulty software version receive a software update the next time they visit the workshop. For this purpose, repair shops are informed that the displayed error (DTC) for a particular software version is a software problem and does not require any repair. This minimizes costs by avoiding unnecessary repairs.

The affected component continues to be monitored regularly. After a few months, there is a decrease in the conspicuous DTC corresponding to the reduction in the number of vehicles in the field with the faulty software version (proof of effectiveness of the corrective measure adopted).

**Conclusion:**

The example impressively shows that with the Catena-X methodology (Live Quality Loop), quality problems can be identified earlier, the causes of faults can be found quicker, corrective measures can be carried out in a more targeted manner and the affected vehicles can be narrowed down more precisely. There are similar examples of the conversion of production parameters at the supplier or design errors in the design of vehicle components.

## In the following figures five quality improvement scenarios based on the Life Quality Loop are presented, together with the concrete benefit in the meaning of e.g., saved time or reduced number of affected products and vehicles.

![](@site/Quality-Kit/assets/success-story-overview.png)

![](@site/Quality-Kit/assets/success-story-benefit-overview.png)

## You can find more detailed information for all five scenarios in the figures below.

![](@site/Quality-Kit/assets/success-story-1.png)

![](@site/Quality-Kit/assets/success-story-2.png)

![](@site/Quality-Kit/assets/success-story-3.png)

![](@site/Quality-Kit/assets/success-story-4.png)

![](@site/Quality-Kit/assets/success-story-5.png)

## Tutorials

The following **Onboarding Guide** is based on experiences gained during the initiation of real Quality pilots and the transfer to serial operation. Remark: For more details about the specified IT infrastructure, take a look at the **Architecture Overview** below and the description of how to exchange data in the [**Operation View**](https://eclipse-tractusx.github.io/docs-kits/next/kits/Quality-Kit/Operation%20View%20Quality%20Kit)**.**

![](@site/Quality-Kit/assets/dos-and-donts-onboarding-journey.png)

### The following topics should be considered for a successful onboarding

![](@site/Quality-Kit/assets/dos-and-donts-topics.png)

### The "Do's & Don'ts" for the Team Setup and PMO

![](@site/Quality-Kit/assets/dos-and-donts-team-setup.png)

### The "Do's & Don'ts" for the Legal Agreement

![](@site/Quality-Kit/assets/dos-and-donts-legal-agreement.png)

### The "Do's & Don'ts" for the infrastructure set up and development

![](@site/Quality-Kit/assets/dos-and-donts-infrastructure.png)

### The "Do's & Don'ts" for working with the Live Quality Loop Methodology

![](@site/Quality-Kit/assets/dos-and-donts-methodology.png)

The following videos give an overview of the vision of the Quality Use Case.

First follow this link to get an overview about how Quality Management is improved by Catena-X 
<iframe width="100%" height="350" src="https://www.youtube.com/embed/WMixoRvzWP8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Hear what the consortia partners within in the Use Case Quality state about the options for quality improvement with Catena-X - [Statements from the consortia partners]
<iframe width="100%" height="350" src="https://www.youtube.com/embed/T-Xh_LzXXbg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Semantic Models

### Semantic Structure

![semantic structure chart](@site/Quality-Kit/assets/data-model-structure.png)

### Overview Data Model Entities

Download for MS Excel: <a target="_blank" href={ require("/Quality-Kit/assets/R2405_Quality_KIT_DataModelOverview.xlsx")
.default } download>R2405_Quality_KIT_DataModelOverview.xlsx</a>
--> [R2405_Quality_KIT_DataModelOverview.xlsx](https://bcgcatenax.sharepoint.com/sites/download/attachments/126287876/R2405_Quality_KIT_DataModelOverview.xlsx)

### Common Data

Data structured in the following semantic models are to be delivered by OEM & supplier.

#### Quality Task

Quality Task is the root element and describes why companies are working together on a quality topic and what they want
to do. All involved companies and their contact people are named. In addition, a flag tells what should be done with
exchanged data after a Quality Task is closed. A Quality Task (qTask) can be created by both **OEM or Supplier** and
defines why data is exchanged between two or more companies and what insights should be generated out of the transferred
data. In addition, there is a flag what happens with the transferred data when this qTask is closed.

Github Link to semantic data
model: [Quality Task](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task)

#### Quality Task Attachment

Quality Task Attachment gives the ability to share data that is not standardized in an existing semantic model yet. Non
standardized data provisioning is realized as a file transfer. The model contains file parameters and the schema of
structured data in the provided file. A Quality Task Attachment can be provided by both **OEM or Supplier**.

Github Link to semantic data
model: [Quality Task Attachment](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task_attachment)

#### Early Warning Notification

Early Warning Notifications provide information about anomalies detected in the data belonging to a quality task. The content of the Early Warning Notification comprises a link to the respective quality task, a textual description of the detected anomaly, a filter describing the potentially affected population, and a reference to optional additional data that can be provided as Quality Task Attachment.

Github Link to semantic data model: [Early Warning Notification](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.early_warning_notification)

#### Failure Pattern

Failure patterns are defined filters and links to aspects of the Catena-X standard CX-00123 that automatically list potentially critical individual data sets within a population. This semantic model, which uses Boolean operators, for example, to link different variables within a data set or depending on a logically linked data set, is used to identify and assess critical system states within a population and to provide evidence of effectiveness. Due to standardization, failure patterns can be exchanged arbitrarily between the OEM and Tier_1.

Github Link to semantic data model: [Failure Pattern](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/a2a01f445091188a647c42cced589f071fa2990d/io.catenax.failure_pattern/)

### OEM Data

Data structured in the following semantic models are to be delivered by OEM.

#### Fleet Vehicles Product Description

Master data for each vehicle of a specific population - from an end customer view. This model represents the vehicle as
it was sold to the customer. All entities and properties are constant over the lifetime of the vehicle.

Github Link to semantic data model: [Fleet Vehicles](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/a2a01f445091188a647c42cced589f071fa2990d/io.catenax.fleet.vehicles)

#### Fleet Diagnostic Data

Data model for vehicle diagnostic data suitable for mass data transfer. Diagnostic data coming from multiple vehicles
that are affected by an quality issue + Diagnostic data from similar vehicles that are not affected by an quality issue.

Github Link to semantic data
model: [Fleet Diagnostic](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.diagnostic_data)

#### Fleet Claim Data

Customer complaints that are linked to this QualityTask +Data about the exchange of potentially faulty parts.

Github Link to semantic data
model: [Fleet Claim](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.claim_data)

### Supplier Data

Data structured in the following semantic models are to be delivered by Supplier (Tier n).

#### Manufactured Parts Quality Information

A selection of manufacturing-related parameters that help to solve a quality issue.

Github Link to semantic data model: [Manufactured Parts Quality Information](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.manufactured_parts_quality_information)

#### Parts Analyses

Analyses results of replaced and potentially faulty parts, that are linked to this Quality Task.

Github Link to semantic data
model: [Parts Analyses](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.parts_analyses)

## Logic & Schema

### Business Logic ---- HIER GEHTS WEITER___

![quality kit business logic diagram](@site/Quality-Kit/assets/quality-user-journey.png)

The prerequisite for faster faster problem solving is the earliest possible detection of a problem (early warning) and
the fastest possible understanding of the error chain and cause (root cause analysis). Early Warning in general has to
be realized at all relevant points along the value chain.

**Early Warning** in the **Field**, an early warning system for issues in a vehcile fleet, enables the earliest possible
detection of quality problems in products in vehicles after delivery. Vehicle data from the OEM is used for the
analysis, in particular fault codes that are stored in ECUs and read out during a workshop visit or frequently "over the
air". Increases in product-specific fault codes across the vehicle population provide a reliable indicator of quality
problems much earlier than through parts replacement and analysis.

**Early Warning** in the **Production** focuses on early detection in the production of products. Various practical
scenarios have been developed and the corresponding technical requirements specified. If, for example, a supplier
discovers that a delivered product has a quality defect, the customer can be informed by means of notification. The
functionality of traceability (Catena-X Use Case Traceability) in the supply chain makes it possible to trace in which
vehicle or follow-up product the affected components are installed. Remedial measures can thus be applied specifically
to a limited quantity.

If a problem is detected by early warning in the field or in production, a data-based **Root Cause Analysis** is
started. The aim is to derive hypotheses regarding the cause and effect relationship from the shared database of the
customer and supplier and to verify them together. With the Catena-X network functions, this transparency can be
achieved much faster. If the root cause is known more quickly, effective counter measures can be defined and implemented
much faster.

### Architecture Overview

![independant architecture r2312 chart](@site/Quality-Kit/assets/architecture_overview.png)

The tier-1 receives data on vehicle master data, existing claims and DTCs. Once the data is received, the Tier-1
supplier is analyzing the data in order to detect patterns based on which DTCs and claims can be explained. The data is
shared and consumed as assets via the companies' EDC while the authorization is managed via the the shared services of
the consortia.

#### Quality Components

| Subsystem         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data Provisioning | This component provides a company's data to the Catena-X network by transforming it into the Catena-X format and publishing it. In Catena-X, data must be provided to the network based on existing standards from the other Kits. One example that can be used is the Connector Kit that builds a component based on the IDS protocol, e.g. the Connector of the Eclipse Dataspace Components (EDC).  The data format used for Quality data  is based on the aspects (Sub-)models published in the Semantic Hub. |
| Internal Systems  | Existing internal systems of a Catena-X partner which provide data to Quality components. - For Data Provisioning: The data provided to Catena-X via the EDC should be fetched from a partner's internal system. e. g. quality claims, defect code collection system                                                                                                                                                                                                                                              |
| Quality App       | Enables traceability functionalities like quality alerts or notifications. When a Traceability App fetches data for digital twins (submodels), there are two options: - Directly access the partner's EDC (and the Digital Twin Registry) to connect to other partner's EDC and retrieve the data from ther - Use a local IRS service to get the data and let the IRS handle the EDC and Digital Twin Registry communication.                                                                                     |

#### Catena-X Core Services

| Subsystem                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Eclipse Dataspace Components (EDC) | The Connector of the Eclipse Dataspace Components provides a framework for sovereign, inter-organizational data exchange. It will implement the International Data Spaces standard (IDS) as well as relevant protocols associated with GAIA-X. The connector is designed in an extensible way in order to support alternative protocols and integrate in various ecosystems. [Repository of the Catena-X specific EDC](https://github.com/eclipse-tractusx/tractusx-edc). |
| SSI → MIW                          | The Self-Sovereign Identity is also a life long identity,( when credentials are created and the MIW is not reachable) , the other verifiers should be able to check and validate exisiting valid credentials from distributed databases, directory or DLT. The MIW  (also called "Custodian") provides a private/public key pair and related DID for a legal entity along with the onboarding.                                                                            |
| Discovery Service                  | The EDC / dataspace discovery interface is a CX network public available endpoint which can get used to retrieve EDC endpoints and the related BPNs, as well as search for endpoints via the BPN.                                                                                                                                                                                                                                                                         |

## Business Process

To realize the **Business Logic** described in the Quality Kit

![quality kit business process diagram](@site/static/img/quality-kit_business-logic-1_1.png)

all steps of the **Business Process** (described in
the [Development View](https://confluence.catena-x.net/display/BDPQ/WORK+IN+PROGRESS+-+Quality+KIT+-+Development+View)),
like data provisioning and consuming by the involved partner companies, are realized in compliance with
the [Catena-X Data Governance Framework](https://catena-x.net/en/catena-x-introduce-implement/governance-framework-for-data-space-operations).
Under this link you can find the latest version of the framework regulations as download. The documents are seperated in
the following levels:

**Data Space Level**: 10 Golden Rules of Catena-X

**Use Case Level
**: [Quality Management specific policy](https://catena-x.net/fileadmin/user_upload/04_Einfuehren_und_umsetzen/Governance_Framework/231016_Catena-X_Use_Case_Framework_Quality.pdf)
as download.

**Data Offering** and **Usage Level** are defined by bi-lateral aligned policies and contracts between the cooperating
partner companies. Content is currently in definition.

## Standards

Our relevant standards can be downloaded from the
official [Catena-X Standard Library:](https://catena-x.net/de/standard-library)

- [CX - 0018 Eclipse Data Space Connector EDC](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September23/CX-0018-EclipseDataConnector_EDC_-v.2.0.1.pdf))

- [CX - 0036 Semantic Model Quality Task](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0036_Semantic_Model_Quality_Task_v_1.0.1.pdf)

- [CX - 0037 Semantic Model Vehicle Product Description](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0037_Semantic_Model_Vehicle_Product_Description_v_1.0.1.pdf)

- [CX - 0038 Semantic Model Fleet Diagnostic Data](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0038_Semantic_Model_Fleet_Diagnostic_Data__v_1.0.1.pdf)

- [CX - 0039 Semantic Model Fleet Claim Data](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0039_Semantic_Model_Fleet_Claim_Data__v_1.0.1.pdf)

- [CX - 0040 Semantic Model Parts Analyses](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0040_Semantic_Model_Parts_Analyses_v_1.0.1.pdf)

- [CX - 0041 Semantic Model Manufactured Parts Quality Information](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/PLM_Quality_Use_Case_Live_Quality_Loops/CX_-_0041_Semantic_Model_Manufactured_Parts_Quality_Information_v_1.0.1.pdf)

- [CX - 0071 Triangle Quality Early Warning Field and Root Cause)](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0071-TriangleQualityEarlyWarningFieldandRootCause-v1.0.0.pdf)

- [CX - 0091 Aspect Model Fleet Vehicles](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September23/CX-0091-AspectModelFleetVehicles-v.1.0.0.pdf)

- [CX - 0092 Aspect Model Quality Task Attachment](https://catena-x.net/de/standard-library#top)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2023 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2023 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2023 SAP SE
- SPDX-FileCopyrightText: 2023,2023 Siemens AG
- SPDX-FileCopyrightText: 2023,2023 Volkswagen AG
