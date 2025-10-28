---
title: Adoption View
---

![Cbam kit banner](@site/static/img/kits/circularity/cbam-kit-logo.svg)

### Vision & Mission

#### Introduction
The steady advance of climate change is a global problem that requires global solutions. In view of the fact that the EU has set itself very high climate targets, which are constantly being increased, and that many non-EU countries have less stringent climate policies, there is a risk of carbon leakage. This occurs when companies based in the EU relocate their carbon-intensive production to countries with less stringent climate protection measures than in the EU, or when EU products are replaced by more carbon-intensive imports.

To counteract this development, the EU has launched the Carbon Border Adjustment Mechanism (short: CBAM). This is the EU's instrument for setting fair prices for carbon emissions from the production of carbon-intensive goods imported into the EU. It is also intended to promote cleaner industrial production in non-EU countries. 

By confirming that a price has been paid for the carbon emissions generated in the production of certain goods imported into the EU, the CBAM ensures that the carbon price for imports corresponds to the carbon price for domestic production and that the EU's climate targets are not undermined.

The CBAM will initially apply to imports of certain goods and selected inputs whose production is carbon intensive and where the risk of carbon leakage is highest: **cement, iron and steel, aluminum, fertilizers, electricity and hydrogen**. With this expanded scope, the CBAM will eventually - when fully implemented - cover more than 50% of emissions in the sectors covered by the Emission Trading System (ETS). An expansion of the sectors is planned for the future. 


The Carbon Border Adjustment Mechanism will apply in its definitive regime from 2026, but the transitional phase, which will last between October 2023 and the end of December 2025, is already underway.


#### Vision
A transparent, interoperable, and sustainable industrial data ecosystem that empowers companies worldwide to accurately capture, share, and manage carbon emissions data for EU reporting.

#### Mission
Catena-X provides a reliable, standardized data infrastructure that enables industrial stakeholders to seamlessly exchange carbon emission data across global value chains. In the context of the EU Carbon Border Adjustment Mechanism (CBAM), this Catena-X CBAM KIT empowers companies to:

-	Collect and validate emissions data at the material and component level using harmonized methodologies.
-	Automate CBAM reporting workflows, reducing administrative burden and ensuring compliance with EU regulations.
-	Integrate upstream and downstream data from suppliers and partners, enabling accurate transmission of the data required for the calculation of embedded emissions for imported goods.
-	Ensure data sovereignty and security, allowing companies to retain control over sensitive sustainability information while meeting transparency requirements.
-	Facilitate recognition of foreign carbon pricing schemes, promoting fair treatment of non-EU producers.
-	Support strategic decision-making by providing actionable insights into emissions hotspots, cost implications, and optimization opportunities within the supply chain.

https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en


### Business Process 
#### Initiation of the CBAM Process
The CBAM (Carbon Border Adjustment Mechanism) process begins when a product is imported into the EU under a customs code that is subject to CBAM reporting and originates from specified countries.  Importers below defined de minimis mass of annual imports are not required to follow the CBAM rules. The importer initiates the process via Catena-X.  (see figure 1)

![CbamCatena](res/magesCBAM-Seite-1.drawio.svg)

Figure 1: The CBAM Data Exchange mechanism with Catena-X

Catena is used for identifying the importer and the supplier’s contact and installation site.
-	Identification of the importer
-	Product Identifier
-	Supplier master data 
-	Installation site 
-	Contact information of the installation’s operator

#### Quarterly Forecasting and Certificate Purchase
Throughout the year, the importer is required to g enerate quarterly forecasts of expected import volumes. Based on these forecasts, the importer must purchase a corresponding number of CO₂ certificates in advance specified in the regulation.  These certificates are initially based on default emission values or on the emissions known of previous requests, as actual data will only be available in the year following the import. These steps will be outside of the data model; in case of actual data, the data may result from Catena data.
#### Ongoing Data Collection During the Year of import
For each import, the importer collects shipment-specific data (composite data), including:
-	Delivery details (Product Number, CN Code, netto mass, date) 
-	Country of origin 
-	Associated installation

