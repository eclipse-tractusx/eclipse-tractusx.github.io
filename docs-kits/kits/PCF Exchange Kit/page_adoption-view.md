---
id: Adoption View
title: Adoption View
description: 'PCF-Exchange-KIT'
sidebar_position: 2
---

![PCF Exchange kit banner](@site/static/img/kits/pcf/pcf-kit-logo.drawio.svg)

## Introduction

Sustainability has become increasingly important in the automotive industry in recent years. In particular, the topic of CO2 emissions is the focus of interest, and the product-specific CO2 footprint (PCF: product carbon footprint) has developed into a key indicator for sustainable product design and supply chains. Accordingly, there is a need to determine this data as precisely as possible across the automotive supply chain and to exchange it among partners in the network. This requires appropriate standards for calculation and exchange of data.

In this context, Catena-X offers a decentralized ecosystem supported by standards and principles like data sovereignty, which can effectively implement such a PCF data exchange. The PCF KIT will be the key enabler for various stakeholders to calculate and exchange PCF data in a standardized format. The objective of the PCF KIT is therefore to:

- Provide a comprehensive overview about the methods and tools for a PCF data exchange in the Catena-X dataspace.
- Offer various standards and guidelines for industry stakeholders.
- Provide a detailed description of the essential components required.

## Vision & Mission

### Vision

Report and steer the de-carbonization of our value chain with dedicated measures based on real PCF values, without compromising upstream data sovereignity.

### Mission

Addressing supply chain carbon emissions today is missing reliable data about baseline emissions, effect of reductions and best practices. This is due to three reasons:

- Complexity of supply chains leading to huge amount of data: complex supply chains spanning different countries and actors from many industries lead to huge amounts of data.

- Lack of trust: unwillingness to share data due to the risk of losing competitive advantage (data is shared with competitors).

- Missing standards for measuring carbon emissions in a comparable way.

At the core of our project is the recognition of a current challenge - the lack of transparency and accessibility to real PCF information in supply chains. Through our project, we strive to bridge this information gap by establishing a trusted and collaborative and interoperable environment. Suppliers will have the opportunity to share their PCF data with confidence, knowing that it remains sovereign and under their control.

We will address this by working on a trustworthy ecosystem that prioritizes data sovereignity, security and collaboration on standards. Therefore, our mission is to revolutionize the supply chain industry by providing a platform where suppliers can securely share their primary PCF data throughout the supply chain.

We are guided by the following principles:

- **Building trust** by making clear rules for data exchange and by pre-agreed data contracts between partners in the value chain.
- Building trust through **data sovereignty and data security**. We will build an ecosystem to share minimal data on a need-to-know basis, incorporating 3rd party verification by trusted partners. Decentralized architectures ensure that data remains within companies and is only shared with authorized persons as needed.
- **Governance** on the principles of mutual collaboration in the automotive industry and across with all relevant actors of the value chain on the principle of equality between partners, involving relevant outside stakeholders and the scientific community.
- **Flexibility and interoperability** by building an ecosystem of interoperable apps based on open standards. Collaborative standards for collecting, calculating and sharing emission and product data make these processes more efficient and comparable.
- **Scalability** and manageability of large amounts of data. Decentralized data ecosystems can handle and scale large amounts of data, as decentralized structures are created as required by participating companies.

## Business Process

### Premises and assumptions

We assume that the calculation and exchange of PCF data is “new territory” for many companies. In large or larger enterprises (e.g., OEM or Tier-1 suppliers) the topic of sustainability with its various facets has been on the agenda for several years now. Appropriate structures and organizations were set up there. In this respect, it can be assumed that they have the expertise and resources for a PCF calculation. Corresponding, self-developed IT tools can also be found there. We cannot expect this for small and medium-sized enterprises (SMEs). In particular small companies often lack the knowledge and resources to calculate a PCF.

These premises are therefore relevant for the following customer journeys:

- A PCF calculation requires expert or at least in-depth knowledge.
- A PCF calculation is currently mostly created manually; automation is not common or possible in most cases.
- Automation is also not yet feasible because there are no concepts or standards for verifying PCF data.
- Due to the (manual) effort, PCF calculation and data exchange will initially only be carried out for selected products.

Accordingly, the presented customer journeys are characterized by manual process steps. However, as the topic becomes more widely known in the automotive supply chain (especially among SMEs), greater automation should be sought. This is the only way to represent a larger (ideally the entire) range of products.

### Overview

The scope of our business process is the calculation and the exchange of PCF data across the supply chain for parts/components that are already in series production (→ "after start of production (SOP)").  One can therefore assume that a real supply chain already exists for this part/component.

To describe the process, we defined two customer journeys:

1. The customer journey “PCF data exchange” describes an asynchronous communication process: a customer requests the PCF from their supplier for a component (“PCF Request”), and the supplier provides the requested data (“PCF Response”).
2. If necessary, the requested PCF data must first be determined; this leads to the second customer journey “PCF calculation”.

The exchange-process is initiated top-down (e.g., at the OEM; but it can also start at any level of the supply chain), starting with a request of a customer to the supplier. It could then be continued step by step throughout the entire tier-n supply chain. Ideally, the entire supply chain (or actually: the entire supply tree) would be covered via this cascading request/response process. The result would be a PCF that is 100% based on requested and reported data.

As stated in the Development View the Standard will be extended with synchronous data exchange and AAS-Submodel 3.0. Therefore, the business logic will be enhanced to also make proactive PCF data offers in addition to asynchronous PCF requests. We recommend all solution and data providers to adapt, test and certify their solution accordingly to enable a smooth transition.
The second change to the standard will add customerPartId as an optional field in the PCF request thus enabling creation of a PCF requests with the customerPartId instead of manufacturerPartId.

