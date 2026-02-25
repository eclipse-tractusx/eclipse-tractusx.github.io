---
sidebar_position: 3
description: Conventions and behavior specific to Catena-X
title: Policies in Catena-X
id: policies-in-catena
---

## Data Sovereignty in Catena-X

This page extends on the previous section's fundamentals and introduces conventions specific to the Catena-X dataspace.
It assumes basic knowledge on `Policies` and their processing. Please go back to [the fundamentals][fundamentals-url]
if that's unfamiliar.

In Catena-X, the definition of possible policy constraints is done in the standard [CX-0152][cx-standards-url]. In
general, every provider can decide on his or her own under which conditions their *Datasets*, resp. *Contract
Definitions* are shared in the network. In practice, this works as long as both parties, provider and consumer, have
the same understanding of its legal meaning. Therefore, standardized `constraint`s with their `leftOperand`s and
`rightOperand`s are key for automation and provided by the [CX-0152][cx-standards-url].
Still, individual freedom of contract is a very high good and is still possible, but in Catena-X done offline in
additional paper contracts.

The document does not have the claim to decribe in completeness the specified contraints out of the standard. The
following description is limited to the mandatory constraints as required from [CX-0152][cx-standards-url].

### Data Exchange Governance

The *Framework Agreement* references the legally binding *Data Exchange Governance* document set up by the
Catena-X association. It governs the _"who, with whom, what, where from and where to, why, how, and when" of
data sharing in Catena-X ([Source][governance-framework-url]). It is roughly structured along the lines of
business scenarios under which a set of business partners want to exchange data.

Each participant commits to the *Data Exchange Governance* during onboarding. They are granted a dedicated
`DataExchangeGovernanceCredential` VC as proof of that commitment. Consequently, the `FrameworkAgreement`
constraint belongs to the kind of `odrl:Constraint`s that have to be checked against a verifiable presentation.
The details are listed in the standard [CX-0050][cx-standards-url]. The governance framework is referred to
in a machine-readable way in a providers' contract offer. When a consumer starts the negotiation for said
contract offer, not only will the policy in the `ContractRequestMessage` be checked but also the availability
of a `DataExchangeGovernanceCredential`.

Here's an example of an `odrl:Constraint` referencing the `DataExchangeGovernanceCrendential`:

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    "https://w3id.org/catenax/2025/9/policy/context.jsonld"
  ],
  "@type": "Set",
  "permission": [
    {
      "action": "use",
      "constraint": [
        {
          "leftOperand": "FrameworkAgreement",
          "operator": "eq",
          "rightOperand": "DataExchangeGovernance:1.0"
        }
      ]
    }
  ],
  "obligation": [],
  "prohibition": []
}
```

### Usage Purposes

Purposes are published in [CX-0152][cx-standards-url] driven by the creation of use cases within Catena-X, as a
usage purpose represents the conventions and legal requirements of the corresponding use case. The defined usage
purpose restricts the purpose the consumer can use in a standardized way. Unlike a `FrameworkAgreement` constraint,
the purposes are NOT checked against VCs, thus necessary for a successful negotiation mechanism is only the consumers'
consent to the policy in the contract offer.

Usage purpose `rightOperand`s are versioned. The version is expressed with a single version number

Here's an example from the Use Case Framework Traceability:

| Predefined Policy                | Typically used where? | Predefined Purpose                                                                                                                                                                                        |
|----------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cx.core.qualityNotifications:1` | Notification API      | The Data Consumer may use the Data in line with the following purposes: quality analyses to identify and select affected components and to send quality notifications to affected customers or suppliers. |

