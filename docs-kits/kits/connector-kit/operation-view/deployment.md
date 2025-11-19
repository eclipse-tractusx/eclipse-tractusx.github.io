---
sidebar_position: 2
title: Tractus‑X Connector deployment
description: Complete step-by-step deployment guide for Tractus-X Connector
id: deployment
---

**Audience:** Ops engineers deploying a production‑ready Tractus‑X Connector on Kubernetes with Helm. Also suitable for testing on Minikube, Docker Desktop, or kind.

**What you get:** Complete end‑to‑end deployment process including:

- controlplane
- dataplane
- PostgreSQL
- Vault
- etc.
and a per‑value explanation table (what it is, example, and where to get it).

## Glossary (quick)

- **EDC**: Eclipse Dataspace Components (Tractus‑X Connector)
- **Control Plane (CP)**: Admin/negotiation/contract side of the connector
- **Data Plane (DP)**: Moves the data
- **BDRS**: BPN ↔ DID Resolution Service
- **DID**: Decentralized Identifier
- **Vault**: HashiCorp Vault for secrets
- **CP Mgmt API key**: `X-Api-Key` header used by the CP management API

## Prerequisites

Before starting the deployment, ensure you have:

### Infrastructure Requirements

- **Kubernetes** cluster (version 1.27+)
- `kubectl` configured and connected to your cluster
- **Helm 3** installed on your workstation
- A dedicated **namespace** for the connector
- **DNS hostnames** configured for controlplane & dataplane endpoints
- **Ingress controller** (e.g., NGINX) with external IP/LoadBalancer
- **cert‑manager** with a working `ClusterIssuer` for TLS certificates

### Data Storage

- **PostgreSQL** database (can be deployed via chart or use external instance)
- **HashiCorp Vault** with KV v2 secrets engine enabled

### Network Access

- Vault must be reachable from the Kubernetes cluster
- External services (BDRS, DIM) must be accessible from the cluster
- DNS resolution working for all configured hostnames

:::tip Quick validation checks

```sh
kubectl version --short
helm version
kubectl get ns
kubectl get ingressclass
kubectl get clusterissuer
```

:::

:::caution Vault version
Avoid **Vault 1.18.1** (known incompatibility). Use a different minor/patch release.
:::

## Add Helm repositories

:::info
TBD do we only have dev?
:::

```sh
# Dev repo (latest)
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev

# HashiCorp Vault repo (if you install Vault via Helm)
helm repo add hashicorp https://helm.releases.hashicorp.com

helm repo update

# Discover the connector chart & versions
helm search repo tractusx-dev --versions | grep -i connector || true
```

:::note Chart name
The Tractus‑X Connector Helm chart is typically published as **`tractusx-connector`** in the Tractus‑X repos. Always check `helm search` for the current name/version.
:::

## Create namespace & base infrastructure

```sh
# choose your namespace
export NS=tx-edc-customer
kubectl create ns $NS

# (optional) install cert-manager if you don’t have it yet
helm upgrade --install cert-manager jetstack/cert-manager   --namespace cert-manager   --create-namespace   --set installCRDs=true

# ensure you have a ClusterIssuer referenced later in ingress annotations
kubectl get clusterissuer
```

:::tip DNS
Create A/AAAA or CNAME records so your controlplane & dataplane hostnames resolve to your Ingress controller’s public IP.
:::

## (Option A) Install a Vault instance quickly (POC)

:::info
Skip if you already operate Vault. For production, prefer a hardened Vault with HA + auto‑unseal.
:::

```sh
helm upgrade --install vault hashicorp/vault   --namespace vault   --create-namespace   --set "server.dev.enabled=true"  # POC only!

# Port-forward UI if you want to sign in locally
kubectl -n vault port-forward svc/vault 8200:8200

# Dev mode exposes root token in logs; in prod create a limited token / Kubernetes auth instead.
```

Enable **KV v2** and create the secret paths used in this guide (adjust to your naming):

