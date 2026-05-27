---
id: adoption-view
title: Adoption View
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

import Kit3DLogo from "@site/src/components/2.0/Kit3DLogo";

<Kit3DLogo kitId="eco-pass" />

<!--
KIT LOGO END
-->

Welcome to the **EcoPass KIT Adoption View**. This view provides business value, strategic benefits, and use cases for business stakeholders and decision-makers.

:::info Target Audience
Business Managers, Product Owners, Solution Architects, Industry Experts, and Decision Makers.
:::

## Vision & Mission

### Vision

:::note Vision Statement
The **EcoPass KIT** will enable the distribution and usage of Digital Product Passports in Data Spaces.
:::

The EcoPass KIT will be the key enabler for various stakeholders to use digital product passports, which represent a digital collection of specific information about a physical product in a standardized exchange format. This data is governed by agreed-upon ownership and access rights, which are conveyed through the Eclipse Data Space Connector (EDC). The primary purpose of the product passport is to enable the electronic registration, processing and sharing of product-related details among various entities in the supply chain, including several businesses and authorities. The demand for interoperable product passports exists worldwide, driven by the need to establish sustainable and transparent supply chains across different types of products, for which the adoption of standards will become crucial.
It shall support the aggregation of product information relevant for Product Passports as well as the consuming of Product Passport information for specific business needs.

### Mission

:::note Mission Statement
This KIT shall guide Business Managers, Product Owners, Solution Architects, Industry Experts, and Decision Makers in their evaluation of Data Spaces for Digital Product Passport use cases.
:::

This KIT provides a comprehensive overview of the business context and benefits of product passports.

- Offer guidelines for industry stakeholders.
- Provide a detailed description and offer tools to implement product passports.

---

## Business Value

### Value Proposition #1: Data Sovereignty

The Catena-X EcoPass KIT aims to empower participants to share product pass-related data in a secure and sovereign way while ensuring the interoperability of the different applications involved in the process.
To achieve this, the relevant Catena-X standards and data models are referenced, explained, and placed within a broader context of business processes.

**Benefit**: [Primary benefit description]

**Target Stakeholders**: [OEMs | SMEs | Solution Providers | etc.]

**Measurable Outcomes**: [Key metrics]

### Value of standardization

Using Catena‑X data models and standards for the battery passport is particularly valuable because they create a consistent and verifiable foundation for battery-related data across the entire lifecycle.

- **Consistency of battery data**: The battery passport requires comparable information (e.g., CO₂ footprint, material composition). Catena‑X provides harmonized data formats and calculation rules, ensuring that all partners deliver data in the same structure and logic.
- **End-to-end traceability**: Standardized data models enable continuous tracking of battery information across all supply chain tiers, which is essential for documenting origin, production, and lifecycle data required by regulation.
- **Reliable aggregation of data**: Battery passport data must be collected, aggregated, and validated across multiple contributors. With shared standards, this can be done without reformatting or recalculating data at each step.
- **Regulatory readiness**: The battery passport will become mandatory (e.g., upcoming EU regulation), and standardized data models ensure that required information is structured, auditable, and compliant from the beginning.
- **Cost savings through standardization**: Catena‑X data models eliminate the need for individual data formats, conversions, and repeated validations when exchanging battery passport information between partners. In addition, battery ecosystems typically involve a large number of partners across multiple tiers. By using a common standard, companies can reuse the same data model and integration approach for all partners, instead of building separate solutions for each connection. This significantly reduces implementation and maintenance effort across the network.

In short: Catena‑X standards make battery passport data consistent, traceable, and regulation-ready across all partners, which is essential for implementing the battery passport efficiently.

### Benefits to suppliers and OEMs

