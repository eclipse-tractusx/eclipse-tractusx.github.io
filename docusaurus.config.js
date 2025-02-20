
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
        authorsMapPath: 'authors.yaml' // relative path. File used is therefore /blog-meeting-minutes/authors.yaml
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
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/item-relationship-service/main/docs/src/api/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/irs", // the base directory to output to.
        documents: ["irs-api.yaml"], // the file names to download
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
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/sldt-discovery-finder/main/backend/src/main/resources/static/discovery-finder-openapi.yaml", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "openApi/dt", // the base directory to output to.
        documents: ["discovery-finder-openapi.yaml"], // the file names to download
        noRuntimeDownloads: true
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        id: "bpnDiscoveryOpenapi",
        name: "bpnDiscovery", // used by CLI, must be path safe
        sourceBaseUrl: "https://raw.githubusercontent.com/eclipse-tractusx/sldt-bpn-discovery/main/backend/src/main/resources/static/bpn-discovery-service-openapi.yaml", // the base url for the markdown (gets prepended to all of the documents when fetching)
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
          irs: {
            specPath: "./openApi/irs/irs-api.yaml",
            outputDir: "./docs-kits/kits/Data Chain Kit/Software Development View/Job Api",
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
              "./docs-kits/kits/Digital Twin Kit/Software Development View/API AAS Discovery/", // Output directory for generated .mdx docs
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
          // Online Simulation and Control (OSim)
          resiliency_osim: {
            outputDir:
              "./docs-kits/kits/OSim Kit/Software Development View/", // Output directory for generated .mdx docs
            specPath: './openApi/resiliency/osim-api.json', // Path to designated spec file
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          // Modular Production (MP)
          resiliency_mp_provider_getProductionForecast: {
            specPath:
              './openApi/resiliency/modular-production/GetProductionForecast.yml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Modular Production Kit/Software Development View/Provider/', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          resiliency_mp_provider_getProductionTracking: {
            specPath:
              './openApi/resiliency/modular-production/GetProductionTracking.yml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Modular Production Kit/Software Development View/Provider/', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          resiliency_mp_consumer_provideProductionForecast: {
            specPath:
              './openApi/resiliency/modular-production/ProvideProductionForecast.yml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Modular Production Kit/Software Development View/Consumer/', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          resiliency_mp_consumer_provideProductionTracking: {
            specPath:
              './openApi/resiliency/modular-production/ProvideProductionTracking.yml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Modular Production Kit/Software Development View/Consumer/', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          // Manufacturing as a Service (MaaS)
          resiliency_maas_manufacturing_capability: {
            specPath:
              './openApi/resiliency/maas/ManufacturingCapability-open-api.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Manufacturing as a Service Kit/Software Development View/Manufacturing Capability', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          resiliency_maas_request_for_quotation: {
            specPath:
              './openApi/resiliency/maas/RfQ-openapi.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/Manufacturing as a Service Kit/Software Development View/Request for Quotation', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          dcm_id_based_comment: {
            specPath:
              './openApi/dcm/IdBasedComment.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/demand-and-capacity-management-kit/development-view/plugin-generated-comment-api', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          dcm_id_based_request_for_update: {
            specPath:
              './openApi/dcm/IdBasedRequestForUpdate.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/demand-and-capacity-management-kit/development-view/plugin-generated-rfu-api', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          dcm_week_based_capacity_group: {
            specPath:
              './openApi/dcm/WeekBasedCapacityGroup.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/demand-and-capacity-management-kit/development-view/plugin-generated-capacity-group-api', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          dcm_week_based_material_demand: {
            specPath:
              './openApi/dcm/WeekBasedMaterialDemand.yaml', // Path to designated spec file
            outputDir:
              './docs-kits/kits/demand-and-capacity-management-kit/development-view/plugin-generated-material-demand-api', // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: 'tag',
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
            to: "/aboutus",
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
                to: '/Kits',
                label: 'Kits General',
              },

              {
                to: '/docs-kits/kits/knowledge-agents/adoption-view/intro',
                label: 'Agents',
              },
              {
                to: '/docs-kits/kits/behaviour-twin-kit/overview',
                label: 'Behaviour Twin',
              },
              {
                to: '/docs-kits/kits/Business%20Partner%20Kit/Adoption%20View',
                label: 'Business Partner',
              },
              {
                to: '/docs-kits/kits/Circularity_KIT/page-adoption-view',
                label: 'Circularity',
              },
              {
                to: '/docs-kits/kits/Connector%20Kit/Adoption%20View/connector_kit_adoption_view',
                label: 'Connector',
              },
              {
                to: '/docs-kits/kits/Data%20Chain%20Kit/Adoption%20View%20Data%20Chain%20Kit',
                label: 'Data Chain',
              },
              {
                to: 'docs-kits/kits/Data%20Governance%20Kit/Data%20Governance%20Kit%20Adoption%20View',
                label: 'Data Governance',
              },
              {
                to: 'docs-kits/kits/demand-and-capacity-management-kit/adoption-view/overview',
                label: 'Demand and Capacity Management',
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
                to: '/docs-kits/kits/ESS-Kit/ESS%20Kit%20Adoption%20View',
                label: 'Environmental & Social Standards',
              },
              {
                to: '/docs-kits/kits/Industry%20Core%20Kit/Business%20View%20Industry%20Core%20Kit',
                label: 'Industry Core',
              },
              {
                to: '/docs-kits/kits/logistics-kit/page_adoption-view',
                label: 'Logistics',
              },
              {
                to: '/docs-kits/kits/Manufacturing%20as%20a%20Service%20Kit/Adoption%20View%20MaaS%20Kit',
                label: 'Manufacturing as a Service',
              },
              {
                to: '/docs-kits/kits/Behaviour%20Twin%20MDP%20Kit/page_adoption-view',
                label: 'Model Based Development',
              },
              {
                to: '/docs-kits/kits/Modular%20Production%20Kit/Adoption%20View%20Modular%20Production%20Kit',
                label: 'Modular Production',
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
                to: '/docs-kits/next/kits/PURIS%20Kit/Adoption%20View%20PURIS%20Kit',
                label: 'PURIS',
              },
              {
                to: '/docs-kits/kits/Quality-Kit/Adoption%20View%20Quality%20Kit',
                label: 'Quality',
              },
              {
                to: '/docs-kits/next/kits/Supply%20Chain%20Disruption%20Notifications%20KIT/Adoption%20View%20PURIS-DCM%20Supply%20Chain%20Disruption%20Notifications',
                label: 'Supply Chain Disruption Notifications KIT',
              },
              {
                to: '/docs-kits/kits/Traceability%20Kit/Business%20View%20Traceability%20Kit',
                label: 'Traceability',
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
