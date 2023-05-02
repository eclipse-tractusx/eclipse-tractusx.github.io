---
id: Use Cases
title: Use Cases
description: ''
sidebar_position: 3
---

Here we have provided detailed examples of how the BPDM services can be used. This includes step-by-step instructions for each use case and code snippets showing how to make the API calls for better performance.

## Use Case 1. Request Legal Entity by DE_VAT (via Legal Entity Controller)

Description: The Legal Entity Controller is a module within a larger system that facilitates the retrieval of information about a legal entity using their EU_VAT_ID_DE (German VAT identification number). The system interacts with an internal API to retrieve information about the legal entity and displays it to the user.

### Example request call

Request to the Catena-X API for legal entities with a filter on EU VAT ID DE equals DE281308185. The response you received is a JSON object that contains information about the legal entities that match your query.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities?EU_VAT_ID_DE=DE216038746' \
-H 'accept: */*'
```

### Example response

The response contains a few key fields that you can use to understand the information returned.

* `totalElements` tells you the total number of legal entities that match your query. In this case, there are 10,978.
* `totalPages` tells you the total number of pages of legal entities. Since contentSize is set to 10, there are 1,098 pages in total.page tells you which page you are currently on. In this case, you are on the first page (page 0).
* `contentSize` tells you how many legal entities are included in the current page of results. In this case, there are 10 legal entities returned in the response.
* `content` is an array of legal entities that match your query. Each legal entity contains information about its identifiers, names, legal form, types, bank accounts, roles, and relations.

In this specific response, the first legal entity in the content array has a EU_VAT_ID_DE identifier that matches your query. The other legal entities in the response do not have a EU_VAT_ID_DE identifier, but instead have a CDQID identifier that was imported from CDQ but not synchronized.

```bash
{
    "totalElements": 10978,
    "totalPages": 1098,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M6CI",
                "identifiers": [
                    {
                        "value": "DE216038746",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:634682BDABAEA20268546B5D0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "EXXcellent solutions gmbh",
                        "shortName": null,
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "de",
                            "name": "German"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [
                    {
                        "technicalKey": "LEGAL_ENTITY",
                        "name": "Legal Entity",
                        "url": ""
                    }
                ],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.324800Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M7BT",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6988",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325065Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M8B4",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698b",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325144Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M9AF",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698d",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325202Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MA9Q",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6990",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325260Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MB91",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6998",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325324Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MC8C",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a1",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325388Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MD7N",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a9",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325452Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006ME6Y",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ac",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325509Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MF69",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ae",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325574Z"
            }
        }
    ]
}
```

### 1.1 Direct response

Scenario: The user enters a valid EU_VAT_ID_DE and the internal API returns information about only one legal entity.

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about only one legal entity.
* The Legal Entity Controller displays the information about the legal entity to the user.
* Once you have leagal enity shown then direct response you can get using idType as BPN value as shown in below request and response.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities/BPNL00000006M6CI?idType=BPN' \
-H 'accept: */*'
```

```bash
{
    "bpn": "BPNL00000006M6CI",
    "identifiers": [
        {
            "value": "DE216038746",
            "type": {
                "technicalKey": "EU_VAT_ID_DE",
                "name": "Umsatzsteuer-Identifikationsnummer",
                "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
            },
            "issuingBody": null,
            "status": null
        },
        {
            "value": "CX.POOL:634682BDABAEA20268546B5D0",
            "type": {
                "technicalKey": "CX_POOL_ID",
                "name": "",
                "url": null
            },
            "issuingBody": null,
            "status": null
        }
    ],
    "names": [
        {
            "value": "EXXcellent solutions gmbh",
            "shortName": null,
            "type": {
                "technicalKey": "REGISTERED",
                "name": "The main name under which a business is officially registered in a country's business register.",
                "url": ""
            },
            "language": {
                "technicalKey": "de",
                "name": "German"
            }
        }
    ],
    "legalForm": null,
    "status": null,
    "profileClassifications": [],
    "types": [
        {
            "technicalKey": "LEGAL_ENTITY",
            "name": "Legal Entity",
            "url": ""
        }
    ],
    "bankAccounts": [],
    "roles": [],
    "relations": [],
    "currentness": "2022-10-14T15:00:06.324800Z"
}
```

### 1.2 Match Response

Scenario: The user enters a valid EU_VAT_ID_DE and the internal API returns information about multiple legal entities.

#### 1.2.1 Trade Scoring with Score > 100 -> take highest ranking

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about multiple legal entities.
* The Legal Entity Controller uses trade scoring to determine the highest ranking legal entity.
* The Legal Entity Controller displays the information about the highest ranking legal entity to the user as response.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities?EU_VAT_ID_DE=DE216038746&name=EXXcellent%20solutions%20gmbh' \
-H 'accept: */*'
```

