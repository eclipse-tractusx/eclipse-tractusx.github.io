---
title: TRG 3.01 Superseded Supported Versions
---

| Status     | Created      | Post-History         |
|------------|--------------|----------------------|
| Superseded | 08-Mar-2023  | Marked as superseded |
| Moved      | 02-Jan-2023  | content moved        |
| Draft      | 13-Sept-2022 | n/a                  |

## Superseded by TRG 5.09 - Helm test

This is superseded by [TRG 5.09 - Helm test](../trg-5/trg-5-09)

## ~~Description~~

~~As new Kubernetes versions are released every few months, teams need to support 3 versions at a time:~~

- latest
- latest - 1
- latest - 2

~~For checking the current versions available please use the [AKS Kubernetes release calendar](https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions?tabs=azure-cli#aks-kubernetes-release-calendar). The __AKS GA__ column is relevant and determines which is the Azure release date of a Kubernetes version. Example: at 02-Jan-2023 the current AKS GA version is 1.25, therefore the supported versions are 1.25, 1.24 and 1.23.~~

## ~~Testing compatibility~~

~~For testing whether the application is compatible with the supported Kubernetes versions CI/CD pipeline integration or local deployment is recommended. For local deployment please see [Kind](https://kind.sigs.k8s.io/) clusters where a Kubernetes cluster can be started with a [specific version](https://kind.sigs.k8s.io/docs/user/configuration/#kubernetes-version) locally on a development machine. Example for example:~~

```yaml
# config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
  image: kindest/node:v1.25.3@sha256:f1de3b0670462f43280114eccceab8bf1b9576d2afe0582f8f74529da6fd0365
```

~~After Kind is installed locally, run the following command with the config above:~~

```sh
kind create cluster --config=config.yaml
```

~~A Kubernetes node will start with version 1.25.~~

## ~~Why~~

~~New Kubernetes minor versions are released quite frequently with bugfixes, security patches and new features. Clusters implement these new versions at a different pace but the applications that are deployed there has to be supported.~~
