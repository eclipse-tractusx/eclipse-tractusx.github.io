---
id: development-view
title: Development View
description: 'What do I have to implement?'
sidebar_position: 3
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

This page describes the most important parts for the software implementation of the DCM standards. For the full
technical specification, please refer to the
standard [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Introduction

This document describes the `WeekBasedMaterialDemand`, `WeekBasedCapacityGroup`, `IdBasedRequestForUpdate` and `IdBasedComment`
semantic models and the API definitions used in the DCM Catena-X network.

## Aspect Models

### Aspect Model "WeekBasedMaterialDemand"

For the exchange of material demand information, customers MUST provide data to suppliers. The data format specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary] MUST be conformed to.

Customers and suppliers MUST implement the `WeekBasedMaterialDemand` data model.

Suppliers MUST be able to consume and process material demand information.

Customers MUST be able to provide and process material demand information.

Data providers of `WeekBasedMaterialDemand` data MUST ensure that it aligns with the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The unique identifier for the semantic model, as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary], MUST be used to define the meaning of the data being transferred.

Business applications utilizing `WeekBasedMaterialDemand` data MUST consume this data, conforming to the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

Within the Catena-X data space `WeekBasedMaterialDemand` data MUST be requested and exchanged using a connector, conforming to the standards [CX-0018][StandardLibrary] and [CX-0002][StandardLibrary].

The JSON Payload provided by data providers MUST comply with the JSON schema as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The characteristics BPNL and BPNS MUST be used, conforming with [CX-0010][StandardLibrary].

#### Sample Data

```json
{
  "unitOfMeasureIsOmitted" : false,
  "unitOfMeasure" : "unit:piece",
  "materialDescriptionCustomer" : "Spark Plug",
  "materialGlobalAssetId" : "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df",
  "materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "materialNumberSupplier" : "MNR-8101-ID146955.001",
  "supplier" : "{{CATENAX-SUPPLIER-BPNL}}",
  "changedAt" : "2023-11-05T08:15:30.123-05:00",
  "demandSeries" : [ {
    "expectedSupplierLocation" : "{{CATENAX-SUPPLIER-BPNS}}",
    "demands" : [ {
      "demand" : 1000,
      "pointInTime" : "2023-10-09"
    } ],
    "customerLocation" : "{{CATENAX-CUSTOMER-BPNS}}",
    "demandCategory" : {
      "demandCategoryCode" : "0001"
    }
  } ],
  "materialDemandIsInactive" : true,
  "materialNumberCustomer" : "MNR-7307-AU340474.002",
  "customer" : "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.week_based_material_demand:3.0.0
```

Data providers MUST use this identifier to clearly define the semantics of the data they are transferring.

All other file format and serializations are derived from a RDF turtle file. It is the source for the Semantic Aspect Meta Model. You can access the RDF turtle file at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.week_based_material_demand/3.0.0/WeekBasedMaterialDemand.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used to generate other file formats such as JSON schema, AASX for Asset Administration Shell Submodel template or HTML documentation.

### Aspect Model "WeekBasedCapacityGroup"

For the exchange of capacity group information, suppliers MUST provide data to customers. The data format specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary] MUST be conformed to.

Customers and suppliers MUST implement the `WeekBasedCapacityGroup` data model.

Suppliers MUST be able to provide and process capacity group information.

Customers MUST be able to consume and process capacity group information.

Data providers of `WeekBasedCapacityGroup` data MUST ensure that it aligns with the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The unique identifier for the semantic model, as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary], MUST be used to define the meaning of the data being transferred.

Business applications utilizing `WeekBasedCapacityGroup` data MUST consume this data, conforming to the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

Within the Catena-X data space `WeekBasedCapacityGroup` data MUST be requested and exchanged using a connector, conforming to the standards [CX-0018][StandardLibrary] and [CX-0002][StandardLibrary].

The JSON Payload provided by data providers MUST comply with the JSON schema as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The characteristics BPNL and BPNS MUST be used, conforming with [CX-0010][StandardLibrary].

#### Sample Data

```json
{
  "unitOfMeasure" : "unit:piece",
  "linkedDemandSeries" : [ {
    "loadFactor" : 3.5,
    "materialNumberCustomer" : "MNR-7307-AU340474.002",
    "materialNumberSupplier" : "MNR-8101-ID146955.001",
    "customerLocation" : "{{CATENAX-CUSTOMER-BPNS}}",
    "demandCategory" : {
      "demandCategoryCode" : "0001"
    }
  } ],
  "linkedCapacityGroups" : [ "be4d8470-2de6-43d2-b5f8-2e5d3eebf3fd" ],
  "unitOfMeasureIsOmitted" : false,
  "capacityGroupIsInactive" : true,
  "demandVolatilityParameters" : {
    "rollingHorizonAlertThresholds" : [ {
      "sequenceNumber" : 1,
      "absoluteNegativeDeviation" : 100.0,
      "subhorizonLength" : 4,
      "relativeNegativeDeviation" : 0.3,
      "absolutePositiveDeviation" : 100.0,
      "relativePositiveDeviation" : 0.2
    } ],
    "measurementInterval" : 4,
    "startReferenceDateTime" : "2024-01-10T12:00:00.320Z"
  },
  "supplier" : "{{CATENAX-SUPPLIER-BPNL}}",
  "name" : "Spark Plugs on drilling machine for car model XYZ",
  "supplierLocations" : [ "{{CATENAX-SUPPLIER-BPNS}}" ],
  "capacities" : [ {
    "pointInTime" : "2022-08-01",
    "agreedCapacity" : 1800,
    "actualCapacity" : 1000,
    "maximumCapacity" : 2000,
    "deltaProductionResult" : 400
  } ],
  "changedAt" : "2023-03-10T12:27:11.320Z",
  "capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "customer" : "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.week_based_capacity_group:3.0.0
```

Data providers MUST use this identifier to clearly define the semantics of the data they are transferring.

All other file format and serializations are derived from a RDF turtle file. It is the source for the Semantic Aspect Meta Model. You can access the RDF turtle file at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.week_based_capacity_group/3.0.0/WeekBasedCapacityGroup.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used to generate other file formats such as JSON schema, AASX for Asset Administration Shell Submodel template or HTML documentation.

### Aspect Model "IdBasedRequestForUpdate"

`IdBasedRequestForUpdate` can be exchanged between customer and supplier conforming to the API standard described in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary]. The data format specified in this standard MUST be conformed to.

Customers and suppliers MUST implement the `IdBasedRequestForUpdate` data model.

Customers and suppliers MUST be able to consume and process a request for update.

Providing an `IdBasedRequestForUpdate` is OPTIONAL. It is RECOMMENDED to be both capable of providing and consuming a request for update.

