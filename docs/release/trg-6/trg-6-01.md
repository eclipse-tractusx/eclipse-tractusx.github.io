---
title: TRG 6.01 - Released Helm Chart
---

| Status | Created     | Post-History    |
|--------|-------------|-----------------|
| Active | 01-Dec-2022 | Initial release |

## Description

A released Helm chart for each Tractus-X sub-product is expected to be available in corresponding GitHub repository.

## Why

Tractus-X components can only be used and bundled with other components of Tractus-X if there is a version of the
component with reliable content. This can only be achieved by creating a release of your Helm chart. We recommend to use
[GitHub Chart Releaser Action](https://github.com/marketplace/actions/helm-chart-releaser).

### Process description

If you follow this recommendation to use GitHub Chart Releaser Action to provide a released Helm Chart for your
Tractus-X sub-product, the process will provide the following for you:

1. A GiHub Release is created with
    - a GitHub release, named _Chartname-Semver_ (e.g. _productABC-0.1.1_)
    - a Git tag _Chartname-Semver_
    - a release asset, containing the Helm chart files
2. A local Helm repository is created (file `index.yaml` in branch _gh-pages_)

:::info

Only if you follow this TRG to release a Helm Chart, the released Helm chart will be automatically added to
the [central Tractus-X Helm repository](https://eclipse-tractusx.github.io/charts/).

:::

### Prerequisites

To get the GitHub Chart Releaser Action working, the following prerequisites must be met:

- A branch named `gh-pages` in your repository
- Change the GitHub Pages source branch to `gh-pages` in your repository settings. Submit request via Otterdog, ensure following are set:

  ```json
    gh_pages_build_type:"legacy",
    gh_pages_source_branch:"gh-pages",
    gh_pages_source_path:"/",
  ```

- Helm charts must be located in folder `/charts`
- A GitHub Actions Workflow (see section [Implementaion](#implementation))

### Implementation

Create a GitHub Workflow file with following content:

```yaml
name: Release - Helm Charts

on:
  push:
    paths:
      - 'charts/**'
    branches:
      - main
jobs:
  release:
    # depending on default permission settings for your org (contents being read-only or read-write for workloads), you will have to add permissions
    # see: https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token
    permissions:
      contents: write
    runs-on: ubuntu-latest

    steps:
      # fetch-depth: 0 is required to determine differences in chart(s)
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Configure Git
        run: |
          git config user.name "$GITHUB_ACTOR"
          git config user.email "$GITHUB_ACTOR@users.noreply.github.com"

      - name: Install Helm
        uses: azure/setup-helm@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Run chart-releaser
        uses: helm/chart-releaser-action@v1.4.1
        env:
          CR_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
```

Each time a changed Helm Chart is pushed (e.g. merge a PR) to _main_ branch, the workflow will be triggered.

### Don'ts

:::caution

- Changing the `appVersion` requires also changing the `version` in `Chart.yaml`
- Chart `version` itself can be increased without changing the `appVersion`

:::

If the `appVersion` is increased, also the `version` in `Chart.yaml` must be increased, otherwise the workflow will
fail:

![Chart Releaser Action - Tag error](assets/trg-6-1_chart_release_action_tag-error.png)

The Helm chart name and version is used for creating the Git Tag. As the Helm chart version did not increase, the
workflow tries to create a Git tag which already exists.
