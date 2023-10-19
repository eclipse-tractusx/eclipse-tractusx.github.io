---
id: Development View
title: Development View
description: 'Demand and Capacity Management Kit'
sidebar_position: 2
---

## Material Demand API

The WeekBasedMaterialDemand contains the material demand information which is send from the customer to the supplier.
All participants participating in Catena-X DCM in the role of a customer MUST be able to send the WeekBasedMaterialDemand. All participants participating in Catena-X DCM in the role of a supplier MUST be able to receive and process the WeekBasedMaterialDemand.

### Precondtions and dependencies

The WeekBasedMaterialDemand API MUST be published towards the network using a Data Asset/Contract Offer in terms of the Dataspace Protocol as defined by IDSA, following the Catena-X standard SOV-001. 

## API specification

### API Endpoints & resources

To support the exchange of WeekBasedMaterialDemand data, a business application MUST define a single endpoint supporting the HTTP POST request method as described in [RFC9110]. The structure of the endpoint MAY be freely chosen. The address of the endpoint MUST be provided as part of the EDC Data Asset defined in chapter 2.2.5 of this document.

### Data exchange

The WeekBasedMaterialDemand data MUST be sent from the customer to the supplier using an HTTP POST request. The data format described here MUST be followed for the exchange of the material demand information.

Multiple WeekBasedMaterialDemand aspects MAY be sent in one transfer as a JSON list. If only one WeekBasedMaterialDemand aspect is transmitted, it MUST still be sent as a list with one entry.

The serialized JSON MUST NOT be larger than 15 MiB in size.

The WeekBasedMaterialDemand endpoint MUST be implemented by all participants who wish to participate in the Catena-X DCM network as a supplier. Customers MUST be able to send material demand objects to their suppliers.
The data payload itself MUST be a valid JSON file.

All attributes marked as mandatory in the standard CX-DCM-SEM-SEMANTICMODEL MUST be included in the dataset. Attributes marked as 'Optional' MAY be included in the data set.

The usage of the attributes in the data model MUST follow the attribute descriptions in the definitions in CX-DCM-PROCESS. While some attributes are technically a string, not any string is valid. For example, expectedSupplierLocations MUST be formatted as a BPNS.
The calenderWeek MUST be set to a Monday of the week for that specific demand. The date format MUST be in accordance with ISO 70907 and MUST be in the format YYYY-MM-DD (for example 2023-02-13).

The attributes ‘demandCategory’ and ‘unitOfMeasure’ MUST be set to one of the defined values as defined in the standard CX-DCM-SEMANTICMODEL.

** Definition from CX-DCM-PROCESS **

The customer owns and MUST publish its own demand with its supplier for the future horizon and it is highly RECOMMENDED to avoid any gaps as far as possible and to share demand data at least till month 9, to ensure DCM participants to have also sufficient demand data to work with.  
If more demand data is available (i.e. demand related to a horizon that spans beyond month 9), the customer MAY ideally provide them until month 24. If a customer has even more demand data available (i.e. demand related to a horizon that spans beyond month 24), he MAY also provide this to his supplier. 
The data series MAY start already from week n+2.
Although the data series MAY start already from week n+2 and can be elaborated from a technical perspective, the DCM process have a clear focus on the tactical mid- to long-term horizon (typically considered from month 4 to 24) to enable a more resilient supply chain.

In addition to the definitions from CX-DCM-PROCESS quoted above, the following rules have to be followed:

The data series in the WeekBasedMaterialDemand SHOULD start already from week n+2.
The demand for the current week (n=0) and the next week (n=1) MAY be included in the dataset. The WeekBasedMaterialDemand MUST include at least one week other than the current or the next week (meaning it may not be empty). Every week MUST NOT be included multiple times in the same WeekBasedMaterialDemand.

If the demand for one of the weeks changes, the whole dataset MUST be sent to the supplier; sending the changes only (delta update / incremental update) is not possible. By this procedure, inconsistent or incomplete data sets are avoided. One data transfer MUST contain at least one WeekBasedMaterialDemand data set.

For the combination of the attributes supplier, customer and materialNumberCustomer in the object WeekBasedMaterialDemand, there MUST NOT be more than one WeekBasedMaterialDemand object in existence. This means that the customer needs to collect all demands for all factories and send them aggregated as one WeekBasedMaterialDemand to the supplier.

If the demand in a certain week has the value 0, it MUST be explicitly included as such in the WeekBasedMaterialDemand, meaning the week cannot be left out (as there is a difference between null and 0). Weeks with an unknown demand (value (null)) SHOULD be left out.

