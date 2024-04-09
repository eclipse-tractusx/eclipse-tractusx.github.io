---
id: development-view
title: Development View
description: 'What do I have to implement?'
sidebar_position: 3
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

This page describes the most important parts for the software implementation of the DCM standards. For the full
technical specification, please refer to the
standard [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library).

## Introduction

This document describes the `MaterialDemand`, `WeekBasedCapacityGroup`, `IdBasedRequestForUpdate` and `IdBasedComment`
semantic models and the API definitions used in the DCM Catena-X network.

## Aspect Models

### Aspect Model "MaterialDemand"

The material demand information MUST be sent from the customer to the supplier according to the API standard described
on this page. The data format described here MUST be followed for the exchange of the material demand information.

The `MaterialDemand` data model MUST be implemented by all participants who wish to participate in the Catena-X DCM use
case as a customer or supplier.

Companies that act as supplier in the Demand and Capacity Management process within Catena-X MUST be able to receive
material demand information.

Companies that act as customer in the Demand and Capacity Management process within Catena-X MUST be able to send
material demand information.

Companies that acts in both roles, MUST therefore be able to receive and send material demand information. It is
RECOMMENDED that participating companies implement both directions of data flows (sending & receiving).

Every data provider of `MaterialDemand` data MUST provide the data conformant to the semantic model specified in this
document.

The unique identifier of the semantic model specified in this document MUST be used by the data provider to define the
semantics of the data being transferred.

Every business application relying on `MaterialDemand` data MUST be able to consume data conformant to the semantic
model specified in this document.

#### Sample Data

```json
{
  "unitOfMeasureIsOmitted": false,
  "demandRate": {
    "demandRateCode": "WKS"
  },
  "unitOfMeasure": "unit:piece",
  "materialDescriptionCustomer": "Spark Plug",
  "materialGlobalAssetId": "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df",
  "materialDemandId": "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "materialNumberSupplier": "MNR-8101-ID146955.001",
  "supplier": "{{CATENAX-SUPPLIER-BPNL}}",
  "changedAt": "2023-11-05T08:15:30.123-05:00",
  "demandSeries": [
    {
      "expectedSupplierLocation": "{{CATENAX-SUPPLIER-BPNS}}",
      "demands": [
        {
          "demand": 1000,
          "pointInTime": "2023-10-09"
        }
      ],
      "customerLocation": "{{CATENAX-CUSTOMER-BPNS}}",
      "demandCategory": {
        "demandCategoryCode": "0001"
      }
    }
  ],
  "materialNumberCustomer": "MNR-7307-AU340474.002",
  "customer": "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.material_demand:1.0.0
```

This identifier MUST be used by the data provider to define the semantics of the data being transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating additional file formats
and serializations.

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.material_demand/1.0.0/MaterialDemand.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used for generation of other file
formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel template or a HTML documentation.

### Aspect Model "WeekBasedCapacityGroup"

The capacity group information MUST be sent from the supplier to the customer according to the API standard described on
this page. The data format described here MUST be followed for the exchange of the capacity group information.

The `WeekBasedCapacityGroup` data model MUST be implemented by all participants who wish to participate in the Catena-X
DCM use case as a customer or supplier.

Companies, who participate in the DCM use case as a supplier, MUST be able to send capacity group information.

Companies, who participate in the DCM use case as a customer, MUST be able to receive capacity group information.

Companies who participate in the DCM use case with both roles therefore MUST be able to receive and send capacity group
information. It is RECOMMENDED that participating companies implement both directions of data flows (sending &
receiving).

Every data provider of `WeekBasedCapacityGroup` data MUST provide the data conformant to the semantic model specified in
this document.

The unique identifier of the semantic model specified in this document MUST be used by the data provider to define the
semantics of the data being transferred.

Every business application relying on `WeekBasedCapacityGroup` data MUST be able to consume data conformant to the
semantic model specified in this document.

#### Sample Data

