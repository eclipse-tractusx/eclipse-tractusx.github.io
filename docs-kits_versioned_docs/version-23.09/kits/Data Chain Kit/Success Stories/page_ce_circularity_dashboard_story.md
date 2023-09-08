---
id: Circularity Dashboard Sucess Story
title: Circularity Dashboard Sucess Story
description: 'Data Chain Kit'
sidebar_position: 1
---

Due to the large number of producers and consumers, however, the implementation of the circular economy is challenging: Information on the individual lifecycles is mostly only available locally and therefore does not provide any meaningful assessment of reuse, recycling or remanufacturing.

![success](@site/static/img/irs-circularity-dashboard-successstory.png)

Therefore, the circularity dashboard, gives the user information about materials of the product and of all their composites. This is only possible, if participants of the supply chain, the direct manufactures of the composites of a vehicle are sharing information about the materials used.
The ability to access provided data in the Catena-X network could be done in two different ways. Way one is to handle each request separately, or use the IRS, which manages the retrieval of digital twins, checks and validates the results against the semantics and provides an easy-to-use API to interact with the decentral stored data.
In the SAP Industry Network for Automotive, circularity cockpit  API specification and IRS implementation are serving as a reference.  Thus, we were able to develop IRS functionality to best fit the SAP tech stack, which we decided to use for the circularity cockpit.
This enables us, to have a controlled access to distributed data in an interoperable setup to access data chains. To abstract the data consumption layer brings benefits in stability and resiliency to our application, because we could easily change to different providers or services of a IRS implementation.
