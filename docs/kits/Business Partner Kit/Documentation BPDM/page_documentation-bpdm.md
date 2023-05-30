---
id: Introduction
title: Introduction
description: ''
sidebar_position: 1
---

![Business partner kit banner](@site/static/img/BPKitIcon.png)

## Introduction

BPDM (Business Partner Data Management) is a core component of the Catena-X project, which aims to create a secure, trusted, and standardized ecosystem for the exchange of data among various stakeholders in the automotive industry. BPDM provides services for querying, adding, and managing business partner base information in the Catena-X landscape.

The BPDM is comprised of two primary services: BPDM Pool and BPDM Gate. The BPDM Pool serves as the single source of truth for business partner base information, including official identifiers, addresses, and other key details. Each record in the Pool has a unique identifier, called the business partner number (BPN), which enables it to be referenced across the entire Catena-X ecosystem. Business partner records in the Pool are organized into three categories: legal entities, sites, and partner addresses. A legal entity represents the primary information about a business partner, while a site may represent a plant or campus with several contact and delivery addresses. An address partner represents the location of a legal entity or site with a single contact/delivery address.

The BPDM Pool offers an API that enables Catena-X members to query business partner records by BPN, other identifiers, or through a text search. This API is designed to provide quick and easy access to critical business partner data, allowing Catena-X members to make informed decisions based on reliable information.

The BPDM Gate, on the other hand, provides a mechanism for Catena-X members to share their own business partner data with the Catena-X ecosystem. Members who share their data with Catena-X are called sharing members. Through the Gate service, sharing members can add their own business partner records and retrieve cleaned and enhanced data in return. This shared business partner data undergoes a validation and enhancement process before it is integrated into the BPDM Pool and assigned a BPN.

Overall, BPDM plays a crucial role in creating a standardized and secure ecosystem for the exchange of business partner data in the automotive industry. Its services enable Catena-X members to easily access reliable and up-to-date business partner data and to share their own data with confidence, while ensuring data security and privacy.

## Getting Started  

Getting started is easy. Here is a summary of the information that might help you get started:

Depending on usage, we have categorised two separate sections that one is running the BPDM Service and another is integrating with the BPDM API. Then it will dive into the purpose of the API and the technical specification of how to set up the API and run it. The API documentation is written in Swagger. Here, the Swagger controllers and sections will be explained in detail in api reference topic.

### Running BPDM service

This section would provide instructions for a user who wants to run the BPDM service locally or deploy it on a remote server.
The BDPM is a SpringBoot Kotlin software project managed by Maven. The core information about the API setup is shown below. For the complete and up to date API setup, refer to the [GitHub website](https://github.com/eclipse-tractusx/bpdm#profiles).

* BPDM Pool

    1. BPDM Pool is a SpringBoot Kotlin software project managed by Maven.
    2. The project can be run with the following command: mvn clean spring-boot:run
    3. Prerequisites: Maven, JDK17, PostgreSQL 14.2, OpenSearch 2.1.0, Keycloak 17.0.0, Connection to an SaaS.
    4. The project requires a Postgresql database and an Opensearch instance to be available to connect to.
    5. Default configuration: postgres to run on localhost on port 5432, Opensearch to run on localhost on port 9200.
    6. Configuration files: application.properties, application-auth.properties, and application-saas.properties.
    7. REST API documentation: <http://localhost:8080/api/swagger-ui>.
    8. Profiles: default, auth, and saas.

* BPDM Gate

    1. BPDM Gate is a SpringBoot Kotlin software project managed by Maven.
    2. The project can be run with the following command: mvn clean spring-boot:run
    3. Prerequisites: Maven, JDK17, Connection to an SaaS, Connection to BPDM Pool API, Keycloak 17.0.0.
    4. The Gate requires a remote SaaS storage and datasource to exchange data with.
    5. Default configuration: BPDM Pool instance expected at localhost with port 8080.
    6. Configuration files: application.properties, application-auth.properties, and application-pool-auth.properties.
    7. REST API documentation: <http://localhost:8081/api/swagger-ui>.
    8. Profiles: default, auth, and auth-pool.

It is important to follow the instructions mentioned in the [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) and [README.md](https://github.com/eclipse-tractusx/bpdm/blob/main/README.md) files to ensure successful installation and configuration.

### Intergrating with BPDM api

This section provides you info on how you can integrate with existing bpdm api service which is hosted on remote server. For better understanding, we have provided examples with dummy hostname. There is a reference implementation of the API on GitHub. The software as a service component is shown with the example of the actual conceptional/development partner. If the component is replaced, adjustments may be necessary.

| Type | Description | Link |
| :----------- | :------------: | :------------: |  
| Dummy Server | It is server where bpdm api is deployed | <https://dummy-pool.catena-x.net> |

As shown in above table, we have taken Dummy server for reference where BPDM service is already hosted. A local instance can also be set up and we just need following,

* Software compiler: Maven
* Development environment: JDK 11
* Database: PostgreSQL 14.2
* Authentication: Keycloak 17.0.0
* OpenSearch 2.1.0 (with enabled OpenSearch component)

The API has different Spring profiles depending on the configuration purpose, for better understanding we have putted dummy profile for execution on remote server

* default: when no environment specified
* local: for the execution on local machine (developer profile)
* dummy: for execution on remote environment

The following table shows the dependencies of the profiles to each environment:

| Type | Persist | Auth | Open Search |
| :----------- | :----------- | :----------- | :----------- |
| default | Localhost | Disabled | Disabled |
| local | Localhost | Disabled | Localhost |
| Dummy | dummy or Host define in BPDM_DB_HOST | Catena X dummy Keycloak | dummy or Host defined in BPDM_OPENSEARCH_HOST |  

Authentication:

To integrate already deployed BPDM api with your application, you need to follow steps to generate bearer type token.
On how you can generate the token, you need to follow steps as listed below. There are many ways you can configure token to your application.

Steps:

1. Register the application:  
    Your application will need to register with BPDM in this case dummy OAuth 2.0 provider and obtain a client ID and client secret.  
    This process typically involves creating an account and specifying the required permissions and scopes that your application will need to access BPDM APIs.

2. Redirect the your application user to BPDM OAuth 2.0 authorization endpoint:  
    Once the your application has obtained your client credentials, you can initiate the OAuth 2.0 authorization flow by redirecting your users to BPDM OAuth 2.0 authorization endpoint.  
    This endpoint typically involves prompting the user to grant permission for the your application to access BPDM APIs, specifying the required scopes, and possibly requiring the user to log in or authenticate with BPDM OAuth 2.0 provider.

3. Receive an authorization code:  
    After the user grants permission, BPDM OAuth 2.0 authorization server will redirect the user back to the your application with an authorization code.  
    This code is a one-time use token that the your application will need to exchange for an access token in the next step.

4. Exchange the authorization code for an access token:  
    Your application can exchange the authorization code for an access token by sending a request to BPDM OAuth 2.0 token endpoint, along with their client ID, client secret, authorization code, and any other required parameters.  
    This request typically uses the OAuth 2.0 grant type "authorization code." If the request is successful, BPDM OAuth 2.0 server will respond with an access token, which can be used to make API requests on behalf of the user.

5. Use the access token to access the API:  
    Once your application has obtained an access token, you can use it to make API requests on behalf of the user.  
    The access token is typically sent in the "Authorization" header of API requests as a bearer token.
