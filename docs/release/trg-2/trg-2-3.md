---
title: TRG 2.03 - Repo structure
---

| Author                | Status | Created     | Post-History                               |
|-----------------------|--------|-------------|--------------------------------------------|
| Catena-X System Team  |        | 10-Nov-2022 | Initial release                            |
| Catena-X System Team  |        | 24-Nov-2022 | add FOSS/Eclipse related basic files       |
| Catena-X System Team  | Active | 25-Nov-2022 | adjustments to DEPENDENCY, LICENSE, NOTICE |

## Description

:::info

This TRG applies only to Eclipse-Tractusx GitHub repositories, not to Catenax-NG GitHub repositories. For Catenax-NG
please [read this](https://github.com/catenax-ng/foss-example#readme) for OSS related files.

:::

All repositories must contain the following files and folders:

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

## Why

To make your repository Open Source ready and apply to Eclipse standards as well as to Eclipse-TractusX TRGs the
given repository structure must be met.

### Directories

#### /docs

The `/docs` directory should contain detailed product related documentation for the Tractus-X product. Folder structure
inside this directory is the responsibility of the repository owner/product team.

#### /charts

The `/charts` directory must contain the Helm chart files for the Tractus-X product. For more information about Helm
Chart structure, refer to [TRG 5.01 ff](../trg-5/trg-5-1).

### Files

#### AUTHORS.md (optional)

Add a `AUTHORS.md` file at root level to your GitHub repository if you want to mention the authors of the code. Example
content can be found [here](assets/AUTHORS.txt).

#### CODE_OF_CONDUCT.md

Add a `CODE_OF_CONDUCT.md` file at root level to your GitHub repository with content of
this [example](assets/CODE_OF_CONDUCT.txt).

#### CONTRIBUTING.md

Add a `CONTRIBUTING.md` file at root level to your GitHub repository with content of
this [example](assets/CONTRIBUTING.txt).

#### DEPENDENCIES

Add a `DEPENDENCIES` file at root level to your GitHub repository. The file contains a list of all 3rd party libraries
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

The `README.md` file shall contain a basic product description and installation instructions (and/or reference
to `INSTALL.md`).

#### INSTALL.md

The `INSTALL.md` shall contain a detailed installation instruction for the Tractus-X product.

#### SECURITY.md

Add a `SECURITY.md` file at root level to your GitHub repository with content of this [example](assets/SECURITY.txt).
