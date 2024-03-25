---
sidebar_position: 2
description: 'Guidance on best practices'
title: Working with Policies
id: connector_kit_adoption_view_policies
---

## Working with Policies

Policies are a formalization of the terms under which a Provider extends an offer to the Dataspace. The format is given
by the Dataspace Protocol Specification: The [Open Digital Rights Language (ODRL)](https://www.w3.org/TR/odrl-model/).

Like all payloads that get exchanged between connectors, ODRL is an RDF-based description language that is on exchange
serialized as JSON-LD. JSON-LD is namespace-aware JSON with a couple of twists that one should be aware of when working
with it (like "Structures may be semantically equivalent even though, schematically, they are clearly not"). ODRL
enables a Provider to be very specific when it comes to the usage of data: What may a consumer do with it? What
obligations does a consumer incur when accepting the offer?

The first time the Consumer encounters a Policy is when evaluating a Provider's [Catalog](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/catalog/catalog.protocol), as displayed below.
This specific Catalog contains one single `dcat:Dataset`, called "json-1-paper". It is the only entry in the top-level
`dcat:dataset` property. To access this Dataset, the Consumer can choose between four Offers (see the `odrl:hasPolicy`
property):

- "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtNA==:anNvbi0xLXBhcGVy:Y2JhMGFmM2QtZTIwYi00ZjExLThlZmQtM2FhMzcyZmI1Nzhh"
- "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMg==:anNvbi0xLXBhcGVy:ZDA4ZDM5OTgtOGY5ZS00MzBmLThjZDEtZmYwOWQxMmQxYzk5"
- "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMw==:anNvbi0xLXBhcGVy:NDQ1ZWRlZDMtNjNlMy00ZDg0LTkxMmUtYWFjZWM0MjdkMDQ4"
- "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMQ==:anNvbi0xLXBhcGVy:ODFkMDI2MWYtNDNlNi00ZTIxLWJkMWYtZmFmZTI3MWQwYzhj"

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
          "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtNA==:anNvbi0xLXBhcGVy:Y2JhMGFmM2QtZTIwYi00ZjExLThlZmQtM2FhMzcyZmI1Nzhh",
          "@type": "odrl:Set",
          "odrl:permission": {
            "odrl:action": {
              "odrl:type": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": {
              "odrl:and": [
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/FrameworkAgreement",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "traceability:v1.0"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/ContractReference",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "contract-123456789"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/UsagePurpose",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "ID 3.1 Trace"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/edc/v0.0.1/ns/AgreetoWhatever",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "Yes"
                }
              ]
            }
          },
          "odrl:prohibition": [],
          "odrl:obligation": []
        },
        {
          "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMg==:anNvbi0xLXBhcGVy:ZDA4ZDM5OTgtOGY5ZS00MzBmLThjZDEtZmYwOWQxMmQxYzk5",
          "@type": "odrl:Set",
          "odrl:permission": {
            "odrl:action": {
              "odrl:type": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": {
              "odrl:and": [
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/FrameworkAgreement",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "traceability:v1.0"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/UsagePurpose",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "ID 3.1 Trace"
                }
              ]
            }
          },
          "odrl:prohibition": [],
          "odrl:obligation": []
        },
        {
          "@id": "Y29udHJhY3QtYmlsYXRlcmFsLXBhcGVyLWV4YW1wbGUtMw==:anNvbi0xLXBhcGVy:NDQ1ZWRlZDMtNjNlMy00ZDg0LTkxMmUtYWFjZWM0MjdkMDQ4",
          "@type": "odrl:Set",
          "odrl:permission": {
            "odrl:action": {
              "odrl:type": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": {
              "odrl:and": {
                "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/FrameworkAgreement",
                "odrl:operator": {
                  "@id": "odrl:eq"
                },
                "odrl:rightOperand": "traceability:v1.0"
              }
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
              "odrl:type": "http://www.w3.org/ns/odrl/2/use"
            },
            "odrl:constraint": {
              "odrl:and": [
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/FrameworkAgreement",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "traceability:v1.0"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/ContractReference",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "contract-123456789"
                },
                {
                  "odrl:leftOperand": "https://w3id.org/catenax/policy/v1.0.0/UsagePurpose",
                  "odrl:operator": {
                    "@id": "odrl:eq"
                  },
                  "odrl:rightOperand": "ID 3.1 Trace"
                }
              ]
            }
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
          "dcat:accessService": "911f5da0-c9ee-4259-9a95-39428d08f767"
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
    "@id": "911f5da0-c9ee-4259-9a95-39428d08f767",
    "@type": "dcat:DataService",
    "dct:terms": "connector",
    "dct:endpointUrl": "https://provider-dsp-end.point/api/v1/dsp"
  },
  "participantId": "PROVIDER-BPNL"
}

