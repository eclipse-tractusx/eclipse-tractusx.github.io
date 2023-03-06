---
title: TRG 5.04 - Resource Management
---

| Author               | Status | Created     | Post-History                                 |
|----------------------|--------|-------------|----------------------------------------------|
| Catena-X System Team | Active | 23-Feb-2022 | Fix mixup between CPU and Memory description |
| Catena-X System Team | Active | 10-Nov-2022 | Initial release                              |

## Description

Proper resource management in Helm chart required.

## CPU

Verify CPU is set to sane value and limit is 2-3 times higher (critical is that cpu request is not equal to limit).

## Memory

Verify that memory request and limit are set equal
