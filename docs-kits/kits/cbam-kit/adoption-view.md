---
title: Adoption View
---

#### Introduction

The steady advance of climate change is a global problem that requires global solutions. In view of the fact that the EU has set itself very high climate targets, which are constantly being increased, and that many non-EU countries have less stringent climate policies, there is a risk of carbon leakage. This occurs when companies based in the EU relocate their carbon-intensive production to countries with less stringent climate protection measures than in the EU, or when EU products are replaced by more carbon-intensive imports.

To counteract this development, the EU has launched the Carbon Border Adjustment Mechanism (short: CBAM). This is the EU's instrument for setting fair prices for carbon emissions from the production of carbon-intensive goods imported into the EU. It is also intended to promote cleaner industrial production in non-EU countries.

By confirming that a price has been paid for the carbon emissions generated in the production of certain goods imported into the EU, the CBAM ensures that the carbon price for imports corresponds to the carbon price for domestic production and that the EU's climate targets are not undermined.

The CBAM will initially apply to imports of certain goods and selected inputs whose production is carbon intensive and where the risk of carbon leakage is highest: **cement, iron and steel, aluminum, fertilizers, electricity and hydrogen**. With this expanded scope, the CBAM will eventually - when fully implemented - cover more than 50% of emissions in the sectors covered by the Emission Trading System (ETS). An expansion of the sectors is planned for the future.

The Carbon Border Adjustment Mechanism will apply in its definitive regime from 2026, but the transitional phase, which will last between October 2023 and the end of December 2025, is already underway.

#### Vision

A transparent, interoperable, and sustainable industrial data ecosystem that empowers companies worldwide to accurately capture, share, and manage embedded carbon emissions data for EU-CBAM reporting.

#### Mission

Catena-X provides a reliable, standardized data infrastructure that enables industrial stakeholders to seamlessly exchange specific embedded emission data across global value chains. In the context of the EU Carbon Border Adjustment Mechanism (CBAM), this Catena-X CBAM KIT empowers companies to:

- Collect and validate emissions data at the material and component level using harmonized methodologies.
- Automate CBAM data request workflows, reducing administrative burden and ensuring compliance with EU regulations.
- Integrate upstream and downstream data from suppliers and partners, enabling accurate transmission of the data required for the calculation of embedded emissions for imported goods.
- Ensure data sovereignty and security, allowing companies to retain control over sensitive sustainability information while meeting transparency requirements.
- Facilitate recognition of foreign carbon pricing schemes, promoting fair treatment of non-EU producers.
- Facilitate strategic decision-making by providing actionable insights into emissions hotspots, cost implications, and optimization opportunities within the supply chain.

[Carbon Border Adjustment Mechanism](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en>)

### Business Process

#### Initiation of the CBAM Process

The CBAM (Carbon Border Adjustment Mechanism) process begins when a product is imported into the EU under a customs code that is subject to CBAM reporting and originates from specified countries.  Importers below the defined single mass-based threshold of annual imports are not required to follow the CBAM rules. The importer initiates the process via Catena-X.  (see figure 1)

![CbamCatena](res/cbam-process.svg)

Figure 1: The CBAM Data Exchange mechanism with Catena-X

Catena is used for identifying the importer and the supplier’s contact information and installation site.

- Identification of the importer
- Product Identifier
- Supplier master data
- Installation site
- Contact information of the installation’s operator

The importer contacts the supplier, who is responsible to obtain precise production site information. These details are essential for calculating the initial CO₂ levy using standardized emission values.

#### Quarterly Forecasting and Certificate Purchase

Throughout the year, the importer is required to generate quarterly forecasts of expected import volumes. Based on these forecasts, the importer must purchase a corresponding number of CO₂ certificates in advance specified in the regulation. These certificates are initially based on default emission values or on the emissions known from previous requests,  actual data will only be available in the year following the import. These steps will be outside of the data model; in case of actual data, the data may result from Catena data.

#### Ongoing Data Collection During the Year of import

For each import, the importer collects shipment-specific data (composite data), including:

- Delivery details (Product Number, CN Code, netto mass, date)
- Country of customs origin
- Associated installation
This data is used to specify the outbound request to supplier, maintain traceability and prepare for the final emissions reporting.

#### Year-End Emissions Data Collection

At the end of the reporting year, the importer requests actual CO₂ emission data from all suppliers. These values must be:

- Verified by an EU-accredited verifier
- Based on the actual production process and installation
- Expressed standardized data elements
The supplier, in turn, may need to obtain this data from the operator (the actual producer), especially if they are not directly involved in manufacturing.

The last three sections

- Initiation of the CBAM Process
- Ongoing Data Collection During the Year of import
- Year-End Emissions Data Collection

Are describing the different operation/communication modes for the CBAM interface. This also results into different APIs as well as variants in the data model

#### Submission of the Annual CBAM Report

Using the verified emission data, the importer in the year following the import submits an annual CBAM report to the EU. This report states the actual emissions imported during the import year as well as any local CO2 taxes paid by the operators and allow a calculation of the certificates due:

- If the importer has purchased too few certificates, additional ones must be acquired.
- If too many certificates were purchased, the excess may not always be refunded
The preparation and submission of this report are not part of the KIT’s data model.

#### Transition to Actual Emission Values

From the following year onward, the importer uses the actual emission values for the same installation / CN code combinations (instead of default values) for calculating CO₂ levies on future imports. This transition improves accuracy and reflects the true environmental impact of the imported goods.
However, collecting actual data is only worthwhile for suppliers with significant shipment volumes. For small or one-off deliveries, the administrative effort may outweigh the benefits. In these cases it may be more efficient to rely on the default data  published by the EU-Commission.
The preparation and submission of this report are not part of the KIT’s data model.

#### Challenges and Regulatory Requirements

A major challenge is that EU importers typically do not always have direct contracts with the operator. Instead, they must rely on their suppliers to provide the necessary data from upstream partners. To ensure the availability of the data, it is recommended to contractually oblige the suppliers to provide the data.  This complexity increases with longer supply chains.

The EU requires detailed information, including:

- Production date and installation
- Energy sources used
- Verified CO₂ emissions
These must be reliably collected and submitted via the EU portal, which currently supports Excel uploads or manual entry.

### Architecture

Figure 2 gives an overview about the Archtechture of the CBAM service.
![CbamCatena](res/cbam-architecture.svg)

Figure 2: Architecture of CX-CBAM Service

### CBAM Personas

Here is a tabular overview of the key roles in the CBAM (Carbon Border Adjustment Mechanism) process, along with a brief description of each:

