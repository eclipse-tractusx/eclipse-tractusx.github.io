---
title: TRG 2.05 - Repository metafile
---

| Status     | Created     | Post-History           |
|------------|-------------|------------------------|
| Update     | 10-Jan-2024 | reword the why section |
| Active     | 24-Apr-2023 |
| Prerelease | 7-Mar-2023  | Moved out of draft     |
| Draft      | 24-Feb-2023 | Draft release          |

## Why

Many products are build from more than one repository.
We aim to have automatic quality checks and therefore need a metadata file to identify the repositories belonging to a product.

## Description

To enable automatic analysis of repositories, all repositories **MUST** have a file named `.tractusx` present on root-level.
This file needs to contain metadata about the repository and product in a YAML format.
The mandatory declarations in the `.tractusx` metadata file do vary for leading- and non-leading repositories.

Detailed documentation on the content of the `.tractusx` metadata file can be found [in the quality check docs](https://github.com/eclipse-tractusx/sig-release/blob/main/docs/metadata_file.md).

The result of the automated repository checks depending on the `.tractusx` metadata file can be found on the [quality checks dashboard](https://eclipse-tractusx.github.io/sig-release)

Example `.tractusx` file taken from the docs:

```yaml
# Will be used on release checks dashboard etc. to refer to your product; only mandatory in the leading repo
product: "your-product-name"
# mandatory info in every repo
leadingRepository: "https://github.com/eclipse-tractusx/<your-leading-repo>"
# optional field by default it will be treated as regular product repo. Available options: "special" , "support".
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
