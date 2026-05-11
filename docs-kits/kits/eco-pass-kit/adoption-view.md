---
title: Adoption View
---

![EcoPass KIT Pictotogram](@site/static/img/kits/eco-pass/eco-pass-kit-logo.svg)

## Introduction

The EcoPass KIT will be the key enabler for various stakeholders to use digital product passports, which represent a digital collection of specific information about a physical product in a standardized exchange format. This data is governed by agreed-upon ownership and access rights, which are conveyed through the Eclipse Data Space Connector (EDC). The primary purpose of the product passport is to enable the electronic registration, processing and sharing of product-related details among various entities in the supply chain, including several businesses and authorities. The demand for interoperable product passports exists worldwide, driven by the need to establish sustainable and transparent supply chains across different types of products, for which the adoption of standards will become crucial.
In this context, Catena-X offers a decentralized ecosystem supported by standards and principles like data sovereignty, which can effectively implement such a product passport system. The objective of the EcoPass KIT is therefore to:

- Provide a comprehensive overview of the business context and benefits of product passports.
- Offer guidelines for industry stakeholders.
- Provide a detailed description and offer tools to implement product passports.

## Business Value

### Value of the KIT
The Catena-X EcoPass KIT aims to empower participants to share product pass-related data in a secure and sovereign way while ensuring the interoperability of the different applications involved in the process.
To achieve this, the relevant Catena-X standards and data modes are referenced, explained, and placed within a broader context of business processes.

### Value of standardization
Using Catena‑X data models and standards for the battery passport is particularly valuable because they create a consistent and verifiable foundation for battery-related data across the entire lifecycle.

- **Consistency of battery data**: The battery passport requires comparable information (e.g., CO₂ footprint, material composition). Catena‑X provides harmonized data formats and calculation rules, ensuring that all partners deliver data in the same structure and logic.
- **End-to-end traceability**: Standardized data models enable continuous tracking of battery information across all supply chain tiers, which is essential for documenting origin, production, and lifecycle data required by regulation.
- **Reliable aggregation of data**: Battery passport data must be collected, aggregated, and validated across multiple contributors. With shared standards, this can be done without reformatting or recalculating data at each step.
- **Regulatory readiness**: The battery passport will become mandatory (e.g., upcoming EU regulation), and standardized data models ensure that required information is structured, auditable, and compliant from the beginning.
- **Cost Cost savings through standardization**: Catena‑X data models eliminate the need for individual data formats, conversions, and repeated validations when exchanging battery passport information between partners. In addition, battery ecosystems typically involve a large number of partners across multiple tiers. By using a common standard, companies can reuse the same data model and integration approach for all partners, instead of building separate solutions for each connection. This significantly reduces implementation and maintenance effort across the network.

In short: Catena‑X standards make battery passport data consistent, traceable, and regulation-ready across all partners, which is essential for implementing the battery passport efficiently.

### Benefits to suppliers and OEMs
 - **Standardized structure for regulatory battery passport data**: Catena‑X defines a clear and agreed structure for all required battery passport data elements (e.g., carbon footprint, material composition, lifecycle data). This ensures that OEMs and battery suppliers can provide exactly the required information in a consistent format, without having to interpret regulatory requirements individually.
 - **Efficient verification and auditability**: Battery passport data must be auditable and verifiable across multiple contributors. By using a shared standard, OEMs and suppliers ensure that data is structured in a way that supports validation, certification, and regulatory checks without additional rework at each step.
 - **Cost reduction through reuse and scalability**: As outlined above, implementing battery passport requirements typically involves many partners across the supply chain. By using Catena‑X standards, OEMs and battery suppliers can apply the same data model and processes for all partners, avoiding individual solutions and repeated integration efforts.

### Beneftis to software vendors
- **Reduced customer integration effort**: Catena‑X connects OEMs, suppliers, and service providers in a shared data space. Supporting its standards allows software vendors to integrate directly into this ecosystem and serve multiple customers with one solution, instead of building isolated, customer-specific implementations.
- **Interoperability as a key differentiator**: Catena‑X enables standardized and interoperable data exchange across the entire value chain, allowing certified solutions to seamlessly exchange battery passport data with other systems. This makes solutions more attractive to customers.

