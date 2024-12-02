---
title: Consume data
sidebar_position: 3
---

This step continues the journey of our data consumer Alice. After the data provider Bob has successfully provided his data as a contract definition in his catalog. Alice will now consume the data.

We will use plain CLI tools (`curl`) for this, but feel free to use graphical tools such as Postman or Insomnia.

## Step 1: Request the catalog

To see Bob's data offerings, Alice must request access to his catalog. The catalog shows all the assets that Alice can consume from Bob.

### Catalog request (Alice)

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

### Catalog response

The highlighted line represents the offer id, which is important for later steps.

```json
{
  "@id": "200",
  "@type": "dcat:Dataset",
  "odrl:hasPolicy": {
    // highlight-next-line
    "@id": "MjAw:MjAw:Y2ZjMzdlNmUtODAwNi00NGJjLWJhMWYtNjJkOWIzZWM0ZTQ3",
    "@type": "odrl:Offer",
    "odrl:permission": {
      "odrl:action": {
        "odrl:type": "USE"
      },
      "odrl:constraint": {
        "odrl:or": {
          "odrl:leftOperand": "BusinessPartnerNumber",
          "odrl:operator": {
            "@id": "odrl:eq"
          },
          "odrl:rightOperand": "BPNL00000003AZQP"
        }
      }
    }
  }
}
```

## Step 2: Initiate an edr

To consume the data, Alice uses the offer ID from the catalog response (`MjAw:MjAw:Y2ZjMzdlNmUtODAwNi00NGJjLWJhMWYtNjJkOWIzZWM0ZTQ3`) and the target asset ID (`200`) to initiate an EDR.

### EDR request

```shell
curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' \
  --data-raw '{
    "@context": [
      "https://w3id.org/tractusx/policy/v1.0.0",
      "http://www.w3.org/ns/odrl.jsonld",
      { "@vocab": "https://w3id.org/edc/v0.0.1/ns/" }
    ],
    "@type": "ContractRequest",
    "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
    "protocol": "dataspace-protocol-http",
    "policy": {
      "assigner": "BPNL00000003AYRE",
      "target": "200",
      "@id": "MjAw:MjAw:Y2ZjMzdlNmUtODAwNi00NGJjLWJhMWYtNjJkOWIzZWM0ZTQ3",
        "@type": "odrl:Offer",
        "odrl:permission": {
          "odrl:action": {
            "odrl:type": "USE"
          },
          "odrl:constraint": {
            "odrl:or": {
              "odrl:leftOperand": "BusinessPartnerNumber",
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
    "callbackAddresses": []
  }' | jq
```


curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' \
  --data-raw '{
    "@context": [
      "https://w3id.org/tractusx/policy/v1.0.0",
      "http://www.w3.org/ns/odrl.jsonld",
      { "@vocab": "https://w3id.org/edc/v0.0.1/ns/" }
    ],
    "@type": "ContractRequest",
    "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
    "protocol": "dataspace-protocol-http",
    "policy": {
      "assigner": "BPNL00000003AYRE",
      "target": "700",
      "@id": "MjIwMA==:NzAw:OGQ1MmZjOWQtYWE1Yy00NTc2LWI5NjYtZGNkODRmYmQzNGM3",
        "@type": "odrl:Offer",
        "odrl:permission": {
          "odrl:action": {
            "odrl:type": "USE"
          },
          "odrl:constraint": {
            "odrl:or": {
              "odrl:leftOperand": "BusinessPartnerNumber",
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
    "callbackAddresses": []
  }' | jq





### EDR response

```json
{
  "@type": "IdResponse",
  // highlight-next-line
  "@id": "4b260501-ae2f-46f4-9efc-01ba5a0b3d96",
  "createdAt": 1732726185609,
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

## Step 3: Query cached edrs

Alice now queries cached EDRs using the contract negotiation ID (`4b260501-ae2f-46f4-9efc-01ba5a0b3d96`) from the previous response.

### Query edrs request

```shell
curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs/request' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' \
  --data-raw '{
    "@context": { "@vocab": "https://w3id.org/edc/v0.0.1/ns/" },
    "@type": "QuerySpec",
    "filterExpression": [
      {
        "operandLeft": "contractNegotiationId",
        "operator": "=",
        // highlight-next-line
        "operandRight": "4b260501-ae2f-46f4-9efc-01ba5a0b3d96"
      }
    ]
  }' | jq
```

### Query edrs response

```json
{
  "@id": "bdd4af10-9e4a-4796-b4b7-7ecdf91a533a",
  "@type": "EndpointDataReferenceEntry",
  "providerId": "BPNL00000003AYRE",
  "assetId": "200",
  "agreementId": "2ece6f45-ff09-4417-b5a9-a92a1849f1d0",
  "transferProcessId": "bdd4af10-9e4a-4796-b4b7-7ecdf91a533a",
  "createdAt": 1732726189831,
  "contractNegotiationId": "4b260501-ae2f-46f4-9efc-01ba5a0b3d96",
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

## Step 4: Get authorization details

Alice uses the transfer process ID (`bdd4af10-9e4a-4796-b4b7-7ecdf91a533a`) to get authorization details.

### Authorization request

```bash
curl -L -X GET 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs/bdd4af10-9e4a-4796-b4b7-7ecdf91a533a/dataaddress?auto_refresh=true' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' | jq
```

### Authorization response

```json
{
  "@type": "DataAddress",
  "endpointType": "https://w3id.org/idsa/v4.1/HTTP",
  "tx-auth:refreshEndpoint": "http://dataprovider-dataplane.tx.test/api/public/token",
  "tx-auth:audience": "did:web:ssi-dim-wallet-stub.tx.test:BPNL00000003AZQP",
  "type": "https://w3id.org/idsa/v4.1/HTTP",
  "endpoint": "http://dataprovider-dataplane.tx.test/api/public",
  "tx-auth:refreshToken": "eyJraWQiOiJ0b2tlblNpZ25lclB1YmxpY0tleSIsImFsZyI6IlJTMjU2In0.eyJleHAiOjE3MzI3MjY0ODksImlhdCI6MTczMjcyNjE4OSwianRpIjoiODA2OTAwYmQtNGY4MS00MzhmLTgyMjYtZDc2ZjkzMmY2MjI1In0.JpTIrOJv609vX86i-y-O8sQcKoTJcWvipC6jyBgWqcEIMWm4dmm4T72z-Z68l1X7QnVq1Ak8JB-fA05ONNL1JjU0W7j6rJK01M2Xo641RpecimxuFhlnld55CPks2wRbbbzHADn8kpqRf2dtNrnsiuRsnzAi6KAkFAEHLB7eLjceNbkk6df3hJrLfnn0DZ6M-OR0O05SgtEyHFsyMpf4OALQwVREIkC7LBTWn7nYCpmzK4ilrL3eM5ZRrbweQ96Tbwi-rfPfp-ptnelO_GGnqzyQef2DN5Eg4P5QZV4QX62Bw0eoYVncgCP6ZKibymnlASG0xHwgEJitu3ZSxBXt-w",
  "tx-auth:expiresIn": "300",
  "authorization": "eyJraWQiOiJ0b2tlblNpZ25lclB1YmxpY0tleSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJCUE5MMDAwMDAwMDNBWVJFIiwiYXVkIjoiQlBOTDAwMDAwMDAzQVpRUCIsInN1YiI6IkJQTkwwMDAwMDAwM0FZUkUiLCJleHAiOjE3MzI3MjY0ODksImlhdCI6MTczMjcyNjE4OSwianRpIjoiODRkZDIxOGItMzk1ZC00YmExLTg2OWUtOWYzMjI3ZWM0NWFlIn0.jTKEv8Fh75W1JOwrFUo1wyLdUOyBn3g500dWNUbaEC_bgASPImXfXnY3rhIVr_hrFY-anJIB_a6SkpTWb7lycCh2dcMaOmUVgmdKTcEvTr2blAXD_WUZTQYxHDVsMuPXDbX-30tYM4KVPOyemfe7IreB38n104j_SLo2Dr1BrbN9xU7mUm6DeKv1oi0TFRxnmhwnRx4hK1eBYIO-FuA9h1RDvfLWXW5yF55KkkrRTjX2HKqVPAtHInMZBRDhqB298N_VLpwQMtg9nkElzNWIUqEV4zQ1YLSsGNLSxog7JwuL3Tvy1VCOkzDkr6K89Z4IWEF0GzPjXO6Z-li_Vv7DVw",
  "tx-auth:refreshAudience": "did:web:ssi-dim-wallet-stub.tx.test:BPNL00000003AZQP",
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

## Step 5: Fetch data

Using the endpoint and authorization token from the response, Alice fetches the data.

### Fetch data request

```bash
curl -L -X GET 'http://dataprovider-dataplane.tx.test/api/public/urn:uuid:b77c6d51-cd1f-4c9d-b5d4-091b22dd306b' \
  -H 'Authorization: eyJraWQiOiJ0b2tlblNpZ25lclB1YmxpY0tleSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJCUE5MMDAwMDAwMDNBWVJFIiwiYXVkIjoiQlBOTDAwMDAwMDAzQVpRUCIsInN1YiI6IkJQTkwwMDAwMDAwM0FZUkUiLCJleHAiOjE3MzI3MjY0ODksImlhdCI6MTczMjcyNjE4OSwianRpIjoiODRkZDIxOGItMzk1ZC00YmExLTg2OWUtOWYzMjI3ZWM0NWFlIn0.jTKEv8Fh75W1JOwrFUo1wyLdUOyBn3g500dWNUbaEC_bgASPImXfXnY3rhIVr_hrFY-anJIB_a6SkpTWb7lycCh2dcMaOmUVgmdKTcEvTr2blAXD_WUZTQYxHDVsMuPXDbX-30tYM4KVPOyemfe7IreB38n104j_SLo2Dr1BrbN9xU7mUm6DeKv1oi0TFRxnmhwnRx4hK1eBYIO-FuA9h1RDvfLWXW5yF55KkkrRTjX2HKqVPAtHInMZBRDhqB298N_VLpwQMtg9nkElzNWIUqEV4zQ1YLSsGNLSxog7JwuL3Tvy1VCOkzDkr6K89Z4IWEF0GzPjXO6Z-li_Vv7DVw'
```

### Fetch data response

```json
{
  "parentParts": [
    {
      "validityPeriod": {
        "validFrom": "2023-03-21T08:47:14.438+01:00",
        "validTo": "2024-08-02T09:00:00.000+01:00"
      },
      "parentCatenaXId": "urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e",
      "quantity": {
        "quantityNumber": 2.5,
        "measurementUnit": "unit:litre"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z"
    },
    {
      "validityPeriod": {
        "validFrom": "2023-03-21T08:47:14.438+01:00",
        "validTo": "2024-08-02T09:00:00.000+01:00"
      },
      "parentCatenaXId": "urn:uuid:68904173-ad59-4a77-8412-3e73fcafbd8b",
      "quantity": {
        "quantityNumber": 2.5,
        "measurementUnit": "unit:litre"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z"
    }
  ],
  "catenaXId": "urn:uuid:2c57b0e9-a653-411d-bdcd-64787e9fd3a7"
}
```

:::tip congratulations
your data has been successfully transfered!
:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- SPDX-FileCopyrightText: 2023 Materna Information & Communications SE
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
