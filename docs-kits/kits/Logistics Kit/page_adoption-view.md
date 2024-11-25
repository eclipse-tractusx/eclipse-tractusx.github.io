---
id: Adoption View Logistics Kit
title: Adoption View
description: "Logistics Kit"
sidebar_position: 1
---

![Logistics kit banner](/img/kits/logistics/logistics-kit-logo.drawio.svg)

## Logistic Kit

## Vision & Mission

### Vision

The aim of the Logistic KIT is to enlarge the digitally represented value chain of part batches and vehicles to cover the transport path. By using the foundation of the industry core for a certain use case and combining elements from the Logistic KIT, the entire supply chain, including transport information, bridges the gaps between companies and enables the supply chain to provide information such as geo data, bundling parts and batches into a transport unit, or data from logistic service providers.

It reduces interfaces and enriches the entire network by including logistics and transport data to narrow down quality issues more precisely. It provides current transport data about environmental factors like generated CO2 emissions without losing data sovereignty.

### Mission

The Logistic KIT describes digital twins for a transport unit, a shipment itself, provides the basis to include digital twins for assets (for example load carrier) and sensors (use case Demand and Capacity Management - asset tracking) and matching aspect models like the Global Transport Label (VDA 4994). It enables logistic service providers, carriers etc. as well to provide their data to the network in a Catena-X compliant and interoperable way according to Gaia-X principles.
The approach is to exchange GTL/transport information in an n-way relationship between manufacturer, tier-N, and supplier, gathering all relevant transport information and making it visible to all eligible stakeholders in the supply chain, while setting up aspect models and digital twin structures that correctly reflect the required data.

## Business Value & Key Ideas

### Business Value

Since the Logistic KIT is based on the logic of the Industry Core, it requires only a small effort to maintain full coverage of the supply chain, including the logistics routes. Goods negatively impacted by shock or temperature can be tracked permanently.

Application and service providers can develop interoperable Catena-X traceability solutions.

We aim to implement a standard for shipments and traceability of all transports to make planning for production and costs easier for the OEM as well as Tier-N suppliers of the Catena-X network.

By doing so, a fully connected network can be achieved in the long run. Ideally, OEMs and their suppliers will be part of the Catena-X logistics supply chain network and will be able to seamlessly transfer data between all authorized stakeholders, such as GPS tracking, estimated timestamps, package composition, sensor data, and more.

### Key Ideas

- Sharing of transport relevant data beyond bilateral company relationships
- Triangle (OEM, Tier, LSP) to n-way connection
- Aligned demands and requirements for LSPs to share their data. No need to tailor solution to individual requests.
- Distancing from a "What's in for me?" view to a collaborative view to bring all stakeholders on board and in turn optimizing the solution in the long run.
- Distancing from a "What's in for me?" view to a collaborative view to bring all stakeholders on board and in turn optimizing the solution in the long run

### Todays Challenge

The challenge today is that data exchange with logistics service providers varies greatly. Some are not connected at all, while others send their information about transports through many different interfaces. Additionally, there are various customer requirements on how data should be shared. The VDA made an attempt to standardize data exchange. Unfortunately, the standards are partly outdated, or they have been reinterpreted and individually adapted by companies, resulting in new requirements being sent to the logistics service providers.

## Digital Twins

The Logistic Use Case uses digital twins to make a company's data available to other Catena-X partners. Basics about digital twins, which you should be familiar with to understand this section, are described in the Digital Twin KIT.

### Special Digital Twins for Logistic

#### Digital Twin “Transport Unit”

In case of using a Global Transport Label or tracking a transport unit and provide data e.g. about the packing list, using a digital twin for transport unit is possible.

##### Property specificAssetIds

Specific asset IDs are used to identify digital twins when looking up or searching for these digital twins. This is a required step by a supplier of parts to connect the digital twins of the transport unit to the digizal twins of their parts. Mandatory specific asset IDs ensure that at least this information is available for the digital twin.

The following conventions for specific asset IDs apply to digital twins of a transport unit:

|Key|Availability|Description|Type|
| :------------- | :----------- | :-------------------------------------------------------------------------------------------  | :----- |
| GTL No.               | Optional      | Master/Mixed Label No. according to VDA 4994                                          | String |
| Digital Twin Type     | Mandatory     | transport unit                                                                        | String |
| Shipping Note No      | Mandatory     | (Lieferschein-Nr.) Shipping Note No. of forwarding company                            | String |
| Order No.             | Mandatory     | Shipping no. on package visible for carrier (Referenz-Nr.)                            | String |
| manufacturerId        | Mandatory     | The Business Partner Number (BPN-L) of the manufacturer/supplier of parts             | String |
| customerID            | Mandatory     | The Business Partner Number (BPN-A) of goods receiver.                                | String |
| Customer Shipping No. | Optional      | Customer Shipping No. if available                                                    | String |

