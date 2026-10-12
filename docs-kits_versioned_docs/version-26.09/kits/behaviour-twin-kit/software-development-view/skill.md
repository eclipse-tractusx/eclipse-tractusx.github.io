---
id: skill
title: Skill
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT banner](@site/static/img/kits/behavior-twin/behavior-twin-kit-logo.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT
  </div>
</div>

Applies to role: *skill provider* and *consumer*

## OVERVIEW

Skills, even for the same logic, can be defined in a variety of ways. Depending on the requirements of a use case, some approaches may be beneficial.

For the [template use cases](../use-cases/overview), there are different approaches shown:

- The **more straight forward approach** is shown in the [Remaining useful Life use case](../use-cases/rul/development-view/skill). There, **the skill knows the calculation function's type and its parameters**.

- The **more flexible approach** is shown in the [Health Indicator use case](../use-cases/hi/development-view/skill). There, **the skill resolves the function's input parameters and matches it with data assets**.

## SKILL REGISTRATION

It a skill should be provided, it has to be registered over the *Agent Plane API*. The registration is done by posting a parametrized SPARQL query as a string, and set the skill name.

```curl
curl --location '{{consumerAgentPlane}}/api/agent/skill?asset=SkillAsset?consumer=RemainingUsefulLife&distributionMode=CONSUMER&isFederated=false' \
--header 'Content-Type: application/sparql-query' \
--data-raw 'SELECT ?vehicle ?vin ?aggregate ?assembly ?supplier ?distanceKm ?timeHours WHERE {

  VALUES (?vin ?aggregate ?ls_type) {
      ("@vin"^^xsd:string "Differential Gear"^^xsd:string "GearOil"^^xsd:string)
  }

  bpnl:BPNL000000000OEM cx-common:hasConnector ?oemEDC .
  ?oemEDC cx-common:offers [ rdfs:isDefinedBy <https://w3id.org/catenax/ontology/reliability> ; cx-common:id ?reliabilityAssetId ] .

  SERVICE ?oemEDC {
      GRAPH ?reliabilityAssetId {

        ...
'
```

## SKILL INVOCATION

A registered skill is available over the *Agent Plane API* by the skill asset name (e.g. `RemainingUsefulLife`) and can be called also for a list of input variables:

```curl
curl --location '{{consumerAgentPlane}}/api/agent?asset=SkillAsset?consumer=RemainingUsefulLife' \
--header 'Content-Type: application/sparql-results+json' \
--data '{
    "head": { "vars": [ "vin" ] },
    "results": { "bindings": [
            { "vin": { "type": "literal", "value": "FNLQNRVCOFLHAQ" } },
            { "vin": { "type": "literal", "value": "FGPTXINYZAVJYK" } }
        ]
    }
}'
```

The results for the given VINs of the above example are provided as bindings for the requested variables in the skill itself and look like:

```json
{
  "head": {
    "vars": [
      "vehicle",
      "vin",
      "aggregate",
      "assembly",
      "supplier",
      "distanceKm",
      "timeHours"
    ]
  },
  "results": {
    "bindings": [
      {
        "vehicle": {
          "type": "uri",
          "value": "urn:uuid:8d6e2e3f-6798-4e1d-8eae-eb4318a7d487"
        },
        "vin": {
          "type": "literal",
          "value": "RGZCDKEJHDSNCB"
        },
        "aggregate": {
          "type": "literal",
          "value": "Differential Gear"
        },
        "assembly": {
          "type": "uri",
          "value": "urn:uuid:b6309b8a-20c0-4e7d-b782-a7c303bb7da4"
        },
        "supplier": {
          "type": "uri",
          "value": "bpn:legal:BPNL00000003B2OM"
        },
        "distanceKm": {
          "type": "literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#int",
          "value": "159633"
        },
        "timeHours": {
          "type": "literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#float",
          "value": "3127.4"
        }
      },
      {
        "vehicle": {
          "type": "uri",
          "value": "urn:uuid:79d19614-b699-4716-b232-ef250e1c1772"
        },
        "vin": {
          "type": "literal",
          "value": "FNLQNRVCOFLHAQ"
        },
        "aggregate": {
          "type": "literal",
          "value": "Differential Gear"
        },
        "assembly": {
          "type": "uri",
          "value": "urn:uuid:4773625a-5e56-4879-abed-475be29bd664"
        },
        "supplier": {
          "type": "uri",
          "value": "bpn:legal:BPNL00000003B2OM"
        },
        "distanceKm": {
          "type": "literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#int",
          "value": "180627"
        },
        "timeHours": {
          "type": "literal",
          "datatype": "http://www.w3.org/2001/XMLSchema#float",
          "value": "2058.1"
        }
      }
    ]
  }
}
```

If all the given VINs are not found on OEM side, a empty binding is returned:

```json
{
    "head": {
        "vars": [
            "vehicle",
            "vin",
            "aggregate",
            "assembly",
            "supplier",
            "distanceKm",
            "timeHours"
        ]
    },
    "results": {
        "bindings": []
    }
}
```
