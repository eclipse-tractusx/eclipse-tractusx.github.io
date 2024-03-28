---
id: Country Risk Score 
title: Country Risk Score 
description: 'Country Risk Score '
sidebar_position: 1
---

BPDM (Business Partner Data Management) aims to deliver first class master data and provide additional information regarding the company's business partners. This enables to make the best decision at all times based on actual data. This is especially helpful in a tender situation, for compliance processes or even for regulatory requirements.

Therefore, as part of the "Know Your Business Partner"-approach, the Country Risk Score Application has been developed.

![Country Risk Service](@site/static/img/country-risk-dashboard-min.png)

The service offers a score per country based on several, customizable ratings. This score indicates how the respective situation in the selected country is. Currently integrated sources are e.g. the Corruption Perception Index (CPI) giving the user an indication how corrupt the respective country is, as well as the Basel AML Index which provides the user with the information about money laundring and terrorism financing in the country. As an outlook there are a lot more publicly available as well as chargeable ratings to be implemented. As well as the granularity which can be increased for the future to take into account that large countries could have better or worse regions (e.g. China, USA, Russia).

Prerequisite to use this product: The consumer has to be sharing member as a company is only allowed to view the business partners they have uploaded initially.

The open source solution is developed according to the Catena-X consortia and eclipse guidelines and was security checked. The repositories can be found here:

- [https://github.com/eclipse-tractusx/vas-country-risk-frontend](https://github.com/eclipse-tractusx/vas-country-risk-frontend)
- [https://github.com/eclipse-tractusx/vas-country-risk-backend](https://github.com/eclipse-tractusx/vas-country-risk-backend)

There is one main interface used from the Golden Record Product which is the GATE API in order to retrieve company specific business partners to be displayed in the dashboard. [https://github.com/eclipse-tractusx/bpdm/tree/main/docs/api](https://github.com/eclipse-tractusx/bpdm/tree/main/docs/api).

While currently the country risk service is a dashboard without the possibility to share data, in the future there shall be the functionality to request a country risk score from our application for a provided BPN Number. This functionality can then be used by other use cases like traceability or by the sharing member itself to integrate the data into their own proprietary systems. For this a separate API will be developed which will be extended by an EDC in order to take care of the access and usage policy of the data.

Once this interface is implemented and the EDC is set up, it can be ensured that the data fields are understood according to the defined semantics and peer-to-peer connections and effort can be minimized after initial setup. Therefore several Country Risk Service Providers are theoretically able to provide their data via this standardized API. This leads to great flexibility for the consumer and very little connection effort.

Stay tuned for more information!
