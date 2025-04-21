---
title: How to update and integrate React components?
sidebar_position: 4
---

Some of our content was developed using `React` [(documentation here)](https://reactjs.org/docs/getting-started.html), as it is a big part of `Docusaurus`. In this `guidelines`, we want to give you instructions on how and where we use it. If you are not familiar with React, hopefully you'll feel more confident to make changes after reading this page.

## Where is React used?

Following the default `docusaurus` structure, we have developed 3 of our main pages with `React`. They are:

### Home page

In our folder structure, this page is developed in `./src/pages/index.js` as it is the entry point of our website.

This `index.js` is defined as a `React` component. Its content is being imported from other `React` components located in the folder `./src/components`. They are:

- #### HomePageHeader `./src/components/HomePageHeader/index.js`

- ##### NewsTicker `.src/components/Newsticker/index.js`

- #### AboutUsCard `./src/components/AboutUsCard/index.js`

- #### KitsGalleryWithFilters `./src/components/KitsGalleryWithFilters/index.js`

- #### FAQsComponent `./src/components/FAQsComponent/index.js`

If you want to make any change to the `Home` page, make sure you modify the right component of the ones named above.

### AboutUs page

In our folder structure, this page is developed in `./src/pages/AboutUs/index.js`

This `index.js` is defined as a `React` component. Its content is being imported from other `React` components located in the folder `./src/components`. They are:

- #### AboutUsHeader `./src/components/AboutUsHeader/index.js`

- #### AboutUsContent `./src/components/AboutUsContent/index.js`

If you want to make any change to the `AboutUs` page, make sure you modify the right component of the ones named above.

### Developer page

In our folder structure, this page is developed in `./src/pages/Developer/index.js`

This `index.js` is defined as a `React` component. Its content is imported from other `React` components located in the folder `./src/components`. They are:

- #### DeveloperHeader `./src/components/DeveloperHeader/index.js`

- #### DeveloperContent `./src/components/DeveloperContent/index.js`

- #### KitsGalleryWithFilters `./src/components/KitsGalleryWithFilters/index.js`

- #### KitsGallery `./src/components/KitsGallery/index.js`

- #### KitsCard `./src/components/KitsCard/index.js`

If you want to make any change to the `Developer` page, make sure you modify the right component of the ones named above.

### Community page

In our folder structure, this page is developed in `./src/pages/community.mdx`

This page is defined as an `.mdx` one that combines `.md` syntax and makes use of our `React` component `ProductOverview` and `ProductOverviewCard` located in the `./src/components` folder. If you want to make any change to the `community` page, make sure you modify the `community.mdx` file and/or right components.

## How to modify the content?

The content of each `React` component is fairly intuitive once you compare the code to what is displayed in the UI. Adding or removing text-based information in these components is not complicated.

However, there are some components that make use of some external design libraries that will require more knowledge of `React` when it comes to modify their behaviour. These are the `<NewsTicker />` (developed with [Slick-Carousel](https://www.npmjs.com/package/react-slick)) and the `<FAQsComponent />` (developed with [MaterialUI Accordion](https://mui.com/material-ui/react-accordion/))

When it comes to update the content of some `components` that iterate over an specific and repetitive data, we have separated the `content definitions` into `.js` arrays that are placed in the `./utils` folder, with the goal of simplify their updates and maintainability. Those are:

### `<NewsTicker />`

This component's content is defined in the `./utils/newsTitles.js` file, and follows the next structure:

```javascript
  export const newsTitles = [
    {
      date: "10.02.2023",
      title: "Eclipse Tractus-X Developer Portal is LIVE!",
      blogLink: "/blog/portal-is-live" // "/blog/same-as-the-slug-defined-in-the-post-frontmatter-info"
    },
  ]
```

Make sure when adding a new `object` to the `newsTitles array`, to include the same properties: `date`, `title` and `blogLink` with your needed definitions as `strings` if you want this to be displayed as part of the UI.

### `<FAQsComponent />`

This component's content is defined in the `./utils/faqsContent.js` file, and follows the next structure:

```javascript
  export const faqsContent = [
    {
      id: 1,
      question: "Why are there KITs and where does this naming comes from?",
      answer: "KIT means “Keep It Together” - Catena-X KITs aim to accelerate the development of Catena-X applications and services and contribute significantly to the rapid scaling of the Catena-X ecosystem."
    },
  ]
```

Make sure when adding a new `object` to the `faqsContent array`, to include the same properties: `id` as a `number`, `question` and `answer` as a `string`, with your needed definitions if you want this to be displayed as part of the UI. _**Important:**_ remember to increase the `id` property of your new object +1 the last `object.id` of the array.

### `<KitsGallery />`

This component's content is defined in the `./utils/resiliencyItems.js` file, and follows the next structure:

```javascript
  import Business_Kit from "@site/static/img/bpkit.png";

  export const resiliencyItems = [
    {
      id: 1,
      img: Business_Kit,
      pageRoute: "docs-kits/kits/business-partner-kit/Adoption View"
    },
  ]
```

Make sure when adding a new `object` to the `resiliencyItems array`, to include the same properties: `id` as a `number`, `img` and `pageRoute` as a `string` with your needed definitions if you want this to be displayed as part of the UI. _**Important:**_ remember to increase the `id` property of your new object +1 the last `object.id` of the array. Note as well, that this components takes an image as a property, and thus this needs to be imported from the `./statics/img` folder at the beginning of the file using the `@site/static/img/your-image` declaration.

### `<KitsGalleryWithFilters />`

This component's content is defined in the `./utils/kitsGallery.js` file, and follows the next structure:

```javascript
  import Business_Kit from "@site/static/img/bpkit.png";

  export const kitsGallery = [
    {
      id: 1,
      name: 'Business Partner Kit',
      domain: 'Network & Core Services',
      img: Business_Kit,
      pageRoute: "docs-kits/kits/business-partner-kit/Adoption View"
    },
  ]
```

Make sure when adding a new `object` to the `kitsGallery array`, to include the same properties: `id` as a `number`, `name` as a `string`, `domain` as a `string`, `img` as an imported declaration and `pageRoute` as a `string` with your needed definitions if you want this to be displayed as part of the UI. _**Important:**_ remember to increase the `id` property of your new object +1 the last `object.id` of the array. Note as well, that this components takes an image as a property, and thus this needs to be imported from the `./statics/img` folder at the beginning of the file using the `@site/static/img/your-image` declaration.

### `<ProductOverview />`

This component's content is defined in the `./utils/products.js` file, and follows the next structure:

```javascript
  export const products = [
    {
      productName: "Business Partner Data Management",
      productDescription: "The project provides core services for querying, adding, and changing business partner data in the Catena-X data space. Currently, BPDM consists of the Pool and Gate API.",
      githubRepo: [
        "https://github.com/eclipse-tractusx/bpdm"
      ],
      committers: [
        "https://github.com/nicoprow",
        "https://github.com/pazepaze",
        "https://github.com/Maximilianong"
      ],
      mailTo: "tractusx-dev@eclipse.org?subject=Request Business Partner Data Management Team",
      hasBoard: false
    },
  ]
```

Make sure when adding a new `object` to the `products array`, to include the same properties: `productName` as a `string`, `productDescription` as a `string`, `githubRepo` as an `array of strings` (the first one must be the leading one in case of multiple repos), `committers` as an `array of strings`, `mailTo` as an `string` and `hasBoard` as a `boolean`(this property is _true_ if your leading repository has enabled the `discussion` category in the project) with your needed definitions if you want this to be displayed as part of the UI.
