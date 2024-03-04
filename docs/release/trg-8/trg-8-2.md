---
title: TRG 8.02 - Dependabot
---

| Status | Created      | Post-History          |
|--------|--------------|-----------------------|
| Update | 04-Mar-2024  | Move & update TRG     |
| Active | 12-Feb-2024  | Publish TRG           |
| Draft  | 4-Jan-2024   | Initial release       |

## Why

Dependabot automates dependency updates, generating PRs for new versions to keep your project current with latest features, bug fixes, and security patches.

## Description

Dependabot can be used for repositories with dependencies managed by package managers for languages like [JavaScript, Python, Ruby, Java, etc., and for applications using Docker images or GitHub Actions](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#package-ecosystem).

To enable Dependabot for version updates, create a `dependabot.yml` file in `.github` directory the root of your repository. 

Schedule Dependabot to run at least once a week with `interval: "weekly"`.

Customize the `open-pull-requests-limit` to your preference.

:::caution[Keep the dependencies file up to date]
Be careful, Dependabot PR merge can lead to out of date `DEPENDENCIES` file.
Make sure `DEPENDENCIES` file is updated by DASH tool.
:::

Dependabot alerts are displayed in the GitHub Security Alerts section. Mark vulnerabilities as non-exploitable or false positives with required justification directly within the alert. Resolve high severity alerts within 30 days; addressing medium severity alerts is also strongly recommended.

Adjust the workflow example below to match the [dependencies](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#package-ecosystem) in your repository.

Example Dependabot workflow:

```yaml
version: 2
updates:
    # Maintain dependencies for Maven
  - package-ecosystem: "maven"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

    # Maintain dependencies for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

    # Maintain dependencies for Docker
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

More information:  
<https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates>  
<https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file>

:::info[Importance of Implemented Tests]

Ensure that your project has comprehensive test coverage. Automated tests are crucial for quickly validating that updates do not introduce regressions or break existing functionality.
:::