```

These four Offers are of `@type` either `odrl:Offer` or one of its subclasses. More interesting however are the
`odrl:permission`, `odrl:prohibition` and `odrl:obligation` properties. They contain `odrl:Rules` that have to be
satisfied by the Consumer. There's two ways that can happen.

### Consumer-side: `odrl:Offer` in a `ContractRequestMessage`

Firstly, when transmitting a [`ContractRequestMessage`](https://docs.internationaldataspaces.org/ids-knowledgebase/v/dataspace-protocol/contract-negotiation/contract.negotiation.protocol#id-2.1-contract-request-message)
(for example triggered via the EDC's [contract-negotiations API](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/05_contractnegotiations.md)), the
Consumer must signify consent to the Offer by including it in the Request and adding the `odrl:target` property on the
level of an `odrl:Offer`. It is a very, very bad idea to simply copy the next-best Offer from the Catalog and replay it
to the Provider. Instead, Consumers must perform internal checks which (if any) Offer proposes terms that they want to
agree to. It is possible (though not usual) to encode pricing information in an `odrl:Offer`. Sending a
`ContractRequestMessage` echoing the pricing information would represent a legally binding agreement in accordance to
the conditions proposed by the Provider's Offer. Thus, selecting an offer extended by a Provider company should thus be
handled with appropriate care.

The Provider will usually accept the ContractRequest only if the extended Offer is semantically equivalent to his own
as distributed via the Catalog.

### Provider-side: Checking a Consumer's Verifiable Presentation

In addition to checking the Offer's structure, Providers have the chance to query the Consumer's Verifiable Presentation.
There, they may find additional information if a Consumer is eligible to pass a certain `odrl:Constraint`. If, for
example, the Consumer tries to negotiate for an Offer that is extended only to interested parties from civil society
(like an NGO), simply pretending to be an NGO shouldn't be enough. It has to be verified.

For that, verifiable credentials (VCs) are issued during the onboarding process according to the role a Participant
assumes in the Dataspace. These VCs are presented by Consumers to Providers when initiating data exchange in the form
of verifiable presentations (VPs). For more on this, refer to standards CX-0018 and CX-0149.

#### Example

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
      "odrl:type": "http://www.w3.org/ns/odrl/2/use"
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

There could now be a credential with a property `https://w3id.org/some-dataspace/role` in the `credentialSubject`
object.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/mydataspace/credentials/v1.0.0"
  ],
  "id": "1f36af58-0fc0-4b24-9b1c-e37d59668089",
  "type": [
    "VerifiableCredential"
  ],
  "issuer": "did:web:com.example.issuer",
  "issuanceDate": "2021-06-16T18:56:59Z",
  "expirationDate": "2022-06-16T18:56:59Z",
  "credentialSubject": {
    "id": "did:web:com.example.participant",
    "holderIdentifier": "BPNL000000001",
    "https://w3id.org/some-dataspace/role": "NGO"
  }
}
```

A Provider Connector would have to have appropriate logic implemented to link the `odrl:Constraint` to the relevant data
expected in the verifiable credential.
