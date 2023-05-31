---
id: Specification Traceability Kit
title: Specification
description: 'Traceability Kit'
sidebar_position: 4
---

![Traceability kit banner](@site/static/img/doc-traceability_header-minified.png)

### Traceability Kit

<!--
Development View of the Kit.
-->

<!-- !Mandatory! -->
## API Specifications

### Unique ID Push Notifications

Unique ID Push notifications are a way for a manufacturer to notify a customer as soon as possible when a new digital twin for a part is available. The solution is based on notification assets in the EDC (which is the same approach that is used for quality alerts & investigations). The customer creates a notification asset in the EDC and the customer's suppliers send their notifications (with the Unique Id) to this notification asset. Details can be found in section [Unique ID Push Notifications](#unique-id-push-notifications-1).

All endpoints as well as the schema of the notification below are described in detail in the [Unique ID Push API documentation](Unique%20ID%20Push%20API/unique-id-push-notification-api).

### Traceability Data Offers at EDC

[Publish Traceability Data Offers at EDC](#publish-traceability-data-offers-at-edc)

<!-- Recommended -->
## Sample Data

In the following, example data for submodels are provided.

### As Planned Submodels Sample Data

#### Submodel "PartAsPlanned" for a Catalog Part

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.part_as_planned/1.0.1](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.part_as_planned/1.0.1)

```json
{
  "partTypeInformation": {
    "classification": "component",
    "manufacturerPartId": "123-0.740-3434-A",
    "nameAtManufacturer": "Mirror left"
  },
  "validityPeriod": {
    "validFrom": "2021-06-14T06:55:29.935Z",
    "validTo": "2022-06-14T06:55:29.935Z"
  },
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379"
}
```

#### Submodel "SingleLevelBomAsPlanned" for a Catalog Part

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_bom_as_planned/1.1.0](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_bom_as_planned/1.1.0)

```json
{
  "catenaXId": "urn:uuid:055c1128-0375-47c8-98de-7cf802c3241d",
  "childParts": [
    {
      "quantity": {
        "quantityNumber": 2.5,
        "measurementUnit": "unit:litre"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z",
      "childCatenaXId": "urn:uuid:5daB938E-Cafa-92B3-7ca1-9aD7885e9dC8"
    }
  ]
}
```

#### Submodel SingleLevelUsageAsPlanned for a Catalog Part

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_usage_as_planned/1.1.0](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.single_level_usage_as_planned/1.1.0)

```json
{
  "parentParts": [
    {
      "parentCatenaXId": "urn:uuid:c8B01D5A-ce0B-6Dd4-5bA0-A3e3fcE9cA93",
      "quantity": {
        "quantityNumber": 2.5,
        "measurementUnit": "unit:litre"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z"
    }
  ],
  "catenaXId": "urn:uuid:055c1128-0375-47c8-98de-7cf802c3241d"
}
```

#### Submodel "PartSiteInformationAsPlanned" for a component that is produced at the given site

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.part_site_information_as_planned/1.0.0](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.part_site_information_as_planned/1.0.0)

```json
{
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "sites": [
    {
      "catenaXSiteId": "BPNS1234567890ZZ",
      "functionValidUntil": "2025-11-21T11:14:30.825+01:00",
      "function": "production",
      "functionValidFrom": "2022-11-21T11:14:30.825+01:00"
    }
  ]
}
```

### As Built Submodels Sample Data

#### Submodel SerialPartTypization

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.serial_part_typization/1.1.1](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.serial_part_typization/1.1.1)

##### Submodel "SerialPartTypization" for a Vehicle

```json
{
  "localIdentifiers": [
    {
      "key": "manufacturerId",
      "value": "BPNL7588787849VQ"
    },
    {
      "key": "partInstanceId",
      "value": "OEM-A-F8LM95T92WJ9KNDD3HA5P"
    },
    {
      "key": "van",
      "value": "OEM-A-F8LM95T92WJ9KNDD3HA5P"
    }
  ],
  "manufacturingInformation": {
    "date": "2022-02-04T14:48:54",
    "country": "DEU"
  },
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "partTypeInformation": {
    "manufacturerPartID": "QX-39",
    "classification": "product",
    "nameAtManufacturer": "Vehicle Model A"
  }
}
```

