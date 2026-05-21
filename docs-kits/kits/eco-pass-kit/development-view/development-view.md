---
id: development-view
title: Development View
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

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="eco-pass" />

<!--
KIT LOGO END
-->

Technical documentation for developers, architects, and implementers.

:::info Target Audience
Software Developers, Solution Architects, Technical Leads, API Developers, Integration Engineers.
:::


### More Guides

[LINK TO THE OTHER FILES IN THIS VIEW IN CASE THERE ARE MORE]

- [Business Architecture](architecture.md)

### General Development Information

The developer view provides developers with resources to utilize the EcoPass KIT effectively. On the one side developers can learn how to integrate the EcoPass KIT into their applications and to make use of the product passport exchanging feature via the Catena-X network. On the other side, IT-Administrators will learn how to provide the needed passport data and which components are required.
Thereby, this KIT covers various aspects, starting from how the available API Endpoints can be utilized for data models and how to make them available in the Catena-x Data Space.

### Core Components

#### Component 1: Digital Twin Registry

**Purpose**: An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. Responsible for having the Digital Twins of the provider and indicating the endpoints to the Passport Aspects.

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]


#### Component 2: Submodel Server

**Purpose**: The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0. Where the Passport Aspects are stored

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]

#### Component 3: EDC

**Purpose**: Main gateway to the network. In this use case two EDC need be existing, one connected to the Digital Product Pass (EcoPass KIT) [EDC Consumer] and another to the Provider Catena-X components [EDC Provider]

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]



---

## Sequence Diagrams

### Data Retrieval Flow

In order to achieve a better understanding of the EcoPass KIT data retrieval flow, we can detail a specific example where an user wants to retrieve a specific passport for a asset in Catena-X using the EcoPass KIT.

In the data retrieval flow example below we will imagine that an user wants to retrieve the data related to a Catena-X Digital Product Pass ID he has in his product as form of QR Code and ID:

[![Sequence Diagram](../resources/development-view/developmentview-sequence-diagramm.svg)](../resources/development-view/developmentview-sequence-diagramm.svg)

---

## Semantic Models

### Model: [Model Name]

**Version**: X.Y.Z

**Namespace**: `urn:samm:org.eclipse.tractusx.[domain]:[version]#`

**Description**: [Model description]

**Key Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `property1` | string | Yes | [Description] |
| `property2` | integer | No | [Description] |

**Example**:

```json
{
  "@context": {
    "@vocab": "urn:samm:org.eclipse.tractusx.[domain]:[version]#"
  },
  "property1": "value1",
  "property2": 42
}
```

**Reference**: [Link to SAMM specification]

---

## Test Cases

### Test Strategy

- **Unit Tests**: Component-level testing
- **Integration Tests**: API integration testing
- **End-to-End Tests**: Complete workflow testing

### Test Case: [Test Name]

**Objective**: [Test validation purpose]

**Preconditions**: [Required setup]

**Test Steps**: [Brief description]

**Expected Outcome**: [Expected result]

---

## Sample Data

### Sample Dataset: [Dataset Name]

**Purpose**: [Sample purpose]

**Format**: JSON

**Download**: [Link]

**Example**:

```json
{
  "sampleData": [
    {
      "id": "sample-001",
      "field1": "value1"
    }
  ]
}
```

---

## Additional Resources

### Reference Implementations

:::warning deprecated reference application
The reference application has been deprecated.
You can find the old source at [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass).
Similar development is happening for the [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub).
:::

- Industry Core Hub with its EcoPass KIT Feature: https://github.com/eclipse-tractusx/industry-core-hub

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024, 2026 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. für ihre Institute IPK
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
