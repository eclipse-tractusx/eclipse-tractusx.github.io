---
title: How to update the News page by adding a new post?
sidebar_position: 5
---

Our `News` section is developed making use of the [Docusaurus blog](https://docusaurus.io/docs/2.2.0/blog) feature.

It's implementation is fairly simple, in the `./blog` folder you need to:

- Create an `.md` file which name follows the next convention: `YYYY-MM-DD-example.md`
- The `front-matter` of the file should contain at least the next information:

```md
---
title: Title Example // the name of the post that shows in the sidebar
description: Description of the news post 
slug: this-is-a-post //slug is the url route of this post
date: YYYY-MM-DD // a time is optional, for example 2023-02-10T11:00
hide_table_of_contents: false
authors:
  - name: Author 1
    title: Author 1 title/position
    url: https://github.com/author1 or https://linkedin.com/author1
    image_url: https://github.com/author1.png
    email: author1@email.com
  - name: Author 2
    title: Author 2 title/position
    url: https://github.com/author2 or https://linkedin.com/author2
    image_url: https://github.com/author2.png
    email: author2@email.com
---
```

- The content of the post is entirely up to you, however here is an example where we use an `image` and `truncate` the content to create a nice separation between the list of `posts` and the actual content of each:

```md
![post related image](@site/static/img/example-related-img.png)
Here will be placed the first part of the post, probably the first paragraph.
<!--truncate-->
Here the rest of the content and other paragraphs of the post.
```

_**Docusaurus will take care of everything for you**_, all of our news are accessible in the [blog section](https://eclipse-tractusx.github.io/blog) of the page.

After you have created the `new` post, you have the option to update the `Home` page by adding the `title`, `release date` and `link` of the article on the `NewsTicker` component. That way the user is able to see and have access to the most relevant articles that rotate in an infinite loop in the **banner** of the page. Please refer to the [How to update and integrate React components - NewsTicker](/docs/website-guidelines/update-and-integrate-react-components#newsticker-) section of this `guidelines` to check the file that manages the content of the `NewsTicker` component and how to update it.
