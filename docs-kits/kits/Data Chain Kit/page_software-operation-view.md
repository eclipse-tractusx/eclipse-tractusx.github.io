---
id: Operation View
title: Operation View
description: 'Data Chain Kit'
sidebar_position: 2
---

![Datachain kit banner](/img/kit-icons/datachain-kit-icon.svg)

### Data Chain KIT

## Local deployment of IRS with minimum dependencies setup

> **Please note that this demo is currently based on IRS version 4.5.0**

### Step 1: Prerequisites

1. [Docker](https://docs.docker.com/get-docker/) is installed and the Docker deamon is running with at least 8GB of memory
2. [helm](https://helm.sh/docs/intro/install/) is installed
3. Any Kubernetes cluster is installed and running, eg. [Minikube](https://minikube.sigs.k8s.io/docs/start/)
4. [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed

### Step 2: Update and build the irs-helm chart

```bash
>$ helm dependency build
```

You should see console output with messages like below:

```bash
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "irs" chart repository
...Successfully got an update from the "tractusx-dev" chart repository
...Successfully got an update from the "prometheus-community" chart repository
Update Complete. ⎈Happy Helming!⎈
Saving 1 charts
Downloading irs-helm from repo https://eclipse-tractusx.github.io/item-relationship-service
Deleting outdated charts
```

Please note that irs repository has to be added to helm repo list

```bash
>$ helm repo add irs https://eclipse-tractusx.github.io/item-relationship-service
>$ helm repo list
NAME                    URL
irs                     https://eclipse-tractusx.github.io/item-relationship-service
```

### Step 3: Installing the IRS

#### 1. Start the cluster

To deploy IRS on kubernetes with helm run

```bash
>$ helm install irs-local .
```

##### 1.1 Get the Status of the deployment

Helm can give you feedback on the release status:

```bash
>$ helm list
NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                   APP VERSION
irs-local       default         1               2024-02-26 11:36:46.399546 +0100 CET    deployed        irs-helm-local-6.14.0   4.5.0
```

Kubectl can give you feedback on how the status of the deployment currently is, there should be two pods deployed - IRS and Minio:

```bash
>$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS      AGE
irs-local-minio-7cc78d8985-qggrx     1/1     Running   0             10m
irs-local-irs-helm-c84f98ffb-zg59z   1/1     Running   0             10m

```

#### 2. Forward Ports

When the deployment has been finished please use the command to forward the port:

```bash
>$  kubectl port-forward svc/irs-local-irs-helm 8080:8080
```

After that you can access the Swagger UI page:

* **IRS Swagger:** [http://localhost:8080/api/swagger-ui/index.html](http://localhost:8080/api/swagger-ui/index.html)

## Testing the Item Relationship Service

You can use any approach to access exposed by IRS API endpoints, for example mentioned above Swagger UI page. There is also prepared Insomnia collection with example calls to IRS, see [IRS_Request_Collection.json](../../testing/IRS_Request_Collection.json)

### Valid Global Asset Ids for testing

IRS is loading with mocked data from Testdata file, see [CX_Testdata.json](../../../irs-models/src/main/resources/test_data/CX_Testdata.json)

### Valid test requests for testing

You can use these snippets for testing purposes.

```json
{
  "bomLifecycle": "asBuilt",
  "lookupBPNs": true,
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
    "SerialPart"
  ],
  "depth": 1,
  "key": {
    "globalAssetId": "urn:uuid:951f1ebf-ebcf-427c-8a4d-7fe1f67c8d58",
    "bpn": "BPNL00000003B0Q0"
  }
}
```
