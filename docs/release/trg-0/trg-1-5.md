---
title: TRG 1.05 - Docs folder
---

| Status | Created     | Post-History                                             |
|--------|-------------|----------------------------------------------------------|
| Draft  | 16-Jan-2024 | created initial Draft                                    |

## Why

A dedicated documentation `/docs` folder is the first point touchpoint of any user to the product knowledge base.
It promotes user adoption, facilitates developer collaboration, and enhances the overall quality of the software.
This folder and the underlying documents stands for a valuable asset for any product and should be treated as such.

## Description

Relevant product documentation **has to** be included in a `/docs` folder that is present on root level of the product repository.

We also agreed on a common structure as described in the [arc42](https://docs.arc42.org/home/) documentation for the `/docs` folder, which **has to** be followed by all product repositories.

The `/docs` folder **should** follow the [arc42](https://docs.arc42.org/home/) documentation, but can also include additional documentation if required.

Recommended topics within the arc42 documentation:

- Introduction and goals (requirements, stakeholder)
- Constraints (technical and organizational constraints, conventions)
- Context and scope (business and technical context, external interfaces)
- Solution strategy (fundamental solution decisions and ideas)
- Building block view  (abstractions of source code)
- Runtime view and Runtime scenarios  (interaction between building blocks )
- Deployment view (hardware and technical infrastructure, deployment)
- Crosscutting concepts (recurring solution approaches and patterns)
- Architecture decisions
- Quality tree and quality scenarios
- Risks and technical debt
- Glossary (definitions of important business and technical terms)

## Best Practices

We already have good examples of the `/docs` folder in [Tractus-X GitHub Organisation](https://github.com/eclipse-tractusx) like e.g. [digital-product-pass](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/docs) are already present on our [Tractus-X Website](https://eclipse-tractusx.github.io/) e.g.[DATA Chain KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Data%20Chain%20Kit/Documentation/irs_arc42/).
