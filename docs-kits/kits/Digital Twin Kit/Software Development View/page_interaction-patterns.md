---
id: dt-kit-interaction-patterns
title: Interaction Patterns
description: 'Digital Twin KIT - Interaction Patterns'
sidebar_position: 2
---

## Interaction Patterns for Distributed Digital Twins

The Catena-X standard CX-0002 (Digital Twins in Catena-X) defines a subset of the

### 1. Fetching a supplier's Twin

| Scenario                                                                    | Participants                                           | Assumptions                                                                 | Links to Use-Cases                                                                               |
|-----------------------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| The supplier has data required by the OEM. For instance a Bill of Material. | - Data Provider (Supplier) <br/> - Data Consumer (OEM) | 1. Consumer knows Supplier's BPN <br/> 2. Consumer knows an id of the asset | - Industry Core (coming soon) <br/> - [Product Carbon Footprint Kit](../../PCF%20Exchange%20Kit) |

The most common integration pattern with Digital Twins aims to offer asset-related data in expectable ways along the
supply chain. This scenario assumes that the supplier offers data about an asset that was sold to an OEM further up the
chain. Examples for this may include Bills of Material, carbon footprints, technical specifications or regulatory 
documents. An OEM - or really any interested and privileged third party - can assume that a part's supplier offers a Digital
Twin if the data-exchange is based on the Digital Twin Kit (and by proxy CX-0002). The data provider deploys at least:
- Digital Twin Registry (DTR)
  - registered in a DSP-conformant connector offering the DTR to the Dataspace.
  - registers Digital Twins (ShellDescriptors in AAS vocabulary) with specificAssetIds including at least one that's known
  at supplier and customer.
- Submodels
    - registered in a DSP-conformant connector to the Dataspace.
    - registered to the correct ShellDescriptor in the DTR.
    - Serving arbitrary but well-specified json from the `/$value` endpoint

The Data Consumer's only responsibility is to deploy a connector and fetch the data from the right offers.

A Bill of Material ([like this one](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.single_level_bom_as_built/2.0.0/gen/SingleLevelBomAsBuilt.json))
for instance returns a list of `childItems` that hold for each subcomponent the information that's assumed to be present
for the start of this very scenario (see Assumptions 1, 2). Thus, BoM and the DT deployment in combination 
enable recursive browsing of the parts-tree, collecting data along the way.

### 2. Adding a new Twin for a given Asset

| Scenario                                                                                                      | Participants                                                   | Assumptions                             | Links to Use-Cases    |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|-----------------------|
| A party (who is not the supplier of an part) publishes data about a previously uncovered aspect of the asset. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | - PURIS (coming soon) |

Let's suppose, a car has reached it end-of-life. The object is sold to a dismantler who disassembles the vehicle and wants
to publish that exact information. As the Digital Twin is owned by the OEM of the vehicle, it will not be accessible to
everyone in the network. Thus, the dismantler must publish the data themselves, by deploying:

- Digital Twin Registry (DTR)
    - registered in a DSP-conformant connector offering the DTR to the Dataspace.
    - registers Digital Twins (ShellDescriptors in AAS vocabulary) with specificAssetIds including at least one that's
  equivalent to one attached to the OEM's twin.
- Submodel (like [_Certificate of Destruction_](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/4889d8482fc6b233eb0f56f3ac94c5ea4004bc05/io.catenax.certificate_of_destruction/1.0.1/gen/CertificateOfDestruction.json))
    - registered in a DSP-conformant connector to the Dataspace.
    - registered to the correct ShellDescriptor in the DTR.
    - Serving arbitrary but well-specified json via `GET` requests from the `/$value` endpoint.

#### 2.1. Discovery by Convention

