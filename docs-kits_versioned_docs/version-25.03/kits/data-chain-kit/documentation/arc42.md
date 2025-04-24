---
id: arc42
title: Architecture documentation (arc42)

description: 'Architecture documentation (arc42)'
sidebar_position: 3
---
<!-- # Architecture documentation (arc42) -->

![Datachain kit banner](@site/static/img/kits/data-chain/data-chain-kit-logo.svg)

### Data Chain KIT

## Introduction and goals

This chapter gives you an overview about the goals of the service,
in which context the service runs and which stakeholders are involved.

## Requirements overview

### What is the Item Relationship Service?

The IRS is a:

* Functional federated component
* API endpoint to retrieve the tree structures in a recursive way, which data assets are distributed throughout the Catena-X network
* Reference implementation
* Data chain provider

### Substantial Features

* provide a top-down BoM asBuilt tree structure along the submodel "SingleLevelBomAsBuilt"
* usage of EDC consumer for communicating with the Catena-X network
* functionality of IRS provider will be handled by providers submodel servers
* federated IRS service
* 'asBuild' BoM of serialized components
* provides endpoints for submodel-descriptors
* start recursive Environmental and Social Standard investigations throughout the network based on the "asPlanned" lifecycle

## Quality goals

**❗ IMPORTANT**\
The following table entries define overall IRS quality goals. The order of the topics do not resolve in a priority of the quality goals.

| Quality goal | Motivation and description |
| --- | --- |
| running reference application | The IRS is built to traverse a distributed data chain across the automotive Industry. The goal for the IRS release 1 scope is to build a running solution to test the functionality of building a BoM as built of serialized components. |
| multiple async job orchestration | The IRS is built to access multiple endpoints parallel. Since the for the Endpoint it is not clear yet how long a request will take to respond. The Service is built to handle multiple asynchronous requests. |
| cloud agnostic solution | The IRS is built as reference architecture and able to run on different cloud solutions. It uses helm charts, terraform and a abstracts the storage, so that it can easily be integrated on different systems. |
| base security measures | The IRS is built with a base set of security features. |
| application reliability | The IRS architecture is set up so that the costumers can rely on reliable data chains |

## Architecture constraints

### Technical Constraints

| Name | Description |
| --- | --- |
| Cloud Agnostic Architecture approach | IRS provides a reference application/implementation which is deployable on any cloud ecosystem. There is no vendor lock to any cloud vendor. |
| Spring Boot and the Spring framework is used as underlying framework for Java development. | Spring Boot and Framework is used to build an easy and production-grade based application which could be deployed without any further infrastructure components. Orchestrating application components and integrating with other libraries/frameworks. |
| Lombok | Lombok for generating boilerplate code. Keeping code concise increases quality and maintainability. |
| Kubernetes is used for Container Orchestration | Kubernetes as container orchestration system used for software deployment, scaling and management of the IRS application.  This supports our software infrastructure and ensures efficient management and scalability of the IRS reference application. |
| Docker Container are used to provide a microservice oriented architecture | Deployment made on reliable production ready images. Avoiding repetitive, mundane configuration tasks for container orchestration. |
| Docker Compose is used to define and tune multi container application based on docker container technologies. | Docker container to develop independently of the underlying OS. |

### Organizational Constraints

| Name | Description | Comment |
| --- | --- | --- |
| CX-Services | Provide IRS as a C-X Shared Data Service. |  |
| App Marketplace & API Connection | IRS Application has to be accessible for the user in the App Marketplace. | App Marketplace & API Connection |
| Federal Ministry for Economic Affairs and Energy (BMWi) promotion | The Federal Ministry for Economic Affairs and Energy (BMWi) promotes the project and provides funds for the project. |  |
| Technology Readiness Level (TRL) for products developed within the CX Consortia | As IRS is a reference implementation, the Technology Readiness Level (TRL) must not be above TRL 8. |  |
| Operational Readiness for Release 1 has to be fulfilled | Minimum requirements for release 1 has to be archived. Later on, the Operational Readiness for Release has to be fulfilled accordingly to the requirements of the C-X consortia. |  |

### Political constraints

| Name | Description |
| --- | --- |
| Open Source | FOSS licenses approved by the eclipse foundation has to be used. It could represent the initial set that the CX community agrees on to regulate the content contribution under FOSS licenses. |
| Apache License 2.0 | Apache License 2.0 is one of the approved licenses which should be used to respect and guarantee Intellectual property (IP). |
| Java OpenJDK Version JDK >= 17 | IRS provides an open source application standard. OpenJDK is used, which is licensed under GNU General Public License (GNU GPL) Version 2. |

### Development conventions

| Name | Description |
| --- | --- |
| Architecture documentation | Architectural documentation of IRS reference application/implementation according to ARC42 template. |
| Coding guidelines | We follow the Google Java Style Guide. That is ensured by using the unified code formatter in the team and enforcing the style via Maven and Checkstyle / PMD. |
| Executable Bundle provided over the App Marketplace | As IRS is available in the App Marketplace, the application should be provided in one executable bundle. |
| Module structure | The entire build is driven from a Maven file, itself run from a single Dockerfile. |
| Code Analysis, Linting and Code Coverage | Consistent style increases readability and maintainability of the code base. Hence, we use analyzers to enforce consistency and style rules. We enforce the code style and rules in the CI to avoid merging code that does not comply with standards. |

#### Code analysis, linting and code coverage

