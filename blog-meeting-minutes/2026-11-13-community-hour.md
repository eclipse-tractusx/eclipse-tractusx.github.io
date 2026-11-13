---
slug: community-office-hour-2026-11-13
title: Community Office Hour 2026-11-13
authors:
    - tom-rm-meyer-ISST
    - stephan_bauer
tags: [community, meeting-minutes]
---

## Community Office Hour Meeting Minutes

Status updates discussed in meeting:

## Executive Summary

- The website build-strategy and GitHub Actions rework are complete. The reported limit of five to six concurrent pull-request previews remains unresolved and will be tracked separately.
- The tractusx-starter-kit has completed its initial governance setup and held its first open meeting. Further contributors are welcome.
- The release-management workshop is being prepared as a cross-initiative Tractus-X activity, not a Catena-X-only workshop. Timing depends on stakeholder identification and availability.
- Secret-scanning performance, outdated documentation, component-maintenance responsibilities, and AI contribution guidance remain open.

## Topics Discussed

### Community Days and Outreach

- The seventh Tractus-X Community Days in Stuttgart were promoted as an opportunity for in-person collaboration, workshops, and business and technical discussions.
- Workshop details were not yet published at the time of the meeting.
- Participants were encouraged to share the event and support promotion through the Tractus-X LinkedIn page.

### Website Builds and Pull-Request Previews

- The website build strategy has been improved, reducing work and execution time during pull requests.
- The related GitHub Actions rework is complete.
- A reported GitHub Pages limitation allows only approximately five to six concurrent pull-request previews. Beyond that, publication can fail. -> Older previews are currently removed manually. A separate issue will track a more sustainable solution.
- **Feedback** Preview deployments were positively received as a way to review changes with non-technical stakeholders.

### New Repository "wanted"

- The proposed contribution from Daniel was deferred because Daniel was absent.
- Integration into the Tractus-X SDK was discussed as a possible alternative to creating a separate repository. No final integration decision was made.
- An additional repository was requested for the EDC Management Console application.
- The established repository-creation approach is to update the shared JSONnet configuration and submit a pull request for review.
- Repository descriptions, access permissions, and required workflows can be managed through that configuration.

### Website Content, AI Agents, and MCP Servers

- Website work covers FAQs, audience-specific information, reasons to use Tractus-X, AI agents, and MCP servers. -> A pull request for the AI-related pages is open. FAQ work is still pending.
- The proposed pages describe available agents, their repositories, capabilities, and skills, as well as MCP servers and the relationship between data spaces and AI.
- **Review needed** review the content and submit information about additional MCP servers.

### Developer Toolbox and Workflow Documentation

- The concrete next step for the testing-automation/toolbox topic remains unclear.
- Options discussed included formalizing the automation as a reusable workflow, documenting how to use it, or closing the issue if it is purely informational.
- Missing Developer Hub documentation for existing workflows was identified as a broader problem. -> no assignee yet

### EDC Interest Group and Meeting Structure

- Creation of the EDC interest group was considered complete. The group had already participated in an EDC meeting last thursday
- Continued collaboration should use the existing EDC meeting structure.
- The contributor meeting takes place on Tuesdays at 13:00 and is invitation-based. Interested contributors can request an invitation -> @lgblaumeiser

### tractusx-starter-kit

- The first open meeting took place on November 12 with @lgblaumeiser and @ReneSchroederLJ.
- Initial issues have been assigned, and @AndrYurk merged the initial pull request covering Eclipse governance requirements.
- Open status meetings are intended to continue every two weeks -> see open meetings page
- Contributors were encouraged to work through the existing issues, create additional issues where needed, and keep the community informed.

### Data Space Management Stack and "Portal"

- An open Data Space Management Stack meeting was announced for November 13 at 14:00.
- "Portal" development continues through the new working group, including follow-up work from the hackathon.

### Outdated Documentation and Archiving Candidates

- Testing documentation, including Jira/Xray-related pages, was identified for review -> no assignee yet
- Jira is still used for current E2E testing, so removing the documentation without checking current practice would be not benefitial.
- The product overview and deprecated-component lists need alignment before further cleanup.

### Release Management and Timeline

- The release-management workshop should represent Tractus-X and its wider ecosystem, including relevant initiatives and industries.
- Broader participation is required because the outcome also affects the Tractus-X Accelerator and future contribution responsibilities.
- Stakeholder identification is still in progress. The workshop is tentatively planned after the Community Days, or early next year if necessary.
- Participants were encouraged to provide release-process feedback through the shared Slido survey.
- R26.12 was reported to be in testing, with publication planned for December 2.
- Open Planning for 27.03 is complete; contributors can proceed with the planned development work.
- An Eclipse Foundation session on security options remains intended for next year. -> Lets talk next year

### Secret Scanning and GitHub Actions

- Secret scans can take approximately two hours because the current configuration scans excessive history.
- Scan scope, scheduling, and fetch depth need adjustment, particularly for pull requests.
- Removing the scanner from a documentation repository was questioned, but no decision to remove it was made.
- GitHub Actions pinning was reworked across non-archived repositories, with pull requests created for review and merging.
- Dependabot was reported to detect updates to SHA-pinned sig-infra actions, including actions associated with the main branch.

### SSI DIM Wallet

- No active maintainer was identified for the ssi-dim-wallet -> The wallet still supports lightweight testing scenarios
- Announcing the wallet as an archiving candidate through the established process was proposed -> The discussion referenced announcement in the Office Hour and Matrix, followed by an objection period described as approximately two weeks.
- Archiving is reversible if a user or maintainer later resumes the work -> The exact timing and execution owner were not conclusively established.

### AI Contribution Governance and TRG Structure

- Placement of AI-related guidance in TRG 7 versus TRG 11 remains under discussion.
- Copyright and license-header guidance was considered better placed with the existing copyright rules in TRG 7.
- Any requirements for commit messages or trailers need separate clarification because they are not currently covered in the same way.
- Existing Eclipse guidance should be reviewed before introducing additional Tractus-X-specific requirements.

## Action Items

- [ ] @stephanbcbauer: Create an issue for the concurrent pull-request preview limitation.
- [ ] @stephanbcbauer: Investigate and adjust secret-scanning scope and fetch depth.
- [ ] @stephanbcbauer: Continue preparing the cross-initiative release-management workshop once the stakeholder list is available.
- [ ] @stephanbcbauer: Consolidate the AI-governance documentation changes, clarify their TRG placement, and address redirects where needed.
- [ ] Unassigned: Review the AI website pull request and contribute missing MCP-server information.
- [ ] Unassigned: Define a concrete next step for the testing automation and its documentation.
- [ ] Unassigned: Submit the EDC Management Console repository request through the shared configuration pull-request process.
- [ ] Unassigned: Clarify ownership and timing for the SSI DIM wallet archiving proposal.