Providers of an `IdBasedRequestForUpdate` MUST ensure that it aligns with the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The unique identifier for the semantic model, as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary], MUST be used to define the meaning of the data being transferred.

Business applications utilizing `IdBasedRequestForUpdate` data MUST consume this data, conforming to the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

Within the Catena-X data space `IdBasedRequestForUpdate` data MUST be requested and exchanged using a connector, conforming to the standards [CX-0018][StandardLibrary] and [CX-0002][StandardLibrary].

The JSON Payload provided by data providers MUST comply with the JSON schema as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

#### Sample Data

```json
{
  "weekBasedMaterialDemand" : [ {
    "materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c3456",
    "changedAt" : "2023-03-10T12:27:11.320Z"
  } ],
  "weekBasedCapacityGroup" : [ {
    "capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110",
    "changedAt" : "2023-03-10T12:27:11.320Z"
  } ]
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.id_based_request_for_update:3.0.0
```

Data providers MUST use this identifier to clearly define the semantics of the data they are transferring.

All other file format and serializations are derived from a RDF turtle file. It is the source for the Semantic Aspect Meta Model. You can access the RDF turtle file at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.id_based_request_for_update/3.0.0/IdBasedRequestForUpdate.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used to generate other file formats such as JSON schema, AASX for Asset Administration Shell Submodel template or HTML documentation.

### Aspect Model "IdBasedComment"

An `IdBasedComment` can refer to a `WeekBasedCapacityGroup`, its weekly capacities, a `WeekBasedMaterialDemand`, or its weekly demand series. This comment can be exchanged between customer and supplier conforming to the API standard described [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary]. The data format specified in this standard MUST be conformed to.

Customers and suppliers MUST implement the `IdBasedComment` data model.

Customers and suppliers MUST be able to provide and process an `IdBasedComment`.

Customers and suppliers MUST be able to consume and process an `IdBasedComment`.

Data providers of `IdBasedComment` data MUST ensure that it aligns with the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The unique identifier for the semantic model, as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary], MUST be used to define the meaning of the data being transferred.

Business applications utilizing `IdBasedComment` data MUST consume this data, conforming to the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

Data consumers and data providers MUST comply with the license of the semantic model specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

Within the Catena-X data space `IdBasedComment` data MUST be requested and exchanged using a connector, conforming to the standards [CX-0018][StandardLibrary] and [CX-0002][StandardLibrary].

