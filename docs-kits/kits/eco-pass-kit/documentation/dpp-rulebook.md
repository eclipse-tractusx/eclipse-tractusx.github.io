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

4. [General Principles for Data Handling in the DPP Model](#4-General-Principles-for-Data-Handling-in-the-DPP-Model)<br>
4.1 [Data Ownership and Responsibility](#41-Data-Ownership-and-Responsibility)<br>
4.2 [Data Entry Guidelines (General Rules for Data Input)](#42-Data-Entry-Guidelines-General-Rules-for-Data-Input)<br>
4.3 [Data Format and Standardization](#43-Data-Format-and-Standardization)<br>

5. [The DPP Data Model: Overview of Data Points](#5-The-DPP-Data-Model-Overview-of-Data-Points)<br>
5.1 [Metadata](#51-Metadata)<br>
5.2 [Identification](#52-Identification)<br>
5.3 [Operation](#53-Operation)<br>
5.4 [Handling](#54-Handling)<br>
5.5 [Characteristics](#55-Characteristics)<br>
5.6 [Commercial](#56-Commercial)<br>
5.7 [Materials](#57-Materials)<br>
5.8 [Sustainability](#58-Sustainability)<br>
5.9 [Compliance](#59-Compliance)<br>
5.10 [Sources](#510-Sources)<br>
5.11 [Additional Data](#511-Additional-Data)<br>



## 1. Introduction

### 1.1 Goal of this Document

The DPP Rulebook aims to simplify and clarify the validation and usability of data in Digital Product Passports, ensuring that product information is accessible, accurate, and trustworthy for all stakeholders. By establishing straightforward rules, this guide enhances understanding and consistency in data usage across sectors, beginning with the automotive industry.

The main goal of our rulebook is twofold: it provides non-technical individuals with an easy-to-understand overview of the data model and offers actionable rules for data validation. For technical experts, the kit complements the existing data model by supporting effective implementation and compliance. Through user-friendly instructions and examples, the Data Trust Kit empowers diverse participants, fosters industry-wide trust, and makes adopting Digital Product Passports approachable and efficient for all involved parties.

### 1.2 Target Audience

This Rulebook is intended for professionals who are responsible for gathering, managing, or exchanging DPP data within their organizations—such as product managers, sustainability officers, and supply chain specialists. It is specifically crafted for users who may not have a deep technical or data modeling background but are tasked with utilizing the DPP data model. Technical details, schema structures, and integration specifics can be referenced in the data model, as needed.

### 1.3 Scope and Applicability

The DPP Rulebook covers the interpretation and application of the agreed generic DPP data model, as mandated by ESPR. It provides general guidance, explains fundamental concepts, and sets out standardized procedures for managing product-related data. The Rulebook does not cover detailed technical implementation (e.g., IT system integration).

This rulebook refers to and is based on the Generic DPP Data Model, released in version 6.0.0.

### 1.4 Structure of this Rulebook

The Rulebook is organized to provide:
- Definitions and clarifications of key terms and concepts,
- General principles for handling and entering DPP data,
- Guidance on the structure and use of the data model.
  
The following sections present clear, actionable guidance and aggregate collective experience from multiple companies to help facilitate a standardized and effective implementation of the DPP data model.

Please note that the descriptions provided in this rulebook may differ from the technical descriptions in the data model; they have been adapted to make the content easier to understand for all users.

## 2. The Value of Validated Data

Data trust is the cornerstone of effective collaboration within the automotive sector. It ensures that every piece of information exchanged is genuine, complete, and accurate, thus eliminating ambiguity and reducing the risk of misinformation. Trustworthy data empowers stakeholders—including manufacturers, suppliers, consumers, and regulators—to make informed decisions, thereby enhancing operational efficiency and compliance across the supply chain.

The business value of validated data is substantial and multifaceted. Reliable data enhances decision-making, reduces operational risks, and elevates the credibility of companies within the industry. Validated data through DPPs enables:

- Improved Regulatory Compliance: Ensuring that data is precise and verified minimizes the risk of regulatory infractions and associated penalties.
- Enhanced Product Transparency: Providing clear, truthful information about product composition and sourcing builds consumer trust and strengthens brand reputation.
- Operational Efficiency: Accurate data streamlines processes by reducing errors, improving inventory management, and facilitating seamless communication across the supply chain.
- Strategic Advantage: Companies that embrace validated data can better forecast trends, optimize resource allocation, and innovate in product development.

Ultimately, the validation rulebook supports assuring data reliability. It equips automotive companies, regardless of size, with the tools necessary to leverage data effectively, nurturing growth and sustainability in an increasingly digitalized market landscape.

## 3. Key Concepts and Definitions
### 3.1 DPP Overview

The Digital Product Passport (DPP) is a standardized digital record that travels with a product throughout its entire life cycle. It compiles and shares essential information—such as origin of materials, composition, repairability, and end-of-life options—across supply chains and with stakeholders (e.g., manufacturers, distributors, recyclers, and regulators).

DPPs are required by the Ecodesign for Sustainable Products Regulation (ESPR) as a cornerstone for enhanced transparency, sustainability, and circularity in product value chains. By digitalizing this information, ESPR aims to facilitate data-driven decisions, improve resource efficiency, and enable compliance with legislative obligations.

### 3.2 Definition of Terms

#### 3.2.1 Verification vs. Validation

Currently, within initiatives such as Catena-X, Together for Sustainability (TfS), Wikipedia, and the Partnership for Carbon Transparency (PACT), there exists a significant divergence in the interpretation of the terms "verification" and "validation." The following sub section provides a brief overview of the differing definitions.

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
- Given the varying definitions of "verification" and "validation" across different platforms and use cases, achieving consensus on a single, universally applicable definition—particularly between contexts such as Digital Product Passports (DPPs) and Product Carbon Footprints (PCFs)—has proven challenging. This is especially true considering the differing levels of maturity between these use cases.

As a result, we have chosen not to invest extensive time in harmonizing definitions. To avoid potential confusion associated with the terms "verification" and "validation," we have introduced a new concept: the "Trust Kit." The purpose of the Trust Kit initiative is to establish a set of rules and criteria that enable both data providers and data consumers to assess the plausibility of data exchanged through Digital Product Passports. Further deatils are descried in following section.


### 3.3 Key Stakeholders and their Roles

A DPP system provides value across multiple parties throughout the supply chain. Understanding the main stakeholders and their roles can clarify responsibilities and improve collaboration:

- Product Manufacturers: Responsible for creating and updating the DPP with accurate product data (e.g., material content, production methods).
- Suppliers and Sub-suppliers: Provide upstream data (e.g., component/material details) for incorporation into finished product DPPs.
- Distributors and Retailers: Utilize DPP data for product traceability, compliance, and communication with customers.
- Recyclers and End-of-Life Facilities: Access DPP data to inform correct treatment and optimize resource recovery.
- Regulators and Auditors: May review DPP data for compliance with legal and sustainability requirements.
- Consumers and Business Customers: Can access selected DPP elements to make informed purchasing, usage, or recycling decisions.

Having clear roles and responsibilities for each stakeholder helps promote accountability and streamlines the flow of data throughout the product life cycle.

## 4. General Principles for Data Handling in the DPP Model

This section sets out the main rules and guiding principles for entering, managing, and sharing data within the Digital Product Passport (DPP) framework. Applying these principles ensures that DPP data is consistent, reliable, and useful throughout the entire value chain.

### 4.1 Data Ownership and Responsibility

- As usual in Catena-X, the data provider remains the data owner and is responsible for ensuring the correctness of the data.
- Owners are accountable for the accuracy, completeness, and timely updating of their data.
- Changes or updates to data should be tracked and, where appropriate, accompanied by a change log to ensure traceability using the predecessor identifier field in generic DPP data model.
- Data in the DPPs must be updated under any of the following conditions:
    - Changes in product characteristics (e.g. materials, design, certifications)
    - Regulatory updates (e.g. new or revised delegated/implementing acts)
    - Lifecycle events (e.g. manufacturing, repair, refurbishment, end-of-life)
    - New relevant information (e.g. discovery of substances of concern)
    - Service provider requirements (e.g. updates for data integrity and traceability)

### 4.2 Data Entry Guidelines (General Rules for Data Input)

- Provide the most accurate and up-to-date information available **at the time of DPP issuance**.
- In cases where certain data points are not applicable, **leave blank only if permitted by the data model.(Not possible if mandatory? more clear language! Explain applicable field, difference between applicable and optional)**
   - Optional?
- Use consistent naming conventions and units (refer to Section 4.3).
- Do not use company-internal jargon, abbreviations, or codes unless these are defined in the DPP schema or Rulebook. (Do we have an example?)

#### 4.2.1 Granularity
- Is there any rule already defined if or when data needs to be provided on a batch or instance level?


### 4.3 Data Format and Standardization
- Enter all data according to the format specified in the DPP model (e.g., 
   - Comma vs. decmial? dependent on language setting?
   - date as YYYY-MM-DD, decimals with “.” separator).
- **Apply standardized identifiers (e.g., product codes, material codes, company identifiers such as VAT or DUNS numbers) if required.**
- For free text fields, keep entries clear and concise. **(Add an example! content header?)**
### 4.4 Data Trust
- Refer/Link to data trust KIT
- Trust anchors as defined in CatenaX ? Link?


## 5. The DPP Data Model: Overview of Data Points

### 5.1 Metadata

Metadata encompasses the fundamental details of the digital product passport.

| Rule ID | Data Attribute            | Mandatory/ Optional | Regulatory Reference                                       |
|---------|---------------------------|---------------------|------------------------------------------------------------|
| 5.1.1   | Passport Identifier       | Mandatory           | Regulation (EU) 2024/1781                                  |
| 5.1.2   | Version                   | Mandatory           | Regulation (EU) 2024/1781, Article 9                       |
| 5.1.3   | Status                    | Optional            | Regulation (EU) 2024/1781                                  |
| 5.1.4   | Language                  | Mandatory           | Regulation (EU) 2024/1781                                  |
| 5.1.5   | Predecessor Identifier    | Mandatory           | Regulation (EU) 2024/1781                                  | 
| 5.1.6   | Registration Identifier   | Optional            | Regulation (EU) 2024/1781                                  |
| 5.1.7   | Backup Reference          | Mandatory           | Regulation (EU) 2024/1781                                  | 
| 5.1.8   | IssueDate                 | Mandatory           | Regulation (EU) 2024/1781                                  |
| 5.1.9   | ExpirationDate            | Mandatory           | Regulation (EU) 2024/1781, Article 9 (2)(i) and Article 11 | 
| 5.1.10  | Last Modification         | Optional            | Regulation (EU) 2024/1781                                  |
| 5.1.11  | Economic Operator ID      | Mandatory           | Regulation (EU) 2024/1781, Annex III, section (k)          | 
| 5.1.12  | Economic Operator Name    | Mandatory           | Regulation (EU) 2024/1781                                  |
| 5.1.13  | Economic Operator Contact | Mandatory           | Regulation (EU) 2024/1781                                  |
| 5.1.14  | Economic Operator Address | Mandatory           | Regulation (EU) 2024/1781                                  | 

#### 5.1.1 Passport Identifier

Unique identifier of the product passport.

> **Syntax**


> **Content**<br>Must contain an unique identifier <font color="red">according to ISO/IEC 9834-8:2005 standard</font>

#### 5.1.2 Version

 The current version of the product passport.

 a) The attribute must contain a version number in a string format.

 b) Updates must follow semantic versioning convention.

#### 5.1.3 Status

 The lifecycle stage of the product passport.

 a) If provided, the attribute must contain one of the enumerated values.

#### 5.1.4 Language

Specific language in which passport content is created.

a) In accordance with [ISO 3166 - Country Codes](https://www.iso.org/iso-3166-country-codes.html)

#### 5.1.5 Predecessor Identifier

*To be covered in next version*

#### 5.1.6 Registration Identifier  

*To be covered in next version*

#### 5.1.7 Backup Reference 

*To be covered in next version*

#### 5.1.8 IssueDate

The date when the product passport is initially issued.

a) Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html)

#### 5.1.9 ExpirationDate

The date until the product passport remains available.

a) Date and time representation for information interchange in accordance with [ISO 8601-1:2019](https://www.iso.org/standard/70907.html).

#### 5.1.10 Last Modification

*To be covered in next version*

#### 5.1.11 Economic Operator ID

Identification of the economic operator responsible for the passport.

a) The BPNL is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members.

b) For companies that are not in the Catena-X network, CIN in accordance with [ISO/ICE 15459-1:2014](https://www.iso.org/standard/54779.html) could be used.

#### 5.1.12 Economic Operator Name

*To be covered in next version*

#### 5.1.13 Economic Operator Contact

*To be covered in next version*

#### 5.1.14 Economic Operator Address

*To be covered in next version*

### 5.2 Identification

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
| 2.10    |Carrier Type                | Optional            | Regulation (EU) 2024/1781, Article 2(29)                      |
| 2.11    | Carrier Position           | Optional            | Regulation (EU) 2024/1781, Article 8(2)(c)                    |
| 2.12    | Classification Standard    | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.13    | Classification ID          | Mandatory           | Regulation (EU) 2024/1781                                     |
| 2.14    | Classification Description | Optional            | Regulation (EU) 2024/1781                                     |
| 2.15    | Picture                    | *To be covered in next version* | Optional| | | |


#### 5.2.1 Serial Key 

The key for local identification of a serial part.

a) No syntax check applies as the attribute is idefined by companies 

b) The attribute must conform to one of the predefined identifier types or custom keys.

#### 5.2.2 Serial Value

The value associated with the serial key.

 a) If provided, the attribute must describe the unique serial key.

#### 5.2.3 Batch Key  

The key for local identification of a batch information. 

a) The attribute must conform to one of the predefined identifier types or custom keys.

#### 5.2.4 Batch Value 

The value associated with the batch key.

a) If provided, attribute must describe the associated batch key

#### 5.2.5 Manufacturer Part ID

 Unique identifier for the part model or type assigned by the manufacturer, defining version-specific part identification.

a) Must contain the Part ID as assigned by the manufacturer of the part.

b) The Part ID references a specific version of a part. The version number must be included in the Part ID if it is available.

#### 5.2.6 Name at Manufacturer 

The name of the part provided by the manufacturer.

a) Must contain the Name of the Part as assigned by the manufacturer.

#### 5.2.7 Code Key 

The code key for product identification.

a) Must be a valid identifier code such as GTIN, DID, ISBN, etc. (Question: Can this be checked by regular expression)?

#### 5.2.8 Code Value 

The identifier value related to the code key.

a) Must correspond with the associated code key.

