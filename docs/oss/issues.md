---
title: Issue Tracker
sidebar_position: 40
---

In the Eclipse infrastructure there are different issue trackers for different purposes.

## GitHub Issues related to a repository

Create all issues related to your code and development here. You are free to define your own rules, e.g. naming conventions.
E.g. [issues for this webpage](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues)

## [Eclipse Foundation Helpdesk](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/?search=tractus&sort=created_date&state=opened&first_page_size=100)

Here all requests for Eclipse infrastructure go in.

- Start the summary with "tractus-x:" prefix
- If you are not a committer, create the ticket and add a committer to request a "thumbs up" for approval
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2273) for requesting a new repository
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2843) for requesting a sonar project for a repository
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2186) for requesting secrets in repository
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/1697) for requesting changes for a repository

## [Eclipse GitLab IP Issue Tracker](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/?search=automotive.tractusx&sort=created_date&state=opened&first_page_size=20)

**IMPORTANT:** only a committer can create a valid IP Ticket!

- IP issue for Code Contributions: [Template](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-project), choose template "vet-project" ([more information](/docs/release/trg-7/trg-7-03))
- IP issue for 3rd party content: [Template](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-third-party), choose template "vet-third party" ([more information](/docs/release/trg-7/trg-7-04#checking-other-content-fonts-images-))
- Automatic IP Team Review Requests via the [Dash Tool](https://github.com/eclipse/dash-licenses) ([more information](/docs/release/trg-7/trg-7-04#checking-libraries-using-the-eclipse-dash-license-tool))

**Notes:**

- use the templates, follow the INSTRUCTIONs in the templates
- project name: Eclipse Tractus-X
- project id: automotive.tractusx
- SPDX License Identfier: Apache-2.0
- Format the source reference as Markdown in the description as follows: `[Source](<link to the code>)`
- do not forget to add the last line of the templates, for setting the labels

## Contact EMO (Eclipse Management Organisation)

If you have a question that cannot be answered by project lead, mentor, or PMC, ask the EMO.

See the [Handbook](https://www.eclipse.org/projects/handbook/#roles-emo)
