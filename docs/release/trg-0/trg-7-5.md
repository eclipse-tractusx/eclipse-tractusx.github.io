---
title: TRG 7.05 - Legal information for distributions
---

:::caution
Proposed release date: "mandatory after": 19th of May 2023
:::

| Status | Created     | Post-History  |
|--------|-------------|---------------|
| Draft  | 13-Apr-2023 | New           |

## Why

Eclipse Tractus-X is an open source project hosted by the Eclipse Foundation licensed under the [Apache License 2.0](https://spdx.org/licenses/Apache-2.0). The legal obligations of the content must be observed in all forms of which the content is available.

The distribution form of software artifacts (often in a compiled form) generated from a project’s source code repositories must also include legal information.
The source of truth is always the [Eclipse Foundation Project Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-distribution).

## Description

License, notice and (if existing) DEPENDENCIES files, must be included in the root of every distribution artifact (e.g. JAR file). In the most general case, these files will appear in the root of distribution unit, but the exact location varies by technology type.

For content delivered as Java archive (JAR) files, for example, the legal files should be placed in the META-INF directory.

When the distribution is an individual file (e.g. JavaScript), the file must contain a header with copyright and license information, and the best effort must be undertaken to associate the file with the notices (e.g. a link to the source repository in the header).

Project teams should consult with their [Project Management Committee (PMC)](/docs/oss/contributor-committer#automotive-project-management-committee-pmc) for input and advice regarding alternate names and locations for legal documentation.

(Text from the [Eclipse Foundation Project Handbook](https://www.eclipse.org/projects/handbook/#legaldoc-distribution))
