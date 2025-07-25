---
id: trust-verification
title: Trust Verification & Technical Specifications
description: 'Trust Verification Service and Technical Specifications for Data Trust & Security KIT'
---

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## Building Your Trust Verification System

### What This Service Does

The trust verification service is the heart of your data trust system. It's what actually checks whether the digital certificates you receive are legitimate and trustworthy. Think of it as an automated security guard that examines every piece of verification documentation before allowing data into your systems.

When you receive data with certificates from other organizations, this service performs all the complex technical checks needed to determine if you can trust that data. It handles everything from cryptographic signature validation to checking trusted issuer lists.

### How Verification Works Step-by-Step

Here's what happens when you verify data:

```mermaid
sequenceDiagram
    participant Consumer as Data Consumer
    participant Provider as Data Provider
    participant Registry as Trusted Registry
    participant Verifier as Verification Service
    
    Consumer->>Provider: Request Data with Attestation via Connector
    Provider->>Consumer: Return Data + Verifiable Credential via Connector
    Consumer->>Consumer: Compare Hashes
    Consumer->>Verifier: Verify Credential
    Verifier->>Registry: Check Issuer Status
    Registry->>Verifier: Return Issuer Validation
    Verifier->>Verifier: Validate Signature
    Verifier->>Consumer: Return Verification Result
```

## Technical Details You Need to Know

### The Cryptography Behind Trust

The Data Trust & Security KIT uses proven cryptographic methods based on World Wide Web Consortium (W3C) standards. Don't worry if you're not a cryptography expert - the important thing is that these are battle-tested approaches used across the internet.

#### Digital Signatures - Your Trust Foundation

Digital signatures work like handwritten signatures, but much more secure:

- **Ed25519** - This is our primary signature algorithm. It's fast, secure, and widely supported
- **JsonWebSignature2020** - This is the standardized format we use, ensuring compatibility across different systems
- **Key Management** - We provide secure procedures for generating, storing, and rotating the cryptographic keys

#### What a Signature Looks Like

Every digital signature includes a header that tells verification systems how to process it:

```json
{
  "typ": "vc+ld",
  "b64": false,
  "alg": "HS256",
  "crv": "Ed25519",
  "crit": ["b64"]
}
```

#### DID Web Integration

All issuers must be identifiable through DID Web resolution with Business Partner Number integration:

```text
did:web:<<WALLET-URI>>
```

Example: `did:web:data-provider-wallet.catena-x.net`

#### Supported Signature Types

The Data Trust & Security KIT supports multiple cryptographic signature types, each with different security characteristics and use cases:

##### Ed25519Signature2020

**Security Level**: ***** (Highest Recommended)

- **Algorithm**: Ed25519 elliptic curve cryptography
- **Key Size**: 256-bit (32 bytes)
- **Signature Size**: 512-bit (64 bytes)
- **Performance**: Excellent - fastest signature generation and verification
- **Quantum Resistance**: Moderate resistance to quantum attacks
- **Use Case**: Recommended for all new implementations

**Advantages:**

- High performance with small signature size
- Strong security properties
- Deterministic signatures (no randomness required)
- Resistance to side-channel attacks

**JSON Structure:**

```json
{
    "proof": {
        "type": "Ed25519Signature2020",
        "created": "2024-01-15T10:30:00Z",
        "verificationMethod": "did:web:issuer.example.com#key-1",
        "proofPurpose": "assertionMethod",
        "proofValue": "z5vDVKmhQKyiPj4E2fNvRFDqJ9..."
    }
}
```

##### JsonWebSignature2020

**Security Level**: **** (Highly Recommended)

- **Algorithm**: Supports multiple algorithms (RS256, ES256, Ed25519)
- **Key Size**: Variable (depends on algorithm)
- **Signature Size**: Variable (depends on algorithm)
- **Performance**: Good - flexible implementation options
- **Quantum Resistance**: Depends on underlying algorithm
- **Use Case**: Recommended for interoperability with existing JWT infrastructure

**Advantages:**

- Industry standard JSON Web Signature format
- Supports multiple cryptographic algorithms
- Wide ecosystem support and tooling
- Backward compatibility with JWT systems

**JSON Structure:**

```json
{
    "proof": {
        "type": "JsonWebSignature2020",
        "created": "2024-01-15T10:30:00Z",
        "verificationMethod": "did:web:issuer.example.com#key-1",
        "proofPurpose": "assertionMethod",
        "jws": "eyJ0eXAiOiAidmMrbGQiLCAiYjY0IjogZmFsc2UsICJjcnYi..."
    }
}
```

