
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eclipse Tractus-X',
  tagline: '',
  url: 'https://eclipse-tractusx.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo_tractus-x-min.ico',

  markdown: {
    mermaid: true,
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
        blogSidebarCount: 10,
        blogSidebarTitle: "Recent meetings",
        routeBasePath: 'community/meeting-minutes',
        showReadingTime: false,
        authorsMapPath: 'authors.yaml', // relative path. File used is therefore /blog-meeting-minutes/authors.yaml
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
                label: 'Kits General',
              },
              {
                to: '/docs-kits/kits/behaviour-twin-kit/overview',
                label: 'Behaviour Twin',
              },
              {
                to: '/docs-kits/kits/business-partner-kit/adoption-view',
                label: 'Business Partner',
              },
              {
                to: '/docs-kits/kits/circularity-kit/adoption-view',
                label: 'Circularity',
              },
              {
                to: '/docs-kits/kits/connector-kit/adoption-view',
                label: 'Connector',
              },
              {
                to: '/docs-kits/kits/customs-kit/adoption-view',
                label: 'Customs',
              },
              {
                to: '/docs-kits/kits/data-chain-kit/adoption-view',
                label: 'Data Chain',
              },
              {
                to: '/docs-kits/kits/data-driven-quality-management-kit/adoption-view',
                label: 'Data Driven Quality Management',
              },
              {
                to: '/docs-kits/kits/data-governance-kit/adoption-view',
                label: 'Data Governance',
              },
              {
                to: '/docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview',
                label: 'Demand and Capacity Management',
              },
              {
                to: '/docs-kits/kits/digital-twin-kit/adoption-view',
                label: 'Digital Twin',
              },
              {
                to: '/docs-kits/kits/eco-pass-kit/adoption-view',
                label: 'Eco Pass',
              },
              {
                to: '/docs-kits/kits/environmental-and-social-standards-kit/adoption-view',
                label: 'Environmental and Social Standards',
              },
              {
                to: '/docs-kits/kits/industry-core-kit/business-view',
                label: 'Industry Core',
              },
              {
                to: '/docs-kits/kits/knowledge-agents-kit/adoption-view/intro',
                label: 'Knowledge Agents',
              },
              {
                to: '/docs-kits/kits/logistics-kit/adoption-view',
                label: 'Logistics',
              },
              {
                to: '/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view',
                label: 'Manufacturing as a Service',
              },
              {
                to: '/docs-kits/kits/model-based-development-and-data-processing-kit/adoption-view',
                label: 'Model Based Development and Data Processing',
              },
              {
                to: '/docs-kits/kits/modular-production-kit/adoption-view',
                label: 'Modular Production',
              },
              {
                to: '/docs-kits/kits/online-simulation-kit/adoption-view',
                label: 'Online Simulation',
              },
              {
                to: '/docs-kits/kits/puris-kit/adoption-view',
                label: 'Predictive Unit Real-Time Information Service',
              },
              {
                to: '/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view',
                label: 'Product Carbon Footprint Exchange',
              },
              {
                to: '/docs-kits/kits/supply-chain-disruption-notification-kit/adoption-view',
                label: 'Supply Chain Disruption Notification',
              },
              {
                to: '/docs-kits/kits/traceability-kit/business-view',
                label: 'Traceability',
              },
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
            type: 'dropdown',
            label: 'Versions',
            position: 'left',
            items: [
              {
                to: '/release-information',
                label: 'Release Information',
              },
              {
                to: '/CHANGELOG',
                label: 'Change Log',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'docs-kits',
            position: 'right'
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
