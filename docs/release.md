# Release Guidelines

## Introduction

Welcome to Tractus-X Release Guidelines, known as TRGs. TRG numbers are assigned by the TRG
editors, and once assigned never changed. The version control history of the TRG texts represent their historical
record. The TRGs are indexed by topic for specialist subjects.

You find the overarching Changelog [here](release/trg-0) to see when new TRGs have been added.

## Process

This TRG process is open for all and has the main goal of providing reasonable defaults for workflows and requirements on being able to easily contribute, maintain and run products/components across Eclipse Tractus-X.

### Create new draft

- Create a draft version under release/trg-0
  - Reserve the TRG number already
- Create a pull request for merging the draft version (IF it helps to visualize / present the draft on the website) and get an approval
- Announce the new Draft TRG on developer mailinglist

#### Release fast or slow

If you now have a small change, like a typo or updating description  you do a fast release. If you create a new and big TRG (which takes time to do) you do a slow release.

- **Fast**
  - Create new Pull Request for moving the draft version to its final location
  - Address all issues in the PR and merge
  - Announce the new TRG on the developer mailinglist
- **Slow**
  - Create new Pull Request for moving the draft version as a PRERELEASE version in its final location
  - Add a hint on when the TRG becomes mandatory
  - Address all issues in the PR and merge
  - Announce the new TRG on the developer mailinglist
  - When the TRG mandatory date is due, remove the hint and move it from PRERELEASE to normal (as all other TRGs)

### Update existing TRG

The critical difference is that you do the same thing with slow and fast release of new draft but instead of creating a new draft, you copy and paste the existing TRG (the TRG to change) into the draft folder.

### Deprecated existing TRG

Create a new PR which already deprecates the TRG without a draft state. Deprecation means updating the post history and marking as much as possible with strikethrough markdown.
