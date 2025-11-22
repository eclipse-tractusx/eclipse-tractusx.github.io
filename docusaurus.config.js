// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');
const { generateKitNavItems } = require('./utils/generated/kitNavItems.js');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eclipse Tractus-X',
  tagline: '',
  url: 'https://eclipse-tractusx.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  favicon: 'img/logo_tractus-x-min.ico',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eclipse-tractusx', // Usually your GitHub org/user name.
  projectName: 'eclipse-tractusx.github.io', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  future: {
    // introduce breaking changes since 3.8 incrementally so that we need to fix them directly and don't
    // run again into "the big bang we can't upgrade" issue
    v4: {
      // see https://docusaurus.io/blog/releases/3.8#postbuild-change
      // required for expermiental_faster.ssgWorkerThreads
      removeLegacyPostBuildHeadAttribute: true,
      // see https://docusaurus.io/blog/releases/3.8#css-cascade-layers
      useCssCascadeLayers: true
    },
    experimental_faster: {
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      swcHtmlMinimizer: true,
      swcJsLoader: true,
      swcJsMinimizer: true,
      ssgWorkerThreads: true,
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Eclipse Tractus-X News',
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
          onUntruncatedBlogPosts: 'ignore',
          authorsMapPath: '../blog-meeting-minutes/authors.yaml', // relative path. File used is therefore /blog-meeting-minutes/authors.yaml
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    ['docusaurus-plugin-sass', {}],
    [
      function disableExpensiveBundlerOptimizationPlugin() {
        return {
          name: 'disable-expensive-bundler-optimizations',
          configureWebpack(config, isServer) {
            return {
              optimization: {
                // See https://github.com/facebook/docusaurus/discussions/11199
                concatenateModules: false,
              },
            };
          },
        };
      },
      {},
    ],
    // ------------DOCUSAURUS MULTI-INSTANCE PLUGIN--------------
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-kits',
        path: 'docs-kits',
        routeBasePath: 'docs-kits',
        sidebarPath: require.resolve('./sidebarsDocsKits.js'),
      },
    ],
    // -- documentation-kits --
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-documentation',
        path: 'documentation',
        routeBasePath: 'documentation',
        editUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/documentation',
        sidebarPath: './sidebarsDocumentation.js',
      },
    ],
    // -- Community --
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-meeting-minutes',
        path: 'blog-meeting-minutes',
        blogTitle: 'Open meeting minutes',
        blogDescription: 'This blog hosts meeting minutes that summarize our open meetings',
        blogSidebarTitle: "Recent meetings",
        routeBasePath: 'community/meeting-minutes',
        showReadingTime: false,
        authorsMapPath: 'authors.yaml', // relative path. File used is therefore /blog-meeting-minutes/authors.yaml
        blogSidebarCount: 'ALL',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
    // -- Changelog --
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-changelog',
        path: 'blog-changelog',
        routeBasePath: 'blog-changelog',
        blogTitle: 'Release Changelog',
        blogDescription: 'This blog hosts Tractus-X release changelogs.',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Release Changelogs',
        onUntruncatedBlogPosts: 'ignore', 
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-community',
        path: 'community',
        routeBasePath: 'community',
        editUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/community',
        sidebarPath: './sidebarsCommunity.js',
      },
    ],
    [
      // HINT: won't redirect in local dev mode (npm start). See: https://docusaurus.io/docs/2.x/api/plugins/@docusaurus/plugin-client-redirects
      // to test, use npm run build && npm run serve
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/blog-changelog',
            from: '/CHANGELOG',
          },
          {
            to: '/community/intro',
            from: '/community',
          },
          // Redirect from multiple old paths to the new path
          {
            to: '/docs/release/',
            from: ['/docs/release/trg-2/trg-2-2', '/docs/release/trg-3/trg-3-1'],
          },
          {
            to: '/docs/getting-started',
            from: '/docs/oss/getting-started',
          },
          {
            to: '/docs/release/trg-1/trg-1-01',
            from: '/docs/release/trg-1/trg-1-1',
          },
          {
            to: '/docs/release/trg-1/trg-1-02',
            from: '/docs/release/trg-1/trg-1-2',
          },
          {
            to: '/docs/release/trg-1/trg-1-03',
            from: '/docs/release/trg-1/trg-1-3',
          },
          {
            to: '/docs/release/trg-1/trg-1-04',
            from: '/docs/release/trg-1/trg-1-4',
          },
          {
            to: '/docs/release/trg-2/trg-2-01',
            from: '/docs/release/trg-2/trg-2-1',
          },
          {
            to: '/docs/release/trg-2/trg-2-03',
            from: '/docs/release/trg-2/trg-2-3',
          },
          {
            to: '/docs/release/trg-2/trg-2-04',
            from: '/docs/release/trg-2/trg-2-4',
          },
          {
            to: '/docs/release/trg-2/trg-2-05',
            from: '/docs/release/trg-2/trg-2-5',
          },
          {
            to: '/docs/release/trg-3/trg-3-02',
            from: '/docs/release/trg-3/trg-3-2',
          },
          {
            to: '/docs/release/trg-6/trg-6-01',
            from: '/docs/release/trg-6/trg-6-1',
          },
        ],
      },
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      algolia: {
        apiKey: 'a97c5de3a563a32884153d3a84568be1',
        indexName: 'eclipse-tractusxio',
        appId: '5EEK7E23IM',
      },
      announcementBar: {
        id: `announcementBar-v25.09`,
        content: `🎉️ New <b><a href="/docs/oss/release-process">Eclipse Tractus-X Release Documentation</a></b> and new <b><a href="/community/open-meetings">Open Meetings Calendar</a></b> 🥳️`,
      },
      navbar: {
        title: 'Eclipse Tractus-X',
        logo: {
          alt: 'Eclipse Tractus-X logo',
          src: 'img/tx-logos/logo_tractus-x.svg',
        },
        items: [
          {to: 'blog', label: 'News', position: 'left'},
          {
            to: "/AboutUs",
            position: "left",
            label: "About Us",
          },
          {
            type: 'dropdown',
            label: 'KITs',
            position: 'left',
            to: '/Kits',
            items: [
              {
                to: 'Kits',
                label: 'KITs HOMEPAGE',
                className: 'kit-category-header kit-home-icon'
              },
              {
                to: '/documentation/kit-getting-started',
                label: 'KIT Getting Started',
                className: 'kit-nav-item'
              },
              {
                to: '/documentation/kit-lifecycle',
                label: 'KIT Lifecycle',
                className: 'kit-nav-item'
              },
              {
                to: '/documentation/kit-framework',
                label: 'KIT Framework',
                className: 'kit-nav-item'
              },
              {
                to: '/documentation/kit-statistics',
                label: 'KIT Statistics',
                className: 'kit-nav-item'
              },
              {
                to: '/documentation/kit-master-data-overview',
                label: 'KIT Master Data',
                className: 'kit-nav-item'
              },
              // Dynamically generated from kitsData
              ...generateKitNavItems(),
            ],
          },
          {
            type: 'doc',
            docId: 'developer',
            position: 'left',
            label: 'Developer Hub',
          },
          {
            type: 'doc',
            docId: 'tutorials',
            position: 'left',
            label: 'Tutorials',
          },
          {
            to: '/community/intro',
            label: 'Community',
            position: 'left',
          },
          {
            to: '/blog-changelog',
            label: 'Changelog',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'docs-kits',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                className: 'dropdown-archived-versions',
                value: '<b>Archived</b>',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits_versioned_docs/version-24.08/kits',
                label: '24.08',
              },
            ],
          },
          {
            href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Eclipse Foundation',
            items: [
              {
                label: "About",
                href: "http://www.eclipse.org",
              },
              {
                label: "Privacy Policy",
                href: "http://www.eclipse.org/legal/privacy.php",
              },
              {
                label: "Terms of Use",
                href: "http://www.eclipse.org/legal/termsofuse.php",
              },
              {
                label: "Compliance",
                href: "https://www.eclipse.org/legal/compliance/",
              },
              {
                label: "Legal Resources",
                href: "http://www.eclipse.org/legal",
              },
              {
                label: "Contact",
                href: "https://www.eclipse.org/org/foundation/contact.php",
              },
            ],
          },
          {
            title: 'Eclipse Tractus-X',
            items: [
              {
                label: "Eclipse Project",
                href: "https://projects.eclipse.org/projects/automotive.tractusx",
              },
              {
                label: "GitHub Organization",
                href: "https://github.com/eclipse-tractusx",
              },
              {
                label: "Catena-X Automotive Network",
                href: "https://catena-x.net/",
              },
              {
                label: "Mailing List",
                href: "https://accounts.eclipse.org/mailing-list/tractusx-dev",
              },
              {
                label: "Report a Bug",
                href: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues",
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: "Code of Conduct",
                href: "https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php",
              },
              {
                label: "Report a Vulnerability",
                href: "https://github.com/eclipse-tractusx/sig-security/issues/new/choose",
              },
              {
                label: "How to Contribute",
                href: "https://www.eclipse.org/contribute/",
              },
              {
                label: "Mailing Lists",
                href: "https://accounts.eclipse.org/mailing-list",
              },
              {
                label: "Matrix Chat",
                href: "https://chat.eclipse.org/#/home/",
              },
            ],
          },
          {
            items: [
              {
                html: `
                  <img alt='' src='/img/EF_registered_wht_png.png'/>
                `
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Eclipse Tractus-X. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
