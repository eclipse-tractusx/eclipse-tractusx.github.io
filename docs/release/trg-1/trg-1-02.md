---
title: TRG 1.02 - INSTALL.md
---

| Status | Created      | Post-History                                        |
|--------|--------------|-----------------------------------------------------|
| Update | 13-Dez-2023  | add best practices and an example, rephrase the why |
| Active | 07-Mar-2023  |                                                     |
| Draft  | 13-Sept-2022 |                                                     |

## Why

If a repository contains code which needs to be configured/setup or installed, the `README.md` file should cover this information.

If these instructions are too long, they can be moved into a dedicated `INSTALL.md` file.

Having a proper `INSTALL.md` file is crucial for ensuring a seamless and user-friendly experience for the product-users.

In conclusion, a proper `INSTALL.md` file should be mainly adapted to end-users, but also developers. It is not a technical necessity.
It's a strategic investment in user satisfaction, community engagement, and the overall success of the product. It reflects a commitment to inclusivity and usability, ensuring that a diverse user base can effortlessly install and enjoy the benefits of your product.

## Description

Create a `INSTALL.md` file in the main folder of the repository and add all installation relevant information.

## Best Practices

A well-structured installation guide includes:

- the prerequisites
- a step-by-step installation instruction which can be copy+pasted directly
  - using only the charts of our official [helm chart repository](https://github.com/eclipse-tractusx/charts)
- a link to your helm chart `README.md` file
- guides on verification, upgrade and uninstallation (and if needed: local deployment/testing specifics)
- a FAQ and troubleshooting section
- links to additional resources / information
- contact information for support or feedback

## Exemplary Helm installation guide structure

- [Installation](#installation)
  - [Install Helm chart from the Helm chart repository](#install-helm-chart-from-the-helm-chart-repository)
  - [Use Helm chart as dependency on your own Helm chart](#use-helm-chart-as-dependency-on-your-own-helm-chart)
  - [Configure product-example Helm chart on your needs](#configure-product-example-helm-chart-on-your-needs)

### Installation

#### Install Helm chart from the Helm chart repository

```shell
# 1. Add the helm chart repository:
helm repo add tractusx-dev https://eclipse-tractusx.github.io/
```

```shell
# 2. Install product-example chart into your cluster:
helm install helm-release-name tractusx-dev/product-example
```

#### Use Helm chart as dependency on your own Helm chart

```yaml
    dependencies:
      - name: product-example
        repository: https://eclipse-tractusx.github.io/product-example
        version: 1.x.x
```

#### Configure product-example Helm chart on your needs

Please have a look into our `[Helm chart documentation](link_to_helm_chart_readme)` for more information about the configuration options.
