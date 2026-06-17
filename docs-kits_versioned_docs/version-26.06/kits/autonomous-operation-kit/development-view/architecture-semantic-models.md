---
id: architecture-semantic-models
title: Architecture and Semantic Models
description: 'Autonomous Operation and Remote Services KIT - Architecture and Semnatic Models'
sidebar_position: 1
---

<!--
Copyright(c) 2026 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
information regarding copyright ownership.

This work is made available under the terms of the
Creative Commons Attribution 4.0 International (CC-BY-4.0) license,
which is available at
https://creativecommons.org/licenses/by/4.0/legalcode.

SPDX-License-Identifier: CC-BY-4.0
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="autonomous-operation" />

## Architecture Overview

Autonomous Operation and Remote Services aims to enable resilient, highly efficient production operations through a digital ecosystem that allows remote, assisted and appropriate autonomous operation of highly automated manufacturing equipment.

For this procedure, a remote service operator needs standardized access to business applications of different stakeholders using the MX-Port. The MX-Port is a configurable and open concept that enables decentralized, trusted and secure data exchange as well as interoperability and economic scaling.  Using the MX-Port a remote service operator can monitor and control a machine with an interoperable and standardized operator panel. The operator panel enables seamless discovery and secure negotiation of access to machines within a federated, trusted data ecosystem. Through referenced assets, such as a machine’s bill of materials or its asset interface description, secure and controlled access to authorized third-party systems can be granted.

A typical sequence starts with asset publication by the machine operator, followed by catalog discovery and contract negotiation in the data space. Once access is granted, authorized services consume semantic models, runtime data or both. Diagnostic and optimization services produce recommendations, correction strategies or follow-up workflows, which are then executed locally, remotely or autonomously depending on policy and automation level.

## Semantic Models Overview

Autonomous Operation and Remote Services uses a set of semantic models that define how data is structured and what it means, ensuring systems can interpret information consistently and support autonomous operations. The table below lists the relevant semantic models. Not all submodels are mandatory; their selection depends on the specific phase(s) of implementation, allowing application of the models where they provide the most value.

