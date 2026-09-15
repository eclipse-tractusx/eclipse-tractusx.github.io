---
id: use-cases
title: Use Cases
description: Business Partner KIT
sidebar_position: 5
---

This section shows how to run the BPDM services locally and execute the end-to-end tests against them.

## 1 - Execute automated end to end test

The steps below set up a local stack of all Business Partner Data Management (BPDM) services and run the `bpdm-system-tester` module against it.

### Local environment setup

Other ways to run the services - Helm Charts, Dockerfiles - are described in [INSTALL.md](https://github.com/eclipse-tractusx/bpdm/blob/main/INSTALL.md).

#### Prerequisites

- JAVA 21
- Maven (3.9 supported)
- Docker Engine (tested on 29.5.3)
- Docker Compose (tested on 5.1.4)

#### Installation Steps

##### 1.1 Check out the code

Clone the repository:

```bash
git clone https://github.com/eclipse-tractusx/bpdm
```

The applications are Kotlin Spring Boot projects, so IntelliJ IDEA is a good fit for browsing them.

##### 1.2 Start the dependencies

BPDM services require a PostgreSQL database and a Keycloak server.
From the root folder of the repository, write the Keycloak admin password into the `.env` file the Compose file expects (it is not part of the repository; without it only the admin console is unusable):

```bash
echo "KEYCLOAK_ADMIN_PASSWORD=admin" > docker/compose/dependencies/.env
```

Then start both dependencies:

```bash
docker compose -f docker/compose/dependencies/docker-compose.yml up -d
```

Keycloak is reachable on [http://localhost:8180](http://localhost:8180) and serves an already configured `BPDM` realm.

##### 1.3 Build and start the BPDM services

Build the applications:

```bash
mvn clean install
```

Then start them in this order - the Pool refuses to start while the Orchestrator is unreachable, and the Gate while either the Pool or the Orchestrator is:

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

The applications serve their APIs on:

| Application                 | URL                                              |
|-----------------------------|--------------------------------------------------|
| BPDM Pool                   | [http://localhost:8080](http://localhost:8080)   |
| BPDM Gate                   | [http://localhost:8081](http://localhost:8081)   |
| BPDM Cleaning Service Dummy | [http://localhost:8084](http://localhost:8084)   |
| BPDM Orchestrator           | [http://localhost:8085](http://localhost:8085)   |

##### 1.4 Start the further Gates

Scenarios in which two or three sharing members share one golden record need further Gates: each member reflecting the other's master data changes, the sharing member count, and the confidence level, which the count raises from three members on.
The `gate-2` and `gate-3` profiles provide them. Start them once the rest of the stack is up:

```bash
cd bpdm-gate
mvn spring-boot:run -Dspring-boot.run.profiles=gate-2
mvn spring-boot:run -Dspring-boot.run.profiles=gate-3
```

They run on ports 8082 and 8083 against their own `bpdm_gate_2` and `bpdm_gate_3` databases (created by the Docker Compose file above), owned by `BPNL000000000002` and `BPNL000000000003`.

:::caution

The system tester names all three Gates in its default configuration.
A stack running only the first Gate **fails** the scenarios that need the others rather than skipping them; see [Start Automated E2E Test](#start-automated-e2e-test) for how to act for fewer sharing members.

:::

##### 1.5 Gate configuration (optional)

On default a Gate is multi-tenant: each company, identified by the BPNL of the accessing user, has its own tenant of business partner data and only ever sees that.

Setting an owner BPNL makes the Gate single-tenant, so only users of that company can access it:

```yaml
bpdm:
  bpn:
    owner-bpn-l: BPNLXXXXXXXXXX01
```

### Start Automated E2E Test

The `bpdm-system-tester` module runs the automated end-to-end tests. It is a Cucumber suite packaged as an executable JAR, built once and then run against the running stack.
Its test data and scenarios are in the [feature](https://github.com/eclipse-tractusx/bpdm/tree/main/bpdm-system-tester/src/main/resources/cucumber) file folder.

Build the JAR from the project root:

```bash
mvn -B -U clean package -pl bpdm-system-tester -am -DskipTests
```

Then run it:

```bash
java -jar bpdm-system-tester/target/bpdm-system-tester.jar
```

A local run needs no configuration: the base URLs and technical users of all three Gates, the Pool and the Orchestrator are the tester's checked-in defaults and match the imported realm.
Scenarios run in parallel with 32 threads unless `--threads` is passed.

Clearing the base URL of a Gate takes that sharing member out of the run; its scenarios are then skipped instead of failed:

```bash
BPDM_CLIENT_GATE_3_INPUT_BASE_URL= java -jar bpdm-system-tester/target/bpdm-system-tester.jar
```

Filter by tag to run only the fast round-trip smoke scenarios:

```bash
java -jar bpdm-system-tester/target/bpdm-system-tester.jar --tags @Smoke
```

A JSON report is not written by default; pass the plugin to enable it:

```bash
java -jar bpdm-system-tester/target/bpdm-system-tester.jar --plugin json:target/cucumber-report.json
```

Running the suite against a deployed environment is described in the [system tester README](https://github.com/eclipse-tractusx/bpdm/blob/main/bpdm-system-tester/README.md).

## 2 - Request Business Partner Changelogs

After a successful test run, the input and output changelogs of the business partners involved can be searched on the Gate.

### Obtain an access token

The Gate API is an OAuth2 resource server, so a request needs a bearer token.
Request one over the client credentials flow from the local `BPDM` realm, where every service account client uses `**********` as its secret:

```bash
TOKEN=$(curl -s -X POST 'http://localhost:8180/realms/BPDM/protocol/openid-connect/token' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode 'client_id=BPDM_GATE' \
  --data-urlencode 'client_secret=**********' | jq -r '.access_token')
```

:::note

`BPDM_GATE` covers the whole Gate API. The realm also holds `BPDM_GATE_INPUT_CONSUMER`, `BPDM_GATE_INPUT_MANAGER` and `BPDM_GATE_OUTPUT_CONSUMER`, which hold one permission group each, like a Portal-managed technical user.

:::

### Input Changelogs

Request:

```bash
curl --location 'http://localhost:8081/v7/input/business-partners/changelog/search?page=0&size=5' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $TOKEN" \
--data '{
  "timestampAfter": "2023-03-20T10:23:28.194Z",
  "externalIds": [
  ]
}'
```

Response:

```json
{
    "totalElements": 28,
    "totalPages": 6,
    "page": 0,
    "contentSize": 5,
    "content": [
        {
            "externalId": "acme-record-1-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:39:33.607852Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "acme-record-2-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:39:33.607866Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "predecessor-address-record-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:39:33.607866Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "successor-address-record-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:39:33.607852Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "site-record-1-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:39:33.607866Z",
            "changelogType": "CREATE"
        }
    ],
    "invalidEntries": 0,
    "errors": []
}
```

The tester composes the external IDs from the record name, the scenario and the start time of the run, so the values differ with every run.

### Output Changelogs

Request:

```bash
curl --location 'http://localhost:8081/v7/output/business-partners/changelog/search?page=0&size=3' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $TOKEN" \
--data '{
  "timestampAfter": "2023-03-20T10:23:28.194Z",
  "externalIds": [

  ]
}'
```

Response:

```json
{
    "totalElements": 14,
    "totalPages": 5,
    "page": 0,
    "contentSize": 3,
    "content": [
        {
            "externalId": "acme-record-1-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:41:30.715125Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "acme-record-2-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:41:30.718923Z",
            "changelogType": "CREATE"
        },
        {
            "externalId": "site-record-1-2026-09-08T07:39:31Z",
            "timestamp": "2026-09-08T07:41:30.722869Z",
            "changelogType": "CREATE"
        }
    ],
    "invalidEntries": 0,
    "errors": []
}
```

:::note

Relations have their own changelog under `/v7/input/relations/changelog/search` and `/v7/output/relations/changelog/search`, with the same request and response shape.
The deprecated v6 API uses different paths; the full endpoint documentation is in [docs/api](https://github.com/eclipse-tractusx/bpdm/blob/main/docs/api/README.md).

:::

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023-2026 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023-2026 SAP SE
- SPDX-FileCopyrightText: 2023-2026 Volkswagen AG
- SPDX-FileCopyrightText: 2023-2026 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023-2026 Mercedes Benz Group
- SPDX-FileCopyrightText: 2023-2026 BASF SE
- SPDX-FileCopyrightText: 2023-2026 Schaeffler AG
- SPDX-FileCopyrightText: 2023-2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/bpdm](https://github.com/eclipse-tractusx/bpdm)