The JSON Payload provided by data providers MUST comply with the JSON schema as specified in [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The characteristics BPNL and BPNS MUST be used, conforming with [CX-0010][StandardLibrary].

#### Sample Data

```json
{
  "postedAt" : "2023-03-10T12:27:11.320Z",
  "listOfReferenceDates" : [ "2023-11-05" ],
  "author" : "someone@company.com",
  "supplier" : "{{CATENAX-SUPPLIER-BPNL}}",
  "commentType" : "information",
  "commentId" : "f5c151e4-30b5-4456-94fd-2a7b559b6121",
  "changedAt" : "2023-03-10T12:27:11.320Z",
  "commentText" : "Hello, this is a comment!",
  "requestDelete" : true,
  "objectId" : "dfeb1334-497e-4dab-97c1-4e6f4e1c0320",
  "objectType" : "urn:samm:io.catenax.week_based_capacity_group",
  "customer" : "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.id_based_comment:1.0.0
```

Data providers MUST use this identifier to clearly define the semantics of the data they are transferring.

All other file format and serializations are derived from a RDF turtle file. It is the source for the Semantic Aspect Meta Model. You can access the RDF turtle file at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.id_based_comment/1.0.0/IdBasedComment.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used to generate other file formats such as JSON schema, AASX for Asset Administration Shell Submodel template or HTML documentation.

## Application Programming Interfaces

### Header

When exchanging data with a DCM partner, the POST request payload MUST be structured as follows:

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

This format ensures that the header, which contains metadata about the message, is kept separate from the content, which includes the actual data being exchanged. The content section can hold multiple `informationObject` entries. These objects can be one of the following types: `WeekBasedMaterialDemand`, `WeekBasedCapacityGroup`, `IdBasedComment`, or `IdBasedRequestForUpdate`.

The master reference for generating additional file formats and serializations is the RDF turtle file, which is an instance of the Semantic Aspect Meta Model. The RDF turtle file for the `messageHeaderObject` is defined in a centralized shared aspect model and can be accessed at the following URL:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.shared.message_header/3.0.0/MessageHeaderAspect.ttl
```

Within the RDF turtle file, you will find detailed descriptions for how to use the message header.

### WeekBasedMaterialDemand API

The `WeekBasedMaterialDemand` object is used to provide material demand information from customer to supplier.

Customers MUST be able to provide `WeekBasedMaterialDemand`.

Suppliers MUST be able to consume and process `WeekBasedMaterialDemand`.

The `WeekBasedMaterialDemand` API MUST be published towards the network using a Data Asset/Contract Offer, which is in line with the Dataspace Protocol as specified by the International Data Spaces Association (IDSA) and MUST conform with the Catena-X standard [CX-0001][StandardLibrary].

#### Data Exchange

Customers MUST provide suppliers with `WeekBasedMaterialDemand` data via HTTP POST request. The data MUST conform to the format specified in this standard and it MUST NOT exceed 15 MiB in size. It MUST be a valid JSON string and MUST include all mandatory properties. The data model with all its properties MUST conform to the respective aspect model and the definitions above. Properties marked as "optional" MAY be included in the data.
When consuming a payload, that contains unknown properties not described within the data model but is otherwise correct, those properties MUST be ignored.

Attributes that are strings MUST be formatted correctly. For example, `expectedSupplierLocation` MUST be formatted as a BPNS. The `pointInTime` property MUST represent the week's Monday in the format YYYY-MM-DD as described in ISO8601.

The `demandCategory` property MUST be set to one of the predefined values from [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The `unitOfMeasure` property MUST be set to one of the predefined values from [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary]. If no unit of measure is to be provided, the customer MUST omit the property and set the `unitOfMeasureIsOmitted` flag to true.

Multiple `WeekBasedMaterialDemand` aspects MAY be provided in one transfer as a JSON list. If only one `WeekBasedMaterialDemand` aspect is provided, it MUST be as list with one entry.

The current week is denominated as N=0, the next week as N=1, the week after the next week as N=2 and so on.
The data series in the `WeekBasedMaterialDemand` SHOULD start from week N=2. The dataset MUST include at least one week, where N>1 and MUST NOT contain duplicate weeks. Weeks N=0 and N=1 MAY be included. If demand changes, the entire dataset MUST be provided again, avoiding inconsistent or incomplete data. The new dataset might contain additional data or less data then the previous version of the same dataset. This includes the possibility that a `demandSeries` might have been removed entirely. Each `WeekBasedMaterialDemand` object MUST be unique for a given `supplier`, `customer` and `materialNumberCustomer` combination. This means that customers need to aggregate demands from all their factories before providing them to suppliers as a single `WeekBasedMaterialDemand`.

If a week's demand is zero (value = `0`), it MUST be explicitly stated and included in the `WeekBasedMaterialDemand`, unknown demands (value = `null`) SHOULD be omitted.

The customer MAY define a `WeekBasedMaterialDemand` as inactive by setting and transferring the `materialDemandIsInactive` flag to the supplier. The inactive `WeekBasedMaterialDemand` and their related `demandSeries` data MUST be ignored during the demand-capacity matching over the whole horizon, i.e. must be considered in the same way as not existing data for the demand-capacity matching. Inactivating a `WeekBasedMaterialDemand` may trigger their archiving or deletion in the local DCM application of the business partner.
Once a `WeekBasedMaterialDemand` has been set as inactive, this MAY be undone by the customer by reverting the `materialDemandIsInactive` flag. In this case, the `WeekBasedMaterialDemand` MUST again be considered during the demand-capacity matching. The reverting of the inactive flag of a `WeekBasedMaterialDemand` may correspond to a newly created and initially transferred or to an updated `WeekBasedMaterialDemand`.

#### UUID generation and handling

UUIDv4 is REQUIRED for exchanging demand data to ensure uniqueness and security. The UUID MUST be generated conforming to [RFC4122][RFC4122] and MUST be treated as unique within the supplier-customer relationship.

#### Data asset structure

The HTTP POST endpoint introduced above MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via connector conformant to [CX-0018][StandardLibrary]. Therefore, the endpoint MUST be offered as a Data Asset. The latter MUST have a property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmWeekBasedMaterialDemand`. It can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This property SHOULD be used to identify the asset when searching the assets catalog of a supplier. Because the asset reflects the contractual relationship between a supplier and its customers, only one asset with the aforementioned property for one version MUST be visible to the customer at any time to avoid ambiguity.

The API version described MUST be published in the property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a compatible version with their own, the requester MUST terminate the data transfer.

Each supplier MUST ensure that only their customers have access to the asset by using access and usage policies and respective contract definitions.

An example Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} MUST be substituted with a corresponding value.
>
> Asset definition example for Management API v3 (non-normative)

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "{{ ASSET_ID }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:DcmWeekBasedMaterialDemand"
    },
    "description": "Endpoint for providing Material Demands",
    "cx-common:version": "2.0"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ URL-BACKEND-APPLICATION-WEEKBASEDMATERIALDEMAND-ENDPOINT }}",
    "method": "POST",
    "proxyBody": "true",
    "contentType": "application/json"
  }
}
```

#### Error handling

Every API endpoint defined above MUST respond to incoming requests with HTTP status codes as described in [RFC9110][RFC9110]. All of the following HTTP status codes, except for codes `200` and `201`, MUST be interpreted as failures. Therefore, it may be sufficient for a business application to simply check if the status code is `200` or `201` or not. If not, the request failed.

| HTTP Status Code | HTTP Status Message | Description |
|:-----------------|:--------------------|:-------------|
| 200 | OK | The request has succeeded. The `WeekBasedMaterialDemand` has been successfully processed in the backend system. |
| 201 | Created | The request has succeeded and has led to the creation of a new `WeekBasedMaterialDemand` in the backend system. |
| 400 | Bad request | The server cannot or will not process the request due to something that is perceived to be a client error (e.g. malformed request syntax, invalid request message framing, or deceptive request routing). |
| 401 | Unauthorized | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |
| 403 | Forbidden | The `WeekBasedMaterialDemand` in question is not available for the client (e.g. it belongs to a different company). |
| 405 | Method not allowed | The method used to request the data was not POST. |
| 422 | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors, e.g. the JSON payload could not be parsed. |
| 503 | Service Unavailable | The server is not ready to handle the request. |

If one `WeekBasedMaterialDemand` aspect is provided in one HTTP request, the return codes MUST be used as stated in the table above.

If a list of multiple `WeekBasedMaterialDemand` aspects is provided in one HTTP request, the status code `400` MUST be used if at least one `WeekBasedMaterialDemand` in the list cannot be processed. Applications MAY choose to process valid entries from a list which also contains invalid entries. If a list of multiple `WeekBasedMaterialDemand` aspects is provided in one HTTP request and all of them can be processed successfully, the status code `200` MUST be used.

The return codes `401`, `405`, `422` and `503` in the table above MAY also be applicable to a list of multiple `WeekBasedMaterialDemand` aspects.

#### Validating payload

The following tables are supposed to answer questions regarding what business logic MUST be executed when consuming a `WeekBasedMaterialDemand` which has been formed in a specific way.

The order of rules is indicated by the 'Number' row. The rules MUST be executed in exactly this order, starting from the lowest number.

The first rule that matches MUST be executed. All other rules MUST be ignored.

'value' indicates the actual value written in quotation marks and without any specific formatting (e.g. italic).

_Valid value_ indicates that the value is valid according to aspect model, API and process.

_Invalid value_ indicates that the value is invalid according to aspect model, API and process.

_Any value_ indicates that the value can be anything, valid or not.

A whitespace or an empty cell indicates that for this specific rule that row is not applicable.

| **Number** | 1 |  |
|---|---|---|
| **Properties** |  |  |
| **Meta Properties** | Any property | _invalid value_ |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 2 |  |
|---|---|---|
| **Properties** | customer | Customer BPNL does not match the providing connectors registered BPNL |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 3 |  |
|---|---|---|
| **Properties** | customer | Supplier does not match any Supplier BPNL that I am responsible for |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 4 |  |
|---|---|---|
| **Properties** | materialDemandID  | _Known value_ |
|  | changedAt  | More recent than all previously consumed `WeekBasedMaterialDemand` with the same materialDemandID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Overwrite all existing values |
|  | Return Code | 200 - OK |

| **Number** | 5 |  |
|---|---|---|
| **Properties** | materialDemandID  | _Unknown value_, but there exists another UUID for the exact same combination of supplier, customer and materialNumberCustomer |
|  | customer  | _Known value_ |
|  | supplier  | _Known value_ |
|  | materialNumberCustomer  | _Known value_ |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 6 |  |
|---|---|---|
| **Properties** | materialDemandID  | _Unknown value_ |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Save as new material demand with consumed values |
|  | Return Code | 201 - Created |

| **Number** | 7 |  |
|---|---|---|
| **Properties** | materialDemandID  | _Known value_ |
|  | changedAt  | Older than any previously consumed `WeekBasedMaterialDemand` with the same materialDemandID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 8 |  |
|---|---|---|
| **Properties** | materialDemandID  | _Known value_ |
|  | changedAt  | Identical to the most recent of all previously consumed `WeekBasedMaterialDemand` with the same materialDemandID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Overwrite all existing values with consumed values |
|  | Return Code | 200 - OK |

### WeekBasedCapacityGroup API

The `WeekBasedCapacityGroup` object is used to provide capacity group information from supplier to customer.

Suppliers MUST be able to provide `WeekBasedCapacityGroup`

Customers MUST be able to consume and process `WeekBasedCapacityGroup`

The `WeekBasedCapacityGroup` API MUST be published towards the network using a Data Asset/Contract Offer, which is in line with the Dataspace Protocol as specified by IDSA and MUST conform with the Catena-X standard [CX-0001][StandardLibrary].

#### Data Exchange

Suppliers MUST provide customers with `WeekBasedCapacityGroup` data via HTTP POST request. The data MUST conform to the format specified in this standard and it MUST NOT exceed 15 MiB in size. It MUST be a valid JSON string and MUST include all mandatory properties. The data model with all its properties MUST conform to the respective aspect model and the definitions above. Properties marked as "optional" MAY be included in the data.
When consuming a payload, that contains unknown properties not described within the data model but is otherwise correct, those properties MUST be ignored.

Attributes that are strings MUST be formatted correctly. For example, `customer` MUST be formatted as a BPNL. The `pointInTime` property MUST represent the week's Monday in the format YYYY-MM-DD as described in ISO8601.

The `demandCategory` property MUST be set to one of the predefined values from [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

The `unitOfMeasure` property MUST be set to one of the predefined values from [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary]. If no unit of measure is to be provided, the customer MUST omit the property and set the `unitOfMeasureIsOmitted` flag to true.

Multiple `WeekBasedCapacityGroup` aspects MAY be provided in one transfer as a JSON list. If only one `WeekBasedCapacityGroup` aspect is provided, it MUST be as a list with one entry.

The current week is denominated as N=0, the next week as N=1, the week after the next week as N=2 and so on.
The data series in the `WeekBasedCapacityGroup` SHOULD start from N=2. The dataset MUST include at least one week, where N>1 and MUST NOT contain duplicate weeks. Weeks N=0 and N=1 MAY be included. If capacity changes, the entire dataset MUST be provided again, avoiding inconsistent or incomplete data. A single combination of `demandCategory`, `customerLocation` and `materialNumberCustomer` MAY be referenced across multiple `WeekBasedCapacityGroup` objects. This means that one `materialNumberCustomer` MAY appear in the `linkedDemandSeries` of several distinct `WeekBasedCapacityGroup` objects.

If a week's demand is zero (value = `0`), it MUST be explicitly stated and included in the `WeekBasedMaterialDemand`, unknown demands (value = `null`) SHOULD be omitted.

The `linkedDemandSeries` property specifies which particular `WeekBasedMaterialDemand` a `WeekBasedCapacityGroup` is referencing. To clarify the `linkedDemandSeries` points to a demand with a specific trio: `demandCategory`, `customerLocation` and `materialNumberCustomer`.

The customer MAY define a `WeekBasedCapacityGroup` as inactive by setting and transferring the `capacityGroupIsInactive` flag to the supplier. The inactive `WeekBasedCapacityGroup` MUST be ignored during the demand-capacity matching over the whole horizon, i.e. must be considered in the same way as not existing data for the demand-capacity matching. Inactivating data may trigger their archiving or deletion in the local DCM application of the business partner. The inactive flag of a `WeekBasedCapacityGroup` MUST NOT affect linked `WeekBasedMaterialDemand` objects or other linked `WeekBasedCapacityGroup`. The inactivation of a `WeekBasedCapacityGroup` MAY result in the situation that its linked active `WeekBasedMaterialDemand` objects have to be newly linked to other active `WeekBasedCapacityGroup`. Once a `WeekBasedCapacityGroup` has been set as inactive, this MAY be undone by reverting the `capacityGroupIsInactive` flag. In this case, the `WeekBasedCapacityGroup` MUST again be considered during the demand-capacity matching. The reverting of the inactive flag of a `WeekBasedCapacityGroup` may correspond to a newly created and initially transferred or to an updated `WeekBasedCapacityGroup`.

Suppliers MAY use demand volatility metrics, including the optional entity `demandVolatilityParameters` within the JSON payload.

The following properties are used by demand volatility metrics:

- demandVolatilityParameters
  - startReferenceDateTime
  - measurementInterval
  - rollingHorizonAlertThresholds
    - sequenceNumber
    - subhorizonLength
    - absolutePositiveDeviation
    - absoluteNegativeDeviation
    - relativePositiveDeviation
    - relativeNegativeDeviation

Suppliers use `startReferenceDateTime` to define the start of the demand volatility metric calculation, it is also marks the start of the first measurement interval. Its value MUST be chosen, so that transfer times are considered, allowing the customer to consume the data while `startReferenceDateTime` is still larger than the customer´s system time. It is RECOMMENDED to allow for a grace period of at least 24 hours.

In order to get the start of any subsequent measurement intervals the value of `measurementInterval` needs to be converted from integer to weeks and added to `startReferenceDateTime`.

Once demand volatility metric calculation has been initialized `startReferenceDateTime` MUST maintain its value.

If the value of `startReferenceDateTime` or `measurementInterval`  changes this is considered another initialization.

The sequence of entries within the `linkedDemandSeries` of a `WeekBasedCapacityGroup` does not follow any particular order and MUST be treated as non-sequential or random.

#### UUID generation and handling

UUIDv4 is REQUIRED for exchanging capacity data to ensure uniqueness and security. The UUID MUST be generated conforming to [RFC4122][RFC4122] and MUST be treated as unique within the supplier-customer relationship.

#### Data asset structure

The HTTP POST endpoint introduced above MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via a connector conformant to [CX-0018][StandardLibrary]. Therefore, the endpoint MUST be offered as a Data Asset. The latter MUST have a property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmWeekBasedCapacityGroup`. It can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This property SHOULD be used to identify the asset when searching the assets catalog of a customer. Because the asset reflects the contractual relationship between a customer and its suppliers, only one asset with the aforementioned property for one version MUST be visible to the supplier at any time to avoid ambiguity.

