# DTR Tutorial

## Tutorial Goal

Alongside the connector, the Digital Twin Registry (DTR) is another central component in a data ecosystem when it comes to exchanging digital twins. Anyone who provides digital twins in Catena-X must register them in a DTR so that they can be found by other parties.

This tutorial focuses on the working with the DTR. You will learn what the DTR is, how to deploy it and go through a complete use case scenario by depositing a DTR in the EDC, registering a digital twin in the DTR, and showing how external parties can find and consume the digital twin.

## Introduction

Catena-X uses the Asset Administration Shell (AAS) to represent digital twins. Such a digital twin is basically a shell with an ID in UUID-format that makes it uniquely identifiable. Also it contains IDs ("specificAssetIds") that connect the shell with the original asset it represents (e.g. the "manufacturerPartId"). The shell also contains SubmodelDescriptors which reference to submodels that contain the actual data of specific aspects of the asset.

The Digital Twin Registry (DTR) contains a list of all registered digital twins of the owner and therefore acts as an address book for Digital Twins. With the DTR of a data provider, a data consumer can therefore find digital twin and also get directed to the desired submodels of the twin.

Further details can be found in the [Digital Twin KIT][dt-kit] or the [sldt-digital-twin-registry][sldt-dtr] Github repository.

In this tutorial, Bob will assume the role of an automotive supplier that manufactures gearboxes and acts as the data provider. Alice represents an OEM that uses these gearboxes. Alice's goal is to calculate the product carbon footprint (PCF) of a car, and she also needs the carbon footprints of the individual parts to calculate the total footprint. Therefore, Alice is the data consumer in this tutorial.

The steps of the tutorial are as follows

- Bob registers a DTR at his EDC
- Bob registers a Digital Twin at his DTR
- Alice finds and consumes the Digital Twin

This tutorial will guide you through the steps outlined above. For a deeper understanding, more detailed documentation will be linked.

### High Level Architecture

## Exchange Digital Twins

### Register a DTR in your EDC

#### Create the DTR asset

To ensure that Bob's DTR becomes visible for Alice and to start the data exchange between them, Bob has to create a data asset.

Action (Bob): Create a data asset using the following command:

(note: that the "asset:prop:type" is standardized with "data.core.digitalTwinRegistry" for the Digital Twin Registry.)

```curl --location 'http://dataprovider-controlplane.tx.test/management/v3/assets' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST2' \
--data-raw '{
   "@context":{
      "edc":"https://w3id.org/edc/v0.0.1/ns/",
      "cx-common":"https://w3id.org/catenax/ontology/common#",
      "cx-taxo":"https://w3id.org/catenax/taxonomy#",
      "dct":"https://purl.org/dc/terms/"
   },
   "@id":"{{ASSET_ID}}",
   "properties":{
      "dct:type":{
         "@id":"cx-taxo:DigitalTwinRegistry"
      }
   },
   "dataAddress":{
      "@type":"DataAddress",
      "type":"HttpData",
      "baseUrl":"{{BACKEND_SERVICE}}",
      "proxyPath":"true",
      "proxyBody":"true",
      "proxyMethod":"true",
      "proxyQueryParams":"true",
      "oauth2:clientId":"satest02",
      "oauth2:clientSecretKey":"{{REGISTRY_CLIENT_SECRET_KEY}}",
      "oauth2:tokenUrl":"http://centralidp.tx.test/auth/realms/CX-Central/protocol/openid-connect/token",
      "oauth2:scope":"{{REGISTRY_TOKEN_SCOPE}}"
   }
}'
```

#### Create a policy

After Bob has created an data asset, he must define a BPN-restrictive policy in order to give Alice access to the asset. This policy is not standardized and can be chosen according to its needs. Bob wants to define the policy that only Alice can see the DTR Asset.

Action (Bob): Defines the access policy using the following command:

```curl
{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "@type": "PolicyDefinitionRequestDto",
    "@id": "{{POLICY_ID}}",
    "policy": {
  "@type": "Policy",
  "odrl:permission" : [{
   "odrl:action" : "USE",
   "odrl:constraint" : {
    "@type": "LogicalConstraint",
    "odrl:or" : [{
     "@type" : "Constraint",
     "odrl:leftOperand" : "BusinessPartnerNumber",
     "odrl:operator" : {
                        "@id": "odrl:eq"
                    },
     "odrl:rightOperand" : "{{CONSUMER_BPN}}"
    }]
   }
  }]
    }
}
```

