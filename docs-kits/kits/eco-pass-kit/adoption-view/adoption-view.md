---
id: adoption-view
title: Adoption View
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
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from "@site/src/components/2.0/Kit3DLogo";

<Kit3DLogo kitId="eco-pass" />

<!--
KIT LOGO END
-->

Welcome to the **EcoPass KIT Adoption View**. This view provides business value, strategic benefits, and use cases for business stakeholders and decision-makers.

:::info Target Audience
Business Managers, Product Owners, Solution Architects, Industry Experts, and Decision Makers.
:::

## Vision & Mission

### Vision

:::note Vision Statement
The **EcoPass KIT** will enable the distribution and usage of Digital Product Passports in Data Spaces.
:::

The EcoPass KIT will be the key enabler for various stakeholders to use digital product passports, which represent a digital collection of specific information about a physical product in a standardized exchange format. This data is governed by agreed-upon ownership and access rights, which are conveyed through the Eclipse Data Space Connector (EDC). The primary purpose of the product passport is to enable the electronic registration, processing and sharing of product-related details among various entities in the supply chain, including several businesses and authorities. The demand for interoperable product passports exists worldwide, driven by the need to establish sustainable and transparent supply chains across different types of products, for which the adoption of standards will become crucial.
It shall support the aggregation of product information relevant for Product Passports as well as the consuming of Product Passport information for specific business needs.

### Mission

:::note Mission Statement
This KIT shall guide Business Managers, Product Owners, Solution Architects, Industry Experts, and Decision Makers in their evaluation of Data Spaces for Digital Product Passport use cases.
:::

This KIT provides a comprehensive overview of the business context and benefits of product passports.

- Offer guidelines for industry stakeholders.
- Provide a detailed description and offer tools to implement product passports.

---

## Business Value

### Value Proposition #1: Data Sovereignty

The Catena-X EcoPass KIT aims to empower participants to share product pass-related data in a secure and sovereign way while ensuring the interoperability of the different applications involved in the process.
To achieve this, the relevant Catena-X standards and data models are referenced, explained, and placed within a broader context of business processes.

**Benefit**: [Primary benefit description]

**Target Stakeholders**: [OEMs | SMEs | Solution Providers | etc.]

**Measurable Outcomes**: [Key metrics]

### Value of standardization

Using Catena‑X data models and standards for the battery passport is particularly valuable because they create a consistent and verifiable foundation for battery-related data across the entire lifecycle.

- **Consistency of battery data**: The battery passport requires comparable information (e.g., CO₂ footprint, material composition). Catena‑X provides harmonized data formats and calculation rules, ensuring that all partners deliver data in the same structure and logic.
- **End-to-end traceability**: Standardized data models enable continuous tracking of battery information across all supply chain tiers, which is essential for documenting origin, production, and lifecycle data required by regulation.
- **Reliable aggregation of data**: Battery passport data must be collected, aggregated, and validated across multiple contributors. With shared standards, this can be done without reformatting or recalculating data at each step.
- **Regulatory readiness**: The battery passport will become mandatory (e.g., upcoming EU regulation), and standardized data models ensure that required information is structured, auditable, and compliant from the beginning.
- **Cost savings through standardization**: Catena‑X data models eliminate the need for individual data formats, conversions, and repeated validations when exchanging battery passport information between partners. In addition, battery ecosystems typically involve a large number of partners across multiple tiers. By using a common standard, companies can reuse the same data model and integration approach for all partners, instead of building separate solutions for each connection. This significantly reduces implementation and maintenance effort across the network.

In short: Catena‑X standards make battery passport data consistent, traceable, and regulation-ready across all partners, which is essential for implementing the battery passport efficiently.

### Benefits to suppliers and OEMs

- **Standardized structure for regulatory battery passport data**: Catena‑X defines a clear and agreed structure for all required battery passport data elements (e.g., carbon footprint, material composition, lifecycle data). This ensures that OEMs and battery suppliers can provide exactly the required information in a consistent format, without having to interpret regulatory requirements individually.
- **Efficient verification and auditability**: Battery passport data must be auditable and verifiable across multiple contributors. By using a shared standard, OEMs and suppliers ensure that data is structured in a way that supports validation, certification, and regulatory checks without additional rework at each step.
- **Cost reduction through reuse and scalability**: As outlined above, implementing battery passport requirements typically involves many partners across the supply chain. By using Catena‑X standards, OEMs and battery suppliers can apply the same data model and processes for all partners, avoiding individual solutions and repeated integration efforts.

