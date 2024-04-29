---
slug: community-office-hour-2024-01-19
title: Community Office hour 2024-01-19
authors: 
    - harald_zierer
tags: [community, meeting-minutes]
---

## office hour meeting minutes

### System team
- No update

### Security team
- Many open cases (>10) from GitGuardian, please check you inboxes (or spam folders)
- A bug bounty program is in the making

### FOSS
- Happy new year: Don't forget to update the year in your copyright headers
  - some corner cases will be clarified until next office hour
- There is a new draft [TRG 2.06](https://eclipse-tractusx.github.io/docs/release/trg-0/trg-2-6) regarding dependabot usage
  - please update your `DEPENDENCIES` file(s) to ensure that the suggested changes are license compliant

### Open planning / community
- Last open planning session went very well
- There's a new [open meetings](https://eclipse-tractusx.github.io/community/open-meetings) page

### Open discussion
- discussion regarding the "Notice for docker image" to be moved into a separate file.
  - [TRG 4.06](https://eclipse-tractusx.github.io/docs/release/trg-4/trg-4-06) will be updated to mandate a dedicated file.
  - Please keep in mind to update your docker build workflow to include the new file instead of the `README.md`. See [example of TRG 4.05](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/204cfddb5531fd6430001c0baf0ca12a97bb9718/docs/release/trg-4/trg-4-05.md?plain=1#L99-L100) for reference.
- discussion on where to discuss about new / changes to existing TRGs: TRG draft section, within the PR or GitHub discussions
  - Sebastian is going to create a PR so everybody can vote on it
- As multiple people struggle with our current docusaurus[^1] setup, there will be a training/hands-on session soon. It's will be announced on the mailing list.
- Content updates for KITs: Please ensure that no copyrighted content (incl. Catena-X) is contributed to Tractus-X.
- False-positive issues opened by Trivy - please raise a "tooling support" issue in the [sig-security](https://github.com/eclipse-tractusx/sig-security) repository

[^1]: [docusaurus](https://docusaurus.io/docs): the generator for the pages you are reading right now
