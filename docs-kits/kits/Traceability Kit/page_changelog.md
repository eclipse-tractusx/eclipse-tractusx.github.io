---
id: Traceability Kit Changelog
title: Changelog
description: 'Traceability Kit'
sidebar_position: 0
---

![Traceability kit banner](@site/static/img/doc-traceability_header-minified.png)

All notable changes to this Kit will be documented in this file.

## [0.2.0] - UPCOMING

Compatible for Catena-X Release 3.2

### Added

- **Adoption View:**
  - TractionBatteryCode aspect model
  - Information about Verifiable Credentials
- **Development View:**
  - TractionBatteryCode aspect model

### Changed

- **General:**
  - Updated all parts of the KIT related to the digital twin registry as the DTR now has a decentralized architecture
  - Updated SerialPartTypization 1.1.1 to SerialPart 1.0.1
  - Updated AssemblyPartRelationship 1.1.1 to SingleLevelBomAsBuilt 1.0.0
  - Updated aspect model Batch from version 1.0.2 to 2.0.0 ([Release Notes](https://github.com/eclipse-tractusx/sldt-semantic-models/blob/main/io.catenax.batch/RELEASE_NOTES.md))
  - Fixed references to deprecated Catena-X releases
- **Adoption View:**
  - Updated description of the policy section (Access Policies, Usage Policies, Contract Definitions)
  - Updated relevant standards for release 3.2
- **Development View:**
  - Updated documentation because of the migration to the new standard AAS v3.0 by the DTR
  - Updated conventions for submodel descriptors and EDC asset structure to give data provides more flexibility in how to create EDC assets for submodels of digital twins
  - Setting the visibility of entries in a digital twin's specifid asset IDs is now mandatory to ensure need-know

### Removed

- **Adoption View:**
  - Policy payloads are removed and replaced by specific documentation links

## [0.1.1] - 2023-04-14

Compatible for Catena-X Release 3.1

### Added

- **Adoption View:**
  - Traceability tutorial video
  - Customer journey

### Changed

- ./.

### Removed

- ./.

## [0.1.0] - 2023-04-12

Compatible for Catena-X Release 3.1

### Added

- Initial version of the Kit including adoption, operation and development view + two API specifications (Notification API, Unique ID Push API)

### Changed

- ./.

### Removed

- ./.
