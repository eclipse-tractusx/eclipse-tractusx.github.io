---
sidebar_position: 1
title: Deployment
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

![Agents Kit Banner](@site/static/img/kits/agents/agents-kit-logo.drawio.svg)

## Agents KIT

**Operating federated queries over the whole data space.**

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
* (optionally) use a separate matchmaking agent to securely host your own business and meta data in the graph storage behind the connector layer
* (optionally) mount your matchmaking agent as a remote repository into your enterprise graph infrastructure.

## Role: As A Skill Provider

As a skill provider, you need to

* enable your [dataspace connector](agent_edc)  to transfer/delegate the required Agent protocols.
* (optionally) employ multiple data planes in case you want to expose hosted skills (skill assets that operate as stored procedures
and which require computational resources at the provider side) instead of distributed skills (skill assets that are offered as query texts/files and which are executed at the consumer side).

## Role: As A (Data/Function) Provider

As a provider, you need to

* enable your [dataspace connector](agent_edc) to receive/internalize the required Agent protocols.
* (optionally) use a separate matchmaking agent to securely publish your own business and meta data from the graph storage behind the connector layer

Depending on the kind of provisioning, you will setup additional internal "agents" (endpoints).

### Sub-Role: As A Data Provider

As a data provider, you want to

* [bind](provider) your data sources to knowledge graphs following the Catena-X ontology. Therefore, a provisioning agent
should be setup on top of a data virtualization/database layer.

### Sub-Role: As A Function Provider

As a function provider, you want to

* [bind](provider) your API to a special knowledge graph structure. Therefore, a remoting agent should be setup.

### Sub-Role: As A Twin Provider

As a twin provider, you want to

* [bridge](bridge) between the Knowledge Agent and Asset Administration Shell APIs.

## Runbook For Deploying and Smoke-Testing Knowledge Agents (Stable)

The Stable Environment is a minimal example environment exhibiting all roles and capabilities of the Tractus-X/Catena-X dataspace.

Knowledge Agents on Stable is deployed on the following two tenants