```sh
# login (dev mode prints the token in pod logs); in prod use a proper token
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=<YOUR_VAULT_TOKEN>

# ensure KV v2 mounted at `puris/`
vault secrets enable -path=puris kv-v2 || true

# environment shared values
vault kv put puris/data/environment   bdrs-url="https://bdrs.example.net"   dim-url="https://dim.example.net"   vault-url="http://vault.vault:8200"  # in-cluster address

# customer-specific values
# generate a strong API key
export EDC_API_KEY=$(openssl rand -hex 32)

vault kv put puris/data/customer   bpnl="BPNL000000000XYZ"   did-url="did:web:example.com"   dim-idp-token-url="https://keycloak.example.net/realms/dim/protocol/openid-connect/token"   dim-idp-client-id="dim-client"

vault kv put puris/data/customer/edc   api-key="$EDC_API_KEY"   hostname-internet="cp.example.com"   hostname-intranet="cp-int.example.lan"

# PostgreSQL secrets (if chart installs Postgres for you)
vault kv put puris/data/customer/edc/postgres   database="edc"   user="edc"   password="change-me-strong"
```

:::danger Don’t store the Vault **token** inside Vault
You can’t fetch the token **from** Vault to authenticate **to** Vault. For POCs, pass a static token in the Helm values or (recommended) configure **Kubernetes Auth** with a dedicated Role so the EDC pod authenticates using its service account. See the advanced auth note below.
:::

## Generate DP token keys and load them into Vault

The dataplane proxy issues/verifies JWTs. Create a keypair and store the PEMs under aliases you’ll reference in `values.yaml`.

```sh
# Generate a 2048-bit RSA keypair
openssl genrsa -out dataplane_proxy_private.pem 2048
openssl rsa -in dataplane_proxy_private.pem -pubout -out dataplane_proxy_public.pem

# Store PEMs under the aliases referenced later
vault kv put puris/data/customer/edc   DATAPLANE_PROXY_PRIVATE_KEY=@dataplane_proxy_private.pem   DATAPLANE_PROXY_PUBLIC_KEY=@dataplane_proxy_public.pem
```

:::tip Key format
PEM‑encoded RSA keys are widely used and work well with the EDC dataplane proxy token signer/verifier.
:::

---

## Complete example `values.yaml` (split by services)

> Copy this to `values.customer.yaml`, then adapt placeholders or Vault paths to your environment.

