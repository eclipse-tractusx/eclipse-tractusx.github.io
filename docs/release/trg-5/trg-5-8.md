---
title: TRG 5.08 - Product Helm Chart
---

| Author               | Status | Created      | Post-History |
|----------------------|--------|--------------|--------------|
| Catena-X System Team | Draft  | 10-Jan-2023 | n/a          |

## Description

A "Product Helm Chart" is a released helm chart that contains all the components of a product __ready to deploy__. This can either be achieved by __creating a single Helm chart__ for the product or by __combining the Helm charts__ of the different components into a single chart using dependencies.

## Product Helm Chart rules

- name of the Chart should be just the `product-name` without prefix or suffix (similar to the [leading product repository](https://eclipse-tractusx.github.io/docs/release/trg-2/trg-2-4))
- values file should contain all available variables (even from subcharts) with default values and comments about what they do
- [helm install](https://helm.sh/docs/helm/helm_install/#helm-install) command should successfully install the chart to any supported Kubernetes version cluster (without overwriting default values)
- [helm test](https://helm.sh/docs/helm/helm_test/) runs without errors
- create a single helm chart for the whole product or combine charts into a single one using [dependencies](https://helm.sh/docs/helm/helm_dependency/#helm-dependency) feature

## Why

Having a single source for Helm chart makes it easier to test and deploy the product and reduces the complexity of installing backend/frontend/ulility applications separately.
