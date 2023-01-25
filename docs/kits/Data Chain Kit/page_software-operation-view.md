---
id: Software Operation View
title: Software Operation View
description: 'Data Chain Kit'
sidebar_position: 2
---

![Datachain kit banner](../../../static/img/doc-datachain_header-minified.png)

## Helm Chart

Run a demo of the IRS with al the dependencies necessary.

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![how to run the business partner kit diagram](../../../static/img/arrow_down.png)| **1. Installed required components**|Install rancher, helm and kubectl.                                       |
|![how to run the business partner kit diagram](../../../static/img/vector.png)    | **2. Get Helm Chart**               |get Helm and configure values.yaml [> https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-4.0.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-4.0.0)|
|![how to run the business partner kit diagram](../../../static/img/check.png)     | **3. Start demo environment**|Start cluster and interact with the API [> https://github.com/eclipse-tractusx/item-relationship-service](https://github.com/eclipse-tractusx/item-relationship-service)|

## Testing the Service

Retrieve Data from the API endpoint

| Step                                                                             | Action                          | Description                                                              |
|----------------------------------------------------------------------------------|---------------------------------|--------------------------------------------------------------------------|
|![how to run the business partner kit diagram](../../../static/img/upload.png)| **0. Before running the Demo**  |Ensure all pods are running & Set environment variables.                  |
|![how to run the business partner kit diagram](../../../static/img/blank_page.png)    | **1. Start Data Chain process** |GET /IRS/Job with job parameters.                                         |
|![how to run the business partner kit diagram](../../../static/img/check.png)     | **2. Verify  Results**          |After retrieval of the Data Chain, you can check it in the Debugging View.|
