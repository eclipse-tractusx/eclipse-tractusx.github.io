---
title: Creating an open API documentation
sidebar_position: 3
---

In our [Docusaurus-openAPI-docs](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/wiki#docusaurus-openapi-docs-github-repo) Plugin section, we give you an introduction about the method we use to generate `documentation pages` from `yaml` definitions. We strongly suggest you to check that section where you can find links to the plugin documentation and take a general overview of the results we are gaining from it.

In this `wiki` page we describe the steps to generate the `.mdx` files from the `yaml` definitions, that later will be translated in to `documentation pages` by Docusaurus.

In our example we are going to:

- Define our openAPI methods in the `openAPI.yaml` located in the `root` folder from our project.
- Generate `.mdx` files with the plugin in our `/docs-kits/kits/exampleKIT/SoftwareDevelopmentView/exampleAPI` folder.

1. Like mentioned, the first step is to define the desired methods that are in our interest to describe in a `yaml` file. In our case the name of the file is `openAPI.yaml` located in the `root` folder.

2. In the `Docusaurus.config.js` a required plugin's set up is already defined, you'd need to provided under the `plugins` array a new instance in the 'config' object, like following:

    ```javascript
    {
      plugins: [
        [
          'docusaurus-plugin-openapi-docs',
          {
            id: "docs-kits",
            docsPluginId: "docs-kits",
            config: {
                            //*************** add the bellow declaration with your specific instance data ******************
              exampleController: { // modify with unique id
                specPath: "./openAPI.yaml", // Path to designated spec file
                outputDir: "./docs-kits/kits/exampleKIT/SoftwareDevelopmentView/exampleAPI", // Output directory for generated .mdx docs
                sidebarOptions: {
                  groupPathsBy: "tag",
                },
                            // **********************************************************************************************
              },
              // Other instances...
            },
          }
        ],
      ],
    }
    ```

3. Now making use of the `CLI` we just need to provide the next `command`:

`npm run docusaurus gen-api-docs exampleController`

After the command runs, in the designated folder `/docs-kits/kits/exampleKIT/SoftwareDevelopmentView/exampleAPI`, one `.mdx` file will be generated for each method described in the `openAPI.yaml` file.

_**NOTE**_ This is a brief description of the main steps to generate `documentation pages` as docs in our project, there are several options and commands that can be passed to configure the `.mdx` files generation. Please check the [docusaurus-openAPI-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)
