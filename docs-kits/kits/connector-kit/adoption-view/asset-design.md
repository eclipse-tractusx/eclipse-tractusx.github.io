---
sidebar_position: 4
title: Adoption View - Contract Definition Design
description: A discussion on aspects to be considered when designing contract definitions and the impact on the implementation.
id: contract-definition-design
---

![Connector kit banner](@site/static/img/kits/connector/connector-kit-logo.svg)

On this page you learn about key aspects to be considered when designing contract definitions. The two main aspects are how data should be provided, e.g., the granularity of offers, the transfer type used, etc., and what is the impact of a certain setup on the implementation of the whole provider stack, e.g., if authorization aspects are delegated to a backend system, the mechanism used in the backend system have to be aligned with the concepts of the contract definition, so that the right information is passed on.

This page is currently work-in-progress!

<!--E.g. a REST API that provides certain data types like asset administration shell submodels of certain types should be
offered as one data offer in a catalog. The data offer has to be configured in a way, that it provides contract
information in the access token used for the api, so that parts of the authorization, i.e., the decision whether a
certain data model instance is visible for the consumer requesting it is delegated to the resource server providing
the REST API. By using the information from the token, the resource server can use any kind of authorization
mechanism to decide the accessibility of the requested data.-->

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- SPDX-FileCopyrightText: 2025 Cofinity-X GmbH
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/docs-kits/kits/connector-kit/adoption-view/asset-design.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/docs-kits/kits/connector-kit/adoption-view/asset-design.md)
