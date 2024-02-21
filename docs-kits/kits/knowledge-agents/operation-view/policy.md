---
sidebar_position: 3
title: Data Sovereignity & Policies
---
<!--
 * Copyright (c) 2021,2024 T-Systems International GmbH
 * Copyright (c) 2021,2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021,2023 Mercedes-Benz AG
 * Copyright (c) 2021,2023 ZF Friedrichshafen AG
 * Copyright (c) 2021,2023 SAP SE
 * Copyright (c) 2021,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This documentation and the accompanying materials are made available under the
 * terms of the Creative Commons Attribution 4.0 International License,  which is available at
 * https://creativecommons.org/licenses/by/4.0/legalcode.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: CC-BY-4.0
-->

This document (WIP) describes how Data Sovereignity can be reached in publishing Graphs and Skills while employing appropriate Policies.

For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Architecture](../development-view/architecture) documentation
* The [EDC Deployment](agent_edc) description
* The [Provider Deployment](provider) description
* The [AAS Bridge Deployment](bridge) description
* The [Conformity](testbed) testbed

The core ingredient to the KA Semantic Dataspace Architecture is that a business partner (the Provider) offers an RDF-based query endpoint (Graph Asset) over her Connector.

![Data Sovereignity Through Offering and Policy Validation](/img/knowledge-agents/graph_asset.png)

## Data Sovereignity Through Backend Authentication/Authorization and Offering Policies

A single endpoint (=Complete Graph) may be offered in different Graph Assets (=endpoint reference including a fixed parameterization, e.g. authorization header). By configuring different service principals/authentication tokens the Provider may realize different permissions/visibilities in the Complete Graph.

Since the Connector is checking the so-called Offering Policy associated to the assets, it is ensured that only proven business partners (Consumer) are able to negotiate a transfer to the respective Graph Asset (and hence the respective excerpt of the Complete Graph).

This method is easy to implement from the Connector side (the Consumers only see their dedicated assets), but maybe hard to realise on the Backend side.

## Data Sovereignity Through Access Policies

Not all backend endpoints will allow an expressive authorization scheme. Therefore we would like to propose an advanced and fine-grained approach to that using the so-called Access Policies of the Connector.

### Access Policies for Graph Queries

An Access Policy has a set of Constraints which may be Permissions, Obligations or Duties. For validating the Query-Based Access, we currently focus on Permission Constraints. At a later point, we may revisit Obligations and Duties related to the validation of ResultSets.

The following is an example of a permission which allows query to SELECT (and traverse) any edge of the graph where we can *prove in advance* that the mandatory predicate is hasMaterialProperty, the optional subject will be an instance of owl class RawMaterial and that the optional object will be an instance of type MaterialProperty. We call the set of triples which match the constraint pattern the constraint triples.  

``
{
  "id": "urn:io.catenax.knowledge.dataspace.policy:SamplePolicy",
  "policy": {
      "permissions": [
        {
        "action": {
            "type": "SELECT"
        },
        "pattern": {
            "subject": "urn:io.catenax.knowledge.ontology:cx#RawMaterial",
            "predicate": "urn:io.catenax.knowledge.ontology:cx#hasMaterialProperty",
            "object":"urn:io.catenax.knowledge.ontology:cx#MaterialProperty"
        },
        "edctype": "dataspaceconnector:permission"
        }
    ],
    "@type": {
        "@policytype": "set"
    }
  }
}
``

We may introduce the abbreviation where only "subject" is bound, this is quivalent to "predicate":"rdf:type","object":"?subject".

The different action types related to graph queries are:

* CONFIRM The constraint triples may be matched (variables need already bound by other SELECT or TRAVERSE permissions)
* SELECT The constraint triples may be returned (variables may be bound, aggregated and given back
  out of the
  query context) or traversed (subsequent statements may use the bound information to access further edges of the graph).
* SELECT_SUBJECT The object needs to be alrady bound by other SELECT permision)
* SELECT_OBJECT The subject needs to be already bound by another SELECT permssion
* TRAVERSE The constraint triples may be traversed (subsequent statements may use the bound
  information (or an anonmous node) to access further edges of the graph), but not returned (any bound variables may not be passed or aggregated).
* TRAVERSE_SUBJECT The constraint triples may be traversed on the subject side only (subsequent statements may use the bound
  information or anonymous nodes to access further edges of the graph), but not returned (any bound variables may not be passed or aggregated).
* TRAVERSE_OBJECT The constraint triples may be traversed on the object side only (subsequent statements may use the bound
  information or anonymous nodes to access further edges of the graph), but not returned (any bound variables may not be passed or aggregated).
* AGGREGATE The constraint triples be returned only in aggregated form (that is the variables may not
  be grouped by). They may be traversed (subsequent statements may use the bound
  information to access further edges of the graph).
* AGGREGATE_SUBJECT The constraint triples be returned only on the subject side in aggregated form (that is the variables may not
  be grouped by). They may be traversed (subsequent statements may use the bound
  information to access further edges of the graph).
* AGGREGATE_OBJECT The constraint triples be returned only on the object side in aggregated form (that is the variables may not
  be grouped by). They may be traversed (subsequent statements may use the bound
  information to access further edges of the graph).
* AGGREGATE_PRIVATE The constraint triples be returned only in aggregated, noisy form (that is the
  variables may not be grouped by and must be processed using a noise function). They may be traversed (subsequent statements may use the bound information to access further edges of the graph).
* AGGREGATE_PRIVATE_SUBJECT The constraint triples be returned only in aggregated, noisy form (that is the
  variables may not be grouped by and must be processed using a noise function). They may be traversed (subsequent statements may use the bound information to access further edges of the graph).
* AGGREGATE_PRIVATE_OBJECT The constraint triples be returned only in aggregated, noisy form (that is the
  variables may not be grouped by and must be processed using a noise function). They may be traversed (subsequent statements may use the bound information to access further edges of the graph).
* INSERT The constraint triples may be inserted into the graph.
* SELECT_SUBJECT_TRAVERSE_OBJECT
* SELECT_OBJECT_TRAVERSE_SUBJECT
* SELECT_SUBJECT_AGGREGATE_OBJECT
* SELECT_OBJECT_AGGREGATE_SUBJECT
* SELECT_SUBJECT_AGGREGATE_PRIVATE_OBJECT
* SELECT_OBJECT_AGGREGATE_PRIVATE_SUBJECT
* TRAVERSE_SUBJECT_AGGREGATE_OBJECT
* TRAVERSE_OBJECT_AGGREGATE_SUBJECT
* TRAVERSE_SUBJECT_AGGREGATE_PRIVATE_OBJECT
* TRAVERSE_OBJECT_AGGREGATE_PRIVATE_SUBJECT
* AGGREGATE_SUBJECT_AGGREGATE_PRIVATE_OBJECT
* AGGREGATE_OBJECT_AGGREGATE_PRIVATE_SUBJECT
* TRAVERSE_AGGREGATE
* DELETE The constraint triples may be deleted from the graph.

<sub><sup>(C) 2021,2023 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>
