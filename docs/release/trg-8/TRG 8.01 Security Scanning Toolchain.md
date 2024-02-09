---
title: TRG 8.01 - Security Scanning Toolchain
---

| Status | Created     | Post-History                         |
|--------|-------------|--------------------------------------|
| Active | 14-Feb-2024 | Initial release                      |

## Why

Our primary aim is to improve security and define best practices across the Tractus-X ecosystem.

## Description

A security scanning toolchain is a collection of tools and processes that are used to scan software applications for security vulnerabilities. These tools can be used at various stages of the software development lifecycle (**SDLC**), from development to deployment and beyond.

### Benefits of Security Scanning Toolchain

- Reduced risk of security breaches
- Improved compliance posture
- Increased confidence in the security of software applications
- Lower costs associated with security incidents.

## Tools that we’re using

- **SAST**: open-source: CodeQL,Snyk,commercial: Veracode
- **SCA**: open-source: Snyk, commercial: Veracode
- **DAST**: open-source: Owasp ZAP, commercial: Invicti
- **IaC**: open-source: KICS
- **Secret Scanning**: open-source: GitGuardian
- **Container Scanner**: open-source: Trivy

:::info

For more detailed information please go to our [GitHub](https://github.com/eclipse-tractusx/sig-security/blob/main/security-tooling.md) page.

:::