#### Year-End Emissions Data Collection
At the end of the reporting year, the importer requests actual CO₂ emission data from all suppliers. These values must be:
-	Verified by an EU-accredited verifier
-	Based on the actual production process and installation
-	Expressed standardized data elements

The supplier, in turn, may need to obtain this data from the operator (the actual producer), especially if they are not directly involved in manufacturing.

The last three sections 
-	Initiation of the CBAM Process
-	Ongoing Data Collection During the Year of import
-	Year-End Emissions Data Collection

Are describing the different operation/communication modes for the CBAM interface. This also results into different APIs as well as variants in the data model.

#### Submission of the Annual CBAM Report
Using the verified emission data, the importer submits in the year following the import an annual CBAM report to the EU. This report states the actual emissions imported during the import year as well as any local CO2 taxes paid by the operators and allow a calculation of the certificates due:
-	If the importer has purchased too few certificates, additional ones must be acquired.
-	If too many certificates were purchased, the excess may not always be refunded

The preparation and submission of this report are not part of the KIT’s data model.

#### Transition to Actual Emission Values
From the following year onward, the importer uses the actual emission values for the same installation / CN code combinations (instead of default values) for calculating CO₂ levies on future imports. This transition improves accuracy and reflects the true environmental impact of the imported goods.
However, collecting actual data is only worthwhile for suppliers with significant shipment volumes. For small or one-off deliveries, the administrative effort may outweigh the benefits. In these cases it may be more efficient to rely on the default data  published by the EU-Commission.
The preparation and submission of this report are not part of the KIT’s data model.

#### Challenges and Regulatory Requirements
The EU requires detailed information, including:
-	Production date and installation
-	Energy sources used
-	Verified CO₂ emissions
These must be reliably collected and submitted via the EU portal, which currently supports Excel uploads or manual entry.
### Architecture
Figure 2 gives an overview about the Archtechture of the CBAM service.

Figure 2: Architecture of CX-CBAM Service

### CBAM Personas
Here is a tabular overview of the key roles in the CBAM (Carbon Border Adjustment Mechanism) process, along with a brief description of each:

| Role | Description |
| --- | --- |
| Importer | Initiates the CBAM colletion process. Responsible for collecting data, purchasing CO₂ certificates, and submitting reports to the EU.|
|Supplier/vendor| Direct business partner of the importer. Provides initial product and site information, and forwards requests to the actual operator if necessary.| 
| Sub-Supplier | Actual operator of the goods. Responsible for providing verified CO₂ emission data, certified by an EU-accredited verifier.|
| Intermediary | Trader or broker between supplier and sub-supplier. Not relevant for emissions data but must ensure data is passed along the supply chain correctly. |
| EU |The European Commission, specifically the Directorate-General for Taxation and Customs Union (DG TAXUD), is responsible for the design, development, and maintenance of the CBAM Portal and its associated systems. <br> The portal is part of the CBAM Transitional Registry, which is the central platform for: <br> -	Submitting quarterly emissions reports. <br> -	Managing declarant authorizations. <br>-	Facilitating communication between importers, national authorities and the Commission. |
| Submitter | An authorised CBAM declarant may delegate the submission of CBAM declarations to a person acting on behalf and in the name of that authorised CBAM declarant. (§7a). This is not in scope of the KIT V1 as the submitter can use the ID of the Importer to access Catena.|


### Semantic Models
Depending on the use case and related KIT, Catena-X provides different semantic models that help to structure and make use of data via semantic information. These models help to provide a basic meaning to the data and their relationship, thereby enabling interoperability between data sets. Catena-X data models rely on principles as understandability, standardization, accuracy, differentiation, audibility, comprehensiveness, and provision of insights to drive improvement actions.


