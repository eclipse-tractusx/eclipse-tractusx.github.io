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
}' | jq
```

The response shows all available data offerings in Bob's catalog. Bob has already told Alice that he gave the Asset the ID 3, and added a simple description to make it easier for Alice to identify.

Alice finds the Asset with the ID 3 and the description "Product EDC Demo Asset 3" in the catalog. Now that she is sure which Asset she wants to consume, she wants to start the data transfer.

## Negotiate a contract

But before she can transfer the data, she must negotiate the contract with Bob. To do this, she uses the following `curl` command:

```shell
curl --location 'http://localhost/alice/management/v2/contractnegotiations' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
 "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
 },
 "@type": "NegotiationInitiateRequestDto",
 "connectorAddress": "http://bob-controlplane:8084/api/v1/dsp",
 "protocol": "dataspace-protocol-http",
 "providerId": "BPNL000000000002",
 "offer": {
    "offerId": "Mw==:Mw==:ODRkYjJhZjQtZjMxOC00ZjgyLThjMjktODQwZThjYjBjNjVl",
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

In the response, Alice gets a UUID. This is the ID of the created contract negotiation. Alice can now use this ID to see the current status of the negotiation and - if the negotiation was successful - the ID of the created contract agreement.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received.
:::

```shell
curl --location 'http://localhost/alice/management/v2/contractnegotiations/<ID>' \
--header 'X-Api-Key: password' | jq
```

- If the negotiation was **successful**, Alice will see an ouput as shown below.
- If the negotiation was **unsuccessful**, the negotiation state (`edc:state`) will be `TERMINATED` and no contract agreement ID will be present.

```json
{
  "@type": "edc:ContractNegotiation",
  "@id": "4e74a632-94bc-4bfb-acf5-230f7d18b080",
  "edc:type": "CONSUMER",
  "edc:protocol": "dataspace-protocol-http",
  "edc:state": "FINALIZED",
  "edc:counterPartyId": "BPNL000000000002",
  "edc:counterPartyAddress": "http://bob-controlplane:8084/api/v1/dsp",
  "edc:callbackAddresses": [],
  "edc:createdAt": 1702989093837,
  "edc:contractAgreementId": "Mw==:Mw==:NmY5MDA4OGEtOWY1ZC00YmYyLWFiZjMtMjRiNzY0YzEyOTk4",
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

For testing purposes, you should replace `backend:8080` with your own test API or use [webhook.site](https://webhook.site/) as your backend system.
If you do not change this, you will not be able to view the received token, which is required for requesting the data!
If you are using webhook.site, please make sure that you use "Your unique URL" and that you do not transfer any sensitive information to webhook.

Replace `<contractAgreementId>` with the contract agreement ID you received in the previous step.
:::

```shell
curl --location 'http://localhost/alice/management/v2/transferprocesses' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "assetId": "3",
    "connectorAddress": "http://bob-controlplane:8084/api/v1/dsp",
    "connectorId": "BPNL000000000002",
    "contractId": "<contractAgreementId>",
    "dataDestination": {
        "type": "HttpProxy"
    },
    "privateProperties": {
        "receiverHttpEndpoint": "http://backend:8080"
    },
    "protocol": "dataspace-protocol-http",
    "transferType": {
        "contentType": "application/octet-stream",
        "isFinite": true
    }
}' | jq
```

Just to make sure everything worked, Alice uses another `curl` command to check if the transfer was successful.

In the response, Alice gets a UUID. This is the ID of the created transfer. Alice can now use this ID to see the current status of the transfer.

:::tip
Make sure to replace `<ID>` in the URL with the UUID you just received.
:::

```shell
curl --location 'http://localhost/alice/management/v2/transferprocesses/<ID>' \
--header 'X-Api-Key: password' | jq
```

- If the transfer was **successful**, Alice will see an ouput as shown below.
- If the transfer was **unsuccessful**, the transfer state (`edc:state`) will be `TERMINATED`.

```json
{
  "@id": "6d6bca4e-4da5-4ed3-9fe5-2b98623d9a59",
  "@type": "edc:TransferProcess",
  "edc:correlationId": "6d6bca4e-4da5-4ed3-9fe5-2b98623d9a59",
  "edc:state": "STARTED",
  "edc:stateTimestamp": 1702990026966,
  "edc:type": "CONSUMER",
  "edc:assetId": "3",
  "edc:contractId": "Mw==:Mw==:NmY5MDA4OGEtOWY1ZC00YmYyLWFiZjMtMjRiNzY0YzEyOTk4",
  "edc:callbackAddresses": [],
  "edc:dataDestination": {
    "@type": "edc:DataAddress",
    "edc:type": "HttpProxy"
  },
  "edc:connectorId": "BPNL000000000002",
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

![Consume data backend](@site/static/tutorials/e2e/consume_data_backend.png)

```json
{
  "id": "841e3cd7-add0-47fd-adef-ea8074ec50af",
  "endpoint": "http://bob-tractusx-connector-dataplane:8081/api/public",
  "authKey": "Authorization",
  "authCode": "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MTE5MTIzMDgsImRhZCI6IktaamRBV3ZSV0xpS3V5akNwSjRIdEgwT2lqOEdQRno2SVdXcWxMMEFFZUloS25wOU5mZll2R1Q0M0N4dURZVHhUK3lRaXhrcWU1dVN1Sk5JR09GTi9kRlQ4R29WNGFHZ3FpdzhXMXBLT2ZLMUdtM1NkeFRIeWR0QTlnTnZoZFJ6T05RclpxbUlwNGxwZVBRaS9CSGVNTEYycEVsRVUvcExzU3dTbDh3eUplY3lSM2thTnJiUUw0a3RnajNMeDBjWUp3ZHZlS2h3OUdMYjF1UnBDa3I0RE5sOG4zQlprZ1ZEK1RYUGtIaGhXVWNpck1Tc3FBZHdyN3kvRFE0Nlp5S09GbldtTmVkdEVaempLWmRRRUlWMkcyV2d2cXFya25WdkNvTzhPZWpXZU1MaXUvdnl2cWdTZmp2dkk4cHhIOTRzYS90LzdGazB2YlRuMmpNMjQ3TFZQUlcvMk9wRElZWTA0dVRYY2p2T0h2L1UvcU5heURnR09uaitBbjcyZnNiOUZhWVZLMzQ4TzRYKzFDMkRvUjBwem9nQmJyRGMzSzRNQzBSdjcvVT0iLCJjaWQiOiJNdz09Ok13PT06WTJJelpHTXdaR1l0WVRNeVlpMDBZamM1TFdFNFkyTXROVE5rWWpVeU5tWXpNR0ZpIn0._2G-2eVzIQrTh-JW0Dx_P9nG2bAElPFllYtpN_s7MXk6R-F5jdMyCblMD6uJDw-H7J0SMiW5IAYExcZkMn-65w",
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
curl -X GET -H 'Authorization: eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MTE5MTIzMDgsImRhZCI6IktaamRBV3ZSV0xpS3V5akNwSjRIdEgwT2lqOEdQRno2SVdXcWxMMEFFZUloS25wOU5mZll2R1Q0M0N4dURZVHhUK3lRaXhrcWU1dVN1Sk5JR09GTi9kRlQ4R29WNGFHZ3FpdzhXMXBLT2ZLMUdtM1NkeFRIeWR0QTlnTnZoZFJ6T05RclpxbUlwNGxwZVBRaS9CSGVNTEYycEVsRVUvcExzU3dTbDh3eUplY3lSM2thTnJiUUw0a3RnajNMeDBjWUp3ZHZlS2h3OUdMYjF1UnBDa3I0RE5sOG4zQlprZ1ZEK1RYUGtIaGhXVWNpck1Tc3FBZHdyN3kvRFE0Nlp5S09GbldtTmVkdEVaempLWmRRRUlWMkcyV2d2cXFya25WdkNvTzhPZWpXZU1MaXUvdnl2cWdTZmp2dkk4cHhIOTRzYS90LzdGazB2YlRuMmpNMjQ3TFZQUlcvMk9wRElZWTA0dVRYY2p2T0h2L1UvcU5heURnR09uaitBbjcyZnNiOUZhWVZLMzQ4TzRYKzFDMkRvUjBwem9nQmJyRGMzSzRNQzBSdjcvVT0iLCJjaWQiOiJNdz09Ok13PT06WTJJelpHTXdaR1l0WVRNeVlpMDBZamM1TFdFNFkyTXROVE5rWWpVeU5tWXpNR0ZpIn0._2G-2eVzIQrTh-JW0Dx_P9nG2bAElPFllYtpN_s7MXk6R-F5jdMyCblMD6uJDw-H7J0SMiW5IAYExcZkMn-65w' http://localhost/bob/api/public
```

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- SPDX-FileCopyrightText: 2023 Materna Information & Communications SE
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
