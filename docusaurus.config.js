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
        content: `🎉️ New <b><a href="/Kits">KITs 2.0 (Multi-Industry & Multi-Dataspace)</a></b> Webpage & <b><a href="/documentation/kit-getting-started">Documentation</a></b> 🥳️`,
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
            to: '/community/open-meetings',
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
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits_versioned_docs/version-24.12/kits',
                label: '24.12',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/docs-kits_versioned_docs/version-24.08/kits',
                label: '24.08',
              },
            ],
          },
          {
            type: 'html',
            position: 'right',
            value: `
              <a class="navbar-icon-link" href="/community/open-meetings" aria-label="Open meetings">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v13A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-13A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1zm12 8H5v9.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V10zM6 6H4.5a.5.5 0 0 0-.5.5V8h16V6.5a.5.5 0 0 0-.5-.5H18v1a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6z" />
                </svg>
              </a>
            `,
          },
          {
            type: 'html',
            position: 'right',
            value: `
              <a class="navbar-icon-link" href="https://github.com/eclipse-tractusx/eclipse-tractusx.github.io" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.57.24 2.73.12 3.02.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56 4.56-1.53 7.85-5.86 7.85-10.97C23.5 5.74 18.27.5 12 .5z" />
                </svg>
              </a>
            `,
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
