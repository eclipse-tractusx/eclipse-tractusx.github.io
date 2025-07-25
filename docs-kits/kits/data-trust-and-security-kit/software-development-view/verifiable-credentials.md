---
id: verifiable-credentials
title: Verifiable Credential Framework
description: 'Implementation Architecture and Verifiable Credential Framework for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## Implementation Architecture

### Overview

The Data Trust & Security KIT provides a comprehensive framework for implementing data verification and trust mechanisms within the Catena-X network. The architecture is designed to be generic and adaptable across various use cases and data formats while maintaining data sovereignty and security.

This implementation concept establishes an assertive second layer of trust over the actual peer-to-peer data exchanges within the Catena-X network. Building upon the existing SSI (Self-Sovereign Identity) technology already in place, this framework enables data providers to create self-signed documents confirming information placed into aspect models, and gives data auditors the possibility to certify specific attributes from standardized data structures.

The technology consists of creating Signed Documents (Verification Statements) using Verifiable Credentials 2.0 technology - a JSON-LD structure standardized by the W3C Consortium for Web 3.0 data trust and identity assurance. Using JSON Web Signatures (JWS) and wallet components connected to Catena-X and identified by unique Business Partner Numbers (BPN), data issuers and auditors can sign using their Ed25519 private keys while data consumers can access public keys by resolving the DID contained in the signature proof.

### System Components

The trust framework consists of several key components that work together to establish, maintain, and verify data integrity:

#### Trust Registry

A centralized registry that maintains lists of accredited issuers and verification authorities. This registry enables:

- Management of trusted issuer lists per use case
- Accreditation status tracking
- Revocation list management
- Policy enforcement

#### Verification Service

A service component that handles the verification of verifiable credentials and attestations:

- Signature verification using DID resolution
- Credential status checking (revocation, expiration)
- Trust chain validation
- Policy compliance verification

#### Attestation Engine

The core component responsible for generating and managing data attestations:

- Verifiable credential generation
- Attribute-level certification
- Complete data certification
- Selective disclosure support

### Verification Statement Types

The Data Trust & Security KIT implements two primary types of verification statements to accommodate different trust and verification requirements:

#### Complete Data Verification Statement

Self-signed document containing the complete data from an aspect model payload. This provides:

- Full data integrity verification
- Complete traceability and version control
- Self-attestation capability for data providers
- Comprehensive audit trail

#### Partial Data Verification Statement  

Attribute-level certified document containing one or more attributes from the complete data verification statement or from a plain JSON aspect model payload. This enables:

- Selective disclosure of verified attributes
- Third-party auditor certification
- Granular trust establishment
- Privacy-preserving verification

### Trust Establishment Process

The Data Trust & Security KIT implements a multi-layered trust establishment process that ensures data integrity and authenticity across all participants in the network.

#### Phase 1: Issuer Accreditation

Organizations seeking to become trusted data attesters must undergo an accreditation process:

1. **Application Submission**: Submit accreditation request with supporting documentation
2. **Compliance Assessment**: Undergo audit against defined accreditation criteria
3. **Technical Evaluation**: Demonstrate technical capability to issue verifiable credentials
4. **Inclusion Decision**: Upon successful evaluation, inclusion in trusted issuer registry
5. **Ongoing Monitoring**: Regular compliance checks and status updates

#### Phase 2: Data Attestation

Accredited issuers can create verifiable attestations for data:

1. **Data Validation**: Verify accuracy and compliance of data against standards
2. **Credential Generation**: Create verifiable credentials with appropriate schemas
3. **Digital Signing**: Apply cryptographic signatures using issuer's private keys
4. **Publication**: Make credentials available through appropriate channels
5. **Status Management**: Maintain credential lifecycle and revocation capabilities

#### Phase 3: Verification Process

Data consumers can verify attestations through comprehensive verification:

1. **Credential Retrieval**: Obtain verifiable credentials from data providers
2. **Issuer Validation**: Verify issuer is in trusted registry and status is active
3. **Signature Verification**: Validate cryptographic signatures and proof integrity
4. **Revocation Check**: Confirm credential has not been revoked or expired
5. **Policy Compliance**: Ensure compliance with applicable policies and standards
6. **Trust Decision**: Make informed decisions based on verification results

## Verifiable Credential Framework

