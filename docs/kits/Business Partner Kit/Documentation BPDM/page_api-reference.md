---
id: API Reference
title: Api Reference
description: ''
sidebar_position: 2
---

The BPDM is comprised of two primary services: BPDM Pool and BPDM Gate. The Swagger UI interface, which is an interactive tool for exploring and testing RESTful APIs. Swagger UI provides a user-friendly interface for interacting with APIs, allowing you to make requests, view responses, and explore different API endpoints and operations, allowing you to drill down into specific endpoints and view the associated request parameters, response schemas, and sample responses.

The Business Partner Data Management includes the services that manages and shares business partner data with other Catena-X services. In the following sections, the available methods and different controllers of the API are explained.
More Information to the open-source repository can be found on [GitHub](https://github.com/eclipse-tractusx/bpdm)

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

The Site Controller is the controller that creates, updates, or retrieves business partners of type site (referenced via BPNS). There are PUT, POST and GET requests possible and api those are availble under site controller are clustered in table below. Hyperlink in each record gives you more information about api endpoint.

| Site Controller Apis|  
| :----------- |  
| [Update existing site business partners](../Software%20Development%20View/Pool%20Api/update-site.api.mdx) |
| [Create new site business partners](../Software%20Development%20View/Pool%20Api/create-site.api.mdx) |
| [Search site partners by BPNs and/or parent BPNs](../Software%20Development%20View/Pool%20Api/search-sites.api.mdx) |
| [Search Main Addresses](../Software%20Development%20View/Pool%20Api/search-main-addresses.api.mdx) |
| [Get site partners by bpn](../Software%20Development%20View/Pool%20Api/get-site.api.mdx) |

### 2. Legal Entity Controller

The Legal Entity Controller calls, searches, creates or updates existing business partners of type legal entity (referenced via BPNL). There are PUT, POST and GET requests possible. The endpoint expects a perfect match or looks for the highest relevancy, depending on the request made. Some of the requests need a obligatory parameter, like business partner number or id value. Hyperlink in each record gives you more information about api endpoint.

| Legal Entity Controller Apis|  
| :----------- |
| [Get page of legal entity business partners matching the search criteria](../Software%20Development%20View/Pool%20Api/get-legal-entities.api.mdx) |
| [Update existing legal entity business partners](../Software%20Development%20View/Pool%20Api/update-business-partners.api.mdx) |
| [Create new legal entity business partners](../Software%20Development%20View/Pool%20Api/create-business-partners.api.mdx)|
| [Confirms that the data of a legal entity business partner is still up to date.](../Software%20Development%20View/Pool%20Api/set-legal-entity-currentness.api.mdx)|
| [Search legal entity partners by BPNLs.](../Software%20Development%20View/Pool%20Api/search-sites-1.api.mdx) |
| [Search Legal Addresses.](../Software%20Development%20View/Pool%20Api/search-legal-addresses.api.mdx)|
| [Get legal entity business partner by identifier.](../Software%20Development%20View/Pool%20Api/get-legal-entity.api.mdx) |
| [Get site partners of a legal entity.](../Software%20Development%20View/Pool%20Api/get-sites.api.mdx) |
| [Get address partners of a legal entity.](../Software%20Development%20View/Pool%20Api/get-addresses.api.mdx.api.mdx) |

### 3. Address Controller

The Address Controller is the controller that updates, creates, or retrieves business partner records of type address via BPNA. There are PUT, POST and GET requests possible. Hyperlink in each record gives you more information about api endpoint.

| Address Controller Apis|
| :----------- |
| [Get page of addresses matching the search criteria](../Software%20Development%20View/Pool%20Api/get-addresses-1.api.mdx) |
| [Update existing address business partners](../Software%20Development%20View/Pool%20Api/update-addresses.api.mdx) |
| [Create new address business partners](../Software%20Development%20View/Pool%20Api/create-addresses.api.mdx) |
| [Search address partners by BPNs and/or parent BPNs](../Software%20Development%20View/Pool%20Api/search-addresses.api.mdx) |
| [Get address partners by bpn](../Software%20Development%20View/Pool%20Api/get-address.api.mdx) |

### 4. Open Search Controller

The Open Search Controller is only used by the developers on the backend of the API. They are not relevant for the API end-users. Hyperlink in each record gives you more information about api endpoint.

| Open Search Controller Apis|
| :----------- |
| [Fetch information about the latest OpenSearch export](../Software%20Development%20View/Pool%20Api/get-business-partners.api.mdx) |
| [Index new business partner records on OpenSearch](../Software%20Development%20View/Pool%20Api/export.api.mdx) |
| [Clear business partner index on OpenSearch](../Software%20Development%20View/Pool%20Api/clear.api.mdx) |

### 5. Metadata Controller

The Metadata Controller can retrieve and create legal forms, new issuing bodies, identifier types and identifier statuses. There are POST and GET requests possible. Hyperlink in each record gives you more information about api endpoint.

| Metadata Controller |
| :----------- |
| [Get page of legal forms](../Software%20Development%20View/Pool%20Api/get-legal-forms.api.mdx) |
| [Create new legal form](../Software%20Development%20View/Pool%20Api/create-legal-form.api.mdx) |
| [Get page of issuing bodies](../Software%20Development%20View/Pool%20Api/get-issuing-bodies.api.mdx) |
| [Create new issuing body](../Software%20Development%20View/Pool%20Api/create-issuing-body.api.mdx) |
| [Get page of identifier types](../Software%20Development%20View/Pool%20Api/get-identifier-types.api.mdx) |
| [Create new identifier type](../Software%20Development%20View/Pool%20Api/create-identifier-type.api.mdx) |
| [Get page of identifier statuses](../Software%20Development%20View/Pool%20Api/get-identifier-stati.api.mdx) |
| [Create new identifier status](../Software%20Development%20View/Pool%20Api/create-identifier-status.api.mdx) |
| [Get valid identifier types for a country](../Software%20Development%20View/Pool%20Api/get-valid-identifier-types-for-country.api.mdx) |

### 6. BPN Controller

The BPN Controller can retrieve business partner numbers by identifiers. The request is limited to 5000 entries. The hyperlink in below record gives you more information about api endpoint.

| BPN Controller Api|
| :----------- |
| [Find business partner numbers by identifiers](../Software%20Development%20View/Pool%20Api/find-bpns-by-identifiers.api.mdx) |

### 7. Business Partner Controller

The Business Partner Controller retrieves the change log entries per business partner number. The business partner number is a required field to execute the search. The hyperlink in below record gives you more information about api endpoint.

| Business Partner Controller Api|
| :----------- |
| [Get business partner changelog entries by bpn](../Software%20Development%20View/Pool%20Api/get-changelog-entries.api.mdx) |

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

[clear bussiness partner](../Software%20Development%20View/Pool%20Api/clear.api.mdx)

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
