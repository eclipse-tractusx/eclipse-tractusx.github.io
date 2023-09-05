---
sidebar_position: 5
title: Compiling
---

We publish precompiled development artifacts via the [Github Package Registry](https://github.com/orgs/catenax-ng/packages?repo_name=product-knowledge).
All development artifacts are versioned using a semantic versioning scheme RELEASE.INCREMENT.ITERATION(-BUILDTYPE)
The release versions are documents in the [Changelog](../Changelog).

## Compiling Against JRE Artifacts

All JRE based artifcats can be found in the [Github Maven Repository](https://maven.pkg.github.com/catenax-ng/product-knowledge) and rely on Java 11.

### Dependencies

Besides further OSS dependencies, Agent KIT is compatible with particular Catena-X Releases (and its EDC/Connector KIT).

* Version 0.6.4-SNAPSHOT of Knowledge Agents is compatible with Catena-X EDC Release 0.1.2
* Version 0.7.2-SNAPSHOT of Knowledge Agents is compatible with Catena-X EDC Release 0.1.4 (unpublished)
* Version 0.7.>=3-SNAPSHOT of Knowledge Agents is compatible with Catena-X EDC Release 0.2.0
* Version 0.8.>=5-SNAPSHOT of Knowledge Agents will be compatible with Catena-X EDC Release >=0.3.0

### Include Agent into your EDC build

Add the following to the repositories section of your master pom (and remember to put your github access token to the settings.xml):

```xml
  <repository>
    <id>github-ka</id>
    <name>Catena-X Knowledge Agents Maven Repository</name>
    <url>https://maven.pkg.github.com/catenax-ng/product-knowledge</url>
   </repository>
```

#### Control Plane Build

Add the following dependency to your final control plane pom:

```xml
 <dependency>
    <groupId>io.catenax.knowledge.dataspace.edc.control-plane</groupId>
    <artifactId>control-plane-transfer</artifactId>
    <version>0.7.4-SNAPSHOT</version>
 </dependency>
```

#### Data Plane Dependency

Add the following dependency to your final data plane pom:

```xml
  <dependency>
    <groupId>io.catenax.knowledge.dataspace.edc.control-plane</groupId>
    <artifactId>agent-plane-protocol</artifactId>
    <version>0.7.4-SNAPSHOT</version>
  </dependency>
```

## Compiling Against Node Artifacts

All Javascript-based artifcats can be found in the [Github NPM Repository](https://npm.pkg.github.com)
