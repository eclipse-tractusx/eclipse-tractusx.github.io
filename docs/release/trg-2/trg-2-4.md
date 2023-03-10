---
title: TRG 2.04 - Leading product repository
---

| Status | Created     | Post-History    |
|--------|-------------|-----------------|
| Active | 07-Mar-2023 |                 |
|        | 10-Jan-2023 | Initial release |

## Why

We have multiply stakeholders for a repository: System team, release management, test management, external people who are trying it out, want to contribute or need to set it up.
They need to be able to understand complicated product structures in an intuitive way to have an easier task of diving into a product.

## Description

Each product **must** have a leading product repository that can point the users to all the parts/components/charts/releases of that product.
This can be achieved by having a single repository for a product or creating references to the other repositories.

A good example when a product has a separate repository for frontend and backend. Then the product team **must** must have a leading repository where they reference the components/repositories of the product:

- productname: leading product repository
  - README.md: contains the urls for the backend and frontend applications
  - contains the release of the product
  - contains the [product helm chart](https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-8)
- productname-A-frontend: the repository for the frontend application
- productname-A-backend: the repository for the backend application

## Leading product repository rules

- The name of the leading product repository **must** contain the product name without prefix or suffix
- It **should** contain the release (whether it is source code, helm chart or any other artifact)
- README.md contains the description of what the product does
- README.md contains the references/urls to the product's other repositories if they exist
- It **should** contain the [TRG 5.08 - Product Helm Chart](https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-8)
