---
slug: community-office-hour-2025-10-10
title: Community Office Hour 2025-10-10
authors:
    - matbmoser
    - stephan_bauer
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Release 25.12 – Participation and Preparation

- All teams must create their **release check issues** in `sig-release` by **latest next week** to prepare for the briefing meeting.
- Connector participation in 25.12 is undecided; decision expected after Tuesday’s discussion.
- Even minimal releases (e.g., only bug fixes) should still raise a check issue.
- Test phase briefing → **next week**, kickoff → **two weeks after briefing**.

### Changelog & Documentation Changes

- **DocuSaurus updated** to **v3.9.1**.
- New **changelog presentation**: structured by year/release using DocuSaurus blog plugin.
- Added **contributor/committer acknowledgements** (from GitHub analytics).
- Archived kits now provided; possible change to **single current zip package** instead of multi-version archives (to be discussed in committer meeting).

### Governance & Repository Changes

- _Digital Product Passport_ repository **deprecated and archived** per TRG rules.
    - DPP verification docs → moved to Data Trust & Security Kit.
    - Full DPP documentation now lives in Ecopass.
    - Tutorial relocated to **Tutorial Resources** (still migrating images).
- Topic on centralising tutorials for **Community Days** still open.

### Office Hour & Moderation Planning

- New **round-robin schedule**; participants to confirm dates in the shared discussion link.
- Some moderation slots reallocated due to vacations/conflicts.
- Check for a new series needed with beginning of next year

### Committer Elections

- **Theresa** nominated as committer (focus: release management).
- Election closing next Thursday; committers asked to vote.
- Andriis PMC election pending next PMC Monday meeting.

### Community Days

- Agenda still forming; workshops/presentations needed.
- Deadline for workshop confirmation: ideally within **next 1–2 weeks**, but minor changes possible up to event date.
- Semiconductor-X project may provide up to two workshops (cross-dataspace, traceability) depending on progress.

### Security Reminders

- Teams must check and address **security tab** issues to avoid deprecation.

### Postgres 17 Upgrade & Image Source Problem

- 25.09 used **Bitnami Legacy** images (last viable for that release).
- For 25.12+, **Bitnami Legacy is not sustainable** — need an alternative.
- **Options under consideration:**
    - Official Docker Hub Postgres images (license implications to check).
    - **Cloud Pirates** Helm charts/images (to evaluate; may wrap Docker Hub Postgres).
    - Hosting our own images (currently no team capacity).
- **Eclipse Foundation guidance**: use Bitnami Legacy for Sept release, _evaluate_ Cloud Pirates for next.
- **Action**: Committers to research viable alternatives and check licensing with Eclipse Legal (possibly via Angelika).
- Decision deferred to **Committer Round**.
