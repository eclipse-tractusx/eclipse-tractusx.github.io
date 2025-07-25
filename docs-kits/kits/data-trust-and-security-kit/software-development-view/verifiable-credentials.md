---
id: verifiable-credentials
title: Verifiable Credential Framework
description: 'Implementation Architecture and Verifiable Credential Framework for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## How Digital Certificates Work

### The Big Picture

The Data Trust & Security KIT uses digital certificates (called "Verifiable Credentials") to create trust in data. Think of these certificates like digital signatures on important documents - they prove who created the data and that it hasn't been tampered with.

This system creates an additional trust layer on top of your existing data exchanges in Tractus-X. You're already sharing data through the network - now you can add cryptographic proof that this data is authentic and trustworthy.

The technology builds on existing standards from the World Wide Web Consortium (W3C) and integrates seamlessly with Tractus-X infrastructure. When organizations share data, they can include digital certificates that prove the data's authenticity. When you receive this data, you can verify these certificates to ensure you're getting legitimate information.

Here's how it works in practice: Organizations use digital wallets (identified by their DIDs & optionally Business Partner Numbers) to create and manage these certificates. They sign certificates with their private keys, and you can verify them using their public keys - similar to how secure websites work with HTTPS certificates.

## Types of Digital Certificates

The framework provides different types of certificates for different verification needs:

| Certificate Type | Who Creates It | What It Contains | When You'd Use It |
|------------------|----------------|------------------|-------------------|
| **[Data Attestation Credential (DAC)](#data-attestation-credentials-dac)** | Data Provider | Complete dataset with signature | When you want to self-certify your entire dataset |
| **[Attribute Attestation Credential (AAC)](#attribute-attestation-credentials-aac)** | Attestation Provider | Specific data attributes with validation | When you need third-party verification of specific values |
| **[Attribute Attestation Credential with Privacy (AAC-SD)](#attribute-attestation-credential-aac-with-selective-diclosure)** | Attestation Provider | Verified attributes without revealing original values | When you need verification but want to keep data private |
| **[Attribute Certification Record (ACR)](#attribute-certification-record-acr)** | Data Provider | Collection of multiple certificates | When you want to bundle several certifications together |

### Data Attestation Credentials (DAC) - Self-Certifying Your Data

Data Attestation Credentials are like digital notarizations that you create for your own data. When you have a complete dataset (like a carbon footprint calculation or battery passport), you can create a DAC to cryptographically prove that the data came from you and hasn't been changed.

#### When You'd Use DACs

- **Self-Certification**: When you want to attest to the accuracy of your own data
- **Complete Datasets**: When you're sharing entire aspect models rather than individual attributes
- **Data Integrity**: When you need to prove data hasn't been tampered with during transmission
- **Audit Trails**: When you need a permanent record of what data you shared and when

#### How DACs Work

Think of a DAC as a tamper-proof envelope for your data. Here's what happens:

1. **Data Preparation** - You prepare your complete dataset according to Catena-X standards
2. **Certificate Creation** - You wrap the data in a verifiable credential structure
3. **Digital Signing** - You sign the certificate with your organization's private key
4. **Sharing** - You share both the data and certificate through the Digital Twin Registry or direct exchange
5. **Verification** - Data Consumers can verify the certificate using your public key

#### What Goes Into a DAC

A DAC contains several key components:

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
    "validationMethod": [
      {
        "@type": "Standard",
        "label": "Catena-X PCF Rulebook Standard",
        "@id": "CX-0029",
        "uri": "https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_September23/CX-0029-ProductCarbonFootprintRulebook-v2.0.0.pdf",
        "complianceCriteria": [
          {
            "@type": "Standard Compliance",
            "@value": "100%"
          },
          {
            "@type": "Verification Level",
            "@value": "3"
          },
          {
            "@type": "Primary Data Share",
            "@value": "80%"
          }
        ]
      }
    ],
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
The `issuer` field uses a Decentralized Identifier (DID) to help verify signatures. For example, if you see `did:web:tuv-sud.de`, you can fetch the public key by visiting `https://tuv-sud.de/.well-known/did.json`. This is how you check that the credential really comes from the claimed source.

**Proof Structure:**

- **type**: The signature algorithm used (like JsonWebSignature2020, which works with JWT)
- **proofPurpose**: Why the signature was created (usually 'assertionMethod' for attestation)
- **verificationMethod**: Which key was used to sign
- **created**: When the signature was made (helps prevent replay attacks)
- **jws**: The actual signature, in JWS format

**Revocation Management:**

- **id**: Shows the position in the revocation list
- **type**: Format of the revocation list (RevocationList2020Status)
- **revocationListIndex**: Bit position in the revocation bitstring
- **revocationListCredential**: Where to find the revocation list document

**Validation Method Structure:**

The `validationMethod` field lists the standards and compliance checks used during verification:

- **@type**: What kind of validation (Standard, Regulation, Process)
- **label**: Short description of the method
- **@id**: Unique ID for the standard or regulation
- **uri**: Link to the official document
- **complianceCriteria**: List of compliance metrics that were met

Each compliance criterion includes:

- **@type**: Type of compliance metric (e.g., "Standard Compliance", "Verification Level")
- **@value**: Specific value or percentage achieved

### Attribute Attestation Credentials (AAC)

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
                      "complianceCriteria": [
                        {
                          "@type": "Standard Compliance",
                          "@value": "100%"
                        },
                        {
                          "@type": "Verification Level",
                          "@value": "3"
                        },
                        {
                          "@type": "Primary Data Share",
                          "@value": "80%"
                        }
                      ]
                  }
              ],
              "@id": "pcf.biogenicCarbonEmissionsOtherThanCO2",
              "digestMultibase": "0b3402a678ec2788804994fb2df9faf66eecbdde26553e320a8d4a154f53d840d2a32245998c38f885f01137c9fcf123f3752fc841508dc771fa6faaee689b73",
              "revealedValue": 0.5,
              "unit": "kg CO2 equivalent"
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

### Attribute Attestation Credential (AAC) with Selective Diclosure

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
            "complianceCriteria": [
              {
                "@type": "Standard Compliance",
                "@value": "100%"
              },
              {
                "@type": "Verification Level",
                "@value": "3"
              },
              {
                "@type": "Primary Data Share",
                "@value": "80%"
              }
            ]
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
            "complianceCriteria": [
              {
                "@type": "Standard Compliance",
                "@value": "100%"
              }
            ]
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

This selective disclosure mechanism enables organizations to comply with transparency requirements while maintaining competitive advantages and protecting sensitive business information.

### Attribute Certification Record (ACR)

An Attribute Certification Record (ACR) is a Verifiable Presentation that aggregates multiple Attribute Attestation Credentials (AACs) from different auditors or certification bodies. This enables data providers to present a comprehensive view of their certified attributes in a single, cryptographically verifiable document.

#### How Attribute Certification Records Work

The ACR serves as a collection mechanism that allows data providers to:

- **Aggregate Multiple Certifications**: Combine AACs from different auditors covering various aspects of their data
- **Present Unified Trust View**: Provide data consumers with a single document containing all relevant certifications
- **Maintain Auditor Independence**: Preserve the individual signatures and validation methods from each auditor
- **Enable Selective Presentation**: Choose which AACs to include based on specific use case requirements

**Core Components:**

| Component | Purpose | Description |
|-----------|---------|-------------|
| **@context** | Semantic Definition | Defines JSON-LD contexts for verifiable presentations and included credentials |
| **type** | Presentation Classification | Specifies as VerifiablePresentation with AttributeCertificationRecord type |
| **verifiableCredential** | AAC Collection | Array of individual Attribute Attestation Credentials from various auditors |
| **holder** | Data Provider Identity | DID of the organization presenting the aggregated certifications |
| **proof** | Presentation Signature | Cryptographic proof that the holder controls the presented credentials |

#### ACR Example

The following example demonstrates the basic structure of an ACR aggregating three AACs from different auditors:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "..."
  ],
  "type": [
    "VerifiablePresentation",
    "AttributeCertificationRecord"
  ],
  "verifiableCredential": [
    {
      "@context": ["..."],
      "type": ["VerifiableCredential", "AttributeAttestationCredential", "Pcf"],
      "credentialSubject": {
        "attributes": [
          {
            "@id": "pcf.pcfExcludingBiogenic",
            "revealedValue": 2.0,
            "unit": "kg CO2 equivalent",
            "validationMethod": [{"@type": "Standard", "label": "ISO 14067:2018", "...": "..."}]
          }
        ]
      },
      "issuer": "did:web:iso-carbon-auditors.com",
      "validUntil": "2025-07-15T09:00:00Z",
      "proof": {"type": "JsonWebSignature2020", "...": "..."}
    },
    {
      "@context": ["..."],
      "type": ["VerifiableCredential", "AttributeAttestationCredential", "Pcf"],
      "credentialSubject": {
        "attributes": [
          {
            "@id": "pcf.primaryDataShare",
            "revealedValue": 85.3,
            "unit": "percentage",
            "validationMethod": [{"@type": "Regulation", "label": "EU Taxonomy Regulation", "...": "..."}]
          }
        ]
      },
      "issuer": "did:web:eu-taxonomy-auditors.org",
      "validUntil": "2025-06-01T08:00:00Z",
      "proof": {"type": "JsonWebSignature2020", "...": "..."}
    }
  ],
  "id": "urn:uuid:comprehensive-pcf-certification-record-2024",
  "holder": "did:web:acme-manufacturing.com:BPNL000000000123",
  "validFrom": "2024-08-15T12:00:00Z",
  "validUntil": "2025-06-01T08:00:00Z",
  "proof": {
    "type": "JsonWebSignature2020",
    "proofPurpose": "authentication",
    "verificationMethod": "did:web:acme-manufacturing.com:BPNL000000000123#presentation-key-1",
    "created": "2024-08-15T12:00:00Z",
    "jws": "eyJ0eXAiOiJ2cCtsZCIsImI2NCI6ZmFsc2UsImNydiI6IkVkMjU1MTkifQ..."
  }
}
```

<details>
<summary>View Complete ACR Example with Multiple AACs</summary>

The following example shows an ACR containing multiple AACs from different attestation providers for a Product Carbon Footprint dataset:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://w3c.github.io/vc-jws-2020/contexts/v1/",
    "https://w3id.org/security/data-integrity/v2",
    "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.certificate.acr/1.0.0/gen/Acr-context.jsonld"
  ],
  "type": [
    "VerifiablePresentation",
    "AttributeCertificationRecord"
  ],
  "verifiableCredential": [
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
                "complianceCriteria": [
                  {
                    "@type": "Standard Compliance",
                    "@value": "100%"
                  },
                  {
                    "@type": "Verification Level",
                    "@value": "3"
                  }
                ]
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
                "complianceCriteria": [
                  {
                    "@type": "Standard Compliance",
                    "@value": "100%"
                  }
                ]
              }
            ],
            "@id": "pcf.fossilGhgEmissions",
            "digestMultibase": "z8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
            "revealedValue": 0.5,
            "unit": "kg CO2 equivalent"
          }
        ]
      },
      "origin": {
        "digestMultibase": "zQmX8K2a7B9c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0",
        "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
        "@id": "did:web:acme-manufacturing.com:BPNL000000000123:api:public:urn%3Auuid%3A12345678-1234-5678-9abc-123456789012",
        "@type": "application/vc+ld+json"
      },
      "id": "urn:uuid:carbon-footprint-certification-aac-001",
      "issuer": "did:web:iso-carbon-auditors.com",
      "validFrom": "2024-07-15T09:00:00Z",
      "validUntil": "2025-07-15T09:00:00Z",
      "proof": {
        "type": "JsonWebSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:iso-carbon-auditors.com#key-1",
        "created": "2024-07-15T09:00:00Z",
        "jws": "eyJ0eXAiOiJ2YytsZCIsImI2NCI6ZmFsc2UsImNydiI6IkVkMjU1MTkifQ..."
      }
    },
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
                "@type": "Regulation",
                "label": "EU Taxonomy Regulation (EU) 2020/852",
                "@id": "EU-TAX-2020-852",
                "uri": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32020R0852",
                "complianceCriteria": [
                  {
                    "@type": "Regulatory Compliance",
                    "@value": "Compliant"
                  },
                  {
                    "@type": "Assessment Level",
                    "@value": "Technical Expert Review"
                  }
                ]
              }
            ],
            "@id": "pcf.primaryDataShare",
            "digestMultibase": "z5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1",
            "revealedValue": 85.3,
            "unit": "percentage"
          },
          {
            "validationMethod": [
              {
                "@type": "Regulation",
                "label": "EU Taxonomy Regulation (EU) 2020/852",
                "@id": "EU-TAX-2020-852",
                "uri": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32020R0852",
                "complianceCriteria": [
                  {
                    "@type": "Regulatory Compliance",
                    "@value": "Compliant"
                  }
                ]
              }
            ],
            "@id": "pcf.dataQualityRating.coveragePercent",
            "digestMultibase": "z1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5",
            "revealedValue": 100,
            "unit": "percentage"
          }
        ]
      },
      "origin": {
        "digestMultibase": "zQmX8K2a7B9c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0",
        "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
        "@id": "did:web:acme-manufacturing.com:BPNL000000000123:api:public:urn%3Auuid%3A12345678-1234-5678-9abc-123456789012",
        "@type": "application/vc+ld+json"
      },
      "id": "urn:uuid:eu-taxonomy-compliance-aac-002",
      "issuer": "did:web:eu-taxonomy-auditors.org",
      "validFrom": "2024-06-01T08:00:00Z",
      "validUntil": "2025-06-01T08:00:00Z",
      "proof": {
        "type": "JsonWebSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:eu-taxonomy-auditors.org#compliance-key-1",
        "created": "2024-06-01T08:00:00Z",
        "jws": "eyJ0eXAiOiJ2YytsZCIsImI2NCI6ZmFsc2UsImNydiI6IkVkMjU1MTkifQ..."
      }
    },
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
                "complianceCriteria": [
                  {
                    "@type": "Standard Compliance",
                    "@value": "100%"
                  },
                  {
                    "@type": "Verification Level",
                    "@value": "3"
                  },
                  {
                    "@type": "Catena-X Conformity",
                    "@value": "Gold Level"
                  }
                ]
              }
            ],
            "@id": "pcf.crossSectoralStandardsUsed",
            "digestMultibase": "z9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4",
            "revealedValue": [
              {
                "crossSectoralStandard": "ISO Standard 14067"
              }
            ],
            "unit": "standards_array"
          }
        ]
      },
      "origin": {
        "digestMultibase": "zQmX8K2a7B9c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0",
        "semanticId": "urn:samm:io.catenax.pcf:7.0.0#Pcf",
        "@id": "did:web:acme-manufacturing.com:BPNL000000000123:api:public:urn%3Auuid%3A12345678-1234-5678-9abc-123456789012",
        "@type": "application/vc+ld+json"
      },
      "id": "urn:uuid:catena-x-rulebook-compliance-aac-003",
      "issuer": "did:web:catena-x-certification.org",
      "validFrom": "2024-08-01T10:00:00Z",
      "validUntil": "2025-08-01T10:00:00Z",
      "proof": {
        "type": "JsonWebSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:catena-x-certification.org#rulebook-key-1",
        "created": "2024-08-01T10:00:00Z",
        "jws": "eyJ0eXAiOiJ2YytsZCIsImI2NCI6ZmFsc2UsImNydiI6IkVkMjU1MTkifQ..."
      }
    }
  ],
  "id": "urn:uuid:comprehensive-pcf-certification-record-2024",
  "holder": "did:web:acme-manufacturing.com:BPNL000000000123",
  "validFrom": "2024-08-15T12:00:00Z",
  "validUntil": "2025-06-01T08:00:00Z",
  "proof": {
    "type": "JsonWebSignature2020",
    "proofPurpose": "authentication",
    "verificationMethod": "did:web:acme-manufacturing.com:BPNL000000000123#presentation-key-1",
    "created": "2024-08-15T12:00:00Z",
    "challenge": "c0ae1c8e-c7e7-469f-b252-86e6a0e7387e",
    "domain": "catena-x.net",
    "jws": "eyJ0eXAiOiJ2cCtsZCIsImI2NCI6ZmFsc2UsImNydiI6IkVkMjU1MTkifQ..."
  }
}
```

