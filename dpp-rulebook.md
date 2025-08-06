# Digital Product Passport Rulebook

## Goal of this Rulebook

The Data Trust Kit aims to simplify and clarify the validation and usability of data in Digital Product Passports (DPPs), ensuring that product information is accessible, accurate, and trustworthy for all stakeholders. By establishing straightforward rules, this guide enhances understanding and consistency in data usage across sectors, beginning with the automotive industry.

The main goal of our rulebook is twofold: it provides non-technical individuals with an easy-to-understand overview of the data model and offers actionable rules for data validation. For technical experts, the kit complements the existing data model by supporting effective implementation and compliance. Through user-friendly instructions and examples, the Data Trust Kit empowers diverse participants, fosters industry-wide trust, and makes adopting Digital Product Passports approachable and efficient for all involved parties.

## Why is Data Trust Necessary for Digital Product Passports?
Data trust is the cornerstone of effective collaboration within the automotive sector. It ensures that every piece of information exchanged is genuine, complete, and accurate, thus eliminating ambiguity and reducing the risk of misinformation. Trustworthy data empowers stakeholders—including manufacturers, suppliers, consumers, and regulators—to make informed decisions, thereby enhancing operational efficiency and compliance across the supply chain. By adhering to our validation rulebook, companies can guarantee the trustworthiness of their DPPs, reinforcing confidence in the data that informs strategic and operational choices.


## Business Value of Validated Data
The business value of validated data is substantial and multifaceted. Reliable data enhances decision-making, reduces operational risks, and elevates the credibility of companies within the industry. Validated data through DPPs enables:

* Improved Regulatory Compliance: Ensuring that data is precise and verified minimizes the risk of regulatory infractions and associated penalties.
* Enhanced Product Transparency: Providing clear, truthful information about product composition and sourcing builds consumer trust and strengthens brand reputation.
* Operational Efficiency: Accurate data streamlines processes by reducing errors, improving inventory management, and facilitating seamless communication across the supply chain.
* Strategic Advantage: Companies that embrace validated data can better forecast trends, optimize resource allocation, and innovate in product development.



Ultimately, the validation rulebook is crucial not only for assuring data reliability but also for driving competitive advantage and inclusivity. It equips automotive companies, regardless of size, with the tools necessary to leverage data effectively, nurturing growth and sustainability in an increasingly digitalized market landscape.

## Scope of the Data Trust Kit

The Data Trust and Security KIT establishes a comprehensive framework for enabling trusted data exchange within and outside the Catena-X ecosystem. 
This KIT addresses the critical need for verifiable, reliable data sharing across supply chain participants through a multi-layered approach encompassing governance, technology, and data content validation.

The following subchapters describe each of the dimensions(layers) scopes addressed by this KIT.

### Trust Framework Foundation

- Defines standardized approaches to establish trust in data at three distinct layers: Governance (who and why), Technology (how), and Data Content (what)
- Provides clear terminology and definitions for verification and validation processes within data ecosystems
- Establishes interoperability standards with external initiatives (UNTP, Battery Pass EU, Gaia-X)

### Technical Implementation

- Implements W3C Verifiable Credentials standard for cryptographic verification of digital data
- Defines formats and structures for Certified Data Credentials and Certified Snapshot Credentials
- Provides reference implementations for identity wallets and verification processes
- Specifies integration patterns with existing Catena-X infrastructure (Connector Kit, Digital Twins)

### Governance and Compliance

- Establishes roles, responsibilities, and appointment processes for verification authorities
- Defines credential lifecycle management including issuance, validation, and revocation procedures
- Ensures compliance with regulatory frameworks such as the Ecodesign for Sustainable Products Regulation (ESPR)
- Provides templates and guidelines for use case-specific rulebooks

### Data Content Validation

- Delivers comprehensive validation rules for Digital Product Passports, to start with and other sustainability data
- Enables automated verification of data accuracy, completeness, and conformity to established standards
- Supports both quantitative and qualitative conformity criteria assessment
- Facilitates secure data snapshots without compromising data sovereignty

### Business Value Delivery

- Reduces operational risks through trustworthy data exchange
- Enhances regulatory compliance and audit capabilities
- Enables automated due diligence processes for supply chain transparency
- Supports gradual automation of evidence collection and reporting workflows

## Research

Currently, within initiatives such as Catena-X, Together for Sustainability (TfS), Wikipedia, and the Partnership for Carbon Transparency (PACT), there exists a significant divergence in the interpretation of the terms "verification" and "validation."
The following sub section provides a brief overview of the differing definitions.

### TfS:
#### Verification: 
Process for evaluating an environmental information **statement based on historical data** and information to determine whether the statement conforms with the relevant criteria. 
#### Validation:
Process for evaluating the plausibility of assumptions, limitations, and methods that support an environmental information **statement about the outcome of future activities**.
Two situations:
- Projection of PCFs for existing products into the future: Reflecting changes in material source, sourcing of purchased parts, technology, tooling, energy mix etc..
- Prediction of PCFs for new product developments not in serial production yet
The term “environmental information validation” is shortened to “validation” in this document to reduce sentence complexity and aid understanding.

