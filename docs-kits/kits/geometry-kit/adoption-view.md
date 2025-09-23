# Vision & Mission

## Vision

The aim of the **Geometry KIT** is to enable secure and sovereign exchange of engineering 3D information across the entire value chain and all n-tier levels in Catena-X. It focuses on making 3D assets—such as CAD models, simulation data, and their associated metadata from PLM and related systems—discoverable, accessible, and reusable for data-driven use cases without compromising data sovereignty.

The Kit provides a uniform, standards-based foundation for interoperability between Business Partners when sharing 3D information. It covers master data (Stammdaten), geometric and simulation data, as well as derived 2D artifacts like PDF technical drawings, ensuring that participants can build consistent, trusted 3D data chains throughout the lifecycle of products and components.

## Mission

The Geometry KIT bundles the necessary Catena-X standards, profiles, APIs, semantic models, and reference implementations to publish, discover, request, and consume 3D information in the dataspace. It provides clear guidance and tooling to map data from enterprise PLM/CAE systems into Catena-X-compliant representations and exchange large files efficiently and securely.

By adopting and aligning existing Catena-X standards (e.g., Digital Twins, Data Chain, and BinaryDataExchange) and complementing them where needed for 3D, the Geometry KIT enables rapid implementation of multiple use cases. Seamless interoperability with the Connector KIT and adjacent Kits is a priority to ensure end-to-end adoption across the ecosystem, including support for 3D master data, geometry and 2D PDF drawings.

---

# Customer Journey

With the Digital Twin Kit, all roles mentioned in the Operating Model Whitepaper are given the necessary tooling to format their data and APIs in a standardized manner.

---

# Business Value & Business Processes

In the product design and engineering phase, companies must collaborate closely with partners to co-engineer, plan, and industrialize products. 3D data is the core medium of that collaboration, yet exchange today is cumbersome, redundant, and error-prone. The Geometry KIT provides a consistent way to share and consume 3D information (CAD and derived 2D drawings) via Catena-X—reducing cycle times, avoiding duplicate data silos, and improving quality through standardized semantics, interfaces, and secure large-file transfer. At a high level, the initial focus areas are supplier updates to master and 3D data, and BTV-side processing and adoption of 3D data.

By leveraging Catena-X standards, participants can automate early collaboration processes, ensure up-to-date master and geometry data across partners, and integrate directly with enterprise PLM/CAE systems. This lowers onboarding effort, enables repeatable integrations, and accelerates time-to-value for 3D-centric use cases.

As context, the two highlighted scenarios fit a broader cross-company 3D engineering flow: one party authors and publishes updated master/geometry data, while another discovers, validates, and operationalizes it within PLM/CAE and downstream processes. This framing keeps the Kit applicable to many role constellations beyond a single supplier–BTV setup.


---

# Use Case

All of the following use cases rely on shared 3D data and cross-company collaboration. The Geometry KIT provides the common APIs, semantic models, and secure large-file exchange to enable them consistently across partners.

## DMU Analysis (Digital Mock-Up)

Analyze CAD data with semi-advanced techniques—such as measurements, clash detection, sectioning, and visual heatmaps — to verify that requirements are met across design, manufacturing, packaging, interfaces, accessibility, and serviceability. Supports early-stage maturity assessments and issue resolution for product designs.

### Key Capabilities

- Clash detection and gap measurement
- Assembly positioning and verification
- Flexible selection of coordinate systems (part or vehicle origin)
- Visualization of individual components and composite assemblies

### Relevant Information & Inputs

- 3D CAD Model reference
- Bounding boxes and spheres for spatial analysis
- Vehicle origin (global positioning) and component origin (local positioning)
- Translation, rotation, and constraints
- Embedded kinematic data


## Buildroom (Bauraum) Analysis

Validate space allocations against as-designed geometry to ensure that clearances, assembly and disassembly paths, and manufacturability constraints are respected. This use case helps confirm compliance with reserved installation space and upstream/downstream requirements throughout the engineering process.

### Key Capabilities