```bash
{
    "totalElements": 7415,
    "totalPages": 742,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "score": 100.268585,
            "legalEntity": {
                "bpn": "BPNL00000006M6CI",
                "identifiers": [
                    {
                        "value": "DE216038746",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:634682BDABAEA20268546B5D0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "EXXcellent solutions gmbh",
                        "shortName": null,
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "de",
                            "name": "German"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [
                    {
                        "technicalKey": "LEGAL_ENTITY",
                        "name": "Legal Entity",
                        "url": ""
                    }
                ],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.324800Z"
            }
        },
        {
            "score": 19.757996,
            "legalEntity": {
                "bpn": "BPNL00000008GFFM",
                "identifiers": [
                    {
                        "value": "XYHRB12345678",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "Smartsense solutions",
                        "shortName": "smartsense",
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "de",
                            "name": "German"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2023-03-29T07:46:09.676156Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL00000000MB7A",
                "identifiers": [
                    {
                        "value": "DE157541318",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:623DADE86E73054B143D508D0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "mainvoice solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:23.043165Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL00000000PTPP",
                "identifiers": [
                    {
                        "value": "CX.POOL:623DAFB86E73054B143D52400",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "DE291361833",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "ColorDruck Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:25.017816Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL00000000R5RO",
                "identifiers": [
                    {
                        "value": "CX.POOL:623DB05ED2D1D42CBAD7F53E0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "DE210099057",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "DSV Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:25.188947Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL000000010YTO",
                "identifiers": [
                    {
                        "value": "DE310880247",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:623DB4FC46722D36980ED1F10",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "DODUCO Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:31.834303Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL000000019ZFT",
                "identifiers": [
                    {
                        "value": "DE113529459",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:623DB95DD2D1D42CBAD7F7A70",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "Chem - Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:36.767678Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL00000001BZ14",
                "identifiers": [
                    {
                        "value": "CX.POOL:623DBA69D2D1D42CBAD7FDBE0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "DE305149989",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "360 Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:38.259090Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL00000001JRII",
                "identifiers": [
                    {
                        "value": "CX.POOL:623DBE5DF4D7204F9A5468EC0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "DE312706707",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "PRP Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-06-03T11:46:42.891266Z"
            }
        },
        {
            "score": 19.11017,
            "legalEntity": {
                "bpn": "BPNL000000045YT4",
                "identifiers": [
                    {
                        "value": "DE291361833",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:62DE4C8F1E6B3B3852691C9E0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "ColorDruck Solutions GmbH",
                        "shortName": null,
                        "type": {
                            "technicalKey": "LOCAL",
                            "name": "The business partner name identifies a business partner in a given context, e.g. a country or region.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "undefined",
                            "name": "Undefined"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-08-10T10:33:35.402952Z"
            }
        }
    ]
}
```

