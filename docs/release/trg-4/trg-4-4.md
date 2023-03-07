---
title: TRG 4.04 - Image signing
---

| Status | Created      | Post-History    |
|--------|--------------|-----------------|
| Active | 04-Jan-2023  | Initial release |
| Draft  | 13-Sept-2022 | n/a             |

## Why

We need to make sure that we only use the images that can be trusted, therefore all images **must** be signed by an official entity.

## Description

Image signing is a process where the publisher use the digital signatures when pushing images into repository, and it allows verification from image consumers. The publisher can manually sign the image or have the signing process a part of their software release process. Check [here](https://docs.docker.com/engine/security/trust/#signing-images-with-docker-content-trust) to learn how it works.

At the moment the **image signing** is **not supported** yet but please do expect an update here.
