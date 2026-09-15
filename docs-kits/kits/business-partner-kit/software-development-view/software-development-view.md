---
id: specification
title: Specification
description: Business Partner KIT
sidebar_position: 1
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

Business Partner Data Management manages and shares business partner data with other Catena-X services.
The source is on [GitHub](https://github.com/eclipse-tractusx/bpdm).

## The BPDM Services

BPDM consists of four deployable services, three of which expose an API:

| Service                     | API | Purpose                                                                        | Used by              |
|-----------------------------|-----|--------------------------------------------------------------------------------|----------------------|
| BPDM Gate                   | yes | Share business partner data with the golden record process and read the result back | Sharing member       |
| BPDM Pool                   | yes | Query golden records, Business Partner Numbers and metadata                     | Dataspace participant|
| BPDM Orchestrator           | yes | Retrieve and resolve business partner data while it is being processed          | Refinement service   |
| BPDM Cleaning Service Dummy | no  | Reference refinement service; a client of the Orchestrator API                  | -                    |

Gate, Pool and Orchestrator each serve a current `v7` and a deprecated `v6` API. Use `v7`.

## API Reference

The API specifications are published as Swagger UI. Pick the service from the sidebar entries next to this page:

- **Gate API**
- **Pool API**
- **Orchestrator API**

All three APIs are OAuth2 resource servers: every request carries a bearer token, and the permissions behind it decide which endpoints it may call.

The Pool and the Gate publish one Open-API document per permission group, holding exactly the endpoints that group may call.
Select it from the definition dropdown in the Swagger UI:

- **Pool**: `V7 — Dataspace Participant`, `V7 — Sharing Member`, `V7 — Admin`
- **Gate**: `V7 — Input Consumer`, `V7 — Output Consumer`, `V7 — Input Manager`, `V7 — Admin`

The permission groups are described in the [Architecture documentation](../documentation-bpdm/bpdm-arc42.md#roles-rights-permissions).

Importing such a document into Postman with *Import → Link* - for example `https://<host>/pool/docs/api-docs/v7-participant` - yields a collection scoped to that permission group.
[Setting up an imported collection](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/README.md#setting-up-an-imported-collection) lists the document paths and the authorization to set.

## Integration Guides

Which API you integrate against follows from your role in the golden record process. One guide per role:

- [Sharing Member Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/sharing-member-guide.md) - the generic business partner format, the two data stages, the sharing state and the changelog.
- [Dataspace Participant Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/dataspace-participant-guide.md) - the golden record levels and the metadata lists.
- [Refinement Service Provider Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/refinement-service-guide.md) - the golden record task, its business partner data and its step results.

The full API documentation and the machine-readable specifications are in [docs/api](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/README.md).

:::note

The golden record process itself - duplication checks, categorizing and cleaning - is not part of this reference implementation.
BPDM ships a dummy processing service instead, which comes with [restrictions](../documentation-bpdm/bpdm-arc42.md#dummy-golden-record-process-restrictions).

:::

## Access Over EDC

Where BPDM data crosses a legal entity boundary, the API is reached through an EDC: the consumer negotiates for a data offer and calls the BPDM APIs with the resulting transfer token, proxied by the provider EDC's public API.
Offers are separated by the purposes of the BPDM framework agreement, so select the offer matching your purpose.
Which communication needs an EDC is stated in the [Architecture documentation](../documentation-bpdm/bpdm-arc42.md#recommended-usage-scenarios-of-an-edc-enabled-communication-in-business-partner-data-management-solution).

Two Postman collections document both sides of that setup:

- [EDC BPDM Consumer](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/EDC%20BPDM%20Consumer.postman_collection.json) - negotiating for an offer and calling the APIs with the transfer token, described in [Access BPDM over EDC](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/README.md#access-bpdm-over-edc).
- [EDC Provider Setup](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/admin/EDC%20Provider%20Setup.postman_collection.json) - defining the BPDM assets, policies and contract definitions on the provider side.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023-2026 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023-2026 SAP SE
- SPDX-FileCopyrightText: 2023-2026 Volkswagen AG
- SPDX-FileCopyrightText: 2023-2026 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023-2026 Mercedes Benz Group
- SPDX-FileCopyrightText: 2023-2026 BASF SE
- SPDX-FileCopyrightText: 2023-2026 Schaeffler AG
- SPDX-FileCopyrightText: 2023-2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
