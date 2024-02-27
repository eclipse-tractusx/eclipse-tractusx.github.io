---
title: TRG 2.06 - Dependabot
---

| Status | Created      | Post-History    |
|--------|--------------|-----------------|
| Active | 12-Feb-2024  | Publish TRG     |
| Draft  | 4-Jan-2024   | Initial release |

## Why

GitHub Dependabot is a powerful tool designed to help keep your project's dependencies up to date. By automating the process of checking for updates and creating pull requests when new versions are available, Dependabot ensures that your project benefits from the latest features, bug fixes, and security patches.

Key Benefits:

- Security: Receive timely updates for security vulnerabilities in your project's dependencies.
- Stability: Keep your project stable by staying current with the latest releases.
- Efficiency: Automate the time consuming task of manually checking for updates and creating pull requests.

## Description

Dependabot is an excellent fit for application dependencies/vulnerabilities. By regularly checking for updates, it allows you to seamlessly integrate the latest improvements into your application.

For Docker images, Dependabot ensures that your [base images](https://eclipse-tractusx.github.io/docs/release/trg-4/trg-4-02) and dependencies are regularly updated, reducing the risk of using outdated or vulnerable components.

Dependabot can also assist in keeping used GitHub Actions up to date. This is crucial for ensuring that your workflows leverage the latest GitHub Actions features and improvements.

### Security updates

To enable Dependabot for security updates, you can leverage GitHub's Security tab. Go to the "Security" tab in your repository and follow the prompts to enable automated security updates.
More information:  
<https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates>  

### Version updates

To enable Dependabot for version updates, create a dependabot.yml file in .github directory the root of your repository. In order to reduce number of generated bump Pull Requests, recommendation is to change default interval to i.e. weekly, as well as limit open PRs. See provided example below.

### Example

A basic example of a dependabot.yml file, demonstrating configurations for for Maven, GitHub Action and Docker ([all options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#package-ecosystem)), is shown below:
Please note the interval, open pull requests limits as well as other parameters can be customized according to preferences.

:::caution
Be careful, Dependabot PR merge can lead to out of date DEPENDENCIES file.
Make sure DEPENDENCIES file is updated by DASH tool.
:::

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

:::info
Importance of Implemented Tests:

Ensure that your project has comprehensive test coverage. Automated tests are crucial for quickly validating that updates do not introduce regressions or break existing functionality.
:::
