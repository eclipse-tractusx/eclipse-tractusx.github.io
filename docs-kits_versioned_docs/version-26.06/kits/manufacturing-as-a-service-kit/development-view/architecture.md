---
title: Architecture
sidebar_position: 2
pagination_next: kits/manufacturing-as-a-service-kit/development-view/api-specification
---

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="maas" />

The MaaS architecture is based on the domain model shown in Figure 8. The entities in the domain model comprise

- the major MaaS roles (buyer, supplier, platform application),
- the involved business applications that provide the required MaaS logic: “Connectivity / User Interface”, “Order Management”, “Matchmaking”, “Order Processing”, “Cost Analysis”, “Capacity Evaluation”, “Capability Evaluation”, “Quality Control”,
- supporting data (features, resources, costs, quality requirements), and
- the data required for cross-company data exchange in AAS format (capabilities, request, offer, order, quality report).

These relationships demonstrate how roles and business applications interact using supporting and exchanged data.

![Image](../resources/svg-img/Domain%20Model.drawio.svg)

Figure 8:  MaaS Domain Model

### Data exchange steps via MX-Port Hercules

The data exchange steps via MX-Port Hercules are based on: [Adoption View | Eclipse Tractus-X](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view/)

![Image](../resources/svg-img/Interaction%20MX-Port%20Hercules.svg)

Figure 9:  Interaction between data consumer and data provider via MX-Port Hercules.

Figure 9 depicts the exchange between a data consumer and a data provider. The first action is performed by the provider, by preparing the necessary resources to offer data to potential consumers:

- P1: **Provide** the **data** according to the offered contract definitions and in the transfer type technology used, e.g., operate a resource server like a **Digital Twin Registry** and a **AAS Repository**. Concrete access control rules for specific AAS resources (AAS Security) can be defined in the AAS Repository.

- P2: **Create** the **data assets** and **policies**. Build **contract definitions** by combining created assets with a **usage** and an **access policy**.

With these steps, data is available and offered in a way that it can be found by consumers and access can be negotiated.

