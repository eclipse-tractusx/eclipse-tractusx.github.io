---
title: Provide data
sidebar_position: 2
---

---
**NOTE:**
This chapter is still work in progress. Check back later!

- Register digital twin (aspect)
- Register EDC Asset

---

## Create first data asset

In this step we will focus on inserting data into our provider connector (Alice) using
the [Management API](https://app.swaggerhub.com/apis/eclipse-edc-bot/management-api). We will use plain
CLI tools (`curl`) for this, but feel free to use graphical tools such as Postman or Insomnia.

Alice, as a data consumer, wants to consume data from Bob. Bob, as a data provider, needs to create an asset for Alice.
Action (Bob): Create this asset using the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/assets' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "asset": {
        "@type": "Asset",
        "@id": "3", 
        "properties": {
            "description": "Product EDC Demo Asset 3"
        }
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "baseUrl": "https://jsonplaceholder.typicode.com/todos/3"
    }
}'
```

## Request catalog

Bob tells Alice, that he created an asset, and she should now be able to request it. In the next step, Alice requests a contract offer catalog. In the catalog, all contract offers for Alice are listed.

Action (Alice): Execute a request using the following `curl` commands:

```shell
curl --location 'http://localhost/alice/management/v2/catalog/request' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "protocol": "dataspace-protocol-http",
    "counterPartyAddress": "http://bob-controlplane:8084/api/v1/dsp",
    "querySpec": {
        "offset": 0,
        "limit": 100,
        "filter": "",
        "range": {
            "from": 0,
            "to": 100
        },
        "criterion": ""
    }
}'
```

## Create first access policy

Let´s see if Alice can see the Asset (ID:3).

As you can see in the response, the data offer "Product EDC Demo Asset 3" (asset ID:3) does not appear. Unfortunately, Alice sees some contract offers but she cannot find the contract offer from Bob.

Alice calls Bob and says she can´t see the asset. Bob remembers that he did not create an access policy. An access policy defines who is allowed to see a data offering.

Action (Bob): Create the access policy using the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/policydefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinitionRequestDto",
  "@id": "3",
  "policy": {
    "@type": "Policy"
  }
}' 
```

## Request catalog

Now that Bob created an access policy, Alice can once again try to access Bob's asset.

Action (Alice): Execute the request again using the following `curl` command:

```shell
curl --location 'http://localhost/alice/management/v2/catalog/request' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "protocol": "dataspace-protocol-http",
    "counterPartyAddress": "http://bob-controlplane:8084/api/v1/dsp",
    "querySpec": {
        "offset": 0,
        "limit": 100,
        "filter": "",
        "range": {
            "from": 0,
            "to": 100
        },
        "criterion": ""
    }
}'
```

## Create first contract definition

Let´s see if Alice can see the Asset.

Once again Alice cannot find the data offer. This is by design and to be expected since Bob has only created an asset and a policy definition. An asset and a policy cannot be displayed to Alice as a consumer without a contract definition.
**This is the first lesson for this tutorial: A contract definition must be created on the data provider side. It must always contain an asset, an access policy and a contract policy.**

Contract definitions state how assets and policies are linked together. Contract definitions express under what conditions an asset is published to a data space. Those conditions are comprised of a contract policy and an access policy. Those policies are referenced by ID, that means they must already exist in the policy store before creating the contract definition.

- Access policy: determines whether a particular consumer is offered an asset or not. For example, we may want to restrict certain assets such that only selected consumers from a list of slescted partners can access the asset. This can be done using a unique identifier such as the Business Partner Nukber (BPN). Other dta space participants than those whose BPN is listed in the access policy wouldn't even have the assets in their catalog.
- Contract policy: determines the conditions for initiating a contract negotiation for a particular asset. Note that does not automatically guarantee the successful creation of a contract, it merely expresses the eligibility to start the negotiation.

Find additional information on transferring data in the [Developer's Handbook](https://github.com/eclipse-edc/docs/blob/main/developer/handbook.md).

Action (Bob): Create a contract definition including the asset and the policies you have created. For this, use the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/contractdefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
  "@context": {},
  "@id": "3",
  "@type": "ContractDefinition",
  "accessPolicyId": "3",
  "contractPolicyId": "3",
  "assetsSelector": {
    "@type": "CriterionDto",
    "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
    "operator": "=",
    "operandRight": "3"
  }
}'
```

## Request catalog

Let´s see if Alice can finally see the Asset.
Action (Alice): Execute the request again using the following `curl` command:

```shell
curl --location 'http://localhost/alice/management/v2/catalog/request' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "protocol": "dataspace-protocol-http",
    "counterPartyAddress": "http://bob-controlplane:8084/api/v1/dsp",
    "querySpec": {
        "offset": 0,
        "limit": 100,
        "filter": "",
        "range": {
            "from": 0,
            "to": 100
        },
        "criterion": ""
    }
}'
```

Finally Alice can see the Contract Offer from Bob.
Congratulations on yor first successful data exchange in your own data space!

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
