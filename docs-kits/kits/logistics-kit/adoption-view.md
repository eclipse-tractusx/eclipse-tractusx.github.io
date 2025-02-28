---
id: Adoption View Logistics Kit
title: Adoption View
description: "Logistics Kit"
sidebar_position: 2
---

![Logistics kit banner](@site/static/img/kits/logistics/logistics-kit-logo.drawio.svg)

Logistics and customs are closely linked due to the global nature of trade, and companies must consider both factors to ensure smooth and successful business operations. [Customs](./customs/page_adoption-view-customs.md) can affect the cost of imported or exported goods and thus influence logistics costs. In logistics, the compliance with customs regulations and procedures therefore plays an important role.

## Vision & Mission

### Vision

The aim of the Logistic KIT is to enlarge the digitally represented value chain of parts, batches and vehicles to cover the transport path. By using the foundation of the industry core for a certain use case and combining elements from the Logistic KIT, the entire supply chain, including transport information, fill the gap between companies and enables the supply chain to provide information such as geo data, bundling parts and batches belonging to a transport unit, or data from logistic service providers.

It reduces interfaces and enriches the entire network by including logistics and transport data to narrow down quality issues more precisely. It provides current transport data about environmental factors, like generated CO2 emissions.

### Mission

The Logistic KIT describes digital twins for a transport unit, a shipment itself as a process, provides the basis to include digital twins for assets (for example load carrier) and sensors plus matching aspect models. It enables logistic service providers, carriers etc. as well to provide their data to the network in a Catena-X compliant and interoperable way according to Gaia-X principles.
The approach is to exchange transport information in a n-way relationship between manufacturer, Tier-N, and supplier, gathering all relevant transport information and making it visible to all authorized stakeholders in the supply chain.

## Business Value & Key Ideas

### Business Value

Since the Logistic KIT is based on the digital foundation of the Industry Core, it requires only a small effort to maintain full coverage of the supply chain, including logistic routes. Goods which are negatively impacted by shock or heat can be tracked permanently. Influences of damaging can be discovered, eliminated/avoided, affected goods narrowed down and treaded appropriately.
Application and service provider can develop interoperable Catena-X logistic solutions.
Using the CX logistic standard, a fully connected network can be achieved in the long run. Ideally, OEMs and their suppliers will be part of the Catena-X logistics supply chain network and will be able to seamlessly provide and share data between all authorized stakeholders, such as GPS tracking, estimated delivery date, package composition, sensor data, customs requirements and much more.

![Logistic Twins](./assets/LogisticTwins.png)

### Key Ideas

- Sharing of relevant transport data beyond bilateral company relationships
- Triangle (OEM, Tier, LSPs - logistic service provider) to n-way connection
- Aligned demands and requirements for LSPs (logistic service provider) to share their data. No need to tailor solutions to individual requests.
- Distancing from a "What's in for me?" view to a collaborative view to bring all stakeholders on board and in turn optimizing the solution in the long run.

### Todays Challenge

The challenge today is that data exchange with logistic service provider varies greatly. Some are not connected at all, while others send their information about transports through many different interfaces. Additionally, there are various customer requirements on data sharing. Different committes made an attempt to standardize data exchange. Unfortunately, the standards are partly outdated, or they have been reinterpreted and individually adapted by companies, resulting in additional requirements to logistics service providers.

## Digital Twins

The Logistic Use Case uses digital twins to make a company's data available to other Catena-X partners. Basics about digital twins are described in the [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit/) and in the Logistics and [Customs Standard](https://github.com/catenax-eV/product-standardization-prod/blob/main/standards/CX-0150-UseCaseLogistics/CX-0150-UseCaseLogistics.md).

### Digital Twin “Transport Unit”

In case of using a Global Transport Label or tracking a transport unit and provide data e.g. about the packing list, creating a digital twin for transport unit is necessary. For creation a DT for transport units please see the [requirements of specific asset ID's](https://github.com/catenax-eV/product-standardization-prod/blob/main/standards/CX-0150-UseCaseLogistics/CX-0150-UseCaseLogistics.md#23-special-digital-twins-for-logistics-and-specific-asset-ids).

### Digital Twin "Transport"

In case of tracking the transport and provide data e.g. about GPS data, using a digital twin for transport is possible. For creation a DT for transport units please see the [requirements of specific asset ID's](https://github.com/catenax-eV/product-standardization-prod/blob/main/standards/CX-0150-UseCaseLogistics/CX-0150-UseCaseLogistics.md#23-special-digital-twins-for-logistics-and-specific-asset-ids).

## Aspect Models

In the following section, all aspect models that are part of Logistic KIT are documented.

### Packing List

The aspect provides the information of the [packed goods inside of a Transport Unit]((https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.packing_list/1.0.0/PackingList.ttl)).

### IotSensorData

The aspect provides the [information of tracked returnable packages and assets, monitor quality of critical materials](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.iot_sensor_data/2.0.0/IotSensorData.ttl).

### GlobalTransportLabel (GTL)

The aspect model provides all information of [GTL](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.global_transport_label/1.0.0/GlobalTransportLabel.ttl) in a digital format.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024, Mercedes Benz AG
- SPDX-FileCopyrightText: 2024, Robert Bosch GmbH
- SPDX-FileCopyrightText: 2024, msg systems AG
- SPDX-FileCopyrightText: 2024, Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer ISST & Fraunhofer IML)
