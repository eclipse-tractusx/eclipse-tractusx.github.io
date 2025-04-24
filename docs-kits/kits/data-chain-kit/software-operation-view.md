---
id: operation-view
title: Operation View
description: 'Data Chain Kit'
sidebar_position: 2
---

![Datachain kit banner](@site/static/img/kits/data-chain/data-chain-kit-logo.svg)

### Data Chain KIT

## Local deployment of IRS with minimum dependencies setup

> **Please note that this demo is currently based on IRS version 5.4.0**

### Step 1: Prerequisites

1. [Docker](https://docs.docker.com/get-docker/) is installed and the Docker deamon is running with at least 8GB of
   memory
2. [helm](https://helm.sh/docs/intro/install/) is installed
3. Any Kubernetes cluster is installed and running, eg. [Minikube](https://minikube.sigs.k8s.io/docs/start/)
4. [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed

### Step 2: Add the IRS helm repository

```bash
helm repo add irs https://eclipse-tractusx.github.io/item-relationship-service
```

### Step 3: Installing the IRS

#### 1. Start the cluster

To deploy IRS on kubernetes with helm run

```bash
helm install irs-local irs/item-relationship-service -f your-values.yaml
```

##### 1.1 Get the Status of the deployment

Helm can give you feedback on the release status:

```bash
helm list
```

```bash
NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                           APP VERSION
irs-local       default         1               2024-08-01 10:24:46.8811785 +0200 CEST  deployed        item-relationship-service-7.4.0 5.4.0
```

Kubectl can give you feedback on how the status of the deployment currently is, there should be two pods deployed - IRS
and Minio:

```bash
kubectl get pods
```

```bash
NAME                                                   READY   STATUS    RESTARTS   AGE
irs-local-item-relationship-service-5bdcd5854d-gq976   1/1     Running   0          47s
irs-local-minio-6f6c58cfbd-j8jkg                       1/1     Running   0          47s
```

#### 2. Forward Ports

When the deployment has been finished please use the command to forward the port:

```bash
kubectl port-forward svc/irs-local-item-relationship-service 8080:8080
```

After that you can access the Swagger UI page:

* **IRS Swagger:** [http://localhost:8080/api/swagger-ui/index.html](http://localhost:8080/api/swagger-ui/index.html)

## Testing the Item Relationship Service

You can use any approach to access exposed by IRS API endpoints, for example mentioned above Swagger UI page. There is
also prepared Insomnia collection with example calls to IRS,
see [IRS_Request_Collection.json](https://github.com/eclipse-tractusx/item-relationship-service/blob/5.4.0/local/testing/request-collection/IRS_Request_Collection.json)

### Valid Global Asset Ids for testing

IRS is loading with mocked data from Testdata file,
see [CX_Testdata.json](https://github.com/eclipse-tractusx/item-relationship-service/blob/5.4.0/irs-models/src/main/resources/test_data/CX_Testdata.json)

### Valid test requests for testing

You can use these snippets for testing purposes.

```json
{
  "bomLifecycle": "asBuilt",
  "direction": "downward",
  "depth": 10,
  "auditContractNegotiation": false,
  "key": {
    "globalAssetId": "urn:uuid:951f1ebf-ebcf-427c-8a4d-7fe1f67c8d58",
    "bpn": "BPNL00000003B0Q0"
  }
}
````

```json
{
  "aspects": [
    "urn:samm:io.catenax.serial_part:3.0.0#SerialPart"
  ],
  "depth": 1,
  "key": {
    "globalAssetId": "urn:uuid:951f1ebf-ebcf-427c-8a4d-7fe1f67c8d58",
    "bpn": "BPNL00000003B0Q0"
  }
}
```
