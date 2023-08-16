---
id: Use Cases
title: Use Cases
description: ''
sidebar_position: 3
---

Here we have provided detailed examples of how the BPDM services can be used. This includes step-by-step instructions for each use case and code snippets showing how to make the API calls for better performance.

## Use case 1. Create/setup test data on local system for Pool api

Description: This use case provides step-by-step instructions for setting up the local environment and starting the Pool API service for the BPDM (Business Partner Data Management) system. By following these instructions, users can easily clone the repository, configure the necessary services using Docker, and run the Pool API service on their local system.

This use case aims to provide users with clear and concise instructions, ensuring a smooth setup process for working with the BPDM Pool API on their local systems.

### 1.1 Start BPDM Pool Api service

1. Clone the repository:
    - Go to the following GitHub repository: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
    - Clone the repository to your local system using Git. You can use the following command:

    ```bash
    git clone https://github.com/eclipse-tractusx/bpdm
    ```

    - Choose an IDE:You can use any IDE of your preference to view the code. One recommended IDE is IntelliJ IDEA as it is Kotlin springBoot application.

2. Configure local service:
    - Open the docker-compose.yml file in the project.
    - This file contains the configuration for running a local instance of PostgreSQL and OpenSearch.
    - Make sure you have Docker installed on your system.
    - If you don't have your own database, you can use Docker to create a local instance of PostgreSQL and OpenSearch.
    - Run the following command from the command prompt or from the IDE's terminal to start the Docker containers:

    ```bash
    docker-compose up
    ```

3. Start the Pool API service:
    - Open your IDE and navigate to the following directory within the cloned repository: bpdm-pool/src/main/kotlin/org/eclipse/tractusx/bpdm/pool.
    - Navigate to Application.kt file.
    - Run the main class Application.kt to start the Pool API service.
    - The service should start and listen on the specified port for local setup it will be on <http://localhost:8080/>.

### 1.2 Test data setup

