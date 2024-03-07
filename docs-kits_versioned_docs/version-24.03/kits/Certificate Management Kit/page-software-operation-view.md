---
id: Operation View
title: Operation View
description: 'Certificate Management Kit'
sidebar_position: 3
---

![Business partner kit banner](/img/Certificate_Kit_Icon.png)

### Certificate Management KIT

## Local Deployment

BPDM Certificate Management here BPDM is an acronym for business partner data management.
This project provides core services for querying and adding certificate data for business partner base information in the Eclipse Tractus-X landscape. BPDM Certificate Management project is SpringBoot Kotlin software project managed by Maven and it is microservice. This section contains information on how to configure and run the BPDM certificate management application.

This local deployment is an easy installation with helm. This setup is built to run on a kubernetes cluster.

| Step                                                                             | Action                              | Description                                                             |
|----------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------|
|![arrow down](/img/arrow_down.png)| **[Install the prerequisites](#step-1-prerequisites)**| Install all necessary tools for this setup                                     |
|![vector](/img/vector.png)    | **[Check out the Code](#step-2-check-out-the-code)**               | Get all necessary code to deploy the service and dependencies to the kuberneetes cluster|
|![check](/img/check.png)     | **[Installing the Service](#step-3-installing-the-services)**|Start cluster and interact with Services |

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

Check out the project [BPDM-Certificate-Management](https://github.com/eclipse-tractusx/bpdm-certificate-management) or download a [released version](https://github.com/eclipse-tractusx/bpdm-certificate-management/releases) of the project.

### Step 3: Installing the services

#### 1. Start the cluster

To deploy the services on kubernetes using helm charts, run

```bash
cd local/bpdm-certificate-management
helm install your_namespace ./charts/bpdm-certificate-management/
```

If postgresql is not available in your cluster then you might get following error.

```bash
Error: INSTALLATION FAILED: An error occurred while checking for chart dependencies. You may need to run `helm dependency build` to fetch missing dependencies: found in Chart.yaml, but missing in charts/ directory: opensearch, postgresql
```

You can resolve it by adding dependency to the build

```bash
helm dependency build ./charts/bpdm-certificate-management/
```

This can take up to **5 minutes**.

When the deployment is finished you can expect that 1 deployment can be seen in the minikube dashboard:

* bpdm-certificate-management

##### 1.1 Get the status of the deployment

The minikube dashboard will give you feedback on how the status of the deployment currently is:

```bash
  minikube dashboard 
```

Make sure you select the namespace **your_namespace**:

![expected status](/img/Certificate_Minikube_dashboard.png)

#### 2. Forward ports

When the deployment has been finished, you can for port forwarding using k9s. Also, if k9s tool is not installed the you can use [installer](https://k9scli.io/topics/install/)

```bash
<shift+f>
```

or port forwarding can also be achived kubernetes command

```bash
kubectl port-forward <pod-name> <locahost-port>:<pod-port>
```

After that you can access the:

* **bpdm-certificate-management:** [http://localhost:8086](http://localhost:8083)

## Deploy Service

### BPDM Certificate Management

The [prerequisites](#step-1-prerequisites) for running this service is same.

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/bpdm-certificate-management --namespace your_namespace -f /path/to/my_release-values.yaml
```

This will install a new release of the BPDM Certificate Management in the given namespace.
On default values this release deploys the latest image tagged as `main` from the repository's GitHub Container Registry.
The application is run on default profile.

By giving your own values file you can configure the Helm deployment of the BPDM Certificate Management freely.
In the following sections you can have a look at the most important configuration options.

#### Image Tag

Per default, the Helm deployment references the latest Certificate Management release tagged as `main`.
This tag follows the latest version of the Certificate Management and contains the newest features and bug fixes.
You might want to switch to a more stable release tag instead for your deployment.
In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

#### Profiles

You can also activate Spring profiles in which the Certificate Management should be run.
In case you want to run the Certificate Management with authorization enabled you can write the following:

```yaml
springProfiles:
  - auth
```

#### Ingress

You can specify your own ingress configuration for the Helm deployment to make the Certificate Management available over Ingress.
Note that you need to have the appropriate Ingress controller installed in your cluster first.
For example, consider a Kubernetes cluster with an [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/) installed.
An Ingress configuration for the Certificate Management deployment could look like this:

```yaml
ingress:
   enabled: true
   hosts:
      - host: business-partners-certificate.your-domain.net
        paths:
           - path: "/test-certificate"
             pathType: Prefix
   tls:
      - secretName: tls-secret
        hosts:
           - business-partners-certificate.your-domain.net
```

#### Certificate Management Configuration

For the default deployment you already need to overwrite the configuration properties of the application.
The Helm deployment comes with the ability to configure the Certificate Management application directly over the values file.
This way you are able to overwrite any configuration property of the `application.yaml` and `application-auth.yaml`.
Consider that you would need to turn on `auth` profile first before overwriting any property in the corresponding properties file could take
effect.

Entries in the "applicationConfig" value are written directly to a configMap that is part of the Helm deployment.
This can be a problem if you want to overwrite configuration properties with secrets.
Therefore, you can specify secret configuration values in a different Helm value `applicationSecrets`.
Content of this value is written in a Kubernetes secret instead.
If you want to specify a keycloak client secret for example:

```yaml
applicationSecrets:
  bpdm:
    security:
      credentials:
        secret: your_client_secret
```

## Stopping the cluster

1. stop minikube

    ```bash
    minikube stop
    ```

2. stop the processes used for port forwarding and minikube dashboard
3. shut down the Docker daemon

## How to debug an application in the cluster

If you want to connect your IDE to one of the applications in the cluster, you need to enable debug mode for that application by overriding the entrypoint (using the `command` and `args` fields in the deployment resource). How to do this depends on the application. For the Bpdm certificate managment, as it is based on Spring Boot and Kotlin, you would need to add this flag to the start command:

```bash
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000
```

Then you can forward the port 8000 for the Bpdm certificate managment deployment to your host machine and connect your IDE to that port.
