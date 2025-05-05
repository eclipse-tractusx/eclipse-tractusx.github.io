---
title: Code reviews
sidebar_position: 30
---

This page contains guidelines, good practices and mandatory steps, that have to be performed, when doing a review
of contributions to Eclipse Tractus-X. These reviews are usually done on pull requests.

Generally all code contributions have to be done via pull requests (PRs) in the Tractus-X GitHub repositories. All PRs have to be reviewed.

We propose a 2-step approach for reviews of PRs.

## General procedure for a PR

- Create the PR
- [Step 1:](#step-1---content-review-the-responsibility-lies-with-the-product-team) Content Review
  - Assign somebody qualified to make the content review for your PR (e.g. a contributor from your product team)
  - PR is reviewed, review comments are added to the PR
  - Work on the review comments (correct / extend if necessary)
  - Ask for re-reviewing if necessary
- [Step 2:](#step-2---final-review-made-by-a-committer) Assign a committer to make the review for the OSS governance
  - Successfully passed the team's content check (step 1)
  - PR is reviewed, review comments are added to the PR
  - Ask for re-reviewing if necessary
- PR is merged by the committer who has made the review

## Step 1 - Content review (the responsibility lies with the product team)

- Content checks are defined by the product teams
- Check for meaningful and descriptive commit messages (amend / sqash committs for a PR)
- Check if copyright headers have been added to new files
- Check if the DEPENDENCY file is up-to-date:
  - Check for changes of the used libraries (e.g. pom files, package-lock.json, ...), if so the DEPENDENCY must have been changed accordingly
  - All libraries should have the status approved
  - Check for libraries with status "rejected", if present, the contribution must be rejected
  - Check for libraries with status "restricted" and no IP issues (no issue number in the source column), if so,
    - a project committer must create the IP reviews for 3rd party libraries, see [here](/docs/release/trg-7/trg-7-04)
    - a GitHub issue has to be opened with the links to the newly opened IP issues in the associated repository
    - add this GitHub issue to the PR review comments
    - track this issue and update the DEPENDENY file accordingly

## Step 2 - Final review (made by a committer)

- Check if the Content Review was succesfull and adequately documented. If not, you have the right to give back the review request
- Double Check for meaningful and descriptive commit messages
- Double Check if copyright headers have been added to new files
- Double Check if new third-party libraries used have also been added to the DEPENDENCIES file. All libraries should be approved, if there are any with restricted status look for issue numbers. Libraries with the status "rejected" cannot be accepted.
- Double Check if IP issues are opened
- If the contribution is larger (e.g. > 1000 loc) you have to [request an IP check](issues.md#eclipse-gitlab-ip-issue-tracker) from the EF, see [here](/docs/release/trg-7/trg-7-03)
