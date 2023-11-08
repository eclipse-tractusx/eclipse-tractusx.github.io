---
title: Consume data
sidebar_position: 3
---

---
**NOTE:**
This chapter is still work in progress. Check back later!

---

# Consuming Data

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

The response shows all available data offerings in Bob's catalog. Bob has already told Alice that he gave the Asset the Id 3, and added a simple description to make it easier for Alice to identify. 

Alice finds the Asset with the ID 3 and the description "Product EDC Demo Asset 3" in the catalog. Now she that she is sure which Asset she wants to consume, she wants to start the data transfer.

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
	"connectorAddress": "http://alice-controlplane:8084/api/v1/dsp",
	"protocol": "dataspace-protocol-http",
	"connectorId": "BPNL000000000001",
	"providerId": "BPNL000000000001",
	"offer": {
		"offerId": "MQ==:MQ==:ZDM4Nzk3NmUtZjA0Ny00ZmNjLWFhNWItYjQwYmVkMDBhZGYy",
		"assetId": "3",
		"policy": {
			"@type": "odrl:Set",
			"odrl:permission": {
				"odrl:target": "3",
				"odrl:action": {
					"odrl:type": "USE"
				},
				"odrl:constraint": {
					"odrl:or": {
						"odrl:leftOperand": "BusinessPartnerNumber",
						"odrl:operator": {
                            "@id": "odrl:eq"
                        },
						"odrl:rightOperand": "BPNL000000000002"
					}
				}
			},
			"odrl:prohibition": [],
			"odrl:obligation": [],
			"odrl:target": "3"
		}
	}
}'
```

Alice now has a contract with Bob and can begin transferring the asset's data.

## Transfer the data

Alice wants to send the data to her backend application ("http://backend:8080"). So she uses the following command to direct the data from Asset 3 to her desired data sink.

```shell
curl --location 'http://localhost/alice/management/v2/transferprocesses' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: password' \
--data-raw '{
    "@context": {
        "odrl": "http://www.w3.org/ns/odrl/2/"
    },
    "assetId": "3",
    "connectorAddress": "http://alice-controlplane:8084/api/v1/dsp",
    "connectorId": "BPNL000000000001",
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
}'
```

Just to make sure everything worked, Alice uses another `curl` command to check if the transfer was successful.

```shell
curl --location --request POST 'http://localhost/alice/management/v2/transferprocesses/request' \
--header 'X-Api-Key: password' \
--data ''
```

The response shows her that she has a "TERMINATED" transfer with the type "CONSUMER" of the asset with the ID "3". This means that Alice has now successfully transferred Bob's data to her desired location via the EDC!

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)

