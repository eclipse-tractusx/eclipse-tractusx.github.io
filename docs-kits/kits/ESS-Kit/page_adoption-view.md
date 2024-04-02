---
id: ESS Kit Adoption View
title: Adoption View
description: 'Environmental and Social Standards Incident Management Kit'
sidebar_position: 2
---

![ESS Kit Icon](@site/static/kits/ESS-Kit/ess-kit-icon.png)

## Vision & Mission

### Introduction

The German Supply Chain Due Diligence Act came into force on 1 January 2023. This law regulates corporate responsibility for compliance with human rights in global supply chains. These include, for example, protection against child labour, the right to fair wages and the protection of the environment. This legislation can be added to a long list of existing and future legislations that regulate our global supply chains, like the EU Corporate Sustainability Due Diligence Directive (CSDDD), the EU Ecodesign for Sustainable Products Regulation (ESPR), EU Corporate Sustainability Reporting Directive (CRSD), or the International Bill of Human Rights.

Catena-X aims to support supply chain due diligence obligations in a market environment that misses full up- and downstream transparency. This is argued to be relevant for Environmental and Social Standards (ESS) incident tracking, without compromising GAIA-X and Catena-X principles like data sovereignty, interoperability, standardization, and use of federated services.

The ESS-solution enables companies to search for ESS incidents in their supply chain and thus covers the "occasion-related tracking of ESS-related incidents" for the Supply Chain Act. Basically there are two search directions: The bottom - up search starts at the Incident Originator and works downstream up to the OEM. The top - down search always looks towards the direct suppliers and works upstream.

### Vision

As companies governed by environment and social standards (ESS), we would like to determine, if we are affected by an incident reported in the global supply network. Consequently, we could prove to be fully compliant with legal requirements, including but not limited to the German Supply Chain Due Diligence Act.

### Mission

The automotive supply network is described as highly complex and globally interwoven. It operates in a heterogeneous political and environmental context with many different ambitions. The current challenges for cross-company ESS incident management are described by:

- High manual effort of a small set of experts that work in their own silos and focus on company-centric investigation. A problem accentuated at the level of small and medium enterprises (SME),
- Low network collaboration and by that long processing time amongst business partners,
- Lack of trust to share data, amongst many intermediates,
- Varying quality of information and sources.

Our mission is to streamline the handling of incidents reported to the Catena-X network. The ESS KIT supports cross-company ESS incident management with appropriate processes. This radical change from our organization-centred model would mitigate the challenges listed above. The ESS KIT consists of the following building blocks:

- Standards to guarantee data sovereignty and data security, like the Connector KIT (EDC), Business Partner KIT and Agents KIT, as well as our standards,
- Standardized data model accompanied with a defined tracing process to reduce processing time for an incident.

### Business value

If Catena-X members want to minimize their ESG risk and bring transparency into their supply chains, there is a strong need to collect knowledge and reliable information. Arguably, the primary added value of the ESS KIT is our simplified cross-company communication coupled with the clearing agency concept.

