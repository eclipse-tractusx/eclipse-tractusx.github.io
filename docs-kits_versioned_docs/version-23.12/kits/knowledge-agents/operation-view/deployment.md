---
sidebar_position: 1
title: Deployment
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

### Agents KIT

![Agents Kit Banner](/img/knowledge-agents/AgentsKit-Icon.png)

This document describes the deployment of the (Knowledge) Agents KIT (=Keep It Together) depending on the role that the respective tenant/business partner has.
It also provides a runbook for deploying a minimal stable environment for testing purposes.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [(Data/Function) Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed
* A [Data Sovereignity & Graph Policy](policy) discussion


## Motivation & Deployment Roles

Knowledge Agents is a federated technology, so there is no central component setup to take into account.
Instead, the Semantic Dataspace is formed by the individual business partners extending/configuring their
connectors and enabling their backend systems and/or datalakes. The deployment depends hereby on the
role that the business partner takes. The roles are described in more detail in our [Adoption](../adoption-view/intro) guideline.

[![Dataspace Roles](/img/knowledge-agents/dataspace_roles_small.png)](/img/knowledge-agents/dataspace_roles.png)

## Role: As A Consumer

As a consumer, you just need to:

* enable your [dataspace connector](agent_edc) to initiate/delegate the required Agent protocols (here: SparQL-over-Http).
* (optionally) mount your connector/matchmaking agent as a remote repository into your enterprise graph infrastructure.

## Role: As A Skill Provider

As a skill provider, you need to

* enable your [dataspace connector](agent_edc)  to transfer/delegate the required Agent protocols.
* (optionally) employ multiple data planes in case you want to expose hosted skills (skill assets that operate as stored procedures
and which require computational resources at the provider side) instead of distributed skills (skill assets that are offered as query texts/files and which are executed at the consumer side).

## Role: As A (Data/Function) Provider

As a provider, you need to

* enable your [dataspace connector](agent_edc) to receive/internalize the required Agent protocols.

Depending on the kind of provisioning, you will setup additional internal "agents" (endpoints).

### Sub-Role: As A Data Provider

As a data provider, you want to

* [bind](provider) your data sources to knowledge graphs following the Catena-X ontology. Therefore, a provisioning agent
should be setup on top of a data virtualization/database layer.

### Sub-Role: As A Function Provider

As a function provider, you want to

* [bind](provider) your API to a special knowledge graph structure. Therefore, a remoting agent should be setup.

### Sub-Role: As A Twin Provider

As a function provider, you want to

* [bridge](bridge) between the Knowledge Agent and Asset Administration Shell APIs.

## Runbook For Deploying and Smoke-Testing Knowledge Agents (Stable)

Knowledge Agents on Stable is deployed on the following two tenants
- App Provider 1 (BPNL000000000001)
  - Agent-Enabled Dataspace Connector
    - In-Memory Hashicorp-Vault Control Plane 
    - Hashicorp-Vault Agent Data Plane
  - Provisioning Agent incl. Local Database
  - Remoting Agent
- App Consumer 4 (BPNL0000000005VV)
  - Agent-Enabled Dataspace Connector
    - In-Memory Hashicorp-Vault Control Plane 
    - Hashicorp-Vault Agent Data Plane

### 1. Prepare the Two Tenants

As a first step, we installed two technical users for the dataspace connectors using the https://portal.stable.demo.catena-x.net
- App Provider 1: sa4
- App Consumer 4: sa5


The generated secrets have been installed under https://vault.demo.catena-x.net/ui/vault/secrets/knowledge
- stable-provider-miw
- stable-consumer-miw

Further secrets have been installed
- oem-cert
- oem-key
- oem-symmetric-key
- consumer-cert
- consumer-key
- consumer-symmetric-key

Finally an access token has been generated.

### 2. Deploy Agent-Enabled Connector's

Using https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge the following two applications have been installed.

We give the complete manifests but hide the secrets.

#### App Provider 1 Datspace Connector Manifest

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.10.15
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          participant:
            id: BPNL000000000001
          nameOverride: agent-connector-provider
          fullnameOverride: agent-connector-provider
          vault: 
            hashicorp: 
              enabled: true
              url: https://vault.demo.catena-x.net
              token: ****
              healthCheck:
                enabled: false
                standbyOk: true
              paths:
                secret: /v1/knowledge
            secretNames:
              transferProxyTokenSignerPrivateKey: oem-key
              transferProxyTokenSignerPublicKey: oem-cert
              transferProxyTokenEncryptionAesKey: oem-symmetric-key
          controlplane:
            securityContext: 
              readOnlyRootFilesystem: false
            image: 
              pullPolicy: Always
            ssi: 
              miw:
                # -- MIW URL
                url: "https://managed-identity-wallets-new.stable.demo.catena-x.net"
                # -- The BPN of the issuer authority
                authorityId: "BPNL00000003CRHK"
              oauth:
                # -- The URL (of KeyCloak), where access tokens can be obtained
                tokenurl: "https://centralidp.stable.demo.catena-x.net/auth/realms/CX-Central/protocol/openid-connect/token"
                client:
                  # -- The client ID for KeyCloak
                  id: "sa4"
                  # -- The alias under which the client secret is stored in the vault.
                  secretAlias: "stable-provider-miw"    
            endpoints:  
              management:
                authKey: ****
            ## Ingress declaration to expose the network service.
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-provider-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - control
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          dataplanes:
            dataplane:
              securityContext: 
                readOnlyRootFilesystem: false
              image: 
                pullPolicy: Always
              configs: 
                dataspace.ttl: |-
                  ################################################
                  # Catena-X Agent Bootstrap
                  ################################################
                  @prefix : <GraphAsset?local=Dataspace> .
                  @prefix cx: <https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/cx_ontology.ttl#> .
                  @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
                  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
                  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
                  @prefix bpnl: <bpn:legal:> .
                  @base <GraphAsset?local=Dataspace> .

                  bpnl:BPNL000000000001 cx:hasBusinessPartnerNumber "BPNL000000000001"^^xsd:string;
                                        cx:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.net>;
                                        cx-common:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.net>.

                  bpnl:BPNL0000000005VV cx:hasBusinessPartnerNumber "BPNL0000000005VV"^^xsd:string;
                                        cx:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>;
                                        cx-common:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>.
              agent:
                #synchronization: 360000
                connectors:
                  - https://agent-provider-cp.stable.demo.catena-x.net

              ## Ingress declaration to expose the network service.
              ingresses:
                - enabled: true
                  hostname: "agent-provider-dp.stable.demo.catena-x.net"
                  # -- EDC endpoints exposed by this ingress resource
                  endpoints:
                    - public
                    - default
                    - control
                    - callback
                  # -- Enables TLS on the ingress resource
                  tls:
                    enabled: true
  chart: agent-connector-memory
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

#### App Consumer 4 Datspace Connector Manifest

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.10.15
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          participant:
            id: BPNL0000000005VV
          nameOverride: agent-connector-consumer
          fullnameOverride: agent-connector-consumer
          vault: 
            hashicorp: 
              enabled: true
              url: https://vault.demo.catena-x.net
              token: ****
              healthCheck:
                enabled: false
                standbyOk: true
              paths:
                secret: /v1/knowledge
            secretNames:
              transferProxyTokenSignerPrivateKey: consumer-key
              transferProxyTokenSignerPublicKey: consumer-cert
              transferProxyTokenEncryptionAesKey: consumer-symmetric-key
          controlplane:
            securityContext: 
              readOnlyRootFilesystem: false
            image: 
              pullPolicy: Always
            ssi: 
              miw:
                # -- MIW URL
                url: "https://managed-identity-wallets-new.stable.demo.catena-x.net"
                # -- The BPN of the issuer authority
                authorityId: "BPNL00000003CRHK"
              oauth:
                # -- The URL (of KeyCloak), where access tokens can be obtained
                tokenurl: "https://centralidp.stable.demo.catena-x.net/auth/realms/CX-Central/protocol/openid-connect/token"
                client:
                  # -- The client ID for KeyCloak
                  id: "sa5"
                  # -- The alias under which the client secret is stored in the vault.
                  secretAlias: "stable-consumer-miw"    
            endpoints:  
              management:
                authKey: ***
            ## Ingress declaration to expose the network service.
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-consumer-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - control
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          dataplanes:
            dataplane:
              securityContext: 
                readOnlyRootFilesystem: false
              image: 
                pullPolicy: Always
              configs: 
                dataspace.ttl: |-
                  ################################################
                  # Catena-X Agent Bootstrap
                  ################################################
                  @prefix : <GraphAsset?local=Dataspace> .
                  @prefix cx: <https://raw.githubusercontent.com/catenax-ng/product-knowledge/main/ontology/cx_ontology.ttl#> .
                  @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
                  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
                  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
                  @prefix bpnl: <bpn:legal:> .
                  @base <GraphAsset?local=Dataspace> .

                  bpnl:BPNL000000000001 cx:hasBusinessPartnerNumber "BPNL000000000001"^^xsd:string;
                                        cx:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.net>;
                                        cx-common:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.net>.

                  bpnl:BPNL0000000005VV cx:hasBusinessPartnerNumber "BPNL0000000005VV"^^xsd:string;
                                        cx:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>;
                                        cx-common:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>.
              agent:
                # synchronization: 360000
                connectors:
                  - https://agent-provider-cp.stable.demo.catena-x.net

              ## Ingress declaration to expose the network service.
              ingresses:
                - enabled: true
                  hostname: "agent-consumer-dp.stable.demo.catena-x.net"
                  # -- EDC endpoints exposed by this ingress resource
                  endpoints:
                    - public
                    - default
                    - control
                    - callback
                  # -- Enables TLS on the ingress resource
                  tls:
                    enabled: true
  chart: agent-connector-memory
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 3. Deploy App Provider 1 Provisioning Agent

Using https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge the following application has been installed.

For simplicity, the provisioning agent exposes a builtin sample H2 database as a graph and therefore needs to write the file system with its non-root account.
Therefore, some of the following settings are specific to stable and will not be used under productive settings.

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.10.15
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          securityContext:
            readOnlyRootFilesystem: false
            runAsUser: 999
            runAsGroup: 999
            runAsUser: 999
          podSecurityContext:
            runAsGroup: 999
            fsGroup: 999
          bindings:
            dtc:
              port: 8080
              settings:
                  jdbc.url: "jdbc:h2:file:/opt/ontop/database/db;INIT=RUNSCRIPT FROM '/opt/ontop/data/dtc.sql'"
                  jdbc.driver: "org.h2.Driver"
                  ontop.cardinalityMode: "LOOSE"
              mapping: |
                [PrefixDeclaration]
                cx-common:          https://w3id.org/catenax/ontology/common#
                cx-core:            https://w3id.org/catenax/ontology/core#
                cx-vehicle:         https://w3id.org/catenax/ontology/vehicle#
                cx-reliability:     https://w3id.org/catenax/ontology/reliability#
                uuid:               urn:uuid:
                bpnl:               bpn:legal:
                owl:                http://www.w3.org/2002/07/owl#
                rdf:                http://www.w3.org/1999/02/22-rdf-syntax-ns#
                xml:                http://www.w3.org/XML/1998/namespace
                xsd:                http://www.w3.org/2001/XMLSchema#
                json:               https://json-schema.org/draft/2020-12/schema#
                obda:               https://w3id.org/obda/vocabulary#
                rdfs:               http://www.w3.org/2000/01/rdf-schema#
                oem:                urn:oem:
                
                [MappingDeclaration] @collection [[
                  mappingId dtc-meta
                  target    bpnl:{bpnl} rdf:type cx-common:BusinessPartner ; cx-core:id {bpnl}^^xsd:string . 
                  source    SELECT distinct "bpnl" FROM "dtc"."meta"
                  
                  mappingId dtc-content
                  target    oem:Analysis/{id} rdf:type cx-reliability:Analysis ; cx-core:id {code}^^xsd:string ; cx-core:name {description}^^xsd:string .
                  source    SELECT * FROM "dtc"."content"
                  
                  mappingId dtc-part
                  target    oem:Part/{entityGuid} rdf:type cx-vehicle:Part ; cx-core:id {enDenomination}^^xsd:string ; cx-core:name {classification}^^xsd:string .
                  source    SELECT * FROM "dtc"."part"
                  
                  mappingId dtc-meta-part
                  target    oem:Part/{entityGuid} cx-vehicle:manufacturer bpnl:{bpnl}. 
                  source    SELECT "bpnl","entityGuid" FROM "dtc"."part"
                  
                  mappingId dtc-part-content
                  target    oem:Analysis/{dtc_id} cx-reliability:analysedObject oem:Part/{part_entityGuid}. 
                  source    SELECT "part_entityGuid","dtc_id" FROM "dtc"."content_part"
                  
                ]]
  chart: provisioning-agent
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 4. Deploy App Provider 1 Remoting Agent

Using https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge the following application has been installed.

For simplicity, the remoting agent exposes a simply public API as a graph.

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.10.15
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          image:
            pullPolicy: Always
          repositories:
            prognosis: |
              #
              # Rdf4j configuration for prognosis remoting
              #
              @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
              @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
              @prefix rep: <http://www.openrdf.org/config/repository#>.
              @prefix sr: <http://www.openrdf.org/config/repository/sail#>.
              @prefix sail: <http://www.openrdf.org/config/sail#>.
              @prefix sp: <http://spinrdf.org/sp#>.
              @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
              @prefix json: <https://json-schema.org/draft/2020-12/schema#> .
              @prefix dcterms: <http://purl.org/dc/terms/> .
              @prefix cx-fx: <https://w3id.org/catenax/ontology/function#>.
              @prefix cx-common: <https://w3id.org/catenax/ontology/common#>.
              @prefix cx-prognosis: <https://w3id.org/catenax/ontology/prognosis#>.
              @prefix cx-rt: <https://w3id.org/catenax/ontology/remoting#>.

              [] rdf:type rep:Repository ;
                rep:repositoryID "prognosis" ;
                rdfs:label "Prognosis Functions" ;
                rep:repositoryImpl [
                    rep:repositoryType "openrdf:SailRepository" ;
                    sr:sailImpl [
                      sail:sailType "org.eclipse.tractusx.agents:Remoting" ;
                      cx-fx:callbackAddress <http://localhost:8888/callback>;
                      cx-fx:supportsInvocation cx-prognosis:Prognosis;
                    ]
                ].

              cx-prognosis:Prognosis rdf:type cx-fx:Function;
                dcterms:description "Prognosis is a sample simulation function with input and output bindings."@en ;
                dcterms:title "Prognosis" ;
                cx-fx:targetUri "https://api.agify.io";
                cx-fx:input cx-prognosis:name;
                cx-fx:result cx-prognosis:hasResult.

              cx-prognosis:hasResult rdf:type cx-fx:Result;
                cx-fx:output cx-prognosis:prediction;
                cx-fx:output cx-prognosis:support.

              cx-prognosis:name rdf:type cx-fx:Argument;
                dcterms:description "Name is an argument to the Prognosis function."@en ;
                dcterms:title "Name";
                cx-fx:argumentName "name".

              cx-prognosis:prediction rdf:type cx-fx:ReturnValue;
                dcterms:description "Prediction (Value) is an integer-based output of the Prognosis function."@en ;
                dcterms:title "Prediction" ;
                cx-fx:valuePath "age";
                cx-fx:dataType xsd:int.

              cx-prognosis:support rdf:type cx-fx:ReturnValue;
                dcterms:description "Support (Value) is another integer-based output of the Prognosis function."@en ;
                dcterms:title "Support" ;
                cx-fx:valuePath "count";
                cx-fx:dataType xsd:int.
  chart: remoting-agent
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 5. Perform Smoke Tests

We provide a [Postman collection](https://www.postman.com/catena-x/workspace/catena-x-knowledge-agents/folder/2757771-f11c5dda-cc04-444f-b38b-3deb3c098478?action=share&creator=2757771&ctx=documentation&active-environment=2757771-31115ff3-61d7-4ad6-8310-1e50290a1c3a) and a corresponding [environment](https://www.postman.com/catena-x/workspace/catena-x-knowledge-agents/environment/2757771-31115ff3-61d7-4ad6-8310-1e50290a1c3a?action=share&creator=2757771&active-environment=2757771-3a7489c5-7540-470b-8e44-04610511d9a9)

It consists of the following steps:
- Query Provider Agent (Internally)
- Query Provider Agent (Internally from Agent Plane)
- Query Remoting Agent (Internally)
- Query Remoting Agent (Internally from Agent Plane)
- Create Graph Policy (Provider)
- Create Graph Contract (Provider)
- Create Data Graph Asset (Provider)
- Create Function Graph Asset (Provider)
- Show Own Catalogue (Provider)
- Show Remote Catalogue (Consumer)
- Query Data Graph Asset (Consumer)
- Query Function Graph Asset (Consumer)



<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