| Role | Description |
| --- | --- |
|Importer/Declarant| Is responsible for to request CBAM relevant reporting data, purchasing CO₂ certificates, and submitting reports to the E U.|
|Supplier| Business (contractual) partner of the customer/Importer responsible to provide initial product and site information from the operator to the customer.|
|Operator| Is a company who operates one or multiple installations (production sites). Responsible for providing verified CO₂ emission data, certified by an EU-accredited verifier.|
|EU| The European Commission, specifically the Directorate-General for Taxation and Customs Union (DG TAXUD), is responsible for the design, development, and maintenance of the CBAM Portal and its associated systems. The CBAM Registry, hich is the central platform for managing declarant authorizations, submitting emissions reports (planned) and for acilitating communication between importers, national authorities, and the Commission.|
|Submitter| An authorized CBAM declarant may delegate the submission of CBAM declarations to a person acting on behalf and in the name of that authorized CBAM declarant. (§7a). This is not in scope of the KIT V1 as the submitter can use the ID of the Importer to access Catena.|

### Semantic Models

Depending on the use case and related KIT, Catena-X provides different semantic models that help to structure and make use of data via semantic information. These models help to provide a basic meaning to the data and their relationship, thereby enabling interoperability between data sets. Catena-X data models rely on principles as understandability, standardization, accuracy, differentiation, audibility, comprehensiveness, and provision of insights to drive improvement actions.

### Example Payload

