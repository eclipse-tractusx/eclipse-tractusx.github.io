---
id: dt-kit-interaction-patterns
title: Interaction Patterns
description: 'Digital Twin KIT - Interaction Patterns'
sidebar_position: 2
---

## Interaction Patterns for Distributed Digital Twins

The Catena-X standard CX-0002 (Digital Twins in Catena-X) defines a subset of the

### 1. Fetching a supplier's Twin

| Scenario                                                                    | Participants                                           | Assumptions                                                                 | Links to Use-Cases                                                                               |
|-----------------------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| The supplier has data required by the OEM. For instance a Bill of Material. | - Data Provider (Supplier) <br/> - Data Consumer (OEM) | 1. Consumer knows Supplier's BPN <br/> 2. Consumer knows an id of the asset | - Industry Core (coming soon) <br/> - [Product Carbon Footprint Kit](../../PCF%20Exchange%20Kit) |

### 2. Adding a new Submodel

| Scenario                                                                                                      | Participants                                                   | Assumptions                             | Links to Use-Cases    |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|-----------------------|
| A party (who is not the supplier of an part) publishes data about a previously uncovered aspect of the asset. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | - PURIS (coming soon) |

### 3. Updating an existing Submodel

| Scenario                                                                                           | Participants                                                   | Assumptions                             | Links to Use-Cases      |
|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|-------------------------|
| A party (who is not the supplier of an part) updates data already covered by an existing Submodel. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | - DCM-AAS (coming soon) |

### 4. Updating an existing Twin

| Scenario                                                                  | Participants                                                   | Assumptions                             | Links to Use-Cases |
|---------------------------------------------------------------------------|----------------------------------------------------------------|-----------------------------------------|--------------------|
| A new customer wants their customerPartId as specificAssetId on the twin. | - Data Provider (Supplier) <br/> - Data Provider (Third Party) | 1. Third Party knows an id of the asset | None yet           |

