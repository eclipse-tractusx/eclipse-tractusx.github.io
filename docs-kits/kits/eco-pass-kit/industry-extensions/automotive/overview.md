---
id: automotive-extension
title: Automotive Industry Extension
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

This extension adapts the **EcoPass KIT** for the automotive industry with Catena-X standards compliance.

:::info Extension Purpose
Adds: Catena-X standards, automotive semantic models
:::

---

## Catena-X Standards

| Standard | Version | Description | Compliance |
|----------|---------|-------------|------------|
| CX-0001 | 2.0.0 | EDC Discovery API | Mandatory |
| CX-0002 | 2.0.0 | Digital Twins | Mandatory |
| CX-0003 | 1.2.0 | SAMM Aspect Meta Model | Mandatory |
| CX-0018 | 3.0.0 | Dataspace Connectivity | Mandatory |

[Link to Catena-X Standard Library](https://catenax-ev.github.io/docs/standards/overview)

---

## Semantic Models

### Model: Transmission Pass

**Version**: 3.1.0

**Namespace**: `urn:samm:io.catenax.transmission.transmission_pass:3.1.0#`

**Description**: The Transmission Pass corresponds to the Digital Product Passport information required by the proposed Ecodesign Regulation (ESPR-2022) and describes data collected and available during the lifespan of a transmission. It is structured into two top-level groups: `specific` for transmission-specific data (gear ratios, torque, power, oil, electrical performance, etc.) and `generic` which reuses the modules of the Generic Digital Product Passport (metadata, identification, characteristics, materials, sustainability, ...).

**Key Properties**:

| Property      | Type   | Required | Description                                                                                                                       |
|---------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `specVersion` | string | No       | Specification version (URN) of the Transmission Pass data model used.                                                             |
| `specific`    | object | Yes      | Transmission-specific parameters: drive type, gear ratios, torque, power, spreading, oil, torque converter, electrical performance, service history. |
| `generic`     | object | Yes      | Generic DPP modules reused for the transmission: `metadata`, `identification`, `characteristics`, `commercial`, `handling`, `operation`, `materials`, `sustainability`, `sources`. |

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "specific" : {
    "serviceHistory" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "oil" : {
      "oilType" : [ "Transmission Oil XY" ],
      "oilCapacity" : 8.9
    },
    "torqueConverter" : [ "NW 200 TTD" ],
    "driveType" : [ "full hybrid" ],
    "spreading" : 6.79,
    "torque" : 500,
    "power" : 300,
    "standardGearRatio" : [ {
      "gearRatio" : 4.1567,
      "gear" : "1"
    } ],
    "speedResistance" : [ {
      "ratedSpeed" : 7800,
      "gear" : "1"
    } ],
    "electricalPerformance" : {
      "applicable" : true,
      "electricalMachine" : {
        "torque" : {
          "max" : 180,
          "maximumAvailability" : 10,
          "continuous" : 178
        },
        "power" : {
          "max" : 22,
          "continuous" : 16,
          "maximumAvailability" : 10
        },
        "speed" : 16700,
        "voltage" : 52
      }
    }
  },
  "specVersion" : "urn:io.catenax.transmission.transmission_pass:3.1.0",
  "generic" : {
    "characteristics" : {
      "physicalDimension" : {
        "volume" : {
          "value" : 20.0,
          "unit" : "unit:cubicMetre"
        },
        "grossWeight" : {
          "value" : 20.0,
          "unit" : "unit:gram"
        },
        "diameter" : {
          "value" : 20.0,
          "unit" : "unit:millimetre"
        },
        "grossVolume" : {
          "value" : 20.0,
          "unit" : "unit:cubicMetre"
        },
        "width" : {
          "value" : 20.0,
          "unit" : "unit:millimetre"
        },
        "length" : {
          "value" : 20.0,
          "unit" : "unit:millimetre"
        },
        "weight" : {
          "value" : 20.0,
          "unit" : "unit:gram"
        },
        "height" : {
          "value" : 20.0,
          "unit" : "unit:millimetre"
        }
      },
      "warranty" : 60,
      "lifeTime" : 500000
    },
    "metadata" : {
      "backupReference" : "https://dummy.link",
      "registrationIdentifier" : "https://dummy.link/ID8283746239078",
      "economicOperatorId" : "BPNL0123456789ZZ",
      "lastModification" : "2000-01-01",
      "predecessor" : "urn:uuid:00000000-0000-0000-0000-000000000000",
      "issueDate" : "2000-01-01",
      "version" : "1.0.0",
      "passportIdentifier" : "urn:uuid:550e8400-e29b-41d4-a716-446655440000",
      "status" : "draft",
      "expirationDate" : "2030-01-01"
    },
    "commercial" : {
      "placedOnMarket" : "2000-01-01",
      "purpose" : [ "automotive" ]
    },
    "identification" : {
      "batch" : [ {
        "value" : "BID12345678",
        "key" : "batchId"
      } ],
      "codes" : [ {
        "value" : "8703 24 10 00",
        "key" : "TARIC"
      } ],
      "type" : {
        "manufacturerPartId" : "123-0.740-3434-A",
        "nameAtManufacturer" : "Mirror left"
      },
      "classification" : [ {
        "classificationStandard" : "GIN 20510-21513",
        "classificationID" : "1004712",
        "classificationDescription" : "Generic standard for classification of parts in the automotive industry."
      } ],
      "serial" : [ {
        "value" : "SN12345678",
        "key" : "partInstanceId"
      } ],
      "dataCarrier" : {
        "carrierType" : "QR",
        "carrierLayout" : "upper-left side"
      }
    },
    "sources" : [ {
      "header" : "Example Document XYZ",
      "category" : "Product Specifications",
      "type" : "URL",
      "content" : "https://dummy.link"
    } ],
    "materials" : {
      "substancesOfConcern" : {
        "applicable" : true,
        "content" : [ {
          "unit" : "unit:partPerMillion",
          "hazardClassification" : {
            "category" : "category 1A",
            "statement" : "Causes severe skin burns and eye damage.",
            "class" : "Skin corrosion"
          },
          "documentation" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ],
          "concentrationRange" : [ {
            "max" : 2.6,
            "min" : 2.1
          } ],
          "location" : "Housing",
          "concentration" : 5.3,
          "exemption" : "shall not apply to product x containing not more than 1,5 ml of liquid",
          "id" : [ {
            "type" : "CAS",
            "name" : "phenolphthalein",
            "id" : "201-004-7"
          } ]
        } ]
      },
      "materialComposition" : {
        "applicable" : true,
        "content" : [ {
          "unit" : "unit:partPerMillion",
          "recycled" : 12.5,
          "critical" : true,
          "renewable" : 23.5,
          "documentation" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ],
          "concentration" : 5.3,
          "id" : [ {
            "type" : "CAS",
            "name" : "phenolphthalein",
            "id" : "201-004-7"
          } ]
        } ]
      }
    },
    "handling" : {
      "applicable" : true,
      "content" : {
        "producer" : [ {
          "id" : "BPNL0123456789ZZ"
        } ],
        "sparePart" : [ {
          "manufacturerPartId" : "123-0.740-3434-A",
          "nameAtManufacturer" : "Mirror left"
        } ]
      }
    },
    "operation" : {
      "import" : {
        "applicable" : true,
        "content" : {
          "eori" : "GB123456789000",
          "id" : "BPNL0123456789ZZ"
        }
      },
      "other" : {
        "id" : "BPNL0123456789XX",
        "role" : "distributor"
      },
      "manufacturer" : {
        "facility" : [ {
          "facility" : "BPNA1234567890AA"
        } ],
        "manufacturingDate" : "2000-01-31",
        "manufacturer" : "BPNLxAfmasZuGnMg"
      }
    },
    "sustainability" : {
      "reparabilityScore" : "B",
      "productFootprint" : {
        "material" : [ {
          "lifecycle" : "main product production",
          "rulebook" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ],
          "unit" : "kg CO2 / kWh",
          "performanceClass" : "A",
          "manufacturingPlant" : [ {
            "facility" : "BPNA1234567890AA"
          } ],
          "type" : "Climate Change Total",
          "value" : 12.678,
          "declaration" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ]
        } ],
        "carbon" : [ {
          "lifecycle" : "main product production",
          "rulebook" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ],
          "unit" : "kg CO2 / kWh",
          "performanceClass" : "A",
          "manufacturingPlant" : [ {
            "facility" : "BPNA1234567890AA"
          } ],
          "type" : "Climate Change Total",
          "value" : 12.678,
          "declaration" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ]
        } ],
        "environmental" : [ {
          "lifecycle" : "main product production",
          "rulebook" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ],
          "unit" : "kg CO2 / kWh",
          "performanceClass" : "A",
          "manufacturingPlant" : [ {
            "facility" : "BPNA1234567890AA"
          } ],
          "type" : "Climate Change Total",
          "value" : 12.678,
          "declaration" : [ {
            "contentType" : "URL",
            "header" : "Example Document XYZ",
            "content" : "https://dummy.link"
          } ]
        } ]
      },
      "status" : "original",
      "durabilityScore" : "A"
    }
  }
}
```

</details>

---

## Getting Started

1. Review [Core KIT Adoption View](../../adoption-view/adoption-view.md)
2. Study [Catena-X Standards](https://catenax-ev.github.io/docs/standards/overview)
3. Implement semantic models from [Semantic Hub](https://semantics.catena-x.net/)

---

## Resources

- [Catena-X Standard Library](https://catenax-ev.github.io/docs/standards/overview)
- [Tractus-X Open Source](https://eclipse-tractusx.github.io/)

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2024 SAP SE
- SPDX-FileCopyrightText: 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer IPK)
- SPDX-FileCopyrightText: 2024 BASF SE
- SPDX-FileCopyrightText: 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
