---
id: documentation
title: Documentation
description: 'Business Partner Kit'
sidebar_position: 4
---

![Business partner kit banner](@site/static/img/doc-business_partner_header-minified.png)

## Authentication

You will need to get a technical user and authenticate via OAuth 2.0. You can find the getting
started documentation with a description on how to get the technical user here. After that, you
start an authorization request via the API and get an access token, with that you can start
requesting data from the resource. API requests without authentication will fail.

Authorization URL

[https://centralidp.demo.catena-x.net/auth/realms/CXCentral/protocol/openid-connect/auth](https://centralidp.demo.catena-x.net/auth/realms/CXCentral/protocol/openid-connect/auth)

Token URL

[https://centralidp.demo.catena-x.net/auth/realms/CX-Central/protocol/openidconnect/token](https://centralidp.demo.catena-x.net/auth/realms/CX-Central/protocol/openidconnect/token)

## Reference Data

1. Open Search Controller
2. CDQ Controller
3. Site Controller
4. Meta Data Controller
5. Business Partner Controller
6. BPN Controller
7. Adress Controller

## Get the address of a legal entity

1. The Business Parter Pool API offers a search for the company name and gives you the business partner number (BPN) as a response. This endpoint tries to find matches among all existing business partners of type legal entity, filtering out partners which entirely do not match and ranking the remaining partners according to the accuracy of the match, e.g., name + postalCode. The match of a partner is better the higher its relevancy score.

2. With the response of the business partner number for legal entity (BPNL you can  search for the address of this legal entity.

### Example request (1.)

```bash
curl -X 'GET' \
'https://partners-pool.dev.demo.catena-x.net/api/catena/legal-
entities?name=Zolemba&page=0&size=10' \
-H 'accept: */*' \
```

### Example response (1.)

```bash
{
"totalElements": 2,
"totalPages": 1,
"page": 0,
"contentSize": 2,
"content": [
{
"score": 80.74726,
"legalEntity": {
"bpn": "BPNL0000000002XY",
"identifiers": [
{
"value": "62457a3f3fd2374f924ef83b",
"type": {
"technicalKey": "CDQID",
"name": "CDQ Identifier",
"url": "" 
},
"issuingBody": {
"technicalKey": "CDQ",
"name": "CDQ AG",
"url": ""
},
"status": {
"technicalKey": "CDQ_IMPORTED",
"name": "Imported from CDQ but not synchronized"
}
},
{
"value": "CX.POOL:623D9AABD2D1D42CBAD7ED240",
"type": {
"technicalKey": "CX_POOL_ID",
"name": "",
"url": null
},
"issuingBody": null,
"status": null
},
{
"value": "DE281308185",
"type": {
"technicalKey": "EU_VAT_ID_DE",
"name": "Umsatzsteuer-Identifikationsnummer",
"url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
},
"issuingBody": null,
"status": null
},
{
"value": "BPNL0000000002XY",
"type": {
"technicalKey": "BPN",
"name": "Business Partner Number",
"url": ""
},
"issuingBody": {
"technicalKey": "CATENAX",
"name": "Catena-X",
"url": ""
},
"status": 
{
"technicalKey": "UNKNOWN",
"name": "Unknown"
}
}
],
"names": [
{
"value": "Zolemba GmbH",
"shortName": null,
"type": {
"technicalKey": "LOCAL",
"name": "The business partner name identifies a business partner in a given
context, e.g. a country or region.",
"url": ""
},
"language": {
"technicalKey": "undefined",
"name": "Undefined"
}
}
],
"legalForm": null,
"status": null,
"profileClassifications": [],
"types": [],
"bankAccounts": [],
"roles": [],
"relations": [],
"currentness": "2022-08-26T07:45:17.709906Z"
}
},
{
"score": 80.74726,
"legalEntity": {
"bpn": "BPNL00000003GPOV",
"identifiers": [
{
"value": "BPNL00000003GPOV",
"type": {
"technicalKey": "BPN",
"name": "Business Partner Number",
"url": ""
},
"issuingBody": {
"technicalKey": "CATENAX",
"name": "Catena-X",
"url": ""
},
"status": {
"technicalKey": "UNKNOWN",
"name": "Unknown"
}
},
{
"value": "CX.POOL:62DE475A3E64DC6E7B1761D80",
"type": {
"technicalKey": "CX_POOL_ID",
"name": "",
"url": null
},
"issuingBody": null,
"status": null
},
{
"value": "DE281308185",
"type": {
"technicalKey": "EU_VAT_ID_DE",
"name": "Umsatzsteuer-Identifikationsnummer",
"url": "https://meta.cdq.com/European_value_added_tax_identifier_(Germany)"
},
"issuingBody": null,
"status": null
},
{
"value": "62de48bd1e6b3b3852690904",
"type": {
"technicalKey": "CDQID",
"name": "CDQ Identifier",
"url": ""
},
"issuingBody": {
"technicalKey": "CDQ",
"name": "CDQ AG",
"url": ""
},
"status": {
"technicalKey": "CDQ_IMPORTED",
"name": "Imported from CDQ but not synchronized"
}
}
],
"names": [
{
"value": "Zolemba GmbH",
"shortName": null,
"type": {
"technicalKey": "LOCAL",
"name": "The business partner name identifies a business partner in a given
context, e.g. a country or region.",
"url": ""
},
"language": {
"technicalKey": "undefined",
"name": "Undefined"
}
}
],
"legalForm": null,
"status": null,
"profileClassifications": [],
"types": [],
"bankAccounts": [],
"roles": [],
"relations": [],
"currentness": 
"2022-08-26T07:46:03.102647Z"
}
}
]
}
```

### Example request (2.)

```bash
curl -X 'POST' \
'https://partners-pool.dev.demo.catena-x.net/api/catena/legal-entities/legaladdresses/
search' \
-H 'accept: */*' \
-H 'Content-Type: application/json' \
-d '[
"BPNL0000000002XY"
]'
```

### Example response (2.)

```bash
[
{
"legalEntity": "BPNL0000000002XY",
"legalAddress": {
"version": {
"characterSet": {
"technicalKey": "LATIN",
"name": "Latin"
},
"language": {
"technicalKey": "en",
"name": "English"
}
},
"careOf": null,
"contexts": [],
"country": {
"technicalKey": "DE",
"name": "Germany"
},
"administrativeAreas": [],
"postCodes": [
{
"value": "48465",
"type": {
"technicalKey": "OTHER",
"name": "Other type",
"url": ""
}
}
],
"localities": [
{
"value": "Schüttorf",
"shortName": null,
"type": {
"technicalKey": "OTHER",
"name": "Other",
"url": ""
},
"language": {
"technicalKey": "en",
"name": "English"
}
}
],
"thoroughfares": [
{
"value": "Nordring",
"name": null,
"shortName": null,
"number": "59 A",
"direction": null,
"type": {
"technicalKey": "OTHER",
"name": "Other type",
"url": ""
},
"language": {
"technicalKey": "en",
"name": "English"
}
}
],
"premises": [],
"postalDeliveryPoints": [],
"geographicCoordinates": null,
"types": []
}
}
]   
```
