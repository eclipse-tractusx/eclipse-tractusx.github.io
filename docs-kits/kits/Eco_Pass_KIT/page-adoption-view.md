<!-- 
#################################################################################
Tractus-X - EcoPass KIT

Copyright (c) 2022, 2024 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
Information regarding copyright ownership.

This program and the accompanying materials are made available under the
terms of the Apache License, Version 2.0 which is available at

https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the
License for the specific language govern in permissions and limitations
under the License.

SPDX-License-Identifier: Apache-2.0
################################################################################## 
-->

---
title: Adoption View
---

![EcoPass KIT Pictotogram](./resources/img/EcoPassKIT_pictogram.png)

## Introduction

The EcoPass KIT will be the key enabler for various stakeholders to use digital product passports, which represent a digital collection of specific information about a physical product in a standardized exchange format. This data is governed by agreed-upon ownership and access rights, which are conveyed through the Eclipse Data Space Connector (EDC). The primary purpose of the product pass is to enable the electronic registration, processing and sharing of product-related details among various entities in the supply chain, including several businesses and authorities. The demand for interoperable product passports exists worldwide, driven by the need to establish sustainable and transparent supply chains across different types of products, for which the adoption of standards will become crucial.
In this context, Catena-X offers a decentralized ecosystem supported by standards and principles like data sovereignty, which can effectively implement such a product passport system. The objective of the EcoPass KIT is therefore to:

- Provide a comprehensive overview of the business context and benefits of product passports.
- Offer guidelines for industry stakeholders.
- Provide a detailed description and offer tools to implement product passports.

## Vision & Mission

### Vision: Empowering Sustainability – One Product at a Time

The EcoPass KIT envisions a future where sustainability is at the core of every product's lifecycle, from design and manufacturing to usage and end-of-life. By fostering transparency, traceability and informed decision-making, we aim to inspire solution and service providers to create innovative, eco-friendly products that reduce environmental impact and drive the global economy towards a circular model.

### Mission: Unleashing Circularity Potential

The EcoPass KIT enables the scalable usage of digital product passports in order to address the pressing issue of inefficient resource usage and lack of product transparency. With growing concerns over environmental impact, limited resources and waste generation, there is an urgent need for a comprehensive solution to drive sustainable practices across the value chain. The KIT offers unified data models, a reference application for passport utilization as well as the required API. Low entry barriers will allow you to adapt digital product passports rapidly and pay your contribution to a fully circular value chain without the necessity of vast expertise or resources. Designed for multiple products, the KIT offers scalability, high-quality product information and a set of tools for regulatory compliance. Our mission is to unlock the circular potential of every component and material, fostering a culture of sustainability, innovation, and shared responsibility among all stakeholders.

