---
id: api-specifications
title: API Specifications
description: 'API Specifications and Reference Implementations for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## API Specifications

### Core APIs

The Data Trust & Security KIT provides several REST APIs for different aspects of trust management:

#### Trusted List API

**Base Path**: `/api/v1/trusted-list`

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/issuers` | GET | Retrieve list of trusted issuers | `useCase`, `status` |
| `/issuers/{did}` | GET | Get specific issuer details | `did` (path) |
| `/issuers/{did}/verify` | POST | Verify issuer credentials | `did` (path), credential (body) |

#### Verification API

**Base Path**: `/api/v1/verification`

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/credentials/verify` | POST | Verify verifiable credential | credential (body) |
| `/credentials/status` | GET | Check credential revocation status | `credentialId` |
| `/batch/verify` | POST | Batch verify multiple credentials | credentials array (body) |

#### Certificate Issuance API

**Base Path**: `/api/v1/certificates`

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/issue` | POST | Issue new verifiable credential | credential data (body) |
| `/revoke` | POST | Revoke existing credential | `credentialId`, reason |
| `/status/{id}` | GET | Get certificate status | `id` (path) |

### API Security

All APIs implement security measures aligned with Catena-X standards:

- **Authorization**: Role and BPN-based access control
- **Rate Limiting**: API rate limits to prevent abuse
- **Input Validation**: Comprehensive input sanitization and validation
- **Audit Logging**: Complete audit trail of all operations

## Reference Implementations

### Documentation and Repositories

The following resources provide comprehensive implementation guidance:

- **Specification Documents**: Detailed technical specifications for each component
- **Reference Architecture**: Complete architectural diagrams and component interactions
- **Sample Implementations**: Working code examples in multiple programming languages
- **Integration Guides**: Step-by-step integration instructions

### Sample Data Models

#### Verifiable Credential Schema Example

Following the schema from Verifiable Credentials v2.0:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Root Verifiable Credential Schema",
  "type": "object",
  "required": [
    "@context",
    "type",
    "semanticId",
    "credentialSubject",
    "id",
    "issuer",
    "validFrom",
    "validUntil",
    "credentialStatus",
    "proof"
  ],
  "properties": {
    "@context": {
      "type": "array",
      "items": { "type": "string" }
    },
    "type": {
      "type": "array",
      "items": { "type": "string" }
    },
    "semanticId": {
      "type": "string"
    },
    "credentialSubject": {
      "type": "object"
    },
    "id": {
      "type": "string",
      "format": "uri"
    },
    "issuer": {
      "type": "string"
    },
    "validFrom": {
      "type": "string",
      "format": "date-time"
    },
    "validUntil": {
      "type": "string",
      "format": "date-time"
    },
    "credentialStatus": {
      "type": "object"
    },
    "proof": {
      "type": "object"
    }
  },
  "additionalProperties": false
}
```

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0

- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation

- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io