[To the Industry Core KIT](https://eclipse-tractusx.github.io/docs-kits/kits/Industry%20Core%20Kit/Business%20View%20Industry%20Core%20Kit#todays-challenge)

![PCF Request and Response](resources/adoption-view/PCFRequestandResponse.png)

In the real world, this will not be implemented this way, at least in the short and medium term. It can be assumed that this process and information chain will break down at certain points in the supply chain. There, data is not requested, but calculated using secondary data, as is standard procedure these days. There can be various reasons for this:

- The affected part of the supply chain is only of minor relevance to the PCF; the effort required to determine the real data would therefore not be worthwhile.
- The supplier cannot or does not want to provide corresponding data.

However, it is important that a PCF value reported from a supplier to its customer always represents the entire supply chain behind it. Therefore, the following data is recorded in a PCF calculation and aggregated to form the resulting PCF:

- direct emissions that are generated in the supplier's own production system ("Scope 1")
- indirect emissions from purchased energy ("Scope 2")
- upstream emissions caused by purchased products from the upstream supply chain ("Scope 3")

![Scope of Catena-X Use Case](resources/adoption-view/ScopeofCatena-XUseCase.png)

The data for direct and indirect emissions will usually come from internal data sources, as these emission-shares are generated in the supplier's own production system. The upstream emissions ("Scope 3") can either be requested from the respective sub-supplier or could be calculated, e.g. by using information from eco-databases. Putting all together, the transparency on the PCF for a given part or component is created through a cascade of top-to-bottom PCF requests, and a cascade of aggregated PCF data from bottom to top.

### Customer Journey "PCF Data Exchange"

This customer journey describes the exchange of PCF data in an asynchronous request/response process.

![PCF Data Exchange Overview](resources/adoption-view/PCFDataExchangeOverview.png)

PCF data is exchanged between a data consumer (e.g., supplier on tier n) and a data provider (e.g., supplier on tier n+1). It is basically an asynchronous request/response process that is started by the data consumer:

- The data consumer realizes that he needs the PCF for a specific component and that this data is not available in his local data (or is not of sufficient quality).
- With his PCF data exchange tool, the data consumer checks whether the required PCF data is available via Catena-X (from a technical perspective, this means that there is already a digital twin for the component and that the PCF submodel is available for this twin). If so, the tool would “fetch up” this data. If not, the user can request this data from the supplier as described in the next steps.
- The data consumer submits a “PCF request” (according to the standardized API [CX-0136](https://catenax-ev.github.io/docs/next/standards/CX-0136-UseCasePCF)) to his supplier. In doing so, he asks the supplier to provide PCF data for the specific component, which was determined in accordance with the requirements of the [Catena-X PCF Rulebook](https://catenax-ev.github.io/assets/files/CX-NFR-PCF-Rulebook_v.3.0-04874a80a6d27511df06e07ae3049278.pdf).

With this request, the process temporarily ends for the data consumer. The ball is now in the data provider's playing field:

- The data provider receives the PCF request (message/display in his PCF data exchange tool).
- The data provider checks whether the requested data is already available (i.e., whether the PCF has already calculated in the past but has not yet been provided to the customer yet).
- If the data is not yet available, the data provider must create it first. At this point, he starts the “PCF Calculation” subjourney (see [below](#customer-journey-pcf-calculation)). At the end of this subjourney, the PCF data is available, and the provider can answer the original request with the next steps.
- The data provider sends a PCF response (according to the standardized API see [CX-0136](https://catenax-ev.github.io/docs/next/standards/CX-0136-UseCasePCF)) to the data consumer. At the same time, the data is made available in Catena-X (which means from a technical perspective, that a PCF submodel is attached to the corresponding digital twin of the component).

For the data provider, the process is now over, and the consumer's request has been answered with the response. On the consumer side, a few more steps follow:

- The data consumer, who sent the initial PCF request, receives the PCF response (message/display in his PCF data exchange tool).
- With the data exchange tool, the consumer can access and “pick up” the PCF data, according to the standardized PCF data model (see [Semantic Model](#semantic-models)).

>**Remark:**
>There are currently no options for data verification or acceptance/rejection of transmitted data at this stage in the process. These topics are currently still being discussed on Catena-X association level and are therefore not yet covered in the processes and tools. This might happen with later releases.

- The data consumer can now transfer this data to his internal systems/databases (e.g., a PCF calculation tool), and use it for the internal business processes (e.g., PCF calculation or reporting).
This ends this customer journey.

### Customer Journey “PCF Calculation”

This customer journey describes the calculation of a PCF in compliance with the [Catena-X PCF Rulebook](https://catenax-ev.github.io/assets/files/CX-NFR-PCF-Rulebook_v.3.0-04874a80a6d27511df06e07ae3049278.pdf) with some of the required data obtained via the Catena-X network.

![PCF Calculation](resources/adoption-view/PCFCalculation.png)

The calculation process will often be triggered by an incoming PCF request (see subjourney "[PCF data exchange](#customer-journey-pcf-data-exchange)"). But of course, a PCF calculation can also be carried out proactively without a corresponding request via PCF Request.
To determine a PCF, an appropriate calculation tool is usually used, which guides the user through the process and ensures that all relevant data is taken into account. We will limit ourselves here to a generic, tool-independent presentation of the most important steps.

1. Make a plan: What are the different components of the PCF? Where can I get the relevant data from?
→ This structuring should be supported by an appropriate process in the calculation tool.
2. Put the direct emissions from the production site (e.g., use of natural gas or fuels) into the calculation.
→ Get the raw data from internal data sources and enter them in the calculation tool.
3. Put the indirect emissions from purchased energy into the calculation.
→ Get the raw data (consumption values, energy mix, …) from internal data sources and from the energy supplier, and enter it in the calculation tool.
4. Upstream emissions:
   - For sub-components with a (expected) relevant share on the PCF, the aim is to use real data (or primary data) for the calculation. Therefore, a PCF request is sent to the suppliers of these sub-components, to obtain appropriate real data (see subjourney ["PCF data exchange"](#customer-journey-pcf-data-exchange)). As soon as the data is available (via PCF Response), it can be used as input for the calculation.
   - For other sub-components, which only make up a small proportion of the upstream emissions, there will be no request of data to the supplier. Instead, the data will be obtained from a database for secondary data.
5. If necessary, put other emissions and further data into the calculation (e.g., transport emissions, waste, recycling quotas, ...).
6. Put it all together and get the overall PCF.
7. Transfer PCF to the exchange tool (or in general: make the PCF data available).

### PCF Personas

<table>
    <thead>
        <tr>
            <th>Persona</th>
            <th>Role and Task (in larger companies)</th>
            <th>Specifics for SME</th>
            <th> Challenges</th>
            <th>Catena-X Contribution</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> Purchaser </td>
            <td> In general, the purchaser will not be a sustainability expert!
            For him, sustainability is just an additional dimension (as cost, quality, ...).
            <ul>
                <li>He requests sustainability data for purchased (sub)products from his suppliers.</li>
                <li>In the sourcing process he evaluates the incoming offers (which will include more and more sustainability data).</li>
                <li>He negotiates PCF targets with his suppliers.</li>
                <li>He checks compliance with agreements and targets and evaluates the supplier's performance.</li>
                <li>He will be often the one, who detects incidents (e.g., non-fulfillment of targets, missing certificates, ...).</li>
            </ul>
            Different responsibilities and views possible:
            <ul>
                <li> A part/component/material-oriented view </li>
                <li> A supplier/commodity-oriented view</li>
            </ul>
            </td>
            <td>
                <p>We assume, that a SME will have a weaker negotiating position and assertiveness (as a large company), so it may be more difficult to …</p>
                    <ul>
                        <li>request PCF data from (sub)suppliers.</li>
                        <li>forward customers' CO2 targets to (sub)suppliers.</li>
                        <li>negotiate own objectives/targets.</li>
                    </ul>
            </td>
            <td>
                <p>He requires sustainability data of parts/materials (e.g., PCF) for various purposes.</p>
                <p>He requires standardized data.</p>
                <p>He also requires product-unspecific sustainability data of suppliers (e.g., production site-specific certificates).</p>
                <p>He needs data in different phases (e.g., product development, procurement, industrialization, series production).</p>
            </td>
            <td>
                <p>Catena-X defines standards for sustainability data.</p>
                <p>Catena-X provides up-to-date and reliable sustainability data</p>
                    <ul>
                        <li>of parts / materials</li>
                        <li>of suppliers</li>
                    </ul>
                <p>Catena-X provides phase-specific data.</p>
                <p>Catena-X provides (standard) reports.</p>
                <p>Catena-X provides apps and services for data exchange.</p>
            </td>
        </tr>
        <tr>
            <td>PCF Calculator</td>
            <td>
                He is an expert for PCF calculation. He could be described as a “PCF Engineer,” analogous to the role of a “Cost Engineer” established in many companies.
                    <ul>
                        <li>He has in-depth knowledge of PCF-, CCF- and LCA-methods.</li>
                        <li>He is responsible for the calculation of the own scope 1 and 2 values of a PCF</li>
                        <li>From this data and with the scope 3 data reported by suppliers (or obtained from databases), he calculates the PCF of his own products.</li>
                        <li>He hands the result over to the PCF Controller</li>
                        <li>He is a consultant in "costs vs. PCF" discussions (with internal, but also with external partners)</li>
                        <li>He analyzes customer incident requests (on behalf of the PCF controller).</li>
                        <li>If there are any discrepancies in reported PCF data, he initiates incident requests at the respective supplier (via the PCF controller).</li>
                    </ul>
            </td>
            <td>
                <p>We assume, that at a SME there will be often a combined role: (Sustainability) Manager Product</p>
                    <ul>
                        <li>He is no sustainability expert! So, he must draw on external expertise if necessary</li>
                        <li>He must handle internal and external topics</li>
                    </ul>
                <p>Customer view:</p>
                <ul>
                    <li>He is a key account for sustainability data (PCF and ESS) and an “interface” in both directions: customers and suppliers.</li>
                    <li>He releases sustainability data (esp. PCF) to customers</li>
                    <li>He receives PCF data from suppliers.</li>
                    <li>He is the addressee for (PCF) incidents</li>
                </ul>
                <p>Internal View:</p>
                <ul>
                    <li>He knows the product BoM (Bill of Material)</li>
                    <li>He steers “PCF vs. cost" objectives at product levels.</li>
                    <li>He collaborates with external auditors.</li>
                    <li>He analyzes incoming incident request of customers</li>
                </ul>
            </td>
            <td>Requires standardized PCF calculation method.
                <p>Needs scope 3 values from suppliers, to calculate own PCF with this data.</p>
                <p>May need a calculation tool for scope 1 and 2 values.</p>
                <p>Requires access to eco-data (secondary data).</p>
                <p>Needs BoM data for calculation and analysis.</p>
            </td>
            <td>
                <p>Catena-X defines standards for PCF calculation.</p>
                <p>Catena-X provides up-to-date and reliable sustainability data of parts/materials.</p>
                <p>Catena-X provides apps and services for data exchange.</p>
                <p>Catena-X provides calculation tools.</p>
                <p>Catena-X provides access to eco-data(bases) for secondary data.</p>
            </td>
        </tr>
        <tr>
            <td>PCF Controller (product)</td>
            <td>
                <p>He has an operational role (as opposed to the Sustainability Manager). As a PCF expert who works with many internal and external partners.</p>
                <p>He is the first point of contact for the purchaser on PCF topics.</p>
                <p>External/customer view:</p>
                    <ul>
                        <li>He is a key account for PCF data and, in this regard, the central interface to customers/suppliers.</li>
                        <li>He releases calculated PCF data to customers.</li>
                        <li>He receives PCF data from the suppliers.</li>
                        <li>He triggers incident management.</li>
                        <li>He initiates collaborative PCF optimization.</li>
                    </ul>
            <p>Internal View:</p>
                <ul>
                    <li>He is the PCF data owner in the company.</li>
                    <li>He acts as a PCF data collector.</li>
                    <li>He receives PCF targets from the Sustainability Manager, evaluates them, and is consulted as a CO2 expert in negotiations.</li>
                    <li>He tracks PCF targets for purchased parts, and detects incidents in terms of non-fulfillment of targets.</li>
                    <li>He makes supplier performance reviews about PCF.</li>
                </ul>
            </td>
            <td>
            </td>
            <td>
                <p>He requires up-to-date and reliable PCF data of parts/materials.</p>
                <p>He needs data in different phases of the product lifecycle (e.g., in product development, sourcing, industrialization, series production).</p>
                <p>He requires standardized data.</p>
                <p>He needs a tool to exchange PCF data with internal and external partners.</p>
                <p>He needs reports for tracking and monitoring of PCF data and targets.</p>
            </td>
            <td>
                <p>Catena-X defines standards for PCF data.</p>
                <p>Catena-X provides apps and services for PCF data exchange.</p>
                <p>Catena-X provides up-to-date and reliable PCF data of parts / materials.</p>
                <p>Catena-X provides phase-specific data.</p>
            </td>
        </tr>
        <tr>
            <td>Sustainability Manager (product)</td>
            <td>
                <p>His role is more strategic than operational.</p>
                <p>He is responsible for the coordination and steering of PCF and cost objectives at product level.</p>
                <p>He ensures the consistency of product objectives with corporate objectives.</p>
                <p>He defines PCF targets for products and breaks them down on part/component/material level.</p>
                <p>He receives sustainability targets from customers.</p>
                <p>He takes care of how sustainability targets (especially PCF) can be implemented and achieved.</p>
                <p>He performs analyses in the context of sustainability.</p>
                <p>He collaborates with external auditors.</p>
            </td>
            <td>
            </td>
            <td>
                <p>He collaborates with external auditors.</p>
                <p>He requires standardized data.</p>
                <p>He needs data in different phases of the product lifecycle (e.g., in product development, sourcing, industrialization, series production).</p>
                <p>He needs reports for tracking and monitoring of sustainability data.</p>
                <p>He needs a tool to exchange sustainability data with internal and external partners.</p>
                He needs tools for:
                    <ul>
                        <li>PCF target breakdown.</li>
                        <li>PCF optimization (e.g., “what if analysis”).</li>
                        <li>Controlling of competing targets (sustainability vs. costs vs. quality …).</li>
                    </ul>
            </td>
            <td>
                <p>Catena-X defines standards for sustainability data (esp. PCF).</p>
                <p>Catena-X provides apps and services for data exchange.</p>
                <p>Catena-X provides up-to-date and reliable sustainability data of parts / materials.</p>
                <p>Catena-X provides phase-specific data.</p>
                <p>Catena-X provides (standard) reports.</p>
                <p>Catena-X provides analysis tools.</p>
            </td>
        </tr>
        <tr>
            <td>Sustainability Manager (corporate)</td>
            <td>
                <p>He has no active role in Catena-X (e.g.: getting reports is a passive, not an active role in this sense).</p>
                <p>He sets corporate goals and breaks them down for different sectors and functions in the company.</p>
                <p>He gets input from the Sustainability Manager (product).</p>
            </td>
            <td>
                <p>The role exists in principle; it is rather the question of who will take it over (e.g., personal union with management, or possibly Sustainability Manager).</p>
                <p>Thesis: an SME does CCF rather than PCF.</p>
            </td>
            <td>
                <p>He requires (aggregated) sustainability data.</p>
                <p>He requires “high level” (standard) reports.</p>
            </td>
            <td>Catena-X provides up-to-date and reliable sustainability data.</td>
        </tr>
        <tr>
            <td>Salespeople</td>
            <td>
                <p>He is the central interface to the customer.</p>
                <p>He is the owner of the customer quotation process.</p>
                <p>He negotiates PCF targets with customers (→purchaser).</p>
                <p>He presents sustainability data (esp. PCF) to customers.</p>
                <p>He is accountable for incident management with customers.</p>
            </td>
            <td>
            </td>
            <td >
                <p>He needs sustainability data (e.g., PCF) of own products (or parts/materials)</p>
                <p>He requires tools for information or data exchange (with both internal partners and external customers).</p>
            </td>
            <td>
                <p>Catena-X provides sustainability data of own products.</p>
                <p>Catena-X provides apps and services for data exchange.</p>
            </td>
        </tr>
        <tr>
            <td>Auditor (external)</td>
            <td>
                <p>He does a yearly audit of conformity with Catena-X methodology.</p>
                <p>At the beginning (before go-live) there is a one-time audit of the use of the Catena-X network and methods in the company to be audited.</p>
                <p>The onboarding of suppliers requires a self-declaration of applying Catena-X methodology.</p>
                <p>The auditor has a clearing role in case of escalated incidents.</p>
            </td>
            <td></td>
            <td>He needs additional information and data to be able to verify the reported PCF data.</td>
            <td>
                <p>Catena-X provides up-to-date and verifiable sustainability data.</p>
                <p>Catena-X provides access to metadata that allows the reported PCF data to be verified.</p>
            </td>
        </tr>
        <tr>
            <td>Sustainability Associations / Institutions</td>
            <td>They provide industry-specific averages and benchmarks of PCF values.</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

## Semantic Models

Depending on the use case and related KIT, Catena-X provides different semantic models that help to structure and make use of data via semantic information. These models help to provide a basic meaning to the data and their relationship, thereby enabling interoperability between data sets. Catena-X data models rely on principles as understandability, standardization, accuracy, differentiation, audibility, comprehensiveness, and provision of insights to drive improvement actions.

### PCF

#### Introduction PCF Data Model

In an era defined by growing environmental consciousness and sustainability imperatives, the concept of measuring and reducing carbon footprints has become paramount across industries. A pivotal key in this pursuit is an aligned and standardized PCF data model. This data model not only facilitates the systematic calculation and comparison of carbon footprints but also offers a structured approach to managing environmental impact data.

As the global community grapples with the impacts of climate change, consumers, businesses, and governments are seeking actionable ways to mitigate their carbon emissions. The need for a consistent and universally accepted method of quantifying these emissions from diverse products has given rise to the significance of a standardized PCF data model. This model acts as a lingua franca, enabling stakeholders to communicate and analyze carbon footprint information transparently and comprehensively.

For this KIT only the PCF data model is used. The PCF data model follows the [CX-0136](https://catenax-ev.github.io/docs/next/standards/CX-0136-UseCasePCF) Use Case PCF standard and is implemented in compliance with the [CX-0003](https://catenax-ev.github.io/docs/next/standards/CX-0003-SAMMSemanticAspectMetaModel) SAMM Aspect Meta Model standard.

#### Data Model Overview

The Catena-X PCF data model has been developed in accordance with the "Technical Specifications for PCF Data Exchange" from the WBCSD (World Business Council for Sustainable Development)/ PACT initiative. The basis for the specification of the Catena-X PCF data model is the [PCF Rulebook v3.0.0](https://catenax-ev.github.io/assets/files/CX-NFR-PCF-Rulebook_v.3.0-04874a80a6d27511df06e07ae3049278.pdf).

The following illustration describes the logical structure of the Catena-X PCF data model:

<details>
  <summary>PCF Data Model structure</summary>

![PCF Data Model Structure Rel. 24.08](resources/adoption-view/PCF%20Data%20Model%20Structure%20Rel.%2024.08.png)

</details>

The table below shows the details of each data field in the Catena-X PCF data model:

<details>
  <summary>PCF Data Model details</summary>

M - Mandatory, O - Optional, O* - Mandatory starting 2025

| Property                                                           | Technical Name                                        | PCF Exchange | PCF Calculation | Data Type Specification                                                                                                                                                                                                                                   | Example                                                                                                               | Technical Data Type                            | Description                                                                                                                                                                                                                                                                                        |
|--------------------------------------------------------------------|-------------------------------------------------------|-----------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **(General)**                                                      |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| ***(Version Information)***                                        |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Product Footprint Identifier                                       | id                                                    | M                           | O                              | String; must be a UUID v4                                                                                                                                                                                                                                 | 3893bb5d-da16-4dc1-9185-11d97476c254                                                                                  | PfId                                           | The PCF identifier.                                                                                                                                                                                                                                                                                |
| Product Footprint Specification Version                            | specVersion                                           | M                           | M                              | Text                                                                                                                                                                                                                                                      | urn:io.catenax.pcf:datamodel:version:7.0.0                                                                            | String                                         | Version of the PCF data specification.                                                                                                                                                                                                                                                             |
| Partial Or Full PCF                                                | partialFullPcf                                        | M                           | M                              | Enumeration; "Cradle-to-gate", <br/>"Cradle-to-grave"                                                                                                                                                                                                     | Cradle-to-gate                                                                                                        | String                                         | Indicator for partial or full PCF declaration.                                                                                                                                                                                                                                                     |
| Previous PCF Identifiers                                           | precedingPfIds                                        | O                           | O                              | Non-empty set of strings                                                                                                                                                                                                                                  | 9c5b94b1-35ad-49bb-b118-8e8fc24abf8                                                                                   | Array of PfId                                  | Set of preceding PCF identifiers without duplicates. Declared as "optional" in WBCSD, needs to be covered by application.                                                                                                                                                                          |
| Product (Carbon) Footprint Version                                 | version                                               | M                           | O                              | Integer in inclusive rage of 0..2^31-1; per default "0" in Catena-X                                                                                                                                                                                       | 0                                                                                                                     | Number                                         | Version of the PCF. In Catena-X for example set to "0" per default.                                                                                                                                                                                                                                |
| Creation of the Product (Carbon) Footprint                         | created                                               | M                           | M                              | Time stamp; must be in UTC (Coordinated Universal Time) conforming to ISO 8601                                                                                                                                                                            | 2020-03-01T00:00:00Z                                                                                                  | DateTime                                       | Timestamp of the creation of the PCF.                                                                                                                                                                                                                                                              |
| Status                                                             | status                                                | M                           | O                              | Enumeration; "Active", "Deprecated"; per default "Active" in Catena-X                                                                                                                                                                                     | Active                                                                                                                | String                                         | Status indicator of a PCF. WBCSD specific extension, in Catena-X for example set to "Active" per default.                                                                                                                                                                                          |
| Validity Period Start                                              | validityPeriodStart                                   | O                           | O                              | Time stamp; if defined, must be equal to or greater than referencePeriodEnd                                                                                                                                                                               | 2022-01-01T00:00:01Z                                                                                                  | DateTime                                       | Start of interval during which the PCF is declared as valid. If specified, the validity period start must be equal to or greater than the reference period end.                                                                                                                                    |
| Validity Period End                                                | validityPeriodEnd                                     | O                           | O                              | Time stamp                                                                                                                                                                                                                                                | 2022-12-31T23:59:59Z                                                                                                  | DateTime                                       | End of interval during which the PCF is declared as valid.                                                                                                                                                                                                                                         |
| Comment                                                            | comment                                               | O                           | O                              | Text                                                                                                                                                                                                                                                      | Additional explanatory information not reflected by other attributes                                                  | String                                         | Additional information and instructions related to the calculation of the PCF.                                                                                                                                                                                                                     |
| PCF Legal Statement                                                | pcfLegalStatement                                     | O                           | O                              | Text                                                                                                                                                                                                                                                      | This PCF (Product Carbon Footprint) is for information purposes only. It is based upon the standards mentioned above. | String                                         | Option for legal statement/ disclaimer.                                                                                                                                                                                                                                                            |
| ***(Company Information)***                                        |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Company Name                                                       | companyName                                           | M                           | O                              | String with 1 or more characters                                                                                                                                                                                                                          | My Corp                                                                                                               | NonEmptyString                                 | Name of the PCF data owner.                                                                                                                                                                                                                                                                        |
| Company Ids                                                        | companyIds                                            | M                           | O                              | Non-empty set of URN (Uniform Resource Name); array of strings (&lt;URN&gt; ::= "urn:" &lt;NID&gt; ":" &lt;NSS&gt;)                                                                                                                                       | urn:bpn:id:BPNL000000000DWF                                                                                           | CompanyIdSet                                   | Non-empty set of Uniform Resource Names (URN). Each value is supposed to uniquely identify the PCF data owner. For Catena-X Industry Core compliance the set of URNs must contain at least the Business Partner Number Legal Entity (BPNL) in the specified format urn:bpn:id:BPNL[a-zA-Z0-9]{12}. |
| ***(Product Information)***                                        |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Product Description                                                | productDescription                                    | O                           | O                              | Text                                                                                                                                                                                                                                                      | Ethanol, 95% solution                                                                                                 | String                                         | Free-form description of the product.                                                                                                                                                                                                                                                              |
| Product Ids                                                        | productIds                                            | M                           | M                              | Non-empty set of URN; array of strings (&lt;URN&gt, ::= "urn:" &lt;NID&gt; ":" &lt;NSS&gt;)                                                                                                                                                               | urn:gtin:4712345060507                                                                                                | ProductIdSet                                   | Non-empty set of product identifiers. Each value is supposed to uniquely identify the product. In Catena-X productId corresponds with Industry Core manufacturerPartId.                                                                                                                            |
| Product Category                                                   | productCategoryCpc                                    | M                           | O                              | String; UN CPC Code version 2.1; <br/>per default "011-99000" in Catena-X                                                                                                                                                                                 | 011-99000                                                                                                             | CpcCode                                        | UN (United Nations) Product Classification Code (CPC - Central Classification Code) of a given product. WBCSD specific extension, which will probably be declared as "optional" in a later WBCSD specification version. In Catena-X for example specified with default value "011-99000".          |
| Product Trade Name                                                 | productNameCompany                                    | M                           | O                              | String with 1 or more characters                                                                                                                                                                                                                          | My Product Name                                                                                                       | NonEmptyString                                 | Non-empty trade name of a product. In Catena-X productNameCompany corresponds with Industry Core nameAtManufacturer.                                                                                                                                                                               |
| **(PCF)**                                                           |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| ***(Unit Information)***                                           |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Unit of measurement                                                | declaredUnit                                          | M                           | M                              | String; enumeration as specified by WBCSD plus "piece" for Catena-X                                                                                                                                                                                       | kilogram                                                                                                              | DeclaredUnit                                   | Unit of analysis of a product in context of the PCF. In Catena-X for example list of valid units includes "piece".                                                                                                                                                                                 |
| Unitary Product Amount                                             | unitaryProductAmount                                  | M                           | M                              | Positive, non-zero decimal number                                                                                                                                                                                                                         | 1000.0                                                                                                                | StrictlyPositiveDecimal                        | Amount of units contained within a product in context of the PCF.                                                                                                                                                                                                                                  |
| Product Mass Per Declared Unit                                     | productMassPerDeclaredUnit                            | M                           | M                              | Positive, non-zero decimal number                                                                                                                                                                                                                         | 0.456                                                                                                                 | StrictlyPositiveDecimal                        | Mass of a product per declared unit (net, unpackaged) in context of the PCF.                                                                                                                                                                                                                       |
| ***(PCF Assessment & Methodology)***                               |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| ***(PCF Assessment Information)***                                 |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| *(Boundary Specifications)*                                        |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Exempted Emissions Percent                                         | exemptedEmissionsPercent                              | M                           | M                              | Decimal number between 0.0 and 5 including                                                                                                                                                                                                                | 0.0                                                                                                                   | ExemptedEmissionPercent                        | Applied cut-off percentage of emissions excluded from PCF.<br/>For accordance with Catena-X PCF Rulebook (Version 3.0.0) <3%.                                                                                                                                                                      |
| Exempted Emissions Description                                     | exemptedEmissionsDescription                          | O                           | O                              | Text; can be empty                                                                                                                                                                                                                                        | No exemption                                                                                                          | String                                         | Rationale behind exclusion of specific PCF emissions.                                                                                                                                                                                                                                              |
| Packaging Emissions Included                                       | packagingEmissionsIncluded                            | M                           | M                              | Boolean; can be "TRUE" or "FALSE"                                                                                                                                                                                                                         | TRUE                                                                                                                  | Boolean                                        | The Catena-X PCF Rulebook (Version 3.0.0) requires to include packaging from a system boundary perspective. "FALSE" is only possible due to the application of the cut-off rule. Flag indicating whether packaging emissions are included in a PCF. WBCSD specific extension.                      |
| *(Technology)*                                                     |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Boundary Processes Description                                     | boundaryProcessesDescription                          | O                           | O                              | Text                                                                                                                                                                                                                                                      | Electricity consumption included as an input in the production phase                                                  | String                                         | Processes attributable to each lifecycle stage.                                                                                                                                                                                                                                                    |
| *(Geography)*                                                      |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Geography Country Subdivision                                      | geographyCountrySubdivision                           | O                           | O                              | String; if defined must be ISO 3166-2 Subdivision Code                                                                                                                                                                                                    | US-NY                                                                                                                 | GeographyCountrySubdivision                    | Subdivision of a country which must be an ISO 3166-2 subdivision code.                                                                                                                                                                                                                             |
| Geography Country                                                  | geographyCountry                                      | O                           | O                              | String; if defined must be an ISO 3166-2 alpha-2 code                                                                                                                                                                                                     | FR                                                                                                                    | GeographyCountry                               | Two letter country code that must conform to data type ISO 3166CC.                                                                                                                                                                                                                                 |
| Region                                                             | geographyRegionOrSubregion                            | M                           | O                              | String with 1 or more characters; enumeration as specified by WBCSD plus "Global" and "Several" for <br/>Catena-X                                                                                                                                         | Africa                                                                                                                | String                                         | Region according to list specified in Catena-X PCF Rulebook (Version 3.0.0).                                                                                                                                                                                                                       |
| *(Time)*                                                           |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Reference Period Start                                             | referencePeriodStart                                  | M                           | M                              | Time stamp; must be in UTC conforming to ISO 8601                                                                                                                                                                                                         | 2022-01-01T00:00:01Z                                                                                                  | DateTime                                       | Start of time boundary for which a PCF value is considered to be representative.                                                                                                                                                                                                                   |
| Reference Period End                                               | referencePeriodEnd                                    | M                           | M                              | Time stamp; must be in UTC conforming to ISO 8601                                                                                                                                                                                                         | 2022-12-31T23:59:59Z                                                                                                  | DateTime                                       | End of time boundary for which a PCF value is considered to be representative.                                                                                                                                                                                                                     |
| ***(PCF Methodology)***                                            |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| *(Standards)*                                                      |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Cross Sectoral Standard                                            | crossSectoralStandardsUsed:<br/>crossSectoralStandard | M                           | M                              | Object crossSectoralStandardsUsed: set of Cross Sectoral Standard entries.<br/>For each crossSectoralStandard: Enumeration "ISO 14067", "Pathfinder v1", "Pathfinder v2", "GHG Protocol Product Standard", "PAS 2050", "ISO 14040-44", "PEF", "Other"     | GHG Protocol Product Standard                                                                                         | CrossSectoralStandardsUsedEnumeration          | Discloses a cross-sectoral standard applied for calculating or allocating GHG (Greenhouse Gas) emissions.                                                                                                                                                                                          |
| Operator or Publisher of Sector Specific Rules                     | productOrSectorSpecificRules:<br/>operator            | M                           | M                              | Object productOrSectorSpecificRules; set of Product or Sector Specific Rule entries (each including Operator, Rule Names and Other Operator Name)<br/>For each operator: enumeration "PEF", "EPD International", "Other"; per default "Other" in Catena-X | Other                                                                                                                 | ProductOrSectorSpecificRuleOperator            | Operator of PCR (Product Category Rule)/ PSR (Product Specific Rule). WBCSD specific extension, in Catena-X for example must always be "Other".                                                                                                                                                    |
| Product or Sector Specific Rule Names                              | productOrSectorSpecificRules:<br/>ruleNames           | M                           | M                              | Object productOrSectorSpecificRules; set of Product or Sector Specific Rule entries (each including Operator, Rule Names and Other Operator Name)<br/>For all rulenames: set of RuleName entries                                                          | urn:tfs-initiative.com:PCR:The Product Carbon Footprint Guideline for the Chemical Industry:version:v2.0              | NonEmptyString Vector                          | Non-empty set of rules applied by the specified operator.                                                                                                                                                                                                                                          |
| Other Operator Name                                                | productOrSectorSpecificRules:<br/>otherOperatorName   | O                           | O                              | Object productOrSectorSpecificRules; set of Product or Sector Specific Rule entries (each including Operator, Rule Names and Other Operator Name)<br/>For each otherOperatorName: Non-empty string                                                        | NSF                                                                                                                   | NonEmptyString                                 | Other operator of PCR (Product Category Rule)/ PSR (Product Specific Rule). WBCSD specific extension, in Catena-X for example specified by a default value.                                                                                                                                        |
| *(GWP Characterization Factor Details)*                            |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Characterization Factors                                           | characterizationFactors                               | M                           | M                              | Enumeration "AR6", "AR5"; per default "AR6" in Catena-X                                                                                                                                                                                                   | AR6                                                                                                                   | CharacterizationFactors                        | IPCC (Intergovernmental Panel on Climate Change) version of the GWP (Global Warming Potential) characterization factors used for calculating the PCF. WBCSD specific extension, in Catena-X for example specified by default with value "AR6". Default value can be overwritten.                   |
| *(Data Sources and Quality)*                                       |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| *(Allocation in Foreground (Own Processes))*                       |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Allocation Rules Description                                       | allocationRulesDescription                            | O                           | O                              | Text; per default "In accordance with Catena-X PCF Rulebook" in Catena-X                                                                                                                                                                                  | In accordance with Catena-X PCF Rulebook                                                                              | String                                         | Allocation rules used and underlying reasoning in context of a PCF. WBCSD specific extension, in Catena-X for example specified by default with value "In accordance with Catena-X PCF Rulebook".                                                                                                  |
| Allocation Waste Incineration                                      | allocationWasteIncineration                           | M                           | M                              | Enumeration "cut-off", "reverse cut-off", "system expansion"; per default "cut-off" in Catena-X                                                                                                                                                           | cut-off                                                                                                               | AllocationWasteIncineration                    | Allocation approach used for waste incineration with energy recovery as specified by the TFS (Together For Sustainability) initiative. In Catena-X for example must be specified by value "cut-off".                                                                                               |
| *(Data Sources)*                                                   |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Primary Data Share                                                 | primaryDataShare                                      | O*                          | O*                             | Decimal number in range of and including 0..100                                                                                                                                                                                                           | 7.183924                                                                                                              | Percent                                        | Share of primary data in percent.                                                                                                                                                                                                                                                                  |
| Emission Factor Data Source                                        | secondaryEmissionFactorSources:<br/>emissionFactorDS  | M                           | M                              | Object; set of EmissionFactorDataSources                                                                                                                                                                                                                  | ecoinvent 3.8                                                                                                         | Set of strings, each with 1 or more characters | Emission factor data sources used to calculate a PCF.                                                                                                                                                                                                                                              |
| *(Data Quality)*                                                   |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Coverage Percent                                                   | dqi:coveragePercent                                   | O*                          | O*                             | Decimal number in range of and including 0..100; per default "100" in Catena-X                                                                                                                                                                            | 100                                                                                                                   | Percent                                        | Percentage of PCF included in the data quality assessment based on the >5% emissions threshold. In Catena-X for example set to "100" per default.                                                                                                                                                  |
| Technological DQR (Data Quality Rating)                            | dqi:technologicalDQR                                  | O                           | O                              | Decimal number in range of and including 1..3                                                                                                                                                                                                             | 2.0                                                                                                                   | DqiNumber                                      | Technological representativeness of the sources used for PCF calculation based on weighted average of all inputs representing >5% of PCF emissions.                                                                                                                                                |
| Temporal DQR (Data Quality Rating)                                 | dqi:temporalDQR                                       | O                           | O                              | Decimal number in range of and including 1..3                                                                                                                                                                                                             | 2.0                                                                                                                   | DqiNumber                                      | Temporal representativeness of the sources used for PCF calculation based on weighted average of all inputs representing >5% of PCF emissions.                                                                                                                                                     |
| Geographical DQR (Data Quality Rating)                             | dqi:geographicalDQR                                   | O                           | O                              | Decimal number in range of and including 1..3                                                                                                                                                                                                             | 2.0                                                                                                                   | DqiNumber                                      | Geographical representativeness of the sources used for PCF calculation based on weighted average of all inputs representing >5% of PCF emissions.                                                                                                                                                 |
| Completeness DQR (Data Quality Rating)                             | dqi:completenessDQR                                   | O                           | O                              | Decimal number in range of and including 1..3                                                                                                                                                                                                             | 2.0                                                                                                                   | DqiNumber                                      | Completeness of the data collected for PCF calculation based on weighted average of all inputs representing >5% of PCF emissions.                                                                                                                                                                  |
| Reliability DQR (Data Quality Rating)                              | dqi:reliabilityDQR                                    | O                           | O                              | Decimal number in range of and including 1..3                                                                                                                                                                                                             | 2.0                                                                                                                   | DqiNumber                                      | Reliability of the data collected for PCF calculation based on weighted average of all inputs representing >5% of PCF emissions.                                                                                                                                                                   |
| ***(Life Cycle Inventory Results)***                               |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| ***(Production Stage)***                                           |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| PCF Excluding Biogenic                                             | pcfExcludingBiogenic                                  | M                           | M                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 2.0                                                                                                                   | PositiveDecimal                                | PCF of a product excluding biogenic emissions.                                                                                                                                                                                                                                                     |
| PCF Including Biogenic                                             | pcfIncludingBiogenic                                  | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit                                                                                                                                                                                       | 1.0                                                                                                                   | Decimal                                        | PCF of a product including biogenic emissions. Optional value in current specification version but will be mandatory in future version.                                                                                                                                                            |
| Fossil Emissions                                                   | fossilGhgEmissions                                    | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.5                                                                                                                   | PositiveDecimal                                | Emissions from combustion of fossil sources. Identical to "pcfExcludingBiogenic", will be removed in later version.                                                                                                                                                                                |
| Biogenic Carbon Emissions Other Than CO2                           | biogenicCarbonEmissionsOtherThanCO2                   | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 1.0                                                                                                                   | PositiveDecimal                                | GWP (Global Warming Potential) of biogenic CO2e-emissions in production phase which contain only GHG (Greenhouse Gas) emissions other than CO2 - excludes biogenic CO2.                                                                                                                            |
| Biogenic Carbon Withdrawal                                         | biogenicCarbonWithdrawal                              | O*                          | O*                             | Must be calculated per declared unit in kgCO2e / declaredUnit equal to or less than zero                                                                                                                                                                  | 0.0                                                                                                                   | NegativeDecimal                                | Biogenic carbon content in the product converted to CO2e.                                                                                                                                                                                                                                          |
| Direct land use change Greenhouse Gas Emissions                    | dlucGhgEmissions                                      | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.4                                                                                                                   | PositiveDecimal                                | Direct land use change CO2e emissions in context of a PCF.                                                                                                                                                                                                                                         |
| Land use Greenhouse Gas Emissions                                  | luGhgEmissions                                        | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit                                                                                                                                                                                       | 0.3                                                                                                                   | Decimal                                        | Land use CO2 emissions in context of a PCF as specified by the TFS (Together For Sustainability) initiative. TFS specific extension.                                                                                                                                                               |
| Aircraft Greenhouse Gas Emissions                                  | aircraftGhgEmissions                                  | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.0                                                                                                                   | PositiveDecimal                                | GHG (Greenhouse Gas) emissions resulting from aircraft engine usage for the transport of the product.                                                                                                                                                                                              |
| Packaging Greenhouse Gas  Emissions                                | packagingGhgEmissions                                 | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.0                                                                                                                   | PositiveDecimal                                | Emissions resulting from the packaging of the product. WBCSD specific extension. In Catena-X not relevant to be reported separately.                                                                                                                                                               |
| ***(Distribution Stage)***                                         |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Distribution Stage PCF Excluding Biogenic                          | distributionStagePcfExcludingBiogenic                 | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 1.5                                                                                                                   | PositiveDecimal                                | PCF for the distribution stage of a product excluding biogenic emissions.                                                                                                                                                                                                                          |
| Distribution Stage PCF Including Biogenic                          | distributionStagePcfIncludingBiogenic                 | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit                                                                                                                                                                                       | 0.0                                                                                                                   | Decimal                                        | PCF for the distribution stage of a product including biogenic emissions.                                                                                                                                                                                                                          |
| Distribution Stage Fossil Greenhouse Gas Emissions                 | distributionStageFossilGhgEmissions                   | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.5                                                                                                                   | PositiveDecimal                                | Emissions from the combustion of fossil sources in the distribution stage.                                                                                                                                                                                                                         |
| Distribution Stage Biogenic Carbon Emissions Other Than CO2        | distributionStageBiogenicCarbonEmissionsOtherThanCO2  | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 1.0                                                                                                                   | PositiveDecimal                                | GWP (Global Warming Potential) of biogenic CO2e-emissions in distribution phase which contain only GHG (Greenhouse Gas) emissions other than CO2. Excludes biogenic CO2.                                                                                                                           |
| Distribution Stage Biogenic Carbon Withdrawal                      | distributionStageBiogenicCarbonWithdrawal             | O                           | O                              | Must be calculated per declared unit in kgCO2e / declaredUnit equal to or less than zero                                                                                                                                                                  | 0.0                                                                                                                   | NegativeDecimal                                | GWP (Global Warming Potential) of biogenic CO2-withdrawal in distribution stage (biogenic CO2 contained in the product).                                                                                                                                                                           |
| Distribution Stage direct land use change Greenhouse Gas Emissions | distributionStageDlucGhgEmissions                     | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 1.0                                                                                                                   | PositiveDecimal                                | Direct land use change CO2e emissions for the distribution stage in context of a PCF.                                                                                                                                                                                                              |
| Distribution Stage land use  Greenhouse Gas Emissions              | distributionStageLuGhgEmissions                       | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit                                                                                                                                                                                       | 1.1                                                                                                                   | Decimal                                        | Land use CO2 emissions for the distribution stage in context of a PCF as specified by the TFS (Together For Sustainability) initiative. TFS specific extension.                                                                                                                                    |
| Distribution Stage Aircraft Greenhouse Gas Emissions               | distributionStageAircraftGhgEmissions                 | O                           | O                              | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 0.0                                                                                                                   | PositiveDecimal                                | GHG (Greenhouse Gas) emissions for the distribution stage resulting from aircraft engine usage for the transport of the product.                                                                                                                                                                   |
| ***(Carbon Content)***                                             |                                                       |                             |                                |                                                                                                                                                                                                                                                           |                                                                                                                       |                                                |                                                                                                                                                                                                                                                                                                    |
| Carbon Content Total                                               | carbonContentTotal                                    | O*                          | O*                             | Must be calculated per declared unit with<br/>kgCO2e / declaredUnit equal to or greater zero                                                                                                                                                              | 2.5                                                                                                                   | PositiveDecimal                                | Total carbon content per declared unit in context of a PCF.                                                                                                                                                                                                                                        |
| Fossil Carbon Content                                              | fossilCarbonContent                                   | O*                          | O*                             | Must be calculated per declared unit with<br/>kgC / declaredUnit equal to or greater zero; per default calculated in Catena-X (Total - Biogenic)                                                                                                          | 0.1                                                                                                                   | PositiveDecimal                                | Fossil carbon amount embodied in a product. Must be calculated with kgC (kilogram Carbon) / declaredUnit equal to or greater zero; WBCSD specific extension, in Catena-X specified by a calculated value.                                                                                          |
| Biogenic Carbon Content                                            | biogenicCarbonContent                                 | O*                          | O*                             | Must be calculated per declared unit with<br/>kgC / declaredUnit equal to or greater zero                                                                                                                                                                 | 0.0                                                                                                                   | PositiveDecimal                                | Biogenic carbon amount embodied in a product. Must be calculated with kgC (kilogram Carbon) / declaredUnit equal to or greater zero.                                                                                                                                                               |

</details>

#### Example Payload

The following json shows an exemplary payload for a requested PCF value.

<details>
  <summary>Payload</summary>

```json
{
  "specVersion" : "urn:io.catenax.pcf:datamodel:version:7.0.0",
  "companyIds" : [ "urn:bpn:id:BPNL000000000DWF", "urn:vat:id:DE123456789"],
  "extWBCSD_productCodeCpc" : "011-99000",
  "created" : "2022-05-22T21:47:32Z",
  "companyName" : "My Corp",
  "extWBCSD_pfStatus" : "Active",
  "version" : 0,
  "productName" : "My Product Name",
  "pcf" : {
    "biogenicCarbonEmissionsOtherThanCO2" : 1.0,
    "distributionStagePcfExcludingBiogenic" : 1.5,
    "biogenicCarbonWithdrawal" : 0.0,
    "distributionStageBiogenicCarbonEmissionsOtherThanCO2" : 1.0,
    "extWBCSD_allocationRulesDescription" : "In accordance with Catena-X PCF Rulebook",
    "exemptedEmissionsDescription" : "No exemption",
    "distributionStageFossilGhgEmissions" : 0.5,
    "exemptedEmissionsPercent" : 0.0,
    "geographyCountrySubdivision" : "US-NY",
    "extTFS_luGhgEmissions" : 0.3,
    "distributionStageBiogenicCarbonWithdrawal" : 0.0,
    "pcfIncludingBiogenic" : 1.0,
    "aircraftGhgEmissions" : 0.0,
    "productMassPerDeclaredUnit" : 0.456,
    "productOrSectorSpecificRules" : [ {
      "extWBCSD_operator" : "PEF",
      "productOrSectorSpecificRules" : [ {
        "ruleName" : "urn:tfs-initiative.com:PCR:The Product Carbon Footprint Guideline for the Chemical Industry:version:v2.0"
      } ],
      "extWBCSD_otherOperatorName" : "NSF"
    } ],
    "extTFS_allocationWasteIncineration" : "cut-off",
    "pcfExcludingBiogenic" : 2.0,
    "referencePeriodEnd" : "2022-12-31T23:59:59Z",
    "extWBCSD_characterizationFactors" : "AR5",
    "secondaryEmissionFactorSources" : [ {
      "secondaryEmissionFactorSource" : "ecoinvent 3.8"
    } ],
    "unitaryProductAmount" : 1000.0,
    "declaredUnit" : "liter",
    "referencePeriodStart" : "2022-01-01T00:00:01Z",
    "geographyRegionOrSubregion" : "Africa",
    "fossilGhgEmissions" : 0.5,
    "distributionStageAircraftGhgEmissions" : 0.0,
    "boundaryProcessesDescription" : "Electricity consumption included as an input in the production phase",
    "geographyCountry" : "DE",
    "extWBCSD_packagingGhgEmissions" : 0,
    "dlucGhgEmissions" : 0.4,
    "carbonContentTotal" : 2.5,
    "extTFS_distributionStageLuGhgEmissions" : 1.1,
    "primaryDataShare" : 56.12,
    "dataQualityRating" : {
      "completenessDQR" : 2.0,
      "technologicalDQR" : 2.0,
      "geographicalDQR" : 2.0,
      "temporalDQR" : 2.0,
      "reliabilityDQR" : 2.0,
      "coveragePercent" : 100
    },
    "extWBCSD_packagingEmissionsIncluded" : true,
    "extWBCSD_fossilCarbonContent" : 0.1,
    "crossSectoralStandardsUsed" : [ {
      "crossSectoralStandard" : "ISO Standard 14067"
    } ],
    "extTFS_distributionStageDlucGhgEmissions" : 1.0,
    "distributionStagePcfIncludingBiogenic" : 0.0,
    "carbonContentBiogenic" : 0.0
  },
  "partialFullPcf" : "Cradle-to-gate",
  "productIds" : [ "urn:gtin:4712345060507", "urn:id:9587654", "urn:uuid4:id:9885a472-2cbf-4f89-9650-e83a44e7bdf1" ],
  "validityPeriodStart" : "2022-01-01T00:00:01Z",
  "comment" : "Additional explanatory information not reflected by other attributes",
  "id" : "3893bb5d-da16-4dc1-9185-11d97476c254",
  "validityPeriodEnd" : "2022-12-31T23:59:59Z",
  "pcfLegalStatement" : "This PCF (Product Carbon Footprint) is for information purposes only. It is based upon the standards mentioned above.",
  "productDescription" : "Ethanol, 95% solution",
  "precedingPfIds" : [ {
    "id" : "3893bb5d-da16-4dc1-9185-11d97476c254"
  } ]
}
```

</details>

The entire PCF data model is available as open source through the following link:
[Catena-X PCF Datamodel](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.pcf/7.0.0)

## Business Architecture

The PCF Exchange KIT can be used to exchange PCF data within the Catena-X ecosystem in a decentralized and interoperable manner, while maintaining a high level of data sovereignty. To achieve this, the PCF Exchange KIT leverages other KITs (particularly the platform-related ones), standardized data models, and an Identity and Access Management (IAM) system based on OAuth and Self-Sovereign Identity (SSI) technology.

In order to ensure **interoperability**, as described in the section on [Semantic Models](#semantic-models), a standardized data model is essential. However, it's not only the data model but also the standardized interfaces (both the PCF Exchange API and the standardized API provided by the Connector Kit) that contribute to interoperability.

To enable **data sovereignty**, Catena-X relies on **Self-Sovereign-Identity** (SSI). This allows data providers to precisely specify the conditions that must be met before requested data is transmitted. In the context of the PCF KIT, the "PCF Credential" and "Membership Credential" are mandatory. The PCF Credential references the [PCF Framework Agreement](https://catena-x.net/fileadmin/user_upload/04_Einfuehren_und_umsetzen/Governance_Framework/231016_Catena-X_Use_Case_Framework_PCF.pdf) signed by a data consumer. The Membership Credential additionally ensures that the requester is an active member of Catena-X.

The diagram shown here illustrates the interaction between the PCF KIT and the other Catena-X components.
![Business Architecture](resources/adoption-view/BusinessArchitecture.png)

## STANDARDS

The relevant standards can be downloaded from the official [Catena-X Standard Library](https://catenax-ev.github.io/docs/next/standards/overview):

- [CX-0136 Product Carbon Footprint UseCase (Version 2.0.0)](https://catenax-ev.github.io/docs/next/standards/CX-0136-UseCasePCF)

### Non-rechnical requirement

- [Product Carbon Footprint Rulebook (Version 3.0.0)](https://catenax-ev.github.io/assets/files/CX-NFR-PCF-Rulebook_v.3.0-04874a80a6d27511df06e07ae3049278.pdf)

## REFERENCE IMPLEMENTATIONS

Currently there is no reference FOSS (Free and Open-Source Software) implementation. Several COTS (Commercial Of-The-Shelf) solutions are available, e.g. offered by the following providers:

- [SiGREEN (Siemens)](https://www.siemens.com/de/de/unternehmen/themenfelder/product-carbon-footprint.html)
- [SDX (SAP)](https://www.sap.com/sustainability/climate-action.html)
- [SPF (SupplyOn)](https://www.supplyon.com/en/solutions/sustainability/product-carbon-footprint/#contactform)
- [SDE (T-Systems)](https://dih.telekom.com/de/catena-x)

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 T-Systems International GmbH
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 SIEMENS AG
- SPDX-FileCopyrightText: 2023,2024 SUPPLY ON AG
- SPDX-FileCopyrightText: 2023,2024 Volkswagen AG
- SPDX-FileCopyrightText: 2023,2024 Robert Bosch GmbH
- SPDX-FileCopyrightText: 2023,2024 Mercedes Benz Group
- SPDX-FileCopyrightText: 2023,2024 BASF SE
- SPDX-FileCopyrightText: 2023,2024 CCT
- SPDX-FileCopyrightText: 2023,2024 Gris Group
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation
- [Source URL](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits/kits/PCF%20Exchange%20Kit)
