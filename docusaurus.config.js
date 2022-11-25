// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Eclipse Tractus-X",
  tagline: "",
  url: "https://eclipse-tractusx.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo_catena.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "eclipse-tractusx", // Usually your GitHub org/user name.
  projectName: "eclipse-tractusx.github.io", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Eclipse Tractus-X",
        logo: {
          alt: "Eclipse Tractus-X logo",
          src: "img/logo_catena.svg",
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "introduction",
          //   position: "left",
          //   label: "Documentation",
          // },
          // {
          //   type: "doc",
          //   position: "left",
          //   docId: "kits",
          //   label: "KITs",
          // },
          /* {to: '/blog', label: 'Blog', position: 'left'}, */
          {
            to: "/",
            position: "right",
            label: "HOME",
          },
          {
            to: "/about-us",
            position: "right",
            label: "ABOUT",
          },
          {
            to: "/developer",
            position: "right",
            label: "DEVELOPER",
          },
          {
            to: "/design",
            position: "right",
            label: "DESIGN",
          },
          {
            to: "/news",
            position: "right",
            label: "NEWS",
          },
          {
            to: "/contact-us",
            position: "right",
            label: "CONTACT",
          },
          {
            to: "/submit-app",
            position: "right",
            label: "SUBMIT APP",
            style: {
              background: "#FAA023",
              color: "#fff",
              padding: "0.5 rem 1rem",
              borderRadius: "5px",
            },
          },
          {
            href: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
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
            title: "About Tractus X",
            items: [
              {
                label: "About Us",
                to: "/about-us",
              },
              {
                label: "Impressum",
                to: "/",
              },
            ],
          },
          {
            title: "Information",
            items: [
              {
                label: "Data Protection",
                to: "/",
              },
              {
                label: "Cookies Settings",
                to: "/",
              },
            ],
          },
          {
            title: "Contact",
            items: [
              {
                html: "<p >catena_x@catenaxxx.com</p>",
              },
              {
                html: "<p>(00)-0000-00-000</p>",
              },
            ],
          },
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
