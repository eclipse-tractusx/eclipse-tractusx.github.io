---
id: irs_admin_guide
title: Administration Guide
description: 'Administration Guide'
sidebar_position: 3
---

![Datachain kit banner](@site/static/img/DataChainKitIcon.png)

### Data Chain KIT

## System Overview

The deployment contains the components required to connect the IRS to an existing Catena-X network. This includes:

* IRS with Minio - part of the "irs-helm" Helm chart
* EDC Consumer (controlplane & dataplane) - part of the "irs-edc-consumer" Helm chart

Everything else needs to be provided externally.

![adminguide_000](https://eclipse-tractusx.github.io/item-relationship-service/docs/assets/adminguide/adminguide_000.png)

## Installation

The IRS Helm repository can be found here:
<https://eclipse-tractusx.github.io/item-relationship-service/index.yaml>

Use the latest release of the "irs-helm" chart.
It contains all required dependencies.

If you also want to set up your own EDC consumer, use the "irs-edc-consumer" chart.

Supply the required configuration properties (see chapter [Configuration](configuration.adoc#_configuration)) in a values.yaml file or override the settings directly.

### Deployment using Helm

Add the IRS Helm repository:

$ helm repo add irs <https://eclipse-tractusx.github.io/item-relationship-service>

Then install the Helm chart into your cluster:

$ helm install -f your-values.yaml irs-app irs/irs-helm

### Deployment using ArgoCD

Create a new Helm chart and use the IRS as a dependency.

```yaml
dependencies:
  - name: irs-helm
    repository: https://eclipse-tractusx.github.io/item-relationship-service
    version: 3.x.x
  - name: irs-edc-consumer # optional
    repository: https://eclipse-tractusx.github.io/item-relationship-service
    version: 1.x.x

```

Then provide your configuration as the values.yaml of that chart.

Create a new application in ArgoCD and point it to your repository / Helm chart folder.

## Configuration

Take the following template and adjust the configuration parameters (&lt;placeholders> mark the relevant spots).
You can define the URLs as well as most of the secrets yourself.

The Keycloak, DAPS and Vault configuration / secrets depend on your setup and might need to be provided externally.

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
          keycloak:
            authorization-grant-type: client_credentials
            client-id: ${KEYCLOAK_OAUTH2_CLIENT_ID} # OAuth2 client ID used to authenticate with the IAM
            client-secret: ${KEYCLOAK_OAUTH2_CLIENT_SECRET} # OAuth2 client secret used to authenticate with the IAM
        provider:
          keycloak:
            token-uri: ${KEYCLOAK_OAUTH2_CLIENT_TOKEN_URI:https://default} # OAuth2 endpoint to request tokens using the client credentials
      resourceserver:
        jwt:
          jwk-set-uri: ${KEYCLOAK_OAUTH2_JWK_SET_URI:https://default} # OAuth2 endpoint to request the JWK set

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
        #          â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ second (0-59)
        #          â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ minute (0 - 59)
        #          â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ hour (0 - 23)
        #          â”‚ â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ day of the month (1 - 31)
        #          â”‚ â”‚ â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ month (1 - 12) (or JAN-DEC)
        #          â”‚ â”‚ â”‚ â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ day of the week (0 - 7)
        #          â”‚ â”‚ â”‚ â”‚ â”‚ â”‚          (or MON-SUN -- 0 or 7 is Sunday)
        #          â”‚ â”‚ â”‚ â”‚ â”‚ â”‚
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
    instances:
      registry:
        baseConfig: default


edc:
  controlplane:
    request-ttl: ${EDC_CONTROLPLANE_REQUEST_TTL:PT10M} # How long to wait for an async EDC negotiation request to finish, ISO 8601 Duration
    endpoint:
      data: ${EDC_CONTROLPLANE_ENDPOINT_DATA:} # URL of the EDC consumer controlplane data endpoint
    provider-suffix: ${EDC_CONTROLPLANE_PROVIDER_SUFFIX:/api/v1/ids/data} # Suffix to add to data requests to the EDC provider controlplane
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
    path: ${EDC_SUBMODEL_PATH:/submodel} # The path to append to the submodel data reference endpoint
    urn-prefix: ${EDC_SUBMODEL_URN_PREFIX:/urn} # A prefix used to identify URNs correctly in the submodel endpoint address
    timeout:
      read: PT90S # HTTP read timeout for the submodel client
      connect: PT90S # HTTP connect timeout for the submodel client

  catalog:
    cache:
      enabled: true # Set to false to disable caching
      ttl: P1D # Time after which a cached Item is no longer valid and the real catalog is called instead
      maxCachedItems: 64000 # Maximum amount of cached catalog items

digitalTwinRegistry:
  descriptorEndpoint: ${DIGITALTWINREGISTRY_DESCRIPTOR_URL:} # The endpoint to retrieve AAS descriptors from the DTR, must contain the placeholder {aasIdentifier}
  shellLookupEndpoint: ${DIGITALTWINREGISTRY_SHELL_LOOKUP_URL:} # The endpoint to lookup shells from the DTR, must contain the placeholder {assetIds}
  oAuthClientId: keycloak # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
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
    #          â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ second (0-59)
    #          â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ minute (0 - 59)
    #          â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ hour (0 - 23)
    #          â”‚ â”‚ â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ day of the month (1 - 31)
    #          â”‚ â”‚ â”‚  â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ month (1 - 12) (or JAN-DEC)
    #          â”‚ â”‚ â”‚  â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ day of the week (0 - 7)
    #          â”‚ â”‚ â”‚  â”‚ â”‚ â”‚          (or MON-SUN -- 0 or 7 is Sunday)
    #          â”‚ â”‚ â”‚  â”‚ â”‚ â”‚
    scheduler: 0 0 23 * * * # How often to clear the semantic model cache
  defaultUrns: "${SEMANTICSHUB_DEFAULT_URNS:urn:bamm:io.catenax.serial_part_typization:1.0.0#SerialPartTypization}" # IDs of models to cache at IRS startup
  oAuthClientId: keycloak # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
  timeout:
    read: PT90S # HTTP read timeout for the semantic hub client
    connect: PT90S # HTTP connect timeout for the semantic hub client
  pageSize: "${SEMANTICSHUB_PAGE_SIZE:100}"

bpdm:
  bpnEndpoint: "${BPDM_URL:}" # Endpoint to resolve BPNs, must contain the placeholders {partnerId} and {idType}
  oAuthClientId: keycloak # ID of the OAuth2 client registration to use, see config spring.security.oauth2.client
  timeout:
    read: PT90S # HTTP read timeout for the bpdm client
    connect: PT90S # HTTP connect timeout for the bpdm client

apiAllowedBpn: ${API_ALLOWED_BPN:BPNL00000003CRHK}
```

### Helm configuration IRS (values.yaml)

```yaml
          labelSelector:
            matchExpressions:
              - key: app.kubernetes.io/name
                operator: DoesNotExist
          topologyKey: kubernetes.io/hostname

# Following Catena-X Helm Best Practices @url: https://catenax-ng.github.io/docs/kubernetes-basics/helm
# @url: https://github.com/helm/charts/blob/master/stable/nginx-ingress/values.yaml#L210
livenessProbe:
  failureThreshold: 6
  initialDelaySeconds: 30
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 1
readinessProbe:
  failureThreshold: 3
  initialDelaySeconds: 30
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 1

#####################
# IRS Configuration #
#####################
irsUrl:  # "https://<irs-url>"
ingress:
  enabled: false

digitalTwinRegistry:
  url:  # "https://<digital-twin-registry-url>"
  descriptorEndpoint: >-
    {{ tpl (.Values.digitalTwinRegistry.url | default "") . }}/registry/shell-descriptors/{aasIdentifier}
  shellLookupEndpoint: >-
    {{ tpl (.Values.digitalTwinRegistry.url | default "") . }}/lookup/shells?assetIds={assetIds}
semanticshub:
  url:  # https://<semantics-hub-url>
  pageSize: "100"  # Number of aspect models to retrieve per page
  modelJsonSchemaEndpoint: >-
    {{- if .Values.semanticshub.url }}
    {{- tpl (.Values.semanticshub.url | default "" ) . }}/{urn}/json-schema
    {{- end }}
  defaultUrns: >-
  #    urn:bamm:io.catenax.serial_part_typization:1.0.0#SerialPartTypization
  #    ,urn:bamm:com.catenax.assembly_part_relationship:1.0.0#AssemblyPartRelationship
  localModels:
#   Map of Base64 encoded strings of semantic models. The key must be the Base64 encoded full URN of the model.
#   Example for urn:bamm:io.catenax.serial_part_typization:1.1.1#SerialPartTypization:
#    dXJuOmJhbW06aW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uOjEuMS4xI1NlcmlhbFBhcnRUeXBpemF0aW9u: ewoJIiRzY2hlbWEiOiAiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEiLAoJInR5cGUiOiAib2JqZWN0IiwKCSJjb21wb25lbnRzIjogewoJCSJzY2hlbWFzIjogewoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX0NhdGVuYVhJZFRyYWl0IjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJwYXR0ZXJuIjogIiheWzAtOWEtZkEtRl17OH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17MTJ9JCl8KF51cm46dXVpZDpbMC05YS1mQS1GXXs4fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXs0fS1bMC05YS1mQS1GXXsxMn0kKSIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9LZXlDaGFyYWN0ZXJpc3RpYyI6IHsKCQkJCSJ0eXBlIjogInN0cmluZyIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9WYWx1ZUNoYXJhY3RlcmlzdGljIjogewoJCQkJInR5cGUiOiAic3RyaW5nIgoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX0tleVZhbHVlTGlzdCI6IHsKCQkJCSJ0eXBlIjogIm9iamVjdCIsCgkJCQkicHJvcGVydGllcyI6IHsKCQkJCQkia2V5IjogewoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfS2V5Q2hhcmFjdGVyaXN0aWMiCgkJCQkJfSwKCQkJCQkidmFsdWUiOiB7CgkJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9WYWx1ZUNoYXJhY3RlcmlzdGljIgoJCQkJCX0KCQkJCX0sCgkJCQkicmVxdWlyZWQiOiBbCgkJCQkJImtleSIsCgkJCQkJInZhbHVlIgoJCQkJXQoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX0xvY2FsSWRlbnRpZmllckNoYXJhY3RlcmlzdGljIjogewoJCQkJInR5cGUiOiAiYXJyYXkiLAoJCQkJIml0ZW1zIjogewoJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9LZXlWYWx1ZUxpc3QiCgkJCQl9LAoJCQkJInVuaXF1ZUl0ZW1zIjogdHJ1ZQoJCQl9LAoJCQkidXJuX2JhbW1faW8ub3Blbm1hbnVmYWN0dXJpbmdfY2hhcmFjdGVyaXN0aWNfMi4wLjBfVGltZXN0YW1wIjogewoJCQkJInR5cGUiOiAic3RyaW5nIiwKCQkJCSJwYXR0ZXJuIjogIi0/KFsxLTldWzAtOV17Myx9fDBbMC05XXszfSktKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVswLTldfDNbMDFdKVQoKFswMV1bMC05XXwyWzAtM10pOlswLTVdWzAtOV06WzAtNV1bMC05XShcXC5bMC05XSspP3woMjQ6MDA6MDAoXFwuMCspPykpKFp8KFxcK3wtKSgoMFswLTldfDFbMC0zXSk6WzAtNV1bMC05XXwxNDowMCkpPyIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9Qcm9kdWN0aW9uQ291bnRyeUNvZGVUcmFpdCI6IHsKCQkJCSJ0eXBlIjogInN0cmluZyIsCgkJCQkicGF0dGVybiI6ICJeW0EtWl1bQS1aXVtBLVpdJCIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9NYW51ZmFjdHVyaW5nQ2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkidHlwZSI6ICJvYmplY3QiLAoJCQkJInByb3BlcnRpZXMiOiB7CgkJCQkJImRhdGUiOiB7CgkJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLm9wZW5tYW51ZmFjdHVyaW5nX2NoYXJhY3RlcmlzdGljXzIuMC4wX1RpbWVzdGFtcCIKCQkJCQl9LAoJCQkJCSJjb3VudHJ5IjogewoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfUHJvZHVjdGlvbkNvdW50cnlDb2RlVHJhaXQiCgkJCQkJfQoJCQkJfSwKCQkJCSJyZXF1aXJlZCI6IFsKCQkJCQkiZGF0ZSIKCQkJCV0KCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9QYXJ0SWRDaGFyYWN0ZXJpc3RpYyI6IHsKCQkJCSJ0eXBlIjogInN0cmluZyIKCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9QYXJ0TmFtZUNoYXJhY3RlcmlzdGljIjogewoJCQkJInR5cGUiOiAic3RyaW5nIgoJCQl9LAoJCQkidXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX0NsYXNzaWZpY2F0aW9uQ2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkidHlwZSI6ICJzdHJpbmciLAoJCQkJImVudW0iOiBbCgkJCQkJInByb2R1Y3QiLAoJCQkJCSJyYXcgbWF0ZXJpYWwiLAoJCQkJCSJzb2Z0d2FyZSIsCgkJCQkJImFzc2VtYmx5IiwKCQkJCQkidG9vbCIsCgkJCQkJImNvbXBvbmVudCIKCQkJCV0KCQkJfSwKCQkJInVybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9QYXJ0VHlwZUluZm9ybWF0aW9uQ2hhcmFjdGVyaXN0aWMiOiB7CgkJCQkidHlwZSI6ICJvYmplY3QiLAoJCQkJInByb3BlcnRpZXMiOiB7CgkJCQkJIm1hbnVmYWN0dXJlclBhcnRJZCI6IHsKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX1BhcnRJZENoYXJhY3RlcmlzdGljIgoJCQkJCX0sCgkJCQkJImN1c3RvbWVyUGFydElkIjogewoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfUGFydElkQ2hhcmFjdGVyaXN0aWMiCgkJCQkJfSwKCQkJCQkibmFtZUF0TWFudWZhY3R1cmVyIjogewoJCQkJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfUGFydE5hbWVDaGFyYWN0ZXJpc3RpYyIKCQkJCQl9LAoJCQkJCSJuYW1lQXRDdXN0b21lciI6IHsKCQkJCQkJIiRyZWYiOiAiIy9jb21wb25lbnRzL3NjaGVtYXMvdXJuX2JhbW1faW8uY2F0ZW5heC5zZXJpYWxfcGFydF90eXBpemF0aW9uXzEuMS4xX1BhcnROYW1lQ2hhcmFjdGVyaXN0aWMiCgkJCQkJfSwKCQkJCQkiY2xhc3NpZmljYXRpb24iOiB7CgkJCQkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9DbGFzc2lmaWNhdGlvbkNoYXJhY3RlcmlzdGljIgoJCQkJCX0KCQkJCX0sCgkJCQkicmVxdWlyZWQiOiBbCgkJCQkJIm1hbnVmYWN0dXJlclBhcnRJZCIsCgkJCQkJIm5hbWVBdE1hbnVmYWN0dXJlciIsCgkJCQkJImNsYXNzaWZpY2F0aW9uIgoJCQkJXQoJCQl9CgkJfQoJfSwKCSJwcm9wZXJ0aWVzIjogewoJCSJjYXRlbmFYSWQiOiB7CgkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9DYXRlbmFYSWRUcmFpdCIKCQl9LAoJCSJsb2NhbElkZW50aWZpZXJzIjogewoJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfTG9jYWxJZGVudGlmaWVyQ2hhcmFjdGVyaXN0aWMiCgkJfSwKCQkibWFudWZhY3R1cmluZ0luZm9ybWF0aW9uIjogewoJCQkiJHJlZiI6ICIjL2NvbXBvbmVudHMvc2NoZW1hcy91cm5fYmFtbV9pby5jYXRlbmF4LnNlcmlhbF9wYXJ0X3R5cGl6YXRpb25fMS4xLjFfTWFudWZhY3R1cmluZ0NoYXJhY3RlcmlzdGljIgoJCX0sCgkJInBhcnRUeXBlSW5mb3JtYXRpb24iOiB7CgkJCSIkcmVmIjogIiMvY29tcG9uZW50cy9zY2hlbWFzL3Vybl9iYW1tX2lvLmNhdGVuYXguc2VyaWFsX3BhcnRfdHlwaXphdGlvbl8xLjEuMV9QYXJ0VHlwZUluZm9ybWF0aW9uQ2hhcmFjdGVyaXN0aWMiCgkJfQoJfSwKCSJyZXF1aXJlZCI6IFsKCQkiY2F0ZW5hWElkIiwKCQkibG9jYWxJZGVudGlmaWVycyIsCgkJIm1hbnVmYWN0dXJpbmdJbmZvcm1hdGlvbiIsCgkJInBhcnRUeXBlSW5mb3JtYXRpb24iCgldCn0=
bpdm:
  url:  # https://<bpdm-url>
  bpnEndpoint: >-
    {{ tpl (.Values.bpdm.url | default "") . }}/api/catena/legal-entities/{partnerId}?idType={idType}
minioUser: "minio"  # <minio-username>
minioPassword:  # <minio-password>
minioUrl: "http://{{ .Release.Name }}-minio:9000"
keycloak:
  oauth2:
    clientId:  # <keycloak-client-id>
    clientSecret:  # <keycloak-client-secret>
    clientTokenUri:  # <keycloak-token-uri>
    jwkSetUri:  # <keycloak-jwkset-uri>
edc:
  controlplane:
    endpoint:
      data: ""  # <edc-controlplane-endpoint-data>
    request:
      ttl: PT10M  # Requests to controlplane will time out after this duration (see https://en.wikipedia.org/wiki/ISO_8601#Durations)
    provider:
      suffix: /api/v1/ids/data
    catalog:
      limit: 1000  # Max number of catalog items to retrieve from the controlplane
      pagesize: 50  # Number of catalog items to retrieve on one page for pagination
    apikey:
      header: "X-Api-Key"  # Name of the EDC api key header field
      secret: ""  # <edc-api-key>
  submodel:
    request:
      ttl: PT10M  # Requests to dataplane will time out after this duration (see https://en.wikipedia.org/wiki/ISO_8601#Durations)
    path: /submodel
    urnprefix: /urn
  catalog:
    cache:
      enabled: true  # Set to false to disable caching
      ttl: P1D  # Time after which a cached Item is no longer valid and the real catalog is called instead
      maxCachedItems: 64000  # Maximum amount of cached catalog items

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

  environment:
    MINIO_PROMETHEUS_JOB_ID: minio-actuator
    MINIO_PROMETHEUS_URL: http://prometheus:9090


############################
# Prometheus Configuration #
############################
prometheus:
  enabled: false  # â‘ 
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
        - targets: [ '{{ .Release.Name }}-irs-helm:4004' ]

    - job_name: 'minio-actuator'
      metrics_path: /minio/v2/metrics/cluster
      static_configs:
        - targets: [ '{{ .Release.Name }}-minio:9000' ]


#########################
# Grafana Configuration #
#########################
grafana:
  enabled: false  # â‘ 
  rbac:
    create: false
  persistence:
    enabled: false

  user:  # <grafana-username>
```

1. Use this to enable or disable the monitoring components

#### Values explained

##### irs-url

The hostname where the IRS will be made available.

##### digital-twin-registry-url

The URL of the Digital Twin Registry. The IRS uses this service to fetch AAS shells.

##### semantics-hub-url

The URL of the SemanticsHub. The IRS uses this service to fetch aspect schemas for payload validation.

##### bpdm-url

The URL of the BPDM service. The IRS uses this service to fetch business partner information based on BPNs.

##### keycloak-token-uri

The URL of the Keycloak token API. Used by the IRS for token creation to authenticate with other services.

##### keycloak-jwkset-uri

The URL of the Keycloak JWK Set. Used by the IRS to validate tokens when the IRS API is called.

##### grafana-url

The hostname where Grafana will be made available.

##### edc-controlplane-endpoint-data

The EDC consumer controlplane endpoint URL for data management, including the protocol.
If left empty, this defaults to the internal endpoint of the controlplane provided by the irs-edc-consumer Helm chart.

#### Semantic Model Provisioning

The IRS can retrieve semantic models in two ways:

1. via the Semantic Hub, if you provide the URL
2. via local schema files

If you activate both features, IRS will first try to resolve the models via the Hub and use the
local models as a fallback.

If you want to use local schema files, you need to provide them directly in the `values.yaml` file. Use the param `semanticsHub.localModels` to specify a map of all the local schemas.
The **key** of each entry is the `Base64` encoded URN of the model. The **value** is the `Base64` encoded content of the schema file itself. The entries will then be mounted into the IRS container and used on demand. For reference, see the example comment in the default `values.yaml`.

### EDC consumer configuration

If you want to provide your own EDC consumer, add the following entries to your values.yaml:

```yaml
##############################
# EDC Postgres Configuration #
##############################
postgresql:
  auth:
    username: edc
    database: edc
    postgresPassword: <postgres-admin-password>
    password: <postgres-password>

##################################
# EDC Controlplane Configuration #
##################################
edc-controlplane:
  ingresses:
    - enabled: true
      hostname: "<controlplane-url>"
      annotations:
        nginx.ingress.kubernetes.io/ssl-passthrough: "false"
        nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
        nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
      endpoints:
        - protocol
      className: ""
      tls:
        - hosts:
            - "<controlplane-url>"
          secretName: tls-secret
      certManager:
        issuer: ""
        clusterIssuer: ""

  edc:
    receiver:
      callback:
        url: "http://{{ .Release.Name }}-irs-helm:8181/internal/endpoint-data-reference"  # IRS EDC callback URL, e.g. http://app-irs-helm:8181/internal/endpoint-data-reference
    postgresql:
      user: edc
      password: <postgres-password>
    transfer:
      proxy:
        token:
          verifier:
            publickey:
              alias: <daps-certificate-name>
          signer:
            privatekey:
              alias: <daps-privatekey-name>
    api:
      auth:
        key: "<edc-api-key>"
    controlplane:
      url: "https://<controlplane-url>"
    dataplane:
      url: "https://<dataplane-url>"
  configuration:
    properties: |-
      edc.oauth.client.id=<daps-client-id>
      edc.oauth.private.key.alias=<daps-privatekey-name>
      edc.oauth.provider.jwks.url=<daps-jwks-url>
      edc.oauth.certificate.alias=<daps-certificate-name>
      edc.oauth.token.url=<daps-token-url>
      edc.vault.hashicorp.url=<vault-url>
      edc.vault.hashicorp.token=<vault-token>
      edc.vault.hashicorp.api.secret.path=<vault-secret-store-path>
      edc.data.encryption.keys.alias=<daps-privatekey-name>
      edc.data.encryption.algorithm=NONE

###############################
# EDC Dataplane Configuration #
###############################
edc-dataplane:
  edc:
    api:
      auth:
        key: "<edc-api-key>"
  ## Ingress declaration to expose the network service.
  ingresses:
    - enabled: true
      hostname: "<dataplane-url>"
      annotations:
        nginx.ingress.kubernetes.io/ssl-passthrough: "false"
        nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
        nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
      endpoints:
        - public
      className: "nginx"
      tls:
        - hosts:
            - "<dataplane-url>"
          secretName: tls-secret
      certManager:
        issuer: ""
        clusterIssuer: ""

  configuration:
    properties: |-
      edc.oauth.client.id=<daps-client-id>
      edc.oauth.private.key.alias=<daps-privatekey-name>
      edc.oauth.provider.audience=idsc:IDS_CONNECTORS_ALL
      edc.oauth.provider.jwks.url=<daps-jwks-url>
      edc.oauth.certificate.alias=<daps-certificate-name>
      edc.oauth.token.url=<daps-token-url>
      edc.vault.hashicorp.url=<vault-url>
      edc.vault.hashicorp.token=<vault-token>
      edc.vault.hashicorp.api.secret.path=<vault-secret-store-path>
```

#### Values explained

EDC requires a DAPS instance to function correctly. For more information on this, please refer to the [DAPS](https://github.com/catenax-ng/product-DAPS) or the [EDC](https://github.com/catenax-ng/product-edc) documentation.

##### controlplane-url

The hostname where the EDC consumer controlplane will be made available.

##### dataplane-url

The hostname where the EDC consumer dataplane will be made available.

##### vault-url

The base URL of the Vault instance.
EDC requires a running instance of HashiCorp Vault to store the DAPS certificate and private key.

##### vault-secret-store-path

The path to the secret store in Vault where the DAPS certificate and key can be found.

Example: /v1/team-name

##### daps-certificate-name

The name of the DAPS certificate in the Vault.

Example: irs-daps-certificate

##### daps-privatekey-name

The name of the DAPS private key in the Vault.

Example: irs-daps-private-key

##### daps-client-id

The DAPS client ID.

##### daps-jwks-url

The URL of the DAPS JWK Set.

Example: <https://daps-hostname/.well-known/jwks.json>

##### daps-token-url

The URL of the DAPS token API.

Example: <https://daps-hostname/token>

### Secrets

This is a list of all secrets used in the deployment.

**âš ï¸ WARNING**\
Keep the values for these settings safe and do not publish them!

#### postgres-admin-password

Database password for the **postgres** user. To be defined by you.

#### postgres-password

Database password for the application user (default username: **edc**). To be defined by you.

#### keycloak-client-id

Client ID for Keycloak. Request this from your Keycloak operator.

#### keycloak-client-secret

Client secret for Keycloak. Request this from your Keycloak operator.

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

You might need to specify both `http` and `https` options, dependending on your configuration.

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

Currently, the IRS only supports one version of the Job model at a time. This means that if Job model is changed, old models stored in minio will no longer be supported and returned from IRS endpoints. The IRS application will work as usual, old versions of Job can stay in the minio and donâ€™t need to be removed - the IRS will simply ignore them. If you want to clear the minio from old models - the only way to achieve that is to delete them all and register a new Jobs.
