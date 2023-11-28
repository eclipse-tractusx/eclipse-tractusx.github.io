---
id: Transfer Process
title: Transfer Process
description: 'Connector Kit'
sidebar_position: 7
---

# Initiation a Transfer Process

Despite the naming, the Transfer Process is not the step that transmits the backend's data from the Provider to the 
Consumer. What this API does instead is trigger the Transfer of a Data Plane token from the Provider Control Plane to a
location specified by the Data Consumer. 

## New JSON-LD Document

To trigger this process, the Consumer app makes a request to its EDC's Control Plane:
```http
POST /v2/transferprocesses HTTP/1.1
Host: https://consumer-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```
```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "assetId": "<ASSET-ID>",
  "connectorAddress": "<CONNECTOR-ADDRESS>",
  "contractId": "<CONTRACT-AGREEMENT-ID>",
  "dataDestination": {
    "type": "<SUPPORTED-TYPE>"
  },
  "managedResources": false,
  "privateProperties": {
    "receiverHttpEndpoint": "<RECEIVER-HTTP-ENDPOINT>"
  },
  "protocol": "dataspace-protocol-http"
}
```

- `assetId` is the id of the [asset](2-assets.md) that a transfer process should be triggered for.
- `connectorAddress` is the DSP-endpoint of the Data Provider (usually ending on /api/v1/dsp).
- `contractId` represents the Contract Agreement that the Provider and Consumer agreed on during the [Contract Negotiation](6-contract-negotiation.md)
  phase.
- `dataDestination` should correspond to one of the supported types listed in the provider's catalog `dcat:distribution`, 
and it should include all the necessary properties associated with the chosen type. Please note that this will usually be
`HttpProxy` and NOT `HttpData`.
- `managedResources` is a boolean (not a string like in the [assets-API](2-assets.md#http-data-plane)). TODO
- `privateProperties` can be filled with arbitrary data (like in the [assets-API](2-assets.md)), however, the property
`receiverHttpEndpoint` is interpreted by the EDC as the URL that it shall write the Data Plane token to.
- `protocol` describes the protocol between the EDCs and will always be `dataspace-protocol-http`.

Response TODO

## Polling for Completion

