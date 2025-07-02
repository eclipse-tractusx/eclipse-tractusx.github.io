---
id: development-view-data-trust-and-security-kit
title: Development View
description: 'Data Trust and Security KIT'
sidebar_position: 3
---


# Development View
![Data Trust and Security KIT Logo](./assets/data-trust-and-security-kit-logo.svg)

## Who maintain/host this trusted list (Catena-X e.V.)
## What semantic/structure we use?





## Which signatures are allowed?


## Format of Attribute Attestation Certificate

```json
{
  "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://w3c.github.io/vc-jws-2020/contexts/v1/",
      "https://w3id.org/security/data-integrity/v2",
      "https://raw.githubusercontent.com/eclipse-tractusx/digital-product-pass/main/dpp-verification/schemas/csc/1.0.0/certifiedSnapshotCredential.jsonld",
      "https://raw.githubusercontent.com/eclipse-tractusx/digital-product-pass/main/dpp-verification/schemas/dpp/5.0.0/digitalProductPass.jsonld"
  ],
  "type": [
      "VerifiableCredential",
      "CertifiedSnapshotCredential",
      "DigitalProductPassport"
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
              "@id": "sustainability.productFootprint.carbon[0].value",
              "digestMultibase": "d05da06852ad3b7f8ac51cf20b4ff07be758878643da52cc3418cf15eea3e2e91d93dbc69de977560d4561109021d5b39c9f26cbc6546b39298e8ae70694ec32"
          }
      ]
  },
  "origin": {
      "digestMultibase": "c118df3b7bf603a86bd79f03c692153bdb4212ab80d49c12154c92415ae83d6d59187d9ba5af9c4e40208f7d7b1d4c727de78cfbe51e768aae743723ee197374",
      "semanticId": "urn:samm:io.catenax.generic.digital_product_passport:5.0.0#DigitalProductPass",
      "@id": "did:web:dpp-test-system.com:BPNL000000000000:api:public:urn%3Auuid%3Acd1c0904-27e2-4ae2-8751-5c8c8e4b6812",
      "@type": "application/vc+ld+json"
  },
  "id": "urn:uuid:281a8b98-933c-4d80-ad86-721f1adbe5b3",
  "issuer": "did:web:dpp-provider-wallet.int.demo.catena-x.net:BPNL00000000W3BS",
  "validFrom": "2024-07-10T15:08:13Z",
  "validUntil": "2024-12-25T15:08:13Z",
  "proof": {
      "type": "JsonWebSignature2020",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:web:dpp-provider-wallet.int.demo.catena-x.net:BPNL00000000W3BS#N4bTDb14GEnCvwZdFRqK5lwL4nje3bB5Y4nvb01VBKA",
      "created": "2024-07-10T15:08:13Z",
      "jws": "eyJ0eXAiOiAidmMrbGQiLCAiYjY0IjogZmFsc2UsICJjcnYiOiAiRWQyNTUxOSJ9..Rpq5BU3Y_-pwQofpWyEaG75muQ2ojRAxr7TZP4PMacO6cXZVeGHD_2qd3EzmEITcXEiV1u3Ct-SHyc7AI9cPCA"
  }
}
```


## Format of base credential




## Reference implementation for translating (JSON-SCHEMA to JSON-LD)
## Reference implementation "simple wallet" and "identity hub"
## How the verification is done?
## Revocation of credentials, how is that done?
## Certified Data Credential & Certified Snapshot Credential (when are they used and for what)
## How to place credentials in digital twins? Where do we store them?