In the context of Together for Sustainability (TfS), "verification" refers to the evaluation of historical Product Carbon Footprints (PCFs), while "validation" pertains to the assessment of projected or future PCFs. These definitions are derived from ISO 14065:2020 and ISO 14066:2023. However, as these interpretations are highly specific to PCFs—and even within the PCF domain, definitions of verification and validation vary across initiatives such as PACT (as outlined below), a thorough evaluation has led to the conclusion that they are currently not well-suited for addressing "data plausibility" within Digital Product Passports

### PACT
#### Verification: 
The process of independently assessing whether reported PCF **data is accurate, complete, and conforms to a defined methodology** or standard. 
Based on the definition provided above, a simplified interpretation would be: "Determining whether the data has been calculated in accordance with established guidelines and standards."

#### Validation:
The process of confirming that the **methodology, assumptions, and data used** to estimate future or modeled PCFs are appropriate and reasonable.
In simpler terms, this can be understood as evaluating whether the data appears logical and internally consistent in terms of its content.

This interpretation is consistent with the definitions found on Wikipedia and also closely reflects our own understanding of the terms "verification" and "validation."

### Definition for Validation & Verification in Standards & Regulations  
The terms verification and validation are used in many standards and regulations, but their meanings can vary depending on the context. In general, verification is about checking whether something was done correctly, while validation is about making sure it meets the intended purpose or requirements. Below are selected definitions from key standards and regulations that illustrate how these terms are interpreted and applied in different domains.

#### Verification: 
The act of determining whether an operation has been accomplished correctly (ISO/TC 97/SC 1 N759)
#### Validation:
- Validation confirmation, through the provision of objective evidence, that the requirements for a specific intended use or application have been fulfilled (ISO 9000:2015)
- "Validation data" means data used for providing an evaluation of the trained AI system and for tuning its non-learnable parameters and its learning process in order, inter alia, to prevent underfitting or overfitting; (Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence and amending Regulations (EC) No 300/2008, (EU) No 167/2013, (EU) No 168/2013, (EU) 2018/858, (EU) 2018/1139 and (EU) 2019/2144 and Directives 2014/90/EU, (EU) 2016/797 and (EU) 2020/1828 (Artificial Intelligence Act))
- "Validation" means the process of verifying and confirming that data in electronic form are valid in accordance with this Regulation. (Regulation (EU) No 910/2014 of the European Parliament and of the Council of 23 July 2014 on electronic identification and trust services for electronic transactions in the internal market and repealing Directive 1999/93/EC)

### Conclusion:
After thorough reserach of these standards and guidelines, the Data Trust team drew two conclusions:
- Verification refers to the process of assessing whether the submitted **data has been calculated in accordance with relevant guidelines and standards**. Validation, on the other hand, involves conducting plausibility checks to determine **whether the data is reasonable**, coherent, and suitable for exchange within supply chains
- Given the varying definitions of "verification" and "validation" across different platforms and use cases, achieving consensus on a single, universally applicable definition—particularly between contexts such as Digital Product Passports (DPPs) and Product Carbon Footprints (PCFs)—has proven challenging. This is especially true considering the differing levels of maturity between these use cases.

As a result, we have chosen not to invest extensive time in harmonizing definitions. To avoid potential confusion associated with the terms "verification" and "validation," we have introduced a new concept: the "Trust Kit." The purpose of the Trust Kit initiative is to establish a set of rules and criteria that enable both data providers and data consumers to assess the plausibility of data exchanged through Digital Product Passports. Further deatils are descried in following section.

## Definition & Terminology

<img width="538" alt="image" src="https://github.com/user-attachments/assets/087fa7d8-77ea-40c2-9dea-492f603c7b3c" />

## Generic Digital Product Passport Data Point Validation Rules

### Metadata

Metadata encompasses the fundamental details of the digital product passport.

