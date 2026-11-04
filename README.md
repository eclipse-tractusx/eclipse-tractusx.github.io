# Eclipse Tractus-X website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## How to deploy

This deploys through GitHub actions!

## How to use locally

To use this site locally and see your doc rendered as website, just use the following commands.

- `npm install` (only initially needed)
- `npm start`

This will install all dependencies necessary and run the website on [http://localhost:3000/](http://localhost:3000/).

## Pull request previews

Every pull request against `main` is built by the `Verify website build` workflow. When the build
succeeds, the `Deploy pull request preview` workflow publishes the result to

`https://eclipse-tractusx.github.io/pr/<pull-request-number>/`

and posts (or updates) a comment on the pull request with the link. The preview is refreshed on
every push and removed automatically once the pull request is closed or merged.

This also works for pull requests opened from a fork: the preview is keyed by the pull request
number rather than the branch name, and the build and the deployment are split into two workflows so
that code from a fork is never executed with write permissions.

To reproduce a preview build locally, set the same base URL that CI uses:

```bash
BASE_URL=/pr/1234/ npm run build && npm run serve
```

## Linting

We do want to follow a specific style for our markdown based documentation.
Therefore, this repository is configured to use a [markdown linter](https://github.com/DavidAnson/markdownlint-cli2).
Specific rules are configured via [.markdownlint.yaml](./.markdownlint.yaml).

Additionally, there is a npm script `lint-doc`, that will lint all the markdown files inside [docs](./docs) and `lint-kits`, that will lint all the markdown files inside [docs-kits](./docs-kits).
This script is also run as a pre-commit hook, set up via [husky](https://www.npmjs.com/package/husky).
You can also run the linting step manually by running `npm run lint-doc` or `npm run lint-kits`.

## 3rd Party dependency checks

This repository enforces license compatibility checks on all Pull Requests. This is demanded by [TRG 7.04](/docs/release/trg-7/trg-7-04#checking-libraries-using-the-eclipse-dash-license-tool).
Follow these steps if your PR's workflow fails on the action `3rd Party dependency check (Eclipse Dash)`:

1. Make sure the error-message is not `[main] ERROR Error response from XYZ HTTP 524` or anything else pointing to
  failures in remote services. If that happens, try again tomorrow. If not, continue.
2. Have java installed. Check by executing `java --version` in your bash terminal. For Windows Powershell or command
  prompt, this and the following commands may look different but should follow the same structure.
3. Download the jar of the dash license tool's latest release (for instance [distributed via eclipse](https://repo.eclipse.org/content/repositories/dash-licenses/org/eclipse/dash/org.eclipse.dash.licenses/)).
4. Move the file into the top level folder of this repository. Do not add it to git or commit it.
5. Navigate your terminal to the top level folder of this project (eclipse-tractusx.github.io).
6. Execute `java -jar ./org.eclipse.dash.licenses-1.1.0.jar package-lock.json -project automotive.tractusx -summary ./DEPENDENCIES`
  Adjust the version of the jar if necessary. You should see logs saying `[main] INFO Querying X for license data for Y items.`
  and`[main] INFO Found Z items.`
7. Commit the changed `DEPENDENCIES` file and push to your branch again.

## NOTICE

This work is licensed under the CC-BY-4.0

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2022 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/README.md
