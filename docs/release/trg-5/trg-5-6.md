---
title: TRG 5.06 - Application Configuration
---

| Author               | Status | Created     | Post-History    |
|----------------------|--------|-------------|-----------------|
| Catena-X System Team | Active | 30-Nov-2022 | Initial release |

## Description

Every configuration aspect of your application has to be configurable for your Helm Chart.

## Why

The application will be deployed in different environments and application operation must be able to adjust the
deployment to environmental needs.

Examples for configurable items:

- Ingress class, URLs, TLS configuration, etc.
- Resource annotations and labels
- Signing keys
- Database connection strings
- Secrets (with empty values!)
- Persistent Storage Claims
- Environment variables (e.g. for application configuration)
- ...

## Don'ts

Required application rebuild for configuration (e.g. `applications.yaml` without the possibility to overwrite values via
env) changes are not expected. The application should be configurable and installable using the Helm chart.
