---
title: TRG 2.06 - Dependabot
---

| Status | Created      | Post-History    |
|--------|--------------|-----------------|
| Draft  | 4-Jan-2024   | Initial release |

## Why

GitHub Dependabot is a powerful tool designed to help keep your project's dependencies up-to-date. By automating the process of checking for updates and creating pull requests when new versions are available, Dependabot ensures that your project benefits from the latest features, bug fixes, and security patches.

Key Benefits:

- Security: Receive timely updates for security vulnerabilities in your project's dependencies.
- Stability: Keep your project stable by staying current with the latest releases.
- Efficiency: Automate the time-consuming task of manually checking for updates and creating pull requests.

## Description

Dependabot is an excellent fit for application dependencies/vulnerabilities. By regularly checking for updates, it allows you to seamlessly integrate the latest improvements into your application.

For Docker images, Dependabot ensures that your base images and dependencies are regularly updated, reducing the risk of using outdated or vulnerable components.

Dependabot can also assist in keeping used GitHub Actions up to date. This is crucial for ensuring that your workflows leverage the latest GitHub Actions features and improvements.

### Version updates

To enable Dependabot for version updates, create a dependabot.yml file in the root of your repository. See provided example below.
More information:  
<https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates>  
<https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file>

### Security updates

To enable Dependabot for security updates, you can leverage GitHub's Security tab. Go to the "Security" tab in your repository and follow the prompts to enable automated security updates.
More information:  
<https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates>  

## Example