The negotiation is initiated on the consumer side. Before engaging in a contract negotiation, the consumer must be issued an [identity (DID)](https://w3c-ccg.github.io/did-method-web/) by an identity provider (e.g., issuer service).

Based on the consumers identity, the contract can be negotiated.

- N1: The [Data Space Consumer](https://github.com/FraunhoferIOSB/DataSpaceConsumer/) (with the Hercules Extension) initiates a **request** as defined in the **dataspace protocol** **(DSP)** to be executed by the **control plane** of the consumer connector.
- N2: The control plane **resolves** the **provider's DID** to access the corresponding DID document.
- N3: **Before** **initiating** a **DSP request**, the consumer control plane must acquire an **access token** that allows the control plane of the provider to verify the identity of the consumer. This token is provided by the **consumer's wallet**.
- N4: The **consumer control plane** finally executes the intended **DSP request** by calling the corresponding **DSP endpoint** at the provider control plane, attaching the **access token** from step N3.
- N5: The **provider control plane** retrieves the verifiable credentials necessary to **validate the legitimacy** of the request by calling the consumer's wallet using the token created in step N3. The provider accesses the relevant consumer credentials (e.g., a membership credential) and **checks their validity**. In addition, the provider checks whether all other conditions like further policy constraints are met and if successful, accepts the contract offer and sends an agreement to the consumer control plane.

The final step is the actual **data transfer**, after the transfer process has started. Figure 9 shows the standard HTTP pull mechanism, where the data space consumer receives an access token from the provider which is then used to access the provided resource. In the current setup, the **access is controlled by the data plane of the provider**, i.e., the **data plane acts as a proxy** that receives the request (**step T1**) and forwards it to the actual data source (**step T2a** to the DTR or **step T2b** to the AAS repository).

### Data exchange steps via MX-Port Leo

Figure 10 shows the data exchange steps between a “Provider Company” and a “Consumer Company” with focus on the security and access control aspects. Details about the adapter, converter, gate, and discovery layers of the MX-Port are not shown in this figure.

![Image](../resources/svg-img/Leo%20Security.drawio.svg)

Figure 10:  Interaction between Consumer Company and Provider Company via MX-Port Leo

As illustrated in the diagram above, the step-by-step interaction between the “Consumer Company” and the “Provider Company” works as follows:

1. The client (technical user flow is illustrated) authenticates at the consumer’s authorization server (e.g., via client-id/client-secret).
2. The consumer authorization server issues an access token (for aud=Consumer Gateway)
3. The client posts a request to the consumer gateway (indirectly meant for the provider AAS instance)
4. The consumer gateway identifies (e.g., based on the request-URL) the destination of the outbound request (i.e., the provider gateway / reverse proxy as audience) and uses this information together with the client’s access token to initiate a token exchange at the consumer STS.
5. The consumer STS validates the request and (based on the STS configuration for token exchanges) issues and FX-Token targeted for the provider gateway including the client data.
6. The consumer gateway redirects the initial client request to the provider gateway including the FX-Token.
7. The provider gateway triggers a token exchange request for the received request/FX-Token.
8. The provider STS validates the FX-Token, which entails syntax checks (i.e., FX-Token structure) as well as issuer verification. For the issuer verification, the provider STS uses the trusted list for the dataspace – which can either be cached or requested from the online trusted list provider.
9. The trusted list provider returns the trusted list to the provider STS.
10. After successful validation of the FX-Token (i.e., issuer verification based on the Trusted List data plus the key data for the issuer) the provider STS issues an access token for the provider AAS.
11. The provider gateway redirects the initial request together with the access token to the provider AAS.
12. The provider AAS processes the request (including validation of the access token and access rights enforcement) and returns the requested data.
13. The AAS response is forwarded to the consumer gateway.
14. Which forwards the response to the client.

Note that the Consumer Gateway Forward-Proxy as well as the Provider Gateway Reverse-Proxy are both optional components. Their roles are as follows:

- Consumer Gateway Forward-Proxy<br />Client requests are not directly sent out to the Provider endpoint but instead pass a consumer gateway that is responsible for analyzing and updating the request. In particular, the internal access token (used for the consumer gateway) gets replaced by an FX-Token. The consumer gateway can react based on the URL the client is invoking and request a token exchange targeted at the provider endpoint (i.e., specifying the correct aud claim).
- Provider Gateway Reverse-Proxy<br />The provider gateway will receive such a prepared / updated request and forward the included FX-Token to the provider STS that (as in previous increments) validates the FX-Token, checks that it has been issued by a trusted partner (i.e., consumer company) before creating a provider access token that includes optional additional information such as tenant claims, etc.

Using these gateways has two major advantages:

- Externalization of token handling complexity, leading to lower complexity on client implementations plus improved security qualities through being able to ensure the security of the implementation by means of one dedicated component (that can be well maintained and tested).
- Avoiding the need of exchanging domain tokens. Without these gateways, provider access tokens will need to be exchanged. With the gateway approach, this is no longer the case. Between consumer and provider, access is secured by FX-Token instances only. Consumer as well as provider specific tokens never leave the respective domains.

In contrast, without the gateways, consumers have to interact with Token Exchange Services (STSs) on either side, i.e., on (1) consumer as well as (2) provider side in order to (1) obtain an FX-Token instance which could be used for cross-organizational service invocations and (2) to exchange such an FX-Token to an access token issued by the provider STS. Consequently, these steps for token exchanges need to be implemented on consumer side which implies that clients would need to be updated to realize Factory-X specific interactions.

To mitigate these changes (which would introduce additional efforts and could be source of potential vulnerabilities), gateways on either side can be introduced. That is, a consumer gateway which acts as forward proxy and realizes the token exchange on consumer side, i.e., to acquire an FX-Token before forwarding the request to the provider and a provider gateway, representing a reverse proxy, to initiate the FX-Token validation on provider-side and to get it exchanged to a provider token as shown in the step-by-step interaction above.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 SIEMENS AG
- SPDX-FileCopyrightText: 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer IOSB)
- SPDX-FileCopyrightText: 2026 TRUMPF SE + Co. KG
- SPDX-FileCopyrightText: 2026 Technologie-Initiative SmartFactory KL e. V. (SmartFactory-KL)
- SPDX-FileCopyrightText: 2026 DMG MORI Bielefeld GmbH
- SPDX-FileCopyrightText: 2026 Instawerk GmbH
- SPDX-FileCopyrightText: 2026 Matchory GmbH
- SPDX-FileCopyrightText: 2026 soffico GmbH
- SPDX-FileCopyrightText: 2026 Institut für Fertigungstechnik und Werkzeugmaschinen (IFW), Gottfried Wilhelm Leibniz Universität Hannover
- SPDX-FileCopyrightText: 2026 MT Analytics GmbH
- SPDX-FileCopyrightText: 2026 Werkzeugmaschininenlabor (WZL) der Fakultaet Maschinenwesen, Rheinisch-Westfaehlische Technische Hochschule (RWTH) Aachen
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)

### Footnotes

M. Simon, F. Schoeppenthau, R. Kuntschke, C. Czech, B. Obst, B. Fuchs, T. Lepper, T. Schurek, <br/>
S. Currle, K. Wernet, J. Pralle, and P. Ruebel, “Building a Dataspace for Manufacturing as a Service<br/>in Factory-X” arXiv [online]. Available: [https://doi.org/10.48550/arXiv.2604.03678](https://doi.org/10.48550/arXiv.2604.03678 "https://doi.org/10.48550/arxiv.2604.03678")
