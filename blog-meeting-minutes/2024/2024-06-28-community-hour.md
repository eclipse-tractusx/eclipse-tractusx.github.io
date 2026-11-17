---
slug: community-office-hour-2024-06-28
title: Community Office Hour 2024-06-28
authors:
    - evelyn_gurschler
tags: [community, meeting-minutes]
---

## Office Hour meeting minutes

### Infrastructure

- Info from Test / Infrastructure Management CX Association by [Harald](https://github.com/ds-hzimmer):
  - status of product onboarding and deployment progression to new environment
  - clarifying dependencies, resolving blockers is ongoing
  - handover of test cases to new CX Association Xray
  - Invitation to E2E Test Management Daily beginning Monday (July 1, 2024): frequency determined determined to half an hour every 2nd day
- Status about current works on API publishing by [Tomasz](https://github.com/tomaszbarwicki) currently in progress: a separate repository to store API docs and publish via GitHub pages - [API Hub](https://github.com/eclipse-tractusx/api-hub) - was created. He will present the topic a bit more hands on in one of the upcoming office hours

### Security team

- Info from security team by [Rohan](https://github.com/RoKrish14):
  - Replacement of GitGuardian with TruffleHog, see according pull request to update TX release guideline: [#950](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/pull/950)
  - Updates to Trivy workflow , see according pull request to update TX release guideline: [#949](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/pull/949)
  - Security tools walkthrough in the Committers Meeting of July 5, 2024 (about 20 minutes) - [Rohan](https://github.com/RoKrish14) will announce the walkthrough next week on the TX mailing list while sending out a reminder for the meeting

### FOSS

- Committer Election for [Lucas](https://github.com/ds-lcapellino) concluded successfully, congratulations and welcome!
- Don't forget to update the legal docs!! Close the tickets in your repositories if its done: [eclipse-tractusx/sig-infra#477](https://github.com/eclipse-tractusx/sig-infra/issues/477)

### Open planning / community

- Info by community manager [Stephan](https://github.com/stephanbcbauer) about the Tractus-X/Catena-X working model and the refinement phase for the 24.12 release, which started this week, for more information see [TX mailing list: R24.12 next steps in refinement phase](https://www.eclipse.org/lists/tractusx-dev/msg00434.html)

### Discussions

- [Evelyn](https://github.com/evegufy) suggested a consistent storing for environment specific deployment configuration (helm values files) in TX repositories:
  - IF products teams store deployment configuration in TX, it should be stored in a separate directory at root level (/environments) and the notice file should explain it is need for the end-to-end testing of TX releases
  - no deployment configuration other than the one used for the official E2E Testing of TX releases should be kept in TX
  - suggestion is not intended to promote the storing of this configuration in TX but if you do it, do it as proper as possible
  - a benefit from (properly) storing the configuration in TX is the versioning with the TX GitHub releases, allowing to easily trace back the exact configuration used for testing
  - other options for handling environment specific deployment configuration outside of TX were discussed as well as the option of [multiple sources for Argo CD](https://argo-cd.readthedocs.io/en/stable/user-guide/multiple_sources/) was mentioned by [Carsten](https://github.com/carslen)
- [Stephan](https://github.com/stephanbcbauer) was wondering about how to handle outdated information on the [TX Product Page](https://eclipse-tractusx.github.io/community/products/):
  - product teams should check if the information on the page is still up to date, [Stephan](https://github.com/stephanbcbauer) will write send a reminder on the TX mailing list
  - [Arno](https://github.com/arnoweiss) mentioned that he would update the products which are still outdated in a couple of weeks, thanks for volunteering!