| Tool | Scope | Rule | Configuration (via files / annotations) |
| --- | --- | --- | --- |
| Tidy | Enforce Maven POM Code Convention | Fail build on untidy pom.xml | N/A |
| SpotBugs | Static analysis to look for bugs in Java code. Successor of popular FindBugs tool | Fail build on violations | .config/spotbugs-excludes.xml @SuppressFBWarnings(...) |
| FindSecBugs | SpotBugs plugin adding security bugs coverage | Fail build on violations | N/A |
| Checkstyle | Enforce coding standard | Fail build on violations | .config/checkstyle-suppressions.xml @SuppressWarnings("checkstyle:XXX") |
| PMD | Source code analyzer to finds common programming flaws | Fail build on violations | .config/pmd-rules.xml @SuppressWarnings("PMD.XXX") |
| JaCoCo | Test coverage | Fail build on coverage &lt; 80% | pom.xml @ExcludeFromCodeCoverageGeneratedReport |
| Veracode | - Scan source code for vulnerabilities (SAST) - Scan dependencies for known vulnerabilities (SCA) - Check used licenses (FOSS Licenses) |  | [https://web.analysiscenter.veracode.com/](https://web.analysiscenter.veracode.com/) |
| Dependabot | Automated dependency updates built into GitHub. Provided pull requests on dependency updates. | Any dependency update generates a pull request automatically. | .github/dependabot.yml |
| CodeQl | Discover vulnerabilities across a codebase. |  | .github/workflows/codeql.yml |

## System scope and context

The IRS acts as a middleware between consumers and manufacturers. This section describes the environment of IRS. Who are its users, and with which other systems does it interact with.

## Business context

![arc42_000](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_000.png)

### Consumer

The IRS API is being consumed by the dismantler dashboard and other parties which are part of the Catena-X network. They need to provide valid credentials issued by the Catena-X IAM. Additionally, they must provide a base global asset identifier to retrieve information for as well as configuration details for the view on that information.

### Catena-X network

The IRS retrieves data from the Catena-X network (using the necessary infrastructure, see Technical Context), aggregates it and provides it back to the consumers. This connection is mandatory. If the Catena-X services are unavailable, the IRS cannot perform any work.

As of now, the IRS uses its own IAM credentials to gather the required data. This might be changed to use the consumer credentials in the future.

## Technical context

![arc42_001](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_001.png)

### Component overview

#### IRS-API

We provide a REST API that can be consumed by any system registered in the Catena-X OAuth2 protocol provider, e.g. the Dismantler Dashboard. The development of such a consumer service is not part of the IRS application. Each system that acts as a client to the Restful application IRS can be used instead, if it supports any REST call of the designed REST endpoints in the REST Controller of the IRS application. For communication, the transport protocol HTTP(S) should be established.

In order to consume the Restful application IRS, the security aspect should be taken in consideration. IRS is a Spring Boot based application and is secured with the OpenID connector provider with OAuth2 protocol. This means for the consumers (users) that they need to authenticate themselves in order to be authorized to get access to the IRS. They generate a bearer token that they get from OAuth2 provider and attach it to the HTTP header parameter Authorization.

#### Registry API

The IRS acts as a consumer of the component Asset Administration Shell Registry. The IRS contains a Restful client (REST template) that build a REST call to the mentioned Digital Twin Registry API based on its known URL (the AAS registry URL is configured in the IRS Restful API). The request contains the given "globalAssetId" by the consumer. Like described in the above section, the security aspect is required in order to achieve a REST call against the AAS Registry. As a response, the IRS gets the corresponding asset administration shell descriptor. The last one contains a list of submodel descriptors which can be filtered by the aspect type entered by the consumer. An aspect type like SingleLevelBomAsBuilt, SerialPart etc. And as mentioned above, the transport protocol HTTP(S) is used for the REST call communication.

##### Discovery Service

In a decentralized system, the digital twin registry is moved behind an EDC. To access the registry of a data provider, a new set of central services was introduces. These discovery services consist of BPN Discovery, Discovery Finder and EDC Discovery.
IRS uses the Discovery Finder and EDC Discovery.
Discovery Finder is used to find the correct EDC Discovery URL for the type BPN. EDC Discovery returns the EDC connector URLs for a specific BPN.
With these EDC connector URLs, IRS searches the provider catalog for a asset of type `data.core.digitalTwinRegistry`. This asset should be part of every provider EDC catalog. With this asset, IRS can access the decentralized registry and after this step, the flow stays the same as in the paragraph above.

#### EDC API

The integrated EDC client in the IRS is responsible for creating restful requests to the component EDC. The IRS application builds from the retrieved AAS Descriptor (see previous section) the corresponding submodel endpoint URLs, negotiates an EDC contract and sends via the submodel REST client requests to the EDC. The EDC responds with the corresponding submodel data.

### Semantic Models

#### Overview asBuilt

##### Traversal Aspect

|     |     |     |
| --- | --- | --- |
| Name | Description |  |
| SingleLevelBomAsBuilt | The single-level bill of material represents one sub-level of an assembly and does not include any lower-level subassemblies. The as-built lifecycle references all child items as manufactured by the manufacturer referencing only child items in an as-built lifecycle themselves, unless parts can only be tracked by an part ID. If it’s unclear which item has been built-in into the parent item, all potential parts must be listed. This is the case when, e.g. the same item is supplied by two suppliers and the item is only tracked by a customer part ID during assembly, these items can not be differentiated from each other. | 2.0.0 |
| SingleLevelUsageAsBuilt | The aspect provides the information in which parent part(s)/product(s) the given item is assembled in. Could be a 1:1 relationship in terms of a e.g. a brake component or 1:n for e.g. coatings. The given item as well as the parent item must refer to an object from as-built lifecycle phase, i.e. a batch or a serialized part. | 2.0.0 |

##### Semantic Model

|     |     |     |
| --- | --- | --- |
| Name | Description | Version range |
| SerialPart | A serialized part is an instantiation of a (design-) part, where the particular instantiation can be uniquely identified by means of a serial numbers or a similar identifier (e.g. VAN) or a combination of multiple identifiers (e.g. combination of manufacturer, date and number) | [1.0,0, 1.1.0] |
| Batch | A batch is a quantity of (semi-) finished products or (raw) material product that have been produced under the same circumstances (e.g. same production location), as specified groups or amounts, within a certain time frame. Every batch can differ in the number or amount of products. Different batches can have varied specifications, e.g., different colors. A batch is identified via a Batch ID. | [1.0.0, 2.0.0] |
| JustInSequencePart | A just-in-sequence part is an instantiation of a (design-) part, where the particular instantiation can be uniquely identified by means of a combination of several IDs related to a just-in-sequence process | 1.0.0 |
| TractionBatteryCode | The traction battery code is an identification code for any automotive traction battery, ultracapacitor and other reachargeble energy storage device. It allows to carry information as required by the National Standard of the People’s Republic of China according to GB/T 34014-2017 published by the Standardization Administration of China (SAC). | 1.0.0 |

#### Overview asPlanned

##### Traversal Aspect

|     |     |     |
| --- | --- | --- |
| Name | Description |  |
| SingleLevelBomAsPlanned | The single-level Bill of Material represents one sub-level of an assembly and does not include any lower-level subassemblies. In as planned lifecycle state all variants are covered (\"120% BoM\"). If multiple versions of child parts exist that can be assembled into the same parent part, all versions of the child part are included in the BoM. If there are multiple suppliers for the same child part, each supplier has an entry for their child part in the BoM. | 2.0.0 |
| SingleLevelUsageAsPlanned | The aspect provides the information in which parent part(s)/product(s) the given item is assembled in. This could be a 1:1 relationship in terms of a e.g. a brake component or 1:n for e.g. coatings. The given item as well as the parent item must refer to an object from as planned lifecycle phase. If multiple versions of parent parts exist that the child part can be assembled into, all versions of the parent part are included in the usage list. | Not supported |

##### Semantic Model

|     |     |     |
| --- | --- | --- |
| Name | Description |  |
| PartAsPlanned | A Part as Planned represents an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status in a specific version. | [1.0,0, 1.0.1] |
| PartSiteInformationAsPlanned | The aspect provides site related information for a given as planned item (i.e. a part type or part instance that is uniquely identifiable within Catena-X via its Catena-X ID). A site is a delimited geographical area where a legal entity does business. In the \"as planned\" lifecycle context all potentially related sites are listed including all sites where e.g. production of this part (type) is planned. | 1.0.0 |

#### Overview asSpecified

##### Traversal Aspect

|     |     |     |
| --- | --- | --- |
| Name | Description |  |
| SingleLevelBomAsSpecified | The SingleLevelBomAsSpecified defines the view of the OEM or producer of the whole product, e.g. the OEM of a vehicle. It is free of any supplier-related information and specifies the promised and guaranteed content of the whole product to the end customer. This “top-down” view is in contrast to the “bottom-up” view of the SingleLevelBoMAsPlanned, though several sub-aspects are shared. The BomAsSpecified is merely one aspect, which is attached to the twin of the whole product and itself does neither introduce further twins nor reference them. Instead it merely comprises all functional information required by dismantlers, workshops or requestors for used parts to search for and to make a match on the market place. | 1.0.0 |

##### Semantic Model

|     |     |     |
| --- | --- | --- |
| Name | Description |  |
| PartAsSpecified | The aspect model PartAsSpecified belongs to the Part Catalogue. A PartAsSpecified represents a certain OEM catalog part on part number level. Providing a digital representation of the part as specified by the OEM. The link to the serialized part is done via the partId, this can only be done if the respective DT was provided by the supplier within the value chain. | [1.0.0, 1.0.1, 2.0.0] |

## Solution strategy

### Introduction

| Quality goal | Matching approaches in the solution |
| --- | --- |
| application reliability | - only data source is the Catena-X network, data is fetched directly from the data owner - IRS can be hosted decentralized by every participant by being an open source reference implementation |
| base security measures | - API protection using OAuth2.0/OIDC - automatic static and dynamic code analysis tools as part of the pipeline |
| cloud agnostic solution | - IRS is provided as a Docker image - Helm charts assist in deploying the application in any Kubernetes environment |
| multiple async job orchestration | - Separate job executor decouples data requests from the job status API - Multiple jobs with multiple transfer requests each can be handled in parallel, depending on the deployment resources |
| running reference application | - Working application can be used as reference by anyone due to open source publishing |

### Technology

The IRS is developed using Java and the Spring Boot framework. This choice was made due to the technical knowledge of the team and the widespread support of the framework.

Hosting the application is done using Docker and Kubernetes, which is widely used and vendor-independent regarding the hosting provider (e.g. AWS, Google Cloud, Azure, ...).

Inter-service communication is done using HTTP REST. This is the standard method in the Catena-X landscape and makes the IRS API easy to use for any third party client.

For persistence, blob storage was chosen as the payloads retrieved for each job vary for every aspect and the format can be unknown to the application, as it’s just being tunneled through to the client.

### Structure

The IRS consists of 4 main components:

1. the REST API to view and control Jobs
2. the asynchronous job processing engine
3. the job and payload persistence
4. the AAS connector

The REST API classes are separated from the application logic and can be replaced by a different interface easily. The actual entrypoint into the application logic are the *Service classes.

The job processing engine handles execution of the data requests for each job. It uses the AAS connector to retrieve the data and stores it into the persistence. The actual implementation of the persistence is decoupled from the logical representation and can be replaced easily as well.

## Building block view

## Whitebox overall system

The interfaces show how the components interact with each other and which interfaces the IRS is providing.

### Component diagram

![arc42_002](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_002.png)

### Component description

| Components | Description |
| --- | --- |
| IRSApiConsumer | Proxy for any consumer of the IRS api. |
| IRS | The IRS consumes relationship information across the CX-Network and builds the graph view. Within this Documentation, the focus lies on the IRS |
| EDC Consumer | The EDC Consumer Component is there to fulfill the GAIA-X and IDSA-data sovereignty principles. The EDC Consumer consists out of a control plane and a data plane. |
| EDC Provider | The EDC Provider Component connects with EDC Consumer component and forms the end point for the actual exchange of data. It handles automatic contract negotiation and the subsequent exchange of data assets for connected applications. |
| Submodel Server | The Submodel Server offers endpoints for requesting the Submodel aspects. |
| MIW | Managed Identity Wallet as Self-Sovereign-Identity Provider for EDC |
| Discovery Finder | The Discovery Finder is used to get the EDC Discovery Endpoint for a certain type of identification, e.g. BPNL. |
| EDC Discovery | The EDC Discovery Service is used to get EDC endpoints for a certain BPNL. |
| Semantic Hub | Semantic Hub provides information about semantic models in a specific version. This also includes JSON schemas, which IRS uses to validate the payload received by data providers. |
| BPDM | The Business Partner Data Management (BPDM) Service is used by the IRS to access shared business partner data for BPNs of Data Providers along the supply chain. |

| Number | Description |
| --- | --- |
| 01 | IrsApiConsumer calls the **IRS** public **API** |
| 02 | IrsApiConsumer must authorize using **technical C-X User** |
| 03 | Delegate authorization request to **IdP** |
| 04 | IRS requesting for **SubmodelAspects** using **EDC** |
| 05 | IRS requesting the **decentral DigitalTwinRegistry** over **EDC** and service discovery flow |
| 06 | IRS uses EDC to ensure sovereign data consumption |
| 07 | IRS MUST authorize at central IAM |
| 08 | IRS lookup for EDC Provider by given BPNs over the **EDC Discovery Service** |
| 09 | IRS lookup for **EDC Discovery Services** by given type &lt;BPN> over the **Discovery Finder** |
| 10 | IRS uses **Semantic Hub** to validate of **SubmodelAspects** payloads agains the schema provided in **Semantic Hub** |
| 11 | In case "lookupBPNs" is active IRS provides a lookup of company for given BPN |
| 12 | **EDC** is connected to **Managed Identity Wallet** for access policy check for data offers |
| 13 | **EDC** communication covering negotiation and data consumption |
| 14 | **EDC** is connected to **Managed Identity Wallet** for access policy check for data offers |
| 15 | **IRS** accessing to **SubmodelServer** on Tier Level using the **EDC** |
| 16 | **IRS** accessing the **decentral DigitalTwinRegistry** on Tier Level using the **EDC** |
| 17 | In case of the use-case Environmental and Social Standards, **IRS** sends notifications to the **IRS-ESS** instance running at the data provider using the **EDC**. |

## Level 1

### Component diagram

![arc42_003](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_003.png)

### Component description

| Components | Description |
| --- | --- |
| **IRS** | The IRS builds a digital representation of a product (digital twin) and the relationships of items the product consists of in a hierarchical structure. The result is an item graph in which each node represents a digital item of the product - this graph is called "Item Graph". |
| **IRS API** | The **IRS API** is the Interface over which the Data Consumer is communicating. |
| **IrsController** | The **IrsController** provides a REST Interface for retrieving IRS processed data and job details of the current item graph retrieval process. |
| **IrsItemGraphQueryService** | The **IrsItemGraphQueryService** implements the REST Interface of the IrsController. |
| **JobOrchestrator** | The **JobOrchestrator** is a component which manages (start, end, cancel, resume) the jobs which execute the item graph retrieval process. |
| **RecursiveJobHandler** | The **RecursiveJobHandler** handles the job execution recursively until a given abort criteria is reached or the complete item graph is build. |
| **TransferProcessManager** | The TransferProcessManager handles the outgoing requests to the various data services. A job is processed in this order: 1. Initiation of the job and preparation of the stream of **DataRequests** 2. **RecursiveJobHandler** requesting for AAS via the Digital Twin registry. 3. Analyzing the structure of the AAS response by collecting the traversal aspect. 4. Requesting submodel data for given items of next level. 5. Recursively iteration over step 2-4 until an abort criterion is reached. 6. Assembles the complete item graph. |
| **BlobStore** | The BlobStore is the database where the relationships and tombstones are stored for a requested item. |
| **JobStore** | The JobStore is the database where the jobs with the information about the requested item are stored. |
| **Digital Twin Client** | The Digital Twin Client is the interface to the Digital Twin Registry. It provides an interface for the Asset Administration Shells. |
| **Decentralized Digital Twin Client** | In a decentralized network, the Digital Twin Client connects to the EDC which then proxies the requests to the digital twin registry on provider side. |
| **EDC Client** | The EDC Client is used to communicate with the EDC network, negotiate contracts and retrieve submodel data. |
| **EssController** | The **EssController** provides a REST Interface to perform BPN investigations of supply chain. |
| **PolicyStoreController** | The **PolicyStoreController** provides a REST Interface for getting, adding and deleting accepted IRS EDC policies. These policies will be used to validate EDC contract offers. |

## Level 2

### IRS controller

The IRS REST controller is used to provide a RESTful web service.

#### Component diagram

![arc42_004](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_004.png)

#### Component description

| Components | Description |
| --- | --- |
| IrsController | Application REST controller. |
| IrsItemGraphQueryService | Service for retrieving item graph. |
| JobOrchestrator | Orchestrator service for recursive MultiTransferJobs that potentially comprise multiple transfers. |
| JobStore | Spring configuration for job-related beans. |
| BlobstorePersistence | Interface for storing data blobs. |

### RecursiveJobHandler

The **RecursiveJobHandler** component provide the logic to build jobs recursively to retrieve items over the complete C-X network and assembles the partial results into a single item graph result.

#### Component diagram

![arc42_005](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_005.png)

#### Component description

| Components | Description |
| --- | --- |
| AASRecursiveJobHandler | Recursive job handler for AAS data |
| TreeRecursiveLogic | Retrieves item graphs from potentially multiple calls to IRS API behind multiple EDC Providers, and assembles their outputs into one overall item graph. |
| ItemTreesAssembler | Assembles multiple partial item graphs into one overall item graph. |
| BlobPersistence | Interface for storing data blobs. |

### TransferProcessManagement

The TransferProcessManager creates executions and provides them to the executor service. Each execution contains HTTP requests to the asset administration shell registry and to the submodel interface.

#### Component diagram

![arc42_006](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_006.png)

#### Component description

| Components | Description |
| --- | --- |
| TransferProcessManager | The TransferProcessManager manages the requests to the EDC and DigitalTwinRegistry. |
| DigitalTwinRegistryFacade | The DigitalTwinRegistryFacade calls the DigitalTwinRegistry to retrieve data form the AAS registry and transforms the response to internal data models. |
| SubmodelFacade | The SubmodelFacade handles EDC contract negotiations and is responsible for the EDC dataplane requests to retrieve data from the submodel servers. |
| BlobStore | The BlobStore is the database where the relationships and tombstones are stored for a requested item. |
| DigitalTwinRegistry | The DigitalTwinRegistry is the central database of registered assets. In a decentralized network, the registry is no longer central, but every provider has its own registry. |
| ExecutorService | The ExecutorService enables the simultaneous execution of requests of transfer processes. |

### ESS controller

The ESS REST controller is used to provide a RESTful web service to related Environmental and Social Standards functionalities.

#### Component diagram

![arc42_007](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_007.png)

#### Component description

| Components | Description |
| --- | --- |
| EssService | Service contains business logic for investigation if part is inside supply chain. |
| IrsItemGraphQueryService | Service for retrieving item graph. |
| BpnInvestigationJobCache | Interface for storing incident data blobs. |
| EssRecursiveNotificationHandler | Business logic handling recursive investigation and results calculation. Responsible for sending and receiving EDC notifications. |

## IRS API

### References

The Swagger documentation can be found in the local deployment of the reference application. More information can be found in the GitHub repository: [https://github.com/eclipse-tractusx/item-relationship-service/blob/main/README.md](https://github.com/eclipse-tractusx/item-relationship-service/blob/main/README.md)

Since we cannot rely on synchronous responses regarding the requests of submodel endpoints, we designed the IRS in a way that it will handle the job management of requesting all needed endpoints in order to build a BoM tree.

### IRS interaction diagram

![arc42_008](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_008.png)

### ESS Investigation interaction diagram

![arc42_009](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_009.png)

## Runtime view

### IRS Iterative

This section describes the iterative flow, the main processes of the IRS, and explains how data is transferred and processed when a job is executed.

![arc42_010](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_010.png)

### Submodel

This section describes how the IRS fetches submodel payload.

![arc42_011](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_011.png)

### Job orchestration flow

This section describes the job orchestration in IRS.

![arc42_012](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_012.png)

### Policy store flow

This section describes the policy store in IRS.

![arc42_013](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_013.png)

### Policy check procedure

This section describes the way IRS is validating policies found in assets.

![arc42_014](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_014.png)

## Scenario 1: Create job

This section describes what happens when user creates a new job.

![arc42_015](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_015.png)

### Overview

If a job is registered via the IRS API, it will be persisted (with its parameters) in the JobStore, where it can be retrieved by further calls and processes.
Then, the starting item ID is extracted, and a new transfer process is handed to the ExecutorService, which will process it asynchronously (see Scenario 2: Job Execution).

In the meantime, the JobOrchestrator returns a response to the API caller, which contains the UUID of the new job.
This UUID can then be used by the caller to retrieve information about the job via the API.
The input provided by the caller determines how the job will operate (starting point, recursion depth, aspect filter, ...).

## Scenario 2: Job execution

This section describes how a job is asynchronously executed inside the IRS.

![arc42_016](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_016.png)

### Overview

After a job has been created (see Scenario 1: Create Job), the first transfer containing the root item ID is passed to the ExecutorService. The transfer is then started asynchronously and retrieves the necessary information from the Catena-X network, first by fetching the AAS information from the DigitalTwin registry and then calling the SubmodelProviders for the submodel payload.

At least the aspect SingleLevelBomAsBuilt is required for the tree to be built. If the customer that started the job provided more aspects to be fetched, they will be retrieved here too.
The result of each transfer is stored in the BlobStore.

After the transfer process has finished, any subsequent child IDs will be extracted and new transfer processes will be scheduled for those via the ExecutorService. This cycle repeats until all leafs were reached, the specified max depth has been reached, or the job was canceled externally.

As soon as all transfers are finished, the results will be combined and stored in the BlobStore again. The job itself will be marked as completed.

## Scenario 3: Request for JobResponse

![arc42_017](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_017.png)

### Overview

When a user requests job details, the IRS looks up the jobId in the persistent job store. If the job exists, it will proceed to fetch the job details and prepare a response object.
Only if the job is in state "COMPLETED" or if the caller has set the parameter "includePartialResults" to true, the IRS will fetch the payload data for the job (relationships, AAS shells and submodels, if applicable) and attach it to the response object.

This will then be passed to the caller.

## Scenario 4: Cancel job execution

![arc42_018](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_018.png)

### Overview

When a user wants to cancel a job execution, the IRS will lookup that job in the persistent job store and transition it to the CANCELED state, if it exists. If a job is canceled, no further requests to the Catena-X network will be performed.

Afterwards, the IRS will return the updated job details of the canceled job to the user.

### IRS Recursive

This section covers the main processes of the IRS in a recursive scenario in a network.
This recursive scenario is illustrated using the various use cases realized in the scenario.

## Use Case: ESS (Environmental and Social Standards) Top-Down Approach

With the entry into force of the German Supply Chain Due Diligence Act as from January 1st, 2023, German companies are obliged to implement the corresponding requirements of this law.
In addition, the following European directives on this subject have also been adopted: EU regulation 2018/858. This regulation is legally binding to all EU member states.

### Specification

This component enables data providers to provide the BoM as planned aspect models via the Catena-X defined solution stack (i.e. EDC).
The BoM as planned aspect models consists of three aspect models:

* PartAsPlanned - Masterdata of a Part Type incl. location related data (e.g. production sites)
* SingleLevelBomAsPlanned - The relation to child part types provided by the supplier of the given company
* PartSiteInformationAsPlanned - Relation to Sites in order to resemble the flow of the specific part/material

### Overall flow

![arc42_019](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_019.png)

| Step | Actor | Action | Details |
| --- | --- | --- | --- |
| **[000]** | IncidentManager | Request ESS Incident investigation | - |
| **[001]** | Inquiring OEM Company | Check direct suppliers | - |
|  | Inquiring OEM Company | Check BPNS in direct suppliers | - |
| **[002]** | Inquiring OEM Company | Forward incident to Tier N+1 Supplier | - |
| **[003]** | Tier N+1 Supplier | Check direct suppliers | - |
|  | Tier N+1 Supplier | Check BPNS in direct suppliers | - |
|  | Tier N+1 Supplier | Forward incident to Tier N+n Supplier | - |
| **[004]** | Tier N+n Supplier | Check direct suppliers | - |
|  | Tier N+n Supplier | Check BPNS in direct suppliers | - |
|  | Tier N+n Supplier | Return responses (including hops) to Tier N+1 Supplier | ESS supplier response |
| **[005]** | Tier N+1 Supplier | Aggregate results | - |
|  | Tier N+1 Supplier | Return responses (including hops) to Inquiring OEM Company | ESS supplier response |
| **[006]** | Inquiring OEM Company | Aggregate results | - |
|  | Inquiring OEM Company | Check subgraph infection on first tier level | - |
| **[007]** | IncidentManager | Receive incident report from Inquiring OEM Company | - |

Note: ESS supplier responses are involved in each step of the process.

### Flow on company level

![arc42_020](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_020.png)

#### Step 0: Process initiation

The process is initiated by an ESS incident, that is received by (or created within) the inquiring company.
This ESS incident acts as the root incident for the overall process The incident contains a company name (incl. address) and a valid BPN exists for that company.
The BPN (a BPNL or BPNS) can be looked up in BPDM.

#### Step 1: Check direct suppliers

The inquiring company checks, if the company of the incident is a direct supplier of them.
In order to perform this check, the following data must be available in the inquiring company:

* Full list of direct suppliers
* Full list of parts supplied by those direct suppliers

In case the company of the incident is a direct supplier of the inquiring company, the process ends.
In case the company of the incident is not a direct supplier of the inquiring company, Step 2 is executed.

#### Step 2: Forward Incident

The incident is forwarded to all direct suppliers.
Each direct supplier is sent a "personalized" request to evaluate, if the inquiring company is impacted by the incident.
The incident is enhanced with additional data by the inquiring company:

* List of parts, that are supplied to the inquiring company by their direct supplier.

Each direct supplier executes Step 1.

#### Step 3: Gather Responses

The inquiring company collects the (asynchronous) responses.
The response of each direct supplier may contain the following results;

* YES → The company of the incident was found in the supply chain of the given list of parts
* NO → The company of the incident was not found in the supply chain of the given list of parts
* UNKNOWN → The query timed out or some other error occurred

In case at least one "YES" is received, the process step 3 ends

|     |     |     |     |
| --- | --- | --- | --- |
| Case | YES | NO | UNKNOWN |
| All assets on all nodes does not contain assets with incidentBPNs | x |  |  |
| At least one node contains assets with  incidentBPNs |  | x |  |
| At least one node does not contain PartSiteInformationAsPlanned aspect OR for at least one node PartSiteInformationAsPlanned  aspect  is not accessible |  |  | x |
| At least one node contains PartSiteInformationAsPlanned  with missing BPNS |  |  | x |
| At least one child node does not exist or is not accessible |  |  | x |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| State 1 | State 2 | State n | Result State | Description |
| YES | NO | UNKOWN | YES | If any part is impacted then whole Supply is impactes |
| YES | NO | NO | YES | Yes if any BPN is impacted even if all are not impacted. |
| NO | UNKNOW | NO | UNKNOW | Unknown if no Yes and at leat one bpn is unknown state. |
| NO | NO | NO | NO | No if complete SupplyChain is not impacted |

![arc42_021](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_021.png)

### Application Functionality Overview

#### Register an Ess-Investigation-Order

![arc42_022](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_022.png)

##### 1. Client Request

The _Client App (Script)_ initiates a request to the IRS (Item Relationship Service) by sending a GET request for shell lookup based on a specific BPN (Business Partner Number).

##### 2. Shell Lookup

IRS, along with other services like DiscoveryFinder, EDCDiscoveryService, and Digital Twin Registry, collaborates to look up shells for the given BPN, returning an array of AAS identifiers.

##### 3. AAS Descriptor Retrieval

For each AAS identifier, the client requests the IRS for the corresponding shell descriptors, adding them to a collection.

##### 4. Filtering AAS

The _Client App (Script)_ filters the AAS collection for SubmodelDescriptors marked _asPlanned_, based on certain criteria.

##### 5. Incident Registration

The client then initiates an IRS incident registration by sending a POST request with specific parameters, including bomLifecycle and callback URL.

##### 6. Incident Handling Loop

IRS proceeds to handle the incident by iterating through AAS identifiers, extracting child CXIds, and performing checks on associated data.

##### 7. Data Validation

The system checks the validity period of the received data and, if valid, proceeds to extract additional information.

##### 8. Incident Response

If certain conditions are met (e.g., incidentBpns contain catenaXsiteId), the system responds to the client indicating a part-chain infection.

##### 9. Notification Handling

Otherwise, the system sends an ess-request notification to the next tier level IRS, and after processing the request on the next tier level, receives an ess-response notification.

## Scenario 1: Register an Ess-Investigation-Order

This section describes what happens when user creates an ess order.

### Register an Ess-Investigation-Order

![arc42_023](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_023.png)

| Step | Actor | Action | Details |
| --- | --- | --- | --- |
| [000] | Client | Sends a POST request to `/ess/bpn/investigation/orders` | Includes JSON payload with parameters like "bomLifecycle," "batchSize," "callbackUrl," "incidentBPNSs," "keys," and "timeout." |
| [001] | IRS | Initiates initial order processing | Begins asynchronous processing of ESS process for "incidentBPNSs" and tuples of "globalAssetId" and "BPN." |
| [002] | IRS | Registers callback | Establishes a callback mechanism with the provided callback URL. |
| [003] | Client | Receives 201 success response | Indicates successful registration of the order. |
| [004] | Client | Sends a GET request to `/irs/orders/\{orderId\}` | Requests information for a specific orderId. |
| [005] | IRS | Processes GET request | Initiates processing of the requested orderId. |
| [006] | IRS | Sends a 200 response with order payload | Returns the details of the processed order. |
| [007] | Client | Optionally initiates batch completion | Completes the batch processing if required. |
| [008] | Client | Sends a POST request to `/irs/orders/\{orderId\}/batches/'\{batchId\}'` | Initiates batch processing for a specific orderId and batchId. |
| [009] | IRS | Sends BatchShell with jobs | Returns details of the batch with associated jobs. |

## Scenario 2: Register an Ess-Investigation-Job

This section describes what happens when user creates an ess job.

### Register an Ess-Investigation Job

![arc42_024](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_024.png)

| Step | Actor | Action | Details |
| --- | --- | --- | --- |
| [000] | Requestor | Sends a POST request to `/ess/bpn/investigations` | Includes JSON payload with parameters such as "bomLifecycle," "callbackUrl," "incidentBpns," and "key" containing "bpn" and "globalAssetId." |
| [001] | IRS | Registers an IRS ess incident job | Initiates the registration of an IRS ess incident job based on the received request. |
| [002] | IRS, DiscoveryFinder, EDCDiscoveryService, EDC, dDTR | Look up shells for the given globalAssetId | Conducts a lookup and retrieves AAS (Asset Administration Shell) for the specified globalAssetId. |
| [003] | IRS -> SubmodelServer | Sends a GET request for SingleLevelBomAsPlanned | Initiates a request to the SubmodelServer for the SingleLevelBomAsPlanned. |
| [004] | SubmodelServer -> IRS | Receives SingleLevelBomAsPlanned | Sends back the SingleLevelBomAsPlanned data to the IRS. |
| [005] | IRS | Extracts childCXIds from SingleLevelBomAsPlanned | Processes and extracts childCXIds from the received SingleLevelBomAsPlanned. |
| [006] | Loop (for each childCXId) | IRS, DiscoveryFinder, EDCDiscoveryService | Get EDC endpoint for Tier1, Retrieves the EDC endpoint for Tier1 based on the childCXId. |
| [007] | IRS, EDCTier1, dDTRTier1 | Look up shells for the given globalAssetId | Conducts a lookup and retrieves AAS for the specified globalAssetId in Tier1. |
| [008] | IRS -> SubmodelServer | Sends a request to get PartAsPlanned | Initiates a request to the SubmodelServer to get PartAsPlanned. |
| [009] | SubmodelServer &lt;- IRS | Receives PartAsPlanned | Gets PartAsPlanned data from the SubmodelServer. |
| [010] | IRS | Validity Check on PartAsPlanned validityPeriod | Checks the validity period of PartAsPlanned. |
| [011] | IRS -> SubmodelServer | Sends a GET request for PartSiteInformationAsPlanned | Requests PartSiteInformationAsPlanned from the SubmodelServer. |
| [012] | IRS -> IRS | Extracts catenaXsiteId from PartSiteInformationAsPlanned | Processes and extracts catenaXsiteId from PartSiteInformationAsPlanned. |
| [013] | IRS | Matches "incidentBpns" and catenaXsiteId | Checks for a match between "incidentBpns" and catenaXsiteId. |
| [014] | IRS | Detects the supplyChainImpacted on the first tier level | Identifies the supply chain impacted on the first tier level and provides information. |
| [015] | Requestor &lt;- IRS | Responds part-chain infected | Receives the response indicating the part-chain infection. |
| [016] | IRS | Continues the loop | Continues the loop for the remaining childCXIds. |
| [017] | Loop (end) | IRS | Loop completion |

## Deployment view

The deployment view shows the IRS application on ArgoCD, which is a continuous delivery tool for Kubernetes. Kubernetes manifests are specified using Helm charts. Helm is a package manager for Kubernetes. IRS is developed in a cloud-agnostic manner, so the application could be installed in any cloud infrastructure (on-premises, hybrid, or public cloud infrastructure).

![arc42_025](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_025.png)

### Operator

Manual preparation is required to initially set up the ArgoCD apps and the credentials in the HashiCorp Vault. This is done by the IRS system operator.

### ArgoCD

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes. See [https://argo-cd.readthedocs.io/.](https://argo-cd.readthedocs.io/.)

### Vault

HashiCorp Vault stores credentials, which are picked up by ArgoCD to deploy them to the application.

**⚠️ WARNING**\
Every secret information needed at runtime must be stored here and must never be part of the IRS Helm charts

### GitHub

GitHub contains the application source code as well as the Helm charts used for deployment.
The IRS Helm charts can be found here: [https://github.com/eclipse-tractusx/item-relationship-service/tree/main/charts](https://github.com/eclipse-tractusx/item-relationship-service/tree/main/charts)

### Docker Hub

When the IRS is built by GitHub Action workflows, the final image is pushed to Docker Hub, where it can be picked up for deployment.

### Kubernetes

The kubernetes cluster manages the underlying hardware that is used to run the applications defined in the Helm charts.

### Local deployment

For information on how to run the application locally, please check the README documentation in GitHub: [https://github.com/eclipse-tractusx/item-relationship-service/blob/main/README.md](https://github.com/eclipse-tractusx/item-relationship-service/blob/main/README.md)

### View Levels

## Level 0 - Cluster overview

### Isolated environment

The isolated environment contains the IRS as well as all surrounding services.

![arc42_026](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_026.png)

### Development environment

The development environment contains the IRS as well as the essential surrounding services, excluding the external IAM.

![arc42_027](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_027.png)

### Integrated environment

The integrated environment contains the IRS and is integrated with the rest of the Catena-X network.

![arc42_028](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_028.png)

## Level 1 - IRS application

This section focuses only on the IRS itself, detached from its neighbors. It shows the resources deployed in Kubernetes for the IRS.

![arc42_029](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_029.png)

### Pod

This is the actual IRS Docker image which runs as a container. The ports are only available internally and can be opened up with the Service.

### Secrets

The secret information (e.g. connection credentials) is stored here and provided to the Pod at runtime.

### Service

The service resource opens up selected ports of the Pod so that other applications in the same cluster can access it or to be used by the Ingress.

### Ingress

The ingress uses a reverse proxy to provide specified Service ports to the internet under a specified URL. This make the IRS API publicly available.

## Cross-cutting concepts

## Domain concepts

### Domain entity model

![arc42_030](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_030.png)

### Domain model

![arc42_031](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_031.png)

### API Model

For detailed information about the API model, please refer to the [API specification](https://eclipse-tractusx.github.io/item-relationship-service/docs/api-specification/api-specification.html).

### JobStatus

A job can be in one of the following states:

| State | Description |
| --- | --- |
| UNSAVED | The job was created, but not yet stored by the system. |
| INITIAL | The job was stored by the system and is now queued for processing. |
| IN_PROGRESS | The job is currently being processed. |
| TRANSFERS_FINISHED | All transfers for the job have been finished, and it is now being finalized. |
| COMPLETED | The job has completed. See the job response for details on the data. |
| ERROR | The job could not be processed correctly by the IRS due to a technical problem. |

![arc42_032](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_032.png)

### Job Store Datamodel

![arc42_033](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_033.png)

### Job Response Datamodel

![arc42_034](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_034.png)

```json
{
          "job": {
            "jobID": "e5347c88-a921-11ec-b909-0242ac120002",
            "globalAssetId": "6c311d29-5753-46d4-b32c-19b918ea93b0",
            "jobStatus": "Finished",
            "createdOn": "2022-02-03T14:48:54.709Z",
            "startedOn" : "2022-02-03T14:48:54.709Z",
            "lastModifiedOn": "2022-02-03T14:48:54.709Z",
            "jobFinished": "2022-02-03T14:48:54.709Z",
            "requestURL": "https://api.server.test/api/../",
            "owner": "",
            "summary": {
              "asyncFetchedItems": {
                "queued": 0,
                "running": 0,
                "complete": 0,
                "failed": 0
             }},
            "queryParameter": {
                "bomLifecycle" : "asBuilt",
                "aspect" : ["SerialPart", "Contact"],
                "depth": 4,
                "direction": "downward"
             },
            "exception": {
               "exception": "IrsTimeoutException",
               "errorDetail": "Timeout while requesting Digital Registry.",
               "exceptionDate" : "2022-02-03T14:48:54.709Z",
               "statusCode" : "404"
            }
          },
          "relationships": [
            {
              "catenaXId": "d9bec1c6-e47c-4d18-ba41-0a5fe8b7f447",
              "childItem": {
                "quantity": {
                  "quantityNumber": 1,
                  "measurementUnit": {
                    "datatypeURI": "urn:bamm:io.openmanufacturing:meta-model:1.0.0#piece",
                    "lexicalValue": "piece"
                  }
                },
                "lifecycleContext": "asBuilt",
                "assembledOn": "2022-02-03T14:48:54.709Z",
                "lastModifiedOn": "2022-02-03T14:48:54.709Z",
                "childCatenaXId": "a45a2246-f6e1-42da-b47d-5c3b58ed62e9"
              }
            }
          ],
          "shells": [
            {
              "description": [
                {
                  "language": "en",
                  "text": "The shell for a vehicle"
                }
              ],
              "globalAssetId": {
                "value": [
                    "a45a2246-f6e1-42da-b47d-5c3b58ed62e9"
                ]
              },
              "idShort": "future concept x",
              "identification": "882fc530-b69b-4707-95f6-5dbc5e9baaa8",
              "specificAssetIds": [
                {
                  "key": "engineserialid",
                  "value": "12309481209312"
                }
              ],
              "submodelDescriptors": [
                {
                  "description": [
                    {
                      "language": "en",
                      "text": "Provides base vehicle information"
                    }
                  ],
                  "idShort": "vehicle base details",
                  "identification": "4a738a24-b7d8-4989-9cd6-387772f40565",
                  "semanticId": {
                    "value": [
                        "urn:bamm:com.catenax.vehicle:0.1.1"
                    ]
                  },
                  "endpoints": [
                    {
                      "interface": "HTTP",
                      "protocolInformation": {
                        "endpointAddress": "https://catena-x.net/vehicle/basedetails/",
                        "endpointProtocol": "HTTPS",
                        "endpointProtocolVersion": "1.0"
                      }
                    }
                  ]
                },
                {
                  "description": [
                    {
                      "language": "en",
                      "text": "Provides base vehicle information"
                    }
                  ],
                  "idShort": "vehicle part details",
                  "identification": "dae4d249-6d66-4818-b576-bf52f3b9ae90",
                  "semanticId": {
                    "value": [
                        "urn:bamm:com.catenax.vehicle:0.1.1#PartDetails"
                    ]
                  },
                  "endpoints": [
                    {
                      "interface": "HTTP",
                      "protocolInformation": {
                        "endpointAddress": "https://catena-x.net/vehicle/partdetails/",
                        "endpointProtocol": "HTTPS",
                        "endpointProtocolVersion": "1.0"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
@endjson
```

## Safety and security concepts

### Authentication / Authorization

#### IRS API

The IRS is secured using OAuth2.0 / Open ID Connect.
Every request to the IRS API requires a valid bearer token.
JWT token should also contain two claims:

* 'bpn' which is equal to the configuration value from `API_ALLOWED_BPN` property
* 'resource_access' with the specific 'Cl20-CX-IRS' key for C-X environments. (The keys are configurable. For more details see chapter "IRS OAuth2 JWT Token").
  The list of values will be converted to roles by IRS.
  Currently, IRS API handles two roles: **'admin_irs'** and **'view_irs'.** A valid token with the **'admin_irs'** role can access any endpoint exposed by the IRS API, while a token with the **'view_irs'** role does not have access to policies endpoints and can operate only on resources it owns.
  That means that he only has access to the resources he has created, e.g. jobs and batches.
  This behavior is shown in the table below.

##### Rights and Roles Matrix of IRS

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Category | Action | Endpoint | view_irs | admin_irs |
| Policy Store | Add policy | POST /irs/policies |  | x |
|  | Get policies | GET /irs/policies |  | x |
|  | Update policy | PUT /irs/policies/\{policyId\} |  | x |
|  | Delete policy | DELETE /irs/policies/\{policyId\} |  | x |
| Aspect models | Get aspect models | GET /irs/aspectmodels | x | x |
| Job processing | Register job | POST /irs/jobs | (x) | x |
|  | Get jobs | GET /irs/jobs | (x) | x |
|  | Get job | GET /irs/jobs/\{jobId\} | (x) | x |
|  | Cancel job | PUT /irs/jobs/\{jobId\} | (x) | x |
| Batch processing | Register order | POST /irs/orders | (x) | x |
|  | Get order | GET /irs/orders/\{orderId\} | (x) | x |
|  | Cancel order | PUT /irs/orders/\{orderId\} | (x) | x |
|  | Get batch | GET /irs/orders/\{orderId\}/batches/\{batchId\} | (x) | x |
| Environmental- and Social Standards | Register investigation job | POST /ess/bpn/investigations | (x) | x |
|  | Get investigation job | GET /ess/bpn/investigations\{id\} | (x) | x |
|  | Accept notifications | POST /ess/notification/receive | x | x |

Legend: x = full access to all resources, (x) = access to the resources he owns

#### IRS OAuth2 JWT Token

IRS expects the JWT access token to have the following structure to be able to extract role information:

```json
{
...
  "resource_access": {
    "Cl20-CX-IRS": {
      "roles": [
        "view_irs",
        "admin_irs"
      ]
    }
  },
...
}
```

The field names can be configured via application.yaml:

```yaml
# OAuth2 JWT token parse config. This configures the structure IRS expects when parsing the IRS role of an access token.
oauth:
  resourceClaim: "resource_access" # Name of the JWT claim for roles
  irsNamespace: "Cl20-CX-IRS" # Namespace for the IRS roles
  roles: "roles" # Name of the list of roles within the IRS namespace
```

#### IRS as DTR client

The IRS acts as a client for the Digital Twin Registry (DTR), which is also secured using OAuth2.0 / Open ID Connect.
The IRS uses client credentials to authenticate requests to the DTR.
Due to this, the IRS account needs to have access to every item in the DTR, unrelated to the permissions of the account calling the IRS API.

#### IRS as decentralized DTR client

In a decentralized network, IRS uses the EDC client to access the provider DTR.
This way, no authentication, other than the EDC contract negotiation, is needed to access the DTR.

#### IRS as EDC client

The IRS accesses the Catena-X network via the EDC consumer connector.
This component requires authentication via a Verifiable Credential (VC), which is provided to the EDC via the Managed Identity Wallet.

The VC identifies and authenticates the EDC and is used to acquire access permissions for the data transferred via EDC.

### Credentials

Credentials must never be stored in Git!

## Architecture and design patterns

### Dependency inversion

For the IRS, we utilize the dependency inversion mechanisms provided by Spring Boot as much as possible.

The principle says:

High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces).
Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

Adhering to this, we define clear interfaces between the different domains (e.g. job orchestration and AAS communication) in the IRS and let dependencies be injected by the framework. This improves testability of the classes as well.

### Hexagonal architecture

The hexagonal architecture divides a system into several loosely-coupled interchangeable components, such as the application core, the database, the user interface, test scripts and interfaces with other systems. This approach is an alternative to the traditional layered architecture.

For the IRS, this means decoupling the application logic from components like the BLOB store, the REST API controllers or the AAS client connection. With an interface between the parts (so-called port), it is easy to switch to other implementations, e.g. if you want to change the persistence implementation. No changes to the application logic will be necessary.

![arc42_035](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/arc42/arc42_035.png)

## "Under-the-hood" concepts

### Persistence

The IRS stores two types of data in a persistent way:

* Job metadata
* Job payloads, e.g. AAS shells or submodel data

All of this is data is stored in an object store. The currently used implementation is Minio (Amazon S3 compatible).
This reduces the complexity in storing and retrieving data. There also is no predefined model for the data, every document can be stored as it is.
The downside of this approach is lack of query functionality, as we can only search through the keys of the entries but not based on the value data.
In the future, another approach or an additional way to to index the data might be required.

To let the data survive system restarts, Minio needs to use a persistent volume for the data storage. A default configuration for this is provided in the Helm charts.

### Transaction handling

There currently is no transaction management in the IRS.

### Session handling

There is no session handling in the IRS, access is solely based on bearer tokens, the API is stateless.

### Communication and integration

All interfaces to other systems are using RESTful calls over HTTP(S). Where central authentication is required, a common OAuth2 provider is used.

For outgoing calls, the Spring RestTemplate mechanism is used and separate RestTemplates are created for the different ways of authentication.

For incoming calls, we utilize the Spring REST Controller mechanism, annotating the interfaces accordingly and also documenting the endpoints using OpenAPI annotations.

### Exception and error handling

There are two types of potential errors in the IRS:

#### Technical errors

Technical errors occur when there is a problem with the application itself, its configuration or directly connected infrastructure, e.g. the Minio persistence. Usually, the application cannot solve these problems by itself and requires some external support (manual work or automated recovery mechanisms, e.g. Kubernetes liveness probes).

These errors are printed mainly to the application log and are relevant for the healthchecks.

#### Functional errors

Functional errors occur when there is a problem with the data that is being processed or external systems are unavailable and data cannot be sent / fetched as required for the process. While the system might not be able to provide the required function at that moment, it may work with a different dataset or as soon as the external systems recover.

These errors are reported in the Job response and do not directly affect application health.

#### Rules for exception handling

##### Throw or log, don't do both

When catching an exception, either log the exception and handle the problem or rethrow it, so it can be handled at a higher level of the code. By doing both, an exception might be written to the log multiple times, which can be confusing.

##### Write own base exceptions for (internal) interfaces

By defining a common (checked) base exception for an interface, the caller is forced to handle potential errors, but can keep the logic simple. On the other hand, you still have the possibility to derive various, meaningful exceptions for different error cases, which can then be thrown via the API.

Of course, when using only RuntimeExceptions, this is not necessary - but those can be overlooked quite easily, so be careful there.

##### Central fallback exception handler

There will always be some exception that cannot be handled inside of the code correctly - or it may just have been unforeseen. A central fallback exception handler is required so all problems are visible in the log and the API always returns meaningful responses. In some cases, this is as simple as a HTTP 500.

##### Dont expose too much exception details over API

It’s good to inform the user, why their request did not work, but only if they can do something about it (HTTP 4xx). So in case of application problems, you should not expose details of the problem to the caller. This way, we avoid opening potential attack vectors.

### Parallelization and threading

The heart of the IRS is the parallel execution of planned jobs. As almost each job requires multiple calls to various endpoints, those are done in parallel as well to reduce the total execution time for each job.

Tasks execution is orchestrated by the JobOrchestrator class. It utilizes a central ExecutorService, which manages the number of threads and schedules new Task as they come in.

### Plausibility checks and validation

Data validation happens at two points:

* IRS API: the data sent by the client is validated to match the model defined in the IRS. If the validation fails, the IRS sends a HTTP 400 response and indicates the problem to the caller.
* Submodel payload: each time a submodel payload is requested from via EDC, the data is validated against the model defined in the SemanticHub for the matching aspect type.
* EDC Contract Offer Policy: each time IRS consumes data over the EDC, the policies of the offered contract will be validated. IDs of so-called "Rahmenverträgen" or Framework-Agreements can be added to the IRS Policy Store to be accepted by the IRS. If a Contract Offer does not match any of the IDs store in Policy Store, the contract offer will be declined and no data will be consumed.

### Policy Store

The IRS gives its users the ability to manage, create and delete complex policies containing permissions and constraints in order to obtain the most precise control over access and use of data received from the edc provider. Policies stored in Policy Store will serve as input with allowed restriction and will be checked against every item from EDC Catalog.

The structure of a Policy that can be stored in storage can be easily viewed by using Policy Store endpoints in the published API documentation. Each policy may contain more than one permission, which in turn consists of constraints linked together by AND or OR relationships. This model provides full flexibility and control over stored access and use policies.

### Digital Twin / EDC requirements

In order to work with the decentral network approach, IRS requires the Digital Twin to contain a `"subprotocolBody"` in each of the submodelDescriptor endpoints. This `"subprotocolBody"` has to contain the `"id"` of the EDC asset, as well as the `"dspEndpoint"` of the EDC, separated by a semicolon (e.g. `"subprotocolBody": "id=123;dspEndpoint=http://edc.control.plane/api/v1/dsp"`).

The `"dspEndpoint"` is used to request the EDC catalog of the dataprovider and the `"id"` to filter for the exact asset inside this catalog.

If the `"dspEndpoint"` is not present, every available EDC endpoint in DiscoveryService will be queried until a asset with the `"id"` can be found.

### Caching

The IRS caches data provided externally to avoid unnecessary requests and reduce execution time.

Caching is implemented for the following services:

#### BPDM

Whenever a BPN is resolved via BPDM, the partner name is cached on IRS side, as this data does not change.

#### Semantics Hub

Whenever a semantic model schema is requested from the Semantic Hub, it is stored locally until the cache is evicted (configurable). The IRS can preload configured schema models on startup to reduce on demand call times.

Additionally, models can be deployed with the system as a backup to the real Semantic Hub service.

## Development concepts

### Build, test, deploy

The IRS is built using Maven and utilizes all the standard concepts of it. Test execution is part of the build process and a minimum test coverage of 80% is enforced.

The project setup contains a multi-module Maven build. Commonly used classes (like the IRS data model) should be extracted into a separate submodule and reused across the project. However, this is not a "one-size-fits-all" solution. New submodules should be created with care and require a review by the team.

The Maven build alone only leads up to the JAR artifact of the IRS. Do create Docker images, the Docker build feature is used. This copies all resources into a builder image, builds the software and creates a final Docker image at the end that can then be deployed.

Although the Docker image can be deployed in various ways, the standard solution are the provided Helm charts, which describe the required components as well.

### Code generation

There are two methods of code generation in the IRS:

#### Lombok

The Lombok library is heavily used to generate boilerplate code (like Constructors, Getters, Setters, Builders...).
This way, code can be written faster and this boilerplate code is excluded from test coverage, which keeps the test base lean.

#### Swagger / OpenAPI

The API uses OpenAPI annotations to describe the endpoints with all necessary information. The annotations are then used to automatically generate the OpenAPI specification file, which can be viewed in the Swagger UI that is deployed with the application.

The generated OpenAPI specification file is automatically compared to a fixed, stored version of it to avoid unwanted changes of the API.

### Migration

There currently is no data migration mechanism for the IRS.
In case the model of the persisted data (Jobs) changes, data is dropped and Jobs will need to be recreated.

### Configurability

The IRS utilizes the configuration mechanism provided by Spring Boot. Configuration properties can be defined in the file `src/main/resources/application.yml`

For local testing purposes, there is an additional configuration file called `application-local.yml`. Values can be overriden there to support the local dev environment.

Other profiles should be avoided. Instead, the configuration can be overwritten using Spring’s external configuration mechanism (see [https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/boot-features-external-config.html](https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/boot-features-external-config.html).) The operator must have total control over the configuration of the IRS.

## Operational concepts

### Administration

#### Configuration

The IRS can be configured using two mechanisms:

##### application.yml

If you build the IRS yourself, you can modify the application.yml config that is shipped with the IRS. This file contains all possible config entries for the application.
Once the Docker image has been built, these values can only be overwritten using the Spring external config mechanism (see [https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/boot-features-external-config.html](https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/boot-features-external-config.html)), e.g. by mounting a config file in the right path or using environment variables.

##### Helm Chart

The most relevant config properties are exposed as environment variables and must be set in the Helm chart so the application can run at all. Check the IRS Helm chart in Git for all available variables.

### Disaster-Recovery

#### Ephemeral components

All components in the IRS deployment not listed in the persistent components section below are considered ephemeral and are easily replaced in a disaster scenario.
All deployment components are described using Helm charts, which can be used to restore the deployment with the Docker images.
Should the Docker images go missing, they can be restored by executing the build pipelines for the corresponding version tag of the component.

#### Persistent components

These components utilize data persistence, which needs to be backed up separately by the operator.

* **Minio persistent volume**: Contains the stored Job information. In case of data loss, Jobs can be started again to retrieve the data from the network.
* **Prometheus persistent volume**: Contains the monitoring data of the IRS. In case of data loss, no analysis can be done for past timeframes.
* **Vault secrets**: In case of data loss, the credentials stored in the Vault need to be recreated manually. See the deployment view for an overview.

### Scaling

If the number of consumers raises, the IRS can be scaled up by using more resources for the Deployment Pod. Those resources can be used to utilize more parallel threads to handle Job execution.

### Clustering

The IRS can run in clustered mode, as each running job is only present in one pod at a time.
Note: as soon as a resume feature is implemented, this needs to be addressed here.

### Logging

Logs are being written directly to stdout and are picked up by the cluster management.

### Monitoring

The application can be monitored using Prometheus and Grafana. Both systems are defined in the Helm charts with a default setup.
A number of Grafana dashboards are deployed automatically, to display data about:

* Pod / JVM resources
* API metrics
* Functional information about IRS Jobs

## Quality requirements

The quality scenarios in this section depict the fundamental quality goals as well as other required quality properties. They allow the evaluation of decision alternatives.

* **Quality attribute**: A characteristic of software, or a generic term applying to quality factors, quality subfactors, or metric values.
* **Quality factor**: A management-oriented attribute of software that contributes to its quality.
* **Quality subfactor**: A decomposition of a quality factor or quality subfactor to its technical components.
* **Metric value**: A metric output or an element that is from the range of a metric.
* **Software quality metric**: A function whose inputs are software data and whose output is a single numerical value that can be interpreted as the degree to which software possesses a given attribute that affects its quality.

**Source**: IEEE standard 1061 "Standard for a Software Quality Metrics Methodology"

## Quality Scenarios

| ID | Scenario | Implementation |
| --- | --- | --- |
| DS01 | Any data consumption via the IRS checks if data offers are done according to "Use Case Rahmenbedingungen". IRS provides a configuration capability for the "Rahmenbedingungs ID" to be used in a given scenario / deployment. | "PolicyCheckerService is used to check defined Usage Policies according to the "Rahmenbedingungsbedingungen" which is obligatory for data consumption. |

## Glossary

| Term | Description |
| --- | --- |
| AAS | Asset Administration Shell (Industry 4.0) |
| Aspect servers (submodel endpoints) | Companies participating in the interorganizational data exchange provides their data over aspect servers. The so called "submodel-descriptors" in the AAS shells are pointing to these AspectServers which provide the data-assets of the participating these companies in Catena-X. |
| BoM | Bill of Materials |
| Edge | see Traversal Aspect |
| IRS | Item Relationship Service |
| Item Graph | The result returned via the IRS. This corresponds to a tree structure in which each node represents a part of a virtual asset. |
| MTPDC | Formerly known Service Name: Multi Tier Parts Data Chain |
| PRS | Formerly known Service Name: Parts Relationship Service |
| Traversal Aspect | aka Edge: Aspect which the IRS uses for traversal through the data chain. Identified by a parent-child or a child-parent relationship. Samples: SingleLevelBomAsPlanned, SingleLevelBomAsBuilt and SingleLevelUsageAsBuilt |
| Verifiable Credential (VC) | For more information see: [Verifiable Credentials](https://github.com/eclipse-tractusx/ssi-docu/tree/main/docs/architecture/cx-3-2/3.%20Verifiable%20Credentials) |
| Eclipse Dataspace Connector (EDC) | For more information see: [https://github.com/eclipse-tractusx/tractusx-edc](https://github.com/eclipse-tractusx/tractusx-edc) |
| Managed Identity Wallet (MIW) | For more information see: [https://github.com/eclipse-tractusx/managed-identity-wallet](https://github.com/eclipse-tractusx/managed-identity-wallet) |
| Self-Sovereign Identity (SSI) | For more information see: [https://github.com/eclipse-tractusx/ssi-docu/tree/main/docs/architecture/cx-3-2](https://github.com/eclipse-tractusx/ssi-docu/tree/main/docs/architecture/cx-3-2) |
| PolicyStore | The Policy Store is an IRS component which provides an interface for getting, adding and deleting accepted IRS EDC policies. These policies will be used to validate EDC contract offers. EDC contract offers must include permissions that are equal to permission defined by an admin user in order to be allowed to use in IRS use cases. For more information see: [https://github.com/eclipse-tractusx/ssi-docu/blob/main/docs/architecture/cx-3-2/edc/policy.definitions.md#0-introduction](https://github.com/eclipse-tractusx/ssi-docu/blob/main/docs/architecture/cx-3-2/edc/policy.definitions.md#0-introduction) |
