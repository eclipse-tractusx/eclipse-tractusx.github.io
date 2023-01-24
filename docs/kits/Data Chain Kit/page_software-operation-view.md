---
id: Software Operation View
title: Software Operation View
sidebar_position: 2
---

![Datachain kit banner](../../../static/img/doc-datachain_header-minified.png)

## Helm Chart

Run a demo of the IRS with al the dependencies necessary.

<!-- ![Helm chart diagram](../../../static/img/helm_chart-minified.png) -->

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![how to run the business partner kit diagram](../../../static/img/arrow_down.png)| **1. Installed required components**|Install rancher, helm and kubectl                                        |
|![how to run the business partner kit diagram](../../../static/img/vector.png)    | **2. Get Helm Chart**               |get Helm and configure values.yaml [> https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-4.0.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-4.0.0)|
|![how to run the business partner kit diagram](../../../static/img/check.png)     | **3. Start demo environment**|Start cluster and interact with the API [> https://github.com/eclipse-tractusx/item-relationship-service](https://github.com/eclipse-tractusx/item-relationship-service)|

## Testing the Service

Retrieve Data from the API endpoint

<!-- ![Testing services diagram](../../../static/img/testing_service-minified.png) -->

| Step                                                                             | Action                                     | Description                                                                       |
|----------------------------------------------------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------------|
|![how to run the business partner kit diagram](../../../static/img/arrow_down.png)| **1. Get familiar with the prerequisites** |**Maven, JDK11, PostgreSQL 14.2, Keycloak.**                                       |
|![how to run the business partner kit diagram](../../../static/img/vector.png)    | **2. Start with the profiles**             |The project offer a variety of different Spring profiles for configuration purposes|