#### Contract Definition

To offer the DTR in his EDC Catalog, Bob has to create a contract definition. This contains linking the data asset with the policy.

Action (Bob): Create the contract policy using the following command:

```curl
{
    "@context": {},
    "@id": "{{CONTRACT_DEFINITION_ID}}",
    "@type": "ContractDefinition",
    "accessPolicyId": "{{ACCESS_POLICY_ID}}",
    "contractPolicyId": "{{CONTRACT_POLICY_ID}}",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "{{EDC_NAMESPACE}}id",
        "operator": "=",
        "operandRight": "{{ASSET_ID}}"
    }
}
```

The DTR Asset from Bob is now available for Alice to request via contract negotiation. Currently it is still empty. Therefore Bob will register his first digital twin in the next step of this tutorial.

Continue the tutorial in [Register a Digital](#register-a-digital-twin) Twin.

### Register a Digital Twin

The basic steps for providing digital twins with the DTR contain:

- Create a compliant submodel
- Store the submodel on a submodel server
- Register/create a digital twin at the DTR
- Reference the Submodel in the digital twin

#### Create a submodel

Submodels needs to be compliant to the domain specified standards. Bob has already prepaired the submodel he wants to share with Alice. Thefore the first step is already taken care of.

#### Host/store a submodel

Bob also needs to store his submodels somewhere. Usually a submodel server is used for this task. For this tutorial a service called "backend-data-service" (short BDS) is provided. This service fulfills the role of the submodel server. It can store any text based data (e.g. JSON, XML, plain text) under a specific ID. This data can be received again, by using the same ID. Bob will use this service to host his data.

Action (Bob): Store submodel on the BDS using the following command:

```curl
id="bobs-data"
bdsBaseUrl="http://localhost/bobs-bds"
clusterInternalBdsBaseUrl="http://bobs-bds-bds"

curl -i -X POST "${bdsBaseUrl}/data/${id}" -H "Content-Type: application/json" --data-raw '{
    "diameter": 380,
    "length": 810,
    "width": 590,
    "weight": 85,
    "height": 610
}'
```

#### Create Contract Definition at EDC with the submodel

Bob has now stored his submodel on the BDS. However, because he wants to preserve data sovereignty over his data, he cannot directly provide access to the BDS. Instead, the data exchange shall take place via the EDC.

Therefore Bob needs to create an according contract definition. This follows the same three steps as explained in "Create DTR Asset" of creating an data asset, creating a policy and finally creating the contract definition.

Info:

edcManagementBaseUrl="<http://localhost/bob/management>"
edcApiKey="password"

```bash
# Asset
# assetId="$(uuidgen)"
assetId="0bc6a8af-8682-4dba-86b1-0433f9762e42"
clusterInternalBdsBaseUrl="http://bobs-bds-bds:8080"
bdsDataId="bobs-data"
assetUrl="${clusterInternalBdsBaseUrl}/data/${bdsDataId}"

# Policy
# policyId="$(uuidgen)"
policyId="1bc6a8af-8682-4dba-86b1-0433f9762e42"

# Contract Definition
# contractDefinitionId="$(uuidgen)"
contractDefinitionId="2bc6a8af-8682-4dba-86b1-0433f9762e42"
```

Action (Bob): Create a data asset with the following commands:

```curl
curl -i -X POST "${edcManagementBaseUrl}/v3/assets" -H "X-Api-Key: ${edcApiKey}" -H "Content-Type: application/json" --data-raw "{
    \"@context\": {},
    \"@id\": \"${assetId}\",
    \"properties\": {
        \"description\": \"Product EDC Demo Asset\"
    },
    \"dataAddress\": {
        \"@type\": \"DataAddress\",
        \"baseUrl\": \"${assetUrl}\",
        \"type\": \"HttpData\"
    }
}" | jq
```

Action (Bob): Create a Policy with the following commands:

```curl
curl -i -X POST "${edcManagementBaseUrl}/v2/policydefinitions" -H "X-Api-Key: ${edcApiKey}" -H "Content-Type: application/json" --data-raw "{
    \"@context\": {
        \"odrl\": \"http://www.w3.org/ns/odrl/2/\"
    },
    \"@type\": \"PolicyDefinitionRequestDto\",
    \"@id\": \"${policyId}\",
    \"policy\": {
        \"@type\": \"Policy\",
        \"odrl:permission\": [{
            \"odrl:action\": \"USE\",
            \"odrl:constraint\": {
                \"@type\": \"LogicalConstraint\",
                \"odrl:or\": []
            }
        }]
    }
}" | jq
```

Action (Bob): Create a contract definition with the following commands:

```curl
curl -i -X POST "${edcManagementBaseUrl}/v2/contractdefinitions" -H "X-Api-Key: ${edcApiKey}" -H "Content-Type: application/json" --data-raw "{
    \"@context\": {},
    \"@id\": \"${contractDefinitionId}\",
    \"@type\": \"ContractDefinition\",
    \"accessPolicyId\": \"${policyId}\",
    \"contractPolicyId\": \"${policyId}\",
    \"assetsSelector\" : {
        \"@type\" : \"CriterionDto\",
        \"operandLeft\": \"https://w3id.org/edc/v0.0.1/ns/id\",
        \"operator\": \"=\",
        \"operandRight\": \"${assetId}\"
    }
}" | jq
```

The submodel is now stored at the BDS and made available through a contract definition at the EDC.

### Access control to Digital Twins Based on the BPN (Business Partner Number)/ TenantId

The digital twin registry offers two functionalities for managing access control to digital twins (Shells) based on the Business Partner Number (BPN).
On application start, the provider can configure which kind of access control will be activated.

1. Classic implementation (default is true). This implementation is used for this tutorial:
   1. The visibility of `specificAssetIds` in the Digital Twin Registry based on the Business Partner Number (BPN) (Which is send via header Edc-Bpn) can be controlled with the attribute `externalSubjectId`. Hence, the `externalSubjectId` is identified with the BPN.
   2. The communication between consumer and provider is via EDC. Before the provider EDC sends the request to the DTR, the property Edc-Bpn with the BPN of the consumer will be set by the provider EDC.
2. Granular access control implementation:
   1. The granular access control implementation is provided as an alternative option to enforce visibility rules of the *Digital Twin* details. These can be:
      1. The visibility of the *Digital Twin* as a whole
      2. The visibility of certain `specificAssetId` names and values of the *Digital Twin*
      3. The visibility of certain `submodelDescriptors` of the *Digital Twin*
      4. Restricting access to *Digital Twin* details which are `"PUBLIC_READABLE"`
         (only showing the `id`, the public readable `specificAssetId` names and values, the `createdDate` and the filtered `submodelDescriptors` )
      5. To enable granular access control (instead of the classic implementation), the `registry.useGranularAccessControl` configuration HELM chart property must be set to `"true"`.

For more details see: [DTR Access control to Digital Twins Based on the BPN (Business Partner Number)/ TenantId](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/docs/README.md#:~:text=dev%40eclipse.org-,Access,-control%20to%20Digital)

#### Register/create a Digital Twin at the DTR

Now that Bob has stored his submodel at the BDS and offered it at the EDC for sovereign data exchange, he wants to make it findable via the DTR. This contains two steps:

- Register/create a Digital Twin at the DTR
- Reference the submodel in the Digital Twin

The registration of a digital twin in Catena-X is equivalent to the creation of a new digital twin. Thus, Bob should always ensure that there is no digital twin created for the respective “specificAssetIds” yet to avoid duplicates.

Action (Bob): Create a new digital twin at the DTR with the following command:

```curl
POST /shell-descriptors
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
  ]
}
  ```

Bob has now successfully created/registered a Digital Twin at his DTR.  Right now the Digital Twin is pretty empty, except the AAS-ID and the specificAssetIds.
Thus, the next step for Bob is to reference his submodel in the Digital Twin to make it findable for consumers.

#### Reference a Submodel in the Digital Twin

In order to reference the submodel in the digital twin, submodel descriptors can be added to the digital twin.

When adding a submodel to an existing digital twin, it is important to use the correct AAS-Id. This has to be added for the parameter "id", e.g. "id": "e5c96ab5-896a-482c-8761-efd74777ca97".

To reference the endoint of the submodel we use the DSP protocol. Thus you have to provide the subprotocolBody with the Id of the asset as well as the dspEndpoint of the EDC.

```curl
POST /shell-descriptors/{{aasId}}

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

Bob has now successfully added a submodel descriptor to the digital twin and made the Submodel accessible for comsumption. In the next step of the tutorial Alice will find and consume the digital twin and its submodel.

#### Registering new Submodels at existing Digital Twins

If you want to add a submodel to an already existing digital twin, you just need to reference the ID (UUID )of the digital twin in the submodel to link the two.

Lets also go through this process. …

### Find and consume a Digital Twin

Alice, the data consumer, now wants to fetch Bob's digital twin. Since she knows Bob, she knows his BPN. With this BPN, she can now determine Bob's EDC endpoint using the EDC Discovery Service. The Discovery Services are not part of this tutorial. So the tutorial starts with Alice already knowing Bob's EDC endpoint.

In general, Alice's only responsibility is to deploy a connector, negotiate for access and terms of usage and finally fetch the data from the right offers.
A detailed interaction flow is detailed in the [Digital Twin KIT - Fetching a supplier's twin](https://eclipse-tractusx.github.io/docs-kits/kits/Digital%20Twin%20Kit/Software%20Development%20View/dt-kit-interaction-patterns#1-fetching-a-suppliers-twin).

But step by step. First of all, Alice wants to see Bob's DTR.

Action (Alice): Use the following API POST to find Bob's DTR Asset.

`POST /catalog/request with filter looking for DTR`

You will receive the `dcat:Dataset for Bob's DTR`. A negotiation for the DTR can now take place. You retrieve a token for this, which you get back in return if the negotiation is successful.

![Step1](/tutorials/e2e/dtr-access-token.png)

In the second step, Alice can use this access token to access Bob's DTR directly and perform a lookup there. As feedback, she receives the AAS IDs that she is authorised to see.

Action (Alice): Use the following API GET to receive the provided AAS Ids:

`GET /lookup/shells?assetIds=xyz`

Alice receives a list of AAS Ids that she is allowed to see. This should include the digital twin created in the previous tutorial steps.

![Step2](/tutorials/e2e/dtr-get-aas-ids.png)

Now Alice can get the AAS descriptors because she now has the AAS IDs.

Action (Alice): Use the following API GET to the shell descriptors for the AAS ID.

`GET /shell-descriptors/{{aas-id}} with aas-id encoded base64url`

In response, Alice receives the AAS descriptor she needs. This contains the submodel descriptors. These contain the location of the submodels.

![Step3](/tutorials/e2e/dtr-get-descriptor.png)

Now the process is repeating itself. Alice performs a catalog request again and can now use the dataset IDs as a filter.

Action (Alice): Use the following API POST to receive Bob's catalog with the Dataset-ID as a filter:

`POST /catalog/request with filter looking for Dataset-ID`

A negotiation for the Submodel Server can now take place. Alice retrieves a token for this, which she gets back in return if the negotiation is successful.

![Step4](/tutorials/e2e/dtr-get-token.png)

The relevant endpoint on the submodel server can now be accessed directly, which returns the actual data in response.

Action (Alice): Use the following API GET to receive the data:

![Step5](/tutorials/e2e/dtr-get-data.png)

**Congratulations, you've got a first digital twin from a customer!!!**

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 sovity GmbH
- SPDX-FileCopyrightText: 2024 msg systems AG
- Source URL: <https://github.com/eclipse-tractusx/eclipse-tractusx.github.io>

[dt-kit]: https://eclipse-tractusx.github.io/docs-kits/kits/Digital%20Twin%20Kit/Software%20Development%20View/dt-kit-software-development-view/
[sldt-dtr]: https://github.com/eclipse-tractusx/sldt-digital-twin-registry/tree/main/docs
