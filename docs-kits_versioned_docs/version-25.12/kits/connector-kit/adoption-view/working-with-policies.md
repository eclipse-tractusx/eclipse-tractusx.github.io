---
sidebar_position: 2
description: General Information on EDC Policies
title: Working with Policies
id: working-with-policies
---

## Working with Policies

This section includes some general remarks on the concept of `Policies` and how they are treated in the EDC. The entire
page is independent of the conventions in the Catena-X Dataspace. For that, please check [Policies in Catena-X](policies-in-catena.md).

Policies are a formalization of the terms under which a Provider extends an offer to the Dataspace. The [Dataspace
Protocol Specification](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol)
has selected the [Open Digital Rights Language (ODRL)](https://www.w3.org/TR/odrl-model/) as a formalism and vocabulary to describe such offers.
This site (and its [specialization for Catena-X](policies-in-catena.md)) exclusively cover the topic of Policies in the
sense of the Dataspace Protocol. The EDC also uses ODRL-Policies to restrict visibility on Catalog-Entries - calling
them [Access Policies](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md#access--usage-policies). Selecting the right Access Policies is a matter of the individual Data Provider and not
regulated by the Dataspace. Doing it properly however is essential to comply with fundamental anti-trust and information
security requirements.

Like all payloads that get passed between connectors, ODRL is an RDF-based description language that is on the wire
serialized as JSON-LD. JSON-LD is namespace-aware JSON with a couple of twists that one should be aware of when working
with it (like "Structures may be semantically equivalent even though, schematically, they are clearly not"). ODRL
enables a Provider to be very specific when it comes to the usage of data: What may a consumer do with it? What
obligations does a consumer incur when accepting the offer?

The first time the Consumer encounters a Policy is when evaluating a Provider's [Catalog](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/catalog/catalog.protocol). It contains Offers
of `@type` `odrl:Set` which is a [subclass](https://www.w3.org/TR/odrl-model/#policy-set) of `odrl:Policy`.
All terms can be used interchangeably, Offer is most common. Their content is contained in the
`odrl:permission`, `odrl:prohibition` and `odrl:obligation` properties. They hold `odrl:Rules` that have to be
satisfied by the Consumer. There's two ways that can happen.

### Consumer-side: `odrl:Offer` in a `ContractRequestMessage`

Firstly, when transmitting a [`ContractRequestMessage`](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.protocol#id-2.1-contract-request-message)
(for example triggered via the EDC's [contract-negotiations API](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/05_contractnegotiations.md)), the
Consumer must signify consent to the Offer by including it in the Request and adding the `odrl:target` property on the
level of an `odrl:Offer`. It is a very, very bad idea to simply copy the next-best Offer from the Catalog and replay it
to the Provider. Instead, Consumers must perform internal checks which (if any) Offer proposes terms that they want to
agree to. It is possible (though not usual) to encode obligations in the in an `odrl:Offer` that a Consumer must
satisfy. Returning a `ContractRequestMessage` to the Provider, echoing the pricing information, would represent a
legally binding agreement in accordance to the conditions proposed by the Provider's Offer. Thus, selecting an offer
extended by a Provider company should thus be handled with appropriate care.

The Provider will usually accept the ContractRequest only if the extended Offer is semantically equivalent to his own
as distributed via the Catalog.

### Provider-side: Checking a Consumer's Verifiable Presentation

In addition to checking the Offer's structure (as above), Providers' Connectors have the chance to query the Consumer's
Verifiable Presentation (VP). A VP is a set of Verifiable Credentials (VCs) that a Consumer may have been issued by a
trusted third party. In this VC, a Provider may find additional information if a Consumer is eligible to pass a certain
`odrl:Constraint`. Transfer of VPs is handled automatically between the Participants' Identity Wallets by means of the
[IATP VPP](https://github.com/eclipse-tractusx/identity-trust/blob/main/specifications/verifiable.presentation.protocol.md).

If, for example, the Consumer tries to negotiate for an Offer that is extended only to interested
parties from civil society (like an NGO), simply pretending to be an NGO shouldn't be enough. It has to be verified and
can be verified with help of the VP. For that, a "NonGovernmentalOrganizationCredential" could be issued during the
onboarding process according to the role a Participant assumes in the Dataspace. For more on the interrelation between
Credentials and Constraints, refer to standards CX-0018 and CX-0149.

A offer containing a `odrl:Use` permission with a `odrl:Constraint` could (in a hypothetical scenario) look like this:

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtNA==:anNvbi0xLXBhcGVy:Y2JhMGFmM2QtZTIwYi00ZjExLThlZmQtM2FhMzcyZmI1Nzhh",
  "@type": "odrl:Set",
  "odrl:permission": {
    "odrl:action": {
      "odrl:type": {
        "@id": "http://www.w3.org/ns/odrl/2/use"
      }
    },
    "odrl:constraint": {
      "odrl:and": [
        {
          "odrl:leftOperand": "https://w3id.org/some-dataspace/role",
          "odrl:operator": {
            "@id": "odrl:eq"
          },
          "odrl:rightOperand": "NGO"
        }
      ]
    }
  },
  "odrl:prohibition": [],
  "odrl:obligation": []
}
```

The Constraint would in that case be checked against the `"type"` property, attesting the information that the presented
VC does in fact attest that the holder is a Non-Governmental Organization. A Provider Connector would have to have
appropriate logic implemented to extract relevant information from the VP to satisfy the `odrl:Constraint`.

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

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Contributors of the Eclipse Foundation
- Source
  URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
