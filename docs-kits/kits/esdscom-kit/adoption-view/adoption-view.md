---
id: adoption-view
title: Adoption View
description: Data Model of the eSDScom KIT
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

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="esdscom" />

Welcome to the eSDScom KIT Adoption View. This view provides a high level business view on the eSDScom KIT with its vision, mission, benefits, and business value.

## Vision & Mission

### Vision

All global chemical regulations have a high impact on company chemical compliance. Registration and notification requirements, communication with suppliers and customers and authorities all sum up to a significant level of bureaucracy that must be handled by every actor in chemical supply chains.
To lower administrative cost it’s highly recommended to exchange those data via a digital twin technology.
The eSDScom standard/KIT within the Catena-X framework embodies a transformative approach to fortify supply chains. This approach holds significant relevance beyond the automotive supply chain and can be effectively applied to other industries characterized. By establishing a standardized, rapid communication for a products safety data information, this empowers stakeholders across the value chain to act swiftly and effectively in the face of challenges. Enhanced transparency and timely information exchange enable members to manage supply chain disruptions, streamline decision-making processes, and mitigate potential regulatory impacts. This proactive and collaborative framework not only elevates operational resilience but also drives cost efficiencies, reduces product approval time, and promotes a more sustainable and responsive supply chain ecosystem. By fostering rapid information flow, the eSDScom is a significant step toward a more interconnected and resilient automotive industry.

### Mission

#### Description / Challenge / Initial Situation

Safety data sheets affect all actors in the supply-chain who purchase/sell, use or contain chemicals in components/systems. Data management of these legally required documents is only possible with a high level of administrative effort.
In an increasingly environmentally conscious world, the standardized exchange of SDS data is of great importance to reduce administrative costs along the supply chain and to ease the way of automated validation of the incoming data.

### Legal Background in a nutshell

Safety data sheets (SDSs) provide information on hazards and deviated risk management measures. Economic operators, such as manufacturers, importers and downstream users frequently need to send or receive SDSs, as required under regulations across the globe which all implement the UN Globally Harmonized System GHS. In the EU, the main regulations are REACH (registration, evaluation, authorisation and restriction of chemicals), and CLP (classification, labelling and packaging of chemicals).
All global chemical regulations have a high impact on company chemical compliance. Registration and notification requirements, communication with suppliers and customers and authorities all sum up to a significant level of bureaucracy that must be handled by every actor in chemical supply chain.
Through the standardized maintenance of chemical safety information and the seamless integration of information exchange, stakeholders gain a dynamic view of the supply chain, facilitating rapid adaptation to both imminent and potential supply chain or regulatory changes.

#### The eSDScom project in a nutshell

eSDScom is the industry standard for sending safety data sheets, exposure scenarios and relevant compliance information in the global chemical supply chain. It is a comprehensive and efficient solution saving money and time, covering the following:
• Safety Data Sheets to assist with occupational safety and health
• Notification data to help customers with their legal obligations
• for Europe: Exposure Scenarios and ENES achievements for downstream users
For more information, please consult the History section in the Development View of this KIT.

## Business Value

### One Open Data Model

eSDScom is a standardized exchange format defined by industry. It currently covers the regulatory regions of the EU, USA, China, Argentina, Mexico, and more.
The data model covers:

- Information for Safety Data Sheets and to work with management systems for hazardous chemicals
- Notification data to help customers with their legal obligations
- for Europe: Exposure Scenarios (for communication, as an annex to safety data sheets)

### Easy to read and maintain

Developers don't read manuals, at least usually. Thus eSDScom is implicitly designed to be educational and to avoid implementations that misinterpret data.

### Low Cost

Compared to IUCLID and proprietary solutions, eSDSCom is most likely the comprehensive model with the lowest implementation cost. Its maintenance by an expert group assures compliance, helping internal software to stay up to date.

### Value Proposition

SDS sending, inhouse collection and processing

#### Benefit

Easily send new/revised SDSs to multiple recipients. Replace multiple methods (email/mail/customer portals/etc.) with just one IT solution.

#### Target Stakeholders

OEMs | SMEs | Chemical Supplier | IT Solution Providers | etc.

#### Measurable Outcomes

Increase SDS quality as suppliers respond to recipient comments, less manual human errors, decreased administrative burden (time and cost saving).
Increase in SDS data quality due to potential for built-in data validity checks and accumulated recipient comments.

## Access & Usage Policies

### Example Access Policy

To decide which company can use the data asset under specific conditions, usage policies (also referred to as contract policies) are used. Therefore, they are more specific than access policies and only used just after access is granted. Currently, the usage policies aren't technically enforced but based on a legal framework agreements. Signing of framework agreements can be enforced during contract negotiation depending on the connector implementation.
Policies are defined based on the W3C ODRL format. This allows a standardized way of formulating policy payloads. It further allows to stack different constraints with the odrl:and operator. Therefore, every data provider can decide on his or her own under which conditions their data assets are shared in the network. It is recommended to restrict the data usage for all exchanged data standards. An example of one usage policy containing three different constraints is shown and described in the following:

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "PolicyDefinition",
  "@id": "esdscom",
  "policy": {
    "@type": "Set",
    "@context": [
      "https://w3id.org/catenax/2025/9/policy/odrl.jsonld",
      "https://w3id.org/catenax/2025/9/policy/context.jsonld"
    ],
    "permission": [
      {
        "action": "use",
        "constraint": [
          {
            "and": [
              {
                "leftOperand": "UsagePurpose",
                "operator": "isAnyOf",
                "rightOperand": [
                  "cx.esdscom.base:1"
                ]
              },
              {
                "leftOperand": "FrameworkAgreement",
                "operator": "eq",
                "rightOperand": "DataExchangeGovernance:1.0"
              }
            ]
          }
        ]
      }
    ],
    "obligation": [],
    "prohibition": []
  }
}
```

More information can be found in the Policies in Catena-X of the Connector KIT.

## Semantic Models

The eSDScom ontology is based on the eSDScom XML schema definition version 5.6, available at [esdscom.eu](https://esdscom.eu) and converted to SAMM by a script to ensure consistency.

### Core Semantic Models

<details>  
<summary><strong>Catena-X Safety Datasheet Model Payload</summary>  

Add your model here:  

### Model Example

Due to the model size, for further information please refer to [esdscom.eu](https://esdscom.eu)


## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 [eSDScom Workgroup](https://esdscom.eu) and contributors
- SPDX-FileCopyrightText: 2026 [Qualisys GmbH](https://qualisys.eu)
- SPDX-FileCopyrightText: 2026 [Volkswagen AG](https://www.volkswagen.de)
- SPDX-FileCopyrightText: 2026 Catena-X Automotive Network e.V.
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
