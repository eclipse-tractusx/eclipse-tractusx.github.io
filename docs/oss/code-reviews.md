---
title: Code reviews
sidebar_position: 3
---

This page will contain guidelines, good practices and mandatory steps, that have to be performed, when doing a review
of contributions to Eclipse Tractus-X. These reviews are usually done on pull requests.

Generally all code contributions have to be done via pull requests (PRs) in the Tractus-X GitHub repositories.

General procdure for a PR:

- Create the PR
- Assign somebody qualified to make the content review for your PR
- PR is reviewed and corrected if necessary
- Assign a committer to make the review for the OSS governance
- PR is reviewd and corrected if necessary
- PR is merged by a committer

Content review:

- Check for meaningful and descriptive commit messages
- These checks are defined by the product teams

OSS governance review:

- Check for meaningful and descriptive commit messages
- Check if copyright headers have been added to new files
- Check if new third-party libraries used have also been added to the DEPENDENCIES file. All libraries should be approved, if there are any with restricted status look for issue numbers. Libraries with the status "rejected" cannot be accepted.
- Check if IP issues are opened
- to be continued
