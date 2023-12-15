---
id: Contract Agreements
title: Contract Agreements
description: 'Connector Kit'
sidebar_position: 9
---
<!--
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
-->

# Checking existing Contract Agreements

The Management API has a provider-internal endpoint to retrieve existing Contract Agreements. It also exposes a `/request`
endpoint (to be used with the previously explained `QuerySpec` object) but allows retrieval of single agreements by id 
like this:

```http
GET /v2/contractagreements/{{agreementId}} HTTP/1.1
Host: https://consumer-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```

A Contract Agreement looks like this:

```json
{
  "@type": "edc:ContractAgreement",
  "@id": "<AGREEMENT_ID>",
  "edc:assetId": "<ASSET_ID>",
  "edc:policy": {
    "@id": "<POLICY_ID>",
    "@type": "odrl:Set",
    "odrl:permission": {
      "odrl:target": "<ASSET_ID>",
      "odrl:action": {
        "odrl:type": "USE"
      },
      "odrl:constraint": {
        "odrl:and": {
          "odrl:leftOperand": "BusinessPartnerNumber",
          "odrl:operator": {
            "@id": "odrl:eq"
          },
          "odrl:rightOperand": "<SOME_BPN>"
        }
      }
    },
    "odrl:prohibition": [],
    "odrl:obligation": [],
    "odrl:target": ">ASSET_ID>"
  },
  "edc:contractSigningDate": 1697720380,
  "edc:consumerId": "<BPN_CONSUMER>",
  "edc:providerId": "<BPN_PROVIDER>",
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

Most of this data should already be known to the Data Provider from the negotiation and transfer processes but can be 
retrieved at a glance via this API.