The API version described in this standard MUST be published in the property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a compatible version with their own, the requester MUST terminate the data transfer.

Each customer MUST ensure that only their suppliers have access to the asset by using access and usage policies and respective contract definitions.

An example Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} MUST be substituted with a corresponding value.
>
> Asset definition example for management API v3 (non-normative)

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "{{ ASSET_ID }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:DcmWeekBasedCapacityGroup"
    },
    "description": "Endpoint for providing Week Based Capacity Groups",
    "cx-common:version": "2.0"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ URL-BACKEND-APPLICATION-WEEKBASEDCAPACITYGROUP-ENDPOINT }}",
    "method": "POST",
    "proxyBody": "true",
    "contentType": "application/json"
  }
}
```

#### Error handling

Every API endpoint defined above MUST respond to incoming requests with HTTP status codes as described in [RFC9110][RFC9110]. All of the following HTTP status codes, except for codes `200` and `201`, MUST be interpreted as failures. Therefore, it may be sufficient for a business application to simply check if the status code is `200` or `201` or not. If not, the request failed.

| HTTP Status Code | HTTP Status Message | Description |
|:-----------------|:--------------------|:-------------|
| 200 | OK | The request has succeeded. The `WeekBasedCapacityGroup` has been successfully processed in the backend system. |
| 201 | Created | The request has succeeded and has led to the creation of a new `WeekBasedCapacityGroup` in the backend system. |
| 400 | Bad request | The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |
| 401 | Unauthorized | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |
| 403 | Forbidden | The `WeekBasedCapacityGroup` in question is not available for the client (e.g. it belongs to a different company). |
| 405 | Method not allowed | The method used to request the data was not POST. |
| 422 | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors, e.g. the JSON payload could not be parsed. |
| 503 | Service Unavailable | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |

If one `WeekBasedCapacityGroup` aspect is provided in one HTTP request, the return codes MUST be used as stated in the table above.

If a list of multiple `WeekBasedCapacityGroup` aspects is provided in one HTTP request, the status code `400` MUST be used if at least one `WeekBasedCapacityGroup` in the list cannot be processed. Applications MAY choose to process valid entries from a list which also contains invalid entries. If a list of multiple `WeekBasedCapacityGroup` aspects is provided in one HTTP request and all of them can be processed successfully, the status code `200` MUST be used.

The return codes `401`, `405`, `422` and `503` in the table above MAY also be applicable to a list of multiple `WeekBasedCapacityGroup` aspects.

#### Validating payload

The following tables are supposed to answer questions regarding what business logic MUST be executed when consuming a `WeekBasedCapacityGroup` which has been formed in a specific way.

The order of rules is indicated by the 'Number' row.

The first rule that matches MUST be executed. All other rules MUST be ignored.

'value' indicates the actual value written in quotation marks and without any specific formatting (e.g. italic).

_Valid value_ indicates that the value is valid according to aspect model, API and process.

_Invalid value_ indicates that the value is invalid according to to aspect model, API and process.

_Any value_ indicates that the value can by anything, valid or not.

A whitespace or an empty cell indicates that for this specific rule that row is not applicable.

| **Number** | 1 |  |
|---|---|---|
| **Properties** |  |  |
| **Meta Properties** | Any property | _invalid value_ |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 2 |  |
|---|---|---|
| **Properties** | customer | Supplier BPNL does not match the providing connectors registered BPNL |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 3 |  |
|---|---|---|
| **Properties** | customer | Customer does not match any Supplier BPNL that I am responsible for |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 4 |  |
|---|---|---|
| **Properties** | linkedCapacityGroups | Either both `linkedCapacityGroups` and `linkedDemandSeries` contain _Any value_ or do not contain a value. |
| | linkedDemandSeries | Either both `linkedCapacityGroups` and `linkedDemandSeries` contain _Any value_ or do not contain a value. |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 5 |  |
|---|---|---|
| **Properties** | startReferenceDateTime | _value_ &lt _system time_ AND _value_ &lt&gt _current value_ of `startReferenceDateTime` |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values. |
|  | Return Code | 400 - Bad Request |

| **Number** | 6 |  |
|---|---|---|
| **Properties** | capacityGroupID  | _Known value_ |
|  | changedAt  | More recent than all previously consumed `WeekBasedCapacityGroup` with the same capacityGroupID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Overwrite all existing values |
|  | Return Code | 200 - OK |

| **Number** | 7 |  |
|---|---|---|
| **Properties** | capacityGroupID  | _Unknown value_ |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Save as new capacity group with consumed values |
|  | Return Code | 201 - Created |

| **Number** | 8 |  |
|---|---|---|
| **Properties** | capacityGroupID  | _Known value_ |
|  | changedAt  | Older than any previously consumed `WeekBasedCapacityGroup` with the same capacityGroupID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 9 |  |
|---|---|---|
| **Properties** | capacityGroupID  | _Known value_ |
|  | changedAt  | Identical to the most recent of all previously consumed `WeekBasedCapacityGroup` with the same capacityGroupID |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Overwrite all existing values with consumed values |
|  | Return Code | 200 - OK |

### RequestForUpdate API

The `IdBasedRequestForUpdate` object (RfU) is used to request updates of some or even all `WeekBasedMaterialDemand` or `WeekBasedCapacityGroup` objects.

Customers and Supplier MUST be able to consume and process a RfU. Being able to provide a RfU is RECOMMENDED.

To properly process a RfU, the following steps MUST be executed:

1. Response: Answering with the appropriate HTTP status code
2. Action: If that status code is `200 OK`: Providing the requested material demands and capacity groups via `WeekBasedMaterialDemand` API or `WeekBasedCapacityGroup` API respectively.

It is RECOMMENDED that this functionality SHOULD NOT be an end-user functionality which can be executed in an user interface.

The `IdBasedRequestForUpdate` API MUST be published towards the network using a Data Asset/Contract Offer, which is in line with the Dataspace Protocol as specified by IDSA and MUST conform with the Catena-X standard [CX-0001][StandardLibrary].

#### Data Exchange

The `IdBasedRequestForUpdate` data MUST be provided by the customer to the supplier or vice versa via HTTP POST request. The data MUST conform to the format specified in this standard and it MUST NOT exceed 15 MiB in size.
When consuming a payload, that contains unknown properties not described within this standard but is otherwise correct, those properties MUST be ignored.

An empty RfU payload requests all data within the specific customer-supplier relationship.

A RfU payload MAY specify that only `WeekBasedMaterialDemand` or `WeekBasedCapacityGroup` objects are requested within the specific customer-supplier relationship.

A RfU payload MAY specify that only certain data objects, identified by their respective UUID, are requested within the specific customer-supplier relationship.

A RfU payload MAY specify that only certain data objects, that have been updated, identified by their respective UUID and `changedAt` value, are requested within the specific customer-supplier relationship.

The following example payloads are intended to illustrate the different possible payloads of an `IdBasedRequestForUpdate`:

RfU: Provide Everything

```json
{
}
```

RfU: Provide only Material Demands

```json
{
    "weekBasedMaterialDemand": [
    ]
}
```

RfU: Provide only Capacity Groups

```json
{
    "weekBasedCapacityGroup": [
    ]
}
```

RfU: Provide only certain Objects

```json
{
    "weekBasedMaterialDemand": [
        {
            "materialDemandId":"278e333d-f06b-4b59-8e95-22862f69807f"},
        {
            "materialDemandId":"46adfa5d-36b7-4a9b-9ac6-508dac500dd2"}
    ]
},
{
    "weekBasedCapacityGroup": [
        {
            "capacityGroupId":"a2fc69ac-ede7-48d3-bee5-04de665d49f0"},
        {
            "capacityGroupId":"34238729-990a-4b61-b0c6-336da7b71675"}
    ]
}
```

RfU: Provide only certain Objects and only if my version is not up to date

```json
{
    "weekBasedMaterialDemand": [
        {
            "materialDemandId":"278e333d-f06b-4b59-8e95-22862f69807f"},
        {
            "materialDemandId":"46adfa5d-36b7-4a9b-9ac6-508dac500dd2"}
    ]
},
{
    "weekBasedCapacityGroup": [
        {
            "capacityGroupId":"a2fc69ac-ede7-48d3-bee5-04de665d49f0"},
        {
            "capacityGroupId":"34238729-990a-4b61-b0c6-336da7b71675",
            "changedAt": "2023-03-08T11:44:27.701+01:00"}
    ]
}
```

#### Data asset structure

The HTTP POST endpoint introduced above MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via a connector conformant to [CX-0018][StandardLibrary]. Therefore, the endpoint MUST be offered as a Data Asset. The latter MUST have a property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmIdBasedRequestForUpdate`. It can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This property SHOULD be used to identify the asset when searching the assets catalog of a partner. Because the asset reflects the contractual relationship between two DCM partners, only one asset with the aforementioned property for one version MUST be visible to the partner at any time to avoid ambiguity.

