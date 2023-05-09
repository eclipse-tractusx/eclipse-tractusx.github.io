---
id: API Reference
title: Api Reference
description: ''
sidebar_position: 2
---

The BPDM is comprised of two primary services: BPDM Pool and BPDM Gate. The Swagger UI interface, which is an interactive tool for exploring and testing RESTful APIs. Swagger UI provides a user-friendly interface for interacting with APIs, allowing you to make requests, view responses, and explore different API endpoints and operations, allowing you to drill down into specific endpoints and view the associated request parameters, response schemas, and sample responses.

The Business Partner Data Management includes the services that manages and shares business partner data with other Catena-X services. In the following sections, the available methods and different controllers of the API are explained.
More Information to the open-source repository can be found on [GitHub](https://github.com/eclipse-tractusx/bpdm)

## BPDM Gate Api reference

The Business Partner Data Management Gate includes the services that managesto share business partner data with Catena-X.In the following sections, the available methods and different controllers of the API are explained.

### Available Methods

| Request Method | Request Description|
| :----------- | :------------: |
| PUT | Update. The endpoint expects to receive the full updated record, including values that didn't change.|
| POST| Search |
| GET | Search for the best match |
| DELETE | Deletes all the records in the controller, resets the timestamp|

Gate service consist of five major controllers which are listed below.  

### 1. Site Controller

The Site Controller is the controller that creates, updates, or retrieves business partners of type site (referenced via BPNS). There are PUT, POST and GET requests possible.

| Site Controller | Description |
| :----------- | :------------: |
| GET /api/catena/input/sites | Retrive page of sites |
| PUT /api/catena/input/sites | Create or update sites. Updates instead of creating a new site if an already existing external id is used |
| POST /api/catena/output/sites/search | Search sites. Can optionally be filtered by external ids. |
| POST /api/catena/input/sites/validation | Determines errors in a site record which keep it from entering the sharing process |
| GET /api/catena/input/sites/{externalId} | Search site by external identifier. |

### 2. legal Entity Controller

The Legal Entity Controller calls, searches, creates or updates existing business partners of type legal entity (referenced via BPNL). There are PUT, POST and GET requests possible. Some of the requests need a obligatory parameter, like external id.

| legal Entity Controller | Description |
| :----------- | :------------: |
| GET /api/catena/input/legal-entities | Retrive page of legal entities |
| PUT /api/catena/input/legal-entities | Create or update legal entities. Updates instead of creating a new legal enitity if an already existing external id is used |
| POST /api/catena/output/legal-entities/search | Search legal entities. Can optionally be filtered by external ids. |
| POST /api/catena/input/legal-entities/validation | Determines errors in a legal entities record which keep it from entering the sharing process |
| GET /api/catena/input/legal-entities/{externalId} | Search legal enitity by external identifier. |

### 3. Address Controller

The Address Controller is the controller that updates, creates, or retrieves business partner records of type address via BPNA. There are PUT, POST and GET requests possible.

| Address Controller | Description |
| :----------- | :------------: |
| GET /api/catena/input/addresses| Retrive page of addresses |
| PUT /api/catena/input/addresses | Create or update addresses. Updates instead of creating a new address if an already existing external id is used |
| POST /api/catena/output/addresses/search | Search addresses. Can optionally be filtered by external ids. |
| POST /api/catena/input/addresses/validation | Determines errors in a address record which keep it from entering the sharing process |
| GET /api/catena/input/addresses/{externalId} | Search address by external identifier. |

### 4. Business Partner Controller

The business partner controller is controller that determines its likely type of either legal entity, site or address. It is possible that no type could be determined.
The candidate needs to contain either a name or an identifier as a minimum requirement.

| Business Partner Controller | Description |
| :----------- | :------------: |
| POST /api/catena/business-partners/type-match | Search legal enitity, site or address type of business partner candidate |

### 5. Changelog controller

The changelog controller is controller that gets business partner changelog entries by list of external id from timestamp.
Only two POST api's available for search of business partner changelog details.

| Changelog Controller | Description |
| :----------- | :------------: |
| POST /api/catena/business-partners/changelog/search | Retrive business partner changelog entries by list external id, from timestamp |
| POST /api/catena/business-partners/changelog/filter | RGet business partner changelog entries by from timestamp or Legal Entity, Site or Address type |

## BPDM Pool Api reference

The Business Partner Data Management Pool includes the services that manages and shares business partner data with other Catena-X services. In the following sections, the available methods and different controllers of the API are explained.

### Available Methods

| Request Method | Request Description|
| :----------- | :------------: |
| PUT | Update. The endpoint expects to receive the full updated record, including values that didn't change.|
| POST| Search |
| GET | Search for the best match |
| DELETE | Deletes all the records in the controller, resets the timestamp|

### 1. Site Controller

The Site Controller is the controller that creates, updates, or retrieves business partners of type site (referenced via BPNS). There are PUT, POST and GET requestspossible.

| Site Controller | Description |
| :----------- | :------------: |
| PUT/api/catena/sites | Update site referenced by BPNs |
| POST/api/catena/sites | Create new site Business Partners (BP) |
| POST/api/catena/sites/search | Search sites by BPN or parent BPN |
| POST/api/catena/sites/mainaddresses/search | Search main address |
| GET/api/catena/sites/{bpn} | Site partners by BPN |

### 2. Legal Entity Controller

The Legal Entity Controller calls, searches, creates or updates existing business partners of type legal entity (referenced via BPNL). There are PUT, POST and GET requests possible. The endpoint expects a perfect match or looks for the highest relevancy, depending on the request made. Some of the requests need a obligatory parameter, like business partner number or id value.

| Legal Entity Controller | Description |
| :----------- | :------------: |
| GET/api/catena/legal-entities | Get page of legal entity business partners matching search criteria |
| PUT/api/catena/legal-entities | Update existing legal entity Business Partners (BP)
| POST/api/catena/legal-entities | Create new legal entity BP |
| POST/api/catena/legalentities/{bpn}/confirm-up-to-date | Confirm data is up to date |
| POST/api/catena/legalentities/search | Search legal entity partners by BPNL |
| POST/api/catena/legal-entities/legaladdresses/search | Search legal addresses |
| GET/api/catena/legalentities/{idValue} | Search legal entity |
| GET/api/catena/legalentities/{bpn}/sites | Legal entity BP by identifier |
| GET/api/catena/legalentities/{bpn}/addresses | Site partners of legal entity |

### 3. Address Controller

The Address Controller is the controller that updates, creates, or retrieves business partner records of type address via BPNA. There are PUT, POST and GET requests possible.

| Address Controller | Description |
| :----------- | :------------: |
| GET/api/catena/addresses | Get page of addresses matching search criteria |
| PUT/api/catena/addresses | Update Existing address |
| POST /api/catena/addresses | Create new address BP |
| POST/api/catena/addresses/search | Search address BP by BPN or parent BPNs |
| GET/api/catena/addresses/{bpn} | Get address partner by BPN |

### 4. Open Search Controller

The Open Search Controller is only used by the developers on the backend of the API. They are not relevant for the API end-users.

| Open Search Controller | Description |
| :----------- | :------------: |
| DELETE/api/opensearch/businesspartner | Clear BP index |
| POST/api/opensearch/businesspartner | Index new BP records on OpenSearch |
| GET/api/opensearch/businesspartner | Fetch info about the latest OpenSearch export |

### 5. Metadata Controller

The Metadata Controller can retrieve and create legal forms, new issuing bodies, identifier types and identifier statuses. There are POST and GET requests possible.

| Metadata Controller | Description |
| :----------- | :------------: |
| POST/api/catena/legalform | Create new legal form |
| POST/api/catena/issuing-body | New issuing body |
| POST/api/catena/identifier-type | New identifier type |
| POST/api/catena/identifier-status | New identifier status |
| GET/api/catena/legalform | Get page of legal forms |
| GET/api/catena/issuing-body | Issuing bodies |
| GET/api/catena/identifier-type | Identifier types |
| GET/api/catena/identifier-status | Identifier statuses |
| GET/api/catena/identifier-types/forcountry | Returns which identifier types are valid and which ones are mandatory for a country specified by its ISO 3166-1 alpha-2 country code.

### 6. BPN Controller

The BPN Controller can retrieve business partner numbers by identifiers. The request is limited to 5000 entries.

| BPN Controller | Description |
| :----------- | :------------: |
| POST/api/catena/bpn/search | Find BPN by identifiers |

### 7. Business Partner Controller

The Business Partner Controller retrieves the change log entries per business partner number. The business partner number is a required field to execute the search.

| Business Partner Controller | Description |
| :----------- | :------------: |
| GET/api/catena/bpn/search | Get BP changelog entries by BPN |
