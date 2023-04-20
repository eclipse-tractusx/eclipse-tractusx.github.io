---
title: TRG 2.03 - Repo structure
---

| Status | Created     | Post-History                               |
|--------|-------------|--------------------------------------------|
| Active | 25-Nov-2022 | adjustments to DEPENDENCY, LICENSE, NOTICE |
|        | 24-Nov-2022 | add FOSS/Eclipse related basic files       |
|        | 10-Nov-2022 | Initial release                            |

## Why

We are part of the Eclipse Foundation which requires compliance to the Eclipse Foundation rules. This also includes open and collaborative Open Source working model.

Therefore, we need to follow the Eclipse Foundation and Open Source standards.

## Description

All repositories **must** contain the following files and folders:

```shell
/docs
/charts
AUTHORS.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
DEPENDENCIES
LICENSE
NOTICE.md
README.md
INSTALL.md
SECURITY.md
```

### Directories

#### /docs

The `/docs` directory **must** contain detailed product related documentation for the Tractus-X product. Folder structure
inside this directory is the responsibility of the repository owner/product team.

#### /charts

The `/charts` directory **must** contain the Helm chart for the Tractus-X product IF available. For more information about Helm
Chart structure, refer to [TRG 5.01 - Helm Chart requirements](../trg-5/trg-5-01).

### Files

#### AUTHORS.md (optional)

Add a `AUTHORS.md` file at root level to your GitHub repository if you want to mention the authors of the code. Example
content can be found [here](assets/AUTHORS.txt).

#### CODE_OF_CONDUCT.md

Add a `CODE_OF_CONDUCT.md` file at root level to your GitHub repository with content of this [example](assets/CODE_OF_CONDUCT.txt).

#### CONTRIBUTING.md

Add a `CONTRIBUTING.md` file at root level to your GitHub repository with content of this [example](assets/CONTRIBUTING.txt).

#### DEPENDENCIES

Add a `DEPENDENCIES` file at root level to your GitHub repository. The file **must** contain a list of all 3rd party libraries
used with your code.

:::info

Create the content for this file using the Eclipse Dash
Tool: [Example](https://github.com/eclipse-tractusx/sldt-semantic-hub/blob/main/DEPENDENCIES), created
with [Eclipse Dash Tool](https://github.com/eclipse/dash-licenses#readme).

This content needs frequent updates to reflect your code changes.

:::

#### LICENSE

Add a `LICENSE` file at root level to your GitHub repository with content
of [Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0.txt).

#### NOTICE.md

Add a `NOTICE.md` file at root level to your GitHub repository with content of this [example](assets/NOTICE.txt). Add
your repositories to the section _Source Code_.

#### README.md

Your repository **must** contain a `README.md` file. See [TRG 1.01 - README.md](../trg-1/trg-1-1).

#### INSTALL.md

Your repository **should** contain a `INSTALL.md` file. See[TRG 1.02 - INSTALL.md](../trg-1/trg-1-2).

#### SECURITY.md

Add a `SECURITY.md` file at root level to your GitHub repository with content of this [example](assets/SECURITY.txt).
