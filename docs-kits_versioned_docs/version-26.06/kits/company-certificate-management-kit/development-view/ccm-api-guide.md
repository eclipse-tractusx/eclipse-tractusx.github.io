---
id: ccm-api-guide
title: CCM API Guide
description: Company Certificate Management KIT — CCM API Guide
sidebar_position: 2
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="ccm" />

This guide covers the notification types, endpoint reference, and JSON payload examples for the Company Certificate Management API (CCMAPI) as defined in CX-0135.

See [Architecture Overview](architecture.md) for the PUSH/PULL mechanism diagrams and the high-level architecture.

---

## Notifications (Request, Available, Feedback)

CCMAPI uses JSON notifications wrapped in a common header structure. All messages share the `Header` (or `FeedbackUrlHeader`) object and a `content` object.

### Request Notification (CertificateRequest)

Used by the Certificate Consumer to ask the Certificate Provider for a certificate for a given legal entity and optional location BPNs. The endpoint is purely consumer-initiated and is intended to be polled by the Consumer; the Provider does not send any asynchronous callbacks for request processing state.

- **Context**: `CompanyCertificateManagement-CCMAPI-Request:1.0.0`
- **Endpoint**: `POST /companycertificate/request`
- **Purpose**: Initiate or track the process of providing a certificate.

The Provider can return to each call:

- `202` with `CertificateRequestInProgressResponse` – request is being processed; Consumer can call the endpoint again later with the same business parameters to poll for completion.
- `200` with `CertificateRequestFinishedResponse`:
  - `COMPLETED` – certificate is available; `documentId` is provided.
  - `REJECTED` – request rejected; `requestErrors` and optional `locationErrors` explain why.

### Available Notification (CertificateAvailable)

Used by the Certificate Provider to inform the Certificate Consumer that a certificate is now available in its EDC catalog.

- **Context**: `CompanyCertificateManagement-CCMAPI-Available:1.0.0`
- **Endpoint**: `POST /companycertificate/available`
- **Purpose**: Reduce the need for the Consumer to poll for new or updated certificates; the Consumer should then pull the certificate from the EDC using the provided `documentId`.

### Feedback Notification (CertificateStatus)

Used by the Certificate Consumer to provide feedback on the status of a consumed certificate to the Certificate Provider.

- **Context**: `CompanyCertificateManagement-CCMAPI-Status:1.0.0`
- **Endpoint**: `POST /companycertificate/status`
- **Purpose**: Inform the Provider whether the certificate was received, accepted or rejected, optionally with errors per certificate or per location.

Feedback can report the following statuses:

- `RECEIVED` – certificate has been obtained and is under validation.
- `ACCEPTED` – certificate is accepted for the given locations.
- `REJECTED` – certificate is rejected, including reasons.

In all feedback notifications, `documentId` refers to the EDC asset ID of the certificate. When feedback is sent for a certificate that was pushed earlier, `relatedMessageId` must reference the `messageId` of the push notification.

---

## Endpoints

This section summarizes all CCMAPI endpoints and their main attributes based on the OpenAPI specification.

### Common Header Models

#### Header

Used by most messages.

**Required properties:**

- `messageId` (string, UUID or `urn:uuid:<uuid>`) – Uniquely identifies a message.
- `context` (string, enum) – One of:
  - `CompanyCertificateManagement-CCMAPI-Request:1.0.0`
  - `CompanyCertificateManagement-CCMAPI-Push:1.0.0`
  - `CompanyCertificateManagement-CCMAPI-Status:1.0.0`
  - `CompanyCertificateManagement-CCMAPI-Available:1.0.0`
- `sentDateTime` (string, ISO 8601 date-time) – Timestamp when the message was sent.
- `senderBpn` (string, pattern `^BPNL[a-zA-Z0-9]{12}$`) – BPNL of the sending party.
- `receiverBpn` (string, pattern `^BPNL[a-zA-Z0-9]{12}$`) – BPNL of the receiving party.
- `version` (string) – Version of the aspect model defining the header structure, e.g. `3.1.0`.

**Optional properties:**

- `relatedMessageId` (string, UUID or `urn:uuid:<uuid>`) – Links this message to a prior related message (e.g. request-to-response, push-to-feedback).

#### FeedbackUrlHeader

Extends `Header` with:

- `senderFeedbackUrl` (string) – URL of the EDC DSP endpoint to which feedback notifications should be sent. Expected to point to a concrete path of the version 1 DSP endpoint where a `cx-taxo:CCMAPI` asset is accessible.

Used in messages where the receiver is expected to send feedback (e.g. push, available, status).

### Schema Types Used in Content