### Benefits to software vendors

- **Reduced customer integration effort**: Catena‑X connects OEMs, suppliers, and service providers in a shared data space. Supporting its standards allows software vendors to integrate directly into this ecosystem and serve multiple customers with one solution, instead of building isolated, customer-specific implementations.
- **Interoperability as a key differentiator**: Catena‑X enables standardized and interoperable data exchange across the entire value chain, allowing certified solutions to seamlessly exchange battery passport data with other systems. This makes solutions more attractive to customers.

### How can the EcoPass KIT help to address regulatory challenges?

- Manufacturers are required to disclose information regarding the environmental impact of their products under the European Union's (EU) Ecodesign Directive. The EcoPass KIT can assist producers in adhering to this rule by offering a digital record of the environmental impact of their products.
- Companies are required to provide information regarding their efforts to address forced labor and human trafficking in their supply chains under the California Transparency in Supply Chains Act (CTSCA). The EcoPass KIT's digital record of a company's supply chain operations can assist businesses to comply with this law.
- Certain manufacturers of products are required to take back and recycle their products at the end of their functional lifespans under the German Waste Management Act (Kreislaufwirtschaftsgesetz). The EcoPass KIT, which offers a digital record of the goods that have been returned and recycled, can assist producers in adhering to this obligation.

### Summary of Business Benefits

| Stakeholder Type | Key Benefits | Time to Value |
|------------------|--------------|---------------|
| **OEMs** | [List 2-3 benefits for large enterprises] | [e.g., "6 months"] |
| **SMEs** | [List 2-3 benefits for small-medium enterprises] | [e.g., "3 months"] |
| **Solution Providers** | [List 2-3 benefits for tech vendors] | [e.g., "90 days"] |
| **Data Providers** | [List 2-3 benefits for data providers] | [e.g., "4 weeks"] |

---

## Use Case Context

### Industry Challenge

[Describe current industry problems and pain points]

**Current Challenges:**

- **Challenge 1**: [Problem description and impact]
- **Challenge 2**: [Problem description and impact]
- **Challenge 3**: [Problem description and impact]

### The Solution

[Explain how this KIT addresses the challenges]

**Solution Components:**

1. **[Component 1]**: [Description]
2. **[Component 2]**: [Description]
3. **[Component 3]**: [Description]

---

## Use Cases

### Battery Pass: A real-world example

In the automotive industry, a Battery Passport or Digital Product Passport for batteries plays a crucial role in ensuring transparency, traceability, and sustainability in the battery supply chain. Here's a real-world example of how a digital product passport might be set up for a battery used in electric vehicles (EVs), including its benefits, illustrated below:

![BP realWorldExample](../resources/adoption-view/adoption-view-BatteryPass_a_example.svg)

1. **Battery Manufacturing**: During the production stage, the battery manufacturer collects and records relevant data, such as the battery's unique identifier, type and model, manufacturing date and location, energy capacity and raw materials composition, including the content of critical elements like lithium, cobalt and nickel.
2. **Supply Chain Transparency**: Information about the battery's sourcing, manufacturing and distribution processes is documented, ensuring compliance with environmental and social standards. This includes data on the origin of raw materials, labor practices and the environmental footprint of each stage of the supply chain.
3. **Vehicle Integration**: When the battery is integrated into an electric vehicle, the Battery Pass is linked to the car's unique identification number (VIN), allowing seamless tracking and communication between the battery, the vehicle and relevant stakeholders.
4. **In-Use Performance Tracking**: As the vehicle is used, the Battery Pass continuously collects data on the battery's performance, such as its state of charge, charging cycles and degradation over time. This information is essential for the vehicle owner, car manufacturer and service providers to monitor the battery's health and optimize its lifespan.
5. **End-of-Life Management**: When the battery reaches the end of its useful life, the Battery Passport provides detailed instructions for proper disposal and recycling, ensuring compliance with regulations and facilitating the recovery of valuable materials. The data stored in the Battery Passport helps recycling facilities to efficiently process the battery, reducing waste and promoting a circular economy.

Throughout this process, the Battery Passport serves as a single, secure, and easily accessible source of information for various stakeholders, such as vehicle manufacturers, suppliers, service providers, regulators and vehicle owners. By implementing a digital product passport like the Battery Pass in the automotive industry, companies can promote transparency, traceability, and sustainability, ultimately contributing to a more eco-friendly and circular economy.

