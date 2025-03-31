---
id: use-cases
title: Use Cases
description: ''
sidebar_position: 5
---

Here in this section, we have provided use cases along with how end to end tests can be performed on local machine.

## 1 - Execute automated end to end test

To perform end-to-end test of all Business Partner Data Management (BPDM) services using the `bpdm-system-tester` module, follow the detailed steps below.
This guide will help you set up your local environment, configure necessary services, and execute tests to ensure the BPDM services function as expected.

### Local environment setup

To run BPDM services and tester module, BPDM offers multiple ways like using Helm Charts or using Dockerfiles depending upon different scenarios.
For more details on how can you run services on different environment, you can follow instructions mentioned in [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md) file.

#### Prerequisites

- JAVA 21
- Maven (3.9 supported)
- Docker Engine
- Docker Compose

#### Installation Steps

##### 1.1 Start BPDM Api Services

1. Clone the repository:
    - Go to the following GitHub repository: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
    - Clone the repository to your local system using Git. You can use the following command:

    ```bash
    git clone https://github.com/eclipse-tractusx/bpdm
    ```

    - Choose an IDE: You can use any IDE of your preference to view the code. One recommended IDE is IntelliJ IDEA as application is based on Kotlin springBoot framework.

2. Configure local service:

    On default, the BPDM Gate supports a simple multi-tenancy feature. Each company, identified by the BPNL of the accessing user, has a separate tenant of business partner data in one Gate.

    Alternatively, a BPDM Gate can be configured to be single tenant only. This allows access for users only from a single company identified by its BPNL.

    ```bash
    bpdm:
        bpn:
            owner-bpn-l: BPNLXXXXXXXXXX01
    ```

    If it is set with a BPNL only users belonging to that company can access the Gate. If it is not set or set to null a user from any company can use the Gate, albeit the user can only see its own company shared business partner data.

3. Start BPDM services sequentially:

    BPDM services require a PostgreSQL database and Keycloak server to run. Navigate to the root folder of the BPDM repository. Then set up the necessary dependencies by using the provided Docker Compose file:

    ```bash
    docker compose -f docker/compose/dependencies/docker-compose.yml up -d
    ```

    This will run a Postgres and Keycloak with an initial realm already configured to be used by the BPDM services. After this step, we can build and install the BPDM applications.

    ```bash
    mvn clean install
    ```

    Each BPDM application can now be run separately. We will run each application after another. For this, we navigate into the application's subfolder and run the application with the spring-boot run goal.

    ```bash
    cd bpdm-orchestrator
    mvn spring-boot:run
    cd ../bpdm-cleaning-service-dummy
    mvn spring-boot:run
    cd ../bpdm-pool
    mvn spring-boot:run
    cd ../bpdm-gate
    mvn spring-boot:run
    ```

### Start Automated E2E Test

The `bpdm-system-tester` module is responsible for performing automated end to end test. To get more details about test data and scenarios which are running under automated test,
you can visit [feature](https://github.com/eclipse-tractusx/bpdm/tree/main/bpdm-system-tester/src/main/resources/cucumber) file folder.

now you can run the `bpdm-system-tester` application with the spring-boot run goal.

```bash
cd bpdm-system-tester
mvn spring-boot:run
```

This will execute all the test scenarios parallelly and will be finished in 3-4 minutes of time.

## 2 - Request Business Partner Changelogs

Similarly based on use case 1, if you have executed automated end to end test successfully on your local machine then you can easily search for intput and output changelogs of involved business partners during tests.

example, you can have below request from BPDM-GATE service after execution of automated tests

### Input Changelogs

Request -

```bash
curl --location 'http://localhost:8081/v6/input/changelog/search?page=0&size=5' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
  "timestampAfter": "2023-03-20T10:23:28.194Z",
  "externalIds": [
  ]
}'
```

Response - will be something like below.

```bash
{
    "totalElements": 28,
    "totalPages": 6,
    "page": 0,
    "contentSize": 5,
    "content": [
        {
            "externalId": "CC_SHG_WATT_4_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:39:33.607852Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WATT_5_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:39:33.607866Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WAT_1_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:39:33.607866Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WATT_7_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:39:33.607852Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WAT_2_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:39:33.607866Z",
            "changelogType": "CREATE"
        }
    ],
    "invalidEntries": 0,
    "errors": []
}
```

### Output Changelogs

Request -

```bash
curl --location 'http://localhost:8081/v6/output/changelog/search?page=0&size=3' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
  "timestampAfter": "2023-03-20T10:23:28.194Z",
  "externalIds": [
    
  ]
}'
```

Response - will be something like below.

```bash
{
    "totalElements": 14,
    "totalPages": 5,
    "page": 0,
    "contentSize": 3,
    "content": [
        {
            "externalId": "CC_SHG_WAT_0_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:41:30.715125Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WAT_2_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:41:30.718923Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "CC_SHG_WAT_1_2025-02-05T07:39:31.981320Z",
            "timestamp": "2025-02-05T07:41:30.722869Z",
            "changelogType": "CREATE"
        }
    ],
    "invalidEntries": 0,
    "errors": []
}
```