- **Standardized structure for regulatory battery passport data**: Catena‑X defines a clear and agreed structure for all required battery passport data elements (e.g., carbon footprint, material composition, lifecycle data). This ensures that OEMs and battery suppliers can provide exactly the required information in a consistent format, without having to interpret regulatory requirements individually.
- **Efficient verification and auditability**: Battery passport data must be auditable and verifiable across multiple contributors. By using a shared standard, OEMs and suppliers ensure that data is structured in a way that supports validation, certification, and regulatory checks without additional rework at each step.
- **Cost reduction through reuse and scalability**: As outlined above, implementing battery passport requirements typically involves many partners across the supply chain. By using Catena‑X standards, OEMs and battery suppliers can apply the same data model and processes for all partners, avoiding individual solutions and repeated integration efforts.

### Benefits to software vendors

- **Reduced customer integration effort**: Catena‑X connects OEMs, suppliers, and service providers in a shared data space. Supporting its standards allows software vendors to integrate directly into this ecosystem and serve multiple customers with one solution, instead of building isolated, customer-specific implementations.
- **Interoperability as a key differentiator**: Catena‑X enables standardized and interoperable data exchange across the entire value chain, allowing certified solutions to seamlessly exchange battery passport data with other systems. This makes solutions more attractive to customers.

### How can the EcoPass KIT help to address regulatory challenges?

- Manufacturers are required to disclose information regarding the environmental impact of their products under the European Union's (EU) Ecodesign Directive. The EcoPass KIT can assist producers in adhering to this rule by offering a digital record of the environmental impact of their products.
- Companies are required to provide information regarding their efforts to address forced labor and human trafficking in their supply chains under the California Transparency in Supply Chains Act (CTSCA). The EcoPass KIT's digital record of a company's supply chain operations can assist businesses to comply with this law.
- Certain manufacturers of products are required to take back and recycle their products at the end of their functional lifespans under the German Waste Management Act (Kreislaufwirtschaftsgesetz). The EcoPass KIT, which offers a digital record of the goods that have been returned and recycled, can assist producers in adhering to this obligation.

### Summary of Business Benefits

| Stakeholder Type | Key Benefits | Time to Value |
|------------------|--------------|---------------|
| **OEMs** | [List 2-3 benefits for large enterprises] | [e.g., "6 months"] |
| **SMEs** | [List 2-3 benefits for small-medium enterprises] | [e.g., "3 months"] |
| **Solution Providers** | [List 2-3 benefits for tech vendors] | [e.g., "90 days"] |
| **Data Providers** | [List 2-3 benefits for data providers] | [e.g., "4 weeks"] |

---

## Use Case Context

### Industry Challenge

[Describe current industry problems and pain points]

**Current Challenges:**

- **Challenge 1**: [Problem description and impact]
- **Challenge 2**: [Problem description and impact]
- **Challenge 3**: [Problem description and impact]

### The Solution

[Explain how this KIT addresses the challenges]

**Solution Components:**

1. **[Component 1]**: [Description]
2. **[Component 2]**: [Description]
3. **[Component 3]**: [Description]

---

## Use Cases

### Battery Pass: A real-world example

In the automotive industry, a Battery Passport or Digital Product Passport for batteries plays a crucial role in ensuring transparency, traceability, and sustainability in the battery supply chain. Here's a real-world example of how a digital product passport might be set up for a battery used in electric vehicles (EVs), including its benefits, illustrated below:

![BP realWorldExample](../resources/adoption-view/adoption-view-BatteryPass_a_example.svg)

1. **Battery Manufacturing**: During the production stage, the battery manufacturer collects and records relevant data, such as the battery's unique identifier, type and model, manufacturing date and location, energy capacity and raw materials composition, including the content of critical elements like lithium, cobalt and nickel.
2. **Supply Chain Transparency**: Information about the battery's sourcing, manufacturing and distribution processes is documented, ensuring compliance with environmental and social standards. This includes data on the origin of raw materials, labor practices and the environmental footprint of each stage of the supply chain.
3. **Vehicle Integration**: When the battery is integrated into an electric vehicle, the Battery Pass is linked to the car's unique identification number (VIN), allowing seamless tracking and communication between the battery, the vehicle and relevant stakeholders.
4. **In-Use Performance Tracking**: As the vehicle is used, the Battery Pass continuously collects data on the battery's performance, such as its state of charge, charging cycles and degradation over time. This information is essential for the vehicle owner, car manufacturer and service providers to monitor the battery's health and optimize its lifespan.
5. **End-of-Life Management**: When the battery reaches the end of its useful life, the Battery Passport provides detailed instructions for proper disposal and recycling, ensuring compliance with regulations and facilitating the recovery of valuable materials. The data stored in the Battery Passport helps recycling facilities to efficiently process the battery, reducing waste and promoting a circular economy.