#### 5.2.9 Code Description 

*To be covered in next version*

#### 5.2.10 Carrier Type 

The type of data carrier used for product identification. The format of a Product Passport is typically digital and can be implemented through various technologies to ensure accessibility and interoperability.

a) Must align with recognizable carrier types like QR, barcode, etc. (Can we give a link to responsible carrier types?)

#### 5.2.11 Carrier Position 

The spatial arrangement or position of the data carrier on the product.

a) If specified, the attribute must describe the carrier's positioning.

#### 5.2.12 Classification Standard 

Outlines classification standards for parts.

a) Must refer to known standards in classification. (I think we should give here list of preferred options, as of now it doesn'T really help)

#### 5.2.13 Classification ID   

The identifier for the part classification standard according to related key-value pairs. 

a) Must correspond with the classification standard provided.

#### 5.2.14 Classification Description

Optional property describing the classification standard.

a) Can provide details relevant to the classification standard.

#### 5.2.15 Picture

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
| 3.9     | EORI                                                                 | Mandatory           | Regulation (EU) 2024/1781, Annex III(j)          |
| 3.10    | Importer Identification                                              | Mandatory           | Regulation (EU) 2024/1781, Annex III(j)          |
| 3.11    | Importer Name                                                        | *To be covered in next version* | | 
| 3.12    | Importer Contact                                                     | *To be covered in next version* | | 
| 3.13    | Importer Address                                                     | *To be covered in next version* | | 
| 3.14    | Other Operator ID                                                    | Mandatory           | Regulation (EU) 2024/1781, Annex III             |
| 3.15    | Other Operator Name                                                  | *To be covered in next version* | | 
| 3.16    | Other Operator Contact                                               | *To be covered in next version* | | 
| 3.17    | Other Operator Address                                               | *To be covered in next version* | | 
| 3.18    | Other Operator Role                                                  | Mandatory           | Regulation (EU) 2024/1781, Annex III             |
| 3.19    | Symbol of Extended Producer Responsibility Scheme                    | *To be covered in next version* | | 
| 3.20    | Territory of Extended Producer Responsibility Scheme                 | *To be covered in next version* | | 
| 3.21    | Collection Points of Extended Producer Responsibility Scheme ID      | *To be covered in next version* | | 
| 3.22    | Collection Points of Extended Producer Responsibility Scheme Address | *To be covered in next version* | | 

