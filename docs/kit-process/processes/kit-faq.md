---
title: KIT FAQ
---

:::info
This page is currently under construction!
:::

On this page you will find an FAQ focused on questions related to the KIT documentation. There is also a general [FAQ for Tractus-X](/docs/dev_faq.md) and the [Tractus-X link collection](/docs/dev_links.md).

## How do I start?

There are several resources providing information about contributing to the Eclipse Tractus-X project. Before you begin, please familiarize yourself with the following documentation:

- [Getting started](../../../docs/oss/getting-started.md)
- [How to contribute](../../../docs/oss/how-to-contribute.md)
- [Eclipse project roles](../../../docs/oss/contributor-committer.md)
- [Tractus-X link collection](/docs/dev_links.md)

Tractus-X is an Eclipse project, the [Eclipse Foundation Project Handbook](https://www.eclipse.org/projects/handbook/#legaldoc) is the leading documentation.

## How do I get support?

If you have any questions not answered here, in the general [FAQ](/docs/dev_faq.md) or in the documentation, please feel free to ask questions in our community channels:

- [Tractus-X General Chat Room](https://chat.eclipse.org/#/room/#tools.tractus-x:matrix.eclipse.org)
- [Tractus-X Developer Mailingliste](https://accounts.eclipse.org/mailing-list/tractusx-dev)

There are several issue tracker for different purpose, please see the [issue tracker documentation](/docs/oss/issues.md).

## How do I become a Tractus-X contributor?

See [here](/docs/kit-process/processes/kit-faq.md#how-do-i-become-a-tractus-x-contributor)

:::info
You are an Eclipse contributor once you have signed the Eclipse Contributor Agreement (ECA).
GitHub has automated checks that check your contributions. Without a signed ECA, the [checks will fail](/docs/dev_faq.md#the-eca-check-is-failing-while-merging-a-pr-what-to-do).
:::

## How to contribute ?

If you and your team want to contribute to an existing KIT or suggest a new KIT you have to fulfill a small set of prerequisites.

1. See the process for creating a new KIT (TBD)

2. Become an Eclipse Tractus-X project contributor, see [here](/docs/kit-process/processes/kit-faq.md#how-do-i-start)

<!--
1. Make yourself familiar with git best practices, the Eclipse contribution guidelines and our processes.
   - [Getting Started with git](https://docs.github.com/en/get-started/getting-started-with-git)
   - [Eclipse Contribution Guidelines](https://wiki.eclipse.org/Development_Resources/Contributing_via_Git)
   - [Tractus-X processes](/docs/kit-process/processes/)

-->

## How do I get a Tractus-X repository?

After your KIT suggestion is accepted you need to [request a Tractus-X repository](/docs/oss/issues.md#create-manage-a-repository-in-eclipse-tractusx). Tractus-X is an Eclipse project, the repositories are managed by the Eclipse Foundation.

## How to update the KIT documentation on the Tractus-X website ?

We have a page where we explain the process. You find it [here](/docs/kit-process/processes/update-documentation.md)

## How to suggest a new KIT ?

(TBD)
<!--
If you have an idea for a new KIT the Tractus-X community invites you to propose your idea. You find a description for this process [here](/docs/kit-process/processes/create_KIT_page.md)
-->
## How to version your KIT ?

(TBD)
<!--
View the Tractus-X [versioning scheme](/docs/kit-process/versioning.md). On this page you find our versioning scheme we recommend you to follow in your KIT.
-->

## How to create a new KIT release ?

(TBD)
<!--
Usually a new version is assigned when a new release is created. So a version and release are closely related. Below you find the GitHub documentation to manage your [releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
-->

<!--
## What to do with a project external KIT repository ?

It may be the case that you already started the development of your KIT outside the Tractus-X project. In that case you should move your progress to your kit repository within the Tractus-X project. If you don't have a Tractus-X repository consult this [guide](/docs/kit-process/contribute.md#how-to-obtain-a-tractus-x-repository). Otherwise, there are two options to move your content.

1. If you have write access to your repository, and it is empty you may see this code-tab within the empty repository:

   ![import repository](resources/import-repository.png)

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

After moving your content to the new repository you should make your old repository as read-only and add a link to the new repository to your Readme. You find this option within the settings of your repository in the "Danger Zone" at the bottom of your settings page. Note that for other git providers this may be reached in different ways.

## How to request an artefact/request review?

Raise an issue within the Tractus-X Repository and add a description where to find the artefact/deliverable.

## How to request a promotion?

Raise an Issue within the Tractus-X Repository and request a promotion to the next development stage. Consult the [Graduation Process](/docs/kit-process/graduation-process.md) page to know which artefacts must be finished to be able to be promoted to the next stage. Additionally, link the review Issue to each artefact! If it is the case that an artefact is not relevant to you provide a detailed description why.

-->
## General KIT workflow

(TBD)
<!--
In this section we describe the general workflow on how to contribute with git:

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

It may occur that after the release of a new Catena-X version that you want to change something on your released documentation. Don't create a PR on the versioned documentation since it will be refused and more importantly it defeats the purpose of versioning! If it is the case that you need to change something, we want to consider the following:

1. Is it feasible to let the error be within the release e.g. typo or similar minor errors
2. If it is a critical error, raise an issue within the [community repository](https://github.com/eclipse-tractusx/community). Explain your problem and why it is critical that you need to add a change. The issue will be reviewed and then there will be a decision made whether the changes will be approved or not.
(TBD)
-->
