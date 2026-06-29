## Create Asset (Provider)

```json
{
    "@type": "IdResponse",
    "@id": "wafer_2OC6UZHR_17",
    "createdAt": 1774273245445,
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    }
}
```

## Create Policy (Provider)

```json
{
    "@type": "IdResponse",
    "@id": "ifx-restricted-policy-9874",
    "createdAt": 1774273509691,
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    }
}
```

## Create Contract Definition (Provider)

```json
{
    "@type": "IdResponse",
    "@id": "wafer_2OC6UZHR_17_contract",
    "createdAt": 1774273549866,
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    }
}
```

## Fetch Catalog (Consumer)

```json
{
    "@id": "616de0e5-b6f1-4fb7-8be5-88bd033ac729",
    "@type": "dcat:Catalog",
    "dcat:dataset": {
        "@id": "wafer_2OC6UZHR_17",
        "@type": "dcat:Dataset",
        "odrl:hasPolicy": {
            "@id": "d2FmZXJfMk9DNlVaSFJfMTdfY29udHJhY3Q=:d2FmZXJfMk9DNlVaSFJfMTc=:ZmIxMTA5ODMtODM1NC00ZjUxLTk5MjAtZGMxODg5NjczYTM2",
            "@type": "odrl:Offer",
            "odrl:permission": [],
            "odrl:prohibition": [],
            "odrl:obligation": []
        },
        "dcat:distribution": [
            {
                "@type": "dcat:Distribution",
                "dct:format": {
                    "@id": "AzureStorage-PUSH"
                },
                "dcat:accessService": {
                    "@id": "0794daa4-0e53-4217-b4f9-b341ce217863",
                    "@type": "dcat:DataService",
                    "dcat:endpointDescription": "dspace:connector",
                    "dcat:endpointUrl": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp",
                    "dcat:endpointURL": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp"
                }
            },
            {
                "@type": "dcat:Distribution",
                "dct:format": {
                    "@id": "HttpData-PULL"
                },
                "dcat:accessService": {
                    "@id": "0794daa4-0e53-4217-b4f9-b341ce217863",
                    "@type": "dcat:DataService",
                    "dcat:endpointDescription": "dspace:connector",
                    "dcat:endpointUrl": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp",
                    "dcat:endpointURL": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp"
                }
            },
            {
                "@type": "dcat:Distribution",
                "dct:format": {
                    "@id": "HttpData-PUSH"
                },
                "dcat:accessService": {
                    "@id": "0794daa4-0e53-4217-b4f9-b341ce217863",
                    "@type": "dcat:DataService",
                    "dcat:endpointDescription": "dspace:connector",
                    "dcat:endpointUrl": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp",
                    "dcat:endpointURL": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp"
                }
            },
            {
                "@type": "dcat:Distribution",
                "dct:format": {
                    "@id": "AmazonS3-PUSH"
                },
                "dcat:accessService": {
                    "@id": "0794daa4-0e53-4217-b4f9-b341ce217863",
                    "@type": "dcat:DataService",
                    "dcat:endpointDescription": "dspace:connector",
                    "dcat:endpointUrl": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp",
                    "dcat:endpointURL": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp"
                }
            }
        ],
        "name": "wafer_2OC6UZHR_17_asset",
        "id": "wafer_2OC6UZHR_17",
        "contenttype": "application/json",
        "myProperty": "myPrpertyValue"
    },
    "dcat:catalog": [],
    "dcat:distribution": [],
    "dcat:service": {
        "@id": "0794daa4-0e53-4217-b4f9-b341ce217863",
        "@type": "dcat:DataService",
        "dcat:endpointDescription": "dspace:connector",
        "dcat:endpointUrl": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp",
        "dcat:endpointURL": "https://edc-2-dsp.opaix.semix-int3.kubernetes.htw-dresden.de/api/v1/dsp"
    },
    "dspace:participantId": "BPNL000000000RMP",
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "dcat": "http://www.w3.org/ns/dcat#",
        "dct": "http://purl.org/dc/terms/",
        "odrl": "http://www.w3.org/ns/odrl/2/",
        "dspace": "https://w3id.org/dspace/v0.8/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/"
    }
}
```

## Receive EDR (Consumer)

```json
{
    "@type": "IdResponse",
    "@id": "a44a657d-fd16-43af-bdb3-6e0e2db173f6",
    "createdAt": 1774273826977,
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    }
}
```

## Retrieve EDR (Consumer)

```json
[
    {
        "@id": "336370f7-8066-4611-8550-37c366225bef",
        "@type": "EndpointDataReferenceEntry",
        "providerId": "BPNL000000000RMP",
        "assetId": "wafer_2OC6UZHR_17",
        "agreementId": "005b0739-0955-492e-a17e-c9234e0bf9f5",
        "transferProcessId": "336370f7-8066-4611-8550-37c366225bef",
        "createdAt": 1774273832361,
        "contractNegotiationId": "a44a657d-fd16-43af-bdb3-6e0e2db173f6",
        "@context": {
            "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
            "tx-auth": "https://w3id.org/tractusx/auth/",
            "cx-policy": "https://w3id.org/catenax/policy/",
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
            "edc": "https://w3id.org/edc/v0.0.1/ns/",
            "odrl": "http://www.w3.org/ns/odrl/2/"
        }
    }
]
```

## Retrieve Data Address (Consumer)

```json
{
    "@type": "DataAddress",
    "flowType": "PULL",
    "endpointType": "https://w3id.org/idsa/v4.1/HTTP",
    "tx-auth:refreshEndpoint": "https://edc-2-mgt.opaix.semix-int3.kubernetes.htw-dresden.de/api/public/token",
    "transferTypeDestination": "HttpData",
    "tx-auth:audience": "did:web:ssi-dim-wallet-stub.semix-int3.kubernetes.htw-dresden.de:BPNL000000000QNE",
    "type": "https://w3id.org/idsa/v4.1/HTTP",
    "endpoint": "https://edc-2-dataplane.opaix.semix-int3.kubernetes.htw-dresden.de/api/public",
    "tx-auth:refreshToken": "[REDACTED]",
    "tx-auth:expiresIn": "300",
    "authorization": "[REDACTED]",
    "tx-auth:refreshAudience": "did:web:ssi-dim-wallet-stub.semix-int3.kubernetes.htw-dresden.de:BPNL000000000QNE",
    "@context": {
        "tx": "https://w3id.org/tractusx/v0.0.1/ns/",
        "tx-auth": "https://w3id.org/tractusx/auth/",
        "cx-policy": "https://w3id.org/catenax/policy/",
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "edc": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
    }
}
```
The data can be downloaded using the data address retrieved by the Consumer.


## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: [2026] [Infineon Technologies AG]
- SPDX-FileCopyrightText: [2026] [Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V. (Fraunhofer IWU)]
- SPDX-FileCopyrightText: [2026] Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)