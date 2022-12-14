---
title: TRG 4.05 - Container registries
---

| Author               | Status | Created      | Post-History    |
|----------------------|--------|--------------|-----------------|
| Catena-X System Team | Draft  | 14-Sept-2022 | n/a             |
| Catena-X System Team | Active | 05-Jan-2023  | Initial release |

## Description

In Eclipse Tractusx we are using one central container registry.

Currently this central registry is the [GitHub Packages feature](https://github.com/features/packages), the GitHub organization catenax-ng contains all [our packages](https://github.com/orgs/catenax-ng/packages).

An example on how to build and push an image to the container registry using GitHub Actions can be found [here](https://github.com/catenax-ng/k8s-helm-example/blob/main/.github/workflows/docker-build.yaml).

:::info

Coming soon: we will be able to store our images in a docker hub target provided by the Eclipse Foundation - legal acpects under clarification.

:::

## Why

Using a central container registry greatly impoves security and manageability of images.