```json
{
  "unitOfMeasureIsOmitted": false,
  "unitOfMeasure": "unit:piece",
  "linkedDemandSeries": [
    {
      "loadFactor": 3.5,
      "materialNumberCustomer": "MNR-7307-AU340474.002",
      "materialNumberSupplier": "MNR-8101-ID146955.001",
      "customerLocation": "{{CATENAX-CUSTOMER-BPNS}}",
      "demandCategory": {
        "demandCategoryCode": "0001"
      }
    }
  ],
  "supplier": "{{CATENAX-SUPPLIER-BPNL}}",
  "linkedCapacityGroups": [
    "be4d8470-2de6-43d2-b5f8-2e5d3eebf3fd"
  ],
  "name": "Spark Plugs on drilling machine for car model XYZ",
  "supplierLocations": [
    "{{CATENAX-SUPPLIER-BPNS}}"
  ],
  "capacities": [
    {
      "pointInTime": "2022-08-01",
      "actualCapacity": 1000,
      "maximumCapacity": 2000,
      "deltaProductionResult": 400
    }
  ],
  "changedAt": "2023-03-10T12:27:11.320Z",
  "capacityGroupId": "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "customer": "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.week_based_capacity_group:2.0.0
```

This identifier MUST be used by the data provider to define the semantics of the data being transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating additional file formats
and serializations.

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.week_based_capacity_group/2.0.0/WeekBasedCapacityGroup.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used for generation of other file
formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel template or a HTML documentation.

### Aspect Model "IdBasedRequestForUpdate"

A request for update can be sent from the supplier to the customer or vice versa for one or more dedicated entities
according to the API standard described on this page.

The data format described here MUST be followed for the receipt of the `IdBasedRequestForUpdate`.

The `IdBasedRequestForUpdate` data model MUST be implemented by all participants who wish to participate in the Catena-X
DCM use case as a customer or supplier to be able to receive such a request. Being able to send
an `IdBasedRequestForUpdate` is OPTIONAL. It is RECOMMENDED that companies implement both ways of communication.

Every sender of an `IdBasedRequestForUpdate` MUST provide the data conformant to the semantic model specified in this
document.

The unique identifier of the semantic model specified in this document MUST be used by the requester to define the
semantics of the data being transferred.

Every business application relying on the `IdBasedRequestForUpdate` data MUST be able to consume data conformant to the
semantic model specified in this document.

#### Sample Data

```json
{
  "materialDemand": [
    {
      "materialDemandId": "0157ba42-d2a8-4e28-8565-7b07830c3456",
      "changedAt": "2023-03-10T12:27:11.320Z"
    }
  ],
  "weekBasedCapacityGroup": [
    {
      "capacityGroupId": "0157ba42-d2a8-4e28-8565-7b07830c1110",
      "changedAt": "2023-03-10T12:27:11.320Z"
    }
  ]
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.id_based_request_for_update:2.0.0
```

This identifier MUST be used by the data provider to define the semantics of the data being transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating additional file formats
and serializations.

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.id_based_request_for_update/2.0.0/IdBasedRequestForUpdate.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used for generation of other file
formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel template or a HTML documentation.

### Aspect Model "IdBasedComment"

An `IdBasedComment` that refers to a `WeekBasedCapacityGroup`, it's weekly capacities, a `MaterialDemand` or it's weekly
demand series can be sent from the supplier to the customer or vice versa according to the API standard described on
this page.

The data format described here MUST be followed for the exchange of the `IdBasedComment` information.

The `IdBasedComment` data model MUST be implemented by all participants in the Catena-X DCM use case.

Every data provider of `IdBasedComment` data MUST provide the data conformant to the semantic model specified in this
document. Every data consumer MUST be able to consume `IdBasedComment` data which is conformant to the semantic model
specified.

The unique identifier of the semantic model specified in this document MUST be used by the data provider to define the
semantics of the data being transferred.

#### Sample Data

```json
{
  "postedAt": "2023-03-10T12:27:11.320Z",
  "listOfReferenceDates": [
    "2023-11-05"
  ],
  "author": "someone@company.com",
  "supplier": "{{CATENAX-SUPPLIER-BPNL}}",
  "commentType": "information",
  "commentId": "f5c151e4-30b5-4456-94fd-2a7b559b6121",
  "changedAt": "2023-03-10T12:27:11.320Z",
  "commentText": "Hello, this is a comment!",
  "requestDelete": true,
  "objectId": "dfeb1334-497e-4dab-97c1-4e6f4e1c0320",
  "objectType": "urn:samm:io.catenax.week_based_capacity_group",
  "customer": "{{CATENAX-CUSTOMER-BPNL}}"
}
```

The semantic model has the unique identifier

```text
urn:samm:io.catenax.id_based_comment:1.0.0
```