### How can the EcoPass KIT help to address regulatory challenges?
- Manufacturers are required to disclose information regarding the environmental impact of their products under the European Union's (EU) Ecodesign Directive. The EcoPass KIT can assist producers in adhering to this rule by offering a digital record of the environmental impact of their products.
- Companies are required to provide information regarding their efforts to address forced labor and human trafficking in their supply chains under the California Transparency in Supply Chains Act (CTSCA). The EcoPass KIT's digital record of a company's supply chain operations can assist businesses to comply with this law.
- Certain manufacturers of products are required to take back and recycle their products at the end of their functional lifespans under the German Waste Management Act (Kreislaufwirtschaftsgesetz). The EcoPass KIT, which offers a digital record of the goods that have been returned and recycled, can assist producers in adhering to this obligation.

## Use Cases covered by the EcoPass KIT

### Battery Pass: A real-world example

In the automotive industry, a Battery Passport or Digital Product Passport for batteries plays a crucial role in ensuring transparency, traceability, and sustainability in the battery supply chain. Here's a real-world example of how a digital product passport might be set up for a battery used in electric vehicles (EVs), including its benefits, illustrated below:

![BP realWorldExample](./resources/adoption-view/adoption-view-BatteryPass_a_example.svg)

1. **Battery Manufacturing**: During the production stage, the battery manufacturer collects and records relevant data, such as the battery's unique identifier, type and model, manufacturing date and location, energy capacity and raw materials composition, including the content of critical elements like lithium, cobalt and nickel.
2. **Supply Chain Transparency**: Information about the battery's sourcing, manufacturing and distribution processes is documented, ensuring compliance with environmental and social standards. This includes data on the origin of raw materials, labor practices and the environmental footprint of each stage of the supply chain.
3. **Vehicle Integration**: When the battery is integrated into an electric vehicle, the Battery Pass is linked to the car's unique identification number (VIN), allowing seamless tracking and communication between the battery, the vehicle and relevant stakeholders.
4. **In-Use Performance Tracking**: As the vehicle is used, the Battery Pass continuously collects data on the battery's performance, such as its state of charge, charging cycles and degradation over time. This information is essential for the vehicle owner, car manufacturer and service providers to monitor the battery's health and optimize its lifespan.
5. **End-of-Life Management**: When the battery reaches the end of its useful life, the Battery Passport provides detailed instructions for proper disposal and recycling, ensuring compliance with regulations and facilitating the recovery of valuable materials. The data stored in the Battery Passport helps recycling facilities to efficiently process the battery, reducing waste and promoting a circular economy.

Throughout this process, the Battery Passport serves as a single, secure, and easily accessible source of information for various stakeholders, such as vehicle manufacturers, suppliers, service providers, regulators and vehicle owners. By implementing a digital product passport like the Battery Pass in the automotive industry, companies can promote transparency, traceability, and sustainability, ultimately contributing to a more eco-friendly and circular economy.

### Battery Pass: Catena-X Standard explained
The CX‑XXXX Battery Passport standard specifies how battery‑related information is modeled, provisioned, discovered and accessed within the Catena‑X dataspace for:
- Traction, industrial and similar batteries that fall under the scope of the EU Battery Regulation or comparable regulatory schemes.
- End‑to‑end lifecycle usage within the automotive battery value chain (manufacturing, use phase, second‑life, end‑of‑life and recycling).
- Provisioning of both complete digital battery passports and partial, lifecycle‑specific data contributions, based on Catena‑X digital twins and the joint Catena‑X/IDTA Battery Passport aspect models.

The standard destinguishes three different use cases:
- Use Case (1) - Provisioning of near-complete battery passport: Typically used in situations where the data provider manufactures the battery, but the battery passport will be published by the data consumer. This can happen depending on the contractual situation and depending on who is the economic operator of the battery and who is putting it onto the EU market.
- Use Case (2) - component supplier integration (for example cells, housing, battery packs): Typically used to provide data from a component supplier to a battery manufacturer.
- Use Case (3) - DPP-Service provider view: Complete exchange of DPPs to service provider, which provides it public.

