---
title: Website Overview
sidebar_position: 2
---

```md
    *********************************************************
    ** DISCLAIMER                                          **
    ** YOU ARE ENTERING THE DANGER ZONE                     **
    ** IN THIS SECTION YOU ONLY FIND TECHNICAL             ** 
    ** ADVISE REGARDING THE WEBSITE ITSELF                 ** 
    ** IF YOU JUST WANT TO ADD CONTENT YOU ARE WRONG HERE! **
    *********************************************************
```

This documentation website was developed with [Docusaurus 2.0](https://docusaurus.io/) for the simplicity and benefits it offers for maintenance, upgrades, and contributions that can be performed in a simple and intuitive manner.

### How to add/update documentation

As an allowed user, you'll encounter 2 possible scenarios to modify the documentation of the project. In the following, you'll find instructions on how to modify the documentation in either scenario:

- #### Adding/Modifying `.md` files in the `./docs`, `./docs-kits` and `./blog` folder

One of the benefits of [Docusaurus 2.0](https://docusaurus.io/) is that if you [create a doc](https://docusaurus.io/docs/create-doc) by adding an `.md` &/or `.mdx` file under the mentioned folders (each folder is dedicated to an specific content which will be be explained in detail), a page will automatically be generated according to our theme. For more information about [configuration](https://docusaurus.io/docs/configuration), [styling](https://docusaurus.io/docs/styling-layout) and [advanced topics](https://docusaurus.io/docs/advanced), please consult the documentation.

**Tip** If you don't want to display the content of an `.md` file as a page, and avoid that its content is generated as a `sidebar` item, ([sidebar](https://docusaurus.io/docs/sidebar)) you should prefix the name of the file with an underscore key (_). In that way *Docusaurus* will ignore this file and will not generate a Docs page for its content.

**Example:** `_example.md`

- #### Generate openAPI based Documentation from `.yaml` files

In the [Plugins](/docs/website-guidelines/wiki#plugins) section, we describe the plugins involved in the `.yaml` files retrieval process that define the endpoints and methods of the various applications documented on our site. We also describe the generation of documents in the form of pages that present the  `.yaml` content in a clear and interactive way.

### MaterialUI Components

In the development of this project, we have used [MaterialUI](https://mui.com/) for the creation of the components detailed below:

- #### FAQs and ProductAccordionCard Components

The `<FAQsComponent />` and `<ProductAccordionCard />` make use of a [Basic Accordion](https://mui.com/material-ui/react-accordion/#basic-accordion), to toggle the answers to the frequently asked questions that we receive about the use of this application and the list of Products displayed in the `community` page.

The components forming the mentioned UI are imported as follows:

```javascript
  import Accordion from '@mui/material/Accordion';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import Typography from '@mui/material/Typography';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
```

- #### React-Slick Carousel

Our `<NewsTickerComponent />` is developed with the help of `React-slick:"^0.29.0"` and its `Slick-Carousel:"^1.8.1"`

For its installation and use, you can follow one of these links:

- [NPM](https://www.npmjs.com/package/react-slick)
- [GitHub](https://github.com/akiran/react-slick)
- [DOCS](https://react-slick.neostack.com/docs/get-started)

In our project, we use the `NewsTicker` component to display the main titles of news written in the `./blog` folder and displayed in the  `HomePageHeader` component.

### Plugins

- #### Docusaurus-Plugin-Remote-Content [GitHub Repo](https://github.com/rdilweb/docusaurus-plugin-remote-content)

With this plugin, we are able to retrieve files containing the `yaml` definitions of the methods and endpoints we are interested in from any site/repository (GitHub or not). Once the file is fetched, a local copy is generated. We can then manipulate the copy and store it as we see fit.

Its configuration and use is described [here](https://github.com/rdilweb/docusaurus-plugin-remote-content#alright-so-how-do-i-use-this)

**Note** In our project, we use `npm` as our package manager. The documentation of the plugin uses `yarn`. Make sure you change the `command line` by adapting the declaration, for example: `npm install docusaurus-plugin-remote-content` instead of `yarn add docusaurus-plugin-remote-content`

For example, if we want to retrieve and have a local copy of `example.yaml` located at `https://my-page.com/folder1/subfolder1.1/example.yaml` we should add the next declaration in the `plugins` object of our local `docusaurus.config.js`:

```javascript
module.exports = {
  // ...
  plugins: [
    [
      "docusaurus-plugin-remote-content",
      {
          // options here
          name: "my-example", // used by CLI, must be path safe
          sourceBaseUrl: "https://my-page.com/folder1/subfolder1.1/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "openApi/example", // the base directory to output to.
          documents: ["example.yaml"], // the file names to download, if other file share the `sourceBaseUrl`, you can add it here without the need of create another instance of the plugin
      },
    ],
    [
    // ...another instance of the plugin
    ]
  ],
}
```

**Important:** if the `sourceBaseUrl` from where you retrieve data is not a live page, you must provide the `raw` link as a source.

For more information regarding the options of this plugin, check [here](https://github.com/rdilweb/docusaurus-plugin-remote-content#options)

- #### Docusaurus-OpenApi-Docs [GitHub Repo](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)

Once we have the `yaml` file with the definitions of the methods, either obtained via the `Docusaurus-Plugin-Remote-Content` or because the file was defined locally in our project, we can generate documentation pages. To do this, we can take advantage of the `Docusaurus` features and the Docusaurus-OpenApi-Docs plugin. It generates `.mdx` files located in the `docs-kits` folder, which will be parsed into our predefined UI. Checkout our [guideline page: Creating an open API Documentation](/docs/website-guidelines/create-open-api-doc) for more specifics.

Its use is quite straight forward and well documented. Please check the [documentation](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs#docusaurus-openapi-doc-generator). Here, we highlight some main things to consider:

- [configuration of docusaurus.config for adding more instances](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs#configuring-docusaurusconfigjs-plugin-and-theme-usage)
- [plugin options to generate docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs#plugin-configuration-options)
- [generate docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs#generating-openapi-docs)
- [cleaning docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs#cleaning-api-docs)

**Note** In our project, we use `npm` as our package manager. The documentation of the plugin uses `yarn`. Make sure you change the `command line` by adapting the declaration, for example: `npm install docusaurus-plugin-remote-content` instead of `yarn add docusaurus-plugin-remote-content`
