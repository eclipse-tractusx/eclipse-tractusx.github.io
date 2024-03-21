---
id: Adoption View
title: Adoption View
description: 'Certificate Management Kit'
sidebar_position: 2
---
![Certificate Management kit banner](/img/kit-icons/certificate-kit-icon.svg)

## Certificate Management KIT

## Vision & Mission

Our vision is to make the provisioning and exchange of company certificates as easy as possible.

Therefore our mission is to provide a reliable and efficient solution through a standardized API and data model. The aim is to simplify the certificate management process and enhance date accuracy.

## Use case

In the world of business, company certificates are often mandatory for conducting transactions between two companies. However, the process of provisioning, maintaining, and validating these certificates can be a major challenge. For example, if a company has 100 customers, they may need to provide their company certificates in 100 different ways and maintain them at 100 different points.
To address this issue, a use case has been developed that provides a standardized but generic data model for company certificates. This allows companies to provide and exchange certificates on a defined standard within the scope of the Catena-X dataspace. The second part of this use case focuses on the technological aspect of providing and validating certificates via an interface.

This is the main use case:
![Certificate management use case 1](/img/BPDM-CM-KIT1.png)

But there is more -
Businesses will have the ability to provide & store their company certificates in a centralized location within the data space, allowing other companies to easily access and verify the certificates through the portal. This streamlined approach to certificate management will enhance efficiency and accuracy.
![Certificate management use case 2](/img/BPDM-CM-KIT2.png)

The company certificate data model is closely linked to the business partner data model, as it utilizes the business partner number (BPN) as a primary identifier to map certificates to companies or their respective sites.

## Business value

**For solution providers:**
Solution providers / app provider can use the standardized API and data model to validate and manage company certificates, allowing partners and customers in the data space to easily access this information.

**For data consumers and providers:**
Data prosumers can both provide and consume company certificates from various solution providers using a standardized API and data model. Additionally, this API and data model enables peer-to-peer exchange of company certificates between partners via EDC.

## Standards

The API specification is already standardized and represents the data model for company certificates.

[CX 0135 Company Certificate Management Standard v1.0.0](https://catena-x.net/de/standard-library)

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 Mercedes-Benz Group AG
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation
- Source URL: [BPDM Certificate Management GitHub repository](https://github.com/eclipse-tractusx/bpdm-certificate-management)
