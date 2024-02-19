---
id: Operation View Digital Twin Kit
title: Operation View
description: 'Digital Twin Kit'
sidebar_position: 3
---

![DT Kit Pictotogram](assets/img/DTKIT_pictogram_blue.png)

### Digital Twin KIT

<!--
Documentation of the kit.
-->

Based on the information provided in this kit, it is possible to run and program against an infrastructure of
Digital Twins the Catena-X-way. This infrastructure empowers Data Consumers to consume the network's data as agreed with
each Data Provider and facilitated by an Operating Company. They run central and decentral services that allow them to
discover each other, exchange information and contextualize it according to a standardized semantics.

| Service Name          | Description                                                                                              | Reference Implementation                                                                                                                                                                            | [Standardized in](https://catena-x.net/de/standard-library) |
|-----------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| Discovery Finder      | A microservice resolving a type of identifiers against a set of BPN-Discovery Servers.                   | [Tractus-X Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                                                                             | CX - 0053                                                   |
| BPN Discovery         | A microservice resolving a particular assetId against the registered BPN of its owner.                   | [Tractus-X BPN Discovery](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                                                                   | CX - 0053                                                   |
| EDC Discovery         | A microservice that resolves a BPN against an EDC endpoint.                                              | [Tractus-X Portal including EDC Discovoery API](https://github.com/eclipse-tractusx/portal-backend)                                                                                                 | CX - 0001                                                   |
| Digital Twin Registry | An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. | [Tractus-X Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                                                                                   | CX - 0002                                                   |
| Submodel Server       | The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0.                   | [FA³ST-Framework](https://github.com/FraunhoferIOSB/FAAAST-Service), [Eclipse Basyx](https://github.com/eclipse-basyx/basyx-java-sdk), [AASX Server](https://github.com/admin-shell-io/aasx-server) | CX - 0002                                                   |


![High Level Architecture of an App leveraging the Digital Twin Kit](assets/img/DTKIT_high_level_arch.svg)