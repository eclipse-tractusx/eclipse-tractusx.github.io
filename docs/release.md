# Release Guidelines

Welcome to Eclipse Tractus-X Release Guidelines, known as TRGs. With Release Guidelines, we are defining quality
criteria for our repositories, products and artifacts in general. TRGs are numbered and grouped into sections, to
provide an easy-to-use overview. The git history of the TRGs can be used to browse changes made throughout the project
history. You can also check the [TRG Changelog](release/trg-0) to get a better view on the history of
new/changed/deprecated TRGs.

## Process

The process of introducing or altering a TRG is straight-forward. It consists of the following phases and events:

1. A proposal is created.
2. The proposal is improved by providing feedback
3. The committer group is deciding to accept or deny the proposed changes

More details in the following sections

### Proposal

A new TRG, or a change to an existing one is proposed by raising a PR. This can be done by any contributor or committer.
The PR is raised against the `main` branch
of [eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/).
Changes can be done by directly updating the existing Markdown files. New TRGs should already be put to a matching
section. In case a new TRG does not fit do an existing section, a new section can be proposed or asked for by reviewers.

As soon as a proposal is ready for committer review, it has to be announced
via [Tractus-X mailing list](https://accounts.eclipse.org/mailing-list/tractusx-dev). Additionally, the committer group
is mentioned directly on the PR by tagging `@eclipse-tractusx/automotive-tractusx-committers`.

### Review

Feedback to announced proposals is welcome by everybody. It should be provided by using the review functionality of
GitHub. Reviews are especially needed from Tractus-X committers, since they are the ones who are accepting or dropping
proposals.

During review, the following things could be paid special attention to:

- Does the TRG focus on a single topic? If not, consider splitting to multiple TRGs.
- Is it clear, how to comply with the TRG? Avoid room for interpretation, where possible.
- Would it be a lot of effort to comply with the TRG? Consider introducing a "mandatory from" date.

### Accept / Drop

A new TRG, or changes to an existing TRG are __accepted__, if all the following is true:

- at least 7 committers did approve the change
- the proposal PR is open for at least 2 weeks, to give everyone a fair amount of time to provide feedback or request
  changes
- All requested changes are addressed. Not necessarily every requested change has to be implemented, if there is a
  consensus in the committer round, that the original proposal is good enough.

If the mentioned criteria is met, the PR is merged and the release guideline is mandatory for all Tractus-X products and
repositories. There might be cases, where complying with a new or changed release guideline takes considerable effort,
so that proper planning should be done. In these cases, a "mandatory from" date should be discussed in the review phase
and the actual date highlighted at the beginning of the TRG.

A release guideline proposal is __dropped__, if there are too many changes requested and a consensus cannot be found
across the committer group on how to alter the proposal to an acceptable state. Dropped, or rejected release guideline
proposals are documented by listing the PR and a short description of the proposed change
in [Changelog & Drafts](release/trg-0/trg-0.md).

### Deprecating TRGs

Proposals to deprecate existing TRGs are also introduced via PR. To keep the list of TRGs small and easy to read,
deprecating TRGs is done by simply deleting it and mention the deleting in [Changelog & Drafts](release/trg-0/trg-0.md).