#### 5.3.1 Facility ID 

The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.

a) The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. 

b) Additionally, its validity can be verified using regular expression-based checks.

#### 5.3.2 Facility Address

*To be covered in next version*

#### 5.3.3 Manufacturer ID

 Manufacturer identification (The main manufacturer, if different from the passport owner, represented by an identification number) refers to the requirement for clear and traceable information about the manufacturer or responsible economic operator of a product placed on the EU market. 

a) The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. 
 
b)Additionally, its validity can be verified using regular expression-based checks. | |

#### 5.3.4 Manufacturer Name

*To be covered in next version*

#### 5.3.5 Manufacturer Contact

*To be covered in next version*

#### 5.3.6 Manufacturer Address 

*To be covered in next version*

#### 5.3.7 Manufacturing Date

Represents the date of final product manufacturing (e.g. final quality check, ready-for-shipment event).

a) The date format is in complaince to ISO 8601. 

b) Additionally, its validity can be verified using regular expression-based checks.

#### 5.3.8 Applicable

 Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.

a) If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 5.3.9 EORI

An EORI number (Economic Operators Registration and Identification number) is a unique identification number assigned by a customs authority in the European Union to businesses and individuals involved in importing or exporting goods into or out of the EU.

a) Must follow the EORI number format. 

b) Its validity can be verified using regular expression-based checks.

