---
title: Consume data
sidebar_position: 3
---

---
**NOTE:**
This chapter is still work in progress. Check back later!

---

# Consuming Data

This step will continue the journey of our data consumer Alice. After the data provider Bob has successfully provided his data as a contract definition in his catalog. Alice will now consume the data.

We will use plain CLI tools (`curl`) for this, but feel free to use graphical tools such as Postman or Insomnia.

## Request the catalog

In order to see Bob's data offerings, Alice needs to request access to his catalog. The catalog shows all assets Alice is able to consume from Bob.

Action (Alice): Execute a request using the following `curl` commands:

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

The response shows all available data offerings in Bob's catalog. Bob has already told Alice that he gave the Asset Alice is interest in the Id 3, and added a simple description to make it easier for Alice to identify. 

Alice finds the Asset with the ID 3 and the description "Product EDC Demo Asset 3" in the catalog. Now she wants to transfer the data.

## Negotiate a contract

Before she can transfer the data she has to negotiate the contract with Bob. To do so, she uses the following curl command:

```shell

```

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
