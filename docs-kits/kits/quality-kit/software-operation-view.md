---
id: Operation View Quality Kit
title: Operation View
description: 'Quality Kit'
sidebar_position: 4
---

![Quality kit banner](@site/static/img/kits\data-driven-quality-management\data-driven-quality-management-kit-logo.drawio.svg)

## Quality Data Offers at EDC[​](https://eclipse-tractusx.github.io/docs-kits/kits/Quality-Kit/Software%20Development%20View/Specification%20Quality%20Kit#quality-data-offers-at-edc)

When a Data Consumer calls the Catalog of a Data Provider, the Data Provider must signal in each Data Offer what exactly a Consumer could negotiate for. Data Offers in the Catalog are sorted by dcat:Datasets which are registered in the EDC- Management API as edc:Asset. Each Asset has private and public properties. The public properties are shown in the catalog and give hints to the Data Consumer what API and data they may expect. There are some properties that are mandatory for the entire Catena-X network and some that are mandatory only in specific Business Scenarios (like Quality).

The dataAddress object's structure is determined by the dataplane implementation as it configures the details of the data transfer. They are not visible via the catalog.

The following suggestion is a non-standardized draft how Assets (and thus by proxy, dcat:Datasets) should be registered in the Quality Use-Case.

{  
 "@context": {  
 "cx-taxo": "[https://w3id.org/catenax/taxonomy\#](https://w3id.org/catenax/taxonomy)",  
 "cx-common": "[https://w3id.org/catenax/ontology/common\#](https://w3id.org/catenax/ontology/common)",  
 "dct": "<https://purl.org/dc/terms/>",  
 "dcat": "[http://www.w3.org/ns/dcat\#](http://www.w3.org/ns/dcat)",  
 "edc": "<https://w3id.org/edc/v0.0.1/ns/>"  
 },  
 "@id": "someId",  
 "@type": "edc:Asset",  
 "edc:properties": {  
 "dct:type": {  
 "@id": "cx-taxo:QualityAsset"  
 },  
 "cx-common:version": "1.0",  
 "dct:language": {  
 "@id": "<https://w3id.org/idsa/code/EN>"  
 },  
 "dcat:qualifiedRelation": {  
 "dct:isPartOf": {  
 "@id": "f7574ad6-95ee-46e2-8a45-6fa1782ba426"  
 }  
 },  
 "dct:conformsTo": {  
 "@id": "urn:samm:io.catenax.vehicle.product_description:3.0.0\#ProductDescription"  
 },  
 "dct:description": "TBD",  
 "dct:format": "application/octet-stream;type=parquet-snappy",  
 "edc:type": "AmazonS3"  
 },  
 "edc:dataAddress": {  
 "@type": "edc:DataAddress",  
 "edc:type": "AmazonS3",  
 "edc:region": "eu-west-1",  
 "edc:bucketName": "int-xcod-quality-aspect-models-eu-west-1",  
 "edc:keyName": "myCompany/myTag/QualityTask.parquet",  
 "edc:accessKeyId": "…",  
 "edc:secretAccessKey": "…"  
 }  
}

### S3 Data Address[​](https://eclipse-tractusx.github.io/docs-kits/kits/Quality-Kit/Software%20Development%20View/Specification%20Quality%20Kit#s3-data-address)

This section is not use-case specific but since the EDC's AmazonS3 dataplane is basically undocumented, here is an explanation:

| **Property**        | **Value**                  | **Description**                                                                                                                                                                                                                    |
|---------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Property**        | **Value**                  | **Description**                                                                                                                                                                                                                    |
| edc:type            | "AmazonS3"                 | This shows which data source the Data Plane will query. It also determines what other content the dataAddress object must hold.                                                                                                    |
| edc:region          | "eu-west-1"                | This property represents the AWS-region where the source bucket is located.                                                                                                                                                        |
| edc:bucketName      | "provider-quality-bucket"  | This is the name of the source bucket that the data to-be-transferred resides in.                                                                                                                                                  |
| edc:keyName         | "path/through/provider/s3" | This is the path of the file that shall be offered to the dataspace.                                                                                                                                                               |
| edc:accessKeyId     | "\<keyId\>"                | Amazon S3 uses this property similarly to how oauth2 client credentials use the clientId. Note that this can also be set during deployment-time for the whole S3-dataplane. If it's set here, it will override the default config. |
| edc:secretAccessKey | "\<secretAccessKey\>"      | This secret is used similarly to a clientSecret in oauth2 client credentials.                                                                                                                                                      |

