---
id: overview
title: Development View
description: 'What do I have to implement?'
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

This page describes the most important parts for the software implementation of the DCM standards. For the full
technical specification, please refer to the
standard [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Introduction

This document provides developers with resources to accelerate the development of apps and services.

## Capabilities of a DCM application

[CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary] describes the following capabilities:

|Capability|Category|Related Aspect Models|Related APIs|
|-|-|-|-|
|Providing and consuming demand data|Core|WeekBasedMaterialDemand|WeekBasedMaterialDemand API|
|Providing and consuming capacity data|Core|WeekBasedCapacityGroup|WeekBasedCapacityGroup API|
|Comparing demand and capacity data|Core|WeekBasedMaterialDemand <br/> WeekBasedCapacityGroup|N/A|
|Demand volatility metrics|Outer Core|WeekBasedCapacityGroup|WeekBasedCapacityGroup API|
|Simulated delta production|Outer Core|WeekBasedCapacityGroup|WeekBasedCapacityGroup API|
|Load factors|Outer Core|WeekBasedCapacityGroup|WeekBasedCapacityGroup API|
|Digital twins|Extended|WeekBasedMaterialDemand <br/> WeekBasedCapacity Group|DCM Asset Administration Shell API|
|Request for update|Extended|IdBasedRequestForUpdate|IdBasedRequestForUpdate AP|
|Comments|Extended|IdBasedComment|IdBasedComment API|
|Supply chain disruption notifications|Extended|demandAndCapacityNotification|DemandAndCapacityNotification API|

- Core capabilities are mandatory within the standard.
- Outer core capabilities share APIs and aspect models with core capabilities, but are optional.
- Extended capabilities introduce aspect models or APIs beyond the core and are optional.

A MVP approach can be followed when developing software, implementing CX-0128, by taking care of core capabilities first, followed by outer core and finishing with extended capabilities.

## Roles and rights of a DCM application

[CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary] describes the business roles customer and supplier. In addition an admin role might be a sensible addition to any application. Most companies within a supply chain will have need of both business roles. Individual users within a company might need access to both business roles.

|Role|Capabilities|
|-|-|
|Customer| - Modify WeekBasedMaterialDemand <br/> - Compare WeekBasedMaterialDemand to WeekBasedCapacityGroup <br/> - Utilize comments <br/> - Utilize supply chain disruption notification|
|Supplier| - Modify WeekBasedCapacityGroup <br/> - Compare WeekBasedMaterialDemand to WeekBasedCapacityGroup <br/> - Link WeekBasedMaterialDemand to WeekBasedCapacityGroup <br/> - Utilize comments <br/> - Utilize supply chain disruption notification|
|Admin| - Configure Request for update|

## Aspect models utilized by a DCM application

- [WeekBasedMaterialDemand](./model-material-demand.md)
- [WeekBasedCapacityGroup](./model-capacity-group.md)
- [IdBasedRequestForUpdate](./model-rfu.md)
- [IdBasedComment](./model-comment.md)

## Application Programming Interfaces

### APIs as data assets

The data consumer registers one data-asset per API with his own EDC. Those data-assets need a `dataAddress` with a `baseURL` pointing to the URI of the API endpoint. The same `dataAddress` needs to be setup to use the consumers EDC as a proxy, utilizing the different proxy related properties within the `dataAddress` object.

#### Asset example

```json
{
  "@id": "capacitygroup-prod",
  "@type": "Asset",
  "properties": {
    "http://purl.org/dc/terms/type": {
      "@id": "https://w3id.org/catenax/taxonomy#DcmWeekBasedCapacityGroup"
    },
    "https://w3id.org/catenax/ontology/common#version": "2.0",
    "id": "capacitygroup-prod"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "proxyPath": "false",
    "oauth2:clientId": {{clientID}},
    "oauth2:tokenUrl": {{tokenUrl}},
    "type": "HttpData",
    "proxyMethod": "true",
    "oauth2:clientSecretKey": "dcm-api-client-secret",
    "oauth2:scope": "roles",
    "proxyQueryParams": "true",
    "proxyBody": "true",
    "baseUrl": "https://myDCMapp.mycompany.com/catx/apis/weekbasedcapacitygroup"
  },
```

### Data exchange

The data provider is required to use HTTP POST to call the API in order to transfer the data. The POST request has to contain a messageHeader and can contain multiple information objects, with information objects being the different aspect models. Because one API is dedicated to one aspect models mixing different aspect models into the same payload as information objects will result in a malformed payload.

#### Payload structure

```json
{
  "messageHeader":
      <messageHeaderObject>,
 
  "content":{
      "informationObject":[
        <informationObject>,
        <informationObject>
      ]
  }
}
```

This format ensures that the header, which contains metadata about the message, is kept separate from the content, which includes the actual data being exchanged. The content section can hold multiple `informationObject` entries. These objects can be one of the following types: `WeekBasedMaterialDemand`, `WeekBasedCapacityGroup`, `IdBasedComment` or `IdBasedRequestForUpdate`.

The master reference for generating additional file formats and serializations is the RDF turtle file, which is an instance of the Semantic Aspect Meta Model. The RDF turtle file for the `messageHeaderObject` is defined in a centralized shared aspect model and can be accessed at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.shared.message_header/3.0.0/MessageHeaderAspect.ttl
```

Within the RDF turtle file, you will find detailed descriptions for how to use the message header.

For further information on the APIs and how to use them in order to facilitate data exchange, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary] and [CX-0018 Dataspace Connectivity][StandardLibrary]

## APIs utilized by a DCM application

- [WeekBasedMaterialDemand API](./api-material-demand.md)
- [WeekBasedCapacityGroup API](./api-capacity-group.md)
- [RequestForUpdate API](./api-rfu.md)
- [IdBasedComment API](./api-comment.md)
- [DCM Asset Administration Shell API (AAS API)](./api-aas.md)

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 Volkswagen AG
- SPDX-FileCopyrightText: 2023,2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023,2024 BASF SE
- SPDX-FileCopyrightText: 2023,2024 SupplyOn AG
- SPDX-FileCopyrightText: 2023,2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2023,2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V (Fraunhofer)
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation
