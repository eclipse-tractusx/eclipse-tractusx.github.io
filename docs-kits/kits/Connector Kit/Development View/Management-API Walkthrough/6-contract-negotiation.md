---
id: Contract Negotiation
title: Contract Negotiation
description: 'Connector Kit'
sidebar_position: 6
---
# Initiating a Contract Negotiation

Contract Negotiation is the second check a Data Consumer has to pass before getting access rights to a backend resource.
To trigger the process, the Data Consumer POSTs against his own Control Plane. 

## Creating a new Contract Negotiation

The example below demonstrates how to start a contract negotiation.

```http
POST /v2/contract-negotiations HTTP/1.1
Host: https://consumer-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```
