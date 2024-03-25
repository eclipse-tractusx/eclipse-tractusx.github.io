---
sidebar_position: 3
description: 'Conventions and behavior specific to Catena'
title: Policies in Catena-X
id: connector_kit_adoption_view_policies_cx
---

## Data Sovereignty in Catena-X

In Catena-X, there's a set of conventions with regard to how Providers structure their `odrl:Offer`s. They are however
also relevant for Enablement Service Providers building components enabling connectivity to the Dataspace (as specified
in CX-0018).

As mentioned in the primer on policies, Providers and Consumers must have a common
understanding of the meaning and consequences of `odrl:Offers` and, on a more granular level, their `odrl:Constraints`.
That's why there is a set of predefined `odrl:Constraints` - all of which have to be [accepted explicitly](working-with-policies.md#consumer-side-odrloffer-in-a-contractrequestmessage)
and some [checked against a Consumer's VP](working-with-policies.md#provider-side-checking-a-consumers-verifiable-presentation) additionally.
They are formalized in the Catena-X ODRL profile (to be published soon) which extends the regular [ODRL vocabulary](https://www.w3.org/TR/odrl-vocab/).

Here's a non-normative overview:

### Framework Agreements

Framework Agreements are references to legally binding documents which a Participant commits to during Onboarding. They
are roughly structured along the lines of business scenarios under which a set of business partners want to exchange
data.

### Usage Purposes


### Contract References