#### Digital Twin "Transport"

In case of tracking the transport and provide data e.g. about GPS data, using a digital twin for transport is possible.

##### Property specificAssetIds

Specific asset IDs are used to identify digital twins when looking up or searching for these digital twins. This is a required step by a supplier of parts to connect the digital twins of the transport unit and the transport itself to the digital twins of their parts. Mandatory specific asset IDs ensure that at least this information is available for the digital twin.

The following conventions for specific asset IDs apply to digital twins of a transport:

|Key|Availability|Description|Type|
| :------------- | :----------- | :-------------------------------------------------------------------------------------------  | :----- |
| Customer Shipping No. | Mandatory     | Customer Shipping No.                                                                 | String |
| Digital Twin Type     | Mandatory     | Shipment number                                                                       | String |
| Business partner Id   | Mandatory     | The Business Partner Number (BPN-L) of the logistic service Provider (LSP)            | String |
| manufacturerId        | Mandatory     | The Business Partner Number (BPN-L) of the manufacturer/supplier of parts             | String |
| customerID            | Mandatory     | The Business Partner Number (BPN-A) of goods receiver.                                | String |
| Order No.             | Optional      | Shipping no. on package visible for carrier (Referenz-Nr.)                            | String |

## Aspect Models

Aspect models are mostly easy to create by transforming a company's internal data into the target aspect model. Transformations are mostly straightforward in these cases. If necessary, special steps in creating aspect models are mentioned in the corresponding sections.

In the following section, all aspect models that are part of Logistic KIT are documented.
|Digital Twin Type|Aspect Model|Mandatory Version|Optional Version|
| :------------- | :----------- | :-------------------------------------------------------------------------------------------  |
| TransportUnit | PackingList   | 1.0.0 |   |
| Transport     | ShippingData  |       |   |

### Packing List

The aspect provides the information of the packed goods inside of a Transport Unit.

Aspect Model in GitHub:

- Version 1.0.0: <https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.packing_list/1.0.0/PackingList.ttlhttps://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.packing_list/1.0.0>

#### Example: Aspect Model `Packing List` for Transport Unit

```json
{
  "receiverAddress" : {
    "bpnaProperty" : "BPNA0123456789ZZ"
  },
  "listItems" : [ {
    "catenaXId" : "urn:uuid:055c1128-0375-47c8-98de-7cf802c3241d",
    "itemName" : "Valve",
    "quantity" : {
      "itemQuantityProperty" : {
        "value" : 20.0,
        "unit" : "unit:piece"
      }
    },
    "position" : 1,
    "itemDescription" : "eOMtThyhVNLWUZNRcBaQKxI"
  } ],
  "senderAddress" : {
    "bpnaProperty" : "BPNA0123456789ZZ"
  },
  "shippingDate" : "2023-02-11"
}
```

### Shipment Data

The aspect provides the information of shipping data.

Aspect Model in GitHub:

- Version 1.0.0: <>

#### Example: Aspect Model `Shipment Data` for Transport

Our current version of Data models depicted in a table view.

```json
{
  "actualBusinessTimestamp": "2022-11-11T01:00:00Z",
  "actualTechnicalTimestamp": "2022-11-11T01:00:00Z",
  "transportInfo": {
    "transportNumber": "testTP25012024",
    "dangerousGoods": false,
    "meansOfTransport": 31
  },
  "statusUpdate": "NOT_STARTED",
  "estimatedTimestamps": {
    "estimateArrival": "2024-01-25T16:55:00Z",
    "estimateDispatch": "2024-01-21T14:35:00Z"
},
  "registrationInfo": {
    "registrationCountry": "DE",
    "registrationNumber": "D-RA-KL-8136"
  },
  "trackedObjects": [
    "obj1",
    "obj2",
    "obj3"
  ],
  "serviceAgentId": {
    "forwardingAgentId": 13245,
    "haulerId": 12345
  },
  "arrivalInfo": [
    {
      "locationType": "Distribution Center",
      "proofOfDelivery": true,
      "locationName": "Mercedes-Benz Untertürkheim Plant",
      "locationId": "12345678"
    }
  ],
  "shipmentNumber": "testSHP25012024",
  "departureInfo": {
    "locationType": "Distribution Center",
    "locationId": "12345678",
    "locationName": "Mercedes-Benz Untertürkheim Plant"
  }
}
```