##### RsaSignature2018

**Security Level**: *** (Acceptable with Caveats)

- **Algorithm**: RSA with PKCS#1 v1.5 or PSS padding
- **Key Size**: Minimum 2048-bit (recommended 3072-bit or 4096-bit)
- **Signature Size**: Same as key size
- **Performance**: Slower than elliptic curve alternatives
- **Quantum Resistance**: Vulnerable to quantum attacks
- **Use Case**: Legacy support only - not recommended for new implementations

**Advantages:**

- Well-established and widely understood
- Extensive tooling and library support
- Compatible with existing PKI infrastructure

**Disadvantages:**

- Large key and signature sizes
- Slower performance
- Vulnerable to quantum computing attacks
- Requires careful implementation to avoid vulnerabilities

**JSON Structure:**

```json
{
    "proof": {
        "type": "RsaSignature2018",
        "created": "2024-01-15T10:30:00Z",
        "verificationMethod": "did:web:issuer.example.com#key-1",
        "proofPurpose": "assertionMethod",
        "signatureValue": "AN1rKvtNZEJzb..."
    }
}
```

##### BbsBlsSignature2020

**Security Level**: ***** (Highest for Privacy-Preserving Applications)

- **Algorithm**: BBS+ signatures with BLS12-381 pairing
- **Key Size**: 96 bytes (public key)
- **Signature Size**: Variable (depends on disclosed attributes)
- **Performance**: Slower than traditional signatures
- **Quantum Resistance**: Moderate resistance
- **Use Case**: Recommended for selective disclosure and zero-knowledge proofs

**Advantages:**

- Enables selective disclosure without signature breaking
- Supports zero-knowledge proofs
- Privacy-preserving verification
- Unlinkable selective disclosure

**Disadvantages:**

- Complex implementation
- Slower performance
- Limited tooling ecosystem
- Requires specialized cryptographic libraries

**JSON Structure:**

```json
{
    "proof": {
        "type": "BbsBlsSignature2020",
        "created": "2024-01-15T10:30:00Z",
        "verificationMethod": "did:web:issuer.example.com#key-1",
        "proofPurpose": "assertionMethod",
        "proofValue": "lAjGJkMNBU49r..."
    }
}
```

#### Signature Type Recommendations

Based on security requirements and use cases, the following recommendations apply:

| Use Case | Primary Recommendation | Alternative | Reason |
|----------|----------------------|-------------|---------|
| **General Attestation** | Ed25519Signature2020 | JsonWebSignature2020 | Best performance and security balance |
| **Enterprise Integration** | JsonWebSignature2020 | Ed25519Signature2020 | JWT ecosystem compatibility |
| **Privacy-Preserving** | BbsBlsSignature2020 | Ed25519Signature2020 | Selective disclosure capabilities |
| **Legacy Systems** | RsaSignature2018 (3072-bit+) | JsonWebSignature2020 | Existing infrastructure support |

#### Security Considerations by Signature Type

**Quantum Computing Threat Timeline:**

- **Current (2024-2030)**: All signature types provide adequate security
- **Near-term (2030-2040)**: RSA and ECDSA become vulnerable, Ed25519 weakened
- **Long-term (2040+)**: Post-quantum signatures required for critical applications

**Performance Comparison (operations per second):**

1. **Ed25519Signature2020**: ~50,000 signatures/sec, ~20,000 verifications/sec
2. **JsonWebSignature2020 (Ed25519)**: ~45,000 signatures/sec, ~18,000 verifications/sec
3. **EcdsaSecp256k1Signature2019**: ~10,000 signatures/sec, ~5,000 verifications/sec
4. **RsaSignature2018 (2048-bit)**: ~1,000 signatures/sec, ~30,000 verifications/sec
5. **BbsBlsSignature2020**: ~500 signatures/sec, ~200 verifications/sec

**Key Management Requirements:**

- **Ed25519/JsonWebSignature2020**: Standard key generation and storage
- **RSA**: Requires larger key storage and more complex key generation
- **BBS+**: Requires specialized cryptographic libraries and key management
- **ECDSA**: Standard elliptic curve key management practices

#### Implementation Guidelines

**Mandatory Requirements:**

- All implementations MUST support Ed25519Signature2020
- All implementations MUST support JsonWebSignature2020 with Ed25519
- Signature verification MUST validate the signature type against trusted issuer capabilities
- Key rotation MUST be supported for all signature types

