---
id: policies
title: Policies And Contract Definition
description: PURIS-DCM Supply Chain Disruption Notifications
sidebar_position: 2
---

![Supply Chain Disruption Notifications kit banner](@site/static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-logo.svg)

## Policies

In Catena-X, a data provider offers `information / data` and `api endpoints` (called
`data asset`) to other participants (data consumers) through a data space connector. To protect
`data assets`, they are bundled with [access](#access-policies) and [usage policies](#access-policies) into [contract definitions](#contract-definitions). They have the following functions:

- `Access policies` restrict the access to
  `data assets`. If a data consumer doesn't have access to an offer, this data consumer doesn't see it in the connector's catalog.
- `Usage policies` restrict the usage of
  `data assets`. Applications must ensure that they respect the respective purposes. Further, a connector does validate that the
  `Framework Agreement` has been signed. If this validation fails, the data consumer may not contract the `data asset`.
- `Contract definitions` represent an offering of a `data asset`. It must refer to a valid `access policy` and a valid
  `usage policy`.

Both, `access policies` and `usage policies` use constraints to restrict access or usage. To enable data sovereignty,
`access policies` and `usage policies` are important to protect the
`data assets` of a data provider in the connector, as described in the [Connector KIT](./../../connector-kit/adoption-view/adoption-view.md).

:::note
To not replicate existing documentation, this section covers only additional information that is needed to use the demand and capacity notifications. The following sites may be sourced for detailed information:

- For more general information on [working with policies](./../../connector-kit/adoption-view/working-with-policies.md) and [their usage in Catena-X](./../../connector-kit/adoption-view/policies-in-catena.md), please refer to the [Connector KIT](./../../connector-kit/adoption-view/adoption-view.md)
- For more information on how to use policies with the Eclipse Tractus-X Connector (also called EDC), please refer to
  - the different documentations linked in the respective sections and
  - the [policies documentation in the Eclipse Tractus-X Connectors usage guide](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md).
- For more information on the available
  `usage policies`, please refer to the [odrl-profile](https://github.com/catenax-eV/cx-odrl-profile/blob/main/profile.md).
  :::

### Contract Definitions

A contract definition defines the conditions under which a `data asset` is provided (`usage policy`) to whom (
`access policy`). To include them in the contract definition, the data provider must:

- refer to the previously created access policy in the field `accessPolicyId` using the identifier (
  `ACCESS_POLICY_ID`) used during creation.
- refer to the previously created usage policy in the field `contractPolicyId` using the identifier (
  `CONTRACT_POLICY_ID`) used during creation.

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

For a more detailed tutorial on creating contract definitions for assets, please refer to [Chapter 3 of the End-to-End Adopter Journey](https://eclipse-tractusx.github.io/docs/tutorials/e2e/boost/boost.md)

### BPNL Access Policies

To decide which company has access to the data assets, an
`access policy` MUST be used. BPNL access policies allow limiting access to a data offer based on specific BPNLs. This translates to the following functionality:

- The data provider creating the data offer will be able to create a policy specifying the BPNs that can access the data offer.
- Only data consumers registered in the Catena-X network with the BPN granted access via the policy can see the
  data offer and accept it (for the creation of data contracts and subsequent data exchange).

:::danger
Specifying a "pass all" policy is not recommended for this KIT and thus won't be shown here.
:::

Within Catena-X, access to partners is granted by specifying BPNL policy groups or BPNL policies. Both options are described in table 1. For a detailed description and example payloads, please refer to [Business Partner Validation Extension](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/edc-extensions/bpn-validation).

| Policy Type              | Description                                                                                                                                                                                                                                                                                                                                                                |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BPNL Access Policy       | Constraints the access to exactly the specified BPNL (one BPNL).                                                                                                                                                                                                                                                                                                           |
| BPNL Group Access Policy | Constraints the access to a BPNL group defined by an identifier. Requires and allows to configure the BPNL group (one or more BPNLs) via an additional API. Scnearios could be e.g. 1) apply to all partners except BPNL X or 2) apply to all partners with BPNL Y and Z. Please note that the BPNL group is persisted for a contract agreement during contract agreement. |

> Table 1: *BPNL policy types available in the Eclipse Tractus-X Connector reference implementation.*

:::tip[Implementation Hint]
Examples including a JSON payload for a BPNL and BPNL group access policy and the BPNL group API calls are described in the [Business Partner Validation Extension](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/edc-extensions/bpn-validation).

The Eclipse Tractus-X Connector reference implementation (see [Operation View](./../../connector-kit/operation-view/operation-view.md)) also provides an extension to add the BPNL of the requesting party to the header of a proxied request. As a result, during implementation one can use this BPNL to design the internal API.
:::

### Usage Policies

To decide which company can use the `data asset` under specific conditions, `usage policies` (also referred to as `contract policies`) are used. Therefore, they are more specific than `access policies` and only used just after access is granted. Currently, the `usage policies` aren't technically enforced but based on a legal framework agreements. Signing of framework agreements can be enforced during contract negotiation depending on the connector implementation.

Policies are defined based on the [W3C ODRL format](https://www.w3.org/TR/odrl-model/). This allows a standardized way of formulating policy payloads. It further allows to stack different constraints with the `odrl:and` operator. Therefore, every data provider can decide on his or her own under which conditions their `data assets` are shared in the network. It is recommended to restrict the data usage for all exchanged data standards. An example of one usage policy containing three different constraints is shown and described in the following:

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

It is recommended to use the following values for rightOperand of `FrameworkAgreement` and `UsagePurpose` depending on the use case:

| Use case | `cx-policy:FrameworkAgreement` | `cx-policy:UsagePurpose` |
|----------|--------------------------------|--------------------------|
| DCM      | `DataExchangeGovernance:1.0`   | `cx.dcm.base:1`          |
| PURIS    | `DataExchangeGovernance:1.0`   | `cx.puris.base:1`        |

More information can be found in the [Policies in Catena-X of the Connector KIT](./../../connector-kit/adoption-view/policies-in-catena.md).

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
