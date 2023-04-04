# Changelog

For background information visit [https://catena-x.net](https://catena-x.net).

All notable changes on overarching level will be documented in this file. Refer to component repositories for specific content, changelog and documentation.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Note: Versions listed in this log refer to the app version of the mentioned component, not the Helm Charts which install the app. Helm Charts
may have version numbers which differ from the app version.

## Unreleased

- Update of Simple Data Exchanger (SDE): new version expected in March 2023

## [3.0.0] - 2023-03-03

### Added
- [Connector KIT](https://eclipse-tractusx.github.io/docs/category/connector-kit/), v1.0.0
- [Business Partner KIT](https://eclipse-tractusx.github.io/docs/category/business-partner-kit/), v1.0.0
- [Data Chain KIT](https://eclipse-tractusx.github.io/docs/kits/Data%20Chain%20Kit/data%20chain%20kit%20changelog/), v1.0.0
- [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk-frontend), Frontend v1.1.0, Backend v1.0.3
- [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass), v0.4.6
- [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss-frontend), v1.1.0

### Changed
- [Autosetup Service](https://github.com/eclipse-tractusx/autosetup-backend), Frontend v1.4.7, Backend v1.4.6
- [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry), v0.2.0-M3-multi-tenancy
- [Dynamic Attribute Provisioning Service (DAPS)](https://github.com/eclipse-tractusx/daps-helm-chart/), v1.7.1
- [DAPS Registration Service](https://github.com/eclipse-tractusx/daps-registration-service/), v1.0.5
- [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc), v0.1.6
- [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm), v3.0.3
- [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service), v2.3.0
- [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallets), v3.3.2
- [Portal](https://github.com/eclipse-tractusx/portal-frontend), v1.0.0 for Registration, Frontend, Backend and Assets
- [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory), v2.0.0
- [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub), v0.1.0-M3

### Known knowns
- Relevant components and interfaces developed considering [Gaia-X](https://gaia-x.eu/) Trust Framework - 22.10\
  Connection to an external Clearing House service for the entire Catena-X ecosystem required.\
  The [Gaia-X](https://gaia-x.eu/) compliance service should generally be capable to recognize all companies that are able to register with the Catena-X Portal.
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment (Pre-PROD)
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations

### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.24.6`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `14`

## [2.1.0] - 2022-12-21

### Added

- [Portal](https://github.com/eclipse-tractusx/portal-frontend), v0.6.0
- [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallets), v2.1.0
- [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/dft-frontend), v1.7.0
- [Autosetup Service](https://github.com/eclipse-tractusx/autosetup-backend), v1.0.1
- [DAPS Registration Service](https://github.com/eclipse-tractusx/daps-registration-service/), v1.0.5
- [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory), v1.0.6
- [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub), v0.1.0M1
- [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service), v1.3.0

### Known knowns

- Developed considering [Gaia-X](https://gaia-x.eu/) Trust Framework - 22.04
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- Restricted crosscheck of functionality in verification environment:  
  Smoke-tests did not verify
  - Approval of company registration
  - Mutiple user onboarding
  - Registration of EDC and associated SD validations
  - IRS
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)

### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.24.3`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `14`

## [2.0.0] - 2022-12-14

### Added

- [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc), v0.1.2
- [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm), v2.0.0
- [Dynamic Attribute Provisioning Service (DAPS)](https://github.com/eclipse-tractusx/daps-helm-chart/), v1.7.1
- [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry), v0.2.0M2

### Known knowns
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Portal (Registration) as well as Managed Identity Wallet scope required for full functionality; yet both are unreleased 
  at this point in time and can be expected with Release 2.1.0
- Released Helm Chart missing for EDC v0.1.2; can be expected with Release 2.1.0

### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.24.3`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `14`