The Data Trust & Security KIT implements a comprehensive verifiable credential framework based on W3C standards, adapted for Catena-X requirements.

### Credential Types

The framework defines three main types of verifiable credentials:

| Credential Type | Issuer | Content | Use Case |
|----------------|--------|---------|----------|
| **Data Attestation Credential (DAC)** | Data Provider | Complete aspect model payload with signature | Self-attestation and complete data verification |
| **Attribute Attestation Credential (AAC)** | Data Auditor | Selected attributes with validation methods | Third-party attribute certification |
| **Attribute Certification Record (ACR)** | Data Provider | Collection of AACs as verifiable presentation | Aggregated attribute certifications |

### Data Attestation Credentials

Complete data attestation credentials contain the full data payload with cryptographic proof of authenticity. These credentials serve as self-signed certificates that data providers can create to attest to the accuracy and integrity of their complete aspect model data.

#### How Data Attestation Credentials Work

Data Attestation Credentials (DAC) follow the W3C Verifiable Credentials 2.0 specification and provide a comprehensive mechanism for data providers to cryptographically sign and verify complete datasets. The process involves several key components:

**Core Components:**

| Component | Purpose | Description |
|-----------|---------|-------------|
| **@context** | Semantic Definition | Defines the JSON-LD contexts that provide meaning to the data structures |
| **type** | Credential Classification | Specifies the credential type hierarchy (VerifiableCredential → DataAttestationCredential → Specific Use Case) |
| **semanticId** | Aspect Model Reference | Links to the specific SAMM aspect model that defines the data structure |
| **credentialSubject** | Actual Data Payload | Contains the complete aspect model data being attested |
| **issuer** | Identity Verification | DID (Decentralized Identifier) of the organization issuing the credential |
| **proof** | Cryptographic Signature | Digital signature that ensures data integrity and authenticity |

**Trust Establishment Process:**

1. **Data Preparation**: The data provider prepares their aspect model data according to Catena-X standards
2. **Credential Creation**: The complete dataset is wrapped in a verifiable credential structure
3. **Digital Signing**: The credential is signed using the issuer's private key (typically Ed25519 or RSA)
4. **Publication**: The signed credential is made available through Digital Twin Registry or direct exchange
5. **Verification**: Data consumers can verify the credential using the issuer's public key and trusted issuer lists

**Verification Benefits:**

- **Data Integrity**: Cryptographic proof that data hasn't been tampered with
- **Authenticity**: Verification that data comes from the claimed source
- **Non-repudiation**: Issuer cannot deny having created the credential
- **Traceability**: Complete audit trail of data attestation
- **Interoperability**: Standard format enables cross-platform verification

**Use Case Examples:**

- **Product Carbon Footprint**: Complete PCF data with all emission factors and calculations
- **Battery Passport**: Full battery lifecycle data including materials and performance metrics
- **Supply Chain Documentation**: Complete traceability data from raw materials to finished products

