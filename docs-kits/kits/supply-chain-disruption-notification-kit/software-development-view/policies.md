---
id: policies
title: Policies And Contract Definition
description: PURIS-DCM Supply Chain Disruption Notifications
sidebar_position: 2
---

![Supply Chain Disruption Notifications kit banner](@site/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-logo.svg)

## Policies

This chapter describes the access and usage policies as well as the contract definitions. For more information on the access and usage policies, please refer to the [policies documentation in the tractusx-edc repository](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md).

### Access Policies

To enable data sovereignty, access and usage policies are important to protect the data assets of a data provider in the connector, as described in the [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/next/category/connector-kit).

To decide which company has access to the data assets, access policy should be used. Note that without protecting data assets with access policies, they become publicly available in the Catena-X network which is not recommended.

Therefore, every asset should be protected and only be made available through specified BPNL policy groups or specific BPNL policies. For a detailed description, see [Business Partner Validation Extension](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/edc-extensions/bpn-validation).

#### BPNL Access Policy

This policy allows limiting access to a data offer based on a list of specific BPNLs. This translates to the following  unctionality:

- The data offer creator will be able to create a policy listing all the BPN that can access the data offer.
- This means that only the connectors registered in the Catena-X network with the BPNL listed in the policy can see the
  data offer and accept it (for the creation of data contracts and subsequent data exchange).

#### Implementation Hint

Examples including a JSON payload for a BPNL group access policy are described in the [Business Partner Validation Extension](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/edc-extensions/bpn-validation).

The reference implementation (see Operation View) also provides an extension to add the BPNL of the requesting party to the header of a proxied request. As a result, during implementation one can use this BPNL to design the internal submodel API.

### Usage Policies

To decide which company can use the data asset under specific conditions, usage policies (also referred to as contract policies) are used. Therefore, they are more specific than access policies and only used just after access is granted. Currently, the usage policies aren't technically enforced but based on a legal framework agreements. Signing of framework agreements can be enforced during negotiation depending on the connector implementation.

Policies are defined based on the [W3C ODRL format](https://www.w3.org/TR/odrl-model/). This allows a standardized way of formulating policy payloads. It further allows to stack different constraints with the `odrl:and` operator. Therefore, every data provider can decide on his or her own under which conditions their data assets are shared in the network. It is recommended to restrict the data usage for all exchanged data standards. An example of one usage policy containing three different constraints is shown and described in the following:

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    {
      "edc": "https://w3id.org/edc/v0.0.1/ns/",
      "cx-policy": "https://w3id.org/catenax/policy/"
    }
  ],
  "@type": "PolicyDefinitionRequestDto",
  "@id": "<POLICY-ID>",
  "edc:policy": {
    "@type": "Set",
    "profile": "cx-policy:profile2405",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "@type": "LogicalConstraint",
          "and": [
            {
              "@type": "LogicalConstraint",
              "leftOperand": "cx-policy:FrameworkAgreement",
              "operator": "eq",
              "rightOperand": "<FRAMEWORK-AGREEMENT>"
            },
            {
              "@type": "LogicalConstraint",
              "leftOperand": "cx-policy:UsagePurpose",
              "operator": "eq",
              "rightOperand": "<USAGE-PURPOSE>"
            },
            {
              "@type": "LogicalConstraint",
              "leftOperand": "cx-policy:ContractReference",
              "operator": "eq",
              "rightOperand": "x12345"
            }
          ]
        }
      }
    ]
  }
}
```

It is recommended to use the following values for rightOperand of FrameworkAgreement and UsagePurpose depending on the use case:

| Use case | cx-policy:FrameworkAgreement | cx-policy:UsagePurpose |
|----------|------------------------------|------------------------|
| DCM      | `DataExchangeGovernance:1.0` | `cx.dcm.base:1`        |
| PURIS    | `DataExchangeGovernance:1.0` | `cx.puris.base:1`      |

More information can be found in
the [Policies in Catena-X of the Connector KIT](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view_policies_cx/).

### Contract Definitions

In the connector, every policy is associated with a contract. Thus, a contract definition is needed, detailing what policies are required when contracting assets.

When using an above mentioned Access Policy, their `ACCESS_POLICY_ID` needs to be included as a value of the `accessPolicyId` key in the contract definition.

When using an above mentioned Usage Policy, their `CONTRACT_POLICY_ID` needs to be included as a value of the `contractPolicyId` key in the contract definition.

```json
{
  "id": "{{CONTRACT_DEFINITION_ID}}",
  "criteria": [
    {
      "operandLeft": "asset:prop:id",
      "operator": "=",
      "operandRight": "{{ASSET_ID}}"
    }
  ],
  "accessPolicyId": "{{ACCESS_POLICY_ID}}",
  "contractPolicyId": "{{CONTRACT_POLICY_ID}}"
}
```

For a more detailed tutorial on creating contracts for assets, see in [Chapter 3 of the End-to-End Adopter Journey](https://eclipse-tractusx.github.io/docs/tutorials/e2e/boost/provideData).

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 SAP SE
- SPDX-FileCopyrightText: 2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2024 BASF SE
- SPDX-FileCopyrightText: 2024 SupplyOn AG
- SPDX-FileCopyrightText: 2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- SPDX-FileCopyrightText: 2024 ISTOS GmbH (a member of the DMG Mori Group)
- SPDX-FileCopyrightText: 2024 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer ISST)
- SPDX-FileCopyrightText: 2024 TRUMPF Werkzeugmaschinen SE + Co. KG
- SPDX-FileCopyrightText: 2024 Volkswagen AG
- SPDX-FileCopyrightText: 2025 WITTE Automotive GmbH
- SPDX-FileCopyrightText: 2025 Ford Werke GmbH
- SPDX-FileCopyrightText: 2025 Robert Bosch Manufacturing Solutions GmbH
- SPDX-FileCopyrightText: 2025 IBM Deutschland GmbH
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
