---
id: changelog
title: Changelog 
description: 'Business Partner Kit'
sidebar_position: 1
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

### Business Partner KIT

All notable changes to this Kit will be documented in this file.

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
