---
id: Best Practices
title: Best Practices
description: ''
sidebar_position: 4
---

Depending on usage, we have categorized best practices for two types of user.

## Running BPDM service locally

1. Ensure that you have all the prerequisites installed before attempting to run the BPDM service. These include Maven, JDK17, PostgreSQL 14.2, OpenSearch 2.1.0, Keycloak 17.0.0, and a connection to an SaaS.

2. Follow the instructions provided in the [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) and [README.md](https://github.com/eclipse-tractusx/bpdm/blob/main/README.md) files carefully to ensure that you install and configure the service correctly.

3. Use the default configuration settings for PostgreSQL and OpenSearch unless you have a specific reason to change them.

4. Ensure that you have a Postgresql database and an Opensearch instance available to connect to before attempting to run the service or you can use existing config using [docker-compose.yml](https://github.com/eclipse-tractusx/bpdm/blob/main/docker-compose.yml).

5. Check the configuration files, such as application.properties, application-auth.properties, and application-saas.properties, to ensure that they are correctly configured for your environment.

6. Use the REST API documentation provided at <http://localhost:8080/api/swagger-ui> and <http://localhost:8081/api/swagger-ui> for the BPDM Pool and Gate respectively to familiarize yourself with the API and to test your setup.

7. Use the profiles, such as default, auth, and saas, provided by the service to configure it for your specific use case.

8. Ensure that you have a connection to the BPDM Pool API if you plan to use the BPDM Gate. Follow standard security practices when deploying the BPDM service, such as securing access to the service, and securing access to any data or credentials used by the service.

## Intergrating with BPDM api

1. Always use secure connections:  
    Ensure that you use HTTPS protocol instead of HTTP to make API requests to the BPDM server. This ensures the security and confidentiality of the data being transmitted.

2. Follow the API documentation [getting Started section](page_documentation-bpdm.md#intergrating-with-bpdm-api) :  
    Read the BPDM API documentation carefully and follow the guidelines provided. This will help you to understand the API, its capabilities, and how to use it properly.

3. Use proper authentication using OAuth 2.0:  
    Use the appropriate authentication method provided by BPDM service and also mentioned steps for [authentication](page_documentation-bpdm.md#intergrating-with-bpdm-api) to access the API. This will ensure that only authorized users have access to the API.

4. Handle errors gracefully:  
    Always handle errors returned by the API gracefully and provide meaningful error messages to the user. This will help to diagnose and resolve any issues that may occur.

5. Use appropriate data types:  
    Use the appropriate data types when sending data to the API and when receiving data from it. This will help to ensure that the data is correctly interpreted and processed by both your application and the API.

6. Test thoroughly:  
    Test your application thoroughly before deploying it in a production environment. This will help to identify any issues or bugs before they can impact users or the BPDM API service.

7. Monitor usage:  
    Monitor your application's usage of the BPDM API to ensure that it is not consuming too many resources or causing performance issues. If necessary, adjust your application's usage or scale up the resources it uses.  
