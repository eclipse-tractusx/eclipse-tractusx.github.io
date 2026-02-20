---
sidebar_position: 2
description: General Information on EDC Policies
title: Working with Policies
id: working-with-policies
---

## Working with Policies

This section includes some general remarks on the concept of `Policies` and how they are treated in the Connector.
The entire page is independent of the conventions in the Catena-X dataspace.

Policies are a formalization of the terms under which a *Provider* extends an offer to the dataspace. The
[Dataspace Protocol Specification][dsp-url] has selected the [Open Digital Rights Language (ODRL)][odrl-url]
as a formalism and vocabulary to describe such offers. This site exclusively cover the topic of policies in the
sense of the dataspace protocol. The connector also uses ODRL policies to restrict visibility on contract offers - calling
them *Access Policies*. Selecting the right *Access Policies* is a matter of the individual provider and not
regulated by the dataspace. Doing it properly however is essential to comply with fundamental anti-trust and information
security requirements.

Like all payloads that get passed between connectors, ODRL is an RDF-based description language that is on the wire
serialized as JSON-LD. JSON-LD is namespace-aware JSON with a couple of twists that one should be aware of when working
with it (like "Structures may be semantically equivalent even though, schematically, they are clearly not"). ODRL
enables a provider to be very specific when it comes to the usage of data: What may a consumer do with it? What
obligations does a consumer incur when accepting the offer?

The first time the Consumer encounters a Policy is when evaluating a provider's *Catalog*. It contains *Datasets* which
represent a *Contract Offer* with a policy of `@type` `odrl:Set` which is a [subclass][policy-set-url] of `odrl:Policy`.
The content of the policy is contained in the `odrl:permission`, `odrl:prohibition` and `odrl:obligation` properties.
They hold `odrl:Rules` that specify the contract details associated with the offer. There's two things that happen when
a consumer starts to negotiate for a contract offer.

### Consumer-side: `odrl:Offer` in a `ContractRequestMessage`

Firstly, when transmitting a `ContractRequestMessage`, the consumer must signify consent to the policy by including it in
the request and adding the `odrl:target` property on the level of an `odrl:Offer`. It is a very, very bad idea to simply
copy the next-best contract offer from the catalog and replay it to the provider. Instead, consumers must perform internal
checks which (if any) contract offer proposes terms that they want to agree to. It is possible (though not usual) to
encode obligations in the in an `odrl:Offer` that a consumer must satisfy. Returning a `ContractRequestMessage` to the
provider, echoing the pricing information, would represent a legally binding agreement in accordance to the conditions
proposed by the provider's contract offer. Thus, selecting a contract offer extended by a provider company should thus be
handled with appropriate care.

The provider will usually accept the contract request only if the extended policy is semantically equivalent to his own
as distributed via the catalog.

### Provider-side: Checking a consumer's `Verifiable Presentation`

In addition to checking the contract request (as described above), a providers' connector queries the consumers'
`Verifiable Presentation (VP)`. A VP is a set of `Verifiable Credentials (VCs)` that a consumer may have been issued by a
trusted third party. In this VC, a provider may find additional information if a consumer is eligible to pass a certain
`odrl:Constraint`. Transfer of VPs is handled automatically between the participants' wallets by means of the
[`Decentralized Claims Protocol (DCP)`][dcp-url].

If, for example, the Consumer tries to negotiate for a contract offer that is extended only to interested
parties from civil society (like an NGO), simply pretending to be an NGO shouldn't be enough. It has to be verified and
can be verified with help of the VP. For that, a `NonGovernmentalOrganizationCredential` could be issued during the
onboarding process according to the role a participant assumes in the dataspace.

A contract offer containing an `odrl:Use` permission with an `odrl:Constraint` could (in a hypothetical scenario) look
like this:

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
        "and": [
          {
            "leftOperand": "https://w3id.org/some-dataspace/role",
            "operator": "eq",
            "rightOperand": "NonGovernmentalOrganizationCredential"
          }
        ]
      ]
    }
  ],
  "obligation": [],
  "prohibition": []
}
```

The constraint would in that case be checked against the `type` property of the VC like in this example VC.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/mydataspace/credentials/v1.0.0"
  ],
  "id": "1f36af58-0fc0-4b24-9b1c-e37d59668089",
  "type": [
    "VerifiableCredential",
    "NonGovernmentalOrganizationCredential"
  ],
  "issuer": "did:web:com.example.issuer",
  "issuanceDate": "2021-06-16T18:56:59Z",
  "expirationDate": "2022-06-16T18:56:59Z",
  "credentialSubject": {
    "id": "did:web:com.example.participant",
    "holderIdentifier": "BPNL000000001"
  }
}
```

A provider connector has appropriate logic to extract relevant information from the VP and the policy to compare the
relevant properties.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- SPDX-FileCopyrightText: 2026 Cofinity-X GmbH
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view/working-with-policies.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view/working-with-policies.md)

[dcp-url]: https://github.com/eclipse-dataspace-dcp/decentralized-claims-protocol

[dsp-url]: https://github.com/eclipse-dataspace-protocol-base/DataspaceProtocol

[odrl-url]: https://www.w3.org/TR/odrl-model

[policy-set-url]: https://www.w3.org/TR/odrl-model/#policy-set