This identifier MUST be used by the data provider to define the semantics of the data being transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating additional file formats
and serializations.

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.id_based_comment/1.0.0/IdBasedComment.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework is used for generation of other file
formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel template or a HTML documentation.

## Application Programming Interfaces

### Header

In order to exchange data with a DCM partner, the following structure of a POST request payload MUST be adhered to.

```json
{
  "messageHeader": <messageHeaderObject>,
  "content": {
    "informationObject": [
      <informationObject>,
      <informationObject>
    ]
  }
}
```

This structure guarantees a separation of header and content information and allows a collection of multiple information
objects in the payload. `informationObject` can be either a `MaterialDemand`, `WeekBasedCapacityGroup`, `IdBasedComment`
or `IdBasedRequestForUpdate`. The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for
generating additional file formats and serializations. The rdf turtle file for the `messageHeaderObject` is defined in a
centralized shared aspect model which can be found under the following link:

```text
https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.shared.message_header/1.0.0/MessageHeaderAspect.ttl
```

The entities and characteristics of the rdf turtle itself contain the descriptions for the usage of the message header.

### Catena-X Membership Verification

Catena-X Membership MUST be verified in accordance with
standard [CX-0016 Company Attribute Verification](https://catena-x.net/de/standard-library) Company Attribute
Verification before any data is allowed to be exchanged via any of the following APIs

### MaterialDemand API

The MaterialDemand contains the material demand information which is send from the customer to the supplier.

All participants participating in Catena-X DCM in the role of a customer MUST be able to send the `MaterialDemand`. All
participants participating in Catena-X DCM in the role of a supplier MUST be able to receive and process
the `MaterialDemand`.

#### Data Exchange

To support the exchange of `MaterialDemand` data, a business application MUST define a single endpoint supporting the
HTTP POST request method as described in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110). The structure of the
endpoint MAY be freely chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined on
this page.

The `MaterialDemand` data MUST be sent from the customer to the supplier using an HTTP POST request. The data format
described here MUST be followed for the exchange of the material demand information.

Multiple `MaterialDemand` aspects MAY be sent in one transfer as a JSON list. If only one `MaterialDemand` aspect is
transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The `MaterialDemand` endpoint MUST be implemented by all participants who wish to participate in the Catena-X DCM use
case as a supplier. Customers MUST be able to send `MaterialDemand` objects to their suppliers.

The data payload itself MUST be a valid JSON string.

All attributes marked as mandatory in the aspect model standard MUST be included in the dataset. Attributes marked as '
optional' MAY be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions of the respective aspect model and
the definitions on this page.

While some attributes are technically a string, not any string is valid. For example, `expectedSupplierLocation` MUST be
formatted as a BPNS.

For the data exchange between demand and capacity management applications the `demandRateCode` MUST be set to 'WKS' (=
weeks) in order to indicate, that the given granularity for the demands is on the level calendar weeks.

The `pointInTime` property represents the calendar week as a date and MUST be set to a monday of the week for that
specific demand. The date format MUST be in accordance with ISO8601 and MUST be in the format YYYY-MM-DD (for example
2023-02-13) without a time zone.

The attributes `demandCategory` and `unitOfMeasure` MUST be set to one of the defined values as defined
in [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library). If the customer
explicitly does not want to send a unit of measure to the supplier, then the `unitOfMeasure` property can be omitted in
the payload and the `unitOfMeasureIsOmitted` flag value MUST be set to `true`.

The data series in the `MaterialDemand` SHOULD start already from week _n+2_, where n represents the current week.

The demand for the current week (_n=0_) and the next week (_n=1_) MAY be included in the dataset. The `MaterialDemand`
MUST include at least one week other than the current or the next week (meaning it may not be empty). Every week MUST
NOT be included multiple times in the same `MaterialDemand`.

If the demand for one of the weeks changes, the whole dataset MUST be sent to the supplier; sending the changes only (
delta update / incremental update) is not possible. By this procedure, inconsistent or incomplete data sets are avoided.
One data transfer MUST contain at least one `MaterialDemand` data set.

For the combination of the attributes `supplier`, `customer` and `materialNumberCustomer` in the
object `MaterialDemand`, there MUST NOT be more than one `MaterialDemand` object in existence. This means that the
customer needs to collect all demands for all factories and send them aggregated as one `MaterialDemand` to the
supplier.