1. Download the Postman collection JSON file:
   - Go to the following GitHub repository path: [https://github.com/eclipse-tractusx/bpdm/tree/main/docs/postman](https://github.com/eclipse-tractusx/bpdm/tree/main/docs/postman)
   - Locate the JSON file named "BPDM Pool.postman_collection.json" and click on it to view its contents.
   - Click the "Raw" button to download the file.

2. Open Postman:
   - If you don't have Postman installed, you can download it from the official website: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
   - Open Postman on your local system.

3. Import the collection:
   - In the Postman application, click on the "Import" button located in the top left corner of the window.
   - Select the "File" tab.
   - Click on the "Choose Files" button and browse to the location where you downloaded the "BPDM Pool.postman_collection.json" file.
   - Select the JSON file and click "Open" to import it.

4. Verify the imported collection:
   - After importing, you should see the "BPDM Pool" collection listed in the left sidebar of the Postman application.
   - Click on the imported collection to expand it and view the available requests and folders.

5. Set up environment variables:
   - In Postman, click on the "Manage Environments" button located in the top right corner of the window (it looks like an eye icon).
   - Click on the "Add" button to create a new environment.
   - Provide a name for the environment (e.g., "BPDM Pool Local").
   - Add the following variables:
     - Name: `Pool-Host`, Initial Value: `http://localhost:YOUR_PORT_NUMBER`
       (Replace `YOUR_PORT_NUMBER` with the actual port number on which your Pool API service is running.)

6. Check if metadata is available:
   - Expand the "BPDM Pool" collection in the left sidebar.
   - Click on the "GET identifier-types" request.
   - In the request URL, replace `{{Pool-Host}}` with the appropriate Pool API host URL (e.g., `http://localhost:YOUR_PORT_NUMBER`).
   - Click the "Send" button to make the request.
   - Verify if the response contains the identifier types.

   - Similarly, repeat the above steps for the following requests:
     - "GET issuing-bodies"
     - "GET identifier-status"

   - If any of the metadata (identifier types, issuing bodies, identifier status) is not available in the response, you can create them using the respective "POST" requests provided in the Postman collection.

Now you have imported the Postman collection and checked if the metadata is available using the provided endpoints. If any metadata is missing, you can create it using the corresponding requests in the collection.

## Use Case 2. Request Legal Entity by identifier number

Description: The Legal Entity Controller is a module within a larger system that facilitates the retrieval of information about a legal entity using their identifier number. In this use case, we are providing examples by starting services on local machine.

The examples taken below are generic and depending on use cases, we have mentioned snippet of particular api request and response for better understanding. In this use case, consider you being user you have identifier and you want to get legal entity for same.

### Example request call

The request should be made first to check Catenea-X api for checking the identifier first. This request will be handled by metadata controller and will provide all available identifier type in particular enviroment.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/identifier-types?page=0&size=100'
```

Response:

```bash
{
    "totalElements": 26,
    "totalPages": 1,
    "page": 0,
    "contentSize": 26,
    "content": [
        {
            "technicalKey": "EU_VAT_ID_DE",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_FR",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_AT",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_BE",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_CH",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_CZ",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_DK",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_ES",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_GB",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_NO",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "EU_VAT_ID_PL",
            "name": "Value added tax identification number",
            "url": null
        },
        {
            "technicalKey": "GS1_GLN",
            "name": "Global Location Number",
            "url": null
        },
        {
            "technicalKey": "LEI_ID",
            "name": "Legal Entity Identifier",
            "url": null
        },
        {
            "technicalKey": "DUNS_ID",
            "name": "Data Universal Numbering System",
            "url": null
        },
        {
            "technicalKey": "DE_BNUM",
            "name": "Handelsregister (HRB)",
            "url": null
        },
        {
            "technicalKey": "FR_SIREN",
            "name": "Siren/Siret",
            "url": null
        },
        {
            "technicalKey": "BR_ID_AT",
            "name": "Firmenbuchnummer",
            "url": null
        },
        {
            "technicalKey": "BE_ENT_NO",
            "name": "Organisation number",
            "url": null
        },
        {
            "technicalKey": "CH_UID",
            "name": "Company Identification Number CH",
            "url": null
        },
        {
            "technicalKey": "CZ_ICO",
            "name": "Company Identification Number CZ",
            "url": null
        },
        {
            "technicalKey": "CVR_DK",
            "name": "Business Registration Number DK",
            "url": null
        },
        {
            "technicalKey": "CIF_ES",
            "name": "Certificado de Identificación Fiscal",
            "url": null
        },
        {
            "technicalKey": "ID_CRN",
            "name": "Company Registration Number",
            "url": null
        },
        {
            "technicalKey": "NO_ORGID",
            "name": "Organization Number",
            "url": null
        },
        {
            "technicalKey": "PL_REG",
            "name": "REGON",
            "url": null
        },
        {
            "technicalKey": "CUSTOM_ID_TYPE",
            "name": "Custom Identifier Type for Testing",
            "url": null
        }
    ]
}
```

The response here showing technical key for identifier type with it's name. For better understanding of this use case, we are considering identifier type i.e. CUSTOM_ID_TYPE for future examples.

Now as per the above response, you can check your desired technical identifier which is nothing but kind of VAT number for particular legal entity. Request to the Catena-X API for legal entities with a filter on legal entity identifier i.e. 123456789 and with idType as CUSTOM_ID_TYPE. The response you received is a JSON object that contains information about the legal entity that match your query.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities/123456789?idType=CUSTOM_ID_TYPE'
```

### 2.1 Direct response

Scenario: The user enters a valid identifier number woth idType CUSTOM_ID_TYPE and the API returns information about only one legal entity.

Flow:

- The user inputs a valid identification number i.e. 123456789 and idType as CUSTOM_ID_TYPE to api request.
- The Legal Entity Controller displays the information about the legal entity as a response to the request.
- Once you have legal enity shown then direct response you can get using idType as BPN value as shown in below request and response.

Response:

```bash
{
    "bpn": "BPNL000000000001",
    "identifiers": [
        {
            "value": "123456789",
            "type": {
                "technicalKey": "CUSTOM_ID_TYPE",
                "name": "Custom Identifier Type for Testing",
                "url": null
            },
            "issuingBody": {
                "technicalKey": "CUSTOM_ISSUE_BODY",
                "name": "Custom Issuing Body for Testing",
                "url": null
            },
            "status": {
                "technicalKey": "CUSTOM_ID_STATUS",
                "name": "Custom Identifier Status for Testing"
            }
        }
    ],
    "names": [
        {
            "value": "Name of Company",
            "shortName": "NoC",
            "type": {
                "technicalKey": "ACRONYM",
                "name": "An acronym commonly used for a business partner.",
                "url": ""
            },
            "language": {
                "technicalKey": "en",
                "name": "English"
            }
        }
    ],
    "legalForm": {
        "technicalKey": "CUSTOM_LEGAL_FORM",
        "name": "Custom Legal Form for Testing",
        "url": null,
        "mainAbbreviation": "CLF_0001",
        "language": {
            "technicalKey": "en",
            "name": "English"
        },
        "categories": [
            {
                "name": "holding company",
                "url": null
            }
        ]
    },
    "status": {
        "officialDenotation": "Active",
        "validFrom": "2020-12-16T05:54:48.942",
        "validUntil": null,
        "type": {
            "technicalKey": "ACTIVE",
            "name": "Active",
            "url": ""
        }
    },
    "profileClassifications": [
        {
            "value": "Farming of cattle, dairy farming",
            "code": "01.21",
            "type": {
                "name": "NACE",
                "url": ""
            }
        }
    ],
    "types": [],
    "bankAccounts": [
        {
            "trustScores": [],
            "currency": {
                "technicalKey": "EUR",
                "name": "Euro"
            },
            "internationalBankAccountIdentifier": "11223445569",
            "internationalBankIdentifier": "TEST1234",
            "nationalBankAccountIdentifier": "004566676",
            "nationalBankIdentifier": "TEST223"
        }
    ],
    "roles": [],
    "relations": [],
    "currentness": "2023-05-08T12:02:38.289932Z"
}
```

- If user putted wrong identifier number like below which is not available in DB then response will be as below.

Bad request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities/name?idType=CUSTOM_ID_TYPE'
```

Response:

```bash
{
    "timestamp": "2023-05-08T12:54:07.606+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/api/catena/legal-entities/name"
}
```

### 2.2 Match Response

Scenario: To get matched response, you can use multiple key and value pair. Multiple attributes like name, legalForm, status, classification etc can be used with desired known values for them.

#### 2.2.1 Trade Scoring with Score -> take highest ranking

Flow:

- The user inputs a valid name key as Name of Company to the legal entity api request.
- The Legal Entity Controller provides response with multple legal entities.
- The Legal Entity Controller uses trade scoring to determine the highest ranking legal entity.
- The legal entity that matches values getting more score ranking.
- The Legal Entity Controller displays the information about the highest ranking legal entity to the user as response.
- Those legal entities having more scroe will take precedence like BPNL000000000001 got higher precedence with score 11.198933.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities?name=Name%20of%20Company&page=0&size=10'
```

Response:

```bash
{
    "totalElements": 2,
    "totalPages": 1,
    "page": 0,
    "contentSize": 2,
    "content": [
        {
            "score": 11.171583,
            "legalEntity": {
                "bpn": "BPNL000000000001",
                "identifiers": [
                    {
                        "value": "123456789",
                        "type": {
                            "technicalKey": "CUSTOM_ID_TYPE",
                            "name": "Custom Identifier Type for Testing",
                            "url": null
                        },
                        "issuingBody": {
                            "technicalKey": "CUSTOM_ISSUE_BODY",
                            "name": "Custom Issuing Body for Testing",
                            "url": null
                        },
                        "status": {
                            "technicalKey": "CUSTOM_ID_STATUS",
                            "name": "Custom Identifier Status for Testing"
                        }
                    }
                ],
                "names": [
                    {
                        "value": "Name of Company",
                        "shortName": "NoC",
                        "type": {
                            "technicalKey": "ACRONYM",
                            "name": "An acronym commonly used for a business partner.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "en",
                            "name": "English"
                        }
                    }
                ],
                "legalForm": {
                    "technicalKey": "CUSTOM_LEGAL_FORM",
                    "name": "Custom Legal Form for Testing",
                    "url": null,
                    "mainAbbreviation": "CLF_0001",
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    },
                    "categories": [
                        {
                            "name": "holding company",
                            "url": null
                        }
                    ]
                },
                "status": {
                    "officialDenotation": "Active",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validUntil": null,
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active",
                        "url": ""
                    }
                },
                "profileClassifications": [
                    {
                        "value": "Farming of cattle, dairy farming",
                        "code": "01.21",
                        "type": {
                            "name": "NACE",
                            "url": ""
                        }
                    }
                ],
                "types": [],
                "bankAccounts": [
                    {
                        "trustScores": [],
                        "currency": {
                            "technicalKey": "EUR",
                            "name": "Euro"
                        },
                        "internationalBankAccountIdentifier": "11223445569",
                        "internationalBankIdentifier": "TEST1234",
                        "nationalBankAccountIdentifier": "004566676",
                        "nationalBankIdentifier": "TEST223"
                    }
                ],
                "roles": [],
                "relations": [],
                "currentness": "2023-05-08T12:02:38.289932Z"
            }
        },
        {
            "score": 1.5469646,
            "legalEntity": {
                "bpn": "BPNL0000000001YN",
                "identifiers": [
                    {
                        "value": "987654321",
                        "type": {
                            "technicalKey": "CUSTOM_ID_TYPE",
                            "name": "Custom Identifier Type for Testing",
                            "url": null
                        },
                        "issuingBody": {
                            "technicalKey": "CUSTOM_ISSUE_BODY",
                            "name": "Custom Issuing Body for Testing",
                            "url": null
                        },
                        "status": {
                            "technicalKey": "CUSTOM_ID_STATUS",
                            "name": "Custom Identifier Status for Testing"
                        }
                    }
                ],
                "names": [
                    {
                        "value": "Other Test Company",
                        "shortName": "OTC",
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "en",
                            "name": "English"
                        }
                    }
                ],
                "legalForm": {
                    "technicalKey": "CUSTOM_LEGAL_FORM",
                    "name": "Custom Legal Form for Testing",
                    "url": null,
                    "mainAbbreviation": "CLF_0001",
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    },
                    "categories": [
                        {
                            "name": "holding company",
                            "url": null
                        }
                    ]
                },
                "status": {
                    "officialDenotation": "Dissolved",
                    "validFrom": "2021-03-14T05:54:48.942",
                    "validUntil": null,
                    "type": {
                        "technicalKey": "DISSOLVED",
                        "name": "Dissolved",
                        "url": ""
                    }
                },
                "profileClassifications": [
                    {
                        "value": "Warehousing and Storage",
                        "code": "49",
                        "type": {
                            "name": "NAICS",
                            "url": ""
                        }
                    }
                ],
                "types": [],
                "bankAccounts": [
                    {
                        "trustScores": [],
                        "currency": {
                            "technicalKey": "EUR",
                            "name": "Euro"
                        },
                        "internationalBankAccountIdentifier": "7654432212",
                        "internationalBankIdentifier": "TEST1234",
                        "nationalBankAccountIdentifier": "999847444",
                        "nationalBankIdentifier": "TEST223"
                    }
                ],
                "roles": [],
                "relations": [],
                "currentness": "2023-05-08T12:02:38.290191Z"
            }
        }
    ]
}
```

#### 2.2.2 All scores are Equal or 0.0 -> no automatic match possible

Flow:

- The user inputs a valid key and vale to the legal entity api request.
- Consider use has enter key - legalForm and value - Custom Legal Form for Testing under api request shown below while quering.  
- The Legal Entity Controlle API returns information about multiple legal entities.
- The Legal Entity Controller determines that all both two legal entities matching same filter.
- The Legal Entity Controller displays the information about both legal entities in response as shown in below.
- Here both legal entities i.e. BPNL000000000001 and BPNL0000000001YN are having same score which is 11.198933.
- Consider if user haven't applied any filter for attribute for this GET reuest then all legal enities will return as response and their score will be 0.0

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities?legalForm=Custom%20Legal%20Form%20for%20Testing&page=0&size=10'
```

Response:

```bash
{
    "totalElements": 2,
    "totalPages": 1,
    "page": 0,
    "contentSize": 2,
    "content": [
        {
            "score": 11.198933,
            "legalEntity": {
                "bpn": "BPNL000000000001",
                "identifiers": [
                    {
                        "value": "123456789",
                        "type": {
                            "technicalKey": "CUSTOM_ID_TYPE",
                            "name": "Custom Identifier Type for Testing",
                            "url": null
                        },
                        "issuingBody": {
                            "technicalKey": "CUSTOM_ISSUE_BODY",
                            "name": "Custom Issuing Body for Testing",
                            "url": null
                        },
                        "status": {
                            "technicalKey": "CUSTOM_ID_STATUS",
                            "name": "Custom Identifier Status for Testing"
                        }
                    }
                ],
                "names": [
                    {
                        "value": "Name of Company",
                        "shortName": "NoC",
                        "type": {
                            "technicalKey": "ACRONYM",
                            "name": "An acronym commonly used for a business partner.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "en",
                            "name": "English"
                        }
                    }
                ],
                "legalForm": {
                    "technicalKey": "CUSTOM_LEGAL_FORM",
                    "name": "Custom Legal Form for Testing",
                    "url": null,
                    "mainAbbreviation": "CLF_0001",
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    },
                    "categories": [
                        {
                            "name": "holding company",
                            "url": null
                        }
                    ]
                },
                "status": {
                    "officialDenotation": "Active",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validUntil": null,
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active",
                        "url": ""
                    }
                },
                "profileClassifications": [
                    {
                        "value": "Farming of cattle, dairy farming",
                        "code": "01.21",
                        "type": {
                            "name": "NACE",
                            "url": ""
                        }
                    }
                ],
                "types": [],
                "bankAccounts": [
                    {
                        "trustScores": [],
                        "currency": {
                            "technicalKey": "EUR",
                            "name": "Euro"
                        },
                        "internationalBankAccountIdentifier": "11223445569",
                        "internationalBankIdentifier": "TEST1234",
                        "nationalBankAccountIdentifier": "004566676",
                        "nationalBankIdentifier": "TEST223"
                    }
                ],
                "roles": [],
                "relations": [],
                "currentness": "2023-05-08T12:02:38.289932Z"
            }
        },
        {
            "score": 11.198933,
            "legalEntity": {
                "bpn": "BPNL0000000001YN",
                "identifiers": [
                    {
                        "value": "987654321",
                        "type": {
                            "technicalKey": "CUSTOM_ID_TYPE",
                            "name": "Custom Identifier Type for Testing",
                            "url": null
                        },
                        "issuingBody": {
                            "technicalKey": "CUSTOM_ISSUE_BODY",
                            "name": "Custom Issuing Body for Testing",
                            "url": null
                        },
                        "status": {
                            "technicalKey": "CUSTOM_ID_STATUS",
                            "name": "Custom Identifier Status for Testing"
                        }
                    }
                ],
                "names": [
                    {
                        "value": "Other Test Company",
                        "shortName": "OTC",
                        "type": {
                            "technicalKey": "REGISTERED",
                            "name": "The main name under which a business is officially registered in a country's business register.",
                            "url": ""
                        },
                        "language": {
                            "technicalKey": "en",
                            "name": "English"
                        }
                    }
                ],
                "legalForm": {
                    "technicalKey": "CUSTOM_LEGAL_FORM",
                    "name": "Custom Legal Form for Testing",
                    "url": null,
                    "mainAbbreviation": "CLF_0001",
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    },
                    "categories": [
                        {
                            "name": "holding company",
                            "url": null
                        }
                    ]
                },
                "status": {
                    "officialDenotation": "Dissolved",
                    "validFrom": "2021-03-14T05:54:48.942",
                    "validUntil": null,
                    "type": {
                        "technicalKey": "DISSOLVED",
                        "name": "Dissolved",
                        "url": ""
                    }
                },
                "profileClassifications": [
                    {
                        "value": "Warehousing and Storage",
                        "code": "49",
                        "type": {
                            "name": "NAICS",
                            "url": ""
                        }
                    }
                ],
                "types": [],
                "bankAccounts": [
                    {
                        "trustScores": [],
                        "currency": {
                            "technicalKey": "EUR",
                            "name": "Euro"
                        },
                        "internationalBankAccountIdentifier": "7654432212",
                        "internationalBankIdentifier": "TEST1234",
                        "nationalBankAccountIdentifier": "999847444",
                        "nationalBankIdentifier": "TEST223"
                    }
                ],
                "roles": [],
                "relations": [],
                "currentness": "2023-05-08T12:02:38.290191Z"
            }
        }
    ]
}
```

The response contains a few key fields that you can use to understand the information returned.

- `totalElements` tells you the total number of legal entities that match your query. In this case, there are 10,978.
- `totalPages` tells you the total number of pages of legal entities. Since contentSize is set to 10, there are 1,098 pages in total.page tells you which page you are currently on. In this case, you are on the first page (page 0).
- `contentSize` tells you how many legal entities are included in the current page of results. In this case, there are 10 legal entities returned in the response.
- `content` is an array of legal entities that match your query. Each legal entity contains information about its identifiers, names, legal form, types, bank accounts, roles, and relations.

### 2.3 Search particular legal entity  

Scenario: The user enters a valid BPN under request body and API returns information about legal entities in response.

Flow:

- The user inputs string in request body for api POST request call.
- If user entered value is correct i.e. if provided BPN is correct. Example in this request body provided "BPNL000000000001".
- Then Legal Entity Controller provide search result with one legal entity details.
- The Legal Entity Controller reads the BPNL (Business Partner Number List) from the API request and displays response as below.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities/search' \
--header 'Content-Type: application/json' \
--data '[
  "BPNL000000000001"
]'
```

