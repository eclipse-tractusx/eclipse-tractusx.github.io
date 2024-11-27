---
title: Consume data
sidebar_position: 3
---

This step continues the journey of our data consumer Alice. After the data provider Bob has successfully provided his data as a contract definition in his catalog. Alice will now consume the data.

We will use plain CLI tools (`curl`) for this, but feel free to use graphical tools such as Postman or Insomnia.

## Request the catalog

To see Bob's data offerings, Alice must request access to his catalog. The catalog shows all the assets that Alice can consume from Bob.

So Alice requests Bob's catalog using the following `curl` commands:

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


Ab hier überflüssig bis siehen unten


The response shows all available data offerings in Bob's catalog. Bob has already told Alice that he gave the Asset the ID 200, and added a simple description to make it easier for Alice to identify.

Alice finds the Asset with the ID 200 and the description "Product EDC Demo Asset" in the catalog. Now that she is sure which Asset she wants to consume, she wants to start the data transfer.

## Negotiate a contract

:::info
Dont forget to change the `offerId`with the one you received in the previous step in your catalog request. The `offerId` could look like this:  "@id": "MjAw:MjAw:ODliYzY2OWItYjkyYS00NmU2LWEzYjktNzI1MjdjM2U3MTY0"
:::

But before she can transfer the data, she must negotiate the contract with Bob. To do this, she uses the following `curl` command:

```shell

curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/contractnegotiations' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST1' \
--data-raw '{
	"@context": {
		"@vocab": "https://w3id.org/edc/v0.0.1/ns/"
	},
	"@type": "NegotiationInitiateRequestDto",
	"counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
	"protocol": "dataspace-protocol-http",
	"policy": {
		"@context": "http://www.w3.org/ns/odrl.jsonld",
		"@type": "odrl:Offer",
    // highlight-next-line
		"@id": "---Insert offer ID here---",
    "assigner": "BPNL00000003AYRE",
		"permission": {
			"odrl:target": "200",
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
		"prohibition": [],
		"obligation": [],
		"target": "200"
	}
}' | jq
```

The response should look like this:

```json
{
  "@type": "IdResponse",
      // highlight-next-line
  "@id": "f42396cd-be8d-498b-b74d-8c0ead798ad5",
  "createdAt": 1732699413292,
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

In the response, Alice gets a UUID (attribute is `@id`). This is the ID of the created contract negotiation. Alice can now use this ID to see the current status of the negotiation and - if the negotiation was successful - the ID of the created contract agreement.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received. in the current case the UUID is `f42396cd-be8d-498b-b74d-8c0ead798ad5`.
:::

```shell
curl -L -X GET 'http://dataconsumer-1-controlplane.tx.test/management/v2/contractnegotiations/<ID>' \
--header 'X-Api-Key: TEST1' | jq
```

- If the negotiation was **successful**, Alice will see an ouput as shown below.
- If the negotiation was **unsuccessful**, the negotiation state (`edc:state`) will be `TERMINATED` and no contract agreement ID will be present.

```json