```json
{
  "type": "object",
  "properties": {
    "partnerMapping": {
      "type": "object",
      "description": "Object with attributes to identify the direct business partners that exchangedthis dataset",
      "properties": {
        "requestId": {
          "type": "string",
          "description": "Unique request ID issued for each request by a customer to the supplier. Supplier uses this ID for reference to which request the response belongs",
          "example": "REQ-2024-001"
        },
        "requestedElements": {
          "type": "enum",
          "description": "Definition of the scope of the requested objects or data attributes to be delivered in a supplier response, as documented separately in respective request type schemes.",
          "enum": [
            "partnerMapping",
            "cnCode",
            "productIds",
            "productDescription",
            "businessTransactionDetails",
            "associatedReferenceDocument",
            "operatorIdentification",
            "operatorActivityData",
            "installationIdentification",
            "installationActivityData",
            "productionMethod",
            "directEmissions",
            "indirectEmissions",
            "attestationOfConformance",
            "carbonPrice"
          ],
          "example": "associatedReferenceDocument, operatorIdentification, operatorActivityData"
        },
        "companyIds": {
          "type": "object",
          "description": "Object with attributes describing the identifiers of the two business exchanging this dataset, namely the requesting and the responding company",
          "properties": {
            "requestingCompany": {
              "type": "object",
              "description": "Object containing one or multiple pairs of identifier type and value of the requesting company, e.g. BPNL of the customer generating the request for emission data",
              "properties": {
                "bpnl": {
                  "type": "string",
                  "description": "BPNL (Business Partner Number Legal) of the customer generating the request for emission data",
                  "example": "BPNL000000000DWF"
                },
                "otherIds": {
                  "type": "array",
                  "description": "Object containing one or multiple pairs of identifier type and value of the requesting company, excluding BPNL.",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Name of the identifier type",
                        "example": "Company-ID"
                      },
                      "value": {
                        "type": "string",
                        "description": "Value of the stated identifier type",
                        "example": "Customer-Corp-12-EU"
                      }
                    },
                    "required": [
                      "type",
                      "value"
                    ]
                  }
                }
              },
              "required": []
            },
            "respondingCompany": {
              "type": "object",
              "description": "Object containing one or multiple identifiers of the responding company",
              "properties": {
                "bpnl": {
                  "type": "string",
                  "description": "BPNL of the supplier receiving the initial request and pushing the emission data.",
                  "example": "BPNL000000000XYZ"
                },
                "otherIds": {
                  "type": "array",
                  "description": "Object containing one or multiple pairs of identifier type and value of the responding company, excluding BPNL.",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Name of the identifier type",
                        "example": "Supplier-ID"
                      },
                      "value": {
                        "type": "string",
                        "description": "Value of the stated identifier type",
                        "example": "Steel-Corp-12-IN"
                      }
                    },
                    "required": [
                      "type",
                      "value"
                    ]
                  }
                }
              },
              "required": []
            }
          },
          "required": []
        }
      },
      "required": [
        "requestId",
        "requestedElements"
      ]
    },
    "good": {
      "type": "array",
      "description": "One or multiple objects documenting the good's CBAM information to allow for multiplie batches or instances of the same CN Code per business transaction, i.e. in case of multiple operators to be listed. Each object allows for only one operator. Multiple objects are possible while the CN code remains identical. ",
      "items": {
        "type": "object",
        "properties": {
          "cnCode": {
            "type": "string",
            "description": "This is the 8-digit CN code (combined nomenclature) of the reported good, refering to official CBAM value list to ensure updated content. ",
            "maxLength": 8,
            "example": 72011000
          },
          "productIds": {
            "type": "array",
            "description": "Set of product identifiers to identify the product from the business transaction",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "description": "Name of the identifier type",
                  "example": "GTIN"
                },
                "value": {
                  "type": "string",
                  "description": "Value of the stated identifier type",
                  "example": 4712345060507
                }
              },
              "required": [
                "type",
                "value"
              ]
            }
          },
          "productDescription": {
            "type": "string",
            "description": "Free text describing the product and any characteristics that help identify the right business transaction per request.",
            "example": "Hot-rolled steel coil, grade S235JR"
          },
          "businessTransactionDetails": {
            "type": "object",
            "description": "Object containing attributes that document a specific business transaction between the customer (e.g. importer) and the supplier to enable a mapping of the request to am actual business transaction.",
            "properties": {
              "referenceDocument": {
                "type": "array",
                "description": "List of documents needed to identify the business transaction, such as invoice, customs declaration, shipping number",
                "items": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "Name of the identifier type, e.g. invoice, purchase order.",
                      "example": "invoice"
                    },
                    "value": {
                      "type": "string",
                      "description": "Value of the stated identifier type",
                      "example": "INV-2024-12345"
                    }
                  },
                  "required": [
                    "type",
                    "value"
                  ]
                }
              },
              "requestReferencePeriodStart": {
                "type": "string",
                "description": "Time stamp for when the reference period of the request starts, which shall be covered by the reference year of the the actual emission values. ",
                "format": "date-time",
                "example": "2024-01-01T00:00:00Z"
              },
              "requestReferencePeriodEnd": {
                "type": "string",
                "description": "Time stamp for when the reference period of the request ends, which shall be covered by the reference year of the the actual emission values. ",
                "format": "date-time",
                "example": "2024-12-31T23:59:59Z"
              },
              "requestedNetMass": {
                "type": "number",
                "description": "Net mass of the CBAM relevant good in tonnes that the request relates to, e.g. according to customs declaration. For completion, the requested net mass needs to match the net mass summed up over all operator objects. Applies to all CBAM relevant goods except for electricity.",
                "example": 60
              },
              "requestedNetElectricity": {
                "type": "number",
                "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                "example": 100
              }
            },
            "required": [
              "requestReferencePeriodStart",
              "requestReferencePeriodEnd"
            ]
          },
          "operator": {
            "type": "array",
            "description": "One or multiple objects containing attributes that describe an operator each that legally owns the installations producing the CBAM good that is subject of this request. Operator can be different to supplier. One supplier (business partner of this transaction) can source the good defined in the business transaction from other suppliers. This can result in multiple operators (mutliple operator objects) involved in the depicted supply chain. ",
            "items": {
              "type": "object",
              "properties": {
                "associatedReferenceDocument": {
                  "type": "object",
                  "description": "Object containing additional specifications to the reference document that the operator is associated to, such as addtional elements or line items within the invoice that are exclusive to the stated operator. ",
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "Repetition of the type of the associated reference document object that this additional meta data  refers to.",
                      "example": "invoice"
                    },
                    "value": {
                      "type": "string",
                      "description": "Repetition of the value of the associated reference document object that this additional meta data specification refers to.",
                      "example": "INV-2024-12345"
                    },
                    "elementDetail": {
                      "type": "object",
                      "description": "Contains additional element details, metadata or specifications related to the reference document; allows custom attributes to be added.",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Categorizes what kind of additional information is being provided",
                          "example": "batchNumber"
                        },
                        "value": {
                          "type": "string",
                          "description": "Value of the additional information.",
                          "example": "02"
                        }
                      },
                      "required": [
                        "type",
                        "value"
                      ]
                    }
                  },
                  "required": [
                    "type",
                    "value",
                    "elementDetail"
                  ]
                },
                "operatorIdentification": {
                  "type": "object",
                  "description": "Object containing attributes to identify the operator.",
                  "properties": {
                    "operatorIsSupplier": {
                      "type": "boolean",
                      "description": "Attribute describing whether the supplier (i.e. the business transaction partner) is also the operator. For example, if TRUE, then the customer (e.g. the importer) could individually reach out to the supplier via supplier BPNL to arrange access to the CBAM operator portal information (O3CI), whereas the response does not need to provide this detail in the response itself. ",
                      "example": "TRUE"
                    },
                    "operatorIds": {
                      "type": "object",
                      "description": "Unique set of identifiers for the operator. BPNL and Operator CBAM ID are listed as separate attributes.",
                      "properties": {
                        "operatorBpnl": {
                          "type": "string",
                          "description": "BPNL (business partner number legal) of operator, if company is registered at Catena-X.",
                          "example": "BPNL000000000OPR"
                        },
                        "operatorCbamId": {
                          "type": "string",
                          "description": "Unique identifier for the operator in the official EU O3CI portal (operator of third country installation). ",
                          "example": "O3CI-OPR-123456"
                        },
                        "otherIds": {
                          "type": "array",
                          "description": "Other identifiers for the operator excluding BPNL and Operator CBAM ID.",
                          "items": {
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "description": "Value of the stated identifier type",
                                "example": "OP.DE-Steel_north_AG1"
                              }
                            },
                            "required": [
                              "value"
                            ]
                          }
                        },
                        "type": {
                          "type": "string",
                          "description": "Name of the identifier type",
                          "example": "Operator-Tracking-ID"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    },
                    "operatorName": {
                      "type": "string",
                      "description": "Name of the operator",
                      "maxLength": 70,
                      "example": "Steel Example Corp."
                    },
                    "operatorContactEmailAddress": {
                      "type": "string",
                      "description": "The email adress of the person that is assigned in the contact details of the operator",
                      "format": "email",
                      "maxLength": 256,
                      "example": "contact@steelexample.com"
                    },
                    "adress": {
                      "type": "object",
                      "description": "Object containing attributes that document the adress of the operator.",
                      "properties": {
                        "country": {
                          "type": "string",
                          "description": "Country code where the operator is established, refering to official CBAM value list to ensure updated content.",
                          "maxLength": 2,
                          "example": "DE"
                        },
                        "city": {
                          "type": "string",
                          "description": "The city where the operator is located",
                          "maxLength": 35,
                          "example": "Duisburg"
                        },
                        "street": {
                          "type": "string",
                          "description": "The street where the operator is located",
                          "maxLength": 70,
                          "example": "Werkstraße 1"
                        }
                      },
                      "required": []
                    }
                  },
                  "required": [
                    "operatorName",
                    "operatorContactEmailAddress"
                  ]
                },
                "operatorActivityData": {
                  "type": "object",
                  "description": "Object describing mass flow attributed to the operator.",
                  "properties": {
                    "netMass": {
                      "type": "number",
                      "description": "Net mass (in tonnes) of the CBAM-relevant good attributable to the specific request, summed over all installations belonging to the operator described in this object. Applies to all CBAM relevant goods except for electricity.",
                      "example": "60.0"
                    },
                    "netElectricity": {
                      "type": "number",
                      "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                      "example": 100
                    }
                  },
                  "required": [
                    "netMass"
                  ]
                },
                "installation": {
                  "type": "array",
                  "description": "One or multiple objects containing attributes that describe each installation producing the CBAM good that is subject of this request. One operator can own multiple installations that provide the CBAM good in this request which results in multiple possible installation objects. Only one production method is allowed per installation. ",
                  "items": {
                    "type": "object",
                    "properties": {
                      "installationIdentification": {
                        "type": "object",
                        "description": "Object containing attributes to identify the installation.",
                        "properties": {
                          "installationIds": {
                            "type": "object",
                            "description": "Unique set of identifiers of the installation ",
                            "properties": {
                              "installationCbamId": {
                                "type": "string",
                                "description": "Unique identifier for the installation in the official EU O3CI portal (operator of third country installation). ",
                                "example": "O3CI-INST-654321"
                              },
                              "otherIds": {
                                "type": "array",
                                "description": "Other identifiers of the installation, excluding the official CBAM installation ID, which is stated as separate attribute. ",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "Name of the identifier type",
                                      "example": "Installation-ID"
                                    },
                                    "value": {
                                      "type": "string",
                                      "description": "Value of the stated identifier type",
                                      "example": "INST-987654"
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "value"
                                  ]
                                }
                              }
                            },
                            "required": []
                          },
                          "installationName": {
                            "type": "string",
                            "description": "Name of the installation",
                            "maxLength": 256,
                            "example": "Steel Manufacturing Facility - Delhi Plant"
                          },
                          "adress": {
                            "type": "object",
                            "description": "Object containing attributes that document the adress of the installation.",
                            "properties": {
                              "countryCode": {
                                "type": "string",
                                "description": "Country code where the installation is established and the good is produced, refering to official CBAM value list to ensure updated content.",
                                "maxLength": 2,
                                "example": "IN"
                              },
                              "city": {
                                "type": "string",
                                "description": "The city where the installation is located",
                                "maxLength": 35,
                                "example": "Delhi"
                              },
                              "longitude": {
                                "type": "string",
                                "description": "The longitude where the installation is located",
                                "maxLength": 17,
                                "example": "77.2197"
                              },
                              "latitude": {
                                "type": "string",
                                "description": "The latitude where the installation is located",
                                "maxLength": 17,
                                "example": "28.6139"
                              },
                              "typeOfCoordinates": {
                                "type": "string",
                                "description": "The type of coordinates: 01 GPS, 02 GNSS",
                                "maxLength": 5,
                                "enum": [
                                  "01",
                                  "02"
                                ],
                                "example": "01"
                              },
                              "plotOrParcelNumber": {
                                "type": "string",
                                "description": "The plot or parcel number of the location",
                                "maxLength": 15,
                                "example": "PLOT-456-INDUSTRIAL-ZONE-A"
                              },
                              "unlocode": {
                                "type": "string",
                                "description": "The UNLOCODE as defined by UNECE list which can be downloaded at https://unece.org/trade/uncefact/unlocode",
                                "maxLength": 17,
                                "example": "INDEL"
                              }
                            },
                            "required": [
                              "countryCode",
                              "city"
                            ]
                          }
                        },
                        "required": [
                          "installationName",
                          "adress"
                        ]
                      },
                      "installationActivityData": {
                        "type": "object",
                        "description": "Object describing temporal reference and mass flow attributed to the installation.",
                        "properties": {
                          "referencePeriodStart": {
                            "type": "string",
                            "description": "Start date of the period in which relevant data was collected at the installation, serving as the reference period for emissions calculation.",
                            "format": "date-time",
                            "example": "2024-01-01T00:00:00Z"
                          },
                          "referencePeriodEnd": {
                            "type": "string",
                            "description": "End date of the period in which relevant data was collected at the installation, serving as the reference period for emissions calculation.",
                            "format": "date-time",
                            "example": "2024-12-31T23:59:59Z"
                          },
                          "netMass": {
                            "type": "number",
                            "description": "Net mass (in tonnes) of the CBAM-relevant good attributable to the specific installation with rerefence to the requested net mass. Applies to all CBAM relevant goods except for electricity.",
                            "example": "60.0"
                          },
                          "netElectricity": {
                            "type": "number",
                            "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                            "example": 100
                          }
                        },
                        "required": [
                          "referencePeriodStart",
                          "referencePeriodEnd"
                        ]
                      },
                      "productionMethod": {
                        "type": "object",
                        "description": "Object detailing the specific production method that the emission object refers to.",
                        "properties": {
                          "methodId": {
                            "type": "string",
                            "description": "Specific identifier of the production method according the official value list provided by the CBAM declarant portal: P01 Calcined clay, P02 Cement clinker, P03 Cement, P04 Aluminuous cement, P05 Sintered ore, P08 Electricity, P09 Steam reforming, P10 Partial oxidation, P11 Other fuel-based hydrogen production, P12 Electrolysis of water, P13 Electrolysis of water (other energy sources), P14 Chlor-Alkali electrolysis, P15 Production of chlorates, P16 Other production routes, P17 Nitric acid, P19 Haber-Bosch process with steam reforming of natural gas or biogas, P20 Haber-Bosch process with gasification of coal or other fuels, P21 Other production routes, P22 Mixed fertilisers, P23 Urea, P24 Blast furnace route, P25 Smelting reduction, P26 Other production routes, P27 Nickel Pig Iron production, P28 Nickel Pig Iron production, P29 Ferro-nickel (FeNi), P30 Ferro-chromium (FeCr), P31 Ferro-manganese (FeMn), P32 Production of Direct reduced Iron (using hydrogen), P33 DRI (Direct reduced iron), P34 Iron or steel products, P35 Basic oxigen steel making, P36 Basic oxigen steel making (incl. Blast furnace), P37 Basic oxigen steel making (incl. Melting reduction), P38 Electric arc furnace, P39 Electric arc furnace (alloy steels)), P40 Electric arc furnace (carbon steel, from direct reduced iron), P41 Electric arc furnace (general), P42 Primary (electrolytic) smelting, P43 Secondary melting (recycling), P44 Mix of primary and secondary production, P45 Aluminium products, P46 Integrated production with primary smelting, P47 Integrated production with secondary melting, P48 Integrated with mixed primary and secondary production",
                            "maxLength": 5,
                            "enum": [
                              "P01",
                              "P02",
                              "P03",
                              "P04",
                              "P05",
                              "P08",
                              "P09",
                              "P10",
                              "P11",
                              "P12",
                              "P13",
                              "P14",
                              "P15",
                              "P16",
                              "P17",
                              "P19",
                              "P20",
                              "P21",
                              "P22",
                              "P23",
                              "P24",
                              "P25",
                              "P26",
                              "P27",
                              "P28",
                              "P29",
                              "P30",
                              "P31",
                              "P32",
                              "P33",
                              "P34",
                              "P35",
                              "P36",
                              "P37",
                              "P38",
                              "P39",
                              "P40",
                              "P41",
                              "P42",
                              "P43",
                              "P44",
                              "P45",
                              "P46",
                              "P47",
                              "P48"
                            ],
                            "example": "P24"
                          },
                          "specificSteelMillId": {
                            "type": "string",
                            "description": "Specific identifier of the steel mill used for the production of the good, if applicable. ",
                            "maxLength": 256,
                            "example": "MILL-001"
                          },
                          "additionalInformation": {
                            "type": "string",
                            "description": "Any additional information that the supplier wants to provide with regard to this object. ",
                            "maxLength": 512,
                            "example": "Uses recycled scrap as input"
                          }
                        },
                        "required": [
                          "methodId"
                        ]
                      }
                    },
                    "required": [
                      "installationIdentification",
                      "installationActivityData"
                    ]
                  }
                }
              },
              "required": [
                "associatedReferenceDocument",
                "operatorIdentification",
                "operatorActivityData",
                "installation"
              ]
            }
          }
        },
        "required": [
          "cnCode",
          "productIds",
          "businessTransactionDetails",
          "operator"
        ]
      }
    }
  },
  "required": [
    "partnerMapping",
    "good"
  ],
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CBAM Request Datamodel 20251117"
}
```