If the demand in a certain week has the value `0`, it MUST be explicitly included as such in the `MaterialDemand`,
meaning the week cannot be left out (as there is a difference between `null` and `0`). Weeks with an unknown demand (
value `null`) SHOULD be left out.

#### UUID generation and handling

When exchanging demand data, the usage of UUIDv4 is required in order to reduce the probability of collision as well as
to eliminate certain attack vectors. For technical purposes the UUIDv4 MUST be treated as unique within the
supplier-customer relationship. For the combination of attributes `supplier`, `customer` and `materialNumberCustomer` in
the object `MaterialDemand` there MUST be exactly one unique UUIDv4.

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via
an EDC communication. Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a
property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmMaterialDemand`. It can be
abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This
property SHOULD be used to identify the asset when searching the assets catalog of a supplier. Because the asset
reflects the contractual relationship between a supplier and its customers, only one asset with the aforementioned
property for one version MUST be visible to the customer at any time to avoid ambiguity.

The API version described in this standard document MUST be published in the in the
property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST
be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD
choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a
compatible version with their own, the requester MUST terminate the data transfer.

Each supplier MUST ensure that only their customers have access to the asset by using access and usage policies and
respective contract definitions.

An example EDC Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.
>
> // Asset definition example for EDC management API v3 (non-normative)

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
      "@id": "cx-taxo:DcmMaterialDemand"
    },
    "description": "Endpoint for provisioning of material demands",
    "cx-common:version": "2.0"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ URL-BACKEND-APPLICATION-MATERIALDEMAND-ENDPOINT }}",
    "method": "POST",
    "proxyBody": "true",
    "contentType": "application/json"
  }
}
```

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to
the [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library) standard.

### WeekBasedCapacityGroup API

The `WeekBasedCapacityGroup` contains the capacity group information which is send from the supplier to the customer.

All participants participating in Catena-X DCM in the role of a supplier MUST be able to send
the `WeekBasedCapacityGroup`. All participants participating in Catena-X DCM in the role of a customer MUST be able to
receive and process the `WeekBasedCapacityGroup`.

#### Data Exchange

To support the exchange of `WeekBasedCapacityGroup` data, a business application MUST define a single endpoint
supporting the HTTP POST request method as described in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110). The structure
of the endpoint MAY be freely chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined
on this page.

The `WeekBasedCapacityGroup` data MUST be sent from the supplier to the customer using an HTTP POST request. The data
format described here MUST be followed for the exchange of the capacity group information.

Multiple `WeekBasedCapacityGroup` aspects MAY be sent in one transfer as a JSON list as described on this page. If only
one `WeekBasedCapacityGroup` aspect is transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The `WeekBasedCapacityGroup` endpoint MUST be implemented by all participants who wish to participate in the Catena-X
DCM use case as a customer. Suppliers MUST be able to send `WeekBasedCapacityGroup` objects to their customers.

The data payload itself MUST be a valid JSON string.

All attributes marked as mandatory in the aspect model standard MUST be included in the dataset. Attribute marked as '
optional' MAY be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions of the respective aspect model and
the definitions in [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library). For
example, an exact definition of the different capacities is provided there and needs to be observed.

While some attributes are technically a string, not any string is valid. For example, `supplier` MUST be formatted as a
BPNL.

The `pointInTime` property represents the calendar week of a capacities series as a date and MUST be set to a monday of
the week for that specific capacity. The date format MUST be in accordance with ISO8601 and MUST be in the format
YYYY-MM-DD (for example 2023-02-13) without a time zone.

The attributes `demandCategory` and `unitOfMeasure` MUST be set to one of the defined values as defined on this page. If
the supplier explicitly does not want to send a unit of measure to the customer, then the `unitOfMeasure` property can
be omitted in the payload and the `unitOfMeasureIsOmitted` flag value MUST be set to `true`.

The capacities for the current week (_n=0_) and the next week (_n=1_) MAY be included in the dataset.
The `WeekBasedCapacityGroup` MUST include at least one week other than the current or the next week (meaning it may not
be empty). Every week MUST NOT be included multiple times in the same `WeekBasedCapacityGroup`.

If the capacity for one of the weeks changes, the whole dataset MUST be sent to the customer, sending the changes only (
delta update / incremental update) is NOT possible. By this procedure, inconsistent or incomplete data sets are avoided.
One data transfer MUST contain at least one `WeekBasedCapacityGroup` data set.

