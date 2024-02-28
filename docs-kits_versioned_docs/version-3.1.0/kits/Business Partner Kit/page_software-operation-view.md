---
id: Operation View
title: Operation View
description: 'Business Partner Kit'
sidebar_position: 3
---

![Business partner kit banner](@site/static/img/BPKitIcon.png)

### Business Partner KIT

## Installation Instructions

This file contains information on how to configure and run the BPDM applications.

## BPDM Pool

BPDM Pool is a SpringBoot Kotlin software project managed by Maven.

The project can be run with the following command: `mvn clean spring-boot:run`

### Prerequisites

* Maven
* JDK17
* PostgreSQL 14.2
* OpenSearch 2.1.0
* Keycloak 17.0.0 (with enabled `auth` profile)
* Connection to an SaaS for the sharing process (with enabled `saas` profile)

When running, the project requires a Postgresql database and an Opensearch instance to be available to connect to.
Per default configuration the application expects postgres to run on `localhost` on port `5432`.
Opensearch needs to run on `localhost` on port `9200` on default.

You can find and edit the default configuration for the Pool in the `application.properties`,  `application-auth.properties` and `application-saas.properties`
files in the `resources` folder.

The REST API documentation can be accessed at `http://localhost:8080/api/swagger-ui`.

### Profiles

The default configuration of the application is determined by the `application.properties` file.
Here you can find core application configuration such as Swagger documentation, BPN generation and Actuator.
Furthermore, here you can find the configuration for the connection to the Spring datasource (currently, developed against PostgreSQL) and Opensearch.

You can also run the project with Spring profiles to enable additional components on top of the default configuration.
Currently, the BPDM Pool offers the profiles `auth` and `saas`.
In order to run the application with a specific profile you can use the appropriate maven flag `Dspring.profiles.active`.

For example, the command `mvn clean spring-boot:run -Dspring.profiles.active=auth` starts the application with additional `auth` configuration enabled.
You can also run several profiles at once, of course: `mvn clean spring-boot:run -Dspring.profiles.active=auth,saas`.

The following sections detail the configuration properties for each profile.

### Auth

`application-auth.properties` enables authorization of endpoints and configures the connection to a Keycloak instance on which the authorization relies on.
The application expects the Keycloak to run on `localhost` on port `8180`.
However, as with the Spring datasource and Opensearch connections, the connection to the Keycloak can be freely configured.
The application uses the configured auth server URL to validate incoming tokens.

For authorization purposes the application checks incoming token's permissions:

* add_company_data: For endpoints creating or updating business partner records including triggering imports from SaaS/exports to Opensearch
* view_company_data: For read-only endpoints of business partner data

The BPDM Pool looks for these permissions in the client/resource and not on the realm level.

This profile also enables/disables the login form in the auto-generated Swagger documentation.
The Swagger login uses the client specified in the property `springdoc.swagger-ui.oauth.client-id`.

### SaaS

The file `application-saas.properties` enables and configures the connection to a remote SaaS for the sharing process from which the application can import
business partner records.
Depending on whether this component is enabled, the application offers an endpoint to import records from SaaS.
If enabled the application requires the environment variable `BPDM_SAAS_KEY` to contain an API key with necessary privileges for accessing the specified
storage.
Further, you need to provide a hostname (`BPDM_SAAS_HOST`), storage ID (`BPDM_SAAS_STORAGE`) and datasource ID `BPDM_SAAS_DATASOURCE` to specify from where the records
should be imported by the application.

### Helm Deployment

This repository contains Helm files for deploying the BPDM Pool to a Kubernetes environment.
See the [BPDM Pool Helm README](https://github.com/eclipse-tractusx/bpdm/blob/main/charts/bpdm/charts/bpdm-pool/README.md) for details.

## BPDM Gate

BPDM is a SpringBoot Kotlin software project managed by Maven and can be run with the following command: `mvn clean spring-boot:run`

### Prerequisites

* Maven
* JDK17
* Connection to an SaaS for the sharing process
* Connection to BPDM Pool API
* Keycloak 17.0.0 (with enabled `auth` or `pool-auth` profile)

When running, the BPDM Gate requires a remote SaaS storage and datasource to exchange data with. The application expects the environment variables `BPDM_SAAS_HOST`, `BPDM_SAAS_KEY`, `BPDM_SAAS_STORAGE` and `BPDM_SAAS_DATASOURCE` to contain the hostname to connect to, the API key and the identifiers for the storage and datasource respectively.

The Gate also requires a connection to a BPDM Pool instance which is expected at `localhost` with port `8080` on default configuration.

You can find and edit the default configuration for the Gate in the `application.properties`,  `application-auth.properties`
and  `application-pool-auth.properties` files in the `resources` folder.

The REST API documentation can be accessed at `http://localhost:8081/api/swagger-ui`.

### Profiles

The default configuration of the application is determined by the `application.properties` file.
Here you can find core application configuration such as Swagger documentation, SaaS and BPDM Pool connection.

You can also run the project with Spring profiles to enable additional components on top of the default configuration.
Currently, the BPDM Gate offers the profiles `auth` and `auth-pool`.
In order to run the application with a specific profile you can use the appropriate maven flag `Dspring.profiles.active`.

For example, the command `mvn clean spring-boot:run -Dspring.profiles.active=auth` starts the application with additional `auth` configuration enabled.
You can also run several profiles at once, of course: `mvn clean spring-boot:run -Dspring.profiles.active=auth,auth-pool`.

The following sections detail the configuration properties for each profile.

### Auth

`application-auth.properties` enables authorization of endpoints and configures the connection to a Keycloak instance on which the authorization relies on.
The application expects the Keycloak to run on `localhost` on port `8180` and needs a client secret has to be submitted via environment
variable `BPDM_KEYCLOAK_SECRET`.
But keep in mind that the connection to the Keycloak can be freely configured.
The application uses the configured auth server URL to validate incoming tokens.

For authorization purposes the application checks incoming token's permissions:

* change_company_data: For endpoints adding or updating business partner data
* view_company_data: For endpoints reading the original unrefined business partner data
* view_shared_data: For endpoints reading the business partner data which has been cleaned and refined through the sharing process

The BPDM Pool looks for these permissions in the client/resource and not on the realm level.

This profile also enables/disables the login form in the auto-generated Swagger documentation.
The Swagger login uses the client specified in the property `springdoc.swagger-ui.oauth.client-id`.

### Pool-Auth

On default configuration, the BPDM Gate expects the API of the BPDM Pool to be accessible without authorization requirements.
In case the Pool instance to connect to has authorization activated, you need to activate this profile.
The file `application-pool-auth.properties` configures the oAuth2 client for connecting to a secured BPDM Pool.
Per default, the client will try to acquire a token via client credentials flow and expects the environment variable `BPDM_KEYCLOAK_SECRET` to contain the
secret for the client.

### Helm Deployment

This repository contains Helm files for deploying the BPDM Gate to a Kubernetes environment.
See the [BPDM Gate Helm README](https://github.com/eclipse-tractusx/bpdm/blob/main/charts/bpdm/charts/bpdm-gate/README.md) for details.
