// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem" // Derived from docusaurus-theme-openapi-docs  
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Eclipse Tractus-X News',
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "remoteBpdm",
        name: "bpdm", // used by CLI, must be path safe
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/bpdm/main/docs/api/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/bpdm", // the base directory to output to.
        documents: ["pool.yaml"], // the file names to download
        noRuntimeDownloads: true
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "remoteIrs",
        name: "irs", // used by CLI, must be path safe
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/item-relationship-service/main/api/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/irs", // the base directory to output to.
        documents: ["irs-v1.0.yaml"], // the file names to download
        noRuntimeDownloads: true
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "remoteChangelog",
        name: "changelog", // used by CLI, must be path safe
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/tractus-x-release/main/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "src/pages", // the base directory to output to.
        documents: ["CHANGELOG.md"], // the file names to download
        noRuntimeDownloads: true
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "bpdm-pool",
        docsPluginId: "classic",
        config: {
          bpdm: {
            specPath: "./openApi/bpdm/pool.yaml",
            outputDir: "./docs/kits/Business Partner Kit/Software Development View/Pool Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          irs: {
            specPath: "./openApi/irs/irs-v1.0.yaml",
            outputDir: "./docs/kits/Data Chain Kit/Software Development View/Job Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          notifications: {
            specPath: "./openApi/notifications/notifications.yaml", // Path to designated spec file
            outputDir: "./docs/kits/Template Kit/Software Development View/Notification API", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs",'@docusaurus/theme-mermaid'], // Allows use of @theme/ApiItem and other components

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
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
          src: 'img/logo_tractus-x.svg',
        },
        items: [
          {
            to: "/",
            exact: true,
            position: "left",
            label: "Home",
          },
          {to: 'blog', label: 'News', position: 'left'},
          {
            to: "/aboutus",
            position: "left",
            label: "About Us",
          },
          {
            to: "/developer",
            position: "left",
            label: "KITs",
          },
          // {
          //   type: 'doc',
          //   docId: 'introduction',
          //   position: 'left',
          //   label: 'Documentation',
          // },
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
            to: "/community",
            position: "left",
            label: "Community",
          },
          {
            to: "/CHANGELOG",
            position: "left",
            label: "Versions",
          },
          /* {to: '/blog', label: 'Blog', position: 'left'}, */
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
                label: "Main Eclipse Foundation website",
                href: "http://www.eclipse.org",
              },
              {
                label: "Privacy policy",
                href: "http://www.eclipse.org/legal/privacy.php",
              },
              {
                label: "Website terms of use",
                href: "http://www.eclipse.org/legal/termsofuse.php",
              },
              {
                label: "Copyright agent",
                href: "http://www.eclipse.org/legal/copyright.php",
              },
              {
                label: "Legal",
                href: "http://www.eclipse.org/legal",
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: "Eclipse Foundation project",
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
                label: "Icons used from svgrepo with CC0 License",
                href: "https://www.svgrepo.com/",
              },
            ],
          },
          {
            title: 'Useful Links',
            items: [
              {
                label: "Report a Bug",
                href: "https://bugs.eclipse.org/bugs",
              },
              {
                label: "Documentation",
                href: "https://help.eclipse.org/latest/index.jsp",
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
                label: "Forums",
                href: "https://www.eclipse.org/forums/",
              },
            ],
          },
          {
            items: [
              {
                html: `
                  <img src='/img/EF_registered_wht_png.png'/>
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