```json
{
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://w3c.github.io/vc-jws-2020/contexts/v1/",
        "https://w3id.org/security/data-integrity/v2",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.certificate.dac/1.0.0/gen/Dac-context.jsonld",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.pcf/7.0.0/gen/Pcf-context.jsonld"
    ],
    "type": [
        "VerifiableCredential",
        "DataAttestationCredential",
        "Pcf"
    ],
    "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
    "credentialSubject": {
        "Pcf": {
            "specVersion": "urn:io.catenax.pcf:datamodel:version:7.0.0",
            "companyIds": ["telnet://192.0.2.16:80/", "ftp://ftp.is.co.za/rfc/rfc1808.txt", "http://www.ietf.org/rfc/rfc2396.txt"],
            "extWBCSD_productCodeCpc": "011-99000",
            "created": "2022-05-22T21:47:32Z",
            "companyName": "My Corp",
            "extWBCSD_pfStatus": "Active",
            "version": 0,
            "productName": "My Product Name",
            "pcf": {
                "biogenicCarbonEmissionsOtherThanCO2": 1.0,
                "distributionStagePcfExcludingBiogenic": 1.5,
                "biogenicCarbonWithdrawal": 0.0,
                "distributionStageBiogenicCarbonEmissionsOtherThanCO2": 1.0,
                "extWBCSD_allocationRulesDescription": "In accordance with Catena-X PCF Rulebook",
                "exemptedEmissionsDescription": "No exemption",
                "distributionStageFossilGhgEmissions": 0.5,
                "exemptedEmissionsPercent": 0.0,
                "geographyCountrySubdivision": "US-NY",
                "extTFS_luGhgEmissions": 0.3,
                "distributionStageBiogenicCarbonWithdrawal": 0.0,
                "pcfIncludingBiogenic": 1.0,
                "aircraftGhgEmissions": 0.0,
                "productMassPerDeclaredUnit": 0.456,
                "productOrSectorSpecificRules": [{
                    "extWBCSD_operator": "PEF",
                    "productOrSectorSpecificRules": [{
                        "ruleName": "urn:tfs-initiative.com:PCR:The Product Carbon Footprint Guideline for the Chemical Industry:version:v2.0"
                    }],
                    "extWBCSD_otherOperatorName": "NSF"
                }],
                "extTFS_allocationWasteIncineration": "cut-off",
                "pcfExcludingBiogenic": 2.0,
                "referencePeriodEnd": "2022-12-31T23:59:59Z",
                "extWBCSD_characterizationFactors": "AR5",
                "secondaryEmissionFactorSources": [{
                    "secondaryEmissionFactorSource": "ecoinvent 3.8"
                }],
                "unitaryProductAmount": 1000.0,
                "declaredUnit": "liter",
                "referencePeriodStart": "2022-01-01T00:00:01Z",
                "geographyRegionOrSubregion": "Africa",
                "fossilGhgEmissions": 0.5,
                "distributionStageAircraftGhgEmissions": 0.0,
                "boundaryProcessesDescription": "Electricity consumption included as an input in the production phase",
                "geographyCountry": "DE",
                "extWBCSD_packagingGhgEmissions": 0,
                "dlucGhgEmissions": 0.4,
                "carbonContentTotal": 2.5,
                "extTFS_distributionStageLuGhgEmissions": 1.1,
                "primaryDataShare": 56.12,
                "dataQualityRating": {
                    "completenessDQR": 2.0,
                    "technologicalDQR": 2.0,
                    "geographicalDQR": 2.0,
                    "temporalDQR": 2.0,
                    "reliabilityDQR": 2.0,
                    "coveragePercent": 100
                },
                "extWBCSD_packagingEmissionsIncluded": true,
                "extWBCSD_fossilCarbonContent": 0.1,
                "crossSectoralStandardsUsed": [{
                    "crossSectoralStandard": "ISO Standard 14067"
                }],
                "extTFS_distributionStageDlucGhgEmissions": 1.0,
                "distributionStagePcfIncludingBiogenic": 0.0,
                "carbonContentBiogenic": 0.0
            }
        },
        "partialFullPcf": "Cradle-to-gate",
        "productIds": ["http://www.wikipedia.org", "ftp://ftp.is.co.za/rfc/rfc1808.txt"],
        "validityPeriodStart": "2022-01-01T00:00:01Z",
        "comment": "Additional explanatory information not reflected by other attributes",
        "id": "3893bb5d-da16-4dc1-9185-11d97476c254",
        "validityPeriodEnd": "2022-12-31T23:59:59Z",
        "pcfLegalStatement": "This PCF (Product Carbon Footprint) is for information purposes only. It is based upon the standards mentioned above.",
        "productDescription": "Ethanol, 95% solution",
        "precedingPfIds": [{
            "id": "3893bb5d-da16-4dc1-9185-11d97476c254"
        }]
    },
    "id": "urn:uuid:certificate-123-456-789",
    "issuer": "did:web:tuv-sud.de",
    "validFrom": "2024-01-15T10:30:00Z",
    "validUntil": "2025-01-15T10:30:00Z",
    "credentialStatus": {
        "id": "https://tuv-sud.de/revocation-list/2024/credentials.json#42",
        "type": "RevocationList2020Status",
        "revocationListIndex": "42",
        "revocationListCredential": "https://tuv-sud.de/revocation-list/2024/credentials.json"
    },
    "proof": {
        "type": "JsonWebSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:tuv-sud.de#key-1",
        "created": "2024-01-15T10:30:00Z",
        "jws": "eyJ0eXAiOiAidmMrbGQiLCAiYjY..."
    }
}
```

#### Data Attestation Credential Structure Analysis

The following table explains each component of the Data Attestation Credential structure and its role in establishing trust:

