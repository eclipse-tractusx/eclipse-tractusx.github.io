---
id: admin-guide
title: Administration Guide
description: 'Administration Guide'
sidebar_position: 3
---

![Datachain kit banner](@site/static/img/kits/data-chain/data-chain-kit-logo.svg)

### Data Chain KIT

## System Overview

The deployment contains the components required to connect the IRS to an existing Catena-X network. This includes:

* IRS with Minio - part of the "irs-helm" Helm chart
* EDC Consumer (controlplane & dataplane) - part of the "irs-edc-consumer" Helm chart

Everything else needs to be provided externally.

![adminguide_000](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/adminguide/adminguide_000.png)

## Installation

The IRS Helm repository can be found here:
[https://eclipse-tractusx.github.io/item-relationship-service/index.yaml](https://eclipse-tractusx.github.io/item-relationship-service/index.yaml)

Use the latest release of the "irs-helm" chart.
It contains all required dependencies.

If you also want to set up your own EDC consumer, use the [tractusx-connector](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/charts/tractusx-connector) chart.

Supply the required configuration properties (see chapter [Configuration](configuration.adoc#_configuration)) in a values.yaml file or override the settings directly.

### Deployment using Helm

Add the IRS Helm repository:

`$ helm repo add irs https://eclipse-tractusx.github.io/item-relationship-service>`

Then install the Helm chart into your cluster:

`$ helm install -f your-values.yaml irs-app irs/irs-helm`

### Deployment using ArgoCD

Create a new Helm chart and use the IRS as a dependency.

```yaml
dependencies:
  - name: irs-helm
    repository: https://eclipse-tractusx.github.io/item-relationship-service
    version: 6.x.x
  - name: tractusx-connector # optional
    repository: https://eclipse-tractusx.github.io/tractusx-edc
    version: 0.5.x

```

Then provide your configuration as the values.yaml of that chart.

Create a new application in ArgoCD and point it to your repository / Helm chart folder.

## Configuration

Take the following template and adjust the configuration parameters (&lt;placeholders> mark the relevant spots).
You can define the URLs as well as most of the secrets yourself.

The OAuth2, MIW and Vault configuration / secrets depend on your setup and might need to be provided externally.

## Spring Configuration

The IRS application is configured using the Spring configuration mechanism. The main configuration file is the ``application.yaml``.

```yaml
server:
  port: 8080 # The port the main application API listens on
  trustedPort: ${SERVER_TRUSTED_PORT:} # The port used for the unsecured, internal API - if empty, the main port is used

spring:
  application:
    name: item-relationship-service
  security:
    oauth2:
      client:
        registration:
          common:
            authorization-grant-type: client_credentials
            client-id: ${OAUTH2_CLIENT_ID} # OAuth2 client ID used to authenticate with the IAM
            client-secret: ${OAUTH2_CLIENT_SECRET} # OAuth2 client secret used to authenticate with the IAM
          portal:
            authorization-grant-type: client_credentials
            client-id: ${PORTAL_OAUTH2_CLIENT_ID} # OAuth2 client ID used to authenticate with the IAM
            client-secret: ${PORTAL_OAUTH2_CLIENT_SECRET} # OAuth2 client secret used to authenticate with the IAM
        provider:
          common:
            token-uri: ${OAUTH2_CLIENT_TOKEN_URI:https://default} # OAuth2 endpoint to request tokens using the client credentials
          portal:
            token-uri: ${PORTAL_OAUTH2_CLIENT_TOKEN_URI:https://default} # OAuth2 endpoint to request tokens using the client credentials
      resourceserver:
        jwt:
          jwk-set-uri: ${OAUTH2_JWK_SET_URI:https://default} # OAuth2 endpoint to request the JWK set

management: # Spring management API config, see https://spring.io/guides/gs/centralized-configuration/
  endpoints:
    web:
      exposure:
        include: health, threaddump, loggers, prometheus, info, metrics
  endpoint:
    health:
      probes:
        enabled: true
      group:
        readiness:
          include: readinessState, diskSpace
      show-details: always
  health:
    livenessstate:
      enabled: true
    readinessstate:
      enabled: true
    dependencies:
      enabled: false
      urls: { }
  metrics:
    distribution:
      percentiles-histogram:
        http: true
    tags:
      application: ${spring.application.name}
  server:
    port: 4004

logging:
  pattern:
    console: "%d %-5level %logger : %msg%n"
  level:
    root: WARN
    org.springframework: INFO
    org.eclipse.tractusx.irs: INFO

springdoc: # API docs configuration
  api-docs:
    path: /api/api-docs
  swagger-ui:
    path: /api/swagger-ui
  writer-with-order-by-keys: true

irs: # Application config
  apiUrl: "${IRS_API_URL:http://localhost:8080}" # Public URL of the application, used in Swagger UI
  job:
    callback:
      timeout:
        read: PT90S # HTTP read timeout for the Job API callback
        connect: PT90S # HTTP connect timeout for the Job API callback
    cleanup: # Determines how often the JobStore is being cleaned up. Different schedulers for completed and failed jobs.
      scheduler:
        #          ┌───────────── second (0-59)
        #          │ ┌───────────── minute (0 - 59)
        #          │ │ ┌───────────── hour (0 - 23)
        #          │ │ │ ┌───────────── day of the month (1 - 31)
        #          │ │ │ │ ┌───────────── month (1 - 12) (or JAN-DEC)
        #          │ │ │ │ │ ┌───────────── day of the week (0 - 7)
        #          │ │ │ │ │ │          (or MON-SUN -- 0 or 7 is Sunday)
        #          │ │ │ │ │ │
        completed: 0 0 * * * * # every hour
        failed: 0 0 * * * * # every hour
    jobstore:
      ttl: # Determines how long jobs are stored in the respective state. After the TTL has expired, the job will be removed by the cleanup scheduler.
        failed: P7D # ISO 8601 Duration
        completed: P7D # ISO 8601 Duration
      cron:
        expression: "*/10 * * * * ?" # Determines how often the number of stored jobs is updated in the metrics API.

blobstore:
  endpoint: "${MINIO_URL}" # S3 compatible API endpoint (e.g. Minio)
  accessKey: "${MINIO_ACCESS_KEY}" # S3 access key
  secretKey: "${MINIO_SECRET_KEY}" # S3 secret key
  bucketName: irsbucket # the name of the S3 bucket to be created / used by the IRS

policystore:
  persistence:
    endpoint: "${MINIO_URL}" # S3 compatible API endpoint (e.g. Minio)
    accessKey: "${MINIO_ACCESS_KEY}" # S3 access key
    secretKey: "${MINIO_SECRET_KEY}" # S3 secret key
    bucketName: irs-policy-bucket # the name of the S3 bucket to be created / used by the policy store
    daysToLive: -1 # number of days to keep policies in the store, use -1 to disable cleanup

resilience4j:
  retry: # REST client retry configuration
    configs:
      default:
        maxAttempts: 3 # How often failed REST requests will be retried
        waitDuration: 10s # How long to wait between each retry
        enableExponentialBackoff: true # Whether subsequent retries will delay exponentially or not
        exponentialBackoffMultiplier: 2 # Multiplier for the exponential delay
        ignore-exceptions: # Do not retry on the listed exceptions
          - org.springframework.web.client.HttpClientErrorException.NotFound
          - org.eclipse.tractusx.irs.edc.client.ItemNotFoundInCatalogException
    instances:
      registry:
        baseConfig: default

irs-edc-client:
  callback-url: ${EDC_TRANSFER_CALLBACK_URL:} # The URL where the EDR token callback will be sent to.
  controlplane:
    request-ttl: ${EDC_CONTROLPLANE_REQUEST_TTL:PT10M} # How long to wait for an async EDC negotiation request to finish, ISO 8601 Duration
    endpoint:
      data: ${EDC_CONTROLPLANE_ENDPOINT_DATA:} # URL of the EDC consumer controlplane data endpoint
      catalog: ${EDC_CONTROLPLANE_ENDPOINT_CATALOG:/v2/catalog/request} # EDC consumer controlplane catalog path
      contract-negotiation: ${EDC_CONTROLPLANE_ENDPOINT_CONTRACT_NEGOTIATION:/v2/contractnegotiations} # EDC consumer controlplane contract negotiation path
      transfer-process: ${EDC_CONTROLPLANE_ENDPOINT_TRANSFER_PROCESS:/v2/transferprocesses} # EDC consumer controlplane transfer process path
      state-suffix: ${EDC_CONTROLPLANE_ENDPOINT_DATA:/state} # Path of the state suffix for contract negotiation and transfer process
    provider-suffix: ${EDC_CONTROLPLANE_PROVIDER_SUFFIX:/api/v1/dsp} # Suffix to add to data requests to the EDC provider controlplane
    catalog-limit: ${EDC_CONTROLPLANE_CATALOG_LIMIT:1000} # Max number of items to fetch from the EDC provider catalog
    catalog-page-size: ${EDC_CONTROLPLANE_CATALOG_PAGE_SIZE:50} # Number of items to fetch at one page from the EDC provider catalog when using pagination
    api-key:
      header: ${EDC_API_KEY_HEADER:} # API header key to use in communication with the EDC consumer controlplane
      secret: ${EDC_API_KEY_SECRET:} # API header secret to use in communication with the EDC consumer controlplane
    datareference:
      storage:
        duration: PT1H # Time after which stored data references will be cleaned up, ISO 8601 Duration

  submodel:
    request-ttl: ${EDC_SUBMODEL_REQUEST_TTL:PT10M} # How long to wait for an async EDC submodel retrieval to finish, ISO 8601 Duration
    urn-prefix: ${EDC_SUBMODEL_URN_PREFIX:/urn} # A prefix used to identify URNs correctly in the submodel endpoint address
    timeout:
      read: PT90S # HTTP read timeout for the submodel client
      connect: PT90S # HTTP connect timeout for the submodel client

  catalog:
    # IRS will only negotiate contracts for offers with a policy as defined in the acceptedPolicies list.
    # If a requested asset does not provide one of these policies, a tombstone will be created and this node will not be processed.
    acceptedPolicies:
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: "ID 3.0 Trace"
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: "ID 3.1 Trace"
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: R2_Traceability
      - leftOperand: "FrameworkAgreement.traceability"
        operator: "eq"
        rightOperand: "active"
      - leftOperand: "Membership"
        operator: "eq"
        rightOperand: "active"
  connectorEndpointService:
    cacheTTL: PT24H  # Time to live for ConnectorEndpointService for fetchConnectorEndpoints method cache

digitalTwinRegistry:
  type: ${DIGITALTWINREGISTRY_TYPE:decentral} # The type of DTR. This can be either "central" or "decentral". If "decentral", descriptorEndpoint, shellLookupEndpoint and oAuthClientId is not required.
  descriptorEndpoint: ${DIGITALTWINREGISTRY_DESCRIPTOR_URL:} # The endpoint to retrieve AAS descriptors from the DTR, must contain the placeholder {aasIdentifier}
  shellLookupEndpoint: ${DIGITALTWINREGISTRY_SHELL_LOOKUP_URL:} # The endpoint to lookup shells from the DTR, must contain the placeholder {assetIds}
  shellDescriptorTemplate: ${DIGITALTWINREGISTRY_SHELL_DESCRIPTOR_TEMPLATE:/shell-descriptors/{aasIdentifier}} # The path to retrieve AAS descriptors from the decentral DTR, must contain the placeholder {aasIdentifier}
  lookupShellsTemplate: ${DIGITALTWINREGISTRY_QUERY_SHELLS_PATH:/lookup/shells?assetIds={assetIds}} # The path to lookup shells from the decentral DTR, must contain the placeholder {assetIds}
  oAuthClientId: common # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
  discoveryFinderUrl: ${DIGITALTWINREGISTRY_DISCOVERY_FINDER_URL:} # The endpoint to discover EDC endpoints to a particular BPN.
  timeout:
    read: PT90S # HTTP read timeout for the digital twin registry client
    connect: PT90S # HTTP connect timeout for the digital twin registry client

semanticshub:
  # The endpoint to retrieve the json schema of a model from the semantic hub. If specified, must contain the placeholder {urn}.
  modelJsonSchemaEndpoint: "${SEMANTICSHUB_URL:}"
  url: ""

  # Path to directory on filesystem where semantic models can be loaded from.
  # The filenames inside the directory must match the Base64 encoded URNs of the models.
  localModelDirectory: ""
  cleanup:
    #          ┌───────────── second (0-59)
    #          │ ┌───────────── minute (0 - 59)
    #          │ │ ┌───────────── hour (0 - 23)
    #          │ │ │  ┌───────────── day of the month (1 - 31)
    #          │ │ │  │ ┌───────────── month (1 - 12) (or JAN-DEC)
    #          │ │ │  │ │ ┌───────────── day of the week (0 - 7)
    #          │ │ │  │ │ │          (or MON-SUN -- 0 or 7 is Sunday)
    #          │ │ │  │ │ │
    scheduler: 0 0 23 * * * # How often to clear the semantic model cache
  defaultUrns: "${SEMANTICSHUB_DEFAULT_URNS:urn:bamm:io.catenax.serial_part:1.0.0#SerialPart}" # IDs of models to cache at IRS startup
  oAuthClientId: common # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
  timeout:
    read: PT90S # HTTP read timeout for the semantic hub client
    connect: PT90S # HTTP connect timeout for the semantic hub client
  pageSize: "${SEMANTICSHUB_PAGE_SIZE:100}"

bpdm:
  bpnEndpoint: "${BPDM_URL:}" # Endpoint to resolve BPNs, must contain the placeholders {partnerId} and {idType}
  oAuthClientId: common # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
  timeout:
    read: PT90S # HTTP read timeout for the bpdm client
    connect: PT90S # HTTP connect timeout for the bpdm client

# ESS Module specific properties
ess:
  localBpn: ${ESS_LOCAL_BPN:} # BPN value of product - used during EDC notification communication
  localEdcEndpoint: ${ESS_EDC_URL:} # EDC base URL - used for creation of EDC assets for ESS notifications and as sender EDC for sent notifications
  assetsPath: ${EDC_MANAGEMENT_PATH:/management/v3/assets} # EDC management API "assets" path - used for notification asset creation
  policydefinitionsPath: ${EDC_MANAGEMENT_PATH:/management/v2/policydefinitions} # EDC management API "policydefinitions" path - used for notification policy definition creation
  contractdefinitionsPath: ${EDC_MANAGEMENT_PATH:/management/v2/contractdefinitions} # EDC management API "contractdefinitions" path - used for notification contract definitions creation
  irs:
    url: "${IRS_URL:}" # IRS Url to connect with
  discovery:
    oAuthClientId: portal # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
    timeout:
      read: PT90S # HTTP read timeout for the discovery client
      connect: PT90S # HTTP connect timeout for the discovery client
    mockEdcResult: { } # Mocked BPN Investigation results
    mockRecursiveEdcAsset: # Mocked BPN Recursive Investigation results

apiAllowedBpn: ${API_ALLOWED_BPN:BPNL00000001CRHK} # BPN value that is allowed to access IRS API

# OAuth2 JWT token parse config. This configures the structure IRS expects when parsing the IRS role of an access token.
oauth:
  resourceClaim: "resource_access" # Name of the JWT claim for roles
  irsNamespace: "Cl20-CX-IRS" # Namespace for the IRS roles
  roles: "roles" # Name of the list of roles within the IRS namespace
```

### Helm configuration IRS (values.yaml)

```yaml
#####################
# IRS Configuration #
#####################
irsUrl:  # "https://<irs-url>"
bpn:  # BPN for this IRS instance; only users with this BPN are allowed to access the API
ingress:
  enabled: false

management:
  health:
    dependencies:
      enabled: false  # Flag to determine if external service healthcheck endpoints should be checked
      urls: {}  # Map of services with corresponding healthcheck endpoint url's. Example:
        # service_name: http://service_name_host.com/health

digitalTwinRegistry:
  type: decentral  # The type of DTR. This can be either "central" or "decentral". If "decentral", descriptorEndpoint, shellLookupEndpoint and oAuthClientId is not required.
  url:  # "https://<digital-twin-registry-url>"
  descriptorEndpoint: >-
    {{ tpl (.Values.digitalTwinRegistry.url | default "") . }}/shell-descriptors/{aasIdentifier}
  shellLookupEndpoint: >-
    {{ tpl (.Values.digitalTwinRegistry.url | default "") . }}/lookup/shells?assetIds={assetIds}
  shellDescriptorTemplate: /shell-descriptors/{aasIdentifier}  # The path to retrieve AAS descriptors from the decentral DTR, must contain the placeholder {aasIdentifier}
  lookupShellsTemplate: /lookup/shells?assetIds={assetIds}  # The path to lookup shells from the decentral DTR, must contain the placeholder {assetIds}
  discoveryFinderUrl:  # "https://<discovery-finder-url>
semanticshub:
  url:  # https://<semantics-hub-url>
  pageSize: "100"  # Number of aspect models to retrieve per page
  modelJsonSchemaEndpoint: >-
    {{- if .Values.semanticshub.url }}
    {{- tpl (.Values.semanticshub.url | default "" ) . }}/{urn}/json-schema
    {{- end }}
  defaultUrns: >-
  #    urn:bamm:io.catenax.serial_part:1.0.0#SerialPart
  #    ,urn:bamm:com.catenax.single_level_bom_as_built:1.0.0#SingleLevelBomAsBuilt
  localModels:
#   Map of Base64 encoded strings of semantic models. The key must be the Base64 encoded full URN of the model.
#   Example for urn:bamm:io.catenax.serial_part:1.0.0#SerialPart:
#    dXJuOmJhbW06aW8uY2F0ZW5heC5zZXJpYWxfcGFydDoxLjAuMCNTZXJpYWxQYXJ0: ewoJIiRzY2hlbWEiOiAiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEiLAoJImRlc2NyaXB0aW9uIjogIkEgc2VyaWFsaXplZCBwYXJ0IGlzIGFuIGluc3RhbnRpYXRpb24gb2YgYSAoZGVzaWduLSkgcGFydCwgd2hlcmUgdGhlIHBhcnRpY3VsYXIgaW5zdGFudGlhdGlvbiBjYW4gYmUgdW5pcXVlbHkgaWRlbnRpZmllZCBieSBtZWFucyBvZiBhIHNlcmlhbCBudW1iZXIgb3IgYSBzaW1pbGFyIGlkZW50aWZpZXIgKGUuZy4gVkFOKSBvciBhIGNvbWJpbmF0aW9uIG9mIG11bHRpcGxlIGlkZW50aWZpZXJzIChlLmcuIGNvbWJpbmF0aW9uIG9mIG1hbnVmYWN0dXJlciwgZGF0ZSBhbmQgbnVtYmVyKSIsCgkidHlwZSI6ICJvYmplY3QiLAoJImNvbXBvbmVudHMiOiB7CgkJInNjaGVtYXMiOiB7CgkJCSJ1cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX0NhdGVuYVhJZFRyYWl0IjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJkZXNjcmlwdGlvbiI6ICJUaGUgcHJvdmlkZWQgcmVndWxhciBleHByZXNzaW9uIGVuc3VyZXMgdGhhdCB0aGUgVVVJRCBpcyBjb21wb3NlZCBvZiBmaXZlIGdyb3VwcyBvZiBjaGFyYWN0ZXJzIHNlcGFyYXRlZCBieSBoeXBoZW5zLCBpbiB0aGUgZm9ybSA4LTQtNC00LTEyIGZvciBhIHRvdGFsIG9mIDM2IGNoYXJhY3RlcnMgKDMyIGhleGFkZWNpbWFsIGNoYXJhY3RlcnMgYW5kIDQgaHlwaGVucyksIG9wdGlvbmFsbHkgcHJlZml4ZWQgYnkgXCJ1cm46dXVpZDpcIiB0byBtYWtlIGl0IGFuIElSSS4iLAoJCQkJInBhdHRlcm4iOiAiKF51cm46dXVpZDpbMC05YS1mQS1GXXs4fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXsxMn0kKSIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfS2V5Q2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkidHlwZSI6ICJzdHJpbmciLAoJCQkJImRlc2NyaXB0aW9uIjogIlRoZSBrZXkgY2hhcmFjdGVyaXN0aWMgb2YgYSBsb2NhbCBpZGVudGlmaWVyLiBBIHNwZWNpZmljIHN1YnNldCBvZiBrZXlzIGlzIHByZWRlZmluZWQsIGJ1dCBhZGRpdGlvbmFsbHkgYW55IG90aGVyIGN1c3RvbSBrZXkgaXMgYWxsb3dlZC4gUHJlZGVmaW5lZCBrZXlzICh0byBiZSB1c2VkIHdoZW4gYXBwbGljYWJsZSk6XG4tIFwibWFudWZhY3R1cmVySWRcIiAtIFRoZSBCdXNpbmVzcyBQYXJ0bmVyIE51bWJlciAoQlBOKSBvZiB0aGUgbWFudWZhY3R1cmVyLiBWYWx1ZTogQlBOLU51bW1lclxuLSBcInBhcnRJbnN0YW5jZUlkXCIgLSBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWFudWZhY3R1cmVyIGZvciB0aGUgc2VyaWFsaXplZCBpbnN0YW5jZSBvZiB0aGUgcGFydCwgZS5nLiB0aGUgc2VyaWFsIG51bWJlclxuLSBcImJhdGNoSWRcIiAtIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBiYXRjaCwgdG8gd2hpY2ggdGhlIHNlcmlhbHplZCBwYXJ0IGJlbG9uZ3Ncbi0gXCJ2YW5cIiAtIFRoZSBhbm9ueW1pemVkIHZlaGljbGUgaWRlbnRpZmljYXRpb24gbnVtYmVyIChWSU4pLiBWYWx1ZTogYW5vbnltaXplZCBWSU4gYWNjb3JkaW5nIHRvIE9FTSBhbm9ueW1pemF0aW9uIHJ1bGVzLiBOb3RlOiBJZiB0aGUga2V5IFwidmFuXCIgaXMgYXZhaWxhYmxlLCBcInBhcnRJbnN0YW5jZUlkXCIgbXVzdCBhbHNvIGJlIGF2YWlsYWJsZSBhbmQgaG9sZCB0aGUgaWRlbnRpY2FsIHZhbHVlLiIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfVmFsdWVDaGFyYWN0ZXJpc3RpYyI6IHsKCQkJCSJ0eXBlIjogInN0cmluZyIsCgkJCQkiZGVzY3JpcHRpb24iOiAiVGhlIHZhbHVlIG9mIGFuIGlkZW50aWZpZXIuIgoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9LZXlWYWx1ZUxpc3QiOiB7CgkJCQkiZGVzY3JpcHRpb24iOiAiQSBsaXN0IG9mIGtleSB2YWx1ZSBwYWlycyBmb3IgbG9jYWwgaWRlbnRpZmllcnMsIHdoaWNoIGFyZSBjb21wb3NlZCBvZiBhIGtleSBhbmQgYSBjb3JyZXNwb25kaW5nIHZhbHVlLiIsCgkJCQkidHlwZSI6ICJvYmplY3QiLAoJCQkJInByb3BlcnRpZXMiOiB7CgkJCQkJImtleSI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIlRoZSBrZXkgb2YgYSBsb2NhbCBpZGVudGlmaWVyLiAiLAoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX0tleUNoYXJhY3RlcmlzdGljIgoJCQkJCX0sCgkJCQkJInZhbHVlIjogewoJCQkJCQkiZGVzY3JpcHRpb24iOiAiVGhlIHZhbHVlIG9mIGFuIGlkZW50aWZpZXIuIiwKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9WYWx1ZUNoYXJhY3RlcmlzdGljIgoJCQkJCX0KCQkJCX0sCgkJCQkicmVxdWlyZWQiOiBbCgkJCQkJImtleSIsCgkJCQkJInZhbHVlIgoJCQkJXQoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9Mb2NhbElkZW50aWZpZXJDaGFyYWN0ZXJpc3RpYyI6IHsKCQkJCSJkZXNjcmlwdGlvbiI6ICJBIHNpbmdsZSBzZXJpYWxpemVkIHBhcnQgbWF5IGhhdmUgbXVsdGlwbGUgYXR0cmlidXRlcywgdGhhdCB1bmlxdWVseSBpZGVudGlmeSBhIHRoYXQgcGFydCBpbiBhIHNwZWNpZmljIGRhdGFzcGFjZSAoZS5nLiB0aGUgbWFudWZhY3R1cmVyYHMgZGF0YXNwYWNlKSIsCgkJCQkidHlwZSI6ICJhcnJheSIsCgkJCQkiaXRlbXMiOiB7CgkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9LZXlWYWx1ZUxpc3QiCgkJCQl9LAoJCQkJInVuaXF1ZUl0ZW1zIjogdHJ1ZQoJCQl9LAoJCQkidXJuX2JhbW1faW8ub3Blbm1hbnVmYWN0dXJpbmdfY2hhcmFjdGVyaXN0aWNfMi4wLjBfVGltZXN0YW1wIjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJwYXR0ZXJuIjogIi0/KFsxLTldWzAtOV17Myx9fDBbMC05XXszfSktKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVswLTldfDNbMDFdKVQoKFswMV1bMC05XXwyWzAtM10pOlswLTVdWzAtOV06WzAtNV1bMC05XShcXC5bMC05XSspP3woMjQ6MDA6MDAoXFwuMCspPykpKFp8KFxcK3wtKSgoMFswLTldfDFbMC0zXSk6WzAtNV1bMC05XXwxNDowMCkpPyIsCgkJCQkiZGVzY3JpcHRpb24iOiAiRGVzY3JpYmVzIGEgUHJvcGVydHkgd2hpY2ggY29udGFpbnMgdGhlIGRhdGUgYW5kIHRpbWUgd2l0aCBhbiBvcHRpb25hbCB0aW1lem9uZS4iCgkJCX0sCgkJCSJ1cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX1Byb2R1Y3Rpb25Db3VudHJ5Q29kZVRyYWl0IjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJkZXNjcmlwdGlvbiI6ICJSZWd1bGFyIEV4cHJlc3Npb24gdGhhdCBlbnN1cmVzIGEgdGhyZWUtbGV0dGVyIGNvZGUgIiwKCQkJCSJwYXR0ZXJuIjogIl5bQS1aXVtBLVpdW0EtWl0kIgoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9NYW51ZmFjdHVyaW5nQ2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkiZGVzY3JpcHRpb24iOiAiQ2hhcmFjdGVyaXN0aWMgdG8gZGVzY3JpYmUgbWFudWZhY3R1cmluZyByZWxhdGVkIGRhdGEiLAoJCQkJInR5cGUiOiAib2JqZWN0IiwKCQkJCSJwcm9wZXJ0aWVzIjogewoJCQkJCSJkYXRlIjogewoJCQkJCQkiZGVzY3JpcHRpb24iOiAiVGltZXN0YW1wIG9mIHRoZSBtYW51ZmFjdHVyaW5nIGRhdGUgYXMgdGhlIGZpbmFsIHN0ZXAgaW4gcHJvZHVjdGlvbiBwcm9jZXNzIChlLmcuIGZpbmFsIHF1YWxpdHkgY2hlY2ssIHJlYWR5LWZvci1zaGlwbWVudCBldmVudCkiLAoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5vcGVubWFudWZhY3R1cmluZ19jaGFyYWN0ZXJpc3RpY18yLjAuMF9UaW1lc3RhbXAiCgkJCQkJfSwKCQkJCQkiY291bnRyeSI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIkNvdW50cnkgY29kZSB3aGVyZSB0aGUgcGFydCB3YXMgbWFudWZhY3R1cmVkIiwKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9Qcm9kdWN0aW9uQ291bnRyeUNvZGVUcmFpdCIKCQkJCQl9CgkJCQl9LAoJCQkJInJlcXVpcmVkIjogWwoJCQkJCSJkYXRlIgoJCQkJXQoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9QYXJ0SWRDaGFyYWN0ZXJpc3RpYyI6IHsKCQkJCSJ0eXBlIjogInN0cmluZyIsCgkJCQkiZGVzY3JpcHRpb24iOiAiVGhlIHBhcnQgSUQgaXMgYSBtdWx0aS1jaGFyYWN0ZXIgc3RyaW5nLCB1c3VzYWxseSBhc3NpZ25lZCBieSBhbiBFUlAgc3lzdGVtIgoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9QYXJ0TmFtZUNoYXJhY3RlcmlzdGljIjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJkZXNjcmlwdGlvbiI6ICJQYXJ0IE5hbWUgaW4gc3RyaW5nIGZvcm1hdCBmcm9tIHRoZSByZXNwZWN0aXZlIHN5c3RlbSBpbiB0aGUgdmFsdWUgY2hhaW4iCgkJCX0sCgkJCSJ1cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX0NsYXNzaWZpY2F0aW9uQ2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkidHlwZSI6ICJzdHJpbmciLAoJCQkJImRlc2NyaXB0aW9uIjogIkEgcGFydCB0eXBlIG11c3QgYmUgcGxhY2VkIGludG8gb25lIG9mIHRoZSBmb2xsb3dpbmcgY2xhc3NlczogJ2NvbXBvbmVudCcsICdwcm9kdWN0JywgJ3NvZnR3YXJlJywgJ2Fzc2VtYmx5JywgJ3Rvb2wnLCBvciAncmF3IG1hdGVyaWFsJy4iLAoJCQkJImVudW0iOiBbCgkJCQkJInByb2R1Y3QiLAoJCQkJCSJyYXcgbWF0ZXJpYWwiLAoJCQkJCSJzb2Z0d2FyZSIsCgkJCQkJImFzc2VtYmx5IiwKCQkJCQkidG9vbCIsCgkJCQkJImNvbXBvbmVudCIKCQkJCV0KCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfUGFydFR5cGVJbmZvcm1hdGlvbkNoYXJhY3RlcmlzdGljIjogewoJCQkJImRlc2NyaXB0aW9uIjogIlRoZSBjaGFyYWN0ZXJpc3RpY3Mgb2YgdGhlIHBhcnQgdHlwZSIsCgkJCQkidHlwZSI6ICJvYmplY3QiLAoJCQkJInByb3BlcnRpZXMiOiB7CgkJCQkJIm1hbnVmYWN0dXJlclBhcnRJZCI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIlBhcnQgSUQgYXMgYXNzaWduZWQgYnkgdGhlIG1hbnVmYWN0dXJlciBvZiB0aGUgcGFydC4gVGhlIFBhcnQgSUQgaWRlbnRpZmllcyB0aGUgcGFydCAoYXMgZGVzaWduZWQpIGluIHRoZSBtYW51ZmFjdHVyZXJgcyBkYXRhc3BhY2UuIFRoZSBQYXJ0IElEIGRvZXMgbm90IHJlZmVyZW5jZSBhIHNwZWNpZmljIGluc3RhbmNlIG9mIGEgcGFydCBhbmQgdGh1cyBzaG91bGQgbm90IGJlIGNvbmZ1c2VkIHdpdGggdGhlIHNlcmlhbCBudW1iZXIuIiwKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9QYXJ0SWRDaGFyYWN0ZXJpc3RpYyIKCQkJCQl9LAoJCQkJCSJjdXN0b21lclBhcnRJZCI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIlBhcnQgSUQgYXMgYXNzaWduZWQgYnkgdGhlIG1hbnVmYWN0dXJlciBvZiB0aGUgcGFydC4gVGhlIFBhcnQgSUQgaWRlbnRpZmllcyB0aGUgcGFydCAoYXMgZGVzaWduZWQpIGluIHRoZSBjdXN0b21lcmBzIGRhdGFzcGFjZS4gVGhlIFBhcnQgSUQgZG9lcyBub3QgcmVmZXJlbmNlIGEgc3BlY2lmaWMgaW5zdGFuY2Ugb2YgYSBwYXJ0IGFuZCB0aHVzIHNob3VsZCBub3QgYmUgY29uZnVzZWQgd2l0aCB0aGUgc2VyaWFsIG51bWJlci4iLAoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX1BhcnRJZENoYXJhY3RlcmlzdGljIgoJCQkJCX0sCgkJCQkJIm5hbWVBdE1hbnVmYWN0dXJlciI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIk5hbWUgb2YgdGhlIHBhcnQgYXMgYXNzaWduZWQgYnkgdGhlIG1hbnVmYWN0dXJlciIsCgkJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfUGFydE5hbWVDaGFyYWN0ZXJpc3RpYyIKCQkJCQl9LAoJCQkJCSJuYW1lQXRDdXN0b21lciI6IHsKCQkJCQkJImRlc2NyaXB0aW9uIjogIk5hbWUgb2YgdGhlIHBhcnQgYXMgYXNzaWduZWQgYnkgdGhlIGN1c3RvbWVyIiwKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9QYXJ0TmFtZUNoYXJhY3RlcmlzdGljIgoJCQkJCX0sCgkJCQkJImNsYXNzaWZpY2F0aW9uIjogewoJCQkJCQkiZGVzY3JpcHRpb24iOiAiVGhlIGNsYXNzaWZpY2F0aW9uIG9mIHRoZSBwYXJ0IHR5cGUgYWNjb3JkaW5nIHRvIFNURVAgc3RhbmRhcmQgZGVmaW5pdGlvbiIsCgkJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfQ2xhc3NpZmljYXRpb25DaGFyYWN0ZXJpc3RpYyIKCQkJCQl9CgkJCQl9LAoJCQkJInJlcXVpcmVkIjogWwoJCQkJCSJtYW51ZmFjdHVyZXJQYXJ0SWQiLAoJCQkJCSJuYW1lQXRNYW51ZmFjdHVyZXIiLAoJCQkJCSJjbGFzc2lmaWNhdGlvbiIKCQkJCV0KCQkJfQoJCX0KCX0sCgkicHJvcGVydGllcyI6IHsKCQkiY2F0ZW5hWElkIjogewoJCQkiZGVzY3JpcHRpb24iOiAiVGhlIGZ1bGx5IGFub255bW91cyBDYXRlbmEtWCBJRCBvZiB0aGUgc2VyaWFsaXplZCBwYXJ0LCB2YWxpZCBmb3IgdGhlIENhdGVuYS1YIGRhdGFzcGFjZS4iLAoJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX0NhdGVuYVhJZFRyYWl0IgoJCX0sCgkJImxvY2FsSWRlbnRpZmllcnMiOiB7CgkJCSJkZXNjcmlwdGlvbiI6ICJBIGxvY2FsIGlkZW50aWZpZXIgZW5hYmxlcyBpZGVudGlmaWNhdGlvbiBvZiBhIHBhcnQgaW4gYSBzcGVjaWZpYyBkYXRhc3BhY2UsIGJ1dCBpcyBub3QgdW5pcXVlIGluIENhdGVuYS1YIGRhdGFzcGFjZS4gTXVsdGlwbGUgbG9jYWwgaWRlbnRpZmllcnMgbWF5IGV4aXN0LiIsCgkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfMS4wLjBfTG9jYWxJZGVudGlmaWVyQ2hhcmFjdGVyaXN0aWMiCgkJfSwKCQkibWFudWZhY3R1cmluZ0luZm9ybWF0aW9uIjogewoJCQkiZGVzY3JpcHRpb24iOiAiSW5mb3JtYXRpb24gZnJvbSBtYW51ZmFjdHVyaW5nIHByb2Nlc3MsIHN1Y2ggYXMgbWFudWZhY3R1cmluZyBkYXRlIGFuZCBtYW51ZmFjdHVyaW5nIGNvdW50cnkiLAoJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0XzEuMC4wX01hbnVmYWN0dXJpbmdDaGFyYWN0ZXJpc3RpYyIKCQl9LAoJCSJwYXJ0VHlwZUluZm9ybWF0aW9uIjogewoJCQkiZGVzY3JpcHRpb24iOiAiVGhlIHBhcnQgdHlwZSBmcm9tIHdoaWNoIHRoZSBzZXJpYWxpemVkIHBhcnQgaGFzIGJlZW4gaW5zdGFudGlhdGVkIiwKCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF8xLjAuMF9QYXJ0VHlwZUluZm9ybWF0aW9uQ2hhcmFjdGVyaXN0aWMiCgkJfQoJfSwKCSJyZXF1aXJlZCI6IFsKCQkiY2F0ZW5hWElkIiwKCQkibG9jYWxJZGVudGlmaWVycyIsCgkJIm1hbnVmYWN0dXJpbmdJbmZvcm1hdGlvbiIsCgkJInBhcnRUeXBlSW5mb3JtYXRpb24iCgldCn0=
bpdm:
  url:  # https://<bpdm-url>
  bpnEndpoint: >-
    {{- if .Values.bpdm.url }}
    {{- tpl (.Values.bpdm.url | default "") . }}/api/catena/legal-entities/{partnerId}?idType={idType}
    {{- end }}
minioUser: "minio"  # <minio-username>
minioPassword:  # <minio-password>
minioUrl: "http://{{ .Release.Name }}-minio:9000"
oauth2:
  clientId:  # <oauth2-client-id>
  clientSecret:  # <oauth2-client-secret>
  clientTokenUri:  # <oauth2-token-uri>
  jwkSetUri:  # <oauth2-jwkset-uri>
portal:
  oauth2:
    clientId:  # <portal-client-id>
    clientSecret:  # <portal-client-secret>
edc:
  controlplane:
    endpoint:
      data: ""  # <edc-controlplane-endpoint-data>
      catalog: /v2/catalog/request  # EDC consumer controlplane catalog path
      contractnegotiation: /v2/contractnegotiations  # EDC consumer controlplane contract negotiation path
      transferprocess: /v2/transferprocesses  # EDC consumer controlplane transfer process path
      statesuffix: /state  # Path of the state suffix for contract negotiation and transfer process
    request:
      ttl: PT10M  # Requests to controlplane will time out after this duration (see https://en.wikipedia.org/wiki/ISO_8601#Durations)
    provider:
      suffix: /api/v1/dsp
    catalog:
      limit: 1000  # Max number of catalog items to retrieve from the controlplane
      pagesize: 50  # Number of catalog items to retrieve on one page for pagination
    apikey:
      header: "X-Api-Key"  # Name of the EDC api key header field
      secret: ""  # <edc-api-key>
  callbackurl:
  submodel:
    request:
      ttl: PT10M  # Requests to dataplane will time out after this duration (see https://en.wikipedia.org/wiki/ISO_8601#Durations)
    urnprefix: /urn
  catalog:
    # IRS will only negotiate contracts for offers with a policy as defined in the allowedNames list.
    # If a requested asset does not provide one of these policies, a tombstone will be created and this node will not be processed.
    acceptedPolicies:
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: "ID 3.0 Trace"
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: "ID 3.1 Trace"
      - leftOperand: "PURPOSE"
        operator: "eq"
        rightOperand: R2_Traceability
      - leftOperand: "FrameworkAgreement.traceability"
        operator: "eq"
        rightOperand: "active"
      - leftOperand: "Membership"
        operator: "eq"
        rightOperand: "active"
  connectorEndpointService:
    cacheTTL: PT24H  # Time to live for ConnectorEndpointService for fetchConnectorEndpoints method cache
discovery:
  oAuthClientId: portal  # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client

ess:
  edc:
    host:  # EDC base URL - used for creation of EDC assets for ESS notifications and as sender EDC for sent notifications
  mockEdcResult:  # Map of BPNs and YES/NO strings - this configures the ESS mock response in case it called to investigate a BPN
  mockRecursiveEdcAsset:  # List of BPNs for which the special, mocked notification asset should be used
  assetsPath: /management/v3/assets  # EDC management API "assets" path - used for notification asset creation
  policydefinitionsPath: /management/v2/policydefinitions  # EDC management API "policydefinitions" path - used for notification policy definition creation
  contractdefinitionsPath: /management/v2/contractdefinitions  # EDC management API "contractdefinitions" path - used for notification contract definitions creation

oauth:
  resourceClaim: "resource_access"  # Name of the JWT claim for roles
  irsNamespace: "Cl20-CX-IRS"  # Namespace for the IRS roles
  roles: "roles"  # Name of the list of roles within the IRS namespace

config:
  # If true, the config provided below will completely replace the configmap.
  # In this case, you need to provide all required config values defined above yourself!
  # If false, the custom config will just be appended to the configmap.
  override: false
  # Provide your custom configuration here (overrides IRS Spring application.yaml)
  content:


env: []  # You can provide your own environment variables for the IRS here.
#  - name: JAVA_TOOL_OPTIONS
#    value: -Dhttps.proxyHost=1.2.3.4


#######################
# Minio Configuration #
#######################
minio:
  enabled: true
  mode: standalone
  persistence:
    size: 1Gi
  resources:
    limits:
      cpu: 1
      memory: 4Gi
    requests:
      cpu: 0.25
      memory: 4Gi
  rootUser: "minio"  # <minio-username>
  rootPassword: "minioPass"  # <minio-password>
  securityContext:
    enabled: true  # Enable to run containers as non-root. NOTE: if persistence.enabled=false then securityContext will be automatically disabled
    runAsUser: 1000  # User id of the user for the container
    runAsGroup: 3000  # Group id of the user for the container
    fsGroup: 2000  # Group id of the persistent volume mount for the container

  environment:
    MINIO_PROMETHEUS_JOB_ID: minio-actuator
    MINIO_PROMETHEUS_URL: http://prometheus:9090


############################
# Prometheus Configuration #
############################
prometheus:
  enabled: false  # ①
  rbac:
    create: false
  alertmanager:
    enabled: false
  prometheus-node-exporter:
    enabled: false
  kubeStateMetrics:
    enabled: false
  prometheus-pushgateway:
    enabled: false
  configmapReload:
    prometheus:
      enabled: false

  extraScrapeConfigs: |
    - job_name: 'spring-actuator'
      metrics_path: '/actuator/prometheus'
      scrape_interval: 5s
      static_configs:
```

1. Use this to enable or disable the monitoring components

#### Values explained

##### irs-url

The hostname where the IRS will be made available.

#### ingress

To expose the IRS service, you need to add an ingress for the default port 8080.
You can do this by adding this to ingress:

```yaml
ingress:
  enabled: true
  className: "nginx"
  annotations:
    nginx.ingress.kubernetes.io/ssl-passthrough: "false"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
  hosts:
    - host: "public.irs.hostname"
      paths:
        - path: /
          pathType: Prefix
          port: 8080
  tls:
    - hosts:
      - "public.irs.hostname"
      secretName: tls-secret
```

##### digital-twin-registry-url

The URL of the Digital Twin Registry. The IRS uses this service to fetch AAS shells.

##### discovery-finder-url

The URL of the Discovery Finder. The IRS uses this service to discover EDC to a particular BPN.

##### semantics-hub-url

The URL of the SemanticsHub. The IRS uses this service to fetch aspect schemas for payload validation.

##### bpdm-url

The URL of the BPDM service. The IRS uses this service to fetch business partner information based on BPNs.

##### oauth2-token-uri

The URL of the OAuth2 token API. Used by the IRS for token creation to authenticate with other services.

##### oauth2-jwkset-uri

The URL of the OAuth2 JWK Set. Used by the IRS to validate tokens when the IRS API is called.

##### grafana-url

The hostname where Grafana will be made available.

##### edc-controlplane-endpoint-data

The EDC consumer controlplane endpoint URL for data management, including the protocol.
If left empty, this defaults to the internal endpoint of the controlplane provided by the irs-edc-consumer Helm chart.

##### connectorEndpointService.cacheTTL

When IRS calls EDC Discovery Service to fetch endpoints for BPNL’s there is a cache mechanism between them, to improve performance.
This parameter define how long cache is maintained before it is cleared. Data is in ISO 8601.

### OAuth2 Configuration

OAuth2 protocol is used by IRS to protect the APIs and other resources. This means it is possible to configure and use any identity and access management tool that provides OAuth 2.0 functionality.

#### Semantic Model Provisioning

The IRS can retrieve semantic models in two ways:

1. via the Semantic Hub, if you provide the URL
2. via local schema files

If you activate both features, IRS will first try to resolve the models via the Hub and use the
local models as a fallback.

If you want to use local schema files, you need to provide them directly in the `values.yaml` file. Use the param `semanticsHub.localModels` to specify a map of all the local schemas.
The **key** of each entry is the `Base64` encoded URN of the model. The **value** is the `Base64` encoded content of the schema file itself. The entries will then be mounted into the IRS container and used on demand. For reference, see the example comment in the default `values.yaml`.

#### Policy store configuration

The IRS is exposing REST API to store Policies definitions.
Storage details can be configured in `application.yml` file with below fields:

```yaml
policystore:
  persistence:
    endpoint: "${MINIO_URL}" # S3 compatible API endpoint (e.g. Minio)
    accessKey: "${MINIO_ACCESS_KEY}" # S3 access key
    secretKey: "${MINIO_SECRET_KEY}" # S3 secret key
    bucketName: irs-policy-bucket # the name of the S3 bucket to be created / used by the policy store
    daysToLive: -1 # number of days to keep policies in the store, use -1 to disable cleanup
```

If no custom policies are registered via REST API, IRS will use the default one configured with `irs-edc-client.catalog.acceptedPolicies` property. IRS will only negotiate contracts for offers with policies found in Policy Store.

### Use existing EDC consumer

If you want to use an existing EDC as consumer, you need to add the management endpoint URL of this edc to `edc.controlplane.endpoint.data`.
You also have to add an ingress for the IRS EDC EDR Token callback endpoint (default port: 8181):

```yaml
ingress:
  enabled: true
  className: "nginx"
  annotations:
    nginx.ingress.kubernetes.io/ssl-passthrough: "false"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
  hosts:
    - host: "public.irs.hostname"
      paths:
        - path: /
          pathType: Prefix
          port: 8080
        - path: /internal
          port: 8181
          pathType: Prefix
  tls:
    - hosts:
      - "public.irs.hostname"
      secretName: tls-secret
```

### EDC consumer configuration

If you want to provide your own EDC consumer, add the EDC Helm Chart as dependency to your Chart.yaml. The helm chart and documentation can be found here: [tractusx-connector](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/charts/tractusx-connector)

### Secrets

This is a list of all secrets used in the deployment.

**⚠️ WARNING**\
Keep the values for these settings safe and do not publish them!

#### common-client-id

Client ID for OAuth2 provider. Request this from your OAuth2 operator.

#### common-client-secret

Client secret for OAuth2 provider. Request this from your OAuth2 operator.

#### minio-username

Login username for Minio. To be defined by you.

#### minio-password

Login password for Minio. To be defined by you.

#### edc-api-key

An API key for the EDC API. To be defined by you.

#### vault-token

The access token for the HashiCorp Vault API.

#### grafana-username

Login username for Grafana. To be defined by you.

#### grafana-password

Login password for Grafana. To be defined by you.

## Troubleshooting

### Proxy support

If you are using an HTTP(S) proxy for outgoing connections, you need to configure the IRS to use it.

```bash
JAVA_TOOL_OPTIONS=-Dhttps.proxyHost=X.X.X.X -Dhttps.proxyPort=XXXX
```

You might need to specify both `http` and `https` options, depending on your configuration.

If your proxy is requiring authentication, you can use the `.proxyUser` and `.proxyPassword` properties in addition.

### Troubleshooting FAQ

#### Minio

##### Error: "The specified bucket does not exist"

IRS tries to read data from or write to the Minio storage, but no bucket exists. This can happen if Minio is running without a persistent volume and restarts, thus losing all data.
It can also happen if the persistent volume claim is deleted / recreated.

**Proposed solution steps:**

1. Make sure Minio is configured and running correctly.
2. Restart the IRS - this will recreate the missing bucket automatically.

#### Different Job model versions maintenance

Currently, the IRS only supports one version of the Job model at a time. This means that if the Job model is changed in a newer IRS version, old models stored in minio will no longer be supported and returned from IRS endpoints. The IRS application will work as usual, old versions of Job can stay in Minio and don’t need to be removed - the IRS will simply ignore them. If you want to clear the minio from old models, the only way to achieve that is to delete them all and register new Jobs.
