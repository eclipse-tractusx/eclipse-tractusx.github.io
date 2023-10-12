---
id: Specification Quality Kit
title: Specification
description: 'Quality Kit'
sidebar_position: 4
---

![Quality kit banner](@site/static/img/QualityKitIcon.png)

### Quality KIT

## Quality Data Offers at EDC

For the process described in the KIT Quality, data exchange between the participating partner companies is necessarily to be done for large vehicle and product populations. The data exchange therefore tshould be done as a file download via EDC according to the following specifications.

### **Asset File type**

It is recommended to create and transfer the files in the types csv, parquet, json or xls

### **Asset Transfers**

File transfer can be done via EDC S3 plane or alternatively REST http.

### **Asset consumption**

**File** flattening **rules**: The data provided in the asset  is build from 4 to 6 structures. To assure a secure and smooth exchange flatting rules for the file (csv / xls / Parquet / json) must be applied. This includes checks for format and possible values for each column and will be part of next version regulations. If the rules are not applied correctly the mapping of content will not be possible without manual handling effort.

## Sample Data

Standard version from: 09.2023

In the following, example data for the standardized data models are provided as download in zip format. The sample data is generated according the current standards. It contains a virtual fleet of 50.000 vehicles where two quality issues are implemented.

- Production failure of product "zehn" at Tier 1
- Specification failure

### Quality Task Sample Data

Github Link to semantic data model: [CX-00036 Quality Task](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230704-io.catenax.quality_task.zip" download>20230704-io.catenax.quality_task.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_qualitytask_100_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_qualitytask_100_testdata_100_parquet

---

### Quality Task Attachment Sample Data

Github Link to semantic data model: [CX-00092 Quality Task Attachment](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task_attachment)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230718-io.catenax.quality_task_attachment.zip" download>20230718-io.catenax.quality_task_attachment.zip</a>

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_qualitytaskattachment_100_testdata_100_zip

---

### Fleet Vehicles Sample Data

Github Link to semantic data models:

[CX-00037 Vehicle Product Description](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.vehicle.product_description)

[CX-00091 Fleet Vehicles](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.vehicles)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230707-io.catenax.fleet.vehicles.zip" download>20230707-io.catenax.fleet.vehicles.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_fleetvehicles_100_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_fleetvehicles_100_testdata_100_parquet

---

### Fleet Diagnostic Sample Data

Github Link to semantic data model: [CX-00038 Fleet Diagnostic Data](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.diagnostic_data)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230707-io.catenax.fleet.diagnostic_data.zip" download>20230707-io.catenax.fleet.diagnostic_data.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_fleetdiagnostic_100_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_fleetdiagnostic_100_testdata_100_parquet

---

### Fleet Claim Sample Data

Github Link to semantic data model: [CX-00039 Fleet Claim Data](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.claim_data)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230707-io.catenax.fleet.claim_data.zip" download>20230707-io.catenax.fleet.claim_data.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_fleetclaim_100_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_fleetclaim_100_testdata_100_parquet

---

### Manufactured Parts Quality Information Sample Data

Github Link to semantic data model: [CX-00041 Manufactured Parts Quality Information](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.manufactured_parts_quality_information)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230707-io.catenax.manufactured_parts_quality_information.zip" download>20230707-io.catenax.manufactured_parts_quality_information.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_manufacturingqualityinformation_100_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_manufacturingqualityinformation_100_testdata_100_parquet

---

### Parts Analyses Sample Data

Github Link to semantic data model: [CX-00040 Parts Analyses](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.parts_analyses)

Filedownload: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/raw/main/quality-kit/20230704-io.catenax.parts_analyses.zip" download>20230704-io.catenax.parts_analyses.zip</a>

As **data provider** please add the **JSON file** from folder tesdata_CX32
as EDC asset id to **EDC REST data plane**:
CX_release32_partsanalyses_200_testdata_100_json

As **data provider** please add the **PARQUET file** from folder tesdata_CX32
as EDC asset id to **EDC S3 data plane**:
CX_release32_partsanalyses_200_testdata_100_parquet
