---
id: qna
title: Questions and Answers
description: Questions and Answers
---

![DCM kit banner](@site/static/img/kits/demand-and-capacity-management/demand-and-capacity-management-kit-logo.svg)

## General

|#|Question|Answer|
|--|--|--|
|1|What is DCM?| DCM stands for Demand and Capacity Management. The Catena-X DCM standard describes a process for exchanging demand and capacity information as well as definition on how to exchange demand and capacity data electronically between companies.|
|2|Where can I read about DCM?|[This library][StandardLibrary] contains the released standards. The DCM standard has the ID CX-0128.|
|3|Are there translations of the DCM standard?|There are no official translations. Only the original standard, written in English, is normative.|
|4|Is there a standard “easy to read” DCM presentation available?|No, however the standard contains an abstract, which provides a management overview. The KIT itself is receiving regular updates.|
|5|What is the benefit of using DCM within the Catena-X dataspace instead of using my individual own process?| Adopting DCM, as defined by Catena-X, has the unique benefit of eliminating the need for defining process and technical interfaces individually with every one of your business partners. This allows you to execute demand and capacity management with every single one of your business partners in an identical manner, greatly reducing overhead.|
|6|Is there any step-by-step onboarding instruction?|Please have a look at [Catena-X: How to join us](https://catena-x.net/en/participate)|
|7|What are the needed steps for onboarding regarding the DCM standard?| Before beginning data exchange, the following conditions must be met: <br/> - Customer and supplier must register with a Catena-X operational company and conform to the Catena-X guidelines <br/> - Customer and supplier must have entered into a contract with each other <br/> - Customer and supplier must sign framework agreements required by Catena-X <br/> - Customer and supplier must have the technical capability to engage in the DCM process with their business applications. You can either enable and certify your IT-system to be Catena-X compliant, or use a certified DCM application. <br/> <br/> You can receive onboarding support by Consultancy Services or Business Application Provider. The operating company has dedicated marketplaces for [certified services](https://www.cofinity-x.com/service-marketplace/) and [certified business applications](https://www.cofinity-x.com/app-marketplace/).|
|8|Do I need to be the part of Catena-X if I only want to use DCM?|Yes, joining the Catena-X dataspace (not the Catena-X Association) via an operating company is a prerequisite for participating in any Catena-X usecase.|
|9|Is Cofinity-X required for DCM? Or are there other possibilities?| Currently, Cofinity-X is the only operating company of the Catena-X dataspace and therefore registration at Cofinity-X is a prerequisite for data exchange.|
|10|Where can I get Catena-X related consultancy services|You can find Catena-X related consultancy services within the Cofinity-X [service marketplace](https://www.cofinity-x.com/service-marketplace/).|
|11|Who can support me with my onboarding?|The operating company provides [service](https://www.cofinity-x.com/service-marketplace/) and [application](https://www.cofinity-x.com/app-marketplace/) marketplaces where support is offered in form of certified services and certified business applications respectively.|
|12|How much does it cost to use DCM?|In order to evaluate the actual cost of participating in the DCM use case you have to compare cost vs gain.<br/><br/> Consider the following gains:<br/>- Increased capacity utilization rate<br/>- Reduced round trip times for information exchange<br/>- Emerging network effects <br/>- Common technical and business semantics<br/>- Increased resiliency in the supply network<br/><br/> Consider the following costs:<br/>- Onboarding with an operating company <br/>- Reoccurring fees<br/>- Adopting the DCM processes<br/>- Adopting a DCM compatible application<br/>- Adopting Catena-X dataspace compatible core infrastructure<br/><br/>The [Catena-X FAQ](https://catena-x.net/en/faq) has some insights into this as well.|

<br/><br/><br/><br/>

## Accessibility

|#|Question|Answer|
|--|--|--|
|1|What do I need to exchange data within DCM?|You need a Catena-X certified DCM solution, interfacing with an Eclipse Dataspace Connector (EDC) and a registration with an operating company, such as Cofinity-X.|
|2|Is EDC the same as EDI (Electronic Data Interchange)? Will I send the same messages via the same EDI portal?|EDC and EDI are completely different and not interoperable. You will have to exchange data via a Catena-X certified solution.|
|3|Do I need to connect my internal systems to the Catena-X dataspace?|It is not required to connect your internal systems to the Catena-X dataspace. The EDC acts as a gateway for all your communication to and from the dataspace.|
|4|How is my data protected when I utilize DCM via the Catena-X dataspace?|From a business perspective:<br/>Shared data is protected, because companies and business applications participating in the dataspace have to be certified. As part of the on-boarding process companies do sign framework agreements providing a basis for legal protection.<br/><br/>From a technical perspective: The EDC enforces this legal basis, via policy enforcement and contract negotiation, ultimately leading to data sovereignty.|
|5|I participate in another Catena-X use case, will it simplify my access to the DCM use case and maybe even reduce my onboarding costs?|Yes, it will. Nearly all Catena-X use cases share a common infrastructure. Having an EDC in place and being already registered with an operating company,having assigned BPNL and BPNS, as well as a working wallet will reduce the on-boarding time and cost for DCM|
|6|How often are Catena-X standards and in particular the DCM standard updated?|Catena-X standards can be updated on a quarterly basis, with breaking changes being allowed once a year. The DCM expert group is committed to introducing new features to the DCM standard without incurring breaking changes. Additionally Catena-X is committed to ensuring backwards compatibility of the two most recent major releases. This means that a particular standard version will be valid for at least two years.|
|7|When a new version of the DCM standard is released, do I as a user need to re-install anything or implement any technical changes?|Usually standards are released six months before they are rolled out into the Catena-X dataspace. Within those six months infrastructure, applications etc. need to be updated, if a breaking change was introduced. However this is not handled by individual users, but rather by IT-departments and applications providers.|

<br/><br/><br/><br/>

## Practical - General

|#|Question|Answer|
|--|--|--|
|1|Which time granularity and horizon is used within DCM?|Demand and capacity data within DCM is distributed into weekly buckets. There is no technical limitation when it comes to the horizon. Typically data is shared starting from two weeks up to two years into the future.|
|2|I own a small company and do my planning in an Excel spreadsheet, can I still use the DCM Standard?|Yes, you can. While there are certain pre-requisites to DCM it does not restrict you to a specific planning tool.|
|3|Can I directly send my data from Excel into the Catena-X dataspace?|No, you either require a business application that supports Excel upload or use the open source [Simple Data Exchanger](https://github.com/eclipse-tractusx/managed-simple-data-exchanger), as soon as it supports DCM.|
|4|I run my MRP (Material Requirements Planning) only once a month, can I still use DCM?|Yes, you can. DCM relies mainly on PUSH communication. Just PUSH your data to your partners after you have done your MRP. In addition DCM supports request for update, allowing you or your partners to request an update on demand and capacity data at any time. (e.g. before and after counting all your stock)|
|5|Is there any industry DCM isn´t suitable for?|The standard was primarily developed by the automotive industry, but is not restricted to it. The core business process of DCM applies to most industries.|
|6|Does DCM support sharing capacity and demand data between companies that are not direct business partners? (e.g. tier 5 and OEM)| The standard restricts data exchange to companies that are in a direct business relationship as customer and supplier (One-up one-down). By solving or reducing potential bottlenecks within those one-up one-down relationships, the problems that are forwarded to your further-ups and further-downs get smaller and smaller, with every tier-level. In order for everyone to benefit the most from this setup you should encourage your tier-n business partners to join the Catena-X dataspace as well.|
|7|Will there be any alarm or notification if data entered is incorrectly or incompletely?|From a technical perspective: <br/>Certified applications implementing the DCM standard are required to do payload validation, checking the semantics and technical completeness of the data. However this does not protect from users entering a demand quantity that is comically high.<br/> <br/>From a business perspective: <br/>Yes, but the degree of protection depends on the business application you use and on how it handles user input validation. The DCM standard only defines basic payload validation.|
|8|Does DCM automatically keep historical data?|The dataspace itself does not historicise data for you. Neither does the DCM standard define how to historicise data. If you want to keep historic records your chosen DCM application needs to support this. Please be aware that, for data sovereignty reasons, you must not blindly historicise all data, but have to comply with the data exchange contracts and policies negotiated via EDC.|
|9|Am I allowed to store demand and capacity data shared via the Catena-X dataspace in my local backend systems and am I allowed to work with the data?|You can store, forward and transform the data as long as you ensure enforcement of the attached policies and contracts, guaranteeing data sovereignty within Catena-X.|
|10|How does DCM ensure data quality?|The standard defines mandatory properties and payload validation for `WeekBasedMaterialDemand` and `WeekBasedCapacityGroup` as well as an aligned business process that pushes for quality. In combination with framework agreements and only allowing certified companies as well solutions into the Catena-X dataspace data quality can be considered a given. In addition suppliers can make use of the feature demand volatility metric to educate twitchy customers.|

<br/><br/><br/><br/>

## Practical - Customer specific

|#|Question|Answer|
|--|--|--|
|1|Can I receive capacity data for a whole family of materials (All screws) instead of a single material (Screw P6766000001140000) |The material number of the customer is one aspect that makes the material demand unique. As a customer you will always receive capacity data referencing your material number. If your material number does not represent a single part, but rather a part family, you will receive capacity data related to that.<br/><br/> Alternatively your supplier can link all material demands that relate to a part family to one capacity group and than provide you with a capacity for all linked materials.|
|2|I do have multiple assembly locations utilizing the same part. Will my supplier be able to provide capacity information for each individual assembly location?|Yes, he will. Suppliers structure capacity groups at their own discretion and the customer location is one aspect that makes a material demand unique. This means the supplier can provide you with one capacity group for all your locations, one capacity group for each location or anything in between, depending on your business needs.|
|3|Do I have to share my demands part by part or is some kind of batch upload possible?|From a business perspective: <br/>As a customer you share your material demands on a material number basis, meaning that if you want to communicate the demand for twelve material numbers you need to provide your supplier with twelve `WeekBasedMaterialDemand` objects. However this is just what happens under the hood. If you utilize a business application tailored to your needs, batch processing is feasible, especially if you ensure that there are no gaps in the demand time series.<br/><br/>From a technical perspective:<br/>A single data transfer can contain multiple information objects of the same type, such as `WeekBasedMaterialDemand`. Interfacing DCM with your demand planning software should allow for a highly automated data exchange pipeline, greatly reducing the amount of manual data interaction, business has to execute.|
|4|My suppliers are only willing to share customer specific capacity data such as allocations. Can I still use DCM?| From a business perspective:<br/>Yes, you can. Within DCM data is exchanged only within direct business relationships and only between two companies anyways. If your demand is higher than the capacity allocated by your suppliers this is considered a bottleneck and should result in collaboration. <br/> <br/>From a technical perspective:<br/>Suppliers can share actual, maximum and agreed capacity with their customers. The shared values are always customer specific. <br/><br/>|

<br/><br/><br/><br/>

## Practical - Material Demand specific

|#|Question|Answer|
|--|--|--|
|1|How often do I need to share my demand data?|It is recommended to provide your suppliers with an updated `WeekBasedMaterialDemand` every time your demand changes. How often that is entirely depends on your internal processes, but the standards recommends to send an updated `WeekBasedMaterialDemand` at least monthly, even if the demand quantities themselves did not change.|
|2|Do I have to include a demand category?|Demand category is a mandatory property and needs to be included with every `WeekBasedMaterialDemand`. However you can simply set it to the value `default` without further elaboration. |

<br/><br/><br/><br/>

## Practical - Supplier specific

|#|Question|Answer|
|--|--|--|
|1|If I receive a demand forecast where some materials (parts) have no demand quantity or a demand quantity of zero, will I still be able to share my available capacity for those materials?|Yes, as long as you are aware of a material (part) you can share your capacity in regards to the material, completely independent of what the actual demand values of your customer are.|
|2|Do I have to share my capacities part by part or is some kind of batch upload possible?|From a business perspective: <br/>As a supplier you can link multiple material demands to a single capacity group. Of course you should only do this, if those materials share a common capacity. If all material demands of a specific customer share a capacity, then only one data transfer to that customer is required. This means you need at least one data transfer per customer to share all your capacities. <br/><br/>From a technical perspective:<br/>A single data transfer can contain multiple information objects of the same type, such as `WeekBasedCapacityGroup`. Interfacing DCM with your capacity planning software should allow for a highly automated data exchange pipeline, greatly reducing the amount of manual data interaction, business has to execute.|
|3|If I do receive material demands for 100 different parts, do I have to also provide capacity data for all 100 parts? |From a business perspective it is certainly wise to provide capacity data for every material that is part of existing contractual obligations with the customer that did send you the material demand. |
|4|Some materials I am producing for my customer load my production line differently than other materials, can I still include them in the same capacity group?|Yes, DCM supports load factors that can address this issue by expressing how much a particular material loads your production line compared to another material. It also allows you to convert all calculations to cycles or seconds, which is useful if materials using different unit of measures have to be part of the same capacity group.|
|5|Some of my customers demand data is highly volatile, can DCM help me with this issue? |Yes, DCM supports demand volatility metrics, which allow you to communicate to your customer that you are measuring volatility as well as define acceptable deviations.|
|6|Sometimes I produce materials in advance to use them later on to fulfill my customers demand. Can DCM reflect this?|Yes DCM supports simulated delta production, allowing you to close the demand-capacity gap via post- and pre-production.|
|7|I am going to add another production line, expanding my output. How should I reflect this within DCM?| This increase in potential output should lead to an increase in maximum capacity, starting from the date the increased output is available. It may as well be reflected in the actual capacity, if the demand justifies to utilize this newly increased potential output.|
|8|Does the standard allow me to submit structured action plans to my customers? | The standard allows for the exchange of capacity data as well as comments. By combining both you can for example introduce pre-production as well as a weekend-shifts and comment into the specific weeks the remaining details. Actual action plans are considered mostly customer specific and are more likely to be managed in a customer specific portal.|
|9|Some of my customers are direct competitors. How should this situation be reflected in DCM?|From a legal perspective:<br/>Ask a corporate lawyer familiar with every jurisdiction that applies to your specific case.<br/><br/> From a business perspective:<br/>Data exchanged within DCM is always happening in a direct one to one business relationship. There is no situation, where more than two companies share the same information objects (`WeekBasedCapacityGroup`, `WeekBasedMaterialDemand`). As a supplier you provide your customer A the capacity data he needs within the business relationship `You - Customer A` and customer B with the data needs within the business relationship `You - Customer B`, meaning you keep them completely separate.|

<br/><br/><br/><br/>

## Practical - Capacity Group specific

|#|Question|Answer|
|--|--|--|
|1|How often do I need to share my capacity data?|It is recommended to provide your customers with an updated `WeekBasedCapacityGroup` every time your capacity changes. How often that is entirely depends on your internal processes.|
|2|Should there be one capacity group for every individual material demand?|The supplier has full flexibility when it comes to linking material demands to capacity groups. If the supplier has one dedicated assembly line per part, than the most likely scenario is one capacity group per part. However even then, logistics might be a common bottleneck for all assembly lines and therefore parts, resulting in one capacity group for all parts. Suppliers should structure capacity groups to reflect their real life bottleneck situation for the greatest benefit.|
|3|Should there be one capacity group with all material demands linked to it?|The supplier has full flexibility when it comes to linking material demands to capacity groups. If all parts manufactured by the supplier share a common bottleneck (e.g. the painting station), then the most likely scenario is one capacity group for all parts. However, even then, the painting station might have a throughout so high, that it is no bottleneck at all, resulting in a different capacity group makeup. Suppliers should structure capacity groups to reflect their real life bottleneck situation for the greatest benefit.|

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023 CatX Service GmbH
- SPDX-FileCopyrightText: 2023 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 Stellantis N.V.
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange
