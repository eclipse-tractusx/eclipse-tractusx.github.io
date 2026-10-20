---
title: Architecture Overview
sidebar_position: 2
---

<!--
 *********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
-->

## Development View

import Kit3DLogo from '@site/src/components/2.0/Kit3DLogo';

<Kit3DLogo kitId="due-diligence" />

## Application Architecture

### Application Architecture Overview

![DueDiligenceArchitecture](../resources/DueDiligenceArchitecture.drawio.svg)

The **Business Partner KIT** at the Operating Company manages the master data of Catena-X participants, including Due Diligence information. Therefore the Due Diligence information is part of the so called Golden Record of a Catena-X participant.

This information is provided by the **Data Providers** via the **Due Diligence KIT** app used by the company that has due diligence information to share with other Catena-X participants, especially OEMs and Tier 1 suppliers.

**Data Consumers** are normally the OEMs and Tier1 suppliers, that want to do a due diligence check on the suppliers in their global supply chain. They have access to limited due diligence information via the BPDM/Golden Record of a Catena-X participant. More due diligence relevant information can be consumed directly from the supplier (Data Providers) that are connected to the Catena-X data space.

The Data Provider (supplier) determines which Data Consumer (OEM and Tier1) are allowed to see which due diligence information managed by their instance of the Due Diligence KIT application.
A specific supplier in the supply chain can be Data Provider for OEMs and Tier 1 suppliers, as well as a Data Consumer from supplier further down in the supply chain.

The **EDC Control Planes** handles authentication and authorization between parties.

The **EDC Data Planes** execute the actual data transfer after a successful authentication and authorization.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Accenture
- SPDX-FileCopyrightText: 2026 BMW Group
- SPDX-FileCopyrightText: 2026 CarbonEase
- SPDX-FileCopyrightText: 2026 CATL
- SPDX-FileCopyrightText: 2026 DASU – Transferzentrum für Digitalisierung, Analytics & Data Science Ulm
- SPDX-FileCopyrightText: 2026 d-fine
- SPDX-FileCopyrightText: 2026 Dräxlmaier
- SPDX-FileCopyrightText: 2026 Drive Sustainability
- SPDX-FileCopyrightText: 2026 Ford
- SPDX-FileCopyrightText: 2026 Helpdesk on Business and Human Rights
- SPDX-FileCopyrightText: 2026 INOVIA Solutions
- SPDX-FileCopyrightText: 2026 Magna
- SPDX-FileCopyrightText: 2026 Mercedes-Benz
- SPDX-FileCopyrightText: 2026 Nanjing fuchuang big data industry development Co. Ltd
- SPDX-FileCopyrightText: 2026 Prewave
- SPDX-FileCopyrightText: 2026 Responsible Business Alliance (RBA)
- SPDX-FileCopyrightText: 2026 Responsible Supply Chain Initiative e.V. (RSCI)
- SPDX-FileCopyrightText: 2026 Schaeffler
- SPDX-FileCopyrightText: 2026 Silver Atena
- SPDX-FileCopyrightText: 2026 Der Mittelstandsverbund – ZGV
- SPDX-FileCopyrightText: 2026 TÜV SÜD
- SPDX-FileCopyrightText: 2026 Ulm University
- SPDX-FileCopyrightText: 2026 Verband der Automobilindustrie e.V. (VDA)
- SPDX-FileCopyrightText: 2026 Volkswagen
- SPDX-FileCopyrightText: 2026 Witte Automotive
- SPDX-FileCopyrightText: 2026 ZF
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