CBAM Request Data Model

```json
{
  "type": "object",
  "properties": {
    "partnerMapping": {
      "type": "object",
      "description": "Object with attributes to identify the direct business partners that exchangedthis dataset",
      "properties": {
        "requestId": {
          "type": "string",
          "description": "Unique request ID issued for each request by a customer to the supplier. Supplier uses this ID for reference to which request the response belongs",
          "example": "REQ-2024-001"
        },
        "responseId": {
          "type": "string",
          "description": "Unique response ID issued for each response by a supplier to the customer. Supplier can create multiple responses with unique Ids with reference to the same request ID, in case of iterative repsonse steps",
          "example": "RESP-2024-001"
        },
        "requestedElements": {
          "type": "enum",
          "description": "Definition of the scope of the requested objects or data attributes to be delivered in a supplier response, as documented separately in respective request type schemes.",
          "enum": [
            "partnerMapping",
            "cnCode",
            "productIds",
            "productDescription",
            "businessTransactionDetails",
            "associatedReferenceDocument",
            "operatorIdentification",
            "operatorActivityData",
            "installationIdentification",
            "installationActivityData",
            "productionMethod",
            "directEmissions",
            "indirectEmissions",
            "attestationOfConformance",
            "carbonPrice"
          ],
          "example": "associatedReferenceDocument, operatorIdentification, operatorActivityData"
        },
        "companyIds": {
          "type": "object",
          "description": "Object with attributes describing the identifiers of the two business exchanging this dataset, namely the requesting and the responding company",
          "properties": {
            "requestingCompany": {
              "type": "object",
              "description": "Object containing one or multiple pairs of identifier type and value of the requesting company, e.g. BPNL of the customer generating the request for emission data",
              "properties": {
                "bpnl": {
                  "type": "string",
                  "description": "BPNL (Business Partner Number Legal) of the customer generating the request for emission data",
                  "example": "BPNL000000000DWF"
                },
                "otherIds": {
                  "type": "array",
                  "description": "Object containing one or multiple pairs of identifier type and value of the requesting company, excluding BPNL.",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Name of the identifier type",
                        "example": "Company-ID"
                      },
                      "value": {
                        "type": "string",
                        "description": "Value of the stated identifier type",
                        "example": "Customer-Corp-12-EU"
                      }
                    },
                    "required": [
                      "type",
                      "value"
                    ]
                  }
                }
              },
              "required": []
            },
            "respondingCompany": {
              "type": "object",
              "description": "Object containing one or multiple identifiers of the responding company",
              "properties": {
                "bpnl": {
                  "type": "string",
                  "description": "BPNL of the supplier receiving the initial request and pushing the emission data.",
                  "example": "BPNL000000000XYZ"
                },
                "otherIds": {
                  "type": "array",
                  "description": "Object containing one or multiple pairs of identifier type and value of the responding company, excluding BPNL.",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Name of the identifier type",
                        "example": "Supplier-ID"
                      },
                      "value": {
                        "type": "string",
                        "description": "Value of the stated identifier type",
                        "example": "Steel-Corp-12-IN"
                      }
                    },
                    "required": [
                      "type",
                      "value"
                    ]
                  }
                }
              },
              "required": []
            }
          },
          "required": []
        }
      },
      "required": [
        "requestId",
        "responseId",
        "requestedElements"
      ]
    },
    "good": {
      "type": "array",
      "description": "One or multiple objects documenting the good's CBAM information to allow for multiplie batches or instances of the same CN Code per business transaction, i.e. in case of multiple operators to be listed. Each object allows for only one operator. Multiple objects are possible while the CN code remains identical. ",
      "items": {
        "type": "object",
        "properties": {
          "cnCode": {
            "type": "string",
            "description": "This is the 8-digit CN code (combined nomenclature) of the reported good, refering to official CBAM value list to ensure updated content. ",
            "maxLength": 8,
            "example": 72011000
          },
          "productIds": {
            "type": "array",
            "description": "Set of product identifiers to identify the product from the business transaction",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "description": "Name of the identifier type",
                  "example": "GTIN"
                },
                "value": {
                  "type": "string",
                  "description": "Value of the stated identifier type",
                  "example": 4712345060507
                }
              },
              "required": [
                "type",
                "value"
              ]
            }
          },
          "productDescription": {
            "type": "string",
            "description": "Free text describing the product and any characteristics that help identify the right business transaction per request.",
            "example": "Hot-rolled steel coil, grade S235JR"
          },
          "businessTransactionDetails": {
            "type": "object",
            "description": "Object containing attributes that document a specific business transaction between the customer (e.g. importer) and the supplier to enable a mapping of the request to am actual business transaction.",
            "properties": {
              "referenceDocument": {
                "type": "array",
                "description": "List of documents needed to identify the business transaction, such as invoice, customs declaration, shipping number",
                "items": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "Name of the identifier type, e.g. invoice, purchase order.",
                      "example": "invoice"
                    },
                    "value": {
                      "type": "string",
                      "description": "Value of the stated identifier type",
                      "example": "INV-2024-12345"
                    }
                  },
                  "required": [
                    "type",
                    "value"
                  ]
                }
              },
              "requestReferencePeriodStart": {
                "type": "string",
                "description": "Time stamp for when the reference period of the request starts, which shall be covered by the reference year of the the actual emission values. ",
                "format": "date-time",
                "example": "2024-01-01T00:00:00Z"
              },
              "requestReferencePeriodEnd": {
                "type": "string",
                "description": "Time stamp for when the reference period of the request ends, which shall be covered by the reference year of the the actual emission values. ",
                "format": "date-time",
                "example": "2024-12-31T23:59:59Z"
              },
              "requestedNetMass": {
                "type": "number",
                "description": "Net mass of the CBAM relevant good in tonnes that the request relates to, e.g. according to customs declaration. For completion, the requested net mass needs to match the net mass summed up over all operator objects. Applies to all CBAM relevant goods except for electricity.",
                "example": 60
              },
              "requestedNetElectricity": {
                "type": "number",
                "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                "example": 100
              }
            },
            "required": [
              "requestReferencePeriodStart",
              "requestReferencePeriodEnd"
            ]
          },
          "operator": {
            "type": "array",
            "description": "One or multiple objects containing attributes that describe an operator each that legally owns the installations producing the CBAM good that is subject of this request. Operator can be different to supplier. One supplier (business partner of this transaction) can source the good defined in the business transaction from other suppliers. This can result in multiple operators (mutliple operator objects) involved in the depicted supply chain. ",
            "items": {
              "type": "object",
              "properties": {
                "associatedReferenceDocument": {
                  "type": "object",
                  "description": "Object containing additional specifications to the reference document that the operator is associated to, such as addtional elements or line items within the invoice that are exclusive to the stated operator. ",
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "Repetition of the type of the associated reference document object that this additional meta data  refers to.",
                      "example": "invoice"
                    },
                    "value": {
                      "type": "string",
                      "description": "Repetition of the value of the associated reference document object that this additional meta data specification refers to.",
                      "example": "INV-2024-12345"
                    },
                    "elementDetail": {
                      "type": "object",
                      "description": "Contains additional element details, metadata or specifications related to the reference document; allows custom attributes to be added.",
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Categorizes what kind of additional information is being provided",
                          "example": "batchNumber"
                        },
                        "value": {
                          "type": "string",
                          "description": "Value of the additional information.",
                          "example": "02"
                        }
                      },
                      "required": [
                        "type",
                        "value"
                      ]
                    }
                  },
                  "required": [
                    "type",
                    "value",
                    "elementDetail"
                  ]
                },
                "operatorIdentification": {
                  "type": "object",
                  "description": "Object containing attributes to identify the operator.",
                  "properties": {
                    "operatorIsSupplier": {
                      "type": "boolean",
                      "description": "Attribute describing whether the supplier (i.e. the business transaction partner) is also the operator. For example, if TRUE, then the customer (e.g. the importer) could individually reach out to the supplier via supplier BPNL to arrange access to the CBAM operator portal information (O3CI), whereas the response does not need to provide this detail in the response itself. ",
                      "example": "TRUE"
                    },
                    "operatorIds": {
                      "type": "object",
                      "description": "Unique set of identifiers for the operator. BPNL and Operator CBAM ID are listed as separate attributes.",
                      "properties": {
                        "operatorBpnl": {
                          "type": "string",
                          "description": "BPNL (business partner number legal) of operator, if company is registered at Catena-X.",
                          "example": "BPNL000000000OPR"
                        },
                        "operatorCbamId": {
                          "type": "string",
                          "description": "Unique identifier for the operator in the official EU O3CI portal (operator of third country installation). ",
                          "example": "O3CI-OPR-123456"
                        },
                        "otherIds": {
                          "type": "array",
                          "description": "Other identifiers for the operator excluding BPNL and Operator CBAM ID.",
                          "items": {
                            "type": "object",
                            "properties": {
                              "value": {
                                "type": "string",
                                "description": "Value of the stated identifier type",
                                "example": "OP.DE-Steel_north_AG1"
                              }
                            },
                            "required": [
                              "value"
                            ]
                          }
                        },
                        "type": {
                          "type": "string",
                          "description": "Name of the identifier type",
                          "example": "Operator-Tracking-ID"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    },
                    "operatorName": {
                      "type": "string",
                      "description": "Name of the operator",
                      "maxLength": 70,
                      "example": "Steel Example Corp."
                    },
                    "operatorContactEmailAddress": {
                      "type": "string",
                      "description": "The email adress of the person that is assigned in the contact details of the operator",
                      "format": "email",
                      "maxLength": 256,
                      "example": "contact@steelexample.com"
                    },
                    "adress": {
                      "type": "object",
                      "description": "Object containing attributes that document the adress of the operator.",
                      "properties": {
                        "country": {
                          "type": "string",
                          "description": "Country code where the operator is established, refering to official CBAM value list to ensure updated content.",
                          "maxLength": 2,
                          "example": "DE"
                        },
                        "city": {
                          "type": "string",
                          "description": "The city where the operator is located",
                          "maxLength": 35,
                          "example": "Duisburg"
                        },
                        "street": {
                          "type": "string",
                          "description": "The street where the operator is located",
                          "maxLength": 70,
                          "example": "Werkstraße 1"
                        }
                      },
                      "required": []
                    }
                  },
                  "required": [
                    "operatorName",
                    "operatorContactEmailAddress"
                  ]
                },
                "operatorActivityData": {
                  "type": "object",
                  "description": "Object describing mass flow attributed to the operator.",
                  "properties": {
                    "netMass": {
                      "type": "number",
                      "description": "Net mass (in tonnes) of the CBAM-relevant good attributable to the specific request, summed over all installations belonging to the operator described in this object. Applies to all CBAM relevant goods except for electricity.",
                      "example": "60.0"
                    },
                    "netElectricity": {
                      "type": "number",
                      "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                      "example": 100
                    }
                  },
                  "required": [
                    "netMass"
                  ]
                },
                "installation": {
                  "type": "array",
                  "description": "One or multiple objects containing attributes that describe each installation producing the CBAM good that is subject of this request. One operator can own multiple installations that provide the CBAM good in this request which results in multiple possible installation objects. Only one production method is allowed per installation. ",
                  "items": {
                    "type": "object",
                    "properties": {
                      "installationIdentification": {
                        "type": "object",
                        "description": "Object containing attributes to identify the installation.",
                        "properties": {
                          "installationIds": {
                            "type": "object",
                            "description": "Unique set of identifiers of the installation ",
                            "properties": {
                              "installationCbamId": {
                                "type": "string",
                                "description": "Unique identifier for the installation in the official EU O3CI portal (operator of third country installation). ",
                                "example": "O3CI-INST-654321"
                              },
                              "otherIds": {
                                "type": "array",
                                "description": "Other identifiers of the installation, excluding the official CBAM installation ID, which is stated as separate attribute. ",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "description": "Name of the identifier type",
                                      "example": "Installation-ID"
                                    },
                                    "value": {
                                      "type": "string",
                                      "description": "Value of the stated identifier type",
                                      "example": "INST-987654"
                                    }
                                  },
                                  "required": [
                                    "type",
                                    "value"
                                  ]
                                }
                              }
                            },
                            "required": []
                          },
                          "installationName": {
                            "type": "string",
                            "description": "Name of the installation",
                            "maxLength": 256,
                            "example": "Steel Manufacturing Facility - Delhi Plant"
                          },
                          "adress": {
                            "type": "object",
                            "description": "Object containing attributes that document the adress of the installation.",
                            "properties": {
                              "countryCode": {
                                "type": "string",
                                "description": "Country code where the installation is established and the good is produced, refering to official CBAM value list to ensure updated content.",
                                "maxLength": 2,
                                "example": "IN"
                              },
                              "city": {
                                "type": "string",
                                "description": "The city where the installation is located",
                                "maxLength": 35,
                                "example": "Delhi"
                              },
                              "longitude": {
                                "type": "string",
                                "description": "The longitude where the installation is located",
                                "maxLength": 17,
                                "example": "77.2197"
                              },
                              "latitude": {
                                "type": "string",
                                "description": "The latitude where the installation is located",
                                "maxLength": 17,
                                "example": "28.6139"
                              },
                              "typeOfCoordinates": {
                                "type": "string",
                                "description": "The type of coordinates: 01 GPS, 02 GNSS",
                                "maxLength": 5,
                                "enum": [
                                  "01",
                                  "02"
                                ],
                                "example": "01"
                              },
                              "plotOrParcelNumber": {
                                "type": "string",
                                "description": "The plot or parcel number of the location",
                                "maxLength": 15,
                                "example": "PLOT-456-INDUSTRIAL-ZONE-A"
                              },
                              "unlocode": {
                                "type": "string",
                                "description": "The UNLOCODE as defined by UNECE list which can be downloaded at https://unece.org/trade/uncefact/unlocode",
                                "maxLength": 17,
                                "example": "INDEL"
                              }
                            },
                            "required": [
                              "countryCode",
                              "city"
                            ]
                          }
                        },
                        "required": [
                          "installationName",
                          "adress"
                        ]
                      },
                      "installationActivityData": {
                        "type": "object",
                        "description": "Object describing temporal reference and mass flow attributed to the installation.",
                        "properties": {
                          "referencePeriodStart": {
                            "type": "string",
                            "description": "Start date of the period in which relevant data was collected at the installation, serving as the reference period for emissions calculation.",
                            "format": "date-time",
                            "example": "2024-01-01T00:00:00Z"
                          },
                          "referencePeriodEnd": {
                            "type": "string",
                            "description": "End date of the period in which relevant data was collected at the installation, serving as the reference period for emissions calculation.",
                            "format": "date-time",
                            "example": "2024-12-31T23:59:59Z"
                          },
                          "netMass": {
                            "type": "number",
                            "description": "Net mass (in tonnes) of the CBAM-relevant good attributable to the specific installation with rerefence to the requested net mass. Applies to all CBAM relevant goods except for electricity.",
                            "example": "60.0"
                          },
                          "netElectricity": {
                            "type": "number",
                            "description": "Net Electricity amount in MWh traded as CBAM good. Applies to Electricity only. ",
                            "example": 100
                          }
                        },
                        "required": [
                          "referencePeriodStart",
                          "referencePeriodEnd"
                        ]
                      },
                      "productionMethod": {
                        "type": "object",
                        "description": "Object detailing the specific production method that the emission object refers to.",
                        "properties": {
                          "methodId": {
                            "type": "string",
                            "description": "Specific identifier of the production method according the official value list provided by the CBAM declarant portal: P01 Calcined clay, P02 Cement clinker, P03 Cement, P04 Aluminuous cement, P05 Sintered ore, P08 Electricity, P09 Steam reforming, P10 Partial oxidation, P11 Other fuel-based hydrogen production, P12 Electrolysis of water, P13 Electrolysis of water (other energy sources), P14 Chlor-Alkali electrolysis, P15 Production of chlorates, P16 Other production routes, P17 Nitric acid, P19 Haber-Bosch process with steam reforming of natural gas or biogas, P20 Haber-Bosch process with gasification of coal or other fuels, P21 Other production routes, P22 Mixed fertilisers, P23 Urea, P24 Blast furnace route, P25 Smelting reduction, P26 Other production routes, P27 Nickel Pig Iron production, P28 Nickel Pig Iron production, P29 Ferro-nickel (FeNi), P30 Ferro-chromium (FeCr), P31 Ferro-manganese (FeMn), P32 Production of Direct reduced Iron (using hydrogen), P33 DRI (Direct reduced iron), P34 Iron or steel products, P35 Basic oxigen steel making, P36 Basic oxigen steel making (incl. Blast furnace), P37 Basic oxigen steel making (incl. Melting reduction), P38 Electric arc furnace, P39 Electric arc furnace (alloy steels)), P40 Electric arc furnace (carbon steel, from direct reduced iron), P41 Electric arc furnace (general), P42 Primary (electrolytic) smelting, P43 Secondary melting (recycling), P44 Mix of primary and secondary production, P45 Aluminium products, P46 Integrated production with primary smelting, P47 Integrated production with secondary melting, P48 Integrated with mixed primary and secondary production",
                            "maxLength": 5,
                            "enum": [
                              "P01",
                              "P02",
                              "P03",
                              "P04",
                              "P05",
                              "P08",
                              "P09",
                              "P10",
                              "P11",
                              "P12",
                              "P13",
                              "P14",
                              "P15",
                              "P16",
                              "P17",
                              "P19",
                              "P20",
                              "P21",
                              "P22",
                              "P23",
                              "P24",
                              "P25",
                              "P26",
                              "P27",
                              "P28",
                              "P29",
                              "P30",
                              "P31",
                              "P32",
                              "P33",
                              "P34",
                              "P35",
                              "P36",
                              "P37",
                              "P38",
                              "P39",
                              "P40",
                              "P41",
                              "P42",
                              "P43",
                              "P44",
                              "P45",
                              "P46",
                              "P47",
                              "P48"
                            ],
                            "example": "P24"
                          },
                          "specificSteelMillId": {
                            "type": "string",
                            "description": "Specific identifier of the steel mill used for the production of the good, if applicable. ",
                            "maxLength": 256,
                            "example": "MILL-001"
                          },
                          "additionalInformation": {
                            "type": "string",
                            "description": "Any additional information that the supplier wants to provide with regard to this object. ",
                            "maxLength": 512,
                            "example": "Uses recycled scrap as input"
                          }
                        },
                        "required": [
                          "methodId"
                        ]
                      },
                      "directEmissions": {
                        "type": "object",
                        "description": "Object deailing the direct embedded emissions referenced to the specific production method and installation",
                        "properties": {
                          "additionalInformation": {
                            "type": "string",
                            "description": "Any additional information that the supplier wants to provide with regard to this object. ",
                            "maxLength": 9999,
                            "example": "Calculated using official CBAM excel template"
                          },
                          "specificEmbeddedEmissionsDirect": {
                            "type": "number",
                            "description": "Value of the direct embedded emissions, expressed in tonnes of CO₂ equivalents per tonne of product, calculated with reference to the specific production method and installation, applies to all CBAM relevant goods except for electricity. ",
                            "example": "1.85"
                          },
                          "emissionFactorElectricityAsGood": {
                            "type": "number",
                            "description": "This value is defined as emission factor of electricity in tonnes CO2 eq. per MWh and is mandatory only, if electricity is the traded good and its CN code is provided in the good object. ",
                            "example": "0.8"
                          },
                          "sourceOfEmissionFactorValueElectricityAsGood": {
                            "type": "string",
                            "description": "This applies only if electricity is the traded CN good and it serves to declare any relevant information regarding the source of the emission factor for the actual emissions. ",
                            "example": "Direct measurements of coal fired electricity plant at installation. "
                          }
                        },
                        "required": [
                          "specificEmbeddedEmissionsDirect"
                        ]
                      },
                      "indirectEmissions": {
                        "type": "object",
                        "description": "Object deailing the indirect embedded emissions referenced to the specific production method and installation",
                        "properties": {
                          "sourceOfEmissionFactor": {
                            "type": "string",
                            "description": "Declaration of applied literature or published information by the statistics office, according to following allowed values: 01 Other, 02 Commission based on IEA data",
                            "maxLength": 5,
                            "enum": [
                              "1.02"
                            ],
                            "example": "02"
                          },
                          "emissionFactorTonnesCo2PerMwh": {
                            "type": "number",
                            "description": "This element declares the applied emission factor for electricity, expressed as tonnes CO2 per MWh",
                            "example": "0.45"
                          },
                          "sourceOfEmissionFactorValue": {
                            "type": "string",
                            "description": "Any additional information detailing the source of the emissions value",
                            "maxLength": 512,
                            "example": "IEA 2022 Electricity Report"
                          },
                          "specificEmbeddedEmissionsIndirect": {
                            "type": "number",
                            "description": "Value of the indirect embedded emissions, expressed in tonnes of CO₂ equivalents per tonne of product, calculated with reference to the specific production method and installation.",
                            "example": "0.25"
                          },
                          "electricityConsumedMwhPerTonnesGood": {
                            "type": "number",
                            "description": "Value of the consumed electricity, expressed as MWh per tonne of good.",
                            "example": "0.6"
                          },
                          "sourceOfElectricity": {
                            "type": "string",
                            "description": "Describes the source of the electricity according to the official value list: SOE01 Direct technical link to electricity generator, SOE02 (Bilateral) power purchase agreement, SOE03 Received from the grid",
                            "maxLength": 5,
                            "enum": [
                              "SOE01",
                              "SOE02",
                              "SOE03"
                            ],
                            "example": "SOE03"
                          }
                        },
                        "required": [
                          "sourceOfEmissionFactor",
                          "emissionFactorTonnesCo2PerMwh",
                          "sourceOfEmissionFactorValue",
                          "specificEmbeddedEmissionsIndirect",
                          "electricityConsumedMwhPerTonnesGood",
                          "sourceOfElectricity"
                        ]
                      },
                      "attestationOfConformance": {
                        "type": "object",
                        "description": "Object describing the attestation of conformance of the presented emission values on installation level, such as the annual verification statement by an accredited verification body according to the CBAM verification rules. ",
                        "properties": {
                          "attestationOfConformanceId": {
                            "type": "string",
                            "description": "Unique number of the verification statement used for tracking and referencing, e.g. UUID v4 if ID is newly generated.",
                            "example": "123e4567-e89b-12d3-a456-426614174000"
                          },
                          "attestationOfConformanceLink": {
                            "type": "string",
                            "description": "A link leading to the declaration of conformance, allowing for a manual option to verify the validity and authenticity of the declaration.",
                            "example": "https://exampleverifier.com/cbam/statement/123e4567"
                          },
                          "providerName": {
                            "type": "string",
                            "description": "Name of the issuing verifier’s legal entity",
                            "example": "TÜV X"
                          },
                          "providerID": {
                            "type": "string",
                            "description": "A unique identifier for the entity attesting the conformance issued by the accreditation institute, i.e. accreditation number.",
                            "example": "5493001KJTIIGC8Y1R12"
                          },
                          "accreditationBodyName": {
                            "type": "string",
                            "description": "Name of the accreditation body.",
                            "example": "National Accreditation Institute ABX"
                          },
                          "completedAt": {
                            "type": "string",
                            "description": "Time stamp for when the attestation of conformity was issued",
                            "example": "2024-03-15T10:00:00Z"
                          }
                        },
                        "required": []
                      },
                      "carbonPrice": {
                        "type": "array",
                        "description": "One or multiple objects describing the carbon price due in a third country per emission object on installation level. ",
                        "items": {
                          "type": "object",
                          "properties": {
                            "typeOfInstrument": {
                              "type": "string",
                              "description": "Attribute describing the form of carbon price, also referred to as type of instrument. The values are defined as: 01 Carbon tax, 02 Carbon levy, 03 Carbon fee, 04 National Emissions Trading System, 05 Regional Emissions Trading System, 06 Other",
                              "maxLength": 5,
                              "enum": [
                                "01",
                                "02",
                                "03",
                                "04",
                                "05",
                                "06"
                              ],
                              "example": "01"
                            },
                            "identifierOfIndependentPerson": {
                              "type": "object",
                              "description": "Identifier of the independent person issuing a payment statement about the carbon price paid by the direct supplier or any other tier-n supplier in the value chain.",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Name of the identifier type",
                                  "example": "BPNL"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "Value of the stated identifier type",
                                  "example": "BPNL000000000IND"
                                }
                              },
                              "required": [
                                "type",
                                "value"
                              ]
                            },
                            "descriptionAndIndicationOfLegalAct": {
                              "type": "string",
                              "description": "Reference the description of the underlying legal act according to which the carbon price was paid",
                              "maxLength": 512,
                              "example": "Country ABC National Carbon Tax Act 2022"
                            },
                            "amountOfCarbonPricePaid": {
                              "type": "number",
                              "description": "Monetary value of the paid carbon price",
                              "example": "12000.00"
                            },
                            "currency": {
                              "type": "string",
                              "description": "The currency used for the declared amount to be paid, refering to official CBAM value list to ensure updated content.",
                              "maxLength": 3,
                              "example": "CNY"
                            },
                            "countryCode": {
                              "type": "string",
                              "description": "Country code where the carbon price is paid, refering to official CBAM value list to ensure updated content.",
                              "maxLength": 2,
                              "example": "CN"
                            }
                          },
                          "required": [
                            "typeOfInstrument",
                            "descriptionAndIndicationOfLegalAct",
                            "amountOfCarbonPricePaid",
                            "currency",
                            "countryCode"
                          ]
                        }
                      }
                    },
                    "required": [
                      "installationIdentification",
                      "installationActivityData",
                      "directEmissions",
                      "indirectEmissions"
                    ]
                  }
                }
              },
              "required": [
                "associatedReferenceDocument",
                "operatorIdentification",
                "operatorActivityData",
                "installation"
              ]
            }
          }
        },
        "required": [
          "cnCode",
          "productIds",
          "businessTransactionDetails",
          "operator"
        ]
      }
    }
  },
  "required": [
    "partnerMapping",
    "good"
  ],
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CBAM Response Datamodel 20251117"
}
```

