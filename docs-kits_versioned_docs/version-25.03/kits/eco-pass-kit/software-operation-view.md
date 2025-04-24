---
id: software-operation-view
title: Operation View
description: 'EcoPass Kit Operation View'
---

![EcoPass KIT Pictotogram](@site/static/img/kits/eco-pass/eco-pass-kit-logo.svg)

## EcoPass KIT

Based on the information provided in this kit, it is possible to run and program against an infrastructure of Digital Product Pass the Catena-X-way. This infrastructure empowers Data Consumers to consume the network's data as agreed with each Data Provider and facilitated by an Operating Company. They run central and decentral services that allow them to discover each other, exchange information and contextualize it according to a standardized semantics.

| Service Name          | Description                                                                                                                                                                                                             | Reference Implementation                                                                                                                                                                                                                                                                                     | [Standardized in](https://catena-x.net/de/standard-library) |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Portal/IAM            | The central component of the Catena-X network. The Federated IAM from Catena-X is provided by the portal where you can manage the users and roles for the applications.                                                 | [Portal](https://github.com/eclipse-tractusx/portal-backend)                                                                                                                                                                                                                                                 | CX - 0015                                                   |
| Discovery Finder      | A microservice resolving a type of identifiers against a set of BPN-Discovery Servers.  Responsible to give the search endpoints for a type of id                                                                       | [eclipse-tractusx/sldt-discovery-finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                                                                                                                                                                          | CX - 0053                                                   |
| BPN Discovery         | A microservice resolving a particular assetId against the registered BPN of its owner. Responsible for indicating the BPNs for the IDs registered by the providers                                                      | [eclipse-tractusx/sldt-bpn-discover](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                                                                                                                                                                 | CX - 0053                                                   |
| EDC Discovery         | A microservice that resolves a BPN against an EDC endpoint. Responsible for giving the EDC endpoints of one or more BPNs                                                                                                | [eclipse-tractusx/portal-backend](https://github.com/eclipse-tractusx/portal-backend) - [Code Implementation](https://github.com/eclipse-tractusx/portal-backend/blob/aca855c857aed309cbca03f4f694283629197110/src/administration/Administration.Service/Controllers/ConnectorsController.cs#L178C1-L190C63) | CX - 0001                                                   |
| Digital Twin Registry | An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. Responsible for having the Digital Twins of the provider and indicating the endpoints to the Passport Aspects. | [eclipse-tractusx/sldt-digital-twin-registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                                                                                                                                                                                | CX - 0002        OR [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)                                           |
| Submodel Server       | The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0. Where the Passport Aspects are stored                                                                                            | [FA³ST-Framework](https://github.com/FraunhoferIOSB/FAAAST-Service), [Eclipse Basyx](https://github.com/eclipse-basyx/basyx-java-sdk), [AASX Server](https://github.com/admin-shell-io/aasx-server)                                                                                                          | CX - 0002                                                   |
| EDC                   | Main gateaway to the network. In this use case two EDC need be existing, one connected to the Digital Product Pass (EcoPass KIT) [EDC Consumer] and another to the Provider Catena-X components [EDC Provider]          | [eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc)                                                                                                                                                                                                                            | CX - 0018 OR [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)                                          |
| Digital Product Pass  | The [**EcoPass KIT**] reference implementation. The application is responsible for retrieving the passports and interacting with the services listed above.                                                             | [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)                                                                                                                                                                                                            | CX - 0143                                                   |

## Configuration Guide

In order to get the Digital Product Pass working, an EDC needs to be configured and assets need to be created so that the application is able to perform the communications.

> **NOTE:**
*This documentation is based on the Digital Product Pass Admin Guide. For the complete information check the CX-0096-TriangleForDigitalProductPass Standard or the [Admin Guide](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/admin%20guide/Admin_Guide.md)*

## EDC Provider Configuration

When configuring your EDC Provider you need to take into consideration the following guidelines and formats:

> **NOTE:**
*Please take into consideration following our Postman Collection while setting your EDC Provider*

### Documentation Description

**All variables are written in the following notation: _**\{\{ VARIABLE_NAME \}\}**_**

All the configurations are in JSON notation and follow the [EDC Configuration from Catena-X](https://github.com/eclipse-tractusx/tractusx-edc) and the [Eclipse Foundation](https://github.com/eclipse-edc/Connector).

### Asset Configuration

When configurating your EDC provider you will be able to set some assets which refer to a certain endpoint.

> **INFO:** *All public assets must be registered in a SubModel from a Digital Twin in the Digital Twin Registry.*

#### Variables

| Name                    | Description                                                                                                                      | Example Value                                                                                                                                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AssetId                 | Combination of Digital Twin and Sub Model UUIDs                                                                                  | **Example value for asset**: `urn:uuid:0ec8cf2b-f58e-3f13-b5ef-e7dd01d15b19` <br/>**Example value for registry**: `digital-twin-registry`                                                                                                                                                                    |
| Description             | Simple description of the asset                                                                                                  | Battery Passport Test Data                                                                                                                                                                                                                                                                               |
| DataProviderEndpointUrl | URL to the endpoint which stores and serves the data, basically a Database that retrieves plain text/json data for a certain API | **Example value for asset**: `https://submodel.server.url/{{path}}/{{DigitalTwinSubmodelId}}` <br/> **Example value for registry**: `https://dpp-base.url/semantics/registry/api/v3.0` |
| DigitalTwinId           | Id from the Digital Twin                                                                                                         | urn:uuid:de98db6e-8e05-5d8e-8ae8-9f702cf5c396                                                                                                                                                                                                                                                            |
| DigitalTwinSubmodelId   | Sub Model Id registered in the Digital Twin Registry                                                                             |                                                                                                                                                                                                                                                                                                          |

#### Format and Fields

> [!IMPORTANT]
>
> Follow the [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)  configuration for the assets regarding the submodel server. Which shall give the url to retrieve the submodels as defined in the digital product pass standard [CX-0096]

Example:

```json
{
    "@context": {
      "edc": "https://w3id.org/edc/v0.0.1/ns/",
      "cx-common": "https://w3id.org/catenax/ontology/common#",
      "cx-taxo": "https://w3id.org/catenax/taxonomy#",
      "dct": "https://purl.org/dc/terms/"
    },
    "@id": "{{AssetId}}",
    "properties": {
        "description": "{{Description}}",
        "contenttype": "application/json",
"dct:type": {
          "@id": "cx-taxo:Submodel"
        }
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "proxyPath": "true",
        "proxyBody": "true",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "baseUrl": "{{DataProviderEndpointUrl}}"
    }
}
```

When configurating your EDC provider you will be able to set some assets which refer to a certain endpoint.

### Policies Configuration

> [!TIP]
>
> Follow the latest [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)  configuration regarding the policies! The information included here in this guide intends to show which contraints needs to be included in the policy configuration. Like example: `Membership: Active` and `FrameworkAgreement.sustainability`

Policies are important for configuration the **access, prohibitions, obligations and permissions to certain assets.**

A policy can have more and less configurations, depending on the restrictions you want to give to each asset.

Here we specify a simple policy with just the USAGE permission, so we are able to retrieve the whole asset without obligations and prohibitions.

#### Usage Policies

| Policy Name             | Description                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Usage Permission Policy | In order to use/access the assets from the EDC Provider the Usage Policy is required |

> **NOTE:**
*At the moment only Usage Permission Policies are assigned to assets, however restriction policies could be also configured if it is required for a specific use case.*

#### Policies Variables

| Name                 | Description                                                                                                                      | Example Value                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| PolicyId             | UUID that identifies the policy in the EDC Connector                                                                             | ad8d2c57-cf32-409c-96a8-be59675b6ae5 |
| PermissionType       | DID Permission Type                                                                                                              | PolicyDefinitionRequestDto           |
| PermissionActionType | Defines the action allowed when the permission is assigned to an asset. In case of the usage policy the value "USE" is necessary | "USE"                                |
| BPN                  | Consumer's Business Partner Number                                                                                               | BPNL000000000000                     |

#### Policies Format and Fields

To allow partners to access information use this policy with the BPN number included:

```json
{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "@type": "{{PermissionType}}",
    "@id": "{{PolicyId}}",
    "policy": {
    "@type": "Policy",
    "odrl:permission" : [{
          "odrl:action": "{{PermissionActionType}}",
          "odrl:constraint": {
            "odrl:constraint": {
              "@type": "LogicalConstraint",
              "odrl:or": [
                {
                  "@type": "Constraint",
                  "odrl:leftOperand": "BusinessPartnerNumber",
                  "odrl:operator": "EQ",
                  "odrl:rightOperand": "{{BPN}}"
                }
              ]
            }
          }
        }]
    }
}
```

For framework agreement and membership in Catena-X configure this policy:

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "{{PermissionType}}",
  "@id": "{{PolicyId}}",
  "policy": {
    "@type": "Policy",
    "odrl:permission" : [
      {
        "odrl:action":"{{PermissionActionType}}",
        "odrl:constraint": {
          "@type": "LogicalConstraint",
          "odrl:and": [
            {
              "@type": "Constraint",
              "odrl:leftOperand": "Membership",
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "active"
            },
            {
              "@type": "Constraint",
              "odrl:leftOperand": "FrameworkAgreement.sustainability",
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "active"
            }
          ]
        }
      }
    ]
  }
}

```

### Contract Definition Configuration

Contract definitions allow us to expose the assets and link them to a contract policy and an access policy.

> **INFO:** *Remember that all **policies and assets** you bind to a contract **must be defined in the same EDC Connector** and linked through their ID in the configuration from the contract.*

#### Contract Definition Variables

| Name                 | Description                                                    | Example Value                                                                                                                          |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ContractDefinitionId | UUID that identifies the policy in the EDC Connector           | 76b50bfc-ec19-457f-9911-a283f0d6d0df                                                                                                   |
| AssetId              | Combination of Digital Twin and Sub Model UUIDs                | **Example value for asset**: urn:uuid:0ec8cf2b-f58e-3f13-b5ef-e7dd01d15b19 <br/> **Example value for registry**: digital-twin-registry |
| AccessPolicyId       | Policy that allows/restricts/enforces asset access constraints | ad8d2c57-cf32-409c-96a8-be59675b6ae5                                                                                                   |
| ContractPolicyId     | Policy that allows/restricts/enforces contract constraints     | ad8d2c57-cf32-409c-96a8-be59675b6ae5                                                                                                   |

#### Contract Definition Format and Fields

> **INFO:** *For testing purposes and in order to ease the access to your assets we are going to define the **same policy as accessPolicy and as contractPolicy**. However, you are recommended to configure two separated policies and specify them adapting each one of them to your specific needs.*

```json
{
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
    },
    "@id": "{{ContractDefinitionId}}",
    "@type": "ContractDefinition",
    "accessPolicyId": "{{AccessPolicyId}}",
    "contractPolicyId": "{{ContractPolicyId}}",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
        "operator": "=",
        "operandRight": "{{AssetId}}"
    }
}
```

### Digital Twin Registration

> **INFO:** *You need to be able to request tokens for the **Catena-X Central IAM** in order to **configure Digital Twins** in the Registry.*

Once you finish the configuration, to make the endpoint public configure your digital twin in the following way:

> [!IMPORTANT]
>
> The information displayed here is just an example how to configure you digital twin registry aspect so that the DPP Application can retrieve it. For more detailed and updated guidelines check also the [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)

#### Digital Twin Variables

| Name                  | Description                                                                                                                                              | Example Value                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| DigitalTwinId         | Manually generated DID that contains a UUID                                                                                                              | 32aa72de-297a-4405-9148-13e12744028a                       |
| DigitalTwinSubmodelId | Sub Model Id registered in the Digital Twin Registry                                                                                                     | 699f1245-f57e-4d6b-acdb-ab763665554a                       |
| PartInstanceId        | Battery passport DMC code or the part instance Id                                                                                                        | X123456789012X12345678901234566                            |
| manufacturerPartId    | The Part Id given by the manufacturer, it idenfies the type of the product                                                                               | XYZ78901                                                   |
| EDCProviderUrl        | URL to the endpoint which contains the EDC Provider                                                                                                      | [https://edc.control.plane/](https://edc.control.plane/)   |
| BPN                   | OPTIONAL: The endpoint address can include a BPN number, which shall lead to the EDC Provider, and return the contracts when called from an EDC Consumer | BPNL000000000000                                           |
| SubmodelIdShort       | EXACT STRING REQUIRED: The submodel id of the battery passports needs to be exactly the string: "batteryPass"                                            | **batteryPass**                                            |
| BammModelVersionId    | The semantic version of the asset passport model, currently the  version v4.0.0 is used                                                                  | urn:samm:io.catenax.battery.battery_pass:4.0.0#BatteryPass |

> **INFO:** *It is important that the "SubmodelIdShort" is set in the correct format and that the EDCProviderUrl points to an valid EDC Provider, that provides valid contracts configured in the structure defined here.*

#### Digital Twin Format and Fields

```json
{
    "description": [
        {
            "language": "en",
            "text": "Battery Passport shell descriptor"
        }
    ],
    "idShort": "Battery_{{PartInstanceId}}",
    "id": "{{DigitalTwinId}}",
    "specificAssetIds": [
      {
          "name": "manufacturerPartId",
          "value": "{{manufacturerPartId}}",
          "externalSubjectId": {
            "type": "ExternalReference",
            "keys": [
              {
                "type": "GlobalReference",
                "value": "{{BPN}}"
              },
              {
                "type": "GlobalReference",
                "value": "PUBLIC_READABLE"
              }
            ]
          }
        },
        {
          "name": "partInstanceId",
          "value": "{{PartInstanceId}}",
          "externalSubjectId": {
            "type": "ExternalReference",
            "keys": [
              {
                "type": "GlobalReference",
                "value": "{{BPN of partner}}"
              }
            ]
          }
        },
        {
          "key" : "assetLifecyclePhase",
          "value": "AsBuilt"
        }
    ],
   "submodelDescriptors":[
      {
        "endpoints": [
          {
            "interface": "SUBMODEL-3.0",
            "protocolInformation": {
              "href": "https://edc.data.plane/{{path}}/urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
              "endpointProtocol": "HTTP",
              "endpointProtocolVersion": [
                "1.1"
              ],
              "subprotocol": "DSP",
              "subprotocolBody": "{{body with information required by subprotocol}}",
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
        ],
        "idShort": "batteryPass",
        "id": "urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
        "semanticId": {
          "type": "ExternalReference",
          "keys": [
            {
              "type": "Submodel",
              "value": "urn:samm:io.catenax.battery.battery_pass:4.0.0#BatteryPass"
            }
          ]
        },
        "description": [
          {
            "language": "en",
            "text": "Battery Passport Submodel"
          }
        ],
        {
          "endpoints": [
            {
              "interface": "SUBMODEL-3.0",
              "protocolInformation": {
                "href": "https://edc.data.plane/{{path}}/urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
                "endpointProtocol": "HTTP",
                "endpointProtocolVersion": [
                  "1.1"
                ],
                "subprotocol": "DSP",
                "subprotocolBody": "id=urn:uuid:3e4a5957-f226-478a-ab18-79ced49d6195;dspEndpoint=https://edc.control.plane/",
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
          ],
          "idShort": "digitalProductPass",
          "id": "urn:uuid:777a3f0a-6d29-4fcd-81ea-1c27c1b870cc",
          "semanticId": {
            "type": "ExternalReference",
            "keys": [
              {
                "type": "Submodel",
                "value": "urn:samm:io.catenax.generic.digital_product_passport:3.0.0#DigitalProductPassport"
              }
            ]
          },
          "description": [
            {
              "language": "en",
              "text": "Digital Product Passport Submodel"
            }
          ]
        }
      }
    ]
    }
```

> **NOTE:**
*The BPN number is not required for the configuration of the endpoint, just **make sure that the host is pointing to the EDC Provider**.*

### Digital Twin Registry Configuration

When configuring the digital twin registry behind the EDC Provider you should follow this EDC Registration guidelines:

#### Digital Twin Registry Variables

| Name         | Description                                 | Example Value                             |
| ------------ | ------------------------------------------- | ----------------------------------------- |
| registryUrl  | The base url from the digital twin registry | [https://dpp-base.url/semantics/registry](https://dpp-base.url/semantics/registry) |
| registryAssetId | The name from the asset for the registry    | digital-twin-registry                     |

#### Digital Twin Registry Format and Fields

```json
{
    "@context": {
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "cx-common": "https://w3id.org/catenax/ontology/common#",
        "cx-taxo": "https://w3id.org/catenax/taxonomy#",
        "dct": "https://purl.org/dc/terms/"
    },
    "@id": "{{registryAssetId}}",
    "properties": {
        "type": {
            "@id": "DigitalTwinRegistry"
        },
        "version": "3.0",
        "asset:prop:type": "data.core.digitalTwinRegistry"
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "baseUrl": "{{registryUrl}}",
        "proxyQueryParams": "true",
        "proxyPath": "true",
        "proxyMethod": "true",
        "proxyBody": "true"
    }
}
```

## Item Relationship Service Integration

In order to enable the drill down in passports retrieved by the Digital Product Pass Application you will need to first deploy the IRS [Item Relationship Service](https://github.com/eclipse-tractusx/item-relationship-service) and connect it to the Digital Product Pass application.

For creating relationships between the digital twins register "singleLevelBomAsBuilt" and "singleLevelBomAsUsage" aspects which can be found here: [SingleLevelBomAsBuilt](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_usage_as_built) and [SingleLevelUsageAsBuilt](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_usage_as_built)

> **IMPORTANT**!: The proxy configuration needs to be enabled exactly like it is configured in the dataAdress property above.

The rest of the assets can be configured in the same way as the normal assets.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. für ihre Institute IPK und IPK
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)
