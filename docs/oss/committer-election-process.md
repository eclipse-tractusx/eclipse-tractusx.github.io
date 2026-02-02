---
title: Committer Election Process
sidebar_position: 40
---

Applying the meritocracy principle to open source development, the more a person contributes, the more responsibility it may take. This principle has been incorporated by the Eclipse Foundation by allowing committers to promote a contributor to a committer ([Eclipse Foundation Handbook, Committer Elections](https://www.eclipse.org/projects/handbook/#elections-committer)). This page addresses the following questions in the committer journey:

- How do I become a committer process-wise? (committer prospect perspective)
- How to promote a contributor? (committer perspective)

:::warning[Reminder to committers starting elections: It's about the task fit and trust!]
Committers are not to be voted because of popularity or what they might do in future. They need to proof they've fulfilled the tasks, we see in a committer's duties, in the past. Further they must be transparent, open and trusted. If we don't think someone will in future always remain that way, we **MUST NOT** promote them.
:::

The following steps summarize the handbook on the committer election process:

1. Start a committer election (1 week)
2. Committers in the project vote (accept, deny, abstain) with a reason
3. After the committer election has been closed, the project leads and the project management committee (see [roles](./contributor-committer.md)) decide based on the committer votes
4. If the contributor has been accepted, then there is some paperwork to do with the Eclipse Foundation

## Starting a Committer Election

This is the most crucial part about the committer election. The committer election is commonly prepared by the contributor and the committer - we only promote persons who want to be promoted. Together they decide on how much contributions ([Eclipse Foundation Handbook](https://www.eclipse.org/projects/handbook/#elections-contribution)) are enough following the [eclipse tractus-x expectations of the committer role](./contributor-committer.md#committer).

To provide a useful heuristic for a nomination, we **RECOMMEND** the following template. Remember that the evaluation (with checking the linked information) **MUST NOT** take a committer more than 15 minutes. While the template provides up to 13 links to issues and pull requests, we **RECOMMEND** 7 links at maximum. Thus, pick examples of good work.

:::tip
There is neither styling nor hypertext allowed. The election text relies on bare text formatting (none). Thus links are not embedded.
:::

```markdown
[NAME] has been an integral part of the Eclipse Tractus-X project since [FIRST CONTRIBUTION YEAR-MONTH]. His contributions have been impactful, as he actively participates in discussions and consistently enhances core projects through optimizations and improved code quality.

[ADD Personalized Description of Contributor]

Community Engagement & Collaboration:

[ADD 1-2 Office Hour moderation round robin, or mailing list participantion, tractus-x community days, matrix chat participation]

Code Contributions & Reviews:

[NAME] technical contributions span multiple projects, demonstrating both skill and commitment:

[Open Source Product 1]:
- [add 2-3 significant contributions]

[Open Source Product 2]:
- [add 2-3 significant contributions]

[Open Source Product 3]:
- [add 2-3 significant contributions]

Bug Reports & Improvements:

[NAME] has identified and reported key issues, leading to critical improvements:

- [add 2 Bug Tickets]

TRG Compliance & Enforcement:

[NAME] has actively contributed to TRG compliance efforts, reinforcing best practices:

- [add 2 TRG Tickets]


[NAME]'s work has had a lasting impact on Tractus-X. As a committer, they will continue driving advancements and supporting the community with his [EXPERTISE] expertise which is really essential for the success of this project.

Because of his proactive commitment and constant efforts to bring quality code contributions to Eclipse Tractus-X, it is my privilege to nominate [NAME] as a committer for Eclipse Tractus-X.

In case, you need further contributions for evaluation, please let me know. I restricted them on purpose.
```

The committer files a committer election via [eclipse foundation's project page](https://projects.eclipse.org/projects/automotive.tractusx/nominate/CM) ("Nominate a Committer"). A mail to the [dev mailing list](./how-to-contribute.md#dev-mailinglist) will be sent automatically after nomination.

Example elections:

- [ReneSchroederLj](https://projects.eclipse.org/projects/automotive.tractusx/elections/election-rene-schroder-eclipse-tractus-x) (applying the template)
- [tom-rm-meyer-ISST](https://projects.eclipse.org/projects/automotive.tractusx/elections/election-tom-meyer-eclipse-tractus-x) (prior to the template)
- [mhellmeier-ISST](https://projects.eclipse.org/projects/automotive.tractusx/elections/election-malte-hellmeier-eclipse-tractus-x) (prior to the template)

### Things to Consider during the Committer Election

To ensure a good fit of committers, consider the following voting mechanics:

1. As we expect committers to participate during votings, it is **RECOMMENDED** to abstain with an explicit comment. Common reasons are e.g., insufficient time to review evaluate the election in the week.
2. It's our goal to find a consent about who is in the group of committers:
   1. If someone raises objections via the election or the mailing list, those are taken seriously.
   2. The project leads resolve the dispute with the PMC when deciding about acceptance based on the votes.
