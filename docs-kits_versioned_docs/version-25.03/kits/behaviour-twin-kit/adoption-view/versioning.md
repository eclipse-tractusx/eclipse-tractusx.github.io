---
id: versioning
title: Versioning
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT banner](@site/static/img/kits/behavior-twin/behavior-twin-kit-logo.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT
  </div>
</div>

## CATENA-X RELEASES

For information about the Catena-X release management, refer to the [Catena-X website ![(external link)](../assets/external-link.svg)](https://catena-x.net/). Implications for Behaviour Twin use cases are mentioned in the section [To Be Considered](./to-be-considered#versioning-and-breaking-changes).

## VERSIONING ASSETS

All EDC assets must be decorated by the `cx-common:version` within the `properties` list of the asset definitions. This applies to graph assets (data and service binding assets) as well as to skill assets.

## ONTOLOGY CHANGES

In most cases, ontologies are not alternated, but extended. The meaning of nodes/edges must not change.

New service or data types must have new types within the ontologies.

:warning: If an ontology gets extended, not all users may be aware of this extension. As a consumer of data or services, you cannot expect that all providers provide the corresponding data until next major release. If required, you may establish a appropriate mechanism in your use case for informing your partners and requiring them to provide the extended data.

## DATA AND SERVICE VERSIONS

Versioning of services, but also data is especially helpful if you want to harmonize versions within a use case. The attribute `cx-common:version` within the `properties` list of the asset definitions can be used for this purpose. Using semantic versioning, the feature version number can be harmonized by all participants (e.g. by agreements or standards). Semantic versioning is expressed in the following format: `[0-9]+.[0-9]+.[0-9]+(-SNAPSHOT)?`

A second option would be an extension of the corresponding ontologies and taxonomies. Then, the version information can be a part of the SHACL description in the graph assets.

It's up to the use case to handle the versioning. In skills, both options can be used to determine the desired data and service versions.
