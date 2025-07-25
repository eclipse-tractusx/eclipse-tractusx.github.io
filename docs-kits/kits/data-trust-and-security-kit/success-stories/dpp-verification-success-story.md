---
id: dpp-verification-success-story
title: DPP Verification Success Story
description: Data Trust & Security KIT Success Stories
sidebar_position: 9
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## Digital Product Pass Verification Success Story

The Digital Product Passport Verification add-on is basically a concept for Certifying data in Tractus-X as a auditor, how to provider certify data enabling the verification as a data provider and how consumers verify this same data when retrieving them from their data providers.

The focus is on proving a process, artifacts and technologies, based on the existing SSI concept, aiming to enable Certification/Verification processes in Tractus-X using wallets.

The documentation from the Digital Product Pass Verification Add-on is available [here](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-verification). The concept enables the verification of the Data in the Reference Implementation using a [simple wallet](https://github.com/eclipse-tractusx/digital-product-pass/tree/main/dpp-verification/simple-wallet), a functional wallet that can:

- Sign verifiable credentials with JsonWebSignature2020 proofs
- Verify verifiable credentials with JsonWebSignature2020 proofs
- Manage private and public keys, providing via DID Documents public keys in JsonWebKey2020 format

Additionally the simple wallet contains an extension for creating JSON-LD @contexts using Tractus-X SAMM Models Schemas. This allows the verifiable credentials with the semantic models to be valid JSON-LDs documents and enables the context of the existing and future modeled documents.

![Verification Addon Screenshot](../resources/development-view/verificationAddon.png)

### Simple Wallet

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