Throughout this process, the Battery Passport serves as a single, secure, and easily accessible source of information for various stakeholders, such as vehicle manufacturers, suppliers, service providers, regulators and vehicle owners. By implementing a digital product passport like the Battery Pass in the automotive industry, companies can promote transparency, traceability, and sustainability, ultimately contributing to a more eco-friendly and circular economy.

### Battery Pass: Catena-X Standard explained

The CX‑0160 Battery Passport standard specifies how battery‑related information is modeled, provisioned, discovered and accessed within the Catena‑X dataspace for:

- Traction, industrial and similar batteries that fall under the scope of the EU Battery Regulation or comparable regulatory schemes.
- End‑to‑end lifecycle usage within the automotive battery value chain (manufacturing, use phase, second‑life, end‑of‑life and recycling).
- Provisioning of both complete digital battery passports and partial, lifecycle‑specific data contributions, based on Catena‑X digital twins and the joint Catena‑X/IDTA Battery Passport aspect models.

The standard distinguishes three different use cases:

- Use Case (1) - Provisioning of near-complete battery passport: Typically used in situations where the data provider manufactures the battery, but the battery passport will be published by the data consumer. This can happen depending on the contractual situation and depending on who is the economic operator of the battery and who is putting it onto the EU market.
- Use Case (2) - component supplier integration (for example cells, housing, battery packs): Typically used to provide data from a component supplier to a battery manufacturer.
- Use Case (3) - DPP-Service provider view: Complete exchange of DPPs to service provider, which provides it public.

Please note that Use Case 2 is not available in the current version of the standard and will be added later.

---

## Semantic Models

### Core Semantic Models

| Model Name                                      | Version | Purpose                                                                                                                                                                                                    | Link      |
| ----------------------------------------------- | ------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------- |
| io.catenax.generic.digital_product_passport     | 6.1.0   | Generic Digital Product Passport (DPP) – baseline model for any product passport in Catena-X, covering metadata, identification, characteristics, sustainability, materials and commercial information.    | [Link][1] |
| io.catenax.battery.battery_pass                 | 6.1.0   | Battery Passport aspect model aligned with the EU Battery Regulation; used for traction, industrial and similar batteries across the full lifecycle.                                                       | [Link][2] |
| io.catenax.transmission.transmission_pass       | 3.1.0   | Transmission Passport – product passport variant for vehicle transmissions, reusing the DPP structure for transmission-specific lifecycle and component data.                                              | [Link][3] |
| io.catenax.material.chemical_material_passport  | 3.0.0   | Chemical Material Passport – passport-style model for chemical substances and materials, providing composition and safety-relevant information used as input to product passports.                         | [Link][4] |

[1]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.generic.digital_product_passport/6.1.0
[2]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.battery.battery_pass/6.1.0
[3]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.transmission.transmission_pass/3.1.0
[4]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.material.chemical_material_passport/3.0.0

### Model Example: `io.catenax.generic.digital_product_passport`

**Description**: Digital Product Passports address three needs by the industry: First, they gather all relevant information about a product in a single, digital tool. Second, digital product passports answer increasing regulatory requirements and demand for sustainability information along the value chain of a product. And third, Digital product passports are crucial enablers for circular economies due to their ability to provide comprehensive and transparent information about the lifecycle of automotive products. They play a critical role by fostering transparency, enhancing recycling and reuse, improving maintenance and repairs, and facilitating regulatory compliance.

