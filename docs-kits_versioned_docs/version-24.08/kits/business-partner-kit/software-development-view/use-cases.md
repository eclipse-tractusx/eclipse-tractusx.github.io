---
id: use-cases
title: Use Cases
description: ''
sidebar_position: 5
---

Here we have provided detailed examples of how the BPDM services can be used. This includes step-by-step instructions for each use case and code snippets showing how to make the API calls for better performance.

## Use case 1. Setup test data on local system

Description: This use case provides step-by-step instructions for setting up the local environment and with instructions on getting started with all services including Gate, Pool and Bridge dummy service on local for the BPDM (Business Partner Data Management) system. By following these instructions, users can easily clone the repository, configure the necessary services using Docker, and run the all three api services on their local system.

This use case aims to provide users with clear and concise instructions, ensuring a smooth setup process for working with the BPDM api services on their local system.

### 1.1 Start BPDM Api Services

1. Clone the repository:
    - Go to the following GitHub repository: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
    - Clone the repository to your local system using Git. You can use the following command:

    ```bash
    git clone https://github.com/eclipse-tractusx/bpdm
    ```

    - Choose an IDE: You can use any IDE of your preference to view the code. One recommended IDE is IntelliJ IDEA as application is based on Kotlin springBoot framework.

2. Configure local service:
    - Open the docker-compose.yml file in the project.
    - This file contains the configuration for running a local instance of PostgreSQL and OpenSearch.
    - Make sure you have Docker installed on your system.
    - If you don't have your own database, you can use Docker to create a local instance of PostgreSQL and OpenSearch.
    - Run the following command from the command prompt or from the IDE's terminal to start the Docker containers:

    ```bash
    docker-compose up
    ```

