---
id: operation-view
title: Operation with the AI Service KIT
description: AI Service KIT - Operation View
sidebar_position: 1
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="ai-service" />

<!--
Operational View of the Kit.
-->

## Operation

The White Paper [AI Spaces: From Silos to Sovereign, Cross-Organizational Intelligence](https://global.fujitsu/en-global/technology/research/article/topics/202604-ai-spaces) defines three types of collaboration patterns (federated model development, inter-organizational inference, and autonomous agent collaboration). We simplify this into two categories in relation to AI Service KIT operation as below (which can be operated separately or combined according to the use case):

### 1. Exchanging Data to use in AI 

Companies or organizations exchange data as datasets such as CSV, TSV, or JSON files, or database tables. AI training or analysis is done after the data is transferred. Data exchange on the data plane can still leverage existing data plane plugins available as-is. In this case, AI Services in the form of a Web API are not required, but you can still use any AI-related policy, like the AI Act as defined in the AI Service KIT.

We have a sample of this operation in the Tractus-X SDK documentation [here](https://eclipse-tractusx.github.io/tractusx-sdk/main/tutorials/ai-tensorflow-integration/).

### 2. Exchanging Data in AI Service

In this case, the EDC Asset refers not to the data itself, but to the AI Service (Web API). This AI Service is defined by the protocols used. Examples include, but are not limited to, [A2A Protocol](https://a2a-protocol.org/latest/), [MCP](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro), API for frontier LLMs such as the OpenAI LLM API, or any custom protocol. In Asset (DCAT), we define the AI Service type, and data flows through the EDC Data Plane. This means the provider still controls the data flow to the consumer.

For interoperability, we also leverage existing formats to define the AI Service itself in the asset. This includes, but is not limited to, [A2A AgentCard](https://a2a-protocol.org/latest/specification/#441-agentcard), [AI Catalog](https://ai-catalog.io/), and [AGNTCY OASF](https://docs.agntcy.org/oasf/open-agentic-schema-framework/).

We are working on a simple demo for an A2A agent as an AI Service, which will be part of the Tractus-X SDK.

## Memo

In most cases, AI Service is a one-way communication. The provider provides the service, and the consumer consumes it. For two-way communication, such as multi-agent collaboration, one company/organization can serve as both provider and consumer at the same time.

## Limitations and Future Works

The current implementation of the HTTP Pull Data Plane can only use HTTP/S. The AI Service protocol may require WebSockets, SSE, gRPC, HTTP Streaming, etc. As part of our vision of not reinventing the wheel, we are considering using an existing API Gateway for the data plane in the near future.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 FUJITSU LIMITED
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation