---
title: Restricting users from accessing an asset
sidebar_position: 4
---

## Create an asset

Bob will once again be the data provider. But this time Bob does not want Alice to see the asset.
The first step for Bob will again be to create an asset.

Action (Bob): Create an asset using the following `curl` command:

```shell
curl --location 'http://dataprovider-controlplane.tx.test/management/v3/assets' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST2' \
--data-raw '{
    "@context": {},
    "@type": "Asset",
    "@id": "4",
    "properties": {
        "description": "Product EDC Demo Asset 4"
    },
    "dataAddress": {
        "@type": "DataAddress",
        "type": "HttpData",
        "baseUrl": "https://jsonplaceholder.typicode.com/todos/4"
    }
}' | jq
```

## Create a permissive access policy

Now that the asset has been created, Bob creates an access policy that defines who can see and therefore access the asset in his catalog. To specify this access, Bob uses the Business Partner Number (BPN). The BPN is a unique identifier for participants of a data space. Bob knows that his exchange partner for this asset has the BPN `BPNL00000003AVTH` and Alice BPN is `BPNL00000003AZQP`

Action (Bob): Create the access policy using the following `curl` command:

```shell
curl --location 'http://dataprovider-controlplane.tx.test/management/v2/policydefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST2' \
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
              "odrl:rightOperand": "BPNL00000003AVTH"
            }
          ]
        }
      }
    ]
  }
}' | jq
```

The policydefinitioon is created with the ID `41`

```json
{
  "@type": "edc:IdResponse",
  "@id": "41",
  "edc:createdAt": 1715674423858,
  "@context": {
    "dct": "https://purl.org/dc/terms/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "dcat": "https://www.w3.org/ns/dcat/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}
```

Bob defined a policy which restricts access to connector(s) with the BusinessPartnerNumber `BPNL00000003AVTH`. As Alice does not own this BPN, she should not be able to access the asset.

## Create a permissive contract policy

Since an access policy has already been created, a contract policy must be created and linked in the contract definition.

Action (Bob): Create the contract policy using the following `curl` command:

```shell
curl --location 'http://dataprovider-controlplane.tx.test/management/v2/policydefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST2' \
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
}' | jq
```

The response should be something like this

```json
{
  "@type": "edc:IdResponse",
  "@id": "42",
  "edc:createdAt": 1715674546763,
  "@context": {
    "dct": "https://purl.org/dc/terms/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "dcat": "https://www.w3.org/ns/dcat/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}
```

## Create a contract definition

Lastly, the asset and the access policy must be linked in a contract definition.
Action (Bob): Create a contract definition including the asset and the policies you have created. For this, use the following `curl` command:

```shell
curl --location 'http://dataprovider-controlplane.tx.test/management/v2/contractdefinitions' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST2' \
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
}' | jq
```

A response should look like this

```json
{
  "@type": "edc:IdResponse",
  "@id": "4",
  "edc:createdAt": 1715674670136,
  "@context": {
    "dct": "https://purl.org/dc/terms/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "dcat": "https://www.w3.org/ns/dcat/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}
```

## Request catalog

Let´s see if Alice can see the Asset.

Action (Alice): Execute a request using the following `curl` command:

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/catalog/request' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST1' \
--data-raw '{
    "@context": {},
    "protocol": "dataspace-protocol-http",
    "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
    "querySpec": {
        "offset": 0,
        "limit": 100
    }
}' | jq
```

The response doesnt include the cataolog entry for the asset/offer with id4

```json
{
  "@id": "3b276870-5cc5-4546-b793-e2c8d39e1010",
  "@type": "dcat:Catalog",
  "dcat:dataset": [
    {
      "@id": "registry-asset",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
        "@id": "ZGM3MjMyYTAtMDRjOC00MTVjLWI2NmQtOGJmNTQ1MWMyYmIy:cmVnaXN0cnktYXNzZXQ=:MjdiYWExMGItMTAzMC00MmY5LWI0YjMtMzJmY2UyODI5NThl",
        "@type": "odrl:Set",
        "odrl:permission": {
          "odrl:target": "registry-asset",
          "odrl:action": {
            "odrl:type": "USE"
          },
          "odrl:constraint": {
            "odrl:or": {
              "odrl:leftOperand": "PURPOSE",
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "ID 3.0 Trace"
            }
          }
        },
        "odrl:prohibition": [],
        "odrl:obligation": [],
        "odrl:target": "registry-asset"
      },
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpProxy"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        }
      ],
      "edc:type": "data.core.digitalTwinRegistry",
      "edc:description": "Digital Twin Registry Endpoint of IRS DEV",
      "edc:id": "registry-asset"
    },
    {
      "@id": "urn:uuid:69653fc9-11b5-4321-98ca-e60d2dc35379",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
        "@id": "MDkyNmVhMGUtZWVmMC00OTlmLTliZjktNmE1MGU3MGUzOGQy:dXJuOnV1aWQ6Njk2NTNmYzktMTFiNS00MzIxLTk4Y2EtZTYwZDJkYzM1Mzc5:YWUwOTFiOTYtNGM0Ni00YzE0LWEyZGYtY2Y5NDNlMzY1NDY4",
        "@type": "odrl:Set",
        "odrl:permission": {
          "odrl:target": "urn:uuid:69653fc9-11b5-4321-98ca-e60d2dc35379",
          "odrl:action": {
            "odrl:type": "USE"
          },
          "odrl:constraint": {
            "odrl:or": {
              "odrl:leftOperand": "PURPOSE",
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "ID 3.0 Trace"
            }
          }
        },
        "odrl:prohibition": [],
        "odrl:obligation": [],
        "odrl:target": "urn:uuid:69653fc9-11b5-4321-98ca-e60d2dc35379"
      },
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpProxy"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        }
      ],
      "edc:description": "IRS EDC Test Asset",
      "edc:id": "urn:uuid:69653fc9-11b5-4321-98ca-e60d2dc35379"
    },
    {
      "@id": "3",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
        "@id": "Mw==:Mw==:YjE0ODU2M2MtMWM5MC00NDg4LThmZmItZmJjZjc0NjQzZTE5",
        "@type": "odrl:Set",
        "odrl:permission": [],
        "odrl:prohibition": [],
        "odrl:obligation": [],
        "odrl:target": "3"
      },
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpProxy"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3"
          },
          "dcat:accessService": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f"
        }
      ],
      "edc:description": "Product EDC Demo Asset 3",
      "edc:id": "3"
    }
  ],
  "dcat:service": {
    "@id": "7b76c9c5-d7f9-42c1-8784-a2820a60bb0f",
    "@type": "dcat:DataService",
    "dct:terms": "connector",
    "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
  },
  "edc:participantId": "BPNL00000003AYRE",
  "@context": {
    "dct": "https://purl.org/dc/terms/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "dcat": "https://www.w3.org/ns/dcat/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}
```

:::info

Bob’s asset (ID: 4) should not be displayed. The access policy successfully restricts Alice from seeing and therefore obtaining Bob’s asset. Now Bob is able to manage who sees which of his sensitive data assets. If Bob decides to enable Alice to see his asset, he can simply adjust the access policy definition and add Alice BPN `BPNL00000003AZQP` to the list of BPNs.

:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