The API version described in this standard MUST be published in the property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a compatible version with their own, the requester MUST terminate the data transfer.

Each DCM participant MUST ensure that only their business partners have access to the asset by using access and usage policies and respective contract definitions.

An example Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} MUST be substituted with a corresponding value.
>
> Asset definition example for management API v3 (non-normative)

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "{{ ASSET_ID }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:DcmIdBasedRequestForUpdate"
    },
    "description": "Endpoint for requesting updates",
    "cx-common:version": "2.0"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ URL-BACKEND-APPLICATION-IDBASEDREQUESTFORUPDATE-ENDPOINT }}",
    "method": "POST",
    "proxyBody": "true",
    "contentType": "application/json"
  }
}
```

#### Error handling

Every API endpoint defined above MUST respond to incoming requests with HTTP status codes as described in [RFC9110][RFC9110]. All of the following HTTP status codes, except for code `200` , MUST be interpreted as failures. Therefore, it may be sufficient for a business application to simply check if the status code is `200` or not. If not, the request failed.

| HTTP Status Code | HTTP Status Message |  Description |
|:-----------------|:--------------------|:-------------|
| 200 | OK | The request has succeeded. The `IdBasedRequestForUpdate` has been successfully processed in the backend system. |
| 400 | Bad request | The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |
| 401 | Unauthorized | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |
| 403 | Forbidden | The `IdBasedRequestForUpdate` functionality is not available for the client. |
| 405 | Method not allowed | The method used to request the data was not POST. |
| 422 | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors, e.g. the JSON payload could not be parsed. |
| 503 | Service Unavailable | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |

Because multiple material demands and capacity groups can be requested at the same time HTTP status code `200` only means that the `IdBasedRequestForUpdate` was processed successfully and that the data objects will be provided in due time.

The requested data objects SHOULD be provided within five minutes, but definitely they MUST be provided within 24 hours.

If only a single data object is requested it MUST be provided within 10 seconds.

#### Validating payload

Payload validation only applies to the formal layer. If a payload is correctly formed and thusly can be processed HTTP `200` is the correct response code. Even if a material demand (identified by its UUID) has been requested that does not exists within that supplier-customer relationship, HTTP `200` is the correct response code.

### IdBasedComment API

The `IdBasedComment` object is used to exchange comments, referencing a `WeekBasedCapacityGroup` or a `WeekBasedMaterialDemand` between customer and supplier.

Customers and suppliers MUST be able to provide, consume and process `IdBasedComment`.

The `IdBasedComment` API MUST be published towards the network using a Data Asset/Contract Offer, which is in line with the Dataspace Protocol as specified by IDSA and MUST conform with the Catena-X standard [CX-0001][StandardLibrary].

#### Data Exchange

The `IdBasedComment` data MUST be provided by the customer to the supplier or vice versa via HTTP POST request. The data MUST conform to the format specified in this standard and it MUST NOT exceed 15 MiB in size. It MUST be a valid JSON string and MUST include all mandatory properties. The data model with all its properties MUST conform to the respective aspect model and the definitions above.
When consuming a payload, that contains unknown properties not described within the data model but is otherwise correct, those properties MUST be ignored.

Attributes that are strings MUST be formatted correctly. For example, `expectedSupplierLocation` MUST be formatted as a BPNS. The `listOfReferenceDates` collection MUST represent the calendar week's Mondays in the format YYYY-MM-DD as described in ISO8601.

Certain properties, such as `author`, `objectId`, `listOfReferenceDates` and `objectType`, have specific requirements for their values. `author` MUST contain a valid email address or BPNL if anonymity is preferred. `objectId`, MUST be the UUID of either the `WeekBasedMaterialDemand` or `WeekBasedCapacityGroup` the comments is referencing. `objectType` MUST be as a Catena-X aspect model unique identifier without a version.

Multiple `IdBasedComment` aspects MAY be provided in one transfer as a JSON list. If only one `IdBasedComment` aspect is provided, it MUST be as a list with one entry.

A comment MAY reference more than one calendar week utilizing the `listOfReferenceDates` property. Every entry in `listOfReferenceDates` MUST be set to a Monday, MUST conform to ISO8601 and MUST use the format YYYY-MM-DD (for example 2023-02-13).

Applications that consume a `IdBasedComment` with the property `requestDelete` set to `true` MUST delete the comment in compliance with General Data Protection Regulation (GDPR). Deletion is final and MUST NOT be reversed.

Applications SHOULD remember which comments they originated in order to prevent unauthorized deletion.

An `IdBasedComment` SHOULD always be provided with as much information as is available, so that the consuming application can better decide how to process the comment.

The table below MUST be considered in addition to the data model itself and describes which properties MUST be treated as mandatory so that applications can execute certain actions on an `IdBasedComment`.

| Property \ Action | Create | Update | Delete |
|---|---|---|---|
| **commentId** | MUST | MUST | MUST |
| **objectId** | MUST | MUST | MUST |
| **objectType** | MUST | MUST | MUST |
| **supplier** | MUST | MUST | MUST |
| **customer** | MUST | MUST | MUST |
| commentType | SHOULD - if not, consumer can use value `default` | SHOULD - if not, consumer can use value `default` | MAY |
| author | SHOULD - if not, consumer can use sender BPNL from connector | SHOULD - if not, consumer can use sender BPNL from connector | MAY |
| postedAt | SHOULD - if not, consumer can set timestamp of receipt | SHOULD - MUST NOT differ from time of creation | MAY |
| listOfReferenceDates | MAY | MAY | MAY |
| changedAt | MAY | SHOULD - if not consumer can set timestamp of receipt | MAY |
| commentText | SHOULD | SHOULD | MAY |
| requestDelete | MUST NOT | MUST NOT | MUST |

#### UUID generation and handling

UUIDv4 is REQUIRED for exchanging comment data to ensure uniqueness and security. The UUID MUST be generated conforming to [RFC4122][RFC4122] and MUST be treated as unique within the supplier-customer relationship.

#### Data asset structure

The HTTP POST endpoint introduced above MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via a connector conformant to [CX-0018][StandardLibrary]. Therefore, the endpoint MUST be offered as a Data Asset. The latter MUST have a property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmIdBasedComment`. It can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This property SHOULD be used to identify the asset when searching the assets catalog of a partner. Because the asset reflects the contractual relationship between two DCM partners, only one asset with the aforementioned property for one version MUST be visible to the partner at any time to avoid ambiguity.

