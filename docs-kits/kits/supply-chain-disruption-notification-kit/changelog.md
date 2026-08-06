---
id: changelog
title: Changelog
description: 'Supply Chain Disruption Notifications'
sidebar_position: 1
---

![Supply Chain Disruption Notifications kit banner](@site/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-logo.svg)

All notable changes to this Kit will be documented in this file.

## [3.0.0] - 2026-09-16

### Changed

- ensure that the scheme and examples don't use a property `demandAndCapacityNotification` in object `content`. A mistake has been made in version 2.0.0 removing it in the examples but not in the schema. As the schema is more leading, this is considered a major instead of a bugfix change. Thus, switch to [version 3.0.0 api scheme](https://eclipse-tractusx.github.io/api-hub/eclipse-tractusx.github.io/kit-supply-chain-disruption-notification-demandAndCapacityNotification-openAPI-v3/swagger-ui/)
  - adoption view:
    - bump standard version in [standards section](./adoption-view.md#standards)
  - development view (demand and capacity notification):
    - bump version in [connector data asset structure](./software-development-view/demandAndCapacityNotification.md#connector-data-asset-structure), [versioning](./software-development-view/demandAndCapacityNotification.md#versioning), [sample data](./software-development-view/demandAndCapacityNotification.md#sample-data)
    - removed `demandAndCapacityNotification` property from object `content` in [sample data](./software-development-view/demandAndCapacityNotification.md#sample-data)
    - added version 3 to [open api documentation](./software-development-view/demandAndCapacityNotification.md#open-api-documentation)
- standard maintenance in [adoption view](./adoption-view.md#standards)
  - replace puris standards with new summarized CX-0157
  - remove CX-0001 EDC Discovery as its now part of CX-0018 Dataspace Connectivity
  - add CX-0152 Policy Constraints for Data Exchange and update [usage policy example](./software-development-view/policies.md#usage-policies)

### Deprecated

- api version `2.0.0` is now deprecated and will be fully removed with 27.09.

## [2.0.0] - 2025-08-22

### Added

Software Development View:

- Restructured into subchapters architecutre, policies and demand and capacity notification
- Table for setting fields in `header`
- Versioning chapter

Adoption View:

- Fixed copy and paster error in `Figure 1` (and migrated file basis to draw.io)
- Reworked `Figure 2` to a forwarding example
- Provided example for the forwarding example

### Changed

Software Development View:

- Updated samples and references to updated standard and aspect model

Adoption View:

- Reworked `Figure 2` to a forwarding example

### Removed

- ./.

## [1.0.1] - 2024-11-18

### Added

- ./.

### Changed

- New kit-icon and gallery banner

### Removed

- ./.

## [1.0.0] - 2024-08-01

### Added

- Initial version of the Kit including adoption, development and operations view

### Changed

- ./.

### Removed

- ./.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 SAP SE
- SPDX-FileCopyrightText: 2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2024 BASF SE
- SPDX-FileCopyrightText: 2024 SupplyOn AG
- SPDX-FileCopyrightText: 2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- SPDX-FileCopyrightText: 2024 ISTOS GmbH (a member of the DMG Mori Group)
- SPDX-FileCopyrightText: 2024 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer ISST)
- SPDX-FileCopyrightText: 2024 TRUMPF Werkzeugmaschinen SE + Co. KG
- SPDX-FileCopyrightText: 2024 Volkswagen AG
- SPDX-FileCopyrightText: 2025 WITTE Automotive GmbH
- SPDX-FileCopyrightText: 2025 Ford Werke GmbH
- SPDX-FileCopyrightText: 2025 Robert Bosch Manufacturing Solutions GmbH
- SPDX-FileCopyrightText: 2025 IBM Deutschland GmbH
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