Response:

```bash
[
    {
        "bpn": "BPNL000000000001",
        "identifiers": [
            {
                "value": "123456789",
                "type": {
                    "technicalKey": "CUSTOM_ID_TYPE",
                    "name": "Custom Identifier Type for Testing",
                    "url": null
                },
                "issuingBody": {
                    "technicalKey": "CUSTOM_ISSUE_BODY",
                    "name": "Custom Issuing Body for Testing",
                    "url": null
                },
                "status": {
                    "technicalKey": "CUSTOM_ID_STATUS",
                    "name": "Custom Identifier Status for Testing"
                }
            }
        ],
        "names": [
            {
                "value": "Name of Company",
                "shortName": "NoC",
                "type": {
                    "technicalKey": "ACRONYM",
                    "name": "An acronym commonly used for a business partner.",
                    "url": ""
                },
                "language": {
                    "technicalKey": "en",
                    "name": "English"
                }
            }
        ],
        "legalForm": {
            "technicalKey": "CUSTOM_LEGAL_FORM",
            "name": "Custom Legal Form for Testing",
            "url": null,
            "mainAbbreviation": "CLF_0001",
            "language": {
                "technicalKey": "en",
                "name": "English"
            },
            "categories": [
                {
                    "name": "holding company",
                    "url": null
                }
            ]
        },
        "status": {
            "officialDenotation": "Active",
            "validFrom": "2020-12-16T05:54:48.942",
            "validUntil": null,
            "type": {
                "technicalKey": "ACTIVE",
                "name": "Active",
                "url": ""
            }
        },
        "profileClassifications": [
            {
                "value": "Farming of cattle, dairy farming",
                "code": "01.21",
                "type": {
                    "name": "NACE",
                    "url": ""
                }
            }
        ],
        "types": [],
        "bankAccounts": [
            {
                "trustScores": [],
                "currency": {
                    "technicalKey": "EUR",
                    "name": "Euro"
                },
                "internationalBankAccountIdentifier": "11223445569",
                "internationalBankIdentifier": "TEST1234",
                "nationalBankAccountIdentifier": "004566676",
                "nationalBankIdentifier": "TEST223"
            }
        ],
        "roles": [],
        "relations": [],
        "currentness": "2023-05-08T12:02:38.289932Z"
    }
]
```

