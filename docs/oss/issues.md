---
title: Issue Tracker
sidebar_position: 40
---

In the Eclipse infrastructure there are different issue trackers for different purposes.

## GitHub Issues related to a repository

Create all issues related to your code and development here. You are free to define your own rules, e.g. naming conventions.
E.g. [issues for this webpage](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues)

## Tractus-X sig-infra Issue Tracker

Link: [Tractus-X sig-infra Issue Tracker](https://github.com/eclipse-tractusx/sig-infra/issues)

This is the place to open issues for requests about infrastructure provided by Tractus-X
from the System and the Security Team. Requests about the Catena-X Github organization also go here.

Several issue templates are provided for standard requests and an general "Support: other topics" template.

## Create (manage) a repository in `eclipse-tractusx`

:::tip

  Creating a sig-infra issue is the recommended way!
:::

There a two ways to manage repositories in the Tractus-X organization:

- Create a [sig-infra issue](https://github.com/eclipse-tractusx/sig-infra/issues), see [description](/docs/oss/issues#tractus-x-sig-infra-issue-tracker)
- Add one of the [Eclipse Tractus-X Project Leads](https://projects.eclipse.org/projects/automotive.tractusx/who) to request a "thumbs up" for approval

OR

- Change the Otterdog configuration in the [.eclipsefdn repository](https://github.com/eclipse-tractusx/.eclipsefdn) and open a PR. In this case, please read the documentation below first.

### Otterdog self-service

:::info Note

- Only committers can use this way
- To review the PR, add one of the [Eclipse Tractus-X Project Leads](https://projects.eclipse.org/projects/automotive.tractusx/who) or one of the Systems Team committers
:::

There is the Otterdog self-service to manage the repositories in our organization.
Otterdog is a tool to manage GitHub organizations at scale using a configuration as code approach. It is actively developed by the Eclipse Foundation and used to manage its numerous projects hosted on GitHub, see [here](https://github.com/eclipse-csi/otterdog).

See the [Otterdog Dashboard](https://eclipse-tractusx.github.io/.eclipsefdn/) with the tabs for the overview, the current configuration and the playground.

To see and learn what is possible and was already done, have a look at the existing [PRs](https://github.com/eclipse-tractusx/.eclipsefdn/pulls?q=is%3Apr).

If you are not sure how to use Otterdog, please create a [sig-infra issue](https://github.com/eclipse-tractusx/sig-infra/issues).

## Eclipse Foundation Helpdesk

Link: [Eclipse Foundation Helpdesk](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/?search=tractus&sort=created_date&state=opened&first_page_size=100)

Here all requests for Eclipse infrastructure go in.
If you are not sure if you should open an Eclipse Foundation Helpdesk Issue, first use this issue tracker.

- Start the summary with "tractus-x:" prefix
- If you are not a committer, create the ticket and add a committer to request a "thumbs up" for approval
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2843) for requesting a sonar project for a repository
- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2186) for requesting secrets in repository

## Eclipse GitLab IP Issue Tracker

Link: [Eclipse GitLab IP Issue Tracker](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/?search=automotive.tractusx&sort=created_date&state=opened&first_page_size=20)

**IMPORTANT:** only a committer can create a valid IP Ticket!

- IP issue for [Code Contributions](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new), choose template "vet-project"
  - [more information](/docs/release/trg-7/trg-7-03)
  - title pattern: `project/<project id>/-/<name>/0.0`,
  - [Example](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/8097)
  - For PRs: use the link to the PR as source reference!
- IP issue for [3rd party content](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new), choose template "vet-third party":
  - [more information](/docs/release/trg-7/trg-7-04#checking-other-content-fonts-images-)
  - [Example](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/5875)
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