{
  "@type": "ContractNegotiation",
  "@id": "f42396cd-be8d-498b-b74d-8c0ead798ad5",
  "type": "CONSUMER",
  "protocol": "dataspace-protocol-http",
  "state": "FINALIZED",
  "counterPartyId": "BPNL00000003AYRE",
  "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
  "callbackAddresses": [],
  "createdAt": 1732699413292,
  "contractAgreementId": "76e8435b-ddb9-4005-a6b1-4b6cfdd17306",
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

Alice now has a contract with Bob and can begin transferring the asset's data.

## Starting the data transfer

Alice wants to send the data to her backend application ("<http://backend:8080>"). So she uses the following command to direct the data from Asset 200 to her desired data sink.

:::warning

For testing purposes, you should replace `<backend>` with your own test API or use [webhook.site](https://webhook.site/) as your backend system.
If you do not change this, you will not be able to view the received token, which is required for requesting the data!
If you are using webhook.site, please make sure that you use "Your unique URL" and that you do not transfer any sensitive information to webhook.

Replace `<contractAgreementId>` with the contract agreement ID you received in the previous step.
:::

```shell

curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/transferprocesses' \
-H 'Content-Type: application/json' \
-H 'X-Api-Key: TEST1' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "TransferRequest",
  "protocol": "dataspace-protocol-http",
  "counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
        // highlight-next-line
  "contractId": "<contractAgreementId>",
  "assetId": "200",
  "transferType": "HttpData-PULL",
  "dataDestination":  {
    "type": "HttpProxy"
  },
  "connectorId": "BPNL00000003AZQP",
  "privateProperties": {
        "receiverHttpEndpoint": "<backend:8080>"
    },
  "callbackAddresses": [
    {
      "transactional": true,
      "uri": "http://dataprovider-submodelserver.tx.test/api/v1/transfers"
    }
  ]
}' | jq

```

The response in this case looks like this:

```json
{
  "@type": "IdResponse",
   // highlight-next-line
  "@id": "e547fbfc-8229-4366-9039-125a82b0ea43",
  "createdAt": 1732713519152,
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "tx-auth": "https://w3id.org/tractusx/auth/",
    "cx-policy": "https://w3id.org/catenax/policy/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  }

```

Just to make sure everything worked, Alice uses another `curl` command to check if the transfer was successful.

In the response, Alice gets a UUID. This is the ID of the created transfer. Alice can now use this ID to see the current status of the transfer.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received. In our case, the UUID is `e547fbfc-8229-4366-9039-125a82b0ea43`.
:::

```shell

curl -L -X GET 'http://dataconsumer-1-controlplane.tx.test/management/v2/transferprocesses/{{transfer_id}}' \
-H 'X-Api-Key: TEST1' | jq

```

- If the transfer was **successful**, Alice will see an ouput as shown below.
- If the transfer was **unsuccessful**, the transfer state (`edc:state`) will be `TERMINATED`.

```json
{
  "@id": "9d6a0507-25f5-4a81-8885-a47bc3809451",
  "@type": "edc:TransferProcess",
  "edc:correlationId": "9d6a0507-25f5-4a81-8885-a47bc3809451",
  "edc:state": "STARTED",
  "edc:stateTimestamp": 1715669901450,
  "edc:type": "CONSUMER",
  "edc:assetId": "3",
  "edc:contractId": "Mw==:Mw==:N2RhZGI3OGMtYzUxNC00OTkzLWI3MzktNDE3YmJhMDNkMDU4",
  "edc:callbackAddresses": [],
  "edc:dataDestination": {
    "@type": "edc:DataAddress",
    "edc:type": "HttpProxy"
  },
  "edc:connectorId": "BPNL00000003AYRE",
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

The response shows her that she has a `STARTED` transfer with the type `CONSUMER` of the asset with the ID `3`.
Note, that a consumer pull transfer will **not** advance to the `COMPLETED` state, but instead will stay in state `STARTED`.
This means, that Alice can now request the data using the information received by her backend.

:::info

If you used webhook.site as your backend system, you can now go to [webhook.site](https://webhook.site/) and see the received token.

:::

## Consume the data

In her backend (as already mentioned [webhook.site](https://webhook.site/)) you will now find the following (as an example) entry

![Consume data backend](/tutorials/e2e/consume_data_backend.png)

```json
{
  "id": "9d6a0507-25f5-4a81-8885-a47bc3809451",
  "endpoint": "http://dataprovider-dataplane.tx.test/api/public",
  "authKey": "Authorization",
  "authCode": "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3MTU2NzA1MDEsImRhZCI6IjFFQ29ReDRBTy9acmJ6dXEwUlpSY0tYd1hQeW81UmdPZndyRWtIWnpZSStQVGhIUmFuelczeGpXcU5vTzFJa3ZOWUV6SGpEWU5iVEJ5VDgzbzdtVlVsUWZhYUpKSm5CMVJGbFQ1SXM0NHpZQ0RJYWZKNHhmQzZTOFNKaWxjV0x1WURoc24xRjdha2xSZllnemRIMjR3WnJycS9JU0pPZjFzVHNQSHNtcE9PaWZ2S2ZyaElFemtJSEs3OFZUTFBMd0krWmNEK3VZc1FCQkt5NlEvZFBCSkZodWsyMXFiOVU1V3dZWWpPYkZSQjdzUmpZYkNsSlpyaTZzVWFXQU1WOXVsQ2JGS2NPM2xxMERPaWRuQjNqSXJ4blh4Y3JjVHl3MEkzV3JjN2k2ZG1nejlXMTFvYTR5VUpJWU92R1lkdWNXdk1pemk3b01mck5SdXE0SVJ1djR6ai9Cemcxb2NZalB5Y0RvK2I2M0RheWpyWmVNS1c4OGNRUnlvUDdpbExsMVNVVmFlRUxZQ3lieitCYUxpd2x1d0lpcWxFckJrTDNlOXptNGpJYz0iLCJjaWQiOiJNdz09Ok13PT06TjJSaFpHSTNPR010WXpVeE5DMDBPVGt6TFdJM016a3ROREUzWW1KaE1ETmtNRFU0In0.AOt6rXbcK44RD7XNCMN16zjvurzdkMNCki3HkvZ_VJ43eDkCDDbquDSvW0SmEnp9cqhjMbUqnO-iGJheI4TbkIc9dxFouJGtHvKFAjOG7LFSErwvH0yNXus1TPN41BCp_jP1tpH63s3PuRqgdzzn1axkJ57aGo9ibqnKRm7ZhM8pgkReWQpHwlFz3QuOMFWHNmPm_HMePPsUxZM7OpARwgShGMqATHEJmoIff2S1yLLeN0k97JT4BzL7xwM9VB-Yssq1rWxBp3GITcBta5R1EVjzaEZseYn_wxFFmVlXQtu_lkvbgihEsvCgtXI_c-EGZl_gTVe9DMfq4cM2XXfE8A",
  "properties": {}
}
```

Alice can now request the data using the provided information as follows:

```shell
curl -X GET -H '<authKey>: <authCode>' <endpoint>
```

:::warning
In this example, we can not use the endpoint URL as is, because we are working with a local Kubernetes cluster and can not use the cluster internal URL. Therefore, we have to use the ingress URL instead.
:::

In this example, this results in the following request:

```shell
curl -X GET -H 'Authorization: eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3MTU2NzA1MDEsImRhZCI6IjFFQ29ReDRBTy9acmJ6dXEwUlpSY0tYd1hQeW81UmdPZndyRWtIWnpZSStQVGhIUmFuelczeGpXcU5vTzFJa3ZOWUV6SGpEWU5iVEJ5VDgzbzdtVlVsUWZhYUpKSm5CMVJGbFQ1SXM0NHpZQ0RJYWZKNHhmQzZTOFNKaWxjV0x1WURoc24xRjdha2xSZllnemRIMjR3WnJycS9JU0pPZjFzVHNQSHNtcE9PaWZ2S2ZyaElFemtJSEs3OFZUTFBMd0krWmNEK3VZc1FCQkt5NlEvZFBCSkZodWsyMXFiOVU1V3dZWWpPYkZSQjdzUmpZYkNsSlpyaTZzVWFXQU1WOXVsQ2JGS2NPM2xxMERPaWRuQjNqSXJ4blh4Y3JjVHl3MEkzV3JjN2k2ZG1nejlXMTFvYTR5VUpJWU92R1lkdWNXdk1pemk3b01mck5SdXE0SVJ1djR6ai9Cemcxb2NZalB5Y0RvK2I2M0RheWpyWmVNS1c4OGNRUnlvUDdpbExsMVNVVmFlRUxZQ3lieitCYUxpd2x1d0lpcWxFckJrTDNlOXptNGpJYz0iLCJjaWQiOiJNdz09Ok13PT06TjJSaFpHSTNPR010WXpVeE5DMDBPVGt6TFdJM016a3ROREUzWW1KaE1ETmtNRFU0In0.AOt6rXbcK44RD7XNCMN16zjvurzdkMNCki3HkvZ_VJ43eDkCDDbquDSvW0SmEnp9cqhjMbUqnO-iGJheI4TbkIc9dxFouJGtHvKFAjOG7LFSErwvH0yNXus1TPN41BCp_jP1tpH63s3PuRqgdzzn1axkJ57aGo9ibqnKRm7ZhM8pgkReWQpHwlFz3QuOMFWHNmPm_HMePPsUxZM7OpARwgShGMqATHEJmoIff2S1yLLeN0k97JT4BzL7xwM9VB-Yssq1rWxBp3GITcBta5R1EVjzaEZseYn_wxFFmVlXQtu_lkvbgihEsvCgtXI_c-EGZl_gTVe9DMfq4cM2XXfE8A' http://dataprovider-dataplane.tx.test/api/public  | jq
```

:::info
Currently the response for this curl commoand is

```json
{
  "userId": 1,
  "id": 3,
  "title": "fugiat veniam minus",
  "completed": false
}
```

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- SPDX-FileCopyrightText: 2023 Materna Information & Communications SE
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)






Hier gehts los



Erster Schritt ist Catalog request. 


RESPONSE
...

 {
      "@id": "200",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": {
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
...



Von da bekommen wir Policy offer ID. 
Dann Initiate EDR 
Am besten alles unter taget: 200 komplett aus Catalog response kopieren



curl -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' \
   --data-raw '{
    "@context": [
        "https://w3id.org/tractusx/policy/v1.0.0",
        "http://www.w3.org/ns/odrl.jsonld",
        {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        }
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



RESPONSE

{
  "@type": "IdResponse",
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






Query EDRs Cashed
Aus der response die contract negotiation ID in operandRight kopieren



curl  -L -X POST 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs/request' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1' \
  --data-raw '{
    "@context": [
        {
          "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        }
    ],
    "@type": "QuerySpec",
    "filterExpression": [
        {
            "operandLeft": "contractNegotiationId",
            "operator": "=",
            "operandRight": "4b260501-ae2f-46f4-9efc-01ba5a0b3d96"
        }
    ]
}' | jq


RESPONSE

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





Get Auth Code: Aus response die Transfer-Process ID kopieren und hinter EDRS in URL einfügen


curl -L -X GET 'http://dataconsumer-1-controlplane.tx.test/management/v2/edrs/bdd4af10-9e4a-4796-b4b7-7ecdf91a533a/dataaddress?auto_refresh=true' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: TEST1'  | jq


RESPONSE:

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



Get Data: 
Aus vorheriger response: den Endpoint kopieren und die Autorization (Token) kopieren und einfügen



curl -L -X GET 'http://dataprovider-dataplane.tx.test/api/public' \
 -H 'Authorization: eyJraWQiOiJ0b2tlblNpZ25lclB1YmxpY0tleSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJCUE5MMDAwMDAwMDNBWVJFIiwiYXVkIjoiQlBOTDAwMDAwMDAzQVpRUCIsInN1YiI6IkJQTkwwMDAwMDAwM0FZUkUiLCJleHAiOjE3MzI3MjY0ODksImlhdCI6MTczMjcyNjE4OSwianRpIjoiODRkZDIxOGItMzk1ZC00YmExLTg2OWUtOWYzMjI3ZWM0NWFlIn0.jTKEv8Fh75W1JOwrFUo1wyLdUOyBn3g500dWNUbaEC_bgASPImXfXnY3rhIVr_hrFY-anJIB_a6SkpTWb7lycCh2dcMaOmUVgmdKTcEvTr2blAXD_WUZTQYxHDVsMuPXDbX-30tYM4KVPOyemfe7IreB38n104j_SLo2Dr1BrbN9xU7mUm6DeKv1oi0TFRxnmhwnRx4hK1eBYIO-FuA9h1RDvfLWXW5yF55KkkrRTjX2HKqVPAtHInMZBRDhqB298N_VLpwQMtg9nkElzNWIUqEV4zQ1YLSsGNLSxog7JwuL3Tvy1VCOkzDkr6K89Z4IWEF0GzPjXO6Z-li_Vv7DVw'

  
RESPONSE:

 {
  "userId": 1,
  "id": 3,
  "title": "fugiat veniam minus",
  "completed": false
} 


