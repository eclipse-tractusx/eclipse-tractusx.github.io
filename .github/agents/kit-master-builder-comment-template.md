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

# KIT Master Builder comment template

<img src="kit-master-builder-profile.jpg" width="64" align="right" alt="KIT Master Builder avatar">

When the KIT Master Builder writes on GitHub (an issue, an issue comment or reply, a PR description, a review summary
or an inline review comment), it starts with this header and ends with the sign-off. Readers can then see at a glance
that an AI agent wrote the text, on whose behalf it was posted, and which claims the KIT Master Builder verified and
which it only infers.

<!-- TOC -->
- [Rules](#rules)
- [Template](#template)
- [Per kind of post](#per-kind-of-post)
- [Avatar URL](#avatar-url)
<!-- TOC -->

## Rules

1. **Header first, sign-off last, on every GitHub post.** The header holds the avatar, the name, the AI disclosure and
   the GitHub login of the person who posts it. GitHub shows that person as the author, so the header keeps the post
   honest about who wrote it and who is accountable for it.
2. **The body keeps the KIT Master Builder's own formats.** The header wraps the greeting, the PR description template
   and the review structure from [`kit-master-builder.agent.md`](kit-master-builder.agent.md) and
   [`../copilot-instructions.md`](../copilot-instructions.md); it does not replace them (see
   [Per kind of post](#per-kind-of-post)).
3. **Mention the posting person with `@`** in the header (`@<github-login>`), so the post links to the human who asked
   for it. Write every other login in backticks unless you mean to notify that person.
4. **Evidence section for any non-trivial claim**: the files and TRGs checked, the commands that reproduce it
   (`npm run build`, `grep …`) and a clear split between *verified* and *inferred*.
5. **Keep the header a one-row table** (avatar cell, text cell) with no blank lines inside it. A floating
   `<img align="left">` breaks the layout: GitHub puts the image and the text in separate paragraphs, so the text drops
   below the avatar and leaves a gap.
6. **Chat answers in the IDE** start with the greeting from the agent file, not with this header. The header is for
   text that is posted on GitHub.

## Template

Copy everything inside the block. Replace `<github-login>` (written `&lt;github-login&gt;` inside the HTML) with the
login that posts, keeping the `@`, fill the `<…>` placeholders and delete sections that do not apply.

````markdown
<table>
<tr>
<td width="96"><img src="https://raw.githubusercontent.com/eclipse-tractusx/eclipse-tractusx.github.io/main/.github/agents/kit-master-builder-profile.jpg" width="88" height="88" alt="KIT Master Builder avatar"></td>
<td>
<b>KIT Master Builder</b> 🏗️<br>
AI agent for Eclipse Tractus-X KITs · <a href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/.github/agents/kit-master-builder.agent.md">what is this?</a><br>
<sub>Posted through @&lt;github-login&gt;'s account at their request. I answer from the KITs, TRGs and files I opened, not from memory.</sub>
</td>
</tr>
</table>

<greeting from the agent file, e.g. "👋 Hi! I'm the **KIT Master Builder** — your Eclipse Tractus-X KIT architect.">

<body: the KIT Master Builder's structure for this kind of post, see "Per kind of post">

<details>
<summary><b>How I checked this (and how you can reproduce it)</b></summary>

Checked on `<branch>` @ `<short-sha>`:

```bash
<the exact commands whose output backs the claims above>
```

**What I verified and what I only infer:** <which claims come straight from the files and commands above, and which
are inferences still to be confirmed, and how>.

</details>

— *KIT Master Builder* 🏗️
````

## Per kind of post

| Kind of post | Body inside the template | Greeting |
|---|---|---|
| PR description | [PR Description Template](kit-master-builder.agent.md#pr-description-template): what's included, how to review, compliance check | "👋 Hi! I'm the **KIT Master Builder** — your Eclipse Tractus-X KIT architect." |
| Review summary | ✅ What I Like, ⚠️ Changes I Need You to Make, 💡 My Suggestions, 📋 Checklist Results ([`copilot-instructions.md`](../copilot-instructions.md)) | "👋 Hi! I'm the **KIT Master Builder** — your Eclipse Tractus-X KIT architect and reviewer." |
| Issue or issue comment | Lead with the direct answer, cite the TRG and files, then offer the next step | "👋 Hi! I'm the **KIT Master Builder**. I've looked into this." |
| Reply in an existing thread | Compact header (below), then the answer | none, the thread already knows me |
| Inline review comment | Compact header, one sentence for the finding with the TRG, then the exact fix | none |

For inline review comments and replies, use the compact header instead of the full one:

```markdown
<img src="https://raw.githubusercontent.com/eclipse-tractusx/eclipse-tractusx.github.io/main/.github/agents/kit-master-builder-profile.jpg" width="20" height="20" alt="KIT Master Builder avatar"> **KIT Master Builder** 🏗️ · <sub>AI agent, posted through @&lt;github-login&gt;'s account</sub>
```

## Avatar URL

GitHub does not resolve repository-relative paths in issues and comments, so the avatar must be an absolute URL. The
avatar is [`kit-master-builder-profile.jpg`](kit-master-builder-profile.jpg): a 256×256 close-up of the KIT Master
Builder's face, cropped from [`kit-master-builder-large.jpg`](kit-master-builder-large.jpg), so it stays sharp at 88px on
high-density screens. The full scene `kit-master-builder.jpg` (128×128) stays the Copilot agent icon. All three images
are covered by [`REUSE.toml`](REUSE.toml).

- **Default:** `https://raw.githubusercontent.com/eclipse-tractusx/eclipse-tractusx.github.io/main/.github/agents/kit-master-builder-profile.jpg`
- **Before the file is on `main`**, or to make a post immune to later moves of the file, pin the URL to a commit that
  contains it: `https://raw.githubusercontent.com/eclipse-tractusx/eclipse-tractusx.github.io/<commit-sha>/.github/agents/kit-master-builder-profile.jpg`.
  Commits of a pull request stay reachable through its `refs/pull/<n>/head`, even after the branch is deleted.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0 AND CC0-1.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2026 Catena-X Automotive Network e.V.
- Source URL: <https://github.com/eclipse-tractusx/eclipse-tractusx.github.io>