Additional business-process related rules are specified
in [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library), these MUST be
followed as well. For example, the process defines a capacity and how it is to be interpreted or that a demand must be
consistent with other exchanged information such as call-offs. All `WeekBasedCapacityGroup` objects MUST only use a
mutually agreed unit of measure (as defined
in [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library)).

The property `linkedDemandSeries` is used to indicate to which MaterialDemand object a `WeekBasedCapacityGroup` object
refers to. More specifically, the linkedDemandSeries refers to a demand for a
specific `demandCategory` / `customerLocation` / `materialNumberCustomer` combination.

One specific combination of `demandCategory` / `customerLocation` / `materialNumberCustomer` MAY be referred to in
multiple `WeekBasedCapacityGroup` objects. Therefore, one `materialNumberCustomer` MAY be contained
in `linkedDemandSeries` of several different `WeekBasedCapacityGroup` objects.

The order of the entries listed in the `linkedDemandSeries` of a `WeekBasedCapacityGroup` is arbitrary and MUST be
treated as such.

#### UUID generation and handling

When exchanging capacity data, the usage of UUIDv4 is required in order to reduce the probability of collision as well
as to eliminate certain attack vectors. For technical purposes the UUIDv4 MUST be treated as unique within the
supplier-customer relationship.

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via
an EDC communication. Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a
property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmWeekBasedCapacityGroup`. It
can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This
property SHOULD be used to identify the asset when searching the assets catalog of a customer. Because the asset
reflects the contractual relationship between a customer and its suppliers, only one asset with the aforementioned
property for one version MUST be visible to the supplier at any time to avoid ambiguity.

The API version described in this standard document MUST be published in the
property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST
be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD
choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a
compatible version with their own, the requester MUST terminate the data transfer.

Each customer MUST ensure that only their suppliers have access to the asset by using access and usage policies and
respective contract definitions.

An example EDC Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.
>
> // Asset definition example for EDC management API v3 (non-normative)

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
    "description": "Endpoint for provisioning of Week Based Capacity Groups",
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

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to
the [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library) standard.

### RequestForUpdate API

The Request for Update (RfU) allows either supplier or customer to request updates of some or even all `MaterialDemand`
or `WeekBasedCapacityGroup` objects. For example, RfU could be used in case of updating demands as well as capacity
values in the requesting application.

Customer and supplier MUST be capable of receiving and correctly responding to a RfU. Being able send a RfU is
RECOMMENDED.

The correct response to a RfU entails:

1. Answering with the appropriate HTTP status code
2. If that status code is 200 OK: Sending the requested material demands and capacity groups via `MaterialDemand` API
   or `WeekBasedCapacityGroup` API respectively.

It is RECOMMENDED that this functionality SHOULD NOT be an end-user functionality which can be executed in an user
interface.

#### Data Exchange

To support RequestForUpdate, a business application MUST define a single endpoint supporting the HTTP POST request
method as described in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110). The structure of the endpoint MAY be freely
chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined on this page.

The RequestForUpdate data MUST be sent from the customer to the supplier or vice versa using an HTTP POST request. The
data format described here MUST be followed in order to successfully facilitate a RfU.

An empty RfU payload requests all data within the specific customer-supplier relationship.

A RfU payload MAY specify that only MaterialDemands OR WeekBasedCapacityGroups are requested within the specific
customer-supplier relationship.

A RfU payload MAY specify that only certain data objects, identified by their respective UUID, are requested within the
specific customer-supplier relationship.

A RfU payload MAY specify that only certain data objects, that have been updated, identified by their respective UUID
and ChangedAt value, are requested within the specific customer-supplier relationship.

The following example payloads are intended to illustrate the different possible payloads of an RequestForUpdate:

RfU: Send Everything

```json
{
}
```

RfU: Send only Material Demands

```json
{
  "materialDemand": [
  ]
}
```

RfU: Send only Capacity Groups

```json
{
  "weekBasedCapacityGroups": [
  ]
}
```

RfU: Send only certain Objects

```json
{
  "materialDemand": [
    {
      "materialDemandId": "278e333d-f06b-4b59-8e95-22862f69807f"
    },
    {
      "materialDemandId": "46adfa5d-36b7-4a9b-9ac6-508dac500dd2"
    }
  ]
},
{
"weekBasedCapacityGroup": [
{
"capacityGroupId": "a2fc69ac-ede7-48d3-bee5-04de665d49f0"},
{
"capacityGroupId": "34238729-990a-4b61-b0c6-336da7b71675"}
]
}
```

RfU: Send only certain Objects and only if my version is not up to date

```json
{
  "materialDemand": [
    {
      "materialDemandId": "278e333d-f06b-4b59-8e95-22862f69807f"
    },
    {
      "materialDemandId": "46adfa5d-36b7-4a9b-9ac6-508dac500dd2"
    }
  ]
},
{
"weekBasedCapacityGroup": [
{
"capacityGroupId": "a2fc69ac-ede7-48d3-bee5-04de665d49f0"},
{
"capacityGroupId": "34238729-990a-4b61-b0c6-336da7b71675",
"changedAt": "2023-03-08T11:44:27.701+01:00"
}
]
}
```

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via
an EDC communication. Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a
property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmIdBasedRequestForUpdate`. It
can be abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This
property SHOULD be used to identify the asset when searching the assets catalog of a partner. Because the asset reflects
the contractual relationship between two DCM partners, only one asset with the aforementioned property for one version
MUST be visible to the partner at any time to avoid ambiguity.

