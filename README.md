# Eclipse-tractusx website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## How to deploy

This deploys through GitHub actions!

## How to use locally

To use this site locally and see your doc rendered as website, just use the following commands.

- `npm install` (only initially needed)
- `npm start`

This will install all dependencies necessary and run the website on [http://localhost:3000/](http://localhost:3000/).

## Linting

We do want to follow a specific style for our markdown based documentation.
Therefore, this repository is configured to use a [markdown linter](https://github.com/DavidAnson/markdownlint-cli2).
Specific rules are configured via [.markdownlint.yaml](./.markdownlint.yaml).

Additionally, there is a npm script `lint-doc`, that will lint all the markdown files inside [docs](./docs) and `lint-kits`, that will lint all the markdown files inside [docs-kits](./docs-kits).
This script is also run as a pre-commit hook, set up via [husky](https://www.npmjs.com/package/husky).
You can also run the linting step manually by running `npm run lint-doc` or `npm run lint-kits`.