```yaml title="values.customer.yaml"
install:
  postgresql: true   # set false to use external DB
  vault: false       # set true if you want the chart to install Vault (POC only)

participant:
  # -- BPN Number
  id: <path:puris/data/customer#bpnl>

controlplane:
  # -- endpoints of the control plane
  endpoints:
    management:
      authKey: <path:puris/data/customer/edc#api-key>
  bdrs:
    # time that a cached BPN/DID resolution map is valid in seconds, default is 10 min
    cache_validity_seconds: 0
    server:
      # URL of the BPN/DID Resolution Service - required:
      url: <path:puris/data/environment#bdrs-url>
  # Temporarily disable policy validation (interop testing). Enable in prod.
  policy:
    validation:
      enabled: false
  resources:
    requests:
      cpu: "20m"
      memory: "256Mi"
    limits:
      cpu: "500m"
      memory: "256Mi"
  ## Ingress declaration to expose the network service.
  ingresses:
    ## Public / Internet facing Ingress
    - enabled: true
      hostname: <path:puris/data/customer/edc#hostname-internet>
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
      endpoints:
        - protocol
        - management
      className: "nginx"
      tls:
        enabled: true
        secretName: tls-secret-edc-customer-controlplane
    ## Intranet or restricted Ingress for control endpoint only
    - enabled: true
      hostname: <path:puris/data/customer/edc#hostname-intranet>
      endpoints:
        - control
      className: "nginx"
      tls:
        enabled: false
  # Java Util Logging
  logging: |-
    .level=DEBUG
    org.eclipse.edc.level=ALL
    handlers=java.util.logging.ConsoleHandler
    java.util.logging.ConsoleHandler.formatter=java.util.logging.SimpleFormatter
    java.util.logging.ConsoleHandler.level=ALL
    java.util.logging.SimpleFormatter.format=[%1$tY-%1$tm-%1$td %1$tH:%1$tM:%1$tS] [%4$-7s] %5$s%6$s%n
  env:
    EDC_CATALOG_CACHE_EXECUTION_ENABLED: false
    # Enable only if you must interoperate with DCP 0.8 connectors
    EDC_DCP_V08_FORCED: true

# Identity and Token Provider
iatp:
  # Decentralized IDentifier of your company/wallet
  id: <path:puris/data/customer#did-url>
  # -- Trusted issuers for VC verification
  trustedIssuers:
    - <path:puris/data/environment#trusted-issuer-1>
  sts:
    dim:
      url: <path:puris/data/environment#dim-url>
    oauth:
      token_url: <path:puris/data/customer#dim-idp-token-url>
      client:
        id: <path:puris/data/customer#dim-idp-client-id>
        # secret_alias points to the KEY inside the Vault secret
        secret_alias: "CUSTOMER_EDC/CLIENT_SECRET"

# Data Plane
dataplane:
  endpoints:
    proxy:
      authKey: <path:puris/data/customer/edc#api-key>

  token:
    signer:
      privatekey_alias: DATAPLANE_PROXY_PRIVATE_KEY
    verifier:
      publickey_alias: DATAPLANE_PROXY_PUBLIC_KEY

  resources:
    requests:
      cpu: "20m"
      memory: "256Mi"
    limits:
      cpu: "500m"
      memory: "256Mi"

  ingresses:
    - enabled: true
      hostname: <path:puris/data/customer/edc#hostname-internet>
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
      endpoints:
        - public
      className: "nginx"
      tls:
        enabled: true
        secretName: tls-secret-edc-customer-dataplane

  logging: |-
    .level=DEBUG
    org.eclipse.edc.level=ALL
    handlers=java.util.logging.ConsoleHandler
    java.util.logging.ConsoleHandler.formatter=java.util.logging.SimpleFormatter
    java.util.logging.ConsoleHandler.level=ALL
    java.util.logging.SimpleFormatter.format=[%1$tY-%1$tm-%1$td %1$tH:%1$tM:%1$tS] [%4$-7s] %5$s%6$s%n

# PostgreSQL (if installed by this chart)
postgresql:
  image:
    repository: bitnamilegacy/postgresql
    tag: 16.2.0-debian-12-r10
  jdbcUrl: "jdbc:postgresql://{{ .Release.Name }}-postgresql:5432/<path:puris/data/customer/edc/postgres#database>"
  primary:
    persistence:
      enabled: true
      size: 2Gi
    resources:
      requests:
        cpu: "5m"
        memory: "128Mi"
      limits:
        cpu: "200m"
        memory: "128Mi"
  readReplicas:
    persistence:
      enabled: true
  auth:
    database: <path:puris/data/customer/edc/postgres#database>
    username: <path:puris/data/customer/edc/postgres#user>
    password: <path:puris/data/customer/edc/postgres#password>

# HashiCorp Vault connection for the EDC runtime
vault:
  hashicorp:
    enabled: true
    url: <path:puris/data/environment#vault-url>
    token: "<YOUR_VAULT_TOKEN_HERE>"  # or use Kubernetes Auth (recommended)
    timeout: 30
    healthCheck:
      enabled: true
      standbyOk: true
    paths:
      secret: /v1/puris
      health: /v1/sys/health
```

:::warning Policy validation
`controlplane.policy.validation.enabled: false` is for interop/testing. **Enable it in production** once your policies are compliant.
:::

## Parameter reference — what to set & where to get it

### `participant`

| Key              | Description                             | Example                             | Where to get it                                             |
|------------------|-----------------------------------------|-------------------------------------|-------------------------------------------------------------|
| `participant.id` | Your **BPNL** (Business Partner Number) | `BPNL000000000XYZ` (via Vault path) | Catena‑X Portal / your company master data (store in Vault) |

### `controlplane`

| Key                            | Description                                  | Example                                  | Where to get it                                      |
|--------------------------------|----------------------------------------------|------------------------------------------|------------------------------------------------------|
| `endpoints.management.authKey` | API key for **Management API** (`X-Api-Key`) | `hex 32+ chars` via `<path:...#api-key>` | Generate with `openssl rand -hex 32`, store in Vault |
| `bdrs.server.url`              | BPN ↔ DID resolution service URL             | `https://bdrs.example.net`               | Provided by your environment operator                |
| `bdrs.cache_validity_seconds`  | BDRS cache TTL (seconds)                     | `0` (disabled)                           | Use `0` during testing; set to e.g. `600` in prod    |
| `ingresses[].hostname`         | Public DNS names for CP                      | `cp.example.com`, `cp-int.example.lan`   | Your DNS                                             |
| `ingresses[].annotations`      | cert‑manager issuer                          | `letsencrypt-prod`                       | Your cert‑manager setup                              |
| `env.EDC_DCP_V08_FORCED`       | Force DCP 0.8 compatibility                  | `true/false`                             | Only if you interoperate with older stacks           |

### `iatp`