The API version described in this standard document MUST be published in the
property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST
be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD
choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a
compatible version with their own, the requester MUST terminate the data transfer.

Each DCM participant MUST ensure that only their business partners have access to the asset by using access and usage
policies and respective contract definitions.

An example EDC Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.
>
> // Asset definition example for EDC management API v3 (non-normative)

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

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to
the [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library) standard.

### IdBasedComment API

The `IdBasedComment` contains the information for a comment referencing the UUID of an object and can be sent from the
supplier to the customer and vice versa. The `IdBasedComment` MUST reference an object UUID of a MaterialDemand or a
WeekBasedCapacityGroup which is exchanged between both business partners.

All participants participating in Catena-X DCM in the role of a supplier or a customer MUST be able to send and receive
the `IdBasedComment`.

#### Data Exchange

To support the exchange of `IdBasedComment` data, a business application MUST define a single endpoint supporting the
HTTP POST request method as described in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110). The structure of the
endpoint MAY be freely chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined in on
this page.

The applications of the customer and supplier MUST be able to send and receive `IdBasedComment` data using an HTTP POST
request. The data format described on this page MUST be followed for the exchange of the comment information.

Multiple `IdBasedComment` aspects MAY be sent in one transfer as a JSON list. If only one `IdBasedComment` aspect is
transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The `IdBasedComment` endpoint MUST be implemented by all participants who wish to participate in the Catena-X DCM use
case as a customer or supplier.

The data payload itself MUST be a valid JSON string.

All attributes marked as mandatory in the respective aspect model standard MUST be included in the dataset. Attributes
marked as 'optional' MAY be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions of the respective aspect model and
the definitions in [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library).

While some attributes are technically a string, not any string is valid. For example, `objectType` MUST be as a Catena-X
aspect model unique identifier (defined on this page) without a version. For reusability reasons of the aspect model
there are no enum values defined in the characteristic of this property.

The `author` MUST either be a valid email address of the sending user of the comment or a BPNL of the sending company in
case the sending user wants to stay anonymous.

The comment MUST be sent with reference to an `objectId`, which MUST be either a `WeekBasedCapacityGroup` UUID or
a `MaterialDemand` UUID.

The `listOfReferenceDates` property MAY contain all calendar weeks the sending user wants to refer to. The calendar
weeks MUST be set to a monday of the week the commented demand or capacity belongs to without a time zone. The date
format MUST be in accordance with ISO8601 and MUST be in the format YYYY-MM-DD (for example 2023-02-13).

In case the sending user wants to delete a comment in a Catena-X partners system, the sending application MUST send the
value `true` in the property `requestDelete`. As a consequence of a `true` value in the property `requestDelete`, the
receiving application MUST delete the comment with the respective UUID including all its history following the GDPR. A
comment deleted once MUST never be sent by the application or be stored by the receiving application again. When
deleting a comment the sending application MAY send the mandatory properties plus the `requestDelete` property only.

For deletion of a comment the receiving application MAY only check if the `commentID` exists in a business partner
relation between customer and supplier, in case `objectId` and or `objectType` do not match the data currently available
at the receiver side.

