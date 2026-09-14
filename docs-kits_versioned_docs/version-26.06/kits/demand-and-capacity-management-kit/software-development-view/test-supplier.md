---
id: test-supplier
title: Test - Supplier
description: 'Tests relevant for the business role supplier.'
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## Introduction

This page lists tests that can be executed by the business role supplier.

They are written in [Gherkin](https://cucumber.io/docs/gherkin/).

For an overview of these tests you should visit [Testing a DCM application](./overview.md#testing-a-dcm-application) within the Development View of this KIT.

## Supplier: Prepare yourself

### Setup EDC

<details>
<summary>This test ensures that the supplier sets up its EDC.</summary>

```cucumber
Feature: Supplier: Prepare yourself

Scenario: Setup EDC
  Given I have joined the Catena-X dataspace and want to execute DCM tests
  When I check whether I have setup my EDC or not
  Then I should confirm that I have setup my EDC in the correct version successfully 
```

</details>

### Register APIs as assets

<details>
<summary>This test ensures that the supplier registers its API endpoints as data assets with its own EDC.</summary>

```cucumber
Feature: Supplier: Prepare yourself

Scenario Outline: Register APIs as assets
  Given my EDC has been setup correctly
  When I check the asset catalog of my own EDC
  Then I should find an asset for the <API> with the correct <taxonomy> and <version> 

Examples:
| API                         | Taxonomy                           | Version |
| WeekBasedMaterialDemand API | cx-taxo:DcmWeekBasedMaterialDemand | 2.0     |
| RequestForUpdate API        | cx-taxo:DcmIdBasedRequestForUpdate | 2.0     |
| IdBasedComment API          | cx-taxo:DcmIdBasedComment          | 2.0     |
```

</details>

### Check wallet for certificates

<details>
<summary>This test ensures that the supplier has the necessary credentials in its wallet.</summary>

```cucumber
Feature: Supplier: Prepare yourself

Scenario Outline: Check wallet for certificates
  Given I have been successfully onboarded into the Catena-X dataspace 
  When I check my wallet
  Then I should find a <credential> that corresponds to a <policy> 

Examples:
| credential                 | policy                     |
| BPN-restricted Data Usage  | BPN-restricted Data Usage  |
| Membership Credential      | Membership Credential      |
| DataExchangeGovernance:1.0 | DataExchangeGovernance:1.0 |
```

</details>

### Prepare variables for other tests

<details>
<summary>This test ensures that the supplier is aware of the fact that some tests contain variables that need to be filled in with the correct values before executing the tests.</summary>

```cucumber
Feature: Supplier: Prepare yourself
  
Scenario Outline: Prepare 
  Given I want to execute a <test> that uses a <variable> I need to have a <value> assigned to <variable> that makes sense in the context of the <test> and use the value of the variable instead of its name when testing.
  When the test gets executed
  Then it should work as intended

Examples:
| test                                                                                                               | variable  | value                                                                                                                                                          |
| Supplier: Create WeekBasedCapacityGroup, Supplier: Create IdBasedComment                                           | BPNL_SUP  | {Use your own Business Partner Number Legal (BPNL) e.g. BPNL000000000JS9}                                                                                      |
| Supplier: Create WeekBasedCapacityGroup, Supplier: Create IdBasedComment                                           | BPNL_CUS  | {Business Partner Number Legal (BPNL) of the company that acts as the business role Supplier in the context of the test execution e.g. BPNL00000000052O }      |
| Supplier: Create WeekBasedCapacityGroup                                                                            | BPNS_CUS1 | {A Business Partner Number Site (BPNS) of the company that acts as the business role customer in the context of the test execution}                            |
| Supplier: Create WeekBasedCapacityGroup                                                                            | BPNS_CUS2 | {A Business Partner Number Site (BPNS) of the company that acts as the business role customer in the context of the test execution}                            |
| Supplier: Create WeekBasedCapacityGroup                                                                            | BPNS_CUS3 | {A Business Partner Number Site (BPNS) of the company that acts as the business role customer in the context of the test execution}                            |
| Supplier: Create WeekBasedCapacityGroup                                                                            | BPNS_SUP1 | {Use one of your own Business Partner Number Site (BPNS)}                                                                                                      |
| Supplier: Create WeekBasedCapacityGroup, Supplier: Create IdBasedComment                                           | UUID_CG1  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Supplier: Create WeekBasedCapacityGroup                                                                            | UUID_CG2  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Supplier: Create WeekBasedCapacityGroup                                                                            | UUID_CG3  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Supplier: Create WeekBasedCapacityGroup                                                                            | UUID_CG4  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Supplier: Create IdBasedRequestForUpdate                                                                           | UUID_MD1  | {UUIDv4 of a WeekBasedCapacityGroup, which gets created through the customer}                                                                                  |
| Supplier: Create WeekBasedCapacityGroup                                                                            | STR_LOCA  | {Name of a capacity group, in the context of the base journey the name (not BPNS) of the customer sites that covered by the capacity group is used }           |
| Supplier: Create WeekBasedCapacityGroup                                                                            | STR_LOCB  | {Name of a capacity group, in the context of the base journey the name (not BPNS) of the customer sites that covered by the capacity group is used }           |
| Supplier: Create WeekBasedCapacityGroup                                                                            | STR_LOCC  | {Name of a capacity group, in the context of the base journey the name (not BPNS) of the customer sites that covered by the capacity group is used }           |
| Supplier: Create WeekBasedCapacityGroup                                                                            | STR_LOCD  | {Name of a capacity group, in the context of the base journey the name (not BPNS) of the customer sites that covered by the capacity group is used }           |
| Supplier: Create WeekBasedCapacityGroup, Supplier: Create IdBasedComment                                           | TS_NOW    | {Timestamp that represents the system time when the corresponding aspect model gets created e.g. 2023-11-05T08:15:30.123-05:00}                                |
| Supplier: Create WeekBasedCapacityGroup, Supplier: Create IdBasedRequestForUpdate, Supplier: Create IdBasedComment | OMITTED   | {Special case where you do not include the property in the data at all. You do not even mention it.}                                                           |

```

</details>

### Prepare for base journey

<details>
<summary>This test ensures that the supplier is aware of the sequence of communication and naming conventions within the base journey.</summary>

```cucumber
Feature: Supplier: Prepare yourself
  
Scenario Outline: Prepare for base journey
  Given I want to execute the base journey which uses <object> in <test> to fulfill a certain <function> that I need to be aware of in order to execute my part of the base journey successfully
  When the test gets executed
  Then it should work as intended

Examples:
| object     | function                                                                                           | test                                                                                                                                              |
| MD_alpha   | A WeekBasedMaterialDemand created by the customer and transferred via Filetransfer Alpha           | Consume WeekBasedMaterialDemand for base journey                                                                                                  |
| MD_beta    | A WeekBasedMaterialDemand created by the customer and transferred via Filetransfer Alpha           | Consume WeekBasedMaterialDemand for base journey, Calculation for base journey                                                                    |
| MD_gamma   | A WeekBasedMaterialDemand created by the customer and transferred via Filetransfer Alpha and Theta | Consume WeekBasedMaterialDemand for base journey, Calculation for base journey, Provide IdBasedRequestForUpdate for base journey                  |
| MD_delta   | A WeekBasedMaterialDemand created by the customer and transferred via Filetransfer Beta            | Consume WeekBasedMaterialDemand for base journey                                                                                                  |
| CG_alpha   | A WeekBasedCapacityGroup created by the supplier and transferred via Filetransfer Gamma and Eta    | Create WeekBasedCapacityGroup for base journey, Provide WeekBasedCapacityGroup for base journey, Consume IdBasedRequestForUpdate for base journey |
| CG_beta    | A WeekBasedCapacityGroup created by the supplier and transferred via Filetransfer Gamma            | Create WeekBasedCapacityGroup for base journey, Provide WeekBasedCapacityGroup for base journey, Calculation for base journey                     |
| CG_gamma   | A WeekBasedCapacityGroup created by the supplier and transferred via Filetransfer Delta            | Create WeekBasedCapacityGroup for base journey, Provide WeekBasedCapacityGroup for base journey                                                   |
| CG_delta   | A WeekBasedCapacityGroup created by the supplier and transferred via Filetransfer Delta            | Create WeekBasedCapacityGroup for base journey, Provide WeekBasedCapacityGroup for base journey                                                   |
| RU_alpha   | An IdBasedRequestForUpdate created by the customer and transferred via Filetransfer Epsilon        | Consume IdBasedRequestForUpdate for base journey                                                                                                  |
| RU_beta    | An IdBasedRequestForUpdate created by the supplier and transferred via Filetransfer Zeta           | Create IdBasedRequestForUpdate for base journey, Provide IdBasedRequestForUpdate for base journey                                                 |
| CT_alpha   | An IdBasedComment created by the customer and transferred via Filetransfer Iota                    | Consume IdBasedComment for base journey                                                                                                           |
| CT_beta    | An IdBasedComment created by the customer and transferred via Filetransfer Iota                    | Consume IdBasedComment for base journey                                                                                                           |
| CT_gamma   | An IdBasedComment created by the supplier and transferred via Filetransfer Kappa                   | Create IdBasedComment for base journey, Provide IdBasedComment for base journey                                                                   |
| CT_delta   | An IdBasedComment created by the supplier and transferred via Filetransfer Kappa                   | Create IdBasedComment for base journey, Provide IdBasedComment for base journey                                                                   |
| FT_alpha   | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Consume WeekBasedMaterialDemand for base journey                                                                                                  |
| FT_beta    | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Consume WeekBasedMaterialDemand for base journey                                                                                                  |
| FT_gamma   | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Provide WeekBasedCapacityGroup for base journey                                                                                                   |
| FT_delta   | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Provide WeekBasedCapacityGroup for base journey                                                                                                   |
| FT_epsilon | A Filetransfer providing IdBasedRequestForUpdate for the supplier to consume                       | Consume IdBasedRequestForUpdate for base journey                                                                                                  |
| FT_eta     | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Consume IdBasedRequestForUpdate for base journey                                                                                                  |
| FT_zeta    | A Filetransfer providing IdBasedRequestForUpdate for the customer to consume                       | Provide IdBasedRequestForUpdate for base journey                                                                                                  |
| FT_theta   | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Provide IdBasedRequestForUpdate for base journey                                                                                                  |
| FT_iota    | A Filetransfer providing IdBasedComment for the supplier to consume                                | Consume IdBasedComment for base journey                                                                                                           |
| FT_kappa   | A Filetransfer providing IdBasedComment for the customer to consume                                | Provide IdBasedComment for base journey                                                                                                           |
```

</details>

### Prepare for volatility metrics journey

<details>
<summary>This test ensures that the supplier is aware of the sequence of communication and naming conventions within the volatility metrics journey.</summary>

```cucumber
Feature: Supplier: Prepare yourself
  
Scenario Outline: Prepare for volatility metrics journey
  Given I want to execute the volatility metrics journey which uses <object> in <test> to fulfill a certain <function> that I need to be aware of in order to execute my part of the volatility metrics journey successfully
  When the test gets executed
  Then it should work as intended

Examples:
| object      | function                                                                                   | test                                                                                                                        |
| MD_alpha_v1 | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha   | Consume WeekBasedMaterialDemand for volatility metrics journey                                                              |
| MD_alpha_v2 | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Beta    | Consume Provide WeekBasedMaterialDemand for volatility metrics journey                                                      |
| MD_alpha_v3 | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Delta   | Consume Provide WeekBasedMaterialDemand for volatility metrics journey                                                      |
| MD_alpha_v4 | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Epsilon | Consume Provide WeekBasedMaterialDemand for volatility metrics journey                                                      |
| CG_alpha    | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Gamma    | Create WeekBasedCapacityGroup for volatility metrics journey, Provide WeekBasedCapacityGroup for volatility metrics journey |
| FT_alpha    | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume               | Consume WeekBasedMaterialDemand for volatility metrics journey                                                              |
| FT_beta     | A Filetransfer providing updated WeekBasedMaterialDemand for the supplier to consume       | Consume WeekBasedMaterialDemand for volatility metrics journey                                                              |
| FT_gamma    | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                | Provide WeekBasedCapacityGroup for volatility metrics journey                                                               |
| FT_delta    | A Filetransfer providing updated WeekBasedMaterialDemand for the supplier to consume       | Consume WeekBasedMaterialDemand for volatility metrics journey                                                              |
| FT_epsilon  | A Filetransfer providing updated WeekBasedMaterialDemand for the supplier to consume       | Consume WeekBasedMaterialDemand for volatility metrics journey                                                              |
```

</details>

### Prepare for simulated delta production journey

<details>
<summary>This test ensures that the supplier is aware of the sequence of communication and naming conventions within the simulated delta production journey.</summary>

```cucumber
Feature: Supplier: Prepare yourself
  
Scenario Outline: Prepare for simulated delta production journey
  Given I want to execute the simulated delta production journey which uses <object> in <test> to fulfill a certain <function> that I need to be aware of in order to execute my part of the simulated delta production journey successfully
  When the test gets executed
  Then it should work as intended

Examples:
| object   | function                                                                                 | test                                                                                                                                        |
| MD_alpha | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha | Consume WeekBasedMaterialDemand for simulated delta production journey                                                                      |
| CG_alpha | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Beta   | Create WeekBasedCapacityGroup for simulated delta production journey, Provide WeekBasedCapacityGroup for simulated delta production journey |
| FT_alpha | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume             | Consume WeekBasedMaterialDemand for simulated delta production journey                                                                      |
| FT_beta  | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume              | Provide WeekBasedCapacityGroup for simulated delta production journey                                                                       |
```

</details>

### Prepare for load factors journey

<details>
<summary>This test ensures that the supplier is aware of the sequence of communication and naming conventions within the load factors journey.</summary>

```cucumber
Feature: Supplier: Prepare yourself
  
  Scenario Outline: Prepare for load factors journey
  Given I want to execute the load factors journey which uses <object> in <test> to fulfill a certain <function> that I need to be aware of in order to execute my part of the load factors journey successfully
  When the test gets executed
  Then it should work as intended

Examples:
| object   | function                                                                                 | test                                                                                                          |
| MD_alpha | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha | Consume WeekBasedMaterialDemand for load factor journey                                                       |
| MD_beta  | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha | Consume WeekBasedMaterialDemand for load factor journey                                                       |
| CG_alpha | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Beta   | Create WeekBasedCapacityGroup for load factor journey, Provide WeekBasedCapacityGroup for load factor journey |
| FT_alpha | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume             | Consume WeekBasedMaterialDemand for load factor journey                                                       |
| FT_beta  | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume              | Provide WeekBasedCapacityGroup for load factor journey                                                        |
```

</details>

## Supplier: Consume WeekBasedMaterialDemand

### Consume valid WeekBasedMaterialDemand

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Customer: Consume WeekBasedMaterialDemand

Scenario: Consume valid unknown WeekBasedMaterialDemand
  Given I receive a valid WeekBasedMaterialDemand from my customer with a materialDemandId that is unknown to me
  When I try to consume said WeekBasedMaterialDemand
  Then I should be able to consume it and send my customer a http 201 status message

Scenario: Consume valid known WeekBasedMaterialDemand
  Given I receive a valid WeekBasedMaterialDemand from my customer with a materialDemandId that is already known to me
  When I try to consume said WeekBasedMaterialDemand
  Then I should be able to consume it and send my customer a http 200 status message
```

</details>

### Consume invalid WeekBasedMaterialDemand

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Customer: Consume WeekBasedMaterialDemand

Scenario: Consume invalid WeekBasedMaterialDemand
  Given I receive an invalid WeekBasedMaterialDemand from my customer
  When I try to consume said WeekBasedMaterialDemand
  Then I should not consume it and send my customer a http 400 status message
```

</details>

### Consume WeekBasedMaterialDemand for base journey

<details>
<summary>The supplier receives the previously created WeekBasedMaterialDemands from the customer as two separate data transfers.</summary>

```cucumber
Feature: Supplier: Consume WeekBasedMaterialDemand

Scenario Outline: Consume WeekBasedMaterialDemand for base journey
  Given this is my entry point into the base journey 
  When I try to consume  <testDemand> provided by my customer within <fileTransfer>
  Then I should be able to consume the data and send <http status code> to my customer.

Examples:
| testDemand                | fileTransfer | http status code |
| MD_alpha,MD_beta,MD_gamma | FT_alpha     | 200 OK           |
| MD_delta                  | FT_beta      | 200 OK           |
```

</details>

### Consume WeekBasedMaterialDemand for volatility metrics journey

<details>
<summary>The supplier receives the previously created WeekBasedMaterialDemands from the customer as four separate data transfers.</summary>

```cucumber
Feature: Supplier: Consume WeekBasedMaterialDemand

Scenario Outline: Consume WeekBasedMaterialDemand for volatility metrics journey
  Given this is my entry point into the volatility metrics journey
  When I try to consume  <testDemand> provided by my customer within <fileTransfer>
  Then I should be able to consume the data and send <http status code> to my customer.

Examples:
| testDemand  | fileTransfer | http status code |
| MD_alpha_v1 | FT_alpha     | 200 OK           |
| MD_alpha_v2 | FT_beta      | 200 OK           |
| MD_alpha_v3 | FT_delta     | 200 OK           |
| MD_alpha_v4 | FT_epsilon   | 200 OK           |
```

</details>

### Consume WeekBasedMaterialDemand for simulated delta production journey

<details>
<summary>The supplier receives the previously created WeekBasedMaterialDemand from the customer.</summary>

```cucumber
Feature: Supplier: Consume WeekBasedMaterialDemand

Scenario Outline: Consume WeekBasedMaterialDemand for simulated delta production journey
  Given this is my entry point into the simulated delta production journey
  When I try to consume  <testDemand> provided by my customer within <fileTransfer>
  Then I should be able to consume the data and send <http status code> to my customer.

Examples:
| testDemand | fileTransfer | http status code |
| MD_alpha   | FT_alpha     | 200 OK           |
```

</details>

### Consume WeekBasedMaterialDemand for load factors journey

<details>
<summary>The supplier receives the previously created WeekBasedMaterialDemand from the customer.</summary>

```cucumber
Feature: Supplier: Consume WeekBasedMaterialDemand

Scenario Outline: Consume WeekBasedMaterialDemand for load factors journey
  Given this is my entry point into the load factors journey 
  When I try to consume  <testDemand> provided by my customer within <fileTransfer>
  Then I should be able to consume the data and send <http status code> to my customer.

Examples:
| testDemand        | fileTransfer | http status code |
| MD_alpha, MD_beta | FT_alpha     | 200 OK           |
```

</details>

## Supplier: Create WeekBasedCapacityGroup

### Create valid WeekBasedCapacityGroup

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate valid WeekBasedCapacityGroup
  Given   the value for the property "name"                           is <v_name>                             with a default value of "All my beautiful spark plugs"
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>                  with a default value of "0157ba42-d2a8-4e28-8565-7b07830c1110"
  *       the value for the property "changedAt"                      is <v_changedAt>                        with a default value of "{{TS_NOW}}"
  *       the value for the property "customer"                       is <v_customer>                         with a default value of "{{BPNL_CUS}}"
  *       the value for the property "supplier"                       is <v_supplier>                         with a default value of "{{BPNL_SUP}}"
  *       the value for the property "supplierLocations"              is <v_supplierLocations>                with a default value of "{{BPNS_SUP1}}"
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>          with a default value of "true"
  
  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                    with a default value of "unit:piece"
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>           with a default value of "false"

  *       the value for the property "linkedCapacityGroups"           is <v_linkedCapacityGroups>             with a default value of "be4d8470-2de6-43d2-b5f8-2e5d3eebf3fd"

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <v_materialNumberCustomer>           with a default value of "MNR-7307-AU340474.002"
  *       the value for the property "materialNumberSupplier"         is <v_materialNumberSupplier>           with a default value of "MNR-8101-ID146955.001"
  *       the value for the property "customerLocation"               is <v_customerLocation>                 with a default value of "{{BPNS_CUS1}}"
  *       the value for the property "demandCategoryCode"             is <v_demandCategoryCode>               with a default value of "0001"
  *       the value for the property "loadFactor"                     is <v_loadFactor>                       with a default value of "3.5"

  *       the value for the property "capacities"                     contains entities  
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>                   with a default value of "1000"
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>                   with a default value of "1800"
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>                  with a default value of "2000"
  *       the value for the property "deltaProductionResult"          is <v_deltaProductionResult>            with a default value of "400"
  *       the value for the property "pointInTime"                    is <v_pointInTime>                      with a default value of "2022-08-01"

  *       the value for the property "demandVolatilityParameters"     contains entities
  *       the value for the property "startReferenceDateTime"         is <v_startReferenceDateTime>           with a default value of "2024-01-10T12:00:00.320Z"
  *       the value for the property "measurementInterval"            is <v_measurementInterval>              with a default value of "4"
  *       the value for the property "rollingHorizonAlertThresholds"  contains entities
  *       the value for the property "sequenceNumber"                 is <v_sequenceNumber>                   with a default value of "1"
  *       the value for the property "subhorizonLength"               is <v_subhorizonLength>                 with a default value of "4"
  *       the value for the property "relativePositiveDeviation"      is <v_relativePositiveDeviation>        with a default value of "0.2"
  *       the value for the property "relativeNegativeDeviation"      is <v_relativeNegativeDeviation>        with a default value of "0.3"
  *       the value for the property "absolutePositiveDeviation"      is <v_absolutePositiveDeviation>        with a default value of "100.0"
  *       the value for the property "absoluteNegativeDeviation"      is <v_absoluteNegativeDeviation>        with a default value of "100.0"
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should generate the WeekBasedCapacityGroup

Examples:
| v_name                            | v_capacityGroupId | v_changedAt                     | v_customer | v_supplier | v_supplierLocations | v_capacityGroupIsInactive | v_unitOfMeasure            | v_unitOfMeasureIsOmitted | v_linkedCapacityGroups | v_materialNumberCustomer          | v_materialNumberSupplier          | v_customerLocation | v_demandCategoryCode | v_loadFactor     | v_actualCapacity | v_agreedCapacity | v_maximumCapacity | v_deltaProductionResult | v_pointInTime | v_startReferenceDateTime        | v_measurementInterval | v_sequenceNumber | v_subhorizonLength | v_relativePositiveDeviation | v_relativeNegativeDeviation | v_absolutePositiveDeviation | v_absoluteNegativeDeviation |
| @!"§$%&/()=?`;:_-.,'*+#~><²³][}{´ |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
| コンニチハ                         |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
| Καλημέρα κόσμε                    |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
| Hello World                       |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   | 2000-01-01T14:23:00.66372+14:00 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     | true                      |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     | false                     |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:gram                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:kilogram              |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:tonneMetricTon        |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:tonUsOrShortTonUkorus |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:ounceAvoirdupois      |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:pound                 |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:centimetre            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:metre                 |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:kilometre             |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:inch                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:foot                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:yard                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:squareCentimetre      |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:squareMetre           |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:squareInch            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:squareFoot            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:squareYard            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cubicCentimetre       |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cubicMetre            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cubicInch             |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cubicFoot             |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cubicYard             |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:millilitre            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:litre                 |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:hectolitre            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:piece                 |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:set                   |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:pair                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:page                  |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:kilowattHour          |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:secondUnitOfTime      |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:minuteUnitOfTime      |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:hourUnitOfTime        |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | unit:cycle                 |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           | {{OMITTED}}                | true                     |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            | false                    |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        | @!"§$%&/()=?`;:_-.,'*+#~><²³][}{´ |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        | コンニチハ                         |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        | Καλημέρα κόσμε                    |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        | Hello World                       |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   | @!"§$%&/()=?`;:_-.,'*+#~><²³][}{´ |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   | コンニチハ                         |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   | Καλημέρα κόσμε                    |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   | Hello World                       |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | SR99                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | ED01                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | A1S1                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | OI01                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | OS01                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | PI01                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | PO01                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    | 0001                 |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      | 999999999999.999 |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      | 4.4              |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      | 0.5              |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  | 0                |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  | 4.4              |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  | 10000            |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  | 999999999999.999 |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  | 0                |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  | 4.4              |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  | 10000            |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  | 999999999999.999 |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  | 0                 |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  | 4.4               |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  | 10000             |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  | 999999999999.999  |                         |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   | 0                       |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   | 4.4                     |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   | 10000                   |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   | 999999999999.999        |               |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         | 2024-09-02    |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         | 1930-01-06    |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         | 2119-12-25    |                                 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               | 2000-01-01T14:23:00.66372+14:00 |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               | 2000-01-01T14:23:00.66372       |                       |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 | 1                     |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 | 999                   |                  |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       | 1                |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       | 999              |                    |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  | 1                  |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  | 999                |                             |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    | 0                           |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    | 0.5                         |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    | 1                           |                             |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             | 0                           |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             | 0.5                         |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             | 1                           |                             |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             | 999999999999.999            |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             | 4.4                         |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             | 0                           |                             |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             | 999999999999.999            |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             | 4.4                         |
|                                   |                   |                                 |            |            |                     |                           |                            |                          |                        |                                   |                                   |                    |                      |                  |                  |                  |                   |                         |               |                                 |                       |                  |                    |                             |                             |                             | 0                           |
```

</details>

### Create invalid WeekBasedCapacityGroup

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate invalid WeekBasedCapacityGroup
  Given   the value for the property "name"                           is <v_name>                             with a default value of "All my beautiful spark plugs"
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>                  with a default value of "0157ba42-d2a8-4e28-8565-7b07830c1110"
  *       the value for the property "changedAt"                      is <v_changedAt>                        with a default value of "{{TS_NOW}}"
  *       the value for the property "customer"                       is <v_customer>                         with a default value of "{{BPNL_CUS}}"
  *       the value for the property "supplier"                       is <v_supplier>                         with a default value of "{{BPNL_SUP}}"
  *       the value for the property "supplierLocations"              is <v_supplierLocations>                with a default value of "{{BPNS_SUP1}}"
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>          with a default value of "true"
  
  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                    with a default value of "unit:piece"
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>           with a default value of "false"

  *       the value for the property "linkedCapacityGroups"           is <v_linkedCapacityGroups>             with a default value of "be4d8470-2de6-43d2-b5f8-2e5d3eebf3fd"

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <v_materialNumberCustomer>           with a default value of "MNR-7307-AU340474.002"
  *       the value for the property "materialNumberSupplier"         is <v_materialNumberSupplier>           with a default value of "MNR-8101-ID146955.001"
  *       the value for the property "customerLocation"               is <v_customerLocation>                 with a default value of "{{BPNS_CUS1}}"
  *       the value for the property "demandCategoryCode"             is <v_demandCategoryCode>               with a default value of "0001"
  *       the value for the property "loadFactor"                     is <v_loadFactor>                       with a default value of "3.5"

  *       the value for the property "capacities"                     contains exactly one entity "Capacity"  
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>                   with a default value of "1000"
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>                   with a default value of "1800"
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>                  with a default value of "2000"
  *       the value for the property "deltaProductionResult"          is <v_deltaProductionResult>            with a default value of "400"
  *       the value for the property "pointInTime"                    is <v_pointInTime>                      with a default value of "2022-08-01"

  *       the value for the property "demandVolatilityParameters"     contains entities
  *       the value for the property "startReferenceDateTime"         is <v_startReferenceDateTime>           with a default value of "2024-01-10T12:00:00.320Z"
  *       the value for the property "measurementInterval"            is <v_measurementInterval>              with a default value of "4"
  *       the value for the property "rollingHorizonAlertThresholds"  contains entities
  *       the value for the property "sequenceNumber"                 is <v_sequenceNumber>                   with a default value of "1"
  *       the value for the property "subhorizonLength"               is <v_subhorizonLength>                 with a default value of "4"
  *       the value for the property "relativePositiveDeviation"      is <v_relativePositiveDeviation>        with a default value of "0.2"
  *       the value for the property "relativeNegativeDeviation"      is <v_relativeNegativeDeviation>        with a default value of "0.3"
  *       the value for the property "absolutePositiveDeviation"      is <v_absolutePositiveDeviation>        with a default value of "100.0"
  *       the value for the property "absoluteNegativeDeviation"      is <v_absoluteNegativeDeviation>        with a default value of "100.0"
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should NOT generate the WeekBasedCapacityGroup and throw an <error> instead

Examples:
| v_name | v_capacityGroupId                    | v_changedAt            | v_customer         | v_supplier         | v_supplierLocations | v_capacityGroupIsInactive | v_unitOfMeasure | v_unitOfMeasureIsOmitted | v_linkedCapacityGroups               | v_materialNumberCustomer | v_materialNumberSupplier | v_customerLocation | v_demandCategoryCode | v_loadFactor          | v_actualCapacity       | v_agreedCapacity       | v_maximumCapacity      | v_deltaProductionResult | v_pointInTime | v_startReferenceDateTime | v_measurementInterval  | v_sequenceNumber       | v_subhorizonLength     | v_relativePositiveDeviation | v_relativeNegativeDeviation | v_absolutePositiveDeviation | v_absoluteNegativeDeviation | error                                                   |
|        | b90ae365-3866-9971-9004b1b1d003      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: capacityGroupId           |
|        | d01bfdc9-b599-4d2a-8817-6174c3095381 |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: capacityGroupId           |
|        |                                      | This is not a datetime |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: changedAt                 |
|        |                                      |                        | This is not a BPNL |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: customer                  |
|        |                                      |                        |                    | This is not a BPNL |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: supplier                  |
|        |                                      |                        |                    |                    | This is not a BPNS  |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: supplierLocations         |
|        |                                      |                        |                    |                    |                     | maybe                     |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: capacityGroupIsInactive   |
|        |                                      |                        |                    |                    |                     |                           | unit:decagram   |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: unitOfMeasure             |
|        |                                      |                        |                    |                    |                     |                           |                 | maybe                    |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: unitOfMeasureIsOmitted    |
|        |                                      |                        |                    |                    |                     |                           |                 |                          | d01bfdc9-b599-4d2a-8817-6174c3095381 |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: linkedCapacityGroups      |
|        |                                      |                        |                    |                    |                     |                           |                 |                          | b90ae365-3866-9971-9004b1b1d003      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: linkedCapacityGroups      |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          | This is not a BPNS |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: customerLocation          |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    | 0O01                 |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: demandCategoryCode        |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    | 01OI                 |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: demandCategoryCode        |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    | Default              |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: demandCategoryCode        |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      | -1                    |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: loadFactor                |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      | 1,1                   |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: loadFactor                |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      | This is not a decimal |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: loadFactor                |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       | 9999999999999999999999 |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: actualCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       | 5,5                    |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: actualCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       | -1                     |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: actualCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        | 9999999999999999999999 |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: agreedCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        | 5,5                    |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: agreedCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        | -1                     |                        |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: agreedCapacity            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        | 9999999999999999999999 |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: maximumCapacity           |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        | 5,5                    |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: maximumCapacity           |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        | -1                     |                         |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: maximumCapacity           |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        | This is not a decimal   |               |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: deltaProductionResult     |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         | 2022-04-22    |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: pointInTime               |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         | 22.04.2021    |                          |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: pointInTime               |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               | 2023-02-29T12:00:00.320Z |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: startReferenceDateTime    |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               | This is not a datetime   |                        |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: startReferenceDateTime    |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          | This is not an integer |                        |                        |                             |                             |                             |                             | AspectModel Conformity Error: measurementInterval       |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          | 2.3                    | 5.5                    |                        |                             |                             |                             |                             | AspectModel Conformity Error: measurementInterval       |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        | This is not an integer |                        |                             |                             |                             |                             | AspectModel Conformity Error: sequenceNumber            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        | 4.6                    |                             |                             |                             |                             | AspectModel Conformity Error: sequenceNumber            |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        | This is not an integer |                             |                             |                             |                             | AspectModel Conformity Error: subhorizonLength          |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        | 2                           |                             |                             |                             | AspectModel Conformity Error: absoluteNegativeDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        | -0.1                        |                             |                             |                             | AspectModel Conformity Error: relativePositiveDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        | This is not a decimal       |                             |                             |                             | AspectModel Conformity Error: relativePositiveDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             | -0.2                        |                             |                             | AspectModel Conformity Error: absolutePositiveDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             | 2                           |                             |                             | AspectModel Conformity Error: relativeNegativeDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             | This is not a decimal       |                             |                             | AspectModel Conformity Error: relativeNegativeDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             | 200-01-0                    |                             |                             | AspectModel Conformity Error: relativeNegativeDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             | -1.1                        |                             | AspectModel Conformity Error: relativePositiveDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             | This is not a decimal       |                             | AspectModel Conformity Error: absolutePositiveDeviation |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             | -100                        | AspectModel Conformity Error: subhorizonLength          |
|        |                                      |                        |                    |                    |                     |                           |                 |                          |                                      |                          |                          |                    |                      |                       |                        |                        |                        |                         |               |                          |                        |                        |                        |                             |                             |                             | This is not a decimal       | AspectModel Conformity Error: absoluteNegativeDeviation |
```

</details>

### Create WeekBasedCapacityGroup for base journey

<details>
<summary>The supplier creates four WeekBasedCapacityGroup used by the base journey.</summary>

```cucumber
Feature: Customer: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate WeekBasedCapacityGroup for base journey using different <v_tests>
  Given   the value for the property "name"                           is <v_name>                             
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>                  
  *       the value for the property "changedAt"                      is <v_changedAt>                        
  *       the value for the property "customer"                       is <v_customer>                         
  *       the value for the property "supplier"                       is <v_supplier>                                       
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>          
  
  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                    
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>           

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <1_materialNumberCustomer>  for the first   entity "LinkedDemandSeries"            
  *       the value for the property "customerLocation"               is <1_customerLocation>        for the first   entity "LinkedDemandSeries"    
  *       the value for the property "demandCategoryCode"             is <1_demandCategoryCode>      for the first   entity "LinkedDemandSeries"                       

  *       the value for the property "capacities"                     contains entities 
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>                   
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>                   
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>                  
  *       the value for the property "deltaProductionResult"          is <v_deltaProductionResult>            
  *       the value for the property "pointInTime"                    is <v_pointInTime>     
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should generate the WeekBasedCapacityGroup

Examples:
| v_tests | v_name       | v_capacityGroupId | v_changedAt | v_customer   | v_supplier   | v_capacityGroupIsInactive | v_unitOfMeasure | v_unitOfMeasureIsOmitted | 1_materialNumberCustomer                     | 1_customerLocation           | 1_demandCategory | v_actualCapacity                                                                               | v_agreedCapacity                                                                                    | v_maximumCapacity                                                                                   | v_pointInTime                                                                                                                                                                                                               |
| alpha   | {{STR_LOCA}} | {{UUID_CG1}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | false                     | unit:pieces     | false                    | MNR-8540-CH063329.001                        | {{BPNS_CUS1}}                | 0001             | 220,209,209,220,209,245,250,0,240,250,245,242,220,209,198,220,109,198,209,220                  | 300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300                     | 250,250,250,250,250,250,250,0,250,250,250,250,250,250,250,250,250,250,250,250                       | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 |
| beta    | {{STR_LOCB}} | {{UUID_CG2}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | false                     | unit:kilogram   | false                    | MNR-8549-CH706214.023, MNR-8549-CH706214.023 | {{BPNS_CUS2}}, {{BPNS_CUS2}} | A1S1,PI01        | 690,345,690,575,690,690,460,690,0,805,805,780,900,900,805,805,900,690,1150                     | 800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800                     | 900,900,900,900,900,900,900,900,0,900,900,900,900,910,950,900,900,1000,900,1150                     | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 |
| gamma   | {{STR_LOCC}} | {{UUID_CG3}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | false                     | unit:liters     | false                    | MNR-8538-CH809974.001                        | {{BPNS_CUS3}}                | PO01             | 3790,3790,3890,3890,2020,2020,2310,2310,3690,0,3500,3500,1820,1820,3450,3450,3010,3010,550,550 | 4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000 | 3790,3790,3890,3890,3530,3530,3530,3910,3910,3910,3910,3910,3910,3910,3450,3450,3010,3010,2580,2580 | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 |
| delta   | {{STR_LOCD}} | {{UUID_CG4}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | false                     | unit:kilogram   | false                    | {{OMITTED}}                                  | {{OMITTED}}                  | {{OMITTED}}      | 690,345,690,575,690,690,460,690,0,805,805,780,900,900,805,805,900,690,1150                     | 800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800                     | 900,900,900,900,900,900,900,900,0,900,900,900,900,910,950,900,900,1000,900,1150                     | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 |
```

</details>

### Create WeekBasedCapacityGroup for volatility metrics journey

<details>
<summary>The supplier creates one WeekBasedCapacityGroup used by the volatility metrics journey.</summary>

```cucumber
Feature: Customer: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate WeekBasedCapacityGroup for volatility metrics journey using different <v_tests>
  Given   the value for the property "name"                           is <v_name>
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>
  *       the value for the property "changedAt"                      is <v_changedAt>
  *       the value for the property "customer"                       is <v_customer>
  *       the value for the property "supplier"                       is <v_supplier>
  *       the value for the property "supplierLocations"              is <v_supplierLocations>
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>

  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <1_materialNumberCustomer>   for the first   entity "LinkedDemandSeries"
  *       the value for the property "customerLocation"               is <1_customerLocation>         for the first   entity "LinkedDemandSeries"
  *       the value for the property "demandCategoryCode"             is <1_demandCategoryCode>       for the first   entity "LinkedDemandSeries"
  
  *       the value for the property "capacities"                     contains entities
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>
  *       the value for the property "pointInTime"                    is <v_pointInTime>

  *       the value for the property "demandVolatilityParameters"     contains entities
  *       the value for the property "startReferenceDateTime"         is <v_startReferenceDateTime>
  *       the value for the property "measurementInterval"            is <v_measurementInterval>
  *       the value for the property "rollingHorizonAlertThresholds"  contains entities
  *       the value for the property "sequenceNumber"                 is <v_sequenceNumber>
  *       the value for the property "subhorizonLength"               is <v_subhorizonLength> 
  *       the value for the property "absolutePositiveDeviation"      is <v_absolutePositiveDeviation>
  *       the value for the property "absoluteNegativeDeviation"      is <v_absoluteNegativeDeviation>
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should generate the WeekBasedCapacityGroup

Examples:
| v_tests  | v_name            | v_capacityGroupId | v_changedAt | v_customer   | v_supplier   | v_supplierLocations | v_capacityGroupIsInactive | v_unitOfMeasure | v_unitOfMeasureIsOmitted | 1_materialNumberCustomer | 1_customerLocation | 1_demandCategoryCode | v_actualCapacity                  | v_agreedCapacity                    | v_maximumCapacity                        | v_pointInTime                                                                                                 | v_startReferenceDateTime | v_measurementInterval | v_sequenceNumber | v_subhorizonLength | v_absolutePositiveDeviation | v_absoluteNegativeDeviation |
| CG_alpha | Volatility Tester | {{TS_NOW}}        | UUID_CG1    | {{BPNL_CUS}} | {{BPNL_SUP}} | {{BPNS_SUP1}}       | false                     | unit:pieces     | false                    | MNR-8540-CH063329.001    | {{BPNS_CUS1}}      | 0001                 | 80,80,90,90,90,90,100,100,100,100 | 100,100,95,95,95,95,150,150,150,150 | 100,100,100,100,100,100,100,100,100,100 | 2026-05-11,2026-05-18,2026-05-25,2026-06-01,2026-06-08,2026-06-15,2026-06-22,2026-06-29,2026-07-06,2026-07-13 | {{TS_NOW}}               | 1                     | 1,2,3            | 2,4,4              | 0,10,20                     | 0,10,20                     |
```

</details>

### Create WeekBasedCapacityGroup for simulated delta production journey

<details>
<summary>The supplier creates one WeekBasedCapacityGroup used by the simulated delta production journey.</summary>

```cucumber
Feature: Customer: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate WeekBasedCapacityGroup for simulated delta production journey using different <v_tests>
  Given   the value for the property "name"                           is <v_name>
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>
  *       the value for the property "changedAt"                      is <v_changedAt>
  *       the value for the property "customer"                       is <v_customer>
  *       the value for the property "supplier"                       is <v_supplier>
  *       the value for the property "supplierLocations"              is <v_supplierLocations>
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>

  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <1_materialNumberCustomer>   for the first   entity "LinkedDemandSeries"
  *       the value for the property "customerLocation"               is <1_customerLocation>         for the first   entity "LinkedDemandSeries"
  *       the value for the property "demandCategoryCode"             is <1_demandCategoryCode>       for the first   entity "LinkedDemandSeries"
  
  *       the value for the property "capacities"                     contains entities
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>
  *       the value for the property "deltaProductionResult"          is <v_deltaProductionResult>
  *       the value for the property "pointInTime"                    is <v_pointInTime>
 
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should generate the WeekBasedCapacityGroup

Examples:
| v_tests  | v_name              | v_capacityGroupId | v_changedAt | v_customer   | v_supplier   | v_supplierLocations | v_capacityGroupIsInactive | v_unitOfMeasure | v_unitOfMeasureIsOmitted | 1_materialNumberCustomer | 1_customerLocation | 1_demandCategoryCode | v_actualCapacity                        | v_agreedCapacity                        | v_maximumCapacity                  | v_deltaProductionResult                 | v_pointInTime                                                                                                 |
| CG_alpha | DeltaProductionTest | {{UUID_ID1}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | {{BPNS_SUP1}}       | false                     | units:pieces    | false                    | MNR-8540-CH063329.001    | {{BPNS_CUS1}}      | 0001                 | 100,100,100,100,100,100,100,100,100,100 | 100,100,100,100,100,100,100,100,100,100 | 40, 40, -80, 50, -50, 0,0,0,-20,20 | 100,100,100,100,100,100,100,100,100,100 | 2026-05-11,2026-05-18,2026-05-25,2026-06-01,2026-06-08,2026-06-15,2026-06-22,2026-06-29,2026-07-06,2026-07-13 |
```

</details>

### Create WeekBasedCapacityGroup for load factors journey

<details>
<summary>The supplier creates one WeekBasedCapacityGroup used by the load factors journey.</summary>

```cucumber
Feature: Customer: Create WeekBasedCapacityGroup

Scenario Outline: Try to generate WeekBasedCapacityGroup for load factors journey using different <v_tests>
  Given   the value for the property "name"                           is <v_name>
  *       the value for the property "capacityGroupId"                is <v_capacityGroupId>
  *       the value for the property "changedAt"                      is <v_changedAt>
  *       the value for the property "customer"                       is <v_customer>
  *       the value for the property "supplier"                       is <v_supplier>
  *       the value for the property "capacityGroupIsInactive"        is <v_capacityGroupIsInactive>

  *       the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>

  *       the value for the property "linkedDemandSeries"             contains entities
  *       the value for the property "materialNumberCustomer"         is <1_materialNumberCustomer>   for the first   entity "LinkedDemandSeries"
  *       the value for the property "customerLocation"               is <1_customerLocation>         for the first   entity "LinkedDemandSeries"
  *       the value for the property "demandCategoryCode"             is <1_demandCategoryCode>       for the first   entity "LinkedDemandSeries"
  *       the value for the property "loadFactor"                     is <1_loadFactor>               for the first   entity "LinkedDemandSeries"
  *       the value for the property "materialNumberCustomer"         is <2_materialNumberCustomer>   for the second  entity "LinkedDemandSeries"
  *       the value for the property "customerLocation"               is <2_customerLocation>         for the second  entity "LinkedDemandSeries"
  *       the value for the property "demandCategoryCode"             is <2_demandCategoryCode>       for the second  entity "LinkedDemandSeries"
  *       the value for the property "loadFactor"                     is <2_loadFactor>               for the second  entity "LinkedDemandSeries"

  *       the value for the property "capacities"                     contains entities
  *       the value for the property "actualCapacity"                 is <v_actualCapacity>
  *       the value for the property "agreedCapacity"                 is <v_agreedCapacity>
  *       the value for the property "maximumCapacity"                is <v_maximumCapacity>
  *       the value for the property "deltaProductionResult"          is <v_deltaProductionResult>
  *       the value for the property "pointInTime"                    is <v_pointInTime>                           
  When the application tries to generate the WeekBasedCapacityGroup
  Then it should generate the WeekBasedCapacityGroup

Examples:
| v_tests | v_name              | v_capacityGroupId | v_changedAt | v_customer   | v_supplier   | v_capacityGroupIsInactive | v_unitOfMeasure | v_unitOfMeasureIsOmitted | 1_materialNumberCustomer | 1_customerLocation | 1_demandCategoryCode | 1_loadFactor | 2_materialNumberCustomer | 2_customerLocation | 2_demandCategoryCode | 2_loadFactor | v_actualCapacity                        | v_agreedCapacity                        | v_maximumCapacity                       | v_deltaProductionResult | v_pointInTime                                                                                                 |
| alpha   | LoadFactorTestGroup | {{UUID_ID1}}      | {{TS_NOW}}  | {{BPNL_CUS}} | {{BPNL_SUP}} | false                     | unit:cycles     | false                    | MNR-8540-CH063329.001    | {{BPNS_CUS1}}      | 0001                 | 1            | MNR-8549-CH706214.023    | {{BPNS_CUS1}}      | A1S1                 | 2            | 200,200,200,200,200,200,200,200,200,200 | 200,200,200,200,200,200,200,200,200,200 | 225,225,225,225,225,225,225,225,225,225 | 0,0,0,0,0,0,0,0,0,0     | 2024-08-05,2026-05-18,2026-05-25,2026-06-01,2026-06-08,2026-06-15,2026-06-22,2026-06-29,2026-07-06,2026-07-13 |
```

</details>

## Supplier: Provide WeekBasedCapacityGroup

### Provide valid WeekBasedCapacityGroup

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario: Provide valid new WeekBasedCapacityGroup
  Given the capacityGroupId of the WeekBasedCapacityGroup is unknown to my customer
  When I try to provide my customer with said WeekBasedCapacityGroup
  Then I should get an http 201 status message

Scenario: Provide valid existing WeekBasedCapacityGroup
  Given the capacityGroupId of the WeekBasedCapacityGroup is already known to my customer
  When I try to provide my customer with said WeekBasedCapacityGroup
  Then I should get an http 200 status message
```

</details>

### Provide invalid WeekBasedCapacityGroup

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario: Provide invalid WeekBasedCapacityGroup
  Given I accidentally created an invalid WeekBasedCapacityGroup
  When I try to provide my customer with said WeekBasedCapacityGroup
  Then I should get an http 400 status message
```

</details>

### Provide WeekBasedCapacityGroup for base journey

<details>
<summary>The supplier sends the previously created WeekBasedCapacityGroups to the customer as two separate data transfers.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario Outline: Provide WeekBasedCapacityGroup for base journey
  Given I have successfully created capacity groups alpha, beta, gamma and delta as described in Create WeekBasedCapacityGroup for base journey
  When I try to provide my customer with <testCapacityGroup> as <fileTransfer>
  Then I should get <http status code> from my customer.

Examples:
| testCapacityGroup  | fileTransfer | http status code |
| CG_alpha, CG_beta  | FT_gamma     | 200 OK           |
| CG_gamma, CG_delta | FT_delta     | 200 OK           |

```

</details>

### Provide WeekBasedCapacityGroup for volatility metrics journey

<details>
<summary>The supplier sends the previously created WeekBasedCapacityGroups to the customer.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario Outline: Provide WeekBasedCapacityGroup for volatility metrics journey
  Given I have successfully created capacity group alpha as described in Create WeekBasedCapacityGroup for volatility metrics journey
  When I try to provide my customer with <testCapacityGroup> as <fileTransfer>
  Then I should get <http status code> from my customer.

Examples:
| testCapacityGroup | fileTransfer | http status code |
| CG_alpha          | FT_gamma     | 200 OK           |
```

</details>

### Provide WeekBasedCapacityGroup for simulated delta production journey

<details>
<summary>The supplier sends the previously created WeekBasedCapacityGroups to the customer.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario Outline: Provide WeekBasedCapacityGroup for simulated delta production journey
  Given I have successfully created capacity group alpha as described in Create WeekBasedCapacityGroup for simulated delta production journey
  When I try to provide my customer with <testCapacityGroup> as <fileTransfer>
  Then I should get <http status code> from my customer.

Examples:
| testCapacityGroup | fileTransfer | http status code |
| CG_alpha          | FT_beta      | 200 OK           |
```

</details>

### Provide WeekBasedCapacityGroup for load factors journey

<details>
<summary>The supplier sends the previously created WeekBasedCapacityGroups to the customer.</summary>

```cucumber
Feature: Supplier: Provide WeekBasedCapacityGroup

Scenario Outline: Provide WeekBasedCapacityGroup for load factors journey
  Given I have successfully created capacity group alpha as described in Create WeekBasedCapacityGroup for load factors journey
  When I try to provide my customer with <testCapacityGroup> as <fileTransfer>
  Then I should get <http status code> from my customer.

Examples:
| testCapacityGroup | fileTransfer | http status code |
| CG_alpha          | FT_beta      | 200 OK           |
```

</details>

## Supplier: Visualize CapacityGroup together with MaterialDemand

### Bottleneck calculation

<details>
<summary>This test checks the basic implementation of the GUI.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Bottleneck calculation
  Given I have created a WeekBasedCapacityGroup
  *     I have consumed at least one WeekBasedMaterialDemand linked by the WeekBasedCapacityGroup
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color  | result     |
| demand > actual capacity = maximum capacity | red    | bottleneck |
| actual capacity < demand = maximum capacity | orange | bottleneck |
| actual capacity < demand < maximum capacity | orange | bottleneck |
| actual capacity < maximum capacity < demand | red    | bottleneck |
```

</details>

### Surplus calculation

<details>
<summary>This test checks the basic implementation of the GUI.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Bottleneck calculation
  Given I have created a WeekBasedCapacityGroup
  *     I have consumed at least one WeekBasedMaterialDemand linked by the WeekBasedCapacityGroup
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color | result  |
| demand < actual capacity = maximum capacity | green | surplus |
| demand < actual capacity < maximum capacity | green | surplus |
```

</details>

### Zero deviation calculation

<details>
<summary>This test checks the basic implementation of the GUI.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Bottleneck calculation
  Given I have created a WeekBasedCapacityGroup
  *     I have consumed at least one WeekBasedMaterialDemand linked by the WeekBasedCapacityGroup
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color | result         |
| demand = actual capacity = maximum capacity | green | zero deviation |
| demand = actual capacity < maximum capacity | green | zero deviation |
```

</details>

### Calculation for base journey

<details>
<summary>The supplier compares the demand data, received from the customer, to the capacity data, sent to the customer.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Calculation for base journey
  Given    I have successfully consumed <WeekBasedMaterialDemand>
  *        I have successfully created <WeekBasedCapacityGroup>
  When     I compare demand and capacity data for <WeekBasedCapacityGroup>
  Then     I should get <result> for <week> in <year>

Examples:
| WeekBasedCapacityGroup | WeekBasedMaterialDemand | week | year | result         | case                                        | color  |
| CG_beta                | MD_beta, MD_gamma       | 09   | 2026 | bottleneck     | Demand > actual capacity = maximum capacity | red    |
| CG_beta                | MD_beta, MD_gamma       | 18   | 2026 | bottleneck     | Actual capacity < demand = maximum capacity | orange |
| CG_beta                | MD_beta, MD_gamma       | 12   | 2026 | bottleneck     | Actual capacity < demand < maximum capacity | orange |
| CG_beta                | MD_beta, MD_gamma       | 15   | 2026 | bottleneck     | Actual capacity < maximum capacity < demand | red    |
| CG_beta                | MD_beta, MD_gamma       | 20   | 2026 | surplus        | Demand < actual capacity = maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 01   | 2026 | surplus        | Demand < actual capacity < maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 13   | 2026 | zero deviation | Demand = actual capacity = maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 14   | 2026 | zero deviation | Demand = actual capacity < maximum capacity | green  |
```

</details>

### Calculation for volatility metrics journey

<details>
<summary>The supplier compares the demand data, received from the customer, to the capacity data, sent to the customer. This triggers multiple volatility alerts.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Calculation for volatility metrics journey
  Given    I have successfully consumed <WeekBasedMaterialDemand>
  *        I have successfully created <WeekBasedCapacityGroup>
  *        <MostRecentMaterialDemands> are the basis for the comparison within the GUI
  When     I compare demand and capacity data for <WeekBasedCapacityGroup>
  Then     I should get <volatility alert> for <week> in <year>

Examples:
| WeekBasedCapacityGroup | WeekBasedMaterialDemand                            | MostRecentMaterialDemand | week   | year | volatility alert                     |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2                           | MD_alpha_v1, MD_alpha_v2 | 21, 27 | 2026 | absolute negative deviation exceeded |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2                           | MD_alpha_v1, MD_alpha_v2 | 24,26  | 2026 | absolute positive deviation exceeded |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2, MD_alpha_v3              | MD_alpha_v2, MD_alpha_v3 | 25, 28 | 2026 | absolute negative deviation exceeded |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2, MD_alpha_v3              | MD_alpha_v2, MD_alpha_v3 | 20     | 2026 | absolute positive deviation exceeded |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2, MD_alpha_v3, MD_alpha_v4 | MD_alpha_v3, MD_alpha_v4 | 24     | 2026 | absolute negative deviation exceeded |
| CG_alpha               | MD_alpha_v1, MD_alpha_v2, MD_alpha_v3, MD_alpha_v4 | MD_alpha_v3, MD_alpha_v4 | 23, 28 | 2026 | absolute positive deviation exceeded |
```

</details>

### Calculation for simulated delta production journey

<details>
<summary>The supplier compares the demand data, sent to the supplier, to the capacity data, received from the supplier. This comparison takes deltaProductionResult into account.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Calculation for simulated delta production journey
  Given    I have successfully consumed <WeekBasedMaterialDemand>
  *        I have successfully created <WeekBasedCapacityGroup>
  When     I compare demand and capacity data for <WeekBasedCapacityGroup>
  Then     I should get <result> for <week> in <year> after considering deltaProductionResult

Examples:
| WeekBasedCapacityGroup | WeekBasedMaterialDemand | week              | year | result         | case                                                                  | color |
| CG_alpha               | MD_alpha                | 29                | 2026 | surplus        | (demand + deltaProductionResult) < actual capacity = maximum capacity | green |
| CG_alpha               | MD_alpha                | 20,21,22,23,24,28 | 2026 | zero deviation | (demand + deltaProductionResult) = actual capacity = maximum capacity | green |
```

</details>

### Calculation for load factors journey

<details>
<summary>The supplier compares the demand data, sent to the supplier, to the capacity data, received from the supplier. This comparison takes load factors into account.</summary>

```cucumber
Feature: Supplier: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Calculation for load factors journey
  Given    I have successfully consumed <WeekBasedMaterialDemand>
  *        I have successfully created <WeekBasedCapacityGroup>
  When     I compare demand and capacity data for <WeekBasedCapacityGroup>
  Then     I should see <UI demand> that differs from <data demand> for <week> in <year>.
  *        I should see <capacity data and UI unit of measure> that differs from <demand data unit of measure>.

Examples:
| WeekBasedCapacityGroup | WeekBasedMaterialDemand | week | year | UI demand | data demand | capacity data and UI unit of measure | demand data unit of measure |
| CG_alpha               | MD_alpha                | 32   | 2024 | 80        | 80          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 21   | 2026 | 50        | 50          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 22   | 2026 | 100       | 100         | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 23   | 2026 | 75        | 75          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 24   | 2026 | 60        | 60          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 25   | 2026 | 90        | 90          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 26   | 2026 | 20        | 20          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 27   | 2026 | 110       | 110         | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 28   | 2026 | 225       | 225         | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_alpha                | 29   | 2026 | 0         | 0           | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 32   | 2024 | 140       | 70          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 21   | 2026 | 200       | 100         | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 22   | 2026 | 100       | 50          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 23   | 2026 | 150       | 75          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 24   | 2026 | 180       | 90          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 25   | 2026 | 120       | 60          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 26   | 2026 | 260       | 130         | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 27   | 2026 | 80        | 40          | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 28   | 2026 | 0         | 0           | unit:cycles                          | unit:pieces                 |
| CG_alpha               | MD_beta                 | 29   | 2026 | 220       | 110         | unit:cycles                          | unit:pieces                 |
```

</details>

## Supplier: Create IdBasedRequestForUpdate

### Create valid IdBasedRequestForUpdate

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create IdBasedRequestForUpdate

Scenario Outline: Try to generate valid IdBasedRequestForUpdate
  Given   the value for the property "weekBasedMaterialDemand"        is <v_weekBasedMaterialDemand>
  *       "weekBasedMaterialDemand"                                   is a list with properties "changedAt" and "materialDemandId"
  *       the value for the property "weekBasedCapacityGroup"         is <v_weekBasedCapacityGroup>
  *       "weekBasedCapacityGroup"                                    is a list with properties "changedAt" and "materialDemandId"
  When the application tries to generate the IdBasedRequestForUpdate
  Then it should generate the IdBasedRequestForUpdate and represent the following <case>

Examples:
| v_weekBasedMaterialDemand                                                                                                      | v_weekBasedCapacityGroup                                                                                  | case                                                                                          |
| {{OMITTED}}                                                                                                                    | {{OMITTED}}                                                                                               | Give me everything                                                                            |
| [ {"materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c3456","changedAt" : "2023-03-10T12:27:11.320Z"}]                      | [ {"capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110","changedAt" : "2023-03-10T12:27:11.320Z"} ] | Give me the specified aspect models, but only of they are newer than the specified timestamps |
| [ {"materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c3456","changedAt" : "2023-03-10T12:27:11.320Z"}]                      | {{OMITTED}}                                                                                               | Give me the specified aspect models, but only of they are newer than the specified timestamps |
| {{OMITTED}}                                                                                                                    | [ {"capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110","changedAt" : "2023-03-10T12:27:11.320Z"} ] | Give me the specified aspect models, but only of they are newer than the specified timestamps |
| [ {"materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c3456"}]                                                               | {{OMITTED}}                                                                                               | Give me the specified aspect models                                                           |
| {{OMITTED}}                                                                                                                    | [ {"capacityGroupId" : "0157ba42-d2a8-4e28-8565-7b07830c1110"} ]                                          | Give me the specified aspect models                                                           |
| [ {"materialDemandId" : "e84f0078-cb3f-4917-8b56-8405c053d5ca"},{"materialDemandId" : "0157ba42-d2a8-4e28-8565-7b07830c3456"}] | {{OMITTED}}                                                                                               | Give me the specified aspect models                                                           |

```

</details>

### Create invalid IdBasedRequestForUpdate

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create IdBasedRequestForUpdate

Scenario Outline: Try to generate invalid IdBasedRequestForUpdate
  Given   the value for the property "weekBasedMaterialDemand"        is <v_weekBasedMaterialDemand>
  *       "weekBasedMaterialDemand"                                   is a list with properties "changedAt" and "materialDemandId"
  *       the value for the property "weekBasedCapacityGroup"         is <v_weekBasedCapacityGroup>
  *       "weekBasedCapacityGroup"                                    is a list with properties "changedAt" and "materialDemandId"
  When the application tries to generate the IdBasedRequestForUpdate
  Then it should NOT generate the IdBasedRequestForUpdate and throw an <error> instead

Examples:
| v_weekBasedMaterialDemand | v_weekBasedCapacityGroup | error                                                 |
| This should not compute   | {{OMITTED}}              | AspectModel Conformity Error: weekBasedMaterialDemand |
| {{OMITTED}}               | This should not compute  | AspectModel Conformity Error: weekBasedCapacityGroup  |

```

</details>

### Create IdBasedRequestForUpdate for base journey

<details>
<summary>The supplier creates an IdBasedRequestForUpdate used by the base journey which requests WeekBasedMaterialDemand Alpha, identified via \{\{UUID_MD1\}\}.</summary>

```cucumber
Feature: Supplier: Create IdBasedRequestForUpdate

Scenario Outline: Try to generate  IdBasedRequestForUpdate for base journey using different <v_tests>
  Given   the value for the property "weekBasedMaterialDemand"        is <v_weekBasedMaterialDemand>
  *       "weekBasedMaterialDemand"                                   is a list with properties "changedAt" and "materialDemandId"
  *       the value for the property "weekBasedCapacityGroup"         is <v_weekBasedCapacityGroup>
  *       "weekBasedCapacityGroup"                                    is a list with properties "changedAt" and "materialDemandId"
  When the application tries to generate the IdBasedRequestForUpdate
  Then it should generate the IdBasedRequestForUpdate

Examples:
| v_tests | v_weekBasedMaterialDemand             | v_weekBasedCapacityGroup |
| RU_beta | [ {"capacityGroupId" : {{UUID_MD1}}}] | {{OMITTED}}              |
```

</details>

## Supplier: Consume IdBasedRequestForUpdate

### Consume valid IdBasedRequestForUpdate

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Consume IdBasedRequestForUpdate

Scenario: Consume valid  IdBasedRequestForUpdate
  Given I receive a valid IdBasedRequestForUpdate from my customer
  When I try to consume said IdBasedRequestForUpdate
  Then I should be able to consume it, send my customer a http 200 status message and provide my customer with the data requested, if applicable
```

</details>

### Consume invalid IdBasedRequestForUpdate

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Consume IdBasedRequestForUpdate

Scenario: Consume invalid IdBasedRequestForUpdate
  Given I receive an invalid IdBasedRequestForUpdate from my customer
  When I try to consume said IdBasedRequestForUpdate
  Then I should not consume it and send my customer a http 400 status message
```

</details>

### Consume IdBasedRequestForUpdate for base journey

<details>
<summary>The customer sends the previously created IdBasedRequestForUpdate to the supplier and expects one WeekBasedCapacityGroup in return.</summary>

```cucumber
Feature: Supplier: Consume IdBasedRequestForUpdate

Scenario Outline: Consume IdBasedRequestForUpdate for base journey
  Given I receive a <FileTransfer> containing <IdBasedRequestForUpdate> as payload
  When I try to consume <IdBasedRequestForUpdate>
  Then I should be able to consume it and send my customer a http 200 status message
  *    I should react by sending <reaction> with <reaction payload> back to my customer

Examples:
| FileTransfer | IdBasedRequestForUpdate | reaction | reaction payload |
| FT_epsilon   | RU_alpha                | FT_eta   | CG_alpha         |
```

</details>

## Supplier: Provide IdBasedRequestForUpdate

### Provide valid IdBasedRequestForUpdate

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide IdBasedRequestForUpdate

Scenario: Provide valid IdBasedRequestForUpdate
  Given I was able to create a valid IdBasedRequestForUpdate
  When I try to provide my customer with said IdBasedRequestForUpdate
  Then I should get an http 200 status message
```

</details>

### Provide invalid IdBasedRequestForUpdate

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide invalid IdBasedRequestForUpdate

Scenario: Provide invalid IdBasedRequestForUpdate
  Given I accidentally created an invalid IdBasedRequestForUpdate
  When I try to provide my customer with said IdBasedRequestForUpdate
  Then I should get an http 400 status message
```

</details>

### Provide IdBasedRequestForUpdate for base journey

<details>
<summary>The supplier sends the previously created IdBasedRequestForUpdate to the customer and expects one WeekBasedMaterialDemand in return.</summary>

```cucumber
Feature: Supplier: Provide IdBasedRequestForUpdate

Scenario Outline: Provide IdBasedRequestForUpdate for base journey
  Given I have previously consumed RU_epsilon
  When I provide my customer with <FileTransfer> containing <IdBasedRequestForUpdate> as payload
  Then I should get a http 200  status message
  *    I should receive <reaction> from my customer, containing <reaction payload>

Examples:
| FileTransfer | IdBasedRequestForUpdate | reaction | reaction payload |
| FT_zeta      | RU_beta                 | FT_theta | MD_gamma         |
```

</details>

## Supplier: Consume IdBasedComment

### Consume valid IdBasedComment

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Consume IdBasedComment

Scenario: Consume valid unknown IdBasedComment
  Given I receive a valid IdBasedComment from my customer with a commentID that is unknown to me
  When I try to consume said IdBasedComment
  Then I should be able to consume it and send my customer a http 201 status message

Scenario: Consume valid known IdBasedComment
  Given I receive a valid IdBasedComment from my customer with a commentID that is already known to me
  When I try to consume said IdBasedComment
  Then I should be able to consume it and send my customer a http 200 status message
```

</details>

### Consume invalid IdBasedComment

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Consume IdBasedComment

Scenario: Consume invalid IdBasedComment
  Given I receive an invalid IdBasedComment from my customer
  When I try to consume said IdBasedComment
  Then I should not consume it and send my customer a http 400 status message
```

</details>

### Consume IdBasedComment for base journey

<details>
<summary>The supplier receives the previously created IdBasedComment from the customer.</summary>

```cucumber
Feature: Supplier: Consume IdBasedComment

Scenario Outline: Consume IdBasedComment for base journey
  Given I receive a <FileTransfer> containing <IdBasedComment> as payload
  When I try to consume <IdBasedComment>
  Then I should be able to consume it and send my customer a http 200 status message

Examples:
| FileTransfer | IdBasedComment    |
| FT_iota      | CT_alpha, CT_beta |
```

</details>

## Supplier: Create IdBasedComment

### Create valid IdBasedComment

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create IdBasedComment

Scenario Outline: Try to generate valid IdBasedComment
  Given   the value for the property "CommentId"                      is <v_CommentId>                            with a default value of "a54348ce-7373-4cf0-8f00-8a73ea323dab"
  *       the value for the property "ObjectId"                       is <v_ObjectId>                             with a default value of "b01fac51-6e7f-4754-a762-11814a1ff243"
  *       the value for the property "CommentType"                    is <v_CommentType>                          with a default value of "default"
  *       the value for the property "listOfReferenceDates"           is <v_listOfReferenceDates>                 with a default value of "2025-04-21"
  *       the value for the property "author"                         is <v_author>                               with a default value of "max.mustermann@company.de"
  *       the value for the property "supplier"                       is <v_supplier>                             with a default value of "{{BPNL_SUP}}"
  *       the value for the property "customer"                       is <v_customer>                             with a default value of "{{BPNL_CUS}}"
  *       the value for the property "CommentText"                    is <v_commentText>                          with a default value of "This is a comment. Very nice! "
  *       the value for the property "requestDelete"                  is <v_requestDelete>                        with a default value of "false"
  *       the value for the property "objectType"                     is <v_objectType>                           with a default value of "urn:samm:io.catenax.week_based_capacity_group"
  *       the value for the property "postedAt"                       is <v_postedAt>                             with a default value of "2024-03-10T12:27:11.320Z"
  *       the value for the property "changedAt"                      is <v_changedAt>                            with a default value of "2024-03-10T12:27:11.320Z"
  When the application tries to generate the IdBasedComment
  Then it should generate the IdBasedComment

Examples:
| v_CommentId                                   | v_ObjectId                                    | v_CommentType  | v_listOfReferenceDates | v_author       | v_supplier   | v_customer   | v_CommentText                                                          | v_requestDelete | v_objectType                                   | v_postedAt               | v_changedAt              |
| 1236a465-93ab-45f7-ad17-67ad3107d6c8          |                                               |                |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
| urn:uuid:1236a465-93ab-45f7-ad17-67ad3107d6c8 |                                               |                |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               | f38d7d7b-b8e7-452c-8ee2-08c8c56a4f80          |                |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               | urn:uuid:f38d7d7b-b8e7-452c-8ee2-08c8c56a4f80 |                |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               | information    |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               | warning        |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               | default        |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               | actionRequired |                        |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                | 2024-05-13             |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                | 2024-05-13,2024-05-20  |                |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                |                        | test@gmail.com |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                |                        | {{BPNL_CUS}}   |              |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                |                        |                | {{BPNL_SUP}} |              |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                |                        |                |              | {{BPNL_CUS}} |                                                                        |                 |                                                |                          |                          |
|                                               |                                               |                |                        |                |              |              | This can be up to 5000 characters long and contain special characters. |                 |                                                |                          |                          |
|                                               |                                               |                |                        |                |              |              | !"§$%&/()=,.;:#'+*~<>[]{}                                              |                 |                                                |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        | true            |                                                |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        | false           |                                                |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        |                 | urn:samm:io.catenax.week_based_material_demand |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        |                 | urn:samm:io.catenax.week_based_capacity_group  |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        |                 | urn:samm:io.catenax.id_based_comment           |                          |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        |                 |                                                | 2024-03-11T11:27:11.320Z |                          |
|                                               |                                               |                |                        |                |              |              |                                                                        |                 |                                                |                          | 2024-03-11T11:27:11.320Z |
```

</details>

### Create invalid IdBasedComment

<details>
<summary>This test checks the implementation of the aspect model as well as some edge cases.</summary>

```cucumber
Feature: Supplier: Create IdBasedComment

Scenario Outline: Try to generate invalid IdBasedComment
  Given   the value for the property "CommentId"                      is <v_CommentId>                            with a default value of "a54348ce-7373-4cf0-8f00-8a73ea323dab"
  *       the value for the property "ObjectId"                       is <v_ObjectId>                             with a default value of "b01fac51-6e7f-4754-a762-11814a1ff243"
  *       the value for the property "CommentType"                    is <v_CommentType>                          with a default value of "default"
  *       the value for the property "listOfReferenceDates"           is <v_listOfReferenceDates>                 with a default value of "2025-04-21"
  *       the value for the property "author"                         is <v_author>                               with a default value of "max.mustermann@company.de"
  *       the value for the property "supplier"                       is <v_supplier>                             with a default value of "{{BPNL_SUP}}"
  *       the value for the property "customer"                       is <v_customer>                             with a default value of "{{BPNL_CUS}}"
  *       the value for the property "CommentText"                    is <v_commentText>                          with a default value of "This is a comment. Very nice! "
  *       the value for the property "requestDelete"                  is <v_requestDelete>                        with a default value of "false"
  *       the value for the property "objectType"                     is <v_objectType>                           with a default value of "urn:samm:io.catenax.week_based_capacity_group"
  *       the value for the property "postedAt"                       is <v_postedAt>                             with a default value of "2024-03-10T12:27:11.320Z"
  *       the value for the property "changedAt"                      is <v_changedAt>                            with a default value of "2024-03-10T12:27:11.320Z"
  When the application tries to generate the IdBasedComment
  Then it should NOT generate the IdBasedComment and throw an <error> instead

Examples:
| v_CommentId | v_ObjectId  | v_CommentType     | v_listOfReferenceDates | v_author                 | v_supplier | v_customer | v_CommentText                             | v_requestDelete | v_objectType                                          | v_postedAt                      | v_changedAt | error                                              |
| Not an UUID |             |                   |                        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: commentID            |
|             | Not an UUID |                   |                        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: objectID             |
|             |             | warnings          |                        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: commentType          |
|             |             | comment           |                        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: commentType          |
|             |             | Not a commentType |                        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: commentType          |
|             |             |                   | 2024-05-13;2024-05-20  |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: listOfReferenceDates |
|             |             |                   | List,Of,Strings        |                          |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: listOfReferenceDates |
|             |             |                   |                        | Not@a@valid.email.adress |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: author               |
|             |             |                   |                        | Not a BPNL               |            |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: author               |
|             |             |                   |                        |                          | Not a BPNL |            |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: supplier             |
|             |             |                   |                        |                          |            | Not a BPNL |                                           |                 |                                                       |                                 |             | AspectModel Conformity Error: customer             |
|             |             |                   |                        |                          |            |            | {{String with more than 5000 characters}} |                 |                                                       |                                 |             | AspectModel Conformity Error: CommentText          |
|             |             |                   |                        |                          |            |            |                                           | maybe           |                                                       |                                 |             | AspectModel Conformity Error: requestDelete        |
|             |             |                   |                        |                          |            |            |                                           |                 | urn:samm:io.catenax.id_based_request_for_update:3.0.0 |                                 |             | AspectModel Conformity Error: objectType           |
|             |             |                   |                        |                          |            |            |                                           |                 | urn:samm:io.catenax.id_based_comment                  |                                 |             | AspectModel Conformity Error: objectType           |
|             |             |                   |                        |                          |            |            |                                           |                 | Not an objectType                                     |                                 |             | AspectModel Conformity Error: objectType           |
|             |             |                   |                        |                          |            |            |                                           |                 |                                                       | 2000-01-01T66:23:00.66372+14:00 |             | AspectModel Conformity Error: postedAt             |
|             |             |                   |                        |                          |            |            |                                           |                 |                                                       |                                 | 2000-01-0   | AspectModel Conformity Error: changedAt            |
```

</details>

### Create IdBasedComment for base journey

<details>
<summary>The supplier creates two IdBasedComment used by the base journey.</summary>

```cucumber
Feature: Customer: Create IdBasedComment

Scenario Outline: Try to generate IdBasedComment for base journey using different <v_tests>

  Given   the value for the property "CommentId"                      is <v_CommentId>
  *       the value for the property "ObjectId"                       is <v_ObjectId>
  *       the value for the property "CommentType"                    is <v_CommentType>
  *       the value for the property "listOfReferenceDates"           is <v_listOfReferenceDates>
  *       the value for the property "author"                         is <v_author>
  *       the value for the property "supplier"                       is <v_supplier>
  *       the value for the property "customer"                       is <v_customer>
  *       the value for the property "CommentText"                    is <v_commentText>
  *       the value for the property "requestDelete"                  is <v_requestDelete>
  *       the value for the property "objectType"                     is <v_objectType>
  *       the value for the property "postedAt"                       is <v_postedAt>
  *       the value for the property "changedAt"                      is <v_changedAt>
  When the application tries to generate the IdBasedComment
  Then it should generate the IdBasedComment

Examples:
| v_tests  | v_CommentId   | v_ObjectId   | v_CommentType | v_listOfReferenceDates | v_author                  | v_supplier   | v_customer   | v_CommentText                                                                            | v_requestDelete | v_objectType                                  | v_postedAt | v_changedAt |
| CT_gamma | {{UUID_COM2}} | {{UUID_CG1}} | warning       | {{OMITTED}}            | max.mustermann@company.de | {{BPNL_SUP}} | {{BPNL_CUS}} | "Capacity set to 0 because machine is destroyed."                                        | false           | urn:samm:io.catenax.week_based_capacity_group | {{TS_NOW}} | {{TS_NOW}}  |
| CT_delta | {{UUID_COM4}} | {{UUID_CG1}} | default       | {{OMITTED}}            | max.mustermann@company.de | {{BPNL_SUP}} | {{BPNL_CUS}} | "Capacity set to 0 in CW45 due to machine maintenance. Please set demand in CW 45 to 0." | false           | urn:samm:io.catenax.week_based_capacity_group | {{TS_NOW}} | {{TS_NOW}}  |
```

</details>

## Supplier: Provide IdBasedComment

### Provide valid IdBasedComment

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide IdBasedComment

Scenario: Provide valid new IdBasedComment
  Given the commentID of the IdBasedComment is unknown to my supplier
  When I try to provide my customer with said IdBasedComment
  Then I should get an http 201 status message

Scenario: Provide valid existing IdBasedComment
  Given the commentID of the IdBasedComment is already known to my supplier
  When I try to provide my customer with said IdBasedComment
  Then I should get an http 200 status message
```

</details>

### Provide invalid IdBasedComment

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide IdBasedComment

Scenario: Provide invalid IdBasedComment
  Given I accidentally created an invalid IdBasedComment
  When I try to provide my customer with said IdBasedComment
  Then I should get an http 400 status message
```

</details>

### Provide IdBasedComment for base journey

<details>
<summary>This test checks the basic implementation of the API.</summary>

```cucumber
Feature: Supplier: Provide IdBasedComment

Scenario Outline: Provide IdBasedComment for base journey
  Given I try to provide my customer with an IdBasedComment
  When I sent a <FileTransfer> containing <IdBasedComment> as payload to my customer
  Then I should get an http 200 status message

Examples:
| FileTransfer | IdBasedComment     |
| FT_kappa     | CT_gamma, CT_delta |
```

</details>

## Supplier: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

### Comment linked to WeekBasedCapacityGroup

<details>
<summary>This test checks the basic implementation of the comment feature within the GUI.</summary>

```cucumber
Feature: Supplier: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked to WeekBasedCapacityGroup
  Given I have a comment that is linked to a WeekBasedCapacityGroup
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup the comment is linking
```

</details>

### Comment linked to WeekBasedMaterialDemand

<details>
<summary>This test checks the basic implementation of the comment feature within the GUI.</summary>

```cucumber
Feature: Supplier: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked to WeekBasedMaterialDemand
  Given I have a comment that is linked to a WeekBasedMaterialDemand
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedMaterialDemand the comment is linking
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup, the WeekBasedMaterialDemand is linked to, the comment is linking
  *       the comments should be presented in a tree view
```

</details>

### Comment linked to IdBasedComment

<details>
<summary>This test checks the basic implementation of the comment feature within the GUI.</summary>

```cucumber
Feature: Supplier: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked to IdBasedComment
  Given I have a comment that is linked to an IdBasedComment
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedMaterialDemand the IdBasedComment is linking, the comment is linking
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup, the WeekBasedMaterialDemand is linked to, the IdBasedComment is linking, the comment is linking
```

</details>

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 CatX Service GmbH
- SPDX-FileCopyrightText: 2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
