# GitHub Actions workflows

This folder holds the CI/CD workflows of the Eclipse Tractus-X website. This page explains what each workflow does,
when it runs and how the workflows depend on each other.

## Overview

| Workflow (file) | Trigger | Purpose | Writes to `gh-pages` |
|---|---|---|---|
| [Build and deploy gh-pages](build-and-deploy-gh-pages.yaml) | push to `main` | Builds and publishes the production site | yes (root) |
| [Build pull request preview](verify-build.yaml) | pull request to `main` | Checks that the complete site builds, produces a preview with only the changed pages | no |
| [Deploy pull request preview](deploy-pr-preview.yaml) | "Build pull request preview" completed, manual | Publishes the preview of a pull request | yes (`pr/<number>/`) |
| [Remove pull request preview](cleanup-pr-preview.yaml) | pull request closed or merged, daily, manual | Deletes the preview of a pull request, or of all closed pull requests | yes (`pr/`) |
| [Update product statistics](update-product-stats.yaml) | daily, manual | Refreshes the numbers on the product pages without a build | yes (`generated/`) |
| [Markdown linting for documentation](lint-on-pull-request.yaml) | pull request to `main` | Runs markdownlint on `docs/` and `docs-kits/kits/` | no |
| [Quality Checks (Release Guidelines)](quality-checks.yaml) | every pull request, manual | Tractus-X release guideline checks | no |
| [3rd Party dependency check (Eclipse Dash)](dash.yaml) | pull request changing `package*.json`, manual | License check of npm dependencies | no |
| [TruffleHog](trufflehog.yml) | push to `main`, pull request | Scans the new commits for leaked secrets | no |
| [TruffleHog (full history)](trufflehog-full.yml) | weekly, manual | Scans the full history of `main` for leaked secrets | no |
| [Generate Kit Template Documents](generate-kit-word.yaml) | pull request changing the KIT template, manual | Generates the KIT template Word documents | no |

`pages-build-deployment` also shows up in the Actions tab. It is not defined here: GitHub runs it on every push to
`gh-pages` to publish that branch to <https://eclipse-tractusx.github.io>. It takes several minutes, and a newer run
cancels an older one that has not finished.

## How the website workflows work together

```mermaid
flowchart TD
    PR["Pull request opened or updated"] --> BUILD["Build pull request preview<br/>(complete build as check +<br/>preview build with BASE_URL=/pr/N/,<br/>pruned to the changed pages)"]
    PR --> LINT["Markdown linting"]
    PR --> CHECKS["Quality Checks, TruffleHog,<br/>Dash, Kit Word documents"]
    BUILD -- "artifacts: pr-preview, pr-number" --> DEPLOY["Deploy pull request preview<br/>(no build, no PR code)"]
    DISPATCH["Manual run (pull request number)"] --> DEPLOY
    DEPLOY -- "pr/N/ if it fits, removes oldest<br/>previews beyond the space limit" --> GHP[("gh-pages branch")]
    CLOSE["Pull request closed or merged,<br/>daily, manual run"] --> CLEAN["Remove pull request preview"]
    CLEAN -- "deletes pr/N/" --> GHP
    DEPLOY & CLEAN -. "updates" .-> COMMENT["Preview comment on the pull request<br/>(commit, pages, space, removal reason)"]
    MERGE["Push to main"] --> PROD["Build and deploy gh-pages<br/>(npm ci + build with BASE_URL=/)"]
    PROD -- "root, keeps pr/" --> GHP
    DAILY["Every day"] --> STATS["Update product statistics<br/>(no build)"]
    STATS -- "generated/" --> GHP
    GHP --> PAGES["pages-build-deployment (GitHub)<br/>publishes eclipse-tractusx.github.io"]
```

### Two builds per pull request, one per merge

- **Pull request:** "Build pull request preview" builds the site twice, in two parallel jobs:
  - `Build static website` builds the complete site, exactly like production. It verifies that the site builds (broken
    links fail the build, although `npm start` may not show them) and is a required status check. Its output is not
    kept.
  - `Build preview` builds the site with the base URL `/pr/<number>/` and removes every page the pull request does not
    change. Its output is the preview. "Deploy pull
    request preview" does not build anything; it publishes the artifact of that job. Removing the job would therefore
    remove the previews.