#### 5.3.10 Importer Identification

Importer identification (The importer of the product) refers to the requirement to clearly and reliably identify the importer of a product that is placed on the EU market, especially when the manufacturer is based outside the EU, ensuring product traceability in the Catena-X network.

a) Must conform to the BPNL identifier format. 

b) Its validity can be verified using regular expression-based checks.

#### 5.3.11 Importer Name

*To be covered in next version*

#### 5.3.12 Importer Contact 

*To be covered in next version*

#### 5.3.13 Importer Address 

*To be covered in next version*

#### 5.3.14 Other Operator ID  

OtherImporterID is a secondary or additional identifier used to uniquely reference an importer other than the primary one listed for a product. This may be relevant when: 1- Multiple importers are involved in placing the same product model on the EU market. 2- A product is distributed through different channels or subsidiaries. 3- There is a need to track alternative or backup importers for traceability and compliance purposes. 

a) This is an open field, as no applicable validation rules can be defined for this entry.

#### 5.3.15 Other Operator Name 

*To be covered in next version*

#### 5.3.16 Other Operator Contact 

*To be covered in next version*

#### 5.3.17 Other Operator Address 

*To be covered in next version*

#### 5.3.18 Other Operator Role 

This field is used to specify the "Role" of the other operator (e.g., Distributor). 

a) Describes the specific role of the operator. 

b) This is an open field, as no applicable validation rules can be defined for this entry.

#### 5.3.19 Symbol of Extended Producer Responsibility Scheme   

*To be covered in next version*

#### 5.3.20 Territory of Extended Producer Responsibility Scheme

*To be covered in next version*

#### 5.3.21 Collection Points of Extended Producer Responsibility Scheme ID  

*To be covered in next version*

#### 5.3.22 Collection Points of Extended Producer Responsibility Scheme Address 

*To be covered in next version*

### 5.4 Handling
"Handling" refers to the information related to the safe, appropriate, and sustainable management of a product or component throughout its lifecycle.

| Rule ID | Data Attribute            | Mandatory/ Optional | Regulatory Reference       |
|---------|---------------------------|---------------------|----------------------------|
| 4.1     | Applicable                | Mandatory           |                            |
| 4.2     | Sources Identification    | Mandatory           |                            |
| 4.3     | Sources Contact           | *To be covered in next version* | |
| 4.4     | Sources Address           | *To be covered in next version* | |
| 4.5     | Manufacturer Part ID      | Mandatory           |                            | 
| 4.6     | Name at Manufacturer      | Mandatory           |                            |

#### 5.4.1 Applicable

Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.

a) If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 5.4.2 Sources Identification

Identifies sources of spare parts for the product via unique identifiers of producers, important for traceability and supply chain management.