| Field | Type | Purpose | Security Implications |
|-------|------|---------|----------------------|
| **@context** | Array | Defines JSON-LD semantics and vocabularies | Ensures consistent interpretation across systems |
| **type** | Array | Hierarchical credential classification | Enables type-specific verification and processing |
| **semanticId** | String | SAMM aspect model identifier | Links credential to standardized data structure |
| **credentialSubject** | Object | Complete aspect model data payload | Contains the actual data being attested |
| **id** | URI | Unique credential identifier | Enables credential tracking and reference |
| **issuer** | DID | Decentralized identifier of issuer | Links to issuer's public key for signature verification |
| **validFrom** | DateTime | Credential validity start date | Prevents use of premature credentials |
| **validUntil** | DateTime | Credential expiration date | Ensures temporal validity of attestations |
| **credentialStatus** | Object | Revocation status information | Enables real-time revocation checking |
| **proof** | Object | Cryptographic signature and metadata | Provides integrity and authenticity verification |

#### Critical Security Components

**Issuer DID Resolution:**
The `issuer` field contains a DID (Decentralized Identifier) that must be resolved to obtain the public key for signature verification. The DID format `did:web:tuv-sud.de` indicates a web-based DID that can be resolved by fetching the DID document from `https://tuv-sud.de/.well-known/did.json`.

**Proof Structure:**

- **type**: Specifies the signature algorithm (JsonWebSignature2020 for JWT compatibility)
- **proofPurpose**: Defines the intent (assertionMethod for data attestation)
- **verificationMethod**: Points to the specific key used for signing
- **created**: Timestamp of signature creation (prevents replay attacks)
- **jws**: The actual cryptographic signature in JSON Web Signature format

**Revocation Management:**

- **id**: Points to specific position in revocation list
- **type**: Specifies revocation list format (RevocationList2020Status)
- **revocationListIndex**: Bit position in the revocation bitstring
- **revocationListCredential**: URL to the revocation list document

### Attribute Attestation Credentials

Selective attribute attestation enables verification of specific data elements without exposing the complete dataset. These credentials are particularly valuable for privacy-preserving verification and third-party auditing scenarios.

#### How Attribute Attestation Credentials Work

Attribute Attestation Credentials (AAC) provide a mechanism for third-party auditors and certification bodies to verify specific attributes within aspect models without requiring access to the complete dataset. This selective disclosure approach enables fine-grained trust establishment while preserving data privacy.

**Core Architecture:**

| Component | Function | Technical Details |
|-----------|----------|-------------------|
| **Selective Verification** | Partial Data Validation | Only specific attributes are extracted and verified, maintaining privacy for other data |
| **Hash-based Integrity** | Tamper Detection | Each attribute is hashed using cryptographic functions (SHA3-512) for integrity verification |
| **Validation Methods** | Compliance Tracking | References to standards, regulations, or certification processes used for validation |
| **Origin Linking** | Source Traceability | Cryptographic link to the original complete dataset (DAC) without exposing it |
| **Third-party Signing** | Independent Verification | Signed by accredited auditors or certification bodies, not the data owner |

**Verification Process Flow:**

1. **Attribute Selection**: Auditor identifies specific attributes requiring verification (e.g., carbon emissions, compliance metrics)
2. **Data Access**: Auditor accesses the complete dataset through secure channels or controlled environments
3. **Validation Execution**: Attributes are validated against specified standards, regulations, or methodologies
4. **Hash Generation**: Verified attributes are cryptographically hashed to create tamper-proof references
5. **Credential Creation**: AAC is created containing only the validated attributes and their verification methods
6. **Digital Signing**: Auditor signs the credential using their accredited private key
7. **Publication**: AAC is returned to data owner or published through appropriate channels

**Privacy-Preserving Features:**

| Feature | Benefit | Implementation |
|---------|---------|----------------|
| **Selective Disclosure** | Only verified attributes revealed | Hash references prevent exposure of non-verified data |
| **Zero-Knowledge Proofs** | Prove compliance without data exposure | Mathematical proofs demonstrate attribute validity |
| **Compartmentalized Trust** | Different trust levels per attribute | Each attribute can have different auditors and validation methods |
| **Minimal Data Exposure** | Reduced privacy risks | Only necessary attribute information is shared |

**Validation Method Types:**

