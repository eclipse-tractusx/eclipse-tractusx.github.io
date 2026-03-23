# Sandbox / MVP KIT Template

> **⚠️ Remove this file before publishing!**

This template is the starting point for a new Sandbox or MVP-level KIT.
Follow the steps below to get started.

Information of requirements can be found here: https://eclipse-tractusx.github.io/documentation/kit-lifecycle#-1-sandbox-level-mvp-kit

---

## 1. Copy and Rename

```bash
# From the docs-kits/kits/ directory
cp -r ../kit-template/sandbox ./<kit-id>-kit
cd <kit-id>-kit
```

## 2. Replace `<kit-id>` Everywhere

Search all files in your new folder and replace every occurrence of `<kit-id>` with your actual KIT identifier (e.g. `my-service`).

```bash
# macOS / Linux
grep -rl '<kit-id>' . | xargs sed -i '' 's/<kit-id>/my-service/g'
```

Or use your IDE `CTRL + F` to find and replace in a file.

This placeholder appears in:
- Frontmatter `id:` and `title:` fields
- Internal links and slugs
- The `Kit3DLogo` component attribute `kitId="<kit-id>"`

## 3. Replace `YYYY` with the Current Year

The changelog uses `YYYY` as a placeholder for the release year. Replace it with the actual year (e.g. `2026`).

```bash
# macOS / Linux
grep -rl 'YYYY' . | xargs sed -i '' 's/YYYY/2026/g'
```

## 4. Fill in the TODOs

Each view file contains `TODO` blocks that describe what content is expected. Work through them top to bottom and replace them with your KIT's actual content.

## 5. Done

Once all placeholders are replaced and TODOs are addressed, delete this `README.md` and open a pull request.

## Happy KIT Building!

For questions, reach out via [Matrix Chat](https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org) or [KIT Office Hours](https://eclipse-tractusx.github.io/community/open-meetings).

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