| Key                             | Description                           | Example                            | Where to get it                           |
|---------------------------------|---------------------------------------|------------------------------------|-------------------------------------------|
| `id`                            | Your organization DID                 | `did:web:example.com`              | From your wallet / DID method             |
| `trustedIssuers[]`              | Trusted VC issuers                    | e.g., `did:web:trusted.issuer.net` | From your network’s trust list            |
| `sts.dim.url`                   | DIM/STS endpoint                      | `https://dim.example.net`          | Provided by your operator                 |
| `sts.oauth.token_url`           | Token endpoint for client credentials | Keycloak/OIDC token URL            | From your IdP (Keycloak)                  |
| `sts.oauth.client.id`           | OAuth2 client ID                      | `dim-client`                       | From IdP client registration              |
| `sts.oauth.client.secret_alias` | Vault key for client secret           | `CUSTOMER_EDC/CLIENT_SECRET`       | Put client secret under that key in Vault |

### `dataplane`

| Key                              | Description                        | Example                       | Where to get it                |
|----------------------------------|------------------------------------|-------------------------------|--------------------------------|
| `endpoints.proxy.authKey`        | DP proxy API key                   | same as CP key                | Generate once, reuse via Vault |
| `token.signer.privatekey_alias`  | Vault key for signing private key  | `DATAPLANE_PROXY_PRIVATE_KEY` | Write PEM to Vault             |
| `token.verifier.publickey_alias` | Vault key for verifying public key | `DATAPLANE_PROXY_PUBLIC_KEY`  | Write PEM to Vault             |
| `ingresses[].hostname`           | Public DNS for DP                  | `dp.example.com`              | Your DNS                       |

### `postgresql`

| Key                        | Description | Example                            | Where to get it                                         |
|----------------------------|-------------|------------------------------------|---------------------------------------------------------|
| `auth.database`            | DB name     | `edc`                              | In Vault; created by chart if `install.postgresql=true` |
| `auth.username`            | DB user     | `edc`                              | In Vault or chart                                       |
| `auth.password`            | DB password | strong secret                      | In Vault                                                |
| `jdbcUrl`                  | JDBC URL    | `jdbc:postgresql://<svc>:5432/edc` | Use cluster DNS name of Postgres service                |
| `primary.persistence.size` | PVC size    | `2Gi`                              | Based on expected catalog size                          |

### `vault.hashicorp`

| Key            | Description                   | Example                   | Where to get it                 |
|----------------|-------------------------------|---------------------------|---------------------------------|
| `url`          | Vault URL reachable from pods | `http://vault.vault:8200` | In‑cluster service URL          |
| `token`        | **If using token auth (POC)** | paste token               | From your Vault (avoid in prod) |
| `paths.secret` | Base path for KV v2 API       | `/v1/puris`               | Matches `kv-v2` mount path      |
| `paths.health` | Health endpoint path          | `/v1/sys/health`          | Default                         |

:::tip Kubernetes Auth (recommended)
For production, enable Vault **Kubernetes Auth** and map the EDC service account to a Vault Role that grants read access to the required KV paths. Then configure the chart (or pod) to use JWT auth instead of a static token (e.g., via extra env vars or a Vault Agent sidecar). This avoids distributing long‑lived tokens.
:::

## Install/upgrade the connector

```sh
# Stable
helm upgrade --install tx-edc tractusx/tractusx-connector   -n $NS   -f values.customer.yaml

# Or: Dev
helm upgrade --install tx-edc tractusx-dev/tractusx-connector   -n $NS   -f values.customer.yaml

# Watch pods
kubectl -n $NS get pods -w
```

:::note Release name
The Helm **release name** here is `tx-edc`. It prefixes Kubernetes resources and may be referenced in templated fields like the Postgres service name.
:::

## Validate the deployment

### Check Ingress & certs

```sh
kubectl -n $NS get ingress
kubectl -n $NS describe ingress <name>
```

### Check pod health

```sh
kubectl -n $NS get pods
kubectl -n $NS logs deploy/tx-edc-controlplane -f --tail=200
kubectl -n $NS logs deploy/tx-edc-dataplane -f --tail=200
```

### Hit health endpoints (adjust hostnames and keys)

```sh
# Controlplane health
curl -s https://cp.example.com/api/check/health

# Management API (requires X-Api-Key)
curl -s https://cp.example.com/api/management -H "X-Api-Key: $EDC_API_KEY" | jq .

# Dataplane proxy health
curl -s https://dp.example.com/api/check/health
```

