---
slug: security-office-hour-2024-02-29
title: Security Office Hour 2024-02-29
authors: 
    - daniel_dilger
tags: [security, meeting-minutes]
---

## Security Office Hour meeting minutes

### Announcements

- Security team approvals for most projects in scope of release 24.03 have been completed.
- Upcoming changes for release 24.05 will focus on FOSS security tools, including
  - switch from Veracode to CodeQL for SAST,
  - switch from Gitguardian to gitleaks for secrets scanning,
  - DAST will not be part of the upcoming TRG until further notice.
- DAST was removed from TRG due to issues with authenticated scans and SARIF report as scanning alerts in repository security section.

### Open Discussions

- An overarching issue for tracking the tool shifts was discussed, as it is necessary for proper planning by teams.
  - Teams need to estimate efforts to adjust Github workflows
- The PR for the new Security TRG was discussed, which includes a new requirement of remediation of findings with medium severity, but not for the 25.05 release.
  - Concerns were raised about the need for additional planned team resources for triaging these issues, and it was suggested that the TRG should be finalized and teams made aware.
- What are best-practices for scheduling security tools Action workflows, with every PR or another frequency?
  - The TRG claims at least once, this is mandatory baseline for all.
  - Best practice is more frequently, recommendations differ per tool (e.g. secret scanning for every PR, dependency scan on a weekly basis).
  - The trigger will be on push + on pull + scheduled - frequency depends on repositories activity, so the team has to decide.
  - Best practice recommendations will be published in the sig-security repository.