The sending application SHOULD remember the `IdBasedComment` UUIDs created by itself, so that no other app can delete
comments unauthorized.

An `IdBasedComment` SHOULD always be sent with as much information as is available, so that the receiving application
can better decide how to process the comment.

For different actions that MUST be executed on a comment, there are conditional mandatory properties that the data model
cannot map.

Depending on the action that must be executed on a given comment, by both receiving and sending application, the sending
application MUST contain the following properties in the payload (properties in bold are defined as non-optional in the
data model):

| Property \ Action    | create                                                 | update                                                 | delete |
|----------------------|--------------------------------------------------------|--------------------------------------------------------|--------|
| **commentId**        | MUST                                                   | MUST                                                   | MUST   |
| **objectId**         | MUST                                                   | MUST                                                   | MUST   |
| **objectType**       | MUST                                                   | MUST                                                   | MUST   |
| **supplier**         | MUST                                                   | MUST                                                   | MUST   |
| **customer**         | MUST                                                   | MUST                                                   | MUST   |
| commentType          | SHOULD - if not, receiver can set value 'default'      | SHOULD - if not, receiver can set value 'default'      | MAY    |
| author               | SHOULD - if not, receiver can set sender BPNL from EDC | SHOULD - if not, receiver can set sender BPNL from EDC | MAY    |
| postedAt             | SHOULD - if not, receiver can set timestamp of receipt | SHOULD - MUST NOT differ from time of creation         | MAY    |
| listOfReferenceDates | MAY                                                    | MAY                                                    | MAY    |
| changedAt            | MAY                                                    | SHOULD - if not receiver can set timestamp of receipt  | MAY    |
| commentText          | SHOULD                                                 | SHOULD                                                 | MAY    |
| requestDelete        | MUST NOT                                               | MUST NOT                                               | MUST   |

#### UUID generation and handling

When exchanging comment data, the usage of UUIDv4 is required in order to reduce the probability of collision as well as
to eliminate certain attack vectors. For technical purposes the UUIDv4 MUST be treated as unique within the
supplier-customer relationship.

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via
an EDC communication. Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a
property `https://purl.org/dc/terms/type` with the ID `https://w3id.org/catenax/taxonomy#DcmIdBasedComment`. It can be
abbreviated if the namespaces of key and value are part of the json-ld @context object (see example below). This
property SHOULD be used to identify the asset when searching the assets catalog of a partner. Because the asset reflects
the contractual relationship between two DCM partners, only one asset with the aforementioned property for one version
MUST be visible to the partner at any time to avoid ambiguity.

The API version described in this standard document MUST be published in the
property `https://w3id.org/catenax/ontology/common#version` as version 2.0 in the asset. The requester of an asset MUST
be able to handle multiple assets for this endpoint, being differentiated only by the version. The requester SHOULD
choose the asset with the highest compatible version number implemented by themselves. If the requester cannot find a
compatible version with their own, the requester MUST terminate the data transfer.

Each DCM participant MUST ensure that only their business partners have access to the asset by using access and usage
policies and respective contract definitions.

