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

# KIT Master Builder

<img src="kit-master-builder-profile.jpg" width="96" align="right" alt="KIT Master Builder avatar">

The **KIT Master Builder** is the AI agent of this repository: an Eclipse Tractus-X KIT architect and technical writer
that creates, reviews and maintains KITs and checks them against the Tractus-X Release Guidelines. It works with
**Claude Code** and **GitHub Copilot**.

| File | Purpose |
|---|---|
| [`.claude/agents/kit-master-builder.md`](../../.claude/agents/kit-master-builder.md) | The agent for Claude Code |
| [`CLAUDE.md`](../../CLAUDE.md) | Claude Code session instructions: loads the Copilot instructions |
| [`kit-master-builder.agent.md`](kit-master-builder.agent.md) | The same agent for GitHub Copilot |
| [`../copilot-instructions.md`](../copilot-instructions.md) | Repository-wide Copilot instructions (chat and code review) |
| [`kit-master-builder-comment-template.md`](kit-master-builder-comment-template.md) | The avatar header it uses on GitHub |

## Start a chat in Claude Code from the command line

Install Claude Code once (`npm install -g @anthropic-ai/claude-code`) and run `claude` once to sign in. Then, from the
repository root or a worktree of it:

```bash
# Chat with the KIT Master Builder: the whole session runs as the agent
claude --agent kit-master-builder

# The same, with your first question already asked
claude --agent kit-master-builder "I want to create a new Sandbox KIT, scaffold everything for me"

# One answer printed to the terminal, then exit (quick lookups, scripts)
claude --agent kit-master-builder -p "What artifacts do I need to graduate my KIT from Incubating to Graduated?"

# Continue your last chat in this directory
claude --agent kit-master-builder --continue
```

Plain `claude` works too: `CLAUDE.md` makes Claude speak as the KIT Master Builder and hand KIT work to the
`kit-master-builder` subagent (`/agents` lists it). With `--agent`, the KIT Master Builder answers every message itself,
with its full knowledge base from the first line. To make it your default in this repository, put
`{"agent": "kit-master-builder"}` in `.claude/settings.local.json` (personal settings, keep them out of commits).

## Use it in GitHub Copilot

- **VS Code (Copilot Chat, agent mode):** open the repository, open the chat and select **KIT Master Builder** in the
  agent picker. Reload the window if it does not appear yet.
- **Copilot code review on github.com:** follows [`../copilot-instructions.md`](../copilot-instructions.md), so reviews
  come from the KIT Master Builder without selecting anything.

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0 AND CC0-1.0
- SPDX-FileCopyrightText: 2026 Contributors to the Eclipse Foundation
- SPDX-FileCopyrightText: 2026 Catena-X Automotive Network e.V.
- Source URL: <https://github.com/eclipse-tractusx/eclipse-tractusx.github.io>
