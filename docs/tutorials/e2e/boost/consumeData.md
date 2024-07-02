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

The response shows all available data offerings in Bob's catalog. Bob has already told Alice that he gave the Asset the ID 3, and added a simple description to make it easier for Alice to identify.

Alice finds the Asset with the ID 3 and the description "Product EDC Demo Asset 3" in the catalog. Now that she is sure which Asset she wants to consume, she wants to start the data transfer.

## Negotiate a contract

:::info
Dont forget to change the `offerId`with the one you received in the previous step in your catalog request.
:::

But before she can transfer the data, she must negotiate the contract with Bob. To do this, she uses the following `curl` command:

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/contractnegotiations' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST1' \
--data-raw '{
 "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
 },
 "@type": "NegotiationInitiateRequestDto",
 "connectorAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
 "protocol": "dataspace-protocol-http",
 "providerId": "BPNL00000003AYRE",
 "offer": {
    "offerId": "Mw==:Mw==:NTYzYWRkYTItNmEzMy00YTNhLWFmOTQtYjVjOWM0ZDMyODA1",
    "assetId": "3",
    "policy": {
        "@type": "odrl:Set",
        "odrl:permission": [],
        "odrl:prohibition": [],
        "odrl:obligation": [],
        "odrl:target": "3"
    }
 }
}' | jq
```

The response should look like this:

```json
{
  "@type": "edc:IdResponse",
  "@id": "65356596-dd7c-4ad4-8fc6-8512be6f0ec2",
  "edc:createdAt": 1715669329095,
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

In the response, Alice gets a UUID (attribute is `@id`). This is the ID of the created contract negotiation. Alice can now use this ID to see the current status of the negotiation and - if the negotiation was successful - the ID of the created contract agreement.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received. in the current case the UUID is `65356596-dd7c-4ad4-8fc6-8512be6f0ec2`. So the curl command should look like this:

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/contractnegotiations/65356596-dd7c-4ad4-8fc6-8512be6f0ec2' \
--header 'X-Api-Key: TEST1' | jq
```

:::

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/contractnegotiations/<ID>' \
--header 'X-Api-Key: TEST1' | jq
```

- If the negotiation was **successful**, Alice will see an ouput as shown below.
- If the negotiation was **unsuccessful**, the negotiation state (`edc:state`) will be `TERMINATED` and no contract agreement ID will be present.

```json
{
  "@type": "edc:ContractNegotiation",
  "@id": "65356596-dd7c-4ad4-8fc6-8512be6f0ec2",
  "edc:type": "CONSUMER",
  "edc:protocol": "dataspace-protocol-http",
  "edc:state": "FINALIZED",
  "edc:counterPartyId": "BPNL00000003AYRE",
  "edc:counterPartyAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
  "edc:callbackAddresses": [],
  "edc:createdAt": 1715669329095,
  "edc:contractAgreementId": "Mw==:Mw==:N2RhZGI3OGMtYzUxNC00OTkzLWI3MzktNDE3YmJhMDNkMDU4",
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

Alice now has a contract with Bob and can begin transferring the asset's data.

## Starting the data transfer

Alice wants to send the data to her backend application ("<http://backend:8080>"). So she uses the following command to direct the data from Asset 3 to her desired data sink.

:::warning

For testing purposes, you should replace `<backend>` with your own test API or use [webhook.site](https://webhook.site/) as your backend system.
If you do not change this, you will not be able to view the received token, which is required for requesting the data!
If you are using webhook.site, please make sure that you use "Your unique URL" and that you do not transfer any sensitive information to webhook.

Replace `<contractAgreementId>` with the contract agreement ID you received in the previous step.
:::

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/transferprocesses' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: TEST1' \
--data-raw '{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "assetId": "3",
    "connectorAddress": "http://dataprovider-controlplane.tx.test/api/v1/dsp",
    "connectorId": "BPNL00000003AYRE",
    "contractId": "<contractAgreementId>",
    "dataDestination": {
        "type": "HttpProxy"
    },
    "privateProperties": {
        "receiverHttpEndpoint": "<backend:8080>"
    },
    "protocol": "dataspace-protocol-http",
    "transferType": {
        "contentType": "application/octet-stream",
        "isFinite": true
    }
}' | jq
```

The response in this case looks like this:

```json
{
  "@type": "edc:IdResponse",
  "@id": "9d6a0507-25f5-4a81-8885-a47bc3809451",
  "edc:createdAt": 1715669899367,
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

Just to make sure everything worked, Alice uses another `curl` command to check if the transfer was successful.

In the response, Alice gets a UUID. This is the ID of the created transfer. Alice can now use this ID to see the current status of the transfer.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received. In our case, the UUID is `9d6a0507-25f5-4a81-8885-a47bc3809451`. So the curl command should look like this:

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/transferprocesses/9d6a0507-25f5-4a81-8885-a47bc3809451' \
--header 'X-Api-Key: TEST1' | jq
```

:::

```shell
curl --location 'http://dataconsumer-1-controlplane.tx.test/management/v2/transferprocesses/<ID>' \
--header 'X-Api-Key: TEST1' | jq
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
    "dct": "https://purl.org/dc/terms/",
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
