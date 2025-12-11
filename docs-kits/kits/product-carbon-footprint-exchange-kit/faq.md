---
id: faq
title: Questions and Answers
description: Questions and Answers
---

![PCF Exchange kit banner](@site/static/img/kits/pcf/pcf-kit-logo.svg)

## General

|#|Question|Answer|
|--|--|--|
|1|Where do I find the Catena-X PCF Rulebook?|The PCF Rulebook (Product Carbon Footprint Rulebook) and the PCF Verification Framework can be found in the official Catena-X Standard Library. See the overview of the non-functional CX-Standards here: [Non-Functional Standards Overview](https://catenax-ev.github.io/docs/non-functional/overview). You may change the release via the dropdown to browse through the versions.|
|2|Where do I find the Catena-X PCF Verification Framework?|See the PCF Verification Framework document here: [PCF Verification Framework PDF](https://catenax-ev.github.io/assets/files/CX-NFR-PCF_TFS-verification_v.2.0-fc44ea870e8b9756246f345c343f88dd.pdf).|
|3|Where do I find the PCF Exchange Standard CX-0136?|You can find the PCF Exchange Standard CX-0136 here: [CX-0136 Standard](https://catenax-ev.github.io/docs/standards/CX-0136-UseCasePCF).|
|4|Where do I find PCF guidance documents?|Additional PCF guidance documents can be found on the Catena-X Campus: [Campus Online Library](https://catena-x.academy/de/bibliothekar/?gv_search=PCF&mode=any). Direct link to the PCF Calculation Guidance: [PCF Calculation Guidance PDF](https://catena-x.academy/index.php?gf-download=2024%2F11%2F2024-07-29_PCF-Calculation_V89428.pdf&form-id=1&field-id=5&hash=d235dd71bb2c49b8786bd13a5679be3b5017913726c541f1d0dc5904290d738a).|
|5|Where do I find the Catena-X PCF Data Model?|The PCF Data Model is stored in the Tractus-X semantic model library: [PCF Data Model on GitHub](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.pcf).|
|6|Can I use a PCF calculated according to other industry PCF guidelines for Catena-X?|Yes – PCFs based on other industry guidelines can be used if they meet the Catena-X PCF Rulebook requirements and are mapped to the Catena-X PCF Exchange Data Model: [PCF Data Model on GitHub](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.pcf).|
|7|Which PCF-related Catena-X Expert Groups do exist?|Please refer to the overview on the  Catena-X website: [Expert Groups & Committees at Catena-X](https://catena-x.net/association/expert-groups-committees/).|
|8|How can I become active in one of the PCF-related Expert Groups?|To become active in a PCF-related Expert Group, Catena-X Association member organizations must apply during the application phase or after the group is initiated and validated via sustainability@catena-x.net. Only one person per company can participate per group.|
|9|Which PCF Rulebook version does IMDS use in the Release published in July 2025?|IMDS references version 3.0 of the PCF Rulebook; attributes are based on Catena-X Data Exchange Format 7.0.0. Updates are planned.|
|10|Can I still use my own secondary data or do I have to use the Catena-X secondary database?|You can still use your own secondary data. The Catena-X secondary database becomes an option, not a requirement.|
|11|Many semiconductor companies use their own PCF methods. Are there plans to bring them to the Catena-X PCF Rulebook?|Yes, there are ongoing discussions with Semiconductor X and others to harmonize and compare methodologies.|
|12|What exactly is PCF in Catena-X and how is it defined?|PCF is the total GHG emissions during the life cycle of a product (CO2eq). Use- and end-of-life phases are excluded in Catena-X.|
|13|Is Catena-X PCF aligned with GHG Protocol, ISO 14067, or PACT?|Yes — Catena-X PCF builds on ISO 14067 and ISO 14040/44 and is aligned with PACT. The PCF Exchange Data Model is interoperable with the PACT PCF Datamodel.|
|14|How does Catena-X calculate PCF — do I calculate it or does the platform?|Companies calculate PCFs themselves using LCA tools according to the PCF Rulebook and then share the results via connectors/apps in the decentralized Catena-X dataspace.|
|15|What data model or submodel is used for PCF in Catena-X?|The PCF aspect model is written in SAMM 2.1.0. Additional details here: [List of standalone standards](https://catenax-ev.github.io/docs/next/standards/CX-0136-UseCasePCF#211-list-of-standalone-standards).|
|16|What is the PCF data format — JSON-LD, AAS submodel, or something else?|The PCF exchange API MUST use JSON as the payload.|
|17|What’s the difference between primary data and secondary data in PCF reporting?|Primary data = company-specific measurements; secondary data = databases (e.g., ecoinvent). See glossary in the PCF Rulebook.|
|18|Do I need to include cradle-to-grave or just cradle-to-gate values?|Catena-X requires cradle-to-gate.|
|19|How are allocation rules handled in Catena-X PCF calculations?|Allocation rules follow a decision tree (chapter 5.1.2). For recycled materials, Catena-X uses the cut-off approach (chapter 5.1.5.1, Rulebook v4).|
|20|How is PCF data exchanged in Catena-X?|PCF data is exchanged in Catena-X via the Eclipse Dataspace Connector (EDC). Companies can choose between (1) [ready-to-use PCF apps](https://www.cofinity-x.com/apps?search=pcf) with a fully hosted connector, (2) [managed EDC services](https://www.cofinity-x.com/services?search=EDC) operated by a service provider, or (3) self-managed EDC deployments based on Tractus-X components.|
|21|How is my PCF data kept secure and who can see it?|Access follows data sovereignty principles; only partners with a valid Supplier–Customer relationship and BPN can request PCF datasets.|
|22|How does PCF in Catena-X help with CSRD compliance?|Catena-X enables collecting standardized PCF data usable for Scope 3 accounting.|
|23|How does PCF in Catena-X support EU Battery Regulation compliance?|Catena-X supports exchange of PCF data required for the Battery Passport. More detail follows after the delegated act is final.|
|24|Is the PCF used in the Battery Passport within Catena-X?|Yes — PCF data is a mandatory attribute for any Battery Passport.|
|25|How does PCF reporting help with OEM tenders or supply chain requirements?|OEMs increasingly request PCF data for tenders. From version 4 Rulebook includes rules for prospective PCFs used in tenders.|
|26|Which tools or apps can I use to create PCF data for Catena-X?|Any solution following the Rulebook methodology can be used. There are several certified PCF Calculation and Exchange solutions on the Cofinity-X marketplace: [Certified PCF APPs](https://www.cofinity-x.com/apps?case=product-carbon-footprint-pcf&page=1).|
|27|How do I onboard my company to start sharing PCF in Catena-X?|To onboard your company for sharing PCF in Catena-X, you need a Business Partner Number (BPN), a working connector (hosted or self-managed), and registration in the Catena-X portal. You can work with [qualified Catena-X service providers](https://catena-x.academy/catena-x-qualified-advisor/) who support BPN acquisition, connector setup, and onboarding. A direct entry point for onboarding is available here: [Cofinity-X Onboarding](https://www.cofinity-x.com/onboarding#contact).|
|28|How do I become a certified Catena-X PCF Attestation Provider?|To become a certified Catena-X PCF Attestation Provider, you must meet the Catena-X requirements and complete the certification process. Detailed information and the application process can be found here: [Catena-X PCF Attestation Provider](https://catena-x.academy/catena-x-pcf-attestation-provider/).|
|29|Where do I find currently certified Catena-X PCF Attestation Providers?|You can find the list of currently certified Catena-X PCF Attestation Providers on the Catena-X Academy website: [Certified PCF Attestation Providers](https://catena-x.academy/catena-x-qualified-attestation-provider/).|

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
