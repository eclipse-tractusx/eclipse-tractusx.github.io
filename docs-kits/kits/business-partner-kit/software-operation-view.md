---
id: operation-view
title: Operation View
description: Business Partner KIT
sidebar_position: 3
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

## Local Deployment

BPDM is an acronym for business partner data management. This project provides core services for querying, adding and changing business partner base information in the Eclipse Tractus-X landscape. BPDM project is SpringBoot Kotlin software project managed by Maven and consists of three microservices. This section contains information on how to configure and run the BPDM application.

This local deployment is an easy installation with helm charts. This setup is built to run on a kubernetes cluster.
Installation of BPDM applications with the Helm Charts has the most software requirements but is the quickest way to set up a running system. If you want to do local deployment without helm chart then you can refer [installation steps](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#local-installation) from [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) file on bpdm repository. Which will guide you about prerequisites, default installation steps and also guide you for quick installation steps in which security is not necessary by using the provided `no-auth` profile when running the BPDM applications.

:::caution Breaking changes in BPDM Helm Charts 7.0.0

The BPDM Helm Charts `7.0.0` (BPDM application `7.4.0`) ship breaking changes to the bundled dependencies: the embedded Postgres was upgraded from `15` to `18` and the embedded Keycloak from `25` to `26`, both switching vendor from Bitnami to Cloudpirates. As a result the Helm values structure changed as well (see the examples below).
The bundled Postgres and Keycloak are intended for test and development purposes only and are **not** recommended for production. For production, host external Postgres and Keycloak instances and configure BPDM to connect to them (see [Use External Dependencies](#use-external-dependencies)).
When upgrading an existing deployment, follow the [BPDM Migration Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/admin/MIGRATION_GUIDE.md).
:::

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![arrow down](@site/static/img/arrow_down.png)| **[Install the prerequisites](#step-1-prerequisites)**| Install all necessary tools for this setup                                     |
|![vector](@site/static/img/vector.png)    | **[Check out the Code](#step-2-check-out-the-code)**               | Get all necessary code to deploy the service and dependencies to the kuberneetes cluster|
|![check](@site/static/img/check.png)     | **[Installing the Service](#step-3-installing-the-services)**|Start cluster and interact with Services |

### Step 1: Prerequisites

1. [Docker Engine](https://docs.docker.com/get-docker/) is installed (tested on 26.1.2) and the Docker daemon is running with at least 8GB of memory
2. [helm](https://helm.sh/docs/intro/install/) is installed (tested on 3.14.4)
3. [Minikube](https://minikube.sigs.k8s.io/docs/start/) is installed and running (tested on 1.33.0).
   You can also use any other local Kubernetes cluster, this guide is just using Minikube as a reference.

   ```bash
   minikube start --memory 8192 --cpus 2
   ```

   _Optional_: enable minikube metrics

   ```bash
   minikube addons enable metrics-server
   ```

4. [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed (1.30 supported)

### Step 2: Check out the code

Check out the project [BPDM](https://github.com/eclipse-tractusx/bpdm) or download a [released version](https://github.com/eclipse-tractusx/bpdm/releases) of the project.

### Step 3: Installing the services

#### 1.0 Start the cluster

Navigate to the root folder of the BPDM repository. To deploy the services on kubernetes using helm charts, run

```bash
helm install bpdm ./charts/bpdm
```

If the bundled chart dependencies are not yet present in the `charts/` directory, the installation may fail with an error similar to:

```bash
Error: INSTALLATION FAILED: An error occurred while checking for chart dependencies. You may need to run `helm dependency build` to fetch missing dependencies
```

You can resolve it by building the chart dependencies first:

```bash
helm dependency build ./charts/bpdm
```

This can take up to **5 minutes**.

When the deployment is finished you can expect the following workloads to be running in the minikube dashboard:

* bpdm-gate
* bpdm-pool
* bpdm-cleaning-dummy
* bpdm-orchestrator
* bpdm-keycloak _(bundled, test/dev only)_
* bpdm-postgres _(bundled, test/dev only)_

#### 1.1 Get the status of the deployment

The minikube dashboard will give you feedback on how the status of the deployment currently is:

```bash
  minikube dashboard
```

Make sure you select the namespace **your_namespace**

#### 1.2 Forward ports

When the deployment has been finished, you can for port forwarding using k9s. Also, if k9s tool is not installed the you can use [installer](https://k9scli.io/topics/install/)

```bash
<shift+f>
```

or port forwarding can also be achieved kubernetes command

```bash
kubectl port-forward <pod-name> <locahost-port>:<pod-port>
```

After that you can access the:

* **bpdm-gate:** [http://localhost:8081](http://localhost:8081)
* **bpdm-pool:** [http://localhost:8080](http://localhost:8080)

This will install the BPDM applications with its own Postgres and Keycloak in default values.
Please keep in mind that these steps will also install the applications with default passwords.

### Step 4: Override Default Passwords and Secrets

It is good practice to overwrite the default passwords and secrets that are used by the bundled dependencies in the BPDM Charts.
The recommended way to override defaults is to provide a custom values file during deployment:

```bash
helm install bpdm --values path/to/values.yaml ./charts/bpdm
```

The bundled Postgres uses a dedicated BPDM database user whose password is generated once and preserved across upgrades.
To pin a known password instead, set it once at the umbrella level. The same value is shared with both the database and the applications automatically, so no per-service datasource configuration is required:

```yaml
postgres:
  customUser:
    password: $PASSWORD
```

The bundled Keycloak realm defines a service-account client for each BPDM service. Their secrets are generated once and preserved across upgrades.
To pin known secrets (for example to match an external consumer of a client), set them under `bpdmRealm.clients`:

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

The umbrella wires each application to its client automatically, so no per-service client configuration is needed when using the bundled Keycloak.
The full list of available client keys is documented in [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#overriding-oauth-client-secrets).

### Step 5: Installation without authentication

For non-production purposes you may want to install BPDM applications that are not authenticated.
All BPDM applications offer a Spring profile to quickly remove all authentication configuration for their APIs and client connections.
In this case you can also disable the bundled Keycloak dependency from being deployed.
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

You can also more fine-granularly remove authentication on APIs and BPDM client connections.
You can refer to the no-auth profile configurations (for example that of the [BPDM Gate(without authentication)](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-gate/src/main/resources/application-no-auth.yml)) as a documentation.

### Use External Dependencies

The BPDM Charts deploy their own PostgreSQL and Keycloak dependencies.
However, for production it is recommended to host dedicated Postgres and Keycloak instances with which the BPDM applications should connect to.

#### Additional Requirements

* Postgres (18.0 supported)
* Keycloak (26.6.3 supported)

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

You can combine this configuration with the examples for overriding passwords and secrets to adapt BPDM's connection configuration to your wishes.

### Fine-granular Configuration

You can configure all BPDM applications over Helm values more fine-granularly via the `applicationConfig` and `applicationSecrets`.
Values under these groups are directly injected as application properties in the deployed containers.

As a reference of what can be changed have a look at the respective application properties files of each application:

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

If you want to connect your IDE to one of the applications in the cluster, you need to enable debug mode for that application by overriding the entrypoint (using the `command` and `args` fields in the deployment resource). How to do this depends on the application. For the BPDM, as it is based on Spring Boot and Kotlin, you would need to add this flag to the start command:

```bash
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000
```

Then you can forward the port 8000 for the BPDM deployment to your host machine and connect your IDE to that port.

## Administration

Once a BPDM system is up and running, the BPDM Pool offers a set of endpoints intended for administration purposes.
The full reference is maintained in the [BPDM Admin Guide](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/admin/README.md).

### Managing Metadata

Golden records reference metadata such as identifier types, administrative areas and legal forms. Metadata constitutes a fixed list of available values: a golden record can only refer to a predefined technical key, not to an arbitrary value.

Most metadata is established through database migration scripts, but an administrator can also add some metadata during runtime through the Pool API:

* `POST legal-forms`: Create new legal forms
* `POST identifier-types`: Create new identifier types for either legal entities or addresses

While these endpoints exist, it is recommended to manage all metadata through database migration scripts.

### BPN Request Identifiers

When a refinement service determines that incoming business partner data is new and has no BPN yet, it assigns a unique BPN request identifier instead. Once the data reaches the Pool, the Pool assigns a new BPN and stores the association between the BPN and its request identifier.

To resolve which BPN was created for a given request identifier — for example for debugging or aligning existing refinement services — the Pool offers the endpoint `POST bpn/request-ids/search`.

### Direct Golden Record Updates

The intended way to create and update golden records is through the golden record process. An administrator can also manipulate golden record data directly via the Pool API:

* `POST legal-entities` / `PUT legal-entities`: Create or update legal entities by BPNL
* `POST sites` / `PUT sites`: Create or update sites (by BPNL, or by BPNS for updates)
* `POST sites/legal-main-sites`: Create sites whose main address is the legal address
* `POST addresses` / `PUT addresses`: Create or update legal entity or site addresses by BPNL / BPNS / BPNA

Note that the `PUT` endpoints only change business partner data, not structure. You cannot change the parent legal entity of a site, move an address to a different legal entity or site, or change an address type.
