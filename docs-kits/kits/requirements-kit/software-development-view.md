---
id: software-development-view-requirements-kit
title: Software Development View
description: 'Software Development View Requirements Kit'
sidebar_position: 4
---

# Software Development View

## Architecture

```mermaid

sequenceDiagram
    participant ReqIF1 as ReqIF
    participant BackendOEM as Backend OEM
    participant EDCOEM as EDC OEM
    participant EDCSupplier as EDC Supplier
    participant BackendSupplier as Backend Supplier
    participant ReqIF2 as ReqIF

    ReqIF1-->>BackendOEM: Create / Edit Request
    BackendOEM->>EDCOEM: /asset/{asset-id}
    EDCOEM->>EDCSupplier: Asset @type: Eng-Req
    EDCSupplier->>BackendSupplier: /notify/{asset-id}
    BackendSupplier->>EDCSupplier: Asset @type: Eng-Notify
    EDCSupplier->>EDCOEM: Asset @type: Eng-Notify
    EDCOEM->>BackendOEM: Asset @type: Eng-Req
    BackendOEM->>ReqIF1: Trigger New Asset Created / Changed

    ReqIF2-->>BackendSupplier: Create / Edit Request
    BackendSupplier->>EDCSupplier: Initiate Asset-Pull
    EDCSupplier->>EDCOEM: /asset/{asset-id}
    EDCOEM->>ReqIF2: Trigger New Asset Created / Changed
    ReqIF2->>BackendSupplier: Initiate Asset-Pull

```












## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Dräxlmaier GmbH & Co. KG
- SPDX-FileCopyrightText: 2025 Schaeffler AG
- SPDX-FileCopyrightText: 2025 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2025 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation