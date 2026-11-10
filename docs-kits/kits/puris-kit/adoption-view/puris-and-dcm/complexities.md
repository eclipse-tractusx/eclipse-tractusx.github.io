---
id: complexities
title: Complexities
description: Complexity of DCM and PURIS in the Operational Context
sidebar_position: 3
---

## Complexity in the Bilateral Operational Context

Within the bilateral operational context, PURIS addresses the increased complexity associated with short-term supply deviations close to production. The different complexity levels of DCM and PURIS can also be understood through their respective positions within the production process. DCM primarily supports planning-oriented demand-capacity alignment, where decisions are made with longer lead times and greater flexibility. PURIS, in contrast, operates closer to execution, where supply capability must be continuously monitored and shortage situations require rapid operational decision-making. As organizations move from collaborative planning towards operational execution, data granularity, update frequency and coordination effort increase significantly.

PURIS complexity in the bilateral context is mainly driven by three factors: time-critical decision-making, finer operational granularity, and event-driven information exchange close to execution.

### Consolidated Comparison of DCM and PURIS in the Bilateral Context

| Dimension        | DCM                                                  | PURIS                                                              |
| :--------------- | :--------------------------------------------------- | :----------------------------------------------------------------- |
| Process Position | Planning-oriented phases                             | Execution-oriented phases                                          |
| Primary Focus    | Planning stability and alignment                     | Short-term supply stabilization                                    |
| Data Objects     | Forecast, demand, capacity, commitments              | Operational inventory, demand, production and delivery information |
| Granularity      | Weekly Demand & Capacity Baskets                     | Daily Operational Supply, Demand and Production Information        |
| Update Frequency | Regular, time-based                                  | Continuous, event-driven                                           |
| Decision Context | Planned, with lead time                              | Time-critical, close to execution                                  |
| Governance       | Collaborative balancing and early shortage detection | Operational optimization, shortage prevention and mitigation       |

Table 1: *Consolidated comparison of DCM and PURIS in the bilateral context*

Although both standards contribute to supply chain resiliency, they do so in different contexts.

DCM focuses on creating planning stability through structured demand and capacity alignment. PURIS builds upon these commitments by providing operational transparency and enabling coordinated responses to emerging shortage situations.

The increased complexity of PURIS is therefore not caused by the technical concept itself, but by the operational reality in which decisions must be taken under higher time pressure and with more detailed information.

### Key Complexity Drivers of PURIS

The complexity addressed by PURIS originates from the dynamic nature of operational supply chain management, where supply situations, constraints, and priorities may change rapidly. PURIS provides the transparency and collaboration mechanisms required to manage this complexity more effectively.

Compared to planning-oriented demand-capacity alignment, operational supply monitoring requires:

- higher operational data granularity
- increased data freshness and update frequency
- event-driven information exchange
- policy-based data sharing and usage control
- stronger coordination between supply chain partners
- time-critical decision-making close to execution

## Additional Complexity in N-Tier Networks

Beyond the bilateral context, **N-Tier scenarios require coordination across multiple interconnected supply stages**. N-Tier scenarios refer to supply chain networks involving multiple interconnected supply stages, where information is exchanged between direct business partners and propagated across the supply network in a stepwise manner.

This complexity does not primarily stem from data granularity or update frequency, but from **multi-level coordination requirements**, including:

- cascading requests across multiple tiers
- selective data sharing with tier-specific scopes and durations
- approval and consent mechanisms
- parallel escalation paths and sourcing alternatives

For this reason, N-Tier complexity is treated as a distinct form of complexity beyond the bilateral PURIS context and is addressed separately.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Fraunhofer-Gesellschaft zur Foerderung der angewandten Forschung e.V. (represented by Fraunhofer ISST)  
- SPDX-FileCopyrightText: 2026 Volkswagen AG  
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/puris-kit/adoption-view/puris-and-dcm/complexities.md](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/docs-kits/kits/puris-kit/adoption-view/puris-and-dcm/complexities.md)