3. Start the Gate API service:
    - Open your IDE and navigate to the following directory within the cloned repository: bpdm/bpdm-gate.
    - Navigate to Application.kt file from source directory i.e. /bpdm/bpdm-gate/src/main/kotlin/org/eclipse/tractusx/bpdm/gate/Application.kt.
    - Run the main class Application.kt to start the Gate API service.
    - The service should start and listen on the specified port i.e. by default on 8081 for local setup it will be on [http://localhost:8081/](http://localhost:8081/).

4. Start the Pool API service:
    - Open your IDE and navigate to the following directory within the cloned repository: bpdm/bpdm-pool.
    - Navigate to Application.kt file from source directory i.e. /bpdm/bpdm-pool/src/main/kotlin/org/eclipse/tractusx/bpdm/pool/Application.kt.
    - Run the main class Application.kt to start the Pool API service.
    - The service should start and listen on the specified port i.e. by default on 8080 for local setup it will be on [http://localhost:8080/](http://localhost:8080/).

5. Start the Bridge Dummy API service:
    - Open your IDE and navigate to the following directory within the cloned repository: /bpdm/bpdm-bridge-dummy.
    - Navigate to Application.kt file from source directory i.e. /bpdm/bpdm-bridge-dummy/src/main/kotlin/com/catenax/bpdm/bridge/dummy/Application.kt.
    - Run the main class Application.kt to start the Bridge Dummy API service.
    - The service should start and listen on the specified port i.e. by default on 8083 for local setup it will be on [http://localhost:8083/](http://localhost:8083/).

### 1.2 Test data setup

1. Download the Postman collection JSON files:
   - You can copy collection for each service from provided hyperlink below and can download local variables from [here](../software-development-view/Local.postman_environment.json)
        1. [BPDM Bridge-Dummy service](../software-development-view/BPDM%20Bridge%20Dummy.postman_collection.json)
        2. [BPDM Gate Service](../software-development-view/BPDM%20Gate.postman_collection.json)
        3. [BPDM Pool Service](../software-development-view/BPDM%20Pool.postman_collection.json)
   - Or for latest version of apis, you can navigate to the following GitHub repository path: [https://github.com/eclipse-tractusx/bpdm/tree/main/docs/postman](https://github.com/eclipse-tractusx/bpdm/tree/main/docs/postman) and locate the JSON files named as "BPDM Gate.postman_collection.json","BPDM Pool.postman_collection.json", "BPDM Bridge Dummy.postman_collection.json" and "local.postman_collection.json" click on it to view its contents.
   - Click the "Raw" button to download the files or simply import jsons.

2. Open Postman:
   - If you don't have Postman installed, you can download it from the official website: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
   - Open Postman on your local system.

3. Import the collection:
   - In the Postman application, click on the "Import" button located in the top left corner of the window.
   - Select the "File" tab.
   - Click on the "Choose Files" button and browse to the location where you downloaded the all files in step one.
   - Select the JSON file and click "Open" to import them one by one.

4. Verify the imported collection:
   - After importing, you should see the "BPDM Gate", "BPDM Pool" and "BPDM Bridge Dummy" collection listed in the left sidebar of the Postman application.
   - Click on the imported collection to expand it and view the available api requests and folders.

5. Set up environment variables:
   - In Postman, click on the "Manage Environments" button located in the top right corner of the window (it looks like an eye icon).
   - Click on the "Add" button to create a new environment and can be done as per the variables mentioned into "local.postman_collection.json".
   - Also, user can directly import "local.postman_collection.json" to update their environment variables.

6. Explore Apis for each service:
   - Api's for each service can be seen under postman collection with refernced test data.
   - For more information on apis, user can refere section of [Api Reference](./page_software-development-view.md#api-reference)

7. For Pool api service first check should be metadata availablity:
   - Expand the "BPDM Pool Api" collection in the left sidebar.
   - Under metadata controller, user need to check for Legal form, Identifier Type.
   - Click on the "GET identifier-types" request.
   - Click the "Send" button to make the request.
   - Verify that the response contain the identifier types and if not present then user can hit POST request and create new identifiers as per the need.
   - Similarly, repeat the above steps for Legal form as well.
   - If any of the metadata is not available in the response, you can create them using the respective "POST" requests provided in the Postman collection as those are mandatory objects for golden records.

By following above steps, user can use test data which has been created under postman collection.

## Use Case 2. Request Legal Entity by identifier number

Description: The Legal Entity Controller is a module within a larger system that facilitates the retrieval of information about a legal entity using their identifier number. In this use case, we are providing examples by starting services on local machine.

The examples taken below are generic and depending on use cases, we have mentioned snippet of particular api request and response for better understanding. In this use case, consider you being user you have identifier and you want to get legal entity for same.

### Example request call

The request should be made first to check Catenea-X api for checking the identifier first. This request will be handled by metadata controller and will provide all available identifier type in particular enviroment with speficied business partner type and optional fields are country, pages and size. So, required field is lsaType here and can be taken considered between "LEGAL_ENTITY" and "ADDRESS".

Request:

```bash
curl --location 'http://localhost:8080/api/catena/identifier-types?page=0&size=100&lsaType=LEGAL_ENTITY'
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
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "DE",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_FR",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "FR",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_AT",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "AT",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_BE",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "BE",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_CH",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "CH",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_CZ",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "CZ",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_DK",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "DK",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_ES",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "ES",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_GB",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "GB",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_NO",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "NO",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "EU_VAT_ID_PL",
            "lsaType": "LEGAL_ENTITY",
            "name": "Value added tax identification number",
            "details": [
                {
                    "country": "PL",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "GS1_GLN",
            "lsaType": "LEGAL_ENTITY",
            "name": "Global Location Number",
            "details": [
                {
                    "country": null,
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "LEI_ID",
            "lsaType": "LEGAL_ENTITY",
            "name": "Legal Entity Identifier",
            "details": [
                {
                    "country": null,
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "DUNS_ID",
            "lsaType": "LEGAL_ENTITY",
            "name": "Data Universal Numbering System",
            "details": [
                {
                    "country": null,
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "DE_BNUM",
            "lsaType": "LEGAL_ENTITY",
            "name": "Handelsregister (HRB)",
            "details": [
                {
                    "country": "DE",
                    "mandatory": false
                }
            ]
        },
        {
            "technicalKey": "FR_SIREN",
            "lsaType": "LEGAL_ENTITY",
            "name": "Siren/Siret",
            "details": [
                {
                    "country": "FR",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "BR_ID_AT",
            "lsaType": "LEGAL_ENTITY",
            "name": "Firmenbuchnummer",
            "details": [
                {
                    "country": "AT",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "BE_ENT_NO",
            "lsaType": "LEGAL_ENTITY",
            "name": "Organisation number",
            "details": [
                {
                    "country": "BE",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "CH_UID",
            "lsaType": "LEGAL_ENTITY",
            "name": "Company Identification Number CH",
            "details": [
                {
                    "country": "CH",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "CZ_ICO",
            "lsaType": "LEGAL_ENTITY",
            "name": "Company Identification Number CZ",
            "details": [
                {
                    "country": "CZ",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "CVR_DK",
            "lsaType": "LEGAL_ENTITY",
            "name": "Business Registration Number DK",
            "details": [
                {
                    "country": "DK",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "CIF_ES",
            "lsaType": "LEGAL_ENTITY",
            "name": "Certificado de Identificación Fiscal",
            "details": [
                {
                    "country": "ES",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "ID_CRN",
            "lsaType": "LEGAL_ENTITY",
            "name": "Company Registration Number",
            "details": [
                {
                    "country": "GB",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "NO_ORGID",
            "lsaType": "LEGAL_ENTITY",
            "name": "Organization Number",
            "details": [
                {
                    "country": "NO",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "PL_REG",
            "lsaType": "LEGAL_ENTITY",
            "name": "REGON",
            "details": [
                {
                    "country": "PL",
                    "mandatory": true
                }
            ]
        },
        {
            "technicalKey": "CUSTOM_ID_TYPE",
            "lsaType": "LEGAL_ENTITY",
            "name": "Custom Identifier Type for Testing",
            "details": [
                {
                    "country": "DE",
                    "mandatory": true
                }
            ]
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
    "legalName": "Name of Company",
    "bpnl": "BPNL000000000001",
    "identifiers": [
        {
            "value": "123456789",
            "type": {
                "technicalKey": "CUSTOM_ID_TYPE",
                "name": "Custom Identifier Type for Testing"
            },
            "issuingBody": "CUSTOM_ISSUE_BODY"
        }
    ],
    "legalShortName": "NoC",
    "legalForm": {
        "technicalKey": "CUSTOM_LEGAL_FORM",
        "name": "Custom Legal Form for Testing",
        "abbreviation": null
    },
    "states": [
        {
            "officialDenotation": "Active",
            "validFrom": "2020-12-16T05:54:48.942",
            "validTo": "2023-06-05T07:31:01.213",
            "type": {
                "technicalKey": "ACTIVE",
                "name": "Active"
            }
        }
    ],
    "classifications": [
        {
            "value": "Farming of cattle, dairy farming",
            "code": "01.21",
            "type": {
                "technicalKey": "NACE",
                "name": "NACE"
            }
        }
    ],
    "relations": [],
    "currentness": "2023-06-13T03:28:17.032022Z",
    "createdAt": "2023-06-06T07:39:09.049097Z",
    "updatedAt": "2023-06-13T03:28:17.034408Z",
    "legalAddress": {
        "bpna": "BPNA000000000001",
        "name": "WESTERN_LATIN_STANDARD",
        "states": [
            {
                "description": "WESTERN_LATIN_STANDARD",
                "validFrom": "2020-12-16T05:54:48.942",
                "validTo": "2023-06-05T07:31:01.213",
                "type": {
                    "technicalKey": "ACTIVE",
                    "name": "Active"
                }
            }
        ],
        "identifiers": [
            {
                "value": "12345678910",
                "type": {
                    "technicalKey": "CUSTOM_ID_ADD_TYPE",
                    "name": "Custom Identifier Type of Address for Testing"
                }
            }
        ],
        "physicalPostalAddress": {
            "geographicCoordinates": {
                "longitude": 0.0,
                "latitude": 0.0,
                "altitude": 0.0
            },
            "country": {
                "technicalKey": "DE",
                "name": "Germany"
            },
            "postalCode": "70546",
            "city": "Stuttgart",
            "street": {
                "name": "Stuttgarter Strasse",
                "houseNumber": "1",
                "milestone": "Stuttgarter Strasse 1",
                "direction": "Stuttgarter Str."
            },
            "administrativeAreaLevel1": null,
            "administrativeAreaLevel2": "test1",
            "administrativeAreaLevel3": "test2",
            "district": "Stuttgart",
            "companyPostalCode": "GM01",
            "industrialZone": "HEADQUARTER",
            "building": "Building A",
            "floor": "A",
            "door": "test"
        },
        "alternativePostalAddress": {
            "geographicCoordinates": {
                "longitude": 0.0,
                "latitude": 0.0,
                "altitude": 0.0
            },
            "country": {
                "technicalKey": "DE",
                "name": "Germany"
            },
            "postalCode": "1234",
            "city": "Stuttgart 1",
            "administrativeAreaLevel1": null,
            "deliveryServiceNumber": "1234",
            "type": "PO_BOX",
            "deliveryServiceQualifier": ""
        },
        "bpnLegalEntity": "BPNL000000000001",
        "isLegalAddress": true,
        "bpnSite": null,
        "isMainAddress": false,
        "createdAt": "2023-06-06T07:39:09.032826Z",
        "updatedAt": "2023-06-06T07:39:09.057668Z"
    }
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

Scenario: To get matched response, you can use multiple key and value pair. Multiple attributes like legalName, legalForm, classification etc can be used with desired known values for them.

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
curl --location 'http://localhost:8080/api/catena/legal-entities?legalName=Name%20of%20Company&page=0&size=10'
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
            "score": 7.0275493,
            "legalName": "Name of Company",
            "bpnl": "BPNL000000000001",
            "identifiers": [
                {
                    "value": "123456789",
                    "type": {
                        "technicalKey": "CUSTOM_ID_TYPE",
                        "name": "Custom Identifier Type for Testing"
                    },
                    "issuingBody": "CUSTOM_ISSUE_BODY"
                }
            ],
            "legalShortName": "NoC",
            "legalForm": {
                "technicalKey": "CUSTOM_LEGAL_FORM",
                "name": "Custom Legal Form for Testing",
                "abbreviation": null
            },
            "states": [
                {
                    "officialDenotation": "Active",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validTo": "2023-06-05T07:31:01.213",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "classifications": [
                {
                    "value": "Farming of cattle, dairy farming",
                    "code": "01.21",
                    "type": {
                        "technicalKey": "NACE",
                        "name": "NACE"
                    }
                }
            ],
            "relations": [],
            "currentness": "2023-06-13T03:28:17.032022Z",
            "createdAt": "2023-06-06T07:39:09.049097Z",
            "updatedAt": "2023-06-13T03:28:17.034408Z",
            "legalAddress": {
                "bpna": "BPNA000000000001",
                "name": "WESTERN_LATIN_STANDARD",
                "states": [
                    {
                        "description": "WESTERN_LATIN_STANDARD",
                        "validFrom": "2020-12-16T05:54:48.942",
                        "validTo": "2023-06-05T07:31:01.213",
                        "type": {
                            "technicalKey": "ACTIVE",
                            "name": "Active"
                        }
                    }
                ],
                "identifiers": [
                    {
                        "value": "12345678910",
                        "type": {
                            "technicalKey": "CUSTOM_ID_ADD_TYPE",
                            "name": "Custom Identifier Type of Address for Testing"
                        }
                    }
                ],
                "physicalPostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "70546",
                    "city": "Stuttgart",
                    "street": {
                        "name": "Stuttgarter Strasse",
                        "houseNumber": "1",
                        "milestone": "Stuttgarter Strasse 1",
                        "direction": "Stuttgarter Str."
                    },
                    "administrativeAreaLevel1": null,
                    "administrativeAreaLevel2": "test1",
                    "administrativeAreaLevel3": "test2",
                    "district": "Stuttgart",
                    "companyPostalCode": "GM01",
                    "industrialZone": "HEADQUARTER",
                    "building": "Building A",
                    "floor": "A",
                    "door": "test"
                },
                "alternativePostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "1234",
                    "city": "Stuttgart 1",
                    "administrativeAreaLevel1": null,
                    "deliveryServiceNumber": "1234",
                    "type": "PO_BOX",
                    "deliveryServiceQualifier": ""
                },
                "bpnLegalEntity": "BPNL000000000001",
                "isLegalAddress": true,
                "bpnSite": null,
                "isMainAddress": false,
                "createdAt": "2023-06-06T07:39:09.032826Z",
                "updatedAt": "2023-06-06T07:39:09.057668Z"
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
curl --location 'http://localhost:8080/api/catena/legal-entities?legalForm=company&page=0&size=10'
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
            "score": 0.0,
            "legalName": "",
            "bpnl": "BPNL0000000001YN",
            "identifiers": [],
            "legalShortName": "NoC",
            "legalForm": {
                "technicalKey": "CUSTOM_LEGAL_FORM",
                "name": "Custom Legal Form for Testing",
                "abbreviation": null
            },
            "states": [
                {
                    "officialDenotation": "Active",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validTo": "2023-06-05T07:31:01.213",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "classifications": [
                {
                    "value": "Farming of cattle, dairy farming",
                    "code": "01.21",
                    "type": {
                        "technicalKey": "NACE",
                        "name": "NACE"
                    }
                }
            ],
            "relations": [],
            "currentness": "2023-06-12T05:34:47.676190Z",
            "createdAt": "2023-06-12T05:34:47.705949Z",
            "updatedAt": "2023-06-12T05:34:47.705957Z",
            "legalAddress": {
                "bpna": "BPNA0000000004WK",
                "name": "WESTERN_LATIN_STANDARD",
                "states": [
                    {
                        "description": "WESTERN_LATIN_STANDARD",
                        "validFrom": "2020-12-16T05:54:48.942",
                        "validTo": "2023-06-05T07:31:01.213",
                        "type": {
                            "technicalKey": "ACTIVE",
                            "name": "Active"
                        }
                    }
                ],
                "identifiers": [],
                "physicalPostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "70546",
                    "city": "Stuttgart",
                    "street": {
                        "name": "Stuttgarter Strasse",
                        "houseNumber": "1",
                        "milestone": "Stuttgarter Strasse 1",
                        "direction": "Stuttgarter Str."
                    },
                    "administrativeAreaLevel1": null,
                    "administrativeAreaLevel2": "test1",
                    "administrativeAreaLevel3": "test2",
                    "district": "Stuttgart",
                    "companyPostalCode": "GM01",
                    "industrialZone": "HEADQUARTER",
                    "building": "Building A",
                    "floor": "A",
                    "door": "test"
                },
                "alternativePostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "1234",
                    "city": "Stuttgart 1",
                    "administrativeAreaLevel1": null,
                    "deliveryServiceNumber": "1234",
                    "type": "PO_BOX",
                    "deliveryServiceQualifier": ""
                },
                "bpnLegalEntity": "BPNL0000000001YN",
                "isLegalAddress": true,
                "bpnSite": null,
                "isMainAddress": false,
                "createdAt": "2023-06-12T05:34:47.698490Z",
                "updatedAt": "2023-06-12T05:34:47.714935Z"
            }
        },
        {
            "score": 0.0,
            "legalName": "Name of Company1",
            "bpnl": "BPNL0000000002XY",
            "identifiers": [
                {
                    "value": "12345678910",
                    "type": {
                        "technicalKey": "CUSTOM_ID_TYPE",
                        "name": "Custom Identifier Type for Testing"
                    },
                    "issuingBody": "CUSTOM_ISSUE_BODY"
                }
            ],
            "legalShortName": "NoC",
            "legalForm": {
                "technicalKey": "CUSTOM_LEGAL_FORM_test1",
                "name": "Custom Legal Form for Testing 1",
                "abbreviation": null
            },
            "states": [
                {
                    "officialDenotation": "Active",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validTo": "2023-06-05T07:31:01.213",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "classifications": [
                {
                    "value": "Farming of cattle, dairy farming",
                    "code": "01.21",
                    "type": {
                        "technicalKey": "NACE",
                        "name": "NACE"
                    }
                }
            ],
            "relations": [],
            "currentness": "2023-06-16T09:08:22.222993Z",
            "createdAt": "2023-06-16T09:08:22.244296Z",
            "updatedAt": "2023-06-16T09:08:22.244300Z",
            "legalAddress": {
                "bpna": "BPNA0000000007UH",
                "name": "WESTERN_LATIN_STANDARD",
                "states": [
                    {
                        "description": "WESTERN_LATIN_STANDARD",
                        "validFrom": "2020-12-16T05:54:48.942",
                        "validTo": "2023-06-05T07:31:01.213",
                        "type": {
                            "technicalKey": "ACTIVE",
                            "name": "Active"
                        }
                    }
                ],
                "identifiers": [
                    {
                        "value": "12345678910",
                        "type": {
                            "technicalKey": "CUSTOM_ID_ADD_TYPE",
                            "name": "Custom Identifier Type of Address for Testing"
                        }
                    }
                ],
                "physicalPostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "70546",
                    "city": "Stuttgart",
                    "street": {
                        "name": "Stuttgarter Strasse",
                        "houseNumber": "1",
                        "milestone": "Stuttgarter Strasse 1",
                        "direction": "Stuttgarter Str."
                    },
                    "administrativeAreaLevel1": null,
                    "administrativeAreaLevel2": "test1",
                    "administrativeAreaLevel3": "test2",
                    "district": "Stuttgart",
                    "companyPostalCode": "GM01",
                    "industrialZone": "HEADQUARTER",
                    "building": "Building A",
                    "floor": "A",
                    "door": "test"
                },
                "alternativePostalAddress": {
                    "geographicCoordinates": {
                        "longitude": 0.0,
                        "latitude": 0.0,
                        "altitude": 0.0
                    },
                    "country": {
                        "technicalKey": "DE",
                        "name": "Germany"
                    },
                    "postalCode": "1234",
                    "city": "Stuttgart 1",
                    "administrativeAreaLevel1": null,
                    "deliveryServiceNumber": "1234",
                    "type": "PO_BOX",
                    "deliveryServiceQualifier": ""
                },
                "bpnLegalEntity": "BPNL0000000002XY",
                "isLegalAddress": true,
                "bpnSite": null,
                "isMainAddress": false,
                "createdAt": "2023-06-16T09:08:22.239413Z",
                "updatedAt": "2023-06-16T09:08:22.248790Z"
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
        "legalName": "Name of Company",
        "bpnl": "BPNL000000000001",
        "identifiers": [
            {
                "value": "123456789",
                "type": {
                    "technicalKey": "CUSTOM_ID_TYPE",
                    "name": "Custom Identifier Type for Testing"
                },
                "issuingBody": "CUSTOM_ISSUE_BODY"
            }
        ],
        "legalShortName": "NoC",
        "legalForm": {
            "technicalKey": "CUSTOM_LEGAL_FORM",
            "name": "Custom Legal Form for Testing",
            "abbreviation": null
        },
        "states": [
            {
                "officialDenotation": "Active",
                "validFrom": "2020-12-16T05:54:48.942",
                "validTo": "2023-06-05T07:31:01.213",
                "type": {
                    "technicalKey": "ACTIVE",
                    "name": "Active"
                }
            }
        ],
        "classifications": [
            {
                "value": "Farming of cattle, dairy farming",
                "code": "01.21",
                "type": {
                    "technicalKey": "NACE",
                    "name": "NACE"
                }
            }
        ],
        "relations": [],
        "currentness": "2023-06-13T03:28:17.032022Z",
        "createdAt": "2023-06-06T07:39:09.049097Z",
        "updatedAt": "2023-06-13T03:28:17.034408Z",
        "legalAddress": {
            "bpna": "BPNA000000000001",
            "name": "WESTERN_LATIN_STANDARD",
            "states": [
                {
                    "description": "WESTERN_LATIN_STANDARD",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validTo": "2023-06-05T07:31:01.213",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "identifiers": [
                {
                    "value": "12345678910",
                    "type": {
                        "technicalKey": "CUSTOM_ID_ADD_TYPE",
                        "name": "Custom Identifier Type of Address for Testing"
                    }
                }
            ],
            "physicalPostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "70546",
                "city": "Stuttgart",
                "street": {
                    "name": "Stuttgarter Strasse",
                    "houseNumber": "1",
                    "milestone": "Stuttgarter Strasse 1",
                    "direction": "Stuttgarter Str."
                },
                "administrativeAreaLevel1": null,
                "administrativeAreaLevel2": "test1",
                "administrativeAreaLevel3": "test2",
                "district": "Stuttgart",
                "companyPostalCode": "GM01",
                "industrialZone": "HEADQUARTER",
                "building": "Building A",
                "floor": "A",
                "door": "test"
            },
            "alternativePostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "1234",
                "city": "Stuttgart 1",
                "administrativeAreaLevel1": null,
                "deliveryServiceNumber": "1234",
                "type": "PO_BOX",
                "deliveryServiceQualifier": ""
            },
            "bpnLegalEntity": "BPNL000000000001",
            "isLegalAddress": true,
            "bpnSite": null,
            "isMainAddress": false,
            "createdAt": "2023-06-06T07:39:09.032826Z",
            "updatedAt": "2023-06-06T07:39:09.057668Z"
        }
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
    "totalElements": 4,
    "totalPages": 1,
    "page": 0,
    "contentSize": 4,
    "content": [
        {
            "bpns": "BPNS000000000001",
            "name": "Factory UT",
            "states": [
                {
                    "description": "Baden-Wuerttemberg",
                    "validFrom": "2023-06-06T08:18:05.777",
                    "validTo": "2024-06-06T08:18:05.777",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "bpnLegalEntity": "BPNL000000000001",
            "createdAt": "2023-06-06T09:50:52.720153Z",
            "updatedAt": "2023-06-06T09:50:52.720155Z"
        },
        {
            "bpns": "BPNS0000000001YN",
            "name": "Factory UT",
            "states": [
                {
                    "description": "Baden-Wuerttemberg",
                    "validFrom": "2023-06-06T08:18:05.777",
                    "validTo": "2024-06-06T08:18:05.777",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "bpnLegalEntity": "BPNL000000000001",
            "createdAt": "2023-06-06T10:00:19.733854Z",
            "updatedAt": "2023-06-06T10:00:19.733858Z"
        },
        {
            "bpns": "BPNS0000000002XY",
            "name": "Factory UT",
            "states": [
                {
                    "description": "Baden-Wuerttemberg",
                    "validFrom": "2023-06-06T08:18:05.777",
                    "validTo": "2024-06-06T08:18:05.777",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "bpnLegalEntity": "BPNL000000000001",
            "createdAt": "2023-06-13T03:24:29.981397Z",
            "updatedAt": "2023-06-13T03:24:29.981400Z"
        },
        {
            "bpns": "BPNS0000000003X9",
            "name": "Factory UT",
            "states": [
                {
                    "description": "Baden-Wuerttemberg",
                    "validFrom": "2023-06-06T08:18:05.777",
                    "validTo": "2024-06-06T08:18:05.777",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "bpnLegalEntity": "BPNL000000000001",
            "createdAt": "2023-06-13T06:01:09.734035Z",
            "updatedAt": "2023-06-13T06:01:09.734039Z"
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
curl --location 'http://localhost:8080/api/catena/legal-entities/BPNL000000000001/addresses?page=0&size=10'
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
            "bpna": "BPNA000000000001",
            "name": "WESTERN_LATIN_STANDARD",
            "states": [
                {
                    "description": "WESTERN_LATIN_STANDARD",
                    "validFrom": "2020-12-16T05:54:48.942",
                    "validTo": "2023-06-05T07:31:01.213",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "identifiers": [
                {
                    "value": "12345678910",
                    "type": {
                        "technicalKey": "CUSTOM_ID_ADD_TYPE",
                        "name": "Custom Identifier Type of Address for Testing"
                    }
                }
            ],
            "physicalPostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "70546",
                "city": "Stuttgart",
                "street": {
                    "name": "Stuttgarter Strasse",
                    "houseNumber": "1",
                    "milestone": "Stuttgarter Strasse 1",
                    "direction": "Stuttgarter Str."
                },
                "administrativeAreaLevel1": null,
                "administrativeAreaLevel2": "test1",
                "administrativeAreaLevel3": "test2",
                "district": "Stuttgart",
                "companyPostalCode": "GM01",
                "industrialZone": "HEADQUARTER",
                "building": "Building A",
                "floor": "A",
                "door": "test"
            },
            "alternativePostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "1234",
                "city": "Stuttgart 1",
                "administrativeAreaLevel1": null,
                "deliveryServiceNumber": "1234",
                "type": "PO_BOX",
                "deliveryServiceQualifier": ""
            },
            "bpnLegalEntity": "BPNL000000000001",
            "isLegalAddress": true,
            "bpnSite": null,
            "isMainAddress": false,
            "createdAt": "2023-06-06T07:39:09.032826Z",
            "updatedAt": "2023-06-06T07:39:09.057668Z"
        },
        {
            "bpna": "BPNA0000000003X9",
            "name": "WESTERN_LATIN_STANDARD",
            "states": [
                {
                    "description": "WESTERN_LATIN_STANDARD",
                    "validFrom": "2023-06-06T10:02:00.355",
                    "validTo": "2024-06-06T10:02:00.355",
                    "type": {
                        "technicalKey": "ACTIVE",
                        "name": "Active"
                    }
                }
            ],
            "identifiers": [
                {
                    "value": "12345678910",
                    "type": {
                        "technicalKey": "CUSTOM_ID_ADD_TYPE",
                        "name": "Custom Identifier Type of Address for Testing"
                    }
                }
            ],
            "physicalPostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "70546",
                "city": "Stuttgart",
                "street": {
                    "name": "Stuttgarter Strasse",
                    "houseNumber": "1",
                    "milestone": "Stuttgarter Strasse 1",
                    "direction": "Stuttgarter Str."
                },
                "administrativeAreaLevel1": null,
                "administrativeAreaLevel2": null,
                "administrativeAreaLevel3": null,
                "district": "Stuttgart",
                "companyPostalCode": "GM01",
                "industrialZone": "HEADQUARTER",
                "building": "Building A",
                "floor": "A",
                "door": null
            },
            "alternativePostalAddress": {
                "geographicCoordinates": {
                    "longitude": 0.0,
                    "latitude": 0.0,
                    "altitude": 0.0
                },
                "country": {
                    "technicalKey": "DE",
                    "name": "Germany"
                },
                "postalCode": "1234",
                "city": "Stuttgart",
                "administrativeAreaLevel1": null,
                "deliveryServiceNumber": "test",
                "type": "PO_BOX",
                "deliveryServiceQualifier": ""
            },
            "bpnLegalEntity": "BPNL000000000001",
            "isLegalAddress": false,
            "bpnSite": null,
            "isMainAddress": false,
            "createdAt": "2023-06-06T10:20:48.376234Z",
            "updatedAt": "2023-06-06T10:20:48.376264Z"
        }
    ]
}
```

## Use Case 3. Update data from Legal Entity and check changelog

Description: This use case involves a user updating record for a legal entity business partner associated with a Business Partner Number (BPNL). Changelogs can be identified using changelog controller, it have one POST api request explained in below use case to show up the changelog details for provided BPN.

The user can use an API call for the changelog controller, which retrieves the changelog for reuested BPNL. The business-partner-controller checks if there are any updates since the last update and fetches array of the updated data for the BPNL via the business partner controller if there are updates in provided date and time frame. The Legal Entity Controller can be use to update the legal entity. Similarly site controller and address controller can be used to update sites and address type business partners respectively.

### 3.1 Get Changelog for BPNL via changelog-controller

Scenario: The user enters a valid BPNL under request body and changelog controller api returns information about changelogs for legal entities or on specified lsaType and also filteration should be their to fetch changelog only after particular dates.

Flow:

- The user initiates a request to search for changelogs for a specific BPNL by providing BPN in api request body.
- Here in example request, user has putted two query params named as bpn with value BPNL000000000001.
- The changelog controller returns the changelog for the BPNL entered business partner type array value.
- Also user can be filter data based on date named as fromTime paramter, The changelog controller checks if there are any updates since the last update.
- If there are updates, the changelog controller fetches the updated data for the BPNL.

Request:

```bash
curl --location 'http://localhost:8080/api/catena/business-partners/changelog/search?page=0&size=10' \
--header 'Content-Type: application/json' \
--data '{
  "fromTime": "2023-03-21T09:00:25.298594Z",
  "bpns": [
    "BPNL000000000001"
  ],
  "lsaTypes": [
    "LEGAL_ENTITY"
  ]
}'
```

Response:

```bash
{
    "totalElements": 3,
    "totalPages": 1,
    "page": 0,
    "contentSize": 3,
    "content": [
        {
            "bpn": "BPNL000000000001",
            "changelogType": "CREATE",
            "timestamp": "2023-06-06T07:39:09.028951Z",
            "lsaType": "LEGAL_ENTITY"
        },
        {
            "bpn": "BPNL000000000001",
            "changelogType": "UPDATE",
            "timestamp": "2023-06-06T07:41:00.498695Z",
            "lsaType": "LEGAL_ENTITY"
        },
        {
            "bpn": "BPNL000000000001",
            "changelogType": "UPDATE",
            "timestamp": "2023-06-13T03:27:39.878101Z",
            "lsaType": "LEGAL_ENTITY"
        }
    ]
}
```

### 3.2 Changelog for update on business partner

Scenario: Apply the changes or update on business partner of type legal entity, site and address through api request. Check changelog for each business partner example using above api request.

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
    "bpnl": "BPNL000000000001",
    "legalName": "Name of Company",
    "identifiers": [
      {
        "value": "123456789",
        "type": "CUSTOM_ID_TYPE",
        "issuingBody": "CUSTOM_ISSUE_BODY"
      }
    ],
    "legalShortName": "NoC",
    "legalForm": "CUSTOM_LEGAL_FORM",
    "states": [
      {
        "officialDenotation": "Active",
        "validFrom": "2020-12-16T05:54:48.942Z",
        "validTo": "2023-06-05T07:31:01.213Z",
        "type": "ACTIVE"
      }
    ],
    "classifications": [
      {
        "value": "Farming of cattle, dairy farming",
        "code": "01.21",
        "type": "NACE"
      }
    ],
    "legalAddress": {
      "name": "WESTERN_LATIN_STANDARD",
      "states": [
        {
          "description": "WESTERN_LATIN_STANDARD",
          "validFrom": "2020-12-16T05:54:48.942Z",
          "validTo": "2023-06-05T07:31:01.213Z",
          "type": "ACTIVE"
        }
      ],
      "identifiers": [
        {
          "value": "12345678910",
          "type": "CUSTOM_ID_ADD_TYPE"
        }
      ],
      "physicalPostalAddress": {
        "geographicCoordinates": {
          "longitude": 0,
          "latitude": 0,
          "altitude": 0
        },
        "country": "DE",
        "postalCode": "70546",
        "city": "Stuttgart",
        "street": {
          "name": "Stuttgarter Strasse",
          "houseNumber": "1",
          "milestone": "Stuttgarter Strasse 1",
          "direction": "Stuttgarter Str."
        },
        "administrativeAreaLevel1": "Baden-Wuerttemberg",
        "administrativeAreaLevel2": "test1",
        "administrativeAreaLevel3": "test2",
        "district": "Stuttgart",
        "companyPostalCode": "GM01",
        "industrialZone": "HEADQUARTER",
        "building": "Building A",
        "floor": "A",
        "door": "test"
      },
      "alternativePostalAddress": {
        "geographicCoordinates": {
          "longitude": 0,
          "latitude": 0,
          "altitude": 0
        },
        "country": "DE",
        "postalCode": "1234",
        "city": "Stuttgart 1",
        "administrativeAreaLevel1": "Baden-Wuerttemberg 1",
        "deliveryServiceNumber": "1234",
        "deliveryServiceType": "PO_BOX",
        "deliveryServiceQualifier": "test"
      }
    }
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
    "bpns": "BPNS000000000001",
    "name": "Factory UT",
    "states": [
      {
        "description": "Baden-Wuerttemberg",
        "validFrom": "2023-06-06T08:18:05.777Z",
        "validTo": "2024-06-06T08:18:05.777Z",
        "type": "ACTIVE"
      }
    ],
    "mainAddress": {
      "name": "WESTERN_LATIN_STANDARD",
      "states": [
        {
          "description": "Baden-Wuerttemberg",
          "validFrom": "2023-06-06T08:18:05.777Z",
          "validTo": "2024-06-06T08:18:05.777Z",
          "type": "ACTIVE"
        }
      ],
      "identifiers": [
        {
          "value": "123456789",
          "type": "CUSTOM_SITE_ID"
        }
      ],
      "physicalPostalAddress": {
        "geographicCoordinates": {
          "longitude": 0,
          "latitude": 0,
          "altitude": 0
        },
        "country": "DE",
        "postalCode": "70327",
        "city": "Stuttgart",
        "street": {
          "name": "Untertuerckheim Strasse 1",
          "houseNumber": "1234",
          "milestone": "Untertuerckheim Strasse 1",
          "direction": "Untertuerckheim Strasse 1"
        },
        "administrativeAreaLevel1": "Baden-Wuerttember",
        "district": "Stuttgart",
        "companyPostalCode": "71034",
        "industrialZone": "Sindelfinden",
        "building": "Building A",
        "floor": "A",
        "door": "1"
      },
      "alternativePostalAddress": {
        "geographicCoordinates": {
          "longitude": 0,
          "latitude": 0,
          "altitude": 0
        },
        "country": "DE",
        "postalCode": "1234",
        "city": "Stuttgart",
        "administrativeAreaLevel1": "Stuttgart",
        "deliveryServiceNumber": "Untertuerckheim Strasse 1",
        "deliveryServiceType": "PO_BOX",
        "deliveryServiceQualifier": "test qualifier"
      }
    }
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
        "bpna": "BPNA000000000001",
        "name": "WESTERN_LATIN_STANDARD",
        "states": [
            {
                "description": "WESTERN_LATIN_STANDARD",
                "validFrom": "2020-12-16T05:54:48.942",
                "validTo": "2023-06-05T07:31:01.213",
                "type": "ACTIVE"
            }
        ],
        "identifiers": [
            {
                "value": "12345678910",
                "type": "CUSTOM_ID_ADD_TYPE"
            }
        ],
        "physicalPostalAddress": {
            "geographicCoordinates": {
                "longitude": 0,
                "latitude": 0,
                "altitude": 0
            },
            "country": "DE",
            "postalCode": "70546",
            "city": "Stuttgart",
            "street": {
                "name": "Stuttgarter Strasse",
                "houseNumber": "1",
                "milestone": "Stuttgarter Strasse 1",
                "direction": "Stuttgarter Str."
            },
            "administrativeAreaLevel1": null,
            "administrativeAreaLevel2": "test1",
            "administrativeAreaLevel3": "test2",
            "district": "Stuttgart",
            "companyPostalCode": "GM01",
            "industrialZone": "HEADQUARTER",
            "building": "Building A",
            "floor": "A",
            "door": "test"
        },
        "alternativePostalAddress": {
            "geographicCoordinates": {
                "longitude": 0,
                "latitude": 0,
                "altitude": 0
            },
            "country": "DE",
            "postalCode": "Stuttgart 1",
            "city": "string",
            "administrativeAreaLevel1": "test1",
            "deliveryServiceNumber": "test2",
            "deliveryServiceType": "PO_BOX",
            "deliveryServiceQualifier": "test3"
        }
    }
]'
```

Below api reuqest from changelog controller checks changelog on each business partner type and in response controller provide either business partner newly created or updated along with timestamp with filter on provided timestamp. Here, we have added filter for business partner type which we can update in respective update flow same what we did in section 3.2 above.
