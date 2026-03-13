---
title: Architecture Overview and CCM API Guide
sidebar_position: 2
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="ccm" />

## Business Architecture and APIs

### Architecture

The CCM system is a modular, scalable architecture supporting integration with ERP, CRM, and document management systems. It includes a dashboard for monitoring certificate status and pending actions.

**Key architectural qualities:**

- **Integration**: Standard APIs or connectors for integration with external systems. Support for importing/exporting data in standard formats (CSV, XML).
- **Security**: Data encryption at rest and in transit. Strict access controls to sensitive certificate data. Compliance with data protection regulations (e.g., GDPR).
- **Scalability**: Ability to handle a large number of business partners and certificates. Support for future integration with additional systems or modules.
- **Reliability & Availability**: High system uptime, backup, and disaster recovery mechanisms.
- **Performance**: Fast response times for certificate lookups and workflow actions. Efficient batch processing for notifications and reporting.
- **Usability**: Intuitive user interface for business and technical users. Multilingual support as required.
- **Auditability**: Comprehensive logging of all user actions and system events. Tamper-proof audit trails for compliance verification.
- **Maintainability**: Modular architecture for easy updates and enhancements. Clear documentation for system configuration and operation.

### API Endpoints and Resources

- Company Certificate Request
- Company Certificate Push
- Company Certificate Status (Accepted / Received / Rejected)
- Company Certificate Available
- Error Handling

## Company Certificate Management API (CCMAPI) – Usage Guide

This section explains how to use the Company Certificate Management API (CCMAPI) defined in CX-0135, based on the OpenAPI specification.

The CCMAPI supports two main interaction patterns between Certificate Provider and Certificate Consumer:

- **PUSH mechanism** – Provider actively sends certificates.
- **PULL mechanism** – Consumer actively requests or retrieves certificates.

Additionally, CCMAPI defines notification messages to coordinate these interactions.

---

## PUSH Mechanism

In the PUSH mechanism, the Certificate Provider initiates the transfer of a certificate to the Certificate Consumer via the endpoint `/companycertificate/push`.

### High-Level Flow

1. Certificate Consumer exposes a CCMAPI notification API asset (type `cx-taxo:CCMAPI`) in its EDC catalog.
2. Certificate Provider negotiates a contract for this CCMAPI asset in the Consumer's EDC and obtains an EDR.
3. Using the EDR, the Certificate Provider calls `/companycertificate/push` with a `CertificatePush` message:

    - The header identifies sender, receiver, context, message and feedback URL.
    - The content contains the `BusinessPartnerCertificate` payload (as defined by the semantic model `urn:samm:io.catenax.business_partner_certificate:3.1.0`).

4. Consumer processes the certificate and may send feedback via `/companycertificate/status`.

### Key Points

- **PUSH is Provider-driven**: Provider decides when and for which locations a certificate is sent.
- The field `senderFeedbackUrl` in the header tells the Consumer which EDC DSP endpoint to use for feedback notifications.
- The certificate content includes `documentID` (as defined in the aspect model) and all relevant certificate details and enclosed sites/addresses.

---

## PULL Mechanism

In the PULL mechanism, the Certificate Consumer initiates the retrieval of certificates from the Certificate Provider.

There are two complementary parts:

- **Request notification via CCMAPI** – Consumer asks Provider for a certificate for a specific legal entity and (optionally) locations.
- **EDC catalog lookup and data pull** – Consumer looks up the certificate asset in the Provider's EDC catalog and retrieves the actual certificate data.

### High-Level Flow

1. Provider creates certificate assets in its EDC catalog:

    - Subject `cx-taxo:CompanyCertificate` and type `cx-taxo:Submodel`.
    - Semantic ID `urn:samm:io.catenax.business_partner_certificate:3.1.0`.
    - Properties such as `certificateType` and `enclosedSites` set according to the model.

2. Consumer optionally sends a request via `/companycertificate/request` to indicate which certificate is desired.
3. Provider processes the request and returns either:

    - `IN_PROGRESS` – processing continues asynchronously.
    - `COMPLETED` – including the `documentId` (EDC asset ID of the certificate).
    - `REJECTED` – including one or more errors.

4. For long-running processing, the Consumer polls the same `/companycertificate/request` endpoint again (with a new message but the same business parameters) until a `COMPLETED` or `REJECTED` response is returned. The Provider never initiates a callback for request state changes.
5. After `COMPLETED`, Consumer uses the `documentId` to search the Provider's EDC catalog and retrieves the certificate via the EDC data plane.
6. Consumer may send feedback about reception, acceptance or rejection via `/companycertificate/status`.

### Key Points

- **PULL is Consumer-driven**: Consumer asks for the certificate when needed.
- The `documentId` in the CCMAPI messages refers to the EDC asset ID of the certificate (except inside the pushed certificate payload, where `documentID` refers to the certificate document itself).
- Certificate assets are identified in EDC by the combination of subject, certificate type and enclosed sites.

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
