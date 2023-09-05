---
sidebar_position: 3
title: Frequently Asked Questions
---

This document lists frequently asked questions about this Kit.

For more information see

* Our [Introduction](audience) manifest
* Our [Target Audience](audience) description
* The [CX-0084](https://github.com/catenax-ng/product-catena-x-standardization/blob/main/standards/CX-0084-FederatedQueriesInDataSpaces/1.0.0/CX-0084-FederatedQueriesInDataSpaces-v1.0.0.md) standard
* The [conformity](testbed) testbed
* An [Architecture](../development-view/architecture) documentation
* The [Deployment](../operation-view/deployment) guide

## Why should I Adopt Agent Technology?

### Widespread Standard

#### Isn't this a proprietary approach?

The underlying API's, protocols, standards and technologies are first-class citizens of the official [Gaia-X](https://gaia-x.eu/what-is-gaia-x/deliverables/data-spaces/) & [W3C Semantic Web](https://www.w3.org/standards/semanticweb/) portfolio.
These techs have been already adopted globally for a plethora of domains, use cases and derived (Open Source & commercial) projects.
Using these approaches will give you a competitive advantage which is even independent of the concrete dataspace instance/application that you are targetting at.

### No Redundancy

#### Is this a replacement to the existing BAMM Aspect Meta Model (BAMM) & Asset Administration Shell (AAS) approach?

Agent technology is a complement that means that both approaches can be deployed in co-existance. See the recommendation of the Catena-X Architecture Board

There will be some use cases (large interconnected datasets, ad-hoc querying, inference of derived knowledge) which enfavour the knowledge agents approach, others (simple access to already identified remote twins) will more adequately stay with the BAMM & AAS approach.

For the data providers, it will be easy to mount their artifacts (files, data source partitions, backend interfaces) under both types of assets (submodels, graphs).

For the app developers it will be easy to use both SDK's over a single consumer connector and even interchange the identifiers/IRis.

For the modellers, there is only a loose coupling between a protocol-independent, inference-agnostic data format description, such as BAMM, and a protocol-binding, but data-format independent inference/semantic model, such as OWL-R. We expect tools to generate at least the latter from the ubiquitous Excel/Tabular specifications. We could also imagine a kind of OWL-R to BAMM embedding (but not vice versa) once this is needed by a use case.

### Enhanced Security

#### Isn't it inherently insecure to let arbitrary Dataspace tenants invoke ad-hoc computations in my backend?

First, these are not arbitrary tenants, but access is only given to business partners with which you have signed contracts (and which appear in certain roles there).
A Skill request from a non-authorized chain of computation would not be able to enter your backend at all.

Furthermore, you would not expose your backend directly, but rather introduce a [virtualization layer](../development-view/architecture) between the Agent and your data source. This introduces another (role-based) security domain by appropriate sub-schemas and filters. So different contracts can be mapped to different security principals/data views in the backend.

We do not introduce arbitrary (turing-equivalent, hence undecidable) ad-hoc computations, but the [SPARQL](../development-view/sparql) standard introduces a well-defined set of operations whose effects and consequences can be checked and validated in advance (hypervision).

Finally, we are investigating a form of differential privacy which introduces noise between your data source and its graph representation such that original values can be effectively hidden from the reporting output.

### Easy Deployment

#### Doesn't this place additional burdens to the dataspace participants?

For data consumers, there is virtually nothing to do. All they have to care for is to add an Agent-Enabled data plane to their connector (or even use our Agent Plane as a full-blown replacement for the Http/AmazonS3 standard of Tractus-X).

For smaller data and skill providers, there will be the possibility to host non-critical data directly through the storage facilities of the Agent Plane.

For all others, they will employ techniques for data virtualization anyway to scale and shield their critical data. That is where the binding agents as one additional container/layer that is declaratively described (not: programmatically) come into play.

### Great Scalability

#### How could such a scheme be efficient at all

Our technology has been thoroughly developed, tested and piloted over the years 2022 and 2023. One key component is the ability of any Agent to delegate
a part of its work to other Business Partners/Agents and hence to bring the computations close to the actual data. This delegation pattern has several very nice properties:

* Delegation is dynamic based on the supply chain(s) that are described in the actual data. So the actual computation chain optimizes with the data.
* Delegation is parallelized such that several suppliers are requested simultaneously. Latency is hence minimized.
* Delegation may be opaque from the consumer view if contracts require so.