##### Submodel "SerialPartTypization" for a Serialized Part (Non-Vehicle)

```json
{
  "localIdentifiers": [
    {
      "key": "manufacturerId",
      "value": "BPNL7588787849VQ"
    },
    {
      "key": "manufacturerPartId",
      "value": "95657362-83"
    },
    {
      "key": "partInstanceId",
      "value": "NO-574868639429552535768526"
    }
  ],
  "manufacturingInformation": {
    "date": "2022-02-04T14:48:54",
    "country": "DEU"
  },
  "catenaXId": "urn:uuid:d60b99b0-f269-42f5-94d0-64fe0946ed04",
  "partTypeInformation": {
    "manufacturerPartID": "95657362-83",
    "customerPartId": "798-515297795-A",
    "classification": "component",
    "nameAtManufacturer": "High Voltage Battery",
    "nameAtCustomer": "High Voltage Battery"
  }
}
```

#### Submodel AssemblyPartRelationship

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.assembly_part_relationship/1.1.1](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.assembly_part_relationship/1.1.1)

##### Submodel "AssemblyPartRelationship" for a Serialized Part

```json
{
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "childParts": [
    {
      "lifecycleContext": "AsBuilt",
      "quantity": {
        "quantityNumber": 1.0,
        "measurementUnit": "unit:piece"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z",
      "childCatenaXId": "urn:uuid:d60b99b0-f269-42f5-94d0-64fe0946ed04"
    }
  ]
}
```

##### Submodel "AssemblyPartRelationship" for a Batch

```json
{
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "childParts": [
    {
      "lifecycleContext": "AsBuilt",
      "quantity": {
        "quantityNumber": 25.0,
        "measurementUnit": "unit:kilogram"
      },
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z",
      "childCatenaXId": "urn:uuid:d60b99b0-f269-42f5-94d0-64fe0946ed04"
    }
  ]
}
```

#### Submodel Batch

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.batch/1.0.2](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.batch/1.0.2)

##### Submodel "Batch" for a Batch of Raw Material

```json
{
  "localIdentifiers": [
    {
      "value": "BID12345678",
      "key": "batchId"
    }
  ],
  "manufacturingInformation": {
    "date": "2022-02-04T14:48:54",
    "country": "HUR"
  },
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "partTypeInformation": {
    "manufacturerPartId": "123-0.740-3434-A",
    "customerPartId": "PRT-12345",
    "classification": "product",
    "nameAtManufacturer": "PA66-GF30",
    "nameAtCustomer": "Polyamide"
  }
}
```

#### Submodel JustInSequencePart