| Rule ID | Data Attribute          | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                           | Syntax checks| Content validation |
|---------|-----------------------|-----------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 1.1   | Passport Identifier   | Unique identifier of the product passport. | Mandatory | Regulation (EU) 2024/1781 |- Must contain an unique identifier <font color="red">according to ISO/IEC 9834-8:2005 standard</font>| |
| 1.2   | Version               | The current version of the product passport.| Mandatory | Regulation (EU) 2024/1781, Article 9| - The attribute must contain a version number in a string format.<br>- Updates must follow semantic versioning convention.| |
| 1.3   | Status                | The lifecycle stage of the product passport.| Optional | Regulation (EU) 2024/1781 | - If provided, the attribute must contain one of the enumerated values.| |
| 1.4   | Language               | Specific language in which passport content is created. | Mandatory|Regulation (EU) 2024/1781 |  |In accordance with [ISO 3166 - Country Codes](https://www.iso.org/iso-3166-country-codes.html) | 
| 1.5   | Predecessor Identifier               | *To be covered in next version* | Mandatory| Regulation (EU) 2024/1781 | | |
| 1.6   | Registration Identifier               | *To be covered in next version* | Optional| Regulation (EU) 2024/1781 | | |
| 1.7   | Backup Reference               | *To be covered in next version* | Mandatory| Regulation (EU) 2024/1781 | | |
| 1.8   | IssueDate             | The date when the product passport is initially issued. | Mandatory | Regulation (EU) 2024/1781 | - The attribute must match the specified date format.<br> - Can not be a future date. | |
| 1.9   | ExpirationDate        | The date until the product passport remains available.  | Mandatory | Regulation (EU) 2024/1781, Article 9 (2)(i) and Article 11 | - The attribute must match the specified date format. <br> - Can not be a past date.| |
| 1.10  | Last Modification              | *To be covered in next version* | Optional | Regulation (EU) 2024/1781 | | |
| 1.11  | Economic Operator ID  | Identification of the economic operator responsible for the passport. | Mandatory | Regulation (EU) 2024/1781, Annex III, section (k) |  - Must contain the BPNL for companies in the Catena-X network <br><font color="red"> - Must contain the CIN according to ISO 15459 standard for companies that are not in the Catena-X network. </font>| |
| 1.12  | Economic Operator Name | *To be covered in next version* | Mandatory| Regulation (EU) 2024/1781 | | |
| 1.13  | Economic Operator Contact               | *To be covered in next version* | Mandatory| Regulation (EU) 2024/1781 | | |
| 1.14  | Economic Operator Address               | *To be covered in next version* | Mandatory| Regulation (EU) 2024/1781 | | |

### Identification

The Identification section includes attributes needed for uniquely identifying the product and its characteristics.

| Rule ID | Data Attribute              | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|---------------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 2.1   | Serial Key                | The key for local identification of a serial part.  | Optional | Regulation (EU) 2024/1781, Annex III(b) and Article 10(1)(f). | - The attribute must conform to one of the predefined identifier types or custom keys. | |
| 2.2   | Serial Value              | The value associated with the serial key.  | Optional | Regulation (EU) 2024/1781, Recital (33) | - If provided, the attribute must describe the unique serial key. | |
| 2.3   | Batch Key                 |  The key for local identification of a batch information.  | Optional | Regulation (EU) 2024/1781, Recital (33) |  - The attribute must conform to one of the predefined identifier types or custom keys.| |
| 2.4   | Batch Value               |  The value associated with the batch key. | Optional | Regulation (EU) 2024/1781 |  - If provided, attribute must describe the associated batch key | |
| 2.5   | Manufacturer Part ID      | Unique identifier for the part model or type assigned by the manufacturer, defining version-specific part identification. | Mandatory | Regulation (EU) 2024/1781, Recital (33) | - Must contain the Part ID as assigned by the manufacturer of the part. <br> -  The Part ID references a specific version of a part. The version number must be included in the Part ID if it is available. | |
| 2.6   | Name at Manufacturer      | The name of the part provided by the manufacturer. | Mandatory | Regulation (EU) 2024/1781 | - Must contain the Name of the Part as assigned by the manufacturer. | |
| 2.7   | Code Key                  | The code key for product identification.  | Mandatory | Regulation (EU) 2024/1781, Annex III(b-c) |  - Must be a valid identifier code such as GTIN, DID, ISBN, etc. | |
| 2.8   | Code Value                | The identifier value related to the code key. | Mandatory | Regulation (EU) 2024/1781 | - Must correspond with the associated code key. | |
| 2.9   | Code Description          | *To be covered in next version* | Optional| Regulation (EU) 2024/1781 | | |
| 2.10  |Carrier Type              | The type of data carrier used for product identification.  | Optional | Regulation (EU) 2024/1781, Article 2(29) | - Must align with recognizable carrier types like QR, barcode, etc.| |
| 2.11  | Carrier Position            | The spatial arrangement or position of the data carrier on the product.  | Optional | Regulation (EU) 2024/1781, Article 8(2)(c) | - If specified, the attribute must describe the carrier's positioning. | |
| 2.12  | Classification Standard   | Outlines classification standards for parts. | Mandatory | Regulation (EU) 2024/1781 | - Must refer to known standards in classification. | |
| 2.13  | Classification ID         | The identifier for the part classification standard according to related key-value pairs. | Mandatory | Regulation (EU) 2024/1781 | - Must correspond with the classification standard provided. | |
| 2.14  | Classification Description | Optional property describing the classification standard. | Optional| Regulation (EU) 2024/1781 | - Can provide details relevant to the classification standard. | |
| 2.15  | Picture           | *To be covered in next version* | Optional| | | |


# Operation
The "Operations" category refers to a structured set of data that describes the activities, processes, and lifecycle events associated with a product.

| Rule ID | Data Attribute                  | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 3.1   | Facility ID                     | The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product. | Mandatory | Regulation (EU) 2024/1781, Annex III(i) | - The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. -  Additionally, its validity can be verified using regular expression-based checks.| |
| 3.2   | Facility Address               | *To be covered in next version* | | | | |
| 3.3   | Manufacturer ID   | Manufacturer identification (The main manufacturer, if different from the passport owner, represented by an identification number) refers to the requirement for clear and traceable information about the manufacturer or responsible economic operator of a product placed on the EU market. | Mandatory | Regulation (EU) 2024/1781, Annex III(h) & (k) | - The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. - Additionally, its validity can be verified using regular expression-based checks. | |
| 3.4   | Manufacturer Name               | *To be covered in next version* | | | | |
| 3.5   | Manufacturer Contact               | *To be covered in next version* | | | | |
| 3.6   | Manufacturer Address               | *To be covered in next version* | | | | |
| 3.7   | Manufacturing Date            | Represents the date of final product manufacturing (e.g. final quality check, ready-for-shipment event). | Mandatory | Mandatory | Regulation (EU) 2024/1781, Annex III | - The date format is in complaince to ISO 8601. - Additionally, its validity can be verified using regular expression-based checks.| |
| 3.8   | Applicable                    | Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.| Mandatory | Regulation (EU) 2024/1781, Annex III | - If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.| |
| 3.9   | EORI                          | An EORI number (Economic Operators Registration and Identification number) is a unique identification number assigned by a customs authority in the European Union to businesses and individuals involved in importing or exporting goods into or out of the EU. | Mandatory | Regulation (EU) 2024/1781, Annex III(j) | - Must follow the EORI number format. -  Its validity can be verified using regular expression-based checks.| |
| 3.10   | Importer Identification       | Importer identification (The importer of the product) refers to the requirement to clearly and reliably identify the importer of a product that is placed on the EU market, especially when the manufacturer is based outside the EU, ensuring product traceability in the Catena-X network. | Mandatory | Regulation (EU) 2024/1781, Annex III(j) | - Must conform to the BPNL identifier format. -  Its validity can be verified using regular expression-based checks.| |
| 3.11  | Importer Name               | *To be covered in next version* | | | | |
| 3.12  | Importer Contact               | *To be covered in next version* | | | | |
| 3.13  | Importer Address               | *To be covered in next version* | | | | |
| 3.14  | Other Operator ID             | OtherImporterID is a secondary or additional identifier used to uniquely reference an importer other than the primary one listed for a product. This may be relevant when: 1- Multiple importers are involved in placing the same product model on the EU market. 2- A product is distributed through different channels or subsidiaries. 3- There is a need to track alternative or backup importers for traceability and compliance purposes. | Mandatory | Regulation (EU) 2024/1781, Annex III | - This is an open field, as no applicable validation rules can be defined for this entry.| |
| 3.15  | Other Operator Name               | *To be covered in next version* | | | | |
| 3.16  | Other Operator Contact               | *To be covered in next version* | | | | |
| 3.17  | Other Operator Address               | *To be covered in next version* | | | | |
| 3.18  | Other Operator Role           | This field is used to specify the "Role" of the other operator (e.g., Distributor). | Mandatory | Regulation (EU) 2024/1781, Annex III | - Describes the specific role of the operator. - This is an open field, as no applicable validation rules can be defined for this entry.| |
| 3.19  | Symbol of Extended Producer Responsibility Scheme               | *To be covered in next version* | | | | |
| 3.20  | Territory of Extended Producer Responsibility Scheme               | *To be covered in next version* | | | | |
| 3.21  | Collection Points of Extended Producer Responsibility Scheme ID               | *To be covered in next version* | | | | |
| 3.22  | Collection Points of Extended Producer Responsibility Scheme Address               | *To be covered in next version* | | | | |

# Handling
"Handling" refers to the information related to the safe, appropriate, and sustainable management of a product or component throughout its lifecycle.
| Rule ID | Data Attribute              | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|---------------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 4.1   | Applicable                | Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled.| Mandatory || - If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.| |
| 4.2   | Sources Identification    | Identifies sources of spare parts for the product via unique identifiers of producers, important for traceability and supply chain management. | Mandatory | | - Must match the BPNL identifier format to ensure accuracy. <br> -  Its validity can be verified using regular expression-based checks.| |
| 4.3  | Sources Contact               | *To be covered in next version* | | | | |
| 4.4   | Sources Address               | *To be covered in next version* | | | | |
| 4.5   | Manufacturer Part ID      | Part ID as assigned by the manufacturer of the part. The Part ID identifies the part in the manufacturer`s dataspace. The Part ID references a specific version of a part. The version number must be included in the Part ID if it is available. | Mandatory | | - This is an open field, as no applicable validation rules can be defined for this entry.| |
| 4.6   | Name at Manufacturer      | Name of the spare part as assigned by the manufacturer. | Mandatory | | - This is an open field, as no applicable validation rules can be defined for this entry.| |

# Characteristics

The "Characteristics" category refers to a set of descriptive attributes that define the physical, functional, and environmental properties of a product. These characteristics are essential for assessing a product’s sustainability performance and are typically included in the Digital Product Passport (DPP).
 
Key elements under this category may include:
<br>1- Physical attributes: Size, weight, dimensions, color, and material composition.
<br>2- Functional properties: Intended use, performance capabilities, and compatibility.
<br>3- Environmental characteristics: Energy consumption, emissions, recyclability, and presence of hazardous substances.
<br>4- Lifecycle information: Expected lifespan, maintenance needs, and end-of-life options.
 
These characteristics enable standardized documentation, comparability across products, and informed decision-making by stakeholders such as consumers, manufacturers, and regulators.

| Rule ID | Data Attribute              | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|---------------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 5.1   | Life Type                 | "Lifetime" under the Ecodesign for Sustainable Products Regulation (ESPR) refers to the period during which a product or its components are expected to remain functional, safe, and fit for use, under normal or intended conditions, without excessive performance degradation. It is a key indicator of durability and reliability, and may be expressed through: <br>1- Guaranteed lifetime (e.g., warranty or legal durability claim) <br>2- Technical lifetime (based on product design and performance testing) <br>3- Mean Time Between Failures (MTBF) | Mandatory       | Regulation (EU) 2024/1781, Annex I   | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options                                          | |
| 5.2   | Life Value                | The numeric value describing the product’s lifespan in terms of the specified type. | Mandatory       | Regulation (EU) 2024/1781, Annex I                                                 | - Must be a valid integer for lifespan value. <br>- Must be > 0.                                                               | |
| 5.3   | Life Unit                 | The unit corresponding to the respective lifespan, specified using one of the following standardized units: day, month, cycle, year, or running/operating hour. | Mandatory       | Regulation (EU) 2024/1781, Annex I                                                    | - Must contain one of the enumerated values.                                                                                                  | |
| 5.4   | Value (Width)          | Represents the width of the item. | Optional       | Regulation (EU) 2024/1781, Article 7                     | - Must be a valid float representing width.   <br>- Must be > 0.                                         | |
| 5.5   | Unit (Width)                | Specifies unit of measure for widths. | Optional        | Regulation (EU) 2024/1781, Article 7                                                                   | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                        | |
| 5.6   |  Value (Length)             | The length of the item. | Optional       | Regulation (EU) 2024/1781, Article 7                                                  | - Valid float for length value required. <br>- Must be > 0.                                            | |
| 5.7   | Unit (Length) | Defines unit used for measuring length. | Optional        | Regulation (EU) 2024/1781, Article 7                                                                 | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.  | |
| 5.8   |  Value (Diameter)   | Specifies diameter of the item. | Optional       | Regulation (EU) 2024/1781, Article 7                                                             | - Must be float for diameter.    <br>- Must be > 0.                                                       | |
| 5.9   | Unit (Diameter)            | Indicates unit for diameter measurements. | Optional        | Regulation (EU) 2024/1781, Article 7                                                               | -For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options. | |
| 5.10  |  Value (Height)  | Measures height of the item. | Optional       | Regulation (EU) 2024/1781, Article 7                                                                | - Requires a float value corresponding to height.     <br>- Must be > 0.                               | |
| 5.11  | Unit (Height)  | Defines unit of height measure. | Optional        | Regulation (EU) 2024/1781, Article 7                                                          | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                        | |
| 5.12  |  Value (Gross Weight) | Specifies total weight of the item including packaging. | Mandatory       | Regulation (EU) 2024/1781, Article 7                                   | - Must be valid float to reflect gross weight.   <br>- Must be > 0.                                    | |
| 5.13  | Unit (Gross Weight) | Defines measurement unit for gross weight. | Mandatory        | Regulation (EU) 2024/1781, Article 7                                                             | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                          | |
| 5.14  |  Value (Volume)            | Measures product’s volume. | Mandatory       | Regulation (EU) 2024/1781, Article 7                                  | - Valid float required for volume.    <br>- Must be > 0.                                               | |
| 5.15  | Unit (Volume)              | Defines the unit to express volume measurements. | Mandatory        | Regulation (EU) 2024/1781, Article 7                                                                  | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.   | |
| 5.16  |  Value (Gross Volume) | Represents gross volume of the product including packaging. | Mandatory       | Regulation (EU) 2024/1781, Article 7                                     | - Must be valid float for gross volume.     <br>- Must be > 0.                                         | |
| 5.17  | Unit (Gross Volume) | Specifies measurement unit for gross volume. | Mandatory        | Regulation (EU) 2024/1781, Article 7                                           | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                      | |
| 5.18  |  Value (Weight) | Details the weight of the product. | Mandatory       | Regulation (EU) 2024/1781, Article 7                             | - Must be valid float representing weight.   <br>- Must be > 0.                                      | |
| 5.19  | Unit (Weight)  | Defines unit of weight measures. | Mandatory        | Regulation (EU) 2024/1781, Article 7                                                         | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                     |
| 5.20   |  Value (Item Quantity) | *To be covered in next version* | | | | |
| 5.21  | Unit Item Quantity | *To be covered in next version* | | | | |
| 5.22  | Physical State            | The physical state of a product refers to the form in which raw materials, intermediates, or finished goods exist during production, handling, and distribution. It determines how the product is processed, stored, and transported, and typically falls into one of the following categories: Solid, liquid, gas, powder/granular | Optional       | Regulation (EU) 2024/1781, Article 7                                                        | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                                | |
| 5.23  | General Performance Class | Characterizes product performance in a graded class system, promoting consumer decision-making based on efficiency. | Optional       | Regulation (EU) 2024/1781, Article 7     | - Perforance class must be defined in compliance to ESPR, Article 7.                                                                                 | |
| 5.24  | Other Characteristic Name               | *To be covered in next version* | | | | |
| 5.25  | Other Characteristic Outcome               | *To be covered in next version* | | | | |

# Commercial

| Rule ID | Data Attribute        | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|---------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 6.1   | Placed On Market    | The timestamp in the format (yyyy-mm-dd) with or without time zone when the product was put in the market. | Mandatory       |  | - The date format is in complaince to ISO 8601. - Furtehrmore, Its validity can be verified using regular expression-based checks                              | |
| 6.2   | Purpose             | Specify one or more target industries for the product described in the Digital Product Passport. If exchanged via Catena-X, 'automotive ' is a must choice included in the list. | Mandatory       |  | - This is an open field, as no applicable validation rules can be defined for this entry.                                                       | |
| 6.3  | Purchase Order               | A unique identifier assigned to the order of the product for tracking purposes between the supplier and customer. |Optional | | | |
| 6.4   | Recall Information  | Recall information refers to the data and documentation associated with the process of removing a product from the market due to safety, quality, or compliance concerns.| Mandatory| Regulation (EU) 2023/988| | Information on dangerous products should, in general, be made available to the public via the Safety Gate portal.[EU Safety Gate](https://ec.europa.eu/safety-gate/#/screen/home)|

# Materials

"Materials" category refers to: The classification and specification of the substances and material types used in a product, with a focus on their environmental performance, circularity potential, and criticality.

| Rule ID | Data Attribute                        | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 7.1.1 | Applicable (Substances of Concern)  | Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled | Mandatory| Regulation (EU) 2024/1781 | - If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.| |
| 7.1.2 | Chemical ID (Substances of Concern) | A Chemical ID is a unique identifier assigned to a chemical substance to ensure consistent reference, tracking, and management across databases, regulatory systems, and supply chains. It may correspond to standardized identifiers such as CAS Number (Chemical Abstracts Service), EC Number (European Community), or internal system-specific codes. The Chemical ID facilitates accurate identification, classification, and communication of chemical information, including composition, hazards, and regulatory status | Mandatory| Regulation (EU) 2024/1781, Article 7| - The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards. Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.| |
| 7.1.3 | List Type ID (Substances of Concern)| This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number | Mandatory|Regulation (EU) 2024/1781, Article 7| - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options| |
| 7.1.4 | Chemical Name (Substances of Concern)| The name of the material which is present in the product. | Mandatory| Regulation (EU) 2024/1781, Article 7 | - The chemical material ID and its identification (Chemical name) shall be provided in accordance with IUPAC nomenclature standards. Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.| |
| 7.1.5 | Material Unit (Substances of Concern)| This field defines the unit of concentration, selected from a predefined enumeration. Permissible units include mass percent, volume percent, parts per thousand (ppt), parts per million (ppm), parts per billion (ppb), and parts per trillion (ppt) | Mandatory| Regulation (EU) 2024/1781 | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options| |
| 7.1.6 | Concentration (Substances of Concern)| Concentration of the material at the level of the product | Mandatory| Regulation (EU) 2024/1781, Article 7| - The value must be > = 0 | |
| 7.1.7 | Min Concentration (Substances of Concern)| The minimum concentration of the substance of concern at the level of the product | Mandatory| Regulation (EU) 2024/1781, Article 7 | - The value must be > = 0 | |
| 7.1.8 | Max Concentration (Substances of Concern)| The maximum concentration of the substance of concern at the level of the product | Mandatory| Regulation (EU) 2024/1781, Article 7 | - The value must be > = 0 | |
| 7.1.9 | Location of Substances (Substances of Concern)| The location of the substances of concern within the product <br> Further decsription: <br>This requires specifying the exact location of the substance of concern within the product—for example, whether it is contained in the packaging or integrated into the product itself | Mandatory| Regulation (EU) 2024/1781 | - It is challenging to define a fixed rule in this context, as the 'List of Locations for SoCs' varies significantly. One of the technical checks that may be applied is "Verifying whether the value is of type string"| |
| 7.1.10| Exemption for Substances (Substances of Concern)| Exemptions to the substance of concern: An exemption to the substance of concern refers to a formally recognized exception that permits the use or presence of a regulated or restricted chemical substance within a product or component, under specific conditions. The exemption must be documented and justified in accordance with applicable legal frameworks (e.g., REACH, RoHS), and may be subject to review, expiration, or renewal. | Mandatory| Regulation (EU) 2024/1781 | - It is challenging to define a fixed rule in this context, as the 'exemption list' varies significantly. One of the technical checks that may be applied is "Verifying whether the value is of type string"| |
| 7.1.11| Hazard Category (Substances of Concern)| A hazard category is a classification level within a hazard class that indicates the severity or degree of risk associated with a chemical substance or mixture. It refers to the the division of criteria within each hazard class, specifying hazard severity. Lower category numbers typically represent higher hazard severity (e.g., Category 1 is more hazardous than Category 2) | Mandatory| Regulation (EU) 2024/1781, Article 7 | - Valid hazard category statement required. Hazard category defined in compliance with the EU standard as outlined in Article 2 of Regulation (EC) No 1272/2008. | |
| 7.1.12| Hazard Class (Substances of Concern) | Hazard class means the nature of the physical, health or environmental hazard. | Mandatory| Regulation (EU) 2024/1781, Article 7 | - Hazard category defined in accordance to:<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))| |
| 7.1.13| Hazard Statement (Substances of Concern)| A hazard statement is a standardized phrase assigned to a chemical substance or mixture that describes the nature and, where appropriate, the degree of hazard associated with it. Each hazard statement is associated with a unique code (e.g., H315, H301) to ensure consistency and clarity in hazard communication | Mandatory| Regulation (EU) 2024/1781, Article 7 | - Hazard category defined in accordance to:<br>1- Article 2 of Regulation (EC) No 1272/2008<br>2- labelling and packaging of substances and mixtures, amending and repealing Directives 67/548/EEC and 1999/45/EC <br>3- amending Regulation (EC) No 1907/2006))| |
| 7.1.14 | Documentation               | *To be covered in next version* | | | | |
| 7.2.1 | Applicable (Material Composition)   | Check whether the connected attributes are applicable to the product. If it is not applicable (false), the corresponding fields may remain unfilled | Mandatory| Regulation (EU) 2024/1781  | - If 'Applicability' is marked as 'Yes', the subsequent fields must be completed. If it is marked as 'No', leaving the fields blank is acceptable.| |
| 7.2.2   | Component Name               | *To be covered in next version* | | | | |
| 7.2.3 | Component Code               | *To be covered in next version* | | | | |
| 7.2.4  | Component Description               | *To be covered in next version* | | | | |
| 7.2.5  | Component Location               | *To be covered in next version* | | | | |
| 7.2.6  | Sorting Information               | *To be covered in next version* | | | | |
| 7.2.7  | Component Passport Identifier               | *To be covered in next version* | | | | |
| 7.2.8 | Chemical ID (Material Composition)  | A Chemical ID is a unique identifier assigned to a chemical substance to ensure consistent reference, tracking, and management across databases, regulatory systems, and supply chains. It may correspond to standardized identifiers such as CAS Number (Chemical Abstracts Service), EC Number (European Community), or internal system-specific codes. The Chemical ID facilitates accurate identification, classification, and communication of chemical information, including composition, hazards, and regulatory status | Mandatory| Regulation (EU) 2024/1781, Article 7 | - The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards.<br>Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.| |
| 7.2.9 | List Type ID (Material Composition) | This field specifies the classification system or standard employed for the identification of chemical substances. Acceptable standards may include, but are not limited to, the Chemical Abstracts Service (CAS) Registry Number, the International Union of Pure and Applied Chemistry (IUPAC) nomenclature, or the European Community (EC) number | Mandatory| Regulation (EU) 2024/1781, Article 7 | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options| |
| 7.2.10 | Chemical Name (Material Composition) | The name of the material which is present in the product. | Mandatory| Regulation (EU) 2024/1781, Article 7 | - The chemical material ID and its identification  (Chemical name) shall be provided in accordance with IUPAC nomenclature standards.<br>Although IUPAC nomenclature is preferred, alternative naming conventions (e.g., CAS, EC) are also acceptable.| |
| 7.2.11 | Material Type               | *To be covered in next version* | | | | |
| 7.2.12 | Material Origin               | *To be covered in next version* | | | | |
| 7.2.13 | Material Passport Identifier               | *To be covered in next version* | | | | |
| 7.2.14 | Material Unit               | *To be covered in next version* | | | | |
| 7.2.15 | Concentration               | *To be covered in next version* | | | | |
| 7.2.16 | Min Concentration               | *To be covered in next version* | | | | |
| 7.2.17 | Max Concentration               | *To be covered in next version* | | | | |
| 7.2.18 | Location               | *To be covered in next version* | | | | |
| 7.2.19  | Recycled               | *To be covered in next version* | | | | |
| 7.2.20 | Documentation               | *To be covered in next version* | | | | |
| 7.3.1 | List Name (Declarable Ingredient List)               | *To be covered in next version* | | | | |
| 7.3.2 | Document ID (Declarable Ingredient List)               | *To be covered in next version* | | | | |
| 7.3.3 | Documentation (Declarable Ingredient List)               | *To be covered in next version* | | | | |

# Sustainability

| Rule ID | Data Attribute     | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 8.1   | State            | The current condition or lifecycle phase of a product, as recorded in the Digital Product Passport, indicating whether the product is new, used, repaired, refurbished, remanufactured, or at end-of-life, in order to support traceability, circularity, and sustainability objectives. | Mandatory       | ESPR proposal from March 30th, 2022 Annex I.                | - For attributes with an 'Enumeration', the implementation of a validation rule is not necessary as the DPP provider has to select from one of the defined options.                                                   | |
| 8.2   |value (product carbon footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product; | Mandatory       | ESPR proposal from March 30th, 2022 Annex I, detailing carbon footprint documentation.|  | - In accordance with the provisions outlined in the Catena-X TfS PCF Verification Framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.|
| 8.3   |footprintUnit(product carbon footprint)| The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I |  |- In accordance with the provisions outlined in the Catena-X TfS PCF Verification Framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.                       |
| 8.4   | footprintType(product carbon footprint)| Specifies type of environmental footprint measured, aiding in detailed sustainability analysis. | Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7   | |  - In accordance with the provisions outlined in the Catena-X TfS PCF Verification Framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.|
| 8.5   | footprintLifecycle(product carbon footprint)| The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'| Mandatory       |ESPR provisional agreement from January 9th, 2024 Annex I  |  | - In accordance with the provisions outlined in the Catena-X TfS PCF Verification Framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.|
| 8.6   | performanceClass(product carbon footprint)| Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category | Mandatory       | ESPR provisional agreement from January 9th 2024 Article 2  |                      | |
| 8.7   | facility(product carbon footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product. | Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III  | Validity should be verified using regular expression-based checks in case BPNA is provided| The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' [Catena-X BPN Standard](https://catenax-ev.github.io/docs/next/standards/CX-0010-BusinessPartnerNumber). Only applicable for Catena-X members |
| 8.8   | Facility Address               | *To be covered in next version* | | | | |
| 8.9   | Rulebook               | *To be covered in next version* | | | | |
| 8.10   | Declaration               | *To be covered in next version* | | | | |
| 8.11  | value (product environmental footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;| Optional |  ESPR proposal from March 30th, 2022 Annex I  |  - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - Product Environmental Footprint (PEF)  | |
| 8.12  | footprintUnit (product environmental footprint)|The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I | - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - Product Environmental Footprint (PEF) | |
| 8.13  | footprintType (product environmental footprint)| Categorizes type of environmental impact for depth in sustainability analysis.| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7 | - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - Product Environmental Footprint (PEF)                                        | |
| 8.14  | footprintLifecycle (product environmental footprint)| The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'.| Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I  |- ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - Product Environmental Footprint (PEF)                                         | |
| 8.15  | performanceClass (product environmental footprint)| Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 2 |      | |
| 8.16  | facility (product environmental footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.| Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III | - The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. Additionally, its validity can be verified using regular expression-based checks | |
| 8.17   | Facility Address               | *To be covered in next version* | | | | |
| 8.18  | Rulebook               | *To be covered in next version* | | | | |
| 8.19  | Declaration               | *To be covered in next version* | | | | |
| 8.20  | value (product material footprint) | The value of the footprint of the product. The footprint may fall into one of the following three categories: 1- The environmental footprint of the product, expressed as a quantification, in accordance with the applicable delegated act, of a product’s life cycle environmental impacts, whether in relation to one or more environmental impact categories or an aggregated set of impact categories; 2- The carbon footprint of the product; 3- The material footprint of the product;   | Optional | ESPR proposal from March 30th, 2022 Annex I| - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.||
| 8.21  |footprintUnit (product material footprint) | The unit of measurement of the environmental impact category. For each impact category a specific unit is used. If an aggregation is used, utilize the normalization and weighting methods used in the referenced rulebook. | Mandatory       | Footprint measurement units standardized in validation chapters. || ESPR provisional agreement from January 9th, 2024 Annex I|- ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.||
| 8.22  | footprintType (product material footprint)| Impact categorization clarifies footprint implications within material contexts.| Mandatory       | ESPR provisional agreement from January 9th 2024 Article 7| - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.                          | |
| 8.23  | footprintLifecycle (product material footprint) | The specific phase within a product's life cycle to which the associated environmental footprint is attributed. Typical stages include, but are not limited to, 'raw material acquisition and pre-processing', 'core product manufacturing', 'distribution and logistics', and 'end-of-life treatment and recycling'   | Mandatory       | ESPR provisional agreement from January 9th, 2024 Annex I | - ISO 14040 & ISO 14044 – Life Cycle Assessment (LCA) principles and framework. <br> - The Product Carbon Footprint (PCF) calculated in compliance with ISO 14067.            | |
| 8.24  | performanceClass (product material footprint) | Performance classification of a footprint refers to the categorization of a product’s quantified environmental impact—such as its carbon footprint—based on defined performance criteria, benchmarks, or reference values. In accordance with ISO standards, this classification supports comparability, consistency, and transparency in environmental performance evaluation, enabling stakeholders to assess whether a product meets specific environmental objectives or outperforms alternatives within the same functional category | Mandatory       |  ESPR provisional agreement from January 9th 2024 Article 2 |  ||
| 8.25 | facility (product material footprint)| The identifier used for a location. Unique facility identifier means a unique string of characters for the identification of locations or buildings involved in the value chain of a product or used by actors involved in the value chain of a product.| Mandatory       | ESPR provisional agreement from January 9th 2024 Annex III   | - The BPNA is aligned with the Catena-X (Cofinity-X) 'Golden Record' standard. Additionally, its validity can be verified using regular expression-based checks  | |
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

# Compliance

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 9.1   | Compliance Country             | *To be covered in next version* | | | | |
| 9.2   | Compliance Regulation Name            | *To be covered in next version* | | | | |
| 9.3   | Compliance Statement            | *To be covered in next version* | | | | |
| 9.4   | Compliance Reason for Exemption            | *To be covered in next version* | | | | |
| 9.5   | Compliance Remark            | *To be covered in next version* | | | | |
| 9.6   | Compliance Documentation            | *To be covered in next version* | | | | |

# Sources

| Rule ID | Data Attribute      | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|-------------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 10.1   | Sources             | *To be covered in next version* | | | | |
| 10.2   | Category | Defines the document's category for sorting purposes. | Mandatory | Regulation (EU) 2024/1781, Annex III and Article 27 | - Must contain one of the enumerated values. | |

# Additional Data

| Rule ID | Data Attribute | Data Attribute Description                                                                 | Mandatory/ Optional | Regulatory Reference                                                                                   | Syntax checks| Content validation |
|---------|--------------|-----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----|
| 11.1  | Description  | Provides contextual information about the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must provide a clear and concise description of the attribute. | |
| 11.2  | Label        | Human-readable name of the attribute. | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must specify a readable label for the attribute.  | |
| 11.3  | Type Unit    | Complex description of the type, helping define unit characteristics or indicating empty if the "children" property is used. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must select appropriate unit type or indicate empty when "children" are specified. | |
| 11.4  | Data Type    | Specifies the data type;  | Mandatory | Regulation (EU) 2024/1781, Article 9 & 4 | - Must conform to specified data types under regulations. <br> - if "object" is selected, children are utilized instead of data. | |
| 11.5  | Data         | Content of the attribute, dependent on data type and unit specifications. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Must align content with data type and unit dependency. | |
| 11.6  | Children     | Children elements of the hierarchical structure, extending attribute definitions. | Optional | Regulation (EU) 2024/1781, Article 9 & 4 | - Structure must enable hierarchical definitions as necessary. | |
```