- **Merge to `main`:** the site is built again in "Build and deploy gh-pages". This is not redundant: the preview was
  built with the base URL `/pr/<number>/` and from the pull request at that time, while production needs the base URL
  `/` and the current state of `main`.

### What the preview contains

The previews and the production site share the `gh-pages` branch and with it the
[size limit of GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
A complete build is well over 1 GB, mostly because of the frozen KIT releases in `docs-kits_versioned_docs/`. With
complete previews, a few open pull requests were enough to exceed the limit, and then not even the production site
could be published.

A preview therefore only contains what the pull request changes. Every other path of the preview falls back to the
live website:

1. `Build preview` builds the site with the base URL `/pr/<number>/`. It only builds the KIT versions `Next`, the latest
   release (both are needed so every KIT page keeps its path) and older releases that the pull request changes in
   `docs-kits_versioned_docs/` or `docs-kits_versioned_sidebars/`. They are selected with the environment variable
   `DOCS_KITS_VERSIONS` of [`docusaurus.config.js`](../../docusaurus.config.js).
2. [`utils/prune-preview.js`](../../utils/prune-preview.js) then removes the pages that the changed files
   (`git diff` of the pull request) do not affect, with their page chunks and the images that only they use:
   - a changed Markdown page keeps itself; another changed file in a content folder (an image, a partial) keeps the
     pages of its folder,
   - a change inside a KIT keeps that whole KIT in that version,
   - blog lists, tags and feeds are kept only if the pull request changes that blog, and only their first page,
   - a change outside the content folders (components, styles, `data/`, `static/`, configuration) can affect every
     page, so it keeps all pages except the older KIT releases,
   - changes that do not end up on the website (`.github/`, `README.md`, ...) only keep the home page.

   It writes the affected pages to `.preview-pages.json`; the preview comment links them.
3. GitHub Pages answers a path that does not exist with the `404.html` at the root, which belongs to the production
   site. A small script in the production pages sends every `/pr/<number>/<path>` that ends there to `/<path>` on the
   live website. Navigating inside the preview to a removed page also ends there: Docusaurus cannot load the page
   and reloads it. The preview's announcement bar tells visitors which pull request they are looking at.

A preview with only content changes is a few dozen MB instead of over 1 GB.

### Space on GitHub Pages

Every write to `gh-pages` checks the space, so previews can never stop the production site from being published:

- **`MAX_PREVIEW_MB`** (300) in "Deploy pull request preview": a larger preview is not published, and an older preview
  of the pull request is removed. The comment links the build, whose `pr-preview` artifact can be served locally.
- **`GH_PAGES_LIMIT_MB`** (2500, `0` turns the check off) in
  [`update-gh-pages.sh`](../scripts/update-gh-pages.sh): the space the production site and all previews may use
  together. Published Pages artifacts of about 3.3 GB still deployed, larger ones failed. Before pushing, the script
  measures the production site and the previews:
  - a preview that does not fit next to the production site on its own is not published (and its older version is
    removed). The comment says so, and no other preview is removed for it,
  - otherwise the oldest previews of other pull requests (by `pr/<number>/.deployed-at`) are removed until everything
    fits. The production deployment does the same; its site always gets the space.
- Each run shows the space used in its job summary.

Every pull request has one preview comment, which is updated (not posted again):

- after a deployment, with the commit the preview was built from, the time, the build, the changed pages and the space
  on GitHub Pages,
- when the preview is not published (too large, no space), with the reason and the commit,
- when the preview is removed, with the reason (pull request closed, removed manually, removed to make space) and the
  commit of the last preview.

The preview's announcement bar also shows the commit.

To publish or remove a preview by hand, run the workflows from the Actions tab or with `gh`:

```bash
# Publishes the latest build of the pull request's current commit again,
# for example after its preview was removed to make space.
gh workflow run deploy-pr-preview.yaml -f pr_number=1234
# Removes one preview, or without a number the previews of all closed pull requests.
gh workflow run cleanup-pr-preview.yaml -f pr_number=1234
gh workflow run cleanup-pr-preview.yaml
```

The build keeps its artifacts for 7 days. After that, re-run the build of the pull request or push a new commit. Once a
day, "Remove pull request preview" removes the previews of closed pull requests that are still there and checks the
space limit.

The `Build preview` job reports the size of the preview as a notice in the workflow run. To build and prune a preview
locally:

```bash
BASE_URL=/pr/1234/ DOCS_KITS_VERSIONS=current npm run build
git diff --name-only main... > changed-files.txt
node utils/prune-preview.js --changed-files changed-files.txt
```

The fallback to the live website needs the production `404.html`, so `npm run serve` shows "Page not found" for the
removed pages instead.

### Why the preview needs two workflows

A pull request from a fork must not get write access to the repository, because its code runs in the build. The work is
therefore split:

1. **Build pull request preview** runs the pull request's code with read-only permissions and no secrets. It uploads
   the preview build (`pr-preview`) and the pull request number (`pr-number`) as artifacts.
2. **Deploy pull request preview** is started by the completion of the build (`workflow_run`) and runs with write
   access, in the context of the base repository. It never checks out or runs code from the pull request. It treats the
   artifacts as untrusted input: the pull request number must be a plain number, and that pull request's latest commit
   must be the commit the build was made from. Otherwise the build is skipped as outdated or not belonging to that pull
   request.

A `workflow_run` workflow always runs in the version of the default branch. Changes to "Deploy pull request preview"
therefore only take effect after they are merged, and the pull request that changes it gets no preview from the new
version.

### Layout of the `gh-pages` branch

```text
gh-pages
├── index.html, assets/, docs/, ...   production site, replaced by "Build and deploy gh-pages"
├── generated/product-stats.json      numbers for the product pages, replaced by "Update product statistics"
└── pr/
    ├── 1605/                         preview of pull request 1605
    └── 1627/                         preview of pull request 1627
```

The previews are available at `https://eclipse-tractusx.github.io/pr/<number>/`. Each deployment replaces its whole
target, so pages and hashed assets that no longer exist do not pile up:

- the production deployment replaces everything at the root except `pr/` (and `generated/` when the build has none),
- a preview deployment replaces only `pr/<number>/` (and removes the oldest previews beyond the space limit),
- the removal deletes only the selected `pr/<number>/` folders,
- the product statistics update replaces only `generated/`.

### Writing to `gh-pages` concurrently

All four writing workflows use [`.github/scripts/update-gh-pages.sh`](../scripts/update-gh-pages.sh). It fetches the
latest `gh-pages` commit (files only, no history), applies the change on top of it and pushes it. If another workflow
pushed in the meantime, the push is rejected; the script then fetches the new state, applies the change again and
retries (up to 10 times, with an increasing delay). Because every workflow only touches its own part of the branch,
nothing gets lost. If `gh-pages` does not exist yet, for example in a fork, the script creates it.

Concurrency groups only order the runs that must not overlap:

| Group | Used by | Effect |
|---|---|---|
| `gh-pages-production` | Build and deploy gh-pages | Production deployments run one after the other, so an older build never overwrites a newer one. A waiting deployment is replaced by a newer one, which contains its changes. |
| `gh-pages-pr-<number>` | deploy job of Deploy pull request preview, Remove pull request preview | Deployment and removal of the same preview never overlap. If a removal is replaced by a later deployment, that deployment sees the closed pull request and removes the preview itself. The daily and manual removal of all closed pull requests uses `gh-pages-pr-sweep`. |
| `verify-build-<number>` | Build pull request preview | A new push to a pull request cancels the running build of the previous push. |
| `product-stats` | Update product statistics | Updates run one after the other. |

Production deployments and previews of different pull requests do not wait for each other.

> GitHub keeps at most one *waiting* run per concurrency group and cancels the previous waiting run when another one
> arrives. Previously all three workflows shared one group, which could cancel a production deployment or a preview
> removal. That is why the groups are now separate.

### Testing changes to the preview workflows

Because "Deploy pull request preview" always runs in the version of the default branch, a pull request to this
repository cannot test changes to it. Test such changes in your fork instead:

1. Enable GitHub Actions in your fork and push the changed workflows to the fork's `main` branch.
2. Open a pull request inside your fork (from a branch of the fork to the fork's `main`).
3. Check that "Build pull request preview" and then "Deploy pull request preview" succeed in the fork, that
   `pr/<number>/` appears on the fork's `gh-pages` branch (created on the first run) and that the preview comment is
   posted. Closing the pull request must remove `pr/<number>/` again.

The preview URL in the comment points to `eclipse-tractusx.github.io`, and the site is built for that host, so check
the content of the `gh-pages` branch rather than a Pages site of the fork. Pushing to the fork's `main` also runs the
production deployment into the fork's `gh-pages` branch.

## Update product statistics

The product pages (`/Products`) show numbers from GitHub and Eclipse: whether a product is active or stale, its
committers and contributors, commit activity, releases and open issues. Visitors do not call those APIs themselves
(GitHub allows 60 requests per hour without sign-in); the pages read `generated/product-stats.json` instead.

[`utils/generateProductStats.js`](../../utils/generateProductStats.js) collects that file with the workflow token. It
runs in two places:

- **Build and deploy gh-pages** runs it before every build, so a new deployment starts with current numbers.
- **Update product statistics** runs it every day at 04:17 (UTC) and on demand, and replaces only `generated/` on
  `gh-pages` (`update-gh-pages.sh data`). There is no build: it takes about two minutes, and the new numbers are live
  once GitHub Pages has published the branch. With `--strict` it fails, and publishes nothing, when fewer than 90% of
  the repositories or no committers answered, so a bad run never replaces good numbers.

Pull request previews have no file of their own and read the one of the production site. Locally, run
`GITHUB_TOKEN=$(gh auth token) npm start` to collect it once; without a token the pages ask the APIs in the browser.

## The other workflows

### Markdown linting for documentation

Runs `npm run lint-doc` and `npm run lint-kits` (markdownlint with [`.markdownlint.yaml`](../../.markdownlint.yaml))
on every pull request to `main`. Run the same commands locally before opening a pull request.

### Quality Checks (Release Guidelines)

Calls the reusable workflow `reusable-quality-checks.yaml` from
[eclipse-tractusx/sig-infra](https://github.com/eclipse-tractusx/sig-infra), which checks the repository against the
Tractus-X release guidelines (TRGs). Runs on every pull request and can be started manually.

### 3rd Party dependency check (Eclipse Dash)

Runs the [Eclipse Dash License Tool](https://github.com/eclipse-dash/dash-licenses) through the `run-dash` action of
sig-infra on `package-lock.json`. Runs when a pull request changes `package.json` or `package-lock.json`, and fails if
a dependency has a restricted license. Can be started manually.

### TruffleHog

Scans for leaked secrets with [TruffleHog](https://github.com/trufflesecurity/trufflehog) and reports verified and
unknown findings. It only scans the commits that are new: for a pull request the commits between its base and head,
for a push to `main` the pushed commits. The checkout is shallow, with just enough history for those commits, instead of
the full history of all branches. `--fail-on-scan-errors` makes the check fail when TruffleHog cannot scan, instead of
passing with nothing scanned.

### TruffleHog (full history)

Scans the full history of `main` every Monday at 03:00 (UTC) and it manually only fetches `main`, not `gh-pages` with
the pull request previews or other branches. It is not a required check.

### Generate Kit Template Documents

Generates the Word documents of the KIT templates (`docs-kits/kit-template/graduated` and `.../sandbox`) with
[`scripts/generate_kit_word.py`](../../scripts/generate_kit_word.py). It detects which template changed and only
regenerates that one. The documents are uploaded as the workflow artifact `kit-template-documents` (kept 30 days) and
are not committed. Can be started manually for one or both templates.

## Required status checks

Branch protection of `main` requires these checks. They are identified by their **job names**, so keep the job names
when changing a workflow:

| Check | Job in |
|---|---|
| `Build static website` | [verify-build.yaml](verify-build.yaml) |
| `Run markdown lint` | [lint-on-pull-request.yaml](lint-on-pull-request.yaml) |
| `Scan secrets` | [trufflehog.yml](trufflehog.yml) |
| `Check quality guidelines / Check quality guidelines` | [quality-checks.yaml](quality-checks.yaml) |

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: <https://github.com/eclipse-tractusx/eclipse-tractusx.github.io>
