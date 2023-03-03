---
title: TRG 0.0 - DRAFT Kubernetes versions
---

:::caution
Proposed release date: "mandatory after": 19th of May 2023
:::

| Author               | Status | Created     | Post-History  |
|----------------------|--------|-------------|---------------|
| Catena-X System Team | Draft  | 24-Feb-2022 | n/a           |

## Why

New Kubernetes versions are [released](https://kubernetes.io/releases/) every few months. The compatibility with those versions needs to be verified as [APIs](https://kubernetes.io/docs/concepts/overview/kubernetes-api/) get deprecated. New Versions can also introduce issues.

To make Eclipse Tractus-X usable in the industry, its necessary to support and test multiply versions of kubernetes (upcoming, stable, old). API deprecations are happening slowly but regularly.

## Description

To do so you *must* create a GitHub action which runs helm test against all required kubernetes versions. See the following TRG for an example GitHub action: \<UPDATE HERE LINK WITH TRG helm test\>.

The GitHub Action either can be **triggered manually** and allows for selecting the **kubernetes versions** or it verifies all required kubernetes versions one after the other.

Products need to support 3 [versions](https://kubernetes.io/releases/) at a time:

- latest
- latest - 1
- latest - 2

## Testing compatibility locally

For local deployment please see [Kind](https://kind.sigs.k8s.io/) clusters where a Kubernetes cluster can be started with a [specific version](https://kind.sigs.k8s.io/docs/user/configuration/#kubernetes-version) locally on a development machine. Example for example:

```yaml
# config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
  image: kindest/node:v1.25.3@sha256:f1de3b0670462f43280114eccceab8bf1b9576d2afe0582f8f74529da6fd0365
```

After Kind is installed locally, run the following command with the config above:

```sh
kind create cluster --config=config.yaml
```

A Kubernetes node will start with version 1.25.
