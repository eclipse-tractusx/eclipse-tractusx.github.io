export const products = [
  {
    productName: "api-hub",
    productDescription: "Welcome to the API Hub repository, a centralized location for hosting and viewing API documentation for the Tractus-X organization. This repository automates the collection of OpenAPI specifications from GitHub releases, generates Swagger UI documentation, and publishes it on GitHub Pages.",
    githubRepo: ["https://github.com/eclipse-tractusx/api-hub"],
    committers: ["https://github.com/tomaszbarwicki"],
    mailTo: "tractusx-dev@eclipse.org?subject=Request api-hub Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Tractus-X SDK",
    productDescription:
      "A powerful middleware that simplifies the usage and application development using multi-target versions of the EDC, DTR and Data Sources",
    githubRepo: [
      "https://github.com/eclipse-tractusx/tractusx-sdk"
    ],
    committers: [
      "https://github.com/matbmoser",
      "https://github.com/CDiezRodriguez",
      "https://github.com/mgarciaLKS",
    ],
    mailTo:
      "mathias.moser@catena-x.net?subject=Request Tractus-X SDK Team",
    hasBoard: false,
    showVersion: true,
  },
    {
    productName: "Industry Core Hub",
    productDescription:
      "A data provision & consumption lightweight orchestrator, giving an example of usage of the Tractus-X SDK and providing an UI workbench for your to share data easily with Tractus-X compliant technology and following the Catena-X industry core standards.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/industry-core-hub"
    ],
    committers: [
      "https://github.com/matbmoser",
      "https://github.com/CDiezRodriguez",
      "https://github.com/mgarciaLKS",
    ],
    mailTo:
      "mathias.moser@catena-x.net?subject=Request Industry Core Hub Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Business Partner Data Management",
    productDescription:
      "The project provides core services for querying, adding, and changing business partner data in the Catena-X data space. Currently, BPDM consists of the Pool and Gate API.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/bpdm",
      "https://github.com/eclipse-tractusx/bpdm-certificate-management",
    ],
    committers: [
      "https://github.com/nicoprow",
      "https://github.com/SujitMBRDI",
      "https://github.com/Maximilianong",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request Business Partner Data Management Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "bpn-did-resolution-service",
    productDescription: "Tractus-X Resolver Service for BPN <> DID resolution",
    githubRepo: [
      "https://github.com/eclipse-tractusx/bpn-did-resolution-service",
    ],
    committers: [
      "https://github.com/paullatzelsperger",
      "https://github.com/wolf4ood",
      "https://github.com/jimmarino",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request bpn-did-resolution-service Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "demand-capacity-mgmt",
    productDescription: "TBD",
    githubRepo: ["https://github.com/eclipse-tractusx/demand-capacity-mgmt"],
    committers: ["https://github.com/nitin-vavdiya"],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request demand-capacity-mgmt Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Digital Product Pass",
    productDescription:
    "The Digital Product Pass (DPP) Application provides an easy way to request and visualize product passports from an economic operator using the Catena-X Network. By scanning a QR code or introducing a manufacturerPartId and partInstanceId (productId) passports can be displayed for different products like Batteries (Battery Pass), Transmissions (Transmision Pass) and any other product by simply using the Generic Digital Product Passport Model. Additionally components like the dpp-backend have the power to retrieve any aspect submodel content, which is registered in a Digital Twin using the Catena-X Network, and the dpp-verification add-on enables certification + verification of Catena-X Instance/Type Aspect Models",
    githubRepo: ["https://github.com/eclipse-tractusx/digital-product-pass"],
    committers: [
      "https://github.com/matbmoser",
      "https://github.com/saudkhan116",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request digital-product-pass Team",
    hasBoard: true,
    showVersion: true,
  },
  {
    productName: "Self-Description Factory",
    productDescription:
      "Generates Self-Description (SD) documents based on input data from the Onboarding Tool, ensuring accurate representation of entities within the network",
    githubRepo: [
      "https://github.com/eclipse-tractusx/sd-factory",
    ],
    committers: [
      "https://github.com/tomaszbarwicki",
      "https://github.com/almadigabor",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request IDS Essential Services Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Item Relationship Service",
    productDescription:
      "The project provides a service for ad-hoc data chains across n-tier values chains for different use cases based on the EDC.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/item-relationship-service",
    ],
    committers: [
      "https://github.com/ds-jhartmann",
      "https://github.com/mkanal",
      "https://github.com/ds-lcapellino",
      "https://github.com/ds-mwesener",
      "https://github.com/ds-jkreutzfeld",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request Item Relationship Service Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "knowledge-agents",
    productDescription:
      "Reference Implementations of CX-0084 (Federated Queries In Data Spaces)",
    githubRepo: [
      "https://github.com/eclipse-tractusx/knowledge-agents",
      "https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge",
      "https://github.com/eclipse-tractusx/knowledge-agents-edc",
    ],
    committers: ["https://github.com/almadigabor"],
    mailTo: "tractusx-dev@eclipse.org?subject=Request knowledge-agents Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "managed-service-orchestrator",
    productDescription: "It is a prototype implementation for service provider. This service will help service provider to set up DFT/SDE with EDC and EDC as service in service provider environment.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/managed-service-orchestrator",
    ],
    committers: [
      "https://github.com/almadigabor",
      "https://github.com/tomaszbarwicki",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request managed-service-orchestrator Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "managed-simple-data-exchanger",
    productDescription: "It is a component, designed to provide a simplified and efficient solution for data exchange",
    githubRepo: [
      "https://github.com/eclipse-tractusx/managed-simple-data-exchanger",
      "https://github.com/eclipse-tractusx/managed-simple-data-exchanger-backend",
      "https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend",
    ],
    committers: [
      "https://github.com/almadigabor",
      "https://github.com/tomaszbarwicki",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request managed-simple-data-exchanger Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Policy Hub",
    productDescription:
      "The Policy Hub enables data providers, consumers and app providers to access a single-point-of-truth for Catena-X policies, attributes and templates for policy rules.",
    githubRepo: ["https://github.com/eclipse-tractusx/policy-hub"],
    committers: [
      "https://github.com/evegufy",
      "https://github.com/Phil91",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request Tractus-X Policy Hub Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Portal & Marketplaces",
    productDescription:
      "The Portal facilitates the operations for dataspace members (companies), it includes functionalities such as registration, technical onboarding and marketplaces.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/portal",
      "https://github.com/eclipse-tractusx/portal-backend",
      "https://github.com/eclipse-tractusx/portal-frontend",
      "https://github.com/eclipse-tractusx/portal-frontend-registration",
      "https://github.com/eclipse-tractusx/portal-assets",
      "https://github.com/eclipse-tractusx/portal-iam",
      "https://github.com/eclipse-tractusx/portal-shared-components",
    ],
    committers: [
      "https://github.com/evegufy",
      "https://github.com/ntruchsess",
      "https://github.com/oyo",
      "https://github.com/Phil91",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request Portal and Marketplaces Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Predictive Unit Real-Time Information Service",
    productDescription:
      "Predictive Unit Real-Time Information Service (PURIS) for Short Term Demand and Capacity Management",
    githubRepo: [
      "https://github.com/eclipse-tractusx/puris",
    ],
    committers: [
      "https://github.com/tom-rm-meyer-ISST",
      "https://github.com/mhellmeier",
    ],
    mailTo: "tractusx-dev@eclipse.org?subject=Request puris Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Digital Twin Registry",
    productDescription:
        "This product provides standards and services to manage digital twins.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/sldt-digital-twin-registry"
    ],
    committers: [
      "https://github.com/agg3fe",
      "https://github.com/bs-jokri",
      "https://github.com/LuLeRoemer",
      "https://github.com/tunacicek",
    ],
    mailTo:
        "tractusx-dev@eclipse.org?subject=Request Semantic Layer & Digital Twin Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Semantic Layer",
    productDescription:
        "The project provides methods and tooling to build semantic models (e.g., semantic hub).",
    githubRepo: [
      "https://github.com/eclipse-tractusx/sldt-semantic-hub",
      "https://github.com/eclipse-tractusx/sldt-semantic-models",
      "https://github.com/eclipse-tractusx/sldt-ontology-model",
    ],
    committers: [
      "https://github.com/agg3fe",
      "https://github.com/bs-jokri",
      "https://github.com/LuLeRoemer",
      "https://github.com/tunacicek",
    ],
    mailTo:
        "tractusx-dev@eclipse.org?subject=Request Semantic Layer & Digital Twin Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Discovery Services",
    productDescription:
      "The project provides applications for the discovery services. The Discovery Finder is used to find an endpoint to a BPN Discovery for a certain type while BPN Discovery finds the endpoint of a provider EDC.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/sldt-bpn-discovery",
      "https://github.com/eclipse-tractusx/sldt-discovery-finder",
    ],
    committers: [
      "https://github.com/agg3fe",
      "https://github.com/bs-jokri",
      "https://github.com/LuLeRoemer",
      "https://github.com/tunacicek",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request Semantic Layer & Digital Twin Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "SSI-agent-lib",
    productDescription: "The SSI Agent Library is a component, designed to facilitate the implementation of Self-Sovereign Identity (SSI) solutions",
    githubRepo: ["https://github.com/eclipse-tractusx/SSI-agent-lib"],
    committers: [
      "https://github.com/borisrizov-zf",
      "https://github.com/nitin-vavdiya",
    ],
    mailTo: "tractusx-dev@eclipse.org?subject=Request SSI-agent-lib Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "ssi-authority-schema-registry",
    productDescription: "SSI Authority & Schema Registry",
    githubRepo: [
      "https://github.com/eclipse-tractusx/ssi-authority-schema-registry",
    ],
    committers: [
      "https://github.com/Phil91",
      "https://github.com/evegufy",
      "https://github.com/ntruchsess",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request ssi-authority-schema-registry Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "ssi-credential-issuer",
    productDescription: "SSI Credential Issuer",
    githubRepo: ["https://github.com/eclipse-tractusx/ssi-credential-issuer"],
    committers: [
      "https://github.com/Phil91",
      "https://github.com/evegufy",
      "https://github.com/ntruchsess",
    ],
    mailTo:
      "tractusx-dev@eclipse.org?subject=Request ssi-credential-issuer Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "testdata-provider",
    productDescription: "Testdata Provider",
    githubRepo: ["https://github.com/eclipse-tractusx/testdata-provider"],
    committers: ["https://github.com/ds-lcapellino"],
    mailTo: "tractusx-dev@eclipse.org?subject=Request testdata-provider Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Trace-X",
    productDescription:
      "The project provides a business application for tracking parts along the supply chain. It uses quality notifications in a standardized way to notify customers or suppliers about detected faulty parts. It is based on the Catena-X standards for serialized and non-serialized hardware and software components.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/traceability-foss",
      "https://github.com/eclipse-tractusx/traceability-foss-backend",
    ],
    committers: [
      "https://github.com/ds-mwesener",
      "https://github.com/ds-mmaul",
      "https://github.com/ds-lcapellino",
      "https://github.com/mkanal",
    ],
    mailTo: "tractusx-dev@eclipse.org?subject=Request Trace-X Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "Tractus-X EDC",
    productDescription:
      "The project provides the pre-built control- and data-plane docker images and helm charts of the Eclipse Dataspace Connector Project.",
    githubRepo: [
      "https://github.com/eclipse-tractusx/tractusx-edc",
      "https://github.com/eclipse-tractusx/tractusx-edc-template",
    ],
    committers: [
      "https://github.com/paullatzelsperger",
      "https://github.com/wolf4ood",
      "https://github.com/ndr-brt",
      "https://github.com/jimmarino",
    ],
    mailTo: "tractusx-dev@eclipse.org?subject=Request Tractus-X EDC Team",
    hasBoard: true,
    showVersion: true,
  },
  {
    productName: "tractusx-profiles",
    productDescription: "Defines Credential and Policy Profiles for Tractus-X.",
    githubRepo: ["https://github.com/eclipse-tractusx/tractusx-profiles"],
    committers: [
      "https://github.com/jimmarino",
      "https://github.com/arnoweiss",
      "https://github.com/wolf4ood",
    ],
    mailTo: "tractusx-dev@eclipse.org?subject=Request tractusx-profiles Team",
    hasBoard: false,
    showVersion: true,
  },
  {
    productName: "vas-country-risk",
    productDescription: "The Catena-X Country Risk project is a web application that calculates a risk score per country based on information regarding corruption, political stability, economic risk, and social and structural figures.",
    githubRepo: ["https://github.com/eclipse-tractusx/vas-country-risk"],
    committers: [],
    mailTo: "tractusx-dev@eclipse.org?subject=Request vas-country-risk Team",
    hasBoard: false,
    showVersion: true,
  },
];