In certain use-cases, participants can agree on conventions where a specific Submodel may be expected.
This information can only be provided by the buyer of a certain part who creates a new Twin for the part with identical
`assetIds`. Such conventions about how to locate certain types of Submodels should be explicitly mentioned in the 
Standards and Kits for a use-case as the default hypothesis is always that a [Supplier holds relevant data](#1-fetching-a-suppliers-twin).

#### 2.2. Discovery by Registration

Additionally, the dismantler must signal in a [BPN-Discovery-Service](../page_software-operation-view.md) that he indeed has data on said vehicle.

That way, any interested Data Consumer can not only suspect data with the part's manufacturer but also all third parties
returned by the BPN Discovery Service who have registered there and interacted with the part sometime during its lifecycle. 

Certain use-cases may allow arbitrary Data Consumers to suspect data in other places. For example, a standard
may define conventions like "Data Consumers can assume there to be separate twins for the same asset with the supplier
AND the customer." This however must be explicitly stated to find adoption in Consumers' applications.

### 3. Updating an existing Submodel

| Scenario                                                                                           | Participants                                                   | Assumptions                             | Links to Use-Cases      |
|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|-------------------------|
| A party (who is not the supplier of an part) updates data already covered by an existing Submodel. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | - DCM-AAS (coming soon) |

There may be a scenario where a Supplier deploys a Digital Twin that holds data that will have to be updated during the 
lifecycle. A potential use-case would be the update of a particular vehicle's BoM - for instance if the engine is replaced.
Currently, updating remote Submodels a hypothetical example but, with the right tools, a pattern that can be executed 
in the Catena-X dataspace. Again, the Supplier register the twin:

- Digital Twin Registry (DTR)
    - registered in a DSP-conformant connector offering the DTR to the Dataspace.
    - registers Digital Twins (ShellDescriptors in AAS vocabulary) with specificAssetIds including at least one that's
      equivalent to one attached to the OEM's twin.
- Submodel (like [_Certificate of Destruction_](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/4889d8482fc6b233eb0f56f3ac94c5ea4004bc05/io.catenax.certificate_of_destruction/1.0.1/gen/CertificateOfDestruction.json))
    - registered in a DSP-conformant connector to the Dataspace.
    - registered to the correct ShellDescriptor in the DTR.
    - Serving arbitrary but well-specified json via GET-requests from the `/$value` endpoint.
    - Allowing Changes to data via the PUT `submodel/submodel-elements/{{idShortPath}}` endpoint.

Implementing the last point is tricky. It requires a very differentiated access control concept on the Supplier's side,
differentiating WHO is allowed to write into WHAT part of the Submodel. Several approaches to implementation can be taken:

#### 3.1. Access Control at the connector
Connectors can prevent certain network participants from accessing the Submodel in the Supplier's backend. The EDC for
example can intercept or rewrite components of an HTTP-request like headers, methods/verbs, bodies. Only extending a 
data offer after preliminary checks is another option, implemented for instance in the EDC's Access Policy checks. A 
combination of the two approaches can lead to fairly complete access control but may require fine-grained data-offers
in the provider's catalog (i.e. very restricted EDC-Assets with a lot of proxy-parameters set `"false"`).

#### 3.2. Access Control in the backend
Depending on the backend's capabilities to fine-tune access control, it may be more beneficial to let the backend (like
a Submodel Repository) decide if data will certain API-operations will be allowed. In this example, it would be possible
to let a user update certain properties in a Submodel but only read others. This differentiation can't be made by the 
connector as a connector will usually be oblivious to the data model and API structure of backend systems like a DTR or
Submodel Repository.

### 4. Updating an existing Twin

| Scenario                                                                  | Participants                                                   | Assumptions                             | Links to Use-Cases |
|---------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|--------------------|
| A new customer wants their customerPartId as specificAssetId on the twin. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | None yet           |

An update to a twin is any change to the ShellDescriptor via the APIs of the AssetAdministrationShellServiceSpecification
or DiscoveryServiceSpecification of AAS Pt 2. While the relevant write-APIs are not mandatory in Catena-X, Data Providers
can implement and expose them to the dataspace. This obviously bears risks: not only can improper implementation and 
configuration lead to unauthorized access to data like in the simple read access (see [scenario 1](#1-fetching-a-suppliers-twin), [scenario 2](#2-adding-a-new-twin-for-a-given-asset)).
In this case, data could be manipulated and overwritten endangering the processes that build on it. That's why 
fine-grained access control for components like the DTR is a fundamental requirement to operate.