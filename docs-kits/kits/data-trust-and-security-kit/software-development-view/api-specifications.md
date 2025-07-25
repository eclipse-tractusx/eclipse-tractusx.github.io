---
id: api-specifications
title: API Specifications
description: 'API Specifications and Reference Implementations for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## API Specifications

### The APIs You'll Use

The Data Trust & Security KIT provides REST APIs that make it easy to add trust and verification features to your applications. Think of these APIs as the building blocks you'll use to check whether data is trustworthy.

#### Trusted List API - Finding Qualified Verifiers

This API helps you find out which organizations are qualified to verify different types of data.

**Base URL**: `/api/v1/trusted-list`

| What You Want to Do | HTTP Method | Endpoint | What You Send |
|---------------------|-------------|----------|---------------|
| Get list of trusted verifiers | GET | `/issuers` | Use case type, status filter |
| Get details about a specific verifier | GET | `/issuers/{did}` | Organization's digital ID |
| Check if a verifier's certificate is valid | POST | `/issuers/{did}/verify` | Organization's digital ID + certificate data |

#### Verification API - Checking Data Authenticity

This API lets you verify whether data certificates are legitimate and haven't been tampered with.

**Base URL**: `/api/v1/verification`

| What You Want to Do | HTTP Method | Endpoint | What You Send |
|---------------------|-------------|----------|---------------|
| Verify a digital certificate | POST | `/credentials/verify` | Certificate data |
| Check if a certificate was revoked | GET | `/credentials/status` | Certificate ID |
| Verify multiple certificates at once | POST | `/batch/verify` | Array of certificate data |

#### Certificate Issuance API - Creating New Certificates

This API is for qualified organizations that need to issue new data certificates.

**Base URL**: `/api/v1/certificates`

| What You Want to Do | HTTP Method | Endpoint | What You Send |
|---------------------|-------------|----------|---------------|
| Issue a new certificate | POST | `/issue` | Data to be certified |
| Cancel/revoke a certificate | POST | `/revoke` | Certificate ID + reason |
| Check certificate status | GET | `/status/{id}` | Certificate ID |

### Security and Access Control

All these APIs follow Tractus-X security standards to protect against misuse:

- **Role-Based Access** - Only authorized organizations can access certain functions
- **Rate Limiting** - Prevents abuse by limiting how many requests you can make
- **Input Validation** - All data gets checked and cleaned before processing
- **Audit Trails** - Every API call gets logged for security monitoring

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
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
