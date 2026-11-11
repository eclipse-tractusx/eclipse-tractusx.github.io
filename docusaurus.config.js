// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');
const { generateKitNavItems } = require('./utils/generated/kitNavItems.js');

// Change this id to show the announcement bar again to everyone who closed it.
const announcementBarId = 'announcementBar-v26.09';

// The site is normally served from the root of https://eclipse-tractusx.github.io.
// Pull request previews are deployed into a subfolder of the same GitHub Pages
// site (for example /pr/1234/), so both values can be overridden via environment
// variables. Defaults keep the production configuration unchanged.
const siteUrl = process.env.SITE_URL || 'https://eclipse-tractusx.github.io';
// Docusaurus requires a baseUrl with leading and trailing slashes.
const rawBaseUrl = (process.env.BASE_URL || '/').replace(/^\/+|\/+$/g, '');
const baseUrl = rawBaseUrl ? `/${rawBaseUrl}/` : '/';

// Usage analytics, see src/clientModules/analytics.js. Umami is one of the analytics
// tools approved by the Eclipse Foundation. Nothing is collected before the visitor
// allowed cookies in the Eclipse Foundation cookie consent banner. The website id is
// public (it is part of every tracked page anyway). Analytics stay off in pull request
// previews, which are built with a different baseUrl. Set UMAMI_WEBSITE_ID to an
// empty string to build without analytics.
const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID ?? 'f67aead1-a34a-4905-86bc-19632b489270';
const umamiScriptUrl = process.env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

