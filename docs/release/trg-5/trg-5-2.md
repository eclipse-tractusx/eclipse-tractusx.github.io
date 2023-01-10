---
title: TRG 5.02 - Chart structure
---

| Author               | Status | Created     | Post-History    |
|----------------------|--------|-------------|-----------------|
| Catena-X System Team | Active | 10-Nov-2022 | Initial release |

## Description

Each Helm chart should follow a specific structure. Helm
provides [recommendations for creating charts](https://helm.sh/docs/chart_template_guide/getting_started/).

For Tractus-X Helm charts the following requirements **must** be met:

- Helm chart location inside Git repository
- Helm chart file structure defined below

## Why

Following best practices when creating the chart helps everyone better understand, deploy and test the product. Having
similar structure for every Helm chart enables easy implementation of testing and deployment workflows.

### Chart Location

Helm charts **must** be located for standardization reasons inside the `/charts` directory of the Git repository.

```text
charts/
  chartNameA/
    Chart.yaml
    ...
  chartNameB/
    Chart.yaml
    ...
AUTHORS.md
DEPENDENCIES.md
LICENCE
README.md
```

For further details about the Git repository structure, please refer to [_TRG 2.03 - Repo
Structure_](../trg-2/trg-2-3.md).

### Chart File Structure

:::danger Licence Headers required

It is **mandatory to add a valid licence header** to each file (except of rendered files, e.g. Markdown files) in the
Git repository!

For further details, please refer to [_How to make your Catena-X product OSS
ready_](https://github.com/catenax-ng/foss-example#how-to-make-your-catenax-product-oss-ready).

:::

For Tractus-X Helm charts we expect the following charts structure as a minimal set (except of optional parts):

```text
chartName/
  Chart.yaml           # mandatory
  LICENCE              # mandatory
  README.md            # mandatory
  values.yaml          # mandatory
  crds/                # optional
  templates/           # mandatory, except of umbrella Helm charts
  templates/NOTES.txt  # mandatory
```

For further details on Helm chart basics, please refer to [_Helm documentation_](https://helm.sh/docs/topics/charts/).

#### The `Chart.yaml` File

The following represents the minimum set of expected fields in `Chart.yaml` file:

```yaml
apiVersion: The chart API Version
name: The name of the chart
appVersion: The application version the chart will install
version: A SemVer 2 version of the chart
description: A brief description of the chart
home: The URL of the product home page
sources:
  - A list of URLs to source code of this project
dependencies: # A list of the chart requirements (if any)
  - name: The name of the chart
    version: The version of the chart
    repository: The repository URL
maintainers: # Optional, could become mandatory in Eclipse repositories
  - name: Maintainers name
    email: optional
    url: A URL for the maintainer, optional
```

For further details about the `Chart.yaml` file please refer to [_Helm
documentation_](https://helm.sh/docs/topics/charts/#the-chartyaml-file).

#### The `LICENCE` File

The file **must** contain the [_Apache 2.0 Licence_](https://github.com/catenax-ng/foss-example/blob/main/general/LICENSE).

#### The `README.md` File

The README.md file **must** contain:

- a brief explanation of what the Helm chart will install
- a section of "Prerequisites" includes the required kubernetes version, helm version and other necessary prerequisites and their versions. See an example [here](https://github.com/bitnami/charts/tree/main/bitnami/postgresql#prerequisites).
- a section of "TL;DR" that includes the helm commands to add anf install the helm chart, see example [here](https://github.com/bitnami/charts/tree/main/bitnami/postgresql#tldr)
- documentation of default values for this Helm chart ([_helm-docs_](https://github.com/norwoodj/helm-docs#helm-docs)
  may help).

#### The `values.yaml` File

The `values.yaml` file contains all necessary variables the Helm chart requires for successful installation. At the same
time this enables users to override the default values.

For best practices on `values.yaml` files, please refer to [_TRG 5.05 - Chart Values_](trg-5-5.md) or [_Helm
documentation_](https://helm.sh/docs/chart_template_guide/values_files/).

:::caution multiple values files not allowed

All default values **must** be introduced with `values.yaml` file to successfully install the Helm chart.

There **must** be no additional `values-xyz.yaml` files, e.g. to specify environment specific values. Only `values.yaml` file
is allowed!
:::

#### The `crds` Directory

If the Helm chart installs custom resource definitions, this directory is the place to locate the manifest files in.

For further details, refer to [_Helm
documentation_](https://helm.sh/docs/topics/charts/#custom-resource-definitions-crds).

#### The `templates` Directory

The `templates` directory contains manifest files, which will be deployed during Helm chart installation. For further
details, refer to [_Helm documentation_](https://helm.sh/docs/topics/charts/#template-files).

#### The `templates/NOTES.txt` File

The content of `templates/NOTES.txt` will be printed after Helm chart installation. The file is evaluated as a template
file with all possibilities of templating.

#### `.helmignore`

The `.helmignore` file should contain as a minimal set the following entries:

```gitignore
# Accept only values.yaml
values*.yaml
values*.yml
```
