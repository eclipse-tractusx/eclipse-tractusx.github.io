---
title: Provide data
sidebar_position: 2
---

This tutorial guides you through the process of creating and providing data in a local dataspace using the Eclipse Dataspace Connector (EDC). You'll create an asset,
define policies, and set up a contract definition for data sharing.

## Create your first data asset

We will start by creating an asset that represents the data to be shared. The data provider (Bob) uses the **[Management API](https://app.swaggerhub.com/apis/eclipse-edc-bot/management-api)** to define the asset.
For better understanding, the cURL commands are provided and explained in detail for every step. For nearly every request a response is expected.

:::tip curl explanation

1. **URL and Method**:
   - `-L`: Ensures redirections are followed if the URL returns a redirect response.
   - `-X POST`: Specifies the HTTP method as `POST`.

2. **Headers**:
   - `-H 'Content-Type: application/json'`: Indicates that the payload is in JSON format.
   - `-H 'X-Api-Key: TEST2'`: Sends an API key for authentication.

3. **Payload**:
   - `--data-raw`: Includes the JSON payload to be sent with the `POST` request.

4. **Piping into `jq`**:
   - The output is piped into `jq` to format and colorize the JSON response for easier reading.

:::

:::note
**Actors in this tutorial:**

- **Bob**: data provider, is reachable via `http://dataprovider-controlplane.tx.test`
- **Alice**: data consumer, is reachable via `http://dataconsumer-1-controlplane.tx.test`

:::

### Step 1: Create the asset

Alice, as a data consumer, wants to consume data from Bob. Bob, as a data provider, needs to create an asset for Alice.
Run the following `curl` command to create the asset:

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
  }' | jq
```

#### Expected output

If successful, the response should look like this:

```json
{
  "@id": "200",
  "properties": {
    "description": "Product EDC Demo Asset"
  },
  "dataAddress": {
    "type": "HttpData",
    "baseUrl": "https://jsonplaceholder.typicode.com/todos/3"
  }
}
```

### Step 2: Validate the asset

Check that the asset was created successfully by running the following for requesting the specific asset with ID 200:

```bash
curl -L -X GET 'http://dataprovider-controlplane.tx.test/management/v3/assets/200' \
-H 'X-Api-Key: TEST2' | jq
```

Alternatively, retrieve all assets:

```bash
curl -L -X POST 'http://dataprovider-controlplane.tx.test/management/v3/assets/request' \
-H "x-api-key: TEST2" \
-H "content-type: application/json" | jq
```

#### Expected output

The result for the first command shows just the newly created asset:

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

The second request will return all assets. It`s called request catalog and will be explained in the next step.

## Request the catalog

Once the asset is created, Alice (the data consumer) can try request a catalog of available (offered) data.

:::note
Alice can only see the offered data if a Access Policy was assigned.
:::

### Step 1: Request contract offers

Alice sends a `CatalogRequest` to Bob's connector to discover available assets:

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

#### Expected Output

Alice's catalog response will include available assets like this (but not the newly created asset with ID: 200):

:::tip
If the asset is not visible, ensure the **Access Policy** and **Contract Definition** are created on Bob's side.
:::

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

## Create a first access policy

Bob creates an **Access Policy** to determine who can view the data offer.

### Step 1: Create the policy

Run this `curl` command:

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

In this case a **Access Policy** is created. The assigned asset will only be visible as a data offer for the Business Partner Number `BPNL00000003AZQP`.

#### Expected Output

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

### Step 2: Request catalog - second try

Now that Bob created an access policy, Alice can once again try to access Bob's offer by running this `curl`.

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

#### Expected Output

Since the asset is still not visible, the response will be the same as before. This is expected, as the asset is not yet linked to the policy.

:::tip
Once again Alice cannot find the data offer. This is by design and to be expected since Bob has only created an asset and a policy definition. An asset and a policy can not be displayed to Alice as a consumer without a contract definition.
**For providing data, a contract definition must be created on the provider side. This must always contain an asset, an access policy, and a contract policy.**

Contract definitions state how assets and policies are linked together. Contract definitions express under what conditions an asset is published in a data space. Those conditions are comprised of a contract policy and an access policy. Those policies are referenced by ID, that means they must already exist in the policy store before creating the contract definition.

- **Access policy:** determines whether or not a particular consumer can see an asset in the provider's catalog. For example, we may want to restrict certain assets such that only selected consumers from a list of selected partners can access the asset. This can be done using a unique identifier such as the Business Partner Number (BPN). Other data space participants than those whose BPN is listed in the access policy wouldn't even be able to see the asset in the catalog.
- **Contract policy:** determines the conditions for initiating a contract negotiation for a particular asset. Note that this does not automatically guarantee the successful creation of a contract, it merely expresses the eligibility to start the negotiation.

Find additional information on transferring data in the [Developer's Handbook](https://github.com/eclipse-edc/docs/blob/main/developer/handbook.md).
:::

## Define a contract definition

Alice still cannot see the asset because Bob hasn't created a **Contract Definition**. Contract definitions link assets and policies to define usage terms.

### Step 1: Create the contract definition

First of all run this `curl` command to check if the policy is created correctly:

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

Run this `curl` command to create a contract definition including the asset and the policies you have created:

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

#### Expected Output

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

## Verify data availability

Alice re-requests the catalog. This time, she should see Bob's asset in the catalog:

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

### Expected Output

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