#### BpnLocation

- **Type**: string
- **Pattern**: `^BPN[AS][a-zA-Z0-9]{12}$`
- Represents either a site (BPNS) or an address (BPNA) business partner number.

#### Error

- `message` (string, required) – Human-readable description of the error.

#### LocationError and LocationErrorCollection

- `LocationError` contains a `message` describing an error related to a specific location.
- `LocationErrorCollection` groups location-related errors:
  - `bpn` (BpnLocation)
  - `locationErrors` (array of LocationError)

### POST /companycertificate/request

**Role**: Offered by the Certificate Provider.

**Description**: Certificate Consumer requests a specific certificate from the Certificate Provider.

**Request body – CertificateRequest:**

- `header` (Header)
  - `context` must be `CompanyCertificateManagement-CCMAPI-Request:1.0.0`.
- `content` (object, required)
  - `certifiedBpn` (string, pattern `^BPNL[a-zA-Z0-9]{12}$`, required) – BPNL of the legal entity for which the certificate is requested.
  - `certificateType` (string, required) – Certificate type code (e.g. `iso9001`, `iatf16949`) as defined in the standard.
  - `locationBpns` (array of BpnLocation, optional) – BPNS/BPNA values for sites/addresses for which the certificate is requested.

**Responses:**

- `202` – request accepted and in processing.
  - Body: `CertificateRequestInProgressResponse`:
    - `header` (Header)
    - `content.requestStatus = IN_PROGRESS`
- `200` – request processing finished.
  - Body: `CertificateRequestFinishedResponse` with `header` (Header) and `content` one of:
    - `CertificateRequestCompletedResponseContent`: `requestStatus = COMPLETED`, `documentId` (string, UUID pattern) – EDC asset ID of the certificate.
    - `CertificateRequestRejectedResponseContent`: `requestStatus = REJECTED`, `requestErrors` (array of Error, required), `locationErrors` (array of LocationErrorCollection, optional).
- `400` – request malformed.
- `500` – internal server error.

<details>
<summary>Example: Request body (CertificateRequest)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "context": "CompanyCertificateManagement-CCMAPI-Request:1.0.0",
    "sentDateTime": "2026-03-17T10:00:00Z",
    "senderBpn": "BPNL00000003AYRE",
    "receiverBpn": "BPNL00000007YREZ",
    "version": "3.1.0"
  },
  "content": {
    "certifiedBpn": "BPNL00000003AYRE",
    "certificateType": "iso9001",
    "locationBpns": ["BPNS00000003AYRE"]
  }
}
```

</details>

<details>
<summary>Example: Response 202 — IN_PROGRESS (CertificateRequestInProgressResponse)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f01234567891",
    "context": "CompanyCertificateManagement-CCMAPI-Request:1.0.0",
    "sentDateTime": "2026-03-17T10:00:01Z",
    "senderBpn": "BPNL00000007YREZ",
    "receiverBpn": "BPNL00000003AYRE",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "content": {
    "requestStatus": "IN_PROGRESS"
  }
}
```

</details>

<details>
<summary>Example: Response 200 — COMPLETED (CertificateRequestCompletedResponseContent)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-012345678902",
    "context": "CompanyCertificateManagement-CCMAPI-Request:1.0.0",
    "sentDateTime": "2026-03-17T10:05:00Z",
    "senderBpn": "BPNL00000007YREZ",
    "receiverBpn": "BPNL00000003AYRE",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "content": {
    "requestStatus": "COMPLETED",
    "documentId": "d1e2f3a4-b5c6-7890-def1-234567890abc"
  }
}
```

</details>

<details>
<summary>Example: Response 200 — REJECTED (CertificateRequestRejectedResponseContent)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:d4e5f6a7-b8c9-0123-defa-123456789012",
    "context": "CompanyCertificateManagement-CCMAPI-Request:1.0.0",
    "sentDateTime": "2026-03-17T10:05:00Z",
    "senderBpn": "BPNL00000007YREZ",
    "receiverBpn": "BPNL00000003AYRE",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "content": {
    "requestStatus": "REJECTED",
    "requestErrors": [
      { "message": "Certificate type 'iso9001' is not available for the requested legal entity." }
    ],
    "locationErrors": [
      {
        "bpn": "BPNS00000003AYRE",
        "locationErrors": [
          { "message": "No certificate coverage found for this site." }
        ]
      }
    ]
  }
}
```

</details>

### POST /companycertificate/push

**Role**: Offered by the Certificate Consumer.

**Description**: Certificate Provider sends a certificate directly to the Certificate Consumer.

**Request body – CertificatePush:**