All described specifications in the KIT are based on [Catena-X standards](https://catena-x.net/de/standard-library) such as the Asset Administration Shell, SSI and decentral Digital Twin Registry. They refer to other Catena-X KITs like the [Connector KIT]/<https://eclipse-tractusx.github.io/docs-kits/kits/tractusx-edc/docs/kit/adoption-view/Adoption%20View/> (EDC), [Data Chain KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-chain-kit/) (Item Relationship Service = IRS) and [Business Partner KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit/) to ensure interoperability and data sovereignty according to IDSA and Gaia-X principles.

## Business Value

Following this mission, the EcoPass KIT serves as an instrumental tool promoting sustainable and circular value chains. The improved transparency, traceability and accountability offered with digital product passports will facilitate informed decision-making for various stakeholders. This will bring ethical sourcing, efficient use of resources and reduction of environmental impacts to a new level. By making use of the Catena-X standards defined within the EcoPass KIT, product passports will ensure interoperability for stakeholders and systems to communicate seamlessly. This standardized language is crucial to improve efficiency, lower operational costs and create faster data processing. It ensures a consistent approach to data collection, storage and visualization to enhance the accuracy, reliability and comparability of information.
The following section will highlight the five major advantages of the Catena-X EcoPass KIT, which are also displayed below.

![AdoptionView Business Value](./resources/adoption-view/adoption-view-BusinessValue.png)

**Seamless Integration and Collaboration**: By leveraging the EcoPass KIT, service providers can easily integrate with the Catena-X marketplace, promoting efficient collaboration and exchange of information with other businesses in the network. The unified data model and API specification simplifies the process, reducing the time and resources needed for integration and fostering interoperability between various players.

**Enhanced Consumer Trust and Brand Loyalty**: Utilizing the KIT to develop solutions for the Catena-X marketplace allows service providers to showcase their commitment to transparency and sustainability. This fosters consumer trust and brand loyalty, as increasingly conscious customers prefer products and services that align with their values and make a positive impact on the environment.

**Data-Driven Decision Making**: The EcoPass KIT enables service providers to harness the power of high-quality data sets from various sources in the Catena-X network. This wealth of information supports data-driven decision-making, helping businesses optimize their processes, reduce waste and identify opportunities for growth and innovation. Leveraging the dynamic data attributes within a passport, the product's evolving condition can be reflected, which offers a highly valuable increase of knowledge about the product’s behavior, quality and performance.

**Regulatory Compliance and Risk Mitigation**: By offering solutions based on the KIT, service providers can help businesses comply with evolving regulations and industry standards. The increased transparency and traceability provided by digital product passports facilitate compliance management, offer the creation of certificates, and reduce the risks associated with non-compliance, such as penalties and reputational damage.

**Competitive Advantage through Innovation**: The KIT's foundation for value-added services and innovative solutions provides service providers with a unique competitive edge in the Catena-X marketplace. By developing and offering cutting-edge products and services that cater to the growing demand for sustainable and transparent solutions, service providers can differentiate themselves in a crowded market and seize new business opportunities.

## Use Case Explanation

### Today's Challenges

Today's globalized supply chains often struggle with transparency, data fragmentation and inefficiencies through the lack of digitally available product information. Traceability becomes difficult, hindering the ability to track products' origins and ensure accountability. Risk management and compliance efforts are compromised, impacting product quality and sustainability. Customer expectations for transparency and sustainability information remain unmet, potentially leading to dissatisfaction and loss of market share. Moreover, supply chains lack the resilience and responsiveness needed to adapt to disruptions effectively.
Embracing a digital product pass can address these challenges, enabling transparent, efficient and sustainable supply chains. Implementing the EcoPass KIT can enable companies to address these challenges by creating a comprehensive, accurate and up-to-date record of their products' lifecycles. This information can be used to improve resource efficiency, optimize recycling processes and reduce waste, ultimately driving the adoption of circular economy principles.

### How can the EcoPass KIT help to address regulatory challenges?

- Manufacturers are required to disclose information regarding the environmental impact of their products under the European Union's (EU) Ecodesign Directive. The EcoPass KIT can assist producers in adhering to this rule by offering a digital record of the environmental impact of their products.
- Companies are required to provide information regarding their efforts to address forced labor and human trafficking in their supply chains under the California Transparency in Supply Chains Act (CTSCA). The EcoPass KIT's digital record of a company's supply chain operations can assist businesses to comply with this law.
- Certain manufacturers of products are required to take back and recycle their products at the end of their functional lifespans under the German Waste Management Act (Kreislaufwirtschaftsgesetz). The EcoPass KIT, which offers a digital record of the goods that have been returned and recycled, can assist producers in adhering to this obligation.

### Ecopass KIT benefits for value chain partners and solution providers

Stakeholders along the value chain, as well as solution providers can reap the benefits of utilizing KITs in their organization. The Figure below shows an overview of these benefits, further explanation can be found below the illustration.

![ValueChain Benefits](./resources/adoption-view/adoption-view-ValueChainBenefits.png)

**Value Chain Partners** can benefit from the EcoPass KIT especially by bringing the product transparency to a next level which will allow for several areas to increase the company’s value. Multiple risks (e.g. regulatory compliance) can be mitigated, cost and process efficiency may be improved, the strategic knowledge about products increases and the possibility for new business is being established.

1. **Regulatory Compliance**: Improve compliance with regulations and industry standards by utilizing a digital product passport to demonstrate responsible sourcing, production and waste management practices.
2. **Enhanced Transparency**: Visibility of the product's condition, origins and components will lead to better decision-making and higher resource efficiency.
3. **Efficient Data Management**: Adopting a digital product pass will reduce administrative burdens and facilitate seamless data exchange between stakeholders.
4. **Increased Accountability**: A clear chain of custody for products fosters accountability among value chain participants for product quality, safety and sustainability.
5. **Risk Mitigation**: Comprehensive product data helps value chain participants to proactively identify and mitigate risks, ensuring higher product quality and safety standards.
6. **Strengthened Customer Trust**: Offering transparency of business practices and sustainability efforts builds trust with customers and enhances brand loyalty.
7. **Supply Chain Optimization**: Data-driven insights enable the optimization of supply chain processes to support the integration of sustainable approaches.
8. **Foster Collaborations**: Connecting and sharing information across the value chain facilitates collaboration with other stakeholders to promote joint efforts towards sustainability challenges.

**Solution Providers** will gain a head start in delivering comprehensive and efficient digital product pass solutions. The pre-built features accelerate time-to-market, reduce costs and ensure a reliable, scalable and compliant system. In addition, solution providers can leverage a KIT as the basis to build their own customized solutions and to offer their customers innovative and value-driven digital product pass services in an efficient and simplified way.

1. **New Market & Customer Base**: The possibility of developing innovative solutions and providing them through the Catena-X marketplace fosters new market opportunities and scalability of the customer base.
2. **Accelerated Time-to-Market**: The KIT provides the thematical and technical basis to build solutions, significantly reducing the time and resources required to develop digital product pass solutions.
3. **Flexibility and Customization**: While the KIT offers a solid foundation, it is designed to allow solution providers for customizing and tailoring the platform to meet specific needs and preferences of the target market and value chain participants.
4. **Risk Mitigation**: The predefined KIT tools support solution providers in reducing the risk of development errors and vulnerabilities.
5. **Cost Efficiency**: The KIT's standardized data model and open interface simplify the process of connecting to the Catena-X network, reducing the investment needs for integration.
6. **Competitive Advantage**: Adopting the KIT quickly positions solution providers in the market faster with cutting-edge services gaining a competitive advantage.
7. **Alignment with Industry Standards**: The KITs adhere to industry standards, making it easier for solution providers to align with existing supply chain ecosystems and collaborate with other stakeholders.
8. **Data Utilization**: The wealth of data available in the Catena-X network is leveraged to drive innovation and develop data-driven solutions tailored to the unique needs of various industries.

#### Battery Pass: A real-world example

In the automotive industry, a Battery Pass or digital product passport for batteries plays a crucial role in ensuring transparency, traceability, and sustainability in the battery supply chain. Here's a real-world example of how a digital product pass might be set up for a battery used in electric vehicles (EVs), including its benefits, illustrated below:

![BP realWorldExample](./resources/adoption-view/adoption-view-BatteryPass_a_example.png)

1. **Battery Manufacturing**: During the production stage, the battery manufacturer collects and records relevant data, such as the battery's unique identifier, type and model, manufacturing date and location, energy capacity and raw materials composition, including the content of critical elements like lithium, cobalt and nickel.
2. **Supply Chain Transparency**: Information about the battery's sourcing, manufacturing and distribution processes is documented, ensuring compliance with environmental and social standards. This includes data on the origin of raw materials, labor practices and the environmental footprint of each stage of the supply chain.
3. **Vehicle Integration**: When the battery is integrated into an electric vehicle, the Battery Pass is linked to the car's unique identification number (VIN), allowing seamless tracking and communication between the battery, the vehicle and relevant stakeholders.
4. **In-Use Performance Tracking**: As the vehicle is used, the Battery Pass continuously collects data on the battery's performance, such as its state of charge, charging cycles and degradation over time. This information is essential for the vehicle owner, automaker and service providers to monitor the battery's health and optimize its lifespan.
5. **End-of-Life Management**: When the battery reaches the end of its useful life, the Battery Pass provides detailed instructions for proper disposal and recycling, ensuring compliance with regulations and facilitating the recovery of valuable materials. The data stored in the Battery Pass helps recycling facilities to efficiently process the battery, reducing waste and promoting a circular economy.

Throughout this process, the Battery Pass serves as a single, secure, and easily accessible source of information for various stakeholders, such as vehicle manufacturers, suppliers, service providers, regulators and vehicle owners. By implementing a digital product passport like the Battery Pass in the automotive industry, companies can promote transparency, traceability, and sustainability, ultimately contributing to a more eco-friendly and circular economy.
The following video visualizes how it can work:

#### ToDO: Insert / link BP video here

### How the KIT can help

The EcoPass KIT addresses the real-world problem of battery traceability and sustainability in the automotive industry by providing a standardized, easy-to-implement solution for creating and managing digital product passports. Here's how the EcoPass KIT can help and scale in this context:

1. **Standardization and Interoperability**: The EcoPass KIT offers a unified data model and is planning an API specification, allowing for seamless integration across different stakeholders, including manufacturers, suppliers, service providers and regulatory bodies. This standardization promotes interoperability and streamlines communication throughout the battery lifecycle.
2. **Simplified Adoption**: By providing a comprehensive and easy-to-use KIT, EcoPass can lower the barrier to entry for businesses of all sizes, enabling them to implement digital product passports without extensive technical expertise or resources. This can encourage widespread adoption of the solution, resulting in a larger-scale positive impact on sustainability and traceability.
3. **Scalable Solution**: The EcoPass KIT is designed to accommodate various product types, sizes and applications, ensuring its relevance and adaptability to the evolving automotive industry. This scalability allows the KIT to be utilized for a wide range of battery technologies, facilitating its adoption across diverse sectors.
4. **Enhanced Data Quality and Analysis**: The EcoPass KIT enables the collection and management of high-quality data throughout the product lifecycle. This wealth of information can be used by stakeholders to make data-driven decisions, optimize processes and identify opportunities for innovation and improvement in battery design, manufacturing and recycling.
5. **Facilitated Regulatory Compliance**: With the EcoPass KIT in place, businesses can more easily comply with the evolving regulations and industry standards related to battery traceability and sustainability. The digital product passport provides a comprehensive record of the battery's lifecycle, supporting compliance management and reducing the risk of penalties and reputational damage.

By providing a standardized, scalable and easy-to-adopt solution, the EcoPass KIT will play a significant role in addressing the challenges of product traceability and sustainability in the automotive industry, promoting a more transparent, environmentally friendly and circular economy.

## Semantic Models

Depending on the use case and related KIT, Catena-X provides different semantic models that help to structure and make use of data via semantic information. These models help to provide a basic meaning to the data and their relationship, thereby enabling interoperability between data sets. Catena-X data models rely on principles as understandability, standardization, accuracy, differentiation, auditability, comprehensiveness, and provision of insights to drive improvement actions.
In its first version the KIT entails the data models Battery Pass and Transmission Pass, further data models will follow. The goal of these passports is to create unified data models that can be used and adapted across the automotive industry. These data models follow the Catena-X Standards [CX-0034](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/Sustainability_Use_Case_Circular_Economy/CX_-_0034_Data_Model_BatteryPass_UseCase_CE_v_1.0.1.pdf), CX-0095 (insert once published) and are modeled according to the [CX-0003](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Archiv/Update_Juli_23_R_3.2/CX-0003-SAMMSemanticAspectMetaModel-v.1.0.2.pdf) BAMM Standard (BAMM has been renamed to SAMM thereafter) in Version 1.0.0 . For detailed information please follow the embedded links to the Catena-X Standard library.

### Battery Pass

#### Battery Pass Introduction

The Catena-X standards, which are crucial to create a more sustainable battery business, serve as the foundation for the data model behind the Battery Pass. The Battery Pass assists in enhancing the traceability and sustainability of batteries by offering a thorough record of a battery's life cycle. This will mitigate the battery industry's environmental effect and make it easier to recycle batteries.
Accordingly, the Battery Pass establishes the fundamental framework for digital infrastructures aimed at documenting and facilitating the exchange of essential information and update-relevant technical data. Specifically, it focuses on data that provides a comprehensive account of supply chain responsibility, e.g. the carbon footprint, working conditions during raw material extraction and the assessment of battery conditions. It is structured according to the following categories:

- Circularity
- Metadata
- Identification
- Performance
- Sources
- Physical Dimension
- Safety
- General Information
- Conformity
- Chemical Material
  In addition, the Battery Pass data model offers the following advantages:
- It is self-describing, which means it has all the details necessary to comprehend what it includes. Different systems can easily interpret the Battery Pass as a result.
- It is extendable, therefore new information can be added without much difficulty. As a result, the Battery Pass will be able to adapt to the changing requirements of the battery sector.
- It establishes a common semantic in Catena-X which other passes can build upon.

#### Link to current model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.battery.battery_pass). For each version there is a separated directory containing the ttl-file and a generated samples.

The latest version is the `v4.0.0` which is based on the generic Digital Product Pass `v3.0.0` model which can be found [here](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.generic.digital_product_passport)

#### Example Payload

```json
{
  "circularity": {
    "spareParts": {
      "left": {
        "producer": [
          {
            "id": {
              "left": {
                "contactProperty": {
                  "faxNumber": "+49 89 0987654321",
                  "website": "https://www.samsung.com",
                  "phoneNumber": "+49 89 1234567890",
                  "email": "test.mail@example.com"
                },
                "companyName": [
                  "eOMtThyhVNLWUZNRcBaQKxI"
                ],
                "address": {
                  "locality": {
                    "value": "Mannheim",
                    "technicalKey": "BLOCK"
                  },
                  "country": {
                    "shortName": "KS-N"
                  },
                  "postCode": {
                    "value": "98765-4321",
                    "technicalKey": "CEDEX"
                  },
                  "thoroughfare": {
                    "value": "Bernstrasse",
                    "number": "45",
                    "technicalKey": "STREET"
                  },
                  "premise": {
                    "value": "Werk 1",
                    "technicalKey": "BUILDING"
                  },
                  "postalDeliveryPoint": {
                    "value": "Tor 1",
                    "technicalKey": "INTERURBAN_DELIVERY_POINT"
                  }
                }
              }
            }
          }
        ],
        "sparePart": [
          {
            "partNumber": "12345678",
            "partName": "Aluminum Housing"
          }
        ]
      }
    },
    "documents": {
      "separateCollectionSymbol": {
        "left": "separate collection symbol"
      },
      "separateCollection": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "sustainabilityReport": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "impactOfSubstances": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "euTaxonomyDisclosureStatement": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "wastePrevention": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ]
    },
    "carbonFootprint": [
      {
        "lifecycle": "main product production",
        "rulebook": "https://www.alink.pdf/",
        "unit": "kg CO2 eq",
        "performanceClass": "A",
        "manufacturingPlant": {
          "left": {
            "locality": {
              "value": "Mannheim",
              "technicalKey": "BLOCK"
            },
            "country": {
              "shortName": ""
            },
            "postCode": {
              "value": "98765-4321",
              "technicalKey": "CEDEX"
            },
            "thoroughfare": {
              "value": "Bernstrasse",
              "number": "45",
              "technicalKey": "STREET"
            },
            "premise": {
              "value": "Werk 1",
              "technicalKey": "BUILDING"
            },
            "postalDeliveryPoint": {
              "value": "Tor 1",
              "technicalKey": "INTERURBAN_DELIVERY_POINT"
            }
          }
        },
        "type": "Climate Change Total",
        "value": 12.678,
        "declaration": "www.alink.de"
      }
    ],
    "status": "original"
  },
  "metadata": {
    "economicOperator": {
      "economicOperatorId": {
        "left": {
          "contactProperty": {
            "faxNumber": "+49 89 0987654321",
            "website": "https://www.samsung.com",
            "phoneNumber": "+49 89 1234567890",
            "email": "test.mail@example.com"
          },
          "companyName": [
            "RYtGKbgicZaHCBRQDSx"
          ],
          "address": {
            "locality": {
              "value": "Mannheim",
              "technicalKey": "BLOCK"
            },
            "country": {
              "shortName": "CQ-C7D"
            },
            "postCode": {
              "value": "98765-4321",
              "technicalKey": "CEDEX"
            },
            "thoroughfare": {
              "value": "Bernstrasse",
              "number": "45",
              "technicalKey": "STREET"
            },
            "premise": {
              "value": "Werk 1",
              "technicalKey": "BUILDING"
            },
            "postalDeliveryPoint": {
              "value": "Tor 1",
              "technicalKey": "INTERURBAN_DELIVERY_POINT"
            }
          }
        }
      }
    },
    "predecessor": {
      "left": "8a6aF2dB-aABA-29FE-6dAa-Dc6BCDeEc9b8"
    },
    "issueDate": "2000-01-01",
    "version": "1.0.0",
    "passportIdentifier": {
      "left": "75DF640E-db04-38CF-C3d8-0Dae8A9C845F"
    },
    "status": "draft",
    "expirationDate": "2000-01-01"
  },
  "identification": {
    "chemistry": "NCM",
    "typology": {
      "shortName": "8HP60",
      "class": {
        "definition": "Manual transmission (motor vehicle)",
        "code": "44-09-02-02"
      },
      "longName": "Product Description long text"
    },
    "localIdentifier": [
      {
        "value": "SN12345678",
        "key": "PartInstanceId"
      }
    ],
    "idDmc": "34567890",
    "typeId": "R2 High-Performance XYZ Battery",
    "category": "SLI",
    "additionalCode": [
      {
        "value": "8703 24 10 00",
        "key": "TARIC"
      }
    ]
  },
  "performance": {
    "rated": {
      "roundTripEfficiency": {
        "depthOfDischarge": 90.5,
        "temperature": 20,
        "50PercentLife": 89,
        "initial": 96
      },
      "selfDischargingRate": 0.25,
      "performanceDocument": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "testReport": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "temperature": {
        "lower": -18,
        "upper": 60
      },
      "lifetime": {
        "report": [
          {
            "header": "Sustainability Document Material XY",
            "category": "Product Specifications",
            "type": "URL",
            "content": "www.alink.pdf"
          }
        ],
        "cycleLifeTesting": {
          "temperature": 20,
          "depthOfDischarge": 90.5,
          "appliedDischargeRate": 4,
          "cycles": 1500,
          "appliedChargeRate": 3
        },
        "expectedYears": 8
      },
      "power": {
        "at20SoC": 35000,
        "temperature": 20,
        "value": 40000,
        "at80SoC": 39000
      },
      "resistance": {
        "temperature": 20,
        "cell": 0.025,
        "pack": 0.55,
        "module": 0.2
      },
      "voltage": {
        "temperature": 20,
        "min": 2.5,
        "nominal": 3.7,
        "max": 4.2
      },
      "energy": {
        "temperature": 20,
        "value": 0.5
      },
      "capacity": {
        "temperature": 20,
        "value": 4,
        "thresholdExhaustion": 80
      }
    },
    "dynamic": {
      "selfDischargingRate": 0.25,
      "roundTripEfficiency": {
        "remaining": {
          "value": 50,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "fade": {
          "value": 50,
          "time": "2023-12-07T10:39:13.576+01:00"
        }
      },
      "operatingEnvironment": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "stateOfCharge": {
        "value": 50,
        "time": "2023-12-07T10:39:13.576+01:00"
      },
      "performanceDocument": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "fullCycles": {
        "value": 1500,
        "time": "2023-12-07T10:39:13.576+01:00"
      },
      "power": {
        "remaining": {
          "value": 40000,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "fade": {
          "value": 50,
          "time": "2023-12-07T10:39:13.576+01:00"
        }
      },
      "negativeEvents": [
        {
          "header": "Sustainability Document Material XY",
          "category": "Product Specifications",
          "type": "URL",
          "content": "www.alink.pdf"
        }
      ],
      "resistance": {
        "increase": {
          "cell": {
            "value": 50,
            "time": "2023-12-07T10:39:13.576+01:00"
          },
          "pack": {
            "value": 50,
            "time": "2023-12-07T10:39:13.576+01:00"
          },
          "module": {
            "value": 50,
            "time": "2023-12-07T10:39:13.576+01:00"
          }
        },
        "remaining": {
          "cell": {
            "value": 0.3,
            "time": "2023-12-07T10:39:13.576+01:00"
          },
          "pack": {
            "value": 0.3,
            "time": "2023-12-07T10:39:13.576+01:00"
          },
          "module": {
            "value": 0.3,
            "time": "2023-12-07T10:39:13.576+01:00"
          }
        }
      },
      "capacity": {
        "fade": {
          "value": 50,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "throughput": {
          "value": 4,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "capacity": {
          "value": 4,
          "time": "2023-12-07T10:39:13.576+01:00"
        }
      },
      "energy": {
        "remaining": {
          "value": 0.5,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "soce": {
          "value": 50,
          "time": "2023-12-07T10:39:13.576+01:00"
        },
        "throughput": {
          "value": 0.5,
          "time": "2023-12-07T10:39:13.576+01:00"
        }
      }
    }
  },
  "sources": [
    {
      "header": "Sustainability Document Material XY",
      "category": "Product Specifications",
      "type": "URL",
      "content": "www.alink.pdf"
    }
  ],
  "physicalDimension": {
    "volume": {
      "value": 20.5,
      "unit": "unit:cubicMetre"
    },
    "length": {
      "value": 20.5,
      "unit": "unit:millimetre"
    },
    "width": {
      "value": 20.5,
      "unit": "unit:millimetre"
    },
    "weight": {
      "value": 20.5,
      "unit": "unit:gram"
    },
    "diameter": {
      "value": 20.5,
      "unit": "unit:millimetre"
    },
    "height": {
      "value": 20.5,
      "unit": "unit:millimetre"
    }
  },
  "safety": {
    "usableExtinguishAgent": [
      {
        "fireClass": "A, B",
        "document": [
          {
            "header": "Sustainability Document Material XY",
            "category": "Product Specifications",
            "type": "URL",
            "content": "www.alink.pdf"
          }
        ],
        "media": "Dry Powder"
      }
    ],
    "safeDischarging": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "meaningOfLabels": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "dismantling": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "removalFromAppliance": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "safetyMeasures": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ]
  },
  "generalInformation": {
    "intoServiceDate": "0278-32-23",
    "lifespan": [
      {
        "value": 36,
        "unit": "unit:day",
        "key": "guaranteed lifetime"
      }
    ],
    "manufacturer": {
      "facility": {
        "left": {
          "locality": {
            "value": "Mannheim",
            "technicalKey": "BLOCK"
          },
          "country": {
            "shortName": "AJ-LA"
          },
          "postCode": {
            "value": "98765-4321",
            "technicalKey": "CEDEX"
          },
          "thoroughfare": {
            "value": "Bernstrasse",
            "number": "45",
            "technicalKey": "STREET"
          },
          "premise": {
            "value": "Werk 1",
            "technicalKey": "BUILDING"
          },
          "postalDeliveryPoint": {
            "value": "Tor 1",
            "technicalKey": "INTERURBAN_DELIVERY_POINT"
          }
        }
      },
      "manufacturingDate": "2000-01-31",
      "manufacturer": {
        "left": {
          "contactProperty": {
            "faxNumber": "+49 89 0987654321",
            "website": "https://www.samsung.com",
            "phoneNumber": "+49 89 1234567890",
            "email": "test.mail@example.com"
          },
          "companyName": [
            "yedUsFwdkelQbxeTeQOvaScfqIOOmaa"
          ],
          "address": {
            "locality": {
              "value": "Mannheim",
              "technicalKey": "BLOCK"
            },
            "country": {
              "shortName": "WY-E"
            },
            "postCode": {
              "value": "98765-4321",
              "technicalKey": "CEDEX"
            },
            "thoroughfare": {
              "value": "Bernstrasse",
              "number": "45",
              "technicalKey": "STREET"
            },
            "premise": {
              "value": "Werk 1",
              "technicalKey": "BUILDING"
            },
            "postalDeliveryPoint": {
              "value": "Tor 1",
              "technicalKey": "INTERURBAN_DELIVERY_POINT"
            }
          }
        }
      }
    }
  },
  "conformity": {
    "declarationOfConformityId": "JxkyvRnL",
    "thirdPartyAssurance": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "resultOfTestReport": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "declarationOfConformity": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ],
    "dueDiligencePolicy": [
      {
        "header": "Sustainability Document Material XY",
        "category": "Product Specifications",
        "type": "URL",
        "content": "www.alink.pdf"
      }
    ]
  },
  "chemicalMaterial": {
    "materialSymbol": {
      "left": "Pb"
    },
    "otherMaterials": {
      "left": [
        {
          "substanceIdentification": [
            {
              "materialid": "201-004-7",
              "type": "CAS"
            }
          ],
          "recycled": 12.5,
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ],
          "renewable": 23.5,
          "substanceName": {
            "chemicalName": "phenolphthalein",
            "type": "IUPAC"
          },
          "concentration": {
            "left": [
              {
                "max": 2.6,
                "min": 2.1
              }
            ]
          },
          "location": "Housing",
          "substanceUnit": "unit:partPerMillion",
          "hazardClass": "Acute toxicity"
        }
      ]
    },
    "hazardousSubstance": {
      "cadmium": {
        "left": {
          "concentration": {
            "left": [
              {
                "max": 2.6,
                "min": 2.1
              }
            ]
          },
          "location": "Housing",
          "substanceUnit": "unit:partPerMillion",
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ]
        }
      },
      "other": {
        "left": [
          {
            "substanceIdentification": [
              {
                "materialid": "201-004-7",
                "type": "CAS"
              }
            ],
            "recycled": 12.5,
            "supportingDocument": [
              {
                "header": "Sustainability Document Material XY",
                "category": "Product Specifications",
                "type": "URL",
                "content": "www.alink.pdf"
              }
            ],
            "renewable": 23.5,
            "substanceName": {
              "chemicalName": "phenolphthalein",
              "type": "IUPAC"
            },
            "concentration": {
              "left": [
                {
                  "max": 2.6,
                  "min": 2.1
                }
              ]
            },
            "location": "Housing",
            "substanceUnit": "unit:partPerMillion",
            "hazardClass": "Acute toxicity"
          }
        ]
      },
      "lead": {
        "left": {
          "concentration": {
            "left": [
              {
                "max": 2.6,
                "min": 2.1
              }
            ]
          },
          "location": "Housing",
          "substanceUnit": "unit:partPerMillion",
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ]
        }
      },
      "mercury": {
        "left": {
          "concentration": {
            "left": [
              {
                "max": 2.6,
                "min": 2.1
              }
            ]
          },
          "location": "Housing",
          "substanceUnit": "unit:partPerMillion",
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ]
        }
      }
    },
    "activeMaterials": {
      "nickel": {
        "left": {
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ],
          "location": "Housing",
          "recycled": 12.5
        }
      },
      "lithium": {
        "left": {
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ],
          "location": "Housing",
          "recycled": 12.5
        }
      },
      "cobalt": {
        "left": {
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ],
          "location": "Housing",
          "recycled": 12.5
        }
      },
      "otherMaterials": {
        "left": [
          {
            "substanceIdentification": [
              {
                "materialid": "201-004-7",
                "type": "CAS"
              }
            ],
            "recycled": 12.5,
            "supportingDocument": [
              {
                "header": "Sustainability Document Material XY",
                "category": "Product Specifications",
                "type": "URL",
                "content": "www.alink.pdf"
              }
            ],
            "renewable": 23.5,
            "substanceName": {
              "chemicalName": "phenolphthalein",
              "type": "IUPAC"
            },
            "concentration": {
              "left": [
                {
                  "max": 2.6,
                  "min": 2.1
                }
              ]
            },
            "location": "Housing",
            "substanceUnit": "unit:partPerMillion",
            "hazardClass": "Acute toxicity"
          }
        ]
      },
      "lead": {
        "left": {
          "supportingDocument": [
            {
              "header": "Sustainability Document Material XY",
              "category": "Product Specifications",
              "type": "URL",
              "content": "www.alink.pdf"
            }
          ],
          "location": "Housing",
          "recycled": 12.5
        }
      }
    },
    "criticalMaterial": [
      {
        "criticalName": "Magnesium",
        "substanceIdentification": [
          {
            "materialid": "201-004-7",
            "type": "CAS"
          }
        ],
        "substanceName": {
          "chemicalName": "phenolphthalein",
          "type": "IUPAC"
        }
      }
    ]
  }
}
```

### Transmission Pass

#### Transmission Pass Introduction

In addition to the Battery Pass, numerous other components will require digital product passports. One example is the vehicle transmission, for which a standardized passport already exists. The Transmission Passport serves as tool for advancing a sustainable and circular transmission value chain.
To enable stakeholders to access relevant data, the passport leverages Catena-X shared services, a standardized data model, and an application. The initial version of the Transmission Passport model includes the following information:

- Transmission Identification
- General Information
- Sustainability Information
- State of Health Information
- Product Specific Parameters
- Instructions
- Track and Trace Data

By incorporating circularity parameters, the Transmission Passport aims to enhance transparency and promote a circular economy within the European Union. Detailed descriptions can be found in the Ecodesign for Sustainable Products Regulation Proposal (ESPR). This proposal identifies content clusters for circularity and establishes concrete circularity parameters for the Transmission Passport. The data sets encompass information relevant to both closed and open loop business models.
It is important to note that the data model includes optional and mandatory information fields to fulfill regulatory requirements. Sharing information within the network relies on decentralized technologies and is always subject to individual decisions by each provider. The data model aligns with the newly proposed Ecodesign Regulation (ESPR-2022) and will be continuously adapted to changing circumstances. As one of the first extensions of the EcoPass KIT, more product passes are expected soon to serve the demand of data models across the automotive industry.
Link to current model

#### Link to current model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/38605f6ddf19a0b4540dd483720d1d8c057ca332/io.catenax.transmission.transmission_pass). For each version there is a separated directory containing the ttl-file and a generated samples.

#### Example Payload

```json
{
  "productSpecificParameters": {
    "torqueConverter": ["RYtGKbgicZaHCBRQDSx"],
    "driveType": "combustion engine",
    "oilType": "ZF Lifeguard Hybrid 2",
    "spreading": 6.79,
    "torque": 500.0,
    "power": 300.0,
    "standardGearRatio": {
      "gear": "1",
      "ratio": 4.1567
    },
    "oilCapacity": 8.9,
    "electricPerformance": ["VLhpfQGTMDYpsBZxvfBoeygjb"],
    "speedResistance": {
      "speed": 7800,
      "gear": "1"
    }
  },
  "instructions": {
    "packagingInstructions": [{ "foo": "bar" }],
    "transportationInstructions": [{ "foo": "bar" }],
    "dismantlingProcedure": [{ "foo": "bar" }],
    "safetyMeasures": [{ "foo": "bar" }],
    "vehicleDismantlingProcedure": [{ "foo": "bar" }]
  },
  "identification": {
    "manufacturerId": "BPNL1234567890ZZ",
    "localIdentifiers": [{ "foo": "bar" }],
    "dataMatrixCode": "UMaAIKKIkknjWEXJUfPxxQHeWKEJ"
  },
  "sparePartSupplier": [{ "foo": "bar" }],
  "stateOfHealth": { "foo": "bar" },
  "generalInformation": { "foo": "bar" },
  "sustainability": { "foo": "bar" }
}
```

### Digital Product Pass

#### Digital Product Pass Introduction

The Digital Product Passport establishes a set of data requirements for different product groups. The parameters will contribute to a more transparent and circular economy within the European Union. The detailed description is given in the Ecodesign for Sustainable Products Regulation Proposal ([ESPR](https://environment.ec.europa.eu/publications/proposal-ecodesign-sustainable-products-regulation_en)). From these regulations, content clusters for circularity were identified, and concrete circularity parameters for the Product Passport derived. The data sets also contain information, which are relevant for closed and open loop business models. It is important to note that the data model contains information / data fields, which are optional and mandatory for regulation fulfillment. It is also worth mentioning that sharing information within the network is based on decentralized technologies and is always based on the individual decision by each provider.

The Digital Product Passport is the core model and can be used as the root class for other, specific, product models. The Passport itself is defined by the usage of Catena-X shared services, a standardized data model and an application which will enable stakeholders to access the relevant data. The first version of the Digital Product Passport model consists of the following information:

- Passport Metadata
- Product Identification
- Product Typology
- Product Characteristics
- Sustainability Information
- Commercial Information
- Operational Information
- Sources
- Additional Data (A generic node structure that allows the representation of non-standardized data)

This data model is based on the new proposed Ecodesign Regulation ([ESPR-2022](https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products_en)) from March 30th, 2022 and is continuously adapted to the basic conditions over time. Amendments to this regulation came from the Council of the European Union ([Council Amendment](https://data.consilium.europa.eu/doc/document/ST-9014-2023-INIT/en/pdf)) from May 15th, 2023 and the European Parliament ([Parliament Amendment](https://www.europarl.europa.eu/doceo/document/TA-9-2023-0272_EN.html)) from July 12th, 2023 and is shown at specific points in the model. However, the main basis remains the version from the Committee.

#### Link to current model

The semantic models are located [here](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.generic.digital_product_passport/). For each version there is a separated directory containing the ttl-file and a generated sample. The latest version available is the `v3.0.0` which sets the base of all the other abstractactions of the Digital Product Pass at the moment like the `Battery Pass v4.0.0` that imports several aspects from the DPP Aspect.


#### Example Payload
```json
{
  "typology": {
    "shortName": "8HP60",
    "class": {
      "definition": "Manual transmission (motor vehicle)",
      "code": "44-09-02-02"
    },
    "longName": "Product Description long text"
  },
  "metadata": {
    "economicOperator": {
      "economicOperatorId": {
        "left": {
          "contactProperty": {
            "faxNumber": "+49 89 0987654321",
            "website": "https://www.samsung.com",
            "phoneNumber": "+49 89 1234567890",
            "email": "test.mail@example.com"
          },
          "companyName": [
            "eOMtThyhVNLWUZNRcBaQKxI"
          ],
          "address": {
            "locality": {
              "value": "Mannheim",
              "technicalKey": "BLOCK"
            },
            "country": {
              "shortName": ""
            },
            "postCode": {
              "value": "98765-4321",
              "technicalKey": "CEDEX"
            },
            "thoroughfare": {
              "value": "Bernstrasse",
              "number": "45",
              "technicalKey": "STREET"
            },
            "premise": {
              "value": "Werk 1",
              "technicalKey": "BUILDING"
            },
            "postalDeliveryPoint": {
              "value": "Tor 1",
              "technicalKey": "INTERURBAN_DELIVERY_POINT"
            }
          }
        }
      }
    },
    "predecessor": {
      "left": "Cc7A36F0-fF6C-44f6-dA85-b13FAeFea068"
    },
    "issueDate": "2000-01-01",
    "version": "1.0.0",
    "passportIdentifier": {
      "left": "urn:uuid:7e7839c6-5EB6-f770-Cec0-Ba0AD7a7DdFa"
    },
    "status": "draft",
    "expirationDate": "2000-01-01"
  },
  "characteristics": {
    "physicalDimension": {
      "grossWeight": {
        "value": 20.5,
        "unit": "unit:gram"
      },
      "weightOrVolume": {
        "left": {
          "value": 20.5,
          "unit": "unit:cubicMetre"
        }
      },
      "diameter": {
        "value": 20.5,
        "unit": "unit:millimetre"
      },
      "grossVolume": {
        "value": 20.5,
        "unit": "unit:cubicMetre"
      },
      "width": {
        "value": 20.5,
        "unit": "unit:millimetre"
      },
      "length": {
        "value": 20.5,
        "unit": "unit:millimetre"
      },
      "height": {
        "value": 20.5,
        "unit": "unit:millimetre"
      }
    },
    "lifespan": [
      {
        "value": 36,
        "unit": "unit:day",
        "key": "guaranteed lifetime"
      }
    ],
    "physicalState": "solid"
  },
  "commercial": {
    "placedOnMarket": "2000-01-01"
  },
  "identification": {
    "localIdentifier": [
      {
        "value": "SN12345678",
        "key": "PartInstanceId"
      }
    ],
    "additionalCode": [
      {
        "value": "8703 24 10 00",
        "key": "TARIC"
      }
    ],
    "dataCarrier": {
      "carrierType": "QR",
      "carrierLayout": "upper-left side"
    }
  },
  "sources": [
    {
      "header": "Sustainability Document Material XY",
      "category": "Product Specifications",
      "type": "URL",
      "content": "www.alink.pdf"
    }
  ],
  "handling": {
    "spareParts": {
      "left": {
        "producer": [
          {
            "id": {
              "left": {
                "contactProperty": {
                  "faxNumber": "+49 89 0987654321",
                  "website": "https://www.samsung.com",
                  "phoneNumber": "+49 89 1234567890",
                  "email": "test.mail@example.com"
                },
                "companyName": [
                  "VLhpfQGTMDYpsBZxvfBoeygjb"
                ],
                "address": {
                  "locality": {
                    "value": "Mannheim",
                    "technicalKey": "BLOCK"
                  },
                  "country": {
                    "shortName": ""
                  },
                  "postCode": {
                    "value": "98765-4321",
                    "technicalKey": "CEDEX"
                  },
                  "thoroughfare": {
                    "value": "Bernstrasse",
                    "number": "45",
                    "technicalKey": "STREET"
                  },
                  "premise": {
                    "value": "Werk 1",
                    "technicalKey": "BUILDING"
                  },
                  "postalDeliveryPoint": {
                    "value": "Tor 1",
                    "technicalKey": "INTERURBAN_DELIVERY_POINT"
                  }
                }
              }
            }
          }
        ],
        "sparePart": [
          {
            "partNumber": "12345678",
            "partName": "Aluminum Housing"
          }
        ]
      }
    },
    "substanceOfConcern": {
      "left": [
        {
          "unit": "unit:partPerMillion",
          "name": {
            "chemicalName": "phenolphthalein",
            "type": "IUPAC"
          },
          "location": "Housing",
          "concentration": {
            "left": [
              {
                "max": 2.6,
                "min": 2.1
              }
            ]
          },
          "exemption": "shall not apply to product x containing not more than 1,5 ml of liquid",
          "id": [
            {
              "materialid": "201-004-7",
              "type": "CAS"
            }
          ],
          "hazardClass": "Acute toxicity"
        }
      ]
    }
  },
  "additionalData": [
    {
      "description": "Description of an attribute",
      "label": "Maximum permitted battery power",
      "type": {
        "typeUnit": "unit:volume",
        "dataType": "array"
      },
      "data": "23",
      "children": [
        {
          "description": "Description of an attribute",
          "label": "Maximum permitted battery power",
          "type": {
            "typeUnit": "unit:volume",
            "dataType": "array"
          },
          "data": "23"
        }
      ]
    }
  ],
  "sustainability": {
    "PEF": {
      "carbon": [
        {
          "lifecycle": "main product production",
          "rulebook": "https://www.alink.pdf/",
          "unit": "kg CO2 eq",
          "performanceClass": "A",
          "manufacturingPlant": {
            "left": {
              "locality": {
                "value": "Mannheim",
                "technicalKey": "BLOCK"
              },
              "country": {
                "shortName": ""
              },
              "postCode": {
                "value": "98765-4321",
                "technicalKey": "CEDEX"
              },
              "thoroughfare": {
                "value": "Bernstrasse",
                "number": "45",
                "technicalKey": "STREET"
              },
              "premise": {
                "value": "Werk 1",
                "technicalKey": "BUILDING"
              },
              "postalDeliveryPoint": {
                "value": "Tor 1",
                "technicalKey": "INTERURBAN_DELIVERY_POINT"
              }
            }
          },
          "type": "Climate Change Total",
          "value": 12.678,
          "declaration": "www.alink.de"
        }
      ],
      "environmental": [
        {
          "lifecycle": "main product production",
          "rulebook": "https://www.alink.pdf/",
          "unit": "kg CO2 eq",
          "performanceClass": "A",
          "manufacturingPlant": {
            "left": {
              "locality": {
                "value": "Mannheim",
                "technicalKey": "BLOCK"
              },
              "country": {
                "shortName": ""
              },
              "postCode": {
                "value": "98765-4321",
                "technicalKey": "CEDEX"
              },
              "thoroughfare": {
                "value": "Bernstrasse",
                "number": "45",
                "technicalKey": "STREET"
              },
              "premise": {
                "value": "Werk 1",
                "technicalKey": "BUILDING"
              },
              "postalDeliveryPoint": {
                "value": "Tor 1",
                "technicalKey": "INTERURBAN_DELIVERY_POINT"
              }
            }
          },
          "type": "Climate Change Total",
          "value": 12.678,
          "declaration": "www.alink.de"
        }
      ]
    },
    "critical": {
      "left": [
        "yedUsFwdkelQbxeTeQOvaScfqIOOmaa"
      ]
    },
    "chemicalMaterial": {
      "left": [
        {
          "name": {
            "chemicalName": "phenolphthalein",
            "type": "IUPAC"
          },
          "unit": "unit:partPerMillion",
          "recycled": 12.5,
          "id": [
            {
              "materialid": "201-004-7",
              "type": "CAS"
            }
          ],
          "value": 5,
          "renewable": 23.5
        }
      ]
    },
    "status": "original"
  },
  "operation": {
    "importer": {
      "left": {
        "eori": "GB123456789000",
        "id": {
          "left": {
            "contactProperty": {
              "faxNumber": "+49 89 0987654321",
              "website": "https://www.samsung.com",
              "phoneNumber": "+49 89 1234567890",
              "email": "test.mail@example.com"
            },
            "companyName": [
              "JxkyvRnL"
            ],
            "address": {
              "locality": {
                "value": "Mannheim",
                "technicalKey": "BLOCK"
              },
              "country": {
                "shortName": ""
              },
              "postCode": {
                "value": "98765-4321",
                "technicalKey": "CEDEX"
              },
              "thoroughfare": {
                "value": "Bernstrasse",
                "number": "45",
                "technicalKey": "STREET"
              },
              "premise": {
                "value": "Werk 1",
                "technicalKey": "BUILDING"
              },
              "postalDeliveryPoint": {
                "value": "Tor 1",
                "technicalKey": "INTERURBAN_DELIVERY_POINT"
              }
            }
          }
        }
      }
    },
    "manufacturer": {
      "facility": {
        "left": {
          "locality": {
            "value": "Mannheim",
            "technicalKey": "BLOCK"
          },
          "country": {
            "shortName": "RQ-AJ"
          },
          "postCode": {
            "value": "98765-4321",
            "technicalKey": "CEDEX"
          },
          "thoroughfare": {
            "value": "Bernstrasse",
            "number": "45",
            "technicalKey": "STREET"
          },
          "premise": {
            "value": "Werk 1",
            "technicalKey": "BUILDING"
          },
          "postalDeliveryPoint": {
            "value": "Tor 1",
            "technicalKey": "INTERURBAN_DELIVERY_POINT"
          }
        }
      },
      "manufacturingDate": "2000-01-31",
      "manufacturer": {
        "left": {
          "contactProperty": {
            "faxNumber": "+49 89 0987654321",
            "website": "https://www.samsung.com",
            "phoneNumber": "+49 89 1234567890",
            "email": "test.mail@example.com"
          },
          "companyName": [
            "RYtGKbgicZaHCBRQDSx"
          ],
          "address": {
            "locality": {
              "value": "Mannheim",
              "technicalKey": "BLOCK"
            },
            "country": {
              "shortName": ""
            },
            "postCode": {
              "value": "98765-4321",
              "technicalKey": "CEDEX"
            },
            "thoroughfare": {
              "value": "Bernstrasse",
              "number": "45",
              "technicalKey": "STREET"
            },
            "premise": {
              "value": "Werk 1",
              "technicalKey": "BUILDING"
            },
            "postalDeliveryPoint": {
              "value": "Tor 1",
              "technicalKey": "INTERURBAN_DELIVERY_POINT"
            }
          }
        }
      }
    }
  }
}
```

## Business Architecture

The Business Architecture illustrates the interaction between the EcoPass KIT and other KITs, components, data models, and artifacts used for identity and access management, illustrated by the Figure below.

![Image: Business Architecture](./resources/adoption-view/adoption-view-EcoPassKITBusinessArch.jpg)

The core of the network is to provide interoperability between different applications. For this reason, a common semantic is indispensable. In the Catena-X ecosystem, it has been agreed to use the description language SAMM to describe data models.
To additionally provide a standardized interface, the open standard of the International Digital Twin Association (IDTA) is used, abbreviated as IDTA. This [standard](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf) corresponds to the Asset Administration Shell (AAS 3.0).
It is used to discover digital twins and exchange actual usage data. The registration and search of digital twins is done by using the [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Digital%20Twin%20Kit/Adoption%20View%20Digital%20Twin%20Kit) which reference implementation is the [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/tree/main) in Tractus-X.
To control access to both usage and meta data, the EcoPass KIT relies on the [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/kits/tractusx-edc/docs/kit/adoption-view/Adoption%20View/). Interactions between two parties occur exclusively peer-to-peer via the standardized interfaces of the Connector KIT, based on the International Data Space Protocol.
Data sovereignty is enabled by so-called verifiable credentials. These rely on the technology of Self-Sovereign Identity (SSI) and are enabled through the Connector KIT. In short, consumers must present their signed credentials, defined by a data provider, before a data contract (and thus a data exchange) can take place. It should be mentioned that this concept is still in the prototype phase as of Release 3.2 and will be expanded in future releases.

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
- Source URL: https://github.com/eclipse-tractusx/eco-pass-kit