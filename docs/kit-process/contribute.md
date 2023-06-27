---
title: Contribute
---

On this page you find a FAQ which is focused on question regarding your contribution to the Tractus-X project.

## Need help ?

As described we try to answer as many questions as possible, but it will be the case that you won't find an answer. If you find yourself in this situation head to our [community repository](https://github.com/eclipse-tractusx/community) and raise an [issue](https://github.com/eclipse-tractusx/community/issues/new/choose) or search the [disucussion section](https://github.com/eclipse-tractusx/community/discussions). If you don't find something within the dicsussion section we encourage you to open a new discussion! The community will help!.

## How to contribute ?

If you and your team want to contribute to an existing KIT or even suggest and work on an own KIT you have to fufill a small set of Prerequisites.

1. Become a Eclipse Foundation contributer. See this [roadmap](/docs/kit-process/contribute.md#how-to-become-a-tractus-x-contributer)

2. Make yourself familiar with git best practices, the eclipse contribution guidelines and our processes.
   - [Getting Started with git](https://docs.github.com/en/get-started/getting-started-with-git)
   - [Eclipse Contribution Guidelines](https://wiki.eclipse.org/Development_Resources/Contributing_via_Git)
   - [Tractus-X processes](/docs/kit-process/processes/)

## How to obtain a Tractus-X repository ?

After your KIT suggestion is accepted your need a Tractus-X repository. Since Tractus-X ist part of the eclipse foundation the repositories are managed by the foundation. Thus you have to request the creation of a repository within the Tractus-X project at their GitLab.
You find their Issue Section [here](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues). Raise an issue with the following information:

- The name should have the following format:

  `Tractus-X: New GitHub Repository '\<Repo Name\>'`

- Fill the request body with

  - an Repository Name
  - a short description
  - reference the the Tractus-X GitHub organisation

    `https://github.com/eclipse-tractusx`

  - tag Daniel Miehle, Siegfried Kiermayer for approval

- [Example](https://gitlab.eclipse.org/eclipsefdn/helpdesk/-/issues/2713)

## How to update the documentation on the Tractus website ?

We have a page where we exlpain the process. You find it [here](/docs/kit-process/processes/update-documentation.md)

## How to become a Tractus-X contributer ?

To become a Tractus-X contributer you have to do the following steps:

1. Create an Eclipse Foundation account following this [link](https://accounts.eclipse.org/user/register).

2. Sing the Eclipse Contributer Agreement.
   After you signed the agreement it takes some time until it is confirmed. Usually it is the next day, sometime it takes up to some days. This is completely dependent on the eclipse foundation.

### Importand Note

While registring make sure to use your **email used for your github account**! There are automated checks in place that make sure a commited change is done by an eclipse contributer, it will be rejected otherwise! You are a eclipse contributer as soon as you signed the eclipse contribution agreement.

## How to suggest a new KIT ?

If you have an idea for a new KIT the Tractus-X community invites you to propose your idea. You find a description for this process [here](/docs/kit-process/processes/create_KIT_page.md)

## How to Version your KIT ?

View the Tractus-X [versioning scheme](/docs/kit-process/versioning.md). On this page you find our versioning scheme we recommend you to follow in your KIT.

## How to create a new release ?

Usually a new version is assigned when a new release is created. So a the version and release are closely releated. Below you find the github documentation to manage your [releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

## What to do with an project external KIT repository ?

It may be the case that you already started the development of your KIT outside of the Tractus-X project. In that case you should move your progress to your kit repository within the Tractus-X project. If you don't have an Tractus-X repository consult this [guide](/docs/kit-process/contribute.md#how-to-obtain-a-tractus-x-repository). Otherwise there are two options to move your content.

1. If you have write access to your repositrory and it is empty you may see this code-tabe within the empty repository:

   ![import repository](processes/resources/import-repository.png)

   Click on the `import repository` button. Enter your clone url on the next page and your current repository will be cloned into the empty repo. After this is done you are ready to go.

2. If the repository is not empty use this option:

   - create a fork
   - create a branch
   - add all you content to the created branch
   - create a PR to your repository within the Tractus-X Project.
   - merge the branch into the project.
   - Done

3. If your repository is empty:

   - you must have write rights to your Tractus-X repository
   - checkout out your current repository where you work on
   - add the empty repository as remote repository with this cmd

     `git remote add origin <ssh-path-to-repository>`

   - create a new main branch

     `git branch -M main`

   - push your content

     `git push -u origin main`

After moving your content to the new repository you should make your old repositry as read-only and add a link to the new repositry to your Readme. You find this option within the settings of your repository in the "Danger Zone" at the bottom of your settings page. Note that for other git providers this may be reached in different ways.