:::tip 401/403 on Management API
Ensure `controlplane.endpoints.management.authKey` matches what you send in `X-Api-Key` and that you’re calling the **management** endpoint hostname/Ingress.
:::

## Common pitfalls & hardening

- **Don’t disable policy validation** in production
- **Restrict Management API**: expose only internally (private ingress), or IP‑allowlist, or mTLS/API gateway. Never expose it publicly without controls.
- **Rotate your API key** regularly; store in Vault
- **Set sensible resources & HPA** for CP/DP
- **TLS everywhere** for internet‑facing ingresses; use cert‑manager with a proper `ClusterIssuer`
- **NetworkPolicies** to limit DB/Vault access from CP/DP only
- **Back up** Postgres and Vault

## Post-Deployment Steps

### 1. Verify Full Functionality

```sh
# Test catalog endpoint
curl -s https://cp.example.com/api/management/v2/catalog/request \
  -H "X-Api-Key: $EDC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"counterPartyAddress": "https://other-connector.example.com/api/v1/dsp"}'

# Check dataplane token endpoint
curl -s https://dp.example.com/api/public \
  -H "Authorization: Bearer <test-token>"
```

### 2. Register Your Connector

- Register the connector in your Catena-X portal/onboarding workflow
- Obtain necessary certificates and credentials
- Configure your Business Partner Number (BPNL) in the system

### 3. Configure Data Assets and Policies

- Define your data assets using the Management API
- Set up access policies and contract definitions
- Test contract negotiation with a partner connector

### 4. Production Readiness Checklist

- [ ] Enable policy validation (`controlplane.policy.validation.enabled: true`)
- [ ] Implement proper monitoring and alerting
- [ ] Set up log aggregation
- [ ] Configure backup procedures for PostgreSQL and Vault
- [ ] Review and harden security settings
- [ ] Test disaster recovery procedures
- [ ] Document operational procedures for your team

### 5. Monitoring and Maintenance

- Monitor connector health endpoints regularly
- Set up alerts for certificate expiration
- Plan for regular updates and security patches
- Monitor resource usage and scale as needed

## Troubleshooting Common Issues

### Pod Startup Issues

```sh
# Check pod status and events
kubectl -n $NS describe pod <pod-name>
kubectl -n $NS get events --sort-by='.lastTimestamp'

# Check resource constraints
kubectl -n $NS top pods
```

**Common causes:**

- Insufficient resources (CPU/memory limits too low)
- Vault connection failures
- Database connection issues
- Missing or incorrect secrets

### Vault Connection Problems

```sh
# Test Vault connectivity from within cluster
kubectl -n $NS run vault-test --rm -it --image=curlimages/curl -- \
  curl -s http://vault.vault:8200/v1/sys/health

# Check Vault token validity
export VAULT_ADDR=http://127.0.0.1:8200
vault auth -method=token token=$VAULT_TOKEN
vault kv list puris/data/
```

### Certificate Issues

```sh
# Check certificate status
kubectl -n $NS describe certificate
kubectl -n $NS describe certificaterequest

# Force certificate renewal
kubectl -n $NS delete certificate <cert-name>
```

### API Access Problems

- **401 Unauthorized**: Check API key matches between Vault and request headers
- **404 Not Found**: Verify ingress configuration and DNS resolution
- **503 Service Unavailable**: Check pod health and service endpoints

## Additional Resources

### Useful Commands for Operations

```sh
# Scale controlplane/dataplane
kubectl -n $NS scale deployment tx-edc-controlplane --replicas=2
kubectl -n $NS scale deployment tx-edc-dataplane --replicas=3

# Update configuration
helm upgrade tx-edc tractusx-dev/tractusx-connector -n $NS -f values.customer.yaml

# Backup database
kubectl -n $NS exec deployment/tx-edc-postgresql -- pg_dump -U edc edc > backup.sql

# View logs with filtering
kubectl -n $NS logs deployment/tx-edc-controlplane | grep ERROR
kubectl -n $NS logs deployment/tx-edc-dataplane --tail=100 -f
```

### Performance Tuning

- Monitor JVM heap usage and adjust memory limits accordingly
- Use connection pooling for database connections
- Configure appropriate timeout values for external service calls
- Consider using persistent volumes for better I/O performance

### Security Best Practices

- Regularly rotate API keys and certificates
- Use network policies to restrict pod-to-pod communication
- Enable audit logging for all API calls
- Implement proper backup and disaster recovery procedures
- Keep all components updated with latest security patches
