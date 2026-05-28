---
id: development-view
title: Development View
description: 'Development View Material Accounting KIT'
sidebar_position: 3
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

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId='material-accounting' />

<!--
KIT LOGO END
-->

## Architecture Overview

The architecture of Material Accounting is designed for
decentralized and sovereign data exchange within the Catena-X
ecosystem. It enables different actors of the reverse value chain to
exchange material-related information in a standardized and
interoperable way without directly connecting their internal IT
systems.

The following diagram illustrates the high-level architecture of
Material Accounting and the interaction between participating
companies and Catena-X core services.

![architecture overview](../resources/Architecture-Overview-MaterialAccouting-KIT.svg)

Figure 1: Material Accounting Architecture Overview

The architecture is based on digital twins and semantic aspect
models that represent vehicles, component sets, components,
materials, and recycling processes. Each company acts either as a
data provider, a data consumer, or both, depending on its role
within the circular value chain.

Each participant operates its own systems and exchanges data through
an Eclipse Dataspace Connector (EDC). The EDC acts as a secure and
policy-controlled gateway that manages authentication,
authorization, and sovereign data exchange between partners. This
ensures that data is only shared with authorized participants and
according to agreed usage policies.

The exchanged information is structured through standardized
semantic models such as `VehicleInformation`, `Composition`,
`Material`, `WasteCode`, `RecyclingBatch`, and
`RecyclingInformation`. These models enable all actors to interpret
and process material-related information consistently across
organizational boundaries.

Whenever a physical process occurs — such as dismantling, transport,
recycling, or material transformation — corresponding digital
information is created or updated. The associated digital twins are
continuously enriched throughout the lifecycle, enabling
traceability of material flows and transparent tracking of secondary
materials.

## Data Exchange Flow

The Material Accounting data exchange follows the Catena-X
principles for sovereign and interoperable data sharing.
Material-related information is exchanged between participants of
the reverse value chain through standardized semantic models and
digital twins.

The following diagram illustrates the high-level data exchange flow
between actors participating in Material Accounting.

![Data Exchange Flow](../resources/DataExchangeFlow-MaterialAccounting-KIT.svg)

Figure 2: Data Exchange Flow Material Accounting.

### Flow Description

1. **Asset Registration and Identification**
   Physical assets such as vehicles, component sets, components, and
   materials are represented digitally using digital twins and
   globally unique identifiers. Existing Catena-X standards such as
   `PartInstance` and `SingleLevelBomAsBuilt` provide the structural
   foundation for linking these assets.

2. **Process Execution and Data Generation**
   As physical processes occur, such as dismantling, sorting,
   transport, recycling, or material transformation, relevant
   process and material information is generated. This includes
   process steps, material classifications, waste codes, batch
   information, and mass balances.

3. **Semantic Data Exchange**
   The generated information is exchanged between actors using
   standardized aspect models such as `VehicleInformation`,
   `Composition`, `Material`, `WasteCode`, `RecyclingBatch`, and
   `RecyclingInformation`. The exchanged data remains interoperable
   and machine-readable across company boundaries.

4. **End-of-Life Traceability and Data Enrichment**
   Throughout the reverse and forward value chain, digital twins are
   continuously enriched with additional information from
   participating actors. This enables traceability of material
   flows, verification of recycled content, and transparent tracking
   of secondary materials.

5. **Downstream Use Cases**
   The exchanged and verified material-related information can
   subsequently be used by downstream circular economy use cases
   such as Secondary Material Content (SMC) and the Digital Product
   Passport (DPP).

### Exchange Principles

The data exchange is based on:

- Sovereign data sharing via Eclipse Dataspace Connector (EDC)
- Standardized semantic models using SAMM
- Digital twin-based asset representation
- Policy-controlled access and usage agreements
- Cross-company interoperability according to Catena-X standards

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 BASF SE
- SPDX-FileCopyrightText: 2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2026 Brain of Materials AG
- SPDX-FileCopyrightText: 2026 Gestamp
- SPDX-FileCopyrightText: 2026 Technovative Solutions Limited
- SPDX-FileCopyrightText: 2026 LRP-Autorecycling Leipzig GmbH
- SPDX-FileCopyrightText: 2026 Asahi Kasei
- SPDX-FileCopyrightText: 2026 Interzero
- SPDX-FileCopyrightText: 2026 Circularise
- SPDX-FileCopyrightText: 2026 Containergrid GmbH
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
