---
title: TRG 2.03 - Repo structure
---

| Author               | Status | Created     | Post-History    |
|----------------------|--------|-------------|-----------------|
| Catena-X System Team | Active | 10-Nov-2022 | Initial release |

## Description

The following repository structure is recommended:

```shell
/docs
/charts
README.md
INSTALL.md
```

## Why

- The `/docs` directory should contain product related documentation for the Tractus-X product.
- The `/charts` directory must contain the Helm chart files for the Tractus-X product.
- The `README.md` file shall contain a basic product description and installation instructions (and/or reference
  to `INSTALL.md`).
- The `INSTALL.md` shall contain a detailed installation instruction for the Tractus-X product.
