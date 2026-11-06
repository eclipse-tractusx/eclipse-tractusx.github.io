---
slug: community-office-hour-2026-11-06
title: Community Office Hour 2026-11-06
authors:
    - stephan_bauer
tags: [community, meeting-minutes]
---

## Community Office Hour Meeting Minutes

Status updates discussed in meeting:

## Executive Summary

- The current overall Tractus-X release model was questioned. Smaller, independent releases and continuous contributions
  could reduce coordination effort and delays, while retaining quality assurance and automation.
- Issue quality, unclear next steps, and missing documented outputs from requester/developer continue to hinder planning and
  progress.
- KITS archived, versioned website content has been removed from the GitHub Pages deployment branch to reduce deployment
  size. Redundant website builds and obsolete content remain under review.
- The wizard initiative has a repository and initial issues, but still needs governance compliance and active
  contributors.
- Security-team synchronization, secret-scanning efficiency, and sustainable funding for maintenance remain unresolved.
- AI contribution requirements need further review against Eclipse guidance before deciding whether to extend an
  existing TRG or create a separate one.

## Topics Discussed

### Release Process and Workshop Planning

- Team questioned whether large, coordinated Tractus-X releases still reflect how the project is used. The
  original rationale of releasing an integrated whole has weakened as users increasingly adopt individual components.
- Independent releases (products/services and KITs) could avoid making completed KIT changes wait for a quarterly release window.
- Continuous contributions, stronger automation, and ongoing quality assurance were discussed as alternatives to the
  current process.
- It remains open whether a coordinated release is still needed to capture configurations, compatibility mappings, or
  variants.
- The Tractus-X Accelerator's process-analysis work should allow fundamental changes rather than assume that the
  existing release model must be preserved.
- Release workshop planned for the next weeks to analyze the current process and possible improvements

### KITs and Standards

- KITs and standards (Catena-X) serve different levels of detail and do not necessarily require synchronized releases.
- A fundamental standard change may require a substantial KIT update, while minor changes may have little or no impact
  on KIT content.
- Starting with a KIT was discussed as a way to develop and validate approaches before promoting mature content into a
  standard.
- DCM, as an example of a mature standard whose Expert Group no longer intends to continue as before. Assumption -> This
  does not automatically remove the need for occasional KIT maintenance.

### Open Planning and Issues

- Stephan expects to present 13 Tractus-X Accelerator issues at next week's Open Planning. Outreach to other initiatives
  has so far produced limited substantive input.
- Stephan has cleaned up Tractus-X issues, including asking for concrete next steps on long-running topics.
- Issue (Office hour) descriptions often lack clear use cases, deliverables, or actionable next steps. Collections of links alone do
  not make the intended work understandable.

### Website Deployment Size and Archived Content

- Pull-request preview deployments had encountered GitHub Pages size constraints. Stephan reported that deployment
  content had temporarily exceeded 4 GB.
- Archived, versioned documentation and (old) KIT content has been removed from the deployment branch.
- The website now points to release tags and ZIP archives instead of deploying those archived versions as part of the
  live site.
- Stephan reported that this should address the immediate deployment-size problem; continued observation was suggested.

### Website Actions and Navigation

- Website verification, preview deployment, and production deployment perform similar builds, each taking approximately
  ten minutes.
- Johann will inspect the Actions and verifier structure for opportunities to remove redundant work and shorten the
  overall publishing cycle.
- The website also needs a content and navigation review. The test-management section was cited as potentially obsolete.
- Stephan has proposed an alternative menu structure and offered to show it in a future demo; no presentation date was
  agreed.

### CX Next AAS-Related Contribution

- Daniel Klein is expected to present a proposed contribution from an AAS-related UI tool at the November 13 Office
  Hour. The exact component scope remains to be clarified.
- Stephan discouraged creating a separate Tractus-X repository because of governance overhead and ongoing maintenance
  requirements.
- Integration into the existing Tractus-X SDK, alongside related libraries and wrappers, was the preferred direction
  discussed.
- No final repository placement or acceptance decision was made.

### Wizard Initiative

- The repository and initial issues are in place, but governance compliance is still outstanding.
- A first 30-minute weekly session is planned for next Thursday, although it overlaps with the Network Services
  Committee workshop. How to handle that conflict remains open.
- Interested contributors need to take ownership of implementation and governance tasks.

### Security Team Synchronization

- The selected project security contacts do not match the GitHub security-team membership: the GitHub team currently
  includes all committers.
- Stephan has already opened an Eclipse help-desk issue about the synchronization problem.
- Security notifications should reach the designated security contacts rather than all committers. The issue remains
  unresolved.

### TruffleHog and Maintenance Capacity

- TruffleHog was reported to perform expensive scans deep into branch and commit history, including during pull
  requests.
- Lars recommended checking new changes and the latest main-branch state, including changes that may bypass pull
  requests, rather than repeatedly scanning unchanged historical commits.
- A previously resolved false positive in an old commit illustrated the cost of repeated historical scans.
- A shared Security/DevSecOps or system-team function was suggested for investigating and maintaining this
  infrastructure.
- Ownership and funding remain open.

### AI Guidance, Commit Requirements, and TRG Placement

- The group discussed whether AI-related requirements belong in TRG 7 or a separate TRG 11.
- Lars cautioned against introducing obligations beyond those required by Eclipse without a clear reason.
- Commit-message conventions, including sign-off and co-author information, need to be checked against actual Eclipse
  requirements rather than assumed to be mandatory.
- A consolidated Tractus-X explanation could improve discoverability, since contributors may not read either the TRGs or
  Eclipse guidance consistently.
- The group questioned whether AI disclosure fits release-time checks: unlike license or copyright-header checks,
  undisclosed AI use cannot reliably be detected during a release review.
- Lars questioned the legal usefulness of a general AI-assistance declaration when it does not identify which parts of
  a contribution were generated. No legal conclusion was established.
- Stephan will review the guidance before the next session. Placement and scope will be discussed with a broader group.
- Closing the long-running topic before Christmas was expressed as an aim, not an agreed deadline.

## Decisions

- **Decision:** Archived, versioned website content will no longer be included in the GitHub Pages deployment branch;
  release tags and ZIP archives will be referenced instead.

## Action Items

- [ ] @stephanbcbauer: Present the 13 Tractus-X Accelerator issues at next week's Open Planning.
- [ ] @stephanbcbauer: Review the AI-related Eclipse guidance and provide further information before the next Office
      Hour.
- [ ] Johann Schütz: Review the website Actions and verifier structure and investigate build and deployment
      optimizations.
- [ ] Unassigned: Finalize a feasible date for the release-process workshop.
- [ ] Unassigned: Evaluate alternatives to coordinated overall releases, including quality assurance, automation, and
      configuration or compatibility mapping.
- [ ] Unassigned: Review obsolete website content and the navigation structure.
- [ ] Unassigned: Complete the wizard initiative's governance setup and secure contributors for its initial issues.
- [ ] Unassigned: Clarify ownership and funding for shared security and DevSecOps maintenance.
