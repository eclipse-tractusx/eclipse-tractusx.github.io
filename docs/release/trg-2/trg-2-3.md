---
title: TRG 2.03 - Repo structure
---

| Status | Created     | Post-History                                  |
|--------|-------------|-----------------------------------------------|
| Active | 06-Dec-2023 | reword Why section + highlight optional files |
|        | 25-Nov-2022 | adjustments to DEPENDENCY, LICENSE, NOTICE    |
|        | 24-Nov-2022 | add FOSS/Eclipse related basic files          |
|        | 10-Nov-2022 | Initial release                               |

## Why

In order to foster consistency, collaboration and ease of navigation, adhereing to a specific repository structure is important. The structure serves a standardized framework, facilitating efficient development by providing a clear organisation of essential project components. By adopting recommended layout of files and directories, contributors can quickly locate resources such as source code, documentation and configuration files. Moreover specified repository structure aligns with industry best practices.

## Description

All repositories **must** contain the following files and folders:

```shell
/docs
/charts
CODE_OF_CONDUCT.md
CONTRIBUTING.md
DEPENDENCIES
LICENSE
NOTICE.md
README.md
SECURITY.md
```

Recommended but optional:

```shell
AUTHORS.md
INSTALL.md
```

### Directories

#### /docs

The `/docs` directory **must** contain detailed product related documentation for the Tractus-X product. Folder structure
inside this directory is the responsibility of the repository owner/product team.

#### /charts

The `/charts` directory **must** contain the Helm chart for the Tractus-X product IF available. For more information about Helm
Chart structure, refer to [TRG 5.01 - Helm Chart requirements](../trg-5/trg-5-01).

### Files

#### README.md

Your repository **must** contain a `README.md` file. See [TRG 1.01 - README.md](../trg-1/trg-1-1).

#### INSTALL.md

Your repository **should** contain a `INSTALL.md` file. See[TRG 1.02 - INSTALL.md](../trg-1/trg-1-2).

#### Legal documentation

For the following files, see [TRG 7.01](../trg-7/trg-7-01)

- AUTHORS.md (optional)
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- DEPENDENCIES
- LICENSE
- NOTICE.md
- SECURITY.md
