---
title: Contribute FAQ
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

## How to request a artefact/request review?

Raise an Issue within the Tractus-X Repository and add a decription where to find the artefact/devliverable.

## How to request a promotion?

Raise an Issue within the Tractus-X Repository and request an promotion to the next development stage. Consult the [Graduation Process](/docs/kit-process/graduation-process.md) page to know which artefacts must be finished to be able to be promited to the next stage. Additionally link the review Issue to each artefact! If it is the case that an artefact is not relevant to you provide a detailed description why.

## General KIT Workflow

In this section we describe the general worklfow on how to contribute with git:

1. Create a fork of the repository where you want to contribute.

   → [how to fork](/docs/kit-process/processes/update-documentation.md#overview)

2. Create a new branch within your fork.
3. Add your contribution to that branch.
4. Once your contribution is complete create a Pull Request and wait for the review of your contribution.

   → [how to create a PR](/docs/kit-process/processes/update-documentation.md#overview)

## When to update the KIT documentation

You may update your KITs documentation as soon as you have published a new KIT Release. Note that your KIT release is **independent** of the Catena-C release! This means you can update your KITs documentation **at any time**! make sure to add your updates to the correct directories and keep you changelog up to date. You find more detailed information on how to update [here](/docs/kit-process/processes/update-documentation.md).

## What happens during the Catena-X Release

## What to do to change already within Catena-x released content

It may occurr that after the release of a new Catena-X version that you want to change something on your released documentation. Don't create a PR on the versionend documenation since it will be refused and more importantly it defeats the the purpose of versioning! If it is the case that you need to change something, we want to consider the following:

1. Is it feasable to let the error be within the release e.g. typo or similar minor errors
2. If it is a critical error, raise an issue within the [community repository](https://github.com/eclipse-tractusx/community). Explain your problem and why it is critical that you need to add a change. The issue will be reviewd and then there will be an decision made whether the changes will be approved or not.
