---
id: contracts-and-policies
title: Contracts and Policies
description: Behaviour Twin KIT
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="behavior-twin" />

Applies to roles: *skill provider*, *data provider*, *calculation service provider* and *delegator*

## OVERVIEW

*Data* and *calculation services* must be bound to the knowledge graph by *binding agents*. To make the bindings accessible to the Knowledge Agents, they must be registered as a *graph assets* at the EDC connector. In addition, when providing a skill, this must be registered as a *skill asset* at the EDC connector. For both cases, policies and contract definitions are also needed.

## GRAPH ASSETS

### GRAPH ASSET POLICY

The graph asset policy can be used by more than one graph asset. The policy refers to a *Use Case Framework Agreement*. There may be more requirements for policies within a use case.

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    {
      "edc": "https://w3id.org/edc/v0.0.1/ns/"
    },
    {
      "cx-policy": "https://w3id.org/catenax/policy/"
    }
  ],
  "@type": "PolicyDefinitionRequestDto",
  "@id": "GraphAsset?me=Policy&useCase=BehaviourTwin",
  "edc:policy": {
    "@type": "Set",
    "profile": "cx-policy:profile2405",
    "permission": [{
      "action": "use",
      "constraint": {
        "leftOperand": "cx-policy:FrameworkAgreement",
        "operator": "eq",
        "rightOperand": "behaviourtwin:1.0"
      }
    }]
  }
}
```

### GRAPH ASSET CONTRACT

The following contract refers to the previous defined graph policy and related graph assets:

```json
{
  "@context": {
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Contract?me=Graph",
  "@type": "ContractDefinition",
  "accessPolicyId": "Policy?me=Graph",
  "contractPolicyId": "Policy?me=Graph",
  "assetsSelector": {
    "@type": "CriterionDto",
    "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
    "operator": "=",
    "operandRight": "Contract?me=Graph"
  }
}
```

## SKILL ASSETS

### SKILL ASSET POLICY

The skill asset policy can be used by more than one skill asset. There may be more requirements for policies within a use case.

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Policy?me=Skill",
  "policy": {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Set",
    "uid": "https://w3id.org/catenax/ontology/common#Policy?me=Skill",
    "permission": [{
      "target": "https://w3id.org/catenax/ontology/common#SkillAsset?me=",
      "action": "USE",
      "constraint": {
        "@type": "LogicalConstraint",
        "or": [{
          "@type": "Constraint",
          "leftOperand": "BusinessPartnerNumber",
          "operator":"eq",
          "rightOperand": "BPNL00000PARTNER"
        },
        {
          "@type": "Constraint",
          "leftOperand": "BusinessPartnerNumber",
          "operator":"eq",
          "rightOperand": "BPNL000000001234"
        }]
      }
    }]
  }
}
```

### SKILL ASSET CONTRACT

The following contract refers to the previous defined skill policy and related skill assets:

```json
{
  "@context": {
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Contract?me=Skill",
  "@type": "ContractDefinition",
  "accessPolicyId": "Policy?me=Skill",
  "contractPolicyId": "Policy?me=Skill",
  "assetsSelector": [{
    "@type": "CriterionDto",
    "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
    "operator": "=",
    "operandRight": "Contract?me=Skill"
  }]
}
```

For more information, have a look at the [Agents KIT's Operation View](../../knowledge-agents-kit/operation-view/provider).
