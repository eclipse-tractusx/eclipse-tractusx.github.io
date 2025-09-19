# Changelog

The overarching project is guided by [https://catena-x.net](https://catena-x.net) and all development work is covered in [https://eclipse-tractusx.github.io](https://eclipse-tractusx.github.io/).

All notable changes on the overarching level are documented in this file. Refer to component repositories for specific content, changelog and documentation.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Tractus-X operates on YY.0M.MICRO [Calendar Versioning](https://calver.org/) for overarching, quarterly Releases. Semantic Versioning remains unchanged for all components.

|  Category | Meaning |
| -------- | -------------|
| Added | This component was not part of a previous release package  |
 |Updated | The component was already part of some previous release, but has now undergone a change |
 |Removed / Deprecated |  The component was deliberately removed from the scope of the release package |

## [25.09] - 2025-09-29

Implemented features can be found [here](https://github.com/orgs/eclipse-tractusx/projects/26/views/41)

### Added

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |

### Updated

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Business Partner KIT]( https://eclipse-tractusx.github.io/docs-kits/next/category/business-partner-kit) | n/a | [X.0.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/business-partner-kit/changelog/#900---2025-06-16) |
| [BPN DID Resolution Service (BDRS)](https://github.com/eclipse-tractusx/bpn-did-resolution-service) | bdrs: [0.5.7](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.7) | [0.5.7](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.7) |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry) | digital-twin-registry:[0.9.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.9.0) | [0.9.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.9.0) |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc) | tractusx-connector: [0.11.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.11.0) | [0.11.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.11.0) |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm) | bpdm: [6.1.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-6.1.0) | [7.1.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v7.1.0) |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam) | centralidp: [4.2.1](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-4.2.1) <br/> sharedidp: [4.2.1](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-4.2.1) | keycloak: [25.0.6](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-25-0-0) |
| [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub) | industry-core-hub:[0.X.X](https://github.com/eclipse-tractusx/industry-core-hub/releases/tag/industry-core-hub-0.X.X) | [v0.X.0](https://github.com/eclipse-tractusx/industry-core-hub/releases/tag/v0.X.0)|
| [Portal](https://github.com/eclipse-tractusx/portal) | portal: [2.6.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.6.0) | registration: [2.2.2](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.2.2)<br/>frontend: [2.6.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.6.0)<br/>backend: [2.6.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.6.0)<br/>assets: [2.6.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.6.0) |
| [PURIS](https://github.com/eclipse-tractusx/puris) | puris: [4.1.1](https://github.com/eclipse-tractusx/puris/releases/tag/puris-4.1.1) | [3.3.0](https://github.com/eclipse-tractusx/puris/releases/tag/3.3.0) |
|[PURIS KIT](https://eclipse-tractusx.github.io/docs-kits/category/puris-kit)| n/a | [0.4.0](https://eclipse-tractusx.github.io/docs-kits/kits/puris-kit/changelog)|
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory) | sdfactory: [2.1.34](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.34) | [2.1.25](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.25) |
| [Supply Chain Disruption Notification KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/supply-chain-disruption-notification-kit/changelog)| n/a | [2.0.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/supply-chain-disruption-notification-kit/changelog)|
| [Tractus-X Software Development KIT (SDK)](https://github.com/eclipse-tractusx/tractusx-sdk) | n/a | [v0.4.1](https://github.com/eclipse-tractusx/tractusx-sdk/releases/tag/v0.4.1) |

### Known Knowns

- All not listed products and KITs have not been updated and are based on the release 25.06
  - These products were not part of the testing phase
- The Eclipse Tractus-X release does not include an Identity Wallet. The development team decided on a temporary bridging solution, based on a commercial application, to test and ship the releases 24.08, 24.12, 25.03, 25.06 and 25.09. Without implementing this interim solution, participants will not be able to fully utilize this release in consequence.
- For E2E Testing, the [2.2.3](https://github.com/SAP/ssi-dim-middle-layer/releases/tag/v2.2.3) of the [SSI DIM Middle Layer](https://github.com/SAP/ssi-dim-middle-layer) was used - this component is FOSS but the currently used wallet (see previous item) is not

#### PURIS

- Data Assets and DTR not covered in migrations
- Data Sovereignty is not transparent to end-users
- Catalog and Neogtiations have bad user experience (no actions, no filters)
- **Incompatible with Tractus-X Connector `0.11.x:` (additional)**
  - Not compliant to CX-0018, due to **NOT** evaluating the dspace endpoint.
  - Not compliant to CX-0152, due to **NOT** implementing the new odrl profile.

### Runtime

The following runtime has been used during end-to-end test:

- [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) version: `1.29.10`
- Applications used
  - [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) version: `15.4.0` or more specifically `15.4.0-debian-11-r45`
  - EDC version [0.11.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.11.0)
  - DTR version [0.9.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.9.0)

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

### Using helm with central helm registry

You can search all released helm charts with the following commands:

```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```

For installation details, please see the referenced Repositories / Releases.

## [25.06] - 2025-06-16

Implemented features can be found [here](https://github.com/orgs/eclipse-tractusx/projects/26/views/36)

### Added

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Eclipse Tractus-X Software Development KIT (SDK)](https://github.com/eclipse-tractusx/tractusx-sdk) | n/a | [v0.0.7](https://github.com/eclipse-tractusx/tractusx-sdk/releases/tag/v0.0.7) |
| [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub) | industry-core-hub:[0.2.1](https://github.com/eclipse-tractusx/industry-core-hub/releases/tag/industry-core-hub-0.2.1) | [v0.1.0](https://github.com/eclipse-tractusx/industry-core-hub/releases/tag/v0.1.0)|

### Updated

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Business Partner KIT]( https://eclipse-tractusx.github.io/docs-kits/next/category/business-partner-kit) | n/a | [9.0.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/business-partner-kit/changelog/#900---2025-06-16) |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry) | digital-twin-registry:[0.8.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.8.0) | [0.8.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.8.0) |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc) | tractusx-connector: [0.10.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.10.0) | [0.10.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.10.0) |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm) | bpdm: [6.0.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-6.0.0) | [7.0.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v7.0.0) |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam) | centralidp: [4.2.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-4.2.0) <br/> sharedidp: [4.2.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-4.2.0) | keycloak: [25.0.6](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-25-0-0) |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service) | item-relationship-service: [9.0.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/item-relationship-service-9.0.0) | [7.0.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/7.0.1) |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub) | policy-hub: [1.3.1](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.3.1) | [1.3.1](https://github.com/eclipse-tractusx/policy-hub/releases/tag/v1.3.1) |
| [Portal](https://github.com/eclipse-tractusx/portal) | portal: [2.5.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.5.0) | registration: [2.2.1](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.2.1)<br/>frontend: [2.5.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.5.0)<br/>backend: [2.5.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.5.0)<br/>assets: [2.5.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.5.0) |
| [PURIS](https://github.com/eclipse-tractusx/puris) | puris: [3.0.1](https://github.com/eclipse-tractusx/puris/releases/tag/puris-3.0.1) | [3.1.0](https://github.com/eclipse-tractusx/puris/releases/tag/3.1.0) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory) | sdfactory: [2.1.33](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.33) | [2.1.24](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.24) |
| [SSI Authority & Schema Registry](https://github.com/eclipse-tractusx/ssi-authority-schema-registry) | ssi-asr: [2.0.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/ssi-asr-2.0.0) | [2.0.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/v2.0.0) |
| [SSI Credential Issuer](https://github.com/eclipse-tractusx/ssi-credential-issuer) | ssi-credential-issuer: [1.4.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/ssi-credential-issuer-1.4.0) | [1.4.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/v1.4.0) |
| [Supply Chain Disruption Notification KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/supply-chain-disruption-notification-kit/changelog)| n/a | [2.0.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/supply-chain-disruption-notification-kit/changelog)|
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss) | traceability-foss: [1.4.3](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.4.3) | [15.0.1](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/15.0.1) |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/next/category/traceability-kit) | n/a| [6.1.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/traceability-kit/changelog/)|

### Known Knowns

- All not listed products and KITs have not been updated and are based on the release 25.03
  - These products were not part of the e2e testing phase
  - And are not tested with the current EDC version 0.10.0 and the current DTR version 0.8.0
- The Eclipse Tractus-X release does not include an Identity Wallet. The development team decided on a temporary bridging solution, based on a commercial application, to test and ship the releases 24.08, 24.12, 25.03 and 25.06. Without implementing this interim solution, participants will not be able to fully utilize this release in consequence.
- For E2E Testing, the [2.2.3](https://github.com/SAP/ssi-dim-middle-layer/releases/tag/v2.2.3) of the [SSI DIM Middle Layer](https://github.com/SAP/ssi-dim-middle-layer) was used - this component is FOSS but the currently used wallet (see previous item) is not

#### BPDM

- When creating a marketplace app the Portal does not support an internal technical user profile for BPDM permission group [Gate Input Consumer](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/architecture/08_Crosscutting_Concepts.md). Therefore, it is currently not possible to create a marketplace app that enables access to [ReadAccessGateInputForSharingMember offers](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#edc-installation) for external VAT services wanting to access sharing member Gates

#### Industry Core Hub

- No Authentication at the backend & frontend provided [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/254)
- No profile & settings provided at frontend (just a mock) [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/254)
- Part Instance twins not included in scope (not supported in backend, and mocked in the frontend) [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/261)
- Not submodel is displayed in the frontend, also is not possible to create submodels [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/260)
- No display of aspect models in frontend. (PCF and other data models are not supported, just PartTypeInformation v1.0.0) [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/260)
- It is not possible to unshare once shared [see here](https://github.com/eclipse-tractusx/industry-core-hub/issues/262)

#### Item Relationship Service (IRS)

- Persistent submodel service needed for end-to-end stability [see here](https://github.com/eclipse-tractusx/traceability-foss/issues/1459)

#### Portal

##### Backend

- Connector URL: Updating connector URL for connectors with missing SD Document is not working [see here](https://github.com/eclipse-tractusx/portal-backend/issues/1346)
- for comprehensive list [see here](https://github.com/eclipse-tractusx/portal-backend/blob/v2.5.0/CHANGELOG.md#known-knowns)

##### Frontend

- Auto-setup feature for App Subscriptions: validation is triggered on opening pop up [see here](https://github.com/eclipse-tractusx/portal-frontend/issues/1589)
- for comprehensive list [see here](https://github.com/eclipse-tractusx/portal-frontend/blob/v2.5.0/CHANGELOG.md#known-knowns)

#### Software Development KIT

- EDC Version specified is v0_9_0 but works with v0.10.0 [see here](https://github.com/eclipse-tractusx/tractusx-sdk/issues/115)
- EDC Service has not factory method. [see here](https://github.com/eclipse-tractusx/tractusx-sdk/issues/115)

#### Trace-X Traceability Application

- The "Show Details Table" function is non-functional in the as Planned view [see here](https://github.com/eclipse-tractusx/sig-release/issues/1443)
- Record Information is Visible for asPlanned Parts to Users with Supervisor Role (only role Admin shold be permitted) [see here](https://github.com/eclipse-tractusx/sig-release/issues/1442)
- Insufficient visualization of Teaction Battery Code [see here](https://github.com/eclipse-tractusx/sig-release/issues/1441)

### Runtime

The following runtime has been used during end-to-end test:

- [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) version: `1.29.10`
- Applications used
  - [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) version: `15.4.0` or more specifically `15.4.0-debian-11-r45`
  - EDC version [0.10.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.10.0)
  - DTR version [0.8.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.8.0)

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

### Using helm with central helm registry

You can search all released helm charts with the following commands:

```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```

For installation details, please see the referenced Repositories / Releases.

## [25.03] - 2025-03-19

Implemented features can be found [here](https://github.com/orgs/eclipse-tractusx/projects/26/views/39)

### Added

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Logistics KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/logistics-kit/changelog) | n/a | [1.0.0]( https://eclipse-tractusx.github.io/docs-kits/next/kits/logistics-kit/changelog) |
| [Customs KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/customs-kit/Customs%20Kit%20Changelog) | n/a | [1.0.0]( https://eclipse-tractusx.github.io/docs-kits/next/kits/customs-kit/Customs%20Kit%20Changelog) |

### Updated

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [BPN DID Resolution Service (BDRS)](https://github.com/eclipse-tractusx/bpn-did-resolution-service) | bdrs: [0.5.4](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.4) | [0.5.4](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.4) |
| [Business Partner KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/business-partner-kit/changelog) | n/a | [8.0.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/business-partner-kit/changelog) |
| [Demand- and Capacity-Management KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/demand-and-capacity-management-kit/changelog) | n/a | [1.3.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/demand-and-capacity-management-kit/changelog) |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry) | digital-twin-registry:[0.7.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.7.0) | [0.7.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.7.0) |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder) | discoveryfinder: [0.5.1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.5.1) | [0.6.1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.6.1) |
| [Discovery Service (BPN Finder)](https://github.com/eclipse-tractusx/sldt-bpn-discovery) | bpndiscovery: [0.5.1](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.5.1) | [0.6.1](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.6.1) |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc) | tractusx-connector: [0.9.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.9.0) | [0.9.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.9.0) |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm) | bpdm: [5.3.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-5.3.0) | [6.3.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v6.3.0) |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam) | centralidp: [4.1.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-4.1.0) <br/> sharedidp: [4.1.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-4.1.0) | keycloak: [25.0.6](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-25-0-0) |
| [Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/industry-core-kit/changelog) | n/a | [1.4.0](https://eclipse-tractusx.github.io/docs-kits/next/kits/industry-core-kit/changelog) |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service) | item-relationship-service: [8.0.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/item-relationship-service-8.0.1) | [6.0.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/6.0.1) |
| [OSim KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/osim-kit/changelog) | n/a | [3.1.0]( https://eclipse-tractusx.github.io/docs-kits/next/kits/osim-kit/changelog) |
| [PCF KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/product-carbon-footprint-exchange-kit/changelog) | n/a | [1.2.1]( https://eclipse-tractusx.github.io/docs-kits/next/kits/product-carbon-footprint-exchange-kit/changelog) |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub) | policy-hub: [1.3.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.3.0) | [1.3.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/v1.3.0) |
| [Portal](https://github.com/eclipse-tractusx/portal) | portal: [2.4.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.4.0) | registration: [2.2.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.2.0)<br/>frontend: [2.4.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.4.0)<br/>backend: [2.4.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.4.0)<br/>assets: [2.4.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.4.0) |
| [PURIS](https://github.com/eclipse-tractusx/puris) | puris: [2.8.1](https://github.com/eclipse-tractusx/puris/releases/tag/puris-2.8.1) | [3.0.0](https://github.com/eclipse-tractusx/puris/releases/tag/3.0.0) |
| [Quality KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/data-driven-quality-management-kit/changelog) | n/a | [2.0.0]( https://eclipse-tractusx.github.io/docs-kits/next/kits/data-driven-quality-management-kit/changelog) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory) | sdfactory: [2.1.32](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.32) | [2.1.23](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.23) |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub) | semantic-hub: [0.5.0](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.5.0) | [0.6.0](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.6.0) |
| [SSI Authority & Schema Registry](https://github.com/eclipse-tractusx/ssi-authority-schema-registry) | ssi-asr: [1.2.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/ssi-asr-1.2.0) | [1.2.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/v1.2.0) |
| [SSI Credential Issuer](https://github.com/eclipse-tractusx/ssi-credential-issuer) | ssi-credential-issuer: [1.3.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/ssi-credential-issuer-1.3.0) | [1.3.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/v1.3.0) |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss) | traceability-foss: [1.4.1](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.4.1) | [14.0.1](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/14.0.1) |
| [Traceability KIT]( https://eclipse-tractusx.github.io/docs-kits/next/kits/traceability-kit/changelog) | n/a | [6.0.2]( https://eclipse-tractusx.github.io/docs-kits/next/kits/traceability-kit/changelog) |

### Removed / Deprecated

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents) | remoting-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.14.24)<br/>provisioning-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/provisioning-agent-1.14.24)<br/>conforming-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/conforming-agent-1.14.24)<br/>matchmaking-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/matchmaking-agent-1.14.24) | remoting-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>provisioning-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>conforming-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>matchmaking-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24) |
| [Digital Product Pass (DPP)](https://github.com/eclipse-tractusx/digital-product-pass) | digital-product-pass: [4.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-4.0.1) | [v4.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v4.0.1) |

### Known Knowns

- All not listed products and KITs have not been updated and are based on the release 24.12
  - These products were not part of the e2e testing phase
  - And are not tested with the current EDC version 0.9.0
- The Eclipse Tractus-X release does not include an Identity Wallet. The development team decided on a temporary bridging solution, based on a commercial application, to test and ship the releases 24.08, 24.12 and 25.03. Without implementing this interim solution, participants will not be able to fully utilize this release in consequence.
- For E2E Testing, the [2.2.1](https://github.com/SAP/ssi-dim-middle-layer/releases/tag/v2.2.1) of the [SSI DIM Middle Layer](https://github.com/SAP/ssi-dim-middle-layer) was used - this component is FOSS but the currently used wallet (see previous item) is not.
- BPNL Group Validation for a Policy does not allow a Collection as a rightOperand -> see [Issue](https://github.com/eclipse-tractusx/tractusx-edc/issues/1674)
- EDR token refresh implementation is inconsistent and deviates from the documentation -> see [Issue](https://github.com/eclipse-tractusx/tractusx-edc/issues/1565)
- Consumer-Asset with the same ID as a Provider-Asset Cannot Be Deleted After Contract Negotiation -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4583)
- Termination of pull transfer process from consumer side does not succeed -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4592)
- Fatal error while resume PULL transfer process -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4591)

#### EDC

- Any EDC will not work with a Hashicorp Vault version 1.18.1 as this version has a bug, incompatibilities to other versions are not known.
- Compared with the catalog from version 0.7.7, the "endpointUrl" property in a Dataset is always in namespace "dcat", a redundant property in namespace "dct" is not available anymore.

#### BDRS

- BDRS will not work with a Hashicorp Vault version 1.18.1 as this version has a bug, incompatibilities to other versions are not known.

#### Digital Product Pass

- [Digital Product Pass (DPP)](https://github.com/eclipse-tractusx/digital-product-pass) will be not part of the release

#### Knowledge Agents

- [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents) is not part of this release but was tested with the EDC release candidate 0.8.0-RC4

#### Portal

- Note for Gaia-X Clearing House Tagus upgrade (Portal v2.4.0, Eclipse Tractus-X R25.03):
  - If a company was onboarded with ELBE clearing house, the legal person self description document is not accepted when creating a connector with newer versions of the clearing house. Portal operators are advised to create new legal person and connector self description documents for all previously onboarded companies.
  - As of v2.4.0, the portal backend will activate connector without updated legal person self description document to allow for a transition phase. The connector will not have a document until reissuance for both company and connector is triggered by operators.
  - An automatic reissuance system is planned for the future.
- When registering two connectors (EDCs) under one technical user, the technical user will be duplicated and the details of the technical user will not be shown

### Runtime

- on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.29.10`
- with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15.4.0.` or more specific `15.4.0-debian-11-r45`
- the EDC version [0.9.0-rc2](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.9.0-rc2) was used for testing

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

### Using helm with central helm registry

You can search all released helm charts with the following commands:

```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```

For installation details, please see the referenced Repositories / Releases.

## [24.12] - 2024-12-02

Implemented features can be found [here](https://github.com/orgs/eclipse-tractusx/projects/26/views/33?filterQuery=milestone%3A%2224.12%22+-label%3Ametadata+is%3Aclosed++status%3ADone)

### Updated

| Component                                                                                                              | Helm Chart (s) | App-/KIT Version (s) |
|:-----------------------------------------------------------------------------------------------------------------------| :-------------: | :------------------: |
| [BPDM KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit)                                 | n/a | [7.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/changelog) |
| [Circularity KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view)                | n/a | [1.3.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-chain-kit/changelog) |
| [DCM KIT](https://eclipse-tractusx.github.io/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview) | n/a | [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/demand-and-capacity-management-kit/changelog) |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                | digital-twin-registry: [0.6.2](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.6.2) | [0.6.2](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.6.2) |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                          | discoveryfinder: [0.4.2](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.4.2) | [0.5.2](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.5.2) |
| [Discovery Service (BPN Finder)](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                               | bpndiscovery: [0.4.2](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.4.2) | [0.5.2](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.5.2) |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                       | [0.8.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.8.0) | [0.8.0](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.8.0) |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)                        | bpdm: [5.2.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-5.2.0) | [6.2.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v6.2.0) |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam)                                 | centralidp: [4.0.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-4.0.0)<br/>sharedidp: [4.0.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-4.0.0) | keycloak: [25.0.6](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-25-0-0) |
| [Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/category/industry-core-kit)                           | n/a | [1.3.0](https://eclipse-tractusx.github.io/docs-kits/kits/industry-core-kit/changelog) |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                                               | remoting-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.14.24)<br/>provisioning-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/provisioning-agent-1.14.24)<br/>conforming-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/conforming-agent-1.14.24)<br/>matchmaking-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/matchmaking-agent-1.14.24) | remoting-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>provisioning-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>conforming-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24)<br/>matchmaking-agent: [1.14.24](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.14.24) |
| [(Knowledge) Agents KIT](https://eclipse-tractusx.github.io/docs-kits/category/agents-kit)                             | n/a | [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/knowledge-agents/Knowledge%20Agent%20Changelog) |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub)                                                           | policy-hub: [1.2.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.2.0) | [1.2.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/v1.2.0) |
| [Portal](https://github.com/eclipse-tractusx/portal)                                                                   | portal: [2.3.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.3.0) | registration: [2.1.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.1.0)<br/>frontend: [2.3.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.3.0)<br/>backend: [2.3.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.3.0)<br/>assets: [2.3.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.3.0) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                                        | sdfactory: [2.1.22](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.22) | [v2.1.14](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.14) |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                                  | semantic-hub: [0.4.2](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.4.2) | [0.5.2](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.5.2) |
| [SSI Authority & Schema Registry](https://github.com/eclipse-tractusx/ssi-authority-schema-registry)                   | ssi-asr: [1.1.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/ssi-asr-1.1.0) | [1.1.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/v1.1.0) |
| [SSI Credential Issuer](https://github.com/eclipse-tractusx/ssi-credential-issuer)                                     | ssi-credential-issuer: [1.2.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/ssi-credential-issuer-1.2.0) | [1.2.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/v1.2.0) |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)                             | n/a | [6.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/traceability-kit/changelog) |

### Known Knowns

- All not listed products and KITs have not been updated and are based on the release 24.08
  - These products were not part of the e2e testing phase
  - And are not tested with the current EDC version 0.8.0
- [BPN DID Resolution Service (BDRS)](https://github.com/eclipse-tractusx/bpn-did-resolution-service) is unchanged but was part of the testing phase
- [PURIS](https://github.com/eclipse-tractusx/puris) is unchanged but regression tests were executed
- [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents) was updated to version 0.8.0 but only tested with the EDC release candidate 0.8.0-RC4
- This Tractus-X release does not include a Managed Identity Wallet (MIW). The development team decided on a temporary bridging solution, based on a commercial application, to test and ship Release 24.08. Without implementing this interim solution, participants will not be able to fully utilize this Tractus-X release in consequence.
- For E2E Testing, the [2.1.1](https://github.com/SAP/ssi-dim-middle-layer/releases/tag/v2.1.1) of the [SSI DIM Middle Layer](https://github.com/SAP/ssi-dim-middle-layer) was used - this component is FOSS but the currently used wallet (see previous item) is not.
- Security concern about exposed technical users when subscribing BPDM services over the Portal -> see  [according issue](https://github.com/eclipse-tractusx/sig-release/issues/987)
- BPNL Group Validation for a Policy does not allow a Collection as a rightOperand -> see [Issue](https://github.com/eclipse-tractusx/tractusx-edc/issues/1674)
- EDR token refresh implementation is inconsistent and deviates from the documentation -> see [Issue](https://github.com/eclipse-tractusx/tractusx-edc/issues/1565)
- Consumer-Asset with the same ID as a Provider-Asset Cannot Be Deleted After Contract Negotiation -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4583)
- Termination of pull transfer process from consumer side does not succeed -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4592)
- Fatal error while resume PULL transfer process -> see [Issue](https://github.com/eclipse-edc/Connector/issues/4591)

### Runtime

The release has been tested

- on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.28.9`
- with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15.2.1.`

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

### Using helm with central helm registry

You can search all released helm charts with the following commands:

```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```

For installation details, please see the referenced Repositories / Releases.

## [24.08] - 2024-08-05

### Added

| Component                                                                                                                                    | Helm Chart (s) | App-/KIT Version (s) |
|:---------------------------------------------------------------------------------------------------------------------------------------------| :-------------: | :------------------: |
| [Knowledge Agents AAS Bridge](https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge)                                               | aas-bridge: [1.13.7](https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge/releases/tag/aas-bridge-1.13.7) | [1.13.7](https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge/releases/tag/v1.13.7) |
| [Supply Chain Disruption Notifications KIT](https://eclipse-tractusx.github.io/docs-kits/category/supply-chain-disruption-notifications-kit) | n/a | [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/Supply%20Chain%20Disruption%20Notifications%20KIT/Supply%20Chain%20Disruption%20Notifications%20Changelog) |
| [SSI Authority & Schema Registry](https://github.com/eclipse-tractusx/ssi-authority-schema-registry)                                         | ssi-asr: [1.0.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/ssi-asr-1.0.0) | [1.0.0](https://github.com/eclipse-tractusx/ssi-authority-schema-registry/releases/tag/v1.0.0) |

### Updated

| Component                                                                                                | Helm Chart (s) | App-/KIT Version (s) |
|:---------------------------------------------------------------------------------------------------------| :-------------: | :------------------: |
| [BPDM KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit)                   | n/a | [6.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/changelog) |
| [BPN DID Resolution Service (BDRS)](https://github.com/eclipse-tractusx/bpn-did-resolution-service)      | bdrs: [0.5.2](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.2) | [0.5.2](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.5.2) |
| [Circularity KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view)  | n/a | [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-chain-kit/changelog) |
| [DCM KIT](https://eclipse-tractusx.github.io/docs-kits/kits/DCM-Kit/adoption-view/overview)              | n/a | [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/DCM-Kit/changelog) |
| [Digital Product Pass (DPP)](https://github.com/eclipse-tractusx/digital-product-pass)                   | digital-product-pass: [4.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-4.0.1) | [v4.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v4.0.1) |
| [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)               | n/a | [2.0.1](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/changelog) |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                  | digital-twin-registry: [0.5.2](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.5.2) | [v0.5.0](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.5.0) |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                            | discoveryfinder: [0.3.1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.3.1) | [v0.4.0](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.4.0) |
| [Discovery Service (BPN Finder)](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                 | bpndiscovery: [0.3.1](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.3.1) | [v0.4.0](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.4.0) |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc)         | tractusx-connector: [0.7.3](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.7.3) | [0.7.3](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.7.3) |
| [EcoPass KIT](https://eclipse-tractusx.github.io/docs-kits/category/eco-pass-kit)                        | n/a | [1.5.0](https://eclipse-tractusx.github.io/docs-kits/kits/Eco_Pass_KIT/changelog) |
| [ESS KIT](https://eclipse-tractusx.github.io/docs-kits/category/ess-kit)                                 | n/a | [0.3.0](https://eclipse-tractusx.github.io/docs-kits/kits/ESS-Kit/ESS%20Kit%20Changelog) |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)          | bpdm: [5.1.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-5.1.0) | [v6.1.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v6.1.0) |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam)                   | centralidp: [3.0.1](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-3.0.1)<br/>sharedidp: [3.0.1](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-3.0.1) | keycloak: [23.0.7](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-23-0-7) |
| [Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/category/industry-core-kit)             | n/a | [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/industry-core-kit/changelog) |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)         | item-relationship-service: [7.4.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/item-relationship-service-7.4.0) | [5.4.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/5.4.0) |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                                 | remoting-agent: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.13.22)<br/>provisioning-agent: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/provisioning-agent-1.13.22)<br/>conforming-agent: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/conforming-agent-1.13.22)<br/>matchmaking-agent: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/matchmaking-agent-1.13.22) | [v1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.13.22)<br/>matchmaking-agent: [v1.13.22](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.13.22) |
| [Knowledge Agents EDC](https://github.com/eclipse-tractusx/knowledge-agents-edc)                         | agent-plane: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents-edc/releases/tag/agent-plane-1.13.22)<br/>agent-plane-azure-vault: [1.13.22](https://github.com/eclipse-tractusx/knowledge-agents-edc/releases/tag/agent-plane-azure-vault-1.13.22) | [v1.13.22](https://github.com/eclipse-tractusx/knowledge-agents-edc/releases/tag/v1.13.22) |
| [Managed Service Orchestrator](https://github.com/eclipse-tractusx/managed-service-orchestrator)         | managed-service-orchestrator: [1.6.0](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/managed-service-orchestrator-1.6.0) | [v1.5.7](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/v1.5.7) |
| [Managed Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/managed-simple-data-exchanger) | sde: [0.1.12](https://github.com/eclipse-tractusx/managed-simple-data-exchanger/releases/tag/sde-0.1.12) | frontend: [v2.4.3](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend/releases/tag/v2.4.3)<br/>backend: [v2.4.3](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend/releases/tag/v2.4.3) |
| [PCF Exchange KIT](https://eclipse-tractusx.github.io/docs-kits/category/pcf-exchange-kit)               | n/a | [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/changelog) |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub)                                             | policy-hub: [1.1.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.1.0) | [v1.1.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/v1.1.0) |
| [Portal](https://github.com/eclipse-tractusx/portal)                                                     | portal: [2.1.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.1.0) | registration: [v2.0.1](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.0.1)<br/>frontend: [v2.1.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.1.0)<br/>backend: [v2.1.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.1.0)<br/>assets: [v2.1.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.1.0) |
| [PURIS](https://github.com/eclipse-tractusx/puris)                                                       | puris: [2.7.0](https://github.com/eclipse-tractusx/puris/releases/tag/puris-2.7.0) | [2.1.0](https://github.com/eclipse-tractusx/puris/releases/tag/2.1.0) |
| [PURIS KIT](https://eclipse-tractusx.github.io/docs-kits/category/puris-kit)                             | n/a | [0.3.0](https://eclipse-tractusx.github.io/docs-kits/kits/puris-kit/PURIS%20Kit%20Changelog) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                          | sdfactory: [2.1.21](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.21) | [v2.1.13](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.13) |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                    | semantic-hub: [0.3.1](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.3.1) | [v0.4.0](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.4.0) |
| [SSI Credential Issuer](https://github.com/eclipse-tractusx/ssi-credential-issuer)                       | ssi-credential-issuer: [1.1.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/ssi-credential-issuer-1.1.0) | [v1.1.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/v1.1.0) |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)                | traceability-foss: [1.3.43](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.43) | [13.0.1](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/13.0.1) |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)               | n/a | [5.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/traceability-kit/changelog) |
| [OSIM KIT](https://eclipse-tractusx.github.io/docs-kits/category/osim-kit)                               | n/a | [3.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/online-simulation-kit/changelog) |

### Unchanged, untested

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk) | country-risk: [4.0.2](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/country-risk-4.0.2) | [1.3.1](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/v1.3.1) |

### Incompatible

| Component | Helm Chart (s) | App-/KIT Version (s) |
| :-------- | :-------------: | :------------------: |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallet)     | managed-identity-wallet: [0.5.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.5.0) | [v0.5.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.5.0) |

### Known Knowns

:::note
For known knowns of unchanged/untested components, please refer to previous changelog(s)
:::

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10
- Connection to an external Clearing House service for the entire Catena-X ecosystem is required. The Gaia-X compliance service should generally be capable of recognizing all companies that are able to register with the Catena-X Portal.
- This Tractus-X release does not include a Managed Identity Wallet (MIW). The development team decided on a temporary bridging solution, based on a commercial application, to test and ship Release 24.08. Without implementing this interim solution, participants will not be able to fully utilize this Tractus-X release in consequence.
- For E2E Testing, the [1.2.0](https://github.com/SAP/ssi-dim-middle-layer/releases/tag/v1.2.0) of the [SSI DIM Middle Layer](https://github.com/SAP/ssi-dim-middle-layer) was used - this component is FOSS but the currently used wallet (see previous item) is not.
- Documentation content (e.g. architecture, manuals etc) and folder structure have not explicitly been checked for this Release, as relevant TRGs are not yet in force. The vast majority of components are evolutions of previous Releases, with a thorough review undergone. This leads to a high confidence in the quality of existing documentation within the product repositories.
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations
- Listed components in "Unchanged, untested" category were not verified in combination with the current release package and are only compatible with Catena-X standards as specified. Use at your own risk at this time.
- Listed components in "Incompatible" category are not compatible with the current release package and the latest standards.
- BPDM has some Known Knowns regarding Portal integration listed in detail [here](https://github.com/eclipse-tractusx/bpdm/blob/release/6.1.x/docs/architecture/11_Risks_And_Technical_Debts.md)
- BPDM standard configuration not compatible with Portal's Central-IDP configuration
- Portal's Partner Network page does not currently show business partner member data due to an authorization issue
- Currently not possible to add company's site and address business partners over the Portal due to authorization issue
- Security concern about exposed technical users when subscribing BPDM services over the Portal
- DTR introduces the DTR-EDC Access Control extension. The goal of this EDC extension is to enforce authorized access to submodel implementations according to AAS and Catena-X concluded contracts. It is a Maven artifact that can be used for building their own EDC dataplane image with the extension. For more details, see  [here](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/tree/main/libraries/edc-extension).

### Runtime

The release has been tested

- on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.28.9`
- with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15`

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

### Using helm with central helm registry

You can search all released helm charts with the following commands:

```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```

For installation details, please see the referenced Repositories / Releases.

## [24.05] - 2024-05-29

### Added

| Component                                                                                                |                                                           Helm Chart (s)                                                           |                                      App-/KIT Version (s)                                      |
|:---------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|
| [Behaviour Twin KIT](https://eclipse-tractusx.github.io/docs-kits/next/kits/behaviour-twin-kit/overview) |                                                                n/a                                                                 |  [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/behaviour-twin-kit/changelog)  |
| [BPN DID Resolution Service (BDRS)](https://github.com/eclipse-tractusx/bpn-did-resolution-service)      |                  bdrs: [0.0.4](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.0.4)                  |   [0.0.4](https://github.com/eclipse-tractusx/bpn-did-resolution-service/releases/tag/0.0.4)   |
| [PURIS KIT](https://eclipse-tractusx.github.io/docs-kits/category/puris-kit)                             |                                                                n/a                                                                 | [0.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/puris-kit/PURIS%20Kit%20Changelog) |
| [SSI Credential Issuer](https://github.com/eclipse-tractusx/ssi-credential-issuer)                       | ssi-credential-issuer: [1.0.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/ssi-credential-issuer-1.0.0) |     [1.0.0](https://github.com/eclipse-tractusx/ssi-credential-issuer/releases/tag/v1.0.0)     |

### Updated

| Component                                                                                                                                                         |                                                                                             Helm Chart (s)                                                                                             |                                                                                                                                                                                          App-/KIT Version (s)                                                                                                                                                                                          |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Behavioral Twin: Model and Data processing (MDP) KIT](https://eclipse-tractusx.github.io/docs-kits/category/model-based-development-and-data-processing-mdp-kit) |                                                                                                  n/a                                                                                                   |                                                                                                                                                 [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/behaviour-twin-kit/changelog)                                                                                                                                                 |
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit)                                                                |                                                                                                  n/a                                                                                                   |                                                                                                                                                     [5.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/changelog)                                                                                                                                                      |
| [Circularity KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view)                                                           |                                                                                                  n/a                                                                                                   |                                                                                                                                                [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/Changelog%20Circularity%20KIT)                                                                                                                                                |
| [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)                                                                              |                                                                                                  n/a                                                                                                   |                                                                                                                                                       [2.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/changelog)                                                                                                                                                        |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk)                                                                                              |                                              country-risk: [4.0.2](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/country-risk-4.0.2)                                               |                                                                                                                                                           [v2.0.0](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/v2.0.0)                                                                                                                                                           |
| [Data Chain KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-chain-kit)                                                                            |                                                                                                  n/a                                                                                                   |                                                                                                                                              [3.0.1](https://eclipse-tractusx.github.io/docs-kits/kits/data-chain-kit/changelog)                                                                                                                                              |
| [Demand and Capacity Management (DCM) KIT](https://eclipse-tractusx.github.io/docs-kits/category/dcm-kit)                                                         |                                                                                                  n/a                                                                                                   |                                                                                                                                                              [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/DCM-Kit/changelog)                                                                                                                                                              |
| [Digital Product Pass (DPP)](https://github.com/eclipse-tractusx/digital-product-pass)                                                                            |                                    digital-product-pass: [3.0.0](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-3.0.0)                                     |                                                                                                                                                         [v3.0.0](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v3.0.0)                                                                                                                                                         |
| [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)                                                                        |                                                                                                  n/a                                                                                                   |                                                                                                                                            [2.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/changelog)                                                                                                                                            |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                                                           |                               digital-twin-registry: [0.4.11](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.4.11)                                |                                                                                                                                                      [v0.4.3](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.4.3)                                                                                                                                                      |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                                                     |                                         discoveryfinder: [0.2.5](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.2.5)                                         |                                                                                                                                                        [v0.3.1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.3.1)                                                                                                                                                         |
| [Discovery Service (BPN Finder)](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                          |                                             bpndiscovery: [0.2.6](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.2.6)                                              |                                                                                                                                                          [0.3.1](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.3.1)                                                                                                                                                           |
| [Eclipse Data Space Connector (Tractus-X EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                                                                  |                                                    tractusx-connector: [0.7.1](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.7.1)                                                    |                                                                                                                                                              [0.7.1](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.7.1)                                                                                                                                                              |
| [Eco Pass KIT](https://eclipse-tractusx.github.io/docs-kits/category/eco-pass-kit)                                                                                |                                                                                                  n/a                                                                                                   |                                                                                                                                                           [1.4.0](https://eclipse-tractusx.github.io/docs-kits/kits/Eco_Pass_KIT/changelog)                                                                                                                                                            |
| [Environmental and Social Standards (ESS) KIT](https://eclipse-tractusx.github.io/docs-kits/category/ess-kit)                                                     |                                                                                                  n/a                                                                                                   |                                                                                                                                                        [0.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/ESS-Kit/ESS%20Kit%20Changelog)                                                                                                                                                        |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)                                                                   |                                                            bpdm: [5.0.1](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-5.0.1)                                                             |                                                                                                                                                                 [v6.0.1](https://github.com/eclipse-tractusx/bpdm/releases/tag/v6.0.1)                                                                                                                                                                 |
| [Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/category/industry-core-kit)                                                                      |                                                                                                  n/a                                                                                                   |                                                                                                                                           [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/industry-core-kit/changelog)                                                                                                                                           |
| [Identity and Access Management (IAM)](https://github.com/eclipse-tractusx/portal-iam)                                                                            | centralidp: [3.0.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/centralidp-3.0.0) <br/>sharedidp: [3.0.0](https://github.com/eclipse-tractusx/portal-iam/releases/tag/sharedidp-3.0.0) |                                                                                                                                                   keycloak: [v23.0.7](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-23-0-7)                                                                                                                                                   |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)                                                                  |                          item-relationship-service: [7.1.3](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/item-relationship-service-7.1.3)                           |                                                                                                                                                       [5.1.3](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/5.1.3)                                                                                                                                                        |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                                                                                          |                                          remoting-agent: [1.12.19](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.12.19)                                           |                                                                                                                                                         [1.12.19](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.12.19)                                                                                                                                                          |
| [(Knowledge) Agents KIT](https://eclipse-tractusx.github.io/docs-kits/category/agents-kit)                                                                        |                                                                                                  n/a                                                                                                   |                                                                                                                                               [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/knowledge-agents/Knowledge%20Agent%20Changelog)                                                                                                                                                |
| [Managed Service Orchestrator](https://github.com/eclipse-tractusx/managed-service-orchestrator)                                                                  |                        managed-service-orchestrator: [1.5.9](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/managed-service-orchestrator-1.5.9)                         |                                                                                                                                                     [v1.5.6](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/v1.5.6)                                                                                                                                                     |
| [Manufacturing as a Service (MaaS) KIT](https://eclipse-tractusx.github.io/docs-kits/category/manufacturing-as-a-service-kit)                                     |                                                                                                  n/a                                                                                                   |                                                                                                                          [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/manufacturing-as-a-service-kit/Manufacturing%20as%20a%20Service%20KIT%20Changelog)                                                                                                                          |
| [Modular Production KIT](https://eclipse-tractusx.github.io/docs-kits/category/modular-production-kit)                                                            |                                                                                                  n/a                                                                                                   |                                                                                                                                      [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/modular-production-kit/changelog)                                                                                                                                      |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub)                                                                                                      |                                                   policy-hub: [1.0.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.0.0)                                                    |                                                                                                                                                         [1.0.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-1.0.0)                                                                                                                                                          |
| [Portal](https://github.com/eclipse-tractusx/portal)                                                                                                              |                                                         portal: [2.0.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-2.0.0)                                                          | Registration: [v2.0.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v2.0.0)<br/>Frontend: [v2.0.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v2.0.0)<br/>Backend: [v2.0.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v2.0.0)<br/>Assets: [v2.0.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v2.0.0) |
| [PCF Exchange KIT](https://eclipse-tractusx.github.io/docs-kits/category/pcf-exchange-kit)                                                                        |                                                                                                  n/a                                                                                                   |                                                                                                                                            [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/changelog)                                                                                                                                            |
| [PURIS](https://github.com/eclipse-tractusx/puris)                                                                                                                |                                                           puris: [2.6.2](https://github.com/eclipse-tractusx/puris/releases/tag/puris-2.6.2)                                                           |                                                                                                                                                                 [2.0.1](https://github.com/eclipse-tractusx/puris/releases/tag/2.0.1)                                                                                                                                                                  |
| [Quality KIT](https://eclipse-tractusx.github.io/docs-kits/category/quality-kit)                                                                                  |                                                                                                  n/a                                                                                                   |                                                                                                                                                    [1.2.1](https://eclipse-tractusx.github.io/docs-kits/kits/data-driven-quality-management-kit/changelog)                                                                                                                                                    |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                                                                                   |                                                   sdfactory: [2.1.19](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.19)                                                    |                                                                                                                                                             [v2.1.12](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.12)                                                                                                                                                             |
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/managed-simple-data-exchanger)                                                                  |                                                 sde: [0.1.9](https://github.com/eclipse-tractusx/managed-simple-data-exchanger/releases/tag/sde-0.1.9)                                                 |                                                                                Frontend: [v2.4.1](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend/releases/tag/v2.4.1)<br/>Backend: [v2.4.1](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend/releases/tag/v2.4.1)                                                                                 |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                                                                             |                                              semantic-hub: [0.2.3](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.2.3)                                              |                                                                                                                                                          [v0.3.2](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.3.2)                                                                                                                                                           |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)                                                                         |                                           traceability-foss: [1.3.38](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.38)                                           |                                                                                                                                                          [11.0.1](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/11.0.1)                                                                                                                                                           |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)                                                                        |                                                                                                  n/a                                                                                                   |                                                                                                                                              [5.0.1](https://eclipse-tractusx.github.io/docs-kits/kits/traceability-kit/changelog)                                                                                                                                              |


### Unchanged, untested

| Component                                                                                        |                                                  Helm Chart (s)                                                   |                                                  App-/KIT Version (s)                                                  |
|--------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------:|
| [Data Governance KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-governance-kit) |                                                        n/a                                                        | [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Data%20Governance%20Kit/Data%20Governance%20Kit%20Changelog) |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallet)     | managed-identity-wallet: [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0) |                [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0)                |
| [OSim KIT](https://eclipse-tractusx.github.io/docs-kits/category/osim-kit)                       |                                                        n/a                                                        |              [2.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/online-simulation-kit/changelog)              |

### Removed

| Component                                        | Helm Chart (s) | App-/KIT Version (s) |
|--------------------------------------------------|:--------------:|:--------------------:|
| Behavioral Twin: Health Indicators (HI) KIT      |      n/a       |        0.1.1         |
| Behavioral Twin: Remaining useful Life (RUL) KIT |      n/a       |        0.1.1         |
| Certificate Management KIT                       |      n/a       |        0.1.0         |

### Known Knowns

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10
- Connection to an external Clearing House service for the entire Catena-X ecosystem is required. The Gaia-X compliance service should generally be capable of recognizing all companies that are able to register with the Catena-X Portal.
Conformity to [Asset Administration Shell (AAS) API v3.0](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf) and bugfix v3.0.1 is given. Fine granular access control introduced for optional use.
- This Tractus-X release does not include a Managed Identity Wallet (MIW). The development team decided on a temporary bridging solution, based on a commercial application, to test and ship Release 24.05. Without implementing this interim solution, participants will not be able to fully utilize this Tractus-X release in consequence. An updated and validated version of MIW is expected in Release 24.08.
- The Tractus-X EDC has undergone significant changes in its Management API, communication with external services and internal APIs.
- Documentation content (e.g. architecture, manuals etc) and folder structure have not explicitly been checked for this Release, as relevant TRGs are not yet in force. The vast majority of components are evolutions of previous Releases, with a thorough review undergone. This leads to a high confidence in the quality of existing documentation within the product repositories.
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations
- Listed components in "Unchanged, untested" category were not verified in combination with the current Release package and are only compatible with Catena-X Standards as specified. Use at your own risk at this time.

### Runtime

The release has been tested

- on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.27.3`
- with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15`

Note: Tractus-X EDC has been tested on both Postgresql versions: 15.x and 16.x

The following violations of TRG 5.07 apply:

- Golden Record Business Partner Number (BPN) Service operates on Postgresql version 16.x (not 15), but has been successfully tested for the current Release
- Country Risk deploys a Postgresql version 15 per helm chart. Yet, the test has been successfully performed on version 14.x.

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.


## [24.03] - 2024-03-08

### Added

| Component                                                                                                                     |                                   Helm Chart (s)                                   |                                                                 App-/KIT Version (s)                                                                 |
|:------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Certificate Management KIT](https://eclipse-tractusx.github.io/docs-kits/category/certificate-management-kit)                |                                        n/a                                         |                         [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Certificate%20Management%20Kit/Changelog)                          |
| [Data Governance KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-governance-kit)                              |                                        n/a                                         |                [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Data%20Governance%20Kit/Data%20Governance%20Kit%20Changelog)                |                                                                                                                                                                                                                                                                                                                                                                                                              |
| [Environmental and Social Standards (ESS) KIT](https://eclipse-tractusx.github.io/docs-kits/category/ess-kit)                 |                                        n/a                                         |                               [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/ESS-Kit/ESS%20Kit%20Changelog)                               |
| [Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/category/industry-core-kit)                                  |                                        n/a                                         |                  [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/industry-core-kit/changelog)                  |
| [Manufacturing as a Service (MaaS) KIT](https://eclipse-tractusx.github.io/docs-kits/category/manufacturing-as-a-service-kit) |                                        n/a                                         | [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/manufacturing-as-a-service-kit/Manufacturing%20as%20a%20Service%20KIT%20Changelog) |
| [PURIS](https://github.com/eclipse-tractusx/puris)                                                                            | puris: [1.0.0](https://github.com/eclipse-tractusx/puris/releases/tag/puris-1.0.0) |                                        [1.0.0](https://github.com/eclipse-tractusx/puris/releases/tag/1.0.0)                                         |


### Updated


| Component                                                                                                    |                                                                     Helm Chart (s)                                                                      |                                                                                                                                                                                             App-/KIT Version (s)                                                                                                                                                                                             |
|--------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit)           |                                                                           n/a                                                                           |                                                                                                                                                        [4.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/changelog)                                                                                                                                                         |
| [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)                         |                                                                           n/a                                                                           |                                                                                                                                            [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view)                                                                                                                                            |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk)                                         |                      country-risk: [3.0.11](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/country-risk-3.0.11)                      |                                                                                                    Frontend: [v1.3.1](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/v1.3.1)<br/> Backend: [v1.3.1](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/v1.3.1)                                                                                                     |
| [Demand and Capacity Management (DCM) KIT](https://eclipse-tractusx.github.io/docs-kits/category/dcm-kit)    |                                                                           n/a                                                                           |                                                                                                                                                                 [0.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/DCM-Kit/changelog)                                                                                                                                                                 |
| [Digital Product Pass (DPP)](https://github.com/eclipse-tractusx/digital-product-pass)                       |             digital-product-pass: [2.1.4](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-2.1.4)             |                                                                                                                                                            [v2.1.3](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v2.1.3)                                                                                                                                                            |
| [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)                   |                                                                           n/a                                                                           |                                                                                                                                               [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/changelog)                                                                                                                                               |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                      |        digital-twin-registry: [0.3.31](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/digital-twin-registry-0.3.31)        |                                                                                                                                                        [v0.3.23](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.3.23)                                                                                                                                                        |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                |                discoveryfinder: [0.1.18](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.1.18)                 |                                                                                                                                                           [v0.2.7](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.2.7)                                                                                                                                                            |
| [Discovery Service (BPN Finder)](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                     |                     bpndiscovery: [0.1.18](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.1.18)                     |                                                                                                                                                             [0.2.8](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.2.8)                                                                                                                                                              |
| [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                       |                            tractusx-connector: [0.5.4](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.5.4)                             |                                                                                                                                                                 [0.5.4](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.5.4)                                                                                                                                                                 |
| [Eco Pass KIT](https://eclipse-tractusx.github.io/docs-kits/category/eco-pass-kit)                           |                                                                           n/a                                                                           |                                                                                                                                                              [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/Eco_Pass_KIT/changelog)                                                                                                                                                               |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)              |                                     bpdm: [4.0.2](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-4.0.2)                                     |                                                                                                                                                                    [v5.0.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v5.0.0)                                                                                                                                                                    |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)             |                     irs-helm: [6.14.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-6.14.1)                      |                                                                                                                                                          [4.5.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/4.5.1)                                                                                                                                                           |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                                     |                   remoting-agent: [1.11.16](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.11.16)                   |                                                                                                                                                            [1.11.16](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.11.16)                                                                                                                                                             |
| [Knowledge Agents KIT](https://eclipse-tractusx.github.io/docs-kits/category/agents-kit)                     |                                                                           n/a                                                                           |                                                                                                                                                  [1.0.1](https://eclipse-tractusx.github.io/docs-kits/kits/knowledge-agents/Knowledge%20Agent%20Changelog)                                                                                                                                                   |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallet)                 |                    managed-identity-wallet: [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0)                    |                                                                                                                                                           [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0)                                                                                                                                                           |
| [Managed Service Orchestrator](https://github.com/eclipse-tractusx/managed-service-orchestrator)             | managed-service-orchestrator: [1.5.4](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/managed-service-orchestrator-1.5.4) |                                                                                                                                                        [v1.5.4](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/v1.5.4)                                                                                                                                                        |
| [OSim KIT](https://eclipse-tractusx.github.io/docs-kits/category/osim-kit)                                   |                                                                           n/a                                                                           |                                                                                                                                                         [2.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/online-simulation-kit/changelog)                                                                                                                                                         |
| [Policy Hub](https://github.com/eclipse-tractusx/policy-hub)                                                 |                            policy-hub: [0.1.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-0.1.0)                            |                                                                                                                                                            [0.1.0](https://github.com/eclipse-tractusx/policy-hub/releases/tag/policy-hub-0.1.0)                                                                                                                                                             |
| [Portal](https://github.com/eclipse-tractusx/portal)                                                         |                                  portal: [1.8.0](https://github.com/eclipse-tractusx/portal/releases/tag/portal-1.8.0)                                  | Registration: [v1.6.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v1.6.0)<br/><br/>Frontend: [v1.8.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v1.8.0)<br/>Backend: [v1.8.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v1.8.0)<br/> Assets: [v1.8.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v1.8.0) |
| [Product Carbon Footprint (PCF) KIT](https://eclipse-tractusx.github.io/docs-kits/category/pcf-exchange-kit) |                                                                           n/a                                                                           |                                                                                                                                               [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/changelog)                                                                                                                                               |
| [Quality KIT](https://eclipse-tractusx.github.io/docs-kits/category/quality-kit)                             |                                                                           n/a                                                                           |                                                                                                                                                       [1.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-driven-quality-management-kit/changelog)                                                                                                                                                       |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                              |                            sdfactory: [2.1.12](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.12)                            |                                                                                                                                                                [v2.1.10](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.10)                                                                                                                                                                |
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/managed-simple-data-exchanger)             |                         sde: [0.1.5](https://github.com/eclipse-tractusx/managed-simple-data-exchanger/releases/tag/sde-0.1.5)                          |                                                                                   Frontend: [v2.3.6](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend/releases/tag/v2.3.6)<br/>Backend: [v2.3.6](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend/releases/tag/v2.3.6)                                                                                    |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                        |                     semantic-hub: [0.1.35](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.1.35)                      |                                                                                                                                                            [v0.2.16](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.2.16)                                                                                                                                                             |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)                    |                             [1.3.28](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.28)                             |                                                                                                                                                             [10.3.0](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/10.3.0)                                                                                                                                                              |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)                   |                                                                           n/a                                                                           |                                                                                                                                                 [4.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/traceability-kit/changelog)                                                                                                                                                 |


### Unchanged, untested

| Component                                                                                                                                                         |                                                 Helm Chart (s)                                                  |                                                                      App-/KIT Version (s)                                                                       |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Behavioral Twin: Health Indicators (HI) KIT](https://eclipse-tractusx.github.io/docs-kits/category/health-indicator-hi-kit)                                      |                                                       n/a                                                       |                   [0.1.1](https://eclipse-tractusx.github.io/docs-kits/kits/Behaviour-twin-kit/Changelog%20Health%20Indicator%20Kit)                   |
| [Behavioral Twin: Model and Data processing (MDP) KIT](https://eclipse-tractusx.github.io/docs-kits/category/model-based-development-and-data-processing-mdp-kit) |                                                       n/a                                                       | [0.1.1](https://eclipse-tractusx.github.io/docs-kits/kits/behaviour-twin-kit/Changelog%20Model%20Based%20Development%20and%20Data%20Processing%20Kit) |
| [Behavioral Twin: Remaining useful Life (RUL) KIT](https://eclipse-tractusx.github.io/docs-kits/category/remaining-useful-life-rul-kit)                           |                                                       n/a                                                       |               [0.1.1](https://eclipse-tractusx.github.io/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Changelog%20Remaining%20Useful%20Life%20Kit)               |
| [Circularity KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view)                                                           |                                                       n/a                                                       |                            [0.2.0](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/Changelog%20Circularity%20KIT)                             |
| [Modular Production KIT](https://eclipse-tractusx.github.io/docs-kits/category/modular-production-kit)                                                            |                                                       n/a                                                       |                  [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/modular-production-kit/changelog)                   |



### Known knowns

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10
- Connection to an external Clearing House service for the entire Catena-X ecosystem is required. The Gaia-X compliance service should generally be capable of recognizing all companies that are able to register with the Catena-X Portal.
- Conformity to [Asset Administration Shell v3.0](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf), [API live example](https://app.swaggerhub.com/apis/Plattform_i40/AssetAdministrationShellRegistryServiceSpecification/V3.0_SSP-001#/Asset%20Administration%20Shell%20Registry%20API/GetAssetAdministrationShellDescriptorById) (AAS) is given. The DTR “/query” interface is finally deprecated and no longer available with this Release as announced. Details can be found in the [changelog](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/CHANGELOG.md) of the respective component.

- EDC provides no new release compared to 23.12 but only patches: EDC version 0.5.4 is part of 24.03 with the following limitations:
  Standard Security Tests have been performed, but it is strongly recommended for each EDC operator to apply own security measures. Especially the Dynamic Application Security Testing (DAST) needs to be executed for each specific operation environment and instance.
  Tractus-X release guidelines (TRGs) have been fulfilled.

- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations

- Listed components in "Unchanged, untested" category were not verified in combination with the current Release package and are only compatible with Catena-X Standards as specified. Use at your own risk at this time.

### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.27.3`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15`
  - Three exceptions apply for
    - Golden Record Business Partner Number (BPN) Service
    - Managed Identity Wallet (MIW)
    - Managed Service Orchestrator (MSO)

    Those components violate TRG 5.07 as they still operate on Postgresql DB Version 14.x (not 15), but have been successfully tested for the current Release.

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.



## [23.12] - 2023-12-08

### Added

| Component                                                                                                                                                         | Helm Chart (s) |                                                                          App-/KIT Version (s)                                                                          |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Behavioral Twin: Health Indicators (HI) KIT](https://eclipse-tractusx.github.io/docs-kits/category/health-indicator-hi-kit)                                      |      n/a       |                   [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/behaviour-twin-kit/adoption-view%20Health%20Indicator%20Kit)                    |
| [Behavioral Twin: Model and Data processing (MDP) KIT](https://eclipse-tractusx.github.io/docs-kits/category/model-based-development-and-data-processing-mdp-kit) |      n/a       | [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/behaviour-twin-kit/adoption-view%20Model%20Based%20Development%20and%20Data%20Processing%20Kit/) |
| [Circularity KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view)                                                           |      n/a       |                                     [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Circularity_KIT/page-adoption-view/)                                     |
| [Demand and Capacity Management (DCM) KIT](https://eclipse-tractusx.github.io/docs-kits/3.1.0/category/dcm-kit)                                                   |      n/a       |                                       [3.1.0](https://eclipse-tractusx.github.io/docs-kits/3.1.0/kits/DCM%20Kit/adoption-view/)                                        |
| [Knowledge Agent KIT](https://eclipse-tractusx.github.io/docs-kits/category/agents-kit)                                                                           |      n/a       |                                    [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/knowledge-agents/adoption-view/intro)                                     |
| [Modular Production KIT](https://eclipse-tractusx.github.io/docs-kits/category/modular-production-kit)                                                            |      n/a       |                  [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/modular-production-kit/adoption-view%20Modular%20Production%20Kit/)                   |



### Changed

| Component                                                                                          |                                                                     Helm Chart (s)                                                                      |                                                                                                                                                                                             App-/KIT Version (s)                                                                                                                                                                                             |
|----------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [BPN Discovery](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                            |                     bpndiscovery: [0.1.12](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.1.12)                     |                                                                                                                                                             [0.2.6](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.2.6)                                                                                                                                                              |
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit) |                                                                           n/a                                                                           |                                                                                                                                                     [3.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/adoption-view/)                                                                                                                                                     |
| [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)               |                                                                           n/a                                                                           |                                                                                                                                                              [0.6.0](https://eclipse-tractusx.github.io/docs-kits/kits/tractusx-edc/CHANGELOG/)                                                                                                                                                              |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk)                               |                       country-risk: [3.0.6](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/country-risk-3.0.6)                       |                                                                                                    Frontend: [v1.3.0](https://github.com/eclipse-tractusx/vas-country-risk/releases/tag/v1.3.0)<br/> Backend: [v1.2.3](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/v1.2.3)                                                                                                     |
| [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)         |                                                                           n/a                                                                           |                                                                                                                                               [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/changelog)                                                                                                                                               |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)            |                     registry: [0.3.19](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/registry-0.3.19)                     |                                                                                                                                                        [v0.3.19](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.3.19)                                                                                                                                                        |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)    |                                     bpdm: [3.1.2](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-3.1.2)                                     |                                                                                                                                                                    [v4.1.0](https://github.com/eclipse-tractusx/bpdm/releases/tag/v4.1.0)                                                                                                                                                                    |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)   |                      irs-helm: [6.9.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-6.9.1)                       |                                                                                                                                                          [4.0.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/4.0.1)                                                                                                                                                           |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                           |                   remoting-agent: [1.10.15](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.10.15)                   |                                                                                                                                                            [1.10.15](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.10.15)                                                                                                                                                             |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallet)       |                    managed-identity-wallet: [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0)                    |                                                                                                                                                           [0.3.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.3.0)                                                                                                                                                           |
| [Managed Service Orchestrator](https://github.com/eclipse-tractusx/managed-service-orchestrator)   | managed-service-orchestrator: [1.5.1](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/managed-service-orchestrator-1.5.1) |                                                                                                                                                        [v1.5.1](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/v1.5.1)                                                                                                                                                        |
| [Portal](https://github.com/eclipse-tractusx/portal-cd)                                            |                                portal: [1.7.0](https://github.com/eclipse-tractusx/portal-cd/releases/tag/portal-1.7.0)                                 | Registration: [v1.5.4](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v1.5.4)<br/><br/>Frontend: [v1.7.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v1.7.0)<br/>Backend: [v1.7.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v1.7.0)<br/> Assets: [v1.7.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v1.7.0) |
| [Quality KIT](https://eclipse-tractusx.github.io/docs-kits/category/quality-kit)                   |                                                                           n/a                                                                           |                                                                                                                                                    [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-driven-quality-management-kit/adoption-viewt)                                                                                                                                                    |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                    |                             sdfactory: [2.1.8](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.8)                             |                                                                                                                                                                 [v2.1.7](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.7)                                                                                                                                                                 |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                              |                     semantic-hub: [0.1.31](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.1.31)                      |                                                                                                                                                            [v0.2.14](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.2.14)                                                                                                                                                             |
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/managed-simple-data-exchanger)   |                         sde: [0.1.3](https://github.com/eclipse-tractusx/managed-simple-data-exchanger/releases/tag/sde-0.1.3)                          |                                                                                   Frontend: [v2.3.3](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend/releases/tag/v2.3.3)<br/>Backend: [v2.3.3](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend/releases/tag/v2.3.3)                                                                                    |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)          |                             [1.3.20](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.20)                             |                                                                                                                                                              [9.0.0](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/9.0.0)                                                                                                                                                               |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)         |                                                                           n/a                                                                           |                                                                                                                                             [3.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/traceability-kit/adoption-view/)                                                                                                                                              |



### Unchanged, untested
All components listed here have not seen any update since their previous Release. No specific regression tests executed.

| Component                                                                                                                               |                                                          Helm Chart (s)                                                          |                                                        App-/KIT Version (s)                                                         |
|-----------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| [Data Chain KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-chain-kit)                                                  |                                                               n/a                                                                |            [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-chain-kit/changelog)             |
| [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass)                                                        | digital-product-pass: [v1.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-1.0.1) |                       [v1.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v1.0.1)                        |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                           |     discoveryfinder: [0.1.11](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.1.11)     |                    [v0.2.4-M1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.2.4-M1)                    |
| [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                                                  |                 tractusx-connector: [0.5.3](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.5.3)                 |                            [0.5.3](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.5.3)                             |
| [Eco Pass KIT](https://eclipse-tractusx.github.io/docs-kits/category/eco-pass-kit)                                                      |                                                               n/a                                                                |                          [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Eco_Pass_KIT/changelog)                          |
| [OSim KIT](https://eclipse-tractusx.github.io/docs-kits/category/osim-kit)                                                              |                                                               n/a                                                                |                    [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/online-simulation-kit/changelog)                     |
| [Product Carbon Footprint (PCF) KIT](https://eclipse-tractusx.github.io/docs-kits/category/pcf-exchange-kit)                            |                                                               n/a                                                                |          [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/changelog)           |
| [Behavioral Twin: Remaining useful Life (RUL) KIT](https://eclipse-tractusx.github.io/docs-kits/category/remaining-useful-life-rul-kit) |                                                               n/a                                                                | [0.1.1](https://eclipse-tractusx.github.io/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Changelog%20Remaining%20Useful%20Life%20Kit) |



### Known knowns

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10\
  Connection to an external Clearing House service for the entire Catena-X ecosystem is required. The Gaia-X compliance service should generally be capable of recognizing all companies that are able to register with the Catena-X Portal.
- Conformity to [Asset Administration Shell v3.0](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf), [API live example](https://app.swaggerhub.com/apis/Plattform_i40/AssetAdministrationShellRegistryServiceSpecification/V3.0_SSP-001#/Asset%20Administration%20Shell%20Registry%20API/GetAssetAdministrationShellDescriptorById) (AAS) is given. For compatibility reasons, the deprecated DTR query interface “/query” will additionally be supported until Q1/2024. Details can be found in the [changelog](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/CHANGELOG.md) of the respective component.
- EDC provides no new release compared to 23.09 but only patches: EDC version 0.5.3 is part of 23.12 with the following limitations:\
  Standard Security Tests have been performed, but it is strongly recommended for each EDC operator to apply own security measures. Especially the Dynamic Application Security Testing (DAST) needs to be executed for each specific operation environment and instance.\
  Tractus-X release guidelines (TRGs) 5.11, 7.01, 7.05 and 7.07 had not been fulfilled with v0.5.3. All of those are now addressed from [0.6.0-rc2](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.6.0-rc2) on.
- MIW interim version 0.2.0 had passed functional E2E-testing within boundaries of the Catena-X consortia, but faced severe Security issues. MIW version 0.3.0 as part of the current Release package addresses all known Security issues, but did explicitly not undergo any functional E2E-testing (again).
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations


### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.27.3`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15`

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.



## [23.09] - 2023-09-08

Tractus-X has switched to YY.0M.MICRO [Calendar Versioning](https://calver.org/) for overarching, quarterly Releases. Therefore, the previous working title of Release 23.09 was 3.2.0. Semantic Versioning remains unchanged for all components.

### Added

| Component                                                                                                                               |                                                      Helm Chart (s)                                                      |                                                           App Version (s)                                                           |
|:----------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| [Behavioral Twin: Remaining useful Life (RUL) KIT](https://eclipse-tractusx.github.io/docs-kits/category/remaining-useful-life-rul-kit) |                                                           n/a                                                            | [0.1.1](https://eclipse-tractusx.github.io/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Changelog%20Remaining%20Useful%20Life%20Kit) |
| [BPN Discovery](https://github.com/eclipse-tractusx/sldt-bpn-discovery)                                                                 |     bpndiscovery: [0.1.11](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/bpndiscovery-0.1.11)      |                      [0.2.5-M1](https://github.com/eclipse-tractusx/sldt-bpn-discovery/releases/tag/v0.2.5-M1)                      |
| [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/category/digital-twin-kit)                                              |                                                           n/a                                                            |          [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/changelog)           |
| [Discovery Finder](https://github.com/eclipse-tractusx/sldt-discovery-finder)                                                           | discoveryfinder: [0.1.11](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/discoveryfinder-0.1.11) |                    [v0.2.4-M1](https://github.com/eclipse-tractusx/sldt-discovery-finder/releases/tag/v0.2.4-M1)                    |
| [Eco Pass KIT](https://eclipse-tractusx.github.io/docs-kits/category/eco-pass-kit)                                                      |                                                           n/a                                                            |                          [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/Eco_Pass_KIT/changelog)                          |
| [Knowledge Agents](https://github.com/eclipse-tractusx/knowledge-agents)                                                                |     remoting-agent: [1.9.8](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/remoting-agent-1.9.8)      |                          [1.9.8](https://github.com/eclipse-tractusx/knowledge-agents/releases/tag/v1.9.8)                          |
| [OSim KIT](https://eclipse-tractusx.github.io/docs-kits/category/osim-kit)                                                              |                                                           n/a                                                            |                    [1.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/online-simulation-kit/changelog)                     |
| [PCF KIT](https://eclipse-tractusx.github.io/docs-kits/category/pcf-exchange-kit)                                                       |                                                           n/a                                                            |          [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/changelog)           |
| [Quality KIT](https://eclipse-tractusx.github.io/docs-kits/category/quality-kit)                                                        |                                                           n/a                                                            |                  [0.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-driven-quality-management-kit/changelog)                   |


### Changed

| Component                                                                                                                              |                                                                     Helm Chart (s)                                                                      |                                                                                                                                                                                               App Version (s)                                                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs-kits/category/business-partner-kit)                                     |                                                                           n/a                                                                           |                                                                                                                                                        [2.0.0](https://eclipse-tractusx.github.io/docs-kits/kits/business-partner-kit/changelog)                                                                                                                                                         |
| [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/category/connector-kit)                                                   |                                                                           n/a                                                                           |                                                                                                                                                              [0.5.0](https://eclipse-tractusx.github.io/docs-kits/kits/tractusx-edc/CHANGELOG)                                                                                                                                                               |
| [Data Chain KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-chain-kit)                                                 |                                                                           n/a                                                                           |                                                                                                                                                 [1.1.0](https://eclipse-tractusx.github.io/docs-kits/kits/data-chain-kit/changelog)                                                                                                                                                 |
| [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass)                                                       |            digital-product-pass: [v1.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/digital-product-pass-1.0.1)             |                                                                                                                                                            [v1.0.1](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v1.0.1)                                                                                                                                                            |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                                                |                     registry: [0.3.24](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/registry-0.3.24)                     |                                                                                                                                                     [v0.3.16-M1](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.3.16-M1)                                                                                                                                                     |
| [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                                                 |                  tractusx-connector: [0.5.1](https://github.com/eclipse-tractusx/tractusx-edc/tree/refs/tags/tractusx-connector-0.5.1)                  |                                                                                                                                                                 [0.5.1](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.5.1)                                                                                                                                                                 |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)                                        |                                     bpdm: [3.0.4](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-3.0.4)                                     |                                                                                                                                                                    [v4.0.1](https://github.com/eclipse-tractusx/bpdm/releases/tag/v4.0.1)                                                                                                                                                                    |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)                                       |                      irs-helm: [6.4.2](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-6.4.2)                       |                                                                                                                                                          [3.3.4](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/3.3.4)                                                                                                                                                           |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallet)                                           |        managed-identity-wallet: [0.1.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/managed-identity-wallet-0.1.0)         |                                                                                                                                                           [0.1.0](https://github.com/eclipse-tractusx/managed-identity-wallet/releases/tag/v0.1.0)                                                                                                                                                           |
| [Managed Service Orchestrator](https://github.com/eclipse-tractusx/managed-service-orchestrator) <br/>(Renamed from Autosetup Service) | managed-service-orchestrator: [1.5.0](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/managed-service-orchestrator-1.5.0) |                                                                                                                                                        [1.5.0](https://github.com/eclipse-tractusx/managed-service-orchestrator/releases/tag/v1.5.0)                                                                                                                                                         |
| [Portal](https://github.com/eclipse-tractusx/portal-cd)                                                                                |                                portal: [1.6.0](https://github.com/eclipse-tractusx/portal-cd/releases/tag/portal-1.6.0)                                 | Registration: [v1.5.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v1.5.0)<br/><br/>Frontend: [v1.6.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v1.6.0)<br/>Backend: [v1.6.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v1.6.0)<br/> Assets: [v1.6.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v1.6.0) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                                                        |                             sdfactory: [2.1.7](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.1.7)                             |                                                                                                                                                                 [v2.1.6](https://github.com/eclipse-tractusx/sd-factory/releases/tag/v2.1.6)                                                                                                                                                                 |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                                                  |                     semantic-hub: [0.1.29](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.1.29)                      |                                                                                                                                                         [v0.2.11-M1](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.2.11-M1)                                                                                                                                                          |
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/managed-simple-data-exchanger)                                       |                         sde: [0.0.9](https://github.com/eclipse-tractusx/managed-simple-data-exchanger/releases/tag/sde-0.0.9)                          |                                                                                   Frontend: [v2.1.1](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend/releases/tag/v2.1.1)<br/>Backend: [v2.1.1](https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend/releases/tag/v2.1.1)                                                                                    |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)                                              |                             [1.3.12](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.12)                             |                                                                                                                                                              [6.0.0](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/6.0.0)                                                                                                                                                               |


### Unchanged, untested (see known knowns)

| Component                                                                                    |                                                    Helm Chart (s)                                                    |                                                                                                App Version (s)                                                                                                 |
|----------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk-frontend)                | country-risk: [1.0.0](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/country-risk-1.0.0) | Frontend: [v1.1.2](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/v1.1.2)<br/> Backend: [v1.1.1](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/v1.1.1) |
| [Traceability KIT](https://eclipse-tractusx.github.io/docs-kits/category/traceability-kit)   |                                                         n/a                                                          |                                               [1.0.1](https://eclipse-tractusx.github.io/docs-kits/next/kits/traceability-kit/changelog)                                                |

### Deprecated

| Component                                                                                             |
|-------------------------------------------------------------------------------------------------------|
| [DAPS Registration Service](https://github.com/eclipse-tractusx/daps-registration-service/)           |
| [Dynamic Attribute Provisioning Service (DAPS)](https://github.com/eclipse-tractusx/daps-helm-chart/) |


### Known knowns

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10\
  Connection to an external Clearing House service for the entire Catena-X ecosystem is required. The Gaia-X compliance service should generally be capable of recognizing all companies that are able to register with the Catena-X Portal.
- Conformity to [Asset Administration Shell v3.0](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf), [API live example](https://app.swaggerhub.com/apis/Plattform_i40/AssetAdministrationShellRegistryServiceSpecification/V3.0_SSP-001#/Asset%20Administration%20Shell%20Registry%20API/GetAssetAdministrationShellDescriptorById) (AAS) is given. For compatibility reasons, an older version of the DTR query interface “/query” will additionally be supported until the end of 2023. Details can be found in the [changelog](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/blob/main/CHANGELOG.md) of the respective component.
- Country Risk was not verified in combination with the current Release package. Use at your own risk. The component will either be deprecated or fully re-integrated in the next Release.
- Traceability KIT was not verified in combination with the current Release package and is only compatible with Catena-X Standards as specified. Use at your own risk at this time, but expect an updated KIT version shortly.
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment (STABLE, Pre-PROD)
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations


### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.25.6`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `15`

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.


## [3.1.0] - 2023-05-17

### Added

| Component                                                                               | Helm Chart (s) |                                             App Version (s)                                             |
|-----------------------------------------------------------------------------------------|----------------|:-------------------------------------------------------------------------------------------------------:|
| [Traceability KIT](https://eclipse-tractusx.github.io/docs/category/traceability-kit)   |  n/a           | [1.0.1](https://eclipse-tractusx.github.io/docs/kits/traceability-kit/changelog) |

### Fixed

- n/a

### Changed

| Component                                                                                             |                                                                                                                                                                                                 Helm Chart (s)                                                                                                                                                                                                  |                                                                                                                                                                                               App Version (s)                                                                                                                                                                                                |
|-------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Autosetup Service](https://github.com/eclipse-tractusx/autosetup-backend)                            |                                                                                                                                                     autosetup: [1.2.7](https://github.com/eclipse-tractusx/autosetup-backend/releases/tag/autosetup-1.2.7)                                                                                                                                                      |                                                                                                                                                              [1.2.7](https://github.com/eclipse-tractusx/autosetup-backend/releases/tag/1.2.7)                                                                                                                                                               |
| [Connector KIT](https://eclipse-tractusx.github.io/docs/category/connector-kit/)                      |                                                                                                                                                                                                       n/a                                                                                                                                                                                                       |                                                                                                                                                                [1.2.0](https://eclipse-tractusx.github.io/docs/kits/tractusx-edc/CHANGELOG/)                                                                                                                                                                 |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk-frontend)                         |                                                                                                                                              country-risk: [1.0.0](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/country-risk-1.0.0)                                                                                                                                               |                                                                                                Frontend: [v1.1.2](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/v1.1.2)<br/> Backend: [v1.1.1](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/v1.1.1)                                                                                                |
| [DAPS Registration Service](https://github.com/eclipse-tractusx/daps-registration-service/)           |                                                                                                                                          daps-reg-service: [2.0.7](https://github.com/eclipse-tractusx/daps-registration-service/releases/tag/daps-reg-service-2.0.7)                                                                                                                                           |                                                                                                                                                          [2.0.7](https://github.com/eclipse-tractusx/daps-registration-service/releases/tag/v2.0.7)                                                                                                                                                          |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)               |                                                                                                                                            registry: [0.2.17](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.2.0-M12-multi-tenancy)                                                                                                                                             |                                                                                                                                       [0.2.0-M12-multi-tenancy](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.2.0-M12-multi-tenancy)                                                                                                                                        |
| [Dynamic Attribute Provisioning Service (DAPS)](https://github.com/eclipse-tractusx/daps-helm-chart/) |                                                                                                                                                             daps-server: [1.7.9](https://github.com/eclipse-tractusx/daps-helm-chart/releases/tag/)                                                                                                                                                             |                                                                                                                                                              [v1.7.9](https://github.com/eclipse-tractusx/daps-helm-chart/releases/tag/v1.7.9)                                                                                                                                                               |
| [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                | tractusx-connector: [0.3.4](https://github.com/eclipse-tractusx/tractusx-edc/tree/refs/tags/tractusx-connector-0.3.4)<br/>tractusx-connector-azure-vault: [0.3.4](https://github.com/eclipse-tractusx/tractusx-edc/tree/refs/tags/tractusx-connector-azure-vault-0.3.4)<br/>tractusx-connector-memory: [0.3.4](https://github.com/eclipse-tractusx/tractusx-edc/tree/refs/tags/tractusx-connector-memory-0.3.4) |                                                                                                                                                                 [0.3.4](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.3.4)                                                                                                                                                                 |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)       |                                                                                                             bpdm-gate: [3.3.1](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-gate-3.3.1)<br/>bpdm-pool: [4.3.1](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-pool-4.3.1)                                                                                                             |                                                                                                                                                                    [v3.2.2](https://github.com/eclipse-tractusx/bpdm/releases/tag/v3.2.2)                                                                                                                                                                    |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)      |                                                                                                                                                 irs-helm: [5.0.10](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-5.0.10)                                                                                                                                                  |                                                                                                                                                          [2.4.1](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/2.4.1)                                                                                                                                                           |
| [Portal](https://github.com/eclipse-tractusx/portal-cd)                                               |                                                                                                                                                            portal: [1.3.0](https://github.com/eclipse-tractusx/portal-cd/releases/tag/portal-1.3.0)                                                                                                                                                             | Registration: [v1.3.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/v1.3.0)<br/><br/>Frontend: [v1.3.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/v1.3.0)<br/>Backend: [v1.3.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v1.3.0)<br/> Assets: [v1.3.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/v1.3.0) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                       |                                                                                                                                                         sdfactory: [2.0.8](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.0.8)                                                                                                                                                         |                                                                                                                                                                  [2.0.8](https://github.com/eclipse-tractusx/sd-factory/releases/tag/2.0.8)                                                                                                                                                                  |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                 |                                                                                                                                                      semantic-hub: [v0.1.19](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.1.19)                                                                                                                                                        |                                                                                                                                                            [0.2.6-M1](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.2.6-M1)                                                                                                                                                             |
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/dft-frontend)                       |                                                                                                  dftfrontend: [2.0.0](https://github.com/eclipse-tractusx/dft-frontend/releases/tag/dftfrontend-2.0.0)<br/>dftbackend: [2.0.0](https://github.com/eclipse-tractusx/dft-backend/releases/tag/dftbackend-2.0.0)                                                                                                   |                                                                                                               Frontend: [2.0.0](https://github.com/eclipse-tractusx/dft-frontend/releases/tag/2.0.0)<br/>Backend: [2.0.0](https://github.com/eclipse-tractusx/dft-backend/releases/tag/2.0.0)                                                                                                                |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss)             |                                                                                                                                                          [1.3.5](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/helm-charts-1.3.5)                                                                                                                                                          |                                                                                                                                                              [3.1.2](https://github.com/eclipse-tractusx/traceability-foss/releases/tag/3.1.2)                                                                                                                                                               |


### Unchanged

| Component                                                                                                         |                                                                                                              Helm Chart (s)                                                                                                               |                                                                                                                                                                                            App Version (s)                                                                                                                                                                                             |
|-------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs/category/business-partner-kit/)                    |                                                                                                                    n/a                                                                                                                    |                                                                                                                                                        [1.0.0](https://eclipse-tractusx.github.io/docs/kits/business-partner-kit/changelog)                                                                                                                                                        |
| [Data Chain KIT](https://eclipse-tractusx.github.io/docs/kits/data-chain-kit/changelog/) |                                                                                                                    n/a                                                                                                                    |                                                                                                                                                [1.0.0](https://eclipse-tractusx.github.io/docs/kits/data-chain-kit/changelog)                                                                                                                                                 |
| [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass)                                  | consumer-backend: [0.2.5](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/consumer-backend-0.2.5)<br/>consumer-ui: [0.2.5](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/consumer-ui-0.2.4) |                                                                                                                                                         [0.4.6](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v0.4.6)                                                                                                                                                          |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallets)                     |                                                managed-identity-wallets [0.7.5](https://github.com/eclipse-tractusx/managed-identity-wallets/releases/tag/managed-identity-wallets-0.7.5)                                                 |                                                                                                                                                       [v3.3.2](https://github.com/eclipse-tractusx/managed-identity-wallets/releases/tag/v3.3.2)                                                                                                                                                       |

### Known knowns

- Relevant components and interfaces developed considering Gaia-X Trust Framework - 22.10
  Connection to an external Clearing House service for the entire Catena-X ecosystem required.
  The Gaia-X compliance service should generally be capable to recognize all companies that are able to register with the Catena-X Portal.
- FOSS components developed and pre-tested to TRL6 with artificial test data only
- No crosscheck of functionality in verification environment (Pre-PROD)
- No execution of Load-, Performance- or Penetration Tests
- No assignment of Export Control Classification Numbers (ECCN) to FOSS components
- GeoBlocking recommended for Operations (GBaaS)
- Security concept (overall) recommended for Operations
- Managed Identity Wallet (MIW) version 3.3.2 has passed all functional tests with the current Release package; yet this version faces a Security vulnerability with regards to libraries used (CVE-2023-0464, GHSA-fj2w-wfgv-mwq6).
  These issues have been addressed in MIW version 3.3.3 (no other functional changes); however [MIW](https://github.com/eclipse-tractusx/managed-identity-wallets) 3.3.3 is not part of this release.

### Runtime

- Tested on [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) versions: `1.24.6`
- Tested with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) versions: `14`

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.


## [3.0.1] - 2023-03-24

### Added

- n/a

### Fixed

| Component                                                                                    | Helm Chart (s)                                                                                                                               |                                       App Version (s)                                       |
|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------:|
| [Autosetup Service](https://github.com/eclipse-tractusx/autosetup-backend)                   | autosetup: [1.2.0](https://github.com/eclipse-tractusx/autosetup-backend/releases/tag/autosetup-1.2.0)                                       |      [1.2.0](https://github.com/eclipse-tractusx/autosetup-backend/releases/tag/1.2.0)      |
| [DAPS Registration Service](https://github.com/eclipse-tractusx/daps-registration-service/)  | daps-reg-service: [2.0.0](https://github.com/eclipse-tractusx/daps-registration-service/releases/tag/daps-reg-service-2.0.0)                 |  [2.0.0](https://github.com/eclipse-tractusx/daps-registration-service/releases/tag/2.0.0)  |

### Changed

| Component                                                                       |                                                                                                Helm Chart (s)                                                                                                |                                                                                 App Version (s)                                                                                 |
|---------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Simple Data Exchanger (SDE)](https://github.com/eclipse-tractusx/dft-frontend) | dftfrontend: [1.9.0](https://github.com/eclipse-tractusx/dft-frontend/releases/tag/dftfrontend-1.9.0)<br/>dftbackend: [1.9.1](https://github.com/eclipse-tractusx/dft-backend/releases/tag/dftbackend-1.9.1) | Frontend: [1.9.0](https://github.com/eclipse-tractusx/dft-frontend/releases/tag/1.9.0)<br/>Backend: [1.9.1](https://github.com/eclipse-tractusx/dft-backend/releases/tag/1.9.1) |

### Unchanged

| Component                                                                                                         |                                                                                                                                    Helm Chart (s)                                                                                                                                     |                                                                                                                                                                                            App Version (s)                                                                                                                                                                                             |
|-------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [Business Partner KIT](https://eclipse-tractusx.github.io/docs/category/business-partner-kit/)                    |                                                                                                                                          n/a                                                                                                                                          |                                                                                                                                                        [1.0.0](https://eclipse-tractusx.github.io/docs/kits/business-partner-kit/changelog)                                                                                                                                                        |
| [Connector KIT](https://eclipse-tractusx.github.io/docs/category/connector-kit/)                                  |                                                                                                                                          n/a                                                                                                                                          |                                                                                                                                                              [1.0.0](https://eclipse-tractusx.github.io/docs/kits/product-edc/CHANGELOG)                                                                                                                                                               |
| [Country Risk](https://github.com/eclipse-tractusx/vas-country-risk-frontend)                                     |    country-risk-frontend: [2.0.8](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/country-risk-frontend-2.0.8)<br/>country-risk-backend: [2.1.0](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/country-risk-backend-2.1.0)     |                                                                                             Frontend: [v1.1.0](https://github.com/eclipse-tractusx/vas-country-risk-frontend/releases/tag/v1.1.0)<br/> Backend: [v1.0.3](https://github.com/eclipse-tractusx/vas-country-risk-backend/releases/tag/v1.0.3)                                                                                             |
| [Data Chain KIT](https://eclipse-tractusx.github.io/docs/kits/data-chain-kit/changelog/) |                                                                                                                                          n/a                                                                                                                                          |                                                                                                                                                [1.0.0](https://eclipse-tractusx.github.io/docs/kits/data-chain-kit/changelog)                                                                                                                                                 |
| [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry)                           |                                                                                registry: [0.2.3](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.2.0-M3-multi-tenancy)                                                                                 |                                                                                                                                     [0.2.0-M3-multi-tenancy](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/releases/tag/v0.2.0-M3-multi-tenancy)                                                                                                                                      |
| [Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass)                                  |                       consumer-backend: [0.2.5](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/consumer-backend-0.2.5)<br/>consumer-ui: [0.2.5](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/consumer-ui-0.2.4)                       |                                                                                                                                                         [0.4.6](https://github.com/eclipse-tractusx/digital-product-pass/releases/tag/v0.4.6)                                                                                                                                                          |
| [Dynamic Attribute Provisioning Service (DAPS)](https://github.com/eclipse-tractusx/daps-helm-chart/)             |                                                                                            daps-server: [v1.7.1](https://github.com/eclipse-tractusx/daps-helm-chart/releases/tag/v1.7.1)                                                                                             |                                                                                                                                                                                                  n/a                                                                                                                                                                                                   |
| [Eclipse Data Space Connector (EDC)](https://github.com/eclipse-tractusx/tractusx-edc)                            |                             edc-controlplane: [0.1.7](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/edc-controlplane-0.1.7)<br/>edc-dataplane: [0.1.7](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/edc-dataplane-0.1.7)                             |                                                                                                                                                              [0.1.6](https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.1.6)                                                                                                                                                              |
| [Golden Record Business Partner Number (BPN) Service](https://github.com/eclipse-tractusx/bpdm)                   |                                                bpdm-gate: [3.0.6](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-gate-3.0.6)<br/>bpdm-pool: [4.0.6](https://github.com/eclipse-tractusx/bpdm/releases/tag/bpdm-pool-4.0.6)                                                |                                                                                                                                                                 [v3.0.3](https://github.com/eclipse-tractusx/bpdm/releases/tag/v3.0.3)                                                                                                                                                                 |
| [Item Relationship Service (IRS)](https://github.com/eclipse-tractusx/item-relationship-service)                  |                                                                                     irs-helm: [5.0.3](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/irs-helm-5.0.3)                                                                                      |                                                                                                                                                       [2.3.0](https://github.com/eclipse-tractusx/item-relationship-service/releases/tag/2.3.0)                                                                                                                                                        |
| [Managed Identity Wallet (MIW)](https://github.com/eclipse-tractusx/managed-identity-wallets)                     |                                                                      managed-identity-wallets [0.7.5](https://github.com/eclipse-tractusx/managed-identity-wallets/releases/tag/managed-identity-wallets-0.7.5)                                                                       |                                                                                                                                                       [v3.3.2](https://github.com/eclipse-tractusx/managed-identity-wallets/releases/tag/v3.3.2)                                                                                                                                                       |
| [Portal](https://github.com/eclipse-tractusx/portal-frontend)                                                     |                                                                                               portal: [1.0.1](https://github.com/eclipse-tractusx/portal-cd/releases/tag/portal-1.0.1)                                                                                                | Registration: [1.0.0](https://github.com/eclipse-tractusx/portal-frontend-registration/releases/tag/1.0.0)<br/><br/>Frontend: [1.0.0](https://github.com/eclipse-tractusx/portal-frontend/releases/tag/1.0.0)<br/>Backend: [v1.0.0](https://github.com/eclipse-tractusx/portal-backend/releases/tag/v1.0.0)<br/> Assets: [1.0.0](https://github.com/eclipse-tractusx/portal-assets/releases/tag/1.0.0) |
| [Self Description (SD) Factory](https://github.com/eclipse-tractusx/sd-factory)                                   |                                                                                            sdfactory: [2.0.1](https://github.com/eclipse-tractusx/sd-factory/releases/tag/sdfactory-2.0.1)                                                                                            |                                                                                                                                                               [2.0.0](https://github.com/eclipse-tractusx/sd-factory/releases/tag/2.0.0)                                                                                                                                                               |
| [Semantic Hub](https://github.com/eclipse-tractusx/sldt-semantic-hub)                                             |                                                                                     semantic-hub: [0.1.7](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/semantic-hub-0.1.7)                                                                                      |                                                                                                                                                       [v0.1.0-M3](https://github.com/eclipse-tractusx/sldt-semantic-hub/releases/tag/v0.1.0-M3)                                                                                                                                                        |
| [Trace-X Traceability Application](https://github.com/eclipse-tractusx/traceability-foss-frontend)                | traceability-foss-backend: [1.1.0](https://github.com/eclipse-tractusx/traceability-foss-frontend/releases/tag/traceability-foss-frontend-1.1.0)<br/>traceability-foss-backend: [1.1.2](https://github.com/eclipse-tractusx/traceability-foss-backend/releases/tag/helm-charts-1.1.2) |                                                                                              Frontend: [1.1.0](https://github.com/eclipse-tractusx/traceability-foss-frontend/releases/tag/1.1.0)<br/>Backend: [1.1.0](https://github.com/eclipse-tractusx/traceability-foss-backend/releases/tag/1.1.0)                                                                                               |

### Known knowns

- Relevant components and interfaces developed considering [Gaia-X](https://gaia-x.eu/) Trust Framework - 22.10
Connection to an external Clearing House service for the entire Catena-X ecosystem required.
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

### Using helm with central helm registry

You can search all released helm charts with the following commands:
```shell
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update tractusx-dev
helm search repo tractusx-dev --versions
```
For installation details, please see the referenced Repositories / Releases.

## [3.0.0] - 2023-03-03

### Added
- [Connector KIT](https://eclipse-tractusx.github.io/docs/category/connector-kit/), v1.0.0
- [Business Partner KIT](https://eclipse-tractusx.github.io/docs/category/business-partner-kit/), v1.0.0
- [Data Chain KIT](https://eclipse-tractusx.github.io/docs/kits/data-chain-kit/changelog/), v1.0.0
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