Github Link to semantic data model: [https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.just_in_sequence_part/1.0.0](https://github.com/eclipse-tractusx/sldt-semantic-models/tree/main/io.catenax.just_in_sequence_part/1.0.0)

##### Submodel "JustInSequencePart" for a non-serialized component

```json
{
  "localIdentifiers": [
    {
      "key": "manufacturerId",
      "value": "BPNL7588787849VQ"
    },
    {
      "key": "jisNumber",
      "value": "894651684"
    },
    {
      "key": "parentOrderNumber",
      "value": "OEM-A-F8LM95T92WJ9KNDD3HA5P"
    },
    {
      "key": "jisCallDate",
      "value": "2022-01-24T09:13:34"
    }
  ],
  "manufacturingInformation": {
    "date": "2022-02-04T14:48:54",
    "country": "DEU"
  },
  "catenaXId": "urn:uuid:580d3adf-1981-44a0-a214-13d6ceed9379",
  "partTypeInformation": {
    "manufacturerPartID": "84816168424",
    "classification": "product",
    "nameAtManufacturer": "Black Leather Front Row Seat for Vehicle Model B"
  }
}
```

> Please note that if a just-in-sequence part is also a serialized part SerialPartTypization should be used instead.

<!-- Recommended -->
## Reference Implementation

For a reference implementation, take a look at the open-source Trace-X app. More information are provided in the [Operation View](../page_software-operation-view.md) section.

<!-- Recommended -->
## Documentation in the Context of Development

### Data Provisioning

The following diagram shows a basic data processing flow how a comany's internal data can be transformed into a Traceability-compliant format. It depicts the necessary steps as well as where communication with other services, e.g., Catena-X network services like the Digital TWin Registry, are necessary. Any implementation of this implementation specification can deviate from this basic flow as it's just one way to do it. But it should give a basic idea what the essential steps are.

![Basic Data FLow](../assets/data_provisioning_data_flow.png)

#### Register Digital Twins for Traceability

In Traceability, digital twins for different types of parts are registered at the digital twin registry, e. g. serialized parts, batches, JIS parts or catalog parts.

> :raised_hand: **Unique ID Push**
Once a digital twin was created, optionally a Unique ID Push notification can be send to the customer of the part of batch to inform them that a new digital twin is available.

The following general conventions apply for all these digital twins:

- identification: The AAS ID must be a UUIDv4 in URN format: `urn:uuid:<UUIDv4>`
- globalAssetId: The Unique ID of the real-world part for which a digital twin is created.

> :warning: The AAS ID is not the same id as the Catena-X Unique ID, although they have the same format (UUID) and therefore look the same. A Unique ID identifies real-world parts, whereas a AAS ID identifies a digital twin of such a part. So, don't use the same value for Unique ID and AAS ID.

##### Property specificAssetIds

For Traceability, we define some specificAssetIds as mandatory. Mandatory specific asset IDs are used to lookup or search for digital twins. This is a required step by a customer of a part to connect the digital twins of their parts with the digital twins of the suppliers' child parts. To a customer, only the information printed on a real-world part is available and can be used for the lookup. Mandatory specific asset IDs ensure that at least this information is available for the digital twin.

The following conventions for specificAssetIds apply to all digital twins:

<table>
  <tr>
    <th> Key </th> <th> Availability </th> <th> Description </th> <th> Type </th>
  </tr>
  <tr>
    <td> manufacturerId </td>
    <td> Mandatory </td>
    <td> The Business Partner Number (BPNL) of the manufacturer of the part. </td>
    <td> BPNL </td>
  </tr>
  <tr>
    <td> manufacturerPartId </td>
    <td> Mandatory </td>
    <td> The ID of the type/catalog part from the <em>manufacturer</em>. </td>
    <td> String </td>
  </tr>
  <tr>
    <td> customerPartId </td>
    <td> Optional </td>
    <td> The ID of the type/catalog part from the <em>customer</em>.<br/>The main reason why this propertiy is optional is that it cannot be guaranteed that every manufacturer knows the customerPartId for their parts. If known, it is <em>recommended</em> to always add the customerPartId for easier lookup.<br/>
    If a part has multiple customers, e.g., for batches or catalog parts, multiple customerPartIds can be added. BPN-based access control can be applied to customerPartIds to restrict visiblility.<br/>
    Each company that shall have access to a specific customerPartId must be provided as externalSubjectId using its BPN.<br />
    Access to customerPartId only for BPNL1234:

```json
{
  "key": "customerPartId",
  "value": "39192",
  "externalSubjectId": "BPNL1234"
}
```

In case multiple companies shall have access, each company must be provided in a triple consisting of key, value and externalSubjectId.
If no access control shall be applied, externalSubjectId must be omitted (no access control for `customerPartId`):

```json
{
  "key": "customerPartId",
  "value": "39192"
}
```

  </td>
    <td> String </td>
  </tr>
  <tr>
    <td> assetLifecyclePhase </td>
    <td> Optional </td>
    <td> The lifecycle phase of the asset.<ul><li>For serialized parts, batches, and JIS parts, use the value "AsBuilt".</li><li>For catalog parts, use the value "AsPlanned".</li></ul></td>
    <td> Enum </td>
  </tr>
</table>

**For serialized parts, additionally the following conventions apply:**

| Key            | Availability | Description                                                                                  | Type   |
|:---------------|:-------------|:---------------------------------------------------------------------------------------------|:-------|
| partInstanceId | Mandatory    | The serial number of the part from the manufacturer.                                         | String |
| van            | Optional     | **Only for vehicles:** The pseudonymized vehicle identification number (VIN) of the vehicle. | String |

**For batches, additionally the following conventions apply:**

| Key            | Availability | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Type   |
|:---------------|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| batchId        | Optional     | The number of the batch from the manufacturer.                                                                                                                                                                                                                                                                                                                                                                                                                                                   | String |
| partInstanceId | Mandatory    | Also the number of the batch from the manufacturer.<br/><br/>For **Release 3.0**, we also use the batch number as partInstanceId. This makes looking up digital twins for serialized parts and batches easier as a data consumer only has to specify the partInstanceId no matter if they are looking up a serialized part or a batch. Otherwise, the data consumer would need to know for what type of digital twin it is looking for or it would have to look for both until a match is found. | String |

**For just-in-sequence (JIS) parts, additionally the following conventions apply:**

| Key                | Availability | Description                                                                                                                                                                                                                 | Type   |
|:-------------------|:-------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| parentOrderNumber  | Optional     | A number identifying the just-in-sequence- part's destination parent part. The parent part is typically known upfront to the supplier for just-in-sequence parts.                                                           | String |
| jisNumber          | Mandatory    | A number that is used to identify the call-off that can be assumed unique within the specific just-in-sequence process. This is typically not the sequence number, but the call-off number.                                 | String |
| jisCallDate        | Optional     | The date of the just-in-sequence call-off as stated on the call-off document itself. <br/>The value must be compliant to ISO 8601: `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` or `YYYY-MM-DDThh:mm:ss±hh:mm`                      | Date   |
| partInstanceId     | Mandatory    | A composition of `jisNumber`, `parentOrderNumber` (if available), `jisCallDate` (ifavailable). This information is typically known upfront to the supplier `jisNumber`, `partOrderNumber` and `jisCallDate` for just-in-sequence parts. | String |

> :raised_hand: **Lookup of Digital Twins**
The lookup for parts can use the customerPartId or the manufacturerPartId. Both, manufacturer and customer must agree upon what part id will be used for the lookup. Otherwise, when the customer would use the customerPartId for the lookup, but the manufacturer would only provide the manufacturerPartId in its digital twins, the lookup would fail every time. **This is decision that a customer must agree upon with each of their suppliers individually.**

##### Submodel Descriptors

The following general conventions apply for all submodel descriptors:

- `identification`: The submodel ID must be a UUIDv4 in URN format: "urn:uuid:&lt;UUIDv4&gt;"
- `idShort`: The name of the aspect model in camel case, e.g. for aspect SerialPartTypization: "serialPartTypization".
- `endpoints`: For access of submodels via EDC and AAS a new interface type EDC-AAS must be defined.
  - `interface`: The value must be "EDC"
  - `endpointAddress`: The endpoint address must have the following format: `http://provider.controlplane:port/<EDC Asset ID>/submodel?content=value&extent=WithBLOBValue`
    - `provider.controlplane:port`: server and port of the EDC that is providing the submodel
    - `EDC Asset ID`: The EDC asset id under which the submodel was registered in the EDC. It must have the following format `<AAS ID>-<Submodel ID>`
      - `AAS ID`: The id of the digital twin (identification property in the AAS descriptor)
      - `Submodel`: The id of the submodel  (identification property in the submodel descriptor)
    - `/submodel`: This method from the AAS Shell Interface that is invoked via the EDC.
    - `content=value&extent=WithBLOBValue`: This are currently required parameters when requesting payload via the AAS standard from an EDC
  - `endpointProtocol`: The value must be `IDS/ECLIPSE DATASPACE CONNECTOR`
  - `endpointProtocolVersion`: The value must be `0.0.1-SNAPSHOT`

> :raised_hand: **AAS Submodel Descriptor Endpoints**
The endpoint (endpointAddress) in the submodel descriptor cannot be used directly to contact the EDC and access the data. The endpoint has to be re-written as it combines EDC and AAS information. The AAS API Wrapper does that automatically when using it, i.e., it fetches the endpoint from the AAS Registry and re-writes it in a way to a Catena-X EDC with an AAS server in the background can process the query.

#### Lookup for Digital Twins in the Digital Twin Registry

For a data provider, there are currently the following steps where they have to lookup digital twins of other partners in the Catena-X network.

- The data provider must use the local IDs for a serialized part or batch (manufacturer, part number, serial or batch number) and for a just-in-sequence part (manufacturer, parentOrderNumber, jisNumber, jisCallDate) to lookup the AAS ID of the digital twin of this serialized part, batch or just-in-sequence part. The AAS descriptor with this ID contains the Unique ID of the serialized part, batch or just-in-sequence (as globalAssetId) that is used to create the AssembyPartRelationship submodel.

- The data provider must use the local IDs for a catalog part (manufacturer, part number) to lookup the AAS ID of the digital twin of this catalog part. The AAS descriptor with this ID contains the Unique ID of the catalog part (as globalAssetId) that is used to create the SingleLevelBoMAsPlanned submodel.

For a data consumer, there are currently the following steps where they have to lookup digital twins of other partners in the Catena-X network.

- The data consumer in the Traceability use case in most cases will use the Unique ID of a part to lookup the digital twin (more precisely, its AAS ID) of this part.
- The data consumer from another use case (e.g., Circular Economy), might either use the Unique ID of a part (if known) or the local IDs of a part to lookup the part's digital twin (AAS ID) depending on what is available in the use case.

##### Lookup up a Digital Twin with Local IDs

The local IDs of a serialized part (manufacturer, part number, serial number) are stored as specificAssetIds in the AAS descriptor of the digital twin. From the Digital Twin Registry API, the following function can be used for this lookup `GET /lookup/shells`.

All Asset identifier key-value-pairs used as parameter to this lookup function are combined using AND. An example query would look like this: `https://URL/registry/lookup/shells?assetIds=%5B%7B%22key%22%3A%20%22manufacturerId%22,%22value%22%3A%20%22BPNL7588787849VQ%22%7D,%7B%22key%22%3A%20%22manufacturerPartId%22,%22value%22%3A%20%2295657362-83%22%7D,%7B%22key%22%3A%20%22partInstanceId%22,%22value%22%3A%20%22NO-574868639429552535768526%22%7D%5D`

**The assetIds value looks like this unencoded (but with additional spaces and linebreaks):**

```json
[
  {
    "key": "manufacturerId",
    "value": "BPNL7588787849VQ"
  },
  {
    "key": "manufacturerPartId",
    "value": "95657362-83"
  },
  {
    "key": "partInstanceId",
    "value": "NO-574868639429552535768526"
  }
]
```

The lookup (for serialized parts/batches as well as catalog parts) can use the customer or the manufacturer part id (manufacturerPartId or manufacturerPartId).

- For a digital twin, adding the customer part id to the specificAssetId property is optional (see (TRS) Create Digital Twins for Serialized Parts and Batches incl. Submodels). The main reason for this is that it cannot be guaranteed that every manufacturer knows the customer part id for their parts. But, if they know it, it is recommended to always add the customer part id to the specifiAssetId property for easier lookup (by customers).
- A customer that wants to do a lookup for a supplier's digital twin, must first decide what id they want to use for the lookup. This depends on the information that is available to them.
  - If the customer knows the manufacturer part id, they should use the manufacturer part id for the lookup as the manufacturer part id is guaranteed to be available in the digital twin (as the manufacturer part id is a mandatory property).
  - If the customer does not know the manufacturer part id, they must use the customer part id (i.e., their own part id). In that case they must make sure that their suppliers register their digital twins with this information (as the customer part id is optional) as part of the specificAssetId property. This is decision that a customer must agree upon with each of their suppliers individually.

As a result, the AAS ID of the digital twin with this local IDs is returned. The AAS ID can then be used to retrieve details about the digital twin, i.e. the digital twin's AAS descriptor including submodel descriptors.

**Example result for looking up a digital twin with local IDs:**

```json
[
  "urn:uuid:c227a880-b82b-40f7-846c-3942ddf26c29"
]
````

Note that this query can return more than one AAS ID depending on the local IDs uniquely identifying a digital twin or not.

For Release 3.0, even if more than one digital twin is returned in a lookup, these digital twins should have different submodels assigned to them. These submodels should be disjunct and not overlap. This means that you can use the submodel to filter out the correct digital twin.

- If there are returned more than one digital twin with the same submodel (based on their semanticId), this is considered an error. Processing should be canceled and an error message should be reported.

The next section describes to to modify the lookup to additionally restrict the results to digital twins with a specific submodel type based on it's semanticId.

#### Unique ID Push Notifications

Unique ID Push notifications are a way for a manufacturer to notify a customer as soon as possible when a new digital twin for a part is available.

The solution is based on notification assets in the EDC (which is the same approach that is used for quality alerts & investigations). The customer creates a notification asset in the EDC and the customer's suppliers send their notifications (with the Unique Id) to this notification asset. As this notification asset is a general EDC asset - as for all EDC assets - access policies, usage policies and contract definitions must be created.

> :raised_hand: It is important to understand that the customer (receiver) creates EDC asset and policies, and thus, the supplier (sender) of the Unique ID push notification must check during the EDC negotiation process if the conditions the receiver offers are acceptable for the sender.

##### Prerequisites and Constraints

In order to be able to push Unique ID(s) of part(s) to the correct partner, it is required that the data provider (manufacturer) pushing the Unique IDs is aware of the BPN of the actual receiver of the part (i.e., the customer) or has enough data in its context to use BPDM functions to determine the BPN Number of the receiver.

For actively pushing Unique IDs, an EDC is required and the data provider needs to be enabled to execute the complete process including EDC communication and HTTP Push (i.e., HTTP POST) of the payload.

Secondly, EDCs are being used for the exchange and it is currently required to offer a HTTP POST API to receive the Unique IDs push at the receiver's side. This API needs to be registered in the EDC Catalog as a data offer and requires specific properties to be set to standardized values, as this allows discover-ability. Details still tbd.

##### Unique ID Push Process Overview

How the actual process is triggered is application specific. It is recommended to to trigger the push of Unique IDs towards the customer after the Goods Issue has been booked, since commonly at that point the serial numbers/batch numbers of the parts being delivered are fixed in the logistics process and shall be contained in delivery documents, EDI Messages and/or any internal representation of the received items (non-Catena-X communication).

The Unique ID push is initiated by the supplier (acting as sender) towards their customer (acting as receiver). Since the Unique ID of the asset (i.e., serial unit / batch) is unknown in the logistics process, the message needs to include local identifiers to be matched towards the information from the delivery documents and furthermore the internal data of the recipient's traceability solution.

Upon receipt of the message, the customer needs to match the local identifiers with its internal traceability records and attach each Unique ID to the respective data set. How this is done is depending on the customer's internal systems:

- If there is an object for incoming deliveries, this event could be updated.
  Alternatively, if only production events are tracked, the data could be integrated at this point into the data provisioning pipeline's data structure for consumed materials.
- In the end this enables the customer to integrate the child parts into the AssemblyPartRelationship aspect.

In the end this enables the customer to integrate the child parts into the AssemblyPartRelationship aspect.

![Unique ID Push Process](../assets/unique_id_push_process.png)

<!--
The following PlantUML code is used to generate the image shown:

@startuml
autonumber

box "Supplier Landscape" #Lightblue
participant "Data Provisioning Supplier" as TraceSup order 1
participant "EDC Supplier" as EDCSup order 2
end box

box "Catena-X Services" #grey
participant "EDC Discovery Service" as EDCDisc order 3
participant "BPDM API" as BPM order 4
end box

box "Customer Landscape" #lightyellow
participant "EDC Customer" as EDCCust order 5 
participant "Data Provisioning Customer" as TraceCust order 6
end box

group optional [if BPN of Customer is not directly known]
TraceSup -> BPM: Request Customer BPN number
BPM -> TraceSup: BPN number
end

group optional [if EDC Adress is not directly known or buffered]
TraceSup -> EDCDisc: Request EDC Endpoint for BPN of customer
EDCDisc -> TraceSup: Return EDC Adress
end

TraceSup -> EDCSup: Trigger Unique ID Push to customer EDC

group contract negotiation
EDCSup -> EDCCust: Request Contract for Unique ID Push receiption endpoint
EDCCust -> EDCSup: Return Access Token and Dataplane Endpoint
end

EDCSup -> EDCCust: Send Unique ID Push notification and Token
EDCCust -> TraceCust: Forward Unique ID
TraceCust -> TraceCust: link UUID to Traceability events/material

@enduml
-->

##### Schema of Unique ID Push Notifications

The notifications send to inform a customer about the creating of a new digital twin for one of the parts they received have a standardized format.

All endpoints as well as the schema of the notification below are described in detail in the [Unique ID Push API documentation](Unique%20ID%20Push%20API/unique-id-push-notification-api).

> Adding the customer part id to the notification is optional. The main reason for this is that it cannot be guaranteed that every manufacturer knows the customer part id for their parts. But, if they know it, it is recommended to always add the customer part id to the notification.

##### Notification Receiver (Customer)

Here is a short overview what the receiver has to do when they want to support Unique Id Push notifications. This is an optional feature.

- The Receiver in this scenario is the customer of a part.
- The Receiver must create a EDC asset in their EDC that works as the endpoint for receiving notifications. Also, access & usage policies as described below must be configured.
- The EDC in which the notification EDC asset was created must be registered at the Discovery Service (so that the sender can find the partner's EDC which should receive notifications)
- When the Receiver receives a Unique Id Push notification, it must process this notification after it was received by the EDC (in a Backend Data Service)
- How the Receiver processes the notification is up to them, but the following steps are recommended:
  - Verify the correctness of the data in the notification (i.e., the receiver is actually the customer of this part).
  - Store the notification data for later.
  - Use this data when the digital twin for the part into which the delivered part is built into is created instead of doing a lookup to the digital twin registry.

###### EDC Asset

The EDC asset can be created using the EDC Data Management API. The following conventions apply for the properties of this asset:

```apacheconf
"asset:prop:id": "uniqueidpushnnotification-receipt"
"asset:prop:type": "notification.trace.uniqueidpush"
"asset:prop:notificationtype": "uniqueidpush"
"asset:prop:notificationmethod": "receive"
```

###### EDC Policies

_More information about the Policies with detailed descriptions, payloads etc. are described on the [Adoption View](../page_adoption-view.md) page._

**Access Policies**
A data provider can decide on its own what access policies they want to define for their notification asset. Based on the purpose of the asset, all suppliers of the data provider should in general be allowed to send notifications to this asset. Therefore, either a public access policy or a BPN-based access policy (allowing all suppliers) should be used.

**Usage Policies**
In general, a data provider is free to decide which usage policies to define for its assets. For notifications, though, the data provider is actually the receiver of notifications, i.e., the usage policy here has the purpose to define what the data provider does or is allowed to do with the notifications. It's something the sender of the notification has to rely on and accept when sending its notification.

Keep in mind that usage policies currently aren't technically enforced by the EDC or other components.

> :raised_hand: **Usage Policy for Unique ID Push**
The Unique ID push notification endpoints are protected with a purpose-based usage policy and "R3-1_UniqueIDPush" as purpose.

###### Backend Data Service to Process Unique ID Push Notifications

The receiver must setup a backend data service that provides an HTTP Endpoint for notifications. All endpoints as well as the schema of the notification below are described in detail in the [Unique ID Push API documentation](Unique%20ID%20Push%20API/unique-id-push-notification-api).

##### Notification Sender (Manufacturer, Supplier)

Here is a short overview what the sender has to do when they want to support Unique Id Push notifications. This is an optional feature.

- The Sender in this scenario is the manufacturer or supplier of a part.
- When a new digital twin for a part was created, the manufacturer is responsible to send a Unique Id Push notification for this twin to the customer of this part.
- It is recommended to send this notification as soon as possible, i.e., directly after the digital twin was created.

###### Mapping BPN to EDC URL with Discovery Service API

The sender must first find the EDC of the customer to which the notification should be sent to. For this, the BPN of the customer is required. With this, the Discovery Service can be used to query for all EDCs of the customer. After that, the data catalog of each of these EDCs must be queried for the notification EDC asset as described above. If this notification EDC asset is found in one of these EDCs, the notification can be sent.

There should only be one EDC which provides the notification EDC asset for Unique Id Push. If more than one EDC (for the same BPN/partner) are found, this is considered a misconfiguration of the corresponding partner.

#### Creating Submodels for Digital Twins

Submodels for Traceability are mostly easy to create by transforming a company's internal data into the target aspect model, i.e. SerialPartTypization or Batch. Transformations are mostly straightforward in these cases.

The only special step in creating these two submodels is the initial creation of the Unique ID for the corresponding serialized parts or batches.

##### Creation of Submodel AssemblyPartRelationship

The creation of the submodel AssemblyPartRelationship is more complicated. This submodel contains the Unique ID of the manufacturer's part (attribute catenaXId) which is created - as described above - when the part's SerialPartTypization or Batch submodel is created. But it also contains the Unique IDs of the built-in parts (attributes childParts.childCatenaXId), as shown in the following example:

```json
{
  "catenaXId": "urn:uuid:d261e0fa-36f5-4128-875e-0f5735f5a535",
  "childParts": [
    {
      "quantity": {
        "quantityNumber": 1,
        "measurementUnit": "unit:piece"
      },
      "lifecycleContext": "AsBuilt",
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z",
      "childCatenaXId": "urn:uuid:9dc1b6fb-94e7-4911-9e39-abf06c4941d2"
    },
    {
      "quantity": {
        "quantityNumber": 1,
        "measurementUnit": "unit:piece"
      },
      "lifecycleContext": "AsBuilt",
      "createdOn": "2022-02-03T14:48:54.709Z",
      "lastModifiedOn": "2022-02-03T14:48:54.709Z",
      "childCatenaXId": "urn:uuid:d17bbf68-6cb7-4045-b3ae-67f41403d098"
    }
  ]
}

```

For the build-in parts (child parts), their Unique ID is not known to the manufacturer initially. Only know are the local ids that are printed on the physical part (serialized part or batch), i.e., manufacturer (BPN), manufacturer part id and serial or batch number. To get the Unique ID of a built-in part, a data provider therefore has to do the follwoing:

- Get all necessary local ids for the built-in part:
  - manufacturer (BPN), manufacturer part id and serial number for serialized parts
  - manufacturer (BPN), manufacturer part id and batch number for batches
- The next step is about getting the Unique ID of all built-in parts. There are two ways:
  - Unique IDs might for built-in parts might already be available locally if Unique ID Push is supported by the data provider and the suppliers of the built-in parts.
  - Query the Digital Twin Registry to find the digital twin for this built-in part

###### Unique ID Push

Once the digital twin was created, optionally a Unique ID Push notification can be send by the manufacturer of the part to the customer of the serialized part of batch to inform the customer that information about a serialized part or batch is available as a digital twin. This is an optional process and both, the manufacturer of a part as well as the customer of the part must support Unique ID Push notifications.

For more information, see [Unique ID Push Notifications](#unique-id-push-notifications)

###### Query the Digital Twin Registry to find the digital twin for this built-in part

- Querying digital twins is described in (TRS) Lookup for Digital Twins at the Digital Twin Registry
  - Note that the query parameters differ depending on what type of digital twin is looked up.
    - For Release 3.0 though, no matter if you want to lookup serialized parts or batches, you can use partInstanceId (using the serial number or the batch number as search parameter value).
    - For Batch digital twins, the key batchId might be provided optionally. As this key is not mandatory for Release 2, you cannot rely on this key being available when looking for Batch digital twins.
  - To understand why, take a look at how these digital twins are created, especially their specificAssetIds: (TRS) Create Digital Twins for Serialized Parts and Batches incl. Submodels
  - The result of this query will be the AAS ID of the digital twin.
- Use this AAS ID to get the AAS Descriptor including all Submodel Descriptors of this digital twin. The AAS Descriptor contains the Submodel Descriptor SerialPartTypization or Batch (depending on the digital twin type).
- Fetch the submodel SerialPartTypization or Batch (depending on the digital twin type) from the EDC that is referenced in the corresponding Submodel Descriptor.
- The submodel then contains the Unique ID of the built-in part in its catenaXId attribute.

These steps have to be repeated for all built-in parts by the manufacturer. After that, the manufacturer has all information to create the AssemblyPartRelationship.

#### Publish Traceability Data Offers at EDC

Currently, only the format and content of the `asset:prop:id` attribute is mandatory. All other attributes can be used optionally by data providers.

- `asset:prop:id`: This is the EDC asset ID and must have the following format: `<AAS ID>-<Submodel ID>`

##### Data Provider Tasks

Basically, as a data provider you have to do the following

- Implement a Backend Data Service (BDS) for every asset that is provided via the EDC. It does not have to be a different BDS for each asset - you can use the same BDS for several assets (to be verified).
- The BDS must support the AAS Interface Shell REST-API.
- The BDS must use the REST API data plan for data transmission.
- The BDS must verify that it only returns data to the data consumer that is compliant for the asset and data offer for which data is queried. As a data offer is always assigned to one data consumer, only data must be returned that is accessible for the data consumer.
