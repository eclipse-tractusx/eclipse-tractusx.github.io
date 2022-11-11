---
title: TRG 4.01 - Image tagging
---

| Author               | Status | Created     | Post-History     |
|----------------------|--------|-------------|------------------|
| Catena-X System Team | Active | 10-Nov-2022 | Initital release |

## Description

If a container image is part of a Tractus-X product, the image must be build/tagged as follows:

```shell
docker build -t image:SemVer -t image:latest .
```

After building a new container image, the image must be tagged with `SemVer` and `latest`.

## Why

The main reason for this TRG is to avoid the usage of `latest` for image tagging.

As these container images will usually be used in versioned Helm charts, using `latest` as tag would destroy the idea of
a versioned and released Helm chart, as a changed image could be injected without changing the Helm chart version. So a
specific Helm chart version could behave different, due to the underlying container image. This behavior is unwanted.

If you're using `docker/metadata-action@v4` and `docker/build-push-action@v3` in your GitHub Action Workflow to build
your container image, you can [easily achieve](https://github.com/marketplace/actions/docker-metadata-action#semver) the
goal of this TRG:

```yaml
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Log into registry ${{ env.REGISTRY }}
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```