- **Standard Compliance**: Verification against industry standards (ISO, DIN, ASTM)
- **Regulatory Compliance**: Validation against legal requirements and regulations
- **Calculation Verification**: Mathematical validation of computed values and formulas
- **Data Quality Assessment**: Verification of data completeness, accuracy, and reliability
- **Process Certification**: Validation of underlying processes and methodologies

**Use Case Scenarios:**

1. **Regulatory Reporting**: Third-party verification of emission values for regulatory compliance
2. **Supply Chain Auditing**: Independent verification of sustainability metrics without exposing proprietary data
3. **Financial Reporting**: Auditor verification of specific financial metrics within broader datasets
4. **Quality Certification**: Certification body validation of product quality attributes
5. **Compliance Monitoring**: Ongoing verification of key performance indicators by regulatory bodies

**Trust Chain Integration:**

The AAC system integrates with the broader trust ecosystem through:

- **Trusted Issuer Registry**: Auditors must be accredited and listed in trusted issuer lists
- **Revocation Management**: AACs can be revoked if validation methods are found to be flawed
- **Cross-validation**: Multiple AACs can reference the same origin data for comprehensive verification
- **Temporal Validity**: Time-bound validations ensure certificates remain current and relevant

```json
{
  "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://w3c.github.io/vc-jws-2020/contexts/v1/",
      "https://w3id.org/security/data-integrity/v2",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.certificate.aac/1.0.0/gen/Aac-context.jsonld",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.pcf/7.0.0/gen/Pcf-context.jsonld"
  ],
  "type": [
      "VerifiableCredential",
      "AttributeAttestationCredential",
      "Pcf"
  ],
  "credentialSubject": {
      "attributes": [
          {
              "validationMethod": [
                  {
                      "@type": "Standard",
                      "label": "Catena-X PCF Rulebook Standard",
                      "@id": "CX-0029",
                      "uri": "https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September23/CX-0029-ProductCarbonFootprintRulebook-v2.0.0.pdf",
                      "compliance": "100%"
                  }
              ],
              "@id": "pcf.biogenicCarbonEmissionsOtherThanCO2",
              "digestMultibase": "0b3402a678ec2788804994fb2df9faf66eecbdde26553e320a8d4a154f53d840d2a32245998c38f885f01137c9fcf123f3752fc841508dc771fa6faaee689b73"
          }
      ]
  },
  "origin": {
      "digestMultibase": "c118df3b7bf603a86bd79f03c692153bdb4212ab80d49c12154c92415ae83d6d59187d9ba5af9c4e40208f7d7b1d4c727de78cfbe51e768aae743723ee197374",
      "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
      "@id": "did:web:dpp-test-system.com:BPNL000000000000:api:public:urn%3Auuid%3Acd1c0904-27e2-4ae2-8751-5c8c8e4b6812",
      "@type": "application/vc+ld+json"
  },
  "id": "urn:uuid:281a8b98-933c-4d80-ad86-721f1adbe5b3",
  "issuer": "did:web:tuv-sud.de",
  "validFrom": "2024-07-10T15:08:13Z",
  "validUntil": "2024-12-25T15:08:13Z",
  "proof": {
      "type": "JsonWebSignature2020",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:web:did:web:tuv-sud.de#N4bTDb14GEnCvwZdFRqK5lwL4nje3bB5Y4nvb01VBKA",
      "created": "2024-07-10T15:08:13Z",
      "jws": "eyJ0eXAiOiAidmMrbGQiLCAiYjY0IjogZmFsc2UsICJjcnYiOiAiRWQyNTUxOSJ9......"
  }
}
```

#### Attribute Attestation Credential Structure Analysis

The Attribute Attestation Credential structure is designed for selective disclosure and third-party verification. Here's how each component contributes to the verification process:

| Field | Type | Function | Verification Role |
|-------|------|----------|------------------|
| **@context** | Array | JSON-LD semantic definitions | Ensures proper interpretation of AAC and aspect model contexts |
| **type** | Array | Credential type hierarchy | Identifies as AttributeAttestationCredential for selective disclosure |
| **credentialSubject.attributes** | Array | Verified attribute collection | Contains only the specific attributes that have been validated |
| **origin** | Object | Reference to source data | Links back to original DAC while maintaining privacy |
| **issuer** | DID | Third-party auditor identifier | Must be accredited in trusted issuer registry |

#### Individual Attribute Object Structure

