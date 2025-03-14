---
title: KIT Structure
sidebar_position: 8
---
## Project Structure

Following our project structure, the collection of our KITs documentation is developed in the `./docs-kits/kits` folder, where each KIT is a subfolder called by its name for organisation purposes. The name / naming convention of the folder for the KIT needs to follow [kebab-case](https://juniortoexpert.com/en/naming-convention/).

Each folder/KIT's content is structured in at least four pages/subfolders:

- Adoption View -> `adoption-view.md`
- Software Operation View -> `software-operation-view.md`
- Documentation -> `documentation.md`
- Software Development View/
  - Specification -> `software-development-view.md`
  - OpenAPI link to SwaggerHub
  - Another OpenAPI definition/
  - ...

## Steps to add a NewKit documentation

1. Create a folder under the `./docs-kits/kits` with the name of the KIT you are developing the documentation of using the kebab-case naming schema.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
    ```

2. Inside the `new-kit` folder, add a `changelog.md` file.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                └── changelog.md

3. Inside the `new-kit` folder, add a `adoption-view.md` file with the content that suits your use case.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                ├── changelog.md
                └── adoption-view.md
    ```

4. Inside the `new-kit` folder, add a `software-development-view.md` file with the content that suits your use case.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                ├── changelog.md
                ├── adoption-view.md
                └── software-development-view.md
    ```

5. Inside the `new-kit` folder, add a `software-operation-view.md` file with the content that suits your use case.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                ├── changelog.md
                ├── adoption-view.md
                ├── software-development.md
                └── software-operation-view.md
    ```

6. Inside the `new-kit` folder, add a `documentation.md` file with the content that suits your use case.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                ├── changelog.md
                ├── adoption-view.md
                ├── software-development.md
                ├── software-operation-view.md
                └── documentation.md

7. If you want to add additional pages to your KIT, add a folder with the same name as the .md file under which the pages should be added (e.g.`software-development-view` - `software-development-view.md`) and place the .md in it and the additional pages.

    ```md
    root
    └── docs-kits
        └── kits
            └── new-kit
                ├── changelog.md
                ├── adoption-view.md
                ├── software-operation-view.md
                └── software-development-view
                    ├── software-development-view.md
                    └── additional-page.md
                └── documentation.md
                    
    ```

8. To generate the `OpenAPI` based documentation of your KIT, please see the [api-hub](https://github.com/eclipse-tractusx/api-hub/blob/main/README.md) documentation and related [TRG 1.08 - Interface documentation (APIs)](https://eclipse-tractusx.github.io/docs/release/trg-1/trg-1-08/)

**For KITs without reference implementation:**

After evaluation, a "semi-automated" or "manual" solution is not considered effective.
Please place the openAPI.yaml file directly in your KIT folder and link it to the appropriate location in your .md file.
Optional for short APIs: Integrate your API in-line as a code block, for example: [Agent KIT](https://eclipse-tractusx.github.io/docs-kits/kits/knowledge-agents/development-view/api/agent/agent-get/).
Future: Standardized APIs will be released with yaml file in the Standard library. KIT links to standard and yaml published by the Catena-X e.V.

**For KITs with reference implementation:**

Please use (or adapt existing) automated workflows to publish on SwaggerHub. Maintain your openAPI.yaml and the publishing workflow in the repository of the reference implementation. Remove everything related to that from the website repo and only link to SwaggerHub in your KIT from now on. We utilize a user provided by the Eclipse Foundation to publish on SwaggerHub. Credentials for this user can be used through in the eclipse-tractusx GitHub org secrets and can be utilized in automated workflows. Pay special attention to the "swaggerHub" CLI commands. The location where the openAPI file is maintained may vary. The BPDM example showcases how the application is initiated to download and publish the current file from that location.

SWAGGERHUB_API_KEY: ${{ secrets.SWAGGERHUB_API_KEY }}
      SWAGGERHUB_USER: ${{ secrets.SWAGGERHUB_USER }}

Examples:
[BPDM Certificate Management](https://github.com/eclipse-tractusx/bpdm-certificate-management/blob/main/.github/workflows/publish-swagger-hub.yaml)
[Digital Product Pass](https://github.com/eclipse-tractusx/digital-product-pass/blob/main/.github/workflows/publish-swagger-hub.yaml)
[Tractus-X EDC](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/.github/workflows/publish-swaggerhub.yaml)

If you have any questions, please use our [“Tractus-X community call”](https://eclipse-tractusx.github.io/community/open-meetings) and prepare accordingly before merging.

7.Add your newly created KIT documentation to the Kits `sidebar` page, by incorporating the following declaration in the sidebar object of the `sidebar.js` file:

```javascript
    const sidebars = {
    // other sidebars
    kits: [
        // copy from here...
        {
        type: "category",
        label: "New KIT name", //change here according your KIT
        link: {
            type: "generated-index",
        },
        collapsed: true,
        items: [
            {
            type: "autogenerated",
            dirName: "kits/new-kit folder name given", //change here according your KIT
            },
        ],
        },
        // ...until here.
    ],
    };
    ```

    **Note** the sidebars may required bigger customisation based on your requirements, for that matters consult the [official documentation](https://docusaurus.io/docs/2.2.0/sidebar)

8. After the NewKIT documentation and the corresponding `sidebar` are created, you would want to make it accessible from the `NavBar` of the page. More specifically under the `KITs dropdown menu`. This is easily handled by `Docusaurus` in the `docusaurus.config.js` file, where you'll need to add to the existing `navbar` object your newly created `route` and `label` (name of kit) to be added as a `dropdown` menu item. More specifically in:

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
            type: 'dropdown',
            label: 'KITs',
            position: 'left',
            to: '/developer',
            items: [
              {
                to: '/docs-kits/kits/Business%20Partner%20Kit/Adoption%20View',
                label: 'Business Partner',
              },
              {
                to: '/docs-kits/kits/Data%20Chain%20Kit/Adoption%20View',
                label: 'Data Chain',
              },
              {
                to: '/docs-kits/kits/tractusx-edc/docs/kit/adoption-view/Adoption%20View',
                label: 'Connector',
              },
              {
                to: '/docs-kits/kits/Traceability%20Kit/Adoption%20View%20Traceability%20Kit',
                label: 'Traceability',
              },
              // ********* add here your object specifying "to" and "label" *********** 
            ],
          },
          // ...
        ]
      }
      // ...
    })
    ```

To know more about the `NavBar` options and how to implement this and other features in it please check the [Docusaurus - NavBar Documentation](https://docusaurus.io/docs/2.2.0/api/themes/configuration#navbar-dropdown)

## Important to know

The results of your newly created _KIT_ will be visible only (for now) in the `Next` version of the documentation. When a `new version` is due to be created, all of your additions plus the ones from other _KITs_ will be taking part of said new released. To understand more about how `Docusaurus` handle the [versioning](https://docusaurus.io/docs/2.2.0/versioning) and more specifically the [versioning of multi-instance](https://docusaurus.io/docs/2.2.0/docs-multi-instance) projects, please check the official documentation.

To access the `Next` and the rest of the versions, you'll notice a `dropdown` menu with all of them in the `top-right` corner of the `NavBar` that is only been displayed when the user is navigating any of the existing `KITs`.

Please check our [Understanding our multi-instance and versioning behaviour](/docs/website-guidelines/understanding-multi-instance_versioning) page, where we explain a little bit more in deep the structure of the project, the different instances of documentation, how to create versions and how the conditional rendering of the `versions dropdown` menu is been handled.
