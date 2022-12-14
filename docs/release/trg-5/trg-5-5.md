---
title: TRG 5.05 - Chart Values
---

| Author               | Status | Created      | Post-History    |
|----------------------|--------|--------------|-----------------|
| Catena-X System Team | Active | 10-Nov-2022  | Initial release |

## Description

Best practices for Helm chart `values.yaml` file.

## Container images

A proper section for Container images should look like this:

```yaml
image:
  registry: docker.io
  repository: bitnami/postgresql
  tag: 14.5.0-debian-11-r19
  digest: ""
  ## Specify an imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ## Example:
  ## pullSecrets:
  ##   - myRegistryKeySecretName
  ##
  pullSecrets: [ ]
  ## Set to true if you would like to see extra information on logs
  ##
```

:::caution do not use `latest` as image tag!

This might cause unexpected effects, as the Helm release could change without bumping the chart version! Also due to
security reasons you shall not use `latest` tag.

:::
