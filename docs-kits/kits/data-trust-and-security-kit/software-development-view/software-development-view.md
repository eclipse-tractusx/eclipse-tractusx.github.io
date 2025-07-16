---
id: software-development-view
title: Development View
description: 'Data Trust & Security KIT'
sidebar_position: 3
---


## Development View

![Data Trust & Security KIT Icon](@site/static/img/kits/data-trust-and-security/data-trust-and-security-kit-logo.svg)

## Atestestation Service Provider Trusted List

The trusted list of issuers should be maintained by a Governance Entity (example Catena-X Association), and can be hosted by the Core Service Providers. However, its ongoing curation and updates will require input from domain experts across relevant industries to ensure accuracy and relevance.
It should provide for each use case a list of acceditated issues.

Based on certain rules, defined by each use case, a company will be allowed to be included in this trusted list. 
This set of rules will be defined in an Acreditation Rulebook.

### Example:

```json
{
   "@context": [
     "https://www.w3.org/ns/odrl.jsonld",
     {
         "cx-policy": "https://w3id.org/catenax/policy/",
         "cx-trusted-list": "https://w3id.com/catena-x/trusted-list/"
     }
   ],
   "type": "TrustedList",
   "owner": {
      "name": "Catena-X Automotive Network e.V.",
      "@id": "did:web:catena-x.net"
    },
   "trustedIssuers": [
     {
        "type": "cx-policy:cx.pcf.base:1",
        "status": "active",
        "name": "TÜV SÜD",
        "@id": "did:web:tuv-sud.de"
     }
   ]
}
```

## Data Atestestation Certificate

When a use intends to generate certificates that are able to be verified by the consumers...

```json
{
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://w3c.github.io/vc-jws-2020/contexts/v1/",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.certificate.dac/1.0.0/gen/Dac-context.jsonld",
        "https://raw.githubusercontent.com/eclipse-tractusx/sldt-semantic-models/refs/heads/main/io.catenax.pcf/7.0.0/gen/Pcf-context.jsonld"
    ],
    "type": [
        "VerifiableCredential",
        "CertifiedDataCredential",
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
        }
    },
    "id": "urn:uuid:d2e47115-c430-4145-bbde-1c743804a379",
    "issuer": "did:web:tuv-sud.de",
    "validFrom": "2024-06-21T16:52:40Z",
    "validUntil": "2024-12-06T16:52:40Z",
    "credentialStatus": {
        "id": "https://tuv-sud.de/revocation-list/2024/credentials.json#list",
        "type": "RevocationList2020Status",
        "revocationListIndex": "42",
        "revocationListCredential": "https://tuv-sud.de/revocation-list/2024/credentials.json"
    },
    "proof": {
        "type": "JsonWebSignature2020",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:tuv-sud.de:BPNL00000000W3BS#N4bTDb14GEnCvwZdFRqK5lwL4nje3bB5Y4nvb01VBKA",
        "created": "2024-06-21T16:52:40+00:00Z",
        "jws": "eyJ0eXAiOiAidmMrbGQiLCAiYjY0IjogZmFsc2UsICJjcnYiOiAiRWQyNTUxOSJ9..c_xfb7TCumZqWxeZHXCiu1xWgyzx2JgeAJjPteDbr3gxRtIZvobsxfWR5s5UTMKgp47vC6Mh0_Uq6cN7vB6ABA"
    }
}
```

## Format of Attribute Attestation Certificate

Use case credentials can have 



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
## Revocation List

The revocation list shall be defined under `credentialStatus` as specified in eIDAs.
```json
    "credentialStatus": {
        "id": "https://tuv-sud.de/revocation-list/2024/credentials.json#list",
        "type": "RevocationList2020Status",
        "revocationListIndex": "42",
        "revocationListCredential": "https://tuv-sud.de/revocation-list/2024/credentials.json"
    }
```

## Context as JSON-LD

For every use case semantic model it is required to have a "context" in JSON-LD format, so that the verifiable credentials can specify the attributes in its content.
It shall be hosted in https://github.com/eclipse-tractusx/sldt-semantic-models under the `gen` folder.


## Verifiable Credentials as Digital Twins Submodels

### Data Atestation Certificate

```json
{
  "endpoints": [
      {
          "interface": "SUBMODEL-3.0",
          "protocolInformation": {
              "href": "https://<edc.dataplane>/api/public/data/urn:uuid:a377ff49-6bde-4215-8d38-b8f02c991a35",
              "endpointProtocol": "HTTP",
              "endpointProtocolVersion": [
                  "1.1"
              ],
              "subprotocol": "DSP",
              "subprotocolBody": "id=urn:uuid:3e4a5957-f226-478a-ab18-79ced49d6195;dspEndpoint=https://edc.controlplane/api/v1/dsp",
              "subprotocolBodyEncoding": "plain",
              "securityAttributes": [
                  {
                      "type": "NONE",
                      "key": "NONE",
                      "value": "NONE"
                  }
              ]
          }
      }
  ],
  "idShort": "pcf",
  "id": "urn:uuid:a377ff49-6bde-4215-8d38-b8f02c991a35",
  "semanticId": {
      "type": "ExternalReference",
      "keys": [
          {
              "type": "Entity",
              "value": "https://www.w3.org/ns/credentials/v2"
          },
          {
              "type": "DataElement",
              "value": "urn:samm:io.catenax.certificate.dac:1.0.0#DataAtestationCertificate"
          },
          {
              "type": "Submodel",
              "value": "urn:samm:io.catenax.pcf:7.0.0#Pcf"
          },
          {
              "type": "Operation",
              "value": "https://w3c.github.io/vc-jws-2020/contexts/v1/"
          }
      ]
  },
  "description": [
      {
          "language": "en",
          "text": "Verifiable Pcf Submodel"
      }
  ],
  "displayName": []
}
```




