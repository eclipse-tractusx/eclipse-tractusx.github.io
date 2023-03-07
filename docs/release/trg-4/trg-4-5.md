---
title: TRG 4.05 - Container registries
---

| Status | Created      | Post-History    |
|--------|--------------|-----------------|
| Draft  | 14-Sept-2022 | n/a             |
| Active | 05-Jan-2023  | Initial release |

## Why

Using a central container registry greatly improves security and manageability of images. It also makes it easier for external parties to validate that images are correct if they are coming from the same source.

## Description

In Eclipse Tractus-X we are using one central container registry.

Currently, this central registry is the [GitHub Packages feature](https://github.com/features/packages), the GitHub organization catenax-ng contains all [our packages](https://github.com/orgs/catenax-ng/packages).

An example on how to build and push an image to the container registry using GitHub Actions can be found [here](https://github.com/catenax-ng/k8s-helm-example/blob/main/.github/workflows/docker-build.yaml).

:::info

Coming soon: we will be able to store our images in a docker hub target provided by the Eclipse Foundation - legal acpects under clarification.

:::