A `odrl:Constraint` referencing this purpose looks like this:

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    "https://w3id.org/catenax/2025/9/policy/context.jsonld"
  ],
  "@type": "Set",
  "permission": [
    {
      "action": "use",
      "constraint": [
        {
          "leftOperand": "UsagePurpose",
          "operator": "isAnyOf",
          "rightOperand": [
            "cx.core.qualityNotifications:1"
          ]
        }
      ]
    }
  ],
  "obligation": [],
  "prohibition": []
}
```

### Chaining constraints

If a policy is supposed to hold multiple constraints, providers may chain them via a logical *AND*. This can be
achieved via an `odrl:and` object encapsulating multiple other `odrl:Constraint`s or entering a list of them
into the `odrl:constraint` property. The example below contains both versions.

Constraints that are supposed to be checked with a logical *OR* should be published as separate contract offers.

## Example

This specific catalog contains one single `Dataset`, called "json-1-paper". It is the only entry in the top-level
`dataset` property. To access this Dataset, the Consumer can choose between two contract offers (see the
`hasPolicy` property):

- `"Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMg==:anNvbi0xLXBhcGVy:ZDA4ZDM5OTgtOGY5ZS00MzBmLThjZDEtZmYwOWQxMmQxYzk5"`
- `"Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMQ==:anNvbi0xLXBhcGVy:ODFkMDI2MWYtNDNlNi00ZTIxLWJkMWYtZmFmZTI3MWQwYzhj"`

> **Note:** The following example is outdated and still has to be replaced

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
    "dcat": "http://www.w3.org/ns/dcat#",
    "dct": "https://purl.org/dc/terms/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "dspace": "https://w3id.org/dspace/v0.8/"
  },
  "@id": "693e9b66-04f2-4bfb-b3cd-daf5857b47c9",
  "@type": "dcat:Catalog",
  "dcat:dataset": [
    {
      "@id": "json-1-paper",
      "@type": "dcat:Dataset",
      "odrl:hasPolicy": [
        {
          "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMg==:anNvbi0xLXBhcGVy:ZDA4ZDM5OTgtOGY5ZS00MzBmLThjZDEtZmYwOWQxMmQxYzk5",
          "@type": "odrl:Set",
          "odrl:permission": {
            "odrl:action": {
              "@id": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": {
              "odrl:and": [
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/FrameworkAgreement",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "DataExchangeGovernance:1.0"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/UsagePurpose",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "cx.core.industrycore:1"
                }
              ]
            }
          },
          "odrl:prohibition": [],
          "odrl:obligation": []
        },
        {
          "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMQ==:anNvbi0xLXBhcGVy:ODFkMDI2MWYtNDNlNi00ZTIxLWJkMWYtZmFmZTI3MWQwYzhj",
          "@type": "odrl:Set",
          "odrl:permission": {
            "odrl:action": {
              "@id": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": [
              {
                "odrl:leftOperand": "https://w3id.org/catenax/policy/FrameworkAgreement",
                "odrl:operator": {
                  "@id": "odrl:eq"
                },
                "odrl:rightOperand": "DataExchangeGovernance:1.0"
              },
              {
                "odrl:leftOperand": "https://w3id.org/catenax/policy/ContractReference",
                "odrl:operator": {
                  "@id": "odrl:eq"
                },
                "odrl:rightOperand": "contract-123456789"
              },
              {
                "odrl:leftOperand": "https://w3id.org/catenax/policy/UsagePurpose",
                "odrl:operator": {
                  "@id": "odrl:eq"
                },
                "odrl:rightOperand": "cx.core.industrycore:1"
              }
            ]
          },
          "odrl:prohibition": [],
          "odrl:obligation": []
        }
      ],
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "dct:format": {
            "@id": "HttpData-PULL"
          },
          "dcat:accessService": "911f5da0-c9ee-4259-9a95-39428d08f777"
        }
      ],
      "version": 1.0,
      "content-type": "application/json",
      "name": "json-1-paper",
      "description": "Asset json-1-paper for test purposes",
      "id": "json-1-paper"
    }
  ],
  "dcat:service": {
    "@id": "911f5da0-c9ee-4259-9a95-39428d08f777",
    "@type": "dcat:DataService",
    "dct:terms": "connector",
    "dct:endpointUrl": "https://provider-dsp-end.point/api/v1/dsp"
  },
  "participantId": "PROVIDER-BPNL"
}
```

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- SPDX-FileCopyrightText: 2026 Cofinity-X GmbH
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view/policies-in-catena.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view/policies-in-catena.md)

[cx-standards-url]: https://catenax-ev.github.io/docs/standards/overview

[fundamentals-url]: ./working-with-policies.md

[governance-framework-url]: https://catenax-ev.github.io/docs/operating-model/how-data-space-operations