### Battery Pass: Catena-X Standard explained

The CX‑0160 Battery Passport standard specifies how battery‑related information is modeled, provisioned, discovered and accessed within the Catena‑X dataspace for:

- Traction, industrial and similar batteries that fall under the scope of the EU Battery Regulation or comparable regulatory schemes.
- End‑to‑end lifecycle usage within the automotive battery value chain (manufacturing, use phase, second‑life, end‑of‑life and recycling).
- Provisioning of both complete digital battery passports and partial, lifecycle‑specific data contributions, based on Catena‑X digital twins and the joint Catena‑X/IDTA Battery Passport aspect models.

The standard distinguishes three different use cases:

- Use Case (1) - Provisioning of near-complete battery passport: Typically used in situations where the data provider manufactures the battery, but the battery passport will be published by the data consumer. This can happen depending on the contractual situation and depending on who is the economic operator of the battery and who is putting it onto the EU market.
- Use Case (2) - component supplier integration (for example cells, housing, battery packs): Typically used to provide data from a component supplier to a battery manufacturer.
- Use Case (3) - DPP-Service provider view: Complete exchange of DPPs to service provider, which provides it public.

Please note that Use Case 2 is not available in the current version of the standard and will be added later.

---

## Semantic Models

### Core Semantic Models

| Model Name                                      | Version | Purpose                                                                                                                                                                                                    | Link      |
| ----------------------------------------------- | ------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------- |
| io.catenax.generic.digital_product_passport     | 6.1.0   | Generic Digital Product Passport (DPP) – baseline model for any product passport in Catena-X, covering metadata, identification, characteristics, sustainability, materials and commercial information.    | [Link][1] |
| io.catenax.battery.battery_pass                 | 6.1.0   | Battery Passport aspect model aligned with the EU Battery Regulation; used for traction, industrial and similar batteries across the full lifecycle.                                                       | [Link][2] |
| io.catenax.transmission.transmission_pass       | 3.1.0   | Transmission Passport – product passport variant for vehicle transmissions, reusing the DPP structure for transmission-specific lifecycle and component data.                                              | [Link][3] |
| io.catenax.material.chemical_material_passport  | 3.0.0   | Chemical Material Passport – passport-style model for chemical substances and materials, providing composition and safety-relevant information used as input to product passports.                         | [Link][4] |

[1]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.generic.digital_product_passport/6.1.0
[2]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.battery.battery_pass/6.1.0
[3]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.transmission.transmission_pass/3.1.0
[4]: https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.material.chemical_material_passport/3.0.0

---

## Standards

:::warning Industry-Specific Standards
For industry-specific standards, refer to the [Industry Extensions](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits/kit-template/industry-extensions) section.
:::

### Supported Standards

| Standard | Version | Description                                                                                                                                             | Compliance Level | Link |
|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|------|
| CX-0143 | 1.3 | This standard gives a baseline for products declared under the ESPR with a generic product passport and additional product models.                      | Optional | [Link](https://catenax-ev.github.io/docs/standards/CX-0143-UseCaseCircularEconomyDigitalProductPassportStandard/introduction) |
| CX-0160 | 1.0 | The Battery Passport Standard describes the existing use cases and the required models as well as Digital Twins that have to be added to for Batteries. | Mandatory | [Link](https://catenax-ev.github.io/docs/standards/CX-0160-BatteryPassport) |

---

## Tutorials & Resources

:::warning Old deprecated reference application
For previous versions of this KIT a reference application was mentioned and used as example.
This application has been deprecated and should no longer be seen as valid reference.
For some insights into the application of the KIT for generic product passports have a look at the EcoPass KIT of the [Industry Core Hub](https://github.com/eclipse-tractusx/industry-core-hub).
:::

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023, 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023, 2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023, 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023, 2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023, 2024 SAP SE
- SPDX-FileCopyrightText: 2023, 2024 CGI Deutschland B.V. & Co. KG
- SPDX-FileCopyrightText: 2023, 2024, 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer IPK)
- SPDX-FileCopyrightText: 2023, 2024 BASF SE
- SPDX-FileCopyrightText: 2023, 2024 Henkel AG & Co. KGaA
- SPDX-FileCopyrightText: 2023, 2024 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2024 Volkswagen AG
- SPDX-FileCopyrightText: 2026 Mercedes-Benz AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
