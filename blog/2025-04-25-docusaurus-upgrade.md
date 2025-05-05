---
title: Eclipse Tractus-X Webpage Updated to Docusaurus 3.7.0
description: Eclipse Tractus-X Webpage Updated to Docusaurus 3.7.0
slug: docusaurus-upgrade-04-2025
date: 2025-04-25T15:28
hide_table_of_contents: false
authors:
  - stephan_bauer
---

Hello Eclipse Tractus-X Community,

We’re happy to announce that the Eclipse Tractus-X website has been successfully updated. The underlying documentation framework, **Docusaurus**, is now running on **version 3.7.0**.

**This upgrade was essential, as we were previously using an outdated version that limited our flexibility and security.**

## What's New?

Visually, not much has changed — but you might notice that the **News Blog** is now grouped by year for improved clarity. While the visible updates are minimal, this upgrade clears the path for more improvements in the future.

<!--truncate-->

## Improvements and Cleanups

The update was not only a technical migration but also an opportunity to perform a comprehensive cleanup. Here’s what was improved:

- KITs folder structure is now consistently using **kebab-case** naming.
- Labels such as "Software Development View" are now standardized across the site.
- Sidebar and dropdown entries for KITs now use consistent and full naming.
- All existing KIT versions were reviewed and cleaned up.
- Obsolete plugins such as `open-api` and `remote` were removed.
- References to the **API Hub** were added where possible.
- Node.js version was upgraded from 16 to 18 (used in GitHub workflows).
- Many previously broken links have been fixed.

## Known Limitations

We are still seeing build-time warnings caused by certain SVG files generated with Draw.io. These SVGs render correctly in the browser, but we plan to improve how we handle them going forward.

## What You Should Do

If you are a KIT contributor:

- Review your KIT for any inconsistencies or missed items.
- If you find something, please [create an issue](https://github.com/orgs/eclipse-tractusx/projects/85) — ideally followed by a pull request.
- Double-check that your KIT references the **API Hub** and embeds Swagger UI as needed.

## Next Steps

Following the merge of this large update ([see pull request](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/pull/1237)), here are a few post-update tasks:

- Review the changelog for broken links.
- Collect feedback and issues, and fix them when possible.
- Update license headers in 11 files.
- Tag the repository and remove outdated 24.08 KITs for improved performance.
- Update the contributor guidelines on how to adapt and work with KITs.
- Add the open meetings calendar to the documentation.

## Thank You

A big thank you to everyone who contributed and supported this update!
