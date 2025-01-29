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

The aim of the Logistic KIT is to enlarge the digitally represented value chain of part, batches and vehicles to cover the transport path. By using the foundation of the industry core for a certain use case and combining elements from the Logistic KIT, the entire supply chain, including transport information, fills the gap between companies and enables the supply chain to provide information such as geo data, bundling parts and batches belonging to a transport unit, or data from logistic service providers.

It reduces interfaces and enriches the entire network by including logistics and transport data to narrow down quality issues more precisely. It provides current transport data about environmental factors like generated CO2 emissions.

### Mission

The Logistic KIT describes digital twins for a transport unit, a shipment itself, provides the basis to include digital twins for assets (for example load carrier) and sensors and matching aspect models. It enables logistic service providers, carriers etc. as well to provide their data to the network in a Catena-X compliant and interoperable way according to Gaia-X principles.
The approach is to exchange transport information in a n-way relationship between manufacturer, Tier-N, and supplier, gathering all relevant transport information and making it visible to all authorized stakeholders in the supply chain.


## Business Value & Key Ideas

### Business Value

Since the Logistic KIT is based on the logic of the Industry Core, it requires only a small effort to maintain full coverage of the supply chain, including logistic routes. Goods which are negatively impacted by shock or heat can be tracked permanently.
Application and service provider can develop interoperable Catena-X logistic solutions.
Using the CX logistic standard, a fully connected network can be achieved in the long run. Ideally, OEMs and their suppliers will be part of the Catena-X logistics supply chain network and will be able to seamlessly transfer data between all authorized stakeholders, such as GPS tracking, estimated delivery date, package composition, sensor data, customs requirements and much more.
![Logistic Twins] (../assets/LogisticTwins.png)

### Key Ideas

- Sharing of relevant transport data beyond bilateral company relationships
- Triangle (OEM, Tier, LSPs - logistic service provider) to n-way connection
- Aligned demands and requirements for LSPs (logistic service provider) to share their data. No need to tailor solution to individual requests.
- Distancing from a "What's in for me?" view to a collaborative view to bring all stakeholders on board and in turn optimizing the solution in the long run.


### Todays Challenge

The challenge today is that data exchange with logistics service provider varies greatly. Some are not connected at all, while others send their information about transports through many different interfaces. Additionally, there are various customer requirements on data sharing. The VDA made an attempt to standardize data exchange. Unfortunately, the standards are partly outdated, or they have been reinterpreted and individually adapted by companies, resulting in additional requirements to logistics service providers.


## Business Value

picture


## Digital Twins

The Logistic Use Case uses digital twins to make a company's data available to other Catena-X partners. Basics about digital twins are described in the Digital Twin KIT.

### Digital Twin “Transport Unit”

In case of using a Global Transport Label or tracking a transport unit and provide data e.g. about the packing list, using a digital twin for transport unit is necessary.

### Digital Twin "Transport"

In case of tracking the transport and provide data e.g. about GPS data, using a digital twin for transport is possible.


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

- [Version 1.0.0](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.packing_list/1.0.0/PackingList.ttl)

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

- Version 1.0.0:

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