**Key Attributes**: ``Passport metadata``, ``Product identification``, ``Product operation``, ``Product handling``, ``Product characteristic``, ``Sustainability information``, ``Materials information``, ``Commercial information``, ``Sources (documents)``, ``Additional data``

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

### Model Example: `io.catenax.battery.battery_pass`

**Description**: The Battery Pass describes information collected during the lifecycle of a battery. The model is heavily based on Regulation (EU) 2023/1542 (the EU Battery Regulation) and additionally incorporates attributes from the proposal for the Ecodesign for Sustainable Products Regulation. It builds on the Generic Digital Product Passport by reusing its `metadata`, `commercial` and `handling` modules and adds battery-specific information such as performance, conformity, safety and hazardous/active material data.

**Key Attributes**: ``Spec version``, ``Metadata``, ``Identification``, ``Characteristics``, ``Commercial``, ``Sources (documents)``, ``Sustainability``, ``Materials (hazardous, active, composition)``, ``Performance (rated, dynamic)``, ``Safety``, ``Handling``, ``Conformity``, ``Operation``

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

### Model Example: `io.catenax.transmission.transmission_pass`

**Description**: The Transmission Pass corresponds to the Digital Product Passport information required by the proposed Ecodesign Regulation (ESPR-2022) and describes data collected and available during the lifespan of a transmission. It is structured into two top-level groups: `specific` for transmission-specific data (gear ratios, torque, power, oil, electrical performance, etc.) and `generic` which reuses the modules of the Generic Digital Product Passport (metadata, identification, characteristics, materials, sustainability, ...).

**Key Attributes**: ``Spec version``, ``Product-specific parameters (specific)``, ``Product-generic parameters (generic)``

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

### Model Example: `io.catenax.material.chemical_material_passport`

**Description**: The Chemical Material Passport plays the same role as a Digital Product Passport for chemical substances and materials, providing detailed information on sustainability, safety, hazards and waste management. It replaces multi-channel data exchange (safety data sheets, compliance docs, certificates of analysis, etc.) with a single streamlined data flow. Like the Transmission Pass, the model is split into `specific` (chemical-specific data such as safety, compliance, hazard assessment, SDS, transport, disposal) and `generic` (reused DPP modules).

**Key Attributes**: ``Product-specific parameters (specific: safety, compliance, parameters, hazardAssessment, safetyDataSheetDocumentation, transport, productType, disposal, complianceDocumentation)``, ``Generic parameters (generic: characteristics, commercial, metadata, identification, sources, materials, operation, sustainability)``

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

---

## Standards

:::warning Industry-Specific Standards
For industry-specific standards, refer to the [Industry Extensions](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits/kit-template/industry-extensions) section.
:::

### Supported Standards

| Standard | Version | Description                                                                                                                                             | Compliance Level | Link |
|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|------|
| CX-0143 | 1.3 | This standard gives a baseline for products declared under the ESPR with a generic product passport and additional product models.                      | Optional | [Link](https://catenax-ev.github.io/docs/standards/CX-0143-UseCaseCircularEconomyDigitalProductPassportStandard/introduction) |
| CX-0160 | 1.0 | The Battery Passport Standard describes the existing use cases and the required models as well as Digital Twins that have to be added to for Batteries. | Mandatory | [Link](https://catenax-ev.github.io/docs/standards/CX-0160-BatteryPassport) |

---

## Tutorials & Resources

:::warning Old deprecated reference application
For previous versions of this KIT a reference application was mentioned and used as example.
This application has been deprecated and should no longer be seen as valid reference.
For some insights into the application of the KIT for generic product passports have a look at the EcoPass KIT of the [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub).
:::

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024, 2026 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. für ihr Institut IPK
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2024 Volkswagen AG
- SPDX-FileCopyrightText: 2026 Mercedes-Benz AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
