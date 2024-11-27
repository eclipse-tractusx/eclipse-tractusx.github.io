---
title: Provide data
sidebar_position: 2
---

## Create first data asset

In this step we will focus on inserting data into our provider connector using
the [Management API](https://app.swaggerhub.com/apis/eclipse-edc-bot/management-api). We will use plain
CLI tools (`curl`) for this, but feel free to use graphical tools such as Postman or Insomnia.

:::note

Alice acts here as a data consumer and Bob as a data provider.

- Bob -> <http://dataprovider-controlplane.tx.test>
- Alice -> <http://dataconsumer-1-controlplane.tx.test>

:::

Alice, as a data consumer, wants to consume data from Bob. Bob, as a data provider, needs to create an asset for Alice.
Action (Bob): Create this asset using the following `curl` command:

```shell

curl -L -X POST 'http://dataprovider-controlplane.tx.test/management/v3/assets' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST2' \
--data-raw '{
  "@context": {},
  "@id": "200",
  "properties": {
    "description": "Product EDC Demo Asset"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "https://jsonplaceholder.typicode.com/todos/3"
  }
}'| jq
```

Just to be sure, that the asset was created succesfully, Bob can check the asset using the following `curl` commands:

```shell

// get your asset by ID

curl -L -X GET 'http://dataprovider-controlplane.tx.test/management/v3/assets/200' \
-H 'X-Api-Key: TEST2' | jq

// or get the whole catalog

curl -L -X POST http://dataprovider-controlplane.tx.test/management/v3/assets/request -H "x-api-key: TEST2" -H "content-type: application/json" | jq
```

The result for the first command shows just the newly created asset.

```json
{
  "@id": "200",
  "@type": "Asset",
  "properties": {
    "description": "Product EDC Demo Asset",
    "id": "200"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "https://jsonplaceholder.typicode.com/todos/3"
  },
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  }
}

```

## Request catalog

Bob tells Alice, that he created an asset, and she should now be able to request it. In the next step, Alice requests a contract offer catalog. In the catalog, all contract offers for Alice are listed.

Action (Alice): Execute a request using the following `curl` commands:

```shell

curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/catalog/request' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST1' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "CatalogRequest",
  "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
  "counterPartyId": "BPNL00000003AYRE",
  "protocol": "dataspace-protocol-http",
  "querySpec": {
    "offset": 0,
    "limit": 50
  }
}' | jq


```

The requested catalog might look like this but the content may differ:

```json
{
  "@id": "be17c3e7-3156-46db-8934-f1ea92d1f2a3",
  "@type": "dcat:Catalog",
  "dcat:dataset": [
    {
      "@id": "registry-asset",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
        "@id": "MTcxODBlMTAtNmFjNS00NTYzLWE2MTUtNGM1MjQ5ZTUxMTU5:cmVnaXN0cnktYXNzZXQ=:NzE0ODk2YjMtY2VlYy00NmY5LWE5ZTgtY2NiMWI1NGUzOTgy",
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
          "dcat:accessService": "49a693e0-835d-457a-99b4-e781f2bd643d"
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3"
          },
          "dcat:accessService": "49a693e0-835d-457a-99b4-e781f2bd643d"
        }
      ],
      "edc:type": "data.core.digitalTwinRegistry",
      "edc:description": "Digital Twin Registry Endpoint of IRS DEV",
      "edc:id": "registry-asset"
    },
    {
      "@id": "urn:uuid:dc641d45-95e7-4284-a472-43f30255d0cb",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
        "@id": "MTIzYjJlM2QtNTUxOC00ZWViLWFmMGItNTU5ZTYxZGY3Zjhk:dXJuOnV1aWQ6ZGM2NDFkNDUtOTVlNy00Mjg0LWE0NzItNDNmMzAyNTVkMGNi:YzBhOGFhOTQtNzg4OS00Y2MxLTkzNmMtMWYwMTNkODc3Nzk4",
        "@type": "odrl:Set",
        "odrl:permission": {
          "odrl:target": "urn:uuid:dc641d45-95e7-4284-a472-43f30255d0cb",
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
        "odrl:target": "urn:uuid:dc641d45-95e7-4284-a472-43f30255d0cb"
      },
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpProxy"
          },
          "dcat:accessService": "49a693e0-835d-457a-99b4-e781f2bd643d"
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3"
          },
          "dcat:accessService": "49a693e0-835d-457a-99b4-e781f2bd643d"
        }
      ],
      "edc:description": "IRS EDC Test Asset",
      "edc:id": "urn:uuid:dc641d45-95e7-4284-a472-43f30255d0cb"
    }
  ],
  "dcat:service": {
    "@id": "49a693e0-835d-457a-99b4-e781f2bd643d",
    "@type": "dcat:DataService",
    "dct:terms": "connector",
    "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
  },
  "edc:participantId": "BPNL00000003AYRE",
  "@context": {
    "dct": "http://purl.org/dc/terms/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "dcat": "https://www.w3.org/ns/dcat/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}
```

## Create first access policy

Let´s see if Alice can see the Asset (ID: 200).

:::info
As you can see in the response, the data offer "Product EDC Demo Asset" (asset ID: 200) does not appear. Unfortunately, Alice sees some contract offers but she cannot find the contract offer from Bob.
:::

Alice calls Bob and says she can´t see the asset. Bob remembers that he did not create an access policy. An access policy defines who is allowed to see a data offering.

Action (Bob): Create the access policy using the following `curl` command:

```shell

curl -L -X POST 'http://dataprovider-controlplane.tx.test/management/v2/policydefinitions' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST2' \
--data-raw '{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinitionRequestDto",
  "@id": "200",
  "policy": {
    "@type": "odrl:Set",
    "odrl:permission": [
      {
        "odrl:action": "USE",
        "odrl:constraint": {
          "@type": "LogicalConstraint",
          "odrl:or": [
            {
              "@type": "Constraint",
              "odrl:leftOperand": {
                "@id": "BusinessPartnerNumber"
              },
              "odrl:operator": {
                "@id": "odrl:eq"
              },
              "odrl:rightOperand": "BPNL00000003AZQP"
            }
          ]
        }
      }
    ]
  }
}' | jq
```

The policy was successfully created, if the response is something like this

```json

{
  "@type": "IdResponse",
  "@id": "200",
  "createdAt": 1732640748595,
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  }
}

```

## Request catalog - second try

Now that Bob created an access policy, Alice can once again try to access Bob's asset.

Action (Alice): Execute the request again using the following `curl` command:

```shell

curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/catalog/request' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST1' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "CatalogRequest",
  "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
  "counterPartyId": "BPNL00000003AYRE",
  "protocol": "dataspace-protocol-http",
  "querySpec": {
    "offset": 0,
    "limit": 50
  }
}' | jq

```

## Create first contract definition

Let´s see if Alice can see the Asset.

Once again Alice cannot find the data offer. This is by design and to be expected since Bob has only created an asset and a policy definition. An asset and a policy can not be displayed to Alice as a consumer without a contract definition.

:::info

This is the first lesson in this tutorial: For providing data, a contract definition must be created on the provider side. This must always contain an asset, an access policy, and a contract policy.

:::

Contract definitions state how assets and policies are linked together. Contract definitions express under what conditions an asset is published in a data space. Those conditions are comprised of a contract policy and an access policy. Those policies are referenced by ID, that means they must already exist in the policy store before creating the contract definition.

- **Access policy:** determines whether or not a particular consumer can see an asset in the provider's catalog. For example, we may want to restrict certain assets such that only selected consumers from a list of selected partners can access the asset. This can be done using a unique identifier such as the Business Partner Number (BPN). Other data space participants than those whose BPN is listed in the access policy wouldn't even be able to see the asset in the catalog.
- **Contract policy:** determines the conditions for initiating a contract negotiation for a particular asset. Note that this does not automatically guarantee the successful creation of a contract, it merely expresses the eligibility to start the negotiation.

Find additional information on transferring data in the [Developer's Handbook](https://github.com/eclipse-edc/docs/blob/main/developer/handbook.md).

An access policy has already been created and it can also be used as a contract policy.

Let's check if the policy is created correctly:


```shell
curl -L -X GET 'http://dataprovider-controlplane.tx.test/management/v2/policydefinitions/200' \
-H 'X-Api-Key: TEST2' | jq

```

The policy with ID: 200 was successfully created, if the response is something like this

```json

{
  "@id": "200",
  "@type": "PolicyDefinition",
  "createdAt": 1732640748595,
  "policy": {
    "@id": "d7f2161b-1670-4461-ab36-e5aeefcab2e9",
    "@type": "odrl:Set",
    "odrl:permission": {
      "odrl:action": {
        "@id": "USE"
      },
      "odrl:constraint": {
        "odrl:or": {
          "odrl:leftOperand": {
            "@id": "BusinessPartnerNumber"
          },
          "odrl:operator": {
            "@id": "odrl:eq"
          },
          "odrl:rightOperand": "BPNL00000003AZQP"
        }
      }
    },
    "odrl:prohibition": [],
    "odrl:obligation": []
  },
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  }
}

```


Action (Bob): Create a contract definition including the asset and the policies you have created. For this, use the following `curl` command:

```shell

curl -L -X POST 'http://dataprovider-controlplane.tx.test/management/v2/contractdefinitions' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST2' \
--data-raw '{
  "@context": {},
  "@id": "200",
  "@type": "ContractDefinition",
  "accessPolicyId": "200",
  "contractPolicyId": "200",
  "assetsSelector": {
    "@type": "CriterionDto",
    "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
    "operator": "=",
    "operandRight": "200"
  }
}' | jq
```

As a check, the result should look like this:

```json

{
  "@type": "IdResponse",
  "@id": "200",
  "createdAt": 1732698850793,
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  }
}

```

## Request catalog - third try

Let´s see if Alice can finally see the Asset.
Action (Alice): Execute the request again using the following `curl` command:

```shell

curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/catalog/request' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST1' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "CatalogRequest",
  "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
  "counterPartyId": "BPNL00000003AYRE",
  "protocol": "dataspace-protocol-http",
  "querySpec": {
    "offset": 0,
    "limit": 50
  }
}' | jq
```

In the response an additional entry should appear:

```json


{
  "@id": "a8bef433-83ac-4fe0-a2c1-3f988dc187d4",
  "@type": "dcat:Catalog",
  "dspace:participantId": "BPNL00000003AYRE",
  "dcat:dataset": [
      {
      "@id": "200",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": [
        {
          "@id": "MjAw:MjAw:ODliYzY2OWItYjkyYS00NmU2LWEzYjktNzI1MjdjM2U3MTY0",
          "@type": "odrl:Offer",
          "odrl:permission": {
            "odrl:action": {
              "@id": "USE"
            },
            "odrl:constraint": {
              "odrl:or": {
                "odrl:leftOperand": {
                  "@id": "BusinessPartnerNumber"
                },
                "odrl:operator": {
                  "@id": "odrl:eq"
                },
                "odrl:rightOperand": "BPNL00000003AZQP"
              }
            }
          },
          "odrl:prohibition": [],
          "odrl:obligation": []
        }
        
      ],
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AzureStorage-PUSH"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpData-PULL"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpData-PUSH"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3-PULL"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AmazonS3-PUSH"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        },
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "AzureStorage-PULL"
          },
          "dcat:accessService": {
            "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
            "@type": "dcat:DataService",
            "dcat:endpointDescription": "dspace:connector",
            "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
            "dct:terms": "dspace:connector",
            "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
          }
        }
      ],
      "description": "Product EDC Demo Asset",
      "id": "200"
    }
  ],
  "dcat:service": {
    "@id": "cf8a77da-dbe9-4d95-bd15-7a250706511e",
    "@type": "dcat:DataService",
    "dcat:endpointDescription": "dspace:connector",
    "dcat:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
    "dct:terms": "dspace:connector",
    "dct:endpointUrl": "http://dataprovider-controlplane.tx.test/api/v1/dsp"
  },
  "participantId": "BPNL00000003AYRE",
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "dcat": "http://www.w3.org/ns/dcat#",
    "dct": "http://purl.org/dc/terms/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  }
}

```

:::info
Finally Alice can see the Contract Offer from Bob. Congratulations on yor first successful offering of data in your own data space!
:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 ARENA2036 e.V.
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
