## Eclipse Foundation Helpdesks


### [Helpdesk](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/?search=tractus&sort=created_date&state=opened&first_page_size=100) 
- Start the summary with "tractus-x" prefix 
- If you are not a committer, create the ticket and add a committer to request a "thumbs up" for approval
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2273) for requesting a new repository


### [IP Helpdesk](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/?search=automotive.tractusx&sort=created_date&state=opened&first_page_size=100)

**IMPORTANT:** only a committer can create a valid IP Ticket!

- [Template for a Code Contribution](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-project)
- [Template for a third party content](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-third-party)

**Notes:**
  - use the templates, follow the INSTRUCTIONs in the templates  
  - project name: Eclipse Tractus-X
  - project id: automotive.tractusx 
  - SPDX License Identfier: Apache-2.0
  - Format the source reference as Markdown in the description as follows: "\[Source\](Link to the repository with the sources to be checked)"
   - add: "/cc @awittek"
   - do not forget to add the last line of the tempalates, for setting the labels
   - TODO-AWI: add valid example issue
   
## Committer User Infos (Eclipse / GitHub / GitLab)

- [Eclipse Tractus-X Project](https://projects.eclipse.org/projects/automotive.tractusx/who)
- GitHub organisation [eclipse-tractusx](https://github.com/orgs/eclipse-tractusx/teams/automotive-tractusx-committers/members)
- GitLab user names (for adding smb to issues) -> TODO-AWI


## Licenses

In the Eclipse Tractus-X Project the follwing OSS licenses are mandatory as outbound licenses:
- Apache 2.0 
- CC BY 4.0 (for non-code artefact, e.g. images, documentation,...)

### Apache License 2.0
- SPDX-License-Identifier: Apache-2.0
- Link: https://www.apache.org/licenses/LICENSE-2.0

### Creative Commons Attribution 4.0 International (CC BY 4.0)
- SPDX-License-Identifier: CC-BY-4.0
- Link: https://creativecommons.org/licenses/by/4.0/legalcode

### Licenses for third party content

- OSS Licenses: the licence has to be on [this list](https://opensource.org/licenses/alphabetical) , if not it is not approved by the [Open Source Initiative](https://opensource.org/about)
- the license has to be compliant to the Apache License 2.0
- Approvals are required for each used 3rd party library,  
  -  TODO-AWI link to Eclipse Handbook
  - Eclipse Dash Tool: Checks approvals for each library