---
title: FAQ
sidebar_position: 1
---

## The ECA Check is failing while merging a PR. What to do?

See the [Handbook](https://www.eclipse.org/projects/handbook/#resources-github)

1. Verify that all contributors to this PR have a signed ECA.
1. Verify that the EF account email addresses and the primary email address configured in GitHub match.
1. Verify that your commits include the correct email address (tip: add .patch to the GitHub commit url to see the plaintext).
1. Make sure you have added your GitHub ID to your Eclipse profile (Section: Social Media Links).
1. Check the [Helpdesk](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/?sort=created_date&state=opened) issues, if there is a known problem or open an issue.

## How can I check that somebody has a valid ECA?

- Go to your Eclipse profile, click on "Eclipse Contributor Agreement" -> ECA Validation Tool

## How can I become an official Tractus-X contributor with triage role?

See the [Getting Started Page](/docs/oss/getting-started#extended-contributor-permissions)

## How do I figure out the user name in Eclipse (= GitLab) and GitHub?

Use the [Eclipse User Profile REST services](https://webdev.eclipse.org/docs/api/eclipsefdn-profile-api/#tag/User-Profile)

```md
- Get the profile with the Eclipse user name:
https://api.eclipse.org/account/profile/{eclipse_username}
- Get the profile with the GitHub user name:
https://api.eclipse.org/github/profile/{github_username}
```
