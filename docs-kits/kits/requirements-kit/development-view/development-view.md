---
id: development-view
title: Development View
sidebar_position: 1
---

<!--
Copyright(c) 2026 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
information regarding copyright ownership.

This work is made available under the terms of the
Creative Commons Attribution 4.0 International (CC-BY-4.0) license,
which is available at
https://creativecommons.org/licenses/by/4.0/legalcode.

SPDX-License-Identifier: CC-BY-4.0
-->

<!-- 
KIT LOGO START - Generated automatically from the configuration done in Kit Master Data
Replace <kit-id> with the id from your kit referenced in `data/kitsData.js`.
Do not remove!
This logo is only visible when compiled with Docusarus (final version of the hosted KIT)
-->

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="requirements" />

<!--
KIT LOGO END
-->

Technical documentation for developers, architects, and implementers.

:::info Target Audience
Software Developers, Solution Architects, Technical Leads, API Developers, Integration Engineers.
:::

---

### More Guides

- - [Architecture Overview](architecture.md)

### Component Diagram

The flowchart illustrates the interactions between four main components in the system:

### Core Components

#### Component 1: Requirement System

**Purpose**: Core component responsible for requirement management

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]

#### Component 2: Eclipse Dataspace Connector (EDC)

**Purpose**: Facilitates data exchange between partners

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]

#### Component 3: Requirement System

**Purpose**: Stores and manages digital twin information

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]

#### Component 4: Requirement System

**Purpose**: Handles submodel data and operations

**Technology Stack**: [Programming language, framework, key dependencies]

**Interfaces**: [Input, output, protocols]


---

## Sequence Diagrams

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant APIGateway
    participant AuthService
    participant CoreService
    
    Client->>APIGateway: Request with credentials
    APIGateway->>AuthService: Validate credentials
    AuthService-->>APIGateway: Auth token
    APIGateway-->>Client: Token response
    Client->>APIGateway: API Request + Token
    APIGateway->>CoreService: Forward request
    CoreService-->>APIGateway: Response
    APIGateway-->>Client: Final response
```

[Brief flow description]

### Data Exchange Flow

```mermaid
sequenceDiagram
    participant Provider
    participant Connector
    participant Consumer
    participant Storage
    
    Provider->>Connector: Offer data asset
    Connector->>Connector: Register asset
    Consumer->>Connector: Query available assets
    Connector-->>Consumer: Asset catalog
    Consumer->>Connector: Request data transfer
    Connector->>Provider: Initiate transfer
    Provider-->>Storage: Push data
    Storage-->>Consumer: Deliver data
```

[Brief flow description]

---

## API Specifications

### API Overview

[List of main APIs with purpose]

### Base URL

```
https://api.example.com/v1
```

### Authentication

[Authentication method: OAuth 2.0 | API Keys | JWT]

```http
Authorization: Bearer <your-access-token>
```

### API Endpoints

#### GET /resources

**Description**: Retrieve resources

**Request**:

```http
GET /v1/resources HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
```

**Response** (200 OK):

```json
{
  "resources": [
    {
      "id": "resource-1",
      "name": "Example Resource",
      "type": "data-asset"
    }
  ]
}
```

#### POST /resources

**Description**: Create a resource

**Request**:

```http
POST /v1/resources HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Resource",
  "type": "data-asset"
}
```

**Response** (201 Created):

```json
{
  "id": "resource-123",
  "name": "New Resource",
  "type": "data-asset"
}
```

### OpenAPI Specification

[Link to OpenAPI specification and Swagger UI]

---

## Standards Compliance

| Standard | Version | Compliance | Description |
|----------|---------|------------|-------------|
| CX-0154 | 1.0.1 | Optional | Standard describing how to handle Master Data in Engineering. This includes parameters of  |
| CX-0155 | 1.0.1 | Mandatory | Describes the required data models and API usage for the  |

### Standard Details

#### Requirements Engineering v.1.0.1

**Compliance Level**: [Mandatory | Optional | Recommended]

**Implementation**: [Brief description]

**Reference**: [CX-0155 Requirements Engineering ](https://catenax-ev.github.io/docs/next/standards/CX-0155-RequirementsEngineering)

#### Requirements Engineering v.1.0.1

**Compliance Level**: [Mandatory | Optional | Recommended]

**Implementation**: [Brief description]

**Reference**: [CX-0155 Requirements Engineering ](https://catenax-ev.github.io/docs/next/standards/CX-0155-RequirementsEngineering)


---

## Logic & Schema

### Business Logic

[Core business logic description]

#### Logic Flow: [Process Name]

**Input**: [Required data]

**Processing Steps**: [Brief description of steps]

**Output**: [Produced data]

### Data Schema

#### Schema: [Schema Name]

**Purpose**: [Schema description]

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier"
    },
    "name": {
      "type": "string",
      "description": "Resource name"
    }
  },
  "required": ["id", "name"]
}
```

