---
title: Requesting Content Reviews by the Eclipse Foundation
sidebar_position: 37
---

## Project content

Moved to TRG 7.03

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
