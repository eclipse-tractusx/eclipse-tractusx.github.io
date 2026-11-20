---
slug: community-office-hour-2026-11-20
title: Community Office Hour 2026-11-20
authors:
    - theresa_hilger
    - stephan_bauer
tags: [community, meeting-minutes]
---

## Community Office Hour Meeting Minutes

Status updates discussed in meeting:

## Executive Summary

- The FAQ proposal is ready for review and was moved to in progress. The proposed AI website section was demonstrated, with community feedback and contributions invited.
- The 26.12 testing phase was extended by one week. Development for 27.03 is underway for products and KITs.
- Open GitHub Actions pinning pull requests need committer reviews. **sig-infra**'s own pinning and Dependabot configuration must be checked to clarify the rollout to dependent repositories.
- Gateway API work is blocked by uncertainty over which repositories remain maintained and require support. A final mailing-list request was proposed to establish the remaining scope.
- The GitHub security team membership issue is resolved: the team now contains five people rather than the entire committer group.
- A possible Java/OpenJDK vulnerability was raised. Applicability to the project's actual runtime images remained unconfirmed; the discussion ended in an investigation state, not a confirmed finding or an all-clear.

## Topics Discussed

### New FAQ section

- The FAQ pull request is ready for review and was moved to in progress.
- The demonstration showed searchable questions and categories covering project basics, governance, production use, KITs, contribution roles, community meetings and vulnerability reporting.
- The content is maintained through reusable JSON data, allowing questions and categories to be extended.

### AI website proposal and related website work

- The proposed AI section includes an overview, agent profiles, MCP services, related projects and an explanation of why AI needs data spaces.
- Agent profiles describe expertise, skills and ways to interact with the agents. An embedded website chatbot remains an idea requiring clarification.
- MCP documentation is intended to explain available tools and connection options. Existing or prospective integrations across Tractus-X components were discussed.
- A SonarQube/SonarCloud MCP example illustrated how agents could request code-quality analysis during development. This was a demonstration, not a newly agreed project-wide requirement.
- The related-projects page and parts of the explanatory content are still being developed.
- Contributors can leave review suggestions or create a stacked pull request targeting the proposal branch for larger changes.
- A separate decentralized community-bases website update could not be demonstrated because its preview did not render correctly.

### Developer toolbox, wizard and tractusx-starter-kit

- The toolbox concept aims to make components easy to start using Docker, rather than requiring an Umbrella deployment.
- A small pull request was offered to add a GitHub workflow to **tractusx-starter-kit** for community review.
- Detailed scope and usage of the particular workflow contribution were not fully settled during the discussion.

### Release planning: 26.12 and 27.03

- The 26.12 testing phase, originally due to finish on November 20, was extended by one week.
- KIT contributors were reminded to submit their release pull requests in time for review. KITs missing the release window will not receive the 2026.12 tag.
- The 27.03 release is in the development phase for products and KITs following the planning event.

### Restructuring the release process

- A contact list containing approximately 100 people has been supplied for the workshop.
- The list needs to be filtered before invitations are sent.
- @stephanbcbauer -> not sure if the workshop could still take place in 2026, maybe early 2027 as a possible alternative. -> No date was agreed.

### GitHub Actions pinning and **sig-infra**

- Many pinning pull requests remain open. @stephanbcbauer has merged those within his permissions but cannot approve his own pull requests; reviews from other committers are required.
- Volunteers offered to review several pull requests.
- The **sig-infra** discussion distinguished two layers:
  - Pinning and updating the actions used inside **sig-infra**'s reusable workflows.
  - Updating pinned references to those workflows in consuming repositories.
- Dependabot, as supporting updates to pinned references when appropriately configured. **sig-infra**'s actual configuration still needs checking.
- Automatic merging of dependency updates was suggested as a way to avoid maintenance delays, but was not agreed.
- @stephanbcbauer proposed resolving **sig-infra** first, then proceeding with the dependent repositories.

### TruffleHog workflow scan scope

- Website pull-request scans were reported to take more than two hours because of broad scan scope, including history.
- A pull request is available to separate comprehensive scanning from smaller pull-request scans.
- Participants discussed scanning pull-request changes rather than repeatedly scanning the full history, while ensuring main-branch changes are also covered.
- A corresponding TRG update was requested. The final scan policy was not agreed.

### GitHub security team membership

- Eclipse has corrected the team membership issue.
- The security team now lists five people rather than the entire developer/committer group.

### Gateway API support and repository maintenance

- Further Gateway API work requires a reliable list of maintained components that still need it.
- Implementation is not the only cost: installation, configuration variants and routing behavior require substantial testing.
- EDC and Identity Hub were reported to have Gateway API support already, with working deployments checked regularly by a participant.
- Two approaches were discussed: clean up deprecated repositories first, or ask maintainers and users to identify missing Gateway API support directly.
- Deprecating or archiving unmaintained repositories was advocated, but no repository-specific archival decisions were recorded.

### Umbrella integration, product overview and contributor guidance

- The Umbrella pull request concerning DTR basics integration was reported merged.
- A repository/product overview is in progress. Its presentation needs revision, and the committer list in the original draft was reported as incorrect.
- Agent-specific TRGs were proposed to define repository guidance, boundaries and checks such as dependency and IP-related checks. -> No concrete scope or owner was agreed.

### Possible Java/OpenJDK vulnerability

- Participants raised a recently publicized vulnerability described as involving HotSpot and Base64-related processing.
- No CVE identifier, authoritative advisory or reliable affected-version mapping was established in the meeting.
- EDC, Identity Hub and DTR were discussed as components whose Java runtime or base images may need checking.
- Participants questioned whether Oracle Java version information also applied to Eclipse Temurin distributions. Using a different distribution was not accepted as sufficient evidence of non-applicability.
- The proposed response was to identify the actual runtime images, verify affected and fixed versions, and update/rebuild images if necessary.

## Action Items

- [ ] @stephanbcbauer and @mgarciaLKS: Revisit the **sig-infra** pinning discussion and clarify the outstanding setup.
- [ ] @stephanbcbauer: Check or enable Dependabot and verify action pinning in **sig-infra**; aim to address this on November 20.
- [ ] @stephanbcbauer: Notify reviewers when the **sig-infra** prerequisite is resolved.
- [ ] Volunteer committers: Review the open GitHub Actions pinning pull requests.
- [ ] @matbmoser: Submit the offered small GitHub workflow pull request for tractusx-starter-kit.
- [ ] @mgarciaLKS: Review the website TruffleHog workflow pull request.
- [ ] Unassigned: Update the relevant TRG to reflect the agreed scanning approach once clarified.
- [ ] @matbmoser: Prepare the mailing-list email template requesting outstanding Gateway API requirements.
- [ ] @ther3sa, @stephanbcbauer: Filter the release-process workshop contact list before sending invitations.
- [ ] @matbmoser: Correct the committer list and revise the presentation.
- [ ] @all: Investigate the Java vulnerability against actual runtime/base-image versions and update affected images if required.
