---
title: TRG 4.02 - Base images
---

| Status | Created     | Post-History                     |
|--------|-------------|----------------------------------|
| Active | 25-Nov-2022 | Initital release                 |

## Why

Due to legal constrains we need to annotate the released container images to make it clear that we do our best to provide good images for demo purposes but we do not provide any legal guarantee.

## Description

The original source of the base image **must** be linked.

For specific programming languages you **must** use the provided/mentioned base images.

## How and where to annotate the base image

In case your product is offering a container image, no matter if it is publicly available, or
your repository just contains a Dockerfile, you **must** add a section to your top level `README.md` file,
that contains information about the used base image.

It has to be clearly understandable, which image is used, and where the original source can be found.
The section headline should be either *"Container image"* or *"Docker image"*.
An example section could look like the following, but contents may vary depending on your chosen base image:

```markdown
# Container image

This application provides container images for demonstration purposes.
The base image used, to build this demo application image is `eclipse-temurin:17-jre-alpine`

Docker Hub:
- [eclipse-temurin](https://hub.docker.com/_/eclipse-temurin)
- [17-jre-alpine image](https://hub.docker.com/layers/library/eclipse-temurin/17-jre-alpine/images/sha256-02c04793fa49ad5cd193c961403223755f9209a67894622e05438598b32f210e?context=explore)

Source: 
- [temurin-build](https://github.com/adoptium/temurin-build)
- [temurin docker repo info](https://github.com/docker-library/repo-info/tree/master/repos/eclipse-temurin)
```

## Mandatory base images by programming language

The following sections define mandatory base images for Tractus-X products.
If your application is written in one of these languages, you **must** use the specified
base image. The images are chosen, because they provide well documented
dependency annotations and follow general best-practices.

### JVM based languages (Java, Kotlin, ...)

For JVM based Tracuts-X products, you must use [Eclipse Temurin](https://hub.docker.com/_/eclipse-temurin) as container base image.
For more information on Temurin, check out the [temurin build](https://github.com/adoptium/temurin-build) repository and
the official [docker image package-info](https://github.com/docker-library/repo-info/tree/master/repos/eclipse-temurin)
