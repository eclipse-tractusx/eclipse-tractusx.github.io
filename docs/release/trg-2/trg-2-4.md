---
title: TRG 2.04 - Leading product repository
---

| Author                | Status | Created     | Post-History                               |
|-----------------------|--------|-------------|--------------------------------------------|
| Catena-X System Team  |        | 10-Jan-2023 | Initial release                            |

## Description

Each product should have a leading product repository that can point the users to all the parts/components/charts/releases of that product. This can be achieved by having a single repositry for a product alltogether or creating references to the other repositories.

A good example when a product has a separate repository for frontend and backend. Then the product team should create a leading repository where they reference the components/repositories of the product:

- product-A-frontend: the repository for the frontend application
- product-A-backend: the repository for the backend application
- product-A: leading product repository
  - README.md: contains the urls for the backend and frontend applications
  - contains the release of the product
  - contains the [product helm chart](https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-8)

## Leading product repository rules

- the name of the leading product repository should be simply contain the product name without prefix or suffix
- it should contain the release (whether it is source code, helm chart or any other artifact)
- README.md contains the description of what the product does
- README.md contains the references/urls to the product's other repositories if they exist
- it might contain the [product helm chart](https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-8)

## Why

It is very complicated for everyone including system team, release management, test management, external personnel to identify which repository represents which product.