- `header` (FeedbackUrlHeader)
  - `context` must be `CompanyCertificateManagement-CCMAPI-Push:1.0.0`.
  - `senderFeedbackUrl` specifies the EDC DSP endpoint where feedback should be sent.
- `content`
  - `BusinessPartnerCertificate` payload as defined by the JSON Schema generated from the semantic model `io.catenax.business_partner_certificate:3.1.0`.
  - Includes `documentID` (ID of the certificate document itself) and all certificate details.

**Responses:**

- `200` – notification processed successfully.
- `500` – internal server error.

<details>
<summary>Example: Request body (CertificatePush)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:e5f6a7b8-c9d0-1234-efab-234567890123",
    "context": "CompanyCertificateManagement-CCMAPI-Push:1.0.0",
    "sentDateTime": "2026-03-17T10:10:00Z",
    "senderBpn": "BPNL00000007YREZ",
    "receiverBpn": "BPNL00000003AYRE",
    "version": "3.1.0",
    "senderFeedbackUrl": "https://edc.provider.example.com/api/v1/dsp"
  },
  "content": {
    "businessPartnerNumber": "BPNL00000003AYRE",
    "type": {
      "certificateType": "ISO9001",
      "certificateVersion": "2015"
    },
    "registrationNumber": "12 198 54182 TMS",
    "validFrom": "2023-01-25",
    "validUntil": "2026-01-24",
    "areaOfApplication": "Development, Marketing und Sales and also Procurement for interior components",
    "enclosedSites": [
      {
        "enclosedSiteBpn": "BPNS00000003AYRE",
        "areaOfApplication": "Development, Marketing und Sales and also Procurement for interior components"
      }
    ],
    "issuer": {
      "issuerName": "TÜV",
      "issuerBpn": "BPNL133631123120"
    },
    "trustLevel": "none",
    "validator": {
      "validatorName": "Data service provider X",
      "validatorBpn": "BPNL00000007YREZ"
    },
    "uploader": "BPNL00000003AYRE",
    "document": {
      "documentID": "UUID--123456789",
      "creationDate": "2024-08-23T13:19:00.280+02:00",
      "contentType": "application/pdf",
      "contentBase64": "iVBORw0KGgoAAdsfwerTETEfdgd"
    }
  }
}
```

</details>

### POST /companycertificate/status

**Role**: Offered by the Certificate Provider.

**Description**: Certificate Consumer sends feedback on the status of a consumed certificate to the Certificate Provider, regardless of whether the certificate was pushed or pulled.

**Request body – CertificateStatus:**

- `header` (FeedbackUrlHeader)
  - `context` must be `CompanyCertificateManagement-CCMAPI-Status:1.0.0`.
  - `relatedMessageId` should reference the `messageId` of the related request or push notification.
  - `senderFeedbackUrl` indicates where further feedback (if any) should be sent.
- `content` (object, required)
  - `documentId` (string, UUID format, required) – EDC asset ID of the certificate.
  - `certificateStatus` (string, enum `ACCEPTED`, `REJECTED`, `RECEIVED`, required).
  - `locationBpns` (array of BpnLocation, required) – Locations for which this status applies.
  - `certificateErrors` (array of Error, optional) – General reasons for rejection of the certificate.
  - `locationErrors` (array of LocationErrorCollection, optional) – Detailed reasons per location.

**Responses:**

- `200` – status updated successfully.
- `500` – internal server error.

<details>
<summary>Example: Request body — ACCEPTED (CertificateStatus)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:f6a7b8c9-d0e1-2345-fabc-345678901234",
    "context": "CompanyCertificateManagement-CCMAPI-Status:1.0.0",
    "sentDateTime": "2026-03-17T10:20:00Z",
    "senderBpn": "BPNL00000003AYRE",
    "receiverBpn": "BPNL00000007YREZ",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:e5f6a7b8-c9d0-1234-efab-234567890123",
    "senderFeedbackUrl": "https://edc.consumer.example.com/api/v1/dsp"
  },
  "content": {
    "documentId": "d1e2f3a4-b5c6-7890-def1-234567890abc",
    "certificateStatus": "ACCEPTED",
    "locationBpns": ["BPNS00000003AYRE"]
  }
}
```

</details>

