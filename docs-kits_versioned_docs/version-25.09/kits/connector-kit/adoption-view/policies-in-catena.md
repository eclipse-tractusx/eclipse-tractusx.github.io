---
sidebar_position: 3
description: Conventions and behavior specific to Catena-X
title: Policies in Catena-X
id: policies-in-catena
---

## Data Sovereignty in Catena-X

This page extends on the previous section's fundamentals and introduces conventions specific to the Catena-X Dataspace.
It assumes basic knowledge on `Policies` and their processing. Please go back to [the fundamentals](working-with-policies.md)
if that's unfamiliar.

Catena-X recommends to focus on `permission` property to further specify the contracts' details. In general,
every data provider can decide on his or her own under which conditions their data datasets (assets) are shared in the
network. In practice, this works as long as both parties, Provider and Consumer, have the same understanding of its
legal meaning. Therefore, standardized such `Constraint`s with their `leftOperand`s and `rightOperand`s are key for
automation. Still, individual freedom of contract is a very high good and is still possible.

This guidance is however also relevant for Enablement Service Providers building components enabling connectivity to the
Dataspace (as specified in CX-0018). The authoritative resource for schemas is
the [Catena-X ODRL Profile](https://github.com/catenax-eV/cx-odrl-profile). It is also available via the [Policy Hub](https://github.com/eclipse-tractusx/policy-hub/blob/main/docs/technical-documentation/requests/example-requests.md)
that is operated centrally. The API is documented in this Repository and can be accessed with an access token to the
Portal. It's a convenience feature for the negotiating parties to check if a given offer matches the policy constraints
agreed by the Catena-X association - for instance by keeping a definite list of valid `rightOperands` to a particular
`leftOperand` in a `Constraint`.

As mentioned in the primer on policies, Providers and Consumers must have a common
understanding of the meaning and consequences of `odrl:Offers` and, on a more granular level, their `odrl:Constraints`.
That's why there is a set of predefined `odrl:Constraints` - all of which have to
be [accepted explicitly](working-with-policies.md#consumer-side-odrloffer-in-a-contractrequestmessage) and
some [checked against a Consumer's VP](working-with-policies.md#provider-side-checking-a-consumers-verifiable-presentation)
additionally. They are formalized in the [Catena-X ODRL profile](https://github.com/catenax-eV/cx-odrl-profile)
which extends the regular [ODRL vocabulary](https://www.w3.org/TR/odrl-vocab/). Since usage or contract policies are
highly dependent on the use case,
they are described by them in their associated KITs and only general elements are explained in the following.

Here's a non-normative overview of these extensions:

### Data Exchange Governance

The FrameworkAgreement references the legally binding Data Exchange Governance document set up by the Catena-X association. It
governs the _"who, with whom, what, where from and where to, why, how, and when"_ of Data Sharing in Catena-X
([Source](https://catena-x.net/en/catena-x-introduce-implement/governance-framework-for-data-space-operations)).
It is roughly structured along the lines of business scenarios under which a set of business partners
want to exchange data.

Each Participant commits to the Data Exchange Governance during Onboarding. They are granted a set of VCs as proof of
that commitment. Consequently, the FrameworkAgreement Constraint belongs to the kind of `odrl:Constraint`s that have to be
[checked against a VP](working-with-policies.md#provider-side-checking-a-consumers-verifiable-presentation). The
details are listed in the most current version of standard
[CX-0050 Framework Credential](https://catena-x.net/de/standard-library).
The Governance Framwork is referred to in a machine-readable way in a Provider's Offers. When a Consumer starts the
negotiation for said offer, not only will the Policy in the `ContractRequestMessage` be checked but also their
Credentials. Here's an example of an `odrl:Constraint` referencing the Data Exchange Governance and invoking the VC-check:

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "odrl:leftOperand": "https://w3id.org/catenax/policy/FrameworkAgreement",
  "odrl:operator": {
    "@id": "odrl:eq"
  },
  "odrl:rightOperand": "DataExchangeGovernance:1.0"
}
```

### Usage Purposes

Purposes are published in [CX ODRL Profile](https://github.com/catenax-eV/cx-odrl-profile) and restrict the purpose the Consumer is privileged to use the
obtained data for. Unlike a Use Case Framework Constraint, the purposes are NOT checked against VCs, thus necessary
for a successful negotiation mechanism is
only [the Consumer's consent to the Offer](working-with-policies.md#consumer-side-odrloffer-in-a-contractrequestmessage).
Versions for UsagePurpose `rightOperand`s are typically 1-digit.

Here's an example from the Use Case Framework Traceability:

| Predefined Policy                | Typically used where? | Predefined Purpose                                                                                                                                        |
|----------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cx.core.qualityNotifications:1` | Notification API      | The data can be used for quality analysis to identify and select affected components and to send quality notifications to affected customers or suppliers |

A `odrl:Constraint` referencing this purpose looks like this:

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "odrl:leftOperand": "https://w3id.org/catenax/policy/UsagePurpose",
  "odrl:operator": {
    "@id": "odrl:eq"
  },
  "odrl:rightOperand": "cx.core.qualityNotifications:1"
}
```

### Contract References

Contract References by default aren't checked against credentials either. They are a vehicle to refer to contracts that
are not governed by the Catena-X association - for instance bilaterally. Referencing such a contract's identifier can
be achieved via an `odrl:Constraint` like this:

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "odrl:leftOperand": "https://w3id.org/catenax/policy/ContractReference",
  "odrl:operator": {
    "@id": "odrl:eq"
  },
  "odrl:rightOperand": "contract-123456789"
}
```

### Chaining Constraints

If a Policy is supposed to hold multiple constraints, Data Providers may chain them via a logical AND. This can be
achieved via an `odrl:and` object encapsulating multiple other `odrl:Constraint`s or entering a list of them
into the `odrl:constraint` property. The example below contains both versions.

Constraints that are supposed to be checked with a logical OR should be published as separate Data Offers.

## Example

This specific Catalog contains one single `dcat:Dataset`, called "json-1-paper". It is the only entry in the top-level
`dcat:dataset` property. To access this Dataset, the Consumer can choose between two Offers (see the `odrl:hasPolicy`
property):

- `"Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMg==:anNvbi0xLXBhcGVy:ZDA4ZDM5OTgtOGY5ZS00MzBmLThjZDEtZmYwOWQxMmQxYzk5"`
- `"Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMQ==:anNvbi0xLXBhcGVy:ODFkMDI2MWYtNDNlNi00ZTIxLWJkMWYtZmFmZTI3MWQwYzhj"`

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
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
