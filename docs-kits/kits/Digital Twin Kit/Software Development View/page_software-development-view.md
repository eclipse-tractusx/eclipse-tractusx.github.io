---
id: dt-kit-software-development-view
title: Developing with the DT KIT
description: 'Digital Twin KIT - Software Development View'
sidebar_position: 1
---


<!--
Development View of the Kit.
-->

![DT Kit Pictotogram](/img/kit-icons/digital-twin-kit-icon.svg)

### Digital Twin KIT

<!-- !Mandatory! -->

## Architecture Overview

The interplay of the Digital Twin Kit's components can be found in
the [Operation View](../page_software-operation-view.md).

## API Specifications

All openAPI-specifications for the Digital Twin Kit services are rendered in the
section [of these docs](API%20AAS%20Discovery/dotaas-part-2-http-rest-discovery-service-specification.info.mdx)

### Asset Administration Shell

The Asset Administration Shell (AAS) is a specification that is released by
the [Industrial Digital Twin Association (IDTA)](https://industrialdigitaltwin.org/)
with a perspective to be adopted by the [International Electrotechnical Commission (IEC)](https://www.iec.ch/homepage) as
IEC 63278.

Its mission is defining how “information about assets […] can be exchanged in a meaningful way between partners in a
value creation network” ([IDTA 01001-3-0](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01001-3-0_SpecificationAssetAdministrationShell_Part1_Metamodel.pdf)
, p.12) . As such, it is well-suited to contribute to the toolbox of Catena-X. While the Spec offers an
extensive suite of meta-model elements and APIs, Catena-X only mandates a small subset that is defined in CX - 0002.

#### Submodels

An Asset Administration Shell is organized in Submodels. Each Submodel represents a self-contained aspect of an asset -
typical examples are the *PartAsPlanned* or *SingleLevelBomAsBuilt* (which denotes the hierarchical composition of
parts into a whole). All relevant Submodels for Catena-X can be are built from SAMM models and can be found on [Github](https://github.com/eclipse-tractusx/sldt-semantic-models/).
As different aspects of an Asset may be known to different parties on the value-chain, Submodels
for a single asset must be capable to run independently of each other. The specification explicitly allows this,
enabling easy cross-company data integration.

Recognizing that not all use-cases require the full functionality of the AAS-Spec, Catena-X demands that Data
Providers offer only a subset of the SubmodelServiceSpecification - namely the `$value` serialization. This is an
abbreviated notation of an AAS-Submodel that is focused on data instead of context. While it is advisable to expose
Submodels with help of a full-fletched AAS-server SDK that provides the content-modifiers and API-endpoints
out-of-the-box, this is not yet mandatory.

#### Digital Twin Registry

What Catena-X calls the "Digital Twin Registry" (DTR) is actually the union of two different services that the AAS
specification
has specified. For the sake of simplicity, they are both defined in a single component. The DTR serves a similar
function as the
index in a book: When trying to discover information, it's convenient to have an overview WHAT one will find, HOW and
WHERE to
access it. The registry caters exactly that information: For every asset it knows, it holds a number of Submodel
Descriptors and in
these, a consumer app will find information what it will find (via the semanticId) and how to access the information (
endpoint,
security setup etc.). As the information contained in the DTR may be sensitive and not be trusted with a central entity,
every data provider must offer his own DTR as an EDC Data Asset. While it is only mandatory to implement the GET
endpoints
as specified in
the [Development View](API%20AAS%20Registry/dotaas-part-2-http-rest-registry-service-specification.info.mdx),
data providers may find it useful to implement other requests for registration
on top. Either way, they are free to populate their DTR in any way they desire.

### Catena-X specific Services

DTRs hold sensitive information: a submodel-descriptor may not give access to the actual Submodel-data but all in cumulo
hint at
production volumes as each Twin represents an asset. Therefore, Catena-X implements decentral DTRs (DDTR), each running
with a
business partner.
[In an IDTA-Whitepaper](https://industrialdigitaltwin.org/en/wp-content/uploads/sites/2/2023/06/Decentralized-Registries-Taxonomy-of-decentralized-registries-and-an-architectural-overview_.pdf),
several high-level concepts for DDTRs are introduced. The AAS-specification remains agnostic to the approaches and
endorses
none of them. Catena-X must deal with the additional complexity that stems from the interaction with the EDC.

Leveraging the native capabilities of the EDC and the EDC Discovery Service, Catena-X uses a discovery pattern that has
the same capability as a central [Digital Twin Registry](#digital-twin-registry) would:
It allows to start a Discovery Process with only an assetId and its type (like `manufacturerPartId`).
However, in Catena-X some of the data is deemed so sensitive that a central authority can't be
trusted with it. Thus, a decentralized approach is implemented: each Data Provider will run their own DTR.
This poses a challenge for discovery if the BPN of the supplier is not known by the data consumer. After all, a
Data Consumer must still find out the address where to fetch the data from. That's why Catena-X has introduced a
three-step discovery pattern made up of the central microservices Discovery Finder, BPN Discovery (or several of them)
and finally the EDC discovery that is part of the CX-Portal.
The Discovery Finder and the BPN Discovery service are described as part of this Kit.

## Sample Data

Generic sample data for relevant data objects is contained in the openAPI-specs of the respective services. This chapter
contains data structures that are more specifically designed for use in the Digital Twin Kit. They are compliant with
the base-specifications (like AAS) but restrict the application even further for use in this Dataspace.

### Registration at Digital Twin Registry

The Digital Twin Registry connects an asset (identified by its assetIds) with links to the Submodels. Since Catena-X
uses
the EDC as a gateway for all inter-company interaction, the Digital Twin Registry must account for that. By design, it
includes the possibility to add additional context via the fields `subprotocol`, `subprotocolBody`
and `subprotocolEncoding`.
`subprotocol` will always be set to `DSP`, short for
the [Dataspace Protocol](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/overview/readme)
as standardized by the IDSA. `subprotocolEncoding`  is always set to `plain`.

There's three relevant inputs to discover a referenced Submodel in Catena-X:

- The `subprotocolBody` contains two pieces of information, assigned with `=` and separated by `;`:
  - `dspEndpoint` is the URL of the Control Plane where a Data Consumer can negotiate for access to this Submodel. For
    many
    connector-implementations, this will end on `/api/v1/dsp`. As this property will be used in the discovery sequence
    to construct a `catalog`-request, this variable is equivalent to the `<base>`
    in [this example](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/catalog/catalog.binding.https#id-2.1-prerequisites)
    in the DSP-spec.
    - When calling the /catalog API of that Control Plane, a Consumer should filter for `dcat:Dataset` entries that are
      identified by the `id` mentioned in the `subprotocolBody`. For communication between two EDCs, the Consumer could
      query with the following payload:

      ```json
      {
      "@context": {
          "edc": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@type": "CatalogRequest",
      "counterPartyAddress": "{{provider-dsp-endpoint}}",
      "protocol": "dataspace-protocol-http",
      "querySpec": {
          "offset": 0,
          "limit": 50,
          "filterExpression": [
              {
                  "@context": {
                      "edc": "https://w3id.org/edc/v0.0.1/ns/"
                  },
                  "@type": "edc:Criterion",
                  "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
                  "operator": "=",
                  "operandRight": "{{assetId}}"
              }
          ]
        }
      }
      ```

- After having successfully negotiated for a Data Offer associated with the `id`, the Data Consumer can query the Data
  Plane of the given EDC to access the data. For that, the Provider must use the URL given in the Submodel-Descriptor's
  `href` field and append the additional URL-segment `/$value`.

#### Registering a new Twin

Registration of a new twin is (at least in Catena-X) equivalent to the creation of a new twin. Thus, a Data Provider
should always ensure that there is no AAS-descriptor created for the respective assetIds yet. If there already is one,
the submodel-descriptor should
be [added to the existing shell-descriptor](#registering-a-new-submodel-at-an-existing-twin).

`POST /shell-descriptors`

```json
{
  "id": "urn:uuid:e5c96ab5-896a-1234-8761-efd74777ca97",
  "idShort": "myAas",
  "specificAssetIds": [
    {
      "name": "manufacturerPartId",
      "value": "123-345-567103",
      "externalSubjectId": {
        "type": "ExternalReference",
        "keys": [
          {
            "type": "GlobalReference",
            "value": "{{BPN of the party privileged}}"
          }
        ]
      }
    }
  ],
  "submodelDescriptors": [
    {
      "id": "e5c96ab5-896a-482c-8761-efd74777ca97",
      "semanticId": {
        "type": "ExternalReference",
        "keys": [
          {
            "type": "GlobalReference",
            "value": "urn:bamm:io.catenax.material_for_recycling:1.1.0#MaterialForRecycling"
          }
        ]
      },
      "endpoints": [
        {
          "interface": "SUBMODEL-3.0",
          "protocolInformation": {
            "href": "https://edc.data.plane/mypath/submodel",
            "endpointProtocol": "HTTP",
            "endpointProtocolVersion": [
              "1.1"
            ],
            "subprotocol": "DSP",
            "subprotocolBody": "id=123;dspEndpoint=http://edc.control.plane/api/v1/dsp",
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

#### Registering a new Submodel at an existing Twin

`POST /shell-descriptors/{{aasId}}`

```json
{
  "id": "e5c96ab5-896a-482c-8761-efd74777ca97",
  "semanticId": {
    "type": "ExternalReference",
    "keys": [
      {
        "type": "GlobalReference",
        "value": "urn:bamm:io.catenax.material_for_recycling:1.1.0#MaterialForRecycling"
      }
    ]
  },
  "endpoints": [
    {
      "interface": "SUBMODEL-3.0",
      "protocolInformation": {
        "href": "https://edc.data.plane/mypath/submodel",
        "endpointProtocol": "HTTP",
        "endpointProtocolVersion": [
          "1.1"
        ],
        "subprotocol": "DSP",
        "subprotocolBody": "id=123;dspEndpoint=http://edc.control.plane/api/v1/dsp",
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

```

<!-- Recommended -->

### Registration at EDC

Integration between the EDC and AAS-Components in the dataspace is a strict prerequisite for robust discovery and data
access
in the Catena-X dataspace. As all data that crosses company-boundaries must be exchanged via an EDC, CX-0002 provides
the necessary normative statements to facilitate interoperable data exchange.

One relevant question is how the EDC-shielded services of this Kit should register with the Asset endpoint of the EDC
Management API.
While the EDC's /v3/assets endpoint is internal to the Data Provider only, the objects are also available via the
/catalog API
that is specified in the Dataspace Protocol.

The EDC uses json-ld. Json-ld is a serialization for RDF graphs (
see [Resource Description Framework](https://www.w3.org/RDF/)). The json-ld
`@context` section can declare the namespaces that resources explicitly mentioned in the rest of the document belong to.
It may also define default namespace with `@vocab` for resources without explicitly stated namespaces. Outside of
the "@context" section, the `@type` property always defines the class that an object belongs to.
As stated in the openAPI-specification of the EDC Management API's relevant endpoint, all entries in the
`asset/properties` object and the `privateProperties` object can be chosen freely. The section on the `dataAddress` is
structured depending on the `edc:type` property. The example below is determined by the [HttpDataAddress](https://github.com/eclipse-edc/Connector/blob/main/spi/common/core-spi/src/main/java/org/eclipse/edc/spi/types/domain/HttpDataAddress.java)
class. Its parameters determine the behavior of the EDC's HTTP data plane at runtime. How they should be used is not
subject to standardization since they aren't visible in the Dataspace. Certain values may have to be set in a certain
way to enable the data exchange via the DT Kit.

It presents the backend resources as dcat:Datasets with properties funnelled through from the assets-API. These
properties can be freely set by the Data Provider.

For successful discovery of Digital Twins, it is critical to register Submodels and Digital-Twin-Registries in a
harmonized way. The following overview shall explain how the `asset/properties` section could be used.

- `https://purl.org/dc/terms/type` (mandatory as per CX-0018): denotes the type of Asset that is registered. The
  property
  points to an RDF resource. In the context of digital twins two predefined resources are of
  relevance: `https://w3id.org/catenax/taxonomy#DigitalTwinRegistry` and `https://w3id.org/catenax/taxonomy#Submodel`

- `https://w3id.org/catenax/common/version` (mandatory as per CX-0002): version-string of the registered type of
  resource.
  For all endpoints related to the AAS-spec, this must be set to "3.0" as that's the current normative version of the
  AAS specification.

#### Digital Twin Registry as EDC Data Asset

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "{{ _.edcAssetId }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:DigitalTwinRegistry"
    },
    "cx-common:version": "3.0"
  },
  "privateProperties": {
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ _.url_backend }}",
    "proxyQueryParams": "true",
    "proxyPath": "true",
    "proxyMethod": "false",
    "oauth2:tokenUrl": "{{ _.url_keycl_backend }}",
    "oauth2:clientId": "{{ _.client_id_backend }}",
    "oauth2:clientSecretKey": "{{ _.sec_name_vault }}"
  }
}
```

The property `asset:prop:type` (deprecated and superseded by `dct:type` - see CX-0002) denotes the type of Asset that
is registered. For all AAS-registries this property had be set to `data.core.digitalTwinRegistry`. Providers may keep
this redundant property for backward compatibility purposes.

The HttpDataAddress above configures the following behavior:

- `baseUrl`: After successful negotiation, the data plane will delegate requests here and forward the answer. For the
  DTR,
  it's critical that the URL inserted here must end before the /shell-descriptors and /lookup segments.
- `proxyPath`: This string can be either "true" or "false". If set to true, the EDC Data Plane will always forward
  the URL-segments added to the request to the dataplane to the backend URL. For example:
  If `baseUrl="http://mydtr.com/api/v3"`
  and `proxyPath="true"` then an authorized request to `http://dataplane.com/shell-descriptors` will be delegated to the
  backend
  `http://mydtr.com/api/v3/shell-descriptors`
- `proxyQueryParams`: This string can be either "true" or "false". If set to true, the EDC Data Plane will always
  forward query parameters to the backend. For the /lookup APIs of the registry, this is critical.
- `proxyMethod`: This string can be either "true" or "false". If "false", the Data Plane will change the HTTP-Verb to
  GET for all incoming requests. As there is no scenario in the Catena-X scope where a business partner manipulates
  data in a foreign DTR, it should be set to false.

If a Data Consumer wants to filter a Data Provider's catalog (assuming both use an EDC-based connector), the following
payload can be used against the EDC Management API's `POST /catalog/request` endpoint:

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "CatalogRequest",
  "counterPartyAddress": "{{PROVIDER-DSP-ENDPOINT}}",
  "protocol": "dataspace-protocol-http",
  "querySpec": {
    "offset": 0,
    "limit": 50,
    "filterExpression": [
      {
        "@context": {
          "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@type": "edc:Criterion",
        "operandLeft": "'http://purl.org/dc/terms/type'.'@id'",
        "operator": "=",
        "operandRight": "https://w3id.org/catenax/taxonomy#DigitalTwinRegistry"
      }
    ]
  }
}
```

#### Submodel as EDC Data Asset

A Data Provider may create
one Data Asset per Submodel or bundle them into one - yielding a smaller catalogue hence better performance. The
discovery-sequence,
does not strictly require uniformity here. Not even the typization via the EDC-property `dct:type` is functionally
necessary. The discovery-sequence is still intact since a Data Consumer will always know the Submodel's
location relative to the Data Plane's `baseUrl` from the submodel-descriptor's `href` field.
The EDC-Asset shielding the Submodel is known from the descriptor's `subprotocolBody` containing the Control-Plane-URL
and
id of the EDC-Asset. For more details, see
section [Submodel Descriptor in the Digital Twin Registry](#registration-at-digital-twin-registry).

The following shows an example for registration of a single AAS-Submodel as EDC Data Asset. The
`properties` section is analogous to that of the DTR but additionally holds `hasSemantics:semanticId`. It is
recommended and shall signify the meaning of the Submodel's payload.

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "http://purl.org/dc/terms/",
    "aas-semantics": "https://admin-shell.io/aas/3/0/HasSemantics/"
  },
  "@id": "{{ _.assetId }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:Submodel"
    },
    "cx-common:version": "3.0",
    "aas-semantics:semanticId": {
      "@id": "urn:bamm:io.catenax.asset_tracker_links:1.0.0#AssetTrackerLinks"
    }
  },
  "privateProperties": {
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ _.url_backend }}",
    "oauth2:tokenUrl": "{{ _.url_keycl_backend }}",
    "oauth2:clientId": "{{ _.client_id_backend }}",
    "oauth2:clientSecretKey": "{{ _.sec_name_vault }}",
    "proxyQueryParams": "false",
    "proxyPath": "true",
    "proxyMethod": "false"
  }
}
```

There is no normative guidance yet on how to register multiple Submodels bundled together yet. These bundles may include
all the Submodels of a specific semanticId, all Submodels of an asset or any other arbitrary quality. This may be added
to
CX-0002 in future iterations. Even though the IDTA specifies a
[Submodel Repository API](https://app.swaggerhub.com/apis/Plattform_i40/SubmodelRepositoryServiceSpecification/V3.0.1_SSP-002),
in the context of the Catena-X architecture it is not strictly necessary to adhere to it. Submodels will be found
regardless,
given the URL-path relative to the `baseUrl` is appended correctly to the Data Plane's URL in the `href` field. The only
differences are the changed typization. `proxyPath` parameter should be set `"true"` either way.

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "{{ _.assetId }}",
  "properties": {
    "dct:type": {
      "@id": "cx-taxo:SubmodelBundle"
    },
    "cx-common:version": "3.0"
  },
  "privateProperties": {
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "{{ _.url_backend }}",
    "oauth2:tokenUrl": "{{ _.url_keycl_backend }}",
    "oauth2:clientId": "{{ _.client_id_backend }}",
    "oauth2:clientSecretKey": "{{ _.sec_name_vault }}",
    "proxyQueryParams": "false",
    "proxyPath": "true",
    "proxyMethod": "false"
  }
}
```

### Usage Policies

For Digital Twin Registries, Data Providers are encouraged to only extend Data Offers that make no explicit checks to
`FrameworkAgreements`. The DTR is an Enablement Service that should only deployed once per Network Participant as it
handles meta-data from multiple use-cases. Registering it with a `FrameworkAgreement` would require registering the same
backend resource multiple times.

For Submodel-APIs, Data Providers must follow the guidelines from their use-case-standards which will usually require
using the `FrameworkAgreement` specific to their use-case, mapping to credentials specific to their use-case.

## Data Provisioning

### Regulatory Compliance and Security

The services of this Kit will in many instances hold sensitive data. While sound access management is a prerequisite for
every webservice, it is especially important in case of the DTR and Submodels. As they hold competitively sensitive
data,
unauthorized access is not only a data leak but a potential violation of regulatory compliance such as anti-trust law.

That's why there are a couple shared requirements that DTR-deployments must adhere to:

- If a Data Consumer has no legitimate interest, a AAS-descriptor must not be returned when requested.
- If a Data Consumer has a legitimate interest, a AAS-descriptor must not include any data (like `specificAssetIds`)of
  companies other than the involved Data Provider and Data Consumer.
- If a Data Provider wants to share data publicly, a AAS-descriptor must only contain the
  attributes `id`, `submodelDescriptors`
  and those `specificAssetIds` that were issued by the Data Provider and contain no hints of existing business
  relationships.

As the above properties are exposed not only via the AssetAdministrationShellRegistry interface but also the Discovery
interface (via the `/lookup/shells` endpoint), it must not serve more data than specified above.

### Versioning

Versioning in the Catena-X network is an essential task. This holds true for Digital Twins more specifically, too. The
network builds on several specifications where changes in API or specifications could break existing communication
channels.
In a simple scenario (where the Data Provider offers access to a Submodel via DTR and a Data Consumer GETs both
resources), these are the layers of complexity:

| Versioned Object   | Presence in the DT-Discovery Process | Description                                                                                                                                                                                        | Method to increment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|--------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dataspace Protocol | 12, 22                               | The body of the `{{consumerControlPlane}}/v2/catalog/request`-request includes a reference to a versioned endpoint of a business partner's DSP endpoint like `{{providerControlPlane}}/api/v1/dsp` | As the design of the EDC's `/catalog/request`-API is an implementation detail, Consumers must consistently monitor its versioning. As the EDC-Management-API abstracts the DSP-messages, changes in the DSP may reflect in the Management-API but will not always do so. If a Consumer application decides to interact with the dataspace without mediation of the EDC, this changes.                                                                                                                                                                                                      |
| AAS Specification  | 4, 5, 15, 25                         | For all AAS-related EDC-Assets (styled as dcat:Dataset in the catalog), a property cx-common:version must be added referring to the major and minor version of the AAS-spec.                       | For a major change in the AAS-spec, a new set of Catalog entries must be created by the Data Provider in accordance with the standards. For minor changes (AAS 3.x), Data Providers must signal the version in the `https://w3id.org/catenax/common#version` property of their contract offers and update it with each minor or patch update that's supported. Minor versions must also be signalled in the `submodelDescriptor`.`ìnterface`.`protocol` property. If the Submodel API increments with a major version, a new `interface` object must be added to the `submodelDescriptor`. |
| Data Model Version | 5, 21, 29                            | The structure of the Submodel is determined by the aspect-model's URN. It includes a section on versioning.                                                                                        | A new version of the semantic model requires either setup of a new Submodel (with a new Submodel ID and the new semantic ID) or update of an existing submodel-descriptor (with updated semantic ID). This includes updating registration information at the DTR. Rules on backward compatibility need to be considered. It may be requested to offer two Submodel versions at the same time.                                                                                                                                                                                              |

Here's a list of duties for Data Providers in case they integrate a new Submodel (or version of an existing one) to an
existing
twin:

- Expose a new Submodel to the Dataspace. If its URL is a subpath of one that's already registered as a EDC-Asset,
  there is no need to specifically register it as a new EDC-Asset and create a Contract Definition for it. However,
  if there is no such EDC-Asset, that's what a Data Provider must do: create an EDC-Asset, connect it to policies via
  the contract-definition-API and let consumers negotiate for it.
- If assetIds are known, the aasId can be discovered via
  `GET https://mydtr.com/api/v3.0/lookup/shells?assetIds=foo&assetIds=bar`. The query-parameters' values are base64url-
  encoded `specificAssetId` objects. If multiple shall be logically AND-chained, a Consumer must use the query-
  parameter-key `assetIds` multiple times.
- `POST https://mydtr.com/api/v3.0/shell-descriptors/{{aasId}}/submodel-descriptors` with the (known or obtained)
  aasId in the path and the new submodel-descriptor in the body of the request. The attribute `semanticId` is
  mandatory for submodel-descriptors in Catena-X. As defined in CX-0002, semanticIds in Catena-X are aspect-model-urns
  (see CX-0003) including a version.

### Patterns for Submodel Deployment

Data Providers will usually follow one of two patterns:

1. Digital Twin Repository: Deploying a dedicated Repository for the persistence of digital twin submodels and related
   data is the most convenient way to get started with the AAS. It bears the risk of data duplication and introduces
   the necessity for synchronization mechanisms while on the other hand reducing computational load on the authoring
   systems that the data originates from.
2. Delegation: Wrapping an existing API with the AAS-Submodel API yields as a facade that is compliant to CX-0002.
   The wrapper delegates the incoming requests to the respective backend system. This is feasible in the
   Catena-X dataspace since offering data to the network requires mappings that are naturally dependent on the data's
   source format. More on data integration can be found in the corresponding [CX e.V. guide](https://catena-x.net/fileadmin/user_upload/04_Einfuehren_und_umsetzen/Onboarding/DataIntegrationPatterns_Guide_Final_V1.pdf). Equipping each
   Business Application with a Submodel-API-Wrapper will lead to a landscape of multiple Submodel-APIs that are
   linked by the DTR and visible in the Dataspace via a DSP-Connector.

Both approaches are architecturally valid. Data Consumers do not have to be aware about the deployment pattern employed
by the Provider - the traversal and discovery algorithm will work either way.

### Patterns for DTR Deployment

While it is generally possible to equip a Business Application not only with a Submodel- but also a DTR-facade, it is
generally bad practice. There should only be a single DTR in a Provider's catalog. If there were multiple, a Consumer
would have no way of knowing which DTR holds the relevant data, forcing him to iterate over all DTRs. This would
exponentially increase the number of HTTP calls necessary to retrieve the relevant data.

Usually, a DTR will implement a persistence with the specified AAS-APIs for data ingestion specified in the SSP-001
profile of the AssetAdministrationShellRegistryService by means of POST endpoints, updatable with PUT and PATCH
requests (see [reference implementation](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)). These APIs should only be accessible by the Data Provider (for instance
by introduction of proper access control scopes or setting `proxyMethod = false`, see [registration](#digital-twin-registry-as-edc-data-asset)). Delegation
as backend integration pattern is more inconvenient as the DTR must process and return reproducible IDs not only for
the assets but also for the AAS - this is hard to realize in a pure stateless implementation.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 Contributors of the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc)