**Example**:

```json
{
  "id": "res-001",
  "name": "Example Resource"
}
```

---

## Semantic Models

### Model: [Model Name]

**Version**: X.Y.Z

**Namespace**: `urn:samm:org.eclipse.tractusx.[domain]:[version]#`

**Description**: [Model description]

**Key Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `property1` | string | Yes | [Description] |
| `property2` | integer | No | [Description] |

**Example**:

```json
{
  "@context": {
    "@vocab": "urn:samm:org.eclipse.tractusx.[domain]:[version]#"
  },
  "property1": "value1",
  "property2": 42
}
```

**Reference**: [Link to SAMM specification]

---

## Test Cases

### Test Strategy

- **Unit Tests**: Component-level testing
- **Integration Tests**: API integration testing
- **End-to-End Tests**: Complete workflow testing

### Test Case: [Test Name]

**Objective**: [Test validation purpose]

**Preconditions**: [Required setup]

**Test Steps**: [Brief description]

**Expected Outcome**: [Expected result]

---

## Sample Data

### Sample Dataset: [Dataset Name]

**Purpose**: [Sample purpose]

**Format**: JSON

**Download**: [Link]

**Example**:

```json
{
  "sampleData": [
    {
      "id": "sample-001",
      "field1": "value1"
    }
  ]
}
```

---

## Developer Tutorials

### Quick Start

**Prerequisites**: [List prerequisites]

**Steps**:

1. Clone repository:

```bash
git clone https://github.com/eclipse-tractusx/[repository-name].git
```

2. Configure `application.properties`:

```properties
server.port=8080
api.base-url=https://api.example.com
```

3. Build and run:

```bash
mvn clean install
mvn spring-boot:run
```

4. Verify:

```bash
curl http://localhost:8080/health
```

---

## Integration Examples

### Integration with [System Name]

**Java Example**:

```java
public class KitIntegration {
    private final KitClient client;
    
    public KitIntegration(String apiUrl, String apiKey) {
        this.client = new KitClient(apiUrl, apiKey);
    }
    
    public Resource getResource(String resourceId) {
        return client.resources().get(resourceId);
    }
}
```

**Python Example**:

```python
from kit_sdk import KitClient

client = KitClient(api_url="https://api.example.com", api_key="your-key")
resource = client.resources.get("resource-id")
```

---

## Additional Resources

### Reference Implementations

- [Implementation 1]: [Link]
- [Implementation 2]: [Link]

### SDKs and Libraries

| Language | SDK | Link |
|----------|-----|------|
| Java | [SDK Name] | [Link] |
| Python | [SDK Name] | [Link] |

### Developer Tools

