---
id: Policy Definitions
title: Policy Definition
description: 'Connector Kit'
sidebar_position: 3
---

# Creating a Policy Definition

A policy is a declaration of a Data Consumer's rights and duties. Policies themselves make no statements about the
object that they may grant access and usage permission to. They are created at the EDC like this:

```http
POST /v3/assets HTTP/1.1
Host: https://provider-control.plane/api/management
X-Api-Key: password
Content-Type: application/json
```

```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinitionRequestDto",
  "@id": "{% uuid 'v4' %}",
  "policy": {
    "@type": "Policy",
    "odrl:permission": [
      {
        "odrl:action": "USE",
        "odrl:constraint": {
          "@type": "Constraint",
          "odrl:leftOperand": "BusinessPartnerNumber",
          "odrl:operator": {
            "@id": "odrl:eq"
          },
          "odrl:rightOperand": "BpnIntendedConsumer"
        }
      }
    ]
  }
}

```

In the EDC, policies are pure [ODRL (Open Digital Rights Language)](https://www.w3.org/TR/odrl-model/).
Like the payloads of the [Dataspace Protocol](#1-management-api-overview), they are written in JSON-LD. Even if the user
only has rudimentary knowledge of JSON-LD, the [policy playground](https://eclipse-tractusx.github.io/tutorial-resources/policy-playground/)
will provide a good starting point to start writing policies. It is important to keep in mind that the extensive ODRL-
context (that the EDC is aware of) allows for ergonomic reuse of the vocabulary in individual policies.

## Writing Policies for the EDC

ODRL's model and expressiveness surpass the EDC's current ability to interpret the policies and derive behavior from
them. This must be kept in mind even when Data Offers based on policies are not yet published to the Dataspace. Here again,
configuring the wrong policies is a risk for unsafe and incompliant behavior. This is exacerbated by the fact that
the EDC interprets policies it can't evaluate as true by default. A couple of examples:

### Let all pass
```json
{
  "@context": {
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@type": "PolicyDefinitionRequest",
  "@id": "{% uuid 'v4' %}",
  "policy": {
    "@type": "Policy",
    "odrl:permission": [
      {
        "odrl:action": "USE"
      }
    ]
  }
}
```

### Only let pass a Business Partner Group

A Business Partner Group is a group of BPNs that are allowed to pass this constraint. A BPN can be added
to a group even after a Contract Offer for a certain BPN-Group was published. For this, there's the EDC-Management-API 
`/business-partner-groups` endpoint offering CRUD-Operations.

```json
{
  "@context": {
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  },
  "@type": "PolicyDefinitionRequest",
  "@id": "{% uuid 'v4' %}",
  "policy": {
    "@type": "Set",
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "permission": [
      {
        "action": "use",
        "constraint": [
          {
            "leftOperand": "tx:BusinessPartnerGroup",
            "operator": "isPartOf",
            "rightOperand": "<group>"
          }
        ]
      }
    ]
  }
}

```

### Chaining Constraints

Constraints can be chained together via logical constraints. This is currently implemented for `odrl:and`, `odrl:or` 
and `odrl:xone` (exactly one constraint evaluates to `true`).

```json
{
  "@context": {
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  },
  "@type": "PolicyDefinitionRequest",
  "@id": "{{POLICY_ID}}",
  "policy": {
    "@type": "Set",
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "permission": [
      {
        "action": "use",
        "constraint": [
          {
            "@type": "LogicalConstraint",
            "and": [
              {
                "leftOperand": {
                  "@value": "<field>"
                },
                "operator": "eq",
                "rightOperand": "<value>"
              },
              {
                "leftOperand": "tx:BusinessPartnerGroup",
                "operator": "isPartOf",
                "rightOperand": "<group>"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

Some constraints trigger specific behavior in the EDC. That should be kept in mind when designing policies and requires an
understanding of how the EDC evaluates and acts upon them.