### Properties[​](https://eclipse-tractusx.github.io/docs-kits/kits/Quality-Kit/Software%20Development%20View/Specification%20Quality%20Kit#properties)

| **Property**                                                                                          | **Value**                                                        | **Optional** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                               |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <https://purl.org/dc/terms/type>                                                                      | {"@id": "cx-taxo:QualityAsset"}                                  |              | CX-0018 mandates the usage of the dct:type property to signal what kind of Asset a consumer can expect behind a dcat:Dataset. In the Quality Use-Case, this is identified as [https://w3id.org/catenax/taxonomy\#QualityAsset](https://w3id.org/catenax/taxonomy#QualityAsset). The expected payload this API serves is determined by the dcat:conformsTo property.                                                           |
| <https://purl.org/dc/terms/language>                                                                  | {"@id": "<https://w3id.org/idsa/code/EN>"}                       | x            | This property is QM-specific. As it points to an IRI, it must be embedded in a json-object with the @id key. The use of this is unclear.                                                                                                                                                                                                                                                                                      |
| <https://purl.org/dc/terms/format>                                                                    | "application/octet-stream;type=parquet-snappy"                   |              | This property is QM-specific. dct:format usually points to the correct IANA Media Type. As currently only parquet files are used, the type application/octet-stream with the added property type=parquet-snappy must be used. The syntax is expained [here](https://www.iana.org/assignments/media-types-parameters/media-types-parameters.xhtml). If in the future csv shall be supported, the value could also be text/csv. |
| <https://purl.org/dc/terms/description>                                                               | \<whatever\>                                                     | x            | This property is QM-specific. For human-readable content, rdfs:comment is the usual property but would introduce another namespace so the dct-native property is chosen here.                                                                                                                                                                                                                                                 |
| <https://purl.org/dc/terms/conformsTo>                                                                | {"@id":"\<urnOfTheCorrespondingAspectModel\>"}                   |              | This property is QM-specific. It holds the exact aspect-model-URN that defines the schema of the presented dataset including its version. The version in here refers to the data model's version, while the EDC-property cx-common:version defines the version of the underlying API serving the data.                                                                                                                        |
| [http://www.w3.org/ns/dcat\#qualifiedRelation](http://www.w3.org/ns/dcat#qualifiedRelation)           | {"dct:isPartOf": {"@id": "\<idOfTheCorrespondingQualityTask\>"}} |              | This property is QM-specific. All Asset types defined in this Kit must include this property as it links the data behind an asset with the correct QualityTask. Note that the id of the QualityTask must be used, not the id of the EDC-Asset shielding said QualityTask.                                                                                                                                                     |
| <https://w3id.org/edc/v0.0.1/ns/type>                                                                 | AmazonS3                                                         |              | This property signifies the EDC dataplane that the QM data will be transferred over. The expectation that this would be signaled via the dcat:DataSet-dcat:distribution property of the catalog currently isn't implemented in the EDC. Thus the data must be replicated here and is presented via the same property that the consumer-side transferprocesses API uses for this same signal.                                  |
| [https://w3id.org/catenax/ontology/common\#version](https://w3id.org/catenax/ontology/common#version) | "1.0"                                                            |              | CX-0018 recommends to use cx-common:version to signal the API's version. Here, the API's version is equivalent to the version of the CX-standard for the Quality domain. Creation is currently in progress as CX-0123 v1.0.0. In this EDC-property, only major and minor increments should be added.                                                                                                                          |
| <https://purl.org/dc/terms/date>)                                                                     | "JJJJ-CW-N"                                                      | \*           | This property identifies an update of an already shared catalogue asset. Day is mentioned as calender week day number, e.g. '1' means "monday"                                                                                                                                                                                                                                                                                |
