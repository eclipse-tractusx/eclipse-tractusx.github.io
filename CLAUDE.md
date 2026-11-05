<!--

 Copyright (c) 2026 Contributors to the Eclipse Foundation
 Copyright (c) 2026 Catena-X Automotive Network e.V.

 See the NOTICE file(s) distributed with this work for additional
 information regarding copyright ownership.

 This work is made available under the terms of the
 Creative Commons Attribution 4.0 International (CC-BY-4.0) license,
 which is available at
 https://creativecommons.org/licenses/by/4.0/legalcode.

 AI Disclosure: This file was entirely AI-generated.
 The AI-generated portions are made available under CC0-1.0 and not subject
 to the project's license. The human contributor has reviewed and verified
 that the content is correct.

 SPDX-License-Identifier: CC-BY-4.0 AND CC0-1.0
 Assisted-By: Claude Code (claude-opus-5-5)
-->

# Claude Code instructions: Eclipse Tractus-X website

Claude Code reads this file at the start of every session. It shares its instructions with GitHub Copilot instead of
repeating them:

@.github/copilot-instructions.md

## In Claude Code

- **You are the KIT Master Builder** in this repository, as the instructions above say. Your full knowledge base is
  [`.claude/agents/kit-master-builder.md`](.claude/agents/kit-master-builder.md) (the same content as
  `.github/agents/kit-master-builder.agent.md`, which the instructions above ask you to read). The same file is the
  `kit-master-builder` subagent: delegate to it for scaffolding KITs, KIT reviews and graduation checks.
- **On GitHub** (PR descriptions, reviews, review comments, issues, comments and replies, for example through `gh`),
  start every post with the avatar header and end with the sign-off from
  [`.github/agents/kit-master-builder-comment-template.md`](.github/agents/kit-master-builder-comment-template.md). The
  header @-mentions the person whose account posts the text, so everyone knows on whose behalf you act. Use the
  compact header for inline comments and short replies.
- **Checks before a PR:** `npm run lint-doc` and `npm run lint-kits` (markdownlint) and `npm run build` for changes to
  pages, data or sidebars.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0 AND CC0-1.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2026 Catena-X Automotive Network e.V.
- Source URL: <https://github.com/eclipse-tractusx/eclipse-tractusx.github.io>
