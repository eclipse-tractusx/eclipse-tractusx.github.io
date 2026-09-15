---
id: operation-view
title: Operation View
description: Business Partner KIT
sidebar_position: 3
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

## Local Deployment

BPDM (business partner data management) provides the core services for querying, adding and changing business partner data in the Eclipse Tractus-X landscape.
It is a Spring Boot Kotlin project managed by Maven, consisting of four microservices: Gate, Pool, Orchestrator and Cleaning Service Dummy.

This section installs them on a Kubernetes cluster with the Helm Charts - the quickest way to a running system.
A deployment without Helm, including the `no-auth` profile for a setup without security, is described in [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#local-installation).

:::caution Upgrading an existing deployment

Most BPDM releases need operator action before the upgrade: data to remediate first, migrations that delete data or fail the deployment when the data does not fit, and changed configuration or infrastructure requirements.

The [BPDM Migration Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/admin/MIGRATION_GUIDE.md) states them per version step.
Work through every step between your deployed version and the target version before upgrading.

:::

:::caution Bundled dependencies

The bundled Postgres and Keycloak are for test and development only.
For production, host external instances and connect BPDM to them (see [Use External Dependencies](#use-external-dependencies)).

:::

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![arrow down](@site/static/img/arrow_down.png)| **[Install the prerequisites](#step-1-prerequisites)**| Install all necessary tools for this setup                                     |
|![vector](@site/static/img/vector.png)    | **[Check out the Code](#step-2-check-out-the-code)**               | Get all necessary code to deploy the service and dependencies to the Kubernetes cluster|
|![check](@site/static/img/check.png)     | **[Installing the Service](#step-3-installing-the-services)**|Start cluster and interact with Services |

### Step 1: Prerequisites

1. [Docker Engine](https://docs.docker.com/get-docker/) is installed (tested on 29.5.3) and the Docker daemon is running with at least 8GB of memory
2. [helm](https://helm.sh/docs/intro/install/) is installed (tested on 4.2.0)
3. [Minikube](https://minikube.sigs.k8s.io/docs/start/) is installed and running (tested on 1.38.1).
   You can also use any other local Kubernetes cluster, this guide is just using Minikube as a reference.

   ```bash
   minikube start --memory 8192 --cpus 2
   ```

   _Optional_: enable minikube metrics

   ```bash
   minikube addons enable metrics-server
   ```

4. [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed (1.36 supported)

### Step 2: Check out the code

Check out the project [BPDM](https://github.com/eclipse-tractusx/bpdm) or download a [released version](https://github.com/eclipse-tractusx/bpdm/releases) of the project.

### Step 3: Installing the services

#### 1.0 Start the cluster

Navigate to the root folder of the BPDM repository. To deploy the services on kubernetes using helm charts, run

```bash
helm install bpdm ./charts/bpdm
```

If the bundled chart dependencies are not yet present in the `charts/` directory, the installation fails with:

```bash
Error: INSTALLATION FAILED: An error occurred while checking for chart dependencies. You may need to run `helm dependency build` to fetch missing dependencies
```

Build them first:

```bash
helm dependency build ./charts/bpdm
```

Installation can take up to **5 minutes**.
Workload names are prefixed with the release name, so a release installed as `bpdm` yields:

| Workload                           | Kind        | Role                                       |
|------------------------------------|-------------|--------------------------------------------|
| `bpdm-bpdm-gate`                   | Deployment  | Gate application                           |
| `bpdm-bpdm-pool`                   | Deployment  | Pool application                           |
| `bpdm-bpdm-orchestrator`           | Deployment  | Orchestrator application                   |
| `bpdm-bpdm-cleaning-service-dummy` | Deployment  | Reference refinement service               |
| `bpdm-bpdm-postgres`               | StatefulSet | Bundled BPDM database _(test/dev only)_    |
| `bpdm-bpdm-keycloak`               | StatefulSet | Bundled identity provider _(test/dev only)_ |
| `bpdm-postgres`                    | StatefulSet | The bundled Keycloak's own database _(test/dev only)_ |

Two Postgres workloads appear because the bundled Keycloak runs a database of its own (`keycloak.postgres.enabled`).

#### 1.1 Get the status of the deployment

The minikube dashboard shows the status of the deployment:

```bash
  minikube dashboard
```

Make sure you select the namespace **your_namespace**

#### 1.2 Forward ports

The services are ClusterIP services by default, so reaching one from your machine takes a port forward.
In k9s ([installer](https://k9scli.io/topics/install/)) press:

```bash
<shift+f>
```

Or name the service on the command line:

```bash
kubectl -n <namespace> port-forward svc/bpdm-bpdm-gate 8080:80
```

Each application serves its Swagger UI under `/ui/swagger-ui`, so the Gate API is at [http://localhost:8080/ui/swagger-ui](http://localhost:8080/ui/swagger-ui).
The other services work the same way: `svc/bpdm-bpdm-pool`, `svc/bpdm-bpdm-orchestrator` and `svc/bpdm-bpdm-cleaning-service-dummy`.

For the bundled Keycloak's admin console, forward it as well and open `/admin`:

```bash
kubectl -n <namespace> port-forward svc/bpdm-bpdm-keycloak 8081:80
```

Log in with the admin credentials configured under `keycloak.keycloak` in the values (default password: `admin`). The BPDM clients and roles live in the `BPDM` realm.

`helm status <release>` repeats these commands with release and namespace filled in.

This installs the BPDM applications with their own Postgres and Keycloak - and with default passwords.

#### 1.3 Run the bundled end-to-end smoke test

The charts ship the BPDM system tester as a Helm test hook: it shares business partner data through the Gate, waits for the golden record process to finish and reads the result back from the Pool.
It authenticates against Gate, Pool and Orchestrator with the generated client secrets and therefore needs the bundled Keycloak.

The hook is off by default. Enable it in your values:

```yaml
tests:
  enabled: true
  # Optional Cucumber tag expression to narrow the run; empty runs the full suite
  filterTags: "@Smoke"
```

Apply them and run the test:

```bash
helm upgrade bpdm --values path/to/values.yaml ./charts/bpdm
helm test bpdm
```

### Step 4: Override Default Passwords and Secrets

Overwrite the default passwords and secrets of the bundled dependencies with a custom values file:

```bash
helm install bpdm --values path/to/values.yaml ./charts/bpdm
```

The bundled Postgres uses a dedicated BPDM database user whose password is generated once and preserved across upgrades.
To pin a known one, set it at the umbrella level; database and applications receive it automatically:

```yaml
postgres:
  customUser:
    password: $PASSWORD
```

The bundled Keycloak realm defines a service-account client per BPDM service, with secrets generated once and preserved across upgrades.
To pin known ones, set them under `bpdmRealm.clients`:

```yaml
bpdmRealm:
  clients:
    gate:
      secret: $GATE_SECRET
    pool:
      secret: $POOL_SECRET
    orchestrator:
      secret: $ORCHESTRATOR_SECRET
    cleaningDummy:
      secret: $CLEANING_DUMMY_SECRET
```

Each application is wired to its client automatically. The full list of client keys is in [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#overriding-oauth-client-secrets).

### Step 5: Installation without authentication

For non-production purposes, the `no-auth` Spring profile removes the authentication configuration of the APIs and client connections, and the bundled Keycloak can be disabled.
Provide the following values file during deployment:

```yaml
keycloak:
  enabled: false
bpdm-gate:
  springProfiles:
    - no-auth
bpdm-pool:
  springProfiles:
    - no-auth
bpdm-cleaning-service-dummy:
  springProfiles:
    - no-auth
bpdm-orchestrator:
  springProfiles:
    - no-auth
```

Authentication can also be removed more selectively; the profile configurations, for example the [Gate's](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-gate/src/main/resources/application-no-auth.yml), show which properties are involved.

### Use External Dependencies

The BPDM Charts deploy their own PostgreSQL and Keycloak. For production, host dedicated instances and connect the applications to them.

#### Additional Requirements

* Postgres (18.0 supported)
* Keycloak (26.7.0 supported)

#### Installation

Disable the bundled dependencies and supply the connection settings through each service's `applicationConfig` (non-secret values) and `applicationSecrets` (credentials).
Gate, Pool and Orchestrator connect to the database; the Cleaning Service Dummy only needs the authentication settings.
When connecting to an external IdP you also need to provide the client secrets for the outbound BPDM client connections (under `applicationSecrets.bpdm.client`), matching the clients configured in that IdP.

```yaml
postgres:
  enabled: false
keycloak:
  enabled: false
bpdm-gate:
  applicationConfig:
    bpdm:
      datasource:
        host: remote-postgres
      security:
        auth-server-url: "https://remote-keycloak/auth"
        realm: BPDM
  applicationSecrets:
    spring:
      datasource:
        username: bpdm
        password: $DB_PASSWORD
    bpdm:
      client:
        orchestrator:
          registration:
            client-secret: $GATE_ORCH_CLIENT_SECRET
        pool:
          registration:
            client-secret: $GATE_POOL_CLIENT_SECRET
bpdm-pool:
  applicationConfig:
    bpdm:
      datasource:
        host: remote-postgres
      security:
        auth-server-url: "https://remote-keycloak/auth"
        realm: BPDM
  applicationSecrets:
    spring:
      datasource:
        username: bpdm
        password: $DB_PASSWORD
    bpdm:
      client:
        orchestrator:
          registration:
            client-secret: $POOL_ORCH_CLIENT_SECRET
bpdm-orchestrator:
  applicationConfig:
    bpdm:
      datasource:
        host: remote-postgres
      security:
        auth-server-url: "https://remote-keycloak/auth"
        realm: BPDM
  applicationSecrets:
    spring:
      datasource:
        username: bpdm
        password: $DB_PASSWORD
bpdm-cleaning-service-dummy:
  applicationConfig:
    bpdm:
      security:
        auth-server-url: "https://remote-keycloak/auth"
        realm: BPDM
      client:
        orchestrator:
          provider:
            issuer-uri: "https://remote-keycloak/auth/realms/BPDM"
  applicationSecrets:
    bpdm:
      client:
        orchestrator:
          registration:
            client-secret: $CLEANING_DUMMY_ORCH_CLIENT_SECRET
```

This configuration can be combined with the examples for overriding passwords and secrets.

### Fine-granular Configuration

Values under `applicationConfig` and `applicationSecrets` are injected directly as application properties into the deployed containers.
The application properties files list what can be set:

1. [BPDM Gate](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-gate/src/main/resources/application.yml)
2. [BPDM Pool](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-pool/src/main/resources/application.yml)
3. [BPDM Orchestrator](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-orchestrator/src/main/resources/application.yml)
4. [BPDM Cleaning Service Dummy](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-cleaning-service-dummy/src/main/resources/application.yml)

## Stopping the cluster

1. stop minikube

    ```bash
    minikube stop
    ```

2. stop the processes used for port forwarding and minikube dashboard
3. shut down the Docker daemon

## How to debug an application in the cluster

To connect your IDE to an application in the cluster, enable debug mode by overriding the entrypoint (the `command` and `args` fields of the deployment resource) with this flag:

```bash
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000
```

Then forward port 8000 of that deployment to your host machine and connect your IDE to it.

## Administration

The BPDM Pool offers a set of endpoints for administration purposes. The full reference is the [BPDM Admin Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/admin/README.md).

### Managing Metadata

Golden records reference metadata such as identifier types, administrative areas and legal forms. Metadata is a fixed list of values: a golden record can only refer to a predefined technical key.

Most metadata is established through database migration scripts. An administrator can also add some at runtime through the Pool API:

* `POST legal-forms`: Create new legal forms
* `POST identifier-types`: Create new identifier types for either legal entities or addresses

Managing all metadata through database migration scripts is recommended.

### BPN Request Identifiers

Business partner data that is new and has no BPN yet receives a unique BPN request identifier from the refinement service. When the data reaches the Pool, the Pool assigns a BPN and stores the association with that request identifier.

`POST bpn/request-ids/search` resolves which BPN was created for a given request identifier.

### Direct Golden Record Updates

Golden records are created and updated through the golden record process. An administrator can also change them directly via the Pool API:

* `POST legal-entities` / `PUT legal-entities`: Create or update legal entities by BPNL
* `POST sites` / `PUT sites`: Create or update sites (by BPNL, or by BPNS for updates)
* `POST sites/legal-main-sites`: Create sites whose main address is the legal address
* `POST addresses` / `PUT addresses`: Create or update legal entity or site addresses by BPNL / BPNS / BPNA

The `PUT` endpoints change business partner data, not structure: the parent legal entity of a site, the legal entity of an address and an address type stay as they are.

The one structural exception is an address's site membership. `PUT addresses` takes an optional `bpnSites` holding the BPNS of every site the address belongs to. Stating them **replaces** the current membership, so a site left out is unlinked, and a site whose main address this address is has to be stated. Omitting the field leaves the membership untouched.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

* SPDX-License-Identifier: CC-BY-4.0
* SPDX-FileCopyrightText: 2023-2026 ZF Friedrichshafen AG
* SPDX-FileCopyrightText: 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
* SPDX-FileCopyrightText: 2023-2026 SAP SE
* SPDX-FileCopyrightText: 2023-2026 Volkswagen AG
* SPDX-FileCopyrightText: 2023-2026 Robert Bosch GmbH
* SPDX-FileCopyrightText: 2023-2026 Mercedes Benz Group
* SPDX-FileCopyrightText: 2023-2026 BASF SE
* SPDX-FileCopyrightText: 2023-2026 Schaeffler AG
* SPDX-FileCopyrightText: 2023-2026 Contributors to the Eclipse Foundation
* Source URL: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
