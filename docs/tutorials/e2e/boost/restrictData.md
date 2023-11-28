---
title: Restricting users from accessing an asset
sidebar_position: 4
---

## Create an asset

Bob will once again be the data provider. But this time Bob does not want Alice to see the asset.
The first step for Bob will again be to create an asset.

Action (Bob): Create an asset using the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/assets' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "asset": {
        "@type": "Asset",
        "@id": "4", 
        "properties": {
            "description": "Product EDC Demo Asset 4"
        }
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "baseUrl": "https://jsonplaceholder.typicode.com/todos/4"
    }
}'
```

## Create a permissive access policy

Now that the asset has been created, Bob creates an access policy that defines who can see and therefore access the asset in his catalog. To specify this access, Bob uses the Business Partner Number (BPN). The BPN is a unique identifier for participants of a data space. Bob knows that his exchange partner for this asset has the BPN (BPNL000000000003). Therefore, he can define his access policy as follows:

:::info

The MXD contains only two members (Alice & Bob). Therefore, it will not be possible to consume an asset with the policy defined here, because the participant with the BPN BPNL000000000003 does not exist in this data space. This is an example to demonstrate the restriction of an asset with a policy.

:::

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
  "@id": "41",
  "policy": {
    "@type": "Policy",
    "odrl:permission": [
      {
        "odrl:action": "USE",
        "odrl:constraint": {
          "@type": "LogicalConstraint",
          "odrl:or": [
            {
              "@type": "Constraint",
              "odrl:leftOperand": "BusinessPartnerNumber",
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "BPNL000000000003"
            }
          ]
        }
      }
    ]
  }
}' 
```

Bob defined a policy which restricts access to connector(s) with the BusinessPartnerNumber BPNL000000000003. As Alice does not own this BPN, she should not be able to access the asset.

## Create a permissive contract policy

Since an access policy has already been created, a contract policy must be created and linked in the contract definition.

Action (Bob): Create the contract policy using the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/policydefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinitionRequestDto",
  "@id": "42",
  "policy": {
    "@type": "Policy",
    "odrl:permission": [
      {
        "odrl:action": "USE",
        "odrl:constraint": {
          "@type": "LogicalConstraint",
          "odrl:or": [
            {
              "@type": "Constraint",
              "odrl:leftOperand": "BpnCredential",
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
}'
```

## Create a contract definition

Lastly, the asset and the access policy must be linked in a contract definition.
Action (Bob): Create a contract definition including the asset and the policies you have created. For this, use the following `curl` command:

```shell
curl --location 'http://localhost/bob/management/v2/contractdefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {},
    "@id": "4",
    "@type": "ContractDefinition",
    "accessPolicyId": "41",
    "contractPolicyId": "42",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
        "operator": "=",
        "operandRight": "4"
    }
}'
```

## Request catalog

Let´s see if Alice can see the Asset.

Action (Alice): Execute a request using the following `curl` command:

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
        "limit": 100
    }
}'
```

:::info

Bob’s asset (ID: 4) should not be displayed. The access policy successfully restricts Alice from seeing and therefore obtaining Bob’s asset. Now Bob is able to manage who sees which of his sensitive data assets. If Bob decides to enable Alice to see his asset, he can simply adjust the access policy definition and add Alice BPN (BPNL000000000001) to the list of BPNs.

:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
