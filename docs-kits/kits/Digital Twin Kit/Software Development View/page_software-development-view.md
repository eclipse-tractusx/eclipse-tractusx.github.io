---
id: Specification Digital Twin Kit
title: Developing with the DT Kit
description: 'Digital Twin Kit'
sidebar_position: 4
---


<!--
Development View of the Kit.
-->

<!-- !Mandatory! -->
## API Specifications

All openAPI-specifications for the Digital Twin Kit services are rendered in the section [of these docs](API%20Specs)

### Asset Administration Shell

The Asset Administration Shell (AAS) is a specification that is released by the Industrial Digital Twin Association 
[(IDTA)](https://industrialdigitaltwin.org/) with a perspective to be adopted by the International Electrotechnical 
Commission [(IEC)](https://www.iec.ch/homepage). 
Its mission is defining how “information about assets […] can be exchanged in a meaningful way between partners in a value
creation network”. As such, it is well-suited to contribute to the toolbox of Catena-X. While the Spec offers an extensive
suite of meta-model elements and APIs, Catena-X only uses a small subset. What exactly is defined in the Catena-X standard 
CX - 0002.

#### Submodels

An Asset Administration Shell is organized in Submodels. Each Submodel represents a self-contained aspect of an asset - 
typical examples are the Nameplate or AssemblyPartRelationship (which denotes the hierarchical composition of parts into
a whole). As different aspects of an Asset may be known to different parties on the value-chain, Submodels for a single asset
must be capable to run independently of each other. The specification explicitly allows this. Catena-X demands that Data 
Providers offer only a subset of the SubmodelServiceSpecification - namely the `$value` serialization. This is an abbreviated
notation of an AAS-Submodel that is focused on data instead of context. While it is advisable to expose Submodels with help of 
a full-fletched AAS-server SDK that provides the content-modifiers and API-endpoints out-of-the-box, this is not yet 
mandatory.

#### Digital Twin Registry

What Catena-X calls the "Digital Twin Registry" (DTR) is actually the union of two different services that the AAS specification
has specified. For the sake of simplicity, they are both defined in a single service. The DTR serves a similar function as the
index in a book: When trying to discover information, it's convenient to have an overview WHAT one will find and HOW to
access it. The registry caters exactly that information: For every asset it knows, it holds a number of Submodel Descriptors and in 
these, a consumer app will find information WHAT it will find (via the semanticId) and how to access the information (endpoint,
security setup etc.). As the information contained in the DTR may be sensitive and not be trusted with a central entity,
every data provider must offer his own DTR as an EDC Data Asset.

### Catena-X specific Services

DTRs hold sensitive information: a SubmodelDescriptor may not give access to the actual Submodel-data but all in cumulo hint at 
production volumes as each Twin represents an asset. Therefore, Catena-X implements decentral DTRs (DDTR), each running with a 
business partner. [In an IDTA-Whitepaper](https://industrialdigitaltwin.org/en/wp-content/uploads/sites/2/2023/06/Decentralized-Registries-Taxonomy-of-decentralized-registries-and-an-architectural-overview_.pdf ),
several high-level concepts for DDTRs are introduced. The AAS-specification remains agnostic to the approaches and endorses
none of them. Catena-X must deal with the additional complexity that stems from the interaction with the EDC.

Leveraging the native capabilities of the EDC and the EDC Discovery Service, Catena-X uses a discovery pattern that has the
same capability as a central [Digital Twin Registry](#digital-twin-registry): It allows to start a Discovery Process with only an AssetId and 
As none of the options fit the data-space-specific requirements of Catena-X entirely, yet a different approach is implemented:
However, in Catena-X some of the data is deemed so sensitive that a central authority can't be
trusted with it. Thus, each Data Provider will run their own DTR which poses a challenge for discovery. After all, a
Data Consumer must still find out the address where to fetch the data from. That's why Catena-X has introduced a 
three-step discovery pattern made up of the central microservices Discovery Finder, BPN Discovery (or several of them) 
and finally the EDC discovery that is part of the CX-Portal. They are also part of this Kit.

<!-- Recommended -->
## Sample Data

Generic sample data for relevant data objects is contained in the openAPI-specs of the respective services. This chapter 
contains data structures that are more specifically designed for use in the Digital Twin Kit. They are compliant with
the base-specifications (like AAS) but restrict the application even further for use in this dataspace.

### Registration at EDC

While the exact integration with the EDC is still at the discretion of each Kit and use case, there are best-practices
that are likely to be standardized in the future. An example is HOW the EDC-shielded parts of this Kit should register
with the EDC Management API. Please note that these recommendations are based on the schemas of EDC v0.3.0. As the
schema has changed in the meantime, an update will be provided when available. The current recommendation is:

#### Digital Twin Registry as EDC Data Asset

````json
{
  "asset": {
    "properties": {
        "asset:prop:id": "<EDC_ASSET_ID>",
        "asset:prop:type": "data.core.digitalTwinRegistry",
        "asset:prop:name": "Digital Twin Registry Endpoint of provider XYZ",
        "asset:prop:contenttype": "application/json",
        "asset:prop:policy-id": "use-eu"
    }
  },
  "dataAddress": {
    "properties": {
        "type": "HttpData",
        "baseUrl": "https://<YOUR_DIGITAL_TWIN_REGISTRY_URL>",
        "proxyPath": true,
        "proxyBody": true,
        "proxyMethod": true,
        "proxyQueryParams": true 
    }
  }
}
````

`asset:prop:id` describes the id of the Data Asset, not of any offered resources themselves. 

#### Submodel as EDC Data Asset

How a Submodel server is offered as a Data Asset is not yet agreed and will be added here soon.
```json

```

### Registration at Digital Twin Registry

The Submodel Descriptors in the DTR must not only follow the schema defined by the openAPI file. Additionally, it is 
imperative that the network mandates how they shall be populated with data. This is especially critical because the
data access is not straight-forward but passes through an EDC which the Data Consumer must negotiate with. That's why
the subprotocol body holds information on how to talk to the EDC's Data Plane.
````json
{
  "id": "<unique ID of submodel>",
  "semanticId": {
    "type": "ExternalReference",
    "keys": [
      {
        "type": "GlobalReference",
        "value": "urn:bamm:io.catenax.material_for_recycling:1.1.0#MaterialForRecycling"
      }
    ]
  },
  "endpoints": {
    "protocolInformation": {
      "href": "https://edc.data.plane/<path>/submodel",
      "endpointProtocol": "HTTP",
      "endpointProtocolVersion": [
        "1.1"
      ],
      "subprotocol": "DSP",
      "subprotocolBody": "<body with information required by subprotocol>",
      "subprotocolBodyEncoding": "plain",
      "securityAttributes": [
        {
          "type": "NONE",
          "key": "NONE",
          "value": "NONE"
        }
      ]
    },
    "interface": "SUBMODEL-3.0"
  }
}
````
Currently, this structure is still ambiguous (see `subprotocolBody`) but will be subject to further standardization introducing
more clarity across use cases and Kits.

<!-- Recommended -->

## Data Provisioning

### Patterns

Data Providers will usually follow one of two patterns:
1. Digital Twin Repository: Deploying a dedicated Repository for the persistence of digital twins and related data is the most
convenient way to get going with the AAS. Due to the risk of data duplication and unclear initial ingestion mechanisms,
it may not scale to industrial sizes.
2. Delegation: Wrapping another API or a database may deploy the Submodel API as a new facade. It delegates the incoming
requests to the respective backend systems. 

Offering data to the network requires mappings that are naturally dependent on the data source format. More on data integration
can be found in the corresponding [CX e.V. guide](https://catena-x.net/fileadmin/user_upload/04_Einfuehren_und_umsetzen/Onboarding/DataIntegrationPatterns_Guide_Final_V1.pdf).

### Register Digital Twins

As mentioned in CX - 0002, every Data Provider is required not only to deploy a DTR in his infrastructure but also to
register each of the Submodels. Otherwise, the data will not be discoverable by Data Consumers.