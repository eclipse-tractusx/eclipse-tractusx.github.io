---
title: TRG 4.01 - Image tagging
---

| Status | Created     | Post-History                     |
|--------|-------------|----------------------------------|
|        | 10-Nov-2022 | Initial release                  |
| Active | 24-Nov-2022 | more precise process description |

## Description

The build process for Docker images must ensure proper image tagging. All images must be tagged
following [semantic versioning](https://semver.org/), e.g. `:0.1.2` as well as the latest image must be tagged in
addition with `:latest`.

## Why

We do that to easily identify the application version running in your container.

As these container images will be used in versioned Helm charts, using `:latest` as tag would destroy the idea of a
versioned and released Helm chart, as a changed image could be injected without changing the Helm chart version. Proper
Docker image tagging also helps you to match [TRG 5.05](../trg-5/trg-5-5.md#container-images).

### Process description

If you follow our recommendation how to create Docker images and tag them, the following list describes the process
steps:

1. Create/edit your `Dockerfile` and merge Changes via PullRequest to `main` branch, if changes where made in a feature
   branch, or similar.
2. Create/push a Git tag to `main` branch, e.g.:

   ```shell
   $ git pull
   remote: Enumerating objects: 129, done.
   remote: Counting objects: 100% (84/84), done.
   remote: Compressing objects: 100% (65/65), done.
   remote: Total 129 (delta 29), reused 11 (delta 10), pack-reused 45
   ...
   $ git tag -a v1.2.3 -m "annotation text goes here"
   $ git push origin v1.2.3
   ```

   :::caution

   Git CLI will create tag on the latest (local) commit. Ensure to be up-to-date with the remote after,
   otherwise [use commit ID](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_tagging_later) while creating the
   tag.

   :::
   :::tip
   Prefer annotated tags over lightweight tags. Refer
   to [Git documentation](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_creating_tags) about tags.

   :::
3. Pushing the tag will trigger the GH workflow to build your Docker image.
4. After the finishing the build workflow, your repository will contain proper versioned Docker images, e.g.:

   ![SemVer Docker images](assets/trg4-1-semver-image.png)

### Implementation

Create a GitHub Workflow file with following content:

```yaml
name: Build - Docker image (SemVer)

on:
  push:
    branches:
      - main
    # trigger events for SemVer like tags
    tags:
      - 'v*.*.*'
      - 'v*.*.*-*'
  pull_request:
    branches:
      - main

env:
  # Use GH Container Registry instead of docker
  # github.repository equals to <account|org>/<repo>
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      # Create SemVer or ref tags dependent of trigger event
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
            type=semver,pattern={{major}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Log into registry ${{ env.REGISTRY }}
        if: github.event_name != 'pull_request'
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
