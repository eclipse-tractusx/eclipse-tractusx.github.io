---
id: test-customer
title: Test - Customer
description: 'Tests relevant for the business role customer.'
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## Introduction

This page lists tests that can be executed by the business role customer.

They are written in [Gherkin](https://cucumber.io/docs/gherkin/).

For an overview of these tests you should visit [Testing a DCM application](./overview.md#testing-a-dcm-application) within the Development View of this KIT.

## Customer: Prepare yourself

### Setup EDC

This test ensures that the customer sets up its EDC.

```cucumber
Feature: Customer: Prepare yourself

Scenario: Setup EDC
  Given I have joined the Catena-X dataspace and want to execute DCM tests
  When I check whether I have setup my EDC or not
  Then I should confirm that I have setup my EDC in the correct version successfully 
```

### Register APIs as assets

This test ensures that the customer registers its API endpoints as data assets with its own EDC.

```cucumber
Feature: Customer: Prepare yourself

Scenario Outline: Register APIs as assets
  Given my EDC has been setup correctly
  When I check the asset catalog of my own EDC
  Then I should find an asset for the <API> with the correct <taxonomy> and <version> 

Examples:
| API                         | taxonomy                           | version |
| WeekBasedCapacityGroup API  | cx-taxo:DcmWeekBasedCapacityGroup  | 2.0     |
| RequestForUpdate API        | cx-taxo:DcmIdBasedRequestForUpdate | 2.0     |
| IdBasedComment API          | cx-taxo:DcmIdBasedComment          | 2.0     |
```

### Check wallet for certificates

This test ensures that the customer has the necessary credentials in its wallet.

```cucumber
Feature: Customer: Prepare yourself

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

### Prepare variables for other tests

This test ensures that the customer is aware of the fact that some tests contain variables that need to be filled in with the correct values before executing the tests.

```cucumber
Feature: Customer: Prepare yourself
  
  Scenario Outline: Prepare variables for other tests
  Given I want to execute a <test> that uses a <variable> I need to have a <value> assigned to <variable> that makes sense in the context of the <test> and use the value of the variable instead of its name when testing.
  When the test gets executed
  Then it should work as intended

Examples:
| test                                                                                                                | variable  | value                                                                                                                                                          |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment                                           | BPNL_SUP  | {Business Partner Number Legal (BPNL) of the company that acts as the business role Supplier in the context of the test execution e.g. BPNL00000000052O }      |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment                                           | BPNL_CUS  | {Use your own Business Partner Number Legal (BPNL) e.g. BPNL000000000JS9}                                                                                      |
| Customer: Create WeekBasedMaterialDemand                                                                            | BPNS_SUP1 | {A Business Partner Number Site (BPNS) of the company that acts as the business role Supplier in the context of the test execution }                           |
| Customer: Create WeekBasedMaterialDemand                                                                            | BPNS_CUS1 | {Use one of your own Business Partner Number Site (BPNS)}                                                                                                      |
| Customer: Create WeekBasedMaterialDemand                                                                            | BPNS_CUS2 | {Use one of your own Business Partner Number Site (BPNS)}                                                                                                      |
| Customer: Create WeekBasedMaterialDemand                                                                            | BPNS_CUS3 | {Use one of your own Business Partner Number Site (BPNS)}                                                                                                      |
| Customer: Create WeekBasedMaterialDemand                                                                            | DSC_MAT1  | {Description of the material e.g. spark plug}                                                                                                                  |
| Customer: Create WeekBasedMaterialDemand                                                                            | DSC_MAT2  | {Description of the material e.g. spark plug}                                                                                                                  |
| Customer: Create WeekBasedMaterialDemand                                                                            | DSC_MAT3  | {Description of the material e.g. spark plug}                                                                                                                  |
| Customer: Create WeekBasedMaterialDemand                                                                            | UUID_MD1  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment                                           | UUID_MD2  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment                                           | UUID_MD3  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand                                                                            | UUID_GA1  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand                                                                            | UUID_GA2  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand                                                                            | UUID_GA3  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create WeekBasedMaterialDemand                                                                            | UUID_GA4  | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create IdBasedComment                                                                                     | UUID_COM1 | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create IdBasedComment                                                                                     | UUID_COM3 | {UUIDv4 that needs to be generated during the creation of the corresponding aspect model and uniquely identifies it e.g. 4914cc91-5725-4268-9cd8-b8f6d72c525e} |
| Customer: Create IdBasedRequestForUpdate                                                                            | UUID_CG1  | {UUIDv4 that gets generated by the supplier. Known to the customer as soon as consuming the corresponding WeekBasedCapacityGroup.}                           |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment                                           | TS_NOW    | {Timestamp that represents the system time when the corresponding aspect model gets created e.g. 2023-11-05T08:15:30.123-05:00}                                |
| Customer: Create WeekBasedMaterialDemand, Customer: Create IdBasedComment, Customer: Create IdBasedRequestForUpdate | OMITTED   | {Special case where you do not include the property in the data at all. You do not even mention it.}                                                           |
```

### Prepare for base journey

This test ensures that the customer is aware of the sequence of communication and naming conventions within the base journey.

```cucumber
Feature: Customer: Prepare yourself
  
  Scenario Outline: Prepare for base journey
  Given I want to execute the base journey which uses <object> in <test> to fulfill a certain <function> that I need to be aware of in order to execute my part of the base journey successfully
  When the test gets executed
  Then it should work as intended

Examples:
| object     | function                                                                                           | test                                                                                                                                                                              |
| MD_alpha   | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha           | Create WeekBasedMaterialDemand for base journey, Provide WeekBasedMaterialDemand for base journey                                                                                 |
| MD_beta    | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha           | Create WeekBasedMaterialDemand for base journey, Provide WeekBasedMaterialDemand for base journey, Calculation for base journey                                                   |
| MD_gamma   | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Alpha and Theta | Create WeekBasedMaterialDemand for base journey, Provide WeekBasedMaterialDemand for base journey, Calculation for base journey, Consume IdBasedRequestForUpdate for base journey |
| MD_delta   | A WeekBasedMaterialDemand created by the customer and transmitted via Filetransfer Beta            | Create WeekBasedMaterialDemand for base journey, Provide WeekBasedMaterialDemand for base journey                                                                                 |
| CG_alpha   | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Gamma and Eta    | Consume WeekBasedCapacityGroup for base journey, Provide IdBasedRequestForUpdate for base journey                                                                                 |
| CG_beta    | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Gamma            | Consume WeekBasedCapacityGroup for base journey, Calculation for base journey                                                                                                     |
| CG_gamma   | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Delta            | Consume WeekBasedCapacityGroup for base journey                                                                                                                                   |
| CG_delta   | A WeekBasedCapacityGroup created by the supplier and transmitted via Filetransfer Delta            | Consume WeekBasedCapacityGroup for base journey                                                                                                                                   |
| RU_alpha   | An IdBasedRequestForUpdate created by the customer and transmitted via Filetransfer Epsilon        | Create IdBasedRequestForUpdate for base journey, Provide IdBasedRequestForUpdate for base journey                                                                                 |
| RU_beta    | An IdBasedRequestForUpdate created by the supplier and transmitted via Filetransfer Zeta           | Consume IdBasedRequestForUpdate for base journey                                                                                                                                  |
| CT_alpha   | An IdBasedComment created by the customer and transmitted via Filetransfer Iota                    | Create IdBasedComment for base journey, Provide IdBasedComment for base journey                                                                                                   |
| CT_beta    | An IdBasedComment created by the customer and transmitted via Filetransfer Iota                    | Create IdBasedComment for base journey, Provide IdBasedComment for base journey                                                                                                   |
| CT_gamma   | An IdBasedComment created by the supplier and transmitted via Filetransfer Kappa                   | Consume IdBasedComment for base journey                                                                                                                                           |
| CT_delta   | An IdBasedComment created by the supplier and transmitted via Filetransfer Kappa                   | Consume IdBasedComment for base journey                                                                                                                                           |
| FT_alpha   | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Provide WeekBasedMaterialDemand for base journey                                                                                                                                  |
| FT_beta    | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Provide WeekBasedMaterialDemand for base journey                                                                                                                                  |
| FT_gamma   | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Consume WeekBasedCapacityGroup for base journey                                                                                                                                   |
| FT_delta   | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Consume WeekBasedCapacityGroup for base journey                                                                                                                                   |
| FT_epsilon | A Filetransfer providing IdBasedRequestForUpdate for the supplier to consume                       | Provide IdBasedRequestForUpdate for base journey                                                                                                                                  |
| FT_eta     | A Filetransfer providing WeekBasedCapacityGroup for the customer to consume                        | Provide IdBasedRequestForUpdate for base journey                                                                                                                                  |
| FT_zeta    | A Filetransfer providing IdBasedRequestForUpdate for the customer to consume                       | Consume IdBasedRequestForUpdate for base journey                                                                                                                                  |
| FT_theta   | A Filetransfer providing WeekBasedMaterialDemand for the supplier to consume                       | Consume IdBasedRequestForUpdate for base journey                                                                                                                                  |
| FT_iota    | A Filetransfer providing IdBasedComment for the supplier to consume                                | Provide IdBasedComment for base journey                                                                                                                                           |
| FT_kappa   | A Filetransfer providing IdBasedComment for the customer to consume                                | Consume IdBasedComment for base journey                                                                                                                                           |
```

## Customer: Create WeekBasedMaterialDemand

### Create valid WeekBasedMaterialDemand

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create WeekBasedMaterialDemand

Scenario Outline: Try to generate valid WeekBasedMaterialDemand
  Given   the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                        with a default value of "unit:piece"
  *       the value for the property "changedAt"                      is <v_changedAt>                            with a default value of "{{TS_NOW}}"
  *       the value for the property "materialDemandIsInactive"       is <v_materialDemandIsInactive>             with a default value of "false"
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>               with a default value of "false"
  *       the value for the property "materialNumberCustomer"         is <v_materialNumberCustomer>               with a default value of "MNR-7307-AU340474.002"
  *       the value for the property "materialNumberSupplier"         is <v_materialNumberSupplier>               with a default value of "MNR-8101-ID146955.001"
  *       the value for the property "materialDescriptionCustomer"    is <v_materialDescriptionCustomer>          with a default value of "Spark Plug"
  *       the value for the property "materialDemandId"               is <v_materialDemandId>                     with a default value of "0157ba42-d2a8-4e28-8565-7b07830c1110"
  *       the value for the property "materialGlobalAssetId"          is <v_materialGlobalAssetId>                with a default value of "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df"
  *       the value for the property "supplier"                       is <v_supplier>                             with a default value of "{{BPNL_SUP}}"
  *       the value for the property "customer"                       is <v_customer>                             with a default value of "{{BPNL_CUS}}"
  *       the value for the property "demandSeries"                   contains exactly one entity "DemandSeries"
  *       the value for the property "expectedSupplierLocation"       is <v_expectedSupplierLocation>             with a default value of "{{BPNS_SUP1}}"
  *       the value for the property "customerLocation"               is <v_customerLocation>                     with a default value of "{{BPNS_CUS1}}"
  *       the value for the property "demandCategoryCode"             is <v_demandCategoryCode>                   with a default value of "0001"
  *       the value for the property "demands"                        contains exactly one entity "Demand"
  *       the value for the property "pointInTime"                    is <v_pointInTime>                          with a default value of "2023-10-09"
  *       the value for the property "demand"                         is <v_demand>                               with a default value of "1000"
  When the application tries to generate the WeekBasedMaterialDemand
  Then it should generate the WeekBasedMaterialDemand

Examples:
| v_unitOfMeasure            | v_changedAt                     | v_materialDemandIsInactive | v_unitOfMeasureIsOmitted | v_materialNumberCustomer          | v_materialNumberSupplier          | v_materialDescriptionCustomer                                | v_materialDemandId                            | v_materialGlobalAssetId                  | v_supplier | v_customer | v_expectedSupplierLocation | v_customerLocation | v_demandCategoryCode | v_pointInTime | v_demand         |
| {{OMITTED}}                |                                 |                            | true                     |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            | false                    |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:gram                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:kilogram              |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:tonneMetricTon        |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:tonUsOrShortTonUkorus |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:ounceAvoirdupois      |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:pound                 |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:centimetre            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:metre                 |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:kilometre             |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:inch                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:foot                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:yard                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:squareCentimetre      |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:squareMetre           |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:squareInch            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:squareFoot            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:squareYard            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cubicCentimetre       |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cubicMetre            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cubicInch             |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cubicFoot             |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cubicYard             |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:millilitre            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:litre                 |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:hectolitre            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:piece                 |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:set                   |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:pair                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:page                  |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:kilowattHour          |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:secondUnitOfTime      |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:minuteUnitOfTime      |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:hourUnitOfTime        |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
| unit:cycle                 |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            | 2000-01-01T14:23:00.66372+14:00 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 | true                       |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 | false                      |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            | true                     |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            | false                    |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          | Hello world                       |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          | Καλημέρα κόσμε                    |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          | コンニチハ                         |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          | @!"§$%&/()=?`;:_-.,'*+#~><²³][}{´ |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   | Hello world                       |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   | Καλημέρα κόσμε                    |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   | コンニチハ                         |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   | @!"§$%&/()=?`;:_-.,'*+#~><²³][}{´ |                                                              |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   | A materia| description_that mig#t cont§in sp3cial ch@r@cters |                                               |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              | 857e3c6f-f556-4ac4-a7cd-8f46ad03673f          |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              | urn:uuid:857e3c6f-f556-4ac4-a7cd-8f46ad03673f |                                          |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               | e2a72ce8-45b6-4d5a-8854-2d6e0299d337     |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               | urn:e2a72ce8-45b6-4d5a-8854-2d6e0299d337 |            |            |                            |                    |                      |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | SR99                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | ED01                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | A1S1                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | OI01                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | OS01                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | PI01                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | PO01                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    | 0001                 |               |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      | 2024-09-02    |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      | 1930-01-06    |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      | 2119-12-25    |                  |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               | 0                |
|                            |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               | 10000            |
| unit:kilowattHour          |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               | 999999999999.999 |
| unit:tonneMetricTon        |                                 |                            |                          |                                   |                                   |                                                              |                                               |                                          |            |            |                            |                    |                      |               | 4.4              |
```

### Create invalid WeekBasedMaterialDemand

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create WeekBasedMaterialDemand

Scenario Outline: Try to generate invalid WeekBasedMaterialDemand
  Given   the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                        with a default value of "unit:piece"
  *       the value for the property "changedAt"                      is <v_changedAt>                            with a default value of "{{TS_NOW}}"
  *       the value for the property "materialDemandIsInactive"       is <v_materialDemandIsInactive>             with a default value of "false"
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>               with a default value of "false"
  *       the value for the property "materialNumberCustomer"         is <v_materialNumberCustomer>               with a default value of "MNR-7307-AU340474.002"
  *       the value for the property "materialNumberSupplier"         is <v_materialNumberSupplier>               with a default value of "MNR-8101-ID146955.001"
  *       the value for the property "materialDescriptionCustomer"    is <v_materialDescriptionCustomer>          with a default value of "Spark Plug"
  *       the value for the property "materialDemandId"               is <v_materialDemandId>                     with a default value of "0157ba42-d2a8-4e28-8565-7b07830c1110"
  *       the value for the property "materialGlobalAssetId"          is <v_materialGlobalAssetId>                with a default value of "urn:uuid:48878d48-6f1d-47f5-8ded-a441d0d879df"
  *       the value for the property "supplier"                       is <v_supplier>                             with a default value of "{{BPNL_SUP}}"
  *       the value for the property "customer"                       is <v_customer>                             with a default value of "{{BPNL_CUS}}"
  *       the value for the property "demandSeries"                   contains exactly one entity "DemandSeries"
  *       the value for the property "expectedSupplierLocation"       is <v_expectedSupplierLocation>             with a default value of "{{BPNS_SUP1}}"
  *       the value for the property "customerLocation"               is <v_customerLocation>                     with a default value of "{{BPNS_CUS1}}"
  *       the value for the property "demandCategoryCode"             is <v_demandCategoryCode>                   with a default value of "0001"
  *       the value for the property "demands"                        contains exactly one entity "Demand"
  *       the value for the property "pointInTime"                    is <v_pointInTime>                          with a default value of "2023-10-09"
  *       the value for the property "demand"                         is <v_demand>                               with a default value of "1000"
  When the application tries to generate the WeekBasedMaterialDemand
  Then it should NOT generate the WeekBasedMaterialDemand and throw an <error> instead

Examples:
| v_unitOfMeasure | v_changedAt                     | v_materialDemandIsInactive | v_unitOfMeasureIsOmitted | v_materialNumberCustomer | v_materialNumberSupplier | v_materialDescriptionCustomer | v_materialDemandId  | v_materialGlobalAssetId            | v_supplier       | v_customer       | v_expectedSupplierLocation | v_customerLocation | v_demandCategoryCode | v_pointInTime | v_demand               | error                                                  |
| unit:cake list  |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: unitOfMeasure            |
|                 | 22.04.2021                      |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: changedAt                |
|                 | 2000-01-01T66:23:00.66372+14:00 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: changedAt                |
|                 | Wrong Format                    |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: changedAt                |
|                 |                                 | Maybe                      |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: materialDemandIsInactive |
|                 |                                 |                            | 2                        |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: unitOfMeasureIsOmitted   |
|                 |                                 |                            |                          |                          |                          |                               | This is not an UUID |                                    |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: materialDemandId         |
|                 |                                 |                            |                          |                          |                          |                               |                     | 4888d48-6f1d-47f5-8ded-a4410d879df |                  |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: materialGlobalAssetId    |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    | This is not BPNL |                  |                            |                    |                      |               |                        | AspectModel Conformity Error: supplier                 |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  | This is not BPNL |                            |                    |                      |               |                        | AspectModel Conformity Error: customer                 |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  | This is not BPNS           |                    |                      |               |                        | AspectModel Conformity Error: expectedSupplierLocation |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            | This is not BPNS   |                      |               |                        | AspectModel Conformity Error: customerLocation         |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    | Default              |               |                        | AspectModel Conformity Error: demandCategoryCode       |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    | OSO1                 |               |                        | AspectModel Conformity Error: demandCategoryCode       |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    | 0S01                 |               |                        | AspectModel Conformity Error: demandCategoryCode       |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      | 22.04.2021    |                        | AspectModel Conformity Error: pointInTime              |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      | 2022-04-22    |                        | AspectModel Conformity Error: pointInTime              |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               | 5,5                    | AspectModel Conformity Error: demand                   |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               | 9999999999999999999999 | AspectModel Conformity Error: demand                   |
|                 |                                 |                            |                          |                          |                          |                               |                     |                                    |                  |                  |                            |                    |                      |               | -1                     | AspectModel Conformity Error: demand                   |

```

### Create WeekBasedMaterialDemand for base journey

The customer creates four WeekBasedMaterialDemand used by the base journey.

```cucumber
Feature: Customer: Create WeekBasedMaterialDemand

Scenario Outline: Try to generate WeekBasedMaterialDemand for base journey using different <v_tests>

  Given   the value for the property "unitOfMeasure"                  is <v_unitOfMeasure>                        
  *       the value for the property "changedAt"                      is <v_changedAt>                            
  *       the value for the property "materialDemandIsInactive"       is <v_materialDemandIsInactive>             
  *       the value for the property "unitOfMeasureIsOmitted"         is <v_unitOfMeasureIsOmitted>               
  *       the value for the property "materialNumberCustomer"         is <v_materialNumberCustomer>               
  *       the value for the property "materialNumberSupplier"         is <v_materialNumberSupplier>               
  *       the value for the property "materialDescriptionCustomer"    is <v_materialDescriptionCustomer>          
  *       the value for the property "materialDemandId"               is <v_materialDemandId>                     
  *       the value for the property "materialGlobalAssetId"          is <v_materialGlobalAssetId>                
  *       the value for the property "supplier"                       is <v_supplier>                             
  *       the value for the property "customer"                       is <v_customer>                             
  *       the value for the property "demandSeries"                   contains exactly one Entity "DemandSeries"
  *       the value for the property "expectedSupplierLocation"       is <v_expectedSupplierLocation>             
  *       the value for the property "customerLocation"               is <v_customerLocation>                     
  *       the value for the property "demandCategoryCode"             is <v_demandCategoryCode>                   
  *       the value for the property "demands"                        contains exactly one Entity "Demand"
  *       the value for the property "pointInTime"                    is <v_pointInTime>                          
  *       the value for the property "demand"                         is <v_demand>                               
  When the application tries to generate the WeekBasedMaterialDemand
  Then it should generate the WeekBasedMaterialDemand

Examples:
| v_tests  | v_unitOfMeasure | v_changedAt | v_materialDemandIsInactive | v_unitOfMeasureIsOmitted | v_materialNumberCustomer | v_materialNumberSupplier | v_materialDescriptionCustomer | v_materialDemandId | v_materialGlobalAssetId | v_supplier   | v_customer   | v_expectedSupplierLocation | v_customerLocation | v_demandCategoryCode | v_pointInTime                                                                                                                                                                                                               | v_demand                                                                                  |
| MD_alpha | unit:pieces     | {{TS_NOW}}  | false                      | false                    | MNR-8540-CH063329.001    | {{OMITTED}}              | {{DSC_MAT1}}                  | {{UUID_MD1}}       | {{UUID_GA1}}            | {{BPNL_SUP}} | {{BPNL_CUS}} | {{BPNS_SUP1}}              | {{BPNS_CUS1}}      | 0001                 | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 | 200,190,190,200,190,250,280,0,270,250,240,220,200,190,180,200,190,180,190,200             |
| MD_beta  | unit:kilogram   | {{TS_NOW}}  | false                      | false                    | MNR-8549-CH706214.023    | {{OMITTED}}              | {{DSC_MAT2}}                  | {{UUID_MD2}}       | {{UUID_GA2}}            | {{BPNL_SUP}} | {{BPNL_CUS}} | {{OMITTED}}                | {{BPNS_CUS2}}      | A1S1                 | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 | 100,100,100,100,100,100,100,100,100,100,100,200,100,200,200,100,100,200,100,200           |
| MD_gamma | unit:kilogram   | {{TS_NOW}}  | false                      | false                    | MNR-8549-CH706214.023    | {{OMITTED}}              | {{DSC_MAT2}}                  | {{UUID_MD2}}       | {{UUID_GA3}}            | {{BPNL_SUP}} | {{BPNL_CUS}} | {{OMITTED}}                | {{BPNS_CUS2}}      | PI01                 | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 | 500,200,500,400,500,500,300,500,500,600,600,600,800,700,800,600,600,800,500,900           |
| MD_delta | unit:liters     | {{TS_NOW}}  | false                      | false                    | MNR-8538-CH809974.001    | {{OMITTED}}              | {{DSC_MAT3}}                  | {{UUID_MD3}}       | {{UUID_GA4}}            | {{BPNL_SUP}} | {{BPNL_CUS}} | {{OMITTED}}                | {{BPNS_CUS3}}      | PO01                 | 2026-01-05,2026-08-05,2026-01-12,2026-01-19,2026-01-26,2026-02-02,2026-02-09,2026-02-16,2026-02-23,2026-03-02,2026-03-09,2026-03-16,2026-03-23,2026-03-30,2026-04-06,2026-04-13,2026-04-20,2026-04-27,2026-05-04,2026-05-11 | 2540,4160,3660,3210,0,3570,490,3590,3400,3130,2920,3270,3210,0,3060,3030,2570,2740,0,1450 |
```

## Customer: Provide WeekBasedMaterialDemand

### Provide valid WeekBasedMaterialDemand

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide WeekBasedMaterialDemand

Scenario: Provide valid new WeekBasedMaterialDemand
  Given the materialDemandId of the WeekBasedMaterialDemand is unknown to my supplier
  When I try to provide my supplier with said WeekBasedMaterialDemand
  Then I should get an http 201 status message

Scenario: Provide valid existing WeekBasedMaterialDemand
  Given the materialDemandId of the WeekBasedMaterialDemand is already known to my supplier
  When I try to provide my supplier with said WeekBasedMaterialDemand
  Then I should get an http 200 status message
```

### Provide invalid WeekBasedMaterialDemand

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide WeekBasedMaterialDemand

Scenario: Provide invalid WeekBasedMaterialDemand
  Given I accidentally created an invalid WeekBasedMaterialDemand
  When I try to provide my supplier with said WeekBasedMaterialDemand
  Then I should get an http 400 status message
```

### Provide WeekBasedMaterialDemand for base journey

The customer sends the previously created WeekBasedMaterialDemands to the supplier as two separate data transfers.

```cucumber
Feature: Customer: Provide WeekBasedMaterialDemand

Scenario Outline: Provide WeekBasedMaterialDemand for base journey
  Given I have successfully created demands alpha, beta, gamma and delta as described in Create WeekBasedMaterialDemand for base journey
  When I try to provide my supplier with <testDemand> as <fileTransfer>
  Then I should get <http status code> from my supplier.

Examples:
| testDemand                | fileTransfer | http status code |
| MD_alpha,MD_beta,MD_gamma | FT_alpha     | 200 OK           |
| MD_delta                  | FT_beta      | 200 OK           |
```

## Customer: Consume WeekBasedCapacityGroup

### Consume valid WeekBasedCapacityGroup

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume WeekBasedCapacityGroup

Scenario: Consume valid unknown WeekBasedCapacityGroup
  Given I receive a valid WeekBasedCapacityGroup from my supplier with a capacityGroupId that is unknown to me
  When I try to consume said WeekBasedCapacityGroup
  Then I should be able to consume it and send my supplier a http 201 status message

Scenario: Consume valid known WeekBasedCapacityGroup
  Given I receive a valid WeekBasedCapacityGroup from my supplier with a capacityGroupId that is already known to me
  When I try to consume said WeekBasedCapacityGroup
  Then I should be able to consume it and send my supplier a http 200 status message
```

### Consume invalid WeekBasedCapacityGroup

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume WeekBasedCapacityGroup

Scenario: Consume invalid WeekBasedCapacityGroup
  Given I receive an invalid WeekBasedCapacityGroup from my supplier
  When I try to consume said WeekBasedCapacityGroup
  Then I should not consume it and send my supplier a http 400 status message
```

### Consume WeekBasedCapacityGroup for base journey

The customer receives the previously created WeekBasedCapacityGroups from the supplier as two separate data transfers.

```cucumber
Feature: Customer: Consume WeekBasedCapacityGroup

Scenario Outline: Consume WeekBasedCapacityGroup for base journey
  Given I have successfully created demands alpha, beta, gamma and delta as described in Create WeekBasedMaterialDemand for base journey
  When I try to consume  <testCapacityGroup> provided by my supplier within <fileTransfer>
  Then I should be able to consume the data and send <http status code> to my supplier.

Examples:
| testCapacityGroup | fileTransfer | http status code |
| CG_alpha,CG_beta  | FT_gamma     | 200 OK           |
| CG_gamma,CG_delta | FT_delta     | 200 OK           |
```

## Customer: Visualize CapacityGroup together with MaterialDemand

### Bottleneck calculation

This test checks the basic implementation of the GUI.

```cucumber
Feature: Customer: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Bottleneck calculation
  Given I have created a WeekBasedMaterialDemand
  *     I have consumed at least one WeekBasedCapacityGroup linked to the WeekBasedMaterialDemand
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color  | result     |
| demand > actual capacity = maximum capacity | red    | bottleneck |
| actual capacity < demand = maximum capacity | orange | bottleneck |
| actual capacity < demand < maximum capacity | orange | bottleneck |
| actual capacity < maximum capacity < demand | red    | bottleneck |
```

### Surplus calculation

This test checks the basic implementation of the GUI.

```cucumber
Feature: Customer: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Surplus calculation
  Given I have created a WeekBasedMaterialDemand
  *     I have consumed at least one WeekBasedCapacityGroup linked to the WeekBasedMaterialDemand
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color | result  |
| demand < actual capacity = maximum capacity | green | surplus |
| demand < actual capacity < maximum capacity | green | surplus |
```

### Zero deviation calculation

This test checks the basic implementation of the GUI.

```cucumber
Feature: Customer: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Zero deviation calculation
  Given I have created a WeekBasedMaterialDemand
  *     I have consumed at least one WeekBasedCapacityGroup linked to the WeekBasedMaterialDemand
  When I calculate and visualize the demand and capacity time series
  Then it should show <result> in <color> for <case>

Examples:
| case                                        | color | result         |
| demand = actual capacity = maximum capacity | green | zero deviation |
| demand = actual capacity < maximum capacity | green | zero deviation |
```

### Calculation for base journey

The customer compares the demand data, sent to the supplier, to the capacity data, received from the supplier.

```cucumber
Feature: Customer: Visualize CapacityGroup together with MaterialDemand

Scenario Outline: Calculation for base journey
  Given    I have successfully consumed <WeekBasedCapacityGroup>
  *        I have successfully created <WeekBasedMaterialDemand>
  When     I compare demand and capacity data for <WeekBasedCapacityGroup>
  Then     I should get <result> for <week> in <year>

Examples:
| WeekBasedCapacityGroup | WeekBasedMaterialDemand | week | year | result         | case                                        | color  |
| CG_beta                | MD_beta, MD_gamma       | 09   | 2026 | bottleneck     | demand > actual capacity = maximum capacity | red    |
| CG_beta                | MD_beta, MD_gamma       | 18   | 2026 | bottleneck     | actual capacity < demand = maximum capacity | orange |
| CG_beta                | MD_beta, MD_gamma       | 12   | 2026 | bottleneck     | actual capacity < demand < maximum capacity | orange |
| CG_beta                | MD_beta, MD_gamma       | 15   | 2026 | bottleneck     | actual capacity < maximum capacity < demand | red    |
| CG_beta                | MD_beta, MD_gamma       | 20   | 2026 | surplus        | demand < actual capacity = maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 01   | 2026 | surplus        | demand < actual capacity < maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 13   | 2026 | zero deviation | demand = actual capacity = maximum capacity | green  |
| CG_beta                | MD_beta, MD_gamma       | 14   | 2026 | zero deviation | demand = actual capacity < maximum capacity | green  |
```

## Customer: Create IdBasedRequestForUpdate

### Create valid IdBasedRequestForUpdate

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create IdBasedRequestForUpdate

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

### Create invalid IdBasedRequestForUpdate

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create IdBasedRequestForUpdate

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

### Create IdBasedRequestForUpdate for base journey

The customer creates an IdBasedRequestForUpdate used by the base journey which requests WeekBasedCapacityGroup Alpha, identified via {{UUID_CG1}}.

```cucumber
Feature: Customer: Create IdBasedRequestForUpdate

Scenario Outline: Try to generate  IdBasedRequestForUpdate for base journey using different <v_tests>
  Given   the value for the property "weekBasedMaterialDemand"        is <v_weekBasedMaterialDemand>
  *       "weekBasedMaterialDemand"                                   is a list with properties "changedAt" and "materialDemandId"
  *       the value for the property "weekBasedCapacityGroup"         is <v_weekBasedCapacityGroup>
  *       "weekBasedCapacityGroup"                                    is a list with properties "changedAt" and "materialDemandId"
  When the application tries to generate the IdBasedRequestForUpdate
  Then it should generate the IdBasedRequestForUpdate

Examples:
| v_tests  | v_weekBasedMaterialDemand | v_weekBasedCapacityGroup              |
| RU_alpha | {{OMITTED}}               | [ {"capacityGroupId" : {{UUID_CG1}}}] |
```

## Customer: Provide IdBasedRequestForUpdate

### Provide valid IdBasedRequestForUpdate

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide IdBasedRequestForUpdate

Scenario: Provide valid IdBasedRequestForUpdate
  Given I was able to create a valid IdBasedRequestForUpdate
  When I try to provide my supplier with said IdBasedRequestForUpdate
  Then I should get an http 200 status message
```

### Provide invalid IdBasedRequestForUpdate

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide IdBasedRequestForUpdate

Scenario: Provide invalid IdBasedRequestForUpdate
  Given I accidentally created an invalid IdBasedRequestForUpdate
  When I try to provide my supplier with said IdBasedRequestForUpdate
  Then I should get an http 400 status message
```

### Provide IdBasedRequestForUpdate for base journey

The customer sends the previously created IdBasedRequestForUpdate to the supplier and expects one WeekBasedCapacityGroup in return.

```cucumber
Feature: Customer: Provide IdBasedRequestForUpdate

Scenario Outline: Provide IdBasedRequestForUpdate for base journey
  Given I have previously consumed <reaction payload>
  When I provide my supplier with <FileTransfer> containing <IdBasedRequestForUpdate> as payload
  Then I should get a http 200  status message
  *    I should receive <reaction> from my supplier, containing <reaction payload>

Examples:
| FileTransfer | IdBasedRequestForUpdate | reaction | reaction payload |
| FT_epsilon   | RU_alpha                | FT_eta   | CG_alpha         |
```

## Customer: Consume IdBasedRequestForUpdate

### Consume valid IdBasedRequestForUpdate

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume IdBasedRequestForUpdate

Scenario: Consume valid  IdBasedRequestForUpdate
  Given I receive a valid IdBasedRequestForUpdate from my supplier
  When I try to consume said IdBasedRequestForUpdate
  Then I should be able to consume it, send my supplier a http 200 status message and provide my supplier with the data requested, if applicable
```

### Consume invalid IdBasedRequestForUpdate

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume IdBasedRequestForUpdate

Scenario: Consume invalid IdBasedRequestForUpdate
  Given I receive an invalid IdBasedRequestForUpdate from my supplier
  When I try to consume said IdBasedRequestForUpdate
  Then I should not consume it and send my supplier a http 400 status message
```

### Consume IdBasedRequestForUpdate for base journey

```cucumber
Feature: Customer: Consume IdBasedRequestForUpdate

Scenario Outline: Consume IdBasedRequestForUpdate for base journey
  Given I receive a <FileTransfer> containing <IdBasedRequestForUpdate> as payload
  When I try to consume <IdBasedRequestForUpdate>
  Then I should be able to consume it and send my supplier a http 200 status message
  *    I should react by sending <reaction> with <reaction payload> back to my supplier

Examples:
| FileTransfer | IdBasedRequestForUpdate | reaction | reaction payload |
| FT_zeta      | RU_beta                 | FT_theta | MD_gamma         |
```

## Customer: Create IdBasedComment

### Create valid IdBasedComment

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create IdBasedComment

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
  *       the value for the property "changedAt"                      is <v_changedAt>                            with a default value of "{{TS_NOW}}"
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

### Create invalid IdBasedComment

This test checks the implementation of the aspect model as well as some edge cases.

```cucumber
Feature: Customer: Create IdBasedComment

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

### Create IdBasedComment for base journey

```cucumber
Feature: Customer: Create IdBasedComment for base journey

Scenario Outline: Try to generate IdBasedComment for base journey for base journey using different <v_tests>

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
| v_tests  | v_CommentId   | v_ObjectId   | v_CommentType   | v_listOfReferenceDates | v_author                  | v_supplier   | v_customer   | v_CommentText                                                       | v_requestDelete | v_objectType                                   | v_postedAt  | v_changedAt |
| CT_alpha | {{UUID_COM1}} | {{UUID_MD1}} | information     | {{OMITTED}}            | max.mustermann@company.de | {{BPNL_SUP}} | {{BPNL_CUS}} | "Demand increase in all upcoming weeks expected."                   | {{OMITTED}}     | urn:samm:io.catenax.week_based_material_demand | {{OMITTED}} | {{TS_NOW}}  |
| CT_beta  | {{UUID_COM3}} | {{UUID_MD1}} | action required | {{OMITTED}}            | max.mustermann@company.de | {{BPNL_SUP}} | {{BPNL_CUS}} | "Demand Increase in CW45. Please confirm increase actual capacity." | {{OMITTED}}     | urn:samm:io.catenax.week_based_material_demand | {{OMITTED}} | {{TS_NOW}}  |
```

## Customer: Provide IdBasedComment

### Provide valid IdBasedComment

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide IdBasedComment

Scenario: Provide valid new IdBasedComment
  Given the commentID of the IdBasedComment is unknown to my supplier
  When I try to provide my supplier with said IdBasedComment
  Then I should get an http 201 status message

Scenario: Provide valid existing IdBasedComment
  Given the commentID of the IdBasedComment is already known to my supplier
  When I try to provide my supplier with said IdBasedComment
  Then I should get an http 200 status message
```

### Provide invalid IdBasedComment

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide IdBasedComment

Scenario: Provide invalid IdBasedComment
  Given I accidentally created an invalid IdBasedComment
  When I try to provide my supplier with said IdBasedComment
  Then I should get an http 400 status message
```

### Provide IdBasedComment for base journey

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Provide IdBasedComment

Scenario Outline: Provide IdBasedComment for base journey
  Given I try to provide my supplier with an IdBasedComment
  When I sent a <FileTransfer> containing <IdBasedComment> as payload to my supplier
  Then I should get an http 200 status message

Examples:
| FileTransfer | IdBasedComment     |
| FT_iota      | CT_alpha, CT_beta  |
```

## Customer: Consume IdBasedComment

### Consume valid IdBasedComment

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume IdBasedComment

Scenario: Consume valid unknown IdBasedComment
  Given I receive a valid IdBasedComment from my supplier with a commentID that is unknown to me
  When I try to consume said IdBasedComment
  Then I should be able to consume it and send my supplier a http 201 status message

Scenario: Consume valid known IdBasedComment
  Given I receive a valid IdBasedComment from my supplier with a commentID that is already known to me
  When I try to consume said IdBasedComment
  Then I should be able to consume it and send my supplier a http 200 status message
```

### Consume invalid IdBasedComment

This test checks the basic implementation of the API.

```cucumber
Feature: Customer: Consume IdBasedComment

Scenario: Consume invalid IdBasedComment
  Given I receive an invalid IdBasedComment from my supplier
  When I try to consume said IdBasedComment
  Then I should not consume it and send my supplier a http 400 status message
```

### Consume IdBasedComment for base journey

```cucumber
Feature: Customer: Consume IdBasedComment

Scenario Outline: Consume IdBasedComment for base journey
  Given I receive a <FileTransfer> containing <IdBasedComment> as payload
  When I try to consume <IdBasedComment>
  Then I should be able to consume it and send my supplier a http 200 status message

Examples:
| FileTransfer | IdBasedComment     |
| FT_kappa     | CT_gamma, CT_delta |
```

## Customer: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

### Comment linked to WeekBasedCapacityGroup

This test checks the basic implementation of the comment feature within the GUI

```cucumber
Feature: Customer: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked to WeekBasedCapacityGroup
  Given I have a comment that is linked to a WeekBasedCapacityGroup
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup the comment is linking
```

### Comment linked to WeekBasedMaterialDemand

This test checks the basic implementation of the comment feature within the GUI

```cucumber
Feature: Customer: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked to WeekBasedMaterialDemand
  Given I have a comment that is linked to a WeekBasedMaterialDemand
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedMaterialDemand the comment is linking
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup, the WeekBasedMaterialDemand is linked to, the comment is linking
  *       the comments should be presented in a tree view
```

### Comment linked to IdBasedComment

This test checks the basic implementation of the comment feature within the GUI

```cucumber
Feature: Customer: Visualize IdBasedComment together with CapacityGroup and MaterialDemand

Scenario: Comment linked ton IdBasedComment
  Given I have a comment that is linked to an IdBasedComment
  When I try to view this comment in the graphical user interface 
  Then    I should be able to view this comment in a list of all comments
  *       I should be able to view this comment by navigating to the WeekBasedMaterialDemand the IdBasedComment is linking, the comment is linking
  *       I should be able to view this comment by navigating to the WeekBasedCapacityGroup, the WeekBasedMaterialDemand is linked to, the IdBasedComment is linking, the comment is linking
```

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2024 CatX Service GmbH
- SPDX-FileCopyrightText: 2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