#### 1.2.2 All scores are 0.0 -> no automatic match possible

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about multiple legal entities.
* The Legal Entity Controller determines that all legal entities have a score of 0.
* The Legal Entity Controller notifies the back office that no automatic match is possible and manual intervention is required.
* The back office manually selects the correct legal entity.
* The Legal Entity Controller displays the information about the selected legal entity to the user.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities?EU_VAT_ID_DE=DE216038746' \
-H 'accept: */*'
```

```bash
{
    "totalElements": 10978,
    "totalPages": 1098,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M6CI",
                "identifiers": [
                    {
                        "value": "DE216038746",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:634682BDABAEA20268546B5D0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "EXXcellent solutions gmbh",
                        "shortName": null,
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "de",
                            "name": "German"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [
                    {
                        "technicalKey": "LEGAL_ENTITY",
                        "name": "Legal Entity",
                        "url": ""
                    }
                ],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.324800Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M7BT",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6988",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325065Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M8B4",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698b",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325144Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M9AF",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698d",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325202Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MA9Q",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6990",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325260Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MB91",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6998",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325324Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MC8C",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a1",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325388Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MD7N",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a9",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325452Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006ME6Y",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ac",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325509Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MF69",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ae",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325574Z"
            }
        }
    ]
}
```

### 1.3 Read out BPNL from API - Visualize BPNL for legal Entity

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about the legal entity.
* The Legal Entity Controller reads the BPNL (Business Partner Number List) from the API response.
* The Legal Entity Controller displays the BPNL for the legal entity to the user e.g. "bpn": "BPNL00000006M6CI".

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities?EU_VAT_ID_DE=DE216038746' \
-H 'accept: */*'
```

```bash
{
    "totalElements": 10978,
    "totalPages": 1098,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M6CI",
                "identifiers": [
                    {
                        "value": "DE216038746",
                        "type": {
                            "technicalKey": "EU_VAT_ID_DE",
                            "name": "Umsatzsteuer-Identifikationsnummer",
                            "url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
                        },
                        "issuingBody": null,
                        "status": null
                    },
                    {
                        "value": "CX.POOL:634682BDABAEA20268546B5D0",
                        "type": {
                            "technicalKey": "CX_POOL_ID",
                            "name": "",
                            "url": null
                        },
                        "issuingBody": null,
                        "status": null
                    }
                ],
                "names": [
                    {
                        "value": "EXXcellent solutions gmbh",
                        "shortName": null,
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "de",
                            "name": "German"
                        }
                    }
                ],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [
                    {
                        "technicalKey": "LEGAL_ENTITY",
                        "name": "Legal Entity",
                        "url": ""
                    }
                ],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.324800Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M7BT",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6988",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325065Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M8B4",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698b",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325144Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006M9AF",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb698d",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325202Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MA9Q",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6990",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325260Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MB91",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb6998",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325324Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MC8C",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a1",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325388Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MD7N",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69a9",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325452Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006ME6Y",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ac",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325509Z"
            }
        },
        {
            "score": 0.0,
            "legalEntity": {
                "bpn": "BPNL00000006MF69",
                "identifiers": [
                    {
                        "value": "63485ec63cd3b21131fb69ae",
                        "type": {
                            "technicalKey": "CDQID",
                            "name": "CDQ Identifier",
                            "url": ""
                        },
                        "issuingBody": {
                            "technicalKey": "CDQ",
                            "name": "CDQ AG",
                            "url": ""
                        },
                        "status": {
                            "technicalKey": "CDQ_IMPORTED",
                            "name": "Imported from CDQ but not synchronized"
                        }
                    }
                ],
                "names": [],
                "legalForm": null,
                "status": null,
                "profileClassifications": [],
                "types": [],
                "bankAccounts": [],
                "roles": [],
                "relations": [],
                "currentness": "2022-10-14T15:00:06.325574Z"
            }
        }
    ]
}
```

### 1.4 Fetch sites for legal entity via API

Scenario: The user enters a valid BPN under pathparam and the internal API returns information about site legal entities.

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about the legal entity.
* The Legal Entity Controller reads the BPNL from the API response.
* The Legal Entity Controller sends an API call to the internal API to fetch the sites for the legal entity using the BPNL.
* The internal API returns information about the sites associated with the legal entity.
* The Legal Entity Controller displays the information about the sites to the user.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities/BPNL0000000002XY/sites' \
-H 'accept: */*'
```

### 1.5 Fetch addresses legal entity via API

Scenario: The user enters a valid BPN under pathparam and the internal API returns information about site legal entities.

Flow:

