---
title: TRG 4.02 - Base images
---

:::caution
Proposed release date: "mandatory after": 19th of May 2023
:::

| Status | Created     | Post-History                                                                    |
|--------|-------------|---------------------------------------------------------------------------------|
| Draft  | 04-May-2023 | Remove notice in favor of dedicated TRG; Add mandatory base image for frontends |
| Active | 25-Nov-2022 | Initial release                                                                 |

## Why

Due to legal constrains we need to annotate the released container images to make it clear that we do our best to provide good images for demo purposes,
but we do not provide any legal guarantee. To make that process easy, we are aligning on agreed base images for specific
languages and use an aligned section to describe the base image.

## Description

Since many of our Eclipse Tractus-X product use the same language, we are aligning on a dedicated container base image
per language.
The following table lists container base images, that are already agreed on.

| Language / Runtime        | Container base image                                                       | Notes                                                    |
|---------------------------|----------------------------------------------------------------------------|----------------------------------------------------------|
| Java / Kotlin / JVM based | [Eclipse Temurin](https://hub.docker.com/_/eclipse-temurin)                | prefer JRE over JDK and alpine tags for your JRE version |
| JS frontends              | [nginx-unprivileged](https://hub.docker.com/r/nginxinc/nginx-unprivileged) | prefer :stable-alpine tag                                |
| .NET runtime              | [.NET runtime](https://hub.docker.com/_/microsoft-dotnet-runtime)          | prefer :alpine tag                                       |
| ASP.NET runtime           | [ASP.NET core runtime](https://hub.docker.com/_/microsoft-dotnet-aspnet)   | prefer :alpine tag                                       |

If the language or runtime environment of your product is not listed above, feel free to [start a discussion](https://github.com/eclipse-tractusx/sig-infra/discussions)
and propose your preferred container images as base image.

:::info
Also be aware of the necessary references to the used base image and your products Dockerfile(s) described in TRG 4.06
:::
