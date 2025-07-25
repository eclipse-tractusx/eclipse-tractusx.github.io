---
id: api-specifications
title: API Specifications
description: 'API Specifications and Reference Implementations for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## API Specifications

### The APIs you can implement

The Data Trust & Security KIT provides REST APIs that make it easy to add trust and verification features to your applications. Think of these APIs as the building blocks you'll use to check whether data is trustworthy.

#### Trusted List API - Finding Qualified Verifiers

This API helps you find out which organizations are qualified to verify different types of data.

**Base URL**: `/api/v1/trusted-list`

| What You Want to Do | HTTP Method | Endpoint | What You Send |
|---------------------|-------------|----------|---------------|
| Get list of trusted verifiers | GET | `/issuers` | Use case type, status filter |
| Get details about a specific verifier | GET | `/issuers/{did}` | Organization's digital ID |
| Check if a verifier's certificate is valid | POST | `/issuers/{did}/verify` | Organization's digital ID + certificate data |
| Add new issuer to trusted list | POST | `/issuers` | Issuer details + accreditation proof |
|Update issuer information | PUT | `/issuers/{did}` | Updated issuer detail |
| Remove issuer from trusted list | DELETE | **`/issuers/{did}` | Removal reason + authorization |
| Update issuer status | PATCH | `/issuers/{did}/status` | New status (active/suspended/revoked) |

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

### Issuer Management Examples

#### Adding a New Issuer to Trusted List

**Request**: `POST /api/v1/trusted-list/issuers`

```json
{
  "did": "did:web:new-auditor.com",
  "name": "Green Certification Auditors Ltd",
  "accreditationScope": [
    "carbon-footprint-verification",
    "sustainability-metrics",
    "iso-14067-compliance"
  ],
  "accreditationAuthority": "ISO/IEC 17065 Accreditation Body",
  "accreditationCertificate": "ACC-2024-GCA-001",
  "validFrom": "2024-01-01T00:00:00Z",
  "validUntil": "2025-12-31T23:59:59Z",
  "revocationEndpoint": "https://new-auditor.com/revocation-list/2024/credentials.json",
  "supportedCredentialTypes": [
    "ProductCarbonFootprint",
    "SustainabilityMetrics"
  ],
  "contactInfo": {
    "email": "certification@new-auditor.com",
    "website": "https://new-auditor.com"
  }
}
```

**Response**: `201 Created`

```json
{
  "status": "success",
  "message": "Issuer successfully added to trusted list",
  "issuer": {
    "did": "did:web:new-auditor.com",
    "status": "pending_verification",
    "addedAt": "2024-07-25T10:30:00Z",
    "verificationRequired": true
  }
}
```

#### Updating Issuer Status

**Request**: `PATCH /api/v1/trusted-list/issuers/did:web:new-auditor.com/status`

```json
{
  "status": "active",
  "reason": "Accreditation verification completed successfully",
  "effectiveDate": "2024-07-25T12:00:00Z",
  "authorizedBy": "did:web:governance.catena-x.net:admin"
}
```

**Response**: `200 OK`

```json
{
  "status": "success",
  "message": "Issuer status updated successfully",
  "previousStatus": "pending_verification",
  "newStatus": "active",
  "effectiveDate": "2024-07-25T12:00:00Z"
}
```

## Reference Implementations

### Simple Wallet