### 2.4 Fetch sites for legal entity

Scenario: The user enters a valid BPNL under pathparam and the API returns information about site legal entities.

Flow:

- The user inputs a valid BPNL in pathparam as shown in below GET api request.
- The Legal Entity Controller information about the legal entity sites as shown in response.
- The BPN in response are nothing but BPNS along with name of the site.
- The Legal Entity Controller provide details array of BPNS and name if more than one site is present.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities/BPNL000000000001/sites?page=0&size=10'
```

Response:

```bash
{
    "totalElements": 2,
    "totalPages": 1,
    "page": 0,
    "contentSize": 2,
    "content": [
        {
            "bpn": "BPNS000000000001",
            "name": "Factory UT"
        },
        {
            "bpn": "BPNS0000000001YN",
            "name": "Factory Sindelfingen"
        }
    ]
}
```

### 2.5 Fetch addresses for legal entity  

Scenario: The user enters a valid BPNL under pathparam and the API returns information about address partners legal entities.

Flow:

- The user inputs a valid BPNL in pathparam as shown in below GET api request.
- The Legal Entity Controller information about the legal entity address as shown in response.
- The BPN in response are nothing but BPNA along with number of other fields like version, careOf, contexts, country etc.
- The Legal Entity Controller provide details array of BPNA.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/legal-entities/BPNL0000000001YN/addresses?page=0&size=10'
```

