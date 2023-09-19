---
sidebar_position: 8
title: Development Process
---
<!--
 * Copyright (c) 2021,2023 T-Systems International GmbH
 * Copyright (c) 2021,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021,2023 Mercedes-Benz AG
 * Copyright (c) 2021,2023 ZF Friedrichshafen AG
 * Copyright (c) 2021,2023 SAP SE
 * Copyright (c) 2021,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This documentation and the accompanying materials are made available under the
 * terms of the Creative Commons Attribution 4.0 International License,  which is available at
 * https://creativecommons.org/licenses/by/4.0/legalcode.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: CC-BY-4.0
-->

This document describes important aspects of knowledge agent development process. At the moment this focuses in particular the branching strategy. For all other
development aspects, see the [Eclipse Tractus-X Developer Guidelines](/docs/developer)

## Branching Strategy

```gitgraph
    commit
    commit
    branch "release/1.9.8"
    checkout "release/1.9.8"
    commit id: "ver(1.9.8)" tag: "v1.9.8"

    checkout main
    commit id: "ver(1.20.2-SNAPSHOT)"
    commit id: "fix(A)"
    commit
    checkout "release/1.9.8"
    branch "fix/1.9.8/A"
    cherry-pick id: "fix(A)"
    checkout "release/1.9.8"
    merge "fix/1.9.8/A"

    checkout "release/1.9.8"
    commit id: "ver(1.9.9)" tag: "1.9.9"
    checkout main
    commit
    commit
    branch "release/1.10.2"
    checkout "release/1.10.2"
    commit id: "ver(1.10.2)" tag: "1.10.2"
    checkout main
    commit id: "ver(1.10.2-SNAPSHOT)"
    commit
    commit id: "ver(2.11.0-SNAPSHOT)"
    branch "feat(B)"
    commit id: "feat(B)"
    checkout main
    branch "fix/C"
    commit id: "fix(C)"
```

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
