---
id: software-operation-view
title: Software Operation View
description: Quality KIT
sidebar_position: 4
---

![Quality kit banner](@site/static/img/kits\data-driven-quality-management\ddqm-kit-logo.svg)

## Quality Data Offers at EDC

A catenaXQualityTaskId is an id that bundles all data models for one Catena-X Qualtiy Task.
Catena-X file-based data transfer is not commonly used - therefore this example shows, how to register properly such a data offer.

Most important property is catenaXQualityTaskId - all data offers that are connected to one QualityTask should reference the same catenaXQualityTaskId.
To do so, a Data Provider should use following naming convention for his data offers: set the "@id" identifier to `<catenaXQualityTaskId>__<SemanticModel>__<model_version>.<file extension>` - separator are two underscores: `__`.

A Data Consumer can now query the data catalog of the Data Provider by filtering for all ids starting with a specific catenaXQualityTaskId.

An alternative to that, is to query for the mandatory catalog prperty "dct:isPartOf" which should also name the related catenaXQualityTaskId.

See the following example of a quality data offer in the EDC catalog.
The example uses the naming convention for the "@id" identifier and also "dct:isPartOf" -> keep in mind that this example is only an illustration. The correct catalog entry must be adapted to the EDC version in use and must also contain proper "dcat:distribution" settings to communicate over S3 transfer protocol:

```json
{
 "@context": {
  "cx-policy": "https://w3id.org/catenax/policy/",
  "dcat": "http://www.w3.org/ns/dcat#",
  "dct": "http://purl.org/dc/terms/",
  "odrl": "http://www.w3.org/ns/odrl/2/"
 },
 "dcat:dataset": [
  {
   "@id": "430f56d3-1234-1234-1234-abc123456789__io.catenax_fleet.claim_data__3.0.0.parquet",
   "@type": "dcat:Dataset",
   "odrl:hasPolicy": {
    "@id": "<your policy id>",
    "@type": "odrl:Offer",
    "odrl:permission": {
     "odrl:action": {
      "@id": "odrl:use"
     },
     "odrl:constraint": {
      "odrl:and": [
       {
        "odrl:leftOperand": {
         "@id": "cx-policy:FrameworkAgreement"
        },
        "odrl:operator": {
         "@id": "odrl:eq"
        },
        "odrl:rightOperand": "DataExchangeGovernance:1.0"
       },
       {
        "odrl:leftOperand": {
         "@id": "cx-policy:UsagePurpose"
        },
        "odrl:operator": {
         "@id": "odrl:eq"
        },
        "odrl:rightOperand": "cx.quality.base:1"
       },
       {
        "odrl:leftOperand": {
         "@id": "cx-policy:ContractReference"
        },
        "odrl:operator": {
         "@id": "odrl:eq"
        },
        "odrl:rightOperand": "<A contract reference between your company and the cx partner company.>"
       }
      ]
     }
    }
   },
   "dcat:distribution": [],
   "dct:description": "Test asset for Catena-X KIT Quality",
   "dct:conformsTo": {
    "@id": "urn:samm:io.catenax.fleet.claim_data:3.0.0"
   },
   "type": "AmazonS3",
   "dcat:qualifiedRelation": {
    "dct:isPartOf": {
     "@id": "430f56d3-1234-1234-1234-abc123456789"
    }
   },
   "dct:format": "application/octet-stream;type=parquet-snappy",
   "dct:type": {
    "@id": "https://w3id.org/catenax/taxonomy#QualityAsset"
   }
  }
 ]
}
```

### Documentation of semantic data models

[Semantic data models of release 24.09](./resources/cx24-09-jupiter-qualitymanagement-semanticmodels.xlsx)
[Semantic data models of release 25.09](./resources/cx25-09-saturn-qualitymanagement-semanticmodels.xlsx)

The above excel file shows the structure of the updated data models. The program that generates this documentation was imporved - to better identify the changes the documentation of the semantic data models from release 24.09. is also linked.

To adjust for example custom-code from backend-exporter logic, you can use this mapping file: [Mapping file 24.09 -> 25.09](./resources/cx24-cx25-mapping.xlsx).
