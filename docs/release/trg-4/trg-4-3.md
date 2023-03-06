---
title: TRG 4.03 - Non-root container
---

| Status | Created      | Post-History                     |
|--------|--------------|----------------------------------|
|        | 14-Sept-2022 | Draft                            |
| Active | 29-Dec-2022  | Initial Release                  |

## Description

For security reasons a container is not allowed to run with root privileges.

## Why

To make sure that a compromised container doesn't have root permissions on the underlying infrastructure and has limited ways of manipulating the compromised container itself. A non-root user might be able to break out of the application code but then is still bound by the user permimssions.

## Implementation

The container's __Dockerfile__ and the __Pod resouce file (yaml)__ has to be modified to be able to run as a non-root user.

- Modify the image's Dockerfile with a `RUN` command that adds a non-root user and a `USER` command that specifies which user runs the container on startup. The example below can be modified for specific needs/requirements.

```Dockerfile
#Pull the base image as Ubuntu
FROM ubuntu:latest

#Add a user with userid 8877 and name nonroot
RUN useradd −u 8877 nonroot

#Run Container as nonroot
USER nonroot
```

- Modify the [Pod's or Deployment's configuration](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container) by adding `runAsUser` field for both the pod's and container's securityContext section. Also set the `allowPrivilegeEscalation` to `false` on the container's securityContext. See the example below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  securityContext:
    runAsUser: 1000 # SPECIFY USER ID HERE
  containers:
  - name: example-container
    image: gcr.io/google-samples/node-hello:1.0
    securityContext:
      runAsUser: 1000 # SPECIFY USER ID HERE
      allowPrivilegeEscalation: false # SET THIS TO FALSE
```
