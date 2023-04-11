---
title: Requesting Content Reviews by the Eclipse Foundation
sidebar_position: 37
---

## Project content

See the whole explanation for project content in the [Handbook](https://www.eclipse.org/projects/handbook/#ip-project-content):

_Project content is content that is managed by the project team. This includes content that is produced by project committers, along with content that is contributed to the project by outside contributors. Essentially, all content that is contained in a source code repository that is owned and managed by the Eclipse Foundation on behalf of an Eclipse open source project team is considered project content. We use "content" in a general sense, independent of any particular technology or means of delivery; code, scripts, documentation, and configuration files are all (non-exhaustive) examples of content. ..._

It is recommended to do a content review from time to time, escpecially if there were massiv code changes / extensions.

It is absolutely necessary if all of these conditions have **not** been met for a contribution from a (project) contributor:

- Was developed from scratch; written 100% by submitting contributor;
- Was submitted under the terms of the project license;- Contains no cryptography; and
- It contains fewer than 1,000 lines of code, configuration files, and other forms of source code.

A project committer must engage with the IP Team to request review by the IP Team before the contribution is pushed/merged.

### Requesting an IP check for your project content (code contribution)

You can request an IP check via [this template](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-project).

**Notes:**

- use the template, follow the INSTRUCTIONs in the template
- project name: Eclipse Tractus-X
- project id: automotive.tractusx
- SPDX License Identfier: Apache-2.0
- Format the source reference as Markdown in the description as follows: `[Source](<link to the code>)`
- do not forget to add the last line of the templates, for setting the labels

## Third-party content

The term third-party content refers to any content that is leveraged by the Eclipse project that is not produced and/or maintained as an asset of the project. This includes content from other Eclipse projects.

See the complete explanation of [third-party content](https://www.eclipse.org/projects/handbook/#ip-third-party).

All third-party content has to be checked. Either by creating an IP issue manually or by using the Eclipse Dash License Tool.

### Requesting an IP check

You can request an IP check via [this template](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues/new?issuable_template=vet-third-party). If the content is approved add the information to the NOTICE file.

**Notes:**

- use the template, follow the INSTRUCTIONs in the template
- project name: Eclipse Tractus-X
- project id: automotive.tractusx
- SPDX License Identfier: Apache-2.0
- Format the source reference as Markdown in the description as follows: `[Source](<link to the code>)`
- do not forget to add the last line of the templates, for setting the labels
- if approved add the checked third-party content to your NOTICE file (TODO: Link to NOTICE file)

### Eclipse Dash License Tool

See the [handbook](https://www.eclipse.org/projects/handbook/#ip-license-tool).

You can request the status of your used libraries via the [Dash Licence Tool](https://github.com/eclipse/dash-licenses), see the README.

**Steps:**

- Download the lastest version: README => Get It => Download Link
- For every repository / technology:
  - create the list of transitive dependencies, see the README
  - run the Dash Tool with the parameter "-project automotive.tractusx"
- Look into the summary file, if there are any libraries with status "retricted"
- If so, you can request checks for theses libraries by automatically creating issues at the IP Team Eclipse Foundation
  - Get your API Token (see README of the Dash Tool), note that only committers can get an API Token
  - Track your [issues](https://gitlab.eclipse.org/eclipsefdn/emo-team/iplab/-/issues?search=automotive.tractusx&sort=created_date&state=opened)
  - Provide support if an issue is labeled with "Help wanted"
  - Add the summary as DEPENDENCY file to the according repository (root level)

**Important Notes:**

- Do **NOT** share your API Token!
- DO **NOT** integrate into automatic builds the "Automatic IP Team Review Requests" (creation of ip tickets: " -review option") via your personal API Token
To integrate in your automatic builds: request a dash-bot via the EF Helpdesk