<details>
<summary>Example: Request body — RECEIVED (CertificateStatus)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:f6a7b8c9-d0e1-2345-fabc-345678901235",
    "context": "CompanyCertificateManagement-CCMAPI-Status:1.0.0",
    "sentDateTime": "2026-03-17T10:18:00Z",
    "senderBpn": "BPNL00000003AYRE",
    "receiverBpn": "BPNL00000007YREZ",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:e5f6a7b8-c9d0-1234-efab-234567890123",
    "senderFeedbackUrl": "https://edc.consumer.example.com/api/v1/dsp"
  },
  "content": {
    "documentId": "d1e2f3a4-b5c6-7890-def1-234567890abc",
    "certificateStatus": "RECEIVED",
    "locationBpns": ["BPNS00000003AYRE"]
  }
}
```

</details>

<details>
<summary>Example: Request body — REJECTED (CertificateStatus)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:a7b8c9d0-e1f2-3456-abcd-456789012345",
    "context": "CompanyCertificateManagement-CCMAPI-Status:1.0.0",
    "sentDateTime": "2026-03-17T10:21:00Z",
    "senderBpn": "BPNL00000003AYRE",
    "receiverBpn": "BPNL00000007YREZ",
    "version": "3.1.0",
    "relatedMessageId": "urn:uuid:e5f6a7b8-c9d0-1234-efab-234567890123",
    "senderFeedbackUrl": "https://edc.consumer.example.com/api/v1/dsp"
  },
  "content": {
    "documentId": "d1e2f3a4-b5c6-7890-def1-234567890abc",
    "certificateStatus": "REJECTED",
    "locationBpns": ["BPNS00000003AYRE"],
    "certificateErrors": [
      { "message": "Certificate validity period has expired." }
    ],
    "locationErrors": [
      {
        "bpn": "BPNS00000003AYRE",
        "locationErrors": [
          { "message": "Site is no longer associated with this legal entity." }
        ]
      }
    ]
  }
}
```

</details>

### POST /companycertificate/available

**Role**: Offered by the Certificate Consumer.

**Description**: Certificate Provider notifies the Certificate Consumer that a certificate is available in the Provider's EDC catalog.

**Request body – CertificateAvailable:**

- `header` (FeedbackUrlHeader)
  - `context` must be `CompanyCertificateManagement-CCMAPI-Available:1.0.0`.
  - `senderFeedbackUrl` indicates where follow-up feedback should be sent.
- `content` (object, required)
  - `documentId` (string, UUID format, required) – EDC asset ID of the available certificate.
  - `certificateType` (string, required) – Certificate type (e.g. `iso9001`).
  - `locationBpns` (array of BpnLocation, optional) – Locations for which this certificate is relevant.

**Responses:**

- `200` – notification processed successfully.
- `500` – internal server error.

<details>
<summary>Example: Request body (CertificateAvailable)</summary>

```json
{
  "header": {
    "messageId": "urn:uuid:b8c9d0e1-f2a3-4567-bcde-567890123456",
    "context": "CompanyCertificateManagement-CCMAPI-Available:1.0.0",
    "sentDateTime": "2026-03-17T10:15:00Z",
    "senderBpn": "BPNL00000007YREZ",
    "receiverBpn": "BPNL00000003AYRE",
    "version": "3.1.0",
    "senderFeedbackUrl": "https://edc.provider.example.com/api/v1/dsp"
  },
  "content": {
    "documentId": "d1e2f3a4-b5c6-7890-def1-234567890abc",
    "certificateType": "iso9001",
    "locationBpns": ["BPNS00000003AYRE"]
  }
}
```

</details>

## Summary

- Use the **PUSH mechanism** (`/companycertificate/push`) when the Provider actively sends certificates and expects status feedback via `/companycertificate/status`.
- Use the **PULL mechanism** (`/companycertificate/request` plus EDC catalog lookup) when the Consumer needs to explicitly request or fetch certificates.
- Use the notification endpoints `/companycertificate/request`, `/companycertificate/available` and `/companycertificate/status` to coordinate certificate discovery, availability and lifecycle feedback.
- Always respect the header conventions (BPNs, context, message IDs, feedback URLs) and the semantic model `io.catenax.business_partner_certificate:3.1.0` when creating and consuming certificate payloads.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 BASF SE
- SPDX-FileCopyrightText: 2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2026 Cofinity-X GmbH
- SPDX-FileCopyrightText: 2026 Data Space Solutions GmbH
- SPDX-FileCopyrightText: 2026 DCCS GmbH
- SPDX-FileCopyrightText: 2026 Mercedes Benz AG
- SPDX-FileCopyrightText: 2026 Robert Bosch Manufacturing Solutions GmbH
- SPDX-FileCopyrightText: 2026 SAP SE
- SPDX-FileCopyrightText: 2026 sovity GmbH
- SPDX-FileCopyrightText: 2026 T-Systems International GmbH
- SPDX-FileCopyrightText: 2026 Volkswagen AG
- SPDX-FileCopyrightText: 2026 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