With the Clearing agency in place, business partners subscribing to the ESS KIT, can with confidence collect incidents from multiple actors and a broad range of sources (e.g., receiving incidents from company's internal incident management systems or from public news reports and automated information gathering). The clearing agency, as an independent body will among other activities reduce fraudulent cases and consolidate information of potential incidents.

The processes of the ESS KIT will transfer information in the respective supply chains to efficiently zero-in on the relevant business partners. So, with the ESS KIT, the members of the Catena-X network are enabled to act quickly due to collaboration and standardization.

Furthermore, the ESS KIT allows for quick adaptation to new national and internal laws and helps ensure legal compliance through enhanced supply chain transparency and verification.

Thus, the ESS incident KIT offers a uniform and cross-sectoral grievance mechanism for managing incidents related to specific occasions, filling a gap that currently exists.

## Use Case

### Prerequisites

The scope of our business is the prompt handling of incidents reported to the Catena-X network. The following prerequisites are necessary for the ESS KIT:

- High number of Catena-X members need to be onboarded to cover our supply chains and increase the success rate of the tracing of incidents,
- Catena-X members agree to a code of conduct,
- The member needs to follow the onboarding process.

### Customer Journey: Occasion-related tracking of ESS-related incidents

This customer journey describes the process when an incident is reported to the Catena-X network. From the determination that needs to be made regarding its relevance to the business partners and further processing.

This KIT support **the detection of incidents** from different sources (manual or automated), before being categorized by incident types / sub-types. The unstructured information (text and/or pictures) about each incident will be collected along with country-, company-, material-related data if available (note: no BoM data collected). The quality of the incident data is not guaranteed at this stage and for some cases, the investigation may be challenging due to insufficient information about the supply network.

The Clearing Agency is prompted to **clear incidents.** This independent body has the tasks among others, to improve quality of data and reduce fraud or fakes. This includes but is not limited to, manual search and input from expert, consolidation of reports of the same incident and finally accept or archive incidents. Once the Clearing Agency found that the incident\'s originator is a Catena-X member, the Clearing Agency can use Catena-X Services find out the BPN-L, BPN-S and the EDC endpoints of the incident originator. Then the ESS incident is transferred to the incident originator via the Catena-X network. In case no Catena-X member can be identified as incident originator, the clearing agency will maintain the corresponding status "no member found".

The **investigation of the ESS-related incident** is used to determine the cause of the reported incident. All business partners involved work to identify and confirm the origin of the incident. Once the source is identified and confirmed, a decision is made by the business partners whether to accept or reject the ESS-related incident.

**The trace of an incident** is operated through the decentral Catena-X supply network. The process moves from business partner to business partner in their supply chain with the incident originator as the starting point for a bottom - up approach and at the OEM for a top - down approach.

The use case ESS believes that the most promising way to solve an ESS incident will be a bottom - up approach. This is described here.

It means that the transfer of information is initiated by L0 who identifies its impacted customers (L1) using the bottom-up search logic (for example Knowledge Agent). The impacted customers (L1) can then push the information up the supply chain (i.e. their impacted customers or L2) and so on until it arrives at the end of the chain (i.e. OEM).

The trace of an incident follows previously mentioned principles along any obligations enforced by law. For any business partner in the supply chain, its access to the status/information related to a specific incident will depend on its degree of relationship with the impacted company:

- **Level 0 (L~0~):** the incident report is targeting the company directly. At that level, the incident manager of the L~0~ can consult all the relevant information and will manage the status and response.

- **Level 1 (L~1~):** those business partners have a direct relationship with the L~0~. As already supported in existing legislations, L~1~ business partners will have access to the status of the incident and the full information of the potential incident at the L~0~.

- **Level n (L~n~)**: those business partners have an indirect relationship with the potential incident originator (L~0~). They will receive from the previous business partner (L~n-1~) the anonymized incident information (anonymized title & description, category, status, etc.) along with the degree of relationship (i.e. their distance to the L~0~). The incident originator's identity (L~0~) and the path from L~0~ to L~n~ in the impacted supply chain will not be communicated, nor documented.

- **Clearing Agency:** these users can see the status and the original intake of information of all incidents. The clearing agency will only be able to identify the targeted business partner (L~0~) who is handling the incident. Finally, if the incident can be closed by the L0, the clearing agency will receive a status update.

**Note**: For the top - down approach with IRS recursive this is not applicable because no information about the ESS incident is transferred between Business Partners. See [Data Chain KIT](https://eclipse-tractusx.github.io/docs-kits/category/data-chain-kit/) for further details.

![ESS_KitCustomerJourney](@site/static/kits/ESS-Kit/CatenaX_ESS_KitCustomerJourney.svg)

### ESS Incidents personas

#### Incident Issuer

| **Short Description** | **Task / Responsibilities** |
|-----------------------------|-----------------------------|
| Issuer can be any person or institution | Raise ESS-related incident in a structured or unstructured manner |
| Not necessarily an ESS expert | Ambition to make ESS-related issue transparent and visible with as much information as possible |
| Can be either internal (e.g. auditor or employee) or external (e.g. business partner, individual, NGO, automatic-detection) | Committed to provide relevant information to properly address the ESS-related incident to the right business partner/ organizational unit |
| Uses either formal contact point (Catena-X Incident App, Catena-X Webpage, Company Webpage) or any kind of (social) media to issue ESS-related incident | |
| Potential contact to incident manager (ESS), human rights officer/risk management specialist | |

#### Incident Manager

| **Short Description** | **Task / Responsibilities** |
|-----------------------------|-----------------------------|
| Operational internal role/ central function that covers incidents as primary responsibility | Recording of ESS-related incidents |
| Follows statutory requirements and incidents through each process step until closure | Assignment of the ESS-related incident to the correct category with as much information as possible. Categories are: Violation of environmental and/or social standards |
| First contact and dispatcher for ESS-related incidents and incident status | Rejection or acceptance of ESS-related incident |
| Incident-Manager to get in contact with (e.g. sustainability@...) | Assignment of ESS-incident to internal business partner |
| SME/Business Partner for human rights officer, sustainability manager product/corporate, audit (internal, external) | Collaboration & cooperation with business partners and internal units |
| Potential contact to incident issuer (ESS) | Agreement of binding measures with relevant SMEs/ Business Partners |

#### Clearing Agent

| **Short Description** | **Task / Responsibilities** |
|-----------------------------|-----------------------------|
| Operational internal role/ central function that covers incidents as primary responsibility | Receives incident from various sources |
| First contact and dispatcher for ESS-related incidents and incident status | Reduce fraud / identify fake incidents |
| | Consolidate incidents (no multiples) |
| | Set / maintain central incident status and anonymized information (respect: one-up/one-down, decentral, data-sovereign, "flag" to allow sharing) |
| | Forward information to L0 of cleared ESS incident or archive of ESS incident |
| | Transfer ESS incidents to archive |

### Semantic models

Catena-X offers various semantic models depending on the specific application and KIT. They establish a fundamental understanding of the data and its connections, facilitating compatibility between different data sets. The data models of Catena-X prioritize principles such as clarity, standardization, distinction, verifiability, and comprehensiveness.

The data model follows the Catena-X Standard [CX-0144](<https://catena-x.net/de/standard-library>) and is modelled following the Standard [CX-0003](<https://catena-x.net/de/standard-library>). Below, you can find an excerpt of the full data set:

#### ESS Incident Information

| **Attribute Name** | **Description** | **Example** |
|-----------------------------|-----------------------------|-----------------------------|
| Category and sub-category  | Environmental and social standards related incident category according to Supply Chain Due Diligence Act  | Environmental (ex: usage of mercury, usage of harmful chemicals) \| Social (ex: child labour, work safety, discrimination)  |
| Subject and description  | Title of an incident in the context of ESS (Environmental and Social Standards) with its description  | Child labour in country x for product y reported. Small children under the age of 15 clean barrels with bare hands and under dubious working and payment conditions.  |
| Attachment(s)  | Picture(s) about the reported incident in the context of ESS (Environmental and Social Standards)  | Upload picture about child work in country x for product y or upload other additional documents/reports#  |
| Date  | Date and time information when an incident occurred  | 2022-08-31T00:00:00Z  |

#### Product Information

| **Attribute Name** | **Description** | **Example** |
|-----------------------------|-----------------------------|-----------------------------|
| Description  | Description of product or component affected by an incident in the context of ESS (Environmental and Social Standards)  | Natural Rubber  |
| Raw material  | Raw material that causes an incident in the context of ESS (Environmental and Social Standards)  | Mercury \| Cobalt \| Natural Rubber  |

#### Company Information

| **Attribute Name** | **Description** | **Example** |
|-----------------------------|-----------------------------|-----------------------------|
| Country subdivision  | Region within a country to which an incident in the context of ESS (Environmental and Social Standards) belongs  | Sao Paolo  |
| Coordinates  | Exact geographic position of an incident in the context of ESS (Environmental and Social Standards)  | Longitude and Latitude (will be entered automatically)  |
| Company name  | Name of a company / an organisation that is the originator of an incident in the context of ESS (Environmental and Social Standards)  | ABC company  |
| Address  | Address of ESS originator (street, zip code, city\...)  | Mainroad 1, 73230 Model City  |
| BpnL / BpnS / BpnA  | BPN-L/S/A of the company that causes the incident  | Rubbery Ltd. (BPN-L) \| Site in Dingolfing (BPN-S) \| Dingolfing Werksstrasse 1, Tor 2.1 (BPN-A)  |

#### Contact Information

| **Attribute Name** | **Description** | **Example** |
|-----------------------------|-----------------------------|-----------------------------|
| First and last Name  | Contact name of ESS incident issuer  | Camille Mustermensch  |
| E-Mail Address  | E-Mail address of ESS incident issuer  | <xyz.abc@xxx.com> |
| Phone number  | Phone number of ESS incident issuer  | +49 89 123456789  |
| Address  | Address of ESS incident issuer  | XYZ-Road, 73230 Kirchheim  |
| Anonymous  | Flag that Incident issuer wants to be anonymous  | Checkbox: ticked / not ticked  |

## Business process

### Business architecture

![ESS_KitBusinessArchitecture](@site/static/kits/ESS-Kit/CatenaX_ESS_KitBusinessArchitecture.png)

### Access & Usage Policies / Code of conduct

#### Preamble

**Code of Conduct of the Catena-X Use Case Sustainability / Environmental and Social standards**

In the Catena-X use case sustainability / environmental and social standards, principles are defined that serve the goal of establishing transparent and trusting working methods in the Catena-X network in a binding manner. 
These principles are based on national and international legal regulations and are based on internationally recognised standards such as the International Charter of Human Rights, the UN Guiding Principles on Business and Human Rights, the OECD Guidelines for Multinational Enterprises, as well as the ILO core labour standards and the principles of the UN Global Compact.
Accordingly, this document defines the minimum requirements and clear expectations for the corporate due diligence obligations of the members. We require you, as our members, to address and enforce them appropriately vis-à-vis your business partners. Acting responsibly and lawfully is therefore an integral part of participating in the Catena-X network.
The Catena-X network includes companies and organizations that design, manufacture, market or provide goods and services for the automotive industry. The Code must be adopted by every company participating in the Catena-X Use Case Sustainability / Environmental and Social Standards in a binding manner or guaranteed by an appropriate standard of its own. The recognition of the Catena-X Code of Conduct is the basis of a cooperative cooperation with our members.  Given the complexity and dynamics of the n-Tier network, we rely on joint activities with all our members to identify risks to the environment and society, create more transparency and achieve more effectiveness.
The Catena-X Use Case Sustainability/Environmental and Social Standards participants should view the Code as a comprehensive supply chain initiative. The basic prerequisite for membership is that business activities consistently comply with the law.
The Code also encourages participants to go beyond legal compliance, drawing on internationally recognized standards to promote social and environmental responsibility and business ethics, for example by increasing their own sphere of influence through complementary measures or collaborations, and by encouraging collaboration with non-governmental organizations
The Catena-X Use Case Sustainability / Environmental and Social Standards is committed to working regularly with stakeholders on the further development and binding implementation of the Code of Conduct.
The Code consists of three sections. Section I contains the requirements for Catena-X members. Section II describes the proposed implementation of the Catena-X Code of Conduct. Section III refers to the elements of an acceptable system that complies with this Code.

#### I Requirements for Catena-X members

The following requirements for Catena-X members are derived, among other things, from the internationally recognized guiding principles. 

#### 1 Responsible Business practices

Acting responsibly and lawfully is an integral part of our values. The basic prerequisite is therefore a consistently compliant business activity. The Catena-X member must comply with all laws applicable to its product and operation and with national and international standards regarding sustainability, environmental protection, ethical management, and respect for human rights.

#### 2 Social Responsibility

For Catena-X the social responsibility towards employees and other potential stakeholders is of central importance. The Catena-X member must therefore take appropriate precautions to avoid committing and participating in human rights violations. Catena-X rejects the threat and defamation of persons who advocate the protection of human rights within the Catena-X association and address human rights violations (human rights defenders) and also expects Catena-X members to ensure their protection if this is necessary. 

##### 2.1 Prohibition of forced labor and slavery

The Catena-X member must ensure that forced labor and modern slavery are prevented in their own business area and with business partners. These are specifically:

- Work or service required of a person under penalty and for which he did not voluntarily make himself available (including ILO C29) and
- All forms of slavery, slave-like practices (e.g., demand for excessive fees and retention of documents), serfdom or other forms of domination or oppression (e.g., debt bondage and use of force) in the vicinity of the workplace, for example through extreme economic or sexual exploitation or humiliation.

Catena-X prohibits any form of forced or compulsory labor, including bonded labor, human trafficking and any other form of modern slavery in accordance with ILO Convention No. 295. Catena-X members shall ensure that their employees freely choose their activity and terminate the employment relationship in accordance with the statutory provisions as well as due payments. Neither bonded labor nor financial burdens may be imposed on employees. This also applies to employees of their business partners.

##### 2.2 Prohibition of child labour

The Catena-X member must ensure that child labor and the worst forms of child labor are prevented according to ILO conventions in their own business area and with business partners and commits himself to comply with the following requirements:

- Prohibition of the worst forms of child labour (including ILO C182).
- The minimum age for taking up employment corresponds to the requirements of the national law of the member location and is at least 15 years (including ILO C138).
- Persons under the age of 18 are minors and therefore in need of protection (including ILO C182). They shall not carry out work which, by its nature or the circumstances in which it is carried out, would endanger their safety, health or morality, for example, by working overtime or night shifts (including ILO C138).

##### 2.3 Freedom of association and right to collective bargaining

The Catena-X member recognizes the right of employees to form employee representation and to conduct collective bargaining to regulate working conditions. In its business area, the Catena-X member must uphold the right of employees to unite in trade unions. Formation, accession, and membership in a trade union may not be used as reasons for discrimination or retaliation. Trade unions must be allowed to operate freely and in accordance with the law at the place of employment. This includes the right to strike and the right to collective bargaining. The Catena-X member must also exclude the use of security forces to impair freedom of association.

##### 2.4 Protection against discrimination

The Catena-X member does not tolerate any discrimination. The general prohibition of discrimination in Article 2 (1) of the International Covenant on Civil and Political Rights of 19 December 1966 provides guidance. Unequal treatment in employment, for example due to national or ethnic origin, social origin, language, pregnancy, marital status, disability, sexual orientation, age, gender, trade union membership, political opinion, religion, belief, or other characteristics protected by applicable law (including ILO C111) must be prevented. Unequal treatment also includes the payment of unequal remuneration for work of equal value.

##### 2.5 Right to adequate remuneration

The Catena-X member must ensure that the remuneration paid to employees complies with all applicable wage laws, including those related to minimum wages, overtime, and statutory benefits. In concrete terms, this means:

- The wage must at least comply with the locally applicable industry and legal minimum wage regulations.
- According to ILO 95, wages must be paid in a comprehensible manner and at a certain point in time.
- Compliance with statutory working time regulations and compensation of overtime. Social benefits can be claimed by employees under applicable law (e.g., sick leave). If there is statutory social security, the contributions must be paid.

We encourage Catena-X members to ensure that employees' interests are represented in the working time regulations or at least to take due account of the employees' needs in the organization of working hours.

##### 2.6 Right to health and safety at work

The Catena-X member must comply with all national as well as international standards and laws on occupational safety and health (in particular occupational safety and health, working hours). Furthermore, the working hours must be designed in such a way that industrial accidents, in particular as a result of physical and mental fatigue, are prevented and the health of the employees is maintained (e.g., ILO C001 and ILO C14). This principle also includes temporary work, the secondment of employees, and outsourced work.

##### 2.7 Rights of local communities

The Catena-X member respects applicable local, national, international and traditional land, water and resource rights. In particular, the rights of indigenous peoples and local communities shall be respected and protected throughout the supply chain in accordance with the United Nations Declaration on the Rights of Indigenous Peoples.
The Catena-X member agrees not to participate in land grabbing. The Catena-X member must also follow the prohibition of unlawful eviction of land, forests and waters. This applies if he acquires, cultivates or otherwise uses land, forests and waters that serve as a livelihood of a person. Rather, the Catena-X member must obtain free, prior and informed consent (FPIC) from existing land users, for example as defined in the UN program: reducing emissions from deforestation in developing countries (REDD), and provide adequate compensation if the supplier has been granted land use.

#### 3 Ecological responsibility

For the Catena-X member, responsibility for the environment means protecting the finite resources of nature. Therefor a careful and efficient use of resources is of central importance.
The Catena-X member must comply with all national and international environmental standards and laws applicable to the respective operating location. We also expect the Catena-X member to refrain from harmful soil modification, water and air pollution, harmful noise emissions or excessive water consumption, which significantly affect the natural basis for the preservation and production of food, deny a person access to safe drinking water, make it difficult or impossible to access sanitary facilities, or harm a person's health.

##### 3.1 Decarbonization

The Catena-X member must advance the decarbonization of the entire value chain. The emission reduction targets, and renewable energy targets are to be implemented in accordance with the Paris Climate Agreement (COP 21) and appropriate binding measures are to be taken.

##### 3.2 Resource conservation and circular economy

The Catena-X member must ensure responsible use of resources such as water, energy, raw materials and materials and refrain from waste. We also expect the Catena-X member to empower its own n-tier supply chain with regard to the provision of secured secondary raw material sources and to examine the greatest possible use of secondary raw materials. This also includes, for example, the establishment of closed loops for recycling reusable materials in one's own supply chain.

##### 3.3 Handling hazardous substances and waste

The Catena-X member applies appropriate procedures that take into account environmental, health and safety aspects. Therefore, the Catena-X member must label these substances in accordance with applicable regulations and ensure that they are handled, transported and stored safely. It must also be ensured that they are properly reused, recycled or disposed of.

The provisions from the following conventions must be followed:

- the Minamata Convention (use of mercury),
- the Stockholm Convention (persistent organic pollutants) and
- the Basel Convention (transboundary shipment of hazardous waste and its disposal).

In addition, all of the relevant operating locations and/or affected markets (e.g., the European Regulation (EC) No 1907/2006 (REACH)) need to comply with other laws and regulations relating to hazardous substances, chemicals and substances.
We also expect that the Catena-X member and its suppliers, regardless of whether they are members of Catena-X or not, will inform themselves about future legislation applicable to them and prepare for its timely implementation.

##### 3.4 Protection of biodiversity

The Catena-X member must protect natural ecosystems and not contribute to change, deforestation and damage to natural forests and other natural ecosystems. The guidelines of the High Conservation Value Resource Network (HCV) and the High Carbon Stock Approach (HCSA) should be applied where applicable.

##### 3.5 Animal welfare

The Catena-X member that processes animal products must ensure the implementation of standards and best practice methods for compliance with animal welfare along the entire supply chain. Furthermore, we expect the Catena-X members to preferentially use alternative methods without animal testing, unless animal testing is mandatory by law. In any case, the Catena-X member must comply with national and international regulations on animal welfare and animal testing.

In addition, we demand compliance with further principles:

- The 3R principle for animal experiments (reduction, refinement, replacement),
- the Five Freedoms of the Farm Animal Welfare Committee (FAWC) to assess animal welfare, and
- the principles of the World Organisation for Animal Health (OIE) on animal welfare (Terrestrial Animal Health Code).

##### 3.6 Responsible procurement of raw materials and minerals

The Catena-X member must responsibly source raw materials and minerals used in their products by developing a management system that promotes supply chain traceability and transparency, and special due diligence processes in accordance with the "OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas", particularly the 3TG (tin, tantalum, tungsten, gold).
The Catena-X member shall source raw materials from verified sources. We encourage the Catena-X member to apply independent third party certification, such as the Responsible Mining Standard of the *Initiative for Responsible Mining Assurance* (IRMA). Furthermore, if relevant, we recommend participating in multi-stakeholder initiatives (e.g., *Responsible Minerals Initiative*) that aim to establish the standards defined in this document in raw material supply chains.

#### 4 Implementation of corporate duty of care

The Catena-X member must accordingly align its business and procurement activities with these principles and address and enforce them appropriately along its supply chain.
We expect the Catena-X member to have a due diligence process with corresponding measures in their own business area and in business areas, over which the member exercises, has established or introduces a decisive influence, in order to ensure that the legally stipulated standards are adhered to and addressed in its own business area as well as in its supply chain, e.g., implementation of the Code of Conduct of the *Responsible Business Alliance* (RBA) or the Guiding principles of the *Drive sustainability partnership*.

To promote the implementation of this Code, we expect the Catena-X member to take the following actions:

**Risk management**: We expect that the Catena-X member implements an appropriate and effective management system for entrepreneurial due diligence for people and the environment in their organization and appropriately addresses their immediate suppliers to implement such a management system. This includes, for example, contractual agreements, a supplier directive for sustainable procurement as well as audits and other suitable measures to prevent or minimize these risks or to end the violation of human rights-related or environmental obligations.

The Catena-X member shall adequately address sustainability requirements in accordance with this code of conduct to its direct business partners that include at least the following topics: Prohibition of child labor; young workers; wages and social benefits; working time; prohibition of modern slavery; freedom of association and collective bargaining; non-discrimination and harassment; women's rights; diversity, equality and inclusion; rights of minorities and indigenous peoples; land, forest and water rights and eviction; occupational safety and health; combating corruption and money laundering; data protection and data security; financial responsibility; disclosure of information; fair competition and antitrust law; conflicts of interest; plagiarism; intellectual property; export controls and economic sanctions; whistleblowing and protection against retaliation; responsible chemical management; sustainable resource management; waste prevention; biodiversity, land use and deforestation; soil quality.

**Effectiveness**: The Catena-X member shall take reasonable measures to prevent or minimize human rights or environmental risks or to end the violation of human rights or environmental obligations and to eliminate or mitigate its consequences. The appropriateness is determined by the member's business activities, by his power of influence, by the severity of the injury to be expected, its reversibility and probability as well as by the type of causal contribution. In principle, the agreement and implementation of measures are the responsibility of the respective company. Nevertheless, it may be advisable and necessary for the Catena-X member to initiate the bundling of interest groups (potentially also affected companies, non-governmental organizations, trade unions, politics, as well as potentially affected persons) on an event-related basis. Pooling resources and creating transparency increases the potential to derive and establish effective measures.

**Further development and support**: Catena-X Automotive Network e.V. acknowledges that the implementation of the duty of care described here is a dynamic process. Catena-X Automotive Network e.V. supports the Catena-X member in the implementation of human rights due diligence and in ensuring human rights standards through e.g., information, training and constructive exchange.
This clause does not establish any legal claim to specific support measures by the Catena-X Automotive Network e.V. community.

#### II Implementation of the Catena-X Code of Conduct

The requirements for Catena-X members are derived from national and international standards and laws. The Catena-X Code of Conduct for the Use Case Environmental and Social Standards describes the requirements and expectations for audit and information rights, effectiveness, reporting options, handling infringements and liability towards third parties as follows:

##### 1 Audit and information rights

On a case-by-case basis, the Catena-X code requires the cooperation of the Catena-X member and its business partners in order to trace an incident with the aim of minimizing the risk and ideally eliminating it. Where appropriate, the Catena-X member shall, upon request, answer in full and truthfully to the Committee on Environmental and Social Standards in the Catena-X Automotive Network e.V. questions about compliance with its obligations under this standard, including its actions, possible violations and complaints. The Catena-X member must also provide appropriate documentation upon request and name contact persons for inquiries. When requesting information, the committee of the Catena-X Automotive Network e.V. complies with all applicable laws and regulations, especially those of data protection.

Within the scope of its possibilities, the Catena-X member must arrange for its business partners to provide other affected Catena-X participants in the supply network with the information they need to implement their legal duty of care in their supply chain.

##### 2 Effectiveness

The Catena-X member regularly reviews the effectiveness of the measures they have taken as a company. In doing so, the Catena-X members implemented the aforementioned entrepreneurial duty of care in the cooperation and support of the Catena-X network. The Catena-X business partners must regularly inform each other about the status of implementation or addressing of these obligations at their suppliers and thus adhere to the "need-to-know" and "sharing is caring" principles.

##### 3 Reporting options

The ESS KIT is the base for a complaint mechanism that could be reached in the event of (potential) violations of the above requirements by Catena-X members.

##### 4 Dealing with violations

The Catena-X members ensure that persons who have filed a complaint via the complaint mechanism described in the ESS KIT will not suffer any disadvantages. In particular, persons who have filed a complaint may not be dismissed on the basis of the complaint, passed over in the case of promotions, transferred, deployed in lower positions, excluded from training, obliged to perform special work or deployed at a lower wage. The principle applies that the aforementioned protection against disadvantages only applies to persons who have acted to the best of their knowledge and belief in relation to your complaint.
The Catena-X member is required by law to establish a complaint mechanism that allows people in the supply chain to be made aware of possible violations of human rights.

##### 5 Liability towards third parties

All Catena-X members of the Catena-X Automotive network as well as all Catena-X business partners bear sole responsibility for the duties incumbent upon them. If one party breaches its obligations, this shall not relieve the other party from fulfilling its obligations.

#### III Elements of the Catena-X ESS system standards

The system implementation must take into account the Catena-X principles for an open, data-sovereign, standardized and decentralized network. The data exchange for the environmental and social standards use case takes place exclusively between the respective network partners ("one-up/one-down" principle). The possible incidents are distributed to the potentially affected Catena-X members via the supply network on an event-by-event basis and processed there. For this purpose, the greatest possible participation of companies in the automotive supply chain in the Catena-X data ecosystem is to be striven for and required. By participating in the Catena-X data ecosystem [DS1], the companies undertake to ensure the capability of their systems, IT infrastructure, organization and employees.

The current technical descriptions and solution architecture are described and documented in the Eclipse Tractus-X GitHub project.

Furthermore, reference is made to the current Catena-X standards. These are located in the Catena-X standard library.

## Standards

### List of standards

To participate in the ESS Incident Management use-case, the following single standards must be fulfilled and can be consulted in the [Catena-X Standard Library](https://catena-x.net/de/standard-library):

- CX-0001 EDC Discovery API
- CX-0006 Registration and initial on Boarding
- CX-0013 Identity of Member Companies
- CX-0014 Employees and Technical Users
- CX-0015 IAM & Access Control Paradigm
- CX-0018 Dataspace Connectivity
- CX-0049 DID Document Schema

### ESS incidents Data model

- [CX-0113 Aspect Model: ESS Datamodel](https://catena-x.net/fileadmin/user_upload/Standard-Bibliothek/Update_Januar_2024/CX-0113-AspectModelESSDatamodel-v1.0.0.pdf)

**Note:** For a top - down approach with IRS, an ESS incident does not have to exist in the form of the ESS Incident Data Model. The following parameters are sufficient for an ESS investigation:

- Catena-X ID of the product whose supply chain is to be investigated
- BPNS (Business Partner Number Site) of the company under investigation

Nevertheless an investigation should be triggered only for an ESS incident occasion - related search.

### List of all other standards used

The following standards were used in the creation of this code of conduct and serve as an additional source of information:

- ILO Code of Practice in Safety and Health
- ILO International Labor Standards
- ISO 14001
- OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas
- OECD Guidelines for Multinational Enterprises
- Universal Declaration of Human Rights
- United Nations Convention Against Corruption
- United Nations Convention on the Rights of the Child
- United Nations Convention on the Elimination of All Forms of Discrimination Against Women
- United Nations Global Compact
- High Conservation Value Resource Network (HCV)
- High Carbon Stock Approach (HCSA)
- Initiative for Responsible Mining Assurance (IRMA)
- Responsible Business Alliance (RBA)
- Drive Sustainability Guiding Principles
- Farm Animal Welfare Committee (FAWC)
- Terrestrial Animal Health Code
- Act on Corporate Due Diligence Obligations in Supply Chains
- Handreichung zur Umsetzung einer Risikoanalyse nach den Vorgaben des Lieferkettensorgfaltspflichtengesetzes (BAFA)