</details>

#### ACR Structure Analysis

The ACR example above demonstrates several key aspects:

**Multiple Auditor Perspectives:**

| Auditor | Focus Area | Standards Applied | Attributes Certified |
|---------|------------|-------------------|---------------------|
| **ISO Carbon Auditors** | Carbon Footprint Accuracy | ISO 14067:2018 | PCF values, fossil emissions |
| **EU Taxonomy Auditors** | Regulatory Compliance | EU Taxonomy Regulation | Data quality metrics, coverage |
| **Catena-X Certification** | Network Standards | CX-0029 PCF Rulebook | Cross-sectoral standards compliance |

**Comprehensive Trust Coverage:**

- **Technical Validation**: ISO standards ensure methodological correctness
- **Regulatory Compliance**: EU Taxonomy confirms legal requirements
- **Network Interoperability**: Catena-X standards guarantee ecosystem compatibility

**Temporal Coordination:**

The ACR validity period (`2024-08-15` to `2025-06-01`) is automatically determined by the earliest expiration date among the included AACs, ensuring the presentation remains valid only while all constituent credentials are active.

**Verification Benefits:**

1. **One-Stop Verification**: Data consumers can verify multiple aspects of trust in a single document
2. **Auditor Independence**: Each AAC maintains its original signature and validation methods
3. **Selective Presentation**: Data providers can choose which certifications to include for specific use cases
4. **Cryptographic Integrity**: The presentation proof ensures the holder controls all presented credentials

This ACR structure enables comprehensive trust establishment while maintaining the independence and specialization of different auditing bodies within the Tractus-X ecosystem.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
