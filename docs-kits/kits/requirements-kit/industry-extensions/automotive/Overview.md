---
id: automotive-extension
title: Automotive Industry Extension
sidebar_position: 1
---

<!--
 ********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
-->

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="requirements" />

<!--
KIT LOGO END
-->

## Automotive Industry Extension

This extension adapts the **Requirements KIT** for the automotive industry with Catena-X standards compliance.

:::info Extension Purpose
Adds: Catena-X standards, automotive semantic models, business processes, and policies.
:::

---

## Catena-X Standards

| Standard | Version | Description | Compliance |
|----------|---------|-------------|------------|
| CX-0001 | 2.0.0 | EDC Discovery API | Mandatory |
| CX-0002 | 2.0.0 | Digital Twins | Mandatory |
| CX-0018 | 3.0.0 | Dataspace Connectivity | Mandatory |
| CX-0126 | 3.0.0 | Industry Core: PartType 2.1.0 | Mandatory |
| CX-0151 | 3.0.0 | Industry Core: Basics v1.0.0 | Mandatory |
| CX-0152 | 3.0.0 | Policy Constraints for Data Exchange v1.0.0 | Mandatory |

[Link to Catena-X Standard Library](https://catenax-ev.github.io/docs/standards/overview)

---

## Semantic Models

### Serial Part (CX-0002)

**Version**: 3.0.0

**Aspect Model**: `urn:samm:io.catenax.serial_part:3.0.0#SerialPart`

**Key Attributes**: `catenaXId`, `localIdentifiers`, `manufacturingInformation`, `partTypeInformation`

**Example**:

```json
{
  "catenaXId": "urn:uuid:ed2ace5b-b25d-4e64-9b54-c2fb13c35a5c",
  "localIdentifiers": [
    {
      "key": "manufacturerPartId",
      "value": "95657362-83"
    }
  ],
  "manufacturingInformation": {
    "date": "2023-02-04T14:48:54",
    "country": "DEU"
  },
  "partTypeInformation": {
    "manufacturerPartId": "95657362-83",
    "nameAtManufacturer": "High Voltage Battery"
  }
}
```

[Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-models)

---

## Getting Started

1. Review [Core KIT Adoption View](../../adoption-view/adoption-view.md)
2. Study [Catena-X Standards](https://catenax-ev.github.io/docs/standards/overview)
3. Implement semantic models from [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-models)

---

## Resources

- [Catena-X Standard Library](https://catenax-ev.github.io/docs/standards/overview)
- [Tractus-X Open Source](https://eclipse-tractusx.github.io/)

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer IPK)
- SPDX-FileCopyrightText: 2025 Dräxlmaier GmbH & Co. KG
- SPDX-FileCopyrightText: 2025 Schaeffler AG
- SPDX-FileCopyrightText: 2025 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2025 ZF Friedrichshafen AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
