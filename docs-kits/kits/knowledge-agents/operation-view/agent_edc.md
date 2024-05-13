---
sidebar_position: 2
title: Agent-Enabled Dataspace Connector
---

<!--
 * Copyright (c) 2021,2023 T-Systems International GmbH
 * Copyright (c) 2021,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
 * Copyright (c) 2021,2023 Mercedes-Benz AG
 * Copyright (c) 2021,2023 ZF Friedrichshafen AG
 * Copyright (c) 2021,2023 SAP SE
 * Copyright (c) 2021,2023 Contributors to the Eclipse Foundation
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

For participating in Semantic-Web Driven Dataspace Applications following the Catena-X Knowledge Agents Standard, we recommend deploying an [Agent-Plane](https://github.com/eclipse-tractusx/knowledge-agents-edc/tree/main/docs/README.md) alongside of an existing [Tractus-X EDC](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/README.md)

For more information see

- Our [Adoption](../adoption-view/intro) guidelines
- The [Implementation](../development-view/architecture) documentation
- The [Deployment](deployment) overview
- The [Conformity](testbed) testbed
- A [Data Sovereignity & Graph Policy](policy) discussion

### Quick Setup Guide for Agent-Enabled EDC (KA-EDC)

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses the postgresql-hashicorp variant but abstracts away from vault and SSI settings - *vaultsettings and*ssisettings as well as the persistence config, see [here](https://github.com/eclipse-tractusx/knowledge-agents-edc/tree/main/docs/README.md) for more options and full details).

```yaml
- name: tractusx-connector
  alias: my-connector
  repository: https://eclipse-tractusx.github.io/charts/dev
  version: 0.7.0
- name: agent-plane
  alias: my-agent-plane
  repository: https://eclipse-tractusx.github.io/charts/dev
  version: 1.12.19
```

Then configure the connector in the values.yaml

```yaml
my-connector:
  participant:
    id: *customerBpn
  iatp:
    id: *customerDid
    trustedIssuers:
     - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
    sts:
      dim:
        url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
      oauth:
        token_url: *customerOauth
        client:
          id: *customerOauthClient
          secret_alias: *customerOauthSecret
  postgresql:
    jdbcUrl: *customerDbUrl
    auth:
      database: *customerDbName
      username: *customerDbUser
      password: *customerDbPass
  vault:
    azure: *azureVault
  controlplane: &myControlPlane
    endpoints:
      management:
        authKey: *customerApiKey
    bdrs:
      server:
        url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
    ingresses:
     - enabled: true
       hostname: *customerConnectorHost
       endpoints:
         - protocol
         - management
         - api
       tls:
        enabled: true
       certManager:
        clusterIssuer: *clusterIssuer
    env:
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_URL: http://*customerRelease-my-agent-plane:8087/api/signaling/v1/dataflows
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_SOURCETYPES: cx-common:Protocol?w3c:http:SPARQL,cx-common:Protocol?w3c:http:SKILL
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_TRANSFERTYPES: HttpData-PULL
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_DESTINATIONTYPES: HttpProxy
      EDC_DATAPLANE_SELECTOR_AGENTPLANE_PROPERTIES: '{ "publicApiUrl": "https://*customerAgentHost/api/public/" }'
      EDC_IAM_TRUSTED-ISSUER_0-ISSUER_ID: did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
  dataplane:
    token:
      signer:
        privatekey_alias: *customerTokenKey
      verifier:
        publickey_alias: *customerTokenCert
    env:
      EDC_IAM_TRUSTED-ISSUER_0-ISSUER_ID: did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp

my-agent-plane:
  url:
    public: ""
  participant:
    id: *customerBpn
  iatp:
    id: *customerDid
    trustedIssuers:
     - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
    sts:
      dim:
        url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
      oauth:
        token_url: *customerOauth
        client:
          id: *customerOauthClient
          secret_alias: *customerOauthSecret
  postgresql:
    jdbcUrl: *customerDbUrl
    auth:
      database: *customerDbName
      username: *customerDbUser
      password: *customerDbPass
  vault:
    azure: *azureVault
  connector: my-connector
  controlplane: *consumerControlPlane
  token:
    signer:
      privatekey_alias: *customerTokenKey
    verifier:
      publickey_alias: *customerTokenCert
  auth: {}
  ingresses:
   - enabled: true
     hostname: *customerAgentHost
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

        bpnl:{{PARTNERBPNL}} cx-common:hasBusinessPartnerNumber "{{PARTNERBPNL}}"^^xsd:string;
                            cx-common:hasConnector <edcs://{{partnerConnectorHost}}>.

        bpnl:{{MYBPNL}}      cx-common:hasBusinessPartnerNumber "MYBPNL"^^xsd:string;
                            cx-common:hasConnector <edcs://{{controlPlaneName}}>.
  agent:
    synchronization: 360000
    connectors:
      PARTNERBPNL: https://{{partnerConnectorHost}}
      MYBPNL: https://{{customerConnectorHost}}
```

### Quick Setup Guide for Registering A Skill

We demonstrate the steps by interacting with the EDC Control Plane Management API and the EDC Data Plane Agent Endpoint

#### Register A Skill Policy

```console
curl --location --globoff 'https://{{customerConnectorHost}}/management/v2/policydefinitions' \
--header 'X-Api-Key: {{EDC_API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#"
  },
  "@id": "Policy?oem=Skill",
  "policy": {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Set",
    "uid": "https://w3id.org/catenax/ontology/common#Policy?oem=Skill",
    "permission": [
      {
        "target": "https://w3id.org/catenax/ontology/common#SkillAsset?oem=",
        "action": "USE",
        "constraint": {
           "@type": "LogicalConstraint",
           "or" : [
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "{{PARTNERBPNL}}"
              },
              {
                "@type" : "Constraint",
                "leftOperand" : "BusinessPartnerNumber",
                "operator" :"eq",
                "rightOperand" : "{{MYBPNL}}"
              }
            ]
        }
     }]
    }
}
'
```

#### Register A Skill Contract

```console
curl --location --globoff 'https://{{customerConnectorHost}}/management/v2/policydefinitions' \
--header 'X-Api-Key: {{EDC_API_KEY}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "@context": {
         "cx-common": "https://w3id.org/catenax/ontology/common#"
    },
    "@id": "Contract?me=SkillContract",
    "@type": "ContractDefinition",
    "accessPolicyId": "Policy?me=SkillPolicy",
    "contractPolicyId": "Policy?me=SkillPolicy",
    "assetsSelector" : {
        "@type" : "CriterionDto",
        "operandLeft": "https://w3id.org/catenax/ontology/common#publishedUnderContract",
        "operator": "=",
        "operandRight": "Contract?me=Skill"
    }
}
'
```

#### Register a Skill Asset

```console
curl --location --globoff '{{dataPlaneName}}/api/agent/skill?asset=SkillAsset%3Fsupplier%3DRemainingUsefulLife&distributionMode=ALL&contract=Contract?me=SkillContract' \
--header 'Content-Type: application/sparql-query' \
--header '{{DATA_PLANE_KEY}}: {{DATA_PLANE_TOKEN}}' \
--data-raw 'PREFIX cx-common:       <https://w3id.org/catenax/ontology/common#>
PREFIX cx-core:         <https://w3id.org/catenax/ontology/core#>
PREFIX cx-vehicle:      <https://w3id.org/catenax/ontology/vehicle#>
PREFIX cx-reliability:  <https://w3id.org/catenax/ontology/reliability#>
PREFIX cx-behaviour:    <https://w3id.org/catenax/ontology/behaviour#>
PREFIX rdf:             <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:            <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd:             <http://www.w3.org/2001/XMLSchema#>
PREFIX json:            <https://json-schema.org/draft/2020-12/schema#>
PREFIX bpnl:      <bpn:legal:>
PREFIX oem:             <GraphAsset?oem=>
PREFIX supplier:        <GraphAsset?supplier=>

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

  bpnl:BPNL00000003AYRE cx-common:hasConnector ?oemEDC.
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

### Quick Setup Guide for Calling A Skill

We demonstrate the steps by interacting with the EDC Data Plane Agent Endpoint

#### Calling A Local Skill

```console
curl --location --globoff 'https://{{customerAgentHost}}/api/agent?asset=SkillAsset%3Fsupplier%3DRemainingUsefulLife' \
--header 'Content-Type: application/sparql-results+json' \
--header 'Accept: application/json' \
--header '{{DATA_PLANE_KEY}}: {{DATA_PLANE_TOKEN}}' \
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

#### Calling A Remote Skill

```console
curl --location --globoff 'https://{{customerAgentHost}}/api/agent?asset={{URLENCODED_PARTNER_CONTROL_PLANE}}%23SkillAsset%3Fsupplier%3DRemainingUsefulLife' \
--header 'Content-Type: application/sparql-results+json' \
--header 'Accept: application/json' \
--header '{{DATA_PLANE_KEY}}: {{DATA_PLANE_TOKEN}}' \
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

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
