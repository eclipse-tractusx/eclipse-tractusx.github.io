### Terminology

The shown picture illustrates only a generic view of the EDC's Domain Model and is not intended to show all aspects of
the implementation. Most of the Domain-Model-Elements are represented by separate APIs. Please check
the [Management API Walkthrough](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs)
in the tractusx-edc repository for more a reference on usage of the API.

![domain_model](@site/static/img/domain_model.drawio.svg)

#### Extensions

There are different extenions for the Connector, e.g. for the Data Plane. This enables various transfer modes like
httpData or via blob-storage.

#### Data Plane

The Data Plane handles several forms of actual data exchange by utilizing various extensions.

#### Control Plane

The Control Plane handles meta data exchange with other components and Connectors, as well as transfer of access tokens

#### Data Assets

Data Sources (databases, files, cache information, etc.) are connected to the Connector and are represented by Data
Assets. For each asset, a [`DataAddress`](#data-address) needs to be resolvable.

#### Data address

A data address is a pointer into the physical storage location where an asset will be stored.

#### Policy Definition

A standardized set of policies can be used to define actions regarding access to and usage of assets. These actions can
be limited further by constraints (temporal or spatial) and duties ("e.g. deletion of the data after 30 days").

#### Contract Definition

By combining [`Assets`](#data-assets) and Policies, Contracts for data offerings are defined. These Contracts need to be
accepted by consuming participants (Connectors) for the data exchange to take place.

#### Contract offer

The contract offer is a representation of the [`ContractDefinition`](#contract-definition) for a specific consumer and
serves as protocol for a data transfer object (DTO) for a particular contract negotiation. If a data consumer wants to
conclude a binding data exchange contract based on the terms of a Data Offer, the data consumer can communicate such
desire to the data provider by referencing to a specific Data Offer. This constitutes a binding offer by the data
consumer. For now, the data consumer only has the option to accept all terms of a Data Offer (or not). The Data Exchange
Process does not yet provide for the data consumer to make an offer that deviates from the terms of a Data Offer as set
by the data provider.

#### Contract negotiation

A `ContractNegotiation` captures the current state of the negotiation of a contract (`ContractOffer` ->
`ContractAgreement`) between two parties. This process is inherently asynchronous.

#### Contract agreement

A contract agreement represents the agreed-upon terms of access and usage of an asset's data between two data space
participants, including a start and an end date and further relevant information.

#### Transfer process

After a successful contract negotiation, `DataRequests` can be sent from the consumer connector to the provider
connector to initiate the data transfer. It references the requested [`Asset`](#data-assets)
and [`ContractAgreement`](#contract-agreement) as well as information about the [data destination](#data-address).

Similar to the `ContractNegotiation`, this object captures the current state of a data transfer. This process is
inherently asynchronous, so the `TransferProcess` objects are stored in a backing data store (`TransferProcessStore`).
