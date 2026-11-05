---
title: Tractus-X EDC Bugfix Release 0.7.7
description: Release of a new Tractus-X EDC bugfix version
slug: new-bugfix-release-edc-077
date: 2024-11-06
hide_table_of_contents: false
authors:
  - lgblaumeiser
---

## New Bugfix Release 0.7.7 for Eclipse Tractus-X EDC

The new bugfix release 0.7.7 of the Eclipse Tractus-X EDC is now available.

The release fixes one bug:

- Issue: [tractusx-edc/1618](https://github.com/eclipse-tractusx/tractusx-edc/issues/1618)
- Pull Request: [tractusx-edc/1633](https://github.com/eclipse-tractusx/tractusx-edc/pull/1633)
- Summary: The fixed issue was a non-deterministic behavior in case of parallel EDR token refreshs which lead to the non-availability of a valid token at the consumer connector.
- You need to update if you operate a consumer EDC and initiate data transfers based on the same contract multiple times in parallel.

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2024 Cofinity-X GmbH
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
