---
id: operation-view
title: Operation View
description: 'Business Partner Kit'
sidebar_position: 3
---

![Business partner kit banner](@site/static/img/kits/business-partner/business-partner-logo.svg)

### Business Partner KIT

## Local Deployment

BPDM is an acronym for business partner data management. This project provides core services for querying, adding and changing business partner base information in the Eclipse Tractus-X landscape. BPDM project is SpringBoot Kotlin software project managed by Maven and consists of three microservices. This section contains information on how to configure and run the BPDM application.

This local deployment is an easy installation with helm charts. This setup is built to run on a kubernetes cluster.
Installation of BPDM applications with the Helm Charts has the most software requirements but is the qickest way to set up a running system. If you want to do local deployment without helm chart then you can refer [installation steps](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md#local-installation) from [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) file on bpdm repository. Which will guide you about prerequisites, default installation steps and also guide you for quick installation steps in which security is not necessary by using the provided `no-auth` profile when running the BPDM applications.

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![arrow down](@site/static/img/arrow_down.png)| **[Install the prerequisites](#step-1-prerequisites)**| Install all necessary tools for this setup                                     |
|![vector](@site/static/img/vector.png)    | **[Check out the Code](#step-2-check-out-the-code)**               | Get all necessary code to deploy the service and dependencies to the kuberneetes cluster|
|![check](@site/static/img/check.png)     | **[Installing the Service](#step-3-installing-the-services)**|Start cluster and interact with Services |

### Step 1: Prerequisites

1. [Docker](https://docs.docker.com/get-docker/) is installed and the Docker deamon is running with at least 8GB of memory
2. [helm](https://helm.sh/docs/intro/install/) is installed
3. [Minikube](https://minikube.sigs.k8s.io/docs/start/) is installed and running.  
   You can also use any other local Kubernetes cluster, this guide is just using Minikube as a reference.

   ```bash
   minikube start --memory 8192 --cpus 2 
   ```

   _Optional_: enable minikube metrics

   ```bash
   minikube addons enable metrics-server
   ```

4. [kubectl](https://kubernetes.io/docs/tasks/tools/) is installed
5. [psql](https://www.compose.com/articles/postgresql-tips-installing-the-postgresql-client/) client is installed

### Step 2: Check out the code

Check out the project [BPDM](https://github.com/eclipse-tractusx/bpdm) or download a [released version](https://github.com/eclipse-tractusx/bpdm/releases) of the project.

### Step 3: Installing the services

#### 1.0 Start the cluster

To deploy the services on kubernetes using helm charts, run

```bash
cd local/bpdm
helm install your_namespace ./charts/bpdm/
```

If postgresql is not available in your cluster then you might get following error.

```bash
Error: INSTALLATION FAILED: An error occurred while checking for chart dependencies. You may need to run `helm dependency build` to fetch missing dependencies: found in Chart.yaml, but missing in charts/ directory: opensearch, postgresql
```

You can resolve it by adding dependancy to the build

```bash
helm dependency build ./charts/bpdm/
```

This can take up to **5 minutes**.

When the deployment is finished you can expect that 4 deployments can be seen in the minikube dashboard:

* bpdm-gate
* bpdm-pool
* bpdm-cleaning-dummy
* bpdm-orchestrator
* bpdm-keycloak
* bpdm-postgres

Also in total 6 Pods are up and running.

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

or port forwarding can also be achived kubernetes command

```bash
kubectl port-forward <pod-name> <locahost-port>:<pod-port>
```

After that you can access the:

* **bpdm-gate:** [http://localhost:8081](http://localhost:8081)
* **bpdm-pool:** [http://localhost:8080](http://localhost:8080)

This will install the BPDM applications with its own Postgres and Keycloak in default values.
Please keep in mind that these steps will also install the applications with default passwords.

### Step 4: Override Default Secrets

It is good practice to overwrite the default secrets and passwords that are used in the BPDM Charts.
For this, you can first define a bunch of environment variables holding new secret values and use them later during deployment:

```bash
helm install your_namespace \
    --set-value postgres.auth.password=$BPDM_POSTGRES \
    --set-value keycloak.auth.adminPassword=$BPDM_KEYCLOAK_ADMIN \
    --set-value keycloak.bpdm.realm.clientSecrets.cleaningDummyOrchestrator=$BPDM_DUMMY_ORCH_CLIENT_SECRET \
    --set-value keycloak.bpdm.realm.clientSecrets.poolOrchestrator=$BPDM_POOL_ORCH_CLIENT_SECRET \
    --set-value keycloak.bpdm.realm.clientSecrets.gateOrchestrator=$BPDM_GATE_ORCH_CLIENT_SECRET \
    --set-value keycloak.bpdm.realm.clientSecrets.gatePool=$BPDM_GATE_POOL_CLIENT_SECRET \
    --set-value bpdm-gate.applicationSecrets.bpdm.client.orchestrator.registration=$BPDM_GATE_ORCH_CLIENT_SECRET \
    --set-value bpdm-gate.applicationSecrets.bpdm.client.pool.registration=$BPDM_GATE_POOL_CLIENT_SECRET \
    --set-value bpdm-pool.applicationSecrets.bpdm.client.orchestrator.registration=$BPDM_POOL_ORCH_CLIENT_SECRET \
    --set-value bpdm-cleaning-service-dummy.applicationSecrets.bpdm.client.orchestrator.registration=$BPDM_DUMMY_ORCH_CLIENT_SECRET\
 ./charts/bpdm
```

### Step 5: Installation without authentication

For non-production purposes you may want to install BPDM applications that are not authenticated.
All BPDM applications offer a Spring profile to quickly remove all authentication configuration for their APIs and client connections.
In this case you can also disable the Keycloak dependency from being deployed.

```bash
helm install your_namespace \
    --set-value keycloak.enabled=false
    --set-value bpdm-gate.profiles=["no-auth"] \
    --set-value bpdm-orchestrator.profiles=["no-auth"] \
    --set-value bpdm-pool.profiles=["no-auth"] \
    --set-value bpdm-cleaning-service-dummy.profiles=["no-auth"] 
 ./charts/bpdm
```

You can also more fine-granulary remove authentication on APIs and BPDM client connections.
You can refer to the no-auth profile configurations (for example that of the [BPDM Gate(without authentication)](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-gate/src/main/resources/application-no-auth.yml)) as a documentation.

### Use External Dependencies

The BPDM Charts deploy their own PostgreSQL and Keycloak dependencies.
However, for production it is recommended to host dedicated Postgres and Keycloak instances with which the BPDM applications should connect to.

#### Additional Requirements

* Postgres (15.4.0 supported)
* Keycloak (22.0.3 supported)

#### Installation

In this case, you can disable the dependencies and configure the connection to external systems in the application configuration.

```bash
helm install your_namespace \
    --set-value keycloak.enabled=false
    --set-value postgres.enabled=false
    --set-value bpdm-gate.applicationConfig.bpdm.datasource.host=external-db \
    --set-value bpdm-gate.applicationConfig.bpdm.security.auth-server-url=http://external-keycloak \
    --set-value bpdm-pool.applicationConfig.bpdm.datasource.host=external-db \
    --set-value bpdm-pool.applicationConfig.bpdm.security.auth-server-url=http://external-keycloak \
    --set-value bpdm-orchestrator.applicationConfig.bpdm.security.auth-server-url=http://external-keycloak \
    --set-value bpdm-cleaning-service-dummy.applicationConfig.bpdm.client.orchestrator.provider.issuer-uri= http://external-keycloak/realms/CX-Central \
 ./charts/bpdm
```

### Fine-granular Configuration

You can configure all BPDM applications over Helm values more fine-granulary via the `applicationConfig` and `applicationSecrets`.
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