Response:

```bash
{
    "totalElements": 1,
    "totalPages": 1,
    "page": 0,
    "contentSize": 1,
    "content": [
        {
            "bpn": "BPNA0000000001YN",
            "version": {
                "characterSet": {
                    "technicalKey": "WESTERN_LATIN_STANDARD",
                    "name": "Western Latin Standard (ISO 8859-1; Latin-1)"
                },
                "language": {
                    "technicalKey": "en",
                    "name": "English"
                }
            },
            "careOf": null,
            "contexts": [],
            "country": {
                "technicalKey": "DE",
                "name": "Germany"
            },
            "administrativeAreas": [
                {
                    "value": "Baden-Wuerttemberg",
                    "shortName": "BW",
                    "fipsCode": "GM01",
                    "type": {
                        "technicalKey": "REGION",
                        "name": "Region",
                        "url": ""
                    },
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    }
                }
            ],
            "postCodes": [
                {
                    "value": "80331",
                    "type": {
                        "technicalKey": "REGULAR",
                        "name": "Regular",
                        "url": ""
                    }
                }
            ],
            "localities": [
                {
                    "value": "Bavaria",
                    "shortName": "B",
                    "type": {
                        "technicalKey": "CITY",
                        "name": "City",
                        "url": ""
                    },
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    }
                }
            ],
            "thoroughfares": [
                {
                    "value": "Standort Strasse 10",
                    "name": "Standort Strasse",
                    "shortName": "Standort Str.",
                    "number": "10",
                    "direction": null,
                    "type": {
                        "technicalKey": "STREET",
                        "name": "Street",
                        "url": ""
                    },
                    "language": {
                        "technicalKey": "en",
                        "name": "English"
                    }
                }
            ],
            "premises": [],
            "postalDeliveryPoints": [],
            "geographicCoordinates": null,
            "types": [
                {
                    "technicalKey": "UNSPECIFIC",
                    "name": "Unspecified",
                    "url": ""
                }
            ]
        }
    ]
}
```

