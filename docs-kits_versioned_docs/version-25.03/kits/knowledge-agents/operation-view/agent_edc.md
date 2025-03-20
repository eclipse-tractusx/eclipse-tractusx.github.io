---
sidebar_position: 2
title: Agent-Enabled Dataspace Connector
---

<!--
 * Copyright (c) 2021 T-Systems International GmbH
 * Copyright (c) 2021 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
 * Copyright (c) 2021 Mercedes-Benz AG
 * Copyright (c) 2021 ZF Friedrichshafen AG
 * Copyright (c) 2021 SAP SE
 * Copyright (c) 2021 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This documentation and the accompanying materials are made available under the
 * terms of the Creative Commons Attribution 4.0 International License,  which is available at
 * https://creativecommons.org/licenses/by/4.0/legalcode.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: CC-BY-4.0
-->

For participating in Semantic-Web Driven Dataspace Applications following the Catena-X Knowledge Agents Standard, it is recommended to deploy an [Agent-Plane](https://github.com/eclipse-tractusx/knowledge-agents-edc/tree/main/docs/README.md) alongside of an existing [Tractus-X EDC](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/README.md)

For more information see

- Our [Adoption](../adoption-view/intro) guidelines
- The [Implementation](../development-view/architecture) documentation
- The [Deployment](deployment) overview
- The [Conformity](testbed) testbed
- A [Data Sovereignity & Graph Policy](policy) discussion

## Quick Setup Guide for Agent-Enabled EDC (KA-EDC)

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses the postgresql-hashicorp variant but abstracts away from customer, vault and idta settings - we use yaml star references such as *vaultsettings* and *idtasettings* for that purpose, see [here](https://github.com/eclipse-tractusx/knowledge-agents-edc/tree/main/docs/README.md) for more options and full details).

```yaml
- name: tractusx-connector
  alias: my-connector
  repository: https://eclipse-tractusx.github.io/charts/dev
  version: 0.7.3
- name: agent-plane
  alias: my-agent-plane
  repository: https://eclipse-tractusx.github.io/charts/dev
  version: 1.14.24
```

Then configure the connector in the values.yaml

```yaml
my-connector:
  fullNameOverride: "my-connector"
  participant:
    id: BPNL000000001234
  iatp: *iatpsettings
  postgresql: *postgresqlsettings
  vault: *vaultsettings
  controlplane: &myControlPlane
    endpoints:
      management:
        authKey: *customerApiKey
    bdrs:
      server:
        url: *bdrsUrl
    ingresses:
     - enabled: true
       hostname: "my-connector-control.domain"
       endpoints:
         - protocol
         - management
         - api
       tls:
        enabled: true
       certManager:
        clusterIssuer: *clusterIssuer
    env:
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_URL: http://my-agent-plane:8087/api/signaling/v1/dataflows
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_SOURCETYPES: cx-common:Protocol?w3c:http:SPARQL,cx-common:Protocol?w3c:http:SKILL
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_TRANSFERTYPES: HttpData-PULL
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_DESTINATIONTYPES: HttpProxy
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_PROPERTIES: '{ "publicApiUrl": "https://my-agent.domain/api/public/" }'
  dataplane:
    token: &tokens
      signer:
        privatekey_alias: *customerTokenKey
      verifier:
        publickey_alias: *customerTokenCert

my-agent-plane:
  fullNameOverride: "my-agent-plane"
  url:
    public: ""
  participant:
    id: *customerBpn
  iatp: *iatpsettings
  postgresql: *postgresqlsettings
  vault: *vaulsettings
  controlplane: *myControlPlane
  token: *tokens
  auth: {}
  ingresses:
   - enabled: true
     hostname: "my-agent-domain"
     endpoints:
      - public
      - default
     tls:
      enabled: true
     certManager:
      clusterIssuer: *clusterIssuer
  configs:
    dataspace.ttl: |-
        ################################################
        # Catena-X Agent Bootstrap
        ################################################
        @prefix : <GraphAsset?local=Dataspace> .
        @prefix cx-core: <https://w3id.org/catenax/ontology/core#> .
        @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        @prefix bpnl: <bpn:legal:> .
        @base <GraphAsset?local=Dataspace> .

        bpnl:BPNL00000PARTNER cx-common:hasBusinessPartnerNumber "BPNL00000PARTNER"^^xsd:string;
                            cx-common:hasConnector <edcs://{{partnerConnectorHost}}>.

        bpnl:BPNL000000001234 cx-common:hasBusinessPartnerNumber "BPNL000000001234"^^xsd:string;
                            cx-common:hasConnector <edcs://my-connector-control>.
  agent:
    synchronization: 360000
    connectors:
      BPNL00000PARTNER: https://{{partnerConnectorHost}}
      BPNL000000001234: https://my-connector-control.domain
```

## Quick Setup Guide for Registering A Skill

A skill is a "stored" dataspace procedure that is offered and executed by agent (planes). In the following, we demonstrate the steps to register one by interacting with the EDC Control Plane Management API and the EDC Data Plane Agent Endpoint

### 1. Register A Skill Policy

The following example installs a policy which is just checking the business partner numbers and dataspace memberships
of the participants. For more realistic policies aligned with the data sovereignity rules/profiles, see [this discussion](policy).

```console
curl --location --globoff 'https://my-connector-control.domain/management/v2/policydefinitions' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Policy?me=Skill",
  "policy": {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Set",
    "uid": "https://w3id.org/catenax/ontology/common#Policy?me=Skill",
    "permission": [
      {
        "target": "https://w3id.org/catenax/ontology/common#SkillAsset?me=",
        "action": "USE",
        "constraint": {
           "@type": "LogicalConstraint",
           "or" : [
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "BPNL00000PARTNER"
              },
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "BPNL000000001234"
              }
            ]
        }
     }]
    }
}
'
```

### 2. Register A Skill Contract

The following contract definition exposes upcoming (skill) assets under the previously installed (skill) policy.
It does that for both catalogue/offer requests (access policy) and actual agent-based transfers (contract policy). Usually,
this makes sense as the party being able to receive and offer should also be able to negotiate a transfer to (here: execute) it.
Note that this contract foresees a "custom" asset property "cx-common:publishedUnderContract" with which all agent assets can be explictely "assigned"
to a contract.

```console
curl --location --globoff 'https://my-connector-control.domain/management/v2/policydefinitions' \
--header 'X-Api-Key: {{customerApiKey}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?me=Skill",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?me=Skill",
    "contractPolicyId": "Policy?me=Skill",
    "assetsSelector" : [
     {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?me=Skill"
    }
    ]
}
'
```

### 3. Register a Skill Asset

In the next step, we install a stored procedure which traverses the dataspace from the consumer (=skill executor) over an partner oem (providing telematics data and connecting to its suppliers) to a yet unknown supplier (providing a functional graph to perform a prognosis).
This skill is the so-called Remaining Useful Life Skill - see the other concrete Graph definitions in this section of the Kit. It requires the partner oem to offer (and federate) at least one corresponding [(Data) Graph Asset](provider) to the consumer. It also requires a supplier to offer (and federate) at least one corresponding [(Function) Graph Asset](provider) to the partner oem. Correspondence in this regard means that the definition claims the assets to implement certain ontologies (rdfs:isDefinedBy <https://w3id.org/catenax/ontology/reliability>). We will show a more advanced way of asset binding/constraining in the following.

Note that we use the "distributionMode=ALL" parameter to annotate that this skill may be executed both by the "my-agent.domain" (in the so-called PROVIDER mode - see below) as well as by any remotely executing business partner's agent (in the so-called CONSUMER mode see below).
Note that we use the "contract=Contract%3Fme%3DSkill" parameter to assign this skill to above contract (and policy).
Note also that we have deployed the agent plane before without specific authentication ("auth: {}") such that we do not have to add any authentication header in the following calls. Please see  [here](https://github.com/eclipse-tractusx/knowledge-agents-edc/tree/main/docs/README.md) for how to enable, e.g. JWT/Oauth2 Based authentication and authorization for this endpoint.

The result will be that in the associated connector/control plane, a new asset "cx-taxo:SkillAsset?provider=RemainingUsefulLife" is created that can be accessed by "my-agent" as well as any other interested party eligible for the "Contract?me=Skill" contractdefinition.

```console
curl --location --globoff 'https://my-agent.domain/api/agent/skill?asset=cx-taxo%3ASkillAsset%3Fprovider%3DRemainingUsefulLife&distributionMode=ALL&contract=contract=Contract%3Fme%3DSkill' \
--header 'Content-Type: application/sparql-query' \
--data-raw 'PREFIX cx-common:       <https://w3id.org/catenax/ontology/common#>
PREFIX cx-core:         <https://w3id.org/catenax/ontology/core#>
PREFIX cx-vehicle:      <https://w3id.org/catenax/ontology/vehicle#>
PREFIX cx-reliability:  <https://w3id.org/catenax/ontology/reliability#>
PREFIX cx-behaviour:    <https://w3id.org/catenax/ontology/behaviour#>
PREFIX rdf:             <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:            <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd:             <http://www.w3.org/2001/XMLSchema#>
PREFIX json:            <https://json-schema.org/draft/2020-12/schema#>
PREFIX bpnl:            <bpn:legal:>

################################################################
# Sample for a Federated (Consumer-Deployed) SparQL Skill which
#  - Jumps into an OEM-owned reliability asset given a set of candidate VANs
#  - Feeds the gathered data back into the respective supplier connector/agent
#.   to perform a health indication
# Author: cgjung
# (c) 2023 Catena-X assocation
################################################################

SELECT ?vehicle ?van ?aggregate ?assembly ?supplier ?lc ?operatingTime ?mileage ?recordDate ?ls_type ?ls_name ?ls_value ?ls_unit ?ls_method ?ls_channels ?ls_classes ?ls_values ?distanceKm ?timeHours WHERE {

  VALUES (?van ?aggregate ?ls_type) {
      ("@van"^^xsd:string "Differential Gear"^^xsd:string "GearOil"^^xsd:string)
  }

  bpnl:BPNL00000PARTNER cx-common:hasConnector ?oemEDC.
  ?oemEDC cx-common:offers [ rdfs:isDefinedBy <https://w3id.org/catenax/ontology/reliability>; cx-common:id ?reliabilityAssetId].

  SERVICE ?oemEDC {
      GRAPH ?reliabilityAssetId {
        ?vehicle rdf:type cx-vehicle:Vehicle;
            cx-vehicle:vehicleIdentificationNumber ?van.

        ?assembly rdf:type cx-vehicle:Part;
            cx-vehicle:name ?aggregate;
            cx-vehicle:isPartOf ?vehicle;
            cx-vehicle:supplier ?supplier.

        ?teleAnalysis rdf:type cx-reliability:Analysis;
            cx-reliability:analysedObject ?assembly;
            cx-reliability:operatingHoursOfVehicle ?operatingTime;
            cx-reliability:mileageOfVehicle ?mileage;
            cx-core:startDateTime ?recordDate;
            cx-reliability:result [
                cx-core:id ?ls_type;
                cx-core:name ?ls_name;
                cx-reliability:countingValue ?ls_value;
                cx-reliability:countingUnit ?ls_unit;
                cx-reliability:countingMethod ?ls_method;
                cx-reliability:channels ?ls_channels;
                cx-reliability:classes ?ls_classes;
                cx-reliability:values ?ls_values
            ].
    } # OEM#GRAPH

    ?supplier cx-common:hasConnector ?supplierEDC.
    ?supplierEDC cx-common:offers [ rdfs:isDefinedBy <https://w3id.org/catenax/ontology/behaviour>; cx-common:id ?prognosisAssetId].

    SERVICE ?supplierEDC {
        GRAPH ?prognosisAssetId {
            ?invocation a cx-behaviour:RemainingUsefulLife;
                    cx-behaviour:sender bpnl:BPNL00000003AYRE;
                    cx-behaviour:senderConnector ?oemEDC;
                    cx-behaviour:recipient ?supplier;
                    cx-behaviour:recipientConnector ?supplierEDC;
                    cx-behaviour:targetDate ?recordDate;
                    cx-behaviour:timeStamp ?recordDate;
                    cx-behaviour:component "GearBox";
                    cx-behaviour:statusDate ?recordDate;
                    cx-behaviour:statusOperatingHours ?operatingTime;
                    cx-behaviour:statusMileage ?mileage;
                    cx-behaviour:countingValue ?ls_value;
                    cx-behaviour:countingUnit ?ls_unit;
                    cx-behaviour:countingMethod ?ls_method;
                    cx-behaviour:headerChannels ?ls_channels;
                    cx-behaviour:bodyClasses ?ls_classes;
                    cx-behaviour:bodyCountsList ?ls_values;
                    cx-behaviour:remainingOperatingHours ?timeHours;
                    cx-behaviour:remainingRunningDistance ?distanceKm.
        } # SUPPLIER#GRAPH
    } # SUPPLIER#CATALOG

  } # OEM#CATALOG

} # SELECT
'
```

## Quick Setup Guide for Calling A Skill

We demonstrate in the following how the above Skill (stored procedure) can be executed hereby invoking agent-protocol based transfers
between the involved EDC's. In each call, we demonstrate how to perform a batch binding, i.e. the Skill is called with a complete set of bound parameters.

### Calling A Locally Deployed Skill

If using an local assetid (SkillAsset?provider=RemainingUsefulLife), the agent can directly access any skill that has been registered in its own connector.

```console
curl --location --globoff 'https://my-agent.domain/api/agent?asset=cx-taxo%3ASkillAsset%3Fsupplier%3DRemainingUsefulLife' \
--header 'Content-Type: application/sparql-results+json' \
--header 'Accept: application/json' \
--data '{
    "head": {
        "vars": [
            "van"
        ]
    },
    "results": {
        "bindings": [
            {
                "van": {
                    "type": "literal",
                    "value": "FNLQNRVCOFLHAQ"
                }
            },
            {
                "van": {
                    "type": "literal",
                    "value": "FGPTXINYZAVJYK"
                }
            },
            {
                "van": {
                    "type": "literal",
                    "value": "DVAJDTLJMKKZGY"
                }
            }
        ]
    }
}'
```

### Calling A Skill (on the Provider Side)

If assuming that the skill has not been registered/stored in our connector, but in a partner/provider connector, we can use a "global" asset id
which starts with the URL of the partner connector's dsp endpoint. Furthermore, we are able to
choose a run mode by the parameter "runMode=provider". In this case, the consumer agent will negotiate with the provider agent to
execute the skill in the provider connector. When we choose "runMode=consumer" instead, the consumer agent will try to "download" the skill
to the consumer connector and executes it there.

```console
curl --location --globoff 'https://my-agent-domain/api/agent?asset=https%3A%2F%2F{{partnerConnectorHost}}%23cx-taxo%3ASkillAsset%3Fprovider%3DRemainingUsefulLife&runMode=provider' \
--header 'Content-Type: application/sparql-results+json' \
--header 'Accept: application/json' \
--data '{
    "head": {
        "vars": [
            "van"
        ]
    },
    "results": {
        "bindings": [
            {
                "van": {
                    "type": "literal",
                    "value": "FNLQNRVCOFLHAQ"
                }
            },
            {
                "van": {
                    "type": "literal",
                    "value": "FGPTXINYZAVJYK"
                }
            },
            {
                "van": {
                    "type": "literal",
                    "value": "DVAJDTLJMKKZGY"
                }
            }
        ]
    }
}'
```

## Advanced Skills

In the [Ontology Modelling Guide](../development-view/modelling) we have demonstrated that a graph (i.e. the (virtual) set of triples comprising the data or function) can not only be described by ontologies (see the above skill making use of the rdfs:isdefinedBy property/predicate), but also by a shape (the sh:shapesGraph property and its resolutions into the cx-sh:shapeObject predicate can be seen much like a statistics which lists the extremal values and distinct counts inside the columns of a table). In the following we
demonstrate a more flexible Behaviour Prognosis Skill which will switched between different data and function assets (and hence business partners in the dataspace) depending on the @resultType that should be achived. The relevant shape definitions which make this skill worki can be found in the [Provider Operation Guide](provider)

```console
curl --location --globoff 'https://my-agent.domain/api/agent/skill?asset=cx-taxo%3ASkillAsset%3Fprovider%3DBehaviourPrognosis&distributionMode=ALL&contract=contract=Contract%3Fme%3DSkill' \
--header 'Content-Type: application/sparql-query' \
--data-raw 'PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX json: <https://json-schema.org/draft/2020-12/schema#> 
PREFIX cx-sh: <https://w3id.org/catenax/ontology/schema#>
PREFIX cx-common: <https://w3id.org/catenax/ontology/common#> 
PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
PREFIX cx-reliability: <https://w3id.org/catenax/ontology/reliability#> 
PREFIX cx-schema: <https://w3id.org/catenax/ontology/schema#>
PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
PREFIX cx-behaviour: <https://w3id.org/catenax/ontology/behaviour#>
PREFIX cx-taxo: <https://w3id.org/catenax/taxonomy#>

################################################################
# Sample for a Provider-Deployed Goal-Oriented SparQL Skill which
#  - Depending on the targetted result
#  - Finds the right supplier prognosis asset and its preconditions
#  - jumps into the OEM-owned reliability asset to obtain the required data
#  - feeds the gathered data back into the respective supplier connector/agent 
#    to perform a behavioural prognosis
# Author: cgjung
# (c) 2023-2024 Catena-X assocation
################################################################

SELECT DISTINCT ?van ?supplier ?vehicle ?assembly ?operatingTime ?mileage ?prognosis WHERE {

  VALUES (?van ?aggregate ?result_type) { 
      ("@van"^^xsd:string "Differential Gear"^^xsd:string <@resultType>) 
  }

  # Determine the prognosis assets
  ?output sh:path ?result_type.
  ?output cx-sh:outputOf ?functionShape. 
  ?assetFunction cx-sh:shapeObject ?functionShape.
  ?functionConnector cx-common:offers ?assetFunction.
  ?functionShape cx-sh:extensionOf* ?parentFunctionShape.
  ?functionShape sh:targetClass ?function.
  ?parentFunctionShape sh:property ?functionProperty.
  ?functionProperty cx-sh:hasAsArgument ?argument.
  ?functionProperty sh:in ?parameters.
  ?parameters rdf:rest*/rdf:first ?ls_type.

  # Determine the target
  ?assetData cx-sh:shapeObject ?nodeShape.
  ?dataConnector cx-common:offers ?assetData.
  ?nodeShape sh:property ?propertyShape.
  ?propertyShape sh:path ?argument. 
  ?propertyShape sh:in ?parameters_target.
  ?parameters_target rdf:rest*/rdf:first ?ls_type.

  SERVICE ?dataConnector { 
    GRAPH ?assetData { 
        ?vehicle rdf:type cx-vehicle:Vehicle;
            cx-vehicle:vehicleIdentificationNumber ?van.

         ?assembly rdf:type cx-vehicle:Part;
            cx-vehicle:name ?aggregate;
            cx-vehicle:isPartOf ?vehicle;
            cx-vehicle:supplier ?supplier.
            
         ?teleAnalysis rdf:type cx-reliability:Analysis;
             cx-reliability:analysedObject ?assembly;
             cx-reliability:operatingHoursOfVehicle ?operatingTime;
             cx-reliability:mileageOfVehicle ?mileage;
             cx-core:startDateTime ?recordDate;
             cx-reliability:result [
                 cx-core:id ?ls_type;
                 cx-core:name ?ls_name;
                 cx-reliability:countingValue ?ls_value;
                 cx-reliability:countingUnit ?ls_unit;
                 cx-reliability:countingMethod ?ls_method;
                 cx-reliability:channels ?ls_channels;
                 cx-reliability:classes ?ls_classes;
                 cx-reliability:values ?ls_values
             ].
     }
  }

  SERVICE ?functionConnector {
    GRAPH ?assetFunction { 
      SELECT ?prognosis WHERE {
        ?invocation a ?function;
              cx-behaviour:sender <bpn:legal:BPNLOEM>;
              cx-behaviour:senderConnector <edc://sender>;
              cx-behaviour:recipient <bpn:legal:BPNLSUPPLIER>;
              cx-behaviour:recipientConnector <edc://recipient>;
              cx-behaviour:targetDate ?recordDate;
              cx-behaviour:timeStamp ?recordDate;
              cx-behaviour:component ?assembly;
              cx-behaviour:observationType ?ls_type;
              cx-behaviour:statusDate ?recordDate;
              cx-behaviour:statusOperatingHours ?operatingTime;
              cx-behaviour:statusMileage ?mileage;
              cx-behaviour:countingValue ?ls_value;
              cx-behaviour:countingUnit ?ls_unit;
              cx-behaviour:countingMethod ?ls_method;
              cx-behaviour:headerChannels ?ls_channels;
              cx-behaviour:bodyClasses ?ls_classes;
              cx-behaviour:bodyCountsList ?ls_values;
              ?result_type ?prognosis.
      }
    }
  } # SUPPLIER#CATALOG

} # SELECT
'
```

Here is an invocation which mimiques the original cx-taxo:SkillAsset?provider=RemainingUsefulLife on one vehicle
and performs a HealthIndication prognosis for another one in a single call.

```console
curl --location --globoff 'https://my-agent-domain/api/agent?asset=https%3A%2F%2F{{partnerConnectorHost}}%23cx-taxo%3ASkillAsset%3Fprovider%3DBehaviourPrognosis&runMode=provider' \
--header 'Content-Type: application/sparql-results+json' \
--header 'Accept: application/json' \
--data '{
    "head": {
        "vars": [
            "van",
            "resultType"
        ]
    },
    "results": {
        "bindings": [
            {
                "van": {
                    "type": "literal",
                    "value": "FNLQNRVCOFLHAQ"
                },
                "resultType": {
                    "type": "uri",
                    "value": "https://w3id.org/catenax/ontology/behaviour#RemainingUsefulLifeResult"
                }
            },
            {
                "van": {
                    "type": "literal",
                    "value": "FGPTXINYZAVJYK"
                },
                "resultType": {
                    "type": "uri",
                    "value": "https://w3id.org/catenax/ontology/behaviour#HealthIndicationResult"
                }
            }
        ]
    }
}'
```

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
