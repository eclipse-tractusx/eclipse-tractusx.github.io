---
title: Development View
---

![EcoPass KIT Pictotogram](@site/static/img/kits/eco-pass/eco-pass-kit-logo.svg)

## Introduction

### General Development Information

The developer view provides developers with resources to utilize the EcoPass KIT effectively. On the one side developers can learn how to integrate the EcoPass KIT into their applications and to make use of the product passport exchanging feature via the Catena-X network. On the other side, IT-Administrators will learn how to provide the needed passport data and which components are required.
Thereby, this KIT covers various aspects, starting from how the available API Endpoints can be utilized for data models and how to make them available in the Catena-x Data Space.

### Architecture Overview

The following Figure shows how the EcoPass KIT (represented by Digital Product Passport Frontend and Backend) is embedded in the overall architecture.

[![EcoPassKIT IT Arch Picture](./resources/development-view/ecoPassContext.svg)](./resources/development-view/ecoPassContext.svg)

## Data Retrieval Flow

In order to achieve a better understanding of the EcoPass KIT data retrieval flow, we can detail a specific example where an user wants to retrieve a specific passport for a asset in Catena-X using the EcoPass KIT (reference implementation [`digital-product-pass`](https://github.com/eclipse-tractusx/digital-product-pass)).

In the data retrieval flow example below we will imagine that an user wants to retrieve the data related to a Catena-X Digital Product Pass ID he has in his product as form of QR Code and ID:

[![Sequence Diagramm](./resources/development-view/developmentview-sequence-diagramm.svg)](./resources/development-view/developmentview-sequence-diagramm.svg)

| ID  | CX:XYZ78901:IMR18650V1 |
| --- | ---------------------- |

As defined in the standard CX-0096 Triangle Document for Digital Product Pass the search id used has the following semantic:

```html

CX:<manufacturerPartId>:<partInstanceId>

```

| ID                     | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CX`                   | The "**CX**" argument is the one that indicates that this ID is a Catena-X Search Identificator.                                                                                                             |
| `<manufacturerPartId>` | The "**manufacturerPartId**" makes reference to the id type of the product. It is the identification the manufacturer gives to a specific part he produced.                                                  |
| `<partInstanceId>`     | The "**partInstanceId**" stands to the specific id of the product. This id needs to be registered in the digital twin from the aspect. An example value in case of batteries would be the *batteryDMC_Code*. |

> *Note*: This identifications as defined in the standard MUST be added to the Digital Twin. For more information consult the [Operation View Guide](./software-operation-view.md).

### Prerequisites

In order to retrieve data in the Catena-X Network a number of services need to be available and have data register on them. Otherwise the data retrieval would simply not work because the consumer application would not "find" the specific searched asset even if it would be registered in the provider side.

| Service Name          | Description                                                                                                                                                                                                             | Reference Implementation                                                                                                                                                                                                                                                                                     | [Standardized in](https://catena-x.net/en/standard-library) |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Discovery Finder      | A microservice resolving a type of identifiers against a set of BPN-Discovery Servers.  Responsible to give the search endpoints for a type of id                                                                       | [eclipse-tractusx/sldt-discovery-finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                                                                                                                                                                          | CX - 0053                                                   |
| BPN Discovery         | A microservice resolving a particular assetId against the registered BPN of its owner. Responsible for indicating the BPNs for the IDs registered by the providers                                                      | [eclipse-tractusx/sldt-bpn-discover](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                                                                                                                                                                 | CX - 0053                                                   |
| EDC Discovery         | A microservice that resolves a BPN against an EDC endpoint. Responsible for giving the EDC endpoints of one or more BPNs                                                                                                | [eclipse-tractusx/portal-backend](https://github.com/eclipse-tractusx/portal-backend) - [Code Implementation](https://github.com/eclipse-tractusx/portal-backend/blob/aca855c857aed309cbca03f4f694283629197110/src/administration/Administration.Service/Controllers/ConnectorsController.cs#L178C1-L190C63) | CX - 0001                                                   |
| Digital Twin Registry | An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. Responsible for having the Digital Twins of the provider and indicating the endpoints to the Passport Aspects. | [eclipse-tractusx/sldt-digital-twin-registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)          OR [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)                                                                                                                                                                                          | CX - 0002                                                   |
| Submodel Server       | The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0. Where the Passport Aspects are stored                                                                                            | [FA³ST-Framework](https://github.com/FraunhoferIOSB/FAAAST-Service), [Eclipse Basyx](https://github.com/eclipse-basyx/basyx-java-sdk), [AASX Server](https://github.com/admin-shell-io/aasx-server)                                                                                                          | CX - 0002                                                   |
| EDC                   | Main gateaway to the network. In this use case two EDC need be existing, one connected to the Digital Product Pass (EcoPass KIT) [EDC Consumer] and another to the Provider Catena-X components [EDC Provider]          | [eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc)                                                                                                                                                                                                                            | CX - 0018   OR [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)                                                    |
| Digital Product Pass  | The [**EcoPass KIT**] reference implementation. The application responsible for retrieving the passports and interacting with the services listed above.                                                                | [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)                                                                                                                                                                                                            | CX - 0143                                                |

> *Note*: The diagrams match the architecture proposed in the [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass) reference implementation [Arc42](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/arc42/Arc42.md) and [Data Retrieval Guide](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/data%20retrieval%20guide/Data%20Retrieval%20Guide.md). Using the discovery services from Catena-X

Here is a diagram of the data retrial flow necessary to retrieve any data from the Catena-X Network without any optimizations:

[![Data Retrieval Flow](./resources/development-view/dataRetrievalFlow.svg)](./resources/development-view/dataRetrievalFlow.svg)

### 1. Discovery Phase

At the beginning we start calling the `Discovery Service` which is responsible for giving us the urls from the `BPN Discovery` and the `EDC Discovery` this two service give us first a `BPN or Business Partner Number` for a specific `id` and the `EDC Discovery` will give you a list of EDC registered by one company's `BPN`.

### 2. Digital Twin Registry Search Phase

Once we have a list of `EDCs` we need to find which of this EDCs contain the `Digital Twin Registry` component. We can filter which `EDCs` contain the `Digital Twin Registry` by simply calling for the catalog with the `type` condition of the contract that must have the `data.core.digitalTwinRegistry` standardized type.

Once we have the list of DTRs we need to negotiate each contract retrieve in the catalog so that we can have the `Contract Agreement Id` which is given by the EDC once the contact is signed and agreed. This id will be used later to request the transfer for the `EDR` token for accessing the `Digital Twin Registry` through the `EDC Provider Data Plane Proxy`.

### 3. Digital Twin Search Phase

We need to search for the `Digital Twins` inside of the `Digital Twin Registries`, and once we found it we can start the negotiation for the `submodelDescriptor` we are searching for that can be for example a: `Digital Product Pass`, `Battery Pass`, `Single Level BOM as Built` or a `Transmission Pass`.

### 4. Data Negotiation and Transfer Phase

Once we have the submodel we are going to call the [`subprotocolBody`] url of the `endpoint interface` with name `SUBMODEL-3.0`. This will provide for us the asset id to negotiate with the EDC Provider. Once this asset is negotiated we will request for the `transfer` and `EDR` token will be sent to the backend by the EDC Provider, allowing us to query the dataplane url contained in the `href` field of the endpoint interface. And in this way we will retrieve the data using the `EDC Provider Data Plane Proxy`.

## Technical Detailed Phases

## 1. Discovery Phase + 2. Digital Twin Registry Search Phase

At the discovery phase the digital product pass application (EcoPass KIT) will search in the Discovery Service for the following keys:

| Key                | Service Name          |
| ------------------ | --------------------- |
| bpn                | EDC Discovery Service |
| manufacturerPartId | BPN Discovery Service |

By searching for this keys the application will find the necessary services and will be able to search for the information needed to start the search for digital twin registries.

After the discovery phase, the search for digital twin registries is one of the core phases to be done when retrieving data in Catena-X. It is necessary for filtering the EDCs which contain the digital twin registry assets, allowing an optimized search without high waiting times.

Once the negotiation for the digital twin registries assets are done we would be able to retrieve a catalog for the user to search the serialized Id (key: partInstanceId, example value: batteryDMC_code).

### Prerequisites for Discovery Phase + Digital Twin Registry Search API

The following information is required to enable the decentralized search for digital twin registries:

| Name            | Example              | Description                                                                                                                                                                                                                                                                                                       |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search Id Type  | *manufacturerPartId* | The search id type is required first of all to know in which `BPN Discovery` services to search. After this same id will be introduced in the `Discovery Service` and we will obtain a list of `BPN Discovery Endpoints`. After this same id will be introduce as the *`type`* attribute in each `BPN Discovery`. |
| Search Id Value | *XYZ78901*           | The search id value is required for searching in the `BPN Discovery` services. One example could be the `product type id` of a company, which is owned by an unique `BPN` reducing the complexity of the search.                                                                                                  |

### Sequence Diagram

This sequence diagram represents the digital twin search and the discovery phases. For more information [go to explanation](#2-digital-twin-registry-search-phase)
[![Sequence Diagram](./resources/development-view/developmentview-sequence-diagramm.svg)](./resources/development-view/developmentview-sequence-diagramm.svg)

> **NOTE**: For learning how to register the assets and the digital twin registry and operate the EcoPass KIT visit the [Operation View](./software-operation-view.md)

## 3. Digital Twin Search Phase Details

The digital twin searching phase involves searching in every digital twin registry for the desired digital twin asset. In this digital twin we will find the necessary information for requesting the contract information for the "digital twin submodels".

### Prerequisites for Digital Twin Search API

The following information is required for enabling the digital twin search, in order to start the data transfer phase:

| Name                   | Example          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Specific Asset Id Type | *partInstanceId* | The specific asset id type is used to search in the `digital twin registry` for a specific digital twin. It is basically the `name` of  "specificAssetId" object located at the [`digital twin`](#aas-30-digital-twin-example) `specificAssetIds` property. The `*partInstanceId*` is used as an example most of the time, since the digital twin registry implemented a hotfix that allows companies say who can access to their `partInstanceId` fields. Now allowing the *"PUBLIC_READABLE"* property. |
| Specific Asset Id Type | *IMR18650V1*     | The specific asset id value is added in the `digital twin lookup` when calling the `EDC Provider Proxy`. It basically points to the value of the *`Specific Asset Id Type`* property.                                                                                                                                                                                                                                                                                                                     |

[![Digital Twin Search](./resources/development-view/ecoPassSearchSequence.svg)](./resources/development-view/ecoPassSearchSequence.svg)

## 4. Data Negotiation and Transfer Phase Details

The **Data Negotiation and Transfer Phase** is the phase responsible for the final data transfer and negotiation. In this phase we retrieve the data using the EDC.

### Prerequisites for Negotiate and Transfer API

The following information is required for enabling the digital twin search, in order to start the data transfer phase:

| Name                 | Example                               | Description                                                                                                                                                   |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract with Policy | [Contract Example](#contract-example) | To start the contract negotiation we need to agree on a policy for the a specific contract. This needs to be selected by the one that is requesting the data. |

### Sequence Diagram for Negotiate and Transfer

[![Negotiation and Transfer](./resources/development-view/ecoPassNegotiationAndTransferSequence.svg)](./resources/development-view/ecoPassNegotiationAndTransferSequence.svg)

## Authentication and Authorization

The authentication is administrated by the `IAM Services` from the Portal defined in the CX - 0001 Standard

The backend APIs are authenticated by using a `JWT Token` in the request as `Bearer` token. The frontend is responsible for obtaining this token in the portal federated IAM.

The EcoPass KIT has two authorization methods:

| Authorization Type            | Description                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portal Roles                  | Each digital product pass application contains an specific "AppId" provided by the portal in the Marketplace registration. And this Id shall be added to the configuration of the DPP Application in order to authenticate the user. If the end user contains any role added in the portal it will have access to the application if enabled. |
| Business Partner Number (BPN) | The digital product pass application contains a check for the "BPN" of the end user. An option is also to allow the user to login if he is belonging to the company of the configured "EDC" so no user can act in name of a specific company.                                                                                                 |

> **NOTE**: The authorization can be configured in the EcoPass KIT configuration so that it matches the business interests of the operator.

For more information on how the Authentication & Authorization is done consult the reference implementation [`Digital Product Pass Arc42`](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/arc42/Arc42.md#authentication--authorization)

## API Specification

### Open API specification

The Digital Product Pass / EcoPass KIT Open API specification is available at the swagger hub from Tractus-X:

[https://app.swaggerhub.com/apis/eclipse-tractusx-bot/digital-product-pass/2.1.3](https://app.swaggerhub.com/apis/eclipse-tractusx-bot/digital-product-pass/2.1.3)

### EcoPass APIs

The APIs below are the ones contained in the `Digital Product Pass Backend` reference implementation. Which can be reused for retrieving aspects from the Catena-X Network.

 | API                                    | Method | Description                                                                                                                                                                                                                                                                                                                                                                      | Parameters                                  |
 | -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
 | **/api/contract/create**               | POST   | The `/api/contract/create` api is responsible for calling the `BPN Discovery` service searching for the BPN of a `manufacturerPartId` and validating if there is any `Decentral Digital Twin Registry` available for the BPN number found in the `EDC Discovery` service.                                                                                                        | [Go to Params](#apicontractcreate)          |
 | **/api/contract/search**               | POST   | At the **/api/contract/search**  API the user can search for a serialized Id and get its contract. The `Backend` will search for the Digital Twin and will return the contract for the first one that is found. A `sign token` (a sha256 hash) is returned also and acts like a "session token" allowing just the user that created the process to sign or decline the contract. | [Go to Params](#apicontractsearch)          |
 | **/api/contract/agree**                | POST   | Once the user has the contract he can call the `/api/contract/agree` API to start the negotiation process and the transfer of the passport. This means that the user accepted the policy and the frame-contracts contained in the contract policy.                                                                                                                               | [Go to Params](#apicontractagree)           |
 | **/api/contract/decline**              | POST   | The other option rather than `/agree` is the `/decline` API, that basically blocks the process and makes it invalid. This means that the user declined the specific contract that was found for this process.                                                                                                                                                                    | [Go to Params](#apicontractdecline)         |
 | **/api/contract/cancel**               | POST   | The user can use `/cancel` to interrupt the negotiation process once it is signed by mistake if is the case. It will be only valid until the negotiation is made.                                                                                                                                                                                                                | [Go to Params](#apicontractcancel)          |
 | **/api/contract/status/`<processId>`** | GET    | After the user signs the contract he can use the `/status` API to get the process status and see when it is ready to retrieve the passport using the API `/data`.                                                                                                                                                                                                                | [Go to Params](#apicontractstatusprocessid) |
 | **/api/data**                          | POST   | The API `/data` will decrypt the passport file that is encrypted using the session token "sign token", and will delete the file so that it is returned just once to the user and can not be accessed anymore. So a new passport will be always need to be requested.                                                                                                             | [Go to Params](#apidata)                    |
 | **/api/data/request**                  | POST   | The Single API `/data/request` calls the necessary above APIs in order to retrieve the passport with auto-sign capability, it calls the create API, then search API, signs with the agree API and retrieves the data with the data API. The authentication is done with an API Key received as an HTTP header.                                                                 | [Go to Params](#apidatarequest)             |

#### Parameters

##### /api/contract/create

| Parameter | Value Name       | Mandatory or Optional Value |
| --------- | ---------------- | --------------------------- |
| id        | searchIdValue    | [REQUIRED]                  |
| type      | searchIdTypeName | manufacturerPartId          |

##### /api/contract/search

| Parameter | Value Name            | Mandatory or Optional Value |
| --------- | --------------------- | --------------------------- |
| id        | serializedIdValue     | [REQUIRED]                  |
| idType    | serializedIdTypeName  | partInstanceId              |
| processId | processIdentification | [REQUIRED]                  |

##### /api/contract/agree

| Parameter  | Value Name             | Mandatory or Optional Value                                                     |
| ---------- | ---------------------- | ------------------------------------------------------------------------------- |
| processId  | processIdentification  | [REQUIRED]                                                                      |
| contractId | contractIdentification | [REQUIRED]                                                                      |
| policyId   | policyIdentification   | If no policyId is specified then the first policy of the contract will be taken |
| token      | searchSessionToken     | [REQUIRED]                                                                      |

##### /api/contract/decline

| Parameter | Value Name            | Mandatory or Optional Value |
| --------- | --------------------- | --------------------------- |
| processId | processIdentification | [REQUIRED]                  |
| token     | searchSessionToken    | [REQUIRED]                  |

##### /api/contract/cancel

| Parameter  | Value Name             | Mandatory or Optional Value |
| ---------- | ---------------------- | --------------------------- |
| processId  | processIdentification  | [REQUIRED]                  |
| contractId | contractIdentification | [REQUIRED]                  |
| token      | searchSessionToken     | [REQUIRED]                  |

##### /api/contract/status/\{processId\}

| Parameter | Value Name            | Mandatory or Optional Value |
| --------- | --------------------- | --------------------------- |
| processId | processIdentification | [REQUIRED]                  |

##### /api/data

| Parameter  | Value Name             | Mandatory or Optional Value |
| ---------- | ---------------------- | --------------------------- |
| processId  | processIdentification  | [REQUIRED]                  |
| contractId | contractIdentification | [REQUIRED]                  |
| token      | searchSessionToken     | [REQUIRED]                  |

#### /api/data/request

##### API Key

Header:

`X-Api-Key: <apiKeySecret>`
> *NOTE*: This can be changed in the configuration

##### API Parameters

| Parameter       | Value Name             | Mandatory or Optional Value |
|-----------------|------------------------|-----------------------------|
| id              | searchIdValue          | [REQUIRED]                  |
| idType          | searchIdTypeName       | manufacturerPartId          |
| discoveryId     | serializedIdValue      | [REQUIRED]                  |
| discoveryIdType | serializedIdTypeName   | partInstanceId              |
| children        | searchForChildren      | true/false  [OPTIONAL]                |
| semanticId      | semanticIdentification | semanticId             [OPTIONAL]     |

##### The Single API Data Retrieval

The Single API `/api/data/request` permits to get data from a Catena-X Provider by abstracting of all the separated APIs needed to do so. Authenticating with an defined API Key and with the mandatory and given serialized and discovery identifications, this API will
create the process and check for the viability of the data retrieval, searches for a passport with the given serialized id, automatically signs the contract retrieved from provider and start negotiation, waits for the negotiation
to be done and returns the data negotiated and transferred. In short, it's the set of the various APIs in one with auto-sign functionality to agile the data retrieval in a simple way.

> [!IMPORTANT]
>
> The policy selection in the single api is not enabled, in this way the first contract and policy available for the asset will be selected. **Using a policy managment system is recommended**  in order to allow this API to retrieve data assuring the policies are checked and compliant with your bussiness.

#### External API calls

| Service                         | Method | Path                                               | Params                                                                    |
| ------------------------------- | ------ | -------------------------------------------------- | ------------------------------------------------------------------------- |
| Discovery Service [CX-0053]     | POST   | /api/administration/connectors/discovery/search    | key:manufacturerPartId (BPN Discovery) & key:bpn (EDC Discovery)          |
| BPN Discovery Service [CX-0053] | POST   | /api/administration/connectors/bpnDiscovery/search | key:manufacturerPartId                                                    |
| EDC Discovery Service [CX-0001] | POST   | /api/administration/connectors/discovery/search    | `{[<Company's BPNL>]}`                                                    |
| Digital Twin Registry [CX-0002] | GET    | /lookup/shells                                     | key:partInstanceID, value: batteryDMC-Code or Product Identification Code |
| Digital Twin Registry [CX-0002] | GET    | /shell-descriptors/\{digitalTwinId\}                 | key:partInstanceID, value: batteryDMC-Code or Product Identification Code |

## Reference Implementations

A reference implementation and a corresponding documentation can be found [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main).

This reference includes a frontend and a backend allowing users to look up and display Battery Passport assets.
The Helm charts of this reference implementation are located [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/charts/digital-product-pass).

### Documentation in the context development

The following represents a collection of relevant documentation regarding the presented adaptation and all related services:

**[EDC Domain Model](https://github.com/eclipse-edc/Connector/blob/main/docs/developer/architecture/domain-model.md)**

**[Reference Implementation:](https://github.com/eclipse-tractusx/digital-product-pass/)**

- **[Arc42 (Main Architecture Document)](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/arc42/Arc42.md)**

- **[CX Data Retrieval Guide](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/data%20retrieval%20guide/DataRetrievalGuide.md)**

## Add-ons

The digital product pass reference implementation can have a series of add-ons that enhance the experience of the applicaiton by using other components from Catena-X.

### Item Relationship Service Add-on

The Digital Product Pass applicaiton can be integrated with the [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service). The drill down of components will be enabled and if the submodels are configured correctly, in the `dpp-frontend` component you will be see which childs in a "1 level" deep available. Respecting the one up and one down principle from Catena-X.

The configuration details can be found in the [Operation View](./software-operation-view.md).

### Digital Product Pass Verification Add-on

The Digital Product Passport Verification add-on is basically a concept for Certifying data in Catena-X as a auditor, how to provider certify data enabeling the verification as a data provider and how consumers verify this same data when retriving them from their data providers.

The focus is on proving a process, artifacts and technologies, based on the existing SSI concept, aiming to enable Certification/Verification processes in Catena-X using wallets.

The documentation from the Digital Product Pass Verification Add-on is available [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-verification). The concept enables the verification of the Data in the Reference Implementation using a [simple wallet](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-verification/simple-wallet), a functional wallet that can:

- Sign verifiable credentials with JsonWebSignature2020 proofs
- Verify verifiable credentials with JsonWebSignature2020 proofs
- Manage private and public keys, providing via DID Documents public keys in JsonWebKey2020 format

Additionally the simple wallet contains a extension for creating JSON-LD @contexts using Catena-X SAMM Models Schemas. This allows the verifiable credentials with the semantic models to be valid JSON-LDs documents and enables the context of the existing and future modeled documents.

![Verification Addon Screenshot](./resources/development-view/verificationAddon.png)

### Business Partner Data Management Add-on

When passports are retrieved from the data providers not all the company data is available to be visualized and shown. In order to eliminate the need to maintain models which contain references to companies in Catena-X the new models contain the `BPNS` and `BPNL` from the companies. Which can be translated into Address and Company information using the [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm) reference implementation.

> [!IMPORTANT]
>
> Companies need to be onboarded in the portal and the information needs to be visible in the Central BPDM Pool Service, where the company information like address is found.
>
> *Additionally*: Technical User credentials must be provided in order to enable the access to the service.

### Data Sovereignty Add-on

In order to retrieve data following the Catena-X Data Sovereighnty guidelines, an addon was developed and can be enabled in the helm chart configuration for configuring the polices which are allowed to be used, with additional asset policy selection in the `dpp-frontend` component.

A guide for using this configuration add-on can be found [here](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/data-sovereignty/PolicyConfigGuide.md).

## Want to know more about Catena-X Digital Product Passes?

### Digital Product Pass Tutorial

For the Second Tractus-X Community Days there was prepared a tutorial for understanding and using the Digital Product Pass application.

You can find it [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-tutorial), there you will find information and guides on how to:

- Deploy the Application
- Create Digital Product Pass Aspect Models
- Create Digital Twins for Digital Product Passports
- Understand how to consume data
- Learn how to create digital product passport QR codes.

## Attachments

### AAS 3.0 Digital Twin Example

```json
{
  "description": [
      {
          "language": "en",
          "text": "Battery Digital Twin"
      }
  ],
  "displayName": [],
  "globalAssetId": "urn:uuid:efcb5f8d-f31c-4b1f-b090-9c878054554d",
  "idShort": "Battery_BAT-XYZ789",
  "id": "urn:uuid:3d050cd8-cdc7-4d65-9f37-70a65d5f53f5",
  "specificAssetIds": [
    {
          "name": "manufacturerId",
          "value": "BPNL000000000000",
          "externalSubjectId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "GlobalReference",
                      "value": "BPNL000000000000"
                  },
                  {
                      "type": "GlobalReference",
                      "value": "PUBLIC_READABLE"
                  }
              ]
          }
      },
      {
          "name": "manufacturerPartId",
          "value": "XYZ78901",
          "externalSubjectId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "GlobalReference",
                      "value": "BPNL000000000000"
                  },
                  {
                      "type": "GlobalReference",
                      "value": "PUBLIC_READABLE"
                  }
              ]
          }
      },
      {
          "name": "partInstanceId",
          "value": "BAT-XYZ789",
          "externalSubjectId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "GlobalReference",
                      "value": "BPNL000000000000"
                  }
              ]
          }
      },
      {
        "key" : "assetLifecyclePhase",
        "value": "AsBuilt"
      },
      {
        "key" : "digitalTwinType",
        "value": "PartInstance"
      }
  ],
  "submodelDescriptors": [
      {
          "endpoints": [
              {
                  "interface": "SUBMODEL-3.0",
                  "protocolInformation": {
                      "href": "https://<edc-dataplane-url>/<data-path>/urn:uuid:1ea64f49-8b2b-4cd2-818e-cf9d452c6fea",
                      "endpointProtocol": "HTTP",
                      "endpointProtocolVersion": [
                          "1.1"
                      ],
                      "subprotocol": "DSP",
                      "subprotocolBody": "id=urn:uuid:3e4a5957-f226-478a-ab18-79ced49d6195;dspEndpoint=<edc-url>",
                      "subprotocolBodyEncoding": "plain",
                      "securityAttributes": [
                          {
                              "type": "NONE",
                              "key": "NONE",
                              "value": "NONE"
                          }
                      ]
                  }
              }
          ],
          "idShort": "SerialPart",
          "id": "urn:uuid:1ea64f49-8b2b-4cd2-818e-cf9d452c6fea",
          "semanticId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "Submodel",
                      "value": "urn:bamm:io.catenax.serial_part:1.0.1#SerialPart"
                  }
              ]
          },
          "description": [],
          "displayName": []
      },
      {
          "endpoints": [
              {
                  "interface": "SUBMODEL-3.0",
                  "protocolInformation": {
                      "href": "https://<edc-dataplane-url>/<data-path>/urn:uuid:09d5d8a9-9073-47b6-93c6-80caff176dca",
                      "endpointProtocol": "HTTP",
                      "endpointProtocolVersion": [
                          "1.1"
                      ],
                      "subprotocol": "DSP",
                      "subprotocolBody": "id=urn:uuid:3e4a5957-f226-478a-ab18-79ced49d6195;dspEndpoint=<edc-url>",
                      "subprotocolBodyEncoding": "plain",
                      "securityAttributes": [
                          {
                              "type": "NONE",
                              "key": "NONE",
                              "value": "NONE"
                          }
                      ]
                  }
              }
          ],
          "idShort": "singleLevelBomAsBuilt",
          "id": "urn:uuid:09d5d8a9-9073-47b6-93c6-80caff176dca",
          "semanticId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "Submodel",
                      "value": "urn:bamm:io.catenax.single_level_bom_as_built:1.0.0#SingleLevelBomAsBuilt"
                  }
              ]
          },
          "description": [],
          "displayName": []
      },
      {
          "endpoints": [
              {
                  "interface": "SUBMODEL-3.0",
                  "protocolInformation": {
                      "href": "https://<edc-dataplane-url>/<data-path>/api/public/data/urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
                      "endpointProtocol": "HTTP",
                      "endpointProtocolVersion": [
                          "1.1"
                      ],
                      "subprotocol": "DSP",
                      "subprotocolBody": "id=urn:uuid:3e4a5957-f226-478a-ab18-79ced49d6195;dspEndpoint=<edc-url>",
                      "subprotocolBodyEncoding": "plain",
                      "securityAttributes": [
                          {
                              "type": "NONE",
                              "key": "NONE",
                              "value": "NONE"
                          }
                      ]
                  }
              }
          ],
          "idShort": "digitalProductPass",
          "id": "urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
          "semanticId": {
              "type": "ExternalReference",
              "keys": [
                  {
                      "type": "Submodel",
                      "value": "urn:samm:io.catenax.generic.digital_product_passport:4.0.0#DigitalProductPassport"
                  }
              ]
          },
          "description": [
              {
                  "language": "en",
                  "text": "Digital Product Passport Submodel"
              }
          ],
          "displayName": []
      }
  ]
}

```

### Contract Example

```json
{
    "@id": "dpp-asset",
    "@type": "dcat:Dataset",
    "odrl:hasPolicy": {
        "@id": "ZGVmYXVsdC1jb250cmFjdC1kZWZpbml0aW9u:cmVnaXN0cnktYXNzZXQ=:MTIxMjYzMzgtYzhkMC00MGQ4LTkxYWMtZmY2ZTY0ZTQ5ZmM0",
        "@type": "odrl:Set",
        "odrl:permission": [
            {
                "odrl:action": "USE",
                "odrl:constraint": {
                    "odrl:and": [
                        {
                            "odrl:leftOperand": "cx-policy:Membership",
                            "odrl:operator": {
                                "@id": "odrl:eq"
                            },
                            "odrl:rightOperand": "active"
                        },
                        {
                            "odrl:leftOperand": "cx-policy:FrameworkAgreement",
                            "odrl:operator": {
                                "@id": "odrl:eq"
                            },
                            "odrl:rightOperand": "circulareconomy:1.0"
                        },
                        {
                            "odrl:leftOperand": "cx-policy:UsagePurpose",
                            "odrl:operator": {
                                "@id": "odrl:eq"
                            },
                            "odrl:rightOperand": "cx.circular.dpp:1"
                        }
                    ]
                }
            }
        ],
        "odrl:prohibition": [],
        "odrl:obligation": [],
        "odrl:target": "registry-asset"
    },
    "dcat:distribution": [
        {
            "@type": "dcat:Distribution",
            "dct:format": {
                "@id": "HttpProxy"
            },
            "dcat:accessService": "bc491229-1b41-49a9-9101-a430a4907e6e"
        },
        {
            "@type": "dcat:Distribution",
            "dct:format": {
                "@id": "AmazonS3"
            },
            "dcat:accessService": "bc491229-1b41-49a9-9101-a430a4907e6e"
        }
    ],
    "asset:prop:type": "data.core.digitalTwinRegistry",
    "description": "Digital Twin Registry for DPP",
    "id": "registry-asset",
    "contenttype": "application/json"
}

```

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
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