## Use Case 3. Update data from Legal Entity and check changelog

Description: This use case involves a user updating record for a legal entity business partner associated with a Business Partner Number (BPNL). Changelogs can be identified using business partner controller, it have one GET api request explained in below use case to show up the changelog details for provided BPN.

The user can use an API call for the business partner controller, which retrieves the changelog for reuested BPNL. The business-partner-controller checks if there are any updates since the last update and fetches array of the updated data for the BPNL via the business partner controller if there are updates in provided date and time frame. The Legal Entity Controller can be use to update the legal entity. Similarly site controller and address controller can be used to update sites and address type business partners respectively.

### 3.1 Get Changelog for BPNL via business-partner-controller

Scenario: The user enters a valid BPN under query param and business partner controller api returns information about changelogs for legal entities and also filteration should be their to fetch changelog only after particular dates.

Flow:

- The user initiates a request to search for changelogs for a specific BPNL by providing BPN in api request.
- Here in example request, user has putted two query params named as bpn with value BPNL0000000001YN and modifiedAfter with value 2023-03-21T09:00:25.298594Z.
- The business-partner-controller returns the changelog for the BPNL entered.
- Also user can be filter data based on date named as Modified after paramter, The business-partner-controller checks if there are any updates since the last update.
- If there are updates, the business partner controller fetches the updated data for the BPNL.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/business-partners/changelog?page=0&size=10&modifiedAfter=2023-03-21T09%3A00%3A25.298594Z&bpn=BPNL0000000001YN'
```

Response:

```bash
{
    "totalElements": 2,
    "totalPages": 1,
    "page": 0,
    "contentSize": 2,
    "content": [
        {
            "bpn": "BPNL0000000001YN",
            "changelogType": "CREATE",
            "timestamp": "2023-05-04T11:18:34.915176Z"
        },
        {
            "bpn": "BPNL0000000001YN",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-08T12:02:38.323994Z"
        }
    ]
}
```

### 3.2 Changelog for update on business partner

Scenario: Apply the changes or update on business partner of type legal entity, site and address through api request. Check changelog for each business partner.

#### 3.2.1 Update Legal Entity

Flow:

- The user updates legal entity by hiting PUT api call as shown in request below.
- The legal entity controller updates business partner of type legal entity as per the provided request body.  
- The Respone will be displayed to user with updated details for  a message to the user that the legal entity data has been updated.

Request:

```bash
curl --location --request PUT 'http://localhost:8080/api/catena/legal-entities' \
--header 'Content-Type: application/json' \
--data '[
    {
        "identifiers": [
            {
                "value": "123456789",
                "type": "CUSTOM_ID_TYPE",
                "issuingBody": "CUSTOM_ISSUE_BODY",
                "status": "CUSTOM_ID_STATUS"
            }
        ],
        "names": [
            {
                "value": "Name of Company Test",
                "shortName": "NoC",
                "type": "ACRONYM",
                "language": "en"
            }
        ],
        "legalForm": "CUSTOM_LEGAL_FORM",
        "status": {
            "officialDenotation": "Active",
            "validFrom": "2020-12-16T05:54:48.942Z",
            "type": "ACTIVE"
        },
        "profileClassifications": [
            {
                "value": "Farming of cattle, dairy farming",
                "code": "01.21",
                "type": "NACE"
            }
        ],
        "bankAccounts": [
            {
                "currency": "EUR",
                "internationalBankAccountIdentifier": "11223445569",
                "internationalBankIdentifier": "TEST1234",
                "nationalBankAccountIdentifier": "004566676",
                "nationalBankIdentifier": "TEST223"
            }
        ],
        "legalAddress": {
            "version": {
                "characterSet": "WESTERN_LATIN_STANDARD",
                "language": "en"
            },
            "country": "DE",
            "administrativeAreas": [
                {
                    "value": "Baden-Wuerttemberg",
                    "shortName": "BW",
                    "fipsCode": "GM01",
                    "type": "REGION"
                }
            ],
            "postCodes": [
                {
                    "value": "70546",
                    "type": "REGULAR"
                }
            ],
            "localities": [
                {
                    "value": "Stuttgart",
                    "shortName": "S",
                    "type": "CITY"
                }
            ],
            "thoroughfares": [
                {
                    "value": "Stuttgarter Strasse 1",
                    "name": "Stuttgarter Strasse",
                    "shortName": "Stuttgarter Str.",
                    "number": "1",
                    "type": "STREET"
                }
            ],
            "premises": [
                {
                    "value": "Building A",
                    "shortName": "A",
                    "number": "A",
                    "type": "BUILDING"
                }
            ],
            "postalDeliveryPoints": [
                {
                    "value": "On-site Mailbox",
                    "type": "MAILBOX"
                }
            ],
            "geographicCoordinates": {
                "longitude": 0,
                "latitude": 0,
                "altitude": 0
            },
            "types": [
                "HEADQUARTER",
                "REGISTERED"
            ]
        },
        "bpn": "BPNL000000000001"
    },
    {
        "identifiers": [
            {
                "value": "987654321",
                "type": "CUSTOM_ID_TYPE",
                "issuingBody": "CUSTOM_ISSUE_BODY",
                "status": "CUSTOM_ID_STATUS"
            }
        ],
        "names": [
            {
                "value": "Other Test Company",
                "shortName": "OTC",
                "type": "REGISTERED",
                "language": "en"
            }
        ],
        "legalForm": "CUSTOM_LEGAL_FORM",
        "status": {
            "officialDenotation": "Dissolved",
            "validFrom": "2021-03-14T05:54:48.942Z",
            "type": "DISSOLVED"
        },
        "profileClassifications": [
            {
                "value": "Warehousing and Storage",
                "code": "49",
                "type": "NAICS"
            }
        ],
        "bankAccounts": [
            {
                "currency": "EUR",
                "internationalBankAccountIdentifier": "7654432212",
                "internationalBankIdentifier": "TEST1234",
                "nationalBankAccountIdentifier": "999847444",
                "nationalBankIdentifier": "TEST223"
            }
        ],
        "legalAddress": {
            "version": {
                "characterSet": "WESTERN_LATIN_STANDARD",
                "language": "en"
            },
            "country": "DE",
            "administrativeAreas": [
                {
                    "value": "Bavaria",
                    "shortName": "B",
                    "fipsCode": "GM02",
                    "type": "REGION"
                }
            ],
            "postCodes": [
                {
                    "value": "80331",
                    "type": "REGULAR"
                }
            ],
            "localities": [
                {
                    "value": "Munich",
                    "shortName": "M",
                    "type": "CITY"
                }
            ],
            "thoroughfares": [
                {
                    "value": "Muenchener Strasse 1",
                    "name": "Muenchener Strasse",
                    "shortName": "Munchener Str.",
                    "number": "1",
                    "type": "STREET"
                }
            ],
            "premises": [
                {
                    "value": "Block 1",
                    "shortName": "B1",
                    "number": "1",
                    "type": "BUILDING"
                }
            ],
            "postalDeliveryPoints": [
                {
                    "value": "On-site Mailbox",
                    "type": "MAILBOX"
                }
            ],
            "geographicCoordinates": {
                "longitude": 0,
                "latitude": 0,
                "altitude": 0
            },
            "types": [
                "HEADQUARTER",
                "REGISTERED"
            ]
        },
        "bpn": "BPNL0000000001YN"
    }
]'
```

#### 3.2.2 Update Site

Flow:

- The user updates site by hiting PUT api call as shown in request below.
- The site controller updates business partner of type site as per the provided request body.  
- The Respone will be displayed to user with updated details for a message to the user that the site data has been updated.  

Request:

```bash
curl --location --request PUT 'http://localhost:8080/api/catena/sites' \
--header 'Content-Type: application/json' \
--data '[
    {
        "name": "Factory UT test",
        "mainAddress": {
            "version": {
                "characterSet": "WESTERN_LATIN_STANDARD",
                "language": "en"
            },
            "country": "DE",
            "administrativeAreas": [
                {
                    "value": "Baden-Wuerttemberg",
                    "shortName": "BW",
                    "fipsCode": "GM01",
                    "type": "REGION"
                }
            ],
            "postCodes": [
                {
                    "value": "70327",
                    "type": "REGULAR"
                }
            ],
            "localities": [
                {
                    "value": "Stuttgart",
                    "shortName": "S",
                    "type": "CITY"
                }
            ],
            "thoroughfares": [
                {
                    "value": "Untertuerckheim Strasse 1",
                    "name": "Untertuerckheim Strasse",
                    "shortName": "Untertuerckheim Str.",
                    "number": "1",
                    "type": "STREET"
                }
            ],
            "premises": [
                {
                    "value": "Gate 1",
                    "shortName": "G1",
                    "number": "1",
                    "type": "BUILDING"
                }
            ],
            "types": [
                "UNSPECIFIC"
            ]
        },
        "bpn": "BPNS000000000001"
    },
    {
        "name": "Factory Sindelfingen",
        "mainAddress": {
            "version": {
                "characterSet": "WESTERN_LATIN_STANDARD",
                "language": "en"
            },
            "country": "DE",
            "administrativeAreas": [
                {
                    "value": "Baden-Wuerttemberg",
                    "shortName": "BW",
                    "fipsCode": "GM01",
                    "type": "REGION"
                }
            ],
            "postCodes": [
                {
                    "value": "71034",
                    "type": "REGULAR"
                }
            ],
            "localities": [
                {
                    "value": "Sindelfinden",
                    "shortName": "BB",
                    "type": "CITY"
                }
            ],
            "thoroughfares": [
                {
                    "value": "Sindelfinger Strasse 1",
                    "name": "Sindelfinger Strasse",
                    "shortName": "Sindelfinger Str.",
                    "number": "1",
                    "type": "STREET"
                }
            ],
            "premises": [
                {
                    "value": "Building 8",
                    "shortName": "G8",
                    "number": "8",
                    "type": "BUILDING"
                }
            ],
            "types": [
                "UNSPECIFIC"
            ]
        },
        "bpn": "BPNS0000000001YN"
    }
]'
```

#### 3.2.3 Update Addresses

Flow:

- The user updates address by hiting PUT api call as shown in request below.
- The address controller updates business partner of type address as per the provided request body.  
- The Respone will be displayed to user with updated details for a message to the user that the address data has been updated.  

Request:

```bash
curl --location --request PUT 'http://localhost:8080/api/catena/addresses' \
--header 'Content-Type: application/json' \
--data '[
    {
        "version": {
            "characterSet": "WESTERN_LATIN_STANDARD",
            "language": "en"
        },
        "country": "DE",
        "administrativeAreas": [
            {
                "value": "Baden-Wuerttemberg-test",
                "shortName": "BW",
                "fipsCode": "GM01",
                "type": "REGION"
            }
        ],
        "postCodes": [
            {
                "value": "70327",
                "type": "REGULAR"
            }
        ],
        "localities": [
            {
                "value": "Stuttgart",
                "shortName": "S",
                "type": "CITY"
            }
        ],
        "thoroughfares": [
            {
                "value": "Tor Strasse 1",
                "name": "Tor Strasse",
                "shortName": "Tor Str.",
                "number": "1",
                "type": "STREET"
            }
        ],
        "premises": [
            {
                "value": "Gate 1",
                "shortName": "1",
                "number": "1",
                "type": "BUILDING"
            }
        ],
        "types": [
            "UNSPECIFIC"
        ],
        "bpn": "BPNA000000000001"
    },
    {
        "version": {
            "characterSet": "WESTERN_LATIN_STANDARD",
            "language": "en"
        },
        "country": "DE",
        "administrativeAreas": [
            {
                "value": "Baden-Wuerttemberg",
                "shortName": "BW",
                "fipsCode": "GM01",
                "type": "REGION"
            }
        ],
        "postCodes": [
            {
                "value": "80331",
                "type": "REGULAR"
            }
        ],
        "localities": [
            {
                "value": "Bavaria",
                "shortName": "B",
                "type": "CITY"
            }
        ],
        "thoroughfares": [
            {
                "value": "Standort Strasse 10",
                "name": "Standort Strasse",
                "shortName": "Standort Str.",
                "number": "10",
                "type": "STREET"
            }
        ],
        "types": [
            "UNSPECIFIC"
        ],
        "bpn": "BPNA0000000001YN"
    }
]'
```

Below api reuqest from business partner controller checks changelog on each business partner type and in response controller provide either business partner newly created or updated along with timestamp with filter on provided timestamp. Here, we have added filter for business partner type which we have updated in respective update flow.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/business-partners/changelog?page=0&size=10&modifiedAfter=2023-03-21T09%3A00%3A25.298594Z&bpn=BPNL000000000001&bpn=BPNS000000000001&bpn=BPNA0000000001YN'
```