The [Simple Wallet Implementation](https://github.com/eclipse-tractusx/digital-product-pass/tree/d48d7b67d742f4177bd6272b93897a9346a38819/dpp-verification/simple-wallet) offers a simple way of issuing and verifying product credentials using the DID interface and the schemas defined on this KIT.
It provides an easy API interface to issue, verify and generate contexts.

## Sample Data Models

### Data Attestation Credential (DAC)

Following the schema from Verifiable Credentials v2.0 and the specification in this KIT for verifiable credentials:

:::info
Substitute the `<aspectModelKey>` with your SemanticId aspect model key, for example, for PCF the following semantic id is given: `urn:samm:io.catenax.pcf:7.0.0#Pcf`, then `urn:samm:<semanticPrefix>:<version>#<aspectModelKey>`, so it would be:

`<semanticPrefix>` = `io.catenax.pcf`

`<version>` = `7.0.0`

`<aspectModelKey>` = `Pcf`

In this way it can be reusable for any aspect model.
:::

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
      "<aspectModelKey>":{
        "type": "object"
      },
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

### Attribute Attestation Credentials (AAC)

Following the schema for Verifiable Credentials v2.0 and the verifiable credential schema for attribute verification:

:::info
The `proof` attribute is required in all Attribute Attestation Credentials. However, its structure depends on the signature type being used (e.g., `JsonWebSignature2020`, `BbsBlsSignature2020`, etc.). Refer to the signature suite documentation for the exact schema.
:::

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Attribute Attestation Credential",
  "type": "object",
  "required": ["@context", "type", "credentialSubject", "origin", "id", "issuer", "validFrom", "validUntil", "proof"],
  "properties": {
    "@context": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      },
      "minItems": 1
    },
    "type": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "contains": { "const": "AttributeAttestationCredential" }
    },
    "credentialSubject": {
      "type": "object",
      "required": ["attributes"],
      "properties": {
        "attributes": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["@id", "digestMultibase", "revealedValue", "unit", "validationMethod"],
            "properties": {
              "@id": { "type": "string" },
              "digestMultibase": { "type": "string" },
              "revealedValue": {
                "type": ["string", "number", "boolean", "object", "array"]
              },
              "unit": { "type": "string" },
              "validationMethod": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["@type", "label", "@id", "uri", "complianceCriteria"],
                  "properties": {
                    "@type": { "type": "string" },
                    "label": { "type": "string" },
                    "@id": { "type": "string" },
                    "uri": { "type": "string", "format": "uri" },
                    "complianceCriteria": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": ["@type", "@value"],
                        "properties": {
                          "@type": { "type": "string" },
                          "@value": {
                            "type": ["string", "number"]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "origin": {
      "type": "object",
      "required": ["digestMultibase", "semanticId", "@id", "@type"],
      "properties": {
        "digestMultibase": { "type": "string" },
        "semanticId": { "type": "string" },
        "@id": { "type": "string" },
        "@type": { "type": "string" }
      }
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
    "proof": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "type": "string" }
      }
    }
  },
  "additionalProperties": false
}
```

### Attribute Attestation Credentials (AAC) with Selective Disclosure

The Selective Disclosure, allows revealing certain attributes and hide other ones.

:::info
The `proof` attribute is required in all Attribute Attestation Credentials. However, its structure depends on the signature type being used (e.g., `JsonWebSignature2020`, `BbsBlsSignature2020`, etc.). Refer to the signature suite documentation for the exact schema.
:::

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Attribute Attestation Credential with Selective Disclosure",
  "type": "object",
  "required": ["@context", "type", "credentialSubject", "origin", "id", "issuer", "validFrom", "validUntil", "proof"],
  "properties": {
    "@context": {
      "type": "array",
      "items": { "type": "string", "format": "uri" },
      "minItems": 1
    },
    "type": {
      "type": "array",
      "items": { "type": "string" },
      "contains": { "const": "AttributeAttestationCredential" }
    },
    "credentialSubject": {
      "type": "object",
      "required": ["attributes"],
      "properties": {
        "attributes": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["@id", "digestMultibase", "revealedValue", "unit", "validationMethod"],
            "properties": {
              "@id": { "type": "string" },
              "digestMultibase": { "type": "string" },
              "revealedValue": {
                "type": ["string", "number", "boolean", "object", "array"]
              },
              "unit": { "type": "string" },
              "validationMethod": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["@type", "label", "@id", "uri", "complianceCriteria"],
                  "properties": {
                    "@type": { "type": "string" },
                    "label": { "type": "string" },
                    "@id": { "type": "string" },
                    "uri": { "type": "string", "format": "uri" },
                    "complianceCriteria": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": ["@type", "@value"],
                        "properties": {
                          "@type": { "type": "string" },
                          "@value": {
                            "type": ["string", "number", "boolean"]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "hiddenAttributes": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["@id", "digestMultibase", "status"],
            "properties": {
              "@id": { "type": "string" },
              "digestMultibase": { "type": "string" },
              "status": {
                "type": "string",
                "enum": ["hidden"]
              }
            }
          }
        }
      }
    },
    "origin": {
      "type": "object",
      "required": ["digestMultibase", "semanticId", "@id", "@type"],
      "properties": {
        "digestMultibase": { "type": "string" },
        "semanticId": { "type": "string" },
        "@id": { "type": "string" },
        "@type": { "type": "string" }
      }
    },
    "id": { "type": "string" },
    "issuer": { "type": "string" },
    "validFrom": {
      "type": "string",
      "format": "date-time"
    },
    "validUntil": {
      "type": "string",
      "format": "date-time"
    },
    "proof": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "type": "string" }
      }
    }
  },
  "additionalProperties": false
}
```

### Attribute Certification Record (ACR)

It is a Verifiable Presentation v2 with a list of Attribute Attestation Credentials (AAC):

:::info
The `proof` attribute is required in all Attribute Attestation Credentials. However, its structure depends on the signature type being used (e.g., `JsonWebSignature2020`, `BbsBlsSignature2020`, etc.). Refer to the signature suite documentation for the exact schema.
:::

```json

{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Attribute Certification Record",
  "type": "object",
  "required": ["@context", "type", "verifiableCredential", "id", "holder", "validFrom", "validUntil", "proof"],
  "properties": {
    "@context": {
      "type": "array",
      "items": { "type": "string", "format": "uri" }
    },
    "type": {
      "type": "array",
      "items": { "type": "string" },
      "contains": { "const": "AttributeCertificationRecord" }
    },
    "verifiableCredential": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["@context", "type", "credentialSubject", "origin", "id", "issuer", "validFrom", "validUntil", "proof"],
        "properties": {
          "@context": {
            "type": "array",
            "items": { "type": "string", "format": "uri" },
            "minItems": 1
          },
          "type": {
            "type": "array",
            "items": { "type": "string" },
            "contains": { "const": "AttributeAttestationCredential" }
          },
          "credentialSubject": {
            "type": "object",
            "required": ["attributes"],
            "properties": {
              "attributes": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["@id", "digestMultibase", "revealedValue", "unit", "validationMethod"],
                  "properties": {
                    "@id": { "type": "string" },
                    "digestMultibase": { "type": "string" },
                    "revealedValue": {
                      "type": ["string", "number", "boolean", "object", "array"]
                    },
                    "unit": { "type": "string" },
                    "validationMethod": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": ["@type", "label", "@id", "uri", "complianceCriteria"],
                        "properties": {
                          "@type": { "type": "string" },
                          "label": { "type": "string" },
                          "@id": { "type": "string" },
                          "uri": { "type": "string", "format": "uri" },
                          "complianceCriteria": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": ["@type", "@value"],
                              "properties": {
                                "@type": { "type": "string" },
                                "@value": {
                                  "type": ["string", "number", "boolean"]
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "hiddenAttributes": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["@id", "digestMultibase", "status"],
                  "properties": {
                    "@id": { "type": "string" },
                    "digestMultibase": { "type": "string" },
                    "status": {
                      "type": "string",
                      "enum": ["hidden"]
                    }
                  }
                }
              }
            }
          },
          "origin": {
            "type": "object",
            "required": ["digestMultibase", "semanticId", "@id", "@type"],
            "properties": {
              "digestMultibase": { "type": "string" },
              "semanticId": { "type": "string" },
              "@id": { "type": "string" },
              "@type": { "type": "string" }
            }
          },
          "id": { "type": "string" },
          "issuer": { "type": "string" },
          "validFrom": {
            "type": "string",
            "format": "date-time"
          },
          "validUntil": {
            "type": "string",
            "format": "date-time"
          },
          "proof": {
            "type": "object",
            "required": ["type"],
            "properties": {
              "type": { "type": "string" }
            }
          }
        }
      }
    },
    "id": { "type": "string" },
    "holder": { "type": "string" },
    "validFrom": { "type": "string", "format": "date-time" },
    "validUntil": { "type": "string", "format": "date-time" },
    "proof": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "type": "string" }
      }
    }
  }
}
```

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
