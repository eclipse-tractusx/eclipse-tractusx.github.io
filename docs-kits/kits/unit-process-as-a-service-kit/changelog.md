---
id: changelog
title: Changelog
description: 'Changelog Unit Process as a Service KIT'
sidebar_position: 1
---

<!--
Copyright(c) 2026 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
information regarding copyright ownership.

This work is made available under the terms of the
Creative Commons Attribution 4.0 International (CC-BY-4.0) license,
which is available at
https://creativecommons.org/licenses/by/4.0/legalcode.

SPDX-License-Identifier: CC-BY-4.0
-->

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace  Unit-Process-as-a-Service with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="unit-process-as-a-service" />

<!--
KIT LOGO END
-->

## [0.1.0] - 2026-07-27

### Added

- Initial release of the Unit Process-as-a-Service (UPaaS) KIT in the Semiconductor-X dataspace, introducing semiconductor unit processes as tradeable marketplace services, using wafer testing as the reference scenario
- Adoption View and Development View documentation for the KIT
- UPaaS semantic data model (RDF) structured across three levels — supply chain, production planning, and production execution — built on the Product-Process-Resource (PPR) and Capability-Skill-Service (CSS) modeling lines and using the Digital Reference (DR) and SEMIKONG for common semantics
- BPMN 2.0 swimlane business process diagram formalizing the requester–provider interaction lifecycle, from service request through contract signing to unit process execution and result delivery
- Wafer Testing AAS submodel (Metadata + Electrical Testing) aligned with IDTA conventions
- Qualified Synthetic Data (QSD) pipeline for generating realistic but non-confidential wafer-testing data, with yield- and HBIN-mode wafer-map visualizations
- Policy-controlled data-exchange demonstration via the Eclipse Dataspace Connector (EDC) between Infineon Technologies AG and OPAIX

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Infineon Technologies AG
- SPDX-FileCopyrightText: 2026 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. (Fraunhofer-Institut für Werkzeugmaschinen und Umformtechnik IWU)
- SPDX-FileCopyrightText: 2026 EXPO21XX GmbH
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
