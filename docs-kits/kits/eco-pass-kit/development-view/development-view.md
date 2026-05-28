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

## More Guides

- [Business Architecture](architecture.md)

## General Development Information

The developer view provides developers with resources to utilize the EcoPass KIT effectively. On the one side developers can learn how to integrate the EcoPass KIT into their applications and to make use of the product passport exchanging feature via the Catena-X network. On the other side, IT-Administrators will learn how to provide the needed passport data and which components are required.
Thereby, this KIT covers various aspects, starting from how the available API Endpoints can be utilized for data models and how to make them available in the Catena-X Data Space.

## Core Components

### Component 1: Digital Twin Registry

**Purpose**: An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. Responsible for having the Digital Twins of the provider and indicating the endpoints to the Passport Aspects.

### Component 2: Submodel Server

**Purpose**: The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0. Where the Passport Aspects are stored

### Component 3: EDC

**Purpose**: Main gateway to the network. In this use case two EDCs need to exist, one connected to the Digital Product Pass (EcoPass KIT) [EDC Consumer] and another to the Provider Catena-X components [EDC Provider]

---

## Sequence Diagrams

### Data Retrieval Flow

In order to achieve a better understanding of the EcoPass KIT data retrieval flow, we can detail a specific example where a user wants to retrieve a specific passport for an asset in Catena-X using the EcoPass KIT.

In the data retrieval flow example below we will imagine that a user wants to retrieve the data related to a Catena-X Digital Product Pass ID he has in his product in the form of a QR Code and ID:

[![Sequence Diagram](../resources/development-view/developmentview-sequence-diagramm.svg)](../resources/development-view/developmentview-sequence-diagramm.svg)

---

## Semantic Models

### Model: Generic Digital Product Passport

**Version**: 6.1.0

**Namespace**: `urn:samm:io.catenax.generic.digital_product_passport:6.1.0#`

**Description**: Digital Product Passports address three needs by the industry: First, they gather all relevant information about a product in a single, digital tool. Second, digital product passports answer increasing regulatory requirements and demand for sustainability information along the value chain of a product. And third, Digital product passports are crucial enablers for circular economies due to their ability to provide comprehensive and transparent information about the lifecycle of automotive products. They play a critical role by fostering transparency, enhancing recycling and reuse, improving maintenance and repairs, and facilitating regulatory compliance.

