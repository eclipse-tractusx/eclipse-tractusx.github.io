---
id: Operation View
title: Operation View
description: 'Business Partner Kit'
sidebar_position: 3
---

![Business partner kit banner](@site/static/img/BPKitIcon.png)

### Business Partner Kit

## Installation Instructions

This file contains information on how to configure and run the BPDM applications using helm chart.

BPDM project is SpringBoot Kotlin software project managed by Maven.
The indivial services from project can be run with the following command: `mvn clean spring-boot:run` on local system. This section covering on how you can deploy whole bpdm project and on how you can deploy each service Individual from the project.

## Prerequisites

* [Kubernetes Cluster](https://kubernetes.io/)
* [Helm](https://helm.sh/docs/)
* [Cloned BPDM repository](https://github.com/eclipse-tractusx/bpdm)

## BPDM  

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/bpdm --namespace your_namespace
```

This will install a new release of the BPDM in the given namespace.
On default values this release deploys the latest image tagged as `main` from the repository's GitHub Container Registry.
The application is run on default profile without authorization.
Additionally, the Helm deployment contains a PostgreSQL database and Opensearch instance which the BPDM Pool connects to.

On the default values deployment no further action is needed to make the BPDM deployment run.
However, per default, ingress as well as authentication for endpoints are disabled.

By giving your own values file you can configure the Helm deployment of the BPDM freely:

```bash
helm install release_name ./charts/bpdm --namespace your_namespace -f ./path/to/your/values.yaml
```

In the following sections you can have a look at the most important configuration options.

### Image Tag

Per default, the Helm deployment references a certain BPDM release version where the newest Helm release points to the newest version.
This is a stable tag pointing to a fixed release version of the BPDM.
For your deployment you might want to follow the latest application releases instead.

In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

### Helm Dependencies

On default, the Helm deployment also contains a PostgreSQL and Opensearch deployment.
You can configure these deployments in your value file as well.
For this, consider the documentation of the correspondent dependency [PostgreSQL](https://artifacthub.io/packages/helm/bitnami/postgresql/11.9.13)
or [Opensearch](https://opensearch.org/docs/latest/dashboards/install/helm/).
In case you want to use an already deployed database or Opensearch instance you can also disable the respective dependency and overwrite the default host
address in the `applicationConfig`:

```yaml
applicationConfig:
  spring:
    datasource:
      url: jdbc:postgresql://remote.host.net:5432/bpdm
postgres:
  enabled: false
```

## Deploy Individual Service

### 1. BPDM Pool

The [prerequisites](#prerequisites) for running this service. In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/bpdm-pool --namespace your_namespace
```

This will install a new release of the BPDM Pool in the given namespace.
On default values this release deploys the latest image tagged as `main` from the repository's GitHub Container Registry.
The application is run on default profile (without authorization).
Additionally, the Helm deployment contains a PostgreSQL database and Opensearch instance which the BPDM Pool connects to.

On the default values deployment no further action is needed to make the BPDM Pool deployment run.
However, per default, ingress as well as authentication for endpoints are disabled.

By giving your own values file you can configure the Helm deployment of the BPDM Pool freely:

```bash
helm install release_name ./charts/bpdm-pool --namespace your_namespace -f ./path/to/your/values.yaml
```

In the following sections you can have a look at the most important configuration options.

#### Image Tag

Per default, the Helm deployment references a certain BPDM Pool release version where the newest Helm release points to the newest Pool version.
This is a stable tag pointing to a fixed release version of the BPDM Pool.
For your deployment you might want to follow the latest application releases instead.

In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

#### Profiles

You can also activate Spring profiles in which the BPDM Pool should be run.
In case you want to run the Pool with authorization enabled you can write the following:

```yaml
springProfiles:
  - auth
```

#### Ingress

You can specify your own ingress configuration for the Helm deployment to make the BPDM Pool available over Ingress.
Note that you need to have the appropriate Ingress controller installed in your cluster first.
For example, consider a Kubernetes cluster with an [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/) installed.
An Ingress configuration for the Pool deployment could look like this:

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
  hosts:
    - host: business-partners.your-domain.net
      paths:
        - path: /pool
          pathType: Prefix
```

#### Pool Configuration

The Helm deployment comes with the ability to configure the BPDM Pool application directly over the values file.
This way you are able to overwrite any configuration property of the `application.properties` and `application-auth.properties` files.
Consider that you would need to turn on `auth`  profile first before overwriting any property in the corresponding properties file could take effect.
Overwriting configuration properties can be useful to connect to a remote service:

```yaml
applicationConfig:
  bpdm:
    security:
      auth-server-url: https://remote.keycloak.domain.com
      realm: CUSTOM_REALM
      client-id: POOL_CLIENT
```

In this example above a Pool with authenticated activated connects to a remote Keycloak instance and uses its custom realm and resource.

Entries in the "applicationConfig" value are written directly to a configMap that is part of the Helm deployment.
This can be a problem if you want to overwrite configuration properties with secrets.
Therefore, you can specify secret configuration values in a different Helm value `applicationSecrets`.
Content of this value is written in a Kubernetes secret instead.
If you want to specify a custom database password for example:

```yaml
applicationSecrets:
  spring:
    datasource:
      password: your_database_secret
```

#### Helm Dependencies

On default, the Helm deployment also contains a PostgreSQL and Opensearch deployment.
You can configure these deployments in your value file as well.
For this, consider the documentation of the correspondent dependency [PostgreSQL](https://artifacthub.io/packages/helm/bitnami/postgresql/11.9.13)
or [Opensearch](https://opensearch.org/docs/latest/dashboards/install/helm/).
In case you want to use an already deployed database or Opensearch instance you can also disable the respective dependency and overwrite the default host
address in the `applicationConfig`:

```yaml
applicationConfig:
  spring:
    datasource:
      url: jdbc:postgresql://remote.host.net:5432/bpdm
postgres:
  enabled: false
```

### 2. BPDM Gate

The [prerequisites](#prerequisites) for running this service is same except this service need running BPDM Pool instance.

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/bpdm-gate --namespace your_namespace -f /path/to/my_release-values.yaml
```

This will install a new release of the BPDM Gate in the given namespace.
On default values this release deploys the latest image tagged as `main` from the repository's GitHub Container Registry.
The application is run on default profile (without authorization for its own endpoints or BPDM Pool endpoints).
This deployment requires a BPDM Pool deployment to be reachable under host name `bpdm-pool` on port `8080`.

By giving your own values file you can configure the Helm deployment of the BPDM Gate freely.
In the following sections you can have a look at the most important configuration options.

#### Image Tag

Per default, the Helm deployment references the latest BPDM gate release tagged as `main`.
This tag follows the latest version of the Gate and contains the newest features and bug fixes.
You might want to switch to a more stable release tag instead for your deployment.
In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

#### Profiles

You can also activate Spring profiles in which the BPDM Gate should be run.
In case you want to run the Gate with authorization and oAuth Pool client enabled you can write the following:

```yaml
springProfiles:
  - auth
  - pool-auth
```

#### Ingress

You can specify your own ingress configuration for the Helm deployment to make the BPDM Gate available over Ingress.
Note that you need to have the appropriate Ingress controller installed in your cluster first.
For example, consider a Kubernetes cluster with an [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/) installed.
An Ingress configuration for the Gate deployment could look like this:

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
  hosts:
    - host: business-partners.your-domain.net
      paths:
        - path: /companies/test-company
          pathType: Prefix
```

#### Gate Configuration

For the default deployment you already need to overwrite the configuration properties of the application.
The Helm deployment comes with the ability to configure the BPDM Gate application directly over the values file.
This way you are able to overwrite any configuration property of the `application.properties`,  `application-auth.properties`
and  `application-pool-auth.properties` files.
Consider that you would need to turn on `auth` and `pool-auth` profile first before overwriting any property in the corresponding properties file could take
effect.
Overwriting configuration properties can be useful for connecting to a remotely hosted BPDM Pool instance:

```yaml
applicationConfig:
  bpdm:
    pool:
      base-url: http://remote.domain.net/api/catena
```

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

### 3. BPDM Bridge Dummy

The [prerequisites](#prerequisites) for running this service is same. In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/bpdm-bridge-dummy --namespace your_namespace -f /path/to/my_release-values.yaml
```

This will install a new release of the BPDM Bridge Dummy in the given namespace.
On default values this release deploys the latest image tagged as `main` from the repository's GitHub Container Registry.

By giving your own values file you can configure the Helm deployment of the BPDM Bridge Dummy freely.
In the following sections you can have a look at the most important configuration options.

#### Image Tag

Per default, the Helm deployment references the latest BPDM Bridge Dummy release tagged as `main`.
This tag follows the latest version of the Bridge Dummy and contains the newest features and bug fixes.
You might want to switch to a more stable release tag instead for your deployment.
In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

#### Profiles

You can also activate Spring profiles in which the BPDM Bridge Dummy should be run.
In case you want to run the Bridge Dummy with authorization enabled you can write the following:

```yaml
springProfiles:
  - auth
```

#### Ingress

You can specify your own ingress configuration for the Helm deployment to make the BPDM Bridge Dummy available over Ingress.
Note that you need to have the appropriate Ingress controller installed in your cluster first.
For example, consider a Kubernetes cluster with an [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/) installed.
An Ingress configuration for the Bridge Dummy deployment could somehow look like this:

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
  hosts:
    - host: business-partners.your-domain.net
      paths:
        - path: /bridge
          pathType: Prefix
```

#### Bridge Dummy Configuration

For the default deployment you already need to overwrite the configuration properties of the application.
The Helm deployment comes with the ability to configure the BPDM Bridge Dummy application directly over the values file.
This way you are able to overwrite any configuration property of the `application.properties` and `application-auth.properties` files.
Consider that you would need to turn on `auth` profile first before overwriting any property in the corresponding properties file could take
effect.
Overwriting configuration properties can be useful for connecting to a remotely hosted BPDM Gate and Pool instance:

```yaml
applicationConfig:
  bpdm:
    pool:
      base-url: http://remote.domain.net/api/catena
    gate:
      base-url: http://remote.domain.net/api/catena
```

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