CBAM Response Data Model

### Possible Use Cases

#### 1. Master data request/reply

The master data request is used when a new supplier is to be created. Their master data is requested via the Catena-X network. The aim is to verify the supplier's identity and obtain important material-related/production-related master data. This exchange is requested via the *MasterDataRequest* API Aufruf.
The supplier responds (*MasterDataReply*. API Aufruf) with their own master data, including:

- Supplier identification (e.g., supplier number)
- Registration status in Catena-X
- Address and contact details
- Details on material composition
- Information on the production site

However, if the supplier does not have a complete overview of the origin or composition of the material, the supplier can consult its sub-supplier. If the sub-supplier is also a Catena-X partner, the same infrastructure can be used.
Once the sub-supplier responds, the supplier consolidates the data and sends it back to the importer.

#### 2. Composition data request/replay

The request for the composition of the import is made when data about the material itself and its ecological footprint is needed for an interim calculation during the year.
Based on the master data, the importer uses the *CompositionDataRequest*-API call to reveive dara from the supplier. This includes:

- Exact material type and structure
- CN number (customs nomenclature)
- Verified CO₂ emission values from the previous year, if available
- The specific material mass delivered for the defined period
- The operator data of the plant in which it was manufactured
  
This data is then sent back to the importer using the *CompositionDataRequest*-API call.

#### 3. Emission data request/reply

The emissions data request is initiated after the end of the calendar year. Its purpose is to record the actual emissions values for all material deliveries per supplier that took place during the year.
The importer sends an emissions data request using the *EmissionsDataRequest*-API call to each supplier, asking for the following:
Actual CO₂ emissions per installation, per material/product produced there The location of the installation for each batch/material/product delivered using the *EmissionDataReply*-API call.
If discrepancies are found—such as unknown locations, incorrect location names, or inconsistent emission values—clarification is requested. Once all data has been verified, the system aggregates it to calculate the annual emissions footprint per supplier and material.

### Non-technical requirement

- None

### Reference Implementation

- none

### Standards

- Legal base: [CBAM Guidance and Legislation - Taxation and Customs Union](<https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-guidance-and-legislation_en>)
- No standards available

### NOTICE

This work is licensed under the CC-BY-4.0.

- Copyright (c) 2025 BASF SE
- Copyright (c) 2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- Copyright (c) 2025 SAP SE
- Copyright (c) 2025 Siemens AG
