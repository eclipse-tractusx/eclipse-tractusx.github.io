---
slug: community-office-hour-2025-10-17
title: Community Office Hour 2025-10-17
authors:
  - matbmoser
  - stephan_bauer
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

## Update Infrastructure/Test Management

- Briefing meeting for the upcoming test phase is on Monday; invitations were sent out. If anyone was missed, invitations will be forwarded upon request.
- Scope: overview of the test phase (deployment, who joins, and key updates).
- Test phase start: 20 October.

## Update Release Management

- Release Check issues must be created next week to confirm who joins or opts out of the test phase; reminders have been sent to previous participants.
- Feature freeze is approaching; merge necessary PRs, especially for core products, to enable testing.

## Update Security

- Vulnerability identified in Python Keycloak-related dependency (PyPI package with no fixed version) causing Trivy workflow failures.
- Mitigation: use .trivyignore, include a review date, and document the waiver in the release issue.

## Update Community/Open Planning

- News: blog entry for 26.03 is online (alignment day, open planning day). Open source participants should use the open meetings page.
- New committers: Theresa and Andrii approved; complete Eclipse Foundation paperwork.
- Community Days: registration open; workshop proposals and sponsors welcome.
- Container images: evaluating CloudPirates Helm Charts (Keycloak, Postgres, etc.) that wrap official Docker images; Eclipse feedback indicates Docker images are acceptable if referenced transparently.
- KITs coordination: new Matrix room created to align multi-dataspace development and onboarding; plan a weekly KITs office hour once processes are established.
