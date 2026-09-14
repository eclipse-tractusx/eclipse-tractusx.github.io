---
id: adoption-view
title: Adoption View
description: AI Service KIT
sidebar_position: 1
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';
import KitMetadataBadges from '@site/src/components/2.0/KitMetadataBadges';

<KitMetadataBadges kitId="ai-service" />
<Kit3DLogo kitId="ai-service" />

## Abstracts

Data Spaces and AI system work at different layers and for different purposes. Data Spaces provide the governance that AI system need. Please refer to the IDSA paper [Data Spaces and AI Trustworthy Agentic Participation in Data Spaces]() for more details.

Data Spaces technology implementation mainly focuses on the Connector, where you exchange data in a sovereign way. It includes asset/catalog registry management, policies for asset/catalog access, and policies for data usage. It also includes verifiable, certificate-based trust for participant identity and negotiation based on the asset registries, participant identity, and policies.

AI system ares are still evolving rapidly. This KIT includes artificial intelligence technologies ranging from traditional machine learning to recent Agentic AI.

The AI Service KIT integrates both technologies so users can benefit from both.

## Vision & Mission

### Vision

In combining both technologies, the vision for AI Service KIT is:
1. Not to reinvent the wheel. We use the current technologies, OSS projects, and/or any Standard or de facto standard as much as possible.
2. Make it easy for developers to integrate current or future technology, especially for AI system that are still evolving.
3. IT Vendor can still add and offer their own technology accordingly, while maintaining interoperability. One possibility is to provide security within the AI Agent itself.

### Mission

1. Define any interoperability requirements to combine Data Spaces and the AI system.
2. Some technologies might overlap between Data Spaces and the AI system. Provide a sample integration solution without changing the current technologies.
3. Provide easy-to-understand documentation.
4. Provide a working demo with any AI technology, which includes but is not limited to A2A Protocol, MCP, etc. Integrate the demo and any tools into the Tractus-X SDK so users can use them easily.

AI Service KIT make AI system bundled with *EDC Connector* (Based on [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/connector-kit/adoption-view/)) discoverable and usable within the Data Spaces ecosystem.

AI system exist in diverse forms, including LLMs (public and local), RAG applications that interact with LLMs, multi-agent systems connected via A2A, tools provided as MCP servers, etc.
To recognize AI system with such diverse forms, a unified notation method to express AI system as *Assets* is necessary.
This KIT provides notation rules and vocabulary to serve as guidelines for participants when registering their AI system as *Assets* while still using available technology format.

Furthermore, AI system involve numerous considerations for use due to their nature, such as AI-specific legal regulations and liability for damages resulting from judgment errors.
This KIT provides notation rules and semantics for expressing these considerations as *Usage Policy*.

These contributions bring interoperability and governance to participants' AI system in inter-company collaboration.

## Business Value

### Trust

Integrating the Data Spaces ecosystem with AI system builds trust, especially by adding a data-governance layer on top of AI system.
*EDC Connectors* robust participant identity verification mechanism makes it difficult for malicious actors to engage with the ecosystem surrounding the AI system. The policy mechanism adds access control for the asset/catalog and usage governance for data utilized in the AI system.
It reduces the cost for organizations to verify the trustworthiness of AI system providers when considering external AI system.

### Interoperability

*EDC Connectors* *Asset* representation capabilities possess sufficient flexibility to express AI system with diverse forms.
While this enables interoperability for discovery, it also benefits from leveraging existing AI service technology. This means the participant does not need to build another costly AI system.

### Risk Avoidance

Any inter-organizational entity considering AI system adoption must address AI-specific considerations, including compliance with AI-related laws, regulations, and guidelines such as the EU AI Act. This also applies to cross-border interchange.
Standardizing *Usage policy* for AI system reduces the cost for each organization to make sure the counterpart is in comply with these laws, regulation and guideline.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 FUJITSU LIMITED
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
