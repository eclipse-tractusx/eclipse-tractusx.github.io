---
id: development-view
title: Development View
description: 'What do I have to implement?'
sidebar_position: 3
---

![DCM kit banner](@site/static/img/DCMKitLogoIcon-min.png)

## DCM Development View

This page describes the most important parts for the software implementation of the DCM standards. For the full technical specification, please refer to the standards [CX-0047 DCM Data Model Material Demand & Capacity Group](https://catena-x.net/de/standard-library) and [CX-0048 DCM API Material Demand & Capacity Group](https://catena-x.net/de/standard-library).

## Introduction

This document describes the `WeekBasedMaterialDemand` and `WeekBasedCapacityGroup` semantic models and the 
API definitions used in the DCM Catena-X network.

The `WeekBasedMaterialDemand` object will be send by customers to their suppliers in order to
communicate how many parts they need in which period of time. The customers of materials therefore
need to be able to create `WeekBasedMaterialDemand` objects and the suppliers need to be able to
interpret them. As most suppliers have their own suppliers, who produce materials for them, most
suppliers are therefore acting as customers as well and need to be able to also create
`WeekBasedMaterialDemand` objects on for sending them to their suppliers.

The `WeekBasedCapacityGroup` object is sent by the suppliers to their customers to communicate which
materials are bundled together, representing a common bottleneck. And what the capacity for these
materials is, considering their common bottleneck.This information is represented as weekly buckets
within the WeekBasedCapacityGroup. Therefore, all companies, that supply materials to other
companies, need to be able to create `WeekBasedCapacityGroup` objects in a consistent and
standardized structure and send them to their customers. The customers need to be able to receive
and interpret the `WeekBasedCapacityGroup` information.

## ASPECT MODEL "WeekBasedMaterialDemand"

The material demand information MUST be sent from the customer to the supplier according to the [CX-0048 DCM API Material Demand & Capacity Group](https://catena-x.net/de/standard-library) standard. The data format described here MUST be followed for the exchange of the `WeekBasedMaterialDemand` information.

The `WeekBasedMaterialDemand` data model MUST be implemented by all participants who wish to
participate in the Catena-X DCM network as a customer or supplier.

Companies, who participate in the Catena-X Network as a supplier, MUST be able to receive material
demand information and MUST be able to send capacity group information.

Companies, who participate in the Catena-X Network as a customer, MUST be able to send material
demand information and MUST be able to receive capacity group information.

Companies who participate in the Catena-X Network with both roles therefore MUST be able to receive
and send both, material demand as well as capacity group information. It is recommended that
companies implement both standards.

Every data provider of `WeekBasedMaterialDemand` data MUST provide the data conformant to the
semantic model specified in this document.

The unique identifier of the semantic model specified in this document MUST be used by the data
provider to define the semantics of the data being transferred.

Every certified business application relying on `WeekBasedMaterialDemand` data MUST be able to
consume data conformant to the semantic model specified in this document.

Data consumers and data provider MUST comply with the license of the semantic model.

In the Catena-X data space `WeekBasedMaterialDemand` data MUST be requested and exchanged via
Eclipse Dataspace Connector (EDC) conformant to [CX-0018](https://catena-x.net/de/standard-library) and [CX-0002](https://catena-x.net/de/standard-library).

The characteristics BPNL and BPNS MUST be used according to the standard [CX-0010](https://catena-x.net/de/standard-library).

### Sample Data

```json
{
  "unitOfMeasure": "GRM",
  "materialDescriptionCustomer": "Spark Plug",
  "materialDemandId": "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "materialNumberSupplier": "MNR-8101-ID146955.001",
  "supplier": "BPNL6666666666YY",
  "changedAt": "2023-03-10T12:27:11.320Z",
  "demandSeries": [
    {
      "expectedSupplierLocation": "BPNS8888888888XX",
      "demands": [
        {
          "demand": 1,
          "calendarWeek": "2022-08-01"
        }
      ],
      "customerLocation": "BPNS8888888888XX",
      "demandCategory": {
        "demandCategoryCode": "0001"
      }
    }
  ],
  "materialNumberCustomer": "MNR-7307-AU340474.002",
  "customer": "BPNL8888888888XX"
}
```

The semantic model has the unique identifier
```text
  urn:bamm:io.catenax.week_based_material_demand:1.0.0
```
This identifier MUST be used by the data provider to define the semantics of the data being
transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating
additional file formats and serializations.

```text
  https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.week_based_material_demand/1.0.0/WeekBasedMaterialDemand.ttl
```

The open source command line tool of the Eclipse Semantic Modeling Framework  is used for generation
of other file formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel
Template or a HTML documentation.

## ASPECT MODEL "WeekBasedCapacityGroup"

The capacity group information MUST be sent from the supplier to the customer according to the
[CX-0048](https://catena-x.net/de/standard-library) standard. The data format described here MUST be followed for the exchange of the capacity group information.

The capacity group data model MUST be implemented by all participants who wish to participate in the
Catena-X DCM network as a customer or supplier.

Companies, who participate in the Catena-X Network as a supplier, MUST be able to receive material
demand information and MUST be able to send capacity group information.

Companies, who participate in the Catena-X Network as a customer, MUST be able to send material
demand information and MUST be able to receive capacity group information.

Companies who participate in the Catena-X Network with both roles therefore MUST be able to receive
and send both, material demand as well as capacity group information. It is recommended that
companies implement both standards.

Every data provider of `WeekBasedCapacityGroup` data MUST provide the data conformant to the
semantic model specified in this document.

The unique identifier of the semantic model specified in this document MUST be used by the data
provider to define the semantics of the data being transferred.

Every certified business application relying on `WeekBasedCapacityGroup` data MUST be able to
consume data conformant to the semantic model specified in this document.

Data consumers and data provider MUST comply with the license of the semantic model.

In the Catena-X data space `WeekBasedCapacityGroup` data MUST be requested and exchanged via Eclipse
Dataspace Connector (EDC) conformant to [CX-0018](https://catena-x.net/de/standard-library) and [CX-0002](https://catena-x.net/de/standard-library).

The characteristics BPNL and BPNS MUST be used according to the standard [CX-0010](https://catena-x.net/de/standard-library).

### Sample Data

```json
{
  "unitOfMeasure": "GRM",
  "linkedDemandSeries": [
    {
      "materialNumberCustomer": "MNR-7307-AU340474.002",
      "materialNumberSupplier": "MNR-8101-ID146955.001",
      "customerLocation": "BPNS8888888888XX",
      "demandCategory": {
        "demandCategoryCode": "0001"
      }
    }
  ],
  "supplier": "BPNL6666666666YY",
  "name": "Spark Plugs on drilling machine for car model XYZ",
  "supplierLocations": "BPNS8888888888XX",
  "capacities": [
    {
      "calendarWeek": "2022-08-01",
      "actualCapacity": 1,
      "maximumCapacity": 2
    }
  ],
  "changedAt": "2023-03-10T12:27:11.320Z",
  "capacityGroupId": "0157ba42-d2a8-4e28-8565-7b07830c1110",
  "customer": "BPNL8888888888XX"
}
```

The semantic model has the unique identifier
```text
  urn:bamm:io.catenax.week_based_capacity_group:1.0.0
```
This identifier MUST be used by the data provider to define the semantics of the data being
transferred.

The rdf turtle file, an instance of the Semantic Aspect Meta Model, is the master for generating
additional file formats and serializations.
```text
  https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.week_based_capacity_group/1.0.0/WeekBasedCapacityGroup.ttl
```
The open source command line tool of the Eclipse Semantic Modeling Framework  is used for generation
of other file formats like for example a JSON Schema, aasx for Asset Administration Shell Submodel
Template or a HTML documentation.

## Data Exchange

### General Overview

The `WeekBasedMaterialDemand` as well as the `WeekBasedCapacityGroup` is a JSON
string which is sent through EDC. The JSON string is standardized in this document and contains
either `WeekBasedMaterialDemand` or `WeekBasedCapacityGroup` information.

The standard only describes the sending and receiving of `WeekBasedMaterialDemand` and
`WeekBasedCapacityGroup` through EDC. Both objects are created and handled by applications of the
companies involved, but these applications are not part of the standard.

### WeekBasedMaterialDemand API

To support the exchange of `WeekBasedMaterialDemand` data, a business application MUST define a
single endpoint supporting the HTTP POST request method as described in [RFC9110](https://datatracker.ietf.org/doc/html/rfc9110.html).
The structure of the endpoint MAY be freely chosen. The address of the endpoint MUST be provided
as part of the EDC Data Asset defined in this document.

The WeekBasedMaterialDemand data MUST be sent from the customer to the supplier using an HTTP POST
request. The data format described here MUST be followed for the exchange of the material demand
information.

Multiple `WeekBasedMaterialDemand` aspects MAY be sent in one transfer as a JSON list. If only one
`WeekBasedMaterialDemand` aspect is transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The `WeekBasedMaterialDemand` endpoint MUST be implemented by all participants who wish to
participate in the Catena-X DCM network as a supplier. Customers MUST be able to send material
demand objects to their suppliers.

The data payload itself MUST be a valid JSON file.

All attributes marked as mandatory in the standard [CX-0047](https://catena-x.net/de/standard-library) MUST be included in the dataset. Attributes marked as 'Optional' MAY be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions in the definitions
in [CX-0046](https://catena-x.net/de/standard-library). While some attributes are technically a
string, not any string is valid. For example, expectedSupplierLocations MUST be formatted as a BPNS.

The calenderWeek MUST be set to a Monday of the week for that specific demand. The date format MUST
be in accordance with ISO8601 and MUST be in the format YYYY-MM-DD (for example 2023-02-13).

The attributes 'demandCategory' and 'unitOfMeasure' MUST be set to one of the defined values as
defined in the standard [CX-0047](https://catena-x.net/de/standard-library).

 > **Definition from [CX-0046](https://catena-x.net/de/standard-library)** (Standardized there, non-normative
quote here) _"The customer owns and MUST publish its own demand with its supplier for the future
horizon and it is highly RECOMMENDED to avoid any gaps as far as possible and to share demand data
at least till month 9, to ensure DCM participants to have also sufficient demand data to work with._
_If more demand data is available (i.e. demand related to a horizon that spans beyond month 9), the
customer MAY ideally provide them until month 24. If a customer has even more demand data available
(i.e. demand related to a horizon that spans beyond month 24), he MAY also provide this to his
supplier._ _The data series MAY start already from week n+2._ _Although the data series MAY start
already from week n+2 and can be elaborated from a technical perspective, the DCM process have a
clear focus on the tactical mid- to long-term horizon (typically considered from month 4 to 24) to
enable a more resilient supply chain."_

In addition to the definitions from [CX-0046](https://catena-x.net/de/standard-library) quoted above, the following rules have to be followed:

The data series in the `WeekBasedMaterialDemand` SHOULD start already from week _n+2_.

The demand for the current week (_n=0_) and the next week (_n=1_) MAY be included in the dataset.
The `WeekBasedMaterialDemand` MUST include at least one week other than the current or the next week
(meaning it may not be empty). Every week MUST NOT be included multiple times in the same
`WeekBasedMaterialDemand`.

If the demand for one of the weeks changes, the whole dataset MUST be sent to the supplier; sending
the changes only (delta update / incremental update) is not possible. By this procedure,
inconsistent or incomplete data sets are avoided. One data transfer MUST contain at least one
`WeekBasedMaterialDemand` data set.

For the combination of the attributes supplier, customer and materialNumberCustomer in the object
`WeekBasedMaterialDemand`, there MUST NOT be more than one `WeekBasedMaterialDemand` object in
existence. This means that the customer needs to collect all demands for all factories and send them
aggregated as one `WeekBasedMaterialDemand` to the supplier.

If the demand in a certain week has the value `0`, it MUST be explicitly included as such in the
`WeekBasedMaterialDemand`, meaning the week cannot be left out (as there is a difference between
null and 0). Weeks with an unknown demand (value `null`) SHOULD be left out.

#### UUID generation and handling

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

For technical purposes the UUID MUST be treated as unique. In order to reduce the probability of
collision as well as to eliminate certain attack vectors it MUST be treated as unique within the
supplier-customer relationship. It SHOULD NOT be treated as globally unique for the reasons stated
above.

For the combination of attributes: supplier, customer and materialNumberCustomer in the object
`WeekBasedMaterialDemand`, there MUST be exactly one unique UUID.

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via an EDC communication.
Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a property
`asset:prop:dcm` with value `weekbasedmaterialdemand-endpoint`. This property SHOULD be used to
identify the asset when searching the assets catalog of a supplier. Because the asset reflects the
contractual relationship between a supplier and its customers, only one asset with the
aforementioned property MUST be visible to the customer at any time to avoid ambiguity.

An example EDC Data Asset definition with a corresponding access / usage policy and contract
definition are shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.

```json
// Asset definition
{
    "asset": {
        "properties": {
            "asset:prop:id": "1",
            "asset:prop:dcm": "weekbasedmaterialdemand-endpoint",
            "asset:prop:description": "Endpoint for provisioning of week based material demands"
        }
    },
    "dataAddress": {
        "properties": {
            "type": "HttpData",
            "baseUrl": "{{ **URL-WEEKBASEDMATERIALDEMAND-ENDPOINT** }}"
        }
    }
}
```

```json
// Access and Usage Policy definition
{
    "id": "1",
    "policy": {
        "prohibitions": [
        ],
        "obligations": [
        ],
        "permissions": [
            {
                "edctype": "dataspaceconnector:permission",
                "action": {
                    "type": "USE"
                },
                "constraints": [
                    {
                        "edctype": "AtomicConstraint",
                        "leftExpression": {
                            "edctype": "dataspaceconnector:literalexpression",
                            "value": "BusinessPartnerNumber"
                        },
                        "rightExpression": {
                            "edctype": "dataspaceconnector:literalexpression",
                            "value": "{{ **CUSTOMER-BPN** }}"
                        },
                        "operator": "EQ"
                    }
                ]
            }
        ]
    }
}
```

```json
// Contract definition
{
    "id": "1",
    "criteria": [
        {
            "operandLeft": "asset:prop:id",
            "operator": "=",
            "operandRight": "1"
        }
    ],
    "accessPolicyId": "1",
    "contractPolicyId": "1"
}
```

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to the [CX-0048](https://catena-x.net/de/standard-library) standard.

### WeekBasedCapacityGroup API

To support the exchange of `WeekBasedCapacityGroup` data, a business application MUST define a
single endpoint supporting the HTTP POST request method as described in [RFC9110](https://datatracker.ietf.org/doc/html/rfc9110.html). The structure of the endpoint MAY be freely chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined in this document.

The `WeekBasedCapacityGroup` data MUST be sent from the supplier to the customer using an HTTP POST
request. The data format described here MUST be followed for the exchange of the capacity group
information.

Multiple `WeekBasedCapacityGroup` aspects MAY be sent in one transfer as a JSON list. If only one
`WeekBasedCapacityGroup` aspect is transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The WeekBasedCapacityGroup endpoint MUST be implemented by all participants who wish to participate
in the Catena-X DCM network as a customer. Suppliers MUST be able to send `WeekBasedCapacityGroup`
objects to their customers.

The data payload itself MUST be a valid JSON file.

All attributes marked as mandatory in the standard [CX-0047](https://catena-x.net/de/standard-library) MUST be
included in the dataset. Attribute marked as 'Optional' CAN be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions in the standard
[CX-0047](https://catena-x.net/de/standard-library) and the definitions in [CX-0046](#41-normative-references). For example, an exact definition of the different capacities is provided there and needs to be observed.

While some attributes are technically a string, not any string is valid. For example, supplier MUST
be formatted as a BPNL.

The calenderWeek MUST be set to a Monday of the week for that specific `WeekBasedCapacityGroup`. The
date format MUST be in accordance with ISO8601 and MUST be in the
format YYYY-MM-DD (for example 2023-02-13).

The data payload itself MUST be a valid JSON file.

The attributes 'demandCategory' and 'unitOfMeasure' MUST be set to one of the defined values as
defined in the standard [CX-0047](https://catena-x.net/de/standard-library).

The capacities for the current week (_n=0_) and the next week (_n=1_) MAY be included in the
dataset. The `WeekBasedCapacityGroup` MUST include at least one week other than the current or the
next week (meaning it may not be empty). Every week MUST NOT be included multiple times in the same
`WeekBasedCapacityGroup`.

If the capacity for one of the weeks changes, the whole dataset MUST be sent to the customer,
sending the changes only (delta update / incremental update) is NOT possible. By this procedure,
inconsistent or incomplete data sets are avoided. One data transfer MUST contain at least one
`WeekBasedCapacityGroup` data set.

Additional business-process related rules are specified in the 'process template', these MUST be
followed as well. For example, the 'process template' defines a capacity and how it is to be
interpreted or that a demand must be consistent with other exchanged information such as call-offs.
All `WeekBasedCapacityGroup` objects MUST only use a mutually agreed unit of measure (as defined in
the standard [CX-0046](https://catena-x.net/de/standard-library)).

The property linkedDemandSeries is used to indicate to which `WeekBasedMaterialDemand` object a
`WeekBasedCapacityGroup` object refers to. More specifically, the linkedDemandSeries refers to a
demand for a specific demandCategory / customerLocation / materialNumberCustomer combination.

One specific combination of demandCategory / customerLocation / materialNumberCustomer MAY be
referred to in multiple `WeekBasedCapacityGroup` objects. Therefore, one materialNumberCustomer MAY
be contained in linkedDemandSeries of several different `WeekBasedCapacityGroup` objects.

The order of the entries listed in the linkedDemandSeries of a `WeekBasedCapacityGroup` is arbitrary
and MUST be treated as such.

#### UUID generation and handling

The UUIDv4 MUST be generated according to [RFC4122](https://www.rfc-editor.org/rfc/rfc4122).

For technical purposes the UUID MUST be treated as unique. In order to reduce the probability of
collision as well as to eliminate certain attack vectors it MUST be treated as unique within the
supplier-customer relationship. It SHOULD NOT be treated as globally unique for the reasons stated
above.

#### EDC Data Asset Structure

The HTTP POST endpoint introduced MUST NOT be called from a supply chain partner directly. Rather, it MUST be called via an EDC communication. Therefore, the endpoint MUST be offered as an EDC Data Asset. The latter MUST have a property " **asset:prop:dcm**" with value " **weekbasedcapacitygroup-endpoint**". This property SHOULD be used to identify the asset when searching the assets catalog of a customer. Because the asset reflects
the contractual relationship between a customer and its suppliers, only one asset with the
aforementioned property MUST be visible to the supplier at any time to avoid ambiguity.

An example EDC Data Asset definition with a corresponding access / usage policy and contract
definition are shown below.

> Note: Expressions in double curly braces {{}} must be substituted with a corresponding value.

```json
// Asset definition
{
    "asset": {
        "properties": {
            "asset:prop:id": "1",
            "asset:prop:dcm": "weekbasedcapacitygroup-endpoint",
            "asset:prop:description": "Endpoint for provisioning of week based capacity groups"
        }
    },
    "dataAddress": {
        "properties": {
            "type": "HttpData",
            "baseUrl": "{{URL-WEEKBASEDCAPACITYGROUP-ENDPOINT}}"
        }
    }
}
```

```json
// Access and Usage Policy definition
{
    "id": "1",
    "policy": {
        "prohibitions": [
        ],
        "obligations": [
        ],
        "permissions": [
            {
                "edctype": "dataspaceconnector:permission",
                "action": {
                    "type": "USE"
                },
                "constraints": [
                    {
                        "edctype": "AtomicConstraint",
                        "leftExpression": {
                            "edctype": "dataspaceconnector:literalexpression",
                            "value": "BusinessPartnerNumber"
                        },
                        "rightExpression": {
                            "edctype": "dataspaceconnector:literalexpression",
                            "value": "{{SUPPLIER-BPN}}"
                        },
                        "operator": "EQ"
                    }
                ]
            }
        ]
    }
}
```

```json
// Contract definition
{
    "id": "1",
    "criteria": [
        {
            "operandLeft": "asset:prop:id",
            "operator": "=",
            "operandRight": "1"
        }
    ],
    "accessPolicyId": "1",
    "contractPolicyId": "1"
}
```

#### Error Handling and payload validation

For error handling and payload validation instructions please refer to the [CX-0048](https://catena-x.net/de/standard-library) standard.