* App Provider 1 (BPNL000000000001)
  * Dataspace Connector (Postgresl, Hashicorp-Vault) "provider-connector" see [manifest](#app-provider-1-dataspace-connector-manifest)
  * Agent-Plane (Postgresql, Hashicorp-Vault) "provider-agent-plane" see [manifest](#app-provider-1-agent-plane-manifest)
  * Provisioning Agent incl. Local Database "sql-agent" see [manifest](#4-deploy-app-provider-1-provisioning-agent)
  * Remoting Agent (against a Public WebService) "api-agent" see [manifest](#5-deploy-app-provider-1-remoting-agent)
  * AAS Bridge (against a prerecorded )"aas-bridge" see [manifest](#6-deploy-app-provider-1-aas-bridge)
* App Consumer 4 (BPNL0000000005VV)
  * Dataspace Connector (Postgresl, Hashicorp-Vault) "consumer-connector" see [manifest](#app-consumer-4-datspace-connector-manifest)
  * Agent-Plane (Postgresql, Hashicorp-Vault) "consumer-agent-plane" see [manifest](#app-consumer-4-agent-plane-manifest)
  * Matchmaking-Agent "consumer-agent" see [manifest](#app-consumer-4-matchmaking-agent-manifest)

### 1. Prepare the Two Tenants

As a first step, two technical users are installed for the dataspace connectors using the <https://portal.stable.demo.catena-x.net>

* App Provider 1: sa4
* App Consumer 4: sa5

The generated secrets should be installed under <https://vault.demo.catena-x.net/ui/vault/secrets/knowledge>

* stable-provider-dim
* stable-consumer-dim

Further secrets should be installed

* oem-cert
* oem-key
* oem-symmetric-key
* consumer-cert
* consumer-key
* consumer-symmetric-key

Finally, an access token to the vault has been generated.

### 2. Deploy Agent-Enabled Connector's

Using <https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge> the following three applications have been installed.

We give the complete manifests but hide the secrets.

#### App Provider 1 Dataspace Connector Manifest

Deployed as "provider-connector"

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 0.7.3
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
          iatp:
              id: did:web:portal-backend.stable.demo.catena-x.net:api:administration:staticdata:did:BPNL000000000001
              trustedIssuers:
              - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
              sts:
              dim:
                url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
              oauth:
                token_url: https://bpnl000000000001-authentication.eu10.hana.ondemand.com/oauth/token
                client:
                  id: sa4
                  secret_alias: stable-provider-dim
          postgresql:
              name: agent-postgresql
              jdbcUrl: jdbc:postgresql://agent-postgresql:5432/provider
              auth:
                 database: provider
                 username: provider_user
                 password: ****
          controlplane:
            securityContext:
              readOnlyRootFilesystem: false
            image:
              pullPolicy: Always
            endpoints:
              management:
                control:
                  port: 8083
                  path: "/control"
                protocol:
                  port: 8084
                  path: "/api/v1/dsp"
                management:
                  port: 8081
                  path: "/management"
                  authKey: ***
            bdrs:
              server:
                url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-provider-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - api
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          dataplane:
            token:
              signer:
                privatekey_alias: consumer-key
              verifier:
                publickey_alias: consumer-cert
  chart: tractusx-connector
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

#### App Provider 1 Agent Plane Manifest

Deployed as "provider-agent-plane"

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.14.24
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          participant:
            id: BPNL000000000001
          nameOverride: agent-plane-provider
          fullnameOverride: agent-plane-provider
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
          iatp:
              id: did:web:portal-backend.stable.demo.catena-x.net:api:administration:staticdata:did:BPNL000000000001
              trustedIssuers:
              - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
              sts:
                dim:
                  url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
                oauth:
                  token_url: https://bpnl000000000001-authentication.eu10.hana.ondemand.com/oauth/token
                  client:
                    id: sa4
                    secret_alias: stable-provider-dim
          postgresql:
              name: agent-postgresql
              jdbcUrl: jdbc:postgresql://agent-postgresql:5432/provider
              auth:
                 database: provider
                 username: provider_user
                 password: ****
          connector: provider-connector
          controlplane:
            endpoints:
              control:
                port: 8083
                path: "/control"
              protocol:
                port: 8084
                path: "/api/v1/dsp"
              management:
                port: 8081
                path: "/management"
                authKey: ***
            bdrs:
              server:
                url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-provider-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - api
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          token:
            signer:
              privatekey_alias: oem-key
            verifier:
              publickey_alias: oem-cert
          auth: {}
          ingresses:
           - enabled: true
             hostname: "provider-agent.stable.demo.catena-x.net"
             endpoints:
              - public
              - default
             tls:
               enabled: true
          configs:
            dataspace.ttl: |-
              #################################################################
              # Catena-X Agent Bootstrap Graph in TTL/RDF/OWL FORMAT
              #################################################################
              @prefix : <GraphAsset?local=Dataspace> .
              @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
              @prefix owl: <http://www.w3.org/2002/07/owl#> .
              @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
              @prefix xml: <http://www.w3.org/XML/1998/namespace> .
              @prefix json: <https://json-schema.org/draft/2020-12/schema#> .
              @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
              @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
              @prefix bpnl: <bpn:legal:> .
              @prefix bpns: <bpn:site:> .
              @base <GraphAsset?local=Dataspace> .
              
              bpnl:BPNL000000000001 cx-common:id "BPNL000000000001"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.ne>.

              bpnl:BPNL0000000005VV cx-common:id  "BPNL0000000005VV"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>.
          agent:
            synchronization: 360000
            connectors: 
              BPNL000000000001: https://agent-provider-cp.stable.demo-catena-x.net
  chart: agent-plane
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

#### App Consumer 4 Datspace Connector Manifest

Deployed as "consumer-connector"

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 0.7.3
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
          iatp:
              id: did:web:portal-backend.stable.demo.catena-x.net:api:administration:staticdata:did:BPNL0000000005VV
              trustedIssuers:
              - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
              sts:
              dim:
                url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
              oauth:
                token_url: https://bpnl0000000005VV-authentication.eu10.hana.ondemand.com/oauth/token
                client:
                  id: sa5
                  secret_alias: stable-consumer-dim
          postgresql:
              name: agent-postgresql2
              jdbcUrl: jdbc:postgresql://agent-postgresql2:5432/consumer
              auth:
                 database: consumer
                 username: consumer_user
                 password: ****
          controlplane:
            securityContext:
              readOnlyRootFilesystem: false
            image:
              pullPolicy: Always
            endpoints:
              control:
                port: 8083
                path: "/control"
              protocol:
                port: 8084
                path: "/api/v1/dsp"
              management:
                port: 8081
                path: "/management"
                authKey: ***
            bdrs:
              server:
                url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-consumer-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - api
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          dataplane:
            token:
              signer:
                privatekey_alias: consumer-key
              verifier:
                publickey_alias: consumer-cert
  chart: tractusx-connector
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

#### App Consumer 4 Agent Plane Manifest

Deployed as "consumer-agent-plane"

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.14.24
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          participant:
            id: BPNL0000000005VV
          nameOverride: agent-plane-consumer
          fullnameOverride: agent-plane-consumer
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
          iatp:
              id: did:web:portal-backend.stable.demo.catena-x.net:api:administration:staticdata:did:BPNL0000000005VV
              trustedIssuers:
              - did:web:dim-static-prod.dis-cloud-prod.cfapps.eu10-004.hana.ondemand.com:dim-hosted:2f45795c-d6cc-4038-96c9-63cedc0cd266:holder-iatp
              sts:
              dim:
                url: https://dis-integration-service-prod.eu10.dim.cloud.sap/api/v2.0.0/iatp/catena-x-portal
              oauth:
                token_url: https://bpnl0000000005VV-authentication.eu10.hana.ondemand.com/oauth/token
                client:
                  id: sa5
                  secret_alias: stable-consumer-dim
          postgresql:
              name: agent-postgresql2
              jdbcUrl: jdbc:postgresql://agent-postgresql2:5432/consumer
              auth:
                 database: consumer
                 username: consumer_user
                 password: ****
          connector: consumer-connector
          controlplane:
            endpoints:
              management:
                control:
                  port: 8083
                  path: "/control"
                protocol:
                  port: 8084
                  path: "/api/v1/dsp"
                management:
                  port: 8081
                  path: "/management"
                  authKey: ***
            bdrs:
              server:
                url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-consumer-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - api
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          token:
            signer:
              privatekey_alias: consumer-key
            verifier:
              publickey_alias: consumer-cert
          auth: {}
          ingresses:
           - enabled: true
             hostname: "agent-consumer-dp.stable.demo.catena-x.net"
             endpoints:
              - public
              - default
             tls:
               enabled: true
          configs:
            dataspace.ttl: |-
              #################################################################
              # Catena-X Agent Bootstrap Graph in TTL/RDF/OWL FORMAT
              #################################################################
              @prefix : <GraphAsset?local=Dataspace> .
              @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
              @prefix owl: <http://www.w3.org/2002/07/owl#> .
              @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
              @prefix xml: <http://www.w3.org/XML/1998/namespace> .
              @prefix json: <https://json-schema.org/draft/2020-12/schema#> .
              @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
              @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
              @prefix bpnl: <bpn:legal:> .
              @prefix bpns: <bpn:site:> .
              @base <GraphAsset?local=Dataspace> .
              
              bpnl:BPNL000000000001 cx-common:id "BPNL000000000001"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.ne>.

              bpnl:BPNL0000000005VV cx-common:id  "BPNL0000000005VV"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>.
          agent:
            synchronization: 360000
            connectors: 
              BPNL000000000001: https://agent-provider-cp.stable.demo-catena-x.net
              BPNL0000000005VV: https://agent-consumer-cp.stable.demo-catena-x.net
            matchmaking: https://consumer-agent.stable.demo-catena-x.net
  chart: agent-plane
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 3. Deploy Matchmaking Agent

#### App Consumer 4 Matchmaking Agent Manifest

Deployed as "consumer-agent"

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.14.24
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          participant:
            id: BPNL0000000005VV
          nameOverride: agent-plane-consumer
          fullnameOverride: agent-plane-consumer
          connector: consumer-connector
          controlplane:
            endpoints:
              management:
                control:
                  port: 8083
                  path: "/control"
                protocol:
                  port: 8084
                  path: "/api/v1/dsp"
                management:
                  port: 8081
                  path: "/management"
                  authKey: ***
            bdrs:
              server:
                url: https://bpn-did-resolution-service.int.demo.catena-x.net/api/directory
            ingresses:
              - enabled: true
                # -- The hostname to be used to precisely map incoming traffic onto the underlying network service
                hostname: "agent-consumer-cp.stable.demo.catena-x.net"
                # -- EDC endpoints exposed by this ingress resource
                endpoints:
                  - protocol
                  - management
                  - api
                # -- Enables TLS on the ingress resource
                tls:
                  enabled: true
          ingresses:
          - enabled: true
            hostname: "consumer-agent.stable.demo.catena-x.net"
            endpoints:
              - default
            tls:
              enabled: true
            certManager:
              clusterIssuer: *clusterIssuer
          configs:
            # -- An example of an empty graph in ttl syntax
            dataspace.ttl: |
              #################################################################
              # Catena-X Agent Bootstrap Graph in TTL/RDF/OWL FORMAT
              #################################################################
              @prefix : <GraphAsset?local=Dataspace> .
              @prefix cx-common: <https://w3id.org/catenax/ontology/common#> .
              @prefix owl: <http://www.w3.org/2002/07/owl#> .
              @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
              @prefix xml: <http://www.w3.org/XML/1998/namespace> .
              @prefix json: <https://json-schema.org/draft/2020-12/schema#> .
              @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
              @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
              @prefix bpnl: <bpn:legal:> .
              @prefix bpns: <bpn:site:> .
              @base <GraphAsset?local=Dataspace> .
              
              bpnl:BPNL000000000001 cx-common:id "BPNL000000000001"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-provider-cp.stable.demo.catena-x.ne>.

              bpnl:BPNL0000000005VV cx-common:id  "BPNL0000000005VV"^^xsd:string;
                              cx-common:hasConnector <edcs://agent-consumer-cp.stable.demo.catena-x.net>.
          agent:
            synchronization: 360000
            connectors: 
              BPNL000000000001: https://agent-provider-cp.stable.demo-catena-x.net
              BPNL0000000005VV: https://agent-consumer-cp.stable.demo-catena-x.net
  chart: matchmaking-agent
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 4. Deploy App Provider 1 Provisioning Agent

Using <https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge> the following application has been installed.

For simplicity, the provisioning agent exposes a builtin sample H2 database as a graph and therefore needs to write the file system with its non-root account.
Therefore, some of the following settings are specific to stable and will not be used under productive settings.

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.14.24
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

### 5. Deploy App Provider 1 Remoting Agent

Using <https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge> the following application has been installed.

For simplicity, the remoting agent exposes a simply public API as a graph.

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.14.24
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

### 6. Deploy App Provider 1 AAS Bridge

Using <https://argo.stable.demo.catena-x.net/settings/projects/project-knowledge> the following application has been installed.

For simplicity, the aas bridge uses builtin-persistence.

```yaml
project: project-knowledge
source:
  repoURL: 'https://eclipse-tractusx.github.io/charts/dev'
  targetRevision: 1.13.7
  plugin:
    env:
      - name: HELM_VALUES
        value: |
          image:
            pullPolicy: Always
          aas:
            persistence:
              # -- The default sparql server is embedded
              sparql: http://sparql.local
            endpoints:
              default:
                path: "/"
          ingresses:
          - enabled: true
            hostname: "aas-bridge.stable.demo.catena-x.net"
            annotations:
              nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
            endpoints:
              - default
            tls:
              enabled: true
  chart: aas-bridge
destination:
  server: 'https://kubernetes.default.svc'
  namespace: product-knowledge
```

### 5. Perform Smoke Tests

This KIT provides a [Postman collection/folder](https://www.postman.com/catena-x/workspace/catena-x-knowledge-agents/folder/2757771-3534e62a-e7c3-4f0b-9aad-75afc650d92e?action=share&source=copy-link&creator=2757771&ctx=documentation) and a corresponding [environment](https://www.postman.com/catena-x/workspace/catena-x-knowledge-agents/environment/2757771-31115ff3-61d7-4ad6-8310-1e50290a1c3a?action=share&creator=2757771&active-environment=2757771-3a7489c5-7540-470b-8e44-04610511d9a9)

It consists of the following steps:

* Query Provider Agent (Internally)
* Query Provider Agent (Internally from Agent Plane)
* Query Remoting Agent (Internally)
* Query Remoting Agent (Internally from Agent Plane)
* Create Graph Policy (Provider)
* Create Graph Contract (Provider)
* Create Data Graph Asset (Provider)
* Create Function Graph Asset (Provider)
* Show Own Catalogue (Provider)
* Query AAS Bridge (Provider)
* Show Remote Catalogue (Consumer)
* Query Data Graph Asset (Consumer)
* Query Function Graph Asset (Consumer)

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