Response:

```bash
{
    "totalElements": 10,
    "totalPages": 1,
    "page": 0,
    "contentSize": 10,
    "content": [
        {
            "bpn": "BPNL000000000001",
            "changelogType": "CREATE",
            "timestamp": "2023-05-04T11:18:34.911829Z"
        },
        {
            "bpn": "BPNS000000000001",
            "changelogType": "CREATE",
            "timestamp": "2023-05-04T11:33:19.068153Z"
        },
        {
            "bpn": "BPNL000000000001",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-08T12:02:38.323393Z"
        },
        {
            "bpn": "BPNA0000000001YN",
            "changelogType": "CREATE",
            "timestamp": "2023-05-08T12:41:28.431110Z"
        },
        {
            "bpn": "BPNA0000000001YN",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-08T12:41:44.772685Z"
        },
        {
            "bpn": "BPNL000000000001",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-09T05:13:36.308001Z"
        },
        {
            "bpn": "BPNA0000000001YN",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-09T05:18:45.536015Z"
        },
        {
            "bpn": "BPNS000000000001",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-09T05:23:13.258840Z"
        },
        {
            "bpn": "BPNA0000000001YN",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-09T06:11:08.272858Z"
        },
        {
            "bpn": "BPNA0000000001YN",
            "changelogType": "UPDATE",
            "timestamp": "2023-05-09T06:11:21.191976Z"
        }
    ]
}
```
