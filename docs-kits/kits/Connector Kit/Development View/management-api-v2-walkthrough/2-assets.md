# Creating an Asset

An Asset is the fundamental representation of an arbitrary backend interface in the EDC. The Data Provider registers it
with its Control Plane as a first step to expose it to the Dataspace via the Dataplane later on. This registration is
executed via the following Request:

```http
POST /v3/assets HTTP/1.1
Host: https://control.plane/api/management
X-Api-Key: password
Content-Type: application/json

{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "<ASSET-ID>",
  "properties": {
    "dct:type": {"@id":"https://my-namespa.ce/my-asset-type"}
  },
  "privateProperties": {
    "private-property": "<PRIVATE-PROPERTY-VALUE>"
  },
  "dataAddress": {
    "type": "<SUPPORTED-TYPE>"
  }
}
```

The `@id` parameter will identify the configured endpoint access permanently. This is the same id that a
data consumer will see when being presented the corresponding data offers when retrieving the [catalog](5-catalog.md).
However, there it won't be styled as an `edc:asset` but as a `dcat:DataSet`. Additionally, there is the possibility to
add `properties` and `privateProperties` to the Asset. The former are exposed in the catalog to potential Data
Consumers.
Private properties, however, can only be seen by the Data Provider (for example via the /v3/assets/request endpoint)
along with the properties. There are conventions in the Catena-X Dataspace how Data Providers should set properties. This enables
Data Consumers to decide what Data Offers they want to negotiate for. These conventions are standardized in CX-0018 and
the standards building on it. The only one mandated is the "https://purl.org/dc/terms/type" property which signifies what
kind of API can be found behind the EDC-Asset. This matters especially when the Data Consumer has to add URL-segements or
HTTP bodies to its requests.

Most consequential however is the `dataAddress` section of the asset-APIs payload. It configures the Data Plane's
behavior.Depending on the protocol used for data exchange, an EDC will use different Data Planes. This is manifested by
the `type` property of the `dataAddress` object. There
may be arbitrary extensions extending the required parameters in the `dataAddress` section. That's why the following
examples are not complete but should rather be viewed as archetypes of established combinations of technologies.

The effects of each parameter will be explained by the following examples.

## HTTP Data Plane

The HTTP Data Plane of the EDC will proxy an HTTP request that a Data Consumer sends via HTTP. However, the incoming
request will be manipulated by the Data Plane - to what degree depends on the configuration. Let's look at an example:

```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/",
    "cx-common": "https://w3id.org/catenax/ontology/common#",
    "cx-taxo": "https://w3id.org/catenax/taxonomy#",
    "dct": "https://purl.org/dc/terms/"
  },
  "@id": "{% uuid 'v4' %}",
  "properties": {
    "dct:type": {
      "@id": "{{ _.asset_type }}"
    },
    "cx-common:version": "{{ _.asset_version }}"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "https://mycorp.org/api",
    "oauth2:tokenUrl": "{{ _.url_keycl_backend }}",
    "oauth2:clientId": "{{ _.client_id_backend }}",
    "oauth2:clientSecretKey": "{{ _.sec_name_vault }}",
    "proxyQueryParams": "true",
    "proxyPath": "false",
    "proxyMethod": "true"
  }
}
```
The following table shall explain a selection of the parameters. There's a whole lot more in the source code but these
have proven to enable an integration that's quite complete from a functional view.

| parameter                | description                                                                                                                                                                                                                                                                                                                                                                                                        | mandatory | default |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|
| `baseUrl`                | This parameter indicates the location of the backend data source. It's invisible to the Data Consumer and thus, the Data Plane will always resolve the contractId associated with the request's token to the baseUrl, forward the request and pass on the returned data. Thus, for the example above, a request to `https://data.plane` with a valid token attached will be forwarded to `https://mycorp.org/api`. | yes       | -       |
| `proxyPath`              | This boolean determines whether the Data Plane allows the Data Consumer to attach additional URL-segments to the request. If this parameter is set `true`, the a request `https://data.plane/resources/abcd` will be forwarded to  https://mycorp.org/api/resources/abcd.                                                                                                                                          | no        | false   |
| `path`                   | If `proxyPath` is false, this parameter can be used to add an additional path to the request when it passes the Data Plane.                                                                                                                                                                                                                                                                                        | no        | null    |
| `proxyMethod`            | This boolean determines whether the Data Plane allows incoming requests to use HTTP-verbs that are not GET.                                                                                                                                                                                                                                                                                                        | no        | false   |
| `method`                 | If `proxyMethod` is false, this parameter can be used to change the HTTP verb that the Http Data Plane will forward to the backend. If this parameter is set `false`, the Data Plane will rewrite `POST https://data.plane` to `GET https://mycorp.org/api`.                                                                                                                                                       | no        | "GET"   |
| `proxyBody`              | This boolean determines whether the Data Plane forwards the Data Plane request's body to the backend.                                                                                                                                                                                                                                                                                                              | no        | false   |
| `body`                   | If `proxyBody` is false, this parameter can be used to set a fixed request body that the Http Data Plane will forward to the backend.                                                                                                                                                                                                                                                                              | no        | null    |
| `proxyQueryParams`       | This boolean determines whether the Data Plane forwards the headers that a request has attached. Thus, if `true`, a request `GET https://data.plane?q=z` will be rewritten to "https://mycorp.org/api?q=z".                                                                                                                                                                                                        | no        | false   |
| `queryParams`            | Independently of `proxyQueryParams`, this string may include fixed headers that the Data Plane will attach to the incoming request and forward to the backend.                                                                                                                                                                                                                                                     | no        | null    |
| `oauth2:tokenUrl`        | If the backend is secured by an oauth2 authentication mechanism, the Data Plane will request an access token at this URL.                                                                                                                                                                                                                                                                                          | no        | null    |
| `oauth2:clientId`        | This is the clientId of the (technical) user that the credential was created for by the backend application.                                                                                                                                                                                                                                                                                                       | no        | null    |
| `oauth2:clientSecretKey` | The Data Provider must store his backend-issued client-secret in a Vault. The key under which the Data Plane can retrieve the secret's value is configured in this field.                                                                                                                                                                                                                                          | no        | null    |