**Key Properties**:

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `metadata` | object | Yes | Passport metadata: identifier, version, status, issue/expiration dates, language, economic operator. |
| `identification` | object | Yes | Product identification: serial, batch, part type, classification, codes and data carrier. |
| `operation` | object | Yes | Operational information: manufacturer, importer and other operators. |
| `handling` | object | Yes | Handling information such as producer and spare-part references. |
| `characteristics` | object | Yes | Physical characteristics: lifespan, dimensions, physical state, performance class. |
| `commercial` | object | Yes | Commercial information: placement on market, purchase order, recall information, purpose. |
| `materials` | object | Yes | Substances of concern and material composition. |
| `sustainability` | object | Yes | Reparability, durability, status and product environmental/carbon footprint. |
| `sources` | array | Yes | Reference documents (compliance, manuals, certificates, etc.). |
| `additionalData` | array | No | Open-ended additional attributes for forward-compatible regulatory extensions. |

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "metadata" : {
    "backupReference" : "https://dummy.link",
    "specVersion" : "urn:io.catenax.generic.digital_product_passport:6.1.0",
    "registrationIdentifier" : "https://dummy.link/ID8283746239078",
    "economicOperatorId" : "BPNL0123456789ZZ",
    "lastModification" : "2000-01-01",
    "language" : "EN",
    "predecessor" : "urn:uuid:00000000-0000-0000-0000-000000000000",
    "issueDate" : "2000-01-01",
    "version" : "1.0.0",
    "passportIdentifier" : "urn:uuid:550e8400-e29b-41d4-a716-446655440000",
    "status" : "draft",
    "expirationDate" : "2030-01-01"
  },
  "characteristics" : {
    "generalPerformanceClass" : "A",
    "physicalState" : "solid",
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
    "lifespan" : [ {
      "value" : 36,
      "unit" : "unit:day",
      "key" : "guaranteed lifetime"
    } ]
  },
  "commercial" : {
    "placedOnMarket" : "2000-01-01",
    "purchaseOrder" : "eOMtThyhVNLWUZNRcBaQKxI",
    "purpose" : [ "automotive" ],
    "recallInformation" : {
      "recallInformationDocumentation" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "applicable" : true
    }
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
  "additionalData" : [ {
    "description" : "Description of an attribute",
    "label" : "Maximum permitted battery power",
    "type" : {
      "typeUnit" : "unit:volume",
      "dataType" : "array"
    },
    "data" : "23",
    "children" : [ {
      "description" : "Description of an attribute",
      "label" : "Maximum permitted battery power",
      "type" : {
        "typeUnit" : "unit:volume",
        "dataType" : "array"
      },
      "data" : "23"
    } ]
  } ],
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
      "manufacturer" : "BPNLbi7tAJ8UiMsF"
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
```

</details>

### Model: Battery Pass

**Version**: 6.1.0

**Namespace**: `urn:samm:io.catenax.battery.battery_pass:6.1.0#`

**Description**: The Battery Pass describes information collected during the lifecycle of a battery. The model is heavily based on Regulation (EU) 2023/1542 (the EU Battery Regulation) and additionally incorporates attributes from the proposal for the Ecodesign for Sustainable Products Regulation. It builds on the Generic Digital Product Passport by reusing its `metadata`, `commercial` and `handling` modules and adds battery-specific information such as performance, conformity, safety and hazardous/active material data.

**Key Properties**:

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `specVersion` | string | No | Specification version (URN) of the Battery Pass data model used. |
| `metadata` | object | Yes | Passport metadata (reused from Generic DPP): identifier, version, status, dates, economic operator. |
| `identification` | object | Yes | Battery identification: chemistry, DMC, category (SLI/EV/…), and the embedded part identification block. |
| `characteristics` | object | Yes | Physical dimensions and warranty information. |
| `commercial` | object | Yes | Commercial information (reused from Generic DPP). |
| `handling` | object | Yes | Handling information (reused from Generic DPP). |
| `operation` | object | Yes | Operational information: manufacturer, into-service date. |
| `materials` | object | Yes | Material composition plus hazardous (Cd, Hg, Pb, …) and active materials (Ni, Li, Co, …) details. |
| `performance` | object | Yes | Rated performance and dynamic (in-use) performance data: capacity, power, voltage, resistance, lifetime, SoC. |
| `sustainability` | object | Yes | Carbon footprint and sustainability-related documents. |
| `safety` | object | Yes | Safety information: extinguishing agents, safe discharging, dismantling, labels. |
| `conformity` | object | Yes | Declaration of conformity, test reports, third-party assurance, due diligence policy. |
| `sources` | array | No | Reference documents. |

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "specVersion" : "urn:io.catenax.battery.battery_pass:6.1.0",
  "characteristics" : {
    "physicalDimension" : {
      "length" : {
        "value" : 20.0,
        "unit" : "unit:millimetre"
      },
      "width" : {
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
    "warranty" : {
      "lifeValue" : 36,
      "lifeUnit" : "unit:day"
    }
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
  "sources" : [ {
    "header" : "Example Document XYZ",
    "category" : "Product Specifications",
    "type" : "URL",
    "content" : "https://dummy.link"
  } ],
  "sustainability" : {
    "documents" : {
      "separateCollection" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "sustainabilityReport" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "euTaxonomyDisclosureStatement" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "wastePrevention" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "carbonFootprint" : [ {
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
    "status" : "original"
  },
  "identification" : {
    "chemistry" : "Nickel Cobalt Manganese (NCM)",
    "idDmc" : "34567890",
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
    "category" : "SLI"
  },
  "performance" : {
    "rated" : {
      "roundTripEfficiency" : {
        "depthOfDischarge" : 90.5,
        "temperature" : 20.0,
        "50PercentLife" : 89.0,
        "initial" : 96.0
      },
      "selfDischargingRate" : 0.25,
      "performanceDocument" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "testReport" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "temperature" : {
        "lower" : -18.0,
        "upper" : 60.0
      },
      "lifetime" : {
        "report" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "cycleLifeTesting" : {
          "temperature" : 20.0,
          "depthOfDischarge" : 90.5,
          "appliedDischargeRate" : 4.0,
          "cycles" : 1500,
          "appliedChargeRate" : 3.0
        },
        "expectedYears" : 8
      },
      "power" : {
        "at20SoC" : 35000.0,
        "temperature" : 20.0,
        "value" : 40000.0,
        "at80SoC" : 39000.0
      },
      "resistance" : {
        "temperature" : 20.0,
        "cell" : 0.025,
        "pack" : 0.55,
        "module" : 0.2
      },
      "voltage" : {
        "temperature" : 20.0,
        "min" : 2.5,
        "nominal" : 3.7,
        "max" : 4.2
      },
      "energy" : {
        "temperature" : 20.0,
        "value" : 0.5
      },
      "capacity" : {
        "temperature" : 20.0,
        "value" : 4.0,
        "thresholdExhaustion" : 80.0
      }
    },
    "dynamic" : {
      "selfDischargingRate" : 0.25,
      "roundTripEfficiency" : {
        "remaining" : {
          "value" : 50.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "fade" : {
          "value" : 50.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        }
      },
      "operatingEnvironment" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "stateOfCharge" : {
        "value" : 50.0,
        "time" : "2023-12-07T10:39:13.576+01:00"
      },
      "performanceDocument" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "fullCycles" : {
        "value" : 1500,
        "time" : "2023-12-07T10:39:13.576+01:00"
      },
      "power" : {
        "remaining" : {
          "value" : 40000.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "fade" : {
          "value" : 50.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        }
      },
      "negativeEvents" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "resistance" : {
        "increase" : {
          "cell" : {
            "value" : 50.0,
            "time" : "2023-12-07T10:39:13.576+01:00"
          },
          "pack" : {
            "value" : 50.0,
            "time" : "2023-12-07T10:39:13.576+01:00"
          },
          "module" : {
            "value" : 50.0,
            "time" : "2023-12-07T10:39:13.576+01:00"
          }
        },
        "remaining" : {
          "cell" : {
            "value" : 0.3,
            "time" : "2023-12-07T10:39:13.576+01:00"
          },
          "pack" : {
            "value" : 0.3,
            "time" : "2023-12-07T10:39:13.576+01:00"
          },
          "module" : {
            "value" : 0.3,
            "time" : "2023-12-07T10:39:13.576+01:00"
          }
        }
      },
      "capacity" : {
        "fade" : {
          "value" : 50.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "throughput" : {
          "value" : 4.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "capacity" : {
          "value" : 4.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        }
      },
      "energy" : {
        "remaining" : {
          "value" : 0.5,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "soce" : {
          "value" : 50.0,
          "time" : "2023-12-07T10:39:13.576+01:00"
        },
        "throughput" : {
          "value" : 0.5,
          "time" : "2023-12-07T10:39:13.576+01:00"
        }
      }
    }
  },
  "materials" : {
    "hazardous" : {
      "cadmium" : {
        "concentration" : 5.3,
        "location" : "Housing",
        "critical" : true,
        "impactOfSubstances" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "materialUnit" : "unit:partPerMillion",
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      },
      "other" : [ {
        "critical" : true,
        "impactOfSubstances" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "concentration" : 5.3,
        "materialIdentification" : [ {
          "type" : "CAS",
          "name" : "phenolphthalein",
          "id" : "201-004-7"
        } ],
        "location" : "Housing",
        "materialUnit" : "unit:partPerMillion"
      } ],
      "mercury" : {
        "concentration" : 5.3,
        "location" : "Housing",
        "critical" : true,
        "impactOfSubstances" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "materialUnit" : "unit:partPerMillion",
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      },
      "lead" : {
        "recycled" : 12.5,
        "critical" : true,
        "impactOfSubstances" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "location" : "Housing",
        "concentration" : 5.3,
        "materialUnit" : "unit:partPerMillion"
      }
    },
    "active" : {
      "nickel" : {
        "location" : "Housing",
        "recycled" : 12.5,
        "critical" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      },
      "lithium" : {
        "location" : "Housing",
        "recycled" : 12.5,
        "critical" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      },
      "cobalt" : {
        "location" : "Housing",
        "recycled" : 12.5,
        "critical" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      },
      "other" : [ {
        "location" : "Housing",
        "materialIdentification" : [ {
          "type" : "CAS",
          "name" : "phenolphthalein",
          "id" : "201-004-7"
        } ],
        "recycled" : 12.5,
        "critical" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      } ],
      "lead" : {
        "recycled" : 12.5,
        "critical" : true,
        "impactOfSubstances" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "location" : "Housing",
        "concentration" : 5.3,
        "materialUnit" : "unit:partPerMillion"
      }
    },
    "composition" : [ {
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
      "location" : "Housing",
      "id" : [ {
        "type" : "CAS",
        "name" : "phenolphthalein",
        "id" : "201-004-7"
      } ]
    } ]
  },
  "safety" : {
    "usableExtinguishAgent" : [ {
      "fireClass" : "A, B",
      "document" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "media" : "Dry Powder"
    } ],
    "safeDischarging" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "meaningOfLabels" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "dismantling" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "removalFromAppliance" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "safetyMeasures" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ]
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
  "conformity" : {
    "declarationOfConformityId" : "0978234-34567890-01",
    "thirdPartyAssurance" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "resultOfTestReport" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "declarationOfConformity" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ],
    "dueDiligencePolicy" : [ {
      "contentType" : "URL",
      "header" : "Example Document XYZ",
      "content" : "https://dummy.link"
    } ]
  },
  "operation" : {
    "intoServiceDate" : "7172-75-08",
    "manufacturer" : {
      "facility" : [ {
        "facility" : "BPNA1234567890AA"
      } ],
      "manufacturingDate" : "2000-01-31",
      "manufacturer" : "BPNLLJMv5rieVicu"
    }
  }
}
```

</details>

### Model: Chemical Material Passport

**Version**: 3.0.0

**Namespace**: `urn:samm:io.catenax.material.chemical_material_passport:3.0.0#`

**Description**: The Chemical Material Passport plays the same role as a Digital Product Passport for chemical substances and materials, providing detailed information on sustainability, safety, hazards and waste management. It replaces multi-channel data exchange (safety data sheets, compliance docs, certificates of analysis, etc.) with a single streamlined data flow. Like the Transmission Pass, the model is split into `specific` (chemical-specific data such as safety, compliance, hazard assessment, SDS, transport, disposal) and `generic` (reused DPP modules).

**Key Properties**:

| Property | Type | Required | Description |
| ---------- | ------ | -------- | ----------- |
| `specific` | object | Yes | Chemical-specific data: `safety`, `compliance`, `parameter`, `hazardAssessment`, `safetyDataSheetDocumentation`, `transport`, `productType`, `disposal`, `complianceDocumentation`. |
| `generic` | object | Yes | Generic DPP modules reused for the chemical material: `metadata`, `identification`, `characteristics`, `commercial`, `materials`, `operation`, `sustainability`, `sources`. |

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "specific" : {
    "safety" : {
      "emergencyPhone" : {
        "number" : "+49111222333",
        "availability" : "Only available during the following office hours: xx - xx"
      },
      "firstAidDocument" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "documentation" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "compliance" : {
      "complianceCountry" : [ "UK" ],
      "complianceRemark" : "If you need more information about the (pre-)registration status, please get in contact with our experts from the Compliance Team: www.xyz.com",
      "complianceReasonForExemption" : [ "Radioactive substance" ],
      "complianceResult" : true,
      "complianceRegulationName" : [ "UK -REACH regulation" ]
    },
    "parameter" : {
      "parameterBeforeUse" : [ {
        "result" : "positive",
        "unit" : "unit:percent",
        "method" : [ {
          "parameterMethodName" : "Directive 2004/42/CE",
          "parameterMethodConditions" : "50 degree celsius",
          "parameterMethodDescription" : "Evaporation in oven."
        } ],
        "testGLPCompliance" : false,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "name" : "VOC content",
        "remark" : "not applicable",
        "value" : "95.5",
        "classificationStatement" : [ "Risk of explosion if heated under confinement" ]
      } ],
      "parameterAfterUse" : {
        "applicable" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      }
    },
    "hazardAssessment" : {
      "classification" : [ {
        "route" : "oral",
        "hazardous" : true,
        "statement" : "Causes severe skin burns and eye damage.",
        "rule" : "CLP Regulation (EC) No 1272/2008",
        "remark" : "No additional information available",
        "category" : "category 1A",
        "class" : "Skin corrosion"
      } ],
      "labeling" : {
        "hazardPictogram" : [ {
          "name" : "Corrosive",
          "image" : "https://example.link",
          "code" : "GHS05"
        } ],
        "signalWord" : "Danger",
        "hazard" : [ {
          "code" : "H220",
          "text" : "Extremely flammable gas"
        } ],
        "precautionary" : {
          "code" : "P103",
          "text" : "Read label before use."
        },
        "supplementalRequirements" : [ {
          "code" : "XYZ",
          "text" : "Substance is phototoxic.",
          "notes" : "The substance can react dangerously with: alcohols",
          "pictogram" : "https://example.link"
        } ]
      },
      "documentation" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "safetyDataSheetDocumentation" : {
      "hasSafetyDataSheetBinary" : [ {
        "language" : "de",
        "issueDate" : "2023-03-28",
        "payload" : "3ZXRqhY=",
        "issueVersion" : "8.1",
        "previousVersion" : "8.0",
        "applicableToCountry" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ]
      } ]
    },
    "transport" : {
      "unTransport" : [ {
        "unShippingName" : "ORGANIC PEROXIDE TYPE C, LIQUID, TEMPERATURE CONTROLLED (Tert-BUTYL PEROXY-2-ETHYLHEXANOATE)",
        "unLimitedQuantityUnit" : "unit:piece",
        "unExceptedQuantityCode" : "E0",
        "unSpecialProvisionsCode" : [ {
          "code" : 274,
          "text" : "The provision of 3.1.2.8 apply"
        } ],
        "unPackagingGroup" : "I",
        "unHazardClassCode" : 5.2,
        "environmentallyHazardous" : [ "Marine pollutant" ],
        "unNumber" : "3113",
        "transportRegulation" : "ADR - Agreement concerning the International Carriage of Dangerous Goods by Road",
        "unHazardClassName" : "Oxidising substances",
        "unLimitedQuantityValue" : 5.0
      } ],
      "productTransport" : {
        "emergencyTemperatureMax" : 35.0,
        "controlTemperature" : "20 - 25 C",
        "other" : "Not permitted for transport",
        "emergencyTemperatureMin" : -20.0,
        "pictogram" : [ "https://example.link" ]
      }
    },
    "productType" : "substance",
    "disposal" : {
      "wasteCode" : {
        "regulation" : "European List of Waste acc. Regulation (EC) No 1013/2006",
        "description" : "waste paint and varnish containing organic solvents or other hazardous substances",
        "code" : "08 01 11*"
      },
      "packaging" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "beforeUse" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "afterUse" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "complianceDocumentation" : {
      "hasCertificateOfAnalysisSheetPreFormatted" : {
        "payloadPreFormatted" : "ZU9NdFRoeWhWTkxXVVpOUmNCYVFLeEk=",
        "format" : "json",
        "formatLink" : "https://github.com/material-identity/CoA-schemas/blob/main/schema.json",
        "language" : "de",
        "issueDate" : "2023-03-28",
        "formatVersion" : "1.1.0",
        "issueVersion" : "8.1"
      },
      "hasTechnicalInformationBinary" : [ {
        "country" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ],
        "language" : "\"de\"",
        "issueDate" : "2023-03-28",
        "payload" : "SnhreXZSbkw=",
        "issueVersion" : "8.1"
      } ],
      "hasCertificateOfAnalysisBinary" : [ {
        "language" : "de",
        "issueDate" : "2023-03-28",
        "payload" : "eWVkVXNGd2RrZWxRYnhlVGVRT3ZhU2NmcUlPT21hYQ==",
        "issueVersion" : "8.1"
      } ],
      "hasCertificateOfAnalysisLink" : [ {
        "link" : "https://www.company.com/coa/240242892.pdf",
        "language" : "de",
        "issueDate" : "2023-03-28",
        "issueVersion" : "8.1"
      } ],
      "hasTechnicalInformationLink" : [ {
        "link" : "https://www.company.com/sds/240242892.pdf",
        "country" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ],
        "language" : "\"de\"",
        "issueDate" : "2023-03-28",
        "issueVersion" : "8.1"
      } ]
    }
  },
  "generic" : {
    "characteristics" : {
      "generalPerformanceClass" : "A",
      "physicalState" : "solid",
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
      "lifespan" : [ {
        "value" : 36,
        "unit" : "unit:day",
        "key" : "guaranteed lifetime"
      } ]
    },
    "commercial" : {
      "placedOnMarket" : "2000-01-01",
      "purchaseOrder" : "RYtGKbgicZaHCBRQDSx",
      "purpose" : [ "automotive" ],
      "recallInformation" : {
        "recallInformationDocumentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "applicable" : true
      }
    },
    "metadata" : {
      "backupReference" : "https://dummy.link",
      "registrationIdentifier" : "https://dummy.link/ID8283746239078",
      "economicOperatorId" : "BPNL0123456789ZZ",
      "lastModification" : "2000-01-01",
      "language" : "EN",
      "predecessor" : "urn:uuid:00000000-0000-0000-0000-000000000000",
      "issueDate" : "2000-01-01",
      "version" : "1.0.0",
      "passportIdentifier" : "urn:uuid:550e8400-e29b-41d4-a716-446655440000",
      "status" : "draft",
      "expirationDate" : "2030-01-01"
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
        "manufacturer" : "BPNL82ejYua1GFJ2"
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

### Model: Battery Passport Part 1: Battery Nameplate

**Version**: 1.0.0

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.digital_nameplate:1.0.0#`

**Description**: Contains the nameplate information attached to the product within the Battery Product Passport.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "URIOfTheProduct" : "https://dc-qr.com/?m=R123456789",
  "ManufacturerName" : {
    "de" : "Muster AG"
  },
  "AddressInformation" : {
    "RoleOfContactPerson" : "technical contact",
    "NationalCode" : {
      "en" : "DE"
    },
    "Languages" : "en",
    "TimeZone" : "-12:00",
    "CityTown" : {
      "de" : "Musterstadt"
    },
    "Company" : {
      "en" : "ABC Company"
    },
    "Department" : {
      "de" : "Vertrieb"
    },
    "Phone" : {
      "TelephoneNumber" : {
        "de" : "+491234567890"
      },
      "TypeOfTelephone" : "office",
      "AvailableTime" : {
        "de" : "Montag – Freitag 08:00 bis 16:00"
      }
    },
    "Fax" : {
      "FaxNumber" : {
        "de" : "+491234567890"
      },
      "TypeOfFaxNumber" : "office"
    },
    "Email" : {
      "EmailAddress" : "email@muster-ag.de",
      "PublicKey" : {
        "en" : "0x07"
      },
      "TypeOfEmailAddress" : "office",
      "TypeOfPublicKey" : {
        "en" : "RSA"
      }
    },
    "IPCommunicationChannels" : [ {
      "AddressOfAdditionalLink" : "QxXK0wMaoq",
      "TypeOfCommunication" : "Chat",
      "availableTime" : {
        "de" : "Montag – Freitag 08:00 bis 16:00"
      }
    } ],
    "Street" : {
      "de" : "Musterstrasse 1"
    },
    "ZipCode" : {
      "de" : "12345"
    },
    "POBox" : {
      "de" : "PF 1234"
    },
    "ZipCodeOfPOBox" : {
      "de" : "12345"
    },
    "StateCounty" : {
      "de" : "Muster-Bundesland"
    },
    "NameOfContact" : {
      "en" : "Doe"
    },
    "FirstName" : {
      "en" : "Jane"
    },
    "MiddleNames" : {
      "en" : "M."
    },
    "Title" : {
      "en" : "Mrs."
    },
    "AcademicTitle" : {
      "en" : "PhD"
    },
    "FurtherDetailsOfContact" : {
      "de" : "-"
    },
    "AddressOfAdditionalLink" : "https://example.com/information/product/1224/contact"
  },
  "SerialNumber" : "A12345-X75EN",
  "DateOfManufacture" : "2022-01-01",
  "DateOfPuttingIntoService" : "2022-06-01",
  "UniqueFacilityIdentifier" : "987654321",
  "LifeCycleStage" : "original",
  "OperatorIdentifier" : "QizvSaagg",
  "ManufacturerIdentifier" : "f8",
  "Markings" : [ {
    "MarkingName" : "0173-1%2307-DAA603%23004",
    "DesignationOfCertificateOrApproval" : "KEMA99IECE X1105/128",
    "IssueDate" : "2022-01-01",
    "ExpiryDate" : "2022-01-01",
    "MarkingFile" : {
      "value" : "https://example.com/SafetyInstructions.pdf",
      "contentType" : "application/pdf"
    },
    "MarkingAdditionalText" : "0044"
  } ],
  "EUDeclarationOfConformity" : [ "uwO" ],
  "ResultsOfTestReportsProvingCompliance" : [ "Q" ]
}```

</details>

### Model: Chemical Material Passport

**Version**: 3.0.0

**Namespace**: `urn:samm:io.catenax.material.chemical_material_passport:3.0.0#`

**Description**: The Chemical Material Passport plays the same role as a Digital Product Passport for chemical substances and materials, providing detailed information on sustainability, safety, hazards and waste management. It replaces multi-channel data exchange (safety data sheets, compliance docs, certificates of analysis, etc.) with a single streamlined data flow. Like the Transmission Pass, the model is split into `specific` (chemical-specific data such as safety, compliance, hazard assessment, SDS, transport, disposal) and `generic` (reused DPP modules).

**Key Properties**:

| Property   | Type   | Required | Description                                                                                                                                                       |
|------------|--------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `specific` | object | Yes      | Chemical-specific data: `safety`, `compliance`, `parameter`, `hazardAssessment`, `safetyDataSheetDocumentation`, `transport`, `productType`, `disposal`, `complianceDocumentation`. |
| `generic`  | object | Yes      | Generic DPP modules reused for the chemical material: `metadata`, `identification`, `characteristics`, `commercial`, `materials`, `operation`, `sustainability`, `sources`. |

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "specific" : {
    "safety" : {
      "emergencyPhone" : {
        "number" : "+49111222333",
        "availability" : "Only available during the following office hours: xx - xx"
      },
      "firstAidDocument" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "documentation" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "compliance" : {
      "complianceCountry" : [ "UK" ],
      "complianceRemark" : "If you need more information about the (pre-)registration status, please get in contact with our experts from the Compliance Team: www.xyz.com",
      "complianceReasonForExemption" : [ "Radioactive substance" ],
      "complianceResult" : true,
      "complianceRegulationName" : [ "UK -REACH regulation" ]
    },
    "parameter" : {
      "parameterBeforeUse" : [ {
        "result" : "positive",
        "unit" : "unit:percent",
        "method" : [ {
          "parameterMethodName" : "Directive 2004/42/CE",
          "parameterMethodConditions" : "50 degree celsius",
          "parameterMethodDescription" : "Evaporation in oven."
        } ],
        "testGLPCompliance" : false,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "name" : "VOC content",
        "remark" : "not applicable",
        "value" : "95.5",
        "classificationStatement" : [ "Risk of explosion if heated under confinement" ]
      } ],
      "parameterAfterUse" : {
        "applicable" : true,
        "documentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ]
      }
    },
    "hazardAssessment" : {
      "classification" : [ {
        "route" : "oral",
        "hazardous" : true,
        "statement" : "Causes severe skin burns and eye damage.",
        "rule" : "CLP Regulation (EC) No 1272/2008",
        "remark" : "No additional information available",
        "category" : "category 1A",
        "class" : "Skin corrosion"
      } ],
      "labeling" : {
        "hazardPictogram" : [ {
          "name" : "Corrosive",
          "image" : "https://example.link",
          "code" : "GHS05"
        } ],
        "signalWord" : "Danger",
        "hazard" : [ {
          "code" : "H220",
          "text" : "Extremely flammable gas"
        } ],
        "precautionary" : {
          "code" : "P103",
          "text" : "Read label before use."
        },
        "supplementalRequirements" : [ {
          "code" : "XYZ",
          "text" : "Substance is phototoxic.",
          "notes" : "The substance can react dangerously with: alcohols",
          "pictogram" : "https://example.link"
        } ]
      },
      "documentation" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "safetyDataSheetDocumentation" : {
      "hasSafetyDataSheetBinary" : [ {
        "language" : "de",
        "issueDate" : "2023-03-28",
        "payload" : "3ZXRqhY=",
        "issueVersion" : "8.1",
        "previousVersion" : "8.0",
        "applicableToCountry" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ]
      } ]
    },
    "transport" : {
      "unTransport" : [ {
        "unShippingName" : "ORGANIC PEROXIDE TYPE C, LIQUID, TEMPERATURE CONTROLLED (Tert-BUTYL PEROXY-2-ETHYLHEXANOATE)",
        "unLimitedQuantityUnit" : "unit:piece",
        "unExceptedQuantityCode" : "E0",
        "unSpecialProvisionsCode" : [ {
          "code" : 274,
          "text" : "The provision of 3.1.2.8 apply"
        } ],
        "unPackagingGroup" : "I",
        "unHazardClassCode" : 5.2,
        "environmentallyHazardous" : [ "Marine pollutant" ],
        "unNumber" : "3113",
        "transportRegulation" : "ADR - Agreement concerning the International Carriage of Dangerous Goods by Road",
        "unHazardClassName" : "Oxidising substances",
        "unLimitedQuantityValue" : 5.0
      } ],
      "productTransport" : {
        "emergencyTemperatureMax" : 35.0,
        "controlTemperature" : "20 - 25 C",
        "other" : "Not permitted for transport",
        "emergencyTemperatureMin" : -20.0,
        "pictogram" : [ "https://example.link" ]
      }
    },
    "productType" : "substance",
    "disposal" : {
      "wasteCode" : {
        "regulation" : "European List of Waste acc. Regulation (EC) No 1013/2006",
        "description" : "waste paint and varnish containing organic solvents or other hazardous substances",
        "code" : "08 01 11*"
      },
      "packaging" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "beforeUse" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ],
      "afterUse" : [ {
        "contentType" : "URL",
        "header" : "Example Document XYZ",
        "content" : "https://dummy.link"
      } ]
    },
    "complianceDocumentation" : {
      "hasCertificateOfAnalysisSheetPreFormatted" : {
        "payloadPreFormatted" : "ZU9NdFRoeWhWTkxXVVpOUmNCYVFLeEk=",
        "format" : "json",
        "formatLink" : "https://github.com/material-identity/CoA-schemas/blob/main/schema.json",
        "language" : "de",
        "issueDate" : "2023-03-28",
        "formatVersion" : "1.1.0",
        "issueVersion" : "8.1"
      },
      "hasTechnicalInformationBinary" : [ {
        "country" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ],
        "language" : "\"de\"",
        "issueDate" : "2023-03-28",
        "payload" : "SnhreXZSbkw=",
        "issueVersion" : "8.1"
      } ],
      "hasCertificateOfAnalysisBinary" : [ {
        "language" : "de",
        "issueDate" : "2023-03-28",
        "payload" : "eWVkVXNGd2RrZWxRYnhlVGVRT3ZhU2NmcUlPT21hYQ==",
        "issueVersion" : "8.1"
      } ],
      "hasCertificateOfAnalysisLink" : [ {
        "link" : "https://www.company.com/coa/240242892.pdf",
        "language" : "de",
        "issueDate" : "2023-03-28",
        "issueVersion" : "8.1"
      } ],
      "hasTechnicalInformationLink" : [ {
        "link" : "https://www.company.com/sds/240242892.pdf",
        "country" : [ {
          "name" : "Germany",
          "alpha3Code" : "DEU"
        } ],
        "language" : "\"de\"",
        "issueDate" : "2023-03-28",
        "issueVersion" : "8.1"
      } ]
    }
  },
  "generic" : {
    "characteristics" : {
      "generalPerformanceClass" : "A",
      "physicalState" : "solid",
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
      "lifespan" : [ {
        "value" : 36,
        "unit" : "unit:day",
        "key" : "guaranteed lifetime"
      } ]
    },
    "commercial" : {
      "placedOnMarket" : "2000-01-01",
      "purchaseOrder" : "RYtGKbgicZaHCBRQDSx",
      "purpose" : [ "automotive" ],
      "recallInformation" : {
        "recallInformationDocumentation" : [ {
          "contentType" : "URL",
          "header" : "Example Document XYZ",
          "content" : "https://dummy.link"
        } ],
        "applicable" : true
      }
    },
    "metadata" : {
      "backupReference" : "https://dummy.link",
      "registrationIdentifier" : "https://dummy.link/ID8283746239078",
      "economicOperatorId" : "BPNL0123456789ZZ",
      "lastModification" : "2000-01-01",
      "language" : "EN",
      "predecessor" : "urn:uuid:00000000-0000-0000-0000-000000000000",
      "issueDate" : "2000-01-01",
      "version" : "1.0.0",
      "passportIdentifier" : "urn:uuid:550e8400-e29b-41d4-a716-446655440000",
      "status" : "draft",
      "expirationDate" : "2030-01-01"
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
        "manufacturer" : "BPNL82ejYua1GFJ2"
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

### Model: Battery Passport Part 2: Handover Documentation

**Version**: 1.0.0

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.handover_documentation:1.0.0#`

**Description**: Handover Documentation defines a set of meta data for the handover of documentation from the operator to the users of the Battery Passport.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "Documents" : [ {
    "DocumentIds" : [ {
      "DocumentDomainId" : "1213455566",
      "DocumentIdentifier" : "XF90-884",
      "DocumentIsPrimary" : true
    } ],
    "DocumentClassifications" : [ {
      "ClassId" : "03-02",
      "ClassName" : [ {
        "de" : "VLy"
      } ],
      "ClassificationSystem" : "VDI2770 Blatt 1:2020"
    } ],
    "DocumentVersions" : [ {
      "Language" : "en",
      "Version" : "V1.2",
      "Title" : [ {
        "de" : "mDTy"
      } ],
      "Subtitle" : [ {
        "en" : "jqqQ6Qxi"
      } ],
      "Description" : [ {
        "de" : "bOblvfNSj4"
      } ],
      "DigitalFiles" : [ {
        "value" : "https://example.com/SafetyInstructions.pdf",
        "contentType" : "application/pdf"
      } ]
    } ]
  } ]
}
```

</details>

### Model: Battery Passport Part 3: Product Carbon Footprint

**Version**: 1.0.0

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.carbon_footprint:1.0.0#`

**Description**: Provides the means to access the Carbon Footprint of the asset in the context of a Battery Passport.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "ProductCarbonFootprints" : [ {
    "PcfCalculationMethods" : "ISO 14067",
    "PcfCo2eq" : 17.2,
    "ReferenceImpactUnitForCalculation" : "piece",
    "QuantityOfMeasureForCalculation" : 5.0,
    "LifeCyclePhases" : "C4 - landfill",
    "PerformanceClass" : "B+",
    "WebLinkToPublicCarbonFootprintStudy" : [ "l" ]
  } ]
}
```

</details>

### Model: Battery Passport Part 4: Technical Data

**Version**: 1.0.1

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.technical_data:1.0.1#`

**Description**: Technical data of the asset and associated product classificatons.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "GeneralInformation" : {
    "ManufacturerName" : "sQoGGV3",
    "CompanyLogo" : "https://example.com/wRdNTyS",
    "ManufacturerIdentifier" : "2s0xV8Vmw",
    "WarrantyInformation" : {
      "WarrantyPeriod" : "P96M"
    },
    "BatteryCategory" : "ev",
    "BatteryMass" : 1007.0,
    "ProductImages" : [ {
      "ImageFile" : {
        "value" : "https://example.com/SafetyInstructions.pdf",
        "contentType" : "application/pdf"
      },
      "ImageNote" : [ {
        "en" : "yPc3Sn5ns"
      } ]
    } ]
  },
  "TechnicalPropertyAreas" : {
    "CapacityEnergyVoltage" : {
      "NominalVoltage" : 4.3,
      "MinVoltage" : 2.04,
      "MaxVoltage" : 6.0,
      "RatedCapacity" : 210.0,
      "CapacityFade" : 10.0,
      "CertifiedUsableBatteryEnergy" : 100.0
    },
    "RoundTripEnergyEfficiency" : {
      "InitialRoundTripEnergyEfficiency" : 100,
      "RoundTripEnergyEfficiencyAt50PercentOfCycleLife" : 100,
      "EnergyRoundTripEfficiencyFade" : 10.0,
      "InitialSelfDischargingRate" : 2
    },
    "Resistance" : {
      "InitialInternalResistanceAtBatteryCellLevel" : 67.0,
      "InitialInternalResistanceAtBatteryPackLevel" : 23.0,
      "InitialInternalResistanceAtBatteryModuleLevel" : 10.0,
      "InternalResistanceIncreaseAtBatteryCellLevel" : 10,
      "InternalResistanceIncreaseAtBatteryPackLevel" : 10,
      "InternalResistanceIncreaseAtBatteryModuleLevel" : 10
    },
    "PowerCapability" : {
      "MaximumPermittedBatteryPower" : 1.797693E38,
      "PowerFade" : 23.0,
      "RatioNominalBatteryPowerAndBatteryEnergy" : 0.611,
      "OriginalPowerCapability" : [ {
        "atSoC" : 80.0,
        "powerCapabilityAt" : 500.0
      } ]
    },
    "Temperature" : {
      "TemperatureRangeIdleState_LowerBoundary" : 49.0,
      "TemperatureRangeIdleState_UpperBoundary" : -19.0
    },
    "Lifetime" : {
      "ExpectedLifetimeInCalendarYears" : 15,
      "ExpectedNumberOfCycles" : 1000,
      "CapacityThresholdExhaustion" : 23.0,
      "CycleLifeReferenceTest" : [ "hIIjyfZ" ],
      "CrateOfRelevantCycleLifeTest" : -57931.4
    }
  }
}
```

</details>

### Model: Battery Passport Part 5: Product Condition

**Version**: 1.0.1

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.product_condition:1.0.1#`

**Description**: Covers all battery lifetime relevant properties.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "EnergyThroughput" : {
    "EnergyThroughputValue" : 100000.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "CapacityThroughput" : {
    "CapacityThroughputValue" : 214.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "NumberOfFullCycles" : {
    "NumberOfFullCyclesValue" : 600,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "StateOfCertifiedEnergy" : {
    "StateOfCertifiedEnergyValue" : 70.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "RemainingEnergy" : {
    "RemainingEnergyValue" : 30.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "RemainingCapacity" : {
    "RemainingCapacityValue" : 56.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "NegativeEvents" : [ {
    "NegativeEventValue" : "overcharged",
    "LastUpdate" : "2000-01-01T14:23:00"
  } ],
  "InformationOnAccidents" : [ "P2" ],
  "TemperatureInformation" : {
    "MeasuredTemp" : 20.0,
    "TimeExtremeHighTemp" : 0.0,
    "TimeExtremeLowTemp" : 0.0,
    "TimeExtremeHighTempCharging" : 0.0,
    "TimeExtremeLowTempCharging" : 0.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "RemainingPowerCapability" : {
    "RemainingPowerCapabilityValue" : {
      "RPCLastUpdated" : "2000-01-01T14:23:00",
      "AtSoC" : 80.0,
      "PowerCapabilityAt" : 95.0
    },
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "EvolutionOfSelfDischarge" : {
    "EvolutionOfSelfDischargeValue" : 1.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "CurrentSelfDischargingRate" : {
    "CurrentSelfDischargingRateValue" : 2.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "RemainingRoundTripEnergyEfficiency" : {
    "RemainingRoundTripEnergyEfficiencyValue" : 80.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  },
  "StateOfCharge" : {
    "StateOfChargeValue" : 70.0,
    "LastUpdate" : "2000-01-01T14:23:00"
  }
}
```

</details>

### Model: Battery Passport Part 6: Material Composition

**Version**: 1.0.1

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.material_composition:1.0.1#`

**Description**: Mandatory data: Battery chemistry; critical raw materials; materials used in the cathode, anode, and electrolyte; hazardous substances; impact of substances on the environment and on human health or safety.

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "BatteryChemistry" : {
    "ShortName" : "NMC",
    "ClearName" : "Lithium nickel manganese cobalt oxides"
  },
  "BatteryMaterials" : [ {
    "BatteryMaterialLocation" : {
      "ComponentName" : "Anode",
      "ComponentId" : "1234-344"
    },
    "BatteryMaterialIdentifier" : "346417-97-8",
    "BatteryMaterialName" : "Lithium",
    "BatteryMaterialMass" : 52.0,
    "IsCriticalRawMaterial" : true
  } ],
  "HazardousSubstances" : [ {
    "HazardousSubstanceClass" : "SkinCorrosionOrIrritation",
    "HazardousSubstanceName" : "Cobalt (Co)",
    "HazardousSubstanceIdentifier" : "346417-97-8",
    "HazardousSubstanceConcentration" : 20.0,
    "HazardousSubstanceImpact" : [ "xP15" ],
    "HazardousSubstanceLocation" : { }
  } ]
}
```

</details>

### Model: Battery Passport Part 7: Circularity

**Version**: 1.0.0

**Namespace**: `urn:samm:io.admin-shell.idta.batterypass.circularity:1.0.0#`

**Description**: Dismantling information (including at least: exploded diagrams of the battery system/pack showing the location of battery cells; disassembly sequences; type and number of fastening techniques to be unlocked; tools required for disassembly; warnings if risk of damaging parts exists; amount of cells used and layout); part numbers for components and contact details of sources for replacement spares; safety measures. see (Annex XIII (2b-d)); usable extinguishing agent (Annex VI, Part A(9)).

**Example**:

<details>
  <summary>Payload</summary>

```json
{
  "DismantlingAndRemovalInformation" : [ "d0Dds" ],
  "SparePartSources" : [ {
    "NameOfSupplier" : {
      "en" : "ABC Company"
    },
    "AddressOfSupplier" : {
      "NationalCode" : {
        "en" : "DE"
      },
      "PostalCode" : {
        "de" : "DE-10719"
      },
      "Street" : {
        "de" : "Musterstrasse 1"
      }
    },
    "EmailAddressOfSupplier" : {
      "EmailAddress" : "email@muster-ag.de",
      "PublicKey" : {
        "en" : "0x07"
      },
      "TypeOfEmailAddress" : "office",
      "TypeOfPublicKey" : {
        "en" : "RSA"
      }
    },
    "SupplierWebAddress" : "https://example.com/information/product/1224/contact",
    "Components" : [ {
      "PartName" : "Cell",
      "PartNumber" : "PnYAVw"
    } ]
  } ],
  "RecycledContentInformation" : [ {
    "PreConsumerShare" : 77.21,
    "RecycledMaterial" : "Cobalt",
    "PostConsumerShare" : 67.28
  } ],
  "SafetyMeasures" : {
    "SafetyInstructions" : [ "2WoCFW" ],
    "ExtinguishingAgents" : [ "0ds2fkjV" ]
  },
  "EndOfLifeInformation" : {
    "WastePrevention" : [ "ojb" ],
    "SeparateCollection" : [ "Z9" ],
    "InformationOnCollection" : [ "caavIHWpl" ]
  },
  "RenewableContent" : -12143.4
}
```

</details>

## Additional Resources

### Reference Implementations

:::warning deprecated reference application
The reference application has been deprecated.
You can find the old source at [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass).
Similar development is happening for the [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub).
:::

- Industry Core Hub with its EcoPass KIT Feature: [Industry Core Hub Github Page](https://github.com/eclipse-tractusx/industry-core-hub)

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024, 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer IPK)
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
