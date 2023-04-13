---
title: Code reviews
sidebar_position: 30
---

This page will contain guidelines, good practices and mandatory steps, that have to be performed, when doing a review
of contributions to Eclipse Tractus-X. These reviews are usually done on pull requests.

Generally all code contributions have to be done via pull requests (PRs) in the Tractus-X GitHub repositories. All PRs have to be reviewed.

We propose a 2-step approach for reviews of PRs.

## General procdure for a PR

- Create the PR
- Step 1: Content Review
  - Assign somebody qualified to make the content review for your PR ( a contributor from your produc team)
  - PR is reviewed, review comments are added to the PR
  - work on the review comments (correct / extend if necessary)
  - ask for re-reviewing if necessary
- Step 2: Assign a committer to make the review for the OSS governance
  - PR is reviewed, review comments are added to the PR
  - ask for re-reviewing if necessary
- PR is merged by the committer who has made the review

## Step 1 - Content review (the responsibility lies with the product team)

- Content checks are defined by the product teams
- Check for meaningful and descriptive commit messages (amend / sqash committs for a PR)
- Check if copyright headers have been added to new files
- Check if new third-party libraries are used:
  - are they also been added to the DEPENDENCIES file,
  - all libraries should have the status approved,
  - if there are any with status restricted look if issue numbers are listed in the DEPENDENCIES file,
  - libraries with the status "rejected" cannot be accepted.
- Check if IP issues are opened

## Step 2 - Final review (made by a committer)

- Check if the Content Review was succesfull and adequately documented. If not, you have the right to give back the review request.
- Double Check for meaningful and descriptive commit messages
- Double Check if copyright headers have been added to new files
- Double Check if new third-party libraries used have also been added to the DEPENDENCIES file. All libraries should be approved, if there are any with restricted status look for issue numbers. Libraries with the status "rejected" cannot be accepted.
- Double Check if IP issues are opened
- If the contribution is larger (e.g. > 1000 loc) you have to [request an IP check]((/docs/oss/issues#eclipse-gitlab-ip-issue-tracker)) from the EF. (TODO AWI: link to TRG 7.03)
