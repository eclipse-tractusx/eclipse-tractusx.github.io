---
title: Restricting users from accessing an asset
sidebar_position: 4
---

---
**NOTE:**
This chapter is still work in progress. Check back layer!

---

## Create an asset

Bob will once again be the data provider and Alice is interested in Bob’s data assets. Bob, as a data provider, creates an asset.

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

Now that the asset is created, an access policy must be created to define who shall be able to see the asset within the catalog. This time Bob does not want Alice to see the asset. So he defines a policy not allowing Alice to see the asset in her catalog.

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
  "@id": "4",
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
    "accessPolicyId": "4",
    "contractPolicyId": "4",
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

Bob’s asset (ID: 4) should not be displayed. The access policy successfully restricts Alice from seeing and therefore obtaining Bob’s asset. Now Bob is able to manage who sees which of his sensitive data assets. If Bob decides to enable Alice to see his asset, he can simply adjust the access policy definition and add Alice BPN (BPNL000000000001) to the list of BPNs.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
