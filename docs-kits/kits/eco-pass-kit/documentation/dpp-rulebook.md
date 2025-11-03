# DPP Rulebook

## Table of Contents

1. [Introduction](#1-Introduction)<br>
1.1 [Goal of this Document](#11-Goal-of-this-Document)<br>
1.2 [Target Audience](#12-Target-Audience)<br>
1.3 [Scope and Applicability](#13-Scope-and-Applicability)<br>
1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)<br>

2. [The Value of Validated Data](#2-The-Value-of-Validated-Data)<br>

3. [Key Concepts and Definitions](#3-Key-Concepts-and-Definitions)<br>
3.1 [DPP Overview](#31-DPP-Overview)<br>
3.2 [Definition of Terms](#32-Definition-of-Terms)<br>
3.3 [Key Stakeholders and their Roles](#33-Key-Stakeholders-and-their-Roles)<br>

4. [Placement of DPP Rulebook within the Data Trust & Security KIT](#4-Placement-of-DPP-Rulebook-within-the-Data-Trust-&-Security-KIT)<br>

5. [General Principles for Data Handling in the DPP Model](#5-General-Principles-for-Data-Handling-in-the-DPP-Model)<br>
5.1 [Data Ownership and Responsibility](#51-Data-Ownership-and-Responsibility)<br>
5.2 [Data Entry Guidelines (General Rules for Data Input)](#52-Data-Entry-Guidelines-General-Rules-for-Data-Input)<br>
5.3 [Data Format and Standardization](#53-Data-Format-and-Standardization)<br>

6. [The DPP Data Model: Overview of Data Points](#6-The-DPP-Data-Model-Overview-of-Data-Points)<br>
6.1 [Metadata](#61-Metadata)<br>
6.2 [Identification](#62-Identification)<br>
6.3 [Operation](#63-Operation)<br>
6.4 [Handling](#64-Handling)<br>
6.5 [Characteristics](#65-Characteristics)<br>
6.6 [Commercial](#66-Commercial)<br>
6.7 [Materials](#67-Materials)<br>
6.8 [Sustainability](#68-Sustainability)<br>
6.9 [Compliance](#69-Compliance)<br>
6.10 [Sources](#610-Sources)<br>
6.11 [Additional Data](#611-Additional-Data)<br>


    [Appendix 1: DPP Example](#Appendix-1-DPP-Example)<br>


## 1. Introduction

### 1.1 Goal of this Document

The DPP Rulebook aims to simplify and clarify the validation and usability of data in Digital Product Passports, ensuring that product information is accessible, accurate, and trustworthy for all stakeholders. By establishing straightforward rules, this guide enhances understanding and consistency in data usage across sectors, beginning with the automotive industry.

The main goal of this rulebook is twofold: it provides non-technical individuals with an easy-to-understand overview of the data model and offers actionable rules for data validation. For technical experts, the kit complements the existing data model by supporting effective implementation and compliance. Through user-friendly instructions and examples, the Data Trust Kit empowers diverse participants, fosters industry-wide trust, and makes adopting Digital Product Passports approachable and efficient for all involved parties.

### 1.2 Target Audience

This Rulebook is intended for professionals who are responsible for gathering, managing, or exchanging DPP data across the value chain (i.e., Data provider and data consumer) in Catena-X network : such as product managers, sustainability officers, and supply chain specialists. It is specifically crafted for users who may not have a deep technical or data modeling background but are tasked with utilizing the DPP data model. Technical details, schema structures, and integration specifics can be referenced in the data model, as needed. 

### 1.3 Scope and Applicability

The DPP Rulebook covers the interpretation and application of the agreed generic DPP data model, as mandated by ESPR. It provides general guidance, explains fundamental concepts, and sets out standardized procedures for managing product-related data. The Rulebook does not cover detailed technical implementation (e.g., IT system integration).

This rulebook refers to and is based on the Generic DPP Data Model, released in version 6.0.0.

### 1.4 Structure of this Rulebook

The Rulebook is organized to provide:
- Definitions and clarifications of key terms and concepts,
- General principles for handling and entering DPP data,
- Guidance and refernce to standards to help with Data Validation
  
The following sections present clear, actionable guidance and aggregate collective experience from multiple companies to help understand the data model.

*Note: Please note that the descriptions provided in this rulebook may differ from the technical descriptions in the data model; they have been adapted to make the content easier to understand for all users.*

Some data points in the generic digital product passport are quite open-ended and allow for different types of information. Because of this, it’s not always possible to set strict rules for what can be entered. For these data points, you can provide a wide range of content—as long as it makes sense and fits the purpose of the data point. While there aren’t rigid rules in these cases, it’s important to apply good judgement and ensure the information is relevant and clear. You’ll find helpful explanations and guidance for these open data points in their individual sections throughout this rulebook.

Some data points are grouped and there is a choice, if these data points are applicable or not. These groups of data points are described with subgroups within each section of the data model. This means that if there is an applicable field, it determines the obligation to fill the fields for all data points that are marked in a subsection of this applicable field.

## 2. The Value of Validated Data

Data trust is the cornerstone of effective collaboration within the automotive sector. It ensures that every piece of information exchanged is genuine, complete, and accurate, thus eliminating ambiguity and reducing the risk of misinformation. Trustworthy data empowers stakeholders; including manufacturers, suppliers, consumers, and regulators to make informed decisions, thereby enhancing operational efficiency and compliance across the supply chain.

The business value of validated data is substantial and multifaceted. Reliable data enhances decision-making, reduces operational risks, and elevates the credibility of companies within the industry. Validated data through DPPs enables:

- Improved Regulatory Compliance: Ensuring that data is precise and verified minimizing the risk of regulatory infractions and associated penalties.
- Enhanced Product Transparency: Providing clear, truthful information about product composition and sourcing builds consumer trust and strengthens brand reputation.
- Operational Efficiency: Accurate data streamlines processes by reducing errors, improving inventory management, and facilitating seamless communication across the supply chain.
- Strategic Advantage: Companies that embrace validated data can better forecast trends, optimize resource allocation, and innovate in product development.

Ultimately, the validation rulebook supports assuring data reliability. This is particularly important given the undeniable value of exchanging trustworthy data to enable effective digitalization of data exchange processes. It equips automotive companies, regardless of size, with the tools necessary to leverage data effectively, nurturing growth and sustainability in an increasingly digitalized market landscape.

## 3. Key Concepts and Definitions
### 3.1 DPP Overview

The Digital Product Passport (DPP) is a standardized digital record that travels with a product throughout its entire life cycle. It compiles and shares essential information—such as origin of materials, composition, repairability, and end-of-life options—across supply chains and with stakeholders (e.g., manufacturers, distributors, recyclers, and regulators).

DPPs are required by the Ecodesign for Sustainable Products Regulation (ESPR) as a cornerstone for enhanced transparency, sustainability, and circularity in product value chains. By digitalizing this information, ESPR aims to facilitate data-driven decisions, improve resource efficiency, and enable compliance with legislative obligations.

### 3.2 Definition of Terms

#### 3.2.1 DID:
Globally unique identifiers that do not require a centralized registration authority. Designed for decentralized identity systems (e.g., blockchain-based identity).

#### 3.2.2 GTIN: 
The Global Trade Item Number (GTIN) is a unique identifier used internationally to identify trade items (products and services) in the supply chain. It is part of the GS1 system of standards, which ensures consistency and interoperability across industries and countries.


#### 3.2.3 Sequential Numbering:
In ERP context it means Material numbers are assigned automatically in ascending order and hence it simplifies master data governance and avoids duplication.


#### 3.2.4 Verification vs. Validation

Currently, within initiatives such as Catena-X, Together for Sustainability (TfS), and the Partnership for Carbon Transparency (PACT), there exists a significant divergence in the interpretation of the terms "verification" and "validation." The following sub section provides a brief overview of the differing definitions.

> #### TfS:
> ##### Verification: 
> Process for evaluating an environmental information **statement based on historical data** and information to determine whether the statement conforms with the relevant criteria. 
> ##### Validation:
> Process for evaluating the plausibility of assumptions, limitations, and methods that support an environmental information **statement about the outcome of future activities**.
Two situations:
>- Projection of PCFs for existing products into the future: Reflecting changes in material source, sourcing of purchased parts, technology, tooling, energy mix etc..
>- Prediction of PCFs for new product developments not in serial production yet
The term “environmental information validation” is shortened to “validation” in this document to reduce sentence complexity and aid understanding.<br><br>
In the context of Together for Sustainability (TfS), "verification" refers to the evaluation of historical Product Carbon Footprints (PCFs), while "validation" pertains to the assessment of projected or future PCFs. These definitions are derived from ISO 14065:2020 and ISO 14066:2023. However, as these interpretations are highly specific to PCFs—and even within the PCF domain, definitions of verification and validation vary across initiatives such as PACT (as outlined below), a thorough evaluation has led to the conclusion that they are currently not well-suited for addressing "data plausibility" within Digital Product Passports

>#### PACT
>##### Verification: 
> The process of independently assessing whether reported PCF **data is accurate, complete, and conforms to a defined methodology** or standard. 
Based on the definition provided above, a simplified interpretation would be: "Determining whether the data has been calculated in accordance with established guidelines and standards."
>##### Validation:
> The process of confirming that the **methodology, assumptions, and data used** to estimate future or modeled PCFs are appropriate and reasonable.
In simpler terms, this can be understood as evaluating whether the data appears logical and internally consistent in terms of its content.<br><br>
This interpretation is consistent with the definitions found on Wikipedia and also closely reflects our own understanding of the terms "verification" and "validation."

>#### Definition for Validation & Verification in Standards & Regulations  
> The terms verification and validation are used in many standards and regulations, but their meanings can vary depending on the context. In general, verification is about checking whether something was done correctly, while validation is about making sure it meets the intended purpose or requirements. Below are selected definitions from key standards and regulations that illustrate how these terms are interpreted and applied in different domains.
>##### Verification: 
> The act of determining whether an operation has been accomplished correctly (ISO/TC 97/SC 1 N759)
>##### Validation:
>- Validation confirmation, through the provision of objective evidence, that the requirements for a specific intended use or application have been fulfilled (ISO 9000:2015)
>- "Validation data" means data used for providing an evaluation of the trained AI system and for tuning its non-learnable parameters and its learning process in order, inter alia, to prevent underfitting or overfitting; (Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence and amending Regulations (EC) No 300/2008, (EU) No 167/2013, (EU) No 168/2013, (EU) 2018/858, (EU) 2018/1139 and (EU) 2019/2144 and Directives 2014/90/EU, (EU) 2016/797 and (EU) 2020/1828 (Artificial Intelligence Act))
>- "Validation" means the process of verifying and confirming that data in electronic form are valid in accordance with this Regulation. (Regulation (EU) No 910/2014 of the European Parliament and of the Council of 23 July 2014 on electronic identification and trust services for electronic transactions in the internal market and repealing Directive 1999/93/EC)

#### Conclusion:
After thorough reserach of these standards and guidelines, the Data Trust team drew two conclusions:
- Verification refers to the process of assessing whether the submitted **data has been calculated in accordance with relevant guidelines and standards**. Validation, on the other hand, involves conducting plausibility checks to determine **whether the data is reasonable**, coherent, and suitable for exchange within supply chains
- Given the varying definitions of "verification" and "validation" across different platforms and use cases, achieving consensus on a single, universally applicable definition—particularly between contexts such as Digital Product Passports (DPPs) and Product Carbon Footprints (PCFs) has proven challenging. This is especially true considering the differing levels of maturity between these use cases.


### 3.3 Key Stakeholders and their Roles

A DPP system provides value across multiple parties throughout the supply chain. Understanding the main stakeholders and their roles can clarify responsibilities and improve collaboration:

- Product Manufacturers: Responsible for creating and updating the DPP with accurate product data (e.g., material content, production methods).
- Suppliers and Sub-suppliers: Provide upstream data (e.g., component/material details) for incorporation into finished product DPPs.
- Distributors and Retailers: Utilize DPP data for product traceability, compliance, and communication with customers.
- Recyclers and End-of-Life Facilities: Access DPP data to inform correct treatment and optimize resource recovery.
- Regulators and Auditors: May review DPP data for compliance with legal and sustainability requirements.
- Consumers and Business Customers: Can access selected DPP elements to make informed purchasing, usage, or recycling decisions.

Having clear roles and responsibilities for each stakeholder helps promote accountability and streamlines the flow of data throughout the product life cycle.
For further details on "Roles & responsibilities please read the [DIN EN 18239:2025-09 - Draft](https://www.dinmedia.de/en/draft-standard/din-en-18239/393949301)

## 4. Placement of DPP Rulebook within the Data Trust & Security KIT

As outlined in Section 3.2.4, the terms “Verification” and “Validation” are interpreted differently in differnet standards and guidelines, and harmonizing these definitions exceeds the scope of this working group. Hence, to avoid potential confusion associated with the terms "verification" and "validation,"  we have introduced a new term: “DPP Rulebook”. The Rulebook establishes a set of rules and criteria that enable both data providers and data consumers to assess the plausibility of data exchanged through DPPs. 
The Rulebook is a subset of the broader Data Trust and Security Kit, which is organized into three distinct pillars. Within this framework, the Rulebook represents the third layer, focusing on Data Content, as illustrated in the referenced diagram.

<img width="377" height="169" alt="image" src="https://github.com/user-attachments/assets/41aa555a-793b-4597-9ad7-e28e3f219834" />



This figure is taken from [Data Trust and Security Kit](https://eclipse-tractusx.github.io/docs-kits/kits/data-trust-and-security-kit/adoption-view/), where "Layer 3" references to this rulebook.


## 5. General Principles for Data Handling in the DPP Model

This section sets out the main rules and guiding principles for entering, managing, and sharing data within the Digital Product Passport (DPP) framework. Applying these principles ensures that DPP data is consistent, reliable, and useful throughout the entire value chain.

### 5.1 Data Ownership and Responsibility

- As usual in Catena-X, the data provider remains the data owner and is responsible for ensuring the correctness of the data.
- Owners are accountable for the accuracy, completeness, and timely updating of their data.
- Changes or updates to data should be tracked and, where appropriate, accompanied by a change log to ensure traceability using the predecessor identifier field in generic DPP data model.
- Data in the DPPs must be updated under any of the following conditions:
    - Changes in product characteristics (e.g. materials, design, certifications)
    - Regulatory updates (e.g. new or revised delegated/implementing acts)
    - Lifecycle events (e.g. manufacturing, repair, refurbishment, end-of-life)
    - New relevant information (e.g. discovery of substances of concern)
    - Service provider requirements (e.g. updates for data integrity and traceability)

### 5.2 Data Entry Guidelines (General Rules for Data Input)

- Provide the most accurate and up-to-date information available **at the time of DPP issuance**.
- Some groups of data points include an "Applicable" field that determines whether the related data points must be completed.
    - If "Applicable" is set to True, all related data points in that group are required and must be filled in.
    - If "Applicable" is set to False, none of the related data points should be filled.
    Separately, a data point marked as "Optional" means it can be filled in if relevant, but it is not mandatory to provide a value.
- Use consistent naming conventions and units (refer to Section 4.3).
- Do not use company-internal jargon, abbreviations, or codes unless these are defined in the DPP schema or Rulebook.

#### 5.2.1 Granularity
- Is there any rule already defined if or when data needs to be provided on a batch or instance level?


### 5.3 Data Format and Standardization
- Enter all data according to the format specified in the DPP model
   - When entering numerical data, the decimal separator should follow the language or regional conventions applied within the data system to ensure clarity and consistency.
   - All dates should be entered using the YYYY-MM-DD format
- For some data points, a value is paired with a unit. Usually, you have two data points: the first data point to describe the value and the second data point to describe the related unit.
- **Apply standardized identifiers (e.g., product codes, material codes, company identifiers such as VAT or DUNS numbers) if required.**
- For free text fields, keep entries clear and concise.
### 5.4 Data Trust
- Refer/Link to data trust KIT
- Trust anchors as defined in CatenaX ? Link?


## 6. The DPP Data Model: Overview of Data Points

This section provides a detailed overview of each data point in the Digital Product Passport (DPP) data model. For every data point, you will find the relevant regulatory references, its status as mandatory or optional, a clear description, and any specific rules that apply.

### 6.1 Metadata

Metadata encompasses the fundamental details of the digital product passport.

| Rule ID | Data Attribute            | Mandatory/ Optional | Regulatory Reference                                       |
|---------|---------------------------|---------------------|------------------------------------------------------------|
| 6.1.1   | Passport Identifier       | Mandatory           | Regulation (EU) 2024/1781                                  |
| 6.1.2   | Version                   | Mandatory           | Regulation (EU) 2024/1781, Article 9                       |
| 6.1.3   | Status                    | Optional            | Regulation (EU) 2024/1781                                  |
| 6.1.4   | Language                  | Mandatory           | Regulation (EU) 2024/1781                                  |
| 6.1.5   | Predecessor Identifier    | Mandatory           | Regulation (EU) 2024/1781                                  | 
| 6.1.6   | Registration Identifier   | Optional            | Regulation (EU) 2024/1781                                  |
| 6.1.7   | Backup Reference          | Mandatory           | Regulation (EU) 2024/1781                                  | 
| 6.1.8   | IssueDate                 | Mandatory           | Regulation (EU) 2024/1781                                  |
| 6.1.9   | ExpirationDate            | Mandatory           | Regulation (EU) 2024/1781, Article 9 (2)(i) and Article 11 | 
| 6.1.10  | Last Modification         | Optional            | Regulation (EU) 2024/1781                                  |
| 6.1.11  | Economic Operator ID      | Mandatory           | Regulation (EU) 2024/1781, Annex III, section (k)          | 
| 6.1.12  | Economic Operator Name    | Mandatory           | Regulation (EU) 2024/1781                                  |
| 6.1.13  | Economic Operator Contact | Mandatory           | Regulation (EU) 2024/1781                                  |
| 6.1.14  | Economic Operator Address | Mandatory           | Regulation (EU) 2024/1781                                  | 

#### 6.1.1 Passport Identifier

Unique identifier of the product passport.

> **Content Validation**<br>Must contain an unique identifier according to [RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace](https://dl.acm.org/doi/book/10.17487/RFC4122)

#### 6.1.2 Version

 The current version of the product passport.
> **Syntax**<br>The attribute must contain a version number of the passport in a string format & the updates must follow semantic versioning convention.

#### 6.1.3 Status

 The lifecycle stage of the product passport.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.1.4 Language

Specific language in which passport content is created.

> **Content Validation**<br>In accordance with [ISO 3166 - Country Codes](https://www.iso.org/iso-3166-country-codes.html) & [Code for individual languages and language groups](https://www.iso.org/standard/74575.html)

#### 6.1.5 Predecessor Identifier

*To be covered in next version*

#### 6.1.6 Registration Identifier  

*To be covered in next version*

#### 6.1.7 Backup Reference 

*To be covered in next version*

#### 6.1.8 IssueDate

The date when the product passport is initially issued.

> **Content Validation**<br>Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html)

#### 6.1.9 ExpirationDate

The date until the product passport remains available.

> **Content Validation**<br>Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html).

#### 6.1.10 Last Modification

*To be covered in next version*

#### 6.1.11 Economic Operator ID

Identification of the economic operator responsible for the passport.

> **Syntax**<br> To be checked via regular expression based checks.

> **Content Validation**<br>The BPNL is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members. For companies that are not in the Catena-X network, CIN in accordance with [ISO/ICE 15459-1:2014](https://www.iso.org/standard/54779.html) could be used.

#### 6.1.12 Economic Operator Name

*To be covered in next version*

#### 6.1.13 Economic Operator Contact

*To be covered in next version*

#### 6.1.14 Economic Operator Address

*To be covered in next version*

### 6.2 Identification

The Identification section includes attributes needed for uniquely identifying the product and its characteristics.

| Rule ID | Data Attribute             | Mandatory/ Optional | Regulatory Reference                                          |
|---------|----------------------------|---------------------|---------------------------------------------------------------|
| 2.1     | Serial Key                 | Optional            | Regulation (EU) 2024/1781, Annex III(b) and Article 10(1)(f)  |
| 2.2     | Serial Value               | Optional            | Regulation (EU) 2024/1781, Recital (33)                       |
| 2.3     | Batch Key                  | Optional            | Regulation (EU) 2024/1781, Recital (33)                       |
| 2.4     | Batch Value                | Optional            | Regulation (EU) 2024/1781                                     |
| 2.5     | Manufacturer Part ID       | Mandatory           | Regulation (EU) 2024/1781, Recital (33)                       |
| 2.6     | Name at Manufacturer       | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.7     | Code Key                   | Mandatory           | Regulation (EU) 2024/1781, Annex III(b-c)                     |
| 2.8     | Code Value                 | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.9     | Code Description           | Optional            | Regulation (EU) 2024/1781                                     |
| 2.10    | Carrier Type               | Optional            | Regulation (EU) 2024/1781, Article 2(29)                      |
| 2.11    | Carrier Position           | Optional            | Regulation (EU) 2024/1781, Article 8(2)(c)                    |
| 2.12    | Classification Standard    | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.13    | Classification ID          | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.14    | Classification Description | Optional            | Regulation (EU) 2024/1781                                     |
| 2.15    | Picture                    | *To be covered in next version* | Optional| | | |


#### 6.2.1 Serial Key 

The key for local identification of a serial part.

At present, there is no universally recognized industry standard that can be referenced in this context. It is therefore recommended to follow the internal guidelines established by your organization.


#### 6.2.2 Serial Value

The value associated with the serial key.

> **Syntax**<br>If provided, the attribute must describe the unique serial key.

#### 6.2.3 Batch Key  

The key for local identification of a batch information. 

> **Content Validation**<br>The attribute must conform to one of the predefined identifier types or custom keys used by your company. There is currently no universally adopted standard across the industry. However, sectors such as chemicals and manufacturing commonly apply Sequential Material Numbering as a best practice. This approach has been validated by the 2021 industry rankings and benchmarking studies.

#### 6.2.4 Batch Value 

The value associated with the batch key.

> **Syntax**<br>If provided, attribute must describe the associated batch key

#### 6.2.5 Manufacturer Part ID

 Unique identifier for the part model or type assigned by the manufacturer, defining version-specific part identification.

> **Content Validation**<br>The attribute must conform to one of the predefined identifier types or custom keys used by your company. There is currently no universally adopted standard across the industry. However, sectors such as chemicals and manufacturing commonly apply Sequential Material Numbering as a best practice. This approach has been validated by the 2021 industry rankings and benchmarking studies.

#### 6.2.6 Name at Manufacturer 

The name of the part provided by the manufacturer.

> **Content Validation**<br>Must contain the Name of the Part as assigned by the manufacturer. At present, there is no universally recognized industry standard that can be referenced in this context. It is therefore recommended to follow the internal guidelines established by your organization.

#### 6.2.7 Code Key 

The code key for product identification.

> **Syntax**<br>Must be a valid identifier code such as [Global Trade Item Number (GTIN)](https://ref.gs1.org/standards/gtin-management/), [Decentralized Identifier (DID)](https://www.w3.org/TR/did-1.0/), [International Standard Book Number (ISBN)](https://www.iso.org/standard/65483.html#:~:text=ISO%202108%3A2017%20establishes%20the%20specifications%20for%20the%20International,specific%20publisher%20that%20is%20available%20to%20the%20public.), etc.

#### 6.2.8 Code Value 

The identifier value related to the code key.

> **Syntax**<br>Must be a valid identifier code as defined in [Global Trade Item Number (GTIN)](https://ref.gs1.org/standards/gtin-management/), [Decentralized Identifier (DID)](https://www.w3.org/TR/did-1.0/), [International Standard Book Number (ISBN)](https://www.iso.org/standard/65483.html#:~:text=ISO%202108%3A2017%20establishes%20the%20specifications%20for%20the%20International,specific%20publisher%20that%20is%20available%20to%20the%20public.), etc.

#### 6.2.9 Code Description 

*To be covered in next version*

#### 6.2.10 Carrier Type 

The type of data carrier used for product identification. The format of a Product Passport is typically digital and can be implemented through various technologies to ensure accessibility and interoperability. "Data carrier" means a linear barcode symbol, a two-dimensional symbol or other automatic identification data capture medium that can be read by a device.

> **Content Validation**<br>Must align with recognizable  data carrier types like QR, barcode, etc. in accordance with [Regulation (EU) 2024/1781](https://miro.com/app/board/uXjVITCCA9U=/?moveToWidget=3458764641065984843&cot=14)

#### 6.2.11 Carrier Position 

The spatial arrangement or position of the data carrier on the product.

> **Content Validation**<br>If specified, the attribute must describe the carrier's positioning in accordance with [Regulation (EU) 2024/1781](https://miro.com/app/board/uXjVITCCA9U=/?moveToWidget=3458764641065984843&cot=14)

#### 6.2.12 Classification Standard 

Outlines classification standards for parts.

> **Content Validation**<br>Must refer to known standards in classification e.g., [ECLASS 15](https://eclass.eu/aktuelles/news/eclass-release-150-ab-sofort-verfuegbar) for automotive industry. 

#### 6.2.13 Classification ID   

The identifier for the part classification standard according to related key-value pairs. 

> **Content Validation**<br>Must correspond with the classification standard used e.g., Vehicle Identification Number (VIN) defined in accordance with [ISO ISO 3779](https://www.iso.org/standard/52200.html) and [ISO 4030](https://www.iso.org/standard/9721.html)

#### 6.2.14 Classification Description

Optional property describing the classification standard.

> **Content Validation**<br>Must correspond with the classification standard used e.g., Vehicle Identification Number (VIN) defined in accordance with [ISO ISO 3779](https://www.iso.org/standard/52200.html) and [ISO 4030](https://www.iso.org/standard/9721.html)

#### 6.2.15 Picture

*To be covered in next version*


### 5.3 Operation
The "Operations" category refers to a structured set of data that describes the activities, processes, and lifecycle events associated with a product.

| Rule ID | Data Attribute                                                       | Mandatory/ Optional | Regulatory Reference                             |
|---------|----------------------------------------------------------------------|---------------------|--------------------------------------------------|
| 3.1     | Facility ID                                                          | Mandatory           | Regulation (EU) 2024/1781, Annex III(i)          |
| 3.2     | Facility Address                                                     | *To be covered in next version* | | 
| 3.3     | Manufacturer ID                                                      | Mandatory           | Regulation (EU) 2024/1781, Annex III(h) & (k)    |
| 3.4     | Manufacturer Name                                                    | *To be covered in next version* | | 
| 3.5     | Manufacturer Contact                                                 | *To be covered in next version* | | 
| 3.6     | Manufacturer Address                                                 | *To be covered in next version* | | 
| 3.7     | Manufacturing Date                                                   | Mandatory           | Mandatory | Regulation (EU) 2024/1781, Annex III | 
| 3.8     | Applicable                                                           | Mandatory           | Regulation (EU) 2024/1781, Annex III             |
| 3.8.1   | EORI                                                                 | Mandatory           | Regulation (EU) 2024/1781, Annex III(j)          |
| 3.8.2   | Importer Identification                                              | Mandatory           | Regulation (EU) 2024/1781, Annex III(j)          |
| 3.8.3   | Importer Name                                                        | *To be covered in next version* | | 
| 3.8.4   | Importer Contact                                                     | *To be covered in next version* | | 
| 3.8.5   | Importer Address                                                     | *To be covered in next version* | | 
| 3.14    | Other Operator ID                                                    | Mandatory           | Regulation (EU) 2024/1781, Annex III             |
| 3.15    | Other Operator Name                                                  | *To be covered in next version* | | 
| 3.16    | Other Operator Contact                                               | *To be covered in next version* | | 
| 3.17    | Other Operator Address                                               | *To be covered in next version* | | 
| 3.18    | Other Operator Role                                                  | Mandatory           | Regulation (EU) 2024/1781, Annex III             |
| 3.19    | Symbol of Extended Producer Responsibility Scheme                    | *To be covered in next version* | | 
| 3.20    | Territory of Extended Producer Responsibility Scheme                 | *To be covered in next version* | | 
| 3.21    | Collection Points of Extended Producer Responsibility Scheme ID      | *To be covered in next version* | | 
| 3.22    | Collection Points of Extended Producer Responsibility Scheme Address | *To be covered in next version* | | 

#### 6.3.1 Facility ID 

The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNA is provided.

> **Content Validation**<br>The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

#### 6.3.2 Facility Address

*To be covered in next version*

#### 6.3.3 Manufacturer ID

 Manufacturer identification (The main manufacturer, if different from the passport owner, represented by an identification number) refers to the requirement for clear and traceable information about the manufacturer or responsible economic operator of a product placed on the EU market. 

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNA is provided.

> **Content Validation**<br>The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

#### 6.3.4 Manufacturer Name

*To be covered in next version*

#### 6.3.5 Manufacturer Contact

*To be covered in next version*

#### 6.3.6 Manufacturer Address 

*To be covered in next version*

#### 6.3.7 Manufacturing Date

Represents the date of final product manufacturing (e.g. final quality check, ready-for-shipment event).

> **Syntax**<br>Validity should be verified using regular expression-based checks

> **Content Validation**<br>Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html)

#### 6.3.8 Applicable

 Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.

> **Syntax**<br>If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 6.3.9 EORI

An EORI number (Economic Operators Registration and Identification number) is a unique identification number assigned by a customs authority in the European Union to businesses and individuals involved in importing or exporting goods into or out of the EU.

> **Syntax**<br>Validity should be verified using regular expression-based checks

> **Content Validation**<br>The EORI number must be in accordance to [Regulation (EU) No 952/2013](https://eur-lex.europa.eu/eli/reg/2013/952/oj/eng) which provides the legal basis for the EORI system.

#### 6.3.10 Importer Identification

Importer identification (The importer of the product) refers to the requirement to clearly and reliably identify the importer of a product that is placed on the EU market, especially when the manufacturer is based outside the EU, ensuring product traceability. 

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNL is provided.

> **Content Validation**<br>The BPNL is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

#### 6.3.11 Importer Name

*To be covered in next version*

#### 6.3.12 Importer Contact 

*To be covered in next version*

#### 6.3.13 Importer Address 

*To be covered in next version*

#### 6.3.14 Other Operator ID  

OtherImporterID is a secondary or additional identifier used to uniquely reference an importer other than the primary one listed for a product. This may be relevant when: 1- Multiple importers are involved in placing the same product model on the EU market. 2- A product is distributed through different channels or subsidiaries. 3- There is a need to track alternative or backup importers for traceability and compliance purposes. 

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.3.15 Other Operator Name 

*To be covered in next version*

#### 6.3.16 Other Operator Contact 

*To be covered in next version*

#### 6.3.17 Other Operator Address 

*To be covered in next version*

#### 6.3.18 Other Operator Role 

This field is used to specify the "Role" of the other operator (e.g., Distributor). 

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.3.19 Symbol of Extended Producer Responsibility Scheme   

*To be covered in next version*

#### 6.3.20 Territory of Extended Producer Responsibility Scheme

*To be covered in next version*

#### 6.3.21 Collection Points of Extended Producer Responsibility Scheme ID  

*To be covered in next version*

#### 6.3.22 Collection Points of Extended Producer Responsibility Scheme Address 

*To be covered in next version*

### 6.4 Handling
"Handling" refers to the information related to the safe, appropriate, and sustainable management of a product or component throughout its lifecycle.

| Rule ID | Data Attribute            | Mandatory/ Optional | Regulatory Reference       |
|---------|---------------------------|---------------------|----------------------------|
| 4.1     | Applicable                | Mandatory           |                            |
| 4.1.1   | Sources Identification    | Mandatory           |                            |
| 4.1.2   | Sources Contact           | *To be covered in next version* | |
| 4.1.3   | Sources Address           | *To be covered in next version* | |
| 4.1.4   | Manufacturer Part ID      | Mandatory           |                            | 
| 4.1.5   | Name at Manufacturer      | Mandatory           |                            |

#### 6.4.1 Applicable

Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.

> **Syntax**<br>If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 6.4.2 Sources Identification

Identifies sources of spare parts for the product via unique identifiers of producers, important for traceability and supply chain management.

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNL is provided.

> **Content Validation**<br>The BPNL is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

#### 6.4.3 Sources Contact   

*To be covered in next version*

#### 6.4.4 Sources Address  

*To be covered in next version*

#### 6.4.5 Manufacturer Part ID    

Part ID as assigned by the manufacturer of the part. The Part ID identifies the part in the manufacturer`s dataspace. The Part ID references a specific version of a part. The version number must be included in the Part ID if it is available.

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.4.6 Name at Manufacturer  

Name of the spare part as assigned by the manufacturer.

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

### 6.5 Characteristics

The "Characteristics" category refers to a set of descriptive attributes that define the physical, functional, and environmental properties of a product. These characteristics are essential for assessing a product’s sustainability performance and are typically included in the Digital Product Passport (DPP).
 
Key elements under this category may include:
<br>1- Physical attributes: Size, weight, dimensions, color, and material composition.
<br>2- Functional properties: Intended use, performance capabilities, and compatibility.
<br>3- Lifecycle information: Expected lifespan, maintenance needs, and end-of-life options.
 
These characteristics enable standardized documentation, comparability across products, and informed decision-making by stakeholders such as consumers, manufacturers, and regulators.

| Rule ID | Data Attribute              | Mandatory/ Optional | Regulatory Reference                 | 
|---------|-----------------------------|---------------------|--------------------------------------|
| 5.1     | Life Type                   | Mandatory           | Regulation (EU) 2024/1781, Annex I   |
| 5.2     | Life Value                  | Mandatory           | Regulation (EU) 2024/1781, Annex I   | 
| 5.3     | Life Unit                   | Mandatory           | Regulation (EU) 2024/1781, Annex I   | 
| 5.4     | Value (Width)               | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.5     | Unit (Width)                | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.6     |  Value (Length)             | Optional            | Regulation (EU) 2024/1781, Article 7 |
| 5.7     | Unit (Length)               | Optional            | Regulation (EU) 2024/1781, Article 7 |
| 5.8     |  Value (Diameter)           | Optional            | Regulation (EU) 2024/1781, Article 7 |
| 5.9     | Unit (Diameter)             | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.10    |  Value (Height)             | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.11    | Unit (Height)               | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.12    |  Value (Gross Weight)       | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.13    | Unit (Gross Weight)         |Mandatory            | Regulation (EU) 2024/1781, Article 7 | 
| 5.14    |  Value (Volume)             | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.15    | Unit (Volume)               | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.16    |  Value (Gross Volume)       | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.17    | Unit (Gross Volume)         | Mandatory           | Regulation (EU) 2024/1781, Article 7 |
| 5.18    |  Value (Weight)             | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.19    | Unit (Weight)               | Mandatory           | Regulation (EU) 2024/1781, Article 7 | 
| 5.20    |  Value (Item Quantity)      | *To be covered in next version* | | | | |
| 5.21    | Unit Item Quantity          | *To be covered in next version* | | | | |
| 5.22    | Physical State              | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.23    | General Performance Class   | Optional            | Regulation (EU) 2024/1781, Article 7 | 
| 5.24    | Other Characteristic Name   | *To be covered in next version* | | | | |
| 5.25    | Other Characteristic Outcome| *To be covered in next version* | | | | |

#### 6.5.1 Life Type

"Lifetime" under the Ecodesign for Sustainable Products Regulation (ESPR) refers to the period during which a product or its components are expected to remain functional, safe, and fit for use, under normal or intended conditions, without excessive performance degradation. It is a key indicator of durability and reliability, and may be expressed through: <br>1- Guaranteed lifetime (e.g., warranty or legal durability claim) <br>2- Technical lifetime (based on product design and performance testing) <br>3- Mean Time Between Failures (MTBF)

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.2 Life Value

The numeric value describing the product’s lifespan in terms of the specified type.

> **Syntax**<br>Must be a valid integer for lifespan value and must be > 0. 

#### 6.5.3 Life Unit

The unit corresponding to the respective lifespan, specified using one of the following standardized units: day, month, cycle, year, or running/operating hour.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.4 Value (Width)

Represents the width of the item.

> **Syntax**<br>Must be a valid float representing width and must be > 0. 

#### 6.5.5 Unit (Width)

Specifies unit of measure for widths.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options


#### 6.5.6 Value (Length)

The length of the item.

> **Syntax**<br>Valid float for length value required and must be > 0. 

#### 6.5.7 Unit (Length)

Defines unit used for measuring length.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options


#### 6.5.8 Value (Diameter)

Specifies diameter of the item.

> **Syntax**<br>Must be float for diameter and must be > 0. 

#### 6.5.9 Unit (Diameter)

Indicates unit for diameter measurements.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options


#### 6.5.10 Value (Height)

Measures height of the item.

> **Syntax**<br>Requires a float value corresponding to height and must be > 0. 

#### 6.5.11 Unit (Height)

Defines unit of height measure.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.12 Value (Gross Weight)

Specifies total weight of the item including packaging.

> **Syntax**<br>Must be valid float to reflect gross weight and must be > 0. 

#### 6.5.13 Unit (Gross Weight)

Defines measurement unit for gross weight.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options


#### 6.5.14 Value (Volume)

Measures product’s volume.

> **Syntax**<br>Valid float required for volume and must be > 0. 

#### 6.5.15 Unit (Volume)

Defines the unit to express volume measurements.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options


#### 6.5.16 Value (Gross Volume)

Represents gross volume of the product including packaging.

> **Syntax**<br>Must be valid float for gross volume and must be > 0. 

#### 6.5.17 Unit (Gross Volume)

Specifies measurement unit for gross volume.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.18 Value (Weight)

Details the weight of the product.

> **Syntax**<br>Must be valid float representing weight and must be > 0. 

#### 6.5.19 Unit (Weight)

Defines unit of weight measures.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.20 Value (Item Quantity)

*To be covered in next version* 

#### 6.5.21 Unit Item Quantity

*To be covered in next version* 

#### 6.5.22 Physical State

The physical state of a product refers to the form in which raw materials, intermediates, or finished goods exist during production, handling, and distribution. It determines how the product is processed, stored, and transported, and typically falls into one of the following categories: Solid, liquid, gas, powder/granular

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 6.5.23 General Performance Class

Characterizes product performance in a graded class system, promoting consumer decision-making based on efficiency.

> **Content Validation**<br>Perforance class must be defined in compliance to [ESPR, Article 7](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1781&qid=1719580391746) when made available by EU. Performance classes have been established for certain sectors, such as automotive batteries; however, they have not yet been defined for sectors like chemical. Therefore, it is recommended to assess the relevance of performance classes in the context of your specific sector and use case.

#### 6.5.24 Other Characteristic Name

*To be covered in next version*

#### 6.5.25 Other Characteristic Outcome

*To be covered in next version*

### 6.6 Commercial

| Rule ID | Data Attribute      | Mandatory/ Optional | Regulatory Reference     |
|---------|---------------------|---------------------|--------------------------|
| 6.1     | Placed On Market    | Mandatory           |                          |
| 6.2     | Purpose             | Mandatory           |                          |
| 6.3     | Purchase Order      | Optional            |                          |
| 6.4     | Recall Information  | Mandatory           | Regulation (EU) 2023/988 |

#### 6.1 Placed On Market 

The timestamp in the format (yyyy-mm-dd) with or without time zone when the product was put in the market.

> **Syntax**<br>Its validity can be verified using regular expression-based checks  
> **Content Validation**<br>Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html)

#### 6.2 Purpose

Specify one or more target industries for the product described in the Digital Product Passport. If exchanged via Catena-X, 'automotive ' is a must choice included in the list.

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.3 Purchase Order 

A unique identifier assigned to the order of the product for tracking purposes between the supplier and customer.

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook) 

#### 6.4 Recall Information

Recall information refers to the data and documentation associated with the process of removing a product from the market due to safety, quality, or compliance concerns.

> **Content Validation**<br>Information on dangerous products should, in general, be made available to the public via the [EU Safety Gate Portal](https://ec.europa.eu/safety-gate/#/screen/home)
### 6.7 Materials

"Materials" category refers to: The classification and specification of the substances and material types used in a product, with a focus on their environmental performance, circularity potential, and criticality.

| Rule ID | Data Attribute                                   | Mandatory/ Optional | Regulatory Reference                  |
|---------|--------------------------------------------------|---------------------|---------------------------------------|
| 7.1     | Applicable (Substances of Concern)               | Mandatory           | Regulation (EU) 2024/1781             |
| 7.1.1   | Chemical ID (Substances of Concern)              | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.2   | List Type ID (Substances of Concern)             | Mandatory           | Regulation (EU) 2024/1781, Article 7   | 
| 7.1.3   | Chemical Name (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.4   | Material Unit (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.5   | Concentration (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.6   | Min Concentration (Substances of Concern)        | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.7   | Max Concentration (Substances of Concern)        | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.8   | Location of Substances (Substances of Concern)   | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.9   | Exemption for Substances (Substances of Concern) | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.10  | Hazard Category (Substances of Concern)          | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.11  | Hazard Class (Substances of Concern)             | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.12  | Hazard Statement (Substances of Concern)         | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.13  | Documentation                                    | *To be covered in next version* | | | | |
| 7.2     | Applicable (Material Composition)                | Mandatory           | Regulation (EU) 2024/1781             |
| 7.2.1   | Component Name                                   | *To be covered in next version* | | | | |
| 7.2.2   | Component Code                                   | *To be covered in next version* | | | | |
| 7.2.3   | Component Description                            | *To be covered in next version* | | | | |
| 7.2.4   | Component Location                               | *To be covered in next version* | | | | |
| 7.2.5   | Sorting Information                              | *To be covered in next version* | | | | |
| 7.2.6   | Component Passport Identifier                    | *To be covered in next version* | | | | |
| 7.2.7   | Chemical ID (Material Composition)               | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.2.8   | List Type ID (Material Composition)              | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.2.9   | Chemical Name (Material Composition)             | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.2.10  | Material Type                                    | *To be covered in next version* | | | | |
| 7.2.11  | Material Origin                                  | *To be covered in next version* | | | | |
| 7.2.12  | Material Passport Identifier                     | *To be covered in next version* | | | | |
| 7.2.13  | Material Unit                                    | *To be covered in next version* | | | | |
| 7.2.14  | Concentration                                    | *To be covered in next version* | | | | |
| 7.2.15  | Min Concentration                                | *To be covered in next version* | | | | |
| 7.2.16  | Max Concentration                                | *To be covered in next version* | | | | |
| 7.2.17  | Location                                         | *To be covered in next version* | | | | |
| 7.2.18  | Recycled                                         | *To be covered in next version* | | | | |
| 7.2.19  | Documentation                                    | *To be covered in next version* | | | | |
| 7.3.1   | List Name (Declarable Ingredient List)           | *To be covered in next version* | | | | |
| 7.3.2   | Document ID (Declarable Ingredient List)         | *To be covered in next version* | | | | |
| 7.3.3   | Documentation (Declarable Ingredient List)       | *To be covered in next version* | | | | |

#### 7.1.1 Applicable (Substances of Concern)

 Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled 

> **Syntax**<br>If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 7.1.2 Chemical ID (Substances of Concern)

A Chemical ID is a unique identifier assigned to a chemical substance to ensure consistent reference, tracking, and management across databases, regulatory systems, and supply chains. It may correspond to standardized identifiers such as CAS Number (Chemical Abstracts Service), EC Number (European Community), or internal system-specific codes. The Chemical ID facilitates accurate identification, classification, and communication of chemical information, including composition, hazards, and regulatory status

> **Content Validation**<br>The chemical material ID and its identification  (Chemical name) shall be provided in accordance with [International Union of Pure and Applied Chemistry (IUPAC) nomenclature standards](https://iupac.org/what-we-do/books/bluebook/). Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., [CAS](https://www.cas.org/cas-data/cas-registry), [EC](https://echa.europa.eu/about-ec-and-list-numbers)) are also acceptable. 

#### 7.1.3 List Type ID (Substances of Concern)

This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.1.4 Chemical Name (Substances of Concern)

The name of the material which is present in the product.

> **Content Validation**<br>The chemical material ID and its identification (Chemical name) shall be provided in accordance with [International Union of Pure and Applied Chemistry (IUPAC) nomenclature standards](https://iupac.org/what-we-do/books/bluebook/). Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., [CAS](https://www.cas.org/cas-data/cas-registry), [EC](https://echa.europa.eu/about-ec-and-list-numbers)) are also acceptable.

#### 7.1.5 Material Unit (Substances of Concern)

This field defines the unit of concentration, selected from a predefined enumeration. Permissible units include mass percent, volume percent, parts per thousand (ppt), parts per million (ppm), parts per billion (ppb), and parts per trillion (ppt)

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.1.6 Concentration (Substances of Concern)

Concentration of the material at the level of the product

> **Syntax**<br>The value must be > = 0 

#### 7.1.7 Min Concentration (Substances of Concern)

The minimum concentration of the substance of concern at the level of the product

> **Syntax**<br>The value must be > = 0 

#### 7.1.8 Max Concentration (Substances of Concern)

The maximum concentration of the substance of concern at the level of the product

> **Syntax**<br>The value must be > = 0 

#### 7.1.9 Location of Substances (Substances of Concern)

The location of the substances of concern within the product <br> Further decsription: <br>This requires specifying the exact location of the substance of concern within the product—for example, whether it is contained in the packaging or integrated into the product itself

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 7.1.10 Exemption for Substances (Substances of Concern)

Exemptions to the substance of concern: An exemption to the substance of concern refers to a formally recognized exception that permits the use or presence of a regulated or restricted chemical substance within a product or component, under specific conditions. The exemption must be documented and justified in accordance with applicable legal frameworks (e.g., REACH, RoHS), and may be subject to review, expiration, or renewal.

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 7.1.11 Hazard Category (Substances of Concern)

A hazard category is a classification level within a hazard class that indicates the severity or degree of risk associated with a chemical substance or mixture. It refers to the the division of criteria within each hazard class, specifying hazard severity. Lower category numbers typically represent higher hazard severity (e.g., Category 1 is more hazardous than Category 2)

> **Content Validation**<br>Valid hazard category statement required. Hazard category defined in compliance with the EU standard as outlined in [Article 2 of Regulation (EC) No 1272/2008](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.12 Hazard Class (Substances of Concern)

Hazard class means the nature of the physical, health or environmental hazard.

> **Content Validation**<br>Hazard category defined in accordance to:[<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.13 Hazard Statement (Substances of Concern)

A hazard statement is a standardized phrase assigned to a chemical substance or mixture that describes the nature and, where appropriate, the degree of hazard associated with it. Each hazard statement is associated with a unique code (e.g., H315, H301) to ensure consistency and clarity in hazard communication

> **Content Validation**<br>Hazard category defined in accordance to:[<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.14 Documentation

 *To be covered in next version*

#### 7.2.1 Applicable (Material Composition)

Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled

> **Syntax**<br>If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 7.2.2 Component Name

 *To be covered in next version*

#### 7.2.3 Component Code  

 *To be covered in next version*
 
#### 7.2.4 Component Description 

 *To be covered in next version*
 
#### 7.2.5 Component Location 

 *To be covered in next version*
 
#### 7.2.6 Sorting Information  

 *To be covered in next version*
 
#### 7.2.7 Component Passport Identifier

 *To be covered in next version*
 
#### 7.2.8 Chemical ID (Material Composition)

A Chemical ID is a unique identifier assigned to a chemical substance to ensure consistent reference, tracking, and management across databases, regulatory systems, and supply chains. It may correspond to standardized identifiers such as CAS Number (Chemical Abstracts Service), EC Number (European Community), or internal system-specific codes. The Chemical ID facilitates accurate identification, classification, and communication of chemical information, including composition, hazards, and regulatory status

> **Content Validation**<br>The chemical material ID and its identification (Chemical name) shall be provided in accordance with [International Union of Pure and Applied Chemistry (IUPAC) nomenclature standards](https://iupac.org/what-we-do/books/bluebook/). Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., [CAS](https://www.cas.org/cas-data/cas-registry), [EC](https://echa.europa.eu/about-ec-and-list-numbers)) are also acceptable.

#### 7.2.9 List Type ID (Material Composition)

This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.2.10 Chemical Name (Material Composition)

The name of the material which is present in the product.

> **Content Validation**<br>The chemical material ID and its identification (Chemical name) shall be provided in accordance with [International Union of Pure and Applied Chemistry (IUPAC) nomenclature standards](https://iupac.org/what-we-do/books/bluebook/). Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., [CAS](https://www.cas.org/cas-data/cas-registry), [EC](https://echa.europa.eu/about-ec-and-list-numbers)) are also acceptable.

#### 7.2.11 Material Type   

 *To be covered in next version*
     
#### 7.2.12 Material Origin    

 *To be covered in next version*
     
#### 7.2.13 Material Passport Identifier  

 *To be covered in next version*
      
#### 7.2.14 Material Unit

 *To be covered in next version*
             
#### 7.2.15 Concentration 

 *To be covered in next version*
          
#### 7.2.16 Min Concentration 

 *To be covered in next version*
        
#### 7.2.17 Max Concentration 

 *To be covered in next version*
           
#### 7.2.18 Location        

 *To be covered in next version*
      
#### 7.2.19 Recycled        

 *To be covered in next version*
      
#### 7.2.20 Documentation   

 *To be covered in next version*
      
#### 7.3.1 List Name (Declarable Ingredient List)       

 *To be covered in next version*
         
#### 7.3.2 Document ID (Declarable Ingredient List)     

 *To be covered in next version*
      
#### 7.3.3 Documentation (Declarable Ingredient List)   

 *To be covered in next version*
      


### 6.8 Sustainability

| Rule ID | Data Attribute                                      | Mandatory/ Optional | Regulatory Reference                                        |
|---------|-----------------------------------------------------|---------------------|-------------------------------------------------------------|
| 8.1     | State                                               | Mandatory           | ESPR proposal from March 30th, 2022 Annex I.                |
| 8.2     | value (product carbon footprint)                    | Mandatory           | ESPR proposal from March 30th, 2022 Annex I.                |
| 8.3     | footprintUnit(product carbon footprint)             | Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.4     | footprintType(product carbon footprint)             | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 7  |
| 8.5     | footprintLifecycle(product carbon footprint)        | Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.6     | performanceClass(product carbon footprint)          | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 2  |
| 8.7     | facility(product carbon footprint)                  | Mandatory           | ESPR provisional agreement from January 9th 2024 Annex III  |
| 8.8     | Facility Address                                    | *To be covered in next version* | | | | |
| 8.9     | Rulebook                                            | *To be covered in next version* | | | | |
| 8.10    | Declaration                                         | *To be covered in next version* | | | | |
| 8.11    | value (product environmental footprint)             | Optional            |  ESPR proposal from March 30th, 2022 Annex I                |
| 8.12    | footprintUnit (product environmental footprint)     | Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.13    | footprintType (product environmental footprint)     | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 7  |
| 8.14    | footprintLifecycle (product environmental footprint)| Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.15    | performanceClass (product environmental footprint)  | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 2  |
| 8.16    | facility (product environmental footprint)          | Mandatory           | ESPR provisional agreement from January 9th 2024 Annex III  |
| 8.17    | Facility Address                                    | *To be covered in next version* | | | | |
| 8.18    | Rulebook                                            | *To be covered in next version* | | | | |
| 8.19    | Declaration                                         | *To be covered in next version* | | | | |
| 8.20    | value (product material footprint)                  | Optional            | ESPR proposal from March 30th, 2022 Annex I                 |
| 8.21    | footprintUnit (product material footprint)          | Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.22    | footprintType (product material footprint)          | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 7  |
| 8.23    | footprintLifecycle (product material footprint)     | Mandatory           | ESPR provisional agreement from January 9th, 2024 Annex I   |
| 8.24    | performanceClass (product material footprint)       | Mandatory           | ESPR provisional agreement from January 9th 2024 Article 2  |
| 8.25    | facility (product material footprint)               | Mandatory           | ESPR provisional agreement from January 9th 2024 Annex III  |
| 8.26    | Facility Address                                    | *To be covered in next version* | | | | |
| 8.27    | Rulebook                                            | *To be covered in next version* | | | | |
| 8.28    | Declaration                                         | *To be covered in next version* | | | | |
| 8.29    | Reparability Score                                  | Mandatory           | ESPR provisional agreement from January 9th, 2024 Article 7 |
| 8.30    | Durability Score                                    | Mandatory           | ESPR provisional agreement from January 9th, 2024 Article 7 |
| 8.31    | Reuse Info                                          | *To be covered in next version* | | | | |
| 8.32    | Reuse System Identification                         | *To be covered in next version* | | | | |
| 8.33    | Symbol of Deposit and Return System                 | *To be covered in next version* | | | | |
| 8.34    | Rotation Estimation Key                             | *To be covered in next version* | | | | |
| 8.35    | Rotation Estimation Value                           | *To be covered in next version* | | | | |
| 8.36    | Rotation Calculation Key                            | *To be covered in next version* | | | | |
| 8.37    | Rotation Calculation Value                          | *To be covered in next version* | | | | |
| 8.38    | Trip Estimation Key                                 | *To be covered in next version* | | | | |
| 8.39    | Trip Estimation Value                               | *To be covered in next version* | | | | |
| 8.40    | Trip Calculation Key                                | *To be covered in next version* | | | | |
| 8.41    | Trip Calculation Value                              | *To be covered in next version* | | | | |
| 8.42    | Facilitates Tracking Reusable Product Address ID    | *To be covered in next version* | | | | |
| 8.43    | Facilitates Tracking Reusable Product Address       | *To be covered in next version* | | | | |
| 8.44    | Collection Points Reusable Product ID               | *To be covered in next version* | | | | |
| 8.45    | Collection Points Reusable Product Address          | *To be covered in next version* | | | | |
| 8.46    | Recyclability Performance Grade                     | *To be covered in next version* | | | | |


#### 6.8.1 State

The current condition or lifecycle phase of a product, as recorded in the Digital Product Passport, indicating whether the product is new, used, repaired, refurbished, remanufactured, or at end-of-life, in order to support traceability, circularity, and sustainability objectives.

> **Syntax**<br>For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.

#### 6.8.2 value (product carbon footprint)

The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;

> **Content Validation**<br>In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf) and Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html)

#### 6.8.3 footprintUnit(product carbon footprint)

The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook.

> **Content Validation**<br>In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf) and Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html)

#### 6.8.4 footprintType(product carbon footprint)

Specifies type of environmental footprint measured, aiding in detailed sustainability analysis.

> **Content Validation**<br>In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf) and Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html)


#### 6.8.5 footprintLifecycle(product carbon footprint)

The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'

> **Content Validation**<br>In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf) and Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html)


#### 6.8.6 performanceClass(product carbon footprint)

Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category
> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.8.7 facility(product carbon footprint)

The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNA is provided

> **Content Validation**<br>The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members

#### 6.8.8 Facility Address

*To be covered in next version*

#### 6.8.9 Rulebook

*To be covered in next version*

#### 6.8.10 Declaration

*To be covered in next version*

#### 6.8.11 value (product environmental footprint)

The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). Furthermore, [Product Environmental Footprint (PEF)](https://green-forum.ec.europa.eu/green-business/environmental-footprint-methods/pef-method_en) can also be used as a guiding document.

#### 6.8.12 footprintUnit (product environmental footprint)

The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook.

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). Furthermore, [Product Environmental Footprint (PEF)](https://green-forum.ec.europa.eu/green-business/environmental-footprint-methods/pef-method_en) can also be used as a guiding document.

#### 6.8.13 footprintType (product environmental footprint)

Categorizes type of environmental impact for depth in sustainability analysis.

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). Furthermore, [Product Environmental Footprint (PEF)](https://green-forum.ec.europa.eu/green-business/environmental-footprint-methods/pef-method_en) can also be used as a guiding document.

#### 6.8.14 footprintLifecycle (product environmental footprint)


The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'.

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). Furthermore, [Product Environmental Footprint (PEF)](https://green-forum.ec.europa.eu/green-business/environmental-footprint-methods/pef-method_en) can also be used as a guiding document.
#### 6.8.15 performanceClass (product environmental footprint)

Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category
> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.8.16 facility (product environmental footprint)

The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNA is provided

> **Content Validation**<br>The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

#### 6.8.17 Facility Address

*To be covered in next version*

#### 6.8.18 Rulebook

*To be covered in next version*

#### 6.8.19 Declaration

*To be covered in next version*

#### 6.8.20 value (product material footprint)

The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html) and the Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).

#### 6.8.21 footprintUnit (product material footprint)

The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook.

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html) and the Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).

#### 6.8.22 footprintType (product material footprint)

Impact categorization clarifies footprint implications within material contexts.

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html) and the Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).

#### 6.8.23 footprintLifecycle (product material footprint)

The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'

> **Content Validation**<br>For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html) and the Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).

#### 6.8.24 performanceClass (product material footprint)

Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category

> **Exemption**<br>Please provide clear information as stated in 1.4 [Structure of this Rulebook](#14-Structure-of-this-Rulebook)

#### 6.8.25 facility (product material footprint)

The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.

> **Syntax**<br>Validity should be verified using regular expression-based checks in case BPNA is provided

> **Content Validation**<br>The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.


#### 6.8.26 Facility Address 

*To be covered in next version*

#### 6.8.27 Rulebook

*To be covered in next version*

#### 6.8.28 Declaration

*To be covered in next version*

#### 6.8.29 Reparability Score

In the context of the ESPR, the reparability score is a quantified indicator that reflects the ease with which a product can be repaired. It assesses factors such as the availability of spare parts, accessibility of repair information, design for disassembly, required tools, and time needed for repair. The score is intended to promote product longevity, reduce environmental impact, and empower consumers and repair professionals by enabling informed choices and facilitating circular economy practices.

> **Content Validation**<br>Reparability score in accordance to Annex I of [Regulation (EU) 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj/eng)

#### 6.8.30 Durability Score

The durability score is a standardized indicator established under the Ecodesign for Sustainable Products Regulation (ESPR) that measures a product’s ability to maintain its intended performance and functionality over time under normal usage conditions. It reflects the product’s resistance to wear, aging, and failure, and is based on criteria such as tested lifespan, failure rates, warranty coverage, and availability of maintenance support. The score is designed to promote longer-lasting products, reduce premature obsolescence, and support sustainable consumption and production patterns.

> **Content Validation**<br>Durability score in accordance to Annex I of [Regulation (EU) 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj/eng)

#### 6.8.31 Reuse Info 

*To be covered in next version*

#### 6.8.32 Reuse System Identification

*To be covered in next version*

#### 6.8.33 Symbol of Deposit and Return System

*To be covered in next version*

#### 6.8.34 Rotation Estimation Key

*To be covered in next version*

#### 6.8.35 Rotation Estimation Value

*To be covered in next version*

#### 6.8.36 Rotation Calculation Key 

*To be covered in next version*

#### 6.8.37 Rotation Calculation Value

*To be covered in next version*

#### 6.8.38 Trip Estimation Key 

*To be covered in next version*

#### 6.8.39 Trip Estimation Value

*To be covered in next version*

#### 6.8.40 Trip Calculation Key

*To be covered in next version*

#### 6.8.41 Trip Calculation Value

*To be covered in next version*

#### 6.8.42 Facilitates Tracking Reusable Product Address ID

*To be covered in next version*

#### 6.8.43 Facilitates Tracking Reusable Product Address

*To be covered in next version*

#### 6.8.44 Collection Points Reusable Product ID 

*To be covered in next version*

#### 6.8.45 Collection Points Reusable Product Address 

*To be covered in next version*

#### 6.8.46 Recyclability Performance Grade 

*To be covered in next version*
### 6.9 Compliance

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 9.1   | Compliance Country             | *To be covered in next version* | | | | |
| 9.2   | Compliance Regulation Name            | *To be covered in next version* | | | | |
| 9.3   | Compliance Statement            | *To be covered in next version* | | | | |
| 9.4   | Compliance Reason for Exemption            | *To be covered in next version* | | | | |
| 9.5   | Compliance Remark            | *To be covered in next version* | | | | |
| 9.6   | Compliance Documentation            | *To be covered in next version* | | | | |

### 6.10 Sources

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 10.1   | Sources             | *To be covered in next version* | | | | |
| 10.2   | Category | Defines the document's category for sorting purposes. | Mandatory | Regulation (EU) 2024/1781, Annex III and Article 27 | - Must contain one of the enumerated values. | |

### 6.11 Additional Data

| Rule ID | Data Attribute | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|--------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 11.1  | Description  | Provides contextual information about the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must provide a clear and concise description of the attribute. | |
| 11.2  | Label        | Human-readable name of the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must specify a readable label for the attribute.  | |
| 11.3  | Type Unit    | Complex description of the type, helping define unit characteristics or indicating empty if the "children" property is used. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must select appropriate unit type or indicate empty when "children" are specified. | |
| 11.4  | Data Type    | Specifies the data type;  | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must conform to specified data types under regulations. <br> - if "object" is selected, children are utilized instead of data. | |
| 11.5  | Data         | Content of the attribute, dependent on data type and unit specifications. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must align content with data type and unit dependency. | |
| 11.6  | Children     | Children elements of the hierarchical structure, extending attribute definitions. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Structure must enable hierarchical definitions as necessary. | |



## Appendix 1: DPP Example


| ID | Section | Data Attribute| Value |
|---------|-|---------------------------|---------------------|
| 1.1   | Metadata |Passport Identifier       | 2034030-f0few2-fwfweew023r-3244            |
| 1.2   | Metadata |Version     | 1.0           |
| 1.3   | Metadata |Status       | Released           |
| 1.4   | Metadata |Language       | en           |
| 1.5   | Metadata |Predecessor Identifier       | 2034030-f0few2-fwfweew023r-3244           |
| 1.6   | Metadata |Registration Identifier      | 2034030-f0few2-fwfweew023r-3244                |
| 1.7   | Metadata |Backup Reference   | Mandatory           |
| 1.8   | Metadata |IssueDate     | 2025-10-31           |
| 1.9   | Metadata |ExpirationDate     | 2035-10-31           |
| 1.10   | Metadata |Last Modification     | 2025-10-31           |
| 1.11   | Metadata |Economic Operator ID     | 234829034812349u2349           |
| 1.12  | Metadata |Economic Operator Name     | Testcompany 1           |
| 1.13  | Metadata |Economic Operator Contact     | Test Tester           |
| 1.14  | Metadata |Economic Operator Address     | Testroad 1, 12345 Testcity           |
| 2.1  | Identification |Serial Key    |       |
| 2.2  | Identification |Serial Value    |       |
| 2.3  | Identification |Batch Key   |            |
| 2.4  | Identification |Batch Value     |          |
| 2.5  | Identification |    Manufacturer Part ID  |          |
| 2.6  | Identification |     Name at Manufacturer |          |
| 2.7  | Identification |    Code Key  |          |
| 2.8  | Identification |     	Code Value |          |
| 2.9  | Identification |  Code Description    |          |
| 2.10  | Identification |  Carrier Type    |          |
| 2.11  | Identification |  	Carrier Position    |          |
| 2.12  | Identification |  Classification Standard    |          |
| 2.13  | Identification |  Classification ID    |          |
| 2.14  |Identification  |  	Classification Description    |          |
| 2.15  | Identification |  	Picture    |          |
| 3.1  |  Operation| Facility ID     |          |
| 3.2 | Operation |   	Facility Address   |          |
| 3.3  |  Operation|  Manufacturer ID    |          |
| 3.4  | Operation |  Manufacturer Name    |          |
| 3.5  |  Operation| Manufacturer Contact     |          |
| 3.6  | Operation | 	Manufacturer Address     |          |
| 3.7  | Operation |  Manufacturing Date    |          |
| 3.8  | Operation |  	Applicable    |          |
| 3.8.1  |Operation  | EORI     |          |
| 3.8.2  | Operation |  Importer Identification    |          |
| 3.8.3  | Operation |   Importer Name   |          |
| 3.8.4  | Operation |   Importer Contact   |          |
| 3.8.5  | Operation |    Importer Address  |          |
| 3.9  |Operation  | Other Operator ID     |          |
| 3.10  | Operation |  Other Operator Name    |          |
| 3.11  | Operation | 	Other Operator Contact    |          |
| 3.12 | Operation | Other Operator Address     |          |
| 3.13 |  Operation|  Other Operator Role    |          |
| 3.14  |Operation  | Symbol of Extended Producer Responsibility Scheme     |          |
| 3.15  | Operation | Territory of Extended Producer Responsibility Scheme     |          |
| 3.16  | Operation |  Collection Points of Extended Producer Responsibility Scheme ID    |          |
| 3.17  |Operation  |   Collection Points of Extended Producer Responsibility Scheme Address   |          |
| 4.1  | Handling | Applicable     |          |
| 4.1.1  | Handling | Sources Identification     |          |
| 4.1.2  | Handling |  Sources Contact    |          |
| 4.1.3  |Handling  |   Sources Address  |          |
| 4.1.4  |  Handling|  	Manufacturer Part ID    |          |
| 4.1.5  | Handling |  Name at Manufacturer    |          |
| 5.1  | Characteristics | 	Life Type     |          |
| 5.2  |Characteristics  |  Life Value    |          |
| 5.3  |Characteristics  |   	Life Unit   |          |
| 5.4 | Characteristics |  	Value (Width)    |          |
| 5.5  |  Characteristics|  Unit (Width)    |          |
| 5.6  |Characteristics  |  	Value (Length)    |          |
| 5.7  |Characteristics  |  	Unit (Length)    |          |
| 5.8  | Characteristics |  Value (Diameter)    |          |
| 5.9  | Characteristics |   	Unit (Diameter)   |          |
| 5.10  |Characteristics  |   Value (Height)   |          |
| 5.11  | Characteristics |  Unit (Height)    |          |
| 5.12  | Characteristics |  Value (Gross Weight)    |          |
| 5.13  |  Characteristics|  Unit (Gross Weight)    |          |
| 5.14  | Characteristics| 	Value (Volume)     |          |
| 5.15  | Characteristics | 	Unit (Volume)     |          |
| 5.16  | Characteristics | 	Value (Gross Volume)     |          |
| 5.17  | Characteristics |  Unit (Gross Volume)    |          |
| 5.18  | Characteristics |  Value (Weight)    |          |
| 5.19  | Characteristics | Unit (Weight)     |          |
| 5.20  | Characteristics |  Value (Item Quantity)    |          |
| 5.21  |Characteristics  |   Unit Item Quantity   |          |
| 5.22  |Characteristics  |   Physical State   |          |
| 5.23  |Characteristics  |  General Performance Class    |          |
| 5.24  |Characteristics  | Other Characteristic Name     |          |
| 5.25  |Characteristics  |  Other Characteristic Outcome    |          |
| 6.1  | Commercial |	Placed On Market     |          |
| 6.2  | Commercial |  Purpose    |          |
| 6.3  | Commercial |  Purchase Order    |          |
| 6.4  | Commercial |  Recall Information    |          |
| 7.1 | Materials |  	Applicable (Substances of Concern)    |          |
| 7.1.1  |Materials  |  	Chemical ID (Substances of Concern)    |          |
| 7.1.2  | Materials | 	List Type ID (Substances of Concern)     |          |
| 7.1.3  | Materials |  	Chemical Name (Substances of Concern)    |          |
| 7.1.4  | Materials | Material Unit (Substances of Concern)    |          |
| 7.1.5  | Materials |  	Concentration (Substances of Concern)    |          |
| 7.1.6  | Materials | Min Concentration (Substances of Concern)     |          |
| 7.1.7  | Materials |  Max Concentration (Substances of Concern)    |          |
| 7.1.8  | Materials | Location of Substances (Substances of Concern)     |          |
| 7.1.9  | Materials |  Exemption for Substances (Substances of Concern)    |          |
| 7.1.10  |Materials  | 	Hazard Category (Substances of Concern)     |          |
| 7.1.11  |Materials |  Hazard Class (Substances of Concern)    |          |
| 7.1.12  | Materials | 	Hazard Statement (Substances of Concern)    |          |
| 7.1.13  | Materials |  Documentation    |          |
| 7.2  | Materials | Applicable (Material Composition)    |          |
| 7.2.1  | Materials | Component Name     |          |
| 7.2.2  |Materials  | Component Code     |          |
| 7.2.3  | Materials |  Component Description    |          |
| 7.2.4  |Materials  |  Component Location    |          |
| 7.2.5  | Materials | Sorting Information     |          |
| 7.2.6  | Materials | Component Passport Identifier     |          |
| 7.2.7  | Materials |	Chemical ID (Material Composition)      |          |
| 7.2.8  | Materials |  List Type ID (Material Composition)    |          |
| 7.2.9  | Materials | Chemical Name (Material Composition)     |          |
| 7.2.10  | Materials |  Material Type    |          |
| 7.2.11  | Materials |  Material Origin    |          |
| 7.2.12 | Materials | Material Passport Identifier     |          |
| 7.2.13  | Materials |  Material Unit    |          |
| 7.2.14  | Materials | Concentration     |          |
| 7.2.15  | Materials |  Min Concentration    |          |
| 7.2.16  |  Materials|  Max Concentration   |          |
| 7.2.17  |  Materials|   Location   |          |
| 7.2.18  |  Materials|   Recycled   |          |
| 7.2.19  |  Materials|  Documentation    |          |
| 7.3.1 | Materials | 	List Name (Declarable Ingredient List)     |          |
| 7.3.2 | Materials |   Document ID (Declarable Ingredient List)   |          |
| 7.3.3  | Materials |  Documentation (Declarable Ingredient List)    |          |
| 8.1  |Sustainability  | State	     |          |
| 8.2  |Sustainability  |value (product carbon footprint)      |          |
| 8.3  |Sustainability  | 	footprintUnit(product carbon footprint)     |          |
| 8.4  |Sustainability  |  footprintType(product carbon footprint)    |          |
| 8.5  |Sustainability |   	footprintLifecycle(product carbon footprint)   |          |
| 8.6  |Sustainability  |  	performanceClass(product carbon footprint)    |          |
| 8.7  |Sustainability  |   facility(product carbon footprint)   |          |
| 8.8  |Sustainability  |  	Facility Address    |          |
| 8.9  | Sustainability |  Rulebook    |          |
| 8.10  | Sustainability | Declaration     |          |
| 8.11  |Sustainability  |  	value (product environmental footprint)    |          |
| 8.12  |Sustainability  |  footprintUnit (product environmental footprint)    |          |
| 8.13  |Sustainability  |  footprintType (product environmental footprint)    |          |
| 8.14  | Sustainability |  footprintLifecycle (product environmental footprint)    |          |
| 8.15  |Sustainability  | performanceClass (product environmental footprint)     |          |
| 8.16  | Sustainability |  facility (product environmental footprint)    |          |
| 8.17  | Sustainability | Facility Address     |          |
| 8.18  |  Sustainability| Rulebook    |          |
| 8.19  |Sustainability  | Declaration     |          |
| 8.20  | Sustainability |  value (product material footprint)    |          |
| 8.21  | Sustainability | footprintUnit (product material footprint)     |          |
| 8.22  | Sustainability | 	footprintType (product material footprint)     |          |
| 8.23  | Sustainability |  	footprintLifecycle (product material footprint)    |          |
| 8.24  | Sustainability |  performanceClass (product material footprint)    |          |
| 8.25  | Sustainability |  facility (product material footprint)    |          |
| 8.26  | Sustainability |  Facility Address    |          |
| 8.27  | Sustainability |  Rulebook    |          |
| 8.28  | Sustainability |  Declaration    |          |
| 8.29  | Sustainability |  	Reparability Score    |          |
| 8.30  | Sustainability |  	Durability Score    |          |
| 8.31  | Sustainability |   Reuse Info   |          |
| 8.32  | Sustainability |  Reuse System Identification    |          |
| 8.33  | Sustainability | 	Symbol of Deposit and Return System     |          |
| 8.34  | Sustainability |  Rotation Estimation Key    |          |
| 8.35  | Sustainability |   Rotation Estimation Value   |          |
| 8.36  | Sustainability |  Rotation Calculation Key    |          |
| 8.37  | Sustainability |   Rotation Calculation Value   |          |
| 8.38  | Sustainability |  Trip Estimation Key    |          |
| 8.39  | Sustainability | 	Trip Estimation Value     |          |
| 8.40  | Sustainability |  Trip Calculation Key    |          |
| 8.41  | Sustainability | Trip Calculation Value     |          |
| 8.42  | Sustainability | 	Facilitates Tracking Reusable Product Address ID     |          |
| 8.43  | Sustainability | Facilitates Tracking Reusable Product Address     |          |
| 8.44  | Sustainability |  Collection Points Reusable Product ID    |          |
| 8.45  | Sustainability |   Collection Points Reusable Product Address   |          |
| 8.46  | Sustainability |  	Recyclability Performance Grade    |          |
| 9.1  | Compliance |   Compliance Country   |          |
| 9.2 | Compliance |  Compliance Regulation Name    |          |
| 9.3  |Compliance  |  Compliance Statement    |          |
| 9.4  | Compliance |  Compliance Reason for Exemption    |          |
| 9.5  | Compliance |   Compliance Remark   |          |
| 9.6  |Compliance  |   Compliance Documentation  |          |
| 10.1  |Sources  |  Sources    |          |
| 10.2  | Sources |  Category    |          |
| 11.1  |Additional Data  | Description     |          |
| 11.2  | Additional Data |  Label    |          |
| 11.3  | Additional Data |  Type Unit    |          |
| 11.4  |Additional Data  |  Data Type    |          |
| 11.5  | Additional Data |  Data    |          |
| 11.6  |Additional Data  |  Children    |          |