a) Must match the BPNL identifier format to ensure accuracy. 

b) Its validity can be verified using regular expression-based checks.

#### 5.4.3 Sources Contact   

*To be covered in next version*

#### 5.4.4 Sources Address  

*To be covered in next version*

#### 5.4.5 Manufacturer Part ID    

Part ID as assigned by the manufacturer of the part. The Part ID identifies the part in the manufacturer`s dataspace. The Part ID references a specific version of a part. The version number must be included in the Part ID if it is available.

a) This is an open field, as no applicable validation rules can be defined for this entry.

#### 5.4.6 Name at Manufacturer  

Name of the spare part as assigned by the manufacturer.

a) This is an open field, as no applicable validation rules can be defined for this entry.

### 5.5 Characteristics

The "Characteristics" category refers to a set of descriptive attributes that define the physical, functional, and environmental properties of a product. These characteristics are essential for assessing a product’s sustainability performance and are typically included in the Digital Product Passport (DPP).
 
Key elements under this category may include:
<br>1- Physical attributes: Size, weight, dimensions, color, and material composition.
<br>2- Functional properties: Intended use, performance capabilities, and compatibility.
<br>3- Environmental characteristics: Energy consumption, emissions, recyclability, and presence of hazardous substances.
<br>4- Lifecycle information: Expected lifespan, maintenance needs, and end-of-life options.
 
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

#### 5.5.1 Life Type

"Lifetime" under the Ecodesign for Sustainable Products Regulation (ESPR) refers to the period during which a product or its components are expected to remain functional, safe, and fit for use, under normal or intended conditions, without excessive performance degradation. It is a key indicator of durability and reliability, and may be expressed through: <br>1- Guaranteed lifetime (e.g., warranty or legal durability claim) <br>2- Technical lifetime (based on product design and performance testing) <br>3- Mean Time Between Failures (MTBF)

a) For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 5.5.2 Life Value

The numeric value describing the product’s lifespan in terms of the specified type.

a) Must be a valid integer for lifespan value.

b) Must be > 0. 

#### 5.5.3 Life Unit

The unit corresponding to the respective lifespan, specified using one of the following standardized units: day, month, cycle, year, or running/operating hour.

#### 5.5.4 Value (Width)

Represents the width of the item.

a) Must be a valid float representing width.

b) Must be > 0. 

#### 5.5.5 Unit (Width)

Specifies unit of measure for widths.

#### 5.5.6 Value (Length)

The length of the item.

a) Valid float for length value required.

b) Must be > 0. 

#### 5.5.7 Unit (Length)

Defines unit used for measuring length.

#### 5.5.8 Value (Diameter)

Specifies diameter of the item.

a) Must be float for diameter.

b) Must be > 0. 

#### 5.5.9 Unit (Diameter)

Indicates unit for diameter measurements.

#### 5.5.10 Value (Height)

Measures height of the item.

a) Requires a float value corresponding to height.

b) Must be > 0. 

#### 5.5.11 Unit (Height)

Defines unit of height measure.

#### 5.5.12 Value (Gross Weight)

Specifies total weight of the item including packaging.

a) Must be valid float to reflect gross weight.

b) Must be > 0. 

#### 5.5.13 Unit (Gross Weight)

Defines measurement unit for gross weight.

#### 5.5.14 Value (Volume)

Measures product’s volume.

a) Valid float required for volume.

b) Must be > 0. 

#### 5.5.15 Unit (Volume)

Defines the unit to express volume measurements.

#### 5.5.16 Value (Gross Volume)

Represents gross volume of the product including packaging.

a) Must be valid float for gross volume.

b) Must be > 0. 

#### 5.5.17 Unit (Gross Volume)

Specifies measurement unit for gross volume.

#### 5.5.18 Value (Weight)

Details the weight of the product.

a) Must be valid float representing weight.

b) Must be > 0. 

#### 5.5.19 Unit (Weight)

Defines unit of weight measures.

#### 5.5.20 Value (Item Quantity)

*To be covered in next version* 

#### 5.5.21 Unit Item Quantity

*To be covered in next version* 

#### 5.5.22 Physical State

The physical state of a product refers to the form in which raw materials, intermediates, or finished goods exist during production, handling, and distribution. It determines how the product is processed, stored, and transported, and typically falls into one of the following categories: Solid, liquid, gas, powder/granular

#### 5.5.23 General Performance Class

Characterizes product performance in a graded class system, promoting consumer decision-making based on efficiency.

a) Perforance class must be defined in compliance to ESPR, Article 7 when made available by EU.

#### 5.5.24 Other Characteristic Name

*To be covered in next version*

#### 5.5.25 Other Characteristic Outcome

*To be covered in next version*

### 5.6 Commercial

| Rule ID | Data Attribute        | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|---------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 6.1   | Placed On Market    | The timestamp in the format (yyyy-mm-dd) with or without time zone when the product was put in the market. | Mandatory       |  | - The date format is in complaince to ISO 8601. - Furtehrmore, Its validity can be verified using regular expression-based checks                              | |
| 6.2   | Purpose             | Specify one or more target industries for the product described in the Digital Product Passport. If exchanged via Catena-X, 'automotive ' is a must choice included in the list. | Mandatory       |  | - This is an open field, as no applicable validation rules can be defined for this entry.                                                       | |
| 6.3  | Purchase Order               | A unique identifier assigned to the order of the product for tracking purposes between the supplier and customer. |Optional | | | |
| 6.4   | Recall Information  | Recall information refers to the data and documentation associated with the process of removing a product from the market due to safety, quality, or compliance concerns.| Mandatory| Regulation (EU) 2023/988| | Information on dangerous products should, in general, be made available to the public via the Safety Gate portal.[EU Safety Gate](https://ec.europa.eu/safety-gate/#/screen/home)|

### 5.7 Materials

"Materials" category refers to: The classification and specification of the substances and material types used in a product, with a focus on their environmental performance, circularity potential, and criticality.

| Rule ID | Data Attribute                                   | Mandatory/ Optional | Regulatory Reference                  |
|---------|--------------------------------------------------|---------------------|---------------------------------------|
| 7.1.1   | Applicable (Substances of Concern)               | Mandatory           | Regulation (EU) 2024/1781             |
| 7.1.2   | Chemical ID (Substances of Concern)              | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.3   | List Type ID (Substances of Concern)             | Mandatory           | Regulation (EU) 2024/1781, Article 7   | 
| 7.1.4   | Chemical Name (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.5   | Material Unit (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.6   | Concentration (Substances of Concern)            | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.7   | Min Concentration (Substances of Concern)        | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.8   | Max Concentration (Substances of Concern)        | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.9   | Location of Substances (Substances of Concern)   | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.10  | Exemption for Substances (Substances of Concern) | Mandatory           | Regulation (EU) 2024/1781             | 
| 7.1.11  | Hazard Category (Substances of Concern)          | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.12  | Hazard Class (Substances of Concern)             | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.1.13  | Hazard Statement (Substances of Concern)         | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.1.14  | Documentation                                    | *To be covered in next version* | | | | |
| 7.2.1   | Applicable (Material Composition)                | Mandatory           | Regulation (EU) 2024/1781             |
| 7.2.2   | Component Name                                   | *To be covered in next version* | | | | |
| 7.2.3   | Component Code                                   | *To be covered in next version* | | | | |
| 7.2.4   | Component Description                            | *To be covered in next version* | | | | |
| 7.2.5   | Component Location                               | *To be covered in next version* | | | | |
| 7.2.6   | Sorting Information                              | *To be covered in next version* | | | | |
| 7.2.7   | Component Passport Identifier                    | *To be covered in next version* | | | | |
| 7.2.8   | Chemical ID (Material Composition)               | Mandatory           | Regulation (EU) 2024/1781, Article 7  |
| 7.2.9   | List Type ID (Material Composition)              | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.2.10  | Chemical Name (Material Composition)             | Mandatory           | Regulation (EU) 2024/1781, Article 7  | 
| 7.2.11  | Material Type                                    | *To be covered in next version* | | | | |
| 7.2.12  | Material Origin                                  | *To be covered in next version* | | | | |
| 7.2.13  | Material Passport Identifier                     | *To be covered in next version* | | | | |
| 7.2.14  | Material Unit                                    | *To be covered in next version* | | | | |
| 7.2.15  | Concentration                                    | *To be covered in next version* | | | | |
| 7.2.16  | Min Concentration                                | *To be covered in next version* | | | | |
| 7.2.17  | Max Concentration                                | *To be covered in next version* | | | | |
| 7.2.18  | Location                                         | *To be covered in next version* | | | | |
| 7.2.19  | Recycled                                         | *To be covered in next version* | | | | |
| 7.2.20  | Documentation                                    | *To be covered in next version* | | | | |
| 7.3.1   | List Name (Declarable Ingredient List)           | *To be covered in next version* | | | | |
| 7.3.2   | Document ID (Declarable Ingredient List)         | *To be covered in next version* | | | | |
| 7.3.3   | Documentation (Declarable Ingredient List)       | *To be covered in next version* | | | | |

#### 7.1.1 Applicable (Substances of Concern)

 Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled 

 a) If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

#### 7.1.2 Chemical ID (Substances of Concern)

A Chemical ID is a unique identifier assigned to a chemical substance to ensure consistent reference, tracking, and management across databases, regulatory systems, and supply chains. It may correspond to standardized identifiers such as CAS Number (Chemical Abstracts Service), EC Number (European Community), or internal system-specific codes. The Chemical ID facilitates accurate identification, classification, and communication of chemical information, including composition, hazards, and regulatory status

a) The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards. Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable. 

#### 7.1.3 List Type ID (Substances of Concern)

This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number

a) For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.1.4 Chemical Name (Substances of Concern)

The name of the material which is present in the product.

a) The chemical material ID and its identification (Chemical name) shall be provided in accordance with IUPAC nomenclature standards. Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.

#### 7.1.5 Material Unit (Substances of Concern)

This field defines the unit of concentration, selected from a predefined enumeration. Permissible units include mass percent, volume percent, parts per thousand (ppt), parts per million (ppm), parts per billion (ppb), and parts per trillion (ppt)

a) For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.1.6 Concentration (Substances of Concern)

Concentration of the material at the level of the product

a) The value must be > = 0 

#### 7.1.7 Min Concentration (Substances of Concern)

The minimum concentration of the substance of concern at the level of the product

a) The value must be > = 0 

#### 7.1.8 Max Concentration (Substances of Concern)

The maximum concentration of the substance of concern at the level of the product

a) The value must be > = 0 

#### 7.1.9 Location of Substances (Substances of Concern)

The location of the substances of concern within the product <br> Further decsription: <br>This requires specifying the exact location of the substance of concern within the product—for example, whether it is contained in the packaging or integrated into the product itself

a) The location within the product that contains the SoC shall be described either in a concise way or concise string

#### 7.1.10 Exemption for Substances (Substances of Concern)

Exemptions to the substance of concern: An exemption to the substance of concern refers to a formally recognized exception that permits the use or presence of a regulated or restricted chemical substance within a product or component, under specific conditions. The exemption must be documented and justified in accordance with applicable legal frameworks (e.g., REACH, RoHS), and may be subject to review, expiration, or renewal.

a) The exemption for SoCs shall be described either in a concise way or concise string

#### 7.1.11 Hazard Category (Substances of Concern)

A hazard category is a classification level within a hazard class that indicates the severity or degree of risk associated with a chemical substance or mixture. It refers to the the division of criteria within each hazard class, specifying hazard severity. Lower category numbers typically represent higher hazard severity (e.g., Category 1 is more hazardous than Category 2)

a) Valid hazard category statement required. Hazard category defined in compliance with the EU standard as outlined in [Article 2 of Regulation (EC) No 1272/2008](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.12 Hazard Class (Substances of Concern)

Hazard class means the nature of the physical, health or environmental hazard.

a) Hazard category defined in accordance to:[<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.13 Hazard Statement (Substances of Concern)

A hazard statement is a standardized phrase assigned to a chemical substance or mixture that describes the nature and, where appropriate, the degree of hazard associated with it. Each hazard statement is associated with a unique code (e.g., H315, H301) to ensure consistency and clarity in hazard communication

a) Hazard category defined in accordance to:[<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02008R1272-20231201)

#### 7.1.14 Documentation

 *To be covered in next version*

#### 7.2.1 Applicable (Material Composition)

Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled

a) If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.

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

a) The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards.<br>Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.

#### 7.2.9 List Type ID (Material Composition)

This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number

a) For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options

#### 7.2.10 Chemical Name (Material Composition)

The name of the material which is present in the product.

a) The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards.<br>Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.

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
      


### 5.8 Sustainability

| Rule ID | Data Attribute     | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 8.1   | State            | The current condition or lifecycle phase of a product, as recorded in the Digital Product Passport, indicating whether the product is new, used, repaired, refurbished, remanufactured, or at end-of-life, in order to support traceability, circularity, and sustainability objectives. | Mandatory       | ESPR proposal from March 30th, 2022 Annex I.                | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                                   | |
| 8.2   |value (product carbon footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product; | Mandatory       | ESPR proposal from March 30th, 2022 Annex I, detailing carbon footprint documentation.|  | - In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf)). <br> - The Product Carbon Footprint (PCF) calculated in compliance with  [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.3   |footprintUnit(product carbon footprint)| The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I |  |- In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf). <br> - The Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html)|
| 8.4   | footprintType(product carbon footprint)| Specifies type of environmental footprint measured, aiding in detailed sustainability analysis. | Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7   | |  - In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf). <br> - The Product Carbon Footprint (PCF) calculated in compliance with  [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.5   | footprintLifecycle(product carbon footprint)| The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'| Mandatory       |ESPR provisional agreement from January 9th, 2024 Annex I  |  | - In accordance with the provisions outlined in the [Catena-X TfS PCF Verification Framework](https://www.tfs-initiative.com/app/uploads/2024/07/CX-NFR-PCF_TFS-verification-v1.pdf). <br> - The Product Carbon Footprint (PCF) calculated in compliance with  [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.6   | performanceClass(product carbon footprint)| Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category | Mandatory       | ESPR provisional agreement from January 9th 2024 Article 2  |                      | |
| 8.7   | facility(product carbon footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product. | Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III  | Validity should be verified using regular expression-based checks in case BPNA is provided| The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members |
| 8.8   | Facility Address               | *To be covered in next version* | | | | |
| 8.9   | Rulebook               | *To be covered in next version* | | | | |
| 8.10   | Declaration               | *To be covered in next version* | | | | |
| 8.11  | value (product environmental footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;| Optional |  ESPR proposal from March 30th, 2022 Annex I  |  - For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - Product Environmental Footprint (PEF)  | |
| 8.12  | footprintUnit (product environmental footprint)|The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I | - For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - Product Environmental Footprint (PEF) | |
| 8.13  | footprintType (product environmental footprint)| Categorizes type of environmental impact for depth in sustainability analysis.| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7 | - For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - Product Environmental Footprint (PEF) | |
| 8.14  | footprintLifecycle (product environmental footprint)| The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'.| Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I  |- For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - Product Environmental Footprint (PEF)                                         | |
| 8.15  | performanceClass (product environmental footprint)| Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 2 |      | |
| 8.16  | facility (product environmental footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.| Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III | The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members. Additionally, its validity can be verified using regular expression-based checks | |
| 8.17   | Facility Address               | *To be covered in next version* | | | | |
| 8.18  | Rulebook               | *To be covered in next version* | | | | |
| 8.19  | Declaration               | *To be covered in next version* | | | | |
| 8.20  | value (product material footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;   | Optional | ESPR proposal from March 30th, 2022 Annex I| | - For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - The Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.21  |footprintUnit (product material footprint) | The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | Footprint measurement units standardized in validation chapters. || ESPR provisional agreement from January 9th, 2024 Annex I|| -For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - The Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.22  | footprintType (product material footprint)| Impact categorization clarifies footprint implications within material contexts.| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7| | - For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - The Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html). |
| 8.23  | footprintLifecycle (product material footprint) | The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'   | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I | | -For methodology compliance, refer to standardized frameworks for Life Cyle Assessment (LCA) principles and framework [ISO 14040](https://www.iso.org/standard/37456.html) & [ISO 14044](https://www.iso.org/standard/38498.html). <br> - The Product Carbon Footprint (PCF) calculated in compliance with [ISO 14067](https://www.iso.org/standard/71206.html).|
| 8.24  | performanceClass (product material footprint) | Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category | Mandatory       |  ESPR provisional agreement from January 9th 2024 Article 2 |  ||
| 8.25 | facility (product material footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.| Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III   | The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members. Additionally, its validity can be verified using regular expression-based checks  | |
| 8.26  | Facility Address               | *To be covered in next version* | | | | |
| 8.27  | Rulebook               | *To be covered in next version* | | | | |
| 8.28  | Declaration               | *To be covered in next version* | | | | |
| 8.29  | Reparability Score      | In the context of the ESPR, the reparability score is a quantified indicator that reflects the ease with which a product can be repaired. It assesses factors such as the availability of spare parts, accessibility of repair information, design for disassembly, required tools, and time needed for repair. The score is intended to promote product longevity, reduce environmental impact, and empower consumers and repair professionals by enabling informed choices and facilitating circular economy practices. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Article 7      | - Reparability score in accordance to Annex I of Regulation (EU) 2024/1781 | |
| 8.30  | Durability Score                                                                             | The durability score is a standardized indicator established under the Ecodesign for Sustainable Products Regulation (ESPR) that measures a product’s ability to maintain its intended performance and functionality over time under normal usage conditions. It reflects the product’s resistance to wear, aging, and failure, and is based on criteria such as tested lifespan, failure rates, warranty coverage, and availability of maintenance support. The score is designed to promote longer-lasting products, reduce premature obsolescence, and support sustainable consumption and production patterns. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Article 7| - Durability score in accordance to Annex I of Regulation (EU) 2024/1781 | |
| 8.31  | Reuse Info               | *To be covered in next version* | | | | |
| 8.32  | Reuse System Identification               | *To be covered in next version* | | | | |
| 8.33  | Symbol of Deposit and Return System               | *To be covered in next version* | | | | |
| 8.34  | Rotation Estimation Key              | *To be covered in next version* | | | | |
| 8.35  | Rotation Estimation Value              | *To be covered in next version* | | | | |
| 8.36  | Rotation Calculation Key               | *To be covered in next version* | | | | |
| 8.37  | Rotation Calculation Value               | *To be covered in next version* | | | | |
| 8.38  | Trip Estimation Key              | *To be covered in next version* | | | | |
| 8.39  | Trip Estimation Value              | *To be covered in next version* | | | | |
| 8.40 | Trip Calculation Key               | *To be covered in next version* | | | | |
| 8.41  | Trip Calculation Value               | *To be covered in next version* | | | | |
| 8.42  | Facilitates Tracking Reusable Product Address ID              | *To be covered in next version* | | | | |
| 8.43  | Facilitates Tracking Reusable Product Address              | *To be covered in next version* | | | | |
| 8.44  | Collection Points Reusable Product ID              | *To be covered in next version* | | | | |
| 8.45  | Collection Points Reusable Product Address              | *To be covered in next version* | | | | |
| 8.46  | Recyclability Performance Grade             | *To be covered in next version* | | | | |

### 5.9 Compliance

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 9.1   | Compliance Country             | *To be covered in next version* | | | | |
| 9.2   | Compliance Regulation Name            | *To be covered in next version* | | | | |
| 9.3   | Compliance Statement            | *To be covered in next version* | | | | |
| 9.4   | Compliance Reason for Exemption            | *To be covered in next version* | | | | |
| 9.5   | Compliance Remark            | *To be covered in next version* | | | | |
| 9.6   | Compliance Documentation            | *To be covered in next version* | | | | |

### 5.10 Sources

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 10.1   | Sources             | *To be covered in next version* | | | | |
| 10.2   | Category | Defines the document's category for sorting purposes. | Mandatory | Regulation (EU) 2024/1781, Annex III and Article 27 | - Must contain one of the enumerated values. | |

### 5.11 Additional Data

| Rule ID | Data Attribute | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|--------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 11.1  | Description  | Provides contextual information about the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must provide a clear and concise description of the attribute. | |
| 11.2  | Label        | Human-readable name of the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must specify a readable label for the attribute.  | |
| 11.3  | Type Unit    | Complex description of the type, helping define unit characteristics or indicating empty if the "children" property is used. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must select appropriate unit type or indicate empty when "children" are specified. | |
| 11.4  | Data Type    | Specifies the data type;  | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must conform to specified data types under regulations. <br> - if "object" is selected, children are utilized instead of data. | |
| 11.5  | Data         | Content of the attribute, dependent on data type and unit specifications. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must align content with data type and unit dependency. | |
| 11.6  | Children     | Children elements of the hierarchical structure, extending attribute definitions. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Structure must enable hierarchical definitions as necessary. | |
```