An example EDC Data Asset definition is shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.
>
> // Asset definition example for EDC management API v3 (non-normative)

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
    "description": "Endpoint for receiving comments",
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

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to
the [CX-0128 Demand and Capacity Management Data Exchange](https://catena-x.net/de/standard-library) standard.

### DCM Asset Administration Shell API (AAS API)

Data Providers MAY adopt the DCM AAS API. If they choose otherwise, none of the obligations of this section apply.

The `MaterialDemand` contains the demand information which is sent from the customer to the supplier. The supplier
maintains a set of Submodels (one for each `MaterialDemand`) and registers them in their Digital Twin Registry. Both
follow the definitions of [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library).

The `WeekBasedCapacityGroup` contains the capacity information which is sent from the supplier to the customer. The
customer maintains a set of Submodels (one for each `WeekBasedCapacityGroup`) and registers them in their Digital Twin
Registry. Both follow the definitions of [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library).

All Catena-X DCM participating companies, acting as a supplier, MUST be able to host and correctly expose
the `MaterialDemand`-Submodel and update the customer-hosted `WeekBasedCapacityGroup`-Submodel.

All Catena-X DCM participating companies, acting as a customer, MUST be able to host and correctly expose
the `WeekBasedCapacityGroup`-Submodel and update the supplier-hosted `MaterialDemand`-Submodel.

If a company acts both as a supplier and a customer they MUST be able to host and update both Submodels.

#### API Specification

##### API Endpoints & Resources

Exchanging Data via the DCM AAS API requires customers and suppliers to both act in the roles of data provider and data
consumer. The API is a superset of [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library) with
the following specializations:

- A supplier MUST host and expose a Submodel `MaterialDemand` via the Submodel-API as defined
  in [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library).
- A customer MUST host and expose a Submodel `WeekBasedCapacityGroup` via the Submodel-API as defined
  in [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library).
- Additionally, suppliers and customers MUST offer the PatchSubmodel-Operation with the content-modifier `$value` on all
  Submodels as defined
  in [AAS Pt.2](https://www.plattform-i40.de/IP/Redaktion/EN/Downloads/Publikation/Details_of_the_Asset_Administration_Shell_Part2_V1.html).
  - A supplier MUST client-side be capable to update the `WeekBasedCapacityGroup`-Submodel hosted by the customer.
  - A customer MUST client-side be capable to update the `MaterialDemand`-Submodel hosted by the supplier.

##### Data Exchange

Restrictions on the exchanged data can be retrieved from the data models. Additionally, the definitions on this page
apply.

##### UUID generation and handling

When exchanging demand and capacity data, the usage of UUIDv4 is required in order to reduce the probability of
collision as well as to eliminate certain attack vectors. For technical purposes the UUIDv4 MUST be treated as unique
within the supplier-customer relationship. For the combination of attributes: supplier, customer and
materialNumberCustomer in the object `MaterialDemand` there MUST be exactly one unique UUIDv4.

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

##### Available Data Types

The API MUST use JSON as the payload transported via HTTPS.

##### DTR Registration

As mandated by [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library), all Data-Providers must
provide a Digital Twin Registry and use it to link their Submodels to identified assets. Assets in the DTR are
identified via `specificAssetIds`.

When registering Submodels with semanticId `MaterialDemand`, the data provider (supplier) MUST reuse the IDs mandated
in [CX-0126 Industry Core: Part Type](https://catena-x.net/de/standard-library), section 2.3.1.

When registering Submodels with semanticId `WeekBasedCapacityGroup`, the data provider (customer) MUST create a
single `specificAssetId` with key `creationEntityId` and value a UUIDv4 as value.

All other attributes are standardized in [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library)
or [AAS Pt.2](https://www.plattform-i40.de/IP/Redaktion/EN/Downloads/Publikation/Details_of_the_Asset_Administration_Shell_Part2_V1.html)
respectively.

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
            "subprotocolBody": "id={{ID of the edc asset the submodel is living behind}};dspEndpoint={{controlPlaneEndpoint}}",
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

##### EDC Registration

Obligations for the EDC Asset Definition of the Digital Twin Registry are adopted
from [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library).

Obligations for the EDC Asset Definition of a Submodel are adopted
from [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library). Of the example below, only the "
properties"- section is defined as normative there. Please note that the example below only signifies a single
registered Submodel. While bundling several Submodels into a single EDC Asset, there are no normative requirements for
EDC Asset properties.

##### EDC Data Asset

There are no normative statements on the section dataAddress for the EDC Asset.

```json
{
  "@context": {
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "ctx": "https://w3id.org/catenax/taxonomy#",
    "aas-semantics": "https://admin-shell.io/aas/3/0/HasSemantics/"
  },
  "@id": "{{ID for the EDC Asset}}",
  "properties": {
    "dct:type": {
      "@id": "ctx:Submodel"
    },
    "cx-common:version": "3.0",
    "aas-semantics:semanticId": "{{URN of MaterialDemand or WeekBasedCapacityGroup Submodel}}"
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

##### EDC Policy Definition

This policy is an example to let a single business partner pass. It could be used as (part of) either a accessPolicy or
contractPolicy.

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

##### EDC Contract Definition

This example for an EDC contract definition connects the defined policy to the defined asset.

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
      "operandRight": "{{ID for the EDC Asset}}"
    }
  ]
}
```

##### Error Handling

Error Handling is specified by [CX-0002 Digital Twins in Catena-X](https://catena-x.net/de/standard-library)
and [AAS Pt.2](https://www.plattform-i40.de/IP/Redaktion/EN/Downloads/Publikation/Details_of_the_Asset_Administration_Shell_Part2_V1.html).
