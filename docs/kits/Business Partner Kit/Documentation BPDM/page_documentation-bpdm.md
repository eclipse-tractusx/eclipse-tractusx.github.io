---
id: Introduction
title: Introduction
description: ''
sidebar_position: 1
---

![Business partner kit banner](../../../../static/img/doc-business_partner_header-minified.png)

## Introduction

BPDM (Business Partner Data Management) is a core component of the Catena-X project, which aims to create a secure, trusted, and standardized ecosystem for the exchange of data among various stakeholders in the automotive industry. BPDM provides services for querying, adding, and managing business partner base information in the Catena-X landscape.

The BPDM is comprised of two primary services: BPDM Pool and BPDM Gate. The BPDM Pool serves as the single source of truth for business partner base information, including official identifiers, addresses, and other key details. Each record in the Pool has a unique identifier, called the business partner number (BPN), which enables it to be referenced across the entire Catena-X ecosystem. Business partner records in the Pool are organized into three categories: legal entities, sites, and partner addresses. A legal entity represents the primary information about a business partner, while a site may represent a plant or campus with several contact and delivery addresses. An address partner represents the location of a legal entity or site with a single contact/delivery address.

The BPDM Pool offers an API that enables Catena-X members to query business partner records by BPN, other identifiers, or through a text search. This API is designed to provide quick and easy access to critical business partner data, allowing Catena-X members to make informed decisions based on reliable information.

The BPDM Gate, on the other hand, provides a mechanism for Catena-X members to share their own business partner data with the Catena-X ecosystem. Members who share their data with Catena-X are called sharing members. Through the Gate service, sharing members can add their own business partner records and retrieve cleaned and enhanced data in return. This shared business partner data undergoes a validation and enhancement process before it is integrated into the BPDM Pool and assigned a BPN.

Overall, BPDM plays a crucial role in creating a standardized and secure ecosystem for the exchange of business partner data in the automotive industry. Its services enable Catena-X members to easily access reliable and up-to-date business partner data and to share their own data with confidence, while ensuring data security and privacy.

## Getting Started

Getting started is easy. Here is a summary of the information that might help you get started:

You will need to get a technical user and authentication via OAuth 2.0. You can find the getting started documentation with a description on how to get the technical user here. Once you have technical user, then you can get secrets from [vault](https://centralidp.demo.catena-x.net/) and can be used for authentication.
After that, you start an authorization request via the API and get an access token, with that you can start requesting data from the resource. API requests without authentication will fail.

Authorization URL

[https://centralidp.demo.catena-x.net/auth/realms/CXCentral/protocol/openid-connect/auth](https://centralidp.demo.catena-x.net/auth/realms/CXCentral/protocol/openid-connect/auth)

Token URL

[https://centralidp.demo.catena-x.net/auth/realms/CX-Central/protocol/openidconnect/token](https://centralidp.demo.catena-x.net/auth/realms/CX-Central/protocol/openidconnect/token)

### BPDM Pool

1. BPDM Pool is a SpringBoot Kotlin software project managed by Maven.
2. The project can be run with the following command: mvn clean spring-boot:run
3. Prerequisites: Maven, JDK17, PostgreSQL 14.2, OpenSearch 2.1.0, Keycloak 17.0.0, Connection to an SaaS.
4. The project requires a Postgresql database and an Opensearch instance to be available to connect to.
5. Default configuration: postgres to run on localhost on port 5432, Opensearch to run on localhost on port 9200.
6. Configuration files: application.properties, application-auth.properties, and application-saas.properties.
7. REST API documentation: <http://localhost:8080/api/swagger-ui>.
8. Profiles: default, auth, and saas.

### BPDM Gate

1. BPDM Gate is a SpringBoot Kotlin software project managed by Maven.
2. The project can be run with the following command: mvn clean spring-boot:run
3. Prerequisites: Maven, JDK17, Connection to an SaaS, Connection to BPDM Pool API, Keycloak 17.0.0.
4. The Gate requires a remote SaaS storage and datasource to exchange data with.
5. Default configuration: BPDM Pool instance expected at localhost with port 8080.
6. Configuration files: application.properties, application-auth.properties, and application-pool-auth.properties.
7. REST API documentation: <http://localhost:8081/api/swagger-ui>.
8. Profiles: default, auth, and auth-pool.

#### Note

It is important to follow the instructions mentioned in the respective files to ensure successful installation and configuration.
