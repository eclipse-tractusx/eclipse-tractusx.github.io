---
id: Specification OSim Kit
title: Specification
description: 'OSim Kit'
sidebar_position: 4
---

![osim kit banner](@site/static/img/OSimKitIcon.svg)

### OSim Kit

## Sample Data

The following example shows the payload used for exchange  of simulation results between the OSim partners. The format corresponds with AAS format serialized as a JSON string.

```json
{
  "owner": { "id": "BPNL00000007OTZ3" },
  "dataQuality": 1,
  "description": "Daily standard simulation",
  "comment": "successful simulation",
  "expirationTimestamp": "2023-03-24T09:15:24.000Z",
  "runId": "0fece48b-c8d1-4180-1a9caca6d67e",
  "shipments": [
    {
      "handlingUnits": [
       {
          "name": "Palette",
          "volume": 1,
          "weight": 189,
          "batches": [
            {
              "unitOfMeasurement": "KG",
              "materialName": "KK1000GR-Gehäuse-Rot",
              "quantity": 50,
              "materialNumber": "KK1000GR",
              "batchOrderId": "Order-0001",
              "batchId": "Batch_1",
              "hazardousGoods": false,
              "batchExpirationTimestamp": "2023-08-22T16:00:00.000Z",
              "batchNumber": "45"
            }
          ],
          "handlingUnitId": "HUT_1",
          "amount": 1
        }
      ],
      "shipmentId": "DE51515151",
      "recipientTimestampPlanned": "2023-04-19T09:00:00.000Z",
      "destination": { "id": "BPNL00000007OTZ3" },
      "recipient": { "id": "BPNL00000007OTZ4" },
      "logistics": { "id": "BPNL00000007OS0H" },
      "preceding": {},
      "splittingAllowed": true,
      "destinationTimestamp": "2023-03-19T09:00:00.000Z"
    }
  ],
  "timestamp": "2023-03-09T14:13:42.806Z"
}
```
