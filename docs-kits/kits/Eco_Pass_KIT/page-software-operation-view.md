<!--
#################################################################################
# Tractus-X - EcoPass KIT
#
# Copyright (c) 2022, 2024 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the
# License for the specific language govern in permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
##################################################################################
-->

---
id: Operation View EcoPass Kit
title: Operation View
description: 'EcoPass Kit Operation View'
sidebar_position: 3
---


![EcoPass KIT Pictotogram](./resources/img/EcoPassKIT_pictogram.png)

# EcoPass KIT

Based on the information provided in this kit, it is possible to run and program against an infrastructure of Digital Product Pass the Catena-X-way. This infrastructure empowers Data Consumers to consume the network's data as agreed with each Data Provider and facilitated by an Operating Company. They run central and decentral services that allow them to discover each other, exchange information and contextualize it according to a standardized semantics.



| Service Name          | Description                                                                                                                                                                                                             | Reference Implementation                                                                                                                                                                                                                                                                                     | [Standardized in](https://catena-x.net/de/standard-library) |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Portal/IAM            | The central component of the Catena-X network. The Federated IAM from Catena-X is provided by the portal where you can manage the users and roles for the applications.                                                                                 | [Portal](https://github.com/eclipse-tractusx/portal-backend)                                        | [CX - 0015](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_PDF_Maerz/4_IAM/CX_-_0015_IAM___Access_Control_Paradigm_PlatformCapabilityIAM_v_1.0.1.pdf)             |
| Discovery Finder      | A microservice resolving a type of identifiers against a set of BPN-Discovery Servers.  Responsible to give the search endpoints for a type of id                                                                       | [eclipse-tractusx/sldt-discovery-finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                                                                                                                                                                          | CX - 0053                                                   |
| BPN Discovery         | A microservice resolving a particular assetId against the registered BPN of its owner. Responsible for indicating the BPNs for the IDs registered by the providers                                                      | [eclipse-tractusx/sldt-bpn-discover](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                                                                                                                                                                 | CX - 0053                                                   |
| EDC Discovery         | A microservice that resolves a BPN against an EDC endpoint. Responsible for giving the EDC endpoints of one or more BPNs                                                                                                | [eclipse-tractusx/portal-backend](https://github.com/eclipse-tractusx/portal-backend) - [Code Implementation](https://github.com/eclipse-tractusx/portal-backend/blob/aca855c857aed309cbca03f4f694283629197110/src/administration/Administration.Service/Controllers/ConnectorsController.cs#L178C1-L190C63) | CX - 0001                                                   |
| Digital Twin Registry | An exhaustive list of all Submodel Servers, with link to their assets, adhering to the AAS Registry API. Responsible for having the Digital Twins of the provider and indicating the endpoints to the Passport Aspects. | [eclipse-tractusx/sldt-digital-twin-registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                                                                                                                                                                                | CX - 0002                                                   |
| Submodel Server       | The data source adhering to a subset of the Submodel API as defined in AAS Part-2 3.0. Where the Passport Aspects are stored                                                                                            | [FA³ST-Framework](https://github.com/FraunhoferIOSB/FAAAST-Service), [Eclipse Basyx](https://github.com/eclipse-basyx/basyx-java-sdk), [AASX Server](https://github.com/admin-shell-io/aasx-server)                                                                                                          | CX - 0002                                                   |
| EDC                   | Main gateaway to the network. In this use case two edc need be existing, one connected to the Digital Product Pass (Eco Pass KIT) [EDC Consumer] and another to the Provider Catena-X components [EDC Provider]         | [eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc)                                                                                                                                                                                                                            | CX - 0018                                                   |
| Digital Product Pass  | The [**Eco Pass KIT**] reference implementation. The application responsible for retrieving the passports and interacting with the services listed above.                                                               | [eclipse-tractusx/digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass)                                                                                                                                                                                                            | CX - 0096                                                   |

<br/>

# Configuration Guide

In order to get the Digital Product Pass working, an EDC connector needs to be configured and assets need to be created so that the Application is able to perform the communications.

> **_NOTE:_**
*This documentation is based in the Digital Product Pass Admin Guide. For the complete information check the CX-0096-TriangleForDigitalProductPass Standard or the [Admin Guide](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/docs/admin%20guide/Admin_Guide.md)*


## EDC Provider Configuration

When configuring your EDC Provider you need to take into consideration the following guidelines and formats:

> **_NOTE:_**
*Please take into consideration following our Postman Collection while setting your EDC Provider*

### Documentation Description

**All variables are written in the following notation: ***{{ VARIABLE_NAME }}*****

All the configurations are in JSON notation and follow the [EDC Configuration from Catena-X](https://github.com/eclipse-tractusx/tractusx-edc) and the [Eclipse Foundation](https://github.com/eclipse-edc/Connector).

### Asset Configuration

When configurating you EDC provider you will be able to set some assets which refer to a certain endpoint.

> **_INFO:_** *All public assets must be registered in a SubModel from a Digital Twin in the Digital Twin Registry.*

#### Variables:
| Name                    | Description                                                                                                                      | Example Value                                                                                                                                                                                                                                                                                                                                                                                                              |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AssetId                 | Combination of Digital Twin and Sub Model UUIDs                                                                                  | **Example value for asset**: urn:uuid:0ec8cf2b-f58e-3f13-b5ef-e7dd01d15b19 <br/>**Example value for registry**: digital-twin-registry                                                                                                                                                                                                                                                          |
| AssetType               | The type of the Asset                                                                                                            | **Example value for asset**: Asset <br/>**Example value for registry**: data.core.digitalTwinRegistry                                                                                                                                                                                                                                                                                                                          |
| Description             | Simple description of the asset                                                                                                  | Battery Passport Test Data                                                                                                                                                                                                                                                                                                                                                                                                 |
| DataProviderEndpointUrl | URL to the endpoint which stores and serves the data, basically a Database that retrieves plain text/json data for a certain API | **Example value for asset**: [https://submodel.server.url/{{path}}/{{DigitalTwinSubmodelId}}](https://submodel.server.url/{{path}}/{{DigitalTwinSubmodelId}}) <br/> **Example value for registry**: [https://materialpass.int.demo.catena-x.net/semantics/registry/api/v3.0](https://materialpass.int.demo.catena-x.net/semantics/registry/api/v3.0) |
| DigitalTwinId           | Id from the Digital Twin	                                                                                                        | urn:uuid:de98db6e-8e05-5d8e-8ae8-9f702cf5c396                                                                                                                                                                                                                                                                                                                                                                                      |
| DigitalTwinSubmodelId   | Sub Model Id registered in the Digital Twin Registry  


#### Format and Fields:

```json
{
    "@context": {},
    "asset": {
        "@type": "{{AssetType}}",
        "@id": "{{AssetId}}", 
        "properties": {
            "description": "{{Description}}"
            "contenttype": "application/json"
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
Policies are important for configuration the **access, prohibitions, obligations and permissions to certain assets.**

A policy can have more and less configurations, depending on the restrictions you want to give to each asset.

Here we specify a simple policy with just the USAGE permission, so we are able to retrieve the whole asset without obligations and prohibitions.

#### Usage Policies

| Policy Name | Description |
| ---- | -------- |
| Usage Permission Policy | In order to use/access the assets from the EDC Provider the Usage Policy is required |

> **_NOTE:_**
*At the moment only Usage Permission Policies are assigned to assets, however restriction policies could be also configured if it is required for a specific use case.*

#### Variables:

| Name | Description | Example Value |
| ---- | -------- | ---- |
| PolicyId | UUID that identifies the policy in the EDC Connector | ad8d2c57-cf32-409c-96a8-be59675b6ae5 |
| PermissionType | DID Permission Type | PolicyDefinitionRequestDto |
| PermissionActionType | Defines the action allowed when the permission is assigned to an asset. In case of the usage policy the value "USE" is necessary | "USE" |
| BPN                  | Consumer's Business Partner Number                                                                                               | BPNL000000000000 |


#### Format and Fields:

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

Contract definitions allow us to expose the assets and link them to a contract policy and a access policy.

> **_INFO:_** *Remember that all **policies and assets** you bind to a contract **must be defined in the same EDC Connector** and linked though their ID in the configuration from the contract.*

#### Variables:

| Name | Description | Example Value                                                                                                                                 |
| ---- | -------- |-----------------------------------------------------------------------------------------------------------------------------------------------|
| ContractDefinitionId | UUID that identifies the policy in the EDC Connector | 76b50bfc-ec19-457f-9911-a283f0d6d0df                                                                                                          |
| AssetId | Combination of Digital Twin and Sub Model UUIDs | **Example value for asset**: urn:uuid:0ec8cf2b-f58e-3f13-b5ef-e7dd01d15b19 <br/> **Example value for registry**: digital-twin-registry |
| AccessPolicyId | Policy that allows/restricts/enforces asset access constrains | ad8d2c57-cf32-409c-96a8-be59675b6ae5                                                                                                          |
| ContractPolicyId | Policy that allows/restricts/enforces contract constrains | ad8d2c57-cf32-409c-96a8-be59675b6ae5                                                                                                          |

#### Format and Fields:

> **_INFO:_** *For testing purposes and in order to ease the access to your assets we are going to define the **same policy as accessPolicy and as contractPolicy**. However, you are recommended to configure two separated policies and specify them adapting each one of them to your specific needs.*

```json
{
    "@context": {},
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

Once you finish the configuration, to make the endpoint public configure your digital twin in the following way:

 > **_INFO:_** *You need to be able to request tokens for the **Catena-X Central IAM** in order to **configure Digital Twins** in the Registry.*



#### Variables:

| Name | Description | Example Value |
| ---- | -------- | ---- |
| DigitalTwinId | Manually generated DID that contains a UUID | 32aa72de-297a-4405-9148-13e12744028a |
| DigitalTwinSubmodelId | Sub Model Id registered in the Digital Twin Registry | 699f1245-f57e-4d6b-acdb-ab763665554a |
| PartInstanceId | Battery passport DMC code or the part instance Id | X123456789012X12345678901234566 |
| manufacturerPartId | The Part Id given by the manufacturer, it idenfies the type of the product | XYZ78901 |
| EDCProviderUrl | URL to the endpoint which contains the EDC Provider | [https://edc.control.plane/](https://edc.control.plane/) |
| BPN | OPTIONAL: The endpoint address can include a BPN number, which shall lead to the EDC Provider, and return the contracts when called from an EDC Consumer | BPNL000000000000 |
| SubmodelIdShort | EXACT STRING REQUIRED: The submodel id of the battery passports needs to be exactly the string: "batteryPass" | **batteryPass** |
| BammModelVersionId | The semantic version of the asset passport model, currently the  version v3.0.1 is used | urn:bamm:io.catenax.battery.battery_pass:3.0.1#BatteryPass |

> **_INFO:_** *It is important that the "SubmodelIdShort" is set in the correct format and that the EDCProviderUrl points to an valid EDC Provider, that providers valid contracts configured in the structure defined here.*


#### Format and Fields:

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
              "value": "urn:bamm:io.catenax.battery.battery_pass:3.0.1#BatteryPass"
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
> **_NOTE:_** 
*The BPN number is not required for the configuration of the endpoint, just **make sure that the host is pointing to the EDC Provider**.*


### Digital Twin Registry Configuration

When configuring the digital twin registry behind the EDC Provider you should follow this EDC Registration guidelines:

#### Variables:

| Name         | Description                                 | Example Value                                                 |
|--------------|---------------------------------------------|---------------------------------------------------------------|
| registryUrl  | The base url from the digital twin registry | https://materialpass.int.demo.catena-x.net/semantics/registry |
| registryName | The name from the asset for the registry    | digital-twin-registry                                         |

#### Format and Fields:

```json
{
    "@context": {},
    "asset": {
        "@type": "data.core.digitalTwinRegistry",
        "@id": "{{registryName}}", 
        "properties": {
            "description": "Digital Twin Registry",
            "contenttype": "application/json" 
        }
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "proxyPath": "true",
        "proxyBody": "true",
        "proxyMethod": "true",
        "proxyQueryParams": "true",
        "baseUrl": "{{registryUrl}}"
    }
}
```

## Item Relationship Service Integration

In order to enable the drill down in passports retrieved by the Digital Product Pass Application you will need to first deploy the IRS (Item Relationship Service)[https://github.com/eclipse-tractusx/item-relationship-service] and connect it to the Digital Product Pass application.

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
- Source URL: https://github.com/eclipse-tractusx/eco-pass-kit