- Verification of space allocations and envelopes
- Assessment of clearances and manufacturability constraints
- Validation of assembly and disassembly paths
- Compliance checks for installation space and requirements

### Relevant Information & Inputs

- 3D CAD model reference
- Bounding-Boxes and Volume



## Level Of Detail: Model Detail 
Enable project managers and designers to choose the level of model detail shared with partners, adapting to different project phases and collaboration needs. This use case supports both the sharing of simplified models (such as blackbox or shrinkwrap representations that protect sensitive IP) and detailed models for collaborative design. It also allows searching for parts with similar geometry.

### Key Capabilities

- Selection of model detail for different project phases
- Adaptation of model detail for different exchange partners
- Sharing of blackbox or shrinkwrap models to protect IP
- Sharing of detailed models for collaborative engineering
- Search for parts with similar geometry

### Relevant Information & Inputs

- 3D CAD model reference
- Basic data (status)
- Level of Detail of Model

## Level of Detail: Geometric Quality
Enable project managers and designers to select the geometric quality of models shared with partners, tailored to different project phases and collaboration needs. This use case supports sharing models suitable for clash analysis, supplier development, simulation, and with specified BRep quality, ensuring that the right level of geometric fidelity is available for each scenario.

### Key Capabilities

- Selection of geometric quality for different project phases
- Adaptation of geometric quality for different exchange partners
- Provision of models for clash analysis, supplier development, and simulation
- Specification of BRep quality (e.g., chordal length, number of nodes)
- Support for varying geometric fidelity (e.g., NURBS, tessellation)

### Relevant Information & Inputs

- 3D CAD model reference
- Tolerancing (middle or maximum model tolerance)
- Basic data (status)
- Level of Detail 
- BRep level of detail parameters (e.g., chordal length, node count)

## Appearances
Enable designers and part responsibles to mock up parts in assemblies with accurate physical material appearances and photorealistic rendering. This use case supports the visualization of products in Catena-X or receiving systems, ensuring that material properties and surface treatments are correctly represented for design validation and communication.

### Key Capabilities
- Visualization of physical material appearance (e.g., steel, plastic)
- Accurate rendering of products in Catena-X or receiving systems
- Photorealistic rendering of design parts, including interiors
- Mapping between materials and rendering styles

### Relevant Information & Inputs
- Standard physical material libraries
- Appearance styles (color, surface treatments)
- Surface groups (collections of surfaces where appearance is applied)
- Mapping between materials and rendering definitions

---

# Additional Resources

## Associated CX-Standards

### Masterdata
https://github.com/catenax-eV/product-standardization-prod/blob/R25.12-CX-XXXX-Geometry/standards/CX-0154-MasterDataManagement/CX-0154-MasterDataManagement.md 

The Masterdata standard (CX-0154) is essential as it provides the structured, interoperable foundation for exchanging all relevant product master information—including references and metadata for 3D geometry—across the value chain. It ensures that 3D data is always contextualized with accurate, up-to-date master information, enabling seamless discovery, retrieval, and integration of 3D models in Catena-X. Our 3D standard builds on this by specifying how geometry and related data are referenced, described, and linked within the masterdata framework, ensuring consistency, traceability, and interoperability for all 3D-centric use cases. The 3D/geometry standard can be used in combination with master data, but it is not mandatory—3D data may also be exchanged independently where appropriate.

In particular, the masterdata semantic model provides dedicated properties to directly link and reference detailed 3D aspect models:

- `geometryData`: Collects all geometry-related information for a part or product, including:
	- `reference2DCADDrawing`: Link to the digital 2D CAD drawing (URN or resource).
	- `reference3DCADDrawing`: Link to the digital 3D CAD model (URN or resource).
	- `boundingBox`: The minimal 3D box that fully encloses the part geometry (length x width x height). //this might be in 3d data aspect model in the future
	- `boundingSphere`: Diameter of the smallest possible sphere that fully encloses the part geometry.
	- `calculatedWeight`: Mass of the part, typically in kilograms, calculated from 3D models.
	- `calculatedWeightTolerance`: Tolerance range of the calculated (theoretical) weight.
	- `centerOfGravity`: The calculated center of mass in a coordinate system.
	- `estimatedWeight`: Estimated mass of the part, typically in kilograms.
	- `estimatedWeightTolerance`: Tolerance range of the estimated weight.
	- `momentOfInertia`: Resistance of the part to rotational acceleration around an axis (kg·m²).
	- `surfaceArea`: Surface area in mm².
	- `volume`: Volume of the part in mm³.
	- `weightedWeight`: Actual measured weight of the part.
	- `weightedWeightTolerance`: Tolerance range of the measured or actual weighted weight.

