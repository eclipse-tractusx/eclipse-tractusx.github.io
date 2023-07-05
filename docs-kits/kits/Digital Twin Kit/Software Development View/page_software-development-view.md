---
id: Specification Digital Twin Kit
title: Specification
description: 'Digital Twin Kit'
sidebar_position: 4
---

### Digital Twin Kit

<!--
Development View of the Kit.
-->

<!-- !Mandatory! -->
## API Specifications

All openAPI-specifications for the Digital Twin KIT services are rendered in the section [of these docs](API Specs)

### Asset Administration Shell

The Asset Administration Shell is a specification that is released by the IDTA with a perspective to be adopted bei the IEC. 
Its mission is defining how “information about assets […] can be exchanged in a meaningful way between partners in a value
creation network”. As such, it is well-suited to contribute to the toolbox of Catena-X. While the Spec offers an extensive
suite of meta-model elements and APIs, Catena-X only uses a small subset. What exactly is defined in the Catena-X standard 
CX - 0002.

#### Submodels

An Asset Administration Shell is organized in Submodels. Each Submodel represents a self-contained aspect of an asset - 
typical examples are the Nameplate or AssemblyPartRelationship (which denotes the hierarchical composition of parts into
a whole). As different aspect of an Asset may be known to different parties on the value-chain, submodels for a single asset
must be capable to run independently of each other. The specification explicitly allows this. Catena-X demands that data-
providers offer only a subset of the SubmodelServiceSpecification while it is advisable to expose submodels with help of 
a full-fletched AAS-server SDK that provides the content-modifiers and API-endpoints out-of-the box.

#### Digital Twin Registry

What Catena-X calls the "Digital Twin Registry" (DTR) is actually the union of two different services that the AAS specification
has specified. For simplicity's sake, they are both defined in a single service. The Registry serves a similar function as the
index in a book: When trying to discover information, it's convenient to have an overview WHAT one will find and HOW to
access it. The Registry caters exactly that information: For every asset it knows, it holds a number of "submodel-descriptors" and in 
these, a consumer app will find information WHAT it will find (via the semanticId) and how to access the information (endpoint,
security setup etcetc). As the information contained in the DTR may be sensitive and not be trusted with a central entity,
every data provider must offer his own DTR as an EDC Data Asset.

[AASR](https://app.swaggerhub.com/apis/Plattform_i40/AssetAdministrationShellRegistryServiceSpecification/V3.0_SSP-002)
[Discovery](https://app.swaggerhub.com/apis/Plattform_i40/DiscoveryServiceSpecification/V3.0_SSP-001)

### Catena-X specific Services

Due to the requirement that the DTR must run decentrally, there is a more elaborate mechanism to discover information on assets
that is more protective of data participants' information. For this, a three-step discovery pattern was specified according
wo which consumers communicate with the central microservices Discovery Finder, BPN Discovery (or several of them) and finally
the EDC discovery that is part of the CX-Portal.

<!-- Recommended -->
## Sample Data

Most Sample Data for relevant data objects is contained in the openAPI-specs of the respective services. This chapter only
contains data structures that are specifically designed for use in the Digital Twin KIT and go beyond what is allowed/given
as example.  

### Data Offers at EDC

While the exact integration with the EDC is still at the discretion of each KIT and use-case, there are best-practices
that are likely to be standardized in the future. An example is HOW the EDC-protected parts of this KIT should register
with the EDC Management API. The current recommendation is:

#### Digital Twin Registry

````json
{
  "asset": {
    "properties": {
        "asset:prop:id": "<EDC_ASSET_ID>", #DTR-EDC-instance-unique-ID
        "asset:prop:type": "data.core.digitalTwinRegistry",
        "asset:prop:name": "Digital Twin Registry Endpoint of provider XYZ",
        "asset:prop:contenttype": "application/json",
        "asset:prop:policy-id": "use-eu"
    }
  },
  "dataAddress": {
    "properties": {
        "type": "HttpData"
        "baseUrl": "https://<YOUR_DIGITAL_TWIN_REGISTRY_URL>",
        "proxyPath": true,
        "proxyBody": true,
        "proxyMethod": true,
        "proxyQueryParams": true 
    }
  }
}
````

#### Submodel

How a submodel server is offered as a data asset is not yet agreed and will be added here soon.
```json

```

### Catena-X Submodel Descriptors

The submodel descriptors in the DTR must not only follow the schema defined by the openAPI file. Additionally, it is 
imperative that the network mandates how they shall be populated with data. This is especially critical because the
data access is not straight-forward but passes through an EDC which the data consumer must negotiate with. That's why
the subprotocol body holds information on how to talk to the EDC-data-plane.
````json
{
  "id": "<unique ID of submodel>",
  "semanticId": {
        "type": "ExternalReference", 
        "keys": [
            {"type": "GlobalReference", 
             "value": "urn:bamm:io.catenax.material_for_recycling:1.1.0#MaterialForRecycling"}
        ]
    },
   "endpoints": 
    {
    "protocolInformation": {
        "href": "https://edc.data.plane/<path>/submodel",
        "endpointProtocol": "HTTP",
        "endpointProtocolVersion": ["1.1"],
        "subprotocol": "DSP",
        "subprotocolBody": "<body with information required by subprotocol>", 
        "subprotocolBodyEncoding": "plain",
        "securityAttributes": [ 
            { "type": "NONE", "key": "NONE", "value": "NONE" } 
        ]
 },
    "interface": "SUBMODEL-3.0"
  }
 ]
}
````
Currently, this structure is still ambiguous (see `subprotocolBody`) but will be subject to further standardization introducing
more clarity across use cases and KITs.

<!-- Recommended -->
## Documentation in the Context of Development

### Data Provisioning

Data Providers will usually follow one of two patterns:
1. Digital Twin Repository: Deploying a dedicated Repository for the persistence of digital twins and related data is the most
convenient way to get going with the AAS. Due to the risk of data duplication and unclear initial ingestion mechanisms,
it may not scale to industrial sizes.
2. Delegation: Wrapping another API or a database may deploy the Submodel API as a new facade. It delegates the incoming
requests to the respective backend systems. 

Offering data to the network requires mappings that are naturally dependent on the data source format.

#### Register Digital Twins

As mentioned in CX - 0002, every Data Provider is required not only to deploy a DTR in his infrastructure but also to
register each of the Submodels. Otherwise, the data will not be discoverable by data-consumers.