// Eclipse Foundation cookie consent banner, mandatory before any analytics data is
// collected: https://webdev.eclipse.org/docs/solstice/?path=/docs/getting-started-embedding-analytics--docs
const eclipseCookieConsentBase = 'https://www.eclipse.org/eclipse.org-common/themes/solstice/public';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eclipse Tractus-X',
  tagline: '',
  url: siteUrl,
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  favicon: 'img/logo_tractus-x-min.ico',

  // Docusaurus hides the announcement bar before React loads if the visitor closed
  // any previous one, so a new id only appeared on their second visit. Clear the
  // "closed" flag first when the id changed, so the new bar is open until closed.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){try{if(localStorage.getItem('docusaurus.announcement.id')!=='${announcementBarId}'){localStorage.setItem('docusaurus.announcement.dismiss','false');}}catch(e){}})();`,
    },
  ],

  stylesheets: [`${eclipseCookieConsentBase}/stylesheets/vendor/cookieconsent/cookieconsent.min.css`],
  scripts: [{ src: `${eclipseCookieConsentBase}/javascript/vendor/cookieconsent/default.min.js`, defer: true }],
  clientModules: [
    require.resolve('./src/clientModules/cookieConsent.js'),
    require.resolve('./src/clientModules/analytics.js'),
  ],

  customFields: {
    analytics: {
      enabled: Boolean(umamiWebsiteId) && baseUrl === '/',
      umamiWebsiteId,
      umamiScriptUrl,
      // Umami only sends data from these hosts, so local builds are never tracked.
      domains: new URL(siteUrl).hostname,
    },
  },

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
    faster: {
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
        exclude: ['**/kit-template/**'],
      },
    ],
    // -- KIT Handbook: everything explaining what a KIT is and how to build one --
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'kit-handbook',
        path: 'kit-handbook',
        routeBasePath: 'kits/handbook',
        editUrl: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
        sidebarPath: './sidebarsKitHandbook.js',
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
          // --- KIT pages relocated to the TRG 10-02 structure (auto-generated) ---
          ...require('./utils/generated/kitRedirects'),
          // --- Information architecture restructure (2026-11): old → new routes ---
          { to: '/about', from: '/AboutUs' },
          { to: '/kits', from: '/Kits' },
          { to: '/kits/dataspace-foundation', from: '/Kits/dataspace-foundation' },
          { to: '/kits/industry-core', from: '/Kits/industry-core' },
          { to: '/kits/cross-industry', from: '/Kits/cross-industry' },
          { to: '/kits/industry', from: '/Kits/industry' },
          { to: '/kits/dataspace', from: '/Kits/dataspace' },
          { to: '/community-bases', from: '/CommunityBases' },
          { to: '/contribute', from: '/Contribute' },
          { to: '/kits/handbook/icon-library', from: '/icons' },
          { to: '/kits/handbook/getting-started', from: '/documentation/kit-getting-started' },
          { to: '/kits/handbook/lifecycle', from: '/documentation/kit-lifecycle' },
          { to: '/kits/handbook/framework', from: '/documentation/kit-framework' },
          { to: '/kits/handbook/statistics', from: '/documentation/kit-statistics' },
          { to: '/kits/handbook/master-data', from: '/documentation/kit-master-data-overview' },
          { to: '/kits/handbook/logo-library', from: '/documentation/kit-3d-logo-library' },
          { to: '/docs/faq', from: '/docs/dev_faq' },
          { to: '/docs/resources', from: '/docs/dev_links' },
          { to: '/docs/contribute/how-to-contribute', from: '/docs/oss/how-to-contribute' },
          { to: '/docs/contribute/contributor-committer', from: '/docs/oss/contributor-committer' },
          { to: '/docs/contribute/committer-election-process', from: '/docs/oss/committer-election-process' },
          { to: '/docs/contribute/code-reviews', from: '/docs/oss/code-reviews' },
          { to: '/docs/contribute/issues', from: '/docs/oss/issues' },
          { to: '/docs/contribute/release-process', from: '/docs/oss/release-process' },
          { to: '/docs/contribute/tooling', from: '/docs/oss/tooling' },
          { to: '/docs/contribute/howto-xray', from: '/docs/oss/howto-xray' },
          // --- Pre-existing redirects ---
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
            from: '/docs/contribute/getting-started',
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
        id: announcementBarId,
        content: `🎉️ Get to know us on our new <b><a href="/about">About Us</a></b> page (<a href="/blog/new-about-us-page">read more</a>) · New <b><a href="/">Homepage</a></b> information 🥳️`,
      },
      navbar: {
        title: 'Eclipse Tractus-X',
        logo: {
          alt: 'Eclipse Tractus-X logo',
          src: 'img/tx-logos/logo_tractus-x.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'KITs',
            position: 'left',
            to: '/kits',
            items: [
              {
                to: '/kits',
                label: 'KIT CATALOGUE',
                className: 'kit-category-header kit-home-icon'
              },
              {
                to: '/kits/handbook/getting-started',
                label: 'Getting Started with KITs',
                className: 'kit-nav-item'
              },
              {
                to: '/kits/handbook/framework',
                label: 'KIT Framework',
                className: 'kit-nav-item'
              },
              {
                to: '/kits/handbook/lifecycle',
                label: 'KIT Lifecycle',
                className: 'kit-nav-item'
              },
              {
                to: '/kits/handbook/master-data',
                label: 'KIT Master Data',
                className: 'kit-nav-item'
              },
              {
                to: '/kits/handbook/statistics',
                label: 'KIT Statistics',
                className: 'kit-nav-item'
              },
              {
                to: '/kits/handbook/logo-library',
                label: 'KIT Brand Assets',
                className: 'kit-nav-item'
              },
              // Dynamically generated from kitsData
              ...generateKitNavItems(),
            ],
          },
          {
            type: 'dropdown',
            label: 'Documentation',
            position: 'left',
            to: '/docs/developer',
            items: [
              {
                type: 'doc',
                docId: 'developer',
                label: 'Developer Hub',
              },
              {
                type: 'doc',
                docId: 'getting-started',
                label: 'Getting Started',
              },
              {
                type: 'doc',
                docId: 'tutorials',
                label: 'Tutorials',
              },
              {
                type: 'doc',
                docId: 'tutorials/e2e',
                label: 'End-to-End Adopter Journey',
              },
              {
                type: 'doc',
                docId: 'faq',
                label: 'FAQ',
              },
              {
                type: 'doc',
                docId: 'resources',
                label: 'Links & Resources',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Contribute',
            position: 'left',
            to: '/contribute',
            items: [
              {
                to: '/contribute',
                label: 'Ways to Contribute',
              },
              {
                type: 'doc',
                docId: 'contribute/how-to-contribute',
                label: 'How to Contribute',
              },
              {
                type: 'doc',
                docId: 'contribute/contributor-committer',
                label: 'Contributors & Committers',
              },
              {
                type: 'doc',
                docId: 'release',
                label: 'Release Guidelines (TRG)',
              },
              {
                type: 'doc',
                docId: 'contribute/release-process',
                label: 'Release Process',
              },
              {
                type: 'doc',
                docId: 'website-guidelines/wiki',
                label: 'Website Maintainer Guide',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            to: '/community/intro',
            items: [
              {
                to: '/community/intro',
                label: 'Community Overview',
              },
              {
                to: '/community/open-meetings',
                label: 'Open Meetings',
              },
              {
                to: '/community/meeting-minutes',
                label: 'Meeting Minutes',
              },
              {
                to: '/community/sigs/intro',
                label: 'Special Interest Groups',
              },
              {
                to: '/community/products',
                label: 'Products',
              },
              {
                to: '/community-bases',
                label: 'Community Bases',
              },
              {
                to: '/about',
                label: 'About Us',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'News',
            position: 'left',
            to: '/blog',
            items: [
              {
                to: '/blog',
                label: 'Blog',
              },
              {
                to: '/blog-changelog',
                label: 'Release Changelog',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'docs-kits',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                className: 'dropdown-archived-versions',
                value: '<b>Archived - zip (900 MB)</b>',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/archive/refs/tags/25.09.zip',
                label: '25.09',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/archive/refs/tags/25.06.zip',
                label: '25.06',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/archive/refs/tags/25.03.zip',
                label: '25.03',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/archive/refs/tags/24.12.zip',
                label: '24.12',
              },
              {
                href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/archive/refs/tags/24.08.zip',
                label: '24.08',
              },
            ],
          },
          {
            to: '/community/open-meetings',
            position: 'right',
            'aria-label': 'Open meetings',
            className: 'navbar-icon-link header-open-meetings',
          },
          {
            href: 'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io',
            position: 'right',
            'aria-label': 'GitHub',
            className: 'navbar-icon-link header-github-link',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Explore',
            items: [
              {
                label: "KIT Catalogue",
                to: "/kits",
              },
              {
                label: "KIT Handbook",
                to: "/kits/handbook/getting-started",
              },
              {
                label: "Developer Hub",
                to: "/docs/developer",
              },
              {
                label: "Release Guidelines (TRG)",
                to: "/docs/release",
              },
              {
                label: "Contribute",
                to: "/contribute",
              },
              {
                label: "Community",
                to: "/community/intro",
              },
            ],
          },
          {
            title: 'Eclipse Foundation',
            items: [
              {
                label: "About",
                href: "https://www.eclipse.org",
              },
              {
                label: "Privacy Policy",
                href: "https://www.eclipse.org/legal/privacy/",
              },
              {
                label: "Terms of Use",
                href: "https://www.eclipse.org/legal/terms-of-use/",
              },
              {
                label: "Compliance",
                href: "https://www.eclipse.org/legal/compliance/",
              },
              {
                label: "Legal Resources",
                href: "https://www.eclipse.org/legal/",
              },
              {
                label: "Contact",
                href: "https://www.eclipse.org/org/foundation/contact/",
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
                label: "Mailing List",
                href: "https://accounts.eclipse.org/mailing-list/tractusx-dev",
              },
              {
                label: "Report a Bug",
                href: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues",
              },
              {
                label: "Eclipse Dataspace Working Group",
                href: "https://dataspace.eclipse.org",
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
            title: 'Collaboration',
            items: [
              {
                label: "Catena-X Automotive Network e.V.",
                href: "https://catena-x.net/",
              },
              {
                label: "Factory-X",
                href: "https://factory-x.org",
              },
              {
                label: "Manufacturing-X",
                href: "https://www.plattform-i40.de/IP/Navigation/EN/Manufacturing-X/Manufacturing-X.html",
              },
              {
                label: "Construct-X",
                href: "https://construct-x.org",
              },
              {
                label: "Semiconductor-X",
                href: "https://semiconductor-x.com/",
              },
            ],
          }
        ],
        copyright: `
          <div style="display:flex;align-items:stretch;justify-content:center;gap:48px;flex-wrap:wrap;margin-bottom:24px;">
            <a href="https://www.eclipse.org" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-decoration:none;">
              <span style="color:#fff;font-size:0.75rem;margin-bottom:8px;text-align:center;">A project under the governance of the: </span>
              <img alt="Eclipse Foundation" src="/img/EF_registered_wht_svg.svg" style="height:200px;"/>
            </a>
            <div class="footer-logo-divider"></div>
            <a href="https://dataspace.eclipse.org" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-decoration:none;">
              <span style="color:#fff;font-size:0.75rem;margin-bottom:8px;text-align:center;">Built in collaboration with:</span>
              <div style="display:flex;align-items:center;justify-content:center;flex:1;">
                <img alt="Eclipse Dataspace Working Group" src="/img/edwg-logo-white.svg" style="height:200px;max-width:300px;"/>
              </div>
            </a>
          </div>
          <div>Copyright © Eclipse Foundation AISBL. All Rights Reserved. Built with Docusaurus.</div>
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
