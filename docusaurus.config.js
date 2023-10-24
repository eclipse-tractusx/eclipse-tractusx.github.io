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
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/tree/main/',
          docLayoutComponent: "@theme/DocPage",
          // docItemComponent: "@theme/ApiItem" // Derived from docusaurus-theme-openapi-docs  
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
    // ------------DOCUSAURUS MULTI-INSTANCE PLUGIN--------------
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-kits',
        path: 'docs-kits',
        routeBasePath: 'docs-kits',
        sidebarPath: require.resolve('./sidebarsDocsKits.js'),
        docLayoutComponent: "@theme/DocPage",
        docItemComponent: "@theme/ApiItem" // Derived from docusaurus-theme-openapi-docs  
      }, 
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-products',
        path: 'docs-products',
        routeBasePath: 'docs-products',
        sidebarPath: require.resolve('./sidebarsDocsProducts.js'),
      }, 
    ],
    // ------------DOCUSAURUS PLUGIN REMOTE CONTENT----------------
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
        sourceBaseUrl: "https://raw.githubusercontent.com/catenax-ng/tx-item-relationship-service/main/docs/src/api/", // the base url for the markdown (gets prepended to all of the documents when fetching)
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
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "discoveryFinderOpenapi",
        name: "discoveryFinder", // used by CLI, must be path safe
        sourceBaseUrl: "https://semantics.int.demo.catena-x.net/discoveryfinder/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/dt", // the base directory to output to.
        documents: ["discovery-finder-openapi.yaml"], // the file names to download
        noRuntimeDownloads: false
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "bpnDiscoveryOpenapi",
        name: "bpnDiscovery", // used by CLI, must be path safe
        sourceBaseUrl: "https://semantics.int.demo.catena-x.net/bpndiscovery/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/dt", // the base directory to output to.
        documents: ["bpn-discovery-service-openapi.yaml"], // the file names to download
        noRuntimeDownloads: true
      },
    ],
    // ------------DOCUSAURUS PLUGIN OPEN API DOCS---------------------
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "docs-kits",
        docsPluginId: "docs-kits",
        config: {
          bpdm_gate: {
            specPath: "./openApi/bpdm/gate.yaml",
            outputDir: "./docs-kits/kits/Business Partner Kit/Software Development View/Gate Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          bpdm_pool: {
            specPath: "./openApi/bpdm/pool.yaml",
            outputDir: "./docs-kits/kits/Business Partner Kit/Software Development View/Pool Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          bpdm_bridge: {
            specPath: "./openApi/bpdm/bridge-dummy.yaml",
            outputDir: "./docs-kits/kits/Business Partner Kit/Software Development View/Bridge Dummy Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          irs: {
            specPath: "./openApi/irs/irs-v1.0.yaml",
            outputDir: "./docs-kits/kits/Data Chain Kit/Software Development View/Job Api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          traceability_notifications: {
            specPath: "./openApi/traceability/notifications.yaml",
            outputDir: "./docs-kits/kits/Traceability Kit/Software Development View/Notification API",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          traceability_unique_id_push: {
            specPath: "./openApi/traceability/unique-id-push.yaml",
            outputDir: "./docs-kits/kits/Traceability Kit/Software Development View/Unique ID Push API",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          tractusx_edc_api: {
            specPath: "./openApi/edc/tractusx-edc-0.5.1-SNAPSHOT.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/tractusx-edc/docs/kit/development-view/openAPI/tractusx-edc-api", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          dt_discovery_finder: {
            specPath: "./openApi/dt/discovery-finder-openapi.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/Digital Twin Kit/Software Development View/API Discovery Finder/", // Output directory for generated .mdx docs
              sidebarOptions: {
                groupPathsBy: "tag",
              },
          },
          dt_bpn_discovery: {
            specPath: "./openApi/dt/bpn-discovery-service-openapi.yaml", // Path to designated spec file
            outputDir:
              ".docs-kits/kits/Digital Twin Kit/Software Development View/API AAS Discovery/", // Output directory for generated .mdx docs
            sidebarOptions: {
               groupPathsBy: "tag",
            },
          },
          dt_edc_discovery: {
                      specPath: "./openApi/dt/edc-discovery-service-openapi.json", // Path to designated spec file
                      outputDir:
                        "./docs-kits/kits/Digital Twin Kit/Software Development View/API EDC Discovery/", // Output directory for generated .mdx docs
                      sidebarOptions: {
                        groupPathsBy: "tag",
                      },
          },
          dt_submodel: {
            specPath: "./openApi/dt/submodel-service-ssp003-openapi.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/Digital Twin Kit/Software Development View/API Submodel/", // Output directory for generated .mdx docs
            sidebarOptions: {
               groupPathsBy: "tag",
            },
          },
          dt_registry: {
            specPath: "./openApi/dt/registry-service-ssp002-openapi.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/Digital Twin Kit/Software Development View/API AAS Registry/", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          dt_aas_discovery: {
            specPath: "./openApi/dt/discovery-service-ssp001-openapi.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/Digital Twin Kit/Software Development View/API AAS Discovery/", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          }, 
          pcf_exchange_api: {
              specPath: "./openApi/pcf/catena-x-pcf-endpoint-0_0_3.yaml", // Path to designated spec file
              outputDir:
                "./docs-kits/kits/PCF Exchange Kit/Software Development View/pcf-exchange-api/",
              sidebarOptions: {
                groupPathsBy: "tag",
              },
            },
          resiliency_osim: {
            specPath: "./openApi/resiliency/simulation-result.yaml", // Path to designated spec file
            outputDir:
              "./docs-kits/kits/OSim Kit/Software Development View/", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"], // Allows use of @theme/ApiItem and other components

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
            type: 'dropdown',
            label: 'KITs',
            position: 'left',
            to: '/developer',
            items: [
              {
                to: '/docs-kits/kits/Business%20Partner%20Kit/Adoption%20View',
                label: 'Business Partner',
              },
              {
                to: '/docs-kits/kits/tractusx-edc/docs/kit/adoption-view/Adoption%20View',
                label: 'Connector',
              },
              {
                to: '/docs-kits/kits/Data%20Chain%20Kit/Adoption%20View%20Data%20Chain%20Kit',
                label: 'Data Chain',
              },
              {
                to: '/docs-kits/kits/Digital%20Twin%20Kit/Adoption%20View%20Digital%20Twin%20Kit',
                label: 'Digital Twin',
              },
              {
                to: '/docs-kits/kits/Eco_Pass_KIT/page-adoption-view',
                label: 'Eco Pass',
              },
              {
                to: '/docs-kits/kits/OSim%20Kit/Adoption%20View%20OSim%20Kit',
                label: 'Online Simulation',
              },
              {
                to: '/docs-kits/kits/PCF%20Exchange%20Kit/Adoption%20View',
                label: 'PCF Exchange',
              },
              {
                to: '/docs-kits/kits/Quality-Kit/Adoption%20View%20Quality%20Kit',
                label: 'Quality',
              },
              {
                to: '/docs-kits/kits/Behaviour%20Twin%20RuL%20Kit/Adoption%20View%20Remaining%20Useful%20Life%20Kit',
                label: 'Remaining Useful Life (RuL)',
              },
              {
                to: '/docs-kits/kits/Traceability%20Kit/Adoption%20View%20Traceability%20Kit',
                label: 'Traceability',
              },
              {
                to: 'docs-kits/next/Resiliency/',
                label: 'Preview',
              }
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
            to: "/community",
            position: "left",
            label: "Community",
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
          // {
          //   to: "/docs-products/category/products",
          //   position: "left",
          //   label: "Products",
          // },
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
              {
                to: '/docs/kits/Behaviour%20Twin%20RuL%20Kit/Adoption%20View%20Remaining%20Useful%20Life%20Kit',
                label: 'Behaviour Twin RuL',
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