- [Postman Collection](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits/kit-template/resources/postman-collection.json)
- [OpenAPI Generator](https://openapi-generator.tech/)

---

#### Interactions

The system architecture demonstrates how components interact to facilitate requirement exchange:

- **Requirement System Operations**
  - Registers Digital Twins and Submodel Descriptors in the Digital Twin Registry
  - Provides Requirement Submodels to the Submodel Service
  - Uses the Eclipse Dataspace Connector to request requirements and send notifications
- **Eclipse Dataspace Connector (EDC)**
  - Handles notifications sent from partners back to the Requirement System
  - Acts as the communication bridge between partners
- **Digital Twin Registry**
  - Provides Digital Twins to the Eclipse Dataspace Connector
- **Submodel Service**
  - Provides Submodels to the Eclipse Dataspace Connector

```mermaid
flowchart LR

reqSysC[Requirement System]
dtrC[Digital Twin Registry]
submodelC[Submodel Service]
edcC[Eclipse Dataspace Connector]

reqSysC -- Register Digital Twins and Submodel Descriptors --> dtrC
reqSysC -- Provide Requirement Submodels --> submodelC
reqSysC -- Use EDC to Request Requirements and send notifications --> edcC
edcC -- Handle Notifications sent from partner --> reqSysC
dtrC -- Provide Digital Twins --> edcC
submodelC -- Provide Submodels --> edcC

```

### Requirement Exchange Sequence

The sequence diagram illustrates the requirement exchange flow between a Customer (e.g., an OEM) and a Supplier:

1. **Initial Requirement Creation**:

    - Customer creates a requirement in their requirements system and registers it in their DTR and creates a submodel.
    - Customer's system sends a notification through the EDC to the Supplier

2. **Requirement Request**:

    - Supplier's system requests the requirement details through the EDC
    - The requirement is transferred from Customer's DTR to Supplier's DTR and submodel service

3. **Requirement Update**:

    - After processing, Supplier updates the requirement in their requirements system
    - Supplier sends a notification about the update through the EDC back to the Customer
    - Customer is notified about the requirement update

4. **Next interactions**:

- The process can be repeated for further updates or new requirements in an interactive manner between the Customer and Supplier.

The diagram shows the core components involved in this exchange:

- Requirement Systems (on both Customer and Supplier sides)
- Digital Twin Registry (DTR) & Submodel Services
- Eclipse Dataspace Connector (EDC) for secure data exchange
- Solid lines indicate dataflow
- Dashed lines indicate initialization of a request

```mermaid

sequenceDiagram
    participant oemReqSys as Requirement System Customer
    participant oemDtr as DTR & Submodel Service Customer
    participant oemEDC as EDC Customer

    participant supEDC as EDC Supplier
    participant supDtr as DTR & Submodel Service Supplier
    participant supReqSys as Requirement System Supplier

    oemReqSys->>oemDtr: Requirement (DTR + Submodel)
    oemReqSys->>oemEDC: Notification
    oemEDC->>supEDC: Notification
    supEDC->>supReqSys: Notification
    supReqSys-->>supEDC: Request Requirement


    supEDC-->>oemEDC: Request Requirement
    oemEDC-->>oemDtr: Request Requirement

    oemDtr->>oemEDC: Requirement

    oemEDC->>supEDC: Requirement
    supEDC->>supDtr: Requirement (DTR + Submodel)

    supDtr->>supReqSys: Requirement

    supReqSys->>supDtr: Update Requirement
    supReqSys->>supEDC: Notification (updated Requirement)
    supEDC->>oemEDC: Notification (updated Requirement)
    oemEDC->>oemReqSys: Notification (updated Requirement)


```

## Requirements Aspect Model

The following section gives an overview of the requirements aspect model. The requirements aspect model is a submodel that contains the requirements information and the status of the requirement.

| Digital Twin Type | Aspect Model | Mandatory Version | Optional Versions | KIT | Standard |
| :-- | :-- | :-- | :-- | :-- | :-- |
| PartType | Requirements | 1.0.0 | | Requirements | CX-0155 |

### Example of a Requirements Aspect Model

```json
{
  "requirementRelations": [
    {
      "relatedRequirementId": "urn:uuid:e6b31BC2-8102-64AF-034D-C2DC35E37cEE",
      "requiremementRelationshipType": "RequirementSpecialismOfRequirement"
    }
  ],
  "requirementId": "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df",
  "requirementInformation": {
    "foreignId": "3.1.1",
    "longname": "Plastic deformation of the bogie",
    "versionPredecessor": {
      "versionPredecessorNumber": "1.4.5",
      "versionPredecessorId": "AeEf3f22-Af51-EDF0-29D2-Ba086b386A5E"
    },
    "creationdate": "2025-06-05T09:35:16.166+02:00",
    "metadata": [
      {
        "value": "2025-11-30T00:00:00.000+02:00",
        "metadataDescription": "Timestamp of the expected finalization of the requirement",
        "key": "ExpectedFinalization"
      }
    ],
    "author": "Lisa Dräxlmaier GmbH",
    "reqifType": "Functional",
    "reqifName": "Plastic deformation of the bogie",
    "description": "eOMtThyhVNLWUZNRcBaQKxI",
    "specification": [
      "https://www.prostep.org/fileadmin/prod-pay-download-8c1d/Recommendation_ReqIF_V2.2.pdf"
    ],
    "version": {
      "versionNumber": "2.0.0",
      "versionId": "B50C5243-9590-Eaa5-dA9e-Adb383e2cFf6"
    }
  },
  "requirementStatus": {
    "customerStatus": [
      {
        "customerStatusComment": "Requirement needs to be evaluated",
        "customerStatusValue": "<empty>",
        "customerStatusTimestamp": "2025-06-05T09:35:16.166+02:00"
      }
    ],
    "supplierStatus": [
      {
        "supplierStatusTimestamp": "2025-06-05T09:35:16.166+02:00",
        "supplierStatusValue": "<empty>",
        "supplierStatusComment": "More information needed from customer"
      }
    ],
    "statusValue": "transition status",
    "statusTimestamp": "2025-06-05T09:35:16.166+02:00"
  }
}

```

## Notification Format

The notification format used for the requirements exchange is based on the [Industry Core Kit's standardized notification format](../industry-core-kit/software-development-view/notifications). The following example illustrates a notification sent from a Customer to a Supplier when a new requirement is created:

```json
{
  "header": {
    "messageId": "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df",
    "context": "Requirements-DigitalTwinEventAPI-[Create|Update|Delete]:1.0.0",
    "sentDateTime": "2024-07-05T08:13:33.20733Z",
    "senderBpn": "BPNL000000000AAA",
    "receiverBpn": "BPNL000000000ZZZ",
    "expectedResponseBy": "2024-07-08T08:13:33.20733Z",
    "version": "3.0.0"
  },
  "content": {
    "requirementId": "UfzQhdgLLfDTDGspDb",
    "description": "New requirement created for part type.",
  }
}
```

- ```requirementId```: ```requirementId``` in requirements datamodel

<!--
- ```description```:
- ToDo: Clarify if ```context``` is the right place for create/update/delete information or if this should be moved to ```content```
-->

Base idea of notifications: Only technical information about creation/change/deletion of requirement. Descriptive information about changes and comments are stored directly within the requirement submodels.

## EDC Setup

In order to set up the EDC for the requirements use-case, the following steps are necessary:

- [Setup for the DTR](../digital-twin-kit/software-development-view/) in order to provide access to the Digital Twins for the partners
- [Notifications](../industry-core-kit/software-development-view/notifications) to inform the partners about new requirements or updates. In the requirements use-case the standardized notifications from the Industry Core Kit are used.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Dräxlmaier GmbH & Co. KG
- SPDX-FileCopyrightText: 2025 Schaeffler AG
- SPDX-FileCopyrightText: 2025 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2025 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