Each attribute within the `credentialSubject.attributes` array contains the following fields:

| Field | Type | Function | Verification Role |
|-------|------|----------|------------------|
| **validationMethod** | Array | Verification standards used | Documents the compliance frameworks and standards applied during validation |
| **@id** | String | Attribute path identifier | Specifies the exact attribute being verified (e.g., "pcf.biogenicCarbonEmissionsOtherThanCO2") |
| **digestMultibase** | String | Cryptographic hash of original attribute in SHA3-512 | Proves integrity without revealing the actual value using multibase encoding |


#### Selective Disclosure Mechanism

**Attribute Hashing Process:**

1. **Original Data Extraction**: Specific attributes are extracted from the complete dataset
2. **Normalization**: Data is normalized according to JSON-LD canonicalization rules
3. **Hash Generation**: SHA3-512 hash is computed for each attribute value
4. **Multibase Encoding**: Hash is encoded using multibase format for consistent representation
5. **Proof Creation**: Hash is included in the credential as tamper-proof reference

**Privacy Protection Features:**

| Feature | Implementation | Privacy Benefit |
|---------|----------------|-----------------|
| **Hash-only Storage** | Only cryptographic hashes stored in AAC | Original values remain private |
| **Selective Attribute Choice** | Auditor chooses which attributes to verify | Unverified data stays confidential |
| **Origin Abstraction** | Generic reference to source without details | Source data location not exposed |
| **Validation Method Disclosure** | Standards used are documented | Transparency without data exposure |

**Validation Method Structure:**

Each validation method in the AAC contains:

- **@type**: Classification of validation approach (Standard, Regulation, Process)
- **label**: Human-readable description of the validation method
- **@id**: Unique identifier for the standard or regulation (e.g., CX-0029)
- **uri**: Direct link to the official standard or regulation document
- **compliance**: Percentage or level of compliance achieved (e.g., "100%")

**Origin Link Security:**

The `origin` object provides cryptographic linkage without exposure:

- **digestMultibase**: Hash of the complete original dataset (DAC)
- **semanticId**: Aspect model type identifier for context
- **@id**: Secure reference to data location (can be DID or protected URL)
- **@type**: Media type specification for proper handling

#### Third-Party Auditor Verification

**Auditor Accreditation Requirements:**

1. **Trusted Registry Inclusion**: Auditor DID must be present in governance-maintained trusted issuer list
2. **Scope Validation**: Auditor's accreditation scope must cover the specific validation methods used
3. **Status Verification**: Auditor status must be "active" and not "suspended" or "revoked"
4. **Temporal Validity**: Auditor's accreditation must be valid during the verification period

**Verification Process Integrity:**

- **Independent Validation**: Auditor performs verification independently from data owner
- **Method Documentation**: Specific standards and processes used are documented
- **Result Attestation**: Auditor cryptographically signs the verification results
- **Traceability**: Complete audit trail from original data to verified attributes

### Selective Disclosure Example

The following example demonstrates how selective disclosure works in practice using BBS+ signatures for privacy-preserving attribute verification:

#### Original Complete Dataset (Private)

