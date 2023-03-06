---
title: TRG 2.05 - Repository metafile PRERELEASE
---

:::caution
Proposed release date: "mandatory after": 31st of March 2023
:::

| Author               | Status     | Created     | Post-History       |
|----------------------|------------|-------------|--------------------|
| Catena-X System Team | Prerelease | 7-Mar-2023  | Moved out of draft |
| Catena-X System Team | Draft      | 24-Feb-2023 | Draft release      |

## Description

The `.tractusx` dotfile contains metadata about the repository and product in a `yaml` format that can be processed programmatically for different reasons. The structure is the following:

- In the root of the [Leading product repository](docs/release/trg-2/trg-2-4.md) create a file called `.tractusx`:

```yaml
product: "PRODUCT_NAME"
leadingRepository: "LEADING_PRODUCT_REPOSITORY_URL"
repositories:
  - name: "REPOSITORY_1_NAME"
    usage: "DESCRIPTION/PURPOSE"
    url: "REPOSITORY_1_URL"
  - name: "REPOSITORY_2_NAME"
    usage: "DESCRIPTION/PURPOSE"
    url: "REPOSITORY_2_URL"
```

In the root of a sub/non-leading repository create a file called `.tractusx`:

```yaml
leadingRepository: "LEADING_PRODUCT_REPOSITORY_URL"
```

## Why

Having a `.tractusx` metafile helps individuals, release management, test management and others to determine basic information about a repository in the scope of __Eclipse TractusX__. The `yaml` format enables the opportunity to programmatically combine repositories to a single product, determine leading product repository, read data that can be processed for different cases.
