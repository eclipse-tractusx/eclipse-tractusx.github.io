
## Application Programming Interfaces (API)

### AAS Creator Service REST API

The AAS Creator Service provides a central REST interface responsible for transforming production data from the ERP system into standardized Asset Administration Shell (AAS) files. This service forms the foundation for the digital representation of manufacturing processes within the digital twin concept.

#### Functionality and Technical Details

The service receives structured JSON data from the ERP system containing two essential submodels: the CommonParameter submodel with general production information and the Bill_of_Process submodel with detailed manufacturing process data. After successful processing, the service generates an AAS file in .aasx format and returns metadata such as filename, AAS-ID, AAS-ID-Short, and the Base64-encoded file content.

#### Role in the Overall Concept

The AAS Creator Service functions as a central transformation layer between the ERP system and the AAS-based data architecture. It enables work orders with their associated manufacturing processes to be represented as digital twins. The created AAS files serve as the foundation for downstream processes such as data aggregation, PCF calculation, and integration with SiGreen. The service ensures that all production data is available in a standardized, machine-readable format that guarantees interoperability between different systems.

### AAS Server (AssetFox) REST API

The AAS Server forms the central repository for all Asset Administration Shells in the system and provides comprehensive REST API endpoints for managing, storing, and retrieving AAS data. It is based on the Eclipse BaSyx implementation and offers a complete implementation of the AAS specification.

#### Functionality and Technical Details

The AAS Server manages various submodel templates, including Factory-X Traceability for traceability, Time Series for time series data, and Carbon Footprint for CO₂ footprint data. Server administration as well as registration of new submodel templates is performed entirely via the REST API. Authorization follows a multi-level security concept: First, the client authenticates using Client Secret and Credentials, then individual REST API calls are authorized with a valid Bearer Token. The server also supports authorization at the submodel level, allowing granular access rights to be defined for different components.

#### Role in the Overall Concept

The AAS Server functions as the central data hub for all digital twins in the system. It not only stores the initial production data from the ERP system but is continuously enriched by the Aggregation App with time series data and energy consumption values. The PCF Creator App supplements the AAS data with calculated CO₂ footprints. Through this centralized data storage, all components can access consistent and up-to-date information. The server enables tracking the entire lifecycle of a production order from planning through execution to final PCF calculation.

#### Key Functionalities

- Provision of submodel templates (Factory-X Traceability, Time Series, Carbon Footprint)
- Storage of time series data from production processes
- Management of references between different submodels
- Versioning and historization of AAS data
- Event-based notifications for data changes
- M-X Port Leo implementation (planned) for enhanced security and data portability

### Aggregation App REST API

The Aggregation App is a specialized application that consolidates data from various sources, preprocesses it, and stores it in structured form on the AAS Server. It forms the bridge between raw data from production and the aggregated datasets required for PCF calculation.

#### Functionality and Technical Details

The Aggregation App has read access to the IIH and the AAS Server. It continuously retrieves machine states and active power data from the IIH and matches them with the process parameters stored in the AAS Server. Based on the Machine ID or IIH Asset ID as well as the Total Active Power ID, the app identifies the relevant data points. The app writes time series data with a configurable resolution of 1 to 15 minutes to the AAS, with each data point containing a timestamp in UTC format and the active power in kW. Additionally, the app calculates the total energy consumption in kWh for each process.

#### Role in the Overall Concept

The Aggregation App is responsible for enriching the initial AAS data with actual production data. It populates the initially empty references for time series data and energy consumption data that were created by the ERP system. When a production process is completed, the app updates the process status to "Finished" (or "Aborted" in case of error) and enters the actual start and end times. After all processes of a work order are completed, the app sets the overall status to "Finished" and thereby triggers the PCF Creator App to calculate the CO₂ footprint.

#### System Requirements

- Runs on a Siemens Industrial Edge Device (IED)
- Requires an IIH (Industrial Information Hub) installation

#### Documentation

For detailed information on configuration, deployment, and operation, please refer to the dedicated Aggregation App documentation.

### PCF Creator App REST API

The PCF Creator App is the core component of CO₂ footprint calculation in the system. It combines production data with emission factors to calculate precise PCF values for each manufacturing process.

#### Functionality and Technical Details

The PCF Creator App is triggered either by a "BOP finished event" from the Aggregation App or by a cron job. It accesses the AAS Server in read mode to retrieve the aggregated production data, and Green Grid Compass to obtain the corresponding CO₂ emission factors for the production period. The app supports various temporal resolutions for emission factors (hourly, monthly, yearly) to enable the most accurate calculation possible. For each Bill of Process (BOP) element, the app creates a separate PCF entry.

#### Role in the Overall Concept