```json
{
  "credentialSubject": {
    "Pcf": {
      "specVersion": "urn:io.catenax.pcf:datamodel:version:7.0.0",
      "companyIds": ["telnet://192.0.2.16:80/", "ftp://ftp.is.co.za/rfc/rfc1808.txt", "http://www.ietf.org/rfc/rfc2396.txt"],
      "extWBCSD_productCodeCpc": "011-99000",
      "created": "2022-05-22T21:47:32Z",
      "companyName": "Acme Manufacturing Corp",
      "extWBCSD_pfStatus": "Active",
      "version": 0,
      "productName": "High-Performance Steel Alloy",
      "pcf": {
        "biogenicCarbonEmissionsOtherThanCO2": 1.0,
        "distributionStagePcfExcludingBiogenic": 1.5,
        "biogenicCarbonWithdrawal": 0.0,
        "distributionStageBiogenicCarbonEmissionsOtherThanCO2": 1.0,
        "extWBCSD_allocationRulesDescription": "In accordance with Catena-X PCF Rulebook",
        "exemptedEmissionsDescription": "No exemption",
        "distributionStageFossilGhgEmissions": 0.5,
        "exemptedEmissionsPercent": 0.0,
        "geographyCountrySubdivision": "US-NY",
        "extTFS_luGhgEmissions": 0.3,
        "distributionStageBiogenicCarbonWithdrawal": 0.0,
        "pcfIncludingBiogenic": 1.0,
        "aircraftGhgEmissions": 0.0,
        "productMassPerDeclaredUnit": 0.456,
        "productOrSectorSpecificRules": [{
          "extWBCSD_operator": "PEF",
          "productOrSectorSpecificRules": [{
            "ruleName": "urn:tfs-initiative.com:PCR:The Product Carbon Footprint Guideline for the Chemical Industry:version:v2.0"
          }],
          "extWBCSD_otherOperatorName": "NSF"
        }],
        "extTFS_allocationWasteIncineration": "cut-off",
        "pcfExcludingBiogenic": 2.0,
        "referencePeriodEnd": "2022-12-31T23:59:59Z",
        "extWBCSD_characterizationFactors": "AR5",
        "secondaryEmissionFactorSources": [{
          "secondaryEmissionFactorSource": "ecoinvent 3.8"
        }],
        "unitaryProductAmount": 1000.0,
        "declaredUnit": "liter",
        "referencePeriodStart": "2022-01-01T00:00:01Z",
        "geographyRegionOrSubregion": "Africa",
        "fossilGhgEmissions": 0.5,
        "distributionStageAircraftGhgEmissions": 0.0,
        "boundaryProcessesDescription": "Electricity consumption included as an input in the production phase",
        "geographyCountry": "DE",
        "extWBCSD_packagingGhgEmissions": 0,
        "dlucGhgEmissions": 0.4,
        "carbonContentTotal": 2.5,
        "extTFS_distributionStageLuGhgEmissions": 1.1,
        "primaryDataShare": 56.12,
        "dataQualityRating": {
          "completenessDQR": 2.0,
          "technologicalDQR": 2.0,
          "geographicalDQR": 2.0,
          "temporalDQR": 2.0,
          "reliabilityDQR": 2.0,
          "coveragePercent": 100
        },
        "extWBCSD_packagingEmissionsIncluded": true,
        "extWBCSD_fossilCarbonContent": 0.1,
        "crossSectoralStandardsUsed": [{
          "crossSectoralStandard": "ISO Standard 14067"
        }],
        "extTFS_distributionStageDlucGhgEmissions": 1.0,
        "distributionStagePcfIncludingBiogenic": 0.0,
        "carbonContentBiogenic": 0.0
      },
      "partialFullPcf": "Cradle-to-gate",
      "productIds": ["http://www.wikipedia.org", "ftp://ftp.is.co.za/rfc/rfc1808.txt"],
      "validityPeriodStart": "2022-01-01T00:00:01Z",
      "comment": "Additional explanatory information not reflected by other attributes",
      "id": "3893bb5d-da16-4dc1-9185-11d97476c254",
      "validityPeriodEnd": "2022-12-31T23:59:59Z",
      "pcfLegalStatement": "This PCF (Product Carbon Footprint) is for information purposes only. It is based upon the standards mentioned above.",
      "productDescription": "Ethanol, 95% solution",
      "precedingPfIds": [{
        "id": "3893bb5d-da16-4dc1-9185-11d97476c254"
      }],
      "productionCost": "$45.50",
      "profitMargin": "18.2%",
      "supplierDetails": {
        "primarySupplier": "Steel Solutions Ltd",
        "backupSupplier": "Industrial Materials Inc",
        "contractTerms": "confidential"
      }
    }
  }
}
```

#### Selective Disclosure AAC (Public)