| Name | Application| Role | Link |
| ---- | ---------- | ---- | -----|
| **Digital Nameplate** | Digital Nameplate (v3.0.1 - IDTA 02006 Digital Nameplate for Industrial Equipment) is provided by the machine manufacturer to supply identifying, descriptive and indicating information about an asset. | Machine Manufacturer,  <br/> Component Supplier | [v3.0.1 - IDTA 02006 Digital Nameplate for Industrial Equipment](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Digital%20nameplate/3/0) |
| **Bill-Of-Material** | Hierarchical Structures enabling Bills of Material (v1.1.1 - IDTA 02011 Hierarchical Structures enabling Bills of Material) is provided by the machine manufacturer.  Industrial equipment may be provided by partners in the value chain and can be composed of subsystems. These subsystems may provide own monitoring data that is necessary to ensure autonomous operation. Bill-of-Material is used to discover self-managed entities of a top-level device. For example, a partner may provide cameras for a machine. Bill-of-Material allows to discover these devices and to retrieve additional data from.| Machine Manufacturer,  <br/> Component Supplier| [v1.1.1 - IDTA 02011 Hierarchical Structures enabling Bills of Material](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Hierarchical%20Structures%20enabling%20Bills%20of%20Material) |
| **Asset Interfaces Description** | Asset Interfaces Description (v1.0 - IDTA 02017-1-0 Asset Interfaces Description) is provided by the machine builder to allow readable information about the interface belonging to the asset. Based on this information it is possible to initiate a connection and start to request, subscribe or perform operations. Such information contains metadata and respective endpoints. For example, a machine owner can use this information to connect to a server (e.g. OPC UA) and interpret the data. | Machine Builder,  <br/> Component Supplier | [v1.0 - IDTA 02017-1-0 Asset Interfaces Description](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Asset%20Interfaces%20Description/1/0) |
| **Situation Log** | Situation Log contains a structured set of all occurred symptoms within a specific operational context. Each entry is related to a monitored error or abnormal condition. It is used to support fault correlation, root-cause analysis, and corrective decision-making. | Machine Owner | TBP |
| **SymptomDescription** | SymptomDescription is provided by the machine/component builder to describe the observed symptoms of faults that have already occurred and allows them to be modeled independently, as they may appear multiple times in different constellations, situations, or across various hardware components. | Machine Builder,  <br/> Component Supplier | TBP |
| **FaultDescription** | FaultDescription is provided by the machine builder that contains the detailed description of the fault itself, including its contextual information, and references the associated symptoms without duplicating their data. | Machine Builder,  <br/> Component Supplier | TBP |
| **Similarity Analysis** | Similarity Analysis compares various situations (part of SituationLog) and compares it with existing faults to indicate how similar situation is with a respective fault. | Service Provider | TBP |
| **Time Series Data** | Time Series Data contains real-time and historical sensor and process data. It is used for monitoring, trend analysis, and anomaly detection | Machine Owner | [v1.1 - IDTA 02008-1-1 Time Series Data](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Time%20Series%20Data/1/1) |
| **Technical Data** | Technical Data contains machine configuration, parameters, and technical specifications. It is used for diagnostics, validation, and parameter verification | Machine Builder,  <br/> Component Supplier | [v2.0 - IDTA 02003 Generic Frame for Technical Data for Industrial Equipment in Manufacturing](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Technical_Data/2/0) |
| **Handover Documentation** | Handover Documentation contains commissioning data, setup information, and operational instructions. It is used to understand system configuration and operational constraints. | Machine Builder,  <br/> Component Supplier,  <br/> Knowledge Management Service | [v2.0 - IDTA 02004 Handover Documentation](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Handover%20Documentation/2/0) |
| **Production Log** | Production Log contains records of production runs, events, warnings, and faults. It is used for traceability, root-cause analysis, and performance evaluation | Machine Owner | TBP |
| **Material Data** | Material Data contains information about the material of the part to be manufactured, including type, properties, and batch. It may be used for fault analysis and corrective action decisions. | Machine Builder,  <br/> Component Supplier | TBP |
| **Capabilities** | Capabilities are provided by the machine builder to describe, in an abstract manner, what the machine is capable of performing. This information enables the machine owner to derive appropriate operational strategies or actions, supporting flexible and autonomous operation. | Machine Builder,  <br/> Component Supplier,  <br/> Machine Owner | TBP |
| **Fault Correction Set** | Fault Correction Set contains predefined correction strategies associated with specific faults. It defines recommended actions, parameters, or workflows to resolve detected issues. It may include automated and operator-triggered corrective measures. It is used to guide or execute corrective actions during remote operation | Machine Builder,  <br/> Component Supplier,  <br/> Machine Owner | TBP |
| **Intelligent Information for Use** | Intelligent Information for Use provides structured and semantically enriched information that supports users in operating, maintaining, and troubleshooting assets. It organizes contextual knowledge such as operating conditions, potential fault situations, and recommended corrective actions so that both humans and digital applications can efficiently access and use this information for assistance systems, diagnostics, and knowledge-based services. | Knowledge Management Service | [v1.0 - IDTA 02063 Intelligent Information for Use](https://github.com/admin-shell-io/submodel-templates/tree/main/published/Intelligent%20Information%20%20for%20Use/1/0) |
| **OPC UA Machinery** | It enables the structured exchange of machine status data (e.g., running, idle, error) and serves as a core input for monitoring and fault detection within Autonomous Operation and Remote Services. | Machine Owner,  <br/> Machine Builder | [Machinery Basic Building Blocks - 4.2.3.3 Companion Specifications](https://reference.opcfoundation.org/Machinery/v102/docs/4.2.3.3) |
| **OPC UA Machine Tools** | It represents machine tool-specific information for monitoring, job execution, and alarm handling. It includes standardized AlertTypes for warnings and faults, enabling precise fault identification and supporting the execution of corrective actions. | Machine Owner,  <br/> Machine Builder | [Machine Tools - Monitoring and Job Management](https://reference.opcfoundation.org/MachineTool/v102/docs/) |

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 DMG MORI AG
- SPDX-FileCopyrightText: 2026 Empolis Information Management GmbH
- SPDX-FileCopyrightText: 2026 IFW Leibniz Universität Hannover
- SPDX-FileCopyrightText: 2026 inovex GmbH
- SPDX-FileCopyrightText: 2026 prenode GmbH
- SPDX-FileCopyrightText: 2026 proALPHA GmbH
- SPDX-FileCopyrightText: 2026 Siemens AG
- SPDX-FileCopyrightText: 2026 Technologie-Initiative SmartFactory KL e. V.
- SPDX-FileCopyrightText: 2026 TRUMPF Werkzeugmaschinen SE + Co. KG
- SPDX-FileCopyrightText: 2026 VDMA e. V.
- SPDX-FileCopyrightText: 2026 WITTENSTEIN SE
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