Please note that Use Case 2 is not available in the current version of the standard and will be added later.


## Semantic Models

Depending on the use case and related KIT, Catena-X provides different semantic models that help to structure and make use of data via semantic information. These models help to provide a basic meaning to the data and their relationship, thereby enabling interoperability between data sets. Catena-X data models rely on principles as understandability, standardization, accuracy, differentiation, auditability, comprehensiveness, and provision of insights to drive improvement actions. The KIT entails the main data models of a Digital Product Passport and Battery Passport, whereat both are justified with an underlying regulation.

Other specific product passports which are further described in the EcoPass KIT are the [battery](#battery-passport), [transmission](#transmission-passport) and [electric drive](#electric-drive-passport). All of them depend on the generic Digital Product Passport data model. Further data models will follow.

The goal of these passports is to create unified data models that can be used and adapted across the automotive industry. These data models are modelled according to the [CX-0003](https://catenax-ev.github.io/docs/next/standards/CX-0003-SAMMSemanticAspectMetaModel) SAMM Standard in Version 1.1.0. For detailed information please follow the embedded links to the Catena-X Standard library.

### Digital Product Passport

#### Digital Product Passport Introduction

Digital Product Passports address three needs by the industry: First, they gather all relevant information about a product in a single, digital tool. Second, digital product passports answer increasing regulatory requirements and demand for sustainability information along the value chain of a product. And third, Digital product passports are crucial enablers for circular economies due to their ability to provide comprehensive and transparent information about the lifecycle of automotive products. They play a critical role by fostering transparency, enhancing recycling and reuse, improving maintenance and repairs, and facilitating regulatory compliance.
In the following whitepaper, the role of digital product passports is discussed in relation to the current situation in the automotive industry.

[Link to the Whitepaper "Digital Product Passports as enablers for Circular Economy".](https://catena-x.net/fileadmin/user_upload/Publikationen_und_WhitePaper_des_Vereins/2407_DPP_Circular_Economy_WP_v1.pdf)

The collected data is defined via standards specified by the Catena-X network and obtained from the industry. The content of the Product Passport is product-related information that is useful and necessary for the consumer, and other actors who will deal with the product till end of its life, and is limited to the required minimum of the necessary information.
The data model in version `v.5.0.0` corresponds to the Digital Product Passport information required by the proposed Ecodesign Regulation ([ESPR-2022](https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products_en)) from March 30th, 2022. In the future, delegated acts for specific product groups would require a product passport to be available for each product. The data model will be updated, as newer versions of the regulation will be published. The latest to the model corresponding version of the document was the [provisional agreement](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CONSIL:ST_5147_2024_INIT) between the EU Council and the Parliament from January 9th, 2024. The text is informal, but the content of the final regulation was agreed between these two institutions.

It is important to note that the data model contains information/data fields, which are mandatory for the fulfillment of the regulation ([ESPR-2022](https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products_en)). It is also worth mentioning that sharing information within the network is based on decentralized technologies and is always based on the individual decision of each provider.

The Digital Product Passport is the core model and can be used as the root class for other, specific, product models. The latest model `v.5.0.0` consists out of the following information:

- Passport metadata
- Product identification
- Product operation
- Product handling
- Product characteristic
- Sustainability information
- Materials information
- Commercial information
- Sources (documents)
- Additional data

References to shared aspects are the following:

- urn:samm:io.catenax.batch:3.0.0
- urn:samm:io.catenax.shared.part_classification:1.0.0
- urn:samm:io.catenax.part_type_information:1.0.0
- urn:samm:io.catenax.shared.business_partner_number:2.0.0
- urn:samm:io.catenax.serial_part:3.0.0
- urn:samm:io.catenax.shared.quantity:2.0.0
- urn:samm:io.catenax.shared.uuid:2.0.0
- and indirect references from the above mentioned aspects

In addition, the Digital Product Passport data model offers the following advantages:

- **Self-describing**: Which means it has all the details necessary to comprehend what it includes. Different systems can easily interpret the Passport as a result.
- **Extendable**: New information can be added without much difficulty. As a result, the Passport will be able to adapt to the changing requirements.
- **Common semantics**: The model of a generic passport is established in Catena-X which other passes can build upon.

#### Link to current Digital Product Passport model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.generic.digital_product_passport). For each version there is a separated directory containing the ttl-file and generated samples.

#### Example Digital Product Passport Payload

<details>
  <summary>Payload</summary>

```json
{
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

### Battery Passport

#### Battery Passport Introduction

The Catena-X standards, which are crucial to create a more sustainable battery business, serve as the foundation for the data model behind the Battery Passport. The Battery Passport assists in enhancing the traceability and sustainability of batteries by offering a thorough record of a battery's life cycle. This will mitigate the battery industry's environmental effect and make it easier to recycle batteries.

Due to requirements of the regulation [(EU) 2023/1542](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R1542) for batteries and waste batteries, a data model for Battery Passport was created, which increases the efficiency of circular economy ecosystems of all partners in the value network. The battery passport is a tool for the exchange of information and enables tracking and tracing of batteries usage information.
The Battery Passport is a standardized data model that will enable stakeholders to access the relevant data. The version of the Battery Passport Data Model `v.6.0.0` consists out of the following information:

- Passport metadata
- Product identification
- Product operation
- Product handling
- Product characteristic
- Sustainability information
- Materials information
- Commercial information
- Sources (documents)
- Conformity information
- Safety information
- Performance information

References to shared aspects are the following:

- urn:samm:io.catenax.generic.digital_product_passport:5.0.0
- and indirect references from the above mentioned aspect

It is important to note that the data model contains information/data fields, which are mandatory for the fulfillment of the regulation ([(EU) 2023/1542](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R1542)). It is also worth mentioning that sharing information within the network is based on decentralized technologies and is always based on the individual decision of each provider.

#### Link to current Battery Pass model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.battery.battery_pass). For each version there is a separated directory containing the ttl-file and a generated samples.

#### Example Battery Passport Payload

<details>
  <summary>Payload</summary>

```json
{
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
  "sources" : [ {
    "header" : "Example Document XYZ",
    "category" : "Product Specifications",
    "type" : "URL",
    "content" : "https://dummy.link"
  } ],
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
    "intoServiceDate" : "7345-31-31",
    "manufacturer" : {
      "facility" : [ {
        "facility" : "BPNA1234567890AA"
      } ],
      "manufacturingDate" : "2000-01-31",
      "manufacturer" : "BPNL6XI3KZ55MzYB"
    }
  },
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
  }
}
```

</details>

### Transmission Passport

#### Transmission Passport Introduction

In July 2023, the European Commission presented a proposal for a regulation addressing the whole life cycle of vehicles, from design to end-of-life, aimed at improving design and end-of-life management of vehicles for a more resource-efficient automotive sector. It would set circularity requirements on vehicle design and production concerning reusability, recyclability, recoverability and the use of recycled content. It would also lay down requirements on information and labelling of parts, components and materials in vehicles.

As preparation for the implementation of the proposed regulation and its requirements, manufacturers and OEMs within the Catena-X network decided on developing data models for the most commonly used products.

The Transmission Passport `v.3.0.0` corresponds to the [digital product passport](#digital-product-passport) information required by the proposed Ecodesign Regulation and describes the data that is collected and available during the lifespan of a transmission. The consumers can see at a glance the relevant data about the transmission which is installed in the specified vehicle. By incorporating circularity parameters, the Transmission Passport aims to enhance transparency and promote a circular economy within the European Union. Detailed descriptions can be found in the Ecodesign for Sustainable Products Regulation Proposal (ESPR).
The Transmission Passport model `v.3.0.0` includes the following product specific information:

- Type of drive
- Transmission performance information
- Torque converter information
- Speed resistance information
- Standard gear ratio information
- Transmission spreading information
- Transmission oil information
- Electric machine information
- Electric performance information

Product unspecific information incudes following information:

- Passport metadata
- Product identification
- Product operation
- Product handling
- Product characteristic
- Sustainability information
- Materials information
- Commercial information
- Sources (documents)

References to shared aspects are the following:

- urn:samm:io.catenax.generic.digital_product_passport:5.0.0
- and indirect references from the above mentioned aspect

It is important to note that the data model contains information/data fields, which are mandatory for the fulfillment of the regulation ([ESPR-2022](https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products_en)). It is also worth mentioning that sharing information within the network is based on decentralized technologies and is always based on the individual decision of each provider.

#### Link to current Transmission Passport model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.transmission.transmission_pass). For each version there is a separated directory containing the ttl-file and a generated samples.

#### Example Transmission Passport Payload

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
        "manufacturer" : "BPNLvO2y5Eu4L2hi"
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

## Business Architecture

The Business Architecture illustrates the interaction between the EcoPass KIT and other KITs, components, data models, and artifacts used for identity and access management, illustrated by the Figure below.

![Image: Business Architecture](./resources/adoption-view/adoption-view-EcoPassKITBusinessArch.svg)

The core of the network is to provide interoperability between different applications. For this reason, a common semantic is indispensable. In the Catena-X ecosystem, it has been agreed to use the description language SAMM to describe data models.
To additionally provide a standardized interface, the open standard of the International Digital Twin Association (IDTA) is used, abbreviated as IDTA. This [standard](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf) corresponds to the Asset Administration Shell (AAS 3.0).
It is used to discover digital twins and exchange actual usage data. The registration and search of digital twins is done by using the [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/adoption-view) which reference implementation is the [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/tree/main) in Tractus-X.
To control access to both usage and meta data, the EcoPass KIT relies on the [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view). Interactions between two parties occur exclusively peer-to-peer via the standardized interfaces of the Connector KIT, based on the International Data Space Protocol.
Data sovereignty is enabled by so-called verifiable credentials. These rely on the technology of Self-Sovereign Identity (SSI) and are enabled through the Connector KIT. In short, consumers must present their signed credentials, defined by a data provider, before a data contract (and thus a data exchange) can take place. It should be mentioned that this concept is still in the prototype phase as of Release 3.2 and will be expanded in future releases.

## Digital Product Pass Verification

The Digital Product Pass Reference Implementation has a concept and implementation for the Certification and Verification of Data Aspects in Catena-X. This concept may help adopters from the EcoPass KIT, containing guidelines on how to verify data integrity, after it has been retrieved from the EDC.

This Catena-X Data Certification/Verification Framework aims to create a second layer of trust over the EDC data exchanges between consumers and data providers. It enables auditors to verify specific attributes or complete aspect models for data providers and allowing consumers to retrieve and verify the "validity" of the verification done. Using a simple wallet, a Data Provider is able to certify its attributes or the complete semantic models from Catena-X and include it in a Verifiable Credential, which can then be verified on the Data Consumer side.

The concept is the First Aspect Model Verification/Certification Concept in Catena-X. It aims to provide a "lighthouse" for any other aspect model verification/certification that MUST be done in Catena-X using SAMM Aspect Models.
It provides a generic concept for Attribute Verification/Certification by external/internal auditors, and also provides a Self-Testification option for Data Providers to certify their data while still maintaining data sovereignty at all costs. By using the EDC connector for the data exchanges the concept uses the current Catena-X Architecture:

- [eclipse-tractusx/digital-product-pass/dpp-verification](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-verification)

Furthermore, it gives guidance and ready to use components for verifying the data received from their Data Providers. The Digital Product Pass Add-on offers the consumers components like the simple-wallet, an MVP decentral wallet able to issue and verify aspect model Verifiable Credential Documents. It also provides a proof of concept (PoC) in the dpp-backend and dpp-frontend components for complete data payloads to be verified.

## Tutorials

The Digital Product Pass Reference Implementation: [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass) offers a tutorial for understanding the E2E journey of the EcoPass KIT. This tutorial was presented at the Second Tractus-X Community Days at the Digital Product Pass Introduction Workstream, it contains valuable and technical explanations on how to configure the Digital Twins and the Passport Aspects at the submodel server, easing the learning process of the adopters:

- [eclipse-tractusx/digital-product-pass/dpp-tutorial](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-tutorial)

For more information about the Reference Implementation and how the KIT can be adopted consult the [Software Development View](./software-development-view.md).

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. für ihre Institute IPK und IPK
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2024 Volkswagen AG
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