### Digitaltwin KIT
The Digital Twin standard (CX-0002) is fundamental for Catena-X as it defines how assets are digitally represented, uniquely identified, and made discoverable across the network. It provides the architecture and APIs for registering, linking, and accessing digital twins and their aspects (such as 3D geometry, simulation, or master data) in a standardized, interoperable way. This enables seamless integration, traceability, and lifecycle management of 3D information and related data, forming the backbone for all data-driven collaboration and automation scenarios in the ecosystem. In the future, the 3D standard will enable Catena-X participants to communicate 3D data and information directly via digital twins, making 3D data exchange an integral part of the Catena-X dataspace.


### BinaryExchange
The BinaryExchange aspect model is essential for standardized, secure, and interoperable exchange of binary files—such as 3D models—across the Catena-X dataspace. It provides a common structure for describing, referencing, and accessing binary data, including metadata, content type, and access mechanisms via the Dataspace Protocol (DSP).

<!--> THIS IS CURRENTLY IN A DISCUSSION STATE AND STATES INFORMATION WORTH CONSIDERING IN THE DISCUSSION-->

#### Relevant discussion points for 3D data exchange

- The `SceneGraph` aspect model (our 3D semantic model) organizes 3D scene structure, nodes, and model assets using properties like `modelContainer`, `ModelAsset`, and specifically `dataURI` (for the file location) and `dataType` (for Media type).
- Instead of linking directly to raw 3D files, the `dataURI` property in `ModelAsset` should reference a `BinaryExchange` aspect instance.
- The `BinaryExchange` aspect provides properties such as `binaryFile` (with `resourceValue` for the file URI and `contentType` for the MIME type), as well as optional DSP access information (`dspInformation`, `controlPlaneUrl`, `dspAssetId`).
- This separation ensures that 3D data exchange is managed in a Catena-X-compliant way, supporting traceability, access control, and interoperability for large and sensitive engineering files.
- The BinaryExchange aspect can be reused for any binary file type, making it a foundational building block for scalable, secure, and flexible 3D data exchange in the ecosystem.

#### Binary vs. Encoded Data:
Most aspect models, including BinaryExchange, are designed to reference or link to binary files (e.g., via a URI), not to embed the raw file content directly in the aspect payload. However, in some cases—such as for small files, or when direct embedding is required—binary data may be included as a base64-encoded string.

Base64 Encoding:
Base64 encoding converts binary data into a text format, making it safe to include in JSON, XML, or other text-based payloads. This is useful when:

The file must be embedded directly in the aspect model (e.g., for transport in a single message).
The receiving system cannot handle binary payloads natively.
There are constraints on the transport protocol (e.g., HTTP APIs that expect text).
Interoperability and Clarity:
The encoding method (e.g., base64) must be clearly specified in the aspect model’s schema or metadata (such as the contentType property in BinaryExchange). This ensures that all participants know how to decode and use the file data, avoiding misinterpretation or data corruption.



### IndustryCorePartType
https://github.com/catenax-eV/product-standardization-prod/tree/R25.12-CX-XXXX-Geometry/standards/CX-0126-IndustryCorePartType

### IndustryCorePartInstance
https://github.com/catenax-eV/product-standardization-prod/tree/R25.12-CX-XXXX-Geometry/standards/CX-0127-IndustryCorePartInstance

### BOMAsDesigned

PartAsPlanned
PartSerialized
PartRole


Notification Service


---

## Other KITS

### DigitalTwin KIT
### Datachain KIT
### Industry Core KIT
### Tracability KIT




# Notice