* The user inputs a valid EU_VAT_ID_DE to the Legal Entity Controller.
* The Legal Entity Controller sends an API call to the internal API with the EU_VAT_ID_DE.
* The internal API returns information about the legal entity.
* The Legal Entity Controller reads the BPNL from the API response.
* The Legal Entity Controller sends an API call to the internal API to fetch the sites for the legal entity using the BPNL.
* The internal API returns information about the addressess associated with the legal entity.
* The Legal Entity Controller displays the information about the addresses to the user.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities/BPNL0000000002XY/addresses' \
-H 'accept: */*'
```

## Use Case 2. Update data from Legal Entity (via BPNL Controller)

Description: This use case involves a user updating data for a legal entity associated with a Business Partner Number (BPN). The user sends an API call to the business-partner-controller, which retrieves the changelog for the BPNL. The business-partner-controller checks if there are any updates since the last update and fetches the updated data for the BPNL via the Legal Entity Controller if there are updates. The Legal Entity Controller updates the legal entity data, sites, and addresses associated with the BPNL.

### 2.1 Get Changelog for BPNL via business-partner-controller

Scenario: The user enters a valid BPN under pathparam and the internal API returns information about changelogs legal entities.

Flow:

* The user initiates a request to search for changelogs for a specific BPNL.
* The business-partner-controller sends an API call to the internal API to get the changelog for the BPNL.
* The internal API returns the changelog for the BPNL.
* Also can be filter data based on date named as Modified after, The business-partner-controller Controller checks if there are any updates since the last update.
* If there are updates, the business-partner-controller fetches the updated data for the BPNL via the Legal Entity Controller.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/business-partners/BPNL0000000002XY/changelog' \
-H 'accept: */*'
```

```bash
{
    "totalElements": 348,
    "totalPages": 35,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "CREATE",
            "timestamp": "2022-06-03T11:46:06.026385Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2022-08-26T15:07:53.720182Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T10:00:08.984829Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T11:00:02.163396Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T12:00:02.470334Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T13:00:02.335824Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T14:00:02.382226Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T15:00:02.205573Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T16:00:02.210457Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T17:00:02.507209Z"
        }
    ]
}
```

### 2.2 If changelog since last update fetch data for BPNL via Legal Entity Controller

Scenario: As explained in 2.1, use can add filter for fetching data for BPNL based on modified date and below is example for same request.

```bash
curl --location 'https://partners-pool.int.demo.catena-x.net/api/catena/business-partners/changelog?bpn=BPNL0000000002XY&modifiedAfter=2023-02-14' \
-H 'accept: */*'
```

```bash
{
    "totalElements": 348,
    "totalPages": 35,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "CREATE",
            "timestamp": "2022-06-03T11:46:06.026385Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2022-08-26T15:07:53.720182Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T10:00:08.984829Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T11:00:02.163396Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T12:00:02.470334Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T13:00:02.335824Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T14:00:02.382226Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T15:00:02.205573Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T16:00:02.210457Z"
        },
        {
            "bpn": "BPNL0000000002XY",
            "changelogType": "UPDATE",
            "timestamp": "2023-02-14T17:00:02.507209Z"
        }
    ]
}
```

#### 2.2.1 Update Legal Entity

Scenario: The user enters a valid BPN under pathparam and hit post api call to update specific legal enitity.

Flow:

* The BPNL Controller sends an API call to the internal API to update the legal entity data for the BPNL.
* The internal API updates the legal entity data for the BPNL.
* The BPNL Controller displays a message to the user that the legal entity data has been updated.

```bash
curl -X 'POST' \
  'https://partners-pool.int.demo.catena-x.net/api/catena/legal-entities' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "identifiers": [
      {
        "value": "string",
        "type": "string",
        "issuingBody": "string",
        "status": "string"
      }
    ],
    "names": [
      {
        "value": "string",
        "shortName": "string",
        "type": "ACRONYM",
        "language": "undefined"
      }
    ],
    "legalForm": "string",
    "status": {
      "officialDenotation": "string",
      "validFrom": "2023-05-01T08:47:59.178Z",
      "validUntil": "2023-05-01T08:47:59.178Z",
      "type": "ACTIVE"
    },
    "profileClassifications": [
      {
        "value": "string",
        "code": "string",
        "type": "NACE"
      }
    ],
    "types": [
      "BRAND"
    ],
    "bankAccounts": [
      {
        "trustScores": [
          0
        ],
        "currency": "UNDEFINED",
        "internationalBankAccountIdentifier": "string",
        "internationalBankIdentifier": "string",
        "nationalBankAccountIdentifier": "string",
        "nationalBankIdentifier": "string"
      }
    ],
    "legalAddress": {
      "version": {
        "characterSet": "ARABIC",
        "language": "undefined"
      },
      "careOf": "string",
      "contexts": [
        "string"
      ],
      "country": "UNDEFINED",
      "administrativeAreas": [
        {
          "value": "string",
          "shortName": "string",
          "fipsCode": "string",
          "type": "COUNTY"
        }
      ],
      "postCodes": [
        {
          "value": "string",
          "type": "CEDEX"
        }
      ],
      "localities": [
        {
          "value": "string",
          "shortName": "string",
          "type": "BLOCK"
        }
      ],
      "thoroughfares": [
        {
          "value": "string",
          "name": "string",
          "shortName": "string",
          "number": "string",
          "direction": "string",
          "type": "INDUSTRIAL_ZONE"
        }
      ],
      "premises": [
        {
          "value": "string",
          "shortName": "string",
          "number": "string",
          "type": "BUILDING"
        }
      ],
      "postalDeliveryPoints": [
        {
          "value": "string",
          "shortName": "string",
          "number": "string",
          "type": "INTERURBAN_DELIVERY_POINT"
        }
      ],
      "geographicCoordinates": {
        "longitude": 0,
        "latitude": 0,
        "altitude": 0
      },
      "types": [
        "BRANCH_OFFICE"
      ]
    },
    "index": "string"
  }
]'
```

#### 2.2.2 Update Sites

Scenario: The user enters a valid BPN under pathparam and hit post api call to update sites for specific legal enitity.

Flow:

* The BPNL Controller sends an API call to the internal API to update the sites associated with the legal entity for the BPNL.
* The internal API updates the site data for the legal entity associated with the BPNL.
* The BPNL Controller displays a message to the user that the site data has been updated.

```bash
curl -X 'PUT' \
  'https://partners-pool.int.demo.catena-x.net/api/catena/sites' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "bpn": "string",
    "name": "string",
    "mainAddress": {
      "version": {
        "characterSet": "ARABIC",
        "language": "undefined"
      },
      "careOf": "string",
      "contexts": [
        "string"
      ],
      "country": "UNDEFINED",
      "administrativeAreas": [
        {
          "value": "string",
          "shortName": "string",
          "fipsCode": "string",
          "type": "COUNTY"
        }
      ],
      "postCodes": [
        {
          "value": "string",
          "type": "CEDEX"
        }
      ],
      "localities": [
        {
          "value": "string",
          "shortName": "string",
          "type": "BLOCK"
        }
      ],
      "thoroughfares": [
        {
          "value": "string",
          "name": "string",
          "shortName": "string",
          "number": "string",
          "direction": "string",
          "type": "INDUSTRIAL_ZONE"
        }
      ],
      "premises": [
        {
          "value": "string",
          "shortName": "string",
          "number": "string",
          "type": "BUILDING"
        }
      ],
      "postalDeliveryPoints": [
        {
          "value": "string",
          "shortName": "string",
          "number": "string",
          "type": "INTERURBAN_DELIVERY_POINT"
        }
      ],
      "geographicCoordinates": {
        "longitude": 0,
        "latitude": 0,
        "altitude": 0
      },
      "types": [
        "BRANCH_OFFICE"
      ]
    }
  }
]'
```

#### 2.2.3 Update Addresses

Scenario: The user enters a valid BPN under pathparam and hit post api call to update addressess for specific legal enitity.

Flow:

* The BPNL Controller sends an API call to the internal API to update the addresses associated with the legal entity for the BPNL.
* The internal API updates the address data for the legal entity associated with the BPNL.
* The BPNL Controller displays a message to the user that the address data has been updated.

```bash
curl -X 'PUT' \
  'https://partners-pool.int.demo.catena-x.net/api/catena/addresses' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "bpn": "string",
    "version": {
      "characterSet": "ARABIC",
      "language": "undefined"
    },
    "careOf": "string",
    "contexts": [
      "string"
    ],
    "country": "UNDEFINED",
    "administrativeAreas": [
      {
        "value": "string",
        "shortName": "string",
        "fipsCode": "string",
        "type": "COUNTY"
      }
    ],
    "postCodes": [
      {
        "value": "string",
        "type": "CEDEX"
      }
    ],
    "localities": [
      {
        "value": "string",
        "shortName": "string",
        "type": "BLOCK"
      }
    ],
    "thoroughfares": [
      {
        "value": "string",
        "name": "string",
        "shortName": "string",
        "number": "string",
        "direction": "string",
        "type": "INDUSTRIAL_ZONE"
      }
    ],
    "premises": [
      {
        "value": "string",
        "shortName": "string",
        "number": "string",
        "type": "BUILDING"
      }
    ],
    "postalDeliveryPoints": [
      {
        "value": "string",
        "shortName": "string",
        "number": "string",
        "type": "INTERURBAN_DELIVERY_POINT"
      }
    ],
    "geographicCoordinates": {
      "longitude": 0,
      "latitude": 0,
      "altitude": 0
    },
    "types": [
      "BRANCH_OFFICE"
    ]
  }
]'
```
