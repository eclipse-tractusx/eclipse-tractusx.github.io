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

Due to many products having more than one repository, we need a way of identifying dependent leading repositories automatically. This allows us to analyze the repositories for quality checks we need to assure for our releases.
This will reduce the manual effort in reviewing the code quality and will allow us to provide a better overview of the quality of the products. It will also allow us to provide consistency and the same coding standards and improve the readability and maintainability.
In summary, automatic checking of the repositories contributes to improving code quality, enhancing development and resource efficiency, and ensuring the overall reliability of our products.

## Description

To enable automatic analysis of repositories, all repositories **MUST** have a file named `.tractusx` present on root-level with the dedicated `repoCategory` which points to the displayed section for the repository.
This file needs to contain metadata about the repository and product in a YAML format.
The mandatory declarations in the `.tractusx` metadata file do vary for leading- and non-leading repositories.

Detailed documentation on the content of the `.tractusx` metadata file can be found [in the quality check docs](https://github.com/eclipse-tractusx/tractusx-quality-checks/blob/main/docs/metadata_file.md).

The result of the automated repository checks depending on the `.tractusx` metadata file can be found on the [quality checks dashboard](https://eclipse-tractusx.github.io/sig-release)

Example `.tractusx` file taken from the docs:

```yaml
# Will be used on release checks dashboard etc. to refer to your product; only mandatory in the leading repo
product: "your-product-name"
# mandatory info in every repo
leadingRepository: "https://github.com/eclipse-tractusx/<your-leading-repo>"
# default: available options: "special", "support"; optional field. will be treated as regular product repo without entry
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
