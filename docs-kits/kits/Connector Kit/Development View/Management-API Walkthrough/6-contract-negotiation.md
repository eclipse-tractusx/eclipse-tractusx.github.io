---
id: Contract Negotiation
title: Contract Negotiation
description: 'Connector Kit'
sidebar_position: 6
---
# Initiating a Contract Negotiation

Contract Negotiation is the second check a Data Consumer has to pass before getting access rights to a backend resource.
It includes

- a check of the Consumer's VC against the Offer's `contractPolicy`.
- a check of the `contractPolicy` against the policy the Data Consumer signals in the negotiation request to.

## Creating a new Contract Negotiation

To trigger the process, the Data Consumer POSTs against his own Control Plane.

```http
POST /v2/contractnegotiations HTTP/1.1
Host: https://consumer-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "https://w3id.org/edc/v0.0.1/ns/ContractRequest",
  "connectorAddress": "https://provider-control.plane/api/v1/dsp",
  "protocol": "dataspace-protocol-http",
  "providerId": "<PROVIDER_BPN>",
  "connectorId": "<PROVIDER_BPN>", 
  "offer": {
    "offerId": "<OFFER_ID>",
    "assetId": "<ASSET_ID>",
    "policy": {
      "@context": "http://www.w3.org/ns/odrl.jsonld",
      "@type": "Set",
      "@id": "<CONTRACT_OFFER_ID",
      "permission": [
        {
          "target": "<ASSET_ID>",
          "action": "use"
        }
      ]
    }
  },
  "callbackAddresses": [
    {
      "transactional": false,
      "uri": "http://callback/url",
      "events": [
        "contract.negotiation",
        "transfer.process.completed"
      ],
      "authKey": "auth-key",
      "authCodeId": "auth-code-id"
    }
  ]
}
```

- `edc:connectorAddress` sets the coordinates for the connector that the Consumer-EDC shall negotiate with (Provider
  EDC).
  It will usually end on /api/v1/dsp
- `edc:protocol` must be "dataspace-protocol-http"
- `providerId` is the Data Provider's BPN
- `edc:assetId` and all `odrl:target` properties must be the id of the EDC-Asset/dcat:DataSet that the offer was made
  for.
- `edc:connectorId` and `edc:providerId` must both hold the correct BPN for the `edc:connectorAddress`.
- In the `edc:offer` section, the Data Consumer specifies the Data Offer for the negotiation. As there may be multiple
  Data Offers for the same DataSet, the Data Consumer must choose one.
    - `edc:offerId` is the id of the entry in the [catalog-response](5-catalog.md) that the Consumer wants to negotiate
      for.
      It will usually be a concatenation of three base64-encoded ids.
    - `edc:policy` must hold an identical copy of the Data Offer's contract policy as provided via the catalog-API in
      the
      `odrl:hasPolicy` field.
- `callbackAddresses` is a list of Consumer-side endpoints that the Provider's Data Plane writes events to.
    - `uri` is the http endpoint of the token repository. Mandatory.
    - `events` is a list of the strings, signifying for what callbacks the specified API shall be used. They are
      structured hierarchically, so if a Consumer is interested in all events about status changes, the 
      `transfer.process` marker can be added. If only events about the completion of a transfer are relevant, they can 
      be subscribed via `transfer.process.completed`. This enables the consumer to wait for arrival of a relevant event
      instead of having to poll for transition into a desired state. 
    - `transactional` Optional, default false.
    - `authCodeId` is the key of a secret stored in the Consumer's vault that can be used to unlock the callback API if
      it is protected. Optional.
    - `authKey` Key of the HTTP-header that will be sent to the callbackAddress for authentication. Optional. If 
      `authCodeId` is set and `authKey` isn't, it defaults to `Authorization`.

This call does not yet return a negotiation result but rather a server-side generated id for the contract negotiation in
the `@id` property.

```json
{
	"@type": "edc:IdResponse",
	"@id": "773b8795-45f2-4c57-a020-dc04e639baf3",
	"edc:createdAt": 1701289079455,
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

## Polling for Completion

```http
GET /v2/contractnegotiation/773b8795-45f2-4c57-a020-dc04e639baf3 HTTP/1.1
Host: https://consumer-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```

This request (holding the previously returned `contractNegotiationId` in its path) returns details on the negotiation
that will first look like this:

```json
{
  "@type": "edc:ContractNegotiation",
  "@id": "50bf14b9-8f6e-4975-8ada-6f24379a58a2",
  "edc:type": "CONSUMER",
  "edc:protocol": "dataspace-protocol-http",
  "edc:state": "REQUESTING",
  "edc:counterPartyId": "<PROVIDER_BPN>",
  "edc:counterPartyAddress": "https://provider-control.plane/api/v1/dsp",
  "callbackAddresses": [
    {
      "transactional": false,
      "uri": "http://callback/url",
      "events": [
        "contract.negotiation",
        "transfer.process.completed"
      ],
      "authKey": "auth-key",
      "authCodeId": "auth-code-id"
    }
  ],
  "edc:createdAt": 1701351116766,
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

