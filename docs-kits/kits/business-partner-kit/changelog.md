---
id: changelog
title: Changelog
description: Business Partner KIT
sidebar_position: 1
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

### Business Partner KIT

All notable changes to this KIT will be documented in this file.

## [12.0.0] - 2026-09-08

Compatible for **release 26.09**.

### Added

- Adoption view: what a golden record carries beyond a single business partner - relations, ultimate owner, confidence criteria and script variants.
- Adoption view: CSV upload as an alternative to a master data management system, and the standards of the value-added services.
- Architecture view: a Building Block View with the four deployed services and the repository's modules.
- Architecture view: runtime views for sharing a relation, for counting the sharing members of a golden record and for picking up finished tasks.
- Architecture view: a "Dummy Golden Record Process Restrictions" chapter.
- Architecture view: the architecture decision "Realize multi-tenancy within one Gate deployment".
- Development view: the four BPDM services, the role-scoped Open-API documents, the integration guides per role and access over EDC.
- Use cases: starting the Gates of the second and third sharing member, and obtaining an access token for the Gate API.
- Operation view: the bundled `helm test` smoke test and the Keycloak admin console.
- Operation view: the optional `bpnSites` on `PUT addresses`.
- CC BY 4.0 notice on the changelog, development view, use cases and operation view pages.

### Changed

- Aligned the KIT with BPDM application 7.5.0 and BPDM Helm Charts 7.1.0.
- API Hub links for Gate, Pool and Orchestrator point to 7.5.0, which requires the 7.5.0 specifications to be published there.
- Regenerated the architecture view from the BPDM repository: corrected deployment view, v7 API paths in all runtime views, complete permission tables, Pool permission group "Cx Member" renamed to "Dataspace Participant", and the actual logging levels.
- Architecture view: the Gate serves several sharing members at once and resolves the tenant from the caller's token.
- Adoption view: an address can belong to several sites.
- Development view: rewrote the specification page.
- Use cases: the end-to-end suite is built and run as an executable JAR, and the changelog examples use v7 endpoints.
- Operation view: prerequisite tool versions, supported external Keycloak version, workload names, port forwarding, and the notes on upgrading an existing deployment and on the bundled dependencies.

### Removed

- Architecture view: the technical debts that no longer apply, and the Simulator Service.
- Development view: the Postman collections of Gate, Pool, Orchestrator, Cleaning Service Dummy and Bridge Dummy, replaced by the role-scoped Open-API documents, which Postman imports into a collection scoped to one permission group.

## [11.0.0] - 2026-06-11

Compatible for **release 26.06**.

### Added

- Added an Administration section to the operation view covering metadata management, BPN request identifiers and direct golden record updates via the Pool API.

### Changed

- Aligned the Business Partner KIT with BPDM application version 7.4.0 and BPDM Helm Charts version 7.0.0.
- Updated the API Hub hyperlinks for the Gate, Pool and Orchestrator services in the development view to use BPDM Application version 7.4.0.
- Reworked the operation view Helm installation guide for the breaking BPDM Helm Charts 7.0.0 changes (Postgres 15→18 and Keycloak 25→26, both Bitnami→Cloudpirates), including the new `postgres.customUser`, `bpdmRealm.clients`, `springProfiles` and external dependency value structures, and added a migration guide reference.

### Removed

- ./.

## [10.1.0] - 2026-03-18

Compatible for **release 26.03**.

### Added

- ./.

### Changed

- Updated API Hub hyperlinks for all services in the development view of the Business Partner KIT to use the latest BPDM Application version 7.3.0.

### Removed

- ./.

## [10.0.0] - 2025-09-08

Compatible for **release 25.09**.

### Added

- Added api hub hyperlink for all services in development view of business partner kit with latest BPDM Application version 7.1.0.

### Changed

- Updated architecture view document for several minor updates for information that has become outdated for BPDM version 7.1.0.
- Updated adoption view with correct link for Business Partner Use Case and Catena-X Standard Library.

### Removed

- ./.

## [9.0.0] - 2025-06-16

Compatible for **release 25.06**.

### Added

- Added api hub hyperlink for all services in development view of business partner kit with latest BPDM Application version 7.0.0.

### Changed

- Updated architecture view document for several minor updates for information that has become outdated for BPDM version 7.0.0.
- Updated development view sidebar to show latest api specifications.

### Removed

- ./.

## [8.0.0] - 2025-03-03

Compatible for **release 25.03**.

### Added

- Added api hub hyperlink for all services in development view of business partner kit with latest BPDM Application version 6.3.0.

### Changed

- Updated development view sidebar to show latest api specifications.
- Use case section updated on how E2E test can be executed locally.

### Removed

- ./.

## [7.0.0] - 2024-12-01

Compatible for **release 24.12**.

### Added

- Added api hub hyperlink for swagger documentation for all services from business partner data management in development view of business partner kit.

### Changed

- ./.

### Removed

- Removed open api plug in usage from business partner kit.

## [6.0.0] - 2024-07-16

### Added

- BPDM Gate api endpoint: Post endpoint to upload business partner input data using csv file.
- BPDM Gate api endpoint: GET endpoint to download the csv file template for business partner upload.
- BPDM Apps: New attribute Tax Jurisdiction Code to the physical address of a business partner
- BPDM Orchestrator: New attribute Record Id to tasks. Now tasks come with a gate record identifier.

### Changed

- Documentation of gate service with new endpoints
- Documentation of orchestrator service with updated endpoints
- Documentation of pool service with updated endpoints for newly added attributes.

### Removed

- Documentation of BPDM Bridge Dummy service.

## [5.0.0] - 2024-05-15

### Added

- ./.

### Changed

- Changed banner image file location and converted .png image to .svg
- Updated changes in Gate, Pool and Orchestrator Open API documents.
- Updated development view

### Removed

- ./.

## [4.0.0] - 2024-02-22

### Added

- documentation of bpdm architecture (arc42)
- documentation for sharing-state api endpoints on bpdm gate

### Changed

- documentation of gate service with new endpoints for creating and querying generic business partners
- documentation of pool service with updated endpoints for creating and querying business partners
- documentation of orchestrator service with updated endpoints
- documentation of new version for bridge service

### Removed

- documentation of old endpoints in software development view for gate and pool servicce

## [3.0.0] -2023-11-02

### Added

- documentation for orchestrator and cleaning dummy service in software development view
- documentation of new services with installation steps in operation view
- documentation of bpdm architecture (arc42)

### Changed

- documentation of gate service with new endpoints for creating and querying generic business partners
- documentation of operation view for local deployment

### Removed

- documentation of old endpoints in software development view for gate and pool servicce

## [2.0.0] - 2023-08-25

### Added

- documentation of the software development view including the business partner data management for Gate and Bridge-Dummy API
- documentation of bpdm architecture (arc42)
- documentation versions based on Catena-X release

### Changed

- documentation of the operations view with an installation guide for all services

### Removed

- documentation of api references, troubleshooting and best practices

## [1.0.0] - 2023-03-01

### Added

- documentation of the software development view including the business partner data management POOL API
- documentation of adoption view
- documentation of the operations view with an installation guide for the POOL API

### Changed

- ./.

### Removed

- ./.

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
