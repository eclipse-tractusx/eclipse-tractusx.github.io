# KIT Templates

This folder contains the official KIT templates for the Eclipse Tractus-X ecosystem.
Choose the template that matches your KIT's current maturity level.

> **Before you start**, read the [KIT Lifecycle documentation](https://eclipse-tractusx.github.io/documentation/kit-lifecycle) to understand which level applies to your KIT.

---

## Available Templates

### [Sandbox / MVP](./sandbox/)

**Use this template when** your KIT is in its early stages — a proof of concept, a minimum viable product, or a new idea you want to validate with the community.

| | |
|---|---|
| **Maturity level** | Sandbox / MVP |
| **Requirements** | [KIT Lifecycle — Sandbox Level](https://eclipse-tractusx.github.io/documentation/kit-lifecycle#-1-sandbox-level-mvp-kit) |
| **Included views** | Adoption View, Development View, Changelog |
| **Word template** | [`kit-template-sandbox.docx`](./sandbox/kit-template-sandbox.docx) |

---

### [Graduated](./graduated/)

**Use this template when** your KIT has passed the Sandbox phase and is ready to be published as a fully structured, production-grade KIT.

| | |
|---|---|
| **Maturity level** | Graduated |
| **Requirements** | [KIT Lifecycle — Graduated Level](https://eclipse-tractusx.github.io/documentation/kit-lifecycle#-2-graduated-kit) |
| **Included views** | Adoption View, Development View, Operations View, Documentation, Industry Extensions, Success Stories, Changelog |
| **Word template** | [`kit-template-graduated.docx`](./graduated/kit-template-graduated.docx) |

---

## How to Use a Template

1. **Copy** the appropriate template folder into `docs-kits/kits/`:
   ```bash
   cp -r docs-kits/kit-template/sandbox docs-kits/kits/<kit-id>-kit
   ```
2. **Replace** all `<kit-id>` placeholders with your actual KIT identifier.
3. **Follow** the `README.md` inside the chosen template for detailed setup steps.
4. **Delete** the template `README.md` before opening a pull request.

---

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