The API version described in this standard MUST be published in the property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a compatible version with their own, the requester MUST terminate the data transfer.

Each DCM participant MUST ensure that only their business partners have access to the asset by using access and usage policies and respective contract definitions.

An example Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} MUST be substituted with a corresponding value.
>
> Asset definition example for management API v3 (non-normative)

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "{{ ASSET_ID }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:DcmIdBasedComment"
    },
    "description": "Endpoint for providing comments",
    "cx-common:version": "2.0"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ URL-BACKEND-APPLICATION-IDBASEDCOMMENT-ENDPOINT }}",
    "method": "POST",
    "proxyBody": "true",
    "contentType": "application/json"
  }
}
```

#### Error handling

Every API endpoint defined above MUST respond to incoming requests with HTTP status codes as described in [RFC9110][RFC9110]. All of the following HTTP status codes, except for codes `200` and `201`, MUST be interpreted as failures. Therefore, it may be sufficient for a business application to simply check if the status code is `200` or `202` or not. If not, the request failed.

| HTTP Status Code | HTTP Status Message |  Description |
|:-----------------|:--------------------|:-------------|
| 200 | OK | The request has succeeded. The `IdBasedComment` has been successfully processed in the backend system. |
| 201 | Created | The request has succeeded and has led to the creation of a new `IdBasedComment` in the backend system. |
| 400 | Bad request | The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |
| 401 | Unauthorized | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |
| 403 | Forbidden | The `IdBasedComment` in question is not available for the client (e.g. it belongs to a different company). |
| 405 | Method not allowed | The method used to request the data was not POST. |
| 422 | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors, e.g. the JSON payload could not be parsed. |
| 501 | Not Implemented | The `IdBasedComment` is not accepted since the feature is not implemented. |
| 503 | Service Unavailable | The client request has not been completed because it lacks valid authentication credentials for the requested resource. |

If one `IdBasedComment` aspect is provided in one HTTP request, the return codes MUST be used as stated in the table above.

If a list of multiple `IdBasedComment` aspects is provided in one HTTP request, the status code `400` MUST be used if at least one `IdBasedComment` in the list cannot be processed. Applications MAY choose to process valid entries from a list which also contains invalid entries. If a list of multiple `IdBasedComment` aspects is provided in one HTTP request and all of them can be processed successfully, the status code 200 MUST be used.

The return codes `401`, `405`, `422` and `503` in the table above MAY also be applicable to a list of multiple `IdBasedComment` aspects.

#### Validating payload

The following tables are supposed to answer questions regarding what business logic MUST be executed when consuming a `IdBasedComment` which has been formed in a specific way.

The order of rules is indicated by the 'Number' row.

The first rule that matches MUST be executed. All other rules MUST be ignored.

'value' indicates the actual value written in quotation marks and without any specific formatting (e.g. italic).

_Valid value_ indicates that the value is valid according to data model, API and process.

_Invalid value_ indicates that the value is invalid according to data model, API and process.

_Any value_ indicates that the value can by anything, valid or not.

A whitespace or an empty cell indicates that for this specific rule that row is not applicable.

| **Number** | 1 |  |
|---|---|---|
| **Properties** |  |  |
| **Meta Properties** | Any property | _invalid value_ |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 2 |  |
|---|---|---|
| **Properties** | messageHeader.header.senderBpn | Supplier BPNL does not match the sending connectors registered BPNL |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 3 |  |
|---|---|---|
| **Properties** | messageHeader.header.senderBpn | Consumer does not match any Partners BPNL that I am in a relation with |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

| **Number** | 4 |  |
|---|---|---|
| **Properties** | objectId | Does not match a UUID (`WeekBasedMaterialDemand` or `WeekBasedCapacityGroup`) the consumer exchanged with the provider before |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 403 - Forbidden |

| **Number** | 5 |  |
|---|---|---|
| **Properties** | objectType | Matches the identifier of the `WeekBasedMaterialDemand` (`urn:samm:io.catenax.week_based_material_demand`), but the endpoint does not process an `IdBasedComment` linked to a `WeekBasedMaterialDemand` |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 501 - Not Implemented |

| **Number** | 6 |  |
|---|---|---|
| **Properties** | commentId  | _Known value_ |
|  | requestDelete  | `true` |
| Meta Properties | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Delete comment incl. all of its history from consumers application(s) |
|  | Return Code | 200 - OK |

| **Number** | 7 |  |
|---|---|---|
| **Properties** | commentId  | _Known value_ |
|  | changedAt  | More recent than all previously consumed `IdBasedComment` with the same commentId |
| **Meta Properties** | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Overwrite all existing values |
|  | Return Code | 200 - OK |

| **Number** | 8 |  |
|---|---|---|
| **Properties** | commentId  | _Unknown value_ |
| Meta Properties | Any property |  |
|  | All other properties | _Valid value_ |
| **Actions** | Business Logic | Save as new comment with consumed values |
|  | Return Code | 201 - Created |

| **Number** | 9 |  |
|---|---|---|
| **Properties** | commentId  | _Known value_ |
|  | changedAt  | Older than any previously consumed `IdBasedComment` with the same commentId |
| **Meta Properties** | Any property |  |
|  | All other properties | _Any value_ |
| **Actions** | Business Logic | Ignore consumed values |
|  | Return Code | 400 - Bad Request |

### DCM Asset Administration Shell API (AAS API)

Data providers MAY adopt the DCM AAS API. If they choose otherwise, none of the obligations of this section apply.

The `WeekBasedMaterialDemand` contains the demand information which is provided from the customer to the supplier. The supplier maintains a set of Submodels (one for each `WeekBasedMaterialDemand`) and registers them in their Digital Twin Registry. Both conform to the definitions of [CX-0002][StandardLibrary].

The `WeekBasedCapacityGroup` contains the capacity information which is provided from the supplier to the customer. The customer maintains a set of Submodels (one for each `WeekBasedCapacityGroup`) and registers them in their Digital Twin Registry. Both conform to the definitions of [CX-0002][StandardLibrary].

Suppliers MUST be able to host and correctly expose the `WeekBasedMaterialDemand`-Submodel and update the customer-hosted `WeekBasedCapacityGroup`-Submodel.

Customers MUST be able to host and correctly expose the `WeekBasedCapacityGroup`-Submodel and update the supplier-hosted `WeekBasedMaterialDemand`-Submodel.

#### API Specification

##### API Endpoints & Resources

Exchanging Data via the DCM AAS API requires customers and suppliers to both act in the roles of data provider and data consumer. The API is a superset of [CX-0002][StandardLibrary] with the following specializations:

- A supplier MUST host and expose a Submodel `WeekBasedMaterialDemand` via the Submodel-API as defined in [CX-0002][StandardLibrary]
- A customer MUST host and expose a Submodel `WeekBasedCapacityGroup` via the Submodel-API as defined in [CX-0002][StandardLibrary]
- Additionally, suppliers and customers MUST offer the PatchSubmodel-Operation with the content-modifier `$value` on all Submodels as defined in [AAS Pt.2][AAS]
  - A supplier MUST client-side be capable to update the `WeekBasedCapacityGroup`-Submodel hosted by the customer
  - A customer MUST client-side be capable to update the `WeekBasedMaterialDemand`-Submodel hosted by the supplier

##### Data Exchange

Restrictions on the exchanged data can be retrieved from the data models. Additionally, the definitions from the API definitions above apply.

##### UUID generation and handling

UUIDv4 is REQUIRED for exchanging demand and capacity data to ensure uniqueness and security. The UUID MUST be generated conforming to [RFC4122][RFC4122] and MUST be treated as unique within the supplier-customer relationship.

##### Available Data Types

The API MUST use JSON formatted data transmitted over HTTPS.

##### DTR Registration

As mandated by [CX-0002][StandardLibrary], all Data-Providers MUST provide a Digital Twin Registry and use it to link their Submodels to identified assets. Assets in the DTR are identified via `specificAssetIds`.

When registering Submodels with semanticId `WeekBasedMaterialDemand`, the data provider (supplier) MUST reuse the IDs mandated in [CX-0126][StandardLibrary], section 2.3.1.

When registering Submodels with semanticId `WeekBasedCapacityGroup`, the data provider (customer) MUST create a single `specificAssetId` with name `creationEntityId` and a UUIDv4 as value.

All other properties are standardized in [CX-0002][StandardLibrary] or [AAS Pt.2][AAS] respectively.

Example:

```json
{
  "id": "{{id of the AAS}}",
  "idShort": "{{short name of your AAS}}",
  "specificAssetIds": [
    {
      "name": "creationEntityId",
      "value": "{{someUuidV4}}",
      "externalSubjectId": {
        "type": "ExternalReference",
        "keys": [
          {
            "type": "GlobalReference",
            "value": "*"
          }
        ]
      }
    }
  ],
  "submodelDescriptors": [
    {
      "id": "{{someSubmodelId}}",
      "semanticId": {
        "type": "ExternalReference",
        "keys": [
          {
            "type": "GlobalReference",
            "value": "urn:samm:io.catenax.week_based_capacity_group:2.0.0#WeekBasedCapacityGroup"
          }
        ]
      },
      "endpoints": [
        {
          "interface": "SUBMODEL-3.0",
          "protocolInformation": {
            "href": "{{dataplane baseurl extended with the appropriate path ending on /submodel}}",
            "endpointProtocol": "HTTP",
            "endpointProtocolVersion": [
              "1.1"
            ],
            "subprotocol": "DSP",
            "subprotocolBody": "id={{ID of the connector asset the submodel is living behind}};dspEndpoint={{controlPlaneEndpoint}}",
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
      ]
    }
  ]
}
```

##### Registration

Obligations for the Asset Definition of the Digital Twin Registry are adopted from [CX-0002][StandardLibrary].

Obligations for the Asset Definition of a Submodel are adopted from [CX-0002][StandardLibrary]. Of the example below, only the "properties"- section is defined as normative there. Please note that the example below only signifies a single registered Submodel. While bundling several Submodels into a single Asset, there are no normative requirements for Asset properties.

##### Data Asset

There are no normative statements on the section `dataAddress` for the Asset.

```json
{
  "@context": {
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "ctx": "https://w3id.org/catenax/taxonomy#",
    "aas-semantics": "https://admin-shell.io/aas/3/0/HasSemantics/"
  },
  "@id": "{{ID for the Asset}}",
  "properties": {
    "dct:type": {
      "@id": "ctx:Submodel"
    },
    "cx-common:version": "3.0",
    "aas-semantics:semanticId": "{{URN of WeekBasedMaterialDemand or WeekBasedCapacityGroup Submodel}}"
    },
    "dataAddress": {
      "@type": "DataAddress",
      "type": "HttpData",
      "proxyPath": "true",
      "proxyBody": "true",
      "proxyMethod": "true",
      "proxyQueryParams": "true",
      "baseUrl": "{{Submodel endpoint ending before /submodel}}"
    }
}
```

##### Policy Definition

This policy is an example to let a single business partner pass. It could be used as (part of) either an accessPolicy or contractPolicy.

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinition",
  "@id": "{{POLICY-DEFINITION-ID}}",
  "policy": {
    "odrl:permission": [
      {
        "odrl:action": "USE",
        "odrl:constraint": [
          {
            "odrl:leftOperand": "{{BPN attribute in Data Consumer VC}}",
            "odrl:operator": "=",
            "odrl:rightOperand": "{{hard-coded BPN of privileged consumer}}"
          }
        ]
      }
    ],
    "odrl:prohibition": [],
    "odrl:obligation": []
  }
}
```

##### Contract Definition

This example for a contract definition connects the defined policy to the defined asset.

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "ContractDefinition",
  "@id": "contract-definition-id",
  "accessPolicyId": "{{POLICY-DEFINITION-ID}}",
  "contractPolicyId": "{{POLICY-DEFINITION-ID}}",
  "assetsSelector": [
    {
      "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
      "operator": "=",
      "operandRight": "{{ID for the Asset}}"
    }
  ]
}
```

##### Error Handling

Error handling is specified by [CX-0002][StandardLibrary] and [AAS Pt.2][AAS].

[StandardLibrary]: https://catena-x.net/de/standard-library
[RFC4122]: https://www.rfc-editor.org/rfc/rfc4122
[RFC9110]: https://www.rfc-editor.org/rfc/rfc9110
[AAS]: https://www.plattform-i40.de/IP/Redaktion/EN/Downloads/Publikation/Details_of_the_Asset_Administration_Shell_Part2_V1.html
