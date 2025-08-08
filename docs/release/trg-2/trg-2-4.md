---
title: TRG 2.04 - Leading product repository
sidebar_position: 3
---

| Status | Created     | Post-History                                   |
|--------|-------------|------------------------------------------------|
| Update | 12-Dez-2023 | add example leading repository reference links |
| Active | 07-Mar-2023 |                                                |
|        | 10-Jan-2023 | Initial release                                |

## Why

We have multiple stakeholders for a repository: system team, test management, release management and everybody else interested in the product.
They need to be able to understand complicated product structures in an intuitive way to have an easier task of diving into a product.

## Description

Each product **must** have a leading product repository that points to all the parts/components/charts/releases of the product.
This can be achieved by having a single repository for a product or creating references to the other repositories.

Exemplary repository structure:

- productname: leading product repository
  - README.md: contains the URLs for e.g. the backend and frontend applications
  - README.md: each repo has to follow our [TRG 1.01](../trg-1/trg-1-1.md) about the README.md
  - README.md: an [example section](#readme-example-section-for-a-leading-product-repository) for a leading product repository
  - contains the release of the product
  - contains the [product helm chart](../trg-5/trg-5-08)
- productname-a-component: e.g. the repository for the frontend application
- productname-b-component: e.g. the repository for the backend application

And each repo **must** contain the metafile see [TRG 2.05](../trg-2/trg-2-5.md).

## Leading product repository rules

- The name of the leading product repository **must** contain the product name without prefix or suffix
- It **should** contain the release (whether it is source code, helm chart or any other artifact)
- README.md contains the description of what the product does
- README.md contains the references/URLs to the product's other repositories if they exist
- It **should** contain the [TRG 5.08 - Product Helm Chart](https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-08)

### README example section for a leading product repository

```markdown
Leading repository for [product-name](link_to_product_repository):
- [product component A](link_to_product_component_A_repository)
- [product component B](link_to_product_component_B_repository)
```
