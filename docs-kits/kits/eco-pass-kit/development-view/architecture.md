---
id: business-architecture
title: Business Architecture Overview
sidebar_position: 2
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
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="eco-pass" />

<!--
KIT LOGO END
-->

## Business Architecture

The Business Architecture illustrates the interaction between the EcoPass KIT and other KITs, components, data models, and artifacts used for identity and access management, illustrated by the Figure below.

![Image: Business Architecture](../resources/adoption-view/adoption-view-EcoPassKITBusinessArch.svg)

The core of the network is to provide interoperability between different applications. For this reason, a common semantic is indispensable. In the Catena-X ecosystem, it has been agreed to use the description language SAMM to describe data models.
To additionally provide a standardized interface, the open standard of the International Digital Twin Association (IDTA) is used, abbreviated as IDTA. This [standard](https://industrialdigitaltwin.org/wp-content/uploads/2023/04/IDTA-01002-3-0_SpecificationAssetAdministrationShell_Part2_API.pdf) corresponds to the Asset Administration Shell (AAS 3.0).
It is used to discover digital twins and exchange actual usage data. The registration and search of digital twins is done by using the [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/adoption-view) which reference implementation is the [Digital Twin Registry](https://github.com/eclipse-tractusx/sldt-digital-twin-registry/tree/main) in Tractus-X.
To control access to both usage and meta data, the EcoPass KIT relies on the [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view). Interactions between two parties occur exclusively peer-to-peer via the standardized interfaces of the Connector KIT, based on the International Data Space Protocol.
Data sovereignty is enabled by so-called verifiable credentials. These rely on the technology of Self-Sovereign Identity (SSI) and are enabled through the Connector KIT. In short, consumers must present their signed credentials, defined by a data provider, before a data contract (and thus a data exchange) can take place. It should be mentioned that this concept is still in the prototype phase as of Release 3.2 and will be expanded in future releases.

## Architecture Overview

The following Figure shows how the EcoPass KIT (represented by Digital Product Passport Frontend and Backend) is embedded in the overall architecture.

[![EcoPassKIT IT Arch Picture](../resources/development-view/ecoPassContext.svg)](../resources/development-view/ecoPassContext.svg)
