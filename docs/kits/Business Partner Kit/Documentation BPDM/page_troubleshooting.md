---
id: Troubleshooting
title: Troubleshooting
description: ''
sidebar_position: 5
---
Depending on usage, we have categorized trobleshooting for two types of user.

## Running BPDM service locally

1. Ensure that all the prerequisites are installed and properly configured before attempting to run the BPDM service. The required software includes Maven, JDK17, PostgreSQL 14.2, OpenSearch 2.1.0, and Keycloak 17.0.0. Make sure that you have the correct versions of these software installed and that they are properly configured.

2. Make sure that the Postgresql database and Opensearch instance are available and can be connected to by the BPDM service. The default configuration expects Postgresql to run on localhost on port 5432 and Opensearch to run on localhost on port 9200. If you are running the database and/or instance on a different host or port, you will need to update the configuration files accordingly.

3. Check the configuration files (application.properties, application-auth.properties, and application-saas.properties) for any errors or misconfigurations. These files contain important information about how the BPDM service is configured and what resources it relies on.

4. If you are running the BPDM Gate, ensure that it can connect to the BPDM Pool API and the remote SaaS storage and datasource. The default configuration expects the BPDM Pool instance to be located at localhost with port 8080. If you are running the BPDM Pool on a different host or port, you will need to update the configuration files accordingly.

5. Check the profiles (default, auth, and saas for BPDM Pool, and default, auth, and auth-pool for BPDM Gate) to make sure that they are properly configured for your specific use case. These profiles define how the BPDM service will behave under different circumstances and can be customized to fit your specific needs.

6. If you encounter any errors or issues when running or deploying the BPDM service, refer to the [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) and [README.md](https://github.com/eclipse-tractusx/bpdm/blob/main/README.md)  files for troubleshooting tips and other helpful information. These files contain detailed instructions on how to install and configure the BPDM service and can be a valuable resource when encountering problems.

## Intergrating with BPDM api

1. Connectivity issues:  
    Ensure that your application can communicate with the BPDM server over the network. Check the server status, firewall rules, and network configurations.

2. Authorization issues:  
    Make sure that your application has obtained a valid access bearer token from BPDM OAuth 2.0 provider, and that the token has the necessary scopes and permissions to access the requested resources for more details can check on [authorization steps](page_documentation-bpdm.md#intergrating-with-bpdm-api).

3. API endpoint issues:  
    Double-check that you are using the correct endpoint URLs, HTTP methods, and parameters when making API requests. Refer to the API documentation or contact the BPDM api support team for assistance.

4. Data format issues:  
    Verify that the data format of your API requests and responses match the expected data format specified in the API documentation. For example, some API endpoints may require JSON payload, while others may require form data or query parameters.

5. Error handling issues:  
    Handle any errors that may occur during API requests and responses, such as HTTP error codes, error messages, or exception stack traces. Check the API documentation for the expected error codes and messages, and handle them accordingly in your application code.

6. API versioning issues:  
    Keep track of the BPDM API version changes and ensure that your application code is compatible with the current version. Test your application with different API versions and handle any compatibility issues accordingly.

7. Environment issues:  
    Make sure that your application is using the correct environment profile (e.g. default, local, or dummy) depending on the deployment location and configuration. Check the configuration files and environment variables for any discrepancies or errors.
