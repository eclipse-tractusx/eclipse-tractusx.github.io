---
title: TRG 2.05 - Repository metafile
---

| Status     | Created     | Post-History       |
|------------|-------------|--------------------|
| Active     | 24-Apr-2023 |
| Prerelease | 7-Mar-2023  | Moved out of draft |
| Draft      | 24-Feb-2023 | Draft release      |

## Why

Due to many products having more than one repository, we need a way of identifying dependent repositories automatically. This allows us to analyze repositories for quality checks and for generating documentation across repositories.

## Description

To enable automatic analyzing of repositories, all repositories **MUST** have a file named `.tractusx` present on root-level.
This file needs to contain metadata about the repository and product in a YAML format.
The mandatory declarations in the `.tractusx` metadata file do vary for leading- and non-leading repositories.

Documentation on the content of the `.tractusx` metadata file can be found [in the quality check docs](https://github.com/eclipse-tractusx/tractusx-quality-checks/blob/main/docs/metadata_file.md).

Example `.tractusx` file taken from the docs:

```yaml
# Will be used on release checks dashboard etc. to refer to your product; only mandatory in the leading repo
product: "your-product-name"
# mandatory info in every repo
leadingRepository: "https://github.com/eclipse-tractusx/<your-leading-repo>"
# default: product; available options: "special", "support", "product"
repoCategory: "special"
# optional section to refer to all of your teams repositories
repositories:
  - name: "your-product-repo"
    usage: "Main documentation and release repo for <product>"
    url: "https://github.com/eclipse-tractusx/<your-leading-repo>"
  - name: "your-product-library"
    usage: "A library supporting <product>, that is released separately"
    url: "https://github.com/eclipse-tractusx/<your-product-lib>"
# section to explicitly skip certain release guideline checks
skipReleaseChecks:
  alignedBaseImage:
    - "/path/to/non-published/Dockerfile"
```
