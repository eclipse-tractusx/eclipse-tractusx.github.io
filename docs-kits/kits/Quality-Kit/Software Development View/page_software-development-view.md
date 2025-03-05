---
id: Specification Quality Kit
title: Specification
description: 'Quality Kit'
sidebar_position: 4
---

![Quality kit banner](@site/static/img/kits\data-driven-quality-management\data-driven-quality-management-kit-logo.drawio.svg)

### Quality KIT

For the process described in the KIT Quality, data exchange between the participating partner companies is necessarily to be done for large vehicle and product populations. The data exchange therefore should be done as a file download via EDC according to the following specifications.

### **Asset File type**

It is recommended to create and transfer the files in the type parquet. Only attachments for the Quality task (Quality Task Attachment) should be created in ZIP format.

### **Asset Transfers via EDC**

File transfer is recommended to be done via EDC S3 plane, The transfer via EDC http data plane is not recommended due to the big data size.

### **Asset consumption**

**File** flattening **rules**: The data provided in the asset is built from 4 to 6 structures. To assure a secure and smooth exchange flatting rules for the file (csv / xls / Parquet / json) must be applied. This includes checks for format and possible values for each column and will be part of next version regulations. If the rules are not applied correctly the mapping of content will not be possible without manual handling effort.

## Sample Data

In the following, example data for the standardized data models are provided as download in zip format. The sample data is generated according the current standards. It contains a virtual fleet of 50.000 vehicles where two quality issues are implemented.

- Production failure of product "zehn" at Tier 1
- Specification failure

### Quality Task Sample Data

Github Link to semantic data model: [Quality Task](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_QualityTask_200_testdata.parquet" download>
CX25_03_QualityTask_200_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to the **EDC data plane.**

### Quality Task Attachment Sample Data

Github Link to semantic data model: [Quality Task Attachment](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.quality_task_attachment)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_QualityTaskAttachment_testdata.zip" download>
CX25_03_QualityTaskAttachment_testdata.zip</a>

As **data provider** please add the **ZIP file** as EDC asset to **EDC data plane**.

### Fleet Vehicles Sample Data

Github Link to semantic data models: [Fleet Vehicles](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.vehicles)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_FleetVehicles_200_testdata.parquet" download>
CX25_03_FleetVehicles_200_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to **EDC data plane**.

### Fleet Diagnostic Sample Data

Github Link to semantic data model: [Fleet Diagnostic Data](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.diagnostic_data)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_DiagnosticData_200_testdata.parquet" download>
CX25_03_DiagnosticData_200_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to **EDC data plane**.

### Fleet Claim Sample Data

Github Link to semantic data model: [Fleet Claim Data](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.fleet.claim_data)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_FleetClaim_200_testdata.parquet" download>
CX25_03_FleetClaim_200_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to **EDC data plane**.

### Manufactured Parts Quality Information Sample Data

Github Link to semantic data model: [Manufactured Parts Quality Information](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.manufactured_parts_quality_information)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_ManufacuredPartsQualityInformation_210_testdata.parquet" download>
CX25_03_ManufacuredPartsQualityInformation_210_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to **EDC data plane**.

### Parts Analyses Sample Data

Github Link to semantic data model: [Parts Analyses](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.parts_analyses)

File download: <a target="_blank" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io.largefiles/tree/main/quality-kit/CX25_03_PartsAnalyses_300_testdata.parquet" download>
CX25_03_PartsAnalyses_300_testdata.parquet</a>

As **data provider** please add the **PARQUET file** as EDC asset to **EDC data plane**.