**Recommended Practices:**

- Use Ed25519Signature2020 as the default for new implementations
- Implement JsonWebSignature2020 for enterprise integration scenarios
- Consider BbsBlsSignature2020 for privacy-sensitive use cases
- Plan for post-quantum signature migration by 2035

**Deprecated/Discouraged:**

- RSA signatures below 3072-bit key size
- SHA-1 based signatures (use SHA3-512 minimum)
- Custom or proprietary signature schemes
- Signature types without proper W3C or IETF standardization

### Revocation and Status Management

The KIT provides comprehensive credential lifecycle management including revocation and status tracking. Revocation configuration is critical for maintaining trust and must be properly integrated into the verification process.

#### Revocation List Configuration

The revocation configuration defines how revoked credentials are tracked and validated:

```json
{
    "revocationConfig": {
        "enabled": true,
        "checkPolicy": "MANDATORY",
        "fallbackPolicy": "REJECT",
        "cacheTimeout": 300,
        "retryAttempts": 3,
        "supportedTypes": [
            "RevocationList2020Status",
            "StatusList2021"
        ],
        "endpoints": {
            "primary": "https://revocation.catena-x.net/api/v1/status",
            "fallback": "https://backup-revocation.catena-x.net/api/v1/status"
        }
    }
}
```

#### Revocation List Structure

Credentials include revocation status information that verifiers must check:

```json
{
    "credentialStatus": {
        "id": "https://issuer.example.com/revocation-list/2024/credentials.json#42",
        "type": "RevocationList2020Status",
        "revocationListIndex": "42",
        "revocationListCredential": "https://issuer.example.com/revocation-list/2024/credentials.json"
    }
}
```

#### Revocation List Document

The actual revocation list contains bitstring representing revocation status:

```json
{
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/vc/status-list/2021/v1"
    ],
    "id": "https://issuer.example.com/revocation-list/2024/credentials.json",
    "type": ["VerifiableCredential", "RevocationList2020Credential"],
    "issuer": "did:web:issuer.example.com:BPNL00000000W3BS",
    "issued": "2024-01-15T10:00:00Z",
    "credentialSubject": {
        "id": "https://issuer.example.com/revocation-list/2024/credentials.json#list",
        "type": "RevocationList2020",
        "encodedList": "H4sIAAAAAAAAA-3BAQ0AAACAkP6v7Q0NgAAAAAAAAAAAAAAAAAAAAIDXhZJH1QAAA"
    },
    "proof": {
        "type": "Ed25519Signature2020",
        "created": "2024-01-15T10:00:00Z",
        "verificationMethod": "did:web:issuer.example.com:BPNL00000000W3BS#key-1",
        "proofPurpose": "assertionMethod",
        "proofValue": "z5vDVKmhQKyiPj..."
    }
}
```

#### Revocation Verification Process

During credential verification, the following revocation checks must be performed:

1. **Extract Revocation Information**: Parse credentialStatus from the verifiable credential
2. **Fetch Revocation List**: Retrieve the revocation list document from the specified URL
3. **Verify List Integrity**: Validate the revocation list's cryptographic signature
4. **Check Revocation Status**: Decode the bitstring and check the specific index
5. **Handle Errors**: Apply fallback policies if revocation list is unavailable
6. **Cache Management**: Cache revocation lists according to configured timeout

#### Error Handling Policies

Configure how to handle revocation check failures:

- **MANDATORY**: Reject credentials if revocation check fails
- **OPTIONAL**: Allow credentials but log warnings
- **CACHED**: Use cached revocation status if fresh list unavailable
- **REJECT**: Default rejection for any revocation-related errors

#### Integration with Trusted Lists

Revocation endpoints are configured within trusted issuer entries:

```json
{
    "issuers": [{
        "did": "did:web:issuer.example.com:BPNL00000000W3BS",
        "revocationEndpoint": "https://issuer.example.com/revocation-api/v1",
        "revocationListUrl": "https://issuer.example.com/revocation-list/2024/credentials.json",
        "revocationCheckRequired": true
    }]
}
```

### Context Definition

For every use case semantic model, a JSON-LD context is required so that verifiable credentials can specify attributes in their content. Context definitions should be hosted in the [eclipse-tractusx/sldt-semantic-models](https://github.com/eclipse-tractusx/sldt-semantic-models) repository under the `gen` folder.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