The auditor can create an AAC that reveals only the carbon footprint attributes while keeping business-sensitive information private:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://w3c.github.io/vc-jws-2020/contexts/v1/",
    "https://w3id.org/security/data-integrity/v2",
    "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.certificate.aac/1.0.0/gen/Aac-context.jsonld",
    "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.pcf/7.0.0/gen/Pcf-context.jsonld"
  ],
  "type": [
    "VerifiableCredential",
    "AttributeAttestationCredential",
    "Pcf"
  ],
  "credentialSubject": {
    "attributes": [
      {
        "validationMethod": [
          {
            "@type": "Standard",
            "label": "ISO 14067:2018 Carbon Footprint Standard",
            "@id": "ISO-14067",
            "uri": "https://www.iso.org/standard/71206.html",
            "compliance": "100%"
          }
        ],
        "@id": "pcf.pcfExcludingBiogenic",
        "digestMultibase": "z3k2a8f7b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
        "revealedValue": 2.0,
        "unit": "kg CO2 equivalent"
      },
      {
        "validationMethod": [
          {
            "@type": "Standard",
            "label": "ISO 14067:2018 Carbon Footprint Standard",
            "@id": "ISO-14067",
            "uri": "https://www.iso.org/standard/71206.html",
            "compliance": "50%"
          }
        ],
        "@id": "pcf.fossilGhgEmissions",
        "digestMultibase": "z8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
        "revealedValue": 0.5,
        "unit": "kg CO2 equivalent"
      }
    ],
    "hiddenAttributes": [
      {
        "@id": "companyName",
        "digestMultibase": "z9f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9",
        "status": "hidden"
      },
      {
        "@id": "pcf.primaryDataShare",
        "digestMultibase": "z5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1",
        "status": "hidden"
      },
      {
        "@id": "pcf.dataQualityRating",
        "digestMultibase": "z1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5",
        "status": "hidden"
      },
      {
        "@id": "companyIds",
        "digestMultibase": "z7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3",
        "status": "hidden"
      }
    ]
  },
  "origin": {
    "digestMultibase": "zQmX8K2a7B9c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0",
    "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
    "@id": "did:web:acme-manufacturing.com:BPNL000000000123:api:public:urn%3Auuid%3A12345678-1234-5678-9abc-123456789012",
    "@type": "application/vc+ld+json"
  },
  "id": "urn:uuid:selective-disclosure-example-aac-456789",
  "issuer": "did:web:green-cert-auditors.com",
  "validFrom": "2024-07-15T09:00:00Z",
  "validUntil": "2025-07-15T09:00:00Z",
  "proof": {
    "type": "BbsBlsSignature2020",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:web:green-cert-auditors.com#bbs-key-1",
    "created": "2024-07-15T09:00:00Z",
    "proofValue": "kAr7QCkTL67CqOFuPD3YBqKkd4DXCbp5kQGBa8NPT1bSJ...",
    "nonce": "lEixQKDQvRecCifKl789TQj+Ii6YWDLSwn3AxR0VpPJ..."
  }
}
```

#### Selective Disclosure Analysis

**What Gets Revealed:**

| Attribute | Value | Justification |
|-----------|-------|---------------|
| `pcf.pcfExcludingBiogenic` | 2.0 kg CO2 eq | Required for regulatory compliance reporting |
| `pcf.fossilGhgEmissions` | 0.5 kg CO2 eq | Necessary for carbon accounting verification |

**What Stays Private:**

| Attribute | Reason for Privacy |
|-----------|-------------------|
| `companyName` | Business identity protection |
| `pcf.primaryDataShare` | Data quality metrics that could reveal business processes |
| `pcf.dataQualityRating` | Internal quality assessments that could be competitively sensitive |
| `companyIds` | Business identifiers that could enable correlation attacks |

**Privacy-Preserving Features:**

1. **Cryptographic Hashes**: Hidden attributes are represented only by their cryptographic hashes
2. **BBS+ Signatures**: Enable selective disclosure without breaking the signature
3. **Nonce Protection**: Prevents replay attacks and correlation attacks
4. **Zero-Knowledge Verification**: Third parties can verify the audit without accessing private data

**Verification Process:**

1. **Auditor Access**: Auditor receives complete dataset in secure environment
2. **Attribute Selection**: Only carbon footprint attributes are chosen for disclosure
3. **Validation**: Attributes are validated against ISO 14067:2018 standard
4. **Selective Signing**: BBS+ signature created that can selectively disclose specific attributes
5. **Privacy Preservation**: Business-sensitive data remains cryptographically hidden
6. **Public Verification**: Anyone can verify the disclosed attributes without accessing private data

**Use Case Benefits:**

- **Regulatory Compliance**: Satisfies carbon reporting requirements
- **Privacy Protection**: Keeps business-sensitive information confidential
- **Third-Party Trust**: Independent auditor verification increases credibility
- **Selective Transparency**: Precise control over what information is shared
- **Anti-Correlation**: Hidden attributes cannot be correlated across different verifications

This selective disclosure mechanism enables organizations to comply with transparency requirements while maintaining competitive advantages and protecting sensitive business information.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0

- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation

- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io