The PCF Creator App transforms production data into sustainability information. It not only calculates the PCF value but also stores it in two locations: On one hand, the value is transmitted to the SiGreen backend, where it is used for supply chain transparency and sustainability reporting. On the other hand, the PCF value is stored in the AAS Server in the standardized Carbon Footprint Template format and linked with a reference to the respective BOP element. This enables complete traceability and integration of sustainability data into the digital twin.

#### Documentation

For detailed information on configuration, deployment, and operation, please refer to the dedicated PCF Creator App documentation.

### EnFlex Optimizer REST API

The EnFlex Optimizer is an extension of the base system that was implemented as part of subproject 2.09 "Flexible Electricity Usage". It optimizes production start times based on variable electricity prices and grid conditions to reduce energy costs and support grid stability.

#### Functionality and Technical Details

The EnFlex Optimizer communicates bidirectionally with the ERP system via a REST API. It receives information about planned production orders, reference load profiles of machines and programs (in 15-minute resolution), day-ahead electricity prices from the energy market, grid charges from the grid operator, and optionally flexible grid charges. Additionally, the optimizer considers process flexibility parameters from the ERP system as well as technical limits of grid access as active power in kW. Based on these input data, the optimizer calculates optimized production start times and sends them back to the ERP system as optimized schedules.

### SiGreen REST API (Production Data & Procurement)

SiGreen is a cloud-based platform for Product Carbon Footprint Management that serves as the final PCF management tool in the system. It provides two main API categories: Production Data API for transmitting production results and consumption data, and Procurement API for managing secondary data of components.

#### Functionality and Technical Details

**Production Data API:**
The SiGreen Production Data API provides two main endpoints: POST /productionResults for transmitting production result data and POST /consumptionData for consumption data. The API expects structured JSON data containing detailed information about production processes, energy consumption, material consumption, and calculated PCF values. Authentication is performed via an Authorization header with Bearer Token. API version 0.0.1 runs on a Production Data API Server.

**Procurement API:**
The Procurement API offers two central endpoints: PUT /components/:id/secondaryData/:secondaryDataId for updating existing secondary data and POST /components/:id/secondaryData for creating new secondary data. Both endpoints work with UUID-based identifiers for components and secondary data. The BaseURL for the UAT environment is https://app-uat.sigeen-playground.siemens.cloud/.

#### Role in the Overall Concept

SiGreen functions as the central platform for managing and exchanging PCF data across the entire supply chain. The PCF Creator App transmits the calculated CO₂ footprints to SiGreen, where they are linked with product master data and made accessible to various stakeholders (customers, suppliers, auditors). SiGreen also enables receiving PCF data from suppliers and integrating it into internal calculations.

The Procurement API extends the system with the capability to manage PCF data from purchased components and materials. This is essential for complete Scope 3 reporting, as emissions from the supply chain often constitute a significant portion of the total PCF. Through this API, suppliers can provide their PCF data, which then flows into the overall calculation. The ERP system can use this data to make informed procurement decisions and evaluate suppliers based on their CO₂ performance.

### Green Grid Compass REST API

Green Grid Compass is a web service that provides hourly updated and methodologically validated CO₂ emission factors for the German electricity mix. The API is central to precise PCF calculation.

#### Functionality and Technical Details

The Green Grid Compass API offers four different endpoints for various temporal aggregations: /summary/hourly for hourly data, /summary/daily for daily averages, /summary/monthly for monthly values, and /summary/yearly for annual averages. The BaseURL is https://eco2grid.com/green-grid-compass/co2intensity/co2. All endpoints support parameters such as zone_code (e.g., DE_LU for Germany/Luxembourg), start and end for the time period, and limit for the number of results. Authentication is performed via an API key parameter.

#### Role in the Overall Concept

Green Grid Compass provides the scientifically validated emission factors that are essential for accurate PCF calculation. The PCF Creator App uses this data to convert energy consumption from production into CO₂ emissions. The availability of different temporal resolutions allows the calculation to be adapted to the accuracy of available production data. For long-term production processes, monthly values can be used, while hourly values are utilized for precise calculations of short processes. The API also provides additional information such as the share of renewable energy, fossil fuels, and nuclear energy, enabling further analyses.

#### Energy-Charts API

Energy-Charts is another service that provides electricity market data and grid information. The ERP system uses this API for supplementary energy market data.

#### Functionality and Technical Details

The Energy-Charts API provides access to comprehensive data on electricity generation, electricity consumption, and market prices. It enables queries for day-ahead data as well as historical analyses. The exact technical implementation is represented in the diagram through the connection between the ERP system and Energy-Charts.

#### Role in the Overall Concept

Energy-Charts complements the data from ENTSO-E and Green Grid Compass with additional market information. The ERP system can use this data to make informed decisions about production planning and energy procurement. The API supports energy price forecasting and enables the identification of trends in the energy market to be incorporated into production planning.