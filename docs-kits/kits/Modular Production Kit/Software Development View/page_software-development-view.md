---
id: Sample Data Modular Production Kit
title: Sample Data
description: 'Modular Production Kit'
sidebar_position: 4
---

![mp kit banner](/img/kit-icons/modular-production-kit-icon.svg)

The following example shows the payload used for exchange

### GetProductionForecast

```json
{
  "request" : {
    "precisionOfForecast" : {
      "value" : 12,
      "timeUnit" : "unit:secondUnitOfTime"
    },
    "offset" : {
      "value" : 12,
      "timeUnit" : "unit:secondUnitOfTime"
    },
    "orderId" : "00000000-0000-0000-C000-000000000046",
    "customerId" : "BPNL7588787849VQ",
    "deviationOfSchedule" : {
      "value" : 12,
      "timeUnit" : "unit:secondUnitOfTime"
    },
    "productionForecastForAll" : false,
    "versionDataModel" : "urn:samm:io.catenax.shared.shopfloor_information_types:1.0.0",
    "notificationInterval" : {
      "value" : 12,
      "timeUnit" : "unit:secondUnitOfTime"
    },
    "communicationMode" : "synchronous"
  },
  "header" : {
    "senderBpn" : "BPNL7588787849VQ",
    "relatedMessageId" : "d9452f24-3bf3-4134-b3eb-68858f1b2362",
    "expectedResponseBy" : "2023-06-19T21:24:00+07:00",
    "context" : "urn:samm:io.catenax.<trace-QM-Alert>:1.x.x",
    "messageId" : "3b4edc05-e214-47a1-b0c2-1d831cdd9ba9",
    "receiverBpn" : "BPNL6666787765VQ",
    "sentDateTime" : "2023-06-19T21:24:00+07:00",
    "version" : "urn:samm:io.catenax.message_header:1.0.0"
  }
}
```

### ProvideProductionForecast

```json
{
  "productionForecastResponse" : {
    "listOfForecastItems" : [ {
      "returnCode" : "ok",
      "precisionOfForecast" : {
        "value" : 12,
        "timeUnit" : "unit:secondUnitOfTime"
      },
      "reasonsForDelay" : "supplyProblems",
      "positionId" : "00000000-0000-0000-C000-000000000046",
      "productionStatus" : "itemReceived",
      "productionForecast" : "2023-06-19T21:24:00+07:00",
      "forecastDate" : "2023-06-19T21:24:00+07:00"
    } ],
    "versionDataModel" : "urn:samm:io.catenax.shared.shopfloor_information_types:1.0.0",
    "communicationMode" : "synchronous",
    "iterationNumber" : 6
  },
  "header" : {
    "senderBpn" : "BPNL7588787849VQ",
    "relatedMessageId" : "d9452f24-3bf3-4134-b3eb-68858f1b2362",
    "expectedResponseBy" : "2023-06-19T21:24:00+07:00",
    "context" : "urn:samm:io.catenax.<trace-QM-Alert>:1.x.x",
    "messageId" : "3b4edc05-e214-47a1-b0c2-1d831cdd9ba9",
    "receiverBpn" : "BPNL6666787765VQ",
    "sentDateTime" : "2023-06-19T21:24:00+07:00",
    "version" : "urn:samm:io.catenax.message_header:1.0.0"
  }
}
```

### ShopfloorInformationTypes

```json
{
  "versionDataModel" : "urn:samm:io.catenax.shared.shopfloor_information_types:1.0.0",
  "timeValue" : {
    "value" : 12,
    "timeUnit" : "unit:secondUnitOfTime"
  },
  "communicationMode" : "synchronous"
}
```
