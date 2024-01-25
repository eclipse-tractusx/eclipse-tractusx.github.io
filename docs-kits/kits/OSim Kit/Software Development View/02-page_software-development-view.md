---
id: Specification OSim Kit
title: Specification
description: 'OSim Kit'
---

![osim kit banner](@site/static/img/OSimKitIcon.svg)

### OSim Kit

## Sample Data

### Sample-1

The following example shows the payload used for exchange of simulation results between the OSim partners. The format corresponds with AAS format serialized as a JSON string.

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

### Sample-2

The following example shows the payload used for exchange of scenario data between the OSim partners. The format corresponds with AAS format serialized as a JSON string.

```json
{
  "materialFlowScenarioRequest": {
    "scenarioSimResults": {
      "resultOwnId": "916b5688-8bd8-4d7e-83b9-e0d40939274e",
      "resultOwnSimRunInitial": {
        "owner": {},
        "dataQuality": 0,
        "description": "Please simulate asap",
        "comment": "successful simulation",
        "expirationTimestamp": "2023-03-24T09:15:24.000Z",
        "runId": "0fece48b-c8d1-4180-1a9caca6d67e",
        "shipments": [
          {
            "handlingUnits": [
              {
                "name": "Palette",
                "volume": 1.0,
                "weight": 189.0,
                "batches": [
                  {
                    "unitOfMeasurement": "KG",
                    "materialName": "KK1000GR-Gehäuse-Rot",
                    "quantity": 50.0,
                    "materialNumber": "KK1000GR",
                    "materialHazardousGoods": false,
                    "batchOrderId": "Order-0001",
                    "batchId": "Batch_1",
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
            "destination": {},
            "recipient": {},
            "logistics": {},
            "preceding": {},
            "splittingAllowed": true,
            "destinationTimestamp": "2023-03-19T09:00:00.000Z"
          }
        ],
        "timestamp": "2023-03-09T14:13:42.806Z"
      },
      "resultOwnSimRunUpdated": {
        "owner": {},
        "dataQuality": 0,
        "description": "Please simulate asap",
        "comment": "successful simulation",
        "expirationTimestamp": "2023-03-24T09:15:24.000Z",
        "runId": "0fece48b-c8d1-4180-1a9caca6d67e",
        "shipments": [
          {
            "handlingUnits": [
              {
                "name": "Palette",
                "volume": 1.0,
                "weight": 189.0,
                "batches": [
                  {
                    "unitOfMeasurement": "KG",
                    "materialName": "KK1000GR-Gehäuse-Rot",
                    "quantity": 50.0,
                    "materialNumber": "KK1000GR",
                    "materialHazardousGoods": false,
                    "batchOrderId": "Order-0001",
                    "batchId": "Batch_1",
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
            "destination": {},
            "recipient": {},
            "logistics": {},
            "preceding": {},
            "splittingAllowed": true,
            "destinationTimestamp": "2023-03-19T09:00:00.000Z"
          }
        ],
        "timestamp": "2023-03-09T14:13:42.806Z"
      }
    },
    "scenarioParameter": {
      "unitOfMeasurement": "KG",
      "parameterScenario": "8d464b8b-6977-4952-8a22-0489067ca081",
      "parameterComment": "updated Delivery Date",
      "materialName": "KK1000GR-Gehäuse-Rot",
      "parameterQuantityUpdated": 1.0,
      "parameterId": "847c71e5-614a-468b-a3a0-674bf2af3004",
      "materialNumber": "KK1000GR",
      "parameterDeliveryDateUpdated": "2023-10-10T09:00:00.000Z",
      "parameterDeliveryDateInitial": "2023-10-09T10:00:00.000Z",
      "parameterOrderId": "OID-011123456",
      "parameterQuantityInitial": 1.0
    },
    "scenarioHeader": {
      "scenarioOwnerRole": "Customer",
      "scenarioCreationTimestamp": "2023-10-04T09:10:00.000Z",
      "scenarioExpirationTimestamp": "2023-10-07T09:10:00.000Z",
      "scenarioOwner": "BPNL0000007OTZ3",
      "scenarioDescription": "Changes in Delivery Date",
      "scenarioId": "8d464b8b-6977-4952-8a22-0489067ca081",
      "scenarioTitle": "Delivery Modification"
    }
  }
}
```
