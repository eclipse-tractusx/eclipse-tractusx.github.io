---
title: Understanding our multi instance and versioning behaviour
sidebar_position: 6
---

Like mentioned in the [important to know!](kit-structure.md#steps-to-add-a-newkit-documentation) section, In this `guideline` page we want to talk a bit about the structure, documentation instances, versioning and conditional rendering (non official) solution for the `versions dropdown` menu.

## Our multi-instance structure

We have structured our documentation i a way that it's divided in 3 instances/folders:

- `./docs` -> dedicated to the `Developer Hub` content (not versioned)
- `./docs-kits` -> dedicated to the `KITs` content (versioned)

With this structure we are able to have a better control and organisation of the code, and also allow us to have separated versions for each `instance` if needed.

Each instance/folder's sidebar is also defined in a separate file, like follows:

- `./docs` -> `sidebars.js`
- `./docs-kits` -> `sidebarsDocskits.js`

To understand and know more about the multi-instance [setup](https://docusaurus.io/docs/2.2.0/docs-multi-instance#setup) check the official documentation.

## Creating new versions

The creation/tagging of a new version will follow a scheduled period of time, through the CLI is very easy to do it as it's indicated in [here](https://docusaurus.io/docs/2.2.0/docs-multi-instance#tagging-new-versions), it is only needed to run the following command to tag a new version of the `docs-kits` instance:

```bash
npm run docusaurus docs:version:docs-kits 1.0.0
```

This `command` will freeze (create a copy) all the documentation included in the `./docs-kits` folder at the moment of the creation and storage said copy in the `./docs-kits-versioned_docs` folder. At the same time, it will create a copy of the `sidebarsDocsKits.js` file and it will storage it in the `./docs-kits_versioned_sidebars` folder.

That way `docusaurus` handles the different versions and is the reason why the `./docs-kits` folder is pointing always to the `Next` version.

_**IMPORTANT**_ do not tag a new version unless is explicitly requested by the `eclipse-tractusx` repository's committers.

## Versions dropdown menu

Following the [Navbar docs version dropdown](https://docusaurus.io/docs/2.2.0/api/themes/configuration#navbar-docs-version-dropdown) documentation, our `versions dropdown` menu is defined here:

```javascript
themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // ...
      navbar: {
        title: 'Eclipse Tractus-X',
        logo: {
          alt: 'Eclipse Tractus-X logo',
          src: 'img/logo_tractus-x.svg',
        },
        items: [
          // ...
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'docs-kits',
            position: 'right'
          },
          // ...
        ]
      }
      // ...
    })
```

This last declaration will include automatically all the created versions from the `./docs-kits` instance, but it will be displayed at all time. This is a behaviour that we wanted to avoid, because it could create a misunderstanding for the user and raised questions like: what documentation does that `version dropdown menu` is pointing at? what if other instance needs to be versioned as well? `Docusaurus` doesn't provided an official solution for this scenario, but the community provided a good one that you can check at the end of this [tread](https://github.com/facebook/docusaurus/issues/4389), it required to [swizzle](https://docusaurus.io/docs/2.2.0/swizzling) the `DocsVersionDropdownNavbarItem` to make the conditional rendering of it depending on the navigation location in the page.
